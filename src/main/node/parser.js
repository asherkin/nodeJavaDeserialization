/**
 * Copyright (c) 2015,2018 Martin von Gagern
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// See http://docs.oracle.com/javase/7/docs/platform/serialization/spec/protocol.html for reference

"use strict";

const assert = require("assert");
const Long = require("long");

const names = [
    "Null", "Reference", "ClassDesc", "Object", "String", "Array", "Class", "BlockData", "EndBlockData",
    "Reset", "BlockDataLong", "Exception", "LongString", "ProxyClassDesc", "Enum",
];

const endBlock = {};

/** @type {Object.<string, function(this:Parser, Object): Object>} */
const classDataParsers = {};

/** @type {Object.<string, function(this:Parser, Object, Object, Array): Object>} */
const classPostProcessors = {};

/** @type {Object.<string, function(this:Parser): *>} */
const typeHandlers = {
    "Null": function() {
        return null;
    },
    "Reference": function() {
        return this.handles[this.readInt32()];
    },
    "ClassDesc": function() {
        const res = {};
        res.name = this.utf();
        res.serialVersionUID = this.readHex(8);
        this.newHandle(res);
        res.flags = this.readUInt8();
        res.isEnum = !!(res.flags & 0x10);
        const count = this.readUInt16();
        res.fields = [];
        for (let i = 0; i < count; ++i) {
            res.fields.push(this.fieldDesc());
        }
        res.annotations = this.annotations();
        res.super = this.classDesc();
        return res;
    },
    "Object": function() {
        const res = Object.defineProperties({}, {
            "class": {
                configurable: true,
                value: this.classDesc(),
            },
            "extends": {
                configurable: true,
                value: {},
            },
        });
        this.newHandle(res);
        this.recursiveClassData(res.class, res);
        return res;
    },
    "String": function() {
        return this.newHandle(this.utf());
    },
    "Array": function() {
        const classDesc = this.classDesc();
        const res = Object.defineProperties([], {
            "class": {
                configurable: true,
                value: classDesc,
            },
            "extends": {
                configurable: true,
                value: {},
            },
        });
        this.newHandle(res);
        const len = this.readInt32();
        const handler = this.primHandler(classDesc.name.charAt(1));
        res.length = len;
        for (let i = 0; i < len; ++i) {
            res[i] = handler.call(this);
        }
        return res;
    },
    "Class": function() {
        return this.newHandle(this.classDesc());
    },
    "BlockData": function() {
        const len = this.readUInt8();
        const res = this.buf.slice(this.pos, this.pos + len);
        this.pos += len;
        return res;
    },
    "EndBlockData": function() {
        return endBlock;
    },
    "BlockDataLong": function() {
        const len = this.readUInt32();
        const res = this.buf.slice(this.pos, this.pos + len);
        this.pos += len;
        return res;
    },
    "LongString": function() {
        return this.newHandle(this.utfLong());
    },
    "Enum": function() {
        const clazz = this.classDesc();
        const deferredHandle = this.newDeferredHandle();
        const constant = this.content();
        // We need to use the object wrapper here to define the additional properties.
        // noinspection JSPrimitiveTypeWrapperUsage
        const obj = new String(constant); // eslint-disable-line no-new-wrappers
        const res = Object.defineProperties(obj, {
            "class": {
                configurable: true,
                value: clazz,
            },
            "extends": {
                configurable: true,
                value: {},
            },
        });
        deferredHandle(res);
        return res;
    },
};

/** @type {Object.<string, function(this:Parser): *>} */
const primHandlers = {
    "B": function() {
        return this.readInt8();
    },
    "C": function() {
        return String.fromCharCode(this.readUInt16());
    },
    "D": function() {
        return this.buf.readDoubleBE(this.step(8));
    },
    "F": function() {
        return this.buf.readFloatBE(this.step(4));
    },
    "I": function() {
        return this.readInt32();
    },
    "J": function() {
        const high = this.readUInt32();
        const low = this.readUInt32();
        return Long.fromBits(low, high);
    },
    "S": function() {
        return this.readInt16();
    },
    "Z": function() {
        return !!this.readInt8();
    },
    "L": function() {
        return this.content();
    },
    "[": function() {
        return this.content();
    },
};

class Parser {
    /**
     * @param {Buffer} buf
     */
    constructor(buf) {
        this.buf = buf;
        this.pos = 0;
        this.nextHandle = 0x7e0000;
        this.handles = [];
        this.contents = [];

        this.magic();
        this.version();

        while (this.pos < this.buf.length) {
            this.contents.push(this.content());
        }
    }

    /**
     * @param {string} className
     * @param {string} serialVersionUID
     * @param {function(this:Parser, Object): Object} parser
     */
    static registerClassDataParser(className, serialVersionUID, parser) {
        assert.strictEqual(serialVersionUID.length, 16,
            "serialVersionUID must be 16 hex digits");

        classDataParsers[`${className}@${serialVersionUID}`] = parser;
    }

    /**
     * @param {string} className
     * @param {string} serialVersionUID
     * @param {function(this:Parser, Object, Object, Array): Object} parser
     */
    static registerPostProcessor(className, serialVersionUID, parser) {
        assert.strictEqual(serialVersionUID.length, 16,
            "serialVersionUID must be 16 hex digits");

        classPostProcessors[`${className}@${serialVersionUID}`] = parser;
    }

    step(len) {
        const pos = this.pos;
        this.pos += len;

        if (this.pos > this.buf.length) {
            const err = new Error("Premature end of input");
            err.buf = this.buf;
            err.pos = this.pos;
            throw err;
        }

        return pos;
    }

    chunk(len, encoding) {
        const pos = this.step(len);
        return this.buf.toString(encoding, pos, this.pos);
    }

    readUInt8() {
        return this.buf.readUInt8(this.step(1));
    }

    readInt8() {
        return this.buf.readInt8(this.step(1));
    }

    readUInt16() {
        return this.buf.readUInt16BE(this.step(2));
    }

    readInt16() {
        return this.buf.readInt16BE(this.step(2));
    }

    readUInt32() {
        return this.buf.readUInt32BE(this.step(4));
    }

    readInt32() {
        return this.buf.readInt32BE(this.step(4));
    }

    readHex(len) {
        return this.chunk(len, "hex");
    }

    utf() {
        return this.chunk(this.readUInt16(), "utf8");
    }

    utfLong() {
        if (this.readUInt32() !== 0) {
            throw new Error("Can't handle more than 2^32 bytes in a string");
        }

        return this.chunk(this.readUInt32(), "utf8");
    }

    magic() {
        this.magic = this.readUInt16();
        if (this.magic !== 0xaced) {
            throw Error("STREAM_MAGIC not found");
        }
    }

    version() {
        this.version = this.readUInt16();
        if (this.version !== 5) {
            throw Error("Only understand protocol version 5");
        }
    }

    content(allowed) {
        const tc = this.readUInt8() - 0x70;
        if (tc < 0 || tc > names.length) {
            throw Error(`Don't know about type 0x${(tc + 0x70).toString(16)}`);
        }

        const name = names[tc];
        if (allowed && allowed.indexOf(name) === -1) {
            throw Error(`${name} not allowed here`);
        }

        const handler = typeHandlers[name];
        if (!handler) {
            throw Error(`Don't know how to handle ${name}`);
        }

        return handler.call(this);
    }

    annotations(allowed) {
        const annotations = [];
        for (;;) {
            const annotation = this.content(allowed);
            if (annotation === endBlock) {
                break;
            }

            annotations.push(annotation);
        }

        return annotations;
    }
    
    classDesc() {
        return this.content(["ClassDesc", "ProxyClassDesc", "Null", "Reference"]);
    }

    fieldDesc() {
        const res = {};
        res.type = String.fromCharCode(this.readUInt8());
        res.name = this.utf();

        if ("[L".indexOf(res.type) !== -1) {
            res.className = this.content();
        }

        return res;
    }

    recursiveClassData(cls, obj) {
        if (cls.super) {
            this.recursiveClassData(cls.super, obj);
        }

        const fields = obj.extends[cls.name] = this.classdata(cls, obj);
        for (const name in fields) {
            obj[name] = fields[name];
        }
    }

    classdata(cls) {
        // For bcompat, this defaults to the values handler - same as without a write method.
        const classDataParser = classDataParsers[`${cls.name}@${cls.serialVersionUID}`] || this.values;
        const postProcessor = classPostProcessors[`${cls.name}@${cls.serialVersionUID}`];

        switch (cls.flags & 0x0f) {
            case 0x02: // SC_SERIALIZABLE without SC_WRITE_METHOD
                return this.values(cls);
            case 0x03: { // SC_SERIALIZABLE with SC_WRITE_METHOD
                let res = classDataParser.call(this, cls);
                const data = res["@"] = this.annotations();
                if (postProcessor) {
                    res = postProcessor.call(this, cls, res, data);
                }

                return res;
            }
            case 0x04: // SC_EXTERNALIZABLE without SC_BLOCKDATA
                throw Error("Can't parse version 1 external content");
            case 0x0c: // SC_EXTERNALIZABLE with SC_BLOCKDATA
                return { "@": this.annotations() };
            default:
                throw Error(`Don't know how to deserialize class with flags 0x${cls.flags.toString(16)}`);
        }
    }

    /**
     * @param {string} type
     * @return {function(this:Parser): *}
     */
    primHandler(type) {
        const handler = primHandlers[type];
        if (!handler) {
            throw Error(`Don't know how to read field of type '${type}'`);
        }

        return handler;
    }

    /**
     * @param cls
     * @return {Object}
     */
    values(cls) {
        const vals = {};

        const fields = cls.fields;
        for (let i = 0; i < fields.length; ++i) {
            const field = fields[i];
            const handler = this.primHandler(field.type);
            vals[field.name] = handler.call(this);
        }

        return vals;
    }

    /**
     * @template T
     * @param {T} obj
     * @return {T}
     */
    newHandle(obj) {
        this.handles[this.nextHandle++] = obj;
        return obj;
    }

    /**
     * @return {function(*): void}
     */
    newDeferredHandle() {
        const idx = this.nextHandle++;
        const handles = this.handles;
        handles[idx] = null;
        return function(obj) {
            handles[idx] = obj;
        };
    }
}

// Backwards compat shim.
Parser.register = Parser.registerPostProcessor;

module.exports = Parser;

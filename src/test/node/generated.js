//This is a generated file from GeneratedTestCases.java
'use strict';

const chai = require('chai');
const expect = chai.expect;
const zlib = require('zlib');
const javaDeserialization = require('../../main/node');

// Register a classdata parser for the io.github.gagern.nodeJavaDeserialization.CompletelyCustomFormat test.
javaDeserialization.registerClassDataParser('io.github.gagern.nodeJavaDeserialization.CompletelyCustomFormat', '0000000000000001', cls => ({}));

function testCase(b64data, checks) {
  return function() {
    let bytes = Buffer.from(b64data, 'base64');
    if (b64data.substring(0, 4) === 'H4sI')
      bytes = zlib.gunzipSync(bytes);
    const res = javaDeserialization.parse(bytes);
    const begin = res[0];
    const end = res[res.length - 1];
    expect(begin[0]).to.equal('Begin');
    expect(begin[1]).to.equal(begin);
    expect(end[0]).to.equal(end);
    expect(end[1]).to.equal('End');
    expect(res.length,
      'Number of serialized objects must match args list'
    ).to.equal(checks.length + 2);
    return checks.apply(null, res.slice(1, -1));
  };
}

describe('Deserialization of', function() {

  it('string', testCase(
    'rO0ABXVyABNbTGphdmEubGFuZy5PYmplY3Q7kM5YnxBzKWwCAAB4cAAAAAJ0AAVCZWdpbnEAfgABdAAIc29tZXRleHR1cQB+AAAAAAACcQB+AAR0AANFbmQ=',
    function(itm) {
      expect(typeof itm, "typeof itm").to.equal('string');
      expect(itm, "itm").to.equal('sometext');
    }));

  it('Exception as regular object', testCase(
    'H4sIAAAAAAAAAIVSXWvUQBS9m83WNqAufmGrriBaUWQXQYWSIthllWKsoBWEBWU2ud1OnUzizMSNCqKIr+KrgvoHfBX8AX48FEQEH330TZ99seDc1P2Qgs7DTHJz7plzTu6rH1DJFGxvByvsFqsLJrv1i50VDI3/5OPVl1V9RDgAeQoAjoHKHHa5vAn3oKQVTA1bLmXS8BhbeYip4Yl8cX3snHfi4TfqtexD4ADxaW3/6Sl/79sNiMVllfRYR+CX9ycPz/TerJbBDaASskyjgZ2FzgYhGwOkH8DmCA3j4gJqzboWt20Ed9koLrt+GzxtWHhjUbHQImrtvyD9Dy2BMUpjKXfoLE2VJcRooFobqK63ZYaLRsC18fOUAvEMjJ1nnSSJbZy10Tg3cjtnj87Orh2Y6SdLYe75RwObePds+tTXRw648+AJLnEhizuoAtgSYSgY2WsKpjUJ2RTA+BIXuMBi/PPuxWiWk2hQKS69a6DcFNbQuN3rdLstWKDVMl1oIYf1ZiKEHQayfvCKjJOIL3GKnJz/2nro+Ovvj6sOlAJwha0Q+4T9ncf+TzCsT87B/dVrP2sFTSk0sGsk4SHM5qz7g1Iwn1GK3SYd+YPP+55+YM/LUJoHV/M7WBiEnkt7TqJ25xkdtBx6mLReWzL6DS3112r+AgAA',
    function(itm) {
      expect(itm.class.name, "itm.class.name").to.equal('java.lang.RuntimeException');
      expect(itm.detailMessage, "itm.detailMessage").to.equal('Kaboom');
    }));

  it('canaries only', testCase(
    'rO0ABXVyABNbTGphdmEubGFuZy5PYmplY3Q7kM5YnxBzKWwCAAB4cAAAAAJ0AAVCZWdpbnEAfgABdXEAfgAAAAAAAnEAfgADdAADRW5k',
    function() {
    }));

  it('long string', testCase(
    'H4sIAAAAAAAAAO3JuwnCABRA0Wc0veAUNlnATrATbAWr+CEYQvCTiIVkBjdwAWdxE3eQgGOcU12472+k7SUmm2WZ3/KsyusiW23Lw66ZPT/r1/g6rZKI+ykikibS+aE41ufoYvCIXv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/tpzdNFL+hg1MVzU+x8AC//OVwACAA==',
    function(itm) {
      expect(typeof itm, "typeof itm").to.equal('string');
      expect(itm, "itm").to.have.lengthOf(131072);
      expect(itm[0], "itm[0]").to.equal('x');
      expect(itm[(1 << 17) - 1], "itm[(1 << 17) - 1]").to.equal('x');
    }));

  it('null', testCase(
    'rO0ABXVyABNbTGphdmEubGFuZy5PYmplY3Q7kM5YnxBzKWwCAAB4cAAAAAJ0AAVCZWdpbnEAfgABcHVxAH4AAAAAAAJxAH4AA3QAA0VuZA==',
    function(itm) {
      expect(typeof itm, "typeof itm").to.equal('object');
      expect(itm, "itm").to.equal(null);
    }));

  it('duplicate object', testCase(
    'rO0ABXVyABNbTGphdmEubGFuZy5PYmplY3Q7kM5YnxBzKWwCAAB4cAAAAAJ0AAVCZWdpbnEAfgABc3IAO2lvLmdpdGh1Yi5nYWdlcm4ubm9kZUphdmFEZXNlcmlhbGl6YXRpb24uQmFzZUNsYXNzV2l0aEZpZWxkAAAAAAAAEjQCAAFJAANmb294cAAAAHt0AAVkZWxpbXEAfgAEdXEAfgAAAAAAAnEAfgAGdAADRW5k',
    function(obj1, delim, obj2) {
      expect(obj1, "obj1").to.equal(obj2);
    }));

  it('primitive fields', testCase(
    'rO0ABXVyABNbTGphdmEubGFuZy5PYmplY3Q7kM5YnxBzKWwCAAB4cAAAAAJ0AAVCZWdpbnEAfgABc3IAOGlvLmdpdGh1Yi5nYWdlcm4ubm9kZUphdmFEZXNlcmlhbGl6YXRpb24uUHJpbWl0aXZlRmllbGRzAAASNFZ4mrwCAAhaAAJib0IAAmJ5QwABY0QAAWRGAAFmSQABaUoAAWxTAAFzeHAB6xI0QCiuFHrhR65CmQAA////hf////////zr/jh1cQB+AAAAAAACcQB+AAV0AANFbmQ=',
    function(itm) {
      expect(itm.i, "itm.i").to.equal(-123);
      expect(itm.s, "itm.s").to.equal(-456);
      expect(String(itm.l), "String(itm.l)").to.equal('-789');
      expect(itm.l.toNumber(), "itm.l.toNumber()").to.equal(-789);
      expect(itm.l.equals(-789), "itm.l.equals(-789)").to.be.true;
      expect(itm.by, "itm.by").to.equal(-21);
      expect(itm.d, "itm.d").to.equal(12.34);
      expect(itm.f, "itm.f").to.equal(76.5);
      expect(itm.bo, "itm.bo").to.equal(true);
      expect(itm.c, "itm.c").to.equal('\u1234');
      expect(itm, "itm").to.have.all.keys(['i', 's', 'l', 'by', 'd', 'f', 'bo', 'c']);
      expect(itm.class.serialVersionUID, "itm.class.serialVersionUID").to.equal('0000123456789abc');
    }));

  it('boxed primitives', testCase(
    'rO0ABXVyABNbTGphdmEubGFuZy5PYmplY3Q7kM5YnxBzKWwCAAB4cAAAAAJ0AAVCZWdpbnEAfgABc3IAEWphdmEubGFuZy5JbnRlZ2VyEuKgpPeBhzgCAAFJAAV2YWx1ZXhyABBqYXZhLmxhbmcuTnVtYmVyhqyVHQuU4IsCAAB4cP///4VzcgAPamF2YS5sYW5nLlNob3J0aE03EzRg2lICAAFTAAV2YWx1ZXhxAH4ABP44c3IADmphdmEubGFuZy5Mb25nO4vkkMyPI98CAAFKAAV2YWx1ZXhxAH4ABP////////zrc3IADmphdmEubGFuZy5CeXRlnE5ghO5Q9RwCAAFCAAV2YWx1ZXhxAH4ABOtzcgAQamF2YS5sYW5nLkRvdWJsZYCzwkopa/sEAgABRAAFdmFsdWV4cQB+AARAKK4UeuFHrnNyAA9qYXZhLmxhbmcuRmxvYXTa7cmi2zzw7AIAAUYABXZhbHVleHEAfgAEQpkAAHNyABFqYXZhLmxhbmcuQm9vbGVhbs0gcoDVnPruAgABWgAFdmFsdWV4cAFzcgATamF2YS5sYW5nLkNoYXJhY3RlcjSLR9lrGiZ4AgABQwAFdmFsdWV4cBI0dXEAfgAAAAAAAnEAfgAUdAADRW5k',
    function(i, s, l, by, d, f, bo, c) {
      expect(i.value, "i.value").to.equal(-123);
      expect(s.value, "s.value").to.equal(-456);
      expect(l.value.equals(-789), "l.value.equals(-789)").to.be.true;
      expect(by.value, "by.value").to.equal(-21);
      expect(d.value, "d.value").to.equal(12.34);
      expect(f.value, "f.value").to.equal(76.5);
      expect(bo.value, "bo.value").to.equal(true);
      expect(c.value, "c.value").to.equal('\u1234');
      expect(i.class.name, "i.class.name").to.equal('java.lang.Integer');
      expect(s.class.name, "s.class.name").to.equal('java.lang.Short');
      expect(l.class.name, "l.class.name").to.equal('java.lang.Long');
      expect(by.class.name, "by.class.name").to.equal('java.lang.Byte');
      expect(d.class.name, "d.class.name").to.equal('java.lang.Double');
      expect(f.class.name, "f.class.name").to.equal('java.lang.Float');
      expect(bo.class.name, "bo.class.name").to.equal('java.lang.Boolean');
      expect(c.class.name, "c.class.name").to.equal('java.lang.Character');
    }));

  it('inherited field', testCase(
    'rO0ABXVyABNbTGphdmEubGFuZy5PYmplY3Q7kM5YnxBzKWwCAAB4cAAAAAJ0AAVCZWdpbnEAfgABc3IARWlvLmdpdGh1Yi5nYWdlcm4ubm9kZUphdmFEZXNlcmlhbGl6YXRpb24uRGVyaXZlZENsYXNzV2l0aEFub3RoZXJGaWVsZAAAAAAAACNFAgABSQADYmFyeHIAO2lvLmdpdGh1Yi5nYWdlcm4ubm9kZUphdmFEZXNlcmlhbGl6YXRpb24uQmFzZUNsYXNzV2l0aEZpZWxkAAAAAAAAEjQCAAFJAANmb294cAAAAHsAAADqdXEAfgAAAAAAAnEAfgAGdAADRW5k',
    function(itm) {
      expect(itm.class.name, "itm.class.name").to.equal('io.github.gagern.nodeJavaDeserialization.DerivedClassWithAnotherField');
      expect(itm.class.super.name, "itm.class.super.name").to.equal('io.github.gagern.nodeJavaDeserialization.BaseClassWithField');
      expect(itm.class.super.super, "itm.class.super.super").to.equal(null);
      expect(itm.extends.io.github.gagern.nodeJavaDeserialization.DerivedClassWithAnotherField.bar, "itm.extends.io.github.gagern.nodeJavaDeserialization.DerivedClassWithAnotherField.bar").to.equal(234);
      expect(itm.extends.io.github.gagern.nodeJavaDeserialization.DerivedClassWithAnotherField.foo, "itm.extends.io.github.gagern.nodeJavaDeserialization.DerivedClassWithAnotherField.foo").to.equal(undefined);
      expect(itm.extends.io.github.gagern.nodeJavaDeserialization.BaseClassWithField.foo, "itm.extends.io.github.gagern.nodeJavaDeserialization.BaseClassWithField.foo").to.equal(123);
      expect(itm.bar, "itm.bar").to.equal(234);
      expect(itm.foo, "itm.foo").to.equal(123);
    }));

  it('duplicate field', testCase(
    'rO0ABXVyABNbTGphdmEubGFuZy5PYmplY3Q7kM5YnxBzKWwCAAB4cAAAAAJ0AAVCZWdpbnEAfgABc3IAQmlvLmdpdGh1Yi5nYWdlcm4ubm9kZUphdmFEZXNlcmlhbGl6YXRpb24uRGVyaXZlZENsYXNzV2l0aFNhbWVGaWVsZAAAAAAAADRWAgABSQADZm9veHIAO2lvLmdpdGh1Yi5nYWdlcm4ubm9kZUphdmFEZXNlcmlhbGl6YXRpb24uQmFzZUNsYXNzV2l0aEZpZWxkAAAAAAAAEjQCAAFJAANmb294cAAAAHsAAAFZdXEAfgAAAAAAAnEAfgAGdAADRW5k',
    function(itm) {
      expect(itm.class.name, "itm.class.name").to.equal('io.github.gagern.nodeJavaDeserialization.DerivedClassWithSameField');
      expect(itm.class.super.name, "itm.class.super.name").to.equal('io.github.gagern.nodeJavaDeserialization.BaseClassWithField');
      expect(itm.class.super.super, "itm.class.super.super").to.equal(null);
      expect(itm.extends.io.github.gagern.nodeJavaDeserialization.DerivedClassWithSameField.foo, "itm.extends.io.github.gagern.nodeJavaDeserialization.DerivedClassWithSameField.foo").to.equal(345);
      expect(itm.extends.io.github.gagern.nodeJavaDeserialization.BaseClassWithField.foo, "itm.extends.io.github.gagern.nodeJavaDeserialization.BaseClassWithField.foo").to.equal(123);
      expect(itm.foo, "itm.foo").to.equal(345);
    }));

  it('primitive array', testCase(
    'rO0ABXVyABNbTGphdmEubGFuZy5PYmplY3Q7kM5YnxBzKWwCAAB4cAAAAAJ0AAVCZWdpbnEAfgABdXIAAltJTbpgJnbqsqUCAAB4cAAAAAMAAAAMAAAAIgAAADh1cQB+AAAAAAACcQB+AAV0AANFbmQ=',
    function(itm) {
      expect(itm, "itm").to.be.an('Array');
      expect(itm, "itm").to.have.lengthOf(3);
      expect(itm[0], "itm[0]").to.equal(12);
      expect(itm[1], "itm[1]").to.equal(34);
      expect(itm[2], "itm[2]").to.equal(56);
      expect(itm.class.name, "itm.class.name").to.equal('[I');
    }));

  it('nested array', testCase(
    'rO0ABXVyABNbTGphdmEubGFuZy5PYmplY3Q7kM5YnxBzKWwCAAB4cAAAAAJ0AAVCZWdpbnEAfgABdXIAFFtbTGphdmEubGFuZy5TdHJpbmc7Mk0JrYQy5FcCAAB4cAAAAAJ1cgATW0xqYXZhLmxhbmcuU3RyaW5nO63SVufpHXtHAgAAeHAAAAACdAABYXQAAWJ1cQB+AAUAAAABdAABY3VxAH4AAAAAAAJxAH4AC3QAA0VuZA==',
    function(itm) {
      expect(itm, "itm").to.be.an('Array');
      expect(itm, "itm").to.have.lengthOf(2);
      expect(itm[0], "itm[0]").to.be.an('Array');
      expect(itm[0], "itm[0]").to.have.lengthOf(2);
      expect(itm[1], "itm[1]").to.have.lengthOf(1);
      expect(itm[0][0], "itm[0][0]").to.equal('a');
      expect(itm[0][1], "itm[0][1]").to.equal('b');
      expect(itm[1][0], "itm[1][0]").to.equal('c');
    }));

  it('array fields', testCase(
    'rO0ABXVyABNbTGphdmEubGFuZy5PYmplY3Q7kM5YnxBzKWwCAAB4cAAAAAJ0AAVCZWdpbnEAfgABc3IANGlvLmdpdGh1Yi5nYWdlcm4ubm9kZUphdmFEZXNlcmlhbGl6YXRpb24uQXJyYXlGaWVsZHMAAAAAAAAAAQIAA1sAAmlhdAACW0lbAANpYWF0AANbW0lbAAJzYXQAE1tMamF2YS9sYW5nL1N0cmluZzt4cHVyAAJbSU26YCZ26rKlAgAAeHAAAAADAAAADAAAACIAAAA4dXIAA1tbSRf35E8Zj4k8AgAAeHAAAAACdXEAfgAIAAAAAgAAAAsAAAAMdXEAfgAIAAAAAwAAABUAAAAWAAAAF3VyABNbTGphdmEubGFuZy5TdHJpbmc7rdJW5+kde0cCAAB4cAAAAAJ0AANmb290AANiYXJ1cQB+AAAAAAACcQB+ABJ0AANFbmQ=',
    function(itm) {
      expect(itm.ia, "itm.ia").to.be.an('Array');
      expect(itm.iaa, "itm.iaa").to.be.an('Array');
      expect(itm.sa, "itm.sa").to.be.an('Array');
      expect(itm.iaa[1][2], "itm.iaa[1][2]").to.equal(23);
      expect(itm.sa[1], "itm.sa[1]").to.equal('bar');
    }));

  it('enum', testCase(
    'rO0ABXVyABNbTGphdmEubGFuZy5PYmplY3Q7kM5YnxBzKWwCAAB4cAAAAAJ0AAVCZWdpbnEAfgABfnIAMWlvLmdpdGh1Yi5nYWdlcm4ubm9kZUphdmFEZXNlcmlhbGl6YXRpb24uU29tZUVudW0AAAAAAAAAABIAAHhyAA5qYXZhLmxhbmcuRW51bQAAAAAAAAAAEgAAeHB0AANPTkV+cQB+AAN0AAVUSFJFRXEAfgAHdXEAfgAAAAAAAnEAfgAJdAADRW5k',
    function(one, three, three2) {
      expect(typeof one, "typeof one").to.equal('object');
      expect(one, "one").to.be.an.instanceof(String);
      expect(one == 'ONE', "one == 'ONE'").to.be.true;
      expect(one, "one").to.not.equal('ONE');
      expect(one.class.name, "one.class.name").to.equal('io.github.gagern.nodeJavaDeserialization.SomeEnum');
      expect(one.class.isEnum, "one.class.isEnum").to.be.true;
      expect(one.class.super.name, "one.class.super.name").to.equal('java.lang.Enum');
      expect(one.class.super.super, "one.class.super.super").to.equal(null);
      expect(three == 'THREE', "three == 'THREE'").to.be.true;
      expect(typeof three2, "typeof three2").to.equal('object');
      expect(three2, "three2").to.be.an.instanceof(String);
      expect(three2 == 'THREE', "three2 == 'THREE'").to.be.true;
      expect(three2, "three2").to.equal(three);
    }));

  it('custom format', testCase(
    'rO0ABXVyABNbTGphdmEubGFuZy5PYmplY3Q7kM5YnxBzKWwCAAB4cAAAAAJ0AAVCZWdpbnEAfgABc3IANWlvLmdpdGh1Yi5nYWdlcm4ubm9kZUphdmFEZXNlcmlhbGl6YXRpb24uQ3VzdG9tRm9ybWF0AAAAAAAAAAEDAAJJAANmb29MAANiYXJ0ABJMamF2YS9sYW5nL1N0cmluZzt4cAAAMDl0AA1IZWxsbywgV29ybGQhdwu16y0AtestALXrLXQACGFuZCBtb3JleHVxAH4AAAAAAAJxAH4ACHQAA0VuZA==',
    function(itm) {
      expect(itm['@'], "itm['@']").to.be.an('Array');
      expect(itm['@'], "itm['@']").to.have.lengthOf(2);
      expect(Buffer.isBuffer(itm['@'][0]), "Buffer.isBuffer(itm['@'][0])").to.be.true;
      expect(itm['@'][0].toString('hex'), "itm['@'][0].toString('hex')").to.equal('b5eb2d00b5eb2d00b5eb2d');
      expect(itm['@'][1], "itm['@'][1]").to.equal('and more');
      expect(itm.foo, "itm.foo").to.equal(12345);
      expect(itm.bar, "itm.bar").to.equal('Hello, World!');
    }));

  it('completely custom format', testCase(
    'rO0ABXVyABNbTGphdmEubGFuZy5PYmplY3Q7kM5YnxBzKWwCAAB4cAAAAAJ0AAVCZWdpbnEAfgABc3IAP2lvLmdpdGh1Yi5nYWdlcm4ubm9kZUphdmFEZXNlcmlhbGl6YXRpb24uQ29tcGxldGVseUN1c3RvbUZvcm1hdAAAAAAAAAABAwACSQADZm9vTAADYmFydAASTGphdmEvbGFuZy9TdHJpbmc7eHB0AA1IZWxsbywgV29ybGQhdw8AADA5testALXrLQC16y14dXEAfgAAAAAAAnEAfgAHdAADRW5k',
    function(itm) {
      expect(itm['@'], "itm['@']").to.be.an('Array');
      expect(itm['@'], "itm['@']").to.have.lengthOf(2);
      expect(itm['@'][0], "itm['@'][0]").to.equal('Hello, World!');
      expect(Buffer.isBuffer(itm['@'][1]), "Buffer.isBuffer(itm['@'][1])").to.be.true;
      expect(itm['@'][1].toString('hex'), "itm['@'][1].toString('hex')").to.equal('00003039b5eb2d00b5eb2d00b5eb2d');
    }));

  it('externalizable', testCase(
    'rO0ABXVyABNbTGphdmEubGFuZy5PYmplY3Q7kM5YnxBzKWwCAAB4cAAAAAJ0AAVCZWdpbnEAfgABc3IAMWlvLmdpdGh1Yi5nYWdlcm4ubm9kZUphdmFEZXNlcmlhbGl6YXRpb24uRXh0ZXJuYWyNBpwj8+bz8wwAAHhwdw8AAAALtestALXrLQC16y10AAhhbmQgbW9yZXh1cQB+AAAAAAACcQB+AAZ0AANFbmQ=',
    function(itm) {
      expect(itm['@'], "itm['@']").to.be.an('Array');
      expect(itm['@'], "itm['@']").to.have.lengthOf(2);
      expect(Buffer.isBuffer(itm['@'][0]), "Buffer.isBuffer(itm['@'][0])").to.be.true;
      expect(itm['@'][0].toString('hex'), "itm['@'][0].toString('hex')").to.equal('0000000bb5eb2d00b5eb2d00b5eb2d');
      expect(itm['@'][1], "itm['@'][1]").to.equal('and more');
      expect(itm, "itm").to.have.all.keys(['@']);
    }));

  it('long externalizable', testCase(
    'H4sIAAAAAAAAAFvzloG1tIhBONonK7EsUS8nMS9dzz8pKzW5xHrCuYj5AsWaOUwMDBUFDAwMTCUMrE6p6Zl5hQx1DIzFRQyGmfl66ZklGaVJeumJ6alFeXp5+SmpXkBzXFKLU4syE3MyqxJLMvPz9FwrSoDSiTm9bHOUPz/7/JkHZGQV0EgWIGZgYGRiZmFlY+fg5OLm4eXjFxAUEhYRFROXkJSSlpGVk1dQVFJWUVVT19DU0tbR1dM3MDQyNjE1M7ewtLK2sbWzd3B0cnZxdXP38PTy9vH18w8IDAoOCQ0Lj4iMio6JjYtPSExKTklNS8/IzMrOyc3LLygsKi4pLSuvqKyqrqmtq29obGpuaW1r7+js6u7p7eufMHHS5ClTp02fMXPW7Dlz581fsHDR4iVLly1fsXLV6jVr163fsHHT5i1bt23fsXPX7j179+0/cPDQ4SNHjx0/cfLU6TNnz52/cPHS5StXr12/cfPW7Tt3791/8PDR4ydPnz1/8fLV6zdv373/8PHT5y9fv33/8fPX7z9///0f6f4vYeBIzEtRyM0vSq0oBSUuEGACMdhKGJhd81IAbs5j0qUCAAA=',
    function(itm) {
      expect(itm['@'], "itm['@']").to.be.an('Array');
      expect(itm['@'], "itm['@']").to.have.lengthOf(2);
      expect(Buffer.isBuffer(itm['@'][0]), "Buffer.isBuffer(itm['@'][0])").to.be.true;
      expect(itm['@'][0], "itm['@'][0]").to.have.lengthOf(516);
      expect(itm['@'][0].toString('hex', 0, 4), "itm['@'][0].toString('hex', 0, 4)").to.equal('00000200');
      expect(itm['@'][0].toString('hex', 4, 8), "itm['@'][0].toString('hex', 4, 8)").to.equal('00010203');
      expect(itm['@'][1], "itm['@'][1]").to.equal('and more');
      expect(itm, "itm").to.have.all.keys(['@']);
    }));

  it('HashMap<String, …>', testCase(
    'rO0ABXVyABNbTGphdmEubGFuZy5PYmplY3Q7kM5YnxBzKWwCAAB4cAAAAAJ0AAVCZWdpbnEAfgABc3IAEWphdmEudXRpbC5IYXNoTWFwBQfawcMWYNEDAAJGAApsb2FkRmFjdG9ySQAJdGhyZXNob2xkeHA/QAAAAAAADHcIAAAAEAAAAAJ0AANiYXJ0AANiYXp0AANmb29zcgARamF2YS5sYW5nLkludGVnZXIS4qCk94GHOAIAAUkABXZhbHVleHIAEGphdmEubGFuZy5OdW1iZXKGrJUdC5TgiwIAAHhwAAAAe3h1cQB+AAAAAAACcQB+AAt0AANFbmQ=',
    function(itm) {
      expect(typeof itm.obj, "typeof itm.obj").to.equal('object');
      expect(typeof itm['@'], "typeof itm['@']").to.equal('object');
      expect(itm.obj.bar, "itm.obj.bar").to.equal('baz');
      expect(itm.obj.foo.value, "itm.obj.foo.value").to.equal(123);
      expect(itm.obj, "itm.obj").to.have.all.keys(['foo', 'bar']);
      expect(itm.map, "itm.map").to.be.an.instanceof(Map);
      expect(itm.map.get('bar'), "itm.map.get('bar')").to.equal('baz');
      expect(itm.map.get('foo').value, "itm.map.get('foo').value").to.equal(123);
      expect(itm.map.size, "itm.map.size").to.equal(2);
    }));

  it('HashMap<not String, …>', testCase(
    'rO0ABXVyABNbTGphdmEubGFuZy5PYmplY3Q7kM5YnxBzKWwCAAB4cAAAAAJ0AAVCZWdpbnEAfgABc3IAEWphdmEudXRpbC5IYXNoTWFwBQfawcMWYNEDAAJGAApsb2FkRmFjdG9ySQAJdGhyZXNob2xkeHA/QAAAAAAADHcIAAAAEAAAAAJ0AANiYXp0AANiYXJzcgARamF2YS5sYW5nLkludGVnZXIS4qCk94GHOAIAAUkABXZhbHVleHIAEGphdmEubGFuZy5OdW1iZXKGrJUdC5TgiwIAAHhwAAAAe3QAA2Zvb3hxAH4ACXVxAH4AAAAAAAJxAH4AC3QAA0VuZA==',
    function(itm, i123) {
      expect(typeof itm.obj, "typeof itm.obj").to.equal('object');
      expect(typeof itm['@'], "typeof itm['@']").to.equal('object');
      expect(itm['@'], "itm['@']").to.be.an('Array');
      expect(itm.obj, "itm.obj").to.have.all.keys(['baz']);
      expect(itm.obj.baz, "itm.obj.baz").to.equal('bar');
      expect(itm.map, "itm.map").to.be.an.instanceof(Map);
      expect(itm.map.get('baz'), "itm.map.get('baz')").to.equal('bar');
      expect(itm.map.get(i123), "itm.map.get(i123)").to.equal('foo');
      expect(itm.map.size, "itm.map.size").to.equal(2);
    }));

  it('empty HashMap', testCase(
    'rO0ABXVyABNbTGphdmEubGFuZy5PYmplY3Q7kM5YnxBzKWwCAAB4cAAAAAJ0AAVCZWdpbnEAfgABc3IAEWphdmEudXRpbC5IYXNoTWFwBQfawcMWYNEDAAJGAApsb2FkRmFjdG9ySQAJdGhyZXNob2xkeHA/QAAAAAAAAHcIAAAAEAAAAAB4dXEAfgAAAAAAAnEAfgAFdAADRW5k',
    function(itm) {
      expect(typeof itm.obj, "typeof itm.obj").to.equal('object');
      expect(itm.obj, "itm.obj").to.be.an('object').that.is.empty;
      expect(itm.map, "itm.map").to.be.an.instanceof(Map);
      expect(itm.map.size, "itm.map.size").to.equal(0);
    }));

  it('Hashtable<String, …>', testCase(
    'rO0ABXVyABNbTGphdmEubGFuZy5PYmplY3Q7kM5YnxBzKWwCAAB4cAAAAAJ0AAVCZWdpbnEAfgABc3IAE2phdmEudXRpbC5IYXNodGFibGUTuw8lIUrkuAMAAkYACmxvYWRGYWN0b3JJAAl0aHJlc2hvbGR4cD9AAAAAAAAIdwgAAAALAAAAAnQAA2JhcnQAA2JhenQAA2Zvb3NyABFqYXZhLmxhbmcuSW50ZWdlchLioKT3gYc4AgABSQAFdmFsdWV4cgAQamF2YS5sYW5nLk51bWJlcoaslR0LlOCLAgAAeHAAAAB7eHVxAH4AAAAAAAJxAH4AC3QAA0VuZA==',
    function(itm) {
      expect(typeof itm.obj, "typeof itm.obj").to.equal('object');
      expect(typeof itm['@'], "typeof itm['@']").to.equal('object');
      expect(itm.obj.bar, "itm.obj.bar").to.equal('baz');
      expect(itm.obj.foo.value, "itm.obj.foo.value").to.equal(123);
      expect(itm.obj, "itm.obj").to.have.all.keys(['foo', 'bar']);
      expect(itm.map, "itm.map").to.be.an.instanceof(Map);
      expect(itm.map.get('bar'), "itm.map.get('bar')").to.equal('baz');
      expect(itm.map.get('foo').value, "itm.map.get('foo').value").to.equal(123);
      expect(itm.map.size, "itm.map.size").to.equal(2);
    }));

  it('EnumMap', testCase(
    'rO0ABXVyABNbTGphdmEubGFuZy5PYmplY3Q7kM5YnxBzKWwCAAB4cAAAAAJ0AAVCZWdpbnEAfgABc3IAEWphdmEudXRpbC5FbnVtTWFwBl19976QfKEDAAFMAAdrZXlUeXBldAARTGphdmEvbGFuZy9DbGFzczt4cHZyADFpby5naXRodWIuZ2FnZXJuLm5vZGVKYXZhRGVzZXJpYWxpemF0aW9uLlNvbWVFbnVtAAAAAAAAAAASAAB4cgAOamF2YS5sYW5nLkVudW0AAAAAAAAAABIAAHhwdwQAAAACfnEAfgAGdAADT05Fc3IAEWphdmEubGFuZy5JbnRlZ2VyEuKgpPeBhzgCAAFJAAV2YWx1ZXhyABBqYXZhLmxhbmcuTnVtYmVyhqyVHQuU4IsCAAB4cAAAAHt+cQB+AAZ0AAVUSFJFRXQAA2JhenhxAH4ACXEAfgAOdXEAfgAAAAAAAnEAfgARdAADRW5k',
    function(itm, one, three) {
      expect(typeof itm.obj, "typeof itm.obj").to.equal('object');
      expect(typeof itm['@'], "typeof itm['@']").to.equal('object');
      expect(itm.obj.THREE, "itm.obj.THREE").to.equal('baz');
      expect(itm.obj.ONE.value, "itm.obj.ONE.value").to.equal(123);
      expect(itm.obj, "itm.obj").to.have.all.keys(['ONE', 'THREE']);
      expect(itm.keyType.name, "itm.keyType.name").to.equal('io.github.gagern.nodeJavaDeserialization.SomeEnum');
      expect(itm.keyType.isEnum, "itm.keyType.isEnum").to.be.true;
      expect(itm.map, "itm.map").to.be.an.instanceof(Map);
      expect(itm.map.get(three), "itm.map.get(three)").to.equal('baz');
      expect(itm.map.get(one).value, "itm.map.get(one).value").to.equal(123);
      expect(itm.map.size, "itm.map.size").to.equal(2);
    }));

  it('ArrayList', testCase(
    'rO0ABXVyABNbTGphdmEubGFuZy5PYmplY3Q7kM5YnxBzKWwCAAB4cAAAAAJ0AAVCZWdpbnEAfgABc3IAE2phdmEudXRpbC5BcnJheUxpc3R4gdIdmcdhnQMAAUkABHNpemV4cAAAAAJ3BAAAAAJ0AANmb29zcgARamF2YS5sYW5nLkludGVnZXIS4qCk94GHOAIAAUkABXZhbHVleHIAEGphdmEubGFuZy5OdW1iZXKGrJUdC5TgiwIAAHhwAAAAe3h1cQB+AAAAAAACcQB+AAl0AANFbmQ=',
    function(itm) {
      expect(itm.list, "itm.list").to.be.an('Array');
      expect(itm.list, "itm.list").to.have.lengthOf(2);
      expect(itm.list[0], "itm.list[0]").to.equal('foo');
      expect(itm.list[1].value, "itm.list[1].value").to.equal(123);
    }));

  it('ArrayDeque', testCase(
    'rO0ABXVyABNbTGphdmEubGFuZy5PYmplY3Q7kM5YnxBzKWwCAAB4cAAAAAJ0AAVCZWdpbnEAfgABc3IAFGphdmEudXRpbC5BcnJheURlcXVlIHzaLiQNoIsDAAB4cHcEAAAAAnQAA2Zvb3NyABFqYXZhLmxhbmcuSW50ZWdlchLioKT3gYc4AgABSQAFdmFsdWV4cgAQamF2YS5sYW5nLk51bWJlcoaslR0LlOCLAgAAeHAAAAB7eHVxAH4AAAAAAAJxAH4ACXQAA0VuZA==',
    function(itm) {
      expect(itm.list, "itm.list").to.be.an('Array');
      expect(itm.list, "itm.list").to.have.lengthOf(2);
      expect(itm.list[0], "itm.list[0]").to.equal('foo');
      expect(itm.list[1].value, "itm.list[1].value").to.equal(123);
    }));

  it('HashSet', testCase(
    'rO0ABXVyABNbTGphdmEubGFuZy5PYmplY3Q7kM5YnxBzKWwCAAB4cAAAAAJ0AAVCZWdpbnEAfgABc3IAEWphdmEudXRpbC5IYXNoU2V0ukSFlZa4tzQDAAB4cHcMAAAAED9AAAAAAAACdAADZm9vc3IAEWphdmEubGFuZy5JbnRlZ2VyEuKgpPeBhzgCAAFJAAV2YWx1ZXhyABBqYXZhLmxhbmcuTnVtYmVyhqyVHQuU4IsCAAB4cAAAAHt4dXEAfgAAAAAAAnEAfgAJdAADRW5k',
    function(itm) {
      expect(itm.set, "itm.set").to.be.an.instanceof(Set);
      expect(itm.set.size, "itm.set.size").to.equal(2);
      expect(itm.set.has('foo'), "itm.set.has('foo')").to.be.true;
    }));

});

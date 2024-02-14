"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.codeLowercaseF = exports.codeUppercaseF = exports.codeLowercaseE = exports.codeUppercaseE = exports.codeLowercaseA = exports.codeUppercaseA = exports.isValidStringCharacter = exports.parse = void 0;
var numberParsers_js_1 = require("./numberParsers.js"),
  revive_js_1 = require("./revive.js");
function parse(e, o) {
  var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : numberParsers_js_1.parseLosslessNumber,
    c = 0,
    t = i();
  return function (e) {
    if (void 0 === e) throw new SyntaxError("JSON value expected ".concat(y()));
  }(t), function () {
    if (c < e.length) throw new SyntaxError("Expected end of input ".concat(y()));
  }(), o ? (0, revive_js_1.revive)(t, o) : t;
  function n() {
    if (e.charCodeAt(c) === codeOpeningBrace) {
      c++, s();
      for (var o = {}, r = !0; c < e.length && e.charCodeAt(c) !== codeClosingBrace;) {
        r ? r = !1 : (p(), s());
        var t = u();
        void 0 === t && x(), Object.prototype.hasOwnProperty.call(o, t) && C(t), s(), h(), o[t] = i();
      }
      return e.charCodeAt(c) !== codeClosingBrace && function () {
        throw new SyntaxError("Quoted object key or end of object '}' expected ".concat(y()));
      }(), c++, o;
    }
  }
  function a() {
    if (e.charCodeAt(c) === codeOpeningBracket) {
      c++, s();
      for (var o = [], r = !0; c < e.length && e.charCodeAt(c) !== codeClosingBracket;) {
        r ? r = !1 : p();
        var t = i();
        l(t), o.push(t);
      }
      return e.charCodeAt(c) !== codeClosingBracket && function () {
        throw new SyntaxError("Array item or end of array ']' expected ".concat(y()));
      }(), c++, o;
    }
  }
  function i() {
    var o, t, i, p, h, l;
    s();
    var x = null !== (o = null !== (t = null !== (i = null !== (p = null !== (h = null !== (l = u()) && void 0 !== l ? l : function () {
      var o = c;
      e.charCodeAt(c) === codeMinus && (c++, f(o));
      if (e.charCodeAt(c) === codeZero) c++;else if (isNonZeroDigit(e.charCodeAt(c))) for (c++; isDigit(e.charCodeAt(c));) c++;
      if (e.charCodeAt(c) === codeDot) for (c++, f(o); isDigit(e.charCodeAt(c));) c++;
      if (e.charCodeAt(c) === exports.codeLowercaseE || e.charCodeAt(c) === exports.codeUppercaseE) for (c++, e.charCodeAt(c) !== codeMinus && e.charCodeAt(c) !== codePlus || c++, f(o); isDigit(e.charCodeAt(c));) c++;
      if (c > o) return r(e.slice(o, c));
    }()) && void 0 !== h ? h : n()) && void 0 !== p ? p : a()) && void 0 !== i ? i : d("true", !0)) && void 0 !== t ? t : d("false", !1)) && void 0 !== o ? o : d("null", null);
    return s(), x;
  }
  function d(o, r) {
    if (e.slice(c, c + o.length) === o) return c += o.length, r;
  }
  function s() {
    for (; isWhitespace(e.charCodeAt(c));) c++;
  }
  function u() {
    if (e.charCodeAt(c) === codeDoubleQuote) {
      c++;
      for (var o = ""; c < e.length && e.charCodeAt(c) !== codeDoubleQuote;) {
        if (e.charCodeAt(c) === codeBackslash) {
          var r = e[c + 1],
            t = escapeCharacters[r];
          void 0 !== t ? (o += t, c++) : "u" === r ? isHex(e.charCodeAt(c + 2)) && isHex(e.charCodeAt(c + 3)) && isHex(e.charCodeAt(c + 4)) && isHex(e.charCodeAt(c + 5)) ? (o += String.fromCharCode(parseInt(e.slice(c + 2, c + 6), 16)), c += 5) : A(c) : w(c);
        } else isValidStringCharacter(e.charCodeAt(c)) ? o += e[c] : v(e[c]);
        c++;
      }
      return function () {
        if (e.charCodeAt(c) !== codeDoubleQuote) throw new SyntaxError("End of string '\"' expected ".concat(y()));
      }(), c++, o;
    }
  }
  function p() {
    if (e.charCodeAt(c) !== codeComma) throw new SyntaxError("Comma ',' expected after value ".concat(y()));
    c++;
  }
  function h() {
    if (e.charCodeAt(c) !== codeColon) throw new SyntaxError("Colon ':' expected after property name ".concat(y()));
    c++;
  }
  function l(e) {
    if (void 0 === e) throw new SyntaxError("Array item expected ".concat(y()));
  }
  function f(o) {
    if (!isDigit(e.charCodeAt(c))) {
      var r = e.slice(o, c);
      throw new SyntaxError("Invalid number '".concat(r, "', expecting a digit ").concat(y()));
    }
  }
  function x() {
    throw new SyntaxError("Quoted object key expected ".concat(y()));
  }
  function C(e) {
    throw new SyntaxError("Duplicate key '".concat(e, "' encountered at position ").concat(c - e.length - 1));
  }
  function v(e) {
    throw new SyntaxError("Invalid character '".concat(e, "' ").concat(g()));
  }
  function w(o) {
    var r = e.slice(o, o + 2);
    throw new SyntaxError("Invalid escape character '".concat(r, "' ").concat(g()));
  }
  function A(o) {
    for (var r = o + 2; /\w/.test(e[r]);) r++;
    var c = e.slice(o, r);
    throw new SyntaxError("Invalid unicode character '".concat(c, "' ").concat(g()));
  }
  function g() {
    return "at position ".concat(c);
  }
  function y() {
    return (c < e.length ? "but got '".concat(e[c], "'") : "but reached end of input") + " " + g();
  }
}
function isWhitespace(e) {
  return e === codeSpace || e === codeNewline || e === codeTab || e === codeReturn;
}
function isHex(e) {
  return e >= codeZero && e <= codeNine || e >= exports.codeUppercaseA && e <= exports.codeUppercaseF || e >= exports.codeLowercaseA && e <= exports.codeLowercaseF;
}
function isDigit(e) {
  return e >= codeZero && e <= codeNine;
}
function isNonZeroDigit(e) {
  return e >= codeOne && e <= codeNine;
}
function isValidStringCharacter(e) {
  return e >= 32 && e <= 1114111;
}
exports.parse = parse, exports.isValidStringCharacter = isValidStringCharacter;
var escapeCharacters = {
    '"': '"',
    "\\": "\\",
    "/": "/",
    b: "\b",
    f: "\f",
    n: "\n",
    r: "\r",
    t: "\t"
  },
  codeBackslash = 92,
  codeOpeningBrace = 123,
  codeClosingBrace = 125,
  codeOpeningBracket = 91,
  codeClosingBracket = 93,
  codeSpace = 32,
  codeNewline = 10,
  codeTab = 9,
  codeReturn = 13,
  codeDoubleQuote = 34,
  codePlus = 43,
  codeMinus = 45,
  codeZero = 48,
  codeOne = 49,
  codeNine = 57,
  codeComma = 44,
  codeDot = 46,
  codeColon = 58;
exports.codeUppercaseA = 65, exports.codeLowercaseA = 97, exports.codeUppercaseE = 69, exports.codeLowercaseE = 101, exports.codeUppercaseF = 70, exports.codeLowercaseF = 102;
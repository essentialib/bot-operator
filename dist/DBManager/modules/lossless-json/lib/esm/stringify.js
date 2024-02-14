"use strict";

function _typeof2(o) { "@babel/helpers - typeof"; return _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof2(o); }
function _typeof(t) {
  return _typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function (t) {
    return _typeof2(t);
  } : function (t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof2(t);
  }, _typeof(t);
}
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.stringify = void 0;
var utils_js_1 = require("./utils.js");
function stringify(t, n, r, o) {
  var e = resolveSpace(r);
  return i("function" == typeof n ? n.call({
    "": t
  }, "", t) : t, "");
  function i(t, f) {
    if (Array.isArray(o)) {
      var u = o.find(function (n) {
        return n.test(t);
      });
      if (u) {
        var y = u.stringify(t);
        if ("string" != typeof y || !(0, utils_js_1.isNumber)(y)) throw new Error("Invalid JSON number: output of a number stringifier must be a string containing a JSON number " + "(output: ".concat(y, ")"));
        return y;
      }
    }
    return "boolean" == typeof t || "number" == typeof t || "string" == typeof t || null === t || t instanceof Date || t instanceof Boolean || t instanceof Number || t instanceof String ? JSON.stringify(t) : t && t.isLosslessNumber || "bigint" == typeof t ? t.toString() : Array.isArray(t) ? function (t, r) {
      if (0 === t.length) return "[]";
      for (var o = e ? r + e : void 0, f = e ? "[\n" : "[", u = 0; u < t.length; u++) {
        var y = "function" == typeof n ? n.call(t, String(u), t[u]) : t[u];
        e && (f += o), f += void 0 !== y && "function" != typeof y ? i(y, o) : "null", u < t.length - 1 && (f += e ? ",\n" : ",");
      }
      return f += e ? "\n" + r + "]" : "]", f;
    }(t, f) : t && "object" === _typeof(t) ? function (t, o) {
      if ("function" == typeof t.toJSON) return stringify(t.toJSON(), n, r, void 0);
      var f = Array.isArray(n) ? n.map(String) : Object.keys(t);
      if (0 === f.length) return "{}";
      var u = e ? o + e : void 0,
        y = !0,
        s = e ? "{\n" : "{";
      return f.forEach(function (r) {
        var o = "function" == typeof n ? n.call(t, r, t[r]) : t[r];
        if (function (t, n) {
          return void 0 !== n && "function" != typeof n && "symbol" !== _typeof(n);
        }(0, o)) {
          y ? y = !1 : s += e ? ",\n" : ",";
          var f = JSON.stringify(r);
          s += e ? u + f + ": " : f + ":", s += i(o, u);
        }
      }), s += e ? "\n" + o + "}" : "}", s;
    }(t, f) : void 0;
  }
}
function resolveSpace(t) {
  return "number" == typeof t ? " ".repeat(t) : "string" == typeof t && "" !== t ? t : void 0;
}
exports.stringify = stringify;
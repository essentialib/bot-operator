"use strict";

Array.prototype.flat || (Array.prototype.flat = function (t, r) {
  return r = this.concat.apply([], this), t > 1 && r.some(Array.isArray) ? r.flat(t - 1) : r;
}, Array.prototype.flatMap = function (t, r) {
  return this.map(t, r).flat();
});
String.prototype.replaceAll || (String.prototype.replaceAll = function (t, r) {
  return this.split(t).join(r);
});
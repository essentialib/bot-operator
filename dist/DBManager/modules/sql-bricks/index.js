"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
!function () {
  var t = "undefined" != typeof exports,
    e = {
      placeholder: "$%d"
    };
  function n(t) {
    return Object.keys(t).map(function (e) {
      return t[e];
    });
  }
  function r(t) {
    var e = Array.from(arguments);
    return e.shift(), Object.keys(e).forEach(function (n) {
      var r = e[n];
      Object.keys(r).forEach(function (e) {
        t[e] = r[e];
      });
    }), t;
  }
  function i(t) {
    return o.isArray(t) ? [].concat(arr) : r({}, t);
  }
  var o = {
    isObject: function isObject(t) {
      return "object" == _typeof(t);
    },
    isArray: function isArray(t) {
      return t instanceof Array;
    },
    isUndefined: function isUndefined(t) {
      return void 0 === t;
    },
    isNull: function isNull(t) {
      return null === t;
    },
    isNumber: function isNumber(t) {
      return "number" == typeof t;
    },
    isString: function isString(t) {
      return "string" == typeof t;
    },
    isBoolean: function isBoolean(t) {
      return "boolean" == typeof t;
    },
    isDate: function isDate(t) {
      return t instanceof Date;
    }
  };
  function s(t) {
    return o.isUndefined(t) || null === t || 0 == Object.keys(t).length;
  }
  function a(t) {
    return Object.keys(e).forEach(function (n) {
      t[n] || (t[n] = e[n]);
    }), t;
  }
  function u(t) {
    if (!(this instanceof u)) return tt(u, arguments);
    this.str = t, this.vals = n(arguments).slice(1), o.isArray(this.vals[0]) && (this.vals = this.vals[0]);
  }
  function c(t) {
    if (!(this instanceof c)) return new c(t);
    this.val = t;
  }
  function l() {
    return this instanceof l ? (l.super_.call(this, "select"), this.select.apply(this, arguments)) : new l(g(arguments));
  }
  u.setDefaultOpts = function (t) {
    e = r(e, t);
  }, u.prototype.toString = function (t) {
    function n() {
      if (!t.values.length) return arguments[0];
      var e = arguments.length > 3 ? parseInt(arguments[1], 10) : t.value_ix++,
        n = t.values[e - 1];
      if (o.isUndefined(n)) throw new Error("Parameterized sql() (" + i + ") requires " + e + " parameter(s) but only " + t.values.length + " parameter(s) were supplied");
      return o.isObject(u) && !o.isArray(u) && null == u ? n.toString(t) : u.convert(n);
    }
    var i = this.str;
    if (t || (t = r({}, e)), t.values || (t.values = []), t.value_ix || (t.value_ix = 1), this.vals.forEach(function (e) {
      t.values.push(e);
    }), t.value_ix > 1 && ("$%d" == t.placeholder ? i = i.replace(/\$(\d+)/g, function (e, n) {
      return "$" + (parseInt(n, 10) + t.value_ix - 1);
    }) : "?%d" == t.placeholder && (i = i.replace(/\?(\d+)/g, function (e, n) {
      return "?" + parseInt(n, 10) + t.value_ix - 1;
    }))), "$%d" == t.placeholder ? i = i.replace(/\$(?!\d)/g, function () {
      return "$" + t.value_ix++;
    }) : "?%d" == t.placeholder && (i = i.replace(/\?(?!\d)/g, function () {
      return "?" + t.value_ix++;
    })), t.parameterized) t.value_ix += this.vals.length;else if ("$%d" == t.placeholder) i = i.replace(/\$(\d+)/g, n);else if ("?%d" == t.placeholder) i = i.replace(/\?(\d+)/g, n);else if ("$" == t.placeholder) i = i.replace(/\$/g, n);else if ("?" == t.placeholder) i = i.replace(/\?/g, n);else if ("" != t.placeholder) throw new Error('Unsupported placeholder: "' + t.placeholder + '"');
    return i;
  }, u.val = c, [l, p, d, _].forEach(function (t) {
    t.defineClause = function (t, e, n) {
      var r;
      if (n = n || {}, e.clause_id = t, this.prototype.clauses = this.prototype.clauses || [], n.after || n.before) {
        if (r = function (t, e) {
          for (var n = 0; n < t.length; n++) if (e(t[n])) return n;
          return -1;
        }(this.prototype.clauses, function (t) {
          return t.clause_id == (n.after || n.before);
        }), -1 == r) throw new Error("Error adding clause " + t + ': dependent clause "' + n.after + '" not found');
        n.after && r++;
      } else r = this.prototype.clauses.length;
      this.prototype.clauses.splice(r, 0, e);
    };
  }), u.select = Z(l, y), l.prototype.select = function () {
    return this._addListArgs(arguments, "_columns");
  }, l.prototype.distinct = function () {
    return this._distinct = !0, this._addListArgs(arguments, "_columns");
  }, l.prototype.into = l.prototype.intoTable = function (t) {
    return this._into = t, this;
  }, l.prototype.intoTemp = l.prototype.intoTempTable = function (t) {
    return this._temp = !0, this._into = t, this;
  }, l.prototype.from = function () {
    return this._addListArgs(arguments, "_from");
  };
  var f = {
    join: "INNER",
    innerJoin: "INNER",
    leftJoin: "LEFT",
    leftOuterJoin: "LEFT",
    rightJoin: "RIGHT",
    rightOuterJoin: "RIGHT",
    fullJoin: "FULL",
    fullOuterJoin: "FULL",
    naturalJoin: "NATURAL INNER",
    naturalInnerJoin: "NATURAL INNER",
    naturalLeftJoin: "NATURAL LEFT",
    naturalLeftOuterJoin: "NATURAL LEFT",
    naturalRightJoin: "NATURAL RIGHT",
    naturalRightOuterJoin: "NATURAL RIGHT",
    naturalFullJoin: "NATURAL FULL",
    naturalFullOuterJoin: "NATURAL FULL",
    crossJoin: "CROSS"
  };
  Object.keys(f).forEach(function (t) {
    l.prototype[t] = function () {
      return this._addJoins(arguments, f[t]);
    };
  }), l.prototype.on = function (t) {
    var e = this.joins[this.joins.length - 1];
    if (o.isArray(e.on) && !s(e.on)) throw new Error("Error adding clause ON: " + e.left_tbl + " JOIN " + e.tbl + " already has a USING clause.");
    return B(t) ? e.on = t : (e.on && !o.isArray(e.on) || (e.on = {}), r(e.on, w(arguments))), this;
  }, l.prototype.using = function (t) {
    var e = this.joins[this.joins.length - 1];
    if (!s(e.on) && !o.isArray(e.on)) throw new Error("Error adding clause USING: " + e.left_tbl + " JOIN " + e.tbl + " already has an ON clause.");
    return s(e.on) && (e.on = []), g(arguments).forEach(function (t) {
      -1 == e.on.indexOf(t) && e.on.push(t);
    }), this;
  }, l.prototype.where = l.prototype.and = function () {
    return this._addExpression(arguments, "_where");
  }, l.prototype.having = function () {
    return this._addExpression(arguments, "_having");
  }, l.prototype.groupBy = l.prototype.group = function () {
    return this._addListArgs(arguments, "_groupBy");
  }, l.prototype.orderBy = l.prototype.order = function () {
    return this._addListArgs(arguments, "_orderBy");
  }, l.prototype.of = function () {
    return this._addListArgs(arguments, "_of");
  }, l.prototype.forUpdate = function () {
    return this._forUpdate = !0, this;
  }, l.prototype.noWait = function () {
    return this._noWait = !0, this;
  };
  var h = {
    union: "UNION",
    unionAll: "UNION ALL",
    intersect: "INTERSECT",
    intersectAll: "INTERSECT ALL",
    except: "EXCEPT",
    exceptAll: "EXCEPT ALL"
  };
  function p(t, e) {
    return this instanceof p ? (p.super_.call(this, "insert"), this.into.apply(this, arguments)) : "object" != _typeof(e) || o.isArray(e) ? new p(t, g(n(arguments).slice(1))) : new p(t, e);
  }
  function d(t, e) {
    return this instanceof d ? (d.super_.call(this, "update"), this._table = t, e && this.values(e), this) : new d(t, w(n(arguments).slice(1)));
  }
  function _(t) {
    return this instanceof _ ? (_.super_.call(this, "delete"), t && (this._from = t), this) : new _(t);
  }
  function y(t) {
    this.type = t;
  }
  function v(t, e, n, r) {
    this.tbl = t, this.left_tbl = e, this.on = n, this.type = r;
  }
  function g(t) {
    return o.isArray(t[0]) ? t[0] : "string" == typeof t[0] && t[0].indexOf(",") > -1 ? t[0].split(",").map(function (t) {
      return t.trim();
    }) : n(t);
  }
  function w(t) {
    if ("object" == _typeof(t[0])) return t[0];
    var e = {};
    return null != t[0] && (e[t[0]] = t[1]), e;
  }
  function m(t, e) {
    this.op = t, this.expressions = [], e.forEach(function (t) {
      B(t) ? this.expressions.push(t) : this.expressions = this.expressions.concat(q(t));
    }.bind(this));
  }
  function b(t) {
    B(t) ? this.expressions = [t] : this.expressions = [u.and(t)];
  }
  Object.keys(h).forEach(function (t) {
    l.prototype[t] = function () {
      var e = g(arguments);
      if (!e.length) {
        var n = new l();
        n.prev_stmt = this, e = [n];
      }
      return this._add(e, "_" + t), n || this;
    };
  }), l.prototype._toNestedString = function (t) {
    return "(" + this._toString(t) + ")" + this._aliasToString(t);
  }, l.prototype._aliasToString = function (t) {
    return this._alias ? " " + Q(this._alias) : "";
  }, l.prototype.as = function (t) {
    return this._alias = t, this;
  }, l.prototype._toString = function (t) {
    return this._columns.length || (this._columns = ["*"]), l.super_.prototype._toString.apply(this, arguments);
  }, l.defineClause("select", function (t) {
    return "SELECT ".concat(this._distinct ? "DISTINCT " : "") + (this._columns ? W(this._columns, t) : "");
  }), l.defineClause("into", function (t) {
    if (this._into) return "INTO ".concat(this._temp ? "TEMP " : "").concat(G(this._into, t));
  }), l.defineClause("from", function (t) {
    if (this._from) {
      var e = "FROM ".concat(D(this._from, t));
      return this.joins && (e += " " + this.joins.map(function (e) {
        return e.toString(t);
      }.bind(this)).join(" ")), e;
    }
  }), l.defineClause("where", function (t) {
    if (this._where) return "WHERE ".concat(F(this._where, t));
  }), l.defineClause("groupBy", function (t) {
    if (this._groupBy) return "GROUP BY ".concat(W(this._groupBy, t));
  }), l.defineClause("having", function (t) {
    if (this._having) return "HAVING ".concat(F(this._having, t));
  }), Object.keys(h).forEach(function (t) {
    var e = h[t];
    l.defineClause(t, function (n) {
      var r = this["_" + t];
      if (r) return r.map(function (t) {
        return e + " " + t._toString(n);
      }).join(" ");
    });
  }), l.defineClause("orderBy", function (t) {
    if (this._orderBy) return "ORDER BY ".concat(W(this._orderBy, t));
  }), l.defineClause("forUpdate", function (t) {
    if (this._forUpdate) return "FOR UPDATE".concat(this._of ? " OF ".concat(W(this._of, t)) : "") + (this._noWait ? " NOWAIT" : "");
  }), u.insert = u.insertInto = Z(p, y), p.prototype.into = function (t, e) {
    if (t && (this._table = t), e) if (X(e) || o.isArray(e) && X(e[0])) this.values(e);else if (e.length) {
      this._split_keys_vals_mode = !0, this._values = [{}], g(n(arguments).slice(1)).forEach(function (t) {
        this._values[0][t] = null;
      }.bind(this));
    }
    return this;
  }, p.prototype.values = function () {
    if (this._split_keys_vals_mode) {
      var t;
      t = o.isArray(arguments[0]) && o.isArray(arguments[0][0]) ? arguments[0] : [g(arguments)];
      var e = Object.keys(this._values[0]);
      t.forEach(function (t, n) {
        this._values[n] || (this._values[n] = {}), e.forEach(function (e, r) {
          this._values[n][e] = t[r];
        }.bind(this));
      }.bind(this));
    } else o.isArray(arguments[0]) && X(arguments[0][0]) ? (this._values || (this._values = []), this._values = this._values.concat(arguments[0])) : (this._values || (this._values = [{}]), r(this._values[0], w(arguments)));
    return this;
  }, p.prototype.select = function () {
    return this._select = u.select.apply(null, arguments), this._select.prev_stmt = this, this._select;
  }, p.defineClause("insert", function () {
    return "INSERT";
  }), p.defineClause("into", function (t) {
    if (this._table) return "INTO ".concat(G(this._table, t));
  }), p.defineClause("columns", function (t) {
    if (this._values) return "(" + W(Object.keys(this._values[0]), t) + ")";
  }), p.defineClause("values", function (t) {
    if (this._select) return this._select._toString(t);
    var e = Object.keys(this._values[0]);
    return "VALUES " + this._values.map(function (n) {
      return "(" + P(e.map(function (t) {
        return n[t];
      }), t).join(", ") + ")";
    }).join(", ");
  }), u.update = Z(d, y), d.prototype.set = d.prototype.values = function () {
    return this._addToObj(w(arguments), "_values");
  }, d.prototype.where = d.prototype.and = l.prototype.where, d.defineClause("update", function () {
    return "UPDATE";
  }), d.defineClause("table", function (t) {
    return G(this._table, t);
  }), d.defineClause("set", function (t) {
    return "SET " + Object.keys(this._values).map(function (e) {
      return z(e, t) + " = " + $(this._values[e], t);
    }.bind(this)).join(", ");
  }), d.defineClause("where", function (t) {
    if (this._where) return "WHERE ".concat(F(this._where, t));
  }), u["delete"] = u.deleteFrom = Z(_, y), _.prototype.from = function (t) {
    return this._from = t, this;
  }, _.prototype.where = _.prototype.and = l.prototype.where, _.defineClause("delete", function (t) {
    return "DELETE FROM ".concat(G(this._from, t));
  }), _.defineClause("where", function (t) {
    if (this._where) return "WHERE ".concat(F(this._where, t));
  }), u.Statement = y, y.prototype.clone = function () {
    var t;
    [l, p, d, _].forEach(function (e) {
      this instanceof e && (t = e);
    }.bind(this));
    var e = r(new t(), this);
    return e._where && (e._where = e._where.clone()), e.joins && (e.joins = e.joins.slice()), e._values && (o.isArray(e._values) ? e._values = e._values.map(function (t) {
      return i(t);
    }) : e._values = i(e._values)), e;
  }, y.prototype.toParams = function (t) {
    return this.prev_stmt ? this.prev_stmt.toParams(t) : (t || (t = {}), r(t, {
      parameterized: !0,
      values: [],
      value_ix: 1
    }), t = a(t), {
      text: this._toString(t),
      values: t.values
    });
  }, y.prototype.prepare = function () {
    return this.toParams({
      placeholder: "?"
    });
  }, y.prototype.toString = function (t) {
    return t || (t = {}), t = a(t), this.prev_stmt ? this.prev_stmt.toString(t) : this._toString(t).trim();
  }, y.prototype._toString = function (t) {
    var e = [];
    return this.clauses.forEach(function (n) {
      (n = n.call(this, t)) && e.push(n);
    }.bind(this)), e.join(" ");
  }, y.prototype._add = function (t, e) {
    return this[e] || (this[e] = []), this[e] = this[e].concat(t), this;
  }, y.prototype._addToObj = function (t, e) {
    return this[e] || (this[e] = {}), r(this[e], t), this;
  }, y.prototype._addListArgs = function (t, e) {
    return this._add(g(t), e);
  }, y.prototype._addExpression = function (t, e) {
    if (t.length <= 1 && (null == t[0] || s(t[0]))) return this;
    this[e] || (this[e] = u.and());
    var n = function (t) {
      var e = !0;
      if (Object.keys(t).forEach(function (n) {
        var r = t[n];
        "object" != _typeof(r) || r instanceof c || r instanceof u || null == r || (e = !1);
      }), e) return t[0] instanceof u && 1 == t.length ? [t[0]] : (Log.d("ok"), [u.equal(t[0], t[1])]);
      var n = [];
      return Object.keys(t).forEach(function (e) {
        var r = t[e];
        B(r) ? n.push(r) : n = n.concat(q(r));
      }), n;
    }(t);
    return this[e].expressions = this[e].expressions.concat(n), this;
  }, y.prototype._addJoins = function (t, e) {
    if (this.joins || (this.joins = []), "object" == _typeof(t[1])) {
      var n = [t[0]],
        r = t[1];
      t[2];
    } else n = g(t);
    return n.forEach(function (t) {
      var n = this.last_join || this._from && this._from[this._from.length - 1];
      this.joins.push(new v(t, n, r, e));
    }.bind(this)), this.last_join = n[n.length - 1], this;
  }, u.Join = v, v.prototype.autoGenerateOn = function (t, e) {
    return u._joinCriteria(J(e), U(e), J(t), U(t));
  }, v.prototype.toString = function (t) {
    var e = this.on,
      n = G(this.tbl, t);
    if (/^(natural|cross)/i.test(this.type)) return this.type + " JOIN " + n;
    if (!e || s(e)) {
      if (!u._joinCriteria) throw new Error('No join criteria supplied for "' + U(n) + '" join');
      var r = G(this.left_tbl, t);
      e = this.autoGenerateOn(n, r);
    }
    return o.isArray(e) ? (e = e.map(function (t) {
      return z(t);
    }).join(", "), this.type + " JOIN " + n + " USING (" + e + ")") : (e = B(e) ? e.toString(t) : Object.keys(e).map(function (n) {
      return z(n, t) + " = " + z(e[n], t);
    }).join(" AND "), this.type + " JOIN " + n + " ON " + e);
  }, u.and = function () {
    return new m("AND", g(arguments));
  }, u.or = function () {
    return new m("OR", g(arguments));
  }, u.Group = m, m.prototype.clone = function () {
    return new m(this.op, this.expressions.map(function (t) {
      return t.clone();
    }));
  }, m.prototype.toString = function (t) {
    t = t || r({}, e);
    var n = Object.keys(this.expressions).map(function (e) {
      return this.expressions[e].toString(t);
    }.bind(this)).join(" " + this.op + " ");
    return this.expressions.length > 1 && !1 !== this.parens && (n = "(" + n + ")"), n;
  }, u.not = function (t) {
    return new b(t);
  }, u.Not = b, b.prototype.clone = function () {
    return new b(this.expressions[0].clone());
  }, b.prototype.toString = function (t) {
    return "NOT " + this.expressions[0].toString(t);
  };
  var E = {
      eq: "=",
      equal: "=",
      notEq: "<>",
      lt: "<",
      lte: "<=",
      gt: ">",
      gte: ">="
    },
    A = ["All", "Any"];
  for (var O in E) u[O] = function (t, e, n) {
    return x(E[t], e, n);
  }.bind(null, O), A.forEach(function (t, e) {
    u[t + e] = function (n, r) {
      return x(E[t], n, r, e.toUpperCase() + " ");
    };
  }.bind(null, O)), u[O + "Some"] = u[O + "Any"];
  function S(t) {
    return Array.isArray(t) || t instanceof y;
  }
  function N(t) {
    return Array.isArray(t) && void 0 !== t[1];
  }
  var j = ["~", "^", "!^", "><", "<>", "!~"];
  function x(t, e, n, r) {
    if (null == n) return new T(t, e, n, r);
    var i = e.split("["),
      o = i[0],
      s = i[1];
    if (void 0 === s) return new T(t, e, n, r);
    if (s = s.slice(0, -1), !j.includes(s)) return new T(t, e, n, r);
    if ("~" === s) return new L(o, n);
    if ("!~" === s) return new b(new L(o, n));
    if ("^" === s) {
      if (!S(n)) throw new SyntaxError("질의문 IN은 배열 또는 서브쿼리만 받습니다");
      return new k(o, n);
    }
    if ("!^" === s) {
      if (!S(n)) throw new SyntaxError("질의문 IN은 배열 또는 서브쿼리만 받습니다");
      return new b(new k(o, n));
    }
    if ("<>" === s) {
      if (!N(n)) throw new SyntaxError("질의문 BETWEEN은 배열만 받습니다");
      return new C(o, n[0], n[1]);
    }
    if ("><" === s) {
      if (!N(n)) throw new SyntaxError("질의문 BETWEEN은 배열을 받습니다");
      return new b(new C(o, n[0], n[1]));
    }
  }
  function T(t, e, n, r) {
    if (null == n) {
      if ("=" == t) return u.isNull(e);
      if ("<>" == t) return u.isNotNull(e);
    }
    var i = e.split("["),
      o = i[0],
      s = i[1];
    if (void 0 === s) this.op = "=", this.col = o, this.val = n;else switch (s = s.slice(0, -1)) {
      case "":
      case "=":
        t = "=";
        break;
      case "!":
        t = "<>";
        break;
      case "<":
        t = "<";
        break;
      case "<=":
        t = "<=";
        break;
      case ">":
        t = ">";
        break;
      case ">=":
        t = ">=";
    }
    this.op = t, this.col = o, this.val = n, this.quantifier = r || "";
  }
  function L(t, e, n) {
    this.col = t, this.val = e, this.escape_char = n;
  }
  function C(t, e, n) {
    this.col = t, this.val1 = e, this.val2 = n;
  }
  function I(t, e) {
    this.op = t, this.col = e;
  }
  function k(t, e) {
    this.col = t, this.list = e;
  }
  function R(t) {
    this.subquery = t;
  }
  function U(t) {
    var e = " AS ",
      n = t.indexOf(e);
    return -1 == n && (e = " ", n = t.indexOf(e)), n > -1 ? t.slice(n + e.length) : t;
  }
  function J(t) {
    var e = t.indexOf(" ");
    return e > -1 && (t = t.slice(0, e)), '"' == t[0] && '"' == t[t.length - 1] && (t = t.slice(1, -1)), t;
  }
  function B(t) {
    return t instanceof u || t instanceof m || t instanceof b || t instanceof T || t instanceof I || t instanceof k || t instanceof L || t instanceof C || t instanceof R;
  }
  function q(t) {
    var e = [];
    for (var n in t) e.push(u.equal(n, t[n]));
    return e;
  }
  function F(t, e) {
    return t.parens = !1, t.expressions && 1 == t.expressions.length && (t.expressions[0].parens = !1), t.toString(e);
  }
  function P(t, e) {
    return t.map(function (t) {
      return $(t, e);
    });
  }
  function $(t, e) {
    return t instanceof y ? "(" + t._toString(e) + ")" : t instanceof u ? t.toString(e) : e.parameterized ? (e.values.push(t), e.placeholder.replace("%d", e.value_ix++)) : u.convert(t);
  }
  function D(t, e) {
    return t.map(function (t) {
      return G(t, e);
    }).join(", ");
  }
  function G(t, e) {
    return z("string" == typeof (n = t) && n in u._aliases ? u._aliases[n] + " " + n : n, e);
    var n;
  }
  function W(t, e) {
    return t.map(function (t) {
      return z(t, e);
    }).join(", ");
  }
  u.Binary = T, T.prototype.clone = function () {
    return new T(this.op, this.col, this.val);
  }, T.prototype.toString = function (t) {
    return z(this.col, t) + " " + this.op + " " + this.quantifier + $(this.val, t);
  }, u.like = function (t, e, n) {
    return new L(t, e, n);
  }, u.Like = L, L.prototype.clone = function () {
    return new L(this.col, this.val, this.escape_char);
  }, L.prototype.toString = function (t) {
    var e = z(this.col, t) + " LIKE " + $(this.val, t);
    return this.escape_char && (e += " ESCAPE '" + this.escape_char + "'"), e;
  }, u.between = function (t, e, n) {
    return new C(t, e, n);
  }, u.Between = C, C.prototype.clone = function () {
    return new C(this.col, this.val1, this.val2);
  }, C.prototype.toString = function (t) {
    return z(this.col, t) + " BETWEEN " + $(this.val1, t) + " AND " + $(this.val2, t);
  }, u.isNull = function (t) {
    return new I("IS NULL", t);
  }, u.isNotNull = function (t) {
    return new I("IS NOT NULL", t);
  }, u.Unary = I, I.prototype.clone = function () {
    return new I(this.op, this.col);
  }, I.prototype.toString = function (t) {
    return z(this.col, t) + " " + this.op;
  }, u["in"] = function (t, e) {
    return o.isArray(e) || e instanceof y ? new k(t, e) : new k(t, n(arguments).slice(1));
  }, u.In = k, k.prototype.clone = function () {
    var t = this.list instanceof y ? this.list.clone() : i(this.list);
    return new k(this.col, t);
  }, k.prototype.toString = function (t) {
    var e,
      n = z(this.col, t);
    return o.isArray(this.list) ? e = P(this.list, t).join(", ") : this.list instanceof y && (e = this.list._toString(t)), n + " IN (" + e + ")";
  }, u.exists = function (t) {
    return new R(t);
  }, u.Exists = R, R.prototype.clone = function () {
    return new R(this.subquery.clone());
  }, R.prototype.toString = function (t) {
    return "EXISTS (" + this.subquery._toString(t) + ")";
  }, u._handleExpression = F, u._handleValues = P, u._handleValue = $, u.convert = function (t) {
    for (var e in u.conversions) if (o["is" + e](t)) return u.conversions[e](t);
    throw new Error("value is of an unsupported type and cannot be converted to SQL: " + t);
  }, u.conversions = {
    String: function String(t) {
      return "'" + t.replace(/'/g, "''") + "'";
    },
    Null: function Null() {
      return "null";
    },
    Undefined: function Undefined() {
      return "null";
    },
    Number: function Number(t) {
      return t.toString();
    },
    Boolean: function Boolean(t) {
      return t.toString().toUpperCase();
    },
    Date: function Date(t) {
      return "TIMESTAMP WITH TIME ZONE '" + t.toISOString().replace("T", " ").replace("Z", "+00:00") + "'";
    }
  }, u._handleTables = D, u._handleTable = G, u._handleColumns = W;
  var H = /^[\w\.]+(( AS)? \w+)?$/i;
  function z(t, e) {
    return t instanceof y ? t._toNestedString(e) : t instanceof c ? $(t.val, e) : t instanceof u ? t.toString(e) : H.test(t) ? M(t) : t;
  }
  function M(t) {
    var e = "",
      n = t.lastIndexOf(".");
    n > -1 && (e = t.slice(0, n), t = t.slice(n + 1));
    var r = "",
      i = t.indexOf(" ");
    return i > -1 && (r = t.slice(i), t = t.slice(0, i)), (e ? Q(e) + "." : "") + Q(t) + r;
  }
  function Q(t) {
    return /^\w+$/.test(t) && (/[A-Z]/.test(t) || t in V) ? u._autoQuoteChar + t + u._autoQuoteChar : t;
  }
  u._handleColumn = z, u._quoteColOrTbl = M, u._autoQuoteChar = '"', u._autoQuote = Q;
  var V = ["all", "analyse", "analyze", "and", "any", "array", "as", "asc", "asymmetric", "authorization", "both", "case", "cast", "check", "collate", "collation", "column", "constraint", "create", "cross", "current_catalog", "current_date", "current_role", "current_time", "current_timestamp", "current_user", "default", "deferrable", "desc", "distinct", "do", "else", "end", "except", "false", "fetch", "for", "foreign", "freeze", "from", "full", "grant", "group", "having", "ilike", "in", "initially", "inner", "intersect", "into", "is", "isnull", "join", "lateral", "leading", "left", "like", "limit", "localtime", "localtimestamp", "natural", "not", "notnull", "null", "offset", "on", "only", "or", "order", "outer", "over", "overlaps", "placing", "primary", "references", "returning", "right", "select", "session_user", "similar", "some", "symmetric", "table", "then", "to", "trailing", "true", "union", "unique", "user", "using", "variadic", "verbose", "when", "where", "window", "with", "abort", "action", "add", "after", "all", "alter", "analyze", "and", "as", "asc", "attach", "autoincrement", "before", "begin", "between", "by", "cascade", "case", "cast", "check", "collate", "column", "commit", "conflict", "constraint", "create", "cross", "current_date", "current_time", "current_timestamp", "database", "default", "deferrable", "deferred", "delete", "desc", "detach", "distinct", "drop", "each", "else", "end", "escape", "except", "exclusive", "exists", "explain", "fail", "for", "foreign", "from", "full", "glob", "group", "having", "if", "ignore", "immediate", "in", "index", "indexed", "initially", "inner", "insert", "instead", "intersect", "into", "is", "isnull", "join", "key", "left", "like", "limit", "match", "natural", "no", "not", "notnull", "null", "of", "offset", "on", "or", "order", "outer", "plan", "pragma", "primary", "query", "raise", "references", "regexp", "reindex", "release", "rename", "replace", "restrict", "right", "rollback", "row", "savepoint", "select", "set", "table", "temp", "temporary", "then", "to", "transaction", "trigger", "union", "unique", "update", "using", "vacuum", "values", "view", "virtual", "when", "where"],
    Y = {};
  function X(t) {
    return o.isObject(t) && !o.isArray(t);
  }
  function Z(t, e) {
    function n() {}
    return Object.create ? (t.super_ = e, t.prototype = Object.create(e.prototype, {
      constructor: {
        value: t,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    })) : (n.prototype = e.prototype, t.super_ = e, t.prototype = new n(), t.prototype.constructor = t), t;
  }
  function K(t) {
    return Z(function e() {
      if (!(this instanceof e)) return tt(e, arguments);
      t.apply(this, arguments);
    }, t);
  }
  function tt(t, e) {
    return (e = n(e)).unshift(null), new (t.bind.apply(t, e))();
  }
  V.forEach(function (t) {
    Y[t] = t;
  }), V = Y, u._reserved = V, u._aliases = {}, u.aliasExpansions = function (t) {
    u._aliases = t;
  }, u.joinCriteria = function (t) {
    if (!t) return u._joinCriteria;
    u._joinCriteria = t;
  }, u.inherits = Z, u._extension = function () {
    var t = K(u);
    return Object.keys(u).forEach(function (e) {
      t[e] = u[e];
    }), ["select", "insert", "update", "delete"].forEach(function (e) {
      var n = u[e];
      t[e] = K(n), t[e].defineClause = n.defineClause, t[e].prototype.clauses = n.prototype.clauses.slice();
    }), t.insertInto = t.insert, t.deleteFrom = t["delete"], t;
  }, u.exp = function (t, e) {
    var n = t.split("["),
      r = n[0],
      i = n[1];
    if (void 0 === i) return u.eq(r, e);
    switch (i = i.slice(0, -1)) {
      case "":
      case "=":
        return u.eq(r, e);
      case "!":
        return u.notEq(r, e);
      case "<":
        return u.lt(r, e);
      case "<=":
        return u.lte(r, e);
      case ">":
        return u.gt(r, e);
      case ">=":
        return u.gte(r, e);
      case "<>":
        if (Array.isArray(e)) return u.between(r, e[0], e[1]);
        throw new Error("You must input array in between");
      case "><":
        if (Array.isArray(e)) return u.not(u.between(r, e[0], e[1]));
        throw new Error("You must input array in between");
      case "~":
        return u.like(r, e);
      case "^":
        return Array.isArray(e) ? u["in"].apply(null, [r].concat(e)) : u["in"](r, e);
      case "!^":
        return Array.isArray(e) ? u.not(u["in"].apply(null, [r].concat(e))) : u["in"](r, e);
      default:
        throw new Error("Unexpected Token");
    }
  }, u.update.defineClause("or", function (t) {
    return this._or ? "OR ".concat(this._or) : "";
  }, {
    after: "update"
  }), u.insert.defineClause("or", function (t) {
    return this._or ? "OR ".concat(this._or) : "";
  }, {
    after: "insert"
  });
  var et = {
    orReplace: "REPLACE",
    orRollback: "ROLLBACK",
    orAbort: "ABORT",
    orFail: "FAIL"
  };
  Object.keys(et).forEach(function (t) {
    u.insert.prototype[t] = d.prototype[t] = function () {
      return this._or = et[t], this;
    };
  }), u.select.prototype.limit = function (t) {
    return this._limit = t, this;
  }, u.select.prototype.offset = function (t) {
    return this._offset = t, this;
  }, u.select.defineClause("limit", function (t) {
    return null != this._limit ? "LIMIT ".concat($(this._limit, t)) : "";
  }, {
    after: "orderBy"
  }), u.select.defineClause("offset", function (t) {
    return null != this._offset ? "OFFSET ".concat($(this._offset, t)) : "";
  }, {
    after: "limit"
  }), t ? module.exports = u : window.SqlBricks = u;
}();
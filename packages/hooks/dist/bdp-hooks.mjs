import { ref as m, watchEffect as R, unref as S, watch as H, onScopeDispose as dt, computed as j, inject as vo, reactive as pt, isRef as se, toRefs as ar, provide as po, shallowReadonly as ea, readonly as N, onUnmounted as qe, createApp as yo, defineComponent as go, markRaw as ta, onMounted as yt, onBeforeUnmount as ho, nextTick as mo, getCurrentScope as bo } from "vue";
function K_() {
  return {};
}
const ra = (e, { manual: t, ready: r = !0, refreshDeps: n = [], refreshDepsAction: a }) => {
  const o = m(!1);
  return R(() => {
    !t && e.options.refreshDeps !== !0 && (o.value = S(r));
  }), n instanceof Array ? H(
    [o, ...n],
    ([i]) => {
      !i || !t && i && (a ? a() : e.refresh());
    },
    {
      deep: !0,
      immediate: !1
    }
  ) : H(o, (i) => {
    !t && i && (a ? a() : e.refresh());
  }), {
    name: "autoRunPlugin",
    onBefore: () => {
      if (!S(r))
        return {
          stopNow: !0
        };
    }
  };
};
ra.onInit = ({ ready: e = !0, manual: t }) => ({
  loading: !t && S(e)
});
const me = /* @__PURE__ */ new Map(), _o = (e, t, r) => {
  const n = me.get(e);
  n != null && n.timer && clearTimeout(n.timer);
  let a;
  t > -1 && (a = setTimeout(() => {
    me.delete(e);
  }, t)), me.set(e, {
    ...r,
    timer: a
  });
}, $o = (e) => me.get(e), Q_ = (e) => {
  e ? (Array.isArray(e) ? e : [e]).forEach((r) => me.delete(r)) : me.clear();
}, nt = /* @__PURE__ */ new Map(), So = (e) => nt.get(e), wo = (e, t) => {
  nt.set(e, t), t.then((r) => (nt.delete(e), r)).catch((r) => {
    throw nt.delete(e), r;
  });
}, oe = {}, Eo = [], Oo = (e, t) => {
  oe[e] && (oe[e].forEach((r) => r(t)), Eo.forEach((r) => r({
    type: e,
    data: t
  })));
}, Et = (e, t) => (oe[e] || (oe[e] = []), oe[e].push(t), function() {
  const n = oe[e].indexOf(t);
  oe[e].splice(n, 1);
}), Ao = (e, {
  cacheKey: t,
  cacheTime: r = 5 * 60 * 1e3,
  staleTime: n = 0,
  setCache: a,
  getCache: o
}) => {
  const i = m(), s = m(), l = (c, f) => {
    a ? a(f) : _o(c, r, f), Oo(c, f.data);
  }, u = (c, f = []) => o ? o(f) : $o(c);
  return R(() => {
    if (!t)
      return;
    const c = u(t);
    c && Object.hasOwnProperty.call(c, "data") && (e.state.data = c.data, e.state.params = c.params, (n === -1 || new Date().getTime() - c.time <= n) && (e.state.loading = !1)), i.value = Et(t, (f) => {
      e.setState({ data: f });
    });
  }), dt(() => {
    var c;
    (c = i.value) == null || c.call(i);
  }), t ? {
    name: "cachePlugin",
    onBefore: (c) => {
      const f = u(t, c);
      return !f || !Object.hasOwnProperty.call(f, "data") ? {} : n === -1 || new Date().getTime() - f.time <= n ? {
        loading: !1,
        data: f == null ? void 0 : f.data,
        returnNow: !0
      } : {
        data: f == null ? void 0 : f.data
      };
    },
    onRequest: (c, f) => {
      let v = So(t);
      return v && v !== s.value ? { servicePromise: v } : (v = c(...f), s.value = v, wo(t, v), { servicePromise: v });
    },
    onSuccess: (c, f) => {
      var v;
      t && ((v = i.value) == null || v.call(i), l(t, {
        data: c,
        params: f,
        time: new Date().getTime()
      }), i.value = Et(t, (d) => {
        e.setState({ data: d });
      }));
    },
    onMutate: (c) => {
      var f;
      t && ((f = i.value) == null || f.call(i), l(t, {
        data: c,
        params: e.state.params,
        time: new Date().getTime()
      }), i.value = Et(t, (v) => {
        e.setState({ data: v });
      }));
    }
  } : {};
};
var Le = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function To(e) {
  var t = e.default;
  if (typeof t == "function") {
    var r = function() {
      return t.apply(this, arguments);
    };
    r.prototype = t.prototype;
  } else
    r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(e).forEach(function(n) {
    var a = Object.getOwnPropertyDescriptor(e, n);
    Object.defineProperty(r, n, a.get ? a : {
      enumerable: !0,
      get: function() {
        return e[n];
      }
    });
  }), r;
}
function Po(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var V = Po, Io = typeof Le == "object" && Le && Le.Object === Object && Le, na = Io, Co = na, xo = typeof self == "object" && self && self.Object === Object && self, Ro = Co || xo || Function("return this")(), z = Ro, Do = z, Fo = function() {
  return Do.Date.now();
}, Lo = Fo, Mo = /\s/;
function No(e) {
  for (var t = e.length; t-- && Mo.test(e.charAt(t)); )
    ;
  return t;
}
var jo = No, Uo = jo, Bo = /^\s+/;
function Go(e) {
  return e && e.slice(0, Uo(e) + 1).replace(Bo, "");
}
var Ho = Go, qo = z, Wo = qo.Symbol, gt = Wo, Tr = gt, aa = Object.prototype, ko = aa.hasOwnProperty, Vo = aa.toString, Re = Tr ? Tr.toStringTag : void 0;
function zo(e) {
  var t = ko.call(e, Re), r = e[Re];
  try {
    e[Re] = void 0;
    var n = !0;
  } catch {
  }
  var a = Vo.call(e);
  return n && (t ? e[Re] = r : delete e[Re]), a;
}
var Ko = zo, Qo = Object.prototype, Yo = Qo.toString;
function Xo(e) {
  return Yo.call(e);
}
var Jo = Xo, Pr = gt, Zo = Ko, ei = Jo, ti = "[object Null]", ri = "[object Undefined]", Ir = Pr ? Pr.toStringTag : void 0;
function ni(e) {
  return e == null ? e === void 0 ? ri : ti : Ir && Ir in Object(e) ? Zo(e) : ei(e);
}
var Ee = ni;
function ai(e) {
  return e != null && typeof e == "object";
}
var J = ai, oi = Ee, ii = J, si = "[object Symbol]";
function li(e) {
  return typeof e == "symbol" || ii(e) && oi(e) == si;
}
var ui = li, ci = Ho, Cr = V, fi = ui, xr = 0 / 0, vi = /^[-+]0x[0-9a-f]+$/i, di = /^0b[01]+$/i, pi = /^0o[0-7]+$/i, yi = parseInt;
function gi(e) {
  if (typeof e == "number")
    return e;
  if (fi(e))
    return xr;
  if (Cr(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = Cr(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = ci(e);
  var r = di.test(e);
  return r || pi.test(e) ? yi(e.slice(2), r ? 2 : 8) : vi.test(e) ? xr : +e;
}
var hi = gi, mi = V, Ot = Lo, Rr = hi, bi = "Expected a function", _i = Math.max, $i = Math.min;
function Si(e, t, r) {
  var n, a, o, i, s, l, u = 0, c = !1, f = !1, v = !0;
  if (typeof e != "function")
    throw new TypeError(bi);
  t = Rr(t) || 0, mi(r) && (c = !!r.leading, f = "maxWait" in r, o = f ? _i(Rr(r.maxWait) || 0, t) : o, v = "trailing" in r ? !!r.trailing : v);
  function d(_) {
    var T = n, I = a;
    return n = a = void 0, u = _, i = e.apply(I, T), i;
  }
  function y(_) {
    return u = _, s = setTimeout(p, t), c ? d(_) : i;
  }
  function g(_) {
    var T = _ - l, I = _ - u, D = t - T;
    return f ? $i(D, o - I) : D;
  }
  function h(_) {
    var T = _ - l, I = _ - u;
    return l === void 0 || T >= t || T < 0 || f && I >= o;
  }
  function p() {
    var _ = Ot();
    if (h(_))
      return $(_);
    s = setTimeout(p, g(_));
  }
  function $(_) {
    return s = void 0, v && n ? d(_) : (n = a = void 0, i);
  }
  function E() {
    s !== void 0 && clearTimeout(s), u = 0, n = l = a = s = void 0;
  }
  function w() {
    return s === void 0 ? i : $(Ot());
  }
  function b() {
    var _ = Ot(), T = h(_);
    if (n = arguments, a = this, l = _, T) {
      if (s === void 0)
        return y(l);
      if (f)
        return clearTimeout(s), s = setTimeout(p, t), d(l);
    }
    return s === void 0 && (s = setTimeout(p, t)), i;
  }
  return b.cancel = E, b.flush = w, b;
}
var or = Si;
const wi = (e, { debounceWait: t, debounceLeading: r, debounceTrailing: n, debounceMaxWait: a }) => {
  const o = m(), i = j(() => {
    const s = {}, l = S(r), u = S(n), c = S(a);
    return l !== void 0 && (s.leading = l), u !== void 0 && (s.trailing = u), c !== void 0 && (s.maxWait = c), s;
  });
  return R((s) => {
    if (S(t)) {
      const l = e.runAsync.bind(e);
      o.value = or(
        (u) => {
          u();
        },
        S(t),
        i.value
      ), e.runAsync = (...u) => new Promise((c, f) => {
        var v;
        (v = o.value) == null || v.call(o, () => {
          l(...u).then(c).catch(f);
        });
      }), s(() => {
        var u;
        (u = o.value) == null || u.cancel(), e.runAsync = l;
      });
    }
  }), S(t) ? {
    name: "debouncePlugin",
    onCancel: () => {
      var s;
      (s = o.value) == null || s.cancel();
    }
  } : {};
};
var Ei = Object.defineProperty, Oi = (e, t, r) => t in e ? Ei(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Dr = (e, t, r) => (Oi(e, typeof t != "symbol" ? t + "" : t, r), r);
class Ai {
  constructor() {
    Dr(this, "table", {}), Dr(this, "hashTable", {});
  }
  insert(t) {
    const r = Symbol(t);
    return this.table[t] = !0, this.hashTable[r] = t, r;
  }
  find(t) {
    return this.hashTable[t];
  }
}
new Ai();
function Ti(e) {
  const r = e.toString().match(/^function\s+([^\s(]+)/);
  return r ? r[1] : "";
}
function Pi(e) {
  const t = e.toString(), r = /([a-zA-Z$_][a-zA-Z0-9$_]*)\s*\(/, n = t.match(r);
  return n ? n[1].trim() : "";
}
function Ii(e) {
  return e === "pending" ? 16747520 : e === "done" ? 6586111 : e === "error" ? 16724736 : e === "cancel" ? 10500409 : e === "mutate" ? 27647 : 4873398;
}
var Ci = Object.defineProperty, xi = (e, t, r) => t in e ? Ci(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Fr = (e, t, r) => (xi(e, typeof t != "symbol" ? t + "" : t, r), r);
class Ri {
  constructor() {
    Fr(this, "requestInstances", /* @__PURE__ */ new Map()), Fr(this, "listeners", []);
  }
  emit(t) {
    this.listeners.forEach((r) => r(t));
  }
  subscribe(t) {
    return this.listeners.push(t), () => {
      const r = this.listeners.indexOf(t);
      this.listeners.splice(r, 1);
    };
  }
  insert(t, r) {
    this.requestInstances.set(t, { ...r }), this.emit({
      key: t,
      ...r
    });
  }
  update(t, r) {
    this.has(t) && this.requestInstances.set(t, { ...this.requestInstances.get(t), ...r });
  }
  has(t) {
    return this.requestInstances.has(t);
  }
  reset(t) {
    if (this.requestInstances.has(t)) {
      const r = this.requestInstances.get(t);
      this.requestInstances.clear(), this.insert(t, r);
    } else
      this.requestInstances.clear();
  }
  getAll() {
    return this.requestInstances;
  }
}
const F = new Ri(), Di = (e, { ready: t = !0, debugKey: r, ...n }) => {
  const a = () => {
    if (r && !F.has(r)) {
      const i = e.serviceRef.value.toString().includes("function") ? Ti(e.serviceRef.value.toString()) : Pi(e.serviceRef.value.toString());
      F.insert(r, {
        instance: e,
        requestName: i,
        time: Date.now()
      });
    }
  }, o = j(
    () => Object.fromEntries(
      Object.entries({ ready: t, ...n }).map(([i, s]) => [i, S(s)])
    )
  );
  return R(() => {
    r && F.has(r) && F.emit({
      ...e,
      options: { ...e.options, ...o.value }
    });
  }), {
    name: "devtoolsPlugin",
    onBefore: (i) => {
      a(), r && F.has(r) && F.emit({
        ...e.state,
        key: r,
        params: i,
        loading: !0,
        time: Date.now(),
        type: "pending"
      });
    },
    onSuccess(i, s) {
      a(), r && F.has(r) && F.emit({
        ...e.state,
        key: r,
        data: i,
        params: s,
        loading: !1,
        time: Date.now(),
        type: "done"
      });
    },
    onCancel() {
      a(), r && F.has(r) && F.emit({
        ...e.state,
        key: r,
        loading: !1,
        time: Date.now(),
        type: "cancel"
      });
    },
    onError(i, s) {
      a(), r && F.has(r) && F.emit({
        ...e.state,
        key: r,
        params: s,
        loading: !1,
        error: i,
        time: Date.now(),
        type: "error"
      });
    },
    onMutate(i) {
      a(), r && F.has(r) && F.emit({
        ...e.state,
        key: r,
        data: i,
        loading: !1,
        time: Date.now(),
        type: "mutate"
      });
    }
  };
}, Fi = (e, { loadingDelay: t }) => {
  const r = m();
  if (!S(t))
    return {};
  const n = () => {
    r.value && clearTimeout(r.value);
  };
  return {
    name: "loadingDelayPlugin",
    onBefore: () => (n(), r.value = setTimeout(() => {
      e.setState({
        loading: !0
      });
    }, S(t)), {
      loading: !1
    }),
    onFinally: () => {
      n();
    },
    onCancel: () => {
      n();
    }
  };
};
function ir() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
const Li = !!(typeof window < "u" && window.document && window.document.createElement);
function sr() {
  return ir() ? document.visibilityState !== "hidden" : !0;
}
const Me = [];
function Mi(e) {
  return Me.push(e), function() {
    const r = Me.indexOf(e);
    Me.splice(r, 1);
  };
}
if (ir()) {
  const e = () => {
    if (!!sr())
      for (let t = 0; t < Me.length; t++) {
        const r = Me[t];
        r();
      }
  };
  window.addEventListener("visibilitychange", e, !1);
}
const Ni = (e, { pollingInterval: t, pollingWhenHidden: r = !0, pollingErrorRetryCount: n = -1 }) => {
  const a = m(), o = m(), i = m(0), s = () => {
    var l;
    a.value && clearInterval(a.value), (l = o.value) == null || l.call(o);
  };
  return R(() => {
    S(t) || s();
  }), S(t) ? {
    name: "pollingPlugin",
    onBefore: () => {
      s();
    },
    onError: () => {
      i.value += 1;
    },
    onSuccess: () => {
      i.value = 0;
    },
    onFinally: () => {
      n === -1 || n !== -1 && i.value <= n ? a.value = setTimeout(() => {
        !r && !sr() ? o.value = Mi(() => {
          e.refresh();
        }) : e.refresh();
      }, S(t)) : i.value = 0;
    },
    onCancel: () => {
      s();
    }
  } : {};
};
function ji(e, t) {
  let r = !1;
  return (...n) => {
    r || (r = !0, e(...n), setTimeout(() => {
      r = !1;
    }, t));
  };
}
function Ui() {
  return ir() && typeof navigator.onLine < "u" ? navigator.onLine : !0;
}
const Ne = [];
function Bi(e) {
  return Ne.push(e), function() {
    const r = Ne.indexOf(e);
    r > -1 && Ne.splice(r, 1);
  };
}
if (Li) {
  const e = () => {
    if (!(!sr() || !Ui()))
      for (let t = 0; t < Ne.length; t++) {
        const r = Ne[t];
        r();
      }
  };
  window.addEventListener("visibilitychange", e, !1), window.addEventListener("focus", e, !1);
}
const Gi = (e, { refreshOnWindowFocus: t, focusTimespan: r = 5e3 }) => {
  const n = m(), a = () => {
    var o;
    (o = n.value) == null || o.call(n);
  };
  return R((o) => {
    if (S(t)) {
      const i = ji(
        e.refresh.bind(e),
        S(r)
      );
      n.value = Bi(() => {
        i();
      });
    }
    o(() => {
      a();
    });
  }), dt(() => {
    a();
  }), {
    name: "refreshOnWindowFocusPlugin"
  };
}, Hi = (e, { retryInterval: t, retryCount: r }) => {
  const n = m(), a = m(0), o = m(!1);
  return r ? {
    name: "retryPlugin",
    onBefore: () => {
      o.value || (a.value = 0), o.value = !1, n.value && clearTimeout(n.value);
    },
    onSuccess: () => {
      a.value = 0;
    },
    onError: () => {
      if (a.value += 1, r === -1 || a.value <= r) {
        const i = t != null ? t : Math.min(1e3 * 2 ** a.value, 3e4);
        n.value = setTimeout(() => {
          o.value = !0, e.refresh();
        }, i);
      } else
        a.value = 0;
    },
    onCancel: () => {
      a.value = 0, n.value && clearTimeout(n.value);
    }
  } : {};
};
var qi = or, Wi = V, ki = "Expected a function";
function Vi(e, t, r) {
  var n = !0, a = !0;
  if (typeof e != "function")
    throw new TypeError(ki);
  return Wi(r) && (n = "leading" in r ? !!r.leading : n, a = "trailing" in r ? !!r.trailing : a), qi(e, t, {
    leading: n,
    maxWait: t,
    trailing: a
  });
}
var oa = Vi;
const zi = (e, { throttleWait: t, throttleLeading: r, throttleTrailing: n }) => {
  const a = j(() => {
    const i = {};
    return S(r) !== void 0 && (i.leading = S(r)), S(n) !== void 0 && (i.trailing = S(n)), i;
  }), o = j(
    () => oa(
      (i) => {
        i();
      },
      S(t),
      a.value
    )
  );
  return R((i) => {
    if (S(t)) {
      const s = e.runAsync.bind(e);
      e.runAsync = (...l) => new Promise((u, c) => {
        var f;
        (f = o.value) == null || f.call(o, () => {
          s(...l).then(u).catch(c);
        });
      }), i(() => {
        var l;
        e.runAsync = s, (l = o.value) == null || l.cancel();
      });
    }
  }), S(t) ? {
    name: "throttlePlugin",
    onCancel: () => {
      var i;
      (i = o.value) == null || i.cancel();
    }
  } : {};
}, Lr = (e) => typeof e == "function", Ki = (e) => typeof e == "boolean";
var Qi = Object.defineProperty, Yi = (e, t, r) => t in e ? Qi(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Xe = (e, t, r) => (Yi(e, typeof t != "symbol" ? t + "" : t, r), r);
class Xi {
  constructor(t, r, n, a = {}) {
    Xe(this, "pluginImpls"), Xe(this, "count", 0), Xe(this, "state", {
      loading: !1,
      params: void 0,
      data: void 0,
      error: void 0
    }), Xe(this, "previousValidData"), this.serviceRef = t, this.options = r, this.setUpdateData = n, this.initState = a, this.state = {
      ...this.state,
      loading: !r.manual,
      ...a
    };
  }
  setState(t = {}) {
    this.state = {
      ...this.state,
      ...t
    }, this.setUpdateData(this.state);
  }
  setData(t, r) {
    console.warn("Please use 'setFetchState' instead of 'setData'"), r instanceof Array ? r.forEach((n) => {
      this.state[n] = t, this.setUpdateData(t, n);
    }) : (this.state[r] = t, this.setUpdateData(t, r));
  }
  setFetchState(t, r) {
    r instanceof Array ? r.forEach((n) => {
      this.state[n] = t, this.setUpdateData(t, n);
    }) : (this.state[r] = t, this.setUpdateData(t, r));
  }
  runPluginHandler(t, ...r) {
    var n, a, o;
    const i = (o = (a = (n = this.pluginImpls) == null ? void 0 : n.map((s) => {
      var l;
      return (l = s[t]) == null ? void 0 : l.call(s, ...r);
    })) != null ? a : []) == null ? void 0 : o.filter(Boolean);
    return Object.assign({}, ...i);
  }
  async runAsync(...t) {
    var r, n, a, o, i, s, l, u, c, f, v;
    this.count += 1;
    const d = this.count, { stopNow: y = !1, returnNow: g = !1, ...h } = this.runPluginHandler(
      "onBefore",
      t
    );
    if (y)
      return new Promise(() => {
      });
    if (this.setState({
      loading: !0,
      params: t,
      ...h
    }), g)
      return Promise.resolve(h.data);
    try {
      (n = (r = this.options).onBefore) == null || n.call(r, t);
    } catch (p) {
      return this.setState({
        error: p,
        loading: !1
      }), (o = (a = this.options).onError) == null || o.call(a, p, t), this.runPluginHandler("onError", p, t), new Promise(() => {
      });
    }
    try {
      let { servicePromise: p } = this.runPluginHandler("onRequest", this.serviceRef.value, t);
      const $ = (w) => {
        var b, _, T, I;
        if (d !== this.count)
          return new Promise(() => {
          });
        const D = this.options.formatResult ? this.options.formatResult(w) : w;
        return this.setState({
          data: D,
          error: void 0,
          loading: !1
        }), (_ = (b = this.options).onSuccess) == null || _.call(b, D, t), this.runPluginHandler("onSuccess", D, t), this.previousValidData = D, (I = (T = this.options).onFinally) == null || I.call(T, t, D, void 0), d === this.count && this.runPluginHandler("onFinally", t, D, void 0), D;
      };
      p || (p = this.serviceRef.value(...t));
      const E = await p;
      return $(E);
    } catch (p) {
      if (d !== this.count)
        return new Promise(() => {
        });
      throw this.setState({
        error: p,
        loading: !1
      }), (s = (i = this.options).onError) == null || s.call(i, p, t), this.runPluginHandler("onError", p, t), (Lr((l = this.options) == null ? void 0 : l.rollbackOnError) && ((u = this.options) == null ? void 0 : u.rollbackOnError(t)) || Ki((c = this.options) == null ? void 0 : c.rollbackOnError) && this.options.rollbackOnError) && this.setState({
        data: this.previousValidData
      }), (v = (f = this.options).onFinally) == null || v.call(f, t, void 0, p), d === this.count && this.runPluginHandler("onFinally", t, void 0, p), p;
    }
  }
  run(...t) {
    this.runAsync(...t).catch((r) => {
      this.options.onError || console.error(r);
    });
  }
  cancel() {
    this.count += 1, this.setState({
      loading: !1
    }), this.runPluginHandler("onCancel");
  }
  refresh() {
    this.run(...this.state.params || []);
  }
  refreshAsync() {
    return this.runAsync(...this.state.params || []);
  }
  mutate(t) {
    const r = Lr(t) ? t(this.state.data) : t;
    this.runPluginHandler("onMutate", r), this.setState({
      data: r
    });
  }
}
const ia = Symbol(
  "USEREQUEST_GLOBAL_OPTIONS_PROVIDE_KEY"
);
function Ji(e) {
  return Object.keys(e).filter((r) => ["data", "loading", "params", "error"].includes(r)).length === 4;
}
function Zi(e, t = {}, r = []) {
  const n = vo(
    ia,
    {}
  ), { initialData: a = void 0, manual: o = !1, ready: i = !0, ...s } = {
    ...n != null ? n : {},
    ...t != null ? t : {}
  }, l = {
    manual: o,
    ready: i,
    ...s
  }, u = m(e), c = pt({
    data: a,
    loading: !1,
    params: void 0,
    error: void 0
  }), f = (g, h) => {
    h ? c[h] = g : Ji(g) && (c.data = g.data, c.loading = g.loading, c.error = g.error, c.params = g.params);
  }, v = r.map((g) => {
    var h;
    return (h = g == null ? void 0 : g.onInit) == null ? void 0 : h.call(g, l);
  }).filter(Boolean), d = new Xi(
    u,
    l,
    f,
    Object.assign({}, ...v, c)
  );
  d.options = l, d.pluginImpls = r.map((g) => g(d, l));
  const y = j(() => se(i) ? i.value : i);
  if (R(() => {
    if (!o) {
      const g = d.state.params || t.defaultParams || [];
      y.value && d.options.refreshDeps === !0 && !!u.value && d.run(...g);
    }
  }), !o && d.options.refreshDeps !== !0) {
    const g = d.state.params || t.defaultParams || [];
    S(i) && d.run(...g);
  }
  return dt(() => {
    d.cancel();
  }), {
    ...ar(c),
    cancel: d.cancel.bind(d),
    refresh: d.refresh.bind(d),
    refreshAsync: d.refreshAsync.bind(d),
    run: d.run.bind(d),
    runAsync: d.runAsync.bind(d),
    mutate: d.mutate.bind(d)
  };
}
const es = (e, t) => function(n, a = {}, o = []) {
  let i = e;
  const s = t || [];
  for (let l = s.length; l--; )
    i = s[l](i);
  return i(n, a, o);
};
function sa(e, t, r) {
  var n;
  const a = (n = [
    process.env.NODE_ENV === "development" ? Di : null,
    wi,
    Fi,
    Ni,
    Gi,
    zi,
    ra,
    Ao,
    Hi
  ]) == null ? void 0 : n.filter(Boolean);
  return es(Zi, t == null ? void 0 : t.use)(e, t, [
    ...r || [],
    ...a
  ]);
}
function Y_(e) {
  po(ia, e);
}
function ts() {
  return la().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function la() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const rs = typeof Proxy == "function", ns = "devtools-plugin:setup", as = "plugin:settings:set";
let pe, qt;
function os() {
  var e;
  return pe !== void 0 || (typeof window < "u" && window.performance ? (pe = !0, qt = window.performance) : typeof globalThis < "u" && ((e = globalThis.perf_hooks) === null || e === void 0 ? void 0 : e.performance) ? (pe = !0, qt = globalThis.perf_hooks.performance) : pe = !1), pe;
}
function is() {
  return os() ? qt.now() : Date.now();
}
class ss {
  constructor(t, r) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = r;
    const n = {};
    if (t.settings)
      for (const i in t.settings) {
        const s = t.settings[i];
        n[i] = s.defaultValue;
      }
    const a = `__vue-devtools-plugin-settings__${t.id}`;
    let o = Object.assign({}, n);
    try {
      const i = localStorage.getItem(a), s = JSON.parse(i);
      Object.assign(o, s);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return o;
      },
      setSettings(i) {
        try {
          localStorage.setItem(a, JSON.stringify(i));
        } catch {
        }
        o = i;
      },
      now() {
        return is();
      }
    }, r && r.on(as, (i, s) => {
      i === this.plugin.id && this.fallbacks.setSettings(s);
    }), this.proxiedOn = new Proxy({}, {
      get: (i, s) => this.target ? this.target.on[s] : (...l) => {
        this.onQueue.push({
          method: s,
          args: l
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (i, s) => this.target ? this.target[s] : s === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(s) ? (...l) => (this.targetQueue.push({
        method: s,
        args: l,
        resolve: () => {
        }
      }), this.fallbacks[s](...l)) : (...l) => new Promise((u) => {
        this.targetQueue.push({
          method: s,
          args: l,
          resolve: u
        });
      })
    });
  }
  async setRealTarget(t) {
    this.target = t;
    for (const r of this.onQueue)
      this.target.on[r.method](...r.args);
    for (const r of this.targetQueue)
      r.resolve(await this.target[r.method](...r.args));
  }
}
function ls(e, t) {
  const r = e, n = la(), a = ts(), o = rs && r.enableEarlyProxy;
  if (a && (n.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !o))
    a.emit(ns, e, t);
  else {
    const i = o ? new ss(r, a) : null;
    (n.__VUE_DEVTOOLS_PLUGINS__ = n.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: r,
      setupFn: t,
      proxy: i
    }), i && t(i.proxiedTarget);
  }
}
const K = "vue-hooks-plus", At = "Vue Hooks Plus \u{1F36D}", us = "https://raw.githubusercontent.com/InhiblabCore/vue-hooks-plus/c3b984112610ef3fb21140a0beb27b4a228fe0b3/packages/hooks/docs/public/logo.svg";
let Mr;
const cs = /* @__PURE__ */ new Map();
function fs(e) {
  ls(
    {
      id: K,
      label: At,
      packageName: "vue-hooks-plus",
      homepage: "https://inhiblabcore.github.io/docs/hooks",
      logo: us,
      app: e,
      settings: {
        baseSort: {
          type: "choice",
          component: "button-group",
          label: "Sort Cache Entries",
          options: [
            {
              label: "ASC",
              value: 1
            },
            {
              label: "DESC",
              value: -1
            }
          ],
          defaultValue: 1
        }
      }
    },
    (t) => {
      t.addTimelineLayer({
        id: K,
        label: At,
        color: 16767308
      }), t.addInspector({
        id: K,
        label: At,
        icon: "api",
        treeFilterPlaceholder: "Search  useRequest",
        actions: [
          {
            icon: "delete",
            tooltip: "Clear useRequest root ",
            action: () => {
              F.reset(Mr), t.sendInspectorTree(K), t.sendInspectorState(K);
            }
          }
        ]
      }), F.subscribe((r) => {
        F.update(r.key, { time: r.time, type: r.type }), t.sendInspectorTree(K), t.sendInspectorState(K), t.addTimelineEvent({
          layerId: K,
          event: {
            title: r.type,
            subtitle: `data: ${JSON.stringify(r.data)}`,
            time: t.now(),
            data: {
              ...r
            }
          }
        });
      }), t.on.getInspectorTree((r) => {
        if (r.inspectorId === K) {
          cs.clear();
          const n = t.getSettings(), a = F.getAll();
          let o = [];
          n.baseSort === 1 ? o = Array.from(a.entries()).sort(
            (s, l) => {
              var u, c, f, v;
              return ((c = (u = l[1]) == null ? void 0 : u.time) != null ? c : 0) - ((v = (f = s[1]) == null ? void 0 : f.time) != null ? v : 0);
            }
          ) : o = Array.from(a.entries()).sort(
            (s, l) => {
              var u, c, f, v;
              return ((c = (u = s[1]) == null ? void 0 : u.time) != null ? c : 0) - ((v = (f = l[1]) == null ? void 0 : f.time) != null ? v : 0);
            }
          );
          const i = o.filter((s) => new RegExp(r.filter, "g").test(s[0])).map((s) => {
            var l, u, c;
            return {
              id: s[0],
              label: s[0],
              tags: (l = s[1]) != null && l.type ? [
                {
                  label: `${(u = s[1]) == null ? void 0 : u.type}`,
                  textColor: 16777215,
                  backgroundColor: Ii((c = s[1]) == null ? void 0 : c.type)
                }
              ] : []
            };
          });
          r.rootNodes = [
            {
              id: "vue-hooks-plus-useRequest",
              label: "useRequest",
              tags: [
                {
                  label: "Root",
                  textColor: 16777215,
                  backgroundColor: 4372611
                }
              ],
              children: i != null ? i : []
            }
          ];
        }
      }), t.on.getInspectorState((r) => {
        var n, a, o;
        Mr = r.nodeId;
        let i = 0;
        if (r.inspectorId === K) {
          const s = F.getAll();
          if (r.nodeId) {
            const l = s.get(r.nodeId);
            if (!l)
              return;
            r.state = {
              Details: [
                {
                  key: "Key",
                  value: r.nodeId
                },
                {
                  key: "Request Name",
                  value: l.requestName
                }
              ],
              "Data Explorer": Object.keys(l.instance.state).map((u) => ({
                key: u,
                value: l.instance.state[u]
              })),
              Option: Object.keys(l.instance.options).map((u) => ({
                key: u,
                value: S(l.instance.options[u])
              })),
              ["Plugins \u{1F9E9}"]: (o = (a = (n = l.instance.pluginImpls) == null ? void 0 : n.map((u, c) => {
                var f, v, d, y, g, h;
                const p = (d = (v = (f = l == null ? void 0 : l.instance) == null ? void 0 : f.pluginImpls) == null ? void 0 : v[c]) == null ? void 0 : d.name;
                return p || c !== i && i++, {
                  key: p || `plugin ${i}`,
                  value: (h = (g = (y = l == null ? void 0 : l.instance) == null ? void 0 : y.pluginImpls) == null ? void 0 : g[c]) != null ? h : null
                };
              })) == null ? void 0 : a.filter((u) => Object.keys(u.value).length !== 0)) != null ? o : []
            };
          }
        }
      });
    }
  );
}
const X_ = {
  install(e) {
    process.env.NODE_ENV === "development" && fs(e);
  }
};
function J_({ task: e, option: t }) {
  const { delay: r = 0, onError: n, onReady: a, onSuccess: o } = t != null ? t : {};
  if (!(e instanceof Array))
    throw new Error("task must be Array");
  const i = (u) => {
    n == null || n(u);
  }, s = (u) => (c) => {
    i(c), u == null || u({ error: c });
  }, l = () => {
    var u;
    (u = Array(...e.keys())) == null || u.reduce((c, f) => c.then((d) => (d != null && d.error || o == null || o(d), new Promise((y) => {
      var g;
      (g = e == null ? void 0 : e[f]) == null || g.call(e, y, s(y), f);
    }))), Promise.resolve());
  };
  Em(() => {
    a == null || a(), l();
  }, r);
}
function vs(e = !1, t) {
  const r = m(e), n = j(() => {
    const a = t === void 0 ? !e : t;
    return {
      toggle: () => {
        r.value = r.value === e ? a : e;
      },
      set: (u) => r.value = u,
      setLeft: () => r.value = e,
      setRight: () => r.value = a
    };
  });
  return [ea(r), { ...n.value }];
}
function lr(e = !1) {
  const [t, { set: r, toggle: n }] = vs(e);
  return [t, {
    set: (o) => r(!!o),
    setTrue: () => r(!0),
    setFalse: () => r(!1),
    toggle: n
  }];
}
/*! js-cookie v3.0.5 | MIT */
function Je(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t];
    for (var n in r)
      e[n] = r[n];
  }
  return e;
}
var ds = {
  read: function(e) {
    return e[0] === '"' && (e = e.slice(1, -1)), e.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
  },
  write: function(e) {
    return encodeURIComponent(e).replace(
      /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
      decodeURIComponent
    );
  }
};
function Wt(e, t) {
  function r(a, o, i) {
    if (!(typeof document > "u")) {
      i = Je({}, t, i), typeof i.expires == "number" && (i.expires = new Date(Date.now() + i.expires * 864e5)), i.expires && (i.expires = i.expires.toUTCString()), a = encodeURIComponent(a).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
      var s = "";
      for (var l in i)
        !i[l] || (s += "; " + l, i[l] !== !0 && (s += "=" + i[l].split(";")[0]));
      return document.cookie = a + "=" + e.write(o, a) + s;
    }
  }
  function n(a) {
    if (!(typeof document > "u" || arguments.length && !a)) {
      for (var o = document.cookie ? document.cookie.split("; ") : [], i = {}, s = 0; s < o.length; s++) {
        var l = o[s].split("="), u = l.slice(1).join("=");
        try {
          var c = decodeURIComponent(l[0]);
          if (i[c] = e.read(u, c), a === c)
            break;
        } catch {
        }
      }
      return a ? i[a] : i;
    }
  }
  return Object.create(
    {
      set: r,
      get: n,
      remove: function(a, o) {
        r(
          a,
          "",
          Je({}, o, {
            expires: -1
          })
        );
      },
      withAttributes: function(a) {
        return Wt(this.converter, Je({}, this.attributes, a));
      },
      withConverter: function(a) {
        return Wt(Je({}, this.converter, a), this.attributes);
      }
    },
    {
      attributes: { value: Object.freeze(t) },
      converter: { value: Object.freeze(e) }
    }
  );
}
var Tt = Wt(ds, { path: "/" });
function Nr(e) {
  return typeof e == "function";
}
function Z_(e, t = {}) {
  const n = m((() => {
    const o = Tt.get(e);
    return typeof o == "string" ? o : Nr(t.defaultValue) ? t.defaultValue() : t.defaultValue;
  })()), a = (o, i = {}) => {
    const { defaultValue: s, ...l } = { ...t, ...i }, u = () => {
      const c = Nr(o) ? o(n.value) : o;
      return c === void 0 ? Tt.remove(e) : Tt.set(e, c, l), c;
    };
    n.value = u();
  };
  return [N(n), a];
}
const ua = (e) => typeof e == "function", ps = (e) => typeof e == "string", Ge = (e) => typeof e == "number";
function jr(e, t = {}) {
  const { min: r, max: n } = t;
  let a = e;
  return Ge(n) && (a = Math.min(n, a)), Ge(r) && (a = Math.max(r, a)), a;
}
function e1(e = 0, t = {}) {
  const { min: r, max: n } = t, a = m(
    jr(e, {
      min: r,
      max: n
    })
  ), o = (c) => {
    const f = Ge(c) ? c : c(a.value);
    return a.value = jr(f, {
      max: n,
      min: r
    }), a.value;
  }, i = (c = 1) => {
    o((f) => f + c);
  }, s = (c = 1) => {
    o((f) => f - c);
  }, l = (c) => {
    o(c);
  }, u = () => {
    o(e);
  };
  return [
    N(a),
    {
      inc: i,
      dec: s,
      set: l,
      reset: u
    }
  ];
}
function ys(e, t) {
  var r;
  const n = (r = t == null ? void 0 : t.wait) != null ? r : 1e3, a = or(e, n, t);
  return {
    run: a,
    cancel: a.cancel,
    flush: a.flush
  };
}
function t1(e, t) {
  const r = m(e.value), { run: n } = ys(() => r.value = e.value, t);
  return H(e, () => n(), { deep: !0 }), r;
}
const ht = !!(typeof window < "u" && window.document && window.document.createElement);
function x(e, t) {
  var r, n;
  if (!ht)
    return;
  if (!e)
    return t;
  let a;
  return typeof e == "function" ? a = e() : se(e) ? a = (n = (r = e.value) == null ? void 0 : r.$el) != null ? n : e.value : a = e, a;
}
function Ur(e, t) {
  if (e === t)
    return !0;
  for (let r = 0; r < e.length; r++)
    if (!Object.is(e[r], t[r]))
      return !1;
  return !0;
}
const gs = (e) => (r, n, a) => {
  const o = m(!1), i = m([]), s = m([]), l = m();
  e(() => {
    var u;
    const f = (Array.isArray(a) ? a : [a]).map((v) => x(v));
    if (!o.value) {
      o.value = !0, i.value = f, s.value = n, l.value = r();
      return;
    }
    (f.length !== i.value.length || !Ur(f, i.value) || !Ur(n, s.value)) && ((u = l.value) == null || u.call(l), i.value = f, s.value = n, l.value = r());
  }), qe(() => {
    var u;
    (u = l.value) == null || u.call(l), o.value = !1;
  });
}, ce = gs(R), r1 = (e, t, r = {}) => {
  const n = m(r);
  ce(
    () => {
      const a = x(t);
      if (!(a != null && a.addEventListener))
        return;
      const o = (s) => {
        var l, u, c;
        (u = (l = n.value).onDragStart) == null || u.call(l, s), (c = s.dataTransfer) == null || c.setData("custom", JSON.stringify(e));
      }, i = (s) => {
        var l, u;
        (u = (l = n.value).onDragEnd) == null || u.call(l, s);
      };
      return a.setAttribute(
        "draggable",
        `${(r == null ? void 0 : r.draggable) !== void 0 ? r == null ? void 0 : r.draggable : !0}`
      ), a.addEventListener("dragstart", o), a.addEventListener("dragend", i), () => {
        a.removeEventListener("dragstart", o), a.removeEventListener("dragend", i);
      };
    },
    [],
    t
  );
}, n1 = (e, t = {}) => {
  const r = m(t), n = m();
  ce(
    () => {
      const a = x(e);
      if (!(a != null && a.addEventListener))
        return;
      const o = (f, v) => {
        const d = f.getData("text/uri-list"), y = f.getData("custom");
        if (y && r.value.onDom) {
          let g = y;
          try {
            g = JSON.parse(y);
          } catch {
            g = y;
          }
          r.value.onDom(g, v);
          return;
        }
        if (d && r.value.onUri) {
          r.value.onUri(d, v);
          return;
        }
        if (f.files && f.files.length && r.value.onFiles) {
          r.value.onFiles(Array.from(f.files), v);
          return;
        }
        f.items && f.items.length && r.value.onText && f.items[0].getAsString((g) => {
          r.value.onText(g, v);
        });
      }, i = (f) => {
        var v, d;
        f.preventDefault(), f.stopPropagation(), n.value = f.target, (d = (v = r.value).onDragEnter) == null || d.call(v, f);
      }, s = (f) => {
        var v, d;
        f.preventDefault(), (d = (v = r.value).onDragOver) == null || d.call(v, f);
      }, l = (f) => {
        var v, d;
        f.target === n.value && ((d = (v = r.value).onDragLeave) == null || d.call(v, f));
      }, u = (f) => {
        var v, d;
        f.preventDefault(), o(f.dataTransfer, f), (d = (v = r.value).onDrop) == null || d.call(v, f);
      }, c = (f) => {
        var v, d;
        o(f.clipboardData, f), (d = (v = r.value).onPaste) == null || d.call(v, f);
      };
      return a.addEventListener("dragenter", i), a.addEventListener("dragover", s), a.addEventListener("dragleave", l), a.addEventListener("drop", u), a.addEventListener("paste", c), () => {
        a.removeEventListener("dragenter", i), a.removeEventListener("dragover", s), a.removeEventListener("dragleave", l), a.removeEventListener("drop", u), a.removeEventListener("paste", c);
      };
    },
    [],
    e
  );
};
function Br(e) {
  return typeof e == "function";
}
function ca(e) {
  function t(r, n) {
    let a;
    try {
      a = e();
    } catch (c) {
      console.error(c);
    }
    const o = (c) => n != null && n.serializer ? n == null ? void 0 : n.serializer(c) : JSON.stringify(c), i = (c) => n != null && n.deserializer ? n == null ? void 0 : n.deserializer(c) : JSON.parse(c);
    function s() {
      try {
        const c = a == null ? void 0 : a.getItem(S(r));
        if (c)
          return i(c);
      } catch (c) {
        console.error(c);
      }
      return Br(n == null ? void 0 : n.defaultValue) ? n == null ? void 0 : n.defaultValue() : n == null ? void 0 : n.defaultValue;
    }
    const l = m(s());
    R(() => {
      r && (l.value = s());
    });
    const u = (c) => {
      if (typeof c > "u")
        l.value = void 0, a == null || a.removeItem(S(r));
      else if (Br(c)) {
        const f = c(l.value);
        try {
          l.value = f, a == null || a.setItem(S(r), o(f));
        } catch (v) {
          console.error(v);
        }
      } else
        try {
          l.value = c, a == null || a.setItem(S(r), o(c));
        } catch (f) {
          console.error(f);
        }
    };
    return [N(l), u];
  }
  return t;
}
const fa = ca(
  () => ht ? localStorage : void 0
);
function hs(e, t, r) {
  const n = e.map((s) => window.matchMedia(s)), a = () => {
    const s = n.findIndex((l) => l.matches);
    return typeof t[s] < "u" ? t[s] : r;
  }, o = m(a()), i = () => {
    o.value = a();
  };
  return R((s) => {
    n.forEach((l) => {
      l.addListener(i);
    }), s(() => {
      n.forEach(
        (l) => l.removeListener(i)
      );
    });
  }), o;
}
function a1() {
  const [e, t] = fa("dark-mode-enabled"), r = ms(), n = j(() => typeof e.value < "u" ? e.value : r.value);
  return R(() => {
    const a = "[vue-hooks-plus]-dark-mode", o = window.document.body;
    n.value ? o.classList.add(a) : o.classList.remove(a);
  }), [n, t];
}
function ms() {
  return hs(["(prefers-color-scheme: dark)"], [!0], !1);
}
const De = {}, bs = (e, t = {}) => {
  const r = document.querySelector(`script[src="${e}"]`);
  if (!r) {
    const n = document.createElement("script");
    return n.src = e, Object.keys(t).forEach((a) => {
      n[a] = t[a];
    }), n.setAttribute("data-status", "loading"), document.body.appendChild(n), {
      ref: n,
      status: "loading"
    };
  }
  return {
    ref: r,
    status: r.getAttribute("data-status") || "ready"
  };
}, _s = (e, t = {}) => {
  const r = document.querySelector(`link[href="${e}"]`);
  if (!r) {
    const n = document.createElement("link");
    return n.rel = "stylesheet", n.href = e, Object.keys(t).forEach((o) => {
      n[o] = t[o];
    }), "hideFocus" in n && n.relList && (n.rel = "preload", n.as = "style"), n.setAttribute("data-status", "loading"), document.head.appendChild(n), {
      ref: n,
      status: "loading"
    };
  }
  return {
    ref: r,
    status: r.getAttribute("data-status") || "ready"
  };
};
function o1(e, t) {
  const r = m(e ? "loading" : "unset"), n = m(), a = j(() => S(e));
  return R((o) => {
    var i, s, l, u;
    if (!a.value) {
      r.value = "unset";
      return;
    }
    const c = (s = (i = a.value) == null ? void 0 : i.replace(/[|#].*$/, "")) != null ? s : "";
    if ((t == null ? void 0 : t.type) === "css" || !(t != null && t.type) && /(^css!|\.css$)/.test(c)) {
      const v = _s((l = a.value) != null ? l : "", t == null ? void 0 : t.css);
      n.value = v.ref, r.value = v.status;
    } else if ((t == null ? void 0 : t.type) === "js" || !(t != null && t.type) && /(^js!|\.js$)/.test(c)) {
      const v = bs((u = a.value) != null ? u : "", t == null ? void 0 : t.js);
      n.value = v.ref, r.value = v.status;
    } else
      console.error(
        "Cannot infer the type of external resource, and please provide a type ('js' | 'css'). Refer to the https://ahooks.js.org/hooks/dom/use-external/#options"
      );
    if (!n.value)
      return;
    a.value && De[a.value] === void 0 ? De[a.value] = 1 : a.value && (De[a.value] += 1);
    const f = (v) => {
      var d;
      const y = v.type === "load" ? "ready" : "error";
      (d = n.value) == null || d.setAttribute("data-status", y), r.value = y;
    };
    n.value.addEventListener("load", f), n.value.addEventListener("error", f), o(() => {
      var v, d, y;
      (v = n.value) == null || v.removeEventListener("load", f), (d = n.value) == null || d.removeEventListener("error", f), a.value && (De[a.value] -= 1), a.value && De[a.value] === 0 && ((y = n.value) == null || y.remove()), n.value = void 0;
    });
  }), N(r);
}
function te(e, t, r = {}) {
  const n = m(t);
  ce(
    () => {
      const a = x(r.target, window);
      if (!(a != null && a.addEventListener))
        return;
      const o = (i) => n.value(i);
      return a.addEventListener(e, o, {
        capture: r.capture,
        once: r.once,
        passive: r.passive
      }), () => {
        a.removeEventListener(e, o, {
          capture: r.capture
        });
      };
    },
    [e, r.capture, r.once, r.passive],
    r.target
  );
}
function $s() {
  this.__data__ = [], this.size = 0;
}
var Ss = $s;
function ws(e, t) {
  return e === t || e !== e && t !== t;
}
var We = ws, Es = We;
function Os(e, t) {
  for (var r = e.length; r--; )
    if (Es(e[r][0], t))
      return r;
  return -1;
}
var mt = Os, As = mt, Ts = Array.prototype, Ps = Ts.splice;
function Is(e) {
  var t = this.__data__, r = As(t, e);
  if (r < 0)
    return !1;
  var n = t.length - 1;
  return r == n ? t.pop() : Ps.call(t, r, 1), --this.size, !0;
}
var Cs = Is, xs = mt;
function Rs(e) {
  var t = this.__data__, r = xs(t, e);
  return r < 0 ? void 0 : t[r][1];
}
var Ds = Rs, Fs = mt;
function Ls(e) {
  return Fs(this.__data__, e) > -1;
}
var Ms = Ls, Ns = mt;
function js(e, t) {
  var r = this.__data__, n = Ns(r, e);
  return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
}
var Us = js, Bs = Ss, Gs = Cs, Hs = Ds, qs = Ms, Ws = Us;
function Oe(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Oe.prototype.clear = Bs;
Oe.prototype.delete = Gs;
Oe.prototype.get = Hs;
Oe.prototype.has = qs;
Oe.prototype.set = Ws;
var bt = Oe, ks = bt;
function Vs() {
  this.__data__ = new ks(), this.size = 0;
}
var zs = Vs;
function Ks(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
var Qs = Ks;
function Ys(e) {
  return this.__data__.get(e);
}
var Xs = Ys;
function Js(e) {
  return this.__data__.has(e);
}
var Zs = Js, el = Ee, tl = V, rl = "[object AsyncFunction]", nl = "[object Function]", al = "[object GeneratorFunction]", ol = "[object Proxy]";
function il(e) {
  if (!tl(e))
    return !1;
  var t = el(e);
  return t == nl || t == al || t == rl || t == ol;
}
var ur = il, sl = z, ll = sl["__core-js_shared__"], ul = ll, Pt = ul, Gr = function() {
  var e = /[^.]+$/.exec(Pt && Pt.keys && Pt.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function cl(e) {
  return !!Gr && Gr in e;
}
var fl = cl, vl = Function.prototype, dl = vl.toString;
function pl(e) {
  if (e != null) {
    try {
      return dl.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var va = pl, yl = ur, gl = fl, hl = V, ml = va, bl = /[\\^$.*+?()[\]{}|]/g, _l = /^\[object .+?Constructor\]$/, $l = Function.prototype, Sl = Object.prototype, wl = $l.toString, El = Sl.hasOwnProperty, Ol = RegExp(
  "^" + wl.call(El).replace(bl, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Al(e) {
  if (!hl(e) || gl(e))
    return !1;
  var t = yl(e) ? Ol : _l;
  return t.test(ml(e));
}
var Tl = Al;
function Pl(e, t) {
  return e == null ? void 0 : e[t];
}
var Il = Pl, Cl = Tl, xl = Il;
function Rl(e, t) {
  var r = xl(e, t);
  return Cl(r) ? r : void 0;
}
var fe = Rl, Dl = fe, Fl = z, Ll = Dl(Fl, "Map"), cr = Ll, Ml = fe, Nl = Ml(Object, "create"), _t = Nl, Hr = _t;
function jl() {
  this.__data__ = Hr ? Hr(null) : {}, this.size = 0;
}
var Ul = jl;
function Bl(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var Gl = Bl, Hl = _t, ql = "__lodash_hash_undefined__", Wl = Object.prototype, kl = Wl.hasOwnProperty;
function Vl(e) {
  var t = this.__data__;
  if (Hl) {
    var r = t[e];
    return r === ql ? void 0 : r;
  }
  return kl.call(t, e) ? t[e] : void 0;
}
var zl = Vl, Kl = _t, Ql = Object.prototype, Yl = Ql.hasOwnProperty;
function Xl(e) {
  var t = this.__data__;
  return Kl ? t[e] !== void 0 : Yl.call(t, e);
}
var Jl = Xl, Zl = _t, eu = "__lodash_hash_undefined__";
function tu(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = Zl && t === void 0 ? eu : t, this;
}
var ru = tu, nu = Ul, au = Gl, ou = zl, iu = Jl, su = ru;
function Ae(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Ae.prototype.clear = nu;
Ae.prototype.delete = au;
Ae.prototype.get = ou;
Ae.prototype.has = iu;
Ae.prototype.set = su;
var lu = Ae, qr = lu, uu = bt, cu = cr;
function fu() {
  this.size = 0, this.__data__ = {
    hash: new qr(),
    map: new (cu || uu)(),
    string: new qr()
  };
}
var vu = fu;
function du(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var pu = du, yu = pu;
function gu(e, t) {
  var r = e.__data__;
  return yu(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
var $t = gu, hu = $t;
function mu(e) {
  var t = hu(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var bu = mu, _u = $t;
function $u(e) {
  return _u(this, e).get(e);
}
var Su = $u, wu = $t;
function Eu(e) {
  return wu(this, e).has(e);
}
var Ou = Eu, Au = $t;
function Tu(e, t) {
  var r = Au(this, e), n = r.size;
  return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
}
var Pu = Tu, Iu = vu, Cu = bu, xu = Su, Ru = Ou, Du = Pu;
function Te(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Te.prototype.clear = Iu;
Te.prototype.delete = Cu;
Te.prototype.get = xu;
Te.prototype.has = Ru;
Te.prototype.set = Du;
var da = Te, Fu = bt, Lu = cr, Mu = da, Nu = 200;
function ju(e, t) {
  var r = this.__data__;
  if (r instanceof Fu) {
    var n = r.__data__;
    if (!Lu || n.length < Nu - 1)
      return n.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new Mu(n);
  }
  return r.set(e, t), this.size = r.size, this;
}
var Uu = ju, Bu = bt, Gu = zs, Hu = Qs, qu = Xs, Wu = Zs, ku = Uu;
function Pe(e) {
  var t = this.__data__ = new Bu(e);
  this.size = t.size;
}
Pe.prototype.clear = Gu;
Pe.prototype.delete = Hu;
Pe.prototype.get = qu;
Pe.prototype.has = Wu;
Pe.prototype.set = ku;
var fr = Pe;
function Vu(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n && t(e[r], r, e) !== !1; )
    ;
  return e;
}
var zu = Vu, Ku = fe, Qu = function() {
  try {
    var e = Ku(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), pa = Qu, Wr = pa;
function Yu(e, t, r) {
  t == "__proto__" && Wr ? Wr(e, t, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : e[t] = r;
}
var vr = Yu, Xu = vr, Ju = We, Zu = Object.prototype, ec = Zu.hasOwnProperty;
function tc(e, t, r) {
  var n = e[t];
  (!(ec.call(e, t) && Ju(n, r)) || r === void 0 && !(t in e)) && Xu(e, t, r);
}
var ya = tc, rc = ya, nc = vr;
function ac(e, t, r, n) {
  var a = !r;
  r || (r = {});
  for (var o = -1, i = t.length; ++o < i; ) {
    var s = t[o], l = n ? n(r[s], e[s], s, r, e) : void 0;
    l === void 0 && (l = e[s]), a ? nc(r, s, l) : rc(r, s, l);
  }
  return r;
}
var ke = ac;
function oc(e, t) {
  for (var r = -1, n = Array(e); ++r < e; )
    n[r] = t(r);
  return n;
}
var ic = oc, sc = Ee, lc = J, uc = "[object Arguments]";
function cc(e) {
  return lc(e) && sc(e) == uc;
}
var fc = cc, kr = fc, vc = J, ga = Object.prototype, dc = ga.hasOwnProperty, pc = ga.propertyIsEnumerable, yc = kr(function() {
  return arguments;
}()) ? kr : function(e) {
  return vc(e) && dc.call(e, "callee") && !pc.call(e, "callee");
}, ha = yc, gc = Array.isArray, Ve = gc, _e = { exports: {} };
function hc() {
  return !1;
}
var mc = hc;
(function(e, t) {
  var r = z, n = mc, a = t && !t.nodeType && t, o = a && !0 && e && !e.nodeType && e, i = o && o.exports === a, s = i ? r.Buffer : void 0, l = s ? s.isBuffer : void 0, u = l || n;
  e.exports = u;
})(_e, _e.exports);
var bc = 9007199254740991, _c = /^(?:0|[1-9]\d*)$/;
function $c(e, t) {
  var r = typeof e;
  return t = t == null ? bc : t, !!t && (r == "number" || r != "symbol" && _c.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var ma = $c, Sc = 9007199254740991;
function wc(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Sc;
}
var ba = wc, Ec = Ee, Oc = ba, Ac = J, Tc = "[object Arguments]", Pc = "[object Array]", Ic = "[object Boolean]", Cc = "[object Date]", xc = "[object Error]", Rc = "[object Function]", Dc = "[object Map]", Fc = "[object Number]", Lc = "[object Object]", Mc = "[object RegExp]", Nc = "[object Set]", jc = "[object String]", Uc = "[object WeakMap]", Bc = "[object ArrayBuffer]", Gc = "[object DataView]", Hc = "[object Float32Array]", qc = "[object Float64Array]", Wc = "[object Int8Array]", kc = "[object Int16Array]", Vc = "[object Int32Array]", zc = "[object Uint8Array]", Kc = "[object Uint8ClampedArray]", Qc = "[object Uint16Array]", Yc = "[object Uint32Array]", P = {};
P[Hc] = P[qc] = P[Wc] = P[kc] = P[Vc] = P[zc] = P[Kc] = P[Qc] = P[Yc] = !0;
P[Tc] = P[Pc] = P[Bc] = P[Ic] = P[Gc] = P[Cc] = P[xc] = P[Rc] = P[Dc] = P[Fc] = P[Lc] = P[Mc] = P[Nc] = P[jc] = P[Uc] = !1;
function Xc(e) {
  return Ac(e) && Oc(e.length) && !!P[Ec(e)];
}
var Jc = Xc;
function Zc(e) {
  return function(t) {
    return e(t);
  };
}
var dr = Zc, He = { exports: {} };
(function(e, t) {
  var r = na, n = t && !t.nodeType && t, a = n && !0 && e && !e.nodeType && e, o = a && a.exports === n, i = o && r.process, s = function() {
    try {
      var l = a && a.require && a.require("util").types;
      return l || i && i.binding && i.binding("util");
    } catch {
    }
  }();
  e.exports = s;
})(He, He.exports);
var ef = Jc, tf = dr, Vr = He.exports, zr = Vr && Vr.isTypedArray, rf = zr ? tf(zr) : ef, pr = rf, nf = ic, af = ha, of = Ve, sf = _e.exports, lf = ma, uf = pr, cf = Object.prototype, ff = cf.hasOwnProperty;
function vf(e, t) {
  var r = of(e), n = !r && af(e), a = !r && !n && sf(e), o = !r && !n && !a && uf(e), i = r || n || a || o, s = i ? nf(e.length, String) : [], l = s.length;
  for (var u in e)
    (t || ff.call(e, u)) && !(i && (u == "length" || a && (u == "offset" || u == "parent") || o && (u == "buffer" || u == "byteLength" || u == "byteOffset") || lf(u, l))) && s.push(u);
  return s;
}
var _a = vf, df = Object.prototype;
function pf(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || df;
  return e === r;
}
var yr = pf;
function yf(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var $a = yf, gf = $a, hf = gf(Object.keys, Object), mf = hf, bf = yr, _f = mf, $f = Object.prototype, Sf = $f.hasOwnProperty;
function wf(e) {
  if (!bf(e))
    return _f(e);
  var t = [];
  for (var r in Object(e))
    Sf.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
var Ef = wf, Of = ur, Af = ba;
function Tf(e) {
  return e != null && Af(e.length) && !Of(e);
}
var St = Tf, Pf = _a, If = Ef, Cf = St;
function xf(e) {
  return Cf(e) ? Pf(e) : If(e);
}
var gr = xf, Rf = ke, Df = gr;
function Ff(e, t) {
  return e && Rf(t, Df(t), e);
}
var Lf = Ff;
function Mf(e) {
  var t = [];
  if (e != null)
    for (var r in Object(e))
      t.push(r);
  return t;
}
var Nf = Mf, jf = V, Uf = yr, Bf = Nf, Gf = Object.prototype, Hf = Gf.hasOwnProperty;
function qf(e) {
  if (!jf(e))
    return Bf(e);
  var t = Uf(e), r = [];
  for (var n in e)
    n == "constructor" && (t || !Hf.call(e, n)) || r.push(n);
  return r;
}
var Wf = qf, kf = _a, Vf = Wf, zf = St;
function Kf(e) {
  return zf(e) ? kf(e, !0) : Vf(e);
}
var ze = Kf, Qf = ke, Yf = ze;
function Xf(e, t) {
  return e && Qf(t, Yf(t), e);
}
var Jf = Xf, st = { exports: {} };
(function(e, t) {
  var r = z, n = t && !t.nodeType && t, a = n && !0 && e && !e.nodeType && e, o = a && a.exports === n, i = o ? r.Buffer : void 0, s = i ? i.allocUnsafe : void 0;
  function l(u, c) {
    if (c)
      return u.slice();
    var f = u.length, v = s ? s(f) : new u.constructor(f);
    return u.copy(v), v;
  }
  e.exports = l;
})(st, st.exports);
function Zf(e, t) {
  var r = -1, n = e.length;
  for (t || (t = Array(n)); ++r < n; )
    t[r] = e[r];
  return t;
}
var Sa = Zf;
function ev(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, a = 0, o = []; ++r < n; ) {
    var i = e[r];
    t(i, r, e) && (o[a++] = i);
  }
  return o;
}
var tv = ev;
function rv() {
  return [];
}
var wa = rv, nv = tv, av = wa, ov = Object.prototype, iv = ov.propertyIsEnumerable, Kr = Object.getOwnPropertySymbols, sv = Kr ? function(e) {
  return e == null ? [] : (e = Object(e), nv(Kr(e), function(t) {
    return iv.call(e, t);
  }));
} : av, hr = sv, lv = ke, uv = hr;
function cv(e, t) {
  return lv(e, uv(e), t);
}
var fv = cv;
function vv(e, t) {
  for (var r = -1, n = t.length, a = e.length; ++r < n; )
    e[a + r] = t[r];
  return e;
}
var Ea = vv, dv = $a, pv = dv(Object.getPrototypeOf, Object), mr = pv, yv = Ea, gv = mr, hv = hr, mv = wa, bv = Object.getOwnPropertySymbols, _v = bv ? function(e) {
  for (var t = []; e; )
    yv(t, hv(e)), e = gv(e);
  return t;
} : mv, Oa = _v, $v = ke, Sv = Oa;
function wv(e, t) {
  return $v(e, Sv(e), t);
}
var Ev = wv, Ov = Ea, Av = Ve;
function Tv(e, t, r) {
  var n = t(e);
  return Av(e) ? n : Ov(n, r(e));
}
var Aa = Tv, Pv = Aa, Iv = hr, Cv = gr;
function xv(e) {
  return Pv(e, Cv, Iv);
}
var Ta = xv, Rv = Aa, Dv = Oa, Fv = ze;
function Lv(e) {
  return Rv(e, Fv, Dv);
}
var Mv = Lv, Nv = fe, jv = z, Uv = Nv(jv, "DataView"), Bv = Uv, Gv = fe, Hv = z, qv = Gv(Hv, "Promise"), Wv = qv, kv = fe, Vv = z, zv = kv(Vv, "Set"), Kv = zv, Qv = fe, Yv = z, Xv = Qv(Yv, "WeakMap"), Jv = Xv, kt = Bv, Vt = cr, zt = Wv, Kt = Kv, Qt = Jv, Pa = Ee, Ie = va, Qr = "[object Map]", Zv = "[object Object]", Yr = "[object Promise]", Xr = "[object Set]", Jr = "[object WeakMap]", Zr = "[object DataView]", ed = Ie(kt), td = Ie(Vt), rd = Ie(zt), nd = Ie(Kt), ad = Ie(Qt), ae = Pa;
(kt && ae(new kt(new ArrayBuffer(1))) != Zr || Vt && ae(new Vt()) != Qr || zt && ae(zt.resolve()) != Yr || Kt && ae(new Kt()) != Xr || Qt && ae(new Qt()) != Jr) && (ae = function(e) {
  var t = Pa(e), r = t == Zv ? e.constructor : void 0, n = r ? Ie(r) : "";
  if (n)
    switch (n) {
      case ed:
        return Zr;
      case td:
        return Qr;
      case rd:
        return Yr;
      case nd:
        return Xr;
      case ad:
        return Jr;
    }
  return t;
});
var wt = ae, od = Object.prototype, id = od.hasOwnProperty;
function sd(e) {
  var t = e.length, r = new e.constructor(t);
  return t && typeof e[0] == "string" && id.call(e, "index") && (r.index = e.index, r.input = e.input), r;
}
var ld = sd, ud = z, cd = ud.Uint8Array, Ia = cd, en = Ia;
function fd(e) {
  var t = new e.constructor(e.byteLength);
  return new en(t).set(new en(e)), t;
}
var br = fd, vd = br;
function dd(e, t) {
  var r = t ? vd(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.byteLength);
}
var pd = dd, yd = /\w*$/;
function gd(e) {
  var t = new e.constructor(e.source, yd.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var hd = gd, tn = gt, rn = tn ? tn.prototype : void 0, nn = rn ? rn.valueOf : void 0;
function md(e) {
  return nn ? Object(nn.call(e)) : {};
}
var bd = md, _d = br;
function $d(e, t) {
  var r = t ? _d(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.length);
}
var Ca = $d, Sd = br, wd = pd, Ed = hd, Od = bd, Ad = Ca, Td = "[object Boolean]", Pd = "[object Date]", Id = "[object Map]", Cd = "[object Number]", xd = "[object RegExp]", Rd = "[object Set]", Dd = "[object String]", Fd = "[object Symbol]", Ld = "[object ArrayBuffer]", Md = "[object DataView]", Nd = "[object Float32Array]", jd = "[object Float64Array]", Ud = "[object Int8Array]", Bd = "[object Int16Array]", Gd = "[object Int32Array]", Hd = "[object Uint8Array]", qd = "[object Uint8ClampedArray]", Wd = "[object Uint16Array]", kd = "[object Uint32Array]";
function Vd(e, t, r) {
  var n = e.constructor;
  switch (t) {
    case Ld:
      return Sd(e);
    case Td:
    case Pd:
      return new n(+e);
    case Md:
      return wd(e, r);
    case Nd:
    case jd:
    case Ud:
    case Bd:
    case Gd:
    case Hd:
    case qd:
    case Wd:
    case kd:
      return Ad(e, r);
    case Id:
      return new n();
    case Cd:
    case Dd:
      return new n(e);
    case xd:
      return Ed(e);
    case Rd:
      return new n();
    case Fd:
      return Od(e);
  }
}
var zd = Vd, Kd = V, an = Object.create, Qd = function() {
  function e() {
  }
  return function(t) {
    if (!Kd(t))
      return {};
    if (an)
      return an(t);
    e.prototype = t;
    var r = new e();
    return e.prototype = void 0, r;
  };
}(), Yd = Qd, Xd = Yd, Jd = mr, Zd = yr;
function ep(e) {
  return typeof e.constructor == "function" && !Zd(e) ? Xd(Jd(e)) : {};
}
var xa = ep, tp = wt, rp = J, np = "[object Map]";
function ap(e) {
  return rp(e) && tp(e) == np;
}
var op = ap, ip = op, sp = dr, on = He.exports, sn = on && on.isMap, lp = sn ? sp(sn) : ip, up = lp, cp = wt, fp = J, vp = "[object Set]";
function dp(e) {
  return fp(e) && cp(e) == vp;
}
var pp = dp, yp = pp, gp = dr, ln = He.exports, un = ln && ln.isSet, hp = un ? gp(un) : yp, mp = hp, bp = fr, _p = zu, $p = ya, Sp = Lf, wp = Jf, Ep = st.exports, Op = Sa, Ap = fv, Tp = Ev, Pp = Ta, Ip = Mv, Cp = wt, xp = ld, Rp = zd, Dp = xa, Fp = Ve, Lp = _e.exports, Mp = up, Np = V, jp = mp, Up = gr, Bp = ze, Gp = 1, Hp = 2, qp = 4, Ra = "[object Arguments]", Wp = "[object Array]", kp = "[object Boolean]", Vp = "[object Date]", zp = "[object Error]", Da = "[object Function]", Kp = "[object GeneratorFunction]", Qp = "[object Map]", Yp = "[object Number]", Fa = "[object Object]", Xp = "[object RegExp]", Jp = "[object Set]", Zp = "[object String]", ey = "[object Symbol]", ty = "[object WeakMap]", ry = "[object ArrayBuffer]", ny = "[object DataView]", ay = "[object Float32Array]", oy = "[object Float64Array]", iy = "[object Int8Array]", sy = "[object Int16Array]", ly = "[object Int32Array]", uy = "[object Uint8Array]", cy = "[object Uint8ClampedArray]", fy = "[object Uint16Array]", vy = "[object Uint32Array]", A = {};
A[Ra] = A[Wp] = A[ry] = A[ny] = A[kp] = A[Vp] = A[ay] = A[oy] = A[iy] = A[sy] = A[ly] = A[Qp] = A[Yp] = A[Fa] = A[Xp] = A[Jp] = A[Zp] = A[ey] = A[uy] = A[cy] = A[fy] = A[vy] = !0;
A[zp] = A[Da] = A[ty] = !1;
function at(e, t, r, n, a, o) {
  var i, s = t & Gp, l = t & Hp, u = t & qp;
  if (r && (i = a ? r(e, n, a, o) : r(e)), i !== void 0)
    return i;
  if (!Np(e))
    return e;
  var c = Fp(e);
  if (c) {
    if (i = xp(e), !s)
      return Op(e, i);
  } else {
    var f = Cp(e), v = f == Da || f == Kp;
    if (Lp(e))
      return Ep(e, s);
    if (f == Fa || f == Ra || v && !a) {
      if (i = l || v ? {} : Dp(e), !s)
        return l ? Tp(e, wp(i, e)) : Ap(e, Sp(i, e));
    } else {
      if (!A[f])
        return a ? e : {};
      i = Rp(e, f, s);
    }
  }
  o || (o = new bp());
  var d = o.get(e);
  if (d)
    return d;
  o.set(e, i), jp(e) ? e.forEach(function(h) {
    i.add(at(h, t, r, h, e, o));
  }) : Mp(e) && e.forEach(function(h, p) {
    i.set(p, at(h, t, r, p, e, o));
  });
  var y = u ? l ? Ip : Pp : l ? Bp : Up, g = c ? void 0 : y(e);
  return _p(g || e, function(h, p) {
    g && (p = h, h = e[p]), $p(i, p, at(h, t, r, p, e, o));
  }), i;
}
var dy = at, py = dy, yy = 1, gy = 4;
function hy(e) {
  return py(e, yy | gy);
}
var cn = hy, my = Object.defineProperty, by = (e, t, r) => t in e ? my(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, ne = (e, t, r) => (by(e, typeof t != "symbol" ? t + "" : t, r), r);
class La {
  constructor() {
    ne(this, "subscriptions", /* @__PURE__ */ new Map()), ne(this, "emitEffectCache", /* @__PURE__ */ new Map()), ne(this, "useSubscription", (t, r) => {
      const n = m();
      R((a) => {
        var o, i;
        n.value = r;
        function s(u) {
          n.value && n.value(u);
        }
        const l = (i = (o = this.subscriptions) == null ? void 0 : o.get(t)) != null ? i : [];
        l.push(s), this.subscriptions.set(t, l), this.emitEffect(t), a(() => {
          this.subscriptions.delete(t);
        });
      });
    }), ne(this, "emit", (t, ...r) => {
      if (typeof t == "string" || typeof t == "number") {
        const n = this.subscriptions.get(t);
        n == null || n.forEach((a) => {
          a == null || a({
            params: cn(r),
            event: t
          });
        }), this.emitEffectCache.set(t, {
          params: cn(r),
          event: t
        });
      } else
        throw new TypeError("event must be string or number !");
    }), ne(this, "emitEffect", (t) => {
      const r = this.emitEffectCache.get(t), n = this.subscriptions.get(t);
      r && (n == null || n.forEach((a) => {
        a == null || a({
          ...r
        });
      }));
    }), ne(this, "removeListener", (t) => {
      this.subscriptions.delete(t);
    }), ne(this, "clear", () => {
      this.subscriptions.clear();
    }), this.clear();
  }
}
const _y = new La();
function i1(e) {
  const t = m(), r = j(() => e != null ? e : { global: !1 });
  return t.value || (t.value = r.value.global ? t.value = _y : t.value = new La()), R((n) => {
    n(() => {
      var a;
      return (a = t.value) == null ? void 0 : a.clear();
    });
  }), t.value;
}
const $y = {
  SVG: "image/svg+xml",
  ICO: "image/x-icon",
  GIF: "image/gif",
  PNG: "image/png"
};
function s1(e) {
  const t = j(() => S(e));
  R(() => {
    var r;
    if (!t.value)
      return;
    const n = (r = t.value) == null ? void 0 : r.split("."), a = n[n.length - 1].toLocaleUpperCase(), o = document.querySelector("link[rel*='icon']") || document.createElement("link");
    o.type = $y[a], o.href = t.value, o.rel = "shortcut icon", document.getElementsByTagName("head")[0].appendChild(o);
  });
}
function l1(e, t) {
  const [r, { set: n }] = lr(!1), { onFocus: a, onBlur: o, onChange: i } = t || {};
  return te(
    "focusin",
    (s) => {
      r.value || (a == null || a(s), i == null || i(!0), n(!0));
    },
    {
      target: e
    }
  ), te(
    "focusout",
    (s) => {
      var l, u;
      r.value && !((u = (l = s.currentTarget) == null ? void 0 : l.contains) != null && u.call(l, s.relatedTarget)) && (o == null || o(s), i == null || i(!1), n(!1));
    },
    {
      target: e
    }
  ), r;
}
function u1(e, t) {
  return j(() => t(S(e)));
}
function Sy(e) {
  yo(
    go({
      setup() {
        return e(), () => {
        };
      }
    })
  ).mount(document.createElement("div"));
}
const It = "VUE_HOOKS_PLUS_USE_REQUEST_DEFAULT_KEY";
function wy(e) {
  return typeof e == "string" || typeof e == "number";
}
function c1(e, t, r) {
  const n = m(r == null ? void 0 : r.fetchKey), a = m({}), o = m({}), i = (l) => {
    o.value = l;
  }, s = (...l) => {
    var u, c;
    const f = m(), v = (c = (u = n.value) == null ? void 0 : u.call(n, ...l)) != null ? c : It;
    f.value = v, Sy(() => {
      const { data: d, run: y, params: g, loading: h } = sa(e, {
        ...t,
        cacheKey: v,
        manual: !0
      });
      R(() => {
        a.value[v] = {
          key: v,
          data: d == null ? void 0 : d.value,
          params: g.value,
          loading: h.value
        }, i(a.value);
      }), y(...l), H([d, g, h, f], (p) => {
        const [
          $ = void 0,
          E = void 0,
          w = !1,
          b = It
        ] = p, _ = wy(b) ? b : It;
        a.value[_] = {
          key: _,
          data: $,
          params: E,
          loading: w
        }, i(a.value);
      });
    });
  };
  return {
    fetchs: N(o),
    fetchRun: s
  };
}
var Ma = { exports: {} };
/*!
* screenfull
* v5.2.0 - 2021-11-03
* (c) Sindre Sorhus; MIT License
*/
(function(e) {
  (function() {
    var t = typeof window < "u" && typeof window.document < "u" ? window.document : {}, r = e.exports, n = function() {
      for (var i, s = [
        [
          "requestFullscreen",
          "exitFullscreen",
          "fullscreenElement",
          "fullscreenEnabled",
          "fullscreenchange",
          "fullscreenerror"
        ],
        [
          "webkitRequestFullscreen",
          "webkitExitFullscreen",
          "webkitFullscreenElement",
          "webkitFullscreenEnabled",
          "webkitfullscreenchange",
          "webkitfullscreenerror"
        ],
        [
          "webkitRequestFullScreen",
          "webkitCancelFullScreen",
          "webkitCurrentFullScreenElement",
          "webkitCancelFullScreen",
          "webkitfullscreenchange",
          "webkitfullscreenerror"
        ],
        [
          "mozRequestFullScreen",
          "mozCancelFullScreen",
          "mozFullScreenElement",
          "mozFullScreenEnabled",
          "mozfullscreenchange",
          "mozfullscreenerror"
        ],
        [
          "msRequestFullscreen",
          "msExitFullscreen",
          "msFullscreenElement",
          "msFullscreenEnabled",
          "MSFullscreenChange",
          "MSFullscreenError"
        ]
      ], l = 0, u = s.length, c = {}; l < u; l++)
        if (i = s[l], i && i[1] in t) {
          for (l = 0; l < i.length; l++)
            c[s[0][l]] = i[l];
          return c;
        }
      return !1;
    }(), a = {
      change: n.fullscreenchange,
      error: n.fullscreenerror
    }, o = {
      request: function(i, s) {
        return new Promise(function(l, u) {
          var c = function() {
            this.off("change", c), l();
          }.bind(this);
          this.on("change", c), i = i || t.documentElement;
          var f = i[n.requestFullscreen](s);
          f instanceof Promise && f.then(c).catch(u);
        }.bind(this));
      },
      exit: function() {
        return new Promise(function(i, s) {
          if (!this.isFullscreen) {
            i();
            return;
          }
          var l = function() {
            this.off("change", l), i();
          }.bind(this);
          this.on("change", l);
          var u = t[n.exitFullscreen]();
          u instanceof Promise && u.then(l).catch(s);
        }.bind(this));
      },
      toggle: function(i, s) {
        return this.isFullscreen ? this.exit() : this.request(i, s);
      },
      onchange: function(i) {
        this.on("change", i);
      },
      onerror: function(i) {
        this.on("error", i);
      },
      on: function(i, s) {
        var l = a[i];
        l && t.addEventListener(l, s, !1);
      },
      off: function(i, s) {
        var l = a[i];
        l && t.removeEventListener(l, s, !1);
      },
      raw: n
    };
    if (!n) {
      r ? e.exports = { isEnabled: !1 } : window.screenfull = { isEnabled: !1 };
      return;
    }
    Object.defineProperties(o, {
      isFullscreen: {
        get: function() {
          return Boolean(t[n.fullscreenElement]);
        }
      },
      element: {
        enumerable: !0,
        get: function() {
          return t[n.fullscreenElement];
        }
      },
      isEnabled: {
        enumerable: !0,
        get: function() {
          return Boolean(t[n.fullscreenEnabled]);
        }
      }
    }), r ? e.exports = o : window.screenfull = o;
  })();
})(Ma);
const W = Ma.exports, f1 = (e, t) => {
  const { onExit: r, onEnter: n, defaultElement: a = document.documentElement } = t || {}, o = m(r), i = m(n), s = m(!1), l = (d) => {
    s.value = d;
  }, u = () => {
    var d, y, g;
    if (W.isEnabled) {
      const h = x(e, a);
      if (!W.element)
        (d = o.value) == null || d.call(o), l(!1), W.off("change", u);
      else {
        const p = W.element === h;
        p ? (y = i.value) == null || y.call(i) : (g = o.value) == null || g.call(o), l(p);
      }
    }
  }, c = () => {
    const d = x(e, a);
    if (!!d && W.isEnabled)
      try {
        W.request(d), W.on("change", u);
      } catch (y) {
        console.error(y);
      }
  }, f = () => {
    const d = x(e, a);
    W.isEnabled && W.element === d && W.exit();
  }, v = () => {
    s.value ? f() : c();
  };
  return qe(() => {
    W.isEnabled && W.off("change", u);
  }), [
    N(s),
    {
      enterFullscreen: c,
      exitFullscreen: f,
      toggleFullscreen: v,
      isEnabled: W.isEnabled
    }
  ];
};
function v1(e, t) {
  const { onEnter: r, onLeave: n, onChange: a } = t || {}, [o, { setTrue: i, setFalse: s }] = lr(!1);
  return te(
    "mouseenter",
    () => {
      r == null || r(), i(), a == null || a(!0);
    },
    {
      target: e
    }
  ), te(
    "mouseleave",
    () => {
      n == null || n(), s(), a == null || a(!1);
    },
    {
      target: e
    }
  ), o;
}
const Ey = (e, t) => !Object.is(e, t);
function d1(e, t = Ey) {
  const r = m(), n = m();
  return R(() => {
    t(n.value, e.value) && (r.value = n.value, n.value = e.value);
  }), N(r);
}
function p1(e, t, r) {
  const n = r == null ? void 0 : r.immediate, a = m(e);
  R((o) => {
    if (se(t)) {
      if (typeof t.value != "number" || t.value < 0)
        return;
    } else if (typeof t != "number" || t < 0)
      return;
    n && a.value();
    const i = S(t), s = setInterval(() => {
      a.value();
    }, i);
    o(() => {
      clearInterval(s);
    });
  });
}
const Oy = (e) => e === document || e === document.body ? Math.max(
  window.pageYOffset,
  document.documentElement.scrollTop,
  document.body.scrollTop
) : e.scrollTop, Ay = (e) => e.scrollHeight || Math.max(document.documentElement.scrollHeight, document.body.scrollHeight), Ty = (e) => e.clientHeight || Math.max(document.documentElement.clientHeight, document.body.clientHeight), y1 = (e, t = {}) => {
  const {
    target: r,
    isNoMore: n,
    threshold: a = 100,
    reloadDeps: o = [],
    manual: i,
    onBefore: s,
    onSuccess: l,
    onError: u,
    onFinally: c
  } = t, f = m(), [v, { set: d }] = lr(), y = (C) => {
    f.value = C;
  }, g = j(() => n ? n(f.value) : !1), { loading: h, run: p, runAsync: $, cancel: E } = sa(
    async (C) => {
      const q = await e(C);
      return C ? f.value = {
        ...q,
        list: [...C.list, ...q.list]
      } : f.value = q, q;
    },
    {
      manual: i,
      onFinally: (C, q, G) => {
        d(!1), c == null || c(q, G);
      },
      onBefore: () => s == null ? void 0 : s(),
      onSuccess: (C) => {
        setTimeout(() => {
          I();
        }), l == null || l(C);
      },
      onError: (C) => u == null ? void 0 : u(C)
    }
  ), w = () => {
    g.value || (d(!0), p(f.value));
  }, b = () => {
    if (!g.value)
      return d(!0), $(f.value);
  }, _ = () => p(), T = () => $(), I = () => {
    const C = x(r);
    if (!C)
      return;
    const q = Oy(C), G = Ay(C), k = Ty(C);
    G - q <= k + a && w();
  };
  te(
    "scroll",
    () => {
      h.value || v.value || I();
    },
    { target: r }
  ), H(o, () => {
    p();
  });
  const D = j(() => v.value && h.value);
  return {
    data: ea(f),
    loading: N(D),
    loadingMore: v,
    noMore: g,
    loadMore: w,
    loadMoreAsync: b,
    reload: _,
    reloadAsync: T,
    mutate: y,
    scrollMethod: I,
    cancel: E
  };
};
function g1(e, t) {
  const r = m(), n = m();
  return ce(
    () => {
      const a = x(e);
      if (!a)
        return;
      const o = new IntersectionObserver(
        (i) => {
          for (const s of i)
            r.value = s.isIntersecting, n.value = s.intersectionRatio;
        },
        {
          ...t,
          root: x(t == null ? void 0 : t.root)
        }
      );
      return o.observe(a), () => {
        o.disconnect();
      };
    },
    [],
    e
  ), [N(r), N(n)];
}
var Py = "__lodash_hash_undefined__";
function Iy(e) {
  return this.__data__.set(e, Py), this;
}
var Cy = Iy;
function xy(e) {
  return this.__data__.has(e);
}
var Ry = xy, Dy = da, Fy = Cy, Ly = Ry;
function lt(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.__data__ = new Dy(); ++t < r; )
    this.add(e[t]);
}
lt.prototype.add = lt.prototype.push = Fy;
lt.prototype.has = Ly;
var My = lt;
function Ny(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
    if (t(e[r], r, e))
      return !0;
  return !1;
}
var jy = Ny;
function Uy(e, t) {
  return e.has(t);
}
var By = Uy, Gy = My, Hy = jy, qy = By, Wy = 1, ky = 2;
function Vy(e, t, r, n, a, o) {
  var i = r & Wy, s = e.length, l = t.length;
  if (s != l && !(i && l > s))
    return !1;
  var u = o.get(e), c = o.get(t);
  if (u && c)
    return u == t && c == e;
  var f = -1, v = !0, d = r & ky ? new Gy() : void 0;
  for (o.set(e, t), o.set(t, e); ++f < s; ) {
    var y = e[f], g = t[f];
    if (n)
      var h = i ? n(g, y, f, t, e, o) : n(y, g, f, e, t, o);
    if (h !== void 0) {
      if (h)
        continue;
      v = !1;
      break;
    }
    if (d) {
      if (!Hy(t, function(p, $) {
        if (!qy(d, $) && (y === p || a(y, p, r, n, o)))
          return d.push($);
      })) {
        v = !1;
        break;
      }
    } else if (!(y === g || a(y, g, r, n, o))) {
      v = !1;
      break;
    }
  }
  return o.delete(e), o.delete(t), v;
}
var Na = Vy;
function zy(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n, a) {
    r[++t] = [a, n];
  }), r;
}
var Ky = zy;
function Qy(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n) {
    r[++t] = n;
  }), r;
}
var Yy = Qy, fn = gt, vn = Ia, Xy = We, Jy = Na, Zy = Ky, eg = Yy, tg = 1, rg = 2, ng = "[object Boolean]", ag = "[object Date]", og = "[object Error]", ig = "[object Map]", sg = "[object Number]", lg = "[object RegExp]", ug = "[object Set]", cg = "[object String]", fg = "[object Symbol]", vg = "[object ArrayBuffer]", dg = "[object DataView]", dn = fn ? fn.prototype : void 0, Ct = dn ? dn.valueOf : void 0;
function pg(e, t, r, n, a, o, i) {
  switch (r) {
    case dg:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case vg:
      return !(e.byteLength != t.byteLength || !o(new vn(e), new vn(t)));
    case ng:
    case ag:
    case sg:
      return Xy(+e, +t);
    case og:
      return e.name == t.name && e.message == t.message;
    case lg:
    case cg:
      return e == t + "";
    case ig:
      var s = Zy;
    case ug:
      var l = n & tg;
      if (s || (s = eg), e.size != t.size && !l)
        return !1;
      var u = i.get(e);
      if (u)
        return u == t;
      n |= rg, i.set(e, t);
      var c = Jy(s(e), s(t), n, a, o, i);
      return i.delete(e), c;
    case fg:
      if (Ct)
        return Ct.call(e) == Ct.call(t);
  }
  return !1;
}
var yg = pg, pn = Ta, gg = 1, hg = Object.prototype, mg = hg.hasOwnProperty;
function bg(e, t, r, n, a, o) {
  var i = r & gg, s = pn(e), l = s.length, u = pn(t), c = u.length;
  if (l != c && !i)
    return !1;
  for (var f = l; f--; ) {
    var v = s[f];
    if (!(i ? v in t : mg.call(t, v)))
      return !1;
  }
  var d = o.get(e), y = o.get(t);
  if (d && y)
    return d == t && y == e;
  var g = !0;
  o.set(e, t), o.set(t, e);
  for (var h = i; ++f < l; ) {
    v = s[f];
    var p = e[v], $ = t[v];
    if (n)
      var E = i ? n($, p, v, t, e, o) : n(p, $, v, e, t, o);
    if (!(E === void 0 ? p === $ || a(p, $, r, n, o) : E)) {
      g = !1;
      break;
    }
    h || (h = v == "constructor");
  }
  if (g && !h) {
    var w = e.constructor, b = t.constructor;
    w != b && "constructor" in e && "constructor" in t && !(typeof w == "function" && w instanceof w && typeof b == "function" && b instanceof b) && (g = !1);
  }
  return o.delete(e), o.delete(t), g;
}
var _g = bg, xt = fr, $g = Na, Sg = yg, wg = _g, yn = wt, gn = Ve, hn = _e.exports, Eg = pr, Og = 1, mn = "[object Arguments]", bn = "[object Array]", Ze = "[object Object]", Ag = Object.prototype, _n = Ag.hasOwnProperty;
function Tg(e, t, r, n, a, o) {
  var i = gn(e), s = gn(t), l = i ? bn : yn(e), u = s ? bn : yn(t);
  l = l == mn ? Ze : l, u = u == mn ? Ze : u;
  var c = l == Ze, f = u == Ze, v = l == u;
  if (v && hn(e)) {
    if (!hn(t))
      return !1;
    i = !0, c = !1;
  }
  if (v && !c)
    return o || (o = new xt()), i || Eg(e) ? $g(e, t, r, n, a, o) : Sg(e, t, l, r, n, a, o);
  if (!(r & Og)) {
    var d = c && _n.call(e, "__wrapped__"), y = f && _n.call(t, "__wrapped__");
    if (d || y) {
      var g = d ? e.value() : e, h = y ? t.value() : t;
      return o || (o = new xt()), a(g, h, r, n, o);
    }
  }
  return v ? (o || (o = new xt()), wg(e, t, r, n, a, o)) : !1;
}
var Pg = Tg, Ig = Pg, $n = J;
function ja(e, t, r, n, a) {
  return e === t ? !0 : e == null || t == null || !$n(e) && !$n(t) ? e !== e && t !== t : Ig(e, t, r, n, ja, a);
}
var Cg = ja, xg = Cg;
function Rg(e, t) {
  return xg(e, t);
}
var Dg = Rg;
const Fg = (e, t = []) => Dg(e, t), Ua = (e, t, r) => {
  const n = m(), a = m(0);
  Fg(t, n.value) || (n.value = t, a.value += 1), ce(e, [a], r);
}, Lg = {
  0: 48,
  1: 49,
  2: 50,
  3: 51,
  4: 52,
  5: 53,
  6: 54,
  7: 55,
  8: 56,
  9: 57,
  backspace: 8,
  tab: 9,
  enter: 13,
  shift: 16,
  ctrl: 17,
  alt: 18,
  pausebreak: 19,
  capslock: 20,
  esc: 27,
  space: 32,
  pageup: 33,
  pagedown: 34,
  end: 35,
  home: 36,
  leftarrow: 37,
  uparrow: 38,
  rightarrow: 39,
  downarrow: 40,
  insert: 45,
  delete: 46,
  a: 65,
  b: 66,
  c: 67,
  d: 68,
  e: 69,
  f: 70,
  g: 71,
  h: 72,
  i: 73,
  j: 74,
  k: 75,
  l: 76,
  m: 77,
  n: 78,
  o: 79,
  p: 80,
  q: 81,
  r: 82,
  s: 83,
  t: 84,
  u: 85,
  v: 86,
  w: 87,
  x: 88,
  y: 89,
  z: 90,
  leftwindowkey: 91,
  rightwindowkey: 92,
  selectkey: 93,
  numpad0: 96,
  numpad1: 97,
  numpad2: 98,
  numpad3: 99,
  numpad4: 100,
  numpad5: 101,
  numpad6: 102,
  numpad7: 103,
  numpad8: 104,
  numpad9: 105,
  multiply: 106,
  add: 107,
  subtract: 109,
  decimalpoint: 110,
  divide: 111,
  f1: 112,
  f2: 113,
  f3: 114,
  f4: 115,
  f5: 116,
  f6: 117,
  f7: 118,
  f8: 119,
  f9: 120,
  f10: 121,
  f11: 122,
  f12: 123,
  numlock: 144,
  scrolllock: 145,
  semicolon: 186,
  equalsign: 187,
  comma: 188,
  dash: 189,
  period: 190,
  forwardslash: 191,
  graveaccent: 192,
  openbracket: 219,
  backslash: 220,
  closebracket: 221,
  singlequote: 222
}, Yt = {
  ctrl: (e) => e.ctrlKey,
  shift: (e) => e.shiftKey,
  alt: (e) => e.altKey,
  meta: (e) => e.metaKey
};
function Mg(e) {
  const t = Object.keys(Yt).reduce((r, n) => Yt[n](e) ? r + 1 : r, 0);
  return [16, 17, 18, 91, 92].includes(e.keyCode) ? t : t + 1;
}
function Sn(e, t, r) {
  if (!e.key)
    return !1;
  if (Ge(t))
    return e.keyCode === t;
  const n = t.split(".");
  let a = 0;
  for (const o of n) {
    const i = Yt[o], s = Lg[o.toLowerCase()];
    (i && i(e) || s && s === e.keyCode) && a++;
  }
  return r ? a === n.length && Mg(e) === n.length : a === n.length;
}
function Ng(e, t) {
  return ua(e) ? e : ps(e) || Ge(e) ? (r) => Sn(r, e, t) : Array.isArray(e) ? (r) => e.some((n) => Sn(r, n, t)) : e ? () => !0 : () => !1;
}
const jg = ["keydown"];
function h1(e, t, r) {
  const { events: n = jg, target: a, exactMatch: o = !1 } = r || {}, i = m(t), s = m(e);
  Ua(
    () => {
      var l;
      const u = x(a, window);
      if (!u)
        return;
      const c = (f) => {
        var v;
        if (Ng(s.value, o)(f))
          return (v = i.value) == null ? void 0 : v.call(i, f);
      };
      for (const f of n)
        (l = u == null ? void 0 : u.addEventListener) == null || l.call(u, f, c);
      return () => {
        var f;
        for (const v of n)
          (f = u == null ? void 0 : u.removeEventListener) == null || f.call(
            u,
            v,
            c
          );
      };
    },
    [n],
    a
  );
}
function m1(e) {
  let t = !1;
  return async (...r) => {
    if (!t) {
      t = !0;
      try {
        const n = await e(...r);
        return t = !1, n;
      } catch (n) {
        throw t = !1, n;
      }
    }
  };
}
const Ug = () => "PointerEvent" in window ? {
  mouseDown: "pointerdown",
  mouseUp: "pointerup",
  mouseMove: "pointermove"
} : "ontouchstart" in window || navigator.maxTouchPoints > 0 ? {
  mouseDown: "touchstart",
  mouseUp: "touchend",
  mouseMove: "touchmove"
} : {
  mouseDown: "mousedown",
  mouseUp: "mouseup",
  mouseMove: "mousemove"
}, b1 = (e, t = {}) => {
  var r, n;
  const i = m(!1), s = m(0);
  let l, u;
  const c = {
    capture: (r = t == null ? void 0 : t.modifiers) == null ? void 0 : r.capture,
    once: (n = t == null ? void 0 : t.modifiers) == null ? void 0 : n.once
  };
  return ce(
    () => {
      var f;
      const v = x(e);
      if (!v)
        return;
      const { mouseDown: d, mouseUp: y, mouseMove: g } = Ug();
      function h() {
        u && (clearTimeout(u), u = void 0), l && (clearInterval(l), l = void 0), s.value = 0, i.value = !1;
      }
      function p($) {
        var E, w, b;
        ((E = t.modifiers) == null ? void 0 : E.self) && $.target !== v || (h(), (w = t.modifiers) != null && w.prevent && $.preventDefault(), (b = t.modifiers) != null && b.stop && $.stopPropagation(), u = setTimeout(() => {
          i.value = !0, l = setInterval(() => {
            s.value += t.minUpdateTime || 100;
          }, t.minUpdateTime || 100);
        }, t.delay || 500));
      }
      return v.addEventListener(d, p, c), v.addEventListener(y, h, c), ((f = t.cancelOnMove) == null || f) && v.addEventListener(g, h, c), () => {
        var $;
        v.removeEventListener(d, p), v.removeEventListener(y, h), (($ = t.cancelOnMove) == null || $) && v.removeEventListener(g, h);
      };
    },
    [],
    e
  ), { isPressing: N(i), pressingTime: N(s) };
}, Bg = {
  screenX: NaN,
  screenY: NaN,
  clientX: NaN,
  clientY: NaN,
  pageX: NaN,
  pageY: NaN,
  elementX: NaN,
  elementY: NaN,
  elementH: NaN,
  elementW: NaN,
  elementPosX: NaN,
  elementPosY: NaN
};
function _1(e) {
  const t = m(Bg);
  return te(
    "mousemove",
    (r) => {
      const { screenX: n, screenY: a, clientX: o, clientY: i, pageX: s, pageY: l } = r, u = {
        screenX: n,
        screenY: a,
        clientX: o,
        clientY: i,
        pageX: s,
        pageY: l,
        elementX: NaN,
        elementY: NaN,
        elementH: NaN,
        elementW: NaN,
        elementPosX: NaN,
        elementPosY: NaN
      }, c = x(e);
      if (c) {
        const { left: f, top: v, width: d, height: y } = c.getBoundingClientRect();
        u.elementPosX = f + window.pageXOffset, u.elementPosY = v + window.pageYOffset, u.elementX = s - u.elementPosX, u.elementY = l - u.elementPosY, u.elementW = d, u.elementH = y;
      }
      t.value = u;
    },
    {
      target: document
    }
  ), N(t);
}
function $1(e) {
  const t = () => e ? new Map(e) : /* @__PURE__ */ new Map(), r = m(t());
  return [r, ta({
    set: (a, o) => {
      r.value.set(a, o);
    },
    get: (a) => r.value.get(a),
    remove: (a) => {
      r.value.delete(a);
    },
    has: (a) => r.value.has(a),
    clear: () => r.value.clear(),
    setAll: (a) => {
      r.value = new Map(a);
    },
    reset: () => r.value = t()
  })];
}
function Ba() {
  const e = navigator;
  return typeof e != "object" ? null : e.connection || e.mozConnection || e.webkitConnection;
}
function wn() {
  const e = Ba();
  return e ? {
    rtt: e.rtt,
    type: e.type,
    saveData: e.saveData,
    downlink: e.downlink,
    downlinkMax: e.downlinkMax,
    effectiveType: e.effectiveType
  } : {};
}
function S1() {
  const e = m({
    since: void 0,
    online: navigator == null ? void 0 : navigator.onLine,
    ...wn()
  });
  return R((t) => {
    const r = () => {
      e.value = {
        ...e.value,
        online: !0,
        since: new Date()
      };
    }, n = () => {
      e.value = {
        ...e.value,
        online: !1,
        since: new Date()
      };
    }, a = () => {
      e.value = {
        ...e.value,
        ...wn()
      };
    };
    window.addEventListener("online", r), window.addEventListener("offline", n);
    const o = Ba();
    o == null || o.addEventListener("change", a), t(() => {
      window.removeEventListener("online", r), window.removeEventListener("offline", n), o == null || o.removeEventListener("change", a);
    });
  }), N(e);
}
const w1 = ca(
  () => ht ? sessionStorage : void 0
);
function E1(e) {
  const t = () => e === void 0 ? /* @__PURE__ */ new Set() : new Set(e), r = m(t()), n = {
    add: (a) => {
      r.value.add(a);
    },
    remove: (a) => {
      r.value.delete(a);
    },
    has: (a) => r.value.has(a),
    clear: () => r.value.clear(),
    reset: () => {
      r.value = t();
    }
  };
  return [N(r), ta(n)];
}
var Gg = vr, Hg = We;
function qg(e, t, r) {
  (r !== void 0 && !Hg(e[t], r) || r === void 0 && !(t in e)) && Gg(e, t, r);
}
var Ga = qg;
function Wg(e) {
  return function(t, r, n) {
    for (var a = -1, o = Object(t), i = n(t), s = i.length; s--; ) {
      var l = i[e ? s : ++a];
      if (r(o[l], l, o) === !1)
        break;
    }
    return t;
  };
}
var kg = Wg, Vg = kg, zg = Vg(), Kg = zg, Qg = St, Yg = J;
function Xg(e) {
  return Yg(e) && Qg(e);
}
var Jg = Xg, Zg = Ee, eh = mr, th = J, rh = "[object Object]", nh = Function.prototype, ah = Object.prototype, Ha = nh.toString, oh = ah.hasOwnProperty, ih = Ha.call(Object);
function sh(e) {
  if (!th(e) || Zg(e) != rh)
    return !1;
  var t = eh(e);
  if (t === null)
    return !0;
  var r = oh.call(t, "constructor") && t.constructor;
  return typeof r == "function" && r instanceof r && Ha.call(r) == ih;
}
var lh = sh;
function uh(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
var qa = uh, ch = ke, fh = ze;
function vh(e) {
  return ch(e, fh(e));
}
var dh = vh, En = Ga, ph = st.exports, yh = Ca, gh = Sa, hh = xa, On = ha, An = Ve, mh = Jg, bh = _e.exports, _h = ur, $h = V, Sh = lh, wh = pr, Tn = qa, Eh = dh;
function Oh(e, t, r, n, a, o, i) {
  var s = Tn(e, r), l = Tn(t, r), u = i.get(l);
  if (u) {
    En(e, r, u);
    return;
  }
  var c = o ? o(s, l, r + "", e, t, i) : void 0, f = c === void 0;
  if (f) {
    var v = An(l), d = !v && bh(l), y = !v && !d && wh(l);
    c = l, v || d || y ? An(s) ? c = s : mh(s) ? c = gh(s) : d ? (f = !1, c = ph(l, !0)) : y ? (f = !1, c = yh(l, !0)) : c = [] : Sh(l) || On(l) ? (c = s, On(s) ? c = Eh(s) : (!$h(s) || _h(s)) && (c = hh(l))) : f = !1;
  }
  f && (i.set(l, c), a(c, l, n, o, i), i.delete(l)), En(e, r, c);
}
var Ah = Oh, Th = fr, Ph = Ga, Ih = Kg, Ch = Ah, xh = V, Rh = ze, Dh = qa;
function Wa(e, t, r, n, a) {
  e !== t && Ih(t, function(o, i) {
    if (a || (a = new Th()), xh(o))
      Ch(e, t, i, r, Wa, n, a);
    else {
      var s = n ? n(Dh(e, i), o, i + "", e, t, a) : void 0;
      s === void 0 && (s = o), Ph(e, i, s);
    }
  }, Rh);
}
var Fh = Wa;
function Lh(e) {
  return e;
}
var ka = Lh;
function Mh(e, t, r) {
  switch (r.length) {
    case 0:
      return e.call(t);
    case 1:
      return e.call(t, r[0]);
    case 2:
      return e.call(t, r[0], r[1]);
    case 3:
      return e.call(t, r[0], r[1], r[2]);
  }
  return e.apply(t, r);
}
var Nh = Mh, jh = Nh, Pn = Math.max;
function Uh(e, t, r) {
  return t = Pn(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var n = arguments, a = -1, o = Pn(n.length - t, 0), i = Array(o); ++a < o; )
      i[a] = n[t + a];
    a = -1;
    for (var s = Array(t + 1); ++a < t; )
      s[a] = n[a];
    return s[t] = r(i), jh(e, this, s);
  };
}
var Bh = Uh;
function Gh(e) {
  return function() {
    return e;
  };
}
var Hh = Gh, qh = Hh, In = pa, Wh = ka, kh = In ? function(e, t) {
  return In(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: qh(t),
    writable: !0
  });
} : Wh, Vh = kh, zh = 800, Kh = 16, Qh = Date.now;
function Yh(e) {
  var t = 0, r = 0;
  return function() {
    var n = Qh(), a = Kh - (n - r);
    if (r = n, a > 0) {
      if (++t >= zh)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
var Xh = Yh, Jh = Vh, Zh = Xh, em = Zh(Jh), tm = em, rm = ka, nm = Bh, am = tm;
function om(e, t) {
  return am(nm(e, t, rm), e + "");
}
var im = om, sm = We, lm = St, um = ma, cm = V;
function fm(e, t, r) {
  if (!cm(r))
    return !1;
  var n = typeof t;
  return (n == "number" ? lm(r) && um(t, r.length) : n == "string" && t in r) ? sm(r[t], e) : !1;
}
var vm = fm, dm = im, pm = vm;
function ym(e) {
  return dm(function(t, r) {
    var n = -1, a = r.length, o = a > 1 ? r[a - 1] : void 0, i = a > 2 ? r[2] : void 0;
    for (o = e.length > 3 && typeof o == "function" ? (a--, o) : void 0, i && pm(r[0], r[1], i) && (o = a < 3 ? void 0 : o, a = 1), t = Object(t); ++n < a; ) {
      var s = r[n];
      s && e(t, s, n, o);
    }
    return t;
  });
}
var gm = ym, hm = Fh, mm = gm, bm = mm(function(e, t, r) {
  hm(e, t, r);
}), _m = bm;
function O1(e) {
  const r = m((() => S(e))()), n = (a, o = !1) => {
    const i = S(a);
    o ? r.value = i : r.value = i ? _m(r.value, i) : r.value;
  };
  return [N(r), n];
}
function $m(e = () => {
}) {
  const t = () => {
    mo(() => {
      e();
    });
  };
  return yt(() => {
    window.addEventListener("resize", t, !1);
  }), ho(() => {
    window.removeEventListener("resize", t);
  }), null;
}
function Sm(e) {
  const t = pt({
    width: 0,
    height: 0
  }), r = () => {
    var n, a;
    const o = x(e);
    t.width = (n = o == null ? void 0 : o.clientWidth) != null ? n : 0, t.height = (a = o == null ? void 0 : o.clientHeight) != null ? a : 0;
  };
  return $m(r), yt(() => {
    setTimeout(() => {
      r();
    }, 120);
  }), { ...ar(t) };
}
function A1(e, t = () => !0) {
  const r = m(), n = m(t);
  return ce(
    () => {
      const a = x(e, document);
      if (!a)
        return;
      const o = () => {
        let i;
        a === document ? document.scrollingElement ? i = {
          left: document.scrollingElement.scrollLeft,
          top: document.scrollingElement.scrollTop
        } : i = {
          left: Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
          ),
          top: Math.max(
            window.pageXOffset,
            document.documentElement.scrollLeft,
            document.body.scrollLeft
          )
        } : i = {
          left: a.scrollLeft,
          top: a.scrollTop
        }, n.value(i) && (r.value = i);
      };
      return o(), a.addEventListener("scroll", o), () => {
        a.removeEventListener("scroll", o);
      };
    },
    [],
    e
  ), N(r);
}
function wm(e, t) {
  var r;
  const n = m(e), a = (r = t == null ? void 0 : t.wait) != null ? r : 1e3, o = j(
    () => oa(
      (...i) => n.value([...i]),
      a,
      t
    )
  );
  return qe(() => {
    o.value.cancel();
  }), {
    run: o,
    cancel: o.value.cancel,
    flush: o.value.flush
  };
}
function T1(e, t) {
  const r = m();
  r.value = e.value;
  const { run: n } = wm(() => {
    r.value = e.value;
  }, t);
  return H(
    e,
    () => {
      n.value();
    },
    {
      immediate: !0
    }
  ), r;
}
function Em(e, t, r) {
  (r == null ? void 0 : r.immediate) && e(), R((a) => {
    if (S(t) === void 0 || typeof S(t) != "number" || S(t) < 0)
      return;
    const o = S(t), i = setTimeout(() => {
      e();
    }, o);
    a(() => {
      clearInterval(i);
    });
  });
}
const Om = {
  restoreOnUnmount: !1
};
function P1(e, t = Om) {
  const r = m(ht ? document.title : "");
  se(e) ? H(e, () => {
    document.title = e.value;
  }) : document.title = e, yt(() => {
    document.title = S(e);
  }), qe(() => {
    t.restoreOnUnmount && (document.title = S(r));
  });
}
const Am = (e, t) => e ? e.map((r, n) => e[n] !== (t == null ? void 0 : t[n]) ? n : -1).filter((r) => r >= 0) : t ? t.map((r, n) => n) : [], I1 = (e, t) => {
  H(t != null ? t : [], (r, n) => {
    const a = Am(n, r);
    e(a);
  });
};
function C1() {
  const e = m({}), t = () => {
    e.value = Object.assign({}, { ...e.value });
  };
  return {
    update: N(e),
    setUpdate: t
  };
}
var Tm = Error, Pm = EvalError, Im = RangeError, Cm = ReferenceError, Va = SyntaxError, Ke = TypeError, xm = URIError, Rm = function() {
  if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
    return !1;
  if (typeof Symbol.iterator == "symbol")
    return !0;
  var t = {}, r = Symbol("test"), n = Object(r);
  if (typeof r == "string" || Object.prototype.toString.call(r) !== "[object Symbol]" || Object.prototype.toString.call(n) !== "[object Symbol]")
    return !1;
  var a = 42;
  t[r] = a;
  for (r in t)
    return !1;
  if (typeof Object.keys == "function" && Object.keys(t).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(t).length !== 0)
    return !1;
  var o = Object.getOwnPropertySymbols(t);
  if (o.length !== 1 || o[0] !== r || !Object.prototype.propertyIsEnumerable.call(t, r))
    return !1;
  if (typeof Object.getOwnPropertyDescriptor == "function") {
    var i = Object.getOwnPropertyDescriptor(t, r);
    if (i.value !== a || i.enumerable !== !0)
      return !1;
  }
  return !0;
}, Cn = typeof Symbol < "u" && Symbol, Dm = Rm, Fm = function() {
  return typeof Cn != "function" || typeof Symbol != "function" || typeof Cn("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : Dm();
}, Rt = {
  __proto__: null,
  foo: {}
}, Lm = Object, Mm = function() {
  return { __proto__: Rt }.foo === Rt.foo && !(Rt instanceof Lm);
}, Nm = "Function.prototype.bind called on incompatible ", jm = Object.prototype.toString, Um = Math.max, Bm = "[object Function]", xn = function(t, r) {
  for (var n = [], a = 0; a < t.length; a += 1)
    n[a] = t[a];
  for (var o = 0; o < r.length; o += 1)
    n[o + t.length] = r[o];
  return n;
}, Gm = function(t, r) {
  for (var n = [], a = r || 0, o = 0; a < t.length; a += 1, o += 1)
    n[o] = t[a];
  return n;
}, Hm = function(e, t) {
  for (var r = "", n = 0; n < e.length; n += 1)
    r += e[n], n + 1 < e.length && (r += t);
  return r;
}, qm = function(t) {
  var r = this;
  if (typeof r != "function" || jm.apply(r) !== Bm)
    throw new TypeError(Nm + r);
  for (var n = Gm(arguments, 1), a, o = function() {
    if (this instanceof a) {
      var c = r.apply(
        this,
        xn(n, arguments)
      );
      return Object(c) === c ? c : this;
    }
    return r.apply(
      t,
      xn(n, arguments)
    );
  }, i = Um(0, r.length - n.length), s = [], l = 0; l < i; l++)
    s[l] = "$" + l;
  if (a = Function("binder", "return function (" + Hm(s, ",") + "){ return binder.apply(this,arguments); }")(o), r.prototype) {
    var u = function() {
    };
    u.prototype = r.prototype, a.prototype = new u(), u.prototype = null;
  }
  return a;
}, Wm = qm, _r = Function.prototype.bind || Wm, km = Function.prototype.call, Vm = Object.prototype.hasOwnProperty, zm = _r, Km = zm.call(km, Vm), O, Qm = Tm, Ym = Pm, Xm = Im, Jm = Cm, $e = Va, be = Ke, Zm = xm, za = Function, Dt = function(e) {
  try {
    return za('"use strict"; return (' + e + ").constructor;")();
  } catch {
  }
}, le = Object.getOwnPropertyDescriptor;
if (le)
  try {
    le({}, "");
  } catch {
    le = null;
  }
var Ft = function() {
  throw new be();
}, eb = le ? function() {
  try {
    return arguments.callee, Ft;
  } catch {
    try {
      return le(arguments, "callee").get;
    } catch {
      return Ft;
    }
  }
}() : Ft, ye = Fm(), tb = Mm(), M = Object.getPrototypeOf || (tb ? function(e) {
  return e.__proto__;
} : null), he = {}, rb = typeof Uint8Array > "u" || !M ? O : M(Uint8Array), ue = {
  __proto__: null,
  "%AggregateError%": typeof AggregateError > "u" ? O : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer > "u" ? O : ArrayBuffer,
  "%ArrayIteratorPrototype%": ye && M ? M([][Symbol.iterator]()) : O,
  "%AsyncFromSyncIteratorPrototype%": O,
  "%AsyncFunction%": he,
  "%AsyncGenerator%": he,
  "%AsyncGeneratorFunction%": he,
  "%AsyncIteratorPrototype%": he,
  "%Atomics%": typeof Atomics > "u" ? O : Atomics,
  "%BigInt%": typeof BigInt > "u" ? O : BigInt,
  "%BigInt64Array%": typeof BigInt64Array > "u" ? O : BigInt64Array,
  "%BigUint64Array%": typeof BigUint64Array > "u" ? O : BigUint64Array,
  "%Boolean%": Boolean,
  "%DataView%": typeof DataView > "u" ? O : DataView,
  "%Date%": Date,
  "%decodeURI%": decodeURI,
  "%decodeURIComponent%": decodeURIComponent,
  "%encodeURI%": encodeURI,
  "%encodeURIComponent%": encodeURIComponent,
  "%Error%": Qm,
  "%eval%": eval,
  "%EvalError%": Ym,
  "%Float32Array%": typeof Float32Array > "u" ? O : Float32Array,
  "%Float64Array%": typeof Float64Array > "u" ? O : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? O : FinalizationRegistry,
  "%Function%": za,
  "%GeneratorFunction%": he,
  "%Int8Array%": typeof Int8Array > "u" ? O : Int8Array,
  "%Int16Array%": typeof Int16Array > "u" ? O : Int16Array,
  "%Int32Array%": typeof Int32Array > "u" ? O : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": ye && M ? M(M([][Symbol.iterator]())) : O,
  "%JSON%": typeof JSON == "object" ? JSON : O,
  "%Map%": typeof Map > "u" ? O : Map,
  "%MapIteratorPrototype%": typeof Map > "u" || !ye || !M ? O : M((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": Object,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise > "u" ? O : Promise,
  "%Proxy%": typeof Proxy > "u" ? O : Proxy,
  "%RangeError%": Xm,
  "%ReferenceError%": Jm,
  "%Reflect%": typeof Reflect > "u" ? O : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set > "u" ? O : Set,
  "%SetIteratorPrototype%": typeof Set > "u" || !ye || !M ? O : M((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? O : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": ye && M ? M(""[Symbol.iterator]()) : O,
  "%Symbol%": ye ? Symbol : O,
  "%SyntaxError%": $e,
  "%ThrowTypeError%": eb,
  "%TypedArray%": rb,
  "%TypeError%": be,
  "%Uint8Array%": typeof Uint8Array > "u" ? O : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? O : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array > "u" ? O : Uint16Array,
  "%Uint32Array%": typeof Uint32Array > "u" ? O : Uint32Array,
  "%URIError%": Zm,
  "%WeakMap%": typeof WeakMap > "u" ? O : WeakMap,
  "%WeakRef%": typeof WeakRef > "u" ? O : WeakRef,
  "%WeakSet%": typeof WeakSet > "u" ? O : WeakSet
};
if (M)
  try {
    null.error;
  } catch (e) {
    var nb = M(M(e));
    ue["%Error.prototype%"] = nb;
  }
var ab = function e(t) {
  var r;
  if (t === "%AsyncFunction%")
    r = Dt("async function () {}");
  else if (t === "%GeneratorFunction%")
    r = Dt("function* () {}");
  else if (t === "%AsyncGeneratorFunction%")
    r = Dt("async function* () {}");
  else if (t === "%AsyncGenerator%") {
    var n = e("%AsyncGeneratorFunction%");
    n && (r = n.prototype);
  } else if (t === "%AsyncIteratorPrototype%") {
    var a = e("%AsyncGenerator%");
    a && M && (r = M(a.prototype));
  }
  return ue[t] = r, r;
}, Rn = {
  __proto__: null,
  "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
  "%ArrayPrototype%": ["Array", "prototype"],
  "%ArrayProto_entries%": ["Array", "prototype", "entries"],
  "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
  "%ArrayProto_keys%": ["Array", "prototype", "keys"],
  "%ArrayProto_values%": ["Array", "prototype", "values"],
  "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
  "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
  "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
  "%BooleanPrototype%": ["Boolean", "prototype"],
  "%DataViewPrototype%": ["DataView", "prototype"],
  "%DatePrototype%": ["Date", "prototype"],
  "%ErrorPrototype%": ["Error", "prototype"],
  "%EvalErrorPrototype%": ["EvalError", "prototype"],
  "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
  "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
  "%FunctionPrototype%": ["Function", "prototype"],
  "%Generator%": ["GeneratorFunction", "prototype"],
  "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
  "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
  "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
  "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
  "%JSONParse%": ["JSON", "parse"],
  "%JSONStringify%": ["JSON", "stringify"],
  "%MapPrototype%": ["Map", "prototype"],
  "%NumberPrototype%": ["Number", "prototype"],
  "%ObjectPrototype%": ["Object", "prototype"],
  "%ObjProto_toString%": ["Object", "prototype", "toString"],
  "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
  "%PromisePrototype%": ["Promise", "prototype"],
  "%PromiseProto_then%": ["Promise", "prototype", "then"],
  "%Promise_all%": ["Promise", "all"],
  "%Promise_reject%": ["Promise", "reject"],
  "%Promise_resolve%": ["Promise", "resolve"],
  "%RangeErrorPrototype%": ["RangeError", "prototype"],
  "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
  "%RegExpPrototype%": ["RegExp", "prototype"],
  "%SetPrototype%": ["Set", "prototype"],
  "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
  "%StringPrototype%": ["String", "prototype"],
  "%SymbolPrototype%": ["Symbol", "prototype"],
  "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
  "%TypedArrayPrototype%": ["TypedArray", "prototype"],
  "%TypeErrorPrototype%": ["TypeError", "prototype"],
  "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
  "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
  "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
  "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
  "%URIErrorPrototype%": ["URIError", "prototype"],
  "%WeakMapPrototype%": ["WeakMap", "prototype"],
  "%WeakSetPrototype%": ["WeakSet", "prototype"]
}, Qe = _r, ut = Km, ob = Qe.call(Function.call, Array.prototype.concat), ib = Qe.call(Function.apply, Array.prototype.splice), Dn = Qe.call(Function.call, String.prototype.replace), ct = Qe.call(Function.call, String.prototype.slice), sb = Qe.call(Function.call, RegExp.prototype.exec), lb = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, ub = /\\(\\)?/g, cb = function(t) {
  var r = ct(t, 0, 1), n = ct(t, -1);
  if (r === "%" && n !== "%")
    throw new $e("invalid intrinsic syntax, expected closing `%`");
  if (n === "%" && r !== "%")
    throw new $e("invalid intrinsic syntax, expected opening `%`");
  var a = [];
  return Dn(t, lb, function(o, i, s, l) {
    a[a.length] = s ? Dn(l, ub, "$1") : i || o;
  }), a;
}, fb = function(t, r) {
  var n = t, a;
  if (ut(Rn, n) && (a = Rn[n], n = "%" + a[0] + "%"), ut(ue, n)) {
    var o = ue[n];
    if (o === he && (o = ab(n)), typeof o > "u" && !r)
      throw new be("intrinsic " + t + " exists, but is not available. Please file an issue!");
    return {
      alias: a,
      name: n,
      value: o
    };
  }
  throw new $e("intrinsic " + t + " does not exist!");
}, Ce = function(t, r) {
  if (typeof t != "string" || t.length === 0)
    throw new be("intrinsic name must be a non-empty string");
  if (arguments.length > 1 && typeof r != "boolean")
    throw new be('"allowMissing" argument must be a boolean');
  if (sb(/^%?[^%]*%?$/, t) === null)
    throw new $e("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  var n = cb(t), a = n.length > 0 ? n[0] : "", o = fb("%" + a + "%", r), i = o.name, s = o.value, l = !1, u = o.alias;
  u && (a = u[0], ib(n, ob([0, 1], u)));
  for (var c = 1, f = !0; c < n.length; c += 1) {
    var v = n[c], d = ct(v, 0, 1), y = ct(v, -1);
    if ((d === '"' || d === "'" || d === "`" || y === '"' || y === "'" || y === "`") && d !== y)
      throw new $e("property names with quotes must have matching quotes");
    if ((v === "constructor" || !f) && (l = !0), a += "." + v, i = "%" + a + "%", ut(ue, i))
      s = ue[i];
    else if (s != null) {
      if (!(v in s)) {
        if (!r)
          throw new be("base intrinsic for " + t + " exists, but the property is not available.");
        return;
      }
      if (le && c + 1 >= n.length) {
        var g = le(s, v);
        f = !!g, f && "get" in g && !("originalValue" in g.get) ? s = g.get : s = s[v];
      } else
        f = ut(s, v), s = s[v];
      f && !l && (ue[i] = s);
    }
  }
  return s;
}, Ka = { exports: {} }, Lt, Fn;
function $r() {
  if (Fn)
    return Lt;
  Fn = 1;
  var e = Ce, t = e("%Object.defineProperty%", !0) || !1;
  if (t)
    try {
      t({}, "a", { value: 1 });
    } catch {
      t = !1;
    }
  return Lt = t, Lt;
}
var vb = Ce, ot = vb("%Object.getOwnPropertyDescriptor%", !0);
if (ot)
  try {
    ot([], "length");
  } catch {
    ot = null;
  }
var Qa = ot, Ln = $r(), db = Va, ge = Ke, Mn = Qa, pb = function(t, r, n) {
  if (!t || typeof t != "object" && typeof t != "function")
    throw new ge("`obj` must be an object or a function`");
  if (typeof r != "string" && typeof r != "symbol")
    throw new ge("`property` must be a string or a symbol`");
  if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null)
    throw new ge("`nonEnumerable`, if provided, must be a boolean or null");
  if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null)
    throw new ge("`nonWritable`, if provided, must be a boolean or null");
  if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null)
    throw new ge("`nonConfigurable`, if provided, must be a boolean or null");
  if (arguments.length > 6 && typeof arguments[6] != "boolean")
    throw new ge("`loose`, if provided, must be a boolean");
  var a = arguments.length > 3 ? arguments[3] : null, o = arguments.length > 4 ? arguments[4] : null, i = arguments.length > 5 ? arguments[5] : null, s = arguments.length > 6 ? arguments[6] : !1, l = !!Mn && Mn(t, r);
  if (Ln)
    Ln(t, r, {
      configurable: i === null && l ? l.configurable : !i,
      enumerable: a === null && l ? l.enumerable : !a,
      value: n,
      writable: o === null && l ? l.writable : !o
    });
  else if (s || !a && !o && !i)
    t[r] = n;
  else
    throw new db("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
}, Xt = $r(), Ya = function() {
  return !!Xt;
};
Ya.hasArrayLengthDefineBug = function() {
  if (!Xt)
    return null;
  try {
    return Xt([], "length", { value: 1 }).length !== 1;
  } catch {
    return !0;
  }
};
var yb = Ya, gb = Ce, Nn = pb, hb = yb(), jn = Qa, Un = Ke, mb = gb("%Math.floor%"), bb = function(t, r) {
  if (typeof t != "function")
    throw new Un("`fn` is not a function");
  if (typeof r != "number" || r < 0 || r > 4294967295 || mb(r) !== r)
    throw new Un("`length` must be a positive 32-bit integer");
  var n = arguments.length > 2 && !!arguments[2], a = !0, o = !0;
  if ("length" in t && jn) {
    var i = jn(t, "length");
    i && !i.configurable && (a = !1), i && !i.writable && (o = !1);
  }
  return (a || o || !n) && (hb ? Nn(t, "length", r, !0, !0) : Nn(t, "length", r)), t;
};
(function(e) {
  var t = _r, r = Ce, n = bb, a = Ke, o = r("%Function.prototype.apply%"), i = r("%Function.prototype.call%"), s = r("%Reflect.apply%", !0) || t.call(i, o), l = $r(), u = r("%Math.max%");
  e.exports = function(v) {
    if (typeof v != "function")
      throw new a("a function is required");
    var d = s(t, i, arguments);
    return n(
      d,
      1 + u(0, v.length - (arguments.length - 1)),
      !0
    );
  };
  var c = function() {
    return s(t, o, arguments);
  };
  l ? l(e.exports, "apply", { value: c }) : e.exports.apply = c;
})(Ka);
var Xa = Ce, Ja = Ka.exports, _b = Ja(Xa("String.prototype.indexOf")), $b = function(t, r) {
  var n = Xa(t, !!r);
  return typeof n == "function" && _b(t, ".prototype.") > -1 ? Ja(n) : n;
};
const Sb = {}, wb = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Sb
}, Symbol.toStringTag, { value: "Module" })), Eb = /* @__PURE__ */ To(wb);
var Sr = typeof Map == "function" && Map.prototype, Mt = Object.getOwnPropertyDescriptor && Sr ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, ft = Sr && Mt && typeof Mt.get == "function" ? Mt.get : null, Bn = Sr && Map.prototype.forEach, wr = typeof Set == "function" && Set.prototype, Nt = Object.getOwnPropertyDescriptor && wr ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, vt = wr && Nt && typeof Nt.get == "function" ? Nt.get : null, Gn = wr && Set.prototype.forEach, Ob = typeof WeakMap == "function" && WeakMap.prototype, je = Ob ? WeakMap.prototype.has : null, Ab = typeof WeakSet == "function" && WeakSet.prototype, Ue = Ab ? WeakSet.prototype.has : null, Tb = typeof WeakRef == "function" && WeakRef.prototype, Hn = Tb ? WeakRef.prototype.deref : null, Pb = Boolean.prototype.valueOf, Ib = Object.prototype.toString, Cb = Function.prototype.toString, xb = String.prototype.match, Er = String.prototype.slice, ee = String.prototype.replace, Rb = String.prototype.toUpperCase, qn = String.prototype.toLowerCase, Za = RegExp.prototype.test, Wn = Array.prototype.concat, Y = Array.prototype.join, Db = Array.prototype.slice, kn = Math.floor, Jt = typeof BigInt == "function" ? BigInt.prototype.valueOf : null, jt = Object.getOwnPropertySymbols, Zt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null, Se = typeof Symbol == "function" && typeof Symbol.iterator == "object", B = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === Se ? "object" : "symbol") ? Symbol.toStringTag : null, eo = Object.prototype.propertyIsEnumerable, Vn = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(e) {
  return e.__proto__;
} : null);
function zn(e, t) {
  if (e === 1 / 0 || e === -1 / 0 || e !== e || e && e > -1e3 && e < 1e3 || Za.call(/e/, t))
    return t;
  var r = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
  if (typeof e == "number") {
    var n = e < 0 ? -kn(-e) : kn(e);
    if (n !== e) {
      var a = String(n), o = Er.call(t, a.length + 1);
      return ee.call(a, r, "$&_") + "." + ee.call(ee.call(o, /([0-9]{3})/g, "$&_"), /_$/, "");
    }
  }
  return ee.call(t, r, "$&_");
}
var er = Eb, Kn = er.custom, Qn = ro(Kn) ? Kn : null, Fb = function e(t, r, n, a) {
  var o = r || {};
  if (Z(o, "quoteStyle") && o.quoteStyle !== "single" && o.quoteStyle !== "double")
    throw new TypeError('option "quoteStyle" must be "single" or "double"');
  if (Z(o, "maxStringLength") && (typeof o.maxStringLength == "number" ? o.maxStringLength < 0 && o.maxStringLength !== 1 / 0 : o.maxStringLength !== null))
    throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
  var i = Z(o, "customInspect") ? o.customInspect : !0;
  if (typeof i != "boolean" && i !== "symbol")
    throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
  if (Z(o, "indent") && o.indent !== null && o.indent !== "	" && !(parseInt(o.indent, 10) === o.indent && o.indent > 0))
    throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
  if (Z(o, "numericSeparator") && typeof o.numericSeparator != "boolean")
    throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
  var s = o.numericSeparator;
  if (typeof t > "u")
    return "undefined";
  if (t === null)
    return "null";
  if (typeof t == "boolean")
    return t ? "true" : "false";
  if (typeof t == "string")
    return ao(t, o);
  if (typeof t == "number") {
    if (t === 0)
      return 1 / 0 / t > 0 ? "0" : "-0";
    var l = String(t);
    return s ? zn(t, l) : l;
  }
  if (typeof t == "bigint") {
    var u = String(t) + "n";
    return s ? zn(t, u) : u;
  }
  var c = typeof o.depth > "u" ? 5 : o.depth;
  if (typeof n > "u" && (n = 0), n >= c && c > 0 && typeof t == "object")
    return tr(t) ? "[Array]" : "[Object]";
  var f = Jb(o, n);
  if (typeof a > "u")
    a = [];
  else if (no(a, t) >= 0)
    return "[Circular]";
  function v(k, ve, Ye) {
    if (ve && (a = Db.call(a), a.push(ve)), Ye) {
      var de = {
        depth: o.depth
      };
      return Z(o, "quoteStyle") && (de.quoteStyle = o.quoteStyle), e(k, de, n + 1, a);
    }
    return e(k, o, n + 1, a);
  }
  if (typeof t == "function" && !Yn(t)) {
    var d = qb(t), y = et(t, v);
    return "[Function" + (d ? ": " + d : " (anonymous)") + "]" + (y.length > 0 ? " { " + Y.call(y, ", ") + " }" : "");
  }
  if (ro(t)) {
    var g = Se ? ee.call(String(t), /^(Symbol\(.*\))_[^)]*$/, "$1") : Zt.call(t);
    return typeof t == "object" && !Se ? Fe(g) : g;
  }
  if (Qb(t)) {
    for (var h = "<" + qn.call(String(t.nodeName)), p = t.attributes || [], $ = 0; $ < p.length; $++)
      h += " " + p[$].name + "=" + to(Lb(p[$].value), "double", o);
    return h += ">", t.childNodes && t.childNodes.length && (h += "..."), h += "</" + qn.call(String(t.nodeName)) + ">", h;
  }
  if (tr(t)) {
    if (t.length === 0)
      return "[]";
    var E = et(t, v);
    return f && !Xb(E) ? "[" + rr(E, f) + "]" : "[ " + Y.call(E, ", ") + " ]";
  }
  if (Nb(t)) {
    var w = et(t, v);
    return !("cause" in Error.prototype) && "cause" in t && !eo.call(t, "cause") ? "{ [" + String(t) + "] " + Y.call(Wn.call("[cause]: " + v(t.cause), w), ", ") + " }" : w.length === 0 ? "[" + String(t) + "]" : "{ [" + String(t) + "] " + Y.call(w, ", ") + " }";
  }
  if (typeof t == "object" && i) {
    if (Qn && typeof t[Qn] == "function" && er)
      return er(t, { depth: c - n });
    if (i !== "symbol" && typeof t.inspect == "function")
      return t.inspect();
  }
  if (Wb(t)) {
    var b = [];
    return Bn && Bn.call(t, function(k, ve) {
      b.push(v(ve, t, !0) + " => " + v(k, t));
    }), Xn("Map", ft.call(t), b, f);
  }
  if (zb(t)) {
    var _ = [];
    return Gn && Gn.call(t, function(k) {
      _.push(v(k, t));
    }), Xn("Set", vt.call(t), _, f);
  }
  if (kb(t))
    return Ut("WeakMap");
  if (Kb(t))
    return Ut("WeakSet");
  if (Vb(t))
    return Ut("WeakRef");
  if (Ub(t))
    return Fe(v(Number(t)));
  if (Gb(t))
    return Fe(v(Jt.call(t)));
  if (Bb(t))
    return Fe(Pb.call(t));
  if (jb(t))
    return Fe(v(String(t)));
  if (typeof window < "u" && t === window)
    return "{ [object Window] }";
  if (t === Le)
    return "{ [object globalThis] }";
  if (!Mb(t) && !Yn(t)) {
    var T = et(t, v), I = Vn ? Vn(t) === Object.prototype : t instanceof Object || t.constructor === Object, D = t instanceof Object ? "" : "null prototype", C = !I && B && Object(t) === t && B in t ? Er.call(re(t), 8, -1) : D ? "Object" : "", q = I || typeof t.constructor != "function" ? "" : t.constructor.name ? t.constructor.name + " " : "", G = q + (C || D ? "[" + Y.call(Wn.call([], C || [], D || []), ": ") + "] " : "");
    return T.length === 0 ? G + "{}" : f ? G + "{" + rr(T, f) + "}" : G + "{ " + Y.call(T, ", ") + " }";
  }
  return String(t);
};
function to(e, t, r) {
  var n = (r.quoteStyle || t) === "double" ? '"' : "'";
  return n + e + n;
}
function Lb(e) {
  return ee.call(String(e), /"/g, "&quot;");
}
function tr(e) {
  return re(e) === "[object Array]" && (!B || !(typeof e == "object" && B in e));
}
function Mb(e) {
  return re(e) === "[object Date]" && (!B || !(typeof e == "object" && B in e));
}
function Yn(e) {
  return re(e) === "[object RegExp]" && (!B || !(typeof e == "object" && B in e));
}
function Nb(e) {
  return re(e) === "[object Error]" && (!B || !(typeof e == "object" && B in e));
}
function jb(e) {
  return re(e) === "[object String]" && (!B || !(typeof e == "object" && B in e));
}
function Ub(e) {
  return re(e) === "[object Number]" && (!B || !(typeof e == "object" && B in e));
}
function Bb(e) {
  return re(e) === "[object Boolean]" && (!B || !(typeof e == "object" && B in e));
}
function ro(e) {
  if (Se)
    return e && typeof e == "object" && e instanceof Symbol;
  if (typeof e == "symbol")
    return !0;
  if (!e || typeof e != "object" || !Zt)
    return !1;
  try {
    return Zt.call(e), !0;
  } catch {
  }
  return !1;
}
function Gb(e) {
  if (!e || typeof e != "object" || !Jt)
    return !1;
  try {
    return Jt.call(e), !0;
  } catch {
  }
  return !1;
}
var Hb = Object.prototype.hasOwnProperty || function(e) {
  return e in this;
};
function Z(e, t) {
  return Hb.call(e, t);
}
function re(e) {
  return Ib.call(e);
}
function qb(e) {
  if (e.name)
    return e.name;
  var t = xb.call(Cb.call(e), /^function\s*([\w$]+)/);
  return t ? t[1] : null;
}
function no(e, t) {
  if (e.indexOf)
    return e.indexOf(t);
  for (var r = 0, n = e.length; r < n; r++)
    if (e[r] === t)
      return r;
  return -1;
}
function Wb(e) {
  if (!ft || !e || typeof e != "object")
    return !1;
  try {
    ft.call(e);
    try {
      vt.call(e);
    } catch {
      return !0;
    }
    return e instanceof Map;
  } catch {
  }
  return !1;
}
function kb(e) {
  if (!je || !e || typeof e != "object")
    return !1;
  try {
    je.call(e, je);
    try {
      Ue.call(e, Ue);
    } catch {
      return !0;
    }
    return e instanceof WeakMap;
  } catch {
  }
  return !1;
}
function Vb(e) {
  if (!Hn || !e || typeof e != "object")
    return !1;
  try {
    return Hn.call(e), !0;
  } catch {
  }
  return !1;
}
function zb(e) {
  if (!vt || !e || typeof e != "object")
    return !1;
  try {
    vt.call(e);
    try {
      ft.call(e);
    } catch {
      return !0;
    }
    return e instanceof Set;
  } catch {
  }
  return !1;
}
function Kb(e) {
  if (!Ue || !e || typeof e != "object")
    return !1;
  try {
    Ue.call(e, Ue);
    try {
      je.call(e, je);
    } catch {
      return !0;
    }
    return e instanceof WeakSet;
  } catch {
  }
  return !1;
}
function Qb(e) {
  return !e || typeof e != "object" ? !1 : typeof HTMLElement < "u" && e instanceof HTMLElement ? !0 : typeof e.nodeName == "string" && typeof e.getAttribute == "function";
}
function ao(e, t) {
  if (e.length > t.maxStringLength) {
    var r = e.length - t.maxStringLength, n = "... " + r + " more character" + (r > 1 ? "s" : "");
    return ao(Er.call(e, 0, t.maxStringLength), t) + n;
  }
  var a = ee.call(ee.call(e, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, Yb);
  return to(a, "single", t);
}
function Yb(e) {
  var t = e.charCodeAt(0), r = {
    8: "b",
    9: "t",
    10: "n",
    12: "f",
    13: "r"
  }[t];
  return r ? "\\" + r : "\\x" + (t < 16 ? "0" : "") + Rb.call(t.toString(16));
}
function Fe(e) {
  return "Object(" + e + ")";
}
function Ut(e) {
  return e + " { ? }";
}
function Xn(e, t, r, n) {
  var a = n ? rr(r, n) : Y.call(r, ", ");
  return e + " (" + t + ") {" + a + "}";
}
function Xb(e) {
  for (var t = 0; t < e.length; t++)
    if (no(e[t], `
`) >= 0)
      return !1;
  return !0;
}
function Jb(e, t) {
  var r;
  if (e.indent === "	")
    r = "	";
  else if (typeof e.indent == "number" && e.indent > 0)
    r = Y.call(Array(e.indent + 1), " ");
  else
    return null;
  return {
    base: r,
    prev: Y.call(Array(t + 1), r)
  };
}
function rr(e, t) {
  if (e.length === 0)
    return "";
  var r = `
` + t.prev + t.base;
  return r + Y.call(e, "," + r) + `
` + t.prev;
}
function et(e, t) {
  var r = tr(e), n = [];
  if (r) {
    n.length = e.length;
    for (var a = 0; a < e.length; a++)
      n[a] = Z(e, a) ? t(e[a], e) : "";
  }
  var o = typeof jt == "function" ? jt(e) : [], i;
  if (Se) {
    i = {};
    for (var s = 0; s < o.length; s++)
      i["$" + o[s]] = o[s];
  }
  for (var l in e)
    !Z(e, l) || r && String(Number(l)) === l && l < e.length || Se && i["$" + l] instanceof Symbol || (Za.call(/[^\w$]/, l) ? n.push(t(l, e) + ": " + t(e[l], e)) : n.push(l + ": " + t(e[l], e)));
  if (typeof jt == "function")
    for (var u = 0; u < o.length; u++)
      eo.call(e, o[u]) && n.push("[" + t(o[u]) + "]: " + t(e[o[u]], e));
  return n;
}
var oo = Ce, xe = $b, Zb = Fb, e_ = Ke, tt = oo("%WeakMap%", !0), rt = oo("%Map%", !0), t_ = xe("WeakMap.prototype.get", !0), r_ = xe("WeakMap.prototype.set", !0), n_ = xe("WeakMap.prototype.has", !0), a_ = xe("Map.prototype.get", !0), o_ = xe("Map.prototype.set", !0), i_ = xe("Map.prototype.has", !0), Or = function(e, t) {
  for (var r = e, n; (n = r.next) !== null; r = n)
    if (n.key === t)
      return r.next = n.next, n.next = e.next, e.next = n, n;
}, s_ = function(e, t) {
  var r = Or(e, t);
  return r && r.value;
}, l_ = function(e, t, r) {
  var n = Or(e, t);
  n ? n.value = r : e.next = {
    key: t,
    next: e.next,
    value: r
  };
}, u_ = function(e, t) {
  return !!Or(e, t);
}, c_ = function() {
  var t, r, n, a = {
    assert: function(o) {
      if (!a.has(o))
        throw new e_("Side channel does not contain " + Zb(o));
    },
    get: function(o) {
      if (tt && o && (typeof o == "object" || typeof o == "function")) {
        if (t)
          return t_(t, o);
      } else if (rt) {
        if (r)
          return a_(r, o);
      } else if (n)
        return s_(n, o);
    },
    has: function(o) {
      if (tt && o && (typeof o == "object" || typeof o == "function")) {
        if (t)
          return n_(t, o);
      } else if (rt) {
        if (r)
          return i_(r, o);
      } else if (n)
        return u_(n, o);
      return !1;
    },
    set: function(o, i) {
      tt && o && (typeof o == "object" || typeof o == "function") ? (t || (t = new tt()), r_(t, o, i)) : rt ? (r || (r = new rt()), o_(r, o, i)) : (n || (n = { key: {}, next: null }), l_(n, o, i));
    }
  };
  return a;
}, f_ = String.prototype.replace, v_ = /%20/g, Bt = {
  RFC1738: "RFC1738",
  RFC3986: "RFC3986"
}, Ar = {
  default: Bt.RFC3986,
  formatters: {
    RFC1738: function(e) {
      return f_.call(e, v_, "+");
    },
    RFC3986: function(e) {
      return String(e);
    }
  },
  RFC1738: Bt.RFC1738,
  RFC3986: Bt.RFC3986
}, d_ = Ar, Gt = Object.prototype.hasOwnProperty, ie = Array.isArray, Q = function() {
  for (var e = [], t = 0; t < 256; ++t)
    e.push("%" + ((t < 16 ? "0" : "") + t.toString(16)).toUpperCase());
  return e;
}(), p_ = function(t) {
  for (; t.length > 1; ) {
    var r = t.pop(), n = r.obj[r.prop];
    if (ie(n)) {
      for (var a = [], o = 0; o < n.length; ++o)
        typeof n[o] < "u" && a.push(n[o]);
      r.obj[r.prop] = a;
    }
  }
}, io = function(t, r) {
  for (var n = r && r.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, a = 0; a < t.length; ++a)
    typeof t[a] < "u" && (n[a] = t[a]);
  return n;
}, y_ = function e(t, r, n) {
  if (!r)
    return t;
  if (typeof r != "object") {
    if (ie(t))
      t.push(r);
    else if (t && typeof t == "object")
      (n && (n.plainObjects || n.allowPrototypes) || !Gt.call(Object.prototype, r)) && (t[r] = !0);
    else
      return [t, r];
    return t;
  }
  if (!t || typeof t != "object")
    return [t].concat(r);
  var a = t;
  return ie(t) && !ie(r) && (a = io(t, n)), ie(t) && ie(r) ? (r.forEach(function(o, i) {
    if (Gt.call(t, i)) {
      var s = t[i];
      s && typeof s == "object" && o && typeof o == "object" ? t[i] = e(s, o, n) : t.push(o);
    } else
      t[i] = o;
  }), t) : Object.keys(r).reduce(function(o, i) {
    var s = r[i];
    return Gt.call(o, i) ? o[i] = e(o[i], s, n) : o[i] = s, o;
  }, a);
}, g_ = function(t, r) {
  return Object.keys(r).reduce(function(n, a) {
    return n[a] = r[a], n;
  }, t);
}, h_ = function(e, t, r) {
  var n = e.replace(/\+/g, " ");
  if (r === "iso-8859-1")
    return n.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(n);
  } catch {
    return n;
  }
}, m_ = function(t, r, n, a, o) {
  if (t.length === 0)
    return t;
  var i = t;
  if (typeof t == "symbol" ? i = Symbol.prototype.toString.call(t) : typeof t != "string" && (i = String(t)), n === "iso-8859-1")
    return escape(i).replace(/%u[0-9a-f]{4}/gi, function(c) {
      return "%26%23" + parseInt(c.slice(2), 16) + "%3B";
    });
  for (var s = "", l = 0; l < i.length; ++l) {
    var u = i.charCodeAt(l);
    if (u === 45 || u === 46 || u === 95 || u === 126 || u >= 48 && u <= 57 || u >= 65 && u <= 90 || u >= 97 && u <= 122 || o === d_.RFC1738 && (u === 40 || u === 41)) {
      s += i.charAt(l);
      continue;
    }
    if (u < 128) {
      s = s + Q[u];
      continue;
    }
    if (u < 2048) {
      s = s + (Q[192 | u >> 6] + Q[128 | u & 63]);
      continue;
    }
    if (u < 55296 || u >= 57344) {
      s = s + (Q[224 | u >> 12] + Q[128 | u >> 6 & 63] + Q[128 | u & 63]);
      continue;
    }
    l += 1, u = 65536 + ((u & 1023) << 10 | i.charCodeAt(l) & 1023), s += Q[240 | u >> 18] + Q[128 | u >> 12 & 63] + Q[128 | u >> 6 & 63] + Q[128 | u & 63];
  }
  return s;
}, b_ = function(t) {
  for (var r = [{ obj: { o: t }, prop: "o" }], n = [], a = 0; a < r.length; ++a)
    for (var o = r[a], i = o.obj[o.prop], s = Object.keys(i), l = 0; l < s.length; ++l) {
      var u = s[l], c = i[u];
      typeof c == "object" && c !== null && n.indexOf(c) === -1 && (r.push({ obj: i, prop: u }), n.push(c));
    }
  return p_(r), t;
}, __ = function(t) {
  return Object.prototype.toString.call(t) === "[object RegExp]";
}, $_ = function(t) {
  return !t || typeof t != "object" ? !1 : !!(t.constructor && t.constructor.isBuffer && t.constructor.isBuffer(t));
}, S_ = function(t, r) {
  return [].concat(t, r);
}, w_ = function(t, r) {
  if (ie(t)) {
    for (var n = [], a = 0; a < t.length; a += 1)
      n.push(r(t[a]));
    return n;
  }
  return r(t);
}, so = {
  arrayToObject: io,
  assign: g_,
  combine: S_,
  compact: b_,
  decode: h_,
  encode: m_,
  isBuffer: $_,
  isRegExp: __,
  maybeMap: w_,
  merge: y_
}, lo = c_, it = so, Be = Ar, E_ = Object.prototype.hasOwnProperty, Jn = {
  brackets: function(t) {
    return t + "[]";
  },
  comma: "comma",
  indices: function(t, r) {
    return t + "[" + r + "]";
  },
  repeat: function(t) {
    return t;
  }
}, X = Array.isArray, O_ = Array.prototype.push, uo = function(e, t) {
  O_.apply(e, X(t) ? t : [t]);
}, A_ = Date.prototype.toISOString, Zn = Be.default, U = {
  addQueryPrefix: !1,
  allowDots: !1,
  charset: "utf-8",
  charsetSentinel: !1,
  delimiter: "&",
  encode: !0,
  encoder: it.encode,
  encodeValuesOnly: !1,
  format: Zn,
  formatter: Be.formatters[Zn],
  indices: !1,
  serializeDate: function(t) {
    return A_.call(t);
  },
  skipNulls: !1,
  strictNullHandling: !1
}, T_ = function(t) {
  return typeof t == "string" || typeof t == "number" || typeof t == "boolean" || typeof t == "symbol" || typeof t == "bigint";
}, Ht = {}, P_ = function e(t, r, n, a, o, i, s, l, u, c, f, v, d, y, g, h) {
  for (var p = t, $ = h, E = 0, w = !1; ($ = $.get(Ht)) !== void 0 && !w; ) {
    var b = $.get(t);
    if (E += 1, typeof b < "u") {
      if (b === E)
        throw new RangeError("Cyclic object value");
      w = !0;
    }
    typeof $.get(Ht) > "u" && (E = 0);
  }
  if (typeof l == "function" ? p = l(r, p) : p instanceof Date ? p = f(p) : n === "comma" && X(p) && (p = it.maybeMap(p, function(de) {
    return de instanceof Date ? f(de) : de;
  })), p === null) {
    if (o)
      return s && !y ? s(r, U.encoder, g, "key", v) : r;
    p = "";
  }
  if (T_(p) || it.isBuffer(p)) {
    if (s) {
      var _ = y ? r : s(r, U.encoder, g, "key", v);
      return [d(_) + "=" + d(s(p, U.encoder, g, "value", v))];
    }
    return [d(r) + "=" + d(String(p))];
  }
  var T = [];
  if (typeof p > "u")
    return T;
  var I;
  if (n === "comma" && X(p))
    y && s && (p = it.maybeMap(p, s)), I = [{ value: p.length > 0 ? p.join(",") || null : void 0 }];
  else if (X(l))
    I = l;
  else {
    var D = Object.keys(p);
    I = u ? D.sort(u) : D;
  }
  for (var C = a && X(p) && p.length === 1 ? r + "[]" : r, q = 0; q < I.length; ++q) {
    var G = I[q], k = typeof G == "object" && typeof G.value < "u" ? G.value : p[G];
    if (!(i && k === null)) {
      var ve = X(p) ? typeof n == "function" ? n(C, G) : C : C + (c ? "." + G : "[" + G + "]");
      h.set(t, E);
      var Ye = lo();
      Ye.set(Ht, h), uo(T, e(
        k,
        ve,
        n,
        a,
        o,
        i,
        n === "comma" && y && X(p) ? null : s,
        l,
        u,
        c,
        f,
        v,
        d,
        y,
        g,
        Ye
      ));
    }
  }
  return T;
}, I_ = function(t) {
  if (!t)
    return U;
  if (t.encoder !== null && typeof t.encoder < "u" && typeof t.encoder != "function")
    throw new TypeError("Encoder has to be a function.");
  var r = t.charset || U.charset;
  if (typeof t.charset < "u" && t.charset !== "utf-8" && t.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var n = Be.default;
  if (typeof t.format < "u") {
    if (!E_.call(Be.formatters, t.format))
      throw new TypeError("Unknown format option provided.");
    n = t.format;
  }
  var a = Be.formatters[n], o = U.filter;
  return (typeof t.filter == "function" || X(t.filter)) && (o = t.filter), {
    addQueryPrefix: typeof t.addQueryPrefix == "boolean" ? t.addQueryPrefix : U.addQueryPrefix,
    allowDots: typeof t.allowDots > "u" ? U.allowDots : !!t.allowDots,
    charset: r,
    charsetSentinel: typeof t.charsetSentinel == "boolean" ? t.charsetSentinel : U.charsetSentinel,
    delimiter: typeof t.delimiter > "u" ? U.delimiter : t.delimiter,
    encode: typeof t.encode == "boolean" ? t.encode : U.encode,
    encoder: typeof t.encoder == "function" ? t.encoder : U.encoder,
    encodeValuesOnly: typeof t.encodeValuesOnly == "boolean" ? t.encodeValuesOnly : U.encodeValuesOnly,
    filter: o,
    format: n,
    formatter: a,
    serializeDate: typeof t.serializeDate == "function" ? t.serializeDate : U.serializeDate,
    skipNulls: typeof t.skipNulls == "boolean" ? t.skipNulls : U.skipNulls,
    sort: typeof t.sort == "function" ? t.sort : null,
    strictNullHandling: typeof t.strictNullHandling == "boolean" ? t.strictNullHandling : U.strictNullHandling
  };
}, C_ = function(e, t) {
  var r = e, n = I_(t), a, o;
  typeof n.filter == "function" ? (o = n.filter, r = o("", r)) : X(n.filter) && (o = n.filter, a = o);
  var i = [];
  if (typeof r != "object" || r === null)
    return "";
  var s;
  t && t.arrayFormat in Jn ? s = t.arrayFormat : t && "indices" in t ? s = t.indices ? "indices" : "repeat" : s = "indices";
  var l = Jn[s];
  if (t && "commaRoundTrip" in t && typeof t.commaRoundTrip != "boolean")
    throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
  var u = l === "comma" && t && t.commaRoundTrip;
  a || (a = Object.keys(r)), n.sort && a.sort(n.sort);
  for (var c = lo(), f = 0; f < a.length; ++f) {
    var v = a[f];
    n.skipNulls && r[v] === null || uo(i, P_(
      r[v],
      v,
      l,
      u,
      n.strictNullHandling,
      n.skipNulls,
      n.encode ? n.encoder : null,
      n.filter,
      n.sort,
      n.allowDots,
      n.serializeDate,
      n.format,
      n.formatter,
      n.encodeValuesOnly,
      n.charset,
      c
    ));
  }
  var d = i.join(n.delimiter), y = n.addQueryPrefix === !0 ? "?" : "";
  return n.charsetSentinel && (n.charset === "iso-8859-1" ? y += "utf8=%26%2310003%3B&" : y += "utf8=%E2%9C%93&"), d.length > 0 ? y + d : "";
}, we = so, nr = Object.prototype.hasOwnProperty, x_ = Array.isArray, L = {
  allowDots: !1,
  allowPrototypes: !1,
  allowSparse: !1,
  arrayLimit: 20,
  charset: "utf-8",
  charsetSentinel: !1,
  comma: !1,
  decoder: we.decode,
  delimiter: "&",
  depth: 5,
  ignoreQueryPrefix: !1,
  interpretNumericEntities: !1,
  parameterLimit: 1e3,
  parseArrays: !0,
  plainObjects: !1,
  strictNullHandling: !1
}, R_ = function(e) {
  return e.replace(/&#(\d+);/g, function(t, r) {
    return String.fromCharCode(parseInt(r, 10));
  });
}, co = function(e, t) {
  return e && typeof e == "string" && t.comma && e.indexOf(",") > -1 ? e.split(",") : e;
}, D_ = "utf8=%26%2310003%3B", F_ = "utf8=%E2%9C%93", L_ = function(t, r) {
  var n = { __proto__: null }, a = r.ignoreQueryPrefix ? t.replace(/^\?/, "") : t, o = r.parameterLimit === 1 / 0 ? void 0 : r.parameterLimit, i = a.split(r.delimiter, o), s = -1, l, u = r.charset;
  if (r.charsetSentinel)
    for (l = 0; l < i.length; ++l)
      i[l].indexOf("utf8=") === 0 && (i[l] === F_ ? u = "utf-8" : i[l] === D_ && (u = "iso-8859-1"), s = l, l = i.length);
  for (l = 0; l < i.length; ++l)
    if (l !== s) {
      var c = i[l], f = c.indexOf("]="), v = f === -1 ? c.indexOf("=") : f + 1, d, y;
      v === -1 ? (d = r.decoder(c, L.decoder, u, "key"), y = r.strictNullHandling ? null : "") : (d = r.decoder(c.slice(0, v), L.decoder, u, "key"), y = we.maybeMap(
        co(c.slice(v + 1), r),
        function(g) {
          return r.decoder(g, L.decoder, u, "value");
        }
      )), y && r.interpretNumericEntities && u === "iso-8859-1" && (y = R_(y)), c.indexOf("[]=") > -1 && (y = x_(y) ? [y] : y), nr.call(n, d) ? n[d] = we.combine(n[d], y) : n[d] = y;
    }
  return n;
}, M_ = function(e, t, r, n) {
  for (var a = n ? t : co(t, r), o = e.length - 1; o >= 0; --o) {
    var i, s = e[o];
    if (s === "[]" && r.parseArrays)
      i = [].concat(a);
    else {
      i = r.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      var l = s.charAt(0) === "[" && s.charAt(s.length - 1) === "]" ? s.slice(1, -1) : s, u = parseInt(l, 10);
      !r.parseArrays && l === "" ? i = { 0: a } : !isNaN(u) && s !== l && String(u) === l && u >= 0 && r.parseArrays && u <= r.arrayLimit ? (i = [], i[u] = a) : l !== "__proto__" && (i[l] = a);
    }
    a = i;
  }
  return a;
}, N_ = function(t, r, n, a) {
  if (!!t) {
    var o = n.allowDots ? t.replace(/\.([^.[]+)/g, "[$1]") : t, i = /(\[[^[\]]*])/, s = /(\[[^[\]]*])/g, l = n.depth > 0 && i.exec(o), u = l ? o.slice(0, l.index) : o, c = [];
    if (u) {
      if (!n.plainObjects && nr.call(Object.prototype, u) && !n.allowPrototypes)
        return;
      c.push(u);
    }
    for (var f = 0; n.depth > 0 && (l = s.exec(o)) !== null && f < n.depth; ) {
      if (f += 1, !n.plainObjects && nr.call(Object.prototype, l[1].slice(1, -1)) && !n.allowPrototypes)
        return;
      c.push(l[1]);
    }
    return l && c.push("[" + o.slice(l.index) + "]"), M_(c, r, n, a);
  }
}, j_ = function(t) {
  if (!t)
    return L;
  if (t.decoder !== null && t.decoder !== void 0 && typeof t.decoder != "function")
    throw new TypeError("Decoder has to be a function.");
  if (typeof t.charset < "u" && t.charset !== "utf-8" && t.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var r = typeof t.charset > "u" ? L.charset : t.charset;
  return {
    allowDots: typeof t.allowDots > "u" ? L.allowDots : !!t.allowDots,
    allowPrototypes: typeof t.allowPrototypes == "boolean" ? t.allowPrototypes : L.allowPrototypes,
    allowSparse: typeof t.allowSparse == "boolean" ? t.allowSparse : L.allowSparse,
    arrayLimit: typeof t.arrayLimit == "number" ? t.arrayLimit : L.arrayLimit,
    charset: r,
    charsetSentinel: typeof t.charsetSentinel == "boolean" ? t.charsetSentinel : L.charsetSentinel,
    comma: typeof t.comma == "boolean" ? t.comma : L.comma,
    decoder: typeof t.decoder == "function" ? t.decoder : L.decoder,
    delimiter: typeof t.delimiter == "string" || we.isRegExp(t.delimiter) ? t.delimiter : L.delimiter,
    depth: typeof t.depth == "number" || t.depth === !1 ? +t.depth : L.depth,
    ignoreQueryPrefix: t.ignoreQueryPrefix === !0,
    interpretNumericEntities: typeof t.interpretNumericEntities == "boolean" ? t.interpretNumericEntities : L.interpretNumericEntities,
    parameterLimit: typeof t.parameterLimit == "number" ? t.parameterLimit : L.parameterLimit,
    parseArrays: t.parseArrays !== !1,
    plainObjects: typeof t.plainObjects == "boolean" ? t.plainObjects : L.plainObjects,
    strictNullHandling: typeof t.strictNullHandling == "boolean" ? t.strictNullHandling : L.strictNullHandling
  };
}, U_ = function(e, t) {
  var r = j_(t);
  if (e === "" || e === null || typeof e > "u")
    return r.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var n = typeof e == "string" ? L_(e, r) : e, a = r.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, o = Object.keys(n), i = 0; i < o.length; ++i) {
    var s = o[i], l = N_(s, n[s], r, typeof e == "string");
    a = we.merge(a, l, r);
  }
  return r.allowSparse === !0 ? a : we.compact(a);
}, B_ = C_, G_ = U_, H_ = Ar, fo = {
  formats: H_,
  parse: G_,
  stringify: B_
};
function q_(e) {
  return fo.stringify(e);
}
function W_(e, t) {
  return fo.parse(e, {
    arrayLimit: 1e4,
    decoder(r, n, a) {
      const o = r.replace(/\+/g, " ");
      if (a === "iso-8859-1")
        return o.replace(/%[0-9a-f]{2}/gi, unescape);
      if (t && /^[+-]?\d+(\.\d+)?$/.test(r))
        return parseFloat(r);
      const i = {
        true: !0,
        false: !1,
        null: null,
        undefined: void 0
      };
      if (r in i)
        return i[r];
      try {
        return decodeURIComponent(o);
      } catch {
        return o;
      }
    }
  });
}
function x1(e, t) {
  var r;
  const n = t != null && t.routerPush ? t.routerPush : (f) => location.hash = f, { localStorageKey: a, detectNumber: o = !0 } = t != null ? t : {}, [i, s] = location.hash.slice(1).split("?"), l = (r = ua(e) ? e() : e) != null ? r : {}, u = a ? fa(a, {
    defaultValue: l
  })[0] : m(l), c = m();
  if (R(() => {
    c.value = u.value;
  }), s)
    try {
      const f = W_(s, o);
      c.value = {
        ...l,
        ...c.value,
        ...f
      };
    } catch {
      c.value = l;
    }
  if (e && Object.keys(e).length) {
    const f = { ...e };
    if (c.value)
      for (const v in f)
        v in c.value && (f[v] = c.value[v]);
    c.value = f;
  }
  return H(
    c,
    () => {
      if (c.value) {
        const f = q_(c.value);
        n(`${i}?${f}`);
      }
    },
    {
      deep: !0,
      immediate: !0
    }
  ), c;
}
const R1 = (e, t) => {
  const r = m(), { wrapperTarget: n, itemHeight: a, overscan: o = 5 } = t, i = Sm(r), s = m([]), l = m(!1), u = (h, p) => {
    if (typeof a == "number")
      return Math.ceil(h / a);
    let $ = 0, E = 0;
    for (let w = p; w < e.value.length; w++) {
      const b = a(w, e.value[w]);
      if ($ += b, E = w, $ >= h)
        break;
    }
    return E - p;
  }, c = (h) => {
    if (typeof a == "number")
      return Math.floor(h / a) + 1;
    let p = 0, $ = 0;
    for (let E = 0; E < e.value.length; E++) {
      const w = a(E, e.value[E]);
      if (p += w, p >= h) {
        $ = E;
        break;
      }
    }
    return $ + 1;
  }, f = (h) => {
    var p, $;
    return typeof a == "number" ? h * a : ($ = (p = e.value) == null ? void 0 : p.slice(0, h)) == null ? void 0 : $.reduce((w, b, _) => w + (a == null ? void 0 : a(_, e == null ? void 0 : e.value[h])), 0);
  }, v = j(() => typeof a == "number" ? e.value.length * a : e.value.reduce(
    (h, p, $) => h + (a == null ? void 0 : a($, e == null ? void 0 : e.value[$])),
    0
  )), d = () => {
    const h = x(r), p = x(n);
    if (h && p) {
      const { scrollTop: $, clientHeight: E } = h, w = c($), b = u(E, w), _ = Math.max(0, w - o), T = Math.min(e.value.length, w + b + o), I = f(_);
      p.style.height = v.value - I + "px", p.style.marginTop = I + "px", s.value = e.value.slice(_, T).map((D, C) => ({
        data: D,
        index: C + _
      }));
    }
  };
  H([i == null ? void 0 : i.width, i == null ? void 0 : i.height, e], () => {
    d();
  });
  const y = (h) => {
    const p = x(r);
    p && (l.value = !0, p.scrollTop = f(h), d());
  }, g = pt({
    ref: (h) => {
      r.value = h;
    },
    onScroll: (h) => {
      if (l.value) {
        l.value = !1;
        return;
      }
      h.preventDefault(), d();
    }
  });
  return [s, g, y];
};
function D1(e, t) {
  const r = j(() => Object.keys(t).map((n) => n));
  H(
    Object.keys(t).map((n) => t[n]),
    (n, a) => {
      const o = {};
      r.value.forEach((i, s) => {
        a[s] !== n[s] && (o[i] = {
          from: a[s],
          to: n[s]
        });
      }), Object.keys(o).length && console.log("[why-did-you-update]", e, o);
    },
    {
      deep: !0
    }
  );
}
function F1(e, t = {}) {
  const {
    reconnectLimit: r = 3,
    reconnectInterval: n = 3 * 1e3,
    manual: a = m(!1),
    onOpen: o,
    onClose: i,
    onMessage: s,
    onError: l,
    protocols: u
  } = t, c = m(0), f = m(), v = m(), d = m(!1), y = m(), g = m(3), h = () => {
    var b;
    c.value < r && ((b = v.value) == null ? void 0 : b.readyState) !== 1 && (f.value && clearTimeout(f.value), f.value = setTimeout(() => {
      p(), c.value++;
    }, n));
  }, p = () => {
    f.value && clearTimeout(f.value), v.value && v.value.close();
    const b = new WebSocket(S(e), u);
    g.value = 0, b.onerror = (_) => {
      d.value || (h(), l == null || l(_, b), g.value = b.readyState || 3);
    }, b.onopen = (_) => {
      d.value || (o == null || o(_, b), c.value = 0, g.value = b.readyState || 1);
    }, b.onmessage = (_) => {
      d.value || (s == null || s(_, b), y.value = _);
    }, b.onclose = (_) => {
      d.value || (h(), i == null || i(_, b), g.value = b.readyState || 3);
    }, v.value = b;
  }, $ = (b) => {
    var _;
    if (g.value === 1)
      (_ = v.value) == null || _.send(b);
    else
      throw new Error("WebSocket disconnected");
  }, E = () => {
    c.value = 0, p();
  }, w = () => {
    var b;
    f.value && clearTimeout(f.value), c.value = r, (b = v.value) == null || b.close();
  };
  return se(e) && se(a) ? H(
    [e, a],
    (b) => {
      const [_, T] = b;
      T || E();
    },
    {
      immediate: !0
    }
  ) : se(a) ? H(
    a,
    (b) => {
      b || E();
    },
    {
      immediate: !0
    }
  ) : a || E(), qe(() => {
    d.value = !0, w();
  }), {
    latestMessage: y,
    sendMessage: $,
    connect: E,
    disconnect: w,
    readyState: g,
    webSocketIns: v.value
  };
}
function k_(e, t, r) {
  const { box: n = "content-box", ...a } = r != null ? r : {}, o = m("ResizeObserver" in window);
  let i;
  const s = j(
    () => Array.isArray(e) ? e.map((f) => x(f)) : [x(e)]
  ), l = () => {
    i && (i.disconnect(), i = null);
  }, u = H(
    s,
    (f) => {
      l(), o.value && window && (i = new ResizeObserver(t), f.forEach((v) => {
        v && i.observe(v, {
          box: n,
          ...a
        });
      }));
    },
    {
      flush: "post",
      immediate: !0,
      deep: !0
    }
  ), c = () => {
    l(), u();
  };
  return bo() && dt(c), {
    isSupported: o,
    stop: c
  };
}
function V_(e) {
  return ["width", "height", "top", "left", "bottom", "right"].includes(e);
}
function L1(e, t) {
  const { reset: r = !0, windowResize: n = !0, windowScroll: a = !0, immediate: o = !0 } = t != null ? t : {}, i = pt({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }), s = () => {
    const l = x(e);
    if (!l) {
      r && Object.keys(i).forEach((u) => {
        V_(u) && (i[u] = 0);
      });
      return;
    }
    if (l) {
      const { width: u, height: c, top: f, left: v, bottom: d, right: y } = l.getBoundingClientRect();
      i.width = u, i.height = c, i.top = f, i.left = v, i.bottom = d, i.right = y;
    }
  };
  return n && te("resize", s, {
    passive: !0
  }), a && te("scroll", s, {
    capture: !0,
    passive: !0
  }), k_(e, s), H(() => x(e), s), yt(() => {
    o && s();
  }), {
    ...ar(i)
  };
}
const M1 = (e, t, r = {}) => {
  Ua(
    () => {
      const n = x(t);
      if (!n)
        return;
      const a = new MutationObserver(e);
      return a.observe(n, r), () => {
        a == null || a.disconnect();
      };
    },
    [r],
    t
  );
};
export {
  Q_ as clearUseRequestCache,
  J_ as useAsyncOrder,
  lr as useBoolean,
  Z_ as useCookieState,
  e1 as useCounter,
  a1 as useDarkMode,
  t1 as useDebounce,
  ys as useDebounceFn,
  r1 as useDrag,
  n1 as useDrop,
  L1 as useElementBounding,
  i1 as useEventEmitter,
  te as useEventListener,
  o1 as useExternal,
  s1 as useFavicon,
  c1 as useFetchs,
  l1 as useFocusWithin,
  u1 as useFormatResult,
  f1 as useFullscreen,
  v1 as useHover,
  g1 as useInViewport,
  y1 as useInfiniteScroll,
  p1 as useInterval,
  h1 as useKeyPress,
  fa as useLocalStorageState,
  m1 as useLockFn,
  b1 as useLongPress,
  $1 as useMap,
  hs as useMedia,
  _1 as useMouse,
  M1 as useMutationObserver,
  S1 as useNetwork,
  d1 as usePrevious,
  K_ as useRenderChart,
  sa as useRequest,
  X_ as useRequestDevToolsPlugin,
  Y_ as useRequestProvider,
  k_ as useResizeObserver,
  A1 as useScroll,
  w1 as useSessionStorageState,
  E1 as useSet,
  O1 as useSetState,
  Sm as useSize,
  T1 as useThrottle,
  wm as useThrottleFn,
  Em as useTimeout,
  P1 as useTitle,
  vs as useToggle,
  I1 as useTrackedEffect,
  C1 as useUpdate,
  x1 as useUrlState,
  R1 as useVirtualList,
  F1 as useWebSocket,
  D1 as useWhyDidYouUpdate,
  $m as useWinResize
};

function Md(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var uu = { exports: {} }, Ql = {}, cu = { exports: {} }, A = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Pr = Symbol.for("react.element"), Fd = Symbol.for("react.portal"), Ad = Symbol.for("react.fragment"), Dd = Symbol.for("react.strict_mode"), $d = Symbol.for("react.profiler"), Ud = Symbol.for("react.provider"), Vd = Symbol.for("react.context"), Zd = Symbol.for("react.forward_ref"), Bd = Symbol.for("react.suspense"), Wd = Symbol.for("react.memo"), Hd = Symbol.for("react.lazy"), Ua = Symbol.iterator;
function Qd(e) {
  return e === null || typeof e != "object" ? null : (e = Ua && e[Ua] || e["@@iterator"], typeof e == "function" ? e : null);
}
var du = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, fu = Object.assign, pu = {};
function An(e, t, n) {
  this.props = e, this.context = t, this.refs = pu, this.updater = n || du;
}
An.prototype.isReactComponent = {};
An.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
An.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function hu() {
}
hu.prototype = An.prototype;
function Zs(e, t, n) {
  this.props = e, this.context = t, this.refs = pu, this.updater = n || du;
}
var Bs = Zs.prototype = new hu();
Bs.constructor = Zs;
fu(Bs, An.prototype);
Bs.isPureReactComponent = !0;
var Va = Array.isArray, mu = Object.prototype.hasOwnProperty, Ws = { current: null }, vu = { key: !0, ref: !0, __self: !0, __source: !0 };
function yu(e, t, n) {
  var r, l = {}, i = null, s = null;
  if (t != null) for (r in t.ref !== void 0 && (s = t.ref), t.key !== void 0 && (i = "" + t.key), t) mu.call(t, r) && !vu.hasOwnProperty(r) && (l[r] = t[r]);
  var a = arguments.length - 2;
  if (a === 1) l.children = n;
  else if (1 < a) {
    for (var o = Array(a), u = 0; u < a; u++) o[u] = arguments[u + 2];
    l.children = o;
  }
  if (e && e.defaultProps) for (r in a = e.defaultProps, a) l[r] === void 0 && (l[r] = a[r]);
  return { $$typeof: Pr, type: e, key: i, ref: s, props: l, _owner: Ws.current };
}
function Kd(e, t) {
  return { $$typeof: Pr, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function Hs(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Pr;
}
function Yd(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var Za = /\/+/g;
function pi(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? Yd("" + e.key) : t.toString(36);
}
function el(e, t, n, r, l) {
  var i = typeof e;
  (i === "undefined" || i === "boolean") && (e = null);
  var s = !1;
  if (e === null) s = !0;
  else switch (i) {
    case "string":
    case "number":
      s = !0;
      break;
    case "object":
      switch (e.$$typeof) {
        case Pr:
        case Fd:
          s = !0;
      }
  }
  if (s) return s = e, l = l(s), e = r === "" ? "." + pi(s, 0) : r, Va(l) ? (n = "", e != null && (n = e.replace(Za, "$&/") + "/"), el(l, t, n, "", function(u) {
    return u;
  })) : l != null && (Hs(l) && (l = Kd(l, n + (!l.key || s && s.key === l.key ? "" : ("" + l.key).replace(Za, "$&/") + "/") + e)), t.push(l)), 1;
  if (s = 0, r = r === "" ? "." : r + ":", Va(e)) for (var a = 0; a < e.length; a++) {
    i = e[a];
    var o = r + pi(i, a);
    s += el(i, t, n, o, l);
  }
  else if (o = Qd(e), typeof o == "function") for (e = o.call(e), a = 0; !(i = e.next()).done; ) i = i.value, o = r + pi(i, a++), s += el(i, t, n, o, l);
  else if (i === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return s;
}
function Ar(e, t, n) {
  if (e == null) return e;
  var r = [], l = 0;
  return el(e, r, "", "", function(i) {
    return t.call(n, i, l++);
  }), r;
}
function Gd(e) {
  if (e._status === -1) {
    var t = e._result;
    t = t(), t.then(function(n) {
      (e._status === 0 || e._status === -1) && (e._status = 1, e._result = n);
    }, function(n) {
      (e._status === 0 || e._status === -1) && (e._status = 2, e._result = n);
    }), e._status === -1 && (e._status = 0, e._result = t);
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var we = { current: null }, tl = { transition: null }, Xd = { ReactCurrentDispatcher: we, ReactCurrentBatchConfig: tl, ReactCurrentOwner: Ws };
function gu() {
  throw Error("act(...) is not supported in production builds of React.");
}
A.Children = { map: Ar, forEach: function(e, t, n) {
  Ar(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return Ar(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return Ar(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!Hs(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
A.Component = An;
A.Fragment = Ad;
A.Profiler = $d;
A.PureComponent = Zs;
A.StrictMode = Dd;
A.Suspense = Bd;
A.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Xd;
A.act = gu;
A.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = fu({}, e.props), l = e.key, i = e.ref, s = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (i = t.ref, s = Ws.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var a = e.type.defaultProps;
    for (o in t) mu.call(t, o) && !vu.hasOwnProperty(o) && (r[o] = t[o] === void 0 && a !== void 0 ? a[o] : t[o]);
  }
  var o = arguments.length - 2;
  if (o === 1) r.children = n;
  else if (1 < o) {
    a = Array(o);
    for (var u = 0; u < o; u++) a[u] = arguments[u + 2];
    r.children = a;
  }
  return { $$typeof: Pr, type: e.type, key: l, ref: i, props: r, _owner: s };
};
A.createContext = function(e) {
  return e = { $$typeof: Vd, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Ud, _context: e }, e.Consumer = e;
};
A.createElement = yu;
A.createFactory = function(e) {
  var t = yu.bind(null, e);
  return t.type = e, t;
};
A.createRef = function() {
  return { current: null };
};
A.forwardRef = function(e) {
  return { $$typeof: Zd, render: e };
};
A.isValidElement = Hs;
A.lazy = function(e) {
  return { $$typeof: Hd, _payload: { _status: -1, _result: e }, _init: Gd };
};
A.memo = function(e, t) {
  return { $$typeof: Wd, type: e, compare: t === void 0 ? null : t };
};
A.startTransition = function(e) {
  var t = tl.transition;
  tl.transition = {};
  try {
    e();
  } finally {
    tl.transition = t;
  }
};
A.unstable_act = gu;
A.useCallback = function(e, t) {
  return we.current.useCallback(e, t);
};
A.useContext = function(e) {
  return we.current.useContext(e);
};
A.useDebugValue = function() {
};
A.useDeferredValue = function(e) {
  return we.current.useDeferredValue(e);
};
A.useEffect = function(e, t) {
  return we.current.useEffect(e, t);
};
A.useId = function() {
  return we.current.useId();
};
A.useImperativeHandle = function(e, t, n) {
  return we.current.useImperativeHandle(e, t, n);
};
A.useInsertionEffect = function(e, t) {
  return we.current.useInsertionEffect(e, t);
};
A.useLayoutEffect = function(e, t) {
  return we.current.useLayoutEffect(e, t);
};
A.useMemo = function(e, t) {
  return we.current.useMemo(e, t);
};
A.useReducer = function(e, t, n) {
  return we.current.useReducer(e, t, n);
};
A.useRef = function(e) {
  return we.current.useRef(e);
};
A.useState = function(e) {
  return we.current.useState(e);
};
A.useSyncExternalStore = function(e, t, n) {
  return we.current.useSyncExternalStore(e, t, n);
};
A.useTransition = function() {
  return we.current.useTransition();
};
A.version = "18.3.1";
cu.exports = A;
var Kl = cu.exports;
const Xn = /* @__PURE__ */ Md(Kl);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Jd = Kl, qd = Symbol.for("react.element"), bd = Symbol.for("react.fragment"), ef = Object.prototype.hasOwnProperty, tf = Jd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, nf = { key: !0, ref: !0, __self: !0, __source: !0 };
function _u(e, t, n) {
  var r, l = {}, i = null, s = null;
  n !== void 0 && (i = "" + n), t.key !== void 0 && (i = "" + t.key), t.ref !== void 0 && (s = t.ref);
  for (r in t) ef.call(t, r) && !nf.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: qd, type: e, key: i, ref: s, props: l, _owner: tf.current };
}
Ql.Fragment = bd;
Ql.jsx = _u;
Ql.jsxs = _u;
uu.exports = Ql;
var _ = uu.exports, Zi = {}, ku = { exports: {} }, Ie = {}, wu = { exports: {} }, xu = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(e) {
  function t(N, L) {
    var F = N.length;
    N.push(L);
    e: for (; 0 < F; ) {
      var te = F - 1 >>> 1, ae = N[te];
      if (0 < l(ae, L)) N[te] = L, N[F] = ae, F = te;
      else break e;
    }
  }
  function n(N) {
    return N.length === 0 ? null : N[0];
  }
  function r(N) {
    if (N.length === 0) return null;
    var L = N[0], F = N.pop();
    if (F !== L) {
      N[0] = F;
      e: for (var te = 0, ae = N.length, Mr = ae >>> 1; te < Mr; ) {
        var $t = 2 * (te + 1) - 1, fi = N[$t], Ut = $t + 1, Fr = N[Ut];
        if (0 > l(fi, F)) Ut < ae && 0 > l(Fr, fi) ? (N[te] = Fr, N[Ut] = F, te = Ut) : (N[te] = fi, N[$t] = F, te = $t);
        else if (Ut < ae && 0 > l(Fr, F)) N[te] = Fr, N[Ut] = F, te = Ut;
        else break e;
      }
    }
    return L;
  }
  function l(N, L) {
    var F = N.sortIndex - L.sortIndex;
    return F !== 0 ? F : N.id - L.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var i = performance;
    e.unstable_now = function() {
      return i.now();
    };
  } else {
    var s = Date, a = s.now();
    e.unstable_now = function() {
      return s.now() - a;
    };
  }
  var o = [], u = [], h = 1, p = null, m = 3, k = !1, w = !1, S = !1, Y = typeof setTimeout == "function" ? setTimeout : null, d = typeof clearTimeout == "function" ? clearTimeout : null, c = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function f(N) {
    for (var L = n(u); L !== null; ) {
      if (L.callback === null) r(u);
      else if (L.startTime <= N) r(u), L.sortIndex = L.expirationTime, t(o, L);
      else break;
      L = n(u);
    }
  }
  function v(N) {
    if (S = !1, f(N), !w) if (n(o) !== null) w = !0, ci(E);
    else {
      var L = n(u);
      L !== null && di(v, L.startTime - N);
    }
  }
  function E(N, L) {
    w = !1, S && (S = !1, d(O), O = -1), k = !0;
    var F = m;
    try {
      for (f(L), p = n(o); p !== null && (!(p.expirationTime > L) || N && !Ze()); ) {
        var te = p.callback;
        if (typeof te == "function") {
          p.callback = null, m = p.priorityLevel;
          var ae = te(p.expirationTime <= L);
          L = e.unstable_now(), typeof ae == "function" ? p.callback = ae : p === n(o) && r(o), f(L);
        } else r(o);
        p = n(o);
      }
      if (p !== null) var Mr = !0;
      else {
        var $t = n(u);
        $t !== null && di(v, $t.startTime - L), Mr = !1;
      }
      return Mr;
    } finally {
      p = null, m = F, k = !1;
    }
  }
  var R = !1, P = null, O = -1, ee = 5, D = -1;
  function Ze() {
    return !(e.unstable_now() - D < ee);
  }
  function Un() {
    if (P !== null) {
      var N = e.unstable_now();
      D = N;
      var L = !0;
      try {
        L = P(!0, N);
      } finally {
        L ? Vn() : (R = !1, P = null);
      }
    } else R = !1;
  }
  var Vn;
  if (typeof c == "function") Vn = function() {
    c(Un);
  };
  else if (typeof MessageChannel < "u") {
    var $a = new MessageChannel(), Ld = $a.port2;
    $a.port1.onmessage = Un, Vn = function() {
      Ld.postMessage(null);
    };
  } else Vn = function() {
    Y(Un, 0);
  };
  function ci(N) {
    P = N, R || (R = !0, Vn());
  }
  function di(N, L) {
    O = Y(function() {
      N(e.unstable_now());
    }, L);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(N) {
    N.callback = null;
  }, e.unstable_continueExecution = function() {
    w || k || (w = !0, ci(E));
  }, e.unstable_forceFrameRate = function(N) {
    0 > N || 125 < N ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : ee = 0 < N ? Math.floor(1e3 / N) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return m;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(o);
  }, e.unstable_next = function(N) {
    switch (m) {
      case 1:
      case 2:
      case 3:
        var L = 3;
        break;
      default:
        L = m;
    }
    var F = m;
    m = L;
    try {
      return N();
    } finally {
      m = F;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(N, L) {
    switch (N) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        N = 3;
    }
    var F = m;
    m = N;
    try {
      return L();
    } finally {
      m = F;
    }
  }, e.unstable_scheduleCallback = function(N, L, F) {
    var te = e.unstable_now();
    switch (typeof F == "object" && F !== null ? (F = F.delay, F = typeof F == "number" && 0 < F ? te + F : te) : F = te, N) {
      case 1:
        var ae = -1;
        break;
      case 2:
        ae = 250;
        break;
      case 5:
        ae = 1073741823;
        break;
      case 4:
        ae = 1e4;
        break;
      default:
        ae = 5e3;
    }
    return ae = F + ae, N = { id: h++, callback: L, priorityLevel: N, startTime: F, expirationTime: ae, sortIndex: -1 }, F > te ? (N.sortIndex = F, t(u, N), n(o) === null && N === n(u) && (S ? (d(O), O = -1) : S = !0, di(v, F - te))) : (N.sortIndex = ae, t(o, N), w || k || (w = !0, ci(E))), N;
  }, e.unstable_shouldYield = Ze, e.unstable_wrapCallback = function(N) {
    var L = m;
    return function() {
      var F = m;
      m = L;
      try {
        return N.apply(this, arguments);
      } finally {
        m = F;
      }
    };
  };
})(xu);
wu.exports = xu;
var rf = wu.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var lf = Kl, Oe = rf;
function y(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var Su = /* @__PURE__ */ new Set(), dr = {};
function ln(e, t) {
  Tn(e, t), Tn(e + "Capture", t);
}
function Tn(e, t) {
  for (dr[e] = t, e = 0; e < t.length; e++) Su.add(t[e]);
}
var ut = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Bi = Object.prototype.hasOwnProperty, sf = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Ba = {}, Wa = {};
function af(e) {
  return Bi.call(Wa, e) ? !0 : Bi.call(Ba, e) ? !1 : sf.test(e) ? Wa[e] = !0 : (Ba[e] = !0, !1);
}
function of(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function uf(e, t, n, r) {
  if (t === null || typeof t > "u" || of(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null) switch (n.type) {
    case 3:
      return !t;
    case 4:
      return t === !1;
    case 5:
      return isNaN(t);
    case 6:
      return isNaN(t) || 1 > t;
  }
  return !1;
}
function xe(e, t, n, r, l, i, s) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = s;
}
var he = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  he[e] = new xe(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  he[t] = new xe(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  he[e] = new xe(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  he[e] = new xe(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  he[e] = new xe(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  he[e] = new xe(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  he[e] = new xe(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  he[e] = new xe(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  he[e] = new xe(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Qs = /[\-:]([a-z])/g;
function Ks(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    Qs,
    Ks
  );
  he[t] = new xe(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(Qs, Ks);
  he[t] = new xe(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(Qs, Ks);
  he[t] = new xe(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  he[e] = new xe(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
he.xlinkHref = new xe("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  he[e] = new xe(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Ys(e, t, n, r) {
  var l = he.hasOwnProperty(t) ? he[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (uf(t, n, l, r) && (n = null), r || l === null ? af(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var ht = lf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Dr = Symbol.for("react.element"), un = Symbol.for("react.portal"), cn = Symbol.for("react.fragment"), Gs = Symbol.for("react.strict_mode"), Wi = Symbol.for("react.profiler"), Cu = Symbol.for("react.provider"), Eu = Symbol.for("react.context"), Xs = Symbol.for("react.forward_ref"), Hi = Symbol.for("react.suspense"), Qi = Symbol.for("react.suspense_list"), Js = Symbol.for("react.memo"), vt = Symbol.for("react.lazy"), Nu = Symbol.for("react.offscreen"), Ha = Symbol.iterator;
function Zn(e) {
  return e === null || typeof e != "object" ? null : (e = Ha && e[Ha] || e["@@iterator"], typeof e == "function" ? e : null);
}
var q = Object.assign, hi;
function Jn(e) {
  if (hi === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    hi = t && t[1] || "";
  }
  return `
` + hi + e;
}
var mi = !1;
function vi(e, t) {
  if (!e || mi) return "";
  mi = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t) if (t = function() {
      throw Error();
    }, Object.defineProperty(t.prototype, "props", { set: function() {
      throw Error();
    } }), typeof Reflect == "object" && Reflect.construct) {
      try {
        Reflect.construct(t, []);
      } catch (u) {
        var r = u;
      }
      Reflect.construct(e, [], t);
    } else {
      try {
        t.call();
      } catch (u) {
        r = u;
      }
      e.call(t.prototype);
    }
    else {
      try {
        throw Error();
      } catch (u) {
        r = u;
      }
      e();
    }
  } catch (u) {
    if (u && r && typeof u.stack == "string") {
      for (var l = u.stack.split(`
`), i = r.stack.split(`
`), s = l.length - 1, a = i.length - 1; 1 <= s && 0 <= a && l[s] !== i[a]; ) a--;
      for (; 1 <= s && 0 <= a; s--, a--) if (l[s] !== i[a]) {
        if (s !== 1 || a !== 1)
          do
            if (s--, a--, 0 > a || l[s] !== i[a]) {
              var o = `
` + l[s].replace(" at new ", " at ");
              return e.displayName && o.includes("<anonymous>") && (o = o.replace("<anonymous>", e.displayName)), o;
            }
          while (1 <= s && 0 <= a);
        break;
      }
    }
  } finally {
    mi = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? Jn(e) : "";
}
function cf(e) {
  switch (e.tag) {
    case 5:
      return Jn(e.type);
    case 16:
      return Jn("Lazy");
    case 13:
      return Jn("Suspense");
    case 19:
      return Jn("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = vi(e.type, !1), e;
    case 11:
      return e = vi(e.type.render, !1), e;
    case 1:
      return e = vi(e.type, !0), e;
    default:
      return "";
  }
}
function Ki(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case cn:
      return "Fragment";
    case un:
      return "Portal";
    case Wi:
      return "Profiler";
    case Gs:
      return "StrictMode";
    case Hi:
      return "Suspense";
    case Qi:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case Eu:
      return (e.displayName || "Context") + ".Consumer";
    case Cu:
      return (e._context.displayName || "Context") + ".Provider";
    case Xs:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case Js:
      return t = e.displayName || null, t !== null ? t : Ki(e.type) || "Memo";
    case vt:
      t = e._payload, e = e._init;
      try {
        return Ki(e(t));
      } catch {
      }
  }
  return null;
}
function df(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Ki(t);
    case 8:
      return t === Gs ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function zt(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function Tu(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function ff(e) {
  var t = Tu(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
  if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
    var l = n.get, i = n.set;
    return Object.defineProperty(e, t, { configurable: !0, get: function() {
      return l.call(this);
    }, set: function(s) {
      r = "" + s, i.call(this, s);
    } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
      return r;
    }, setValue: function(s) {
      r = "" + s;
    }, stopTracking: function() {
      e._valueTracker = null, delete e[t];
    } };
  }
}
function $r(e) {
  e._valueTracker || (e._valueTracker = ff(e));
}
function ju(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = Tu(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function fl(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Yi(e, t) {
  var n = t.checked;
  return q({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function Qa(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = zt(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function Ru(e, t) {
  t = t.checked, t != null && Ys(e, "checked", t, !1);
}
function Gi(e, t) {
  Ru(e, t);
  var n = zt(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? Xi(e, t.type, n) : t.hasOwnProperty("defaultValue") && Xi(e, t.type, zt(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function Ka(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function Xi(e, t, n) {
  (t !== "number" || fl(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var qn = Array.isArray;
function wn(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + zt(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        e[l].selected = !0, r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function Ji(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(y(91));
  return q({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Ya(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(y(92));
      if (qn(n)) {
        if (1 < n.length) throw Error(y(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: zt(n) };
}
function Pu(e, t) {
  var n = zt(t.value), r = zt(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function Ga(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Ou(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function qi(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? Ou(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var Ur, zu = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (Ur = Ur || document.createElement("div"), Ur.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Ur.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function fr(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var nr = {
  animationIterationCount: !0,
  aspectRatio: !0,
  borderImageOutset: !0,
  borderImageSlice: !0,
  borderImageWidth: !0,
  boxFlex: !0,
  boxFlexGroup: !0,
  boxOrdinalGroup: !0,
  columnCount: !0,
  columns: !0,
  flex: !0,
  flexGrow: !0,
  flexPositive: !0,
  flexShrink: !0,
  flexNegative: !0,
  flexOrder: !0,
  gridArea: !0,
  gridRow: !0,
  gridRowEnd: !0,
  gridRowSpan: !0,
  gridRowStart: !0,
  gridColumn: !0,
  gridColumnEnd: !0,
  gridColumnSpan: !0,
  gridColumnStart: !0,
  fontWeight: !0,
  lineClamp: !0,
  lineHeight: !0,
  opacity: !0,
  order: !0,
  orphans: !0,
  tabSize: !0,
  widows: !0,
  zIndex: !0,
  zoom: !0,
  fillOpacity: !0,
  floodOpacity: !0,
  stopOpacity: !0,
  strokeDasharray: !0,
  strokeDashoffset: !0,
  strokeMiterlimit: !0,
  strokeOpacity: !0,
  strokeWidth: !0
}, pf = ["Webkit", "ms", "Moz", "O"];
Object.keys(nr).forEach(function(e) {
  pf.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), nr[t] = nr[e];
  });
});
function Iu(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || nr.hasOwnProperty(e) && nr[e] ? ("" + t).trim() : t + "px";
}
function Lu(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = Iu(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var hf = q({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function bi(e, t) {
  if (t) {
    if (hf[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(y(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(y(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(y(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(y(62));
  }
}
function es(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var ts = null;
function qs(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var ns = null, xn = null, Sn = null;
function Xa(e) {
  if (e = Ir(e)) {
    if (typeof ns != "function") throw Error(y(280));
    var t = e.stateNode;
    t && (t = ql(t), ns(e.stateNode, e.type, t));
  }
}
function Mu(e) {
  xn ? Sn ? Sn.push(e) : Sn = [e] : xn = e;
}
function Fu() {
  if (xn) {
    var e = xn, t = Sn;
    if (Sn = xn = null, Xa(e), t) for (e = 0; e < t.length; e++) Xa(t[e]);
  }
}
function Au(e, t) {
  return e(t);
}
function Du() {
}
var yi = !1;
function $u(e, t, n) {
  if (yi) return e(t, n);
  yi = !0;
  try {
    return Au(e, t, n);
  } finally {
    yi = !1, (xn !== null || Sn !== null) && (Du(), Fu());
  }
}
function pr(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = ql(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(y(231, t, typeof n));
  return n;
}
var rs = !1;
if (ut) try {
  var Bn = {};
  Object.defineProperty(Bn, "passive", { get: function() {
    rs = !0;
  } }), window.addEventListener("test", Bn, Bn), window.removeEventListener("test", Bn, Bn);
} catch {
  rs = !1;
}
function mf(e, t, n, r, l, i, s, a, o) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, u);
  } catch (h) {
    this.onError(h);
  }
}
var rr = !1, pl = null, hl = !1, ls = null, vf = { onError: function(e) {
  rr = !0, pl = e;
} };
function yf(e, t, n, r, l, i, s, a, o) {
  rr = !1, pl = null, mf.apply(vf, arguments);
}
function gf(e, t, n, r, l, i, s, a, o) {
  if (yf.apply(this, arguments), rr) {
    if (rr) {
      var u = pl;
      rr = !1, pl = null;
    } else throw Error(y(198));
    hl || (hl = !0, ls = u);
  }
}
function sn(e) {
  var t = e, n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do
      t = e, t.flags & 4098 && (n = t.return), e = t.return;
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function Uu(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function Ja(e) {
  if (sn(e) !== e) throw Error(y(188));
}
function _f(e) {
  var t = e.alternate;
  if (!t) {
    if (t = sn(e), t === null) throw Error(y(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var l = n.return;
    if (l === null) break;
    var i = l.alternate;
    if (i === null) {
      if (r = l.return, r !== null) {
        n = r;
        continue;
      }
      break;
    }
    if (l.child === i.child) {
      for (i = l.child; i; ) {
        if (i === n) return Ja(l), e;
        if (i === r) return Ja(l), t;
        i = i.sibling;
      }
      throw Error(y(188));
    }
    if (n.return !== r.return) n = l, r = i;
    else {
      for (var s = !1, a = l.child; a; ) {
        if (a === n) {
          s = !0, n = l, r = i;
          break;
        }
        if (a === r) {
          s = !0, r = l, n = i;
          break;
        }
        a = a.sibling;
      }
      if (!s) {
        for (a = i.child; a; ) {
          if (a === n) {
            s = !0, n = i, r = l;
            break;
          }
          if (a === r) {
            s = !0, r = i, n = l;
            break;
          }
          a = a.sibling;
        }
        if (!s) throw Error(y(189));
      }
    }
    if (n.alternate !== r) throw Error(y(190));
  }
  if (n.tag !== 3) throw Error(y(188));
  return n.stateNode.current === n ? e : t;
}
function Vu(e) {
  return e = _f(e), e !== null ? Zu(e) : null;
}
function Zu(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Zu(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Bu = Oe.unstable_scheduleCallback, qa = Oe.unstable_cancelCallback, kf = Oe.unstable_shouldYield, wf = Oe.unstable_requestPaint, ne = Oe.unstable_now, xf = Oe.unstable_getCurrentPriorityLevel, bs = Oe.unstable_ImmediatePriority, Wu = Oe.unstable_UserBlockingPriority, ml = Oe.unstable_NormalPriority, Sf = Oe.unstable_LowPriority, Hu = Oe.unstable_IdlePriority, Yl = null, be = null;
function Cf(e) {
  if (be && typeof be.onCommitFiberRoot == "function") try {
    be.onCommitFiberRoot(Yl, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var Ke = Math.clz32 ? Math.clz32 : Tf, Ef = Math.log, Nf = Math.LN2;
function Tf(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (Ef(e) / Nf | 0) | 0;
}
var Vr = 64, Zr = 4194304;
function bn(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function vl(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, l = e.suspendedLanes, i = e.pingedLanes, s = n & 268435455;
  if (s !== 0) {
    var a = s & ~l;
    a !== 0 ? r = bn(a) : (i &= s, i !== 0 && (r = bn(i)));
  } else s = n & ~l, s !== 0 ? r = bn(s) : i !== 0 && (r = bn(i));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, i = t & -t, l >= i || l === 16 && (i & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - Ke(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function jf(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function Rf(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, i = e.pendingLanes; 0 < i; ) {
    var s = 31 - Ke(i), a = 1 << s, o = l[s];
    o === -1 ? (!(a & n) || a & r) && (l[s] = jf(a, t)) : o <= t && (e.expiredLanes |= a), i &= ~a;
  }
}
function is(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Qu() {
  var e = Vr;
  return Vr <<= 1, !(Vr & 4194240) && (Vr = 64), e;
}
function gi(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Or(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Ke(t), e[t] = n;
}
function Pf(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - Ke(n), i = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~i;
  }
}
function ea(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - Ke(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var W = 0;
function Ku(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Yu, ta, Gu, Xu, Ju, ss = !1, Br = [], Ct = null, Et = null, Nt = null, hr = /* @__PURE__ */ new Map(), mr = /* @__PURE__ */ new Map(), _t = [], Of = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function ba(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Ct = null;
      break;
    case "dragenter":
    case "dragleave":
      Et = null;
      break;
    case "mouseover":
    case "mouseout":
      Nt = null;
      break;
    case "pointerover":
    case "pointerout":
      hr.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      mr.delete(t.pointerId);
  }
}
function Wn(e, t, n, r, l, i) {
  return e === null || e.nativeEvent !== i ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: i, targetContainers: [l] }, t !== null && (t = Ir(t), t !== null && ta(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function zf(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return Ct = Wn(Ct, e, t, n, r, l), !0;
    case "dragenter":
      return Et = Wn(Et, e, t, n, r, l), !0;
    case "mouseover":
      return Nt = Wn(Nt, e, t, n, r, l), !0;
    case "pointerover":
      var i = l.pointerId;
      return hr.set(i, Wn(hr.get(i) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return i = l.pointerId, mr.set(i, Wn(mr.get(i) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function qu(e) {
  var t = Bt(e.target);
  if (t !== null) {
    var n = sn(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Uu(n), t !== null) {
          e.blockedOn = t, Ju(e.priority, function() {
            Gu(n);
          });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function nl(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = as(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      ts = r, n.target.dispatchEvent(r), ts = null;
    } else return t = Ir(n), t !== null && ta(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function eo(e, t, n) {
  nl(e) && n.delete(t);
}
function If() {
  ss = !1, Ct !== null && nl(Ct) && (Ct = null), Et !== null && nl(Et) && (Et = null), Nt !== null && nl(Nt) && (Nt = null), hr.forEach(eo), mr.forEach(eo);
}
function Hn(e, t) {
  e.blockedOn === t && (e.blockedOn = null, ss || (ss = !0, Oe.unstable_scheduleCallback(Oe.unstable_NormalPriority, If)));
}
function vr(e) {
  function t(l) {
    return Hn(l, e);
  }
  if (0 < Br.length) {
    Hn(Br[0], e);
    for (var n = 1; n < Br.length; n++) {
      var r = Br[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (Ct !== null && Hn(Ct, e), Et !== null && Hn(Et, e), Nt !== null && Hn(Nt, e), hr.forEach(t), mr.forEach(t), n = 0; n < _t.length; n++) r = _t[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < _t.length && (n = _t[0], n.blockedOn === null); ) qu(n), n.blockedOn === null && _t.shift();
}
var Cn = ht.ReactCurrentBatchConfig, yl = !0;
function Lf(e, t, n, r) {
  var l = W, i = Cn.transition;
  Cn.transition = null;
  try {
    W = 1, na(e, t, n, r);
  } finally {
    W = l, Cn.transition = i;
  }
}
function Mf(e, t, n, r) {
  var l = W, i = Cn.transition;
  Cn.transition = null;
  try {
    W = 4, na(e, t, n, r);
  } finally {
    W = l, Cn.transition = i;
  }
}
function na(e, t, n, r) {
  if (yl) {
    var l = as(e, t, n, r);
    if (l === null) ji(e, t, r, gl, n), ba(e, r);
    else if (zf(l, e, t, n, r)) r.stopPropagation();
    else if (ba(e, r), t & 4 && -1 < Of.indexOf(e)) {
      for (; l !== null; ) {
        var i = Ir(l);
        if (i !== null && Yu(i), i = as(e, t, n, r), i === null && ji(e, t, r, gl, n), i === l) break;
        l = i;
      }
      l !== null && r.stopPropagation();
    } else ji(e, t, r, null, n);
  }
}
var gl = null;
function as(e, t, n, r) {
  if (gl = null, e = qs(r), e = Bt(e), e !== null) if (t = sn(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = Uu(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return gl = e, null;
}
function bu(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (xf()) {
        case bs:
          return 1;
        case Wu:
          return 4;
        case ml:
        case Sf:
          return 16;
        case Hu:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var wt = null, ra = null, rl = null;
function ec() {
  if (rl) return rl;
  var e, t = ra, n = t.length, r, l = "value" in wt ? wt.value : wt.textContent, i = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var s = n - e;
  for (r = 1; r <= s && t[n - r] === l[i - r]; r++) ;
  return rl = l.slice(e, 1 < r ? 1 - r : void 0);
}
function ll(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function Wr() {
  return !0;
}
function to() {
  return !1;
}
function Le(e) {
  function t(n, r, l, i, s) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = i, this.target = s, this.currentTarget = null;
    for (var a in e) e.hasOwnProperty(a) && (n = e[a], this[a] = n ? n(i) : i[a]);
    return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? Wr : to, this.isPropagationStopped = to, this;
  }
  return q(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Wr);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Wr);
  }, persist: function() {
  }, isPersistent: Wr }), t;
}
var Dn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, la = Le(Dn), zr = q({}, Dn, { view: 0, detail: 0 }), Ff = Le(zr), _i, ki, Qn, Gl = q({}, zr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: ia, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== Qn && (Qn && e.type === "mousemove" ? (_i = e.screenX - Qn.screenX, ki = e.screenY - Qn.screenY) : ki = _i = 0, Qn = e), _i);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : ki;
} }), no = Le(Gl), Af = q({}, Gl, { dataTransfer: 0 }), Df = Le(Af), $f = q({}, zr, { relatedTarget: 0 }), wi = Le($f), Uf = q({}, Dn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Vf = Le(Uf), Zf = q({}, Dn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Bf = Le(Zf), Wf = q({}, Dn, { data: 0 }), ro = Le(Wf), Hf = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, Qf = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, Kf = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Yf(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Kf[e]) ? !!t[e] : !1;
}
function ia() {
  return Yf;
}
var Gf = q({}, zr, { key: function(e) {
  if (e.key) {
    var t = Hf[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = ll(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Qf[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: ia, charCode: function(e) {
  return e.type === "keypress" ? ll(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? ll(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), Xf = Le(Gf), Jf = q({}, Gl, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), lo = Le(Jf), qf = q({}, zr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: ia }), bf = Le(qf), ep = q({}, Dn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), tp = Le(ep), np = q({}, Gl, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), rp = Le(np), lp = [9, 13, 27, 32], sa = ut && "CompositionEvent" in window, lr = null;
ut && "documentMode" in document && (lr = document.documentMode);
var ip = ut && "TextEvent" in window && !lr, tc = ut && (!sa || lr && 8 < lr && 11 >= lr), io = " ", so = !1;
function nc(e, t) {
  switch (e) {
    case "keyup":
      return lp.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function rc(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var dn = !1;
function sp(e, t) {
  switch (e) {
    case "compositionend":
      return rc(t);
    case "keypress":
      return t.which !== 32 ? null : (so = !0, io);
    case "textInput":
      return e = t.data, e === io && so ? null : e;
    default:
      return null;
  }
}
function ap(e, t) {
  if (dn) return e === "compositionend" || !sa && nc(e, t) ? (e = ec(), rl = ra = wt = null, dn = !1, e) : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return tc && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var op = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function ao(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!op[e.type] : t === "textarea";
}
function lc(e, t, n, r) {
  Mu(r), t = _l(t, "onChange"), 0 < t.length && (n = new la("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var ir = null, yr = null;
function up(e) {
  mc(e, 0);
}
function Xl(e) {
  var t = hn(e);
  if (ju(t)) return e;
}
function cp(e, t) {
  if (e === "change") return t;
}
var ic = !1;
if (ut) {
  var xi;
  if (ut) {
    var Si = "oninput" in document;
    if (!Si) {
      var oo = document.createElement("div");
      oo.setAttribute("oninput", "return;"), Si = typeof oo.oninput == "function";
    }
    xi = Si;
  } else xi = !1;
  ic = xi && (!document.documentMode || 9 < document.documentMode);
}
function uo() {
  ir && (ir.detachEvent("onpropertychange", sc), yr = ir = null);
}
function sc(e) {
  if (e.propertyName === "value" && Xl(yr)) {
    var t = [];
    lc(t, yr, e, qs(e)), $u(up, t);
  }
}
function dp(e, t, n) {
  e === "focusin" ? (uo(), ir = t, yr = n, ir.attachEvent("onpropertychange", sc)) : e === "focusout" && uo();
}
function fp(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return Xl(yr);
}
function pp(e, t) {
  if (e === "click") return Xl(t);
}
function hp(e, t) {
  if (e === "input" || e === "change") return Xl(t);
}
function mp(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Ge = typeof Object.is == "function" ? Object.is : mp;
function gr(e, t) {
  if (Ge(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!Bi.call(t, l) || !Ge(e[l], t[l])) return !1;
  }
  return !0;
}
function co(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function fo(e, t) {
  var n = co(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (r = e + n.textContent.length, e <= t && r >= t) return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = co(n);
  }
}
function ac(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? ac(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function oc() {
  for (var e = window, t = fl(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = fl(e.document);
  }
  return t;
}
function aa(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function vp(e) {
  var t = oc(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && ac(n.ownerDocument.documentElement, n)) {
    if (r !== null && aa(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, i = Math.min(r.start, l);
        r = r.end === void 0 ? i : Math.min(r.end, l), !e.extend && i > r && (l = r, r = i, i = l), l = fo(n, i);
        var s = fo(
          n,
          r
        );
        l && s && (e.rangeCount !== 1 || e.anchorNode !== l.node || e.anchorOffset !== l.offset || e.focusNode !== s.node || e.focusOffset !== s.offset) && (t = t.createRange(), t.setStart(l.node, l.offset), e.removeAllRanges(), i > r ? (e.addRange(t), e.extend(s.node, s.offset)) : (t.setEnd(s.node, s.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
  }
}
var yp = ut && "documentMode" in document && 11 >= document.documentMode, fn = null, os = null, sr = null, us = !1;
function po(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  us || fn == null || fn !== fl(r) || (r = fn, "selectionStart" in r && aa(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), sr && gr(sr, r) || (sr = r, r = _l(os, "onSelect"), 0 < r.length && (t = new la("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = fn)));
}
function Hr(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var pn = { animationend: Hr("Animation", "AnimationEnd"), animationiteration: Hr("Animation", "AnimationIteration"), animationstart: Hr("Animation", "AnimationStart"), transitionend: Hr("Transition", "TransitionEnd") }, Ci = {}, uc = {};
ut && (uc = document.createElement("div").style, "AnimationEvent" in window || (delete pn.animationend.animation, delete pn.animationiteration.animation, delete pn.animationstart.animation), "TransitionEvent" in window || delete pn.transitionend.transition);
function Jl(e) {
  if (Ci[e]) return Ci[e];
  if (!pn[e]) return e;
  var t = pn[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in uc) return Ci[e] = t[n];
  return e;
}
var cc = Jl("animationend"), dc = Jl("animationiteration"), fc = Jl("animationstart"), pc = Jl("transitionend"), hc = /* @__PURE__ */ new Map(), ho = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function Ft(e, t) {
  hc.set(e, t), ln(t, [e]);
}
for (var Ei = 0; Ei < ho.length; Ei++) {
  var Ni = ho[Ei], gp = Ni.toLowerCase(), _p = Ni[0].toUpperCase() + Ni.slice(1);
  Ft(gp, "on" + _p);
}
Ft(cc, "onAnimationEnd");
Ft(dc, "onAnimationIteration");
Ft(fc, "onAnimationStart");
Ft("dblclick", "onDoubleClick");
Ft("focusin", "onFocus");
Ft("focusout", "onBlur");
Ft(pc, "onTransitionEnd");
Tn("onMouseEnter", ["mouseout", "mouseover"]);
Tn("onMouseLeave", ["mouseout", "mouseover"]);
Tn("onPointerEnter", ["pointerout", "pointerover"]);
Tn("onPointerLeave", ["pointerout", "pointerover"]);
ln("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
ln("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
ln("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
ln("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
ln("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
ln("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var er = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), kp = new Set("cancel close invalid load scroll toggle".split(" ").concat(er));
function mo(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, gf(r, t, void 0, e), e.currentTarget = null;
}
function mc(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (t) for (var s = r.length - 1; 0 <= s; s--) {
        var a = r[s], o = a.instance, u = a.currentTarget;
        if (a = a.listener, o !== i && l.isPropagationStopped()) break e;
        mo(l, a, u), i = o;
      }
      else for (s = 0; s < r.length; s++) {
        if (a = r[s], o = a.instance, u = a.currentTarget, a = a.listener, o !== i && l.isPropagationStopped()) break e;
        mo(l, a, u), i = o;
      }
    }
  }
  if (hl) throw e = ls, hl = !1, ls = null, e;
}
function Q(e, t) {
  var n = t[hs];
  n === void 0 && (n = t[hs] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (vc(t, e, 2, !1), n.add(r));
}
function Ti(e, t, n) {
  var r = 0;
  t && (r |= 4), vc(n, e, r, t);
}
var Qr = "_reactListening" + Math.random().toString(36).slice(2);
function _r(e) {
  if (!e[Qr]) {
    e[Qr] = !0, Su.forEach(function(n) {
      n !== "selectionchange" && (kp.has(n) || Ti(n, !1, e), Ti(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Qr] || (t[Qr] = !0, Ti("selectionchange", !1, t));
  }
}
function vc(e, t, n, r) {
  switch (bu(t)) {
    case 1:
      var l = Lf;
      break;
    case 4:
      l = Mf;
      break;
    default:
      l = na;
  }
  n = l.bind(null, t, n, e), l = void 0, !rs || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function ji(e, t, n, r, l) {
  var i = r;
  if (!(t & 1) && !(t & 2) && r !== null) e: for (; ; ) {
    if (r === null) return;
    var s = r.tag;
    if (s === 3 || s === 4) {
      var a = r.stateNode.containerInfo;
      if (a === l || a.nodeType === 8 && a.parentNode === l) break;
      if (s === 4) for (s = r.return; s !== null; ) {
        var o = s.tag;
        if ((o === 3 || o === 4) && (o = s.stateNode.containerInfo, o === l || o.nodeType === 8 && o.parentNode === l)) return;
        s = s.return;
      }
      for (; a !== null; ) {
        if (s = Bt(a), s === null) return;
        if (o = s.tag, o === 5 || o === 6) {
          r = i = s;
          continue e;
        }
        a = a.parentNode;
      }
    }
    r = r.return;
  }
  $u(function() {
    var u = i, h = qs(n), p = [];
    e: {
      var m = hc.get(e);
      if (m !== void 0) {
        var k = la, w = e;
        switch (e) {
          case "keypress":
            if (ll(n) === 0) break e;
          case "keydown":
          case "keyup":
            k = Xf;
            break;
          case "focusin":
            w = "focus", k = wi;
            break;
          case "focusout":
            w = "blur", k = wi;
            break;
          case "beforeblur":
          case "afterblur":
            k = wi;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            k = no;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            k = Df;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            k = bf;
            break;
          case cc:
          case dc:
          case fc:
            k = Vf;
            break;
          case pc:
            k = tp;
            break;
          case "scroll":
            k = Ff;
            break;
          case "wheel":
            k = rp;
            break;
          case "copy":
          case "cut":
          case "paste":
            k = Bf;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            k = lo;
        }
        var S = (t & 4) !== 0, Y = !S && e === "scroll", d = S ? m !== null ? m + "Capture" : null : m;
        S = [];
        for (var c = u, f; c !== null; ) {
          f = c;
          var v = f.stateNode;
          if (f.tag === 5 && v !== null && (f = v, d !== null && (v = pr(c, d), v != null && S.push(kr(c, v, f)))), Y) break;
          c = c.return;
        }
        0 < S.length && (m = new k(m, w, null, n, h), p.push({ event: m, listeners: S }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (m = e === "mouseover" || e === "pointerover", k = e === "mouseout" || e === "pointerout", m && n !== ts && (w = n.relatedTarget || n.fromElement) && (Bt(w) || w[ct])) break e;
        if ((k || m) && (m = h.window === h ? h : (m = h.ownerDocument) ? m.defaultView || m.parentWindow : window, k ? (w = n.relatedTarget || n.toElement, k = u, w = w ? Bt(w) : null, w !== null && (Y = sn(w), w !== Y || w.tag !== 5 && w.tag !== 6) && (w = null)) : (k = null, w = u), k !== w)) {
          if (S = no, v = "onMouseLeave", d = "onMouseEnter", c = "mouse", (e === "pointerout" || e === "pointerover") && (S = lo, v = "onPointerLeave", d = "onPointerEnter", c = "pointer"), Y = k == null ? m : hn(k), f = w == null ? m : hn(w), m = new S(v, c + "leave", k, n, h), m.target = Y, m.relatedTarget = f, v = null, Bt(h) === u && (S = new S(d, c + "enter", w, n, h), S.target = f, S.relatedTarget = Y, v = S), Y = v, k && w) t: {
            for (S = k, d = w, c = 0, f = S; f; f = an(f)) c++;
            for (f = 0, v = d; v; v = an(v)) f++;
            for (; 0 < c - f; ) S = an(S), c--;
            for (; 0 < f - c; ) d = an(d), f--;
            for (; c--; ) {
              if (S === d || d !== null && S === d.alternate) break t;
              S = an(S), d = an(d);
            }
            S = null;
          }
          else S = null;
          k !== null && vo(p, m, k, S, !1), w !== null && Y !== null && vo(p, Y, w, S, !0);
        }
      }
      e: {
        if (m = u ? hn(u) : window, k = m.nodeName && m.nodeName.toLowerCase(), k === "select" || k === "input" && m.type === "file") var E = cp;
        else if (ao(m)) if (ic) E = hp;
        else {
          E = fp;
          var R = dp;
        }
        else (k = m.nodeName) && k.toLowerCase() === "input" && (m.type === "checkbox" || m.type === "radio") && (E = pp);
        if (E && (E = E(e, u))) {
          lc(p, E, n, h);
          break e;
        }
        R && R(e, m, u), e === "focusout" && (R = m._wrapperState) && R.controlled && m.type === "number" && Xi(m, "number", m.value);
      }
      switch (R = u ? hn(u) : window, e) {
        case "focusin":
          (ao(R) || R.contentEditable === "true") && (fn = R, os = u, sr = null);
          break;
        case "focusout":
          sr = os = fn = null;
          break;
        case "mousedown":
          us = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          us = !1, po(p, n, h);
          break;
        case "selectionchange":
          if (yp) break;
        case "keydown":
        case "keyup":
          po(p, n, h);
      }
      var P;
      if (sa) e: {
        switch (e) {
          case "compositionstart":
            var O = "onCompositionStart";
            break e;
          case "compositionend":
            O = "onCompositionEnd";
            break e;
          case "compositionupdate":
            O = "onCompositionUpdate";
            break e;
        }
        O = void 0;
      }
      else dn ? nc(e, n) && (O = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (O = "onCompositionStart");
      O && (tc && n.locale !== "ko" && (dn || O !== "onCompositionStart" ? O === "onCompositionEnd" && dn && (P = ec()) : (wt = h, ra = "value" in wt ? wt.value : wt.textContent, dn = !0)), R = _l(u, O), 0 < R.length && (O = new ro(O, e, null, n, h), p.push({ event: O, listeners: R }), P ? O.data = P : (P = rc(n), P !== null && (O.data = P)))), (P = ip ? sp(e, n) : ap(e, n)) && (u = _l(u, "onBeforeInput"), 0 < u.length && (h = new ro("onBeforeInput", "beforeinput", null, n, h), p.push({ event: h, listeners: u }), h.data = P));
    }
    mc(p, t);
  });
}
function kr(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function _l(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, i = l.stateNode;
    l.tag === 5 && i !== null && (l = i, i = pr(e, n), i != null && r.unshift(kr(e, i, l)), i = pr(e, t), i != null && r.push(kr(e, i, l))), e = e.return;
  }
  return r;
}
function an(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function vo(e, t, n, r, l) {
  for (var i = t._reactName, s = []; n !== null && n !== r; ) {
    var a = n, o = a.alternate, u = a.stateNode;
    if (o !== null && o === r) break;
    a.tag === 5 && u !== null && (a = u, l ? (o = pr(n, i), o != null && s.unshift(kr(n, o, a))) : l || (o = pr(n, i), o != null && s.push(kr(n, o, a)))), n = n.return;
  }
  s.length !== 0 && e.push({ event: t, listeners: s });
}
var wp = /\r\n?/g, xp = /\u0000|\uFFFD/g;
function yo(e) {
  return (typeof e == "string" ? e : "" + e).replace(wp, `
`).replace(xp, "");
}
function Kr(e, t, n) {
  if (t = yo(t), yo(e) !== t && n) throw Error(y(425));
}
function kl() {
}
var cs = null, ds = null;
function fs(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var ps = typeof setTimeout == "function" ? setTimeout : void 0, Sp = typeof clearTimeout == "function" ? clearTimeout : void 0, go = typeof Promise == "function" ? Promise : void 0, Cp = typeof queueMicrotask == "function" ? queueMicrotask : typeof go < "u" ? function(e) {
  return go.resolve(null).then(e).catch(Ep);
} : ps;
function Ep(e) {
  setTimeout(function() {
    throw e;
  });
}
function Ri(e, t) {
  var n = t, r = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
      if (r === 0) {
        e.removeChild(l), vr(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  vr(t);
}
function Tt(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function _o(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var $n = Math.random().toString(36).slice(2), qe = "__reactFiber$" + $n, wr = "__reactProps$" + $n, ct = "__reactContainer$" + $n, hs = "__reactEvents$" + $n, Np = "__reactListeners$" + $n, Tp = "__reactHandles$" + $n;
function Bt(e) {
  var t = e[qe];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[ct] || n[qe]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = _o(e); e !== null; ) {
        if (n = e[qe]) return n;
        e = _o(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function Ir(e) {
  return e = e[qe] || e[ct], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function hn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(y(33));
}
function ql(e) {
  return e[wr] || null;
}
var ms = [], mn = -1;
function At(e) {
  return { current: e };
}
function K(e) {
  0 > mn || (e.current = ms[mn], ms[mn] = null, mn--);
}
function H(e, t) {
  mn++, ms[mn] = e.current, e.current = t;
}
var It = {}, ge = At(It), Ee = At(!1), Yt = It;
function jn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return It;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, i;
  for (i in n) l[i] = t[i];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function Ne(e) {
  return e = e.childContextTypes, e != null;
}
function wl() {
  K(Ee), K(ge);
}
function ko(e, t, n) {
  if (ge.current !== It) throw Error(y(168));
  H(ge, t), H(Ee, n);
}
function yc(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(y(108, df(e) || "Unknown", l));
  return q({}, n, r);
}
function xl(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || It, Yt = ge.current, H(ge, e), H(Ee, Ee.current), !0;
}
function wo(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(y(169));
  n ? (e = yc(e, t, Yt), r.__reactInternalMemoizedMergedChildContext = e, K(Ee), K(ge), H(ge, e)) : K(Ee), H(Ee, n);
}
var lt = null, bl = !1, Pi = !1;
function gc(e) {
  lt === null ? lt = [e] : lt.push(e);
}
function jp(e) {
  bl = !0, gc(e);
}
function Dt() {
  if (!Pi && lt !== null) {
    Pi = !0;
    var e = 0, t = W;
    try {
      var n = lt;
      for (W = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      lt = null, bl = !1;
    } catch (l) {
      throw lt !== null && (lt = lt.slice(e + 1)), Bu(bs, Dt), l;
    } finally {
      W = t, Pi = !1;
    }
  }
  return null;
}
var vn = [], yn = 0, Sl = null, Cl = 0, Me = [], Fe = 0, Gt = null, it = 1, st = "";
function Vt(e, t) {
  vn[yn++] = Cl, vn[yn++] = Sl, Sl = e, Cl = t;
}
function _c(e, t, n) {
  Me[Fe++] = it, Me[Fe++] = st, Me[Fe++] = Gt, Gt = e;
  var r = it;
  e = st;
  var l = 32 - Ke(r) - 1;
  r &= ~(1 << l), n += 1;
  var i = 32 - Ke(t) + l;
  if (30 < i) {
    var s = l - l % 5;
    i = (r & (1 << s) - 1).toString(32), r >>= s, l -= s, it = 1 << 32 - Ke(t) + l | n << l | r, st = i + e;
  } else it = 1 << i | n << l | r, st = e;
}
function oa(e) {
  e.return !== null && (Vt(e, 1), _c(e, 1, 0));
}
function ua(e) {
  for (; e === Sl; ) Sl = vn[--yn], vn[yn] = null, Cl = vn[--yn], vn[yn] = null;
  for (; e === Gt; ) Gt = Me[--Fe], Me[Fe] = null, st = Me[--Fe], Me[Fe] = null, it = Me[--Fe], Me[Fe] = null;
}
var Pe = null, Re = null, G = !1, Qe = null;
function kc(e, t) {
  var n = Ae(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function xo(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Pe = e, Re = Tt(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Pe = e, Re = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Gt !== null ? { id: it, overflow: st } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = Ae(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Pe = e, Re = null, !0) : !1;
    default:
      return !1;
  }
}
function vs(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function ys(e) {
  if (G) {
    var t = Re;
    if (t) {
      var n = t;
      if (!xo(e, t)) {
        if (vs(e)) throw Error(y(418));
        t = Tt(n.nextSibling);
        var r = Pe;
        t && xo(e, t) ? kc(r, n) : (e.flags = e.flags & -4097 | 2, G = !1, Pe = e);
      }
    } else {
      if (vs(e)) throw Error(y(418));
      e.flags = e.flags & -4097 | 2, G = !1, Pe = e;
    }
  }
}
function So(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  Pe = e;
}
function Yr(e) {
  if (e !== Pe) return !1;
  if (!G) return So(e), G = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !fs(e.type, e.memoizedProps)), t && (t = Re)) {
    if (vs(e)) throw wc(), Error(y(418));
    for (; t; ) kc(e, t), t = Tt(t.nextSibling);
  }
  if (So(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(y(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Re = Tt(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      Re = null;
    }
  } else Re = Pe ? Tt(e.stateNode.nextSibling) : null;
  return !0;
}
function wc() {
  for (var e = Re; e; ) e = Tt(e.nextSibling);
}
function Rn() {
  Re = Pe = null, G = !1;
}
function ca(e) {
  Qe === null ? Qe = [e] : Qe.push(e);
}
var Rp = ht.ReactCurrentBatchConfig;
function Kn(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(y(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(y(147, e));
      var l = r, i = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === i ? t.ref : (t = function(s) {
        var a = l.refs;
        s === null ? delete a[i] : a[i] = s;
      }, t._stringRef = i, t);
    }
    if (typeof e != "string") throw Error(y(284));
    if (!n._owner) throw Error(y(290, e));
  }
  return e;
}
function Gr(e, t) {
  throw e = Object.prototype.toString.call(t), Error(y(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function Co(e) {
  var t = e._init;
  return t(e._payload);
}
function xc(e) {
  function t(d, c) {
    if (e) {
      var f = d.deletions;
      f === null ? (d.deletions = [c], d.flags |= 16) : f.push(c);
    }
  }
  function n(d, c) {
    if (!e) return null;
    for (; c !== null; ) t(d, c), c = c.sibling;
    return null;
  }
  function r(d, c) {
    for (d = /* @__PURE__ */ new Map(); c !== null; ) c.key !== null ? d.set(c.key, c) : d.set(c.index, c), c = c.sibling;
    return d;
  }
  function l(d, c) {
    return d = Ot(d, c), d.index = 0, d.sibling = null, d;
  }
  function i(d, c, f) {
    return d.index = f, e ? (f = d.alternate, f !== null ? (f = f.index, f < c ? (d.flags |= 2, c) : f) : (d.flags |= 2, c)) : (d.flags |= 1048576, c);
  }
  function s(d) {
    return e && d.alternate === null && (d.flags |= 2), d;
  }
  function a(d, c, f, v) {
    return c === null || c.tag !== 6 ? (c = Ai(f, d.mode, v), c.return = d, c) : (c = l(c, f), c.return = d, c);
  }
  function o(d, c, f, v) {
    var E = f.type;
    return E === cn ? h(d, c, f.props.children, v, f.key) : c !== null && (c.elementType === E || typeof E == "object" && E !== null && E.$$typeof === vt && Co(E) === c.type) ? (v = l(c, f.props), v.ref = Kn(d, c, f), v.return = d, v) : (v = dl(f.type, f.key, f.props, null, d.mode, v), v.ref = Kn(d, c, f), v.return = d, v);
  }
  function u(d, c, f, v) {
    return c === null || c.tag !== 4 || c.stateNode.containerInfo !== f.containerInfo || c.stateNode.implementation !== f.implementation ? (c = Di(f, d.mode, v), c.return = d, c) : (c = l(c, f.children || []), c.return = d, c);
  }
  function h(d, c, f, v, E) {
    return c === null || c.tag !== 7 ? (c = Kt(f, d.mode, v, E), c.return = d, c) : (c = l(c, f), c.return = d, c);
  }
  function p(d, c, f) {
    if (typeof c == "string" && c !== "" || typeof c == "number") return c = Ai("" + c, d.mode, f), c.return = d, c;
    if (typeof c == "object" && c !== null) {
      switch (c.$$typeof) {
        case Dr:
          return f = dl(c.type, c.key, c.props, null, d.mode, f), f.ref = Kn(d, null, c), f.return = d, f;
        case un:
          return c = Di(c, d.mode, f), c.return = d, c;
        case vt:
          var v = c._init;
          return p(d, v(c._payload), f);
      }
      if (qn(c) || Zn(c)) return c = Kt(c, d.mode, f, null), c.return = d, c;
      Gr(d, c);
    }
    return null;
  }
  function m(d, c, f, v) {
    var E = c !== null ? c.key : null;
    if (typeof f == "string" && f !== "" || typeof f == "number") return E !== null ? null : a(d, c, "" + f, v);
    if (typeof f == "object" && f !== null) {
      switch (f.$$typeof) {
        case Dr:
          return f.key === E ? o(d, c, f, v) : null;
        case un:
          return f.key === E ? u(d, c, f, v) : null;
        case vt:
          return E = f._init, m(
            d,
            c,
            E(f._payload),
            v
          );
      }
      if (qn(f) || Zn(f)) return E !== null ? null : h(d, c, f, v, null);
      Gr(d, f);
    }
    return null;
  }
  function k(d, c, f, v, E) {
    if (typeof v == "string" && v !== "" || typeof v == "number") return d = d.get(f) || null, a(c, d, "" + v, E);
    if (typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case Dr:
          return d = d.get(v.key === null ? f : v.key) || null, o(c, d, v, E);
        case un:
          return d = d.get(v.key === null ? f : v.key) || null, u(c, d, v, E);
        case vt:
          var R = v._init;
          return k(d, c, f, R(v._payload), E);
      }
      if (qn(v) || Zn(v)) return d = d.get(f) || null, h(c, d, v, E, null);
      Gr(c, v);
    }
    return null;
  }
  function w(d, c, f, v) {
    for (var E = null, R = null, P = c, O = c = 0, ee = null; P !== null && O < f.length; O++) {
      P.index > O ? (ee = P, P = null) : ee = P.sibling;
      var D = m(d, P, f[O], v);
      if (D === null) {
        P === null && (P = ee);
        break;
      }
      e && P && D.alternate === null && t(d, P), c = i(D, c, O), R === null ? E = D : R.sibling = D, R = D, P = ee;
    }
    if (O === f.length) return n(d, P), G && Vt(d, O), E;
    if (P === null) {
      for (; O < f.length; O++) P = p(d, f[O], v), P !== null && (c = i(P, c, O), R === null ? E = P : R.sibling = P, R = P);
      return G && Vt(d, O), E;
    }
    for (P = r(d, P); O < f.length; O++) ee = k(P, d, O, f[O], v), ee !== null && (e && ee.alternate !== null && P.delete(ee.key === null ? O : ee.key), c = i(ee, c, O), R === null ? E = ee : R.sibling = ee, R = ee);
    return e && P.forEach(function(Ze) {
      return t(d, Ze);
    }), G && Vt(d, O), E;
  }
  function S(d, c, f, v) {
    var E = Zn(f);
    if (typeof E != "function") throw Error(y(150));
    if (f = E.call(f), f == null) throw Error(y(151));
    for (var R = E = null, P = c, O = c = 0, ee = null, D = f.next(); P !== null && !D.done; O++, D = f.next()) {
      P.index > O ? (ee = P, P = null) : ee = P.sibling;
      var Ze = m(d, P, D.value, v);
      if (Ze === null) {
        P === null && (P = ee);
        break;
      }
      e && P && Ze.alternate === null && t(d, P), c = i(Ze, c, O), R === null ? E = Ze : R.sibling = Ze, R = Ze, P = ee;
    }
    if (D.done) return n(
      d,
      P
    ), G && Vt(d, O), E;
    if (P === null) {
      for (; !D.done; O++, D = f.next()) D = p(d, D.value, v), D !== null && (c = i(D, c, O), R === null ? E = D : R.sibling = D, R = D);
      return G && Vt(d, O), E;
    }
    for (P = r(d, P); !D.done; O++, D = f.next()) D = k(P, d, O, D.value, v), D !== null && (e && D.alternate !== null && P.delete(D.key === null ? O : D.key), c = i(D, c, O), R === null ? E = D : R.sibling = D, R = D);
    return e && P.forEach(function(Un) {
      return t(d, Un);
    }), G && Vt(d, O), E;
  }
  function Y(d, c, f, v) {
    if (typeof f == "object" && f !== null && f.type === cn && f.key === null && (f = f.props.children), typeof f == "object" && f !== null) {
      switch (f.$$typeof) {
        case Dr:
          e: {
            for (var E = f.key, R = c; R !== null; ) {
              if (R.key === E) {
                if (E = f.type, E === cn) {
                  if (R.tag === 7) {
                    n(d, R.sibling), c = l(R, f.props.children), c.return = d, d = c;
                    break e;
                  }
                } else if (R.elementType === E || typeof E == "object" && E !== null && E.$$typeof === vt && Co(E) === R.type) {
                  n(d, R.sibling), c = l(R, f.props), c.ref = Kn(d, R, f), c.return = d, d = c;
                  break e;
                }
                n(d, R);
                break;
              } else t(d, R);
              R = R.sibling;
            }
            f.type === cn ? (c = Kt(f.props.children, d.mode, v, f.key), c.return = d, d = c) : (v = dl(f.type, f.key, f.props, null, d.mode, v), v.ref = Kn(d, c, f), v.return = d, d = v);
          }
          return s(d);
        case un:
          e: {
            for (R = f.key; c !== null; ) {
              if (c.key === R) if (c.tag === 4 && c.stateNode.containerInfo === f.containerInfo && c.stateNode.implementation === f.implementation) {
                n(d, c.sibling), c = l(c, f.children || []), c.return = d, d = c;
                break e;
              } else {
                n(d, c);
                break;
              }
              else t(d, c);
              c = c.sibling;
            }
            c = Di(f, d.mode, v), c.return = d, d = c;
          }
          return s(d);
        case vt:
          return R = f._init, Y(d, c, R(f._payload), v);
      }
      if (qn(f)) return w(d, c, f, v);
      if (Zn(f)) return S(d, c, f, v);
      Gr(d, f);
    }
    return typeof f == "string" && f !== "" || typeof f == "number" ? (f = "" + f, c !== null && c.tag === 6 ? (n(d, c.sibling), c = l(c, f), c.return = d, d = c) : (n(d, c), c = Ai(f, d.mode, v), c.return = d, d = c), s(d)) : n(d, c);
  }
  return Y;
}
var Pn = xc(!0), Sc = xc(!1), El = At(null), Nl = null, gn = null, da = null;
function fa() {
  da = gn = Nl = null;
}
function pa(e) {
  var t = El.current;
  K(El), e._currentValue = t;
}
function gs(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function En(e, t) {
  Nl = e, da = gn = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (Ce = !0), e.firstContext = null);
}
function $e(e) {
  var t = e._currentValue;
  if (da !== e) if (e = { context: e, memoizedValue: t, next: null }, gn === null) {
    if (Nl === null) throw Error(y(308));
    gn = e, Nl.dependencies = { lanes: 0, firstContext: e };
  } else gn = gn.next = e;
  return t;
}
var Wt = null;
function ha(e) {
  Wt === null ? Wt = [e] : Wt.push(e);
}
function Cc(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, ha(t)) : (n.next = l.next, l.next = n), t.interleaved = n, dt(e, r);
}
function dt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var yt = !1;
function ma(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function Ec(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function at(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function jt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, Z & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, dt(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, ha(r)) : (t.next = l.next, l.next = t), r.interleaved = t, dt(e, n);
}
function il(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, ea(e, n);
  }
}
function Eo(e, t) {
  var n = e.updateQueue, r = e.alternate;
  if (r !== null && (r = r.updateQueue, n === r)) {
    var l = null, i = null;
    if (n = n.firstBaseUpdate, n !== null) {
      do {
        var s = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
        i === null ? l = i = s : i = i.next = s, n = n.next;
      } while (n !== null);
      i === null ? l = i = t : i = i.next = t;
    } else l = i = t;
    n = { baseState: r.baseState, firstBaseUpdate: l, lastBaseUpdate: i, shared: r.shared, effects: r.effects }, e.updateQueue = n;
    return;
  }
  e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
}
function Tl(e, t, n, r) {
  var l = e.updateQueue;
  yt = !1;
  var i = l.firstBaseUpdate, s = l.lastBaseUpdate, a = l.shared.pending;
  if (a !== null) {
    l.shared.pending = null;
    var o = a, u = o.next;
    o.next = null, s === null ? i = u : s.next = u, s = o;
    var h = e.alternate;
    h !== null && (h = h.updateQueue, a = h.lastBaseUpdate, a !== s && (a === null ? h.firstBaseUpdate = u : a.next = u, h.lastBaseUpdate = o));
  }
  if (i !== null) {
    var p = l.baseState;
    s = 0, h = u = o = null, a = i;
    do {
      var m = a.lane, k = a.eventTime;
      if ((r & m) === m) {
        h !== null && (h = h.next = {
          eventTime: k,
          lane: 0,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null
        });
        e: {
          var w = e, S = a;
          switch (m = t, k = n, S.tag) {
            case 1:
              if (w = S.payload, typeof w == "function") {
                p = w.call(k, p, m);
                break e;
              }
              p = w;
              break e;
            case 3:
              w.flags = w.flags & -65537 | 128;
            case 0:
              if (w = S.payload, m = typeof w == "function" ? w.call(k, p, m) : w, m == null) break e;
              p = q({}, p, m);
              break e;
            case 2:
              yt = !0;
          }
        }
        a.callback !== null && a.lane !== 0 && (e.flags |= 64, m = l.effects, m === null ? l.effects = [a] : m.push(a));
      } else k = { eventTime: k, lane: m, tag: a.tag, payload: a.payload, callback: a.callback, next: null }, h === null ? (u = h = k, o = p) : h = h.next = k, s |= m;
      if (a = a.next, a === null) {
        if (a = l.shared.pending, a === null) break;
        m = a, a = m.next, m.next = null, l.lastBaseUpdate = m, l.shared.pending = null;
      }
    } while (!0);
    if (h === null && (o = p), l.baseState = o, l.firstBaseUpdate = u, l.lastBaseUpdate = h, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        s |= l.lane, l = l.next;
      while (l !== t);
    } else i === null && (l.shared.lanes = 0);
    Jt |= s, e.lanes = s, e.memoizedState = p;
  }
}
function No(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(y(191, l));
      l.call(r);
    }
  }
}
var Lr = {}, et = At(Lr), xr = At(Lr), Sr = At(Lr);
function Ht(e) {
  if (e === Lr) throw Error(y(174));
  return e;
}
function va(e, t) {
  switch (H(Sr, t), H(xr, e), H(et, Lr), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : qi(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = qi(t, e);
  }
  K(et), H(et, t);
}
function On() {
  K(et), K(xr), K(Sr);
}
function Nc(e) {
  Ht(Sr.current);
  var t = Ht(et.current), n = qi(t, e.type);
  t !== n && (H(xr, e), H(et, n));
}
function ya(e) {
  xr.current === e && (K(et), K(xr));
}
var X = At(0);
function jl(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!")) return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      t.child.return = t, t = t.child;
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    t.sibling.return = t.return, t = t.sibling;
  }
  return null;
}
var Oi = [];
function ga() {
  for (var e = 0; e < Oi.length; e++) Oi[e]._workInProgressVersionPrimary = null;
  Oi.length = 0;
}
var sl = ht.ReactCurrentDispatcher, zi = ht.ReactCurrentBatchConfig, Xt = 0, J = null, ie = null, oe = null, Rl = !1, ar = !1, Cr = 0, Pp = 0;
function me() {
  throw Error(y(321));
}
function _a(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Ge(e[n], t[n])) return !1;
  return !0;
}
function ka(e, t, n, r, l, i) {
  if (Xt = i, J = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, sl.current = e === null || e.memoizedState === null ? Lp : Mp, e = n(r, l), ar) {
    i = 0;
    do {
      if (ar = !1, Cr = 0, 25 <= i) throw Error(y(301));
      i += 1, oe = ie = null, t.updateQueue = null, sl.current = Fp, e = n(r, l);
    } while (ar);
  }
  if (sl.current = Pl, t = ie !== null && ie.next !== null, Xt = 0, oe = ie = J = null, Rl = !1, t) throw Error(y(300));
  return e;
}
function wa() {
  var e = Cr !== 0;
  return Cr = 0, e;
}
function Je() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return oe === null ? J.memoizedState = oe = e : oe = oe.next = e, oe;
}
function Ue() {
  if (ie === null) {
    var e = J.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = ie.next;
  var t = oe === null ? J.memoizedState : oe.next;
  if (t !== null) oe = t, ie = e;
  else {
    if (e === null) throw Error(y(310));
    ie = e, e = { memoizedState: ie.memoizedState, baseState: ie.baseState, baseQueue: ie.baseQueue, queue: ie.queue, next: null }, oe === null ? J.memoizedState = oe = e : oe = oe.next = e;
  }
  return oe;
}
function Er(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Ii(e) {
  var t = Ue(), n = t.queue;
  if (n === null) throw Error(y(311));
  n.lastRenderedReducer = e;
  var r = ie, l = r.baseQueue, i = n.pending;
  if (i !== null) {
    if (l !== null) {
      var s = l.next;
      l.next = i.next, i.next = s;
    }
    r.baseQueue = l = i, n.pending = null;
  }
  if (l !== null) {
    i = l.next, r = r.baseState;
    var a = s = null, o = null, u = i;
    do {
      var h = u.lane;
      if ((Xt & h) === h) o !== null && (o = o.next = { lane: 0, action: u.action, hasEagerState: u.hasEagerState, eagerState: u.eagerState, next: null }), r = u.hasEagerState ? u.eagerState : e(r, u.action);
      else {
        var p = {
          lane: h,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null
        };
        o === null ? (a = o = p, s = r) : o = o.next = p, J.lanes |= h, Jt |= h;
      }
      u = u.next;
    } while (u !== null && u !== i);
    o === null ? s = r : o.next = a, Ge(r, t.memoizedState) || (Ce = !0), t.memoizedState = r, t.baseState = s, t.baseQueue = o, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      i = l.lane, J.lanes |= i, Jt |= i, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Li(e) {
  var t = Ue(), n = t.queue;
  if (n === null) throw Error(y(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, l = n.pending, i = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var s = l = l.next;
    do
      i = e(i, s.action), s = s.next;
    while (s !== l);
    Ge(i, t.memoizedState) || (Ce = !0), t.memoizedState = i, t.baseQueue === null && (t.baseState = i), n.lastRenderedState = i;
  }
  return [i, r];
}
function Tc() {
}
function jc(e, t) {
  var n = J, r = Ue(), l = t(), i = !Ge(r.memoizedState, l);
  if (i && (r.memoizedState = l, Ce = !0), r = r.queue, xa(Oc.bind(null, n, r, e), [e]), r.getSnapshot !== t || i || oe !== null && oe.memoizedState.tag & 1) {
    if (n.flags |= 2048, Nr(9, Pc.bind(null, n, r, l, t), void 0, null), ce === null) throw Error(y(349));
    Xt & 30 || Rc(n, t, l);
  }
  return l;
}
function Rc(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = J.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, J.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function Pc(e, t, n, r) {
  t.value = n, t.getSnapshot = r, zc(t) && Ic(e);
}
function Oc(e, t, n) {
  return n(function() {
    zc(t) && Ic(e);
  });
}
function zc(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Ge(e, n);
  } catch {
    return !0;
  }
}
function Ic(e) {
  var t = dt(e, 1);
  t !== null && Ye(t, e, 1, -1);
}
function To(e) {
  var t = Je();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Er, lastRenderedState: e }, t.queue = e, e = e.dispatch = Ip.bind(null, J, e), [t.memoizedState, e];
}
function Nr(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = J.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, J.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function Lc() {
  return Ue().memoizedState;
}
function al(e, t, n, r) {
  var l = Je();
  J.flags |= e, l.memoizedState = Nr(1 | t, n, void 0, r === void 0 ? null : r);
}
function ei(e, t, n, r) {
  var l = Ue();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (ie !== null) {
    var s = ie.memoizedState;
    if (i = s.destroy, r !== null && _a(r, s.deps)) {
      l.memoizedState = Nr(t, n, i, r);
      return;
    }
  }
  J.flags |= e, l.memoizedState = Nr(1 | t, n, i, r);
}
function jo(e, t) {
  return al(8390656, 8, e, t);
}
function xa(e, t) {
  return ei(2048, 8, e, t);
}
function Mc(e, t) {
  return ei(4, 2, e, t);
}
function Fc(e, t) {
  return ei(4, 4, e, t);
}
function Ac(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Dc(e, t, n) {
  return n = n != null ? n.concat([e]) : null, ei(4, 4, Ac.bind(null, t, e), n);
}
function Sa() {
}
function $c(e, t) {
  var n = Ue();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && _a(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Uc(e, t) {
  var n = Ue();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && _a(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Vc(e, t, n) {
  return Xt & 21 ? (Ge(n, t) || (n = Qu(), J.lanes |= n, Jt |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Ce = !0), e.memoizedState = n);
}
function Op(e, t) {
  var n = W;
  W = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = zi.transition;
  zi.transition = {};
  try {
    e(!1), t();
  } finally {
    W = n, zi.transition = r;
  }
}
function Zc() {
  return Ue().memoizedState;
}
function zp(e, t, n) {
  var r = Pt(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Bc(e)) Wc(t, n);
  else if (n = Cc(e, t, n, r), n !== null) {
    var l = ke();
    Ye(n, e, r, l), Hc(n, t, r);
  }
}
function Ip(e, t, n) {
  var r = Pt(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Bc(e)) Wc(t, l);
  else {
    var i = e.alternate;
    if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null)) try {
      var s = t.lastRenderedState, a = i(s, n);
      if (l.hasEagerState = !0, l.eagerState = a, Ge(a, s)) {
        var o = t.interleaved;
        o === null ? (l.next = l, ha(t)) : (l.next = o.next, o.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = Cc(e, t, l, r), n !== null && (l = ke(), Ye(n, e, r, l), Hc(n, t, r));
  }
}
function Bc(e) {
  var t = e.alternate;
  return e === J || t !== null && t === J;
}
function Wc(e, t) {
  ar = Rl = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Hc(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, ea(e, n);
  }
}
var Pl = { readContext: $e, useCallback: me, useContext: me, useEffect: me, useImperativeHandle: me, useInsertionEffect: me, useLayoutEffect: me, useMemo: me, useReducer: me, useRef: me, useState: me, useDebugValue: me, useDeferredValue: me, useTransition: me, useMutableSource: me, useSyncExternalStore: me, useId: me, unstable_isNewReconciler: !1 }, Lp = { readContext: $e, useCallback: function(e, t) {
  return Je().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: $e, useEffect: jo, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, al(
    4194308,
    4,
    Ac.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return al(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return al(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = Je();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = Je();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = zp.bind(null, J, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = Je();
  return e = { current: e }, t.memoizedState = e;
}, useState: To, useDebugValue: Sa, useDeferredValue: function(e) {
  return Je().memoizedState = e;
}, useTransition: function() {
  var e = To(!1), t = e[0];
  return e = Op.bind(null, e[1]), Je().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = J, l = Je();
  if (G) {
    if (n === void 0) throw Error(y(407));
    n = n();
  } else {
    if (n = t(), ce === null) throw Error(y(349));
    Xt & 30 || Rc(r, t, n);
  }
  l.memoizedState = n;
  var i = { value: n, getSnapshot: t };
  return l.queue = i, jo(Oc.bind(
    null,
    r,
    i,
    e
  ), [e]), r.flags |= 2048, Nr(9, Pc.bind(null, r, i, n, t), void 0, null), n;
}, useId: function() {
  var e = Je(), t = ce.identifierPrefix;
  if (G) {
    var n = st, r = it;
    n = (r & ~(1 << 32 - Ke(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = Cr++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = Pp++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, Mp = {
  readContext: $e,
  useCallback: $c,
  useContext: $e,
  useEffect: xa,
  useImperativeHandle: Dc,
  useInsertionEffect: Mc,
  useLayoutEffect: Fc,
  useMemo: Uc,
  useReducer: Ii,
  useRef: Lc,
  useState: function() {
    return Ii(Er);
  },
  useDebugValue: Sa,
  useDeferredValue: function(e) {
    var t = Ue();
    return Vc(t, ie.memoizedState, e);
  },
  useTransition: function() {
    var e = Ii(Er)[0], t = Ue().memoizedState;
    return [e, t];
  },
  useMutableSource: Tc,
  useSyncExternalStore: jc,
  useId: Zc,
  unstable_isNewReconciler: !1
}, Fp = { readContext: $e, useCallback: $c, useContext: $e, useEffect: xa, useImperativeHandle: Dc, useInsertionEffect: Mc, useLayoutEffect: Fc, useMemo: Uc, useReducer: Li, useRef: Lc, useState: function() {
  return Li(Er);
}, useDebugValue: Sa, useDeferredValue: function(e) {
  var t = Ue();
  return ie === null ? t.memoizedState = e : Vc(t, ie.memoizedState, e);
}, useTransition: function() {
  var e = Li(Er)[0], t = Ue().memoizedState;
  return [e, t];
}, useMutableSource: Tc, useSyncExternalStore: jc, useId: Zc, unstable_isNewReconciler: !1 };
function We(e, t) {
  if (e && e.defaultProps) {
    t = q({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function _s(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : q({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var ti = { isMounted: function(e) {
  return (e = e._reactInternals) ? sn(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = ke(), l = Pt(e), i = at(r, l);
  i.payload = t, n != null && (i.callback = n), t = jt(e, i, l), t !== null && (Ye(t, e, l, r), il(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = ke(), l = Pt(e), i = at(r, l);
  i.tag = 1, i.payload = t, n != null && (i.callback = n), t = jt(e, i, l), t !== null && (Ye(t, e, l, r), il(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = ke(), r = Pt(e), l = at(n, r);
  l.tag = 2, t != null && (l.callback = t), t = jt(e, l, r), t !== null && (Ye(t, e, r, n), il(t, e, r));
} };
function Ro(e, t, n, r, l, i, s) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, i, s) : t.prototype && t.prototype.isPureReactComponent ? !gr(n, r) || !gr(l, i) : !0;
}
function Qc(e, t, n) {
  var r = !1, l = It, i = t.contextType;
  return typeof i == "object" && i !== null ? i = $e(i) : (l = Ne(t) ? Yt : ge.current, r = t.contextTypes, i = (r = r != null) ? jn(e, l) : It), t = new t(n, i), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = ti, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = i), t;
}
function Po(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && ti.enqueueReplaceState(t, t.state, null);
}
function ks(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, ma(e);
  var i = t.contextType;
  typeof i == "object" && i !== null ? l.context = $e(i) : (i = Ne(t) ? Yt : ge.current, l.context = jn(e, i)), l.state = e.memoizedState, i = t.getDerivedStateFromProps, typeof i == "function" && (_s(e, t, i, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && ti.enqueueReplaceState(l, l.state, null), Tl(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function zn(e, t) {
  try {
    var n = "", r = t;
    do
      n += cf(r), r = r.return;
    while (r);
    var l = n;
  } catch (i) {
    l = `
Error generating stack: ` + i.message + `
` + i.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function Mi(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function ws(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var Ap = typeof WeakMap == "function" ? WeakMap : Map;
function Kc(e, t, n) {
  n = at(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    zl || (zl = !0, Os = r), ws(e, t);
  }, n;
}
function Yc(e, t, n) {
  n = at(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      ws(e, t);
    };
  }
  var i = e.stateNode;
  return i !== null && typeof i.componentDidCatch == "function" && (n.callback = function() {
    ws(e, t), typeof r != "function" && (Rt === null ? Rt = /* @__PURE__ */ new Set([this]) : Rt.add(this));
    var s = t.stack;
    this.componentDidCatch(t.value, { componentStack: s !== null ? s : "" });
  }), n;
}
function Oo(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Ap();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = Jp.bind(null, e, t, n), t.then(e, e));
}
function zo(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Io(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = at(-1, 1), t.tag = 2, jt(n, t, 1))), n.lanes |= 1), e);
}
var Dp = ht.ReactCurrentOwner, Ce = !1;
function _e(e, t, n, r) {
  t.child = e === null ? Sc(t, null, n, r) : Pn(t, e.child, n, r);
}
function Lo(e, t, n, r, l) {
  n = n.render;
  var i = t.ref;
  return En(t, l), r = ka(e, t, n, r, i, l), n = wa(), e !== null && !Ce ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, ft(e, t, l)) : (G && n && oa(t), t.flags |= 1, _e(e, t, r, l), t.child);
}
function Mo(e, t, n, r, l) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" && !Oa(i) && i.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = i, Gc(e, t, i, r, l)) : (e = dl(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (i = e.child, !(e.lanes & l)) {
    var s = i.memoizedProps;
    if (n = n.compare, n = n !== null ? n : gr, n(s, r) && e.ref === t.ref) return ft(e, t, l);
  }
  return t.flags |= 1, e = Ot(i, r), e.ref = t.ref, e.return = t, t.child = e;
}
function Gc(e, t, n, r, l) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (gr(i, r) && e.ref === t.ref) if (Ce = !1, t.pendingProps = r = i, (e.lanes & l) !== 0) e.flags & 131072 && (Ce = !0);
    else return t.lanes = e.lanes, ft(e, t, l);
  }
  return xs(e, t, n, r, l);
}
function Xc(e, t, n) {
  var r = t.pendingProps, l = r.children, i = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, H(kn, je), je |= n;
  else {
    if (!(n & 1073741824)) return e = i !== null ? i.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, H(kn, je), je |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = i !== null ? i.baseLanes : n, H(kn, je), je |= r;
  }
  else i !== null ? (r = i.baseLanes | n, t.memoizedState = null) : r = n, H(kn, je), je |= r;
  return _e(e, t, l, n), t.child;
}
function Jc(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function xs(e, t, n, r, l) {
  var i = Ne(n) ? Yt : ge.current;
  return i = jn(t, i), En(t, l), n = ka(e, t, n, r, i, l), r = wa(), e !== null && !Ce ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, ft(e, t, l)) : (G && r && oa(t), t.flags |= 1, _e(e, t, n, l), t.child);
}
function Fo(e, t, n, r, l) {
  if (Ne(n)) {
    var i = !0;
    xl(t);
  } else i = !1;
  if (En(t, l), t.stateNode === null) ol(e, t), Qc(t, n, r), ks(t, n, r, l), r = !0;
  else if (e === null) {
    var s = t.stateNode, a = t.memoizedProps;
    s.props = a;
    var o = s.context, u = n.contextType;
    typeof u == "object" && u !== null ? u = $e(u) : (u = Ne(n) ? Yt : ge.current, u = jn(t, u));
    var h = n.getDerivedStateFromProps, p = typeof h == "function" || typeof s.getSnapshotBeforeUpdate == "function";
    p || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (a !== r || o !== u) && Po(t, s, r, u), yt = !1;
    var m = t.memoizedState;
    s.state = m, Tl(t, r, s, l), o = t.memoizedState, a !== r || m !== o || Ee.current || yt ? (typeof h == "function" && (_s(t, n, h, r), o = t.memoizedState), (a = yt || Ro(t, n, a, r, m, o, u)) ? (p || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount()), typeof s.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = o), s.props = r, s.state = o, s.context = u, r = a) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    s = t.stateNode, Ec(e, t), a = t.memoizedProps, u = t.type === t.elementType ? a : We(t.type, a), s.props = u, p = t.pendingProps, m = s.context, o = n.contextType, typeof o == "object" && o !== null ? o = $e(o) : (o = Ne(n) ? Yt : ge.current, o = jn(t, o));
    var k = n.getDerivedStateFromProps;
    (h = typeof k == "function" || typeof s.getSnapshotBeforeUpdate == "function") || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (a !== p || m !== o) && Po(t, s, r, o), yt = !1, m = t.memoizedState, s.state = m, Tl(t, r, s, l);
    var w = t.memoizedState;
    a !== p || m !== w || Ee.current || yt ? (typeof k == "function" && (_s(t, n, k, r), w = t.memoizedState), (u = yt || Ro(t, n, u, r, m, w, o) || !1) ? (h || typeof s.UNSAFE_componentWillUpdate != "function" && typeof s.componentWillUpdate != "function" || (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(r, w, o), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(r, w, o)), typeof s.componentDidUpdate == "function" && (t.flags |= 4), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof s.componentDidUpdate != "function" || a === e.memoizedProps && m === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && m === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = w), s.props = r, s.state = w, s.context = o, r = u) : (typeof s.componentDidUpdate != "function" || a === e.memoizedProps && m === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && m === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Ss(e, t, n, r, i, l);
}
function Ss(e, t, n, r, l, i) {
  Jc(e, t);
  var s = (t.flags & 128) !== 0;
  if (!r && !s) return l && wo(t, n, !1), ft(e, t, i);
  r = t.stateNode, Dp.current = t;
  var a = s && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && s ? (t.child = Pn(t, e.child, null, i), t.child = Pn(t, null, a, i)) : _e(e, t, a, i), t.memoizedState = r.state, l && wo(t, n, !0), t.child;
}
function qc(e) {
  var t = e.stateNode;
  t.pendingContext ? ko(e, t.pendingContext, t.pendingContext !== t.context) : t.context && ko(e, t.context, !1), va(e, t.containerInfo);
}
function Ao(e, t, n, r, l) {
  return Rn(), ca(l), t.flags |= 256, _e(e, t, n, r), t.child;
}
var Cs = { dehydrated: null, treeContext: null, retryLane: 0 };
function Es(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function bc(e, t, n) {
  var r = t.pendingProps, l = X.current, i = !1, s = (t.flags & 128) !== 0, a;
  if ((a = s) || (a = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), a ? (i = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), H(X, l & 1), e === null)
    return ys(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (s = r.children, e = r.fallback, i ? (r = t.mode, i = t.child, s = { mode: "hidden", children: s }, !(r & 1) && i !== null ? (i.childLanes = 0, i.pendingProps = s) : i = li(s, r, 0, null), e = Kt(e, r, n, null), i.return = t, e.return = t, i.sibling = e, t.child = i, t.child.memoizedState = Es(n), t.memoizedState = Cs, e) : Ca(t, s));
  if (l = e.memoizedState, l !== null && (a = l.dehydrated, a !== null)) return $p(e, t, s, r, a, l, n);
  if (i) {
    i = r.fallback, s = t.mode, l = e.child, a = l.sibling;
    var o = { mode: "hidden", children: r.children };
    return !(s & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = o, t.deletions = null) : (r = Ot(l, o), r.subtreeFlags = l.subtreeFlags & 14680064), a !== null ? i = Ot(a, i) : (i = Kt(i, s, n, null), i.flags |= 2), i.return = t, r.return = t, r.sibling = i, t.child = r, r = i, i = t.child, s = e.child.memoizedState, s = s === null ? Es(n) : { baseLanes: s.baseLanes | n, cachePool: null, transitions: s.transitions }, i.memoizedState = s, i.childLanes = e.childLanes & ~n, t.memoizedState = Cs, r;
  }
  return i = e.child, e = i.sibling, r = Ot(i, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function Ca(e, t) {
  return t = li({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Xr(e, t, n, r) {
  return r !== null && ca(r), Pn(t, e.child, null, n), e = Ca(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function $p(e, t, n, r, l, i, s) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = Mi(Error(y(422))), Xr(e, t, s, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (i = r.fallback, l = t.mode, r = li({ mode: "visible", children: r.children }, l, 0, null), i = Kt(i, l, s, null), i.flags |= 2, r.return = t, i.return = t, r.sibling = i, t.child = r, t.mode & 1 && Pn(t, e.child, null, s), t.child.memoizedState = Es(s), t.memoizedState = Cs, i);
  if (!(t.mode & 1)) return Xr(e, t, s, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var a = r.dgst;
    return r = a, i = Error(y(419)), r = Mi(i, r, void 0), Xr(e, t, s, r);
  }
  if (a = (s & e.childLanes) !== 0, Ce || a) {
    if (r = ce, r !== null) {
      switch (s & -s) {
        case 4:
          l = 2;
          break;
        case 16:
          l = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          l = 32;
          break;
        case 536870912:
          l = 268435456;
          break;
        default:
          l = 0;
      }
      l = l & (r.suspendedLanes | s) ? 0 : l, l !== 0 && l !== i.retryLane && (i.retryLane = l, dt(e, l), Ye(r, e, l, -1));
    }
    return Pa(), r = Mi(Error(y(421))), Xr(e, t, s, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = qp.bind(null, e), l._reactRetry = t, null) : (e = i.treeContext, Re = Tt(l.nextSibling), Pe = t, G = !0, Qe = null, e !== null && (Me[Fe++] = it, Me[Fe++] = st, Me[Fe++] = Gt, it = e.id, st = e.overflow, Gt = t), t = Ca(t, r.children), t.flags |= 4096, t);
}
function Do(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), gs(e.return, t, n);
}
function Fi(e, t, n, r, l) {
  var i = e.memoizedState;
  i === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = r, i.tail = n, i.tailMode = l);
}
function ed(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, i = r.tail;
  if (_e(e, t, r.children, n), r = X.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Do(e, n, t);
      else if (e.tag === 19) Do(e, n, t);
      else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break e;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) break e;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    r &= 1;
  }
  if (H(X, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && jl(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), Fi(t, !1, l, n, i);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && jl(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      Fi(t, !0, n, null, i);
      break;
    case "together":
      Fi(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function ol(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function ft(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Jt |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(y(153));
  if (t.child !== null) {
    for (e = t.child, n = Ot(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = Ot(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function Up(e, t, n) {
  switch (t.tag) {
    case 3:
      qc(t), Rn();
      break;
    case 5:
      Nc(t);
      break;
    case 1:
      Ne(t.type) && xl(t);
      break;
    case 4:
      va(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      H(El, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (H(X, X.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? bc(e, t, n) : (H(X, X.current & 1), e = ft(e, t, n), e !== null ? e.sibling : null);
      H(X, X.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return ed(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), H(X, X.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Xc(e, t, n);
  }
  return ft(e, t, n);
}
var td, Ns, nd, rd;
td = function(e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      n.child.return = n, n = n.child;
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    n.sibling.return = n.return, n = n.sibling;
  }
};
Ns = function() {
};
nd = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, Ht(et.current);
    var i = null;
    switch (n) {
      case "input":
        l = Yi(e, l), r = Yi(e, r), i = [];
        break;
      case "select":
        l = q({}, l, { value: void 0 }), r = q({}, r, { value: void 0 }), i = [];
        break;
      case "textarea":
        l = Ji(e, l), r = Ji(e, r), i = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = kl);
    }
    bi(n, r);
    var s;
    n = null;
    for (u in l) if (!r.hasOwnProperty(u) && l.hasOwnProperty(u) && l[u] != null) if (u === "style") {
      var a = l[u];
      for (s in a) a.hasOwnProperty(s) && (n || (n = {}), n[s] = "");
    } else u !== "dangerouslySetInnerHTML" && u !== "children" && u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && u !== "autoFocus" && (dr.hasOwnProperty(u) ? i || (i = []) : (i = i || []).push(u, null));
    for (u in r) {
      var o = r[u];
      if (a = l != null ? l[u] : void 0, r.hasOwnProperty(u) && o !== a && (o != null || a != null)) if (u === "style") if (a) {
        for (s in a) !a.hasOwnProperty(s) || o && o.hasOwnProperty(s) || (n || (n = {}), n[s] = "");
        for (s in o) o.hasOwnProperty(s) && a[s] !== o[s] && (n || (n = {}), n[s] = o[s]);
      } else n || (i || (i = []), i.push(
        u,
        n
      )), n = o;
      else u === "dangerouslySetInnerHTML" ? (o = o ? o.__html : void 0, a = a ? a.__html : void 0, o != null && a !== o && (i = i || []).push(u, o)) : u === "children" ? typeof o != "string" && typeof o != "number" || (i = i || []).push(u, "" + o) : u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && (dr.hasOwnProperty(u) ? (o != null && u === "onScroll" && Q("scroll", e), i || a === o || (i = [])) : (i = i || []).push(u, o));
    }
    n && (i = i || []).push("style", n);
    var u = i;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
rd = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Yn(e, t) {
  if (!G) switch (e.tailMode) {
    case "hidden":
      t = e.tail;
      for (var n = null; t !== null; ) t.alternate !== null && (n = t), t = t.sibling;
      n === null ? e.tail = null : n.sibling = null;
      break;
    case "collapsed":
      n = e.tail;
      for (var r = null; n !== null; ) n.alternate !== null && (r = n), n = n.sibling;
      r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
  }
}
function ve(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
  if (t) for (var l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
  else for (l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t;
}
function Vp(e, t, n) {
  var r = t.pendingProps;
  switch (ua(t), t.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return ve(t), null;
    case 1:
      return Ne(t.type) && wl(), ve(t), null;
    case 3:
      return r = t.stateNode, On(), K(Ee), K(ge), ga(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (Yr(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Qe !== null && (Ls(Qe), Qe = null))), Ns(e, t), ve(t), null;
    case 5:
      ya(t);
      var l = Ht(Sr.current);
      if (n = t.type, e !== null && t.stateNode != null) nd(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(y(166));
          return ve(t), null;
        }
        if (e = Ht(et.current), Yr(t)) {
          r = t.stateNode, n = t.type;
          var i = t.memoizedProps;
          switch (r[qe] = t, r[wr] = i, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              Q("cancel", r), Q("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              Q("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < er.length; l++) Q(er[l], r);
              break;
            case "source":
              Q("error", r);
              break;
            case "img":
            case "image":
            case "link":
              Q(
                "error",
                r
              ), Q("load", r);
              break;
            case "details":
              Q("toggle", r);
              break;
            case "input":
              Qa(r, i), Q("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!i.multiple }, Q("invalid", r);
              break;
            case "textarea":
              Ya(r, i), Q("invalid", r);
          }
          bi(n, i), l = null;
          for (var s in i) if (i.hasOwnProperty(s)) {
            var a = i[s];
            s === "children" ? typeof a == "string" ? r.textContent !== a && (i.suppressHydrationWarning !== !0 && Kr(r.textContent, a, e), l = ["children", a]) : typeof a == "number" && r.textContent !== "" + a && (i.suppressHydrationWarning !== !0 && Kr(
              r.textContent,
              a,
              e
            ), l = ["children", "" + a]) : dr.hasOwnProperty(s) && a != null && s === "onScroll" && Q("scroll", r);
          }
          switch (n) {
            case "input":
              $r(r), Ka(r, i, !0);
              break;
            case "textarea":
              $r(r), Ga(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (r.onclick = kl);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          s = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Ou(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = s.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = s.createElement(n, { is: r.is }) : (e = s.createElement(n), n === "select" && (s = e, r.multiple ? s.multiple = !0 : r.size && (s.size = r.size))) : e = s.createElementNS(e, n), e[qe] = t, e[wr] = r, td(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (s = es(n, r), n) {
              case "dialog":
                Q("cancel", e), Q("close", e), l = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                Q("load", e), l = r;
                break;
              case "video":
              case "audio":
                for (l = 0; l < er.length; l++) Q(er[l], e);
                l = r;
                break;
              case "source":
                Q("error", e), l = r;
                break;
              case "img":
              case "image":
              case "link":
                Q(
                  "error",
                  e
                ), Q("load", e), l = r;
                break;
              case "details":
                Q("toggle", e), l = r;
                break;
              case "input":
                Qa(e, r), l = Yi(e, r), Q("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = q({}, r, { value: void 0 }), Q("invalid", e);
                break;
              case "textarea":
                Ya(e, r), l = Ji(e, r), Q("invalid", e);
                break;
              default:
                l = r;
            }
            bi(n, l), a = l;
            for (i in a) if (a.hasOwnProperty(i)) {
              var o = a[i];
              i === "style" ? Lu(e, o) : i === "dangerouslySetInnerHTML" ? (o = o ? o.__html : void 0, o != null && zu(e, o)) : i === "children" ? typeof o == "string" ? (n !== "textarea" || o !== "") && fr(e, o) : typeof o == "number" && fr(e, "" + o) : i !== "suppressContentEditableWarning" && i !== "suppressHydrationWarning" && i !== "autoFocus" && (dr.hasOwnProperty(i) ? o != null && i === "onScroll" && Q("scroll", e) : o != null && Ys(e, i, o, s));
            }
            switch (n) {
              case "input":
                $r(e), Ka(e, r, !1);
                break;
              case "textarea":
                $r(e), Ga(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + zt(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, i = r.value, i != null ? wn(e, !!r.multiple, i, !1) : r.defaultValue != null && wn(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = kl);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
      }
      return ve(t), null;
    case 6:
      if (e && t.stateNode != null) rd(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(y(166));
        if (n = Ht(Sr.current), Ht(et.current), Yr(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[qe] = t, (i = r.nodeValue !== n) && (e = Pe, e !== null)) switch (e.tag) {
            case 3:
              Kr(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && Kr(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          i && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[qe] = t, t.stateNode = r;
      }
      return ve(t), null;
    case 13:
      if (K(X), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (G && Re !== null && t.mode & 1 && !(t.flags & 128)) wc(), Rn(), t.flags |= 98560, i = !1;
        else if (i = Yr(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!i) throw Error(y(318));
            if (i = t.memoizedState, i = i !== null ? i.dehydrated : null, !i) throw Error(y(317));
            i[qe] = t;
          } else Rn(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          ve(t), i = !1;
        } else Qe !== null && (Ls(Qe), Qe = null), i = !0;
        if (!i) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || X.current & 1 ? se === 0 && (se = 3) : Pa())), t.updateQueue !== null && (t.flags |= 4), ve(t), null);
    case 4:
      return On(), Ns(e, t), e === null && _r(t.stateNode.containerInfo), ve(t), null;
    case 10:
      return pa(t.type._context), ve(t), null;
    case 17:
      return Ne(t.type) && wl(), ve(t), null;
    case 19:
      if (K(X), i = t.memoizedState, i === null) return ve(t), null;
      if (r = (t.flags & 128) !== 0, s = i.rendering, s === null) if (r) Yn(i, !1);
      else {
        if (se !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (s = jl(e), s !== null) {
            for (t.flags |= 128, Yn(i, !1), r = s.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) i = n, e = r, i.flags &= 14680066, s = i.alternate, s === null ? (i.childLanes = 0, i.lanes = e, i.child = null, i.subtreeFlags = 0, i.memoizedProps = null, i.memoizedState = null, i.updateQueue = null, i.dependencies = null, i.stateNode = null) : (i.childLanes = s.childLanes, i.lanes = s.lanes, i.child = s.child, i.subtreeFlags = 0, i.deletions = null, i.memoizedProps = s.memoizedProps, i.memoizedState = s.memoizedState, i.updateQueue = s.updateQueue, i.type = s.type, e = s.dependencies, i.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return H(X, X.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        i.tail !== null && ne() > In && (t.flags |= 128, r = !0, Yn(i, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = jl(s), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), Yn(i, !0), i.tail === null && i.tailMode === "hidden" && !s.alternate && !G) return ve(t), null;
        } else 2 * ne() - i.renderingStartTime > In && n !== 1073741824 && (t.flags |= 128, r = !0, Yn(i, !1), t.lanes = 4194304);
        i.isBackwards ? (s.sibling = t.child, t.child = s) : (n = i.last, n !== null ? n.sibling = s : t.child = s, i.last = s);
      }
      return i.tail !== null ? (t = i.tail, i.rendering = t, i.tail = t.sibling, i.renderingStartTime = ne(), t.sibling = null, n = X.current, H(X, r ? n & 1 | 2 : n & 1), t) : (ve(t), null);
    case 22:
    case 23:
      return Ra(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? je & 1073741824 && (ve(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : ve(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(y(156, t.tag));
}
function Zp(e, t) {
  switch (ua(t), t.tag) {
    case 1:
      return Ne(t.type) && wl(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return On(), K(Ee), K(ge), ga(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return ya(t), null;
    case 13:
      if (K(X), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(y(340));
        Rn();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return K(X), null;
    case 4:
      return On(), null;
    case 10:
      return pa(t.type._context), null;
    case 22:
    case 23:
      return Ra(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Jr = !1, ye = !1, Bp = typeof WeakSet == "function" ? WeakSet : Set, C = null;
function _n(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    b(e, t, r);
  }
  else n.current = null;
}
function Ts(e, t, n) {
  try {
    n();
  } catch (r) {
    b(e, t, r);
  }
}
var $o = !1;
function Wp(e, t) {
  if (cs = yl, e = oc(), aa(e)) {
    if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
    else e: {
      n = (n = e.ownerDocument) && n.defaultView || window;
      var r = n.getSelection && n.getSelection();
      if (r && r.rangeCount !== 0) {
        n = r.anchorNode;
        var l = r.anchorOffset, i = r.focusNode;
        r = r.focusOffset;
        try {
          n.nodeType, i.nodeType;
        } catch {
          n = null;
          break e;
        }
        var s = 0, a = -1, o = -1, u = 0, h = 0, p = e, m = null;
        t: for (; ; ) {
          for (var k; p !== n || l !== 0 && p.nodeType !== 3 || (a = s + l), p !== i || r !== 0 && p.nodeType !== 3 || (o = s + r), p.nodeType === 3 && (s += p.nodeValue.length), (k = p.firstChild) !== null; )
            m = p, p = k;
          for (; ; ) {
            if (p === e) break t;
            if (m === n && ++u === l && (a = s), m === i && ++h === r && (o = s), (k = p.nextSibling) !== null) break;
            p = m, m = p.parentNode;
          }
          p = k;
        }
        n = a === -1 || o === -1 ? null : { start: a, end: o };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (ds = { focusedElem: e, selectionRange: n }, yl = !1, C = t; C !== null; ) if (t = C, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, C = e;
  else for (; C !== null; ) {
    t = C;
    try {
      var w = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (w !== null) {
            var S = w.memoizedProps, Y = w.memoizedState, d = t.stateNode, c = d.getSnapshotBeforeUpdate(t.elementType === t.type ? S : We(t.type, S), Y);
            d.__reactInternalSnapshotBeforeUpdate = c;
          }
          break;
        case 3:
          var f = t.stateNode.containerInfo;
          f.nodeType === 1 ? f.textContent = "" : f.nodeType === 9 && f.documentElement && f.removeChild(f.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(y(163));
      }
    } catch (v) {
      b(t, t.return, v);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, C = e;
      break;
    }
    C = t.return;
  }
  return w = $o, $o = !1, w;
}
function or(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var i = l.destroy;
        l.destroy = void 0, i !== void 0 && Ts(t, n, i);
      }
      l = l.next;
    } while (l !== r);
  }
}
function ni(e, t) {
  if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
    var n = t = t.next;
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function js(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : t.current = e;
  }
}
function ld(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, ld(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[qe], delete t[wr], delete t[hs], delete t[Np], delete t[Tp])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function id(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Uo(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || id(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Rs(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = kl));
  else if (r !== 4 && (e = e.child, e !== null)) for (Rs(e, t, n), e = e.sibling; e !== null; ) Rs(e, t, n), e = e.sibling;
}
function Ps(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (Ps(e, t, n), e = e.sibling; e !== null; ) Ps(e, t, n), e = e.sibling;
}
var de = null, He = !1;
function mt(e, t, n) {
  for (n = n.child; n !== null; ) sd(e, t, n), n = n.sibling;
}
function sd(e, t, n) {
  if (be && typeof be.onCommitFiberUnmount == "function") try {
    be.onCommitFiberUnmount(Yl, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      ye || _n(n, t);
    case 6:
      var r = de, l = He;
      de = null, mt(e, t, n), de = r, He = l, de !== null && (He ? (e = de, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : de.removeChild(n.stateNode));
      break;
    case 18:
      de !== null && (He ? (e = de, n = n.stateNode, e.nodeType === 8 ? Ri(e.parentNode, n) : e.nodeType === 1 && Ri(e, n), vr(e)) : Ri(de, n.stateNode));
      break;
    case 4:
      r = de, l = He, de = n.stateNode.containerInfo, He = !0, mt(e, t, n), de = r, He = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!ye && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var i = l, s = i.destroy;
          i = i.tag, s !== void 0 && (i & 2 || i & 4) && Ts(n, t, s), l = l.next;
        } while (l !== r);
      }
      mt(e, t, n);
      break;
    case 1:
      if (!ye && (_n(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (a) {
        b(n, t, a);
      }
      mt(e, t, n);
      break;
    case 21:
      mt(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (ye = (r = ye) || n.memoizedState !== null, mt(e, t, n), ye = r) : mt(e, t, n);
      break;
    default:
      mt(e, t, n);
  }
}
function Vo(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Bp()), t.forEach(function(r) {
      var l = bp.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l));
    });
  }
}
function Be(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var l = n[r];
    try {
      var i = e, s = t, a = s;
      e: for (; a !== null; ) {
        switch (a.tag) {
          case 5:
            de = a.stateNode, He = !1;
            break e;
          case 3:
            de = a.stateNode.containerInfo, He = !0;
            break e;
          case 4:
            de = a.stateNode.containerInfo, He = !0;
            break e;
        }
        a = a.return;
      }
      if (de === null) throw Error(y(160));
      sd(i, s, l), de = null, He = !1;
      var o = l.alternate;
      o !== null && (o.return = null), l.return = null;
    } catch (u) {
      b(l, t, u);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) ad(t, e), t = t.sibling;
}
function ad(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (Be(t, e), Xe(e), r & 4) {
        try {
          or(3, e, e.return), ni(3, e);
        } catch (S) {
          b(e, e.return, S);
        }
        try {
          or(5, e, e.return);
        } catch (S) {
          b(e, e.return, S);
        }
      }
      break;
    case 1:
      Be(t, e), Xe(e), r & 512 && n !== null && _n(n, n.return);
      break;
    case 5:
      if (Be(t, e), Xe(e), r & 512 && n !== null && _n(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          fr(l, "");
        } catch (S) {
          b(e, e.return, S);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var i = e.memoizedProps, s = n !== null ? n.memoizedProps : i, a = e.type, o = e.updateQueue;
        if (e.updateQueue = null, o !== null) try {
          a === "input" && i.type === "radio" && i.name != null && Ru(l, i), es(a, s);
          var u = es(a, i);
          for (s = 0; s < o.length; s += 2) {
            var h = o[s], p = o[s + 1];
            h === "style" ? Lu(l, p) : h === "dangerouslySetInnerHTML" ? zu(l, p) : h === "children" ? fr(l, p) : Ys(l, h, p, u);
          }
          switch (a) {
            case "input":
              Gi(l, i);
              break;
            case "textarea":
              Pu(l, i);
              break;
            case "select":
              var m = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!i.multiple;
              var k = i.value;
              k != null ? wn(l, !!i.multiple, k, !1) : m !== !!i.multiple && (i.defaultValue != null ? wn(
                l,
                !!i.multiple,
                i.defaultValue,
                !0
              ) : wn(l, !!i.multiple, i.multiple ? [] : "", !1));
          }
          l[wr] = i;
        } catch (S) {
          b(e, e.return, S);
        }
      }
      break;
    case 6:
      if (Be(t, e), Xe(e), r & 4) {
        if (e.stateNode === null) throw Error(y(162));
        l = e.stateNode, i = e.memoizedProps;
        try {
          l.nodeValue = i;
        } catch (S) {
          b(e, e.return, S);
        }
      }
      break;
    case 3:
      if (Be(t, e), Xe(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        vr(t.containerInfo);
      } catch (S) {
        b(e, e.return, S);
      }
      break;
    case 4:
      Be(t, e), Xe(e);
      break;
    case 13:
      Be(t, e), Xe(e), l = e.child, l.flags & 8192 && (i = l.memoizedState !== null, l.stateNode.isHidden = i, !i || l.alternate !== null && l.alternate.memoizedState !== null || (Ta = ne())), r & 4 && Vo(e);
      break;
    case 22:
      if (h = n !== null && n.memoizedState !== null, e.mode & 1 ? (ye = (u = ye) || h, Be(t, e), ye = u) : Be(t, e), Xe(e), r & 8192) {
        if (u = e.memoizedState !== null, (e.stateNode.isHidden = u) && !h && e.mode & 1) for (C = e, h = e.child; h !== null; ) {
          for (p = C = h; C !== null; ) {
            switch (m = C, k = m.child, m.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                or(4, m, m.return);
                break;
              case 1:
                _n(m, m.return);
                var w = m.stateNode;
                if (typeof w.componentWillUnmount == "function") {
                  r = m, n = m.return;
                  try {
                    t = r, w.props = t.memoizedProps, w.state = t.memoizedState, w.componentWillUnmount();
                  } catch (S) {
                    b(r, n, S);
                  }
                }
                break;
              case 5:
                _n(m, m.return);
                break;
              case 22:
                if (m.memoizedState !== null) {
                  Bo(p);
                  continue;
                }
            }
            k !== null ? (k.return = m, C = k) : Bo(p);
          }
          h = h.sibling;
        }
        e: for (h = null, p = e; ; ) {
          if (p.tag === 5) {
            if (h === null) {
              h = p;
              try {
                l = p.stateNode, u ? (i = l.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none") : (a = p.stateNode, o = p.memoizedProps.style, s = o != null && o.hasOwnProperty("display") ? o.display : null, a.style.display = Iu("display", s));
              } catch (S) {
                b(e, e.return, S);
              }
            }
          } else if (p.tag === 6) {
            if (h === null) try {
              p.stateNode.nodeValue = u ? "" : p.memoizedProps;
            } catch (S) {
              b(e, e.return, S);
            }
          } else if ((p.tag !== 22 && p.tag !== 23 || p.memoizedState === null || p === e) && p.child !== null) {
            p.child.return = p, p = p.child;
            continue;
          }
          if (p === e) break e;
          for (; p.sibling === null; ) {
            if (p.return === null || p.return === e) break e;
            h === p && (h = null), p = p.return;
          }
          h === p && (h = null), p.sibling.return = p.return, p = p.sibling;
        }
      }
      break;
    case 19:
      Be(t, e), Xe(e), r & 4 && Vo(e);
      break;
    case 21:
      break;
    default:
      Be(
        t,
        e
      ), Xe(e);
  }
}
function Xe(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (id(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(y(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (fr(l, ""), r.flags &= -33);
          var i = Uo(e);
          Ps(e, i, l);
          break;
        case 3:
        case 4:
          var s = r.stateNode.containerInfo, a = Uo(e);
          Rs(e, a, s);
          break;
        default:
          throw Error(y(161));
      }
    } catch (o) {
      b(e, e.return, o);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Hp(e, t, n) {
  C = e, od(e);
}
function od(e, t, n) {
  for (var r = (e.mode & 1) !== 0; C !== null; ) {
    var l = C, i = l.child;
    if (l.tag === 22 && r) {
      var s = l.memoizedState !== null || Jr;
      if (!s) {
        var a = l.alternate, o = a !== null && a.memoizedState !== null || ye;
        a = Jr;
        var u = ye;
        if (Jr = s, (ye = o) && !u) for (C = l; C !== null; ) s = C, o = s.child, s.tag === 22 && s.memoizedState !== null ? Wo(l) : o !== null ? (o.return = s, C = o) : Wo(l);
        for (; i !== null; ) C = i, od(i), i = i.sibling;
        C = l, Jr = a, ye = u;
      }
      Zo(e);
    } else l.subtreeFlags & 8772 && i !== null ? (i.return = l, C = i) : Zo(e);
  }
}
function Zo(e) {
  for (; C !== null; ) {
    var t = C;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            ye || ni(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !ye) if (n === null) r.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : We(t.type, n.memoizedProps);
              r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var i = t.updateQueue;
            i !== null && No(t, i, r);
            break;
          case 3:
            var s = t.updateQueue;
            if (s !== null) {
              if (n = null, t.child !== null) switch (t.child.tag) {
                case 5:
                  n = t.child.stateNode;
                  break;
                case 1:
                  n = t.child.stateNode;
              }
              No(t, s, n);
            }
            break;
          case 5:
            var a = t.stateNode;
            if (n === null && t.flags & 4) {
              n = a;
              var o = t.memoizedProps;
              switch (t.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  o.autoFocus && n.focus();
                  break;
                case "img":
                  o.src && (n.src = o.src);
              }
            }
            break;
          case 6:
            break;
          case 4:
            break;
          case 12:
            break;
          case 13:
            if (t.memoizedState === null) {
              var u = t.alternate;
              if (u !== null) {
                var h = u.memoizedState;
                if (h !== null) {
                  var p = h.dehydrated;
                  p !== null && vr(p);
                }
              }
            }
            break;
          case 19:
          case 17:
          case 21:
          case 22:
          case 23:
          case 25:
            break;
          default:
            throw Error(y(163));
        }
        ye || t.flags & 512 && js(t);
      } catch (m) {
        b(t, t.return, m);
      }
    }
    if (t === e) {
      C = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, C = n;
      break;
    }
    C = t.return;
  }
}
function Bo(e) {
  for (; C !== null; ) {
    var t = C;
    if (t === e) {
      C = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, C = n;
      break;
    }
    C = t.return;
  }
}
function Wo(e) {
  for (; C !== null; ) {
    var t = C;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            ni(4, t);
          } catch (o) {
            b(t, n, o);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (o) {
              b(t, l, o);
            }
          }
          var i = t.return;
          try {
            js(t);
          } catch (o) {
            b(t, i, o);
          }
          break;
        case 5:
          var s = t.return;
          try {
            js(t);
          } catch (o) {
            b(t, s, o);
          }
      }
    } catch (o) {
      b(t, t.return, o);
    }
    if (t === e) {
      C = null;
      break;
    }
    var a = t.sibling;
    if (a !== null) {
      a.return = t.return, C = a;
      break;
    }
    C = t.return;
  }
}
var Qp = Math.ceil, Ol = ht.ReactCurrentDispatcher, Ea = ht.ReactCurrentOwner, De = ht.ReactCurrentBatchConfig, Z = 0, ce = null, le = null, pe = 0, je = 0, kn = At(0), se = 0, Tr = null, Jt = 0, ri = 0, Na = 0, ur = null, Se = null, Ta = 0, In = 1 / 0, rt = null, zl = !1, Os = null, Rt = null, qr = !1, xt = null, Il = 0, cr = 0, zs = null, ul = -1, cl = 0;
function ke() {
  return Z & 6 ? ne() : ul !== -1 ? ul : ul = ne();
}
function Pt(e) {
  return e.mode & 1 ? Z & 2 && pe !== 0 ? pe & -pe : Rp.transition !== null ? (cl === 0 && (cl = Qu()), cl) : (e = W, e !== 0 || (e = window.event, e = e === void 0 ? 16 : bu(e.type)), e) : 1;
}
function Ye(e, t, n, r) {
  if (50 < cr) throw cr = 0, zs = null, Error(y(185));
  Or(e, n, r), (!(Z & 2) || e !== ce) && (e === ce && (!(Z & 2) && (ri |= n), se === 4 && kt(e, pe)), Te(e, r), n === 1 && Z === 0 && !(t.mode & 1) && (In = ne() + 500, bl && Dt()));
}
function Te(e, t) {
  var n = e.callbackNode;
  Rf(e, t);
  var r = vl(e, e === ce ? pe : 0);
  if (r === 0) n !== null && qa(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && qa(n), t === 1) e.tag === 0 ? jp(Ho.bind(null, e)) : gc(Ho.bind(null, e)), Cp(function() {
      !(Z & 6) && Dt();
    }), n = null;
    else {
      switch (Ku(r)) {
        case 1:
          n = bs;
          break;
        case 4:
          n = Wu;
          break;
        case 16:
          n = ml;
          break;
        case 536870912:
          n = Hu;
          break;
        default:
          n = ml;
      }
      n = vd(n, ud.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function ud(e, t) {
  if (ul = -1, cl = 0, Z & 6) throw Error(y(327));
  var n = e.callbackNode;
  if (Nn() && e.callbackNode !== n) return null;
  var r = vl(e, e === ce ? pe : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = Ll(e, r);
  else {
    t = r;
    var l = Z;
    Z |= 2;
    var i = dd();
    (ce !== e || pe !== t) && (rt = null, In = ne() + 500, Qt(e, t));
    do
      try {
        Gp();
        break;
      } catch (a) {
        cd(e, a);
      }
    while (!0);
    fa(), Ol.current = i, Z = l, le !== null ? t = 0 : (ce = null, pe = 0, t = se);
  }
  if (t !== 0) {
    if (t === 2 && (l = is(e), l !== 0 && (r = l, t = Is(e, l))), t === 1) throw n = Tr, Qt(e, 0), kt(e, r), Te(e, ne()), n;
    if (t === 6) kt(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !Kp(l) && (t = Ll(e, r), t === 2 && (i = is(e), i !== 0 && (r = i, t = Is(e, i))), t === 1)) throw n = Tr, Qt(e, 0), kt(e, r), Te(e, ne()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(y(345));
        case 2:
          Zt(e, Se, rt);
          break;
        case 3:
          if (kt(e, r), (r & 130023424) === r && (t = Ta + 500 - ne(), 10 < t)) {
            if (vl(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              ke(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = ps(Zt.bind(null, e, Se, rt), t);
            break;
          }
          Zt(e, Se, rt);
          break;
        case 4:
          if (kt(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var s = 31 - Ke(r);
            i = 1 << s, s = t[s], s > l && (l = s), r &= ~i;
          }
          if (r = l, r = ne() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Qp(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = ps(Zt.bind(null, e, Se, rt), r);
            break;
          }
          Zt(e, Se, rt);
          break;
        case 5:
          Zt(e, Se, rt);
          break;
        default:
          throw Error(y(329));
      }
    }
  }
  return Te(e, ne()), e.callbackNode === n ? ud.bind(null, e) : null;
}
function Is(e, t) {
  var n = ur;
  return e.current.memoizedState.isDehydrated && (Qt(e, t).flags |= 256), e = Ll(e, t), e !== 2 && (t = Se, Se = n, t !== null && Ls(t)), e;
}
function Ls(e) {
  Se === null ? Se = e : Se.push.apply(Se, e);
}
function Kp(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
        var l = n[r], i = l.getSnapshot;
        l = l.value;
        try {
          if (!Ge(i(), l)) return !1;
        } catch {
          return !1;
        }
      }
    }
    if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
  }
  return !0;
}
function kt(e, t) {
  for (t &= ~Na, t &= ~ri, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Ke(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function Ho(e) {
  if (Z & 6) throw Error(y(327));
  Nn();
  var t = vl(e, 0);
  if (!(t & 1)) return Te(e, ne()), null;
  var n = Ll(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = is(e);
    r !== 0 && (t = r, n = Is(e, r));
  }
  if (n === 1) throw n = Tr, Qt(e, 0), kt(e, t), Te(e, ne()), n;
  if (n === 6) throw Error(y(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Zt(e, Se, rt), Te(e, ne()), null;
}
function ja(e, t) {
  var n = Z;
  Z |= 1;
  try {
    return e(t);
  } finally {
    Z = n, Z === 0 && (In = ne() + 500, bl && Dt());
  }
}
function qt(e) {
  xt !== null && xt.tag === 0 && !(Z & 6) && Nn();
  var t = Z;
  Z |= 1;
  var n = De.transition, r = W;
  try {
    if (De.transition = null, W = 1, e) return e();
  } finally {
    W = r, De.transition = n, Z = t, !(Z & 6) && Dt();
  }
}
function Ra() {
  je = kn.current, K(kn);
}
function Qt(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, Sp(n)), le !== null) for (n = le.return; n !== null; ) {
    var r = n;
    switch (ua(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && wl();
        break;
      case 3:
        On(), K(Ee), K(ge), ga();
        break;
      case 5:
        ya(r);
        break;
      case 4:
        On();
        break;
      case 13:
        K(X);
        break;
      case 19:
        K(X);
        break;
      case 10:
        pa(r.type._context);
        break;
      case 22:
      case 23:
        Ra();
    }
    n = n.return;
  }
  if (ce = e, le = e = Ot(e.current, null), pe = je = t, se = 0, Tr = null, Na = ri = Jt = 0, Se = ur = null, Wt !== null) {
    for (t = 0; t < Wt.length; t++) if (n = Wt[t], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var l = r.next, i = n.pending;
      if (i !== null) {
        var s = i.next;
        i.next = l, r.next = s;
      }
      n.pending = r;
    }
    Wt = null;
  }
  return e;
}
function cd(e, t) {
  do {
    var n = le;
    try {
      if (fa(), sl.current = Pl, Rl) {
        for (var r = J.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        Rl = !1;
      }
      if (Xt = 0, oe = ie = J = null, ar = !1, Cr = 0, Ea.current = null, n === null || n.return === null) {
        se = 1, Tr = t, le = null;
        break;
      }
      e: {
        var i = e, s = n.return, a = n, o = t;
        if (t = pe, a.flags |= 32768, o !== null && typeof o == "object" && typeof o.then == "function") {
          var u = o, h = a, p = h.tag;
          if (!(h.mode & 1) && (p === 0 || p === 11 || p === 15)) {
            var m = h.alternate;
            m ? (h.updateQueue = m.updateQueue, h.memoizedState = m.memoizedState, h.lanes = m.lanes) : (h.updateQueue = null, h.memoizedState = null);
          }
          var k = zo(s);
          if (k !== null) {
            k.flags &= -257, Io(k, s, a, i, t), k.mode & 1 && Oo(i, u, t), t = k, o = u;
            var w = t.updateQueue;
            if (w === null) {
              var S = /* @__PURE__ */ new Set();
              S.add(o), t.updateQueue = S;
            } else w.add(o);
            break e;
          } else {
            if (!(t & 1)) {
              Oo(i, u, t), Pa();
              break e;
            }
            o = Error(y(426));
          }
        } else if (G && a.mode & 1) {
          var Y = zo(s);
          if (Y !== null) {
            !(Y.flags & 65536) && (Y.flags |= 256), Io(Y, s, a, i, t), ca(zn(o, a));
            break e;
          }
        }
        i = o = zn(o, a), se !== 4 && (se = 2), ur === null ? ur = [i] : ur.push(i), i = s;
        do {
          switch (i.tag) {
            case 3:
              i.flags |= 65536, t &= -t, i.lanes |= t;
              var d = Kc(i, o, t);
              Eo(i, d);
              break e;
            case 1:
              a = o;
              var c = i.type, f = i.stateNode;
              if (!(i.flags & 128) && (typeof c.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (Rt === null || !Rt.has(f)))) {
                i.flags |= 65536, t &= -t, i.lanes |= t;
                var v = Yc(i, a, t);
                Eo(i, v);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      pd(n);
    } catch (E) {
      t = E, le === n && n !== null && (le = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function dd() {
  var e = Ol.current;
  return Ol.current = Pl, e === null ? Pl : e;
}
function Pa() {
  (se === 0 || se === 3 || se === 2) && (se = 4), ce === null || !(Jt & 268435455) && !(ri & 268435455) || kt(ce, pe);
}
function Ll(e, t) {
  var n = Z;
  Z |= 2;
  var r = dd();
  (ce !== e || pe !== t) && (rt = null, Qt(e, t));
  do
    try {
      Yp();
      break;
    } catch (l) {
      cd(e, l);
    }
  while (!0);
  if (fa(), Z = n, Ol.current = r, le !== null) throw Error(y(261));
  return ce = null, pe = 0, se;
}
function Yp() {
  for (; le !== null; ) fd(le);
}
function Gp() {
  for (; le !== null && !kf(); ) fd(le);
}
function fd(e) {
  var t = md(e.alternate, e, je);
  e.memoizedProps = e.pendingProps, t === null ? pd(e) : le = t, Ea.current = null;
}
function pd(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = Zp(n, t), n !== null) {
        n.flags &= 32767, le = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        se = 6, le = null;
        return;
      }
    } else if (n = Vp(n, t, je), n !== null) {
      le = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      le = t;
      return;
    }
    le = t = e;
  } while (t !== null);
  se === 0 && (se = 5);
}
function Zt(e, t, n) {
  var r = W, l = De.transition;
  try {
    De.transition = null, W = 1, Xp(e, t, n, r);
  } finally {
    De.transition = l, W = r;
  }
  return null;
}
function Xp(e, t, n, r) {
  do
    Nn();
  while (xt !== null);
  if (Z & 6) throw Error(y(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(y(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var i = n.lanes | n.childLanes;
  if (Pf(e, i), e === ce && (le = ce = null, pe = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || qr || (qr = !0, vd(ml, function() {
    return Nn(), null;
  })), i = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || i) {
    i = De.transition, De.transition = null;
    var s = W;
    W = 1;
    var a = Z;
    Z |= 4, Ea.current = null, Wp(e, n), ad(n, e), vp(ds), yl = !!cs, ds = cs = null, e.current = n, Hp(n), wf(), Z = a, W = s, De.transition = i;
  } else e.current = n;
  if (qr && (qr = !1, xt = e, Il = l), i = e.pendingLanes, i === 0 && (Rt = null), Cf(n.stateNode), Te(e, ne()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (zl) throw zl = !1, e = Os, Os = null, e;
  return Il & 1 && e.tag !== 0 && Nn(), i = e.pendingLanes, i & 1 ? e === zs ? cr++ : (cr = 0, zs = e) : cr = 0, Dt(), null;
}
function Nn() {
  if (xt !== null) {
    var e = Ku(Il), t = De.transition, n = W;
    try {
      if (De.transition = null, W = 16 > e ? 16 : e, xt === null) var r = !1;
      else {
        if (e = xt, xt = null, Il = 0, Z & 6) throw Error(y(331));
        var l = Z;
        for (Z |= 4, C = e.current; C !== null; ) {
          var i = C, s = i.child;
          if (C.flags & 16) {
            var a = i.deletions;
            if (a !== null) {
              for (var o = 0; o < a.length; o++) {
                var u = a[o];
                for (C = u; C !== null; ) {
                  var h = C;
                  switch (h.tag) {
                    case 0:
                    case 11:
                    case 15:
                      or(8, h, i);
                  }
                  var p = h.child;
                  if (p !== null) p.return = h, C = p;
                  else for (; C !== null; ) {
                    h = C;
                    var m = h.sibling, k = h.return;
                    if (ld(h), h === u) {
                      C = null;
                      break;
                    }
                    if (m !== null) {
                      m.return = k, C = m;
                      break;
                    }
                    C = k;
                  }
                }
              }
              var w = i.alternate;
              if (w !== null) {
                var S = w.child;
                if (S !== null) {
                  w.child = null;
                  do {
                    var Y = S.sibling;
                    S.sibling = null, S = Y;
                  } while (S !== null);
                }
              }
              C = i;
            }
          }
          if (i.subtreeFlags & 2064 && s !== null) s.return = i, C = s;
          else e: for (; C !== null; ) {
            if (i = C, i.flags & 2048) switch (i.tag) {
              case 0:
              case 11:
              case 15:
                or(9, i, i.return);
            }
            var d = i.sibling;
            if (d !== null) {
              d.return = i.return, C = d;
              break e;
            }
            C = i.return;
          }
        }
        var c = e.current;
        for (C = c; C !== null; ) {
          s = C;
          var f = s.child;
          if (s.subtreeFlags & 2064 && f !== null) f.return = s, C = f;
          else e: for (s = c; C !== null; ) {
            if (a = C, a.flags & 2048) try {
              switch (a.tag) {
                case 0:
                case 11:
                case 15:
                  ni(9, a);
              }
            } catch (E) {
              b(a, a.return, E);
            }
            if (a === s) {
              C = null;
              break e;
            }
            var v = a.sibling;
            if (v !== null) {
              v.return = a.return, C = v;
              break e;
            }
            C = a.return;
          }
        }
        if (Z = l, Dt(), be && typeof be.onPostCommitFiberRoot == "function") try {
          be.onPostCommitFiberRoot(Yl, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      W = n, De.transition = t;
    }
  }
  return !1;
}
function Qo(e, t, n) {
  t = zn(n, t), t = Kc(e, t, 1), e = jt(e, t, 1), t = ke(), e !== null && (Or(e, 1, t), Te(e, t));
}
function b(e, t, n) {
  if (e.tag === 3) Qo(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      Qo(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Rt === null || !Rt.has(r))) {
        e = zn(n, e), e = Yc(t, e, 1), t = jt(t, e, 1), e = ke(), t !== null && (Or(t, 1, e), Te(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function Jp(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = ke(), e.pingedLanes |= e.suspendedLanes & n, ce === e && (pe & n) === n && (se === 4 || se === 3 && (pe & 130023424) === pe && 500 > ne() - Ta ? Qt(e, 0) : Na |= n), Te(e, t);
}
function hd(e, t) {
  t === 0 && (e.mode & 1 ? (t = Zr, Zr <<= 1, !(Zr & 130023424) && (Zr = 4194304)) : t = 1);
  var n = ke();
  e = dt(e, t), e !== null && (Or(e, t, n), Te(e, n));
}
function qp(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), hd(e, n);
}
function bp(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode, l = e.memoizedState;
      l !== null && (n = l.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(y(314));
  }
  r !== null && r.delete(t), hd(e, n);
}
var md;
md = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || Ee.current) Ce = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return Ce = !1, Up(e, t, n);
    Ce = !!(e.flags & 131072);
  }
  else Ce = !1, G && t.flags & 1048576 && _c(t, Cl, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      ol(e, t), e = t.pendingProps;
      var l = jn(t, ge.current);
      En(t, n), l = ka(null, t, r, e, l, n);
      var i = wa();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Ne(r) ? (i = !0, xl(t)) : i = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, ma(t), l.updater = ti, t.stateNode = l, l._reactInternals = t, ks(t, r, e, n), t = Ss(null, t, r, !0, i, n)) : (t.tag = 0, G && i && oa(t), _e(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (ol(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = th(r), e = We(r, e), l) {
          case 0:
            t = xs(null, t, r, e, n);
            break e;
          case 1:
            t = Fo(null, t, r, e, n);
            break e;
          case 11:
            t = Lo(null, t, r, e, n);
            break e;
          case 14:
            t = Mo(null, t, r, We(r.type, e), n);
            break e;
        }
        throw Error(y(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : We(r, l), xs(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : We(r, l), Fo(e, t, r, l, n);
    case 3:
      e: {
        if (qc(t), e === null) throw Error(y(387));
        r = t.pendingProps, i = t.memoizedState, l = i.element, Ec(e, t), Tl(t, r, null, n);
        var s = t.memoizedState;
        if (r = s.element, i.isDehydrated) if (i = { element: r, isDehydrated: !1, cache: s.cache, pendingSuspenseBoundaries: s.pendingSuspenseBoundaries, transitions: s.transitions }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
          l = zn(Error(y(423)), t), t = Ao(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = zn(Error(y(424)), t), t = Ao(e, t, r, n, l);
          break e;
        } else for (Re = Tt(t.stateNode.containerInfo.firstChild), Pe = t, G = !0, Qe = null, n = Sc(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (Rn(), r === l) {
            t = ft(e, t, n);
            break e;
          }
          _e(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return Nc(t), e === null && ys(t), r = t.type, l = t.pendingProps, i = e !== null ? e.memoizedProps : null, s = l.children, fs(r, l) ? s = null : i !== null && fs(r, i) && (t.flags |= 32), Jc(e, t), _e(e, t, s, n), t.child;
    case 6:
      return e === null && ys(t), null;
    case 13:
      return bc(e, t, n);
    case 4:
      return va(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Pn(t, null, r, n) : _e(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : We(r, l), Lo(e, t, r, l, n);
    case 7:
      return _e(e, t, t.pendingProps, n), t.child;
    case 8:
      return _e(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return _e(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, i = t.memoizedProps, s = l.value, H(El, r._currentValue), r._currentValue = s, i !== null) if (Ge(i.value, s)) {
          if (i.children === l.children && !Ee.current) {
            t = ft(e, t, n);
            break e;
          }
        } else for (i = t.child, i !== null && (i.return = t); i !== null; ) {
          var a = i.dependencies;
          if (a !== null) {
            s = i.child;
            for (var o = a.firstContext; o !== null; ) {
              if (o.context === r) {
                if (i.tag === 1) {
                  o = at(-1, n & -n), o.tag = 2;
                  var u = i.updateQueue;
                  if (u !== null) {
                    u = u.shared;
                    var h = u.pending;
                    h === null ? o.next = o : (o.next = h.next, h.next = o), u.pending = o;
                  }
                }
                i.lanes |= n, o = i.alternate, o !== null && (o.lanes |= n), gs(
                  i.return,
                  n,
                  t
                ), a.lanes |= n;
                break;
              }
              o = o.next;
            }
          } else if (i.tag === 10) s = i.type === t.type ? null : i.child;
          else if (i.tag === 18) {
            if (s = i.return, s === null) throw Error(y(341));
            s.lanes |= n, a = s.alternate, a !== null && (a.lanes |= n), gs(s, n, t), s = i.sibling;
          } else s = i.child;
          if (s !== null) s.return = i;
          else for (s = i; s !== null; ) {
            if (s === t) {
              s = null;
              break;
            }
            if (i = s.sibling, i !== null) {
              i.return = s.return, s = i;
              break;
            }
            s = s.return;
          }
          i = s;
        }
        _e(e, t, l.children, n), t = t.child;
      }
      return t;
    case 9:
      return l = t.type, r = t.pendingProps.children, En(t, n), l = $e(l), r = r(l), t.flags |= 1, _e(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = We(r, t.pendingProps), l = We(r.type, l), Mo(e, t, r, l, n);
    case 15:
      return Gc(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : We(r, l), ol(e, t), t.tag = 1, Ne(r) ? (e = !0, xl(t)) : e = !1, En(t, n), Qc(t, r, l), ks(t, r, l, n), Ss(null, t, r, !0, e, n);
    case 19:
      return ed(e, t, n);
    case 22:
      return Xc(e, t, n);
  }
  throw Error(y(156, t.tag));
};
function vd(e, t) {
  return Bu(e, t);
}
function eh(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Ae(e, t, n, r) {
  return new eh(e, t, n, r);
}
function Oa(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function th(e) {
  if (typeof e == "function") return Oa(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === Xs) return 11;
    if (e === Js) return 14;
  }
  return 2;
}
function Ot(e, t) {
  var n = e.alternate;
  return n === null ? (n = Ae(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function dl(e, t, n, r, l, i) {
  var s = 2;
  if (r = e, typeof e == "function") Oa(e) && (s = 1);
  else if (typeof e == "string") s = 5;
  else e: switch (e) {
    case cn:
      return Kt(n.children, l, i, t);
    case Gs:
      s = 8, l |= 8;
      break;
    case Wi:
      return e = Ae(12, n, t, l | 2), e.elementType = Wi, e.lanes = i, e;
    case Hi:
      return e = Ae(13, n, t, l), e.elementType = Hi, e.lanes = i, e;
    case Qi:
      return e = Ae(19, n, t, l), e.elementType = Qi, e.lanes = i, e;
    case Nu:
      return li(n, l, i, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case Cu:
          s = 10;
          break e;
        case Eu:
          s = 9;
          break e;
        case Xs:
          s = 11;
          break e;
        case Js:
          s = 14;
          break e;
        case vt:
          s = 16, r = null;
          break e;
      }
      throw Error(y(130, e == null ? e : typeof e, ""));
  }
  return t = Ae(s, n, t, l), t.elementType = e, t.type = r, t.lanes = i, t;
}
function Kt(e, t, n, r) {
  return e = Ae(7, e, r, t), e.lanes = n, e;
}
function li(e, t, n, r) {
  return e = Ae(22, e, r, t), e.elementType = Nu, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function Ai(e, t, n) {
  return e = Ae(6, e, null, t), e.lanes = n, e;
}
function Di(e, t, n) {
  return t = Ae(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function nh(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = gi(0), this.expirationTimes = gi(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = gi(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function za(e, t, n, r, l, i, s, a, o) {
  return e = new nh(e, t, n, a, o), t === 1 ? (t = 1, i === !0 && (t |= 8)) : t = 0, i = Ae(3, null, null, t), e.current = i, i.stateNode = e, i.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, ma(i), e;
}
function rh(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: un, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function yd(e) {
  if (!e) return It;
  e = e._reactInternals;
  e: {
    if (sn(e) !== e || e.tag !== 1) throw Error(y(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Ne(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(y(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Ne(n)) return yc(e, n, t);
  }
  return t;
}
function gd(e, t, n, r, l, i, s, a, o) {
  return e = za(n, r, !0, e, l, i, s, a, o), e.context = yd(null), n = e.current, r = ke(), l = Pt(n), i = at(r, l), i.callback = t ?? null, jt(n, i, l), e.current.lanes = l, Or(e, l, r), Te(e, r), e;
}
function ii(e, t, n, r) {
  var l = t.current, i = ke(), s = Pt(l);
  return n = yd(n), t.context === null ? t.context = n : t.pendingContext = n, t = at(i, s), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = jt(l, t, s), e !== null && (Ye(e, l, s, i), il(e, l, s)), s;
}
function Ml(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Ko(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Ia(e, t) {
  Ko(e, t), (e = e.alternate) && Ko(e, t);
}
function lh() {
  return null;
}
var _d = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function La(e) {
  this._internalRoot = e;
}
si.prototype.render = La.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(y(409));
  ii(e, t, null, null);
};
si.prototype.unmount = La.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    qt(function() {
      ii(null, e, null, null);
    }), t[ct] = null;
  }
};
function si(e) {
  this._internalRoot = e;
}
si.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Xu();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < _t.length && t !== 0 && t < _t[n].priority; n++) ;
    _t.splice(n, 0, e), n === 0 && qu(e);
  }
};
function Ma(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function ai(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function Yo() {
}
function ih(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var i = r;
      r = function() {
        var u = Ml(s);
        i.call(u);
      };
    }
    var s = gd(t, r, e, 0, null, !1, !1, "", Yo);
    return e._reactRootContainer = s, e[ct] = s.current, _r(e.nodeType === 8 ? e.parentNode : e), qt(), s;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var a = r;
    r = function() {
      var u = Ml(o);
      a.call(u);
    };
  }
  var o = za(e, 0, !1, null, null, !1, !1, "", Yo);
  return e._reactRootContainer = o, e[ct] = o.current, _r(e.nodeType === 8 ? e.parentNode : e), qt(function() {
    ii(t, o, n, r);
  }), o;
}
function oi(e, t, n, r, l) {
  var i = n._reactRootContainer;
  if (i) {
    var s = i;
    if (typeof l == "function") {
      var a = l;
      l = function() {
        var o = Ml(s);
        a.call(o);
      };
    }
    ii(t, s, e, l);
  } else s = ih(n, t, e, l, r);
  return Ml(s);
}
Yu = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = bn(t.pendingLanes);
        n !== 0 && (ea(t, n | 1), Te(t, ne()), !(Z & 6) && (In = ne() + 500, Dt()));
      }
      break;
    case 13:
      qt(function() {
        var r = dt(e, 1);
        if (r !== null) {
          var l = ke();
          Ye(r, e, 1, l);
        }
      }), Ia(e, 1);
  }
};
ta = function(e) {
  if (e.tag === 13) {
    var t = dt(e, 134217728);
    if (t !== null) {
      var n = ke();
      Ye(t, e, 134217728, n);
    }
    Ia(e, 134217728);
  }
};
Gu = function(e) {
  if (e.tag === 13) {
    var t = Pt(e), n = dt(e, t);
    if (n !== null) {
      var r = ke();
      Ye(n, e, t, r);
    }
    Ia(e, t);
  }
};
Xu = function() {
  return W;
};
Ju = function(e, t) {
  var n = W;
  try {
    return W = e, t();
  } finally {
    W = n;
  }
};
ns = function(e, t, n) {
  switch (t) {
    case "input":
      if (Gi(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = ql(r);
            if (!l) throw Error(y(90));
            ju(r), Gi(r, l);
          }
        }
      }
      break;
    case "textarea":
      Pu(e, n);
      break;
    case "select":
      t = n.value, t != null && wn(e, !!n.multiple, t, !1);
  }
};
Au = ja;
Du = qt;
var sh = { usingClientEntryPoint: !1, Events: [Ir, hn, ql, Mu, Fu, ja] }, Gn = { findFiberByHostInstance: Bt, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, ah = { bundleType: Gn.bundleType, version: Gn.version, rendererPackageName: Gn.rendererPackageName, rendererConfig: Gn.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ht.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Vu(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: Gn.findFiberByHostInstance || lh, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var br = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!br.isDisabled && br.supportsFiber) try {
    Yl = br.inject(ah), be = br;
  } catch {
  }
}
Ie.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sh;
Ie.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Ma(t)) throw Error(y(200));
  return rh(e, t, null, n);
};
Ie.createRoot = function(e, t) {
  if (!Ma(e)) throw Error(y(299));
  var n = !1, r = "", l = _d;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = za(e, 1, !1, null, null, n, !1, r, l), e[ct] = t.current, _r(e.nodeType === 8 ? e.parentNode : e), new La(t);
};
Ie.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(y(188)) : (e = Object.keys(e).join(","), Error(y(268, e)));
  return e = Vu(t), e = e === null ? null : e.stateNode, e;
};
Ie.flushSync = function(e) {
  return qt(e);
};
Ie.hydrate = function(e, t, n) {
  if (!ai(t)) throw Error(y(200));
  return oi(null, e, t, !0, n);
};
Ie.hydrateRoot = function(e, t, n) {
  if (!Ma(e)) throw Error(y(405));
  var r = n != null && n.hydratedSources || null, l = !1, i = "", s = _d;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onRecoverableError !== void 0 && (s = n.onRecoverableError)), t = gd(t, null, e, 1, n ?? null, l, !1, i, s), e[ct] = t.current, _r(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new si(t);
};
Ie.render = function(e, t, n) {
  if (!ai(t)) throw Error(y(200));
  return oi(null, e, t, !1, n);
};
Ie.unmountComponentAtNode = function(e) {
  if (!ai(e)) throw Error(y(40));
  return e._reactRootContainer ? (qt(function() {
    oi(null, null, e, !1, function() {
      e._reactRootContainer = null, e[ct] = null;
    });
  }), !0) : !1;
};
Ie.unstable_batchedUpdates = ja;
Ie.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!ai(n)) throw Error(y(200));
  if (e == null || e._reactInternals === void 0) throw Error(y(38));
  return oi(e, t, n, !1, r);
};
Ie.version = "18.3.1-next-f1338f8080-20240426";
function kd() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(kd);
    } catch (e) {
      console.error(e);
    }
}
kd(), ku.exports = Ie;
var oh = ku.exports, Go = oh;
Zi.createRoot = Go.createRoot, Zi.hydrateRoot = Go.hydrateRoot;
var V;
(function(e) {
  e.assertEqual = (l) => {
  };
  function t(l) {
  }
  e.assertIs = t;
  function n(l) {
    throw new Error();
  }
  e.assertNever = n, e.arrayToEnum = (l) => {
    const i = {};
    for (const s of l)
      i[s] = s;
    return i;
  }, e.getValidEnumValues = (l) => {
    const i = e.objectKeys(l).filter((a) => typeof l[l[a]] != "number"), s = {};
    for (const a of i)
      s[a] = l[a];
    return e.objectValues(s);
  }, e.objectValues = (l) => e.objectKeys(l).map(function(i) {
    return l[i];
  }), e.objectKeys = typeof Object.keys == "function" ? (l) => Object.keys(l) : (l) => {
    const i = [];
    for (const s in l)
      Object.prototype.hasOwnProperty.call(l, s) && i.push(s);
    return i;
  }, e.find = (l, i) => {
    for (const s of l)
      if (i(s))
        return s;
  }, e.isInteger = typeof Number.isInteger == "function" ? (l) => Number.isInteger(l) : (l) => typeof l == "number" && Number.isFinite(l) && Math.floor(l) === l;
  function r(l, i = " | ") {
    return l.map((s) => typeof s == "string" ? `'${s}'` : s).join(i);
  }
  e.joinValues = r, e.jsonStringifyReplacer = (l, i) => typeof i == "bigint" ? i.toString() : i;
})(V || (V = {}));
var Xo;
(function(e) {
  e.mergeShapes = (t, n) => ({
    ...t,
    ...n
    // second overwrites first
  });
})(Xo || (Xo = {}));
const T = V.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]), gt = (e) => {
  switch (typeof e) {
    case "undefined":
      return T.undefined;
    case "string":
      return T.string;
    case "number":
      return Number.isNaN(e) ? T.nan : T.number;
    case "boolean":
      return T.boolean;
    case "function":
      return T.function;
    case "bigint":
      return T.bigint;
    case "symbol":
      return T.symbol;
    case "object":
      return Array.isArray(e) ? T.array : e === null ? T.null : e.then && typeof e.then == "function" && e.catch && typeof e.catch == "function" ? T.promise : typeof Map < "u" && e instanceof Map ? T.map : typeof Set < "u" && e instanceof Set ? T.set : typeof Date < "u" && e instanceof Date ? T.date : T.object;
    default:
      return T.unknown;
  }
}, g = V.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
class pt extends Error {
  get errors() {
    return this.issues;
  }
  constructor(t) {
    super(), this.issues = [], this.addIssue = (r) => {
      this.issues = [...this.issues, r];
    }, this.addIssues = (r = []) => {
      this.issues = [...this.issues, ...r];
    };
    const n = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, n) : this.__proto__ = n, this.name = "ZodError", this.issues = t;
  }
  format(t) {
    const n = t || function(i) {
      return i.message;
    }, r = { _errors: [] }, l = (i) => {
      for (const s of i.issues)
        if (s.code === "invalid_union")
          s.unionErrors.map(l);
        else if (s.code === "invalid_return_type")
          l(s.returnTypeError);
        else if (s.code === "invalid_arguments")
          l(s.argumentsError);
        else if (s.path.length === 0)
          r._errors.push(n(s));
        else {
          let a = r, o = 0;
          for (; o < s.path.length; ) {
            const u = s.path[o];
            o === s.path.length - 1 ? (a[u] = a[u] || { _errors: [] }, a[u]._errors.push(n(s))) : a[u] = a[u] || { _errors: [] }, a = a[u], o++;
          }
        }
    };
    return l(this), r;
  }
  static assert(t) {
    if (!(t instanceof pt))
      throw new Error(`Not a ZodError: ${t}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, V.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(t = (n) => n.message) {
    const n = {}, r = [];
    for (const l of this.issues)
      if (l.path.length > 0) {
        const i = l.path[0];
        n[i] = n[i] || [], n[i].push(t(l));
      } else
        r.push(t(l));
    return { formErrors: r, fieldErrors: n };
  }
  get formErrors() {
    return this.flatten();
  }
}
pt.create = (e) => new pt(e);
const Ms = (e, t) => {
  let n;
  switch (e.code) {
    case g.invalid_type:
      e.received === T.undefined ? n = "Required" : n = `Expected ${e.expected}, received ${e.received}`;
      break;
    case g.invalid_literal:
      n = `Invalid literal value, expected ${JSON.stringify(e.expected, V.jsonStringifyReplacer)}`;
      break;
    case g.unrecognized_keys:
      n = `Unrecognized key(s) in object: ${V.joinValues(e.keys, ", ")}`;
      break;
    case g.invalid_union:
      n = "Invalid input";
      break;
    case g.invalid_union_discriminator:
      n = `Invalid discriminator value. Expected ${V.joinValues(e.options)}`;
      break;
    case g.invalid_enum_value:
      n = `Invalid enum value. Expected ${V.joinValues(e.options)}, received '${e.received}'`;
      break;
    case g.invalid_arguments:
      n = "Invalid function arguments";
      break;
    case g.invalid_return_type:
      n = "Invalid function return type";
      break;
    case g.invalid_date:
      n = "Invalid date";
      break;
    case g.invalid_string:
      typeof e.validation == "object" ? "includes" in e.validation ? (n = `Invalid input: must include "${e.validation.includes}"`, typeof e.validation.position == "number" && (n = `${n} at one or more positions greater than or equal to ${e.validation.position}`)) : "startsWith" in e.validation ? n = `Invalid input: must start with "${e.validation.startsWith}"` : "endsWith" in e.validation ? n = `Invalid input: must end with "${e.validation.endsWith}"` : V.assertNever(e.validation) : e.validation !== "regex" ? n = `Invalid ${e.validation}` : n = "Invalid";
      break;
    case g.too_small:
      e.type === "array" ? n = `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "more than"} ${e.minimum} element(s)` : e.type === "string" ? n = `String must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "over"} ${e.minimum} character(s)` : e.type === "number" ? n = `Number must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${e.minimum}` : e.type === "bigint" ? n = `Number must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${e.minimum}` : e.type === "date" ? n = `Date must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(e.minimum))}` : n = "Invalid input";
      break;
    case g.too_big:
      e.type === "array" ? n = `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "less than"} ${e.maximum} element(s)` : e.type === "string" ? n = `String must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "under"} ${e.maximum} character(s)` : e.type === "number" ? n = `Number must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}` : e.type === "bigint" ? n = `BigInt must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}` : e.type === "date" ? n = `Date must be ${e.exact ? "exactly" : e.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(e.maximum))}` : n = "Invalid input";
      break;
    case g.custom:
      n = "Invalid input";
      break;
    case g.invalid_intersection_types:
      n = "Intersection results could not be merged";
      break;
    case g.not_multiple_of:
      n = `Number must be a multiple of ${e.multipleOf}`;
      break;
    case g.not_finite:
      n = "Number must be finite";
      break;
    default:
      n = t.defaultError, V.assertNever(e);
  }
  return { message: n };
};
let uh = Ms;
function ch() {
  return uh;
}
const dh = (e) => {
  const { data: t, path: n, errorMaps: r, issueData: l } = e, i = [...n, ...l.path || []], s = {
    ...l,
    path: i
  };
  if (l.message !== void 0)
    return {
      ...l,
      path: i,
      message: l.message
    };
  let a = "";
  const o = r.filter((u) => !!u).slice().reverse();
  for (const u of o)
    a = u(s, { data: t, defaultError: a }).message;
  return {
    ...l,
    path: i,
    message: a
  };
};
function x(e, t) {
  const n = ch(), r = dh({
    issueData: t,
    data: e.data,
    path: e.path,
    errorMaps: [
      e.common.contextualErrorMap,
      // contextual error map is first priority
      e.schemaErrorMap,
      // then schema-bound map if available
      n,
      // then global override map
      n === Ms ? void 0 : Ms
      // then global default map
    ].filter((l) => !!l)
  });
  e.common.issues.push(r);
}
class ze {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(t, n) {
    const r = [];
    for (const l of n) {
      if (l.status === "aborted")
        return z;
      l.status === "dirty" && t.dirty(), r.push(l.value);
    }
    return { status: t.value, value: r };
  }
  static async mergeObjectAsync(t, n) {
    const r = [];
    for (const l of n) {
      const i = await l.key, s = await l.value;
      r.push({
        key: i,
        value: s
      });
    }
    return ze.mergeObjectSync(t, r);
  }
  static mergeObjectSync(t, n) {
    const r = {};
    for (const l of n) {
      const { key: i, value: s } = l;
      if (i.status === "aborted" || s.status === "aborted")
        return z;
      i.status === "dirty" && t.dirty(), s.status === "dirty" && t.dirty(), i.value !== "__proto__" && (typeof s.value < "u" || l.alwaysSet) && (r[i.value] = s.value);
    }
    return { status: t.value, value: r };
  }
}
const z = Object.freeze({
  status: "aborted"
}), tr = (e) => ({ status: "dirty", value: e }), Ve = (e) => ({ status: "valid", value: e }), Jo = (e) => e.status === "aborted", qo = (e) => e.status === "dirty", Ln = (e) => e.status === "valid", Fl = (e) => typeof Promise < "u" && e instanceof Promise;
var j;
(function(e) {
  e.errToObj = (t) => typeof t == "string" ? { message: t } : t || {}, e.toString = (t) => typeof t == "string" ? t : t == null ? void 0 : t.message;
})(j || (j = {}));
class Lt {
  constructor(t, n, r, l) {
    this._cachedPath = [], this.parent = t, this.data = n, this._path = r, this._key = l;
  }
  get path() {
    return this._cachedPath.length || (Array.isArray(this._key) ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const bo = (e, t) => {
  if (Ln(t))
    return { success: !0, data: t.value };
  if (!e.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const n = new pt(e.common.issues);
      return this._error = n, this._error;
    }
  };
};
function M(e) {
  if (!e)
    return {};
  const { errorMap: t, invalid_type_error: n, required_error: r, description: l } = e;
  if (t && (n || r))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return t ? { errorMap: t, description: l } : { errorMap: (s, a) => {
    const { message: o } = e;
    return s.code === "invalid_enum_value" ? { message: o ?? a.defaultError } : typeof a.data > "u" ? { message: o ?? r ?? a.defaultError } : s.code !== "invalid_type" ? { message: a.defaultError } : { message: o ?? n ?? a.defaultError };
  }, description: l };
}
class U {
  get description() {
    return this._def.description;
  }
  _getType(t) {
    return gt(t.data);
  }
  _getOrReturnCtx(t, n) {
    return n || {
      common: t.parent.common,
      data: t.data,
      parsedType: gt(t.data),
      schemaErrorMap: this._def.errorMap,
      path: t.path,
      parent: t.parent
    };
  }
  _processInputParams(t) {
    return {
      status: new ze(),
      ctx: {
        common: t.parent.common,
        data: t.data,
        parsedType: gt(t.data),
        schemaErrorMap: this._def.errorMap,
        path: t.path,
        parent: t.parent
      }
    };
  }
  _parseSync(t) {
    const n = this._parse(t);
    if (Fl(n))
      throw new Error("Synchronous parse encountered promise.");
    return n;
  }
  _parseAsync(t) {
    const n = this._parse(t);
    return Promise.resolve(n);
  }
  parse(t, n) {
    const r = this.safeParse(t, n);
    if (r.success)
      return r.data;
    throw r.error;
  }
  safeParse(t, n) {
    const r = {
      common: {
        issues: [],
        async: (n == null ? void 0 : n.async) ?? !1,
        contextualErrorMap: n == null ? void 0 : n.errorMap
      },
      path: (n == null ? void 0 : n.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: t,
      parsedType: gt(t)
    }, l = this._parseSync({ data: t, path: r.path, parent: r });
    return bo(r, l);
  }
  "~validate"(t) {
    var r, l;
    const n = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: t,
      parsedType: gt(t)
    };
    if (!this["~standard"].async)
      try {
        const i = this._parseSync({ data: t, path: [], parent: n });
        return Ln(i) ? {
          value: i.value
        } : {
          issues: n.common.issues
        };
      } catch (i) {
        (l = (r = i == null ? void 0 : i.message) == null ? void 0 : r.toLowerCase()) != null && l.includes("encountered") && (this["~standard"].async = !0), n.common = {
          issues: [],
          async: !0
        };
      }
    return this._parseAsync({ data: t, path: [], parent: n }).then((i) => Ln(i) ? {
      value: i.value
    } : {
      issues: n.common.issues
    });
  }
  async parseAsync(t, n) {
    const r = await this.safeParseAsync(t, n);
    if (r.success)
      return r.data;
    throw r.error;
  }
  async safeParseAsync(t, n) {
    const r = {
      common: {
        issues: [],
        contextualErrorMap: n == null ? void 0 : n.errorMap,
        async: !0
      },
      path: (n == null ? void 0 : n.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: t,
      parsedType: gt(t)
    }, l = this._parse({ data: t, path: r.path, parent: r }), i = await (Fl(l) ? l : Promise.resolve(l));
    return bo(r, i);
  }
  refine(t, n) {
    const r = (l) => typeof n == "string" || typeof n > "u" ? { message: n } : typeof n == "function" ? n(l) : n;
    return this._refinement((l, i) => {
      const s = t(l), a = () => i.addIssue({
        code: g.custom,
        ...r(l)
      });
      return typeof Promise < "u" && s instanceof Promise ? s.then((o) => o ? !0 : (a(), !1)) : s ? !0 : (a(), !1);
    });
  }
  refinement(t, n) {
    return this._refinement((r, l) => t(r) ? !0 : (l.addIssue(typeof n == "function" ? n(r, l) : n), !1));
  }
  _refinement(t) {
    return new tn({
      schema: this,
      typeName: I.ZodEffects,
      effect: { type: "refinement", refinement: t }
    });
  }
  superRefine(t) {
    return this._refinement(t);
  }
  constructor(t) {
    this.spa = this.safeParseAsync, this._def = t, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this), this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (n) => this["~validate"](n)
    };
  }
  optional() {
    return ot.create(this, this._def);
  }
  nullable() {
    return nn.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return tt.create(this);
  }
  promise() {
    return Zl.create(this, this._def);
  }
  or(t) {
    return Dl.create([this, t], this._def);
  }
  and(t) {
    return $l.create(this, t, this._def);
  }
  transform(t) {
    return new tn({
      ...M(this._def),
      schema: this,
      typeName: I.ZodEffects,
      effect: { type: "transform", transform: t }
    });
  }
  default(t) {
    const n = typeof t == "function" ? t : () => t;
    return new Bl({
      ...M(this._def),
      innerType: this,
      defaultValue: n,
      typeName: I.ZodDefault
    });
  }
  brand() {
    return new Cd({
      typeName: I.ZodBranded,
      type: this,
      ...M(this._def)
    });
  }
  catch(t) {
    const n = typeof t == "function" ? t : () => t;
    return new Wl({
      ...M(this._def),
      innerType: this,
      catchValue: n,
      typeName: I.ZodCatch
    });
  }
  describe(t) {
    const n = this.constructor;
    return new n({
      ...this._def,
      description: t
    });
  }
  pipe(t) {
    return Aa.create(this, t);
  }
  readonly() {
    return Hl.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const fh = /^c[^\s-]{8,}$/i, ph = /^[0-9a-z]+$/, hh = /^[0-9A-HJKMNP-TV-Z]{26}$/i, mh = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, vh = /^[a-z0-9_-]{21}$/i, yh = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, gh = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, _h = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, kh = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let $i;
const wh = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, xh = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, Sh = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, Ch = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Eh = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, Nh = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, wd = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", Th = new RegExp(`^${wd}$`);
function xd(e) {
  let t = "[0-5]\\d";
  e.precision ? t = `${t}\\.\\d{${e.precision}}` : e.precision == null && (t = `${t}(\\.\\d+)?`);
  const n = e.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${t})${n}`;
}
function jh(e) {
  return new RegExp(`^${xd(e)}$`);
}
function Rh(e) {
  let t = `${wd}T${xd(e)}`;
  const n = [];
  return n.push(e.local ? "Z?" : "Z"), e.offset && n.push("([+-]\\d{2}:?\\d{2})"), t = `${t}(${n.join("|")})`, new RegExp(`^${t}$`);
}
function Ph(e, t) {
  return !!((t === "v4" || !t) && wh.test(e) || (t === "v6" || !t) && Sh.test(e));
}
function Oh(e, t) {
  if (!yh.test(e))
    return !1;
  try {
    const [n] = e.split(".");
    if (!n)
      return !1;
    const r = n.replace(/-/g, "+").replace(/_/g, "/").padEnd(n.length + (4 - n.length % 4) % 4, "="), l = JSON.parse(atob(r));
    return !(typeof l != "object" || l === null || "typ" in l && (l == null ? void 0 : l.typ) !== "JWT" || !l.alg || t && l.alg !== t);
  } catch {
    return !1;
  }
}
function zh(e, t) {
  return !!((t === "v4" || !t) && xh.test(e) || (t === "v6" || !t) && Ch.test(e));
}
class St extends U {
  _parse(t) {
    if (this._def.coerce && (t.data = String(t.data)), this._getType(t) !== T.string) {
      const i = this._getOrReturnCtx(t);
      return x(i, {
        code: g.invalid_type,
        expected: T.string,
        received: i.parsedType
      }), z;
    }
    const r = new ze();
    let l;
    for (const i of this._def.checks)
      if (i.kind === "min")
        t.data.length < i.value && (l = this._getOrReturnCtx(t, l), x(l, {
          code: g.too_small,
          minimum: i.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: i.message
        }), r.dirty());
      else if (i.kind === "max")
        t.data.length > i.value && (l = this._getOrReturnCtx(t, l), x(l, {
          code: g.too_big,
          maximum: i.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: i.message
        }), r.dirty());
      else if (i.kind === "length") {
        const s = t.data.length > i.value, a = t.data.length < i.value;
        (s || a) && (l = this._getOrReturnCtx(t, l), s ? x(l, {
          code: g.too_big,
          maximum: i.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: i.message
        }) : a && x(l, {
          code: g.too_small,
          minimum: i.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: i.message
        }), r.dirty());
      } else if (i.kind === "email")
        _h.test(t.data) || (l = this._getOrReturnCtx(t, l), x(l, {
          validation: "email",
          code: g.invalid_string,
          message: i.message
        }), r.dirty());
      else if (i.kind === "emoji")
        $i || ($i = new RegExp(kh, "u")), $i.test(t.data) || (l = this._getOrReturnCtx(t, l), x(l, {
          validation: "emoji",
          code: g.invalid_string,
          message: i.message
        }), r.dirty());
      else if (i.kind === "uuid")
        mh.test(t.data) || (l = this._getOrReturnCtx(t, l), x(l, {
          validation: "uuid",
          code: g.invalid_string,
          message: i.message
        }), r.dirty());
      else if (i.kind === "nanoid")
        vh.test(t.data) || (l = this._getOrReturnCtx(t, l), x(l, {
          validation: "nanoid",
          code: g.invalid_string,
          message: i.message
        }), r.dirty());
      else if (i.kind === "cuid")
        fh.test(t.data) || (l = this._getOrReturnCtx(t, l), x(l, {
          validation: "cuid",
          code: g.invalid_string,
          message: i.message
        }), r.dirty());
      else if (i.kind === "cuid2")
        ph.test(t.data) || (l = this._getOrReturnCtx(t, l), x(l, {
          validation: "cuid2",
          code: g.invalid_string,
          message: i.message
        }), r.dirty());
      else if (i.kind === "ulid")
        hh.test(t.data) || (l = this._getOrReturnCtx(t, l), x(l, {
          validation: "ulid",
          code: g.invalid_string,
          message: i.message
        }), r.dirty());
      else if (i.kind === "url")
        try {
          new URL(t.data);
        } catch {
          l = this._getOrReturnCtx(t, l), x(l, {
            validation: "url",
            code: g.invalid_string,
            message: i.message
          }), r.dirty();
        }
      else i.kind === "regex" ? (i.regex.lastIndex = 0, i.regex.test(t.data) || (l = this._getOrReturnCtx(t, l), x(l, {
        validation: "regex",
        code: g.invalid_string,
        message: i.message
      }), r.dirty())) : i.kind === "trim" ? t.data = t.data.trim() : i.kind === "includes" ? t.data.includes(i.value, i.position) || (l = this._getOrReturnCtx(t, l), x(l, {
        code: g.invalid_string,
        validation: { includes: i.value, position: i.position },
        message: i.message
      }), r.dirty()) : i.kind === "toLowerCase" ? t.data = t.data.toLowerCase() : i.kind === "toUpperCase" ? t.data = t.data.toUpperCase() : i.kind === "startsWith" ? t.data.startsWith(i.value) || (l = this._getOrReturnCtx(t, l), x(l, {
        code: g.invalid_string,
        validation: { startsWith: i.value },
        message: i.message
      }), r.dirty()) : i.kind === "endsWith" ? t.data.endsWith(i.value) || (l = this._getOrReturnCtx(t, l), x(l, {
        code: g.invalid_string,
        validation: { endsWith: i.value },
        message: i.message
      }), r.dirty()) : i.kind === "datetime" ? Rh(i).test(t.data) || (l = this._getOrReturnCtx(t, l), x(l, {
        code: g.invalid_string,
        validation: "datetime",
        message: i.message
      }), r.dirty()) : i.kind === "date" ? Th.test(t.data) || (l = this._getOrReturnCtx(t, l), x(l, {
        code: g.invalid_string,
        validation: "date",
        message: i.message
      }), r.dirty()) : i.kind === "time" ? jh(i).test(t.data) || (l = this._getOrReturnCtx(t, l), x(l, {
        code: g.invalid_string,
        validation: "time",
        message: i.message
      }), r.dirty()) : i.kind === "duration" ? gh.test(t.data) || (l = this._getOrReturnCtx(t, l), x(l, {
        validation: "duration",
        code: g.invalid_string,
        message: i.message
      }), r.dirty()) : i.kind === "ip" ? Ph(t.data, i.version) || (l = this._getOrReturnCtx(t, l), x(l, {
        validation: "ip",
        code: g.invalid_string,
        message: i.message
      }), r.dirty()) : i.kind === "jwt" ? Oh(t.data, i.alg) || (l = this._getOrReturnCtx(t, l), x(l, {
        validation: "jwt",
        code: g.invalid_string,
        message: i.message
      }), r.dirty()) : i.kind === "cidr" ? zh(t.data, i.version) || (l = this._getOrReturnCtx(t, l), x(l, {
        validation: "cidr",
        code: g.invalid_string,
        message: i.message
      }), r.dirty()) : i.kind === "base64" ? Eh.test(t.data) || (l = this._getOrReturnCtx(t, l), x(l, {
        validation: "base64",
        code: g.invalid_string,
        message: i.message
      }), r.dirty()) : i.kind === "base64url" ? Nh.test(t.data) || (l = this._getOrReturnCtx(t, l), x(l, {
        validation: "base64url",
        code: g.invalid_string,
        message: i.message
      }), r.dirty()) : V.assertNever(i);
    return { status: r.value, value: t.data };
  }
  _regex(t, n, r) {
    return this.refinement((l) => t.test(l), {
      validation: n,
      code: g.invalid_string,
      ...j.errToObj(r)
    });
  }
  _addCheck(t) {
    return new St({
      ...this._def,
      checks: [...this._def.checks, t]
    });
  }
  email(t) {
    return this._addCheck({ kind: "email", ...j.errToObj(t) });
  }
  url(t) {
    return this._addCheck({ kind: "url", ...j.errToObj(t) });
  }
  emoji(t) {
    return this._addCheck({ kind: "emoji", ...j.errToObj(t) });
  }
  uuid(t) {
    return this._addCheck({ kind: "uuid", ...j.errToObj(t) });
  }
  nanoid(t) {
    return this._addCheck({ kind: "nanoid", ...j.errToObj(t) });
  }
  cuid(t) {
    return this._addCheck({ kind: "cuid", ...j.errToObj(t) });
  }
  cuid2(t) {
    return this._addCheck({ kind: "cuid2", ...j.errToObj(t) });
  }
  ulid(t) {
    return this._addCheck({ kind: "ulid", ...j.errToObj(t) });
  }
  base64(t) {
    return this._addCheck({ kind: "base64", ...j.errToObj(t) });
  }
  base64url(t) {
    return this._addCheck({
      kind: "base64url",
      ...j.errToObj(t)
    });
  }
  jwt(t) {
    return this._addCheck({ kind: "jwt", ...j.errToObj(t) });
  }
  ip(t) {
    return this._addCheck({ kind: "ip", ...j.errToObj(t) });
  }
  cidr(t) {
    return this._addCheck({ kind: "cidr", ...j.errToObj(t) });
  }
  datetime(t) {
    return typeof t == "string" ? this._addCheck({
      kind: "datetime",
      precision: null,
      offset: !1,
      local: !1,
      message: t
    }) : this._addCheck({
      kind: "datetime",
      precision: typeof (t == null ? void 0 : t.precision) > "u" ? null : t == null ? void 0 : t.precision,
      offset: (t == null ? void 0 : t.offset) ?? !1,
      local: (t == null ? void 0 : t.local) ?? !1,
      ...j.errToObj(t == null ? void 0 : t.message)
    });
  }
  date(t) {
    return this._addCheck({ kind: "date", message: t });
  }
  time(t) {
    return typeof t == "string" ? this._addCheck({
      kind: "time",
      precision: null,
      message: t
    }) : this._addCheck({
      kind: "time",
      precision: typeof (t == null ? void 0 : t.precision) > "u" ? null : t == null ? void 0 : t.precision,
      ...j.errToObj(t == null ? void 0 : t.message)
    });
  }
  duration(t) {
    return this._addCheck({ kind: "duration", ...j.errToObj(t) });
  }
  regex(t, n) {
    return this._addCheck({
      kind: "regex",
      regex: t,
      ...j.errToObj(n)
    });
  }
  includes(t, n) {
    return this._addCheck({
      kind: "includes",
      value: t,
      position: n == null ? void 0 : n.position,
      ...j.errToObj(n == null ? void 0 : n.message)
    });
  }
  startsWith(t, n) {
    return this._addCheck({
      kind: "startsWith",
      value: t,
      ...j.errToObj(n)
    });
  }
  endsWith(t, n) {
    return this._addCheck({
      kind: "endsWith",
      value: t,
      ...j.errToObj(n)
    });
  }
  min(t, n) {
    return this._addCheck({
      kind: "min",
      value: t,
      ...j.errToObj(n)
    });
  }
  max(t, n) {
    return this._addCheck({
      kind: "max",
      value: t,
      ...j.errToObj(n)
    });
  }
  length(t, n) {
    return this._addCheck({
      kind: "length",
      value: t,
      ...j.errToObj(n)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(t) {
    return this.min(1, j.errToObj(t));
  }
  trim() {
    return new St({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new St({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new St({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((t) => t.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((t) => t.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((t) => t.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((t) => t.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((t) => t.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((t) => t.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((t) => t.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((t) => t.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((t) => t.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((t) => t.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((t) => t.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((t) => t.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((t) => t.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((t) => t.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((t) => t.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((t) => t.kind === "base64url");
  }
  get minLength() {
    let t = null;
    for (const n of this._def.checks)
      n.kind === "min" && (t === null || n.value > t) && (t = n.value);
    return t;
  }
  get maxLength() {
    let t = null;
    for (const n of this._def.checks)
      n.kind === "max" && (t === null || n.value < t) && (t = n.value);
    return t;
  }
}
St.create = (e) => new St({
  checks: [],
  typeName: I.ZodString,
  coerce: (e == null ? void 0 : e.coerce) ?? !1,
  ...M(e)
});
function Ih(e, t) {
  const n = (e.toString().split(".")[1] || "").length, r = (t.toString().split(".")[1] || "").length, l = n > r ? n : r, i = Number.parseInt(e.toFixed(l).replace(".", "")), s = Number.parseInt(t.toFixed(l).replace(".", ""));
  return i % s / 10 ** l;
}
class Mn extends U {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(t) {
    if (this._def.coerce && (t.data = Number(t.data)), this._getType(t) !== T.number) {
      const i = this._getOrReturnCtx(t);
      return x(i, {
        code: g.invalid_type,
        expected: T.number,
        received: i.parsedType
      }), z;
    }
    let r;
    const l = new ze();
    for (const i of this._def.checks)
      i.kind === "int" ? V.isInteger(t.data) || (r = this._getOrReturnCtx(t, r), x(r, {
        code: g.invalid_type,
        expected: "integer",
        received: "float",
        message: i.message
      }), l.dirty()) : i.kind === "min" ? (i.inclusive ? t.data < i.value : t.data <= i.value) && (r = this._getOrReturnCtx(t, r), x(r, {
        code: g.too_small,
        minimum: i.value,
        type: "number",
        inclusive: i.inclusive,
        exact: !1,
        message: i.message
      }), l.dirty()) : i.kind === "max" ? (i.inclusive ? t.data > i.value : t.data >= i.value) && (r = this._getOrReturnCtx(t, r), x(r, {
        code: g.too_big,
        maximum: i.value,
        type: "number",
        inclusive: i.inclusive,
        exact: !1,
        message: i.message
      }), l.dirty()) : i.kind === "multipleOf" ? Ih(t.data, i.value) !== 0 && (r = this._getOrReturnCtx(t, r), x(r, {
        code: g.not_multiple_of,
        multipleOf: i.value,
        message: i.message
      }), l.dirty()) : i.kind === "finite" ? Number.isFinite(t.data) || (r = this._getOrReturnCtx(t, r), x(r, {
        code: g.not_finite,
        message: i.message
      }), l.dirty()) : V.assertNever(i);
    return { status: l.value, value: t.data };
  }
  gte(t, n) {
    return this.setLimit("min", t, !0, j.toString(n));
  }
  gt(t, n) {
    return this.setLimit("min", t, !1, j.toString(n));
  }
  lte(t, n) {
    return this.setLimit("max", t, !0, j.toString(n));
  }
  lt(t, n) {
    return this.setLimit("max", t, !1, j.toString(n));
  }
  setLimit(t, n, r, l) {
    return new Mn({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: t,
          value: n,
          inclusive: r,
          message: j.toString(l)
        }
      ]
    });
  }
  _addCheck(t) {
    return new Mn({
      ...this._def,
      checks: [...this._def.checks, t]
    });
  }
  int(t) {
    return this._addCheck({
      kind: "int",
      message: j.toString(t)
    });
  }
  positive(t) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: j.toString(t)
    });
  }
  negative(t) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: j.toString(t)
    });
  }
  nonpositive(t) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: j.toString(t)
    });
  }
  nonnegative(t) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: j.toString(t)
    });
  }
  multipleOf(t, n) {
    return this._addCheck({
      kind: "multipleOf",
      value: t,
      message: j.toString(n)
    });
  }
  finite(t) {
    return this._addCheck({
      kind: "finite",
      message: j.toString(t)
    });
  }
  safe(t) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: j.toString(t)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: j.toString(t)
    });
  }
  get minValue() {
    let t = null;
    for (const n of this._def.checks)
      n.kind === "min" && (t === null || n.value > t) && (t = n.value);
    return t;
  }
  get maxValue() {
    let t = null;
    for (const n of this._def.checks)
      n.kind === "max" && (t === null || n.value < t) && (t = n.value);
    return t;
  }
  get isInt() {
    return !!this._def.checks.find((t) => t.kind === "int" || t.kind === "multipleOf" && V.isInteger(t.value));
  }
  get isFinite() {
    let t = null, n = null;
    for (const r of this._def.checks) {
      if (r.kind === "finite" || r.kind === "int" || r.kind === "multipleOf")
        return !0;
      r.kind === "min" ? (n === null || r.value > n) && (n = r.value) : r.kind === "max" && (t === null || r.value < t) && (t = r.value);
    }
    return Number.isFinite(n) && Number.isFinite(t);
  }
}
Mn.create = (e) => new Mn({
  checks: [],
  typeName: I.ZodNumber,
  coerce: (e == null ? void 0 : e.coerce) || !1,
  ...M(e)
});
class jr extends U {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(t) {
    if (this._def.coerce)
      try {
        t.data = BigInt(t.data);
      } catch {
        return this._getInvalidInput(t);
      }
    if (this._getType(t) !== T.bigint)
      return this._getInvalidInput(t);
    let r;
    const l = new ze();
    for (const i of this._def.checks)
      i.kind === "min" ? (i.inclusive ? t.data < i.value : t.data <= i.value) && (r = this._getOrReturnCtx(t, r), x(r, {
        code: g.too_small,
        type: "bigint",
        minimum: i.value,
        inclusive: i.inclusive,
        message: i.message
      }), l.dirty()) : i.kind === "max" ? (i.inclusive ? t.data > i.value : t.data >= i.value) && (r = this._getOrReturnCtx(t, r), x(r, {
        code: g.too_big,
        type: "bigint",
        maximum: i.value,
        inclusive: i.inclusive,
        message: i.message
      }), l.dirty()) : i.kind === "multipleOf" ? t.data % i.value !== BigInt(0) && (r = this._getOrReturnCtx(t, r), x(r, {
        code: g.not_multiple_of,
        multipleOf: i.value,
        message: i.message
      }), l.dirty()) : V.assertNever(i);
    return { status: l.value, value: t.data };
  }
  _getInvalidInput(t) {
    const n = this._getOrReturnCtx(t);
    return x(n, {
      code: g.invalid_type,
      expected: T.bigint,
      received: n.parsedType
    }), z;
  }
  gte(t, n) {
    return this.setLimit("min", t, !0, j.toString(n));
  }
  gt(t, n) {
    return this.setLimit("min", t, !1, j.toString(n));
  }
  lte(t, n) {
    return this.setLimit("max", t, !0, j.toString(n));
  }
  lt(t, n) {
    return this.setLimit("max", t, !1, j.toString(n));
  }
  setLimit(t, n, r, l) {
    return new jr({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: t,
          value: n,
          inclusive: r,
          message: j.toString(l)
        }
      ]
    });
  }
  _addCheck(t) {
    return new jr({
      ...this._def,
      checks: [...this._def.checks, t]
    });
  }
  positive(t) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: j.toString(t)
    });
  }
  negative(t) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: j.toString(t)
    });
  }
  nonpositive(t) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: j.toString(t)
    });
  }
  nonnegative(t) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: j.toString(t)
    });
  }
  multipleOf(t, n) {
    return this._addCheck({
      kind: "multipleOf",
      value: t,
      message: j.toString(n)
    });
  }
  get minValue() {
    let t = null;
    for (const n of this._def.checks)
      n.kind === "min" && (t === null || n.value > t) && (t = n.value);
    return t;
  }
  get maxValue() {
    let t = null;
    for (const n of this._def.checks)
      n.kind === "max" && (t === null || n.value < t) && (t = n.value);
    return t;
  }
}
jr.create = (e) => new jr({
  checks: [],
  typeName: I.ZodBigInt,
  coerce: (e == null ? void 0 : e.coerce) ?? !1,
  ...M(e)
});
class Fs extends U {
  _parse(t) {
    if (this._def.coerce && (t.data = !!t.data), this._getType(t) !== T.boolean) {
      const r = this._getOrReturnCtx(t);
      return x(r, {
        code: g.invalid_type,
        expected: T.boolean,
        received: r.parsedType
      }), z;
    }
    return Ve(t.data);
  }
}
Fs.create = (e) => new Fs({
  typeName: I.ZodBoolean,
  coerce: (e == null ? void 0 : e.coerce) || !1,
  ...M(e)
});
class Al extends U {
  _parse(t) {
    if (this._def.coerce && (t.data = new Date(t.data)), this._getType(t) !== T.date) {
      const i = this._getOrReturnCtx(t);
      return x(i, {
        code: g.invalid_type,
        expected: T.date,
        received: i.parsedType
      }), z;
    }
    if (Number.isNaN(t.data.getTime())) {
      const i = this._getOrReturnCtx(t);
      return x(i, {
        code: g.invalid_date
      }), z;
    }
    const r = new ze();
    let l;
    for (const i of this._def.checks)
      i.kind === "min" ? t.data.getTime() < i.value && (l = this._getOrReturnCtx(t, l), x(l, {
        code: g.too_small,
        message: i.message,
        inclusive: !0,
        exact: !1,
        minimum: i.value,
        type: "date"
      }), r.dirty()) : i.kind === "max" ? t.data.getTime() > i.value && (l = this._getOrReturnCtx(t, l), x(l, {
        code: g.too_big,
        message: i.message,
        inclusive: !0,
        exact: !1,
        maximum: i.value,
        type: "date"
      }), r.dirty()) : V.assertNever(i);
    return {
      status: r.value,
      value: new Date(t.data.getTime())
    };
  }
  _addCheck(t) {
    return new Al({
      ...this._def,
      checks: [...this._def.checks, t]
    });
  }
  min(t, n) {
    return this._addCheck({
      kind: "min",
      value: t.getTime(),
      message: j.toString(n)
    });
  }
  max(t, n) {
    return this._addCheck({
      kind: "max",
      value: t.getTime(),
      message: j.toString(n)
    });
  }
  get minDate() {
    let t = null;
    for (const n of this._def.checks)
      n.kind === "min" && (t === null || n.value > t) && (t = n.value);
    return t != null ? new Date(t) : null;
  }
  get maxDate() {
    let t = null;
    for (const n of this._def.checks)
      n.kind === "max" && (t === null || n.value < t) && (t = n.value);
    return t != null ? new Date(t) : null;
  }
}
Al.create = (e) => new Al({
  checks: [],
  coerce: (e == null ? void 0 : e.coerce) || !1,
  typeName: I.ZodDate,
  ...M(e)
});
class eu extends U {
  _parse(t) {
    if (this._getType(t) !== T.symbol) {
      const r = this._getOrReturnCtx(t);
      return x(r, {
        code: g.invalid_type,
        expected: T.symbol,
        received: r.parsedType
      }), z;
    }
    return Ve(t.data);
  }
}
eu.create = (e) => new eu({
  typeName: I.ZodSymbol,
  ...M(e)
});
class As extends U {
  _parse(t) {
    if (this._getType(t) !== T.undefined) {
      const r = this._getOrReturnCtx(t);
      return x(r, {
        code: g.invalid_type,
        expected: T.undefined,
        received: r.parsedType
      }), z;
    }
    return Ve(t.data);
  }
}
As.create = (e) => new As({
  typeName: I.ZodUndefined,
  ...M(e)
});
class Ds extends U {
  _parse(t) {
    if (this._getType(t) !== T.null) {
      const r = this._getOrReturnCtx(t);
      return x(r, {
        code: g.invalid_type,
        expected: T.null,
        received: r.parsedType
      }), z;
    }
    return Ve(t.data);
  }
}
Ds.create = (e) => new Ds({
  typeName: I.ZodNull,
  ...M(e)
});
class tu extends U {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(t) {
    return Ve(t.data);
  }
}
tu.create = (e) => new tu({
  typeName: I.ZodAny,
  ...M(e)
});
class nu extends U {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(t) {
    return Ve(t.data);
  }
}
nu.create = (e) => new nu({
  typeName: I.ZodUnknown,
  ...M(e)
});
class Mt extends U {
  _parse(t) {
    const n = this._getOrReturnCtx(t);
    return x(n, {
      code: g.invalid_type,
      expected: T.never,
      received: n.parsedType
    }), z;
  }
}
Mt.create = (e) => new Mt({
  typeName: I.ZodNever,
  ...M(e)
});
class ru extends U {
  _parse(t) {
    if (this._getType(t) !== T.undefined) {
      const r = this._getOrReturnCtx(t);
      return x(r, {
        code: g.invalid_type,
        expected: T.void,
        received: r.parsedType
      }), z;
    }
    return Ve(t.data);
  }
}
ru.create = (e) => new ru({
  typeName: I.ZodVoid,
  ...M(e)
});
class tt extends U {
  _parse(t) {
    const { ctx: n, status: r } = this._processInputParams(t), l = this._def;
    if (n.parsedType !== T.array)
      return x(n, {
        code: g.invalid_type,
        expected: T.array,
        received: n.parsedType
      }), z;
    if (l.exactLength !== null) {
      const s = n.data.length > l.exactLength.value, a = n.data.length < l.exactLength.value;
      (s || a) && (x(n, {
        code: s ? g.too_big : g.too_small,
        minimum: a ? l.exactLength.value : void 0,
        maximum: s ? l.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: l.exactLength.message
      }), r.dirty());
    }
    if (l.minLength !== null && n.data.length < l.minLength.value && (x(n, {
      code: g.too_small,
      minimum: l.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: l.minLength.message
    }), r.dirty()), l.maxLength !== null && n.data.length > l.maxLength.value && (x(n, {
      code: g.too_big,
      maximum: l.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: l.maxLength.message
    }), r.dirty()), n.common.async)
      return Promise.all([...n.data].map((s, a) => l.type._parseAsync(new Lt(n, s, n.path, a)))).then((s) => ze.mergeArray(r, s));
    const i = [...n.data].map((s, a) => l.type._parseSync(new Lt(n, s, n.path, a)));
    return ze.mergeArray(r, i);
  }
  get element() {
    return this._def.type;
  }
  min(t, n) {
    return new tt({
      ...this._def,
      minLength: { value: t, message: j.toString(n) }
    });
  }
  max(t, n) {
    return new tt({
      ...this._def,
      maxLength: { value: t, message: j.toString(n) }
    });
  }
  length(t, n) {
    return new tt({
      ...this._def,
      exactLength: { value: t, message: j.toString(n) }
    });
  }
  nonempty(t) {
    return this.min(1, t);
  }
}
tt.create = (e, t) => new tt({
  type: e,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: I.ZodArray,
  ...M(t)
});
function on(e) {
  if (e instanceof re) {
    const t = {};
    for (const n in e.shape) {
      const r = e.shape[n];
      t[n] = ot.create(on(r));
    }
    return new re({
      ...e._def,
      shape: () => t
    });
  } else return e instanceof tt ? new tt({
    ...e._def,
    type: on(e.element)
  }) : e instanceof ot ? ot.create(on(e.unwrap())) : e instanceof nn ? nn.create(on(e.unwrap())) : e instanceof bt ? bt.create(e.items.map((t) => on(t))) : e;
}
class re extends U {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const t = this._def.shape(), n = V.objectKeys(t);
    return this._cached = { shape: t, keys: n }, this._cached;
  }
  _parse(t) {
    if (this._getType(t) !== T.object) {
      const u = this._getOrReturnCtx(t);
      return x(u, {
        code: g.invalid_type,
        expected: T.object,
        received: u.parsedType
      }), z;
    }
    const { status: r, ctx: l } = this._processInputParams(t), { shape: i, keys: s } = this._getCached(), a = [];
    if (!(this._def.catchall instanceof Mt && this._def.unknownKeys === "strip"))
      for (const u in l.data)
        s.includes(u) || a.push(u);
    const o = [];
    for (const u of s) {
      const h = i[u], p = l.data[u];
      o.push({
        key: { status: "valid", value: u },
        value: h._parse(new Lt(l, p, l.path, u)),
        alwaysSet: u in l.data
      });
    }
    if (this._def.catchall instanceof Mt) {
      const u = this._def.unknownKeys;
      if (u === "passthrough")
        for (const h of a)
          o.push({
            key: { status: "valid", value: h },
            value: { status: "valid", value: l.data[h] }
          });
      else if (u === "strict")
        a.length > 0 && (x(l, {
          code: g.unrecognized_keys,
          keys: a
        }), r.dirty());
      else if (u !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const u = this._def.catchall;
      for (const h of a) {
        const p = l.data[h];
        o.push({
          key: { status: "valid", value: h },
          value: u._parse(
            new Lt(l, p, l.path, h)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: h in l.data
        });
      }
    }
    return l.common.async ? Promise.resolve().then(async () => {
      const u = [];
      for (const h of o) {
        const p = await h.key, m = await h.value;
        u.push({
          key: p,
          value: m,
          alwaysSet: h.alwaysSet
        });
      }
      return u;
    }).then((u) => ze.mergeObjectSync(r, u)) : ze.mergeObjectSync(r, o);
  }
  get shape() {
    return this._def.shape();
  }
  strict(t) {
    return j.errToObj, new re({
      ...this._def,
      unknownKeys: "strict",
      ...t !== void 0 ? {
        errorMap: (n, r) => {
          var i, s;
          const l = ((s = (i = this._def).errorMap) == null ? void 0 : s.call(i, n, r).message) ?? r.defaultError;
          return n.code === "unrecognized_keys" ? {
            message: j.errToObj(t).message ?? l
          } : {
            message: l
          };
        }
      } : {}
    });
  }
  strip() {
    return new re({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new re({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(t) {
    return new re({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...t
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(t) {
    return new re({
      unknownKeys: t._def.unknownKeys,
      catchall: t._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...t._def.shape()
      }),
      typeName: I.ZodObject
    });
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(t, n) {
    return this.augment({ [t]: n });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(t) {
    return new re({
      ...this._def,
      catchall: t
    });
  }
  pick(t) {
    const n = {};
    for (const r of V.objectKeys(t))
      t[r] && this.shape[r] && (n[r] = this.shape[r]);
    return new re({
      ...this._def,
      shape: () => n
    });
  }
  omit(t) {
    const n = {};
    for (const r of V.objectKeys(this.shape))
      t[r] || (n[r] = this.shape[r]);
    return new re({
      ...this._def,
      shape: () => n
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return on(this);
  }
  partial(t) {
    const n = {};
    for (const r of V.objectKeys(this.shape)) {
      const l = this.shape[r];
      t && !t[r] ? n[r] = l : n[r] = l.optional();
    }
    return new re({
      ...this._def,
      shape: () => n
    });
  }
  required(t) {
    const n = {};
    for (const r of V.objectKeys(this.shape))
      if (t && !t[r])
        n[r] = this.shape[r];
      else {
        let i = this.shape[r];
        for (; i instanceof ot; )
          i = i._def.innerType;
        n[r] = i;
      }
    return new re({
      ...this._def,
      shape: () => n
    });
  }
  keyof() {
    return Sd(V.objectKeys(this.shape));
  }
}
re.create = (e, t) => new re({
  shape: () => e,
  unknownKeys: "strip",
  catchall: Mt.create(),
  typeName: I.ZodObject,
  ...M(t)
});
re.strictCreate = (e, t) => new re({
  shape: () => e,
  unknownKeys: "strict",
  catchall: Mt.create(),
  typeName: I.ZodObject,
  ...M(t)
});
re.lazycreate = (e, t) => new re({
  shape: e,
  unknownKeys: "strip",
  catchall: Mt.create(),
  typeName: I.ZodObject,
  ...M(t)
});
class Dl extends U {
  _parse(t) {
    const { ctx: n } = this._processInputParams(t), r = this._def.options;
    function l(i) {
      for (const a of i)
        if (a.result.status === "valid")
          return a.result;
      for (const a of i)
        if (a.result.status === "dirty")
          return n.common.issues.push(...a.ctx.common.issues), a.result;
      const s = i.map((a) => new pt(a.ctx.common.issues));
      return x(n, {
        code: g.invalid_union,
        unionErrors: s
      }), z;
    }
    if (n.common.async)
      return Promise.all(r.map(async (i) => {
        const s = {
          ...n,
          common: {
            ...n.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await i._parseAsync({
            data: n.data,
            path: n.path,
            parent: s
          }),
          ctx: s
        };
      })).then(l);
    {
      let i;
      const s = [];
      for (const o of r) {
        const u = {
          ...n,
          common: {
            ...n.common,
            issues: []
          },
          parent: null
        }, h = o._parseSync({
          data: n.data,
          path: n.path,
          parent: u
        });
        if (h.status === "valid")
          return h;
        h.status === "dirty" && !i && (i = { result: h, ctx: u }), u.common.issues.length && s.push(u.common.issues);
      }
      if (i)
        return n.common.issues.push(...i.ctx.common.issues), i.result;
      const a = s.map((o) => new pt(o));
      return x(n, {
        code: g.invalid_union,
        unionErrors: a
      }), z;
    }
  }
  get options() {
    return this._def.options;
  }
}
Dl.create = (e, t) => new Dl({
  options: e,
  typeName: I.ZodUnion,
  ...M(t)
});
const nt = (e) => e instanceof Ul ? nt(e.schema) : e instanceof tn ? nt(e.innerType()) : e instanceof Vl ? [e.value] : e instanceof en ? e.options : e instanceof Us ? V.objectValues(e.enum) : e instanceof Bl ? nt(e._def.innerType) : e instanceof As ? [void 0] : e instanceof Ds ? [null] : e instanceof ot ? [void 0, ...nt(e.unwrap())] : e instanceof nn ? [null, ...nt(e.unwrap())] : e instanceof Cd || e instanceof Hl ? nt(e.unwrap()) : e instanceof Wl ? nt(e._def.innerType) : [];
class Fa extends U {
  _parse(t) {
    const { ctx: n } = this._processInputParams(t);
    if (n.parsedType !== T.object)
      return x(n, {
        code: g.invalid_type,
        expected: T.object,
        received: n.parsedType
      }), z;
    const r = this.discriminator, l = n.data[r], i = this.optionsMap.get(l);
    return i ? n.common.async ? i._parseAsync({
      data: n.data,
      path: n.path,
      parent: n
    }) : i._parseSync({
      data: n.data,
      path: n.path,
      parent: n
    }) : (x(n, {
      code: g.invalid_union_discriminator,
      options: Array.from(this.optionsMap.keys()),
      path: [r]
    }), z);
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(t, n, r) {
    const l = /* @__PURE__ */ new Map();
    for (const i of n) {
      const s = nt(i.shape[t]);
      if (!s.length)
        throw new Error(`A discriminator value for key \`${t}\` could not be extracted from all schema options`);
      for (const a of s) {
        if (l.has(a))
          throw new Error(`Discriminator property ${String(t)} has duplicate value ${String(a)}`);
        l.set(a, i);
      }
    }
    return new Fa({
      typeName: I.ZodDiscriminatedUnion,
      discriminator: t,
      options: n,
      optionsMap: l,
      ...M(r)
    });
  }
}
function $s(e, t) {
  const n = gt(e), r = gt(t);
  if (e === t)
    return { valid: !0, data: e };
  if (n === T.object && r === T.object) {
    const l = V.objectKeys(t), i = V.objectKeys(e).filter((a) => l.indexOf(a) !== -1), s = { ...e, ...t };
    for (const a of i) {
      const o = $s(e[a], t[a]);
      if (!o.valid)
        return { valid: !1 };
      s[a] = o.data;
    }
    return { valid: !0, data: s };
  } else if (n === T.array && r === T.array) {
    if (e.length !== t.length)
      return { valid: !1 };
    const l = [];
    for (let i = 0; i < e.length; i++) {
      const s = e[i], a = t[i], o = $s(s, a);
      if (!o.valid)
        return { valid: !1 };
      l.push(o.data);
    }
    return { valid: !0, data: l };
  } else return n === T.date && r === T.date && +e == +t ? { valid: !0, data: e } : { valid: !1 };
}
class $l extends U {
  _parse(t) {
    const { status: n, ctx: r } = this._processInputParams(t), l = (i, s) => {
      if (Jo(i) || Jo(s))
        return z;
      const a = $s(i.value, s.value);
      return a.valid ? ((qo(i) || qo(s)) && n.dirty(), { status: n.value, value: a.data }) : (x(r, {
        code: g.invalid_intersection_types
      }), z);
    };
    return r.common.async ? Promise.all([
      this._def.left._parseAsync({
        data: r.data,
        path: r.path,
        parent: r
      }),
      this._def.right._parseAsync({
        data: r.data,
        path: r.path,
        parent: r
      })
    ]).then(([i, s]) => l(i, s)) : l(this._def.left._parseSync({
      data: r.data,
      path: r.path,
      parent: r
    }), this._def.right._parseSync({
      data: r.data,
      path: r.path,
      parent: r
    }));
  }
}
$l.create = (e, t, n) => new $l({
  left: e,
  right: t,
  typeName: I.ZodIntersection,
  ...M(n)
});
class bt extends U {
  _parse(t) {
    const { status: n, ctx: r } = this._processInputParams(t);
    if (r.parsedType !== T.array)
      return x(r, {
        code: g.invalid_type,
        expected: T.array,
        received: r.parsedType
      }), z;
    if (r.data.length < this._def.items.length)
      return x(r, {
        code: g.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), z;
    !this._def.rest && r.data.length > this._def.items.length && (x(r, {
      code: g.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), n.dirty());
    const i = [...r.data].map((s, a) => {
      const o = this._def.items[a] || this._def.rest;
      return o ? o._parse(new Lt(r, s, r.path, a)) : null;
    }).filter((s) => !!s);
    return r.common.async ? Promise.all(i).then((s) => ze.mergeArray(n, s)) : ze.mergeArray(n, i);
  }
  get items() {
    return this._def.items;
  }
  rest(t) {
    return new bt({
      ...this._def,
      rest: t
    });
  }
}
bt.create = (e, t) => {
  if (!Array.isArray(e))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new bt({
    items: e,
    typeName: I.ZodTuple,
    rest: null,
    ...M(t)
  });
};
class lu extends U {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(t) {
    const { status: n, ctx: r } = this._processInputParams(t);
    if (r.parsedType !== T.map)
      return x(r, {
        code: g.invalid_type,
        expected: T.map,
        received: r.parsedType
      }), z;
    const l = this._def.keyType, i = this._def.valueType, s = [...r.data.entries()].map(([a, o], u) => ({
      key: l._parse(new Lt(r, a, r.path, [u, "key"])),
      value: i._parse(new Lt(r, o, r.path, [u, "value"]))
    }));
    if (r.common.async) {
      const a = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const o of s) {
          const u = await o.key, h = await o.value;
          if (u.status === "aborted" || h.status === "aborted")
            return z;
          (u.status === "dirty" || h.status === "dirty") && n.dirty(), a.set(u.value, h.value);
        }
        return { status: n.value, value: a };
      });
    } else {
      const a = /* @__PURE__ */ new Map();
      for (const o of s) {
        const u = o.key, h = o.value;
        if (u.status === "aborted" || h.status === "aborted")
          return z;
        (u.status === "dirty" || h.status === "dirty") && n.dirty(), a.set(u.value, h.value);
      }
      return { status: n.value, value: a };
    }
  }
}
lu.create = (e, t, n) => new lu({
  valueType: t,
  keyType: e,
  typeName: I.ZodMap,
  ...M(n)
});
class Rr extends U {
  _parse(t) {
    const { status: n, ctx: r } = this._processInputParams(t);
    if (r.parsedType !== T.set)
      return x(r, {
        code: g.invalid_type,
        expected: T.set,
        received: r.parsedType
      }), z;
    const l = this._def;
    l.minSize !== null && r.data.size < l.minSize.value && (x(r, {
      code: g.too_small,
      minimum: l.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: l.minSize.message
    }), n.dirty()), l.maxSize !== null && r.data.size > l.maxSize.value && (x(r, {
      code: g.too_big,
      maximum: l.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: l.maxSize.message
    }), n.dirty());
    const i = this._def.valueType;
    function s(o) {
      const u = /* @__PURE__ */ new Set();
      for (const h of o) {
        if (h.status === "aborted")
          return z;
        h.status === "dirty" && n.dirty(), u.add(h.value);
      }
      return { status: n.value, value: u };
    }
    const a = [...r.data.values()].map((o, u) => i._parse(new Lt(r, o, r.path, u)));
    return r.common.async ? Promise.all(a).then((o) => s(o)) : s(a);
  }
  min(t, n) {
    return new Rr({
      ...this._def,
      minSize: { value: t, message: j.toString(n) }
    });
  }
  max(t, n) {
    return new Rr({
      ...this._def,
      maxSize: { value: t, message: j.toString(n) }
    });
  }
  size(t, n) {
    return this.min(t, n).max(t, n);
  }
  nonempty(t) {
    return this.min(1, t);
  }
}
Rr.create = (e, t) => new Rr({
  valueType: e,
  minSize: null,
  maxSize: null,
  typeName: I.ZodSet,
  ...M(t)
});
class Ul extends U {
  get schema() {
    return this._def.getter();
  }
  _parse(t) {
    const { ctx: n } = this._processInputParams(t);
    return this._def.getter()._parse({ data: n.data, path: n.path, parent: n });
  }
}
Ul.create = (e, t) => new Ul({
  getter: e,
  typeName: I.ZodLazy,
  ...M(t)
});
class Vl extends U {
  _parse(t) {
    if (t.data !== this._def.value) {
      const n = this._getOrReturnCtx(t);
      return x(n, {
        received: n.data,
        code: g.invalid_literal,
        expected: this._def.value
      }), z;
    }
    return { status: "valid", value: t.data };
  }
  get value() {
    return this._def.value;
  }
}
Vl.create = (e, t) => new Vl({
  value: e,
  typeName: I.ZodLiteral,
  ...M(t)
});
function Sd(e, t) {
  return new en({
    values: e,
    typeName: I.ZodEnum,
    ...M(t)
  });
}
class en extends U {
  _parse(t) {
    if (typeof t.data != "string") {
      const n = this._getOrReturnCtx(t), r = this._def.values;
      return x(n, {
        expected: V.joinValues(r),
        received: n.parsedType,
        code: g.invalid_type
      }), z;
    }
    if (this._cache || (this._cache = new Set(this._def.values)), !this._cache.has(t.data)) {
      const n = this._getOrReturnCtx(t), r = this._def.values;
      return x(n, {
        received: n.data,
        code: g.invalid_enum_value,
        options: r
      }), z;
    }
    return Ve(t.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const t = {};
    for (const n of this._def.values)
      t[n] = n;
    return t;
  }
  get Values() {
    const t = {};
    for (const n of this._def.values)
      t[n] = n;
    return t;
  }
  get Enum() {
    const t = {};
    for (const n of this._def.values)
      t[n] = n;
    return t;
  }
  extract(t, n = this._def) {
    return en.create(t, {
      ...this._def,
      ...n
    });
  }
  exclude(t, n = this._def) {
    return en.create(this.options.filter((r) => !t.includes(r)), {
      ...this._def,
      ...n
    });
  }
}
en.create = Sd;
class Us extends U {
  _parse(t) {
    const n = V.getValidEnumValues(this._def.values), r = this._getOrReturnCtx(t);
    if (r.parsedType !== T.string && r.parsedType !== T.number) {
      const l = V.objectValues(n);
      return x(r, {
        expected: V.joinValues(l),
        received: r.parsedType,
        code: g.invalid_type
      }), z;
    }
    if (this._cache || (this._cache = new Set(V.getValidEnumValues(this._def.values))), !this._cache.has(t.data)) {
      const l = V.objectValues(n);
      return x(r, {
        received: r.data,
        code: g.invalid_enum_value,
        options: l
      }), z;
    }
    return Ve(t.data);
  }
  get enum() {
    return this._def.values;
  }
}
Us.create = (e, t) => new Us({
  values: e,
  typeName: I.ZodNativeEnum,
  ...M(t)
});
class Zl extends U {
  unwrap() {
    return this._def.type;
  }
  _parse(t) {
    const { ctx: n } = this._processInputParams(t);
    if (n.parsedType !== T.promise && n.common.async === !1)
      return x(n, {
        code: g.invalid_type,
        expected: T.promise,
        received: n.parsedType
      }), z;
    const r = n.parsedType === T.promise ? n.data : Promise.resolve(n.data);
    return Ve(r.then((l) => this._def.type.parseAsync(l, {
      path: n.path,
      errorMap: n.common.contextualErrorMap
    })));
  }
}
Zl.create = (e, t) => new Zl({
  type: e,
  typeName: I.ZodPromise,
  ...M(t)
});
class tn extends U {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === I.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(t) {
    const { status: n, ctx: r } = this._processInputParams(t), l = this._def.effect || null, i = {
      addIssue: (s) => {
        x(r, s), s.fatal ? n.abort() : n.dirty();
      },
      get path() {
        return r.path;
      }
    };
    if (i.addIssue = i.addIssue.bind(i), l.type === "preprocess") {
      const s = l.transform(r.data, i);
      if (r.common.async)
        return Promise.resolve(s).then(async (a) => {
          if (n.value === "aborted")
            return z;
          const o = await this._def.schema._parseAsync({
            data: a,
            path: r.path,
            parent: r
          });
          return o.status === "aborted" ? z : o.status === "dirty" || n.value === "dirty" ? tr(o.value) : o;
        });
      {
        if (n.value === "aborted")
          return z;
        const a = this._def.schema._parseSync({
          data: s,
          path: r.path,
          parent: r
        });
        return a.status === "aborted" ? z : a.status === "dirty" || n.value === "dirty" ? tr(a.value) : a;
      }
    }
    if (l.type === "refinement") {
      const s = (a) => {
        const o = l.refinement(a, i);
        if (r.common.async)
          return Promise.resolve(o);
        if (o instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return a;
      };
      if (r.common.async === !1) {
        const a = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r
        });
        return a.status === "aborted" ? z : (a.status === "dirty" && n.dirty(), s(a.value), { status: n.value, value: a.value });
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((a) => a.status === "aborted" ? z : (a.status === "dirty" && n.dirty(), s(a.value).then(() => ({ status: n.value, value: a.value }))));
    }
    if (l.type === "transform")
      if (r.common.async === !1) {
        const s = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r
        });
        if (!Ln(s))
          return z;
        const a = l.transform(s.value, i);
        if (a instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: n.value, value: a };
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((s) => Ln(s) ? Promise.resolve(l.transform(s.value, i)).then((a) => ({
          status: n.value,
          value: a
        })) : z);
    V.assertNever(l);
  }
}
tn.create = (e, t, n) => new tn({
  schema: e,
  typeName: I.ZodEffects,
  effect: t,
  ...M(n)
});
tn.createWithPreprocess = (e, t, n) => new tn({
  schema: t,
  effect: { type: "preprocess", transform: e },
  typeName: I.ZodEffects,
  ...M(n)
});
class ot extends U {
  _parse(t) {
    return this._getType(t) === T.undefined ? Ve(void 0) : this._def.innerType._parse(t);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ot.create = (e, t) => new ot({
  innerType: e,
  typeName: I.ZodOptional,
  ...M(t)
});
class nn extends U {
  _parse(t) {
    return this._getType(t) === T.null ? Ve(null) : this._def.innerType._parse(t);
  }
  unwrap() {
    return this._def.innerType;
  }
}
nn.create = (e, t) => new nn({
  innerType: e,
  typeName: I.ZodNullable,
  ...M(t)
});
class Bl extends U {
  _parse(t) {
    const { ctx: n } = this._processInputParams(t);
    let r = n.data;
    return n.parsedType === T.undefined && (r = this._def.defaultValue()), this._def.innerType._parse({
      data: r,
      path: n.path,
      parent: n
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
Bl.create = (e, t) => new Bl({
  innerType: e,
  typeName: I.ZodDefault,
  defaultValue: typeof t.default == "function" ? t.default : () => t.default,
  ...M(t)
});
class Wl extends U {
  _parse(t) {
    const { ctx: n } = this._processInputParams(t), r = {
      ...n,
      common: {
        ...n.common,
        issues: []
      }
    }, l = this._def.innerType._parse({
      data: r.data,
      path: r.path,
      parent: {
        ...r
      }
    });
    return Fl(l) ? l.then((i) => ({
      status: "valid",
      value: i.status === "valid" ? i.value : this._def.catchValue({
        get error() {
          return new pt(r.common.issues);
        },
        input: r.data
      })
    })) : {
      status: "valid",
      value: l.status === "valid" ? l.value : this._def.catchValue({
        get error() {
          return new pt(r.common.issues);
        },
        input: r.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
Wl.create = (e, t) => new Wl({
  innerType: e,
  typeName: I.ZodCatch,
  catchValue: typeof t.catch == "function" ? t.catch : () => t.catch,
  ...M(t)
});
class iu extends U {
  _parse(t) {
    if (this._getType(t) !== T.nan) {
      const r = this._getOrReturnCtx(t);
      return x(r, {
        code: g.invalid_type,
        expected: T.nan,
        received: r.parsedType
      }), z;
    }
    return { status: "valid", value: t.data };
  }
}
iu.create = (e) => new iu({
  typeName: I.ZodNaN,
  ...M(e)
});
class Cd extends U {
  _parse(t) {
    const { ctx: n } = this._processInputParams(t), r = n.data;
    return this._def.type._parse({
      data: r,
      path: n.path,
      parent: n
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class Aa extends U {
  _parse(t) {
    const { status: n, ctx: r } = this._processInputParams(t);
    if (r.common.async)
      return (async () => {
        const i = await this._def.in._parseAsync({
          data: r.data,
          path: r.path,
          parent: r
        });
        return i.status === "aborted" ? z : i.status === "dirty" ? (n.dirty(), tr(i.value)) : this._def.out._parseAsync({
          data: i.value,
          path: r.path,
          parent: r
        });
      })();
    {
      const l = this._def.in._parseSync({
        data: r.data,
        path: r.path,
        parent: r
      });
      return l.status === "aborted" ? z : l.status === "dirty" ? (n.dirty(), {
        status: "dirty",
        value: l.value
      }) : this._def.out._parseSync({
        data: l.value,
        path: r.path,
        parent: r
      });
    }
  }
  static create(t, n) {
    return new Aa({
      in: t,
      out: n,
      typeName: I.ZodPipeline
    });
  }
}
class Hl extends U {
  _parse(t) {
    const n = this._def.innerType._parse(t), r = (l) => (Ln(l) && (l.value = Object.freeze(l.value)), l);
    return Fl(n) ? n.then((l) => r(l)) : r(n);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Hl.create = (e, t) => new Hl({
  innerType: e,
  typeName: I.ZodReadonly,
  ...M(t)
});
var I;
(function(e) {
  e.ZodString = "ZodString", e.ZodNumber = "ZodNumber", e.ZodNaN = "ZodNaN", e.ZodBigInt = "ZodBigInt", e.ZodBoolean = "ZodBoolean", e.ZodDate = "ZodDate", e.ZodSymbol = "ZodSymbol", e.ZodUndefined = "ZodUndefined", e.ZodNull = "ZodNull", e.ZodAny = "ZodAny", e.ZodUnknown = "ZodUnknown", e.ZodNever = "ZodNever", e.ZodVoid = "ZodVoid", e.ZodArray = "ZodArray", e.ZodObject = "ZodObject", e.ZodUnion = "ZodUnion", e.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", e.ZodIntersection = "ZodIntersection", e.ZodTuple = "ZodTuple", e.ZodRecord = "ZodRecord", e.ZodMap = "ZodMap", e.ZodSet = "ZodSet", e.ZodFunction = "ZodFunction", e.ZodLazy = "ZodLazy", e.ZodLiteral = "ZodLiteral", e.ZodEnum = "ZodEnum", e.ZodEffects = "ZodEffects", e.ZodNativeEnum = "ZodNativeEnum", e.ZodOptional = "ZodOptional", e.ZodNullable = "ZodNullable", e.ZodDefault = "ZodDefault", e.ZodCatch = "ZodCatch", e.ZodPromise = "ZodPromise", e.ZodBranded = "ZodBranded", e.ZodPipeline = "ZodPipeline", e.ZodReadonly = "ZodReadonly";
})(I || (I = {}));
const B = St.create, Lh = Mn.create, Mh = Fs.create;
Mt.create;
const rn = tt.create, $ = re.create;
Dl.create;
const Ed = Fa.create;
$l.create;
bt.create;
const Nd = Ul.create, fe = Vl.create, Fn = en.create;
Zl.create;
ot.create;
nn.create;
const Td = Nd(
  () => $({
    id: B(),
    name: B(),
    path: B(),
    type: Fn(["file", "folder"]),
    status: Fn(["M", "A", "D", "R"]).optional(),
    children: rn(Td).optional()
  })
), Da = Nd(
  () => $({
    id: B(),
    label: B(),
    type: Fn(["head", "group", "localBranch", "remote", "remoteBranch", "tag"]),
    children: rn(Da).optional()
  })
), Vs = $({
  id: B(),
  shortHash: B(),
  message: B(),
  author: B(),
  date: B(),
  branchId: B(),
  graphColor: B().optional(),
  graphLane: Lh().optional(),
  graphShape: Fn(["straight", "mergeLeft", "mergeRight"]).optional(),
  changedFiles: rn(Td)
}), jd = $({
  searchText: B(),
  branch: B(),
  user: B(),
  date: B(),
  paths: B()
}), Rd = $({
  selectedRefId: B(),
  selectedCommitId: B()
}), Fh = $({
  workspace: $({
    repositoryRoot: B()
  }),
  refs: rn(Da),
  commits: rn(Vs),
  selection: Rd,
  filters: jd
}), Ah = Ed("type", [
  $({
    type: fe("bootstrap"),
    payload: Fh
  }),
  $({
    type: fe("refsUpdated"),
    payload: $({
      refs: rn(Da)
    })
  }),
  $({
    type: fe("commitsUpdated"),
    payload: $({
      refId: B(),
      commits: rn(Vs)
    })
  }),
  $({
    type: fe("commitDetailsUpdated"),
    payload: $({
      commitId: B(),
      commit: Vs.nullable()
    })
  }),
  $({
    type: fe("selectionUpdated"),
    payload: Rd
  }),
  $({
    type: fe("loadingStateChanged"),
    payload: $({
      area: Fn(["refs", "commits", "details"]),
      isLoading: Mh()
    })
  }),
  $({
    type: fe("errorOccurred"),
    payload: $({
      message: B()
    })
  })
]);
Ed("type", [
  $({
    type: fe("ready")
  }),
  $({
    type: fe("log"),
    payload: $({
      level: Fn(["info", "warn", "error"]),
      message: B()
    })
  }),
  $({
    type: fe("selectRef"),
    payload: $({
      refId: B()
    })
  }),
  $({
    type: fe("selectCommit"),
    payload: $({
      commitId: B()
    })
  }),
  $({
    type: fe("setFilters"),
    payload: jd
  }),
  $({
    type: fe("refresh")
  }),
  $({
    type: fe("loadMoreCommits")
  }),
  $({
    type: fe("openFile"),
    payload: $({
      path: B()
    })
  }),
  $({
    type: fe("openDiff"),
    payload: $({
      path: B()
    })
  }),
  $({
    type: fe("runCommand"),
    payload: $({
      command: B()
    })
  })
]);
const su = (e) => {
  let t;
  const n = /* @__PURE__ */ new Set(), r = (u, h) => {
    const p = typeof u == "function" ? u(t) : u;
    if (!Object.is(p, t)) {
      const m = t;
      t = h ?? (typeof p != "object" || p === null) ? p : Object.assign({}, t, p), n.forEach((k) => k(t, m));
    }
  }, l = () => t, a = { setState: r, getState: l, getInitialState: () => o, subscribe: (u) => (n.add(u), () => n.delete(u)) }, o = t = e(r, l, a);
  return a;
}, Dh = (e) => e ? su(e) : su, $h = (e) => e;
function Uh(e, t = $h) {
  const n = Xn.useSyncExternalStore(
    e.subscribe,
    Xn.useCallback(() => t(e.getState()), [e, t]),
    Xn.useCallback(() => t(e.getInitialState()), [e, t])
  );
  return Xn.useDebugValue(n), n;
}
const au = (e) => {
  const t = Dh(e), n = (r) => Uh(t, r);
  return Object.assign(n, t), n;
}, Vh = (e) => e ? au(e) : au, Zh = {
  selectedRefId: "",
  selectedCommitId: ""
}, Bh = {
  searchText: "",
  branch: "",
  user: "",
  date: "",
  paths: ""
}, Wh = ["head-main", "local-group", "remote-group", "origin", "tags-group"], ue = Vh((e, t) => ({
  refs: [],
  commits: [],
  selectedCommit: null,
  selection: Zh,
  filters: Bh,
  expandedRefs: Wh,
  expandedFiles: [],
  selectedFileId: "",
  loading: {
    refs: !1,
    commits: !1,
    details: !1
  },
  errorMessage: "",
  bootstrap: (n) => {
    const r = Ui(n.commits, n.selection.selectedCommitId);
    e({
      refs: n.refs,
      commits: n.commits,
      selectedCommit: r.selectedCommit,
      selection: n.selection,
      filters: n.filters,
      expandedFiles: r.expandedFiles,
      selectedFileId: r.selectedFileId,
      errorMessage: ""
    });
  },
  setRefs: (n) => e({ refs: n }),
  setCommits: (n, r) => {
    const l = t().selection.selectedCommitId, i = Ui(r, l);
    e({
      commits: r,
      selectedCommit: i.selectedCommit,
      expandedFiles: i.expandedFiles,
      selectedFileId: i.selectedFileId
    });
  },
  setCommitDetails: (n, r) => {
    const l = Ui(r ? [r] : [], n);
    e({
      selectedCommit: r,
      expandedFiles: r ? l.expandedFiles : [],
      selectedFileId: r ? l.selectedFileId : ""
    });
  },
  setSelection: (n) => e({ selection: n }),
  setFilters: (n) => e({ filters: n }),
  setLoadingState: (n, r) => e((l) => ({
    loading: {
      ...l.loading,
      [n]: r
    }
  })),
  setErrorMessage: (n) => e({ errorMessage: n }),
  toggleRefExpanded: (n) => e((r) => ({
    expandedRefs: ou(r.expandedRefs, n)
  })),
  toggleFileExpanded: (n) => e((r) => ({
    expandedFiles: ou(r.expandedFiles, n)
  })),
  selectFile: (n) => e({ selectedFileId: n })
}));
function ou(e, t) {
  return e.includes(t) ? e.filter((n) => n !== t) : [...e, t];
}
function Ui(e, t) {
  if (!e.length)
    return {
      selectedCommit: null,
      expandedFiles: [],
      selectedFileId: ""
    };
  const n = e.find((s) => s.id === t) ?? e[0], r = Pd(n.changedFiles), l = r.filter((s) => s.type === "folder").map((s) => s.id), i = r.find((s) => s.type === "file");
  return {
    selectedCommit: n,
    expandedFiles: l,
    selectedFileId: (i == null ? void 0 : i.id) ?? ""
  };
}
function Pd(e) {
  var n;
  const t = [];
  for (const r of e)
    t.push(r), (n = r.children) != null && n.length && t.push(...Pd(r.children));
  return t;
}
function Hh() {
  const e = (t) => {
    const n = Ah.safeParse(t.data);
    if (!n.success) {
      ue.getState().setErrorMessage("Received invalid payload from extension host.");
      return;
    }
    Qh(n.data);
  };
  return window.addEventListener("message", e), () => window.removeEventListener("message", e);
}
function Qh(e) {
  const t = ue.getState();
  switch (e.type) {
    case "bootstrap":
      t.bootstrap(e.payload);
      return;
    case "refsUpdated":
      t.setRefs(e.payload.refs);
      return;
    case "commitsUpdated":
      t.setCommits(e.payload.refId, e.payload.commits);
      return;
    case "commitDetailsUpdated":
      t.setCommitDetails(e.payload.commitId, e.payload.commit);
      return;
    case "selectionUpdated":
      t.setSelection(e.payload);
      return;
    case "loadingStateChanged":
      t.setLoadingState(e.payload.area, e.payload.isLoading);
      return;
    case "errorOccurred":
      t.setErrorMessage(e.payload.message);
      return;
  }
}
const Vi = window.__INTELLIJ_GIT_LOG_VSCODE_API__ || (window.acquireVsCodeApi ? window.acquireVsCodeApi() : void 0);
function ui(e) {
  Vi == null || Vi.postMessage(e);
}
function Kh() {
  const e = ue((r) => r.filters), t = ue((r) => r.setFilters), n = (r) => (l) => {
    const i = {
      ...e,
      [r]: l.target.value
    };
    t(i), ui({
      type: "setFilters",
      payload: i
    });
  };
  return /* @__PURE__ */ _.jsxs("div", { className: "toolbar", children: [
    /* @__PURE__ */ _.jsx("input", { type: "text", placeholder: "Text or hash", value: e.searchText, onChange: n("searchText") }),
    /* @__PURE__ */ _.jsx("select", { value: e.branch, onChange: n("branch"), children: /* @__PURE__ */ _.jsx("option", { value: "", children: "Branch" }) }),
    /* @__PURE__ */ _.jsx("select", { value: e.user, onChange: n("user"), children: /* @__PURE__ */ _.jsx("option", { value: "", children: "User" }) }),
    /* @__PURE__ */ _.jsx("select", { value: e.date, onChange: n("date"), children: /* @__PURE__ */ _.jsx("option", { value: "", children: "Date" }) }),
    /* @__PURE__ */ _.jsx("select", { value: e.paths, onChange: n("paths"), children: /* @__PURE__ */ _.jsx("option", { value: "", children: "Paths" }) })
  ] });
}
function Yh({ commit: e }) {
  const t = 14 + (e.graphLane ?? 0) * 18, n = e.graphColor ?? "#2f80ed";
  return /* @__PURE__ */ _.jsxs(_.Fragment, { children: [
    /* @__PURE__ */ _.jsx("span", { className: "graph-line", style: { left: `${t}px`, background: n } }),
    e.graphShape === "mergeLeft" ? /* @__PURE__ */ _.jsx("span", { className: "graph-line diagonal-left", style: { left: `${t - 16}px`, background: n } }) : null,
    e.graphShape === "mergeRight" ? /* @__PURE__ */ _.jsx("span", { className: "graph-line diagonal-right", style: { left: `${t}px`, background: n } }) : null,
    /* @__PURE__ */ _.jsx("span", { className: "graph-dot", style: { left: `${t - 4}px`, background: n } })
  ] });
}
function Gh() {
  const e = ue((r) => r.commits), t = ue((r) => r.selection.selectedCommitId), n = ue((r) => r.loading.commits);
  return /* @__PURE__ */ _.jsxs(_.Fragment, { children: [
    /* @__PURE__ */ _.jsxs("div", { className: "commit-header", children: [
      /* @__PURE__ */ _.jsx("div", { children: "Graph" }),
      /* @__PURE__ */ _.jsx("div", { children: "Commit message" }),
      /* @__PURE__ */ _.jsx("div", { children: "Author" }),
      /* @__PURE__ */ _.jsx("div", { children: "Date" })
    ] }),
    /* @__PURE__ */ _.jsxs("div", { className: "commit-list", children: [
      n ? /* @__PURE__ */ _.jsx("div", { className: "empty-state", children: "Loading commits..." }) : null,
      !n && e.length === 0 ? /* @__PURE__ */ _.jsx("div", { className: "empty-state", children: "No commits for the selected reference." }) : null,
      n ? null : e.map((r) => /* @__PURE__ */ _.jsx(Xh, { commit: r, selected: t === r.id }, r.id))
    ] })
  ] });
}
function Xh({ commit: e, selected: t }) {
  return /* @__PURE__ */ _.jsxs(
    "div",
    {
      className: `commit-row ${t ? "selected" : ""}`.trim(),
      onClick: () => ui({
        type: "selectCommit",
        payload: {
          commitId: e.id
        }
      }),
      children: [
        /* @__PURE__ */ _.jsx("div", { className: "commit-cell graph-cell", children: /* @__PURE__ */ _.jsx(Yh, { commit: e }) }),
        /* @__PURE__ */ _.jsxs("div", { className: "commit-cell commit-message", children: [
          /* @__PURE__ */ _.jsx("span", { children: e.message }),
          /* @__PURE__ */ _.jsx("span", { className: "commit-hash", children: e.shortHash })
        ] }),
        /* @__PURE__ */ _.jsx("div", { className: "commit-cell secondary", children: e.author }),
        /* @__PURE__ */ _.jsx("div", { className: "commit-cell secondary", children: e.date })
      ]
    }
  );
}
function Od({ title: e, children: t }) {
  return /* @__PURE__ */ _.jsxs("section", { className: "panel", children: [
    /* @__PURE__ */ _.jsx("div", { className: "panel-title", children: e }),
    /* @__PURE__ */ _.jsx("div", { className: "panel-body", children: t })
  ] });
}
function zd({ node: e, depth: t }) {
  var u, h;
  const n = ue((p) => p.selectedFileId), r = ue((p) => p.expandedFiles), l = ue((p) => p.toggleFileExpanded), i = ue((p) => p.selectFile), s = !!((u = e.children) != null && u.length), a = r.includes(e.id), o = n === e.id;
  return /* @__PURE__ */ _.jsxs("div", { className: "tree-node", children: [
    /* @__PURE__ */ _.jsxs(
      "div",
      {
        className: `file-row ${e.type === "file" ? "clickable" : ""} ${o ? "selected" : ""}`.trim(),
        onClick: () => {
          e.type === "file" && i(e.id);
        },
        children: [
          Array.from({ length: t }).map((p, m) => /* @__PURE__ */ _.jsx("span", { className: "indent" }, `${e.id}-indent-${m}`)),
          /* @__PURE__ */ _.jsx(
            "span",
            {
              className: `toggle ${s ? "" : "spacer"}`.trim(),
              onClick: (p) => {
                p.stopPropagation(), s && l(e.id);
              },
              children: s ? a ? "▾" : "▸" : "•"
            }
          ),
          /* @__PURE__ */ _.jsx("span", { className: `file-status ${e.status ? `status-${e.status}` : ""}`.trim(), children: e.status ?? "" }),
          /* @__PURE__ */ _.jsx("span", { className: "file-icon", children: e.type === "folder" ? "📁" : "📄" }),
          /* @__PURE__ */ _.jsx("span", { className: "file-label", children: e.name })
        ]
      }
    ),
    s && a ? (h = e.children) == null ? void 0 : h.map((p) => /* @__PURE__ */ _.jsx(zd, { node: p, depth: t + 1 }, p.id)) : null
  ] });
}
function Jh() {
  const e = ue((t) => t.selectedCommit);
  return e ? /* @__PURE__ */ _.jsxs("div", { className: "details", children: [
    /* @__PURE__ */ _.jsx("div", { className: "detail-title", children: e.message }),
    /* @__PURE__ */ _.jsxs("div", { className: "detail-row", children: [
      "Hash: ",
      /* @__PURE__ */ _.jsx("span", { className: "secondary", children: e.shortHash })
    ] }),
    /* @__PURE__ */ _.jsxs("div", { className: "detail-row", children: [
      "Author: ",
      /* @__PURE__ */ _.jsx("span", { className: "secondary", children: e.author })
    ] }),
    /* @__PURE__ */ _.jsxs("div", { className: "detail-row", children: [
      "Date: ",
      /* @__PURE__ */ _.jsx("span", { className: "secondary", children: e.date })
    ] })
  ] }) : /* @__PURE__ */ _.jsxs("div", { className: "details", children: [
    /* @__PURE__ */ _.jsx("div", { className: "detail-title", children: "Commit Details" }),
    /* @__PURE__ */ _.jsx("div", { className: "detail-row", children: "No commit selected." })
  ] });
}
function qh() {
  const e = ue((t) => t.selectedCommit);
  return /* @__PURE__ */ _.jsxs(Od, { title: "Changed Files", children: [
    /* @__PURE__ */ _.jsx("div", { className: "file-tree", children: e ? e.changedFiles.map((t) => /* @__PURE__ */ _.jsx(zd, { node: t, depth: 0 }, t.id)) : /* @__PURE__ */ _.jsx("div", { className: "empty-state", children: "Select a commit to inspect changed files." }) }),
    /* @__PURE__ */ _.jsx(Jh, {})
  ] });
}
function bh() {
  const e = ue((t) => t.refs);
  return /* @__PURE__ */ _.jsx(Od, { title: "References", children: /* @__PURE__ */ _.jsx("div", { className: "tree", children: e.map((t) => /* @__PURE__ */ _.jsx(Id, { node: t, depth: 0 }, t.id)) }) });
}
function Id({ node: e, depth: t }) {
  var u, h;
  const n = ue((p) => p.selection.selectedRefId), r = ue((p) => p.expandedRefs), l = ue((p) => p.toggleRefExpanded), i = !!((u = e.children) != null && u.length), s = r.includes(e.id), a = n === e.id, o = em(e.type);
  return /* @__PURE__ */ _.jsxs("div", { className: "tree-node", children: [
    /* @__PURE__ */ _.jsxs(
      "div",
      {
        className: `tree-row ${o ? "clickable" : ""} ${a ? "selected" : ""}`.trim(),
        onClick: () => {
          o && ui({
            type: "selectRef",
            payload: {
              refId: e.id
            }
          });
        },
        children: [
          Array.from({ length: t }).map((p, m) => /* @__PURE__ */ _.jsx("span", { className: "indent" }, `${e.id}-indent-${m}`)),
          /* @__PURE__ */ _.jsx(
            "span",
            {
              className: `toggle ${i ? "" : "spacer"}`.trim(),
              onClick: (p) => {
                p.stopPropagation(), i && l(e.id);
              },
              children: i ? s ? "▾" : "▸" : "•"
            }
          ),
          /* @__PURE__ */ _.jsx("span", { className: "ref-icon", children: tm(e.type) }),
          /* @__PURE__ */ _.jsx("span", { className: "ref-label", children: e.label }),
          e.type === "head" ? /* @__PURE__ */ _.jsx("span", { className: "ref-type", children: "current" }) : null
        ]
      }
    ),
    i && s ? (h = e.children) == null ? void 0 : h.map((p) => /* @__PURE__ */ _.jsx(Id, { node: p, depth: t + 1 }, p.id)) : null
  ] });
}
function em(e) {
  return e === "localBranch" || e === "remoteBranch" || e === "tag";
}
function tm(e) {
  switch (e) {
    case "head":
      return "●";
    case "group":
      return "▦";
    case "remote":
      return "☁";
    case "localBranch":
    case "remoteBranch":
      return "⑂";
    case "tag":
      return "🏷";
    default:
      return "•";
  }
}
function nm() {
  const e = ue((t) => t.errorMessage);
  return Kl.useEffect(() => {
    const t = Hh();
    return ui({ type: "ready" }), t;
  }, []), /* @__PURE__ */ _.jsxs("div", { className: "layout-shell", children: [
    e ? /* @__PURE__ */ _.jsx("div", { className: "app-banner", children: e }) : null,
    /* @__PURE__ */ _.jsxs("div", { className: "layout", children: [
      /* @__PURE__ */ _.jsx(bh, {}),
      /* @__PURE__ */ _.jsxs("section", { className: "panel", children: [
        /* @__PURE__ */ _.jsx("div", { className: "panel-title", children: "Commit Log" }),
        /* @__PURE__ */ _.jsxs("div", { className: "panel-body", children: [
          /* @__PURE__ */ _.jsx(Kh, {}),
          /* @__PURE__ */ _.jsx(Gh, {})
        ] })
      ] }),
      /* @__PURE__ */ _.jsx(qh, {})
    ] })
  ] });
}
Zi.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ _.jsx(Xn.StrictMode, { children: /* @__PURE__ */ _.jsx(nm, {}) })
);

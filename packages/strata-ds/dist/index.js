var zh = Object.defineProperty, _h = Object.defineProperties;
var Wh = Object.getOwnPropertyDescriptors;
var Sr = Object.getOwnPropertySymbols;
var Ma = Object.prototype.hasOwnProperty, Ra = Object.prototype.propertyIsEnumerable;
var Ui = Math.pow, Aa = (e, t, n) => t in e ? zh(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, v = (e, t) => {
  for (var n in t || (t = {}))
    Ma.call(t, n) && Aa(e, n, t[n]);
  if (Sr)
    for (var n of Sr(t))
      Ra.call(t, n) && Aa(e, n, t[n]);
  return e;
}, E = (e, t) => _h(e, Wh(t));
var Ki = (e) => typeof e == "symbol" ? e : e + "", k = (e, t) => {
  var n = {};
  for (var r in e)
    Ma.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && Sr)
    for (var r of Sr(e))
      t.indexOf(r) < 0 && Ra.call(e, r) && (n[r] = e[r]);
  return n;
};
var st = (e, t, n) => new Promise((r, i) => {
  var o = (l) => {
    try {
      a(n.next(l));
    } catch (u) {
      i(u);
    }
  }, s = (l) => {
    try {
      a(n.throw(l));
    } catch (u) {
      i(u);
    }
  }, a = (l) => l.done ? r(l.value) : Promise.resolve(l.value).then(o, s);
  a((n = n.apply(e, t)).next());
});
import { jsx as x, jsxs as _, Fragment as ai } from "react/jsx-runtime";
import * as S from "react";
import O, { useRef as z, useCallback as re, useEffect as be, useState as ne, useMemo as se, useLayoutEffect as li, useContext as ee, createContext as pe, forwardRef as Gc, Fragment as ke, isValidElement as ci, cloneElement as Yc, createElement as Xc, useId as ye, useSyncExternalStore as Hh, useReducer as us, createRef as Uh, useInsertionEffect as ds, Children as Kh, Component as Gh } from "react";
import * as _r from "react-dom";
import { flushSync as nt, createPortal as qc } from "react-dom";
import { tokens as US } from "./tokens.js";
import Y, { clsx as Re } from "clsx";
import { twMerge as Yh } from "tailwind-merge";
import { ChevronDown as Zc, Check as fs, ChevronRight as Xh, X as qh, Star as Zh } from "lucide-react";
const Qh = typeof document != "undefined" ? O.useLayoutEffect : () => {
}, Gt = (e) => {
  var t;
  return (t = e == null ? void 0 : e.ownerDocument) !== null && t !== void 0 ? t : document;
}, Jt = (e) => e && "window" in e && e.window === e ? e : Gt(e).defaultView || window;
function Jh(e) {
  return e !== null && typeof e == "object" && "nodeType" in e && typeof e.nodeType == "number";
}
function ep(e) {
  return Jh(e) && e.nodeType === Node.DOCUMENT_FRAGMENT_NODE && "host" in e;
}
let tp = !1;
function hs() {
  return tp;
}
function Qc(e, t) {
  if (!hs()) return t && e ? e.contains(t) : !1;
  if (!e || !t) return !1;
  let n = t;
  for (; n !== null; ) {
    if (n === e) return !0;
    n.tagName === "SLOT" && n.assignedSlot ? n = n.assignedSlot.parentNode : ep(n) ? n = n.host : n = n.parentNode;
  }
  return !1;
}
const ko = (e = document) => {
  var t;
  if (!hs()) return e.activeElement;
  let n = e.activeElement;
  for (; n && "shadowRoot" in n && (!((t = n.shadowRoot) === null || t === void 0) && t.activeElement); ) n = n.shadowRoot.activeElement;
  return n;
};
function Jc(e) {
  return hs() && e.target.shadowRoot && e.composedPath ? e.composedPath()[0] : e.target;
}
function np(e) {
  if (rp()) e.focus({
    preventScroll: !0
  });
  else {
    let t = ip(e);
    e.focus(), op(t);
  }
}
let Tr = null;
function rp() {
  if (Tr == null) {
    Tr = !1;
    try {
      document.createElement("div").focus({
        get preventScroll() {
          return Tr = !0, !0;
        }
      });
    } catch (e) {
    }
  }
  return Tr;
}
function ip(e) {
  let t = e.parentNode, n = [], r = document.scrollingElement || document.documentElement;
  for (; t instanceof HTMLElement && t !== r; )
    (t.offsetHeight < t.scrollHeight || t.offsetWidth < t.scrollWidth) && n.push({
      element: t,
      scrollTop: t.scrollTop,
      scrollLeft: t.scrollLeft
    }), t = t.parentNode;
  return r instanceof HTMLElement && n.push({
    element: r,
    scrollTop: r.scrollTop,
    scrollLeft: r.scrollLeft
  }), n;
}
function op(e) {
  for (let { element: t, scrollTop: n, scrollLeft: r } of e)
    t.scrollTop = n, t.scrollLeft = r;
}
function ui(e) {
  var t;
  if (typeof window == "undefined" || window.navigator == null) return !1;
  let n = (t = window.navigator.userAgentData) === null || t === void 0 ? void 0 : t.brands;
  return Array.isArray(n) && n.some((r) => e.test(r.brand)) || e.test(window.navigator.userAgent);
}
function ps(e) {
  var t;
  return typeof window != "undefined" && window.navigator != null ? e.test(((t = window.navigator.userAgentData) === null || t === void 0 ? void 0 : t.platform) || window.navigator.platform) : !1;
}
function $t(e) {
  if (process.env.NODE_ENV === "test") return e;
  let t = null;
  return () => (t == null && (t = e()), t);
}
const Yn = $t(function() {
  return ps(/^Mac/i);
}), sp = $t(function() {
  return ps(/^iPhone/i);
}), eu = $t(function() {
  return ps(/^iPad/i) || // iPadOS 13 lies and says it's a Mac, but we can distinguish by detecting touch support.
  Yn() && navigator.maxTouchPoints > 1;
}), ap = $t(function() {
  return sp() || eu();
});
$t(function() {
  return Yn() || ap();
});
const lp = $t(function() {
  return ui(/AppleWebKit/i) && !cp();
}), cp = $t(function() {
  return ui(/Chrome/i);
}), up = $t(function() {
  return ui(/Android/i);
}), dp = $t(function() {
  return ui(/Firefox/i);
});
function Xn(e, t, n = !0) {
  var r, i;
  let { metaKey: o, ctrlKey: s, altKey: a, shiftKey: l } = t;
  dp() && (!((i = window.event) === null || i === void 0 || (r = i.type) === null || r === void 0) && r.startsWith("key")) && e.target === "_blank" && (Yn() ? o = !0 : s = !0);
  let u = lp() && Yn() && !eu() && process.env.NODE_ENV !== "test" ? new KeyboardEvent("keydown", {
    keyIdentifier: "Enter",
    metaKey: o,
    ctrlKey: s,
    altKey: a,
    shiftKey: l
  }) : new MouseEvent("click", {
    metaKey: o,
    ctrlKey: s,
    altKey: a,
    shiftKey: l,
    detail: 1,
    bubbles: !0,
    cancelable: !0
  });
  Xn.isOpening = n, np(e), e.dispatchEvent(u), Xn.isOpening = !1;
}
Xn.isOpening = !1;
function tu() {
  let e = z(/* @__PURE__ */ new Map()), t = re((i, o, s, a) => {
    let l = a != null && a.once ? (...u) => {
      e.current.delete(s), s(...u);
    } : s;
    e.current.set(s, {
      type: o,
      eventTarget: i,
      fn: l,
      options: a
    }), i.addEventListener(o, l, a);
  }, []), n = re((i, o, s, a) => {
    var l;
    let u = ((l = e.current.get(s)) === null || l === void 0 ? void 0 : l.fn) || s;
    i.removeEventListener(o, u, a), e.current.delete(s);
  }, []), r = re(() => {
    e.current.forEach((i, o) => {
      n(i.eventTarget, i.type, o, i.options);
    });
  }, [
    n
  ]);
  return be(() => r, [
    r
  ]), {
    addGlobalListener: t,
    removeGlobalListener: n,
    removeAllGlobalListeners: r
  };
}
function fp(e) {
  return e.pointerType === "" && e.isTrusted ? !0 : up() && e.pointerType ? e.type === "click" && e.buttons === 1 : e.detail === 0 && !e.pointerType;
}
function nu(e) {
  let t = e;
  return t.nativeEvent = e, t.isDefaultPrevented = () => t.defaultPrevented, t.isPropagationStopped = () => t.cancelBubble, t.persist = () => {
  }, t;
}
function hp(e, t) {
  Object.defineProperty(e, "target", {
    value: t
  }), Object.defineProperty(e, "currentTarget", {
    value: t
  });
}
function ru(e) {
  let t = z({
    isFocused: !1,
    observer: null
  });
  return Qh(() => {
    const n = t.current;
    return () => {
      n.observer && (n.observer.disconnect(), n.observer = null);
    };
  }, []), re((n) => {
    if (n.target instanceof HTMLButtonElement || n.target instanceof HTMLInputElement || n.target instanceof HTMLTextAreaElement || n.target instanceof HTMLSelectElement) {
      t.current.isFocused = !0;
      let r = n.target, i = (o) => {
        if (t.current.isFocused = !1, r.disabled) {
          let s = nu(o);
          e == null || e(s);
        }
        t.current.observer && (t.current.observer.disconnect(), t.current.observer = null);
      };
      r.addEventListener("focusout", i, {
        once: !0
      }), t.current.observer = new MutationObserver(() => {
        if (t.current.isFocused && r.disabled) {
          var o;
          (o = t.current.observer) === null || o === void 0 || o.disconnect();
          let s = r === document.activeElement ? null : document.activeElement;
          r.dispatchEvent(new FocusEvent("blur", {
            relatedTarget: s
          })), r.dispatchEvent(new FocusEvent("focusout", {
            bubbles: !0,
            relatedTarget: s
          }));
        }
      }), t.current.observer.observe(r, {
        attributes: !0,
        attributeFilter: [
          "disabled"
        ]
      });
    }
  }, [
    e
  ]);
}
let pp = !1, ar = null, Co = /* @__PURE__ */ new Set(), Wn = /* @__PURE__ */ new Map(), on = !1, Oo = !1;
const mp = {
  Tab: !0,
  Escape: !0
};
function ms(e, t) {
  for (let n of Co) n(e, t);
}
function gp(e) {
  return !(e.metaKey || !Yn() && e.altKey || e.ctrlKey || e.key === "Control" || e.key === "Shift" || e.key === "Meta");
}
function Wr(e) {
  on = !0, !Xn.isOpening && gp(e) && (ar = "keyboard", ms("keyboard", e));
}
function Xe(e) {
  ar = "pointer", "pointerType" in e && e.pointerType, (e.type === "mousedown" || e.type === "pointerdown") && (on = !0, ms("pointer", e));
}
function iu(e) {
  !Xn.isOpening && fp(e) && (on = !0, ar = "virtual");
}
function ou(e) {
  e.target === window || e.target === document || pp || !e.isTrusted || (!on && !Oo && (ar = "virtual", ms("virtual", e)), on = !1, Oo = !1);
}
function su() {
  on = !1, Oo = !0;
}
function $o(e) {
  if (typeof window == "undefined" || typeof document == "undefined" || Wn.get(Jt(e))) return;
  const t = Jt(e), n = Gt(e);
  let r = t.HTMLElement.prototype.focus;
  t.HTMLElement.prototype.focus = function() {
    on = !0, r.apply(this, arguments);
  }, n.addEventListener("keydown", Wr, !0), n.addEventListener("keyup", Wr, !0), n.addEventListener("click", iu, !0), t.addEventListener("focus", ou, !0), t.addEventListener("blur", su, !1), typeof PointerEvent != "undefined" ? (n.addEventListener("pointerdown", Xe, !0), n.addEventListener("pointermove", Xe, !0), n.addEventListener("pointerup", Xe, !0)) : process.env.NODE_ENV === "test" && (n.addEventListener("mousedown", Xe, !0), n.addEventListener("mousemove", Xe, !0), n.addEventListener("mouseup", Xe, !0)), t.addEventListener("beforeunload", () => {
    au(e);
  }, {
    once: !0
  }), Wn.set(t, {
    focus: r
  });
}
const au = (e, t) => {
  const n = Jt(e), r = Gt(e);
  t && r.removeEventListener("DOMContentLoaded", t), Wn.has(n) && (n.HTMLElement.prototype.focus = Wn.get(n).focus, r.removeEventListener("keydown", Wr, !0), r.removeEventListener("keyup", Wr, !0), r.removeEventListener("click", iu, !0), n.removeEventListener("focus", ou, !0), n.removeEventListener("blur", su, !1), typeof PointerEvent != "undefined" ? (r.removeEventListener("pointerdown", Xe, !0), r.removeEventListener("pointermove", Xe, !0), r.removeEventListener("pointerup", Xe, !0)) : process.env.NODE_ENV === "test" && (r.removeEventListener("mousedown", Xe, !0), r.removeEventListener("mousemove", Xe, !0), r.removeEventListener("mouseup", Xe, !0)), Wn.delete(n));
};
function vp(e) {
  const t = Gt(e);
  let n;
  return t.readyState !== "loading" ? $o(e) : (n = () => {
    $o(e);
  }, t.addEventListener("DOMContentLoaded", n)), () => au(e, n);
}
typeof document != "undefined" && vp();
function lu() {
  return ar !== "pointer";
}
const bp = /* @__PURE__ */ new Set([
  "checkbox",
  "radio",
  "range",
  "color",
  "file",
  "image",
  "button",
  "submit",
  "reset"
]);
function yp(e, t, n) {
  let r = Gt(n == null ? void 0 : n.target);
  const i = typeof window != "undefined" ? Jt(n == null ? void 0 : n.target).HTMLInputElement : HTMLInputElement, o = typeof window != "undefined" ? Jt(n == null ? void 0 : n.target).HTMLTextAreaElement : HTMLTextAreaElement, s = typeof window != "undefined" ? Jt(n == null ? void 0 : n.target).HTMLElement : HTMLElement, a = typeof window != "undefined" ? Jt(n == null ? void 0 : n.target).KeyboardEvent : KeyboardEvent;
  return e = e || r.activeElement instanceof i && !bp.has(r.activeElement.type) || r.activeElement instanceof o || r.activeElement instanceof s && r.activeElement.isContentEditable, !(e && t === "keyboard" && n instanceof a && !mp[n.key]);
}
function xp(e, t, n) {
  $o(), be(() => {
    let r = (i, o) => {
      yp(!!(n != null && n.isTextInput), i, o) && e(lu());
    };
    return Co.add(r), () => {
      Co.delete(r);
    };
  }, t);
}
function wp(e) {
  let { isDisabled: t, onFocus: n, onBlur: r, onFocusChange: i } = e;
  const o = re((l) => {
    if (l.target === l.currentTarget)
      return r && r(l), i && i(!1), !0;
  }, [
    r,
    i
  ]), s = ru(o), a = re((l) => {
    const u = Gt(l.target), c = u ? ko(u) : ko();
    l.target === l.currentTarget && c === Jc(l.nativeEvent) && (n && n(l), i && i(!0), s(l));
  }, [
    i,
    n,
    s
  ]);
  return {
    focusProps: {
      onFocus: !t && (n || i || r) ? a : void 0,
      onBlur: !t && (r || i) ? o : void 0
    }
  };
}
function Ep(e) {
  let { isDisabled: t, onBlurWithin: n, onFocusWithin: r, onFocusWithinChange: i } = e, o = z({
    isFocusWithin: !1
  }), { addGlobalListener: s, removeAllGlobalListeners: a } = tu(), l = re((f) => {
    f.currentTarget.contains(f.target) && o.current.isFocusWithin && !f.currentTarget.contains(f.relatedTarget) && (o.current.isFocusWithin = !1, a(), n && n(f), i && i(!1));
  }, [
    n,
    i,
    o,
    a
  ]), u = ru(l), c = re((f) => {
    if (!f.currentTarget.contains(f.target)) return;
    const h = Gt(f.target), d = ko(h);
    if (!o.current.isFocusWithin && d === Jc(f.nativeEvent)) {
      r && r(f), i && i(!0), o.current.isFocusWithin = !0, u(f);
      let p = f.currentTarget;
      s(h, "focus", (m) => {
        if (o.current.isFocusWithin && !Qc(p, m.target)) {
          let g = new h.defaultView.FocusEvent("blur", {
            relatedTarget: m.target
          });
          hp(g, p);
          let y = nu(g);
          l(y);
        }
      }, {
        capture: !0
      });
    }
  }, [
    r,
    i,
    u,
    s,
    l
  ]);
  return t ? {
    focusWithinProps: {
      // These cannot be null, that would conflict in mergeProps
      onFocus: void 0,
      onBlur: void 0
    }
  } : {
    focusWithinProps: {
      onFocus: c,
      onBlur: l
    }
  };
}
let Hr = !1, Pr = 0;
function Ao() {
  Hr = !0, setTimeout(() => {
    Hr = !1;
  }, 50);
}
function Da(e) {
  e.pointerType === "touch" && Ao();
}
function Sp() {
  if (typeof document != "undefined")
    return Pr === 0 && (typeof PointerEvent != "undefined" ? document.addEventListener("pointerup", Da) : process.env.NODE_ENV === "test" && document.addEventListener("touchend", Ao)), Pr++, () => {
      Pr--, !(Pr > 0) && (typeof PointerEvent != "undefined" ? document.removeEventListener("pointerup", Da) : process.env.NODE_ENV === "test" && document.removeEventListener("touchend", Ao));
    };
}
function At(e) {
  let { onHoverStart: t, onHoverChange: n, onHoverEnd: r, isDisabled: i } = e, [o, s] = ne(!1), a = z({
    isHovered: !1,
    ignoreEmulatedMouseEvents: !1,
    pointerType: "",
    target: null
  }).current;
  be(Sp, []);
  let { addGlobalListener: l, removeAllGlobalListeners: u } = tu(), { hoverProps: c, triggerHoverEnd: f } = se(() => {
    let h = (m, g) => {
      if (a.pointerType = g, i || g === "touch" || a.isHovered || !m.currentTarget.contains(m.target)) return;
      a.isHovered = !0;
      let y = m.currentTarget;
      a.target = y, l(Gt(m.target), "pointerover", (w) => {
        a.isHovered && a.target && !Qc(a.target, w.target) && d(w, w.pointerType);
      }, {
        capture: !0
      }), t && t({
        type: "hoverstart",
        target: y,
        pointerType: g
      }), n && n(!0), s(!0);
    }, d = (m, g) => {
      let y = a.target;
      a.pointerType = "", a.target = null, !(g === "touch" || !a.isHovered || !y) && (a.isHovered = !1, u(), r && r({
        type: "hoverend",
        target: y,
        pointerType: g
      }), n && n(!1), s(!1));
    }, p = {};
    return typeof PointerEvent != "undefined" ? (p.onPointerEnter = (m) => {
      Hr && m.pointerType === "mouse" || h(m, m.pointerType);
    }, p.onPointerLeave = (m) => {
      !i && m.currentTarget.contains(m.target) && d(m, m.pointerType);
    }) : process.env.NODE_ENV === "test" && (p.onTouchStart = () => {
      a.ignoreEmulatedMouseEvents = !0;
    }, p.onMouseEnter = (m) => {
      !a.ignoreEmulatedMouseEvents && !Hr && h(m, "mouse"), a.ignoreEmulatedMouseEvents = !1;
    }, p.onMouseLeave = (m) => {
      !i && m.currentTarget.contains(m.target) && d(m, "mouse");
    }), {
      hoverProps: p,
      triggerHoverEnd: d
    };
  }, [
    t,
    n,
    r,
    i,
    a,
    l,
    u
  ]);
  return be(() => {
    i && f({
      currentTarget: a.target
    }, a.pointerType);
  }, [
    i
  ]), {
    hoverProps: c,
    isHovered: o
  };
}
function vt(e = {}) {
  let { autoFocus: t = !1, isTextInput: n, within: r } = e, i = z({
    isFocused: !1,
    isFocusVisible: t || lu()
  }), [o, s] = ne(!1), [a, l] = ne(() => i.current.isFocused && i.current.isFocusVisible), u = re(() => l(i.current.isFocused && i.current.isFocusVisible), []), c = re((d) => {
    i.current.isFocused = d, s(d), u();
  }, [
    u
  ]);
  xp((d) => {
    i.current.isFocusVisible = d, u();
  }, [], {
    isTextInput: n
  });
  let { focusProps: f } = wp({
    isDisabled: r,
    onFocusChange: c
  }), { focusWithinProps: h } = Ep({
    isDisabled: !r,
    onFocusWithinChange: c
  });
  return {
    isFocused: o,
    isFocusVisible: a,
    focusProps: r ? h : f
  };
}
var Tp = Object.defineProperty, Pp = (e, t, n) => t in e ? Tp(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Gi = (e, t, n) => (Pp(e, typeof t != "symbol" ? t + "" : t, n), n);
let kp = class {
  constructor() {
    Gi(this, "current", this.detect()), Gi(this, "handoffState", "pending"), Gi(this, "currentId", 0);
  }
  set(t) {
    this.current !== t && (this.handoffState = "pending", this.currentId = 0, this.current = t);
  }
  reset() {
    this.set(this.detect());
  }
  nextId() {
    return ++this.currentId;
  }
  get isServer() {
    return this.current === "server";
  }
  get isClient() {
    return this.current === "client";
  }
  detect() {
    return typeof window == "undefined" || typeof document == "undefined" ? "server" : "client";
  }
  handoff() {
    this.handoffState === "pending" && (this.handoffState = "complete");
  }
  get isHandoffComplete() {
    return this.handoffState === "complete";
  }
}, dt = new kp();
function Mt(e) {
  var t;
  return dt.isServer ? null : e == null ? document : (t = e == null ? void 0 : e.ownerDocument) != null ? t : document;
}
function zt(e) {
  var t, n;
  return dt.isServer ? null : e == null ? document : (n = (t = e == null ? void 0 : e.getRootNode) == null ? void 0 : t.call(e)) != null ? n : document;
}
function _t(e) {
  var t, n;
  return (n = (t = zt(e)) == null ? void 0 : t.activeElement) != null ? n : null;
}
function di(e) {
  return _t(e) === e;
}
function lr(e) {
  typeof queueMicrotask == "function" ? queueMicrotask(e) : Promise.resolve().then(e).catch((t) => setTimeout(() => {
    throw t;
  }));
}
function He() {
  let e = [], t = { addEventListener(n, r, i, o) {
    return n.addEventListener(r, i, o), t.add(() => n.removeEventListener(r, i, o));
  }, requestAnimationFrame(...n) {
    let r = requestAnimationFrame(...n);
    return t.add(() => cancelAnimationFrame(r));
  }, nextFrame(...n) {
    return t.requestAnimationFrame(() => t.requestAnimationFrame(...n));
  }, setTimeout(...n) {
    let r = setTimeout(...n);
    return t.add(() => clearTimeout(r));
  }, microTask(...n) {
    let r = { current: !0 };
    return lr(() => {
      r.current && n[0]();
    }), t.add(() => {
      r.current = !1;
    });
  }, style(n, r, i) {
    let o = n.style.getPropertyValue(r);
    return Object.assign(n.style, { [r]: i }), this.add(() => {
      Object.assign(n.style, { [r]: o });
    });
  }, group(n) {
    let r = He();
    return n(r), this.add(() => r.dispose());
  }, add(n) {
    return e.includes(n) || e.push(n), () => {
      let r = e.indexOf(n);
      if (r >= 0) for (let i of e.splice(r, 1)) i();
    };
  }, dispose() {
    for (let n of e.splice(0)) n();
  } };
  return t;
}
function bt() {
  let [e] = ne(He);
  return be(() => () => e.dispose(), [e]), e;
}
let he = (e, t) => {
  dt.isServer ? be(e, t) : li(e, t);
};
function je(e) {
  let t = z(e);
  return he(() => {
    t.current = e;
  }, [e]), t;
}
let L = function(e) {
  let t = je(e);
  return O.useCallback((...n) => t.current(...n), [t]);
};
function Cp(e) {
  let t = e.width / 2, n = e.height / 2;
  return { top: e.clientY - n, right: e.clientX + t, bottom: e.clientY + n, left: e.clientX - t };
}
function Op(e, t) {
  return !(!e || !t || e.right < t.left || e.left > t.right || e.bottom < t.top || e.top > t.bottom);
}
function ln({ disabled: e = !1 } = {}) {
  let t = z(null), [n, r] = ne(!1), i = bt(), o = L(() => {
    t.current = null, r(!1), i.dispose();
  }), s = L((a) => {
    if (i.dispose(), t.current === null) {
      t.current = a.currentTarget, r(!0);
      {
        let l = Mt(a.currentTarget);
        i.addEventListener(l, "pointerup", o, !1), i.addEventListener(l, "pointermove", (u) => {
          if (t.current) {
            let c = Cp(u);
            r(Op(c, t.current.getBoundingClientRect()));
          }
        }, !1), i.addEventListener(l, "pointercancel", o, !1);
      }
    }
  });
  return { pressed: n, pressProps: e ? {} : { onPointerDown: s, onPointerUp: o, onClick: o } };
}
function ge(e) {
  return se(() => e, Object.values(e));
}
let cu = pe(void 0);
function Rt() {
  return ee(cu);
}
function uu({ value: e, children: t }) {
  return O.createElement(cu.Provider, { value: e }, t);
}
function Mo(...e) {
  return Array.from(new Set(e.flatMap((t) => typeof t == "string" ? t.split(" ") : []))).filter(Boolean).join(" ");
}
function me(e, t, ...n) {
  if (e in t) {
    let i = t[e];
    return typeof i == "function" ? i(...n) : i;
  }
  let r = new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map((i) => `"${i}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(r, me), r;
}
var Be = ((e) => (e[e.None = 0] = "None", e[e.RenderStrategy = 1] = "RenderStrategy", e[e.Static = 2] = "Static", e))(Be || {}), Nt = ((e) => (e[e.Unmount = 0] = "Unmount", e[e.Hidden = 1] = "Hidden", e))(Nt || {});
function ae() {
  let e = Ap();
  return re((t) => $p(v({ mergeRefs: e }, t)), [e]);
}
function $p({ ourProps: e, theirProps: t, slot: n, defaultTag: r, features: i, visible: o = !0, name: s, mergeRefs: a }) {
  a = a != null ? a : Mp;
  let l = du(t, e);
  if (o) return kr(l, n, r, s, a);
  let u = i != null ? i : 0;
  if (u & 2) {
    let c = l, { static: h = !1 } = c, d = k(c, ["static"]);
    if (h) return kr(d, n, r, s, a);
  }
  if (u & 1) {
    let f = l, { unmount: h = !0 } = f, d = k(f, ["unmount"]);
    return me(h ? 0 : 1, { 0() {
      return null;
    }, 1() {
      return kr(E(v({}, d), { hidden: !0, style: { display: "none" } }), n, r, s, a);
    } });
  }
  return kr(l, n, r, s, a);
}
function kr(e, t = {}, n, r, i) {
  let h = Yi(e, ["unmount", "static"]), { as: o = n, children: s, refName: a = "ref" } = h, l = k(h, ["as", "children", "refName"]), u = e.ref !== void 0 ? { [a]: e.ref } : {}, c = typeof s == "function" ? s(t) : s;
  "className" in l && l.className && typeof l.className == "function" && (l.className = l.className(t)), l["aria-labelledby"] && l["aria-labelledby"] === l.id && (l["aria-labelledby"] = void 0);
  let f = {};
  if (t) {
    let d = !1, p = [];
    for (let [m, g] of Object.entries(t)) typeof g == "boolean" && (d = !0), g === !0 && p.push(m.replace(/([A-Z])/g, (y) => `-${y.toLowerCase()}`));
    if (d) {
      f["data-headlessui-state"] = p.join(" ");
      for (let m of p) f[`data-${m}`] = "";
    }
  }
  if (wn(o) && (Object.keys(It(l)).length > 0 || Object.keys(It(f)).length > 0)) if (!ci(c) || Array.isArray(c) && c.length > 1 || Dp(c)) {
    if (Object.keys(It(l)).length > 0) throw new Error(['Passing props on "Fragment"!', "", `The current component <${r} /> is rendering a "Fragment".`, "However we need to passthrough the following props:", Object.keys(It(l)).concat(Object.keys(It(f))).map((d) => `  - ${d}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".', "Render a single element as the child so that we can forward the props onto that element."].map((d) => `  - ${d}`).join(`
`)].join(`
`));
  } else {
    let d = c.props, p = d == null ? void 0 : d.className, m = typeof p == "function" ? (...w) => Mo(p(...w), l.className) : Mo(p, l.className), g = m ? { className: m } : {}, y = du(c.props, It(Yi(l, ["ref"])));
    for (let w in f) w in y && delete f[w];
    return Yc(c, Object.assign({}, y, f, u, { ref: i(Rp(c), u.ref) }, g));
  }
  return Xc(o, Object.assign({}, Yi(l, ["ref"]), !wn(o) && u, !wn(o) && f), c);
}
function Ap() {
  let e = z([]), t = re((n) => {
    for (let r of e.current) r != null && (typeof r == "function" ? r(n) : r.current = n);
  }, []);
  return (...n) => {
    if (!n.every((r) => r == null)) return e.current = n, t;
  };
}
function Mp(...e) {
  return e.every((t) => t == null) ? void 0 : (t) => {
    for (let n of e) n != null && (typeof n == "function" ? n(t) : n.current = t);
  };
}
function du(...e) {
  if (e.length === 0) return {};
  if (e.length === 1) return e[0];
  let t = {}, n = {};
  for (let r of e) for (let i in r) i.startsWith("on") && typeof r[i] == "function" ? (n[i] != null || (n[i] = []), n[i].push(r[i])) : t[i] = r[i];
  if (t.disabled || t["aria-disabled"]) for (let r in n) /^(on(?:Click|Pointer|Mouse|Key)(?:Down|Up|Press)?)$/.test(r) && (n[r] = [(i) => {
    var o;
    return (o = i == null ? void 0 : i.preventDefault) == null ? void 0 : o.call(i);
  }]);
  for (let r in n) Object.assign(t, { [r](i, ...o) {
    let s = n[r];
    for (let a of s) {
      if ((i instanceof Event || (i == null ? void 0 : i.nativeEvent) instanceof Event) && i.defaultPrevented) return;
      a(i, ...o);
    }
  } });
  return t;
}
function We(...e) {
  if (e.length === 0) return {};
  if (e.length === 1) return e[0];
  let t = {}, n = {};
  for (let r of e) for (let i in r) i.startsWith("on") && typeof r[i] == "function" ? (n[i] != null || (n[i] = []), n[i].push(r[i])) : t[i] = r[i];
  for (let r in n) Object.assign(t, { [r](...i) {
    let o = n[r];
    for (let s of o) s == null || s(...i);
  } });
  return t;
}
function ie(e) {
  var t;
  return Object.assign(Gc(e), { displayName: (t = e.displayName) != null ? t : e.name });
}
function It(e) {
  let t = Object.assign({}, e);
  for (let n in t) t[n] === void 0 && delete t[n];
  return t;
}
function Yi(e, t = []) {
  let n = Object.assign({}, e);
  for (let r of t) r in n && delete n[r];
  return n;
}
function Rp(e) {
  return O.version.split(".")[0] >= "19" ? e.props.ref : e.ref;
}
function wn(e) {
  return e === ke || e === Symbol.for("react.fragment");
}
function Dp(e) {
  return wn(e.type);
}
let Lp = "button";
function Fp(e, t) {
  var n;
  let r = Rt(), m = e, { disabled: i = r || !1, autoFocus: o = !1 } = m, s = k(m, ["disabled", "autoFocus"]), { isFocusVisible: a, focusProps: l } = vt({ autoFocus: o }), { isHovered: u, hoverProps: c } = At({ isDisabled: i }), { pressed: f, pressProps: h } = ln({ disabled: i }), d = We({ ref: t, type: (n = s.type) != null ? n : "button", disabled: i || void 0, autoFocus: o }, l, c, h), p = ge({ disabled: i, hover: u, focus: a, active: f, autofocus: o });
  return ae()({ ourProps: d, theirProps: s, slot: p, defaultTag: Lp, name: "Button" });
}
let Ip = ie(Fp);
function gs(e, t, n) {
  let [r, i] = ne(n), o = e !== void 0, s = z(o), a = z(!1), l = z(!1);
  return o && !s.current && !a.current ? (a.current = !0, s.current = o, console.error("A component is changing from uncontrolled to controlled. This may be caused by the value changing from undefined to a defined value, which should not happen.")) : !o && s.current && !l.current && (l.current = !0, s.current = o, console.error("A component is changing from controlled to uncontrolled. This may be caused by the value changing from a defined value to undefined, which should not happen.")), [o ? e : r, L((u) => (o || nt(() => i(u)), t == null ? void 0 : t(u)))];
}
function vs(e) {
  let [t] = ne(e);
  return t;
}
function fu(e = {}, t = null, n = []) {
  for (let [r, i] of Object.entries(e)) pu(n, hu(t, r), i);
  return n;
}
function hu(e, t) {
  return e ? e + "[" + t + "]" : t;
}
function pu(e, t, n) {
  if (Array.isArray(n)) for (let [r, i] of n.entries()) pu(e, hu(t, r.toString()), i);
  else n instanceof Date ? e.push([t, n.toISOString()]) : typeof n == "boolean" ? e.push([t, n ? "1" : "0"]) : typeof n == "string" ? e.push([t, n]) : typeof n == "number" ? e.push([t, `${n}`]) : n == null ? e.push([t, ""]) : Np(n) && !ci(n) && fu(n, t, e);
}
function mu(e) {
  var t, n;
  let r = (t = e == null ? void 0 : e.form) != null ? t : e.closest("form");
  if (r) {
    for (let i of r.elements) if (i !== e && (i.tagName === "INPUT" && i.type === "submit" || i.tagName === "BUTTON" && i.type === "submit" || i.nodeName === "INPUT" && i.type === "image")) {
      i.click();
      return;
    }
    (n = r.requestSubmit) == null || n.call(r);
  }
}
function Np(e) {
  if (Object.prototype.toString.call(e) !== "[object Object]") return !1;
  let t = Object.getPrototypeOf(e);
  return t === null || Object.getPrototypeOf(t) === null;
}
let Vp = "span";
var rt = ((e) => (e[e.None = 1] = "None", e[e.Focusable = 2] = "Focusable", e[e.Hidden = 4] = "Hidden", e))(rt || {});
function Bp(e, t) {
  var n;
  let s = e, { features: r = 1 } = s, i = k(s, ["features"]), o = { ref: t, "aria-hidden": (r & 2) === 2 ? !0 : (n = i["aria-hidden"]) != null ? n : void 0, hidden: (r & 4) === 4 ? !0 : void 0, style: v({ position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0" }, (r & 4) === 4 && (r & 2) !== 2 && { display: "none" }) };
  return ae()({ ourProps: o, theirProps: i, slot: {}, defaultTag: Vp, name: "Hidden" });
}
let it = ie(Bp), gu = pe(null);
function jp(e) {
  let [t, n] = ne(null);
  return O.createElement(gu.Provider, { value: { target: t } }, e.children, O.createElement(it, { features: rt.Hidden, ref: n }));
}
function zp({ children: e }) {
  let t = ee(gu);
  if (!t) return O.createElement(O.Fragment, null, e);
  let { target: n } = t;
  return n ? qc(O.createElement(O.Fragment, null, e), n) : null;
}
function bs({ data: e, form: t, disabled: n, onReset: r, overrides: i }) {
  let [o, s] = ne(null), a = bt();
  return be(() => {
    if (r && o) return a.addEventListener(o, "reset", r);
  }, [o, t, r]), O.createElement(zp, null, O.createElement(_p, { setForm: s, formId: t }), fu(e).map(([l, u]) => O.createElement(it, v({ features: rt.Hidden }, It(v({ key: l, as: "input", type: "hidden", hidden: !0, readOnly: !0, form: t, disabled: n, name: l, value: u }, i))))));
}
function _p({ setForm: e, formId: t }) {
  return be(() => {
    if (t) {
      let n = document.getElementById(t);
      n && e(n);
    }
  }, [e, t]), t ? null : O.createElement(it, { features: rt.Hidden, as: "input", type: "hidden", hidden: !0, readOnly: !0, ref: (n) => {
    if (!n) return;
    let r = n.closest("form");
    r && e(r);
  } });
}
let vu = pe(void 0);
function cr() {
  return ee(vu);
}
function Wp({ id: e, children: t }) {
  return O.createElement(vu.Provider, { value: e }, t);
}
function bu(e) {
  return typeof e != "object" || e === null ? !1 : "nodeType" in e;
}
function Tt(e) {
  return bu(e) && "tagName" in e;
}
function De(e) {
  return Tt(e) && "accessKey" in e;
}
function qe(e) {
  return Tt(e) && "tabIndex" in e;
}
function Hp(e) {
  return Tt(e) && "style" in e;
}
function Up(e) {
  return De(e) && e.nodeName === "IFRAME";
}
function Ur(e) {
  return De(e) && e.nodeName === "INPUT";
}
function La(e) {
  return De(e) && e.nodeName === "LABEL";
}
function Kp(e) {
  return De(e) && e.nodeName === "FIELDSET";
}
function yu(e) {
  return De(e) && e.nodeName === "LEGEND";
}
function Gp(e) {
  return Tt(e) ? e.matches('a[href],audio[controls],button,details,embed,iframe,img[usemap],input:not([type="hidden"]),label,select,textarea,video[controls]') : !1;
}
function Tn(e) {
  let t = e.parentElement, n = null;
  for (; t && !Kp(t); ) yu(t) && (n = t), t = t.parentElement;
  let r = (t == null ? void 0 : t.getAttribute("disabled")) === "";
  return r && Yp(n) ? !1 : r;
}
function Yp(e) {
  if (!e) return !1;
  let t = e.previousElementSibling;
  for (; t !== null; ) {
    if (yu(t)) return !1;
    t = t.previousElementSibling;
  }
  return !0;
}
let xu = Symbol();
function ys(e, t = !0) {
  return Object.assign(e, { [xu]: t });
}
function ve(...e) {
  let t = z(e);
  be(() => {
    t.current = e;
  }, [e]);
  let n = L((r) => {
    for (let i of t.current) i != null && (typeof i == "function" ? i(r) : i.current = r);
  });
  return e.every((r) => r == null || (r == null ? void 0 : r[xu])) ? void 0 : n;
}
let fi = pe(null);
fi.displayName = "DescriptionContext";
function wu() {
  let e = ee(fi);
  if (e === null) {
    let t = new Error("You used a <Description /> component, but it is not inside a relevant parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(t, wu), t;
  }
  return e;
}
function hi() {
  var e, t;
  return (t = (e = ee(fi)) == null ? void 0 : e.value) != null ? t : void 0;
}
function Eu() {
  let [e, t] = ne([]);
  return [e.length > 0 ? e.join(" ") : void 0, se(() => function(n) {
    let r = L((o) => (t((s) => [...s, o]), () => t((s) => {
      let a = s.slice(), l = a.indexOf(o);
      return l !== -1 && a.splice(l, 1), a;
    }))), i = se(() => ({ register: r, slot: n.slot, name: n.name, props: n.props, value: n.value }), [r, n.slot, n.name, n.props, n.value]);
    return O.createElement(fi.Provider, { value: i }, n.children);
  }, [t])];
}
let Xp = "p";
function qp(e, t) {
  let n = ye(), r = Rt(), c = e, { id: i = `headlessui-description-${n}` } = c, o = k(c, ["id"]), s = wu(), a = ve(t);
  he(() => s.register(i), [i, s.register]);
  let l = ge(E(v({}, s.slot), { disabled: r || !1 })), u = E(v({ ref: a }, s.props), { id: i });
  return ae()({ ourProps: u, theirProps: o, slot: l, defaultTag: Xp, name: s.name || "Description" });
}
let Zp = ie(qp), xs = Object.assign(Zp, {});
var J = ((e) => (e.Space = " ", e.Enter = "Enter", e.Escape = "Escape", e.Backspace = "Backspace", e.Delete = "Delete", e.ArrowLeft = "ArrowLeft", e.ArrowUp = "ArrowUp", e.ArrowRight = "ArrowRight", e.ArrowDown = "ArrowDown", e.Home = "Home", e.End = "End", e.PageUp = "PageUp", e.PageDown = "PageDown", e.Tab = "Tab", e))(J || {});
let pi = pe(null);
pi.displayName = "LabelContext";
function Su() {
  let e = ee(pi);
  if (e === null) {
    let t = new Error("You used a <Label /> component, but it is not inside a relevant parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(t, Su), t;
  }
  return e;
}
function cn(e) {
  var t, n, r;
  let i = (n = (t = ee(pi)) == null ? void 0 : t.value) != null ? n : void 0;
  return ((r = e == null ? void 0 : e.length) != null ? r : 0) > 0 ? [i, ...e].filter(Boolean).join(" ") : i;
}
function mi({ inherit: e = !1 } = {}) {
  let t = cn(), [n, r] = ne([]), i = e ? [t, ...n].filter(Boolean) : n;
  return [i.length > 0 ? i.join(" ") : void 0, se(() => function(o) {
    let s = L((l) => (r((u) => [...u, l]), () => r((u) => {
      let c = u.slice(), f = c.indexOf(l);
      return f !== -1 && c.splice(f, 1), c;
    }))), a = se(() => ({ register: s, slot: o.slot, name: o.name, props: o.props, value: o.value }), [s, o.slot, o.name, o.props, o.value]);
    return O.createElement(pi.Provider, { value: a }, o.children);
  }, [r])];
}
let Qp = "label";
function Jp(e, t) {
  var n;
  let r = ye(), i = Su(), o = cr(), s = Rt(), m = e, { id: a = `headlessui-label-${r}`, htmlFor: l = o != null ? o : (n = i.props) == null ? void 0 : n.htmlFor, passive: u = !1 } = m, c = k(m, ["id", "htmlFor", "passive"]), f = ve(t);
  he(() => i.register(a), [a, i.register]);
  let h = L((g) => {
    let y = g.currentTarget;
    if (!(g.target !== g.currentTarget && Gp(g.target)) && (La(y) && g.preventDefault(), i.props && "onClick" in i.props && typeof i.props.onClick == "function" && i.props.onClick(g), La(y))) {
      let w = document.getElementById(y.htmlFor);
      if (w) {
        let b = w.getAttribute("disabled");
        if (b === "true" || b === "") return;
        let T = w.getAttribute("aria-disabled");
        if (T === "true" || T === "") return;
        (Ur(w) && (w.type === "file" || w.type === "radio" || w.type === "checkbox") || w.role === "radio" || w.role === "checkbox" || w.role === "switch") && w.click(), w.focus({ preventScroll: !0 });
      }
    }
  }), d = ge(E(v({}, i.slot), { disabled: s || !1 })), p = E(v({ ref: f }, i.props), { id: a, htmlFor: l, onClick: h });
  return u && ("onClick" in p && (delete p.htmlFor, delete p.onClick), "onClick" in c && delete c.onClick), ae()({ ourProps: p, theirProps: c, slot: d, defaultTag: l ? Qp : "div", name: i.name || "Label" });
}
let em = ie(Jp), gi = Object.assign(em, {}), tm = "span";
function nm(e, t) {
  let n = ye(), r = cr(), i = Rt(), I = e, { id: o = r || `headlessui-checkbox-${n}`, disabled: s = i || !1, autoFocus: a = !1, checked: l, defaultChecked: u, onChange: c, name: f, value: h, form: d, indeterminate: p = !1, tabIndex: m = 0 } = I, g = k(I, ["id", "disabled", "autoFocus", "checked", "defaultChecked", "onChange", "name", "value", "form", "indeterminate", "tabIndex"]), y = vs(u), [w, b] = gs(l, c, y != null ? y : !1), T = cn(), P = hi(), C = bt(), [A, $] = ne(!1), F = L(() => {
    $(!0), b == null || b(!w), C.nextFrame(() => {
      $(!1);
    });
  }), R = L((V) => {
    if (Tn(V.currentTarget)) return V.preventDefault();
    V.preventDefault(), F();
  }), M = L((V) => {
    V.key === J.Space ? (V.preventDefault(), F()) : V.key === J.Enter && mu(V.currentTarget);
  }), W = L((V) => V.preventDefault()), { isFocusVisible: N, focusProps: H } = vt({ autoFocus: a }), { isHovered: G, hoverProps: D } = At({ isDisabled: s }), { pressed: U, pressProps: K } = ln({ disabled: s }), Q = We({ ref: t, id: o, role: "checkbox", "aria-checked": p ? "mixed" : w ? "true" : "false", "aria-labelledby": T, "aria-describedby": P, "aria-disabled": s ? !0 : void 0, indeterminate: p ? "true" : void 0, tabIndex: s ? void 0 : m, onKeyUp: s ? void 0 : M, onKeyPress: s ? void 0 : W, onClick: s ? void 0 : R }, H, D, K), Z = ge({ checked: w, disabled: s, hover: G, focus: N, active: U, indeterminate: p, changing: A, autofocus: a }), X = re(() => {
    if (y !== void 0) return b == null ? void 0 : b(y);
  }, [b, y]), de = ae();
  return O.createElement(O.Fragment, null, f != null && O.createElement(bs, { disabled: s, data: { [f]: h || "on" }, overrides: { type: "checkbox", checked: w }, form: d, onReset: X }), de({ ourProps: Q, theirProps: g, slot: Z, defaultTag: tm, name: "Checkbox" }));
}
let rm = ie(nm), im = pe(() => {
});
function vi({ value: e, children: t }) {
  return O.createElement(im.Provider, { value: e }, t);
}
function dn(e, t, n) {
  var a;
  let r = (a = n.initialDeps) != null ? a : [], i, o = !0;
  function s() {
    var l, u, c;
    let f;
    n.key && ((l = n.debug) != null && l.call(n)) && (f = Date.now());
    const h = e();
    if (!(h.length !== r.length || h.some((m, g) => r[g] !== m)))
      return i;
    r = h;
    let p;
    if (n.key && ((u = n.debug) != null && u.call(n)) && (p = Date.now()), i = t(...h), n.key && ((c = n.debug) != null && c.call(n))) {
      const m = Math.round((Date.now() - f) * 100) / 100, g = Math.round((Date.now() - p) * 100) / 100, y = g / 16, w = (b, T) => {
        for (b = String(b); b.length < T; )
          b = " " + b;
        return b;
      };
      console.info(
        `%c⏱ ${w(g, 5)} /${w(m, 5)} ms`,
        `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(
          0,
          Math.min(120 - 120 * y, 120)
        )}deg 100% 31%);`,
        n == null ? void 0 : n.key
      );
    }
    return n != null && n.onChange && !(o && n.skipInitialOnChange) && n.onChange(i), o = !1, i;
  }
  return s.updateDeps = (l) => {
    r = l;
  }, s;
}
function Fa(e, t) {
  if (e === void 0)
    throw new Error("Unexpected undefined");
  return e;
}
const om = (e, t) => Math.abs(e - t) < 1.01, sm = (e, t, n) => {
  let r;
  return function(...i) {
    e.clearTimeout(r), r = e.setTimeout(() => t.apply(this, i), n);
  };
}, Ia = (e) => {
  const { offsetWidth: t, offsetHeight: n } = e;
  return { width: t, height: n };
}, am = (e) => e, lm = (e) => {
  const t = Math.max(e.startIndex - e.overscan, 0), n = Math.min(e.endIndex + e.overscan, e.count - 1), r = [];
  for (let i = t; i <= n; i++)
    r.push(i);
  return r;
}, cm = (e, t) => {
  const n = e.scrollElement;
  if (!n)
    return;
  const r = e.targetWindow;
  if (!r)
    return;
  const i = (s) => {
    const { width: a, height: l } = s;
    t({ width: Math.round(a), height: Math.round(l) });
  };
  if (i(Ia(n)), !r.ResizeObserver)
    return () => {
    };
  const o = new r.ResizeObserver((s) => {
    const a = () => {
      const l = s[0];
      if (l != null && l.borderBoxSize) {
        const u = l.borderBoxSize[0];
        if (u) {
          i({ width: u.inlineSize, height: u.blockSize });
          return;
        }
      }
      i(Ia(n));
    };
    e.options.useAnimationFrameWithResizeObserver ? requestAnimationFrame(a) : a();
  });
  return o.observe(n, { box: "border-box" }), () => {
    o.unobserve(n);
  };
}, Na = {
  passive: !0
}, Va = typeof window == "undefined" ? !0 : "onscrollend" in window, um = (e, t) => {
  const n = e.scrollElement;
  if (!n)
    return;
  const r = e.targetWindow;
  if (!r)
    return;
  let i = 0;
  const o = e.options.useScrollendEvent && Va ? () => {
  } : sm(
    r,
    () => {
      t(i, !1);
    },
    e.options.isScrollingResetDelay
  ), s = (c) => () => {
    const { horizontal: f, isRtl: h } = e.options;
    i = f ? n.scrollLeft * (h && -1 || 1) : n.scrollTop, o(), t(i, c);
  }, a = s(!0), l = s(!1);
  n.addEventListener("scroll", a, Na);
  const u = e.options.useScrollendEvent && Va;
  return u && n.addEventListener("scrollend", l, Na), () => {
    n.removeEventListener("scroll", a), u && n.removeEventListener("scrollend", l);
  };
}, dm = (e, t, n) => {
  if (t != null && t.borderBoxSize) {
    const r = t.borderBoxSize[0];
    if (r)
      return Math.round(
        r[n.options.horizontal ? "inlineSize" : "blockSize"]
      );
  }
  return e[n.options.horizontal ? "offsetWidth" : "offsetHeight"];
}, fm = (e, {
  adjustments: t = 0,
  behavior: n
}, r) => {
  var i, o;
  const s = e + t;
  (o = (i = r.scrollElement) == null ? void 0 : i.scrollTo) == null || o.call(i, {
    [r.options.horizontal ? "left" : "top"]: s,
    behavior: n
  });
};
class hm {
  constructor(t) {
    this.unsubs = [], this.scrollElement = null, this.targetWindow = null, this.isScrolling = !1, this.currentScrollToIndex = null, this.measurementsCache = [], this.itemSizeCache = /* @__PURE__ */ new Map(), this.laneAssignments = /* @__PURE__ */ new Map(), this.pendingMeasuredCacheIndexes = [], this.prevLanes = void 0, this.lanesChangedFlag = !1, this.lanesSettling = !1, this.scrollRect = null, this.scrollOffset = null, this.scrollDirection = null, this.scrollAdjustments = 0, this.elementsCache = /* @__PURE__ */ new Map(), this.observer = /* @__PURE__ */ (() => {
      let n = null;
      const r = () => n || (!this.targetWindow || !this.targetWindow.ResizeObserver ? null : n = new this.targetWindow.ResizeObserver((i) => {
        i.forEach((o) => {
          const s = () => {
            this._measureElement(o.target, o);
          };
          this.options.useAnimationFrameWithResizeObserver ? requestAnimationFrame(s) : s();
        });
      }));
      return {
        disconnect: () => {
          var i;
          (i = r()) == null || i.disconnect(), n = null;
        },
        observe: (i) => {
          var o;
          return (o = r()) == null ? void 0 : o.observe(i, { box: "border-box" });
        },
        unobserve: (i) => {
          var o;
          return (o = r()) == null ? void 0 : o.unobserve(i);
        }
      };
    })(), this.range = null, this.setOptions = (n) => {
      Object.entries(n).forEach(([r, i]) => {
        typeof i == "undefined" && delete n[r];
      }), this.options = v({
        debug: !1,
        initialOffset: 0,
        overscan: 1,
        paddingStart: 0,
        paddingEnd: 0,
        scrollPaddingStart: 0,
        scrollPaddingEnd: 0,
        horizontal: !1,
        getItemKey: am,
        rangeExtractor: lm,
        onChange: () => {
        },
        measureElement: dm,
        initialRect: { width: 0, height: 0 },
        scrollMargin: 0,
        gap: 0,
        indexAttribute: "data-index",
        initialMeasurementsCache: [],
        lanes: 1,
        isScrollingResetDelay: 150,
        enabled: !0,
        isRtl: !1,
        useScrollendEvent: !1,
        useAnimationFrameWithResizeObserver: !1
      }, n);
    }, this.notify = (n) => {
      var r, i;
      (i = (r = this.options).onChange) == null || i.call(r, this, n);
    }, this.maybeNotify = dn(
      () => (this.calculateRange(), [
        this.isScrolling,
        this.range ? this.range.startIndex : null,
        this.range ? this.range.endIndex : null
      ]),
      (n) => {
        this.notify(n);
      },
      {
        key: process.env.NODE_ENV !== "production" && "maybeNotify",
        debug: () => this.options.debug,
        initialDeps: [
          this.isScrolling,
          this.range ? this.range.startIndex : null,
          this.range ? this.range.endIndex : null
        ]
      }
    ), this.cleanup = () => {
      this.unsubs.filter(Boolean).forEach((n) => n()), this.unsubs = [], this.observer.disconnect(), this.scrollElement = null, this.targetWindow = null;
    }, this._didMount = () => () => {
      this.cleanup();
    }, this._willUpdate = () => {
      var i;
      var n;
      const r = this.options.enabled ? this.options.getScrollElement() : null;
      if (this.scrollElement !== r) {
        if (this.cleanup(), !r) {
          this.maybeNotify();
          return;
        }
        this.scrollElement = r, this.scrollElement && "ownerDocument" in this.scrollElement ? this.targetWindow = this.scrollElement.ownerDocument.defaultView : this.targetWindow = (i = (n = this.scrollElement) == null ? void 0 : n.window) != null ? i : null, this.elementsCache.forEach((o) => {
          this.observer.observe(o);
        }), this.unsubs.push(
          this.options.observeElementRect(this, (o) => {
            this.scrollRect = o, this.maybeNotify();
          })
        ), this.unsubs.push(
          this.options.observeElementOffset(this, (o, s) => {
            this.scrollAdjustments = 0, this.scrollDirection = s ? this.getScrollOffset() < o ? "forward" : "backward" : null, this.scrollOffset = o, this.isScrolling = s, this.maybeNotify();
          })
        ), this._scrollToOffset(this.getScrollOffset(), {
          adjustments: void 0,
          behavior: void 0
        });
      }
    }, this.getSize = () => {
      var n;
      return this.options.enabled ? (this.scrollRect = (n = this.scrollRect) != null ? n : this.options.initialRect, this.scrollRect[this.options.horizontal ? "width" : "height"]) : (this.scrollRect = null, 0);
    }, this.getScrollOffset = () => {
      var n;
      return this.options.enabled ? (this.scrollOffset = (n = this.scrollOffset) != null ? n : typeof this.options.initialOffset == "function" ? this.options.initialOffset() : this.options.initialOffset, this.scrollOffset) : (this.scrollOffset = null, 0);
    }, this.getFurthestMeasurement = (n, r) => {
      const i = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
      for (let s = r - 1; s >= 0; s--) {
        const a = n[s];
        if (i.has(a.lane))
          continue;
        const l = o.get(
          a.lane
        );
        if (l == null || a.end > l.end ? o.set(a.lane, a) : a.end < l.end && i.set(a.lane, !0), i.size === this.options.lanes)
          break;
      }
      return o.size === this.options.lanes ? Array.from(o.values()).sort((s, a) => s.end === a.end ? s.index - a.index : s.end - a.end)[0] : void 0;
    }, this.getMeasurementOptions = dn(
      () => [
        this.options.count,
        this.options.paddingStart,
        this.options.scrollMargin,
        this.options.getItemKey,
        this.options.enabled,
        this.options.lanes
      ],
      (n, r, i, o, s, a) => (this.prevLanes !== void 0 && this.prevLanes !== a && (this.lanesChangedFlag = !0), this.prevLanes = a, this.pendingMeasuredCacheIndexes = [], {
        count: n,
        paddingStart: r,
        scrollMargin: i,
        getItemKey: o,
        enabled: s,
        lanes: a
      }),
      {
        key: !1,
        skipInitialOnChange: !0,
        onChange: () => {
          this.notify(this.isScrolling);
        }
      }
    ), this.getMeasurements = dn(
      () => [this.getMeasurementOptions(), this.itemSizeCache],
      ({ count: n, paddingStart: r, scrollMargin: i, getItemKey: o, enabled: s, lanes: a }, l) => {
        if (!s)
          return this.measurementsCache = [], this.itemSizeCache.clear(), this.laneAssignments.clear(), [];
        if (this.laneAssignments.size > n)
          for (const h of this.laneAssignments.keys())
            h >= n && this.laneAssignments.delete(h);
        this.lanesChangedFlag && (this.lanesChangedFlag = !1, this.lanesSettling = !0, this.measurementsCache = [], this.itemSizeCache.clear(), this.laneAssignments.clear(), this.pendingMeasuredCacheIndexes = []), this.measurementsCache.length === 0 && !this.lanesSettling && (this.measurementsCache = this.options.initialMeasurementsCache, this.measurementsCache.forEach((h) => {
          this.itemSizeCache.set(h.key, h.size);
        }));
        const u = this.lanesSettling ? 0 : this.pendingMeasuredCacheIndexes.length > 0 ? Math.min(...this.pendingMeasuredCacheIndexes) : 0;
        this.pendingMeasuredCacheIndexes = [], this.lanesSettling && this.measurementsCache.length === n && (this.lanesSettling = !1);
        const c = this.measurementsCache.slice(0, u), f = new Array(a).fill(
          void 0
        );
        for (let h = 0; h < u; h++) {
          const d = c[h];
          d && (f[d.lane] = h);
        }
        for (let h = u; h < n; h++) {
          const d = o(h), p = this.laneAssignments.get(h);
          let m, g;
          if (p !== void 0 && this.options.lanes > 1) {
            m = p;
            const T = f[m], P = T !== void 0 ? c[T] : void 0;
            g = P ? P.end + this.options.gap : r + i;
          } else {
            const T = this.options.lanes === 1 ? c[h - 1] : this.getFurthestMeasurement(c, h);
            g = T ? T.end + this.options.gap : r + i, m = T ? T.lane : h % this.options.lanes, this.options.lanes > 1 && this.laneAssignments.set(h, m);
          }
          const y = l.get(d), w = typeof y == "number" ? y : this.options.estimateSize(h), b = g + w;
          c[h] = {
            index: h,
            start: g,
            size: w,
            end: b,
            key: d,
            lane: m
          }, f[m] = h;
        }
        return this.measurementsCache = c, c;
      },
      {
        key: process.env.NODE_ENV !== "production" && "getMeasurements",
        debug: () => this.options.debug
      }
    ), this.calculateRange = dn(
      () => [
        this.getMeasurements(),
        this.getSize(),
        this.getScrollOffset(),
        this.options.lanes
      ],
      (n, r, i, o) => this.range = n.length > 0 && r > 0 ? pm({
        measurements: n,
        outerSize: r,
        scrollOffset: i,
        lanes: o
      }) : null,
      {
        key: process.env.NODE_ENV !== "production" && "calculateRange",
        debug: () => this.options.debug
      }
    ), this.getVirtualIndexes = dn(
      () => {
        let n = null, r = null;
        const i = this.calculateRange();
        return i && (n = i.startIndex, r = i.endIndex), this.maybeNotify.updateDeps([this.isScrolling, n, r]), [
          this.options.rangeExtractor,
          this.options.overscan,
          this.options.count,
          n,
          r
        ];
      },
      (n, r, i, o, s) => o === null || s === null ? [] : n({
        startIndex: o,
        endIndex: s,
        overscan: r,
        count: i
      }),
      {
        key: process.env.NODE_ENV !== "production" && "getVirtualIndexes",
        debug: () => this.options.debug
      }
    ), this.indexFromElement = (n) => {
      const r = this.options.indexAttribute, i = n.getAttribute(r);
      return i ? parseInt(i, 10) : (console.warn(
        `Missing attribute name '${r}={index}' on measured element.`
      ), -1);
    }, this._measureElement = (n, r) => {
      const i = this.indexFromElement(n), o = this.measurementsCache[i];
      if (!o)
        return;
      const s = o.key, a = this.elementsCache.get(s);
      a !== n && (a && this.observer.unobserve(a), this.observer.observe(n), this.elementsCache.set(s, n)), n.isConnected && this.resizeItem(i, this.options.measureElement(n, r, this));
    }, this.resizeItem = (n, r) => {
      var a;
      const i = this.measurementsCache[n];
      if (!i)
        return;
      const o = (a = this.itemSizeCache.get(i.key)) != null ? a : i.size, s = r - o;
      s !== 0 && ((this.shouldAdjustScrollPositionOnItemSizeChange !== void 0 ? this.shouldAdjustScrollPositionOnItemSizeChange(i, s, this) : i.start < this.getScrollOffset() + this.scrollAdjustments) && (process.env.NODE_ENV !== "production" && this.options.debug && console.info("correction", s), this._scrollToOffset(this.getScrollOffset(), {
        adjustments: this.scrollAdjustments += s,
        behavior: void 0
      })), this.pendingMeasuredCacheIndexes.push(i.index), this.itemSizeCache = new Map(this.itemSizeCache.set(i.key, r)), this.notify(!1));
    }, this.measureElement = (n) => {
      if (!n) {
        this.elementsCache.forEach((r, i) => {
          r.isConnected || (this.observer.unobserve(r), this.elementsCache.delete(i));
        });
        return;
      }
      this._measureElement(n, void 0);
    }, this.getVirtualItems = dn(
      () => [this.getVirtualIndexes(), this.getMeasurements()],
      (n, r) => {
        const i = [];
        for (let o = 0, s = n.length; o < s; o++) {
          const a = n[o], l = r[a];
          i.push(l);
        }
        return i;
      },
      {
        key: process.env.NODE_ENV !== "production" && "getVirtualItems",
        debug: () => this.options.debug
      }
    ), this.getVirtualItemForOffset = (n) => {
      const r = this.getMeasurements();
      if (r.length !== 0)
        return Fa(
          r[Tu(
            0,
            r.length - 1,
            (i) => Fa(r[i]).start,
            n
          )]
        );
    }, this.getMaxScrollOffset = () => {
      if (!this.scrollElement) return 0;
      if ("scrollHeight" in this.scrollElement)
        return this.options.horizontal ? this.scrollElement.scrollWidth - this.scrollElement.clientWidth : this.scrollElement.scrollHeight - this.scrollElement.clientHeight;
      {
        const n = this.scrollElement.document.documentElement;
        return this.options.horizontal ? n.scrollWidth - this.scrollElement.innerWidth : n.scrollHeight - this.scrollElement.innerHeight;
      }
    }, this.getOffsetForAlignment = (n, r, i = 0) => {
      if (!this.scrollElement) return 0;
      const o = this.getSize(), s = this.getScrollOffset();
      r === "auto" && (r = n >= s + o ? "end" : "start"), r === "center" ? n += (i - o) / 2 : r === "end" && (n -= o);
      const a = this.getMaxScrollOffset();
      return Math.max(Math.min(a, n), 0);
    }, this.getOffsetForIndex = (n, r = "auto") => {
      n = Math.max(0, Math.min(n, this.options.count - 1));
      const i = this.measurementsCache[n];
      if (!i)
        return;
      const o = this.getSize(), s = this.getScrollOffset();
      if (r === "auto")
        if (i.end >= s + o - this.options.scrollPaddingEnd)
          r = "end";
        else if (i.start <= s + this.options.scrollPaddingStart)
          r = "start";
        else
          return [s, "start"];
      if (r === "end" && n === this.options.count - 1)
        return [this.getMaxScrollOffset(), r];
      const a = r === "end" ? i.end + this.options.scrollPaddingEnd : i.start - this.options.scrollPaddingStart;
      return [
        this.getOffsetForAlignment(a, r, i.size),
        r
      ];
    }, this.isDynamicMode = () => this.elementsCache.size > 0, this.scrollToOffset = (n, { align: r = "start", behavior: i } = {}) => {
      i === "smooth" && this.isDynamicMode() && console.warn(
        "The `smooth` scroll behavior is not fully supported with dynamic size."
      ), this._scrollToOffset(this.getOffsetForAlignment(n, r), {
        adjustments: void 0,
        behavior: i
      });
    }, this.scrollToIndex = (n, { align: r = "auto", behavior: i } = {}) => {
      i === "smooth" && this.isDynamicMode() && console.warn(
        "The `smooth` scroll behavior is not fully supported with dynamic size."
      ), n = Math.max(0, Math.min(n, this.options.count - 1)), this.currentScrollToIndex = n;
      let o = 0;
      const s = 10, a = (u) => {
        if (!this.targetWindow) return;
        const c = this.getOffsetForIndex(n, u);
        if (!c) {
          console.warn("Failed to get offset for index:", n);
          return;
        }
        const [f, h] = c;
        this._scrollToOffset(f, { adjustments: void 0, behavior: i }), this.targetWindow.requestAnimationFrame(() => {
          const d = () => {
            if (this.currentScrollToIndex !== n) return;
            const p = this.getScrollOffset(), m = this.getOffsetForIndex(n, h);
            if (!m) {
              console.warn("Failed to get offset for index:", n);
              return;
            }
            om(m[0], p) || l(h);
          };
          this.isDynamicMode() ? this.targetWindow.requestAnimationFrame(d) : d();
        });
      }, l = (u) => {
        this.targetWindow && this.currentScrollToIndex === n && (o++, o < s ? (process.env.NODE_ENV !== "production" && this.options.debug && console.info("Schedule retry", o, s), this.targetWindow.requestAnimationFrame(() => a(u))) : console.warn(
          `Failed to scroll to index ${n} after ${s} attempts.`
        ));
      };
      a(r);
    }, this.scrollBy = (n, { behavior: r } = {}) => {
      r === "smooth" && this.isDynamicMode() && console.warn(
        "The `smooth` scroll behavior is not fully supported with dynamic size."
      ), this._scrollToOffset(this.getScrollOffset() + n, {
        adjustments: void 0,
        behavior: r
      });
    }, this.getTotalSize = () => {
      var o;
      var n;
      const r = this.getMeasurements();
      let i;
      if (r.length === 0)
        i = this.options.paddingStart;
      else if (this.options.lanes === 1)
        i = (o = (n = r[r.length - 1]) == null ? void 0 : n.end) != null ? o : 0;
      else {
        const s = Array(this.options.lanes).fill(null);
        let a = r.length - 1;
        for (; a >= 0 && s.some((l) => l === null); ) {
          const l = r[a];
          s[l.lane] === null && (s[l.lane] = l.end), a--;
        }
        i = Math.max(...s.filter((l) => l !== null));
      }
      return Math.max(
        i - this.options.scrollMargin + this.options.paddingEnd,
        0
      );
    }, this._scrollToOffset = (n, {
      adjustments: r,
      behavior: i
    }) => {
      this.options.scrollToFn(n, { behavior: i, adjustments: r }, this);
    }, this.measure = () => {
      this.itemSizeCache = /* @__PURE__ */ new Map(), this.laneAssignments = /* @__PURE__ */ new Map(), this.notify(!1);
    }, this.setOptions(t);
  }
}
const Tu = (e, t, n, r) => {
  for (; e <= t; ) {
    const i = (e + t) / 2 | 0, o = n(i);
    if (o < r)
      e = i + 1;
    else if (o > r)
      t = i - 1;
    else
      return i;
  }
  return e > 0 ? e - 1 : 0;
};
function pm({
  measurements: e,
  outerSize: t,
  scrollOffset: n,
  lanes: r
}) {
  const i = e.length - 1, o = (l) => e[l].start;
  if (e.length <= r)
    return {
      startIndex: 0,
      endIndex: i
    };
  let s = Tu(
    0,
    i,
    o,
    n
  ), a = s;
  if (r === 1)
    for (; a < i && e[a].end < n + t; )
      a++;
  else if (r > 1) {
    const l = Array(r).fill(0);
    for (; a < i && l.some((c) => c < n + t); ) {
      const c = e[a];
      l[c.lane] = c.end, a++;
    }
    const u = Array(r).fill(n + t);
    for (; s >= 0 && u.some((c) => c >= n); ) {
      const c = e[s];
      u[c.lane] = c.start, s--;
    }
    s = Math.max(0, s - s % r), a = Math.min(i, a + (r - 1 - a % r));
  }
  return { startIndex: s, endIndex: a };
}
const Ba = typeof document != "undefined" ? S.useLayoutEffect : S.useEffect;
function mm(n) {
  var r = n, {
    useFlushSync: e = !0
  } = r, t = k(r, [
    "useFlushSync"
  ]);
  const i = S.useReducer(() => ({}), {})[1], o = E(v({}, t), {
    onChange: (a, l) => {
      var u;
      e && l ? nt(i) : i(), (u = t.onChange) == null || u.call(t, a, l);
    }
  }), [s] = S.useState(
    () => new hm(o)
  );
  return s.setOptions(o), Ba(() => s._didMount(), []), Ba(() => s._willUpdate()), s;
}
function gm(e) {
  return mm(v({
    observeElementRect: cm,
    observeElementOffset: um,
    scrollToFn: fm
  }, e));
}
function vm(e, t) {
  return e !== null && t !== null && typeof e == "object" && typeof t == "object" && "id" in e && "id" in t ? e.id === t.id : e === t;
}
function Pu(e = vm) {
  return re((t, n) => {
    if (typeof e == "string") {
      let r = e;
      return (t == null ? void 0 : t[r]) === (n == null ? void 0 : n[r]);
    }
    return e(t, n);
  }, [e]);
}
function ja(e) {
  if (e === null) return { width: 0, height: 0 };
  let { width: t, height: n } = e.getBoundingClientRect();
  return { width: t, height: n };
}
function Kr(e, t, n = !1) {
  let [r, i] = ne(() => ja(t));
  return he(() => {
    if (!t || !e) return;
    let o = He();
    return o.requestAnimationFrame(function s() {
      o.requestAnimationFrame(s), i((a) => {
        let l = ja(t);
        return l.width === a.width && l.height === a.height ? a : l;
      });
    }), () => {
      o.dispose();
    };
  }, [t, e]), n ? { width: `${r.width}px`, height: `${r.height}px` } : r;
}
var ws = ((e) => (e[e.Left = 0] = "Left", e[e.Right = 2] = "Right", e))(ws || {});
function ku(e) {
  let t = z(null), n = L((i) => {
    t.current = i.pointerType, !Tn(i.currentTarget) && i.pointerType === "mouse" && i.button === ws.Left && (i.preventDefault(), e(i));
  }), r = L((i) => {
    t.current !== "mouse" && (Tn(i.currentTarget) || e(i));
  });
  return { onPointerDown: n, onClick: r };
}
let Cu = class extends Map {
  constructor(t) {
    super(), this.factory = t;
  }
  get(t) {
    let n = super.get(t);
    return n === void 0 && (n = this.factory(t), this.set(t, n)), n;
  }
};
var bm = Object.defineProperty, ym = (e, t, n) => t in e ? bm(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, xm = (e, t, n) => (ym(e, t + "", n), n), Ou = (e, t, n) => {
  if (!t.has(e)) throw TypeError("Cannot " + n);
}, Ye = (e, t, n) => (Ou(e, t, "read from private field"), n ? n.call(e) : t.get(e)), Xi = (e, t, n) => {
  if (t.has(e)) throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, za = (e, t, n, r) => (Ou(e, t, "write to private field"), t.set(e, n), n), at, jn, zn;
let bi = class {
  constructor(t) {
    Xi(this, at, {}), Xi(this, jn, new Cu(() => /* @__PURE__ */ new Set())), Xi(this, zn, /* @__PURE__ */ new Set()), xm(this, "disposables", He()), za(this, at, t), dt.isServer && this.disposables.microTask(() => {
      this.dispose();
    });
  }
  dispose() {
    this.disposables.dispose();
  }
  get state() {
    return Ye(this, at);
  }
  subscribe(t, n) {
    if (dt.isServer) return () => {
    };
    let r = { selector: t, callback: n, current: t(Ye(this, at)) };
    return Ye(this, zn).add(r), this.disposables.add(() => {
      Ye(this, zn).delete(r);
    });
  }
  on(t, n) {
    return dt.isServer ? () => {
    } : (Ye(this, jn).get(t).add(n), this.disposables.add(() => {
      Ye(this, jn).get(t).delete(n);
    }));
  }
  send(t) {
    let n = this.reduce(Ye(this, at), t);
    if (n !== Ye(this, at)) {
      za(this, at, n);
      for (let r of Ye(this, zn)) {
        let i = r.selector(Ye(this, at));
        $u(r.current, i) || (r.current = i, r.callback(i));
      }
      for (let r of Ye(this, jn).get(t.type)) r(Ye(this, at), t);
    }
  }
};
at = /* @__PURE__ */ new WeakMap(), jn = /* @__PURE__ */ new WeakMap(), zn = /* @__PURE__ */ new WeakMap();
function $u(e, t) {
  return Object.is(e, t) ? !0 : typeof e != "object" || e === null || typeof t != "object" || t === null ? !1 : Array.isArray(e) && Array.isArray(t) ? e.length !== t.length ? !1 : qi(e[Symbol.iterator](), t[Symbol.iterator]()) : e instanceof Map && t instanceof Map || e instanceof Set && t instanceof Set ? e.size !== t.size ? !1 : qi(e.entries(), t.entries()) : _a(e) && _a(t) ? qi(Object.entries(e)[Symbol.iterator](), Object.entries(t)[Symbol.iterator]()) : !1;
}
function qi(e, t) {
  do {
    let n = e.next(), r = t.next();
    if (n.done && r.done) return !0;
    if (n.done || r.done || !Object.is(n.value, r.value)) return !1;
  } while (!0);
}
function _a(e) {
  if (Object.prototype.toString.call(e) !== "[object Object]") return !1;
  let t = Object.getPrototypeOf(e);
  return t === null || Object.getPrototypeOf(t) === null;
}
function Zi(e) {
  let [t, n] = e(), r = He();
  return (...i) => {
    t(...i), r.dispose(), r.microTask(n);
  };
}
var wm = Object.defineProperty, Em = (e, t, n) => t in e ? wm(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Wa = (e, t, n) => (Em(e, typeof t != "symbol" ? t + "" : t, n), n), Es = ((e) => (e[e.Push = 0] = "Push", e[e.Pop = 1] = "Pop", e))(Es || {});
let Sm = { 0(e, t) {
  let n = t.id, r = e.stack, i = e.stack.indexOf(n);
  if (i !== -1) {
    let o = e.stack.slice();
    return o.splice(i, 1), o.push(n), r = o, E(v({}, e), { stack: r });
  }
  return E(v({}, e), { stack: [...e.stack, n] });
}, 1(e, t) {
  let n = t.id, r = e.stack.indexOf(n);
  if (r === -1) return e;
  let i = e.stack.slice();
  return i.splice(r, 1), E(v({}, e), { stack: i });
} }, Tm = class Au extends bi {
  constructor() {
    super(...arguments), Wa(this, "actions", { push: (t) => this.send({ type: 0, id: t }), pop: (t) => this.send({ type: 1, id: t }) }), Wa(this, "selectors", { isTop: (t, n) => t.stack[t.stack.length - 1] === n, inStack: (t, n) => t.stack.includes(n) });
  }
  static new() {
    return new Au({ stack: [] });
  }
  reduce(t, n) {
    return me(n.type, Sm, t, n);
  }
};
const un = new Cu(() => Tm.new());
var Cr = { exports: {} }, Qi = {};
/**
 * @license React
 * use-sync-external-store-with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ha;
function Pm() {
  if (Ha) return Qi;
  Ha = 1;
  var e = O;
  function t(l, u) {
    return l === u && (l !== 0 || 1 / l === 1 / u) || l !== l && u !== u;
  }
  var n = typeof Object.is == "function" ? Object.is : t, r = e.useSyncExternalStore, i = e.useRef, o = e.useEffect, s = e.useMemo, a = e.useDebugValue;
  return Qi.useSyncExternalStoreWithSelector = function(l, u, c, f, h) {
    var d = i(null);
    if (d.current === null) {
      var p = { hasValue: !1, value: null };
      d.current = p;
    } else p = d.current;
    d = s(
      function() {
        function g(P) {
          if (!y) {
            if (y = !0, w = P, P = f(P), h !== void 0 && p.hasValue) {
              var C = p.value;
              if (h(C, P))
                return b = C;
            }
            return b = P;
          }
          if (C = b, n(w, P)) return C;
          var A = f(P);
          return h !== void 0 && h(C, A) ? (w = P, C) : (w = P, b = A);
        }
        var y = !1, w, b, T = c === void 0 ? null : c;
        return [
          function() {
            return g(u());
          },
          T === null ? void 0 : function() {
            return g(T());
          }
        ];
      },
      [u, c, f, h]
    );
    var m = r(l, d[0], d[1]);
    return o(
      function() {
        p.hasValue = !0, p.value = m;
      },
      [m]
    ), a(m), m;
  }, Qi;
}
var Ji = {};
/**
 * @license React
 * use-sync-external-store-with-selector.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ua;
function km() {
  return Ua || (Ua = 1, process.env.NODE_ENV !== "production" && (function() {
    function e(l, u) {
      return l === u && (l !== 0 || 1 / l === 1 / u) || l !== l && u !== u;
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ != "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var t = O, n = typeof Object.is == "function" ? Object.is : e, r = t.useSyncExternalStore, i = t.useRef, o = t.useEffect, s = t.useMemo, a = t.useDebugValue;
    Ji.useSyncExternalStoreWithSelector = function(l, u, c, f, h) {
      var d = i(null);
      if (d.current === null) {
        var p = { hasValue: !1, value: null };
        d.current = p;
      } else p = d.current;
      d = s(
        function() {
          function g(P) {
            if (!y) {
              if (y = !0, w = P, P = f(P), h !== void 0 && p.hasValue) {
                var C = p.value;
                if (h(C, P))
                  return b = C;
              }
              return b = P;
            }
            if (C = b, n(w, P))
              return C;
            var A = f(P);
            return h !== void 0 && h(C, A) ? (w = P, C) : (w = P, b = A);
          }
          var y = !1, w, b, T = c === void 0 ? null : c;
          return [
            function() {
              return g(u());
            },
            T === null ? void 0 : function() {
              return g(T());
            }
          ];
        },
        [u, c, f, h]
      );
      var m = r(l, d[0], d[1]);
      return o(
        function() {
          p.hasValue = !0, p.value = m;
        },
        [m]
      ), a(m), m;
    }, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ != "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })()), Ji;
}
var Ka;
function Cm() {
  return Ka || (Ka = 1, process.env.NODE_ENV === "production" ? Cr.exports = Pm() : Cr.exports = km()), Cr.exports;
}
var Om = Cm();
function ue(e, t, n = $u) {
  return Om.useSyncExternalStoreWithSelector(L((r) => e.subscribe($m, r)), L(() => e.state), L(() => e.state), L(t), n);
}
function $m(e) {
  return e;
}
function ur(e, t) {
  let n = ye(), r = un.get(t), [i, o] = ue(r, re((s) => [r.selectors.isTop(s, n), r.selectors.inStack(s, n)], [r, n]));
  return he(() => {
    if (e) return r.actions.push(n), () => r.actions.pop(n);
  }, [r, e, n]), e ? o ? i : !0 : !1;
}
let Ro = /* @__PURE__ */ new Map(), Hn = /* @__PURE__ */ new Map();
function Ga(e) {
  var t;
  let n = (t = Hn.get(e)) != null ? t : 0;
  return Hn.set(e, n + 1), n !== 0 ? () => Ya(e) : (Ro.set(e, { "aria-hidden": e.getAttribute("aria-hidden"), inert: e.inert }), e.setAttribute("aria-hidden", "true"), e.inert = !0, () => Ya(e));
}
function Ya(e) {
  var t;
  let n = (t = Hn.get(e)) != null ? t : 1;
  if (n === 1 ? Hn.delete(e) : Hn.set(e, n - 1), n !== 1) return;
  let r = Ro.get(e);
  r && (r["aria-hidden"] === null ? e.removeAttribute("aria-hidden") : e.setAttribute("aria-hidden", r["aria-hidden"]), e.inert = r.inert, Ro.delete(e));
}
function Ss(e, { allowed: t, disallowed: n } = {}) {
  let r = ur(e, "inert-others");
  he(() => {
    var i, o;
    if (!r) return;
    let s = He();
    for (let l of (i = n == null ? void 0 : n()) != null ? i : []) l && s.add(Ga(l));
    let a = (o = t == null ? void 0 : t()) != null ? o : [];
    for (let l of a) {
      if (!l) continue;
      let u = Mt(l);
      if (!u) continue;
      let c = l.parentElement;
      for (; c && c !== u.body; ) {
        for (let f of c.children) a.some((h) => f.contains(h)) || s.add(Ga(f));
        c = c.parentElement;
      }
    }
    return s.dispose;
  }, [r, t, n]);
}
function yi(e, t, n) {
  let r = je((i) => {
    let o = i.getBoundingClientRect();
    o.x === 0 && o.y === 0 && o.width === 0 && o.height === 0 && n();
  });
  be(() => {
    if (!e) return;
    let i = t === null ? null : De(t) ? t : t.current;
    if (!i) return;
    let o = He();
    if (typeof ResizeObserver != "undefined") {
      let s = new ResizeObserver(() => r.current(i));
      s.observe(i), o.add(() => s.disconnect());
    }
    if (typeof IntersectionObserver != "undefined") {
      let s = new IntersectionObserver(() => r.current(i));
      s.observe(i), o.add(() => s.disconnect());
    }
    return () => o.dispose();
  }, [t, r, e]);
}
let Gr = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "details>summary", "textarea:not([disabled])"].map((e) => `${e}:not([tabindex='-1'])`).join(","), Am = ["[data-autofocus]"].map((e) => `${e}:not([tabindex='-1'])`).join(",");
var xe = ((e) => (e[e.First = 1] = "First", e[e.Previous = 2] = "Previous", e[e.Next = 4] = "Next", e[e.Last = 8] = "Last", e[e.WrapAround = 16] = "WrapAround", e[e.NoScroll = 32] = "NoScroll", e[e.AutoFocus = 64] = "AutoFocus", e))(xe || {}), ut = ((e) => (e[e.Error = 0] = "Error", e[e.Overflow = 1] = "Overflow", e[e.Success = 2] = "Success", e[e.Underflow = 3] = "Underflow", e))(ut || {}), Mm = ((e) => (e[e.Previous = -1] = "Previous", e[e.Next = 1] = "Next", e))(Mm || {});
function dr(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(Gr)).sort((t, n) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (n.tabIndex || Number.MAX_SAFE_INTEGER)));
}
function Rm(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(Am)).sort((t, n) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (n.tabIndex || Number.MAX_SAFE_INTEGER)));
}
var xi = ((e) => (e[e.Strict = 0] = "Strict", e[e.Loose = 1] = "Loose", e))(xi || {});
function Ts(e, t = 0) {
  var n;
  return e === ((n = Mt(e)) == null ? void 0 : n.body) ? !1 : me(t, { 0() {
    return e.matches(Gr);
  }, 1() {
    let r = e;
    for (; r !== null; ) {
      if (r.matches(Gr)) return !0;
      r = r.parentElement;
    }
    return !1;
  } });
}
var Dm = ((e) => (e[e.Keyboard = 0] = "Keyboard", e[e.Mouse = 1] = "Mouse", e))(Dm || {});
typeof window != "undefined" && typeof document != "undefined" && (document.addEventListener("keydown", (e) => {
  e.metaKey || e.altKey || e.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0), document.addEventListener("click", (e) => {
  e.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : e.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0));
function Pt(e) {
  e == null || e.focus({ preventScroll: !0 });
}
let Lm = ["textarea", "input"].join(",");
function Fm(e) {
  var t, n;
  return (n = (t = e == null ? void 0 : e.matches) == null ? void 0 : t.call(e, Lm)) != null ? n : !1;
}
function Vt(e, t = (n) => n) {
  return e.slice().sort((n, r) => {
    let i = t(n), o = t(r);
    if (i === null || o === null) return 0;
    let s = i.compareDocumentPosition(o);
    return s & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : s & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function Im(e, t, n = e === null ? document.body : zt(e)) {
  return Me(dr(n), t, { relativeTo: e });
}
function Me(e, t, { sorted: n = !0, relativeTo: r = null, skipElements: i = [] } = {}) {
  let o = Array.isArray(e) ? e.length > 0 ? zt(e[0]) : document : zt(e), s = Array.isArray(e) ? n ? Vt(e) : e : t & 64 ? Rm(e) : dr(e);
  i.length > 0 && s.length > 1 && (s = s.filter((d) => !i.some((p) => p != null && "current" in p ? (p == null ? void 0 : p.current) === d : p === d))), r = r != null ? r : o == null ? void 0 : o.activeElement;
  let a = (() => {
    if (t & 5) return 1;
    if (t & 10) return -1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), l = (() => {
    if (t & 1) return 0;
    if (t & 2) return Math.max(0, s.indexOf(r)) - 1;
    if (t & 4) return Math.max(0, s.indexOf(r)) + 1;
    if (t & 8) return s.length - 1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), u = t & 32 ? { preventScroll: !0 } : {}, c = 0, f = s.length, h;
  do {
    if (c >= f || c + f <= 0) return 0;
    let d = l + c;
    if (t & 16) d = (d + f) % f;
    else {
      if (d < 0) return 3;
      if (d >= f) return 1;
    }
    h = s[d], h == null || h.focus(u), c += a;
  } while (h !== _t(h));
  return t & 6 && Fm(h) && h.select(), 2;
}
function Mu() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
function Nm() {
  return /Android/gi.test(window.navigator.userAgent);
}
function Do() {
  return Mu() || Nm();
}
function hn(e, t, n, r) {
  let i = je(n);
  be(() => {
    if (!e) return;
    function o(s) {
      i.current(s);
    }
    return document.addEventListener(t, o, r), () => document.removeEventListener(t, o, r);
  }, [e, t, r]);
}
function Ru(e, t, n, r) {
  let i = je(n);
  be(() => {
    if (!e) return;
    function o(s) {
      i.current(s);
    }
    return window.addEventListener(t, o, r), () => window.removeEventListener(t, o, r);
  }, [e, t, r]);
}
const Xa = 30;
function wi(e, t, n) {
  let r = je(n), i = re(function(a, l) {
    if (a.defaultPrevented) return;
    let u = l(a);
    if (u === null || !u.getRootNode().contains(u) || !u.isConnected) return;
    let c = (function f(h) {
      return typeof h == "function" ? f(h()) : Array.isArray(h) || h instanceof Set ? h : [h];
    })(t);
    for (let f of c) if (f !== null && (f.contains(u) || a.composed && a.composedPath().includes(f))) return;
    return !Ts(u, xi.Loose) && u.tabIndex !== -1 && a.preventDefault(), r.current(a, u);
  }, [r, t]), o = z(null);
  hn(e, "pointerdown", (a) => {
    var l, u;
    Do() || (o.current = ((u = (l = a.composedPath) == null ? void 0 : l.call(a)) == null ? void 0 : u[0]) || a.target);
  }, !0), hn(e, "pointerup", (a) => {
    if (Do() || !o.current) return;
    let l = o.current;
    return o.current = null, i(a, () => l);
  }, !0);
  let s = z({ x: 0, y: 0 });
  hn(e, "touchstart", (a) => {
    s.current.x = a.touches[0].clientX, s.current.y = a.touches[0].clientY;
  }, !0), hn(e, "touchend", (a) => {
    let l = { x: a.changedTouches[0].clientX, y: a.changedTouches[0].clientY };
    if (!(Math.abs(l.x - s.current.x) >= Xa || Math.abs(l.y - s.current.y) >= Xa)) return i(a, () => qe(a.target) ? a.target : null);
  }, !0), Ru(e, "blur", (a) => i(a, () => Up(window.document.activeElement) ? window.document.activeElement : null), !0);
}
function kt(...e) {
  return se(() => Mt(...e), [...e]);
}
function Vm(...e) {
  return se(() => zt(...e), [...e]);
}
var Bm = ((e) => (e[e.Ignore = 0] = "Ignore", e[e.Select = 1] = "Select", e[e.Close = 2] = "Close", e))(Bm || {});
const wt = { Ignore: { kind: 0 }, Select: (e) => ({ kind: 1, target: e }), Close: { kind: 2 } }, jm = 200, qa = 5;
function Du(e, { trigger: t, action: n, close: r, select: i }) {
  let o = z(null), s = z(null), a = z(null);
  hn(e && t !== null, "pointerdown", (l) => {
    bu(l == null ? void 0 : l.target) && t != null && t.contains(l.target) && (s.current = l.x, a.current = l.y, o.current = l.timeStamp);
  }), hn(e && t !== null, "pointerup", (l) => {
    var u, c;
    let f = o.current;
    if (f === null || (o.current = null, !qe(l.target)) || Math.abs(l.x - ((u = s.current) != null ? u : l.x)) < qa && Math.abs(l.y - ((c = a.current) != null ? c : l.y)) < qa) return;
    let h = n(l);
    switch (h.kind) {
      case 0:
        return;
      case 1: {
        l.timeStamp - f > jm && (i(h.target), r());
        break;
      }
      case 2: {
        r();
        break;
      }
    }
  }, { capture: !0 });
}
function Ei(e, t, n, r) {
  let i = je(n);
  be(() => {
    e = e != null ? e : window;
    function o(s) {
      i.current(s);
    }
    return e.addEventListener(t, o, r), () => e.removeEventListener(t, o, r);
  }, [e, t, r]);
}
function Lu(e) {
  let t = z({ value: "", selectionStart: null, selectionEnd: null });
  return Ei(e, "blur", (n) => {
    let r = n.target;
    Ur(r) && (t.current = { value: r.value, selectionStart: r.selectionStart, selectionEnd: r.selectionEnd });
  }), L(() => {
    if (!di(e) && Ur(e) && e.isConnected) {
      if (e.focus({ preventScroll: !0 }), e.value !== t.current.value) e.setSelectionRange(e.value.length, e.value.length);
      else {
        let { selectionStart: n, selectionEnd: r } = t.current;
        n !== null && r !== null && e.setSelectionRange(n, r);
      }
      t.current = { value: "", selectionStart: null, selectionEnd: null };
    }
  });
}
function fr(e, t) {
  return se(() => {
    var n;
    if (e.type) return e.type;
    let r = (n = e.as) != null ? n : "button";
    if (typeof r == "string" && r.toLowerCase() === "button" || (t == null ? void 0 : t.tagName) === "BUTTON" && !t.hasAttribute("type")) return "button";
  }, [e.type, e.as, t]);
}
function zm(e) {
  return Hh(e.subscribe, e.getSnapshot, e.getSnapshot);
}
function _m(e, t) {
  let n = e(), r = /* @__PURE__ */ new Set();
  return { getSnapshot() {
    return n;
  }, subscribe(i) {
    return r.add(i), () => r.delete(i);
  }, dispatch(i, ...o) {
    let s = t[i].call(n, ...o);
    s && (n = s, r.forEach((a) => a()));
  } };
}
function Wm() {
  let e;
  return { before({ doc: t }) {
    var n;
    let r = t.documentElement, i = (n = t.defaultView) != null ? n : window;
    e = Math.max(0, i.innerWidth - r.clientWidth);
  }, after({ doc: t, d: n }) {
    let r = t.documentElement, i = Math.max(0, r.clientWidth - r.offsetWidth), o = Math.max(0, e - i);
    n.style(r, "paddingRight", `${o}px`);
  } };
}
function Hm() {
  return Mu() ? { before({ doc: e, d: t, meta: n }) {
    function r(i) {
      for (let o of n().containers) for (let s of o()) if (s.contains(i)) return !0;
      return !1;
    }
    t.microTask(() => {
      var i;
      if (window.getComputedStyle(e.documentElement).scrollBehavior !== "auto") {
        let a = He();
        a.style(e.documentElement, "scrollBehavior", "auto"), t.add(() => t.microTask(() => a.dispose()));
      }
      let o = (i = window.scrollY) != null ? i : window.pageYOffset, s = null;
      t.addEventListener(e, "click", (a) => {
        if (qe(a.target)) try {
          let l = a.target.closest("a");
          if (!l) return;
          let { hash: u } = new URL(l.href), c = e.querySelector(u);
          qe(c) && !r(c) && (s = c);
        } catch (l) {
        }
      }, !0), t.group((a) => {
        t.addEventListener(e, "touchstart", (l) => {
          if (a.dispose(), qe(l.target) && Hp(l.target)) if (r(l.target)) {
            let u = l.target;
            for (; u.parentElement && r(u.parentElement); ) u = u.parentElement;
            a.style(u, "overscrollBehavior", "contain");
          } else a.style(l.target, "touchAction", "none");
        });
      }), t.addEventListener(e, "touchmove", (a) => {
        if (qe(a.target)) {
          if (Ur(a.target)) return;
          if (r(a.target)) {
            let l = a.target;
            for (; l.parentElement && l.dataset.headlessuiPortal !== "" && !(l.scrollHeight > l.clientHeight || l.scrollWidth > l.clientWidth); ) l = l.parentElement;
            l.dataset.headlessuiPortal === "" && a.preventDefault();
          } else a.preventDefault();
        }
      }, { passive: !1 }), t.add(() => {
        var a;
        let l = (a = window.scrollY) != null ? a : window.pageYOffset;
        o !== l && window.scrollTo(0, o), s && s.isConnected && (s.scrollIntoView({ block: "nearest" }), s = null);
      });
    });
  } } : {};
}
function Um() {
  return { before({ doc: e, d: t }) {
    t.style(e.documentElement, "overflow", "hidden");
  } };
}
function Za(e) {
  let t = {};
  for (let n of e) Object.assign(t, n(t));
  return t;
}
let en = _m(() => /* @__PURE__ */ new Map(), { PUSH(e, t) {
  var n;
  let r = (n = this.get(e)) != null ? n : { doc: e, count: 0, d: He(), meta: /* @__PURE__ */ new Set(), computedMeta: {} };
  return r.count++, r.meta.add(t), r.computedMeta = Za(r.meta), this.set(e, r), this;
}, POP(e, t) {
  let n = this.get(e);
  return n && (n.count--, n.meta.delete(t), n.computedMeta = Za(n.meta)), this;
}, SCROLL_PREVENT(e) {
  let t = { doc: e.doc, d: e.d, meta() {
    return e.computedMeta;
  } }, n = [Hm(), Wm(), Um()];
  n.forEach(({ before: r }) => r == null ? void 0 : r(t)), n.forEach(({ after: r }) => r == null ? void 0 : r(t));
}, SCROLL_ALLOW({ d: e }) {
  e.dispose();
}, TEARDOWN({ doc: e }) {
  this.delete(e);
} });
en.subscribe(() => {
  let e = en.getSnapshot(), t = /* @__PURE__ */ new Map();
  for (let [n] of e) t.set(n, n.documentElement.style.overflow);
  for (let n of e.values()) {
    let r = t.get(n.doc) === "hidden", i = n.count !== 0;
    (i && !r || !i && r) && en.dispatch(n.count > 0 ? "SCROLL_PREVENT" : "SCROLL_ALLOW", n), n.count === 0 && en.dispatch("TEARDOWN", n);
  }
});
function Km(e, t, n = () => ({ containers: [] })) {
  let r = zm(en), i = t ? r.get(t) : void 0, o = i ? i.count > 0 : !1;
  return he(() => {
    if (!(!t || !e)) return en.dispatch("PUSH", t, n), () => en.dispatch("POP", t, n);
  }, [e, t]), o;
}
function Si(e, t, n = () => [document.body]) {
  let r = ur(e, "scroll-lock");
  Km(r, t, (i) => {
    var o;
    return { containers: [...(o = i.containers) != null ? o : [], n] };
  });
}
function Qa(e) {
  return [e.screenX, e.screenY];
}
function Fu() {
  let e = z([-1, -1]);
  return { wasMoved(t) {
    let n = Qa(t);
    return e.current[0] === n[0] && e.current[1] === n[1] ? !1 : (e.current = n, !0);
  }, update(t) {
    e.current = Qa(t);
  } };
}
function Gm(e = 0) {
  let [t, n] = ne(e), r = re((l) => n(l), []), i = re((l) => n((u) => u | l), []), o = re((l) => (t & l) === l, [t]), s = re((l) => n((u) => u & ~l), []), a = re((l) => n((u) => u ^ l), []);
  return { flags: t, setFlag: r, addFlag: i, hasFlag: o, removeFlag: s, toggleFlag: a };
}
var Ja, el;
typeof process != "undefined" && typeof globalThis != "undefined" && typeof Element != "undefined" && ((Ja = process == null ? void 0 : process.env) == null ? void 0 : Ja.NODE_ENV) === "test" && typeof ((el = Element == null ? void 0 : Element.prototype) == null ? void 0 : el.getAnimations) == "undefined" && (Element.prototype.getAnimations = function() {
  return console.warn(["Headless UI has polyfilled `Element.prototype.getAnimations` for your tests.", "Please install a proper polyfill e.g. `jsdom-testing-mocks`, to silence these warnings.", "", "Example usage:", "```js", "import { mockAnimationsApi } from 'jsdom-testing-mocks'", "mockAnimationsApi()", "```"].join(`
`)), [];
});
var Ym = ((e) => (e[e.None = 0] = "None", e[e.Closed = 1] = "Closed", e[e.Enter = 2] = "Enter", e[e.Leave = 4] = "Leave", e))(Ym || {});
function On(e) {
  let t = {};
  for (let n in e) e[n] === !0 && (t[`data-${n}`] = "");
  return t;
}
function $n(e, t, n, r) {
  let [i, o] = ne(n), { hasFlag: s, addFlag: a, removeFlag: l } = Gm(e && i ? 3 : 0), u = z(!1), c = z(!1), f = bt();
  return he(() => {
    var h;
    if (e) {
      if (n && o(!0), !t) {
        n && a(3);
        return;
      }
      return (h = r == null ? void 0 : r.start) == null || h.call(r, n), Xm(t, { inFlight: u, prepare() {
        c.current ? c.current = !1 : c.current = u.current, u.current = !0, !c.current && (n ? (a(3), l(4)) : (a(4), l(2)));
      }, run() {
        c.current ? n ? (l(3), a(4)) : (l(4), a(3)) : n ? l(1) : a(1);
      }, done() {
        var d;
        c.current && Qm(t) || (u.current = !1, l(7), n || o(!1), (d = r == null ? void 0 : r.end) == null || d.call(r, n));
      } });
    }
  }, [e, n, t, f]), e ? [i, { closed: s(1), enter: s(2), leave: s(4), transition: s(2) || s(4) }] : [n, { closed: void 0, enter: void 0, leave: void 0, transition: void 0 }];
}
function Xm(e, { prepare: t, run: n, done: r, inFlight: i }) {
  let o = He();
  return Zm(e, { prepare: t, inFlight: i }), o.nextFrame(() => {
    n(), o.requestAnimationFrame(() => {
      o.add(qm(e, r));
    });
  }), o.dispose;
}
function qm(e, t) {
  var n, r;
  let i = He();
  if (!e) return i.dispose;
  let o = !1;
  i.add(() => {
    o = !0;
  });
  let s = (r = (n = e.getAnimations) == null ? void 0 : n.call(e).filter((a) => a instanceof CSSTransition)) != null ? r : [];
  return s.length === 0 ? (t(), i.dispose) : (Promise.allSettled(s.map((a) => a.finished)).then(() => {
    o || t();
  }), i.dispose);
}
function Zm(e, { inFlight: t, prepare: n }) {
  if (t != null && t.current) {
    n();
    return;
  }
  let r = e.style.transition;
  e.style.transition = "none", n(), e.offsetHeight, e.style.transition = r;
}
function Qm(e) {
  var t, n;
  return ((n = (t = e.getAnimations) == null ? void 0 : t.call(e)) != null ? n : []).some((r) => r instanceof CSSTransition && r.playState !== "finished");
}
function Jm(e, { container: t, accept: n, walk: r }) {
  let i = z(n), o = z(r);
  be(() => {
    i.current = n, o.current = r;
  }, [n, r]), he(() => {
    if (!t || !e) return;
    let s = Mt(t);
    if (!s) return;
    let a = i.current, l = o.current, u = Object.assign((f) => a(f), { acceptNode: a }), c = s.createTreeWalker(t, NodeFilter.SHOW_ELEMENT, u, !1);
    for (; c.nextNode(); ) l(c.currentNode);
  }, [t, e, i, o]);
}
function qn(e, t) {
  let n = z([]), r = L(e);
  be(() => {
    let i = [...n.current];
    for (let [o, s] of t.entries()) if (n.current[o] !== s) {
      let a = r(t, i);
      return n.current = t, a;
    }
  }, [r, ...t]);
}
function Ti() {
  return typeof window != "undefined";
}
function An(e) {
  return Iu(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Ge(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function yt(e) {
  var t;
  return (t = (Iu(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Iu(e) {
  return Ti() ? e instanceof Node || e instanceof Ge(e).Node : !1;
}
function Ne(e) {
  return Ti() ? e instanceof Element || e instanceof Ge(e).Element : !1;
}
function mt(e) {
  return Ti() ? e instanceof HTMLElement || e instanceof Ge(e).HTMLElement : !1;
}
function tl(e) {
  return !Ti() || typeof ShadowRoot == "undefined" ? !1 : e instanceof ShadowRoot || e instanceof Ge(e).ShadowRoot;
}
const eg = /* @__PURE__ */ new Set(["inline", "contents"]);
function hr(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: i
  } = ot(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !eg.has(i);
}
const tg = /* @__PURE__ */ new Set(["table", "td", "th"]);
function ng(e) {
  return tg.has(An(e));
}
const rg = [":popover-open", ":modal"];
function Pi(e) {
  return rg.some((t) => {
    try {
      return e.matches(t);
    } catch (n) {
      return !1;
    }
  });
}
const ig = ["transform", "translate", "scale", "rotate", "perspective"], og = ["transform", "translate", "scale", "rotate", "perspective", "filter"], sg = ["paint", "layout", "strict", "content"];
function Ps(e) {
  const t = ks(), n = Ne(e) ? ot(e) : e;
  return ig.some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || og.some((r) => (n.willChange || "").includes(r)) || sg.some((r) => (n.contain || "").includes(r));
}
function ag(e) {
  let t = Wt(e);
  for (; mt(t) && !Pn(t); ) {
    if (Ps(t))
      return t;
    if (Pi(t))
      return null;
    t = Wt(t);
  }
  return null;
}
function ks() {
  return typeof CSS == "undefined" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const lg = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function Pn(e) {
  return lg.has(An(e));
}
function ot(e) {
  return Ge(e).getComputedStyle(e);
}
function ki(e) {
  return Ne(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function Wt(e) {
  if (An(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    tl(e) && e.host || // Fallback.
    yt(e)
  );
  return tl(t) ? t.host : t;
}
function Nu(e) {
  const t = Wt(e);
  return Pn(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : mt(t) && hr(t) ? t : Nu(t);
}
function Zn(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const i = Nu(e), o = i === ((r = e.ownerDocument) == null ? void 0 : r.body), s = Ge(i);
  if (o) {
    const a = Lo(s);
    return t.concat(s, s.visualViewport || [], hr(i) ? i : [], a && n ? Zn(a) : []);
  }
  return t.concat(i, Zn(i, [], n));
}
function Lo(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function cg() {
  const e = navigator.userAgentData;
  return e && Array.isArray(e.brands) ? e.brands.map((t) => {
    let {
      brand: n,
      version: r
    } = t;
    return n + "/" + r;
  }).join(" ") : navigator.userAgent;
}
const sn = Math.min, Fe = Math.max, Qn = Math.round, Or = Math.floor, ft = (e) => ({
  x: e,
  y: e
}), ug = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, dg = {
  start: "end",
  end: "start"
};
function nl(e, t, n) {
  return Fe(e, sn(t, n));
}
function Mn(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Ht(e) {
  return e.split("-")[0];
}
function pr(e) {
  return e.split("-")[1];
}
function Vu(e) {
  return e === "x" ? "y" : "x";
}
function Bu(e) {
  return e === "y" ? "height" : "width";
}
const fg = /* @__PURE__ */ new Set(["top", "bottom"]);
function Et(e) {
  return fg.has(Ht(e)) ? "y" : "x";
}
function ju(e) {
  return Vu(Et(e));
}
function hg(e, t, n) {
  n === void 0 && (n = !1);
  const r = pr(e), i = ju(e), o = Bu(i);
  let s = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[o] > t.floating[o] && (s = Yr(s)), [s, Yr(s)];
}
function pg(e) {
  const t = Yr(e);
  return [Fo(e), t, Fo(t)];
}
function Fo(e) {
  return e.replace(/start|end/g, (t) => dg[t]);
}
const rl = ["left", "right"], il = ["right", "left"], mg = ["top", "bottom"], gg = ["bottom", "top"];
function vg(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? il : rl : t ? rl : il;
    case "left":
    case "right":
      return t ? mg : gg;
    default:
      return [];
  }
}
function bg(e, t, n, r) {
  const i = pr(e);
  let o = vg(Ht(e), n === "start", r);
  return i && (o = o.map((s) => s + "-" + i), t && (o = o.concat(o.map(Fo)))), o;
}
function Yr(e) {
  return e.replace(/left|right|bottom|top/g, (t) => ug[t]);
}
function yg(e) {
  return v({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }, e);
}
function xg(e) {
  return typeof e != "number" ? yg(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Xr(e) {
  const {
    x: t,
    y: n,
    width: r,
    height: i
  } = e;
  return {
    width: r,
    height: i,
    top: n,
    left: t,
    right: t + r,
    bottom: n + i,
    x: t,
    y: n
  };
}
function ol(e, t, n) {
  let {
    reference: r,
    floating: i
  } = e;
  const o = Et(t), s = ju(t), a = Bu(s), l = Ht(t), u = o === "y", c = r.x + r.width / 2 - i.width / 2, f = r.y + r.height / 2 - i.height / 2, h = r[a] / 2 - i[a] / 2;
  let d;
  switch (l) {
    case "top":
      d = {
        x: c,
        y: r.y - i.height
      };
      break;
    case "bottom":
      d = {
        x: c,
        y: r.y + r.height
      };
      break;
    case "right":
      d = {
        x: r.x + r.width,
        y: f
      };
      break;
    case "left":
      d = {
        x: r.x - i.width,
        y: f
      };
      break;
    default:
      d = {
        x: r.x,
        y: r.y
      };
  }
  switch (pr(t)) {
    case "start":
      d[s] -= h * (n && u ? -1 : 1);
      break;
    case "end":
      d[s] += h * (n && u ? -1 : 1);
      break;
  }
  return d;
}
const wg = (e, t, n) => st(null, null, function* () {
  const {
    placement: r = "bottom",
    strategy: i = "absolute",
    middleware: o = [],
    platform: s
  } = n, a = o.filter(Boolean), l = yield s.isRTL == null ? void 0 : s.isRTL(t);
  let u = yield s.getElementRects({
    reference: e,
    floating: t,
    strategy: i
  }), {
    x: c,
    y: f
  } = ol(u, r, l), h = r, d = {}, p = 0;
  for (let m = 0; m < a.length; m++) {
    const {
      name: g,
      fn: y
    } = a[m], {
      x: w,
      y: b,
      data: T,
      reset: P
    } = yield y({
      x: c,
      y: f,
      initialPlacement: r,
      placement: h,
      strategy: i,
      middlewareData: d,
      rects: u,
      platform: s,
      elements: {
        reference: e,
        floating: t
      }
    });
    c = w != null ? w : c, f = b != null ? b : f, d = E(v({}, d), {
      [g]: v(v({}, d[g]), T)
    }), P && p <= 50 && (p++, typeof P == "object" && (P.placement && (h = P.placement), P.rects && (u = P.rects === !0 ? yield s.getElementRects({
      reference: e,
      floating: t,
      strategy: i
    }) : P.rects), {
      x: c,
      y: f
    } = ol(u, h, l)), m = -1);
  }
  return {
    x: c,
    y: f,
    placement: h,
    strategy: i,
    middlewareData: d
  };
});
function Ci(e, t) {
  return st(this, null, function* () {
    var n;
    t === void 0 && (t = {});
    const {
      x: r,
      y: i,
      platform: o,
      rects: s,
      elements: a,
      strategy: l
    } = e, {
      boundary: u = "clippingAncestors",
      rootBoundary: c = "viewport",
      elementContext: f = "floating",
      altBoundary: h = !1,
      padding: d = 0
    } = Mn(t, e), p = xg(d), g = a[h ? f === "floating" ? "reference" : "floating" : f], y = Xr(yield o.getClippingRect({
      element: (n = yield o.isElement == null ? void 0 : o.isElement(g)) == null || n ? g : g.contextElement || (yield o.getDocumentElement == null ? void 0 : o.getDocumentElement(a.floating)),
      boundary: u,
      rootBoundary: c,
      strategy: l
    })), w = f === "floating" ? {
      x: r,
      y: i,
      width: s.floating.width,
      height: s.floating.height
    } : s.reference, b = yield o.getOffsetParent == null ? void 0 : o.getOffsetParent(a.floating), T = (yield o.isElement == null ? void 0 : o.isElement(b)) ? (yield o.getScale == null ? void 0 : o.getScale(b)) || {
      x: 1,
      y: 1
    } : {
      x: 1,
      y: 1
    }, P = Xr(o.convertOffsetParentRelativeRectToViewportRelativeRect ? yield o.convertOffsetParentRelativeRectToViewportRelativeRect({
      elements: a,
      rect: w,
      offsetParent: b,
      strategy: l
    }) : w);
    return {
      top: (y.top - P.top + p.top) / T.y,
      bottom: (P.bottom - y.bottom + p.bottom) / T.y,
      left: (y.left - P.left + p.left) / T.x,
      right: (P.right - y.right + p.right) / T.x
    };
  });
}
const Eg = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    fn(n) {
      return st(this, null, function* () {
        var r, i;
        const {
          placement: o,
          middlewareData: s,
          rects: a,
          initialPlacement: l,
          platform: u,
          elements: c
        } = n, G = Mn(e, n), {
          mainAxis: f = !0,
          crossAxis: h = !0,
          fallbackPlacements: d,
          fallbackStrategy: p = "bestFit",
          fallbackAxisSideDirection: m = "none",
          flipAlignment: g = !0
        } = G, y = k(G, [
          "mainAxis",
          "crossAxis",
          "fallbackPlacements",
          "fallbackStrategy",
          "fallbackAxisSideDirection",
          "flipAlignment"
        ]);
        if ((r = s.arrow) != null && r.alignmentOffset)
          return {};
        const w = Ht(o), b = Et(l), T = Ht(l) === l, P = yield u.isRTL == null ? void 0 : u.isRTL(c.floating), C = d || (T || !g ? [Yr(l)] : pg(l)), A = m !== "none";
        !d && A && C.push(...bg(l, g, m, P));
        const $ = [l, ...C], F = yield Ci(n, y), R = [];
        let M = ((i = s.flip) == null ? void 0 : i.overflows) || [];
        if (f && R.push(F[w]), h) {
          const D = hg(o, a, P);
          R.push(F[D[0]], F[D[1]]);
        }
        if (M = [...M, {
          placement: o,
          overflows: R
        }], !R.every((D) => D <= 0)) {
          var W, N;
          const D = (((W = s.flip) == null ? void 0 : W.index) || 0) + 1, U = $[D];
          if (U && (!(h === "alignment" ? b !== Et(U) : !1) || // We leave the current main axis only if every placement on that axis
          // overflows the main axis.
          M.every((Z) => Et(Z.placement) === b ? Z.overflows[0] > 0 : !0)))
            return {
              data: {
                index: D,
                overflows: M
              },
              reset: {
                placement: U
              }
            };
          let K = (N = M.filter((Q) => Q.overflows[0] <= 0).sort((Q, Z) => Q.overflows[1] - Z.overflows[1])[0]) == null ? void 0 : N.placement;
          if (!K)
            switch (p) {
              case "bestFit": {
                var H;
                const Q = (H = M.filter((Z) => {
                  if (A) {
                    const X = Et(Z.placement);
                    return X === b || // Create a bias to the `y` side axis due to horizontal
                    // reading directions favoring greater width.
                    X === "y";
                  }
                  return !0;
                }).map((Z) => [Z.placement, Z.overflows.filter((X) => X > 0).reduce((X, de) => X + de, 0)]).sort((Z, X) => Z[1] - X[1])[0]) == null ? void 0 : H[0];
                Q && (K = Q);
                break;
              }
              case "initialPlacement":
                K = l;
                break;
            }
          if (o !== K)
            return {
              reset: {
                placement: K
              }
            };
        }
        return {};
      });
    }
  };
}, Sg = /* @__PURE__ */ new Set(["left", "top"]);
function Tg(e, t) {
  return st(this, null, function* () {
    const {
      placement: n,
      platform: r,
      elements: i
    } = e, o = yield r.isRTL == null ? void 0 : r.isRTL(i.floating), s = Ht(n), a = pr(n), l = Et(n) === "y", u = Sg.has(s) ? -1 : 1, c = o && l ? -1 : 1, f = Mn(t, e);
    let {
      mainAxis: h,
      crossAxis: d,
      alignmentAxis: p
    } = typeof f == "number" ? {
      mainAxis: f,
      crossAxis: 0,
      alignmentAxis: null
    } : {
      mainAxis: f.mainAxis || 0,
      crossAxis: f.crossAxis || 0,
      alignmentAxis: f.alignmentAxis
    };
    return a && typeof p == "number" && (d = a === "end" ? p * -1 : p), l ? {
      x: d * c,
      y: h * u
    } : {
      x: h * u,
      y: d * c
    };
  });
}
const Pg = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    fn(n) {
      return st(this, null, function* () {
        var r, i;
        const {
          x: o,
          y: s,
          placement: a,
          middlewareData: l
        } = n, u = yield Tg(n, e);
        return a === ((r = l.offset) == null ? void 0 : r.placement) && (i = l.arrow) != null && i.alignmentOffset ? {} : {
          x: o + u.x,
          y: s + u.y,
          data: E(v({}, u), {
            placement: a
          })
        };
      });
    }
  };
}, kg = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    fn(n) {
      return st(this, null, function* () {
        const {
          x: r,
          y: i,
          placement: o
        } = n, y = Mn(e, n), {
          mainAxis: s = !0,
          crossAxis: a = !1,
          limiter: l = {
            fn: (w) => {
              let {
                x: b,
                y: T
              } = w;
              return {
                x: b,
                y: T
              };
            }
          }
        } = y, u = k(y, [
          "mainAxis",
          "crossAxis",
          "limiter"
        ]), c = {
          x: r,
          y: i
        }, f = yield Ci(n, u), h = Et(Ht(o)), d = Vu(h);
        let p = c[d], m = c[h];
        if (s) {
          const w = d === "y" ? "top" : "left", b = d === "y" ? "bottom" : "right", T = p + f[w], P = p - f[b];
          p = nl(T, p, P);
        }
        if (a) {
          const w = h === "y" ? "top" : "left", b = h === "y" ? "bottom" : "right", T = m + f[w], P = m - f[b];
          m = nl(T, m, P);
        }
        const g = l.fn(E(v({}, n), {
          [d]: p,
          [h]: m
        }));
        return E(v({}, g), {
          data: {
            x: g.x - r,
            y: g.y - i,
            enabled: {
              [d]: s,
              [h]: a
            }
          }
        });
      });
    }
  };
}, Cg = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    fn(n) {
      return st(this, null, function* () {
        var r, i;
        const {
          placement: o,
          rects: s,
          platform: a,
          elements: l
        } = n, M = Mn(e, n), {
          apply: u = () => {
          }
        } = M, c = k(M, [
          "apply"
        ]), f = yield Ci(n, c), h = Ht(o), d = pr(o), p = Et(o) === "y", {
          width: m,
          height: g
        } = s.floating;
        let y, w;
        h === "top" || h === "bottom" ? (y = h, w = d === ((yield a.isRTL == null ? void 0 : a.isRTL(l.floating)) ? "start" : "end") ? "left" : "right") : (w = h, y = d === "end" ? "top" : "bottom");
        const b = g - f.top - f.bottom, T = m - f.left - f.right, P = sn(g - f[y], b), C = sn(m - f[w], T), A = !n.middlewareData.shift;
        let $ = P, F = C;
        if ((r = n.middlewareData.shift) != null && r.enabled.x && (F = T), (i = n.middlewareData.shift) != null && i.enabled.y && ($ = b), A && !d) {
          const W = Fe(f.left, 0), N = Fe(f.right, 0), H = Fe(f.top, 0), G = Fe(f.bottom, 0);
          p ? F = m - 2 * (W !== 0 || N !== 0 ? W + N : Fe(f.left, f.right)) : $ = g - 2 * (H !== 0 || G !== 0 ? H + G : Fe(f.top, f.bottom));
        }
        yield u(E(v({}, n), {
          availableWidth: F,
          availableHeight: $
        }));
        const R = yield a.getDimensions(l.floating);
        return m !== R.width || g !== R.height ? {
          reset: {
            rects: !0
          }
        } : {};
      });
    }
  };
};
function zu(e) {
  const t = ot(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const i = mt(e), o = i ? e.offsetWidth : n, s = i ? e.offsetHeight : r, a = Qn(n) !== o || Qn(r) !== s;
  return a && (n = o, r = s), {
    width: n,
    height: r,
    $: a
  };
}
function Cs(e) {
  return Ne(e) ? e : e.contextElement;
}
function En(e) {
  const t = Cs(e);
  if (!mt(t))
    return ft(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: i,
    $: o
  } = zu(t);
  let s = (o ? Qn(n.width) : n.width) / r, a = (o ? Qn(n.height) : n.height) / i;
  return (!s || !Number.isFinite(s)) && (s = 1), (!a || !Number.isFinite(a)) && (a = 1), {
    x: s,
    y: a
  };
}
const Og = /* @__PURE__ */ ft(0);
function _u(e) {
  const t = Ge(e);
  return !ks() || !t.visualViewport ? Og : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function $g(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== Ge(e) ? !1 : t;
}
function an(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const i = e.getBoundingClientRect(), o = Cs(e);
  let s = ft(1);
  t && (r ? Ne(r) && (s = En(r)) : s = En(e));
  const a = $g(o, n, r) ? _u(o) : ft(0);
  let l = (i.left + a.x) / s.x, u = (i.top + a.y) / s.y, c = i.width / s.x, f = i.height / s.y;
  if (o) {
    const h = Ge(o), d = r && Ne(r) ? Ge(r) : r;
    let p = h, m = Lo(p);
    for (; m && r && d !== p; ) {
      const g = En(m), y = m.getBoundingClientRect(), w = ot(m), b = y.left + (m.clientLeft + parseFloat(w.paddingLeft)) * g.x, T = y.top + (m.clientTop + parseFloat(w.paddingTop)) * g.y;
      l *= g.x, u *= g.y, c *= g.x, f *= g.y, l += b, u += T, p = Ge(m), m = Lo(p);
    }
  }
  return Xr({
    width: c,
    height: f,
    x: l,
    y: u
  });
}
function Oi(e, t) {
  const n = ki(e).scrollLeft;
  return t ? t.left + n : an(yt(e)).left + n;
}
function Wu(e, t) {
  const n = e.getBoundingClientRect(), r = n.left + t.scrollLeft - Oi(e, n), i = n.top + t.scrollTop;
  return {
    x: r,
    y: i
  };
}
function Ag(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: i
  } = e;
  const o = i === "fixed", s = yt(r), a = t ? Pi(t.floating) : !1;
  if (r === s || a && o)
    return n;
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  }, u = ft(1);
  const c = ft(0), f = mt(r);
  if ((f || !f && !o) && ((An(r) !== "body" || hr(s)) && (l = ki(r)), mt(r))) {
    const d = an(r);
    u = En(r), c.x = d.x + r.clientLeft, c.y = d.y + r.clientTop;
  }
  const h = s && !f && !o ? Wu(s, l) : ft(0);
  return {
    width: n.width * u.x,
    height: n.height * u.y,
    x: n.x * u.x - l.scrollLeft * u.x + c.x + h.x,
    y: n.y * u.y - l.scrollTop * u.y + c.y + h.y
  };
}
function Mg(e) {
  return Array.from(e.getClientRects());
}
function Rg(e) {
  const t = yt(e), n = ki(e), r = e.ownerDocument.body, i = Fe(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), o = Fe(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let s = -n.scrollLeft + Oi(e);
  const a = -n.scrollTop;
  return ot(r).direction === "rtl" && (s += Fe(t.clientWidth, r.clientWidth) - i), {
    width: i,
    height: o,
    x: s,
    y: a
  };
}
const sl = 25;
function Dg(e, t) {
  const n = Ge(e), r = yt(e), i = n.visualViewport;
  let o = r.clientWidth, s = r.clientHeight, a = 0, l = 0;
  if (i) {
    o = i.width, s = i.height;
    const c = ks();
    (!c || c && t === "fixed") && (a = i.offsetLeft, l = i.offsetTop);
  }
  const u = Oi(r);
  if (u <= 0) {
    const c = r.ownerDocument, f = c.body, h = getComputedStyle(f), d = c.compatMode === "CSS1Compat" && parseFloat(h.marginLeft) + parseFloat(h.marginRight) || 0, p = Math.abs(r.clientWidth - f.clientWidth - d);
    p <= sl && (o -= p);
  } else u <= sl && (o += u);
  return {
    width: o,
    height: s,
    x: a,
    y: l
  };
}
const Lg = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function Fg(e, t) {
  const n = an(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, o = mt(e) ? En(e) : ft(1), s = e.clientWidth * o.x, a = e.clientHeight * o.y, l = i * o.x, u = r * o.y;
  return {
    width: s,
    height: a,
    x: l,
    y: u
  };
}
function al(e, t, n) {
  let r;
  if (t === "viewport")
    r = Dg(e, n);
  else if (t === "document")
    r = Rg(yt(e));
  else if (Ne(t))
    r = Fg(t, n);
  else {
    const i = _u(e);
    r = {
      x: t.x - i.x,
      y: t.y - i.y,
      width: t.width,
      height: t.height
    };
  }
  return Xr(r);
}
function Hu(e, t) {
  const n = Wt(e);
  return n === t || !Ne(n) || Pn(n) ? !1 : ot(n).position === "fixed" || Hu(n, t);
}
function Ig(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = Zn(e, [], !1).filter((a) => Ne(a) && An(a) !== "body"), i = null;
  const o = ot(e).position === "fixed";
  let s = o ? Wt(e) : e;
  for (; Ne(s) && !Pn(s); ) {
    const a = ot(s), l = Ps(s);
    !l && a.position === "fixed" && (i = null), (o ? !l && !i : !l && a.position === "static" && !!i && Lg.has(i.position) || hr(s) && !l && Hu(e, s)) ? r = r.filter((c) => c !== s) : i = a, s = Wt(s);
  }
  return t.set(e, r), r;
}
function Ng(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: i
  } = e;
  const s = [...n === "clippingAncestors" ? Pi(t) ? [] : Ig(t, this._c) : [].concat(n), r], a = s[0], l = s.reduce((u, c) => {
    const f = al(t, c, i);
    return u.top = Fe(f.top, u.top), u.right = sn(f.right, u.right), u.bottom = sn(f.bottom, u.bottom), u.left = Fe(f.left, u.left), u;
  }, al(t, a, i));
  return {
    width: l.right - l.left,
    height: l.bottom - l.top,
    x: l.left,
    y: l.top
  };
}
function Vg(e) {
  const {
    width: t,
    height: n
  } = zu(e);
  return {
    width: t,
    height: n
  };
}
function Bg(e, t, n) {
  const r = mt(t), i = yt(t), o = n === "fixed", s = an(e, !0, o, t);
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = ft(0);
  function u() {
    l.x = Oi(i);
  }
  if (r || !r && !o)
    if ((An(t) !== "body" || hr(i)) && (a = ki(t)), r) {
      const d = an(t, !0, o, t);
      l.x = d.x + t.clientLeft, l.y = d.y + t.clientTop;
    } else i && u();
  o && !r && i && u();
  const c = i && !r && !o ? Wu(i, a) : ft(0), f = s.left + a.scrollLeft - l.x - c.x, h = s.top + a.scrollTop - l.y - c.y;
  return {
    x: f,
    y: h,
    width: s.width,
    height: s.height
  };
}
function eo(e) {
  return ot(e).position === "static";
}
function ll(e, t) {
  if (!mt(e) || ot(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return yt(e) === n && (n = n.ownerDocument.body), n;
}
function Uu(e, t) {
  const n = Ge(e);
  if (Pi(e))
    return n;
  if (!mt(e)) {
    let i = Wt(e);
    for (; i && !Pn(i); ) {
      if (Ne(i) && !eo(i))
        return i;
      i = Wt(i);
    }
    return n;
  }
  let r = ll(e, t);
  for (; r && ng(r) && eo(r); )
    r = ll(r, t);
  return r && Pn(r) && eo(r) && !Ps(r) ? n : r || ag(e) || n;
}
const jg = function(e) {
  return st(this, null, function* () {
    const t = this.getOffsetParent || Uu, n = this.getDimensions, r = yield n(e.floating);
    return {
      reference: Bg(e.reference, yield t(e.floating), e.strategy),
      floating: {
        x: 0,
        y: 0,
        width: r.width,
        height: r.height
      }
    };
  });
};
function zg(e) {
  return ot(e).direction === "rtl";
}
const _g = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Ag,
  getDocumentElement: yt,
  getClippingRect: Ng,
  getOffsetParent: Uu,
  getElementRects: jg,
  getClientRects: Mg,
  getDimensions: Vg,
  getScale: En,
  isElement: Ne,
  isRTL: zg
};
function Ku(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Wg(e, t) {
  let n = null, r;
  const i = yt(e);
  function o() {
    var a;
    clearTimeout(r), (a = n) == null || a.disconnect(), n = null;
  }
  function s(a, l) {
    a === void 0 && (a = !1), l === void 0 && (l = 1), o();
    const u = e.getBoundingClientRect(), {
      left: c,
      top: f,
      width: h,
      height: d
    } = u;
    if (a || t(), !h || !d)
      return;
    const p = Or(f), m = Or(i.clientWidth - (c + h)), g = Or(i.clientHeight - (f + d)), y = Or(c), b = {
      rootMargin: -p + "px " + -m + "px " + -g + "px " + -y + "px",
      threshold: Fe(0, sn(1, l)) || 1
    };
    let T = !0;
    function P(C) {
      const A = C[0].intersectionRatio;
      if (A !== l) {
        if (!T)
          return s();
        A ? s(!1, A) : r = setTimeout(() => {
          s(!1, 1e-7);
        }, 1e3);
      }
      A === 1 && !Ku(u, e.getBoundingClientRect()) && s(), T = !1;
    }
    try {
      n = new IntersectionObserver(P, E(v({}, b), {
        // Handle <iframe>s
        root: i.ownerDocument
      }));
    } catch (C) {
      n = new IntersectionObserver(P, b);
    }
    n.observe(e);
  }
  return s(!0), o;
}
function Hg(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: i = !0,
    ancestorResize: o = !0,
    elementResize: s = typeof ResizeObserver == "function",
    layoutShift: a = typeof IntersectionObserver == "function",
    animationFrame: l = !1
  } = r, u = Cs(e), c = i || o ? [...u ? Zn(u) : [], ...Zn(t)] : [];
  c.forEach((y) => {
    i && y.addEventListener("scroll", n, {
      passive: !0
    }), o && y.addEventListener("resize", n);
  });
  const f = u && a ? Wg(u, n) : null;
  let h = -1, d = null;
  s && (d = new ResizeObserver((y) => {
    let [w] = y;
    w && w.target === u && d && (d.unobserve(t), cancelAnimationFrame(h), h = requestAnimationFrame(() => {
      var b;
      (b = d) == null || b.observe(t);
    })), n();
  }), u && !l && d.observe(u), d.observe(t));
  let p, m = l ? an(e) : null;
  l && g();
  function g() {
    const y = an(e);
    m && !Ku(m, y) && n(), m = y, p = requestAnimationFrame(g);
  }
  return n(), () => {
    var y;
    c.forEach((w) => {
      i && w.removeEventListener("scroll", n), o && w.removeEventListener("resize", n);
    }), f == null || f(), (y = d) == null || y.disconnect(), d = null, l && cancelAnimationFrame(p);
  };
}
const to = Ci, Ug = Pg, Kg = kg, Gg = Eg, Yg = Cg, Xg = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), i = v({
    platform: _g
  }, n), o = E(v({}, i.platform), {
    _c: r
  });
  return wg(e, t, E(v({}, i), {
    platform: o
  }));
};
var qg = typeof document != "undefined", Zg = function() {
}, Lr = qg ? li : Zg;
function qr(e, t) {
  if (e === t)
    return !0;
  if (typeof e != typeof t)
    return !1;
  if (typeof e == "function" && e.toString() === t.toString())
    return !0;
  let n, r, i;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (n = e.length, n !== t.length) return !1;
      for (r = n; r-- !== 0; )
        if (!qr(e[r], t[r]))
          return !1;
      return !0;
    }
    if (i = Object.keys(e), n = i.length, n !== Object.keys(t).length)
      return !1;
    for (r = n; r-- !== 0; )
      if (!{}.hasOwnProperty.call(t, i[r]))
        return !1;
    for (r = n; r-- !== 0; ) {
      const o = i[r];
      if (!(o === "_owner" && e.$$typeof) && !qr(e[o], t[o]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function Gu(e) {
  return typeof window == "undefined" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function cl(e, t) {
  const n = Gu(e);
  return Math.round(t * n) / n;
}
function no(e) {
  const t = S.useRef(e);
  return Lr(() => {
    t.current = e;
  }), t;
}
function Qg(e) {
  e === void 0 && (e = {});
  const {
    placement: t = "bottom",
    strategy: n = "absolute",
    middleware: r = [],
    platform: i,
    elements: {
      reference: o,
      floating: s
    } = {},
    transform: a = !0,
    whileElementsMounted: l,
    open: u
  } = e, [c, f] = S.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [h, d] = S.useState(r);
  qr(h, r) || d(r);
  const [p, m] = S.useState(null), [g, y] = S.useState(null), w = S.useCallback((K) => {
    K !== C.current && (C.current = K, m(K));
  }, []), b = S.useCallback((K) => {
    K !== A.current && (A.current = K, y(K));
  }, []), T = o || p, P = s || g, C = S.useRef(null), A = S.useRef(null), $ = S.useRef(c), F = l != null, R = no(l), M = no(i), W = no(u), N = S.useCallback(() => {
    if (!C.current || !A.current)
      return;
    const K = {
      placement: t,
      strategy: n,
      middleware: h
    };
    M.current && (K.platform = M.current), Xg(C.current, A.current, K).then((Q) => {
      const Z = E(v({}, Q), {
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: W.current !== !1
      });
      H.current && !qr($.current, Z) && ($.current = Z, _r.flushSync(() => {
        f(Z);
      }));
    });
  }, [h, t, n, M, W]);
  Lr(() => {
    u === !1 && $.current.isPositioned && ($.current.isPositioned = !1, f((K) => E(v({}, K), {
      isPositioned: !1
    })));
  }, [u]);
  const H = S.useRef(!1);
  Lr(() => (H.current = !0, () => {
    H.current = !1;
  }), []), Lr(() => {
    if (T && (C.current = T), P && (A.current = P), T && P) {
      if (R.current)
        return R.current(T, P, N);
      N();
    }
  }, [T, P, N, R, F]);
  const G = S.useMemo(() => ({
    reference: C,
    floating: A,
    setReference: w,
    setFloating: b
  }), [w, b]), D = S.useMemo(() => ({
    reference: T,
    floating: P
  }), [T, P]), U = S.useMemo(() => {
    const K = {
      position: n,
      left: 0,
      top: 0
    };
    if (!D.floating)
      return K;
    const Q = cl(D.floating, c.x), Z = cl(D.floating, c.y);
    return a ? v(E(v({}, K), {
      transform: "translate(" + Q + "px, " + Z + "px)"
    }), Gu(D.floating) >= 1.5 && {
      willChange: "transform"
    }) : {
      position: n,
      left: Q,
      top: Z
    };
  }, [n, a, D.floating, c.x, c.y]);
  return S.useMemo(() => E(v({}, c), {
    update: N,
    refs: G,
    elements: D,
    floatingStyles: U
  }), [c, N, G, D, U]);
}
const Yu = (e, t) => E(v({}, Ug(e)), {
  options: [e, t]
}), Jg = (e, t) => E(v({}, Kg(e)), {
  options: [e, t]
}), e0 = (e, t) => E(v({}, Gg(e)), {
  options: [e, t]
}), t0 = (e, t) => E(v({}, Yg(e)), {
  options: [e, t]
}), Xu = v({}, S), n0 = Xu.useInsertionEffect, r0 = n0 || ((e) => e());
function qu(e) {
  const t = S.useRef(() => {
    if (process.env.NODE_ENV !== "production")
      throw new Error("Cannot call an event handler while rendering.");
  });
  return r0(() => {
    t.current = e;
  }), S.useCallback(function() {
    for (var n = arguments.length, r = new Array(n), i = 0; i < n; i++)
      r[i] = arguments[i];
    return t.current == null ? void 0 : t.current(...r);
  }, []);
}
var Io = typeof document != "undefined" ? li : be;
let ul = !1, i0 = 0;
const dl = () => (
  // Ensure the id is unique with multiple independent versions of Floating UI
  // on <React 18
  "floating-ui-" + Math.random().toString(36).slice(2, 6) + i0++
);
function o0() {
  const [e, t] = S.useState(() => ul ? dl() : void 0);
  return Io(() => {
    e == null && t(dl());
  }, []), S.useEffect(() => {
    ul = !0;
  }, []), e;
}
const s0 = Xu.useId, a0 = s0 || o0;
let Jn;
process.env.NODE_ENV !== "production" && (Jn = /* @__PURE__ */ new Set());
function l0() {
  for (var e, t = arguments.length, n = new Array(t), r = 0; r < t; r++)
    n[r] = arguments[r];
  const i = "Floating UI: " + n.join(" ");
  if (!((e = Jn) != null && e.has(i))) {
    var o;
    (o = Jn) == null || o.add(i), console.warn(i);
  }
}
function c0() {
  for (var e, t = arguments.length, n = new Array(t), r = 0; r < t; r++)
    n[r] = arguments[r];
  const i = "Floating UI: " + n.join(" ");
  if (!((e = Jn) != null && e.has(i))) {
    var o;
    (o = Jn) == null || o.add(i), console.error(i);
  }
}
function u0() {
  const e = /* @__PURE__ */ new Map();
  return {
    emit(t, n) {
      var r;
      (r = e.get(t)) == null || r.forEach((i) => i(n));
    },
    on(t, n) {
      e.set(t, [...e.get(t) || [], n]);
    },
    off(t, n) {
      var r;
      e.set(t, ((r = e.get(t)) == null ? void 0 : r.filter((i) => i !== n)) || []);
    }
  };
}
const d0 = /* @__PURE__ */ S.createContext(null), f0 = /* @__PURE__ */ S.createContext(null), h0 = () => {
  var e;
  return ((e = S.useContext(d0)) == null ? void 0 : e.id) || null;
}, p0 = () => S.useContext(f0), m0 = "data-floating-ui-focusable";
function g0(e) {
  const {
    open: t = !1,
    onOpenChange: n,
    elements: r
  } = e, i = a0(), o = S.useRef({}), [s] = S.useState(() => u0()), a = h0() != null;
  if (process.env.NODE_ENV !== "production") {
    const d = r.reference;
    d && !Ne(d) && c0("Cannot pass a virtual element to the `elements.reference` option,", "as it must be a real DOM element. Use `refs.setPositionReference()`", "instead.");
  }
  const [l, u] = S.useState(r.reference), c = qu((d, p, m) => {
    o.current.openEvent = d ? p : void 0, s.emit("openchange", {
      open: d,
      event: p,
      reason: m,
      nested: a
    }), n == null || n(d, p, m);
  }), f = S.useMemo(() => ({
    setPositionReference: u
  }), []), h = S.useMemo(() => ({
    reference: l || r.reference || null,
    floating: r.floating || null,
    domReference: r.reference
  }), [l, r.reference, r.floating]);
  return S.useMemo(() => ({
    dataRef: o,
    open: t,
    onOpenChange: c,
    elements: h,
    events: s,
    floatingId: i,
    refs: f
  }), [t, c, h, s, i, f]);
}
function v0(e) {
  e === void 0 && (e = {});
  const {
    nodeId: t
  } = e, n = g0(E(v({}, e), {
    elements: v({
      reference: null,
      floating: null
    }, e.elements)
  })), r = e.rootContext || n, i = r.elements, [o, s] = S.useState(null), [a, l] = S.useState(null), c = (i == null ? void 0 : i.domReference) || o, f = S.useRef(null), h = p0();
  Io(() => {
    c && (f.current = c);
  }, [c]);
  const d = Qg(E(v({}, e), {
    elements: v(v({}, i), a && {
      reference: a
    })
  })), p = S.useCallback((b) => {
    const T = Ne(b) ? {
      getBoundingClientRect: () => b.getBoundingClientRect(),
      contextElement: b
    } : b;
    l(T), d.refs.setReference(T);
  }, [d.refs]), m = S.useCallback((b) => {
    (Ne(b) || b === null) && (f.current = b, s(b)), (Ne(d.refs.reference.current) || d.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
    // `null` to support `positionReference` + an unstable `reference`
    // callback ref.
    b !== null && !Ne(b)) && d.refs.setReference(b);
  }, [d.refs]), g = S.useMemo(() => E(v({}, d.refs), {
    setReference: m,
    setPositionReference: p,
    domReference: f
  }), [d.refs, m, p]), y = S.useMemo(() => E(v({}, d.elements), {
    domReference: c
  }), [d.elements, c]), w = S.useMemo(() => E(v(v({}, d), r), {
    refs: g,
    elements: y,
    nodeId: t
  }), [d, g, y, t, r]);
  return Io(() => {
    r.dataRef.current.floatingContext = w;
    const b = h == null ? void 0 : h.nodesRef.current.find((T) => T.id === t);
    b && (b.context = w);
  }), S.useMemo(() => E(v({}, d), {
    context: w,
    refs: g,
    elements: y
  }), [d, g, y, w]);
}
const ro = "active", io = "selected";
function oo(e, t, n) {
  const r = /* @__PURE__ */ new Map(), i = n === "item";
  let o = e;
  if (i && e) {
    const s = e, {
      [ro]: a,
      [io]: l
    } = s;
    o = k(s, [
      Ki(ro),
      Ki(io)
    ]);
  }
  return v(v(v({}, n === "floating" && {
    tabIndex: -1,
    [m0]: ""
  }), o), t.map((a) => {
    const l = a ? a[n] : null;
    return typeof l == "function" ? e ? l(e) : null : l;
  }).concat(e).reduce((a, l) => (l && Object.entries(l).forEach((u) => {
    let [c, f] = u;
    if (!(i && [ro, io].includes(c)))
      if (c.indexOf("on") === 0) {
        if (r.has(c) || r.set(c, []), typeof f == "function") {
          var h;
          (h = r.get(c)) == null || h.push(f), a[c] = function() {
            for (var d, p = arguments.length, m = new Array(p), g = 0; g < p; g++)
              m[g] = arguments[g];
            return (d = r.get(c)) == null ? void 0 : d.map((y) => y(...m)).find((y) => y !== void 0);
          };
        }
      } else
        a[c] = f;
  }), a), {}));
}
function b0(e) {
  e === void 0 && (e = []);
  const t = e.map((a) => a == null ? void 0 : a.reference), n = e.map((a) => a == null ? void 0 : a.floating), r = e.map((a) => a == null ? void 0 : a.item), i = S.useCallback(
    (a) => oo(a, e, "reference"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    t
  ), o = S.useCallback(
    (a) => oo(a, e, "floating"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    n
  ), s = S.useCallback(
    (a) => oo(a, e, "item"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    r
  );
  return S.useMemo(() => ({
    getReferenceProps: i,
    getFloatingProps: o,
    getItemProps: s
  }), [i, o, s]);
}
function fl(e, t) {
  return E(v({}, e), {
    rects: E(v({}, e.rects), {
      floating: E(v({}, e.rects.floating), {
        height: t
      })
    })
  });
}
const y0 = (e) => ({
  name: "inner",
  options: e,
  fn(n) {
    return st(this, null, function* () {
      const W = Mn(e, n), {
        listRef: r,
        overflowRef: i,
        onFallbackChange: o,
        offset: s = 0,
        index: a = 0,
        minItemsVisible: l = 4,
        referenceOverflowThreshold: u = 0,
        scrollRef: c
      } = W, f = k(W, [
        "listRef",
        "overflowRef",
        "onFallbackChange",
        "offset",
        "index",
        "minItemsVisible",
        "referenceOverflowThreshold",
        "scrollRef"
      ]), {
        rects: h,
        elements: {
          floating: d
        }
      } = n, p = r.current[a], m = (c == null ? void 0 : c.current) || d, g = d.clientTop || m.clientTop, y = d.clientTop !== 0, w = m.clientTop !== 0, b = d === m;
      if (process.env.NODE_ENV !== "production" && (n.placement.startsWith("bottom") || l0('`placement` side must be "bottom" when using the `inner`', "middleware.")), !p)
        return {};
      const T = v(v({}, n), yield Yu(-p.offsetTop - d.clientTop - h.reference.height / 2 - p.offsetHeight / 2 - s).fn(n)), P = yield to(fl(T, m.scrollHeight + g + d.clientTop), f), C = yield to(T, E(v({}, f), {
        elementContext: "reference"
      })), A = Fe(0, P.top), $ = T.y + A, M = (m.scrollHeight > m.clientHeight ? (N) => N : Qn)(Fe(0, m.scrollHeight + (y && b || w ? g * 2 : 0) - A - Fe(0, P.bottom)));
      if (m.style.maxHeight = M + "px", m.scrollTop = A, o) {
        const N = m.offsetHeight < p.offsetHeight * sn(l, r.current.length) - 1 || C.top >= -u || C.bottom >= -u;
        _r.flushSync(() => o(N));
      }
      return i && (i.current = yield to(fl(E(v({}, T), {
        y: $
      }), m.offsetHeight + g + d.clientTop), f)), {
        y: $
      };
    });
  }
});
function x0(e, t) {
  const {
    open: n,
    elements: r
  } = e, {
    enabled: i = !0,
    overflowRef: o,
    scrollRef: s,
    onChange: a
  } = t, l = qu(a), u = S.useRef(!1), c = S.useRef(null), f = S.useRef(null);
  S.useEffect(() => {
    if (!i) return;
    function d(m) {
      if (m.ctrlKey || !p || o.current == null)
        return;
      const g = m.deltaY, y = o.current.top >= -0.5, w = o.current.bottom >= -0.5, b = p.scrollHeight - p.clientHeight, T = g < 0 ? -1 : 1, P = g < 0 ? "max" : "min";
      p.scrollHeight <= p.clientHeight || (!y && g > 0 || !w && g < 0 ? (m.preventDefault(), _r.flushSync(() => {
        l((C) => C + Math[P](g, b * T));
      })) : /firefox/i.test(cg()) && (p.scrollTop += g));
    }
    const p = (s == null ? void 0 : s.current) || r.floating;
    if (n && p)
      return p.addEventListener("wheel", d), requestAnimationFrame(() => {
        c.current = p.scrollTop, o.current != null && (f.current = v({}, o.current));
      }), () => {
        c.current = null, f.current = null, p.removeEventListener("wheel", d);
      };
  }, [i, n, r.floating, o, s, l]);
  const h = S.useMemo(() => ({
    onKeyDown() {
      u.current = !0;
    },
    onWheel() {
      u.current = !1;
    },
    onPointerMove() {
      u.current = !1;
    },
    onScroll() {
      const d = (s == null ? void 0 : s.current) || r.floating;
      if (!(!o.current || !d || !u.current)) {
        if (c.current !== null) {
          const p = d.scrollTop - c.current;
          (o.current.bottom < -0.5 && p < -1 || o.current.top < -0.5 && p > 1) && _r.flushSync(() => l((m) => m + p));
        }
        requestAnimationFrame(() => {
          c.current = d.scrollTop;
        });
      }
    }
  }), [r.floating, l, o, s]);
  return S.useMemo(() => i ? {
    floating: h
  } : {}, [i, h]);
}
let Rn = pe({ styles: void 0, setReference: () => {
}, setFloating: () => {
}, getReferenceProps: () => ({}), getFloatingProps: () => ({}), slot: {} });
Rn.displayName = "FloatingContext";
let Os = pe(null);
Os.displayName = "PlacementContext";
function $s(e) {
  return se(() => e ? typeof e == "string" ? { to: e } : e : null, [e]);
}
function As() {
  return ee(Rn).setReference;
}
function w0() {
  return ee(Rn).getReferenceProps;
}
function Ms() {
  let { getFloatingProps: e, slot: t } = ee(Rn);
  return re((...n) => Object.assign({}, e(...n), { "data-anchor": t.anchor }), [e, t]);
}
function Rs(e = null) {
  e === !1 && (e = null), typeof e == "string" && (e = { to: e });
  let t = ee(Os), n = se(() => e, [JSON.stringify(e, (i, o) => {
    var s;
    return (s = o == null ? void 0 : o.outerHTML) != null ? s : o;
  })]);
  he(() => {
    t == null || t(n != null ? n : null);
  }, [t, n]);
  let r = ee(Rn);
  return se(() => [r.setFloating, e ? r.styles : {}], [r.setFloating, e, r.styles]);
}
let hl = 4;
function Ds({ children: e, enabled: t = !0 }) {
  let [n, r] = ne(null), [i, o] = ne(0), s = z(null), [a, l] = ne(null);
  E0(a);
  let u = t && n !== null && a !== null, { to: c = "bottom", gap: f = 0, offset: h = 0, padding: d = 0, inner: p } = S0(n, a), [m, g = "center"] = c.split(" ");
  he(() => {
    u && o(0);
  }, [u]);
  let { refs: y, floatingStyles: w, context: b } = v0({ open: u, placement: m === "selection" ? g === "center" ? "bottom" : `bottom-${g}` : g === "center" ? `${m}` : `${m}-${g}`, strategy: "absolute", transform: !1, middleware: [Yu({ mainAxis: m === "selection" ? 0 : f, crossAxis: h }), Jg({ padding: d }), m !== "selection" && e0({ padding: d }), m === "selection" && p ? y0(E(v({}, p), { padding: d, overflowRef: s, offset: i, minItemsVisible: hl, referenceOverflowThreshold: d, onFallbackChange(M) {
    var W, N;
    if (!M) return;
    let H = b.elements.floating;
    if (!H) return;
    let G = parseFloat(getComputedStyle(H).scrollPaddingBottom) || 0, D = Math.min(hl, H.childElementCount), U = 0, K = 0;
    for (let Q of (N = (W = b.elements.floating) == null ? void 0 : W.childNodes) != null ? N : []) if (De(Q)) {
      let Z = Q.offsetTop, X = Z + Q.clientHeight + G, de = H.scrollTop, I = de + H.clientHeight;
      if (Z >= de && X <= I) D--;
      else {
        K = Math.max(0, Math.min(X, I) - Math.max(Z, de)), U = Q.clientHeight;
        break;
      }
    }
    D >= 1 && o((Q) => {
      let Z = U * D - K + G;
      return Q >= Z ? Q : Z;
    });
  } })) : null, t0({ padding: d, apply({ availableWidth: M, availableHeight: W, elements: N }) {
    Object.assign(N.floating.style, { overflow: "auto", maxWidth: `${M}px`, maxHeight: `min(var(--anchor-max-height, 100vh), ${W}px)` });
  } })].filter(Boolean), whileElementsMounted: Hg }), [T = m, P = g] = b.placement.split("-");
  m === "selection" && (T = "selection");
  let C = se(() => ({ anchor: [T, P].filter(Boolean).join(" ") }), [T, P]), A = x0(b, { overflowRef: s, onChange: o }), { getReferenceProps: $, getFloatingProps: F } = b0([A]), R = L((M) => {
    l(M), y.setFloating(M);
  });
  return S.createElement(Os.Provider, { value: r }, S.createElement(Rn.Provider, { value: { setFloating: R, setReference: y.setReference, styles: w, getReferenceProps: $, getFloatingProps: F, slot: C } }, e));
}
function E0(e) {
  he(() => {
    if (!e) return;
    let t = new MutationObserver(() => {
      let n = window.getComputedStyle(e).maxHeight, r = parseFloat(n);
      if (isNaN(r)) return;
      let i = parseInt(n);
      isNaN(i) || r !== i && (e.style.maxHeight = `${Math.ceil(r)}px`);
    });
    return t.observe(e, { attributes: !0, attributeFilter: ["style"] }), () => {
      t.disconnect();
    };
  }, [e]);
}
function S0(e, t) {
  var n, r, i;
  let o = so((n = e == null ? void 0 : e.gap) != null ? n : "var(--anchor-gap, 0)", t), s = so((r = e == null ? void 0 : e.offset) != null ? r : "var(--anchor-offset, 0)", t), a = so((i = e == null ? void 0 : e.padding) != null ? i : "var(--anchor-padding, 0)", t);
  return E(v({}, e), { gap: o, offset: s, padding: a });
}
function so(e, t, n = void 0) {
  let r = bt(), i = L((l, u) => {
    if (l == null) return [n, null];
    if (typeof l == "number") return [l, null];
    if (typeof l == "string") {
      if (!u) return [n, null];
      let c = pl(l, u);
      return [c, (f) => {
        let h = Zu(l);
        {
          let d = h.map((p) => window.getComputedStyle(u).getPropertyValue(p));
          r.requestAnimationFrame(function p() {
            r.nextFrame(p);
            let m = !1;
            for (let [y, w] of h.entries()) {
              let b = window.getComputedStyle(u).getPropertyValue(w);
              if (d[y] !== b) {
                d[y] = b, m = !0;
                break;
              }
            }
            if (!m) return;
            let g = pl(l, u);
            c !== g && (f(g), c = g);
          });
        }
        return r.dispose;
      }];
    }
    return [n, null];
  }), o = se(() => i(e, t)[0], [e, t]), [s = o, a] = ne();
  return he(() => {
    let [l, u] = i(e, t);
    if (a(l), !!u) return u(a);
  }, [e, t]), s;
}
function Zu(e) {
  let t = /var\((.*)\)/.exec(e);
  if (t) {
    let n = t[1].indexOf(",");
    if (n === -1) return [t[1]];
    let r = t[1].slice(0, n).trim(), i = t[1].slice(n + 1).trim();
    return i ? [r, ...Zu(i)] : [r];
  }
  return [];
}
function pl(e, t) {
  let n = document.createElement("div");
  t.appendChild(n), n.style.setProperty("margin-top", "0px", "important"), n.style.setProperty("margin-top", e, "important");
  let r = parseFloat(window.getComputedStyle(n).marginTop) || 0;
  return t.removeChild(n), r;
}
function T0({ children: e, freeze: t }, n) {
  let r = Zr(t, e);
  return ci(r) ? Yc(r, { ref: n }) : O.createElement(O.Fragment, null, r);
}
const P0 = O.forwardRef(T0);
function Zr(e, t) {
  let [n, r] = ne(t);
  return !e && n !== t && r(t), e ? n : t;
}
let $i = pe(null);
$i.displayName = "OpenClosedContext";
var we = ((e) => (e[e.Open = 1] = "Open", e[e.Closed = 2] = "Closed", e[e.Closing = 4] = "Closing", e[e.Opening = 8] = "Opening", e))(we || {});
function Dt() {
  return ee($i);
}
function mr({ value: e, children: t }) {
  return O.createElement($i.Provider, { value: e }, t);
}
function Ls({ children: e }) {
  return O.createElement($i.Provider, { value: null }, e);
}
function k0(e) {
  function t() {
    document.readyState !== "loading" && (e(), document.removeEventListener("DOMContentLoaded", t));
  }
  typeof window != "undefined" && typeof document != "undefined" && (document.addEventListener("DOMContentLoaded", t), t());
}
let ct = [];
k0(() => {
  function e(t) {
    if (!qe(t.target) || t.target === document.body || ct[0] === t.target) return;
    let n = t.target;
    n = n.closest(Gr), ct.unshift(n != null ? n : t.target), ct = ct.filter((r) => r != null && r.isConnected), ct.splice(10);
  }
  window.addEventListener("click", e, { capture: !0 }), window.addEventListener("mousedown", e, { capture: !0 }), window.addEventListener("focus", e, { capture: !0 }), document.body.addEventListener("click", e, { capture: !0 }), document.body.addEventListener("mousedown", e, { capture: !0 }), document.body.addEventListener("focus", e, { capture: !0 });
});
function C0(e) {
  throw new Error("Unexpected object: " + e);
}
var ce = ((e) => (e[e.First = 0] = "First", e[e.Previous = 1] = "Previous", e[e.Next = 2] = "Next", e[e.Last = 3] = "Last", e[e.Specific = 4] = "Specific", e[e.Nothing = 5] = "Nothing", e))(ce || {});
function pn(e, t) {
  let n = t.resolveItems();
  if (n.length <= 0) return null;
  let r = t.resolveActiveIndex(), i = r != null ? r : -1;
  switch (e.focus) {
    case 0: {
      for (let o = 0; o < n.length; ++o) if (!t.resolveDisabled(n[o], o, n)) return o;
      return r;
    }
    case 1: {
      i === -1 && (i = n.length);
      for (let o = i - 1; o >= 0; --o) if (!t.resolveDisabled(n[o], o, n)) return o;
      return r;
    }
    case 2: {
      for (let o = i + 1; o < n.length; ++o) if (!t.resolveDisabled(n[o], o, n)) return o;
      return r;
    }
    case 3: {
      for (let o = n.length - 1; o >= 0; --o) if (!t.resolveDisabled(n[o], o, n)) return o;
      return r;
    }
    case 4: {
      for (let o = 0; o < n.length; ++o) if (t.resolveId(n[o], o, n) === e.id) return o;
      return r;
    }
    case 5:
      return null;
    default:
      C0(e);
  }
}
function gr(e) {
  let t = L(e), n = z(!1);
  be(() => (n.current = !1, () => {
    n.current = !0, lr(() => {
      n.current && t();
    });
  }), [t]);
}
let Qu = pe(!1);
function O0() {
  return ee(Qu);
}
function ml(e) {
  return O.createElement(Qu.Provider, { value: e.force }, e.children);
}
function $0(e) {
  let t = O0(), n = ee(ed), [r, i] = ne(() => {
    var o;
    if (!t && n !== null) return (o = n.current) != null ? o : null;
    if (dt.isServer) return null;
    let s = e == null ? void 0 : e.getElementById("headlessui-portal-root");
    if (s) return s;
    if (e === null) return null;
    let a = e.createElement("div");
    return a.setAttribute("id", "headlessui-portal-root"), e.body.appendChild(a);
  });
  return be(() => {
    r !== null && (e != null && e.body.contains(r) || e == null || e.body.appendChild(r));
  }, [r, e]), be(() => {
    t || n !== null && i(n.current);
  }, [n, i, t]), r;
}
let Ju = ke, A0 = ie(function(e, t) {
  let h = e, { ownerDocument: n = null } = h, r = k(h, ["ownerDocument"]), i = z(null), o = ve(ys((d) => {
    i.current = d;
  }), t), s = kt(i.current), a = n != null ? n : s, l = $0(a), u = ee(No), c = bt(), f = ae();
  return gr(() => {
    var d;
    l && l.childNodes.length <= 0 && ((d = l.parentElement) == null || d.removeChild(l));
  }), l ? qc(O.createElement("div", { "data-headlessui-portal": "", ref: (d) => {
    c.dispose(), u && d && c.add(u.register(d));
  } }, f({ ourProps: { ref: o }, theirProps: r, slot: {}, defaultTag: Ju, name: "Portal" })), l) : null;
});
function M0(e, t) {
  let n = ve(t), a = e, { enabled: r = !0, ownerDocument: i } = a, o = k(a, ["enabled", "ownerDocument"]), s = ae();
  return r ? O.createElement(A0, E(v({}, o), { ownerDocument: i, ref: n })) : s({ ourProps: { ref: n }, theirProps: o, slot: {}, defaultTag: Ju, name: "Portal" });
}
let R0 = ke, ed = pe(null);
function D0(e, t) {
  let s = e, { target: n } = s, r = k(s, ["target"]), i = { ref: ve(t) }, o = ae();
  return O.createElement(ed.Provider, { value: n }, o({ ourProps: i, theirProps: r, defaultTag: R0, name: "Popover.Group" }));
}
let No = pe(null);
function td() {
  let e = ee(No), t = z([]), n = L((o) => (t.current.push(o), e && e.register(o), () => r(o))), r = L((o) => {
    let s = t.current.indexOf(o);
    s !== -1 && t.current.splice(s, 1), e && e.unregister(o);
  }), i = se(() => ({ register: n, unregister: r, portals: t }), [n, r, t]);
  return [t, se(() => function({ children: o }) {
    return O.createElement(No.Provider, { value: i }, o);
  }, [i])];
}
let L0 = ie(M0), nd = ie(D0), Ai = Object.assign(L0, { Group: nd });
const St = { Idle: { kind: "Idle" }, Tracked: (e) => ({ kind: "Tracked", position: e }), Moved: { kind: "Moved" } };
function Fs(e) {
  let t = e.getBoundingClientRect();
  return `${t.x},${t.y}`;
}
function rd(e, t, n) {
  let r = He();
  if (t.kind === "Tracked") {
    let i = function() {
      o !== Fs(e) && (r.dispose(), n());
    }, { position: o } = t, s = new ResizeObserver(i);
    s.observe(e), r.add(() => s.disconnect()), r.addEventListener(window, "scroll", i, { passive: !0 }), r.addEventListener(window, "resize", i);
  }
  return () => r.dispose();
}
var F0 = Object.defineProperty, I0 = (e, t, n) => t in e ? F0(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, gl = (e, t, n) => (I0(e, typeof t != "symbol" ? t + "" : t, n), n), fe = ((e) => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(fe || {}), Ue = ((e) => (e[e.Single = 0] = "Single", e[e.Multi = 1] = "Multi", e))(Ue || {}), ht = ((e) => (e[e.Pointer = 0] = "Pointer", e[e.Focus = 1] = "Focus", e[e.Other = 2] = "Other", e))(ht || {}), id = ((e) => (e[e.OpenCombobox = 0] = "OpenCombobox", e[e.CloseCombobox = 1] = "CloseCombobox", e[e.GoToOption = 2] = "GoToOption", e[e.SetTyping = 3] = "SetTyping", e[e.RegisterOption = 4] = "RegisterOption", e[e.UnregisterOption = 5] = "UnregisterOption", e[e.DefaultToFirstOption = 6] = "DefaultToFirstOption", e[e.SetActivationTrigger = 7] = "SetActivationTrigger", e[e.UpdateVirtualConfiguration = 8] = "UpdateVirtualConfiguration", e[e.SetInputElement = 9] = "SetInputElement", e[e.SetButtonElement = 10] = "SetButtonElement", e[e.SetOptionsElement = 11] = "SetOptionsElement", e[e.MarkInputAsMoved = 12] = "MarkInputAsMoved", e))(id || {});
function ao(e, t = (n) => n) {
  let n = e.activeOptionIndex !== null ? e.options[e.activeOptionIndex] : null, r = t(e.options.slice()), i = r.length > 0 && r[0].dataRef.current.order !== null ? r.sort((s, a) => s.dataRef.current.order - a.dataRef.current.order) : Vt(r, (s) => s.dataRef.current.domRef.current), o = n ? i.indexOf(n) : null;
  return o === -1 && (o = null), { options: i, activeOptionIndex: o };
}
let N0 = { 1(e) {
  var t;
  if ((t = e.dataRef.current) != null && t.disabled || e.comboboxState === 1) return e;
  let n = e.inputElement ? St.Tracked(Fs(e.inputElement)) : e.inputPositionState;
  return E(v({}, e), { activeOptionIndex: null, comboboxState: 1, isTyping: !1, activationTrigger: 2, inputPositionState: n, __demoMode: !1 });
}, 0(e) {
  var t, n;
  if ((t = e.dataRef.current) != null && t.disabled || e.comboboxState === 0) return e;
  if ((n = e.dataRef.current) != null && n.value) {
    let r = e.dataRef.current.calculateIndex(e.dataRef.current.value);
    if (r !== -1) return E(v({}, e), { activeOptionIndex: r, comboboxState: 0, __demoMode: !1, inputPositionState: St.Idle });
  }
  return E(v({}, e), { comboboxState: 0, inputPositionState: St.Idle, __demoMode: !1 });
}, 3(e, t) {
  return e.isTyping === t.isTyping ? e : E(v({}, e), { isTyping: t.isTyping });
}, 2(e, t) {
  var n, r, i, o;
  if ((n = e.dataRef.current) != null && n.disabled || e.optionsElement && !((r = e.dataRef.current) != null && r.optionsPropsRef.current.static) && e.comboboxState === 1) return e;
  if (e.virtual) {
    let { options: u, disabled: c } = e.virtual, f = t.focus === ce.Specific ? t.idx : pn(t, { resolveItems: () => u, resolveActiveIndex: () => {
      var d, p;
      return (p = (d = e.activeOptionIndex) != null ? d : u.findIndex((m) => !c(m))) != null ? p : null;
    }, resolveDisabled: c, resolveId() {
      throw new Error("Function not implemented.");
    } }), h = (i = t.trigger) != null ? i : 2;
    return e.activeOptionIndex === f && e.activationTrigger === h ? e : E(v({}, e), { activeOptionIndex: f, activationTrigger: h, isTyping: !1, __demoMode: !1 });
  }
  let s = ao(e);
  if (s.activeOptionIndex === null) {
    let u = s.options.findIndex((c) => !c.dataRef.current.disabled);
    u !== -1 && (s.activeOptionIndex = u);
  }
  let a = t.focus === ce.Specific ? t.idx : pn(t, { resolveItems: () => s.options, resolveActiveIndex: () => s.activeOptionIndex, resolveId: (u) => u.id, resolveDisabled: (u) => u.dataRef.current.disabled }), l = (o = t.trigger) != null ? o : 2;
  return e.activeOptionIndex === a && e.activationTrigger === l ? e : E(v(v({}, e), s), { isTyping: !1, activeOptionIndex: a, activationTrigger: l, __demoMode: !1 });
}, 4: (e, t) => {
  var n, r, i, o;
  if ((n = e.dataRef.current) != null && n.virtual) return E(v({}, e), { options: [...e.options, t.payload] });
  let s = t.payload, a = ao(e, (u) => (u.push(s), u));
  e.activeOptionIndex === null && (i = (r = e.dataRef.current).isSelected) != null && i.call(r, t.payload.dataRef.current.value) && (a.activeOptionIndex = a.options.indexOf(s));
  let l = E(v(v({}, e), a), { activationTrigger: 2 });
  return (o = e.dataRef.current) != null && o.__demoMode && e.dataRef.current.value === void 0 && (l.activeOptionIndex = 0), l;
}, 5: (e, t) => {
  var n;
  if ((n = e.dataRef.current) != null && n.virtual) return E(v({}, e), { options: e.options.filter((i) => i.id !== t.id) });
  let r = ao(e, (i) => {
    let o = i.findIndex((s) => s.id === t.id);
    return o !== -1 && i.splice(o, 1), i;
  });
  return E(v(v({}, e), r), { activationTrigger: 2 });
}, 6: (e, t) => e.defaultToFirstOption === t.value ? e : E(v({}, e), { defaultToFirstOption: t.value }), 7: (e, t) => e.activationTrigger === t.trigger ? e : E(v({}, e), { activationTrigger: t.trigger }), 8: (e, t) => {
  var n, r;
  if (e.virtual === null) return E(v({}, e), { virtual: { options: t.options, disabled: (n = t.disabled) != null ? n : () => !1 } });
  if (e.virtual.options === t.options && e.virtual.disabled === t.disabled) return e;
  let i = e.activeOptionIndex;
  if (e.activeOptionIndex !== null) {
    let o = t.options.indexOf(e.virtual.options[e.activeOptionIndex]);
    o !== -1 ? i = o : i = null;
  }
  return E(v({}, e), { activeOptionIndex: i, virtual: { options: t.options, disabled: (r = t.disabled) != null ? r : () => !1 } });
}, 9: (e, t) => e.inputElement === t.element ? e : E(v({}, e), { inputElement: t.element }), 10: (e, t) => e.buttonElement === t.element ? e : E(v({}, e), { buttonElement: t.element }), 11: (e, t) => e.optionsElement === t.element ? e : E(v({}, e), { optionsElement: t.element }), 12(e) {
  return e.inputPositionState.kind !== "Tracked" ? e : E(v({}, e), { inputPositionState: St.Moved });
} }, V0 = class od extends bi {
  constructor(t) {
    super(t), gl(this, "actions", { onChange: (n) => {
      let { onChange: r, compare: i, mode: o, value: s } = this.state.dataRef.current;
      return me(o, { 0: () => r == null ? void 0 : r(n), 1: () => {
        let a = s.slice(), l = a.findIndex((u) => i(u, n));
        return l === -1 ? a.push(n) : a.splice(l, 1), r == null ? void 0 : r(a);
      } });
    }, registerOption: (n, r) => (this.send({ type: 4, payload: { id: n, dataRef: r } }), () => {
      this.state.activeOptionIndex === this.state.dataRef.current.calculateIndex(r.current.value) && this.send({ type: 6, value: !0 }), this.send({ type: 5, id: n });
    }), goToOption: (n, r) => (this.send({ type: 6, value: !1 }), this.send(E(v({ type: 2 }, n), { trigger: r }))), setIsTyping: (n) => {
      this.send({ type: 3, isTyping: n });
    }, closeCombobox: () => {
      var n, r;
      this.send({ type: 1 }), this.send({ type: 6, value: !1 }), (r = (n = this.state.dataRef.current).onClose) == null || r.call(n);
    }, openCombobox: () => {
      this.send({ type: 0 }), this.send({ type: 6, value: !0 });
    }, setActivationTrigger: (n) => {
      this.send({ type: 7, trigger: n });
    }, selectActiveOption: () => {
      let n = this.selectors.activeOptionIndex(this.state);
      if (n !== null) {
        if (this.actions.setIsTyping(!1), this.state.virtual) this.actions.onChange(this.state.virtual.options[n]);
        else {
          let { dataRef: r } = this.state.options[n];
          this.actions.onChange(r.current.value);
        }
        this.actions.goToOption({ focus: ce.Specific, idx: n });
      }
    }, setInputElement: (n) => {
      this.send({ type: 9, element: n });
    }, setButtonElement: (n) => {
      this.send({ type: 10, element: n });
    }, setOptionsElement: (n) => {
      this.send({ type: 11, element: n });
    } }), gl(this, "selectors", { activeDescendantId: (n) => {
      var r, i;
      let o = this.selectors.activeOptionIndex(n);
      if (o !== null) return n.virtual ? (i = n.options.find((s) => !s.dataRef.current.disabled && n.dataRef.current.compare(s.dataRef.current.value, n.virtual.options[o]))) == null ? void 0 : i.id : (r = n.options[o]) == null ? void 0 : r.id;
    }, activeOptionIndex: (n) => {
      if (n.defaultToFirstOption && n.activeOptionIndex === null && (n.virtual ? n.virtual.options.length > 0 : n.options.length > 0)) {
        if (n.virtual) {
          let { options: i, disabled: o } = n.virtual, s = i.findIndex((a) => {
            var l;
            return !((l = o == null ? void 0 : o(a)) != null && l);
          });
          if (s !== -1) return s;
        }
        let r = n.options.findIndex((i) => !i.dataRef.current.disabled);
        if (r !== -1) return r;
      }
      return n.activeOptionIndex;
    }, activeOption: (n) => {
      var r, i;
      let o = this.selectors.activeOptionIndex(n);
      return o === null ? null : n.virtual ? n.virtual.options[o != null ? o : 0] : (i = (r = n.options[o]) == null ? void 0 : r.dataRef.current.value) != null ? i : null;
    }, isActive: (n, r, i) => {
      var o;
      let s = this.selectors.activeOptionIndex(n);
      return s === null ? !1 : n.virtual ? s === n.dataRef.current.calculateIndex(r) : ((o = n.options[s]) == null ? void 0 : o.id) === i;
    }, shouldScrollIntoView: (n, r, i) => !(n.virtual || n.__demoMode || n.comboboxState !== 0 || n.activationTrigger === 0 || !this.selectors.isActive(n, r, i)), didInputMove(n) {
      return n.inputPositionState.kind === "Moved";
    } });
    {
      let n = this.state.id, r = un.get(null);
      this.disposables.add(r.on(Es.Push, (i) => {
        !r.selectors.isTop(i, n) && this.state.comboboxState === 0 && this.actions.closeCombobox();
      })), this.on(0, () => r.actions.push(n)), this.on(1, () => r.actions.pop(n));
    }
    this.disposables.group((n) => {
      this.on(1, (r) => {
        r.inputElement && (n.dispose(), n.add(rd(r.inputElement, r.inputPositionState, () => {
          this.send({ type: 12 });
        })));
      });
    });
  }
  static new({ id: t, virtual: n = null, __demoMode: r = !1 }) {
    var i;
    return new od({ id: t, dataRef: { current: {} }, comboboxState: r ? 0 : 1, isTyping: !1, options: [], virtual: n ? { options: n.options, disabled: (i = n.disabled) != null ? i : () => !1 } : null, activeOptionIndex: null, activationTrigger: 2, inputElement: null, buttonElement: null, optionsElement: null, __demoMode: r, inputPositionState: St.Idle });
  }
  reduce(t, n) {
    return me(n.type, N0, t, n);
  }
};
const sd = pe(null);
function vr(e) {
  let t = ee(sd);
  if (t === null) {
    let n = new Error(`<${e} /> is missing a parent <Combobox /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(n, ad), n;
  }
  return t;
}
function ad({ id: e, virtual: t = null, __demoMode: n = !1 }) {
  let r = se(() => V0.new({ id: e, virtual: t, __demoMode: n }), []);
  return gr(() => r.dispose()), r;
}
let er = pe(null);
er.displayName = "ComboboxDataContext";
function Dn(e) {
  let t = ee(er);
  if (t === null) {
    let n = new Error(`<${e} /> is missing a parent <Combobox /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(n, Dn), n;
  }
  return t;
}
let ld = pe(null);
function B0(e) {
  let t = vr("VirtualProvider"), n = Dn("VirtualProvider"), { options: r } = n.virtual, i = ue(t, (d) => d.optionsElement), [o, s] = se(() => {
    let d = i;
    if (!d) return [0, 0];
    let p = window.getComputedStyle(d);
    return [parseFloat(p.paddingBlockStart || p.paddingTop), parseFloat(p.paddingBlockEnd || p.paddingBottom)];
  }, [i]), a = gm({ enabled: r.length !== 0, scrollPaddingStart: o, scrollPaddingEnd: s, count: r.length, estimateSize() {
    return 40;
  }, getScrollElement() {
    return t.state.optionsElement;
  }, overscan: 12 }), [l, u] = ne(0);
  he(() => {
    u((d) => d + 1);
  }, [r]);
  let c = a.getVirtualItems(), f = ue(t, (d) => d.activationTrigger === ht.Pointer), h = ue(t, t.selectors.activeOptionIndex);
  return c.length === 0 ? null : O.createElement(ld.Provider, { value: a }, O.createElement("div", { style: { position: "relative", width: "100%", height: `${a.getTotalSize()}px` }, ref: (d) => {
    d && (f || h !== null && r.length > h && a.scrollToIndex(h));
  } }, c.map((d) => {
    var p;
    return O.createElement(ke, { key: d.key }, O.cloneElement((p = e.children) == null ? void 0 : p.call(e, E(v({}, e.slot), { option: r[d.index] })), { key: `${l}-${d.key}`, "data-index": d.index, "aria-setsize": r.length, "aria-posinset": d.index + 1, style: { position: "absolute", top: 0, left: 0, transform: `translateY(${d.start}px)`, overflowAnchor: "none" } }));
  })));
}
let j0 = ke;
function z0(e, t) {
  let n = ye(), r = Rt(), le = e, { value: i, defaultValue: o, onChange: s, form: a, name: l, by: u, invalid: c = !1, disabled: f = r || !1, onClose: h, __demoMode: d = !1, multiple: p = !1, immediate: m = !1, virtual: g = null, nullable: y } = le, w = k(le, ["value", "defaultValue", "onChange", "form", "name", "by", "invalid", "disabled", "onClose", "__demoMode", "multiple", "immediate", "virtual", "nullable"]), b = vs(o), [T = p ? [] : void 0, P] = gs(i, s, b), C = ad({ id: n, virtual: g, __demoMode: d }), A = z({ static: !1, hold: !1 }), $ = Pu(u), F = L((oe) => g ? u === null ? g.options.indexOf(oe) : g.options.findIndex((Se) => $(Se, oe)) : C.state.options.findIndex((Se) => $(Se.dataRef.current.value, oe))), R = re((oe) => me(N.mode, { [Ue.Multi]: () => T.some((Se) => $(Se, oe)), [Ue.Single]: () => $(T, oe) }), [T]), M = ue(C, (oe) => oe.virtual), W = L(() => h == null ? void 0 : h()), N = se(() => ({ __demoMode: d, immediate: m, optionsPropsRef: A, value: T, defaultValue: b, disabled: f, invalid: c, mode: p ? Ue.Multi : Ue.Single, virtual: g ? M : null, onChange: P, isSelected: R, calculateIndex: F, compare: $, onClose: W }), [d, m, A, T, b, f, c, p, g, M, P, R, F, $, W]);
  he(() => {
    var oe;
    g && C.send({ type: id.UpdateVirtualConfiguration, options: g.options, disabled: (oe = g.disabled) != null ? oe : null });
  }, [g, g == null ? void 0 : g.options, g == null ? void 0 : g.disabled]), he(() => {
    C.state.dataRef.current = N;
  }, [N]);
  let [H, G, D, U] = ue(C, (oe) => [oe.comboboxState, oe.buttonElement, oe.inputElement, oe.optionsElement]), K = un.get(null), Q = ue(K, re((oe) => K.selectors.isTop(oe, n), [K, n]));
  wi(Q, [G, D, U], () => C.actions.closeCombobox());
  let Z = ue(C, C.selectors.activeOptionIndex), X = ue(C, C.selectors.activeOption), de = ge({ open: H === fe.Open, disabled: f, invalid: c, activeIndex: Z, activeOption: X, value: T }), [I, V] = mi(), B = t === null ? {} : { ref: t }, te = re(() => {
    if (b !== void 0) return P == null ? void 0 : P(b);
  }, [P, b]), j = ae();
  return O.createElement(V, { value: I, props: { htmlFor: D == null ? void 0 : D.id }, slot: { open: H === fe.Open, disabled: f } }, O.createElement(Ds, null, O.createElement(er.Provider, { value: N }, O.createElement(sd.Provider, { value: C }, O.createElement(mr, { value: me(H, { [fe.Open]: we.Open, [fe.Closed]: we.Closed }) }, l != null && O.createElement(bs, { disabled: f, data: T != null ? { [l]: T } : {}, form: a, onReset: te }), j({ ourProps: B, theirProps: w, slot: de, defaultTag: j0, name: "Combobox" }))))));
}
let _0 = "input";
function W0(e, t) {
  var n, r;
  let i = vr("Combobox.Input"), o = Dn("Combobox.Input"), s = ye(), a = cr(), de = e, { id: l = a || `headlessui-combobox-input-${s}`, onChange: u, displayValue: c, disabled: f = o.disabled || !1, autoFocus: h = !1, type: d = "text" } = de, p = k(de, ["id", "onChange", "displayValue", "disabled", "autoFocus", "type"]), m = z(null), g = ve(m, t, As(), i.actions.setInputElement), [y, w] = ue(i, (I) => [I.comboboxState, I.isTyping]), b = bt(), T = L(() => {
    i.actions.onChange(null), i.state.optionsElement && (i.state.optionsElement.scrollTop = 0), i.actions.goToOption({ focus: ce.Nothing });
  }), P = se(() => {
    var I;
    return typeof c == "function" && o.value !== void 0 ? (I = c(o.value)) != null ? I : "" : typeof o.value == "string" ? o.value : "";
  }, [o.value, c]);
  qn(([I, V], [B, te]) => {
    if (i.state.isTyping) return;
    let j = m.current;
    j && ((te === fe.Open && V === fe.Closed || I !== B) && (j.value = I), requestAnimationFrame(() => {
      if (i.state.isTyping || !j || di(j)) return;
      let { selectionStart: le, selectionEnd: oe } = j;
      Math.abs((oe != null ? oe : 0) - (le != null ? le : 0)) === 0 && le === 0 && j.setSelectionRange(j.value.length, j.value.length);
    }));
  }, [P, y, w]), qn(([I], [V]) => {
    if (I === fe.Open && V === fe.Closed) {
      if (i.state.isTyping) return;
      let B = m.current;
      if (!B) return;
      let te = B.value, { selectionStart: j, selectionEnd: le, selectionDirection: oe } = B;
      B.value = "", B.value = te, oe !== null ? B.setSelectionRange(j, le, oe) : B.setSelectionRange(j, le);
    }
  }, [y]);
  let C = z(!1), A = L(() => {
    C.current = !0;
  }), $ = L(() => {
    b.nextFrame(() => {
      C.current = !1;
    });
  }), F = L((I) => {
    switch (i.actions.setIsTyping(!0), I.key) {
      case J.Enter:
        if (i.state.comboboxState !== fe.Open || C.current) return;
        if (I.preventDefault(), I.stopPropagation(), i.selectors.activeOptionIndex(i.state) === null) {
          i.actions.closeCombobox();
          return;
        }
        i.actions.selectActiveOption(), o.mode === Ue.Single && i.actions.closeCombobox();
        break;
      case J.ArrowDown:
        return I.preventDefault(), I.stopPropagation(), me(i.state.comboboxState, { [fe.Open]: () => i.actions.goToOption({ focus: ce.Next }), [fe.Closed]: () => i.actions.openCombobox() });
      case J.ArrowUp:
        return I.preventDefault(), I.stopPropagation(), me(i.state.comboboxState, { [fe.Open]: () => i.actions.goToOption({ focus: ce.Previous }), [fe.Closed]: () => {
          nt(() => i.actions.openCombobox()), o.value || i.actions.goToOption({ focus: ce.Last });
        } });
      case J.Home:
        if (i.state.comboboxState === fe.Closed || I.shiftKey) break;
        return I.preventDefault(), I.stopPropagation(), i.actions.goToOption({ focus: ce.First });
      case J.PageUp:
        return I.preventDefault(), I.stopPropagation(), i.actions.goToOption({ focus: ce.First });
      case J.End:
        if (i.state.comboboxState === fe.Closed || I.shiftKey) break;
        return I.preventDefault(), I.stopPropagation(), i.actions.goToOption({ focus: ce.Last });
      case J.PageDown:
        return I.preventDefault(), I.stopPropagation(), i.actions.goToOption({ focus: ce.Last });
      case J.Escape:
        return i.state.comboboxState !== fe.Open ? void 0 : (I.preventDefault(), i.state.optionsElement && !o.optionsPropsRef.current.static && I.stopPropagation(), o.mode === Ue.Single && o.value === null && T(), i.actions.closeCombobox());
      case J.Tab:
        if (i.actions.setIsTyping(!1), i.state.comboboxState !== fe.Open) return;
        o.mode === Ue.Single && i.state.activationTrigger !== ht.Focus && i.actions.selectActiveOption(), i.actions.closeCombobox();
        break;
    }
  }), R = L((I) => {
    u == null || u(I), o.mode === Ue.Single && I.target.value === "" && T(), i.actions.openCombobox();
  }), M = L((I) => {
    var V, B, te;
    let j = (V = I.relatedTarget) != null ? V : ct.find((le) => le !== I.currentTarget);
    if (!((B = i.state.optionsElement) != null && B.contains(j)) && !((te = i.state.buttonElement) != null && te.contains(j)) && i.state.comboboxState === fe.Open) return I.preventDefault(), o.mode === Ue.Single && o.value === null && T(), i.actions.closeCombobox();
  }), W = L((I) => {
    var V, B, te;
    let j = (V = I.relatedTarget) != null ? V : ct.find((le) => le !== I.currentTarget);
    (B = i.state.buttonElement) != null && B.contains(j) || (te = i.state.optionsElement) != null && te.contains(j) || o.disabled || o.immediate && i.state.comboboxState !== fe.Open && b.microTask(() => {
      nt(() => i.actions.openCombobox()), i.actions.setActivationTrigger(ht.Focus);
    });
  }), N = cn(), H = hi(), { isFocused: G, focusProps: D } = vt({ autoFocus: h }), { isHovered: U, hoverProps: K } = At({ isDisabled: f }), Q = ue(i, (I) => I.optionsElement), Z = ge({ open: y === fe.Open, disabled: f, invalid: o.invalid, hover: U, focus: G, autofocus: h }), X = We({ ref: g, id: l, role: "combobox", type: d, "aria-controls": Q == null ? void 0 : Q.id, "aria-expanded": y === fe.Open, "aria-activedescendant": ue(i, i.selectors.activeDescendantId), "aria-labelledby": N, "aria-describedby": H, "aria-autocomplete": "list", defaultValue: (r = (n = e.defaultValue) != null ? n : o.defaultValue !== void 0 ? c == null ? void 0 : c(o.defaultValue) : null) != null ? r : o.defaultValue, disabled: f || void 0, autoFocus: h, onCompositionStart: A, onCompositionEnd: $, onKeyDown: F, onChange: R, onFocus: W, onBlur: M }, D, K);
  return ae()({ ourProps: X, theirProps: p, slot: Z, defaultTag: _0, name: "Combobox.Input" });
}
let H0 = "button";
function U0(e, t) {
  let n = vr("Combobox.Button"), r = Dn("Combobox.Button"), [i, o] = ne(null), s = ve(t, o, n.actions.setButtonElement), a = ye(), W = e, { id: l = `headlessui-combobox-button-${a}`, disabled: u = r.disabled || !1, autoFocus: c = !1 } = W, f = k(W, ["id", "disabled", "autoFocus"]), [h, d, p] = ue(n, (N) => [N.comboboxState, N.inputElement, N.optionsElement]), m = Lu(d), g = h === fe.Open;
  Du(g, { trigger: i, action: re((N) => {
    if (i != null && i.contains(N.target) || d != null && d.contains(N.target)) return wt.Ignore;
    let H = N.target.closest('[role="option"]:not([data-disabled])');
    return De(H) ? wt.Select(H) : p != null && p.contains(N.target) ? wt.Ignore : wt.Close;
  }, [i, d, p]), close: n.actions.closeCombobox, select: n.actions.selectActiveOption });
  let y = L((N) => {
    switch (N.key) {
      case J.Space:
      case J.Enter:
        N.preventDefault(), N.stopPropagation(), n.state.comboboxState === fe.Closed && nt(() => n.actions.openCombobox()), m();
        return;
      case J.ArrowDown:
        N.preventDefault(), N.stopPropagation(), n.state.comboboxState === fe.Closed && (nt(() => n.actions.openCombobox()), n.state.dataRef.current.value || n.actions.goToOption({ focus: ce.First })), m();
        return;
      case J.ArrowUp:
        N.preventDefault(), N.stopPropagation(), n.state.comboboxState === fe.Closed && (nt(() => n.actions.openCombobox()), n.state.dataRef.current.value || n.actions.goToOption({ focus: ce.Last })), m();
        return;
      case J.Escape:
        if (n.state.comboboxState !== fe.Open) return;
        N.preventDefault(), n.state.optionsElement && !r.optionsPropsRef.current.static && N.stopPropagation(), nt(() => n.actions.closeCombobox()), m();
        return;
      default:
        return;
    }
  }), w = ku(() => {
    n.state.comboboxState === fe.Open ? n.actions.closeCombobox() : n.actions.openCombobox(), m();
  }), b = cn([l]), { isFocusVisible: T, focusProps: P } = vt({ autoFocus: c }), { isHovered: C, hoverProps: A } = At({ isDisabled: u }), { pressed: $, pressProps: F } = ln({ disabled: u }), R = ge({ open: h === fe.Open, active: $ || h === fe.Open, disabled: u, invalid: r.invalid, value: r.value, hover: C, focus: T }), M = We({ ref: s, id: l, type: fr(e, i), tabIndex: -1, "aria-haspopup": "listbox", "aria-controls": p == null ? void 0 : p.id, "aria-expanded": h === fe.Open, "aria-labelledby": b, disabled: u || void 0, autoFocus: c, onKeyDown: y }, w, P, A, F);
  return ae()({ ourProps: M, theirProps: f, slot: R, defaultTag: H0, name: "Combobox.Button" });
}
let K0 = "div", G0 = Be.RenderStrategy | Be.Static;
function Y0(e, t) {
  var n, r, i;
  let o = ye(), Xt = e, { id: s = `headlessui-combobox-options-${o}`, hold: a = !1, anchor: l, portal: u = !1, modal: c = !0, transition: f = !1 } = Xt, h = k(Xt, ["id", "hold", "anchor", "portal", "modal", "transition"]), d = vr("Combobox.Options"), p = Dn("Combobox.Options"), m = $s(l);
  m && (u = !0);
  let [g, y] = Rs(m), [w, b] = ne(null), T = Ms(), P = ve(t, m ? g : null, d.actions.setOptionsElement, b), [C, A, $, F, R] = ue(d, (Ce) => [Ce.comboboxState, Ce.inputElement, Ce.buttonElement, Ce.optionsElement, Ce.activationTrigger]), M = kt(A || $), W = kt(F), N = Dt(), [H, G] = $n(f, w, N !== null ? (N & we.Open) === we.Open : C === fe.Open);
  yi(H, A, d.actions.closeCombobox);
  let D = p.__demoMode ? !1 : c && C === fe.Open;
  Si(D, W);
  let U = p.__demoMode ? !1 : c && C === fe.Open;
  Ss(U, { allowed: re(() => [A, $, F], [A, $, F]) });
  let K = ue(d, d.selectors.didInputMove) ? !1 : H;
  he(() => {
    var Ce;
    p.optionsPropsRef.current.static = (Ce = e.static) != null ? Ce : !1;
  }, [p.optionsPropsRef, e.static]), he(() => {
    p.optionsPropsRef.current.hold = a;
  }, [p.optionsPropsRef, a]), Jm(C === fe.Open, { container: F, accept(Ce) {
    return Ce.getAttribute("role") === "option" ? NodeFilter.FILTER_REJECT : Ce.hasAttribute("role") ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT;
  }, walk(Ce) {
    Ce.setAttribute("role", "none");
  } });
  let Q = cn([$ == null ? void 0 : $.id]), Z = ge({ open: C === fe.Open, option: void 0 }), X = L(() => {
    d.actions.setActivationTrigger(ht.Pointer);
  }), de = L((Ce) => {
    Ce.preventDefault(), d.actions.setActivationTrigger(ht.Pointer);
  }), I = We(m ? T() : {}, v({ "aria-labelledby": Q, role: "listbox", "aria-multiselectable": p.mode === Ue.Multi ? !0 : void 0, id: s, ref: P, style: E(v(v({}, h.style), y), { "--input-width": Kr(H, A, !0).width, "--button-width": Kr(H, $, !0).width }), onWheel: R === ht.Pointer ? void 0 : X, onMouseDown: de }, On(G))), V = H && C === fe.Closed && !e.static, B = Zr(V, (n = p.virtual) == null ? void 0 : n.options), te = Zr(V, p.value), j = re((Ce) => p.compare(te, Ce), [p.compare, te]), le = se(() => {
    if (!p.virtual) return p;
    if (B === void 0) throw new Error("Missing `options` in virtual mode");
    return B !== p.virtual.options ? E(v({}, p), { virtual: E(v({}, p.virtual), { options: B }) }) : p;
  }, [p, B, (r = p.virtual) == null ? void 0 : r.options]);
  p.virtual && Object.assign(h, { children: O.createElement(er.Provider, { value: le }, O.createElement(B0, { slot: Z }, h.children)) });
  let oe = ae(), Se = se(() => p.mode === Ue.Multi ? p : E(v({}, p), { isSelected: j }), [p, j]);
  return O.createElement(Ai, { enabled: u ? e.static || H : !1, ownerDocument: M }, O.createElement(er.Provider, { value: Se }, oe({ ourProps: I, theirProps: E(v({}, h), { children: O.createElement(P0, { freeze: V }, typeof h.children == "function" ? (i = h.children) == null ? void 0 : i.call(h, Z) : h.children) }), slot: Z, defaultTag: K0, features: G0, visible: K, name: "Combobox.Options" })));
}
let X0 = "div";
function q0(e, t) {
  var n, r, i;
  let o = Dn("Combobox.Option"), s = vr("Combobox.Option"), a = ye(), G = e, { id: l = `headlessui-combobox-option-${a}`, value: u, disabled: c = (i = (r = (n = o.virtual) == null ? void 0 : n.disabled) == null ? void 0 : r.call(n, u)) != null ? i : !1, order: f = null } = G, h = k(G, ["id", "value", "disabled", "order"]), [d] = ue(s, (D) => [D.inputElement]), p = Lu(d), m = ue(s, re((D) => s.selectors.isActive(D, u, l), [u, l])), g = o.isSelected(u), y = z(null), w = je({ disabled: c, value: u, domRef: y, order: f }), b = ee(ld), T = ve(t, y, b ? b.measureElement : null), P = L(() => {
    s.actions.setIsTyping(!1), s.actions.onChange(u);
  });
  he(() => s.actions.registerOption(l, w), [w, l]);
  let C = ue(s, re((D) => s.selectors.shouldScrollIntoView(D, u, l), [u, l]));
  he(() => {
    if (C) return He().requestAnimationFrame(() => {
      var D, U;
      (U = (D = y.current) == null ? void 0 : D.scrollIntoView) == null || U.call(D, { block: "nearest" });
    });
  }, [C, y]);
  let A = L((D) => {
    D.preventDefault(), D.button === ws.Left && (c || (P(), Do() || requestAnimationFrame(() => p()), o.mode === Ue.Single && s.actions.closeCombobox()));
  }), $ = L(() => {
    if (c) return s.actions.goToOption({ focus: ce.Nothing });
    let D = o.calculateIndex(u);
    s.actions.goToOption({ focus: ce.Specific, idx: D });
  }), F = Fu(), R = L((D) => F.update(D)), M = L((D) => {
    if (!F.wasMoved(D) || c || m && s.state.activationTrigger === ht.Pointer) return;
    let U = o.calculateIndex(u);
    s.actions.goToOption({ focus: ce.Specific, idx: U }, ht.Pointer);
  }), W = L((D) => {
    F.wasMoved(D) && (c || m && (o.optionsPropsRef.current.hold || s.state.activationTrigger === ht.Pointer && s.actions.goToOption({ focus: ce.Nothing })));
  }), N = ge({ active: m, focus: m, selected: g, disabled: c }), H = { id: l, ref: T, role: "option", tabIndex: c === !0 ? void 0 : -1, "aria-disabled": c === !0 ? !0 : void 0, "aria-selected": g, disabled: void 0, onMouseDown: A, onFocus: $, onPointerEnter: R, onMouseEnter: R, onPointerMove: M, onMouseMove: M, onPointerLeave: W, onMouseLeave: W };
  return ae()({ ourProps: H, theirProps: h, slot: N, defaultTag: X0, name: "Combobox.Option" });
}
let Z0 = ie(z0), cd = ie(U0), ud = ie(W0), Q0 = gi, dd = ie(Y0), fd = ie(q0), J0 = Object.assign(Z0, { Input: ud, Button: cd, Label: Q0, Options: dd, Option: fd });
function ev(e, t = typeof document != "undefined" ? document.defaultView : null, n) {
  let r = ur(e, "escape");
  Ei(t, "keydown", (i) => {
    r && (i.defaultPrevented || i.key === J.Escape && n(i));
  });
}
function tv() {
  var e;
  let [t] = ne(() => typeof window != "undefined" && typeof window.matchMedia == "function" ? window.matchMedia("(pointer: coarse)") : null), [n, r] = ne((e = t == null ? void 0 : t.matches) != null ? e : !1);
  return he(() => {
    if (!t) return;
    function i(o) {
      r(o.matches);
    }
    return t.addEventListener("change", i), () => t.removeEventListener("change", i);
  }, [t]), n;
}
function hd({ defaultContainers: e = [], portals: t, mainTreeNode: n } = {}) {
  let r = L(() => {
    var i, o;
    let s = Mt(n), a = [];
    for (let l of e) l !== null && (Tt(l) ? a.push(l) : "current" in l && Tt(l.current) && a.push(l.current));
    if (t != null && t.current) for (let l of t.current) a.push(l);
    for (let l of (i = s == null ? void 0 : s.querySelectorAll("html > *, body > *")) != null ? i : []) l !== document.body && l !== document.head && Tt(l) && l.id !== "headlessui-portal-root" && (n && (l.contains(n) || l.contains((o = n == null ? void 0 : n.getRootNode()) == null ? void 0 : o.host)) || a.some((u) => l.contains(u)) || a.push(l));
    return a;
  });
  return { resolveContainers: r, contains: L((i) => r().some((o) => o.contains(i))) };
}
let pd = pe(null);
function Qr({ children: e, node: t }) {
  let [n, r] = ne(null), i = Is(t != null ? t : n);
  return O.createElement(pd.Provider, { value: i }, e, i === null && O.createElement(it, { features: rt.Hidden, ref: (o) => {
    var s, a;
    if (o) {
      for (let l of (a = (s = Mt(o)) == null ? void 0 : s.querySelectorAll("html > *, body > *")) != null ? a : []) if (l !== document.body && l !== document.head && Tt(l) && l != null && l.contains(o)) {
        r(l);
        break;
      }
    }
  } }));
}
function Is(e = null) {
  var t;
  return (t = ee(pd)) != null ? t : e;
}
function nv() {
  let e = typeof document == "undefined";
  return "useSyncExternalStore" in S ? ((t) => t.useSyncExternalStore)(S)(() => () => {
  }, () => !1, () => !e) : !1;
}
function Mi() {
  let e = nv(), [t, n] = S.useState(dt.isHandoffComplete);
  return t && dt.isHandoffComplete === !1 && n(!1), S.useEffect(() => {
    t !== !0 && n(!0);
  }, [t]), S.useEffect(() => dt.handoff(), []), e ? !1 : t;
}
function Ri() {
  let e = z(!1);
  return he(() => (e.current = !0, () => {
    e.current = !1;
  }), []), e;
}
var Ke = ((e) => (e[e.Forwards = 0] = "Forwards", e[e.Backwards = 1] = "Backwards", e))(Ke || {});
function Ns() {
  let e = z(0);
  return Ru(!0, "keydown", (t) => {
    t.key === "Tab" && (e.current = t.shiftKey ? 1 : 0);
  }, !0), e;
}
function md(e) {
  if (!e) return /* @__PURE__ */ new Set();
  if (typeof e == "function") return new Set(e());
  let t = /* @__PURE__ */ new Set();
  for (let n of e.current) Tt(n.current) && t.add(n.current);
  return t;
}
let rv = "div";
var Qt = ((e) => (e[e.None = 0] = "None", e[e.InitialFocus = 1] = "InitialFocus", e[e.TabLock = 2] = "TabLock", e[e.FocusLock = 4] = "FocusLock", e[e.RestoreFocus = 8] = "RestoreFocus", e[e.AutoFocus = 16] = "AutoFocus", e))(Qt || {});
function iv(e, t) {
  let n = z(null), r = ve(n, t), w = e, { initialFocus: i, initialFocusFallback: o, containers: s, features: a = 15 } = w, l = k(w, ["initialFocus", "initialFocusFallback", "containers", "features"]);
  Mi() || (a = 0);
  let u = kt(n.current);
  lv(a, { ownerDocument: u });
  let c = cv(a, { ownerDocument: u, container: n, initialFocus: i, initialFocusFallback: o });
  uv(a, { ownerDocument: u, container: n, containers: s, previousActiveElement: c });
  let f = Ns(), h = L((b) => {
    if (!De(n.current)) return;
    let T = n.current;
    ((P) => P())(() => {
      me(f.current, { [Ke.Forwards]: () => {
        Me(T, xe.First, { skipElements: [b.relatedTarget, o] });
      }, [Ke.Backwards]: () => {
        Me(T, xe.Last, { skipElements: [b.relatedTarget, o] });
      } });
    });
  }), d = ur(!!(a & 2), "focus-trap#tab-lock"), p = bt(), m = z(!1), g = { ref: r, onKeyDown(b) {
    b.key == "Tab" && (m.current = !0, p.requestAnimationFrame(() => {
      m.current = !1;
    }));
  }, onBlur(b) {
    if (!(a & 4)) return;
    let T = md(s);
    De(n.current) && T.add(n.current);
    let P = b.relatedTarget;
    qe(P) && P.dataset.headlessuiFocusGuard !== "true" && (gd(T, P) || (m.current ? Me(n.current, me(f.current, { [Ke.Forwards]: () => xe.Next, [Ke.Backwards]: () => xe.Previous }) | xe.WrapAround, { relativeTo: b.target }) : qe(b.target) && Pt(b.target)));
  } }, y = ae();
  return O.createElement(O.Fragment, null, d && O.createElement(it, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: h, features: rt.Focusable }), y({ ourProps: g, theirProps: l, defaultTag: rv, name: "FocusTrap" }), d && O.createElement(it, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: h, features: rt.Focusable }));
}
let ov = ie(iv), sv = Object.assign(ov, { features: Qt });
function av(e = !0) {
  let t = z(ct.slice());
  return qn(([n], [r]) => {
    r === !0 && n === !1 && lr(() => {
      t.current.splice(0);
    }), r === !1 && n === !0 && (t.current = ct.slice());
  }, [e, ct, t]), L(() => {
    var n;
    return (n = t.current.find((r) => r != null && r.isConnected)) != null ? n : null;
  });
}
function lv(e, { ownerDocument: t }) {
  let n = !!(e & 8), r = av(n);
  qn(() => {
    n || di(t == null ? void 0 : t.body) && Pt(r());
  }, [n]), gr(() => {
    n && Pt(r());
  });
}
function cv(e, { ownerDocument: t, container: n, initialFocus: r, initialFocusFallback: i }) {
  let o = z(null), s = ur(!!(e & 1), "focus-trap#initial-focus"), a = Ri();
  return qn(() => {
    if (e === 0) return;
    if (!s) {
      i != null && i.current && Pt(i.current);
      return;
    }
    let l = n.current;
    l && lr(() => {
      if (!a.current) return;
      let u = t == null ? void 0 : t.activeElement;
      if (r != null && r.current) {
        if ((r == null ? void 0 : r.current) === u) {
          o.current = u;
          return;
        }
      } else if (l.contains(u)) {
        o.current = u;
        return;
      }
      if (r != null && r.current) Pt(r.current);
      else {
        if (e & 16) {
          if (Me(l, xe.First | xe.AutoFocus) !== ut.Error) return;
        } else if (Me(l, xe.First) !== ut.Error) return;
        if (i != null && i.current && (Pt(i.current), (t == null ? void 0 : t.activeElement) === i.current)) return;
        console.warn("There are no focusable elements inside the <FocusTrap />");
      }
      o.current = t == null ? void 0 : t.activeElement;
    });
  }, [i, s, e]), o;
}
function uv(e, { ownerDocument: t, container: n, containers: r, previousActiveElement: i }) {
  let o = Ri(), s = !!(e & 4);
  Ei(t == null ? void 0 : t.defaultView, "focus", (a) => {
    if (!s || !o.current) return;
    let l = md(r);
    De(n.current) && l.add(n.current);
    let u = i.current;
    if (!u) return;
    let c = a.target;
    De(c) ? gd(l, c) ? (i.current = c, Pt(c)) : (a.preventDefault(), a.stopPropagation(), Pt(u)) : Pt(i.current);
  }, !0);
}
function gd(e, t) {
  for (let n of e) if (n.contains(t)) return !0;
  return !1;
}
function vd(e) {
  var t;
  return !!(e.enter || e.enterFrom || e.enterTo || e.leave || e.leaveFrom || e.leaveTo) || !wn((t = e.as) != null ? t : yd) || O.Children.count(e.children) === 1;
}
let Di = pe(null);
Di.displayName = "TransitionContext";
var dv = ((e) => (e.Visible = "visible", e.Hidden = "hidden", e))(dv || {});
function fv() {
  let e = ee(Di);
  if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e;
}
function hv() {
  let e = ee(Li);
  if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e;
}
let Li = pe(null);
Li.displayName = "NestingContext";
function Fi(e) {
  return "children" in e ? Fi(e.children) : e.current.filter(({ el: t }) => t.current !== null).filter(({ state: t }) => t === "visible").length > 0;
}
function bd(e, t) {
  let n = je(e), r = z([]), i = Ri(), o = bt(), s = L((d, p = Nt.Hidden) => {
    let m = r.current.findIndex(({ el: g }) => g === d);
    m !== -1 && (me(p, { [Nt.Unmount]() {
      r.current.splice(m, 1);
    }, [Nt.Hidden]() {
      r.current[m].state = "hidden";
    } }), o.microTask(() => {
      var g;
      !Fi(r) && i.current && ((g = n.current) == null || g.call(n));
    }));
  }), a = L((d) => {
    let p = r.current.find(({ el: m }) => m === d);
    return p ? p.state !== "visible" && (p.state = "visible") : r.current.push({ el: d, state: "visible" }), () => s(d, Nt.Unmount);
  }), l = z([]), u = z(Promise.resolve()), c = z({ enter: [], leave: [] }), f = L((d, p, m) => {
    l.current.splice(0), t && (t.chains.current[p] = t.chains.current[p].filter(([g]) => g !== d)), t == null || t.chains.current[p].push([d, new Promise((g) => {
      l.current.push(g);
    })]), t == null || t.chains.current[p].push([d, new Promise((g) => {
      Promise.all(c.current[p].map(([y, w]) => w)).then(() => g());
    })]), p === "enter" ? u.current = u.current.then(() => t == null ? void 0 : t.wait.current).then(() => m(p)) : m(p);
  }), h = L((d, p, m) => {
    Promise.all(c.current[p].splice(0).map(([g, y]) => y)).then(() => {
      var g;
      (g = l.current.shift()) == null || g();
    }).then(() => m(p));
  });
  return se(() => ({ children: r, register: a, unregister: s, onStart: f, onStop: h, wait: u, chains: c }), [a, s, r, f, h, c, u]);
}
let yd = ke, xd = Be.RenderStrategy;
function pv(e, t) {
  var n, r;
  let j = e, { transition: i = !0, beforeEnter: o, afterEnter: s, beforeLeave: a, afterLeave: l, enter: u, enterFrom: c, enterTo: f, entered: h, leave: d, leaveFrom: p, leaveTo: m } = j, g = k(j, ["transition", "beforeEnter", "afterEnter", "beforeLeave", "afterLeave", "enter", "enterFrom", "enterTo", "entered", "leave", "leaveFrom", "leaveTo"]), [y, w] = ne(null), b = z(null), T = vd(e), P = ve(...T ? [b, t, w] : t === null ? [] : [t]), C = (n = g.unmount) == null || n ? Nt.Unmount : Nt.Hidden, { show: A, appear: $, initial: F } = fv(), [R, M] = ne(A ? "visible" : "hidden"), W = hv(), { register: N, unregister: H } = W;
  he(() => N(b), [N, b]), he(() => {
    if (C === Nt.Hidden && b.current) {
      if (A && R !== "visible") {
        M("visible");
        return;
      }
      return me(R, { hidden: () => H(b), visible: () => N(b) });
    }
  }, [R, b, N, H, A, C]);
  let G = Mi();
  he(() => {
    if (T && G && R === "visible" && b.current === null) throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
  }, [b, R, G, T]);
  let D = F && !$, U = $ && A && F, K = z(!1), Q = bd(() => {
    K.current || (M("hidden"), H(b));
  }, W), Z = L((le) => {
    K.current = !0;
    let oe = le ? "enter" : "leave";
    Q.onStart(b, oe, (Se) => {
      Se === "enter" ? o == null || o() : Se === "leave" && (a == null || a());
    });
  }), X = L((le) => {
    let oe = le ? "enter" : "leave";
    K.current = !1, Q.onStop(b, oe, (Se) => {
      Se === "enter" ? s == null || s() : Se === "leave" && (l == null || l());
    }), oe === "leave" && !Fi(Q) && (M("hidden"), H(b));
  });
  be(() => {
    T && i || (Z(A), X(A));
  }, [A, T, i]);
  let de = !(!i || !T || !G || D), [, I] = $n(de, y, A, { start: Z, end: X }), V = It(v({ ref: P, className: ((r = Mo(g.className, U && u, U && c, I.enter && u, I.enter && I.closed && c, I.enter && !I.closed && f, I.leave && d, I.leave && !I.closed && p, I.leave && I.closed && m, !I.transition && A && h)) == null ? void 0 : r.trim()) || void 0 }, On(I))), B = 0;
  R === "visible" && (B |= we.Open), R === "hidden" && (B |= we.Closed), A && R === "hidden" && (B |= we.Opening), !A && R === "visible" && (B |= we.Closing);
  let te = ae();
  return O.createElement(Li.Provider, { value: Q }, O.createElement(mr, { value: B }, te({ ourProps: V, theirProps: g, defaultTag: yd, features: xd, visible: R === "visible", name: "Transition.Child" })));
}
function mv(e, t) {
  let P = e, { show: n, appear: r = !1, unmount: i = !0 } = P, o = k(P, ["show", "appear", "unmount"]), s = z(null), a = vd(e), l = ve(...a ? [s, t] : t === null ? [] : [t]);
  Mi();
  let u = Dt();
  if (n === void 0 && u !== null && (n = (u & we.Open) === we.Open), n === void 0) throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");
  let [c, f] = ne(n ? "visible" : "hidden"), h = bd(() => {
    n || f("hidden");
  }), [d, p] = ne(!0), m = z([n]);
  he(() => {
    d !== !1 && m.current[m.current.length - 1] !== n && (m.current.push(n), p(!1));
  }, [m, n]);
  let g = se(() => ({ show: n, appear: r, initial: d }), [n, r, d]);
  he(() => {
    n ? f("visible") : !Fi(h) && s.current !== null && f("hidden");
  }, [n, h]);
  let y = { unmount: i }, w = L(() => {
    var C;
    d && p(!1), (C = e.beforeEnter) == null || C.call(e);
  }), b = L(() => {
    var C;
    d && p(!1), (C = e.beforeLeave) == null || C.call(e);
  }), T = ae();
  return O.createElement(Li.Provider, { value: h }, O.createElement(Di.Provider, { value: g }, T({ ourProps: E(v({}, y), { as: ke, children: O.createElement(wd, E(v(v({ ref: l }, y), o), { beforeEnter: w, beforeLeave: b })) }), theirProps: {}, defaultTag: ke, features: xd, visible: c === "visible", name: "Transition" })));
}
function gv(e, t) {
  let n = ee(Di) !== null, r = Dt() !== null;
  return O.createElement(O.Fragment, null, !n && r ? O.createElement(Vo, v({ ref: t }, e)) : O.createElement(wd, v({ ref: t }, e)));
}
let Vo = ie(mv), wd = ie(pv), tr = ie(gv), Ii = Object.assign(Vo, { Child: tr, Root: Vo });
var vv = ((e) => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(vv || {}), bv = ((e) => (e[e.SetTitleId = 0] = "SetTitleId", e))(bv || {});
let yv = { 0(e, t) {
  return e.titleId === t.id ? e : E(v({}, e), { titleId: t.id });
} }, Vs = pe(null);
Vs.displayName = "DialogContext";
function Ni(e) {
  let t = ee(Vs);
  if (t === null) {
    let n = new Error(`<${e} /> is missing a parent <Dialog /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(n, Ni), n;
  }
  return t;
}
function xv(e, t) {
  return me(t.type, yv, e, t);
}
let vl = ie(function(e, t) {
  let n = ye(), I = e, { id: r = `headlessui-dialog-${n}`, open: i, onClose: o, initialFocus: s, role: a = "dialog", autoFocus: l = !0, __demoMode: u = !1, unmount: c = !1 } = I, f = k(I, ["id", "open", "onClose", "initialFocus", "role", "autoFocus", "__demoMode", "unmount"]), h = z(!1);
  a = (function() {
    return a === "dialog" || a === "alertdialog" ? a : (h.current || (h.current = !0, console.warn(`Invalid role [${a}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`)), "dialog");
  })();
  let d = Dt();
  i === void 0 && d !== null && (i = (d & we.Open) === we.Open);
  let p = z(null), m = ve(p, t), g = kt(p.current), y = i ? 0 : 1, [w, b] = us(xv, { titleId: null, descriptionId: null, panelRef: Uh() }), T = L(() => o(!1)), P = L((V) => b({ type: 0, id: V })), C = Mi() ? y === 0 : !1, [A, $] = td(), F = { get current() {
    var V;
    return (V = w.panelRef.current) != null ? V : p.current;
  } }, R = Is(), { resolveContainers: M } = hd({ mainTreeNode: R, portals: A, defaultContainers: [F] }), W = d !== null ? (d & we.Closing) === we.Closing : !1;
  Ss(u || W ? !1 : C, { allowed: L(() => {
    var V, B;
    return [(B = (V = p.current) == null ? void 0 : V.closest("[data-headlessui-portal]")) != null ? B : null];
  }), disallowed: L(() => {
    var V;
    return [(V = R == null ? void 0 : R.closest("body > *:not(#headlessui-portal-root)")) != null ? V : null];
  }) });
  let N = un.get(null);
  he(() => {
    if (C) return N.actions.push(r), () => N.actions.pop(r);
  }, [N, r, C]);
  let H = ue(N, re((V) => N.selectors.isTop(V, r), [N, r]));
  wi(H, M, (V) => {
    V.preventDefault(), T();
  }), ev(H, g == null ? void 0 : g.defaultView, (V) => {
    V.preventDefault(), V.stopPropagation(), document.activeElement && "blur" in document.activeElement && typeof document.activeElement.blur == "function" && document.activeElement.blur(), T();
  }), Si(u || W ? !1 : C, g, M), yi(C, p, T);
  let [G, D] = Eu(), U = se(() => [{ dialogState: y, close: T, setTitleId: P, unmount: c }, w], [y, T, P, c, w]), K = ge({ open: y === 0 }), Q = { ref: m, id: r, role: a, tabIndex: -1, "aria-modal": u ? void 0 : y === 0 ? !0 : void 0, "aria-labelledby": w.titleId, "aria-describedby": G, unmount: c }, Z = !tv(), X = Qt.None;
  C && !u && (X |= Qt.RestoreFocus, X |= Qt.TabLock, l && (X |= Qt.AutoFocus), Z && (X |= Qt.InitialFocus));
  let de = ae();
  return O.createElement(Ls, null, O.createElement(ml, { force: !0 }, O.createElement(Ai, null, O.createElement(Vs.Provider, { value: U }, O.createElement(nd, { target: p }, O.createElement(ml, { force: !1 }, O.createElement(D, { slot: K }, O.createElement($, null, O.createElement(sv, { initialFocus: s, initialFocusFallback: p, containers: M, features: X }, O.createElement(vi, { value: T }, de({ ourProps: Q, theirProps: f, slot: K, defaultTag: wv, features: Ev, visible: y === 0, name: "Dialog" })))))))))));
}), wv = "div", Ev = Be.RenderStrategy | Be.Static;
function Sv(e, t) {
  let l = e, { transition: n = !1, open: r } = l, i = k(l, ["transition", "open"]), o = Dt(), s = e.hasOwnProperty("open") || o !== null, a = e.hasOwnProperty("onClose");
  if (!s && !a) throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");
  if (!s) throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");
  if (!a) throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");
  if (!o && typeof e.open != "boolean") throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${e.open}`);
  if (typeof e.onClose != "function") throw new Error(`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${e.onClose}`);
  return (r !== void 0 || n) && !i.static ? O.createElement(Qr, null, O.createElement(Ii, { show: r, transition: n, unmount: i.unmount }, O.createElement(vl, v({ ref: t }, i)))) : O.createElement(Qr, null, O.createElement(vl, v({ ref: t, open: r }, i)));
}
let Tv = "div";
function Pv(e, t) {
  let n = ye(), g = e, { id: r = `headlessui-dialog-panel-${n}`, transition: i = !1 } = g, o = k(g, ["id", "transition"]), [{ dialogState: s, unmount: a }, l] = Ni("Dialog.Panel"), u = ve(t, l.panelRef), c = ge({ open: s === 0 }), f = L((y) => {
    y.stopPropagation();
  }), h = { ref: u, id: r, onClick: f }, d = i ? tr : ke, p = i ? { unmount: a } : {}, m = ae();
  return O.createElement(d, v({}, p), m({ ourProps: h, theirProps: o, slot: c, defaultTag: Tv, name: "Dialog.Panel" }));
}
let kv = "div";
function Cv(e, t) {
  let f = e, { transition: n = !1 } = f, r = k(f, ["transition"]), [{ dialogState: i, unmount: o }] = Ni("Dialog.Backdrop"), s = ge({ open: i === 0 }), a = { ref: t, "aria-hidden": !0 }, l = n ? tr : ke, u = n ? { unmount: o } : {}, c = ae();
  return O.createElement(l, v({}, u), c({ ourProps: a, theirProps: r, slot: s, defaultTag: kv, name: "Dialog.Backdrop" }));
}
let Ov = "h2";
function $v(e, t) {
  let n = ye(), c = e, { id: r = `headlessui-dialog-title-${n}` } = c, i = k(c, ["id"]), [{ dialogState: o, setTitleId: s }] = Ni("Dialog.Title"), a = ve(t);
  be(() => (s(r), () => s(null)), [r, s]);
  let l = ge({ open: o === 0 }), u = { ref: a, id: r };
  return ae()({ ourProps: u, theirProps: i, slot: l, defaultTag: Ov, name: "Dialog.Title" });
}
let Av = ie(Sv), Ed = ie(Pv);
ie(Cv);
let Sd = ie($v), Mv = Object.assign(Av, { Panel: Ed, Title: Sd, Description: xs });
var bl;
let Rv = (bl = O.startTransition) != null ? bl : function(e) {
  e();
};
var Dv = ((e) => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(Dv || {}), Lv = ((e) => (e[e.ToggleDisclosure = 0] = "ToggleDisclosure", e[e.CloseDisclosure = 1] = "CloseDisclosure", e[e.SetButtonId = 2] = "SetButtonId", e[e.SetPanelId = 3] = "SetPanelId", e[e.SetButtonElement = 4] = "SetButtonElement", e[e.SetPanelElement = 5] = "SetPanelElement", e))(Lv || {});
let Fv = { 0: (e) => E(v({}, e), { disclosureState: me(e.disclosureState, { 0: 1, 1: 0 }) }), 1: (e) => e.disclosureState === 1 ? e : E(v({}, e), { disclosureState: 1 }), 2(e, t) {
  return e.buttonId === t.buttonId ? e : E(v({}, e), { buttonId: t.buttonId });
}, 3(e, t) {
  return e.panelId === t.panelId ? e : E(v({}, e), { panelId: t.panelId });
}, 4(e, t) {
  return e.buttonElement === t.element ? e : E(v({}, e), { buttonElement: t.element });
}, 5(e, t) {
  return e.panelElement === t.element ? e : E(v({}, e), { panelElement: t.element });
} }, Bs = pe(null);
Bs.displayName = "DisclosureContext";
function js(e) {
  let t = ee(Bs);
  if (t === null) {
    let n = new Error(`<${e} /> is missing a parent <Disclosure /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(n, js), n;
  }
  return t;
}
let zs = pe(null);
zs.displayName = "DisclosureAPIContext";
function Td(e) {
  let t = ee(zs);
  if (t === null) {
    let n = new Error(`<${e} /> is missing a parent <Disclosure /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(n, Td), n;
  }
  return t;
}
let _s = pe(null);
_s.displayName = "DisclosurePanelContext";
function Iv() {
  return ee(_s);
}
function Nv(e, t) {
  return me(t.type, Fv, e, t);
}
let Vv = ke;
function Bv(e, t) {
  let m = e, { defaultOpen: n = !1 } = m, r = k(m, ["defaultOpen"]), i = z(null), o = ve(t, ys((g) => {
    i.current = g;
  }, e.as === void 0 || wn(e.as))), s = us(Nv, { disclosureState: n ? 0 : 1, buttonElement: null, panelElement: null, buttonId: null, panelId: null }), [{ disclosureState: a, buttonId: l }, u] = s, c = L((g) => {
    u({ type: 1 });
    let y = Mt(i.current);
    if (!y || !l) return;
    let w = g ? qe(g) ? g : "current" in g && qe(g.current) ? g.current : y.getElementById(l) : y.getElementById(l);
    w == null || w.focus();
  }), f = se(() => ({ close: c }), [c]), h = ge({ open: a === 0, close: c }), d = { ref: o }, p = ae();
  return O.createElement(Bs.Provider, { value: s }, O.createElement(zs.Provider, { value: f }, O.createElement(vi, { value: c }, O.createElement(mr, { value: me(a, { 0: we.Open, 1: we.Closed }) }, p({ ourProps: d, theirProps: r, slot: h, defaultTag: Vv, name: "Disclosure" })))));
}
let jv = "button";
function zv(e, t) {
  let n = ye(), F = e, { id: r = `headlessui-disclosure-button-${n}`, disabled: i = !1, autoFocus: o = !1 } = F, s = k(F, ["id", "disabled", "autoFocus"]), [a, l] = js("Disclosure.Button"), u = Iv(), c = u === null ? !1 : u === a.panelId, f = z(null), h = ve(f, t, L((R) => {
    if (!c) return l({ type: 4, element: R });
  }));
  be(() => {
    if (!c) return l({ type: 2, buttonId: r }), () => {
      l({ type: 2, buttonId: null });
    };
  }, [r, l, c]);
  let d = L((R) => {
    var M;
    if (c) {
      if (a.disclosureState === 1) return;
      switch (R.key) {
        case J.Space:
        case J.Enter:
          R.preventDefault(), R.stopPropagation(), l({ type: 0 }), (M = a.buttonElement) == null || M.focus();
          break;
      }
    } else switch (R.key) {
      case J.Space:
      case J.Enter:
        R.preventDefault(), R.stopPropagation(), l({ type: 0 });
        break;
    }
  }), p = L((R) => {
    switch (R.key) {
      case J.Space:
        R.preventDefault();
        break;
    }
  }), m = L((R) => {
    var M;
    Tn(R.currentTarget) || i || (c ? (l({ type: 0 }), (M = a.buttonElement) == null || M.focus()) : l({ type: 0 }));
  }), { isFocusVisible: g, focusProps: y } = vt({ autoFocus: o }), { isHovered: w, hoverProps: b } = At({ isDisabled: i }), { pressed: T, pressProps: P } = ln({ disabled: i }), C = ge({ open: a.disclosureState === 0, hover: w, active: T, disabled: i, focus: g, autofocus: o }), A = fr(e, a.buttonElement), $ = We(c ? { ref: h, type: A, disabled: i || void 0, autoFocus: o, onKeyDown: d, onClick: m } : { ref: h, id: r, type: A, "aria-expanded": a.disclosureState === 0, "aria-controls": a.panelElement ? a.panelId : void 0, disabled: i || void 0, autoFocus: o, onKeyDown: d, onKeyUp: p, onClick: m }, y, b, P);
  return ae()({ ourProps: $, theirProps: s, slot: C, defaultTag: jv, name: "Disclosure.Button" });
}
let _v = "div", Wv = Be.RenderStrategy | Be.Static;
function Hv(e, t) {
  let n = ye(), w = e, { id: r = `headlessui-disclosure-panel-${n}`, transition: i = !1 } = w, o = k(w, ["id", "transition"]), [s, a] = js("Disclosure.Panel"), { close: l } = Td("Disclosure.Panel"), [u, c] = ne(null), f = ve(t, L((b) => {
    Rv(() => a({ type: 5, element: b }));
  }), c);
  be(() => (a({ type: 3, panelId: r }), () => {
    a({ type: 3, panelId: null });
  }), [r, a]);
  let h = Dt(), [d, p] = $n(i, u, h !== null ? (h & we.Open) === we.Open : s.disclosureState === 0), m = ge({ open: s.disclosureState === 0, close: l }), g = v({ ref: f, id: r }, On(p)), y = ae();
  return O.createElement(Ls, null, O.createElement(_s.Provider, { value: s.panelId }, y({ ourProps: g, theirProps: o, slot: m, defaultTag: _v, features: Wv, visible: d, name: "Disclosure.Panel" })));
}
let Uv = ie(Bv), Pd = ie(zv), kd = ie(Hv), Kv = Object.assign(Uv, { Button: Pd, Panel: kd }), Gv = "div";
function Yv(e, t) {
  let n = `headlessui-control-${ye()}`, [r, i] = mi(), [o, s] = Eu(), a = Rt(), d = e, { disabled: l = a || !1 } = d, u = k(d, ["disabled"]), c = ge({ disabled: l }), f = { ref: t, disabled: l || void 0, "aria-disabled": l || void 0 }, h = ae();
  return O.createElement(uu, { value: l }, O.createElement(i, { value: r }, O.createElement(s, { value: o }, O.createElement(Wp, { id: n }, h({ ourProps: f, theirProps: E(v({}, u), { children: O.createElement(jp, null, typeof u.children == "function" ? u.children(c) : u.children) }), slot: c, defaultTag: Gv, name: "Field" })))));
}
let Cd = ie(Yv);
function Xv(e) {
  let t = typeof e == "string" ? e : void 0, [n, r] = ne(t);
  return [t != null ? t : n, re((i) => {
    t || De(i) && r(i.tagName.toLowerCase());
  }, [t])];
}
let yl = "fieldset";
function qv(e, t) {
  var n;
  let r = Rt(), p = e, { disabled: i = r || !1 } = p, o = k(p, ["disabled"]), [s, a] = Xv((n = e.as) != null ? n : yl), l = ve(t, a), [u, c] = mi(), f = ge({ disabled: i }), h = s === "fieldset" ? { ref: l, "aria-labelledby": u, disabled: i || void 0 } : { ref: l, role: "group", "aria-labelledby": u, "aria-disabled": i || void 0 }, d = ae();
  return O.createElement(uu, { value: i }, O.createElement(c, null, d({ ourProps: h, theirProps: o, slot: f, defaultTag: yl, name: "Fieldset" })));
}
let Zv = ie(qv), Qv = "input";
function Jv(e, t) {
  let n = ye(), r = cr(), i = Rt(), w = e, { id: o = r || `headlessui-input-${n}`, disabled: s = i || !1, autoFocus: a = !1, invalid: l = !1 } = w, u = k(w, ["id", "disabled", "autoFocus", "invalid"]), c = cn(), f = hi(), { isFocused: h, focusProps: d } = vt({ autoFocus: a }), { isHovered: p, hoverProps: m } = At({ isDisabled: s }), g = We({ ref: t, id: o, "aria-labelledby": c, "aria-describedby": f, "aria-invalid": l ? "true" : void 0, disabled: s || void 0, autoFocus: a }, d, m), y = ge({ disabled: s, invalid: l, hover: p, focus: h, autofocus: a });
  return ae()({ ourProps: g, theirProps: u, slot: y, defaultTag: Qv, name: "Input" });
}
let eb = ie(Jv);
function tb(e, t) {
  return O.createElement(gi, v({ as: "div", ref: t }, e));
}
let nb = ie(tb), xl = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
function wl(e) {
  var t, n;
  let r = (t = e.innerText) != null ? t : "", i = e.cloneNode(!0);
  if (!De(i)) return r;
  let o = !1;
  for (let a of i.querySelectorAll('[hidden],[aria-hidden],[role="img"]')) a.remove(), o = !0;
  let s = o ? (n = i.innerText) != null ? n : "" : r;
  return xl.test(s) && (s = s.replace(xl, "")), s;
}
function rb(e) {
  let t = e.getAttribute("aria-label");
  if (typeof t == "string") return t.trim();
  let n = e.getAttribute("aria-labelledby");
  if (n) {
    let r = n.split(" ").map((i) => {
      let o = document.getElementById(i);
      if (o) {
        let s = o.getAttribute("aria-label");
        return typeof s == "string" ? s.trim() : wl(o).trim();
      }
      return null;
    }).filter(Boolean);
    if (r.length > 0) return r.join(", ");
  }
  return wl(e).trim();
}
function ib(e) {
  let t = z(""), n = z("");
  return L(() => {
    let r = e.current;
    if (!r) return "";
    let i = r.innerText;
    if (t.current === i) return n.current;
    let o = rb(r).trim().toLowerCase();
    return t.current = i, n.current = o, o;
  });
}
var ob = Object.defineProperty, sb = (e, t, n) => t in e ? ob(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, El = (e, t, n) => (sb(e, typeof t != "symbol" ? t + "" : t, n), n), Ie = ((e) => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(Ie || {}), Bt = ((e) => (e[e.Single = 0] = "Single", e[e.Multi = 1] = "Multi", e))(Bt || {}), Fr = ((e) => (e[e.Pointer = 0] = "Pointer", e[e.Other = 1] = "Other", e))(Fr || {}), Od = ((e) => (e[e.OpenListbox = 0] = "OpenListbox", e[e.CloseListbox = 1] = "CloseListbox", e[e.GoToOption = 2] = "GoToOption", e[e.Search = 3] = "Search", e[e.ClearSearch = 4] = "ClearSearch", e[e.SelectOption = 5] = "SelectOption", e[e.RegisterOptions = 6] = "RegisterOptions", e[e.UnregisterOptions = 7] = "UnregisterOptions", e[e.SetButtonElement = 8] = "SetButtonElement", e[e.SetOptionsElement = 9] = "SetOptionsElement", e[e.SortOptions = 10] = "SortOptions", e[e.MarkButtonAsMoved = 11] = "MarkButtonAsMoved", e))(Od || {});
function Sl(e, t = (n) => n) {
  let n = e.activeOptionIndex !== null ? e.options[e.activeOptionIndex] : null, r = Vt(t(e.options.slice()), (o) => o.dataRef.current.domRef.current), i = n ? r.indexOf(n) : null;
  return i === -1 && (i = null), { options: r, activeOptionIndex: i };
}
let ab = { 1(e) {
  if (e.dataRef.current.disabled || e.listboxState === 1) return e;
  let t = e.buttonElement ? St.Tracked(Fs(e.buttonElement)) : e.buttonPositionState;
  return E(v({}, e), { activeOptionIndex: null, pendingFocus: { focus: ce.Nothing }, listboxState: 1, __demoMode: !1, buttonPositionState: t });
}, 0(e, t) {
  if (e.dataRef.current.disabled || e.listboxState === 0) return e;
  let n = e.activeOptionIndex, { isSelected: r } = e.dataRef.current, i = e.options.findIndex((o) => r(o.dataRef.current.value));
  return i !== -1 && (n = i), E(v({}, e), { frozenValue: !1, pendingFocus: t.focus, listboxState: 0, activeOptionIndex: n, __demoMode: !1, buttonPositionState: St.Idle });
}, 2(e, t) {
  var n, r, i, o, s;
  if (e.dataRef.current.disabled || e.listboxState === 1) return e;
  let a = E(v({}, e), { searchQuery: "", activationTrigger: (n = t.trigger) != null ? n : 1, __demoMode: !1 });
  if (t.focus === ce.Nothing) return E(v({}, a), { activeOptionIndex: null });
  if (t.focus === ce.Specific) return E(v({}, a), { activeOptionIndex: e.options.findIndex((c) => c.id === t.id) });
  if (t.focus === ce.Previous) {
    let c = e.activeOptionIndex;
    if (c !== null) {
      let f = e.options[c].dataRef.current.domRef, h = pn(t, { resolveItems: () => e.options, resolveActiveIndex: () => e.activeOptionIndex, resolveId: (d) => d.id, resolveDisabled: (d) => d.dataRef.current.disabled });
      if (h !== null) {
        let d = e.options[h].dataRef.current.domRef;
        if (((r = f.current) == null ? void 0 : r.previousElementSibling) === d.current || ((i = d.current) == null ? void 0 : i.previousElementSibling) === null) return E(v({}, a), { activeOptionIndex: h });
      }
    }
  } else if (t.focus === ce.Next) {
    let c = e.activeOptionIndex;
    if (c !== null) {
      let f = e.options[c].dataRef.current.domRef, h = pn(t, { resolveItems: () => e.options, resolveActiveIndex: () => e.activeOptionIndex, resolveId: (d) => d.id, resolveDisabled: (d) => d.dataRef.current.disabled });
      if (h !== null) {
        let d = e.options[h].dataRef.current.domRef;
        if (((o = f.current) == null ? void 0 : o.nextElementSibling) === d.current || ((s = d.current) == null ? void 0 : s.nextElementSibling) === null) return E(v({}, a), { activeOptionIndex: h });
      }
    }
  }
  let l = Sl(e), u = pn(t, { resolveItems: () => l.options, resolveActiveIndex: () => l.activeOptionIndex, resolveId: (c) => c.id, resolveDisabled: (c) => c.dataRef.current.disabled });
  return E(v(v({}, a), l), { activeOptionIndex: u });
}, 3: (e, t) => {
  if (e.dataRef.current.disabled || e.listboxState === 1) return e;
  let n = e.searchQuery !== "" ? 0 : 1, r = e.searchQuery + t.value.toLowerCase(), i = (e.activeOptionIndex !== null ? e.options.slice(e.activeOptionIndex + n).concat(e.options.slice(0, e.activeOptionIndex + n)) : e.options).find((s) => {
    var a;
    return !s.dataRef.current.disabled && ((a = s.dataRef.current.textValue) == null ? void 0 : a.startsWith(r));
  }), o = i ? e.options.indexOf(i) : -1;
  return o === -1 || o === e.activeOptionIndex ? E(v({}, e), { searchQuery: r }) : E(v({}, e), { searchQuery: r, activeOptionIndex: o, activationTrigger: 1 });
}, 4(e) {
  return e.dataRef.current.disabled || e.listboxState === 1 || e.searchQuery === "" ? e : E(v({}, e), { searchQuery: "" });
}, 5(e) {
  return e.dataRef.current.mode === 0 ? E(v({}, e), { frozenValue: !0 }) : v({}, e);
}, 6: (e, t) => {
  let n = e.options.concat(t.options), r = e.activeOptionIndex;
  if (e.pendingFocus.focus !== ce.Nothing && (r = pn(e.pendingFocus, { resolveItems: () => n, resolveActiveIndex: () => e.activeOptionIndex, resolveId: (i) => i.id, resolveDisabled: (i) => i.dataRef.current.disabled })), e.activeOptionIndex === null) {
    let { isSelected: i } = e.dataRef.current;
    if (i) {
      let o = n.findIndex((s) => i == null ? void 0 : i(s.dataRef.current.value));
      o !== -1 && (r = o);
    }
  }
  return E(v({}, e), { options: n, activeOptionIndex: r, pendingFocus: { focus: ce.Nothing }, pendingShouldSort: !0 });
}, 7: (e, t) => {
  let n = e.options, r = [], i = new Set(t.options);
  for (let [o, s] of n.entries()) if (i.has(s.id) && (r.push(o), i.delete(s.id), i.size === 0)) break;
  if (r.length > 0) {
    n = n.slice();
    for (let o of r.reverse()) n.splice(o, 1);
  }
  return E(v({}, e), { options: n, activationTrigger: 1 });
}, 8: (e, t) => e.buttonElement === t.element ? e : E(v({}, e), { buttonElement: t.element }), 9: (e, t) => e.optionsElement === t.element ? e : E(v({}, e), { optionsElement: t.element }), 10: (e) => e.pendingShouldSort ? E(v(v({}, e), Sl(e)), { pendingShouldSort: !1 }) : e, 11(e) {
  return e.buttonPositionState.kind !== "Tracked" ? e : E(v({}, e), { buttonPositionState: St.Moved });
} }, lb = class $d extends bi {
  constructor(t) {
    super(t), El(this, "actions", { onChange: (n) => {
      let { onChange: r, compare: i, mode: o, value: s } = this.state.dataRef.current;
      return me(o, { 0: () => r == null ? void 0 : r(n), 1: () => {
        let a = s.slice(), l = a.findIndex((u) => i(u, n));
        return l === -1 ? a.push(n) : a.splice(l, 1), r == null ? void 0 : r(a);
      } });
    }, registerOption: Zi(() => {
      let n = [], r = /* @__PURE__ */ new Set();
      return [(i, o) => {
        r.has(o) || (r.add(o), n.push({ id: i, dataRef: o }));
      }, () => (r.clear(), this.send({ type: 6, options: n.splice(0) }))];
    }), unregisterOption: Zi(() => {
      let n = [];
      return [(r) => n.push(r), () => {
        this.send({ type: 7, options: n.splice(0) });
      }];
    }), goToOption: Zi(() => {
      let n = null;
      return [(r, i) => {
        n = E(v({ type: 2 }, r), { trigger: i });
      }, () => n && this.send(n)];
    }), closeListbox: () => {
      this.send({ type: 1 });
    }, openListbox: (n) => {
      this.send({ type: 0, focus: n });
    }, selectActiveOption: () => {
      var n;
      if (this.state.activeOptionIndex !== null) {
        let { dataRef: r } = this.state.options[this.state.activeOptionIndex];
        this.actions.selectOption(r.current.value);
      } else this.state.dataRef.current.mode === 0 && (this.actions.closeListbox(), (n = this.state.buttonElement) == null || n.focus({ preventScroll: !0 }));
    }, selectOption: (n) => {
      this.send({ type: 5, value: n });
    }, search: (n) => {
      this.send({ type: 3, value: n });
    }, clearSearch: () => {
      this.send({ type: 4 });
    }, setButtonElement: (n) => {
      this.send({ type: 8, element: n });
    }, setOptionsElement: (n) => {
      this.send({ type: 9, element: n });
    } }), El(this, "selectors", { activeDescendantId(n) {
      var r;
      let i = n.activeOptionIndex, o = n.options;
      return i === null || (r = o[i]) == null ? void 0 : r.id;
    }, isActive(n, r) {
      var i;
      let o = n.activeOptionIndex, s = n.options;
      return o !== null ? ((i = s[o]) == null ? void 0 : i.id) === r : !1;
    }, hasFrozenValue(n) {
      return n.frozenValue;
    }, shouldScrollIntoView(n, r) {
      return n.__demoMode || n.listboxState !== 0 || n.activationTrigger === 0 ? !1 : this.isActive(n, r);
    }, didButtonMove(n) {
      return n.buttonPositionState.kind === "Moved";
    } }), this.on(6, () => {
      requestAnimationFrame(() => {
        this.send({ type: 10 });
      });
    });
    {
      let n = this.state.id, r = un.get(null);
      this.disposables.add(r.on(Es.Push, (i) => {
        !r.selectors.isTop(i, n) && this.state.listboxState === 0 && this.actions.closeListbox();
      })), this.on(0, () => r.actions.push(n)), this.on(1, () => r.actions.pop(n));
    }
    this.disposables.group((n) => {
      this.on(1, (r) => {
        r.buttonElement && (n.dispose(), n.add(rd(r.buttonElement, r.buttonPositionState, () => {
          this.send({ type: 11 });
        })));
      });
    }), this.on(5, (n, r) => {
      var i;
      this.actions.onChange(r.value), this.state.dataRef.current.mode === 0 && (this.actions.closeListbox(), (i = this.state.buttonElement) == null || i.focus({ preventScroll: !0 }));
    });
  }
  static new({ id: t, __demoMode: n = !1 }) {
    return new $d({ id: t, dataRef: { current: {} }, listboxState: n ? 0 : 1, options: [], searchQuery: "", activeOptionIndex: null, activationTrigger: 1, buttonElement: null, optionsElement: null, pendingShouldSort: !1, pendingFocus: { focus: ce.Nothing }, frozenValue: !1, __demoMode: n, buttonPositionState: St.Idle });
  }
  reduce(t, n) {
    return me(n.type, ab, t, n);
  }
};
const Ad = pe(null);
function Ws(e) {
  let t = ee(Ad);
  if (t === null) {
    let n = new Error(`<${e} /> is missing a parent <Listbox /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(n, Md), n;
  }
  return t;
}
function Md({ id: e, __demoMode: t = !1 }) {
  let n = se(() => lb.new({ id: e, __demoMode: t }), []);
  return gr(() => n.dispose()), n;
}
let Vi = pe(null);
Vi.displayName = "ListboxDataContext";
function br(e) {
  let t = ee(Vi);
  if (t === null) {
    let n = new Error(`<${e} /> is missing a parent <Listbox /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(n, br), n;
  }
  return t;
}
let cb = ke;
function ub(e, t) {
  let n = ye(), r = Rt(), de = e, { value: i, defaultValue: o, form: s, name: a, onChange: l, by: u, invalid: c = !1, disabled: f = r || !1, horizontal: h = !1, multiple: d = !1, __demoMode: p = !1 } = de, m = k(de, ["value", "defaultValue", "form", "name", "onChange", "by", "invalid", "disabled", "horizontal", "multiple", "__demoMode"]);
  const g = h ? "horizontal" : "vertical";
  let y = ve(t), w = vs(o), [b = d ? [] : void 0, T] = gs(i, l, w), P = Md({ id: n, __demoMode: p }), C = z({ static: !1, hold: !1 }), A = z(/* @__PURE__ */ new Map()), $ = Pu(u), F = re((I) => me(R.mode, { [Bt.Multi]: () => b.some((V) => $(V, I)), [Bt.Single]: () => $(b, I) }), [b]), R = ge({ value: b, disabled: f, invalid: c, mode: d ? Bt.Multi : Bt.Single, orientation: g, onChange: T, compare: $, isSelected: F, optionsPropsRef: C, listRef: A });
  he(() => {
    P.state.dataRef.current = R;
  }, [R]);
  let M = ue(P, (I) => I.listboxState), W = un.get(null), N = ue(W, re((I) => W.selectors.isTop(I, n), [W, n])), [H, G] = ue(P, (I) => [I.buttonElement, I.optionsElement]);
  wi(N, [H, G], (I, V) => {
    P.send({ type: Od.CloseListbox }), Ts(V, xi.Loose) || (I.preventDefault(), H == null || H.focus());
  });
  let D = ge({ open: M === Ie.Open, disabled: f, invalid: c, value: b }), [U, K] = mi({ inherit: !0 }), Q = { ref: y }, Z = re(() => {
    if (w !== void 0) return T == null ? void 0 : T(w);
  }, [T, w]), X = ae();
  return O.createElement(K, { value: U, props: { htmlFor: H == null ? void 0 : H.id }, slot: { open: M === Ie.Open, disabled: f } }, O.createElement(Ds, null, O.createElement(Ad.Provider, { value: P }, O.createElement(Vi.Provider, { value: R }, O.createElement(mr, { value: me(M, { [Ie.Open]: we.Open, [Ie.Closed]: we.Closed }) }, a != null && b != null && O.createElement(bs, { disabled: f, data: { [a]: b }, form: s, onReset: Z }), X({ ourProps: Q, theirProps: m, slot: D, defaultTag: cb, name: "Listbox" }))))));
}
let db = "button";
function fb(e, t) {
  let n = ye(), r = cr(), i = br("Listbox.Button"), o = Ws("Listbox.Button"), G = e, { id: s = r || `headlessui-listbox-button-${n}`, disabled: a = i.disabled || !1, autoFocus: l = !1 } = G, u = k(G, ["id", "disabled", "autoFocus"]), c = ve(t, As(), o.actions.setButtonElement), f = w0(), [h, d, p] = ue(o, (D) => [D.listboxState, D.buttonElement, D.optionsElement]), m = h === Ie.Open;
  Du(m, { trigger: d, action: re((D) => {
    if (d != null && d.contains(D.target)) return wt.Ignore;
    let U = D.target.closest('[role="option"]:not([data-disabled])');
    return De(U) ? wt.Select(U) : p != null && p.contains(D.target) ? wt.Ignore : wt.Close;
  }, [d, p]), close: o.actions.closeListbox, select: o.actions.selectActiveOption });
  let g = L((D) => {
    switch (D.key) {
      case J.Enter:
        mu(D.currentTarget);
        break;
      case J.Space:
      case J.ArrowDown:
        D.preventDefault(), o.actions.openListbox({ focus: i.value ? ce.Nothing : ce.First });
        break;
      case J.ArrowUp:
        D.preventDefault(), o.actions.openListbox({ focus: i.value ? ce.Nothing : ce.Last });
        break;
    }
  }), y = L((D) => {
    switch (D.key) {
      case J.Space:
        D.preventDefault();
        break;
    }
  }), w = ku((D) => {
    var U;
    o.state.listboxState === Ie.Open ? (nt(() => o.actions.closeListbox()), (U = o.state.buttonElement) == null || U.focus({ preventScroll: !0 })) : (D.preventDefault(), o.actions.openListbox({ focus: ce.Nothing }));
  }), b = L((D) => D.preventDefault()), T = cn([s]), P = hi(), { isFocusVisible: C, focusProps: A } = vt({ autoFocus: l }), { isHovered: $, hoverProps: F } = At({ isDisabled: a }), { pressed: R, pressProps: M } = ln({ disabled: a }), W = ge({ open: h === Ie.Open, active: R || h === Ie.Open, disabled: a, invalid: i.invalid, value: i.value, hover: $, focus: C, autofocus: l }), N = ue(o, (D) => D.listboxState === Ie.Open), H = We(f(), { ref: c, id: s, type: fr(e, d), "aria-haspopup": "listbox", "aria-controls": p == null ? void 0 : p.id, "aria-expanded": N, "aria-labelledby": T, "aria-describedby": P, disabled: a || void 0, autoFocus: l, onKeyDown: g, onKeyUp: y, onKeyPress: b }, w, A, F, M);
  return ae()({ ourProps: H, theirProps: u, slot: W, defaultTag: db, name: "Listbox.Button" });
}
let Rd = pe(!1), hb = "div", pb = Be.RenderStrategy | Be.Static;
function mb(e, t) {
  let n = ye(), te = e, { id: r = `headlessui-listbox-options-${n}`, anchor: i, portal: o = !1, modal: s = !0, transition: a = !1 } = te, l = k(te, ["id", "anchor", "portal", "modal", "transition"]), u = $s(i), [c, f] = ne(null);
  u && (o = !0);
  let h = br("Listbox.Options"), d = Ws("Listbox.Options"), [p, m, g, y] = ue(d, (j) => [j.listboxState, j.buttonElement, j.optionsElement, j.__demoMode]), w = kt(m), b = kt(g), T = Dt(), [P, C] = $n(a, c, T !== null ? (T & we.Open) === we.Open : p === Ie.Open);
  yi(P, m, d.actions.closeListbox);
  let A = y ? !1 : s && p === Ie.Open;
  Si(A, b);
  let $ = y ? !1 : s && p === Ie.Open;
  Ss($, { allowed: re(() => [m, g], [m, g]) });
  let F = ue(d, d.selectors.didButtonMove) ? !1 : P, R = ue(d, d.selectors.hasFrozenValue) && !e.static, M = Zr(R, h.value), W = re((j) => h.compare(M, j), [h.compare, M]), N = ue(d, (j) => {
    var le;
    if (u == null || !((le = u == null ? void 0 : u.to) != null && le.includes("selection"))) return null;
    let oe = j.options.findIndex((Se) => W(Se.dataRef.current.value));
    return oe === -1 && (oe = 0), oe;
  }), H = (() => {
    if (u == null) return;
    if (N === null) return E(v({}, u), { inner: void 0 });
    let j = Array.from(h.listRef.current.values());
    return E(v({}, u), { inner: { listRef: { current: j }, index: N } });
  })(), [G, D] = Rs(H), U = Ms(), K = ve(t, u ? G : null, d.actions.setOptionsElement, f), Q = bt();
  be(() => {
    let j = g;
    j && p === Ie.Open && (di(j) || j == null || j.focus({ preventScroll: !0 }));
  }, [p, g]);
  let Z = L((j) => {
    var le;
    switch (Q.dispose(), j.key) {
      case J.Space:
        if (d.state.searchQuery !== "") return j.preventDefault(), j.stopPropagation(), d.actions.search(j.key);
      case J.Enter:
        j.preventDefault(), j.stopPropagation(), d.actions.selectActiveOption();
        break;
      case me(h.orientation, { vertical: J.ArrowDown, horizontal: J.ArrowRight }):
        return j.preventDefault(), j.stopPropagation(), d.actions.goToOption({ focus: ce.Next });
      case me(h.orientation, { vertical: J.ArrowUp, horizontal: J.ArrowLeft }):
        return j.preventDefault(), j.stopPropagation(), d.actions.goToOption({ focus: ce.Previous });
      case J.Home:
      case J.PageUp:
        return j.preventDefault(), j.stopPropagation(), d.actions.goToOption({ focus: ce.First });
      case J.End:
      case J.PageDown:
        return j.preventDefault(), j.stopPropagation(), d.actions.goToOption({ focus: ce.Last });
      case J.Escape:
        j.preventDefault(), j.stopPropagation(), nt(() => d.actions.closeListbox()), (le = d.state.buttonElement) == null || le.focus({ preventScroll: !0 });
        return;
      case J.Tab:
        j.preventDefault(), j.stopPropagation(), nt(() => d.actions.closeListbox()), Im(d.state.buttonElement, j.shiftKey ? xe.Previous : xe.Next);
        break;
      default:
        j.key.length === 1 && (d.actions.search(j.key), Q.setTimeout(() => d.actions.clearSearch(), 350));
        break;
    }
  }), X = ue(d, (j) => {
    var le;
    return (le = j.buttonElement) == null ? void 0 : le.id;
  }), de = ge({ open: p === Ie.Open }), I = We(u ? U() : {}, v({ id: r, ref: K, "aria-activedescendant": ue(d, d.selectors.activeDescendantId), "aria-multiselectable": h.mode === Bt.Multi ? !0 : void 0, "aria-labelledby": X, "aria-orientation": h.orientation, onKeyDown: Z, role: "listbox", tabIndex: p === Ie.Open ? 0 : void 0, style: E(v(v({}, l.style), D), { "--button-width": Kr(P, m, !0).width }) }, On(C))), V = ae(), B = se(() => h.mode === Bt.Multi ? h : E(v({}, h), { isSelected: W }), [h, W]);
  return O.createElement(Ai, { enabled: o ? e.static || P : !1, ownerDocument: w }, O.createElement(Vi.Provider, { value: B }, V({ ourProps: I, theirProps: l, slot: de, defaultTag: hb, features: pb, visible: F, name: "Listbox.Options" })));
}
let gb = "div";
function vb(e, t) {
  let n = ye(), R = e, { id: r = `headlessui-listbox-option-${n}`, disabled: i = !1, value: o } = R, s = k(R, ["id", "disabled", "value"]), a = ee(Rd) === !0, l = br("Listbox.Option"), u = Ws("Listbox.Option"), c = ue(u, (M) => u.selectors.isActive(M, r)), f = l.isSelected(o), h = z(null), d = ib(h), p = je({ disabled: i, value: o, domRef: h, get textValue() {
    return d();
  } }), m = ve(t, h, (M) => {
    M ? l.listRef.current.set(r, M) : l.listRef.current.delete(r);
  }), g = ue(u, (M) => u.selectors.shouldScrollIntoView(M, r));
  he(() => {
    if (g) return He().requestAnimationFrame(() => {
      var M, W;
      (W = (M = h.current) == null ? void 0 : M.scrollIntoView) == null || W.call(M, { block: "nearest" });
    });
  }, [g, h]), he(() => {
    if (!a) return u.actions.registerOption(r, p), () => u.actions.unregisterOption(r);
  }, [p, r, a]);
  let y = L((M) => {
    if (i) return M.preventDefault();
    u.actions.selectOption(o);
  }), w = L(() => {
    if (i) return u.actions.goToOption({ focus: ce.Nothing });
    u.actions.goToOption({ focus: ce.Specific, id: r });
  }), b = Fu(), T = L((M) => b.update(M)), P = L((M) => {
    b.wasMoved(M) && (i || c && u.state.activationTrigger === Fr.Pointer || u.actions.goToOption({ focus: ce.Specific, id: r }, Fr.Pointer));
  }), C = L((M) => {
    b.wasMoved(M) && (i || c && u.state.activationTrigger === Fr.Pointer && u.actions.goToOption({ focus: ce.Nothing }));
  }), A = ge({ active: c, focus: c, selected: f, disabled: i, selectedOption: f && a }), $ = a ? {} : { id: r, ref: m, role: "option", tabIndex: i === !0 ? void 0 : -1, "aria-disabled": i === !0 ? !0 : void 0, "aria-selected": f, disabled: void 0, onClick: y, onFocus: w, onPointerEnter: T, onMouseEnter: T, onPointerMove: P, onMouseMove: P, onPointerLeave: C, onMouseLeave: C }, F = ae();
  return !f && a ? null : F({ ourProps: $, theirProps: s, slot: A, defaultTag: gb, name: "Listbox.Option" });
}
let bb = ke;
function yb(e, t) {
  let c = e, { options: n, placeholder: r } = c, i = k(c, ["options", "placeholder"]), o = { ref: ve(t) }, s = br("ListboxSelectedOption"), a = ge({}), l = s.value === void 0 || s.value === null || s.mode === Bt.Multi && Array.isArray(s.value) && s.value.length === 0, u = ae();
  return O.createElement(Rd.Provider, { value: !0 }, u({ ourProps: o, theirProps: E(v({}, i), { children: O.createElement(O.Fragment, null, r && l ? r : n) }), slot: a, defaultTag: bb, name: "ListboxSelectedOption" }));
}
let xb = ie(ub), Dd = ie(fb), wb = gi, Ld = ie(mb), Fd = ie(vb), Id = ie(yb), Eb = Object.assign(xb, { Button: Dd, Label: wb, Options: Ld, Option: Fd, SelectedOption: Id });
var Sb = Object.defineProperty, Tb = (e, t, n) => t in e ? Sb(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Tl = (e, t, n) => (Tb(e, typeof t != "symbol" ? t + "" : t, n), n), $e = ((e) => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))($e || {}), Pb = ((e) => (e[e.OpenPopover = 0] = "OpenPopover", e[e.ClosePopover = 1] = "ClosePopover", e[e.SetButton = 2] = "SetButton", e[e.SetButtonId = 3] = "SetButtonId", e[e.SetPanel = 4] = "SetPanel", e[e.SetPanelId = 5] = "SetPanelId", e))(Pb || {});
let kb = { 0: (e) => e.popoverState === 0 ? e : E(v({}, e), { popoverState: 0, __demoMode: !1 }), 1(e) {
  return e.popoverState === 1 ? e : E(v({}, e), { popoverState: 1, __demoMode: !1 });
}, 2(e, t) {
  return e.button === t.button ? e : E(v({}, e), { button: t.button });
}, 3(e, t) {
  return e.buttonId === t.buttonId ? e : E(v({}, e), { buttonId: t.buttonId });
}, 4(e, t) {
  return e.panel === t.panel ? e : E(v({}, e), { panel: t.panel });
}, 5(e, t) {
  return e.panelId === t.panelId ? e : E(v({}, e), { panelId: t.panelId });
} };
class Hs extends bi {
  constructor(t) {
    super(t), Tl(this, "actions", { close: () => this.send({ type: 1 }), refocusableClose: (n) => {
      this.actions.close();
      let r = n ? De(n) ? n : "current" in n && De(n.current) ? n.current : this.state.button : this.state.button;
      r == null || r.focus();
    }, open: () => this.send({ type: 0 }), setButtonId: (n) => this.send({ type: 3, buttonId: n }), setButton: (n) => this.send({ type: 2, button: n }), setPanelId: (n) => this.send({ type: 5, panelId: n }), setPanel: (n) => this.send({ type: 4, panel: n }) }), Tl(this, "selectors", { isPortalled: (n) => {
      var r;
      if (!n.button || !n.panel) return !1;
      let i = (r = Mt(n.button)) != null ? r : document;
      for (let f of i.querySelectorAll("body > *")) if (Number(f == null ? void 0 : f.contains(n.button)) ^ Number(f == null ? void 0 : f.contains(n.panel))) return !0;
      let o = dr(i), s = o.indexOf(n.button), a = (s + o.length - 1) % o.length, l = (s + 1) % o.length, u = o[a], c = o[l];
      return !n.panel.contains(u) && !n.panel.contains(c);
    } });
    {
      let n = this.state.id, r = un.get(null);
      this.on(0, () => r.actions.push(n)), this.on(1, () => r.actions.pop(n));
    }
  }
  static new({ id: t, __demoMode: n = !1 }) {
    return new Hs({ id: t, __demoMode: n, popoverState: n ? 0 : 1, buttons: { current: [] }, button: null, buttonId: null, panel: null, panelId: null, beforePanelSentinel: { current: null }, afterPanelSentinel: { current: null }, afterButtonSentinel: { current: null } });
  }
  reduce(t, n) {
    return me(n.type, kb, t, n);
  }
}
const Nd = pe(null);
function Bi(e) {
  let t = ee(Nd);
  if (t === null) {
    let n = new Error(`<${e} /> is missing a parent <Popover /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(n, Bi), n;
  }
  return t;
}
function Cb({ id: e, __demoMode: t = !1 }) {
  let n = se(() => Hs.new({ id: e, __demoMode: t }), []);
  return gr(() => n.dispose()), n;
}
let Us = pe(null);
Us.displayName = "PopoverGroupContext";
function Vd() {
  return ee(Us);
}
let ji = pe(null);
ji.displayName = "PopoverPanelContext";
function Ob() {
  return ee(ji);
}
let $b = "div";
function Ab(e, t) {
  var n;
  let r = ye(), H = e, { __demoMode: i = !1 } = H, o = k(H, ["__demoMode"]), s = Cb({ id: r, __demoMode: i }), a = z(null), l = ve(t, ys((G) => {
    a.current = G;
  })), [u, c, f, h, d] = ue(s, re((G) => [G.popoverState, G.button, G.panel, G.buttonId, G.panelId], [])), p = Vm((n = a.current) != null ? n : c), m = je(h), g = je(d), y = se(() => ({ buttonId: m, panelId: g, close: s.actions.close }), [m, g, s]), w = Vd(), b = w == null ? void 0 : w.registerPopover, T = L(() => {
    var G, D;
    let U = _t((G = a.current) != null ? G : c);
    return (D = w == null ? void 0 : w.isFocusWithinPopoverGroup()) != null ? D : U && ((c == null ? void 0 : c.contains(U)) || (f == null ? void 0 : f.contains(U)));
  });
  be(() => b == null ? void 0 : b(y), [b, y]);
  let [P, C] = td(), A = Is(c), $ = hd({ mainTreeNode: A, portals: P, defaultContainers: [{ get current() {
    return s.state.button;
  } }, { get current() {
    return s.state.panel;
  } }] });
  Ei(p, "focus", (G) => {
    var D, U, K, Q, Z, X;
    G.target !== window && qe(G.target) && s.state.popoverState === $e.Open && (T() || s.state.button && s.state.panel && ($.contains(G.target) || (U = (D = s.state.beforePanelSentinel.current) == null ? void 0 : D.contains) != null && U.call(D, G.target) || (Q = (K = s.state.afterPanelSentinel.current) == null ? void 0 : K.contains) != null && Q.call(K, G.target) || (X = (Z = s.state.afterButtonSentinel.current) == null ? void 0 : Z.contains) != null && X.call(Z, G.target) || s.actions.close()));
  }, !0);
  let F = u === $e.Open;
  wi(F, $.resolveContainers, (G, D) => {
    s.actions.close(), Ts(D, xi.Loose) || (G.preventDefault(), c == null || c.focus());
  });
  let R = ge({ open: u === $e.Open, close: s.actions.refocusableClose }), M = ue(s, re((G) => me(G.popoverState, { [$e.Open]: we.Open, [$e.Closed]: we.Closed }), [])), W = { ref: l }, N = ae();
  return O.createElement(Qr, { node: A }, O.createElement(Ds, null, O.createElement(ji.Provider, { value: null }, O.createElement(Nd.Provider, { value: s }, O.createElement(vi, { value: s.actions.refocusableClose }, O.createElement(mr, { value: M }, O.createElement(C, null, N({ ourProps: W, theirProps: o, slot: R, defaultTag: $b, name: "Popover" }))))))));
}
let Mb = "button";
function Rb(e, t) {
  let n = ye(), V = e, { id: r = `headlessui-popover-button-${n}`, disabled: i = !1, autoFocus: o = !1 } = V, s = k(V, ["id", "disabled", "autoFocus"]), a = Bi("Popover.Button"), [l, u, c, f, h, d, p] = ue(a, re((B) => [B.popoverState, a.selectors.isPortalled(B), B.button, B.buttonId, B.panel, B.panelId, B.afterButtonSentinel], [])), m = z(null), g = `headlessui-focus-sentinel-${ye()}`, y = Vd(), w = y == null ? void 0 : y.closeOthers, b = Ob() !== null;
  be(() => {
    if (!b) return a.actions.setButtonId(r), () => a.actions.setButtonId(null);
  }, [b, r, a]);
  let [T] = ne(() => Symbol()), P = ve(m, t, As(), L((B) => {
    if (!b) {
      if (B) a.state.buttons.current.push(T);
      else {
        let te = a.state.buttons.current.indexOf(T);
        te !== -1 && a.state.buttons.current.splice(te, 1);
      }
      a.state.buttons.current.length > 1 && console.warn("You are already using a <Popover.Button /> but only 1 <Popover.Button /> is supported."), B && a.actions.setButton(B);
    }
  })), C = ve(m, t), A = L((B) => {
    var te, j, le;
    if (b) {
      if (a.state.popoverState === $e.Closed) return;
      switch (B.key) {
        case J.Space:
        case J.Enter:
          B.preventDefault(), (j = (te = B.target).click) == null || j.call(te), a.actions.close(), (le = a.state.button) == null || le.focus();
          break;
      }
    } else switch (B.key) {
      case J.Space:
      case J.Enter:
        B.preventDefault(), B.stopPropagation(), a.state.popoverState === $e.Closed ? (w == null || w(a.state.buttonId), a.actions.open()) : a.actions.close();
        break;
      case J.Escape:
        if (a.state.popoverState !== $e.Open) return w == null ? void 0 : w(a.state.buttonId);
        if (!m.current) return;
        let oe = _t(m.current);
        if (oe && !m.current.contains(oe)) return;
        B.preventDefault(), B.stopPropagation(), a.actions.close();
        break;
    }
  }), $ = L((B) => {
    b || B.key === J.Space && B.preventDefault();
  }), F = L((B) => {
    var te, j;
    Tn(B.currentTarget) || i || (b ? (a.actions.close(), (te = a.state.button) == null || te.focus()) : (B.preventDefault(), B.stopPropagation(), a.state.popoverState === $e.Closed ? (w == null || w(a.state.buttonId), a.actions.open()) : a.actions.close(), (j = a.state.button) == null || j.focus()));
  }), R = L((B) => {
    B.preventDefault(), B.stopPropagation();
  }), { isFocusVisible: M, focusProps: W } = vt({ autoFocus: o }), { isHovered: N, hoverProps: H } = At({ isDisabled: i }), { pressed: G, pressProps: D } = ln({ disabled: i }), U = l === $e.Open, K = ge({ open: U, active: G || U, disabled: i, hover: N, focus: M, autofocus: o }), Q = fr(e, c), Z = We(b ? { ref: C, type: Q, onKeyDown: A, onClick: F, disabled: i || void 0, autoFocus: o } : { ref: P, id: f, type: Q, "aria-expanded": l === $e.Open, "aria-controls": h ? d : void 0, disabled: i || void 0, autoFocus: o, onKeyDown: A, onKeyUp: $, onClick: F, onMouseDown: R }, W, H, D), X = Ns(), de = L(() => {
    if (!De(a.state.panel)) return;
    let B = a.state.panel;
    function te() {
      me(X.current, { [Ke.Forwards]: () => Me(B, xe.First), [Ke.Backwards]: () => Me(B, xe.Last) }) === ut.Error && Me(dr(zt(a.state.button)).filter((j) => j.dataset.headlessuiFocusGuard !== "true"), me(X.current, { [Ke.Forwards]: xe.Next, [Ke.Backwards]: xe.Previous }), { relativeTo: a.state.button });
    }
    te();
  }), I = ae();
  return O.createElement(O.Fragment, null, I({ ourProps: Z, theirProps: s, slot: K, defaultTag: Mb, name: "Popover.Button" }), U && !b && u && O.createElement(it, { id: g, ref: p, features: rt.Focusable, "data-headlessui-focus-guard": !0, as: "button", type: "button", onFocus: de }));
}
let Db = "div", Lb = Be.RenderStrategy | Be.Static;
function Bd(e, t) {
  let n = ye(), y = e, { id: r = `headlessui-popover-backdrop-${n}`, transition: i = !1 } = y, o = k(y, ["id", "transition"]), s = Bi("Popover.Backdrop"), a = ue(s, re((w) => w.popoverState, [])), [l, u] = ne(null), c = ve(t, u), f = Dt(), [h, d] = $n(i, l, f !== null ? (f & we.Open) === we.Open : a === $e.Open), p = L((w) => {
    if (Tn(w.currentTarget)) return w.preventDefault();
    s.actions.close();
  }), m = ge({ open: a === $e.Open }), g = v({ ref: c, id: r, "aria-hidden": !0, onClick: p }, On(d));
  return ae()({ ourProps: g, theirProps: o, slot: m, defaultTag: Db, features: Lb, visible: h, name: "Popover.Backdrop" });
}
let Fb = "div", Ib = Be.RenderStrategy | Be.Static;
function Nb(e, t) {
  let n = ye(), I = e, { id: r = `headlessui-popover-panel-${n}`, focus: i = !1, anchor: o, portal: s = !1, modal: a = !1, transition: l = !1 } = I, u = k(I, ["id", "focus", "anchor", "portal", "modal", "transition"]), c = Bi("Popover.Panel"), f = ue(c, c.selectors.isPortalled), [h, d, p, m, g] = ue(c, re((V) => [V.popoverState, V.button, V.__demoMode, V.beforePanelSentinel, V.afterPanelSentinel], [])), y = `headlessui-focus-sentinel-before-${n}`, w = `headlessui-focus-sentinel-after-${n}`, b = z(null), T = $s(o), [P, C] = Rs(T), A = Ms();
  T && (s = !0);
  let [$, F] = ne(null), R = ve(b, t, T ? P : null, c.actions.setPanel, F), M = kt(d), W = kt(b.current);
  he(() => (c.actions.setPanelId(r), () => c.actions.setPanelId(null)), [r, c]);
  let N = Dt(), [H, G] = $n(l, $, N !== null ? (N & we.Open) === we.Open : h === $e.Open);
  yi(H, d, c.actions.close), Si(p ? !1 : a && H, W);
  let D = L((V) => {
    var B;
    switch (V.key) {
      case J.Escape:
        if (c.state.popoverState !== $e.Open || !b.current) return;
        let te = _t(b.current);
        if (te && !b.current.contains(te)) return;
        V.preventDefault(), V.stopPropagation(), c.actions.close(), (B = c.state.button) == null || B.focus();
        break;
    }
  });
  be(() => {
    var V;
    e.static || h === $e.Closed && ((V = e.unmount) == null || V) && c.actions.setPanel(null);
  }, [h, e.unmount, e.static, c]), be(() => {
    if (p || !i || h !== $e.Open || !b.current) return;
    let V = _t(b.current);
    b.current.contains(V) || Me(b.current, xe.First);
  }, [p, i, b.current, h]);
  let U = ge({ open: h === $e.Open, close: c.actions.refocusableClose }), K = We(T ? A() : {}, v({ ref: R, id: r, onKeyDown: D, onBlur: i && h === $e.Open ? (V) => {
    var B, te, j, le, oe;
    let Se = V.relatedTarget;
    Se && b.current && ((B = b.current) != null && B.contains(Se) || (c.actions.close(), ((j = (te = m.current) == null ? void 0 : te.contains) != null && j.call(te, Se) || (oe = (le = g.current) == null ? void 0 : le.contains) != null && oe.call(le, Se)) && Se.focus({ preventScroll: !0 })));
  } : void 0, tabIndex: -1, style: E(v(v({}, u.style), C), { "--button-width": Kr(H, d, !0).width }) }, On(G))), Q = Ns(), Z = L(() => {
    let V = b.current;
    if (!V) return;
    function B() {
      me(Q.current, { [Ke.Forwards]: () => {
        var te;
        Me(V, xe.First) === ut.Error && ((te = c.state.afterPanelSentinel.current) == null || te.focus());
      }, [Ke.Backwards]: () => {
        var te;
        (te = c.state.button) == null || te.focus({ preventScroll: !0 });
      } });
    }
    B();
  }), X = L(() => {
    let V = b.current;
    if (!V) return;
    function B() {
      me(Q.current, { [Ke.Forwards]: () => {
        var te;
        if (!c.state.button) return;
        let j = (te = zt(c.state.button)) != null ? te : document.body, le = dr(j), oe = le.indexOf(c.state.button), Se = le.slice(0, oe + 1), Xt = [...le.slice(oe + 1), ...Se];
        for (let Ce of Xt.slice()) if (Ce.dataset.headlessuiFocusGuard === "true" || $ != null && $.contains(Ce)) {
          let $a = Xt.indexOf(Ce);
          $a !== -1 && Xt.splice($a, 1);
        }
        Me(Xt, xe.First, { sorted: !1 });
      }, [Ke.Backwards]: () => {
        var te;
        Me(V, xe.Previous) === ut.Error && ((te = c.state.button) == null || te.focus());
      } });
    }
    B();
  }), de = ae();
  return O.createElement(Ls, null, O.createElement(ji.Provider, { value: r }, O.createElement(vi, { value: c.actions.refocusableClose }, O.createElement(Ai, { enabled: s ? e.static || H : !1, ownerDocument: M }, H && f && O.createElement(it, { id: y, ref: m, features: rt.Focusable, "data-headlessui-focus-guard": !0, as: "button", type: "button", onFocus: Z }), de({ ourProps: K, theirProps: u, slot: U, defaultTag: Fb, features: Ib, visible: H, name: "Popover.Panel" }), H && f && O.createElement(it, { id: w, ref: g, features: rt.Focusable, "data-headlessui-focus-guard": !0, as: "button", type: "button", onFocus: X })))));
}
let Vb = "div";
function Bb(e, t) {
  let n = z(null), r = ve(n, t), [i, o] = ne([]), s = L((m) => {
    o((g) => {
      let y = g.indexOf(m);
      if (y !== -1) {
        let w = g.slice();
        return w.splice(y, 1), w;
      }
      return g;
    });
  }), a = L((m) => (o((g) => [...g, m]), () => s(m))), l = L(() => {
    var m;
    let g = zt(n.current);
    if (!g) return !1;
    let y = _t(n.current);
    return (m = n.current) != null && m.contains(y) ? !0 : i.some((w) => {
      var b, T;
      return ((b = g.getElementById(w.buttonId.current)) == null ? void 0 : b.contains(y)) || ((T = g.getElementById(w.panelId.current)) == null ? void 0 : T.contains(y));
    });
  }), u = L((m) => {
    for (let g of i) g.buttonId.current !== m && g.close();
  }), c = se(() => ({ registerPopover: a, unregisterPopover: s, isFocusWithinPopoverGroup: l, closeOthers: u }), [a, s, l, u]), f = ge({}), h = e, d = { ref: r }, p = ae();
  return O.createElement(Qr, null, O.createElement(Us.Provider, { value: c }, p({ ourProps: d, theirProps: h, slot: f, defaultTag: Vb, name: "Popover.Group" })));
}
let jb = ie(Ab), Ks = ie(Rb), zb = ie(Bd), _b = ie(Bd), Gs = ie(Nb), Wb = ie(Bb), jd = Object.assign(jb, { Button: Ks, Backdrop: _b, Overlay: zb, Panel: Gs, Group: Wb });
function Hb({ onFocus: e }) {
  let [t, n] = ne(!0), r = Ri();
  return t ? O.createElement(it, { as: "button", type: "button", features: rt.Focusable, onFocus: (i) => {
    i.preventDefault();
    let o, s = 50;
    function a() {
      if (s-- <= 0) {
        o && cancelAnimationFrame(o);
        return;
      }
      if (e()) {
        if (cancelAnimationFrame(o), !r.current) return;
        n(!1);
        return;
      }
      o = requestAnimationFrame(a);
    }
    o = requestAnimationFrame(a);
  } }) : null;
}
const zd = S.createContext(null);
function Ub() {
  return { groups: /* @__PURE__ */ new Map(), get(e, t) {
    var n;
    let r = this.groups.get(e);
    r || (r = /* @__PURE__ */ new Map(), this.groups.set(e, r));
    let i = (n = r.get(t)) != null ? n : 0;
    r.set(t, i + 1);
    let o = Array.from(r.keys()).indexOf(t);
    function s() {
      let a = r.get(t);
      a > 1 ? r.set(t, a - 1) : r.delete(t);
    }
    return [o, s];
  } };
}
function Kb({ children: e }) {
  let t = S.useRef(Ub());
  return S.createElement(zd.Provider, { value: t }, e);
}
function _d(e) {
  let t = S.useContext(zd);
  if (!t) throw new Error("You must wrap your component in a <StableCollection>");
  let n = S.useId(), [r, i] = t.current.get(e, n);
  return S.useEffect(() => i, []), r;
}
var Gb = ((e) => (e[e.Forwards = 0] = "Forwards", e[e.Backwards = 1] = "Backwards", e))(Gb || {}), Yb = ((e) => (e[e.Less = -1] = "Less", e[e.Equal = 0] = "Equal", e[e.Greater = 1] = "Greater", e))(Yb || {}), Xb = ((e) => (e[e.SetSelectedIndex = 0] = "SetSelectedIndex", e[e.RegisterTab = 1] = "RegisterTab", e[e.UnregisterTab = 2] = "UnregisterTab", e[e.RegisterPanel = 3] = "RegisterPanel", e[e.UnregisterPanel = 4] = "UnregisterPanel", e))(Xb || {});
let qb = { 0(e, t) {
  var n;
  let r = Vt(e.tabs, (c) => c.current), i = Vt(e.panels, (c) => c.current), o = r.filter((c) => {
    var f;
    return !((f = c.current) != null && f.hasAttribute("disabled"));
  }), s = E(v({}, e), { tabs: r, panels: i });
  if (t.index < 0 || t.index > r.length - 1) {
    let c = me(Math.sign(t.index - e.selectedIndex), { [-1]: () => 1, 0: () => me(Math.sign(t.index), { [-1]: () => 0, 0: () => 0, 1: () => 1 }), 1: () => 0 });
    if (o.length === 0) return s;
    let f = me(c, { 0: () => r.indexOf(o[0]), 1: () => r.indexOf(o[o.length - 1]) });
    return E(v({}, s), { selectedIndex: f === -1 ? e.selectedIndex : f });
  }
  let a = r.slice(0, t.index), l = [...r.slice(t.index), ...a].find((c) => o.includes(c));
  if (!l) return s;
  let u = (n = r.indexOf(l)) != null ? n : e.selectedIndex;
  return u === -1 && (u = e.selectedIndex), E(v({}, s), { selectedIndex: u });
}, 1(e, t) {
  if (e.tabs.includes(t.tab)) return e;
  let n = e.tabs[e.selectedIndex], r = Vt([...e.tabs, t.tab], (o) => o.current), i = e.selectedIndex;
  return e.info.current.isControlled || (i = r.indexOf(n), i === -1 && (i = e.selectedIndex)), E(v({}, e), { tabs: r, selectedIndex: i });
}, 2(e, t) {
  return E(v({}, e), { tabs: e.tabs.filter((n) => n !== t.tab) });
}, 3(e, t) {
  return e.panels.includes(t.panel) ? e : E(v({}, e), { panels: Vt([...e.panels, t.panel], (n) => n.current) });
}, 4(e, t) {
  return E(v({}, e), { panels: e.panels.filter((n) => n !== t.panel) });
} }, Ys = pe(null);
Ys.displayName = "TabsDataContext";
function kn(e) {
  let t = ee(Ys);
  if (t === null) {
    let n = new Error(`<${e} /> is missing a parent <Tab.Group /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(n, kn), n;
  }
  return t;
}
let Xs = pe(null);
Xs.displayName = "TabsActionsContext";
function qs(e) {
  let t = ee(Xs);
  if (t === null) {
    let n = new Error(`<${e} /> is missing a parent <Tab.Group /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(n, qs), n;
  }
  return t;
}
function Zb(e, t) {
  return me(t.type, qb, e, t);
}
let Qb = "div";
function Jb(e, t) {
  let R = e, { defaultIndex: n = 0, vertical: r = !1, manual: i = !1, onChange: o, selectedIndex: s = null } = R, a = k(R, ["defaultIndex", "vertical", "manual", "onChange", "selectedIndex"]);
  const l = r ? "vertical" : "horizontal", u = i ? "manual" : "auto";
  let c = s !== null, f = je({ isControlled: c }), h = ve(t), [d, p] = us(Zb, { info: f, selectedIndex: s != null ? s : n, tabs: [], panels: [] }), m = ge({ selectedIndex: d.selectedIndex }), g = je(o || (() => {
  })), y = je(d.tabs), w = se(() => v({ orientation: l, activation: u }, d), [l, u, d]), b = L((M) => (p({ type: 1, tab: M }), () => p({ type: 2, tab: M }))), T = L((M) => (p({ type: 3, panel: M }), () => p({ type: 4, panel: M }))), P = L((M) => {
    C.current !== M && g.current(M), c || p({ type: 0, index: M });
  }), C = je(c ? e.selectedIndex : d.selectedIndex), A = se(() => ({ registerTab: b, registerPanel: T, change: P }), []);
  he(() => {
    p({ type: 0, index: s != null ? s : n });
  }, [s]), he(() => {
    if (C.current === void 0 || d.tabs.length <= 0) return;
    let M = Vt(d.tabs, (W) => W.current);
    M.some((W, N) => d.tabs[N] !== W) && P(M.indexOf(d.tabs[C.current]));
  });
  let $ = { ref: h }, F = ae();
  return O.createElement(Kb, null, O.createElement(Xs.Provider, { value: A }, O.createElement(Ys.Provider, { value: w }, w.tabs.length <= 0 && O.createElement(Hb, { onFocus: () => {
    var M, W;
    for (let N of y.current) if (((M = N.current) == null ? void 0 : M.tabIndex) === 0) return (W = N.current) == null || W.focus(), !0;
    return !1;
  } }), F({ ourProps: $, theirProps: a, slot: m, defaultTag: Qb, name: "Tabs" }))));
}
let ey = "div";
function ty(e, t) {
  let { orientation: n, selectedIndex: r } = kn("Tab.List"), i = ve(t), o = ge({ selectedIndex: r }), s = e, a = { ref: i, role: "tablist", "aria-orientation": n };
  return ae()({ ourProps: a, theirProps: s, slot: o, defaultTag: ey, name: "Tabs.List" });
}
let ny = "button";
function ry(e, t) {
  var n, r;
  let i = ye(), Z = e, { id: o = `headlessui-tabs-tab-${i}`, disabled: s = !1, autoFocus: a = !1 } = Z, l = k(Z, ["id", "disabled", "autoFocus"]), { orientation: u, activation: c, selectedIndex: f, tabs: h, panels: d } = kn("Tab"), p = qs("Tab"), m = kn("Tab"), [g, y] = ne(null), w = z(null), b = ve(w, t, y);
  he(() => p.registerTab(w), [p, w]);
  let T = _d("tabs"), P = h.indexOf(w);
  P === -1 && (P = T);
  let C = P === f, A = L((X) => {
    let de = X();
    if (de === ut.Success && c === "auto") {
      let I = _t(w.current), V = m.tabs.findIndex((B) => B.current === I);
      V !== -1 && p.change(V);
    }
    return de;
  }), $ = L((X) => {
    let de = h.map((I) => I.current).filter(Boolean);
    if (X.key === J.Space || X.key === J.Enter) {
      X.preventDefault(), X.stopPropagation(), p.change(P);
      return;
    }
    switch (X.key) {
      case J.Home:
      case J.PageUp:
        return X.preventDefault(), X.stopPropagation(), A(() => Me(de, xe.First));
      case J.End:
      case J.PageDown:
        return X.preventDefault(), X.stopPropagation(), A(() => Me(de, xe.Last));
    }
    if (A(() => me(u, { vertical() {
      return X.key === J.ArrowUp ? Me(de, xe.Previous | xe.WrapAround) : X.key === J.ArrowDown ? Me(de, xe.Next | xe.WrapAround) : ut.Error;
    }, horizontal() {
      return X.key === J.ArrowLeft ? Me(de, xe.Previous | xe.WrapAround) : X.key === J.ArrowRight ? Me(de, xe.Next | xe.WrapAround) : ut.Error;
    } })) === ut.Success) return X.preventDefault();
  }), F = z(!1), R = L(() => {
    var X;
    F.current || (F.current = !0, (X = w.current) == null || X.focus({ preventScroll: !0 }), p.change(P), lr(() => {
      F.current = !1;
    }));
  }), M = L((X) => {
    X.preventDefault();
  }), { isFocusVisible: W, focusProps: N } = vt({ autoFocus: a }), { isHovered: H, hoverProps: G } = At({ isDisabled: s }), { pressed: D, pressProps: U } = ln({ disabled: s }), K = ge({ selected: C, hover: H, active: D, focus: W, autofocus: a, disabled: s }), Q = We({ ref: b, onKeyDown: $, onMouseDown: M, onClick: R, id: o, role: "tab", type: fr(e, g), "aria-controls": (r = (n = d[P]) == null ? void 0 : n.current) == null ? void 0 : r.id, "aria-selected": C, tabIndex: C ? 0 : -1, disabled: s || void 0, autoFocus: a }, N, G, U);
  return ae()({ ourProps: Q, theirProps: l, slot: K, defaultTag: ny, name: "Tabs.Tab" });
}
let iy = "div";
function oy(e, t) {
  let { selectedIndex: n } = kn("Tab.Panels"), r = ve(t), i = ge({ selectedIndex: n }), o = e, s = { ref: r };
  return ae()({ ourProps: s, theirProps: o, slot: i, defaultTag: iy, name: "Tabs.Panels" });
}
let sy = "div", ay = Be.RenderStrategy | Be.Static;
function ly(e, t) {
  var n, r, i, o;
  let s = ye(), $ = e, { id: a = `headlessui-tabs-panel-${s}`, tabIndex: l = 0 } = $, u = k($, ["id", "tabIndex"]), { selectedIndex: c, tabs: f, panels: h } = kn("Tab.Panel"), d = qs("Tab.Panel"), p = z(null), m = ve(p, t);
  he(() => d.registerPanel(p), [d, p]);
  let g = _d("panels"), y = h.indexOf(p);
  y === -1 && (y = g);
  let w = y === c, { isFocusVisible: b, focusProps: T } = vt(), P = ge({ selected: w, focus: b }), C = We({ ref: m, id: a, role: "tabpanel", "aria-labelledby": (r = (n = f[y]) == null ? void 0 : n.current) == null ? void 0 : r.id, tabIndex: w ? l : -1 }, T), A = ae();
  return !w && ((i = u.unmount) == null || i) && !((o = u.static) != null && o) ? O.createElement(it, v({ "aria-hidden": "true" }, C)) : A({ ourProps: C, theirProps: u, slot: P, defaultTag: sy, features: ay, visible: w, name: "Tabs.Panel" });
}
let cy = ie(ry), Wd = ie(Jb), Hd = ie(ty), Ud = ie(oy), Kd = ie(ly), uy = Object.assign(cy, { Group: Wd, List: Hd, Panels: Ud, Panel: Kd });
const dy = {
  primary: "bg-button-primary-background hover:bg-button-primary-background-hover text-button-primary-text data-[disabled]:bg-button-primary-background-disabled data-[disabled]:text-button-primary-text-disabled",
  secondary: "bg-button-secondary-background hover:bg-button-secondary-background-hover text-button-secondary-text border border-button-secondary-border",
  outline: "bg-button-outline-background hover:bg-button-outline-background-hover text-button-outline-text border border-button-outline-border hover:border-button-outline-border-hover",
  ghost: "bg-button-ghost-background hover:bg-button-ghost-background-hover text-button-ghost-text",
  destructive: "bg-button-destructive-background hover:bg-button-destructive-background-hover text-button-destructive-text"
};
function fy(r) {
  var i = r, { variant: e = "primary", className: t } = i, n = k(i, ["variant", "className"]);
  return /* @__PURE__ */ x(
    Ip,
    v({
      className: Re(
        // Base styles
        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold shadow-sm transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
        "disabled:cursor-not-allowed disabled:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        dy[e],
        t
      )
    }, n)
  );
}
const hy = {
  default: "bg-badge-default-background text-badge-default-text",
  success: "bg-badge-success-background text-badge-success-text border border-badge-success-border",
  warning: "bg-badge-warning-background text-badge-warning-text border border-badge-warning-border",
  error: "bg-badge-error-background text-badge-error-text border border-badge-error-border",
  outline: "bg-badge-outline-background text-badge-outline-text border border-badge-outline-border"
};
function py(r) {
  var i = r, { variant: e = "default", className: t } = i, n = k(i, ["variant", "className"]);
  return /* @__PURE__ */ x(
    "span",
    v({
      className: Re(
        "inline-flex items-center justify-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ring-transparent",
        hy[e],
        t
      )
    }, n)
  );
}
function OE(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x(
    "div",
    v({
      className: Re(
        "bg-card-background border border-card-border rounded-[var(--card-border-radius)] shadow-[var(--card-shadow)]",
        "p-[var(--card-padding)]",
        e
      )
    }, t)
  );
}
function $E(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x(
    eb,
    v({
      className: Re(
        "block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
        // Use our tokens override
        "bg-input-background text-input-text placeholder:text-input-placeholder",
        "ring-input-border focus:ring-input-border-focus",
        "disabled:cursor-not-allowed disabled:bg-input-background-disabled disabled:text-gray-500 disabled:ring-gray-200",
        e
      )
    }, t)
  );
}
function AE(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x(
    "div",
    E(v({
      "data-slot": "control"
    }, t), {
      className: Y(
        e,
        "space-y-3"
      )
    })
  );
}
function ME(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x(
    Cd,
    E(v({
      "data-slot": "field"
    }, t), {
      className: Y(
        e,
        "flex items-center gap-3"
      )
    })
  );
}
function RE(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x(
    rm,
    E(v({
      "data-slot": "control"
    }, t), {
      className: Y(
        e,
        "group flex h-5 w-5 items-center justify-center rounded border border-zinc-200 bg-white ring-offset-zinc-950 dark:border-zinc-800 dark:bg-zinc-900",
        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-blue-500",
        "data-[checked]:bg-blue-500 data-[checked]:border-blue-500",
        "data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed"
      ),
      children: /* @__PURE__ */ x(
        "svg",
        {
          className: "h-3.5 w-3.5 stroke-white opacity-0 group-data-[checked]:opacity-100",
          viewBox: "0 0 14 14",
          fill: "none",
          children: /* @__PURE__ */ x(
            "path",
            {
              d: "M3 8L6 11L11 3.5",
              strokeWidth: 2,
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          )
        }
      )
    })
  );
}
function DE(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x(
    Zv,
    E(v({}, t), {
      className: Y(e, "[&>*+[data-slot=control]]:mt-6 [&>[data-slot=text]]:mt-1")
    })
  );
}
function LE(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x(
    nb,
    E(v({
      "data-slot": "legend"
    }, t), {
      className: Y(
        e,
        "text-base/6 font-semibold text-zinc-950 data-[disabled]:opacity-50 sm:text-sm/6 dark:text-white"
      )
    })
  );
}
function FE(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x("div", E(v({ "data-slot": "control" }, t), { className: Y(e, "space-y-8") }));
}
function IE(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x(
    Cd,
    E(v({}, t), {
      className: Y(
        e,
        "[&>[data-slot=label]+[data-slot=control]]:mt-3",
        "[&>[data-slot=label]+[data-slot=description]]:mt-1",
        "[&>[data-slot=description]+[data-slot=control]]:mt-3",
        "[&>[data-slot=control]+[data-slot=description]]:mt-3",
        "[&>[data-slot=control]+[data-slot=error]]:mt-3",
        "[&>[data-slot=label]]:font-medium"
      )
    })
  );
}
function NE(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x(
    gi,
    E(v({
      "data-slot": "label"
    }, t), {
      className: Y(
        e,
        "select-none text-base/6 text-zinc-950 data-[disabled]:opacity-50 sm:text-sm/6 dark:text-white"
      )
    })
  );
}
function VE(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x(
    xs,
    E(v({
      "data-slot": "description"
    }, t), {
      className: Y(
        e,
        "text-base/6 text-zinc-500 data-[disabled]:opacity-50 sm:text-sm/6 dark:text-zinc-400"
      )
    })
  );
}
function BE(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x(
    xs,
    E(v({
      "data-slot": "error"
    }, t), {
      className: Y(
        e,
        "text-base/6 text-red-600 data-[disabled]:opacity-50 sm:text-sm/6 dark:text-red-500"
      )
    })
  );
}
function jE(s) {
  var a = s, {
    className: e,
    placeholder: t,
    autoFocus: n,
    "aria-label": r,
    children: i
  } = a, o = k(a, [
    "className",
    "placeholder",
    "autoFocus",
    "aria-label",
    "children"
  ]);
  return /* @__PURE__ */ _(Eb, E(v({}, o), { multiple: !1, children: [
    /* @__PURE__ */ _(
      Dd,
      {
        autoFocus: n,
        "data-slot": "control",
        "aria-label": r,
        className: Y(
          e,
          "group relative block w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-1.5 pr-8 pl-3 text-left text-sm/6 text-zinc-950 dark:text-white",
          "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-blue-500/25",
          "data-[disabled]:opacity-50",
          "hover:border-zinc-300 dark:hover:border-zinc-700"
        ),
        children: [
          /* @__PURE__ */ x(
            Id,
            {
              as: ke,
              placeholder: t && /* @__PURE__ */ x("span", { className: "block truncate text-zinc-500 dark:text-zinc-400", children: t }),
              children: ({ selectedOption: l }) => l ? /* @__PURE__ */ x("span", { className: "block truncate", children: l.props.children }) : t && /* @__PURE__ */ x("span", { className: "block truncate text-zinc-500 dark:text-zinc-400", children: t })
            }
          ),
          /* @__PURE__ */ x("span", { className: "pointer-events-none absolute top-2.5 right-2.5 size-4", children: /* @__PURE__ */ x(Zc, { className: "size-4 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300" }) })
        ]
      }
    ),
    /* @__PURE__ */ x(
      Ld,
      {
        transition: !0,
        anchor: "bottom start",
        className: Y(
          "w-[var(--button-width)] rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none",
          "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0",
          "z-50 shadow-lg"
        ),
        children: i
      }
    )
  ] }));
}
function zE(r) {
  var i = r, {
    children: e,
    className: t
  } = i, n = k(i, [
    "children",
    "className"
  ]);
  return /* @__PURE__ */ x(
    Fd,
    E(v({
      as: ke
    }, n), {
      children: ({ selected: o, focus: s, disabled: a }) => /* @__PURE__ */ _(
        "div",
        {
          className: Y(
            t,
            "group flex cursor-default items-center gap-2 rounded-lg py-1.5 pr-3 pl-3 select-none",
            s && "bg-zinc-100 dark:bg-zinc-800",
            a && "opacity-50 cursor-not-allowed",
            "text-zinc-900 dark:text-white"
          ),
          children: [
            /* @__PURE__ */ x(fs, { className: Y("invisible size-4 text-zinc-900 dark:text-white", o && "visible") }),
            /* @__PURE__ */ x("div", { className: "grid gap-0.5", children: e })
          ]
        }
      )
    })
  );
}
function _E(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x("span", v({ className: Y(e, "block truncate font-medium") }, t));
}
function WE(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x(
    "span",
    v({
      className: Y(
        e,
        "block truncate text-xs/5 text-zinc-500 group-data-[focus]:text-zinc-600 dark:text-zinc-400 dark:group-data-[focus]:text-zinc-300"
      )
    }, t)
  );
}
function HE(f) {
  var h = f, {
    className: e,
    placeholder: t,
    autoFocus: n,
    "aria-label": r,
    children: i,
    value: o,
    onChange: s,
    onClose: a,
    multiple: l = !1,
    displayValue: u
  } = h, c = k(h, [
    "className",
    "placeholder",
    "autoFocus",
    "aria-label",
    "children",
    "value",
    "onChange",
    "onClose",
    "multiple",
    "displayValue"
  ]);
  return /* @__PURE__ */ x(
    J0,
    E(v({}, c), {
      value: o,
      onChange: s,
      onClose: a,
      multiple: l,
      children: /* @__PURE__ */ _("div", { className: "relative", children: [
        /* @__PURE__ */ _("div", { className: Y(
          e,
          "group relative block w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-left text-sm/6 text-zinc-950 dark:text-white",
          "focus-within:outline-none focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-500/25",
          "hover:border-zinc-300 dark:hover:border-zinc-700"
        ), children: [
          /* @__PURE__ */ x(
            ud,
            {
              className: "w-full border-none bg-transparent py-1.5 pl-3 pr-8 text-sm/6 text-zinc-950 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400 focus:ring-0",
              displayValue: u,
              placeholder: t,
              autoFocus: n,
              "aria-label": r
            }
          ),
          /* @__PURE__ */ x(cd, { className: "absolute inset-y-0 right-0 flex items-center pr-2", children: /* @__PURE__ */ x(Zc, { className: "size-4 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300" }) })
        ] }),
        /* @__PURE__ */ x(
          dd,
          {
            transition: !0,
            anchor: "bottom start",
            className: Y(
              "w-[var(--input-width)] rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none",
              "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0",
              "z-50 shadow-lg empty:hidden"
            ),
            children: i
          }
        )
      ] })
    })
  );
}
function UE(i) {
  var o = i, {
    children: e,
    className: t,
    value: n
  } = o, r = k(o, [
    "children",
    "className",
    "value"
  ]);
  return /* @__PURE__ */ x(
    fd,
    E(v({
      as: ke,
      value: n
    }, r), {
      children: ({ selected: s, focus: a, disabled: l }) => /* @__PURE__ */ _(
        "div",
        {
          className: Y(
            t,
            "group flex cursor-default items-center gap-2 rounded-lg py-1.5 pr-3 pl-3 select-none",
            a && "bg-zinc-100 dark:bg-zinc-800",
            l && "opacity-50 cursor-not-allowed",
            "text-zinc-900 dark:text-white"
          ),
          children: [
            /* @__PURE__ */ x(fs, { className: Y("invisible size-4 text-zinc-900 dark:text-white", s && "visible") }),
            /* @__PURE__ */ x("div", { className: "grid gap-0.5", children: e })
          ]
        }
      )
    })
  );
}
function KE(n) {
  var r = n, {
    className: e
  } = r, t = k(r, [
    "className"
  ]);
  return /* @__PURE__ */ x(Kv, v({ as: "div", className: Y(e, "w-full") }, t));
}
function GE(r) {
  var i = r, {
    className: e,
    children: t
  } = i, n = k(i, [
    "className",
    "children"
  ]);
  return /* @__PURE__ */ x(
    Pd,
    E(v({
      "data-slot": "button",
      className: Y(
        e,
        "group flex w-full items-center justify-between py-2 text-left text-sm/6 font-medium text-zinc-900 dark:text-white",
        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-blue-500",
        "hover:text-zinc-700 dark:hover:text-zinc-300"
      )
    }, n), {
      children: /* @__PURE__ */ _("span", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ x(Xh, { className: "size-4 text-zinc-500 group-data-[open]:rotate-90 group-data-[hover]:text-zinc-700 dark:text-zinc-400 dark:group-data-[hover]:text-zinc-300 transition-transform duration-200" }),
        t
      ] })
    })
  );
}
function YE(n) {
  var r = n, {
    className: e
  } = r, t = k(r, [
    "className"
  ]);
  return /* @__PURE__ */ x(
    kd,
    v({
      "data-slot": "panel",
      className: Y(e, "ml-7 text-sm text-zinc-600 dark:text-zinc-400 pb-3")
    }, t)
  );
}
function my(o) {
  var s = o, {
    className: e,
    children: t,
    open: n,
    onClose: r
  } = s, i = k(s, [
    "className",
    "children",
    "open",
    "onClose"
  ]);
  return /* @__PURE__ */ x(Ii, { show: n, as: ke, children: /* @__PURE__ */ _(Mv, E(v({ className: "relative z-50", onClose: r }, i), { children: [
    /* @__PURE__ */ x(
      tr,
      {
        as: ke,
        enter: "ease-in-out duration-500",
        enterFrom: "opacity-0",
        enterTo: "opacity-100",
        leave: "ease-in-out duration-500",
        leaveFrom: "opacity-100",
        leaveTo: "opacity-0",
        children: /* @__PURE__ */ x("div", { className: "fixed inset-0 bg-zinc-950/25 dark:bg-zinc-950/50 backdrop-blur-sm transition-opacity" })
      }
    ),
    /* @__PURE__ */ x("div", { className: "fixed inset-0 overflow-hidden", children: /* @__PURE__ */ x("div", { className: "absolute inset-0 overflow-hidden", children: /* @__PURE__ */ x("div", { className: "pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10", children: /* @__PURE__ */ x(
      tr,
      {
        as: ke,
        enter: "transform transition ease-in-out duration-500 sm:duration-700",
        enterFrom: "translate-x-full",
        enterTo: "translate-x-0",
        leave: "transform transition ease-in-out duration-500 sm:duration-700",
        leaveFrom: "translate-x-0",
        leaveTo: "translate-x-full",
        children: /* @__PURE__ */ x(
          Ed,
          {
            className: Y(
              e,
              "pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700",
              "flex flex-col bg-white dark:bg-zinc-900 shadow-xl"
            ),
            children: t
          }
        )
      }
    ) }) }) })
  ] })) });
}
function gy(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x(
    Sd,
    E(v({}, t), {
      className: Y(e, "text-base/6 font-semibold text-zinc-900 dark:text-white")
    })
  );
}
function XE(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x(
    "p",
    E(v({}, t), {
      className: Y(e, "text-sm text-zinc-500 dark:text-zinc-400")
    })
  );
}
function vy(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x("div", v({ className: Y(e, "flex-1 overflow-y-auto px-4 py-6 sm:px-6") }, t));
}
function by(i) {
  var o = i, { className: e, children: t, onClose: n } = o, r = k(o, ["className", "children", "onClose"]);
  return /* @__PURE__ */ _("div", E(v({ className: Y(e, "flex items-start justify-between px-4 py-6 sm:px-6 border-b border-zinc-200 dark:border-zinc-800") }, r), { children: [
    /* @__PURE__ */ x("div", { className: "flex flex-col gap-1", children: t }),
    /* @__PURE__ */ x("div", { className: "ml-3 flex h-7 items-center", children: /* @__PURE__ */ _(
      "button",
      {
        type: "button",
        className: "relative rounded-md bg-white dark:bg-zinc-900 text-zinc-400 hover:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        onClick: n,
        children: [
          /* @__PURE__ */ x("span", { className: "absolute -inset-2.5" }),
          /* @__PURE__ */ x("span", { className: "sr-only", children: "Close panel" }),
          /* @__PURE__ */ x(qh, { className: "h-6 w-6", "aria-hidden": "true" })
        ]
      }
    ) })
  ] }));
}
function qE(r) {
  var i = r, { className: e, children: t } = i, n = k(i, ["className", "children"]);
  return /* @__PURE__ */ x(
    "div",
    E(v({}, n), {
      className: Y(
        e,
        "flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed border-zinc-950/10 dark:border-white/10 p-12 text-center"
      ),
      children: /* @__PURE__ */ x("div", { className: "mx-auto max-w-sm", children: t })
    })
  );
}
function ZE(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x("div", { className: Y(e, "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800"), children: t.children });
}
function QE(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x(
    "h3",
    E(v({}, t), {
      className: Y(e, "mt-2 text-sm font-semibold text-zinc-900 dark:text-white")
    })
  );
}
function JE(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x(
    "p",
    E(v({}, t), {
      className: Y(e, "mt-1 text-sm text-zinc-500 dark:text-zinc-400")
    })
  );
}
function eS(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x("div", v({ className: Y(e, "mt-6") }, t));
}
function tS(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x(
    "ul",
    E(v({}, t), {
      role: "list",
      className: Y(e, "divide-y divide-zinc-100 dark:divide-zinc-800")
    })
  );
}
function nS(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x(
    "li",
    E(v({}, t), {
      className: Y(e, "flex justify-between gap-x-6 py-5")
    })
  );
}
function rS(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x(
    "dl",
    E(v({}, t), {
      className: Y(e, "divide-y divide-zinc-100 dark:divide-zinc-800")
    })
  );
}
function iS(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x(
    "dt",
    E(v({}, t), {
      className: Y(e, "text-sm font-medium leading-6 text-zinc-900 dark:text-white")
    })
  );
}
function oS(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x(
    "dd",
    E(v({}, t), {
      className: Y(e, "mt-1 text-sm leading-6 text-zinc-700 dark:text-zinc-400 sm:col-span-2 sm:mt-0")
    })
  );
}
function yy(i, r) {
  var o = i, {
    title: e,
    titleId: t
  } = o, n = k(o, [
    "title",
    "titleId"
  ]);
  return /* @__PURE__ */ S.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ S.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ S.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
  }));
}
const xy = /* @__PURE__ */ S.forwardRef(yy);
function wy(i, r) {
  var o = i, {
    title: e,
    titleId: t
  } = o, n = k(o, [
    "title",
    "titleId"
  ]);
  return /* @__PURE__ */ S.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ S.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ S.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
  }));
}
const Ey = /* @__PURE__ */ S.forwardRef(wy);
function Sy(i, r) {
  var o = i, {
    title: e,
    titleId: t
  } = o, n = k(o, [
    "title",
    "titleId"
  ]);
  return /* @__PURE__ */ S.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ S.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ S.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
  }));
}
const Ty = /* @__PURE__ */ S.forwardRef(Sy);
function Py(i, r) {
  var o = i, {
    title: e,
    titleId: t
  } = o, n = k(o, [
    "title",
    "titleId"
  ]);
  return /* @__PURE__ */ S.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ S.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ S.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
  }));
}
const ky = /* @__PURE__ */ S.forwardRef(Py);
function Cy(i, r) {
  var o = i, {
    title: e,
    titleId: t
  } = o, n = k(o, [
    "title",
    "titleId"
  ]);
  return /* @__PURE__ */ S.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ S.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ S.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
  }));
}
const Oy = /* @__PURE__ */ S.forwardRef(Cy);
function $y(i, r) {
  var o = i, {
    title: e,
    titleId: t
  } = o, n = k(o, [
    "title",
    "titleId"
  ]);
  return /* @__PURE__ */ S.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ S.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ S.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
  }));
}
const Gd = /* @__PURE__ */ S.forwardRef($y);
function Ay(i, r) {
  var o = i, {
    title: e,
    titleId: t
  } = o, n = k(o, [
    "title",
    "titleId"
  ]);
  return /* @__PURE__ */ S.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ S.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ S.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
  }));
}
const My = /* @__PURE__ */ S.forwardRef(Ay);
function Ry(i, r) {
  var o = i, {
    title: e,
    titleId: t
  } = o, n = k(o, [
    "title",
    "titleId"
  ]);
  return /* @__PURE__ */ S.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ S.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ S.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
  }));
}
const Dy = /* @__PURE__ */ S.forwardRef(Ry);
function Ly(i, r) {
  var o = i, {
    title: e,
    titleId: t
  } = o, n = k(o, [
    "title",
    "titleId"
  ]);
  return /* @__PURE__ */ S.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ S.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ S.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
  }));
}
const Fy = /* @__PURE__ */ S.forwardRef(Ly);
function Iy(i, r) {
  var o = i, {
    title: e,
    titleId: t
  } = o, n = k(o, [
    "title",
    "titleId"
  ]);
  return /* @__PURE__ */ S.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ S.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ S.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
  }));
}
const Yd = /* @__PURE__ */ S.forwardRef(Iy);
function Ny(i, r) {
  var o = i, {
    title: e,
    titleId: t
  } = o, n = k(o, [
    "title",
    "titleId"
  ]);
  return /* @__PURE__ */ S.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ S.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ S.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  }));
}
const Vy = /* @__PURE__ */ S.forwardRef(Ny);
function By(i, r) {
  var o = i, {
    title: e,
    titleId: t
  } = o, n = k(o, [
    "title",
    "titleId"
  ]);
  return /* @__PURE__ */ S.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ S.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ S.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m19.5 8.25-7.5 7.5-7.5-7.5"
  }));
}
const jy = /* @__PURE__ */ S.forwardRef(By);
function zy(i, r) {
  var o = i, {
    title: e,
    titleId: t
  } = o, n = k(o, [
    "title",
    "titleId"
  ]);
  return /* @__PURE__ */ S.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ S.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ S.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
  }));
}
const Xd = /* @__PURE__ */ S.forwardRef(zy);
function _y(i, r) {
  var o = i, {
    title: e,
    titleId: t
  } = o, n = k(o, [
    "title",
    "titleId"
  ]);
  return /* @__PURE__ */ S.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ S.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ S.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
  }));
}
const Wy = /* @__PURE__ */ S.forwardRef(_y);
function Hy(i, r) {
  var o = i, {
    title: e,
    titleId: t
  } = o, n = k(o, [
    "title",
    "titleId"
  ]);
  return /* @__PURE__ */ S.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ S.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ S.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
  }));
}
const qd = /* @__PURE__ */ S.forwardRef(Hy);
function Uy(i, r) {
  var o = i, {
    title: e,
    titleId: t
  } = o, n = k(o, [
    "title",
    "titleId"
  ]);
  return /* @__PURE__ */ S.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ S.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ S.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
  }));
}
const Pl = /* @__PURE__ */ S.forwardRef(Uy);
function Ky(i, r) {
  var o = i, {
    title: e,
    titleId: t
  } = o, n = k(o, [
    "title",
    "titleId"
  ]);
  return /* @__PURE__ */ S.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ S.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ S.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
  }));
}
const Zd = /* @__PURE__ */ S.forwardRef(Ky);
function Gy(i, r) {
  var o = i, {
    title: e,
    titleId: t
  } = o, n = k(o, [
    "title",
    "titleId"
  ]);
  return /* @__PURE__ */ S.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ S.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ S.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
  }));
}
const Yy = /* @__PURE__ */ S.forwardRef(Gy);
function Xy(i, r) {
  var o = i, {
    title: e,
    titleId: t
  } = o, n = k(o, [
    "title",
    "titleId"
  ]);
  return /* @__PURE__ */ S.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ S.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ S.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
  }));
}
const qy = /* @__PURE__ */ S.forwardRef(Xy);
function Zy(i, r) {
  var o = i, {
    title: e,
    titleId: t
  } = o, n = k(o, [
    "title",
    "titleId"
  ]);
  return /* @__PURE__ */ S.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ S.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ S.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
  }));
}
const Qd = /* @__PURE__ */ S.forwardRef(Zy);
function Qy(i, r) {
  var o = i, {
    title: e,
    titleId: t
  } = o, n = k(o, [
    "title",
    "titleId"
  ]);
  return /* @__PURE__ */ S.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ S.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ S.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
  }));
}
const kl = /* @__PURE__ */ S.forwardRef(Qy);
function Jy(i, r) {
  var o = i, {
    title: e,
    titleId: t
  } = o, n = k(o, [
    "title",
    "titleId"
  ]);
  return /* @__PURE__ */ S.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ S.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ S.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
  }));
}
const ex = /* @__PURE__ */ S.forwardRef(Jy);
function tx(i, r) {
  var o = i, {
    title: e,
    titleId: t
  } = o, n = k(o, [
    "title",
    "titleId"
  ]);
  return /* @__PURE__ */ S.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ S.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ S.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
  }));
}
const nx = /* @__PURE__ */ S.forwardRef(tx);
function rx(i, r) {
  var o = i, {
    title: e,
    titleId: t
  } = o, n = k(o, [
    "title",
    "titleId"
  ]);
  return /* @__PURE__ */ S.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ S.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ S.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46"
  }));
}
const Jd = /* @__PURE__ */ S.forwardRef(rx);
function ix(i, r) {
  var o = i, {
    title: e,
    titleId: t
  } = o, n = k(o, [
    "title",
    "titleId"
  ]);
  return /* @__PURE__ */ S.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ S.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ S.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
  }));
}
const ox = /* @__PURE__ */ S.forwardRef(ix);
function sx(i, r) {
  var o = i, {
    title: e,
    titleId: t
  } = o, n = k(o, [
    "title",
    "titleId"
  ]);
  return /* @__PURE__ */ S.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ S.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ S.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
  }));
}
const ax = /* @__PURE__ */ S.forwardRef(sx);
function lx(i, r) {
  var o = i, {
    title: e,
    titleId: t
  } = o, n = k(o, [
    "title",
    "titleId"
  ]);
  return /* @__PURE__ */ S.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ S.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ S.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
  }));
}
const Bo = /* @__PURE__ */ S.forwardRef(lx);
function cx(i, r) {
  var o = i, {
    title: e,
    titleId: t
  } = o, n = k(o, [
    "title",
    "titleId"
  ]);
  return /* @__PURE__ */ S.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ S.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ S.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
  }));
}
const ux = /* @__PURE__ */ S.forwardRef(cx);
function dx(i, r) {
  var o = i, {
    title: e,
    titleId: t
  } = o, n = k(o, [
    "title",
    "titleId"
  ]);
  return /* @__PURE__ */ S.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ S.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ S.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
  }));
}
const fx = /* @__PURE__ */ S.forwardRef(dx);
function hx(i, r) {
  var o = i, {
    title: e,
    titleId: t
  } = o, n = k(o, [
    "title",
    "titleId"
  ]);
  return /* @__PURE__ */ S.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ S.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ S.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
  }));
}
const ef = /* @__PURE__ */ S.forwardRef(hx);
function px(i, r) {
  var o = i, {
    title: e,
    titleId: t
  } = o, n = k(o, [
    "title",
    "titleId"
  ]);
  return /* @__PURE__ */ S.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: r,
    "aria-labelledby": t
  }, n), e ? /* @__PURE__ */ S.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ S.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M6 18 18 6M6 6l12 12"
  }));
}
const mx = /* @__PURE__ */ S.forwardRef(px), xt = [
  {
    id: "1",
    type: "discrepancy",
    priority: "high",
    title: "Quantity Mismatch",
    message: "Order vs Invoice: 24 → 22 units",
    meta: "#DSC-112",
    timestamp: "2 min ago",
    unread: !0,
    actions: [
      { label: "Resolve", primary: !0 }
      // Arrow icon will be added in component
    ]
  },
  {
    id: "2",
    type: "discrepancy",
    priority: "high",
    title: "Price Discrepancy",
    message: "PO #4521 - $2,340 variance",
    meta: "#DSC-118",
    timestamp: "15 min ago",
    unread: !0,
    actions: [
      { label: "Review", primary: !0 }
    ]
  },
  {
    id: "3",
    type: "discrepancy",
    priority: "medium",
    title: "SKU Mismatch",
    message: "Wrong product code detected",
    meta: "#DSC-124",
    timestamp: "1 hour ago",
    unread: !0,
    actions: [
      { label: "Fix", primary: !0 }
    ]
  },
  {
    id: "4",
    type: "invoice",
    priority: "high",
    title: "Overdue Invoice",
    message: "$12,450 - 15 days overdue",
    meta: "#INV-7834",
    timestamp: "2 hours ago",
    unread: !0,
    actions: [
      { label: "Collect", primary: !0 }
    ]
  },
  {
    id: "5",
    type: "payment",
    priority: "medium",
    title: "Pending Payment",
    message: "$8,920 awaiting confirmation",
    meta: "#PAY-445",
    timestamp: "3 hours ago",
    unread: !0,
    actions: [
      { label: "Follow Up", primary: !0 }
    ]
  },
  {
    id: "6",
    type: "payment",
    priority: "high",
    title: "Failed Transaction",
    message: "Card declined - retry needed",
    meta: "#TXN-892",
    timestamp: "4 hours ago",
    unread: !0,
    actions: [
      { label: "Retry", primary: !0 }
    ]
  },
  {
    id: "7",
    type: "approval",
    priority: "high",
    title: "Review Quote",
    message: "Steelcase Flex - $45,230",
    meta: "#QT-2847",
    timestamp: "5 hours ago",
    unread: !0,
    actions: [
      { label: "Convert", primary: !0 }
    ]
  },
  {
    id: "8",
    type: "approval",
    priority: "high",
    title: "Approve Order",
    message: "Herman Miller Aeron batch",
    meta: "#OR-9823",
    timestamp: "6 hours ago",
    unread: !0,
    actions: [
      { label: "Approve", primary: !0 }
    ]
  },
  {
    id: "9",
    type: "approval",
    priority: "medium",
    title: "Pending Quote",
    message: "Knoll workspace setup",
    meta: "#Q1-2851",
    timestamp: "1 day ago",
    unread: !1,
    actions: [
      { label: "Review", primary: !0 }
    ]
  },
  {
    id: "10",
    type: "approval",
    priority: "low",
    title: "Contract Renewal",
    message: "Annual maintenance agreement",
    meta: "#CN-44",
    timestamp: "2 days ago",
    unread: !1,
    actions: [
      { label: "Sign", primary: !0 }
    ]
  },
  {
    id: "11",
    type: "announcement",
    priority: "medium",
    title: "New Feature: IMS Integration",
    message: "The new Inventory Management System is now live.",
    meta: "System Update",
    timestamp: "10 min ago",
    unread: !0,
    actions: [
      { label: "Learn More", primary: !0 }
    ]
  },
  {
    id: "12",
    type: "live_chat",
    priority: "high",
    title: "Support Message",
    message: "Hi John, regarding your ticket #442...",
    meta: "Sarah from Support",
    timestamp: "Just now",
    unread: !0,
    actions: [
      { label: "Reply", primary: !0 }
    ]
  }
], Zs = pe({});
function Qs(e) {
  const t = z(null);
  return t.current === null && (t.current = e()), t.current;
}
const tf = typeof window != "undefined", nf = tf ? li : be, zi = /* @__PURE__ */ pe(null);
function Js(e, t) {
  e.indexOf(t) === -1 && e.push(t);
}
function Jr(e, t) {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}
const gt = (e, t, n) => n > t ? t : n < e ? e : n;
function jo(e, t) {
  return t ? `${e}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${t}` : e;
}
let Ln = () => {
}, Ct = () => {
};
var Kc;
typeof process != "undefined" && ((Kc = process.env) == null ? void 0 : Kc.NODE_ENV) !== "production" && (Ln = (e, t, n) => {
  !e && typeof console != "undefined" && console.warn(jo(t, n));
}, Ct = (e, t, n) => {
  if (!e)
    throw new Error(jo(t, n));
});
const Ot = {}, rf = (e) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e);
function of(e) {
  return typeof e == "object" && e !== null;
}
const sf = (e) => /^0[^.\s]+$/u.test(e);
// @__NO_SIDE_EFFECTS__
function ea(e) {
  let t;
  return () => (t === void 0 && (t = e()), t);
}
const Qe = /* @__NO_SIDE_EFFECTS__ */ (e) => e, gx = (e, t) => (n) => t(e(n)), yr = (...e) => e.reduce(gx), nr = /* @__NO_SIDE_EFFECTS__ */ (e, t, n) => {
  const r = t - e;
  return r === 0 ? 1 : (n - e) / r;
};
class ta {
  constructor() {
    this.subscriptions = [];
  }
  add(t) {
    return Js(this.subscriptions, t), () => Jr(this.subscriptions, t);
  }
  notify(t, n, r) {
    const i = this.subscriptions.length;
    if (i)
      if (i === 1)
        this.subscriptions[0](t, n, r);
      else
        for (let o = 0; o < i; o++) {
          const s = this.subscriptions[o];
          s && s(t, n, r);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const Je = /* @__NO_SIDE_EFFECTS__ */ (e) => e * 1e3, Ze = /* @__NO_SIDE_EFFECTS__ */ (e) => e / 1e3;
function af(e, t) {
  return t ? e * (1e3 / t) : 0;
}
const Cl = /* @__PURE__ */ new Set();
function na(e, t, n) {
  e || Cl.has(t) || (console.warn(jo(t, n)), Cl.add(t));
}
const lf = (e, t, n) => (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e, vx = 1e-7, bx = 12;
function yx(e, t, n, r, i) {
  let o, s, a = 0;
  do
    s = t + (n - t) / 2, o = lf(s, r, i) - e, o > 0 ? n = s : t = s;
  while (Math.abs(o) > vx && ++a < bx);
  return s;
}
function xr(e, t, n, r) {
  if (e === t && n === r)
    return Qe;
  const i = (o) => yx(o, 0, 1, e, n);
  return (o) => o === 0 || o === 1 ? o : lf(i(o), t, r);
}
const cf = (e) => (t) => t <= 0.5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2, uf = (e) => (t) => 1 - e(1 - t), df = /* @__PURE__ */ xr(0.33, 1.53, 0.69, 0.99), ra = /* @__PURE__ */ uf(df), ff = /* @__PURE__ */ cf(ra), hf = (e) => (e *= 2) < 1 ? 0.5 * ra(e) : 0.5 * (2 - Math.pow(2, -10 * (e - 1))), ia = (e) => 1 - Math.sin(Math.acos(e)), pf = uf(ia), mf = cf(ia), xx = /* @__PURE__ */ xr(0.42, 0, 1, 1), wx = /* @__PURE__ */ xr(0, 0, 0.58, 1), gf = /* @__PURE__ */ xr(0.42, 0, 0.58, 1), Ex = (e) => Array.isArray(e) && typeof e[0] != "number", vf = (e) => Array.isArray(e) && typeof e[0] == "number", Ol = {
  linear: Qe,
  easeIn: xx,
  easeInOut: gf,
  easeOut: wx,
  circIn: ia,
  circInOut: mf,
  circOut: pf,
  backIn: ra,
  backInOut: ff,
  backOut: df,
  anticipate: hf
}, Sx = (e) => typeof e == "string", $l = (e) => {
  if (vf(e)) {
    Ct(e.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [t, n, r, i] = e;
    return xr(t, n, r, i);
  } else if (Sx(e))
    return Ct(Ol[e] !== void 0, `Invalid easing type '${e}'`, "invalid-easing-type"), Ol[e];
  return e;
}, $r = [
  "setup",
  // Compute
  "read",
  // Read
  "resolveKeyframes",
  // Write/Read/Write/Read
  "preUpdate",
  // Compute
  "update",
  // Compute
  "preRender",
  // Compute
  "render",
  // Write
  "postRender"
  // Compute
];
function Tx(e, t) {
  let n = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set(), i = !1, o = !1;
  const s = /* @__PURE__ */ new WeakSet();
  let a = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function l(c) {
    s.has(c) && (u.schedule(c), e()), c(a);
  }
  const u = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (c, f = !1, h = !1) => {
      const p = h && i ? n : r;
      return f && s.add(c), p.has(c) || p.add(c), c;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (c) => {
      r.delete(c), s.delete(c);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (c) => {
      if (a = c, i) {
        o = !0;
        return;
      }
      i = !0, [n, r] = [r, n], n.forEach(l), n.clear(), i = !1, o && (o = !1, u.process(c));
    }
  };
  return u;
}
const Px = 40;
function bf(e, t) {
  let n = !1, r = !0;
  const i = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, o = () => n = !0, s = $r.reduce((b, T) => (b[T] = Tx(o), b), {}), { setup: a, read: l, resolveKeyframes: u, preUpdate: c, update: f, preRender: h, render: d, postRender: p } = s, m = () => {
    const b = Ot.useManualTiming ? i.timestamp : performance.now();
    n = !1, Ot.useManualTiming || (i.delta = r ? 1e3 / 60 : Math.max(Math.min(b - i.timestamp, Px), 1)), i.timestamp = b, i.isProcessing = !0, a.process(i), l.process(i), u.process(i), c.process(i), f.process(i), h.process(i), d.process(i), p.process(i), i.isProcessing = !1, n && t && (r = !1, e(m));
  }, g = () => {
    n = !0, r = !0, i.isProcessing || e(m);
  };
  return { schedule: $r.reduce((b, T) => {
    const P = s[T];
    return b[T] = (C, A = !1, $ = !1) => (n || g(), P.schedule(C, A, $)), b;
  }, {}), cancel: (b) => {
    for (let T = 0; T < $r.length; T++)
      s[$r[T]].cancel(b);
  }, state: i, steps: s };
}
const { schedule: Ee, cancel: Ut, state: Le, steps: lo } = /* @__PURE__ */ bf(typeof requestAnimationFrame != "undefined" ? requestAnimationFrame : Qe, !0);
let Ir;
function kx() {
  Ir = void 0;
}
const ze = {
  now: () => (Ir === void 0 && ze.set(Le.isProcessing || Ot.useManualTiming ? Le.timestamp : performance.now()), Ir),
  set: (e) => {
    Ir = e, queueMicrotask(kx);
  }
}, yf = (e) => (t) => typeof t == "string" && t.startsWith(e), xf = /* @__PURE__ */ yf("--"), Cx = /* @__PURE__ */ yf("var(--"), oa = (e) => Cx(e) ? Ox.test(e.split("/*")[0].trim()) : !1, Ox = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function Al(e) {
  return typeof e != "string" ? !1 : e.split("/*")[0].includes("var(--");
}
const Fn = {
  test: (e) => typeof e == "number",
  parse: parseFloat,
  transform: (e) => e
}, rr = E(v({}, Fn), {
  transform: (e) => gt(0, 1, e)
}), Ar = E(v({}, Fn), {
  default: 1
}), Un = (e) => Math.round(e * 1e5) / 1e5, sa = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function $x(e) {
  return e == null;
}
const Ax = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, aa = (e, t) => (n) => !!(typeof n == "string" && Ax.test(n) && n.startsWith(e) || t && !$x(n) && Object.prototype.hasOwnProperty.call(n, t)), wf = (e, t, n) => (r) => {
  if (typeof r != "string")
    return r;
  const [i, o, s, a] = r.match(sa);
  return {
    [e]: parseFloat(i),
    [t]: parseFloat(o),
    [n]: parseFloat(s),
    alpha: a !== void 0 ? parseFloat(a) : 1
  };
}, Mx = (e) => gt(0, 255, e), co = E(v({}, Fn), {
  transform: (e) => Math.round(Mx(e))
}), tn = {
  test: /* @__PURE__ */ aa("rgb", "red"),
  parse: /* @__PURE__ */ wf("red", "green", "blue"),
  transform: ({ red: e, green: t, blue: n, alpha: r = 1 }) => "rgba(" + co.transform(e) + ", " + co.transform(t) + ", " + co.transform(n) + ", " + Un(rr.transform(r)) + ")"
};
function Rx(e) {
  let t = "", n = "", r = "", i = "";
  return e.length > 5 ? (t = e.substring(1, 3), n = e.substring(3, 5), r = e.substring(5, 7), i = e.substring(7, 9)) : (t = e.substring(1, 2), n = e.substring(2, 3), r = e.substring(3, 4), i = e.substring(4, 5), t += t, n += n, r += r, i += i), {
    red: parseInt(t, 16),
    green: parseInt(n, 16),
    blue: parseInt(r, 16),
    alpha: i ? parseInt(i, 16) / 255 : 1
  };
}
const zo = {
  test: /* @__PURE__ */ aa("#"),
  parse: Rx,
  transform: tn.transform
}, wr = /* @__NO_SIDE_EFFECTS__ */ (e) => ({
  test: (t) => typeof t == "string" && t.endsWith(e) && t.split(" ").length === 1,
  parse: parseFloat,
  transform: (t) => `${t}${e}`
}), Lt = /* @__PURE__ */ wr("deg"), pt = /* @__PURE__ */ wr("%"), q = /* @__PURE__ */ wr("px"), Dx = /* @__PURE__ */ wr("vh"), Lx = /* @__PURE__ */ wr("vw"), Ml = E(v({}, pt), {
  parse: (e) => pt.parse(e) / 100,
  transform: (e) => pt.transform(e * 100)
}), mn = {
  test: /* @__PURE__ */ aa("hsl", "hue"),
  parse: /* @__PURE__ */ wf("hue", "saturation", "lightness"),
  transform: ({ hue: e, saturation: t, lightness: n, alpha: r = 1 }) => "hsla(" + Math.round(e) + ", " + pt.transform(Un(t)) + ", " + pt.transform(Un(n)) + ", " + Un(rr.transform(r)) + ")"
}, Oe = {
  test: (e) => tn.test(e) || zo.test(e) || mn.test(e),
  parse: (e) => tn.test(e) ? tn.parse(e) : mn.test(e) ? mn.parse(e) : zo.parse(e),
  transform: (e) => typeof e == "string" ? e : e.hasOwnProperty("red") ? tn.transform(e) : mn.transform(e),
  getAnimatableNone: (e) => {
    const t = Oe.parse(e);
    return t.alpha = 0, Oe.transform(t);
  }
}, Fx = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function Ix(e) {
  var t, n;
  return isNaN(e) && typeof e == "string" && (((t = e.match(sa)) == null ? void 0 : t.length) || 0) + (((n = e.match(Fx)) == null ? void 0 : n.length) || 0) > 0;
}
const Ef = "number", Sf = "color", Nx = "var", Vx = "var(", Rl = "${}", Bx = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function ir(e) {
  const t = e.toString(), n = [], r = {
    color: [],
    number: [],
    var: []
  }, i = [];
  let o = 0;
  const a = t.replace(Bx, (l) => (Oe.test(l) ? (r.color.push(o), i.push(Sf), n.push(Oe.parse(l))) : l.startsWith(Vx) ? (r.var.push(o), i.push(Nx), n.push(l)) : (r.number.push(o), i.push(Ef), n.push(parseFloat(l))), ++o, Rl)).split(Rl);
  return { values: n, split: a, indexes: r, types: i };
}
function Tf(e) {
  return ir(e).values;
}
function Pf(e) {
  const { split: t, types: n } = ir(e), r = t.length;
  return (i) => {
    let o = "";
    for (let s = 0; s < r; s++)
      if (o += t[s], i[s] !== void 0) {
        const a = n[s];
        a === Ef ? o += Un(i[s]) : a === Sf ? o += Oe.transform(i[s]) : o += i[s];
      }
    return o;
  };
}
const jx = (e) => typeof e == "number" ? 0 : Oe.test(e) ? Oe.getAnimatableNone(e) : e;
function zx(e) {
  const t = Tf(e);
  return Pf(e)(t.map(jx));
}
const Kt = {
  test: Ix,
  parse: Tf,
  createTransformer: Pf,
  getAnimatableNone: zx
};
function uo(e, t, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
}
function _x({ hue: e, saturation: t, lightness: n, alpha: r }) {
  e /= 360, t /= 100, n /= 100;
  let i = 0, o = 0, s = 0;
  if (!t)
    i = o = s = n;
  else {
    const a = n < 0.5 ? n * (1 + t) : n + t - n * t, l = 2 * n - a;
    i = uo(l, a, e + 1 / 3), o = uo(l, a, e), s = uo(l, a, e - 1 / 3);
  }
  return {
    red: Math.round(i * 255),
    green: Math.round(o * 255),
    blue: Math.round(s * 255),
    alpha: r
  };
}
function ei(e, t) {
  return (n) => n > 0 ? t : e;
}
const Pe = (e, t, n) => e + (t - e) * n, fo = (e, t, n) => {
  const r = e * e, i = n * (t * t - r) + r;
  return i < 0 ? 0 : Math.sqrt(i);
}, Wx = [zo, tn, mn], Hx = (e) => Wx.find((t) => t.test(e));
function Dl(e) {
  const t = Hx(e);
  if (Ln(!!t, `'${e}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !t)
    return !1;
  let n = t.parse(e);
  return t === mn && (n = _x(n)), n;
}
const Ll = (e, t) => {
  const n = Dl(e), r = Dl(t);
  if (!n || !r)
    return ei(e, t);
  const i = v({}, n);
  return (o) => (i.red = fo(n.red, r.red, o), i.green = fo(n.green, r.green, o), i.blue = fo(n.blue, r.blue, o), i.alpha = Pe(n.alpha, r.alpha, o), tn.transform(i));
}, _o = /* @__PURE__ */ new Set(["none", "hidden"]);
function Ux(e, t) {
  return _o.has(e) ? (n) => n <= 0 ? e : t : (n) => n >= 1 ? t : e;
}
function Kx(e, t) {
  return (n) => Pe(e, t, n);
}
function la(e) {
  return typeof e == "number" ? Kx : typeof e == "string" ? oa(e) ? ei : Oe.test(e) ? Ll : Xx : Array.isArray(e) ? kf : typeof e == "object" ? Oe.test(e) ? Ll : Gx : ei;
}
function kf(e, t) {
  const n = [...e], r = n.length, i = e.map((o, s) => la(o)(o, t[s]));
  return (o) => {
    for (let s = 0; s < r; s++)
      n[s] = i[s](o);
    return n;
  };
}
function Gx(e, t) {
  const n = v(v({}, e), t), r = {};
  for (const i in n)
    e[i] !== void 0 && t[i] !== void 0 && (r[i] = la(e[i])(e[i], t[i]));
  return (i) => {
    for (const o in r)
      n[o] = r[o](i);
    return n;
  };
}
function Yx(e, t) {
  var i;
  const n = [], r = { color: 0, var: 0, number: 0 };
  for (let o = 0; o < t.values.length; o++) {
    const s = t.types[o], a = e.indexes[s][r[s]], l = (i = e.values[a]) != null ? i : 0;
    n[o] = l, r[s]++;
  }
  return n;
}
const Xx = (e, t) => {
  const n = Kt.createTransformer(t), r = ir(e), i = ir(t);
  return r.indexes.var.length === i.indexes.var.length && r.indexes.color.length === i.indexes.color.length && r.indexes.number.length >= i.indexes.number.length ? _o.has(e) && !i.values.length || _o.has(t) && !r.values.length ? Ux(e, t) : yr(kf(Yx(r, i), i.values), n) : (Ln(!0, `Complex values '${e}' and '${t}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), ei(e, t));
};
function Cf(e, t, n) {
  return typeof e == "number" && typeof t == "number" && typeof n == "number" ? Pe(e, t, n) : la(e)(e, t);
}
const qx = (e) => {
  const t = ({ timestamp: n }) => e(n);
  return {
    start: (n = !0) => Ee.update(t, n),
    stop: () => Ut(t),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => Le.isProcessing ? Le.timestamp : ze.now()
  };
}, Of = (e, t, n = 10) => {
  let r = "";
  const i = Math.max(Math.round(t / n), 2);
  for (let o = 0; o < i; o++)
    r += Math.round(e(o / (i - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${r.substring(0, r.length - 2)})`;
}, ti = 2e4;
function ca(e) {
  let t = 0;
  const n = 50;
  let r = e.next(t);
  for (; !r.done && t < ti; )
    t += n, r = e.next(t);
  return t >= ti ? 1 / 0 : t;
}
function Zx(e, t = 100, n) {
  const r = n(E(v({}, e), { keyframes: [0, t] })), i = Math.min(ca(r), ti);
  return {
    type: "keyframes",
    ease: (o) => r.next(i * o).value / t,
    duration: /* @__PURE__ */ Ze(i)
  };
}
const Qx = 5;
function $f(e, t, n) {
  const r = Math.max(t - Qx, 0);
  return af(n - e(r), t - r);
}
const Te = {
  // Default spring physics
  stiffness: 100,
  damping: 10,
  mass: 1,
  velocity: 0,
  // Default duration/bounce-based options
  duration: 800,
  // in ms
  bounce: 0.3,
  visualDuration: 0.3,
  // in seconds
  // Rest thresholds
  restSpeed: {
    granular: 0.01,
    default: 2
  },
  restDelta: {
    granular: 5e-3,
    default: 0.5
  },
  // Limits
  minDuration: 0.01,
  // in seconds
  maxDuration: 10,
  // in seconds
  minDamping: 0.05,
  maxDamping: 1
}, ho = 1e-3;
function Jx({ duration: e = Te.duration, bounce: t = Te.bounce, velocity: n = Te.velocity, mass: r = Te.mass }) {
  let i, o;
  Ln(e <= /* @__PURE__ */ Je(Te.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let s = 1 - t;
  s = gt(Te.minDamping, Te.maxDamping, s), e = gt(Te.minDuration, Te.maxDuration, /* @__PURE__ */ Ze(e)), s < 1 ? (i = (u) => {
    const c = u * s, f = c * e, h = c - n, d = Wo(u, s), p = Math.exp(-f);
    return ho - h / d * p;
  }, o = (u) => {
    const f = u * s * e, h = f * n + n, d = Math.pow(s, 2) * Math.pow(u, 2) * e, p = Math.exp(-f), m = Wo(Math.pow(u, 2), s);
    return (-i(u) + ho > 0 ? -1 : 1) * ((h - d) * p) / m;
  }) : (i = (u) => {
    const c = Math.exp(-u * e), f = (u - n) * e + 1;
    return -ho + c * f;
  }, o = (u) => {
    const c = Math.exp(-u * e), f = (n - u) * (e * e);
    return c * f;
  });
  const a = 5 / e, l = t1(i, o, a);
  if (e = /* @__PURE__ */ Je(e), isNaN(l))
    return {
      stiffness: Te.stiffness,
      damping: Te.damping,
      duration: e
    };
  {
    const u = Math.pow(l, 2) * r;
    return {
      stiffness: u,
      damping: s * 2 * Math.sqrt(r * u),
      duration: e
    };
  }
}
const e1 = 12;
function t1(e, t, n) {
  let r = n;
  for (let i = 1; i < e1; i++)
    r = r - e(r) / t(r);
  return r;
}
function Wo(e, t) {
  return e * Math.sqrt(1 - t * t);
}
const n1 = ["duration", "bounce"], r1 = ["stiffness", "damping", "mass"];
function Fl(e, t) {
  return t.some((n) => e[n] !== void 0);
}
function i1(e) {
  let t = v({
    velocity: Te.velocity,
    stiffness: Te.stiffness,
    damping: Te.damping,
    mass: Te.mass,
    isResolvedFromDuration: !1
  }, e);
  if (!Fl(e, r1) && Fl(e, n1))
    if (e.visualDuration) {
      const n = e.visualDuration, r = 2 * Math.PI / (n * 1.2), i = r * r, o = 2 * gt(0.05, 1, 1 - (e.bounce || 0)) * Math.sqrt(i);
      t = E(v({}, t), {
        mass: Te.mass,
        stiffness: i,
        damping: o
      });
    } else {
      const n = Jx(e);
      t = E(v(v({}, t), n), {
        mass: Te.mass
      }), t.isResolvedFromDuration = !0;
    }
  return t;
}
function ni(e = Te.visualDuration, t = Te.bounce) {
  const n = typeof e != "object" ? {
    visualDuration: e,
    keyframes: [0, 1],
    bounce: t
  } : e;
  let { restSpeed: r, restDelta: i } = n;
  const o = n.keyframes[0], s = n.keyframes[n.keyframes.length - 1], a = { done: !1, value: o }, { stiffness: l, damping: u, mass: c, duration: f, velocity: h, isResolvedFromDuration: d } = i1(E(v({}, n), {
    velocity: -/* @__PURE__ */ Ze(n.velocity || 0)
  })), p = h || 0, m = u / (2 * Math.sqrt(l * c)), g = s - o, y = /* @__PURE__ */ Ze(Math.sqrt(l / c)), w = Math.abs(g) < 5;
  r || (r = w ? Te.restSpeed.granular : Te.restSpeed.default), i || (i = w ? Te.restDelta.granular : Te.restDelta.default);
  let b;
  if (m < 1) {
    const P = Wo(y, m);
    b = (C) => {
      const A = Math.exp(-m * y * C);
      return s - A * ((p + m * y * g) / P * Math.sin(P * C) + g * Math.cos(P * C));
    };
  } else if (m === 1)
    b = (P) => s - Math.exp(-y * P) * (g + (p + y * g) * P);
  else {
    const P = y * Math.sqrt(m * m - 1);
    b = (C) => {
      const A = Math.exp(-m * y * C), $ = Math.min(P * C, 300);
      return s - A * ((p + m * y * g) * Math.sinh($) + P * g * Math.cosh($)) / P;
    };
  }
  const T = {
    calculatedDuration: d && f || null,
    next: (P) => {
      const C = b(P);
      if (d)
        a.done = P >= f;
      else {
        let A = P === 0 ? p : 0;
        m < 1 && (A = P === 0 ? /* @__PURE__ */ Je(p) : $f(b, P, C));
        const $ = Math.abs(A) <= r, F = Math.abs(s - C) <= i;
        a.done = $ && F;
      }
      return a.value = a.done ? s : C, a;
    },
    toString: () => {
      const P = Math.min(ca(T), ti), C = Of((A) => T.next(P * A).value, P, 30);
      return P + "ms " + C;
    },
    toTransition: () => {
    }
  };
  return T;
}
ni.applyToOptions = (e) => {
  const t = Zx(e, 100, ni);
  return e.ease = t.ease, e.duration = /* @__PURE__ */ Je(t.duration), e.type = "keyframes", e;
};
function Ho({ keyframes: e, velocity: t = 0, power: n = 0.8, timeConstant: r = 325, bounceDamping: i = 10, bounceStiffness: o = 500, modifyTarget: s, min: a, max: l, restDelta: u = 0.5, restSpeed: c }) {
  const f = e[0], h = {
    done: !1,
    value: f
  }, d = ($) => a !== void 0 && $ < a || l !== void 0 && $ > l, p = ($) => a === void 0 ? l : l === void 0 || Math.abs(a - $) < Math.abs(l - $) ? a : l;
  let m = n * t;
  const g = f + m, y = s === void 0 ? g : s(g);
  y !== g && (m = y - f);
  const w = ($) => -m * Math.exp(-$ / r), b = ($) => y + w($), T = ($) => {
    const F = w($), R = b($);
    h.done = Math.abs(F) <= u, h.value = h.done ? y : R;
  };
  let P, C;
  const A = ($) => {
    d(h.value) && (P = $, C = ni({
      keyframes: [h.value, p(h.value)],
      velocity: $f(b, $, h.value),
      // TODO: This should be passing * 1000
      damping: i,
      stiffness: o,
      restDelta: u,
      restSpeed: c
    }));
  };
  return A(0), {
    calculatedDuration: null,
    next: ($) => {
      let F = !1;
      return !C && P === void 0 && (F = !0, T($), A($)), P !== void 0 && $ >= P ? C.next($ - P) : (!F && T($), h);
    }
  };
}
function o1(e, t, n) {
  const r = [], i = n || Ot.mix || Cf, o = e.length - 1;
  for (let s = 0; s < o; s++) {
    let a = i(e[s], e[s + 1]);
    if (t) {
      const l = Array.isArray(t) ? t[s] || Qe : t;
      a = yr(l, a);
    }
    r.push(a);
  }
  return r;
}
function s1(e, t, { clamp: n = !0, ease: r, mixer: i } = {}) {
  const o = e.length;
  if (Ct(o === t.length, "Both input and output ranges must be the same length", "range-length"), o === 1)
    return () => t[0];
  if (o === 2 && t[0] === t[1])
    return () => t[1];
  const s = e[0] === e[1];
  e[0] > e[o - 1] && (e = [...e].reverse(), t = [...t].reverse());
  const a = o1(t, r, i), l = a.length, u = (c) => {
    if (s && c < e[0])
      return t[0];
    let f = 0;
    if (l > 1)
      for (; f < e.length - 2 && !(c < e[f + 1]); f++)
        ;
    const h = /* @__PURE__ */ nr(e[f], e[f + 1], c);
    return a[f](h);
  };
  return n ? (c) => u(gt(e[0], e[o - 1], c)) : u;
}
function a1(e, t) {
  const n = e[e.length - 1];
  for (let r = 1; r <= t; r++) {
    const i = /* @__PURE__ */ nr(0, t, r);
    e.push(Pe(n, 1, i));
  }
}
function l1(e) {
  const t = [0];
  return a1(t, e.length - 1), t;
}
function c1(e, t) {
  return e.map((n) => n * t);
}
function u1(e, t) {
  return e.map(() => t || gf).splice(0, e.length - 1);
}
function gn({ duration: e = 300, keyframes: t, times: n, ease: r = "easeInOut" }) {
  const i = Ex(r) ? r.map($l) : $l(r), o = {
    done: !1,
    value: t[0]
  }, s = c1(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    n && n.length === t.length ? n : l1(t),
    e
  ), a = s1(s, t, {
    ease: Array.isArray(i) ? i : u1(t, i)
  });
  return {
    calculatedDuration: e,
    next: (l) => (o.value = a(l), o.done = l >= e, o)
  };
}
const d1 = (e) => e !== null;
function ua(e, { repeat: t, repeatType: n = "loop" }, r, i = 1) {
  const o = e.filter(d1), a = i < 0 || t && n !== "loop" && t % 2 === 1 ? 0 : o.length - 1;
  return !a || r === void 0 ? o[a] : r;
}
const f1 = {
  decay: Ho,
  inertia: Ho,
  tween: gn,
  keyframes: gn,
  spring: ni
};
function Af(e) {
  typeof e.type == "string" && (e.type = f1[e.type]);
}
class da {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((t) => {
      this.resolve = t;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  /**
   * Allows the animation to be awaited.
   *
   * @deprecated Use `finished` instead.
   */
  then(t, n) {
    return this.finished.then(t, n);
  }
}
const h1 = (e) => e / 100;
class fa extends da {
  constructor(t) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.stop = () => {
      var r, i;
      const { motionValue: n } = this.options;
      n && n.updatedAt !== ze.now() && this.tick(ze.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), (i = (r = this.options).onStop) == null || i.call(r));
    }, this.options = t, this.initAnimation(), this.play(), t.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: t } = this;
    Af(t);
    const { type: n = gn, repeat: r = 0, repeatDelay: i = 0, repeatType: o, velocity: s = 0 } = t;
    let { keyframes: a } = t;
    const l = n || gn;
    process.env.NODE_ENV !== "production" && l !== gn && Ct(a.length <= 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${a}`, "spring-two-frames"), l !== gn && typeof a[0] != "number" && (this.mixKeyframes = yr(h1, Cf(a[0], a[1])), a = [0, 100]);
    const u = l(E(v({}, t), { keyframes: a }));
    o === "mirror" && (this.mirroredGenerator = l(E(v({}, t), {
      keyframes: [...a].reverse(),
      velocity: -s
    }))), u.calculatedDuration === null && (u.calculatedDuration = ca(u));
    const { calculatedDuration: c } = u;
    this.calculatedDuration = c, this.resolvedDuration = c + i, this.totalDuration = this.resolvedDuration * (r + 1) - i, this.generator = u;
  }
  updateTime(t) {
    const n = Math.round(t - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = n;
  }
  tick(t, n = !1) {
    const { generator: r, totalDuration: i, mixKeyframes: o, mirroredGenerator: s, resolvedDuration: a, calculatedDuration: l } = this;
    if (this.startTime === null)
      return r.next(0);
    const { delay: u = 0, keyframes: c, repeat: f, repeatType: h, repeatDelay: d, type: p, onUpdate: m, finalKeyframe: g } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, t) : this.speed < 0 && (this.startTime = Math.min(t - i / this.speed, this.startTime)), n ? this.currentTime = t : this.updateTime(t);
    const y = this.currentTime - u * (this.playbackSpeed >= 0 ? 1 : -1), w = this.playbackSpeed >= 0 ? y < 0 : y > i;
    this.currentTime = Math.max(y, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = i);
    let b = this.currentTime, T = r;
    if (f) {
      const $ = Math.min(this.currentTime, i) / a;
      let F = Math.floor($), R = $ % 1;
      !R && $ >= 1 && (R = 1), R === 1 && F--, F = Math.min(F, f + 1), !!(F % 2) && (h === "reverse" ? (R = 1 - R, d && (R -= d / a)) : h === "mirror" && (T = s)), b = gt(0, 1, R) * a;
    }
    const P = w ? { done: !1, value: c[0] } : T.next(b);
    o && (P.value = o(P.value));
    let { done: C } = P;
    !w && l !== null && (C = this.playbackSpeed >= 0 ? this.currentTime >= i : this.currentTime <= 0);
    const A = this.holdTime === null && (this.state === "finished" || this.state === "running" && C);
    return A && p !== Ho && (P.value = ua(c, this.options, g, this.speed)), m && m(P.value), A && this.finish(), P;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(t, n) {
    return this.finished.then(t, n);
  }
  get duration() {
    return /* @__PURE__ */ Ze(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: t = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ Ze(t);
  }
  get time() {
    return /* @__PURE__ */ Ze(this.currentTime);
  }
  set time(t) {
    var n;
    t = /* @__PURE__ */ Je(t), this.currentTime = t, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = t : this.driver && (this.startTime = this.driver.now() - t / this.playbackSpeed), (n = this.driver) == null || n.start(!1);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(t) {
    this.updateTime(ze.now());
    const n = this.playbackSpeed !== t;
    this.playbackSpeed = t, n && (this.time = /* @__PURE__ */ Ze(this.currentTime));
  }
  play() {
    var i, o;
    if (this.isStopped)
      return;
    const { driver: t = qx, startTime: n } = this.options;
    this.driver || (this.driver = t((s) => this.tick(s))), (o = (i = this.options).onPlay) == null || o.call(i);
    const r = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = r) : this.holdTime !== null ? this.startTime = r - this.holdTime : this.startTime || (this.startTime = n != null ? n : r), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(ze.now()), this.holdTime = this.currentTime;
  }
  complete() {
    this.state !== "running" && this.play(), this.state = "finished", this.holdTime = null;
  }
  finish() {
    var t, n;
    this.notifyFinished(), this.teardown(), this.state = "finished", (n = (t = this.options).onComplete) == null || n.call(t);
  }
  cancel() {
    var t, n;
    this.holdTime = null, this.startTime = 0, this.tick(0), this.teardown(), (n = (t = this.options).onCancel) == null || n.call(t);
  }
  teardown() {
    this.state = "idle", this.stopDriver(), this.startTime = this.holdTime = null;
  }
  stopDriver() {
    this.driver && (this.driver.stop(), this.driver = void 0);
  }
  sample(t) {
    return this.startTime = 0, this.tick(t, !0);
  }
  attachTimeline(t) {
    var n;
    return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), (n = this.driver) == null || n.stop(), t.observe(this);
  }
}
function p1(e) {
  var t;
  for (let n = 1; n < e.length; n++)
    (t = e[n]) != null || (e[n] = e[n - 1]);
}
const nn = (e) => e * 180 / Math.PI, Uo = (e) => {
  const t = nn(Math.atan2(e[1], e[0]));
  return Ko(t);
}, m1 = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (e) => (Math.abs(e[0]) + Math.abs(e[3])) / 2,
  rotate: Uo,
  rotateZ: Uo,
  skewX: (e) => nn(Math.atan(e[1])),
  skewY: (e) => nn(Math.atan(e[2])),
  skew: (e) => (Math.abs(e[1]) + Math.abs(e[2])) / 2
}, Ko = (e) => (e = e % 360, e < 0 && (e += 360), e), Il = Uo, Nl = (e) => Math.sqrt(e[0] * e[0] + e[1] * e[1]), Vl = (e) => Math.sqrt(e[4] * e[4] + e[5] * e[5]), g1 = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: Nl,
  scaleY: Vl,
  scale: (e) => (Nl(e) + Vl(e)) / 2,
  rotateX: (e) => Ko(nn(Math.atan2(e[6], e[5]))),
  rotateY: (e) => Ko(nn(Math.atan2(-e[2], e[0]))),
  rotateZ: Il,
  rotate: Il,
  skewX: (e) => nn(Math.atan(e[4])),
  skewY: (e) => nn(Math.atan(e[1])),
  skew: (e) => (Math.abs(e[1]) + Math.abs(e[4])) / 2
};
function Go(e) {
  return e.includes("scale") ? 1 : 0;
}
function Yo(e, t) {
  if (!e || e === "none")
    return Go(t);
  const n = e.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let r, i;
  if (n)
    r = g1, i = n;
  else {
    const a = e.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    r = m1, i = a;
  }
  if (!i)
    return Go(t);
  const o = r[t], s = i[1].split(",").map(b1);
  return typeof o == "function" ? o(s) : s[o];
}
const v1 = (e, t) => {
  const { transform: n = "none" } = getComputedStyle(e);
  return Yo(n, t);
};
function b1(e) {
  return parseFloat(e.trim());
}
const In = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
], Nn = new Set(In), Bl = (e) => e === Fn || e === q, y1 = /* @__PURE__ */ new Set(["x", "y", "z"]), x1 = In.filter((e) => !y1.has(e));
function w1(e) {
  const t = [];
  return x1.forEach((n) => {
    const r = e.getValue(n);
    r !== void 0 && (t.push([n, r.get()]), r.set(n.startsWith("scale") ? 1 : 0));
  }), t;
}
const jt = {
  // Dimensions
  width: ({ x: e }, { paddingLeft: t = "0", paddingRight: n = "0" }) => e.max - e.min - parseFloat(t) - parseFloat(n),
  height: ({ y: e }, { paddingTop: t = "0", paddingBottom: n = "0" }) => e.max - e.min - parseFloat(t) - parseFloat(n),
  top: (e, { top: t }) => parseFloat(t),
  left: (e, { left: t }) => parseFloat(t),
  bottom: ({ y: e }, { top: t }) => parseFloat(t) + (e.max - e.min),
  right: ({ x: e }, { left: t }) => parseFloat(t) + (e.max - e.min),
  // Transform
  x: (e, { transform: t }) => Yo(t, "x"),
  y: (e, { transform: t }) => Yo(t, "y")
};
jt.translateX = jt.x;
jt.translateY = jt.y;
const rn = /* @__PURE__ */ new Set();
let Xo = !1, qo = !1, Zo = !1;
function Mf() {
  if (qo) {
    const e = Array.from(rn).filter((r) => r.needsMeasurement), t = new Set(e.map((r) => r.element)), n = /* @__PURE__ */ new Map();
    t.forEach((r) => {
      const i = w1(r);
      i.length && (n.set(r, i), r.render());
    }), e.forEach((r) => r.measureInitialState()), t.forEach((r) => {
      r.render();
      const i = n.get(r);
      i && i.forEach(([o, s]) => {
        var a;
        (a = r.getValue(o)) == null || a.set(s);
      });
    }), e.forEach((r) => r.measureEndState()), e.forEach((r) => {
      r.suspendedScrollY !== void 0 && window.scrollTo(0, r.suspendedScrollY);
    });
  }
  qo = !1, Xo = !1, rn.forEach((e) => e.complete(Zo)), rn.clear();
}
function Rf() {
  rn.forEach((e) => {
    e.readKeyframes(), e.needsMeasurement && (qo = !0);
  });
}
function E1() {
  Zo = !0, Rf(), Mf(), Zo = !1;
}
class ha {
  constructor(t, n, r, i, o, s = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...t], this.onComplete = n, this.name = r, this.motionValue = i, this.element = o, this.isAsync = s;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (rn.add(this), Xo || (Xo = !0, Ee.read(Rf), Ee.resolveKeyframes(Mf))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, name: n, element: r, motionValue: i } = this;
    if (t[0] === null) {
      const o = i == null ? void 0 : i.get(), s = t[t.length - 1];
      if (o !== void 0)
        t[0] = o;
      else if (r && n) {
        const a = r.readValue(n, s);
        a != null && (t[0] = a);
      }
      t[0] === void 0 && (t[0] = s), i && o === void 0 && i.set(t[0]);
    }
    p1(t);
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete(t = !1) {
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, t), rn.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (rn.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const S1 = (e) => e.startsWith("--");
function T1(e, t, n) {
  S1(t) ? e.style.setProperty(t, n) : e.style[t] = n;
}
const P1 = /* @__PURE__ */ ea(() => window.ScrollTimeline !== void 0), k1 = {};
function C1(e, t) {
  const n = /* @__PURE__ */ ea(e);
  return () => {
    var r;
    return (r = k1[t]) != null ? r : n();
  };
}
const Df = /* @__PURE__ */ C1(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch (e) {
    return !1;
  }
  return !0;
}, "linearEasing"), _n = ([e, t, n, r]) => `cubic-bezier(${e}, ${t}, ${n}, ${r})`, jl = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ _n([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ _n([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ _n([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ _n([0.33, 1.53, 0.69, 0.99])
};
function Lf(e, t) {
  if (e)
    return typeof e == "function" ? Df() ? Of(e, t) : "ease-out" : vf(e) ? _n(e) : Array.isArray(e) ? e.map((n) => Lf(n, t) || jl.easeOut) : jl[e];
}
function O1(e, t, n, { delay: r = 0, duration: i = 300, repeat: o = 0, repeatType: s = "loop", ease: a = "easeOut", times: l } = {}, u = void 0) {
  const c = {
    [t]: n
  };
  l && (c.offset = l);
  const f = Lf(a, i);
  Array.isArray(f) && (c.easing = f);
  const h = {
    delay: r,
    duration: i,
    easing: Array.isArray(f) ? "linear" : f,
    fill: "both",
    iterations: o + 1,
    direction: s === "reverse" ? "alternate" : "normal"
  };
  return u && (h.pseudoElement = u), e.animate(c, h);
}
function Ff(e) {
  return typeof e == "function" && "applyToOptions" in e;
}
function $1(n) {
  var r = n, { type: e } = r, t = k(r, ["type"]);
  var i, o;
  return Ff(e) && Df() ? e.applyToOptions(t) : ((i = t.duration) != null || (t.duration = 300), (o = t.ease) != null || (t.ease = "easeOut"), t);
}
class If extends da {
  constructor(t) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !t)
      return;
    const { element: n, name: r, keyframes: i, pseudoElement: o, allowFlatten: s = !1, finalKeyframe: a, onComplete: l } = t;
    this.isPseudoElement = !!o, this.allowFlatten = s, this.options = t, Ct(typeof t.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const u = $1(t);
    this.animation = O1(n, r, i, u, o), u.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !o) {
        const c = ua(i, this.options, a, this.speed);
        this.updateMotionValue ? this.updateMotionValue(c) : T1(n, r, c), this.animation.cancel();
      }
      l == null || l(), this.notifyFinished();
    };
  }
  play() {
    this.isStopped || (this.manualStartTime = null, this.animation.play(), this.state === "finished" && this.updateFinished());
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    var t, n;
    (n = (t = this.animation).finish) == null || n.call(t);
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch (t) {
    }
  }
  stop() {
    if (this.isStopped)
      return;
    this.isStopped = !0;
    const { state: t } = this;
    t === "idle" || t === "finished" || (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * In this method, we commit styles back to the DOM before cancelling
   * the animation.
   *
   * This is designed to be overridden by NativeAnimationExtended, which
   * will create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to also correctly calculate velocity for any subsequent animation
   * while deferring the commit until the next animation frame.
   */
  commitStyles() {
    var n, r, i;
    const t = (n = this.options) == null ? void 0 : n.element;
    !this.isPseudoElement && (t != null && t.isConnected) && ((i = (r = this.animation).commitStyles) == null || i.call(r));
  }
  get duration() {
    var n, r;
    const t = ((r = (n = this.animation.effect) == null ? void 0 : n.getComputedTiming) == null ? void 0 : r.call(n).duration) || 0;
    return /* @__PURE__ */ Ze(Number(t));
  }
  get iterationDuration() {
    const { delay: t = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ Ze(t);
  }
  get time() {
    return /* @__PURE__ */ Ze(Number(this.animation.currentTime) || 0);
  }
  set time(t) {
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ Je(t);
  }
  /**
   * The playback speed of the animation.
   * 1 = normal speed, 2 = double speed, 0.5 = half speed.
   */
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(t) {
    t < 0 && (this.finishedTime = null), this.animation.playbackRate = t;
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    var t;
    return (t = this.manualStartTime) != null ? t : Number(this.animation.startTime);
  }
  set startTime(t) {
    this.manualStartTime = this.animation.startTime = t;
  }
  /**
   * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
   */
  attachTimeline({ timeline: t, observe: n }) {
    var r;
    return this.allowFlatten && ((r = this.animation.effect) == null || r.updateTiming({ easing: "linear" })), this.animation.onfinish = null, t && P1() ? (this.animation.timeline = t, Qe) : n(this);
  }
}
const Nf = {
  anticipate: hf,
  backInOut: ff,
  circInOut: mf
};
function A1(e) {
  return e in Nf;
}
function M1(e) {
  typeof e.ease == "string" && A1(e.ease) && (e.ease = Nf[e.ease]);
}
const po = 10;
class R1 extends If {
  constructor(t) {
    M1(t), Af(t), super(t), t.startTime !== void 0 && (this.startTime = t.startTime), this.options = t;
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * Rather than read committed styles back out of the DOM, we can
   * create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to calculate velocity for any subsequent animation.
   */
  updateMotionValue(t) {
    const c = this.options, { motionValue: n, onUpdate: r, onComplete: i, element: o } = c, s = k(c, ["motionValue", "onUpdate", "onComplete", "element"]);
    if (!n)
      return;
    if (t !== void 0) {
      n.set(t);
      return;
    }
    const a = new fa(E(v({}, s), {
      autoplay: !1
    })), l = Math.max(po, ze.now() - this.startTime), u = gt(0, po, l - po);
    n.setWithVelocity(a.sample(Math.max(0, l - u)).value, a.sample(l).value, u), a.stop();
  }
}
const zl = (e, t) => t === "zIndex" ? !1 : !!(typeof e == "number" || Array.isArray(e) || typeof e == "string" && // It's animatable if we have a string
(Kt.test(e) || e === "0") && // And it contains numbers and/or colors
!e.startsWith("url("));
function D1(e) {
  const t = e[0];
  if (e.length === 1)
    return !0;
  for (let n = 0; n < e.length; n++)
    if (e[n] !== t)
      return !0;
}
function L1(e, t, n, r) {
  const i = e[0];
  if (i === null)
    return !1;
  if (t === "display" || t === "visibility")
    return !0;
  const o = e[e.length - 1], s = zl(i, t), a = zl(o, t);
  return Ln(s === a, `You are trying to animate ${t} from "${i}" to "${o}". "${s ? o : i}" is not an animatable value.`, "value-not-animatable"), !s || !a ? !1 : D1(e) || (n === "spring" || Ff(n)) && r;
}
function Qo(e) {
  e.duration = 0, e.type = "keyframes";
}
const F1 = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Could be re-enabled now we have support for linear() easing
  // "background-color"
]), I1 = /* @__PURE__ */ ea(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function N1(e) {
  var c;
  const { motionValue: t, name: n, repeatDelay: r, repeatType: i, damping: o, type: s } = e;
  if (!(((c = t == null ? void 0 : t.owner) == null ? void 0 : c.current) instanceof HTMLElement))
    return !1;
  const { onUpdate: l, transformTemplate: u } = t.owner.getProps();
  return I1() && n && F1.has(n) && (n !== "transform" || !u) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !l && !r && i !== "mirror" && o !== 0 && s !== "inertia";
}
const V1 = 40;
class B1 extends da {
  constructor(h) {
    var d = h, { autoplay: t = !0, delay: n = 0, type: r = "keyframes", repeat: i = 0, repeatDelay: o = 0, repeatType: s = "loop", keyframes: a, name: l, motionValue: u, element: c } = d, f = k(d, ["autoplay", "delay", "type", "repeat", "repeatDelay", "repeatType", "keyframes", "name", "motionValue", "element"]);
    var g;
    super(), this.stop = () => {
      var y, w;
      this._animation && (this._animation.stop(), (y = this.stopTimeline) == null || y.call(this)), (w = this.keyframeResolver) == null || w.cancel();
    }, this.createdAt = ze.now();
    const p = v({
      autoplay: t,
      delay: n,
      type: r,
      repeat: i,
      repeatDelay: o,
      repeatType: s,
      name: l,
      motionValue: u,
      element: c
    }, f), m = (c == null ? void 0 : c.KeyframeResolver) || ha;
    this.keyframeResolver = new m(a, (y, w, b) => this.onKeyframesResolved(y, w, p, !b), l, u, c), (g = this.keyframeResolver) == null || g.scheduleResolve();
  }
  onKeyframesResolved(t, n, r, i) {
    var g, y;
    this.keyframeResolver = void 0;
    const { name: o, type: s, velocity: a, delay: l, isHandoff: u, onUpdate: c } = r;
    this.resolvedAt = ze.now(), L1(t, o, s, a) || ((Ot.instantAnimations || !l) && (c == null || c(ua(t, r, n))), t[0] = t[t.length - 1], Qo(r), r.repeat = 0);
    const f = i ? this.resolvedAt ? this.resolvedAt - this.createdAt > V1 ? this.resolvedAt : this.createdAt : this.createdAt : void 0, h = E(v({
      startTime: f,
      finalKeyframe: n
    }, r), {
      keyframes: t
    }), d = !u && N1(h), p = (y = (g = h.motionValue) == null ? void 0 : g.owner) == null ? void 0 : y.current, m = d ? new R1(E(v({}, h), {
      element: p
    })) : new fa(h);
    m.finished.then(() => {
      this.notifyFinished();
    }).catch(Qe), this.pendingTimeline && (this.stopTimeline = m.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = m;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(t, n) {
    return this.finished.finally(t).then(() => {
    });
  }
  get animation() {
    var t;
    return this._animation || ((t = this.keyframeResolver) == null || t.resume(), E1()), this._animation;
  }
  get duration() {
    return this.animation.duration;
  }
  get iterationDuration() {
    return this.animation.iterationDuration;
  }
  get time() {
    return this.animation.time;
  }
  set time(t) {
    this.animation.time = t;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(t) {
    this.animation.speed = t;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(t) {
    return this._animation ? this.stopTimeline = this.animation.attachTimeline(t) : this.pendingTimeline = t, () => this.stop();
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    var t;
    this._animation && this.animation.cancel(), (t = this.keyframeResolver) == null || t.cancel();
  }
}
function Vf(e, t, n, r = 0, i = 1) {
  const o = Array.from(e).sort((u, c) => u.sortNodePosition(c)).indexOf(t), s = e.size, a = (s - 1) * r;
  return typeof n == "function" ? n(o, s) : i === 1 ? o * r : a - o * r;
}
const j1 = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function z1(e) {
  const t = j1.exec(e);
  if (!t)
    return [,];
  const [, n, r, i] = t;
  return [`--${n != null ? n : r}`, i];
}
const _1 = 4;
function Bf(e, t, n = 1) {
  Ct(n <= _1, `Max CSS variable fallback depth detected in property "${e}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [r, i] = z1(e);
  if (!r)
    return;
  const o = window.getComputedStyle(t).getPropertyValue(r);
  if (o) {
    const s = o.trim();
    return rf(s) ? parseFloat(s) : s;
  }
  return oa(i) ? Bf(i, t, n + 1) : i;
}
const W1 = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, H1 = (e) => ({
  type: "spring",
  stiffness: 550,
  damping: e === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), U1 = {
  type: "keyframes",
  duration: 0.8
}, K1 = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, G1 = (e, { keyframes: t }) => t.length > 2 ? U1 : Nn.has(e) ? e.startsWith("scale") ? H1(t[1]) : W1 : K1, Y1 = (e) => e !== null;
function X1(e, { repeat: t, repeatType: n = "loop" }, r) {
  const i = e.filter(Y1), o = t && n !== "loop" && t % 2 === 1 ? 0 : i.length - 1;
  return i[o];
}
function jf(e, t) {
  if (e != null && e.inherit && t) {
    const n = e, { inherit: r } = n, i = k(n, ["inherit"]);
    return v(v({}, t), i);
  }
  return e;
}
function pa(e, t) {
  var r, i;
  const n = (i = (r = e == null ? void 0 : e[t]) != null ? r : e == null ? void 0 : e.default) != null ? i : e;
  return n !== e ? jf(n, e) : n;
}
function q1(f) {
  var h = f, { when: e, delay: t, delayChildren: n, staggerChildren: r, staggerDirection: i, repeat: o, repeatType: s, repeatDelay: a, from: l, elapsed: u } = h, c = k(h, ["when", "delay", "delayChildren", "staggerChildren", "staggerDirection", "repeat", "repeatType", "repeatDelay", "from", "elapsed"]);
  return !!Object.keys(c).length;
}
const ma = (e, t, n, r = {}, i, o) => (s) => {
  const a = pa(r, e) || {}, l = a.delay || r.delay || 0;
  let { elapsed: u = 0 } = r;
  u = u - /* @__PURE__ */ Je(l);
  const c = E(v({
    keyframes: Array.isArray(n) ? n : [null, n],
    ease: "easeOut",
    velocity: t.getVelocity()
  }, a), {
    delay: -u,
    onUpdate: (h) => {
      t.set(h), a.onUpdate && a.onUpdate(h);
    },
    onComplete: () => {
      s(), a.onComplete && a.onComplete();
    },
    name: e,
    motionValue: t,
    element: o ? void 0 : i
  });
  q1(a) || Object.assign(c, G1(e, c)), c.duration && (c.duration = /* @__PURE__ */ Je(c.duration)), c.repeatDelay && (c.repeatDelay = /* @__PURE__ */ Je(c.repeatDelay)), c.from !== void 0 && (c.keyframes[0] = c.from);
  let f = !1;
  if ((c.type === !1 || c.duration === 0 && !c.repeatDelay) && (Qo(c), c.delay === 0 && (f = !0)), (Ot.instantAnimations || Ot.skipAnimations || i != null && i.shouldSkipAnimations) && (f = !0, Qo(c), c.delay = 0), c.allowFlatten = !a.type && !a.ease, f && !o && t.get() !== void 0) {
    const h = X1(c.keyframes, a);
    if (h !== void 0) {
      Ee.update(() => {
        c.onUpdate(h), c.onComplete();
      });
      return;
    }
  }
  return a.isSync ? new fa(c) : new B1(c);
};
function _l(e) {
  const t = [{}, {}];
  return e == null || e.values.forEach((n, r) => {
    t[0][r] = n.get(), t[1][r] = n.getVelocity();
  }), t;
}
function ga(e, t, n, r) {
  if (typeof t == "function") {
    const [i, o] = _l(r);
    t = t(n !== void 0 ? n : e.custom, i, o);
  }
  if (typeof t == "string" && (t = e.variants && e.variants[t]), typeof t == "function") {
    const [i, o] = _l(r);
    t = t(n !== void 0 ? n : e.custom, i, o);
  }
  return t;
}
function Sn(e, t, n) {
  const r = e.getProps();
  return ga(r, t, n !== void 0 ? n : r.custom, e);
}
const zf = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...In
]), Wl = 30, Z1 = (e) => !isNaN(parseFloat(e));
class Q1 {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(t, n = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (r) => {
      var o;
      const i = ze.now();
      if (this.updatedAt !== i && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(r), this.current !== this.prev && ((o = this.events.change) == null || o.notify(this.current), this.dependents))
        for (const s of this.dependents)
          s.dirty();
    }, this.hasAnimated = !1, this.setCurrent(t), this.owner = n.owner;
  }
  setCurrent(t) {
    this.current = t, this.updatedAt = ze.now(), this.canTrackVelocity === null && t !== void 0 && (this.canTrackVelocity = Z1(this.current));
  }
  setPrevFrameValue(t = this.current) {
    this.prevFrameValue = t, this.prevUpdatedAt = this.updatedAt;
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(t) {
    return process.env.NODE_ENV !== "production" && na(!1, 'value.onChange(callback) is deprecated. Switch to value.on("change", callback).'), this.on("change", t);
  }
  on(t, n) {
    this.events[t] || (this.events[t] = new ta());
    const r = this.events[t].add(n);
    return t === "change" ? () => {
      r(), Ee.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : r;
  }
  clearListeners() {
    for (const t in this.events)
      this.events[t].clear();
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   */
  attach(t, n) {
    this.passiveEffect = t, this.stopPassiveEffect = n;
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
  set(t) {
    this.passiveEffect ? this.passiveEffect(t, this.updateAndNotify) : this.updateAndNotify(t);
  }
  setWithVelocity(t, n, r) {
    this.set(n), this.prev = void 0, this.prevFrameValue = t, this.prevUpdatedAt = this.updatedAt - r;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(t, n = !0) {
    this.updateAndNotify(t), this.prev = t, this.prevUpdatedAt = this.prevFrameValue = void 0, n && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
  dirty() {
    var t;
    (t = this.events.change) == null || t.notify(this.current);
  }
  addDependent(t) {
    this.dependents || (this.dependents = /* @__PURE__ */ new Set()), this.dependents.add(t);
  }
  removeDependent(t) {
    this.dependents && this.dependents.delete(t);
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    return this.current;
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    const t = ze.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || t - this.updatedAt > Wl)
      return 0;
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, Wl);
    return af(parseFloat(this.current) - parseFloat(this.prevFrameValue), n);
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   */
  start(t) {
    return this.stop(), new Promise((n) => {
      this.hasAnimated = !0, this.animation = t(n), this.events.animationStart && this.events.animationStart.notify();
    }).then(() => {
      this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation();
    });
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    var t, n;
    (t = this.dependents) == null || t.clear(), (n = this.events.destroy) == null || n.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function Cn(e, t) {
  return new Q1(e, t);
}
const Jo = (e) => Array.isArray(e);
function J1(e, t, n) {
  e.hasValue(t) ? e.getValue(t).set(n) : e.addValue(t, Cn(n));
}
function ew(e) {
  return Jo(e) ? e[e.length - 1] || 0 : e;
}
function tw(e, t) {
  let s = Sn(e, t) || {}, { transitionEnd: r = {}, transition: i = {} } = s, o = k(s, ["transitionEnd", "transition"]);
  o = v(v({}, o), r);
  for (const a in o) {
    const l = ew(o[a]);
    J1(e, a, l);
  }
}
const Ve = (e) => !!(e && e.getVelocity);
function nw(e) {
  return !!(Ve(e) && e.add);
}
function es(e, t) {
  const n = e.getValue("willChange");
  if (nw(n))
    return n.add(t);
  if (!n && Ot.WillChange) {
    const r = new Ot.WillChange("auto");
    e.addValue("willChange", r), r.add(t);
  }
}
function va(e) {
  return e.replace(/([A-Z])/g, (t) => `-${t.toLowerCase()}`);
}
const rw = "framerAppearId", _f = "data-" + va(rw);
function Wf(e) {
  return e.props[_f];
}
function iw({ protectedKeys: e, needsAnimating: t }, n) {
  const r = e.hasOwnProperty(n) && t[n] !== !0;
  return t[n] = !1, r;
}
function Hf(e, t, { delay: n = 0, transitionOverride: r, type: i } = {}) {
  var d;
  let h = t, { transition: o, transitionEnd: s } = h, a = k(h, ["transition", "transitionEnd"]);
  const l = e.getDefaultTransition();
  o = o ? jf(o, l) : l;
  const u = o == null ? void 0 : o.reduceMotion;
  r && (o = r);
  const c = [], f = i && e.animationState && e.animationState.getState()[i];
  for (const p in a) {
    const m = e.getValue(p, (d = e.latestValues[p]) != null ? d : null), g = a[p];
    if (g === void 0 || f && iw(f, p))
      continue;
    const y = v({
      delay: n
    }, pa(o || {}, p)), w = m.get();
    if (w !== void 0 && !m.isAnimating && !Array.isArray(g) && g === w && !y.velocity)
      continue;
    let b = !1;
    if (window.MotionHandoffAnimation) {
      const C = Wf(e);
      if (C) {
        const A = window.MotionHandoffAnimation(C, p, Ee);
        A !== null && (y.startTime = A, b = !0);
      }
    }
    es(e, p);
    const T = u != null ? u : e.shouldReduceMotion;
    m.start(ma(p, m, g, T && zf.has(p) ? { type: !1 } : y, e, b));
    const P = m.animation;
    P && c.push(P);
  }
  if (s) {
    const p = () => Ee.update(() => {
      s && tw(e, s);
    });
    c.length ? Promise.all(c).then(p) : p();
  }
  return c;
}
function ts(e, t, n = {}) {
  var l;
  const r = Sn(e, t, n.type === "exit" ? (l = e.presenceContext) == null ? void 0 : l.custom : void 0);
  let { transition: i = e.getDefaultTransition() || {} } = r || {};
  n.transitionOverride && (i = n.transitionOverride);
  const o = r ? () => Promise.all(Hf(e, r, n)) : () => Promise.resolve(), s = e.variantChildren && e.variantChildren.size ? (u = 0) => {
    const { delayChildren: c = 0, staggerChildren: f, staggerDirection: h } = i;
    return ow(e, t, u, c, f, h, n);
  } : () => Promise.resolve(), { when: a } = i;
  if (a) {
    const [u, c] = a === "beforeChildren" ? [o, s] : [s, o];
    return u().then(() => c());
  } else
    return Promise.all([o(), s(n.delay)]);
}
function ow(e, t, n = 0, r = 0, i = 0, o = 1, s) {
  const a = [];
  for (const l of e.variantChildren)
    l.notify("AnimationStart", t), a.push(ts(l, t, E(v({}, s), {
      delay: n + (typeof r == "function" ? 0 : r) + Vf(e.variantChildren, l, r, i, o)
    })).then(() => l.notify("AnimationComplete", t)));
  return Promise.all(a);
}
function sw(e, t, n = {}) {
  e.notify("AnimationStart", t);
  let r;
  if (Array.isArray(t)) {
    const i = t.map((o) => ts(e, o, n));
    r = Promise.all(i);
  } else if (typeof t == "string")
    r = ts(e, t, n);
  else {
    const i = typeof t == "function" ? Sn(e, t, n.custom) : t;
    r = Promise.all(Hf(e, i, n));
  }
  return r.then(() => {
    e.notify("AnimationComplete", t);
  });
}
const aw = {
  test: (e) => e === "auto",
  parse: (e) => e
}, Uf = (e) => (t) => t.test(e), Kf = [Fn, q, pt, Lt, Lx, Dx, aw], Hl = (e) => Kf.find(Uf(e));
function lw(e) {
  return typeof e == "number" ? e === 0 : e !== null ? e === "none" || e === "0" || sf(e) : !0;
}
const cw = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function uw(e) {
  const [t, n] = e.slice(0, -1).split("(");
  if (t === "drop-shadow")
    return e;
  const [r] = n.match(sa) || [];
  if (!r)
    return e;
  const i = n.replace(r, "");
  let o = cw.has(t) ? 1 : 0;
  return r !== n && (o *= 100), t + "(" + o + i + ")";
}
const dw = /\b([a-z-]*)\(.*?\)/gu, ns = E(v({}, Kt), {
  getAnimatableNone: (e) => {
    const t = e.match(dw);
    return t ? t.map(uw).join(" ") : e;
  }
}), Ul = E(v({}, Fn), {
  transform: Math.round
}), fw = {
  rotate: Lt,
  rotateX: Lt,
  rotateY: Lt,
  rotateZ: Lt,
  scale: Ar,
  scaleX: Ar,
  scaleY: Ar,
  scaleZ: Ar,
  skew: Lt,
  skewX: Lt,
  skewY: Lt,
  distance: q,
  translateX: q,
  translateY: q,
  translateZ: q,
  x: q,
  y: q,
  z: q,
  perspective: q,
  transformPerspective: q,
  opacity: rr,
  originX: Ml,
  originY: Ml,
  originZ: q
}, ba = E(v({
  // Border props
  borderWidth: q,
  borderTopWidth: q,
  borderRightWidth: q,
  borderBottomWidth: q,
  borderLeftWidth: q,
  borderRadius: q,
  borderTopLeftRadius: q,
  borderTopRightRadius: q,
  borderBottomRightRadius: q,
  borderBottomLeftRadius: q,
  // Positioning props
  width: q,
  maxWidth: q,
  height: q,
  maxHeight: q,
  top: q,
  right: q,
  bottom: q,
  left: q,
  inset: q,
  insetBlock: q,
  insetBlockStart: q,
  insetBlockEnd: q,
  insetInline: q,
  insetInlineStart: q,
  insetInlineEnd: q,
  // Spacing props
  padding: q,
  paddingTop: q,
  paddingRight: q,
  paddingBottom: q,
  paddingLeft: q,
  paddingBlock: q,
  paddingBlockStart: q,
  paddingBlockEnd: q,
  paddingInline: q,
  paddingInlineStart: q,
  paddingInlineEnd: q,
  margin: q,
  marginTop: q,
  marginRight: q,
  marginBottom: q,
  marginLeft: q,
  marginBlock: q,
  marginBlockStart: q,
  marginBlockEnd: q,
  marginInline: q,
  marginInlineStart: q,
  marginInlineEnd: q,
  // Typography
  fontSize: q,
  // Misc
  backgroundPositionX: q,
  backgroundPositionY: q
}, fw), {
  zIndex: Ul,
  // SVG
  fillOpacity: rr,
  strokeOpacity: rr,
  numOctaves: Ul
}), hw = E(v({}, ba), {
  // Color props
  color: Oe,
  backgroundColor: Oe,
  outlineColor: Oe,
  fill: Oe,
  stroke: Oe,
  // Border props
  borderColor: Oe,
  borderTopColor: Oe,
  borderRightColor: Oe,
  borderBottomColor: Oe,
  borderLeftColor: Oe,
  filter: ns,
  WebkitFilter: ns
}), Gf = (e) => hw[e];
function Yf(e, t) {
  let n = Gf(e);
  return n !== ns && (n = Kt), n.getAnimatableNone ? n.getAnimatableNone(t) : void 0;
}
const pw = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function mw(e, t, n) {
  let r = 0, i;
  for (; r < e.length && !i; ) {
    const o = e[r];
    typeof o == "string" && !pw.has(o) && ir(o).values.length && (i = e[r]), r++;
  }
  if (i && n)
    for (const o of t)
      e[o] = Yf(n, i);
}
class gw extends ha {
  constructor(t, n, r, i, o) {
    super(t, n, r, i, o, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, element: n, name: r } = this;
    if (!n || !n.current)
      return;
    super.readKeyframes();
    for (let c = 0; c < t.length; c++) {
      let f = t[c];
      if (typeof f == "string" && (f = f.trim(), oa(f))) {
        const h = Bf(f, n.current);
        h !== void 0 && (t[c] = h), c === t.length - 1 && (this.finalKeyframe = f);
      }
    }
    if (this.resolveNoneKeyframes(), !zf.has(r) || t.length !== 2)
      return;
    const [i, o] = t, s = Hl(i), a = Hl(o), l = Al(i), u = Al(o);
    if (l !== u && jt[r]) {
      this.needsMeasurement = !0;
      return;
    }
    if (s !== a)
      if (Bl(s) && Bl(a))
        for (let c = 0; c < t.length; c++) {
          const f = t[c];
          typeof f == "string" && (t[c] = parseFloat(f));
        }
      else jt[r] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: t, name: n } = this, r = [];
    for (let i = 0; i < t.length; i++)
      (t[i] === null || lw(t[i])) && r.push(i);
    r.length && mw(t, r, n);
  }
  measureInitialState() {
    const { element: t, unresolvedKeyframes: n, name: r } = this;
    if (!t || !t.current)
      return;
    r === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = jt[r](t.measureViewportBox(), window.getComputedStyle(t.current)), n[0] = this.measuredOrigin;
    const i = n[n.length - 1];
    i !== void 0 && t.getValue(r, i).jump(i, !1);
  }
  measureEndState() {
    var a;
    const { element: t, name: n, unresolvedKeyframes: r } = this;
    if (!t || !t.current)
      return;
    const i = t.getValue(n);
    i && i.jump(this.measuredOrigin, !1);
    const o = r.length - 1, s = r[o];
    r[o] = jt[n](t.measureViewportBox(), window.getComputedStyle(t.current)), s !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = s), (a = this.removedTransforms) != null && a.length && this.removedTransforms.forEach(([l, u]) => {
      t.getValue(l).set(u);
    }), this.resolveNoneKeyframes();
  }
}
const vw = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]);
function Xf(e, t, n) {
  var r;
  if (e == null)
    return [];
  if (e instanceof EventTarget)
    return [e];
  if (typeof e == "string") {
    let i = document;
    const o = (r = n == null ? void 0 : n[e]) != null ? r : i.querySelectorAll(e);
    return o ? Array.from(o) : [];
  }
  return Array.from(e).filter((i) => i != null);
}
const qf = (e, t) => t && typeof e == "number" ? t.transform(e) : e;
function rs(e) {
  return of(e) && "offsetHeight" in e;
}
const { schedule: ya } = /* @__PURE__ */ bf(queueMicrotask, !1), tt = {
  x: !1,
  y: !1
};
function Zf() {
  return tt.x || tt.y;
}
function bw(e) {
  return e === "x" || e === "y" ? tt[e] ? null : (tt[e] = !0, () => {
    tt[e] = !1;
  }) : tt.x || tt.y ? null : (tt.x = tt.y = !0, () => {
    tt.x = tt.y = !1;
  });
}
function Qf(e, t) {
  const n = Xf(e), r = new AbortController(), i = E(v({
    passive: !0
  }, t), {
    signal: r.signal
  });
  return [n, i, () => r.abort()];
}
function yw(e) {
  return !(e.pointerType === "touch" || Zf());
}
function xw(e, t, n = {}) {
  const [r, i, o] = Qf(e, n);
  return r.forEach((s) => {
    let a = !1, l = !1, u;
    const c = () => {
      s.removeEventListener("pointerleave", p);
    }, f = (g) => {
      u && (u(g), u = void 0), c();
    }, h = (g) => {
      a = !1, window.removeEventListener("pointerup", h), window.removeEventListener("pointercancel", h), l && (l = !1, f(g));
    }, d = () => {
      a = !0, window.addEventListener("pointerup", h, i), window.addEventListener("pointercancel", h, i);
    }, p = (g) => {
      if (g.pointerType !== "touch") {
        if (a) {
          l = !0;
          return;
        }
        f(g);
      }
    }, m = (g) => {
      if (!yw(g))
        return;
      l = !1;
      const y = t(s, g);
      typeof y == "function" && (u = y, s.addEventListener("pointerleave", p, i));
    };
    s.addEventListener("pointerenter", m, i), s.addEventListener("pointerdown", d, i);
  }), o;
}
const Jf = (e, t) => t ? e === t ? !0 : Jf(e, t.parentElement) : !1, xa = (e) => e.pointerType === "mouse" ? typeof e.button != "number" || e.button <= 0 : e.isPrimary !== !1, ww = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function Ew(e) {
  return ww.has(e.tagName) || e.isContentEditable === !0;
}
const Sw = /* @__PURE__ */ new Set(["INPUT", "SELECT", "TEXTAREA"]);
function Tw(e) {
  return Sw.has(e.tagName) || e.isContentEditable === !0;
}
const Nr = /* @__PURE__ */ new WeakSet();
function Kl(e) {
  return (t) => {
    t.key === "Enter" && e(t);
  };
}
function mo(e, t) {
  e.dispatchEvent(new PointerEvent("pointer" + t, { isPrimary: !0, bubbles: !0 }));
}
const Pw = (e, t) => {
  const n = e.currentTarget;
  if (!n)
    return;
  const r = Kl(() => {
    if (Nr.has(n))
      return;
    mo(n, "down");
    const i = Kl(() => {
      mo(n, "up");
    }), o = () => mo(n, "cancel");
    n.addEventListener("keyup", i, t), n.addEventListener("blur", o, t);
  });
  n.addEventListener("keydown", r, t), n.addEventListener("blur", () => n.removeEventListener("keydown", r), t);
};
function Gl(e) {
  return xa(e) && !Zf();
}
const Yl = /* @__PURE__ */ new WeakSet();
function kw(e, t, n = {}) {
  const [r, i, o] = Qf(e, n), s = (a) => {
    const l = a.currentTarget;
    if (!Gl(a) || Yl.has(a))
      return;
    Nr.add(l), n.stopPropagation && Yl.add(a);
    const u = t(l, a), c = (d, p) => {
      window.removeEventListener("pointerup", f), window.removeEventListener("pointercancel", h), Nr.has(l) && Nr.delete(l), Gl(d) && typeof u == "function" && u(d, { success: p });
    }, f = (d) => {
      c(d, l === window || l === document || n.useGlobalTarget || Jf(l, d.target));
    }, h = (d) => {
      c(d, !1);
    };
    window.addEventListener("pointerup", f, i), window.addEventListener("pointercancel", h, i);
  };
  return r.forEach((a) => {
    (n.useGlobalTarget ? window : a).addEventListener("pointerdown", s, i), rs(a) && (a.addEventListener("focus", (u) => Pw(u, i)), !Ew(a) && !a.hasAttribute("tabindex") && (a.tabIndex = 0));
  }), o;
}
function wa(e) {
  return of(e) && "ownerSVGElement" in e;
}
const Vr = /* @__PURE__ */ new WeakMap();
let Ft;
const eh = (e, t, n) => (r, i) => i && i[0] ? i[0][e + "Size"] : wa(r) && "getBBox" in r ? r.getBBox()[t] : r[n], Cw = /* @__PURE__ */ eh("inline", "width", "offsetWidth"), Ow = /* @__PURE__ */ eh("block", "height", "offsetHeight");
function $w({ target: e, borderBoxSize: t }) {
  var n;
  (n = Vr.get(e)) == null || n.forEach((r) => {
    r(e, {
      get width() {
        return Cw(e, t);
      },
      get height() {
        return Ow(e, t);
      }
    });
  });
}
function Aw(e) {
  e.forEach($w);
}
function Mw() {
  typeof ResizeObserver != "undefined" && (Ft = new ResizeObserver(Aw));
}
function Rw(e, t) {
  Ft || Mw();
  const n = Xf(e);
  return n.forEach((r) => {
    let i = Vr.get(r);
    i || (i = /* @__PURE__ */ new Set(), Vr.set(r, i)), i.add(t), Ft == null || Ft.observe(r);
  }), () => {
    n.forEach((r) => {
      const i = Vr.get(r);
      i == null || i.delete(t), i != null && i.size || Ft == null || Ft.unobserve(r);
    });
  };
}
const Br = /* @__PURE__ */ new Set();
let vn;
function Dw() {
  vn = () => {
    const e = {
      get width() {
        return window.innerWidth;
      },
      get height() {
        return window.innerHeight;
      }
    };
    Br.forEach((t) => t(e));
  }, window.addEventListener("resize", vn);
}
function Lw(e) {
  return Br.add(e), vn || Dw(), () => {
    Br.delete(e), !Br.size && typeof vn == "function" && (window.removeEventListener("resize", vn), vn = void 0);
  };
}
function Xl(e, t) {
  return typeof e == "function" ? Lw(e) : Rw(e, t);
}
function Fw(e) {
  return wa(e) && e.tagName === "svg";
}
const Iw = [...Kf, Oe, Kt], Nw = (e) => Iw.find(Uf(e)), ql = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), bn = () => ({
  x: ql(),
  y: ql()
}), Zl = () => ({ min: 0, max: 0 }), Ae = () => ({
  x: Zl(),
  y: Zl()
}), Vw = /* @__PURE__ */ new WeakMap();
function _i(e) {
  return e !== null && typeof e == "object" && typeof e.start == "function";
}
function or(e) {
  return typeof e == "string" || Array.isArray(e);
}
const Ea = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], Sa = ["initial", ...Ea];
function Wi(e) {
  return _i(e.animate) || Sa.some((t) => or(e[t]));
}
function th(e) {
  return !!(Wi(e) || e.variants);
}
function Bw(e, t, n) {
  for (const r in t) {
    const i = t[r], o = n[r];
    if (Ve(i))
      e.addValue(r, i);
    else if (Ve(o))
      e.addValue(r, Cn(i, { owner: e }));
    else if (o !== i)
      if (e.hasValue(r)) {
        const s = e.getValue(r);
        s.liveStyle === !0 ? s.jump(i) : s.hasAnimated || s.set(i);
      } else {
        const s = e.getStaticValue(r);
        e.addValue(r, Cn(s !== void 0 ? s : i, { owner: e }));
      }
  }
  for (const r in n)
    t[r] === void 0 && e.removeValue(r);
  return t;
}
const is = { current: null }, nh = { current: !1 }, jw = typeof window != "undefined";
function zw() {
  if (nh.current = !0, !!jw)
    if (window.matchMedia) {
      const e = window.matchMedia("(prefers-reduced-motion)"), t = () => is.current = e.matches;
      e.addEventListener("change", t), t();
    } else
      is.current = !1;
}
const Ql = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let ri = {};
function rh(e) {
  ri = e;
}
function _w() {
  return ri;
}
class Ww {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(t, n, r) {
    return {};
  }
  constructor({ parent: t, props: n, presenceContext: r, reducedMotionConfig: i, skipAnimations: o, blockInitialAnimation: s, visualState: a }, l = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = ha, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const p = ze.now();
      this.renderScheduledAt < p && (this.renderScheduledAt = p, Ee.render(this.render, !1, !0));
    };
    const { latestValues: u, renderState: c } = a;
    this.latestValues = u, this.baseTarget = v({}, u), this.initialValues = n.initial ? v({}, u) : {}, this.renderState = c, this.parent = t, this.props = n, this.presenceContext = r, this.depth = t ? t.depth + 1 : 0, this.reducedMotionConfig = i, this.skipAnimationsConfig = o, this.options = l, this.blockInitialAnimation = !!s, this.isControllingVariants = Wi(n), this.isVariantNode = th(n), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(t && t.current);
    const d = this.scrapeMotionValuesFromProps(n, {}, this), { willChange: f } = d, h = k(d, ["willChange"]);
    for (const p in h) {
      const m = h[p];
      u[p] !== void 0 && Ve(m) && m.set(u[p]);
    }
  }
  mount(t) {
    var n, r, i;
    if (this.hasBeenMounted)
      for (const o in this.initialValues)
        (n = this.values.get(o)) == null || n.jump(this.initialValues[o]), this.latestValues[o] = this.initialValues[o];
    this.current = t, Vw.set(t, this), this.projection && !this.projection.instance && this.projection.mount(t), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((o, s) => this.bindToMotionValue(s, o)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (nh.current || zw(), this.shouldReduceMotion = is.current), process.env.NODE_ENV !== "production" && na(this.shouldReduceMotion !== !0, "You have Reduced Motion enabled on your device. Animations may not appear as expected.", "reduced-motion-disabled"), this.shouldSkipAnimations = (r = this.skipAnimationsConfig) != null ? r : !1, (i = this.parent) == null || i.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    var t;
    this.projection && this.projection.unmount(), Ut(this.notifyUpdate), Ut(this.render), this.valueSubscriptions.forEach((n) => n()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), (t = this.parent) == null || t.removeChild(this);
    for (const n in this.events)
      this.events[n].clear();
    for (const n in this.features) {
      const r = this.features[n];
      r && (r.unmount(), r.isMounted = !1);
    }
    this.current = null;
  }
  addChild(t) {
    var n;
    this.children.add(t), (n = this.enteringChildren) != null || (this.enteringChildren = /* @__PURE__ */ new Set()), this.enteringChildren.add(t);
  }
  removeChild(t) {
    this.children.delete(t), this.enteringChildren && this.enteringChildren.delete(t);
  }
  bindToMotionValue(t, n) {
    if (this.valueSubscriptions.has(t) && this.valueSubscriptions.get(t)(), n.accelerate && vw.has(t) && this.current instanceof HTMLElement) {
      const { factory: s, keyframes: a, times: l, ease: u, duration: c } = n.accelerate, f = new If({
        element: this.current,
        name: t,
        keyframes: a,
        times: l,
        ease: u,
        duration: /* @__PURE__ */ Je(c)
      }), h = s(f);
      this.valueSubscriptions.set(t, () => {
        h(), f.cancel();
      });
      return;
    }
    const r = Nn.has(t);
    r && this.onBindTransform && this.onBindTransform();
    const i = n.on("change", (s) => {
      this.latestValues[t] = s, this.props.onUpdate && Ee.preRender(this.notifyUpdate), r && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let o;
    typeof window != "undefined" && window.MotionCheckAppearSync && (o = window.MotionCheckAppearSync(this, t, n)), this.valueSubscriptions.set(t, () => {
      i(), o && o(), n.owner && n.stop();
    });
  }
  sortNodePosition(t) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== t.type ? 0 : this.sortInstanceNodePosition(this.current, t.current);
  }
  updateFeatures() {
    let t = "animation";
    for (t in ri) {
      const n = ri[t];
      if (!n)
        continue;
      const { isEnabled: r, Feature: i } = n;
      if (!this.features[t] && i && r(this.props) && (this.features[t] = new i(this)), this.features[t]) {
        const o = this.features[t];
        o.isMounted ? o.update() : (o.mount(), o.isMounted = !0);
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : Ae();
  }
  getStaticValue(t) {
    return this.latestValues[t];
  }
  setStaticValue(t, n) {
    this.latestValues[t] = n;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(t, n) {
    (t.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = t, this.prevPresenceContext = this.presenceContext, this.presenceContext = n;
    for (let r = 0; r < Ql.length; r++) {
      const i = Ql[r];
      this.propEventSubscriptions[i] && (this.propEventSubscriptions[i](), delete this.propEventSubscriptions[i]);
      const o = "on" + i, s = t[o];
      s && (this.propEventSubscriptions[i] = this.on(i, s));
    }
    this.prevMotionValues = Bw(this, this.scrapeMotionValuesFromProps(t, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(t) {
    return this.props.variants ? this.props.variants[t] : void 0;
  }
  /**
   * Returns the defined default transition on this component.
   */
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(t) {
    const n = this.getClosestVariantNode();
    if (n)
      return n.variantChildren && n.variantChildren.add(t), () => n.variantChildren.delete(t);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(t, n) {
    const r = this.values.get(t);
    n !== r && (r && this.removeValue(t), this.bindToMotionValue(t, n), this.values.set(t, n), this.latestValues[t] = n.get());
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(t) {
    this.values.delete(t);
    const n = this.valueSubscriptions.get(t);
    n && (n(), this.valueSubscriptions.delete(t)), delete this.latestValues[t], this.removeValueFromRenderState(t, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(t) {
    return this.values.has(t);
  }
  getValue(t, n) {
    if (this.props.values && this.props.values[t])
      return this.props.values[t];
    let r = this.values.get(t);
    return r === void 0 && n !== void 0 && (r = Cn(n === null ? void 0 : n, { owner: this }), this.addValue(t, r)), r;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(t, n) {
    var i;
    let r = this.latestValues[t] !== void 0 || !this.current ? this.latestValues[t] : (i = this.getBaseTargetFromProps(this.props, t)) != null ? i : this.readValueFromInstance(this.current, t, this.options);
    return r != null && (typeof r == "string" && (rf(r) || sf(r)) ? r = parseFloat(r) : !Nw(r) && Kt.test(n) && (r = Yf(t, n)), this.setBaseTarget(t, Ve(r) ? r.get() : r)), Ve(r) ? r.get() : r;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(t, n) {
    this.baseTarget[t] = n;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(t) {
    var o;
    const { initial: n } = this.props;
    let r;
    if (typeof n == "string" || typeof n == "object") {
      const s = ga(this.props, n, (o = this.presenceContext) == null ? void 0 : o.custom);
      s && (r = s[t]);
    }
    if (n && r !== void 0)
      return r;
    const i = this.getBaseTargetFromProps(this.props, t);
    return i !== void 0 && !Ve(i) ? i : this.initialValues[t] !== void 0 && r === void 0 ? void 0 : this.baseTarget[t];
  }
  on(t, n) {
    return this.events[t] || (this.events[t] = new ta()), this.events[t].add(n);
  }
  notify(t, ...n) {
    this.events[t] && this.events[t].notify(...n);
  }
  scheduleRenderMicrotask() {
    ya.render(this.render);
  }
}
class ih extends Ww {
  constructor() {
    super(...arguments), this.KeyframeResolver = gw;
  }
  sortInstanceNodePosition(t, n) {
    return t.compareDocumentPosition(n) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(t, n) {
    const r = t.style;
    return r ? r[n] : void 0;
  }
  removeValueFromRenderState(t, { vars: n, style: r }) {
    delete n[t], delete r[t];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: t } = this.props;
    Ve(t) && (this.childSubscription = t.on("change", (n) => {
      this.current && (this.current.textContent = `${n}`);
    }));
  }
}
let Yt = class {
  constructor(t) {
    this.isMounted = !1, this.node = t;
  }
  update() {
  }
};
function oh({ top: e, left: t, right: n, bottom: r }) {
  return {
    x: { min: t, max: n },
    y: { min: e, max: r }
  };
}
function Hw({ x: e, y: t }) {
  return { top: t.min, right: e.max, bottom: t.max, left: e.min };
}
function Uw(e, t) {
  if (!t)
    return e;
  const n = t({ x: e.left, y: e.top }), r = t({ x: e.right, y: e.bottom });
  return {
    top: n.y,
    left: n.x,
    bottom: r.y,
    right: r.x
  };
}
function go(e) {
  return e === void 0 || e === 1;
}
function os({ scale: e, scaleX: t, scaleY: n }) {
  return !go(e) || !go(t) || !go(n);
}
function Zt(e) {
  return os(e) || sh(e) || e.z || e.rotate || e.rotateX || e.rotateY || e.skewX || e.skewY;
}
function sh(e) {
  return Jl(e.x) || Jl(e.y);
}
function Jl(e) {
  return e && e !== "0%";
}
function ii(e, t, n) {
  const r = e - n, i = t * r;
  return n + i;
}
function ec(e, t, n, r, i) {
  return i !== void 0 && (e = ii(e, i, r)), ii(e, n, r) + t;
}
function ss(e, t = 0, n = 1, r, i) {
  e.min = ec(e.min, t, n, r, i), e.max = ec(e.max, t, n, r, i);
}
function ah(e, { x: t, y: n }) {
  ss(e.x, t.translate, t.scale, t.originPoint), ss(e.y, n.translate, n.scale, n.originPoint);
}
const tc = 0.999999999999, nc = 1.0000000000001;
function Kw(e, t, n, r = !1) {
  const i = n.length;
  if (!i)
    return;
  t.x = t.y = 1;
  let o, s;
  for (let a = 0; a < i; a++) {
    o = n[a], s = o.projectionDelta;
    const { visualElement: l } = o.options;
    l && l.props.style && l.props.style.display === "contents" || (r && o.options.layoutScroll && o.scroll && o !== o.root && xn(e, {
      x: -o.scroll.offset.x,
      y: -o.scroll.offset.y
    }), s && (t.x *= s.x.scale, t.y *= s.y.scale, ah(e, s)), r && Zt(o.latestValues) && xn(e, o.latestValues));
  }
  t.x < nc && t.x > tc && (t.x = 1), t.y < nc && t.y > tc && (t.y = 1);
}
function yn(e, t) {
  e.min = e.min + t, e.max = e.max + t;
}
function rc(e, t, n, r, i = 0.5) {
  const o = Pe(e.min, e.max, i);
  ss(e, t, n, o, r);
}
function xn(e, t) {
  rc(e.x, t.x, t.scaleX, t.scale, t.originX), rc(e.y, t.y, t.scaleY, t.scale, t.originY);
}
function lh(e, t) {
  return oh(Uw(e.getBoundingClientRect(), t));
}
function Gw(e, t, n) {
  const r = lh(e, n), { scroll: i } = t;
  return i && (yn(r.x, i.offset.x), yn(r.y, i.offset.y)), r;
}
const Yw = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, Xw = In.length;
function qw(e, t, n) {
  let r = "", i = !0;
  for (let o = 0; o < Xw; o++) {
    const s = In[o], a = e[s];
    if (a === void 0)
      continue;
    let l = !0;
    if (typeof a == "number")
      l = a === (s.startsWith("scale") ? 1 : 0);
    else {
      const u = parseFloat(a);
      l = s.startsWith("scale") ? u === 1 : u === 0;
    }
    if (!l || n) {
      const u = qf(a, ba[s]);
      if (!l) {
        i = !1;
        const c = Yw[s] || s;
        r += `${c}(${u}) `;
      }
      n && (t[s] = u);
    }
  }
  return r = r.trim(), n ? r = n(t, i ? "" : r) : i && (r = "none"), r;
}
function Ta(e, t, n) {
  const { style: r, vars: i, transformOrigin: o } = e;
  let s = !1, a = !1;
  for (const l in t) {
    const u = t[l];
    if (Nn.has(l)) {
      s = !0;
      continue;
    } else if (xf(l)) {
      i[l] = u;
      continue;
    } else {
      const c = qf(u, ba[l]);
      l.startsWith("origin") ? (a = !0, o[l] = c) : r[l] = c;
    }
  }
  if (t.transform || (s || n ? r.transform = qw(t, e.transform, n) : r.transform && (r.transform = "none")), a) {
    const { originX: l = "50%", originY: u = "50%", originZ: c = 0 } = o;
    r.transformOrigin = `${l} ${u} ${c}`;
  }
}
function ch(e, { style: t, vars: n }, r, i) {
  const o = e.style;
  let s;
  for (s in t)
    o[s] = t[s];
  i == null || i.applyProjectionStyles(o, r);
  for (s in n)
    o.setProperty(s, n[s]);
}
function ic(e, t) {
  return t.max === t.min ? 0 : e / (t.max - t.min) * 100;
}
const Bn = {
  correct: (e, t) => {
    if (!t.target)
      return e;
    if (typeof e == "string")
      if (q.test(e))
        e = parseFloat(e);
      else
        return e;
    const n = ic(e, t.target.x), r = ic(e, t.target.y);
    return `${n}% ${r}%`;
  }
}, Zw = {
  correct: (e, { treeScale: t, projectionDelta: n }) => {
    const r = e, i = Kt.parse(e);
    if (i.length > 5)
      return r;
    const o = Kt.createTransformer(e), s = typeof i[0] != "number" ? 1 : 0, a = n.x.scale * t.x, l = n.y.scale * t.y;
    i[0 + s] /= a, i[1 + s] /= l;
    const u = Pe(a, l, 0.5);
    return typeof i[2 + s] == "number" && (i[2 + s] /= u), typeof i[3 + s] == "number" && (i[3 + s] /= u), o(i);
  }
}, as = {
  borderRadius: E(v({}, Bn), {
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  }),
  borderTopLeftRadius: Bn,
  borderTopRightRadius: Bn,
  borderBottomLeftRadius: Bn,
  borderBottomRightRadius: Bn,
  boxShadow: Zw
};
function uh(e, { layout: t, layoutId: n }) {
  return Nn.has(e) || e.startsWith("origin") || (t || n !== void 0) && (!!as[e] || e === "opacity");
}
function Pa(e, t, n) {
  var s;
  const r = e.style, i = t == null ? void 0 : t.style, o = {};
  if (!r)
    return o;
  for (const a in r)
    (Ve(r[a]) || i && Ve(i[a]) || uh(a, e) || ((s = n == null ? void 0 : n.getValue(a)) == null ? void 0 : s.liveStyle) !== void 0) && (o[a] = r[a]);
  return o;
}
function Qw(e) {
  return window.getComputedStyle(e);
}
class Jw extends ih {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = ch;
  }
  readValueFromInstance(t, n) {
    var r;
    if (Nn.has(n))
      return (r = this.projection) != null && r.isProjecting ? Go(n) : v1(t, n);
    {
      const i = Qw(t), o = (xf(n) ? i.getPropertyValue(n) : i[n]) || 0;
      return typeof o == "string" ? o.trim() : o;
    }
  }
  measureInstanceViewportBox(t, { transformPagePoint: n }) {
    return lh(t, n);
  }
  build(t, n, r) {
    Ta(t, n, r.transformTemplate);
  }
  scrapeMotionValuesFromProps(t, n, r) {
    return Pa(t, n, r);
  }
}
const e5 = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, t5 = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function n5(e, t, n = 1, r = 0, i = !0) {
  e.pathLength = 1;
  const o = i ? e5 : t5;
  e[o.offset] = `${-r}`, e[o.array] = `${t} ${n}`;
}
const r5 = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function dh(e, f, l, u, c) {
  var h = f, {
    attrX: t,
    attrY: n,
    attrScale: r,
    pathLength: i,
    pathSpacing: o = 1,
    pathOffset: s = 0
  } = h, a = k(h, [
    "attrX",
    "attrY",
    "attrScale",
    "pathLength",
    "pathSpacing",
    "pathOffset"
  ]);
  var m, g;
  if (Ta(e, a, u), l) {
    e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
    return;
  }
  e.attrs = e.style, e.style = {};
  const { attrs: d, style: p } = e;
  d.transform && (p.transform = d.transform, delete d.transform), (p.transform || d.transformOrigin) && (p.transformOrigin = (m = d.transformOrigin) != null ? m : "50% 50%", delete d.transformOrigin), p.transform && (p.transformBox = (g = c == null ? void 0 : c.transformBox) != null ? g : "fill-box", delete d.transformBox);
  for (const y of r5)
    d[y] !== void 0 && (p[y] = d[y], delete d[y]);
  t !== void 0 && (d.x = t), n !== void 0 && (d.y = n), r !== void 0 && (d.scale = r), i !== void 0 && n5(d, i, o, s, !1);
}
const fh = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust"
]), hh = (e) => typeof e == "string" && e.toLowerCase() === "svg";
function i5(e, t, n, r) {
  ch(e, t, void 0, r);
  for (const i in t.attrs)
    e.setAttribute(fh.has(i) ? i : va(i), t.attrs[i]);
}
function ph(e, t, n) {
  const r = Pa(e, t, n);
  for (const i in e)
    if (Ve(e[i]) || Ve(t[i])) {
      const o = In.indexOf(i) !== -1 ? "attr" + i.charAt(0).toUpperCase() + i.substring(1) : i;
      r[o] = e[i];
    }
  return r;
}
class o5 extends ih {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = Ae;
  }
  getBaseTargetFromProps(t, n) {
    return t[n];
  }
  readValueFromInstance(t, n) {
    if (Nn.has(n)) {
      const r = Gf(n);
      return r && r.default || 0;
    }
    return n = fh.has(n) ? n : va(n), t.getAttribute(n);
  }
  scrapeMotionValuesFromProps(t, n, r) {
    return ph(t, n, r);
  }
  build(t, n, r) {
    dh(t, n, this.isSVGTag, r.transformTemplate, r.style);
  }
  renderInstance(t, n, r, i) {
    i5(t, n, r, i);
  }
  mount(t) {
    this.isSVGTag = hh(t.tagName), super.mount(t);
  }
}
const s5 = Sa.length;
function mh(e) {
  if (!e)
    return;
  if (!e.isControllingVariants) {
    const n = e.parent ? mh(e.parent) || {} : {};
    return e.props.initial !== void 0 && (n.initial = e.props.initial), n;
  }
  const t = {};
  for (let n = 0; n < s5; n++) {
    const r = Sa[n], i = e.props[r];
    (or(i) || i === !1) && (t[r] = i);
  }
  return t;
}
function gh(e, t) {
  if (!Array.isArray(t))
    return !1;
  const n = t.length;
  if (n !== e.length)
    return !1;
  for (let r = 0; r < n; r++)
    if (t[r] !== e[r])
      return !1;
  return !0;
}
const a5 = [...Ea].reverse(), l5 = Ea.length;
function c5(e) {
  return (t) => Promise.all(t.map(({ animation: n, options: r }) => sw(e, n, r)));
}
function u5(e) {
  let t = c5(e), n = oc(), r = !0;
  const i = (l) => (u, c) => {
    var h;
    const f = Sn(e, c, l === "exit" ? (h = e.presenceContext) == null ? void 0 : h.custom : void 0);
    if (f) {
      const d = f, { transition: p, transitionEnd: m } = d, g = k(d, ["transition", "transitionEnd"]);
      u = v(v(v({}, u), g), m);
    }
    return u;
  };
  function o(l) {
    t = l(e);
  }
  function s(l) {
    const { props: u } = e, c = mh(e.parent) || {}, f = [], h = /* @__PURE__ */ new Set();
    let d = {}, p = 1 / 0;
    for (let g = 0; g < l5; g++) {
      const y = a5[g], w = n[y], b = u[y] !== void 0 ? u[y] : c[y], T = or(b), P = y === l ? w.isActive : null;
      P === !1 && (p = g);
      let C = b === c[y] && b !== u[y] && T;
      if (C && r && e.manuallyAnimateOnMount && (C = !1), w.protectedKeys = v({}, d), // If it isn't active and hasn't *just* been set as inactive
      !w.isActive && P === null || // If we didn't and don't have any defined prop for this animation type
      !b && !w.prevProp || // Or if the prop doesn't define an animation
      _i(b) || typeof b == "boolean")
        continue;
      if (y === "exit" && w.isActive && P !== !0) {
        w.prevResolvedValues && (d = v(v({}, d), w.prevResolvedValues));
        continue;
      }
      const A = d5(w.prevProp, b);
      let $ = A || // If we're making this variant active, we want to always make it active
      y === l && w.isActive && !C && T || // If we removed a higher-priority variant (i is in reverse order)
      g > p && T, F = !1;
      const R = Array.isArray(b) ? b : [b];
      let M = R.reduce(i(y), {});
      P === !1 && (M = {});
      const { prevResolvedValues: W = {} } = w, N = v(v({}, W), M), H = (U) => {
        $ = !0, h.has(U) && (F = !0, h.delete(U)), w.needsAnimating[U] = !0;
        const K = e.getValue(U);
        K && (K.liveStyle = !1);
      };
      for (const U in N) {
        const K = M[U], Q = W[U];
        if (d.hasOwnProperty(U))
          continue;
        let Z = !1;
        Jo(K) && Jo(Q) ? Z = !gh(K, Q) : Z = K !== Q, Z ? K != null ? H(U) : h.add(U) : K !== void 0 && h.has(U) ? H(U) : w.protectedKeys[U] = !0;
      }
      w.prevProp = b, w.prevResolvedValues = M, w.isActive && (d = v(v({}, d), M)), r && e.blockInitialAnimation && ($ = !1);
      const G = C && A;
      $ && (!G || F) && f.push(...R.map((U) => {
        const K = { type: y };
        if (typeof U == "string" && r && !G && e.manuallyAnimateOnMount && e.parent) {
          const { parent: Q } = e, Z = Sn(Q, U);
          if (Q.enteringChildren && Z) {
            const { delayChildren: X } = Z.transition || {};
            K.delay = Vf(Q.enteringChildren, e, X);
          }
        }
        return {
          animation: U,
          options: K
        };
      }));
    }
    if (h.size) {
      const g = {};
      if (typeof u.initial != "boolean") {
        const y = Sn(e, Array.isArray(u.initial) ? u.initial[0] : u.initial);
        y && y.transition && (g.transition = y.transition);
      }
      h.forEach((y) => {
        const w = e.getBaseTarget(y), b = e.getValue(y);
        b && (b.liveStyle = !0), g[y] = w != null ? w : null;
      }), f.push({ animation: g });
    }
    let m = !!f.length;
    return r && (u.initial === !1 || u.initial === u.animate) && !e.manuallyAnimateOnMount && (m = !1), r = !1, m ? t(f) : Promise.resolve();
  }
  function a(l, u) {
    var f;
    if (n[l].isActive === u)
      return Promise.resolve();
    (f = e.variantChildren) == null || f.forEach((h) => {
      var d;
      return (d = h.animationState) == null ? void 0 : d.setActive(l, u);
    }), n[l].isActive = u;
    const c = s(l);
    for (const h in n)
      n[h].protectedKeys = {};
    return c;
  }
  return {
    animateChanges: s,
    setActive: a,
    setAnimateFunction: o,
    getState: () => n,
    reset: () => {
      n = oc();
    }
  };
}
function d5(e, t) {
  return typeof t == "string" ? t !== e : Array.isArray(t) ? !gh(t, e) : !1;
}
function qt(e = !1) {
  return {
    isActive: e,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function oc() {
  return {
    animate: qt(!0),
    whileInView: qt(),
    whileHover: qt(),
    whileTap: qt(),
    whileDrag: qt(),
    whileFocus: qt(),
    exit: qt()
  };
}
function sc(e, t) {
  e.min = t.min, e.max = t.max;
}
function et(e, t) {
  sc(e.x, t.x), sc(e.y, t.y);
}
function ac(e, t) {
  e.translate = t.translate, e.scale = t.scale, e.originPoint = t.originPoint, e.origin = t.origin;
}
const vh = 1e-4, f5 = 1 - vh, h5 = 1 + vh, bh = 0.01, p5 = 0 - bh, m5 = 0 + bh;
function _e(e) {
  return e.max - e.min;
}
function g5(e, t, n) {
  return Math.abs(e - t) <= n;
}
function lc(e, t, n, r = 0.5) {
  e.origin = r, e.originPoint = Pe(t.min, t.max, e.origin), e.scale = _e(n) / _e(t), e.translate = Pe(n.min, n.max, e.origin) - e.originPoint, (e.scale >= f5 && e.scale <= h5 || isNaN(e.scale)) && (e.scale = 1), (e.translate >= p5 && e.translate <= m5 || isNaN(e.translate)) && (e.translate = 0);
}
function Kn(e, t, n, r) {
  lc(e.x, t.x, n.x, r ? r.originX : void 0), lc(e.y, t.y, n.y, r ? r.originY : void 0);
}
function cc(e, t, n) {
  e.min = n.min + t.min, e.max = e.min + _e(t);
}
function v5(e, t, n) {
  cc(e.x, t.x, n.x), cc(e.y, t.y, n.y);
}
function uc(e, t, n) {
  e.min = t.min - n.min, e.max = e.min + _e(t);
}
function oi(e, t, n) {
  uc(e.x, t.x, n.x), uc(e.y, t.y, n.y);
}
function dc(e, t, n, r, i) {
  return e -= t, e = ii(e, 1 / n, r), i !== void 0 && (e = ii(e, 1 / i, r)), e;
}
function b5(e, t = 0, n = 1, r = 0.5, i, o = e, s = e) {
  if (pt.test(t) && (t = parseFloat(t), t = Pe(s.min, s.max, t / 100) - s.min), typeof t != "number")
    return;
  let a = Pe(o.min, o.max, r);
  e === o && (a -= t), e.min = dc(e.min, t, n, a, i), e.max = dc(e.max, t, n, a, i);
}
function fc(e, t, [n, r, i], o, s) {
  b5(e, t[n], t[r], t[i], t.scale, o, s);
}
const y5 = ["x", "scaleX", "originX"], x5 = ["y", "scaleY", "originY"];
function hc(e, t, n, r) {
  fc(e.x, t, y5, n ? n.x : void 0, r ? r.x : void 0), fc(e.y, t, x5, n ? n.y : void 0, r ? r.y : void 0);
}
function pc(e) {
  return e.translate === 0 && e.scale === 1;
}
function yh(e) {
  return pc(e.x) && pc(e.y);
}
function mc(e, t) {
  return e.min === t.min && e.max === t.max;
}
function w5(e, t) {
  return mc(e.x, t.x) && mc(e.y, t.y);
}
function gc(e, t) {
  return Math.round(e.min) === Math.round(t.min) && Math.round(e.max) === Math.round(t.max);
}
function xh(e, t) {
  return gc(e.x, t.x) && gc(e.y, t.y);
}
function vc(e) {
  return _e(e.x) / _e(e.y);
}
function bc(e, t) {
  return e.translate === t.translate && e.scale === t.scale && e.originPoint === t.originPoint;
}
function lt(e) {
  return [e("x"), e("y")];
}
function E5(e, t, n) {
  let r = "";
  const i = e.x.translate / t.x, o = e.y.translate / t.y, s = (n == null ? void 0 : n.z) || 0;
  if ((i || o || s) && (r = `translate3d(${i}px, ${o}px, ${s}px) `), (t.x !== 1 || t.y !== 1) && (r += `scale(${1 / t.x}, ${1 / t.y}) `), n) {
    const { transformPerspective: u, rotate: c, rotateX: f, rotateY: h, skewX: d, skewY: p } = n;
    u && (r = `perspective(${u}px) ${r}`), c && (r += `rotate(${c}deg) `), f && (r += `rotateX(${f}deg) `), h && (r += `rotateY(${h}deg) `), d && (r += `skewX(${d}deg) `), p && (r += `skewY(${p}deg) `);
  }
  const a = e.x.scale * t.x, l = e.y.scale * t.y;
  return (a !== 1 || l !== 1) && (r += `scale(${a}, ${l})`), r || "none";
}
const wh = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"], S5 = wh.length, yc = (e) => typeof e == "string" ? parseFloat(e) : e, xc = (e) => typeof e == "number" || q.test(e);
function T5(e, t, n, r, i, o) {
  var s, a, l, u;
  i ? (e.opacity = Pe(0, (s = n.opacity) != null ? s : 1, P5(r)), e.opacityExit = Pe((a = t.opacity) != null ? a : 1, 0, k5(r))) : o && (e.opacity = Pe((l = t.opacity) != null ? l : 1, (u = n.opacity) != null ? u : 1, r));
  for (let c = 0; c < S5; c++) {
    const f = `border${wh[c]}Radius`;
    let h = wc(t, f), d = wc(n, f);
    if (h === void 0 && d === void 0)
      continue;
    h || (h = 0), d || (d = 0), h === 0 || d === 0 || xc(h) === xc(d) ? (e[f] = Math.max(Pe(yc(h), yc(d), r), 0), (pt.test(d) || pt.test(h)) && (e[f] += "%")) : e[f] = d;
  }
  (t.rotate || n.rotate) && (e.rotate = Pe(t.rotate || 0, n.rotate || 0, r));
}
function wc(e, t) {
  return e[t] !== void 0 ? e[t] : e.borderRadius;
}
const P5 = /* @__PURE__ */ Eh(0, 0.5, pf), k5 = /* @__PURE__ */ Eh(0.5, 0.95, Qe);
function Eh(e, t, n) {
  return (r) => r < e ? 0 : r > t ? 1 : n(/* @__PURE__ */ nr(e, t, r));
}
function C5(e, t, n) {
  const r = Ve(e) ? e : Cn(e);
  return r.start(ma("", r, t, n)), r.animation;
}
function sr(e, t, n, r = { passive: !0 }) {
  return e.addEventListener(t, n, r), () => e.removeEventListener(t, n);
}
const O5 = (e, t) => e.depth - t.depth;
class $5 {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(t) {
    Js(this.children, t), this.isDirty = !0;
  }
  remove(t) {
    Jr(this.children, t), this.isDirty = !0;
  }
  forEach(t) {
    this.isDirty && this.children.sort(O5), this.isDirty = !1, this.children.forEach(t);
  }
}
function A5(e, t) {
  const n = ze.now(), r = ({ timestamp: i }) => {
    const o = i - n;
    o >= t && (Ut(r), e(o - t));
  };
  return Ee.setup(r, !0), () => Ut(r);
}
function jr(e) {
  return Ve(e) ? e.get() : e;
}
class M5 {
  constructor() {
    this.members = [];
  }
  add(t) {
    Js(this.members, t);
    for (let n = this.members.length - 1; n >= 0; n--) {
      const r = this.members[n];
      if (r === t || r === this.lead || r === this.prevLead)
        continue;
      const i = r.instance;
      i && i.isConnected === !1 && r.isPresent !== !1 && !r.snapshot && Jr(this.members, r);
    }
    t.scheduleRender();
  }
  remove(t) {
    if (Jr(this.members, t), t === this.prevLead && (this.prevLead = void 0), t === this.lead) {
      const n = this.members[this.members.length - 1];
      n && this.promote(n);
    }
  }
  relegate(t) {
    const n = this.members.findIndex((i) => t === i);
    if (n === 0)
      return !1;
    let r;
    for (let i = n; i >= 0; i--) {
      const o = this.members[i], s = o.instance;
      if (o.isPresent !== !1 && (!s || s.isConnected !== !1)) {
        r = o;
        break;
      }
    }
    return r ? (this.promote(r), !0) : !1;
  }
  promote(t, n) {
    const r = this.lead;
    if (t !== r && (this.prevLead = r, this.lead = t, t.show(), r)) {
      r.instance && r.scheduleRender(), t.scheduleRender();
      const i = r.options.layoutDependency, o = t.options.layoutDependency;
      if (!(i !== void 0 && o !== void 0 && i === o)) {
        const l = r.instance;
        l && l.isConnected === !1 && !r.snapshot || (t.resumeFrom = r, n && (t.resumeFrom.preserveOpacity = !0), r.snapshot && (t.snapshot = r.snapshot, t.snapshot.latestValues = r.animationValues || r.latestValues), t.root && t.root.isUpdating && (t.isLayoutDirty = !0));
      }
      const { crossfade: a } = t.options;
      a === !1 && r.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((t) => {
      const { options: n, resumingFrom: r } = t;
      n.onExitComplete && n.onExitComplete(), r && r.options.onExitComplete && r.options.onExitComplete();
    });
  }
  scheduleRender() {
    this.members.forEach((t) => {
      t.instance && t.scheduleRender(!1);
    });
  }
  /**
   * Clear any leads that have been removed this render to prevent them from being
   * used in future animations and to prevent memory leaks
   */
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
  }
}
const zr = {
  /**
   * Global flag as to whether the tree has animated since the last time
   * we resized the window
   */
  hasAnimatedSinceResize: !0,
  /**
   * We set this to true once, on the first update. Any nodes added to the tree beyond that
   * update will be given a `data-projection-id` attribute.
   */
  hasEverUpdated: !1
}, vo = ["", "X", "Y", "Z"], R5 = 1e3;
let D5 = 0;
function bo(e, t, n, r) {
  const { latestValues: i } = t;
  i[e] && (n[e] = i[e], t.setStaticValue(e, 0), r && (r[e] = 0));
}
function Sh(e) {
  if (e.hasCheckedOptimisedAppear = !0, e.root === e)
    return;
  const { visualElement: t } = e.options;
  if (!t)
    return;
  const n = Wf(t);
  if (window.MotionHasOptimisedAnimation(n, "transform")) {
    const { layout: i, layoutId: o } = e.options;
    window.MotionCancelOptimisedAnimation(n, "transform", Ee, !(i || o));
  }
  const { parent: r } = e;
  r && !r.hasCheckedOptimisedAppear && Sh(r);
}
function Th({ attachResizeListener: e, defaultParent: t, measureScroll: n, checkIsScrollRoot: r, resetTransform: i }) {
  return class {
    constructor(s = {}, a = t == null ? void 0 : t()) {
      this.id = D5++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.layoutVersion = 0, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach(I5), this.nodes.forEach(j5), this.nodes.forEach(z5), this.nodes.forEach(N5);
      }, this.resolvedRelativeTargetAt = 0, this.linkedParentVersion = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = s, this.root = a ? a.root || a : this, this.path = a ? [...a.path, a] : [], this.parent = a, this.depth = a ? a.depth + 1 : 0;
      for (let l = 0; l < this.path.length; l++)
        this.path[l].shouldResetTransform = !0;
      this.root === this && (this.nodes = new $5());
    }
    addEventListener(s, a) {
      return this.eventHandlers.has(s) || this.eventHandlers.set(s, new ta()), this.eventHandlers.get(s).add(a);
    }
    notifyListeners(s, ...a) {
      const l = this.eventHandlers.get(s);
      l && l.notify(...a);
    }
    hasListeners(s) {
      return this.eventHandlers.has(s);
    }
    /**
     * Lifecycles
     */
    mount(s) {
      if (this.instance)
        return;
      this.isSVG = wa(s) && !Fw(s), this.instance = s;
      const { layoutId: a, layout: l, visualElement: u } = this.options;
      if (u && !u.current && u.mount(s), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (l || a) && (this.isLayoutDirty = !0), e) {
        let c, f = 0;
        const h = () => this.root.updateBlockedByResize = !1;
        Ee.read(() => {
          f = window.innerWidth;
        }), e(s, () => {
          const d = window.innerWidth;
          d !== f && (f = d, this.root.updateBlockedByResize = !0, c && c(), c = A5(h, 250), zr.hasAnimatedSinceResize && (zr.hasAnimatedSinceResize = !1, this.nodes.forEach(Tc)));
        });
      }
      a && this.root.registerSharedNode(a, this), this.options.animate !== !1 && u && (a || l) && this.addEventListener("didUpdate", ({ delta: c, hasLayoutChanged: f, hasRelativeLayoutChanged: h, layout: d }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const p = this.options.transition || u.getDefaultTransition() || K5, { onLayoutAnimationStart: m, onLayoutAnimationComplete: g } = u.getProps(), y = !this.targetLayout || !xh(this.targetLayout, d), w = !f && h;
        if (this.options.layoutRoot || this.resumeFrom || w || f && (y || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const b = E(v({}, pa(p, "layout")), {
            onPlay: m,
            onComplete: g
          });
          (u.shouldReduceMotion || this.options.layoutRoot) && (b.delay = 0, b.type = !1), this.startAnimation(b), this.setAnimationOrigin(c, w);
        } else
          f || Tc(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = d;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const s = this.getStack();
      s && s.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), Ut(this.updateProjection);
    }
    // only on the root
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || !1;
    }
    // Note: currently only running on root node
    startUpdate() {
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(_5), this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: s } = this.options;
      return s && s.getProps().transformTemplate;
    }
    willUpdate(s = !0) {
      if (this.root.hasTreeAnimated = !0, this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && Sh(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
        return;
      this.isLayoutDirty = !0;
      for (let c = 0; c < this.path.length; c++) {
        const f = this.path[c];
        f.shouldResetTransform = !0, f.updateScroll("snapshot"), f.options.layoutRoot && f.willUpdate(!1);
      }
      const { layoutId: a, layout: l } = this.options;
      if (a === void 0 && !l)
        return;
      const u = this.getTransformTemplate();
      this.prevTransformTemplateValue = u ? u(this.latestValues, "") : void 0, this.updateSnapshot(), s && this.notifyListeners("willUpdate");
    }
    update() {
      if (this.updateScheduled = !1, this.isUpdateBlocked()) {
        this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(Ec);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(Sc);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(B5), this.nodes.forEach(L5), this.nodes.forEach(F5)) : this.nodes.forEach(Sc), this.clearAllSnapshots();
      const a = ze.now();
      Le.delta = gt(0, 1e3 / 60, a - Le.timestamp), Le.timestamp = a, Le.isProcessing = !0, lo.update.process(Le), lo.preRender.process(Le), lo.render.process(Le), Le.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, ya.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(V5), this.sharedNodes.forEach(W5);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, Ee.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      Ee.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !_e(this.snapshot.measuredBox.x) && !_e(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let l = 0; l < this.path.length; l++)
          this.path[l].updateScroll();
      const s = this.layout;
      this.layout = this.measure(!1), this.layoutVersion++, this.layoutCorrected = Ae(), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: a } = this.options;
      a && a.notify("LayoutMeasure", this.layout.layoutBox, s ? s.layoutBox : void 0);
    }
    updateScroll(s = "measure") {
      let a = !!(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === s && (a = !1), a && this.instance) {
        const l = r(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: s,
          isRoot: l,
          offset: n(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : l
        };
      }
    }
    resetTransform() {
      if (!i)
        return;
      const s = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, a = this.projectionDelta && !yh(this.projectionDelta), l = this.getTransformTemplate(), u = l ? l(this.latestValues, "") : void 0, c = u !== this.prevTransformTemplateValue;
      s && this.instance && (a || Zt(this.latestValues) || c) && (i(this.instance, u), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(s = !0) {
      const a = this.measurePageBox();
      let l = this.removeElementScroll(a);
      return s && (l = this.removeTransform(l)), G5(l), {
        animationId: this.root.animationId,
        measuredBox: a,
        layoutBox: l,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      var u;
      const { visualElement: s } = this.options;
      if (!s)
        return Ae();
      const a = s.measureViewportBox();
      if (!(((u = this.scroll) == null ? void 0 : u.wasRoot) || this.path.some(Y5))) {
        const { scroll: c } = this.root;
        c && (yn(a.x, c.offset.x), yn(a.y, c.offset.y));
      }
      return a;
    }
    removeElementScroll(s) {
      var l;
      const a = Ae();
      if (et(a, s), (l = this.scroll) != null && l.wasRoot)
        return a;
      for (let u = 0; u < this.path.length; u++) {
        const c = this.path[u], { scroll: f, options: h } = c;
        c !== this.root && f && h.layoutScroll && (f.wasRoot && et(a, s), yn(a.x, f.offset.x), yn(a.y, f.offset.y));
      }
      return a;
    }
    applyTransform(s, a = !1) {
      const l = Ae();
      et(l, s);
      for (let u = 0; u < this.path.length; u++) {
        const c = this.path[u];
        !a && c.options.layoutScroll && c.scroll && c !== c.root && xn(l, {
          x: -c.scroll.offset.x,
          y: -c.scroll.offset.y
        }), Zt(c.latestValues) && xn(l, c.latestValues);
      }
      return Zt(this.latestValues) && xn(l, this.latestValues), l;
    }
    removeTransform(s) {
      const a = Ae();
      et(a, s);
      for (let l = 0; l < this.path.length; l++) {
        const u = this.path[l];
        if (!u.instance || !Zt(u.latestValues))
          continue;
        os(u.latestValues) && u.updateSnapshot();
        const c = Ae(), f = u.measurePageBox();
        et(c, f), hc(a, u.latestValues, u.snapshot ? u.snapshot.layoutBox : void 0, c);
      }
      return Zt(this.latestValues) && hc(a, this.latestValues), a;
    }
    setTargetDelta(s) {
      this.targetDelta = s, this.root.scheduleUpdateProjection(), this.isProjectionDirty = !0;
    }
    setOptions(s) {
      this.options = E(v(v({}, this.options), s), {
        crossfade: s.crossfade !== void 0 ? s.crossfade : !0
      });
    }
    clearMeasurements() {
      this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = !1;
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== Le.timestamp && this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(s = !1) {
      var d;
      const a = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = a.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = a.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = a.isSharedProjectionDirty);
      const l = !!this.resumingFrom || this !== a;
      if (!(s || l && this.isSharedProjectionDirty || this.isProjectionDirty || (d = this.parent) != null && d.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize))
        return;
      const { layout: c, layoutId: f } = this.options;
      if (!this.layout || !(c || f))
        return;
      this.resolvedRelativeTargetAt = Le.timestamp;
      const h = this.getClosestProjectingParent();
      h && this.linkedParentVersion !== h.layoutVersion && !h.options.layoutRoot && this.removeRelativeTarget(), !this.targetDelta && !this.relativeTarget && (h && h.layout ? this.createRelativeTarget(h, this.layout.layoutBox, h.layout.layoutBox) : this.removeRelativeTarget()), !(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = Ae(), this.targetWithTransforms = Ae()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), v5(this.target, this.relativeTarget, this.relativeParent.target)) : this.targetDelta ? (this.resumingFrom ? this.target = this.applyTransform(this.layout.layoutBox) : et(this.target, this.layout.layoutBox), ah(this.target, this.targetDelta)) : et(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1, h && !!h.resumingFrom == !!this.resumingFrom && !h.options.layoutScroll && h.target && this.animationProgress !== 1 ? this.createRelativeTarget(h, this.target, h.target) : this.relativeParent = this.relativeTarget = void 0));
    }
    getClosestProjectingParent() {
      if (!(!this.parent || os(this.parent.latestValues) || sh(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    createRelativeTarget(s, a, l) {
      this.relativeParent = s, this.linkedParentVersion = s.layoutVersion, this.forceRelativeParentToResolveTarget(), this.relativeTarget = Ae(), this.relativeTargetOrigin = Ae(), oi(this.relativeTargetOrigin, a, l), et(this.relativeTarget, this.relativeTargetOrigin);
    }
    removeRelativeTarget() {
      this.relativeParent = this.relativeTarget = void 0;
    }
    calcProjection() {
      var p;
      const s = this.getLead(), a = !!this.resumingFrom || this !== s;
      let l = !0;
      if ((this.isProjectionDirty || (p = this.parent) != null && p.isProjectionDirty) && (l = !1), a && (this.isSharedProjectionDirty || this.isTransformDirty) && (l = !1), this.resolvedRelativeTargetAt === Le.timestamp && (l = !1), l)
        return;
      const { layout: u, layoutId: c } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(u || c))
        return;
      et(this.layoutCorrected, this.layout.layoutBox);
      const f = this.treeScale.x, h = this.treeScale.y;
      Kw(this.layoutCorrected, this.treeScale, this.path, a), s.layout && !s.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (s.target = s.layout.layoutBox, s.targetWithTransforms = Ae());
      const { target: d } = s;
      if (!d) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (ac(this.prevProjectionDelta.x, this.projectionDelta.x), ac(this.prevProjectionDelta.y, this.projectionDelta.y)), Kn(this.projectionDelta, this.layoutCorrected, d, this.latestValues), (this.treeScale.x !== f || this.treeScale.y !== h || !bc(this.projectionDelta.x, this.prevProjectionDelta.x) || !bc(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", d));
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(s = !0) {
      var a;
      if ((a = this.options.visualElement) == null || a.scheduleRender(), s) {
        const l = this.getStack();
        l && l.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      this.prevProjectionDelta = bn(), this.projectionDelta = bn(), this.projectionDeltaWithTransform = bn();
    }
    setAnimationOrigin(s, a = !1) {
      const l = this.snapshot, u = l ? l.latestValues : {}, c = v({}, this.latestValues), f = bn();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !a;
      const h = Ae(), d = l ? l.source : void 0, p = this.layout ? this.layout.source : void 0, m = d !== p, g = this.getStack(), y = !g || g.members.length <= 1, w = !!(m && !y && this.options.crossfade === !0 && !this.path.some(U5));
      this.animationProgress = 0;
      let b;
      this.mixTargetDelta = (T) => {
        const P = T / 1e3;
        Pc(f.x, s.x, P), Pc(f.y, s.y, P), this.setTargetDelta(f), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (oi(h, this.layout.layoutBox, this.relativeParent.layout.layoutBox), H5(this.relativeTarget, this.relativeTargetOrigin, h, P), b && w5(this.relativeTarget, b) && (this.isProjectionDirty = !1), b || (b = Ae()), et(b, this.relativeTarget)), m && (this.animationValues = c, T5(c, u, this.latestValues, P, w, y)), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = P;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(s) {
      var a, l, u;
      this.notifyListeners("animationStart"), (a = this.currentAnimation) == null || a.stop(), (u = (l = this.resumingFrom) == null ? void 0 : l.currentAnimation) == null || u.stop(), this.pendingAnimation && (Ut(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = Ee.update(() => {
        zr.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = Cn(0)), this.currentAnimation = C5(this.motionValue, [0, 1e3], E(v({}, s), {
          velocity: 0,
          isSync: !0,
          onUpdate: (c) => {
            this.mixTargetDelta(c), s.onUpdate && s.onUpdate(c);
          },
          onStop: () => {
          },
          onComplete: () => {
            s.onComplete && s.onComplete(), this.completeAnimation();
          }
        })), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
      const s = this.getStack();
      s && s.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0, this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(R5), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const s = this.getLead();
      let { targetWithTransforms: a, target: l, layout: u, latestValues: c } = s;
      if (!(!a || !l || !u)) {
        if (this !== s && this.layout && u && Ph(this.options.animationType, this.layout.layoutBox, u.layoutBox)) {
          l = this.target || Ae();
          const f = _e(this.layout.layoutBox.x);
          l.x.min = s.target.x.min, l.x.max = l.x.min + f;
          const h = _e(this.layout.layoutBox.y);
          l.y.min = s.target.y.min, l.y.max = l.y.min + h;
        }
        et(a, l), xn(a, c), Kn(this.projectionDeltaWithTransform, this.layoutCorrected, a, c);
      }
    }
    registerSharedNode(s, a) {
      this.sharedNodes.has(s) || this.sharedNodes.set(s, new M5()), this.sharedNodes.get(s).add(a);
      const u = a.options.initialPromotionConfig;
      a.promote({
        transition: u ? u.transition : void 0,
        preserveFollowOpacity: u && u.shouldPreserveFollowOpacity ? u.shouldPreserveFollowOpacity(a) : void 0
      });
    }
    isLead() {
      const s = this.getStack();
      return s ? s.lead === this : !0;
    }
    getLead() {
      var a;
      const { layoutId: s } = this.options;
      return s ? ((a = this.getStack()) == null ? void 0 : a.lead) || this : this;
    }
    getPrevLead() {
      var a;
      const { layoutId: s } = this.options;
      return s ? (a = this.getStack()) == null ? void 0 : a.prevLead : void 0;
    }
    getStack() {
      const { layoutId: s } = this.options;
      if (s)
        return this.root.sharedNodes.get(s);
    }
    promote({ needsReset: s, transition: a, preserveFollowOpacity: l } = {}) {
      const u = this.getStack();
      u && u.promote(this, l), s && (this.projectionDelta = void 0, this.needsReset = !0), a && this.setOptions({ transition: a });
    }
    relegate() {
      const s = this.getStack();
      return s ? s.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: s } = this.options;
      if (!s)
        return;
      let a = !1;
      const { latestValues: l } = s;
      if ((l.z || l.rotate || l.rotateX || l.rotateY || l.rotateZ || l.skewX || l.skewY) && (a = !0), !a)
        return;
      const u = {};
      l.z && bo("z", s, u, this.animationValues);
      for (let c = 0; c < vo.length; c++)
        bo(`rotate${vo[c]}`, s, u, this.animationValues), bo(`skew${vo[c]}`, s, u, this.animationValues);
      s.render();
      for (const c in u)
        s.setStaticValue(c, u[c]), this.animationValues && (this.animationValues[c] = u[c]);
      s.scheduleRender();
    }
    applyProjectionStyles(s, a) {
      var p, m;
      if (!this.instance || this.isSVG)
        return;
      if (!this.isVisible) {
        s.visibility = "hidden";
        return;
      }
      const l = this.getTransformTemplate();
      if (this.needsReset) {
        this.needsReset = !1, s.visibility = "", s.opacity = "", s.pointerEvents = jr(a == null ? void 0 : a.pointerEvents) || "", s.transform = l ? l(this.latestValues, "") : "none";
        return;
      }
      const u = this.getLead();
      if (!this.projectionDelta || !this.layout || !u.target) {
        this.options.layoutId && (s.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, s.pointerEvents = jr(a == null ? void 0 : a.pointerEvents) || ""), this.hasProjected && !Zt(this.latestValues) && (s.transform = l ? l({}, "") : "none", this.hasProjected = !1);
        return;
      }
      s.visibility = "";
      const c = u.animationValues || u.latestValues;
      this.applyTransformsToTarget();
      let f = E5(this.projectionDeltaWithTransform, this.treeScale, c);
      l && (f = l(c, f)), s.transform = f;
      const { x: h, y: d } = this.projectionDelta;
      s.transformOrigin = `${h.origin * 100}% ${d.origin * 100}% 0`, u.animationValues ? s.opacity = u === this ? (m = (p = c.opacity) != null ? p : this.latestValues.opacity) != null ? m : 1 : this.preserveOpacity ? this.latestValues.opacity : c.opacityExit : s.opacity = u === this ? c.opacity !== void 0 ? c.opacity : "" : c.opacityExit !== void 0 ? c.opacityExit : 0;
      for (const g in as) {
        if (c[g] === void 0)
          continue;
        const { correct: y, applyTo: w, isCSSVariable: b } = as[g], T = f === "none" ? c[g] : y(c[g], u);
        if (w) {
          const P = w.length;
          for (let C = 0; C < P; C++)
            s[w[C]] = T;
        } else
          b ? this.options.visualElement.renderState.vars[g] = T : s[g] = T;
      }
      this.options.layoutId && (s.pointerEvents = u === this ? jr(a == null ? void 0 : a.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((s) => {
        var a;
        return (a = s.currentAnimation) == null ? void 0 : a.stop();
      }), this.root.nodes.forEach(Ec), this.root.sharedNodes.clear();
    }
  };
}
function L5(e) {
  e.updateLayout();
}
function F5(e) {
  var n;
  const t = ((n = e.resumeFrom) == null ? void 0 : n.snapshot) || e.snapshot;
  if (e.isLead() && e.layout && t && e.hasListeners("didUpdate")) {
    const { layoutBox: r, measuredBox: i } = e.layout, { animationType: o } = e.options, s = t.source !== e.layout.source;
    o === "size" ? lt((f) => {
      const h = s ? t.measuredBox[f] : t.layoutBox[f], d = _e(h);
      h.min = r[f].min, h.max = h.min + d;
    }) : Ph(o, t.layoutBox, r) && lt((f) => {
      const h = s ? t.measuredBox[f] : t.layoutBox[f], d = _e(r[f]);
      h.max = h.min + d, e.relativeTarget && !e.currentAnimation && (e.isProjectionDirty = !0, e.relativeTarget[f].max = e.relativeTarget[f].min + d);
    });
    const a = bn();
    Kn(a, r, t.layoutBox);
    const l = bn();
    s ? Kn(l, e.applyTransform(i, !0), t.measuredBox) : Kn(l, r, t.layoutBox);
    const u = !yh(a);
    let c = !1;
    if (!e.resumeFrom) {
      const f = e.getClosestProjectingParent();
      if (f && !f.resumeFrom) {
        const { snapshot: h, layout: d } = f;
        if (h && d) {
          const p = Ae();
          oi(p, t.layoutBox, h.layoutBox);
          const m = Ae();
          oi(m, r, d.layoutBox), xh(p, m) || (c = !0), f.options.layoutRoot && (e.relativeTarget = m, e.relativeTargetOrigin = p, e.relativeParent = f);
        }
      }
    }
    e.notifyListeners("didUpdate", {
      layout: r,
      snapshot: t,
      delta: l,
      layoutDelta: a,
      hasLayoutChanged: u,
      hasRelativeLayoutChanged: c
    });
  } else if (e.isLead()) {
    const { onExitComplete: r } = e.options;
    r && r();
  }
  e.options.transition = void 0;
}
function I5(e) {
  e.parent && (e.isProjecting() || (e.isProjectionDirty = e.parent.isProjectionDirty), e.isSharedProjectionDirty || (e.isSharedProjectionDirty = !!(e.isProjectionDirty || e.parent.isProjectionDirty || e.parent.isSharedProjectionDirty)), e.isTransformDirty || (e.isTransformDirty = e.parent.isTransformDirty));
}
function N5(e) {
  e.isProjectionDirty = e.isSharedProjectionDirty = e.isTransformDirty = !1;
}
function V5(e) {
  e.clearSnapshot();
}
function Ec(e) {
  e.clearMeasurements();
}
function Sc(e) {
  e.isLayoutDirty = !1;
}
function B5(e) {
  const { visualElement: t } = e.options;
  t && t.getProps().onBeforeLayoutMeasure && t.notify("BeforeLayoutMeasure"), e.resetTransform();
}
function Tc(e) {
  e.finishAnimation(), e.targetDelta = e.relativeTarget = e.target = void 0, e.isProjectionDirty = !0;
}
function j5(e) {
  e.resolveTargetDelta();
}
function z5(e) {
  e.calcProjection();
}
function _5(e) {
  e.resetSkewAndRotation();
}
function W5(e) {
  e.removeLeadSnapshot();
}
function Pc(e, t, n) {
  e.translate = Pe(t.translate, 0, n), e.scale = Pe(t.scale, 1, n), e.origin = t.origin, e.originPoint = t.originPoint;
}
function kc(e, t, n, r) {
  e.min = Pe(t.min, n.min, r), e.max = Pe(t.max, n.max, r);
}
function H5(e, t, n, r) {
  kc(e.x, t.x, n.x, r), kc(e.y, t.y, n.y, r);
}
function U5(e) {
  return e.animationValues && e.animationValues.opacityExit !== void 0;
}
const K5 = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, Cc = (e) => typeof navigator != "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(e), Oc = Cc("applewebkit/") && !Cc("chrome/") ? Math.round : Qe;
function $c(e) {
  e.min = Oc(e.min), e.max = Oc(e.max);
}
function G5(e) {
  $c(e.x), $c(e.y);
}
function Ph(e, t, n) {
  return e === "position" || e === "preserve-aspect" && !g5(vc(t), vc(n), 0.2);
}
function Y5(e) {
  var t;
  return e !== e.root && ((t = e.scroll) == null ? void 0 : t.wasRoot);
}
const X5 = Th({
  attachResizeListener: (e, t) => sr(e, "resize", t),
  measureScroll: () => {
    var e, t;
    return {
      x: document.documentElement.scrollLeft || ((e = document.body) == null ? void 0 : e.scrollLeft) || 0,
      y: document.documentElement.scrollTop || ((t = document.body) == null ? void 0 : t.scrollTop) || 0
    };
  },
  checkIsScrollRoot: () => !0
}), yo = {
  current: void 0
}, kh = Th({
  measureScroll: (e) => ({
    x: e.scrollLeft,
    y: e.scrollTop
  }),
  defaultParent: () => {
    if (!yo.current) {
      const e = new X5({});
      e.mount(window), e.setOptions({ layoutScroll: !0 }), yo.current = e;
    }
    return yo.current;
  },
  resetTransform: (e, t) => {
    e.style.transform = t !== void 0 ? t : "none";
  },
  checkIsScrollRoot: (e) => window.getComputedStyle(e).position === "fixed"
}), ka = pe({
  transformPagePoint: (e) => e,
  isStatic: !1,
  reducedMotion: "never"
});
function Ac(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function q5(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((i) => {
      const o = Ac(i, t);
      return !n && typeof o == "function" && (n = !0), o;
    });
    if (n)
      return () => {
        for (let i = 0; i < r.length; i++) {
          const o = r[i];
          typeof o == "function" ? o() : Ac(e[i], null);
        }
      };
  };
}
function Z5(...e) {
  return S.useCallback(q5(...e), e);
}
class Q5 extends S.Component {
  getSnapshotBeforeUpdate(t) {
    const n = this.props.childRef.current;
    if (n && t.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const r = n.offsetParent, i = rs(r) && r.offsetWidth || 0, o = rs(r) && r.offsetHeight || 0, s = this.props.sizeRef.current;
      s.height = n.offsetHeight || 0, s.width = n.offsetWidth || 0, s.top = n.offsetTop, s.left = n.offsetLeft, s.right = i - s.width - s.left, s.bottom = o - s.height - s.top;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function J5({ children: e, isPresent: t, anchorX: n, anchorY: r, root: i, pop: o }) {
  var h, d;
  const s = ye(), a = z(null), l = z({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }), { nonce: u } = ee(ka), c = (d = (h = e.props) == null ? void 0 : h.ref) != null ? d : e == null ? void 0 : e.ref, f = Z5(a, c);
  return ds(() => {
    const { width: p, height: m, top: g, left: y, right: w, bottom: b } = l.current;
    if (t || o === !1 || !a.current || !p || !m)
      return;
    const T = n === "left" ? `left: ${y}` : `right: ${w}`, P = r === "bottom" ? `bottom: ${b}` : `top: ${g}`;
    a.current.dataset.motionPopId = s;
    const C = document.createElement("style");
    u && (C.nonce = u);
    const A = i != null ? i : document.head;
    return A.appendChild(C), C.sheet && C.sheet.insertRule(`
          [data-motion-pop-id="${s}"] {
            position: absolute !important;
            width: ${p}px !important;
            height: ${m}px !important;
            ${T}px !important;
            ${P}px !important;
          }
        `), () => {
      A.contains(C) && A.removeChild(C);
    };
  }, [t]), x(Q5, { isPresent: t, childRef: a, sizeRef: l, pop: o, children: o === !1 ? e : S.cloneElement(e, { ref: f }) });
}
const e2 = ({ children: e, initial: t, isPresent: n, onExitComplete: r, custom: i, presenceAffectsLayout: o, mode: s, anchorX: a, anchorY: l, root: u }) => {
  const c = Qs(t2), f = ye();
  let h = !0, d = se(() => (h = !1, {
    id: f,
    initial: t,
    isPresent: n,
    custom: i,
    onExitComplete: (p) => {
      c.set(p, !0);
      for (const m of c.values())
        if (!m)
          return;
      r && r();
    },
    register: (p) => (c.set(p, !1), () => c.delete(p))
  }), [n, c, r]);
  return o && h && (d = v({}, d)), se(() => {
    c.forEach((p, m) => c.set(m, !1));
  }, [n]), S.useEffect(() => {
    !n && !c.size && r && r();
  }, [n]), e = x(J5, { pop: s === "popLayout", isPresent: n, anchorX: a, anchorY: l, root: u, children: e }), x(zi.Provider, { value: d, children: e });
};
function t2() {
  return /* @__PURE__ */ new Map();
}
function Ch(e = !0) {
  const t = ee(zi);
  if (t === null)
    return [!0, null];
  const { isPresent: n, onExitComplete: r, register: i } = t, o = ye();
  be(() => {
    if (e)
      return i(o);
  }, [e]);
  const s = re(() => e && r && r(o), [o, r, e]);
  return !n && r ? [!1, s] : [!0];
}
const Mr = (e) => e.key || "";
function Mc(e) {
  const t = [];
  return Kh.forEach(e, (n) => {
    ci(n) && t.push(n);
  }), t;
}
const n2 = ({ children: e, custom: t, initial: n = !0, onExitComplete: r, presenceAffectsLayout: i = !0, mode: o = "sync", propagate: s = !1, anchorX: a = "left", anchorY: l = "top", root: u }) => {
  const [c, f] = Ch(s), h = se(() => Mc(e), [e]), d = s && !c ? [] : h.map(Mr), p = z(!0), m = z(h), g = Qs(() => /* @__PURE__ */ new Map()), y = z(/* @__PURE__ */ new Set()), [w, b] = ne(h), [T, P] = ne(h);
  nf(() => {
    p.current = !1, m.current = h;
    for (let $ = 0; $ < T.length; $++) {
      const F = Mr(T[$]);
      d.includes(F) ? (g.delete(F), y.current.delete(F)) : g.get(F) !== !0 && g.set(F, !1);
    }
  }, [T, d.length, d.join("-")]);
  const C = [];
  if (h !== w) {
    let $ = [...h];
    for (let F = 0; F < T.length; F++) {
      const R = T[F], M = Mr(R);
      d.includes(M) || ($.splice(F, 0, R), C.push(R));
    }
    return o === "wait" && C.length && ($ = C), P(Mc($)), b(h), null;
  }
  process.env.NODE_ENV !== "production" && o === "wait" && T.length > 1 && console.warn(`You're attempting to animate multiple children within AnimatePresence, but its mode is set to "wait". This will lead to odd visual behaviour.`);
  const { forceRender: A } = ee(Zs);
  return x(ai, { children: T.map(($) => {
    const F = Mr($), R = s && !c ? !1 : h === T || d.includes(F), M = () => {
      if (y.current.has(F))
        return;
      if (y.current.add(F), g.has(F))
        g.set(F, !0);
      else
        return;
      let W = !0;
      g.forEach((N) => {
        N || (W = !1);
      }), W && (A == null || A(), P(m.current), s && (f == null || f()), r && r());
    };
    return x(e2, { isPresent: R, initial: !p.current || n ? void 0 : !1, custom: t, presenceAffectsLayout: i, mode: o, root: u, onExitComplete: R ? void 0 : M, anchorX: a, anchorY: l, children: $ }, F);
  }) });
}, Oh = pe({ strict: !1 }), Rc = {
  animation: [
    "animate",
    "variants",
    "whileHover",
    "whileTap",
    "exit",
    "whileInView",
    "whileFocus",
    "whileDrag"
  ],
  exit: ["exit"],
  drag: ["drag", "dragControls"],
  focus: ["whileFocus"],
  hover: ["whileHover", "onHoverStart", "onHoverEnd"],
  tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
  pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
  inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
  layout: ["layout", "layoutId"]
};
let Dc = !1;
function r2() {
  if (Dc)
    return;
  const e = {};
  for (const t in Rc)
    e[t] = {
      isEnabled: (n) => Rc[t].some((r) => !!n[r])
    };
  rh(e), Dc = !0;
}
function $h() {
  return r2(), _w();
}
function i2(e) {
  const t = $h();
  for (const n in e)
    t[n] = v(v({}, t[n]), e[n]);
  rh(t);
}
const o2 = /* @__PURE__ */ new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "propagate",
  "ignoreStrict",
  "viewport"
]);
function si(e) {
  return e.startsWith("while") || e.startsWith("drag") && e !== "draggable" || e.startsWith("layout") || e.startsWith("onTap") || e.startsWith("onPan") || e.startsWith("onLayout") || o2.has(e);
}
let Ah = (e) => !si(e);
function s2(e) {
  typeof e == "function" && (Ah = (t) => t.startsWith("on") ? !si(t) : e(t));
}
try {
  s2(require("@emotion/is-prop-valid").default);
} catch (e) {
}
function a2(e, t, n) {
  const r = {};
  for (const i in e)
    i === "values" && typeof e.values == "object" || (Ah(i) || n === !0 && si(i) || !t && !si(i) || // If trying to use native HTML drag events, forward drag listeners
    e.draggable && i.startsWith("onDrag")) && (r[i] = e[i]);
  return r;
}
const Hi = /* @__PURE__ */ pe({});
function l2(e, t) {
  if (Wi(e)) {
    const { initial: n, animate: r } = e;
    return {
      initial: n === !1 || or(n) ? n : void 0,
      animate: or(r) ? r : void 0
    };
  }
  return e.inherit !== !1 ? t : {};
}
function c2(e) {
  const { initial: t, animate: n } = l2(e, ee(Hi));
  return se(() => ({ initial: t, animate: n }), [Lc(t), Lc(n)]);
}
function Lc(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
const Ca = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function Mh(e, t, n) {
  for (const r in t)
    !Ve(t[r]) && !uh(r, n) && (e[r] = t[r]);
}
function u2({ transformTemplate: e }, t) {
  return se(() => {
    const n = Ca();
    return Ta(n, t, e), Object.assign({}, n.vars, n.style);
  }, [t]);
}
function d2(e, t) {
  const n = e.style || {}, r = {};
  return Mh(r, n, e), Object.assign(r, u2(e, t)), r;
}
function f2(e, t) {
  const n = {}, r = d2(e, t);
  return e.drag && e.dragListener !== !1 && (n.draggable = !1, r.userSelect = r.WebkitUserSelect = r.WebkitTouchCallout = "none", r.touchAction = e.drag === !0 ? "none" : `pan-${e.drag === "x" ? "y" : "x"}`), e.tabIndex === void 0 && (e.onTap || e.onTapStart || e.whileTap) && (n.tabIndex = 0), n.style = r, n;
}
const Rh = () => E(v({}, Ca()), {
  attrs: {}
});
function h2(e, t, n, r) {
  const i = se(() => {
    const o = Rh();
    return dh(o, t, hh(r), e.transformTemplate, e.style), E(v({}, o.attrs), {
      style: v({}, o.style)
    });
  }, [t]);
  if (e.style) {
    const o = {};
    Mh(o, e.style, e), i.style = v(v({}, o), i.style);
  }
  return i;
}
const p2 = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view"
];
function Oa(e) {
  return (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof e != "string" || /**
     * If it contains a dash, the element is a custom HTML webcomponent.
     */
    e.includes("-") ? !1 : (
      /**
       * If it's in our list of lowercase SVG tags, it's an SVG component
       */
      !!(p2.indexOf(e) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(e))
    )
  );
}
function m2(e, t, n, { latestValues: r }, i, o = !1, s) {
  const l = ((s != null ? s : Oa(e)) ? h2 : f2)(t, r, i, e), u = a2(t, typeof e == "string", o), c = e !== ke ? E(v(v({}, u), l), { ref: n }) : {}, { children: f } = t, h = se(() => Ve(f) ? f.get() : f, [f]);
  return Xc(e, E(v({}, c), {
    children: h
  }));
}
function g2({ scrapeMotionValuesFromProps: e, createRenderState: t }, n, r, i) {
  return {
    latestValues: v2(n, r, i, e),
    renderState: t()
  };
}
function v2(e, t, n, r) {
  const i = {}, o = r(e, {});
  for (const d in o)
    i[d] = jr(o[d]);
  let { initial: s, animate: a } = e;
  const l = Wi(e), u = th(e);
  t && u && !l && e.inherit !== !1 && (s === void 0 && (s = t.initial), a === void 0 && (a = t.animate));
  let c = n ? n.initial === !1 : !1;
  c = c || s === !1;
  const f = c ? a : s;
  if (f && typeof f != "boolean" && !_i(f)) {
    const d = Array.isArray(f) ? f : [f];
    for (let p = 0; p < d.length; p++) {
      const m = ga(e, d[p]);
      if (m) {
        const h = m, { transitionEnd: g, transition: y } = h, w = k(h, ["transitionEnd", "transition"]);
        for (const b in w) {
          let T = w[b];
          if (Array.isArray(T)) {
            const P = c ? T.length - 1 : 0;
            T = T[P];
          }
          T !== null && (i[b] = T);
        }
        for (const b in g)
          i[b] = g[b];
      }
    }
  }
  return i;
}
const Dh = (e) => (t, n) => {
  const r = ee(Hi), i = ee(zi), o = () => g2(e, t, r, i);
  return n ? o() : Qs(o);
}, b2 = /* @__PURE__ */ Dh({
  scrapeMotionValuesFromProps: Pa,
  createRenderState: Ca
}), y2 = /* @__PURE__ */ Dh({
  scrapeMotionValuesFromProps: ph,
  createRenderState: Rh
}), x2 = Symbol.for("motionComponentSymbol");
function w2(e, t, n) {
  const r = z(n);
  ds(() => {
    r.current = n;
  });
  const i = z(null);
  return re((o) => {
    var a;
    o && ((a = e.onMount) == null || a.call(e, o)), t && (o ? t.mount(o) : t.unmount());
    const s = r.current;
    if (typeof s == "function")
      if (o) {
        const l = s(o);
        typeof l == "function" && (i.current = l);
      } else i.current ? (i.current(), i.current = null) : s(o);
    else s && (s.current = o);
  }, [t]);
}
const Lh = pe({});
function fn(e) {
  return e && typeof e == "object" && Object.prototype.hasOwnProperty.call(e, "current");
}
function E2(e, t, n, r, i, o) {
  var b, T;
  const { visualElement: s } = ee(Hi), a = ee(Oh), l = ee(zi), u = ee(ka), c = u.reducedMotion, f = u.skipAnimations, h = z(null), d = z(!1);
  r = r || a.renderer, !h.current && r && (h.current = r(e, {
    visualState: t,
    parent: s,
    props: n,
    presenceContext: l,
    blockInitialAnimation: l ? l.initial === !1 : !1,
    reducedMotionConfig: c,
    skipAnimations: f,
    isSVG: o
  }), d.current && h.current && (h.current.manuallyAnimateOnMount = !0));
  const p = h.current, m = ee(Lh);
  p && !p.projection && i && (p.type === "html" || p.type === "svg") && S2(h.current, n, i, m);
  const g = z(!1);
  ds(() => {
    p && g.current && p.update(n, l);
  });
  const y = n[_f], w = z(!!y && !((b = window.MotionHandoffIsComplete) != null && b.call(window, y)) && ((T = window.MotionHasOptimisedAnimation) == null ? void 0 : T.call(window, y)));
  return nf(() => {
    d.current = !0, p && (g.current = !0, window.MotionIsMounted = !0, p.updateFeatures(), p.scheduleRenderMicrotask(), w.current && p.animationState && p.animationState.animateChanges());
  }), be(() => {
    p && (!w.current && p.animationState && p.animationState.animateChanges(), w.current && (queueMicrotask(() => {
      var P;
      (P = window.MotionHandoffMarkAsComplete) == null || P.call(window, y);
    }), w.current = !1), p.enteringChildren = void 0);
  }), p;
}
function S2(e, t, n, r) {
  const { layoutId: i, layout: o, drag: s, dragConstraints: a, layoutScroll: l, layoutRoot: u, layoutCrossfade: c } = t;
  e.projection = new n(e.latestValues, t["data-framer-portal-id"] ? void 0 : Fh(e.parent)), e.projection.setOptions({
    layoutId: i,
    layout: o,
    alwaysMeasureLayout: !!s || a && fn(a),
    visualElement: e,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof o == "string" ? o : "both",
    initialPromotionConfig: r,
    crossfade: c,
    layoutScroll: l,
    layoutRoot: u
  });
}
function Fh(e) {
  if (e)
    return e.options.allowProjection !== !1 ? e.projection : Fh(e.parent);
}
function xo(e, { forwardMotionProps: t = !1, type: n } = {}, r, i) {
  var u, c;
  r && i2(r);
  const o = n ? n === "svg" : Oa(e), s = o ? y2 : b2;
  function a(f, h) {
    let d;
    const p = E(v(v({}, ee(ka)), f), {
      layoutId: T2(f)
    }), { isStatic: m } = p, g = c2(f), y = s(f, m);
    if (!m && tf) {
      P2(p, r);
      const w = k2(p);
      d = w.MeasureLayout, g.visualElement = E2(e, y, p, i, w.ProjectionNode, o);
    }
    return _(Hi.Provider, { value: g, children: [d && g.visualElement ? x(d, v({ visualElement: g.visualElement }, p)) : null, m2(e, f, w2(y, g.visualElement, h), y, m, t, o)] });
  }
  a.displayName = `motion.${typeof e == "string" ? e : `create(${(c = (u = e.displayName) != null ? u : e.name) != null ? c : ""})`}`;
  const l = Gc(a);
  return l[x2] = e, l;
}
function T2({ layoutId: e }) {
  const t = ee(Zs).id;
  return t && e !== void 0 ? t + "-" + e : e;
}
function P2(e, t) {
  const n = ee(Oh).strict;
  if (process.env.NODE_ENV !== "production" && t && n) {
    const r = "You have rendered a `motion` component within a `LazyMotion` component. This will break tree shaking. Import and render a `m` component instead.";
    e.ignoreStrict ? Ln(!1, r, "lazy-strict-mode") : Ct(!1, r, "lazy-strict-mode");
  }
}
function k2(e) {
  const t = $h(), { drag: n, layout: r } = t;
  if (!n && !r)
    return {};
  const i = v(v({}, n), r);
  return {
    MeasureLayout: n != null && n.isEnabled(e) || r != null && r.isEnabled(e) ? i.MeasureLayout : void 0,
    ProjectionNode: i.ProjectionNode
  };
}
function C2(e, t) {
  if (typeof Proxy == "undefined")
    return xo;
  const n = /* @__PURE__ */ new Map(), r = (o, s) => xo(o, s, e, t), i = (o, s) => (process.env.NODE_ENV !== "production" && na(!1, "motion() is deprecated. Use motion.create() instead."), r(o, s));
  return new Proxy(i, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (o, s) => s === "create" ? r : (n.has(s) || n.set(s, xo(s, void 0, e, t)), n.get(s))
  });
}
const O2 = (e, t) => {
  var r;
  return ((r = t.isSVG) != null ? r : Oa(e)) ? new o5(t) : new Jw(t, {
    allowProjection: e !== ke
  });
};
class $2 extends Yt {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(t) {
    super(t), t.animationState || (t.animationState = u5(t));
  }
  updateAnimationControlsSubscription() {
    const { animate: t } = this.node.getProps();
    _i(t) && (this.unmountControls = t.subscribe(this.node));
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: t } = this.node.getProps(), { animate: n } = this.node.prevProps || {};
    t !== n && this.updateAnimationControlsSubscription();
  }
  unmount() {
    var t;
    this.node.animationState.reset(), (t = this.unmountControls) == null || t.call(this);
  }
}
let A2 = 0;
class M2 extends Yt {
  constructor() {
    super(...arguments), this.id = A2++;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: t, onExitComplete: n } = this.node.presenceContext, { isPresent: r } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || t === r)
      return;
    const i = this.node.animationState.setActive("exit", !t);
    n && !t && i.then(() => {
      n(this.id);
    });
  }
  mount() {
    const { register: t, onExitComplete: n } = this.node.presenceContext || {};
    n && n(this.id), t && (this.unmount = t(this.id));
  }
  unmount() {
  }
}
const R2 = {
  animation: {
    Feature: $2
  },
  exit: {
    Feature: M2
  }
};
function Er(e) {
  return {
    point: {
      x: e.pageX,
      y: e.pageY
    }
  };
}
const D2 = (e) => (t) => xa(t) && e(t, Er(t));
function Gn(e, t, n, r) {
  return sr(e, t, D2(n), r);
}
const Ih = ({ current: e }) => e ? e.ownerDocument.defaultView : null, Fc = (e, t) => Math.abs(e - t);
function L2(e, t) {
  const n = Fc(e.x, t.x), r = Fc(e.y, t.y);
  return Math.sqrt(Ui(n, 2) + Ui(r, 2));
}
const Ic = /* @__PURE__ */ new Set(["auto", "scroll"]);
class Nh {
  constructor(t, n, { transformPagePoint: r, contextWindow: i = window, dragSnapToOrigin: o = !1, distanceThreshold: s = 3, element: a } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.scrollPositions = /* @__PURE__ */ new Map(), this.removeScrollListeners = null, this.onElementScroll = (d) => {
      this.handleScroll(d.target);
    }, this.onWindowScroll = () => {
      this.handleScroll(window);
    }, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const d = Eo(this.lastMoveEventInfo, this.history), p = this.startEvent !== null, m = L2(d.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!p && !m)
        return;
      const { point: g } = d, { timestamp: y } = Le;
      this.history.push(E(v({}, g), { timestamp: y }));
      const { onStart: w, onMove: b } = this.handlers;
      p || (w && w(this.lastMoveEvent, d), this.startEvent = this.lastMoveEvent), b && b(this.lastMoveEvent, d);
    }, this.handlePointerMove = (d, p) => {
      this.lastMoveEvent = d, this.lastMoveEventInfo = wo(p, this.transformPagePoint), Ee.update(this.updatePoint, !0);
    }, this.handlePointerUp = (d, p) => {
      this.end();
      const { onEnd: m, onSessionEnd: g, resumeAnimation: y } = this.handlers;
      if ((this.dragSnapToOrigin || !this.startEvent) && y && y(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const w = Eo(d.type === "pointercancel" ? this.lastMoveEventInfo : wo(p, this.transformPagePoint), this.history);
      this.startEvent && m && m(d, w), g && g(d, w);
    }, !xa(t))
      return;
    this.dragSnapToOrigin = o, this.handlers = n, this.transformPagePoint = r, this.distanceThreshold = s, this.contextWindow = i || window;
    const l = Er(t), u = wo(l, this.transformPagePoint), { point: c } = u, { timestamp: f } = Le;
    this.history = [E(v({}, c), { timestamp: f })];
    const { onSessionStart: h } = n;
    h && h(t, Eo(u, this.history)), this.removeListeners = yr(Gn(this.contextWindow, "pointermove", this.handlePointerMove), Gn(this.contextWindow, "pointerup", this.handlePointerUp), Gn(this.contextWindow, "pointercancel", this.handlePointerUp)), a && this.startScrollTracking(a);
  }
  /**
   * Start tracking scroll on ancestors and window.
   */
  startScrollTracking(t) {
    let n = t.parentElement;
    for (; n; ) {
      const r = getComputedStyle(n);
      (Ic.has(r.overflowX) || Ic.has(r.overflowY)) && this.scrollPositions.set(n, {
        x: n.scrollLeft,
        y: n.scrollTop
      }), n = n.parentElement;
    }
    this.scrollPositions.set(window, {
      x: window.scrollX,
      y: window.scrollY
    }), window.addEventListener("scroll", this.onElementScroll, {
      capture: !0,
      passive: !0
    }), window.addEventListener("scroll", this.onWindowScroll, {
      passive: !0
    }), this.removeScrollListeners = () => {
      window.removeEventListener("scroll", this.onElementScroll, {
        capture: !0
      }), window.removeEventListener("scroll", this.onWindowScroll);
    };
  }
  /**
   * Handle scroll compensation during drag.
   *
   * For element scroll: adjusts history origin since pageX/pageY doesn't change.
   * For window scroll: adjusts lastMoveEventInfo since pageX/pageY would change.
   */
  handleScroll(t) {
    const n = this.scrollPositions.get(t);
    if (!n)
      return;
    const r = t === window, i = r ? { x: window.scrollX, y: window.scrollY } : {
      x: t.scrollLeft,
      y: t.scrollTop
    }, o = { x: i.x - n.x, y: i.y - n.y };
    o.x === 0 && o.y === 0 || (r ? this.lastMoveEventInfo && (this.lastMoveEventInfo.point.x += o.x, this.lastMoveEventInfo.point.y += o.y) : this.history.length > 0 && (this.history[0].x -= o.x, this.history[0].y -= o.y), this.scrollPositions.set(t, i), Ee.update(this.updatePoint, !0));
  }
  updateHandlers(t) {
    this.handlers = t;
  }
  end() {
    this.removeListeners && this.removeListeners(), this.removeScrollListeners && this.removeScrollListeners(), this.scrollPositions.clear(), Ut(this.updatePoint);
  }
}
function wo(e, t) {
  return t ? { point: t(e.point) } : e;
}
function Nc(e, t) {
  return { x: e.x - t.x, y: e.y - t.y };
}
function Eo({ point: e }, t) {
  return {
    point: e,
    delta: Nc(e, Vh(t)),
    offset: Nc(e, F2(t)),
    velocity: I2(t, 0.1)
  };
}
function F2(e) {
  return e[0];
}
function Vh(e) {
  return e[e.length - 1];
}
function I2(e, t) {
  if (e.length < 2)
    return { x: 0, y: 0 };
  let n = e.length - 1, r = null;
  const i = Vh(e);
  for (; n >= 0 && (r = e[n], !(i.timestamp - r.timestamp > /* @__PURE__ */ Je(t))); )
    n--;
  if (!r)
    return { x: 0, y: 0 };
  r === e[0] && e.length > 2 && i.timestamp - r.timestamp > /* @__PURE__ */ Je(t) * 2 && (r = e[1]);
  const o = /* @__PURE__ */ Ze(i.timestamp - r.timestamp);
  if (o === 0)
    return { x: 0, y: 0 };
  const s = {
    x: (i.x - r.x) / o,
    y: (i.y - r.y) / o
  };
  return s.x === 1 / 0 && (s.x = 0), s.y === 1 / 0 && (s.y = 0), s;
}
function N2(e, { min: t, max: n }, r) {
  return t !== void 0 && e < t ? e = r ? Pe(t, e, r.min) : Math.max(e, t) : n !== void 0 && e > n && (e = r ? Pe(n, e, r.max) : Math.min(e, n)), e;
}
function Vc(e, t, n) {
  return {
    min: t !== void 0 ? e.min + t : void 0,
    max: n !== void 0 ? e.max + n - (e.max - e.min) : void 0
  };
}
function V2(e, { top: t, left: n, bottom: r, right: i }) {
  return {
    x: Vc(e.x, n, i),
    y: Vc(e.y, t, r)
  };
}
function Bc(e, t) {
  let n = t.min - e.min, r = t.max - e.max;
  return t.max - t.min < e.max - e.min && ([n, r] = [r, n]), { min: n, max: r };
}
function B2(e, t) {
  return {
    x: Bc(e.x, t.x),
    y: Bc(e.y, t.y)
  };
}
function j2(e, t) {
  let n = 0.5;
  const r = _e(e), i = _e(t);
  return i > r ? n = /* @__PURE__ */ nr(t.min, t.max - r, e.min) : r > i && (n = /* @__PURE__ */ nr(e.min, e.max - i, t.min)), gt(0, 1, n);
}
function z2(e, t) {
  const n = {};
  return t.min !== void 0 && (n.min = t.min - e.min), t.max !== void 0 && (n.max = t.max - e.min), n;
}
const ls = 0.35;
function _2(e = ls) {
  return e === !1 ? e = 0 : e === !0 && (e = ls), {
    x: jc(e, "left", "right"),
    y: jc(e, "top", "bottom")
  };
}
function jc(e, t, n) {
  return {
    min: zc(e, t),
    max: zc(e, n)
  };
}
function zc(e, t) {
  return typeof e == "number" ? e : e[t] || 0;
}
const W2 = /* @__PURE__ */ new WeakMap();
class H2 {
  constructor(t) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = Ae(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = t;
  }
  start(t, { snapToCursor: n = !1, distanceThreshold: r } = {}) {
    const { presenceContext: i } = this.visualElement;
    if (i && i.isPresent === !1)
      return;
    const o = (f) => {
      n && this.snapToCursor(Er(f).point), this.stopAnimation();
    }, s = (f, h) => {
      const { drag: d, dragPropagation: p, onDragStart: m } = this.getProps();
      if (d && !p && (this.openDragLock && this.openDragLock(), this.openDragLock = bw(d), !this.openDragLock))
        return;
      this.latestPointerEvent = f, this.latestPanInfo = h, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), lt((y) => {
        let w = this.getAxisMotionValue(y).get() || 0;
        if (pt.test(w)) {
          const { projection: b } = this.visualElement;
          if (b && b.layout) {
            const T = b.layout.layoutBox[y];
            T && (w = _e(T) * (parseFloat(w) / 100));
          }
        }
        this.originPoint[y] = w;
      }), m && Ee.update(() => m(f, h), !1, !0), es(this.visualElement, "transform");
      const { animationState: g } = this.visualElement;
      g && g.setActive("whileDrag", !0);
    }, a = (f, h) => {
      this.latestPointerEvent = f, this.latestPanInfo = h;
      const { dragPropagation: d, dragDirectionLock: p, onDirectionLock: m, onDrag: g } = this.getProps();
      if (!d && !this.openDragLock)
        return;
      const { offset: y } = h;
      if (p && this.currentDirection === null) {
        this.currentDirection = K2(y), this.currentDirection !== null && m && m(this.currentDirection);
        return;
      }
      this.updateAxis("x", h.point, y), this.updateAxis("y", h.point, y), this.visualElement.render(), g && Ee.update(() => g(f, h), !1, !0);
    }, l = (f, h) => {
      this.latestPointerEvent = f, this.latestPanInfo = h, this.stop(f, h), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, u = () => {
      const { dragSnapToOrigin: f } = this.getProps();
      (f || this.constraints) && this.startAnimation({ x: 0, y: 0 });
    }, { dragSnapToOrigin: c } = this.getProps();
    this.panSession = new Nh(t, {
      onSessionStart: o,
      onStart: s,
      onMove: a,
      onSessionEnd: l,
      resumeAnimation: u
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: c,
      distanceThreshold: r,
      contextWindow: Ih(this.visualElement),
      element: this.visualElement.current
    });
  }
  /**
   * @internal
   */
  stop(t, n) {
    const r = t || this.latestPointerEvent, i = n || this.latestPanInfo, o = this.isDragging;
    if (this.cancel(), !o || !i || !r)
      return;
    const { velocity: s } = i;
    this.startAnimation(s);
    const { onDragEnd: a } = this.getProps();
    a && Ee.postRender(() => a(r, i));
  }
  /**
   * @internal
   */
  cancel() {
    this.isDragging = !1;
    const { projection: t, animationState: n } = this.visualElement;
    t && (t.isAnimationBlocked = !1), this.endPanSession();
    const { dragPropagation: r } = this.getProps();
    !r && this.openDragLock && (this.openDragLock(), this.openDragLock = null), n && n.setActive("whileDrag", !1);
  }
  /**
   * Clean up the pan session without modifying other drag state.
   * This is used during unmount to ensure event listeners are removed
   * without affecting projection animations or drag locks.
   * @internal
   */
  endPanSession() {
    this.panSession && this.panSession.end(), this.panSession = void 0;
  }
  updateAxis(t, n, r) {
    const { drag: i } = this.getProps();
    if (!r || !Rr(t, i, this.currentDirection))
      return;
    const o = this.getAxisMotionValue(t);
    let s = this.originPoint[t] + r[t];
    this.constraints && this.constraints[t] && (s = N2(s, this.constraints[t], this.elastic[t])), o.set(s);
  }
  resolveConstraints() {
    var o;
    const { dragConstraints: t, dragElastic: n } = this.getProps(), r = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : (o = this.visualElement.projection) == null ? void 0 : o.layout, i = this.constraints;
    t && fn(t) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : t && r ? this.constraints = V2(r.layoutBox, t) : this.constraints = !1, this.elastic = _2(n), i !== this.constraints && !fn(t) && r && this.constraints && !this.hasMutatedConstraints && lt((s) => {
      this.constraints !== !1 && this.getAxisMotionValue(s) && (this.constraints[s] = z2(r.layoutBox[s], this.constraints[s]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: t, onMeasureDragConstraints: n } = this.getProps();
    if (!t || !fn(t))
      return !1;
    const r = t.current;
    Ct(r !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.", "drag-constraints-ref");
    const { projection: i } = this.visualElement;
    if (!i || !i.layout)
      return !1;
    const o = Gw(r, i.root, this.visualElement.getTransformPagePoint());
    let s = B2(i.layout.layoutBox, o);
    if (n) {
      const a = n(Hw(s));
      this.hasMutatedConstraints = !!a, a && (s = oh(a));
    }
    return s;
  }
  startAnimation(t) {
    const { drag: n, dragMomentum: r, dragElastic: i, dragTransition: o, dragSnapToOrigin: s, onDragTransitionEnd: a } = this.getProps(), l = this.constraints || {}, u = lt((c) => {
      if (!Rr(c, n, this.currentDirection))
        return;
      let f = l && l[c] || {};
      s && (f = { min: 0, max: 0 });
      const h = i ? 200 : 1e6, d = i ? 40 : 1e7, p = v(v({
        type: "inertia",
        velocity: r ? t[c] : 0,
        bounceStiffness: h,
        bounceDamping: d,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10
      }, o), f);
      return this.startAxisValueAnimation(c, p);
    });
    return Promise.all(u).then(a);
  }
  startAxisValueAnimation(t, n) {
    const r = this.getAxisMotionValue(t);
    return es(this.visualElement, t), r.start(ma(t, r, 0, n, this.visualElement, !1));
  }
  stopAnimation() {
    lt((t) => this.getAxisMotionValue(t).stop());
  }
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - Otherwise, we apply the delta to the x/y motion values.
   */
  getAxisMotionValue(t) {
    const n = `_drag${t.toUpperCase()}`, r = this.visualElement.getProps(), i = r[n];
    return i || this.visualElement.getValue(t, (r.initial ? r.initial[t] : void 0) || 0);
  }
  snapToCursor(t) {
    lt((n) => {
      const { drag: r } = this.getProps();
      if (!Rr(n, r, this.currentDirection))
        return;
      const { projection: i } = this.visualElement, o = this.getAxisMotionValue(n);
      if (i && i.layout) {
        const { min: s, max: a } = i.layout.layoutBox[n], l = o.get() || 0;
        o.set(t[n] - Pe(s, a, 0.5) + l);
      }
    });
  }
  /**
   * When the viewport resizes we want to check if the measured constraints
   * have changed and, if so, reposition the element within those new constraints
   * relative to where it was before the resize.
   */
  scalePositionWithinConstraints() {
    if (!this.visualElement.current)
      return;
    const { drag: t, dragConstraints: n } = this.getProps(), { projection: r } = this.visualElement;
    if (!fn(n) || !r || !this.constraints)
      return;
    this.stopAnimation();
    const i = { x: 0, y: 0 };
    lt((s) => {
      const a = this.getAxisMotionValue(s);
      if (a && this.constraints !== !1) {
        const l = a.get();
        i[s] = j2({ min: l, max: l }, this.constraints[s]);
      }
    });
    const { transformTemplate: o } = this.visualElement.getProps();
    this.visualElement.current.style.transform = o ? o({}, "") : "none", r.root && r.root.updateScroll(), r.updateLayout(), this.constraints = !1, this.resolveConstraints(), lt((s) => {
      if (!Rr(s, t, null))
        return;
      const a = this.getAxisMotionValue(s), { min: l, max: u } = this.constraints[s];
      a.set(Pe(l, u, i[s]));
    }), this.visualElement.render();
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    W2.set(this.visualElement, this);
    const t = this.visualElement.current, n = Gn(t, "pointerdown", (u) => {
      const { drag: c, dragListener: f = !0 } = this.getProps(), h = u.target, d = h !== t && Tw(h);
      c && f && !d && this.start(u);
    });
    let r;
    const i = () => {
      const { dragConstraints: u } = this.getProps();
      fn(u) && u.current && (this.constraints = this.resolveRefConstraints(), r || (r = U2(t, u.current, () => this.scalePositionWithinConstraints())));
    }, { projection: o } = this.visualElement, s = o.addEventListener("measure", i);
    o && !o.layout && (o.root && o.root.updateScroll(), o.updateLayout()), Ee.read(i);
    const a = sr(window, "resize", () => this.scalePositionWithinConstraints()), l = o.addEventListener("didUpdate", (({ delta: u, hasLayoutChanged: c }) => {
      this.isDragging && c && (lt((f) => {
        const h = this.getAxisMotionValue(f);
        h && (this.originPoint[f] += u[f].translate, h.set(h.get() + u[f].translate));
      }), this.visualElement.render());
    }));
    return () => {
      a(), n(), s(), l && l(), r && r();
    };
  }
  getProps() {
    const t = this.visualElement.getProps(), { drag: n = !1, dragDirectionLock: r = !1, dragPropagation: i = !1, dragConstraints: o = !1, dragElastic: s = ls, dragMomentum: a = !0 } = t;
    return E(v({}, t), {
      drag: n,
      dragDirectionLock: r,
      dragPropagation: i,
      dragConstraints: o,
      dragElastic: s,
      dragMomentum: a
    });
  }
}
function _c(e) {
  let t = !0;
  return () => {
    if (t) {
      t = !1;
      return;
    }
    e();
  };
}
function U2(e, t, n) {
  const r = Xl(e, _c(n)), i = Xl(t, _c(n));
  return () => {
    r(), i();
  };
}
function Rr(e, t, n) {
  return (t === !0 || t === e) && (n === null || n === e);
}
function K2(e, t = 10) {
  let n = null;
  return Math.abs(e.y) > t ? n = "y" : Math.abs(e.x) > t && (n = "x"), n;
}
class G2 extends Yt {
  constructor(t) {
    super(t), this.removeGroupControls = Qe, this.removeListeners = Qe, this.controls = new H2(t);
  }
  mount() {
    const { dragControls: t } = this.node.getProps();
    t && (this.removeGroupControls = t.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || Qe;
  }
  update() {
    const { dragControls: t } = this.node.getProps(), { dragControls: n } = this.node.prevProps || {};
    t !== n && (this.removeGroupControls(), t && (this.removeGroupControls = t.subscribe(this.controls)));
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners(), this.controls.isDragging || this.controls.endPanSession();
  }
}
const So = (e) => (t, n) => {
  e && Ee.update(() => e(t, n), !1, !0);
};
class Y2 extends Yt {
  constructor() {
    super(...arguments), this.removePointerDownListener = Qe;
  }
  onPointerDown(t) {
    this.session = new Nh(t, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: Ih(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: t, onPanStart: n, onPan: r, onPanEnd: i } = this.node.getProps();
    return {
      onSessionStart: So(t),
      onStart: So(n),
      onMove: So(r),
      onEnd: (o, s) => {
        delete this.session, i && Ee.postRender(() => i(o, s));
      }
    };
  }
  mount() {
    this.removePointerDownListener = Gn(this.node.current, "pointerdown", (t) => this.onPointerDown(t));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
let To = !1;
class X2 extends Gh {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: t, layoutGroup: n, switchLayoutGroup: r, layoutId: i } = this.props, { projection: o } = t;
    o && (n.group && n.group.add(o), r && r.register && i && r.register(o), To && o.root.didUpdate(), o.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), o.setOptions(E(v({}, o.options), {
      layoutDependency: this.props.layoutDependency,
      onExitComplete: () => this.safeToRemove()
    }))), zr.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(t) {
    const { layoutDependency: n, visualElement: r, drag: i, isPresent: o } = this.props, { projection: s } = r;
    return s && (s.isPresent = o, t.layoutDependency !== n && s.setOptions(E(v({}, s.options), {
      layoutDependency: n
    })), To = !0, i || t.layoutDependency !== n || n === void 0 || t.isPresent !== o ? s.willUpdate() : this.safeToRemove(), t.isPresent !== o && (o ? s.promote() : s.relegate() || Ee.postRender(() => {
      const a = s.getStack();
      (!a || !a.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { projection: t } = this.props.visualElement;
    t && (t.root.didUpdate(), ya.postRender(() => {
      !t.currentAnimation && t.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: t, layoutGroup: n, switchLayoutGroup: r } = this.props, { projection: i } = t;
    To = !0, i && (i.scheduleCheckAfterUnmount(), n && n.group && n.group.remove(i), r && r.deregister && r.deregister(i));
  }
  safeToRemove() {
    const { safeToRemove: t } = this.props;
    t && t();
  }
  render() {
    return null;
  }
}
function Bh(e) {
  const [t, n] = Ch(), r = ee(Zs);
  return x(X2, E(v({}, e), { layoutGroup: r, switchLayoutGroup: ee(Lh), isPresent: t, safeToRemove: n }));
}
const q2 = {
  pan: {
    Feature: Y2
  },
  drag: {
    Feature: G2,
    ProjectionNode: kh,
    MeasureLayout: Bh
  }
};
function Wc(e, t, n) {
  const { props: r } = e;
  e.animationState && r.whileHover && e.animationState.setActive("whileHover", n === "Start");
  const i = "onHover" + n, o = r[i];
  o && Ee.postRender(() => o(t, Er(t)));
}
class Z2 extends Yt {
  mount() {
    const { current: t } = this.node;
    t && (this.unmount = xw(t, (n, r) => (Wc(this.node, r, "Start"), (i) => Wc(this.node, i, "End"))));
  }
  unmount() {
  }
}
class Q2 extends Yt {
  constructor() {
    super(...arguments), this.isActive = !1;
  }
  onFocus() {
    let t = !1;
    try {
      t = this.node.current.matches(":focus-visible");
    } catch (n) {
      t = !0;
    }
    !t || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !0), this.isActive = !0);
  }
  onBlur() {
    !this.isActive || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !1), this.isActive = !1);
  }
  mount() {
    this.unmount = yr(sr(this.node.current, "focus", () => this.onFocus()), sr(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function Hc(e, t, n) {
  const { props: r } = e;
  if (e.current instanceof HTMLButtonElement && e.current.disabled)
    return;
  e.animationState && r.whileTap && e.animationState.setActive("whileTap", n === "Start");
  const i = "onTap" + (n === "End" ? "" : n), o = r[i];
  o && Ee.postRender(() => o(t, Er(t)));
}
class J2 extends Yt {
  mount() {
    const { current: t } = this.node;
    if (!t)
      return;
    const { globalTapTarget: n, propagate: r } = this.node.props;
    this.unmount = kw(t, (i, o) => (Hc(this.node, o, "Start"), (s, { success: a }) => Hc(this.node, s, a ? "End" : "Cancel")), {
      useGlobalTarget: n,
      stopPropagation: (r == null ? void 0 : r.tap) === !1
    });
  }
  unmount() {
  }
}
const cs = /* @__PURE__ */ new WeakMap(), Po = /* @__PURE__ */ new WeakMap(), eE = (e) => {
  const t = cs.get(e.target);
  t && t(e);
}, tE = (e) => {
  e.forEach(eE);
};
function nE(n) {
  var r = n, { root: e } = r, t = k(r, ["root"]);
  const i = e || document;
  Po.has(i) || Po.set(i, {});
  const o = Po.get(i), s = JSON.stringify(t);
  return o[s] || (o[s] = new IntersectionObserver(tE, v({ root: e }, t))), o[s];
}
function rE(e, t, n) {
  const r = nE(t);
  return cs.set(e, n), r.observe(e), () => {
    cs.delete(e), r.unobserve(e);
  };
}
const iE = {
  some: 0,
  all: 1
};
class oE extends Yt {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.unmount();
    const { viewport: t = {} } = this.node.getProps(), { root: n, margin: r, amount: i = "some", once: o } = t, s = {
      root: n ? n.current : void 0,
      rootMargin: r,
      threshold: typeof i == "number" ? i : iE[i]
    }, a = (l) => {
      const { isIntersecting: u } = l;
      if (this.isInView === u || (this.isInView = u, o && !u && this.hasEnteredView))
        return;
      u && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", u);
      const { onViewportEnter: c, onViewportLeave: f } = this.node.getProps(), h = u ? c : f;
      h && h(l);
    };
    return rE(this.node.current, s, a);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver == "undefined")
      return;
    const { props: t, prevProps: n } = this.node;
    ["amount", "margin", "root"].some(sE(t, n)) && this.startObserver();
  }
  unmount() {
  }
}
function sE({ viewport: e = {} }, { viewport: t = {} } = {}) {
  return (n) => e[n] !== t[n];
}
const aE = {
  inView: {
    Feature: oE
  },
  tap: {
    Feature: J2
  },
  focus: {
    Feature: Q2
  },
  hover: {
    Feature: Z2
  }
}, lE = {
  layout: {
    ProjectionNode: kh,
    MeasureLayout: Bh
  }
}, cE = v(v(v(v({}, R2), aE), q2), lE), Uc = /* @__PURE__ */ C2(cE, O2);
function uE({ tabs: e, activeTab: t, onTabChange: n }) {
  return /* @__PURE__ */ x("div", { className: "flex items-center gap-2 overflow-x-auto py-2 scrollbar-none px-1", children: /* @__PURE__ */ x(n2, { mode: "popLayout", children: e.map((r) => {
    const i = t === r.id;
    return /* @__PURE__ */ _(
      "button",
      {
        onClick: () => n(r.id),
        className: Re(
          "relative flex items-center justify-center rounded-xl transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
          i ? Re(
            "px-3 py-2 border",
            r.colorTheme.activeBg,
            r.colorTheme.activeBorder
          ) : "p-2 hover:bg-black/5 dark:hover:bg-white/5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
        ),
        children: [
          /* @__PURE__ */ _("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ x(r.icon, { className: Re(
              "w-5 h-5 transition-colors",
              i ? r.colorTheme.activeText : "currentColor"
            ) }),
            i && /* @__PURE__ */ x(
              Uc.span,
              {
                initial: { opacity: 0, width: 0 },
                animate: { opacity: 1, width: "auto" },
                exit: { opacity: 0, width: 0 },
                className: Re("text-sm font-medium whitespace-nowrap hidden lg:inline-block", r.colorTheme.activeText),
                children: r.label
              }
            ),
            i && r.count > 0 && /* @__PURE__ */ x(
              Uc.span,
              {
                initial: { scale: 0 },
                animate: { scale: 1 },
                className: Re(
                  "ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold",
                  r.colorTheme.badgeBg,
                  r.colorTheme.badgeText
                ),
                children: r.count
              }
            )
          ] }),
          !i && r.count > 0 && /* @__PURE__ */ x("span", { className: "absolute -top-1 -right-1 flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full bg-red-500 text-white text-[9px] font-bold border-2 border-white dark:border-zinc-900", children: r.count })
        ]
      },
      r.id
    );
  }) }) });
}
const dE = ({ priority: e, type: t }) => t === "discrepancy" ? /* @__PURE__ */ x(Qd, { className: "w-4 h-4" }) : t === "payment" ? /* @__PURE__ */ x(qd, { className: "w-4 h-4" }) : t === "invoice" ? /* @__PURE__ */ x(Zd, { className: "w-4 h-4" }) : t === "approval" ? /* @__PURE__ */ x(Xd, { className: "w-4 h-4" }) : t === "announcement" ? /* @__PURE__ */ x(Jd, { className: "w-4 h-4" }) : t === "live_chat" ? /* @__PURE__ */ x(Yd, { className: "w-4 h-4" }) : /* @__PURE__ */ x(ex, { className: "w-4 h-4" }), fE = ({ priority: e, type: t }) => {
  const n = {
    high: "text-red-500 bg-red-500/10 border-red-500/20",
    medium: "text-orange-500 bg-orange-500/10 border-orange-500/20",
    low: "text-gray-500 bg-gray-500/10 border-gray-500/20"
  }, r = {
    discrepancy: "Discrepancy",
    invoice: "Invoice",
    payment: "Payment",
    approval: "Approval",
    system: "System",
    announcement: "Announcement",
    live_chat: "Live Chat"
  };
  return /* @__PURE__ */ _("span", { className: Re(
    "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium border",
    n[e]
  ), children: [
    /* @__PURE__ */ x(dE, { priority: e, type: t }),
    r[t]
  ] });
};
function hE({ notification: e, onActionClick: t }) {
  const [n, r] = ne({}), i = (o, s) => {
    if (o === "Reply" && t) {
      t(o);
      return;
    }
    o === "Reply" && r((a) => E(v({}, a), { [s]: "Sent!" }));
  };
  return /* @__PURE__ */ _("div", { className: "group relative p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-transparent hover:border-gray-200 dark:hover:border-white/10 hover:shadow-md transition-all duration-200", children: [
    /* @__PURE__ */ _("div", { className: "flex justify-between items-start gap-4", children: [
      /* @__PURE__ */ _("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ _("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ x(fE, { priority: e.priority, type: e.type }),
          e.priority === "high" && /* @__PURE__ */ x("span", { className: "px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400", children: "High" }),
          e.priority === "medium" && /* @__PURE__ */ x("span", { className: "px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400", children: "Medium" }),
          e.priority === "low" && /* @__PURE__ */ x("span", { className: "px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary", children: "Low" })
        ] }),
        /* @__PURE__ */ x("h4", { className: "text-sm font-semibold text-gray-900 dark:text-white truncate", children: e.title }),
        /* @__PURE__ */ x("p", { className: "mt-0.5 text-xs text-gray-500 dark:text-gray-400", children: e.message }),
        /* @__PURE__ */ _("div", { className: "mt-2 text-[10px] flex items-center gap-2 text-gray-400 dark:text-gray-500 font-mono", children: [
          /* @__PURE__ */ x("span", { children: e.meta }),
          /* @__PURE__ */ x("span", { children: "•" }),
          /* @__PURE__ */ x("span", { children: e.timestamp })
        ] })
      ] }),
      e.actions.map((o, s) => /* @__PURE__ */ _(
        "button",
        {
          className: Re(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm",
            o.primary ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm" : "bg-gray-100 dark:bg-white/10 text-zinc-900 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-white/20",
            n[s] === "Sent!" && "!bg-green-500 !text-white"
          ),
          onClick: () => i(o.label, s),
          children: [
            n[s] || o.label,
            n[s] === "Sent!" ? /* @__PURE__ */ x(Vy, { className: "w-3 h-3" }) : /* @__PURE__ */ x(Ty, { className: "w-3 h-3" })
          ]
        },
        s
      ))
    ] }),
    /* @__PURE__ */ x("div", { className: Re(
      "absolute left-0 top-4 bottom-4 w-1 rounded-r-full",
      e.priority === "high" ? "bg-red-500" : e.priority === "medium" ? "bg-orange-500" : "bg-transparent"
    ) })
  ] });
}
function pE({ onBack: e }) {
  const [t, n] = ne(""), [r, i] = ne([
    {
      id: "1",
      sender: "support",
      text: "Hi John, I see you have a question about invoice #442. How can I help you today?",
      timestamp: "10:30 AM"
    }
  ]), o = z(null), s = () => {
    var l;
    (l = o.current) == null || l.scrollIntoView({ behavior: "smooth" });
  };
  be(() => {
    s();
  }, [r]);
  const a = (l) => {
    if (l == null || l.preventDefault(), !t.trim()) return;
    const u = {
      id: Date.now().toString(),
      sender: "user",
      text: t,
      timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };
    i((c) => [...c, u]), n(""), setTimeout(() => {
      i((c) => [...c, {
        id: (Date.now() + 1).toString(),
        sender: "support",
        text: "Thanks for the details. Let me check that for you right away.",
        timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }]);
    }, 1500);
  };
  return /* @__PURE__ */ _("div", { className: "flex flex-col h-[500px] bg-white dark:bg-zinc-900", children: [
    /* @__PURE__ */ _("div", { className: "flex items-center gap-3 px-5 py-4 border-b border-gray-100 dark:border-white/10 shrink-0", children: [
      /* @__PURE__ */ x(
        "button",
        {
          onClick: e,
          className: "p-1 -ml-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 transition-colors",
          children: /* @__PURE__ */ x(xy, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ _("div", { children: [
        /* @__PURE__ */ x("h3", { className: "text-sm font-bold text-gray-900 dark:text-white", children: "Support Chat" }),
        /* @__PURE__ */ _("p", { className: "text-xs text-green-500 flex items-center gap-1", children: [
          /* @__PURE__ */ x("span", { className: "w-1.5 h-1.5 rounded-full bg-green-500" }),
          "Sarah is online"
        ] })
      ] }),
      /* @__PURE__ */ x(
        "button",
        {
          className: "ml-auto p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors",
          title: "Open in full page",
          children: /* @__PURE__ */ x(Oy, { className: "w-5 h-5" })
        }
      )
    ] }),
    /* @__PURE__ */ _("div", { className: "flex-1 overflow-y-auto p-5 space-y-4 scrollbar-minimal", children: [
      r.map((l) => /* @__PURE__ */ _(
        "div",
        {
          className: Re(
            "flex items-end gap-2 max-w-[85%]",
            l.sender === "user" ? "ml-auto flex-row-reverse" : ""
          ),
          children: [
            /* @__PURE__ */ x("div", { className: Re(
              "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border",
              l.sender === "user" ? "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700" : "bg-indigo-50 dark:bg-indigo-900/30 border-indigo-100 dark:border-indigo-500/20"
            ), children: l.sender === "user" ? /* @__PURE__ */ x(ef, { className: "w-4 h-4 text-gray-500 dark:text-gray-400" }) : /* @__PURE__ */ x("span", { className: "text-xs font-bold text-indigo-600 dark:text-indigo-400", children: "S" }) }),
            /* @__PURE__ */ _("div", { className: Re(
              "px-4 py-2.5 rounded-2xl text-sm leading-relaxed",
              l.sender === "user" ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-tr-none" : "bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-gray-100 rounded-tl-none"
            ), children: [
              l.text,
              /* @__PURE__ */ x("div", { className: Re(
                "text-[10px] mt-1 opacity-50",
                l.sender === "user" ? "text-right" : "text-left"
              ), children: l.timestamp })
            ] })
          ]
        },
        l.id
      )),
      /* @__PURE__ */ x("div", { ref: o })
    ] }),
    /* @__PURE__ */ x("div", { className: "p-4 border-t border-gray-100 dark:border-white/10 shrink-0", children: /* @__PURE__ */ _(
      "form",
      {
        onSubmit: a,
        className: "flex items-center gap-2 bg-gray-50 dark:bg-white/5 p-2 pr-2 rounded-full border border-gray-200 dark:border-white/10 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all",
        children: [
          /* @__PURE__ */ x(
            "input",
            {
              type: "text",
              value: t,
              onChange: (l) => n(l.target.value),
              placeholder: "Type a message...",
              className: "flex-1 bg-transparent border-none text-sm px-3 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-0"
            }
          ),
          /* @__PURE__ */ x(
            "button",
            {
              type: "submit",
              disabled: !t.trim(),
              className: "p-2 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
              children: /* @__PURE__ */ x(ax, { className: "w-4 h-4" })
            }
          )
        ]
      }
    ) })
  ] });
}
function mE({ className: e }) {
  const [t, n] = ne("all"), [r, i] = ne(""), [o, s] = ne("list"), a = [
    {
      id: "all",
      label: "All",
      count: xt.filter((c) => c.unread).length,
      icon: Bo,
      colorTheme: {
        activeBg: "bg-zinc-800 dark:bg-white/10",
        activeText: "text-white",
        activeBorder: "border-white/10",
        badgeBg: "bg-white/20",
        badgeText: "text-white"
      },
      filter: () => !0
    },
    {
      id: "discrepancy",
      label: "Discrepancies",
      count: xt.filter((c) => c.type === "discrepancy" && c.unread).length,
      icon: Qd,
      colorTheme: {
        activeBg: "bg-red-500/15",
        activeText: "text-red-500",
        activeBorder: "border-red-500/20",
        badgeBg: "bg-red-500/20",
        badgeText: "text-red-500"
      },
      filter: (c) => c.type === "discrepancy"
    },
    {
      id: "payment",
      label: "Payments",
      count: xt.filter((c) => c.type === "payment" && c.unread).length,
      icon: qd,
      colorTheme: {
        activeBg: "bg-orange-500/15",
        activeText: "text-orange-500",
        activeBorder: "border-orange-500/20",
        badgeBg: "bg-orange-500/20",
        badgeText: "text-orange-500"
      },
      filter: (c) => c.type === "payment"
    },
    {
      id: "approval",
      label: "Approvals",
      count: xt.filter((c) => c.type === "approval" && c.unread).length,
      icon: Xd,
      colorTheme: {
        activeBg: "bg-cyan-500/15",
        activeText: "text-cyan-500",
        activeBorder: "border-cyan-500/20",
        badgeBg: "bg-cyan-500/20",
        badgeText: "text-cyan-500"
      },
      filter: (c) => c.type === "approval"
    },
    {
      id: "shipping",
      label: "Shipping",
      count: 3,
      // Mock count for demo
      icon: fx,
      colorTheme: {
        activeBg: "bg-green-500/15",
        activeText: "text-green-500",
        activeBorder: "border-green-500/20",
        badgeBg: "bg-green-500/20",
        badgeText: "text-green-500"
      },
      filter: (c) => c.type === "system"
      // Placeholder filter
    },
    {
      id: "announcement",
      label: "Announcements",
      count: xt.filter((c) => c.type === "announcement" && c.unread).length,
      icon: Jd,
      colorTheme: {
        activeBg: "bg-purple-500/15",
        activeText: "text-purple-500",
        activeBorder: "border-purple-500/20",
        badgeBg: "bg-purple-500/20",
        badgeText: "text-purple-500"
      },
      filter: (c) => c.type === "announcement"
    },
    {
      id: "live_chat",
      label: "Live Chat",
      count: xt.filter((c) => c.type === "live_chat" && c.unread).length,
      icon: Yd,
      colorTheme: {
        activeBg: "bg-indigo-500/15",
        activeText: "text-indigo-500",
        activeBorder: "border-indigo-500/20",
        badgeBg: "bg-indigo-500/20",
        badgeText: "text-indigo-500"
      },
      filter: (c) => c.type === "live_chat"
    }
  ], l = se(() => {
    const c = a.find((f) => f.id === t);
    return xt.filter((f) => c == null ? void 0 : c.filter(f)).filter(
      (f) => f.title.toLowerCase().includes(r.toLowerCase()) || f.message.toLowerCase().includes(r.toLowerCase()) || f.meta.toLowerCase().includes(r.toLowerCase())
    );
  }, [t, r]), u = xt.filter((c) => c.priority === "high").length;
  return /* @__PURE__ */ x("div", { className: Re("bg-zinc-100 dark:bg-zinc-900/85 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl rounded-3xl overflow-hidden flex flex-col max-h-[80vh]", e), children: o === "chat" ? /* @__PURE__ */ x(pE, { onBack: () => s("list") }) : /* @__PURE__ */ _(ai, { children: [
    /* @__PURE__ */ _("div", { className: "px-5 pt-5 pb-3 shrink-0", children: [
      /* @__PURE__ */ _("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ x("h3", { className: "text-lg font-bold text-gray-900 dark:text-white", children: "Action Center" }),
        /* @__PURE__ */ _("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ x("button", { className: "p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 transition-colors", children: /* @__PURE__ */ x(nx, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ x("button", { className: "p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 transition-colors", children: /* @__PURE__ */ x(mx, { className: "w-5 h-5" }) })
        ] })
      ] }),
      /* @__PURE__ */ x(
        uE,
        {
          tabs: a,
          activeTab: t,
          onTabChange: n
        }
      )
    ] }),
    /* @__PURE__ */ x("div", { className: "flex-1 overflow-y-auto min-h-0 px-5 pb-4 space-y-3 scrollbar-minimal", children: l.length > 0 ? l.map((c) => /* @__PURE__ */ x(
      hE,
      {
        notification: c,
        onActionClick: c.type === "live_chat" ? (f) => {
          f === "Reply" && s("chat");
        } : void 0
      },
      c.id
    )) : /* @__PURE__ */ _("div", { className: "flex flex-col items-center justify-center py-12 text-center text-gray-500 dark:text-gray-400", children: [
      /* @__PURE__ */ x(Gd, { className: "w-12 h-12 mb-3 text-gray-300 dark:text-gray-600" }),
      /* @__PURE__ */ x("p", { className: "text-sm font-medium", children: "No updates found" }),
      /* @__PURE__ */ x("p", { className: "text-xs mt-1", children: "You're all caught up!" })
    ] }) }),
    /* @__PURE__ */ _("div", { className: "px-5 py-3 border-t border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-black/20 backdrop-blur-md flex items-center justify-between shrink-0", children: [
      /* @__PURE__ */ _("p", { className: "text-xs font-medium text-gray-500 dark:text-gray-400", children: [
        l.length,
        " actions"
      ] }),
      /* @__PURE__ */ _("p", { className: "text-xs font-bold text-red-500 flex items-center gap-1.5", children: [
        /* @__PURE__ */ x("span", { className: "w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" }),
        u,
        " urgent"
      ] })
    ] })
  ] }) });
}
function lS() {
  const e = xt.filter((t) => t.unread).length;
  return /* @__PURE__ */ x(jd, { className: "relative", children: ({ open: t }) => /* @__PURE__ */ _(ai, { children: [
    /* @__PURE__ */ _(Ks, { className: Re(
      "relative p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors outline-none",
      t ? "bg-black/5 dark:bg-white/10 text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
    ), children: [
      /* @__PURE__ */ x(Gd, { className: "w-5 h-5" }),
      e > 0 && /* @__PURE__ */ x("span", { className: "absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-400 dark:bg-red-500 ring-2 ring-white dark:ring-zinc-900" })
    ] }),
    /* @__PURE__ */ x(
      Ii,
      {
        as: ke,
        enter: "transition ease-out duration-200",
        enterFrom: "opacity-0 translate-y-2 scale-95",
        enterTo: "opacity-100 translate-y-0 scale-100",
        leave: "transition ease-in duration-150",
        leaveFrom: "opacity-100 translate-y-0 scale-100",
        leaveTo: "opacity-0 translate-y-2 scale-95",
        children: /* @__PURE__ */ x(Gs, { className: "fixed top-[90px] left-1/2 -translate-x-1/2 w-[95vw] max-h-[85vh] lg:w-[600px] lg:fixed lg:left-1/2 lg:-translate-x-1/2 p-0 z-50 focus:outline-none", children: /* @__PURE__ */ x(mE, {}) })
      }
    )
  ] }) });
}
function cS(r) {
  var i = r, { className: e, children: t } = i, n = k(i, ["className", "children"]);
  return /* @__PURE__ */ x(
    "div",
    E(v({}, n), {
      className: Y(e, "lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8"),
      children: t
    })
  );
}
function uS(r) {
  var i = r, { images: e, className: t } = i, n = k(i, ["images", "className"]);
  return /* @__PURE__ */ _(Wd, E(v({ as: "div", className: Y("flex flex-col-reverse", t) }, n), { children: [
    /* @__PURE__ */ x("div", { className: "mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none", children: /* @__PURE__ */ x(Hd, { className: "grid grid-cols-4 gap-6", children: e.map((o) => /* @__PURE__ */ x(
      uy,
      {
        className: "relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-zinc-900 hover:bg-zinc-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4",
        children: ({ selected: s }) => /* @__PURE__ */ _(ai, { children: [
          /* @__PURE__ */ x("span", { className: "sr-only", children: o.name }),
          /* @__PURE__ */ x("span", { className: "absolute inset-0 overflow-hidden rounded-md", children: /* @__PURE__ */ x("img", { alt: "", src: o.src, className: "h-full w-full object-cover object-center" }) }),
          /* @__PURE__ */ x(
            "span",
            {
              className: Y(
                s ? "ring-indigo-500" : "ring-transparent",
                "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
              ),
              "aria-hidden": "true"
            }
          )
        ] })
      },
      o.id
    )) }) }),
    /* @__PURE__ */ x(Ud, { className: "aspect-h-1 aspect-w-1 w-full", children: e.map((o) => /* @__PURE__ */ x(Kd, { children: /* @__PURE__ */ x(
      "img",
      {
        alt: o.alt,
        src: o.src,
        className: "h-full w-full object-cover object-center sm:rounded-lg"
      }
    ) }, o.id)) })
  ] }));
}
function dS(r) {
  var i = r, { className: e, children: t } = i, n = k(i, ["className", "children"]);
  return /* @__PURE__ */ x("div", E(v({ className: Y(e, "mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0") }, n), { children: t }));
}
function fS(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x("h1", v({ className: Y(e, "text-3xl font-bold tracking-tight text-zinc-900 dark:text-white") }, t));
}
function hS(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x("p", v({ className: Y(e, "text-3xl tracking-tight text-zinc-900 dark:text-white") }, t));
}
function pS(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x(
    "div",
    E(v({}, t), {
      className: Y(
        e,
        "grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
      )
    })
  );
}
function mS(r) {
  var i = r, {
    product: e,
    className: t
  } = i, n = k(i, [
    "product",
    "className"
  ]);
  return /* @__PURE__ */ _("div", E(v({ className: Y(t, "group relative") }, n), { children: [
    /* @__PURE__ */ _("div", { className: "aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-zinc-200 dark:bg-zinc-800 xl:aspect-h-8 xl:aspect-w-7", children: [
      /* @__PURE__ */ x(
        "img",
        {
          src: e.imageSrc,
          alt: e.imageAlt,
          className: "h-full w-full object-cover object-center group-hover:opacity-75"
        }
      ),
      e.inStock === !1 && /* @__PURE__ */ x("div", { className: "absolute top-2 right-2", children: /* @__PURE__ */ x(py, { color: "zinc", children: "Out of Stock" }) })
    ] }),
    /* @__PURE__ */ x("h3", { className: "mt-4 text-sm text-zinc-700 dark:text-zinc-200", children: /* @__PURE__ */ _("a", { href: e.href, children: [
      /* @__PURE__ */ x("span", { className: "absolute inset-0" }),
      e.name
    ] }) }),
    /* @__PURE__ */ _("div", { className: "mt-1 flex items-center justify-between", children: [
      /* @__PURE__ */ x("p", { className: "text-lg font-medium text-zinc-900 dark:text-white", children: e.price }),
      e.rating && /* @__PURE__ */ _("div", { className: "flex items-center", children: [
        /* @__PURE__ */ x(Zh, { className: "h-4 w-4 fill-amber-400 text-amber-400" }),
        /* @__PURE__ */ x("span", { className: "ml-1 text-sm text-zinc-500", children: e.rating })
      ] })
    ] }),
    e.category && /* @__PURE__ */ x("p", { className: "mt-1 text-sm text-zinc-500", children: e.category })
  ] }));
}
function gS(i) {
  var o = i, { open: e, onClose: t, items: n } = o, r = k(o, ["open", "onClose", "items"]);
  const s = n.reduce((a, l) => {
    const u = parseFloat(l.price.replace("$", ""));
    return a + u * l.quantity;
  }, 0);
  return /* @__PURE__ */ _(my, { open: e, onClose: t, children: [
    /* @__PURE__ */ x(by, { onClose: () => t(!1), children: /* @__PURE__ */ x(gy, { children: "Shopping Cart" }) }),
    /* @__PURE__ */ _(vy, { className: "flex flex-col", children: [
      /* @__PURE__ */ x("ul", { role: "list", className: "-my-6 divide-y divide-zinc-200 dark:divide-zinc-800 flex-1 overflow-y-auto px-4 sm:px-6", children: n.map((a) => /* @__PURE__ */ _("li", { className: "flex py-6", children: [
        /* @__PURE__ */ x("div", { className: "h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800", children: /* @__PURE__ */ x(
          "img",
          {
            src: a.imageSrc,
            alt: a.imageAlt,
            className: "h-full w-full object-cover object-center"
          }
        ) }),
        /* @__PURE__ */ _("div", { className: "ml-4 flex flex-1 flex-col", children: [
          /* @__PURE__ */ _("div", { children: [
            /* @__PURE__ */ _("div", { className: "flex justify-between text-base font-medium text-zinc-900 dark:text-white", children: [
              /* @__PURE__ */ x("h3", { children: /* @__PURE__ */ x("a", { href: a.href, children: a.name }) }),
              /* @__PURE__ */ x("p", { className: "ml-4", children: a.price })
            ] }),
            /* @__PURE__ */ x("p", { className: "mt-1 text-sm text-zinc-500", children: a.color })
          ] }),
          /* @__PURE__ */ _("div", { className: "flex flex-1 items-end justify-between text-sm", children: [
            /* @__PURE__ */ _("p", { className: "text-zinc-500", children: [
              "Qty ",
              a.quantity
            ] }),
            /* @__PURE__ */ x("div", { className: "flex", children: /* @__PURE__ */ x(
              "button",
              {
                type: "button",
                className: "font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400",
                children: "Remove"
              }
            ) })
          ] })
        ] })
      ] }, a.id)) }),
      /* @__PURE__ */ _("div", { className: "border-t border-zinc-200 dark:border-zinc-800 px-4 py-6 sm:px-6 mt-6 bg-white dark:bg-zinc-900", children: [
        /* @__PURE__ */ _("div", { className: "flex justify-between text-base font-medium text-zinc-900 dark:text-white", children: [
          /* @__PURE__ */ x("p", { children: "Subtotal" }),
          /* @__PURE__ */ _("p", { children: [
            "$",
            s.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ x("p", { className: "mt-0.5 text-sm text-zinc-500", children: "Shipping and taxes calculated at checkout." }),
        /* @__PURE__ */ x("div", { className: "mt-6", children: /* @__PURE__ */ x(fy, { className: "w-full flex items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white shadow-sm", variant: "primary", children: "Checkout" }) }),
        /* @__PURE__ */ x("div", { className: "mt-6 flex justify-center text-center text-sm text-zinc-500", children: /* @__PURE__ */ _("p", { children: [
          "or",
          " ",
          /* @__PURE__ */ _(
            "button",
            {
              type: "button",
              className: "font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400",
              onClick: () => t(!1),
              children: [
                "Continue Shopping",
                /* @__PURE__ */ x("span", { "aria-hidden": "true", children: " →" })
              ]
            }
          )
        ] }) })
      ] })
    ] })
  ] });
}
function vS(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x(
    "div",
    E(v({}, t), {
      className: Y(e, "relative overflow-hidden bg-white dark:bg-zinc-900 py-16 sm:py-24 lg:py-32")
    })
  );
}
function bS(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x(
    "h1",
    E(v({}, t), {
      className: Y(
        e,
        "text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl lg:text-6xl"
      )
    })
  );
}
function yS(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x(
    "p",
    E(v({}, t), {
      className: Y(
        e,
        "mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-300"
      )
    })
  );
}
function xS(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x(
    "div",
    E(v({}, t), {
      className: Y(e, "mt-10 flex items-center gap-x-6")
    })
  );
}
function wS(i) {
  var o = i, { className: e, src: t, alt: n } = o, r = k(o, ["className", "src", "alt"]);
  return /* @__PURE__ */ x("div", { className: "mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow", children: /* @__PURE__ */ x(
    "img",
    E(v({}, r), {
      src: t,
      alt: n,
      className: Y(e, "mx-auto w-[22.875rem] max-w-full drop-shadow-xl")
    })
  ) });
}
function ES(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x(
    "div",
    E(v({}, t), {
      className: Y(e, "py-24 sm:py-32 bg-white dark:bg-zinc-900")
    })
  );
}
function SS(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x(
    "div",
    E(v({}, t), {
      className: Y(
        e,
        "mx-auto max-w-7xl px-6 lg:px-8 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
      )
    })
  );
}
function TS(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x("div", v({ className: Y(e, "flex flex-col") }, t));
}
function PS(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x("div", { className: Y(e, "mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600"), children: t.children });
}
function kS(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x(
    "div",
    E(v({}, t), {
      className: Y(e, "text-base font-semibold leading-7 text-zinc-900 dark:text-white")
    })
  );
}
function CS(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x(
    "div",
    E(v({}, t), {
      className: Y(e, "mt-1 flex flex-auto flex-col text-base leading-7 text-zinc-600 dark:text-zinc-400")
    })
  );
}
function OS(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x(
    "div",
    E(v({}, t), {
      className: Y(e, "bg-white dark:bg-zinc-900 py-24 sm:py-32")
    })
  );
}
function $S(r) {
  var i = r, { className: e, featured: t } = i, n = k(i, ["className", "featured"]);
  return /* @__PURE__ */ x(
    "div",
    E(v({}, n), {
      className: Y(
        e,
        "rounded-3xl p-8 ring-1 ring-zinc-200 dark:ring-zinc-800 xl:p-10",
        t ? "bg-zinc-900 dark:bg-zinc-800 ring-zinc-900 dark:ring-zinc-700" : "bg-white dark:bg-zinc-900/50"
      )
    })
  );
}
function AS(r) {
  var i = r, { className: e, featured: t } = i, n = k(i, ["className", "featured"]);
  return /* @__PURE__ */ x(
    "h3",
    E(v({}, n), {
      className: Y(
        e,
        "text-lg font-semibold leading-8",
        t ? "text-white" : "text-zinc-900 dark:text-white"
      )
    })
  );
}
function MS(r) {
  var i = r, { className: e, featured: t } = i, n = k(i, ["className", "featured"]);
  return /* @__PURE__ */ x(
    "p",
    E(v({}, n), {
      className: Y(
        e,
        "mt-4 text-sm leading-6",
        t ? "text-zinc-300" : "text-zinc-500 dark:text-zinc-400"
      )
    })
  );
}
function RS({ children: e, featured: t }) {
  return /* @__PURE__ */ _("p", { className: "mt-6 flex items-baseline gap-x-1", children: [
    /* @__PURE__ */ x("span", { className: Y("text-4xl font-bold tracking-tight", t ? "text-white" : "text-zinc-900 dark:text-white"), children: e }),
    /* @__PURE__ */ x("span", { className: Y("text-sm font-semibold leading-6", t ? "text-zinc-300" : "text-zinc-600 dark:text-zinc-400"), children: "/month" })
  ] });
}
function DS(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x(
    "ul",
    E(v({}, t), {
      role: "list",
      className: Y(e, "mt-8 space-y-3 text-sm leading-6 xl:mt-10")
    })
  );
}
function LS({ children: e, featured: t }) {
  return /* @__PURE__ */ _("li", { className: Y("flex gap-x-3", t ? "text-zinc-300" : "text-zinc-600 dark:text-zinc-300"), children: [
    /* @__PURE__ */ x(fs, { className: Y("h-6 w-5 flex-none", t ? "text-white" : "text-blue-600"), "aria-hidden": "true" }),
    e
  ] });
}
function Vn(...e) {
  return Yh(Re(e));
}
function FS(i) {
  var o = i, { className: e, striped: t, dense: n } = o, r = k(o, ["className", "striped", "dense"]);
  return /* @__PURE__ */ x("div", { className: "relative w-full overflow-x-auto", children: /* @__PURE__ */ x(
    "table",
    E(v({}, r), {
      className: Vn(
        "w-full text-left text-sm",
        t && "[&_tbody_tr:nth-child(even)]:bg-zinc-950/[2.5%] dark:[&_tbody_tr:nth-child(even)]:bg-white/[2.5%]",
        n ? "[&_td]:py-2 [&_th]:py-2" : "[&_td]:py-4 [&_th]:py-4",
        e
      )
    })
  ) });
}
function IS(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x("thead", E(v({}, t), { className: Vn("text-zinc-500 dark:text-zinc-400 border-b border-zinc-950/10 dark:border-white/10", e) }));
}
function NS(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x("tbody", E(v({}, t), { className: Vn(e) }));
}
function VS(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x(
    "tr",
    E(v({}, t), {
      className: Vn(
        "border-b border-zinc-950/5 dark:border-white/5 last:border-none hover:bg-zinc-950/[2.5%] dark:hover:bg-white/[2.5%] transition-colors",
        e
      )
    })
  );
}
function BS(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x(
    "th",
    E(v({}, t), {
      className: Vn(
        "px-4 font-medium text-zinc-500 dark:text-zinc-400",
        e
      )
    })
  );
}
function jS(n) {
  var r = n, { className: e } = r, t = k(r, ["className"]);
  return /* @__PURE__ */ x(
    "td",
    E(v({}, t), {
      className: Vn(
        "px-4 text-zinc-950 dark:text-white",
        e
      )
    })
  );
}
const gE = {
  theme: "system",
  setTheme: () => null,
  toggleTheme: () => null,
  getTokenValue: () => "",
  setTokenValue: () => null
}, jh = S.createContext(gE);
function zS(s) {
  var a = s, {
    children: e,
    defaultTheme: t = "system",
    storageKey: n = "vite-ui-theme",
    theme: r,
    className: i
  } = a, o = k(a, [
    "children",
    "defaultTheme",
    "storageKey",
    "theme",
    "className"
  ]);
  const [l, u] = S.useState(
    () => typeof window != "undefined" && localStorage.getItem(n) || t
  );
  S.useEffect(() => {
    const f = window.document.documentElement;
    if (f.classList.remove("light", "dark"), l === "system") {
      const h = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      f.classList.add(h);
      return;
    }
    f.classList.add(l);
  }, [l]), S.useEffect(() => {
    if (!r) return;
    const f = window.document.documentElement;
    Object.entries(r).forEach(([h, d]) => {
      const p = h.startsWith("--") ? h : `--${h}`;
      f.style.setProperty(p, String(d));
    });
  }, [r]);
  const c = S.useMemo(
    () => ({
      theme: l,
      setTheme: (f) => {
        localStorage.setItem(n, f), u(f);
      },
      toggleTheme: () => {
        u((f) => {
          const h = f === "dark" ? "light" : "dark";
          return localStorage.setItem(n, h), h;
        });
      },
      getTokenValue: (f) => {
        if (typeof window == "undefined") return "";
        const h = f.startsWith("--") ? f : `--${f}`;
        return getComputedStyle(document.documentElement).getPropertyValue(h).trim();
      },
      setTokenValue: (f, h) => {
        if (typeof window == "undefined") return;
        const d = f.startsWith("--") ? f : `--${f}`;
        document.documentElement.style.setProperty(d, h);
      }
    }),
    [l, n, r]
  );
  return /* @__PURE__ */ x(jh.Provider, E(v({}, o), { value: c, children: /* @__PURE__ */ x("div", { className: i, children: e }) }));
}
const vE = () => {
  const e = S.useContext(jh);
  if (e === void 0)
    throw new Error("useTheme must be used within a ThemeProvider");
  return e;
};
function Dr({ icon: e, label: t, active: n = !1 }) {
  return /* @__PURE__ */ _("button", { className: `relative flex items-center justify-center h-9 px-3 rounded-full transition-all duration-300 group overflow-hidden ${n ? "bg-black/5 dark:bg-white/10 text-blue-600 dark:text-blue-400" : "hover:bg-black/5 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400"}`, children: [
    /* @__PURE__ */ x("span", { className: "relative z-10", children: e }),
    /* @__PURE__ */ x("span", { className: `ml-2 text-sm font-medium whitespace-nowrap max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 transition-all duration-300 ease-in-out ${n ? "max-w-xs opacity-100" : ""}`, children: t })
  ] });
}
function _S({ onLogout: e, activeTab: t = "Overview", onNavigateToWorkspace: n }) {
  const { theme: r, toggleTheme: i } = vE();
  return /* @__PURE__ */ x("div", { className: "fixed top-6 left-1/2 -translate-x-1/2 z-50", children: /* @__PURE__ */ _("div", { className: "flex items-center p-2 rounded-full gap-2 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-lg", children: [
    /* @__PURE__ */ _("div", { className: "px-4", children: [
      /* @__PURE__ */ x("img", { src: "/logo-on-light.jpg", alt: "Strata", className: "h-5 w-auto block dark:hidden" }),
      /* @__PURE__ */ x("img", { src: "/logo-on-dark.jpg", alt: "Strata", className: "h-5 w-auto hidden dark:block" })
    ] }),
    /* @__PURE__ */ x("div", { className: "h-6 w-px bg-gray-200 dark:bg-white/10 mx-1" }),
    /* @__PURE__ */ _("div", { className: "flex items-center gap-1", children: [
      /* @__PURE__ */ x(Dr, { icon: /* @__PURE__ */ x(kl, { className: "w-4 h-4" }), label: "Overview", active: t === "Overview" }),
      /* @__PURE__ */ x(Dr, { icon: /* @__PURE__ */ x(Pl, { className: "w-4 h-4" }), label: "Inventory", active: t === "Inventory" }),
      /* @__PURE__ */ x(Dr, { icon: /* @__PURE__ */ x(ky, { className: "w-4 h-4" }), label: "Production", active: t === "Production" }),
      /* @__PURE__ */ x(Dr, { icon: /* @__PURE__ */ x(Wy, { className: "w-4 h-4" }), label: "Orders", active: t === "Orders" })
    ] }),
    /* @__PURE__ */ x("div", { className: "h-6 w-px bg-gray-200 dark:bg-white/10 mx-1" }),
    /* @__PURE__ */ _("div", { className: "flex items-center gap-2 pr-2", children: [
      /* @__PURE__ */ _(jd, { className: "relative", children: [
        /* @__PURE__ */ x(Ks, { className: "p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors outline-none", children: /* @__PURE__ */ x(Bo, { className: "w-4 h-4" }) }),
        /* @__PURE__ */ x(
          Ii,
          {
            as: ke,
            enter: "transition ease-out duration-200",
            enterFrom: "opacity-0 translate-y-1",
            enterTo: "opacity-100 translate-y-0",
            leave: "transition ease-in duration-150",
            leaveFrom: "opacity-100 translate-y-0",
            leaveTo: "opacity-0 translate-y-1",
            children: /* @__PURE__ */ x(Gs, { className: "fixed top-[90px] left-1/2 -translate-x-1/2 w-[400px] p-4 bg-white/85 dark:bg-zinc-900/85 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl z-[100] overflow-hidden", children: /* @__PURE__ */ x("div", { className: "grid grid-cols-3 gap-4", children: [
              { icon: /* @__PURE__ */ x(My, { className: "w-8 h-8" }), label: "My Work Space", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/30", isHighlighted: !0, onClick: n },
              { icon: /* @__PURE__ */ x(kl, { className: "w-8 h-8" }), label: "Portal", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10" },
              { icon: /* @__PURE__ */ x(ef, { className: "w-8 h-8" }), label: "CRM", color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-500/10" },
              { icon: /* @__PURE__ */ x(Zd, { className: "w-8 h-8" }), label: "Invoice", color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-500/10" },
              { icon: /* @__PURE__ */ x(Pl, { className: "w-8 h-8" }), label: "Inventory", color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-500/10" },
              { icon: /* @__PURE__ */ x(Fy, { className: "w-8 h-8" }), label: "Analytics", color: "text-pink-600 dark:text-pink-400", bg: "bg-pink-50 dark:bg-pink-500/10" },
              { icon: /* @__PURE__ */ x(qy, { className: "w-8 h-8" }), label: "Support", color: "text-cyan-600 dark:text-cyan-400", bg: "bg-cyan-50 dark:bg-cyan-500/10" },
              { icon: /* @__PURE__ */ x(Bo, { className: "w-8 h-8" }), label: "Board", color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-500/10" },
              { icon: /* @__PURE__ */ x(Dy, { className: "w-8 h-8" }), label: "Calendar", color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-500/10" },
              { icon: /* @__PURE__ */ x(Yy, { className: "w-8 h-8" }), label: "More", color: "text-gray-600 dark:text-gray-400", bg: "bg-gray-100 dark:bg-gray-800" }
            ].map((o, s) => /* @__PURE__ */ _(
              "button",
              {
                onClick: o.onClick,
                className: `flex flex-col items-center gap-3 p-3 rounded-2xl hover:bg-black/5 dark:hover:bg-white/10 transition-all group ${// @ts-ignore
                o.isHighlighted ? "ring-2 ring-blue-500/20 bg-blue-50/50 dark:bg-blue-900/10" : ""}`,
                children: [
                  /* @__PURE__ */ x("div", { className: `p-3 rounded-2xl ${o.bg} ${o.color} group-hover:scale-110 transition-transform shadow-sm`, children: o.icon }),
                  /* @__PURE__ */ x("span", { className: `text-xs font-semibold group-hover:text-gray-900 dark:group-hover:text-white ${// @ts-ignore
                  o.isHighlighted ? "text-blue-700 dark:text-blue-300" : "text-gray-700 dark:text-gray-200"}`, children: o.label })
                ]
              },
              s
            )) }) })
          }
        )
      ] }),
      /* @__PURE__ */ x("button", { onClick: i, className: "p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors", children: r === "dark" ? /* @__PURE__ */ x(ux, { className: "w-4 h-4" }) : /* @__PURE__ */ x(ox, { className: "w-4 h-4" }) }),
      /* @__PURE__ */ _("div", { className: "relative group", children: [
        /* @__PURE__ */ _("button", { className: "flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors", children: [
          /* @__PURE__ */ x("div", { className: "w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-sm", children: "JD" }),
          /* @__PURE__ */ _("div", { className: "text-left hidden md:block", children: [
            /* @__PURE__ */ x("p", { className: "text-xs font-semibold text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white", children: "Jhon Doe" }),
            /* @__PURE__ */ x("p", { className: "text-[10px] text-gray-500 dark:text-gray-400", children: "Admin" })
          ] }),
          /* @__PURE__ */ x(jy, { className: "w-3 h-3 text-gray-400 dark:text-gray-500" })
        ] }),
        /* @__PURE__ */ _("div", { className: "absolute top-full right-0 mt-2 w-48 py-1 rounded-xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/20 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right", children: [
          /* @__PURE__ */ _("div", { className: "px-4 py-2 border-b border-gray-200 dark:border-white/10", children: [
            /* @__PURE__ */ x("p", { className: "text-sm font-medium", children: "Jhon Doe" }),
            /* @__PURE__ */ x("p", { className: "text-xs text-gray-500", children: "Admin" })
          ] }),
          /* @__PURE__ */ _("button", { onClick: e, className: "w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-2", children: [
            /* @__PURE__ */ x(Ey, { className: "w-4 h-4" }),
            "Sign Out"
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  lS as ActionCenter,
  mE as ActionPanel,
  py as Badge,
  fy as Button,
  OE as Card,
  RE as Checkbox,
  ME as CheckboxField,
  AE as CheckboxGroup,
  HE as Combobox,
  UE as ComboboxOption,
  VE as Description,
  oS as DescriptionDetails,
  rS as DescriptionList,
  iS as DescriptionTerm,
  KE as Disclosure,
  GE as DisclosureButton,
  YE as DisclosurePanel,
  qE as EmptyState,
  eS as EmptyStateActions,
  JE as EmptyStateDescription,
  ZE as EmptyStateIcon,
  QE as EmptyStateTitle,
  BE as ErrorMessage,
  TS as Feature,
  CS as FeatureDescription,
  SS as FeatureGrid,
  PS as FeatureIcon,
  ES as FeatureSection,
  kS as FeatureTitle,
  IE as Field,
  FE as FieldGroup,
  DE as Fieldset,
  vS as Hero,
  xS as HeroButtons,
  wS as HeroImage,
  yS as HeroSubtitle,
  bS as HeroTitle,
  $E as Input,
  NE as Label,
  LE as Legend,
  jE as Listbox,
  WE as ListboxDescription,
  _E as ListboxLabel,
  zE as ListboxOption,
  _S as Navbar,
  $S as PricingCard,
  RS as PricingCost,
  LS as PricingFeature,
  DS as PricingFeatures,
  MS as PricingPrice,
  OS as PricingSection,
  AS as PricingTitle,
  mS as ProductCard,
  dS as ProductDetails,
  uS as ProductGallery,
  pS as ProductGrid,
  cS as ProductLayout,
  hS as ProductPrice,
  fS as ProductTitle,
  gS as ShoppingCart,
  my as SlideOver,
  vy as SlideOverBody,
  XE as SlideOverDescription,
  by as SlideOverHeader,
  gy as SlideOverTitle,
  tS as StackedList,
  nS as StackedListItem,
  FS as Table,
  NS as TableBody,
  jS as TableCell,
  BS as TableHead,
  IS as TableHeader,
  VS as TableRow,
  zS as ThemeProvider,
  Vn as cn,
  US as tokens,
  vE as useTheme
};

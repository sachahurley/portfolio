import { jsxs as y, jsx as o, Fragment as ge } from "react/jsx-runtime";
import ze, { useState as V, useEffect as G, forwardRef as re, useId as ce, useRef as Z, useMemo as Le, useCallback as he, useLayoutEffect as Pe, isValidElement as He, cloneElement as bt, useImperativeHandle as Cr, Fragment as ht, Children as Mr, useSyncExternalStore as Ut, createContext as Ue, useContext as Ae } from "react";
import { useTheme as Rr, ThemeProvider as Lr } from "next-themes";
import { createPortal as Pr } from "react-dom";
const Dr = { small: "sm", medium: "md", large: "lg" }, It = /* @__PURE__ */ new Set();
function se(e, t, r = "md") {
  if (e == null) return r;
  const n = Dr[e];
  return n ? (!(process.env.NODE_ENV === "production") && !It.has(t) && (It.add(t), console.warn(
    `[@scorp-ds/components] ${t}: size="${e}" is deprecated. Use size="${n}" (the scale is sm | md | lg).`
  )), n) : e;
}
function Wt(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var a = e.length;
    for (t = 0; t < a; t++) e[t] && (r = Wt(e[t])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function Or() {
  for (var e, t, r = 0, n = "", a = arguments.length; r < a; r++) (e = arguments[r]) && (t = Wt(e)) && (n && (n += " "), n += t);
  return n;
}
const jr = (e, t) => {
  const r = new Array(e.length + t.length);
  for (let n = 0; n < e.length; n++)
    r[n] = e[n];
  for (let n = 0; n < t.length; n++)
    r[e.length + n] = t[n];
  return r;
}, Br = (e, t) => ({
  classGroupId: e,
  validator: t
}), Kt = (e = /* @__PURE__ */ new Map(), t = null, r) => ({
  nextPart: e,
  validators: t,
  classGroupId: r
}), Je = "-", Tt = [], Fr = "arbitrary..", Vr = (e) => {
  const t = Hr(e), {
    conflictingClassGroups: r,
    conflictingClassGroupModifiers: n
  } = e;
  return {
    getClassGroupId: (i) => {
      if (i.startsWith("[") && i.endsWith("]"))
        return Gr(i);
      const l = i.split(Je), c = l[0] === "" && l.length > 1 ? 1 : 0;
      return qt(l, c, t);
    },
    getConflictingClassGroupIds: (i, l) => {
      if (l) {
        const c = n[i], d = r[i];
        return c ? d ? jr(d, c) : c : d || Tt;
      }
      return r[i] || Tt;
    }
  };
}, qt = (e, t, r) => {
  if (e.length - t === 0)
    return r.classGroupId;
  const a = e[t], s = r.nextPart.get(a);
  if (s) {
    const d = qt(e, t + 1, s);
    if (d) return d;
  }
  const i = r.validators;
  if (i === null)
    return;
  const l = t === 0 ? e.join(Je) : e.slice(t).join(Je), c = i.length;
  for (let d = 0; d < c; d++) {
    const u = i[d];
    if (u.validator(l))
      return u.classGroupId;
  }
}, Gr = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const t = e.slice(1, -1), r = t.indexOf(":"), n = t.slice(0, r);
  return n ? Fr + n : void 0;
})(), Hr = (e) => {
  const {
    theme: t,
    classGroups: r
  } = e;
  return Ur(r, t);
}, Ur = (e, t) => {
  const r = Kt();
  for (const n in e) {
    const a = e[n];
    gt(a, r, n, t);
  }
  return r;
}, gt = (e, t, r, n) => {
  const a = e.length;
  for (let s = 0; s < a; s++) {
    const i = e[s];
    Wr(i, t, r, n);
  }
}, Wr = (e, t, r, n) => {
  if (typeof e == "string") {
    Kr(e, t, r);
    return;
  }
  if (typeof e == "function") {
    qr(e, t, r, n);
    return;
  }
  Xr(e, t, r, n);
}, Kr = (e, t, r) => {
  const n = e === "" ? t : Xt(t, e);
  n.classGroupId = r;
}, qr = (e, t, r, n) => {
  if (Yr(e)) {
    gt(e(n), t, r, n);
    return;
  }
  t.validators === null && (t.validators = []), t.validators.push(Br(r, e));
}, Xr = (e, t, r, n) => {
  const a = Object.entries(e), s = a.length;
  for (let i = 0; i < s; i++) {
    const [l, c] = a[i];
    gt(c, Xt(t, l), r, n);
  }
}, Xt = (e, t) => {
  let r = e;
  const n = t.split(Je), a = n.length;
  for (let s = 0; s < a; s++) {
    const i = n[s];
    let l = r.nextPart.get(i);
    l || (l = Kt(), r.nextPart.set(i, l)), r = l;
  }
  return r;
}, Yr = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, Zr = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, r = /* @__PURE__ */ Object.create(null), n = /* @__PURE__ */ Object.create(null);
  const a = (s, i) => {
    r[s] = i, t++, t > e && (t = 0, n = r, r = /* @__PURE__ */ Object.create(null));
  };
  return {
    get(s) {
      let i = r[s];
      if (i !== void 0)
        return i;
      if ((i = n[s]) !== void 0)
        return a(s, i), i;
    },
    set(s, i) {
      s in r ? r[s] = i : a(s, i);
    }
  };
}, dt = "!", Et = ":", Qr = [], At = (e, t, r, n, a) => ({
  modifiers: e,
  hasImportantModifier: t,
  baseClassName: r,
  maybePostfixModifierPosition: n,
  isExternal: a
}), Jr = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: r
  } = e;
  let n = (a) => {
    const s = [];
    let i = 0, l = 0, c = 0, d;
    const u = a.length;
    for (let p = 0; p < u; p++) {
      const x = a[p];
      if (i === 0 && l === 0) {
        if (x === Et) {
          s.push(a.slice(c, p)), c = p + 1;
          continue;
        }
        if (x === "/") {
          d = p;
          continue;
        }
      }
      x === "[" ? i++ : x === "]" ? i-- : x === "(" ? l++ : x === ")" && l--;
    }
    const m = s.length === 0 ? a : a.slice(c);
    let f = m, h = !1;
    m.endsWith(dt) ? (f = m.slice(0, -1), h = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      m.startsWith(dt) && (f = m.slice(1), h = !0)
    );
    const b = d && d > c ? d - c : void 0;
    return At(s, h, f, b);
  };
  if (t) {
    const a = t + Et, s = n;
    n = (i) => i.startsWith(a) ? s(i.slice(a.length)) : At(Qr, !1, i, void 0, !0);
  }
  if (r) {
    const a = n;
    n = (s) => r({
      className: s,
      parseClassName: a
    });
  }
  return n;
}, en = (e) => {
  const t = /* @__PURE__ */ new Map();
  return e.orderSensitiveModifiers.forEach((r, n) => {
    t.set(r, 1e6 + n);
  }), (r) => {
    const n = [];
    let a = [];
    for (let s = 0; s < r.length; s++) {
      const i = r[s], l = i[0] === "[", c = t.has(i);
      l || c ? (a.length > 0 && (a.sort(), n.push(...a), a = []), n.push(i)) : a.push(i);
    }
    return a.length > 0 && (a.sort(), n.push(...a)), n;
  };
}, tn = (e) => ({
  cache: Zr(e.cacheSize),
  parseClassName: Jr(e),
  sortModifiers: en(e),
  ...Vr(e)
}), rn = /\s+/, nn = (e, t) => {
  const {
    parseClassName: r,
    getClassGroupId: n,
    getConflictingClassGroupIds: a,
    sortModifiers: s
  } = t, i = [], l = e.trim().split(rn);
  let c = "";
  for (let d = l.length - 1; d >= 0; d -= 1) {
    const u = l[d], {
      isExternal: m,
      modifiers: f,
      hasImportantModifier: h,
      baseClassName: b,
      maybePostfixModifierPosition: p
    } = r(u);
    if (m) {
      c = u + (c.length > 0 ? " " + c : c);
      continue;
    }
    let x = !!p, z = n(x ? b.substring(0, p) : b);
    if (!z) {
      if (!x) {
        c = u + (c.length > 0 ? " " + c : c);
        continue;
      }
      if (z = n(b), !z) {
        c = u + (c.length > 0 ? " " + c : c);
        continue;
      }
      x = !1;
    }
    const g = f.length === 0 ? "" : f.length === 1 ? f[0] : s(f).join(":"), $ = h ? g + dt : g, k = $ + z;
    if (i.indexOf(k) > -1)
      continue;
    i.push(k);
    const N = a(z, x);
    for (let _ = 0; _ < N.length; ++_) {
      const T = N[_];
      i.push($ + T);
    }
    c = u + (c.length > 0 ? " " + c : c);
  }
  return c;
}, on = (...e) => {
  let t = 0, r, n, a = "";
  for (; t < e.length; )
    (r = e[t++]) && (n = Yt(r)) && (a && (a += " "), a += n);
  return a;
}, Yt = (e) => {
  if (typeof e == "string")
    return e;
  let t, r = "";
  for (let n = 0; n < e.length; n++)
    e[n] && (t = Yt(e[n])) && (r && (r += " "), r += t);
  return r;
}, an = (e, ...t) => {
  let r, n, a, s;
  const i = (c) => {
    const d = t.reduce((u, m) => m(u), e());
    return r = tn(d), n = r.cache.get, a = r.cache.set, s = l, l(c);
  }, l = (c) => {
    const d = n(c);
    if (d)
      return d;
    const u = nn(c, r);
    return a(c, u), u;
  };
  return s = i, (...c) => s(on(...c));
}, sn = [], ae = (e) => {
  const t = (r) => r[e] || sn;
  return t.isThemeGetter = !0, t;
}, Zt = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Qt = /^\((?:(\w[\w-]*):)?(.+)\)$/i, ln = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, cn = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, dn = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, un = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, mn = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, fn = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, ke = (e) => ln.test(e), F = (e) => !!e && !Number.isNaN(Number(e)), Ne = (e) => !!e && Number.isInteger(Number(e)), nt = (e) => e.endsWith("%") && F(e.slice(0, -1)), we = (e) => cn.test(e), Jt = () => !0, pn = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  dn.test(e) && !un.test(e)
), xt = () => !1, bn = (e) => mn.test(e), hn = (e) => fn.test(e), gn = (e) => !M(e) && !R(e), xn = (e) => _e(e, rr, xt), M = (e) => Zt.test(e), Te = (e) => _e(e, nr, pn), Ct = (e) => _e(e, zn, F), vn = (e) => _e(e, ar, Jt), yn = (e) => _e(e, or, xt), Mt = (e) => _e(e, er, xt), wn = (e) => _e(e, tr, hn), Xe = (e) => _e(e, sr, bn), R = (e) => Qt.test(e), je = (e) => Ce(e, nr), kn = (e) => Ce(e, or), Rt = (e) => Ce(e, er), Nn = (e) => Ce(e, rr), $n = (e) => Ce(e, tr), Ye = (e) => Ce(e, sr, !0), Sn = (e) => Ce(e, ar, !0), _e = (e, t, r) => {
  const n = Zt.exec(e);
  return n ? n[1] ? t(n[1]) : r(n[2]) : !1;
}, Ce = (e, t, r = !1) => {
  const n = Qt.exec(e);
  return n ? n[1] ? t(n[1]) : r : !1;
}, er = (e) => e === "position" || e === "percentage", tr = (e) => e === "image" || e === "url", rr = (e) => e === "length" || e === "size" || e === "bg-size", nr = (e) => e === "length", zn = (e) => e === "number", or = (e) => e === "family-name", ar = (e) => e === "number" || e === "weight", sr = (e) => e === "shadow", _n = () => {
  const e = ae("color"), t = ae("font"), r = ae("text"), n = ae("font-weight"), a = ae("tracking"), s = ae("leading"), i = ae("breakpoint"), l = ae("container"), c = ae("spacing"), d = ae("radius"), u = ae("shadow"), m = ae("inset-shadow"), f = ae("text-shadow"), h = ae("drop-shadow"), b = ae("blur"), p = ae("perspective"), x = ae("aspect"), z = ae("ease"), g = ae("animate"), $ = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], k = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-top",
    "top-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-top",
    "bottom-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-bottom",
    "bottom-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-bottom"
  ], N = () => [...k(), R, M], _ = () => ["auto", "hidden", "clip", "visible", "scroll"], T = () => ["auto", "contain", "none"], v = () => [R, M, c], O = () => [ke, "full", "auto", ...v()], C = () => [Ne, "none", "subgrid", R, M], te = () => ["auto", {
    span: ["full", Ne, R, M]
  }, Ne, R, M], Q = () => [Ne, "auto", R, M], oe = () => ["auto", "min", "max", "fr", R, M], W = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], K = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], L = () => ["auto", ...v()], E = () => [ke, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...v()], P = () => [ke, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...v()], H = () => [ke, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...v()], w = () => [e, R, M], U = () => [...k(), Rt, Mt, {
    position: [R, M]
  }], I = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], D = () => ["auto", "cover", "contain", Nn, xn, {
    size: [R, M]
  }], X = () => [nt, je, Te], Y = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    d,
    R,
    M
  ], ee = () => ["", F, je, Te], ue = () => ["solid", "dashed", "dotted", "double"], ie = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], J = () => [F, nt, Rt, Mt], fe = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    b,
    R,
    M
  ], xe = () => ["none", F, R, M], ve = () => ["none", F, R, M], B = () => [F, R, M], j = () => [ke, "full", ...v()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [we],
      breakpoint: [we],
      color: [Jt],
      container: [we],
      "drop-shadow": [we],
      ease: ["in", "out", "in-out"],
      font: [gn],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [we],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [we],
      shadow: [we],
      spacing: ["px", F],
      text: [we],
      "text-shadow": [we],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", ke, M, R, x]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [F, M, R, l]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": $()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": $()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: N()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: _()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": _()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": _()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: T()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": T()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": T()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Inset
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: O()
      }],
      /**
       * Inset Inline
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": O()
      }],
      /**
       * Inset Block
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": O()
      }],
      /**
       * Inset Inline Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-s` in next major release
       */
      start: [{
        "inset-s": O(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        start: O()
      }],
      /**
       * Inset Inline End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-e` in next major release
       */
      end: [{
        "inset-e": O(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        end: O()
      }],
      /**
       * Inset Block Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-bs": [{
        "inset-bs": O()
      }],
      /**
       * Inset Block End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-be": [{
        "inset-be": O()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: O()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: O()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: O()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: O()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [Ne, "auto", R, M]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [ke, "full", "auto", l, ...v()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [F, ke, "auto", "initial", "none", M]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", F, R, M]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", F, R, M]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [Ne, "first", "last", "none", R, M]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": C()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: te()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": Q()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": Q()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": C()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: te()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": Q()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": Q()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": oe()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": oe()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: v()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": v()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": v()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...W(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...K(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...K()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...W()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...K(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...K(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": W()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...K(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...K()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: v()
      }],
      /**
       * Padding Inline
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: v()
      }],
      /**
       * Padding Block
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: v()
      }],
      /**
       * Padding Inline Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: v()
      }],
      /**
       * Padding Inline End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: v()
      }],
      /**
       * Padding Block Start
       * @see https://tailwindcss.com/docs/padding
       */
      pbs: [{
        pbs: v()
      }],
      /**
       * Padding Block End
       * @see https://tailwindcss.com/docs/padding
       */
      pbe: [{
        pbe: v()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: v()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: v()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: v()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: v()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: L()
      }],
      /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: L()
      }],
      /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: L()
      }],
      /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: L()
      }],
      /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: L()
      }],
      /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */
      mbs: [{
        mbs: L()
      }],
      /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */
      mbe: [{
        mbe: L()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: L()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: L()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: L()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: L()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": v()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": v()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: E()
      }],
      /**
       * Inline Size
       * @see https://tailwindcss.com/docs/width
       */
      "inline-size": [{
        inline: ["auto", ...P()]
      }],
      /**
       * Min-Inline Size
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-inline-size": [{
        "min-inline": ["auto", ...P()]
      }],
      /**
       * Max-Inline Size
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-inline-size": [{
        "max-inline": ["none", ...P()]
      }],
      /**
       * Block Size
       * @see https://tailwindcss.com/docs/height
       */
      "block-size": [{
        block: ["auto", ...H()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-block-size": [{
        "min-block": ["auto", ...H()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-block-size": [{
        "max-block": ["none", ...H()]
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [l, "screen", ...E()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          l,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...E()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          l,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [i]
          },
          ...E()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...E()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...E()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...E()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", r, je, Te]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [n, Sn, vn]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", nt, M]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [kn, yn, t]
      }],
      /**
       * Font Feature Settings
       * @see https://tailwindcss.com/docs/font-feature-settings
       */
      "font-features": [{
        "font-features": [M]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [a, R, M]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [F, "none", R, Ct]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          s,
          ...v()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", R, M]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", R, M]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: w()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: w()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...ue(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [F, "from-font", "auto", R, Te]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: w()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [F, "auto", R, M]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: v()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", R, M]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", R, M]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: U()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: I()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: D()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, Ne, R, M],
          radial: ["", R, M],
          conic: [Ne, R, M]
        }, $n, wn]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: w()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: X()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: X()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: X()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: w()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: w()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: w()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: Y()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": Y()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": Y()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": Y()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": Y()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": Y()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": Y()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": Y()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": Y()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": Y()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": Y()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": Y()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": Y()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": Y()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": Y()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: ee()
      }],
      /**
       * Border Width Inline
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": ee()
      }],
      /**
       * Border Width Block
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": ee()
      }],
      /**
       * Border Width Inline Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": ee()
      }],
      /**
       * Border Width Inline End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": ee()
      }],
      /**
       * Border Width Block Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-bs": [{
        "border-bs": ee()
      }],
      /**
       * Border Width Block End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-be": [{
        "border-be": ee()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": ee()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": ee()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": ee()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": ee()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": ee()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": ee()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...ue(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...ue(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: w()
      }],
      /**
       * Border Color Inline
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": w()
      }],
      /**
       * Border Color Block
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": w()
      }],
      /**
       * Border Color Inline Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": w()
      }],
      /**
       * Border Color Inline End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": w()
      }],
      /**
       * Border Color Block Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-bs": [{
        "border-bs": w()
      }],
      /**
       * Border Color Block End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-be": [{
        "border-be": w()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": w()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": w()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": w()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": w()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: w()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...ue(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [F, R, M]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", F, je, Te]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: w()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          u,
          Ye,
          Xe
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: w()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", m, Ye, Xe]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": w()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: ee()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: w()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [F, Te]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": w()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": ee()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": w()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", f, Ye, Xe]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": w()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [F, R, M]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...ie(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": ie()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{
        "mask-linear": [F]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": J()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": J()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": w()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": w()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": J()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": J()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": w()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": w()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": J()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": J()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": w()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": w()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": J()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": J()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": w()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": w()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": J()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": J()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": w()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": w()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": J()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": J()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": w()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": w()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": J()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": J()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": w()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": w()
      }],
      "mask-image-radial": [{
        "mask-radial": [R, M]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": J()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": J()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": w()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": w()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": k()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [F]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": J()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": J()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": w()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": w()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{
        mask: U()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: I()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: D()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{
        mask: ["none", R, M]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          R,
          M
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: fe()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [F, R, M]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [F, R, M]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          h,
          Ye,
          Xe
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": w()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", F, R, M]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [F, R, M]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", F, R, M]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [F, R, M]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", F, R, M]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          R,
          M
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": fe()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [F, R, M]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [F, R, M]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", F, R, M]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [F, R, M]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", F, R, M]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [F, R, M]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [F, R, M]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", F, R, M]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": v()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": v()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": v()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", R, M]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [F, "initial", R, M]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", z, R, M]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [F, R, M]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", g, R, M]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [p, R, M]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": N()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: xe()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": xe()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": xe()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": xe()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: ve()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": ve()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": ve()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": ve()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: B()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": B()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": B()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [R, M, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: N()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: j()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": j()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": j()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": j()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: w()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: w()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", R, M]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": v()
      }],
      /**
       * Scroll Margin Inline
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": v()
      }],
      /**
       * Scroll Margin Block
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": v()
      }],
      /**
       * Scroll Margin Inline Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": v()
      }],
      /**
       * Scroll Margin Inline End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": v()
      }],
      /**
       * Scroll Margin Block Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbs": [{
        "scroll-mbs": v()
      }],
      /**
       * Scroll Margin Block End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbe": [{
        "scroll-mbe": v()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": v()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": v()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": v()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": v()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": v()
      }],
      /**
       * Scroll Padding Inline
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": v()
      }],
      /**
       * Scroll Padding Block
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": v()
      }],
      /**
       * Scroll Padding Inline Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": v()
      }],
      /**
       * Scroll Padding Inline End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": v()
      }],
      /**
       * Scroll Padding Block Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbs": [{
        "scroll-pbs": v()
      }],
      /**
       * Scroll Padding Block End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbe": [{
        "scroll-pbe": v()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": v()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": v()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": v()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": v()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", R, M]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...w()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [F, je, Te, Ct]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...w()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "inset-bs", "inset-be", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pbs", "pbe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mbs", "mbe", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-bs", "border-w-be", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-bs", "border-color-be", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mbs", "scroll-mbe", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pbs", "scroll-pbe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
}, In = /* @__PURE__ */ an(_n);
function S(...e) {
  return In(Or(e));
}
const Fe = [
  [0, 0],
  [3, 0],
  [6, 0],
  [6, 3],
  [6, 6],
  [3, 6],
  [0, 6],
  [0, 3]
], Tn = 2, En = 100, Lt = "(prefers-reduced-motion: reduce)";
function ir(e) {
  return Fe.filter((t, r) => e === null || (r - e + Fe.length) % Fe.length >= Tn).map(([t, r]) => `M${t} ${r}h2v2h-2Z`).join("");
}
const An = Fe.map((e, t) => ir(t)), Cn = ir(null);
function Mn() {
  const [e, t] = V(
    () => typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia(Lt).matches
  );
  return G(() => {
    var a;
    if (typeof window > "u" || typeof window.matchMedia != "function") return;
    const r = window.matchMedia(Lt), n = () => t(r.matches);
    return n(), (a = r.addEventListener) == null || a.call(r, "change", n), () => {
      var s;
      return (s = r.removeEventListener) == null ? void 0 : s.call(r, "change", n);
    };
  }, []), e;
}
function lr({ size: e = "md", label: t = "Loading", className: r }) {
  const n = se(e, "Spinner"), a = Mn(), [s, i] = V(0);
  G(() => {
    if (a) return;
    const u = setInterval(() => i((m) => (m + 1) % Fe.length), En);
    return () => clearInterval(u);
  }, [a]);
  const l = {
    sm: { box: "w-3 h-3", pixel: 1.5 },
    md: { box: "w-4 h-4", pixel: 2 },
    lg: { box: "w-6 h-6", pixel: 3 }
  }, { box: c, pixel: d } = l[n];
  return /* @__PURE__ */ y("span", { role: "status", className: S("inline-flex shrink-0 items-center justify-center", c, r), children: [
    /* @__PURE__ */ o(
      "svg",
      {
        "aria-hidden": "true",
        viewBox: "0 0 8 8",
        width: 8 * d,
        height: 8 * d,
        fill: "currentColor",
        shapeRendering: "crispEdges",
        "data-spinner-frame": a ? "static" : s,
        children: /* @__PURE__ */ o("path", { d: a ? Cn : An[s] })
      }
    ),
    /* @__PURE__ */ o("span", { className: "sr-only", children: t })
  ] });
}
lr.displayName = "Spinner";
const We = re(
  ({
    variant: e = "primary",
    size: t = "md",
    disabled: r = !1,
    className: n = "",
    children: a,
    iconLeft: s,
    iconRight: i,
    href: l,
    target: c,
    rel: d,
    loading: u = !1,
    onClick: m,
    "aria-label": f,
    "aria-labelledby": h,
    ...b
  }, p) => {
    const x = se(t, "Button", "md"), z = `
      inline-flex items-center justify-center
      font-mono text-sm
      transition-colors [transition-duration:var(--duration-fast)]
      cursor-pointer
      disabled:cursor-not-allowed disabled:opacity-50
      focus:outline-none
      focus-visible:![box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--btn-ring)]
    `, g = () => e === "icon" ? !0 : !a || typeof a == "string" || typeof a == "number" ? !1 : typeof a == "object" && a !== null && "type" in a ? typeof a.type < "u" : Array.isArray(a) ? a.every(
      (L) => typeof L == "object" && L !== null && "type" in L
    ) : !1;
    G(() => {
      if (process.env.NODE_ENV === "production" || !(e === "icon" || g())) return;
      f != null && String(f).trim() !== "" || h != null && String(h).trim() !== "" || console.warn(
        "[@scorp-ds/components] Button: icon-only buttons should include aria-label or aria-labelledby for screen readers."
      );
    }, [e, x, a, s, i, f, h]), G(() => {
      process.env.NODE_ENV === "production" || x !== "icon" || console.warn(
        '[@scorp-ds/components] Button: size="icon" is deprecated. Icon-only buttons are squared automatically; use size="md".'
      );
    }, [x]);
    const $ = () => {
      if (g() || e === "icon")
        switch (x) {
          case "sm":
            return "size-control-sm plate-round";
          case "lg":
            return "size-control-lg plate-round";
          case "icon":
            return "size-control-md plate-round";
          default:
            return "size-control-md plate-round";
        }
      switch (x) {
        case "sm":
          return "h-control-sm px-4 py-1.5 plate-round";
        case "lg":
          return "h-control-lg px-6 py-3.5 plate-round";
        case "icon":
          return "size-control-md plate-round";
        default:
          return "h-control-md px-5 py-2.5 plate-round";
      }
    }, k = {
      primary: `
        bg-[var(--button-primary-background)] hover:bg-[var(--button-primary-background-hover)] active:brightness-95
        text-[var(--button-primary-text)]
      `,
      secondary: `
        bg-[var(--button-secondary-background)] hover:bg-[var(--button-secondary-background-hover)] active:brightness-95
        text-[var(--button-secondary-text)] hover:text-[var(--button-secondary-text-hover)]
      `,
      ghost: `
        bg-[var(--button-ghost-background)] hover:bg-[var(--button-ghost-background-hover)] active:brightness-95
        text-[var(--button-ghost-text)]
      `,
      link: `
        bg-transparent hover:underline
        text-[var(--button-link-text)] hover:text-[var(--button-link-text-hover)]
      `,
      outline: `
        relative isolate
        bg-[var(--button-outline-border)]
        text-[var(--button-outline-text)]
        before:content-[''] before:absolute before:inset-px before:-z-[1]
        before:[clip-path:var(--plate-round)]
        before:bg-[var(--button-outline-background)] hover:before:bg-[var(--button-outline-background-hover)]
        before:transition-colors before:[transition-duration:var(--duration-fast)]
        active:brightness-95
        focus-visible:before:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--btn-ring)]
      `,
      destructive: `
        bg-[var(--button-destructive-background)] hover:bg-[var(--button-destructive-background-hover)] active:brightness-95
        text-[var(--button-destructive-text)]
      `,
      icon: `
        bg-[var(--button-icon-background)] hover:bg-[var(--button-icon-background-hover)] active:brightness-95
        text-[var(--button-icon-text)]
        disabled:bg-[var(--button-icon-disabled-background)] disabled:text-[var(--button-icon-disabled-text)]
        disabled:opacity-100
      `
    }, N = {
      sm: "w-4 h-4",
      // 16px
      md: "w-5 h-5",
      // 20px
      lg: "w-6 h-6",
      // 24px
      icon: "w-5 h-5"
      // 20px
    }, _ = {
      sm: "gap-1.5",
      // 6px - tighter for visual balance in compact buttons
      md: "gap-2",
      // 8px - standard spacing
      lg: "gap-2.5",
      // 10px - more breathing room for larger buttons
      icon: "gap-0"
      // No gap for icon-only
    }, T = (L) => L ? typeof L == "object" && L !== null && "type" in L ? /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center shrink-0 ${N[x]}`, children: L }) : L : null, v = () => {
      if (g() && a) {
        const E = x === "icon" ? "md" : x;
        return typeof a == "object" && a !== null && "type" in a ? /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center shrink-0 ${N[E]}`, children: a }) : /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center shrink-0 ${N[E]}`, children: a });
      }
      return a;
    }, O = {
      "--btn-ring": e === "primary" || e === "link" ? "var(--focus-ring-primary)" : e === "destructive" ? "var(--focus-ring-destructive)" : e === "icon" ? "var(--focus-ring-icon)" : "var(--focus-ring-secondary)",
      outline: "none"
    }, C = u && !r, te = (L) => {
      if (C) {
        L.preventDefault();
        return;
      }
      m == null || m(L);
    }, Q = x === "icon" ? "md" : x, oe = C ? "relative cursor-progress" : "", W = /* @__PURE__ */ y(ge, { children: [
      s && T(s),
      v(),
      i && T(i)
    ] }), K = C ? /* @__PURE__ */ y(ge, { children: [
      /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center opacity-0 ${_[x]}`, children: W }),
      /* @__PURE__ */ o("span", { "aria-hidden": "true", className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ o(lr, { size: Q }) })
    ] }) : W;
    return l ? /* @__PURE__ */ o(
      "a",
      {
        ref: p,
        href: r ? void 0 : l,
        target: c,
        rel: d,
        "aria-disabled": r || C || void 0,
        "aria-busy": C || void 0,
        className: `${z} ${$()} ${k[e]} ${_[x]} ${oe} no-underline ${r ? "pointer-events-none opacity-50" : ""} ${n}`,
        style: O,
        "aria-label": f,
        "aria-labelledby": h,
        onClick: te,
        ...b,
        children: K
      }
    ) : /* @__PURE__ */ o(
      "button",
      {
        ref: p,
        disabled: r,
        className: `${z} ${$()} ${k[e]} ${_[x]} ${oe} ${n}`,
        style: O,
        "aria-label": f,
        "aria-labelledby": h,
        "aria-disabled": C || void 0,
        "aria-busy": C || void 0,
        onClick: te,
        ...b,
        children: K
      }
    );
  }
);
We.displayName = "Button";
const Ya = {
  AlertCircle: "⚠",
  // ⚠ warning sign
  AlertTriangle: "⚠",
  // ⚠ warning sign
  Archive: "✇",
  // ✇ tape drive
  ArrowLeft: "←",
  // ← left arrow
  ArrowRight: "→",
  // → right arrow
  Bell: "♪",
  // ♪ notification bell
  Check: "✓",
  // ✓ check mark
  CheckCircle: "✓",
  // ✓ check mark
  ChevronDown: "▼",
  // ▼ down triangle
  ChevronRight: "▶",
  // ▶ right triangle
  ChevronUp: "▲",
  // ▲ up triangle
  Copy: "⎘",
  // ⎘ copy
  Download: "⤓",
  // ⤓ downwards arrow to bar
  Edit: "✎",
  // ✎ pencil
  ExternalLink: "↗",
  // ↗ arrow upper right (leaves this context)
  Eye: "◉",
  // ◉ fisheye
  EyeOff: "◌",
  // ◌ dotted circle
  FileText: "☷",
  // ☷ file
  Globe: "⊕",
  // ⊕ circled plus
  HelpCircle: "?",
  // ? question mark
  Info: "i",
  // i info letter
  Lock: "☖",
  // ☖ lock
  LogOut: "→",
  // → right arrow (exit)
  Mail: "✉",
  // ✉ envelope
  Menu: "☰",
  // ☰ trigram for heaven (hamburger menu)
  Minus: "−",
  // − minus sign (indeterminate, remove)
  Moon: "☾",
  // ☾ last quarter moon
  MoreVertical: "⋮",
  // ⋮ vertical ellipsis
  Music2: "♫",
  // ♫ beamed eighth notes
  Pause: "⏸",
  // pause bars (media pause)
  Play: "▶",
  // right triangle (media play)
  Plus: "+",
  // + plus sign
  Repeat: "↻",
  // clockwise open circle arrow (repeat)
  Save: "⤓",
  // ⤓ downwards arrow to bar
  Search: "⌕",
  // ⌕ telephone recorder / search
  Send: "➤",
  // ➤ arrow
  Settings: "⚙",
  // ⚙ gear
  Share2: "↗",
  // ↗ arrow upper right
  Shield: "☖",
  // ☖ shield
  Shuffle: "⇄",
  // rightwards over leftwards arrows (shuffle)
  SkipBack: "⏮",
  // previous track (bar + left triangle)
  SkipForward: "⏭",
  // next track (right triangle + bar)
  Star: "★",
  // ★ black star
  Stop: "⏹",
  // stop square (media stop, ends a running response)
  Sun: "☀",
  // ☀ sun
  Tag: "⌂",
  // ⌂ house / label
  Trash2: "✗",
  // ✗ ballot X
  Upload: "⤒",
  // ⤒ upwards arrow to bar
  User: "@",
  // @ at-sign (person)
  Volume2: "♫",
  // ♫ music note
  VolumeX: "✖",
  // ✖ heavy X
  X: "✕"
  // ✕ multiplication X
}, Rn = {
  AlertCircle: [
    ".#####.",
    "#######",
    "###.###",
    "###.###",
    "#######",
    "###.###",
    ".#####."
  ],
  AlertTriangle: [
    "...#...",
    "..###..",
    "..#.#..",
    ".##.##.",
    ".#####.",
    "###.###",
    "#######"
  ],
  Archive: [
    "#######",
    "#######",
    ".#####.",
    ".#...#.",
    ".#####.",
    ".#####.",
    ".#####."
  ],
  ArrowLeft: [
    ".......",
    "..#....",
    ".#.....",
    "#######",
    ".#.....",
    "..#....",
    "......."
  ],
  ArrowRight: [
    ".......",
    "....#..",
    ".....#.",
    "#######",
    ".....#.",
    "....#..",
    "......."
  ],
  Bell: [
    "...#...",
    "..###..",
    ".#####.",
    ".#####.",
    ".#####.",
    "#######",
    "...#..."
  ],
  Check: [
    ".......",
    "......#",
    ".....#.",
    "#...#..",
    ".#.#...",
    "..#....",
    "......."
  ],
  CheckCircle: [
    ".#####.",
    "#####.#",
    "####.##",
    "#.#.###",
    "##.####",
    "#######",
    ".#####."
  ],
  ChevronDown: [
    ".......",
    ".......",
    "#######",
    ".#####.",
    "..###..",
    "...#...",
    "......."
  ],
  ChevronRight: [
    "..#....",
    "..##...",
    "..###..",
    "..####.",
    "..###..",
    "..##...",
    "..#...."
  ],
  ChevronUp: [
    ".......",
    "...#...",
    "..###..",
    ".#####.",
    "#######",
    ".......",
    "......."
  ],
  Copy: [
    "..#####",
    "..#...#",
    "#####.#",
    "#...#.#",
    "#...###",
    "#...#..",
    "#####.."
  ],
  Download: [
    "...#...",
    "...#...",
    "...#...",
    ".#####.",
    "..###..",
    "...#...",
    "#######"
  ],
  Edit: [
    ".....#.",
    "....###",
    "...###.",
    "..###..",
    ".###...",
    ".##....",
    "#......"
  ],
  ExternalLink: [
    "...####",
    ".....##",
    "##..#.#",
    "#..#...",
    "#.#...#",
    "#.....#",
    "#######"
  ],
  Eye: [
    ".......",
    "..###..",
    ".#...#.",
    "#..#..#",
    ".#...#.",
    "..###..",
    "......."
  ],
  EyeOff: [
    ".......",
    ".......",
    "#.....#",
    ".#...#.",
    "..###..",
    ".#.#.#.",
    "......."
  ],
  FileText: [
    ".####..",
    ".#####.",
    ".#...#.",
    ".#####.",
    ".#...#.",
    ".#####.",
    ".#####."
  ],
  Globe: [
    "..###..",
    ".#.#.#.",
    "#..#..#",
    "#######",
    "#..#..#",
    ".#.#.#.",
    "..###.."
  ],
  HelpCircle: [
    ".#####.",
    "##...##",
    "####.##",
    "###.###",
    "#######",
    "###.###",
    ".#####."
  ],
  Info: [
    ".#####.",
    "###.###",
    "#######",
    "###.###",
    "###.###",
    "###.###",
    ".#####."
  ],
  Lock: [
    "..###..",
    ".#...#.",
    ".#...#.",
    "#######",
    "###.###",
    "###.###",
    "#######"
  ],
  LogOut: [
    "###....",
    "#...#..",
    "#....#.",
    "#.#####",
    "#....#.",
    "#...#..",
    "###...."
  ],
  Mail: [
    "#######",
    "##...##",
    "#.#.#.#",
    "#..#..#",
    "#.....#",
    "#.....#",
    "#######"
  ],
  Menu: [
    ".......",
    "#######",
    ".......",
    "#######",
    ".......",
    "#######",
    "......."
  ],
  Minus: [
    ".......",
    ".......",
    ".......",
    "#######",
    ".......",
    ".......",
    "......."
  ],
  Moon: [
    "..###..",
    ".##....",
    "##.....",
    "##.....",
    "##.....",
    ".##...#",
    "..####."
  ],
  MoreVertical: [
    ".......",
    "...#...",
    ".......",
    "...#...",
    ".......",
    "...#...",
    "......."
  ],
  Music2: [
    ".......",
    "..#####",
    "..#...#",
    "..#...#",
    "..#...#",
    "###.###",
    "###.###"
  ],
  Pause: [
    ".##.##.",
    ".##.##.",
    ".##.##.",
    ".##.##.",
    ".##.##.",
    ".##.##.",
    ".##.##."
  ],
  Play: [
    "..#....",
    "..##...",
    "..###..",
    "..####.",
    "..###..",
    "..##...",
    "..#...."
  ],
  Plus: [
    "...#...",
    "...#...",
    "...#...",
    "#######",
    "...#...",
    "...#...",
    "...#..."
  ],
  Repeat: [
    ".....#.",
    "#######",
    "#....#.",
    "#.....#",
    ".#....#",
    "#######",
    ".#....."
  ],
  Save: [
    "#####..",
    "#...##.",
    "#...###",
    "#######",
    "#.....#",
    "#.....#",
    "#######"
  ],
  Search: [
    ".###...",
    "#...#..",
    "#...#..",
    "#...#..",
    ".####..",
    "....##.",
    ".....##"
  ],
  Send: [
    "#......",
    "###....",
    ".####..",
    "..#####",
    ".####..",
    "###....",
    "#......"
  ],
  Settings: [
    "...#...",
    ".#####.",
    ".##.##.",
    "##...##",
    ".##.##.",
    ".#####.",
    "...#..."
  ],
  Share2: [
    ".....##",
    "....###",
    "##.#...",
    "###....",
    "##.#...",
    "....###",
    ".....##"
  ],
  Shield: [
    "#######",
    "#.....#",
    "#.....#",
    "#.....#",
    ".#...#.",
    "..#.#..",
    "...#..."
  ],
  Shuffle: [
    ".....#.",
    "##..###",
    "..#.##.",
    "...#...",
    "..#.##.",
    "##..###",
    ".....#."
  ],
  SkipBack: [
    ".#....#",
    ".#...##",
    ".#..###",
    ".#.####",
    ".#..###",
    ".#...##",
    ".#....#"
  ],
  SkipForward: [
    "#....#.",
    "##...#.",
    "###..#.",
    "####.#.",
    "###..#.",
    "##...#.",
    "#....#."
  ],
  Star: [
    "...#...",
    "...#...",
    "#######",
    ".#####.",
    "..###..",
    ".##.##.",
    ".#...#."
  ],
  Stop: [
    ".......",
    ".#####.",
    ".#####.",
    ".#####.",
    ".#####.",
    ".#####.",
    "......."
  ],
  Sun: [
    "...#...",
    ".#...#.",
    "..###..",
    "#.###.#",
    "..###..",
    ".#...#.",
    "...#..."
  ],
  Tag: [
    "####...",
    "#.###..",
    "######.",
    ".######",
    "..#####",
    "...###.",
    "....#.."
  ],
  Trash2: [
    "..###..",
    "#######",
    ".#####.",
    ".#.#.#.",
    ".#.#.#.",
    ".#.#.#.",
    ".#####."
  ],
  Upload: [
    "...#...",
    "..###..",
    ".#####.",
    "...#...",
    "...#...",
    "...#...",
    "#######"
  ],
  User: [
    "..###..",
    ".#####.",
    "..###..",
    ".......",
    ".#####.",
    "#######",
    "#######"
  ],
  Volume2: [
    "...#...",
    "..##.#.",
    "####..#",
    "####..#",
    "####..#",
    "..##.#.",
    "...#..."
  ],
  VolumeX: [
    "..#....",
    ".##....",
    "###.#.#",
    "###..#.",
    "###.#.#",
    ".##....",
    "..#...."
  ],
  X: [
    "#.....#",
    ".#...#.",
    "..#.#..",
    "...#...",
    "..#.#..",
    ".#...#.",
    "#.....#"
  ]
};
function Ln(e) {
  let t = "";
  return e.forEach((r, n) => {
    for (const a of r.matchAll(/#+/g))
      t += `M${a.index} ${n}h${a[0].length}v1h-${a[0].length}Z`;
  }), t;
}
const Pn = Object.fromEntries(
  Object.entries(Rn).map(([e, t]) => [e, Ln(t)])
), Pt = {
  3: { box: "w-3 h-3 text-xs", pixel: 1.5 },
  4: { box: "w-4 h-4 text-sm", pixel: 2 },
  5: { box: "w-5 h-5 text-base", pixel: 2 },
  6: { box: "w-6 h-6 text-lg", pixel: 3 },
  8: { box: "w-8 h-8 text-2xl", pixel: 4 }
}, q = ({
  name: e,
  size: t = "4",
  className: r
}) => {
  const n = Pn[e], { box: a, pixel: s } = Pt[t] ?? Pt[4];
  return /* @__PURE__ */ o(
    "span",
    {
      className: S(
        "inline-flex items-center justify-center font-mono leading-none select-none",
        a,
        r
      ),
      "aria-hidden": "true",
      children: n ? /* @__PURE__ */ o(
        "svg",
        {
          viewBox: "0 0 7 7",
          width: 7 * s,
          height: 7 * s,
          fill: "currentColor",
          shapeRendering: "crispEdges",
          children: /* @__PURE__ */ o("path", { d: n })
        }
      ) : "?"
    }
  );
}, Dt = (e) => e != null && e !== !1 && e !== "";
function De({ error: e, helperText: t, errorMessage: r, describedBy: n }) {
  const a = ce(), s = Dt(r), i = !s && Dt(t), l = s || i ? `${a}-message` : void 0;
  return {
    invalid: e || s,
    hasMessage: l != null,
    describedBy: [n, l].filter(Boolean).join(" ") || void 0,
    message: {
      id: l,
      tone: s ? "error" : "helper",
      children: s ? r : t
    }
  };
}
function Oe({
  id: e,
  tone: t,
  children: r,
  className: n = ""
}) {
  return e == null ? null : /* @__PURE__ */ y(
    "p",
    {
      id: e,
      className: `flex items-start gap-1.5 font-mono text-xs ${t === "error" ? "text-error-700 dark:text-error-400" : "text-[var(--text-secondary)]"} ${n}`,
      children: [
        t === "error" && /* @__PURE__ */ o("span", { className: "flex h-[1lh] shrink-0 items-center", children: /* @__PURE__ */ o(q, { name: "AlertCircle", size: "3" }) }),
        /* @__PURE__ */ o("span", { children: r })
      ]
    }
  );
}
const Dn = re(
  ({
    size: e = "md",
    variant: t = "box",
    error: r = !1,
    helperText: n,
    errorMessage: a,
    disabled: s = !1,
    className: i = "",
    label: l,
    id: c,
    "aria-describedby": d,
    ...u
  }, m) => {
    const f = se(e, "Input"), h = De({ error: r, helperText: n, errorMessage: a, describedBy: d }), b = h.invalid, p = ce(), x = c ?? (l != null && l !== "" ? p : void 0), z = `
      w-full
      font-mono text-sm
      transition-colors [transition-duration:var(--duration-fast)]
      placeholder:text-[var(--field-placeholder)]
      disabled:cursor-not-allowed
      focus:outline-none
    `, g = b ? "focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-error)]" : "focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]", $ = {
      sm: "h-control-sm px-3 py-1.5 plate-round",
      md: "h-control-md px-4 py-2.5 plate-round",
      lg: "h-control-lg px-5 py-3.5 plate-round"
    }, k = b ? "bg-[var(--field-background-error)] text-[var(--text-primary)]" : "bg-[var(--field-background)] text-[var(--text-primary)]", N = b ? "bg-[var(--field-border-error)]" : "bg-[var(--field-border)] hover:bg-[var(--field-border-hover)] focus-within:!bg-[var(--field-border-focus)]", _ = b ? "border-b border-[var(--field-border-error)] focus-visible:[box-shadow:inset_0_calc(-1*var(--focus-ring-width))_0_0_var(--focus-ring-error)]" : "border-b border-[var(--field-border)] hover:border-[var(--field-border-hover)] focus:!border-[var(--field-border-focus)] focus-visible:[box-shadow:inset_0_calc(-1*var(--focus-ring-width))_0_0_var(--focus-ring-primary)]", T = t === "quiet" ? /* @__PURE__ */ o(
      "input",
      {
        ref: m,
        id: x,
        disabled: s,
        "aria-invalid": b || void 0,
        "aria-describedby": h.describedBy,
        className: `${z} ${$[f].replace("plate-round", "rounded-none")} !px-0 bg-transparent text-[var(--text-primary)] disabled:opacity-50 ${_} ${i}`,
        ...u
      }
    ) : (
      // DISABLED: the opacity lives on the ring wrapper so the border dims
      // with the fill; applying it to the input alone left a full-strength ring.
      /* @__PURE__ */ o(
        "div",
        {
          className: `w-full plate-round p-px transition-colors [transition-duration:var(--duration-fast)] ${N} ${s ? "opacity-50" : ""}`,
          children: /* @__PURE__ */ o(
            "input",
            {
              ref: m,
              id: x,
              disabled: s,
              "aria-invalid": b || void 0,
              "aria-describedby": h.describedBy,
              className: `${z} ${g} ${$[f]} ${k} ${i}`,
              ...u
            }
          )
        }
      )
    ), v = l != null && l !== "";
    return !v && !h.hasMessage ? T : /* @__PURE__ */ y("div", { className: "w-full space-y-1", children: [
      v && /* @__PURE__ */ o(
        "label",
        {
          htmlFor: x,
          className: "block font-mono text-sm text-secondary-800 dark:text-secondary-200",
          children: l
        }
      ),
      T,
      /* @__PURE__ */ o(Oe, { ...h.message })
    ] });
  }
);
Dn.displayName = "Input";
const On = [
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "iframe",
  "audio[controls]",
  "video[controls]",
  "summary",
  "[contenteditable='true']",
  '[tabindex]:not([tabindex="-1"])'
].join(",");
function jn(e) {
  return Array.from(e.querySelectorAll(On)).filter(
    (t) => !t.hasAttribute("hidden") && t.closest("[hidden]") == null && t.getAttribute("aria-hidden") !== "true"
  );
}
function cr(e, t) {
  G(() => {
    if (!t) return;
    const r = (n) => {
      if (n.key !== "Tab" || n.defaultPrevented) return;
      const a = e.current;
      if (!a) return;
      const s = jn(a), i = document.activeElement;
      if (s.length === 0) {
        n.preventDefault(), a.focus();
        return;
      }
      const l = s[0], c = s[s.length - 1];
      if (!i || !a.contains(i)) {
        n.preventDefault(), (n.shiftKey ? c : l).focus();
        return;
      }
      if (n.shiftKey && (i === l || i === a)) {
        n.preventDefault(), c.focus();
        return;
      }
      !n.shiftKey && i === c && (n.preventDefault(), l.focus());
    };
    return document.addEventListener("keydown", r, !0), () => document.removeEventListener("keydown", r, !0);
  }, [e, t]);
}
const Bn = 960;
function Fn() {
  let e = Bn;
  if (typeof document < "u") {
    const t = getComputedStyle(document.documentElement).getPropertyValue("--breakpoint-docked"), r = Number.parseFloat(t);
    Number.isFinite(r) && r > 0 && (e = r);
  }
  return `(min-width: ${e}px)`;
}
function Za({ isOpen: e, onClose: t, title: r, children: n, footerContent: a, width: s = 740, docked: i = !1 }) {
  const l = Z(null), c = Z(null), [d, u] = V(e);
  G(() => {
    e && u(!0);
  }, [e]);
  const m = d && !e, f = Le(Fn, []), [h, b] = V(
    () => typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia(f).matches
  );
  G(() => {
    if (typeof window.matchMedia != "function") return;
    const g = window.matchMedia(f), $ = () => b(g.matches);
    return g.addEventListener("change", $), () => g.removeEventListener("change", $);
  }, [f]);
  const p = i && h, x = e && d;
  if (G(() => {
    var g;
    if (x)
      return c.current = document.activeElement, (g = l.current) == null || g.focus(), () => {
        var $;
        ($ = c.current) == null || $.focus(), c.current = null;
      };
  }, [x]), cr(l, x && !p), G(() => {
    const g = ($) => {
      $.key === "Escape" && t();
    };
    return e && document.addEventListener("keydown", g), () => {
      document.removeEventListener("keydown", g);
    };
  }, [e, t]), G(() => (e && !p ? document.body.style.overflow = "hidden" : document.body.style.overflow = "unset", () => {
    document.body.style.overflow = "unset";
  }), [e, p]), !d) return null;
  const z = /* @__PURE__ */ o(
    "div",
    {
      ref: l,
      tabIndex: -1,
      className: "max-w-full max-h-[80vh] plate-round-lg p-px bg-[var(--surface-container-stroke)] flex focus:outline-none",
      style: { width: typeof s == "number" ? `${s}px` : s },
      role: "dialog",
      "aria-modal": p ? void 0 : "true",
      "aria-label": r,
      onClick: (g) => g.stopPropagation(),
      children: /* @__PURE__ */ y("div", { className: "w-full plate-round-lg bg-[var(--surface-card)] flex flex-col overflow-hidden", children: [
        /* @__PURE__ */ y("div", { className: "flex items-center justify-between px-6 py-5 border-b-[length:var(--border-width-hairline)] border-solid border-[var(--surface-container-stroke)]", children: [
          /* @__PURE__ */ o("h2", { className: "text-base font-mono text-[var(--text-primary)] font-medium flex-1 min-w-0 truncate", children: r }),
          /* @__PURE__ */ o(
            "span",
            {
              className: "relative ml-4 inline-flex shrink-0 before:content-[''] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-touch before:h-touch",
              onClick: (g) => {
                g.target === g.currentTarget && t();
              },
              children: /* @__PURE__ */ o(
                We,
                {
                  variant: "secondary",
                  size: "sm",
                  type: "button",
                  onClick: t,
                  "aria-label": "Close modal",
                  children: /* @__PURE__ */ o(q, { name: "X" })
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "overflow-y-auto px-6 py-5", tabIndex: 0, children: n }),
        a && /* @__PURE__ */ o("div", { className: "flex items-center justify-end gap-3 px-6 py-5 border-t-[length:var(--border-width-hairline)] border-solid border-[var(--surface-container-stroke)]", children: a })
      ] })
    }
  );
  return p ? /* @__PURE__ */ o(
    "div",
    {
      className: `fixed inset-x-0 mx-auto w-fit max-w-full ${m ? "animate-out fade-out fill-mode-forwards" : "animate-in fade-in"}`,
      style: {
        zIndex: "var(--z-index-modal)",
        bottom: "var(--spacing-12)",
        animationDuration: "var(--duration-normal)",
        filter: "var(--elevation-docked-filter)"
      },
      onAnimationEnd: () => {
        m && u(!1);
      },
      children: z
    }
  ) : /* @__PURE__ */ o(ge, { children: /* @__PURE__ */ o(
    "div",
    {
      className: `fixed inset-0 flex items-center justify-center p-5 bg-[var(--surface-overlay)] ${m ? "animate-out fade-out fill-mode-forwards" : "animate-in fade-in"}`,
      style: { zIndex: "var(--z-index-modal)", animationDuration: "var(--duration-normal)" },
      onClick: t,
      onAnimationEnd: () => {
        m && u(!1);
      },
      children: z
    }
  ) });
}
const Vn = /(?:^|\s)flex(?:\s|$)/;
function Qa({
  title: e,
  subtitle: t,
  headerContent: r,
  children: n,
  footerContent: a,
  layout: s,
  className: i = ""
}) {
  const l = s ? s === "flex" : Vn.test(i);
  return /* @__PURE__ */ o(
    "div",
    {
      className: `
        plate-round-lg p-px bg-[var(--surface-container-stroke)]
        ${l ? "flex flex-col" : ""}
        ${i}
      `,
      children: /* @__PURE__ */ y(
        "div",
        {
          className: `
        plate-round-lg bg-[var(--surface-card)] h-full w-full
        ${l ? "flex flex-col flex-1 min-h-0" : ""}
      `,
          children: [
            (e || t || r) && /* @__PURE__ */ o("div", { className: "p-4 lg:p-6 border-b-[length:var(--border-width-hairline)] border-solid border-[var(--surface-container-stroke)] overflow-hidden rounded-none", children: r || /* @__PURE__ */ y("div", { children: [
              e && /* @__PURE__ */ o("h3", { className: "text-base font-mono font-bold text-[var(--text-primary)] mb-1", children: e }),
              t && /* @__PURE__ */ o("p", { className: "font-mono text-sm text-secondary-800 dark:text-secondary-300", children: t })
            ] }) }),
            /* @__PURE__ */ o("div", { className: `p-4 lg:p-6 ${l ? "flex-1 flex flex-col min-h-0" : ""}`, children: n }),
            a && /* @__PURE__ */ o("div", { className: "p-4 lg:p-6 border-t-[length:var(--border-width-hairline)] border-solid border-[var(--surface-container-stroke)] overflow-hidden", children: a })
          ]
        }
      )
    }
  );
}
function Ja({
  variant: e = "default",
  size: t = "md",
  caps: r = !1,
  dashed: n = !1,
  children: a,
  iconLeft: s,
  onClose: i,
  onCloseLabel: l,
  className: c = ""
}) {
  const d = se(t, "Badge"), u = l ?? (typeof a == "string" ? `Remove ${a}` : "Remove badge"), m = {
    sm: "h-5 px-2 py-1 text-xs",
    // h-5 = 20px, px-2 = 8px, text-xs = 12px
    md: "h-6 px-2.5 py-1 text-xs",
    // h-6 = 24px, px-2.5 = 10px, text-xs = 12px
    lg: "h-7 px-3 py-1.5 text-sm"
    // h-7 = 28px, px-3 = 12px, text-sm = 14px
  }, f = {
    default: `
      bg-[var(--surface-muted)]
      text-secondary-800 dark:text-secondary-200
    `,
    primary: `
      bg-primary-50 dark:bg-primary-950
      text-primary-800 dark:text-primary-300
    `,
    success: `
      bg-success-50 dark:bg-success-950
      text-success-800 dark:text-success-300
    `,
    warning: `
      bg-warning-50 dark:bg-warning-950
      text-warning-800 dark:text-warning-300
    `,
    error: `
      bg-error-50 dark:bg-error-950
      text-error-800 dark:text-error-300
    `,
    info: `
      bg-info-50 dark:bg-info-950
      text-info-800 dark:text-info-300
    `,
    // Deliberately theme-stable (same fill light and dark): a fixed bone
    // tint for states that must never follow the accent or the theme,
    // like loot tiers. sepia-950 text clears AA on the sepia-500 fill.
    bone: `
      bg-secondary-500 text-secondary-950
    `
  }, h = {
    default: "border-current text-secondary-800 dark:text-secondary-200",
    primary: "border-current text-primary-800 dark:text-primary-300",
    success: "border-current text-success-800 dark:text-success-300",
    warning: "border-current text-warning-800 dark:text-warning-300",
    error: "border-current text-error-800 dark:text-error-300",
    info: "border-current text-info-800 dark:text-info-300",
    bone: "border-secondary-500 text-secondary-800 dark:text-secondary-200"
  }, b = {
    sm: "w-3 h-3",
    // 12px
    md: "w-3.5 h-3.5",
    // 14px
    lg: "w-4 h-4"
    // 16px
  };
  return /* @__PURE__ */ y(
    "span",
    {
      className: `
        inline-flex items-center gap-1.5
        font-mono font-medium
        ${n ? `rounded-none border border-dashed bg-transparent ${h[e]}` : `plate-round ${f[e]}`}
        ${m[d]}
        ${r ? "uppercase [letter-spacing:.08em]" : ""}
        ${c}
      `,
      children: [
        s && /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center ${b[d]} flex-shrink-0`, children: s }),
        /* @__PURE__ */ o("span", { className: "inline-flex items-center", children: a }),
        i && /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            onClick: (p) => {
              p.stopPropagation(), i();
            },
            className: `
            relative inline-flex items-center justify-center
            before:content-[''] before:absolute before:left-1/2 before:top-1/2
            before:-translate-x-1/2 before:-translate-y-1/2 before:w-touch before:h-touch
            font-mono font-bold
            text-secondary-800 dark:text-secondary-200
            hover:text-error-700 dark:hover:text-error-400
            transition-colors [transition-duration:var(--duration-fast)]
            flex-shrink-0
            focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring-primary)]
            focus:ring-offset-1 focus:ring-offset-[var(--focus-offset-color)]
          `,
            "aria-label": u,
            children: /* @__PURE__ */ o(q, { name: "X", size: "3" })
          }
        )
      ]
    }
  );
}
function es({
  variant: e = "default",
  title: t,
  description: r,
  iconLeft: n,
  onClose: a,
  className: s = ""
}) {
  const l = n || /* @__PURE__ */ o(q, { name: {
    default: "Bell",
    success: "CheckCircle",
    warning: "AlertTriangle",
    error: "AlertCircle",
    info: "Info"
  }[e], size: "4" }), d = {
    // Default: neutral semantic surfaces (surface + border roles)
    default: {
      ring: "bg-[var(--border-default)]",
      fill: "bg-[var(--surface-subtle)]",
      icon: "text-secondary-800 dark:text-secondary-300",
      title: "text-[var(--text-primary)]",
      description: "text-secondary-800 dark:text-secondary-300"
    },
    // Success: Green for positive states
    success: {
      ring: "bg-success-300 dark:bg-success-700",
      fill: "bg-success-50 dark:bg-success-950",
      icon: "text-success-800 dark:text-success-400",
      title: "text-success-900 dark:text-success-50",
      description: "text-success-900 dark:text-success-300"
    },
    // Warning: Purple for warnings
    warning: {
      ring: "bg-warning-300 dark:bg-warning-700",
      fill: "bg-warning-50 dark:bg-warning-950",
      icon: "text-warning-800 dark:text-warning-400",
      title: "text-warning-900 dark:text-warning-50",
      description: "text-warning-900 dark:text-warning-300"
    },
    // Error: Red for errors
    error: {
      ring: "bg-error-300 dark:bg-error-700",
      fill: "bg-error-50 dark:bg-error-950",
      icon: "text-error-700 dark:text-error-400",
      title: "text-error-900 dark:text-error-50",
      description: "text-error-900 dark:text-error-300"
    },
    // Info: Blue for informational messages
    info: {
      ring: "bg-info-300 dark:bg-info-700",
      fill: "bg-info-50 dark:bg-info-950",
      icon: "text-info-800 dark:text-info-400",
      title: "text-info-900 dark:text-info-50",
      description: "text-info-900 dark:text-info-300"
    }
  }[e], u = e === "error" ? "focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-error)]" : "focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]";
  return /* @__PURE__ */ o("div", { role: "alert", className: `plate-round p-px ${d.ring} ${s}`, children: /* @__PURE__ */ y(
    "div",
    {
      className: `
        plate-round
        flex items-start gap-3
        p-4
        ${d.fill}
      `,
      children: [
        l && /* @__PURE__ */ o("div", { className: `flex h-5 flex-shrink-0 items-center ${d.icon}`, children: l }),
        /* @__PURE__ */ y("div", { className: "flex-1 min-w-0", children: [
          t && /* @__PURE__ */ o("h4", { className: `font-mono text-sm font-bold mb-1 ${d.title}`, children: t }),
          r && /* @__PURE__ */ o("div", { className: `font-mono text-sm ${d.description}`, children: r })
        ] }),
        a && /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            onClick: a,
            className: `
            relative flex-shrink-0
            font-mono text-xs font-bold
            ${d.description}
            hover:text-error-800 dark:hover:text-error-300
            transition-colors [transition-duration:var(--duration-fast)]
            before:content-[''] before:absolute before:left-1/2 before:top-1/2
            before:-translate-x-1/2 before:-translate-y-1/2
            before:w-touch before:h-touch
            focus:outline-none ${u}
          `,
            "aria-label": "Close alert",
            children: /* @__PURE__ */ o(q, { name: "X", size: "3" })
          }
        )
      ]
    }
  ) });
}
function Gn({
  src: e,
  alt: t,
  initials: r,
  icon: n,
  size: a = "md",
  status: s,
  className: i = "",
  onError: l
}) {
  const c = se(a, "Avatar", "md"), [d, u] = V(!1), f = {
    sm: {
      container: "w-6 h-6",
      // 24px × 24px
      text: "text-xs",
      // 12px font
      icon: "w-3 h-3",
      // 12px icon
      status: "w-1.5 h-1.5",
      // 6px status dot
      statusOffset: "bottom-0 right-0"
      // Position for small
    },
    md: {
      container: "w-10 h-10",
      // 40px × 40px
      text: "text-sm",
      // 14px font
      icon: "w-5 h-5",
      // 20px icon
      status: "w-2 h-2",
      // 8px status dot
      statusOffset: "bottom-0 right-0"
      // Position for medium
    },
    lg: {
      container: "w-16 h-16",
      // 64px × 64px
      text: "text-lg",
      // 18px font
      icon: "w-8 h-8",
      // 32px icon
      status: "w-3 h-3",
      // 12px status dot
      statusOffset: "bottom-1 right-1"
      // Position for large
    },
    xl: {
      container: "w-24 h-24",
      // 96px × 96px
      text: "text-2xl",
      // 24px font
      icon: "w-12 h-12",
      // 48px icon
      status: "w-4 h-4",
      // 16px status dot
      statusOffset: "bottom-2 right-2"
      // Position for xl
    }
  }[c], h = () => {
    u(!0), l && l();
  }, b = e && !d, p = !b && r, x = !b && !p && n, z = !b && !p && !x, g = {
    online: "bg-success-600 dark:bg-success-500",
    offline: "bg-secondary-500 dark:bg-secondary-600",
    away: "bg-warning-600 dark:bg-warning-500"
  };
  return /* @__PURE__ */ y("div", { className: `relative inline-block ${f.container} ${i}`, children: [
    /* @__PURE__ */ y(
      "div",
      {
        className: `
          ${f.container}
          plate-round
          overflow-hidden
          flex items-center justify-center
          bg-secondary-200 dark:bg-secondary-800
          text-secondary-900 dark:text-secondary-50
          font-mono font-bold
          ${f.text}
        `,
        children: [
          b && /* @__PURE__ */ o(
            "img",
            {
              src: e,
              alt: t || "Avatar",
              className: "w-full h-full object-cover",
              onError: h
            }
          ),
          p && /* @__PURE__ */ o("span", { className: "select-none", children: r }),
          x && /* @__PURE__ */ o("div", { className: `${f.icon} inline-flex items-center justify-center leading-none text-secondary-700 dark:text-secondary-300`, children: n }),
          z && /* @__PURE__ */ o("span", { className: `${f.icon} inline-flex items-center justify-center font-mono font-bold text-secondary-900 dark:text-secondary-100`, "aria-hidden": "true", children: "@" })
        ]
      }
    ),
    s && /* @__PURE__ */ o(
      "span",
      {
        role: "img",
        className: `
            absolute block
            ${f.statusOffset}
            ${f.status}
            ${g[s]}
            rounded-none
            border-2 border-[var(--field-background)]
          `,
        "aria-label": `Status: ${s}`
      }
    )
  ] });
}
function ts({
  variant: e = "horizontal",
  text: t,
  spacing: r = "md",
  className: n = ""
}) {
  const a = se(r, "Divider", "md"), s = {
    none: "",
    sm: e === "horizontal" ? "my-1" : "mx-1",
    // 4px margin
    md: e === "horizontal" ? "my-4" : "mx-4",
    // 16px margin
    lg: e === "horizontal" ? "my-8" : "mx-8"
    // 32px margin
  }, i = `
    border-term-dim
  `;
  return e === "horizontal" ? /* @__PURE__ */ o(
    "div",
    {
      className: `
          w-full
          border-t border-solid
          ${i}
          ${s[a]}
          ${n}
        `,
      role: "separator",
      "aria-orientation": "horizontal"
    }
  ) : e === "vertical" ? /* @__PURE__ */ o(
    "div",
    {
      className: `
          h-full
          border-l border-solid
          ${i}
          ${s[a]}
          ${n}
        `,
      role: "separator",
      "aria-orientation": "vertical"
    }
  ) : e === "withText" && t ? /* @__PURE__ */ y(
    "div",
    {
      className: `
          flex items-center
          w-full
          ${s[a]}
          ${n}
        `,
      role: "separator",
      "aria-label": typeof t == "string" ? t : void 0,
      children: [
        /* @__PURE__ */ o("span", { className: "flex-1 overflow-hidden whitespace-nowrap font-mono text-term-dim leading-none select-none", "aria-hidden": "true", children: "─".repeat(80) }),
        /* @__PURE__ */ o("span", { className: "px-2 font-mono text-xs text-term-dim whitespace-nowrap", children: t }),
        /* @__PURE__ */ o("span", { className: "flex-1 overflow-hidden whitespace-nowrap font-mono text-term-dim leading-none select-none", "aria-hidden": "true", children: "─".repeat(80) })
      ]
    }
  ) : /* @__PURE__ */ o(
    "div",
    {
      className: `
        w-full
        border-t border-solid
        ${i}
        ${s[a]}
        ${n}
      `,
      role: "separator",
      "aria-orientation": "horizontal"
    }
  );
}
const Hn = { top: "bottom", bottom: "top", left: "right", right: "left" }, Un = 8, Re = 8;
function Wn(e, t, r, n, a) {
  const s = {
    top: t.top,
    bottom: a - t.bottom,
    left: t.left,
    right: n - t.right
  }, i = (c) => (c === "top" || c === "bottom" ? r.height : r.width) + Un + Re;
  if (s[e] >= i(e)) return e;
  const l = Hn[e];
  return s[l] >= i(l) ? l : e;
}
function Kn(e, t, r) {
  const n = e.left + e.width / 2 - t / 2, a = n + t;
  return n < Re ? Re - n : a > r - Re ? Math.max(Re - n, r - Re - a) : 0;
}
function qn({
  content: e,
  children: t,
  position: r = "top",
  delay: n = 200,
  maxWidth: a = "200px",
  className: s = ""
}) {
  const [i, l] = V(!1), [c, d] = V(!1), u = Z(null), m = Z(null), f = Z(null), h = Z(null), b = ce(), [p, x] = V(r), [z, g] = V(0), [$, k] = V(0), N = () => {
    u.current && clearTimeout(u.current), m.current && clearTimeout(m.current);
  }, _ = () => {
    N(), u.current = setTimeout(() => {
      l(!0), m.current = setTimeout(() => d(!0), 50);
    }, n);
  }, T = he(() => {
    N(), l(!1), d(!1);
  }, []), v = (K) => {
    var L;
    (L = h.current) != null && L.contains(K.relatedTarget) || T();
  };
  G(() => {
    if (!i) return;
    const K = (L) => {
      L.key === "Escape" && T();
    };
    return document.addEventListener("keydown", K), () => document.removeEventListener("keydown", K);
  }, [i, T]), G(() => N, []), Pe(() => {
    var I, D;
    if (!i) return;
    const K = (I = h.current) == null ? void 0 : I.getBoundingClientRect(), L = (D = f.current) == null ? void 0 : D.getBoundingClientRect();
    if (!K || !L) return;
    const E = window.innerWidth || document.documentElement.clientWidth, P = window.innerHeight || document.documentElement.clientHeight, H = Wn(r, K, L, E, P), w = H === "top" || H === "bottom" ? Kn(K, L.width, E) : 0, U = Math.max(0, L.width / 2 - 12);
    x(H), g(w), k(Math.min(U, Math.max(-U, -w)));
  }, [i, r, e, a]);
  const O = He(t) ? bt(t, {
    "aria-describedby": [
      t.props["aria-describedby"],
      i ? b : void 0
    ].filter(Boolean).join(" ") || void 0
  }) : t, C = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2"
  }, te = "var(--plate-caret-outer)", Q = "var(--plate-caret-inner)", oe = {
    top: "top-full left-1/2 -translate-x-1/2 -translate-y-px",
    bottom: "bottom-full left-1/2 -translate-x-1/2 translate-y-px rotate-180",
    left: "left-full top-1/2 -translate-y-1/2 translate-x-[calc(var(--plate-caret-offset)*-1)] -rotate-90",
    right: "right-full top-1/2 -translate-y-1/2 translate-x-[var(--plate-caret-offset)] rotate-90"
  }, W = {
    top: "top-full inset-x-0 h-2",
    bottom: "bottom-full inset-x-0 h-2",
    left: "left-full inset-y-0 w-2",
    right: "right-full inset-y-0 w-2"
  };
  return /* @__PURE__ */ y(
    "div",
    {
      ref: h,
      className: `relative inline-block w-fit ${s}`,
      onMouseEnter: _,
      onMouseLeave: T,
      onFocus: _,
      onBlur: v,
      children: [
        O,
        i && /* @__PURE__ */ y(
          "div",
          {
            ref: f,
            id: b,
            role: "tooltip",
            className: `
            absolute
            ${C[p]}
            w-max
            z-[var(--z-index-tooltip)]
            ${c ? "opacity-100" : "opacity-0"}
            transition-opacity [transition-duration:var(--duration-fast)]
          `,
            "data-placement": p,
            style: { maxWidth: a, marginLeft: z || void 0 },
            children: [
              /* @__PURE__ */ o("span", { className: `absolute ${W[p]}`, "aria-hidden": "true" }),
              /* @__PURE__ */ o("div", { className: "plate-round p-px bg-[var(--surface-container-stroke)]", children: /* @__PURE__ */ o("div", { className: "plate-round bg-[var(--surface-card)] min-w-16 px-3 py-2 text-center font-mono text-xs text-[var(--text-primary)] whitespace-normal", children: e }) }),
              /* @__PURE__ */ o(
                "div",
                {
                  className: `absolute ${oe[p]}`,
                  style: { marginLeft: $ || void 0 },
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ y("div", { className: "relative h-[var(--plate-caret-height)] w-[var(--plate-caret-width)]", children: [
                    /* @__PURE__ */ o(
                      "div",
                      {
                        className: "absolute inset-0 bg-[var(--surface-container-stroke)]",
                        style: { clipPath: te }
                      }
                    ),
                    /* @__PURE__ */ o(
                      "div",
                      {
                        className: "absolute left-[var(--plate-caret-inner-inset-x)] top-[var(--plate-caret-inner-inset-y)] h-[var(--plate-caret-inner-height)] w-[var(--plate-caret-inner-width)] bg-[var(--surface-card)]",
                        style: { clipPath: Q }
                      }
                    )
                  ] })
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function ut(e) {
  return e == null || typeof e == "boolean" ? "" : Array.isArray(e) ? e.map(ut).join("") : typeof e == "string" || typeof e == "number" ? String(e) : He(e) ? ut(e.props.children) : String(e);
}
function mt(e, t, r, n = []) {
  return Mr.forEach(e, (a) => {
    if (!He(a)) return;
    const s = a, i = s.props;
    if (s.type === ht) {
      mt(i.children, t, r, n);
      return;
    }
    if (s.type === "optgroup") {
      mt(i.children, i.label ?? t, i.disabled || r, n);
      return;
    }
    const l = ut(i.children);
    n.push({
      // Native fallback: an option with no `value` submits its text
      value: i.value != null ? String(i.value) : l,
      label: l,
      disabled: i.disabled || r || void 0,
      group: t
    });
  }), n;
}
function ot(e, t, r) {
  var s;
  const n = e.length;
  if (n === 0) return -1;
  let a = t;
  for (let i = 0; i < n; i++)
    if (a += r, a >= n && (a = 0), a < 0 && (a = n - 1), !((s = e[a]) != null && s.disabled)) return a;
  return -1;
}
const Xn = re(function({
  size: t = "md",
  error: r = !1,
  helperText: n,
  errorMessage: a,
  disabled: s = !1,
  className: i = "",
  children: l,
  value: c,
  defaultValue: d,
  onChange: u,
  name: m,
  label: f,
  "aria-label": h,
  "aria-describedby": b,
  id: p,
  ...x
}, z) {
  var ve;
  const g = se(t, "Select"), $ = De({ error: r, helperText: n, errorMessage: a, describedBy: b }), k = $.invalid, N = ce(), _ = p ?? `${N}-trigger`, T = `${N}-listbox`, v = `${N}-label`, O = (B) => `${N}-option-${B}`, C = mt(l), te = [];
  C.forEach((B, j) => {
    const le = te[te.length - 1];
    le && le.label === B.group ? le.entries.push({ option: B, index: j }) : te.push({ label: B.group, entries: [{ option: B, index: j }] });
  });
  const [Q, oe] = V(!1), [W, K] = V(-1), [L, E] = V(
    c !== void 0 ? String(c) : d !== void 0 ? String(d) : ((ve = C[0]) == null ? void 0 : ve.value) || ""
  ), P = Z(null), H = Z(null), w = Z(null);
  G(() => {
    c !== void 0 && (E(String(c)), w.current && (w.current.value = String(c)));
  }, [c]), Cr(z, () => w.current);
  const U = C.find((B) => B.value === L), I = (U == null ? void 0 : U.label) || "", D = () => {
    s || (oe(!Q), Q || K(-1));
  }, X = () => {
    oe(!1), K(-1);
  }, Y = (B) => {
    c === void 0 && E(B), w.current && (w.current.value = B), u && u({
      target: { value: B, name: m },
      currentTarget: { value: B, name: m }
    }), X();
  };
  G(() => {
    function B(j) {
      P.current && !P.current.contains(j.target) && X();
    }
    if (Q)
      return document.addEventListener("mousedown", B), () => {
        document.removeEventListener("mousedown", B);
      };
  }, [Q]), G(() => {
    function B(j) {
      var ye, pe;
      if (!((ye = P.current) != null && ye.contains(j.target)) && !Q)
        return;
      if (!Q) {
        if ((j.key === "Enter" || j.key === " " || j.key === "ArrowDown" || j.key === "ArrowUp") && (pe = P.current) != null && pe.contains(j.target)) {
          j.preventDefault(), D();
          const de = C.findIndex((me) => me.value === L && !me.disabled);
          K(de >= 0 ? de : ot(C, -1, 1));
        }
        return;
      }
      const le = W;
      switch (j.key) {
        case "Escape":
          j.preventDefault(), X();
          break;
        case "Tab":
          X();
          break;
        case "ArrowDown":
          j.preventDefault(), K((de) => ot(C, de, 1));
          break;
        case "ArrowUp":
          j.preventDefault(), K((de) => ot(C, de, -1));
          break;
        case "Enter":
        case " ":
          j.preventDefault(), le >= 0 && le < C.length && !C[le].disabled && Y(C[le].value);
          break;
      }
    }
    return document.addEventListener("keydown", B), () => {
      document.removeEventListener("keydown", B);
    };
  }, [Q, W, C, L]), G(() => {
    if (W >= 0 && H.current) {
      const j = H.current.querySelectorAll('[role="option"]')[W];
      j && j.scrollIntoView({ block: "nearest" });
    }
  }, [W]);
  const ue = {
    sm: {
      trigger: "h-control-sm px-4 py-1.5 plate-round",
      menu: "",
      menuItem: "",
      icon: "w-4 h-4"
    },
    md: {
      trigger: "h-control-md px-4 py-2.5 plate-round",
      menu: "",
      menuItem: "",
      icon: "w-5 h-5"
    },
    lg: {
      trigger: "h-control-lg px-4 py-3.5 plate-round",
      menu: "",
      menuItem: "",
      icon: "w-6 h-6"
    }
  }[g], ie = k ? "bg-[var(--field-background-error)] text-[var(--text-primary)]" : "bg-[var(--field-background)] text-[var(--text-primary)]", J = k ? "bg-[var(--field-border-error)] focus-within:!bg-[var(--field-border-focus)]" : "bg-[var(--field-border)] hover:bg-[var(--field-border-hover)] focus-within:!bg-[var(--field-border-focus)]", fe = f != null && f !== "", xe = /* @__PURE__ */ y("div", { ref: P, className: "relative inline-block w-full", children: [
    /* @__PURE__ */ o(
      "select",
      {
        ref: w,
        name: m,
        value: L,
        onChange: u,
        className: "sr-only",
        "aria-hidden": "true",
        tabIndex: -1,
        ...x,
        children: C.map((B, j) => /* @__PURE__ */ o("option", { value: B.value, disabled: B.disabled, children: B.label }, j))
      }
    ),
    /* @__PURE__ */ o("div", { className: `plate-round p-px transition-colors [transition-duration:var(--duration-fast)] ${J} ${s ? "opacity-50" : ""}`, children: /* @__PURE__ */ y(
      "button",
      {
        type: "button",
        id: _,
        onClick: D,
        disabled: s,
        className: `
          w-full
          flex items-center justify-between
          font-mono text-sm
          transition-colors [transition-duration:var(--duration-fast)]
          ${ue.trigger}
          ${ie}
          ${s ? "cursor-not-allowed" : "cursor-pointer"}
          focus:outline-none
        `,
        "aria-haspopup": "listbox",
        "aria-expanded": Q,
        "aria-controls": Q ? T : void 0,
        "aria-activedescendant": Q && W >= 0 ? O(W) : void 0,
        "aria-invalid": k || void 0,
        "aria-describedby": $.describedBy,
        "aria-label": fe ? void 0 : h ?? "Select an option",
        children: [
          /* @__PURE__ */ o("span", { className: "truncate text-left flex-1", children: I || "Select..." }),
          /* @__PURE__ */ o(
            "span",
            {
              className: `
            ${ue.icon}
            inline-flex items-center justify-center font-mono leading-none
            text-[var(--text-secondary)]
            transition-transform [transition-duration:var(--duration-normal)]
            flex-shrink-0 ml-2
            ${Q ? "rotate-180" : ""}
            ${s ? "opacity-50" : ""}
          `,
              "aria-hidden": "true",
              children: /* @__PURE__ */ o(q, { name: "ChevronDown" })
            }
          )
        ]
      }
    ) }),
    Q && /* @__PURE__ */ o(
      "div",
      {
        style: { animationDuration: "var(--duration-normal)" },
        className: `
            absolute top-full mt-2 left-0 right-0
            min-w-52
            plate-round p-px bg-[var(--border-default)]
            z-[var(--z-index-dropdown)]
            animate-in fade-in slide-in-from-top-2
          `,
        children: /* @__PURE__ */ o(
          "div",
          {
            ref: H,
            id: T,
            role: "listbox",
            "aria-labelledby": fe ? v : void 0,
            "aria-label": fe ? void 0 : h ?? "Select an option",
            className: `plate-round bg-[var(--surface-card)] ${ue.menu} max-h-80 overflow-y-auto`,
            children: te.map((B, j) => {
              const le = `${N}-group-${j}`, ye = B.entries.map(({ option: pe, index: de }) => {
                const me = pe.disabled, Me = pe.value === L, tt = W === de && !me;
                return /* @__PURE__ */ y(
                  "button",
                  {
                    id: O(de),
                    type: "button",
                    role: "option",
                    "aria-selected": Me,
                    disabled: me,
                    onClick: () => !me && Y(pe.value),
                    className: `
                  w-full flex items-center gap-2
                  px-4 py-3
                  font-mono text-sm text-left
                  transition-colors [transition-duration:var(--duration-fast)]
                  ${me ? "opacity-50 cursor-not-allowed" : "text-[var(--text-primary)] hover:bg-[var(--surface-muted)] cursor-pointer"}
                  ${tt ? "bg-[var(--surface-muted)] text-[var(--accent)]" : ""}
                  ${ue.menuItem}
                `,
                    children: [
                      /* @__PURE__ */ o("span", { className: "truncate flex-1 min-w-0", children: pe.label }),
                      Me && /* @__PURE__ */ o("span", { className: `${ue.icon} inline-flex items-center justify-center font-mono font-bold text-[var(--border-focus)] flex-shrink-0`, "aria-hidden": "true", children: /* @__PURE__ */ o(q, { name: "Check" }) })
                    ]
                  },
                  de
                );
              });
              return B.label == null ? /* @__PURE__ */ o(ht, { children: ye }, j) : /* @__PURE__ */ y("div", { role: "group", "aria-labelledby": le, children: [
                /* @__PURE__ */ o(
                  "div",
                  {
                    id: le,
                    className: "px-4 py-2 font-mono text-xs uppercase tracking-wide text-[var(--text-secondary)]",
                    children: B.label
                  }
                ),
                ye
              ] }, j);
            })
          }
        )
      }
    )
  ] });
  return !fe && !$.hasMessage ? /* @__PURE__ */ o("div", { className: `w-full ${i}`.trim(), children: xe }) : /* @__PURE__ */ y("div", { className: `w-full space-y-1 ${i}`.trim(), children: [
    fe && /* @__PURE__ */ o(
      "label",
      {
        id: v,
        htmlFor: _,
        className: "block font-mono text-sm text-secondary-800 dark:text-secondary-200",
        children: f
      }
    ),
    xe,
    /* @__PURE__ */ o(Oe, { ...$.message })
  ] });
});
Xn.displayName = "Select";
const Yn = re(
  ({
    size: e = "md",
    label: t,
    error: r = !1,
    helperText: n,
    errorMessage: a,
    disabled: s = !1,
    checked: i,
    onChange: l,
    onCheckedChange: c,
    indeterminate: d = !1,
    className: u = "",
    "aria-describedby": m,
    ...f
  }, h) => {
    const b = se(e, "Checkbox"), p = Z(null), x = he(
      (C) => {
        p.current = C, typeof h == "function" ? h(C) : h && (h.current = C);
      },
      [h]
    );
    Pe(() => {
      p.current && (p.current.indeterminate = d);
    });
    const z = De({ error: r, helperText: n, errorMessage: a, describedBy: m }), g = z.invalid, k = {
      sm: {
        checkbox: "w-4 h-4",
        glyph: "3",
        label: "text-sm",
        messageIndent: "pl-6"
        // box 16 + gap 8
      },
      md: {
        checkbox: "w-5 h-5",
        glyph: "4",
        label: "text-sm",
        messageIndent: "pl-7"
        // box 20 + gap 8
      },
      lg: {
        checkbox: "w-6 h-6",
        glyph: "5",
        label: "text-sm",
        messageIndent: "pl-8"
        // box 24 + gap 8
      }
    }[b], N = g ? "bg-[var(--field-border-error)]" : `bg-[var(--field-border)] hover:bg-[var(--field-border-hover)]
         peer-checked:bg-[var(--button-primary-background)]
         peer-checked:hover:bg-[var(--button-primary-background-hover)]
         peer-indeterminate:bg-[var(--button-primary-background)]
         peer-indeterminate:hover:bg-[var(--button-primary-background-hover)]`, _ = g ? "peer-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-error)]" : "peer-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]", T = (C) => {
      l && l(C), c && c(C.target.checked), C.target.indeterminate = d;
    }, v = t != null && t !== !1 && t !== "", O = /* @__PURE__ */ y("span", { className: "relative inline-flex shrink-0 before:content-[''] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-touch before:h-touch", children: [
      /* @__PURE__ */ o(
        "input",
        {
          ref: x,
          type: "checkbox",
          ...i !== void 0 ? { checked: i } : {},
          disabled: s,
          onChange: T,
          className: "peer sr-only",
          "aria-invalid": g || void 0,
          "aria-describedby": z.describedBy,
          ...f
        }
      ),
      /* @__PURE__ */ o(
        "span",
        {
          "aria-hidden": "true",
          className: `
            plate-round p-px inline-flex shrink-0
            ${k.checkbox}
            transition-colors [transition-duration:var(--duration-fast)]
            ${s ? "cursor-not-allowed" : "cursor-pointer"}
            ${N}
            ${g ? "peer-checked:[&>span]:bg-[var(--field-border-error)] peer-indeterminate:[&>span]:bg-[var(--field-border-error)]" : "peer-checked:[&>span]:bg-[var(--button-primary-background)] peer-indeterminate:[&>span]:bg-[var(--button-primary-background)]"}
            peer-checked:[&_[data-mark=check]]:opacity-100
            peer-indeterminate:[&_[data-mark=check]]:opacity-0
            peer-indeterminate:[&_[data-mark=bar]]:opacity-100
            ${_}
          `,
          children: /* @__PURE__ */ o(
            "span",
            {
              className: `
              plate-round relative inline-flex h-full w-full items-center justify-center
              bg-[var(--field-background)]
              transition-colors [transition-duration:var(--duration-fast)]
            `,
              children: ["check", "bar"].map((C) => /* @__PURE__ */ o(
                "span",
                {
                  "data-mark": C,
                  className: `absolute inset-0 inline-flex items-center justify-center opacity-0 transition-opacity [transition-duration:var(--duration-fast)] ${g ? "text-[var(--button-destructive-text)]" : "text-[var(--button-primary-text)]"}`,
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ o(q, { name: C === "check" ? "Check" : "Minus", size: k.glyph })
                },
                C
              ))
            }
          )
        }
      )
    ] });
    return /* @__PURE__ */ y("div", { className: `flex flex-col gap-1 ${u}`, children: [
      /* @__PURE__ */ y(
        "label",
        {
          className: `inline-flex items-center gap-2 font-mono ${s ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`,
          children: [
            O,
            v && /* @__PURE__ */ o("span", { className: `${k.label} text-[var(--text-primary)]`, children: t })
          ]
        }
      ),
      /* @__PURE__ */ o(Oe, { ...z.message, className: k.messageIndent })
    ] });
  }
);
Yn.displayName = "Checkbox";
function Zn(e, t, r) {
  return !Number.isFinite(e) || r <= t ? 0 : Math.min(100, Math.max(0, (e - t) / (r - t) * 100));
}
const Qn = re(function({ label: t, id: r, className: n = "", disabled: a, min: s = 0, max: i = 100, value: l, defaultValue: c, onChange: d, ...u }, m) {
  const f = ce(), h = r ?? f, b = Number(s), p = Number(i), x = l !== void 0, [z, g] = V(
    () => c !== void 0 ? Number(c) : b
  ), $ = x ? Number(l) : z, k = Zn($, b, p), N = (_) => {
    x || g(Number(_.target.value)), d == null || d(_);
  };
  return /* @__PURE__ */ y("span", { className: `flex w-full flex-col gap-1.5 font-mono ${n}`, children: [
    t && /* @__PURE__ */ o("label", { htmlFor: h, className: "text-sm text-secondary-800 dark:text-secondary-300", children: t }),
    /* @__PURE__ */ y("span", { className: `relative flex h-touch w-full items-center ${a ? "opacity-50" : ""}`, children: [
      /* @__PURE__ */ o(
        "span",
        {
          "aria-hidden": "true",
          "data-slot": "rail",
          className: "pointer-events-none absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 bg-[var(--control-track)]",
          children: /* @__PURE__ */ o(
            "span",
            {
              "data-slot": "fill",
              className: "block h-full bg-[var(--accent)]",
              style: { width: `${k}%` }
            }
          )
        }
      ),
      /* @__PURE__ */ o(
        "input",
        {
          ref: m,
          id: h,
          type: "range",
          min: s,
          max: i,
          disabled: a,
          ...x ? { value: l } : { defaultValue: c },
          onChange: N,
          className: `
            relative m-0 h-touch w-full appearance-none bg-transparent
            ${a ? "cursor-default" : "cursor-pointer"}
            focus:outline-none
            focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]
            [&::-webkit-slider-runnable-track]:h-1
            [&::-webkit-slider-runnable-track]:bg-transparent
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-3.5
            [&::-webkit-slider-thumb]:-mt-2
            [&::-webkit-slider-thumb]:bg-[var(--accent)]
            [&::-webkit-slider-thumb]:[clip-path:var(--plate-round)]
            [&::-moz-range-track]:h-1
            [&::-moz-range-track]:bg-transparent
            [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-3.5
            [&::-moz-range-thumb]:bg-[var(--accent)]
            [&::-moz-range-thumb]:border-0
            [&::-moz-range-thumb]:[clip-path:var(--plate-round)]
          `,
          ...u
        }
      )
    ] })
  ] });
});
Qn.displayName = "Slider";
const Jn = re(
  ({
    size: e = "md",
    label: t,
    error: r = !1,
    helperText: n,
    errorMessage: a,
    disabled: s = !1,
    checked: i,
    onChange: l,
    onCheckedChange: c,
    className: d = "",
    "aria-describedby": u,
    ...m
  }, f) => {
    const h = se(e, "Radio"), b = De({ error: r, helperText: n, errorMessage: a, describedBy: u }), p = b.invalid, z = {
      sm: {
        radio: "w-4 h-4",
        // 16px × 16px
        dot: "w-1.5 h-1.5",
        // 6px square dot
        label: "text-sm",
        // 14px text
        messageIndent: "pl-6"
        // box 16 + gap 8
      },
      md: {
        radio: "w-5 h-5",
        // 20px × 20px
        dot: "w-2 h-2",
        // 8px square dot
        label: "text-sm",
        // 14px text
        messageIndent: "pl-7"
        // box 20 + gap 8
      },
      lg: {
        radio: "w-6 h-6",
        // 24px × 24px
        dot: "w-2.5 h-2.5",
        // 10px square dot
        label: "text-sm",
        // 14px text
        messageIndent: "pl-8"
        // box 24 + gap 8
      }
    }[h], g = p ? "bg-[var(--field-border-error)]" : `bg-[var(--field-border)] hover:bg-[var(--field-border-hover)]
         peer-checked:bg-[var(--button-primary-background)]
         peer-checked:hover:bg-[var(--button-primary-background-hover)]`, $ = p ? "peer-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-error)]" : "peer-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]", k = (T) => {
      const v = T.currentTarget.checked;
      l && l(T), c && c(v);
    }, N = t != null && t !== !1 && t !== "", _ = /* @__PURE__ */ y("span", { className: "relative inline-flex shrink-0 before:content-[''] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-touch before:h-touch", children: [
      /* @__PURE__ */ o(
        "input",
        {
          ref: f,
          type: "radio",
          ...i !== void 0 ? { checked: i } : {},
          disabled: s,
          onChange: k,
          className: "peer sr-only",
          "aria-invalid": p || void 0,
          "aria-describedby": b.describedBy,
          ...m
        }
      ),
      /* @__PURE__ */ o(
        "span",
        {
          "aria-hidden": "true",
          className: `
            plate-round p-px inline-flex shrink-0
            ${z.radio}
            transition-colors [transition-duration:var(--duration-fast)]
            ${s ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
            ${g}
            ${p ? "peer-checked:[&>span]:bg-[var(--field-border-error)]" : "peer-checked:[&>span]:bg-[var(--button-primary-background)]"}
            peer-checked:[&>span>span]:opacity-100
            ${$}
          `,
          children: /* @__PURE__ */ o(
            "span",
            {
              className: `
              plate-round inline-flex h-full w-full items-center justify-center
              bg-[var(--field-background)]
              transition-colors [transition-duration:var(--duration-fast)]
            `,
              children: /* @__PURE__ */ o(
                "span",
                {
                  className: `
                ${z.dot}
                opacity-0
                transition-opacity [transition-duration:var(--duration-fast)]
                ${p ? "bg-[var(--button-destructive-text)]" : "bg-[var(--button-primary-text)]"}
              `
                }
              )
            }
          )
        }
      )
    ] });
    return /* @__PURE__ */ y("div", { className: `flex flex-col gap-1 ${d}`, children: [
      /* @__PURE__ */ y(
        "label",
        {
          className: `inline-flex items-center gap-2 font-mono ${s ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`,
          children: [
            _,
            N && /* @__PURE__ */ o("span", { className: `${z.label} text-[var(--text-primary)]`, children: t })
          ]
        }
      ),
      /* @__PURE__ */ o(Oe, { ...b.message, className: z.messageIndent })
    ] });
  }
);
Jn.displayName = "Radio";
const eo = re(
  ({
    size: e = "md",
    error: t = !1,
    helperText: r,
    errorMessage: n,
    disabled: a = !1,
    className: s = "",
    label: i,
    id: l,
    "aria-describedby": c,
    ...d
  }, u) => {
    const m = se(e, "Textarea"), f = De({ error: t, helperText: r, errorMessage: n, describedBy: c }), h = f.invalid, b = ce(), p = l ?? (i != null && i !== "" ? b : void 0), x = `
      w-full
      font-mono text-sm
      transition-colors [transition-duration:var(--duration-fast)]
      placeholder:text-[var(--field-placeholder)]
      disabled:cursor-not-allowed
      focus:outline-none
      resize-y
    `, z = h ? "focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-error)]" : "focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]", g = {
      sm: "min-h-control-sm px-3 py-1.5 plate-round",
      md: "min-h-control-md px-4 py-2.5 plate-round",
      lg: "min-h-control-lg px-5 py-3.5 plate-round"
    }, $ = h ? "bg-[var(--field-background-error)] text-[var(--text-primary)]" : "bg-[var(--field-background)] text-[var(--text-primary)]", N = /* @__PURE__ */ o(
      "div",
      {
        className: `w-full plate-round p-px transition-colors [transition-duration:var(--duration-fast)] ${h ? "bg-[var(--field-border-error)]" : "bg-[var(--field-border)] hover:bg-[var(--field-border-hover)] focus-within:!bg-[var(--field-border-focus)]"} ${a ? "opacity-50" : ""}`,
        children: /* @__PURE__ */ o(
          "textarea",
          {
            ref: u,
            id: p,
            disabled: a,
            "aria-invalid": h || void 0,
            "aria-describedby": f.describedBy,
            className: `${x} ${z} ${g[m]} ${$} ${s}`,
            ...d
          }
        )
      }
    ), _ = i != null && i !== "";
    return !_ && !f.hasMessage ? N : /* @__PURE__ */ y("div", { className: "w-full space-y-1", children: [
      _ && /* @__PURE__ */ o(
        "label",
        {
          htmlFor: p,
          className: "block font-mono text-sm text-secondary-800 dark:text-secondary-200",
          children: i
        }
      ),
      N,
      /* @__PURE__ */ o(Oe, { ...f.message })
    ] });
  }
);
eo.displayName = "Textarea";
const to = {
  sm: {
    track: "h-[var(--switch-track-height-sm)] w-[var(--switch-track-width-sm)]",
    knob: "h-[var(--switch-knob-size-sm)] w-[var(--switch-knob-size-sm)]",
    knobOff: "var(--switch-knob-inset-sm)",
    knobOn: "var(--switch-knob-travel-sm)",
    iconSize: "w-3 h-3"
  },
  md: {
    track: "h-[var(--switch-track-height-md)] w-[var(--switch-track-width-md)]",
    knob: "h-[var(--switch-knob-size-md)] w-[var(--switch-knob-size-md)]",
    knobOff: "var(--switch-knob-inset-md)",
    knobOn: "var(--switch-knob-travel-md)",
    iconSize: "w-3 h-3"
  },
  lg: {
    track: "h-[var(--switch-track-height-lg)] w-[var(--switch-track-width-lg)]",
    knob: "h-[var(--switch-knob-size-lg)] w-[var(--switch-knob-size-lg)]",
    knobOff: "var(--switch-knob-inset-lg)",
    knobOn: "var(--switch-knob-travel-lg)",
    iconSize: "w-4 h-4"
  }
}, dr = re(
  ({
    checked: e = !1,
    onCheckedChange: t,
    size: r = "md",
    label: n,
    hideLabel: a = !1,
    disabled: s = !1,
    icon: i,
    className: l = "",
    ...c
  }, d) => {
    const u = se(r, "Switch"), m = to[u], f = () => {
      !s && t && t(!e);
    }, h = (b) => {
      (b.key === " " || b.key === "Enter") && (b.preventDefault(), !s && t && t(!e));
    };
    return /* @__PURE__ */ y("div", { className: `flex items-center gap-3 ${l}`, children: [
      /* @__PURE__ */ o(
        "button",
        {
          ref: d,
          type: "button",
          role: "switch",
          "aria-checked": e,
          "aria-label": n || (e ? "On" : "Off"),
          disabled: s,
          onClick: f,
          onKeyDown: h,
          className: `
            group relative inline-flex shrink-0
            before:content-[''] before:absolute before:inset-x-0 before:top-1/2 before:-translate-y-1/2 before:h-touch
            focus:outline-none
            ${s ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `,
          ...c,
          children: /* @__PURE__ */ o(
            "span",
            {
              "aria-hidden": "true",
              "data-state": e ? "on" : "off",
              className: `
              relative inline-flex items-center
              ${m.track}
              plate-round
              transition-colors [transition-duration:var(--duration-normal)] motion-reduce:transition-none
              group-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]
              ${e ? "bg-[var(--accent)]" : "bg-[var(--control-track)]"}
            `,
              children: /* @__PURE__ */ o(
                "span",
                {
                  className: `
              inline-flex items-center justify-center
              ${m.knob}
              plate-round
              bg-[var(--field-background)]
              shadow-none
              transform transition-transform [transition-duration:var(--duration-normal)] motion-reduce:transition-none
            `,
                  style: {
                    transform: `translateX(${e ? m.knobOn : m.knobOff})`
                  },
                  children: i && /* @__PURE__ */ o("span", { className: m.iconSize, children: i })
                }
              )
            }
          )
        }
      ),
      n && !a && /* @__PURE__ */ o(
        "span",
        {
          onClick: f,
          className: `select-none text-sm font-mono ${s ? "cursor-not-allowed text-secondary-700 dark:text-secondary-400" : "cursor-pointer text-[var(--text-primary)]"}`,
          children: n
        }
      )
    ] });
  }
);
dr.displayName = "Switch";
function Ot(e, t, r) {
  var s;
  const n = e.length;
  if (n === 0) return -1;
  let a = t;
  for (let i = 0; i < n; i++)
    if (a += r, a >= n && (a = 0), a < 0 && (a = n - 1), !((s = e[a]) != null && s.disabled)) return a;
  return -1;
}
function rs({
  trigger: e,
  items: t,
  align: r = "left",
  label: n = "Actions",
  size: a = "md"
}) {
  const s = se(a, "Dropdown"), [i, l] = V(!1), [c, d] = V(-1), u = Z(null), m = Z(null), f = () => {
    l(!i), i || d(-1);
  }, h = () => {
    l(!1), d(-1);
  }, b = (k) => {
    k.disabled || (k.onClick(), h());
  };
  G(() => {
    function k(N) {
      u.current && !u.current.contains(N.target) && h();
    }
    if (i)
      return document.addEventListener("mousedown", k), () => {
        document.removeEventListener("mousedown", k);
      };
  }, [i]), G(() => {
    function k(N) {
      if (!i) return;
      const _ = c;
      switch (N.key) {
        case "Escape":
          N.preventDefault(), h();
          break;
        case "Tab":
          h();
          break;
        case "ArrowDown":
          N.preventDefault(), d((T) => Ot(t, T, 1));
          break;
        case "ArrowUp":
          N.preventDefault(), d((T) => Ot(t, T, -1));
          break;
        case "Enter":
        case " ":
          N.preventDefault(), _ >= 0 && _ < t.length && b(t[_]);
          break;
      }
    }
    if (i)
      return document.addEventListener("keydown", k), () => {
        document.removeEventListener("keydown", k);
      };
  }, [i, c, t]), G(() => {
    if (c >= 0 && m.current) {
      const N = m.current.querySelectorAll('[role="menuitem"]')[c];
      N && N.scrollIntoView({ block: "nearest" });
    }
  }, [c]);
  const x = {
    sm: {
      button: "h-control-sm px-4 py-1.5 plate-round",
      menu: "",
      menuItem: "",
      icon: "w-4 h-4"
    },
    md: {
      button: "h-control-md px-5 py-2.5 plate-round",
      menu: "",
      menuItem: "",
      icon: "w-5 h-5"
    },
    lg: {
      button: "h-control-lg px-6 py-3.5 plate-round",
      menu: "",
      menuItem: "",
      icon: "w-6 h-6"
    }
  }[s], z = /* @__PURE__ */ y(
    "button",
    {
      type: "button",
      onClick: f,
      className: `
        inline-flex items-center justify-center gap-2
        font-mono text-sm
        ${x.button}
        transition-colors [transition-duration:var(--duration-normal)]
        cursor-pointer
        bg-[var(--button-secondary-background)] hover:bg-[var(--button-secondary-background-hover)] active:brightness-95
        text-[var(--button-secondary-text)] hover:text-[var(--button-secondary-text-hover)]
        focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-secondary)]
      `,
      "aria-haspopup": "true",
      "aria-expanded": i,
      children: [
        n,
        /* @__PURE__ */ o("span", { className: `${x.icon} inline-flex items-center justify-center font-mono leading-none transition-transform [transition-duration:var(--duration-normal)] ${i ? "rotate-180" : ""}`, "aria-hidden": "true", children: /* @__PURE__ */ o(q, { name: "ChevronDown" }) })
      ]
    }
  ), g = {
    "aria-haspopup": "true",
    "aria-expanded": i
  };
  let $;
  if (!e)
    $ = z;
  else if (He(e)) {
    const k = e;
    $ = bt(k, {
      ...g,
      onClick: (N) => {
        var _, T;
        (T = (_ = k.props).onClick) == null || T.call(_, N), f();
      }
    });
  } else
    $ = /* @__PURE__ */ o(
      "div",
      {
        ...g,
        onClick: f,
        role: "button",
        tabIndex: 0,
        onKeyDown: (k) => {
          (k.key === "Enter" || k.key === " ") && (k.preventDefault(), f());
        },
        children: e
      }
    );
  return /* @__PURE__ */ y("div", { ref: u, className: "relative inline-block", children: [
    $,
    i && /* @__PURE__ */ o(
      "div",
      {
        style: { animationDuration: "var(--duration-normal)" },
        className: `
            absolute top-full mt-2
            ${r === "right" ? "right-0" : "left-0"}
            min-w-52
            plate-round p-px bg-[var(--border-default)]
            z-[var(--z-index-dropdown)]
            animate-in fade-in slide-in-from-top-2
          `,
        children: /* @__PURE__ */ o(
          "div",
          {
            ref: m,
            role: "menu",
            "aria-orientation": "vertical",
            className: `plate-round bg-[var(--surface-card)] ${x.menu}`,
            children: t.map((k, N) => {
              const _ = k.variant === "destructive", T = k.disabled;
              return /* @__PURE__ */ y(
                "button",
                {
                  type: "button",
                  role: "menuitem",
                  disabled: T,
                  onClick: () => b(k),
                  className: `
                  w-full flex items-center gap-2
                  px-4 py-3
                  font-mono text-sm text-left
                  transition-colors [transition-duration:var(--duration-fast)]
                  ${T ? "opacity-50 cursor-not-allowed" : _ ? "text-[var(--text-error)] hover:bg-[var(--field-background-error)]" : "text-[var(--text-primary)] hover:bg-[var(--surface-muted)]"}
                  ${c === N && !T ? _ ? "bg-[var(--field-background-error)]" : "bg-[var(--surface-muted)] text-[var(--accent)]" : ""}
                  ${x.menuItem}
                `,
                  children: [
                    /* @__PURE__ */ y("div", { className: "flex items-center gap-2 flex-1 min-w-0", children: [
                      k.icon && /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center ${x.icon} flex-shrink-0`, children: k.icon }),
                      /* @__PURE__ */ o("span", { className: "truncate", children: k.label })
                    ] }),
                    k.iconRight && /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center ${x.icon} flex-shrink-0 ml-auto`, children: k.iconRight })
                  ]
                },
                N
              );
            })
          }
        )
      }
    )
  ] });
}
const Ke = "text-secondary-700 dark:text-secondary-600", Se = "text-secondary-800 dark:text-secondary-500", $e = "text-[var(--text-primary)]", Ge = "text-[var(--accent)]", Ee = "border-[var(--surface-container-stroke)]", ro = {
  background: "repeating-linear-gradient(45deg, var(--surface-subtle), var(--surface-subtle) 8px, var(--surface-muted) 8px, var(--surface-muted) 16px)"
}, Ve = (e) => e === "wide" ? " [--csp-bw:max(100%,min(calc(100%+240px),calc(100cqw-48px)))] w-[var(--csp-bw)] ml-[calc((100%-var(--csp-bw))/2)]" : e === "full" ? " [--csp-bw:max(100%,calc(100cqw-48px))] w-[var(--csp-bw)] ml-[calc((100%-var(--csp-bw))/2)]" : "", no = 0.62, oo = (e) => `min(var(--font-size-xs), calc((100cqw - var(--spacing-10)) / ${(Math.max(...e.split(`
`).map((r) => r.length)) * no).toFixed(2)}))`, vt = (e) => String(e).padStart(2, "0"), ao = (e) => e.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""), ur = (e) => e.type === "imagePair" ? 2 : e.type === "image" || e.type === "ascii" || e.type === "slot" ? 1 : 0;
function so(e, t = 1) {
  const r = /* @__PURE__ */ new Map();
  let n = t;
  for (const a of e) {
    const s = ur(a);
    s && (r.set(a, n), n += s);
  }
  return r;
}
function yt({ fig: e, caption: t }) {
  return !e && !t ? null : /* @__PURE__ */ y("figcaption", { className: "mt-3 flex gap-3 text-xs leading-relaxed", children: [
    e !== void 0 && /* @__PURE__ */ y("span", { className: `flex-none ${Ge}`, children: [
      "fig. ",
      vt(e)
    ] }),
    t && /* @__PURE__ */ o("span", { className: Ke, children: t })
  ] });
}
function at({
  fig: e,
  caption: t,
  width: r,
  children: n
}) {
  return /* @__PURE__ */ y("figure", { className: `my-10 m-0${Ve(r)}`, children: [
    /* @__PURE__ */ o("div", { className: "plate-round p-px bg-[var(--border-hairline)]", children: n }),
    /* @__PURE__ */ o(yt, { fig: e, caption: t })
  ] });
}
function Ze({ src: e, alt: t, aspect: r }) {
  const n = r ?? "16 / 9";
  return e ? /* @__PURE__ */ o(
    "img",
    {
      src: e,
      alt: t ?? "",
      className: "plate-round block w-full",
      style: { aspectRatio: n, objectFit: "cover" }
    }
  ) : /* @__PURE__ */ o("div", { className: "plate-round w-full", style: { aspectRatio: n, ...ro } });
}
function mr({ items: e }) {
  const t = e.length >= 4 ? "sm:grid-cols-4" : e.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";
  return /* @__PURE__ */ o("dl", { className: `m-0 grid grid-cols-2 gap-x-8 gap-y-6 ${t}`, children: e.map((r) => (
    // dt stays first for screen readers; the figure is moved above it
    // visually, so every figure hangs from the top of its cell however
    // its label wraps.
    /* @__PURE__ */ y("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ o("dt", { className: `mt-2 text-xs ${Ke}`, children: r.label }),
      /* @__PURE__ */ o("dd", { className: `order-first m-0 text-2xl leading-none ${Ge}`, children: r.value })
    ] }, r.label)
  )) });
}
function io({
  b: e,
  fig: t,
  slots: r
}) {
  switch (e.type) {
    case "prose":
      return /* @__PURE__ */ o("p", { className: `my-6 text-base leading-relaxed ${Se}`, children: e.text });
    case "image":
      return /* @__PURE__ */ o(at, { fig: t, caption: e.caption, width: e.width, children: /* @__PURE__ */ o(Ze, { src: e.src, alt: e.alt, aspect: e.aspect }) });
    case "imagePair":
      return /* @__PURE__ */ o("div", { className: `my-10 grid grid-cols-1 gap-4 sm:grid-cols-2${Ve(e.width)}`, children: [0, 1].map((n) => {
        var a, s, i;
        return /* @__PURE__ */ y("figure", { className: "m-0", children: [
          /* @__PURE__ */ o("div", { className: "plate-round p-px bg-[var(--border-hairline)]", children: /* @__PURE__ */ o(Ze, { src: (a = e.srcs) == null ? void 0 : a[n], alt: (s = e.alts) == null ? void 0 : s[n], aspect: "4 / 3" }) }),
          /* @__PURE__ */ o(yt, { fig: t === void 0 ? void 0 : t + n, caption: (i = e.captions) == null ? void 0 : i[n] })
        ] }, n);
      }) });
    case "ascii": {
      const n = oo(e.text);
      return /* @__PURE__ */ o(at, { fig: t, caption: e.caption, width: e.width, children: /* @__PURE__ */ o("div", { className: "[container-type:inline-size]", children: /* @__PURE__ */ o(
        "pre",
        {
          role: "img",
          "aria-label": e.label ?? e.caption ?? "diagram",
          className: `plate-round m-0 overflow-x-auto p-5 leading-snug ${Se}`,
          style: { fontSize: n },
          children: e.text
        }
      ) }) });
    }
    case "slot": {
      const n = r == null ? void 0 : r[e.name];
      return /* @__PURE__ */ o(at, { fig: t, caption: e.caption, width: e.width, children: n ? /* @__PURE__ */ o("div", { className: "plate-round overflow-hidden", children: n }) : /* @__PURE__ */ o(Ze, { aspect: e.aspect }) });
    }
    case "list":
      return /* @__PURE__ */ o("ul", { className: "my-10 list-none p-0", children: e.items.map((n, a) => {
        const s = a === 0, i = a === e.items.length - 1;
        return /* @__PURE__ */ y("li", { className: `relative pl-8 ${i ? "" : "pb-6"}`, children: [
          !(s && i) && /* @__PURE__ */ o("span", { "aria-hidden": "true", className: `absolute left-1 border-l-hairline ${Ee} ${`${s ? "top-3" : "top-0"} ${i ? "h-3" : "bottom-0"}`}` }),
          /* @__PURE__ */ o("span", { "aria-hidden": "true", className: `absolute left-1 top-3 w-4 border-t-hairline ${Ee}` }),
          /* @__PURE__ */ o("div", { className: `text-sm leading-6 ${$e}`, children: n.title }),
          /* @__PURE__ */ o("p", { className: `m-0 mt-1 text-sm leading-6 ${Se}`, children: n.text })
        ] }, n.title);
      }) });
    case "insights":
      return /* @__PURE__ */ o("ol", { className: `my-10 list-none border-b-hairline p-0 ${Ee}`, children: e.items.map((n, a) => /* @__PURE__ */ y(
        "li",
        {
          className: `grid grid-cols-[theme(spacing.16)_1fr] border-t-hairline py-6 ${Ee}`,
          children: [
            /* @__PURE__ */ o("span", { className: `text-2xl leading-none ${Ge}`, children: vt(a + 1) }),
            /* @__PURE__ */ y("div", { children: [
              /* @__PURE__ */ o("div", { className: `text-lg leading-snug ${$e}`, children: n.title }),
              /* @__PURE__ */ o("p", { className: `m-0 mt-2 text-sm leading-relaxed ${Se}`, children: n.text })
            ] })
          ]
        },
        n.title
      )) });
    case "callouts": {
      const n = e.items.length === 3;
      return /* @__PURE__ */ o(
        "div",
        {
          className: `my-10 grid grid-cols-1 gap-4 ${n ? `sm:grid-cols-3${Ve("wide")}` : "sm:grid-cols-2"}`,
          children: e.items.map((a) => /* @__PURE__ */ y("div", { className: "plate-round bg-[var(--surface-muted)] p-5", children: [
            /* @__PURE__ */ o("div", { className: `text-base leading-snug ${$e}`, children: a.title }),
            /* @__PURE__ */ o("p", { className: `m-0 mt-2 text-sm leading-relaxed ${Se}`, children: a.text })
          ] }, a.title))
        }
      );
    }
    case "quote":
      return /* @__PURE__ */ y("figure", { className: "my-10 m-0 border-l-hairline border-[var(--accent)] pl-6", children: [
        /* @__PURE__ */ o("blockquote", { className: `m-0 p-0 text-lg leading-relaxed ${$e}`, children: e.text }),
        e.name && /* @__PURE__ */ y("figcaption", { className: "mt-4 flex items-center gap-3 text-sm", children: [
          /* @__PURE__ */ o(Gn, { size: "md", src: e.image, alt: "" }),
          /* @__PURE__ */ y("span", { children: [
            /* @__PURE__ */ o("span", { className: `block ${$e}`, children: e.name }),
            e.role && /* @__PURE__ */ o("span", { className: `block text-xs ${Ke}`, children: e.role })
          ] })
        ] })
      ] });
    case "statement":
      return /* @__PURE__ */ y("div", { className: `my-12 border-y-hairline py-10 ${Ee}${Ve("wide")}`, children: [
        e.kicker && /* @__PURE__ */ o("div", { className: `mb-4 text-xs uppercase tracking-wider ${Ge}`, children: e.kicker }),
        /* @__PURE__ */ o("p", { className: `m-0 text-2xl leading-snug ${$e}`, children: e.text })
      ] });
    case "outcomes":
      return /* @__PURE__ */ o("div", { className: "my-10", children: /* @__PURE__ */ o(mr, { items: e.items }) });
  }
}
function lo({
  blocks: e,
  slots: t,
  figureStart: r = 1,
  className: n = ""
}) {
  const a = so(e, r);
  return /* @__PURE__ */ o("div", { className: `font-mono ${n}`, children: e.map((s, i) => /* @__PURE__ */ o(io, { b: s, fig: a.get(s), slots: t }, i)) });
}
function co({
  study: e,
  className: t = ""
}) {
  const { title: r, summary: n, outcomes: a, meta: s, cover: i } = e;
  return /* @__PURE__ */ y("header", { className: `font-mono ${t}`, children: [
    /* @__PURE__ */ o("h1", { className: `m-0 text-2xl leading-tight sm:text-page-title ${$e}`, children: r }),
    /* @__PURE__ */ o("p", { className: `m-0 mt-5 text-base leading-relaxed sm:text-lg ${Se}`, children: n }),
    a && a.length > 0 && /* @__PURE__ */ o("div", { className: "mt-10", children: /* @__PURE__ */ o(mr, { items: a }) }),
    s && s.length > 0 && /* @__PURE__ */ o(
      "dl",
      {
        className: `m-0 mt-10 grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 border-t-hairline pt-6 sm:grid-cols-[auto_1fr_auto_1fr] ${Ee}`,
        children: s.map((l) => /* @__PURE__ */ y("div", { className: "contents", children: [
          /* @__PURE__ */ o("dt", { className: `text-xs uppercase leading-5 tracking-wider ${Ke}`, children: l.label }),
          /* @__PURE__ */ o("dd", { className: `m-0 text-sm leading-5 ${Se}`, children: l.value })
        ] }, l.label))
      }
    ),
    i && /* @__PURE__ */ y("figure", { className: `mt-12 m-0${Ve(i.width ?? "wide")}`, children: [
      /* @__PURE__ */ o("div", { className: "plate-round p-px bg-[var(--border-hairline)]", children: /* @__PURE__ */ o(Ze, { src: i.src, alt: i.alt, aspect: i.aspect }) }),
      /* @__PURE__ */ o(yt, { caption: i.caption })
    ] })
  ] });
}
function uo({ n: e, section: t }) {
  return /* @__PURE__ */ y("header", { children: [
    /* @__PURE__ */ y("div", { className: `flex gap-3 border-t-hairline pt-3 text-xs uppercase tracking-wider ${Ee}`, children: [
      /* @__PURE__ */ o("span", { className: Ge, children: vt(e) }),
      /* @__PURE__ */ o("span", { className: Ke, children: t.kicker })
    ] }),
    /* @__PURE__ */ o("h2", { className: `m-0 mt-4 text-xl leading-snug sm:text-2xl ${$e}`, children: t.title }),
    t.intro && /* @__PURE__ */ o("p", { className: `m-0 mt-4 text-base leading-relaxed ${Se}`, children: t.intro })
  ] });
}
function mo({
  sections: e,
  slots: t,
  className: r = ""
}) {
  const n = e.filter((s) => !s.hidden);
  let a = 1;
  return /* @__PURE__ */ o("div", { className: `font-mono ${r}`, children: n.map((s, i) => {
    const l = a;
    return a += (s.blocks ?? []).reduce((c, d) => c + ur(d), 0), /* @__PURE__ */ y(
      "section",
      {
        id: s.id ?? ao(s.kicker),
        className: "mt-16 first:mt-0 sm:mt-20 sm:first:mt-0",
        children: [
          /* @__PURE__ */ o(uo, { n: i + 1, section: s }),
          s.blocks && s.blocks.length > 0 && /* @__PURE__ */ o(lo, { blocks: s.blocks, slots: t, figureStart: l })
        ]
      },
      s.id ?? s.kicker
    );
  }) });
}
function ns({
  study: e,
  slots: t,
  className: r = ""
}) {
  return /* @__PURE__ */ y("article", { className: `font-mono ${r}`, children: [
    /* @__PURE__ */ o(co, { study: e }),
    /* @__PURE__ */ o(mo, { sections: e.sections, slots: t, className: "mt-16 sm:mt-20" })
  ] });
}
const fo = re(function({ meta: t, title: r, description: n, titleSuffix: a, thumb: s, thumbPosition: i = "start", selected: l = !1, className: c = "", ...d }, u) {
  const m = "as" in d && d.as ? d.as : null, f = m ? "as" : "href" in d && d.href != null ? "a" : "onClick" in d && d.onClick != null ? "button" : "div", h = `
    block w-full text-left p-3 plate-round
    transition-colors [transition-duration:var(--duration-fast)]
    font-mono
    ${f !== "div" ? "cursor-pointer hover:bg-[var(--surface-muted)] focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]" : ""}
    ${l ? "bg-[var(--surface-muted)]" : ""}
    ${c}
  `, b = /* @__PURE__ */ y(ge, { children: [
    t && /* @__PURE__ */ o("span", { className: "block text-sm text-secondary-700 dark:text-secondary-600", children: t }),
    /* @__PURE__ */ y(
      "span",
      {
        className: `block truncate text-base leading-6 ${f !== "div" ? "text-[var(--accent)]" : "text-[var(--text-primary)]"}`,
        children: [
          r,
          a && /* @__PURE__ */ o("span", { className: "ml-2 leading-none", children: a })
        ]
      }
    ),
    n && /* @__PURE__ */ o("span", { className: "mt-1 block text-sm leading-6 text-secondary-800 dark:text-secondary-500", children: n })
  ] }), p = s ? /* @__PURE__ */ y("span", { className: `flex items-start gap-4 ${i === "end" ? "flex-row-reverse" : ""}`, children: [
    /* @__PURE__ */ o("span", { className: "flex-shrink-0", children: s }),
    /* @__PURE__ */ o("span", { className: "block min-w-0 flex-1", children: b })
  ] }) : b;
  if (m) {
    const { asProps: z, ...g } = d, $ = { ...g };
    return delete $.as, /* @__PURE__ */ o(m, { ref: u, className: h, ...$, ...z, children: p });
  }
  if (f === "a") {
    const { href: z, ...g } = d;
    return /* @__PURE__ */ o("a", { ref: u, href: z, className: h, ...g, children: p });
  }
  if (f === "button") {
    const { onClick: z, ...g } = d;
    return /* @__PURE__ */ o("button", { ref: u, type: "button", onClick: z, className: h, ...g, children: p });
  }
  return /* @__PURE__ */ o("div", { ref: u, className: h, ...d, children: p });
});
fo.displayName = "ListRow";
const ft = re(function({ variant: t = "inline", external: r = !1, className: n = "", children: a, ...s }, i) {
  const l = S(
    "font-mono text-[var(--accent)] transition-colors [transition-duration:var(--duration-fast)] hover:text-[var(--text-link-hover)]",
    "focus:outline-none focus-visible:[outline:var(--focus-ring-width)_solid_var(--focus-ring-primary)] focus-visible:[outline-offset:var(--focus-ring-offset)]",
    t === "inline" ? "underline underline-offset-2" : "no-underline hover:underline focus-visible:underline",
    n
  ), c = /* @__PURE__ */ y(ge, { children: [
    a,
    r && /* @__PURE__ */ y(ge, { children: [
      /* @__PURE__ */ o(q, { name: "ExternalLink", size: "3", className: "ml-1" }),
      /* @__PURE__ */ o("span", { className: "sr-only", children: " (opens in new tab)" })
    ] })
  ] });
  if ("as" in s && s.as) {
    const { as: h, asProps: b } = s;
    return /* @__PURE__ */ o(h, { ref: i, className: l, ...r ? { target: "_blank", rel: "noopener noreferrer" } : void 0, ...b, children: c });
  }
  const { href: d, target: u, rel: m, ...f } = s;
  return /* @__PURE__ */ o(
    "a",
    {
      ref: i,
      href: d,
      className: l,
      target: r ? u ?? "_blank" : u,
      rel: r ? m ?? "noopener noreferrer" : m,
      ...f,
      children: c
    }
  );
});
ft.displayName = "Link";
const po = {
  default: "Bell",
  success: "CheckCircle",
  warning: "AlertTriangle",
  error: "AlertCircle",
  info: "Info"
}, bo = {
  default: {
    ring: "bg-[var(--border-hairline)]",
    fill: "bg-[var(--surface-muted)]",
    icon: "text-secondary-800 dark:text-secondary-300",
    text: "text-[var(--text-primary)]"
  },
  success: {
    ring: "bg-success-300 dark:bg-success-700",
    fill: "bg-success-50 dark:bg-success-950",
    icon: "text-success-800 dark:text-success-400",
    text: "text-success-900 dark:text-success-50"
  },
  warning: {
    ring: "bg-warning-300 dark:bg-warning-700",
    fill: "bg-warning-50 dark:bg-warning-950",
    icon: "text-warning-800 dark:text-warning-400",
    text: "text-warning-900 dark:text-warning-50"
  },
  error: {
    ring: "bg-error-300 dark:bg-error-700",
    fill: "bg-error-50 dark:bg-error-950",
    icon: "text-error-700 dark:text-error-400",
    text: "text-error-900 dark:text-error-50"
  },
  info: {
    ring: "bg-info-300 dark:bg-info-700",
    fill: "bg-info-50 dark:bg-info-950",
    icon: "text-info-800 dark:text-info-400",
    text: "text-info-900 dark:text-info-50"
  }
}, jt = `
  relative shrink-0 inline-flex items-center px-1 font-mono text-sm font-bold cursor-pointer
  before:content-[''] before:absolute before:inset-x-0 before:top-1/2 before:-translate-y-1/2 before:h-touch
  focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]
`;
function ho({ children: e, onClick: t, variant: r = "default", action: n, duration: a, onDismiss: s }) {
  const [i, l] = V(!1);
  G(() => {
    const g = requestAnimationFrame(() => l(!0));
    return () => cancelAnimationFrame(g);
  }, []);
  const [c, d] = V(!1), [u, m] = V(!1), f = c || u, h = Z(s);
  G(() => {
    h.current = s;
  });
  const b = Z(a ?? 0);
  G(() => {
    b.current = a ?? 0;
  }, [a]), G(() => {
    if (f || a == null || !Number.isFinite(a) || !h.current) return;
    const g = Date.now(), $ = setTimeout(() => {
      var k;
      return (k = h.current) == null ? void 0 : k.call(h);
    }, Math.max(0, b.current));
    return () => {
      clearTimeout($), b.current -= Date.now() - g;
    };
  }, [f, a]);
  const p = (g) => {
    g.currentTarget.contains(g.relatedTarget) || m(!1);
  }, x = bo[r], z = a === 1 / 0 && s != null;
  return /* @__PURE__ */ o(
    "div",
    {
      role: r === "error" ? "alert" : "status",
      onClick: t,
      onMouseEnter: () => d(!0),
      onMouseLeave: () => d(!1),
      onFocus: () => m(!0),
      onBlur: p,
      className: `
        plate-round p-px ${x.ring}
        transition-transform [transition-duration:var(--duration-normal)] [transition-timing-function:steps(5)]
        ${i ? "translate-y-0" : "translate-y-16"}
        ${t ? "cursor-pointer" : ""}
      `,
      children: /* @__PURE__ */ y(
        "div",
        {
          className: `plate-round flex max-w-[min(28rem,calc(100vw-2rem))] items-center gap-2 px-3 py-2.5 font-mono text-sm ${x.fill} ${x.text}`,
          children: [
            /* @__PURE__ */ o("span", { className: `inline-flex shrink-0 ${x.icon}`, children: /* @__PURE__ */ o(q, { name: po[r], size: "4" }) }),
            /* @__PURE__ */ o("span", { className: "min-w-0 whitespace-nowrap overflow-hidden text-ellipsis", children: e }),
            n && /* @__PURE__ */ o(
              "button",
              {
                type: "button",
                className: `${jt} underline underline-offset-2`,
                onClick: (g) => {
                  g.stopPropagation(), n.onClick(), s == null || s();
                },
                children: n.label
              }
            ),
            z && /* @__PURE__ */ o(
              "button",
              {
                type: "button",
                "aria-label": "Dismiss notification",
                className: jt,
                onClick: (g) => {
                  g.stopPropagation(), s == null || s();
                },
                children: /* @__PURE__ */ o(q, { name: "X", size: "3" })
              }
            )
          ]
        }
      )
    }
  );
}
const go = 5e3, wt = [];
let et = wt, xo = 0;
const pt = /* @__PURE__ */ new Set();
function fr(e) {
  et = e, pt.forEach((t) => t());
}
function pr(e) {
  return pt.add(e), () => {
    pt.delete(e);
  };
}
const br = () => et, hr = () => wt;
function Be(e, t = {}) {
  const { id: r = `toast-${++xo}`, duration: n = go, ...a } = t;
  return fr([...et.filter((s) => s.id !== r), { id: r, message: e, duration: n, ...a }]), r;
}
function kt(e) {
  fr(e === void 0 ? wt : et.filter((t) => t.id !== e));
}
const vo = Object.assign(Be, {
  success: (e, t) => Be(e, { ...t, variant: "success" }),
  warning: (e, t) => Be(e, { ...t, variant: "warning" }),
  error: (e, t) => Be(e, { ...t, variant: "error" }),
  info: (e, t) => Be(e, { ...t, variant: "info" }),
  dismiss: kt
});
function os() {
  return { toasts: Ut(pr, br, hr), toast: vo, dismiss: kt };
}
function as({ toasts: e, onDismiss: t }) {
  const r = Ut(pr, br, hr), n = e !== void 0, a = n ? e : r, s = n ? t : kt;
  return /* @__PURE__ */ o(
    "div",
    {
      "aria-live": "polite",
      className: "fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2",
      style: { zIndex: "var(--z-index-popover)" },
      children: a.map((i) => /* @__PURE__ */ o(
        ho,
        {
          variant: i.variant,
          action: i.action,
          duration: i.duration,
          onClick: s ? () => s(i.id) : void 0,
          onDismiss: s ? () => s(i.id) : void 0,
          children: i.message
        },
        i.id
      ))
    }
  );
}
function ss({ isOpen: e, onClose: t, ariaLabel: r, closeLabel: n = "Close", children: a }) {
  const [s, i] = V(e);
  G(() => {
    e && i(!0);
  }, [e]);
  const l = s && !e, c = Z(null), d = Z(null), u = e && s;
  return G(() => {
    var m;
    if (u)
      return d.current = document.activeElement, (m = c.current) == null || m.focus(), () => {
        var f;
        (f = d.current) == null || f.focus(), d.current = null;
      };
  }, [u]), cr(c, u), G(() => {
    if (!e) return;
    const m = (f) => {
      f.key === "Escape" && t();
    };
    return document.addEventListener("keydown", m), () => document.removeEventListener("keydown", m);
  }, [e, t]), G(() => (e ? document.body.style.overflow = "hidden" : document.body.style.overflow = "unset", () => {
    document.body.style.overflow = "unset";
  }), [e]), s ? /* @__PURE__ */ y(ge, { children: [
    /* @__PURE__ */ o(
      "div",
      {
        className: `fixed inset-0 bg-[var(--surface-overlay)] ${l ? "animate-out fade-out fill-mode-forwards" : "animate-in fade-in"}`,
        style: { zIndex: "var(--z-index-overlay)", animationDuration: "var(--duration-slow)" },
        onClick: t,
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ o(
      "div",
      {
        ref: c,
        tabIndex: -1,
        role: "dialog",
        "aria-modal": "true",
        "aria-label": r,
        className: `focus:outline-none fixed bottom-0 inset-x-0 mx-auto w-[min(540px,100%)] plate-round-lg-top bg-[var(--surface-container-stroke)] pt-px px-px ${l ? "animate-out slide-out-to-bottom fill-mode-forwards" : "animate-in slide-in-from-bottom"}`,
        style: { zIndex: "var(--z-index-modal)", animationDuration: "var(--duration-slow)" },
        onAnimationEnd: () => {
          l && i(!1);
        },
        children: /* @__PURE__ */ y("div", { className: "plate-round-lg-top bg-[var(--surface-card)] px-5 pb-6 pt-1 flex flex-col items-center gap-3 max-h-[70vh]", children: [
          /* @__PURE__ */ y("div", { className: "relative flex h-touch w-full shrink-0 items-center justify-center", children: [
            /* @__PURE__ */ o("div", { className: "w-9 h-1 bg-[var(--surface-container-stroke)]", "aria-hidden": "true" }),
            /* @__PURE__ */ o(
              "button",
              {
                type: "button",
                onClick: t,
                "aria-label": n,
                className: "absolute right-0 top-0 inline-flex h-touch w-touch items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors [transition-duration:var(--duration-fast)] focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]",
                children: /* @__PURE__ */ o(q, { name: "X", size: "4" })
              }
            )
          ] }),
          /* @__PURE__ */ o("div", { className: "w-full overflow-y-auto", tabIndex: 0, children: a })
        ] })
      }
    )
  ] }) : null;
}
function is() {
  const { resolvedTheme: e, setTheme: t } = Rr(), [r, n] = V(!1);
  if (G(() => {
    n(!0);
  }, []), !r)
    return /* @__PURE__ */ y("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ o("div", { className: "w-11 h-6 rounded-none bg-[var(--field-border)]" }),
      /* @__PURE__ */ o("span", { className: "text-sm font-mono text-[var(--text-secondary)]", children: "Theme" })
    ] });
  const a = e === "dark", s = a ? "Dark" : "Light", i = a ? "light" : "dark";
  return /* @__PURE__ */ y("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ o(
      dr,
      {
        checked: a,
        onCheckedChange: () => {
          t(i);
        },
        size: "sm",
        icon: a ? /* @__PURE__ */ o(q, { name: "Moon", size: "3", className: "text-[var(--border-focus)]" }) : /* @__PURE__ */ o(q, { name: "Sun", size: "3", className: "text-[var(--text-secondary)]" }),
        "aria-label": `Switch to ${i} theme`
      }
    ),
    /* @__PURE__ */ o("span", { className: "text-sm font-mono text-[var(--text-primary)]", children: s })
  ] });
}
const gr = Ue(null);
function Nt(e) {
  const t = Ae(gr);
  if (!t)
    throw new Error(`[@scorp-ds/components] ${e} must be used inside <Tabs>.`);
  return t;
}
function ls({
  value: e,
  defaultValue: t,
  onValueChange: r,
  children: n,
  className: a
}) {
  const s = e !== void 0, [i, l] = V(() => t ?? ""), c = s ? e : i, d = ce().replace(/:/g, ""), u = Z([]), m = he(
    (h) => {
      s || l(h), r == null || r(h);
    },
    [s, r]
  ), f = Le(
    () => ({
      value: c,
      onValueChange: m,
      baseId: d,
      listValuesRef: u,
      isControlled: s
    }),
    [c, m, d, s]
  );
  return /* @__PURE__ */ o(gr.Provider, { value: f, children: /* @__PURE__ */ o("div", { className: S("w-full", a), children: n }) });
}
function yo(e) {
  const t = [];
  return ze.Children.forEach(e, (r) => {
    if (!ze.isValidElement(r)) return;
    if (r.type.displayName === "TabsTrigger") {
      const a = r.props.value;
      typeof a == "string" && t.push(a);
    }
  }), t;
}
function wo({
  children: e,
  className: t,
  "aria-label": r,
  "aria-labelledby": n
}) {
  const { value: a, isControlled: s, onValueChange: i, listValuesRef: l } = Nt("TabsList"), c = yo(e);
  l.current = c;
  const d = c.join("\0");
  return Pe(() => {
    const u = l.current;
    s || u.length === 0 || u.includes(a) || i(u[0]);
  }, [s, l, i, a, d]), /* @__PURE__ */ o(
    "div",
    {
      role: "tablist",
      "aria-label": r,
      "aria-labelledby": n,
      className: S(
        "flex flex-wrap gap-0 border-b-[length:var(--border-width-hairline)] border-solid border-[var(--surface-container-stroke)]",
        t
      ),
      children: e
    }
  );
}
wo.displayName = "TabsList";
const ko = re(function({ value: t, children: r, className: n, disabled: a, onKeyDown: s, onClick: i, type: l = "button", ...c }, d) {
  const { value: u, onValueChange: m, baseId: f, listValuesRef: h } = Nt("TabsTrigger"), b = u === t, p = `${f}-tab-${t}`, x = `${f}-panel-${t}`, z = (T) => {
    m(T), requestAnimationFrame(() => {
      var v;
      (v = document.getElementById(`${f}-tab-${T}`)) == null || v.focus();
    });
  }, g = (T) => {
    const v = document.getElementById(`${f}-tab-${T}`);
    return v == null || !v.disabled;
  }, $ = (T) => {
    const v = h.current, O = v.indexOf(t);
    if (O < 0) return null;
    for (let C = 1; C <= v.length; C += 1) {
      const te = v[((O + T * C) % v.length + v.length) % v.length];
      if (te !== t && g(te)) return te;
    }
    return null;
  }, k = (T, v) => {
    const O = h.current;
    for (let C = T; C >= 0 && C < O.length; C += v)
      if (g(O[C])) return O[C];
    return null;
  }, N = (T) => {
    const v = $(T);
    v && z(v);
  }, _ = (T) => {
    if (s == null || s(T), T.defaultPrevented || a) return;
    const v = h.current;
    switch (T.key) {
      case "ArrowRight":
      case "ArrowDown":
        T.preventDefault(), N(1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        T.preventDefault(), N(-1);
        break;
      case "Home": {
        T.preventDefault();
        const O = k(0, 1);
        O && z(O);
        break;
      }
      case "End": {
        T.preventDefault();
        const O = k(v.length - 1, -1);
        O && z(O);
        break;
      }
    }
  };
  return /* @__PURE__ */ o(
    "button",
    {
      ref: d,
      type: l,
      role: "tab",
      id: p,
      "aria-selected": b,
      "aria-controls": x,
      tabIndex: b ? 0 : -1,
      disabled: a,
      className: S(
        "-mb-px rounded-none border-b-2 px-4 py-2 font-mono text-sm transition-colors [transition-duration:var(--duration-normal)]",
        // TAP TARGET: the trigger box is ~37px tall and its underline sets the
        // strip's baseline, so growing it with padding would shift that line.
        // A 44px-tall pseudo-element centered on the trigger raises the target
        // without moving a pixel (the Toast inline-button recipe).
        "relative before:content-[''] before:absolute before:inset-x-0 before:top-1/2 before:-translate-y-1/2 before:h-touch",
        // FOCUS: inset box-shadow ring, the system recipe (outlines are
        // swallowed by the plate clip elsewhere, so every control uses inset).
        "focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]",
        b ? "border-[var(--button-primary-background)] bg-transparent text-[var(--text-primary)]" : "border-transparent text-secondary-700 hover:text-[var(--text-primary)] dark:text-secondary-300",
        a && "cursor-not-allowed opacity-50",
        n
      ),
      onClick: (T) => {
        i == null || i(T), !T.defaultPrevented && !a && m(t);
      },
      onKeyDown: _,
      ...c,
      children: r
    }
  );
});
ko.displayName = "TabsTrigger";
function No({ value: e, children: t, className: r, forceMount: n = !1 }) {
  const { value: a, baseId: s } = Nt("TabsContent"), i = a === e, l = `${s}-tab-${e}`, c = `${s}-panel-${e}`;
  return !n && !i ? null : !i && n ? /* @__PURE__ */ o(
    "div",
    {
      id: c,
      role: "tabpanel",
      "aria-labelledby": l,
      hidden: !0,
      className: S("p-4 font-mono outline-none", r),
      children: t
    }
  ) : /* @__PURE__ */ o(
    "div",
    {
      id: c,
      role: "tabpanel",
      "aria-labelledby": l,
      tabIndex: 0,
      className: S(
        "p-4 font-mono outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--focus-offset-color)]",
        r
      ),
      children: t
    }
  );
}
No.displayName = "TabsContent";
const xr = {
  compact: "px-3 py-2",
  // 12 / 8
  comfortable: "px-4 py-3",
  // 16 / 12
  spacious: "px-5 py-4"
  // 20 / 16
}, $t = Ue("compact"), $o = re(function({ className: t, striped: r, bordered: n, density: a = "compact", children: s, ...i }, l) {
  const c = /* @__PURE__ */ o($t.Provider, { value: a, children: /* @__PURE__ */ o(
    "table",
    {
      ref: l,
      className: S(
        "w-full border-collapse font-mono text-sm text-[var(--text-primary)]",
        r && "[&_tbody_tr:nth-child(even)]:bg-[var(--surface-subtle)]",
        t
      ),
      ...i,
      children: s
    }
  ) });
  return n ? /* @__PURE__ */ o("div", { className: "plate-round-lg p-px bg-[var(--surface-container-stroke)]", children: /* @__PURE__ */ o("div", { className: "plate-round-lg bg-[var(--surface-card)]", children: c }) }) : c;
});
$o.displayName = "Table";
const So = re(function({ className: t, ...r }, n) {
  return /* @__PURE__ */ o(
    "thead",
    {
      ref: n,
      className: S(
        "border-b-[length:var(--border-width-hairline)] border-solid border-[var(--surface-container-stroke)] bg-[var(--surface-subtle)]",
        t
      ),
      ...r
    }
  );
});
So.displayName = "TableHeader";
const zo = re(function({ className: t, ...r }, n) {
  return /* @__PURE__ */ o("tbody", { ref: n, className: S(t), ...r });
});
zo.displayName = "TableBody";
const _o = re(function({ className: t, ...r }, n) {
  return /* @__PURE__ */ o(
    "tfoot",
    {
      ref: n,
      className: S(
        "border-t-[length:var(--border-width-hairline)] border-solid border-[var(--surface-container-stroke)] bg-[var(--surface-subtle)]",
        t
      ),
      ...r
    }
  );
});
_o.displayName = "TableFooter";
const Io = re(function({ className: t, ...r }, n) {
  return /* @__PURE__ */ o(
    "tr",
    {
      ref: n,
      className: S(
        "border-b-[length:var(--border-width-hairline)] border-solid border-[var(--surface-container-stroke)] transition-colors [transition-duration:var(--duration-normal)]",
        t
      ),
      ...r
    }
  );
});
Io.displayName = "TableRow";
const To = re(function({ className: t, scope: r = "col", ...n }, a) {
  const s = Ae($t);
  return /* @__PURE__ */ o(
    "th",
    {
      ref: a,
      scope: r,
      className: S(
        xr[s],
        "text-left font-bold text-[var(--text-primary)]",
        t
      ),
      ...n
    }
  );
});
To.displayName = "TableHead";
const Eo = re(function({ className: t, ...r }, n) {
  const a = Ae($t);
  return /* @__PURE__ */ o(
    "td",
    {
      ref: n,
      className: S(
        xr[a],
        "align-middle text-secondary-800 dark:text-secondary-200",
        t
      ),
      ...r
    }
  );
});
Eo.displayName = "TableCell";
const Ao = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, Qe = (e) => e === "top" || e === "bottom";
function st(e, t, r, n, a, s) {
  switch (e) {
    case "top":
      return t.top - a - s;
    case "bottom":
      return n - (t.top + t.height) - a - s;
    case "left":
      return t.left - a - s;
    case "right":
      return r - (t.left + t.width) - a - s;
  }
}
function Co(e, t, r, n, a) {
  switch (e) {
    case "top":
      return t.top - a - n;
    case "bottom":
      return t.top + t.height + a;
    case "left":
      return t.left - a - r;
    case "right":
      return t.left + t.width + a;
  }
}
function Mo(e, t, r, n, a) {
  return Qe(e) ? t === "start" ? r.left : t === "end" ? r.left + r.width - n : r.left + r.width / 2 - n / 2 : t === "start" ? r.top : t === "end" ? r.top + r.height - a : r.top + r.height / 2 - a / 2;
}
const Bt = (e, t, r) => r < t ? t : Math.min(Math.max(e, t), r);
function Ro({
  anchor: e,
  floating: t,
  side: r = "bottom",
  align: n = "start",
  offset: a = 8,
  padding: s = 8,
  viewport: i,
  flip: l = !0
}) {
  const c = (i == null ? void 0 : i.width) ?? (typeof window < "u" ? window.innerWidth : 0), d = (i == null ? void 0 : i.height) ?? (typeof window < "u" ? window.innerHeight : 0), { width: u, height: m } = t;
  let f = r;
  const h = Qe(r) ? m : u, b = st(r, e, c, d, a, s);
  if (l && b < h) {
    const $ = Ao[r];
    st($, e, c, d, a, s) > b && (f = $);
  }
  const p = Co(f, e, u, m, a), x = Mo(f, n, e, u, m), z = Qe(f) ? p : Bt(x, s, d - m - s), g = Qe(f) ? Bt(x, s, c - u - s) : p;
  return {
    top: z,
    left: g,
    side: f,
    align: n,
    available: Math.max(0, st(f, e, c, d, a, s))
  };
}
const Lo = typeof window < "u" ? Pe : G;
function Po({
  open: e,
  anchorRef: t,
  floatingRef: r,
  side: n = "bottom",
  align: a = "start",
  offset: s = 8,
  padding: i = 8
}) {
  const [l, c] = V(null), d = he(() => {
    const u = t.current, m = r.current;
    if (!u || !m) return;
    const f = u.getBoundingClientRect(), h = m.getBoundingClientRect(), b = Ro({
      anchor: { top: f.top, left: f.left, width: f.width, height: f.height },
      floating: { width: h.width, height: h.height },
      side: n,
      align: a,
      offset: s,
      padding: i
    });
    c(
      (p) => p && p.top === b.top && p.left === b.left && p.side === b.side && p.available === b.available && p.anchorWidth === f.width ? p : { ...b, anchorWidth: f.width }
    );
  }, [t, r, n, a, s, i]);
  return Lo(() => {
    if (!e) {
      c(null);
      return;
    }
    d(), window.addEventListener("scroll", d, !0), window.addEventListener("resize", d);
    let u;
    return typeof ResizeObserver < "u" && (u = new ResizeObserver(() => d()), t.current && u.observe(t.current), r.current && u.observe(r.current)), () => {
      window.removeEventListener("scroll", d, !0), window.removeEventListener("resize", d), u == null || u.disconnect();
    };
  }, [e, d]), { position: l, update: d };
}
function St({
  value: e,
  defaultValue: t,
  onChange: r
}) {
  const [n, a] = V(t), s = e !== void 0, i = s ? e : n, l = Z(r);
  l.current = r;
  const c = Z(i);
  c.current = i;
  const d = he(
    (u) => {
      var m;
      Object.is(u, c.current) || (s || a(u), (m = l.current) == null || m.call(l, u));
    },
    [s]
  );
  return [i, d];
}
const Do = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function vr({
  open: e,
  defaultOpen: t = !1,
  onOpenChange: r,
  trigger: n,
  anchorRef: a,
  children: s,
  side: i = "bottom",
  align: l = "start",
  offset: c = 8,
  closeOnOutsideClick: d = !0,
  closeOnEscape: u = !0,
  autoFocus: m = !0,
  returnFocus: f = !0,
  matchAnchorWidth: h = !1,
  role: b = "dialog",
  "aria-label": p,
  "aria-labelledby": x,
  id: z,
  className: g,
  contentClassName: $,
  triggerWrapperClassName: k,
  portal: N = !1
}) {
  const [_, T] = St({
    value: e,
    defaultValue: t,
    onChange: r
  }), v = ce(), O = z ?? `${v}-popover`, C = Z(null), te = Z(null), Q = Z("programmatic"), oe = Le(
    () => ({
      get current() {
        var I;
        return (a == null ? void 0 : a.current) ?? ((I = C.current) == null ? void 0 : I.firstElementChild) ?? C.current;
      }
    }),
    [a]
  ), { position: W } = Po({ open: _, anchorRef: oe, floatingRef: te, side: i, align: l, offset: c }), K = (I) => {
    Q.current = I, T(!1);
  }, L = (I) => {
    var D, X, Y;
    return I != null && (((D = te.current) == null ? void 0 : D.contains(I)) || ((X = C.current) == null ? void 0 : X.contains(I)) || ((Y = a == null ? void 0 : a.current) == null ? void 0 : Y.contains(I)) || !1);
  };
  G(() => {
    if (!_ || !d) return;
    const I = (D) => {
      L(D.target) || K("outside");
    };
    return document.addEventListener("mousedown", I), () => document.removeEventListener("mousedown", I);
  }, [_, d]), G(() => {
    if (!_ || !u) return;
    const I = (D) => {
      if (D.key !== "Escape") return;
      const X = D.target;
      (L(X) || X === document.body || X === document.documentElement) && K("escape");
    };
    return document.addEventListener("keydown", I), () => document.removeEventListener("keydown", I);
  }, [_, u]);
  const E = Z(_);
  G(() => {
    var I;
    if (_ && !E.current && (Q.current = "programmatic", m && te.current && (te.current.querySelector(Do) ?? te.current).focus({ preventScroll: !0 })), !_ && E.current && f) {
      const D = Q.current, X = document.activeElement, Y = X == null || X === document.body;
      D !== "outside" && D !== "blur" && (Y || L(X)) && ((I = oe.current) == null || I.focus({ preventScroll: !0 }));
    }
    E.current = _;
  }, [_]);
  const P = (I) => {
    const D = I.relatedTarget;
    D && !L(D) && K("blur");
  }, H = n && He(n) ? bt(
    n,
    {
      "aria-expanded": _,
      "aria-controls": _ ? O : void 0,
      "aria-haspopup": b === "dialog" ? "dialog" : void 0,
      onClick: (I) => {
        var D, X;
        (X = (D = n.props).onClick) == null || X.call(D, I), !I.defaultPrevented && (_ ? K("trigger") : T(!0));
      }
    }
  ) : null, w = (I) => N && typeof document < "u" ? Pr(I, document.body) : I, U = {
    position: "fixed",
    top: (W == null ? void 0 : W.top) ?? 0,
    left: (W == null ? void 0 : W.left) ?? 0,
    zIndex: "var(--z-index-popover)",
    minWidth: h && W ? W.anchorWidth : void 0,
    animationDuration: "var(--duration-fast)",
    // Exposed so content can cap its height to the room on the chosen side
    "--popover-available-height": W ? `${W.available}px` : void 0
  };
  return /* @__PURE__ */ y(ge, { children: [
    H && /* @__PURE__ */ o("span", { ref: C, className: S("inline-flex", k), children: H }),
    _ && w(
      /* @__PURE__ */ o(
        "div",
        {
          ref: te,
          id: O,
          role: b ?? void 0,
          "aria-label": b ? p : void 0,
          "aria-labelledby": b ? x : void 0,
          tabIndex: -1,
          "data-side": (W == null ? void 0 : W.side) ?? i,
          "data-align": l,
          onBlur: P,
          style: U,
          className: S(
            "w-max max-w-[calc(100vw-1rem)] plate-round p-px bg-[var(--surface-container-stroke)] focus:outline-none",
            "animate-in fade-in motion-reduce:animate-none",
            // Measured before it is shown, so it never flashes at 0,0
            W ? "opacity-100" : "opacity-0",
            g
          ),
          children: /* @__PURE__ */ o(
            "div",
            {
              className: S(
                "plate-round bg-[var(--surface-card)] p-4 font-mono text-sm text-[var(--text-primary)]",
                $
              ),
              children: s
            }
          )
        }
      )
    )
  ] });
}
vr.displayName = "Popover";
const Oo = (e, t) => e.label.toLowerCase().includes(t.trim().toLowerCase()), jo = re(function({
  options: t,
  value: r,
  defaultValue: n = null,
  onValueChange: a,
  onInputChange: s,
  filter: i = Oo,
  emptyText: l = "No matches",
  size: c = "md",
  label: d,
  helperText: u,
  errorMessage: m,
  error: f = !1,
  openOnFocus: h = !1,
  portal: b = !1,
  disabled: p = !1,
  placeholder: x,
  name: z,
  id: g,
  className: $,
  "aria-describedby": k,
  "aria-label": N,
  onKeyDown: _,
  onFocus: T,
  onBlur: v,
  ...O
}, C) {
  const te = se(c, "Combobox"), Q = De({ error: f, helperText: u, errorMessage: m, describedBy: k }), oe = ce(), W = g ?? `${oe}-input`, K = `${oe}-listbox`, L = `${oe}-label`, E = `${oe}-empty`, P = (A) => `${oe}-option-${A}`, [H, w] = St({
    value: r,
    defaultValue: n
  }), U = t.find((A) => A.value === H) ?? null, [I, D] = V(!1), [X, Y] = V((U == null ? void 0 : U.label) ?? ""), [ee, ue] = V(!1), [ie, J] = V(-1), fe = Z(null), xe = Z(null), ve = Z(null);
  G(() => {
    I || Y((U == null ? void 0 : U.label) ?? "");
  }, [U == null ? void 0 : U.label, I]);
  const B = Le(
    () => ee && X !== "" ? t.filter((A) => i(A, X)) : t,
    [ee, X, t, i]
  ), j = B.map((A, ne) => A.disabled ? -1 : ne).filter((A) => A >= 0), le = j[0] ?? -1, ye = j[j.length - 1] ?? -1, pe = (A, ne) => {
    if (j.length === 0) return -1;
    const be = j.indexOf(A);
    if (be === -1) return ne === 1 ? le : ye;
    const Ie = (be + ne + j.length) % j.length;
    return j[Ie];
  }, de = (A) => {
    if (p) return;
    D(!0);
    const ne = U ? B.findIndex((be) => be.value === U.value && !be.disabled) : -1;
    J(A === "selected" ? ne >= 0 ? ne : le : A === "first" ? le : A === "last" ? ye : -1);
  }, me = () => {
    D(!1), ue(!1), J(-1), Y((U == null ? void 0 : U.label) ?? "");
  }, Me = (A) => {
    w((A == null ? void 0 : A.value) ?? null), ((A == null ? void 0 : A.value) ?? null) !== H && (a == null || a((A == null ? void 0 : A.value) ?? null, A)), Y((A == null ? void 0 : A.label) ?? ""), ue(!1), D(!1), J(-1);
  };
  G(() => {
    var ne;
    if (!I || ie < 0) return;
    const A = document.getElementById(P(ie));
    (ne = A == null ? void 0 : A.scrollIntoView) == null || ne.call(A, { block: "nearest" });
  }, [I, ie]);
  const tt = (A) => {
    const ne = A.target.value;
    if (Y(ne), ue(!0), s == null || s(ne), !p) {
      D(!0);
      const be = ne === "" ? t : t.filter((Ie) => i(Ie, ne));
      J(be.findIndex((Ie) => !Ie.disabled));
    }
  }, _r = (A) => {
    if (_ == null || _(A), !(A.defaultPrevented || p))
      switch (A.key) {
        case "ArrowDown":
          A.preventDefault(), I ? J((ne) => pe(ne, 1)) : de(A.altKey ? "none" : "selected");
          break;
        case "ArrowUp":
          A.preventDefault(), I ? J((ne) => pe(ne, -1)) : de(U ? "selected" : "last");
          break;
        case "Home":
          I && j.length && (A.preventDefault(), J(le));
          break;
        case "End":
          I && j.length && (A.preventDefault(), J(ye));
          break;
        case "Enter":
          I && ie >= 0 && B[ie] && !B[ie].disabled && (A.preventDefault(), Me(B[ie]));
          break;
        case "Escape":
          I ? (A.preventDefault(), me()) : (X !== "" || H != null) && (A.preventDefault(), Me(null));
          break;
        case "Tab":
          I && me();
          break;
      }
  }, Ir = (A) => {
    xe.current = A, typeof C == "function" ? C(A) : C && (C.current = A);
  }, _t = {
    sm: { input: "h-control-sm pl-3 pr-9", icon: "right-3" },
    md: { input: "h-control-md pl-4 pr-10", icon: "right-4" },
    lg: { input: "h-control-lg pl-5 pr-11", icon: "right-5" }
  }[te], rt = Q.invalid, Tr = rt ? "bg-[var(--field-border-error)] focus-within:!bg-[var(--field-border-focus)]" : "bg-[var(--field-border)] hover:bg-[var(--field-border-hover)] focus-within:!bg-[var(--field-border-focus)]", qe = d != null && d !== "", Er = I && ie >= 0 && B[ie] ? P(ie) : void 0;
  return /* @__PURE__ */ y("div", { className: S("w-full", $), children: [
    /* @__PURE__ */ y("div", { className: "w-full space-y-1", children: [
      qe && /* @__PURE__ */ o(
        "label",
        {
          id: L,
          htmlFor: W,
          className: "block font-mono text-sm text-secondary-800 dark:text-secondary-200",
          children: d
        }
      ),
      /* @__PURE__ */ y(
        "div",
        {
          ref: fe,
          className: S(
            "relative w-full plate-round p-px transition-colors [transition-duration:var(--duration-fast)]",
            Tr,
            p && "opacity-50"
          ),
          children: [
            /* @__PURE__ */ o(
              "input",
              {
                ...O,
                ref: Ir,
                id: W,
                type: "text",
                role: "combobox",
                autoComplete: "off",
                "aria-autocomplete": "list",
                "aria-expanded": I,
                "aria-controls": I ? B.length > 0 ? K : E : void 0,
                "aria-activedescendant": Er,
                "aria-invalid": rt || void 0,
                "aria-describedby": Q.describedBy,
                "aria-label": qe ? void 0 : N,
                disabled: p,
                placeholder: x,
                value: X,
                onChange: tt,
                onKeyDown: _r,
                onClick: () => {
                  I || de("selected");
                },
                onFocus: (A) => {
                  T == null || T(A), h && !I && de("selected");
                },
                onBlur: (A) => {
                  v == null || v(A), I && me();
                },
                className: S(
                  "w-full plate-round font-mono text-sm",
                  "transition-colors [transition-duration:var(--duration-fast)]",
                  "placeholder:text-[var(--field-placeholder)] focus:outline-none disabled:cursor-not-allowed",
                  rt ? "bg-[var(--field-background-error)] text-[var(--text-primary)]" : "bg-[var(--field-background)] text-[var(--text-primary)]",
                  _t.input
                )
              }
            ),
            /* @__PURE__ */ o(
              "span",
              {
                "aria-hidden": "true",
                className: S(
                  "pointer-events-none absolute top-1/2 -translate-y-1/2 inline-flex text-[var(--text-secondary)]",
                  "transition-transform [transition-duration:var(--duration-normal)] motion-reduce:transition-none",
                  I && "rotate-180",
                  _t.icon
                ),
                children: /* @__PURE__ */ o(q, { name: "ChevronDown" })
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ o(Oe, { ...Q.message })
    ] }),
    z != null && /* @__PURE__ */ o("input", { type: "hidden", name: z, value: H ?? "" }),
    /* @__PURE__ */ o(
      vr,
      {
        open: I,
        onOpenChange: (A) => {
          A || me();
        },
        anchorRef: fe,
        role: null,
        autoFocus: !1,
        returnFocus: !1,
        closeOnEscape: !1,
        matchAnchorWidth: !0,
        portal: b,
        offset: 4,
        contentClassName: "p-0",
        children: B.length > 0 ? /* @__PURE__ */ o(
          "ul",
          {
            ref: ve,
            id: K,
            role: "listbox",
            "aria-labelledby": qe ? L : void 0,
            "aria-label": qe ? void 0 : N,
            className: "max-h-[min(var(--control-menu-max-height),var(--popover-available-height,var(--control-menu-max-height)))] overflow-y-auto py-1",
            children: B.map((A, ne) => {
              const be = A.value === H, Ie = ne === ie;
              return /* @__PURE__ */ y(
                "li",
                {
                  id: P(ne),
                  role: "option",
                  "aria-selected": be,
                  "aria-disabled": A.disabled || void 0,
                  onMouseDown: (Ar) => Ar.preventDefault(),
                  onMouseMove: () => {
                    !A.disabled && ie !== ne && J(ne);
                  },
                  onClick: () => {
                    A.disabled || Me(A);
                  },
                  className: S(
                    "flex min-h-touch items-center gap-2 px-4 py-2 font-mono text-sm",
                    A.disabled ? "cursor-not-allowed text-[var(--text-disabled)]" : "cursor-pointer text-[var(--text-primary)]",
                    Ie && !A.disabled && "bg-[var(--surface-subtle)]"
                  ),
                  children: [
                    /* @__PURE__ */ o("span", { className: "min-w-0 flex-1 truncate", children: A.label }),
                    be && /* @__PURE__ */ o(q, { name: "Check", className: "shrink-0 text-[var(--border-focus)]" })
                  ]
                },
                A.value
              );
            })
          }
        ) : /* @__PURE__ */ o("div", { id: E, role: "status", className: "px-4 py-3 font-mono text-sm text-[var(--text-secondary)]", children: l })
      }
    )
  ] });
});
jo.displayName = "Combobox";
const Bo = {
  primary: "bg-primary-500 dark:bg-primary-400",
  success: "bg-success-600 dark:bg-success-400",
  warning: "bg-warning-600 dark:bg-warning-400",
  error: "bg-error-600 dark:bg-error-400"
}, Fo = { sm: "h-2", md: "h-3", lg: "h-4" }, Ft = 4;
function Vo() {
  if (typeof window > "u" || typeof getComputedStyle != "function") return 120;
  const e = getComputedStyle(document.documentElement).getPropertyValue("--duration-fast").trim(), t = e.endsWith("ms") ? parseFloat(e) : e.endsWith("s") ? parseFloat(e) * 1e3 : NaN;
  return Number.isFinite(t) && t > 0 ? t : 120;
}
function Go() {
  const e = "(prefers-reduced-motion: reduce)", [t, r] = V(
    () => typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia(e).matches
  );
  return G(() => {
    var s;
    if (typeof window.matchMedia != "function") return;
    const n = window.matchMedia(e), a = () => r(n.matches);
    return (s = n.addEventListener) == null || s.call(n, "change", a), () => {
      var i;
      return (i = n.removeEventListener) == null ? void 0 : i.call(n, "change", a);
    };
  }, []), t;
}
function Ho({
  value: e,
  max: t = 100,
  label: r,
  showLabel: n = !0,
  showValue: a = !0,
  size: s = "md",
  variant: i = "primary",
  segments: l = 20,
  className: c
}) {
  const d = se(s, "ProgressBar"), u = ce(), m = e == null || Number.isNaN(e), f = t > 0 ? t : 100, h = m ? 0 : Math.min(Math.max(e, 0), f), b = Math.round(h / f * 100), p = Math.floor(h / f * l), x = Go(), [z, g] = V(0);
  G(() => {
    if (!m || x) return;
    const k = window.setInterval(() => g((N) => (N + 1) % (l + Ft)), Vo());
    return () => window.clearInterval(k);
  }, [m, x, l]);
  const $ = (k) => m ? x ? !0 : k > z - Ft - 1 && k <= z - 1 : k < p;
  return /* @__PURE__ */ y("div", { className: S("w-full space-y-1.5 font-mono", c), children: [
    n && /* @__PURE__ */ y("div", { className: "flex items-baseline justify-between gap-3 text-sm", children: [
      /* @__PURE__ */ o("span", { id: u, className: "min-w-0 truncate text-[var(--text-primary)]", children: r }),
      a && !m && /* @__PURE__ */ y("span", { className: "shrink-0 tabular-nums text-[var(--text-secondary)]", "aria-hidden": "true", children: [
        b,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ o(
      "div",
      {
        role: "progressbar",
        "aria-labelledby": n ? u : void 0,
        "aria-label": n ? void 0 : r,
        "aria-valuemin": 0,
        "aria-valuemax": f,
        "aria-valuenow": m ? void 0 : h,
        "aria-valuetext": m ? void 0 : `${b}%`,
        "data-state": m ? "indeterminate" : h >= f ? "complete" : "loading",
        className: "bg-[var(--border-default)] p-px",
        children: /* @__PURE__ */ o(
          "div",
          {
            className: S("flex gap-0.5 bg-[var(--surface-subtle)] p-0.5", Fo[d]),
            "aria-hidden": "true",
            children: Array.from({ length: l }, (k, N) => /* @__PURE__ */ o(
              "span",
              {
                "data-filled": $(N) || void 0,
                className: S(
                  "h-full flex-1",
                  $(N) ? Bo[i] : "bg-[var(--surface-muted)]",
                  m && x && "opacity-50"
                )
              },
              N
            ))
          }
        )
      }
    )
  ] });
}
Ho.displayName = "ProgressBar";
const Uo = { sm: "size-control-sm", md: "size-control-md", lg: "size-control-lg" }, Wo = { animationTimingFunction: "steps(4, jump-none)" };
function Ko({ variant: e = "text", lines: t = 1, size: r = "md", animated: n = !0, className: a }) {
  const s = se(r, "Skeleton"), i = n ? "animate-pulse motion-reduce:animate-none" : "", l = n ? Wo : void 0;
  if (e === "text") {
    const c = Math.max(1, Math.floor(t));
    return /* @__PURE__ */ o("div", { "aria-hidden": "true", "data-skeleton": "text", className: S("flex w-full flex-col gap-2", a), children: Array.from({ length: c }, (d, u) => /* @__PURE__ */ o(
      "span",
      {
        style: l,
        className: S(
          "block h-3 bg-[var(--surface-muted)]",
          c > 1 && u === c - 1 ? "w-3/5" : "w-full",
          i
        )
      },
      u
    )) });
  }
  return /* @__PURE__ */ o(
    "span",
    {
      "aria-hidden": "true",
      "data-skeleton": e,
      style: l,
      className: S(
        "block shrink-0 plate-round bg-[var(--surface-muted)]",
        e === "avatar" ? Uo[s] : "h-24 w-full",
        i,
        a
      )
    }
  );
}
Ko.displayName = "Skeleton";
const qo = {
  sm: { root: "gap-3 px-4 py-6", icon: "6", plate: "p-2", title: "text-sm", description: "text-xs", button: "sm" },
  md: { root: "gap-4 px-6 py-12", icon: "8", plate: "p-3", title: "text-lg", description: "text-sm", button: "md" }
};
function Xo({
  icon: e = "Archive",
  title: t,
  description: r,
  primaryAction: n,
  secondaryAction: a,
  size: s = "md",
  titleAs: i = "h2",
  children: l,
  className: c
}) {
  const d = qo[s], u = (m, f) => /* @__PURE__ */ o(
    We,
    {
      variant: f,
      size: d.button,
      onClick: m.onClick,
      href: m.href,
      iconLeft: m.icon ? /* @__PURE__ */ o(q, { name: m.icon }) : void 0,
      children: m.label
    }
  );
  return /* @__PURE__ */ y("div", { className: S("flex flex-col items-center text-center font-mono", d.root, c), children: [
    e && /* @__PURE__ */ o("span", { className: S("inline-flex plate-round bg-[var(--surface-subtle)] text-[var(--text-secondary)]", d.plate), children: /* @__PURE__ */ o(q, { name: e, size: d.icon }) }),
    /* @__PURE__ */ y("div", { className: "flex max-w-prose flex-col gap-1", children: [
      /* @__PURE__ */ o(i, { className: S("font-medium text-[var(--text-primary)]", d.title), children: t }),
      r && /* @__PURE__ */ o("p", { className: S("text-[var(--text-secondary)]", d.description), children: r })
    ] }),
    (n || a) && /* @__PURE__ */ y("div", { className: "flex flex-wrap items-center justify-center gap-3", children: [
      n && u(n, "primary"),
      a && u(a, "secondary")
    ] }),
    l
  ] });
}
Xo.displayName = "EmptyState";
const yr = Ue(null), wr = Ue(null);
function kr(e) {
  const t = Ae(yr);
  if (!t) throw new Error(`${e} must be used inside <Accordion>.`);
  return t;
}
function Nr(e) {
  const t = Ae(wr);
  if (!t) throw new Error(`${e} must be used inside <AccordionItem>.`);
  return t;
}
function cs(e) {
  const { children: t, headingLevel: r = 3, disabled: n = !1, className: a } = e, s = e.type === "multiple", i = Z(null), l = (b) => b === void 0 ? void 0 : Array.isArray(b) ? b : b === "" ? [] : [b], [c, d] = St({
    value: l(e.value),
    defaultValue: l(e.defaultValue) ?? []
  }), u = (b) => {
    var p, x;
    d(b), s ? (p = e.onValueChange) == null || p.call(e, b) : (x = e.onValueChange) == null || x.call(e, b[0] ?? "");
  }, m = s || e.collapsible === !0, f = {
    isOpen: (b) => c.includes(b),
    isLocked: (b) => !m && c.includes(b),
    toggle: (b) => {
      if (c.includes(b)) {
        if (!m) return;
        u(c.filter((p) => p !== b));
      } else
        u(s ? [...c, b] : [b]);
    },
    headingLevel: r,
    disabled: n,
    rootRef: i
  }, h = (b) => {
    var $;
    const p = b.target;
    if (!p.hasAttribute("data-accordion-trigger")) return;
    const x = Array.from(
      (($ = i.current) == null ? void 0 : $.querySelectorAll("[data-accordion-trigger]:not(:disabled)")) ?? []
    ).filter((k) => k.closest("[data-accordion-root]") === i.current), z = x.indexOf(p);
    if (z === -1) return;
    let g = null;
    b.key === "ArrowDown" ? g = (z + 1) % x.length : b.key === "ArrowUp" ? g = (z - 1 + x.length) % x.length : b.key === "Home" ? g = 0 : b.key === "End" && (g = x.length - 1), g !== null && (b.preventDefault(), x[g].focus());
  };
  return /* @__PURE__ */ o(yr.Provider, { value: f, children: /* @__PURE__ */ o(
    "div",
    {
      ref: i,
      "data-accordion-root": "",
      onKeyDown: h,
      className: S("w-full border-t border-[var(--border-hairline)] font-mono", a),
      children: t
    }
  ) });
}
function ds({ value: e, disabled: t = !1, children: r, className: n }) {
  const a = kr("AccordionItem"), s = ce(), i = a.isOpen(e), l = {
    value: e,
    open: i,
    disabled: t || a.disabled,
    triggerId: `${s}-trigger`,
    contentId: `${s}-content`
  };
  return /* @__PURE__ */ o(wr.Provider, { value: l, children: /* @__PURE__ */ o("div", { "data-state": i ? "open" : "closed", className: S("border-b border-[var(--border-hairline)]", n), children: r }) });
}
function us({ children: e, className: t }) {
  const r = kr("AccordionTrigger"), n = Nr("AccordionTrigger"), a = `h${r.headingLevel}`, s = r.isLocked(n.value);
  return /* @__PURE__ */ o(a, { className: "m-0", children: /* @__PURE__ */ y(
    "button",
    {
      type: "button",
      id: n.triggerId,
      "data-accordion-trigger": "",
      "aria-expanded": n.open,
      "aria-controls": n.contentId,
      "aria-disabled": s || void 0,
      disabled: n.disabled,
      onClick: () => r.toggle(n.value),
      className: S(
        "flex min-h-touch w-full items-center justify-between gap-3 px-4 py-3 text-left font-mono text-sm font-medium",
        "text-[var(--text-primary)] transition-colors [transition-duration:var(--duration-fast)]",
        "hover:bg-[var(--surface-subtle)] focus:outline-none",
        "focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent",
        s && "cursor-default",
        t
      ),
      children: [
        /* @__PURE__ */ o("span", { className: "min-w-0 flex-1", children: e }),
        /* @__PURE__ */ o(
          q,
          {
            name: "ChevronRight",
            className: S(
              "shrink-0 text-[var(--text-secondary)] transition-transform [transition-duration:var(--duration-normal)] motion-reduce:transition-none",
              n.open && "rotate-90"
            )
          }
        )
      ]
    }
  ) });
}
function ms({ children: e, className: t }) {
  const r = Nr("AccordionContent");
  return /* @__PURE__ */ o(
    "div",
    {
      id: r.contentId,
      role: "region",
      "aria-labelledby": r.triggerId,
      "data-state": r.open ? "open" : "closed",
      className: S(
        // grid-rows 0fr -> 1fr animates to the content's natural height;
        // visibility flips at the end of the close so hidden bodies leave
        // the tab order and accessibility tree.
        "grid transition-[grid-template-rows,visibility] [transition-duration:var(--duration-normal)] motion-reduce:transition-none",
        r.open ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"
      ),
      children: /* @__PURE__ */ o("div", { className: "min-h-0 overflow-hidden", children: /* @__PURE__ */ o("div", { className: S("px-4 pb-4 pt-1 font-mono text-sm text-[var(--text-secondary)]", t), children: e }) })
    }
  );
}
const Yo = "focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]";
function Zo({
  items: e,
  maxItems: t,
  itemsBeforeCollapse: r = 1,
  itemsAfterCollapse: n = 1,
  expandLabel: a = (l) => `Show ${l} more breadcrumb${l === 1 ? "" : "s"}`,
  "aria-label": s = "Breadcrumb",
  className: i
}) {
  const [l, c] = V(!1), d = Z(null), u = Z(null), m = Math.max(0, r), f = Math.max(1, n), h = !l && t != null && e.length > t && e.length > m + f, b = h ? e.length - m - f : 0;
  G(() => {
    var $;
    if (!l || u.current == null) return;
    const g = ($ = d.current) == null ? void 0 : $.querySelector(
      `[data-crumb-index="${u.current}"] a, [data-crumb-index="${u.current}"] [data-crumb-link]`
    );
    g == null || g.focus(), u.current = null;
  }, [l]);
  const p = e.length - 1, x = (g, $, k) => /* @__PURE__ */ y(
    "li",
    {
      "data-crumb-index": $,
      className: "inline-flex min-w-0 items-center",
      children: [
        k && /* @__PURE__ */ o(q, { name: "ChevronRight", size: "3", className: "mx-1 shrink-0 text-[var(--text-secondary)]" }),
        $ === p ? /* @__PURE__ */ o(
          "span",
          {
            "aria-current": "page",
            className: "inline-flex min-h-touch min-w-0 items-center truncate px-1 text-[var(--text-primary)]",
            children: g.label
          }
        ) : g.as ? /* @__PURE__ */ o(
          ft,
          {
            variant: "quiet",
            as: g.as,
            asProps: { ...g.asProps, "data-crumb-link": "" },
            className: "inline-flex min-h-touch min-w-0 items-center truncate px-1",
            children: g.label
          }
        ) : /* @__PURE__ */ o(
          ft,
          {
            variant: "quiet",
            href: g.href ?? "#",
            className: "inline-flex min-h-touch min-w-0 items-center truncate px-1",
            children: g.label
          }
        )
      ]
    },
    g.key ?? $
  );
  let z;
  if (h) {
    const g = e.slice(0, m), $ = e.slice(e.length - f);
    z = /* @__PURE__ */ y(ge, { children: [
      g.map((k, N) => x(k, N, N > 0)),
      /* @__PURE__ */ y("li", { className: "inline-flex items-center", children: [
        m > 0 && /* @__PURE__ */ o(q, { name: "ChevronRight", size: "3", className: "mx-1 shrink-0 text-[var(--text-secondary)]" }),
        /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            "aria-label": a(b),
            onClick: () => {
              u.current = m, c(!0);
            },
            className: S(
              "plate-round inline-flex h-touch min-w-touch items-center justify-center px-2 text-[var(--text-primary)]",
              "transition-colors [transition-duration:var(--duration-fast)] motion-reduce:transition-none hover:bg-[var(--surface-muted)]",
              Yo
            ),
            children: /* @__PURE__ */ o("span", { "aria-hidden": "true", children: "..." })
          }
        )
      ] }),
      $.map((k, N) => x(k, e.length - f + N, !0))
    ] });
  } else
    z = e.map((g, $) => x(g, $, $ > 0));
  return /* @__PURE__ */ o("nav", { "aria-label": s, className: S("font-mono text-sm", i), children: /* @__PURE__ */ o("ol", { ref: d, className: "flex min-w-0 flex-wrap items-center", children: z }) });
}
Zo.displayName = "Breadcrumbs";
const it = (e, t) => t < e ? [] : Array.from({ length: t - e + 1 }, (r, n) => e + n);
function Qo(e, t, r = 1, n = 1) {
  if (t <= 0) return [];
  const a = Math.min(Math.max(1, e), t), s = it(1, Math.min(n, t)), i = it(Math.max(t - n + 1, n + 1), t), l = Math.max(
    Math.min(a - r, t - n - r * 2 - 1),
    n + 2
  ), c = Math.min(
    Math.max(a + r, n + r * 2 + 2),
    i.length > 0 ? i[0] - 2 : t - 1
  ), d = [...s];
  l > n + 2 ? d.push("ellipsis-start") : n + 1 < t - n && d.push(n + 1), d.push(...it(l, c)), c < t - n - 1 ? d.push("ellipsis-end") : t - n > n && d.push(t - n), d.push(...i);
  const u = /* @__PURE__ */ new Set();
  return d.filter((m) => typeof m == "number" && (m < 1 || m > t) || u.has(m) ? !1 : (u.add(m), !0));
}
const Jo = {
  sm: "h-control-sm min-w-control-sm px-2 text-sm",
  md: "h-control-md min-w-control-md px-2.5 text-sm",
  lg: "h-control-lg min-w-control-lg px-3 text-base"
}, $r = {
  sm: "min-h-touch min-w-touch",
  md: "min-h-touch min-w-touch",
  lg: "min-h-control-lg min-w-control-lg"
}, Vt = { sm: "4", md: "4", lg: "5" };
function lt({
  size: e,
  current: t = !1,
  disabled: r = !1,
  label: n,
  onClick: a,
  children: s
}) {
  return /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      "aria-label": n,
      "aria-current": t ? "page" : void 0,
      disabled: r,
      onClick: a,
      className: S(
        "group inline-flex items-center justify-center font-mono focus:outline-none",
        $r[e],
        r ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      ),
      children: /* @__PURE__ */ o(
        "span",
        {
          className: S(
            "plate-round inline-flex items-center justify-center tabular-nums",
            "transition-colors [transition-duration:var(--duration-fast)] motion-reduce:transition-none",
            "group-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]",
            Jo[e],
            t ? "bg-[var(--button-primary-background)] text-[var(--button-primary-text)]" : S(
              "bg-[var(--button-ghost-background)] text-[var(--button-ghost-text)]",
              !r && "group-hover:bg-[var(--button-ghost-background-hover)]"
            )
          ),
          children: s
        }
      )
    }
  );
}
function ea({
  page: e,
  defaultPage: t = 1,
  pageCount: r,
  onPageChange: n,
  siblingCount: a = 1,
  boundaryCount: s = 1,
  size: i = "md",
  showPrevNext: l = !0,
  getPageLabel: c = (h) => `Page ${h}`,
  previousLabel: d = "Previous page",
  nextLabel: u = "Next page",
  "aria-label": m = "Pagination",
  className: f
}) {
  const h = se(i, "Pagination"), [b, p] = V(t), x = e !== void 0, g = Math.min(Math.max(1, x ? e : b), Math.max(1, r));
  if (r <= 0) return null;
  const $ = (N) => {
    const _ = Math.min(Math.max(1, N), r);
    _ !== g && (x || p(_), n == null || n(_));
  }, k = Qo(g, r, a, s);
  return /* @__PURE__ */ o("nav", { "aria-label": m, className: S("font-mono", f), children: /* @__PURE__ */ y("ul", { className: "flex flex-wrap items-center", children: [
    l && /* @__PURE__ */ o("li", { children: /* @__PURE__ */ o(lt, { size: h, label: d, disabled: g <= 1, onClick: () => $(g - 1), children: /* @__PURE__ */ o(q, { name: "ArrowLeft", size: Vt[h] }) }) }),
    k.map(
      (N) => typeof N == "number" ? /* @__PURE__ */ o("li", { children: /* @__PURE__ */ o(
        lt,
        {
          size: h,
          current: N === g,
          label: c(N),
          onClick: () => $(N),
          children: N
        }
      ) }, N) : /* @__PURE__ */ o(
        "li",
        {
          "aria-hidden": "true",
          className: S(
            "inline-flex items-center justify-center text-[var(--text-secondary)]",
            $r[h],
            h === "lg" ? "text-base" : "text-sm"
          ),
          children: "..."
        },
        N
      )
    ),
    l && /* @__PURE__ */ o("li", { children: /* @__PURE__ */ o(lt, { size: h, label: u, disabled: g >= r, onClick: () => $(g + 1), children: /* @__PURE__ */ o(q, { name: "ArrowRight", size: Vt[h] }) }) })
  ] }) });
}
ea.displayName = "Pagination";
const zt = Ue({ collapsed: !1 });
function ta({ "aria-label": e, collapsed: t = !1, children: r, className: n }) {
  const a = ze.Children.toArray(r).some(
    (s) => ze.isValidElement(s) && s.type === Sr
  );
  return /* @__PURE__ */ o(zt.Provider, { value: { collapsed: t }, children: /* @__PURE__ */ o(
    "nav",
    {
      "aria-label": e,
      "data-collapsed": t || void 0,
      className: S(
        "border border-[var(--border-hairline)] bg-[var(--surface-container)] font-mono text-sm",
        t ? "w-fit p-2" : "w-64 p-4",
        n
      ),
      children: a ? /* @__PURE__ */ o("div", { className: "space-y-4", children: r }) : /* @__PURE__ */ o("ul", { className: "space-y-1", children: r })
    }
  ) });
}
ta.displayName = "SideNav";
function Sr({ heading: e, children: t, className: r }) {
  const { collapsed: n } = Ae(zt), a = ce();
  return /* @__PURE__ */ y(
    "div",
    {
      role: e ? "group" : void 0,
      "aria-labelledby": e ? a : void 0,
      className: r,
      children: [
        e && /* @__PURE__ */ o(
          "div",
          {
            id: a,
            className: S(
              "px-3 pb-2 text-xs uppercase tracking-wider text-[var(--text-secondary)]",
              n && "sr-only"
            ),
            children: e
          }
        ),
        /* @__PURE__ */ o("ul", { className: "space-y-1", children: t })
      ]
    }
  );
}
Sr.displayName = "SideNavSection";
const ra = "plate-round flex w-full min-h-touch items-center gap-3 px-3 py-2 text-left font-mono text-sm transition-colors [transition-duration:var(--duration-fast)] motion-reduce:transition-none focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]", na = "text-[var(--text-secondary)] hover:bg-[var(--surface-muted)] hover:text-[var(--accent)]", oa = "bg-[var(--surface-muted)] text-[var(--accent)]";
function zr(e) {
  let t = !1;
  return ze.Children.forEach(e, (r) => {
    if (t || !ze.isValidElement(r)) return;
    const n = r.props;
    (n.active || zr(n.children)) && (t = !0);
  }), t;
}
function aa({
  label: e,
  icon: t,
  active: r = !1,
  href: n,
  onClick: a,
  as: s,
  asProps: i,
  trailing: l,
  children: c,
  expanded: d,
  defaultExpanded: u,
  onExpandedChange: m,
  className: f
}) {
  const { collapsed: h } = Ae(zt), b = ce(), p = ze.Children.toArray(c).some(ze.isValidElement), [x, z] = V(
    () => u ?? (p && zr(c))
  ), g = d ?? x, $ = () => {
    const v = !g;
    d === void 0 && z(v), m == null || m(v);
  }, k = /* @__PURE__ */ y(ge, { children: [
    t && /* @__PURE__ */ o(q, { name: t, className: "shrink-0" }),
    /* @__PURE__ */ o("span", { className: S("min-w-0 flex-1 truncate", h && "sr-only"), children: e }),
    !h && l && /* @__PURE__ */ o("span", { className: "ml-auto shrink-0", children: l }),
    p && /* @__PURE__ */ o(
      q,
      {
        name: g ? "ChevronDown" : "ChevronRight",
        size: h ? "3" : "4",
        className: S("shrink-0", !h && "ml-auto")
      }
    )
  ] }), N = S(ra, r ? oa : na, h && "min-w-touch justify-center gap-1 px-2", f), _ = h ? { "aria-label": e } : {};
  let T;
  return p ? T = /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      "aria-expanded": g,
      "aria-controls": b,
      onClick: $,
      className: N,
      ..._,
      children: k
    }
  ) : s ? T = /* @__PURE__ */ o(
    s,
    {
      className: N,
      "aria-current": r ? "page" : void 0,
      onClick: a,
      ..._,
      ...i,
      children: k
    }
  ) : n != null ? T = /* @__PURE__ */ o(
    "a",
    {
      href: n,
      "aria-current": r ? "page" : void 0,
      onClick: a,
      className: N,
      ..._,
      children: k
    }
  ) : T = /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      "aria-current": r ? "page" : void 0,
      onClick: a,
      className: N,
      ..._,
      children: k
    }
  ), /* @__PURE__ */ y("li", { children: [
    h ? /* @__PURE__ */ o(qn, { content: e, position: "right", children: T }) : T,
    p && g && /* @__PURE__ */ o("ul", { id: b, className: S("mt-1 space-y-1", !h && "ml-6"), children: c })
  ] });
}
aa.displayName = "SideNavItem";
function sa({
  brand: e,
  navigation: t,
  actions: r,
  mobileMenu: n,
  sticky: a = !1,
  menuOpen: s,
  defaultMenuOpen: i = !1,
  onMenuOpenChange: l,
  menuLabel: c = "Menu",
  navLabel: d = "Main",
  className: u
}) {
  const m = ce(), [f, h] = V(i), b = s ?? f, p = n ?? t, x = (z) => {
    s === void 0 && h(z), l == null || l(z);
  };
  return /* @__PURE__ */ y(
    "header",
    {
      className: S(
        "w-full border-b border-[var(--border-hairline)] bg-[var(--surface-container)] font-mono text-sm text-[var(--text-primary)]",
        a && "sticky top-0 z-[var(--z-index-sticky)]",
        u
      ),
      children: [
        /* @__PURE__ */ y("div", { className: "flex min-h-control-lg items-center gap-4 px-4 py-1", children: [
          /* @__PURE__ */ o("div", { className: "flex shrink-0 items-center", children: e }),
          t && /* @__PURE__ */ o("nav", { "aria-label": d, className: "hidden min-w-0 flex-1 md:block", children: /* @__PURE__ */ o("div", { className: "flex flex-wrap items-center gap-4", children: t }) }),
          /* @__PURE__ */ y("div", { className: "ml-auto flex shrink-0 items-center gap-2", children: [
            r,
            p && /* @__PURE__ */ o(
              We,
              {
                variant: "ghost",
                size: "lg",
                "aria-label": c,
                "aria-expanded": b,
                "aria-controls": m,
                onClick: () => x(!b),
                className: "min-w-touch md:hidden",
                children: /* @__PURE__ */ o(q, { name: b ? "X" : "Menu", size: "5" })
              }
            )
          ] })
        ] }),
        p && b && /* @__PURE__ */ o("div", { id: m, className: "border-t border-[var(--border-hairline)] px-4 py-3 md:hidden", children: /* @__PURE__ */ o("nav", { "aria-label": d, children: /* @__PURE__ */ o("div", { className: "flex flex-col items-start gap-1", children: p }) }) })
      ]
    }
  );
}
sa.displayName = "AppHeader";
function ia({
  title: e,
  status: t,
  actions: r,
  variant: n = "default",
  titleAs: a = "h2",
  scroll: s = !0,
  children: i,
  className: l,
  bodyClassName: c
}) {
  const d = ce(), u = n === "active";
  return /* @__PURE__ */ o(
    "section",
    {
      "aria-labelledby": d,
      "data-variant": n,
      className: S(
        "plate-round-lg flex flex-col p-px",
        u ? "bg-[var(--accent)]" : "bg-[var(--surface-container-stroke)]",
        l
      ),
      children: /* @__PURE__ */ y("div", { className: "plate-round-lg flex min-h-0 flex-1 flex-col bg-[var(--surface-card)] font-mono", children: [
        /* @__PURE__ */ y(
          "div",
          {
            className: S(
              "flex min-h-control-sm shrink-0 items-center gap-2 border-b border-[var(--border-hairline)] px-4 py-1 text-xs",
              u && "bg-[var(--surface-muted)]"
            ),
            children: [
              u && /* @__PURE__ */ o(q, { name: "ChevronRight", size: "3", className: "shrink-0 text-[var(--text-primary)]" }),
              /* @__PURE__ */ o(
                a,
                {
                  id: d,
                  className: "min-w-0 truncate text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]",
                  children: e
                }
              ),
              /* @__PURE__ */ o("span", { "aria-hidden": "true", className: "h-px min-w-4 flex-1 bg-[var(--surface-container-stroke)]" }),
              t && /* @__PURE__ */ o("span", { className: "shrink-0 text-[var(--text-secondary)]", children: t }),
              r && /* @__PURE__ */ o("div", { className: "flex shrink-0 items-center gap-1", children: r })
            ]
          }
        ),
        /* @__PURE__ */ o(
          "div",
          {
            tabIndex: s ? 0 : void 0,
            role: s ? "group" : void 0,
            "aria-labelledby": s ? d : void 0,
            className: S(
              "min-h-0 flex-1 p-4 text-sm text-[var(--text-primary)]",
              s && "overflow-auto focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]",
              c
            ),
            children: i
          }
        )
      ] })
    }
  );
}
ia.displayName = "Window";
const la = 8;
function ca({
  content: e,
  count: t,
  enabled: r = !0,
  onFollowChange: n,
  contentRef: a
}) {
  const s = Z(null), [i, l] = V(!0), [c, d] = V(0), u = Z(t), m = he(
    (p) => {
      l((x) => (x !== p && (n == null || n(p)), p));
    },
    [n]
  ), f = he(() => {
    const p = s.current;
    p && (p.scrollTop = p.scrollHeight);
  }, []);
  Pe(() => {
    const p = t - u.current;
    u.current = t, r && (i ? f() : p > 0 && d((x) => x + p));
  }, [e, t, r, i, f]), Pe(() => {
    const p = a == null ? void 0 : a.current;
    if (!r || !i || !p || typeof ResizeObserver > "u") return;
    const x = new ResizeObserver(() => f());
    return x.observe(p), () => x.disconnect();
  }, [a, r, i, f]);
  const h = he(() => {
    const p = s.current;
    if (!p || !r) return;
    const x = p.scrollHeight - p.scrollTop - p.clientHeight <= la;
    m(x), x && d(0);
  }, [r, m]), b = he(() => {
    d(0), m(!0), f();
  }, [m, f]);
  return { scrollRef: s, onScroll: h, following: i, unseen: c, resume: b };
}
const da = {
  info: { icon: "Info", tag: "INFO", tone: "text-info-700 dark:text-info-400" },
  warn: { icon: "AlertTriangle", tag: "WARN", tone: "text-warning-700 dark:text-warning-400" },
  error: { icon: "AlertCircle", tag: "ERROR", tone: "text-error-700 dark:text-error-400" },
  debug: { icon: "Settings", tag: "DEBUG", tone: "text-secondary-700 dark:text-secondary-400" }
};
function ua({
  lines: e,
  autoScroll: t = !0,
  showLineNumbers: r = !1,
  wrap: n = !0,
  "aria-label": a = "Log",
  emptyState: s = "No output yet.",
  framed: i = !0,
  onFollowChange: l,
  className: c
}) {
  const { scrollRef: d, onScroll: u, following: m, unseen: f, resume: h } = ca({
    content: e,
    count: e.length,
    enabled: t,
    onFollowChange: l
  }), b = e.some((x) => x.level), p = `${String(Math.max(e.length, 1)).length}ch`;
  return /* @__PURE__ */ y(
    "div",
    {
      className: S(
        "relative flex h-80 flex-col",
        i && "plate-round-lg bg-[var(--surface-container-stroke)] p-px",
        c
      ),
      children: [
        /* @__PURE__ */ o(
          "div",
          {
            ref: d,
            role: "log",
            "aria-live": "polite",
            "aria-label": a,
            tabIndex: 0,
            onScroll: u,
            className: S(
              "min-h-0 flex-1 overflow-auto py-2 font-mono text-xs leading-relaxed text-[var(--text-primary)]",
              i && "plate-round-lg bg-[var(--surface-page)]",
              "focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]"
            ),
            children: e.length === 0 ? /* @__PURE__ */ o("p", { className: "px-3 text-[var(--text-secondary)]", children: s }) : e.map((x, z) => {
              const g = x.level ? da[x.level] : null;
              return /* @__PURE__ */ y(
                "div",
                {
                  "data-level": x.level,
                  className: S("flex gap-3 px-3", n ? "items-start" : "w-max min-w-full items-start"),
                  children: [
                    r && /* @__PURE__ */ o(
                      "span",
                      {
                        "aria-hidden": "true",
                        className: "shrink-0 select-none text-right tabular-nums text-[var(--text-secondary)]",
                        style: { minWidth: p },
                        children: z + 1
                      }
                    ),
                    x.timestamp && /* @__PURE__ */ o("span", { className: "shrink-0 tabular-nums text-[var(--text-secondary)]", children: x.timestamp }),
                    g ? /* @__PURE__ */ y("span", { className: S("inline-flex w-16 shrink-0 items-center gap-1 font-bold", g.tone), children: [
                      /* @__PURE__ */ o(q, { name: g.icon, size: "3", className: "shrink-0" }),
                      g.tag
                    ] }) : b && /* @__PURE__ */ o("span", { "aria-hidden": "true", className: "w-16 shrink-0" }),
                    /* @__PURE__ */ o("span", { className: S("min-w-0 flex-1", n ? "whitespace-pre-wrap break-words" : "whitespace-pre"), children: x.text })
                  ]
                },
                x.id
              );
            })
          }
        ),
        t && !m && /* @__PURE__ */ o("div", { className: "pointer-events-none absolute inset-x-0 bottom-3 flex justify-center", children: /* @__PURE__ */ o(
          We,
          {
            variant: "secondary",
            size: "sm",
            onClick: h,
            iconLeft: /* @__PURE__ */ o(q, { name: "ChevronDown", size: "4" }),
            className: "pointer-events-auto",
            children: f > 0 ? `Jump to latest (${f} new)` : "Jump to latest"
          }
        ) })
      ]
    }
  );
}
ua.displayName = "LogView";
const ma = {
  neutral: "text-[var(--text-primary)]",
  primary: "bg-[var(--button-primary-background)] text-[var(--button-primary-text)] font-bold",
  success: "bg-success-50 text-success-800 dark:bg-success-950 dark:text-success-300",
  warning: "bg-warning-50 text-warning-800 dark:bg-warning-950 dark:text-warning-300",
  error: "bg-error-50 text-error-800 dark:bg-error-950 dark:text-error-300",
  info: "bg-info-50 text-info-800 dark:bg-info-950 dark:text-info-300"
};
function fa({
  left: e,
  center: t,
  right: r,
  live: n = !1,
  "aria-label": a = "Status",
  className: s
}) {
  return /* @__PURE__ */ y(
    "div",
    {
      role: n ? "status" : "group",
      "aria-live": n ? "polite" : void 0,
      "aria-label": a,
      className: S(
        "grid min-h-control-sm w-full grid-cols-[1fr_auto_1fr] items-stretch border-t border-[var(--border-hairline)] bg-[var(--surface-muted)] font-mono text-xs text-[var(--text-primary)]",
        s
      ),
      children: [
        /* @__PURE__ */ o("div", { className: "flex min-w-0 items-stretch justify-start", children: e }),
        /* @__PURE__ */ o("div", { className: "flex min-w-0 items-stretch justify-center", children: t }),
        /* @__PURE__ */ o("div", { className: "flex min-w-0 items-stretch justify-end", children: r })
      ]
    }
  );
}
fa.displayName = "StatusLine";
function pa({ icon: e, tone: t = "neutral", children: r, className: n }) {
  return /* @__PURE__ */ y(
    "span",
    {
      "data-tone": t,
      className: S("inline-flex min-w-0 items-center gap-1.5 whitespace-nowrap px-3", ma[t], n),
      children: [
        e && /* @__PURE__ */ o(q, { name: e, size: "3", className: "shrink-0" }),
        /* @__PURE__ */ o("span", { className: "truncate", children: r })
      ]
    }
  );
}
pa.displayName = "StatusLineSegment";
function ba({ items: e, layout: t = "inline", leader: r = !1, className: n }) {
  const a = t === "inline";
  return /* @__PURE__ */ o(
    "dl",
    {
      "data-layout": t,
      className: S("font-mono text-sm", a ? "space-y-1" : "space-y-3", n),
      children: e.map((s, i) => /* @__PURE__ */ y(
        "div",
        {
          className: a ? "flex items-baseline justify-between gap-2" : "flex flex-col gap-0.5",
          children: [
            /* @__PURE__ */ o(
              "dt",
              {
                className: S(
                  "text-[var(--text-secondary)]",
                  !a && "text-xs uppercase tracking-wider",
                  a && !r && "shrink-0",
                  a && r && "flex flex-1 items-baseline after:mx-2 after:min-w-4 after:flex-1 after:border-b after:border-dotted after:border-[var(--surface-container-stroke)] after:content-['']"
                ),
                children: s.term
              }
            ),
            /* @__PURE__ */ o("dd", { className: S("min-w-0 text-[var(--text-primary)]", a && "text-right"), children: s.description })
          ]
        },
        s.key ?? i
      ))
    }
  );
}
ba.displayName = "DescriptionList";
function ha({
  value: e,
  min: t = 0,
  max: r = 100,
  low: n,
  high: a,
  optimum: s
}) {
  if (n == null && a == null && s == null) return "primary";
  const i = Math.min(Math.max(n ?? t, t), r), l = Math.min(Math.max(a ?? r, i), r), c = s ?? (t + r) / 2, d = (m) => m < i ? 0 : m > l ? 2 : 1, u = Math.abs(d(Math.min(Math.max(e, t), r)) - d(c));
  return u === 0 ? "success" : u === 1 ? "warning" : "error";
}
const ga = {
  primary: "bg-primary-600 dark:bg-primary-400",
  success: "bg-success-600 dark:bg-success-400",
  warning: "bg-warning-600 dark:bg-warning-400",
  error: "bg-error-600 dark:bg-error-400"
};
function xa({
  value: e,
  min: t = 0,
  max: r = 100,
  low: n,
  high: a,
  optimum: s,
  label: i,
  valueText: l,
  tone: c,
  segments: d = 20,
  size: u = "md",
  className: m
}) {
  const f = se(u, "Meter"), h = ce(), b = r - t || 1, p = Math.min(Math.max(e, t), r), x = (p - t) / b, z = l ?? `${Math.round(x * 100)}%`, g = c ?? ha({ value: e, min: t, max: r, low: n, high: a, optimum: s }), $ = Math.max(1, Math.round(d)), k = Math.round(x * $);
  return /* @__PURE__ */ y("div", { className: S("font-mono text-sm", m), "data-tone": g, children: [
    /* @__PURE__ */ y("div", { className: "mb-1 flex items-baseline justify-between gap-3", children: [
      /* @__PURE__ */ o("span", { id: h, className: "text-[var(--text-primary)]", children: i }),
      /* @__PURE__ */ y("span", { className: "inline-flex items-center gap-1 tabular-nums text-[var(--text-secondary)]", children: [
        g === "warning" && /* @__PURE__ */ o(q, { name: "AlertTriangle", size: "3" }),
        g === "error" && /* @__PURE__ */ o(q, { name: "AlertCircle", size: "3" }),
        z
      ] })
    ] }),
    /* @__PURE__ */ o(
      "div",
      {
        role: "meter",
        "aria-labelledby": h,
        "aria-valuenow": p,
        "aria-valuemin": t,
        "aria-valuemax": r,
        "aria-valuetext": z,
        className: "flex gap-0.5",
        children: Array.from({ length: $ }, (N, _) => /* @__PURE__ */ o(
          "span",
          {
            "data-filled": _ < k || void 0,
            className: S(
              "flex-1",
              f === "sm" ? "h-2" : "h-3",
              _ < k ? ga[g] : "bg-[var(--surface-muted)] ring-1 ring-inset ring-[var(--surface-container-stroke)]"
            )
          },
          _
        ))
      }
    )
  ] });
}
xa.displayName = "Meter";
function va(e) {
  return e.textValue ? e.textValue : typeof e.label == "string" || typeof e.label == "number" ? String(e.label) : "";
}
const ya = "plate-round flex min-h-touch cursor-pointer items-center gap-2 py-1 pr-3 font-mono text-sm pl-[calc(var(--tree-level)_*_theme(spacing.4)_+_theme(spacing.2))] transition-colors [transition-duration:var(--duration-fast)] motion-reduce:transition-none";
function wa({
  nodes: e,
  "aria-label": t,
  "aria-labelledby": r,
  expanded: n,
  defaultExpanded: a = [],
  onExpandedChange: s,
  selected: i,
  defaultSelected: l = null,
  onSelectedChange: c,
  onActivate: d,
  typeahead: u = !0,
  className: m
}) {
  var L;
  const [f, h] = V(a), b = n ?? f, p = Le(() => new Set(b), [b]), [x, z] = V(l), g = i !== void 0 ? i : x, [$, k] = V(null), N = Z(/* @__PURE__ */ new Map()), _ = Z(!1), T = Z({ buffer: "", timer: 0 }), v = Le(() => {
    const E = [], P = (H, w, U) => {
      for (const I of H) {
        const D = Array.isArray(I.children);
        E.push({ node: I, level: w, parentId: U, isBranch: D }), D && p.has(I.id) && P(I.children, w + 1, I.id);
      }
    };
    return P(e, 1, null), E;
  }, [e, p]), O = $ && v.some((E) => E.node.id === $) && $ || g && v.some((E) => E.node.id === g) && g || ((L = v[0]) == null ? void 0 : L.node.id) || null;
  G(() => {
    var E;
    !_.current || !$ || (_.current = !1, (E = N.current.get($)) == null || E.focus());
  }, [$, v]), G(() => () => clearTimeout(T.current.timer), []);
  const C = (E) => {
    var P;
    E && (_.current = !0, k(E), E === $ && ((P = N.current.get(E)) == null || P.focus()));
  }, te = he(
    (E, P) => {
      if (p.has(E) === P) return;
      const w = P ? [...b, E] : b.filter((U) => U !== E);
      n === void 0 && h(w), s == null || s(w);
    },
    [p, b, n, s]
  ), Q = (E) => {
    E.node.disabled || g !== E.node.id && (i === void 0 && z(E.node.id), c == null || c(E.node.id));
  }, oe = (E, P) => {
    const H = T.current;
    clearTimeout(H.timer), H.buffer += E.toLowerCase(), H.timer = setTimeout(() => {
      H.buffer = "";
    }, 500);
    const w = v.length, U = H.buffer.length === 1 ? P + 1 : P;
    for (let I = 0; I < w; I++) {
      const D = v[(U + I) % w];
      if (va(D.node).toLowerCase().startsWith(H.buffer)) {
        C(D.node.id);
        return;
      }
    }
  }, W = (E, P) => {
    var U, I, D, X, Y;
    if (E.target !== E.currentTarget) return;
    const H = v.findIndex((ee) => ee.node.id === P.node.id), w = p.has(P.node.id);
    switch (E.key) {
      case "ArrowDown":
        E.preventDefault(), C((U = v[H + 1]) == null ? void 0 : U.node.id);
        break;
      case "ArrowUp":
        E.preventDefault(), C((I = v[H - 1]) == null ? void 0 : I.node.id);
        break;
      case "ArrowRight":
        if (E.preventDefault(), !P.isBranch) break;
        w ? ((D = v[H + 1]) == null ? void 0 : D.parentId) === P.node.id && C(v[H + 1].node.id) : te(P.node.id, !0);
        break;
      case "ArrowLeft":
        E.preventDefault(), P.isBranch && w ? te(P.node.id, !1) : P.parentId && C(P.parentId);
        break;
      case "Home":
        E.preventDefault(), C((X = v[0]) == null ? void 0 : X.node.id);
        break;
      case "End":
        E.preventDefault(), C((Y = v[v.length - 1]) == null ? void 0 : Y.node.id);
        break;
      case "Enter":
        E.preventDefault(), Q(P), P.node.disabled || d == null || d(P.node.id);
        break;
      case " ":
        E.preventDefault(), Q(P);
        break;
      default:
        u && E.key.length === 1 && !E.ctrlKey && !E.metaKey && !E.altKey && /\S/.test(E.key) && (E.preventDefault(), oe(E.key, H));
    }
  }, K = (E, P, H) => E.map((w, U) => {
    const I = Array.isArray(w.children), D = I && p.has(w.id), X = g === w.id, Y = { node: w, parentId: H, isBranch: I };
    return /* @__PURE__ */ y(
      "li",
      {
        ref: (ee) => {
          ee ? N.current.set(w.id, ee) : N.current.delete(w.id);
        },
        role: "treeitem",
        "aria-level": P,
        "aria-setsize": E.length,
        "aria-posinset": U + 1,
        "aria-expanded": I ? D : void 0,
        "aria-selected": X,
        "aria-disabled": w.disabled || void 0,
        tabIndex: O === w.id ? 0 : -1,
        onKeyDown: (ee) => W(ee, Y),
        onFocus: (ee) => {
          ee.target === ee.currentTarget && k(w.id);
        },
        className: "focus:outline-none [&:focus-visible>div]:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]",
        children: [
          /* @__PURE__ */ y(
            "div",
            {
              style: { "--tree-level": P - 1 },
              onClick: (ee) => {
                ee.stopPropagation(), C(w.id), Q(Y), I && te(w.id, !D), !w.disabled && !I && (d == null || d(w.id));
              },
              className: S(
                ya,
                X ? "bg-[var(--surface-muted)] text-[var(--accent)]" : "text-[var(--text-primary)] hover:bg-[var(--surface-muted)]",
                w.disabled && "cursor-not-allowed opacity-50"
              ),
              children: [
                /* @__PURE__ */ o("span", { className: "inline-flex w-4 shrink-0 justify-center text-[var(--text-secondary)]", children: I && /* @__PURE__ */ o(q, { name: D ? "ChevronDown" : "ChevronRight", size: "3" }) }),
                w.icon && /* @__PURE__ */ o(q, { name: w.icon, className: "shrink-0" }),
                /* @__PURE__ */ o("span", { className: "min-w-0 truncate", children: w.label })
              ]
            }
          ),
          I && D && w.children.length > 0 && /* @__PURE__ */ o("ul", { role: "group", children: K(w.children, P + 1, w.id) })
        ]
      },
      w.id
    );
  });
  return /* @__PURE__ */ o(
    "ul",
    {
      role: "tree",
      "aria-label": t,
      "aria-labelledby": r,
      className: S("font-mono text-sm", m),
      children: K(e, 1, null)
    }
  );
}
wa.displayName = "TreeView";
const ka = {
  sm: "h-5 min-w-5 px-1.5 text-xs",
  md: "h-6 min-w-6 px-2 text-sm"
};
function Gt({ size: e, children: t, className: r }) {
  return /* @__PURE__ */ o(
    "kbd",
    {
      className: S(
        "plate-round inline-flex bg-[var(--surface-container-stroke)] px-px pb-0.5 pt-px align-middle font-mono",
        r
      ),
      children: /* @__PURE__ */ o(
        "span",
        {
          className: S(
            "plate-round inline-flex items-center justify-center bg-[var(--surface-muted)] leading-none text-[var(--text-primary)]",
            ka[e]
          ),
          children: t
        }
      )
    }
  );
}
function Na({ keys: e, children: t, size: r = "sm", separator: n = "+", className: a }) {
  const s = se(r, "Kbd", "sm");
  return !e || e.length <= 1 ? /* @__PURE__ */ o(Gt, { size: s, className: a, children: (e == null ? void 0 : e[0]) ?? t }) : /* @__PURE__ */ o("kbd", { className: S("inline-flex items-center gap-1 align-middle font-mono", a), children: e.map((i, l) => /* @__PURE__ */ y(ht, { children: [
    l > 0 && /* @__PURE__ */ o("span", { className: S("text-[var(--text-secondary)]", s === "sm" ? "text-xs" : "text-sm"), children: n }),
    /* @__PURE__ */ o(Gt, { size: s, children: i })
  ] }, `${i}-${l}`)) });
}
Na.displayName = "Kbd";
const $a = {
  none: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8"
}, Sa = re(function({ children: t, gap: r = "4", className: n, axis: a = "vertical", ...s }, i) {
  return /* @__PURE__ */ o(
    "div",
    {
      ref: i,
      className: S(
        "flex",
        a === "vertical" ? "flex-col" : "flex-row flex-wrap items-center",
        $a[r],
        n
      ),
      ...s,
      children: t
    }
  );
});
Sa.displayName = "Stack";
const za = {
  none: "p-0",
  1: "p-1",
  2: "p-2",
  3: "p-3",
  4: "p-4",
  5: "p-5",
  6: "p-6",
  8: "p-8"
}, _a = {
  none: "px-0",
  1: "px-1",
  2: "px-2",
  3: "px-3",
  4: "px-4",
  5: "px-5",
  6: "px-6",
  8: "px-8"
}, Ia = {
  none: "py-0",
  1: "py-1",
  2: "py-2",
  3: "py-3",
  4: "py-4",
  5: "py-5",
  6: "py-6",
  8: "py-8"
}, ct = {
  none: "",
  page: "bg-[var(--surface-page)]",
  container: "bg-[var(--surface-container)]",
  card: "bg-[var(--surface-card)]",
  subtle: "bg-[var(--surface-subtle)]",
  muted: "bg-[var(--surface-muted)]",
  raised: "bg-[var(--surface-raised)]",
  inverse: "bg-[var(--surface-inverse)] text-[var(--text-on-inverse)]"
}, Ta = re(function({
  children: t,
  padding: r,
  paddingX: n,
  paddingY: a,
  background: s = "none",
  border: i = "none",
  as: l = "div",
  className: c,
  ...d
}, u) {
  const m = l, f = n !== void 0 || a !== void 0, h = n ?? r, b = a ?? r, p = f ? S(
    h !== void 0 && _a[h],
    b !== void 0 && Ia[b]
  ) : S(r !== void 0 && za[r]);
  if (i === "none")
    return /* @__PURE__ */ o(m, { ref: u, className: S(ct[s], p, c), ...d, children: t });
  const x = s === "none" ? ct.card : ct[s];
  return /* @__PURE__ */ o(
    m,
    {
      ref: u,
      className: S("plate-round bg-[var(--surface-container-stroke)] p-px", c),
      ...d,
      children: /* @__PURE__ */ o("div", { className: S("plate-round h-full w-full", x, p), children: t })
    }
  );
});
Ta.displayName = "Box";
const Ea = {
  none: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8"
}, Aa = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  baseline: "items-baseline"
}, Ca = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between"
}, Ma = re(function({ children: t, gap: r = "2", align: n = "center", justify: a = "start", wrap: s = !0, className: i, ...l }, c) {
  return /* @__PURE__ */ o(
    "div",
    {
      ref: c,
      className: S(
        "flex flex-row",
        s ? "flex-wrap" : "flex-nowrap",
        Ea[r],
        Aa[n],
        Ca[a],
        i
      ),
      ...l,
      children: t
    }
  );
});
Ma.displayName = "Inline";
const Ra = {
  none: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8"
}, La = {
  none: "gap-y-0",
  1: "gap-y-1",
  2: "gap-y-2",
  3: "gap-y-3",
  4: "gap-y-4",
  5: "gap-y-5",
  6: "gap-y-6",
  8: "gap-y-8"
}, Pa = {
  none: "gap-x-0",
  1: "gap-x-1",
  2: "gap-x-2",
  3: "gap-x-3",
  4: "gap-x-4",
  5: "gap-x-5",
  6: "gap-x-6",
  8: "gap-x-8"
}, Ht = {
  base: {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
    8: "grid-cols-8",
    12: "grid-cols-12"
  },
  sm: {
    1: "sm:grid-cols-1",
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-3",
    4: "sm:grid-cols-4",
    5: "sm:grid-cols-5",
    6: "sm:grid-cols-6",
    8: "sm:grid-cols-8",
    12: "sm:grid-cols-12"
  },
  md: {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
    5: "md:grid-cols-5",
    6: "md:grid-cols-6",
    8: "md:grid-cols-8",
    12: "md:grid-cols-12"
  },
  lg: {
    1: "lg:grid-cols-1",
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
    5: "lg:grid-cols-5",
    6: "lg:grid-cols-6",
    8: "lg:grid-cols-8",
    12: "lg:grid-cols-12"
  },
  xl: {
    1: "xl:grid-cols-1",
    2: "xl:grid-cols-2",
    3: "xl:grid-cols-3",
    4: "xl:grid-cols-4",
    5: "xl:grid-cols-5",
    6: "xl:grid-cols-6",
    8: "xl:grid-cols-8",
    12: "xl:grid-cols-12"
  }
}, Da = ["base", "sm", "md", "lg", "xl"], Oa = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch"
};
function ja(e) {
  return typeof e == "number" ? [Ht.base[e]] : Da.flatMap((t) => {
    const r = e[t];
    return r === void 0 ? [] : [Ht[t][r]];
  });
}
const Ba = re(function({ children: t, columns: r = 1, gap: n = "4", rowGap: a, columnGap: s, align: i = "stretch", className: l, ...c }, d) {
  return /* @__PURE__ */ o(
    "div",
    {
      ref: d,
      className: S(
        "grid",
        ja(r),
        Ra[n],
        a !== void 0 && La[a],
        s !== void 0 && Pa[s],
        Oa[i],
        l
      ),
      ...c,
      children: t
    }
  );
});
Ba.displayName = "Grid";
const Fa = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  full: "max-w-full"
}, Va = re(function({ children: t, size: r = "lg", gutter: n = !0, as: a = "div", className: s, ...i }, l) {
  return /* @__PURE__ */ o(
    a,
    {
      ref: l,
      className: S("mx-auto w-full", Fa[r], n && "px-5 lg:px-10", s),
      ...i,
      children: t
    }
  );
});
Va.displayName = "Container";
const Ga = {
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  none: "max-w-none"
}, Ha = re(function({ children: t, maxWidth: r = "md", andText: n = !1, fullHeight: a = !1, as: s = "div", className: i, ...l }, c) {
  return /* @__PURE__ */ o(
    s,
    {
      ref: c,
      className: S(
        "mx-auto w-full",
        Ga[r],
        n && "text-center",
        a && "flex min-h-screen flex-col justify-center",
        i
      ),
      ...l,
      children: t
    }
  );
});
Ha.displayName = "Center";
const Ua = re(function({ children: t, focusable: r = !1, as: n = "span", className: a, ...s }, i) {
  return /* @__PURE__ */ o(
    n,
    {
      ref: i,
      className: S(
        "sr-only",
        r && "focus:not-sr-only focus-within:not-sr-only",
        a
      ),
      ...s,
      children: t
    }
  );
});
Ua.displayName = "VisuallyHidden";
function fs({ children: e, ...t }) {
  return /* @__PURE__ */ o(
    Lr,
    {
      attribute: "class",
      defaultTheme: "dark",
      enableSystem: !0,
      disableTransitionOnChange: !1,
      ...t,
      children: e
    }
  );
}
export {
  cs as Accordion,
  ms as AccordionContent,
  ds as AccordionItem,
  us as AccordionTrigger,
  es as Alert,
  sa as AppHeader,
  Gn as Avatar,
  Ja as Badge,
  ss as BottomSheet,
  Ta as Box,
  Zo as Breadcrumbs,
  We as Button,
  Qa as Card,
  lo as CaseStudyContent,
  co as CaseStudyHeader,
  ns as CaseStudyPage,
  mo as CaseStudySections,
  Ha as Center,
  Yn as Checkbox,
  jo as Combobox,
  Va as Container,
  ba as DescriptionList,
  ts as Divider,
  rs as Dropdown,
  Xo as EmptyState,
  Ba as Grid,
  Ma as Inline,
  Dn as Input,
  Na as Kbd,
  ft as Link,
  fo as ListRow,
  ua as LogView,
  xa as Meter,
  Za as Modal,
  ea as Pagination,
  vr as Popover,
  Ho as ProgressBar,
  Jn as Radio,
  Xn as Select,
  ta as SideNav,
  aa as SideNavItem,
  Sr as SideNavSection,
  Ko as Skeleton,
  Qn as Slider,
  lr as Spinner,
  Sa as Stack,
  fa as StatusLine,
  pa as StatusLineSegment,
  dr as Switch,
  Ya as TUI_ICON_GLYPHS,
  $o as Table,
  zo as TableBody,
  Eo as TableCell,
  _o as TableFooter,
  To as TableHead,
  So as TableHeader,
  Io as TableRow,
  ls as Tabs,
  No as TabsContent,
  wo as TabsList,
  ko as TabsTrigger,
  eo as Textarea,
  fs as ThemeProvider,
  is as ThemeToggle,
  ho as Toast,
  as as Toaster,
  qn as Tooltip,
  wa as TreeView,
  q as TuiIcon,
  Ua as VisuallyHidden,
  ia as Window,
  S as cn,
  ha as getMeterTone,
  Qo as getPaginationRange,
  vo as toast,
  os as useToast
};
//# sourceMappingURL=index.esm.js.map

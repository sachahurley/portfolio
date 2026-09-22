import { jsxs as S, jsx as o, Fragment as be } from "react/jsx-runtime";
import ke, { useState as V, useEffect as G, forwardRef as le, useId as ue, useRef as K, useCallback as Ne, useLayoutEffect as Le, isValidElement as At, cloneElement as _t, useImperativeHandle as xr, useSyncExternalStore as Mt, createContext as Pe, useContext as Ie, useMemo as Re, Fragment as vr } from "react";
import { useTheme as yr, ThemeProvider as wr } from "next-themes";
import { createPortal as kr } from "react-dom";
const Nr = { small: "sm", medium: "md", large: "lg" }, bt = /* @__PURE__ */ new Set();
function de(e, t, r = "md") {
  if (e == null) return r;
  const n = Nr[e];
  return n ? (!(process.env.NODE_ENV === "production") && !bt.has(t) && (bt.add(t), console.warn(
    `[@scorp-ds/components] ${t}: size="${e}" is deprecated. Use size="${n}" (the scale is sm | md | lg).`
  )), n) : e;
}
function Ct(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var a = e.length;
    for (t = 0; t < a; t++) e[t] && (r = Ct(e[t])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function Sr() {
  for (var e, t, r = 0, n = "", a = arguments.length; r < a; r++) (e = arguments[r]) && (t = Ct(e)) && (n && (n += " "), n += t);
  return n;
}
const $r = (e, t) => {
  const r = new Array(e.length + t.length);
  for (let n = 0; n < e.length; n++)
    r[n] = e[n];
  for (let n = 0; n < t.length; n++)
    r[e.length + n] = t[n];
  return r;
}, zr = (e, t) => ({
  classGroupId: e,
  validator: t
}), Rt = (e = /* @__PURE__ */ new Map(), t = null, r) => ({
  nextPart: e,
  validators: t,
  classGroupId: r
}), We = "-", ht = [], Ir = "arbitrary..", Tr = (e) => {
  const t = Ar(e), {
    conflictingClassGroups: r,
    conflictingClassGroupModifiers: n
  } = e;
  return {
    getClassGroupId: (i) => {
      if (i.startsWith("[") && i.endsWith("]"))
        return Er(i);
      const l = i.split(We), c = l[0] === "" && l.length > 1 ? 1 : 0;
      return Lt(l, c, t);
    },
    getConflictingClassGroupIds: (i, l) => {
      if (l) {
        const c = n[i], d = r[i];
        return c ? d ? $r(d, c) : c : d || ht;
      }
      return r[i] || ht;
    }
  };
}, Lt = (e, t, r) => {
  if (e.length - t === 0)
    return r.classGroupId;
  const a = e[t], s = r.nextPart.get(a);
  if (s) {
    const d = Lt(e, t + 1, s);
    if (d) return d;
  }
  const i = r.validators;
  if (i === null)
    return;
  const l = t === 0 ? e.join(We) : e.slice(t).join(We), c = i.length;
  for (let d = 0; d < c; d++) {
    const u = i[d];
    if (u.validator(l))
      return u.classGroupId;
  }
}, Er = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const t = e.slice(1, -1), r = t.indexOf(":"), n = t.slice(0, r);
  return n ? Ir + n : void 0;
})(), Ar = (e) => {
  const {
    theme: t,
    classGroups: r
  } = e;
  return _r(r, t);
}, _r = (e, t) => {
  const r = Rt();
  for (const n in e) {
    const a = e[n];
    st(a, r, n, t);
  }
  return r;
}, st = (e, t, r, n) => {
  const a = e.length;
  for (let s = 0; s < a; s++) {
    const i = e[s];
    Mr(i, t, r, n);
  }
}, Mr = (e, t, r, n) => {
  if (typeof e == "string") {
    Cr(e, t, r);
    return;
  }
  if (typeof e == "function") {
    Rr(e, t, r, n);
    return;
  }
  Lr(e, t, r, n);
}, Cr = (e, t, r) => {
  const n = e === "" ? t : Pt(t, e);
  n.classGroupId = r;
}, Rr = (e, t, r, n) => {
  if (Pr(e)) {
    st(e(n), t, r, n);
    return;
  }
  t.validators === null && (t.validators = []), t.validators.push(zr(r, e));
}, Lr = (e, t, r, n) => {
  const a = Object.entries(e), s = a.length;
  for (let i = 0; i < s; i++) {
    const [l, c] = a[i];
    st(c, Pt(t, l), r, n);
  }
}, Pt = (e, t) => {
  let r = e;
  const n = t.split(We), a = n.length;
  for (let s = 0; s < a; s++) {
    const i = n[s];
    let l = r.nextPart.get(i);
    l || (l = Rt(), r.nextPart.set(i, l)), r = l;
  }
  return r;
}, Pr = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, Dr = (e) => {
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
}, rt = "!", gt = ":", Or = [], xt = (e, t, r, n, a) => ({
  modifiers: e,
  hasImportantModifier: t,
  baseClassName: r,
  maybePostfixModifierPosition: n,
  isExternal: a
}), jr = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: r
  } = e;
  let n = (a) => {
    const s = [];
    let i = 0, l = 0, c = 0, d;
    const u = a.length;
    for (let x = 0; x < u; x++) {
      const h = a[x];
      if (i === 0 && l === 0) {
        if (h === gt) {
          s.push(a.slice(c, x)), c = x + 1;
          continue;
        }
        if (h === "/") {
          d = x;
          continue;
        }
      }
      h === "[" ? i++ : h === "]" ? i-- : h === "(" ? l++ : h === ")" && l--;
    }
    const m = s.length === 0 ? a : a.slice(c);
    let f = m, b = !1;
    m.endsWith(rt) ? (f = m.slice(0, -1), b = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      m.startsWith(rt) && (f = m.slice(1), b = !0)
    );
    const p = d && d > c ? d - c : void 0;
    return xt(s, b, f, p);
  };
  if (t) {
    const a = t + gt, s = n;
    n = (i) => i.startsWith(a) ? s(i.slice(a.length)) : xt(Or, !1, i, void 0, !0);
  }
  if (r) {
    const a = n;
    n = (s) => r({
      className: s,
      parseClassName: a
    });
  }
  return n;
}, Br = (e) => {
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
}, Fr = (e) => ({
  cache: Dr(e.cacheSize),
  parseClassName: jr(e),
  sortModifiers: Br(e),
  ...Tr(e)
}), Vr = /\s+/, Gr = (e, t) => {
  const {
    parseClassName: r,
    getClassGroupId: n,
    getConflictingClassGroupIds: a,
    sortModifiers: s
  } = t, i = [], l = e.trim().split(Vr);
  let c = "";
  for (let d = l.length - 1; d >= 0; d -= 1) {
    const u = l[d], {
      isExternal: m,
      modifiers: f,
      hasImportantModifier: b,
      baseClassName: p,
      maybePostfixModifierPosition: x
    } = r(u);
    if (m) {
      c = u + (c.length > 0 ? " " + c : c);
      continue;
    }
    let h = !!x, $ = n(h ? p.substring(0, x) : p);
    if (!$) {
      if (!h) {
        c = u + (c.length > 0 ? " " + c : c);
        continue;
      }
      if ($ = n(p), !$) {
        c = u + (c.length > 0 ? " " + c : c);
        continue;
      }
      h = !1;
    }
    const g = f.length === 0 ? "" : f.length === 1 ? f[0] : s(f).join(":"), N = b ? g + rt : g, k = N + $;
    if (i.indexOf(k) > -1)
      continue;
    i.push(k);
    const v = a($, h);
    for (let z = 0; z < v.length; ++z) {
      const R = v[z];
      i.push(N + R);
    }
    c = u + (c.length > 0 ? " " + c : c);
  }
  return c;
}, Ur = (...e) => {
  let t = 0, r, n, a = "";
  for (; t < e.length; )
    (r = e[t++]) && (n = Dt(r)) && (a && (a += " "), a += n);
  return a;
}, Dt = (e) => {
  if (typeof e == "string")
    return e;
  let t, r = "";
  for (let n = 0; n < e.length; n++)
    e[n] && (t = Dt(e[n])) && (r && (r += " "), r += t);
  return r;
}, Hr = (e, ...t) => {
  let r, n, a, s;
  const i = (c) => {
    const d = t.reduce((u, m) => m(u), e());
    return r = Fr(d), n = r.cache.get, a = r.cache.set, s = l, l(c);
  }, l = (c) => {
    const d = n(c);
    if (d)
      return d;
    const u = Gr(c, r);
    return a(c, u), u;
  };
  return s = i, (...c) => s(Ur(...c));
}, Wr = [], ie = (e) => {
  const t = (r) => r[e] || Wr;
  return t.isThemeGetter = !0, t;
}, Ot = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, jt = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Xr = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, qr = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Kr = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Yr = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Zr = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Jr = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, ye = (e) => Xr.test(e), j = (e) => !!e && !Number.isNaN(Number(e)), we = (e) => !!e && Number.isInteger(Number(e)), Ye = (e) => e.endsWith("%") && j(e.slice(0, -1)), xe = (e) => qr.test(e), Bt = () => !0, Qr = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Kr.test(e) && !Yr.test(e)
), it = () => !1, en = (e) => Zr.test(e), tn = (e) => Jr.test(e), rn = (e) => !_(e) && !M(e), nn = (e) => Se(e, Gt, it), _ = (e) => Ot.test(e), ze = (e) => Se(e, Ut, Qr), vt = (e) => Se(e, mn, j), on = (e) => Se(e, Wt, Bt), an = (e) => Se(e, Ht, it), yt = (e) => Se(e, Ft, it), sn = (e) => Se(e, Vt, tn), Ve = (e) => Se(e, Xt, en), M = (e) => jt.test(e), Ae = (e) => Te(e, Ut), ln = (e) => Te(e, Ht), wt = (e) => Te(e, Ft), cn = (e) => Te(e, Gt), dn = (e) => Te(e, Vt), Ge = (e) => Te(e, Xt, !0), un = (e) => Te(e, Wt, !0), Se = (e, t, r) => {
  const n = Ot.exec(e);
  return n ? n[1] ? t(n[1]) : r(n[2]) : !1;
}, Te = (e, t, r = !1) => {
  const n = jt.exec(e);
  return n ? n[1] ? t(n[1]) : r : !1;
}, Ft = (e) => e === "position" || e === "percentage", Vt = (e) => e === "image" || e === "url", Gt = (e) => e === "length" || e === "size" || e === "bg-size", Ut = (e) => e === "length", mn = (e) => e === "number", Ht = (e) => e === "family-name", Wt = (e) => e === "number" || e === "weight", Xt = (e) => e === "shadow", fn = () => {
  const e = ie("color"), t = ie("font"), r = ie("text"), n = ie("font-weight"), a = ie("tracking"), s = ie("leading"), i = ie("breakpoint"), l = ie("container"), c = ie("spacing"), d = ie("radius"), u = ie("shadow"), m = ie("inset-shadow"), f = ie("text-shadow"), b = ie("drop-shadow"), p = ie("blur"), x = ie("perspective"), h = ie("aspect"), $ = ie("ease"), g = ie("animate"), N = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], k = () => [
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
  ], v = () => [...k(), M, _], z = () => ["auto", "hidden", "clip", "visible", "scroll"], R = () => ["auto", "contain", "none"], y = () => [M, _, c], B = () => [ye, "full", "auto", ...y()], L = () => [we, "none", "subgrid", M, _], ee = () => ["auto", {
    span: ["full", we, M, _]
  }, we, M, _], te = () => [we, "auto", M, _], ne = () => ["auto", "min", "max", "fr", M, _], Q = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], H = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], C = () => ["auto", ...y()], I = () => [ye, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...y()], P = () => [ye, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...y()], U = () => [ye, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...y()], w = () => [e, M, _], F = () => [...k(), wt, yt, {
    position: [M, _]
  }], T = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], D = () => ["auto", "cover", "contain", cn, nn, {
    size: [M, _]
  }], W = () => [Ye, Ae, ze], Z = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    d,
    M,
    _
  ], J = () => ["", j, Ae, ze], pe = () => ["solid", "dashed", "dotted", "double"], ce = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], q = () => [j, Ye, wt, yt], X = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    p,
    M,
    _
  ], O = () => ["none", j, M, _], re = () => ["none", j, M, _], se = () => [j, M, _], oe = () => [ye, "full", ...y()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [xe],
      breakpoint: [xe],
      color: [Bt],
      container: [xe],
      "drop-shadow": [xe],
      ease: ["in", "out", "in-out"],
      font: [rn],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [xe],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [xe],
      shadow: [xe],
      spacing: ["px", j],
      text: [xe],
      "text-shadow": [xe],
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
        aspect: ["auto", "square", ye, _, M, h]
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
        columns: [j, _, M, l]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": N()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": N()
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
        object: v()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: z()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": z()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": z()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: R()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": R()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": R()
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
        inset: B()
      }],
      /**
       * Inset Inline
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": B()
      }],
      /**
       * Inset Block
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": B()
      }],
      /**
       * Inset Inline Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-s` in next major release
       */
      start: [{
        "inset-s": B(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        start: B()
      }],
      /**
       * Inset Inline End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-e` in next major release
       */
      end: [{
        "inset-e": B(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        end: B()
      }],
      /**
       * Inset Block Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-bs": [{
        "inset-bs": B()
      }],
      /**
       * Inset Block End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-be": [{
        "inset-be": B()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: B()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: B()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: B()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: B()
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
        z: [we, "auto", M, _]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [ye, "full", "auto", l, ...y()]
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
        flex: [j, ye, "auto", "initial", "none", _]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", j, M, _]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", j, M, _]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [we, "first", "last", "none", M, _]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": L()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ee()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": te()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": te()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": L()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ee()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": te()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": te()
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
        "auto-cols": ne()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ne()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: y()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": y()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": y()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...Q(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...H(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...H()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...Q()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...H(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...H(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": Q()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...H(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...H()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: y()
      }],
      /**
       * Padding Inline
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: y()
      }],
      /**
       * Padding Block
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: y()
      }],
      /**
       * Padding Inline Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: y()
      }],
      /**
       * Padding Inline End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: y()
      }],
      /**
       * Padding Block Start
       * @see https://tailwindcss.com/docs/padding
       */
      pbs: [{
        pbs: y()
      }],
      /**
       * Padding Block End
       * @see https://tailwindcss.com/docs/padding
       */
      pbe: [{
        pbe: y()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: y()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: y()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: y()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: y()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: C()
      }],
      /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: C()
      }],
      /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: C()
      }],
      /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: C()
      }],
      /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: C()
      }],
      /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */
      mbs: [{
        mbs: C()
      }],
      /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */
      mbe: [{
        mbe: C()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: C()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: C()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: C()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: C()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": y()
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
        "space-y": y()
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
        size: I()
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
        block: ["auto", ...U()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-block-size": [{
        "min-block": ["auto", ...U()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-block-size": [{
        "max-block": ["none", ...U()]
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [l, "screen", ...I()]
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
          ...I()
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
          ...I()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...I()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...I()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...I()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", r, Ae, ze]
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
        font: [n, un, on]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", Ye, _]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [ln, an, t]
      }],
      /**
       * Font Feature Settings
       * @see https://tailwindcss.com/docs/font-feature-settings
       */
      "font-features": [{
        "font-features": [_]
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
        tracking: [a, M, _]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [j, "none", M, vt]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          s,
          ...y()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", M, _]
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
        list: ["disc", "decimal", "none", M, _]
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
        decoration: [...pe(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [j, "from-font", "auto", M, ze]
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
        "underline-offset": [j, "auto", M, _]
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
        indent: y()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", M, _]
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
        content: ["none", M, _]
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
        bg: F()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: T()
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
          }, we, M, _],
          radial: ["", M, _],
          conic: [we, M, _]
        }, dn, sn]
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
        from: W()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: W()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: W()
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
        rounded: Z()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": Z()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": Z()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": Z()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": Z()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": Z()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": Z()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": Z()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": Z()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": Z()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": Z()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": Z()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": Z()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": Z()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": Z()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: J()
      }],
      /**
       * Border Width Inline
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": J()
      }],
      /**
       * Border Width Block
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": J()
      }],
      /**
       * Border Width Inline Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": J()
      }],
      /**
       * Border Width Inline End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": J()
      }],
      /**
       * Border Width Block Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-bs": [{
        "border-bs": J()
      }],
      /**
       * Border Width Block End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-be": [{
        "border-be": J()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": J()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": J()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": J()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": J()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": J()
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
        "divide-y": J()
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
        border: [...pe(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...pe(), "hidden", "none"]
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
        outline: [...pe(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [j, M, _]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", j, Ae, ze]
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
          Ge,
          Ve
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
        "inset-shadow": ["none", m, Ge, Ve]
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
        ring: J()
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
        "ring-offset": [j, ze]
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
        "inset-ring": J()
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
        "text-shadow": ["none", f, Ge, Ve]
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
        opacity: [j, M, _]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...ce(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": ce()
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
        "mask-linear": [j]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": q()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": q()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": w()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": w()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": q()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": q()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": w()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": w()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": q()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": q()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": w()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": w()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": q()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": q()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": w()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": w()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": q()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": q()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": w()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": w()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": q()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": q()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": w()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": w()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": q()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": q()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": w()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": w()
      }],
      "mask-image-radial": [{
        "mask-radial": [M, _]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": q()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": q()
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
        "mask-conic": [j]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": q()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": q()
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
        mask: F()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: T()
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
        mask: ["none", M, _]
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
          M,
          _
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: X()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [j, M, _]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [j, M, _]
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
          b,
          Ge,
          Ve
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
        grayscale: ["", j, M, _]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [j, M, _]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", j, M, _]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [j, M, _]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", j, M, _]
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
          M,
          _
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": X()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [j, M, _]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [j, M, _]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", j, M, _]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [j, M, _]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", j, M, _]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [j, M, _]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [j, M, _]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", j, M, _]
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
        "border-spacing": y()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": y()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": y()
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
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", M, _]
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
        duration: [j, "initial", M, _]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", $, M, _]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [j, M, _]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", g, M, _]
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
        perspective: [x, M, _]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": v()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: O()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": O()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": O()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": O()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: re()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": re()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": re()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": re()
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
        skew: se()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": se()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": se()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [M, _, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: v()
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
        translate: oe()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": oe()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": oe()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": oe()
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", M, _]
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
        "scroll-m": y()
      }],
      /**
       * Scroll Margin Inline
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": y()
      }],
      /**
       * Scroll Margin Block
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": y()
      }],
      /**
       * Scroll Margin Inline Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": y()
      }],
      /**
       * Scroll Margin Inline End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": y()
      }],
      /**
       * Scroll Margin Block Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbs": [{
        "scroll-mbs": y()
      }],
      /**
       * Scroll Margin Block End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbe": [{
        "scroll-mbe": y()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": y()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": y()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": y()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": y()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": y()
      }],
      /**
       * Scroll Padding Inline
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": y()
      }],
      /**
       * Scroll Padding Block
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": y()
      }],
      /**
       * Scroll Padding Inline Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": y()
      }],
      /**
       * Scroll Padding Inline End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": y()
      }],
      /**
       * Scroll Padding Block Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbs": [{
        "scroll-pbs": y()
      }],
      /**
       * Scroll Padding Block End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbe": [{
        "scroll-pbe": y()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": y()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": y()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": y()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": y()
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
        "will-change": ["auto", "scroll", "contents", "transform", M, _]
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
        stroke: [j, Ae, ze, vt]
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
}, pn = /* @__PURE__ */ Hr(fn);
function E(...e) {
  return pn(Sr(e));
}
const Ce = [
  [0, 0],
  [3, 0],
  [6, 0],
  [6, 3],
  [6, 6],
  [3, 6],
  [0, 6],
  [0, 3]
], bn = 2, hn = 100, kt = "(prefers-reduced-motion: reduce)";
function qt(e) {
  return Ce.filter((t, r) => e === null || (r - e + Ce.length) % Ce.length >= bn).map(([t, r]) => `M${t} ${r}h2v2h-2Z`).join("");
}
const gn = Ce.map((e, t) => qt(t)), xn = qt(null);
function vn() {
  const [e, t] = V(
    () => typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia(kt).matches
  );
  return G(() => {
    var a;
    if (typeof window > "u" || typeof window.matchMedia != "function") return;
    const r = window.matchMedia(kt), n = () => t(r.matches);
    return n(), (a = r.addEventListener) == null || a.call(r, "change", n), () => {
      var s;
      return (s = r.removeEventListener) == null ? void 0 : s.call(r, "change", n);
    };
  }, []), e;
}
function Kt({ size: e = "md", label: t = "Loading", className: r }) {
  const n = de(e, "Spinner"), a = vn(), [s, i] = V(0);
  G(() => {
    if (a) return;
    const u = setInterval(() => i((m) => (m + 1) % Ce.length), hn);
    return () => clearInterval(u);
  }, [a]);
  const l = {
    sm: { box: "w-3 h-3", pixel: 1.5 },
    md: { box: "w-4 h-4", pixel: 2 },
    lg: { box: "w-6 h-6", pixel: 3 }
  }, { box: c, pixel: d } = l[n];
  return /* @__PURE__ */ S("span", { role: "status", className: E("inline-flex shrink-0 items-center justify-center", c, r), children: [
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
        children: /* @__PURE__ */ o("path", { d: a ? xn : gn[s] })
      }
    ),
    /* @__PURE__ */ o("span", { className: "sr-only", children: t })
  ] });
}
Kt.displayName = "Spinner";
const De = le(
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
    "aria-labelledby": b,
    ...p
  }, x) => {
    const h = de(t, "Button", "md"), $ = `
      inline-flex items-center justify-center
      font-mono text-sm
      transition-colors [transition-duration:var(--duration-fast)]
      cursor-pointer
      disabled:cursor-not-allowed disabled:opacity-50
      focus:outline-none
      focus-visible:![box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--btn-ring)]
    `, g = () => e === "icon" ? !0 : !a || typeof a == "string" || typeof a == "number" ? !1 : typeof a == "object" && a !== null && "type" in a ? typeof a.type < "u" : Array.isArray(a) ? a.every(
      (C) => typeof C == "object" && C !== null && "type" in C
    ) : !1;
    G(() => {
      if (process.env.NODE_ENV === "production" || !(e === "icon" || g())) return;
      f != null && String(f).trim() !== "" || b != null && String(b).trim() !== "" || console.warn(
        "[@scorp-ds/components] Button: icon-only buttons should include aria-label or aria-labelledby for screen readers."
      );
    }, [e, h, a, s, i, f, b]), G(() => {
      process.env.NODE_ENV === "production" || h !== "icon" || console.warn(
        '[@scorp-ds/components] Button: size="icon" is deprecated. Icon-only buttons are squared automatically; use size="md".'
      );
    }, [h]);
    const N = () => {
      if (g() || e === "icon")
        switch (h) {
          case "sm":
            return "size-control-sm plate-round";
          case "lg":
            return "size-control-lg plate-round";
          case "icon":
            return "size-control-md plate-round";
          default:
            return "size-control-md plate-round";
        }
      switch (h) {
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
    }, v = {
      sm: "w-4 h-4",
      // 16px
      md: "w-5 h-5",
      // 20px
      lg: "w-6 h-6",
      // 24px
      icon: "w-5 h-5"
      // 20px
    }, z = {
      sm: "gap-1.5",
      // 6px - tighter for visual balance in compact buttons
      md: "gap-2",
      // 8px - standard spacing
      lg: "gap-2.5",
      // 10px - more breathing room for larger buttons
      icon: "gap-0"
      // No gap for icon-only
    }, R = (C) => C ? typeof C == "object" && C !== null && "type" in C ? /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center shrink-0 ${v[h]}`, children: C }) : C : null, y = () => {
      if (g() && a) {
        const I = h === "icon" ? "md" : h;
        return typeof a == "object" && a !== null && "type" in a ? /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center shrink-0 ${v[I]}`, children: a }) : /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center shrink-0 ${v[I]}`, children: a });
      }
      return a;
    }, B = {
      "--btn-ring": e === "primary" || e === "link" ? "var(--focus-ring-primary)" : e === "destructive" ? "var(--focus-ring-destructive)" : e === "icon" ? "var(--focus-ring-icon)" : "var(--focus-ring-secondary)",
      outline: "none"
    }, L = u && !r, ee = (C) => {
      if (L) {
        C.preventDefault();
        return;
      }
      m == null || m(C);
    }, te = h === "icon" ? "md" : h, ne = L ? "relative cursor-progress" : "", Q = /* @__PURE__ */ S(be, { children: [
      s && R(s),
      y(),
      i && R(i)
    ] }), H = L ? /* @__PURE__ */ S(be, { children: [
      /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center opacity-0 ${z[h]}`, children: Q }),
      /* @__PURE__ */ o("span", { "aria-hidden": "true", className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ o(Kt, { size: te }) })
    ] }) : Q;
    return l ? /* @__PURE__ */ o(
      "a",
      {
        ref: x,
        href: r ? void 0 : l,
        target: c,
        rel: d,
        "aria-disabled": r || L || void 0,
        "aria-busy": L || void 0,
        className: `${$} ${N()} ${k[e]} ${z[h]} ${ne} no-underline ${r ? "pointer-events-none opacity-50" : ""} ${n}`,
        style: B,
        "aria-label": f,
        "aria-labelledby": b,
        onClick: ee,
        ...p,
        children: H
      }
    ) : /* @__PURE__ */ o(
      "button",
      {
        ref: x,
        disabled: r,
        className: `${$} ${N()} ${k[e]} ${z[h]} ${ne} ${n}`,
        style: B,
        "aria-label": f,
        "aria-labelledby": b,
        "aria-disabled": L || void 0,
        "aria-busy": L || void 0,
        onClick: ee,
        ...p,
        children: H
      }
    );
  }
);
De.displayName = "Button";
const Qo = {
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
}, yn = {
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
function wn(e) {
  let t = "";
  return e.forEach((r, n) => {
    for (const a of r.matchAll(/#+/g))
      t += `M${a.index} ${n}h${a[0].length}v1h-${a[0].length}Z`;
  }), t;
}
const kn = Object.fromEntries(
  Object.entries(yn).map(([e, t]) => [e, wn(t)])
), Nt = {
  3: { box: "w-3 h-3 text-xs", pixel: 1.5 },
  4: { box: "w-4 h-4 text-sm", pixel: 2 },
  5: { box: "w-5 h-5 text-base", pixel: 2 },
  6: { box: "w-6 h-6 text-lg", pixel: 3 },
  8: { box: "w-8 h-8 text-2xl", pixel: 4 }
}, Y = ({
  name: e,
  size: t = "4",
  className: r
}) => {
  const n = kn[e], { box: a, pixel: s } = Nt[t] ?? Nt[4];
  return /* @__PURE__ */ o(
    "span",
    {
      className: E(
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
}, St = (e) => e != null && e !== !1 && e !== "";
function Oe({ error: e, helperText: t, errorMessage: r, describedBy: n }) {
  const a = ue(), s = St(r), i = !s && St(t), l = s || i ? `${a}-message` : void 0;
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
function je({
  id: e,
  tone: t,
  children: r,
  className: n = ""
}) {
  return e == null ? null : /* @__PURE__ */ S(
    "p",
    {
      id: e,
      className: `flex items-start gap-1.5 font-mono text-xs ${t === "error" ? "text-error-700 dark:text-error-400" : "text-[var(--text-secondary)]"} ${n}`,
      children: [
        t === "error" && /* @__PURE__ */ o("span", { className: "flex h-[1lh] shrink-0 items-center", children: /* @__PURE__ */ o(Y, { name: "AlertCircle", size: "3" }) }),
        /* @__PURE__ */ o("span", { children: r })
      ]
    }
  );
}
const Nn = le(
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
    const f = de(e, "Input"), b = Oe({ error: r, helperText: n, errorMessage: a, describedBy: d }), p = b.invalid, x = ue(), h = c ?? (l != null && l !== "" ? x : void 0), $ = `
      w-full
      font-mono text-sm
      transition-colors [transition-duration:var(--duration-fast)]
      placeholder:text-[var(--field-placeholder)]
      disabled:cursor-not-allowed disabled:opacity-50
      focus:outline-none
    `, g = {
      sm: "h-control-sm px-3 py-1.5 plate-round",
      md: "h-control-md px-4 py-2.5 plate-round",
      lg: "h-control-lg px-5 py-3.5 plate-round"
    }, N = p ? "bg-[var(--field-background-error)] text-[var(--text-primary)]" : "bg-[var(--field-background)] text-[var(--text-primary)]", k = p ? "bg-[var(--field-border-error)]" : "bg-[var(--field-border)] hover:bg-[var(--field-border-hover)] focus-within:!bg-[var(--field-border-focus)]", v = p ? "border-b border-[var(--field-border-error)] focus:border-[var(--field-border-error)]" : "border-b border-[var(--field-border)] hover:border-[var(--field-border-hover)] focus:!border-[var(--field-border-focus)]", z = t === "quiet" ? /* @__PURE__ */ o(
      "input",
      {
        ref: m,
        id: h,
        disabled: s,
        "aria-invalid": p || void 0,
        "aria-describedby": b.describedBy,
        className: `${$} ${g[f].replace("plate-round", "rounded-none")} !px-0 bg-transparent text-[var(--text-primary)] ${v} ${i}`,
        ...u
      }
    ) : /* @__PURE__ */ o(
      "div",
      {
        className: `w-full plate-round p-px transition-colors [transition-duration:var(--duration-fast)] ${k}`,
        children: /* @__PURE__ */ o(
          "input",
          {
            ref: m,
            id: h,
            disabled: s,
            "aria-invalid": p || void 0,
            "aria-describedby": b.describedBy,
            className: `${$} ${g[f]} ${N} ${i}`,
            ...u
          }
        )
      }
    ), R = l != null && l !== "";
    return !R && !b.hasMessage ? z : /* @__PURE__ */ S("div", { className: "w-full space-y-1", children: [
      R && /* @__PURE__ */ o(
        "label",
        {
          htmlFor: h,
          className: "block font-mono text-sm text-secondary-800 dark:text-secondary-200",
          children: l
        }
      ),
      z,
      /* @__PURE__ */ o(je, { ...b.message })
    ] });
  }
);
Nn.displayName = "Input";
function ea({ isOpen: e, onClose: t, title: r, children: n, footerContent: a, width: s = 740, docked: i = !1 }) {
  const l = K(null), c = K(null), [d, u] = V(e);
  G(() => {
    e && u(!0);
  }, [e]);
  const m = d && !e, [f, b] = V(
    () => typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(min-width: 960px)").matches
  );
  G(() => {
    if (typeof window.matchMedia != "function") return;
    const $ = window.matchMedia("(min-width: 960px)"), g = () => b($.matches);
    return $.addEventListener("change", g), () => $.removeEventListener("change", g);
  }, []);
  const p = i && f, x = e && d;
  if (G(() => {
    var $;
    if (x)
      return c.current = document.activeElement, ($ = l.current) == null || $.focus(), () => {
        var g;
        (g = c.current) == null || g.focus(), c.current = null;
      };
  }, [x]), G(() => {
    const $ = (g) => {
      g.key === "Escape" && t();
    };
    return e && document.addEventListener("keydown", $), () => {
      document.removeEventListener("keydown", $);
    };
  }, [e, t]), G(() => (e && !p ? document.body.style.overflow = "hidden" : document.body.style.overflow = "unset", () => {
    document.body.style.overflow = "unset";
  }), [e, p]), !d) return null;
  const h = /* @__PURE__ */ o(
    "div",
    {
      ref: l,
      tabIndex: -1,
      className: "max-w-full max-h-[80vh] plate-round-lg p-px bg-[var(--surface-container-stroke)] flex focus:outline-none",
      style: { width: typeof s == "number" ? `${s}px` : s },
      role: "dialog",
      "aria-modal": p ? void 0 : "true",
      "aria-label": r,
      onClick: ($) => $.stopPropagation(),
      children: /* @__PURE__ */ S("div", { className: "w-full plate-round-lg bg-[var(--surface-card)] flex flex-col overflow-hidden", children: [
        /* @__PURE__ */ S("div", { className: "flex items-center justify-between px-6 py-5 border-b-[0.5px] border-solid border-[var(--surface-container-stroke)]", children: [
          /* @__PURE__ */ o("h2", { className: "text-base font-mono text-[var(--text-primary)] font-medium flex-1 min-w-0 truncate", children: r }),
          /* @__PURE__ */ o(
            De,
            {
              variant: "secondary",
              size: "sm",
              type: "button",
              onClick: t,
              "aria-label": "Close modal",
              className: "ml-4 shrink-0",
              children: /* @__PURE__ */ o(Y, { name: "X" })
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "overflow-y-auto px-6 py-5", tabIndex: 0, children: n }),
        a && /* @__PURE__ */ o("div", { className: "flex items-center justify-end gap-3 px-6 py-5 border-t-[0.5px] border-solid border-[var(--surface-container-stroke)]", children: a })
      ] })
    }
  );
  return p ? /* @__PURE__ */ o(
    "div",
    {
      className: `fixed inset-x-0 mx-auto w-fit max-w-full ${m ? "animate-out fade-out fill-mode-forwards" : "animate-in fade-in"}`,
      style: {
        zIndex: "var(--z-index-modal)",
        bottom: "48px",
        animationDuration: "var(--duration-normal)",
        filter: "drop-shadow(0 10px 40px rgba(0, 0, 0, 0.35))"
      },
      onAnimationEnd: () => {
        m && u(!1);
      },
      children: h
    }
  ) : /* @__PURE__ */ o(be, { children: /* @__PURE__ */ o(
    "div",
    {
      className: `fixed inset-0 flex items-center justify-center p-5 bg-[var(--surface-overlay)] ${m ? "animate-out fade-out fill-mode-forwards" : "animate-in fade-in"}`,
      style: { zIndex: "var(--z-index-modal)", animationDuration: "var(--duration-normal)" },
      onClick: t,
      onAnimationEnd: () => {
        m && u(!1);
      },
      children: h
    }
  ) });
}
function ta({
  title: e,
  subtitle: t,
  headerContent: r,
  children: n,
  footerContent: a,
  className: s = ""
}) {
  const i = s.includes("flex");
  return /* @__PURE__ */ o(
    "div",
    {
      className: `
        plate-round-lg p-px bg-[var(--surface-container-stroke)]
        ${i ? "flex flex-col" : ""}
        ${s}
      `,
      children: /* @__PURE__ */ S(
        "div",
        {
          className: `
        plate-round-lg bg-[var(--surface-card)] h-full w-full
        ${i ? "flex flex-col flex-1 min-h-0" : ""}
      `,
          children: [
            (e || t || r) && /* @__PURE__ */ o("div", { className: "p-4 lg:p-6 border-b-[0.5px] border-solid border-[var(--surface-container-stroke)] overflow-hidden rounded-none", children: r || /* @__PURE__ */ S("div", { children: [
              e && /* @__PURE__ */ o("h3", { className: "text-base font-mono font-bold text-[var(--text-primary)] mb-1", children: e }),
              t && /* @__PURE__ */ o("p", { className: "font-mono text-sm text-secondary-800 dark:text-secondary-300", children: t })
            ] }) }),
            /* @__PURE__ */ o("div", { className: `p-4 lg:p-6 ${i ? "flex-1 flex flex-col min-h-0" : ""}`, children: n }),
            a && /* @__PURE__ */ o("div", { className: "p-4 lg:p-6 border-t-[0.5px] border-solid border-[var(--surface-container-stroke)] overflow-hidden", children: a })
          ]
        }
      )
    }
  );
}
function ra({
  variant: e = "default",
  size: t = "md",
  caps: r = !1,
  dashed: n = !1,
  children: a,
  iconLeft: s,
  onClose: i,
  className: l = ""
}) {
  const c = de(t, "Badge"), d = {
    sm: "h-5 px-2 py-1 text-xs",
    // h-5 = 20px, px-2 = 8px, text-xs = 12px
    md: "h-6 px-2.5 py-1 text-xs",
    // h-6 = 24px, px-2.5 = 10px, text-xs = 12px
    lg: "h-7 px-3 py-1.5 text-sm"
    // h-7 = 28px, px-3 = 12px, text-sm = 14px
  }, u = {
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
  }, m = {
    default: "border-current text-secondary-800 dark:text-secondary-200",
    primary: "border-current text-primary-800 dark:text-primary-300",
    success: "border-current text-success-800 dark:text-success-300",
    warning: "border-current text-warning-800 dark:text-warning-300",
    error: "border-current text-error-800 dark:text-error-300",
    info: "border-current text-info-800 dark:text-info-300",
    bone: "border-secondary-500 text-secondary-800 dark:text-secondary-200"
  }, f = {
    sm: "w-3 h-3",
    // 12px
    md: "w-3.5 h-3.5",
    // 14px
    lg: "w-4 h-4"
    // 16px
  };
  return /* @__PURE__ */ S(
    "span",
    {
      className: `
        inline-flex items-center gap-1.5
        font-mono font-medium
        ${n ? `rounded-none border border-dashed bg-transparent ${m[e]}` : `plate-round ${u[e]}`}
        ${d[c]}
        ${r ? "uppercase [letter-spacing:.08em]" : ""}
        ${l}
      `,
      children: [
        s && /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center ${f[c]} flex-shrink-0`, children: s }),
        /* @__PURE__ */ o("span", { className: "inline-flex items-center", children: a }),
        i && /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            onClick: (b) => {
              b.stopPropagation(), i();
            },
            className: `
            inline-flex items-center justify-center
            font-mono font-bold
            text-secondary-800 dark:text-secondary-200
            hover:text-error-700 dark:hover:text-error-400
            transition-colors [transition-duration:var(--duration-fast)]
            flex-shrink-0
            focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring-primary)]
            focus:ring-offset-1 focus:ring-offset-[var(--focus-offset-color)]
          `,
            "aria-label": "Remove badge",
            children: /* @__PURE__ */ o(Y, { name: "X", size: "3" })
          }
        )
      ]
    }
  );
}
function na({
  variant: e = "default",
  title: t,
  description: r,
  iconLeft: n,
  onClose: a,
  className: s = ""
}) {
  const l = n || /* @__PURE__ */ o(Y, { name: {
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
  }[e];
  return /* @__PURE__ */ o("div", { role: "alert", className: `plate-round p-px ${d.ring} ${s}`, children: /* @__PURE__ */ S(
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
        /* @__PURE__ */ S("div", { className: "flex-1 min-w-0", children: [
          t && /* @__PURE__ */ o("h4", { className: `font-mono text-sm font-bold mb-1 ${d.title}`, children: t }),
          r && /* @__PURE__ */ o("div", { className: `font-mono text-sm ${d.description}`, children: r })
        ] }),
        a && /* @__PURE__ */ o(
          "button",
          {
            onClick: a,
            className: `
            flex-shrink-0
            font-mono text-xs font-bold
            ${d.description}
            hover:text-error-800 dark:hover:text-error-300
            transition-colors [transition-duration:var(--duration-fast)]
            focus:outline-none focus:ring-1 focus:ring-offset-1
          `,
            "aria-label": "Close alert",
            children: /* @__PURE__ */ o(Y, { name: "X", size: "3" })
          }
        )
      ]
    }
  ) });
}
function Sn({
  src: e,
  alt: t,
  initials: r,
  icon: n,
  size: a = "md",
  status: s,
  className: i = "",
  onError: l
}) {
  const c = de(a, "Avatar", "md"), [d, u] = V(!1), f = {
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
  }[c], b = () => {
    u(!0), l && l();
  }, p = e && !d, x = !p && r, h = !p && !x && n, $ = !p && !x && !h, g = {
    online: "bg-success-600 dark:bg-success-500",
    offline: "bg-secondary-500 dark:bg-secondary-600",
    away: "bg-warning-600 dark:bg-warning-500"
  };
  return /* @__PURE__ */ S("div", { className: `relative inline-block ${f.container} ${i}`, children: [
    /* @__PURE__ */ S(
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
          p && /* @__PURE__ */ o(
            "img",
            {
              src: e,
              alt: t || "Avatar",
              className: "w-full h-full object-cover",
              onError: b
            }
          ),
          x && /* @__PURE__ */ o("span", { className: "select-none", children: r }),
          h && /* @__PURE__ */ o("div", { className: `${f.icon} inline-flex items-center justify-center leading-none text-secondary-700 dark:text-secondary-300`, children: n }),
          $ && /* @__PURE__ */ o("span", { className: `${f.icon} inline-flex items-center justify-center font-mono font-bold text-secondary-900 dark:text-secondary-100`, "aria-hidden": "true", children: "@" })
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
function oa({
  variant: e = "horizontal",
  text: t,
  spacing: r = "md",
  className: n = ""
}) {
  const a = de(r, "Divider", "md"), s = {
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
  ) : e === "withText" && t ? /* @__PURE__ */ S(
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
const $n = { top: "bottom", bottom: "top", left: "right", right: "left" }, zn = 8, Ee = 8;
function In(e, t, r, n, a) {
  const s = {
    top: t.top,
    bottom: a - t.bottom,
    left: t.left,
    right: n - t.right
  }, i = (c) => (c === "top" || c === "bottom" ? r.height : r.width) + zn + Ee;
  if (s[e] >= i(e)) return e;
  const l = $n[e];
  return s[l] >= i(l) ? l : e;
}
function Tn(e, t, r) {
  const n = e.left + e.width / 2 - t / 2, a = n + t;
  return n < Ee ? Ee - n : a > r - Ee ? Math.max(Ee - n, r - Ee - a) : 0;
}
function En({
  content: e,
  children: t,
  position: r = "top",
  delay: n = 200,
  maxWidth: a = "200px",
  className: s = ""
}) {
  const [i, l] = V(!1), [c, d] = V(!1), u = K(null), m = K(null), f = K(null), b = K(null), p = ue(), [x, h] = V(r), [$, g] = V(0), [N, k] = V(0), v = () => {
    u.current && clearTimeout(u.current), m.current && clearTimeout(m.current);
  }, z = () => {
    v(), u.current = setTimeout(() => {
      l(!0), m.current = setTimeout(() => d(!0), 50);
    }, n);
  }, R = Ne(() => {
    v(), l(!1), d(!1);
  }, []), y = (H) => {
    var C;
    (C = b.current) != null && C.contains(H.relatedTarget) || R();
  };
  G(() => {
    if (!i) return;
    const H = (C) => {
      C.key === "Escape" && R();
    };
    return document.addEventListener("keydown", H), () => document.removeEventListener("keydown", H);
  }, [i, R]), G(() => v, []), Le(() => {
    var T, D;
    if (!i) return;
    const H = (T = b.current) == null ? void 0 : T.getBoundingClientRect(), C = (D = f.current) == null ? void 0 : D.getBoundingClientRect();
    if (!H || !C) return;
    const I = window.innerWidth || document.documentElement.clientWidth, P = window.innerHeight || document.documentElement.clientHeight, U = In(r, H, C, I, P), w = U === "top" || U === "bottom" ? Tn(H, C.width, I) : 0, F = Math.max(0, C.width / 2 - 12);
    h(U), g(w), k(Math.min(F, Math.max(-F, -w)));
  }, [i, r, e, a]);
  const B = At(t) ? _t(t, {
    "aria-describedby": [
      t.props["aria-describedby"],
      i ? p : void 0
    ].filter(Boolean).join(" ") || void 0
  }) : t, L = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2"
  }, ee = "polygon(0 0, 16px 0, 16px 2px, 14px 2px, 14px 4px, 12px 4px, 12px 6px, 10px 6px, 10px 8px, 6px 8px, 6px 6px, 4px 6px, 4px 4px, 2px 4px, 2px 2px, 0 2px)", te = "polygon(0 0, 12px 0, 12px 2px, 10px 2px, 10px 4px, 8px 4px, 8px 6px, 4px 6px, 4px 4px, 2px 4px, 2px 2px, 0 2px)", ne = {
    top: "top-full left-1/2 -translate-x-1/2 -translate-y-px",
    bottom: "bottom-full left-1/2 -translate-x-1/2 translate-y-px rotate-180",
    left: "left-full top-1/2 -translate-y-1/2 -translate-x-[5px] -rotate-90",
    right: "right-full top-1/2 -translate-y-1/2 translate-x-[5px] rotate-90"
  }, Q = {
    top: "top-full inset-x-0 h-2",
    bottom: "bottom-full inset-x-0 h-2",
    left: "left-full inset-y-0 w-2",
    right: "right-full inset-y-0 w-2"
  };
  return /* @__PURE__ */ S(
    "div",
    {
      ref: b,
      className: `relative inline-block w-fit ${s}`,
      onMouseEnter: z,
      onMouseLeave: R,
      onFocus: z,
      onBlur: y,
      children: [
        B,
        i && /* @__PURE__ */ S(
          "div",
          {
            ref: f,
            id: p,
            role: "tooltip",
            className: `
            absolute
            ${L[x]}
            w-max
            z-[var(--z-index-tooltip)]
            ${c ? "opacity-100" : "opacity-0"}
            transition-opacity [transition-duration:var(--duration-fast)]
          `,
            "data-placement": x,
            style: { maxWidth: a, marginLeft: $ || void 0 },
            children: [
              /* @__PURE__ */ o("span", { className: `absolute ${Q[x]}`, "aria-hidden": "true" }),
              /* @__PURE__ */ o("div", { className: "plate-round p-px bg-[var(--surface-container-stroke)]", children: /* @__PURE__ */ o("div", { className: "plate-round bg-[var(--surface-card)] min-w-16 px-3 py-2 text-center font-mono text-xs text-[var(--text-primary)] whitespace-normal", children: e }) }),
              /* @__PURE__ */ o(
                "div",
                {
                  className: `absolute ${ne[x]}`,
                  style: { marginLeft: N || void 0 },
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ S("div", { className: "relative h-[8px] w-[16px]", children: [
                    /* @__PURE__ */ o(
                      "div",
                      {
                        className: "absolute inset-0 bg-[var(--surface-container-stroke)]",
                        style: { clipPath: ee }
                      }
                    ),
                    /* @__PURE__ */ o(
                      "div",
                      {
                        className: "absolute left-[2px] top-[-1px] h-[6px] w-[12px] bg-[var(--surface-card)]",
                        style: { clipPath: te }
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
const An = le(function({
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
  "aria-label": b,
  "aria-describedby": p,
  id: x,
  ...h
}, $) {
  var q;
  const g = de(t, "Select"), N = Oe({ error: r, helperText: n, errorMessage: a, describedBy: p }), k = N.invalid, v = ue(), z = x ?? `${v}-trigger`, y = (() => {
    const X = [];
    if (Array.isArray(l))
      l.forEach((O) => {
        if (typeof O == "object" && O !== null && "props" in O) {
          const re = O.props;
          X.push({
            value: re.value || "",
            label: typeof re.children == "string" ? re.children : String(re.children || ""),
            disabled: re.disabled
          });
        }
      });
    else if (typeof l == "object" && l !== null && "props" in l) {
      const O = l.props;
      X.push({
        value: O.value || "",
        label: typeof O.children == "string" ? O.children : String(O.children || ""),
        disabled: O.disabled
      });
    }
    return X;
  })(), [B, L] = V(!1), [ee, te] = V(-1), [ne, Q] = V(
    c !== void 0 ? String(c) : d !== void 0 ? String(d) : ((q = y[0]) == null ? void 0 : q.value) || ""
  ), H = K(null), C = K(null), I = K(null);
  G(() => {
    c !== void 0 && (Q(String(c)), I.current && (I.current.value = String(c)));
  }, [c]), xr($, () => I.current);
  const P = y.find((X) => X.value === ne), U = (P == null ? void 0 : P.label) || "", w = () => {
    s || (L(!B), B || te(-1));
  }, F = () => {
    L(!1), te(-1);
  }, T = (X) => {
    c === void 0 && Q(X), I.current && (I.current.value = X), u && u({
      target: { value: X, name: m },
      currentTarget: { value: X, name: m }
    }), F();
  };
  G(() => {
    function X(O) {
      H.current && !H.current.contains(O.target) && F();
    }
    if (B)
      return document.addEventListener("mousedown", X), () => {
        document.removeEventListener("mousedown", X);
      };
  }, [B]), G(() => {
    function X(O) {
      var oe, ge;
      if (!((oe = H.current) != null && oe.contains(O.target)) && !B)
        return;
      if (!B) {
        if ((O.key === "Enter" || O.key === " " || O.key === "ArrowDown" || O.key === "ArrowUp") && (ge = H.current) != null && ge.contains(O.target)) {
          O.preventDefault(), w();
          const me = y.filter((ve) => !ve.disabled).findIndex((ve) => ve.value === ne);
          te(me >= 0 ? me : 0);
        }
        return;
      }
      const re = y.filter((fe) => !fe.disabled), se = ee;
      switch (O.key) {
        case "Escape":
          O.preventDefault(), F();
          break;
        case "ArrowDown":
          O.preventDefault(), te((fe) => {
            const me = fe + 1;
            return me >= re.length ? 0 : me;
          });
          break;
        case "ArrowUp":
          O.preventDefault(), te((fe) => {
            const me = fe - 1;
            return me < 0 ? re.length - 1 : me;
          });
          break;
        case "Enter":
        case " ":
          O.preventDefault(), se >= 0 && se < re.length && T(re[se].value);
          break;
      }
    }
    return document.addEventListener("keydown", X), () => {
      document.removeEventListener("keydown", X);
    };
  }, [B, ee, y, ne]), G(() => {
    if (ee >= 0 && C.current) {
      const X = C.current.querySelectorAll('[role="option"]');
      let O = 0, re = 0;
      for (let oe = 0; oe < X.length; oe++)
        if (!y[oe].disabled) {
          if (re === ee) {
            O = oe;
            break;
          }
          re++;
        }
      const se = X[O];
      se && se.scrollIntoView({ block: "nearest" });
    }
  }, [ee, y]);
  const W = {
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
  }[g], Z = k ? "bg-[var(--field-background-error)] text-[var(--text-primary)]" : "bg-[var(--field-background)] text-[var(--text-primary)]", J = k ? "bg-[var(--field-border-error)]" : "bg-[var(--field-border)] hover:bg-[var(--field-border-hover)] focus-within:!bg-[var(--field-border-focus)]", pe = /* @__PURE__ */ S("div", { ref: H, className: "relative inline-block w-full", children: [
    /* @__PURE__ */ o(
      "select",
      {
        ref: I,
        name: m,
        value: ne,
        onChange: u,
        className: "sr-only",
        "aria-hidden": "true",
        tabIndex: -1,
        ...h,
        children: y.map((X, O) => /* @__PURE__ */ o("option", { value: X.value, disabled: X.disabled, children: X.label }, O))
      }
    ),
    /* @__PURE__ */ o("div", { className: `plate-round p-px transition-colors [transition-duration:var(--duration-fast)] ${J} ${s ? "opacity-50" : ""}`, children: /* @__PURE__ */ S(
      "button",
      {
        type: "button",
        id: z,
        onClick: w,
        disabled: s,
        className: `
          w-full
          flex items-center justify-between
          font-mono text-sm
          transition-colors [transition-duration:var(--duration-fast)]
          ${W.trigger}
          ${Z}
          ${s ? "cursor-not-allowed" : "cursor-pointer"}
          focus:outline-none
        `,
        "aria-haspopup": "listbox",
        "aria-expanded": B,
        "aria-invalid": k || void 0,
        "aria-describedby": N.describedBy,
        "aria-label": f != null && f !== "" ? void 0 : b ?? "Select an option",
        children: [
          /* @__PURE__ */ o("span", { className: "truncate text-left flex-1", children: U || "Select..." }),
          /* @__PURE__ */ o(
            "span",
            {
              className: `
            ${W.icon}
            inline-flex items-center justify-center font-mono leading-none
            text-[var(--text-secondary)]
            transition-transform [transition-duration:var(--duration-normal)]
            flex-shrink-0 ml-2
            ${B ? "rotate-180" : ""}
            ${s ? "opacity-50" : ""}
          `,
              "aria-hidden": "true",
              children: /* @__PURE__ */ o(Y, { name: "ChevronDown" })
            }
          )
        ]
      }
    ) }),
    B && /* @__PURE__ */ o(
      "div",
      {
        style: { animationDuration: "var(--duration-normal)" },
        className: `
            absolute top-full mt-2 left-0 right-0
            min-w-[200px]
            plate-round p-px bg-[var(--border-default)]
            z-[1051]
            animate-in fade-in slide-in-from-top-2
          `,
        children: /* @__PURE__ */ o(
          "div",
          {
            ref: C,
            role: "listbox",
            className: `plate-round bg-[var(--surface-card)] ${W.menu} max-h-[300px] overflow-y-auto`,
            children: y.map((X, O) => {
              const re = X.disabled, se = X.value === ne, fe = y.filter((me) => !me.disabled).findIndex((me) => me.value === X.value) === ee && !re;
              return /* @__PURE__ */ S(
                "button",
                {
                  type: "button",
                  role: "option",
                  "aria-selected": se,
                  disabled: re,
                  onClick: () => !re && T(X.value),
                  className: `
                  w-full flex items-center gap-2
                  px-4 py-3
                  font-mono text-sm text-left
                  transition-colors [transition-duration:var(--duration-fast)]
                  ${re ? "opacity-50 cursor-not-allowed" : "text-[var(--text-primary)] hover:bg-[var(--surface-subtle)] cursor-pointer"}
                  ${fe && !re ? "bg-[var(--surface-subtle)]" : ""}
                  ${W.menuItem}
                `,
                  children: [
                    /* @__PURE__ */ o("span", { className: "truncate flex-1 min-w-0", children: X.label }),
                    se && /* @__PURE__ */ o("span", { className: `${W.icon} inline-flex items-center justify-center font-mono font-bold text-[var(--border-focus)] flex-shrink-0`, "aria-hidden": "true", children: /* @__PURE__ */ o(Y, { name: "Check" }) })
                  ]
                },
                O
              );
            })
          }
        )
      }
    )
  ] }), ce = f != null && f !== "";
  return !ce && !N.hasMessage ? /* @__PURE__ */ o("div", { className: `w-full ${i}`.trim(), children: pe }) : /* @__PURE__ */ S("div", { className: `w-full space-y-1 ${i}`.trim(), children: [
    ce && /* @__PURE__ */ o(
      "label",
      {
        htmlFor: z,
        className: "block font-mono text-sm text-secondary-800 dark:text-secondary-200",
        children: f
      }
    ),
    pe,
    /* @__PURE__ */ o(je, { ...N.message })
  ] });
});
An.displayName = "Select";
const _n = le(
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
  }, b) => {
    const p = de(e, "Checkbox"), x = K(null), h = Ne(
      (L) => {
        x.current = L, typeof b == "function" ? b(L) : b && (b.current = L);
      },
      [b]
    );
    Le(() => {
      x.current && (x.current.indeterminate = d);
    });
    const $ = Oe({ error: r, helperText: n, errorMessage: a, describedBy: m }), g = $.invalid, k = {
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
    }[p], v = g ? "bg-[var(--field-border-error)]" : `bg-[var(--field-border)] hover:bg-[var(--field-border-hover)]
         peer-checked:bg-[var(--button-primary-background)]
         peer-checked:hover:bg-[var(--button-primary-background-hover)]
         peer-indeterminate:bg-[var(--button-primary-background)]
         peer-indeterminate:hover:bg-[var(--button-primary-background-hover)]`, z = g ? "peer-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-error)]" : "peer-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]", R = (L) => {
      l && l(L), c && c(L.target.checked), L.target.indeterminate = d;
    }, y = t != null && t !== !1 && t !== "", B = /* @__PURE__ */ S("span", { className: "relative inline-flex shrink-0 before:content-[''] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-touch before:h-touch", children: [
      /* @__PURE__ */ o(
        "input",
        {
          ref: h,
          type: "checkbox",
          ...i !== void 0 ? { checked: i } : {},
          disabled: s,
          onChange: R,
          className: "peer sr-only",
          "aria-invalid": g || void 0,
          "aria-describedby": $.describedBy,
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
            ${s ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
            ${v}
            ${g ? "peer-checked:[&>span]:bg-[var(--field-border-error)] peer-indeterminate:[&>span]:bg-[var(--field-border-error)]" : "peer-checked:[&>span]:bg-[var(--button-primary-background)] peer-indeterminate:[&>span]:bg-[var(--button-primary-background)]"}
            peer-checked:[&_[data-mark=check]]:opacity-100
            peer-indeterminate:[&_[data-mark=check]]:opacity-0
            peer-indeterminate:[&_[data-mark=bar]]:opacity-100
            ${z}
          `,
          children: /* @__PURE__ */ o(
            "span",
            {
              className: `
              plate-round relative inline-flex h-full w-full items-center justify-center
              bg-[var(--field-background)]
              transition-colors [transition-duration:var(--duration-fast)]
            `,
              children: ["check", "bar"].map((L) => /* @__PURE__ */ o(
                "span",
                {
                  "data-mark": L,
                  className: `absolute inset-0 inline-flex items-center justify-center opacity-0 transition-opacity [transition-duration:var(--duration-fast)] ${g ? "text-white" : "text-[var(--button-primary-text)]"}`,
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ o(Y, { name: L === "check" ? "Check" : "Minus", size: k.glyph })
                },
                L
              ))
            }
          )
        }
      )
    ] });
    return /* @__PURE__ */ S("div", { className: `flex flex-col gap-1 ${u}`, children: [
      /* @__PURE__ */ S(
        "label",
        {
          className: `inline-flex items-center gap-2 font-mono ${s ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`,
          children: [
            B,
            y && /* @__PURE__ */ o("span", { className: `${k.label} text-[var(--text-primary)]`, children: t })
          ]
        }
      ),
      /* @__PURE__ */ o(je, { ...$.message, className: k.messageIndent })
    ] });
  }
);
_n.displayName = "Checkbox";
const Mn = le(function({ label: t, id: r, className: n = "", disabled: a, ...s }, i) {
  const l = ue(), c = r ?? l;
  return /* @__PURE__ */ S("span", { className: `inline-flex flex-col gap-1.5 font-mono ${n}`, children: [
    t && /* @__PURE__ */ o("label", { htmlFor: c, className: "text-sm text-secondary-800 dark:text-secondary-300", children: t }),
    /* @__PURE__ */ o(
      "input",
      {
        ref: i,
        id: c,
        type: "range",
        disabled: a,
        className: `
          appearance-none w-full h-6 bg-transparent rounded-none
          ${a ? "cursor-default opacity-50" : "cursor-pointer"}
          focus:outline-none
          focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]
          [&::-webkit-slider-runnable-track]:h-1
          [&::-webkit-slider-runnable-track]:bg-[var(--surface-muted)]
          [&::-webkit-slider-runnable-track]:rounded-none
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-3.5
          [&::-webkit-slider-thumb]:-mt-2
          [&::-webkit-slider-thumb]:bg-[var(--accent)]
          [&::-webkit-slider-thumb]:[clip-path:var(--plate-round)]
          [&::-moz-range-track]:h-1
          [&::-moz-range-track]:bg-[var(--surface-muted)]
          [&::-moz-range-track]:rounded-none
          [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-3.5
          [&::-moz-range-thumb]:bg-[var(--accent)]
          [&::-moz-range-thumb]:border-0
          [&::-moz-range-thumb]:[clip-path:var(--plate-round)]
        `,
        ...s
      }
    )
  ] });
});
Mn.displayName = "Slider";
const Cn = le(
  ({
    size: e = "md",
    label: t,
    error: r = !1,
    disabled: n = !1,
    checked: a,
    onChange: s,
    onCheckedChange: i,
    className: l = "",
    ...c
  }, d) => {
    const u = de(e, "Radio"), f = {
      sm: {
        radio: "w-4 h-4",
        // 16px × 16px
        dot: "w-1.5 h-1.5",
        // 6px square dot
        label: "text-sm"
        // 14px text
      },
      md: {
        radio: "w-5 h-5",
        // 20px × 20px
        dot: "w-2 h-2",
        // 8px square dot
        label: "text-sm"
        // 14px text
      },
      lg: {
        radio: "w-6 h-6",
        // 24px × 24px
        dot: "w-2.5 h-2.5",
        // 10px square dot
        label: "text-sm"
        // 14px text
      }
    }[u], b = r ? "bg-[var(--field-border-error)]" : `bg-[var(--field-border)] hover:bg-[var(--field-border-hover)]
         peer-checked:bg-[var(--button-primary-background)]
         peer-checked:hover:bg-[var(--button-primary-background-hover)]`, p = r ? "peer-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-error)]" : "peer-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]", x = (g) => {
      s && s(g), i && i(g.target.checked);
    }, h = t != null && t !== !1 && t !== "", $ = /* @__PURE__ */ S("span", { className: "relative inline-flex shrink-0 before:content-[''] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-touch before:h-touch", children: [
      /* @__PURE__ */ o(
        "input",
        {
          ref: d,
          type: "radio",
          ...a !== void 0 ? { checked: a } : {},
          disabled: n,
          onChange: x,
          className: "peer sr-only",
          "aria-invalid": r || void 0,
          ...c
        }
      ),
      /* @__PURE__ */ o(
        "span",
        {
          "aria-hidden": "true",
          className: `
            plate-round p-px inline-flex shrink-0
            ${f.radio}
            transition-colors [transition-duration:var(--duration-fast)]
            ${n ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
            ${b}
            ${r ? "peer-checked:[&>span]:bg-[var(--field-border-error)]" : "peer-checked:[&>span]:bg-[var(--button-primary-background)]"}
            peer-checked:[&>span>span]:opacity-100
            ${p}
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
                ${f.dot}
                opacity-0
                transition-opacity [transition-duration:var(--duration-fast)]
                ${r ? "bg-white" : "bg-[var(--button-primary-text)]"}
              `
                }
              )
            }
          )
        }
      )
    ] });
    return /* @__PURE__ */ o("div", { className: `flex items-center gap-2 ${l}`, children: /* @__PURE__ */ S(
      "label",
      {
        className: `inline-flex items-center gap-2 font-mono ${n ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`,
        children: [
          $,
          h && /* @__PURE__ */ o("span", { className: `${f.label} text-[var(--text-primary)]`, children: t })
        ]
      }
    ) });
  }
);
Cn.displayName = "Radio";
const Rn = le(
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
    const m = de(e, "Textarea"), f = Oe({ error: t, helperText: r, errorMessage: n, describedBy: c }), b = f.invalid, p = ue(), x = l ?? (i != null && i !== "" ? p : void 0), h = `
      w-full
      font-mono text-sm
      transition-colors [transition-duration:var(--duration-fast)]
      placeholder:text-[var(--field-placeholder)]
      disabled:cursor-not-allowed disabled:opacity-50
      focus:outline-none
      resize-y
    `, $ = {
      sm: "min-h-control-sm px-3 py-1.5 plate-round",
      md: "min-h-control-md px-4 py-2.5 plate-round",
      lg: "min-h-control-lg px-5 py-3.5 plate-round"
    }, g = b ? "bg-[var(--field-background-error)] text-[var(--text-primary)]" : "bg-[var(--field-background)] text-[var(--text-primary)]", k = /* @__PURE__ */ o(
      "div",
      {
        className: `w-full plate-round p-px transition-colors [transition-duration:var(--duration-fast)] ${b ? "bg-[var(--field-border-error)]" : "bg-[var(--field-border)] hover:bg-[var(--field-border-hover)] focus-within:!bg-[var(--field-border-focus)]"}`,
        children: /* @__PURE__ */ o(
          "textarea",
          {
            ref: u,
            id: x,
            disabled: a,
            "aria-invalid": b || void 0,
            "aria-describedby": f.describedBy,
            className: `${h} ${$[m]} ${g} ${s}`,
            ...d
          }
        )
      }
    ), v = i != null && i !== "";
    return !v && !f.hasMessage ? k : /* @__PURE__ */ S("div", { className: "w-full space-y-1", children: [
      v && /* @__PURE__ */ o(
        "label",
        {
          htmlFor: x,
          className: "block font-mono text-sm text-secondary-800 dark:text-secondary-200",
          children: i
        }
      ),
      k,
      /* @__PURE__ */ o(je, { ...f.message })
    ] });
  }
);
Rn.displayName = "Textarea";
const Yt = le(
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
    const u = de(r, "Switch"), f = {
      sm: {
        track: "h-6 w-11",
        // 24px × 44px
        knob: "h-5 w-5",
        // 20px × 20px knob
        knobTranslate: e ? "translateX(22px)" : "translateX(2px)",
        // Unchecked: 2px from left (perfect), Checked: 22px (2px gap from right edge)
        iconSize: "w-3 h-3"
        // 12px icon for small knob
      },
      md: {
        track: "h-8 w-14",
        // 32px × 56px (matches small button height)
        knob: "h-6 w-6",
        // 24px × 24px knob
        knobTranslate: e ? "translateX(29px)" : "translateX(3px)",
        // Unchecked: 3px from left (1px right), Checked: 29px (1px left from previous)
        iconSize: "w-3 h-3"
        // 12px icon for medium knob (matches ThemeToggle)
      },
      lg: {
        track: "h-10 w-[72px]",
        // 40px × 72px (matches medium button height)
        knob: "h-8 w-8",
        // 32px × 32px knob
        knobTranslate: e ? "translateX(37px)" : "translateX(3px)",
        // Unchecked: 3px from left (1px right), Checked: 37px (3px left from previous)
        iconSize: "w-4 h-4"
        // 16px icon for large knob
      }
    }[u], b = () => {
      !s && t && t(!e);
    }, p = (x) => {
      (x.key === " " || x.key === "Enter") && (x.preventDefault(), !s && t && t(!e));
    };
    return /* @__PURE__ */ S("div", { className: `flex items-center gap-3 ${l}`, children: [
      /* @__PURE__ */ o(
        "button",
        {
          ref: d,
          type: "button",
          role: "switch",
          "aria-checked": e,
          "aria-label": n || (e ? "On" : "Off"),
          disabled: s,
          onClick: b,
          onKeyDown: p,
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
              className: `
              relative inline-flex items-center
              ${f.track}
              plate-round
              transition-colors [transition-duration:var(--duration-normal)]
              group-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]
              ${e ? "bg-[var(--button-primary-background)]" : "bg-secondary-300 dark:bg-secondary-700"}
            `,
              children: /* @__PURE__ */ o(
                "span",
                {
                  className: `
              inline-flex items-center justify-center
              ${f.knob}
              plate-round
              bg-[var(--field-background)]
              shadow-none
              transform transition-transform [transition-duration:var(--duration-normal)]
            `,
                  style: {
                    transform: f.knobTranslate
                  },
                  children: i && /* @__PURE__ */ o("span", { className: f.iconSize, children: i })
                }
              )
            }
          )
        }
      ),
      n && !a && /* @__PURE__ */ o(
        "span",
        {
          className: `text-sm font-mono ${s ? "text-secondary-700 dark:text-secondary-400" : "text-[var(--text-primary)]"}`,
          children: n
        }
      )
    ] });
  }
);
Yt.displayName = "Switch";
function aa({
  trigger: e,
  items: t,
  align: r = "left",
  label: n = "Actions",
  size: a = "md"
}) {
  const s = de(a, "Dropdown"), [i, l] = V(!1), [c, d] = V(-1), u = K(null), m = K(null), f = () => {
    l(!i), i || d(-1);
  }, b = () => {
    l(!1), d(-1);
  }, p = (N) => {
    N.disabled || (N.onClick(), b());
  };
  G(() => {
    function N(k) {
      u.current && !u.current.contains(k.target) && b();
    }
    if (i)
      return document.addEventListener("mousedown", N), () => {
        document.removeEventListener("mousedown", N);
      };
  }, [i]), G(() => {
    function N(k) {
      if (!i) return;
      const v = t.filter((R) => !R.disabled), z = c;
      switch (k.key) {
        case "Escape":
          k.preventDefault(), b();
          break;
        case "ArrowDown":
          k.preventDefault(), d((R) => {
            const y = R + 1;
            return y >= v.length ? 0 : y;
          });
          break;
        case "ArrowUp":
          k.preventDefault(), d((R) => {
            const y = R - 1;
            return y < 0 ? v.length - 1 : y;
          });
          break;
        case "Enter":
        case " ":
          k.preventDefault(), z >= 0 && z < v.length && p(v[z]);
          break;
      }
    }
    if (i)
      return document.addEventListener("keydown", N), () => {
        document.removeEventListener("keydown", N);
      };
  }, [i, c, t]), G(() => {
    if (c >= 0 && m.current) {
      const k = m.current.querySelectorAll('[role="menuitem"]')[c];
      k && k.scrollIntoView({ block: "nearest" });
    }
  }, [c]);
  const h = {
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
  }[s], $ = /* @__PURE__ */ S(
    "button",
    {
      onClick: f,
      className: `
        inline-flex items-center justify-center gap-2
        font-mono text-sm
        ${h.button}
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
        /* @__PURE__ */ o("span", { className: `${h.icon} inline-flex items-center justify-center font-mono leading-none transition-transform [transition-duration:var(--duration-normal)] ${i ? "rotate-180" : ""}`, "aria-hidden": "true", children: /* @__PURE__ */ o(Y, { name: "ChevronDown" }) })
      ]
    }
  );
  return /* @__PURE__ */ S("div", { ref: u, className: "relative inline-block", children: [
    e ? /* @__PURE__ */ o("div", { onClick: f, role: "button", tabIndex: 0, onKeyDown: (N) => {
      (N.key === "Enter" || N.key === " ") && (N.preventDefault(), f());
    }, children: e }) : $,
    i && /* @__PURE__ */ o(
      "div",
      {
        style: { animationDuration: "var(--duration-normal)" },
        className: `
            absolute top-full mt-2
            ${r === "right" ? "right-0" : "left-0"}
            min-w-[200px]
            plate-round p-px bg-[var(--border-default)]
            z-[1051]
            animate-in fade-in slide-in-from-top-2
          `,
        children: /* @__PURE__ */ o(
          "div",
          {
            ref: m,
            role: "menu",
            "aria-orientation": "vertical",
            className: `plate-round bg-[var(--surface-card)] ${h.menu}`,
            children: t.map((N, k) => {
              const v = N.variant === "destructive", z = N.disabled;
              return /* @__PURE__ */ S(
                "button",
                {
                  role: "menuitem",
                  disabled: z,
                  onClick: () => p(N),
                  className: `
                  w-full flex items-center gap-2
                  px-4 py-3
                  font-mono text-sm text-left
                  transition-colors [transition-duration:var(--duration-fast)]
                  ${z ? "opacity-50 cursor-not-allowed" : v ? "text-error-600 hover:bg-[var(--field-background-error)]" : "text-[var(--text-primary)] hover:bg-[var(--surface-subtle)]"}
                  ${c === k && !z ? "bg-[var(--surface-subtle)]" : ""}
                  ${h.menuItem}
                `,
                  children: [
                    /* @__PURE__ */ S("div", { className: "flex items-center gap-2 flex-1 min-w-0", children: [
                      N.icon && /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center ${h.icon} flex-shrink-0`, children: N.icon }),
                      /* @__PURE__ */ o("span", { className: "truncate", children: N.label })
                    ] }),
                    N.iconRight && /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center ${h.icon} flex-shrink-0 ml-auto`, children: N.iconRight })
                  ]
                },
                k
              );
            })
          }
        )
      }
    )
  ] });
}
const Ue = "text-secondary-700 dark:text-secondary-600", Me = "text-secondary-800 dark:text-secondary-500", Ln = {
  background: "repeating-linear-gradient(45deg, var(--surface-subtle), var(--surface-subtle) 8px, var(--surface-muted) 8px, var(--surface-muted) 16px)"
}, Zt = (e) => e === "wide" ? " [--csb-bw:min(calc(100%+240px),calc(100cqw-48px))] w-[var(--csb-bw)] ml-[calc((100%-var(--csb-bw))/2)]" : e === "full" ? " [--csb-bw:calc(100cqw-48px)] w-[var(--csb-bw)] ml-[calc((100%-var(--csb-bw))/2)]" : "";
function nt({
  caption: e,
  width: t,
  className: r = "",
  children: n
}) {
  return /* @__PURE__ */ S("figure", { className: `my-11${Zt(t)} ${r}`, children: [
    /* @__PURE__ */ o("div", { className: "plate-round p-px bg-[var(--border-hairline)]", children: n }),
    e && /* @__PURE__ */ o("figcaption", { className: `mt-2 text-xs ${Ue}`, children: e })
  ] });
}
function Ze({
  src: e,
  alt: t,
  aspect: r,
  caption: n,
  width: a
}) {
  return /* @__PURE__ */ o(nt, { caption: n, width: a, children: e ? /* @__PURE__ */ o(
    "img",
    {
      src: e,
      alt: t ?? "",
      className: "plate-round block w-full",
      style: { aspectRatio: r ?? "16 / 9", objectFit: "cover" }
    }
  ) : /* @__PURE__ */ o(
    "div",
    {
      className: "plate-round w-full",
      style: { aspectRatio: r ?? "16 / 9", ...Ln }
    }
  ) });
}
function Je({ title: e, text: t }) {
  return /* @__PURE__ */ S(be, { children: [
    /* @__PURE__ */ o("div", { className: "text-[var(--text-primary)]", children: e }),
    /* @__PURE__ */ o("p", { className: `m-0 text-sm leading-relaxed ${Me}`, children: t })
  ] });
}
function Pn({ b: e, slots: t }) {
  switch (e.type) {
    case "meta":
      return /* @__PURE__ */ o("dl", { className: "mb-11 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(130px,1fr))]", children: e.items.map((r) => /* @__PURE__ */ S("div", { children: [
        /* @__PURE__ */ o("dt", { className: `text-xs uppercase tracking-[0.08em] ${Ue}`, children: r.label }),
        /* @__PURE__ */ o("dd", { className: `m-0 mt-1 text-sm leading-normal ${Me}`, children: r.value })
      ] }, r.label)) });
    case "headline":
      return /* @__PURE__ */ S("header", { className: "mb-7 mt-16 first:mt-0 sm:mt-24 sm:first:mt-0", children: [
        e.kicker && /* @__PURE__ */ o("div", { className: `text-xs first-letter:uppercase ${Ue}`, children: e.kicker }),
        /* @__PURE__ */ o("h2", { className: "mt-2 text-xl text-[var(--text-primary)]", children: e.title }),
        e.text && /* @__PURE__ */ o("p", { className: `mt-3 text-base leading-relaxed ${Me}`, children: e.text })
      ] });
    case "prose":
      return /* @__PURE__ */ o("p", { className: `my-7 text-base leading-relaxed ${Me}`, children: e.text });
    case "image":
      return /* @__PURE__ */ o(
        Ze,
        {
          src: e.src,
          alt: e.alt,
          aspect: e.aspect,
          caption: e.caption,
          width: e.width
        }
      );
    case "imagePair":
      return /* @__PURE__ */ o("div", { className: `my-11 grid grid-cols-1 gap-3.5 sm:grid-cols-2${Zt(e.width)}`, children: [0, 1].map((r) => {
        var n, a, s;
        return /* @__PURE__ */ o(
          Ze,
          {
            aspect: "4 / 3",
            src: (n = e.srcs) == null ? void 0 : n[r],
            alt: (a = e.alts) == null ? void 0 : a[r],
            caption: (s = e.captions) == null ? void 0 : s[r]
          },
          r
        );
      }) });
    case "ascii":
      return /* @__PURE__ */ o(nt, { caption: e.caption, width: e.width, children: /* @__PURE__ */ o(
        "pre",
        {
          role: "img",
          "aria-label": e.label ?? e.caption ?? "diagram",
          className: `plate-round m-0 overflow-x-auto p-5 text-xs leading-snug ${Me}`,
          children: e.text
        }
      ) });
    case "slot": {
      const r = t == null ? void 0 : t[e.name];
      return r ? /* @__PURE__ */ o(nt, { caption: e.caption, width: e.width, children: /* @__PURE__ */ o("div", { className: "plate-round overflow-hidden", children: r }) }) : /* @__PURE__ */ o(Ze, { aspect: e.aspect, caption: e.caption, width: e.width });
    }
    case "callouts":
      return /* @__PURE__ */ o("div", { className: "my-11 grid gap-x-8 gap-y-7 [grid-template-columns:repeat(auto-fit,minmax(160px,1fr))]", children: e.items.map((r) => /* @__PURE__ */ o("div", { className: "grid row-span-2 gap-y-1.5 [grid-template-rows:subgrid]", children: /* @__PURE__ */ o(Je, { title: r.title, text: r.text }) }, r.title)) });
    case "insights":
      return /* @__PURE__ */ o("ol", { className: "my-11 flex list-none flex-col gap-7 p-0", children: e.items.map((r, n) => /* @__PURE__ */ S("li", { className: "flex gap-3.5", children: [
        /* @__PURE__ */ o("span", { className: "flex-none text-sm leading-6 text-[var(--accent)]", children: String(n + 1).padStart(2, "0") }),
        /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(Je, { title: r.title, text: r.text }) })
      ] }, r.title)) });
    case "quote":
      return /* @__PURE__ */ S("figure", { className: "my-11 m-0 text-lg leading-relaxed text-[var(--text-primary)]", children: [
        /* @__PURE__ */ o("span", { "aria-hidden": "true", className: "mb-2 block text-3xl leading-none text-[var(--accent)]", children: "“" }),
        /* @__PURE__ */ o("blockquote", { className: "m-0 p-0", children: e.text }),
        e.name && /* @__PURE__ */ S("figcaption", { className: "mt-4 flex items-center gap-3 text-sm", children: [
          /* @__PURE__ */ o(Sn, { size: "md", src: e.image, alt: "" }),
          /* @__PURE__ */ S("span", { children: [
            /* @__PURE__ */ o("span", { className: "block text-[var(--text-primary)]", children: e.name }),
            e.role && /* @__PURE__ */ o("span", { className: `block text-xs ${Ue}`, children: e.role })
          ] })
        ] })
      ] });
    case "list":
      return /* @__PURE__ */ o("ul", { className: "my-11 flex list-none flex-col gap-7 p-0", children: e.items.map((r) => /* @__PURE__ */ o("li", { children: /* @__PURE__ */ o(Je, { title: r.title, text: r.text }) }, r.title)) });
  }
}
function sa({
  blocks: e,
  slots: t,
  className: r = ""
}) {
  return /* @__PURE__ */ o("div", { className: `font-mono ${r}`, children: e.map((n, a) => /* @__PURE__ */ o(Pn, { b: n, slots: t }, a)) });
}
const Dn = le(function({ meta: t, title: r, description: n, titleSuffix: a, thumb: s, thumbPosition: i = "start", selected: l = !1, className: c = "", ...d }, u) {
  const m = "as" in d && d.as ? d.as : null, f = m ? "as" : "href" in d && d.href != null ? "a" : "onClick" in d && d.onClick != null ? "button" : "div", b = `
    block w-full text-left p-3 plate-round
    transition-colors [transition-duration:var(--duration-fast)]
    font-mono
    ${f !== "div" ? "cursor-pointer hover:bg-[var(--surface-muted)] focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]" : ""}
    ${l ? "bg-[var(--surface-muted)]" : ""}
    ${c}
  `, p = /* @__PURE__ */ S(be, { children: [
    t && /* @__PURE__ */ o("span", { className: "block text-sm text-secondary-700 dark:text-secondary-600", children: t }),
    /* @__PURE__ */ S(
      "span",
      {
        className: `block text-base leading-6 ${f !== "div" ? "text-[var(--accent)]" : "text-[var(--text-primary)]"}`,
        children: [
          r,
          a && /* @__PURE__ */ o("span", { className: "ml-2 leading-none", children: a })
        ]
      }
    ),
    n && /* @__PURE__ */ o("span", { className: "mt-1 block text-sm leading-6 text-secondary-800 dark:text-secondary-500", children: n })
  ] }), x = s ? /* @__PURE__ */ S("span", { className: `flex items-start gap-4 ${i === "end" ? "flex-row-reverse" : ""}`, children: [
    /* @__PURE__ */ o("span", { className: "flex-shrink-0", children: s }),
    /* @__PURE__ */ o("span", { className: "block min-w-0 flex-1", children: p })
  ] }) : p;
  if (m) {
    const { asProps: h } = d;
    return /* @__PURE__ */ o(m, { ref: u, className: b, ...h, children: x });
  }
  if (f === "a") {
    const { href: h, ...$ } = d;
    return /* @__PURE__ */ o("a", { ref: u, href: h, className: b, ...$, children: x });
  }
  if (f === "button") {
    const { onClick: h, ...$ } = d;
    return /* @__PURE__ */ o("button", { ref: u, type: "button", onClick: h, className: b, ...$, children: x });
  }
  return /* @__PURE__ */ o("div", { ref: u, className: b, children: x });
});
Dn.displayName = "ListRow";
const ot = le(function({ variant: t = "inline", external: r = !1, className: n = "", children: a, ...s }, i) {
  const l = E(
    "font-mono text-[var(--accent)] transition-colors [transition-duration:var(--duration-fast)] hover:text-[var(--text-link-hover)]",
    "focus:outline-none focus-visible:[outline:var(--focus-ring-width)_solid_var(--focus-ring-primary)] focus-visible:[outline-offset:var(--focus-ring-offset)]",
    t === "inline" ? "underline underline-offset-2" : "no-underline hover:underline focus-visible:underline",
    n
  ), c = /* @__PURE__ */ S(be, { children: [
    a,
    r && /* @__PURE__ */ S(be, { children: [
      /* @__PURE__ */ o(Y, { name: "ExternalLink", size: "3", className: "ml-1" }),
      /* @__PURE__ */ o("span", { className: "sr-only", children: " (opens in new tab)" })
    ] })
  ] });
  if ("as" in s && s.as) {
    const { as: b, asProps: p } = s;
    return /* @__PURE__ */ o(b, { ref: i, className: l, ...p, children: c });
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
ot.displayName = "Link";
const On = {
  default: "Bell",
  success: "CheckCircle",
  warning: "AlertTriangle",
  error: "AlertCircle",
  info: "Info"
}, jn = {
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
}, $t = `
  relative shrink-0 inline-flex items-center px-1 font-mono text-sm font-bold cursor-pointer
  before:content-[''] before:absolute before:inset-x-0 before:top-1/2 before:-translate-y-1/2 before:h-touch
  focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]
`;
function Bn({ children: e, onClick: t, variant: r = "default", action: n, duration: a, onDismiss: s }) {
  const [i, l] = V(!1);
  G(() => {
    const g = requestAnimationFrame(() => l(!0));
    return () => cancelAnimationFrame(g);
  }, []);
  const [c, d] = V(!1), [u, m] = V(!1), f = c || u, b = K(s);
  G(() => {
    b.current = s;
  });
  const p = K(a ?? 0);
  G(() => {
    p.current = a ?? 0;
  }, [a]), G(() => {
    if (f || a == null || !Number.isFinite(a) || !b.current) return;
    const g = Date.now(), N = setTimeout(() => {
      var k;
      return (k = b.current) == null ? void 0 : k.call(b);
    }, Math.max(0, p.current));
    return () => {
      clearTimeout(N), p.current -= Date.now() - g;
    };
  }, [f, a]);
  const x = (g) => {
    g.currentTarget.contains(g.relatedTarget) || m(!1);
  }, h = jn[r], $ = a === 1 / 0 && s != null;
  return /* @__PURE__ */ o(
    "div",
    {
      role: r === "error" ? "alert" : "status",
      onClick: t,
      onMouseEnter: () => d(!0),
      onMouseLeave: () => d(!1),
      onFocus: () => m(!0),
      onBlur: x,
      className: `
        plate-round p-px ${h.ring}
        transition-transform [transition-duration:var(--duration-normal)] [transition-timing-function:steps(5)]
        ${i ? "translate-y-0" : "translate-y-16"}
        ${t ? "cursor-pointer" : ""}
      `,
      children: /* @__PURE__ */ S(
        "div",
        {
          className: `plate-round flex max-w-[min(28rem,calc(100vw-2rem))] items-center gap-2 px-3 py-2.5 font-mono text-sm ${h.fill} ${h.text}`,
          children: [
            /* @__PURE__ */ o("span", { className: `inline-flex shrink-0 ${h.icon}`, children: /* @__PURE__ */ o(Y, { name: On[r], size: "4" }) }),
            /* @__PURE__ */ o("span", { className: "min-w-0 whitespace-nowrap overflow-hidden text-ellipsis", children: e }),
            n && /* @__PURE__ */ o(
              "button",
              {
                type: "button",
                className: `${$t} underline underline-offset-2`,
                onClick: (g) => {
                  g.stopPropagation(), n.onClick(), s == null || s();
                },
                children: n.label
              }
            ),
            $ && /* @__PURE__ */ o(
              "button",
              {
                type: "button",
                "aria-label": "Dismiss notification",
                className: $t,
                onClick: (g) => {
                  g.stopPropagation(), s == null || s();
                },
                children: /* @__PURE__ */ o(Y, { name: "X", size: "3" })
              }
            )
          ]
        }
      )
    }
  );
}
const Fn = 5e3, lt = [];
let Xe = lt, Vn = 0;
const at = /* @__PURE__ */ new Set();
function Jt(e) {
  Xe = e, at.forEach((t) => t());
}
function Qt(e) {
  return at.add(e), () => {
    at.delete(e);
  };
}
const er = () => Xe, tr = () => lt;
function _e(e, t = {}) {
  const { id: r = `toast-${++Vn}`, duration: n = Fn, ...a } = t;
  return Jt([...Xe.filter((s) => s.id !== r), { id: r, message: e, duration: n, ...a }]), r;
}
function ct(e) {
  Jt(e === void 0 ? lt : Xe.filter((t) => t.id !== e));
}
const Gn = Object.assign(_e, {
  success: (e, t) => _e(e, { ...t, variant: "success" }),
  warning: (e, t) => _e(e, { ...t, variant: "warning" }),
  error: (e, t) => _e(e, { ...t, variant: "error" }),
  info: (e, t) => _e(e, { ...t, variant: "info" }),
  dismiss: ct
});
function ia() {
  return { toasts: Mt(Qt, er, tr), toast: Gn, dismiss: ct };
}
function la({ toasts: e, onDismiss: t }) {
  const r = Mt(Qt, er, tr), n = e !== void 0, a = n ? e : r, s = n ? t : ct;
  return /* @__PURE__ */ o(
    "div",
    {
      "aria-live": "polite",
      className: "fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2",
      style: { zIndex: "var(--z-index-popover)" },
      children: a.map((i) => /* @__PURE__ */ o(
        Bn,
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
function ca({ isOpen: e, onClose: t, ariaLabel: r, children: n }) {
  const [a, s] = V(e);
  G(() => {
    e && s(!0);
  }, [e]);
  const i = a && !e, l = K(null), c = K(null), d = e && a;
  return G(() => {
    var u;
    if (d)
      return c.current = document.activeElement, (u = l.current) == null || u.focus(), () => {
        var m;
        (m = c.current) == null || m.focus(), c.current = null;
      };
  }, [d]), G(() => {
    if (!e) return;
    const u = (m) => {
      m.key === "Escape" && t();
    };
    return document.addEventListener("keydown", u), () => document.removeEventListener("keydown", u);
  }, [e, t]), G(() => (e ? document.body.style.overflow = "hidden" : document.body.style.overflow = "unset", () => {
    document.body.style.overflow = "unset";
  }), [e]), a ? /* @__PURE__ */ S(be, { children: [
    /* @__PURE__ */ o(
      "div",
      {
        className: `fixed inset-0 bg-[var(--surface-overlay)] ${i ? "animate-out fade-out fill-mode-forwards" : "animate-in fade-in"}`,
        style: { zIndex: "var(--z-index-overlay)", animationDuration: "var(--duration-slow)" },
        onClick: t,
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ o(
      "div",
      {
        ref: l,
        tabIndex: -1,
        role: "dialog",
        "aria-modal": "true",
        "aria-label": r,
        className: `focus:outline-none fixed bottom-0 inset-x-0 mx-auto w-[min(540px,100%)] plate-round-lg-top bg-[var(--surface-container-stroke)] pt-px px-px ${i ? "animate-out slide-out-to-bottom fill-mode-forwards" : "animate-in slide-in-from-bottom"}`,
        style: { zIndex: "var(--z-index-modal)", animationDuration: "var(--duration-slow)" },
        onAnimationEnd: () => {
          i && s(!1);
        },
        children: /* @__PURE__ */ S("div", { className: "plate-round-lg-top bg-[var(--surface-card)] px-5 pb-6 pt-2.5 flex flex-col items-center gap-3 max-h-[70vh]", children: [
          /* @__PURE__ */ o("div", { className: "w-9 h-1 bg-[var(--surface-container-stroke)]", "aria-hidden": "true" }),
          /* @__PURE__ */ o("div", { className: "w-full overflow-y-auto", tabIndex: 0, children: n })
        ] })
      }
    )
  ] }) : null;
}
function da() {
  const { theme: e, setTheme: t } = yr(), [r, n] = V(!1);
  if (G(() => {
    n(!0);
  }, []), !r)
    return /* @__PURE__ */ S("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ o("div", { className: "w-11 h-6 rounded-none bg-[var(--field-border)]" }),
      /* @__PURE__ */ o("span", { className: "text-sm font-mono text-[var(--text-secondary)]", children: "Theme" })
    ] });
  const a = e === "dark";
  return /* @__PURE__ */ S("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ o(
      Yt,
      {
        checked: a,
        onCheckedChange: () => {
          t(a ? "light" : "dark");
        },
        size: "sm",
        icon: a ? /* @__PURE__ */ o(Y, { name: "Moon", size: "3", className: "text-[var(--border-focus)]" }) : /* @__PURE__ */ o(Y, { name: "Sun", size: "3", className: "text-[var(--text-secondary)]" }),
        "aria-label": `Switch to ${a ? "light" : "dark"} theme`
      }
    ),
    /* @__PURE__ */ o("span", { className: "text-sm font-mono text-[var(--text-primary)]", children: a ? "Dark" : "Light" })
  ] });
}
const rr = Pe(null);
function dt(e) {
  const t = Ie(rr);
  if (!t)
    throw new Error(`[@scorp-ds/components] ${e} must be used inside <Tabs>.`);
  return t;
}
function ua({
  value: e,
  defaultValue: t,
  onValueChange: r,
  children: n,
  className: a
}) {
  const s = e !== void 0, [i, l] = V(() => t ?? ""), c = s ? e : i, d = ue().replace(/:/g, ""), u = K([]), m = Ne(
    (b) => {
      s || l(b), r == null || r(b);
    },
    [s, r]
  ), f = Re(
    () => ({
      value: c,
      onValueChange: m,
      baseId: d,
      listValuesRef: u,
      isControlled: s
    }),
    [c, m, d, s]
  );
  return /* @__PURE__ */ o(rr.Provider, { value: f, children: /* @__PURE__ */ o("div", { className: E("w-full", a), children: n }) });
}
function Un(e) {
  const t = [];
  return ke.Children.forEach(e, (r) => {
    if (!ke.isValidElement(r)) return;
    if (r.type.displayName === "TabsTrigger") {
      const a = r.props.value;
      typeof a == "string" && t.push(a);
    }
  }), t;
}
function Hn({
  children: e,
  className: t,
  "aria-label": r,
  "aria-labelledby": n
}) {
  const { value: a, isControlled: s, onValueChange: i, listValuesRef: l } = dt("TabsList"), c = Un(e);
  l.current = c;
  const d = c.join("\0");
  return Le(() => {
    const u = l.current;
    s || u.length === 0 || u.includes(a) || i(u[0]);
  }, [s, l, i, a, d]), /* @__PURE__ */ o(
    "div",
    {
      role: "tablist",
      "aria-label": r,
      "aria-labelledby": n,
      className: E(
        "flex flex-wrap gap-0 border-b-[0.5px] border-solid border-[var(--surface-container-stroke)]",
        t
      ),
      children: e
    }
  );
}
Hn.displayName = "TabsList";
const Wn = le(function({ value: t, children: r, className: n, disabled: a, onKeyDown: s, onClick: i, type: l = "button", ...c }, d) {
  const { value: u, onValueChange: m, baseId: f, listValuesRef: b } = dt("TabsTrigger"), p = u === t, x = `${f}-tab-${t}`, h = `${f}-panel-${t}`, $ = (k) => {
    m(k), requestAnimationFrame(() => {
      var v;
      (v = document.getElementById(`${f}-tab-${k}`)) == null || v.focus();
    });
  }, g = (k) => {
    const v = b.current, z = v.indexOf(t);
    if (z < 0) return;
    const R = v[(z + k + v.length) % v.length];
    $(R);
  }, N = (k) => {
    if (s == null || s(k), k.defaultPrevented || a) return;
    const v = b.current;
    switch (k.key) {
      case "ArrowRight":
      case "ArrowDown":
        k.preventDefault(), g(1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        k.preventDefault(), g(-1);
        break;
      case "Home":
        k.preventDefault(), v[0] && $(v[0]);
        break;
      case "End":
        k.preventDefault(), v.length && $(v[v.length - 1]);
        break;
    }
  };
  return /* @__PURE__ */ o(
    "button",
    {
      ref: d,
      type: l,
      role: "tab",
      id: x,
      "aria-selected": p,
      "aria-controls": h,
      tabIndex: p ? 0 : -1,
      disabled: a,
      className: E(
        "-mb-px rounded-none border-b-2 px-4 py-2 font-mono text-sm transition-colors [transition-duration:var(--duration-normal)]",
        p ? "border-[var(--button-primary-background)] bg-transparent text-[var(--text-primary)]" : "border-transparent text-secondary-700 hover:text-[var(--text-primary)] dark:text-secondary-300",
        a && "cursor-not-allowed opacity-50",
        n
      ),
      onClick: (k) => {
        i == null || i(k), !k.defaultPrevented && !a && m(t);
      },
      onKeyDown: N,
      ...c,
      children: r
    }
  );
});
Wn.displayName = "TabsTrigger";
function Xn({ value: e, children: t, className: r, forceMount: n = !1 }) {
  const { value: a, baseId: s } = dt("TabsContent"), i = a === e, l = `${s}-tab-${e}`, c = `${s}-panel-${e}`;
  return !n && !i ? null : !i && n ? /* @__PURE__ */ o(
    "div",
    {
      id: c,
      role: "tabpanel",
      "aria-labelledby": l,
      hidden: !0,
      className: E("p-4 font-mono outline-none", r),
      children: t
    }
  ) : /* @__PURE__ */ o(
    "div",
    {
      id: c,
      role: "tabpanel",
      "aria-labelledby": l,
      tabIndex: 0,
      className: E(
        "p-4 font-mono outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--focus-offset-color)]",
        r
      ),
      children: t
    }
  );
}
Xn.displayName = "TabsContent";
const nr = {
  compact: "px-3 py-2",
  // 12 / 8
  comfortable: "px-4 py-3",
  // 16 / 12
  spacious: "px-5 py-4"
  // 20 / 16
}, ut = Pe("compact"), qn = le(function({ className: t, striped: r, bordered: n, density: a = "compact", children: s, ...i }, l) {
  const c = /* @__PURE__ */ o(ut.Provider, { value: a, children: /* @__PURE__ */ o(
    "table",
    {
      ref: l,
      className: E(
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
qn.displayName = "Table";
const Kn = le(function({ className: t, ...r }, n) {
  return /* @__PURE__ */ o(
    "thead",
    {
      ref: n,
      className: E(
        "border-b-[0.5px] border-solid border-[var(--surface-container-stroke)] bg-[var(--surface-subtle)]",
        t
      ),
      ...r
    }
  );
});
Kn.displayName = "TableHeader";
const Yn = le(function({ className: t, ...r }, n) {
  return /* @__PURE__ */ o("tbody", { ref: n, className: E(t), ...r });
});
Yn.displayName = "TableBody";
const Zn = le(function({ className: t, ...r }, n) {
  return /* @__PURE__ */ o(
    "tfoot",
    {
      ref: n,
      className: E(
        "border-t-[0.5px] border-solid border-[var(--surface-container-stroke)] bg-[var(--surface-subtle)]",
        t
      ),
      ...r
    }
  );
});
Zn.displayName = "TableFooter";
const Jn = le(function({ className: t, ...r }, n) {
  return /* @__PURE__ */ o(
    "tr",
    {
      ref: n,
      className: E(
        "border-b-[0.5px] border-solid border-[var(--surface-container-stroke)] transition-colors [transition-duration:var(--duration-normal)]",
        t
      ),
      ...r
    }
  );
});
Jn.displayName = "TableRow";
const Qn = le(function({ className: t, scope: r = "col", ...n }, a) {
  const s = Ie(ut);
  return /* @__PURE__ */ o(
    "th",
    {
      ref: a,
      scope: r,
      className: E(
        nr[s],
        "text-left font-semibold text-[var(--text-primary)]",
        t
      ),
      ...n
    }
  );
});
Qn.displayName = "TableHead";
const eo = le(function({ className: t, ...r }, n) {
  const a = Ie(ut);
  return /* @__PURE__ */ o(
    "td",
    {
      ref: n,
      className: E(
        nr[a],
        "align-middle text-secondary-800 dark:text-secondary-200",
        t
      ),
      ...r
    }
  );
});
eo.displayName = "TableCell";
const to = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, He = (e) => e === "top" || e === "bottom";
function Qe(e, t, r, n, a, s) {
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
function ro(e, t, r, n, a) {
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
function no(e, t, r, n, a) {
  return He(e) ? t === "start" ? r.left : t === "end" ? r.left + r.width - n : r.left + r.width / 2 - n / 2 : t === "start" ? r.top : t === "end" ? r.top + r.height - a : r.top + r.height / 2 - a / 2;
}
const zt = (e, t, r) => r < t ? t : Math.min(Math.max(e, t), r);
function oo({
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
  const b = He(r) ? m : u, p = Qe(r, e, c, d, a, s);
  if (l && p < b) {
    const N = to[r];
    Qe(N, e, c, d, a, s) > p && (f = N);
  }
  const x = ro(f, e, u, m, a), h = no(f, n, e, u, m), $ = He(f) ? x : zt(h, s, d - m - s), g = He(f) ? zt(h, s, c - u - s) : x;
  return {
    top: $,
    left: g,
    side: f,
    align: n,
    available: Math.max(0, Qe(f, e, c, d, a, s))
  };
}
const ao = typeof window < "u" ? Le : G;
function so({
  open: e,
  anchorRef: t,
  floatingRef: r,
  side: n = "bottom",
  align: a = "start",
  offset: s = 8,
  padding: i = 8
}) {
  const [l, c] = V(null), d = Ne(() => {
    const u = t.current, m = r.current;
    if (!u || !m) return;
    const f = u.getBoundingClientRect(), b = m.getBoundingClientRect(), p = oo({
      anchor: { top: f.top, left: f.left, width: f.width, height: f.height },
      floating: { width: b.width, height: b.height },
      side: n,
      align: a,
      offset: s,
      padding: i
    });
    c(
      (x) => x && x.top === p.top && x.left === p.left && x.side === p.side && x.available === p.available && x.anchorWidth === f.width ? x : { ...p, anchorWidth: f.width }
    );
  }, [t, r, n, a, s, i]);
  return ao(() => {
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
function mt({
  value: e,
  defaultValue: t,
  onChange: r
}) {
  const [n, a] = V(t), s = e !== void 0, i = s ? e : n, l = K(r);
  l.current = r;
  const c = K(i);
  c.current = i;
  const d = Ne(
    (u) => {
      var m;
      Object.is(u, c.current) || (s || a(u), (m = l.current) == null || m.call(l, u));
    },
    [s]
  );
  return [i, d];
}
const io = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function or({
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
  matchAnchorWidth: b = !1,
  role: p = "dialog",
  "aria-label": x,
  "aria-labelledby": h,
  id: $,
  className: g,
  contentClassName: N,
  triggerWrapperClassName: k,
  portal: v = !1
}) {
  const [z, R] = mt({
    value: e,
    defaultValue: t,
    onChange: r
  }), y = ue(), B = $ ?? `${y}-popover`, L = K(null), ee = K(null), te = K("programmatic"), ne = Re(
    () => ({
      get current() {
        var T;
        return (a == null ? void 0 : a.current) ?? ((T = L.current) == null ? void 0 : T.firstElementChild) ?? L.current;
      }
    }),
    [a]
  ), { position: Q } = so({ open: z, anchorRef: ne, floatingRef: ee, side: i, align: l, offset: c }), H = (T) => {
    te.current = T, R(!1);
  }, C = (T) => {
    var D, W, Z;
    return T != null && (((D = ee.current) == null ? void 0 : D.contains(T)) || ((W = L.current) == null ? void 0 : W.contains(T)) || ((Z = a == null ? void 0 : a.current) == null ? void 0 : Z.contains(T)) || !1);
  };
  G(() => {
    if (!z || !d) return;
    const T = (D) => {
      C(D.target) || H("outside");
    };
    return document.addEventListener("mousedown", T), () => document.removeEventListener("mousedown", T);
  }, [z, d]), G(() => {
    if (!z || !u) return;
    const T = (D) => {
      if (D.key !== "Escape") return;
      const W = D.target;
      (C(W) || W === document.body || W === document.documentElement) && H("escape");
    };
    return document.addEventListener("keydown", T), () => document.removeEventListener("keydown", T);
  }, [z, u]);
  const I = K(z);
  G(() => {
    var T;
    if (z && !I.current && (te.current = "programmatic", m && ee.current && (ee.current.querySelector(io) ?? ee.current).focus({ preventScroll: !0 })), !z && I.current && f) {
      const D = te.current, W = document.activeElement, Z = W == null || W === document.body;
      D !== "outside" && D !== "blur" && (Z || C(W)) && ((T = ne.current) == null || T.focus({ preventScroll: !0 }));
    }
    I.current = z;
  }, [z]);
  const P = (T) => {
    const D = T.relatedTarget;
    D && !C(D) && H("blur");
  }, U = n && At(n) ? _t(
    n,
    {
      "aria-expanded": z,
      "aria-controls": z ? B : void 0,
      "aria-haspopup": p === "dialog" ? "dialog" : void 0,
      onClick: (T) => {
        var D, W;
        (W = (D = n.props).onClick) == null || W.call(D, T), !T.defaultPrevented && (z ? H("trigger") : R(!0));
      }
    }
  ) : null, w = (T) => v && typeof document < "u" ? kr(T, document.body) : T, F = {
    position: "fixed",
    top: (Q == null ? void 0 : Q.top) ?? 0,
    left: (Q == null ? void 0 : Q.left) ?? 0,
    zIndex: "var(--z-index-popover)",
    minWidth: b && Q ? Q.anchorWidth : void 0,
    animationDuration: "var(--duration-fast)",
    // Exposed so content can cap its height to the room on the chosen side
    "--popover-available-height": Q ? `${Q.available}px` : void 0
  };
  return /* @__PURE__ */ S(be, { children: [
    U && /* @__PURE__ */ o("span", { ref: L, className: E("inline-flex", k), children: U }),
    z && w(
      /* @__PURE__ */ o(
        "div",
        {
          ref: ee,
          id: B,
          role: p ?? void 0,
          "aria-label": p ? x : void 0,
          "aria-labelledby": p ? h : void 0,
          tabIndex: -1,
          "data-side": (Q == null ? void 0 : Q.side) ?? i,
          "data-align": l,
          onBlur: P,
          style: F,
          className: E(
            "w-max max-w-[calc(100vw-1rem)] plate-round p-px bg-[var(--surface-container-stroke)] focus:outline-none",
            "animate-in fade-in motion-reduce:animate-none",
            // Measured before it is shown, so it never flashes at 0,0
            Q ? "opacity-100" : "opacity-0",
            g
          ),
          children: /* @__PURE__ */ o(
            "div",
            {
              className: E(
                "plate-round bg-[var(--surface-card)] p-4 font-mono text-sm text-[var(--text-primary)]",
                N
              ),
              children: s
            }
          )
        }
      )
    )
  ] });
}
or.displayName = "Popover";
const lo = (e, t) => e.label.toLowerCase().includes(t.trim().toLowerCase()), co = le(function({
  options: t,
  value: r,
  defaultValue: n = null,
  onValueChange: a,
  onInputChange: s,
  filter: i = lo,
  emptyText: l = "No matches",
  size: c = "md",
  label: d,
  helperText: u,
  errorMessage: m,
  error: f = !1,
  openOnFocus: b = !1,
  portal: p = !1,
  disabled: x = !1,
  placeholder: h,
  name: $,
  id: g,
  className: N,
  "aria-describedby": k,
  "aria-label": v,
  onKeyDown: z,
  onFocus: R,
  onBlur: y,
  ...B
}, L) {
  const ee = de(c, "Combobox"), te = Oe({ error: f, helperText: u, errorMessage: m, describedBy: k }), ne = ue(), Q = g ?? `${ne}-input`, H = `${ne}-listbox`, C = `${ne}-label`, I = `${ne}-empty`, P = (A) => `${ne}-option-${A}`, [U, w] = mt({
    value: r,
    defaultValue: n
  }), F = t.find((A) => A.value === U) ?? null, [T, D] = V(!1), [W, Z] = V((F == null ? void 0 : F.label) ?? ""), [J, pe] = V(!1), [ce, q] = V(-1), X = K(null), O = K(null), re = K(null);
  G(() => {
    T || Z((F == null ? void 0 : F.label) ?? "");
  }, [F == null ? void 0 : F.label, T]);
  const se = Re(
    () => J && W !== "" ? t.filter((A) => i(A, W)) : t,
    [J, W, t, i]
  ), oe = se.map((A, ae) => A.disabled ? -1 : ae).filter((A) => A >= 0), ge = oe[0] ?? -1, fe = oe[oe.length - 1] ?? -1, me = (A, ae) => {
    if (oe.length === 0) return -1;
    const he = oe.indexOf(A);
    if (he === -1) return ae === 1 ? ge : fe;
    const $e = (he + ae + oe.length) % oe.length;
    return oe[$e];
  }, ve = (A) => {
    if (x) return;
    D(!0);
    const ae = F ? se.findIndex((he) => he.value === F.value && !he.disabled) : -1;
    q(A === "selected" ? ae >= 0 ? ae : ge : A === "first" ? ge : A === "last" ? fe : -1);
  }, Be = () => {
    D(!1), pe(!1), q(-1), Z((F == null ? void 0 : F.label) ?? "");
  }, qe = (A) => {
    w((A == null ? void 0 : A.value) ?? null), ((A == null ? void 0 : A.value) ?? null) !== U && (a == null || a((A == null ? void 0 : A.value) ?? null, A)), Z((A == null ? void 0 : A.label) ?? ""), pe(!1), D(!1), q(-1);
  };
  G(() => {
    var ae;
    if (!T || ce < 0) return;
    const A = document.getElementById(P(ce));
    (ae = A == null ? void 0 : A.scrollIntoView) == null || ae.call(A, { block: "nearest" });
  }, [T, ce]);
  const mr = (A) => {
    const ae = A.target.value;
    if (Z(ae), pe(!0), s == null || s(ae), !x) {
      D(!0);
      const he = ae === "" ? t : t.filter(($e) => i($e, ae));
      q(he.findIndex(($e) => !$e.disabled));
    }
  }, fr = (A) => {
    if (z == null || z(A), !(A.defaultPrevented || x))
      switch (A.key) {
        case "ArrowDown":
          A.preventDefault(), T ? q((ae) => me(ae, 1)) : ve(A.altKey ? "none" : "selected");
          break;
        case "ArrowUp":
          A.preventDefault(), T ? q((ae) => me(ae, -1)) : ve(F ? "selected" : "last");
          break;
        case "Home":
          T && oe.length && (A.preventDefault(), q(ge));
          break;
        case "End":
          T && oe.length && (A.preventDefault(), q(fe));
          break;
        case "Enter":
          T && ce >= 0 && se[ce] && !se[ce].disabled && (A.preventDefault(), qe(se[ce]));
          break;
        case "Escape":
          T ? (A.preventDefault(), Be()) : (W !== "" || U != null) && (A.preventDefault(), qe(null));
          break;
        case "Tab":
          T && Be();
          break;
      }
  }, pr = (A) => {
    O.current = A, typeof L == "function" ? L(A) : L && (L.current = A);
  }, pt = {
    sm: { input: "h-control-sm pl-3 pr-9", icon: "right-3" },
    md: { input: "h-control-md pl-4 pr-10", icon: "right-4" },
    lg: { input: "h-control-lg pl-5 pr-11", icon: "right-5" }
  }[ee], Ke = te.invalid, br = Ke ? "bg-[var(--field-border-error)]" : "bg-[var(--field-border)] hover:bg-[var(--field-border-hover)] focus-within:!bg-[var(--field-border-focus)]", Fe = d != null && d !== "", hr = T && ce >= 0 && se[ce] ? P(ce) : void 0;
  return /* @__PURE__ */ S("div", { className: E("w-full", N), children: [
    /* @__PURE__ */ S("div", { className: "w-full space-y-1", children: [
      Fe && /* @__PURE__ */ o(
        "label",
        {
          id: C,
          htmlFor: Q,
          className: "block font-mono text-sm text-secondary-800 dark:text-secondary-200",
          children: d
        }
      ),
      /* @__PURE__ */ S(
        "div",
        {
          ref: X,
          className: E(
            "relative w-full plate-round p-px transition-colors [transition-duration:var(--duration-fast)]",
            br,
            x && "opacity-50"
          ),
          children: [
            /* @__PURE__ */ o(
              "input",
              {
                ...B,
                ref: pr,
                id: Q,
                type: "text",
                role: "combobox",
                autoComplete: "off",
                "aria-autocomplete": "list",
                "aria-expanded": T,
                "aria-controls": T ? se.length > 0 ? H : I : void 0,
                "aria-activedescendant": hr,
                "aria-invalid": Ke || void 0,
                "aria-describedby": te.describedBy,
                "aria-label": Fe ? void 0 : v,
                disabled: x,
                placeholder: h,
                value: W,
                onChange: mr,
                onKeyDown: fr,
                onClick: () => {
                  T || ve("selected");
                },
                onFocus: (A) => {
                  R == null || R(A), b && !T && ve("selected");
                },
                onBlur: (A) => {
                  y == null || y(A), T && Be();
                },
                className: E(
                  "w-full plate-round font-mono text-sm",
                  "transition-colors [transition-duration:var(--duration-fast)]",
                  "placeholder:text-[var(--field-placeholder)] focus:outline-none disabled:cursor-not-allowed",
                  Ke ? "bg-[var(--field-background-error)] text-[var(--text-primary)]" : "bg-[var(--field-background)] text-[var(--text-primary)]",
                  pt.input
                )
              }
            ),
            /* @__PURE__ */ o(
              "span",
              {
                "aria-hidden": "true",
                className: E(
                  "pointer-events-none absolute top-1/2 -translate-y-1/2 inline-flex text-[var(--text-secondary)]",
                  "transition-transform [transition-duration:var(--duration-normal)] motion-reduce:transition-none",
                  T && "rotate-180",
                  pt.icon
                ),
                children: /* @__PURE__ */ o(Y, { name: "ChevronDown" })
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ o(je, { ...te.message })
    ] }),
    $ != null && /* @__PURE__ */ o("input", { type: "hidden", name: $, value: U ?? "" }),
    /* @__PURE__ */ o(
      or,
      {
        open: T,
        onOpenChange: (A) => {
          A || Be();
        },
        anchorRef: X,
        role: null,
        autoFocus: !1,
        returnFocus: !1,
        closeOnEscape: !1,
        matchAnchorWidth: !0,
        portal: p,
        offset: 4,
        contentClassName: "p-0",
        children: se.length > 0 ? /* @__PURE__ */ o(
          "ul",
          {
            ref: re,
            id: H,
            role: "listbox",
            "aria-labelledby": Fe ? C : void 0,
            "aria-label": Fe ? void 0 : v,
            className: "max-h-[min(300px,var(--popover-available-height,300px))] overflow-y-auto py-1",
            children: se.map((A, ae) => {
              const he = A.value === U, $e = ae === ce;
              return /* @__PURE__ */ S(
                "li",
                {
                  id: P(ae),
                  role: "option",
                  "aria-selected": he,
                  "aria-disabled": A.disabled || void 0,
                  onMouseDown: (gr) => gr.preventDefault(),
                  onMouseMove: () => {
                    !A.disabled && ce !== ae && q(ae);
                  },
                  onClick: () => {
                    A.disabled || qe(A);
                  },
                  className: E(
                    "flex min-h-touch items-center gap-2 px-4 py-2 font-mono text-sm",
                    A.disabled ? "cursor-not-allowed text-[var(--text-disabled)]" : "cursor-pointer text-[var(--text-primary)]",
                    $e && !A.disabled && "bg-[var(--surface-subtle)]"
                  ),
                  children: [
                    /* @__PURE__ */ o("span", { className: "min-w-0 flex-1 truncate", children: A.label }),
                    he && /* @__PURE__ */ o(Y, { name: "Check", className: "shrink-0 text-[var(--border-focus)]" })
                  ]
                },
                A.value
              );
            })
          }
        ) : /* @__PURE__ */ o("div", { id: I, role: "status", className: "px-4 py-3 font-mono text-sm text-[var(--text-secondary)]", children: l })
      }
    )
  ] });
});
co.displayName = "Combobox";
const uo = {
  primary: "bg-primary-500 dark:bg-primary-400",
  success: "bg-success-600 dark:bg-success-400",
  warning: "bg-warning-600 dark:bg-warning-400",
  error: "bg-error-600 dark:bg-error-400"
}, mo = { sm: "h-2", md: "h-3", lg: "h-4" }, It = 4;
function fo() {
  if (typeof window > "u" || typeof getComputedStyle != "function") return 120;
  const e = getComputedStyle(document.documentElement).getPropertyValue("--duration-fast").trim(), t = e.endsWith("ms") ? parseFloat(e) : e.endsWith("s") ? parseFloat(e) * 1e3 : NaN;
  return Number.isFinite(t) && t > 0 ? t : 120;
}
function po() {
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
function bo({
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
  const d = de(s, "ProgressBar"), u = ue(), m = e == null || Number.isNaN(e), f = t > 0 ? t : 100, b = m ? 0 : Math.min(Math.max(e, 0), f), p = Math.round(b / f * 100), x = Math.floor(b / f * l), h = po(), [$, g] = V(0);
  G(() => {
    if (!m || h) return;
    const k = window.setInterval(() => g((v) => (v + 1) % (l + It)), fo());
    return () => window.clearInterval(k);
  }, [m, h, l]);
  const N = (k) => m ? h ? !0 : k > $ - It - 1 && k <= $ - 1 : k < x;
  return /* @__PURE__ */ S("div", { className: E("w-full space-y-1.5 font-mono", c), children: [
    n && /* @__PURE__ */ S("div", { className: "flex items-baseline justify-between gap-3 text-sm", children: [
      /* @__PURE__ */ o("span", { id: u, className: "min-w-0 truncate text-[var(--text-primary)]", children: r }),
      a && !m && /* @__PURE__ */ S("span", { className: "shrink-0 tabular-nums text-[var(--text-secondary)]", "aria-hidden": "true", children: [
        p,
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
        "aria-valuenow": m ? void 0 : b,
        "aria-valuetext": m ? void 0 : `${p}%`,
        "data-state": m ? "indeterminate" : b >= f ? "complete" : "loading",
        className: "bg-[var(--border-default)] p-px",
        children: /* @__PURE__ */ o(
          "div",
          {
            className: E("flex gap-0.5 bg-[var(--surface-subtle)] p-0.5", mo[d]),
            "aria-hidden": "true",
            children: Array.from({ length: l }, (k, v) => /* @__PURE__ */ o(
              "span",
              {
                "data-filled": N(v) || void 0,
                className: E(
                  "h-full flex-1",
                  N(v) ? uo[i] : "bg-[var(--surface-muted)]",
                  m && h && "opacity-50"
                )
              },
              v
            ))
          }
        )
      }
    )
  ] });
}
bo.displayName = "ProgressBar";
const ho = { sm: "size-control-sm", md: "size-control-md", lg: "size-control-lg" }, go = { animationTimingFunction: "steps(4, jump-none)" };
function xo({ variant: e = "text", lines: t = 1, size: r = "md", animated: n = !0, className: a }) {
  const s = de(r, "Skeleton"), i = n ? "animate-pulse motion-reduce:animate-none" : "", l = n ? go : void 0;
  if (e === "text") {
    const c = Math.max(1, Math.floor(t));
    return /* @__PURE__ */ o("div", { "aria-hidden": "true", "data-skeleton": "text", className: E("flex w-full flex-col gap-2", a), children: Array.from({ length: c }, (d, u) => /* @__PURE__ */ o(
      "span",
      {
        style: l,
        className: E(
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
      className: E(
        "block shrink-0 plate-round bg-[var(--surface-muted)]",
        e === "avatar" ? ho[s] : "h-24 w-full",
        i,
        a
      )
    }
  );
}
xo.displayName = "Skeleton";
const vo = {
  sm: { root: "gap-3 px-4 py-6", icon: "6", plate: "p-2", title: "text-sm", description: "text-xs", button: "sm" },
  md: { root: "gap-4 px-6 py-12", icon: "8", plate: "p-3", title: "text-lg", description: "text-sm", button: "md" }
};
function yo({
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
  const d = vo[s], u = (m, f) => /* @__PURE__ */ o(
    De,
    {
      variant: f,
      size: d.button,
      onClick: m.onClick,
      href: m.href,
      iconLeft: m.icon ? /* @__PURE__ */ o(Y, { name: m.icon }) : void 0,
      children: m.label
    }
  );
  return /* @__PURE__ */ S("div", { className: E("flex flex-col items-center text-center font-mono", d.root, c), children: [
    e && /* @__PURE__ */ o("span", { className: E("inline-flex plate-round bg-[var(--surface-subtle)] text-[var(--text-secondary)]", d.plate), children: /* @__PURE__ */ o(Y, { name: e, size: d.icon }) }),
    /* @__PURE__ */ S("div", { className: "flex max-w-prose flex-col gap-1", children: [
      /* @__PURE__ */ o(i, { className: E("font-medium text-[var(--text-primary)]", d.title), children: t }),
      r && /* @__PURE__ */ o("p", { className: E("text-[var(--text-secondary)]", d.description), children: r })
    ] }),
    (n || a) && /* @__PURE__ */ S("div", { className: "flex flex-wrap items-center justify-center gap-3", children: [
      n && u(n, "primary"),
      a && u(a, "secondary")
    ] }),
    l
  ] });
}
yo.displayName = "EmptyState";
const ar = Pe(null), sr = Pe(null);
function ir(e) {
  const t = Ie(ar);
  if (!t) throw new Error(`${e} must be used inside <Accordion>.`);
  return t;
}
function lr(e) {
  const t = Ie(sr);
  if (!t) throw new Error(`${e} must be used inside <AccordionItem>.`);
  return t;
}
function ma(e) {
  const { children: t, headingLevel: r = 3, disabled: n = !1, className: a } = e, s = e.type === "multiple", i = K(null), l = (p) => p === void 0 ? void 0 : Array.isArray(p) ? p : p === "" ? [] : [p], [c, d] = mt({
    value: l(e.value),
    defaultValue: l(e.defaultValue) ?? []
  }), u = (p) => {
    var x, h;
    d(p), s ? (x = e.onValueChange) == null || x.call(e, p) : (h = e.onValueChange) == null || h.call(e, p[0] ?? "");
  }, m = s || e.collapsible === !0, f = {
    isOpen: (p) => c.includes(p),
    isLocked: (p) => !m && c.includes(p),
    toggle: (p) => {
      if (c.includes(p)) {
        if (!m) return;
        u(c.filter((x) => x !== p));
      } else
        u(s ? [...c, p] : [p]);
    },
    headingLevel: r,
    disabled: n,
    rootRef: i
  }, b = (p) => {
    var N;
    const x = p.target;
    if (!x.hasAttribute("data-accordion-trigger")) return;
    const h = Array.from(
      ((N = i.current) == null ? void 0 : N.querySelectorAll("[data-accordion-trigger]:not(:disabled)")) ?? []
    ).filter((k) => k.closest("[data-accordion-root]") === i.current), $ = h.indexOf(x);
    if ($ === -1) return;
    let g = null;
    p.key === "ArrowDown" ? g = ($ + 1) % h.length : p.key === "ArrowUp" ? g = ($ - 1 + h.length) % h.length : p.key === "Home" ? g = 0 : p.key === "End" && (g = h.length - 1), g !== null && (p.preventDefault(), h[g].focus());
  };
  return /* @__PURE__ */ o(ar.Provider, { value: f, children: /* @__PURE__ */ o(
    "div",
    {
      ref: i,
      "data-accordion-root": "",
      onKeyDown: b,
      className: E("w-full border-t border-[var(--border-hairline)] font-mono", a),
      children: t
    }
  ) });
}
function fa({ value: e, disabled: t = !1, children: r, className: n }) {
  const a = ir("AccordionItem"), s = ue(), i = a.isOpen(e), l = {
    value: e,
    open: i,
    disabled: t || a.disabled,
    triggerId: `${s}-trigger`,
    contentId: `${s}-content`
  };
  return /* @__PURE__ */ o(sr.Provider, { value: l, children: /* @__PURE__ */ o("div", { "data-state": i ? "open" : "closed", className: E("border-b border-[var(--border-hairline)]", n), children: r }) });
}
function pa({ children: e, className: t }) {
  const r = ir("AccordionTrigger"), n = lr("AccordionTrigger"), a = `h${r.headingLevel}`, s = r.isLocked(n.value);
  return /* @__PURE__ */ o(a, { className: "m-0", children: /* @__PURE__ */ S(
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
      className: E(
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
          Y,
          {
            name: "ChevronRight",
            className: E(
              "shrink-0 text-[var(--text-secondary)] transition-transform [transition-duration:var(--duration-normal)] motion-reduce:transition-none",
              n.open && "rotate-90"
            )
          }
        )
      ]
    }
  ) });
}
function ba({ children: e, className: t }) {
  const r = lr("AccordionContent");
  return /* @__PURE__ */ o(
    "div",
    {
      id: r.contentId,
      role: "region",
      "aria-labelledby": r.triggerId,
      "data-state": r.open ? "open" : "closed",
      className: E(
        // grid-rows 0fr -> 1fr animates to the content's natural height;
        // visibility flips at the end of the close so hidden bodies leave
        // the tab order and accessibility tree.
        "grid transition-[grid-template-rows,visibility] [transition-duration:var(--duration-normal)] motion-reduce:transition-none",
        r.open ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"
      ),
      children: /* @__PURE__ */ o("div", { className: "min-h-0 overflow-hidden", children: /* @__PURE__ */ o("div", { className: E("px-4 pb-4 pt-1 font-mono text-sm text-[var(--text-secondary)]", t), children: e }) })
    }
  );
}
const wo = "focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]";
function ko({
  items: e,
  maxItems: t,
  itemsBeforeCollapse: r = 1,
  itemsAfterCollapse: n = 1,
  expandLabel: a = (l) => `Show ${l} more breadcrumb${l === 1 ? "" : "s"}`,
  "aria-label": s = "Breadcrumb",
  className: i
}) {
  const [l, c] = V(!1), d = K(null), u = K(null), m = Math.max(0, r), f = Math.max(1, n), b = !l && t != null && e.length > t && e.length > m + f, p = b ? e.length - m - f : 0;
  G(() => {
    var N;
    if (!l || u.current == null) return;
    const g = (N = d.current) == null ? void 0 : N.querySelector(
      `[data-crumb-index="${u.current}"] a, [data-crumb-index="${u.current}"] [data-crumb-link]`
    );
    g == null || g.focus(), u.current = null;
  }, [l]);
  const x = e.length - 1, h = (g, N, k) => /* @__PURE__ */ S(
    "li",
    {
      "data-crumb-index": N,
      className: "inline-flex min-w-0 items-center",
      children: [
        k && /* @__PURE__ */ o(Y, { name: "ChevronRight", size: "3", className: "mx-1 shrink-0 text-[var(--text-secondary)]" }),
        N === x ? /* @__PURE__ */ o(
          "span",
          {
            "aria-current": "page",
            className: "inline-flex min-h-touch min-w-0 items-center truncate px-1 text-[var(--text-primary)]",
            children: g.label
          }
        ) : g.as ? /* @__PURE__ */ o(
          ot,
          {
            variant: "quiet",
            as: g.as,
            asProps: { ...g.asProps, "data-crumb-link": "" },
            className: "inline-flex min-h-touch min-w-0 items-center truncate px-1",
            children: g.label
          }
        ) : /* @__PURE__ */ o(
          ot,
          {
            variant: "quiet",
            href: g.href ?? "#",
            className: "inline-flex min-h-touch min-w-0 items-center truncate px-1",
            children: g.label
          }
        )
      ]
    },
    g.key ?? N
  );
  let $;
  if (b) {
    const g = e.slice(0, m), N = e.slice(e.length - f);
    $ = /* @__PURE__ */ S(be, { children: [
      g.map((k, v) => h(k, v, v > 0)),
      /* @__PURE__ */ S("li", { className: "inline-flex items-center", children: [
        m > 0 && /* @__PURE__ */ o(Y, { name: "ChevronRight", size: "3", className: "mx-1 shrink-0 text-[var(--text-secondary)]" }),
        /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            "aria-label": a(p),
            onClick: () => {
              u.current = m, c(!0);
            },
            className: E(
              "plate-round inline-flex h-touch min-w-touch items-center justify-center px-2 text-[var(--text-primary)]",
              "transition-colors [transition-duration:var(--duration-fast)] motion-reduce:transition-none hover:bg-[var(--surface-muted)]",
              wo
            ),
            children: /* @__PURE__ */ o("span", { "aria-hidden": "true", children: "..." })
          }
        )
      ] }),
      N.map((k, v) => h(k, e.length - f + v, !0))
    ] });
  } else
    $ = e.map((g, N) => h(g, N, N > 0));
  return /* @__PURE__ */ o("nav", { "aria-label": s, className: E("font-mono text-sm", i), children: /* @__PURE__ */ o("ol", { ref: d, className: "flex min-w-0 flex-wrap items-center", children: $ }) });
}
ko.displayName = "Breadcrumbs";
const et = (e, t) => t < e ? [] : Array.from({ length: t - e + 1 }, (r, n) => e + n);
function No(e, t, r = 1, n = 1) {
  if (t <= 0) return [];
  const a = Math.min(Math.max(1, e), t), s = et(1, Math.min(n, t)), i = et(Math.max(t - n + 1, n + 1), t), l = Math.max(
    Math.min(a - r, t - n - r * 2 - 1),
    n + 2
  ), c = Math.min(
    Math.max(a + r, n + r * 2 + 2),
    i.length > 0 ? i[0] - 2 : t - 1
  ), d = [...s];
  l > n + 2 ? d.push("ellipsis-start") : n + 1 < t - n && d.push(n + 1), d.push(...et(l, c)), c < t - n - 1 ? d.push("ellipsis-end") : t - n > n && d.push(t - n), d.push(...i);
  const u = /* @__PURE__ */ new Set();
  return d.filter((m) => typeof m == "number" && (m < 1 || m > t) || u.has(m) ? !1 : (u.add(m), !0));
}
const So = {
  sm: "h-control-sm min-w-control-sm px-2 text-sm",
  md: "h-control-md min-w-control-md px-2.5 text-sm",
  lg: "h-control-lg min-w-control-lg px-3 text-base"
}, cr = {
  sm: "min-h-touch min-w-touch",
  md: "min-h-touch min-w-touch",
  lg: "min-h-control-lg min-w-control-lg"
}, Tt = { sm: "4", md: "4", lg: "5" };
function tt({
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
      className: E(
        "group inline-flex items-center justify-center font-mono focus:outline-none",
        cr[e],
        r ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      ),
      children: /* @__PURE__ */ o(
        "span",
        {
          className: E(
            "plate-round inline-flex items-center justify-center tabular-nums",
            "transition-colors [transition-duration:var(--duration-fast)] motion-reduce:transition-none",
            "group-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]",
            So[e],
            t ? "bg-[var(--button-primary-background)] text-[var(--button-primary-text)]" : E(
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
function $o({
  page: e,
  defaultPage: t = 1,
  pageCount: r,
  onPageChange: n,
  siblingCount: a = 1,
  boundaryCount: s = 1,
  size: i = "md",
  showPrevNext: l = !0,
  getPageLabel: c = (b) => `Page ${b}`,
  previousLabel: d = "Previous page",
  nextLabel: u = "Next page",
  "aria-label": m = "Pagination",
  className: f
}) {
  const b = de(i, "Pagination"), [p, x] = V(t), h = e !== void 0, g = Math.min(Math.max(1, h ? e : p), Math.max(1, r));
  if (r <= 0) return null;
  const N = (v) => {
    const z = Math.min(Math.max(1, v), r);
    z !== g && (h || x(z), n == null || n(z));
  }, k = No(g, r, a, s);
  return /* @__PURE__ */ o("nav", { "aria-label": m, className: E("font-mono", f), children: /* @__PURE__ */ S("ul", { className: "flex flex-wrap items-center", children: [
    l && /* @__PURE__ */ o("li", { children: /* @__PURE__ */ o(tt, { size: b, label: d, disabled: g <= 1, onClick: () => N(g - 1), children: /* @__PURE__ */ o(Y, { name: "ArrowLeft", size: Tt[b] }) }) }),
    k.map(
      (v) => typeof v == "number" ? /* @__PURE__ */ o("li", { children: /* @__PURE__ */ o(
        tt,
        {
          size: b,
          current: v === g,
          label: c(v),
          onClick: () => N(v),
          children: v
        }
      ) }, v) : /* @__PURE__ */ o(
        "li",
        {
          "aria-hidden": "true",
          className: E(
            "inline-flex items-center justify-center text-[var(--text-secondary)]",
            cr[b],
            b === "lg" ? "text-base" : "text-sm"
          ),
          children: "..."
        },
        v
      )
    ),
    l && /* @__PURE__ */ o("li", { children: /* @__PURE__ */ o(tt, { size: b, label: u, disabled: g >= r, onClick: () => N(g + 1), children: /* @__PURE__ */ o(Y, { name: "ArrowRight", size: Tt[b] }) }) })
  ] }) });
}
$o.displayName = "Pagination";
const ft = Pe({ collapsed: !1 });
function zo({ "aria-label": e, collapsed: t = !1, children: r, className: n }) {
  const a = ke.Children.toArray(r).some(
    (s) => ke.isValidElement(s) && s.type === dr
  );
  return /* @__PURE__ */ o(ft.Provider, { value: { collapsed: t }, children: /* @__PURE__ */ o(
    "nav",
    {
      "aria-label": e,
      "data-collapsed": t || void 0,
      className: E(
        "border border-[var(--border-hairline)] bg-[var(--surface-container)] font-mono text-sm",
        t ? "w-fit p-2" : "w-64 p-4",
        n
      ),
      children: a ? /* @__PURE__ */ o("div", { className: "space-y-4", children: r }) : /* @__PURE__ */ o("ul", { className: "space-y-1", children: r })
    }
  ) });
}
zo.displayName = "SideNav";
function dr({ heading: e, children: t, className: r }) {
  const { collapsed: n } = Ie(ft), a = ue();
  return /* @__PURE__ */ S(
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
            className: E(
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
dr.displayName = "SideNavSection";
const Io = "plate-round flex w-full min-h-touch items-center gap-3 px-3 py-2 text-left font-mono text-sm transition-colors [transition-duration:var(--duration-fast)] motion-reduce:transition-none focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]", To = "text-[var(--text-secondary)] hover:bg-[var(--surface-muted)] hover:text-[var(--accent)]", Eo = "bg-[var(--surface-muted)] text-[var(--accent)]";
function ur(e) {
  let t = !1;
  return ke.Children.forEach(e, (r) => {
    if (t || !ke.isValidElement(r)) return;
    const n = r.props;
    (n.active || ur(n.children)) && (t = !0);
  }), t;
}
function Ao({
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
  const { collapsed: b } = Ie(ft), p = ue(), x = ke.Children.toArray(c).some(ke.isValidElement), [h, $] = V(
    () => u ?? (x && ur(c))
  ), g = d ?? h, N = () => {
    const y = !g;
    d === void 0 && $(y), m == null || m(y);
  }, k = /* @__PURE__ */ S(be, { children: [
    t && /* @__PURE__ */ o(Y, { name: t, className: "shrink-0" }),
    /* @__PURE__ */ o("span", { className: E("min-w-0 flex-1 truncate", b && "sr-only"), children: e }),
    !b && l && /* @__PURE__ */ o("span", { className: "ml-auto shrink-0", children: l }),
    x && /* @__PURE__ */ o(
      Y,
      {
        name: g ? "ChevronDown" : "ChevronRight",
        size: b ? "3" : "4",
        className: E("shrink-0", !b && "ml-auto")
      }
    )
  ] }), v = E(Io, r ? Eo : To, b && "min-w-touch justify-center gap-1 px-2", f), z = b ? { "aria-label": e } : {};
  let R;
  return x ? R = /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      "aria-expanded": g,
      "aria-controls": p,
      onClick: N,
      className: v,
      ...z,
      children: k
    }
  ) : s ? R = /* @__PURE__ */ o(
    s,
    {
      className: v,
      "aria-current": r ? "page" : void 0,
      onClick: a,
      ...z,
      ...i,
      children: k
    }
  ) : n != null ? R = /* @__PURE__ */ o(
    "a",
    {
      href: n,
      "aria-current": r ? "page" : void 0,
      onClick: a,
      className: v,
      ...z,
      children: k
    }
  ) : R = /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      "aria-current": r ? "page" : void 0,
      onClick: a,
      className: v,
      ...z,
      children: k
    }
  ), /* @__PURE__ */ S("li", { children: [
    b ? /* @__PURE__ */ o(En, { content: e, position: "right", children: R }) : R,
    x && g && /* @__PURE__ */ o("ul", { id: p, className: E("mt-1 space-y-1", !b && "ml-6"), children: c })
  ] });
}
Ao.displayName = "SideNavItem";
function _o({
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
  const m = ue(), [f, b] = V(i), p = s ?? f, x = n ?? t, h = ($) => {
    s === void 0 && b($), l == null || l($);
  };
  return /* @__PURE__ */ S(
    "header",
    {
      className: E(
        "w-full border-b border-[var(--border-hairline)] bg-[var(--surface-container)] font-mono text-sm text-[var(--text-primary)]",
        a && "sticky top-0 z-[var(--z-index-sticky)]",
        u
      ),
      children: [
        /* @__PURE__ */ S("div", { className: "flex min-h-control-lg items-center gap-4 px-4 py-1", children: [
          /* @__PURE__ */ o("div", { className: "flex shrink-0 items-center", children: e }),
          t && /* @__PURE__ */ o("nav", { "aria-label": d, className: "hidden min-w-0 flex-1 md:block", children: /* @__PURE__ */ o("div", { className: "flex flex-wrap items-center gap-4", children: t }) }),
          /* @__PURE__ */ S("div", { className: "ml-auto flex shrink-0 items-center gap-2", children: [
            r,
            x && /* @__PURE__ */ o(
              De,
              {
                variant: "ghost",
                size: "lg",
                "aria-label": c,
                "aria-expanded": p,
                "aria-controls": m,
                onClick: () => h(!p),
                className: "min-w-touch md:hidden",
                children: /* @__PURE__ */ o(Y, { name: p ? "X" : "Menu", size: "5" })
              }
            )
          ] })
        ] }),
        x && p && /* @__PURE__ */ o("div", { id: m, className: "border-t border-[var(--border-hairline)] px-4 py-3 md:hidden", children: /* @__PURE__ */ o("nav", { "aria-label": d, children: /* @__PURE__ */ o("div", { className: "flex flex-col items-start gap-1", children: x }) }) })
      ]
    }
  );
}
_o.displayName = "AppHeader";
function Mo({
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
  const d = ue(), u = n === "active";
  return /* @__PURE__ */ o(
    "section",
    {
      "aria-labelledby": d,
      "data-variant": n,
      className: E(
        "plate-round-lg flex flex-col p-px",
        u ? "bg-[var(--accent)]" : "bg-[var(--surface-container-stroke)]",
        l
      ),
      children: /* @__PURE__ */ S("div", { className: "plate-round-lg flex min-h-0 flex-1 flex-col bg-[var(--surface-card)] font-mono", children: [
        /* @__PURE__ */ S(
          "div",
          {
            className: E(
              "flex min-h-control-sm shrink-0 items-center gap-2 border-b border-[var(--border-hairline)] px-4 py-1 text-xs",
              u && "bg-[var(--surface-muted)]"
            ),
            children: [
              u && /* @__PURE__ */ o(Y, { name: "ChevronRight", size: "3", className: "shrink-0 text-[var(--text-primary)]" }),
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
            className: E(
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
Mo.displayName = "Window";
const Co = {
  info: { icon: "Info", tag: "INFO", tone: "text-info-700 dark:text-info-400" },
  warn: { icon: "AlertTriangle", tag: "WARN", tone: "text-warning-700 dark:text-warning-400" },
  error: { icon: "AlertCircle", tag: "ERROR", tone: "text-error-700 dark:text-error-400" },
  debug: { icon: "Settings", tag: "DEBUG", tone: "text-secondary-700 dark:text-secondary-400" }
}, Ro = 8;
function Lo({
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
  const d = K(null), [u, m] = V(!0), [f, b] = V(0), p = K(e.length), x = Ne(
    (v) => {
      m((z) => (z !== v && (l == null || l(v)), v));
    },
    [l]
  ), h = Ne(() => {
    const v = d.current;
    v && (v.scrollTop = v.scrollHeight);
  }, []);
  Le(() => {
    const v = e.length - p.current;
    p.current = e.length, t && (u ? h() : v > 0 && b((z) => z + v));
  }, [e, t, u, h]);
  const $ = () => {
    const v = d.current;
    if (!v || !t) return;
    const z = v.scrollHeight - v.scrollTop - v.clientHeight <= Ro;
    x(z), z && b(0);
  }, g = () => {
    b(0), x(!0), h();
  }, N = e.some((v) => v.level), k = `${String(Math.max(e.length, 1)).length}ch`;
  return /* @__PURE__ */ S(
    "div",
    {
      className: E(
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
            onScroll: $,
            className: E(
              "min-h-0 flex-1 overflow-auto py-2 font-mono text-xs leading-relaxed text-[var(--text-primary)]",
              i && "plate-round-lg bg-[var(--surface-page)]",
              "focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]"
            ),
            children: e.length === 0 ? /* @__PURE__ */ o("p", { className: "px-3 text-[var(--text-secondary)]", children: s }) : e.map((v, z) => {
              const R = v.level ? Co[v.level] : null;
              return /* @__PURE__ */ S(
                "div",
                {
                  "data-level": v.level,
                  className: E("flex gap-3 px-3", n ? "items-start" : "w-max min-w-full items-start"),
                  children: [
                    r && /* @__PURE__ */ o(
                      "span",
                      {
                        "aria-hidden": "true",
                        className: "shrink-0 select-none text-right tabular-nums text-[var(--text-secondary)]",
                        style: { minWidth: k },
                        children: z + 1
                      }
                    ),
                    v.timestamp && /* @__PURE__ */ o("span", { className: "shrink-0 tabular-nums text-[var(--text-secondary)]", children: v.timestamp }),
                    R ? /* @__PURE__ */ S("span", { className: E("inline-flex w-16 shrink-0 items-center gap-1 font-bold", R.tone), children: [
                      /* @__PURE__ */ o(Y, { name: R.icon, size: "3", className: "shrink-0" }),
                      R.tag
                    ] }) : N && /* @__PURE__ */ o("span", { "aria-hidden": "true", className: "w-16 shrink-0" }),
                    /* @__PURE__ */ o("span", { className: E("min-w-0 flex-1", n ? "whitespace-pre-wrap break-words" : "whitespace-pre"), children: v.text })
                  ]
                },
                v.id
              );
            })
          }
        ),
        t && !u && /* @__PURE__ */ o("div", { className: "pointer-events-none absolute inset-x-0 bottom-3 flex justify-center", children: /* @__PURE__ */ o(
          De,
          {
            variant: "secondary",
            size: "sm",
            onClick: g,
            iconLeft: /* @__PURE__ */ o(Y, { name: "ChevronDown", size: "4" }),
            className: "pointer-events-auto",
            children: f > 0 ? `Jump to latest (${f} new)` : "Jump to latest"
          }
        ) })
      ]
    }
  );
}
Lo.displayName = "LogView";
const Po = {
  neutral: "text-[var(--text-primary)]",
  primary: "bg-[var(--button-primary-background)] text-[var(--button-primary-text)] font-bold",
  success: "bg-success-50 text-success-800 dark:bg-success-950 dark:text-success-300",
  warning: "bg-warning-50 text-warning-800 dark:bg-warning-950 dark:text-warning-300",
  error: "bg-error-50 text-error-800 dark:bg-error-950 dark:text-error-300",
  info: "bg-info-50 text-info-800 dark:bg-info-950 dark:text-info-300"
};
function Do({
  left: e,
  center: t,
  right: r,
  live: n = !1,
  "aria-label": a = "Status",
  className: s
}) {
  return /* @__PURE__ */ S(
    "div",
    {
      role: n ? "status" : "group",
      "aria-live": n ? "polite" : void 0,
      "aria-label": a,
      className: E(
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
Do.displayName = "StatusLine";
function Oo({ icon: e, tone: t = "neutral", children: r, className: n }) {
  return /* @__PURE__ */ S(
    "span",
    {
      "data-tone": t,
      className: E("inline-flex min-w-0 items-center gap-1.5 whitespace-nowrap px-3", Po[t], n),
      children: [
        e && /* @__PURE__ */ o(Y, { name: e, size: "3", className: "shrink-0" }),
        /* @__PURE__ */ o("span", { className: "truncate", children: r })
      ]
    }
  );
}
Oo.displayName = "StatusLineSegment";
function jo({ items: e, layout: t = "inline", leader: r = !1, className: n }) {
  const a = t === "inline";
  return /* @__PURE__ */ o(
    "dl",
    {
      "data-layout": t,
      className: E("font-mono text-sm", a ? "space-y-1" : "space-y-3", n),
      children: e.map((s, i) => /* @__PURE__ */ S(
        "div",
        {
          className: a ? "flex items-baseline justify-between gap-2" : "flex flex-col gap-0.5",
          children: [
            /* @__PURE__ */ o(
              "dt",
              {
                className: E(
                  "text-[var(--text-secondary)]",
                  !a && "text-xs uppercase tracking-wider",
                  a && !r && "shrink-0",
                  a && r && "flex flex-1 items-baseline after:mx-2 after:min-w-4 after:flex-1 after:border-b after:border-dotted after:border-[var(--surface-container-stroke)] after:content-['']"
                ),
                children: s.term
              }
            ),
            /* @__PURE__ */ o("dd", { className: E("min-w-0 text-[var(--text-primary)]", a && "text-right"), children: s.description })
          ]
        },
        s.key ?? i
      ))
    }
  );
}
jo.displayName = "DescriptionList";
function Bo({
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
const Fo = {
  primary: "bg-primary-600 dark:bg-primary-400",
  success: "bg-success-600 dark:bg-success-400",
  warning: "bg-warning-600 dark:bg-warning-400",
  error: "bg-error-600 dark:bg-error-400"
};
function Vo({
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
  const f = de(u, "Meter"), b = ue(), p = r - t || 1, x = Math.min(Math.max(e, t), r), h = (x - t) / p, $ = l ?? `${Math.round(h * 100)}%`, g = c ?? Bo({ value: e, min: t, max: r, low: n, high: a, optimum: s }), N = Math.max(1, Math.round(d)), k = Math.round(h * N);
  return /* @__PURE__ */ S("div", { className: E("font-mono text-sm", m), "data-tone": g, children: [
    /* @__PURE__ */ S("div", { className: "mb-1 flex items-baseline justify-between gap-3", children: [
      /* @__PURE__ */ o("span", { id: b, className: "text-[var(--text-primary)]", children: i }),
      /* @__PURE__ */ S("span", { className: "inline-flex items-center gap-1 tabular-nums text-[var(--text-secondary)]", children: [
        g === "warning" && /* @__PURE__ */ o(Y, { name: "AlertTriangle", size: "3" }),
        g === "error" && /* @__PURE__ */ o(Y, { name: "AlertCircle", size: "3" }),
        $
      ] })
    ] }),
    /* @__PURE__ */ o(
      "div",
      {
        role: "meter",
        "aria-labelledby": b,
        "aria-valuenow": x,
        "aria-valuemin": t,
        "aria-valuemax": r,
        "aria-valuetext": $,
        className: "flex gap-0.5",
        children: Array.from({ length: N }, (v, z) => /* @__PURE__ */ o(
          "span",
          {
            "data-filled": z < k || void 0,
            className: E(
              "flex-1",
              f === "sm" ? "h-2" : "h-3",
              z < k ? Fo[g] : "bg-[var(--surface-muted)] ring-1 ring-inset ring-[var(--surface-container-stroke)]"
            )
          },
          z
        ))
      }
    )
  ] });
}
Vo.displayName = "Meter";
function Go(e) {
  return e.textValue ? e.textValue : typeof e.label == "string" || typeof e.label == "number" ? String(e.label) : "";
}
const Uo = "plate-round flex min-h-touch cursor-pointer items-center gap-2 py-1 pr-3 font-mono text-sm pl-[calc(var(--tree-level)_*_theme(spacing.4)_+_theme(spacing.2))] transition-colors [transition-duration:var(--duration-fast)] motion-reduce:transition-none";
function Ho({
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
  var C;
  const [f, b] = V(a), p = n ?? f, x = Re(() => new Set(p), [p]), [h, $] = V(l), g = i !== void 0 ? i : h, [N, k] = V(null), v = K(/* @__PURE__ */ new Map()), z = K(!1), R = K({ buffer: "", timer: 0 }), y = Re(() => {
    const I = [], P = (U, w, F) => {
      for (const T of U) {
        const D = Array.isArray(T.children);
        I.push({ node: T, level: w, parentId: F, isBranch: D }), D && x.has(T.id) && P(T.children, w + 1, T.id);
      }
    };
    return P(e, 1, null), I;
  }, [e, x]), B = N && y.some((I) => I.node.id === N) && N || g && y.some((I) => I.node.id === g) && g || ((C = y[0]) == null ? void 0 : C.node.id) || null;
  G(() => {
    var I;
    !z.current || !N || (z.current = !1, (I = v.current.get(N)) == null || I.focus());
  }, [N, y]), G(() => () => clearTimeout(R.current.timer), []);
  const L = (I) => {
    var P;
    I && (z.current = !0, k(I), I === N && ((P = v.current.get(I)) == null || P.focus()));
  }, ee = Ne(
    (I, P) => {
      if (x.has(I) === P) return;
      const w = P ? [...p, I] : p.filter((F) => F !== I);
      n === void 0 && b(w), s == null || s(w);
    },
    [x, p, n, s]
  ), te = (I) => {
    I.node.disabled || g !== I.node.id && (i === void 0 && $(I.node.id), c == null || c(I.node.id));
  }, ne = (I, P) => {
    const U = R.current;
    clearTimeout(U.timer), U.buffer += I.toLowerCase(), U.timer = setTimeout(() => {
      U.buffer = "";
    }, 500);
    const w = y.length, F = U.buffer.length === 1 ? P + 1 : P;
    for (let T = 0; T < w; T++) {
      const D = y[(F + T) % w];
      if (Go(D.node).toLowerCase().startsWith(U.buffer)) {
        L(D.node.id);
        return;
      }
    }
  }, Q = (I, P) => {
    var F, T, D, W, Z;
    if (I.target !== I.currentTarget) return;
    const U = y.findIndex((J) => J.node.id === P.node.id), w = x.has(P.node.id);
    switch (I.key) {
      case "ArrowDown":
        I.preventDefault(), L((F = y[U + 1]) == null ? void 0 : F.node.id);
        break;
      case "ArrowUp":
        I.preventDefault(), L((T = y[U - 1]) == null ? void 0 : T.node.id);
        break;
      case "ArrowRight":
        if (I.preventDefault(), !P.isBranch) break;
        w ? ((D = y[U + 1]) == null ? void 0 : D.parentId) === P.node.id && L(y[U + 1].node.id) : ee(P.node.id, !0);
        break;
      case "ArrowLeft":
        I.preventDefault(), P.isBranch && w ? ee(P.node.id, !1) : P.parentId && L(P.parentId);
        break;
      case "Home":
        I.preventDefault(), L((W = y[0]) == null ? void 0 : W.node.id);
        break;
      case "End":
        I.preventDefault(), L((Z = y[y.length - 1]) == null ? void 0 : Z.node.id);
        break;
      case "Enter":
        I.preventDefault(), te(P), P.node.disabled || d == null || d(P.node.id);
        break;
      case " ":
        I.preventDefault(), te(P);
        break;
      default:
        u && I.key.length === 1 && !I.ctrlKey && !I.metaKey && !I.altKey && /\S/.test(I.key) && (I.preventDefault(), ne(I.key, U));
    }
  }, H = (I, P, U) => I.map((w, F) => {
    const T = Array.isArray(w.children), D = T && x.has(w.id), W = g === w.id, Z = { node: w, parentId: U, isBranch: T };
    return /* @__PURE__ */ S(
      "li",
      {
        ref: (J) => {
          J ? v.current.set(w.id, J) : v.current.delete(w.id);
        },
        role: "treeitem",
        "aria-level": P,
        "aria-setsize": I.length,
        "aria-posinset": F + 1,
        "aria-expanded": T ? D : void 0,
        "aria-selected": W,
        "aria-disabled": w.disabled || void 0,
        tabIndex: B === w.id ? 0 : -1,
        onKeyDown: (J) => Q(J, Z),
        onFocus: (J) => {
          J.target === J.currentTarget && k(w.id);
        },
        className: "focus:outline-none [&:focus-visible>div]:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]",
        children: [
          /* @__PURE__ */ S(
            "div",
            {
              style: { "--tree-level": P - 1 },
              onClick: (J) => {
                J.stopPropagation(), L(w.id), te(Z), T && ee(w.id, !D), !w.disabled && !T && (d == null || d(w.id));
              },
              className: E(
                Uo,
                W ? "bg-[var(--surface-muted)] text-[var(--accent)]" : "text-[var(--text-primary)] hover:bg-[var(--surface-muted)]",
                w.disabled && "cursor-not-allowed opacity-50"
              ),
              children: [
                /* @__PURE__ */ o("span", { className: "inline-flex w-4 shrink-0 justify-center text-[var(--text-secondary)]", children: T && /* @__PURE__ */ o(Y, { name: D ? "ChevronDown" : "ChevronRight", size: "3" }) }),
                w.icon && /* @__PURE__ */ o(Y, { name: w.icon, className: "shrink-0" }),
                /* @__PURE__ */ o("span", { className: "min-w-0 truncate", children: w.label })
              ]
            }
          ),
          T && D && w.children.length > 0 && /* @__PURE__ */ o("ul", { role: "group", children: H(w.children, P + 1, w.id) })
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
      className: E("font-mono text-sm", m),
      children: H(e, 1, null)
    }
  );
}
Ho.displayName = "TreeView";
const Wo = {
  sm: "h-5 min-w-5 px-1.5 text-xs",
  md: "h-6 min-w-6 px-2 text-sm"
};
function Et({ size: e, children: t, className: r }) {
  return /* @__PURE__ */ o(
    "kbd",
    {
      className: E(
        "plate-round inline-flex bg-[var(--surface-container-stroke)] px-px pb-0.5 pt-px align-middle font-mono",
        r
      ),
      children: /* @__PURE__ */ o(
        "span",
        {
          className: E(
            "plate-round inline-flex items-center justify-center bg-[var(--surface-muted)] leading-none text-[var(--text-primary)]",
            Wo[e]
          ),
          children: t
        }
      )
    }
  );
}
function Xo({ keys: e, children: t, size: r = "sm", separator: n = "+", className: a }) {
  const s = de(r, "Kbd", "sm");
  return !e || e.length <= 1 ? /* @__PURE__ */ o(Et, { size: s, className: a, children: (e == null ? void 0 : e[0]) ?? t }) : /* @__PURE__ */ o("kbd", { className: E("inline-flex items-center gap-1 align-middle font-mono", a), children: e.map((i, l) => /* @__PURE__ */ S(vr, { children: [
    l > 0 && /* @__PURE__ */ o("span", { className: E("text-[var(--text-secondary)]", s === "sm" ? "text-xs" : "text-sm"), children: n }),
    /* @__PURE__ */ o(Et, { size: s, children: i })
  ] }, `${i}-${l}`)) });
}
Xo.displayName = "Kbd";
const qo = {
  none: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  6: "gap-6",
  8: "gap-8"
};
function ha({ children: e, gap: t = "4", className: r, axis: n = "vertical" }) {
  return /* @__PURE__ */ o(
    "div",
    {
      className: E(
        "flex",
        n === "vertical" ? "flex-col" : "flex-row flex-wrap items-center",
        qo[t],
        r
      ),
      children: e
    }
  );
}
function ga({ children: e, ...t }) {
  return /* @__PURE__ */ o(
    wr,
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
  ma as Accordion,
  ba as AccordionContent,
  fa as AccordionItem,
  pa as AccordionTrigger,
  na as Alert,
  _o as AppHeader,
  Sn as Avatar,
  ra as Badge,
  ca as BottomSheet,
  ko as Breadcrumbs,
  De as Button,
  ta as Card,
  sa as CaseStudyBlocks,
  _n as Checkbox,
  co as Combobox,
  jo as DescriptionList,
  oa as Divider,
  aa as Dropdown,
  yo as EmptyState,
  Nn as Input,
  Xo as Kbd,
  ot as Link,
  Dn as ListRow,
  Lo as LogView,
  Vo as Meter,
  ea as Modal,
  $o as Pagination,
  or as Popover,
  bo as ProgressBar,
  Cn as Radio,
  An as Select,
  zo as SideNav,
  Ao as SideNavItem,
  dr as SideNavSection,
  xo as Skeleton,
  Mn as Slider,
  Kt as Spinner,
  ha as Stack,
  Do as StatusLine,
  Oo as StatusLineSegment,
  Yt as Switch,
  Qo as TUI_ICON_GLYPHS,
  qn as Table,
  Yn as TableBody,
  eo as TableCell,
  Zn as TableFooter,
  Qn as TableHead,
  Kn as TableHeader,
  Jn as TableRow,
  ua as Tabs,
  Xn as TabsContent,
  Hn as TabsList,
  Wn as TabsTrigger,
  Rn as Textarea,
  ga as ThemeProvider,
  da as ThemeToggle,
  Bn as Toast,
  la as Toaster,
  En as Tooltip,
  Ho as TreeView,
  Y as TuiIcon,
  Mo as Window,
  E as cn,
  Bo as getMeterTone,
  No as getPaginationRange,
  Gn as toast,
  ia as useToast
};
//# sourceMappingURL=index.esm.js.map

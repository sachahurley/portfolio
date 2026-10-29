import { jsxs as y, jsx as o, Fragment as we } from "react/jsx-runtime";
import Ie, { useState as V, useEffect as G, forwardRef as re, useId as ue, useRef as Q, useCallback as pe, useMemo as Pe, useLayoutEffect as Me, isValidElement as qe, cloneElement as yt, useImperativeHandle as Gr, Fragment as wt, Children as Zt, useSyncExternalStore as Qt, createContext as Be, useContext as Te } from "react";
import { useTheme as Hr, ThemeProvider as Ur } from "next-themes";
import { createPortal as Wr } from "react-dom";
const Kr = { small: "sm", medium: "md", large: "lg" }, At = /* @__PURE__ */ new Set();
function de(e, t, r = "md") {
  if (e == null) return r;
  const n = Kr[e];
  return n ? (!(process.env.NODE_ENV === "production") && !At.has(t) && (At.add(t), console.warn(
    `[@scorp-ds/components] ${t}: size="${e}" is deprecated. Use size="${n}" (the scale is sm | md | lg).`
  )), n) : e;
}
function Jt(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var a = e.length;
    for (t = 0; t < a; t++) e[t] && (r = Jt(e[t])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function qr() {
  for (var e, t, r = 0, n = "", a = arguments.length; r < a; r++) (e = arguments[r]) && (t = Jt(e)) && (n && (n += " "), n += t);
  return n;
}
const Xr = (e, t) => {
  const r = new Array(e.length + t.length);
  for (let n = 0; n < e.length; n++)
    r[n] = e[n];
  for (let n = 0; n < t.length; n++)
    r[e.length + n] = t[n];
  return r;
}, Yr = (e, t) => ({
  classGroupId: e,
  validator: t
}), er = (e = /* @__PURE__ */ new Map(), t = null, r) => ({
  nextPart: e,
  validators: t,
  classGroupId: r
}), rt = "-", Mt = [], Zr = "arbitrary..", Qr = (e) => {
  const t = en(e), {
    conflictingClassGroups: r,
    conflictingClassGroupModifiers: n
  } = e;
  return {
    getClassGroupId: (i) => {
      if (i.startsWith("[") && i.endsWith("]"))
        return Jr(i);
      const l = i.split(rt), c = l[0] === "" && l.length > 1 ? 1 : 0;
      return tr(l, c, t);
    },
    getConflictingClassGroupIds: (i, l) => {
      if (l) {
        const c = n[i], d = r[i];
        return c ? d ? Xr(d, c) : c : d || Mt;
      }
      return r[i] || Mt;
    }
  };
}, tr = (e, t, r) => {
  if (e.length - t === 0)
    return r.classGroupId;
  const a = e[t], s = r.nextPart.get(a);
  if (s) {
    const d = tr(e, t + 1, s);
    if (d) return d;
  }
  const i = r.validators;
  if (i === null)
    return;
  const l = t === 0 ? e.join(rt) : e.slice(t).join(rt), c = i.length;
  for (let d = 0; d < c; d++) {
    const u = i[d];
    if (u.validator(l))
      return u.classGroupId;
  }
}, Jr = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const t = e.slice(1, -1), r = t.indexOf(":"), n = t.slice(0, r);
  return n ? Zr + n : void 0;
})(), en = (e) => {
  const {
    theme: t,
    classGroups: r
  } = e;
  return tn(r, t);
}, tn = (e, t) => {
  const r = er();
  for (const n in e) {
    const a = e[n];
    kt(a, r, n, t);
  }
  return r;
}, kt = (e, t, r, n) => {
  const a = e.length;
  for (let s = 0; s < a; s++) {
    const i = e[s];
    rn(i, t, r, n);
  }
}, rn = (e, t, r, n) => {
  if (typeof e == "string") {
    nn(e, t, r);
    return;
  }
  if (typeof e == "function") {
    on(e, t, r, n);
    return;
  }
  an(e, t, r, n);
}, nn = (e, t, r) => {
  const n = e === "" ? t : rr(t, e);
  n.classGroupId = r;
}, on = (e, t, r, n) => {
  if (sn(e)) {
    kt(e(n), t, r, n);
    return;
  }
  t.validators === null && (t.validators = []), t.validators.push(Yr(r, e));
}, an = (e, t, r, n) => {
  const a = Object.entries(e), s = a.length;
  for (let i = 0; i < s; i++) {
    const [l, c] = a[i];
    kt(c, rr(t, l), r, n);
  }
}, rr = (e, t) => {
  let r = e;
  const n = t.split(rt), a = n.length;
  for (let s = 0; s < a; s++) {
    const i = n[s];
    let l = r.nextPart.get(i);
    l || (l = er(), r.nextPart.set(i, l)), r = l;
  }
  return r;
}, sn = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, ln = (e) => {
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
}, ft = "!", Lt = ":", cn = [], Rt = (e, t, r, n, a) => ({
  modifiers: e,
  hasImportantModifier: t,
  baseClassName: r,
  maybePostfixModifierPosition: n,
  isExternal: a
}), dn = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: r
  } = e;
  let n = (a) => {
    const s = [];
    let i = 0, l = 0, c = 0, d;
    const u = a.length;
    for (let f = 0; f < u; f++) {
      const x = a[f];
      if (i === 0 && l === 0) {
        if (x === Lt) {
          s.push(a.slice(c, f)), c = f + 1;
          continue;
        }
        if (x === "/") {
          d = f;
          continue;
        }
      }
      x === "[" ? i++ : x === "]" ? i-- : x === "(" ? l++ : x === ")" && l--;
    }
    const b = s.length === 0 ? a : a.slice(c);
    let h = b, p = !1;
    b.endsWith(ft) ? (h = b.slice(0, -1), p = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      b.startsWith(ft) && (h = b.slice(1), p = !0)
    );
    const m = d && d > c ? d - c : void 0;
    return Rt(s, p, h, m);
  };
  if (t) {
    const a = t + Lt, s = n;
    n = (i) => i.startsWith(a) ? s(i.slice(a.length)) : Rt(cn, !1, i, void 0, !0);
  }
  if (r) {
    const a = n;
    n = (s) => r({
      className: s,
      parseClassName: a
    });
  }
  return n;
}, un = (e) => {
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
}, mn = (e) => ({
  cache: ln(e.cacheSize),
  parseClassName: dn(e),
  sortModifiers: un(e),
  ...Qr(e)
}), fn = /\s+/, pn = (e, t) => {
  const {
    parseClassName: r,
    getClassGroupId: n,
    getConflictingClassGroupIds: a,
    sortModifiers: s
  } = t, i = [], l = e.trim().split(fn);
  let c = "";
  for (let d = l.length - 1; d >= 0; d -= 1) {
    const u = l[d], {
      isExternal: b,
      modifiers: h,
      hasImportantModifier: p,
      baseClassName: m,
      maybePostfixModifierPosition: f
    } = r(u);
    if (b) {
      c = u + (c.length > 0 ? " " + c : c);
      continue;
    }
    let x = !!f, k = n(x ? m.substring(0, f) : m);
    if (!k) {
      if (!x) {
        c = u + (c.length > 0 ? " " + c : c);
        continue;
      }
      if (k = n(m), !k) {
        c = u + (c.length > 0 ? " " + c : c);
        continue;
      }
      x = !1;
    }
    const g = h.length === 0 ? "" : h.length === 1 ? h[0] : s(h).join(":"), z = p ? g + ft : g, $ = z + k;
    if (i.indexOf($) > -1)
      continue;
    i.push($);
    const w = a(k, x);
    for (let N = 0; N < w.length; ++N) {
      const T = w[N];
      i.push(z + T);
    }
    c = u + (c.length > 0 ? " " + c : c);
  }
  return c;
}, bn = (...e) => {
  let t = 0, r, n, a = "";
  for (; t < e.length; )
    (r = e[t++]) && (n = nr(r)) && (a && (a += " "), a += n);
  return a;
}, nr = (e) => {
  if (typeof e == "string")
    return e;
  let t, r = "";
  for (let n = 0; n < e.length; n++)
    e[n] && (t = nr(e[n])) && (r && (r += " "), r += t);
  return r;
}, hn = (e, ...t) => {
  let r, n, a, s;
  const i = (c) => {
    const d = t.reduce((u, b) => b(u), e());
    return r = mn(d), n = r.cache.get, a = r.cache.set, s = l, l(c);
  }, l = (c) => {
    const d = n(c);
    if (d)
      return d;
    const u = pn(c, r);
    return a(c, u), u;
  };
  return s = i, (...c) => s(bn(...c));
}, gn = [], le = (e) => {
  const t = (r) => r[e] || gn;
  return t.isThemeGetter = !0, t;
}, or = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, ar = /^\((?:(\w[\w-]*):)?(.+)\)$/i, xn = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, vn = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, yn = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, wn = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, kn = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Nn = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, $e = (e) => xn.test(e), H = (e) => !!e && !Number.isNaN(Number(e)), ze = (e) => !!e && Number.isInteger(Number(e)), st = (e) => e.endsWith("%") && H(e.slice(0, -1)), Ne = (e) => vn.test(e), sr = () => !0, Sn = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  yn.test(e) && !wn.test(e)
), Nt = () => !1, $n = (e) => kn.test(e), zn = (e) => Nn.test(e), In = (e) => !M(e) && !L(e), Tn = (e) => Ee(e, cr, Nt), M = (e) => or.test(e), _e = (e) => Ee(e, dr, Sn), Ot = (e) => Ee(e, On, H), En = (e) => Ee(e, mr, sr), Cn = (e) => Ee(e, ur, Nt), Dt = (e) => Ee(e, ir, Nt), _n = (e) => Ee(e, lr, zn), Qe = (e) => Ee(e, fr, $n), L = (e) => ar.test(e), Ge = (e) => Le(e, dr), An = (e) => Le(e, ur), Pt = (e) => Le(e, ir), Mn = (e) => Le(e, cr), Ln = (e) => Le(e, lr), Je = (e) => Le(e, fr, !0), Rn = (e) => Le(e, mr, !0), Ee = (e, t, r) => {
  const n = or.exec(e);
  return n ? n[1] ? t(n[1]) : r(n[2]) : !1;
}, Le = (e, t, r = !1) => {
  const n = ar.exec(e);
  return n ? n[1] ? t(n[1]) : r : !1;
}, ir = (e) => e === "position" || e === "percentage", lr = (e) => e === "image" || e === "url", cr = (e) => e === "length" || e === "size" || e === "bg-size", dr = (e) => e === "length", On = (e) => e === "number", ur = (e) => e === "family-name", mr = (e) => e === "number" || e === "weight", fr = (e) => e === "shadow", Dn = () => {
  const e = le("color"), t = le("font"), r = le("text"), n = le("font-weight"), a = le("tracking"), s = le("leading"), i = le("breakpoint"), l = le("container"), c = le("spacing"), d = le("radius"), u = le("shadow"), b = le("inset-shadow"), h = le("text-shadow"), p = le("drop-shadow"), m = le("blur"), f = le("perspective"), x = le("aspect"), k = le("ease"), g = le("animate"), z = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], $ = () => [
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
  ], w = () => [...$(), L, M], N = () => ["auto", "hidden", "clip", "visible", "scroll"], T = () => ["auto", "contain", "none"], v = () => [L, M, c], R = () => [$e, "full", "auto", ...v()], E = () => [ze, "none", "subgrid", L, M], W = () => ["auto", {
    span: ["full", ze, L, M]
  }, ze, L, M], J = () => [ze, "auto", L, M], oe = () => ["auto", "min", "max", "fr", L, M], K = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], te = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], F = () => ["auto", ...v()], _ = () => [$e, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...v()], D = () => [$e, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...v()], q = () => [$e, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...v()], S = () => [e, L, M], O = () => [...$(), Pt, Dt, {
    position: [L, M]
  }], C = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], B = () => ["auto", "cover", "contain", Mn, Tn, {
    size: [L, M]
  }], X = () => [st, Ge, _e], U = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    d,
    L,
    M
  ], Y = () => ["", H, Ge, _e], ce = () => ["solid", "dashed", "dotted", "double"], ae = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], Z = () => [H, st, Pt, Dt], fe = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    m,
    L,
    M
  ], ge = () => ["none", H, L, M], xe = () => ["none", H, L, M], j = () => [H, L, M], P = () => [$e, "full", ...v()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Ne],
      breakpoint: [Ne],
      color: [sr],
      container: [Ne],
      "drop-shadow": [Ne],
      ease: ["in", "out", "in-out"],
      font: [In],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Ne],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Ne],
      shadow: [Ne],
      spacing: ["px", H],
      text: [Ne],
      "text-shadow": [Ne],
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
        aspect: ["auto", "square", $e, M, L, x]
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
        columns: [H, M, L, l]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": z()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": z()
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
        object: w()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: N()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": N()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": N()
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
        inset: R()
      }],
      /**
       * Inset Inline
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": R()
      }],
      /**
       * Inset Block
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": R()
      }],
      /**
       * Inset Inline Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-s` in next major release
       */
      start: [{
        "inset-s": R(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        start: R()
      }],
      /**
       * Inset Inline End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-e` in next major release
       */
      end: [{
        "inset-e": R(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        end: R()
      }],
      /**
       * Inset Block Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-bs": [{
        "inset-bs": R()
      }],
      /**
       * Inset Block End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-be": [{
        "inset-be": R()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: R()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: R()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: R()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: R()
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
        z: [ze, "auto", L, M]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [$e, "full", "auto", l, ...v()]
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
        flex: [H, $e, "auto", "initial", "none", M]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", H, L, M]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", H, L, M]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [ze, "first", "last", "none", L, M]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": E()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: W()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": J()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": J()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": E()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: W()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": J()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": J()
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
        justify: [...K(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...te(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...te()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...K()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...te(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...te(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": K()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...te(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...te()]
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
        m: F()
      }],
      /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: F()
      }],
      /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: F()
      }],
      /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: F()
      }],
      /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: F()
      }],
      /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */
      mbs: [{
        mbs: F()
      }],
      /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */
      mbe: [{
        mbe: F()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: F()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: F()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: F()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: F()
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
        size: _()
      }],
      /**
       * Inline Size
       * @see https://tailwindcss.com/docs/width
       */
      "inline-size": [{
        inline: ["auto", ...D()]
      }],
      /**
       * Min-Inline Size
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-inline-size": [{
        "min-inline": ["auto", ...D()]
      }],
      /**
       * Max-Inline Size
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-inline-size": [{
        "max-inline": ["none", ...D()]
      }],
      /**
       * Block Size
       * @see https://tailwindcss.com/docs/height
       */
      "block-size": [{
        block: ["auto", ...q()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-block-size": [{
        "min-block": ["auto", ...q()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-block-size": [{
        "max-block": ["none", ...q()]
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [l, "screen", ..._()]
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
          ..._()
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
          ..._()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ..._()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ..._()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ..._()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", r, Ge, _e]
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
        font: [n, Rn, En]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", st, M]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [An, Cn, t]
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
        tracking: [a, L, M]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [H, "none", L, Ot]
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
        "list-image": ["none", L, M]
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
        list: ["disc", "decimal", "none", L, M]
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
        placeholder: S()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: S()
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
        decoration: [...ce(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [H, "from-font", "auto", L, _e]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: S()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [H, "auto", L, M]
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
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", L, M]
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
        content: ["none", L, M]
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
        bg: O()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: C()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: B()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, ze, L, M],
          radial: ["", L, M],
          conic: [ze, L, M]
        }, Ln, _n]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: S()
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
        from: S()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: S()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: S()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: U()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": U()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": U()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": U()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": U()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": U()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": U()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": U()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": U()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": U()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": U()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": U()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": U()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": U()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": U()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: Y()
      }],
      /**
       * Border Width Inline
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": Y()
      }],
      /**
       * Border Width Block
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": Y()
      }],
      /**
       * Border Width Inline Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": Y()
      }],
      /**
       * Border Width Inline End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": Y()
      }],
      /**
       * Border Width Block Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-bs": [{
        "border-bs": Y()
      }],
      /**
       * Border Width Block End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-be": [{
        "border-be": Y()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": Y()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": Y()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": Y()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": Y()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": Y()
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
        "divide-y": Y()
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
        border: [...ce(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...ce(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: S()
      }],
      /**
       * Border Color Inline
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": S()
      }],
      /**
       * Border Color Block
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": S()
      }],
      /**
       * Border Color Inline Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": S()
      }],
      /**
       * Border Color Inline End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": S()
      }],
      /**
       * Border Color Block Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-bs": [{
        "border-bs": S()
      }],
      /**
       * Border Color Block End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-be": [{
        "border-be": S()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": S()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": S()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": S()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": S()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: S()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...ce(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [H, L, M]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", H, Ge, _e]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: S()
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
          Je,
          Qe
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: S()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", b, Je, Qe]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": S()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: Y()
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
        ring: S()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [H, _e]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": S()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": Y()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": S()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", h, Je, Qe]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": S()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [H, L, M]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...ae(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": ae()
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
        "mask-linear": [H]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": Z()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": Z()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": S()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": S()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": Z()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": Z()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": S()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": S()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": Z()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": Z()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": S()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": S()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": Z()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": Z()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": S()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": S()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": Z()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": Z()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": S()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": S()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": Z()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": Z()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": S()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": S()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": Z()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": Z()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": S()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": S()
      }],
      "mask-image-radial": [{
        "mask-radial": [L, M]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": Z()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": Z()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": S()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": S()
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
        "mask-radial-at": $()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [H]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": Z()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": Z()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": S()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": S()
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
        mask: O()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: C()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: B()
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
        mask: ["none", L, M]
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
          L,
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
        brightness: [H, L, M]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [H, L, M]
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
          p,
          Je,
          Qe
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": S()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", H, L, M]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [H, L, M]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", H, L, M]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [H, L, M]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", H, L, M]
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
          L,
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
        "backdrop-brightness": [H, L, M]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [H, L, M]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", H, L, M]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [H, L, M]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", H, L, M]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [H, L, M]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [H, L, M]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", H, L, M]
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
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", L, M]
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
        duration: [H, "initial", L, M]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", k, L, M]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [H, L, M]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", g, L, M]
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
        perspective: [f, L, M]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": w()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: ge()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": ge()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": ge()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": ge()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: xe()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": xe()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": xe()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": xe()
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
        skew: j()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": j()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": j()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [L, M, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: w()
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
        translate: P()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": P()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": P()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": P()
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
        accent: S()
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
        caret: S()
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", L, M]
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
        "will-change": ["auto", "scroll", "contents", "transform", L, M]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...S()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [H, Ge, _e, Ot]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...S()]
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
}, Pn = /* @__PURE__ */ hn(Dn);
function I(...e) {
  return Pn(qr(e));
}
const Ue = [
  [0, 0],
  [3, 0],
  [6, 0],
  [6, 3],
  [6, 6],
  [3, 6],
  [0, 6],
  [0, 3]
], Bn = 2, jn = 100, Bt = "(prefers-reduced-motion: reduce)";
function pr(e) {
  return Ue.filter((t, r) => e === null || (r - e + Ue.length) % Ue.length >= Bn).map(([t, r]) => `M${t} ${r}h2v2h-2Z`).join("");
}
const Fn = Ue.map((e, t) => pr(t)), Vn = pr(null);
function Gn() {
  const [e, t] = V(
    () => typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia(Bt).matches
  );
  return G(() => {
    var a;
    if (typeof window > "u" || typeof window.matchMedia != "function") return;
    const r = window.matchMedia(Bt), n = () => t(r.matches);
    return n(), (a = r.addEventListener) == null || a.call(r, "change", n), () => {
      var s;
      return (s = r.removeEventListener) == null ? void 0 : s.call(r, "change", n);
    };
  }, []), e;
}
function br({ size: e = "md", label: t = "Loading", className: r }) {
  const n = de(e, "Spinner"), a = Gn(), [s, i] = V(0);
  G(() => {
    if (a) return;
    const u = setInterval(() => i((b) => (b + 1) % Ue.length), jn);
    return () => clearInterval(u);
  }, [a]);
  const l = {
    sm: { box: "w-3 h-3", pixel: 1.5 },
    md: { box: "w-4 h-4", pixel: 2 },
    lg: { box: "w-6 h-6", pixel: 3 }
  }, { box: c, pixel: d } = l[n];
  return /* @__PURE__ */ y("span", { role: "status", className: I("inline-flex shrink-0 items-center justify-center", c, r), children: [
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
        children: /* @__PURE__ */ o("path", { d: a ? Vn : Fn[s] })
      }
    ),
    /* @__PURE__ */ o("span", { className: "sr-only", children: t })
  ] });
}
br.displayName = "Spinner";
const Hn = {
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
}, Un = {
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
function Wn(e) {
  let t = "";
  return e.forEach((r, n) => {
    for (const a of r.matchAll(/#+/g))
      t += `M${a.index} ${n}h${a[0].length}v1h-${a[0].length}Z`;
  }), t;
}
const Kn = Object.fromEntries(
  Object.entries(Un).map(([e, t]) => [e, Wn(t)])
), jt = {
  3: { box: "w-3 h-3 text-xs", pixel: 1.5 },
  4: { box: "w-4 h-4 text-sm", pixel: 2 },
  5: { box: "w-5 h-5 text-base", pixel: 2 },
  6: { box: "w-6 h-6 text-lg", pixel: 3 },
  8: { box: "w-8 h-8 text-2xl", pixel: 4 }
}, ee = ({
  name: e,
  size: t = "4",
  className: r
}) => {
  const n = Kn[e], { box: a, pixel: s } = jt[t] ?? jt[4];
  return /* @__PURE__ */ o(
    "span",
    {
      className: I(
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
};
function qn(e) {
  return typeof e == "string" && Object.prototype.hasOwnProperty.call(Hn, e);
}
function he(e, t = {}) {
  return qn(e) ? /* @__PURE__ */ o(ee, { name: e, ...t }) : e;
}
const Xe = re(
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
    onClick: b,
    "aria-label": h,
    "aria-labelledby": p,
    ...m
  }, f) => {
    const x = de(t, "Button", "md"), k = `
      inline-flex items-center justify-center
      font-mono text-sm
      transition-colors [transition-duration:var(--duration-fast)]
      cursor-pointer
      disabled:cursor-not-allowed disabled:opacity-50
      focus:outline-none
      focus-visible:![box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--btn-ring)]
    `, g = () => e === "icon" ? !0 : !a || typeof a == "string" || typeof a == "number" ? !1 : typeof a == "object" && a !== null && "type" in a ? typeof a.type < "u" : Array.isArray(a) ? a.every(
      (F) => typeof F == "object" && F !== null && "type" in F
    ) : !1;
    G(() => {
      if (process.env.NODE_ENV === "production" || !(e === "icon" || g())) return;
      h != null && String(h).trim() !== "" || p != null && String(p).trim() !== "" || console.warn(
        "[@scorp-ds/components] Button: icon-only buttons should include aria-label or aria-labelledby for screen readers."
      );
    }, [e, x, a, s, i, h, p]), G(() => {
      process.env.NODE_ENV === "production" || x !== "icon" || console.warn(
        '[@scorp-ds/components] Button: size="icon" is deprecated. Icon-only buttons are squared automatically; use size="md".'
      );
    }, [x]);
    const z = () => {
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
    }, $ = {
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
    }, w = {
      sm: "w-4 h-4",
      // 16px
      md: "w-5 h-5",
      // 20px
      lg: "w-6 h-6",
      // 24px
      icon: "w-5 h-5"
      // 20px
    }, N = {
      sm: "gap-1.5",
      // 6px - tighter for visual balance in compact buttons
      md: "gap-2",
      // 8px - standard spacing
      lg: "gap-2.5",
      // 10px - more breathing room for larger buttons
      icon: "gap-0"
      // No gap for icon-only
    }, T = (F) => {
      if (!F) return null;
      const _ = he(F);
      return typeof _ == "object" && _ !== null && "type" in _ ? /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center shrink-0 ${w[x]}`, children: _ }) : _;
    }, v = () => {
      if (g() && a) {
        const _ = x === "icon" ? "md" : x;
        return typeof a == "object" && a !== null && "type" in a ? /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center shrink-0 ${w[_]}`, children: a }) : /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center shrink-0 ${w[_]}`, children: a });
      }
      return a;
    }, R = {
      "--btn-ring": e === "primary" || e === "link" ? "var(--focus-ring-primary)" : e === "destructive" ? "var(--focus-ring-destructive)" : e === "icon" ? "var(--focus-ring-icon)" : "var(--focus-ring-secondary)",
      outline: "none"
    }, E = u && !r, W = (F) => {
      if (E) {
        F.preventDefault();
        return;
      }
      b == null || b(F);
    }, J = x === "icon" ? "md" : x, oe = E ? "relative cursor-progress" : "", K = /* @__PURE__ */ y(we, { children: [
      s && T(s),
      v(),
      i && T(i)
    ] }), te = E ? /* @__PURE__ */ y(we, { children: [
      /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center opacity-0 ${N[x]}`, children: K }),
      /* @__PURE__ */ o("span", { "aria-hidden": "true", className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ o(br, { size: J }) })
    ] }) : K;
    return l ? /* @__PURE__ */ o(
      "a",
      {
        ref: f,
        href: r ? void 0 : l,
        target: c,
        rel: d,
        "aria-disabled": r || E || void 0,
        "aria-busy": E || void 0,
        className: `${k} ${z()} ${$[e]} ${N[x]} ${oe} no-underline ${r ? "pointer-events-none opacity-50" : ""} ${n}`,
        style: R,
        "aria-label": h,
        "aria-labelledby": p,
        onClick: W,
        ...m,
        children: te
      }
    ) : /* @__PURE__ */ o(
      "button",
      {
        ref: f,
        disabled: r,
        className: `${k} ${z()} ${$[e]} ${N[x]} ${oe} ${n}`,
        style: R,
        "aria-label": h,
        "aria-labelledby": p,
        "aria-disabled": E || void 0,
        "aria-busy": E || void 0,
        onClick: W,
        ...m,
        children: te
      }
    );
  }
);
Xe.displayName = "Button";
const Ft = (e) => e != null && e !== !1 && e !== "";
function je({ error: e, helperText: t, errorMessage: r, describedBy: n }) {
  const a = ue(), s = Ft(r), i = !s && Ft(t), l = s || i ? `${a}-message` : void 0;
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
function Fe({
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
        t === "error" && /* @__PURE__ */ o("span", { className: "flex h-[1lh] shrink-0 items-center", children: /* @__PURE__ */ o(ee, { name: "AlertCircle", size: "3" }) }),
        /* @__PURE__ */ o("span", { children: r })
      ]
    }
  );
}
const Xn = re(
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
  }, b) => {
    const h = de(e, "Input"), p = je({ error: r, helperText: n, errorMessage: a, describedBy: d }), m = p.invalid, f = ue(), x = c ?? (l != null && l !== "" ? f : void 0), k = `
      w-full
      font-mono text-sm
      transition-colors [transition-duration:var(--duration-fast)]
      placeholder:text-[var(--field-placeholder)]
      disabled:cursor-not-allowed
      focus:outline-none
    `, g = {
      sm: "h-control-sm px-3 py-1.5 plate-round",
      md: "h-control-md px-4 py-2.5 plate-round",
      lg: "h-control-lg px-5 py-3.5 plate-round"
    }, z = m ? "bg-[var(--field-background-error)] text-[var(--text-primary)]" : "bg-[var(--field-background)] text-[var(--text-primary)]", $ = m ? "bg-[var(--field-border-error)] focus-within:!bg-[var(--field-border-focus)]" : "bg-[var(--field-border)] hover:bg-[var(--field-border-hover)] focus-within:!bg-[var(--field-border-focus)]", w = m ? "border-b border-[var(--field-border-error)] focus:!border-[var(--field-border-focus)]" : "border-b border-[var(--field-border)] hover:border-[var(--field-border-hover)] focus:!border-[var(--field-border-focus)]", N = t === "quiet" ? /* @__PURE__ */ o(
      "input",
      {
        ref: b,
        id: x,
        disabled: s,
        "aria-invalid": m || void 0,
        "aria-describedby": p.describedBy,
        className: `${k} ${g[h].replace("plate-round", "rounded-none")} !px-0 bg-transparent text-[var(--text-primary)] disabled:opacity-50 ${w} ${i}`,
        ...u
      }
    ) : (
      // DISABLED: the opacity lives on the ring wrapper so the border dims
      // with the fill; applying it to the input alone left a full-strength ring.
      /* @__PURE__ */ o(
        "div",
        {
          className: `w-full plate-round p-px transition-colors [transition-duration:var(--duration-fast)] ${$} ${s ? "opacity-50" : ""}`,
          children: /* @__PURE__ */ o(
            "input",
            {
              ref: b,
              id: x,
              disabled: s,
              "aria-invalid": m || void 0,
              "aria-describedby": p.describedBy,
              className: `${k} ${g[h]} ${z} ${i}`,
              ...u
            }
          )
        }
      )
    ), T = l != null && l !== "";
    return !T && !p.hasMessage ? N : /* @__PURE__ */ y("div", { className: "w-full space-y-1", children: [
      T && /* @__PURE__ */ o(
        "label",
        {
          htmlFor: x,
          className: "block font-mono text-sm text-secondary-800 dark:text-secondary-200",
          children: l
        }
      ),
      N,
      /* @__PURE__ */ o(Fe, { ...p.message })
    ] });
  }
);
Xn.displayName = "Input";
const Yn = [
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
function Zn(e) {
  return Array.from(e.querySelectorAll(Yn)).filter(
    (t) => !t.hasAttribute("hidden") && t.closest("[hidden]") == null && t.getAttribute("aria-hidden") !== "true"
  );
}
function hr(e, t) {
  G(() => {
    if (!t) return;
    const r = (n) => {
      if (n.key !== "Tab" || n.defaultPrevented) return;
      const a = e.current;
      if (!a) return;
      const s = Zn(a), i = document.activeElement;
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
function Ve({
  value: e,
  defaultValue: t,
  onChange: r
}) {
  const [n, a] = V(t), s = e !== void 0, i = s ? e : n, l = Q(r);
  l.current = r;
  const c = Q(i);
  c.current = i;
  const d = pe(
    (u) => {
      var b;
      Object.is(u, c.current) || (s || a(u), (b = l.current) == null || b.call(l, u));
    },
    [s]
  );
  return [i, d];
}
const Vt = /* @__PURE__ */ new Set();
function se(e, t, r) {
  if (process.env.NODE_ENV === "production") return;
  const n = `${e}:${t}`;
  Vt.has(n) || (Vt.add(n), console.warn(`[@scorp-ds/components] ${e}: ${t} is deprecated. Use ${r}.`));
}
const Qn = 960;
function Jn() {
  let e = Qn;
  if (typeof document < "u") {
    const t = getComputedStyle(document.documentElement).getPropertyValue("--breakpoint-docked"), r = Number.parseFloat(t);
    Number.isFinite(r) && r > 0 && (e = r);
  }
  return `(min-width: ${e}px)`;
}
const eo = { sm: "360px", md: "640px", lg: "740px", full: "100vw" };
function ls({
  open: e,
  defaultOpen: t = !1,
  onOpenChange: r,
  isOpen: n,
  onClose: a,
  title: s,
  children: i,
  footerContent: l,
  size: c,
  width: d,
  docked: u = !1
}) {
  n !== void 0 && se("Modal", "isOpen", "open"), a !== void 0 && se("Modal", "onClose", "onOpenChange"), d !== void 0 && se("Modal", "width", "size");
  const [b, h] = Ve({
    value: e ?? n,
    defaultValue: t,
    onChange: r
  }), p = pe(() => {
    b && (h(!1), a == null || a());
  }, [b, h, a]), m = c !== void 0 || d === void 0 ? eo[c ?? "lg"] : typeof d == "number" ? `${d}px` : d, f = Q(null), x = Q(null), [k, g] = V(b);
  G(() => {
    b && g(!0);
  }, [b]);
  const z = k && !b, $ = Pe(Jn, []), [w, N] = V(
    () => typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia($).matches
  );
  G(() => {
    if (typeof window.matchMedia != "function") return;
    const E = window.matchMedia($), W = () => N(E.matches);
    return E.addEventListener("change", W), () => E.removeEventListener("change", W);
  }, [$]);
  const T = u && w, v = b && k;
  if (G(() => {
    var E;
    if (v)
      return x.current = document.activeElement, (E = f.current) == null || E.focus(), () => {
        var W;
        (W = x.current) == null || W.focus(), x.current = null;
      };
  }, [v]), hr(f, v && !T), G(() => {
    const E = (W) => {
      W.key === "Escape" && p();
    };
    return b && document.addEventListener("keydown", E), () => {
      document.removeEventListener("keydown", E);
    };
  }, [b, p]), G(() => (b && !T ? document.body.style.overflow = "hidden" : document.body.style.overflow = "unset", () => {
    document.body.style.overflow = "unset";
  }), [b, T]), !k) return null;
  const R = (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions -- stops backdrop clicks inside the panel; Escape and the close button are the keyboard path
    /* @__PURE__ */ o(
      "div",
      {
        ref: f,
        tabIndex: -1,
        className: "max-w-full max-h-[80vh] plate-round-lg p-px bg-[var(--surface-container-stroke)] flex focus:outline-none",
        style: { width: m },
        role: "dialog",
        "aria-modal": T ? void 0 : "true",
        "aria-label": s,
        onClick: (E) => E.stopPropagation(),
        children: /* @__PURE__ */ y("div", { className: "w-full plate-round-lg bg-[var(--surface-card)] flex flex-col overflow-hidden", children: [
          /* @__PURE__ */ y("div", { className: "flex items-center justify-between px-6 py-5 border-b-[length:var(--border-width-hairline)] border-solid border-[var(--surface-container-stroke)]", children: [
            /* @__PURE__ */ o("h2", { className: "text-base font-mono text-[var(--text-primary)] font-medium flex-1 min-w-0 truncate", children: s }),
            /* @__PURE__ */ o(
              "span",
              {
                className: "relative ml-4 inline-flex shrink-0 before:content-[''] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-touch before:h-touch",
                onClick: (E) => {
                  E.target === E.currentTarget && p();
                },
                children: /* @__PURE__ */ o(
                  Xe,
                  {
                    variant: "secondary",
                    size: "sm",
                    type: "button",
                    onClick: p,
                    "aria-label": "Close modal",
                    children: /* @__PURE__ */ o(ee, { name: "X" })
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ o("div", { className: "overflow-y-auto px-6 py-5", tabIndex: 0, children: i }),
          l && /* @__PURE__ */ o("div", { className: "flex items-center justify-end gap-3 px-6 py-5 border-t-[length:var(--border-width-hairline)] border-solid border-[var(--surface-container-stroke)]", children: l })
        ] })
      }
    )
  );
  return T ? /* @__PURE__ */ o(
    "div",
    {
      className: `fixed inset-x-0 mx-auto w-fit max-w-full ${z ? "animate-out fade-out fill-mode-forwards" : "animate-in fade-in"}`,
      style: {
        zIndex: "var(--z-index-modal)",
        bottom: "var(--spacing-12)",
        animationDuration: "var(--duration-normal)",
        filter: "var(--elevation-docked-filter)"
      },
      onAnimationEnd: () => {
        z && g(!1);
      },
      children: R
    }
  ) : /* @__PURE__ */ o(we, { children: /* @__PURE__ */ o(
    "div",
    {
      className: `fixed inset-0 flex items-center justify-center p-5 bg-[var(--surface-overlay)] ${z ? "animate-out fade-out fill-mode-forwards" : "animate-in fade-in"}`,
      style: { zIndex: "var(--z-index-modal)", animationDuration: "var(--duration-normal)" },
      onClick: p,
      onAnimationEnd: () => {
        z && g(!1);
      },
      children: R
    }
  ) });
}
const to = /(?:^|\s)flex(?:\s|$)/;
function cs({
  title: e,
  subtitle: t,
  headerContent: r,
  children: n,
  footerContent: a,
  layout: s,
  className: i = ""
}) {
  const l = !s && to.test(i);
  l && se("Card", "inferring layout from a `flex` class in className", 'layout="flex"');
  const c = s ? s === "flex" : l;
  return /* @__PURE__ */ o(
    "div",
    {
      className: `
        plate-round-lg p-px bg-[var(--surface-container-stroke)]
        ${c ? "flex flex-col" : ""}
        ${i}
      `,
      children: /* @__PURE__ */ y(
        "div",
        {
          className: `
        plate-round-lg bg-[var(--surface-card)] h-full w-full
        ${c ? "flex flex-col flex-1 min-h-0" : ""}
      `,
          children: [
            (e || t || r) && /* @__PURE__ */ o("div", { className: "p-4 lg:p-6 border-b-[length:var(--border-width-hairline)] border-solid border-[var(--surface-container-stroke)] overflow-hidden rounded-none", children: r || /* @__PURE__ */ y("div", { children: [
              e && /* @__PURE__ */ o("h3", { className: "text-base font-mono font-bold text-[var(--text-primary)] mb-1", children: e }),
              t && /* @__PURE__ */ o("p", { className: "font-mono text-sm text-secondary-800 dark:text-secondary-300", children: t })
            ] }) }),
            /* @__PURE__ */ o("div", { className: `p-4 lg:p-6 ${c ? "flex-1 flex flex-col min-h-0" : ""}`, children: n }),
            a && /* @__PURE__ */ o("div", { className: "p-4 lg:p-6 border-t-[length:var(--border-width-hairline)] border-solid border-[var(--surface-container-stroke)] overflow-hidden", children: a })
          ]
        }
      )
    }
  );
}
function ds({
  tone: e,
  variant: t,
  size: r = "md",
  caps: n = !1,
  dashed: a = !1,
  children: s,
  iconLeft: i,
  onDismiss: l,
  onClose: c,
  dismissLabel: d,
  onCloseLabel: u,
  className: b = ""
}) {
  const h = de(r, "Badge");
  t !== void 0 && se("Badge", "variant", "tone"), c !== void 0 && se("Badge", "onClose", "onDismiss"), u !== void 0 && se("Badge", "onCloseLabel", "dismissLabel");
  const p = e ?? (t === "default" ? "neutral" : t) ?? "neutral", m = l ?? c, f = d ?? u ?? (typeof s == "string" ? `Remove ${s}` : "Remove badge"), x = {
    sm: "h-5 px-2 py-1 text-xs",
    // h-5 = 20px, px-2 = 8px, text-xs = 12px
    md: "h-6 px-2.5 py-1 text-xs",
    // h-6 = 24px, px-2.5 = 10px, text-xs = 12px
    lg: "h-7 px-3 py-1.5 text-sm"
    // h-7 = 28px, px-3 = 12px, text-sm = 14px
  }, k = {
    neutral: `
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
  }, g = {
    neutral: "border-current text-secondary-800 dark:text-secondary-200",
    primary: "border-current text-primary-800 dark:text-primary-300",
    success: "border-current text-success-800 dark:text-success-300",
    warning: "border-current text-warning-800 dark:text-warning-300",
    error: "border-current text-error-800 dark:text-error-300",
    info: "border-current text-info-800 dark:text-info-300",
    bone: "border-secondary-500 text-secondary-800 dark:text-secondary-200"
  }, z = {
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
        ${a ? `rounded-none border border-dashed bg-transparent ${g[p]}` : `plate-round ${k[p]}`}
        ${x[h]}
        ${n ? "uppercase [letter-spacing:.08em]" : ""}
        ${b}
      `,
      children: [
        i && /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center ${z[h]} flex-shrink-0`, children: he(i) }),
        /* @__PURE__ */ o("span", { className: "inline-flex items-center", children: s }),
        m && /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            onClick: ($) => {
              $.stopPropagation(), m();
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
            "aria-label": f,
            children: /* @__PURE__ */ o(ee, { name: "X", size: "3" })
          }
        )
      ]
    }
  );
}
function us({
  tone: e,
  variant: t,
  title: r,
  description: n,
  iconLeft: a,
  onDismiss: s,
  onClose: i,
  dismissLabel: l = "Close alert",
  className: c = ""
}) {
  t !== void 0 && se("Alert", "variant", "tone"), i !== void 0 && se("Alert", "onClose", "onDismiss");
  const d = e ?? (t === "default" ? "neutral" : t) ?? "neutral", u = s ?? i, b = {
    neutral: "Bell",
    success: "CheckCircle",
    warning: "AlertTriangle",
    error: "AlertCircle",
    info: "Info"
  }, h = he(a, { size: "4" }) || /* @__PURE__ */ o(ee, { name: b[d], size: "4" }), m = {
    // Neutral: neutral semantic surfaces (surface + border roles)
    neutral: {
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
  }[d], f = d === "error" ? "focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-error)]" : "focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]";
  return /* @__PURE__ */ o("div", { role: "alert", className: `plate-round p-px ${m.ring} ${c}`, children: /* @__PURE__ */ y(
    "div",
    {
      className: `
        plate-round
        flex items-start gap-3
        p-4
        ${m.fill}
      `,
      children: [
        h && /* @__PURE__ */ o("div", { className: `flex h-5 flex-shrink-0 items-center ${m.icon}`, children: h }),
        /* @__PURE__ */ y("div", { className: "flex-1 min-w-0", children: [
          r && /* @__PURE__ */ o("h4", { className: `font-mono text-sm font-bold mb-1 ${m.title}`, children: r }),
          n && /* @__PURE__ */ o("div", { className: `font-mono text-sm ${m.description}`, children: n })
        ] }),
        u && /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            onClick: u,
            className: `
            relative flex-shrink-0
            font-mono text-xs font-bold
            ${m.description}
            hover:text-error-800 dark:hover:text-error-300
            transition-colors [transition-duration:var(--duration-fast)]
            before:content-[''] before:absolute before:left-1/2 before:top-1/2
            before:-translate-x-1/2 before:-translate-y-1/2
            before:w-touch before:h-touch
            focus:outline-none ${f}
          `,
            "aria-label": l,
            children: /* @__PURE__ */ o(ee, { name: "X", size: "3" })
          }
        )
      ]
    }
  ) });
}
function ro({
  src: e,
  alt: t,
  initials: r,
  icon: n,
  size: a = "md",
  status: s,
  className: i = "",
  onError: l
}) {
  const c = de(a, "Avatar", "md"), [d, u] = V(!1), h = {
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
  }[c], p = () => {
    u(!0), l && l();
  }, m = e && !d, f = !m && r, x = !m && !f && n, k = !m && !f && !x, z = m || t === void 0 ? {} : t === "" ? { "aria-hidden": !0 } : { role: "img", "aria-label": t }, $ = {
    online: "bg-success-600 dark:bg-success-500",
    offline: "bg-secondary-500 dark:bg-secondary-600",
    away: "bg-warning-600 dark:bg-warning-500"
  };
  return /* @__PURE__ */ y("div", { className: `relative inline-block ${h.container} ${i}`, children: [
    /* @__PURE__ */ y(
      "div",
      {
        ...z,
        className: `
          ${h.container}
          plate-round
          overflow-hidden
          flex items-center justify-center
          bg-secondary-200 dark:bg-secondary-800
          text-secondary-900 dark:text-secondary-50
          font-mono font-bold
          ${h.text}
        `,
        children: [
          m && /* @__PURE__ */ o(
            "img",
            {
              src: e,
              alt: t ?? "Avatar",
              className: "w-full h-full object-cover",
              onError: p
            }
          ),
          f && /* @__PURE__ */ o("span", { className: "select-none", children: r }),
          x && /* @__PURE__ */ o("div", { className: `${h.icon} inline-flex items-center justify-center leading-none text-secondary-700 dark:text-secondary-300`, children: he(n) }),
          k && /* @__PURE__ */ o("span", { className: `${h.icon} inline-flex items-center justify-center font-mono font-bold text-secondary-900 dark:text-secondary-100`, "aria-hidden": "true", children: "@" })
        ]
      }
    ),
    s && /* @__PURE__ */ o(
      "span",
      {
        role: "img",
        className: `
            absolute block
            ${h.statusOffset}
            ${h.status}
            ${$[s]}
            rounded-none
            border-2 border-[var(--field-background)]
          `,
        "aria-label": `Status: ${s}`
      }
    )
  ] });
}
const no = {
  horizontal: { none: "", sm: "my-1", md: "my-4", lg: "my-8" },
  vertical: { none: "", sm: "mx-1", md: "mx-4", lg: "mx-8" }
};
function ms({
  orientation: e,
  label: t,
  variant: r,
  text: n,
  spacing: a = "md",
  className: s = ""
}) {
  r !== void 0 && se("Divider", "variant", "orientation, and label for the labelled form"), n !== void 0 && se("Divider", "text", "label");
  const i = e ?? (r === "vertical" ? "vertical" : "horizontal"), l = t ?? (r === "withText" ? n : void 0), c = de(a, "Divider", "md"), d = no[i][c];
  return i === "vertical" ? /* @__PURE__ */ o(
    "div",
    {
      className: `h-full border-l border-solid border-term-dim ${d} ${s}`,
      role: "separator",
      "aria-orientation": "vertical"
    }
  ) : l != null && l !== !1 && l !== "" ? /* @__PURE__ */ y(
    "div",
    {
      className: `flex items-center w-full ${d} ${s}`,
      role: "separator",
      "aria-label": typeof l == "string" ? l : void 0,
      children: [
        /* @__PURE__ */ o("span", { className: "flex-1 overflow-hidden whitespace-nowrap font-mono text-term-dim leading-none select-none", "aria-hidden": "true", children: "─".repeat(80) }),
        /* @__PURE__ */ o("span", { className: "px-2 font-mono text-xs text-term-dim whitespace-nowrap", children: l }),
        /* @__PURE__ */ o("span", { className: "flex-1 overflow-hidden whitespace-nowrap font-mono text-term-dim leading-none select-none", "aria-hidden": "true", children: "─".repeat(80) })
      ]
    }
  ) : /* @__PURE__ */ o(
    "div",
    {
      className: `w-full border-t border-solid border-term-dim ${d} ${s}`,
      role: "separator",
      "aria-orientation": "horizontal"
    }
  );
}
const oo = { top: "bottom", bottom: "top", left: "right", right: "left" }, ao = 8, Oe = 8;
function so(e, t, r, n, a) {
  const s = {
    top: t.top,
    bottom: a - t.bottom,
    left: t.left,
    right: n - t.right
  }, i = (c) => (c === "top" || c === "bottom" ? r.height : r.width) + ao + Oe;
  if (s[e] >= i(e)) return e;
  const l = oo[e];
  return s[l] >= i(l) ? l : e;
}
function gr(e, t, r, n) {
  return e === "start" ? t : e === "end" ? t + r - n : t + r / 2 - n / 2;
}
function io(e, t, r, n) {
  const a = gr(n, e.left, e.width, t), s = a + t;
  return a < Oe ? Oe - a : s > r - Oe ? Math.max(Oe - a, r - Oe - s) : 0;
}
function lo({
  content: e,
  children: t,
  side: r,
  align: n = "center",
  position: a,
  delay: s = 200,
  maxWidth: i = "200px",
  className: l = ""
}) {
  a !== void 0 && se("Tooltip", "position", "side");
  const c = r ?? a ?? "top", [d, u] = V(!1), [b, h] = V(!1), p = Q(null), m = Q(null), f = Q(null), x = Q(null), k = ue(), [g, z] = V(c), [$, w] = V(0), [N, T] = V(0), v = () => {
    p.current && clearTimeout(p.current), m.current && clearTimeout(m.current);
  }, R = () => {
    v(), p.current = setTimeout(() => {
      u(!0), m.current = setTimeout(() => h(!0), 50);
    }, s);
  }, E = pe(() => {
    v(), u(!1), h(!1);
  }, []), W = (O) => {
    var C;
    (C = x.current) != null && C.contains(O.relatedTarget) || E();
  };
  G(() => {
    if (!d) return;
    const O = (C) => {
      C.key === "Escape" && E();
    };
    return document.addEventListener("keydown", O), () => document.removeEventListener("keydown", O);
  }, [d, E]), G(() => v, []), Me(() => {
    var P, ie;
    if (!d) return;
    const O = (P = x.current) == null ? void 0 : P.getBoundingClientRect(), C = (ie = f.current) == null ? void 0 : ie.getBoundingClientRect();
    if (!O || !C) return;
    const B = window.innerWidth || document.documentElement.clientWidth, X = window.innerHeight || document.documentElement.clientHeight, U = so(c, O, C, B, X), Y = U === "top" || U === "bottom", ce = Y ? io(O, C.width, B, n) : 0, ae = Y ? C.width : C.height, Z = Y ? O.left : O.top, fe = Y ? O.width : O.height, ge = gr(n, Z, fe, ae) + ce, xe = n === "center" ? -ce : Z + fe / 2 - (ge + ae / 2), j = Math.max(0, ae / 2 - 12);
    z(U), w(ce), T(Math.min(j, Math.max(-j, xe)));
  }, [d, c, n, e, i]);
  const J = qe(t) ? yt(t, {
    "aria-describedby": [
      t.props["aria-describedby"],
      d ? k : void 0
    ].filter(Boolean).join(" ") || void 0
  }) : t, oe = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2",
    right: "left-full ml-2"
  }, K = {
    horizontal: { start: "left-0", center: "left-1/2 -translate-x-1/2", end: "right-0" },
    vertical: { start: "top-0", center: "top-1/2 -translate-y-1/2", end: "bottom-0" }
  }, te = g === "top" || g === "bottom", F = `${oe[g]} ${K[te ? "horizontal" : "vertical"][n]}`, _ = "var(--plate-caret-outer)", D = "var(--plate-caret-inner)", q = {
    top: "top-full left-1/2 -translate-x-1/2 -translate-y-px",
    bottom: "bottom-full left-1/2 -translate-x-1/2 translate-y-px rotate-180",
    left: "left-full top-1/2 -translate-y-1/2 translate-x-[calc(var(--plate-caret-offset)*-1)] -rotate-90",
    right: "right-full top-1/2 -translate-y-1/2 translate-x-[var(--plate-caret-offset)] rotate-90"
  }, S = {
    top: "top-full inset-x-0 h-2",
    bottom: "bottom-full inset-x-0 h-2",
    left: "left-full inset-y-0 w-2",
    right: "right-full inset-y-0 w-2"
  };
  return /* @__PURE__ */ y(
    "div",
    {
      ref: x,
      className: `relative inline-block w-fit ${l}`,
      onMouseEnter: R,
      onMouseLeave: E,
      onFocus: R,
      onBlur: W,
      children: [
        J,
        d && /* @__PURE__ */ y(
          "div",
          {
            ref: f,
            id: k,
            role: "tooltip",
            className: `
            absolute
            ${F}
            w-max
            z-[var(--z-index-tooltip)]
            ${b ? "opacity-100" : "opacity-0"}
            transition-opacity [transition-duration:var(--duration-fast)]
          `,
            "data-placement": g,
            "data-align": n,
            style: { maxWidth: i, marginLeft: $ || void 0 },
            children: [
              /* @__PURE__ */ o("span", { className: `absolute ${S[g]}`, "aria-hidden": "true" }),
              /* @__PURE__ */ o("div", { className: "plate-round p-px bg-[var(--surface-container-stroke)]", children: /* @__PURE__ */ o("div", { className: "plate-round bg-[var(--surface-card)] min-w-16 px-3 py-2 text-center font-mono text-xs text-[var(--text-primary)] whitespace-normal", children: e }) }),
              /* @__PURE__ */ o(
                "div",
                {
                  className: `absolute ${q[g]}`,
                  style: te ? { marginLeft: N || void 0 } : { marginTop: N || void 0 },
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ y("div", { className: "relative h-[var(--plate-caret-height)] w-[var(--plate-caret-width)]", children: [
                    /* @__PURE__ */ o(
                      "div",
                      {
                        className: "absolute inset-0 bg-[var(--surface-container-stroke)]",
                        style: { clipPath: _ }
                      }
                    ),
                    /* @__PURE__ */ o(
                      "div",
                      {
                        className: "absolute left-[var(--plate-caret-inner-inset-x)] top-[var(--plate-caret-inner-inset-y)] h-[var(--plate-caret-inner-height)] w-[var(--plate-caret-inner-width)] bg-[var(--surface-card)]",
                        style: { clipPath: D }
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
function pt(e) {
  return e == null || typeof e == "boolean" ? "" : Array.isArray(e) ? e.map(pt).join("") : typeof e == "string" || typeof e == "number" ? String(e) : qe(e) ? pt(e.props.children) : String(e);
}
function bt(e, t, r, n = []) {
  return Zt.forEach(e, (a) => {
    if (!qe(a)) return;
    const s = a, i = s.props;
    if (s.type === wt) {
      bt(i.children, t, r, n);
      return;
    }
    if (s.type === "optgroup") {
      bt(i.children, i.label ?? t, i.disabled || r, n);
      return;
    }
    const l = pt(i.children);
    n.push({
      // Native fallback: an option with no `value` submits its text
      value: i.value != null ? String(i.value) : l,
      label: l,
      disabled: i.disabled || r || void 0,
      group: t
    });
  }), n;
}
function it(e, t, r) {
  var s;
  const n = e.length;
  if (n === 0) return -1;
  let a = t;
  for (let i = 0; i < n; i++)
    if (a += r, a >= n && (a = 0), a < 0 && (a = n - 1), !((s = e[a]) != null && s.disabled)) return a;
  return -1;
}
const co = re(function({
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
  name: b,
  label: h,
  "aria-label": p,
  "aria-describedby": m,
  id: f,
  ...x
}, k) {
  var xe;
  const g = de(t, "Select"), z = je({ error: r, helperText: n, errorMessage: a, describedBy: m }), $ = z.invalid, w = ue(), N = f ?? `${w}-trigger`, T = `${w}-listbox`, v = `${w}-label`, R = (j) => `${w}-option-${j}`, E = bt(l), W = [];
  E.forEach((j, P) => {
    const ie = W[W.length - 1];
    ie && ie.label === j.group ? ie.entries.push({ option: j, index: P }) : W.push({ label: j.group, entries: [{ option: j, index: P }] });
  });
  const [J, oe] = V(!1), [K, te] = V(-1), [F, _] = V(
    c !== void 0 ? String(c) : d !== void 0 ? String(d) : ((xe = E[0]) == null ? void 0 : xe.value) || ""
  ), D = Q(null), q = Q(null), S = Q(null);
  G(() => {
    c !== void 0 && (_(String(c)), S.current && (S.current.value = String(c)));
  }, [c]), Gr(k, () => S.current);
  const O = E.find((j) => j.value === F), C = (O == null ? void 0 : O.label) || "", B = () => {
    s || (oe(!J), J || te(-1));
  }, X = () => {
    oe(!1), te(-1);
  }, U = (j) => {
    c === void 0 && _(j), S.current && (S.current.value = j), u && u({
      target: { value: j, name: b },
      currentTarget: { value: j, name: b }
    }), X();
  };
  G(() => {
    function j(P) {
      D.current && !D.current.contains(P.target) && X();
    }
    if (J)
      return document.addEventListener("mousedown", j), () => {
        document.removeEventListener("mousedown", j);
      };
  }, [J]), G(() => {
    function j(P) {
      var ke, ve;
      if (!((ke = D.current) != null && ke.contains(P.target)) && !J)
        return;
      if (!J) {
        if ((P.key === "Enter" || P.key === " " || P.key === "ArrowDown" || P.key === "ArrowUp") && (ve = D.current) != null && ve.contains(P.target)) {
          P.preventDefault(), B();
          const me = E.findIndex((be) => be.value === F && !be.disabled);
          te(me >= 0 ? me : it(E, -1, 1));
        }
        return;
      }
      const ie = K;
      switch (P.key) {
        case "Escape":
          P.preventDefault(), X();
          break;
        case "Tab":
          X();
          break;
        case "ArrowDown":
          P.preventDefault(), te((me) => it(E, me, 1));
          break;
        case "ArrowUp":
          P.preventDefault(), te((me) => it(E, me, -1));
          break;
        case "Enter":
        case " ":
          P.preventDefault(), ie >= 0 && ie < E.length && !E[ie].disabled && U(E[ie].value);
          break;
      }
    }
    return document.addEventListener("keydown", j), () => {
      document.removeEventListener("keydown", j);
    };
  }, [J, K, E, F]), G(() => {
    if (K >= 0 && q.current) {
      const P = q.current.querySelectorAll('[role="option"]')[K];
      P && P.scrollIntoView({ block: "nearest" });
    }
  }, [K]);
  const ce = {
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
  }[g], ae = $ ? "bg-[var(--field-background-error)] text-[var(--text-primary)]" : "bg-[var(--field-background)] text-[var(--text-primary)]", Z = $ ? "bg-[var(--field-border-error)] focus-within:!bg-[var(--field-border-focus)]" : "bg-[var(--field-border)] hover:bg-[var(--field-border-hover)] focus-within:!bg-[var(--field-border-focus)]", fe = h != null && h !== "", ge = /* @__PURE__ */ y("div", { ref: D, className: "relative inline-block w-full", children: [
    /* @__PURE__ */ o(
      "select",
      {
        ref: S,
        name: b,
        value: F,
        onChange: u,
        className: "sr-only",
        "aria-hidden": "true",
        tabIndex: -1,
        ...x,
        children: E.map((j, P) => /* @__PURE__ */ o("option", { value: j.value, disabled: j.disabled, children: j.label }, P))
      }
    ),
    /* @__PURE__ */ o("div", { className: `plate-round p-px transition-colors [transition-duration:var(--duration-fast)] ${Z} ${s ? "opacity-50" : ""}`, children: /* @__PURE__ */ y(
      "button",
      {
        type: "button",
        role: "combobox",
        id: N,
        onClick: B,
        disabled: s,
        className: `
          w-full
          flex items-center justify-between
          font-mono text-sm
          transition-colors [transition-duration:var(--duration-fast)]
          ${ce.trigger}
          ${ae}
          ${s ? "cursor-not-allowed" : "cursor-pointer"}
          focus:outline-none
        `,
        "aria-haspopup": "listbox",
        "aria-expanded": J,
        "aria-controls": J ? T : void 0,
        "aria-activedescendant": J && K >= 0 ? R(K) : void 0,
        "aria-invalid": $ || void 0,
        "aria-describedby": z.describedBy,
        "aria-label": fe ? void 0 : p ?? "Select an option",
        children: [
          /* @__PURE__ */ o("span", { className: "truncate text-left flex-1", children: C || "Select..." }),
          /* @__PURE__ */ o(
            "span",
            {
              className: `
            ${ce.icon}
            inline-flex items-center justify-center font-mono leading-none
            text-[var(--text-secondary)]
            transition-transform [transition-duration:var(--duration-normal)]
            flex-shrink-0 ml-2
            ${J ? "rotate-180" : ""}
            ${s ? "opacity-50" : ""}
          `,
              "aria-hidden": "true",
              children: /* @__PURE__ */ o(ee, { name: "ChevronDown" })
            }
          )
        ]
      }
    ) }),
    J && /* @__PURE__ */ o(
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
            ref: q,
            id: T,
            role: "listbox",
            "aria-labelledby": fe ? v : void 0,
            "aria-label": fe ? void 0 : p ?? "Select an option",
            className: `plate-round bg-[var(--surface-card)] ${ce.menu} max-h-80 overflow-y-auto`,
            children: W.map((j, P) => {
              const ie = `${w}-group-${P}`, ke = j.entries.map(({ option: ve, index: me }) => {
                const be = ve.disabled, Re = ve.value === F, ot = K === me && !be;
                return /* @__PURE__ */ y(
                  "button",
                  {
                    id: R(me),
                    type: "button",
                    role: "option",
                    "aria-selected": Re,
                    disabled: be,
                    onClick: () => !be && U(ve.value),
                    className: `
                  w-full flex items-center gap-2
                  px-4 py-3
                  font-mono text-sm text-left
                  transition-colors [transition-duration:var(--duration-fast)]
                  ${be ? "opacity-50 cursor-not-allowed" : "text-[var(--text-primary)] hover:bg-[var(--surface-muted)] cursor-pointer"}
                  ${ot ? "bg-[var(--surface-muted)] text-[var(--accent)]" : ""}
                  ${ce.menuItem}
                `,
                    children: [
                      /* @__PURE__ */ o("span", { className: "truncate flex-1 min-w-0", children: ve.label }),
                      Re && /* @__PURE__ */ o("span", { className: `${ce.icon} inline-flex items-center justify-center font-mono font-bold text-[var(--border-focus)] flex-shrink-0`, "aria-hidden": "true", children: /* @__PURE__ */ o(ee, { name: "Check" }) })
                    ]
                  },
                  me
                );
              });
              return j.label == null ? /* @__PURE__ */ o(wt, { children: ke }, P) : /* @__PURE__ */ y("div", { role: "group", "aria-labelledby": ie, children: [
                /* @__PURE__ */ o(
                  "div",
                  {
                    id: ie,
                    className: "px-4 py-2 font-mono text-xs uppercase tracking-wide text-[var(--text-secondary)]",
                    children: j.label
                  }
                ),
                ke
              ] }, P);
            })
          }
        )
      }
    )
  ] });
  return !fe && !z.hasMessage ? /* @__PURE__ */ o("div", { className: `w-full ${i}`.trim(), children: ge }) : /* @__PURE__ */ y("div", { className: `w-full space-y-1 ${i}`.trim(), children: [
    fe && /* @__PURE__ */ o(
      "label",
      {
        id: v,
        htmlFor: N,
        className: "block font-mono text-sm text-secondary-800 dark:text-secondary-200",
        children: h
      }
    ),
    ge,
    /* @__PURE__ */ o(Fe, { ...z.message })
  ] });
});
co.displayName = "Select";
const uo = re(
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
    "aria-describedby": b,
    ...h
  }, p) => {
    const m = de(e, "Checkbox"), f = Q(null), x = pe(
      (E) => {
        f.current = E, typeof p == "function" ? p(E) : p && (p.current = E);
      },
      [p]
    );
    Me(() => {
      f.current && (f.current.indeterminate = d);
    });
    const k = je({ error: r, helperText: n, errorMessage: a, describedBy: b }), g = k.invalid, $ = {
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
    }[m], w = g ? "bg-[var(--field-border-error)]" : `bg-[var(--field-border)] hover:bg-[var(--field-border-hover)]
         peer-checked:bg-[var(--button-primary-background)]
         peer-checked:hover:bg-[var(--button-primary-background-hover)]
         peer-indeterminate:bg-[var(--button-primary-background)]
         peer-indeterminate:hover:bg-[var(--button-primary-background-hover)]`, N = g ? "peer-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-error)]" : "peer-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]", T = (E) => {
      l && l(E), c && c(E.target.checked), E.target.indeterminate = d;
    }, v = t != null && t !== !1 && t !== "", R = /* @__PURE__ */ y("span", { className: "relative inline-flex shrink-0 before:content-[''] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-touch before:h-touch", children: [
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
          "aria-describedby": k.describedBy,
          ...h
        }
      ),
      /* @__PURE__ */ o(
        "span",
        {
          "aria-hidden": "true",
          className: `
            plate-round p-px inline-flex shrink-0
            ${$.checkbox}
            transition-colors [transition-duration:var(--duration-fast)]
            ${s ? "cursor-not-allowed" : "cursor-pointer"}
            ${w}
            ${g ? "peer-checked:[&>span]:bg-[var(--field-border-error)] peer-indeterminate:[&>span]:bg-[var(--field-border-error)]" : "peer-checked:[&>span]:bg-[var(--button-primary-background)] peer-indeterminate:[&>span]:bg-[var(--button-primary-background)]"}
            peer-checked:[&_[data-mark=check]]:opacity-100
            peer-indeterminate:[&_[data-mark=check]]:opacity-0
            peer-indeterminate:[&_[data-mark=bar]]:opacity-100
            ${N}
          `,
          children: /* @__PURE__ */ o(
            "span",
            {
              className: `
              plate-round relative inline-flex h-full w-full items-center justify-center
              bg-[var(--field-background)]
              transition-colors [transition-duration:var(--duration-fast)]
            `,
              children: ["check", "bar"].map((E) => /* @__PURE__ */ o(
                "span",
                {
                  "data-mark": E,
                  className: `absolute inset-0 inline-flex items-center justify-center opacity-0 transition-opacity [transition-duration:var(--duration-fast)] ${g ? "text-[var(--button-destructive-text)]" : "text-[var(--button-primary-text)]"}`,
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ o(ee, { name: E === "check" ? "Check" : "Minus", size: $.glyph })
                },
                E
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
            R,
            v && /* @__PURE__ */ o("span", { className: `${$.label} text-[var(--text-primary)]`, children: t })
          ]
        }
      ),
      /* @__PURE__ */ o(Fe, { ...k.message, className: $.messageIndent })
    ] });
  }
);
uo.displayName = "Checkbox";
function mo(e, t, r) {
  return !Number.isFinite(e) || r <= t ? 0 : Math.min(100, Math.max(0, (e - t) / (r - t) * 100));
}
const fo = re(function({ label: t, id: r, className: n = "", disabled: a, min: s = 0, max: i = 100, value: l, defaultValue: c, onChange: d, ...u }, b) {
  const h = ue(), p = r ?? h, m = Number(s), f = Number(i), x = l !== void 0, [k, g] = V(
    () => c !== void 0 ? Number(c) : m
  ), z = x ? Number(l) : k, $ = mo(z, m, f), w = (N) => {
    x || g(Number(N.target.value)), d == null || d(N);
  };
  return /* @__PURE__ */ y("span", { className: `flex w-full flex-col gap-1.5 font-mono ${n}`, children: [
    t && /* @__PURE__ */ o("label", { htmlFor: p, className: "text-sm text-secondary-800 dark:text-secondary-300", children: t }),
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
              style: { width: `${$}%` }
            }
          )
        }
      ),
      /* @__PURE__ */ o(
        "input",
        {
          ref: b,
          id: p,
          type: "range",
          min: s,
          max: i,
          disabled: a,
          ...x ? { value: l } : { defaultValue: c },
          onChange: w,
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
fo.displayName = "Slider";
const po = re(
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
    ...b
  }, h) => {
    const p = de(e, "Radio"), m = je({ error: r, helperText: n, errorMessage: a, describedBy: u }), f = m.invalid, k = {
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
    }[p], g = f ? "bg-[var(--field-border-error)]" : `bg-[var(--field-border)] hover:bg-[var(--field-border-hover)]
         peer-checked:bg-[var(--button-primary-background)]
         peer-checked:hover:bg-[var(--button-primary-background-hover)]`, z = f ? "peer-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-error)]" : "peer-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]", $ = (T) => {
      const v = T.currentTarget.checked;
      l && l(T), c && c(v);
    }, w = t != null && t !== !1 && t !== "", N = /* @__PURE__ */ y("span", { className: "relative inline-flex shrink-0 before:content-[''] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-touch before:h-touch", children: [
      /* @__PURE__ */ o(
        "input",
        {
          ref: h,
          type: "radio",
          ...i !== void 0 ? { checked: i } : {},
          disabled: s,
          onChange: $,
          className: "peer sr-only",
          "aria-describedby": m.describedBy,
          ...b
        }
      ),
      /* @__PURE__ */ o(
        "span",
        {
          "aria-hidden": "true",
          className: `
            plate-round p-px inline-flex shrink-0
            ${k.radio}
            transition-colors [transition-duration:var(--duration-fast)]
            ${s ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
            ${g}
            ${f ? "peer-checked:[&>span]:bg-[var(--field-border-error)]" : "peer-checked:[&>span]:bg-[var(--button-primary-background)]"}
            peer-checked:[&>span>span]:opacity-100
            ${z}
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
                ${k.dot}
                opacity-0
                transition-opacity [transition-duration:var(--duration-fast)]
                ${f ? "bg-[var(--button-destructive-text)]" : "bg-[var(--button-primary-text)]"}
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
            N,
            w && /* @__PURE__ */ o("span", { className: `${k.label} text-[var(--text-primary)]`, children: t })
          ]
        }
      ),
      /* @__PURE__ */ o(Fe, { ...m.message, className: k.messageIndent })
    ] });
  }
);
po.displayName = "Radio";
const bo = re(
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
    const b = de(e, "Textarea"), h = je({ error: t, helperText: r, errorMessage: n, describedBy: c }), p = h.invalid, m = ue(), f = l ?? (i != null && i !== "" ? m : void 0), x = `
      block w-full
      font-mono text-sm
      transition-colors [transition-duration:var(--duration-fast)]
      placeholder:text-[var(--field-placeholder)]
      disabled:cursor-not-allowed
      focus:outline-none
      resize-y
    `, k = {
      sm: "min-h-control-sm px-3 py-1.5 plate-round",
      md: "min-h-control-md px-4 py-2.5 plate-round",
      lg: "min-h-control-lg px-5 py-3.5 plate-round"
    }, g = p ? "bg-[var(--field-background-error)] text-[var(--text-primary)]" : "bg-[var(--field-background)] text-[var(--text-primary)]", $ = /* @__PURE__ */ o(
      "div",
      {
        className: `w-full plate-round p-px transition-colors [transition-duration:var(--duration-fast)] ${p ? "bg-[var(--field-border-error)] focus-within:!bg-[var(--field-border-focus)]" : "bg-[var(--field-border)] hover:bg-[var(--field-border-hover)] focus-within:!bg-[var(--field-border-focus)]"} ${a ? "opacity-50" : ""}`,
        children: /* @__PURE__ */ o(
          "textarea",
          {
            ref: u,
            id: f,
            disabled: a,
            "aria-invalid": p || void 0,
            "aria-describedby": h.describedBy,
            className: `${x} ${k[b]} ${g} ${s}`,
            ...d
          }
        )
      }
    ), w = i != null && i !== "";
    return !w && !h.hasMessage ? $ : /* @__PURE__ */ y("div", { className: "w-full space-y-1", children: [
      w && /* @__PURE__ */ o(
        "label",
        {
          htmlFor: f,
          className: "block font-mono text-sm text-secondary-800 dark:text-secondary-200",
          children: i
        }
      ),
      $,
      /* @__PURE__ */ o(Fe, { ...h.message })
    ] });
  }
);
bo.displayName = "Textarea";
const ho = {
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
}, xr = re(
  ({
    checked: e,
    defaultChecked: t = !1,
    onCheckedChange: r,
    size: n = "md",
    label: a,
    "aria-label": s,
    hideLabel: i = !1,
    disabled: l = !1,
    icon: c,
    className: d = "",
    ...u
  }, b) => {
    const h = de(n, "Switch"), p = ho[h], [m, f] = Ve({
      value: e,
      defaultValue: t,
      onChange: r
    }), x = () => {
      l || f(!m);
    }, k = (g) => {
      (g.key === " " || g.key === "Enter") && (g.preventDefault(), x());
    };
    return /* @__PURE__ */ y("div", { className: `flex items-center gap-3 ${d}`, children: [
      /* @__PURE__ */ o(
        "button",
        {
          ref: b,
          type: "button",
          role: "switch",
          "aria-checked": m,
          "aria-label": s ?? (a || void 0),
          disabled: l,
          onClick: x,
          onKeyDown: k,
          className: `
            group relative inline-flex shrink-0
            before:content-[''] before:absolute before:inset-x-0 before:top-1/2 before:-translate-y-1/2 before:h-touch
            focus:outline-none
            ${l ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `,
          ...u,
          children: /* @__PURE__ */ o(
            "span",
            {
              "aria-hidden": "true",
              "data-state": m ? "on" : "off",
              className: `
              relative inline-flex items-center
              ${p.track}
              plate-round
              transition-colors [transition-duration:var(--duration-normal)] motion-reduce:transition-none
              group-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]
              ${m ? "bg-[var(--accent)]" : "bg-[var(--control-track)]"}
            `,
              children: /* @__PURE__ */ o(
                "span",
                {
                  className: `
              inline-flex items-center justify-center
              ${p.knob}
              plate-round
              bg-[var(--field-background)]
              shadow-none
              transform transition-transform [transition-duration:var(--duration-normal)] motion-reduce:transition-none
            `,
                  style: {
                    transform: `translateX(${m ? p.knobOn : p.knobOff})`
                  },
                  children: c && /* @__PURE__ */ o("span", { className: p.iconSize, children: he(c) })
                }
              )
            }
          )
        }
      ),
      a && !i && // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions -- the visible label forwards pointer clicks to the switch button, which is the keyboard path
      /* @__PURE__ */ o(
        "span",
        {
          onClick: x,
          className: `select-none text-sm font-mono ${l ? "cursor-not-allowed text-secondary-700 dark:text-secondary-400" : "cursor-pointer text-[var(--text-primary)]"}`,
          children: a
        }
      )
    ] });
  }
);
xr.displayName = "Switch";
const Gt = { left: "start", right: "end" };
function Ht(e, t, r) {
  var s;
  const n = e.length;
  if (n === 0) return -1;
  let a = t;
  for (let i = 0; i < n; i++)
    if (a += r, a >= n && (a = 0), a < 0 && (a = n - 1), !((s = e[a]) != null && s.disabled)) return a;
  return -1;
}
function fs({
  trigger: e,
  items: t,
  align: r = "start",
  label: n = "Actions",
  size: a = "md"
}) {
  const s = de(a, "Dropdown");
  let i;
  r === "left" || r === "right" ? (se("Dropdown", `align="${r}"`, `align="${Gt[r]}"`), i = Gt[r]) : i = r;
  const [l, c] = V(!1), [d, u] = V(-1), b = Q(null), h = Q(null), p = () => {
    c(!l), l || u(-1);
  }, m = () => {
    c(!1), u(-1);
  }, f = (w) => {
    w.disabled || (w.onClick(), m());
  };
  G(() => {
    function w(N) {
      b.current && !b.current.contains(N.target) && m();
    }
    if (l)
      return document.addEventListener("mousedown", w), () => {
        document.removeEventListener("mousedown", w);
      };
  }, [l]), G(() => {
    function w(N) {
      if (!l) return;
      const T = d;
      switch (N.key) {
        case "Escape":
          N.preventDefault(), m();
          break;
        case "Tab":
          m();
          break;
        case "ArrowDown":
          N.preventDefault(), u((v) => Ht(t, v, 1));
          break;
        case "ArrowUp":
          N.preventDefault(), u((v) => Ht(t, v, -1));
          break;
        case "Enter":
        case " ":
          N.preventDefault(), T >= 0 && T < t.length && f(t[T]);
          break;
      }
    }
    if (l)
      return document.addEventListener("keydown", w), () => {
        document.removeEventListener("keydown", w);
      };
  }, [l, d, t]), G(() => {
    if (d >= 0 && h.current) {
      const N = h.current.querySelectorAll('[role="menuitem"]')[d];
      N && N.scrollIntoView({ block: "nearest" });
    }
  }, [d]);
  const k = {
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
  }[s], g = /* @__PURE__ */ y(
    "button",
    {
      type: "button",
      onClick: p,
      className: `
        inline-flex items-center justify-center gap-2
        font-mono text-sm
        ${k.button}
        transition-colors [transition-duration:var(--duration-normal)]
        cursor-pointer
        bg-[var(--button-secondary-background)] hover:bg-[var(--button-secondary-background-hover)] active:brightness-95
        text-[var(--button-secondary-text)] hover:text-[var(--button-secondary-text-hover)]
        focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-secondary)]
      `,
      "aria-haspopup": "true",
      "aria-expanded": l,
      children: [
        n,
        /* @__PURE__ */ o("span", { className: `${k.icon} inline-flex items-center justify-center font-mono leading-none transition-transform [transition-duration:var(--duration-normal)] ${l ? "rotate-180" : ""}`, "aria-hidden": "true", children: /* @__PURE__ */ o(ee, { name: "ChevronDown" }) })
      ]
    }
  ), z = {
    "aria-haspopup": "true",
    "aria-expanded": l
  };
  let $;
  if (!e)
    $ = g;
  else if (qe(e)) {
    const w = e;
    $ = yt(w, {
      ...z,
      onClick: (N) => {
        var T, v;
        (v = (T = w.props).onClick) == null || v.call(T, N), p();
      }
    });
  } else
    $ = /* @__PURE__ */ o(
      "div",
      {
        ...z,
        onClick: p,
        role: "button",
        tabIndex: 0,
        onKeyDown: (w) => {
          (w.key === "Enter" || w.key === " ") && (w.preventDefault(), p());
        },
        children: e
      }
    );
  return /* @__PURE__ */ y("div", { ref: b, className: "relative inline-block", children: [
    $,
    l && /* @__PURE__ */ o(
      "div",
      {
        style: { animationDuration: "var(--duration-normal)" },
        className: `
            absolute top-full mt-2
            ${i === "end" ? "end-0" : "start-0"}
            min-w-52
            plate-round p-px bg-[var(--border-default)]
            z-[var(--z-index-dropdown)]
            animate-in fade-in slide-in-from-top-2
          `,
        children: /* @__PURE__ */ o(
          "div",
          {
            ref: h,
            role: "menu",
            "aria-orientation": "vertical",
            className: `plate-round bg-[var(--surface-card)] ${k.menu}`,
            children: t.map((w, N) => {
              const T = w.variant === "destructive", v = w.disabled;
              return /* @__PURE__ */ y(
                "button",
                {
                  type: "button",
                  role: "menuitem",
                  disabled: v,
                  onClick: () => f(w),
                  className: `
                  w-full flex items-center gap-2
                  px-4 py-3
                  font-mono text-sm text-left
                  transition-colors [transition-duration:var(--duration-fast)]
                  ${v ? "opacity-50 cursor-not-allowed" : T ? "text-[var(--text-error)] hover:bg-[var(--field-background-error)]" : "text-[var(--text-primary)] hover:bg-[var(--surface-muted)]"}
                  ${d === N && !v ? T ? "bg-[var(--field-background-error)]" : "bg-[var(--surface-muted)] text-[var(--accent)]" : ""}
                  ${k.menuItem}
                `,
                  children: [
                    /* @__PURE__ */ y("div", { className: "flex items-center gap-2 flex-1 min-w-0", children: [
                      w.icon && /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center ${k.icon} flex-shrink-0`, children: he(w.icon) }),
                      /* @__PURE__ */ o("span", { className: "truncate", children: w.label })
                    ] }),
                    w.iconRight && /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center ${k.icon} flex-shrink-0 ml-auto`, children: he(w.iconRight) })
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
const Ye = "text-secondary-700 dark:text-secondary-600", Ae = "text-secondary-800 dark:text-secondary-500", Se = "text-[var(--text-primary)]", Ke = "text-[var(--accent)]", De = "border-[var(--surface-container-stroke)]", go = {
  background: "repeating-linear-gradient(45deg, var(--surface-subtle), var(--surface-subtle) 8px, var(--surface-muted) 8px, var(--surface-muted) 16px)"
}, We = (e) => e === "wide" ? " [--csp-bw:max(100%,min(calc(100%+240px),calc(100cqw-48px)))] w-[var(--csp-bw)] ml-[calc((100%-var(--csp-bw))/2)]" : e === "full" ? " [--csp-bw:max(100%,calc(100cqw-48px))] w-[var(--csp-bw)] ml-[calc((100%-var(--csp-bw))/2)]" : "", xo = 0.62, vo = (e) => `min(var(--font-size-xs), calc((100cqw - var(--spacing-10)) / ${(Math.max(...e.split(`
`).map((r) => r.length)) * xo).toFixed(2)}))`, St = (e) => String(e).padStart(2, "0"), yo = (e) => e.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""), vr = (e) => e.type === "imagePair" ? 2 : e.type === "image" || e.type === "ascii" || e.type === "slot" ? 1 : 0;
function wo(e, t = 1) {
  const r = /* @__PURE__ */ new Map();
  let n = t;
  for (const a of e) {
    const s = vr(a);
    s && (r.set(a, n), n += s);
  }
  return r;
}
function $t({ fig: e, caption: t }) {
  return !e && !t ? null : /* @__PURE__ */ y("figcaption", { className: "mt-3 flex gap-3 text-xs leading-relaxed", children: [
    e !== void 0 && /* @__PURE__ */ y("span", { className: `flex-none ${Ke}`, children: [
      "fig. ",
      St(e)
    ] }),
    t && /* @__PURE__ */ o("span", { className: Ye, children: t })
  ] });
}
function lt({
  fig: e,
  caption: t,
  width: r,
  children: n
}) {
  return /* @__PURE__ */ y("figure", { className: `my-10 m-0${We(r)}`, children: [
    /* @__PURE__ */ o("div", { className: "plate-round p-px bg-[var(--border-hairline)]", children: n }),
    /* @__PURE__ */ o($t, { fig: e, caption: t })
  ] });
}
function et({ src: e, alt: t, aspect: r }) {
  const n = r ?? "16 / 9";
  return e ? /* @__PURE__ */ o(
    "img",
    {
      src: e,
      alt: t ?? "",
      className: "plate-round block w-full",
      style: { aspectRatio: n, objectFit: "cover" }
    }
  ) : /* @__PURE__ */ o("div", { className: "plate-round w-full", style: { aspectRatio: n, ...go } });
}
function yr({ items: e }) {
  const t = e.length >= 4 ? "sm:grid-cols-4" : e.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";
  return /* @__PURE__ */ o("dl", { className: `m-0 grid grid-cols-2 gap-x-8 gap-y-6 ${t}`, children: e.map((r) => (
    // dt stays first for screen readers; the figure is moved above it
    // visually, so every figure hangs from the top of its cell however
    // its label wraps. Figure and label centre in their cell.
    /* @__PURE__ */ y("div", { className: "flex flex-col items-center text-center", children: [
      /* @__PURE__ */ o("dt", { className: `mt-2 text-xs ${Ye}`, children: r.label }),
      /* @__PURE__ */ o("dd", { className: `order-first m-0 text-2xl leading-none ${Ke}`, children: r.value })
    ] }, r.label)
  )) });
}
function ko({
  b: e,
  fig: t,
  slots: r
}) {
  switch (e.type) {
    case "prose":
      return /* @__PURE__ */ o("p", { className: `my-6 text-base leading-relaxed ${Ae}`, children: e.text });
    case "image":
      return /* @__PURE__ */ o(lt, { fig: t, caption: e.caption, width: e.width, children: /* @__PURE__ */ o(et, { src: e.src, alt: e.alt, aspect: e.aspect }) });
    case "imagePair":
      return /* @__PURE__ */ o("div", { className: `my-10 grid grid-cols-1 gap-4 sm:grid-cols-2${We(e.width)}`, children: [0, 1].map((n) => {
        var a, s, i;
        return /* @__PURE__ */ y("figure", { className: "m-0", children: [
          /* @__PURE__ */ o("div", { className: "plate-round p-px bg-[var(--border-hairline)]", children: /* @__PURE__ */ o(et, { src: (a = e.srcs) == null ? void 0 : a[n], alt: (s = e.alts) == null ? void 0 : s[n], aspect: "4 / 3" }) }),
          /* @__PURE__ */ o($t, { fig: t === void 0 ? void 0 : t + n, caption: (i = e.captions) == null ? void 0 : i[n] })
        ] }, n);
      }) });
    case "ascii": {
      const n = vo(e.text);
      return /* @__PURE__ */ o(lt, { fig: t, caption: e.caption, width: e.width, children: /* @__PURE__ */ o("div", { className: "[container-type:inline-size]", children: /* @__PURE__ */ o(
        "pre",
        {
          role: "img",
          "aria-label": e.label ?? e.caption ?? "diagram",
          className: `plate-round m-0 overflow-x-auto p-5 leading-snug ${Ae}`,
          style: { fontSize: n },
          children: e.text
        }
      ) }) });
    }
    case "slot": {
      const n = r == null ? void 0 : r[e.name];
      return /* @__PURE__ */ o(lt, { fig: t, caption: e.caption, width: e.width, children: n ? /* @__PURE__ */ o("div", { className: "plate-round overflow-hidden", children: n }) : /* @__PURE__ */ o(et, { aspect: e.aspect }) });
    }
    case "list":
      return /* @__PURE__ */ o("ul", { className: "my-10 list-none p-0", children: e.items.map((n, a) => {
        const s = a === 0, i = a === e.items.length - 1;
        return /* @__PURE__ */ y("li", { className: `relative pl-8 ${i ? "" : "pb-6"}`, children: [
          !(s && i) && /* @__PURE__ */ o("span", { "aria-hidden": "true", className: `absolute left-1 border-l-hairline ${De} ${`${s ? "top-3" : "top-0"} ${i ? "h-3" : "bottom-0"}`}` }),
          /* @__PURE__ */ o("span", { "aria-hidden": "true", className: `absolute left-1 top-3 w-4 border-t-hairline ${De}` }),
          /* @__PURE__ */ o("div", { className: `text-sm leading-6 ${Se}`, children: n.title }),
          /* @__PURE__ */ o("p", { className: `m-0 mt-1 text-sm leading-6 ${Ae}`, children: n.text })
        ] }, n.title);
      }) });
    case "insights":
      return /* @__PURE__ */ o("ol", { className: `my-10 list-none border-b-hairline p-0 ${De}`, children: e.items.map((n, a) => /* @__PURE__ */ y(
        "li",
        {
          className: `grid grid-cols-[theme(spacing.16)_1fr] border-t-hairline py-6 ${De}`,
          children: [
            /* @__PURE__ */ o("span", { className: `text-2xl leading-none ${Ke}`, children: St(a + 1) }),
            /* @__PURE__ */ y("div", { children: [
              /* @__PURE__ */ o("div", { className: `text-lg leading-snug ${Se}`, children: n.title }),
              /* @__PURE__ */ o("p", { className: `m-0 mt-2 text-sm leading-relaxed ${Ae}`, children: n.text })
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
          className: `my-10 grid grid-cols-1 gap-4 ${n ? `sm:grid-cols-3${We("wide")}` : "sm:grid-cols-2"}`,
          children: e.items.map((a) => /* @__PURE__ */ y("div", { className: "plate-round bg-[var(--surface-muted)] p-5", children: [
            /* @__PURE__ */ o("div", { className: `text-base leading-snug ${Se}`, children: a.title }),
            /* @__PURE__ */ o("p", { className: `m-0 mt-2 text-sm leading-relaxed ${Ae}`, children: a.text })
          ] }, a.title))
        }
      );
    }
    case "quote":
      return /* @__PURE__ */ y("figure", { className: "my-10 m-0 border-l-hairline border-[var(--accent)] pl-6", children: [
        /* @__PURE__ */ o("blockquote", { className: `m-0 p-0 text-lg leading-relaxed ${Se}`, children: e.text }),
        e.name && /* @__PURE__ */ y("figcaption", { className: "mt-4 flex items-center gap-3 text-sm", children: [
          /* @__PURE__ */ o(ro, { size: "md", src: e.image, alt: "" }),
          /* @__PURE__ */ y("span", { children: [
            /* @__PURE__ */ o("span", { className: `block ${Se}`, children: e.name }),
            e.role && /* @__PURE__ */ o("span", { className: `block text-xs ${Ye}`, children: e.role })
          ] })
        ] })
      ] });
    case "statement":
      return /* @__PURE__ */ y("div", { className: `my-12 border-y-hairline py-10 ${De}${We("wide")}`, children: [
        e.kicker && /* @__PURE__ */ o("div", { className: `mb-4 text-xs uppercase tracking-wider ${Ke}`, children: e.kicker }),
        /* @__PURE__ */ o("p", { className: `m-0 text-2xl leading-snug ${Se}`, children: e.text })
      ] });
    case "outcomes":
      return /* @__PURE__ */ o("div", { className: "my-10", children: /* @__PURE__ */ o(yr, { items: e.items }) });
  }
}
function No({
  blocks: e,
  slots: t,
  figureStart: r = 1,
  className: n = ""
}) {
  const a = wo(e, r);
  return /* @__PURE__ */ o("div", { className: `font-mono ${n}`, children: e.map((s, i) => /* @__PURE__ */ o(ko, { b: s, fig: a.get(s), slots: t }, i)) });
}
function So({
  study: e,
  className: t = ""
}) {
  const { title: r, summary: n, outcomes: a, meta: s, cover: i } = e;
  return /* @__PURE__ */ y("header", { className: `font-mono ${t}`, children: [
    /* @__PURE__ */ o("h1", { className: `m-0 text-2xl leading-tight sm:text-page-title ${Se}`, children: r }),
    /* @__PURE__ */ o("p", { className: `m-0 mt-5 text-base leading-relaxed sm:text-lg ${Ae}`, children: n }),
    a && a.length > 0 && /* @__PURE__ */ o("div", { className: "mt-10", children: /* @__PURE__ */ o(yr, { items: a }) }),
    s && s.length > 0 && // One fact a line: label and value joined by a dotted leader, like a
    // contents page. A long value wraps and stays flush right.
    /* @__PURE__ */ o("dl", { className: "m-0 mt-10 flex flex-col gap-2", children: s.map((l) => /* @__PURE__ */ y("div", { className: "flex items-baseline gap-3 text-sm", children: [
      /* @__PURE__ */ o("dt", { className: `flex-none text-xs uppercase tracking-wider ${Ye}`, children: l.label }),
      /* @__PURE__ */ o(
        "span",
        {
          "aria-hidden": "true",
          className: `min-w-4 flex-1 border-b-hairline border-dotted ${De}`
        }
      ),
      /* @__PURE__ */ o("dd", { className: `m-0 text-right leading-relaxed ${Se}`, children: l.value })
    ] }, l.label)) }),
    i && /* @__PURE__ */ y("figure", { className: `mt-12 m-0${We(i.width ?? "wide")}`, children: [
      /* @__PURE__ */ o("div", { className: "plate-round p-px bg-[var(--border-hairline)]", children: /* @__PURE__ */ o(et, { src: i.src, alt: i.alt, aspect: i.aspect }) }),
      /* @__PURE__ */ o($t, { caption: i.caption })
    ] })
  ] });
}
function $o({ n: e, section: t }) {
  return /* @__PURE__ */ y("header", { children: [
    /* @__PURE__ */ y("div", { className: "flex gap-3 text-xs uppercase tracking-wider", children: [
      /* @__PURE__ */ o("span", { className: Ke, children: St(e) }),
      /* @__PURE__ */ o("span", { className: Ye, children: t.kicker })
    ] }),
    /* @__PURE__ */ o("h2", { className: `m-0 mt-4 text-xl leading-snug sm:text-2xl ${Se}`, children: t.title }),
    t.intro && /* @__PURE__ */ o("p", { className: `m-0 mt-4 text-base leading-relaxed ${Ae}`, children: t.intro })
  ] });
}
function zo({
  sections: e,
  slots: t,
  className: r = ""
}) {
  const n = e.filter((s) => !s.hidden);
  let a = 1;
  return /* @__PURE__ */ o("div", { className: `font-mono ${r}`, children: n.map((s, i) => {
    const l = a;
    return a += (s.blocks ?? []).reduce((c, d) => c + vr(d), 0), /* @__PURE__ */ y(
      "section",
      {
        id: s.id ?? yo(s.kicker),
        className: "mt-24 first:mt-0 sm:mt-32 sm:first:mt-0",
        children: [
          /* @__PURE__ */ o($o, { n: i + 1, section: s }),
          s.blocks && s.blocks.length > 0 && /* @__PURE__ */ o(No, { blocks: s.blocks, slots: t, figureStart: l })
        ]
      },
      s.id ?? s.kicker
    );
  }) });
}
function ps({
  study: e,
  slots: t,
  className: r = ""
}) {
  return /* @__PURE__ */ y("article", { className: `font-mono ${r}`, children: [
    /* @__PURE__ */ o(So, { study: e }),
    /* @__PURE__ */ o(zo, { sections: e.sections, slots: t, className: "mt-24 sm:mt-32" })
  ] });
}
const Io = re(function({ meta: t, title: r, description: n, titleSuffix: a, thumb: s, thumbPosition: i = "start", selected: l = !1, className: c = "", ...d }, u) {
  const b = "as" in d && d.as ? d.as : null, h = b ? "as" : "href" in d && d.href != null ? "a" : "onClick" in d && d.onClick != null ? "button" : "div", p = `
    block w-full text-left p-3 plate-round
    transition-colors [transition-duration:var(--duration-fast)]
    font-mono
    ${h !== "div" ? "cursor-pointer hover:bg-[var(--surface-muted)] focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]" : ""}
    ${l ? "bg-[var(--surface-muted)]" : ""}
    ${c}
  `, m = /* @__PURE__ */ y(we, { children: [
    t && /* @__PURE__ */ o("span", { className: "block text-sm text-secondary-700 dark:text-secondary-600", children: t }),
    /* @__PURE__ */ y(
      "span",
      {
        className: `block truncate text-base leading-6 ${h !== "div" ? "text-[var(--accent)]" : "text-[var(--text-primary)]"}`,
        children: [
          r,
          a && /* @__PURE__ */ o("span", { className: "ml-2 leading-none", children: a })
        ]
      }
    ),
    n && /* @__PURE__ */ o("span", { className: "mt-1 block text-sm leading-6 text-secondary-800 dark:text-secondary-500", children: n })
  ] }), f = s ? /* @__PURE__ */ y("span", { className: `flex items-start gap-4 ${i === "end" ? "flex-row-reverse" : ""}`, children: [
    /* @__PURE__ */ o("span", { className: "flex-shrink-0", children: s }),
    /* @__PURE__ */ o("span", { className: "block min-w-0 flex-1", children: m })
  ] }) : m;
  if (b) {
    const { asProps: k, ...g } = d, z = { ...g };
    return delete z.as, /* @__PURE__ */ o(b, { ref: u, className: p, ...z, ...k, children: f });
  }
  if (h === "a") {
    const { href: k, ...g } = d;
    return /* @__PURE__ */ o("a", { ref: u, href: k, className: p, ...g, children: f });
  }
  if (h === "button") {
    const { onClick: k, ...g } = d;
    return /* @__PURE__ */ o("button", { ref: u, type: "button", onClick: k, className: p, ...g, children: f });
  }
  return /* @__PURE__ */ o("div", { ref: u, className: p, ...d, children: f });
});
Io.displayName = "ListRow";
const ht = re(function({ variant: t = "inline", external: r = !1, className: n = "", children: a, ...s }, i) {
  const l = I(
    "font-mono text-[var(--accent)] transition-colors [transition-duration:var(--duration-fast)] hover:text-[var(--text-link-hover)]",
    "focus:outline-none focus-visible:[outline:var(--focus-ring-width)_solid_var(--focus-ring-primary)] focus-visible:[outline-offset:var(--focus-ring-offset)]",
    t === "inline" ? "underline underline-offset-2" : "no-underline hover:underline focus-visible:underline",
    n
  ), c = /* @__PURE__ */ y(we, { children: [
    a,
    r && /* @__PURE__ */ y(we, { children: [
      /* @__PURE__ */ o(ee, { name: "ExternalLink", size: "3", className: "ml-1" }),
      /* @__PURE__ */ o("span", { className: "sr-only", children: " (opens in new tab)" })
    ] })
  ] });
  if ("as" in s && s.as) {
    const { as: p, asProps: m } = s;
    return /* @__PURE__ */ o(p, { ref: i, className: l, ...r ? { target: "_blank", rel: "noopener noreferrer" } : void 0, ...m, children: c });
  }
  const { href: d, target: u, rel: b, ...h } = s;
  return /* @__PURE__ */ o(
    "a",
    {
      ref: i,
      href: d,
      className: l,
      target: r ? u ?? "_blank" : u,
      rel: r ? b ?? "noopener noreferrer" : b,
      ...h,
      children: c
    }
  );
});
ht.displayName = "Link";
function wr(e) {
  return e === "default" ? "neutral" : e;
}
const To = {
  neutral: "Bell",
  success: "CheckCircle",
  warning: "AlertTriangle",
  error: "AlertCircle",
  info: "Info"
}, Eo = {
  neutral: {
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
}, Ut = `
  relative shrink-0 inline-flex items-center px-1 font-mono text-sm font-bold cursor-pointer
  before:content-[''] before:absolute before:inset-x-0 before:top-1/2 before:-translate-y-1/2 before:h-touch
  focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]
`;
function Co({ children: e, onClick: t, tone: r, variant: n, action: a, duration: s, onDismiss: i }) {
  n !== void 0 && se("Toast", "variant", "tone");
  const l = r ?? wr(n) ?? "neutral", [c, d] = V(!1);
  G(() => {
    const $ = requestAnimationFrame(() => d(!0));
    return () => cancelAnimationFrame($);
  }, []);
  const [u, b] = V(!1), [h, p] = V(!1), m = u || h, f = Q(i);
  G(() => {
    f.current = i;
  });
  const x = Q(s ?? 0);
  G(() => {
    x.current = s ?? 0;
  }, [s]), G(() => {
    if (m || s == null || !Number.isFinite(s) || !f.current) return;
    const $ = Date.now(), w = setTimeout(() => {
      var N;
      return (N = f.current) == null ? void 0 : N.call(f);
    }, Math.max(0, x.current));
    return () => {
      clearTimeout(w), x.current -= Date.now() - $;
    };
  }, [m, s]);
  const k = ($) => {
    $.currentTarget.contains($.relatedTarget) || p(!1);
  }, g = Eo[l], z = s === 1 / 0 && i != null;
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events -- pointer shortcut to dismiss; the dismiss and action buttons are the keyboard path
    /* @__PURE__ */ o(
      "div",
      {
        role: l === "error" ? "alert" : "status",
        onClick: t,
        onMouseEnter: () => b(!0),
        onMouseLeave: () => b(!1),
        onFocus: () => p(!0),
        onBlur: k,
        className: `
        plate-round p-px ${g.ring}
        transition-transform [transition-duration:var(--duration-normal)] [transition-timing-function:steps(5)]
        ${c ? "translate-y-0" : "translate-y-16"}
        ${t ? "cursor-pointer" : ""}
      `,
        children: /* @__PURE__ */ y(
          "div",
          {
            className: `plate-round flex max-w-[min(28rem,calc(100vw-2rem))] items-center gap-2 px-3 py-2.5 font-mono text-sm ${g.fill} ${g.text}`,
            children: [
              /* @__PURE__ */ o("span", { className: `inline-flex shrink-0 ${g.icon}`, children: /* @__PURE__ */ o(ee, { name: To[l], size: "4" }) }),
              /* @__PURE__ */ o("span", { className: "min-w-0 whitespace-nowrap overflow-hidden text-ellipsis", children: e }),
              a && /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  className: `${Ut} underline underline-offset-2`,
                  onClick: ($) => {
                    $.stopPropagation(), a.onClick(), i == null || i();
                  },
                  children: a.label
                }
              ),
              z && /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  "aria-label": "Dismiss notification",
                  className: Ut,
                  onClick: ($) => {
                    $.stopPropagation(), i == null || i();
                  },
                  children: /* @__PURE__ */ o(ee, { name: "X", size: "3" })
                }
              )
            ]
          }
        )
      }
    )
  );
}
const _o = 5e3, zt = [];
let nt = zt, Ao = 0;
const gt = /* @__PURE__ */ new Set();
function kr(e) {
  nt = e, gt.forEach((t) => t());
}
function Nr(e) {
  return gt.add(e), () => {
    gt.delete(e);
  };
}
const Sr = () => nt, $r = () => zt;
function He(e, t = {}) {
  const { id: r = `toast-${++Ao}`, duration: n = _o, tone: a, variant: s, ...i } = t;
  s !== void 0 && se("toast()", "variant", "tone");
  const l = a ?? wr(s), c = { id: r, message: e, duration: n, ...i };
  return l !== void 0 && (c.tone = l), kr([...nt.filter((d) => d.id !== r), c]), r;
}
function It(e) {
  kr(e === void 0 ? zt : nt.filter((t) => t.id !== e));
}
const Mo = Object.assign(He, {
  success: (e, t) => He(e, { ...t, tone: "success" }),
  warning: (e, t) => He(e, { ...t, tone: "warning" }),
  error: (e, t) => He(e, { ...t, tone: "error" }),
  info: (e, t) => He(e, { ...t, tone: "info" }),
  dismiss: It
});
function bs() {
  return { toasts: Qt(Nr, Sr, $r), toast: Mo, dismiss: It };
}
function hs({ toasts: e, onDismiss: t }) {
  const r = Qt(Nr, Sr, $r), n = e !== void 0, a = n ? e : r, s = n ? t : It;
  return /* @__PURE__ */ o(
    "div",
    {
      "aria-live": "polite",
      className: "fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2",
      style: { zIndex: "var(--z-index-popover)" },
      children: a.map((i) => /* @__PURE__ */ o(
        Co,
        {
          tone: i.tone,
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
function gs({
  open: e,
  defaultOpen: t = !1,
  onOpenChange: r,
  isOpen: n,
  onClose: a,
  "aria-label": s,
  ariaLabel: i,
  closeLabel: l = "Close",
  children: c
}) {
  n !== void 0 && se("BottomSheet", "isOpen", "open"), a !== void 0 && se("BottomSheet", "onClose", "onOpenChange"), i !== void 0 && se("BottomSheet", "ariaLabel", "aria-label");
  const d = s ?? i, [u, b] = Ve({
    value: e ?? n,
    defaultValue: t,
    onChange: r
  }), h = pe(() => {
    u && (b(!1), a == null || a());
  }, [u, b, a]), [p, m] = V(u);
  G(() => {
    u && m(!0);
  }, [u]);
  const f = p && !u, x = Q(null), k = Q(null), g = u && p;
  return G(() => {
    var z;
    if (g)
      return k.current = document.activeElement, (z = x.current) == null || z.focus(), () => {
        var $;
        ($ = k.current) == null || $.focus(), k.current = null;
      };
  }, [g]), hr(x, g), G(() => {
    if (!u) return;
    const z = ($) => {
      $.key === "Escape" && h();
    };
    return document.addEventListener("keydown", z), () => document.removeEventListener("keydown", z);
  }, [u, h]), G(() => (u ? document.body.style.overflow = "hidden" : document.body.style.overflow = "unset", () => {
    document.body.style.overflow = "unset";
  }), [u]), p ? /* @__PURE__ */ y(we, { children: [
    /* @__PURE__ */ o(
      "div",
      {
        className: `fixed inset-0 bg-[var(--surface-overlay)] ${f ? "animate-out fade-out fill-mode-forwards" : "animate-in fade-in"}`,
        style: { zIndex: "var(--z-index-overlay)", animationDuration: "var(--duration-slow)" },
        onClick: h,
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ o(
      "div",
      {
        ref: x,
        tabIndex: -1,
        role: "dialog",
        "aria-modal": "true",
        "aria-label": d,
        className: `focus:outline-none fixed bottom-0 inset-x-0 mx-auto w-[min(540px,100%)] plate-round-lg-top bg-[var(--surface-container-stroke)] pt-px px-px ${f ? "animate-out slide-out-to-bottom fill-mode-forwards" : "animate-in slide-in-from-bottom"}`,
        style: { zIndex: "var(--z-index-modal)", animationDuration: "var(--duration-slow)" },
        onAnimationEnd: () => {
          f && m(!1);
        },
        children: /* @__PURE__ */ y("div", { className: "plate-round-lg-top bg-[var(--surface-card)] px-5 pb-6 pt-1 flex flex-col items-center gap-3 max-h-[70vh]", children: [
          /* @__PURE__ */ y("div", { className: "relative flex h-touch w-full shrink-0 items-center justify-center", children: [
            /* @__PURE__ */ o("div", { className: "w-9 h-1 bg-[var(--surface-container-stroke)]", "aria-hidden": "true" }),
            /* @__PURE__ */ o(
              "button",
              {
                type: "button",
                onClick: h,
                "aria-label": l,
                className: "absolute right-0 top-0 inline-flex h-touch w-touch items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors [transition-duration:var(--duration-fast)] focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]",
                children: /* @__PURE__ */ o(ee, { name: "X", size: "4" })
              }
            )
          ] }),
          /* @__PURE__ */ o("div", { className: "w-full overflow-y-auto", tabIndex: 0, children: c })
        ] })
      }
    )
  ] }) : null;
}
function xs() {
  const { resolvedTheme: e, setTheme: t } = Hr(), [r, n] = V(!1);
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
      xr,
      {
        checked: a,
        onCheckedChange: () => {
          t(i);
        },
        size: "sm",
        icon: a ? /* @__PURE__ */ o(ee, { name: "Moon", size: "3", className: "text-[var(--border-focus)]" }) : /* @__PURE__ */ o(ee, { name: "Sun", size: "3", className: "text-[var(--text-secondary)]" }),
        "aria-label": `Switch to ${i} theme`
      }
    ),
    /* @__PURE__ */ o("span", { className: "text-sm font-mono text-[var(--text-primary)]", children: s })
  ] });
}
const zr = Be(null);
function Tt(e) {
  const t = Te(zr);
  if (!t)
    throw new Error(`[@scorp-ds/components] ${e} must be used inside <Tabs>.`);
  return t;
}
function vs({
  value: e,
  defaultValue: t,
  onValueChange: r,
  children: n,
  className: a
}) {
  const s = e !== void 0, [i, l] = V(() => t ?? ""), c = s ? e : i, d = ue().replace(/:/g, ""), u = Q([]), b = pe(
    (p) => {
      s || l(p), r == null || r(p);
    },
    [s, r]
  ), h = Pe(
    () => ({
      value: c,
      onValueChange: b,
      baseId: d,
      listValuesRef: u,
      isControlled: s
    }),
    [c, b, d, s]
  );
  return /* @__PURE__ */ o(zr.Provider, { value: h, children: /* @__PURE__ */ o("div", { className: I("w-full", a), children: n }) });
}
function Lo(e) {
  const t = [];
  return Ie.Children.forEach(e, (r) => {
    if (!Ie.isValidElement(r)) return;
    if (r.type.displayName === "TabsTrigger") {
      const a = r.props.value;
      typeof a == "string" && t.push(a);
    }
  }), t;
}
function Ro({
  children: e,
  className: t,
  "aria-label": r,
  "aria-labelledby": n
}) {
  const { value: a, isControlled: s, onValueChange: i, listValuesRef: l } = Tt("TabsList"), c = Lo(e);
  l.current = c;
  const d = c.join("\0");
  return Me(() => {
    const u = l.current;
    s || u.length === 0 || u.includes(a) || i(u[0]);
  }, [s, l, i, a, d]), /* @__PURE__ */ o(
    "div",
    {
      role: "tablist",
      "aria-label": r,
      "aria-labelledby": n,
      className: I(
        "flex flex-wrap gap-0 border-b-[length:var(--border-width-hairline)] border-solid border-[var(--surface-container-stroke)]",
        t
      ),
      children: e
    }
  );
}
Ro.displayName = "TabsList";
const Oo = re(function({ value: t, children: r, className: n, disabled: a, onKeyDown: s, onClick: i, type: l = "button", ...c }, d) {
  const { value: u, onValueChange: b, baseId: h, listValuesRef: p } = Tt("TabsTrigger"), m = u === t, f = `${h}-tab-${t}`, x = `${h}-panel-${t}`, k = (T) => {
    b(T), requestAnimationFrame(() => {
      var v;
      (v = document.getElementById(`${h}-tab-${T}`)) == null || v.focus();
    });
  }, g = (T) => {
    const v = document.getElementById(`${h}-tab-${T}`);
    return v == null || !v.disabled;
  }, z = (T) => {
    const v = p.current, R = v.indexOf(t);
    if (R < 0) return null;
    for (let E = 1; E <= v.length; E += 1) {
      const W = v[((R + T * E) % v.length + v.length) % v.length];
      if (W !== t && g(W)) return W;
    }
    return null;
  }, $ = (T, v) => {
    const R = p.current;
    for (let E = T; E >= 0 && E < R.length; E += v)
      if (g(R[E])) return R[E];
    return null;
  }, w = (T) => {
    const v = z(T);
    v && k(v);
  }, N = (T) => {
    if (s == null || s(T), T.defaultPrevented || a) return;
    const v = p.current;
    switch (T.key) {
      case "ArrowRight":
      case "ArrowDown":
        T.preventDefault(), w(1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        T.preventDefault(), w(-1);
        break;
      case "Home": {
        T.preventDefault();
        const R = $(0, 1);
        R && k(R);
        break;
      }
      case "End": {
        T.preventDefault();
        const R = $(v.length - 1, -1);
        R && k(R);
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
      id: f,
      "aria-selected": m,
      "aria-controls": x,
      tabIndex: m ? 0 : -1,
      disabled: a,
      className: I(
        "-mb-px rounded-none border-b-2 px-4 py-2 font-mono text-sm transition-colors [transition-duration:var(--duration-normal)]",
        // TAP TARGET: the trigger box is ~37px tall and its underline sets the
        // strip's baseline, so growing it with padding would shift that line.
        // A 44px-tall pseudo-element centered on the trigger raises the target
        // without moving a pixel (the Toast inline-button recipe).
        "relative before:content-[''] before:absolute before:inset-x-0 before:top-1/2 before:-translate-y-1/2 before:h-touch",
        // FOCUS: inset box-shadow ring, the system recipe (outlines are
        // swallowed by the plate clip elsewhere, so every control uses inset).
        "focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]",
        m ? "border-[var(--button-primary-background)] bg-transparent text-[var(--text-primary)]" : "border-transparent text-secondary-700 hover:text-[var(--text-primary)] dark:text-secondary-300",
        a && "cursor-not-allowed opacity-50",
        n
      ),
      onClick: (T) => {
        i == null || i(T), !T.defaultPrevented && !a && b(t);
      },
      onKeyDown: N,
      ...c,
      children: r
    }
  );
});
Oo.displayName = "TabsTrigger";
function Do({ value: e, children: t, className: r, forceMount: n = !1 }) {
  const { value: a, baseId: s } = Tt("TabsContent"), i = a === e, l = `${s}-tab-${e}`, c = `${s}-panel-${e}`;
  return !n && !i ? null : !i && n ? /* @__PURE__ */ o(
    "div",
    {
      id: c,
      role: "tabpanel",
      "aria-labelledby": l,
      hidden: !0,
      className: I("p-4 font-mono outline-none", r),
      children: t
    }
  ) : /* @__PURE__ */ o(
    "div",
    {
      id: c,
      role: "tabpanel",
      "aria-labelledby": l,
      tabIndex: 0,
      className: I(
        "p-4 font-mono outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--focus-offset-color)]",
        r
      ),
      children: t
    }
  );
}
Do.displayName = "TabsContent";
const Po = { sm: "size-control-sm", md: "size-control-md", lg: "size-control-lg" }, Bo = { animationTimingFunction: "steps(4, jump-none)" };
function Ir({ variant: e = "text", lines: t = 1, size: r = "md", animated: n = !0, className: a }) {
  const s = de(r, "Skeleton"), i = n ? "animate-pulse motion-reduce:animate-none" : "", l = n ? Bo : void 0;
  if (e === "text") {
    const c = Math.max(1, Math.floor(t));
    return /* @__PURE__ */ o("div", { "aria-hidden": "true", "data-skeleton": "text", className: I("flex w-full flex-col gap-2", a), children: Array.from({ length: c }, (d, u) => /* @__PURE__ */ o(
      "span",
      {
        style: l,
        className: I(
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
      className: I(
        "block shrink-0 plate-round bg-[var(--surface-muted)]",
        e === "avatar" ? Po[s] : "h-24 w-full",
        i,
        a
      )
    }
  );
}
Ir.displayName = "Skeleton";
const jo = typeof window < "u" ? Me : G, Tr = {
  compact: "px-3 py-2",
  // 12 / 8
  comfortable: "px-4 py-3",
  // 16 / 12
  spacious: "px-5 py-4"
  // 20 / 16
}, Et = Be("compact"), Er = Be(null), Fo = re(function({ className: t, striped: r, bordered: n, density: a = "compact", children: s, "aria-busy": i, ...l }, c) {
  const [d, u] = V(0), b = pe((p) => u((m) => m + p), []), h = /* @__PURE__ */ o(Er.Provider, { value: b, children: /* @__PURE__ */ o(Et.Provider, { value: a, children: /* @__PURE__ */ o(
    "table",
    {
      ref: c,
      "aria-busy": i ?? (d > 0 ? !0 : void 0),
      className: I(
        "w-full border-collapse font-mono text-sm text-[var(--text-primary)]",
        r && "[&_tbody_tr:nth-child(even)]:bg-[var(--surface-subtle)]",
        t
      ),
      ...l,
      children: s
    }
  ) }) });
  return n ? /* @__PURE__ */ o("div", { className: "plate-round-lg p-px bg-[var(--surface-container-stroke)]", children: /* @__PURE__ */ o("div", { className: "plate-round-lg bg-[var(--surface-card)]", children: h }) }) : h;
});
Fo.displayName = "Table";
const Vo = re(function({ className: t, ...r }, n) {
  return /* @__PURE__ */ o(
    "thead",
    {
      ref: n,
      className: I(
        "border-b-[length:var(--border-width-hairline)] border-solid border-[var(--surface-container-stroke)] bg-[var(--surface-subtle)]",
        t
      ),
      ...r
    }
  );
});
Vo.displayName = "TableHeader";
const Go = re(function({ className: t, loading: r = !1, loadingRows: n = 3, emptyState: a, colSpan: s, children: i, ...l }, c) {
  const d = Te(Er), u = Q(null), b = pe(
    (g) => {
      u.current = g, typeof c == "function" ? c(g) : c && (c.current = g);
    },
    [c]
  ), h = !r && a != null && Zt.toArray(i).length === 0, p = r || h, [m, f] = V(1);
  jo(() => {
    var $, w, N;
    if (!p || s != null) return;
    const g = (N = (w = ($ = u.current) == null ? void 0 : $.closest("table")) == null ? void 0 : w.tHead) == null ? void 0 : N.rows[0];
    if (!g) return;
    const z = Array.from(g.cells).reduce((T, v) => T + v.colSpan, 0);
    f(Math.max(1, z));
  }, [p, s]);
  const x = Math.max(1, s ?? m);
  G(() => {
    if (!(!r || !d))
      return d(1), () => d(-1);
  }, [r, d]);
  let k = i;
  if (r) {
    const g = Math.max(1, Math.floor(n));
    k = Array.from({ length: g }, (z, $) => /* @__PURE__ */ o(xt, { "aria-hidden": "true", "data-table-loading-row": "", children: Array.from({ length: x }, (w, N) => /* @__PURE__ */ o(vt, { children: /* @__PURE__ */ o("div", { className: "flex h-5 items-center", children: /* @__PURE__ */ o(Ir, {}) }) }, N)) }, $));
  } else h && (k = /* @__PURE__ */ o(xt, { "data-table-empty-row": "", children: /* @__PURE__ */ o(vt, { colSpan: x, className: "text-center", children: a }) }));
  return /* @__PURE__ */ o("tbody", { ref: b, className: I(t), ...l, children: k });
});
Go.displayName = "TableBody";
const Ho = re(function({ className: t, ...r }, n) {
  return /* @__PURE__ */ o(
    "tfoot",
    {
      ref: n,
      className: I(
        "border-t-[length:var(--border-width-hairline)] border-solid border-[var(--surface-container-stroke)] bg-[var(--surface-subtle)]",
        t
      ),
      ...r
    }
  );
});
Ho.displayName = "TableFooter";
const xt = re(function({ className: t, ...r }, n) {
  return /* @__PURE__ */ o(
    "tr",
    {
      ref: n,
      className: I(
        "border-b-[length:var(--border-width-hairline)] border-solid border-[var(--surface-container-stroke)] transition-colors [transition-duration:var(--duration-normal)]",
        t
      ),
      ...r
    }
  );
});
xt.displayName = "TableRow";
const Uo = re(function({ className: t, scope: r = "col", ...n }, a) {
  const s = Te(Et);
  return /* @__PURE__ */ o(
    "th",
    {
      ref: a,
      scope: r,
      className: I(
        Tr[s],
        "text-left font-bold text-[var(--text-primary)]",
        t
      ),
      ...n
    }
  );
});
Uo.displayName = "TableHead";
const vt = re(function({ className: t, ...r }, n) {
  const a = Te(Et);
  return /* @__PURE__ */ o(
    "td",
    {
      ref: n,
      className: I(
        Tr[a],
        "align-middle text-secondary-800 dark:text-secondary-200",
        t
      ),
      ...r
    }
  );
});
vt.displayName = "TableCell";
const Wo = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, tt = (e) => e === "top" || e === "bottom";
function ct(e, t, r, n, a, s) {
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
function Ko(e, t, r, n, a) {
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
function qo(e, t, r, n, a) {
  return tt(e) ? t === "start" ? r.left : t === "end" ? r.left + r.width - n : r.left + r.width / 2 - n / 2 : t === "start" ? r.top : t === "end" ? r.top + r.height - a : r.top + r.height / 2 - a / 2;
}
const Wt = (e, t, r) => r < t ? t : Math.min(Math.max(e, t), r);
function Xo({
  anchor: e,
  floating: t,
  side: r = "bottom",
  align: n = "start",
  offset: a = 8,
  padding: s = 8,
  viewport: i,
  flip: l = !0
}) {
  const c = (i == null ? void 0 : i.width) ?? (typeof window < "u" ? window.innerWidth : 0), d = (i == null ? void 0 : i.height) ?? (typeof window < "u" ? window.innerHeight : 0), { width: u, height: b } = t;
  let h = r;
  const p = tt(r) ? b : u, m = ct(r, e, c, d, a, s);
  if (l && m < p) {
    const z = Wo[r];
    ct(z, e, c, d, a, s) > m && (h = z);
  }
  const f = Ko(h, e, u, b, a), x = qo(h, n, e, u, b), k = tt(h) ? f : Wt(x, s, d - b - s), g = tt(h) ? Wt(x, s, c - u - s) : f;
  return {
    top: k,
    left: g,
    side: h,
    align: n,
    available: Math.max(0, ct(h, e, c, d, a, s))
  };
}
const Yo = typeof window < "u" ? Me : G;
function Zo({
  open: e,
  anchorRef: t,
  floatingRef: r,
  side: n = "bottom",
  align: a = "start",
  offset: s = 8,
  padding: i = 8
}) {
  const [l, c] = V(null), d = pe(() => {
    const u = t.current, b = r.current;
    if (!u || !b) return;
    const h = u.getBoundingClientRect(), p = b.getBoundingClientRect(), m = Xo({
      anchor: { top: h.top, left: h.left, width: h.width, height: h.height },
      floating: { width: p.width, height: p.height },
      side: n,
      align: a,
      offset: s,
      padding: i
    });
    c(
      (f) => f && f.top === m.top && f.left === m.left && f.side === m.side && f.available === m.available && f.anchorWidth === h.width ? f : { ...m, anchorWidth: h.width }
    );
  }, [t, r, n, a, s, i]);
  return Yo(() => {
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
const Qo = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Cr({
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
  autoFocus: b = !0,
  returnFocus: h = !0,
  matchAnchorWidth: p = !1,
  role: m = "dialog",
  "aria-label": f,
  "aria-labelledby": x,
  id: k,
  className: g,
  contentClassName: z,
  triggerWrapperClassName: $,
  portal: w = !1
}) {
  const [N, T] = Ve({
    value: e,
    defaultValue: t,
    onChange: r
  }), v = ue(), R = k ?? `${v}-popover`, E = Q(null), W = Q(null), J = Q("programmatic"), oe = Pe(
    () => ({
      get current() {
        var C;
        return (a == null ? void 0 : a.current) ?? ((C = E.current) == null ? void 0 : C.firstElementChild) ?? E.current;
      }
    }),
    [a]
  ), { position: K } = Zo({ open: N, anchorRef: oe, floatingRef: W, side: i, align: l, offset: c }), te = (C) => {
    J.current = C, T(!1);
  }, F = (C) => {
    var B, X, U;
    return C != null && (((B = W.current) == null ? void 0 : B.contains(C)) || ((X = E.current) == null ? void 0 : X.contains(C)) || ((U = a == null ? void 0 : a.current) == null ? void 0 : U.contains(C)) || !1);
  };
  G(() => {
    if (!N || !d) return;
    const C = (B) => {
      F(B.target) || te("outside");
    };
    return document.addEventListener("mousedown", C), () => document.removeEventListener("mousedown", C);
  }, [N, d]), G(() => {
    if (!N || !u) return;
    const C = (B) => {
      if (B.key !== "Escape") return;
      const X = B.target;
      (F(X) || X === document.body || X === document.documentElement) && te("escape");
    };
    return document.addEventListener("keydown", C), () => document.removeEventListener("keydown", C);
  }, [N, u]);
  const _ = Q(N);
  G(() => {
    var C;
    if (N && !_.current && (J.current = "programmatic", b && W.current && (W.current.querySelector(Qo) ?? W.current).focus({ preventScroll: !0 })), !N && _.current && h) {
      const B = J.current, X = document.activeElement, U = X == null || X === document.body;
      B !== "outside" && B !== "blur" && (U || F(X)) && ((C = oe.current) == null || C.focus({ preventScroll: !0 }));
    }
    _.current = N;
  }, [N]);
  const D = (C) => {
    const B = C.relatedTarget;
    B && !F(B) && te("blur");
  }, q = n && qe(n) ? yt(
    n,
    {
      "aria-expanded": N,
      "aria-controls": N ? R : void 0,
      "aria-haspopup": m === "dialog" ? "dialog" : void 0,
      onClick: (C) => {
        var B, X;
        (X = (B = n.props).onClick) == null || X.call(B, C), !C.defaultPrevented && (N ? te("trigger") : T(!0));
      }
    }
  ) : null, S = (C) => w && typeof document < "u" ? Wr(C, document.body) : C, O = {
    position: "fixed",
    top: (K == null ? void 0 : K.top) ?? 0,
    left: (K == null ? void 0 : K.left) ?? 0,
    zIndex: "var(--z-index-popover)",
    minWidth: p && K ? K.anchorWidth : void 0,
    animationDuration: "var(--duration-fast)",
    // Exposed so content can cap its height to the room on the chosen side
    "--popover-available-height": K ? `${K.available}px` : void 0
  };
  return /* @__PURE__ */ y(we, { children: [
    q && /* @__PURE__ */ o("span", { ref: E, className: I("inline-flex", $), children: q }),
    N && S(
      /* @__PURE__ */ o(
        "div",
        {
          ref: W,
          id: R,
          role: m ?? void 0,
          "aria-label": m ? f : void 0,
          "aria-labelledby": m ? x : void 0,
          tabIndex: -1,
          "data-side": (K == null ? void 0 : K.side) ?? i,
          "data-align": l,
          onBlur: D,
          style: O,
          className: I(
            "w-max max-w-[calc(100vw-1rem)] plate-round p-px bg-[var(--surface-container-stroke)] focus:outline-none",
            "animate-in fade-in motion-reduce:animate-none",
            // Measured before it is shown, so it never flashes at 0,0
            K ? "opacity-100" : "opacity-0",
            g
          ),
          children: /* @__PURE__ */ o(
            "div",
            {
              className: I(
                "plate-round bg-[var(--surface-card)] p-4 font-mono text-sm text-[var(--text-primary)]",
                z
              ),
              children: s
            }
          )
        }
      )
    )
  ] });
}
Cr.displayName = "Popover";
const Jo = (e, t) => e.label.toLowerCase().includes(t.trim().toLowerCase()), ea = re(function({
  options: t,
  value: r,
  defaultValue: n = null,
  onValueChange: a,
  onInputChange: s,
  filter: i = Jo,
  emptyText: l = "No matches",
  size: c = "md",
  label: d,
  helperText: u,
  errorMessage: b,
  error: h = !1,
  openOnFocus: p = !1,
  portal: m = !1,
  disabled: f = !1,
  placeholder: x,
  name: k,
  id: g,
  className: z,
  "aria-describedby": $,
  "aria-label": w,
  onKeyDown: N,
  onFocus: T,
  onBlur: v,
  ...R
}, E) {
  const W = de(c, "Combobox"), J = je({ error: h, helperText: u, errorMessage: b, describedBy: $ }), oe = ue(), K = g ?? `${oe}-input`, te = `${oe}-listbox`, F = `${oe}-label`, _ = `${oe}-empty`, D = (A) => `${oe}-option-${A}`, [q, S] = Ve({
    value: r,
    defaultValue: n
  }), O = t.find((A) => A.value === q) ?? null, [C, B] = V(!1), [X, U] = V((O == null ? void 0 : O.label) ?? ""), [Y, ce] = V(!1), [ae, Z] = V(-1), fe = Q(null), ge = Q(null), xe = Q(null);
  G(() => {
    C || U((O == null ? void 0 : O.label) ?? "");
  }, [O == null ? void 0 : O.label, C]);
  const j = Pe(
    () => Y && X !== "" ? t.filter((A) => i(A, X)) : t,
    [Y, X, t, i]
  ), P = j.map((A, ne) => A.disabled ? -1 : ne).filter((A) => A >= 0), ie = P[0] ?? -1, ke = P[P.length - 1] ?? -1, ve = (A, ne) => {
    if (P.length === 0) return -1;
    const ye = P.indexOf(A);
    if (ye === -1) return ne === 1 ? ie : ke;
    const Ce = (ye + ne + P.length) % P.length;
    return P[Ce];
  }, me = (A) => {
    if (f) return;
    B(!0);
    const ne = O ? j.findIndex((ye) => ye.value === O.value && !ye.disabled) : -1;
    Z(A === "selected" ? ne >= 0 ? ne : ie : A === "first" ? ie : A === "last" ? ke : -1);
  }, be = () => {
    B(!1), ce(!1), Z(-1), U((O == null ? void 0 : O.label) ?? "");
  }, Re = (A) => {
    S((A == null ? void 0 : A.value) ?? null), ((A == null ? void 0 : A.value) ?? null) !== q && (a == null || a((A == null ? void 0 : A.value) ?? null, A)), U((A == null ? void 0 : A.label) ?? ""), ce(!1), B(!1), Z(-1);
  };
  G(() => {
    var ne;
    if (!C || ae < 0) return;
    const A = document.getElementById(D(ae));
    (ne = A == null ? void 0 : A.scrollIntoView) == null || ne.call(A, { block: "nearest" });
  }, [C, ae]);
  const ot = (A) => {
    const ne = A.target.value;
    if (U(ne), ce(!0), s == null || s(ne), !f) {
      B(!0);
      const ye = ne === "" ? t : t.filter((Ce) => i(Ce, ne));
      Z(ye.findIndex((Ce) => !Ce.disabled));
    }
  }, Pr = (A) => {
    if (N == null || N(A), !(A.defaultPrevented || f))
      switch (A.key) {
        case "ArrowDown":
          A.preventDefault(), C ? Z((ne) => ve(ne, 1)) : me(A.altKey ? "none" : "selected");
          break;
        case "ArrowUp":
          A.preventDefault(), C ? Z((ne) => ve(ne, -1)) : me(O ? "selected" : "last");
          break;
        case "Home":
          C && P.length && (A.preventDefault(), Z(ie));
          break;
        case "End":
          C && P.length && (A.preventDefault(), Z(ke));
          break;
        case "Enter":
          C && ae >= 0 && j[ae] && !j[ae].disabled && (A.preventDefault(), Re(j[ae]));
          break;
        case "Escape":
          C ? (A.preventDefault(), be()) : (X !== "" || q != null) && (A.preventDefault(), Re(null));
          break;
        case "Tab":
          C && be();
          break;
      }
  }, Br = (A) => {
    ge.current = A, typeof E == "function" ? E(A) : E && (E.current = A);
  }, _t = {
    sm: { input: "h-control-sm pl-3 pr-9", icon: "right-3" },
    md: { input: "h-control-md pl-4 pr-10", icon: "right-4" },
    lg: { input: "h-control-lg pl-5 pr-11", icon: "right-5" }
  }[W], at = J.invalid, jr = at ? "bg-[var(--field-border-error)] focus-within:!bg-[var(--field-border-focus)]" : "bg-[var(--field-border)] hover:bg-[var(--field-border-hover)] focus-within:!bg-[var(--field-border-focus)]", Ze = d != null && d !== "", Fr = C && ae >= 0 && j[ae] ? D(ae) : void 0;
  return /* @__PURE__ */ y("div", { className: I("w-full", z), children: [
    /* @__PURE__ */ y("div", { className: "w-full space-y-1", children: [
      Ze && /* @__PURE__ */ o(
        "label",
        {
          id: F,
          htmlFor: K,
          className: "block font-mono text-sm text-secondary-800 dark:text-secondary-200",
          children: d
        }
      ),
      /* @__PURE__ */ y(
        "div",
        {
          ref: fe,
          className: I(
            "relative w-full plate-round p-px transition-colors [transition-duration:var(--duration-fast)]",
            jr,
            f && "opacity-50"
          ),
          children: [
            /* @__PURE__ */ o(
              "input",
              {
                ...R,
                ref: Br,
                id: K,
                type: "text",
                role: "combobox",
                autoComplete: "off",
                "aria-autocomplete": "list",
                "aria-expanded": C,
                "aria-controls": C ? j.length > 0 ? te : _ : void 0,
                "aria-activedescendant": Fr,
                "aria-invalid": at || void 0,
                "aria-describedby": J.describedBy,
                "aria-label": Ze ? void 0 : w,
                disabled: f,
                placeholder: x,
                value: X,
                onChange: ot,
                onKeyDown: Pr,
                onClick: () => {
                  C || me("selected");
                },
                onFocus: (A) => {
                  T == null || T(A), p && !C && me("selected");
                },
                onBlur: (A) => {
                  v == null || v(A), C && be();
                },
                className: I(
                  "w-full plate-round font-mono text-sm",
                  "transition-colors [transition-duration:var(--duration-fast)]",
                  "placeholder:text-[var(--field-placeholder)] focus:outline-none disabled:cursor-not-allowed",
                  at ? "bg-[var(--field-background-error)] text-[var(--text-primary)]" : "bg-[var(--field-background)] text-[var(--text-primary)]",
                  _t.input
                )
              }
            ),
            /* @__PURE__ */ o(
              "span",
              {
                "aria-hidden": "true",
                className: I(
                  "pointer-events-none absolute top-1/2 -translate-y-1/2 inline-flex text-[var(--text-secondary)]",
                  "transition-transform [transition-duration:var(--duration-normal)] motion-reduce:transition-none",
                  C && "rotate-180",
                  _t.icon
                ),
                children: /* @__PURE__ */ o(ee, { name: "ChevronDown" })
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ o(Fe, { ...J.message })
    ] }),
    k != null && /* @__PURE__ */ o("input", { type: "hidden", name: k, value: q ?? "" }),
    /* @__PURE__ */ o(
      Cr,
      {
        open: C,
        onOpenChange: (A) => {
          A || be();
        },
        anchorRef: fe,
        role: null,
        autoFocus: !1,
        returnFocus: !1,
        closeOnEscape: !1,
        matchAnchorWidth: !0,
        portal: m,
        offset: 4,
        contentClassName: "p-0",
        children: j.length > 0 ? /* @__PURE__ */ o(
          "ul",
          {
            ref: xe,
            id: te,
            role: "listbox",
            "aria-labelledby": Ze ? F : void 0,
            "aria-label": Ze ? void 0 : w,
            className: "max-h-[min(var(--control-menu-max-height),var(--popover-available-height,var(--control-menu-max-height)))] overflow-y-auto py-1",
            children: j.map((A, ne) => {
              const ye = A.value === q, Ce = ne === ae;
              return (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events -- pointer path only; the keyboard selects through the input with aria-activedescendant
                /* @__PURE__ */ y(
                  "li",
                  {
                    id: D(ne),
                    role: "option",
                    "aria-selected": ye,
                    "aria-disabled": A.disabled || void 0,
                    onMouseDown: (Vr) => Vr.preventDefault(),
                    onMouseMove: () => {
                      !A.disabled && ae !== ne && Z(ne);
                    },
                    onClick: () => {
                      A.disabled || Re(A);
                    },
                    className: I(
                      "flex min-h-touch items-center gap-2 px-4 py-2 font-mono text-sm",
                      A.disabled ? "cursor-not-allowed text-[var(--text-disabled)]" : "cursor-pointer text-[var(--text-primary)]",
                      Ce && !A.disabled && "bg-[var(--surface-subtle)]"
                    ),
                    children: [
                      /* @__PURE__ */ o("span", { className: "min-w-0 flex-1 truncate", children: A.label }),
                      ye && /* @__PURE__ */ o(ee, { name: "Check", className: "shrink-0 text-[var(--border-focus)]" })
                    ]
                  },
                  A.value
                )
              );
            })
          }
        ) : /* @__PURE__ */ o("div", { id: _, role: "status", className: "px-4 py-3 font-mono text-sm text-[var(--text-secondary)]", children: l })
      }
    )
  ] });
});
ea.displayName = "Combobox";
const ta = {
  primary: "bg-primary-500 dark:bg-primary-400",
  neutral: "bg-secondary-600 dark:bg-secondary-400",
  info: "bg-info-600 dark:bg-info-400",
  success: "bg-success-600 dark:bg-success-400",
  warning: "bg-warning-600 dark:bg-warning-400",
  error: "bg-error-600 dark:bg-error-400"
}, ra = { sm: "h-2", md: "h-3", lg: "h-4" }, Kt = 4;
function na() {
  if (typeof window > "u" || typeof getComputedStyle != "function") return 120;
  const e = getComputedStyle(document.documentElement).getPropertyValue("--duration-fast").trim(), t = e.endsWith("ms") ? parseFloat(e) : e.endsWith("s") ? parseFloat(e) * 1e3 : NaN;
  return Number.isFinite(t) && t > 0 ? t : 120;
}
function oa() {
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
function aa({
  value: e,
  max: t = 100,
  label: r,
  showLabel: n = !0,
  showValue: a = !0,
  size: s = "md",
  tone: i,
  variant: l,
  segments: c = 20,
  className: d
}) {
  const u = de(s, "ProgressBar");
  l !== void 0 && se("ProgressBar", "variant", "tone");
  const b = i ?? l ?? "primary", h = ue(), p = e == null || Number.isNaN(e), m = t > 0 ? t : 100, f = p ? 0 : Math.min(Math.max(e, 0), m), x = Math.round(f / m * 100), k = Math.floor(f / m * c), g = oa(), [z, $] = V(0);
  G(() => {
    if (!p || g) return;
    const N = window.setInterval(() => $((T) => (T + 1) % (c + Kt)), na());
    return () => window.clearInterval(N);
  }, [p, g, c]);
  const w = (N) => p ? g ? !0 : N > z - Kt - 1 && N <= z - 1 : N < k;
  return /* @__PURE__ */ y("div", { className: I("w-full space-y-1.5 font-mono", d), children: [
    n && /* @__PURE__ */ y("div", { className: "flex items-baseline justify-between gap-3 text-sm", children: [
      /* @__PURE__ */ o("span", { id: h, className: "min-w-0 truncate text-[var(--text-primary)]", children: r }),
      a && !p && /* @__PURE__ */ y("span", { className: "shrink-0 tabular-nums text-[var(--text-secondary)]", "aria-hidden": "true", children: [
        x,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ o(
      "div",
      {
        role: "progressbar",
        "aria-labelledby": n ? h : void 0,
        "aria-label": n ? void 0 : r,
        "aria-valuemin": 0,
        "aria-valuemax": m,
        "aria-valuenow": p ? void 0 : f,
        "aria-valuetext": p ? void 0 : `${x}%`,
        "data-state": p ? "indeterminate" : f >= m ? "complete" : "loading",
        "data-tone": b,
        className: "bg-[var(--border-default)] p-px",
        children: /* @__PURE__ */ o(
          "div",
          {
            className: I("flex gap-0.5 bg-[var(--surface-subtle)] p-0.5", ra[u]),
            "aria-hidden": "true",
            children: Array.from({ length: c }, (N, T) => /* @__PURE__ */ o(
              "span",
              {
                "data-filled": w(T) || void 0,
                className: I(
                  "h-full flex-1",
                  w(T) ? ta[b] : "bg-[var(--surface-muted)]",
                  p && g && "opacity-50"
                )
              },
              T
            ))
          }
        )
      }
    )
  ] });
}
aa.displayName = "ProgressBar";
const sa = {
  sm: { root: "gap-3 px-4 py-6", icon: "6", plate: "p-2", title: "text-sm", description: "text-xs", button: "sm" },
  md: { root: "gap-4 px-6 py-12", icon: "8", plate: "p-3", title: "text-lg", description: "text-sm", button: "md" }
};
function ia({
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
  const d = sa[s], u = (b, h) => /* @__PURE__ */ o(
    Xe,
    {
      variant: h,
      size: d.button,
      onClick: b.onClick,
      href: b.href,
      iconLeft: b.icon ? he(b.icon) : void 0,
      children: b.label
    }
  );
  return /* @__PURE__ */ y("div", { className: I("flex flex-col items-center text-center font-mono", d.root, c), children: [
    e && /* @__PURE__ */ o("span", { className: I("inline-flex plate-round bg-[var(--surface-subtle)] text-[var(--text-secondary)]", d.plate), children: he(e, { size: d.icon }) }),
    /* @__PURE__ */ y("div", { className: "flex max-w-prose flex-col gap-1", children: [
      /* @__PURE__ */ o(i, { className: I("font-medium text-[var(--text-primary)]", d.title), children: t }),
      r && /* @__PURE__ */ o("p", { className: I("text-[var(--text-secondary)]", d.description), children: r })
    ] }),
    (n || a) && /* @__PURE__ */ y("div", { className: "flex flex-wrap items-center justify-center gap-3", children: [
      n && u(n, "primary"),
      a && u(a, "secondary")
    ] }),
    l
  ] });
}
ia.displayName = "EmptyState";
const _r = Be(null), Ar = Be(null);
function Mr(e) {
  const t = Te(_r);
  if (!t) throw new Error(`${e} must be used inside <Accordion>.`);
  return t;
}
function Lr(e) {
  const t = Te(Ar);
  if (!t) throw new Error(`${e} must be used inside <AccordionItem>.`);
  return t;
}
function ys(e) {
  const { children: t, headingLevel: r = 3, disabled: n = !1, className: a } = e, s = e.type === "multiple", i = Q(null), l = (m) => m === void 0 ? void 0 : Array.isArray(m) ? m : m === "" ? [] : [m], [c, d] = Ve({
    value: l(e.value),
    defaultValue: l(e.defaultValue) ?? []
  }), u = (m) => {
    var f, x;
    d(m), s ? (f = e.onValueChange) == null || f.call(e, m) : (x = e.onValueChange) == null || x.call(e, m[0] ?? "");
  }, b = s || e.collapsible === !0, h = {
    isOpen: (m) => c.includes(m),
    isLocked: (m) => !b && c.includes(m),
    toggle: (m) => {
      if (c.includes(m)) {
        if (!b) return;
        u(c.filter((f) => f !== m));
      } else
        u(s ? [...c, m] : [m]);
    },
    headingLevel: r,
    disabled: n,
    rootRef: i
  }, p = (m) => {
    var z;
    const f = m.target;
    if (!f.hasAttribute("data-accordion-trigger")) return;
    const x = Array.from(
      ((z = i.current) == null ? void 0 : z.querySelectorAll("[data-accordion-trigger]:not(:disabled)")) ?? []
    ).filter(($) => $.closest("[data-accordion-root]") === i.current), k = x.indexOf(f);
    if (k === -1) return;
    let g = null;
    m.key === "ArrowDown" ? g = (k + 1) % x.length : m.key === "ArrowUp" ? g = (k - 1 + x.length) % x.length : m.key === "Home" ? g = 0 : m.key === "End" && (g = x.length - 1), g !== null && (m.preventDefault(), x[g].focus());
  };
  return /* @__PURE__ */ o(_r.Provider, { value: h, children: /* @__PURE__ */ o(
    "div",
    {
      ref: i,
      "data-accordion-root": "",
      onKeyDown: p,
      className: I("w-full border-t border-[var(--border-hairline)] font-mono", a),
      children: t
    }
  ) });
}
function ws({ value: e, disabled: t = !1, children: r, className: n }) {
  const a = Mr("AccordionItem"), s = ue(), i = a.isOpen(e), l = {
    value: e,
    open: i,
    disabled: t || a.disabled,
    triggerId: `${s}-trigger`,
    contentId: `${s}-content`
  };
  return /* @__PURE__ */ o(Ar.Provider, { value: l, children: /* @__PURE__ */ o("div", { "data-state": i ? "open" : "closed", className: I("border-b border-[var(--border-hairline)]", n), children: r }) });
}
function ks({ children: e, className: t }) {
  const r = Mr("AccordionTrigger"), n = Lr("AccordionTrigger"), a = `h${r.headingLevel}`, s = r.isLocked(n.value);
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
      className: I(
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
          ee,
          {
            name: "ChevronRight",
            className: I(
              "shrink-0 text-[var(--text-secondary)] transition-transform [transition-duration:var(--duration-normal)] motion-reduce:transition-none",
              n.open && "rotate-90"
            )
          }
        )
      ]
    }
  ) });
}
function Ns({ children: e, className: t }) {
  const r = Lr("AccordionContent");
  return /* @__PURE__ */ o(
    "div",
    {
      id: r.contentId,
      role: "region",
      "aria-labelledby": r.triggerId,
      "data-state": r.open ? "open" : "closed",
      className: I(
        // grid-rows 0fr -> 1fr animates to the content's natural height;
        // visibility flips at the end of the close so hidden bodies leave
        // the tab order and accessibility tree.
        "grid transition-[grid-template-rows,visibility] [transition-duration:var(--duration-normal)] motion-reduce:transition-none",
        r.open ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"
      ),
      children: /* @__PURE__ */ o("div", { className: "min-h-0 overflow-hidden", children: /* @__PURE__ */ o("div", { className: I("px-4 pb-4 pt-1 font-mono text-sm text-[var(--text-secondary)]", t), children: e }) })
    }
  );
}
const la = "focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]";
function ca({
  items: e,
  maxItems: t,
  itemsBeforeCollapse: r = 1,
  itemsAfterCollapse: n = 1,
  expandLabel: a = (l) => `Show ${l} more breadcrumb${l === 1 ? "" : "s"}`,
  "aria-label": s = "Breadcrumb",
  className: i
}) {
  const [l, c] = V(!1), d = Q(null), u = Q(null), b = Math.max(0, r), h = Math.max(1, n), p = !l && t != null && e.length > t && e.length > b + h, m = p ? e.length - b - h : 0;
  G(() => {
    var z;
    if (!l || u.current == null) return;
    const g = (z = d.current) == null ? void 0 : z.querySelector(
      `[data-crumb-index="${u.current}"] a, [data-crumb-index="${u.current}"] [data-crumb-link]`
    );
    g == null || g.focus(), u.current = null;
  }, [l]);
  const f = e.length - 1, x = (g, z, $) => /* @__PURE__ */ y(
    "li",
    {
      "data-crumb-index": z,
      className: "inline-flex min-w-0 items-center",
      children: [
        $ && /* @__PURE__ */ o(ee, { name: "ChevronRight", size: "3", className: "mx-1 shrink-0 text-[var(--text-secondary)]" }),
        z === f ? /* @__PURE__ */ o(
          "span",
          {
            "aria-current": "page",
            className: "inline-flex min-h-touch min-w-0 items-center truncate px-1 text-[var(--text-primary)]",
            children: g.label
          }
        ) : g.as ? /* @__PURE__ */ o(
          ht,
          {
            variant: "quiet",
            as: g.as,
            asProps: { ...g.asProps, "data-crumb-link": "" },
            className: "inline-flex min-h-touch min-w-0 items-center truncate px-1",
            children: g.label
          }
        ) : /* @__PURE__ */ o(
          ht,
          {
            variant: "quiet",
            href: g.href ?? "#",
            className: "inline-flex min-h-touch min-w-0 items-center truncate px-1",
            children: g.label
          }
        )
      ]
    },
    g.key ?? z
  );
  let k;
  if (p) {
    const g = e.slice(0, b), z = e.slice(e.length - h);
    k = /* @__PURE__ */ y(we, { children: [
      g.map(($, w) => x($, w, w > 0)),
      /* @__PURE__ */ y("li", { className: "inline-flex items-center", children: [
        b > 0 && /* @__PURE__ */ o(ee, { name: "ChevronRight", size: "3", className: "mx-1 shrink-0 text-[var(--text-secondary)]" }),
        /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            "aria-label": a(m),
            onClick: () => {
              u.current = b, c(!0);
            },
            className: I(
              "plate-round inline-flex h-touch min-w-touch items-center justify-center px-2 text-[var(--text-primary)]",
              "transition-colors [transition-duration:var(--duration-fast)] motion-reduce:transition-none hover:bg-[var(--surface-muted)]",
              la
            ),
            children: /* @__PURE__ */ o("span", { "aria-hidden": "true", children: "..." })
          }
        )
      ] }),
      z.map(($, w) => x($, e.length - h + w, !0))
    ] });
  } else
    k = e.map((g, z) => x(g, z, z > 0));
  return /* @__PURE__ */ o("nav", { "aria-label": s, className: I("font-mono text-sm", i), children: /* @__PURE__ */ o("ol", { ref: d, className: "flex min-w-0 flex-wrap items-center", children: k }) });
}
ca.displayName = "Breadcrumbs";
const dt = (e, t) => t < e ? [] : Array.from({ length: t - e + 1 }, (r, n) => e + n);
function da(e, t, r = 1, n = 1) {
  if (t <= 0) return [];
  const a = Math.min(Math.max(1, e), t), s = dt(1, Math.min(n, t)), i = dt(Math.max(t - n + 1, n + 1), t), l = Math.max(
    Math.min(a - r, t - n - r * 2 - 1),
    n + 2
  ), c = Math.min(
    Math.max(a + r, n + r * 2 + 2),
    i.length > 0 ? i[0] - 2 : t - 1
  ), d = [...s];
  l > n + 2 ? d.push("ellipsis-start") : n + 1 < t - n && d.push(n + 1), d.push(...dt(l, c)), c < t - n - 1 ? d.push("ellipsis-end") : t - n > n && d.push(t - n), d.push(...i);
  const u = /* @__PURE__ */ new Set();
  return d.filter((b) => typeof b == "number" && (b < 1 || b > t) || u.has(b) ? !1 : (u.add(b), !0));
}
const ua = {
  sm: "h-control-sm min-w-control-sm px-2 text-sm",
  md: "h-control-md min-w-control-md px-2.5 text-sm",
  lg: "h-control-lg min-w-control-lg px-3 text-base"
}, Rr = {
  sm: "min-h-touch min-w-touch",
  md: "min-h-touch min-w-touch",
  lg: "min-h-control-lg min-w-control-lg"
}, qt = { sm: "4", md: "4", lg: "5" };
function ut({
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
      className: I(
        "group inline-flex items-center justify-center font-mono focus:outline-none",
        Rr[e],
        r ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      ),
      children: /* @__PURE__ */ o(
        "span",
        {
          className: I(
            "plate-round inline-flex items-center justify-center tabular-nums",
            "transition-colors [transition-duration:var(--duration-fast)] motion-reduce:transition-none",
            "group-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]",
            ua[e],
            t ? "bg-[var(--button-primary-background)] text-[var(--button-primary-text)]" : I(
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
function ma({
  page: e,
  defaultPage: t = 1,
  pageCount: r,
  onPageChange: n,
  siblingCount: a = 1,
  boundaryCount: s = 1,
  size: i = "md",
  showPrevNext: l = !0,
  getPageLabel: c = (p) => `Page ${p}`,
  previousLabel: d = "Previous page",
  nextLabel: u = "Next page",
  "aria-label": b = "Pagination",
  className: h
}) {
  const p = de(i, "Pagination"), [m, f] = V(t), x = e !== void 0, g = Math.min(Math.max(1, x ? e : m), Math.max(1, r));
  if (r <= 0) return null;
  const z = (w) => {
    const N = Math.min(Math.max(1, w), r);
    N !== g && (x || f(N), n == null || n(N));
  }, $ = da(g, r, a, s);
  return /* @__PURE__ */ o("nav", { "aria-label": b, className: I("font-mono", h), children: /* @__PURE__ */ y("ul", { className: "flex flex-wrap items-center", children: [
    l && /* @__PURE__ */ o("li", { children: /* @__PURE__ */ o(ut, { size: p, label: d, disabled: g <= 1, onClick: () => z(g - 1), children: /* @__PURE__ */ o(ee, { name: "ArrowLeft", size: qt[p] }) }) }),
    $.map(
      (w) => typeof w == "number" ? /* @__PURE__ */ o("li", { children: /* @__PURE__ */ o(
        ut,
        {
          size: p,
          current: w === g,
          label: c(w),
          onClick: () => z(w),
          children: w
        }
      ) }, w) : /* @__PURE__ */ o(
        "li",
        {
          "aria-hidden": "true",
          className: I(
            "inline-flex items-center justify-center text-[var(--text-secondary)]",
            Rr[p],
            p === "lg" ? "text-base" : "text-sm"
          ),
          children: "..."
        },
        w
      )
    ),
    l && /* @__PURE__ */ o("li", { children: /* @__PURE__ */ o(ut, { size: p, label: u, disabled: g >= r, onClick: () => z(g + 1), children: /* @__PURE__ */ o(ee, { name: "ArrowRight", size: qt[p] }) }) })
  ] }) });
}
ma.displayName = "Pagination";
const Ct = Be({ collapsed: !1 });
function fa({ "aria-label": e, collapsed: t = !1, children: r, className: n }) {
  const a = Ie.Children.toArray(r).some(
    (s) => Ie.isValidElement(s) && s.type === Or
  );
  return /* @__PURE__ */ o(Ct.Provider, { value: { collapsed: t }, children: /* @__PURE__ */ o(
    "nav",
    {
      "aria-label": e,
      "data-collapsed": t || void 0,
      className: I(
        "border border-[var(--border-hairline)] bg-[var(--surface-container)] font-mono text-sm",
        t ? "w-fit p-2" : "w-64 p-4",
        n
      ),
      children: a ? /* @__PURE__ */ o("div", { className: "space-y-4", children: r }) : /* @__PURE__ */ o("ul", { className: "space-y-1", children: r })
    }
  ) });
}
fa.displayName = "SideNav";
function Or({ heading: e, children: t, className: r }) {
  const { collapsed: n } = Te(Ct), a = ue();
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
            className: I(
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
Or.displayName = "SideNavSection";
const pa = "plate-round flex w-full min-h-touch items-center gap-3 px-3 py-2 text-left font-mono text-sm transition-colors [transition-duration:var(--duration-fast)] motion-reduce:transition-none focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]", ba = "text-[var(--text-secondary)] hover:bg-[var(--surface-muted)] hover:text-[var(--accent)]", ha = "bg-[var(--surface-muted)] text-[var(--accent)]";
function Dr(e) {
  let t = !1;
  return Ie.Children.forEach(e, (r) => {
    if (t || !Ie.isValidElement(r)) return;
    const n = r.props;
    (n.active || Dr(n.children)) && (t = !0);
  }), t;
}
function ga({
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
  onExpandedChange: b,
  className: h
}) {
  const { collapsed: p } = Te(Ct), m = ue(), f = Ie.Children.toArray(c).some(Ie.isValidElement), [x, k] = V(
    () => u ?? (f && Dr(c))
  ), g = d ?? x, z = () => {
    const v = !g;
    d === void 0 && k(v), b == null || b(v);
  }, $ = /* @__PURE__ */ y(we, { children: [
    t && he(t, { className: "shrink-0" }),
    /* @__PURE__ */ o("span", { className: I("min-w-0 flex-1 truncate", p && "sr-only"), children: e }),
    !p && l && /* @__PURE__ */ o("span", { className: "ml-auto shrink-0", children: l }),
    f && /* @__PURE__ */ o(
      ee,
      {
        name: g ? "ChevronDown" : "ChevronRight",
        size: p ? "3" : "4",
        className: I("shrink-0", !p && "ml-auto")
      }
    )
  ] }), w = I(pa, r ? ha : ba, p && "min-w-touch justify-center gap-1 px-2", h), N = p ? { "aria-label": e } : {};
  let T;
  return f ? T = /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      "aria-expanded": g,
      "aria-controls": m,
      onClick: z,
      className: w,
      ...N,
      children: $
    }
  ) : s ? T = /* @__PURE__ */ o(
    s,
    {
      className: w,
      "aria-current": r ? "page" : void 0,
      onClick: a,
      ...N,
      ...i,
      children: $
    }
  ) : n != null ? T = /* @__PURE__ */ o(
    "a",
    {
      href: n,
      "aria-current": r ? "page" : void 0,
      onClick: a,
      className: w,
      ...N,
      children: $
    }
  ) : T = /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      "aria-current": r ? "page" : void 0,
      onClick: a,
      className: w,
      ...N,
      children: $
    }
  ), /* @__PURE__ */ y("li", { children: [
    p ? /* @__PURE__ */ o(lo, { content: e, side: "right", children: T }) : T,
    f && g && /* @__PURE__ */ o("ul", { id: m, className: I("mt-1 space-y-1", !p && "ml-6"), children: c })
  ] });
}
ga.displayName = "SideNavItem";
function xa({
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
  const b = ue(), [h, p] = V(i), m = s ?? h, f = n ?? t, x = (k) => {
    s === void 0 && p(k), l == null || l(k);
  };
  return /* @__PURE__ */ y(
    "header",
    {
      className: I(
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
            f && /* @__PURE__ */ o(
              Xe,
              {
                variant: "ghost",
                size: "lg",
                "aria-label": c,
                "aria-expanded": m,
                "aria-controls": b,
                onClick: () => x(!m),
                className: "min-w-touch md:hidden",
                children: /* @__PURE__ */ o(ee, { name: m ? "X" : "Menu", size: "5" })
              }
            )
          ] })
        ] }),
        f && m && /* @__PURE__ */ o("div", { id: b, className: "border-t border-[var(--border-hairline)] px-4 py-3 md:hidden", children: /* @__PURE__ */ o("nav", { "aria-label": d, children: /* @__PURE__ */ o("div", { className: "flex flex-col items-start gap-1", children: f }) }) })
      ]
    }
  );
}
xa.displayName = "AppHeader";
function va({
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
      className: I(
        "plate-round-lg flex flex-col p-px",
        u ? "bg-[var(--accent)]" : "bg-[var(--surface-container-stroke)]",
        l
      ),
      children: /* @__PURE__ */ y("div", { className: "plate-round-lg flex min-h-0 flex-1 flex-col bg-[var(--surface-card)] font-mono", children: [
        /* @__PURE__ */ y(
          "div",
          {
            className: I(
              "flex min-h-control-sm shrink-0 items-center gap-2 border-b border-[var(--border-hairline)] px-4 py-1 text-xs",
              u && "bg-[var(--surface-muted)]"
            ),
            children: [
              u && /* @__PURE__ */ o(ee, { name: "ChevronRight", size: "3", className: "shrink-0 text-[var(--text-primary)]" }),
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
            className: I(
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
va.displayName = "Window";
const ya = 8;
function wa({
  content: e,
  count: t,
  enabled: r = !0,
  onFollowChange: n,
  contentRef: a
}) {
  const s = Q(null), [i, l] = V(!0), [c, d] = V(0), u = Q(t), b = pe(
    (f) => {
      l((x) => (x !== f && (n == null || n(f)), f));
    },
    [n]
  ), h = pe(() => {
    const f = s.current;
    f && (f.scrollTop = f.scrollHeight);
  }, []);
  Me(() => {
    const f = t - u.current;
    u.current = t, r && (i ? h() : f > 0 && d((x) => x + f));
  }, [e, t, r, i, h]), Me(() => {
    const f = a == null ? void 0 : a.current;
    if (!r || !i || !f || typeof ResizeObserver > "u") return;
    const x = new ResizeObserver(() => h());
    return x.observe(f), () => x.disconnect();
  }, [a, r, i, h]);
  const p = pe(() => {
    const f = s.current;
    if (!f || !r) return;
    const x = f.scrollHeight - f.scrollTop - f.clientHeight <= ya;
    b(x), x && d(0);
  }, [r, b]), m = pe(() => {
    d(0), b(!0), h();
  }, [b, h]);
  return { scrollRef: s, onScroll: p, following: i, unseen: c, resume: m };
}
const ka = {
  info: { icon: "Info", tag: "INFO", tone: "text-info-700 dark:text-info-400" },
  warning: { icon: "AlertTriangle", tag: "WARN", tone: "text-warning-700 dark:text-warning-400" },
  error: { icon: "AlertCircle", tag: "ERROR", tone: "text-error-700 dark:text-error-400" },
  debug: { icon: "Settings", tag: "DEBUG", tone: "text-secondary-700 dark:text-secondary-400" }
};
function Na({
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
  const { scrollRef: d, onScroll: u, following: b, unseen: h, resume: p } = wa({
    content: e,
    count: e.length,
    enabled: t,
    onFollowChange: l
  });
  e.some((x) => x.level === "warn") && se("LogView", 'level="warn"', 'level="warning"');
  const m = e.some((x) => x.level), f = `${String(Math.max(e.length, 1)).length}ch`;
  return /* @__PURE__ */ y(
    "div",
    {
      className: I(
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
            className: I(
              "min-h-0 flex-1 overflow-auto py-2 font-mono text-xs leading-relaxed text-[var(--text-primary)]",
              i && "plate-round-lg bg-[var(--surface-page)]",
              "focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]"
            ),
            children: e.length === 0 ? /* @__PURE__ */ o("p", { className: "px-3 text-[var(--text-secondary)]", children: s }) : e.map((x, k) => {
              const g = x.level ? ka[x.level === "warn" ? "warning" : x.level] : null;
              return /* @__PURE__ */ y(
                "div",
                {
                  "data-level": x.level,
                  className: I("flex gap-3 px-3", n ? "items-start" : "w-max min-w-full items-start"),
                  children: [
                    r && /* @__PURE__ */ o(
                      "span",
                      {
                        "aria-hidden": "true",
                        className: "shrink-0 select-none text-right tabular-nums text-[var(--text-secondary)]",
                        style: { minWidth: f },
                        children: k + 1
                      }
                    ),
                    x.timestamp && /* @__PURE__ */ o("span", { className: "shrink-0 tabular-nums text-[var(--text-secondary)]", children: x.timestamp }),
                    g ? /* @__PURE__ */ y("span", { className: I("inline-flex w-16 shrink-0 items-center gap-1 font-bold", g.tone), children: [
                      /* @__PURE__ */ o(ee, { name: g.icon, size: "3", className: "shrink-0" }),
                      g.tag
                    ] }) : m && /* @__PURE__ */ o("span", { "aria-hidden": "true", className: "w-16 shrink-0" }),
                    /* @__PURE__ */ o("span", { className: I("min-w-0 flex-1", n ? "whitespace-pre-wrap break-words" : "whitespace-pre"), children: x.text })
                  ]
                },
                x.id
              );
            })
          }
        ),
        t && !b && /* @__PURE__ */ o("div", { className: "pointer-events-none absolute inset-x-0 bottom-3 flex justify-center", children: /* @__PURE__ */ o(
          Xe,
          {
            variant: "secondary",
            size: "sm",
            onClick: p,
            iconLeft: /* @__PURE__ */ o(ee, { name: "ChevronDown", size: "4" }),
            className: "pointer-events-auto",
            children: h > 0 ? `Jump to latest (${h} new)` : "Jump to latest"
          }
        ) })
      ]
    }
  );
}
Na.displayName = "LogView";
const Sa = {
  neutral: "text-[var(--text-primary)]",
  primary: "bg-[var(--button-primary-background)] text-[var(--button-primary-text)] font-bold",
  success: "bg-success-50 text-success-800 dark:bg-success-950 dark:text-success-300",
  warning: "bg-warning-50 text-warning-800 dark:bg-warning-950 dark:text-warning-300",
  error: "bg-error-50 text-error-800 dark:bg-error-950 dark:text-error-300",
  info: "bg-info-50 text-info-800 dark:bg-info-950 dark:text-info-300"
};
function $a({
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
      className: I(
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
$a.displayName = "StatusLine";
function za({ icon: e, tone: t = "neutral", children: r, className: n }) {
  return /* @__PURE__ */ y(
    "span",
    {
      "data-tone": t,
      className: I("inline-flex min-w-0 items-center gap-1.5 whitespace-nowrap px-3", Sa[t], n),
      children: [
        e && he(e, { size: "3", className: "shrink-0" }),
        /* @__PURE__ */ o("span", { className: "truncate", children: r })
      ]
    }
  );
}
za.displayName = "StatusLineSegment";
function Ia({ items: e, layout: t = "inline", leader: r = !1, className: n }) {
  const a = t === "inline";
  return /* @__PURE__ */ o(
    "dl",
    {
      "data-layout": t,
      className: I("font-mono text-sm", a ? "space-y-1" : "space-y-3", n),
      children: e.map((s, i) => /* @__PURE__ */ y(
        "div",
        {
          className: a ? "flex items-baseline justify-between gap-2" : "flex flex-col gap-0.5",
          children: [
            /* @__PURE__ */ o(
              "dt",
              {
                className: I(
                  "text-[var(--text-secondary)]",
                  !a && "text-xs uppercase tracking-wider",
                  a && !r && "shrink-0",
                  a && r && "flex flex-1 items-baseline after:mx-2 after:min-w-4 after:flex-1 after:border-b after:border-dotted after:border-[var(--surface-container-stroke)] after:content-['']"
                ),
                children: s.term
              }
            ),
            /* @__PURE__ */ o("dd", { className: I("min-w-0 text-[var(--text-primary)]", a && "text-right"), children: s.description })
          ]
        },
        s.key ?? i
      ))
    }
  );
}
Ia.displayName = "DescriptionList";
function Ta({
  value: e,
  min: t = 0,
  max: r = 100,
  low: n,
  high: a,
  optimum: s
}) {
  if (n == null && a == null && s == null) return "primary";
  const i = Math.min(Math.max(n ?? t, t), r), l = Math.min(Math.max(a ?? r, i), r), c = s ?? (t + r) / 2, d = (b) => b < i ? 0 : b > l ? 2 : 1, u = Math.abs(d(Math.min(Math.max(e, t), r)) - d(c));
  return u === 0 ? "success" : u === 1 ? "warning" : "error";
}
const Ea = {
  primary: "bg-primary-600 dark:bg-primary-400",
  neutral: "bg-secondary-600 dark:bg-secondary-400",
  info: "bg-info-600 dark:bg-info-400",
  success: "bg-success-600 dark:bg-success-400",
  warning: "bg-warning-600 dark:bg-warning-400",
  error: "bg-error-600 dark:bg-error-400"
};
function Ca({
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
  className: b
}) {
  const h = de(u, "Meter"), p = ue(), m = r - t || 1, f = Math.min(Math.max(e, t), r), x = (f - t) / m, k = l ?? `${Math.round(x * 100)}%`, g = c ?? Ta({ value: e, min: t, max: r, low: n, high: a, optimum: s }), z = Math.max(1, Math.round(d)), $ = Math.round(x * z);
  return /* @__PURE__ */ y("div", { className: I("font-mono text-sm", b), "data-tone": g, children: [
    /* @__PURE__ */ y("div", { className: "mb-1 flex items-baseline justify-between gap-3", children: [
      /* @__PURE__ */ o("span", { id: p, className: "text-[var(--text-primary)]", children: i }),
      /* @__PURE__ */ y("span", { className: "inline-flex items-center gap-1 tabular-nums text-[var(--text-secondary)]", children: [
        g === "warning" && /* @__PURE__ */ o(ee, { name: "AlertTriangle", size: "3" }),
        g === "error" && /* @__PURE__ */ o(ee, { name: "AlertCircle", size: "3" }),
        k
      ] })
    ] }),
    /* @__PURE__ */ o(
      "div",
      {
        role: "meter",
        "aria-labelledby": p,
        "aria-valuenow": f,
        "aria-valuemin": t,
        "aria-valuemax": r,
        "aria-valuetext": k,
        className: "flex gap-0.5",
        children: Array.from({ length: z }, (w, N) => /* @__PURE__ */ o(
          "span",
          {
            "data-filled": N < $ || void 0,
            className: I(
              "flex-1",
              h === "sm" ? "h-2" : "h-3",
              N < $ ? Ea[g] : "bg-[var(--surface-muted)] ring-1 ring-inset ring-[var(--surface-container-stroke)]"
            )
          },
          N
        ))
      }
    )
  ] });
}
Ca.displayName = "Meter";
function _a(e) {
  return e.textValue ? e.textValue : typeof e.label == "string" || typeof e.label == "number" ? String(e.label) : "";
}
const Aa = "plate-round flex min-h-touch cursor-pointer items-center gap-2 py-1 pr-3 font-mono text-sm pl-[calc(var(--tree-level)_*_theme(spacing.4)_+_theme(spacing.2))] transition-colors [transition-duration:var(--duration-fast)] motion-reduce:transition-none";
function Ma({
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
  className: b
}) {
  var F;
  const [h, p] = V(a), m = n ?? h, f = Pe(() => new Set(m), [m]), [x, k] = V(l), g = i !== void 0 ? i : x, [z, $] = V(null), w = Q(/* @__PURE__ */ new Map()), N = Q(!1), T = Q({ buffer: "", timer: 0 }), v = Pe(() => {
    const _ = [], D = (q, S, O) => {
      for (const C of q) {
        const B = Array.isArray(C.children);
        _.push({ node: C, level: S, parentId: O, isBranch: B }), B && f.has(C.id) && D(C.children, S + 1, C.id);
      }
    };
    return D(e, 1, null), _;
  }, [e, f]), R = z && v.some((_) => _.node.id === z) && z || g && v.some((_) => _.node.id === g) && g || ((F = v[0]) == null ? void 0 : F.node.id) || null;
  G(() => {
    var _;
    !N.current || !z || (N.current = !1, (_ = w.current.get(z)) == null || _.focus());
  }, [z, v]), G(() => () => clearTimeout(T.current.timer), []);
  const E = (_) => {
    var D;
    _ && (N.current = !0, $(_), _ === z && ((D = w.current.get(_)) == null || D.focus()));
  }, W = pe(
    (_, D) => {
      if (f.has(_) === D) return;
      const S = D ? [...m, _] : m.filter((O) => O !== _);
      n === void 0 && p(S), s == null || s(S);
    },
    [f, m, n, s]
  ), J = (_) => {
    _.node.disabled || g !== _.node.id && (i === void 0 && k(_.node.id), c == null || c(_.node.id));
  }, oe = (_, D) => {
    const q = T.current;
    clearTimeout(q.timer), q.buffer += _.toLowerCase(), q.timer = setTimeout(() => {
      q.buffer = "";
    }, 500);
    const S = v.length, O = q.buffer.length === 1 ? D + 1 : D;
    for (let C = 0; C < S; C++) {
      const B = v[(O + C) % S];
      if (_a(B.node).toLowerCase().startsWith(q.buffer)) {
        E(B.node.id);
        return;
      }
    }
  }, K = (_, D) => {
    var O, C, B, X, U;
    if (_.target !== _.currentTarget) return;
    const q = v.findIndex((Y) => Y.node.id === D.node.id), S = f.has(D.node.id);
    switch (_.key) {
      case "ArrowDown":
        _.preventDefault(), E((O = v[q + 1]) == null ? void 0 : O.node.id);
        break;
      case "ArrowUp":
        _.preventDefault(), E((C = v[q - 1]) == null ? void 0 : C.node.id);
        break;
      case "ArrowRight":
        if (_.preventDefault(), !D.isBranch) break;
        S ? ((B = v[q + 1]) == null ? void 0 : B.parentId) === D.node.id && E(v[q + 1].node.id) : W(D.node.id, !0);
        break;
      case "ArrowLeft":
        _.preventDefault(), D.isBranch && S ? W(D.node.id, !1) : D.parentId && E(D.parentId);
        break;
      case "Home":
        _.preventDefault(), E((X = v[0]) == null ? void 0 : X.node.id);
        break;
      case "End":
        _.preventDefault(), E((U = v[v.length - 1]) == null ? void 0 : U.node.id);
        break;
      case "Enter":
        _.preventDefault(), J(D), D.node.disabled || d == null || d(D.node.id);
        break;
      case " ":
        _.preventDefault(), J(D);
        break;
      default:
        u && _.key.length === 1 && !_.ctrlKey && !_.metaKey && !_.altKey && /\S/.test(_.key) && (_.preventDefault(), oe(_.key, q));
    }
  }, te = (_, D, q) => _.map((S, O) => {
    const C = Array.isArray(S.children), B = C && f.has(S.id), X = g === S.id, U = { node: S, parentId: q, isBranch: C };
    return /* @__PURE__ */ y(
      "li",
      {
        ref: (Y) => {
          Y ? w.current.set(S.id, Y) : w.current.delete(S.id);
        },
        role: "treeitem",
        "aria-level": D,
        "aria-setsize": _.length,
        "aria-posinset": O + 1,
        "aria-expanded": C ? B : void 0,
        "aria-selected": X,
        "aria-disabled": S.disabled || void 0,
        tabIndex: R === S.id ? 0 : -1,
        onKeyDown: (Y) => K(Y, U),
        onFocus: (Y) => {
          Y.target === Y.currentTarget && $(S.id);
        },
        className: "focus:outline-none [&:focus-visible>div]:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]",
        children: [
          /* @__PURE__ */ y(
            "div",
            {
              style: { "--tree-level": D - 1 },
              onClick: (Y) => {
                Y.stopPropagation(), E(S.id), J(U), C && W(S.id, !B), !S.disabled && !C && (d == null || d(S.id));
              },
              className: I(
                Aa,
                X ? "bg-[var(--surface-muted)] text-[var(--accent)]" : "text-[var(--text-primary)] hover:bg-[var(--surface-muted)]",
                S.disabled && "cursor-not-allowed opacity-50"
              ),
              children: [
                /* @__PURE__ */ o("span", { className: "inline-flex w-4 shrink-0 justify-center text-[var(--text-secondary)]", children: C && /* @__PURE__ */ o(ee, { name: B ? "ChevronDown" : "ChevronRight", size: "3" }) }),
                S.icon && he(S.icon, { className: "shrink-0" }),
                /* @__PURE__ */ o("span", { className: "min-w-0 truncate", children: S.label })
              ]
            }
          ),
          C && B && S.children.length > 0 && /* @__PURE__ */ o("ul", { role: "group", children: te(S.children, D + 1, S.id) })
        ]
      },
      S.id
    );
  });
  return /* @__PURE__ */ o(
    "ul",
    {
      role: "tree",
      "aria-label": t,
      "aria-labelledby": r,
      className: I("font-mono text-sm", b),
      children: te(e, 1, null)
    }
  );
}
Ma.displayName = "TreeView";
const La = {
  sm: "h-5 min-w-5 px-1.5 text-xs",
  md: "h-6 min-w-6 px-2 text-sm"
};
function Xt({ size: e, children: t, className: r }) {
  return /* @__PURE__ */ o(
    "kbd",
    {
      className: I(
        "plate-round inline-flex bg-[var(--surface-container-stroke)] px-px pb-0.5 pt-px align-middle font-mono",
        r
      ),
      children: /* @__PURE__ */ o(
        "span",
        {
          className: I(
            "plate-round inline-flex items-center justify-center bg-[var(--surface-muted)] leading-none text-[var(--text-primary)]",
            La[e]
          ),
          children: t
        }
      )
    }
  );
}
function Ra({ keys: e, children: t, size: r = "sm", separator: n = "+", className: a }) {
  const s = de(r, "Kbd", "sm");
  return !e || e.length <= 1 ? /* @__PURE__ */ o(Xt, { size: s, className: a, children: (e == null ? void 0 : e[0]) ?? t }) : /* @__PURE__ */ o("kbd", { className: I("inline-flex items-center gap-1 align-middle font-mono", a), children: e.map((i, l) => /* @__PURE__ */ y(wt, { children: [
    l > 0 && /* @__PURE__ */ o("span", { className: I("text-[var(--text-secondary)]", s === "sm" ? "text-xs" : "text-sm"), children: n }),
    /* @__PURE__ */ o(Xt, { size: s, children: i })
  ] }, `${i}-${l}`)) });
}
Ra.displayName = "Kbd";
const Oa = {
  none: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8"
}, Da = re(function({ children: t, gap: r = "4", className: n, axis: a = "vertical", ...s }, i) {
  return /* @__PURE__ */ o(
    "div",
    {
      ref: i,
      className: I(
        "flex",
        a === "vertical" ? "flex-col" : "flex-row flex-wrap items-center",
        Oa[r],
        n
      ),
      ...s,
      children: t
    }
  );
});
Da.displayName = "Stack";
const Pa = {
  none: "p-0",
  1: "p-1",
  2: "p-2",
  3: "p-3",
  4: "p-4",
  5: "p-5",
  6: "p-6",
  8: "p-8"
}, Ba = {
  none: "px-0",
  1: "px-1",
  2: "px-2",
  3: "px-3",
  4: "px-4",
  5: "px-5",
  6: "px-6",
  8: "px-8"
}, ja = {
  none: "py-0",
  1: "py-1",
  2: "py-2",
  3: "py-3",
  4: "py-4",
  5: "py-5",
  6: "py-6",
  8: "py-8"
}, mt = {
  none: "",
  page: "bg-[var(--surface-page)]",
  container: "bg-[var(--surface-container)]",
  card: "bg-[var(--surface-card)]",
  subtle: "bg-[var(--surface-subtle)]",
  muted: "bg-[var(--surface-muted)]",
  raised: "bg-[var(--surface-raised)]",
  inverse: "bg-[var(--surface-inverse)] text-[var(--text-on-inverse)]"
}, Fa = re(function({
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
  const b = l, h = n !== void 0 || a !== void 0, p = n ?? r, m = a ?? r, f = h ? I(
    p !== void 0 && Ba[p],
    m !== void 0 && ja[m]
  ) : I(r !== void 0 && Pa[r]);
  if (i === "none")
    return /* @__PURE__ */ o(b, { ref: u, className: I(mt[s], f, c), ...d, children: t });
  const x = s === "none" ? mt.card : mt[s];
  return /* @__PURE__ */ o(
    b,
    {
      ref: u,
      className: I("plate-round bg-[var(--surface-container-stroke)] p-px", c),
      ...d,
      children: /* @__PURE__ */ o("div", { className: I("plate-round h-full w-full", x, f), children: t })
    }
  );
});
Fa.displayName = "Box";
const Va = {
  none: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8"
}, Ga = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  baseline: "items-baseline"
}, Ha = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between"
}, Ua = re(function({ children: t, gap: r = "2", align: n = "center", justify: a = "start", wrap: s = !0, className: i, ...l }, c) {
  return /* @__PURE__ */ o(
    "div",
    {
      ref: c,
      className: I(
        "flex flex-row",
        s ? "flex-wrap" : "flex-nowrap",
        Va[r],
        Ga[n],
        Ha[a],
        i
      ),
      ...l,
      children: t
    }
  );
});
Ua.displayName = "Inline";
const Wa = {
  none: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8"
}, Ka = {
  none: "gap-y-0",
  1: "gap-y-1",
  2: "gap-y-2",
  3: "gap-y-3",
  4: "gap-y-4",
  5: "gap-y-5",
  6: "gap-y-6",
  8: "gap-y-8"
}, qa = {
  none: "gap-x-0",
  1: "gap-x-1",
  2: "gap-x-2",
  3: "gap-x-3",
  4: "gap-x-4",
  5: "gap-x-5",
  6: "gap-x-6",
  8: "gap-x-8"
}, Yt = {
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
}, Xa = ["base", "sm", "md", "lg", "xl"], Ya = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch"
};
function Za(e) {
  return typeof e == "number" ? [Yt.base[e]] : Xa.flatMap((t) => {
    const r = e[t];
    return r === void 0 ? [] : [Yt[t][r]];
  });
}
const Qa = re(function({ children: t, columns: r = 1, gap: n = "4", rowGap: a, columnGap: s, align: i = "stretch", className: l, ...c }, d) {
  return /* @__PURE__ */ o(
    "div",
    {
      ref: d,
      className: I(
        "grid",
        Za(r),
        Wa[n],
        a !== void 0 && Ka[a],
        s !== void 0 && qa[s],
        Ya[i],
        l
      ),
      ...c,
      children: t
    }
  );
});
Qa.displayName = "Grid";
const Ja = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  full: "max-w-full"
}, es = re(function({ children: t, size: r = "lg", gutter: n = !0, as: a = "div", className: s, ...i }, l) {
  return /* @__PURE__ */ o(
    a,
    {
      ref: l,
      className: I("mx-auto w-full", Ja[r], n && "px-5 lg:px-10", s),
      ...i,
      children: t
    }
  );
});
es.displayName = "Container";
const ts = {
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  none: "max-w-none"
}, rs = re(function({ children: t, maxWidth: r = "md", andText: n = !1, fullHeight: a = !1, as: s = "div", className: i, ...l }, c) {
  return /* @__PURE__ */ o(
    s,
    {
      ref: c,
      className: I(
        "mx-auto w-full",
        ts[r],
        n && "text-center",
        a && "flex min-h-screen flex-col justify-center",
        i
      ),
      ...l,
      children: t
    }
  );
});
rs.displayName = "Center";
const ns = re(function({ children: t, focusable: r = !1, as: n = "span", className: a, ...s }, i) {
  return /* @__PURE__ */ o(
    n,
    {
      ref: i,
      className: I(
        "sr-only",
        r && "focus:not-sr-only focus-within:not-sr-only",
        a
      ),
      ...s,
      children: t
    }
  );
});
ns.displayName = "VisuallyHidden";
function Ss({ children: e, ...t }) {
  return /* @__PURE__ */ o(
    Ur,
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
  ys as Accordion,
  Ns as AccordionContent,
  ws as AccordionItem,
  ks as AccordionTrigger,
  us as Alert,
  xa as AppHeader,
  ro as Avatar,
  ds as Badge,
  gs as BottomSheet,
  Fa as Box,
  ca as Breadcrumbs,
  Xe as Button,
  cs as Card,
  No as CaseStudyContent,
  So as CaseStudyHeader,
  ps as CaseStudyPage,
  zo as CaseStudySections,
  rs as Center,
  uo as Checkbox,
  ea as Combobox,
  es as Container,
  Ia as DescriptionList,
  ms as Divider,
  fs as Dropdown,
  ia as EmptyState,
  Qa as Grid,
  Ua as Inline,
  Xn as Input,
  Ra as Kbd,
  ht as Link,
  Io as ListRow,
  Na as LogView,
  Ca as Meter,
  ls as Modal,
  ma as Pagination,
  Cr as Popover,
  aa as ProgressBar,
  po as Radio,
  co as Select,
  fa as SideNav,
  ga as SideNavItem,
  Or as SideNavSection,
  Ir as Skeleton,
  fo as Slider,
  br as Spinner,
  Da as Stack,
  $a as StatusLine,
  za as StatusLineSegment,
  xr as Switch,
  Hn as TUI_ICON_GLYPHS,
  Fo as Table,
  Go as TableBody,
  vt as TableCell,
  Ho as TableFooter,
  Uo as TableHead,
  Vo as TableHeader,
  xt as TableRow,
  vs as Tabs,
  Do as TabsContent,
  Ro as TabsList,
  Oo as TabsTrigger,
  bo as Textarea,
  Ss as ThemeProvider,
  xs as ThemeToggle,
  Co as Toast,
  hs as Toaster,
  lo as Tooltip,
  Ma as TreeView,
  ee as TuiIcon,
  ns as VisuallyHidden,
  va as Window,
  I as cn,
  Ta as getMeterTone,
  da as getPaginationRange,
  Mo as toast,
  bs as useToast
};
//# sourceMappingURL=index.esm.js.map

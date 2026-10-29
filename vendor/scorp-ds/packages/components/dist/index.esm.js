import { jsxs as N, jsx as o, Fragment as xe } from "react/jsx-runtime";
import $e, { useState as G, useEffect as H, forwardRef as re, useId as ce, useRef as q, useCallback as ue, useMemo as Pe, useLayoutEffect as Ae, isValidElement as We, cloneElement as gt, useImperativeHandle as Pr, Fragment as xt, Children as Kt, useSyncExternalStore as qt, createContext as De, useContext as Ie } from "react";
import { useTheme as Dr, ThemeProvider as jr } from "next-themes";
import { createPortal as Br } from "react-dom";
function Xt(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var a = e.length;
    for (t = 0; t < a; t++) e[t] && (r = Xt(e[t])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function Fr() {
  for (var e, t, r = 0, n = "", a = arguments.length; r < a; r++) (e = arguments[r]) && (t = Xt(e)) && (n && (n += " "), n += t);
  return n;
}
const Vr = (e, t) => {
  const r = new Array(e.length + t.length);
  for (let n = 0; n < e.length; n++)
    r[n] = e[n];
  for (let n = 0; n < t.length; n++)
    r[e.length + n] = t[n];
  return r;
}, Gr = (e, t) => ({
  classGroupId: e,
  validator: t
}), Yt = (e = /* @__PURE__ */ new Map(), t = null, r) => ({
  nextPart: e,
  validators: t,
  classGroupId: r
}), Je = "-", _t = [], Hr = "arbitrary..", Wr = (e) => {
  const t = Kr(e), {
    conflictingClassGroups: r,
    conflictingClassGroupModifiers: n
  } = e;
  return {
    getClassGroupId: (i) => {
      if (i.startsWith("[") && i.endsWith("]"))
        return Ur(i);
      const l = i.split(Je), d = l[0] === "" && l.length > 1 ? 1 : 0;
      return Zt(l, d, t);
    },
    getConflictingClassGroupIds: (i, l) => {
      if (l) {
        const d = n[i], c = r[i];
        return d ? c ? Vr(c, d) : d : c || _t;
      }
      return r[i] || _t;
    }
  };
}, Zt = (e, t, r) => {
  if (e.length - t === 0)
    return r.classGroupId;
  const a = e[t], s = r.nextPart.get(a);
  if (s) {
    const c = Zt(e, t + 1, s);
    if (c) return c;
  }
  const i = r.validators;
  if (i === null)
    return;
  const l = t === 0 ? e.join(Je) : e.slice(t).join(Je), d = i.length;
  for (let c = 0; c < d; c++) {
    const m = i[c];
    if (m.validator(l))
      return m.classGroupId;
  }
}, Ur = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const t = e.slice(1, -1), r = t.indexOf(":"), n = t.slice(0, r);
  return n ? Hr + n : void 0;
})(), Kr = (e) => {
  const {
    theme: t,
    classGroups: r
  } = e;
  return qr(r, t);
}, qr = (e, t) => {
  const r = Yt();
  for (const n in e) {
    const a = e[n];
    vt(a, r, n, t);
  }
  return r;
}, vt = (e, t, r, n) => {
  const a = e.length;
  for (let s = 0; s < a; s++) {
    const i = e[s];
    Xr(i, t, r, n);
  }
}, Xr = (e, t, r, n) => {
  if (typeof e == "string") {
    Yr(e, t, r);
    return;
  }
  if (typeof e == "function") {
    Zr(e, t, r, n);
    return;
  }
  Qr(e, t, r, n);
}, Yr = (e, t, r) => {
  const n = e === "" ? t : Qt(t, e);
  n.classGroupId = r;
}, Zr = (e, t, r, n) => {
  if (Jr(e)) {
    vt(e(n), t, r, n);
    return;
  }
  t.validators === null && (t.validators = []), t.validators.push(Gr(r, e));
}, Qr = (e, t, r, n) => {
  const a = Object.entries(e), s = a.length;
  for (let i = 0; i < s; i++) {
    const [l, d] = a[i];
    vt(d, Qt(t, l), r, n);
  }
}, Qt = (e, t) => {
  let r = e;
  const n = t.split(Je), a = n.length;
  for (let s = 0; s < a; s++) {
    const i = n[s];
    let l = r.nextPart.get(i);
    l || (l = Yt(), r.nextPart.set(i, l)), r = l;
  }
  return r;
}, Jr = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, en = (e) => {
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
}, dt = "!", At = ":", tn = [], zt = (e, t, r, n, a) => ({
  modifiers: e,
  hasImportantModifier: t,
  baseClassName: r,
  maybePostfixModifierPosition: n,
  isExternal: a
}), rn = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: r
  } = e;
  let n = (a) => {
    const s = [];
    let i = 0, l = 0, d = 0, c;
    const m = a.length;
    for (let f = 0; f < m; f++) {
      const g = a[f];
      if (i === 0 && l === 0) {
        if (g === At) {
          s.push(a.slice(d, f)), d = f + 1;
          continue;
        }
        if (g === "/") {
          c = f;
          continue;
        }
      }
      g === "[" ? i++ : g === "]" ? i-- : g === "(" ? l++ : g === ")" && l--;
    }
    const u = s.length === 0 ? a : a.slice(d);
    let p = u, b = !1;
    u.endsWith(dt) ? (p = u.slice(0, -1), b = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      u.startsWith(dt) && (p = u.slice(1), b = !0)
    );
    const h = c && c > d ? c - d : void 0;
    return zt(s, b, p, h);
  };
  if (t) {
    const a = t + At, s = n;
    n = (i) => i.startsWith(a) ? s(i.slice(a.length)) : zt(tn, !1, i, void 0, !0);
  }
  if (r) {
    const a = n;
    n = (s) => r({
      className: s,
      parseClassName: a
    });
  }
  return n;
}, nn = (e) => {
  const t = /* @__PURE__ */ new Map();
  return e.orderSensitiveModifiers.forEach((r, n) => {
    t.set(r, 1e6 + n);
  }), (r) => {
    const n = [];
    let a = [];
    for (let s = 0; s < r.length; s++) {
      const i = r[s], l = i[0] === "[", d = t.has(i);
      l || d ? (a.length > 0 && (a.sort(), n.push(...a), a = []), n.push(i)) : a.push(i);
    }
    return a.length > 0 && (a.sort(), n.push(...a)), n;
  };
}, on = (e) => ({
  cache: en(e.cacheSize),
  parseClassName: rn(e),
  sortModifiers: nn(e),
  postfixLookupClassGroupIds: an(e),
  ...Wr(e)
}), an = (e) => {
  const t = /* @__PURE__ */ Object.create(null), r = e.postfixLookupClassGroups;
  if (r)
    for (let n = 0; n < r.length; n++)
      t[r[n]] = !0;
  return t;
}, sn = /\s+/, ln = (e, t) => {
  const {
    parseClassName: r,
    getClassGroupId: n,
    getConflictingClassGroupIds: a,
    sortModifiers: s,
    postfixLookupClassGroupIds: i
  } = t, l = [], d = e.trim().split(sn);
  let c = "";
  for (let m = d.length - 1; m >= 0; m -= 1) {
    const u = d[m], {
      isExternal: p,
      modifiers: b,
      hasImportantModifier: h,
      baseClassName: f,
      maybePostfixModifierPosition: g
    } = r(u);
    if (p) {
      c = u + (c.length > 0 ? " " + c : c);
      continue;
    }
    let k = !!g, x;
    if (k) {
      const z = f.substring(0, g);
      x = n(z);
      const v = x && i[x] ? n(f) : void 0;
      v && v !== x && (x = v, k = !1);
    } else
      x = n(f);
    if (!x) {
      if (!k) {
        c = u + (c.length > 0 ? " " + c : c);
        continue;
      }
      if (x = n(f), !x) {
        c = u + (c.length > 0 ? " " + c : c);
        continue;
      }
      k = !1;
    }
    const w = b.length === 0 ? "" : b.length === 1 ? b[0] : s(b).join(":"), $ = h ? w + dt : w, I = $ + x;
    if (l.indexOf(I) > -1)
      continue;
    l.push(I);
    const E = a(x, k);
    for (let z = 0; z < E.length; ++z) {
      const v = E[z];
      l.push($ + v);
    }
    c = u + (c.length > 0 ? " " + c : c);
  }
  return c;
}, cn = (...e) => {
  let t = 0, r, n, a = "";
  for (; t < e.length; )
    (r = e[t++]) && (n = Jt(r)) && (a && (a += " "), a += n);
  return a;
}, Jt = (e) => {
  if (typeof e == "string")
    return e;
  let t, r = "";
  for (let n = 0; n < e.length; n++)
    e[n] && (t = Jt(e[n])) && (r && (r += " "), r += t);
  return r;
}, dn = (e, ...t) => {
  let r, n, a, s;
  const i = (d) => {
    const c = t.reduce((m, u) => u(m), e());
    return r = on(c), n = r.cache.get, a = r.cache.set, s = l, l(d);
  }, l = (d) => {
    const c = n(d);
    if (c)
      return c;
    const m = ln(d, r);
    return a(d, m), m;
  };
  return s = i, (...d) => s(cn(...d));
}, un = [], le = (e) => {
  const t = (r) => r[e] || un;
  return t.isThemeGetter = !0, t.themeKey = e, t;
}, er = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, tr = /^\((?:(\w[\w-]*):)?(.+)\)$/i, mn = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, fn = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, pn = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, bn = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix|color|light-dark)\(.+\)$/, hn = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, gn = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Ne = (e) => mn.test(e), W = (e) => !!e && !Number.isNaN(Number(e)), ge = (e) => !!e && Number.isInteger(Number(e)), nt = (e) => e.endsWith("%") && W(e.slice(0, -1)), we = (e) => fn.test(e), rr = () => !0, xn = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  pn.test(e) && !bn.test(e)
), yt = () => !1, vn = (e) => hn.test(e), yn = (e) => gn.test(e), wn = (e) => !M(e) && !R(e), kn = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), Nn = (e) => Ce(e, ar, yt), M = (e) => er.test(e), Ee = (e) => Ce(e, sr, xn), Mt = (e) => Ce(e, An, W), $n = (e) => Ce(e, lr, rr), Sn = (e) => Ce(e, ir, yt), Rt = (e) => Ce(e, nr, yt), In = (e) => Ce(e, or, yn), Xe = (e) => Ce(e, cr, vn), R = (e) => tr.test(e), Be = (e) => ze(e, sr), Cn = (e) => ze(e, ir), Lt = (e) => ze(e, nr), Tn = (e) => ze(e, ar), En = (e) => ze(e, or), Ye = (e) => ze(e, cr, !0), _n = (e) => ze(e, lr, !0), Ce = (e, t, r) => {
  const n = er.exec(e);
  return n ? n[1] ? t(n[1]) : r(n[2]) : !1;
}, ze = (e, t, r = !1) => {
  const n = tr.exec(e);
  return n ? n[1] ? t(n[1]) : r : !1;
}, nr = (e) => e === "position" || e === "percentage", or = (e) => e === "image" || e === "url", ar = (e) => e === "length" || e === "size" || e === "bg-size", sr = (e) => e === "length", An = (e) => e === "number", ir = (e) => e === "family-name", lr = (e) => e === "number" || e === "weight", cr = (e) => e === "shadow", zn = () => {
  const e = le("color"), t = le("font"), r = le("text"), n = le("font-weight"), a = le("tracking"), s = le("leading"), i = le("breakpoint"), l = le("container"), d = le("spacing"), c = le("radius"), m = le("shadow"), u = le("inset-shadow"), p = le("text-shadow"), b = le("drop-shadow"), h = le("blur"), f = le("perspective"), g = le("aspect"), k = le("ease"), x = le("animate"), w = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], $ = () => [
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
  ], I = () => [...$(), R, M], E = () => ["auto", "hidden", "clip", "visible", "scroll"], z = () => ["auto", "contain", "none"], v = () => [R, M, d], T = () => [Ne, "full", "auto", ...v()], O = () => [ge, "none", "subgrid", R, M], U = () => ["auto", {
    span: ["full", ge, R, M]
  }, ge, R, M], Y = () => [ge, "auto", R, M], te = () => ["auto", "min", "max", "fr", R, M], D = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], Z = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], ne = () => ["auto", ...v()], oe = () => [Ne, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...v()], ie = () => [l, Ne, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...v()], C = () => [Ne, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...v()], y = () => [e, R, M], P = () => [...$(), Lt, Rt, {
    position: [R, M]
  }], _ = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], j = () => ["auto", "cover", "contain", Tn, Nn, {
    size: [R, M]
  }], L = () => [nt, Be, Ee], V = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    c,
    R,
    M
  ], K = () => ["", W, Be, Ee], ee = () => ["solid", "dashed", "dotted", "double"], X = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], J = () => [W, nt, Lt, Rt], ve = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    h,
    R,
    M
  ], me = () => ["none", W, R, M], B = () => ["none", W, R, M], F = () => [W, R, M], se = () => [Ne, "full", ...v()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [we],
      breakpoint: [we],
      color: [rr],
      container: [we],
      "drop-shadow": [we],
      ease: ["in", "out", "in-out"],
      font: [wn],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [we],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [we],
      shadow: [we],
      spacing: ["px", W],
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
        aspect: ["auto", "square", Ne, M, R, g]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Container Type
       * @see https://tailwindcss.com/docs/responsive-design#container-queries
       */
      "container-type": [{
        "@container": ["", "normal", "size", R, M]
      }],
      /**
       * Container Name
       * @see https://tailwindcss.com/docs/responsive-design#named-containers
       */
      "container-named": [kn],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [W, "auto", M, R, l]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": w()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": w()
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
        object: I()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: E()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": E()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": E()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: z()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": z()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": z()
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
        inset: T()
      }],
      /**
       * Inset Inline
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": T()
      }],
      /**
       * Inset Block
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": T()
      }],
      /**
       * Inset Inline Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-s` in next major release
       */
      start: [{
        "inset-s": T(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        start: T()
      }],
      /**
       * Inset Inline End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-e` in next major release
       */
      end: [{
        "inset-e": T(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        end: T()
      }],
      /**
       * Inset Block Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-bs": [{
        "inset-bs": T()
      }],
      /**
       * Inset Block End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-be": [{
        "inset-be": T()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: T()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: T()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: T()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: T()
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
        z: [ge, "auto", R, M]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [Ne, "full", "auto", l, ...v()]
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
        flex: [W, Ne, "auto", "initial", "none", M]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", W, R, M]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", W, R, M]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [ge, "first", "last", "none", R, M]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": O()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: U()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": Y()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": Y()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": O()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: U()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": Y()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": Y()
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
        "auto-cols": te()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": te()
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
        justify: [...D(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...Z(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...Z()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...D()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...Z(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...Z(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": D()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...Z(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...Z()]
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
        m: ne()
      }],
      /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: ne()
      }],
      /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: ne()
      }],
      /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: ne()
      }],
      /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: ne()
      }],
      /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */
      mbs: [{
        mbs: ne()
      }],
      /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */
      mbe: [{
        mbe: ne()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: ne()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: ne()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: ne()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: ne()
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
        size: oe()
      }],
      /**
       * Inline Size
       * @see https://tailwindcss.com/docs/inline-size
       */
      "inline-size": [{
        inline: ["auto", ...ie()]
      }],
      /**
       * Min-Inline Size
       * @see https://tailwindcss.com/docs/min-inline-size
       */
      "min-inline-size": [{
        "min-inline": ["auto", ...ie()]
      }],
      /**
       * Max-Inline Size
       * @see https://tailwindcss.com/docs/max-inline-size
       */
      "max-inline-size": [{
        "max-inline": ["none", ...ie()]
      }],
      /**
       * Block Size
       * @see https://tailwindcss.com/docs/block-size
       */
      "block-size": [{
        block: ["auto", ...C()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-block-size
       */
      "min-block-size": [{
        "min-block": ["auto", ...C()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-block-size
       */
      "max-block-size": [{
        "max-block": ["none", ...C()]
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [l, "screen", ...oe()]
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
          ...oe()
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
          ...oe()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...oe()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...oe()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", "none", ...oe()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", r, Be, Ee]
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
        font: [n, _n, $n]
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
        font: [Cn, Sn, t]
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
        "line-clamp": [W, "none", R, Mt]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          "none",
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
        placeholder: y()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: y()
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
        decoration: [...ee(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [W, "from-font", "auto", R, Ee]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: y()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [W, "auto", R, M]
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
       * Tab Size
       * @see https://tailwindcss.com/docs/tab-size
       */
      "tab-size": [{
        tab: [ge, R, M]
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
        bg: P()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: _()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: j()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, ge, R, M],
          radial: ["", R, M],
          conic: ["", ge, R, M]
        }, En, In]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: y()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: L()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: L()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: L()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: y()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: y()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: y()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: V()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": V()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": V()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": V()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": V()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": V()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": V()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": V()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": V()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": V()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": V()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": V()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": V()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": V()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": V()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: K()
      }],
      /**
       * Border Width Inline
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": K()
      }],
      /**
       * Border Width Block
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": K()
      }],
      /**
       * Border Width Inline Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": K()
      }],
      /**
       * Border Width Inline End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": K()
      }],
      /**
       * Border Width Block Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-bs": [{
        "border-bs": K()
      }],
      /**
       * Border Width Block End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-be": [{
        "border-be": K()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": K()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": K()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": K()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": K()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": K()
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
        "divide-y": K()
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
        border: [...ee(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...ee(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: y()
      }],
      /**
       * Border Color Inline
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": y()
      }],
      /**
       * Border Color Block
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": y()
      }],
      /**
       * Border Color Inline Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": y()
      }],
      /**
       * Border Color Inline End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": y()
      }],
      /**
       * Border Color Block Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-bs": [{
        "border-bs": y()
      }],
      /**
       * Border Color Block End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-be": [{
        "border-be": y()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": y()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": y()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": y()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": y()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: y()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...ee(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [W, R, M]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", W, Be, Ee]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: y()
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
          // Deprecated since Tailwind CSS v4.0.0
          "inner",
          "none",
          m,
          Ye,
          Xe
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: y()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", u, Ye, Xe]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": y()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: K()
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
        ring: y()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [W, Ee]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": y()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": K()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": y()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", p, Ye, Xe]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": y()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [W, R, M]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...X(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": X()
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
        "mask-linear": [W]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": J()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": J()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": y()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": y()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": J()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": J()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": y()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": y()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": J()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": J()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": y()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": y()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": J()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": J()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": y()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": y()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": J()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": J()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": y()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": y()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": J()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": J()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": y()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": y()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": J()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": J()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": y()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": y()
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
        "mask-radial-from": y()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": y()
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
        "mask-conic": [W]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": J()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": J()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": y()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": y()
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
        mask: P()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: _()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: j()
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
        blur: ve()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [W, R, M]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [W, R, M]
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
          Ye,
          Xe
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": y()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", W, R, M]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [W, R, M]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", W, R, M]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [W, R, M]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", W, R, M]
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
        "backdrop-blur": ve()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [W, R, M]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [W, R, M]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", W, R, M]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [W, R, M]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", W, R, M]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [W, R, M]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [W, R, M]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", W, R, M]
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
        duration: [W, "initial", R, M]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", k, R, M]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [W, R, M]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", x, R, M]
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
        perspective: [f, R, M]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": I()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: me()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": me()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": me()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": me()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: B()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": B()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": B()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": B()
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
        skew: F()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": F()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": F()
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
        origin: I()
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
        translate: se()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": se()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": se()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": se()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      /**
       * Zoom
       * @see https://tailwindcss.com/docs/zoom
       */
      zoom: [{
        zoom: [ge, R, M]
      }],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: y()
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
        caret: y()
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
       * Scrollbar Thumb Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-thumb-color": [{
        "scrollbar-thumb": y()
      }],
      /**
       * Scrollbar Track Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-track-color": [{
        "scrollbar-track": y()
      }],
      /**
       * Scrollbar Gutter
       * @see https://tailwindcss.com/docs/scrollbar-gutter
       */
      "scrollbar-gutter": [{
        "scrollbar-gutter": ["auto", "stable", "both"]
      }],
      /**
       * Scrollbar Width
       * @see https://tailwindcss.com/docs/scrollbar-width
       */
      "scrollbar-w": [{
        scrollbar: ["auto", "thin", "none"]
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
        fill: ["none", ...y()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [W, Be, Ee, Mt]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...y()]
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
      "container-named": ["container-type"],
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "inset-bs", "inset-be", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["start", "end", "right", "left"],
      "inset-y": ["inset-bs", "inset-be", "top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pbs", "pbe", "pt", "pr", "pb", "pl"],
      px: ["ps", "pe", "pr", "pl"],
      py: ["pbs", "pbe", "pt", "pb"],
      m: ["mx", "my", "ms", "me", "mbs", "mbe", "mt", "mr", "mb", "ml"],
      mx: ["ms", "me", "mr", "ml"],
      my: ["mbs", "mbe", "mt", "mb"],
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
      "border-w-x": ["border-w-s", "border-w-e", "border-w-r", "border-w-l"],
      "border-w-y": ["border-w-bs", "border-w-be", "border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-bs", "border-color-be", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-s", "border-color-e", "border-color-r", "border-color-l"],
      "border-color-y": ["border-color-bs", "border-color-be", "border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mbs", "scroll-mbe", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-ms", "scroll-me", "scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mbs", "scroll-mbe", "scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pbs", "scroll-pbe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-ps", "scroll-pe", "scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pbs", "scroll-pbe", "scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    postfixLookupClassGroups: ["container-type"],
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
}, Mn = /* @__PURE__ */ dn(zn);
function S(...e) {
  return Mn(Fr(e));
}
const Ve = [
  [0, 0],
  [3, 0],
  [6, 0],
  [6, 3],
  [6, 6],
  [3, 6],
  [0, 6],
  [0, 3]
], Rn = 2, Ln = 100, Ot = "(prefers-reduced-motion: reduce)";
function dr(e) {
  return Ve.filter((t, r) => e === null || (r - e + Ve.length) % Ve.length >= Rn).map(([t, r]) => `M${t} ${r}h2v2h-2Z`).join("");
}
const On = Ve.map((e, t) => dr(t)), Pn = dr(null);
function Dn() {
  const [e, t] = G(
    () => typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia(Ot).matches
  );
  return H(() => {
    var a;
    if (typeof window > "u" || typeof window.matchMedia != "function") return;
    const r = window.matchMedia(Ot), n = () => t(r.matches);
    return n(), (a = r.addEventListener) == null || a.call(r, "change", n), () => {
      var s;
      return (s = r.removeEventListener) == null ? void 0 : s.call(r, "change", n);
    };
  }, []), e;
}
function ur({ size: e = "md", label: t = "Loading", className: r }) {
  const n = Dn(), [a, s] = G(0);
  H(() => {
    if (n) return;
    const c = setInterval(() => s((m) => (m + 1) % Ve.length), Ln);
    return () => clearInterval(c);
  }, [n]);
  const i = {
    sm: { box: "w-3 h-3", pixel: 1.5 },
    md: { box: "w-4 h-4", pixel: 2 },
    lg: { box: "w-6 h-6", pixel: 3 }
  }, { box: l, pixel: d } = i[e];
  return /* @__PURE__ */ N("span", { role: "status", className: S("inline-flex shrink-0 items-center justify-center", l, r), children: [
    /* @__PURE__ */ o(
      "svg",
      {
        "aria-hidden": "true",
        viewBox: "0 0 8 8",
        width: 8 * d,
        height: 8 * d,
        fill: "currentColor",
        shapeRendering: "crispEdges",
        "data-spinner-frame": n ? "static" : a,
        children: /* @__PURE__ */ o("path", { d: n ? Pn : On[a] })
      }
    ),
    /* @__PURE__ */ o("span", { className: "sr-only", children: t })
  ] });
}
ur.displayName = "Spinner";
const jn = {
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
}, Bn = {
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
function Fn(e) {
  let t = "";
  return e.forEach((r, n) => {
    for (const a of r.matchAll(/#+/g))
      t += `M${a.index} ${n}h${a[0].length}v1h-${a[0].length}Z`;
  }), t;
}
const Vn = Object.fromEntries(
  Object.entries(Bn).map(([e, t]) => [e, Fn(t)])
), Pt = {
  3: { box: "w-3 h-3 text-xs", pixel: 1.5 },
  4: { box: "w-4 h-4 text-sm", pixel: 2 },
  5: { box: "w-5 h-5 text-base", pixel: 2 },
  6: { box: "w-6 h-6 text-lg", pixel: 3 },
  8: { box: "w-8 h-8 text-2xl", pixel: 4 }
}, Q = ({
  name: e,
  size: t = "4",
  className: r
}) => {
  const n = Vn[e], { box: a, pixel: s } = Pt[t] ?? Pt[4];
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
};
function Gn(e) {
  return typeof e == "string" && Object.prototype.hasOwnProperty.call(jn, e);
}
function pe(e, t = {}) {
  return Gn(e) ? /* @__PURE__ */ o(Q, { name: e, ...t }) : e;
}
const Ue = re(
  ({
    variant: e = "primary",
    size: t = "md",
    disabled: r = !1,
    className: n = "",
    children: a,
    iconLeft: s,
    iconRight: i,
    href: l,
    target: d,
    rel: c,
    loading: m = !1,
    onClick: u,
    "aria-label": p,
    "aria-labelledby": b,
    ...h
  }, f) => {
    const g = `
      inline-flex items-center justify-center
      font-mono text-sm
      transition-colors [transition-duration:var(--duration-fast)]
      cursor-pointer
      disabled:cursor-not-allowed disabled:opacity-50
      focus:outline-none
      focus-visible:![box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--btn-ring)]
    `, k = () => e === "icon" ? !0 : !a || typeof a == "string" || typeof a == "number" ? !1 : typeof a == "object" && a !== null && "type" in a ? typeof a.type < "u" : Array.isArray(a) ? a.every(
      (D) => typeof D == "object" && D !== null && "type" in D
    ) : !1;
    H(() => {
      if (process.env.NODE_ENV === "production" || !(e === "icon" || k())) return;
      p != null && String(p).trim() !== "" || b != null && String(b).trim() !== "" || console.warn(
        "[@scorp-ds/components] Button: icon-only buttons should include aria-label or aria-labelledby for screen readers."
      );
    }, [e, t, a, s, i, p, b]);
    const x = () => {
      if (k() || e === "icon")
        switch (t) {
          case "sm":
            return "size-control-sm plate-round";
          case "lg":
            return "size-control-lg plate-round";
          default:
            return "size-control-md plate-round";
        }
      switch (t) {
        case "sm":
          return "h-control-sm px-4 py-1.5 plate-round";
        case "lg":
          return "h-control-lg px-6 py-3.5 plate-round";
        default:
          return "h-control-md px-5 py-2.5 plate-round";
      }
    }, w = {
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
    }, $ = {
      sm: "w-4 h-4",
      // 16px
      md: "w-5 h-5",
      // 20px
      lg: "w-6 h-6"
      // 24px
    }, I = {
      sm: "gap-1.5",
      // 6px - tighter for visual balance in compact buttons
      md: "gap-2",
      // 8px - standard spacing
      lg: "gap-2.5"
      // 10px - more breathing room for larger buttons
    }, E = (D) => {
      if (!D) return null;
      const Z = pe(D);
      return typeof Z == "object" && Z !== null && "type" in Z ? /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center shrink-0 ${$[t]}`, children: Z }) : Z;
    }, z = () => k() && a ? typeof a == "object" && a !== null && "type" in a ? /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center shrink-0 ${$[t]}`, children: a }) : /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center shrink-0 ${$[t]}`, children: a }) : a, v = {
      "--btn-ring": e === "primary" || e === "link" ? "var(--focus-ring-primary)" : e === "destructive" ? "var(--focus-ring-destructive)" : e === "icon" ? "var(--focus-ring-icon)" : "var(--focus-ring-secondary)",
      outline: "none"
    }, T = m && !r, O = (D) => {
      if (T) {
        D.preventDefault();
        return;
      }
      u == null || u(D);
    }, U = T ? "relative cursor-progress" : "", Y = /* @__PURE__ */ N(xe, { children: [
      s && E(s),
      z(),
      i && E(i)
    ] }), te = T ? /* @__PURE__ */ N(xe, { children: [
      /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center opacity-0 ${I[t]}`, children: Y }),
      /* @__PURE__ */ o("span", { "aria-hidden": "true", className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ o(ur, { size: t }) })
    ] }) : Y;
    return l ? /* @__PURE__ */ o(
      "a",
      {
        ref: f,
        href: r ? void 0 : l,
        target: d,
        rel: c,
        "aria-disabled": r || T || void 0,
        "aria-busy": T || void 0,
        className: `${g} ${x()} ${w[e]} ${I[t]} ${U} no-underline ${r ? "pointer-events-none opacity-50" : ""} ${n}`,
        style: v,
        "aria-label": p,
        "aria-labelledby": b,
        onClick: O,
        ...h,
        children: te
      }
    ) : /* @__PURE__ */ o(
      "button",
      {
        ref: f,
        disabled: r,
        className: `${g} ${x()} ${w[e]} ${I[t]} ${U} ${n}`,
        style: v,
        "aria-label": p,
        "aria-labelledby": b,
        "aria-disabled": T || void 0,
        "aria-busy": T || void 0,
        onClick: O,
        ...h,
        children: te
      }
    );
  }
);
Ue.displayName = "Button";
const Dt = (e) => e != null && e !== !1 && e !== "";
function Me({ error: e, helperText: t, errorMessage: r, describedBy: n }) {
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
function Se({
  id: e,
  tone: t,
  children: r,
  className: n = ""
}) {
  return e == null ? null : /* @__PURE__ */ N(
    "p",
    {
      id: e,
      className: `flex items-start gap-1.5 font-mono text-xs ${t === "error" ? "text-error-700 dark:text-error-400" : "text-[var(--text-secondary)]"} ${n}`,
      children: [
        t === "error" && /* @__PURE__ */ o("span", { className: "flex h-[1lh] shrink-0 items-center", children: /* @__PURE__ */ o(Q, { name: "AlertCircle", size: "3" }) }),
        /* @__PURE__ */ o("span", { children: r })
      ]
    }
  );
}
const Hn = re(
  ({
    size: e = "md",
    variant: t = "box",
    error: r = !1,
    helperText: n,
    errorMessage: a,
    disabled: s = !1,
    className: i = "",
    label: l,
    id: d,
    "aria-describedby": c,
    ...m
  }, u) => {
    const p = Me({ error: r, helperText: n, errorMessage: a, describedBy: c }), b = p.invalid, h = ce(), f = d ?? (l != null && l !== "" ? h : void 0), g = `
      w-full
      font-mono text-sm
      transition-colors [transition-duration:var(--duration-fast)]
      placeholder:text-[var(--field-placeholder)]
      disabled:cursor-not-allowed
      focus:outline-none
    `, k = {
      sm: "h-control-sm px-3 py-1.5 plate-round",
      md: "h-control-md px-4 py-2.5 plate-round",
      lg: "h-control-lg px-5 py-3.5 plate-round"
    }, x = b ? "bg-[var(--field-background-error)] text-[var(--text-primary)]" : "bg-[var(--field-background)] text-[var(--text-primary)]", w = b ? "bg-[var(--field-border-error)] focus-within:!bg-[var(--field-border-focus)]" : "bg-[var(--field-border)] hover:bg-[var(--field-border-hover)] focus-within:!bg-[var(--field-border-focus)]", $ = b ? "border-b border-[var(--field-border-error)] focus:!border-[var(--field-border-focus)]" : "border-b border-[var(--field-border)] hover:border-[var(--field-border-hover)] focus:!border-[var(--field-border-focus)]", I = t === "quiet" ? /* @__PURE__ */ o(
      "input",
      {
        ref: u,
        id: f,
        disabled: s,
        "aria-invalid": b || void 0,
        "aria-describedby": p.describedBy,
        className: `${g} ${k[e].replace("plate-round", "rounded-none")} !px-0 bg-transparent text-[var(--text-primary)] disabled:opacity-50 ${$} ${i}`,
        ...m
      }
    ) : (
      // DISABLED: the opacity lives on the ring wrapper so the border dims
      // with the fill; applying it to the input alone left a full-strength ring.
      /* @__PURE__ */ o(
        "div",
        {
          className: `w-full plate-round p-px transition-colors [transition-duration:var(--duration-fast)] ${w} ${s ? "opacity-50" : ""}`,
          children: /* @__PURE__ */ o(
            "input",
            {
              ref: u,
              id: f,
              disabled: s,
              "aria-invalid": b || void 0,
              "aria-describedby": p.describedBy,
              className: `${g} ${k[e]} ${x} ${i}`,
              ...m
            }
          )
        }
      )
    ), E = l != null && l !== "";
    return !E && !p.hasMessage ? I : /* @__PURE__ */ N("div", { className: "w-full space-y-1", children: [
      E && /* @__PURE__ */ o(
        "label",
        {
          htmlFor: f,
          className: "block font-mono text-sm text-secondary-800 dark:text-secondary-200",
          children: l
        }
      ),
      I,
      /* @__PURE__ */ o(Se, { ...p.message })
    ] });
  }
);
Hn.displayName = "Input";
const Wn = [
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
function Un(e) {
  return Array.from(e.querySelectorAll(Wn)).filter(
    (t) => !t.hasAttribute("hidden") && t.closest("[hidden]") == null && t.getAttribute("aria-hidden") !== "true"
  );
}
function mr(e, t) {
  H(() => {
    if (!t) return;
    const r = (n) => {
      if (n.key !== "Tab" || n.defaultPrevented) return;
      const a = e.current;
      if (!a) return;
      const s = Un(a), i = document.activeElement;
      if (s.length === 0) {
        n.preventDefault(), a.focus();
        return;
      }
      const l = s[0], d = s[s.length - 1];
      if (!i || !a.contains(i)) {
        n.preventDefault(), (n.shiftKey ? d : l).focus();
        return;
      }
      if (n.shiftKey && (i === l || i === a)) {
        n.preventDefault(), d.focus();
        return;
      }
      !n.shiftKey && i === d && (n.preventDefault(), l.focus());
    };
    return document.addEventListener("keydown", r, !0), () => document.removeEventListener("keydown", r, !0);
  }, [e, t]);
}
function je({
  value: e,
  defaultValue: t,
  onChange: r
}) {
  const [n, a] = G(t), s = e !== void 0, i = s ? e : n, l = q(r);
  l.current = r;
  const d = q(i);
  d.current = i;
  const c = ue(
    (m) => {
      var u;
      Object.is(m, d.current) || (s || a(m), (u = l.current) == null || u.call(l, m));
    },
    [s]
  );
  return [i, c];
}
const jt = /* @__PURE__ */ new Set();
function Kn(e, t, r) {
  if (process.env.NODE_ENV === "production") return;
  const n = `${e}:${t}`;
  jt.has(n) || (jt.add(n), console.warn(`[@scorp-ds/components] ${e}: ${t} is deprecated. Use ${r}.`));
}
const qn = 960;
function Xn() {
  let e = qn;
  if (typeof document < "u") {
    const t = getComputedStyle(document.documentElement).getPropertyValue("--breakpoint-docked"), r = Number.parseFloat(t);
    Number.isFinite(r) && r > 0 && (e = r);
  }
  return `(min-width: ${e}px)`;
}
const Yn = { sm: "360px", md: "640px", lg: "740px", full: "100vw" };
function ms({
  open: e,
  defaultOpen: t = !1,
  onOpenChange: r,
  title: n,
  children: a,
  footerContent: s,
  size: i,
  width: l,
  docked: d = !1
}) {
  l !== void 0 && Kn("Modal", "width", "size");
  const [c, m] = je({
    value: e,
    defaultValue: t,
    onChange: r
  }), u = ue(() => {
    c && m(!1);
  }, [c, m]), p = i !== void 0 || l === void 0 ? Yn[i ?? "lg"] : typeof l == "number" ? `${l}px` : l, b = q(null), h = q(null), [f, g] = G(c);
  H(() => {
    c && g(!0);
  }, [c]);
  const k = f && !c, x = Pe(Xn, []), [w, $] = G(
    () => typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia(x).matches
  );
  H(() => {
    if (typeof window.matchMedia != "function") return;
    const v = window.matchMedia(x), T = () => $(v.matches);
    return v.addEventListener("change", T), () => v.removeEventListener("change", T);
  }, [x]);
  const I = d && w, E = c && f;
  if (H(() => {
    var v;
    if (E)
      return h.current = document.activeElement, (v = b.current) == null || v.focus(), () => {
        var T;
        (T = h.current) == null || T.focus(), h.current = null;
      };
  }, [E]), mr(b, E && !I), H(() => {
    const v = (T) => {
      T.key === "Escape" && u();
    };
    return c && document.addEventListener("keydown", v), () => {
      document.removeEventListener("keydown", v);
    };
  }, [c, u]), H(() => (c && !I ? document.body.style.overflow = "hidden" : document.body.style.overflow = "unset", () => {
    document.body.style.overflow = "unset";
  }), [c, I]), !f) return null;
  const z = (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions -- stops backdrop clicks inside the panel; Escape and the close button are the keyboard path
    /* @__PURE__ */ o(
      "div",
      {
        ref: b,
        tabIndex: -1,
        className: "max-w-full max-h-[80vh] plate-round-lg p-px bg-[var(--surface-container-stroke)] flex focus:outline-none",
        style: { width: p },
        role: "dialog",
        "aria-modal": I ? void 0 : "true",
        "aria-label": n,
        onClick: (v) => v.stopPropagation(),
        children: /* @__PURE__ */ N("div", { className: "w-full plate-round-lg bg-[var(--surface-card)] flex flex-col overflow-hidden", children: [
          /* @__PURE__ */ N("div", { className: "flex items-center justify-between px-6 py-5 border-b-[length:var(--border-width-hairline)] border-solid border-[var(--surface-container-stroke)]", children: [
            /* @__PURE__ */ o("h2", { className: "text-base font-mono text-[var(--text-primary)] font-medium flex-1 min-w-0 truncate", children: n }),
            /* @__PURE__ */ o(
              "span",
              {
                className: "relative ml-4 inline-flex shrink-0 before:content-[''] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-touch before:h-touch",
                onClick: (v) => {
                  v.target === v.currentTarget && u();
                },
                children: /* @__PURE__ */ o(
                  Ue,
                  {
                    variant: "secondary",
                    size: "sm",
                    type: "button",
                    onClick: u,
                    "aria-label": "Close modal",
                    children: /* @__PURE__ */ o(Q, { name: "X" })
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ o("div", { className: "overflow-y-auto px-6 py-5", tabIndex: 0, children: a }),
          s && /* @__PURE__ */ o("div", { className: "flex items-center justify-end gap-3 px-6 py-5 border-t-[length:var(--border-width-hairline)] border-solid border-[var(--surface-container-stroke)]", children: s })
        ] })
      }
    )
  );
  return I ? /* @__PURE__ */ o(
    "div",
    {
      className: `fixed inset-x-0 mx-auto w-fit max-w-full ${k ? "animate-out fade-out fill-mode-forwards" : "animate-in fade-in"}`,
      style: {
        zIndex: "var(--z-index-modal)",
        bottom: "var(--spacing-12)",
        animationDuration: "var(--duration-normal)",
        filter: "var(--elevation-docked-filter)"
      },
      onAnimationEnd: () => {
        k && g(!1);
      },
      children: z
    }
  ) : /* @__PURE__ */ o(xe, { children: /* @__PURE__ */ o(
    "div",
    {
      className: `fixed inset-0 flex items-center justify-center p-5 bg-[var(--surface-overlay)] ${k ? "animate-out fade-out fill-mode-forwards" : "animate-in fade-in"}`,
      style: { zIndex: "var(--z-index-modal)", animationDuration: "var(--duration-normal)" },
      onClick: u,
      onAnimationEnd: () => {
        k && g(!1);
      },
      children: z
    }
  ) });
}
function fs({
  title: e,
  subtitle: t,
  headerContent: r,
  children: n,
  footerContent: a,
  layout: s = "block",
  className: i = ""
}) {
  const l = s === "flex";
  return /* @__PURE__ */ o(
    "div",
    {
      className: `
        plate-round-lg p-px bg-[var(--surface-container-stroke)]
        ${l ? "flex flex-col" : ""}
        ${i}
      `,
      children: /* @__PURE__ */ N(
        "div",
        {
          className: `
        plate-round-lg bg-[var(--surface-card)] h-full w-full
        ${l ? "flex flex-col flex-1 min-h-0" : ""}
      `,
          children: [
            (e || t || r) && /* @__PURE__ */ o("div", { className: "p-4 lg:p-6 border-b-[length:var(--border-width-hairline)] border-solid border-[var(--surface-container-stroke)] overflow-hidden rounded-none", children: r || /* @__PURE__ */ N("div", { children: [
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
function ps({
  tone: e = "neutral",
  size: t = "md",
  caps: r = !1,
  dashed: n = !1,
  children: a,
  iconLeft: s,
  onDismiss: i,
  dismissLabel: l,
  className: d = ""
}) {
  const c = l ?? (typeof a == "string" ? `Remove ${a}` : "Remove badge"), m = {
    sm: "h-5 px-2 py-1 text-xs",
    // h-5 = 20px, px-2 = 8px, text-xs = 12px
    md: "h-6 px-2.5 py-1 text-xs",
    // h-6 = 24px, px-2.5 = 10px, text-xs = 12px
    lg: "h-7 px-3 py-1.5 text-sm"
    // h-7 = 28px, px-3 = 12px, text-sm = 14px
  }, u = {
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
  }, p = {
    neutral: "border-current text-secondary-800 dark:text-secondary-200",
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
  return /* @__PURE__ */ N(
    "span",
    {
      className: `
        inline-flex items-center gap-1.5
        font-mono font-medium
        ${n ? `rounded-none border border-dashed bg-transparent ${p[e]}` : `plate-round ${u[e]}`}
        ${m[t]}
        ${r ? "uppercase [letter-spacing:.08em]" : ""}
        ${d}
      `,
      children: [
        s && /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center ${b[t]} flex-shrink-0`, children: pe(s) }),
        /* @__PURE__ */ o("span", { className: "inline-flex items-center", children: a }),
        i && /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            onClick: (h) => {
              h.stopPropagation(), i();
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
            "aria-label": c,
            children: /* @__PURE__ */ o(Q, { name: "X", size: "3" })
          }
        )
      ]
    }
  );
}
function bs({
  tone: e = "neutral",
  title: t,
  description: r,
  iconLeft: n,
  onDismiss: a,
  dismissLabel: s = "Close alert",
  className: i = ""
}) {
  const l = {
    neutral: "Bell",
    success: "CheckCircle",
    warning: "AlertTriangle",
    error: "AlertCircle",
    info: "Info"
  }, d = pe(n, { size: "4" }) || /* @__PURE__ */ o(Q, { name: l[e], size: "4" }), m = {
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
  }[e], u = e === "error" ? "focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-error)]" : "focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]";
  return /* @__PURE__ */ o("div", { role: "alert", className: `plate-round p-px ${m.ring} ${i}`, children: /* @__PURE__ */ N(
    "div",
    {
      className: `
        plate-round
        flex items-start gap-3
        p-4
        ${m.fill}
      `,
      children: [
        d && /* @__PURE__ */ o("div", { className: `flex h-5 flex-shrink-0 items-center ${m.icon}`, children: d }),
        /* @__PURE__ */ N("div", { className: "flex-1 min-w-0", children: [
          t && /* @__PURE__ */ o("h4", { className: `font-mono text-sm font-bold mb-1 ${m.title}`, children: t }),
          r && /* @__PURE__ */ o("div", { className: `font-mono text-sm ${m.description}`, children: r })
        ] }),
        a && /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            onClick: a,
            className: `
            relative flex-shrink-0
            font-mono text-xs font-bold
            ${m.description}
            hover:text-error-800 dark:hover:text-error-300
            transition-colors [transition-duration:var(--duration-fast)]
            before:content-[''] before:absolute before:left-1/2 before:top-1/2
            before:-translate-x-1/2 before:-translate-y-1/2
            before:w-touch before:h-touch
            focus:outline-none ${u}
          `,
            "aria-label": s,
            children: /* @__PURE__ */ o(Q, { name: "X", size: "3" })
          }
        )
      ]
    }
  ) });
}
function Zn({
  src: e,
  alt: t,
  initials: r,
  icon: n,
  size: a = "md",
  status: s,
  className: i = "",
  onError: l
}) {
  const [d, c] = G(!1), u = {
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
  }[a], p = () => {
    c(!0), l && l();
  }, b = e && !d, h = !b && r, f = !b && !h && n, g = !b && !h && !f, x = b || t === void 0 ? {} : t === "" ? { "aria-hidden": !0 } : { role: "img", "aria-label": t }, w = {
    online: "bg-success-600 dark:bg-success-500",
    offline: "bg-secondary-500 dark:bg-secondary-600",
    away: "bg-warning-600 dark:bg-warning-500"
  };
  return /* @__PURE__ */ N("div", { className: `relative inline-block ${u.container} ${i}`, children: [
    /* @__PURE__ */ N(
      "div",
      {
        ...x,
        className: `
          ${u.container}
          plate-round
          overflow-hidden
          flex items-center justify-center
          bg-secondary-200 dark:bg-secondary-800
          text-secondary-900 dark:text-secondary-50
          font-mono font-bold
          ${u.text}
        `,
        children: [
          b && /* @__PURE__ */ o(
            "img",
            {
              src: e,
              alt: t ?? "Avatar",
              className: "w-full h-full object-cover",
              onError: p
            }
          ),
          h && /* @__PURE__ */ o("span", { className: "select-none", children: r }),
          f && /* @__PURE__ */ o("div", { className: `${u.icon} inline-flex items-center justify-center leading-none text-secondary-700 dark:text-secondary-300`, children: pe(n) }),
          g && /* @__PURE__ */ o("span", { className: `${u.icon} inline-flex items-center justify-center font-mono font-bold text-secondary-900 dark:text-secondary-100`, "aria-hidden": "true", children: "@" })
        ]
      }
    ),
    s && /* @__PURE__ */ o(
      "span",
      {
        role: "img",
        className: `
            absolute block
            ${u.statusOffset}
            ${u.status}
            ${w[s]}
            rounded-none
            border-2 border-[var(--field-background)]
          `,
        "aria-label": `Status: ${s}`
      }
    )
  ] });
}
const Qn = {
  horizontal: { none: "", sm: "my-1", md: "my-4", lg: "my-8" },
  vertical: { none: "", sm: "mx-1", md: "mx-4", lg: "mx-8" }
};
function hs({
  orientation: e = "horizontal",
  label: t,
  spacing: r = "md",
  className: n = ""
}) {
  const a = Qn[e][r];
  return e === "vertical" ? /* @__PURE__ */ o(
    "div",
    {
      className: `h-full border-l border-solid border-term-dim ${a} ${n}`,
      role: "separator",
      "aria-orientation": "vertical"
    }
  ) : t != null && t !== !1 && t !== "" ? /* @__PURE__ */ N(
    "div",
    {
      className: `flex items-center w-full ${a} ${n}`,
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
      className: `w-full border-t border-solid border-term-dim ${a} ${n}`,
      role: "separator",
      "aria-orientation": "horizontal"
    }
  );
}
const Jn = { top: "bottom", bottom: "top", left: "right", right: "left" }, eo = 8, Le = 8;
function to(e, t, r, n, a) {
  const s = {
    top: t.top,
    bottom: a - t.bottom,
    left: t.left,
    right: n - t.right
  }, i = (d) => (d === "top" || d === "bottom" ? r.height : r.width) + eo + Le;
  if (s[e] >= i(e)) return e;
  const l = Jn[e];
  return s[l] >= i(l) ? l : e;
}
function fr(e, t, r, n) {
  return e === "start" ? t : e === "end" ? t + r - n : t + r / 2 - n / 2;
}
function ro(e, t, r, n) {
  const a = fr(n, e.left, e.width, t), s = a + t;
  return a < Le ? Le - a : s > r - Le ? Math.max(Le - a, r - Le - s) : 0;
}
function no({
  content: e,
  children: t,
  side: r = "top",
  align: n = "center",
  delay: a = 200,
  maxWidth: s = "200px",
  className: i = ""
}) {
  const [l, d] = G(!1), [c, m] = G(!1), u = q(null), p = q(null), b = q(null), h = q(null), f = ce(), [g, k] = G(r), [x, w] = G(0), [$, I] = G(0), E = () => {
    u.current && clearTimeout(u.current), p.current && clearTimeout(p.current);
  }, z = () => {
    E(), u.current = setTimeout(() => {
      d(!0), p.current = setTimeout(() => m(!0), 50);
    }, a);
  }, v = ue(() => {
    E(), d(!1), m(!1);
  }, []), T = (C) => {
    var y;
    (y = h.current) != null && y.contains(C.relatedTarget) || v();
  };
  H(() => {
    if (!l) return;
    const C = (y) => {
      y.key === "Escape" && v();
    };
    return document.addEventListener("keydown", C), () => document.removeEventListener("keydown", C);
  }, [l, v]), H(() => E, []), Ae(() => {
    var B, F;
    if (!l) return;
    const C = (B = h.current) == null ? void 0 : B.getBoundingClientRect(), y = (F = b.current) == null ? void 0 : F.getBoundingClientRect();
    if (!C || !y) return;
    const P = window.innerWidth || document.documentElement.clientWidth, _ = window.innerHeight || document.documentElement.clientHeight, j = to(r, C, y, P, _), L = j === "top" || j === "bottom", V = L ? ro(C, y.width, P, n) : 0, K = L ? y.width : y.height, ee = L ? C.left : C.top, X = L ? C.width : C.height, J = fr(n, ee, X, K) + V, ve = n === "center" ? -V : ee + X / 2 - (J + K / 2), me = Math.max(0, K / 2 - 12);
    k(j), w(V), I(Math.min(me, Math.max(-me, ve)));
  }, [l, r, n, e, s]);
  const O = We(t) ? gt(t, {
    "aria-describedby": [
      t.props["aria-describedby"],
      l ? f : void 0
    ].filter(Boolean).join(" ") || void 0
  }) : t, U = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2",
    right: "left-full ml-2"
  }, Y = {
    horizontal: { start: "left-0", center: "left-1/2 -translate-x-1/2", end: "right-0" },
    vertical: { start: "top-0", center: "top-1/2 -translate-y-1/2", end: "bottom-0" }
  }, te = g === "top" || g === "bottom", D = `${U[g]} ${Y[te ? "horizontal" : "vertical"][n]}`, Z = "var(--plate-caret-outer)", ne = "var(--plate-caret-inner)", oe = {
    top: "top-full left-1/2 -translate-x-1/2 -translate-y-px",
    bottom: "bottom-full left-1/2 -translate-x-1/2 translate-y-px rotate-180",
    left: "left-full top-1/2 -translate-y-1/2 translate-x-[calc(var(--plate-caret-offset)*-1)] -rotate-90",
    right: "right-full top-1/2 -translate-y-1/2 translate-x-[var(--plate-caret-offset)] rotate-90"
  }, ie = {
    top: "top-full inset-x-0 h-2",
    bottom: "bottom-full inset-x-0 h-2",
    left: "left-full inset-y-0 w-2",
    right: "right-full inset-y-0 w-2"
  };
  return /* @__PURE__ */ N(
    "div",
    {
      ref: h,
      className: `relative inline-block w-fit ${i}`,
      onMouseEnter: z,
      onMouseLeave: v,
      onFocus: z,
      onBlur: T,
      children: [
        O,
        l && /* @__PURE__ */ N(
          "div",
          {
            ref: b,
            id: f,
            role: "tooltip",
            className: `
            absolute
            ${D}
            w-max
            z-[var(--z-index-tooltip)]
            ${c ? "opacity-100" : "opacity-0"}
            transition-opacity [transition-duration:var(--duration-fast)]
          `,
            "data-placement": g,
            "data-align": n,
            style: { maxWidth: s, marginLeft: x || void 0 },
            children: [
              /* @__PURE__ */ o("span", { className: `absolute ${ie[g]}`, "aria-hidden": "true" }),
              /* @__PURE__ */ o("div", { className: "plate-round p-px bg-[var(--surface-container-stroke)]", children: /* @__PURE__ */ o("div", { className: "plate-round bg-[var(--surface-card)] min-w-16 px-3 py-2 text-center font-mono text-xs text-[var(--text-primary)] whitespace-normal", children: e }) }),
              /* @__PURE__ */ o(
                "div",
                {
                  className: `absolute ${oe[g]}`,
                  style: te ? { marginLeft: $ || void 0 } : { marginTop: $ || void 0 },
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ N("div", { className: "relative h-[var(--plate-caret-height)] w-[var(--plate-caret-width)]", children: [
                    /* @__PURE__ */ o(
                      "div",
                      {
                        className: "absolute inset-0 bg-[var(--surface-container-stroke)]",
                        style: { clipPath: Z }
                      }
                    ),
                    /* @__PURE__ */ o(
                      "div",
                      {
                        className: "absolute left-[var(--plate-caret-inner-inset-x)] top-[var(--plate-caret-inner-inset-y)] h-[var(--plate-caret-inner-height)] w-[var(--plate-caret-inner-width)] bg-[var(--surface-card)]",
                        style: { clipPath: ne }
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
  return e == null || typeof e == "boolean" ? "" : Array.isArray(e) ? e.map(ut).join("") : typeof e == "string" || typeof e == "number" ? String(e) : We(e) ? ut(e.props.children) : String(e);
}
function mt(e, t, r, n = []) {
  return Kt.forEach(e, (a) => {
    if (!We(a)) return;
    const s = a, i = s.props;
    if (s.type === xt) {
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
const oo = re(function({
  size: t = "md",
  error: r = !1,
  helperText: n,
  errorMessage: a,
  disabled: s = !1,
  className: i = "",
  children: l,
  value: d,
  defaultValue: c,
  onChange: m,
  name: u,
  label: p,
  "aria-label": b,
  "aria-describedby": h,
  id: f,
  ...g
}, k) {
  var me;
  const x = Me({ error: r, helperText: n, errorMessage: a, describedBy: h }), w = x.invalid, $ = ce(), I = f ?? `${$}-trigger`, E = `${$}-listbox`, z = `${$}-label`, v = (B) => `${$}-option-${B}`, T = mt(l), O = [];
  T.forEach((B, F) => {
    const se = O[O.length - 1];
    se && se.label === B.group ? se.entries.push({ option: B, index: F }) : O.push({ label: B.group, entries: [{ option: B, index: F }] });
  });
  const [U, Y] = G(!1), [te, D] = G(-1), [Z, ne] = G(
    d !== void 0 ? String(d) : c !== void 0 ? String(c) : ((me = T[0]) == null ? void 0 : me.value) || ""
  ), oe = q(null), ie = q(null), C = q(null);
  H(() => {
    d !== void 0 && (ne(String(d)), C.current && (C.current.value = String(d)));
  }, [d]), Pr(k, () => C.current);
  const y = T.find((B) => B.value === Z), P = (y == null ? void 0 : y.label) || "", _ = () => {
    s || (Y(!U), U || D(-1));
  }, j = () => {
    Y(!1), D(-1);
  }, L = (B) => {
    d === void 0 && ne(B), C.current && (C.current.value = B), m && m({
      target: { value: B, name: u },
      currentTarget: { value: B, name: u }
    }), j();
  };
  H(() => {
    function B(F) {
      oe.current && !oe.current.contains(F.target) && j();
    }
    if (U)
      return document.addEventListener("mousedown", B), () => {
        document.removeEventListener("mousedown", B);
      };
  }, [U]), H(() => {
    function B(F) {
      var ye, be;
      if (!((ye = oe.current) != null && ye.contains(F.target)) && !U)
        return;
      if (!U) {
        if ((F.key === "Enter" || F.key === " " || F.key === "ArrowDown" || F.key === "ArrowUp") && (be = oe.current) != null && be.contains(F.target)) {
          F.preventDefault(), _();
          const de = T.findIndex((fe) => fe.value === Z && !fe.disabled);
          D(de >= 0 ? de : ot(T, -1, 1));
        }
        return;
      }
      const se = te;
      switch (F.key) {
        case "Escape":
          F.preventDefault(), j();
          break;
        case "Tab":
          j();
          break;
        case "ArrowDown":
          F.preventDefault(), D((de) => ot(T, de, 1));
          break;
        case "ArrowUp":
          F.preventDefault(), D((de) => ot(T, de, -1));
          break;
        case "Enter":
        case " ":
          F.preventDefault(), se >= 0 && se < T.length && !T[se].disabled && L(T[se].value);
          break;
      }
    }
    return document.addEventListener("keydown", B), () => {
      document.removeEventListener("keydown", B);
    };
  }, [U, te, T, Z]), H(() => {
    if (te >= 0 && ie.current) {
      const F = ie.current.querySelectorAll('[role="option"]')[te];
      F && F.scrollIntoView({ block: "nearest" });
    }
  }, [te]);
  const K = {
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
  }[t], ee = w ? "bg-[var(--field-background-error)] text-[var(--text-primary)]" : "bg-[var(--field-background)] text-[var(--text-primary)]", X = w ? "bg-[var(--field-border-error)] focus-within:!bg-[var(--field-border-focus)]" : "bg-[var(--field-border)] hover:bg-[var(--field-border-hover)] focus-within:!bg-[var(--field-border-focus)]", J = p != null && p !== "", ve = /* @__PURE__ */ N("div", { ref: oe, className: "relative inline-block w-full", children: [
    /* @__PURE__ */ o(
      "select",
      {
        ref: C,
        name: u,
        value: Z,
        onChange: m,
        className: "sr-only",
        "aria-hidden": "true",
        tabIndex: -1,
        ...g,
        children: T.map((B, F) => /* @__PURE__ */ o("option", { value: B.value, disabled: B.disabled, children: B.label }, F))
      }
    ),
    /* @__PURE__ */ o("div", { className: `plate-round p-px transition-colors [transition-duration:var(--duration-fast)] ${X} ${s ? "opacity-50" : ""}`, children: /* @__PURE__ */ N(
      "button",
      {
        type: "button",
        role: "combobox",
        id: I,
        onClick: _,
        disabled: s,
        className: `
          w-full
          flex items-center justify-between
          font-mono text-sm
          transition-colors [transition-duration:var(--duration-fast)]
          ${K.trigger}
          ${ee}
          ${s ? "cursor-not-allowed" : "cursor-pointer"}
          focus:outline-none
        `,
        "aria-haspopup": "listbox",
        "aria-expanded": U,
        "aria-controls": U ? E : void 0,
        "aria-activedescendant": U && te >= 0 ? v(te) : void 0,
        "aria-invalid": w || void 0,
        "aria-describedby": x.describedBy,
        "aria-label": J ? void 0 : b ?? "Select an option",
        children: [
          /* @__PURE__ */ o("span", { className: "truncate text-left flex-1", children: P || "Select..." }),
          /* @__PURE__ */ o(
            "span",
            {
              className: `
            ${K.icon}
            inline-flex items-center justify-center font-mono leading-none
            text-[var(--text-secondary)]
            transition-transform [transition-duration:var(--duration-normal)]
            flex-shrink-0 ml-2
            ${U ? "rotate-180" : ""}
            ${s ? "opacity-50" : ""}
          `,
              "aria-hidden": "true",
              children: /* @__PURE__ */ o(Q, { name: "ChevronDown" })
            }
          )
        ]
      }
    ) }),
    U && /* @__PURE__ */ o(
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
            ref: ie,
            id: E,
            role: "listbox",
            "aria-labelledby": J ? z : void 0,
            "aria-label": J ? void 0 : b ?? "Select an option",
            className: `plate-round bg-[var(--surface-card)] ${K.menu} max-h-80 overflow-y-auto`,
            children: O.map((B, F) => {
              const se = `${$}-group-${F}`, ye = B.entries.map(({ option: be, index: de }) => {
                const fe = be.disabled, Re = be.value === Z, tt = te === de && !fe;
                return /* @__PURE__ */ N(
                  "button",
                  {
                    id: v(de),
                    type: "button",
                    role: "option",
                    "aria-selected": Re,
                    disabled: fe,
                    onClick: () => !fe && L(be.value),
                    className: `
                  w-full flex items-center gap-2
                  px-4 py-3
                  font-mono text-sm text-left
                  transition-colors [transition-duration:var(--duration-fast)]
                  ${fe ? "opacity-50 cursor-not-allowed" : "text-[var(--text-primary)] hover:bg-[var(--surface-muted)] cursor-pointer"}
                  ${tt ? "bg-[var(--surface-muted)] text-[var(--accent)]" : ""}
                  ${K.menuItem}
                `,
                    children: [
                      /* @__PURE__ */ o("span", { className: "truncate flex-1 min-w-0", children: be.label }),
                      Re && /* @__PURE__ */ o("span", { className: `${K.icon} inline-flex items-center justify-center font-mono font-bold text-[var(--border-focus)] flex-shrink-0`, "aria-hidden": "true", children: /* @__PURE__ */ o(Q, { name: "Check" }) })
                    ]
                  },
                  de
                );
              });
              return B.label == null ? /* @__PURE__ */ o(xt, { children: ye }, F) : /* @__PURE__ */ N("div", { role: "group", "aria-labelledby": se, children: [
                /* @__PURE__ */ o(
                  "div",
                  {
                    id: se,
                    className: "px-4 py-2 font-mono text-xs uppercase tracking-wide text-[var(--text-secondary)]",
                    children: B.label
                  }
                ),
                ye
              ] }, F);
            })
          }
        )
      }
    )
  ] });
  return !J && !x.hasMessage ? /* @__PURE__ */ o("div", { className: `w-full ${i}`.trim(), children: ve }) : /* @__PURE__ */ N("div", { className: `w-full space-y-1 ${i}`.trim(), children: [
    J && /* @__PURE__ */ o(
      "label",
      {
        id: z,
        htmlFor: I,
        className: "block font-mono text-sm text-secondary-800 dark:text-secondary-200",
        children: p
      }
    ),
    ve,
    /* @__PURE__ */ o(Se, { ...x.message })
  ] });
});
oo.displayName = "Select";
const ao = re(
  ({
    size: e = "md",
    label: t,
    error: r = !1,
    helperText: n,
    errorMessage: a,
    disabled: s = !1,
    checked: i,
    onChange: l,
    onCheckedChange: d,
    indeterminate: c = !1,
    className: m = "",
    "aria-describedby": u,
    ...p
  }, b) => {
    const h = q(null), f = ue(
      (T) => {
        h.current = T, typeof b == "function" ? b(T) : b && (b.current = T);
      },
      [b]
    );
    Ae(() => {
      h.current && (h.current.indeterminate = c);
    });
    const g = Me({ error: r, helperText: n, errorMessage: a, describedBy: u }), k = g.invalid, w = {
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
    }[e], $ = k ? "bg-[var(--field-border-error)]" : `bg-[var(--field-border)] hover:bg-[var(--field-border-hover)]
         peer-checked:bg-[var(--button-primary-background)]
         peer-checked:hover:bg-[var(--button-primary-background-hover)]
         peer-indeterminate:bg-[var(--button-primary-background)]
         peer-indeterminate:hover:bg-[var(--button-primary-background-hover)]`, I = k ? "peer-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-error)]" : "peer-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]", E = (T) => {
      l && l(T), d && d(T.target.checked), T.target.indeterminate = c;
    }, z = t != null && t !== !1 && t !== "", v = /* @__PURE__ */ N("span", { className: "relative inline-flex shrink-0 before:content-[''] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-touch before:h-touch", children: [
      /* @__PURE__ */ o(
        "input",
        {
          ref: f,
          type: "checkbox",
          ...i !== void 0 ? { checked: i } : {},
          disabled: s,
          onChange: E,
          className: "peer sr-only",
          "aria-invalid": k || void 0,
          "aria-describedby": g.describedBy,
          ...p
        }
      ),
      /* @__PURE__ */ o(
        "span",
        {
          "aria-hidden": "true",
          className: `
            plate-round p-px inline-flex shrink-0
            ${w.checkbox}
            transition-colors [transition-duration:var(--duration-fast)]
            ${s ? "cursor-not-allowed" : "cursor-pointer"}
            ${$}
            ${k ? "peer-checked:[&>span]:bg-[var(--field-border-error)] peer-indeterminate:[&>span]:bg-[var(--field-border-error)]" : "peer-checked:[&>span]:bg-[var(--button-primary-background)] peer-indeterminate:[&>span]:bg-[var(--button-primary-background)]"}
            peer-checked:[&_[data-mark=check]]:opacity-100
            peer-indeterminate:[&_[data-mark=check]]:opacity-0
            peer-indeterminate:[&_[data-mark=bar]]:opacity-100
            ${I}
          `,
          children: /* @__PURE__ */ o(
            "span",
            {
              className: `
              plate-round relative inline-flex h-full w-full items-center justify-center
              bg-[var(--field-background)]
              transition-colors [transition-duration:var(--duration-fast)]
            `,
              children: ["check", "bar"].map((T) => /* @__PURE__ */ o(
                "span",
                {
                  "data-mark": T,
                  className: `absolute inset-0 inline-flex items-center justify-center opacity-0 transition-opacity [transition-duration:var(--duration-fast)] ${k ? "text-[var(--button-destructive-text)]" : "text-[var(--button-primary-text)]"}`,
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ o(Q, { name: T === "check" ? "Check" : "Minus", size: w.glyph })
                },
                T
              ))
            }
          )
        }
      )
    ] });
    return /* @__PURE__ */ N("div", { className: `flex flex-col gap-1 ${m}`, children: [
      /* @__PURE__ */ N(
        "label",
        {
          className: `inline-flex items-center gap-2 font-mono ${s ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`,
          children: [
            v,
            z && /* @__PURE__ */ o("span", { className: `${w.label} text-[var(--text-primary)]`, children: t })
          ]
        }
      ),
      /* @__PURE__ */ o(Se, { ...g.message, className: w.messageIndent })
    ] });
  }
);
ao.displayName = "Checkbox";
function so(e, t, r) {
  return !Number.isFinite(e) || r <= t ? 0 : Math.min(100, Math.max(0, (e - t) / (r - t) * 100));
}
const io = re(function({ label: t, id: r, className: n = "", disabled: a, min: s = 0, max: i = 100, value: l, defaultValue: d, onChange: c, ...m }, u) {
  const p = ce(), b = r ?? p, h = Number(s), f = Number(i), g = l !== void 0, [k, x] = G(
    () => d !== void 0 ? Number(d) : h
  ), w = g ? Number(l) : k, $ = so(w, h, f), I = (E) => {
    g || x(Number(E.target.value)), c == null || c(E);
  };
  return /* @__PURE__ */ N("span", { className: `flex w-full flex-col gap-1.5 font-mono ${n}`, children: [
    t && /* @__PURE__ */ o("label", { htmlFor: b, className: "text-sm text-secondary-800 dark:text-secondary-300", children: t }),
    /* @__PURE__ */ N("span", { className: `relative flex h-touch w-full items-center ${a ? "opacity-50" : ""}`, children: [
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
          ref: u,
          id: b,
          type: "range",
          min: s,
          max: i,
          disabled: a,
          ...g ? { value: l } : { defaultValue: d },
          onChange: I,
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
          ...m
        }
      )
    ] })
  ] });
});
io.displayName = "Slider";
const lo = re(
  ({
    size: e = "md",
    label: t,
    error: r = !1,
    helperText: n,
    errorMessage: a,
    disabled: s = !1,
    checked: i,
    onChange: l,
    onCheckedChange: d,
    className: c = "",
    "aria-describedby": m,
    ...u
  }, p) => {
    const b = Me({ error: r, helperText: n, errorMessage: a, describedBy: m }), h = b.invalid, g = {
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
    }[e], k = h ? "bg-[var(--field-border-error)]" : `bg-[var(--field-border)] hover:bg-[var(--field-border-hover)]
         peer-checked:bg-[var(--button-primary-background)]
         peer-checked:hover:bg-[var(--button-primary-background-hover)]`, x = h ? "peer-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-error)]" : "peer-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]", w = (E) => {
      const z = E.currentTarget.checked;
      l && l(E), d && d(z);
    }, $ = t != null && t !== !1 && t !== "", I = /* @__PURE__ */ N("span", { className: "relative inline-flex shrink-0 before:content-[''] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-touch before:h-touch", children: [
      /* @__PURE__ */ o(
        "input",
        {
          ref: p,
          type: "radio",
          ...i !== void 0 ? { checked: i } : {},
          disabled: s,
          onChange: w,
          className: "peer sr-only",
          "aria-describedby": b.describedBy,
          ...u
        }
      ),
      /* @__PURE__ */ o(
        "span",
        {
          "aria-hidden": "true",
          className: `
            plate-round p-px inline-flex shrink-0
            ${g.radio}
            transition-colors [transition-duration:var(--duration-fast)]
            ${s ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
            ${k}
            ${h ? "peer-checked:[&>span]:bg-[var(--field-border-error)]" : "peer-checked:[&>span]:bg-[var(--button-primary-background)]"}
            peer-checked:[&>span>span]:opacity-100
            ${x}
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
                ${g.dot}
                opacity-0
                transition-opacity [transition-duration:var(--duration-fast)]
                ${h ? "bg-[var(--button-destructive-text)]" : "bg-[var(--button-primary-text)]"}
              `
                }
              )
            }
          )
        }
      )
    ] });
    return /* @__PURE__ */ N("div", { className: `flex flex-col gap-1 ${c}`, children: [
      /* @__PURE__ */ N(
        "label",
        {
          className: `inline-flex items-center gap-2 font-mono ${s ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`,
          children: [
            I,
            $ && /* @__PURE__ */ o("span", { className: `${g.label} text-[var(--text-primary)]`, children: t })
          ]
        }
      ),
      /* @__PURE__ */ o(Se, { ...b.message, className: g.messageIndent })
    ] });
  }
);
lo.displayName = "Radio";
const co = re(
  ({
    size: e = "md",
    error: t = !1,
    helperText: r,
    errorMessage: n,
    disabled: a = !1,
    className: s = "",
    label: i,
    id: l,
    "aria-describedby": d,
    ...c
  }, m) => {
    const u = Me({ error: t, helperText: r, errorMessage: n, describedBy: d }), p = u.invalid, b = ce(), h = l ?? (i != null && i !== "" ? b : void 0), f = `
      block w-full
      font-mono text-sm
      transition-colors [transition-duration:var(--duration-fast)]
      placeholder:text-[var(--field-placeholder)]
      disabled:cursor-not-allowed
      focus:outline-none
      resize-y
    `, g = {
      sm: "min-h-control-sm px-3 py-1.5 plate-round",
      md: "min-h-control-md px-4 py-2.5 plate-round",
      lg: "min-h-control-lg px-5 py-3.5 plate-round"
    }, k = p ? "bg-[var(--field-background-error)] text-[var(--text-primary)]" : "bg-[var(--field-background)] text-[var(--text-primary)]", w = /* @__PURE__ */ o(
      "div",
      {
        className: `w-full plate-round p-px transition-colors [transition-duration:var(--duration-fast)] ${p ? "bg-[var(--field-border-error)] focus-within:!bg-[var(--field-border-focus)]" : "bg-[var(--field-border)] hover:bg-[var(--field-border-hover)] focus-within:!bg-[var(--field-border-focus)]"} ${a ? "opacity-50" : ""}`,
        children: /* @__PURE__ */ o(
          "textarea",
          {
            ref: m,
            id: h,
            disabled: a,
            "aria-invalid": p || void 0,
            "aria-describedby": u.describedBy,
            className: `${f} ${g[e]} ${k} ${s}`,
            ...c
          }
        )
      }
    ), $ = i != null && i !== "";
    return !$ && !u.hasMessage ? w : /* @__PURE__ */ N("div", { className: "w-full space-y-1", children: [
      $ && /* @__PURE__ */ o(
        "label",
        {
          htmlFor: h,
          className: "block font-mono text-sm text-secondary-800 dark:text-secondary-200",
          children: i
        }
      ),
      w,
      /* @__PURE__ */ o(Se, { ...u.message })
    ] });
  }
);
co.displayName = "Textarea";
const uo = {
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
}, pr = re(
  ({
    checked: e,
    defaultChecked: t = !1,
    onCheckedChange: r,
    size: n = "md",
    label: a,
    "aria-label": s,
    hideLabel: i = !1,
    disabled: l = !1,
    icon: d,
    className: c = "",
    ...m
  }, u) => {
    const p = uo[n], [b, h] = je({
      value: e,
      defaultValue: t,
      onChange: r
    }), f = () => {
      l || h(!b);
    }, g = (k) => {
      (k.key === " " || k.key === "Enter") && (k.preventDefault(), f());
    };
    return /* @__PURE__ */ N("div", { className: `flex items-center gap-3 ${c}`, children: [
      /* @__PURE__ */ o(
        "button",
        {
          ref: u,
          type: "button",
          role: "switch",
          "aria-checked": b,
          "aria-label": s ?? (a || void 0),
          disabled: l,
          onClick: f,
          onKeyDown: g,
          className: `
            group relative inline-flex shrink-0
            before:content-[''] before:absolute before:inset-x-0 before:top-1/2 before:-translate-y-1/2 before:h-touch
            focus:outline-none
            ${l ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `,
          ...m,
          children: /* @__PURE__ */ o(
            "span",
            {
              "aria-hidden": "true",
              "data-state": b ? "on" : "off",
              className: `
              relative inline-flex items-center
              ${p.track}
              plate-round
              transition-colors [transition-duration:var(--duration-normal)] motion-reduce:transition-none
              group-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]
              ${b ? "bg-[var(--accent)]" : "bg-[var(--control-track)]"}
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
                    transform: `translateX(${b ? p.knobOn : p.knobOff})`
                  },
                  children: d && /* @__PURE__ */ o("span", { className: p.iconSize, children: pe(d) })
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
          onClick: f,
          className: `select-none text-sm font-mono ${l ? "cursor-not-allowed text-secondary-700 dark:text-secondary-400" : "cursor-pointer text-[var(--text-primary)]"}`,
          children: a
        }
      )
    ] });
  }
);
pr.displayName = "Switch";
function Bt(e, t, r) {
  var s;
  const n = e.length;
  if (n === 0) return -1;
  let a = t;
  for (let i = 0; i < n; i++)
    if (a += r, a >= n && (a = 0), a < 0 && (a = n - 1), !((s = e[a]) != null && s.disabled)) return a;
  return -1;
}
function gs({
  trigger: e,
  items: t,
  align: r = "start",
  label: n = "Actions",
  size: a = "md"
}) {
  const [s, i] = G(!1), [l, d] = G(-1), c = q(null), m = q(null), u = () => {
    i(!s), s || d(-1);
  }, p = () => {
    i(!1), d(-1);
  }, b = (w) => {
    w.disabled || (w.onClick(), p());
  };
  H(() => {
    function w($) {
      c.current && !c.current.contains($.target) && p();
    }
    if (s)
      return document.addEventListener("mousedown", w), () => {
        document.removeEventListener("mousedown", w);
      };
  }, [s]), H(() => {
    function w($) {
      if (!s) return;
      const I = l;
      switch ($.key) {
        case "Escape":
          $.preventDefault(), p();
          break;
        case "Tab":
          p();
          break;
        case "ArrowDown":
          $.preventDefault(), d((E) => Bt(t, E, 1));
          break;
        case "ArrowUp":
          $.preventDefault(), d((E) => Bt(t, E, -1));
          break;
        case "Enter":
        case " ":
          $.preventDefault(), I >= 0 && I < t.length && b(t[I]);
          break;
      }
    }
    if (s)
      return document.addEventListener("keydown", w), () => {
        document.removeEventListener("keydown", w);
      };
  }, [s, l, t]), H(() => {
    if (l >= 0 && m.current) {
      const $ = m.current.querySelectorAll('[role="menuitem"]')[l];
      $ && $.scrollIntoView({ block: "nearest" });
    }
  }, [l]);
  const f = {
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
  }[a], g = /* @__PURE__ */ N(
    "button",
    {
      type: "button",
      onClick: u,
      className: `
        inline-flex items-center justify-center gap-2
        font-mono text-sm
        ${f.button}
        transition-colors [transition-duration:var(--duration-normal)]
        cursor-pointer
        bg-[var(--button-secondary-background)] hover:bg-[var(--button-secondary-background-hover)] active:brightness-95
        text-[var(--button-secondary-text)] hover:text-[var(--button-secondary-text-hover)]
        focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-secondary)]
      `,
      "aria-haspopup": "true",
      "aria-expanded": s,
      children: [
        n,
        /* @__PURE__ */ o("span", { className: `${f.icon} inline-flex items-center justify-center font-mono leading-none transition-transform [transition-duration:var(--duration-normal)] ${s ? "rotate-180" : ""}`, "aria-hidden": "true", children: /* @__PURE__ */ o(Q, { name: "ChevronDown" }) })
      ]
    }
  ), k = {
    "aria-haspopup": "true",
    "aria-expanded": s
  };
  let x;
  if (!e)
    x = g;
  else if (We(e)) {
    const w = e;
    x = gt(w, {
      ...k,
      onClick: ($) => {
        var I, E;
        (E = (I = w.props).onClick) == null || E.call(I, $), u();
      }
    });
  } else
    x = /* @__PURE__ */ o(
      "div",
      {
        ...k,
        onClick: u,
        role: "button",
        tabIndex: 0,
        onKeyDown: (w) => {
          (w.key === "Enter" || w.key === " ") && (w.preventDefault(), u());
        },
        children: e
      }
    );
  return /* @__PURE__ */ N("div", { ref: c, className: "relative inline-block", children: [
    x,
    s && /* @__PURE__ */ o(
      "div",
      {
        style: { animationDuration: "var(--duration-normal)" },
        className: `
            absolute top-full mt-2
            ${r === "end" ? "end-0" : "start-0"}
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
            className: `plate-round bg-[var(--surface-card)] ${f.menu}`,
            children: t.map((w, $) => {
              const I = w.variant === "destructive", E = w.disabled;
              return /* @__PURE__ */ N(
                "button",
                {
                  type: "button",
                  role: "menuitem",
                  disabled: E,
                  onClick: () => b(w),
                  className: `
                  w-full flex items-center gap-2
                  px-4 py-3
                  font-mono text-sm text-left
                  transition-colors [transition-duration:var(--duration-fast)]
                  ${E ? "opacity-50 cursor-not-allowed" : I ? "text-[var(--text-error)] hover:bg-[var(--field-background-error)]" : "text-[var(--text-primary)] hover:bg-[var(--surface-muted)]"}
                  ${l === $ && !E ? I ? "bg-[var(--field-background-error)]" : "bg-[var(--surface-muted)] text-[var(--accent)]" : ""}
                  ${f.menuItem}
                `,
                  children: [
                    /* @__PURE__ */ N("div", { className: "flex items-center gap-2 flex-1 min-w-0", children: [
                      w.icon && /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center ${f.icon} flex-shrink-0`, children: pe(w.icon) }),
                      /* @__PURE__ */ o("span", { className: "truncate", children: w.label })
                    ] }),
                    w.iconRight && /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center ${f.icon} flex-shrink-0 ml-auto`, children: pe(w.iconRight) })
                  ]
                },
                $
              );
            })
          }
        )
      }
    )
  ] });
}
const Ke = "text-secondary-700 dark:text-secondary-600", _e = "text-secondary-800 dark:text-secondary-500", ke = "text-[var(--text-primary)]", He = "text-[var(--accent)]", Oe = "border-[var(--surface-container-stroke)]", mo = {
  background: "repeating-linear-gradient(45deg, var(--surface-subtle), var(--surface-subtle) 8px, var(--surface-muted) 8px, var(--surface-muted) 16px)"
}, Ge = (e) => e === "wide" ? " [--csp-bw:max(100%,min(calc(100%+240px),calc(100cqw-48px)))] w-[var(--csp-bw)] ml-[calc((100%-var(--csp-bw))/2)]" : e === "full" ? " [--csp-bw:max(100%,calc(100cqw-48px))] w-[var(--csp-bw)] ml-[calc((100%-var(--csp-bw))/2)]" : "", fo = 0.62, po = (e) => `min(var(--font-size-xs), calc((100cqw - var(--spacing-10)) / ${(Math.max(...e.split(`
`).map((r) => r.length)) * fo).toFixed(2)}))`, wt = (e) => String(e).padStart(2, "0"), bo = (e) => e.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""), br = (e) => e.type === "imagePair" ? 2 : e.type === "image" || e.type === "ascii" || e.type === "slot" ? 1 : 0;
function ho(e, t = 1) {
  const r = /* @__PURE__ */ new Map();
  let n = t;
  for (const a of e) {
    const s = br(a);
    s && (r.set(a, n), n += s);
  }
  return r;
}
function kt({ fig: e, caption: t }) {
  return !e && !t ? null : /* @__PURE__ */ N("figcaption", { className: "mt-3 flex gap-3 text-xs leading-relaxed", children: [
    e !== void 0 && /* @__PURE__ */ N("span", { className: `flex-none ${He}`, children: [
      "fig. ",
      wt(e)
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
  return /* @__PURE__ */ N("figure", { className: `my-10 m-0${Ge(r)}`, children: [
    /* @__PURE__ */ o("div", { className: "plate-round p-px bg-[var(--border-hairline)]", children: n }),
    /* @__PURE__ */ o(kt, { fig: e, caption: t })
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
  ) : /* @__PURE__ */ o("div", { className: "plate-round w-full", style: { aspectRatio: n, ...mo } });
}
function hr({ items: e }) {
  const t = e.length >= 4 ? "sm:grid-cols-4" : e.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";
  return /* @__PURE__ */ o("dl", { className: `m-0 grid grid-cols-2 gap-x-8 gap-y-6 ${t}`, children: e.map((r) => (
    // dt stays first for screen readers; the figure is moved above it
    // visually, so every figure hangs from the top of its cell however
    // its label wraps. Figure and label centre in their cell.
    /* @__PURE__ */ N("div", { className: "flex flex-col items-center text-center", children: [
      /* @__PURE__ */ o("dt", { className: `mt-2 text-xs ${Ke}`, children: r.label }),
      /* @__PURE__ */ o("dd", { className: `order-first m-0 text-2xl leading-none ${He}`, children: r.value })
    ] }, r.label)
  )) });
}
function go({
  b: e,
  fig: t,
  slots: r
}) {
  switch (e.type) {
    case "prose":
      return /* @__PURE__ */ o("p", { className: `my-6 text-base leading-relaxed ${_e}`, children: e.text });
    case "image":
      return /* @__PURE__ */ o(at, { fig: t, caption: e.caption, width: e.width, children: /* @__PURE__ */ o(Ze, { src: e.src, alt: e.alt, aspect: e.aspect }) });
    case "imagePair":
      return /* @__PURE__ */ o("div", { className: `my-10 grid grid-cols-1 gap-4 sm:grid-cols-2${Ge(e.width)}`, children: [0, 1].map((n) => {
        var a, s, i;
        return /* @__PURE__ */ N("figure", { className: "m-0", children: [
          /* @__PURE__ */ o("div", { className: "plate-round p-px bg-[var(--border-hairline)]", children: /* @__PURE__ */ o(Ze, { src: (a = e.srcs) == null ? void 0 : a[n], alt: (s = e.alts) == null ? void 0 : s[n], aspect: "4 / 3" }) }),
          /* @__PURE__ */ o(kt, { fig: t === void 0 ? void 0 : t + n, caption: (i = e.captions) == null ? void 0 : i[n] })
        ] }, n);
      }) });
    case "ascii": {
      const n = po(e.text);
      return /* @__PURE__ */ o(at, { fig: t, caption: e.caption, width: e.width, children: /* @__PURE__ */ o("div", { className: "[container-type:inline-size]", children: /* @__PURE__ */ o(
        "pre",
        {
          role: "img",
          "aria-label": e.label ?? e.caption ?? "diagram",
          className: `plate-round m-0 overflow-x-auto p-5 leading-snug ${_e}`,
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
        return /* @__PURE__ */ N("li", { className: `relative pl-8 ${i ? "" : "pb-6"}`, children: [
          !(s && i) && /* @__PURE__ */ o("span", { "aria-hidden": "true", className: `absolute left-1 border-l-hairline ${Oe} ${`${s ? "top-3" : "top-0"} ${i ? "h-3" : "bottom-0"}`}` }),
          /* @__PURE__ */ o("span", { "aria-hidden": "true", className: `absolute left-1 top-3 w-4 border-t-hairline ${Oe}` }),
          /* @__PURE__ */ o("div", { className: `text-sm leading-6 ${ke}`, children: n.title }),
          /* @__PURE__ */ o("p", { className: `m-0 mt-1 text-sm leading-6 ${_e}`, children: n.text })
        ] }, n.title);
      }) });
    case "insights":
      return /* @__PURE__ */ o("ol", { className: `my-10 list-none border-b-hairline p-0 ${Oe}`, children: e.items.map((n, a) => /* @__PURE__ */ N(
        "li",
        {
          className: `grid grid-cols-[theme(spacing.16)_1fr] border-t-hairline py-6 ${Oe}`,
          children: [
            /* @__PURE__ */ o("span", { className: `text-2xl leading-none ${He}`, children: wt(a + 1) }),
            /* @__PURE__ */ N("div", { children: [
              /* @__PURE__ */ o("div", { className: `text-lg leading-snug ${ke}`, children: n.title }),
              /* @__PURE__ */ o("p", { className: `m-0 mt-2 text-sm leading-relaxed ${_e}`, children: n.text })
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
          className: `my-10 grid grid-cols-1 gap-4 ${n ? `sm:grid-cols-3${Ge("wide")}` : "sm:grid-cols-2"}`,
          children: e.items.map((a) => /* @__PURE__ */ N("div", { className: "plate-round bg-[var(--surface-muted)] p-5", children: [
            /* @__PURE__ */ o("div", { className: `text-base leading-snug ${ke}`, children: a.title }),
            /* @__PURE__ */ o("p", { className: `m-0 mt-2 text-sm leading-relaxed ${_e}`, children: a.text })
          ] }, a.title))
        }
      );
    }
    case "quote":
      return /* @__PURE__ */ N("figure", { className: "my-10 m-0 border-l-hairline border-[var(--accent)] pl-6", children: [
        /* @__PURE__ */ o("blockquote", { className: `m-0 p-0 text-lg leading-relaxed ${ke}`, children: e.text }),
        e.name && /* @__PURE__ */ N("figcaption", { className: "mt-4 flex items-center gap-3 text-sm", children: [
          /* @__PURE__ */ o(Zn, { size: "md", src: e.image, alt: "" }),
          /* @__PURE__ */ N("span", { children: [
            /* @__PURE__ */ o("span", { className: `block ${ke}`, children: e.name }),
            e.role && /* @__PURE__ */ o("span", { className: `block text-xs ${Ke}`, children: e.role })
          ] })
        ] })
      ] });
    case "statement":
      return /* @__PURE__ */ N("div", { className: `my-12 border-y-hairline py-10 ${Oe}${Ge("wide")}`, children: [
        e.kicker && /* @__PURE__ */ o("div", { className: `mb-4 text-xs uppercase tracking-wider ${He}`, children: e.kicker }),
        /* @__PURE__ */ o("p", { className: `m-0 text-2xl leading-snug ${ke}`, children: e.text })
      ] });
    case "outcomes":
      return /* @__PURE__ */ o("div", { className: "my-10", children: /* @__PURE__ */ o(hr, { items: e.items }) });
  }
}
function xo({
  blocks: e,
  slots: t,
  figureStart: r = 1,
  className: n = ""
}) {
  const a = ho(e, r);
  return /* @__PURE__ */ o("div", { className: `font-mono ${n}`, children: e.map((s, i) => /* @__PURE__ */ o(go, { b: s, fig: a.get(s), slots: t }, i)) });
}
function vo({
  study: e,
  className: t = ""
}) {
  const { title: r, summary: n, outcomes: a, meta: s, cover: i } = e;
  return /* @__PURE__ */ N("header", { className: `font-mono ${t}`, children: [
    /* @__PURE__ */ o("h1", { className: `m-0 text-2xl leading-tight sm:text-page-title ${ke}`, children: r }),
    /* @__PURE__ */ o("p", { className: `m-0 mt-5 text-base leading-relaxed sm:text-lg ${_e}`, children: n }),
    a && a.length > 0 && /* @__PURE__ */ o("div", { className: "mt-10", children: /* @__PURE__ */ o(hr, { items: a }) }),
    s && s.length > 0 && // One fact a line: label and value joined by a dotted leader, like a
    // contents page. A long value wraps and stays flush right.
    /* @__PURE__ */ o("dl", { className: "m-0 mt-10 flex flex-col gap-2", children: s.map((l) => /* @__PURE__ */ N("div", { className: "flex items-baseline gap-3 text-sm", children: [
      /* @__PURE__ */ o("dt", { className: `flex-none text-xs uppercase tracking-wider ${Ke}`, children: l.label }),
      /* @__PURE__ */ o(
        "span",
        {
          "aria-hidden": "true",
          className: `min-w-4 flex-1 border-b-hairline border-dotted ${Oe}`
        }
      ),
      /* @__PURE__ */ o("dd", { className: `m-0 text-right leading-relaxed ${ke}`, children: l.value })
    ] }, l.label)) }),
    i && /* @__PURE__ */ N("figure", { className: `mt-12 m-0${Ge(i.width ?? "wide")}`, children: [
      /* @__PURE__ */ o("div", { className: "plate-round p-px bg-[var(--border-hairline)]", children: /* @__PURE__ */ o(Ze, { src: i.src, alt: i.alt, aspect: i.aspect }) }),
      /* @__PURE__ */ o(kt, { caption: i.caption })
    ] })
  ] });
}
function yo({ n: e, section: t }) {
  return /* @__PURE__ */ N("header", { children: [
    /* @__PURE__ */ N("div", { className: "flex gap-3 text-xs uppercase tracking-wider", children: [
      /* @__PURE__ */ o("span", { className: He, children: wt(e) }),
      /* @__PURE__ */ o("span", { className: Ke, children: t.kicker })
    ] }),
    /* @__PURE__ */ o("h2", { className: `m-0 mt-4 text-xl leading-snug sm:text-2xl ${ke}`, children: t.title }),
    t.intro && /* @__PURE__ */ o("p", { className: `m-0 mt-4 text-base leading-relaxed ${_e}`, children: t.intro })
  ] });
}
function wo({
  sections: e,
  slots: t,
  className: r = ""
}) {
  const n = e.filter((s) => !s.hidden);
  let a = 1;
  return /* @__PURE__ */ o("div", { className: `font-mono ${r}`, children: n.map((s, i) => {
    const l = a;
    return a += (s.blocks ?? []).reduce((d, c) => d + br(c), 0), /* @__PURE__ */ N(
      "section",
      {
        id: s.id ?? bo(s.kicker),
        className: "mt-24 first:mt-0 sm:mt-32 sm:first:mt-0",
        children: [
          /* @__PURE__ */ o(yo, { n: i + 1, section: s }),
          s.blocks && s.blocks.length > 0 && /* @__PURE__ */ o(xo, { blocks: s.blocks, slots: t, figureStart: l })
        ]
      },
      s.id ?? s.kicker
    );
  }) });
}
function xs({
  study: e,
  slots: t,
  className: r = ""
}) {
  return /* @__PURE__ */ N("article", { className: `font-mono ${r}`, children: [
    /* @__PURE__ */ o(vo, { study: e }),
    /* @__PURE__ */ o(wo, { sections: e.sections, slots: t, className: "mt-24 sm:mt-32" })
  ] });
}
const ko = re(function({ meta: t, title: r, description: n, titleSuffix: a, thumb: s, thumbPosition: i = "start", selected: l = !1, className: d = "", ...c }, m) {
  const u = "as" in c && c.as ? c.as : null, p = u ? "as" : "href" in c && c.href != null ? "a" : "onClick" in c && c.onClick != null ? "button" : "div", b = `
    block w-full text-left p-3 plate-round
    transition-colors [transition-duration:var(--duration-fast)]
    font-mono
    ${p !== "div" ? "cursor-pointer hover:bg-[var(--surface-muted)] focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]" : ""}
    ${l ? "bg-[var(--surface-muted)]" : ""}
    ${d}
  `, h = /* @__PURE__ */ N(xe, { children: [
    t && /* @__PURE__ */ o("span", { className: "block text-sm text-secondary-700 dark:text-secondary-600", children: t }),
    /* @__PURE__ */ N(
      "span",
      {
        className: `block truncate text-base leading-6 ${p !== "div" ? "text-[var(--accent)]" : "text-[var(--text-primary)]"}`,
        children: [
          r,
          a && /* @__PURE__ */ o("span", { className: "ml-2 leading-none", children: a })
        ]
      }
    ),
    n && /* @__PURE__ */ o("span", { className: "mt-1 block text-sm leading-6 text-secondary-800 dark:text-secondary-500", children: n })
  ] }), f = s ? /* @__PURE__ */ N("span", { className: `flex items-start gap-4 ${i === "end" ? "flex-row-reverse" : ""}`, children: [
    /* @__PURE__ */ o("span", { className: "flex-shrink-0", children: s }),
    /* @__PURE__ */ o("span", { className: "block min-w-0 flex-1", children: h })
  ] }) : h;
  if (u) {
    const { asProps: k, ...x } = c, w = { ...x };
    return delete w.as, /* @__PURE__ */ o(u, { ref: m, className: b, ...w, ...k, children: f });
  }
  if (p === "a") {
    const { href: k, ...x } = c;
    return /* @__PURE__ */ o("a", { ref: m, href: k, className: b, ...x, children: f });
  }
  if (p === "button") {
    const { onClick: k, ...x } = c;
    return /* @__PURE__ */ o("button", { ref: m, type: "button", onClick: k, className: b, ...x, children: f });
  }
  return /* @__PURE__ */ o("div", { ref: m, className: b, ...c, children: f });
});
ko.displayName = "ListRow";
const ft = re(function({ variant: t = "inline", external: r = !1, className: n = "", children: a, ...s }, i) {
  const l = S(
    "font-mono text-[var(--accent)] transition-colors [transition-duration:var(--duration-fast)] hover:text-[var(--text-link-hover)]",
    "focus:outline-none focus-visible:[outline:var(--focus-ring-width)_solid_var(--focus-ring-primary)] focus-visible:[outline-offset:var(--focus-ring-offset)]",
    t === "inline" ? "underline underline-offset-2" : "no-underline hover:underline focus-visible:underline",
    n
  ), d = /* @__PURE__ */ N(xe, { children: [
    a,
    r && /* @__PURE__ */ N(xe, { children: [
      /* @__PURE__ */ o(Q, { name: "ExternalLink", size: "3", className: "ml-1" }),
      /* @__PURE__ */ o("span", { className: "sr-only", children: " (opens in new tab)" })
    ] })
  ] });
  if ("as" in s && s.as) {
    const { as: b, asProps: h } = s;
    return /* @__PURE__ */ o(b, { ref: i, className: l, ...r ? { target: "_blank", rel: "noopener noreferrer" } : void 0, ...h, children: d });
  }
  const { href: c, target: m, rel: u, ...p } = s;
  return /* @__PURE__ */ o(
    "a",
    {
      ref: i,
      href: c,
      className: l,
      target: r ? m ?? "_blank" : m,
      rel: r ? u ?? "noopener noreferrer" : u,
      ...p,
      children: d
    }
  );
});
ft.displayName = "Link";
const No = {
  neutral: "Bell",
  success: "CheckCircle",
  warning: "AlertTriangle",
  error: "AlertCircle",
  info: "Info"
}, $o = {
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
}, Ft = `
  relative shrink-0 inline-flex items-center px-1 font-mono text-sm font-bold cursor-pointer
  before:content-[''] before:absolute before:inset-x-0 before:top-1/2 before:-translate-y-1/2 before:h-touch
  focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]
`;
function So({ children: e, onClick: t, tone: r = "neutral", action: n, duration: a, onDismiss: s }) {
  const [i, l] = G(!1);
  H(() => {
    const x = requestAnimationFrame(() => l(!0));
    return () => cancelAnimationFrame(x);
  }, []);
  const [d, c] = G(!1), [m, u] = G(!1), p = d || m, b = q(s);
  H(() => {
    b.current = s;
  });
  const h = q(a ?? 0);
  H(() => {
    h.current = a ?? 0;
  }, [a]), H(() => {
    if (p || a == null || !Number.isFinite(a) || !b.current) return;
    const x = Date.now(), w = setTimeout(() => {
      var $;
      return ($ = b.current) == null ? void 0 : $.call(b);
    }, Math.max(0, h.current));
    return () => {
      clearTimeout(w), h.current -= Date.now() - x;
    };
  }, [p, a]);
  const f = (x) => {
    x.currentTarget.contains(x.relatedTarget) || u(!1);
  }, g = $o[r], k = a === 1 / 0 && s != null;
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events -- pointer shortcut to dismiss; the dismiss and action buttons are the keyboard path
    /* @__PURE__ */ o(
      "div",
      {
        role: r === "error" ? "alert" : "status",
        onClick: t,
        onMouseEnter: () => c(!0),
        onMouseLeave: () => c(!1),
        onFocus: () => u(!0),
        onBlur: f,
        className: `
        plate-round p-px ${g.ring}
        transition-transform [transition-duration:var(--duration-normal)] [transition-timing-function:steps(5)]
        ${i ? "translate-y-0" : "translate-y-16"}
        ${t ? "cursor-pointer" : ""}
      `,
        children: /* @__PURE__ */ N(
          "div",
          {
            className: `plate-round flex max-w-[min(28rem,calc(100vw-2rem))] items-center gap-2 px-3 py-2.5 font-mono text-sm ${g.fill} ${g.text}`,
            children: [
              /* @__PURE__ */ o("span", { className: `inline-flex shrink-0 ${g.icon}`, children: /* @__PURE__ */ o(Q, { name: No[r], size: "4" }) }),
              /* @__PURE__ */ o("span", { className: "min-w-0 whitespace-nowrap overflow-hidden text-ellipsis", children: e }),
              n && /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  className: `${Ft} underline underline-offset-2`,
                  onClick: (x) => {
                    x.stopPropagation(), n.onClick(), s == null || s();
                  },
                  children: n.label
                }
              ),
              k && /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  "aria-label": "Dismiss notification",
                  className: Ft,
                  onClick: (x) => {
                    x.stopPropagation(), s == null || s();
                  },
                  children: /* @__PURE__ */ o(Q, { name: "X", size: "3" })
                }
              )
            ]
          }
        )
      }
    )
  );
}
const Io = 5e3, Nt = [];
let et = Nt, Co = 0;
const pt = /* @__PURE__ */ new Set();
function gr(e) {
  et = e, pt.forEach((t) => t());
}
function xr(e) {
  return pt.add(e), () => {
    pt.delete(e);
  };
}
const vr = () => et, yr = () => Nt;
function Fe(e, t = {}) {
  const { id: r = `toast-${++Co}`, duration: n = Io, tone: a, ...s } = t, i = { id: r, message: e, duration: n, ...s };
  return a !== void 0 && (i.tone = a), gr([...et.filter((l) => l.id !== r), i]), r;
}
function $t(e) {
  gr(e === void 0 ? Nt : et.filter((t) => t.id !== e));
}
const To = Object.assign(Fe, {
  success: (e, t) => Fe(e, { ...t, tone: "success" }),
  warning: (e, t) => Fe(e, { ...t, tone: "warning" }),
  error: (e, t) => Fe(e, { ...t, tone: "error" }),
  info: (e, t) => Fe(e, { ...t, tone: "info" }),
  dismiss: $t
});
function vs() {
  return { toasts: qt(xr, vr, yr), toast: To, dismiss: $t };
}
function ys({ toasts: e, onDismiss: t }) {
  const r = qt(xr, vr, yr), n = e !== void 0, a = n ? e : r, s = n ? t : $t;
  return /* @__PURE__ */ o(
    "div",
    {
      "aria-live": "polite",
      className: "fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2",
      style: { zIndex: "var(--z-index-popover)" },
      children: a.map((i) => /* @__PURE__ */ o(
        So,
        {
          tone: i.tone,
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
function ws({
  open: e,
  defaultOpen: t = !1,
  onOpenChange: r,
  "aria-label": n,
  closeLabel: a = "Close",
  children: s
}) {
  const [i, l] = je({
    value: e,
    defaultValue: t,
    onChange: r
  }), d = ue(() => {
    i && l(!1);
  }, [i, l]), [c, m] = G(i);
  H(() => {
    i && m(!0);
  }, [i]);
  const u = c && !i, p = q(null), b = q(null), h = i && c;
  return H(() => {
    var f;
    if (h)
      return b.current = document.activeElement, (f = p.current) == null || f.focus(), () => {
        var g;
        (g = b.current) == null || g.focus(), b.current = null;
      };
  }, [h]), mr(p, h), H(() => {
    if (!i) return;
    const f = (g) => {
      g.key === "Escape" && d();
    };
    return document.addEventListener("keydown", f), () => document.removeEventListener("keydown", f);
  }, [i, d]), H(() => (i ? document.body.style.overflow = "hidden" : document.body.style.overflow = "unset", () => {
    document.body.style.overflow = "unset";
  }), [i]), c ? /* @__PURE__ */ N(xe, { children: [
    /* @__PURE__ */ o(
      "div",
      {
        className: `fixed inset-0 bg-[var(--surface-overlay)] ${u ? "animate-out fade-out fill-mode-forwards" : "animate-in fade-in"}`,
        style: { zIndex: "var(--z-index-overlay)", animationDuration: "var(--duration-slow)" },
        onClick: d,
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ o(
      "div",
      {
        ref: p,
        tabIndex: -1,
        role: "dialog",
        "aria-modal": "true",
        "aria-label": n,
        className: `focus:outline-none fixed bottom-0 inset-x-0 mx-auto w-[min(540px,100%)] plate-round-lg-top bg-[var(--surface-container-stroke)] pt-px px-px ${u ? "animate-out slide-out-to-bottom fill-mode-forwards" : "animate-in slide-in-from-bottom"}`,
        style: { zIndex: "var(--z-index-modal)", animationDuration: "var(--duration-slow)" },
        onAnimationEnd: () => {
          u && m(!1);
        },
        children: /* @__PURE__ */ N("div", { className: "plate-round-lg-top bg-[var(--surface-card)] px-5 pb-6 pt-1 flex flex-col items-center gap-3 max-h-[70vh]", children: [
          /* @__PURE__ */ N("div", { className: "relative flex h-touch w-full shrink-0 items-center justify-center", children: [
            /* @__PURE__ */ o("div", { className: "w-9 h-1 bg-[var(--surface-container-stroke)]", "aria-hidden": "true" }),
            /* @__PURE__ */ o(
              "button",
              {
                type: "button",
                onClick: d,
                "aria-label": a,
                className: "absolute right-0 top-0 inline-flex h-touch w-touch items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors [transition-duration:var(--duration-fast)] focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]",
                children: /* @__PURE__ */ o(Q, { name: "X", size: "4" })
              }
            )
          ] }),
          /* @__PURE__ */ o("div", { className: "w-full overflow-y-auto", tabIndex: 0, children: s })
        ] })
      }
    )
  ] }) : null;
}
function ks() {
  const { resolvedTheme: e, setTheme: t } = Dr(), [r, n] = G(!1);
  if (H(() => {
    n(!0);
  }, []), !r)
    return /* @__PURE__ */ N("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ o("div", { className: "w-11 h-6 rounded-none bg-[var(--field-border)]" }),
      /* @__PURE__ */ o("span", { className: "text-sm font-mono text-[var(--text-secondary)]", children: "Theme" })
    ] });
  const a = e === "dark", s = a ? "Dark" : "Light", i = a ? "light" : "dark";
  return /* @__PURE__ */ N("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ o(
      pr,
      {
        checked: a,
        onCheckedChange: () => {
          t(i);
        },
        size: "sm",
        icon: a ? /* @__PURE__ */ o(Q, { name: "Moon", size: "3", className: "text-[var(--border-focus)]" }) : /* @__PURE__ */ o(Q, { name: "Sun", size: "3", className: "text-[var(--text-secondary)]" }),
        "aria-label": `Switch to ${i} theme`
      }
    ),
    /* @__PURE__ */ o("span", { className: "text-sm font-mono text-[var(--text-primary)]", children: s })
  ] });
}
const wr = De(null);
function St(e) {
  const t = Ie(wr);
  if (!t)
    throw new Error(`[@scorp-ds/components] ${e} must be used inside <Tabs>.`);
  return t;
}
function Ns({
  value: e,
  defaultValue: t,
  onValueChange: r,
  children: n,
  className: a
}) {
  const s = e !== void 0, [i, l] = G(() => t ?? ""), d = s ? e : i, c = ce().replace(/:/g, ""), m = q([]), u = ue(
    (b) => {
      s || l(b), r == null || r(b);
    },
    [s, r]
  ), p = Pe(
    () => ({
      value: d,
      onValueChange: u,
      baseId: c,
      listValuesRef: m,
      isControlled: s
    }),
    [d, u, c, s]
  );
  return /* @__PURE__ */ o(wr.Provider, { value: p, children: /* @__PURE__ */ o("div", { className: S("w-full", a), children: n }) });
}
function Eo(e) {
  const t = [];
  return $e.Children.forEach(e, (r) => {
    if (!$e.isValidElement(r)) return;
    if (r.type.displayName === "TabsTrigger") {
      const a = r.props.value;
      typeof a == "string" && t.push(a);
    }
  }), t;
}
function _o({
  children: e,
  className: t,
  "aria-label": r,
  "aria-labelledby": n
}) {
  const { value: a, isControlled: s, onValueChange: i, listValuesRef: l } = St("TabsList"), d = Eo(e);
  l.current = d;
  const c = d.join("\0");
  return Ae(() => {
    const m = l.current;
    s || m.length === 0 || m.includes(a) || i(m[0]);
  }, [s, l, i, a, c]), /* @__PURE__ */ o(
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
_o.displayName = "TabsList";
const Ao = re(function({ value: t, children: r, className: n, disabled: a, onKeyDown: s, onClick: i, type: l = "button", ...d }, c) {
  const { value: m, onValueChange: u, baseId: p, listValuesRef: b } = St("TabsTrigger"), h = m === t, f = `${p}-tab-${t}`, g = `${p}-panel-${t}`, k = (z) => {
    u(z), requestAnimationFrame(() => {
      var v;
      (v = document.getElementById(`${p}-tab-${z}`)) == null || v.focus();
    });
  }, x = (z) => {
    const v = document.getElementById(`${p}-tab-${z}`);
    return v == null || !v.disabled;
  }, w = (z) => {
    const v = b.current, T = v.indexOf(t);
    if (T < 0) return null;
    for (let O = 1; O <= v.length; O += 1) {
      const U = v[((T + z * O) % v.length + v.length) % v.length];
      if (U !== t && x(U)) return U;
    }
    return null;
  }, $ = (z, v) => {
    const T = b.current;
    for (let O = z; O >= 0 && O < T.length; O += v)
      if (x(T[O])) return T[O];
    return null;
  }, I = (z) => {
    const v = w(z);
    v && k(v);
  }, E = (z) => {
    if (s == null || s(z), z.defaultPrevented || a) return;
    const v = b.current;
    switch (z.key) {
      case "ArrowRight":
      case "ArrowDown":
        z.preventDefault(), I(1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        z.preventDefault(), I(-1);
        break;
      case "Home": {
        z.preventDefault();
        const T = $(0, 1);
        T && k(T);
        break;
      }
      case "End": {
        z.preventDefault();
        const T = $(v.length - 1, -1);
        T && k(T);
        break;
      }
    }
  };
  return /* @__PURE__ */ o(
    "button",
    {
      ref: c,
      type: l,
      role: "tab",
      id: f,
      "aria-selected": h,
      "aria-controls": g,
      tabIndex: h ? 0 : -1,
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
        h ? "border-[var(--button-primary-background)] bg-transparent text-[var(--text-primary)]" : "border-transparent text-secondary-700 hover:text-[var(--text-primary)] dark:text-secondary-300",
        a && "cursor-not-allowed opacity-50",
        n
      ),
      onClick: (z) => {
        i == null || i(z), !z.defaultPrevented && !a && u(t);
      },
      onKeyDown: E,
      ...d,
      children: r
    }
  );
});
Ao.displayName = "TabsTrigger";
function zo({ value: e, children: t, className: r, forceMount: n = !1 }) {
  const { value: a, baseId: s } = St("TabsContent"), i = a === e, l = `${s}-tab-${e}`, d = `${s}-panel-${e}`;
  return !n && !i ? null : !i && n ? /* @__PURE__ */ o(
    "div",
    {
      id: d,
      role: "tabpanel",
      "aria-labelledby": l,
      hidden: !0,
      className: S("p-4 font-mono outline-none", r),
      children: t
    }
  ) : /* @__PURE__ */ o(
    "div",
    {
      id: d,
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
zo.displayName = "TabsContent";
const Mo = { sm: "size-control-sm", md: "size-control-md", lg: "size-control-lg" }, Ro = { animationTimingFunction: "steps(4, jump-none)" };
function It({ variant: e = "text", lines: t = 1, size: r = "md", animated: n = !0, className: a }) {
  const s = n ? "animate-pulse motion-reduce:animate-none" : "", i = n ? Ro : void 0;
  if (e === "text") {
    const l = Math.max(1, Math.floor(t));
    return /* @__PURE__ */ o("div", { "aria-hidden": "true", "data-skeleton": "text", className: S("flex w-full flex-col gap-2", a), children: Array.from({ length: l }, (d, c) => /* @__PURE__ */ o(
      "span",
      {
        style: i,
        className: S(
          "block h-3 bg-[var(--surface-muted)]",
          l > 1 && c === l - 1 ? "w-3/5" : "w-full",
          s
        )
      },
      c
    )) });
  }
  return /* @__PURE__ */ o(
    "span",
    {
      "aria-hidden": "true",
      "data-skeleton": e,
      style: i,
      className: S(
        "block shrink-0 plate-round bg-[var(--surface-muted)]",
        e === "avatar" ? Mo[r] : "h-24 w-full",
        s,
        a
      )
    }
  );
}
It.displayName = "Skeleton";
const Lo = typeof window < "u" ? Ae : H, kr = {
  compact: "px-3 py-2",
  // 12 / 8
  comfortable: "px-4 py-3",
  // 16 / 12
  spacious: "px-5 py-4"
  // 20 / 16
}, Ct = De("compact"), Nr = De(null), Oo = re(function({ className: t, striped: r, bordered: n, density: a = "compact", children: s, "aria-busy": i, ...l }, d) {
  const [c, m] = G(0), u = ue((b) => m((h) => h + b), []), p = /* @__PURE__ */ o(Nr.Provider, { value: u, children: /* @__PURE__ */ o(Ct.Provider, { value: a, children: /* @__PURE__ */ o(
    "table",
    {
      ref: d,
      "aria-busy": i ?? (c > 0 ? !0 : void 0),
      className: S(
        "w-full border-collapse font-mono text-sm text-[var(--text-primary)]",
        r && "[&_tbody_tr:nth-child(even)]:bg-[var(--surface-subtle)]",
        t
      ),
      ...l,
      children: s
    }
  ) }) });
  return n ? /* @__PURE__ */ o("div", { className: "plate-round-lg p-px bg-[var(--surface-container-stroke)]", children: /* @__PURE__ */ o("div", { className: "plate-round-lg bg-[var(--surface-card)]", children: p }) }) : p;
});
Oo.displayName = "Table";
const Po = re(function({ className: t, ...r }, n) {
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
Po.displayName = "TableHeader";
const Do = re(function({ className: t, loading: r = !1, loadingRows: n = 3, emptyState: a, colSpan: s, children: i, ...l }, d) {
  const c = Ie(Nr), m = q(null), u = ue(
    (x) => {
      m.current = x, typeof d == "function" ? d(x) : d && (d.current = x);
    },
    [d]
  ), p = !r && a != null && Kt.toArray(i).length === 0, b = r || p, [h, f] = G(1);
  Lo(() => {
    var $, I, E;
    if (!b || s != null) return;
    const x = (E = (I = ($ = m.current) == null ? void 0 : $.closest("table")) == null ? void 0 : I.tHead) == null ? void 0 : E.rows[0];
    if (!x) return;
    const w = Array.from(x.cells).reduce((z, v) => z + v.colSpan, 0);
    f(Math.max(1, w));
  }, [b, s]);
  const g = Math.max(1, s ?? h);
  H(() => {
    if (!(!r || !c))
      return c(1), () => c(-1);
  }, [r, c]);
  let k = i;
  if (r) {
    const x = Math.max(1, Math.floor(n));
    k = Array.from({ length: x }, (w, $) => /* @__PURE__ */ o(bt, { "aria-hidden": "true", "data-table-loading-row": "", children: Array.from({ length: g }, (I, E) => /* @__PURE__ */ o(ht, { children: /* @__PURE__ */ o("div", { className: "flex h-5 items-center", children: /* @__PURE__ */ o(It, {}) }) }, E)) }, $));
  } else p && (k = /* @__PURE__ */ o(bt, { "data-table-empty-row": "", children: /* @__PURE__ */ o(ht, { colSpan: g, className: "text-center", children: a }) }));
  return /* @__PURE__ */ o("tbody", { ref: u, className: S(t), ...l, children: k });
});
Do.displayName = "TableBody";
const jo = re(function({ className: t, ...r }, n) {
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
jo.displayName = "TableFooter";
const bt = re(function({ className: t, ...r }, n) {
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
bt.displayName = "TableRow";
const Bo = re(function({ className: t, scope: r = "col", ...n }, a) {
  const s = Ie(Ct);
  return /* @__PURE__ */ o(
    "th",
    {
      ref: a,
      scope: r,
      className: S(
        kr[s],
        "text-left font-bold text-[var(--text-primary)]",
        t
      ),
      ...n
    }
  );
});
Bo.displayName = "TableHead";
const ht = re(function({ className: t, ...r }, n) {
  const a = Ie(Ct);
  return /* @__PURE__ */ o(
    "td",
    {
      ref: n,
      className: S(
        kr[a],
        "align-middle text-secondary-800 dark:text-secondary-200",
        t
      ),
      ...r
    }
  );
});
ht.displayName = "TableCell";
const Fo = {
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
function Vo(e, t, r, n, a) {
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
function Go(e, t, r, n, a) {
  return Qe(e) ? t === "start" ? r.left : t === "end" ? r.left + r.width - n : r.left + r.width / 2 - n / 2 : t === "start" ? r.top : t === "end" ? r.top + r.height - a : r.top + r.height / 2 - a / 2;
}
const Vt = (e, t, r) => r < t ? t : Math.min(Math.max(e, t), r);
function Ho({
  anchor: e,
  floating: t,
  side: r = "bottom",
  align: n = "start",
  offset: a = 8,
  padding: s = 8,
  viewport: i,
  flip: l = !0
}) {
  const d = (i == null ? void 0 : i.width) ?? (typeof window < "u" ? window.innerWidth : 0), c = (i == null ? void 0 : i.height) ?? (typeof window < "u" ? window.innerHeight : 0), { width: m, height: u } = t;
  let p = r;
  const b = Qe(r) ? u : m, h = st(r, e, d, c, a, s);
  if (l && h < b) {
    const w = Fo[r];
    st(w, e, d, c, a, s) > h && (p = w);
  }
  const f = Vo(p, e, m, u, a), g = Go(p, n, e, m, u), k = Qe(p) ? f : Vt(g, s, c - u - s), x = Qe(p) ? Vt(g, s, d - m - s) : f;
  return {
    top: k,
    left: x,
    side: p,
    align: n,
    available: Math.max(0, st(p, e, d, c, a, s))
  };
}
const Wo = typeof window < "u" ? Ae : H;
function Uo({
  open: e,
  anchorRef: t,
  floatingRef: r,
  side: n = "bottom",
  align: a = "start",
  offset: s = 8,
  padding: i = 8
}) {
  const [l, d] = G(null), c = ue(() => {
    const m = t.current, u = r.current;
    if (!m || !u) return;
    const p = m.getBoundingClientRect(), b = u.getBoundingClientRect(), h = Ho({
      anchor: { top: p.top, left: p.left, width: p.width, height: p.height },
      floating: { width: b.width, height: b.height },
      side: n,
      align: a,
      offset: s,
      padding: i
    });
    d(
      (f) => f && f.top === h.top && f.left === h.left && f.side === h.side && f.available === h.available && f.anchorWidth === p.width ? f : { ...h, anchorWidth: p.width }
    );
  }, [t, r, n, a, s, i]);
  return Wo(() => {
    if (!e) {
      d(null);
      return;
    }
    c(), window.addEventListener("scroll", c, !0), window.addEventListener("resize", c);
    let m;
    return typeof ResizeObserver < "u" && (m = new ResizeObserver(() => c()), t.current && m.observe(t.current), r.current && m.observe(r.current)), () => {
      window.removeEventListener("scroll", c, !0), window.removeEventListener("resize", c), m == null || m.disconnect();
    };
  }, [e, c]), { position: l, update: c };
}
const Ko = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function $r({
  open: e,
  defaultOpen: t = !1,
  onOpenChange: r,
  trigger: n,
  anchorRef: a,
  children: s,
  side: i = "bottom",
  align: l = "start",
  offset: d = 8,
  closeOnOutsideClick: c = !0,
  closeOnEscape: m = !0,
  autoFocus: u = !0,
  returnFocus: p = !0,
  matchAnchorWidth: b = !1,
  role: h = "dialog",
  "aria-label": f,
  "aria-labelledby": g,
  id: k,
  className: x,
  contentClassName: w,
  triggerWrapperClassName: $,
  portal: I = !1
}) {
  const [E, z] = je({
    value: e,
    defaultValue: t,
    onChange: r
  }), v = ce(), T = k ?? `${v}-popover`, O = q(null), U = q(null), Y = q("programmatic"), te = Pe(
    () => ({
      get current() {
        var _;
        return (a == null ? void 0 : a.current) ?? ((_ = O.current) == null ? void 0 : _.firstElementChild) ?? O.current;
      }
    }),
    [a]
  ), { position: D } = Uo({ open: E, anchorRef: te, floatingRef: U, side: i, align: l, offset: d }), Z = (_) => {
    Y.current = _, z(!1);
  }, ne = (_) => {
    var j, L, V;
    return _ != null && (((j = U.current) == null ? void 0 : j.contains(_)) || ((L = O.current) == null ? void 0 : L.contains(_)) || ((V = a == null ? void 0 : a.current) == null ? void 0 : V.contains(_)) || !1);
  };
  H(() => {
    if (!E || !c) return;
    const _ = (j) => {
      ne(j.target) || Z("outside");
    };
    return document.addEventListener("mousedown", _), () => document.removeEventListener("mousedown", _);
  }, [E, c]), H(() => {
    if (!E || !m) return;
    const _ = (j) => {
      if (j.key !== "Escape") return;
      const L = j.target;
      (ne(L) || L === document.body || L === document.documentElement) && Z("escape");
    };
    return document.addEventListener("keydown", _), () => document.removeEventListener("keydown", _);
  }, [E, m]);
  const oe = q(E);
  H(() => {
    var _;
    if (E && !oe.current && (Y.current = "programmatic", u && U.current && (U.current.querySelector(Ko) ?? U.current).focus({ preventScroll: !0 })), !E && oe.current && p) {
      const j = Y.current, L = document.activeElement, V = L == null || L === document.body;
      j !== "outside" && j !== "blur" && (V || ne(L)) && ((_ = te.current) == null || _.focus({ preventScroll: !0 }));
    }
    oe.current = E;
  }, [E]);
  const ie = (_) => {
    const j = _.relatedTarget;
    j && !ne(j) && Z("blur");
  }, C = n && We(n) ? gt(
    n,
    {
      "aria-expanded": E,
      "aria-controls": E ? T : void 0,
      "aria-haspopup": h === "dialog" ? "dialog" : void 0,
      onClick: (_) => {
        var j, L;
        (L = (j = n.props).onClick) == null || L.call(j, _), !_.defaultPrevented && (E ? Z("trigger") : z(!0));
      }
    }
  ) : null, y = (_) => I && typeof document < "u" ? Br(_, document.body) : _, P = {
    position: "fixed",
    top: (D == null ? void 0 : D.top) ?? 0,
    left: (D == null ? void 0 : D.left) ?? 0,
    zIndex: "var(--z-index-popover)",
    minWidth: b && D ? D.anchorWidth : void 0,
    animationDuration: "var(--duration-fast)",
    // Exposed so content can cap its height to the room on the chosen side
    "--popover-available-height": D ? `${D.available}px` : void 0
  };
  return /* @__PURE__ */ N(xe, { children: [
    C && /* @__PURE__ */ o("span", { ref: O, className: S("inline-flex", $), children: C }),
    E && y(
      /* @__PURE__ */ o(
        "div",
        {
          ref: U,
          id: T,
          role: h ?? void 0,
          "aria-label": h ? f : void 0,
          "aria-labelledby": h ? g : void 0,
          tabIndex: -1,
          "data-side": (D == null ? void 0 : D.side) ?? i,
          "data-align": l,
          onBlur: ie,
          style: P,
          className: S(
            "w-max max-w-[calc(100vw-1rem)] plate-round p-px bg-[var(--surface-container-stroke)] focus:outline-none",
            "animate-in fade-in motion-reduce:animate-none",
            // Measured before it is shown, so it never flashes at 0,0
            D ? "opacity-100" : "opacity-0",
            x
          ),
          children: /* @__PURE__ */ o(
            "div",
            {
              className: S(
                "plate-round bg-[var(--surface-card)] p-4 font-mono text-sm text-[var(--text-primary)]",
                w
              ),
              children: s
            }
          )
        }
      )
    )
  ] });
}
$r.displayName = "Popover";
const qo = (e, t) => e.label.toLowerCase().includes(t.trim().toLowerCase()), Xo = re(function({
  options: t,
  value: r,
  defaultValue: n = null,
  onValueChange: a,
  onInputChange: s,
  filter: i = qo,
  emptyText: l = "No matches",
  size: d = "md",
  label: c,
  helperText: m,
  errorMessage: u,
  error: p = !1,
  openOnFocus: b = !1,
  portal: h = !1,
  disabled: f = !1,
  placeholder: g,
  name: k,
  id: x,
  className: w,
  "aria-describedby": $,
  "aria-label": I,
  onKeyDown: E,
  onFocus: z,
  onBlur: v,
  ...T
}, O) {
  const U = Me({ error: p, helperText: m, errorMessage: u, describedBy: $ }), Y = ce(), te = x ?? `${Y}-input`, D = `${Y}-listbox`, Z = `${Y}-label`, ne = `${Y}-empty`, oe = (A) => `${Y}-option-${A}`, [ie, C] = je({
    value: r,
    defaultValue: n
  }), y = t.find((A) => A.value === ie) ?? null, [P, _] = G(!1), [j, L] = G((y == null ? void 0 : y.label) ?? ""), [V, K] = G(!1), [ee, X] = G(-1), J = q(null), ve = q(null), me = q(null);
  H(() => {
    P || L((y == null ? void 0 : y.label) ?? "");
  }, [y == null ? void 0 : y.label, P]);
  const B = Pe(
    () => V && j !== "" ? t.filter((A) => i(A, j)) : t,
    [V, j, t, i]
  ), F = B.map((A, ae) => A.disabled ? -1 : ae).filter((A) => A >= 0), se = F[0] ?? -1, ye = F[F.length - 1] ?? -1, be = (A, ae) => {
    if (F.length === 0) return -1;
    const he = F.indexOf(A);
    if (he === -1) return ae === 1 ? se : ye;
    const Te = (he + ae + F.length) % F.length;
    return F[Te];
  }, de = (A) => {
    if (f) return;
    _(!0);
    const ae = y ? B.findIndex((he) => he.value === y.value && !he.disabled) : -1;
    X(A === "selected" ? ae >= 0 ? ae : se : A === "first" ? se : A === "last" ? ye : -1);
  }, fe = () => {
    _(!1), K(!1), X(-1), L((y == null ? void 0 : y.label) ?? "");
  }, Re = (A) => {
    C((A == null ? void 0 : A.value) ?? null), ((A == null ? void 0 : A.value) ?? null) !== ie && (a == null || a((A == null ? void 0 : A.value) ?? null, A)), L((A == null ? void 0 : A.label) ?? ""), K(!1), _(!1), X(-1);
  };
  H(() => {
    var ae;
    if (!P || ee < 0) return;
    const A = document.getElementById(oe(ee));
    (ae = A == null ? void 0 : A.scrollIntoView) == null || ae.call(A, { block: "nearest" });
  }, [P, ee]);
  const tt = (A) => {
    const ae = A.target.value;
    if (L(ae), K(!0), s == null || s(ae), !f) {
      _(!0);
      const he = ae === "" ? t : t.filter((Te) => i(Te, ae));
      X(he.findIndex((Te) => !Te.disabled));
    }
  }, zr = (A) => {
    if (E == null || E(A), !(A.defaultPrevented || f))
      switch (A.key) {
        case "ArrowDown":
          A.preventDefault(), P ? X((ae) => be(ae, 1)) : de(A.altKey ? "none" : "selected");
          break;
        case "ArrowUp":
          A.preventDefault(), P ? X((ae) => be(ae, -1)) : de(y ? "selected" : "last");
          break;
        case "Home":
          P && F.length && (A.preventDefault(), X(se));
          break;
        case "End":
          P && F.length && (A.preventDefault(), X(ye));
          break;
        case "Enter":
          P && ee >= 0 && B[ee] && !B[ee].disabled && (A.preventDefault(), Re(B[ee]));
          break;
        case "Escape":
          P ? (A.preventDefault(), fe()) : (j !== "" || ie != null) && (A.preventDefault(), Re(null));
          break;
        case "Tab":
          P && fe();
          break;
      }
  }, Mr = (A) => {
    ve.current = A, typeof O == "function" ? O(A) : O && (O.current = A);
  }, Et = {
    sm: { input: "h-control-sm pl-3 pr-9", icon: "right-3" },
    md: { input: "h-control-md pl-4 pr-10", icon: "right-4" },
    lg: { input: "h-control-lg pl-5 pr-11", icon: "right-5" }
  }[d], rt = U.invalid, Rr = rt ? "bg-[var(--field-border-error)] focus-within:!bg-[var(--field-border-focus)]" : "bg-[var(--field-border)] hover:bg-[var(--field-border-hover)] focus-within:!bg-[var(--field-border-focus)]", qe = c != null && c !== "", Lr = P && ee >= 0 && B[ee] ? oe(ee) : void 0;
  return /* @__PURE__ */ N("div", { className: S("w-full", w), children: [
    /* @__PURE__ */ N("div", { className: "w-full space-y-1", children: [
      qe && /* @__PURE__ */ o(
        "label",
        {
          id: Z,
          htmlFor: te,
          className: "block font-mono text-sm text-secondary-800 dark:text-secondary-200",
          children: c
        }
      ),
      /* @__PURE__ */ N(
        "div",
        {
          ref: J,
          className: S(
            "relative w-full plate-round p-px transition-colors [transition-duration:var(--duration-fast)]",
            Rr,
            f && "opacity-50"
          ),
          children: [
            /* @__PURE__ */ o(
              "input",
              {
                ...T,
                ref: Mr,
                id: te,
                type: "text",
                role: "combobox",
                autoComplete: "off",
                "aria-autocomplete": "list",
                "aria-expanded": P,
                "aria-controls": P ? B.length > 0 ? D : ne : void 0,
                "aria-activedescendant": Lr,
                "aria-invalid": rt || void 0,
                "aria-describedby": U.describedBy,
                "aria-label": qe ? void 0 : I,
                disabled: f,
                placeholder: g,
                value: j,
                onChange: tt,
                onKeyDown: zr,
                onClick: () => {
                  P || de("selected");
                },
                onFocus: (A) => {
                  z == null || z(A), b && !P && de("selected");
                },
                onBlur: (A) => {
                  v == null || v(A), P && fe();
                },
                className: S(
                  "w-full plate-round font-mono text-sm",
                  "transition-colors [transition-duration:var(--duration-fast)]",
                  "placeholder:text-[var(--field-placeholder)] focus:outline-none disabled:cursor-not-allowed",
                  rt ? "bg-[var(--field-background-error)] text-[var(--text-primary)]" : "bg-[var(--field-background)] text-[var(--text-primary)]",
                  Et.input
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
                  P && "rotate-180",
                  Et.icon
                ),
                children: /* @__PURE__ */ o(Q, { name: "ChevronDown" })
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ o(Se, { ...U.message })
    ] }),
    k != null && /* @__PURE__ */ o("input", { type: "hidden", name: k, value: ie ?? "" }),
    /* @__PURE__ */ o(
      $r,
      {
        open: P,
        onOpenChange: (A) => {
          A || fe();
        },
        anchorRef: J,
        role: null,
        autoFocus: !1,
        returnFocus: !1,
        closeOnEscape: !1,
        matchAnchorWidth: !0,
        portal: h,
        offset: 4,
        contentClassName: "p-0",
        children: B.length > 0 ? /* @__PURE__ */ o(
          "ul",
          {
            ref: me,
            id: D,
            role: "listbox",
            "aria-labelledby": qe ? Z : void 0,
            "aria-label": qe ? void 0 : I,
            className: "max-h-[min(var(--control-menu-max-height),var(--popover-available-height,var(--control-menu-max-height)))] overflow-y-auto py-1",
            children: B.map((A, ae) => {
              const he = A.value === ie, Te = ae === ee;
              return (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events -- pointer path only; the keyboard selects through the input with aria-activedescendant
                /* @__PURE__ */ N(
                  "li",
                  {
                    id: oe(ae),
                    role: "option",
                    "aria-selected": he,
                    "aria-disabled": A.disabled || void 0,
                    onMouseDown: (Or) => Or.preventDefault(),
                    onMouseMove: () => {
                      !A.disabled && ee !== ae && X(ae);
                    },
                    onClick: () => {
                      A.disabled || Re(A);
                    },
                    className: S(
                      "flex min-h-touch items-center gap-2 px-4 py-2 font-mono text-sm",
                      A.disabled ? "cursor-not-allowed text-[var(--text-disabled)]" : "cursor-pointer text-[var(--text-primary)]",
                      Te && !A.disabled && "bg-[var(--surface-subtle)]"
                    ),
                    children: [
                      /* @__PURE__ */ o("span", { className: "min-w-0 flex-1 truncate", children: A.label }),
                      he && /* @__PURE__ */ o(Q, { name: "Check", className: "shrink-0 text-[var(--border-focus)]" })
                    ]
                  },
                  A.value
                )
              );
            })
          }
        ) : /* @__PURE__ */ o("div", { id: ne, role: "status", className: "px-4 py-3 font-mono text-sm text-[var(--text-secondary)]", children: l })
      }
    )
  ] });
});
Xo.displayName = "Combobox";
const Yo = {
  primary: "bg-primary-500 dark:bg-primary-400",
  neutral: "bg-secondary-600 dark:bg-secondary-400",
  info: "bg-info-600 dark:bg-info-400",
  success: "bg-success-600 dark:bg-success-400",
  warning: "bg-warning-600 dark:bg-warning-400",
  error: "bg-error-600 dark:bg-error-400"
}, Zo = { sm: "h-2", md: "h-3", lg: "h-4" }, Gt = 4;
function Qo() {
  if (typeof window > "u" || typeof getComputedStyle != "function") return 120;
  const e = getComputedStyle(document.documentElement).getPropertyValue("--duration-fast").trim(), t = e.endsWith("ms") ? parseFloat(e) : e.endsWith("s") ? parseFloat(e) * 1e3 : NaN;
  return Number.isFinite(t) && t > 0 ? t : 120;
}
function Jo() {
  const e = "(prefers-reduced-motion: reduce)", [t, r] = G(
    () => typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia(e).matches
  );
  return H(() => {
    var s;
    if (typeof window.matchMedia != "function") return;
    const n = window.matchMedia(e), a = () => r(n.matches);
    return (s = n.addEventListener) == null || s.call(n, "change", a), () => {
      var i;
      return (i = n.removeEventListener) == null ? void 0 : i.call(n, "change", a);
    };
  }, []), t;
}
function ea({
  value: e,
  max: t = 100,
  label: r,
  showLabel: n = !0,
  showValue: a = !0,
  size: s = "md",
  tone: i = "primary",
  segments: l = 20,
  className: d
}) {
  const c = ce(), m = e == null || Number.isNaN(e), u = t > 0 ? t : 100, p = m ? 0 : Math.min(Math.max(e, 0), u), b = Math.round(p / u * 100), h = Math.floor(p / u * l), f = Jo(), [g, k] = G(0);
  H(() => {
    if (!m || f) return;
    const w = window.setInterval(() => k(($) => ($ + 1) % (l + Gt)), Qo());
    return () => window.clearInterval(w);
  }, [m, f, l]);
  const x = (w) => m ? f ? !0 : w > g - Gt - 1 && w <= g - 1 : w < h;
  return /* @__PURE__ */ N("div", { className: S("w-full space-y-1.5 font-mono", d), children: [
    n && /* @__PURE__ */ N("div", { className: "flex items-baseline justify-between gap-3 text-sm", children: [
      /* @__PURE__ */ o("span", { id: c, className: "min-w-0 truncate text-[var(--text-primary)]", children: r }),
      a && !m && /* @__PURE__ */ N("span", { className: "shrink-0 tabular-nums text-[var(--text-secondary)]", "aria-hidden": "true", children: [
        b,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ o(
      "div",
      {
        role: "progressbar",
        "aria-labelledby": n ? c : void 0,
        "aria-label": n ? void 0 : r,
        "aria-valuemin": 0,
        "aria-valuemax": u,
        "aria-valuenow": m ? void 0 : p,
        "aria-valuetext": m ? void 0 : `${b}%`,
        "data-state": m ? "indeterminate" : p >= u ? "complete" : "loading",
        "data-tone": i,
        className: "bg-[var(--border-default)] p-px",
        children: /* @__PURE__ */ o(
          "div",
          {
            className: S("flex gap-0.5 bg-[var(--surface-subtle)] p-0.5", Zo[s]),
            "aria-hidden": "true",
            children: Array.from({ length: l }, (w, $) => /* @__PURE__ */ o(
              "span",
              {
                "data-filled": x($) || void 0,
                className: S(
                  "h-full flex-1",
                  x($) ? Yo[i] : "bg-[var(--surface-muted)]",
                  m && f && "opacity-50"
                )
              },
              $
            ))
          }
        )
      }
    )
  ] });
}
ea.displayName = "ProgressBar";
const ta = {
  sm: { root: "gap-3 px-4 py-6", icon: "6", plate: "p-2", title: "text-sm", description: "text-xs", button: "sm" },
  md: { root: "gap-4 px-6 py-12", icon: "8", plate: "p-3", title: "text-lg", description: "text-sm", button: "md" }
};
function ra({
  icon: e = "Archive",
  title: t,
  description: r,
  primaryAction: n,
  secondaryAction: a,
  size: s = "md",
  titleAs: i = "h2",
  children: l,
  className: d
}) {
  const c = ta[s], m = (u, p) => /* @__PURE__ */ o(
    Ue,
    {
      variant: p,
      size: c.button,
      onClick: u.onClick,
      href: u.href,
      iconLeft: u.icon ? pe(u.icon) : void 0,
      children: u.label
    }
  );
  return /* @__PURE__ */ N("div", { className: S("flex flex-col items-center text-center font-mono", c.root, d), children: [
    e && /* @__PURE__ */ o("span", { className: S("inline-flex plate-round bg-[var(--surface-subtle)] text-[var(--text-secondary)]", c.plate), children: pe(e, { size: c.icon }) }),
    /* @__PURE__ */ N("div", { className: "flex max-w-prose flex-col gap-1", children: [
      /* @__PURE__ */ o(i, { className: S("font-medium text-[var(--text-primary)]", c.title), children: t }),
      r && /* @__PURE__ */ o("p", { className: S("text-[var(--text-secondary)]", c.description), children: r })
    ] }),
    (n || a) && /* @__PURE__ */ N("div", { className: "flex flex-wrap items-center justify-center gap-3", children: [
      n && m(n, "primary"),
      a && m(a, "secondary")
    ] }),
    l
  ] });
}
ra.displayName = "EmptyState";
const Sr = De(null), Ir = De(null);
function Cr(e) {
  const t = Ie(Sr);
  if (!t) throw new Error(`${e} must be used inside <Accordion>.`);
  return t;
}
function Tr(e) {
  const t = Ie(Ir);
  if (!t) throw new Error(`${e} must be used inside <AccordionItem>.`);
  return t;
}
function $s(e) {
  const { children: t, headingLevel: r = 3, disabled: n = !1, className: a } = e, s = e.type === "multiple", i = q(null), l = (h) => h === void 0 ? void 0 : Array.isArray(h) ? h : h === "" ? [] : [h], [d, c] = je({
    value: l(e.value),
    defaultValue: l(e.defaultValue) ?? []
  }), m = (h) => {
    var f, g;
    c(h), s ? (f = e.onValueChange) == null || f.call(e, h) : (g = e.onValueChange) == null || g.call(e, h[0] ?? "");
  }, u = s || e.collapsible === !0, p = {
    isOpen: (h) => d.includes(h),
    isLocked: (h) => !u && d.includes(h),
    toggle: (h) => {
      if (d.includes(h)) {
        if (!u) return;
        m(d.filter((f) => f !== h));
      } else
        m(s ? [...d, h] : [h]);
    },
    headingLevel: r,
    disabled: n,
    rootRef: i
  }, b = (h) => {
    var w;
    const f = h.target;
    if (!f.hasAttribute("data-accordion-trigger")) return;
    const g = Array.from(
      ((w = i.current) == null ? void 0 : w.querySelectorAll("[data-accordion-trigger]:not(:disabled)")) ?? []
    ).filter(($) => $.closest("[data-accordion-root]") === i.current), k = g.indexOf(f);
    if (k === -1) return;
    let x = null;
    h.key === "ArrowDown" ? x = (k + 1) % g.length : h.key === "ArrowUp" ? x = (k - 1 + g.length) % g.length : h.key === "Home" ? x = 0 : h.key === "End" && (x = g.length - 1), x !== null && (h.preventDefault(), g[x].focus());
  };
  return /* @__PURE__ */ o(Sr.Provider, { value: p, children: /* @__PURE__ */ o(
    "div",
    {
      ref: i,
      "data-accordion-root": "",
      onKeyDown: b,
      className: S("w-full border-t border-[var(--border-hairline)] font-mono", a),
      children: t
    }
  ) });
}
function Ss({ value: e, disabled: t = !1, children: r, className: n }) {
  const a = Cr("AccordionItem"), s = ce(), i = a.isOpen(e), l = {
    value: e,
    open: i,
    disabled: t || a.disabled,
    triggerId: `${s}-trigger`,
    contentId: `${s}-content`
  };
  return /* @__PURE__ */ o(Ir.Provider, { value: l, children: /* @__PURE__ */ o("div", { "data-state": i ? "open" : "closed", className: S("border-b border-[var(--border-hairline)]", n), children: r }) });
}
function Is({ children: e, className: t }) {
  const r = Cr("AccordionTrigger"), n = Tr("AccordionTrigger"), a = `h${r.headingLevel}`, s = r.isLocked(n.value);
  return /* @__PURE__ */ o(a, { className: "m-0", children: /* @__PURE__ */ N(
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
          Q,
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
function Cs({ children: e, className: t }) {
  const r = Tr("AccordionContent");
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
const na = "focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]";
function oa({
  items: e,
  maxItems: t,
  itemsBeforeCollapse: r = 1,
  itemsAfterCollapse: n = 1,
  expandLabel: a = (l) => `Show ${l} more breadcrumb${l === 1 ? "" : "s"}`,
  "aria-label": s = "Breadcrumb",
  className: i
}) {
  const [l, d] = G(!1), c = q(null), m = q(null), u = Math.max(0, r), p = Math.max(1, n), b = !l && t != null && e.length > t && e.length > u + p, h = b ? e.length - u - p : 0;
  H(() => {
    var w;
    if (!l || m.current == null) return;
    const x = (w = c.current) == null ? void 0 : w.querySelector(
      `[data-crumb-index="${m.current}"] a, [data-crumb-index="${m.current}"] [data-crumb-link]`
    );
    x == null || x.focus(), m.current = null;
  }, [l]);
  const f = e.length - 1, g = (x, w, $) => /* @__PURE__ */ N(
    "li",
    {
      "data-crumb-index": w,
      className: "inline-flex min-w-0 items-center",
      children: [
        $ && /* @__PURE__ */ o(Q, { name: "ChevronRight", size: "3", className: "mx-1 shrink-0 text-[var(--text-secondary)]" }),
        w === f ? /* @__PURE__ */ o(
          "span",
          {
            "aria-current": "page",
            className: "inline-flex min-h-touch min-w-0 items-center truncate px-1 text-[var(--text-primary)]",
            children: x.label
          }
        ) : x.as ? /* @__PURE__ */ o(
          ft,
          {
            variant: "quiet",
            as: x.as,
            asProps: { ...x.asProps, "data-crumb-link": "" },
            className: "inline-flex min-h-touch min-w-0 items-center truncate px-1",
            children: x.label
          }
        ) : /* @__PURE__ */ o(
          ft,
          {
            variant: "quiet",
            href: x.href ?? "#",
            className: "inline-flex min-h-touch min-w-0 items-center truncate px-1",
            children: x.label
          }
        )
      ]
    },
    x.key ?? w
  );
  let k;
  if (b) {
    const x = e.slice(0, u), w = e.slice(e.length - p);
    k = /* @__PURE__ */ N(xe, { children: [
      x.map(($, I) => g($, I, I > 0)),
      /* @__PURE__ */ N("li", { className: "inline-flex items-center", children: [
        u > 0 && /* @__PURE__ */ o(Q, { name: "ChevronRight", size: "3", className: "mx-1 shrink-0 text-[var(--text-secondary)]" }),
        /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            "aria-label": a(h),
            onClick: () => {
              m.current = u, d(!0);
            },
            className: S(
              "plate-round inline-flex h-touch min-w-touch items-center justify-center px-2 text-[var(--text-primary)]",
              "transition-colors [transition-duration:var(--duration-fast)] motion-reduce:transition-none hover:bg-[var(--surface-muted)]",
              na
            ),
            children: /* @__PURE__ */ o("span", { "aria-hidden": "true", children: "..." })
          }
        )
      ] }),
      w.map(($, I) => g($, e.length - p + I, !0))
    ] });
  } else
    k = e.map((x, w) => g(x, w, w > 0));
  return /* @__PURE__ */ o("nav", { "aria-label": s, className: S("font-mono text-sm", i), children: /* @__PURE__ */ o("ol", { ref: c, className: "flex min-w-0 flex-wrap items-center", children: k }) });
}
oa.displayName = "Breadcrumbs";
const it = (e, t) => t < e ? [] : Array.from({ length: t - e + 1 }, (r, n) => e + n);
function aa(e, t, r = 1, n = 1) {
  if (t <= 0) return [];
  const a = Math.min(Math.max(1, e), t), s = it(1, Math.min(n, t)), i = it(Math.max(t - n + 1, n + 1), t), l = Math.max(
    Math.min(a - r, t - n - r * 2 - 1),
    n + 2
  ), d = Math.min(
    Math.max(a + r, n + r * 2 + 2),
    i.length > 0 ? i[0] - 2 : t - 1
  ), c = [...s];
  l > n + 2 ? c.push("ellipsis-start") : n + 1 < t - n && c.push(n + 1), c.push(...it(l, d)), d < t - n - 1 ? c.push("ellipsis-end") : t - n > n && c.push(t - n), c.push(...i);
  const m = /* @__PURE__ */ new Set();
  return c.filter((u) => typeof u == "number" && (u < 1 || u > t) || m.has(u) ? !1 : (m.add(u), !0));
}
const sa = {
  sm: "h-control-sm min-w-control-sm px-2 text-sm",
  md: "h-control-md min-w-control-md px-2.5 text-sm",
  lg: "h-control-lg min-w-control-lg px-3 text-base"
}, Er = {
  sm: "min-h-touch min-w-touch",
  md: "min-h-touch min-w-touch",
  lg: "min-h-control-lg min-w-control-lg"
}, Ht = { sm: "4", md: "4", lg: "5" };
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
        Er[e],
        r ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      ),
      children: /* @__PURE__ */ o(
        "span",
        {
          className: S(
            "plate-round inline-flex items-center justify-center tabular-nums",
            "transition-colors [transition-duration:var(--duration-fast)] motion-reduce:transition-none",
            "group-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]",
            sa[e],
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
function ia({
  page: e,
  defaultPage: t = 1,
  pageCount: r,
  onPageChange: n,
  siblingCount: a = 1,
  boundaryCount: s = 1,
  size: i = "md",
  showPrevNext: l = !0,
  getPageLabel: d = (b) => `Page ${b}`,
  previousLabel: c = "Previous page",
  nextLabel: m = "Next page",
  "aria-label": u = "Pagination",
  className: p
}) {
  const [b, h] = G(t), f = e !== void 0, k = Math.min(Math.max(1, f ? e : b), Math.max(1, r));
  if (r <= 0) return null;
  const x = ($) => {
    const I = Math.min(Math.max(1, $), r);
    I !== k && (f || h(I), n == null || n(I));
  }, w = aa(k, r, a, s);
  return /* @__PURE__ */ o("nav", { "aria-label": u, className: S("font-mono", p), children: /* @__PURE__ */ N("ul", { className: "flex flex-wrap items-center", children: [
    l && /* @__PURE__ */ o("li", { children: /* @__PURE__ */ o(lt, { size: i, label: c, disabled: k <= 1, onClick: () => x(k - 1), children: /* @__PURE__ */ o(Q, { name: "ArrowLeft", size: Ht[i] }) }) }),
    w.map(
      ($) => typeof $ == "number" ? /* @__PURE__ */ o("li", { children: /* @__PURE__ */ o(
        lt,
        {
          size: i,
          current: $ === k,
          label: d($),
          onClick: () => x($),
          children: $
        }
      ) }, $) : /* @__PURE__ */ o(
        "li",
        {
          "aria-hidden": "true",
          className: S(
            "inline-flex items-center justify-center text-[var(--text-secondary)]",
            Er[i],
            i === "lg" ? "text-base" : "text-sm"
          ),
          children: "..."
        },
        $
      )
    ),
    l && /* @__PURE__ */ o("li", { children: /* @__PURE__ */ o(lt, { size: i, label: m, disabled: k >= r, onClick: () => x(k + 1), children: /* @__PURE__ */ o(Q, { name: "ArrowRight", size: Ht[i] }) }) })
  ] }) });
}
ia.displayName = "Pagination";
const Tt = De({ collapsed: !1 });
function la({ "aria-label": e, collapsed: t = !1, children: r, className: n }) {
  const a = $e.Children.toArray(r).some(
    (s) => $e.isValidElement(s) && s.type === _r
  );
  return /* @__PURE__ */ o(Tt.Provider, { value: { collapsed: t }, children: /* @__PURE__ */ o(
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
la.displayName = "SideNav";
function _r({ heading: e, children: t, className: r }) {
  const { collapsed: n } = Ie(Tt), a = ce();
  return /* @__PURE__ */ N(
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
_r.displayName = "SideNavSection";
const ca = "plate-round flex w-full min-h-touch items-center gap-3 px-3 py-2 text-left font-mono text-sm transition-colors [transition-duration:var(--duration-fast)] motion-reduce:transition-none focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]", da = "text-[var(--text-secondary)] hover:bg-[var(--surface-muted)] hover:text-[var(--accent)]", ua = "bg-[var(--surface-muted)] text-[var(--accent)]";
function Ar(e) {
  let t = !1;
  return $e.Children.forEach(e, (r) => {
    if (t || !$e.isValidElement(r)) return;
    const n = r.props;
    (n.active || Ar(n.children)) && (t = !0);
  }), t;
}
function ma({
  label: e,
  icon: t,
  active: r = !1,
  href: n,
  onClick: a,
  as: s,
  asProps: i,
  trailing: l,
  children: d,
  expanded: c,
  defaultExpanded: m,
  onExpandedChange: u,
  className: p
}) {
  const { collapsed: b } = Ie(Tt), h = ce(), f = $e.Children.toArray(d).some($e.isValidElement), [g, k] = G(
    () => m ?? (f && Ar(d))
  ), x = c ?? g, w = () => {
    const v = !x;
    c === void 0 && k(v), u == null || u(v);
  }, $ = /* @__PURE__ */ N(xe, { children: [
    t && pe(t, { className: "shrink-0" }),
    /* @__PURE__ */ o("span", { className: S("min-w-0 flex-1 truncate", b && "sr-only"), children: e }),
    !b && l && /* @__PURE__ */ o("span", { className: "ml-auto shrink-0", children: l }),
    f && /* @__PURE__ */ o(
      Q,
      {
        name: x ? "ChevronDown" : "ChevronRight",
        size: b ? "3" : "4",
        className: S("shrink-0", !b && "ml-auto")
      }
    )
  ] }), I = S(ca, r ? ua : da, b && "min-w-touch justify-center gap-1 px-2", p), E = b ? { "aria-label": e } : {};
  let z;
  return f ? z = /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      "aria-expanded": x,
      "aria-controls": h,
      onClick: w,
      className: I,
      ...E,
      children: $
    }
  ) : s ? z = /* @__PURE__ */ o(
    s,
    {
      className: I,
      "aria-current": r ? "page" : void 0,
      onClick: a,
      ...E,
      ...i,
      children: $
    }
  ) : n != null ? z = /* @__PURE__ */ o(
    "a",
    {
      href: n,
      "aria-current": r ? "page" : void 0,
      onClick: a,
      className: I,
      ...E,
      children: $
    }
  ) : z = /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      "aria-current": r ? "page" : void 0,
      onClick: a,
      className: I,
      ...E,
      children: $
    }
  ), /* @__PURE__ */ N("li", { children: [
    b ? /* @__PURE__ */ o(no, { content: e, side: "right", children: z }) : z,
    f && x && /* @__PURE__ */ o("ul", { id: h, className: S("mt-1 space-y-1", !b && "ml-6"), children: d })
  ] });
}
ma.displayName = "SideNavItem";
function fa({
  brand: e,
  navigation: t,
  actions: r,
  mobileMenu: n,
  sticky: a = !1,
  menuOpen: s,
  defaultMenuOpen: i = !1,
  onMenuOpenChange: l,
  menuLabel: d = "Menu",
  navLabel: c = "Main",
  className: m
}) {
  const u = ce(), [p, b] = G(i), h = s ?? p, f = n ?? t, g = (k) => {
    s === void 0 && b(k), l == null || l(k);
  };
  return /* @__PURE__ */ N(
    "header",
    {
      className: S(
        "w-full border-b border-[var(--border-hairline)] bg-[var(--surface-container)] font-mono text-sm text-[var(--text-primary)]",
        a && "sticky top-0 z-[var(--z-index-sticky)]",
        m
      ),
      children: [
        /* @__PURE__ */ N("div", { className: "flex min-h-control-lg items-center gap-4 px-4 py-1", children: [
          /* @__PURE__ */ o("div", { className: "flex shrink-0 items-center", children: e }),
          t && /* @__PURE__ */ o("nav", { "aria-label": c, className: "hidden min-w-0 flex-1 md:block", children: /* @__PURE__ */ o("div", { className: "flex flex-wrap items-center gap-4", children: t }) }),
          /* @__PURE__ */ N("div", { className: "ml-auto flex shrink-0 items-center gap-2", children: [
            r,
            f && /* @__PURE__ */ o(
              Ue,
              {
                variant: "ghost",
                size: "lg",
                "aria-label": d,
                "aria-expanded": h,
                "aria-controls": u,
                onClick: () => g(!h),
                className: "min-w-touch md:hidden",
                children: /* @__PURE__ */ o(Q, { name: h ? "X" : "Menu", size: "5" })
              }
            )
          ] })
        ] }),
        f && h && /* @__PURE__ */ o("div", { id: u, className: "border-t border-[var(--border-hairline)] px-4 py-3 md:hidden", children: /* @__PURE__ */ o("nav", { "aria-label": c, children: /* @__PURE__ */ o("div", { className: "flex flex-col items-start gap-1", children: f }) }) })
      ]
    }
  );
}
fa.displayName = "AppHeader";
function pa({
  title: e,
  status: t,
  actions: r,
  variant: n = "default",
  titleAs: a = "h2",
  scroll: s = !0,
  children: i,
  className: l,
  bodyClassName: d
}) {
  const c = ce(), m = n === "active";
  return /* @__PURE__ */ o(
    "section",
    {
      "aria-labelledby": c,
      "data-variant": n,
      className: S(
        "plate-round-lg flex flex-col p-px",
        m ? "bg-[var(--accent)]" : "bg-[var(--surface-container-stroke)]",
        l
      ),
      children: /* @__PURE__ */ N("div", { className: "plate-round-lg flex min-h-0 flex-1 flex-col bg-[var(--surface-card)] font-mono", children: [
        /* @__PURE__ */ N(
          "div",
          {
            className: S(
              "flex min-h-control-sm shrink-0 items-center gap-2 border-b border-[var(--border-hairline)] px-4 py-1 text-xs",
              m && "bg-[var(--surface-muted)]"
            ),
            children: [
              m && /* @__PURE__ */ o(Q, { name: "ChevronRight", size: "3", className: "shrink-0 text-[var(--text-primary)]" }),
              /* @__PURE__ */ o(
                a,
                {
                  id: c,
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
            "aria-labelledby": s ? c : void 0,
            className: S(
              "min-h-0 flex-1 p-4 text-sm text-[var(--text-primary)]",
              s && "overflow-auto focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]",
              d
            ),
            children: i
          }
        )
      ] })
    }
  );
}
pa.displayName = "Window";
const ba = 8;
function ha({
  content: e,
  count: t,
  enabled: r = !0,
  onFollowChange: n,
  contentRef: a
}) {
  const s = q(null), [i, l] = G(!0), [d, c] = G(0), m = q(t), u = ue(
    (f) => {
      l((g) => (g !== f && (n == null || n(f)), f));
    },
    [n]
  ), p = ue(() => {
    const f = s.current;
    f && (f.scrollTop = f.scrollHeight);
  }, []);
  Ae(() => {
    const f = t - m.current;
    m.current = t, r && (i ? p() : f > 0 && c((g) => g + f));
  }, [e, t, r, i, p]), Ae(() => {
    const f = a == null ? void 0 : a.current;
    if (!r || !i || !f || typeof ResizeObserver > "u") return;
    const g = new ResizeObserver(() => p());
    return g.observe(f), () => g.disconnect();
  }, [a, r, i, p]);
  const b = ue(() => {
    const f = s.current;
    if (!f || !r) return;
    const g = f.scrollHeight - f.scrollTop - f.clientHeight <= ba;
    u(g), g && c(0);
  }, [r, u]), h = ue(() => {
    c(0), u(!0), p();
  }, [u, p]);
  return { scrollRef: s, onScroll: b, following: i, unseen: d, resume: h };
}
const ga = {
  info: { icon: "Info", tag: "INFO", tone: "text-info-700 dark:text-info-400" },
  warning: { icon: "AlertTriangle", tag: "WARN", tone: "text-warning-700 dark:text-warning-400" },
  error: { icon: "AlertCircle", tag: "ERROR", tone: "text-error-700 dark:text-error-400" },
  debug: { icon: "Settings", tag: "DEBUG", tone: "text-secondary-700 dark:text-secondary-400" }
};
function xa({
  lines: e,
  autoScroll: t = !0,
  showLineNumbers: r = !1,
  wrap: n = !0,
  "aria-label": a = "Log",
  emptyState: s = "No output yet.",
  framed: i = !0,
  onFollowChange: l,
  className: d
}) {
  const { scrollRef: c, onScroll: m, following: u, unseen: p, resume: b } = ha({
    content: e,
    count: e.length,
    enabled: t,
    onFollowChange: l
  }), h = e.some((g) => g.level), f = `${String(Math.max(e.length, 1)).length}ch`;
  return /* @__PURE__ */ N(
    "div",
    {
      className: S(
        "relative flex h-80 flex-col",
        i && "plate-round-lg bg-[var(--surface-container-stroke)] p-px",
        d
      ),
      children: [
        /* @__PURE__ */ o(
          "div",
          {
            ref: c,
            role: "log",
            "aria-live": "polite",
            "aria-label": a,
            tabIndex: 0,
            onScroll: m,
            className: S(
              "min-h-0 flex-1 overflow-auto py-2 font-mono text-xs leading-relaxed text-[var(--text-primary)]",
              i && "plate-round-lg bg-[var(--surface-page)]",
              "focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]"
            ),
            children: e.length === 0 ? /* @__PURE__ */ o("p", { className: "px-3 text-[var(--text-secondary)]", children: s }) : e.map((g, k) => {
              const x = g.level ? ga[g.level] : null;
              return /* @__PURE__ */ N(
                "div",
                {
                  "data-level": g.level,
                  className: S("flex gap-3 px-3", n ? "items-start" : "w-max min-w-full items-start"),
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
                    g.timestamp && /* @__PURE__ */ o("span", { className: "shrink-0 tabular-nums text-[var(--text-secondary)]", children: g.timestamp }),
                    x ? /* @__PURE__ */ N("span", { className: S("inline-flex w-16 shrink-0 items-center gap-1 font-bold", x.tone), children: [
                      /* @__PURE__ */ o(Q, { name: x.icon, size: "3", className: "shrink-0" }),
                      x.tag
                    ] }) : h && /* @__PURE__ */ o("span", { "aria-hidden": "true", className: "w-16 shrink-0" }),
                    /* @__PURE__ */ o("span", { className: S("min-w-0 flex-1", n ? "whitespace-pre-wrap break-words" : "whitespace-pre"), children: g.text })
                  ]
                },
                g.id
              );
            })
          }
        ),
        t && !u && /* @__PURE__ */ o("div", { className: "pointer-events-none absolute inset-x-0 bottom-3 flex justify-center", children: /* @__PURE__ */ o(
          Ue,
          {
            variant: "secondary",
            size: "sm",
            onClick: b,
            iconLeft: /* @__PURE__ */ o(Q, { name: "ChevronDown", size: "4" }),
            className: "pointer-events-auto",
            children: p > 0 ? `Jump to latest (${p} new)` : "Jump to latest"
          }
        ) })
      ]
    }
  );
}
xa.displayName = "LogView";
const va = {
  neutral: "text-[var(--text-primary)]",
  primary: "bg-[var(--button-primary-background)] text-[var(--button-primary-text)] font-bold",
  success: "bg-success-50 text-success-800 dark:bg-success-950 dark:text-success-300",
  warning: "bg-warning-50 text-warning-800 dark:bg-warning-950 dark:text-warning-300",
  error: "bg-error-50 text-error-800 dark:bg-error-950 dark:text-error-300",
  info: "bg-info-50 text-info-800 dark:bg-info-950 dark:text-info-300"
};
function ya({
  left: e,
  center: t,
  right: r,
  live: n = !1,
  "aria-label": a = "Status",
  className: s
}) {
  return /* @__PURE__ */ N(
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
ya.displayName = "StatusLine";
function wa({ icon: e, tone: t = "neutral", children: r, className: n }) {
  return /* @__PURE__ */ N(
    "span",
    {
      "data-tone": t,
      className: S("inline-flex min-w-0 items-center gap-1.5 whitespace-nowrap px-3", va[t], n),
      children: [
        e && pe(e, { size: "3", className: "shrink-0" }),
        /* @__PURE__ */ o("span", { className: "truncate", children: r })
      ]
    }
  );
}
wa.displayName = "StatusLineSegment";
function ka({ items: e, layout: t = "inline", leader: r = !1, className: n }) {
  const a = t === "inline";
  return /* @__PURE__ */ o(
    "dl",
    {
      "data-layout": t,
      className: S("font-mono text-sm", a ? "space-y-1" : "space-y-3", n),
      children: e.map((s, i) => /* @__PURE__ */ N(
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
ka.displayName = "DescriptionList";
function Na({
  value: e,
  min: t = 0,
  max: r = 100,
  low: n,
  high: a,
  optimum: s
}) {
  if (n == null && a == null && s == null) return "primary";
  const i = Math.min(Math.max(n ?? t, t), r), l = Math.min(Math.max(a ?? r, i), r), d = s ?? (t + r) / 2, c = (u) => u < i ? 0 : u > l ? 2 : 1, m = Math.abs(c(Math.min(Math.max(e, t), r)) - c(d));
  return m === 0 ? "success" : m === 1 ? "warning" : "error";
}
const $a = {
  primary: "bg-primary-600 dark:bg-primary-400",
  neutral: "bg-secondary-600 dark:bg-secondary-400",
  info: "bg-info-600 dark:bg-info-400",
  success: "bg-success-600 dark:bg-success-400",
  warning: "bg-warning-600 dark:bg-warning-400",
  error: "bg-error-600 dark:bg-error-400"
};
function Sa({
  value: e,
  min: t = 0,
  max: r = 100,
  low: n,
  high: a,
  optimum: s,
  label: i,
  valueText: l,
  tone: d,
  segments: c = 20,
  size: m = "md",
  className: u
}) {
  const p = ce(), b = r - t || 1, h = Math.min(Math.max(e, t), r), f = (h - t) / b, g = l ?? `${Math.round(f * 100)}%`, k = d ?? Na({ value: e, min: t, max: r, low: n, high: a, optimum: s }), x = Math.max(1, Math.round(c)), w = Math.round(f * x);
  return /* @__PURE__ */ N("div", { className: S("font-mono text-sm", u), "data-tone": k, children: [
    /* @__PURE__ */ N("div", { className: "mb-1 flex items-baseline justify-between gap-3", children: [
      /* @__PURE__ */ o("span", { id: p, className: "text-[var(--text-primary)]", children: i }),
      /* @__PURE__ */ N("span", { className: "inline-flex items-center gap-1 tabular-nums text-[var(--text-secondary)]", children: [
        k === "warning" && /* @__PURE__ */ o(Q, { name: "AlertTriangle", size: "3" }),
        k === "error" && /* @__PURE__ */ o(Q, { name: "AlertCircle", size: "3" }),
        g
      ] })
    ] }),
    /* @__PURE__ */ o(
      "div",
      {
        role: "meter",
        "aria-labelledby": p,
        "aria-valuenow": h,
        "aria-valuemin": t,
        "aria-valuemax": r,
        "aria-valuetext": g,
        className: "flex gap-0.5",
        children: Array.from({ length: x }, ($, I) => /* @__PURE__ */ o(
          "span",
          {
            "data-filled": I < w || void 0,
            className: S(
              "flex-1",
              m === "sm" ? "h-2" : "h-3",
              I < w ? $a[k] : "bg-[var(--surface-muted)] ring-1 ring-inset ring-[var(--surface-container-stroke)]"
            )
          },
          I
        ))
      }
    )
  ] });
}
Sa.displayName = "Meter";
function Ia(e) {
  return e.textValue ? e.textValue : typeof e.label == "string" || typeof e.label == "number" ? String(e.label) : "";
}
const Ca = ["w-3/5", "w-2/5", "w-1/2"], Ta = "plate-round flex min-h-touch cursor-pointer items-center gap-2 py-1 pr-3 font-mono text-sm pl-[calc(var(--tree-level)_*_theme(spacing.4)_+_theme(spacing.2))] transition-colors [transition-duration:var(--duration-fast)] motion-reduce:transition-none";
function Ea({
  nodes: e,
  "aria-label": t,
  "aria-labelledby": r,
  expanded: n,
  defaultExpanded: a = [],
  onExpandedChange: s,
  selected: i,
  defaultSelected: l = null,
  onSelectedChange: d,
  onActivate: c,
  typeahead: m = !0,
  loading: u = !1,
  emptyState: p,
  className: b
}) {
  var ie;
  const [h, f] = G(a), g = n ?? h, k = Pe(() => new Set(g), [g]), [x, w] = G(l), $ = i !== void 0 ? i : x, [I, E] = G(null), z = q(/* @__PURE__ */ new Map()), v = q(!1), T = q({ buffer: "", timer: 0 }), O = Pe(() => {
    const C = [], y = (P, _, j) => {
      for (const L of P) {
        const V = Array.isArray(L.children);
        C.push({ node: L, level: _, parentId: j, isBranch: V }), V && k.has(L.id) && y(L.children, _ + 1, L.id);
      }
    };
    return y(e, 1, null), C;
  }, [e, k]), U = I && O.some((C) => C.node.id === I) && I || $ && O.some((C) => C.node.id === $) && $ || ((ie = O[0]) == null ? void 0 : ie.node.id) || null;
  H(() => {
    var C;
    !v.current || !I || (v.current = !1, (C = z.current.get(I)) == null || C.focus());
  }, [I, O]), H(() => () => clearTimeout(T.current.timer), []);
  const Y = (C) => {
    var y;
    C && (v.current = !0, E(C), C === I && ((y = z.current.get(C)) == null || y.focus()));
  }, te = ue(
    (C, y) => {
      if (k.has(C) === y) return;
      const _ = y ? [...g, C] : g.filter((j) => j !== C);
      n === void 0 && f(_), s == null || s(_);
    },
    [k, g, n, s]
  ), D = (C) => {
    C.node.disabled || $ !== C.node.id && (i === void 0 && w(C.node.id), d == null || d(C.node.id));
  }, Z = (C, y) => {
    const P = T.current;
    clearTimeout(P.timer), P.buffer += C.toLowerCase(), P.timer = setTimeout(() => {
      P.buffer = "";
    }, 500);
    const _ = O.length, j = P.buffer.length === 1 ? y + 1 : y;
    for (let L = 0; L < _; L++) {
      const V = O[(j + L) % _];
      if (Ia(V.node).toLowerCase().startsWith(P.buffer)) {
        Y(V.node.id);
        return;
      }
    }
  }, ne = (C, y) => {
    var j, L, V, K, ee;
    if (C.target !== C.currentTarget) return;
    const P = O.findIndex((X) => X.node.id === y.node.id), _ = k.has(y.node.id);
    switch (C.key) {
      case "ArrowDown":
        C.preventDefault(), Y((j = O[P + 1]) == null ? void 0 : j.node.id);
        break;
      case "ArrowUp":
        C.preventDefault(), Y((L = O[P - 1]) == null ? void 0 : L.node.id);
        break;
      case "ArrowRight":
        if (C.preventDefault(), !y.isBranch) break;
        _ ? ((V = O[P + 1]) == null ? void 0 : V.parentId) === y.node.id && Y(O[P + 1].node.id) : te(y.node.id, !0);
        break;
      case "ArrowLeft":
        C.preventDefault(), y.isBranch && _ ? te(y.node.id, !1) : y.parentId && Y(y.parentId);
        break;
      case "Home":
        C.preventDefault(), Y((K = O[0]) == null ? void 0 : K.node.id);
        break;
      case "End":
        C.preventDefault(), Y((ee = O[O.length - 1]) == null ? void 0 : ee.node.id);
        break;
      case "Enter":
        C.preventDefault(), D(y), y.node.disabled || c == null || c(y.node.id);
        break;
      case " ":
        C.preventDefault(), D(y);
        break;
      default:
        m && C.key.length === 1 && !C.ctrlKey && !C.metaKey && !C.altKey && /\S/.test(C.key) && (C.preventDefault(), Z(C.key, P));
    }
  }, oe = (C, y, P) => C.map((_, j) => {
    const L = Array.isArray(_.children), V = L && k.has(_.id), K = $ === _.id, ee = { node: _, parentId: P, isBranch: L };
    return /* @__PURE__ */ N(
      "li",
      {
        ref: (X) => {
          X ? z.current.set(_.id, X) : z.current.delete(_.id);
        },
        role: "treeitem",
        "aria-level": y,
        "aria-setsize": C.length,
        "aria-posinset": j + 1,
        "aria-expanded": L ? V : void 0,
        "aria-selected": K,
        "aria-disabled": _.disabled || void 0,
        tabIndex: U === _.id ? 0 : -1,
        onKeyDown: (X) => ne(X, ee),
        onFocus: (X) => {
          X.target === X.currentTarget && E(_.id);
        },
        className: "focus:outline-none [&:focus-visible>div]:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]",
        children: [
          /* @__PURE__ */ N(
            "div",
            {
              style: { "--tree-level": y - 1 },
              onClick: (X) => {
                X.stopPropagation(), Y(_.id), D(ee), L && te(_.id, !V), !_.disabled && !L && (c == null || c(_.id));
              },
              className: S(
                Ta,
                K ? "bg-[var(--surface-muted)] text-[var(--accent)]" : "text-[var(--text-primary)] hover:bg-[var(--surface-muted)]",
                _.disabled && "cursor-not-allowed opacity-50"
              ),
              children: [
                /* @__PURE__ */ o("span", { className: "inline-flex w-4 shrink-0 justify-center text-[var(--text-secondary)]", children: L && /* @__PURE__ */ o(Q, { name: V ? "ChevronDown" : "ChevronRight", size: "3" }) }),
                _.icon && pe(_.icon, { className: "shrink-0" }),
                /* @__PURE__ */ o("span", { className: "min-w-0 truncate", children: _.label })
              ]
            }
          ),
          L && V && _.children.length > 0 && /* @__PURE__ */ o("ul", { role: "group", children: oe(_.children, y + 1, _.id) })
        ]
      },
      _.id
    );
  });
  return !u && e.length === 0 ? p == null ? null : /* @__PURE__ */ o(
    "div",
    {
      role: "group",
      "aria-label": t,
      "aria-labelledby": r,
      "data-tree-empty": "",
      className: S("font-mono text-sm", b),
      children: p
    }
  ) : /* @__PURE__ */ o(
    "ul",
    {
      role: "tree",
      "aria-label": t,
      "aria-labelledby": r,
      "aria-busy": u || void 0,
      className: S("font-mono text-sm", b),
      children: u ? (
        // Placeholder rows carry no meaning, so they are hidden from assistive tech;
        // aria-busy on the tree is what says the nodes are on their way.
        Ca.map((C) => /* @__PURE__ */ o("li", { role: "none", "data-tree-loading-row": "", children: /* @__PURE__ */ N("div", { "aria-hidden": "true", className: "flex min-h-touch items-center gap-2 py-1 pl-2 pr-3", children: [
          /* @__PURE__ */ o("span", { className: "w-4 shrink-0" }),
          /* @__PURE__ */ o("div", { className: C, children: /* @__PURE__ */ o(It, {}) })
        ] }) }, C))
      ) : oe(e, 1, null)
    }
  );
}
Ea.displayName = "TreeView";
const _a = {
  sm: "h-5 min-w-5 px-1.5 text-xs",
  md: "h-6 min-w-6 px-2 text-sm"
};
function Wt({ size: e, children: t, className: r }) {
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
            _a[e]
          ),
          children: t
        }
      )
    }
  );
}
function Aa({ keys: e, children: t, size: r = "sm", separator: n = "+", className: a }) {
  return !e || e.length <= 1 ? /* @__PURE__ */ o(Wt, { size: r, className: a, children: (e == null ? void 0 : e[0]) ?? t }) : /* @__PURE__ */ o("kbd", { className: S("inline-flex items-center gap-1 align-middle font-mono", a), children: e.map((s, i) => /* @__PURE__ */ N(xt, { children: [
    i > 0 && /* @__PURE__ */ o("span", { className: S("text-[var(--text-secondary)]", r === "sm" ? "text-xs" : "text-sm"), children: n }),
    /* @__PURE__ */ o(Wt, { size: r, children: s })
  ] }, `${s}-${i}`)) });
}
Aa.displayName = "Kbd";
const za = {
  none: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8"
}, Ma = {
  eyebrow: {
    text: "text-xs uppercase tracking-wider text-[var(--text-primary)]",
    space: "mb-3"
  },
  field: {
    text: "text-sm text-secondary-800 dark:text-secondary-200",
    space: "mb-2"
  }
}, Ra = re(function({
  legend: t,
  children: r,
  description: n,
  variant: a = "eyebrow",
  gap: s = "2",
  disabled: i = !1,
  error: l = !1,
  errorMessage: d,
  role: c,
  className: m,
  "aria-describedby": u,
  "aria-labelledby": p,
  ...b
}, h) {
  const f = ce(), g = `${f}-legend`, k = n != null && n !== !1 && n !== "", x = k ? `${f}-description` : void 0, w = Me({
    error: l,
    errorMessage: d,
    describedBy: [u, x].filter(Boolean).join(" ") || void 0
  }), $ = Ma[a], I = c === "radiogroup" ? { role: "radiogroup", "aria-invalid": w.invalid || void 0 } : {};
  return /* @__PURE__ */ N(
    "fieldset",
    {
      ref: h,
      disabled: i,
      "aria-labelledby": p ?? g,
      "aria-describedby": w.describedBy,
      className: S("group/fieldset m-0 min-w-0 border-0 p-0", m),
      ...I,
      ...b,
      children: [
        /* @__PURE__ */ o(
          "legend",
          {
            id: g,
            className: S("block p-0 font-mono", $.text, k ? "mb-1" : $.space),
            children: t
          }
        ),
        k && /* @__PURE__ */ o(Se, { id: x, tone: "helper", className: $.space, children: n }),
        /* @__PURE__ */ o("div", { className: S("flex flex-col group-disabled/fieldset:opacity-50", za[s]), children: r }),
        /* @__PURE__ */ o(Se, { ...w.message, className: "mt-2" })
      ]
    }
  );
});
Ra.displayName = "Fieldset";
const La = {
  none: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8"
}, Oa = {
  base: { vertical: "flex-col", horizontal: "flex-row flex-wrap" },
  sm: { vertical: "sm:flex-col sm:flex-nowrap", horizontal: "sm:flex-row sm:flex-wrap" },
  md: { vertical: "md:flex-col md:flex-nowrap", horizontal: "md:flex-row md:flex-wrap" },
  lg: { vertical: "lg:flex-col lg:flex-nowrap", horizontal: "lg:flex-row lg:flex-wrap" },
  xl: { vertical: "xl:flex-col xl:flex-nowrap", horizontal: "xl:flex-row xl:flex-wrap" }
}, Pa = {
  base: { vertical: void 0, horizontal: "items-center" },
  sm: { vertical: "sm:items-stretch", horizontal: "sm:items-center" },
  md: { vertical: "md:items-stretch", horizontal: "md:items-center" },
  lg: { vertical: "lg:items-stretch", horizontal: "lg:items-center" },
  xl: { vertical: "xl:items-stretch", horizontal: "xl:items-center" }
}, Da = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch"
}, ja = ["base", "sm", "md", "lg", "xl"];
function Ba(e, t) {
  return (typeof e == "string" ? [["base", e]] : ja.flatMap((n) => {
    const a = e[n];
    return a === void 0 ? [] : [[n, a]];
  })).flatMap(([n, a]) => {
    const s = [Oa[n][a]], i = Pa[n][a];
    return t === void 0 && i !== void 0 && s.push(i), s;
  });
}
const Fa = re(function({ children: t, gap: r = "4", className: n, axis: a = "vertical", align: s, ...i }, l) {
  return /* @__PURE__ */ o(
    "div",
    {
      ref: l,
      className: S(
        "flex",
        Ba(a, s),
        La[r],
        s !== void 0 && Da[s],
        n
      ),
      ...i,
      children: t
    }
  );
});
Fa.displayName = "Stack";
const Va = {
  none: "p-0",
  1: "p-1",
  2: "p-2",
  3: "p-3",
  4: "p-4",
  5: "p-5",
  6: "p-6",
  8: "p-8"
}, Ga = {
  none: "px-0",
  1: "px-1",
  2: "px-2",
  3: "px-3",
  4: "px-4",
  5: "px-5",
  6: "px-6",
  8: "px-8"
}, Ha = {
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
}, Wa = re(function({
  children: t,
  padding: r,
  paddingX: n,
  paddingY: a,
  background: s = "none",
  border: i = "none",
  as: l = "div",
  className: d,
  ...c
}, m) {
  const u = l, p = n !== void 0 || a !== void 0, b = n ?? r, h = a ?? r, f = p ? S(
    b !== void 0 && Ga[b],
    h !== void 0 && Ha[h]
  ) : S(r !== void 0 && Va[r]);
  if (i === "none")
    return /* @__PURE__ */ o(u, { ref: m, className: S(ct[s], f, d), ...c, children: t });
  const g = s === "none" ? ct.card : ct[s];
  return /* @__PURE__ */ o(
    u,
    {
      ref: m,
      className: S("plate-round bg-[var(--surface-container-stroke)] p-px", d),
      ...c,
      children: /* @__PURE__ */ o("div", { className: S("plate-round h-full w-full", g, f), children: t })
    }
  );
});
Wa.displayName = "Box";
const Ua = {
  none: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8"
}, Ka = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  baseline: "items-baseline"
}, qa = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between"
}, Xa = re(function({ children: t, gap: r = "2", align: n = "center", justify: a = "start", wrap: s = !0, className: i, ...l }, d) {
  return /* @__PURE__ */ o(
    "div",
    {
      ref: d,
      className: S(
        "flex flex-row",
        s ? "flex-wrap" : "flex-nowrap",
        Ua[r],
        Ka[n],
        qa[a],
        i
      ),
      ...l,
      children: t
    }
  );
});
Xa.displayName = "Inline";
const Ya = {
  none: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8"
}, Za = {
  none: "gap-y-0",
  1: "gap-y-1",
  2: "gap-y-2",
  3: "gap-y-3",
  4: "gap-y-4",
  5: "gap-y-5",
  6: "gap-y-6",
  8: "gap-y-8"
}, Qa = {
  none: "gap-x-0",
  1: "gap-x-1",
  2: "gap-x-2",
  3: "gap-x-3",
  4: "gap-x-4",
  5: "gap-x-5",
  6: "gap-x-6",
  8: "gap-x-8"
}, Ut = {
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
}, Ja = ["base", "sm", "md", "lg", "xl"], es = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch"
};
function ts(e) {
  return typeof e == "number" ? [Ut.base[e]] : Ja.flatMap((t) => {
    const r = e[t];
    return r === void 0 ? [] : [Ut[t][r]];
  });
}
const rs = re(function({ children: t, columns: r = 1, gap: n = "4", rowGap: a, columnGap: s, align: i = "stretch", className: l, ...d }, c) {
  return /* @__PURE__ */ o(
    "div",
    {
      ref: c,
      className: S(
        "grid",
        ts(r),
        Ya[n],
        a !== void 0 && Za[a],
        s !== void 0 && Qa[s],
        es[i],
        l
      ),
      ...d,
      children: t
    }
  );
});
rs.displayName = "Grid";
const ns = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  full: "max-w-full"
}, os = re(function({ children: t, size: r = "lg", gutter: n = !0, as: a = "div", className: s, ...i }, l) {
  return /* @__PURE__ */ o(
    a,
    {
      ref: l,
      className: S("mx-auto w-full", ns[r], n && "px-5 lg:px-10", s),
      ...i,
      children: t
    }
  );
});
os.displayName = "Container";
const as = {
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  none: "max-w-none"
}, ss = re(function({ children: t, maxWidth: r = "md", andText: n = !1, fullHeight: a = !1, as: s = "div", className: i, ...l }, d) {
  return /* @__PURE__ */ o(
    s,
    {
      ref: d,
      className: S(
        "mx-auto w-full",
        as[r],
        n && "text-center",
        a && "flex min-h-screen flex-col justify-center",
        i
      ),
      ...l,
      children: t
    }
  );
});
ss.displayName = "Center";
const is = re(function({ children: t, focusable: r = !1, as: n = "span", className: a, ...s }, i) {
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
is.displayName = "VisuallyHidden";
function Ts({ children: e, ...t }) {
  return /* @__PURE__ */ o(
    jr,
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
  $s as Accordion,
  Cs as AccordionContent,
  Ss as AccordionItem,
  Is as AccordionTrigger,
  bs as Alert,
  fa as AppHeader,
  Zn as Avatar,
  ps as Badge,
  ws as BottomSheet,
  Wa as Box,
  oa as Breadcrumbs,
  Ue as Button,
  fs as Card,
  xo as CaseStudyContent,
  vo as CaseStudyHeader,
  xs as CaseStudyPage,
  wo as CaseStudySections,
  ss as Center,
  ao as Checkbox,
  Xo as Combobox,
  os as Container,
  ka as DescriptionList,
  hs as Divider,
  gs as Dropdown,
  ra as EmptyState,
  Ra as Fieldset,
  rs as Grid,
  Xa as Inline,
  Hn as Input,
  Aa as Kbd,
  ft as Link,
  ko as ListRow,
  xa as LogView,
  Sa as Meter,
  ms as Modal,
  ia as Pagination,
  $r as Popover,
  ea as ProgressBar,
  lo as Radio,
  oo as Select,
  la as SideNav,
  ma as SideNavItem,
  _r as SideNavSection,
  It as Skeleton,
  io as Slider,
  ur as Spinner,
  Fa as Stack,
  ya as StatusLine,
  wa as StatusLineSegment,
  pr as Switch,
  jn as TUI_ICON_GLYPHS,
  Oo as Table,
  Do as TableBody,
  ht as TableCell,
  jo as TableFooter,
  Bo as TableHead,
  Po as TableHeader,
  bt as TableRow,
  Ns as Tabs,
  zo as TabsContent,
  _o as TabsList,
  Ao as TabsTrigger,
  co as Textarea,
  Ts as ThemeProvider,
  ks as ThemeToggle,
  So as Toast,
  ys as Toaster,
  no as Tooltip,
  Ea as TreeView,
  Q as TuiIcon,
  is as VisuallyHidden,
  pa as Window,
  S as cn,
  Na as getMeterTone,
  aa as getPaginationRange,
  To as toast,
  vs as useToast
};
//# sourceMappingURL=index.esm.js.map

import { jsxs as v, jsx as o, Fragment as fe } from "react/jsx-runtime";
import Ce, { useState as W, useEffect as G, forwardRef as oe, useId as le, useRef as q, useCallback as ue, useMemo as je, useLayoutEffect as Ie, isValidElement as Ke, cloneElement as wt, useImperativeHandle as Hr, Fragment as kt, Children as Nt, useSyncExternalStore as er, createContext as Be, useContext as Te } from "react";
import { useTheme as Gr, ThemeProvider as Ur } from "next-themes";
import { createPortal as Kr } from "react-dom";
function tr(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var a = e.length;
    for (t = 0; t < a; t++) e[t] && (r = tr(e[t])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function qr() {
  for (var e, t, r = 0, n = "", a = arguments.length; r < a; r++) (e = arguments[r]) && (t = tr(e)) && (n && (n += " "), n += t);
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
}), rr = (e = /* @__PURE__ */ new Map(), t = null, r) => ({
  nextPart: e,
  validators: t,
  classGroupId: r
}), nt = "-", Lt = [], Zr = "arbitrary..", Qr = (e) => {
  const t = en(e), {
    conflictingClassGroups: r,
    conflictingClassGroupModifiers: n
  } = e;
  return {
    getClassGroupId: (i) => {
      if (i.startsWith("[") && i.endsWith("]"))
        return Jr(i);
      const l = i.split(nt), d = l[0] === "" && l.length > 1 ? 1 : 0;
      return nr(l, d, t);
    },
    getConflictingClassGroupIds: (i, l) => {
      if (l) {
        const d = n[i], c = r[i];
        return d ? c ? Xr(c, d) : d : c || Lt;
      }
      return r[i] || Lt;
    }
  };
}, nr = (e, t, r) => {
  if (e.length - t === 0)
    return r.classGroupId;
  const a = e[t], s = r.nextPart.get(a);
  if (s) {
    const c = nr(e, t + 1, s);
    if (c) return c;
  }
  const i = r.validators;
  if (i === null)
    return;
  const l = t === 0 ? e.join(nt) : e.slice(t).join(nt), d = i.length;
  for (let c = 0; c < d; c++) {
    const m = i[c];
    if (m.validator(l))
      return m.classGroupId;
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
  const r = rr();
  for (const n in e) {
    const a = e[n];
    St(a, r, n, t);
  }
  return r;
}, St = (e, t, r, n) => {
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
  const n = e === "" ? t : or(t, e);
  n.classGroupId = r;
}, on = (e, t, r, n) => {
  if (sn(e)) {
    St(e(n), t, r, n);
    return;
  }
  t.validators === null && (t.validators = []), t.validators.push(Yr(r, e));
}, an = (e, t, r, n) => {
  const a = Object.entries(e), s = a.length;
  for (let i = 0; i < s; i++) {
    const [l, d] = a[i];
    St(d, or(t, l), r, n);
  }
}, or = (e, t) => {
  let r = e;
  const n = t.split(nt), a = n.length;
  for (let s = 0; s < a; s++) {
    const i = n[s];
    let l = r.nextPart.get(i);
    l || (l = rr(), r.nextPart.set(i, l)), r = l;
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
}, pt = "!", Ot = ":", cn = [], Pt = (e, t, r, n, a) => ({
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
    let i = 0, l = 0, d = 0, c;
    const m = a.length;
    for (let f = 0; f < m; f++) {
      const g = a[f];
      if (i === 0 && l === 0) {
        if (g === Ot) {
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
    u.endsWith(pt) ? (p = u.slice(0, -1), b = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      u.startsWith(pt) && (p = u.slice(1), b = !0)
    );
    const h = c && c > d ? c - d : void 0;
    return Pt(s, b, p, h);
  };
  if (t) {
    const a = t + Ot, s = n;
    n = (i) => i.startsWith(a) ? s(i.slice(a.length)) : Pt(cn, !1, i, void 0, !0);
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
      const i = r[s], l = i[0] === "[", d = t.has(i);
      l || d ? (a.length > 0 && (a.sort(), n.push(...a), a = []), n.push(i)) : a.push(i);
    }
    return a.length > 0 && (a.sort(), n.push(...a)), n;
  };
}, mn = (e) => ({
  cache: ln(e.cacheSize),
  parseClassName: dn(e),
  sortModifiers: un(e),
  postfixLookupClassGroupIds: fn(e),
  ...Qr(e)
}), fn = (e) => {
  const t = /* @__PURE__ */ Object.create(null), r = e.postfixLookupClassGroups;
  if (r)
    for (let n = 0; n < r.length; n++)
      t[r[n]] = !0;
  return t;
}, pn = /\s+/, bn = (e, t) => {
  const {
    parseClassName: r,
    getClassGroupId: n,
    getConflictingClassGroupIds: a,
    sortModifiers: s,
    postfixLookupClassGroupIds: i
  } = t, l = [], d = e.trim().split(pn);
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
    let N = !!g, x;
    if (N) {
      const C = f.substring(0, g);
      x = n(C);
      const w = x && i[x] ? n(f) : void 0;
      w && w !== x && (x = w, N = !1);
    } else
      x = n(f);
    if (!x) {
      if (!N) {
        c = u + (c.length > 0 ? " " + c : c);
        continue;
      }
      if (x = n(f), !x) {
        c = u + (c.length > 0 ? " " + c : c);
        continue;
      }
      N = !1;
    }
    const y = b.length === 0 ? "" : b.length === 1 ? b[0] : s(b).join(":"), S = h ? y + pt : y, I = S + x;
    if (l.indexOf(I) > -1)
      continue;
    l.push(I);
    const E = a(x, N);
    for (let C = 0; C < E.length; ++C) {
      const w = E[C];
      l.push(S + w);
    }
    c = u + (c.length > 0 ? " " + c : c);
  }
  return c;
}, hn = (...e) => {
  let t = 0, r, n, a = "";
  for (; t < e.length; )
    (r = e[t++]) && (n = ar(r)) && (a && (a += " "), a += n);
  return a;
}, ar = (e) => {
  if (typeof e == "string")
    return e;
  let t, r = "";
  for (let n = 0; n < e.length; n++)
    e[n] && (t = ar(e[n])) && (r && (r += " "), r += t);
  return r;
}, gn = (e, ...t) => {
  let r, n, a, s;
  const i = (d) => {
    const c = t.reduce((m, u) => u(m), e());
    return r = mn(c), n = r.cache.get, a = r.cache.set, s = l, l(d);
  }, l = (d) => {
    const c = n(d);
    if (c)
      return c;
    const m = bn(d, r);
    return a(d, m), m;
  };
  return s = i, (...d) => s(hn(...d));
}, xn = [], ce = (e) => {
  const t = (r) => r[e] || xn;
  return t.isThemeGetter = !0, t.themeKey = e, t;
}, sr = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, ir = /^\((?:(\w[\w-]*):)?(.+)\)$/i, vn = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, yn = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, wn = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, kn = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix|color|light-dark)\(.+\)$/, Nn = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Sn = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, $e = (e) => vn.test(e), K = (e) => !!e && !Number.isNaN(Number(e)), ve = (e) => !!e && Number.isInteger(Number(e)), it = (e) => e.endsWith("%") && K(e.slice(0, -1)), ke = (e) => yn.test(e), lr = () => !0, $n = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  wn.test(e) && !kn.test(e)
), $t = () => !1, Cn = (e) => Nn.test(e), In = (e) => Sn.test(e), Tn = (e) => !M(e) && !R(e), En = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), _n = (e) => Ee(e, ur, $t), M = (e) => sr.test(e), Ae = (e) => Ee(e, mr, $n), Dt = (e) => Ee(e, Dn, K), zn = (e) => Ee(e, pr, lr), An = (e) => Ee(e, fr, $t), jt = (e) => Ee(e, cr, $t), Mn = (e) => Ee(e, dr, In), Ye = (e) => Ee(e, br, Cn), R = (e) => ir.test(e), Fe = (e) => Re(e, mr), Rn = (e) => Re(e, fr), Bt = (e) => Re(e, cr), Ln = (e) => Re(e, ur), On = (e) => Re(e, dr), Ze = (e) => Re(e, br, !0), Pn = (e) => Re(e, pr, !0), Ee = (e, t, r) => {
  const n = sr.exec(e);
  return n ? n[1] ? t(n[1]) : r(n[2]) : !1;
}, Re = (e, t, r = !1) => {
  const n = ir.exec(e);
  return n ? n[1] ? t(n[1]) : r : !1;
}, cr = (e) => e === "position" || e === "percentage", dr = (e) => e === "image" || e === "url", ur = (e) => e === "length" || e === "size" || e === "bg-size", mr = (e) => e === "length", Dn = (e) => e === "number", fr = (e) => e === "family-name", pr = (e) => e === "number" || e === "weight", br = (e) => e === "shadow", jn = () => {
  const e = ce("color"), t = ce("font"), r = ce("text"), n = ce("font-weight"), a = ce("tracking"), s = ce("leading"), i = ce("breakpoint"), l = ce("container"), d = ce("spacing"), c = ce("radius"), m = ce("shadow"), u = ce("inset-shadow"), p = ce("text-shadow"), b = ce("drop-shadow"), h = ce("blur"), f = ce("perspective"), g = ce("aspect"), N = ce("ease"), x = ce("animate"), y = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], S = () => [
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
  ], I = () => [...S(), R, M], E = () => ["auto", "hidden", "clip", "visible", "scroll"], C = () => ["auto", "contain", "none"], w = () => [R, M, d], _ = () => [$e, "full", "auto", ...w()], O = () => [ve, "none", "subgrid", R, M], F = () => ["auto", {
    span: ["full", ve, R, M]
  }, ve, R, M], J = () => [ve, "auto", R, M], te = () => ["auto", "min", "max", "fr", R, M], j = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], Y = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], ee = () => ["auto", ...w()], ne = () => [$e, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...w()], se = () => [l, $e, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...w()], T = () => [$e, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...w()], k = () => [e, R, M], D = () => [...S(), Bt, jt, {
    position: [R, M]
  }], z = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], B = () => ["auto", "cover", "contain", Ln, _n, {
    size: [R, M]
  }], P = () => [it, Fe, Ae], H = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    c,
    R,
    M
  ], U = () => ["", K, Fe, Ae], re = () => ["solid", "dashed", "dotted", "double"], Z = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], Q = () => [K, it, Bt, jt], be = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    h,
    R,
    M
  ], me = () => ["none", K, R, M], L = () => ["none", K, R, M], V = () => [K, R, M], ie = () => [$e, "full", ...w()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [ke],
      breakpoint: [ke],
      color: [lr],
      container: [ke],
      "drop-shadow": [ke],
      ease: ["in", "out", "in-out"],
      font: [Tn],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [ke],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [ke],
      shadow: [ke],
      spacing: ["px", K],
      text: [ke],
      "text-shadow": [ke],
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
        aspect: ["auto", "square", $e, M, R, g]
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
      "container-named": [En],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [K, "auto", M, R, l]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": y()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": y()
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
        overscroll: C()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": C()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": C()
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
        inset: _()
      }],
      /**
       * Inset Inline
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": _()
      }],
      /**
       * Inset Block
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": _()
      }],
      /**
       * Inset Inline Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-s` in next major release
       */
      start: [{
        "inset-s": _(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        start: _()
      }],
      /**
       * Inset Inline End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-e` in next major release
       */
      end: [{
        "inset-e": _(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        end: _()
      }],
      /**
       * Inset Block Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-bs": [{
        "inset-bs": _()
      }],
      /**
       * Inset Block End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-be": [{
        "inset-be": _()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: _()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: _()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: _()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: _()
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
        z: [ve, "auto", R, M]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [$e, "full", "auto", l, ...w()]
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
        flex: [K, $e, "auto", "initial", "none", M]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", K, R, M]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", K, R, M]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [ve, "first", "last", "none", R, M]
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
        col: F()
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
        "grid-rows": O()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: F()
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
        gap: w()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": w()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": w()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...j(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...Y(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...Y()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...j()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...Y(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...Y(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": j()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...Y(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...Y()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: w()
      }],
      /**
       * Padding Inline
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: w()
      }],
      /**
       * Padding Block
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: w()
      }],
      /**
       * Padding Inline Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: w()
      }],
      /**
       * Padding Inline End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: w()
      }],
      /**
       * Padding Block Start
       * @see https://tailwindcss.com/docs/padding
       */
      pbs: [{
        pbs: w()
      }],
      /**
       * Padding Block End
       * @see https://tailwindcss.com/docs/padding
       */
      pbe: [{
        pbe: w()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: w()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: w()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: w()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: w()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: ee()
      }],
      /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: ee()
      }],
      /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: ee()
      }],
      /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: ee()
      }],
      /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: ee()
      }],
      /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */
      mbs: [{
        mbs: ee()
      }],
      /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */
      mbe: [{
        mbe: ee()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: ee()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: ee()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: ee()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: ee()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": w()
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
        "space-y": w()
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
        size: ne()
      }],
      /**
       * Inline Size
       * @see https://tailwindcss.com/docs/inline-size
       */
      "inline-size": [{
        inline: ["auto", ...se()]
      }],
      /**
       * Min-Inline Size
       * @see https://tailwindcss.com/docs/min-inline-size
       */
      "min-inline-size": [{
        "min-inline": ["auto", ...se()]
      }],
      /**
       * Max-Inline Size
       * @see https://tailwindcss.com/docs/max-inline-size
       */
      "max-inline-size": [{
        "max-inline": ["none", ...se()]
      }],
      /**
       * Block Size
       * @see https://tailwindcss.com/docs/block-size
       */
      "block-size": [{
        block: ["auto", ...T()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-block-size
       */
      "min-block-size": [{
        "min-block": ["auto", ...T()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-block-size
       */
      "max-block-size": [{
        "max-block": ["none", ...T()]
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [l, "screen", ...ne()]
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
          ...ne()
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
          ...ne()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...ne()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...ne()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", "none", ...ne()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", r, Fe, Ae]
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
        font: [n, Pn, zn]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", it, M]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Rn, An, t]
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
        "line-clamp": [K, "none", R, Dt]
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
          ...w()
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
        placeholder: k()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: k()
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
        decoration: [...re(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [K, "from-font", "auto", R, Ae]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: k()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [K, "auto", R, M]
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
        indent: w()
      }],
      /**
       * Tab Size
       * @see https://tailwindcss.com/docs/tab-size
       */
      "tab-size": [{
        tab: [ve, R, M]
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
        bg: D()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: z()
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
          }, ve, R, M],
          radial: ["", R, M],
          conic: ["", ve, R, M]
        }, On, Mn]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: k()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: P()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: P()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: P()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: k()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: k()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: k()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: H()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": H()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": H()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": H()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": H()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": H()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": H()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": H()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": H()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": H()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": H()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": H()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": H()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": H()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": H()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: U()
      }],
      /**
       * Border Width Inline
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": U()
      }],
      /**
       * Border Width Block
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": U()
      }],
      /**
       * Border Width Inline Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": U()
      }],
      /**
       * Border Width Inline End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": U()
      }],
      /**
       * Border Width Block Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-bs": [{
        "border-bs": U()
      }],
      /**
       * Border Width Block End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-be": [{
        "border-be": U()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": U()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": U()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": U()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": U()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": U()
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
        "divide-y": U()
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
        border: [...re(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...re(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: k()
      }],
      /**
       * Border Color Inline
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": k()
      }],
      /**
       * Border Color Block
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": k()
      }],
      /**
       * Border Color Inline Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": k()
      }],
      /**
       * Border Color Inline End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": k()
      }],
      /**
       * Border Color Block Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-bs": [{
        "border-bs": k()
      }],
      /**
       * Border Color Block End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-be": [{
        "border-be": k()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": k()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": k()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": k()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": k()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: k()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...re(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [K, R, M]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", K, Fe, Ae]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: k()
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
          Ze,
          Ye
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: k()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", u, Ze, Ye]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": k()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: U()
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
        ring: k()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [K, Ae]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": k()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": U()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": k()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", p, Ze, Ye]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": k()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [K, R, M]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...Z(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": Z()
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
        "mask-linear": [K]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": Q()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": Q()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": k()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": k()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": Q()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": Q()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": k()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": k()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": Q()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": Q()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": k()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": k()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": Q()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": Q()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": k()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": k()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": Q()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": Q()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": k()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": k()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": Q()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": Q()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": k()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": k()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": Q()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": Q()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": k()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": k()
      }],
      "mask-image-radial": [{
        "mask-radial": [R, M]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": Q()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": Q()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": k()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": k()
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
        "mask-radial-at": S()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [K]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": Q()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": Q()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": k()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": k()
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
        mask: D()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: z()
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
        blur: be()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [K, R, M]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [K, R, M]
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
          Ze,
          Ye
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": k()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", K, R, M]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [K, R, M]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", K, R, M]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [K, R, M]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", K, R, M]
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
        "backdrop-blur": be()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [K, R, M]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [K, R, M]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", K, R, M]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [K, R, M]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", K, R, M]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [K, R, M]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [K, R, M]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", K, R, M]
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
        "border-spacing": w()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": w()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": w()
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
        duration: [K, "initial", R, M]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", N, R, M]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [K, R, M]
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
        scale: L()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": L()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": L()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": L()
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
        skew: V()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": V()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": V()
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
        translate: ie()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": ie()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": ie()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": ie()
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
        zoom: [ve, R, M]
      }],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: k()
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
        caret: k()
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
        "scrollbar-thumb": k()
      }],
      /**
       * Scrollbar Track Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-track-color": [{
        "scrollbar-track": k()
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
        "scroll-m": w()
      }],
      /**
       * Scroll Margin Inline
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": w()
      }],
      /**
       * Scroll Margin Block
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": w()
      }],
      /**
       * Scroll Margin Inline Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": w()
      }],
      /**
       * Scroll Margin Inline End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": w()
      }],
      /**
       * Scroll Margin Block Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbs": [{
        "scroll-mbs": w()
      }],
      /**
       * Scroll Margin Block End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbe": [{
        "scroll-mbe": w()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": w()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": w()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": w()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": w()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": w()
      }],
      /**
       * Scroll Padding Inline
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": w()
      }],
      /**
       * Scroll Padding Block
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": w()
      }],
      /**
       * Scroll Padding Inline Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": w()
      }],
      /**
       * Scroll Padding Inline End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": w()
      }],
      /**
       * Scroll Padding Block Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbs": [{
        "scroll-pbs": w()
      }],
      /**
       * Scroll Padding Block End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbe": [{
        "scroll-pbe": w()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": w()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": w()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": w()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": w()
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
        fill: ["none", ...k()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [K, Fe, Ae, Dt]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...k()]
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
}, Bn = /* @__PURE__ */ gn(jn);
function $(...e) {
  return Bn(qr(e));
}
const We = [
  [0, 0],
  [3, 0],
  [6, 0],
  [6, 3],
  [6, 6],
  [3, 6],
  [0, 6],
  [0, 3]
], Fn = 2, Vn = 100, Ft = "(prefers-reduced-motion: reduce)";
function hr(e) {
  return We.filter((t, r) => e === null || (r - e + We.length) % We.length >= Fn).map(([t, r]) => `M${t} ${r}h2v2h-2Z`).join("");
}
const Wn = We.map((e, t) => hr(t)), Hn = hr(null);
function Gn() {
  const [e, t] = W(
    () => typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia(Ft).matches
  );
  return G(() => {
    var a;
    if (typeof window > "u" || typeof window.matchMedia != "function") return;
    const r = window.matchMedia(Ft), n = () => t(r.matches);
    return n(), (a = r.addEventListener) == null || a.call(r, "change", n), () => {
      var s;
      return (s = r.removeEventListener) == null ? void 0 : s.call(r, "change", n);
    };
  }, []), e;
}
function gr({ size: e = "md", label: t = "Loading", className: r }) {
  const n = Gn(), [a, s] = W(0);
  G(() => {
    if (n) return;
    const c = setInterval(() => s((m) => (m + 1) % We.length), Vn);
    return () => clearInterval(c);
  }, [n]);
  const i = {
    sm: { box: "w-3 h-3", pixel: 1.5 },
    md: { box: "w-4 h-4", pixel: 2 },
    lg: { box: "w-6 h-6", pixel: 3 }
  }, { box: l, pixel: d } = i[e];
  return /* @__PURE__ */ v("span", { role: "status", className: $("inline-flex shrink-0 items-center justify-center", l, r), children: [
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
        children: /* @__PURE__ */ o("path", { d: n ? Hn : Wn[a] })
      }
    ),
    /* @__PURE__ */ o("span", { className: "sr-only", children: t })
  ] });
}
gr.displayName = "Spinner";
const Un = {
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
}, Kn = {
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
function qn(e) {
  let t = "";
  return e.forEach((r, n) => {
    for (const a of r.matchAll(/#+/g))
      t += `M${a.index} ${n}h${a[0].length}v1h-${a[0].length}Z`;
  }), t;
}
const Xn = Object.fromEntries(
  Object.entries(Kn).map(([e, t]) => [e, qn(t)])
), Vt = {
  3: { box: "w-3 h-3 text-xs", pixel: 1.5 },
  4: { box: "w-4 h-4 text-sm", pixel: 2 },
  5: { box: "w-5 h-5 text-base", pixel: 2 },
  6: { box: "w-6 h-6 text-lg", pixel: 3 },
  8: { box: "w-8 h-8 text-2xl", pixel: 4 }
}, X = ({
  name: e,
  size: t = "4",
  className: r
}) => {
  const n = Xn[e], { box: a, pixel: s } = Vt[t] ?? Vt[4];
  return /* @__PURE__ */ o(
    "span",
    {
      className: $(
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
function Yn(e) {
  return typeof e == "string" && Object.prototype.hasOwnProperty.call(Un, e);
}
function pe(e, t = {}) {
  return Yn(e) ? /* @__PURE__ */ o(X, { name: e, ...t }) : e;
}
const ye = oe(
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
    `, N = () => e === "icon" ? !0 : !a || typeof a == "string" || typeof a == "number" ? !1 : typeof a == "object" && a !== null && "type" in a ? typeof a.type < "u" : Array.isArray(a) ? a.every(
      (j) => typeof j == "object" && j !== null && "type" in j
    ) : !1;
    G(() => {
      if (process.env.NODE_ENV === "production" || !(e === "icon" || N())) return;
      p != null && String(p).trim() !== "" || b != null && String(b).trim() !== "" || console.warn(
        "[@scorp-ds/components] Button: icon-only buttons should include aria-label or aria-labelledby for screen readers."
      );
    }, [e, t, a, s, i, p, b]);
    const x = () => {
      if (N() || e === "icon")
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
    }, y = {
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
    }, S = {
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
    }, E = (j) => {
      if (!j) return null;
      const Y = pe(j);
      return typeof Y == "object" && Y !== null && "type" in Y ? /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center shrink-0 ${S[t]}`, children: Y }) : Y;
    }, C = () => N() && a ? typeof a == "object" && a !== null && "type" in a ? /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center shrink-0 ${S[t]}`, children: a }) : /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center shrink-0 ${S[t]}`, children: a }) : a, w = {
      "--btn-ring": e === "primary" || e === "link" ? "var(--focus-ring-primary)" : e === "destructive" ? "var(--focus-ring-destructive)" : e === "icon" ? "var(--focus-ring-icon)" : "var(--focus-ring-secondary)",
      outline: "none"
    }, _ = m && !r, O = (j) => {
      if (_) {
        j.preventDefault();
        return;
      }
      u == null || u(j);
    }, F = _ ? "relative cursor-progress" : "", J = /* @__PURE__ */ v(fe, { children: [
      s && E(s),
      C(),
      i && E(i)
    ] }), te = _ ? /* @__PURE__ */ v(fe, { children: [
      /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center opacity-0 ${I[t]}`, children: J }),
      /* @__PURE__ */ o("span", { "aria-hidden": "true", className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ o(gr, { size: t }) })
    ] }) : J;
    return l ? /* @__PURE__ */ o(
      "a",
      {
        ref: f,
        href: r ? void 0 : l,
        target: d,
        rel: c,
        "aria-disabled": r || _ || void 0,
        "aria-busy": _ || void 0,
        className: `${g} ${x()} ${y[e]} ${I[t]} ${F} no-underline ${r ? "pointer-events-none opacity-50" : ""} ${n}`,
        style: w,
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
        className: `${g} ${x()} ${y[e]} ${I[t]} ${F} ${n}`,
        style: w,
        "aria-label": p,
        "aria-labelledby": b,
        "aria-disabled": _ || void 0,
        "aria-busy": _ || void 0,
        onClick: O,
        ...h,
        children: te
      }
    );
  }
);
ye.displayName = "Button";
const Wt = (e) => e != null && e !== !1 && e !== "";
function _e({ error: e, helperText: t, errorMessage: r, describedBy: n }) {
  const a = le(), s = Wt(r), i = !s && Wt(t), l = s || i ? `${a}-message` : void 0;
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
  return e == null ? null : /* @__PURE__ */ v(
    "p",
    {
      id: e,
      className: `flex items-start gap-1.5 font-mono text-xs ${t === "error" ? "text-error-700 dark:text-error-400" : "text-[var(--text-secondary)]"} ${n}`,
      children: [
        t === "error" && /* @__PURE__ */ o("span", { className: "flex h-[1lh] shrink-0 items-center", children: /* @__PURE__ */ o(X, { name: "AlertCircle", size: "3" }) }),
        /* @__PURE__ */ o("span", { children: r })
      ]
    }
  );
}
const Zn = oe(
  ({
    size: e = "md",
    variant: t = "box",
    error: r = !1,
    helperText: n,
    errorMessage: a,
    disabled: s = !1,
    className: i = "",
    label: l,
    trailingAction: d,
    id: c,
    "aria-describedby": m,
    ...u
  }, p) => {
    const b = _e({ error: r, helperText: n, errorMessage: a, describedBy: m }), h = b.invalid, f = le(), g = c ?? (l != null && l !== "" ? f : void 0), N = `
      w-full
      font-mono text-sm
      transition-colors [transition-duration:var(--duration-fast)]
      placeholder:text-[var(--field-placeholder)]
      disabled:cursor-not-allowed
      focus:outline-none
    `, x = {
      sm: "h-control-sm px-3 py-1.5 plate-round",
      md: "h-control-md px-4 py-2.5 plate-round",
      lg: "h-control-lg px-5 py-3.5 plate-round"
    }, y = h ? "bg-[var(--field-background-error)] text-[var(--text-primary)]" : "bg-[var(--field-background)] text-[var(--text-primary)]", S = h ? "bg-[var(--field-border-error)] focus-within:!bg-[var(--field-border-focus)]" : "bg-[var(--field-border)] hover:bg-[var(--field-border-hover)] focus-within:!bg-[var(--field-border-focus)]", I = h ? "border-b border-[var(--field-border-error)] focus:!border-[var(--field-border-focus)]" : "border-b border-[var(--field-border)] hover:border-[var(--field-border-hover)] focus:!border-[var(--field-border-focus)]", E = d ? t === "quiet" ? { sm: "!pr-8", md: "!pr-10", lg: "!pr-12" }[e] : { sm: "pr-8", md: "pr-10", lg: "pr-12" }[e] : "", C = t === "quiet" ? /* @__PURE__ */ o(
      "input",
      {
        ref: p,
        id: g,
        disabled: s,
        "aria-invalid": h || void 0,
        "aria-describedby": b.describedBy,
        className: `${N} ${x[e].replace("plate-round", "rounded-none")} !px-0 ${E} bg-transparent text-[var(--text-primary)] disabled:opacity-50 ${I} ${i}`,
        ...u
      }
    ) : (
      // DISABLED: the opacity lives on the ring wrapper so the border dims
      // with the fill; applying it to the input alone left a full-strength ring.
      /* @__PURE__ */ o(
        "div",
        {
          className: `w-full plate-round p-px transition-colors [transition-duration:var(--duration-fast)] ${S} ${s ? "opacity-50" : ""}`,
          children: /* @__PURE__ */ o(
            "input",
            {
              ref: p,
              id: g,
              disabled: s,
              "aria-invalid": h || void 0,
              "aria-describedby": b.describedBy,
              className: `${N} ${x[e]} ${y} ${E} ${i}`,
              ...u
            }
          )
        }
      )
    ), w = { sm: "size-control-sm", md: "size-control-md", lg: "size-control-lg" }, _ = { sm: "4", md: "5", lg: "6" }, O = d ? /* @__PURE__ */ v("div", { className: "relative w-full", children: [
      C,
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          "aria-label": d.label,
          "aria-pressed": d.pressed,
          disabled: s,
          onClick: d.onClick,
          className: `
            absolute ${t === "quiet" ? "right-0 top-0" : "right-px top-px"} inline-flex items-center justify-center ${w[e]}
            text-[var(--text-secondary)] hover:text-[var(--text-primary)]
            transition-colors [transition-duration:var(--duration-fast)]
            cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:text-[var(--text-secondary)]
            before:content-[''] before:absolute before:left-1/2 before:top-1/2
            before:-translate-x-1/2 before:-translate-y-1/2 before:w-touch before:h-touch
            after:content-[''] after:absolute after:inset-0 after:pointer-events-none
            ${t === "quiet" ? "" : "after:[clip-path:var(--plate-round)]"}
            focus:outline-none
            focus-visible:after:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]
          `,
          children: /* @__PURE__ */ o("span", { "aria-hidden": "true", className: "inline-flex", children: pe(d.icon, { size: _[e] }) })
        }
      )
    ] }) : C, F = l != null && l !== "";
    return !F && !b.hasMessage ? O : /* @__PURE__ */ v("div", { className: "w-full space-y-1", children: [
      F && /* @__PURE__ */ o(
        "label",
        {
          htmlFor: g,
          className: "block font-mono text-sm text-secondary-800 dark:text-secondary-200",
          children: l
        }
      ),
      O,
      /* @__PURE__ */ o(Se, { ...b.message })
    ] });
  }
);
Zn.displayName = "Input";
const Qn = [
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
function Jn(e) {
  return Array.from(e.querySelectorAll(Qn)).filter(
    (t) => !t.hasAttribute("hidden") && t.closest("[hidden]") == null && t.getAttribute("aria-hidden") !== "true"
  );
}
function xr(e, t) {
  G(() => {
    if (!t) return;
    const r = (n) => {
      if (n.key !== "Tab" || n.defaultPrevented) return;
      const a = e.current;
      if (!a) return;
      const s = Jn(a), i = document.activeElement;
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
function Le({
  value: e,
  defaultValue: t,
  onChange: r
}) {
  const [n, a] = W(t), s = e !== void 0, i = s ? e : n, l = q(r);
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
const eo = 960;
function to() {
  let e = eo;
  if (typeof document < "u") {
    const t = getComputedStyle(document.documentElement).getPropertyValue("--breakpoint-docked"), r = Number.parseFloat(t);
    Number.isFinite(r) && r > 0 && (e = r);
  }
  return `(min-width: ${e}px)`;
}
const ro = {
  xs: "320px",
  sm: "360px",
  md: "440px",
  lg: "640px",
  xl: "740px",
  full: "100vw"
};
function Cs({
  open: e,
  defaultOpen: t = !1,
  onOpenChange: r,
  title: n,
  children: a,
  footerContent: s,
  size: i,
  docked: l = !1
}) {
  const [d, c] = Le({
    value: e,
    defaultValue: t,
    onChange: r
  }), m = ue(() => {
    d && c(!1);
  }, [d, c]), u = ro[i ?? "xl"], p = q(null), b = q(null), [h, f] = W(d);
  G(() => {
    d && f(!0);
  }, [d]);
  const g = h && !d, N = je(to, []), [x, y] = W(
    () => typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia(N).matches
  );
  G(() => {
    if (typeof window.matchMedia != "function") return;
    const C = window.matchMedia(N), w = () => y(C.matches);
    return C.addEventListener("change", w), () => C.removeEventListener("change", w);
  }, [N]);
  const S = l && x, I = d && h;
  if (G(() => {
    var C;
    if (I)
      return b.current = document.activeElement, (C = p.current) == null || C.focus(), () => {
        var w;
        (w = b.current) == null || w.focus(), b.current = null;
      };
  }, [I]), xr(p, I && !S), G(() => {
    const C = (w) => {
      w.key === "Escape" && m();
    };
    return d && document.addEventListener("keydown", C), () => {
      document.removeEventListener("keydown", C);
    };
  }, [d, m]), G(() => (d && !S ? document.body.style.overflow = "hidden" : document.body.style.overflow = "unset", () => {
    document.body.style.overflow = "unset";
  }), [d, S]), !h) return null;
  const E = (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions -- stops backdrop clicks inside the panel; Escape and the close button are the keyboard path
    /* @__PURE__ */ o(
      "div",
      {
        ref: p,
        tabIndex: -1,
        className: "max-w-full max-h-[80vh] plate-round-lg p-px bg-[var(--surface-container-stroke)] flex focus:outline-none",
        style: { width: u },
        role: "dialog",
        "aria-modal": S ? void 0 : "true",
        "aria-label": n,
        onClick: (C) => C.stopPropagation(),
        children: /* @__PURE__ */ v("div", { className: "w-full plate-round-lg bg-[var(--surface-card)] flex flex-col overflow-hidden", children: [
          /* @__PURE__ */ v("div", { className: "flex items-center justify-between px-6 py-5 border-b-[length:var(--border-width-hairline)] border-solid border-[var(--surface-container-stroke)]", children: [
            /* @__PURE__ */ o("h2", { className: "text-base font-mono text-[var(--text-primary)] font-medium flex-1 min-w-0 truncate", children: n }),
            /* @__PURE__ */ o(
              "span",
              {
                className: "relative ml-4 inline-flex shrink-0 before:content-[''] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-touch before:h-touch",
                onClick: (C) => {
                  C.target === C.currentTarget && m();
                },
                children: /* @__PURE__ */ o(
                  ye,
                  {
                    variant: "secondary",
                    size: "sm",
                    type: "button",
                    onClick: m,
                    "aria-label": "Close modal",
                    children: /* @__PURE__ */ o(X, { name: "X" })
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
  return S ? /* @__PURE__ */ o(
    "div",
    {
      className: `fixed inset-x-0 mx-auto w-fit max-w-full ${g ? "animate-out fade-out fill-mode-forwards" : "animate-in fade-in"}`,
      style: {
        zIndex: "var(--z-index-modal)",
        bottom: "var(--spacing-12)",
        animationDuration: "var(--duration-normal)",
        filter: "var(--elevation-docked-filter)"
      },
      onAnimationEnd: () => {
        g && f(!1);
      },
      children: E
    }
  ) : /* @__PURE__ */ o(fe, { children: /* @__PURE__ */ o(
    "div",
    {
      className: `fixed inset-0 flex items-center justify-center p-5 bg-[var(--surface-overlay)] ${g ? "animate-out fade-out fill-mode-forwards" : "animate-in fade-in"}`,
      style: { zIndex: "var(--z-index-modal)", animationDuration: "var(--duration-normal)" },
      onClick: m,
      onAnimationEnd: () => {
        g && f(!1);
      },
      children: E
    }
  ) });
}
function Is({
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
      children: /* @__PURE__ */ v(
        "div",
        {
          className: `
        plate-round-lg bg-[var(--surface-card)] h-full w-full
        ${l ? "flex flex-col flex-1 min-h-0" : ""}
      `,
          children: [
            (e || t || r) && /* @__PURE__ */ o("div", { className: "p-4 lg:p-6 border-b-[length:var(--border-width-hairline)] border-solid border-[var(--surface-container-stroke)] overflow-hidden rounded-none", children: r || /* @__PURE__ */ v("div", { children: [
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
function Ts({
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
  return /* @__PURE__ */ v(
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
            children: /* @__PURE__ */ o(X, { name: "X", size: "3" })
          }
        )
      ]
    }
  );
}
function Es({
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
  }, d = pe(n, { size: "4" }) || /* @__PURE__ */ o(X, { name: l[e], size: "4" }), m = {
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
  return /* @__PURE__ */ o("div", { role: "alert", className: `plate-round p-px ${m.ring} ${i}`, children: /* @__PURE__ */ v(
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
        /* @__PURE__ */ v("div", { className: "flex-1 min-w-0", children: [
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
            children: /* @__PURE__ */ o(X, { name: "X", size: "3" })
          }
        )
      ]
    }
  ) });
}
function no({
  src: e,
  alt: t,
  initials: r,
  icon: n,
  size: a = "md",
  status: s,
  className: i = "",
  onError: l
}) {
  const [d, c] = W(!1), u = {
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
  }, b = e && !d, h = !b && r, f = !b && !h && n, g = !b && !h && !f, x = b || t === void 0 ? {} : t === "" ? { "aria-hidden": !0 } : { role: "img", "aria-label": t }, y = {
    online: "bg-success-600 dark:bg-success-500",
    offline: "bg-secondary-500 dark:bg-secondary-600",
    away: "bg-warning-600 dark:bg-warning-500"
  };
  return /* @__PURE__ */ v("div", { className: `relative inline-block ${u.container} ${i}`, children: [
    /* @__PURE__ */ v(
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
            ${y[s]}
            rounded-none
            border-2 border-[var(--field-background)]
          `,
        "aria-label": `Status: ${s}`
      }
    )
  ] });
}
const oo = {
  horizontal: { none: "", sm: "my-1", md: "my-4", lg: "my-8" },
  vertical: { none: "", sm: "mx-1", md: "mx-4", lg: "mx-8" }
}, Qe = "border-solid border-term-dim", Ht = "flex-1 min-w-4 border-t-[length:var(--border-width-hairline)]";
function _s({
  orientation: e = "horizontal",
  label: t,
  spacing: r = "md",
  className: n = ""
}) {
  const a = oo[e][r];
  return e === "vertical" ? /* @__PURE__ */ o(
    "div",
    {
      className: $("h-full", Qe, "border-l-[length:var(--border-width-hairline)]", a, n),
      role: "separator",
      "aria-orientation": "vertical"
    }
  ) : t != null && t !== !1 && t !== "" ? /* @__PURE__ */ v(
    "div",
    {
      className: $("flex w-full min-w-0 items-center", a, n),
      role: "separator",
      "aria-label": typeof t == "string" ? t : void 0,
      children: [
        /* @__PURE__ */ o("span", { className: $(Ht, Qe), "aria-hidden": "true" }),
        /* @__PURE__ */ o("span", { className: "min-w-0 truncate px-2 font-mono text-xs text-term-dim", children: t }),
        /* @__PURE__ */ o("span", { className: $(Ht, Qe), "aria-hidden": "true" })
      ]
    }
  ) : /* @__PURE__ */ o(
    "div",
    {
      className: $("w-full", Qe, "border-t-[length:var(--border-width-hairline)]", a, n),
      role: "separator",
      "aria-orientation": "horizontal"
    }
  );
}
const ao = { top: "bottom", bottom: "top", left: "right", right: "left" }, so = 8, Pe = 8;
function io(e, t, r, n, a) {
  const s = {
    top: t.top,
    bottom: a - t.bottom,
    left: t.left,
    right: n - t.right
  }, i = (d) => (d === "top" || d === "bottom" ? r.height : r.width) + so + Pe;
  if (s[e] >= i(e)) return e;
  const l = ao[e];
  return s[l] >= i(l) ? l : e;
}
function vr(e, t, r, n) {
  return e === "start" ? t : e === "end" ? t + r - n : t + r / 2 - n / 2;
}
function lo(e, t, r, n) {
  const a = vr(n, e.left, e.width, t), s = a + t;
  return a < Pe ? Pe - a : s > r - Pe ? Math.max(Pe - a, r - Pe - s) : 0;
}
function co({
  content: e,
  children: t,
  side: r = "top",
  align: n = "center",
  delay: a = 200,
  maxWidth: s = "200px",
  className: i = ""
}) {
  const [l, d] = W(!1), [c, m] = W(!1), u = q(null), p = q(null), b = q(null), h = q(null), f = le(), [g, N] = W(r), [x, y] = W(0), [S, I] = W(0), E = () => {
    u.current && clearTimeout(u.current), p.current && clearTimeout(p.current);
  }, C = () => {
    E(), u.current = setTimeout(() => {
      d(!0), p.current = setTimeout(() => m(!0), 50);
    }, a);
  }, w = ue(() => {
    E(), d(!1), m(!1);
  }, []), _ = (T) => {
    var k;
    (k = h.current) != null && k.contains(T.relatedTarget) || w();
  };
  G(() => {
    if (!l) return;
    const T = (k) => {
      k.key === "Escape" && w();
    };
    return document.addEventListener("keydown", T), () => document.removeEventListener("keydown", T);
  }, [l, w]), G(() => E, []), Ie(() => {
    var L, V;
    if (!l) return;
    const T = (L = h.current) == null ? void 0 : L.getBoundingClientRect(), k = (V = b.current) == null ? void 0 : V.getBoundingClientRect();
    if (!T || !k) return;
    const D = window.innerWidth || document.documentElement.clientWidth, z = window.innerHeight || document.documentElement.clientHeight, B = io(r, T, k, D, z), P = B === "top" || B === "bottom", H = P ? lo(T, k.width, D, n) : 0, U = P ? k.width : k.height, re = P ? T.left : T.top, Z = P ? T.width : T.height, Q = vr(n, re, Z, U) + H, be = n === "center" ? -H : re + Z / 2 - (Q + U / 2), me = Math.max(0, U / 2 - 12);
    N(B), y(H), I(Math.min(me, Math.max(-me, be)));
  }, [l, r, n, e, s]);
  const O = Ke(t) ? wt(t, {
    "aria-describedby": [
      t.props["aria-describedby"],
      l ? f : void 0
    ].filter(Boolean).join(" ") || void 0
  }) : t, F = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2",
    right: "left-full ml-2"
  }, J = {
    horizontal: { start: "left-0", center: "left-1/2 -translate-x-1/2", end: "right-0" },
    vertical: { start: "top-0", center: "top-1/2 -translate-y-1/2", end: "bottom-0" }
  }, te = g === "top" || g === "bottom", j = `${F[g]} ${J[te ? "horizontal" : "vertical"][n]}`, Y = "var(--plate-caret-outer)", ee = "var(--plate-caret-inner)", ne = {
    top: "top-full left-1/2 -translate-x-1/2 -translate-y-px",
    bottom: "bottom-full left-1/2 -translate-x-1/2 translate-y-px rotate-180",
    left: "left-full top-1/2 -translate-y-1/2 translate-x-[calc(var(--plate-caret-offset)*-1)] -rotate-90",
    right: "right-full top-1/2 -translate-y-1/2 translate-x-[var(--plate-caret-offset)] rotate-90"
  }, se = {
    top: "top-full inset-x-0 h-2",
    bottom: "bottom-full inset-x-0 h-2",
    left: "left-full inset-y-0 w-2",
    right: "right-full inset-y-0 w-2"
  };
  return /* @__PURE__ */ v(
    "div",
    {
      ref: h,
      className: `relative inline-block w-fit ${i}`,
      onMouseEnter: C,
      onMouseLeave: w,
      onFocus: C,
      onBlur: _,
      children: [
        O,
        l && /* @__PURE__ */ v(
          "div",
          {
            ref: b,
            id: f,
            role: "tooltip",
            className: `
            absolute
            ${j}
            w-max
            z-[var(--z-index-tooltip)]
            ${c ? "opacity-100" : "opacity-0"}
            transition-opacity [transition-duration:var(--duration-fast)]
          `,
            "data-placement": g,
            "data-align": n,
            style: { maxWidth: s, marginLeft: x || void 0 },
            children: [
              /* @__PURE__ */ o("span", { className: `absolute ${se[g]}`, "aria-hidden": "true" }),
              /* @__PURE__ */ o("div", { className: "plate-round p-px bg-[var(--surface-container-stroke)]", children: /* @__PURE__ */ o("div", { className: "plate-round bg-[var(--surface-card)] min-w-16 px-3 py-2 text-center font-mono text-xs text-[var(--text-primary)] whitespace-normal", children: e }) }),
              /* @__PURE__ */ o(
                "div",
                {
                  className: `absolute ${ne[g]}`,
                  style: te ? { marginLeft: S || void 0 } : { marginTop: S || void 0 },
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ v("div", { className: "relative h-[var(--plate-caret-height)] w-[var(--plate-caret-width)]", children: [
                    /* @__PURE__ */ o(
                      "div",
                      {
                        className: "absolute inset-0 bg-[var(--surface-container-stroke)]",
                        style: { clipPath: Y }
                      }
                    ),
                    /* @__PURE__ */ o(
                      "div",
                      {
                        className: "absolute left-[var(--plate-caret-inner-inset-x)] top-[var(--plate-caret-inner-inset-y)] h-[var(--plate-caret-inner-height)] w-[var(--plate-caret-inner-width)] bg-[var(--surface-card)]",
                        style: { clipPath: ee }
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
function bt(e) {
  return e == null || typeof e == "boolean" ? "" : Array.isArray(e) ? e.map(bt).join("") : typeof e == "string" || typeof e == "number" ? String(e) : Ke(e) ? bt(e.props.children) : String(e);
}
function ht(e, t, r, n = []) {
  return Nt.forEach(e, (a) => {
    if (!Ke(a)) return;
    const s = a, i = s.props;
    if (s.type === kt) {
      ht(i.children, t, r, n);
      return;
    }
    if (s.type === "optgroup") {
      ht(i.children, i.label ?? t, i.disabled || r, n);
      return;
    }
    const l = bt(i.children);
    n.push({
      // Native fallback: an option with no `value` submits its text
      value: i.value != null ? String(i.value) : l,
      label: l,
      disabled: i.disabled || r || void 0,
      group: t
    });
  }), n;
}
function lt(e, t, r) {
  var s;
  const n = e.length;
  if (n === 0) return -1;
  let a = t;
  for (let i = 0; i < n; i++)
    if (a += r, a >= n && (a = 0), a < 0 && (a = n - 1), !((s = e[a]) != null && s.disabled)) return a;
  return -1;
}
const uo = oe(function({
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
}, N) {
  var me;
  const x = _e({ error: r, helperText: n, errorMessage: a, describedBy: h }), y = x.invalid, S = le(), I = f ?? `${S}-trigger`, E = `${S}-listbox`, C = `${S}-label`, w = (L) => `${S}-option-${L}`, _ = ht(l), O = [];
  _.forEach((L, V) => {
    const ie = O[O.length - 1];
    ie && ie.label === L.group ? ie.entries.push({ option: L, index: V }) : O.push({ label: L.group, entries: [{ option: L, index: V }] });
  });
  const [F, J] = W(!1), [te, j] = W(-1), [Y, ee] = W(
    d !== void 0 ? String(d) : c !== void 0 ? String(c) : ((me = _[0]) == null ? void 0 : me.value) || ""
  ), ne = q(null), se = q(null), T = q(null);
  G(() => {
    d !== void 0 && (ee(String(d)), T.current && (T.current.value = String(d)));
  }, [d]), Hr(N, () => T.current);
  const k = _.find((L) => L.value === Y), D = (k == null ? void 0 : k.label) || "", z = () => {
    s || (J(!F), F || j(-1));
  }, B = () => {
    J(!1), j(-1);
  }, P = (L) => {
    d === void 0 && ee(L), T.current && (T.current.value = L), m && m({
      target: { value: L, name: u },
      currentTarget: { value: L, name: u }
    }), B();
  };
  G(() => {
    function L(V) {
      ne.current && !ne.current.contains(V.target) && B();
    }
    if (F)
      return document.addEventListener("mousedown", L), () => {
        document.removeEventListener("mousedown", L);
      };
  }, [F]), G(() => {
    function L(V) {
      var we, ge;
      if (!((we = ne.current) != null && we.contains(V.target)) && !F)
        return;
      if (!F) {
        if ((V.key === "Enter" || V.key === " " || V.key === "ArrowDown" || V.key === "ArrowUp") && (ge = ne.current) != null && ge.contains(V.target)) {
          V.preventDefault(), z();
          const de = _.findIndex((he) => he.value === Y && !he.disabled);
          j(de >= 0 ? de : lt(_, -1, 1));
        }
        return;
      }
      const ie = te;
      switch (V.key) {
        case "Escape":
          V.preventDefault(), B();
          break;
        case "Tab":
          B();
          break;
        case "ArrowDown":
          V.preventDefault(), j((de) => lt(_, de, 1));
          break;
        case "ArrowUp":
          V.preventDefault(), j((de) => lt(_, de, -1));
          break;
        case "Enter":
        case " ":
          V.preventDefault(), ie >= 0 && ie < _.length && !_[ie].disabled && P(_[ie].value);
          break;
      }
    }
    return document.addEventListener("keydown", L), () => {
      document.removeEventListener("keydown", L);
    };
  }, [F, te, _, Y]), G(() => {
    if (te >= 0 && se.current) {
      const V = se.current.querySelectorAll('[role="option"]')[te];
      V && V.scrollIntoView({ block: "nearest" });
    }
  }, [te]);
  const U = {
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
  }[t], re = y ? "bg-[var(--field-background-error)] text-[var(--text-primary)]" : "bg-[var(--field-background)] text-[var(--text-primary)]", Z = y ? "bg-[var(--field-border-error)] focus-within:!bg-[var(--field-border-focus)]" : "bg-[var(--field-border)] hover:bg-[var(--field-border-hover)] focus-within:!bg-[var(--field-border-focus)]", Q = p != null && p !== "", be = /* @__PURE__ */ v("div", { ref: ne, className: "relative inline-block w-full", children: [
    /* @__PURE__ */ o(
      "select",
      {
        ref: T,
        name: u,
        value: Y,
        onChange: m,
        className: "sr-only",
        "aria-hidden": "true",
        tabIndex: -1,
        ...g,
        children: _.map((L, V) => /* @__PURE__ */ o("option", { value: L.value, disabled: L.disabled, children: L.label }, V))
      }
    ),
    /* @__PURE__ */ o("div", { className: `plate-round p-px transition-colors [transition-duration:var(--duration-fast)] ${Z} ${s ? "opacity-50" : ""}`, children: /* @__PURE__ */ v(
      "button",
      {
        type: "button",
        role: "combobox",
        id: I,
        onClick: z,
        disabled: s,
        className: `
          w-full
          flex items-center justify-between
          font-mono text-sm
          transition-colors [transition-duration:var(--duration-fast)]
          ${U.trigger}
          ${re}
          ${s ? "cursor-not-allowed" : "cursor-pointer"}
          focus:outline-none
        `,
        "aria-haspopup": "listbox",
        "aria-expanded": F,
        "aria-controls": F ? E : void 0,
        "aria-activedescendant": F && te >= 0 ? w(te) : void 0,
        "aria-invalid": y || void 0,
        "aria-describedby": x.describedBy,
        "aria-label": Q ? void 0 : b ?? "Select an option",
        children: [
          /* @__PURE__ */ o("span", { className: "truncate text-left flex-1", children: D || "Select..." }),
          /* @__PURE__ */ o(
            "span",
            {
              className: `
            ${U.icon}
            inline-flex items-center justify-center font-mono leading-none
            text-[var(--text-secondary)]
            transition-transform [transition-duration:var(--duration-normal)]
            flex-shrink-0 ml-2
            ${F ? "rotate-180" : ""}
            ${s ? "opacity-50" : ""}
          `,
              "aria-hidden": "true",
              children: /* @__PURE__ */ o(X, { name: "ChevronDown" })
            }
          )
        ]
      }
    ) }),
    F && /* @__PURE__ */ o(
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
            ref: se,
            id: E,
            role: "listbox",
            "aria-labelledby": Q ? C : void 0,
            "aria-label": Q ? void 0 : b ?? "Select an option",
            className: `plate-round bg-[var(--surface-card)] ${U.menu} max-h-80 overflow-y-auto`,
            children: O.map((L, V) => {
              const ie = `${S}-group-${V}`, we = L.entries.map(({ option: ge, index: de }) => {
                const he = ge.disabled, Oe = ge.value === Y, at = te === de && !he;
                return /* @__PURE__ */ v(
                  "button",
                  {
                    id: w(de),
                    type: "button",
                    role: "option",
                    "aria-selected": Oe,
                    disabled: he,
                    onClick: () => !he && P(ge.value),
                    className: `
                  w-full flex items-center gap-2
                  px-4 py-3
                  font-mono text-sm text-left
                  transition-colors [transition-duration:var(--duration-fast)]
                  ${he ? "opacity-50 cursor-not-allowed" : "text-[var(--text-primary)] hover:bg-[var(--surface-muted)] cursor-pointer"}
                  ${at ? "bg-[var(--surface-muted)] text-[var(--accent)]" : ""}
                  ${U.menuItem}
                `,
                    children: [
                      /* @__PURE__ */ o("span", { className: "truncate flex-1 min-w-0", children: ge.label }),
                      Oe && /* @__PURE__ */ o("span", { className: `${U.icon} inline-flex items-center justify-center font-mono font-bold text-[var(--border-focus)] flex-shrink-0`, "aria-hidden": "true", children: /* @__PURE__ */ o(X, { name: "Check" }) })
                    ]
                  },
                  de
                );
              });
              return L.label == null ? /* @__PURE__ */ o(kt, { children: we }, V) : /* @__PURE__ */ v("div", { role: "group", "aria-labelledby": ie, children: [
                /* @__PURE__ */ o(
                  "div",
                  {
                    id: ie,
                    className: "px-4 py-2 font-mono text-xs uppercase tracking-wide text-[var(--text-secondary)]",
                    children: L.label
                  }
                ),
                we
              ] }, V);
            })
          }
        )
      }
    )
  ] });
  return !Q && !x.hasMessage ? /* @__PURE__ */ o("div", { className: `w-full ${i}`.trim(), children: be }) : /* @__PURE__ */ v("div", { className: `w-full space-y-1 ${i}`.trim(), children: [
    Q && /* @__PURE__ */ o(
      "label",
      {
        id: C,
        htmlFor: I,
        className: "block font-mono text-sm text-secondary-800 dark:text-secondary-200",
        children: p
      }
    ),
    be,
    /* @__PURE__ */ o(Se, { ...x.message })
  ] });
});
uo.displayName = "Select";
const mo = oe(
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
      (_) => {
        h.current = _, typeof b == "function" ? b(_) : b && (b.current = _);
      },
      [b]
    );
    Ie(() => {
      h.current && (h.current.indeterminate = c);
    });
    const g = _e({ error: r, helperText: n, errorMessage: a, describedBy: u }), N = g.invalid, y = {
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
    }[e], S = N ? "bg-[var(--field-border-error)]" : `bg-[var(--field-border)] hover:bg-[var(--field-border-hover)]
         peer-checked:bg-[var(--button-primary-background)]
         peer-checked:hover:bg-[var(--button-primary-background-hover)]
         peer-indeterminate:bg-[var(--button-primary-background)]
         peer-indeterminate:hover:bg-[var(--button-primary-background-hover)]`, I = N ? "peer-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-error)]" : "peer-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]", E = (_) => {
      l && l(_), d && d(_.target.checked), _.target.indeterminate = c;
    }, C = t != null && t !== !1 && t !== "", w = /* @__PURE__ */ v("span", { className: "relative inline-flex shrink-0 before:content-[''] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-touch before:h-touch", children: [
      /* @__PURE__ */ o(
        "input",
        {
          ref: f,
          type: "checkbox",
          ...i !== void 0 ? { checked: i } : {},
          disabled: s,
          onChange: E,
          className: "peer sr-only",
          "aria-invalid": N || void 0,
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
            ${y.checkbox}
            transition-colors [transition-duration:var(--duration-fast)]
            ${s ? "cursor-not-allowed" : "cursor-pointer"}
            ${S}
            ${N ? "peer-checked:[&>span]:bg-[var(--field-border-error)] peer-indeterminate:[&>span]:bg-[var(--field-border-error)]" : "peer-checked:[&>span]:bg-[var(--button-primary-background)] peer-indeterminate:[&>span]:bg-[var(--button-primary-background)]"}
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
              children: ["check", "bar"].map((_) => /* @__PURE__ */ o(
                "span",
                {
                  "data-mark": _,
                  className: `absolute inset-0 inline-flex items-center justify-center opacity-0 transition-opacity [transition-duration:var(--duration-fast)] ${N ? "text-[var(--button-destructive-text)]" : "text-[var(--button-primary-text)]"}`,
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ o(X, { name: _ === "check" ? "Check" : "Minus", size: y.glyph })
                },
                _
              ))
            }
          )
        }
      )
    ] });
    return /* @__PURE__ */ v("div", { className: `flex flex-col gap-1 ${m}`, children: [
      /* @__PURE__ */ v(
        "label",
        {
          className: `inline-flex items-center gap-2 font-mono ${s ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`,
          children: [
            w,
            C && /* @__PURE__ */ o("span", { className: `${y.label} text-[var(--text-primary)]`, children: t })
          ]
        }
      ),
      /* @__PURE__ */ o(Se, { ...g.message, className: y.messageIndent })
    ] });
  }
);
mo.displayName = "Checkbox";
function fo(e, t, r) {
  return !Number.isFinite(e) || r <= t ? 0 : Math.min(100, Math.max(0, (e - t) / (r - t) * 100));
}
const po = oe(function({ label: t, id: r, className: n = "", disabled: a, min: s = 0, max: i = 100, value: l, defaultValue: d, onChange: c, ...m }, u) {
  const p = le(), b = r ?? p, h = Number(s), f = Number(i), g = l !== void 0, [N, x] = W(
    () => d !== void 0 ? Number(d) : h
  ), y = g ? Number(l) : N, S = fo(y, h, f), I = (E) => {
    g || x(Number(E.target.value)), c == null || c(E);
  };
  return /* @__PURE__ */ v("span", { className: `flex w-full flex-col gap-1.5 font-mono ${n}`, children: [
    t && /* @__PURE__ */ o("label", { htmlFor: b, className: "text-sm text-secondary-800 dark:text-secondary-300", children: t }),
    /* @__PURE__ */ v("span", { className: `relative flex h-touch w-full items-center ${a ? "opacity-50" : ""}`, children: [
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
              style: { width: `${S}%` }
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
po.displayName = "Slider";
const bo = oe(
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
    const b = _e({ error: r, helperText: n, errorMessage: a, describedBy: m }), h = b.invalid, g = {
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
    }[e], N = h ? "bg-[var(--field-border-error)]" : `bg-[var(--field-border)] hover:bg-[var(--field-border-hover)]
         peer-checked:bg-[var(--button-primary-background)]
         peer-checked:hover:bg-[var(--button-primary-background-hover)]`, x = h ? "peer-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-error)]" : "peer-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]", y = (E) => {
      const C = E.currentTarget.checked;
      l && l(E), d && d(C);
    }, S = t != null && t !== !1 && t !== "", I = /* @__PURE__ */ v("span", { className: "relative inline-flex shrink-0 before:content-[''] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-touch before:h-touch", children: [
      /* @__PURE__ */ o(
        "input",
        {
          ref: p,
          type: "radio",
          ...i !== void 0 ? { checked: i } : {},
          disabled: s,
          onChange: y,
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
            ${N}
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
    return /* @__PURE__ */ v("div", { className: `flex flex-col gap-1 ${c}`, children: [
      /* @__PURE__ */ v(
        "label",
        {
          className: `inline-flex items-center gap-2 font-mono ${s ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`,
          children: [
            I,
            S && /* @__PURE__ */ o("span", { className: `${g.label} text-[var(--text-primary)]`, children: t })
          ]
        }
      ),
      /* @__PURE__ */ o(Se, { ...b.message, className: g.messageIndent })
    ] });
  }
);
bo.displayName = "Radio";
const ho = oe(
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
    const u = _e({ error: t, helperText: r, errorMessage: n, describedBy: d }), p = u.invalid, b = le(), h = l ?? (i != null && i !== "" ? b : void 0), f = `
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
    }, N = p ? "bg-[var(--field-background-error)] text-[var(--text-primary)]" : "bg-[var(--field-background)] text-[var(--text-primary)]", y = /* @__PURE__ */ o(
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
            className: `${f} ${g[e]} ${N} ${s}`,
            ...c
          }
        )
      }
    ), S = i != null && i !== "";
    return !S && !u.hasMessage ? y : /* @__PURE__ */ v("div", { className: "w-full space-y-1", children: [
      S && /* @__PURE__ */ o(
        "label",
        {
          htmlFor: h,
          className: "block font-mono text-sm text-secondary-800 dark:text-secondary-200",
          children: i
        }
      ),
      y,
      /* @__PURE__ */ o(Se, { ...u.message })
    ] });
  }
);
ho.displayName = "Textarea";
const go = {
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
}, yr = oe(
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
    const p = go[n], [b, h] = Le({
      value: e,
      defaultValue: t,
      onChange: r
    }), f = () => {
      l || h(!b);
    }, g = (N) => {
      (N.key === " " || N.key === "Enter") && (N.preventDefault(), f());
    };
    return /* @__PURE__ */ v("div", { className: `flex items-center gap-3 ${c}`, children: [
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
yr.displayName = "Switch";
function Gt(e, t, r) {
  var s;
  const n = e.length;
  if (n === 0) return -1;
  let a = t;
  for (let i = 0; i < n; i++)
    if (a += r, a >= n && (a = 0), a < 0 && (a = n - 1), !((s = e[a]) != null && s.disabled)) return a;
  return -1;
}
function zs({
  trigger: e,
  items: t,
  align: r = "start",
  label: n = "Actions",
  size: a = "md"
}) {
  const [s, i] = W(!1), [l, d] = W(-1), c = q(null), m = q(null), u = () => {
    i(!s), s || d(-1);
  }, p = () => {
    i(!1), d(-1);
  }, b = (y) => {
    y.disabled || (y.onClick(), p());
  };
  G(() => {
    function y(S) {
      c.current && !c.current.contains(S.target) && p();
    }
    if (s)
      return document.addEventListener("mousedown", y), () => {
        document.removeEventListener("mousedown", y);
      };
  }, [s]), G(() => {
    function y(S) {
      if (!s) return;
      const I = l;
      switch (S.key) {
        case "Escape":
          S.preventDefault(), p();
          break;
        case "Tab":
          p();
          break;
        case "ArrowDown":
          S.preventDefault(), d((E) => Gt(t, E, 1));
          break;
        case "ArrowUp":
          S.preventDefault(), d((E) => Gt(t, E, -1));
          break;
        case "Enter":
        case " ":
          S.preventDefault(), I >= 0 && I < t.length && b(t[I]);
          break;
      }
    }
    if (s)
      return document.addEventListener("keydown", y), () => {
        document.removeEventListener("keydown", y);
      };
  }, [s, l, t]), G(() => {
    if (l >= 0 && m.current) {
      const S = m.current.querySelectorAll('[role="menuitem"]')[l];
      S && S.scrollIntoView({ block: "nearest" });
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
  }[a], g = /* @__PURE__ */ v(
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
        /* @__PURE__ */ o("span", { className: `${f.icon} inline-flex items-center justify-center font-mono leading-none transition-transform [transition-duration:var(--duration-normal)] ${s ? "rotate-180" : ""}`, "aria-hidden": "true", children: /* @__PURE__ */ o(X, { name: "ChevronDown" }) })
      ]
    }
  ), N = {
    "aria-haspopup": "true",
    "aria-expanded": s
  };
  let x;
  if (!e)
    x = g;
  else if (Ke(e)) {
    const y = e;
    x = wt(y, {
      ...N,
      onClick: (S) => {
        var I, E;
        (E = (I = y.props).onClick) == null || E.call(I, S), u();
      }
    });
  } else
    x = /* @__PURE__ */ o(
      "div",
      {
        ...N,
        onClick: u,
        role: "button",
        tabIndex: 0,
        onKeyDown: (y) => {
          (y.key === "Enter" || y.key === " ") && (y.preventDefault(), u());
        },
        children: e
      }
    );
  return /* @__PURE__ */ v("div", { ref: c, className: "relative inline-block", children: [
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
            children: t.map((y, S) => {
              const I = y.variant === "destructive", E = y.disabled;
              return /* @__PURE__ */ v(
                "button",
                {
                  type: "button",
                  role: "menuitem",
                  disabled: E,
                  onClick: () => b(y),
                  className: `
                  w-full flex items-center gap-2
                  px-4 py-3
                  font-mono text-sm text-left
                  transition-colors [transition-duration:var(--duration-fast)]
                  ${E ? "opacity-50 cursor-not-allowed" : I ? "text-[var(--text-error)] hover:bg-[var(--field-background-error)]" : "text-[var(--text-primary)] hover:bg-[var(--surface-muted)]"}
                  ${l === S && !E ? I ? "bg-[var(--field-background-error)]" : "bg-[var(--surface-muted)] text-[var(--accent)]" : ""}
                  ${f.menuItem}
                `,
                  children: [
                    /* @__PURE__ */ v("div", { className: "flex items-center gap-2 flex-1 min-w-0", children: [
                      y.icon && /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center ${f.icon} flex-shrink-0`, children: pe(y.icon) }),
                      /* @__PURE__ */ o("span", { className: "truncate", children: y.label })
                    ] }),
                    y.iconRight && /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center ${f.icon} flex-shrink-0 ml-auto`, children: pe(y.iconRight) })
                  ]
                },
                S
              );
            })
          }
        )
      }
    )
  ] });
}
const qe = "text-secondary-700 dark:text-secondary-600", Me = "text-secondary-800 dark:text-secondary-500", Ne = "text-[var(--text-primary)]", Ge = "text-[var(--accent)]", De = "border-[var(--surface-container-stroke)]", xo = {
  background: "repeating-linear-gradient(45deg, var(--surface-subtle), var(--surface-subtle) 8px, var(--surface-muted) 8px, var(--surface-muted) 16px)"
}, He = (e) => e === "wide" ? " [--csp-bw:max(100%,min(calc(100%+240px),calc(100cqw-48px)))] w-[var(--csp-bw)] ml-[calc((100%-var(--csp-bw))/2)]" : e === "full" ? " [--csp-bw:max(100%,calc(100cqw-48px))] w-[var(--csp-bw)] ml-[calc((100%-var(--csp-bw))/2)]" : "", vo = 0.62, yo = (e) => `min(var(--font-size-xs), calc((100cqw - var(--spacing-10)) / ${(Math.max(...e.split(`
`).map((r) => r.length)) * vo).toFixed(2)}))`, Ct = (e) => String(e).padStart(2, "0"), wo = (e) => e.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""), wr = (e) => e.type === "imagePair" ? 2 : e.type === "image" || e.type === "ascii" || e.type === "slot" ? 1 : 0;
function ko(e, t = 1) {
  const r = /* @__PURE__ */ new Map();
  let n = t;
  for (const a of e) {
    const s = wr(a);
    s && (r.set(a, n), n += s);
  }
  return r;
}
function It({ fig: e, caption: t }) {
  return !e && !t ? null : /* @__PURE__ */ v("figcaption", { className: "mt-3 flex gap-3 text-xs leading-relaxed", children: [
    e !== void 0 && /* @__PURE__ */ v("span", { className: `flex-none ${Ge}`, children: [
      "fig. ",
      Ct(e)
    ] }),
    t && /* @__PURE__ */ o("span", { className: qe, children: t })
  ] });
}
function ct({
  fig: e,
  caption: t,
  width: r,
  children: n
}) {
  return /* @__PURE__ */ v("figure", { className: `my-10 m-0${He(r)}`, children: [
    /* @__PURE__ */ o("div", { className: "plate-round p-px bg-[var(--border-hairline)]", children: n }),
    /* @__PURE__ */ o(It, { fig: e, caption: t })
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
  ) : /* @__PURE__ */ o("div", { className: "plate-round w-full", style: { aspectRatio: n, ...xo } });
}
function kr({ items: e }) {
  const t = e.length >= 4 ? "sm:grid-cols-4" : e.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";
  return /* @__PURE__ */ o("dl", { className: `m-0 grid grid-cols-2 gap-x-8 gap-y-6 ${t}`, children: e.map((r) => (
    // dt stays first for screen readers; the figure is moved above it
    // visually, so every figure hangs from the top of its cell however
    // its label wraps. Figure and label centre in their cell.
    /* @__PURE__ */ v("div", { className: "flex flex-col items-center text-center", children: [
      /* @__PURE__ */ o("dt", { className: `mt-2 text-xs ${qe}`, children: r.label }),
      /* @__PURE__ */ o("dd", { className: `order-first m-0 text-2xl leading-none ${Ge}`, children: r.value })
    ] }, r.label)
  )) });
}
function No({
  b: e,
  fig: t,
  slots: r
}) {
  switch (e.type) {
    case "prose":
      return /* @__PURE__ */ o("p", { className: `my-6 text-base leading-relaxed ${Me}`, children: e.text });
    case "image":
      return /* @__PURE__ */ o(ct, { fig: t, caption: e.caption, width: e.width, children: /* @__PURE__ */ o(et, { src: e.src, alt: e.alt, aspect: e.aspect }) });
    case "imagePair":
      return /* @__PURE__ */ o("div", { className: `my-10 grid grid-cols-1 gap-4 sm:grid-cols-2${He(e.width)}`, children: [0, 1].map((n) => {
        var a, s, i;
        return /* @__PURE__ */ v("figure", { className: "m-0", children: [
          /* @__PURE__ */ o("div", { className: "plate-round p-px bg-[var(--border-hairline)]", children: /* @__PURE__ */ o(et, { src: (a = e.srcs) == null ? void 0 : a[n], alt: (s = e.alts) == null ? void 0 : s[n], aspect: "4 / 3" }) }),
          /* @__PURE__ */ o(It, { fig: t === void 0 ? void 0 : t + n, caption: (i = e.captions) == null ? void 0 : i[n] })
        ] }, n);
      }) });
    case "ascii": {
      const n = yo(e.text);
      return /* @__PURE__ */ o(ct, { fig: t, caption: e.caption, width: e.width, children: /* @__PURE__ */ o("div", { className: "[container-type:inline-size]", children: /* @__PURE__ */ o(
        "pre",
        {
          role: "img",
          "aria-label": e.label ?? e.caption ?? "diagram",
          className: `plate-round m-0 overflow-x-auto p-5 leading-snug ${Me}`,
          style: { fontSize: n },
          children: e.text
        }
      ) }) });
    }
    case "slot": {
      const n = r == null ? void 0 : r[e.name];
      return /* @__PURE__ */ o(ct, { fig: t, caption: e.caption, width: e.width, children: n ? /* @__PURE__ */ o("div", { className: "plate-round overflow-hidden", children: n }) : /* @__PURE__ */ o(et, { aspect: e.aspect }) });
    }
    case "list":
      return /* @__PURE__ */ o("ul", { className: "my-10 list-none p-0", children: e.items.map((n, a) => {
        const s = a === 0, i = a === e.items.length - 1;
        return /* @__PURE__ */ v("li", { className: `relative pl-8 ${i ? "" : "pb-6"}`, children: [
          !(s && i) && /* @__PURE__ */ o("span", { "aria-hidden": "true", className: `absolute left-1 border-l-hairline ${De} ${`${s ? "top-3" : "top-0"} ${i ? "h-3" : "bottom-0"}`}` }),
          /* @__PURE__ */ o("span", { "aria-hidden": "true", className: `absolute left-1 top-3 w-4 border-t-hairline ${De}` }),
          /* @__PURE__ */ o("div", { className: `text-sm leading-6 ${Ne}`, children: n.title }),
          /* @__PURE__ */ o("p", { className: `m-0 mt-1 text-sm leading-6 ${Me}`, children: n.text })
        ] }, n.title);
      }) });
    case "insights":
      return /* @__PURE__ */ o("ol", { className: `my-10 list-none border-b-hairline p-0 ${De}`, children: e.items.map((n, a) => /* @__PURE__ */ v(
        "li",
        {
          className: `grid grid-cols-[theme(spacing.16)_1fr] border-t-hairline py-6 ${De}`,
          children: [
            /* @__PURE__ */ o("span", { className: `text-2xl leading-none ${Ge}`, children: Ct(a + 1) }),
            /* @__PURE__ */ v("div", { children: [
              /* @__PURE__ */ o("div", { className: `text-lg leading-snug ${Ne}`, children: n.title }),
              /* @__PURE__ */ o("p", { className: `m-0 mt-2 text-sm leading-relaxed ${Me}`, children: n.text })
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
          className: `my-10 grid grid-cols-1 gap-4 ${n ? `sm:grid-cols-3${He("wide")}` : "sm:grid-cols-2"}`,
          children: e.items.map((a) => /* @__PURE__ */ v("div", { className: "plate-round bg-[var(--surface-muted)] p-5", children: [
            /* @__PURE__ */ o("div", { className: `text-base leading-snug ${Ne}`, children: a.title }),
            /* @__PURE__ */ o("p", { className: `m-0 mt-2 text-sm leading-relaxed ${Me}`, children: a.text })
          ] }, a.title))
        }
      );
    }
    case "quote":
      return /* @__PURE__ */ v("figure", { className: "my-10 m-0 border-l-hairline border-[var(--accent)] pl-6", children: [
        /* @__PURE__ */ o("blockquote", { className: `m-0 p-0 text-lg leading-relaxed ${Ne}`, children: e.text }),
        e.name && /* @__PURE__ */ v("figcaption", { className: "mt-4 flex items-center gap-3 text-sm", children: [
          /* @__PURE__ */ o(no, { size: "md", src: e.image, alt: "" }),
          /* @__PURE__ */ v("span", { children: [
            /* @__PURE__ */ o("span", { className: `block ${Ne}`, children: e.name }),
            e.role && /* @__PURE__ */ o("span", { className: `block text-xs ${qe}`, children: e.role })
          ] })
        ] })
      ] });
    case "statement":
      return /* @__PURE__ */ v("div", { className: `my-12 border-y-hairline py-10 ${De}${He("wide")}`, children: [
        e.kicker && /* @__PURE__ */ o("div", { className: `mb-4 text-xs uppercase tracking-wider ${Ge}`, children: e.kicker }),
        /* @__PURE__ */ o("p", { className: `m-0 text-2xl leading-snug ${Ne}`, children: e.text })
      ] });
    case "outcomes":
      return /* @__PURE__ */ o("div", { className: "my-10", children: /* @__PURE__ */ o(kr, { items: e.items }) });
  }
}
function So({
  blocks: e,
  slots: t,
  figureStart: r = 1,
  className: n = ""
}) {
  const a = ko(e, r);
  return /* @__PURE__ */ o("div", { className: `font-mono ${n}`, children: e.map((s, i) => /* @__PURE__ */ o(No, { b: s, fig: a.get(s), slots: t }, i)) });
}
function $o({
  study: e,
  className: t = ""
}) {
  const { title: r, summary: n, outcomes: a, meta: s, cover: i } = e;
  return /* @__PURE__ */ v("header", { className: `font-mono ${t}`, children: [
    /* @__PURE__ */ o("h1", { className: `m-0 text-2xl leading-tight sm:text-page-title ${Ne}`, children: r }),
    /* @__PURE__ */ o("p", { className: `m-0 mt-5 text-base leading-relaxed sm:text-lg ${Me}`, children: n }),
    a && a.length > 0 && /* @__PURE__ */ o("div", { className: "mt-10", children: /* @__PURE__ */ o(kr, { items: a }) }),
    s && s.length > 0 && // One fact a line: label and value joined by a dotted leader, like a
    // contents page. A long value wraps and stays flush right.
    /* @__PURE__ */ o("dl", { className: "m-0 mt-10 flex flex-col gap-2", children: s.map((l) => /* @__PURE__ */ v("div", { className: "flex items-baseline gap-3 text-sm", children: [
      /* @__PURE__ */ o("dt", { className: `flex-none text-xs uppercase tracking-wider ${qe}`, children: l.label }),
      /* @__PURE__ */ o(
        "span",
        {
          "aria-hidden": "true",
          className: `min-w-4 flex-1 border-b-hairline border-dotted ${De}`
        }
      ),
      /* @__PURE__ */ o("dd", { className: `m-0 text-right leading-relaxed ${Ne}`, children: l.value })
    ] }, l.label)) }),
    i && /* @__PURE__ */ v("figure", { className: `mt-12 m-0${He(i.width ?? "wide")}`, children: [
      /* @__PURE__ */ o("div", { className: "plate-round p-px bg-[var(--border-hairline)]", children: /* @__PURE__ */ o(et, { src: i.src, alt: i.alt, aspect: i.aspect }) }),
      /* @__PURE__ */ o(It, { caption: i.caption })
    ] })
  ] });
}
function Co({ n: e, section: t }) {
  return /* @__PURE__ */ v("header", { children: [
    /* @__PURE__ */ v("div", { className: "flex gap-3 text-xs uppercase tracking-wider", children: [
      /* @__PURE__ */ o("span", { className: Ge, children: Ct(e) }),
      /* @__PURE__ */ o("span", { className: qe, children: t.kicker })
    ] }),
    /* @__PURE__ */ o("h2", { className: `m-0 mt-4 text-xl leading-snug sm:text-2xl ${Ne}`, children: t.title }),
    t.intro && /* @__PURE__ */ o("p", { className: `m-0 mt-4 text-base leading-relaxed ${Me}`, children: t.intro })
  ] });
}
function Io({
  sections: e,
  slots: t,
  className: r = ""
}) {
  const n = e.filter((s) => !s.hidden);
  let a = 1;
  return /* @__PURE__ */ o("div", { className: `font-mono ${r}`, children: n.map((s, i) => {
    const l = a;
    return a += (s.blocks ?? []).reduce((d, c) => d + wr(c), 0), /* @__PURE__ */ v(
      "section",
      {
        id: s.id ?? wo(s.kicker),
        className: "mt-24 first:mt-0 sm:mt-32 sm:first:mt-0",
        children: [
          /* @__PURE__ */ o(Co, { n: i + 1, section: s }),
          s.blocks && s.blocks.length > 0 && /* @__PURE__ */ o(So, { blocks: s.blocks, slots: t, figureStart: l })
        ]
      },
      s.id ?? s.kicker
    );
  }) });
}
function As({
  study: e,
  slots: t,
  className: r = ""
}) {
  return /* @__PURE__ */ v("article", { className: `font-mono ${r}`, children: [
    /* @__PURE__ */ o($o, { study: e }),
    /* @__PURE__ */ o(Io, { sections: e.sections, slots: t, className: "mt-24 sm:mt-32" })
  ] });
}
const To = oe(function({ meta: t, title: r, description: n, titleSuffix: a, thumb: s, thumbPosition: i = "start", selected: l = !1, className: d = "", ...c }, m) {
  const u = "as" in c && c.as ? c.as : null, p = u ? "as" : "href" in c && c.href != null ? "a" : "onClick" in c && c.onClick != null ? "button" : "div", b = `
    block w-full text-left p-3 plate-round
    transition-colors [transition-duration:var(--duration-fast)]
    font-mono
    ${p !== "div" ? "cursor-pointer hover:bg-[var(--surface-muted)] focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]" : ""}
    ${l ? "bg-[var(--surface-muted)]" : ""}
    ${d}
  `, h = /* @__PURE__ */ v(fe, { children: [
    t && /* @__PURE__ */ o("span", { className: "block text-sm text-secondary-700 dark:text-secondary-600", children: t }),
    /* @__PURE__ */ v(
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
  ] }), f = s ? /* @__PURE__ */ v("span", { className: `flex items-start gap-4 ${i === "end" ? "flex-row-reverse" : ""}`, children: [
    /* @__PURE__ */ o("span", { className: "flex-shrink-0", children: s }),
    /* @__PURE__ */ o("span", { className: "block min-w-0 flex-1", children: h })
  ] }) : h;
  if (u) {
    const { asProps: N, ...x } = c, y = { ...x };
    return delete y.as, /* @__PURE__ */ o(u, { ref: m, className: b, ...y, ...N, children: f });
  }
  if (p === "a") {
    const { href: N, ...x } = c;
    return /* @__PURE__ */ o("a", { ref: m, href: N, className: b, ...x, children: f });
  }
  if (p === "button") {
    const { onClick: N, ...x } = c;
    return /* @__PURE__ */ o("button", { ref: m, type: "button", onClick: N, className: b, ...x, children: f });
  }
  return /* @__PURE__ */ o("div", { ref: m, className: b, ...c, children: f });
});
To.displayName = "ListRow";
const gt = oe(function({ variant: t = "inline", external: r = !1, className: n = "", children: a, ...s }, i) {
  const l = $(
    "font-mono text-[var(--accent)] transition-colors [transition-duration:var(--duration-fast)] hover:text-[var(--text-link-hover)]",
    "focus:outline-none focus-visible:[outline:var(--focus-ring-width)_solid_var(--focus-ring-primary)] focus-visible:[outline-offset:var(--focus-ring-offset)]",
    t === "inline" ? "underline underline-offset-2" : "no-underline hover:underline focus-visible:underline",
    n
  ), d = /* @__PURE__ */ v(fe, { children: [
    a,
    r && /* @__PURE__ */ v(fe, { children: [
      /* @__PURE__ */ o(X, { name: "ExternalLink", size: "3", className: "ml-1" }),
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
gt.displayName = "Link";
const Eo = {
  neutral: "Bell",
  success: "CheckCircle",
  warning: "AlertTriangle",
  error: "AlertCircle",
  info: "Info"
}, _o = {
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
function zo({ children: e, onClick: t, tone: r = "neutral", action: n, duration: a, onDismiss: s }) {
  const [i, l] = W(!1);
  G(() => {
    const x = requestAnimationFrame(() => l(!0));
    return () => cancelAnimationFrame(x);
  }, []);
  const [d, c] = W(!1), [m, u] = W(!1), p = d || m, b = q(s);
  G(() => {
    b.current = s;
  });
  const h = q(a ?? 0);
  G(() => {
    h.current = a ?? 0;
  }, [a]), G(() => {
    if (p || a == null || !Number.isFinite(a) || !b.current) return;
    const x = Date.now(), y = setTimeout(() => {
      var S;
      return (S = b.current) == null ? void 0 : S.call(b);
    }, Math.max(0, h.current));
    return () => {
      clearTimeout(y), h.current -= Date.now() - x;
    };
  }, [p, a]);
  const f = (x) => {
    x.currentTarget.contains(x.relatedTarget) || u(!1);
  }, g = _o[r], N = a === 1 / 0 && s != null;
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
        children: /* @__PURE__ */ v(
          "div",
          {
            className: `plate-round flex max-w-[min(28rem,calc(100vw-2rem))] items-center gap-2 px-3 py-2.5 font-mono text-sm ${g.fill} ${g.text}`,
            children: [
              /* @__PURE__ */ o("span", { className: `inline-flex shrink-0 ${g.icon}`, children: /* @__PURE__ */ o(X, { name: Eo[r], size: "4" }) }),
              /* @__PURE__ */ o("span", { className: "min-w-0 whitespace-nowrap overflow-hidden text-ellipsis", children: e }),
              n && /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  className: `${Ut} underline underline-offset-2`,
                  onClick: (x) => {
                    x.stopPropagation(), n.onClick(), s == null || s();
                  },
                  children: n.label
                }
              ),
              N && /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  "aria-label": "Dismiss notification",
                  className: Ut,
                  onClick: (x) => {
                    x.stopPropagation(), s == null || s();
                  },
                  children: /* @__PURE__ */ o(X, { name: "X", size: "3" })
                }
              )
            ]
          }
        )
      }
    )
  );
}
const Ao = 5e3, Tt = [];
let ot = Tt, Mo = 0;
const xt = /* @__PURE__ */ new Set();
function Nr(e) {
  ot = e, xt.forEach((t) => t());
}
function Sr(e) {
  return xt.add(e), () => {
    xt.delete(e);
  };
}
const $r = () => ot, Cr = () => Tt;
function Ve(e, t = {}) {
  const { id: r = `toast-${++Mo}`, duration: n = Ao, tone: a, ...s } = t, i = { id: r, message: e, duration: n, ...s };
  return a !== void 0 && (i.tone = a), Nr([...ot.filter((l) => l.id !== r), i]), r;
}
function Et(e) {
  Nr(e === void 0 ? Tt : ot.filter((t) => t.id !== e));
}
const Ro = Object.assign(Ve, {
  success: (e, t) => Ve(e, { ...t, tone: "success" }),
  warning: (e, t) => Ve(e, { ...t, tone: "warning" }),
  error: (e, t) => Ve(e, { ...t, tone: "error" }),
  info: (e, t) => Ve(e, { ...t, tone: "info" }),
  dismiss: Et
});
function Ms() {
  return { toasts: er(Sr, $r, Cr), toast: Ro, dismiss: Et };
}
function Rs({ toasts: e, onDismiss: t }) {
  const r = er(Sr, $r, Cr), n = e !== void 0, a = n ? e : r, s = n ? t : Et;
  return /* @__PURE__ */ o(
    "div",
    {
      "aria-live": "polite",
      className: "fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2",
      style: { zIndex: "var(--z-index-popover)" },
      children: a.map((i) => /* @__PURE__ */ o(
        zo,
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
function Ls({
  open: e,
  defaultOpen: t = !1,
  onOpenChange: r,
  "aria-label": n,
  closeLabel: a = "Close",
  children: s
}) {
  const [i, l] = Le({
    value: e,
    defaultValue: t,
    onChange: r
  }), d = ue(() => {
    i && l(!1);
  }, [i, l]), [c, m] = W(i);
  G(() => {
    i && m(!0);
  }, [i]);
  const u = c && !i, p = q(null), b = q(null), h = i && c;
  return G(() => {
    var f;
    if (h)
      return b.current = document.activeElement, (f = p.current) == null || f.focus(), () => {
        var g;
        (g = b.current) == null || g.focus(), b.current = null;
      };
  }, [h]), xr(p, h), G(() => {
    if (!i) return;
    const f = (g) => {
      g.key === "Escape" && d();
    };
    return document.addEventListener("keydown", f), () => document.removeEventListener("keydown", f);
  }, [i, d]), G(() => (i ? document.body.style.overflow = "hidden" : document.body.style.overflow = "unset", () => {
    document.body.style.overflow = "unset";
  }), [i]), c ? /* @__PURE__ */ v(fe, { children: [
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
        children: /* @__PURE__ */ v("div", { className: "plate-round-lg-top bg-[var(--surface-card)] px-5 pb-6 pt-1 flex flex-col items-center gap-3 max-h-[70vh]", children: [
          /* @__PURE__ */ v("div", { className: "relative flex h-touch w-full shrink-0 items-center justify-center", children: [
            /* @__PURE__ */ o("div", { className: "w-9 h-1 bg-[var(--surface-container-stroke)]", "aria-hidden": "true" }),
            /* @__PURE__ */ o(
              "button",
              {
                type: "button",
                onClick: d,
                "aria-label": a,
                className: "absolute right-0 top-0 inline-flex h-touch w-touch items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors [transition-duration:var(--duration-fast)] focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]",
                children: /* @__PURE__ */ o(X, { name: "X", size: "4" })
              }
            )
          ] }),
          /* @__PURE__ */ o("div", { className: "w-full overflow-y-auto", tabIndex: 0, children: s })
        ] })
      }
    )
  ] }) : null;
}
function Os() {
  const { resolvedTheme: e, setTheme: t } = Gr(), [r, n] = W(!1);
  if (G(() => {
    n(!0);
  }, []), !r)
    return /* @__PURE__ */ v("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ o("div", { className: "w-11 h-6 rounded-none bg-[var(--field-border)]" }),
      /* @__PURE__ */ o("span", { className: "text-sm font-mono text-[var(--text-secondary)]", children: "Theme" })
    ] });
  const a = e === "dark", s = a ? "Dark" : "Light", i = a ? "light" : "dark";
  return /* @__PURE__ */ v("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ o(
      yr,
      {
        checked: a,
        onCheckedChange: () => {
          t(i);
        },
        size: "sm",
        icon: a ? /* @__PURE__ */ o(X, { name: "Moon", size: "3", className: "text-[var(--border-focus)]" }) : /* @__PURE__ */ o(X, { name: "Sun", size: "3", className: "text-[var(--text-secondary)]" }),
        "aria-label": `Switch to ${i} theme`
      }
    ),
    /* @__PURE__ */ o("span", { className: "text-sm font-mono text-[var(--text-primary)]", children: s })
  ] });
}
const Ir = Be(null);
function _t(e) {
  const t = Te(Ir);
  if (!t)
    throw new Error(`[@scorp-ds/components] ${e} must be used inside <Tabs>.`);
  return t;
}
function Ps({
  value: e,
  defaultValue: t,
  onValueChange: r,
  children: n,
  className: a
}) {
  const s = e !== void 0, [i, l] = W(() => t ?? ""), d = s ? e : i, c = le().replace(/:/g, ""), m = q([]), u = ue(
    (b) => {
      s || l(b), r == null || r(b);
    },
    [s, r]
  ), p = je(
    () => ({
      value: d,
      onValueChange: u,
      baseId: c,
      listValuesRef: m,
      isControlled: s
    }),
    [d, u, c, s]
  );
  return /* @__PURE__ */ o(Ir.Provider, { value: p, children: /* @__PURE__ */ o("div", { className: $("w-full", a), children: n }) });
}
function Lo(e) {
  const t = [];
  return Ce.Children.forEach(e, (r) => {
    if (!Ce.isValidElement(r)) return;
    if (r.type.displayName === "TabsTrigger") {
      const a = r.props.value;
      typeof a == "string" && t.push(a);
    }
  }), t;
}
function Oo({
  children: e,
  className: t,
  "aria-label": r,
  "aria-labelledby": n
}) {
  const { value: a, isControlled: s, onValueChange: i, listValuesRef: l } = _t("TabsList"), d = Lo(e);
  l.current = d;
  const c = d.join("\0");
  return Ie(() => {
    const m = l.current;
    s || m.length === 0 || m.includes(a) || i(m[0]);
  }, [s, l, i, a, c]), /* @__PURE__ */ o(
    "div",
    {
      role: "tablist",
      "aria-label": r,
      "aria-labelledby": n,
      className: $(
        "flex flex-wrap gap-0 border-b-[length:var(--border-width-hairline)] border-solid border-[var(--surface-container-stroke)]",
        t
      ),
      children: e
    }
  );
}
Oo.displayName = "TabsList";
const Po = oe(function({ value: t, children: r, className: n, disabled: a, onKeyDown: s, onClick: i, type: l = "button", ...d }, c) {
  const { value: m, onValueChange: u, baseId: p, listValuesRef: b } = _t("TabsTrigger"), h = m === t, f = `${p}-tab-${t}`, g = `${p}-panel-${t}`, N = (C) => {
    u(C), requestAnimationFrame(() => {
      var w;
      (w = document.getElementById(`${p}-tab-${C}`)) == null || w.focus();
    });
  }, x = (C) => {
    const w = document.getElementById(`${p}-tab-${C}`);
    return w == null || !w.disabled;
  }, y = (C) => {
    const w = b.current, _ = w.indexOf(t);
    if (_ < 0) return null;
    for (let O = 1; O <= w.length; O += 1) {
      const F = w[((_ + C * O) % w.length + w.length) % w.length];
      if (F !== t && x(F)) return F;
    }
    return null;
  }, S = (C, w) => {
    const _ = b.current;
    for (let O = C; O >= 0 && O < _.length; O += w)
      if (x(_[O])) return _[O];
    return null;
  }, I = (C) => {
    const w = y(C);
    w && N(w);
  }, E = (C) => {
    if (s == null || s(C), C.defaultPrevented || a) return;
    const w = b.current;
    switch (C.key) {
      case "ArrowRight":
      case "ArrowDown":
        C.preventDefault(), I(1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        C.preventDefault(), I(-1);
        break;
      case "Home": {
        C.preventDefault();
        const _ = S(0, 1);
        _ && N(_);
        break;
      }
      case "End": {
        C.preventDefault();
        const _ = S(w.length - 1, -1);
        _ && N(_);
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
      className: $(
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
      onClick: (C) => {
        i == null || i(C), !C.defaultPrevented && !a && u(t);
      },
      onKeyDown: E,
      ...d,
      children: r
    }
  );
});
Po.displayName = "TabsTrigger";
function Do({ value: e, children: t, className: r, forceMount: n = !1 }) {
  const { value: a, baseId: s } = _t("TabsContent"), i = a === e, l = `${s}-tab-${e}`, d = `${s}-panel-${e}`;
  return !n && !i ? null : !i && n ? /* @__PURE__ */ o(
    "div",
    {
      id: d,
      role: "tabpanel",
      "aria-labelledby": l,
      hidden: !0,
      className: $("p-4 font-mono outline-none", r),
      children: t
    }
  ) : /* @__PURE__ */ o(
    "div",
    {
      id: d,
      role: "tabpanel",
      "aria-labelledby": l,
      tabIndex: 0,
      className: $(
        "p-4 font-mono outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--focus-offset-color)]",
        r
      ),
      children: t
    }
  );
}
Do.displayName = "TabsContent";
const jo = { sm: "size-control-sm", md: "size-control-md", lg: "size-control-lg" }, Bo = { animationTimingFunction: "steps(4, jump-none)" };
function zt({ variant: e = "text", lines: t = 1, size: r = "md", animated: n = !0, className: a }) {
  const s = n ? "animate-pulse motion-reduce:animate-none" : "", i = n ? Bo : void 0;
  if (e === "text") {
    const l = Math.max(1, Math.floor(t));
    return /* @__PURE__ */ o("div", { "aria-hidden": "true", "data-skeleton": "text", className: $("flex w-full flex-col gap-2", a), children: Array.from({ length: l }, (d, c) => /* @__PURE__ */ o(
      "span",
      {
        style: i,
        className: $(
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
      className: $(
        "block shrink-0 plate-round bg-[var(--surface-muted)]",
        e === "avatar" ? jo[r] : "h-24 w-full",
        s,
        a
      )
    }
  );
}
zt.displayName = "Skeleton";
const Fo = typeof window < "u" ? Ie : G, Tr = {
  compact: "px-3 py-2",
  // 12 / 8
  comfortable: "px-4 py-3",
  // 16 / 12
  spacious: "px-5 py-4"
  // 20 / 16
}, At = Be("compact"), Er = Be(null), Vo = oe(function({ className: t, striped: r, bordered: n, density: a = "compact", children: s, "aria-busy": i, ...l }, d) {
  const [c, m] = W(0), u = ue((b) => m((h) => h + b), []), p = /* @__PURE__ */ o(Er.Provider, { value: u, children: /* @__PURE__ */ o(At.Provider, { value: a, children: /* @__PURE__ */ o(
    "table",
    {
      ref: d,
      "aria-busy": i ?? (c > 0 ? !0 : void 0),
      className: $(
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
Vo.displayName = "Table";
const Wo = oe(function({ className: t, ...r }, n) {
  return /* @__PURE__ */ o(
    "thead",
    {
      ref: n,
      className: $(
        "border-b-[length:var(--border-width-hairline)] border-solid border-[var(--surface-container-stroke)] bg-[var(--surface-subtle)]",
        t
      ),
      ...r
    }
  );
});
Wo.displayName = "TableHeader";
const Ho = oe(function({ className: t, loading: r = !1, loadingRows: n = 3, emptyState: a, colSpan: s, children: i, ...l }, d) {
  const c = Te(Er), m = q(null), u = ue(
    (x) => {
      m.current = x, typeof d == "function" ? d(x) : d && (d.current = x);
    },
    [d]
  ), p = !r && a != null && Nt.toArray(i).length === 0, b = r || p, [h, f] = W(1);
  Fo(() => {
    var S, I, E;
    if (!b || s != null) return;
    const x = (E = (I = (S = m.current) == null ? void 0 : S.closest("table")) == null ? void 0 : I.tHead) == null ? void 0 : E.rows[0];
    if (!x) return;
    const y = Array.from(x.cells).reduce((C, w) => C + w.colSpan, 0);
    f(Math.max(1, y));
  }, [b, s]);
  const g = Math.max(1, s ?? h);
  G(() => {
    if (!(!r || !c))
      return c(1), () => c(-1);
  }, [r, c]);
  let N = i;
  if (r) {
    const x = Math.max(1, Math.floor(n));
    N = Array.from({ length: x }, (y, S) => /* @__PURE__ */ o(vt, { "aria-hidden": "true", "data-table-loading-row": "", children: Array.from({ length: g }, (I, E) => /* @__PURE__ */ o(yt, { children: /* @__PURE__ */ o("div", { className: "flex h-5 items-center", children: /* @__PURE__ */ o(zt, {}) }) }, E)) }, S));
  } else p && (N = /* @__PURE__ */ o(vt, { "data-table-empty-row": "", children: /* @__PURE__ */ o(yt, { colSpan: g, className: "text-center", children: a }) }));
  return /* @__PURE__ */ o("tbody", { ref: u, className: $(t), ...l, children: N });
});
Ho.displayName = "TableBody";
const Go = oe(function({ className: t, ...r }, n) {
  return /* @__PURE__ */ o(
    "tfoot",
    {
      ref: n,
      className: $(
        "border-t-[length:var(--border-width-hairline)] border-solid border-[var(--surface-container-stroke)] bg-[var(--surface-subtle)]",
        t
      ),
      ...r
    }
  );
});
Go.displayName = "TableFooter";
const vt = oe(function({ className: t, ...r }, n) {
  return /* @__PURE__ */ o(
    "tr",
    {
      ref: n,
      className: $(
        "border-b-[length:var(--border-width-hairline)] border-solid border-[var(--surface-container-stroke)] transition-colors [transition-duration:var(--duration-normal)]",
        t
      ),
      ...r
    }
  );
});
vt.displayName = "TableRow";
const Uo = oe(function({ className: t, scope: r = "col", ...n }, a) {
  const s = Te(At);
  return /* @__PURE__ */ o(
    "th",
    {
      ref: a,
      scope: r,
      className: $(
        Tr[s],
        "text-left font-bold text-[var(--text-primary)]",
        t
      ),
      ...n
    }
  );
});
Uo.displayName = "TableHead";
const yt = oe(function({ className: t, ...r }, n) {
  const a = Te(At);
  return /* @__PURE__ */ o(
    "td",
    {
      ref: n,
      className: $(
        Tr[a],
        "align-middle text-secondary-800 dark:text-secondary-200",
        t
      ),
      ...r
    }
  );
});
yt.displayName = "TableCell";
const Ko = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, tt = (e) => e === "top" || e === "bottom";
function dt(e, t, r, n, a, s) {
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
function qo(e, t, r, n, a) {
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
function Xo(e, t, r, n, a) {
  return tt(e) ? t === "start" ? r.left : t === "end" ? r.left + r.width - n : r.left + r.width / 2 - n / 2 : t === "start" ? r.top : t === "end" ? r.top + r.height - a : r.top + r.height / 2 - a / 2;
}
const Kt = (e, t, r) => r < t ? t : Math.min(Math.max(e, t), r);
function Yo({
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
  const b = tt(r) ? u : m, h = dt(r, e, d, c, a, s);
  if (l && h < b) {
    const y = Ko[r];
    dt(y, e, d, c, a, s) > h && (p = y);
  }
  const f = qo(p, e, m, u, a), g = Xo(p, n, e, m, u), N = tt(p) ? f : Kt(g, s, c - u - s), x = tt(p) ? Kt(g, s, d - m - s) : f;
  return {
    top: N,
    left: x,
    side: p,
    align: n,
    available: Math.max(0, dt(p, e, d, c, a, s))
  };
}
const Zo = typeof window < "u" ? Ie : G;
function Qo({
  open: e,
  anchorRef: t,
  floatingRef: r,
  side: n = "bottom",
  align: a = "start",
  offset: s = 8,
  padding: i = 8
}) {
  const [l, d] = W(null), c = ue(() => {
    const m = t.current, u = r.current;
    if (!m || !u) return;
    const p = m.getBoundingClientRect(), b = u.getBoundingClientRect(), h = Yo({
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
  return Zo(() => {
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
const Jo = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function _r({
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
  id: N,
  className: x,
  contentClassName: y,
  triggerWrapperClassName: S,
  portal: I = !1
}) {
  const [E, C] = Le({
    value: e,
    defaultValue: t,
    onChange: r
  }), w = le(), _ = N ?? `${w}-popover`, O = q(null), F = q(null), J = q("programmatic"), te = je(
    () => ({
      get current() {
        var z;
        return (a == null ? void 0 : a.current) ?? ((z = O.current) == null ? void 0 : z.firstElementChild) ?? O.current;
      }
    }),
    [a]
  ), { position: j } = Qo({ open: E, anchorRef: te, floatingRef: F, side: i, align: l, offset: d }), Y = (z) => {
    J.current = z, C(!1);
  }, ee = (z) => {
    var B, P, H;
    return z != null && (((B = F.current) == null ? void 0 : B.contains(z)) || ((P = O.current) == null ? void 0 : P.contains(z)) || ((H = a == null ? void 0 : a.current) == null ? void 0 : H.contains(z)) || !1);
  };
  G(() => {
    if (!E || !c) return;
    const z = (B) => {
      ee(B.target) || Y("outside");
    };
    return document.addEventListener("mousedown", z), () => document.removeEventListener("mousedown", z);
  }, [E, c]), G(() => {
    if (!E || !m) return;
    const z = (B) => {
      if (B.key !== "Escape") return;
      const P = B.target;
      (ee(P) || P === document.body || P === document.documentElement) && Y("escape");
    };
    return document.addEventListener("keydown", z), () => document.removeEventListener("keydown", z);
  }, [E, m]);
  const ne = q(E);
  G(() => {
    var z;
    if (E && !ne.current && (J.current = "programmatic", u && F.current && (F.current.querySelector(Jo) ?? F.current).focus({ preventScroll: !0 })), !E && ne.current && p) {
      const B = J.current, P = document.activeElement, H = P == null || P === document.body;
      B !== "outside" && B !== "blur" && (H || ee(P)) && ((z = te.current) == null || z.focus({ preventScroll: !0 }));
    }
    ne.current = E;
  }, [E]);
  const se = (z) => {
    const B = z.relatedTarget;
    B && !ee(B) && Y("blur");
  }, T = n && Ke(n) ? wt(
    n,
    {
      "aria-expanded": E,
      "aria-controls": E ? _ : void 0,
      "aria-haspopup": h === "dialog" ? "dialog" : void 0,
      onClick: (z) => {
        var B, P;
        (P = (B = n.props).onClick) == null || P.call(B, z), !z.defaultPrevented && (E ? Y("trigger") : C(!0));
      }
    }
  ) : null, k = (z) => I && typeof document < "u" ? Kr(z, document.body) : z, D = {
    position: "fixed",
    top: (j == null ? void 0 : j.top) ?? 0,
    left: (j == null ? void 0 : j.left) ?? 0,
    zIndex: "var(--z-index-popover)",
    minWidth: b && j ? j.anchorWidth : void 0,
    animationDuration: "var(--duration-fast)",
    // Exposed so content can cap its height to the room on the chosen side
    "--popover-available-height": j ? `${j.available}px` : void 0
  };
  return /* @__PURE__ */ v(fe, { children: [
    T && /* @__PURE__ */ o("span", { ref: O, className: $("inline-flex", S), children: T }),
    E && k(
      /* @__PURE__ */ o(
        "div",
        {
          ref: F,
          id: _,
          role: h ?? void 0,
          "aria-label": h ? f : void 0,
          "aria-labelledby": h ? g : void 0,
          tabIndex: -1,
          "data-side": (j == null ? void 0 : j.side) ?? i,
          "data-align": l,
          onBlur: se,
          style: D,
          className: $(
            "w-max max-w-[calc(100vw-1rem)] plate-round p-px bg-[var(--surface-container-stroke)] focus:outline-none",
            "animate-in fade-in motion-reduce:animate-none",
            // Measured before it is shown, so it never flashes at 0,0
            j ? "opacity-100" : "opacity-0",
            x
          ),
          children: /* @__PURE__ */ o(
            "div",
            {
              className: $(
                "plate-round bg-[var(--surface-card)] p-4 font-mono text-sm text-[var(--text-primary)]",
                y
              ),
              children: s
            }
          )
        }
      )
    )
  ] });
}
_r.displayName = "Popover";
const ea = (e, t) => e.label.toLowerCase().includes(t.trim().toLowerCase()), ta = oe(function({
  options: t,
  value: r,
  defaultValue: n = null,
  onValueChange: a,
  onInputChange: s,
  filter: i = ea,
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
  name: N,
  id: x,
  className: y,
  "aria-describedby": S,
  "aria-label": I,
  onKeyDown: E,
  onFocus: C,
  onBlur: w,
  ..._
}, O) {
  const F = _e({ error: p, helperText: m, errorMessage: u, describedBy: S }), J = le(), te = x ?? `${J}-input`, j = `${J}-listbox`, Y = `${J}-label`, ee = `${J}-empty`, ne = (A) => `${J}-option-${A}`, [se, T] = Le({
    value: r,
    defaultValue: n
  }), k = t.find((A) => A.value === se) ?? null, [D, z] = W(!1), [B, P] = W((k == null ? void 0 : k.label) ?? ""), [H, U] = W(!1), [re, Z] = W(-1), Q = q(null), be = q(null), me = q(null);
  G(() => {
    D || P((k == null ? void 0 : k.label) ?? "");
  }, [k == null ? void 0 : k.label, D]);
  const L = je(
    () => H && B !== "" ? t.filter((A) => i(A, B)) : t,
    [H, B, t, i]
  ), V = L.map((A, ae) => A.disabled ? -1 : ae).filter((A) => A >= 0), ie = V[0] ?? -1, we = V[V.length - 1] ?? -1, ge = (A, ae) => {
    if (V.length === 0) return -1;
    const xe = V.indexOf(A);
    if (xe === -1) return ae === 1 ? ie : we;
    const ze = (xe + ae + V.length) % V.length;
    return V[ze];
  }, de = (A) => {
    if (f) return;
    z(!0);
    const ae = k ? L.findIndex((xe) => xe.value === k.value && !xe.disabled) : -1;
    Z(A === "selected" ? ae >= 0 ? ae : ie : A === "first" ? ie : A === "last" ? we : -1);
  }, he = () => {
    z(!1), U(!1), Z(-1), P((k == null ? void 0 : k.label) ?? "");
  }, Oe = (A) => {
    T((A == null ? void 0 : A.value) ?? null), ((A == null ? void 0 : A.value) ?? null) !== se && (a == null || a((A == null ? void 0 : A.value) ?? null, A)), P((A == null ? void 0 : A.label) ?? ""), U(!1), z(!1), Z(-1);
  };
  G(() => {
    var ae;
    if (!D || re < 0) return;
    const A = document.getElementById(ne(re));
    (ae = A == null ? void 0 : A.scrollIntoView) == null || ae.call(A, { block: "nearest" });
  }, [D, re]);
  const at = (A) => {
    const ae = A.target.value;
    if (P(ae), U(!0), s == null || s(ae), !f) {
      z(!0);
      const xe = ae === "" ? t : t.filter((ze) => i(ze, ae));
      Z(xe.findIndex((ze) => !ze.disabled));
    }
  }, jr = (A) => {
    if (E == null || E(A), !(A.defaultPrevented || f))
      switch (A.key) {
        case "ArrowDown":
          A.preventDefault(), D ? Z((ae) => ge(ae, 1)) : de(A.altKey ? "none" : "selected");
          break;
        case "ArrowUp":
          A.preventDefault(), D ? Z((ae) => ge(ae, -1)) : de(k ? "selected" : "last");
          break;
        case "Home":
          D && V.length && (A.preventDefault(), Z(ie));
          break;
        case "End":
          D && V.length && (A.preventDefault(), Z(we));
          break;
        case "Enter":
          D && re >= 0 && L[re] && !L[re].disabled && (A.preventDefault(), Oe(L[re]));
          break;
        case "Escape":
          D ? (A.preventDefault(), he()) : (B !== "" || se != null) && (A.preventDefault(), Oe(null));
          break;
        case "Tab":
          D && he();
          break;
      }
  }, Br = (A) => {
    be.current = A, typeof O == "function" ? O(A) : O && (O.current = A);
  }, Rt = {
    sm: { input: "h-control-sm pl-3 pr-9", icon: "right-3" },
    md: { input: "h-control-md pl-4 pr-10", icon: "right-4" },
    lg: { input: "h-control-lg pl-5 pr-11", icon: "right-5" }
  }[d], st = F.invalid, Fr = st ? "bg-[var(--field-border-error)] focus-within:!bg-[var(--field-border-focus)]" : "bg-[var(--field-border)] hover:bg-[var(--field-border-hover)] focus-within:!bg-[var(--field-border-focus)]", Xe = c != null && c !== "", Vr = D && re >= 0 && L[re] ? ne(re) : void 0;
  return /* @__PURE__ */ v("div", { className: $("w-full", y), children: [
    /* @__PURE__ */ v("div", { className: "w-full space-y-1", children: [
      Xe && /* @__PURE__ */ o(
        "label",
        {
          id: Y,
          htmlFor: te,
          className: "block font-mono text-sm text-secondary-800 dark:text-secondary-200",
          children: c
        }
      ),
      /* @__PURE__ */ v(
        "div",
        {
          ref: Q,
          className: $(
            "relative w-full plate-round p-px transition-colors [transition-duration:var(--duration-fast)]",
            Fr,
            f && "opacity-50"
          ),
          children: [
            /* @__PURE__ */ o(
              "input",
              {
                ..._,
                ref: Br,
                id: te,
                type: "text",
                role: "combobox",
                autoComplete: "off",
                "aria-autocomplete": "list",
                "aria-expanded": D,
                "aria-controls": D ? L.length > 0 ? j : ee : void 0,
                "aria-activedescendant": Vr,
                "aria-invalid": st || void 0,
                "aria-describedby": F.describedBy,
                "aria-label": Xe ? void 0 : I,
                disabled: f,
                placeholder: g,
                value: B,
                onChange: at,
                onKeyDown: jr,
                onClick: () => {
                  D || de("selected");
                },
                onFocus: (A) => {
                  C == null || C(A), b && !D && de("selected");
                },
                onBlur: (A) => {
                  w == null || w(A), D && he();
                },
                className: $(
                  "w-full plate-round font-mono text-sm",
                  "transition-colors [transition-duration:var(--duration-fast)]",
                  "placeholder:text-[var(--field-placeholder)] focus:outline-none disabled:cursor-not-allowed",
                  st ? "bg-[var(--field-background-error)] text-[var(--text-primary)]" : "bg-[var(--field-background)] text-[var(--text-primary)]",
                  Rt.input
                )
              }
            ),
            /* @__PURE__ */ o(
              "span",
              {
                "aria-hidden": "true",
                className: $(
                  "pointer-events-none absolute top-1/2 -translate-y-1/2 inline-flex text-[var(--text-secondary)]",
                  "transition-transform [transition-duration:var(--duration-normal)] motion-reduce:transition-none",
                  D && "rotate-180",
                  Rt.icon
                ),
                children: /* @__PURE__ */ o(X, { name: "ChevronDown" })
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ o(Se, { ...F.message })
    ] }),
    N != null && /* @__PURE__ */ o("input", { type: "hidden", name: N, value: se ?? "" }),
    /* @__PURE__ */ o(
      _r,
      {
        open: D,
        onOpenChange: (A) => {
          A || he();
        },
        anchorRef: Q,
        role: null,
        autoFocus: !1,
        returnFocus: !1,
        closeOnEscape: !1,
        matchAnchorWidth: !0,
        portal: h,
        offset: 4,
        contentClassName: "p-0",
        children: L.length > 0 ? /* @__PURE__ */ o(
          "ul",
          {
            ref: me,
            id: j,
            role: "listbox",
            "aria-labelledby": Xe ? Y : void 0,
            "aria-label": Xe ? void 0 : I,
            className: "max-h-[min(var(--control-menu-max-height),var(--popover-available-height,var(--control-menu-max-height)))] overflow-y-auto py-1",
            children: L.map((A, ae) => {
              const xe = A.value === se, ze = ae === re;
              return (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events -- pointer path only; the keyboard selects through the input with aria-activedescendant
                /* @__PURE__ */ v(
                  "li",
                  {
                    id: ne(ae),
                    role: "option",
                    "aria-selected": xe,
                    "aria-disabled": A.disabled || void 0,
                    onMouseDown: (Wr) => Wr.preventDefault(),
                    onMouseMove: () => {
                      !A.disabled && re !== ae && Z(ae);
                    },
                    onClick: () => {
                      A.disabled || Oe(A);
                    },
                    className: $(
                      "flex min-h-touch items-center gap-2 px-4 py-2 font-mono text-sm",
                      A.disabled ? "cursor-not-allowed text-[var(--text-disabled)]" : "cursor-pointer text-[var(--text-primary)]",
                      ze && !A.disabled && "bg-[var(--surface-subtle)]"
                    ),
                    children: [
                      /* @__PURE__ */ o("span", { className: "min-w-0 flex-1 truncate", children: A.label }),
                      xe && /* @__PURE__ */ o(X, { name: "Check", className: "shrink-0 text-[var(--border-focus)]" })
                    ]
                  },
                  A.value
                )
              );
            })
          }
        ) : /* @__PURE__ */ o("div", { id: ee, role: "status", className: "px-4 py-3 font-mono text-sm text-[var(--text-secondary)]", children: l })
      }
    )
  ] });
});
ta.displayName = "Combobox";
const ra = {
  primary: "bg-primary-500 dark:bg-primary-400",
  neutral: "bg-secondary-600 dark:bg-secondary-400",
  info: "bg-info-600 dark:bg-info-400",
  success: "bg-success-600 dark:bg-success-400",
  warning: "bg-warning-600 dark:bg-warning-400",
  error: "bg-error-600 dark:bg-error-400"
}, na = { sm: "h-2", md: "h-3", lg: "h-4" }, qt = 4;
function oa() {
  if (typeof window > "u" || typeof getComputedStyle != "function") return 120;
  const e = getComputedStyle(document.documentElement).getPropertyValue("--duration-fast").trim(), t = e.endsWith("ms") ? parseFloat(e) : e.endsWith("s") ? parseFloat(e) * 1e3 : NaN;
  return Number.isFinite(t) && t > 0 ? t : 120;
}
function aa() {
  const e = "(prefers-reduced-motion: reduce)", [t, r] = W(
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
function sa({
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
  const c = le(), m = e == null || Number.isNaN(e), u = t > 0 ? t : 100, p = m ? 0 : Math.min(Math.max(e, 0), u), b = Math.round(p / u * 100), h = Math.floor(p / u * l), f = aa(), [g, N] = W(0);
  G(() => {
    if (!m || f) return;
    const y = window.setInterval(() => N((S) => (S + 1) % (l + qt)), oa());
    return () => window.clearInterval(y);
  }, [m, f, l]);
  const x = (y) => m ? f ? !0 : y > g - qt - 1 && y <= g - 1 : y < h;
  return /* @__PURE__ */ v("div", { className: $("w-full space-y-1.5 font-mono", d), children: [
    n && /* @__PURE__ */ v("div", { className: "flex items-baseline justify-between gap-3 text-sm", children: [
      /* @__PURE__ */ o("span", { id: c, className: "min-w-0 truncate text-[var(--text-primary)]", children: r }),
      a && !m && /* @__PURE__ */ v("span", { className: "shrink-0 tabular-nums text-[var(--text-secondary)]", "aria-hidden": "true", children: [
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
            className: $("flex gap-0.5 bg-[var(--surface-subtle)] p-0.5", na[s]),
            "aria-hidden": "true",
            children: Array.from({ length: l }, (y, S) => /* @__PURE__ */ o(
              "span",
              {
                "data-filled": x(S) || void 0,
                className: $(
                  "h-full flex-1",
                  x(S) ? ra[i] : "bg-[var(--surface-muted)]",
                  m && f && "opacity-50"
                )
              },
              S
            ))
          }
        )
      }
    )
  ] });
}
sa.displayName = "ProgressBar";
const ia = {
  sm: { root: "gap-3 px-4 py-6", icon: "6", plate: "p-2", title: "text-sm", description: "text-xs", button: "sm" },
  md: { root: "gap-4 px-6 py-12", icon: "8", plate: "p-3", title: "text-lg", description: "text-sm", button: "md" }
};
function la({
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
  const c = ia[s], m = (u, p) => /* @__PURE__ */ o(
    ye,
    {
      variant: p,
      size: c.button,
      onClick: u.onClick,
      href: u.href,
      iconLeft: u.icon ? pe(u.icon) : void 0,
      children: u.label
    }
  );
  return /* @__PURE__ */ v("div", { className: $("flex flex-col items-center text-center font-mono", c.root, d), children: [
    e && /* @__PURE__ */ o("span", { className: $("inline-flex plate-round bg-[var(--surface-subtle)] text-[var(--text-secondary)]", c.plate), children: pe(e, { size: c.icon }) }),
    /* @__PURE__ */ v("div", { className: "flex max-w-prose flex-col gap-1", children: [
      /* @__PURE__ */ o(i, { className: $("font-medium text-[var(--text-primary)]", c.title), children: t }),
      r && /* @__PURE__ */ o("p", { className: $("text-[var(--text-secondary)]", c.description), children: r })
    ] }),
    (n || a) && /* @__PURE__ */ v("div", { className: "flex flex-wrap items-center justify-center gap-3", children: [
      n && m(n, "primary"),
      a && m(a, "secondary")
    ] }),
    l
  ] });
}
la.displayName = "EmptyState";
const zr = Be(null), Ar = Be(null);
function Mr(e) {
  const t = Te(zr);
  if (!t) throw new Error(`${e} must be used inside <Accordion>.`);
  return t;
}
function Rr(e) {
  const t = Te(Ar);
  if (!t) throw new Error(`${e} must be used inside <AccordionItem>.`);
  return t;
}
function Ds(e) {
  const { children: t, headingLevel: r = 3, disabled: n = !1, className: a } = e, s = e.type === "multiple", i = q(null), l = (h) => h === void 0 ? void 0 : Array.isArray(h) ? h : h === "" ? [] : [h], [d, c] = Le({
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
    var y;
    const f = h.target;
    if (!f.hasAttribute("data-accordion-trigger")) return;
    const g = Array.from(
      ((y = i.current) == null ? void 0 : y.querySelectorAll("[data-accordion-trigger]:not(:disabled)")) ?? []
    ).filter((S) => S.closest("[data-accordion-root]") === i.current), N = g.indexOf(f);
    if (N === -1) return;
    let x = null;
    h.key === "ArrowDown" ? x = (N + 1) % g.length : h.key === "ArrowUp" ? x = (N - 1 + g.length) % g.length : h.key === "Home" ? x = 0 : h.key === "End" && (x = g.length - 1), x !== null && (h.preventDefault(), g[x].focus());
  };
  return /* @__PURE__ */ o(zr.Provider, { value: p, children: /* @__PURE__ */ o(
    "div",
    {
      ref: i,
      "data-accordion-root": "",
      onKeyDown: b,
      className: $("w-full border-t border-[var(--border-hairline)] font-mono", a),
      children: t
    }
  ) });
}
function js({ value: e, disabled: t = !1, children: r, className: n }) {
  const a = Mr("AccordionItem"), s = le(), i = a.isOpen(e), l = {
    value: e,
    open: i,
    disabled: t || a.disabled,
    triggerId: `${s}-trigger`,
    contentId: `${s}-content`
  };
  return /* @__PURE__ */ o(Ar.Provider, { value: l, children: /* @__PURE__ */ o("div", { "data-state": i ? "open" : "closed", className: $("border-b border-[var(--border-hairline)]", n), children: r }) });
}
function Bs({ children: e, className: t }) {
  const r = Mr("AccordionTrigger"), n = Rr("AccordionTrigger"), a = `h${r.headingLevel}`, s = r.isLocked(n.value);
  return /* @__PURE__ */ o(a, { className: "m-0", children: /* @__PURE__ */ v(
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
      className: $(
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
          X,
          {
            name: "ChevronRight",
            className: $(
              "shrink-0 text-[var(--text-secondary)] transition-transform [transition-duration:var(--duration-normal)] motion-reduce:transition-none",
              n.open && "rotate-90"
            )
          }
        )
      ]
    }
  ) });
}
function Fs({ children: e, className: t }) {
  const r = Rr("AccordionContent");
  return /* @__PURE__ */ o(
    "div",
    {
      id: r.contentId,
      role: "region",
      "aria-labelledby": r.triggerId,
      "data-state": r.open ? "open" : "closed",
      className: $(
        // grid-rows 0fr -> 1fr animates to the content's natural height;
        // visibility flips at the end of the close so hidden bodies leave
        // the tab order and accessibility tree.
        "grid transition-[grid-template-rows,visibility] [transition-duration:var(--duration-normal)] motion-reduce:transition-none",
        r.open ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"
      ),
      children: /* @__PURE__ */ o("div", { className: "min-h-0 overflow-hidden", children: /* @__PURE__ */ o("div", { className: $("px-4 pb-4 pt-1 font-mono text-sm text-[var(--text-secondary)]", t), children: e }) })
    }
  );
}
const ca = "focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]";
function da({
  items: e,
  maxItems: t,
  itemsBeforeCollapse: r = 1,
  itemsAfterCollapse: n = 1,
  expandLabel: a = (l) => `Show ${l} more breadcrumb${l === 1 ? "" : "s"}`,
  "aria-label": s = "Breadcrumb",
  className: i
}) {
  const [l, d] = W(!1), c = q(null), m = q(null), u = Math.max(0, r), p = Math.max(1, n), b = !l && t != null && e.length > t && e.length > u + p, h = b ? e.length - u - p : 0;
  G(() => {
    var y;
    if (!l || m.current == null) return;
    const x = (y = c.current) == null ? void 0 : y.querySelector(
      `[data-crumb-index="${m.current}"] a, [data-crumb-index="${m.current}"] [data-crumb-link]`
    );
    x == null || x.focus(), m.current = null;
  }, [l]);
  const f = e.length - 1, g = (x, y, S) => /* @__PURE__ */ v(
    "li",
    {
      "data-crumb-index": y,
      className: "inline-flex min-w-0 items-center",
      children: [
        S && /* @__PURE__ */ o(X, { name: "ChevronRight", size: "3", className: "mx-1 shrink-0 text-[var(--text-secondary)]" }),
        y === f ? /* @__PURE__ */ o(
          "span",
          {
            "aria-current": "page",
            className: "inline-flex min-h-touch min-w-0 items-center truncate px-1 text-[var(--text-primary)]",
            children: x.label
          }
        ) : x.as ? /* @__PURE__ */ o(
          gt,
          {
            variant: "quiet",
            as: x.as,
            asProps: { ...x.asProps, "data-crumb-link": "" },
            className: "inline-flex min-h-touch min-w-0 items-center truncate px-1",
            children: x.label
          }
        ) : /* @__PURE__ */ o(
          gt,
          {
            variant: "quiet",
            href: x.href ?? "#",
            className: "inline-flex min-h-touch min-w-0 items-center truncate px-1",
            children: x.label
          }
        )
      ]
    },
    x.key ?? y
  );
  let N;
  if (b) {
    const x = e.slice(0, u), y = e.slice(e.length - p);
    N = /* @__PURE__ */ v(fe, { children: [
      x.map((S, I) => g(S, I, I > 0)),
      /* @__PURE__ */ v("li", { className: "inline-flex items-center", children: [
        u > 0 && /* @__PURE__ */ o(X, { name: "ChevronRight", size: "3", className: "mx-1 shrink-0 text-[var(--text-secondary)]" }),
        /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            "aria-label": a(h),
            onClick: () => {
              m.current = u, d(!0);
            },
            className: $(
              "plate-round inline-flex h-touch min-w-touch items-center justify-center px-2 text-[var(--text-primary)]",
              "transition-colors [transition-duration:var(--duration-fast)] motion-reduce:transition-none hover:bg-[var(--surface-muted)]",
              ca
            ),
            children: /* @__PURE__ */ o("span", { "aria-hidden": "true", children: "..." })
          }
        )
      ] }),
      y.map((S, I) => g(S, e.length - p + I, !0))
    ] });
  } else
    N = e.map((x, y) => g(x, y, y > 0));
  return /* @__PURE__ */ o("nav", { "aria-label": s, className: $("font-mono text-sm", i), children: /* @__PURE__ */ o("ol", { ref: c, className: "flex min-w-0 flex-wrap items-center", children: N }) });
}
da.displayName = "Breadcrumbs";
const ut = (e, t) => t < e ? [] : Array.from({ length: t - e + 1 }, (r, n) => e + n);
function ua(e, t, r = 1, n = 1) {
  if (t <= 0) return [];
  const a = Math.min(Math.max(1, e), t), s = ut(1, Math.min(n, t)), i = ut(Math.max(t - n + 1, n + 1), t), l = Math.max(
    Math.min(a - r, t - n - r * 2 - 1),
    n + 2
  ), d = Math.min(
    Math.max(a + r, n + r * 2 + 2),
    i.length > 0 ? i[0] - 2 : t - 1
  ), c = [...s];
  l > n + 2 ? c.push("ellipsis-start") : n + 1 < t - n && c.push(n + 1), c.push(...ut(l, d)), d < t - n - 1 ? c.push("ellipsis-end") : t - n > n && c.push(t - n), c.push(...i);
  const m = /* @__PURE__ */ new Set();
  return c.filter((u) => typeof u == "number" && (u < 1 || u > t) || m.has(u) ? !1 : (m.add(u), !0));
}
const ma = {
  sm: "h-control-sm min-w-control-sm px-2 text-sm",
  md: "h-control-md min-w-control-md px-2.5 text-sm",
  lg: "h-control-lg min-w-control-lg px-3 text-base"
}, Lr = {
  sm: "min-h-touch min-w-touch",
  md: "min-h-touch min-w-touch",
  lg: "min-h-control-lg min-w-control-lg"
}, Xt = { sm: "4", md: "4", lg: "5" };
function mt({
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
      className: $(
        "group inline-flex items-center justify-center font-mono focus:outline-none",
        Lr[e],
        r ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      ),
      children: /* @__PURE__ */ o(
        "span",
        {
          className: $(
            "plate-round inline-flex items-center justify-center tabular-nums",
            "transition-colors [transition-duration:var(--duration-fast)] motion-reduce:transition-none",
            "group-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]",
            ma[e],
            t ? "bg-[var(--button-primary-background)] text-[var(--button-primary-text)]" : $(
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
function fa({
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
  const [b, h] = W(t), f = e !== void 0, N = Math.min(Math.max(1, f ? e : b), Math.max(1, r));
  if (r <= 0) return null;
  const x = (S) => {
    const I = Math.min(Math.max(1, S), r);
    I !== N && (f || h(I), n == null || n(I));
  }, y = ua(N, r, a, s);
  return /* @__PURE__ */ o("nav", { "aria-label": u, className: $("font-mono", p), children: /* @__PURE__ */ v("ul", { className: "flex flex-wrap items-center", children: [
    l && /* @__PURE__ */ o("li", { children: /* @__PURE__ */ o(mt, { size: i, label: c, disabled: N <= 1, onClick: () => x(N - 1), children: /* @__PURE__ */ o(X, { name: "ArrowLeft", size: Xt[i] }) }) }),
    y.map(
      (S) => typeof S == "number" ? /* @__PURE__ */ o("li", { children: /* @__PURE__ */ o(
        mt,
        {
          size: i,
          current: S === N,
          label: d(S),
          onClick: () => x(S),
          children: S
        }
      ) }, S) : /* @__PURE__ */ o(
        "li",
        {
          "aria-hidden": "true",
          className: $(
            "inline-flex items-center justify-center text-[var(--text-secondary)]",
            Lr[i],
            i === "lg" ? "text-base" : "text-sm"
          ),
          children: "..."
        },
        S
      )
    ),
    l && /* @__PURE__ */ o("li", { children: /* @__PURE__ */ o(mt, { size: i, label: m, disabled: N >= r, onClick: () => x(N + 1), children: /* @__PURE__ */ o(X, { name: "ArrowRight", size: Xt[i] }) }) })
  ] }) });
}
fa.displayName = "Pagination";
const Mt = Be({ collapsed: !1 });
function pa({ "aria-label": e, collapsed: t = !1, children: r, className: n }) {
  const a = Ce.Children.toArray(r).some(
    (s) => Ce.isValidElement(s) && s.type === Or
  );
  return /* @__PURE__ */ o(Mt.Provider, { value: { collapsed: t }, children: /* @__PURE__ */ o(
    "nav",
    {
      "aria-label": e,
      "data-collapsed": t || void 0,
      className: $(
        "border border-[var(--border-hairline)] bg-[var(--surface-container)] font-mono text-sm",
        t ? "w-fit p-2" : "w-64 p-4",
        n
      ),
      children: a ? /* @__PURE__ */ o("div", { className: "space-y-4", children: r }) : /* @__PURE__ */ o("ul", { className: "space-y-1", children: r })
    }
  ) });
}
pa.displayName = "SideNav";
function Or({ heading: e, children: t, className: r }) {
  const { collapsed: n } = Te(Mt), a = le();
  return /* @__PURE__ */ v(
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
            className: $(
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
const ba = "plate-round flex w-full min-h-touch items-center gap-3 px-3 py-2 text-left font-mono text-sm transition-colors [transition-duration:var(--duration-fast)] motion-reduce:transition-none focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]", ha = "text-[var(--text-secondary)] hover:bg-[var(--surface-muted)] hover:text-[var(--accent)]", ga = "bg-[var(--surface-muted)] text-[var(--accent)]";
function Pr(e) {
  let t = !1;
  return Ce.Children.forEach(e, (r) => {
    if (t || !Ce.isValidElement(r)) return;
    const n = r.props;
    (n.active || Pr(n.children)) && (t = !0);
  }), t;
}
function xa({
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
  const { collapsed: b } = Te(Mt), h = le(), f = Ce.Children.toArray(d).some(Ce.isValidElement), [g, N] = W(
    () => m ?? (f && Pr(d))
  ), x = c ?? g, y = () => {
    const w = !x;
    c === void 0 && N(w), u == null || u(w);
  }, S = /* @__PURE__ */ v(fe, { children: [
    t && pe(t, { className: "shrink-0" }),
    /* @__PURE__ */ o("span", { className: $("min-w-0 flex-1 truncate", b && "sr-only"), children: e }),
    !b && l && /* @__PURE__ */ o("span", { className: "ml-auto shrink-0", children: l }),
    f && /* @__PURE__ */ o(
      X,
      {
        name: x ? "ChevronDown" : "ChevronRight",
        size: b ? "3" : "4",
        className: $("shrink-0", !b && "ml-auto")
      }
    )
  ] }), I = $(ba, r ? ga : ha, b && "min-w-touch justify-center gap-1 px-2", p), E = b ? { "aria-label": e } : {};
  let C;
  return f ? C = /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      "aria-expanded": x,
      "aria-controls": h,
      onClick: y,
      className: I,
      ...E,
      children: S
    }
  ) : s ? C = /* @__PURE__ */ o(
    s,
    {
      className: I,
      "aria-current": r ? "page" : void 0,
      onClick: a,
      ...E,
      ...i,
      children: S
    }
  ) : n != null ? C = /* @__PURE__ */ o(
    "a",
    {
      href: n,
      "aria-current": r ? "page" : void 0,
      onClick: a,
      className: I,
      ...E,
      children: S
    }
  ) : C = /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      "aria-current": r ? "page" : void 0,
      onClick: a,
      className: I,
      ...E,
      children: S
    }
  ), /* @__PURE__ */ v("li", { children: [
    b ? /* @__PURE__ */ o(co, { content: e, side: "right", children: C }) : C,
    f && x && /* @__PURE__ */ o("ul", { id: h, className: $("mt-1 space-y-1", !b && "ml-6"), children: d })
  ] });
}
xa.displayName = "SideNavItem";
function va({
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
  const u = le(), [p, b] = W(i), h = s ?? p, f = n ?? t, g = (N) => {
    s === void 0 && b(N), l == null || l(N);
  };
  return /* @__PURE__ */ v(
    "header",
    {
      className: $(
        "w-full border-b border-[var(--border-hairline)] bg-[var(--surface-container)] font-mono text-sm text-[var(--text-primary)]",
        a && "sticky top-0 z-[var(--z-index-sticky)]",
        m
      ),
      children: [
        /* @__PURE__ */ v("div", { className: "flex min-h-control-lg items-center gap-4 px-4 py-1", children: [
          /* @__PURE__ */ o("div", { className: "flex shrink-0 items-center", children: e }),
          t && /* @__PURE__ */ o("nav", { "aria-label": c, className: "hidden min-w-0 flex-1 md:block", children: /* @__PURE__ */ o("div", { className: "flex flex-wrap items-center gap-4", children: t }) }),
          /* @__PURE__ */ v("div", { className: "ml-auto flex shrink-0 items-center gap-2", children: [
            r,
            f && /* @__PURE__ */ o(
              ye,
              {
                variant: "ghost",
                size: "lg",
                "aria-label": d,
                "aria-expanded": h,
                "aria-controls": u,
                onClick: () => g(!h),
                className: "min-w-touch md:hidden",
                children: /* @__PURE__ */ o(X, { name: h ? "X" : "Menu", size: "5" })
              }
            )
          ] })
        ] }),
        f && h && /* @__PURE__ */ o("div", { id: u, className: "border-t border-[var(--border-hairline)] px-4 py-3 md:hidden", children: /* @__PURE__ */ o("nav", { "aria-label": c, children: /* @__PURE__ */ o("div", { className: "flex flex-col items-start gap-1", children: f }) }) })
      ]
    }
  );
}
va.displayName = "AppHeader";
const Yt = /* @__PURE__ */ new Set();
function ya(e, t, r) {
  if (process.env.NODE_ENV === "production") return;
  const n = `${e}:${t}`;
  Yt.has(n) || (Yt.add(n), console.warn(`[@scorp-ds/components] ${e}: ${t} is deprecated. Use ${r}.`));
}
function wa({
  title: e,
  status: t,
  actions: r,
  active: n,
  variant: a,
  titleAs: s = "h2",
  scroll: i = !0,
  children: l,
  className: d,
  bodyClassName: c
}) {
  const m = le();
  a !== void 0 && ya("Window", "variant", "active");
  const u = n ?? a === "active";
  return /* @__PURE__ */ o(
    "section",
    {
      "aria-labelledby": m,
      "data-active": u || void 0,
      className: $(
        "plate-round-lg flex flex-col p-px",
        u ? "bg-[var(--accent)]" : "bg-[var(--surface-container-stroke)]",
        d
      ),
      children: /* @__PURE__ */ v("div", { className: "plate-round-lg flex min-h-0 flex-1 flex-col bg-[var(--surface-card)] font-mono", children: [
        /* @__PURE__ */ v(
          "div",
          {
            className: $(
              "flex min-h-control-sm shrink-0 items-center gap-2 border-b border-[var(--border-hairline)] px-4 py-1 text-xs",
              u && "bg-[var(--surface-muted)]"
            ),
            children: [
              u && /* @__PURE__ */ o(X, { name: "ChevronRight", size: "3", className: "shrink-0 text-[var(--text-primary)]" }),
              /* @__PURE__ */ o(
                s,
                {
                  id: m,
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
            tabIndex: i ? 0 : void 0,
            role: i ? "group" : void 0,
            "aria-labelledby": i ? m : void 0,
            className: $(
              "min-h-0 flex-1 p-4 text-sm text-[var(--text-primary)]",
              i && "overflow-auto focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]",
              c
            ),
            children: l
          }
        )
      ] })
    }
  );
}
wa.displayName = "Window";
const ka = 8;
function Dr({
  content: e,
  count: t,
  enabled: r = !0,
  onFollowChange: n,
  contentRef: a
}) {
  const s = q(null), [i, l] = W(!0), [d, c] = W(0), m = q(t), u = ue(
    (f) => {
      l((g) => (g !== f && (n == null || n(f)), f));
    },
    [n]
  ), p = ue(() => {
    const f = s.current;
    f && (f.scrollTop = f.scrollHeight);
  }, []);
  Ie(() => {
    const f = t - m.current;
    m.current = t, r && (i ? p() : f > 0 && c((g) => g + f));
  }, [e, t, r, i, p]), Ie(() => {
    const f = a == null ? void 0 : a.current;
    if (!r || !i || !f || typeof ResizeObserver > "u") return;
    const g = new ResizeObserver(() => p());
    return g.observe(f), () => g.disconnect();
  }, [a, r, i, p]);
  const b = ue(() => {
    const f = s.current;
    if (!f || !r) return;
    const g = f.scrollHeight - f.scrollTop - f.clientHeight <= ka;
    u(g), g && c(0);
  }, [r, u]), h = ue(() => {
    c(0), u(!0), p();
  }, [u, p]);
  return { scrollRef: s, onScroll: b, following: i, unseen: d, resume: h };
}
const Na = {
  info: { icon: "Info", tag: "INFO", tone: "text-info-700 dark:text-info-400" },
  warning: { icon: "AlertTriangle", tag: "WARN", tone: "text-warning-700 dark:text-warning-400" },
  error: { icon: "AlertCircle", tag: "ERROR", tone: "text-error-700 dark:text-error-400" },
  debug: { icon: "Settings", tag: "DEBUG", tone: "text-secondary-700 dark:text-secondary-400" }
};
function Sa({
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
  const { scrollRef: c, onScroll: m, following: u, unseen: p, resume: b } = Dr({
    content: e,
    count: e.length,
    enabled: t,
    onFollowChange: l
  }), h = e.some((g) => g.level), f = `${String(Math.max(e.length, 1)).length}ch`;
  return /* @__PURE__ */ v(
    "div",
    {
      className: $(
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
            className: $(
              "min-h-0 flex-1 overflow-auto py-2 font-mono text-xs leading-relaxed text-[var(--text-primary)]",
              i && "plate-round-lg bg-[var(--surface-page)]",
              "focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]"
            ),
            children: e.length === 0 ? /* @__PURE__ */ o("p", { className: "px-3 text-[var(--text-secondary)]", children: s }) : e.map((g, N) => {
              const x = g.level ? Na[g.level] : null;
              return /* @__PURE__ */ v(
                "div",
                {
                  "data-level": g.level,
                  className: $("flex gap-3 px-3", n ? "items-start" : "w-max min-w-full items-start"),
                  children: [
                    r && /* @__PURE__ */ o(
                      "span",
                      {
                        "aria-hidden": "true",
                        className: "shrink-0 select-none text-right tabular-nums text-[var(--text-secondary)]",
                        style: { minWidth: f },
                        children: N + 1
                      }
                    ),
                    g.timestamp && /* @__PURE__ */ o("span", { className: "shrink-0 tabular-nums text-[var(--text-secondary)]", children: g.timestamp }),
                    x ? /* @__PURE__ */ v("span", { className: $("inline-flex w-16 shrink-0 items-center gap-1 font-bold", x.tone), children: [
                      /* @__PURE__ */ o(X, { name: x.icon, size: "3", className: "shrink-0" }),
                      x.tag
                    ] }) : h && /* @__PURE__ */ o("span", { "aria-hidden": "true", className: "w-16 shrink-0" }),
                    /* @__PURE__ */ o("span", { className: $("min-w-0 flex-1", n ? "whitespace-pre-wrap break-words" : "whitespace-pre"), children: g.text })
                  ]
                },
                g.id
              );
            })
          }
        ),
        t && !u && /* @__PURE__ */ o("div", { className: "pointer-events-none absolute inset-x-0 bottom-3 flex justify-center", children: /* @__PURE__ */ o(
          ye,
          {
            variant: "secondary",
            size: "sm",
            onClick: b,
            iconLeft: /* @__PURE__ */ o(X, { name: "ChevronDown", size: "4" }),
            className: "pointer-events-auto",
            children: p > 0 ? `Jump to latest (${p} new)` : "Jump to latest"
          }
        ) })
      ]
    }
  );
}
Sa.displayName = "LogView";
const Ue = oe(function({ children: t, focusable: r = !1, as: n = "span", className: a, ...s }, i) {
  return /* @__PURE__ */ o(
    n,
    {
      ref: i,
      className: $(
        "sr-only",
        r && "focus:not-sr-only focus-within:not-sr-only",
        a
      ),
      ...s,
      children: t
    }
  );
});
Ue.displayName = "VisuallyHidden";
const $a = 2e3;
function Ca({
  code: e,
  language: t,
  title: r,
  showLineNumbers: n = !1,
  highlightLines: a,
  wrap: s = !1,
  copyable: i = !0,
  onCopy: l,
  framed: d = !0,
  "aria-label": c,
  className: m
}) {
  var C;
  const [u, p] = W("idle"), b = q(void 0);
  G(() => () => window.clearTimeout(b.current), []);
  const h = i && typeof navigator < "u" && typeof ((C = navigator.clipboard) == null ? void 0 : C.writeText) == "function", f = r ?? t, g = c ?? (typeof f == "string" && f !== "" ? f : "Code"), N = e.replace(/\n$/, "").split(`
`), x = new Set(a), y = x.size > 0, S = `${String(N.length).length}ch`, I = async () => {
    window.clearTimeout(b.current);
    try {
      await navigator.clipboard.writeText(e), p("copied"), l == null || l(e);
    } catch {
      p("failed");
    }
    b.current = window.setTimeout(() => p("idle"), $a);
  }, E = f != null || h;
  return /* @__PURE__ */ v(
    "figure",
    {
      "aria-label": g,
      "data-language": t,
      className: $("flex min-h-0 flex-col font-mono", d && "plate-round-lg bg-[var(--surface-container-stroke)] p-px", m),
      children: [
        /* @__PURE__ */ v("div", { className: $("flex min-h-0 flex-1 flex-col", d && "plate-round-lg bg-[var(--surface-page)]"), children: [
          E && /* @__PURE__ */ v("figcaption", { className: "flex min-h-control-sm shrink-0 items-center gap-2 border-b border-[var(--border-hairline)] py-1 pl-4 pr-1 text-xs text-[var(--text-secondary)]", children: [
            f != null && /* @__PURE__ */ o("span", { className: "min-w-0 truncate", children: f }),
            /* @__PURE__ */ o("span", { "aria-hidden": "true", className: "h-px min-w-4 flex-1 bg-[var(--surface-container-stroke)]" }),
            h && /* @__PURE__ */ v(
              ye,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onClick: I,
                iconLeft: u === "copied" ? "Check" : "Copy",
                children: [
                  u === "copied" ? "Copied" : u === "failed" ? "Copy failed" : "Copy",
                  u === "idle" && /* @__PURE__ */ o(Ue, { children: " code" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ o(
            "pre",
            {
              tabIndex: 0,
              className: $(
                "min-h-0 flex-1 overflow-auto py-2 text-xs leading-relaxed text-[var(--text-primary)]",
                "focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]"
              ),
              children: /* @__PURE__ */ o("code", { className: "block", children: N.map((w, _) => {
                const O = _ + 1, F = x.has(O);
                return /* @__PURE__ */ v(
                  "span",
                  {
                    "data-highlighted": F || void 0,
                    className: $("flex gap-3 px-4", !s && "w-max min-w-full", F && "bg-[var(--surface-muted)]"),
                    children: [
                      y && /* @__PURE__ */ o("span", { "aria-hidden": "true", className: "flex w-3 shrink-0 select-none items-center text-[var(--accent)]", children: F && /* @__PURE__ */ o(X, { name: "ChevronRight", size: "3" }) }),
                      n && /* @__PURE__ */ o(
                        "span",
                        {
                          "aria-hidden": "true",
                          className: "shrink-0 select-none text-right tabular-nums text-[var(--text-secondary)]",
                          style: { minWidth: S },
                          children: O
                        }
                      ),
                      /* @__PURE__ */ o("span", { className: $("min-w-0 flex-1", s ? "whitespace-pre-wrap break-words" : "whitespace-pre"), children: w === "" ? " " : w })
                    ]
                  },
                  O
                );
              }) })
            }
          )
        ] }),
        /* @__PURE__ */ o(Ue, { role: "status", children: u === "copied" ? "Copied to clipboard" : u === "failed" ? "Copy failed" : "" })
      ]
    }
  );
}
Ca.displayName = "CodeBlock";
const Ia = {
  neutral: "text-[var(--text-primary)]",
  primary: "bg-[var(--button-primary-background)] text-[var(--button-primary-text)] font-bold",
  success: "bg-success-50 text-success-800 dark:bg-success-950 dark:text-success-300",
  warning: "bg-warning-50 text-warning-800 dark:bg-warning-950 dark:text-warning-300",
  error: "bg-error-50 text-error-800 dark:bg-error-950 dark:text-error-300",
  info: "bg-info-50 text-info-800 dark:bg-info-950 dark:text-info-300"
};
function Ta({
  left: e,
  center: t,
  right: r,
  live: n = !1,
  "aria-label": a = "Status",
  className: s
}) {
  return /* @__PURE__ */ v(
    "div",
    {
      role: n ? "status" : "group",
      "aria-live": n ? "polite" : void 0,
      "aria-label": a,
      className: $(
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
Ta.displayName = "StatusLine";
function Ea({ icon: e, tone: t = "neutral", children: r, className: n }) {
  return /* @__PURE__ */ v(
    "span",
    {
      "data-tone": t,
      className: $("inline-flex min-w-0 items-center gap-1.5 whitespace-nowrap px-3", Ia[t], n),
      children: [
        e && pe(e, { size: "3", className: "shrink-0" }),
        /* @__PURE__ */ o("span", { className: "truncate", children: r })
      ]
    }
  );
}
Ea.displayName = "StatusLineSegment";
function _a({ items: e, layout: t = "inline", leader: r = !1, className: n }) {
  const a = t === "inline";
  return /* @__PURE__ */ o(
    "dl",
    {
      "data-layout": t,
      className: $("font-mono text-sm", a ? "space-y-1" : "space-y-3", n),
      children: e.map((s, i) => /* @__PURE__ */ v(
        "div",
        {
          className: a ? "flex items-baseline justify-between gap-2" : "flex flex-col gap-0.5",
          children: [
            /* @__PURE__ */ o(
              "dt",
              {
                className: $(
                  "text-[var(--text-secondary)]",
                  !a && "text-xs uppercase tracking-wider",
                  a && !r && "shrink-0",
                  a && r && "flex flex-1 items-baseline after:mx-2 after:min-w-4 after:flex-1 after:border-b after:border-dotted after:border-[var(--surface-container-stroke)] after:content-['']"
                ),
                children: s.term
              }
            ),
            /* @__PURE__ */ o("dd", { className: $("min-w-0 text-[var(--text-primary)]", a && "text-right"), children: s.description })
          ]
        },
        s.key ?? i
      ))
    }
  );
}
_a.displayName = "DescriptionList";
function za({
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
const Aa = {
  primary: "bg-primary-600 dark:bg-primary-400",
  neutral: "bg-secondary-600 dark:bg-secondary-400",
  info: "bg-info-600 dark:bg-info-400",
  success: "bg-success-600 dark:bg-success-400",
  warning: "bg-warning-600 dark:bg-warning-400",
  error: "bg-error-600 dark:bg-error-400"
};
function Ma({
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
  const p = le(), b = r - t || 1, h = Math.min(Math.max(e, t), r), f = (h - t) / b, g = l ?? `${Math.round(f * 100)}%`, N = d ?? za({ value: e, min: t, max: r, low: n, high: a, optimum: s }), x = Math.max(1, Math.round(c)), y = Math.round(f * x);
  return /* @__PURE__ */ v("div", { className: $("font-mono text-sm", u), "data-tone": N, children: [
    /* @__PURE__ */ v("div", { className: "mb-1 flex items-baseline justify-between gap-3", children: [
      /* @__PURE__ */ o("span", { id: p, className: "text-[var(--text-primary)]", children: i }),
      /* @__PURE__ */ v("span", { className: "inline-flex items-center gap-1 tabular-nums text-[var(--text-secondary)]", children: [
        N === "warning" && /* @__PURE__ */ o(X, { name: "AlertTriangle", size: "3" }),
        N === "error" && /* @__PURE__ */ o(X, { name: "AlertCircle", size: "3" }),
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
        children: Array.from({ length: x }, (S, I) => /* @__PURE__ */ o(
          "span",
          {
            "data-filled": I < y || void 0,
            className: $(
              "flex-1",
              m === "sm" ? "h-2" : "h-3",
              I < y ? Aa[N] : "bg-[var(--surface-muted)] ring-1 ring-inset ring-[var(--surface-container-stroke)]"
            )
          },
          I
        ))
      }
    )
  ] });
}
Ma.displayName = "Meter";
function Ra(e) {
  return e.textValue ? e.textValue : typeof e.label == "string" || typeof e.label == "number" ? String(e.label) : "";
}
const La = ["w-3/5", "w-2/5", "w-1/2"], Oa = "plate-round flex min-h-touch cursor-pointer items-center gap-2 py-1 pr-3 font-mono text-sm pl-[calc(var(--tree-level)_*_theme(spacing.4)_+_theme(spacing.2))] transition-colors [transition-duration:var(--duration-fast)] motion-reduce:transition-none";
function Pa({
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
  var se;
  const [h, f] = W(a), g = n ?? h, N = je(() => new Set(g), [g]), [x, y] = W(l), S = i !== void 0 ? i : x, [I, E] = W(null), C = q(/* @__PURE__ */ new Map()), w = q(!1), _ = q({ buffer: "", timer: 0 }), O = je(() => {
    const T = [], k = (D, z, B) => {
      for (const P of D) {
        const H = Array.isArray(P.children);
        T.push({ node: P, level: z, parentId: B, isBranch: H }), H && N.has(P.id) && k(P.children, z + 1, P.id);
      }
    };
    return k(e, 1, null), T;
  }, [e, N]), F = I && O.some((T) => T.node.id === I) && I || S && O.some((T) => T.node.id === S) && S || ((se = O[0]) == null ? void 0 : se.node.id) || null;
  G(() => {
    var T;
    !w.current || !I || (w.current = !1, (T = C.current.get(I)) == null || T.focus());
  }, [I, O]), G(() => () => clearTimeout(_.current.timer), []);
  const J = (T) => {
    var k;
    T && (w.current = !0, E(T), T === I && ((k = C.current.get(T)) == null || k.focus()));
  }, te = ue(
    (T, k) => {
      if (N.has(T) === k) return;
      const z = k ? [...g, T] : g.filter((B) => B !== T);
      n === void 0 && f(z), s == null || s(z);
    },
    [N, g, n, s]
  ), j = (T) => {
    T.node.disabled || S !== T.node.id && (i === void 0 && y(T.node.id), d == null || d(T.node.id));
  }, Y = (T, k) => {
    const D = _.current;
    clearTimeout(D.timer), D.buffer += T.toLowerCase(), D.timer = setTimeout(() => {
      D.buffer = "";
    }, 500);
    const z = O.length, B = D.buffer.length === 1 ? k + 1 : k;
    for (let P = 0; P < z; P++) {
      const H = O[(B + P) % z];
      if (Ra(H.node).toLowerCase().startsWith(D.buffer)) {
        J(H.node.id);
        return;
      }
    }
  }, ee = (T, k) => {
    var B, P, H, U, re;
    if (T.target !== T.currentTarget) return;
    const D = O.findIndex((Z) => Z.node.id === k.node.id), z = N.has(k.node.id);
    switch (T.key) {
      case "ArrowDown":
        T.preventDefault(), J((B = O[D + 1]) == null ? void 0 : B.node.id);
        break;
      case "ArrowUp":
        T.preventDefault(), J((P = O[D - 1]) == null ? void 0 : P.node.id);
        break;
      case "ArrowRight":
        if (T.preventDefault(), !k.isBranch) break;
        z ? ((H = O[D + 1]) == null ? void 0 : H.parentId) === k.node.id && J(O[D + 1].node.id) : te(k.node.id, !0);
        break;
      case "ArrowLeft":
        T.preventDefault(), k.isBranch && z ? te(k.node.id, !1) : k.parentId && J(k.parentId);
        break;
      case "Home":
        T.preventDefault(), J((U = O[0]) == null ? void 0 : U.node.id);
        break;
      case "End":
        T.preventDefault(), J((re = O[O.length - 1]) == null ? void 0 : re.node.id);
        break;
      case "Enter":
        T.preventDefault(), j(k), k.node.disabled || c == null || c(k.node.id);
        break;
      case " ":
        T.preventDefault(), j(k);
        break;
      default:
        m && T.key.length === 1 && !T.ctrlKey && !T.metaKey && !T.altKey && /\S/.test(T.key) && (T.preventDefault(), Y(T.key, D));
    }
  }, ne = (T, k, D) => T.map((z, B) => {
    const P = Array.isArray(z.children), H = P && N.has(z.id), U = S === z.id, re = { node: z, parentId: D, isBranch: P };
    return /* @__PURE__ */ v(
      "li",
      {
        ref: (Z) => {
          Z ? C.current.set(z.id, Z) : C.current.delete(z.id);
        },
        role: "treeitem",
        "aria-level": k,
        "aria-setsize": T.length,
        "aria-posinset": B + 1,
        "aria-expanded": P ? H : void 0,
        "aria-selected": U,
        "aria-disabled": z.disabled || void 0,
        tabIndex: F === z.id ? 0 : -1,
        onKeyDown: (Z) => ee(Z, re),
        onFocus: (Z) => {
          Z.target === Z.currentTarget && E(z.id);
        },
        className: "focus:outline-none [&:focus-visible>div]:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]",
        children: [
          /* @__PURE__ */ v(
            "div",
            {
              style: { "--tree-level": k - 1 },
              onClick: (Z) => {
                Z.stopPropagation(), J(z.id), j(re), P && te(z.id, !H), !z.disabled && !P && (c == null || c(z.id));
              },
              className: $(
                Oa,
                U ? "bg-[var(--surface-muted)] text-[var(--accent)]" : "text-[var(--text-primary)] hover:bg-[var(--surface-muted)]",
                z.disabled && "cursor-not-allowed opacity-50"
              ),
              children: [
                /* @__PURE__ */ o("span", { className: "inline-flex w-4 shrink-0 justify-center text-[var(--text-secondary)]", children: P && /* @__PURE__ */ o(X, { name: H ? "ChevronDown" : "ChevronRight", size: "3" }) }),
                z.icon && pe(z.icon, { className: "shrink-0" }),
                /* @__PURE__ */ o("span", { className: "min-w-0 truncate", children: z.label })
              ]
            }
          ),
          P && H && z.children.length > 0 && /* @__PURE__ */ o("ul", { role: "group", children: ne(z.children, k + 1, z.id) })
        ]
      },
      z.id
    );
  });
  return !u && e.length === 0 ? p == null ? null : /* @__PURE__ */ o(
    "div",
    {
      role: "group",
      "aria-label": t,
      "aria-labelledby": r,
      "data-tree-empty": "",
      className: $("font-mono text-sm", b),
      children: p
    }
  ) : /* @__PURE__ */ o(
    "ul",
    {
      role: "tree",
      "aria-label": t,
      "aria-labelledby": r,
      "aria-busy": u || void 0,
      className: $("font-mono text-sm", b),
      children: u ? (
        // Placeholder rows carry no meaning, so they are hidden from assistive tech;
        // aria-busy on the tree is what says the nodes are on their way.
        La.map((T) => /* @__PURE__ */ o("li", { role: "none", "data-tree-loading-row": "", children: /* @__PURE__ */ v("div", { "aria-hidden": "true", className: "flex min-h-touch items-center gap-2 py-1 pl-2 pr-3", children: [
          /* @__PURE__ */ o("span", { className: "w-4 shrink-0" }),
          /* @__PURE__ */ o("div", { className: T, children: /* @__PURE__ */ o(zt, {}) })
        ] }) }, T))
      ) : ne(e, 1, null)
    }
  );
}
Pa.displayName = "TreeView";
const Da = {
  sm: "h-5 min-w-5 px-1.5 text-xs",
  md: "h-6 min-w-6 px-2 text-sm"
};
function Zt({ size: e, children: t, className: r }) {
  return /* @__PURE__ */ o(
    "kbd",
    {
      className: $(
        "plate-round inline-flex bg-[var(--surface-container-stroke)] px-px pb-0.5 pt-px align-middle font-mono",
        r
      ),
      children: /* @__PURE__ */ o(
        "span",
        {
          className: $(
            "plate-round inline-flex items-center justify-center bg-[var(--surface-muted)] leading-none text-[var(--text-primary)]",
            Da[e]
          ),
          children: t
        }
      )
    }
  );
}
function rt({ keys: e, children: t, size: r = "sm", separator: n = "+", className: a }) {
  return !e || e.length <= 1 ? /* @__PURE__ */ o(Zt, { size: r, className: a, children: (e == null ? void 0 : e[0]) ?? t }) : /* @__PURE__ */ o("kbd", { className: $("inline-flex items-center gap-1 align-middle font-mono", a), children: e.map((s, i) => /* @__PURE__ */ v(kt, { children: [
    i > 0 && /* @__PURE__ */ o("span", { className: $("text-[var(--text-secondary)]", r === "sm" ? "text-xs" : "text-sm"), children: n }),
    /* @__PURE__ */ o(Zt, { size: r, children: s })
  ] }, `${s}-${i}`)) });
}
rt.displayName = "Kbd";
const Je = (e) => parseFloat(e) || 0;
function ja(e, t, r) {
  const n = getComputedStyle(e), a = Number.isFinite(parseFloat(n.lineHeight)) ? parseFloat(n.lineHeight) : parseFloat(n.fontSize) * 1.2;
  if (!Number.isFinite(a)) return null;
  const s = Je(n.paddingTop) + Je(n.paddingBottom), i = Je(n.borderTopWidth) + Je(n.borderBottomWidth), l = t * a + s + i, d = r === void 0 ? 1 / 0 : r * a + s + i;
  e.style.height = "auto";
  const c = e.scrollHeight + i;
  return { height: Math.min(Math.max(c, l), d), overflows: c > d };
}
function Ba(e, { value: t, minRows: r = 1, maxRows: n, enabled: a = !0 }) {
  Ie(() => {
    const s = e.current;
    if (!s || !a) return;
    const i = () => {
      const c = ja(s, r, n);
      c && (s.style.height = `${c.height}px`, s.style.overflowY = c.overflows ? "auto" : "hidden");
    };
    if (i(), typeof ResizeObserver > "u") return;
    let l = s.offsetWidth;
    const d = new ResizeObserver(() => {
      s.offsetWidth !== l && (l = s.offsetWidth, i());
    });
    return d.observe(s), () => d.disconnect();
  }, [e, t, r, n, a]);
}
const Fa = () => typeof navigator < "u" && /Mac|iPhone|iPad/.test(navigator.platform), Va = oe(
  ({
    value: e,
    defaultValue: t = "",
    onValueChange: r,
    onSubmit: n,
    busy: a = !1,
    onStop: s,
    submitKey: i = "enter",
    minRows: l = 1,
    maxRows: d = 8,
    size: c = "md",
    context: m,
    actions: u,
    hint: p,
    placeholder: b = "Message",
    label: h,
    "aria-label": f,
    "aria-labelledby": g,
    helperText: N,
    errorMessage: x,
    disabled: y = !1,
    maxLength: S,
    sendLabel: I = "Send message",
    stopLabel: E = "Stop response",
    name: C,
    className: w
  }, _) => {
    const [O, F] = Le({ value: e, defaultValue: t, onChange: r }), J = e !== void 0, te = q(null);
    Ba(te, { value: O, minRows: l, maxRows: d });
    const j = ue(
      (L) => {
        te.current = L, typeof _ == "function" ? _(L) : _ && (_.current = L);
      },
      [_]
    ), Y = _e({ helperText: N, errorMessage: x }), ee = Y.invalid, ne = le(), se = le(), T = h != null && h !== "", [k] = W(() => Fa() ? "Cmd" : "Ctrl"), D = O.trim() === "", z = () => {
      D || a || y || (n(O.trim()), J || F(""));
    }, B = (L) => {
      L.preventDefault(), z();
    }, P = (L) => {
      if (L.key !== "Enter" || L.nativeEvent.isComposing) return;
      const V = L.metaKey || L.ctrlKey;
      (i === "enter" ? !L.shiftKey : V) && (L.preventDefault(), z());
    }, U = p === !1 ? null : p ?? (i === "enter" ? /* @__PURE__ */ v(fe, { children: [
      /* @__PURE__ */ o(rt, { keys: ["Enter"] }),
      " send ",
      /* @__PURE__ */ o(rt, { keys: ["Shift", "Enter"] }),
      " new line"
    ] }) : /* @__PURE__ */ v(fe, { children: [
      /* @__PURE__ */ o(rt, { keys: [k, "Enter"] }),
      " send"
    ] })), re = [U != null ? ne : null, Y.describedBy].filter(Boolean).join(" ") || void 0, Z = ee ? "bg-[var(--field-border-error)] has-[textarea:focus]:!bg-[var(--field-border-focus)]" : "bg-[var(--field-border)] hover:bg-[var(--field-border-hover)] has-[textarea:focus]:!bg-[var(--field-border-focus)]", Q = {
      md: { text: "text-sm", field: "px-4 pt-3", row: "p-2", context: "px-4 pt-3" },
      lg: { text: "text-base", field: "px-5 pt-4", row: "p-3", context: "px-5 pt-4" }
    }[c], be = "relative before:content-[''] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-touch before:h-touch", me = a && s ? /* @__PURE__ */ o(ye, { type: "button", variant: "secondary", size: c, "aria-label": E, onClick: s, className: be, children: /* @__PURE__ */ o(X, { name: "Stop" }) }) : /* @__PURE__ */ o(
      ye,
      {
        type: "submit",
        variant: "primary",
        size: c,
        "aria-label": I,
        disabled: y || !a && D,
        loading: a,
        className: be,
        children: /* @__PURE__ */ o(X, { name: "Send" })
      }
    );
    return /* @__PURE__ */ v("div", { className: "w-full space-y-1", children: [
      T && /* @__PURE__ */ o("label", { htmlFor: se, className: "block font-mono text-sm text-secondary-800 dark:text-secondary-200", children: h }),
      /* @__PURE__ */ o(
        "form",
        {
          onSubmit: B,
          className: $(
            "plate-round-lg w-full p-px transition-colors [transition-duration:var(--duration-fast)]",
            Z,
            y && "cursor-not-allowed opacity-50",
            w
          ),
          children: /* @__PURE__ */ v(
            "fieldset",
            {
              disabled: y,
              "data-error": ee || void 0,
              className: $(
                "plate-round-lg flex min-w-0 flex-col font-mono",
                ee ? "bg-[var(--field-background-error)]" : "bg-[var(--field-background)]"
              ),
              children: [
                m && /* @__PURE__ */ o("div", { className: $("flex flex-wrap gap-1.5", Q.context), children: m }),
                /* @__PURE__ */ o(
                  "textarea",
                  {
                    ref: j,
                    id: se,
                    name: C,
                    rows: l,
                    value: O,
                    onChange: (L) => F(L.target.value),
                    onKeyDown: P,
                    placeholder: b,
                    "aria-label": f,
                    "aria-labelledby": g,
                    "aria-describedby": re,
                    "aria-invalid": ee || void 0,
                    disabled: y,
                    maxLength: S,
                    className: $(
                      "w-full resize-none bg-transparent text-[var(--text-primary)] focus:outline-none",
                      "placeholder:text-[var(--field-placeholder)] disabled:cursor-not-allowed",
                      Q.text,
                      Q.field
                    )
                  }
                ),
                /* @__PURE__ */ v("div", { className: $("flex items-center gap-2", Q.row), children: [
                  u && /* @__PURE__ */ o("div", { className: "flex items-center gap-1", children: u }),
                  /* @__PURE__ */ v("div", { className: "ml-auto flex items-center gap-3", children: [
                    U != null && /* @__PURE__ */ o(
                      "span",
                      {
                        id: ne,
                        className: "hidden items-center gap-1.5 text-xs text-[var(--text-secondary)] sm:flex",
                        children: U
                      }
                    ),
                    me
                  ] })
                ] })
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ o(Se, { ...Y.message })
    ] });
  }
);
Va.displayName = "Composer";
const Wa = { user: "You", assistant: "Scorp", system: "System" };
function Qt() {
  return /* @__PURE__ */ o("span", { "aria-hidden": "true", "data-cursor": "", className: "text-[var(--accent)]", children: "█" });
}
function Ha({
  author: e,
  label: t,
  meta: r,
  status: n = "done",
  errorMessage: a = "Something went wrong.",
  onRetry: s,
  actions: i,
  children: l,
  id: d,
  className: c
}) {
  const m = le(), u = t ?? Wa[e], p = n === "streaming";
  if (e === "system")
    return /* @__PURE__ */ v(
      "article",
      {
        id: d,
        "aria-labelledby": m,
        "data-author": "system",
        className: $("flex gap-3 font-mono text-xs text-[var(--text-secondary)]", c),
        children: [
          /* @__PURE__ */ o("span", { "aria-hidden": "true", className: "w-5 shrink-0" }),
          /* @__PURE__ */ v("p", { className: "min-w-0 flex-1 whitespace-pre-wrap break-words", children: [
            /* @__PURE__ */ o(Ue, { id: m, children: u }),
            l,
            r && /* @__PURE__ */ o("span", { className: "ml-2", children: r })
          ] })
        ]
      }
    );
  const b = e === "user", h = typeof l == "string" ? /* @__PURE__ */ v("p", { className: "whitespace-pre-wrap break-words", children: [
    l,
    p && /* @__PURE__ */ o(Qt, {})
  ] }) : /* @__PURE__ */ v(fe, { children: [
    l,
    p && /* @__PURE__ */ o(Qt, {})
  ] });
  return /* @__PURE__ */ v(
    "article",
    {
      id: d,
      "aria-labelledby": m,
      "aria-busy": p || void 0,
      "data-author": e,
      "data-status": n,
      className: $("flex gap-3 font-mono", c),
      children: [
        /* @__PURE__ */ o("span", { "aria-hidden": "true", className: "flex min-h-control-sm w-5 shrink-0 items-center self-start text-[var(--accent)]", children: b && /* @__PURE__ */ o(X, { name: "ChevronRight", size: "3" }) }),
        /* @__PURE__ */ v("div", { className: "min-w-0 flex-1 space-y-1", children: [
          /* @__PURE__ */ v("header", { className: "flex min-h-control-sm items-center gap-2 text-xs text-[var(--text-secondary)]", children: [
            /* @__PURE__ */ o("span", { id: m, className: "uppercase tracking-wider", children: u }),
            r && /* @__PURE__ */ o("span", { children: r }),
            i && /* @__PURE__ */ o("div", { className: "ml-auto flex items-center gap-1", children: i })
          ] }),
          /* @__PURE__ */ o(
            "div",
            {
              className: $(
                "space-y-3 text-sm leading-relaxed text-[var(--text-primary)]",
                b && "plate-round bg-[var(--surface-muted)] px-3 py-2"
              ),
              children: h
            }
          ),
          n === "stopped" && /* @__PURE__ */ o("p", { className: "text-xs text-[var(--text-secondary)]", children: "Stopped" }),
          n === "error" && /* @__PURE__ */ v("div", { className: "flex flex-wrap items-center gap-3 text-xs text-error-700 dark:text-error-400", children: [
            /* @__PURE__ */ v("p", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ o(X, { name: "AlertCircle", size: "3", className: "shrink-0" }),
              a
            ] }),
            s && /* @__PURE__ */ o(ye, { type: "button", variant: "secondary", size: "sm", onClick: s, iconLeft: "Repeat", children: "Retry" })
          ] })
        ] })
      ]
    }
  );
}
Ha.displayName = "Message";
const Ga = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  full: "max-w-full"
};
function Ua({
  children: e,
  busy: t = !1,
  autoScroll: r = !0,
  emptyState: n,
  width: a = "md",
  framed: s = !1,
  "aria-label": i,
  "aria-labelledby": l,
  onFollowChange: d,
  className: c
}) {
  const m = q(null), u = Nt.toArray(e).length, { scrollRef: p, onScroll: b, following: h, unseen: f, resume: g } = Dr({
    content: e,
    count: u,
    enabled: r,
    onFollowChange: d,
    contentRef: m
  }), [N, x] = W(""), y = q(t);
  return G(() => {
    t !== y.current && (y.current = t, x(t ? "Responding" : "Response complete"));
  }, [t]), /* @__PURE__ */ v(
    "div",
    {
      className: $(
        "relative flex min-h-0 flex-col",
        s && "plate-round-lg bg-[var(--surface-container-stroke)] p-px",
        c
      ),
      children: [
        /* @__PURE__ */ o(
          "div",
          {
            ref: p,
            role: "log",
            "aria-live": "polite",
            "aria-relevant": "additions",
            "aria-label": i,
            "aria-labelledby": l,
            tabIndex: 0,
            onScroll: b,
            className: $(
              "min-h-0 flex-1 overflow-y-auto font-mono",
              s && "plate-round-lg bg-[var(--surface-page)]",
              "focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]"
            ),
            children: /* @__PURE__ */ o(
              "div",
              {
                ref: m,
                className: $(
                  "mx-auto flex w-full flex-col p-4",
                  Ga[a],
                  u === 0 ? "h-full items-center justify-center" : "gap-6"
                ),
                children: u === 0 ? n : e
              }
            )
          }
        ),
        r && !h && /* @__PURE__ */ o("div", { className: "pointer-events-none absolute inset-x-0 bottom-3 flex justify-center", children: /* @__PURE__ */ o(
          ye,
          {
            type: "button",
            variant: "secondary",
            size: "sm",
            onClick: g,
            iconLeft: "ChevronDown",
            className: "pointer-events-auto",
            children: f > 0 ? `Jump to latest (${f} new)` : "Jump to latest"
          }
        ) }),
        /* @__PURE__ */ o(Ue, { role: "status", children: N })
      ]
    }
  );
}
Ua.displayName = "Transcript";
const Ka = {
  none: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8"
}, qa = {
  eyebrow: {
    text: "text-xs uppercase tracking-wider text-[var(--text-primary)]",
    space: "mb-3"
  },
  field: {
    text: "text-sm text-secondary-800 dark:text-secondary-200",
    space: "mb-2"
  }
}, Xa = oe(function({
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
  const f = le(), g = `${f}-legend`, N = n != null && n !== !1 && n !== "", x = N ? `${f}-description` : void 0, y = _e({
    error: l,
    errorMessage: d,
    describedBy: [u, x].filter(Boolean).join(" ") || void 0
  }), S = qa[a], I = c === "radiogroup" ? { role: "radiogroup", "aria-invalid": y.invalid || void 0 } : {};
  return /* @__PURE__ */ v(
    "fieldset",
    {
      ref: h,
      disabled: i,
      "aria-labelledby": p ?? g,
      "aria-describedby": y.describedBy,
      className: $("group/fieldset m-0 min-w-0 border-0 p-0", m),
      ...I,
      ...b,
      children: [
        /* @__PURE__ */ o(
          "legend",
          {
            id: g,
            className: $("block p-0 font-mono", S.text, N ? "mb-1" : S.space),
            children: t
          }
        ),
        N && /* @__PURE__ */ o(Se, { id: x, tone: "helper", className: S.space, children: n }),
        /* @__PURE__ */ o("div", { className: $("flex flex-col group-disabled/fieldset:opacity-50", Ka[s]), children: r }),
        /* @__PURE__ */ o(Se, { ...y.message, className: "mt-2" })
      ]
    }
  );
});
Xa.displayName = "Fieldset";
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
  base: { vertical: "flex-col", horizontal: "flex-row flex-wrap" },
  sm: { vertical: "sm:flex-col sm:flex-nowrap", horizontal: "sm:flex-row sm:flex-wrap" },
  md: { vertical: "md:flex-col md:flex-nowrap", horizontal: "md:flex-row md:flex-wrap" },
  lg: { vertical: "lg:flex-col lg:flex-nowrap", horizontal: "lg:flex-row lg:flex-wrap" },
  xl: { vertical: "xl:flex-col xl:flex-nowrap", horizontal: "xl:flex-row xl:flex-wrap" }
}, Qa = {
  base: { vertical: void 0, horizontal: "items-center" },
  sm: { vertical: "sm:items-stretch", horizontal: "sm:items-center" },
  md: { vertical: "md:items-stretch", horizontal: "md:items-center" },
  lg: { vertical: "lg:items-stretch", horizontal: "lg:items-center" },
  xl: { vertical: "xl:items-stretch", horizontal: "xl:items-center" }
}, Ja = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch"
}, es = ["base", "sm", "md", "lg", "xl"];
function ts(e, t) {
  return (typeof e == "string" ? [["base", e]] : es.flatMap((n) => {
    const a = e[n];
    return a === void 0 ? [] : [[n, a]];
  })).flatMap(([n, a]) => {
    const s = [Za[n][a]], i = Qa[n][a];
    return t === void 0 && i !== void 0 && s.push(i), s;
  });
}
const rs = oe(function({ children: t, gap: r = "4", className: n, axis: a = "vertical", align: s, ...i }, l) {
  return /* @__PURE__ */ o(
    "div",
    {
      ref: l,
      className: $(
        "flex",
        ts(a, s),
        Ya[r],
        s !== void 0 && Ja[s],
        n
      ),
      ...i,
      children: t
    }
  );
});
rs.displayName = "Stack";
const ns = {
  none: "p-0",
  1: "p-1",
  2: "p-2",
  3: "p-3",
  4: "p-4",
  5: "p-5",
  6: "p-6",
  8: "p-8"
}, os = {
  none: "px-0",
  1: "px-1",
  2: "px-2",
  3: "px-3",
  4: "px-4",
  5: "px-5",
  6: "px-6",
  8: "px-8"
}, as = {
  none: "py-0",
  1: "py-1",
  2: "py-2",
  3: "py-3",
  4: "py-4",
  5: "py-5",
  6: "py-6",
  8: "py-8"
}, ft = {
  none: "",
  page: "bg-[var(--surface-page)]",
  container: "bg-[var(--surface-container)]",
  card: "bg-[var(--surface-card)]",
  subtle: "bg-[var(--surface-subtle)]",
  muted: "bg-[var(--surface-muted)]",
  raised: "bg-[var(--surface-raised)]",
  inverse: "bg-[var(--surface-inverse)] text-[var(--text-on-inverse)]"
}, ss = oe(function({
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
  const u = l, p = n !== void 0 || a !== void 0, b = n ?? r, h = a ?? r, f = p ? $(
    b !== void 0 && os[b],
    h !== void 0 && as[h]
  ) : $(r !== void 0 && ns[r]);
  if (i === "none")
    return /* @__PURE__ */ o(u, { ref: m, className: $(ft[s], f, d), ...c, children: t });
  const g = s === "none" ? ft.card : ft[s];
  return /* @__PURE__ */ o(
    u,
    {
      ref: m,
      className: $("plate-round bg-[var(--surface-container-stroke)] p-px", d),
      ...c,
      children: /* @__PURE__ */ o("div", { className: $("plate-round h-full w-full", g, f), children: t })
    }
  );
});
ss.displayName = "Box";
const is = {
  none: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8"
}, ls = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  baseline: "items-baseline"
}, cs = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between"
}, ds = oe(function({ children: t, gap: r = "2", align: n = "center", justify: a = "start", wrap: s = !0, className: i, ...l }, d) {
  return /* @__PURE__ */ o(
    "div",
    {
      ref: d,
      className: $(
        "flex flex-row",
        s ? "flex-wrap" : "flex-nowrap",
        is[r],
        ls[n],
        cs[a],
        i
      ),
      ...l,
      children: t
    }
  );
});
ds.displayName = "Inline";
const us = {
  none: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8"
}, ms = {
  none: "gap-y-0",
  1: "gap-y-1",
  2: "gap-y-2",
  3: "gap-y-3",
  4: "gap-y-4",
  5: "gap-y-5",
  6: "gap-y-6",
  8: "gap-y-8"
}, fs = {
  none: "gap-x-0",
  1: "gap-x-1",
  2: "gap-x-2",
  3: "gap-x-3",
  4: "gap-x-4",
  5: "gap-x-5",
  6: "gap-x-6",
  8: "gap-x-8"
}, Jt = {
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
}, ps = ["base", "sm", "md", "lg", "xl"], bs = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch"
};
function hs(e) {
  return typeof e == "number" ? [Jt.base[e]] : ps.flatMap((t) => {
    const r = e[t];
    return r === void 0 ? [] : [Jt[t][r]];
  });
}
const gs = oe(function({ children: t, columns: r = 1, gap: n = "4", rowGap: a, columnGap: s, align: i = "stretch", className: l, ...d }, c) {
  return /* @__PURE__ */ o(
    "div",
    {
      ref: c,
      className: $(
        "grid",
        hs(r),
        us[n],
        a !== void 0 && ms[a],
        s !== void 0 && fs[s],
        bs[i],
        l
      ),
      ...d,
      children: t
    }
  );
});
gs.displayName = "Grid";
const xs = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  full: "max-w-full"
}, vs = oe(function({ children: t, size: r = "lg", gutter: n = !0, as: a = "div", className: s, ...i }, l) {
  return /* @__PURE__ */ o(
    a,
    {
      ref: l,
      className: $("mx-auto w-full", xs[r], n && "px-5 lg:px-10", s),
      ...i,
      children: t
    }
  );
});
vs.displayName = "Container";
const ys = {
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  none: "max-w-none"
}, ws = oe(function({ children: t, maxWidth: r = "md", andText: n = !1, fullHeight: a = !1, as: s = "div", className: i, ...l }, d) {
  return /* @__PURE__ */ o(
    s,
    {
      ref: d,
      className: $(
        "mx-auto w-full",
        ys[r],
        n && "text-center",
        a && "flex min-h-screen flex-col justify-center",
        i
      ),
      ...l,
      children: t
    }
  );
});
ws.displayName = "Center";
function Vs({ children: e, ...t }) {
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
  Ds as Accordion,
  Fs as AccordionContent,
  js as AccordionItem,
  Bs as AccordionTrigger,
  Es as Alert,
  va as AppHeader,
  no as Avatar,
  Ts as Badge,
  Ls as BottomSheet,
  ss as Box,
  da as Breadcrumbs,
  ye as Button,
  Is as Card,
  So as CaseStudyContent,
  $o as CaseStudyHeader,
  As as CaseStudyPage,
  Io as CaseStudySections,
  ws as Center,
  mo as Checkbox,
  Ca as CodeBlock,
  ta as Combobox,
  Va as Composer,
  vs as Container,
  _a as DescriptionList,
  _s as Divider,
  zs as Dropdown,
  la as EmptyState,
  Xa as Fieldset,
  gs as Grid,
  ds as Inline,
  Zn as Input,
  rt as Kbd,
  gt as Link,
  To as ListRow,
  Sa as LogView,
  Ha as Message,
  Ma as Meter,
  Cs as Modal,
  fa as Pagination,
  _r as Popover,
  sa as ProgressBar,
  bo as Radio,
  uo as Select,
  pa as SideNav,
  xa as SideNavItem,
  Or as SideNavSection,
  zt as Skeleton,
  po as Slider,
  gr as Spinner,
  rs as Stack,
  Ta as StatusLine,
  Ea as StatusLineSegment,
  yr as Switch,
  Un as TUI_ICON_GLYPHS,
  Vo as Table,
  Ho as TableBody,
  yt as TableCell,
  Go as TableFooter,
  Uo as TableHead,
  Wo as TableHeader,
  vt as TableRow,
  Ps as Tabs,
  Do as TabsContent,
  Oo as TabsList,
  Po as TabsTrigger,
  ho as Textarea,
  Vs as ThemeProvider,
  Os as ThemeToggle,
  zo as Toast,
  Rs as Toaster,
  co as Tooltip,
  Ua as Transcript,
  Pa as TreeView,
  X as TuiIcon,
  Ue as VisuallyHidden,
  wa as Window,
  $ as cn,
  za as getMeterTone,
  ua as getPaginationRange,
  Ro as toast,
  Ms as useToast
};
//# sourceMappingURL=index.esm.js.map

import { jsxs as k, jsx as o, Fragment as ge } from "react/jsx-runtime";
import $e, { useState as H, useEffect as U, forwardRef as re, useId as ce, useRef as X, useCallback as ue, useMemo as Le, useLayoutEffect as _e, isValidElement as Ue, cloneElement as gt, useImperativeHandle as Pr, Fragment as xt, Children as Wt, useSyncExternalStore as Kt, createContext as Oe, useContext as Se } from "react";
import { useTheme as Dr, ThemeProvider as jr } from "next-themes";
import { createPortal as Br } from "react-dom";
function qt(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var a = e.length;
    for (t = 0; t < a; t++) e[t] && (r = qt(e[t])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function Fr() {
  for (var e, t, r = 0, n = "", a = arguments.length; r < a; r++) (e = arguments[r]) && (t = qt(e)) && (n && (n += " "), n += t);
  return n;
}
const Vr = (e, t) => {
  const r = new Array(e.length + t.length);
  for (let n = 0; n < e.length; n++)
    r[n] = e[n];
  for (let n = 0; n < t.length; n++)
    r[e.length + n] = t[n];
  return r;
}, Hr = (e, t) => ({
  classGroupId: e,
  validator: t
}), Xt = (e = /* @__PURE__ */ new Map(), t = null, r) => ({
  nextPart: e,
  validators: t,
  classGroupId: r
}), Je = "-", Et = [], Gr = "arbitrary..", Ur = (e) => {
  const t = Kr(e), {
    conflictingClassGroups: r,
    conflictingClassGroupModifiers: n
  } = e;
  return {
    getClassGroupId: (i) => {
      if (i.startsWith("[") && i.endsWith("]"))
        return Wr(i);
      const l = i.split(Je), c = l[0] === "" && l.length > 1 ? 1 : 0;
      return Yt(l, c, t);
    },
    getConflictingClassGroupIds: (i, l) => {
      if (l) {
        const c = n[i], d = r[i];
        return c ? d ? Vr(d, c) : c : d || Et;
      }
      return r[i] || Et;
    }
  };
}, Yt = (e, t, r) => {
  if (e.length - t === 0)
    return r.classGroupId;
  const a = e[t], s = r.nextPart.get(a);
  if (s) {
    const d = Yt(e, t + 1, s);
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
}, Wr = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const t = e.slice(1, -1), r = t.indexOf(":"), n = t.slice(0, r);
  return n ? Gr + n : void 0;
})(), Kr = (e) => {
  const {
    theme: t,
    classGroups: r
  } = e;
  return qr(r, t);
}, qr = (e, t) => {
  const r = Xt();
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
  const n = e === "" ? t : Zt(t, e);
  n.classGroupId = r;
}, Zr = (e, t, r, n) => {
  if (Jr(e)) {
    vt(e(n), t, r, n);
    return;
  }
  t.validators === null && (t.validators = []), t.validators.push(Hr(r, e));
}, Qr = (e, t, r, n) => {
  const a = Object.entries(e), s = a.length;
  for (let i = 0; i < s; i++) {
    const [l, c] = a[i];
    vt(c, Zt(t, l), r, n);
  }
}, Zt = (e, t) => {
  let r = e;
  const n = t.split(Je), a = n.length;
  for (let s = 0; s < a; s++) {
    const i = n[s];
    let l = r.nextPart.get(i);
    l || (l = Xt(), r.nextPart.set(i, l)), r = l;
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
}, dt = "!", _t = ":", tn = [], At = (e, t, r, n, a) => ({
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
    let i = 0, l = 0, c = 0, d;
    const u = a.length;
    for (let f = 0; f < u; f++) {
      const g = a[f];
      if (i === 0 && l === 0) {
        if (g === _t) {
          s.push(a.slice(c, f)), c = f + 1;
          continue;
        }
        if (g === "/") {
          d = f;
          continue;
        }
      }
      g === "[" ? i++ : g === "]" ? i-- : g === "(" ? l++ : g === ")" && l--;
    }
    const m = s.length === 0 ? a : a.slice(c);
    let p = m, h = !1;
    m.endsWith(dt) ? (p = m.slice(0, -1), h = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      m.startsWith(dt) && (p = m.slice(1), h = !0)
    );
    const b = d && d > c ? d - c : void 0;
    return At(s, h, p, b);
  };
  if (t) {
    const a = t + _t, s = n;
    n = (i) => i.startsWith(a) ? s(i.slice(a.length)) : At(tn, !1, i, void 0, !0);
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
      const i = r[s], l = i[0] === "[", c = t.has(i);
      l || c ? (a.length > 0 && (a.sort(), n.push(...a), a = []), n.push(i)) : a.push(i);
    }
    return a.length > 0 && (a.sort(), n.push(...a)), n;
  };
}, on = (e) => ({
  cache: en(e.cacheSize),
  parseClassName: rn(e),
  sortModifiers: nn(e),
  ...Ur(e)
}), an = /\s+/, sn = (e, t) => {
  const {
    parseClassName: r,
    getClassGroupId: n,
    getConflictingClassGroupIds: a,
    sortModifiers: s
  } = t, i = [], l = e.trim().split(an);
  let c = "";
  for (let d = l.length - 1; d >= 0; d -= 1) {
    const u = l[d], {
      isExternal: m,
      modifiers: p,
      hasImportantModifier: h,
      baseClassName: b,
      maybePostfixModifierPosition: f
    } = r(u);
    if (m) {
      c = u + (c.length > 0 ? " " + c : c);
      continue;
    }
    let g = !!f, N = n(g ? b.substring(0, f) : b);
    if (!N) {
      if (!g) {
        c = u + (c.length > 0 ? " " + c : c);
        continue;
      }
      if (N = n(b), !N) {
        c = u + (c.length > 0 ? " " + c : c);
        continue;
      }
      g = !1;
    }
    const v = p.length === 0 ? "" : p.length === 1 ? p[0] : s(p).join(":"), w = h ? v + dt : v, $ = w + N;
    if (i.indexOf($) > -1)
      continue;
    i.push($);
    const T = a(N, g);
    for (let I = 0; I < T.length; ++I) {
      const M = T[I];
      i.push(w + M);
    }
    c = u + (c.length > 0 ? " " + c : c);
  }
  return c;
}, ln = (...e) => {
  let t = 0, r, n, a = "";
  for (; t < e.length; )
    (r = e[t++]) && (n = Qt(r)) && (a && (a += " "), a += n);
  return a;
}, Qt = (e) => {
  if (typeof e == "string")
    return e;
  let t, r = "";
  for (let n = 0; n < e.length; n++)
    e[n] && (t = Qt(e[n])) && (r && (r += " "), r += t);
  return r;
}, cn = (e, ...t) => {
  let r, n, a, s;
  const i = (c) => {
    const d = t.reduce((u, m) => m(u), e());
    return r = on(d), n = r.cache.get, a = r.cache.set, s = l, l(c);
  }, l = (c) => {
    const d = n(c);
    if (d)
      return d;
    const u = sn(c, r);
    return a(c, u), u;
  };
  return s = i, (...c) => s(ln(...c));
}, dn = [], le = (e) => {
  const t = (r) => r[e] || dn;
  return t.isThemeGetter = !0, t;
}, Jt = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, er = /^\((?:(\w[\w-]*):)?(.+)\)$/i, un = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, mn = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, fn = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, pn = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, bn = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, hn = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, ke = (e) => un.test(e), K = (e) => !!e && !Number.isNaN(Number(e)), Ne = (e) => !!e && Number.isInteger(Number(e)), nt = (e) => e.endsWith("%") && K(e.slice(0, -1)), ye = (e) => mn.test(e), tr = () => !0, gn = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  fn.test(e) && !pn.test(e)
), yt = () => !1, xn = (e) => bn.test(e), vn = (e) => hn.test(e), yn = (e) => !A(e) && !z(e), wn = (e) => Ie(e, or, yt), A = (e) => Jt.test(e), Ce = (e) => Ie(e, ar, gn), zt = (e) => Ie(e, En, K), kn = (e) => Ie(e, ir, tr), Nn = (e) => Ie(e, sr, yt), Mt = (e) => Ie(e, rr, yt), $n = (e) => Ie(e, nr, vn), Xe = (e) => Ie(e, lr, xn), z = (e) => er.test(e), Be = (e) => Ae(e, ar), Sn = (e) => Ae(e, sr), Rt = (e) => Ae(e, rr), In = (e) => Ae(e, or), Tn = (e) => Ae(e, nr), Ye = (e) => Ae(e, lr, !0), Cn = (e) => Ae(e, ir, !0), Ie = (e, t, r) => {
  const n = Jt.exec(e);
  return n ? n[1] ? t(n[1]) : r(n[2]) : !1;
}, Ae = (e, t, r = !1) => {
  const n = er.exec(e);
  return n ? n[1] ? t(n[1]) : r : !1;
}, rr = (e) => e === "position" || e === "percentage", nr = (e) => e === "image" || e === "url", or = (e) => e === "length" || e === "size" || e === "bg-size", ar = (e) => e === "length", En = (e) => e === "number", sr = (e) => e === "family-name", ir = (e) => e === "number" || e === "weight", lr = (e) => e === "shadow", _n = () => {
  const e = le("color"), t = le("font"), r = le("text"), n = le("font-weight"), a = le("tracking"), s = le("leading"), i = le("breakpoint"), l = le("container"), c = le("spacing"), d = le("radius"), u = le("shadow"), m = le("inset-shadow"), p = le("text-shadow"), h = le("drop-shadow"), b = le("blur"), f = le("perspective"), g = le("aspect"), N = le("ease"), v = le("animate"), w = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], $ = () => [
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
  ], T = () => [...$(), z, A], I = () => ["auto", "hidden", "clip", "visible", "scroll"], M = () => ["auto", "contain", "none"], x = () => [z, A, c], C = () => [ke, "full", "auto", ...x()], F = () => [Ne, "none", "subgrid", z, A], W = () => ["auto", {
    span: ["full", Ne, z, A]
  }, Ne, z, A], te = () => [Ne, "auto", z, A], ne = () => ["auto", "min", "max", "fr", z, A], B = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], Z = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], ee = () => ["auto", ...x()], E = () => [ke, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...x()], O = () => [ke, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...x()], P = () => [ke, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...x()], y = () => [e, z, A], G = () => [...$(), Rt, Mt, {
    position: [z, A]
  }], R = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], L = () => ["auto", "cover", "contain", In, wn, {
    size: [z, A]
  }], q = () => [nt, Be, Ce], Y = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    d,
    z,
    A
  ], V = () => ["", K, Be, Ce], ae = () => ["solid", "dashed", "dotted", "double"], ie = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], J = () => [K, nt, Rt, Mt], xe = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    b,
    z,
    A
  ], me = () => ["none", K, z, A], D = () => ["none", K, z, A], j = () => [K, z, A], se = () => [ke, "full", ...x()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [ye],
      breakpoint: [ye],
      color: [tr],
      container: [ye],
      "drop-shadow": [ye],
      ease: ["in", "out", "in-out"],
      font: [yn],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [ye],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [ye],
      shadow: [ye],
      spacing: ["px", K],
      text: [ye],
      "text-shadow": [ye],
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
        aspect: ["auto", "square", ke, A, z, g]
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
        columns: [K, A, z, l]
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
        object: T()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: I()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": I()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": I()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: M()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": M()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": M()
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
        inset: C()
      }],
      /**
       * Inset Inline
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": C()
      }],
      /**
       * Inset Block
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": C()
      }],
      /**
       * Inset Inline Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-s` in next major release
       */
      start: [{
        "inset-s": C(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        start: C()
      }],
      /**
       * Inset Inline End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-e` in next major release
       */
      end: [{
        "inset-e": C(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        end: C()
      }],
      /**
       * Inset Block Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-bs": [{
        "inset-bs": C()
      }],
      /**
       * Inset Block End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-be": [{
        "inset-be": C()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: C()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: C()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: C()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: C()
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
        z: [Ne, "auto", z, A]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [ke, "full", "auto", l, ...x()]
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
        flex: [K, ke, "auto", "initial", "none", A]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", K, z, A]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", K, z, A]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [Ne, "first", "last", "none", z, A]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": F()
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
        "grid-rows": F()
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
        gap: x()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": x()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": x()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...B(), "normal"]
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
        content: ["normal", ...B()]
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
        "place-content": B()
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
        p: x()
      }],
      /**
       * Padding Inline
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: x()
      }],
      /**
       * Padding Block
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: x()
      }],
      /**
       * Padding Inline Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: x()
      }],
      /**
       * Padding Inline End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: x()
      }],
      /**
       * Padding Block Start
       * @see https://tailwindcss.com/docs/padding
       */
      pbs: [{
        pbs: x()
      }],
      /**
       * Padding Block End
       * @see https://tailwindcss.com/docs/padding
       */
      pbe: [{
        pbe: x()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: x()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: x()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: x()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: x()
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
        "space-x": x()
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
        "space-y": x()
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
        inline: ["auto", ...O()]
      }],
      /**
       * Min-Inline Size
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-inline-size": [{
        "min-inline": ["auto", ...O()]
      }],
      /**
       * Max-Inline Size
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-inline-size": [{
        "max-inline": ["none", ...O()]
      }],
      /**
       * Block Size
       * @see https://tailwindcss.com/docs/height
       */
      "block-size": [{
        block: ["auto", ...P()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-block-size": [{
        "min-block": ["auto", ...P()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-block-size": [{
        "max-block": ["none", ...P()]
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
        text: ["base", r, Be, Ce]
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
        font: [n, Cn, kn]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", nt, A]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Sn, Nn, t]
      }],
      /**
       * Font Feature Settings
       * @see https://tailwindcss.com/docs/font-feature-settings
       */
      "font-features": [{
        "font-features": [A]
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
        tracking: [a, z, A]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [K, "none", z, zt]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          s,
          ...x()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", z, A]
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
        list: ["disc", "decimal", "none", z, A]
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
        decoration: [...ae(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [K, "from-font", "auto", z, Ce]
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
        "underline-offset": [K, "auto", z, A]
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
        indent: x()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", z, A]
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
        content: ["none", z, A]
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
        bg: G()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: R()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: L()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, Ne, z, A],
          radial: ["", z, A],
          conic: [Ne, z, A]
        }, Tn, $n]
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
        from: q()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: q()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: q()
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
        border: V()
      }],
      /**
       * Border Width Inline
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": V()
      }],
      /**
       * Border Width Block
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": V()
      }],
      /**
       * Border Width Inline Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": V()
      }],
      /**
       * Border Width Inline End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": V()
      }],
      /**
       * Border Width Block Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-bs": [{
        "border-bs": V()
      }],
      /**
       * Border Width Block End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-be": [{
        "border-be": V()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": V()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": V()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": V()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": V()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": V()
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
        "divide-y": V()
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
        border: [...ae(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...ae(), "hidden", "none"]
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
        outline: [...ae(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [K, z, A]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", K, Be, Ce]
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
        shadow: y()
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
        "inset-shadow": y()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: V()
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
        "ring-offset": [K, Ce]
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
        "inset-ring": V()
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
        opacity: [K, z, A]
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
        "mask-linear": [K]
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
        "mask-radial": [z, A]
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
        "mask-conic": [K]
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
        mask: G()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: R()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: L()
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
        mask: ["none", z, A]
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
          z,
          A
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: xe()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [K, z, A]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [K, z, A]
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
        "drop-shadow": y()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", K, z, A]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [K, z, A]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", K, z, A]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [K, z, A]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", K, z, A]
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
          z,
          A
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": xe()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [K, z, A]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [K, z, A]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", K, z, A]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [K, z, A]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", K, z, A]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [K, z, A]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [K, z, A]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", K, z, A]
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
        "border-spacing": x()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": x()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": x()
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
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", z, A]
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
        duration: [K, "initial", z, A]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", N, z, A]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [K, z, A]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", v, z, A]
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
        perspective: [f, z, A]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": T()
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
        scale: D()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": D()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": D()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": D()
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
        transform: [z, A, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: T()
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", z, A]
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
        "scroll-m": x()
      }],
      /**
       * Scroll Margin Inline
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": x()
      }],
      /**
       * Scroll Margin Block
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": x()
      }],
      /**
       * Scroll Margin Inline Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": x()
      }],
      /**
       * Scroll Margin Inline End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": x()
      }],
      /**
       * Scroll Margin Block Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbs": [{
        "scroll-mbs": x()
      }],
      /**
       * Scroll Margin Block End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbe": [{
        "scroll-mbe": x()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": x()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": x()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": x()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": x()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": x()
      }],
      /**
       * Scroll Padding Inline
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": x()
      }],
      /**
       * Scroll Padding Block
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": x()
      }],
      /**
       * Scroll Padding Inline Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": x()
      }],
      /**
       * Scroll Padding Inline End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": x()
      }],
      /**
       * Scroll Padding Block Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbs": [{
        "scroll-pbs": x()
      }],
      /**
       * Scroll Padding Block End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbe": [{
        "scroll-pbe": x()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": x()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": x()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": x()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": x()
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
        "will-change": ["auto", "scroll", "contents", "transform", z, A]
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
        stroke: [K, Be, Ce, zt]
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
}, An = /* @__PURE__ */ cn(_n);
function S(...e) {
  return An(Fr(e));
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
], zn = 2, Mn = 100, Lt = "(prefers-reduced-motion: reduce)";
function cr(e) {
  return Ve.filter((t, r) => e === null || (r - e + Ve.length) % Ve.length >= zn).map(([t, r]) => `M${t} ${r}h2v2h-2Z`).join("");
}
const Rn = Ve.map((e, t) => cr(t)), Ln = cr(null);
function On() {
  const [e, t] = H(
    () => typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia(Lt).matches
  );
  return U(() => {
    var a;
    if (typeof window > "u" || typeof window.matchMedia != "function") return;
    const r = window.matchMedia(Lt), n = () => t(r.matches);
    return n(), (a = r.addEventListener) == null || a.call(r, "change", n), () => {
      var s;
      return (s = r.removeEventListener) == null ? void 0 : s.call(r, "change", n);
    };
  }, []), e;
}
function dr({ size: e = "md", label: t = "Loading", className: r }) {
  const n = On(), [a, s] = H(0);
  U(() => {
    if (n) return;
    const d = setInterval(() => s((u) => (u + 1) % Ve.length), Mn);
    return () => clearInterval(d);
  }, [n]);
  const i = {
    sm: { box: "w-3 h-3", pixel: 1.5 },
    md: { box: "w-4 h-4", pixel: 2 },
    lg: { box: "w-6 h-6", pixel: 3 }
  }, { box: l, pixel: c } = i[e];
  return /* @__PURE__ */ k("span", { role: "status", className: S("inline-flex shrink-0 items-center justify-center", l, r), children: [
    /* @__PURE__ */ o(
      "svg",
      {
        "aria-hidden": "true",
        viewBox: "0 0 8 8",
        width: 8 * c,
        height: 8 * c,
        fill: "currentColor",
        shapeRendering: "crispEdges",
        "data-spinner-frame": n ? "static" : a,
        children: /* @__PURE__ */ o("path", { d: n ? Ln : Rn[a] })
      }
    ),
    /* @__PURE__ */ o("span", { className: "sr-only", children: t })
  ] });
}
dr.displayName = "Spinner";
const Pn = {
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
}, Dn = {
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
function jn(e) {
  let t = "";
  return e.forEach((r, n) => {
    for (const a of r.matchAll(/#+/g))
      t += `M${a.index} ${n}h${a[0].length}v1h-${a[0].length}Z`;
  }), t;
}
const Bn = Object.fromEntries(
  Object.entries(Dn).map(([e, t]) => [e, jn(t)])
), Ot = {
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
  const n = Bn[e], { box: a, pixel: s } = Ot[t] ?? Ot[4];
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
function Fn(e) {
  return typeof e == "string" && Object.prototype.hasOwnProperty.call(Pn, e);
}
function pe(e, t = {}) {
  return Fn(e) ? /* @__PURE__ */ o(Q, { name: e, ...t }) : e;
}
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
    "aria-label": p,
    "aria-labelledby": h,
    ...b
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
      (B) => typeof B == "object" && B !== null && "type" in B
    ) : !1;
    U(() => {
      if (process.env.NODE_ENV === "production" || !(e === "icon" || N())) return;
      p != null && String(p).trim() !== "" || h != null && String(h).trim() !== "" || console.warn(
        "[@scorp-ds/components] Button: icon-only buttons should include aria-label or aria-labelledby for screen readers."
      );
    }, [e, t, a, s, i, p, h]);
    const v = () => {
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
    }, T = {
      sm: "gap-1.5",
      // 6px - tighter for visual balance in compact buttons
      md: "gap-2",
      // 8px - standard spacing
      lg: "gap-2.5"
      // 10px - more breathing room for larger buttons
    }, I = (B) => {
      if (!B) return null;
      const Z = pe(B);
      return typeof Z == "object" && Z !== null && "type" in Z ? /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center shrink-0 ${$[t]}`, children: Z }) : Z;
    }, M = () => N() && a ? typeof a == "object" && a !== null && "type" in a ? /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center shrink-0 ${$[t]}`, children: a }) : /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center shrink-0 ${$[t]}`, children: a }) : a, x = {
      "--btn-ring": e === "primary" || e === "link" ? "var(--focus-ring-primary)" : e === "destructive" ? "var(--focus-ring-destructive)" : e === "icon" ? "var(--focus-ring-icon)" : "var(--focus-ring-secondary)",
      outline: "none"
    }, C = u && !r, F = (B) => {
      if (C) {
        B.preventDefault();
        return;
      }
      m == null || m(B);
    }, W = C ? "relative cursor-progress" : "", te = /* @__PURE__ */ k(ge, { children: [
      s && I(s),
      M(),
      i && I(i)
    ] }), ne = C ? /* @__PURE__ */ k(ge, { children: [
      /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center opacity-0 ${T[t]}`, children: te }),
      /* @__PURE__ */ o("span", { "aria-hidden": "true", className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ o(dr, { size: t }) })
    ] }) : te;
    return l ? /* @__PURE__ */ o(
      "a",
      {
        ref: f,
        href: r ? void 0 : l,
        target: c,
        rel: d,
        "aria-disabled": r || C || void 0,
        "aria-busy": C || void 0,
        className: `${g} ${v()} ${w[e]} ${T[t]} ${W} no-underline ${r ? "pointer-events-none opacity-50" : ""} ${n}`,
        style: x,
        "aria-label": p,
        "aria-labelledby": h,
        onClick: F,
        ...b,
        children: ne
      }
    ) : /* @__PURE__ */ o(
      "button",
      {
        ref: f,
        disabled: r,
        className: `${g} ${v()} ${w[e]} ${T[t]} ${W} ${n}`,
        style: x,
        "aria-label": p,
        "aria-labelledby": h,
        "aria-disabled": C || void 0,
        "aria-busy": C || void 0,
        onClick: F,
        ...b,
        children: ne
      }
    );
  }
);
We.displayName = "Button";
const Pt = (e) => e != null && e !== !1 && e !== "";
function Pe({ error: e, helperText: t, errorMessage: r, describedBy: n }) {
  const a = ce(), s = Pt(r), i = !s && Pt(t), l = s || i ? `${a}-message` : void 0;
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
function De({
  id: e,
  tone: t,
  children: r,
  className: n = ""
}) {
  return e == null ? null : /* @__PURE__ */ k(
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
const Vn = re(
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
    const p = Pe({ error: r, helperText: n, errorMessage: a, describedBy: d }), h = p.invalid, b = ce(), f = c ?? (l != null && l !== "" ? b : void 0), g = `
      w-full
      font-mono text-sm
      transition-colors [transition-duration:var(--duration-fast)]
      placeholder:text-[var(--field-placeholder)]
      disabled:cursor-not-allowed
      focus:outline-none
    `, N = {
      sm: "h-control-sm px-3 py-1.5 plate-round",
      md: "h-control-md px-4 py-2.5 plate-round",
      lg: "h-control-lg px-5 py-3.5 plate-round"
    }, v = h ? "bg-[var(--field-background-error)] text-[var(--text-primary)]" : "bg-[var(--field-background)] text-[var(--text-primary)]", w = h ? "bg-[var(--field-border-error)] focus-within:!bg-[var(--field-border-focus)]" : "bg-[var(--field-border)] hover:bg-[var(--field-border-hover)] focus-within:!bg-[var(--field-border-focus)]", $ = h ? "border-b border-[var(--field-border-error)] focus:!border-[var(--field-border-focus)]" : "border-b border-[var(--field-border)] hover:border-[var(--field-border-hover)] focus:!border-[var(--field-border-focus)]", T = t === "quiet" ? /* @__PURE__ */ o(
      "input",
      {
        ref: m,
        id: f,
        disabled: s,
        "aria-invalid": h || void 0,
        "aria-describedby": p.describedBy,
        className: `${g} ${N[e].replace("plate-round", "rounded-none")} !px-0 bg-transparent text-[var(--text-primary)] disabled:opacity-50 ${$} ${i}`,
        ...u
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
              ref: m,
              id: f,
              disabled: s,
              "aria-invalid": h || void 0,
              "aria-describedby": p.describedBy,
              className: `${g} ${N[e]} ${v} ${i}`,
              ...u
            }
          )
        }
      )
    ), I = l != null && l !== "";
    return !I && !p.hasMessage ? T : /* @__PURE__ */ k("div", { className: "w-full space-y-1", children: [
      I && /* @__PURE__ */ o(
        "label",
        {
          htmlFor: f,
          className: "block font-mono text-sm text-secondary-800 dark:text-secondary-200",
          children: l
        }
      ),
      T,
      /* @__PURE__ */ o(De, { ...p.message })
    ] });
  }
);
Vn.displayName = "Input";
const Hn = [
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
function Gn(e) {
  return Array.from(e.querySelectorAll(Hn)).filter(
    (t) => !t.hasAttribute("hidden") && t.closest("[hidden]") == null && t.getAttribute("aria-hidden") !== "true"
  );
}
function ur(e, t) {
  U(() => {
    if (!t) return;
    const r = (n) => {
      if (n.key !== "Tab" || n.defaultPrevented) return;
      const a = e.current;
      if (!a) return;
      const s = Gn(a), i = document.activeElement;
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
function je({
  value: e,
  defaultValue: t,
  onChange: r
}) {
  const [n, a] = H(t), s = e !== void 0, i = s ? e : n, l = X(r);
  l.current = r;
  const c = X(i);
  c.current = i;
  const d = ue(
    (u) => {
      var m;
      Object.is(u, c.current) || (s || a(u), (m = l.current) == null || m.call(l, u));
    },
    [s]
  );
  return [i, d];
}
const Dt = /* @__PURE__ */ new Set();
function Un(e, t, r) {
  if (process.env.NODE_ENV === "production") return;
  const n = `${e}:${t}`;
  Dt.has(n) || (Dt.add(n), console.warn(`[@scorp-ds/components] ${e}: ${t} is deprecated. Use ${r}.`));
}
const Wn = 960;
function Kn() {
  let e = Wn;
  if (typeof document < "u") {
    const t = getComputedStyle(document.documentElement).getPropertyValue("--breakpoint-docked"), r = Number.parseFloat(t);
    Number.isFinite(r) && r > 0 && (e = r);
  }
  return `(min-width: ${e}px)`;
}
const qn = { sm: "360px", md: "640px", lg: "740px", full: "100vw" };
function ts({
  open: e,
  defaultOpen: t = !1,
  onOpenChange: r,
  title: n,
  children: a,
  footerContent: s,
  size: i,
  width: l,
  docked: c = !1
}) {
  l !== void 0 && Un("Modal", "width", "size");
  const [d, u] = je({
    value: e,
    defaultValue: t,
    onChange: r
  }), m = ue(() => {
    d && u(!1);
  }, [d, u]), p = i !== void 0 || l === void 0 ? qn[i ?? "lg"] : typeof l == "number" ? `${l}px` : l, h = X(null), b = X(null), [f, g] = H(d);
  U(() => {
    d && g(!0);
  }, [d]);
  const N = f && !d, v = Le(Kn, []), [w, $] = H(
    () => typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia(v).matches
  );
  U(() => {
    if (typeof window.matchMedia != "function") return;
    const x = window.matchMedia(v), C = () => $(x.matches);
    return x.addEventListener("change", C), () => x.removeEventListener("change", C);
  }, [v]);
  const T = c && w, I = d && f;
  if (U(() => {
    var x;
    if (I)
      return b.current = document.activeElement, (x = h.current) == null || x.focus(), () => {
        var C;
        (C = b.current) == null || C.focus(), b.current = null;
      };
  }, [I]), ur(h, I && !T), U(() => {
    const x = (C) => {
      C.key === "Escape" && m();
    };
    return d && document.addEventListener("keydown", x), () => {
      document.removeEventListener("keydown", x);
    };
  }, [d, m]), U(() => (d && !T ? document.body.style.overflow = "hidden" : document.body.style.overflow = "unset", () => {
    document.body.style.overflow = "unset";
  }), [d, T]), !f) return null;
  const M = (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions -- stops backdrop clicks inside the panel; Escape and the close button are the keyboard path
    /* @__PURE__ */ o(
      "div",
      {
        ref: h,
        tabIndex: -1,
        className: "max-w-full max-h-[80vh] plate-round-lg p-px bg-[var(--surface-container-stroke)] flex focus:outline-none",
        style: { width: p },
        role: "dialog",
        "aria-modal": T ? void 0 : "true",
        "aria-label": n,
        onClick: (x) => x.stopPropagation(),
        children: /* @__PURE__ */ k("div", { className: "w-full plate-round-lg bg-[var(--surface-card)] flex flex-col overflow-hidden", children: [
          /* @__PURE__ */ k("div", { className: "flex items-center justify-between px-6 py-5 border-b-[length:var(--border-width-hairline)] border-solid border-[var(--surface-container-stroke)]", children: [
            /* @__PURE__ */ o("h2", { className: "text-base font-mono text-[var(--text-primary)] font-medium flex-1 min-w-0 truncate", children: n }),
            /* @__PURE__ */ o(
              "span",
              {
                className: "relative ml-4 inline-flex shrink-0 before:content-[''] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-touch before:h-touch",
                onClick: (x) => {
                  x.target === x.currentTarget && m();
                },
                children: /* @__PURE__ */ o(
                  We,
                  {
                    variant: "secondary",
                    size: "sm",
                    type: "button",
                    onClick: m,
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
  return T ? /* @__PURE__ */ o(
    "div",
    {
      className: `fixed inset-x-0 mx-auto w-fit max-w-full ${N ? "animate-out fade-out fill-mode-forwards" : "animate-in fade-in"}`,
      style: {
        zIndex: "var(--z-index-modal)",
        bottom: "var(--spacing-12)",
        animationDuration: "var(--duration-normal)",
        filter: "var(--elevation-docked-filter)"
      },
      onAnimationEnd: () => {
        N && g(!1);
      },
      children: M
    }
  ) : /* @__PURE__ */ o(ge, { children: /* @__PURE__ */ o(
    "div",
    {
      className: `fixed inset-0 flex items-center justify-center p-5 bg-[var(--surface-overlay)] ${N ? "animate-out fade-out fill-mode-forwards" : "animate-in fade-in"}`,
      style: { zIndex: "var(--z-index-modal)", animationDuration: "var(--duration-normal)" },
      onClick: m,
      onAnimationEnd: () => {
        N && g(!1);
      },
      children: M
    }
  ) });
}
function rs({
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
      children: /* @__PURE__ */ k(
        "div",
        {
          className: `
        plate-round-lg bg-[var(--surface-card)] h-full w-full
        ${l ? "flex flex-col flex-1 min-h-0" : ""}
      `,
          children: [
            (e || t || r) && /* @__PURE__ */ o("div", { className: "p-4 lg:p-6 border-b-[length:var(--border-width-hairline)] border-solid border-[var(--surface-container-stroke)] overflow-hidden rounded-none", children: r || /* @__PURE__ */ k("div", { children: [
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
function ns({
  tone: e = "neutral",
  size: t = "md",
  caps: r = !1,
  dashed: n = !1,
  children: a,
  iconLeft: s,
  onDismiss: i,
  dismissLabel: l,
  className: c = ""
}) {
  const d = l ?? (typeof a == "string" ? `Remove ${a}` : "Remove badge"), u = {
    sm: "h-5 px-2 py-1 text-xs",
    // h-5 = 20px, px-2 = 8px, text-xs = 12px
    md: "h-6 px-2.5 py-1 text-xs",
    // h-6 = 24px, px-2.5 = 10px, text-xs = 12px
    lg: "h-7 px-3 py-1.5 text-sm"
    // h-7 = 28px, px-3 = 12px, text-sm = 14px
  }, m = {
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
  }, h = {
    sm: "w-3 h-3",
    // 12px
    md: "w-3.5 h-3.5",
    // 14px
    lg: "w-4 h-4"
    // 16px
  };
  return /* @__PURE__ */ k(
    "span",
    {
      className: `
        inline-flex items-center gap-1.5
        font-mono font-medium
        ${n ? `rounded-none border border-dashed bg-transparent ${p[e]}` : `plate-round ${m[e]}`}
        ${u[t]}
        ${r ? "uppercase [letter-spacing:.08em]" : ""}
        ${c}
      `,
      children: [
        s && /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center ${h[t]} flex-shrink-0`, children: pe(s) }),
        /* @__PURE__ */ o("span", { className: "inline-flex items-center", children: a }),
        i && /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            onClick: (b) => {
              b.stopPropagation(), i();
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
            "aria-label": d,
            children: /* @__PURE__ */ o(Q, { name: "X", size: "3" })
          }
        )
      ]
    }
  );
}
function os({
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
  }, c = pe(n, { size: "4" }) || /* @__PURE__ */ o(Q, { name: l[e], size: "4" }), u = {
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
  }[e], m = e === "error" ? "focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-error)]" : "focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]";
  return /* @__PURE__ */ o("div", { role: "alert", className: `plate-round p-px ${u.ring} ${i}`, children: /* @__PURE__ */ k(
    "div",
    {
      className: `
        plate-round
        flex items-start gap-3
        p-4
        ${u.fill}
      `,
      children: [
        c && /* @__PURE__ */ o("div", { className: `flex h-5 flex-shrink-0 items-center ${u.icon}`, children: c }),
        /* @__PURE__ */ k("div", { className: "flex-1 min-w-0", children: [
          t && /* @__PURE__ */ o("h4", { className: `font-mono text-sm font-bold mb-1 ${u.title}`, children: t }),
          r && /* @__PURE__ */ o("div", { className: `font-mono text-sm ${u.description}`, children: r })
        ] }),
        a && /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            onClick: a,
            className: `
            relative flex-shrink-0
            font-mono text-xs font-bold
            ${u.description}
            hover:text-error-800 dark:hover:text-error-300
            transition-colors [transition-duration:var(--duration-fast)]
            before:content-[''] before:absolute before:left-1/2 before:top-1/2
            before:-translate-x-1/2 before:-translate-y-1/2
            before:w-touch before:h-touch
            focus:outline-none ${m}
          `,
            "aria-label": s,
            children: /* @__PURE__ */ o(Q, { name: "X", size: "3" })
          }
        )
      ]
    }
  ) });
}
function Xn({
  src: e,
  alt: t,
  initials: r,
  icon: n,
  size: a = "md",
  status: s,
  className: i = "",
  onError: l
}) {
  const [c, d] = H(!1), m = {
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
    d(!0), l && l();
  }, h = e && !c, b = !h && r, f = !h && !b && n, g = !h && !b && !f, v = h || t === void 0 ? {} : t === "" ? { "aria-hidden": !0 } : { role: "img", "aria-label": t }, w = {
    online: "bg-success-600 dark:bg-success-500",
    offline: "bg-secondary-500 dark:bg-secondary-600",
    away: "bg-warning-600 dark:bg-warning-500"
  };
  return /* @__PURE__ */ k("div", { className: `relative inline-block ${m.container} ${i}`, children: [
    /* @__PURE__ */ k(
      "div",
      {
        ...v,
        className: `
          ${m.container}
          plate-round
          overflow-hidden
          flex items-center justify-center
          bg-secondary-200 dark:bg-secondary-800
          text-secondary-900 dark:text-secondary-50
          font-mono font-bold
          ${m.text}
        `,
        children: [
          h && /* @__PURE__ */ o(
            "img",
            {
              src: e,
              alt: t ?? "Avatar",
              className: "w-full h-full object-cover",
              onError: p
            }
          ),
          b && /* @__PURE__ */ o("span", { className: "select-none", children: r }),
          f && /* @__PURE__ */ o("div", { className: `${m.icon} inline-flex items-center justify-center leading-none text-secondary-700 dark:text-secondary-300`, children: pe(n) }),
          g && /* @__PURE__ */ o("span", { className: `${m.icon} inline-flex items-center justify-center font-mono font-bold text-secondary-900 dark:text-secondary-100`, "aria-hidden": "true", children: "@" })
        ]
      }
    ),
    s && /* @__PURE__ */ o(
      "span",
      {
        role: "img",
        className: `
            absolute block
            ${m.statusOffset}
            ${m.status}
            ${w[s]}
            rounded-none
            border-2 border-[var(--field-background)]
          `,
        "aria-label": `Status: ${s}`
      }
    )
  ] });
}
const Yn = {
  horizontal: { none: "", sm: "my-1", md: "my-4", lg: "my-8" },
  vertical: { none: "", sm: "mx-1", md: "mx-4", lg: "mx-8" }
};
function as({
  orientation: e = "horizontal",
  label: t,
  spacing: r = "md",
  className: n = ""
}) {
  const a = Yn[e][r];
  return e === "vertical" ? /* @__PURE__ */ o(
    "div",
    {
      className: `h-full border-l border-solid border-term-dim ${a} ${n}`,
      role: "separator",
      "aria-orientation": "vertical"
    }
  ) : t != null && t !== !1 && t !== "" ? /* @__PURE__ */ k(
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
const Zn = { top: "bottom", bottom: "top", left: "right", right: "left" }, Qn = 8, Me = 8;
function Jn(e, t, r, n, a) {
  const s = {
    top: t.top,
    bottom: a - t.bottom,
    left: t.left,
    right: n - t.right
  }, i = (c) => (c === "top" || c === "bottom" ? r.height : r.width) + Qn + Me;
  if (s[e] >= i(e)) return e;
  const l = Zn[e];
  return s[l] >= i(l) ? l : e;
}
function mr(e, t, r, n) {
  return e === "start" ? t : e === "end" ? t + r - n : t + r / 2 - n / 2;
}
function eo(e, t, r, n) {
  const a = mr(n, e.left, e.width, t), s = a + t;
  return a < Me ? Me - a : s > r - Me ? Math.max(Me - a, r - Me - s) : 0;
}
function to({
  content: e,
  children: t,
  side: r = "top",
  align: n = "center",
  delay: a = 200,
  maxWidth: s = "200px",
  className: i = ""
}) {
  const [l, c] = H(!1), [d, u] = H(!1), m = X(null), p = X(null), h = X(null), b = X(null), f = ce(), [g, N] = H(r), [v, w] = H(0), [$, T] = H(0), I = () => {
    m.current && clearTimeout(m.current), p.current && clearTimeout(p.current);
  }, M = () => {
    I(), m.current = setTimeout(() => {
      c(!0), p.current = setTimeout(() => u(!0), 50);
    }, a);
  }, x = ue(() => {
    I(), c(!1), u(!1);
  }, []), C = (P) => {
    var y;
    (y = b.current) != null && y.contains(P.relatedTarget) || x();
  };
  U(() => {
    if (!l) return;
    const P = (y) => {
      y.key === "Escape" && x();
    };
    return document.addEventListener("keydown", P), () => document.removeEventListener("keydown", P);
  }, [l, x]), U(() => I, []), _e(() => {
    var D, j;
    if (!l) return;
    const P = (D = b.current) == null ? void 0 : D.getBoundingClientRect(), y = (j = h.current) == null ? void 0 : j.getBoundingClientRect();
    if (!P || !y) return;
    const G = window.innerWidth || document.documentElement.clientWidth, R = window.innerHeight || document.documentElement.clientHeight, L = Jn(r, P, y, G, R), q = L === "top" || L === "bottom", Y = q ? eo(P, y.width, G, n) : 0, V = q ? y.width : y.height, ae = q ? P.left : P.top, ie = q ? P.width : P.height, J = mr(n, ae, ie, V) + Y, xe = n === "center" ? -Y : ae + ie / 2 - (J + V / 2), me = Math.max(0, V / 2 - 12);
    N(L), w(Y), T(Math.min(me, Math.max(-me, xe)));
  }, [l, r, n, e, s]);
  const F = Ue(t) ? gt(t, {
    "aria-describedby": [
      t.props["aria-describedby"],
      l ? f : void 0
    ].filter(Boolean).join(" ") || void 0
  }) : t, W = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2",
    right: "left-full ml-2"
  }, te = {
    horizontal: { start: "left-0", center: "left-1/2 -translate-x-1/2", end: "right-0" },
    vertical: { start: "top-0", center: "top-1/2 -translate-y-1/2", end: "bottom-0" }
  }, ne = g === "top" || g === "bottom", B = `${W[g]} ${te[ne ? "horizontal" : "vertical"][n]}`, Z = "var(--plate-caret-outer)", ee = "var(--plate-caret-inner)", E = {
    top: "top-full left-1/2 -translate-x-1/2 -translate-y-px",
    bottom: "bottom-full left-1/2 -translate-x-1/2 translate-y-px rotate-180",
    left: "left-full top-1/2 -translate-y-1/2 translate-x-[calc(var(--plate-caret-offset)*-1)] -rotate-90",
    right: "right-full top-1/2 -translate-y-1/2 translate-x-[var(--plate-caret-offset)] rotate-90"
  }, O = {
    top: "top-full inset-x-0 h-2",
    bottom: "bottom-full inset-x-0 h-2",
    left: "left-full inset-y-0 w-2",
    right: "right-full inset-y-0 w-2"
  };
  return /* @__PURE__ */ k(
    "div",
    {
      ref: b,
      className: `relative inline-block w-fit ${i}`,
      onMouseEnter: M,
      onMouseLeave: x,
      onFocus: M,
      onBlur: C,
      children: [
        F,
        l && /* @__PURE__ */ k(
          "div",
          {
            ref: h,
            id: f,
            role: "tooltip",
            className: `
            absolute
            ${B}
            w-max
            z-[var(--z-index-tooltip)]
            ${d ? "opacity-100" : "opacity-0"}
            transition-opacity [transition-duration:var(--duration-fast)]
          `,
            "data-placement": g,
            "data-align": n,
            style: { maxWidth: s, marginLeft: v || void 0 },
            children: [
              /* @__PURE__ */ o("span", { className: `absolute ${O[g]}`, "aria-hidden": "true" }),
              /* @__PURE__ */ o("div", { className: "plate-round p-px bg-[var(--surface-container-stroke)]", children: /* @__PURE__ */ o("div", { className: "plate-round bg-[var(--surface-card)] min-w-16 px-3 py-2 text-center font-mono text-xs text-[var(--text-primary)] whitespace-normal", children: e }) }),
              /* @__PURE__ */ o(
                "div",
                {
                  className: `absolute ${E[g]}`,
                  style: ne ? { marginLeft: $ || void 0 } : { marginTop: $ || void 0 },
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ k("div", { className: "relative h-[var(--plate-caret-height)] w-[var(--plate-caret-width)]", children: [
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
function ut(e) {
  return e == null || typeof e == "boolean" ? "" : Array.isArray(e) ? e.map(ut).join("") : typeof e == "string" || typeof e == "number" ? String(e) : Ue(e) ? ut(e.props.children) : String(e);
}
function mt(e, t, r, n = []) {
  return Wt.forEach(e, (a) => {
    if (!Ue(a)) return;
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
const ro = re(function({
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
  label: p,
  "aria-label": h,
  "aria-describedby": b,
  id: f,
  ...g
}, N) {
  var me;
  const v = Pe({ error: r, helperText: n, errorMessage: a, describedBy: b }), w = v.invalid, $ = ce(), T = f ?? `${$}-trigger`, I = `${$}-listbox`, M = `${$}-label`, x = (D) => `${$}-option-${D}`, C = mt(l), F = [];
  C.forEach((D, j) => {
    const se = F[F.length - 1];
    se && se.label === D.group ? se.entries.push({ option: D, index: j }) : F.push({ label: D.group, entries: [{ option: D, index: j }] });
  });
  const [W, te] = H(!1), [ne, B] = H(-1), [Z, ee] = H(
    c !== void 0 ? String(c) : d !== void 0 ? String(d) : ((me = C[0]) == null ? void 0 : me.value) || ""
  ), E = X(null), O = X(null), P = X(null);
  U(() => {
    c !== void 0 && (ee(String(c)), P.current && (P.current.value = String(c)));
  }, [c]), Pr(N, () => P.current);
  const y = C.find((D) => D.value === Z), G = (y == null ? void 0 : y.label) || "", R = () => {
    s || (te(!W), W || B(-1));
  }, L = () => {
    te(!1), B(-1);
  }, q = (D) => {
    c === void 0 && ee(D), P.current && (P.current.value = D), u && u({
      target: { value: D, name: m },
      currentTarget: { value: D, name: m }
    }), L();
  };
  U(() => {
    function D(j) {
      E.current && !E.current.contains(j.target) && L();
    }
    if (W)
      return document.addEventListener("mousedown", D), () => {
        document.removeEventListener("mousedown", D);
      };
  }, [W]), U(() => {
    function D(j) {
      var ve, be;
      if (!((ve = E.current) != null && ve.contains(j.target)) && !W)
        return;
      if (!W) {
        if ((j.key === "Enter" || j.key === " " || j.key === "ArrowDown" || j.key === "ArrowUp") && (be = E.current) != null && be.contains(j.target)) {
          j.preventDefault(), R();
          const de = C.findIndex((fe) => fe.value === Z && !fe.disabled);
          B(de >= 0 ? de : ot(C, -1, 1));
        }
        return;
      }
      const se = ne;
      switch (j.key) {
        case "Escape":
          j.preventDefault(), L();
          break;
        case "Tab":
          L();
          break;
        case "ArrowDown":
          j.preventDefault(), B((de) => ot(C, de, 1));
          break;
        case "ArrowUp":
          j.preventDefault(), B((de) => ot(C, de, -1));
          break;
        case "Enter":
        case " ":
          j.preventDefault(), se >= 0 && se < C.length && !C[se].disabled && q(C[se].value);
          break;
      }
    }
    return document.addEventListener("keydown", D), () => {
      document.removeEventListener("keydown", D);
    };
  }, [W, ne, C, Z]), U(() => {
    if (ne >= 0 && O.current) {
      const j = O.current.querySelectorAll('[role="option"]')[ne];
      j && j.scrollIntoView({ block: "nearest" });
    }
  }, [ne]);
  const V = {
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
  }[t], ae = w ? "bg-[var(--field-background-error)] text-[var(--text-primary)]" : "bg-[var(--field-background)] text-[var(--text-primary)]", ie = w ? "bg-[var(--field-border-error)] focus-within:!bg-[var(--field-border-focus)]" : "bg-[var(--field-border)] hover:bg-[var(--field-border-hover)] focus-within:!bg-[var(--field-border-focus)]", J = p != null && p !== "", xe = /* @__PURE__ */ k("div", { ref: E, className: "relative inline-block w-full", children: [
    /* @__PURE__ */ o(
      "select",
      {
        ref: P,
        name: m,
        value: Z,
        onChange: u,
        className: "sr-only",
        "aria-hidden": "true",
        tabIndex: -1,
        ...g,
        children: C.map((D, j) => /* @__PURE__ */ o("option", { value: D.value, disabled: D.disabled, children: D.label }, j))
      }
    ),
    /* @__PURE__ */ o("div", { className: `plate-round p-px transition-colors [transition-duration:var(--duration-fast)] ${ie} ${s ? "opacity-50" : ""}`, children: /* @__PURE__ */ k(
      "button",
      {
        type: "button",
        role: "combobox",
        id: T,
        onClick: R,
        disabled: s,
        className: `
          w-full
          flex items-center justify-between
          font-mono text-sm
          transition-colors [transition-duration:var(--duration-fast)]
          ${V.trigger}
          ${ae}
          ${s ? "cursor-not-allowed" : "cursor-pointer"}
          focus:outline-none
        `,
        "aria-haspopup": "listbox",
        "aria-expanded": W,
        "aria-controls": W ? I : void 0,
        "aria-activedescendant": W && ne >= 0 ? x(ne) : void 0,
        "aria-invalid": w || void 0,
        "aria-describedby": v.describedBy,
        "aria-label": J ? void 0 : h ?? "Select an option",
        children: [
          /* @__PURE__ */ o("span", { className: "truncate text-left flex-1", children: G || "Select..." }),
          /* @__PURE__ */ o(
            "span",
            {
              className: `
            ${V.icon}
            inline-flex items-center justify-center font-mono leading-none
            text-[var(--text-secondary)]
            transition-transform [transition-duration:var(--duration-normal)]
            flex-shrink-0 ml-2
            ${W ? "rotate-180" : ""}
            ${s ? "opacity-50" : ""}
          `,
              "aria-hidden": "true",
              children: /* @__PURE__ */ o(Q, { name: "ChevronDown" })
            }
          )
        ]
      }
    ) }),
    W && /* @__PURE__ */ o(
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
            ref: O,
            id: I,
            role: "listbox",
            "aria-labelledby": J ? M : void 0,
            "aria-label": J ? void 0 : h ?? "Select an option",
            className: `plate-round bg-[var(--surface-card)] ${V.menu} max-h-80 overflow-y-auto`,
            children: F.map((D, j) => {
              const se = `${$}-group-${j}`, ve = D.entries.map(({ option: be, index: de }) => {
                const fe = be.disabled, ze = be.value === Z, tt = ne === de && !fe;
                return /* @__PURE__ */ k(
                  "button",
                  {
                    id: x(de),
                    type: "button",
                    role: "option",
                    "aria-selected": ze,
                    disabled: fe,
                    onClick: () => !fe && q(be.value),
                    className: `
                  w-full flex items-center gap-2
                  px-4 py-3
                  font-mono text-sm text-left
                  transition-colors [transition-duration:var(--duration-fast)]
                  ${fe ? "opacity-50 cursor-not-allowed" : "text-[var(--text-primary)] hover:bg-[var(--surface-muted)] cursor-pointer"}
                  ${tt ? "bg-[var(--surface-muted)] text-[var(--accent)]" : ""}
                  ${V.menuItem}
                `,
                    children: [
                      /* @__PURE__ */ o("span", { className: "truncate flex-1 min-w-0", children: be.label }),
                      ze && /* @__PURE__ */ o("span", { className: `${V.icon} inline-flex items-center justify-center font-mono font-bold text-[var(--border-focus)] flex-shrink-0`, "aria-hidden": "true", children: /* @__PURE__ */ o(Q, { name: "Check" }) })
                    ]
                  },
                  de
                );
              });
              return D.label == null ? /* @__PURE__ */ o(xt, { children: ve }, j) : /* @__PURE__ */ k("div", { role: "group", "aria-labelledby": se, children: [
                /* @__PURE__ */ o(
                  "div",
                  {
                    id: se,
                    className: "px-4 py-2 font-mono text-xs uppercase tracking-wide text-[var(--text-secondary)]",
                    children: D.label
                  }
                ),
                ve
              ] }, j);
            })
          }
        )
      }
    )
  ] });
  return !J && !v.hasMessage ? /* @__PURE__ */ o("div", { className: `w-full ${i}`.trim(), children: xe }) : /* @__PURE__ */ k("div", { className: `w-full space-y-1 ${i}`.trim(), children: [
    J && /* @__PURE__ */ o(
      "label",
      {
        id: M,
        htmlFor: T,
        className: "block font-mono text-sm text-secondary-800 dark:text-secondary-200",
        children: p
      }
    ),
    xe,
    /* @__PURE__ */ o(De, { ...v.message })
  ] });
});
ro.displayName = "Select";
const no = re(
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
    ...p
  }, h) => {
    const b = X(null), f = ue(
      (C) => {
        b.current = C, typeof h == "function" ? h(C) : h && (h.current = C);
      },
      [h]
    );
    _e(() => {
      b.current && (b.current.indeterminate = d);
    });
    const g = Pe({ error: r, helperText: n, errorMessage: a, describedBy: m }), N = g.invalid, w = {
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
    }[e], $ = N ? "bg-[var(--field-border-error)]" : `bg-[var(--field-border)] hover:bg-[var(--field-border-hover)]
         peer-checked:bg-[var(--button-primary-background)]
         peer-checked:hover:bg-[var(--button-primary-background-hover)]
         peer-indeterminate:bg-[var(--button-primary-background)]
         peer-indeterminate:hover:bg-[var(--button-primary-background-hover)]`, T = N ? "peer-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-error)]" : "peer-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]", I = (C) => {
      l && l(C), c && c(C.target.checked), C.target.indeterminate = d;
    }, M = t != null && t !== !1 && t !== "", x = /* @__PURE__ */ k("span", { className: "relative inline-flex shrink-0 before:content-[''] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-touch before:h-touch", children: [
      /* @__PURE__ */ o(
        "input",
        {
          ref: f,
          type: "checkbox",
          ...i !== void 0 ? { checked: i } : {},
          disabled: s,
          onChange: I,
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
            ${w.checkbox}
            transition-colors [transition-duration:var(--duration-fast)]
            ${s ? "cursor-not-allowed" : "cursor-pointer"}
            ${$}
            ${N ? "peer-checked:[&>span]:bg-[var(--field-border-error)] peer-indeterminate:[&>span]:bg-[var(--field-border-error)]" : "peer-checked:[&>span]:bg-[var(--button-primary-background)] peer-indeterminate:[&>span]:bg-[var(--button-primary-background)]"}
            peer-checked:[&_[data-mark=check]]:opacity-100
            peer-indeterminate:[&_[data-mark=check]]:opacity-0
            peer-indeterminate:[&_[data-mark=bar]]:opacity-100
            ${T}
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
                  className: `absolute inset-0 inline-flex items-center justify-center opacity-0 transition-opacity [transition-duration:var(--duration-fast)] ${N ? "text-[var(--button-destructive-text)]" : "text-[var(--button-primary-text)]"}`,
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ o(Q, { name: C === "check" ? "Check" : "Minus", size: w.glyph })
                },
                C
              ))
            }
          )
        }
      )
    ] });
    return /* @__PURE__ */ k("div", { className: `flex flex-col gap-1 ${u}`, children: [
      /* @__PURE__ */ k(
        "label",
        {
          className: `inline-flex items-center gap-2 font-mono ${s ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`,
          children: [
            x,
            M && /* @__PURE__ */ o("span", { className: `${w.label} text-[var(--text-primary)]`, children: t })
          ]
        }
      ),
      /* @__PURE__ */ o(De, { ...g.message, className: w.messageIndent })
    ] });
  }
);
no.displayName = "Checkbox";
function oo(e, t, r) {
  return !Number.isFinite(e) || r <= t ? 0 : Math.min(100, Math.max(0, (e - t) / (r - t) * 100));
}
const ao = re(function({ label: t, id: r, className: n = "", disabled: a, min: s = 0, max: i = 100, value: l, defaultValue: c, onChange: d, ...u }, m) {
  const p = ce(), h = r ?? p, b = Number(s), f = Number(i), g = l !== void 0, [N, v] = H(
    () => c !== void 0 ? Number(c) : b
  ), w = g ? Number(l) : N, $ = oo(w, b, f), T = (I) => {
    g || v(Number(I.target.value)), d == null || d(I);
  };
  return /* @__PURE__ */ k("span", { className: `flex w-full flex-col gap-1.5 font-mono ${n}`, children: [
    t && /* @__PURE__ */ o("label", { htmlFor: h, className: "text-sm text-secondary-800 dark:text-secondary-300", children: t }),
    /* @__PURE__ */ k("span", { className: `relative flex h-touch w-full items-center ${a ? "opacity-50" : ""}`, children: [
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
          ref: m,
          id: h,
          type: "range",
          min: s,
          max: i,
          disabled: a,
          ...g ? { value: l } : { defaultValue: c },
          onChange: T,
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
ao.displayName = "Slider";
const so = re(
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
  }, p) => {
    const h = Pe({ error: r, helperText: n, errorMessage: a, describedBy: u }), b = h.invalid, g = {
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
    }[e], N = b ? "bg-[var(--field-border-error)]" : `bg-[var(--field-border)] hover:bg-[var(--field-border-hover)]
         peer-checked:bg-[var(--button-primary-background)]
         peer-checked:hover:bg-[var(--button-primary-background-hover)]`, v = b ? "peer-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-error)]" : "peer-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]", w = (I) => {
      const M = I.currentTarget.checked;
      l && l(I), c && c(M);
    }, $ = t != null && t !== !1 && t !== "", T = /* @__PURE__ */ k("span", { className: "relative inline-flex shrink-0 before:content-[''] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-touch before:h-touch", children: [
      /* @__PURE__ */ o(
        "input",
        {
          ref: p,
          type: "radio",
          ...i !== void 0 ? { checked: i } : {},
          disabled: s,
          onChange: w,
          className: "peer sr-only",
          "aria-describedby": h.describedBy,
          ...m
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
            ${b ? "peer-checked:[&>span]:bg-[var(--field-border-error)]" : "peer-checked:[&>span]:bg-[var(--button-primary-background)]"}
            peer-checked:[&>span>span]:opacity-100
            ${v}
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
                ${b ? "bg-[var(--button-destructive-text)]" : "bg-[var(--button-primary-text)]"}
              `
                }
              )
            }
          )
        }
      )
    ] });
    return /* @__PURE__ */ k("div", { className: `flex flex-col gap-1 ${d}`, children: [
      /* @__PURE__ */ k(
        "label",
        {
          className: `inline-flex items-center gap-2 font-mono ${s ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`,
          children: [
            T,
            $ && /* @__PURE__ */ o("span", { className: `${g.label} text-[var(--text-primary)]`, children: t })
          ]
        }
      ),
      /* @__PURE__ */ o(De, { ...h.message, className: g.messageIndent })
    ] });
  }
);
so.displayName = "Radio";
const io = re(
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
    const m = Pe({ error: t, helperText: r, errorMessage: n, describedBy: c }), p = m.invalid, h = ce(), b = l ?? (i != null && i !== "" ? h : void 0), f = `
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
    }, N = p ? "bg-[var(--field-background-error)] text-[var(--text-primary)]" : "bg-[var(--field-background)] text-[var(--text-primary)]", w = /* @__PURE__ */ o(
      "div",
      {
        className: `w-full plate-round p-px transition-colors [transition-duration:var(--duration-fast)] ${p ? "bg-[var(--field-border-error)] focus-within:!bg-[var(--field-border-focus)]" : "bg-[var(--field-border)] hover:bg-[var(--field-border-hover)] focus-within:!bg-[var(--field-border-focus)]"} ${a ? "opacity-50" : ""}`,
        children: /* @__PURE__ */ o(
          "textarea",
          {
            ref: u,
            id: b,
            disabled: a,
            "aria-invalid": p || void 0,
            "aria-describedby": m.describedBy,
            className: `${f} ${g[e]} ${N} ${s}`,
            ...d
          }
        )
      }
    ), $ = i != null && i !== "";
    return !$ && !m.hasMessage ? w : /* @__PURE__ */ k("div", { className: "w-full space-y-1", children: [
      $ && /* @__PURE__ */ o(
        "label",
        {
          htmlFor: b,
          className: "block font-mono text-sm text-secondary-800 dark:text-secondary-200",
          children: i
        }
      ),
      w,
      /* @__PURE__ */ o(De, { ...m.message })
    ] });
  }
);
io.displayName = "Textarea";
const lo = {
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
}, fr = re(
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
  }, m) => {
    const p = lo[n], [h, b] = je({
      value: e,
      defaultValue: t,
      onChange: r
    }), f = () => {
      l || b(!h);
    }, g = (N) => {
      (N.key === " " || N.key === "Enter") && (N.preventDefault(), f());
    };
    return /* @__PURE__ */ k("div", { className: `flex items-center gap-3 ${d}`, children: [
      /* @__PURE__ */ o(
        "button",
        {
          ref: m,
          type: "button",
          role: "switch",
          "aria-checked": h,
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
          ...u,
          children: /* @__PURE__ */ o(
            "span",
            {
              "aria-hidden": "true",
              "data-state": h ? "on" : "off",
              className: `
              relative inline-flex items-center
              ${p.track}
              plate-round
              transition-colors [transition-duration:var(--duration-normal)] motion-reduce:transition-none
              group-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]
              ${h ? "bg-[var(--accent)]" : "bg-[var(--control-track)]"}
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
                    transform: `translateX(${h ? p.knobOn : p.knobOff})`
                  },
                  children: c && /* @__PURE__ */ o("span", { className: p.iconSize, children: pe(c) })
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
fr.displayName = "Switch";
function jt(e, t, r) {
  var s;
  const n = e.length;
  if (n === 0) return -1;
  let a = t;
  for (let i = 0; i < n; i++)
    if (a += r, a >= n && (a = 0), a < 0 && (a = n - 1), !((s = e[a]) != null && s.disabled)) return a;
  return -1;
}
function ss({
  trigger: e,
  items: t,
  align: r = "start",
  label: n = "Actions",
  size: a = "md"
}) {
  const [s, i] = H(!1), [l, c] = H(-1), d = X(null), u = X(null), m = () => {
    i(!s), s || c(-1);
  }, p = () => {
    i(!1), c(-1);
  }, h = (w) => {
    w.disabled || (w.onClick(), p());
  };
  U(() => {
    function w($) {
      d.current && !d.current.contains($.target) && p();
    }
    if (s)
      return document.addEventListener("mousedown", w), () => {
        document.removeEventListener("mousedown", w);
      };
  }, [s]), U(() => {
    function w($) {
      if (!s) return;
      const T = l;
      switch ($.key) {
        case "Escape":
          $.preventDefault(), p();
          break;
        case "Tab":
          p();
          break;
        case "ArrowDown":
          $.preventDefault(), c((I) => jt(t, I, 1));
          break;
        case "ArrowUp":
          $.preventDefault(), c((I) => jt(t, I, -1));
          break;
        case "Enter":
        case " ":
          $.preventDefault(), T >= 0 && T < t.length && h(t[T]);
          break;
      }
    }
    if (s)
      return document.addEventListener("keydown", w), () => {
        document.removeEventListener("keydown", w);
      };
  }, [s, l, t]), U(() => {
    if (l >= 0 && u.current) {
      const $ = u.current.querySelectorAll('[role="menuitem"]')[l];
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
  }[a], g = /* @__PURE__ */ k(
    "button",
    {
      type: "button",
      onClick: m,
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
  ), N = {
    "aria-haspopup": "true",
    "aria-expanded": s
  };
  let v;
  if (!e)
    v = g;
  else if (Ue(e)) {
    const w = e;
    v = gt(w, {
      ...N,
      onClick: ($) => {
        var T, I;
        (I = (T = w.props).onClick) == null || I.call(T, $), m();
      }
    });
  } else
    v = /* @__PURE__ */ o(
      "div",
      {
        ...N,
        onClick: m,
        role: "button",
        tabIndex: 0,
        onKeyDown: (w) => {
          (w.key === "Enter" || w.key === " ") && (w.preventDefault(), m());
        },
        children: e
      }
    );
  return /* @__PURE__ */ k("div", { ref: d, className: "relative inline-block", children: [
    v,
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
            ref: u,
            role: "menu",
            "aria-orientation": "vertical",
            className: `plate-round bg-[var(--surface-card)] ${f.menu}`,
            children: t.map((w, $) => {
              const T = w.variant === "destructive", I = w.disabled;
              return /* @__PURE__ */ k(
                "button",
                {
                  type: "button",
                  role: "menuitem",
                  disabled: I,
                  onClick: () => h(w),
                  className: `
                  w-full flex items-center gap-2
                  px-4 py-3
                  font-mono text-sm text-left
                  transition-colors [transition-duration:var(--duration-fast)]
                  ${I ? "opacity-50 cursor-not-allowed" : T ? "text-[var(--text-error)] hover:bg-[var(--field-background-error)]" : "text-[var(--text-primary)] hover:bg-[var(--surface-muted)]"}
                  ${l === $ && !I ? T ? "bg-[var(--field-background-error)]" : "bg-[var(--surface-muted)] text-[var(--accent)]" : ""}
                  ${f.menuItem}
                `,
                  children: [
                    /* @__PURE__ */ k("div", { className: "flex items-center gap-2 flex-1 min-w-0", children: [
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
const Ke = "text-secondary-700 dark:text-secondary-600", Ee = "text-secondary-800 dark:text-secondary-500", we = "text-[var(--text-primary)]", Ge = "text-[var(--accent)]", Re = "border-[var(--surface-container-stroke)]", co = {
  background: "repeating-linear-gradient(45deg, var(--surface-subtle), var(--surface-subtle) 8px, var(--surface-muted) 8px, var(--surface-muted) 16px)"
}, He = (e) => e === "wide" ? " [--csp-bw:max(100%,min(calc(100%+240px),calc(100cqw-48px)))] w-[var(--csp-bw)] ml-[calc((100%-var(--csp-bw))/2)]" : e === "full" ? " [--csp-bw:max(100%,calc(100cqw-48px))] w-[var(--csp-bw)] ml-[calc((100%-var(--csp-bw))/2)]" : "", uo = 0.62, mo = (e) => `min(var(--font-size-xs), calc((100cqw - var(--spacing-10)) / ${(Math.max(...e.split(`
`).map((r) => r.length)) * uo).toFixed(2)}))`, wt = (e) => String(e).padStart(2, "0"), fo = (e) => e.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""), pr = (e) => e.type === "imagePair" ? 2 : e.type === "image" || e.type === "ascii" || e.type === "slot" ? 1 : 0;
function po(e, t = 1) {
  const r = /* @__PURE__ */ new Map();
  let n = t;
  for (const a of e) {
    const s = pr(a);
    s && (r.set(a, n), n += s);
  }
  return r;
}
function kt({ fig: e, caption: t }) {
  return !e && !t ? null : /* @__PURE__ */ k("figcaption", { className: "mt-3 flex gap-3 text-xs leading-relaxed", children: [
    e !== void 0 && /* @__PURE__ */ k("span", { className: `flex-none ${Ge}`, children: [
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
  return /* @__PURE__ */ k("figure", { className: `my-10 m-0${He(r)}`, children: [
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
  ) : /* @__PURE__ */ o("div", { className: "plate-round w-full", style: { aspectRatio: n, ...co } });
}
function br({ items: e }) {
  const t = e.length >= 4 ? "sm:grid-cols-4" : e.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";
  return /* @__PURE__ */ o("dl", { className: `m-0 grid grid-cols-2 gap-x-8 gap-y-6 ${t}`, children: e.map((r) => (
    // dt stays first for screen readers; the figure is moved above it
    // visually, so every figure hangs from the top of its cell however
    // its label wraps. Figure and label centre in their cell.
    /* @__PURE__ */ k("div", { className: "flex flex-col items-center text-center", children: [
      /* @__PURE__ */ o("dt", { className: `mt-2 text-xs ${Ke}`, children: r.label }),
      /* @__PURE__ */ o("dd", { className: `order-first m-0 text-2xl leading-none ${Ge}`, children: r.value })
    ] }, r.label)
  )) });
}
function bo({
  b: e,
  fig: t,
  slots: r
}) {
  switch (e.type) {
    case "prose":
      return /* @__PURE__ */ o("p", { className: `my-6 text-base leading-relaxed ${Ee}`, children: e.text });
    case "image":
      return /* @__PURE__ */ o(at, { fig: t, caption: e.caption, width: e.width, children: /* @__PURE__ */ o(Ze, { src: e.src, alt: e.alt, aspect: e.aspect }) });
    case "imagePair":
      return /* @__PURE__ */ o("div", { className: `my-10 grid grid-cols-1 gap-4 sm:grid-cols-2${He(e.width)}`, children: [0, 1].map((n) => {
        var a, s, i;
        return /* @__PURE__ */ k("figure", { className: "m-0", children: [
          /* @__PURE__ */ o("div", { className: "plate-round p-px bg-[var(--border-hairline)]", children: /* @__PURE__ */ o(Ze, { src: (a = e.srcs) == null ? void 0 : a[n], alt: (s = e.alts) == null ? void 0 : s[n], aspect: "4 / 3" }) }),
          /* @__PURE__ */ o(kt, { fig: t === void 0 ? void 0 : t + n, caption: (i = e.captions) == null ? void 0 : i[n] })
        ] }, n);
      }) });
    case "ascii": {
      const n = mo(e.text);
      return /* @__PURE__ */ o(at, { fig: t, caption: e.caption, width: e.width, children: /* @__PURE__ */ o("div", { className: "[container-type:inline-size]", children: /* @__PURE__ */ o(
        "pre",
        {
          role: "img",
          "aria-label": e.label ?? e.caption ?? "diagram",
          className: `plate-round m-0 overflow-x-auto p-5 leading-snug ${Ee}`,
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
        return /* @__PURE__ */ k("li", { className: `relative pl-8 ${i ? "" : "pb-6"}`, children: [
          !(s && i) && /* @__PURE__ */ o("span", { "aria-hidden": "true", className: `absolute left-1 border-l-hairline ${Re} ${`${s ? "top-3" : "top-0"} ${i ? "h-3" : "bottom-0"}`}` }),
          /* @__PURE__ */ o("span", { "aria-hidden": "true", className: `absolute left-1 top-3 w-4 border-t-hairline ${Re}` }),
          /* @__PURE__ */ o("div", { className: `text-sm leading-6 ${we}`, children: n.title }),
          /* @__PURE__ */ o("p", { className: `m-0 mt-1 text-sm leading-6 ${Ee}`, children: n.text })
        ] }, n.title);
      }) });
    case "insights":
      return /* @__PURE__ */ o("ol", { className: `my-10 list-none border-b-hairline p-0 ${Re}`, children: e.items.map((n, a) => /* @__PURE__ */ k(
        "li",
        {
          className: `grid grid-cols-[theme(spacing.16)_1fr] border-t-hairline py-6 ${Re}`,
          children: [
            /* @__PURE__ */ o("span", { className: `text-2xl leading-none ${Ge}`, children: wt(a + 1) }),
            /* @__PURE__ */ k("div", { children: [
              /* @__PURE__ */ o("div", { className: `text-lg leading-snug ${we}`, children: n.title }),
              /* @__PURE__ */ o("p", { className: `m-0 mt-2 text-sm leading-relaxed ${Ee}`, children: n.text })
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
          children: e.items.map((a) => /* @__PURE__ */ k("div", { className: "plate-round bg-[var(--surface-muted)] p-5", children: [
            /* @__PURE__ */ o("div", { className: `text-base leading-snug ${we}`, children: a.title }),
            /* @__PURE__ */ o("p", { className: `m-0 mt-2 text-sm leading-relaxed ${Ee}`, children: a.text })
          ] }, a.title))
        }
      );
    }
    case "quote":
      return /* @__PURE__ */ k("figure", { className: "my-10 m-0 border-l-hairline border-[var(--accent)] pl-6", children: [
        /* @__PURE__ */ o("blockquote", { className: `m-0 p-0 text-lg leading-relaxed ${we}`, children: e.text }),
        e.name && /* @__PURE__ */ k("figcaption", { className: "mt-4 flex items-center gap-3 text-sm", children: [
          /* @__PURE__ */ o(Xn, { size: "md", src: e.image, alt: "" }),
          /* @__PURE__ */ k("span", { children: [
            /* @__PURE__ */ o("span", { className: `block ${we}`, children: e.name }),
            e.role && /* @__PURE__ */ o("span", { className: `block text-xs ${Ke}`, children: e.role })
          ] })
        ] })
      ] });
    case "statement":
      return /* @__PURE__ */ k("div", { className: `my-12 border-y-hairline py-10 ${Re}${He("wide")}`, children: [
        e.kicker && /* @__PURE__ */ o("div", { className: `mb-4 text-xs uppercase tracking-wider ${Ge}`, children: e.kicker }),
        /* @__PURE__ */ o("p", { className: `m-0 text-2xl leading-snug ${we}`, children: e.text })
      ] });
    case "outcomes":
      return /* @__PURE__ */ o("div", { className: "my-10", children: /* @__PURE__ */ o(br, { items: e.items }) });
  }
}
function ho({
  blocks: e,
  slots: t,
  figureStart: r = 1,
  className: n = ""
}) {
  const a = po(e, r);
  return /* @__PURE__ */ o("div", { className: `font-mono ${n}`, children: e.map((s, i) => /* @__PURE__ */ o(bo, { b: s, fig: a.get(s), slots: t }, i)) });
}
function go({
  study: e,
  className: t = ""
}) {
  const { title: r, summary: n, outcomes: a, meta: s, cover: i } = e;
  return /* @__PURE__ */ k("header", { className: `font-mono ${t}`, children: [
    /* @__PURE__ */ o("h1", { className: `m-0 text-2xl leading-tight sm:text-page-title ${we}`, children: r }),
    /* @__PURE__ */ o("p", { className: `m-0 mt-5 text-base leading-relaxed sm:text-lg ${Ee}`, children: n }),
    a && a.length > 0 && /* @__PURE__ */ o("div", { className: "mt-10", children: /* @__PURE__ */ o(br, { items: a }) }),
    s && s.length > 0 && // One fact a line: label and value joined by a dotted leader, like a
    // contents page. A long value wraps and stays flush right.
    /* @__PURE__ */ o("dl", { className: "m-0 mt-10 flex flex-col gap-2", children: s.map((l) => /* @__PURE__ */ k("div", { className: "flex items-baseline gap-3 text-sm", children: [
      /* @__PURE__ */ o("dt", { className: `flex-none text-xs uppercase tracking-wider ${Ke}`, children: l.label }),
      /* @__PURE__ */ o(
        "span",
        {
          "aria-hidden": "true",
          className: `min-w-4 flex-1 border-b-hairline border-dotted ${Re}`
        }
      ),
      /* @__PURE__ */ o("dd", { className: `m-0 text-right leading-relaxed ${we}`, children: l.value })
    ] }, l.label)) }),
    i && /* @__PURE__ */ k("figure", { className: `mt-12 m-0${He(i.width ?? "wide")}`, children: [
      /* @__PURE__ */ o("div", { className: "plate-round p-px bg-[var(--border-hairline)]", children: /* @__PURE__ */ o(Ze, { src: i.src, alt: i.alt, aspect: i.aspect }) }),
      /* @__PURE__ */ o(kt, { caption: i.caption })
    ] })
  ] });
}
function xo({ n: e, section: t }) {
  return /* @__PURE__ */ k("header", { children: [
    /* @__PURE__ */ k("div", { className: "flex gap-3 text-xs uppercase tracking-wider", children: [
      /* @__PURE__ */ o("span", { className: Ge, children: wt(e) }),
      /* @__PURE__ */ o("span", { className: Ke, children: t.kicker })
    ] }),
    /* @__PURE__ */ o("h2", { className: `m-0 mt-4 text-xl leading-snug sm:text-2xl ${we}`, children: t.title }),
    t.intro && /* @__PURE__ */ o("p", { className: `m-0 mt-4 text-base leading-relaxed ${Ee}`, children: t.intro })
  ] });
}
function vo({
  sections: e,
  slots: t,
  className: r = ""
}) {
  const n = e.filter((s) => !s.hidden);
  let a = 1;
  return /* @__PURE__ */ o("div", { className: `font-mono ${r}`, children: n.map((s, i) => {
    const l = a;
    return a += (s.blocks ?? []).reduce((c, d) => c + pr(d), 0), /* @__PURE__ */ k(
      "section",
      {
        id: s.id ?? fo(s.kicker),
        className: "mt-24 first:mt-0 sm:mt-32 sm:first:mt-0",
        children: [
          /* @__PURE__ */ o(xo, { n: i + 1, section: s }),
          s.blocks && s.blocks.length > 0 && /* @__PURE__ */ o(ho, { blocks: s.blocks, slots: t, figureStart: l })
        ]
      },
      s.id ?? s.kicker
    );
  }) });
}
function is({
  study: e,
  slots: t,
  className: r = ""
}) {
  return /* @__PURE__ */ k("article", { className: `font-mono ${r}`, children: [
    /* @__PURE__ */ o(go, { study: e }),
    /* @__PURE__ */ o(vo, { sections: e.sections, slots: t, className: "mt-24 sm:mt-32" })
  ] });
}
const yo = re(function({ meta: t, title: r, description: n, titleSuffix: a, thumb: s, thumbPosition: i = "start", selected: l = !1, className: c = "", ...d }, u) {
  const m = "as" in d && d.as ? d.as : null, p = m ? "as" : "href" in d && d.href != null ? "a" : "onClick" in d && d.onClick != null ? "button" : "div", h = `
    block w-full text-left p-3 plate-round
    transition-colors [transition-duration:var(--duration-fast)]
    font-mono
    ${p !== "div" ? "cursor-pointer hover:bg-[var(--surface-muted)] focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]" : ""}
    ${l ? "bg-[var(--surface-muted)]" : ""}
    ${c}
  `, b = /* @__PURE__ */ k(ge, { children: [
    t && /* @__PURE__ */ o("span", { className: "block text-sm text-secondary-700 dark:text-secondary-600", children: t }),
    /* @__PURE__ */ k(
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
  ] }), f = s ? /* @__PURE__ */ k("span", { className: `flex items-start gap-4 ${i === "end" ? "flex-row-reverse" : ""}`, children: [
    /* @__PURE__ */ o("span", { className: "flex-shrink-0", children: s }),
    /* @__PURE__ */ o("span", { className: "block min-w-0 flex-1", children: b })
  ] }) : b;
  if (m) {
    const { asProps: N, ...v } = d, w = { ...v };
    return delete w.as, /* @__PURE__ */ o(m, { ref: u, className: h, ...w, ...N, children: f });
  }
  if (p === "a") {
    const { href: N, ...v } = d;
    return /* @__PURE__ */ o("a", { ref: u, href: N, className: h, ...v, children: f });
  }
  if (p === "button") {
    const { onClick: N, ...v } = d;
    return /* @__PURE__ */ o("button", { ref: u, type: "button", onClick: N, className: h, ...v, children: f });
  }
  return /* @__PURE__ */ o("div", { ref: u, className: h, ...d, children: f });
});
yo.displayName = "ListRow";
const ft = re(function({ variant: t = "inline", external: r = !1, className: n = "", children: a, ...s }, i) {
  const l = S(
    "font-mono text-[var(--accent)] transition-colors [transition-duration:var(--duration-fast)] hover:text-[var(--text-link-hover)]",
    "focus:outline-none focus-visible:[outline:var(--focus-ring-width)_solid_var(--focus-ring-primary)] focus-visible:[outline-offset:var(--focus-ring-offset)]",
    t === "inline" ? "underline underline-offset-2" : "no-underline hover:underline focus-visible:underline",
    n
  ), c = /* @__PURE__ */ k(ge, { children: [
    a,
    r && /* @__PURE__ */ k(ge, { children: [
      /* @__PURE__ */ o(Q, { name: "ExternalLink", size: "3", className: "ml-1" }),
      /* @__PURE__ */ o("span", { className: "sr-only", children: " (opens in new tab)" })
    ] })
  ] });
  if ("as" in s && s.as) {
    const { as: h, asProps: b } = s;
    return /* @__PURE__ */ o(h, { ref: i, className: l, ...r ? { target: "_blank", rel: "noopener noreferrer" } : void 0, ...b, children: c });
  }
  const { href: d, target: u, rel: m, ...p } = s;
  return /* @__PURE__ */ o(
    "a",
    {
      ref: i,
      href: d,
      className: l,
      target: r ? u ?? "_blank" : u,
      rel: r ? m ?? "noopener noreferrer" : m,
      ...p,
      children: c
    }
  );
});
ft.displayName = "Link";
const wo = {
  neutral: "Bell",
  success: "CheckCircle",
  warning: "AlertTriangle",
  error: "AlertCircle",
  info: "Info"
}, ko = {
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
}, Bt = `
  relative shrink-0 inline-flex items-center px-1 font-mono text-sm font-bold cursor-pointer
  before:content-[''] before:absolute before:inset-x-0 before:top-1/2 before:-translate-y-1/2 before:h-touch
  focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]
`;
function No({ children: e, onClick: t, tone: r = "neutral", action: n, duration: a, onDismiss: s }) {
  const [i, l] = H(!1);
  U(() => {
    const v = requestAnimationFrame(() => l(!0));
    return () => cancelAnimationFrame(v);
  }, []);
  const [c, d] = H(!1), [u, m] = H(!1), p = c || u, h = X(s);
  U(() => {
    h.current = s;
  });
  const b = X(a ?? 0);
  U(() => {
    b.current = a ?? 0;
  }, [a]), U(() => {
    if (p || a == null || !Number.isFinite(a) || !h.current) return;
    const v = Date.now(), w = setTimeout(() => {
      var $;
      return ($ = h.current) == null ? void 0 : $.call(h);
    }, Math.max(0, b.current));
    return () => {
      clearTimeout(w), b.current -= Date.now() - v;
    };
  }, [p, a]);
  const f = (v) => {
    v.currentTarget.contains(v.relatedTarget) || m(!1);
  }, g = ko[r], N = a === 1 / 0 && s != null;
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events -- pointer shortcut to dismiss; the dismiss and action buttons are the keyboard path
    /* @__PURE__ */ o(
      "div",
      {
        role: r === "error" ? "alert" : "status",
        onClick: t,
        onMouseEnter: () => d(!0),
        onMouseLeave: () => d(!1),
        onFocus: () => m(!0),
        onBlur: f,
        className: `
        plate-round p-px ${g.ring}
        transition-transform [transition-duration:var(--duration-normal)] [transition-timing-function:steps(5)]
        ${i ? "translate-y-0" : "translate-y-16"}
        ${t ? "cursor-pointer" : ""}
      `,
        children: /* @__PURE__ */ k(
          "div",
          {
            className: `plate-round flex max-w-[min(28rem,calc(100vw-2rem))] items-center gap-2 px-3 py-2.5 font-mono text-sm ${g.fill} ${g.text}`,
            children: [
              /* @__PURE__ */ o("span", { className: `inline-flex shrink-0 ${g.icon}`, children: /* @__PURE__ */ o(Q, { name: wo[r], size: "4" }) }),
              /* @__PURE__ */ o("span", { className: "min-w-0 whitespace-nowrap overflow-hidden text-ellipsis", children: e }),
              n && /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  className: `${Bt} underline underline-offset-2`,
                  onClick: (v) => {
                    v.stopPropagation(), n.onClick(), s == null || s();
                  },
                  children: n.label
                }
              ),
              N && /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  "aria-label": "Dismiss notification",
                  className: Bt,
                  onClick: (v) => {
                    v.stopPropagation(), s == null || s();
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
const $o = 5e3, Nt = [];
let et = Nt, So = 0;
const pt = /* @__PURE__ */ new Set();
function hr(e) {
  et = e, pt.forEach((t) => t());
}
function gr(e) {
  return pt.add(e), () => {
    pt.delete(e);
  };
}
const xr = () => et, vr = () => Nt;
function Fe(e, t = {}) {
  const { id: r = `toast-${++So}`, duration: n = $o, tone: a, ...s } = t, i = { id: r, message: e, duration: n, ...s };
  return a !== void 0 && (i.tone = a), hr([...et.filter((l) => l.id !== r), i]), r;
}
function $t(e) {
  hr(e === void 0 ? Nt : et.filter((t) => t.id !== e));
}
const Io = Object.assign(Fe, {
  success: (e, t) => Fe(e, { ...t, tone: "success" }),
  warning: (e, t) => Fe(e, { ...t, tone: "warning" }),
  error: (e, t) => Fe(e, { ...t, tone: "error" }),
  info: (e, t) => Fe(e, { ...t, tone: "info" }),
  dismiss: $t
});
function ls() {
  return { toasts: Kt(gr, xr, vr), toast: Io, dismiss: $t };
}
function cs({ toasts: e, onDismiss: t }) {
  const r = Kt(gr, xr, vr), n = e !== void 0, a = n ? e : r, s = n ? t : $t;
  return /* @__PURE__ */ o(
    "div",
    {
      "aria-live": "polite",
      className: "fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2",
      style: { zIndex: "var(--z-index-popover)" },
      children: a.map((i) => /* @__PURE__ */ o(
        No,
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
function ds({
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
  }), c = ue(() => {
    i && l(!1);
  }, [i, l]), [d, u] = H(i);
  U(() => {
    i && u(!0);
  }, [i]);
  const m = d && !i, p = X(null), h = X(null), b = i && d;
  return U(() => {
    var f;
    if (b)
      return h.current = document.activeElement, (f = p.current) == null || f.focus(), () => {
        var g;
        (g = h.current) == null || g.focus(), h.current = null;
      };
  }, [b]), ur(p, b), U(() => {
    if (!i) return;
    const f = (g) => {
      g.key === "Escape" && c();
    };
    return document.addEventListener("keydown", f), () => document.removeEventListener("keydown", f);
  }, [i, c]), U(() => (i ? document.body.style.overflow = "hidden" : document.body.style.overflow = "unset", () => {
    document.body.style.overflow = "unset";
  }), [i]), d ? /* @__PURE__ */ k(ge, { children: [
    /* @__PURE__ */ o(
      "div",
      {
        className: `fixed inset-0 bg-[var(--surface-overlay)] ${m ? "animate-out fade-out fill-mode-forwards" : "animate-in fade-in"}`,
        style: { zIndex: "var(--z-index-overlay)", animationDuration: "var(--duration-slow)" },
        onClick: c,
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
        className: `focus:outline-none fixed bottom-0 inset-x-0 mx-auto w-[min(540px,100%)] plate-round-lg-top bg-[var(--surface-container-stroke)] pt-px px-px ${m ? "animate-out slide-out-to-bottom fill-mode-forwards" : "animate-in slide-in-from-bottom"}`,
        style: { zIndex: "var(--z-index-modal)", animationDuration: "var(--duration-slow)" },
        onAnimationEnd: () => {
          m && u(!1);
        },
        children: /* @__PURE__ */ k("div", { className: "plate-round-lg-top bg-[var(--surface-card)] px-5 pb-6 pt-1 flex flex-col items-center gap-3 max-h-[70vh]", children: [
          /* @__PURE__ */ k("div", { className: "relative flex h-touch w-full shrink-0 items-center justify-center", children: [
            /* @__PURE__ */ o("div", { className: "w-9 h-1 bg-[var(--surface-container-stroke)]", "aria-hidden": "true" }),
            /* @__PURE__ */ o(
              "button",
              {
                type: "button",
                onClick: c,
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
function us() {
  const { resolvedTheme: e, setTheme: t } = Dr(), [r, n] = H(!1);
  if (U(() => {
    n(!0);
  }, []), !r)
    return /* @__PURE__ */ k("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ o("div", { className: "w-11 h-6 rounded-none bg-[var(--field-border)]" }),
      /* @__PURE__ */ o("span", { className: "text-sm font-mono text-[var(--text-secondary)]", children: "Theme" })
    ] });
  const a = e === "dark", s = a ? "Dark" : "Light", i = a ? "light" : "dark";
  return /* @__PURE__ */ k("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ o(
      fr,
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
const yr = Oe(null);
function St(e) {
  const t = Se(yr);
  if (!t)
    throw new Error(`[@scorp-ds/components] ${e} must be used inside <Tabs>.`);
  return t;
}
function ms({
  value: e,
  defaultValue: t,
  onValueChange: r,
  children: n,
  className: a
}) {
  const s = e !== void 0, [i, l] = H(() => t ?? ""), c = s ? e : i, d = ce().replace(/:/g, ""), u = X([]), m = ue(
    (h) => {
      s || l(h), r == null || r(h);
    },
    [s, r]
  ), p = Le(
    () => ({
      value: c,
      onValueChange: m,
      baseId: d,
      listValuesRef: u,
      isControlled: s
    }),
    [c, m, d, s]
  );
  return /* @__PURE__ */ o(yr.Provider, { value: p, children: /* @__PURE__ */ o("div", { className: S("w-full", a), children: n }) });
}
function To(e) {
  const t = [];
  return $e.Children.forEach(e, (r) => {
    if (!$e.isValidElement(r)) return;
    if (r.type.displayName === "TabsTrigger") {
      const a = r.props.value;
      typeof a == "string" && t.push(a);
    }
  }), t;
}
function Co({
  children: e,
  className: t,
  "aria-label": r,
  "aria-labelledby": n
}) {
  const { value: a, isControlled: s, onValueChange: i, listValuesRef: l } = St("TabsList"), c = To(e);
  l.current = c;
  const d = c.join("\0");
  return _e(() => {
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
Co.displayName = "TabsList";
const Eo = re(function({ value: t, children: r, className: n, disabled: a, onKeyDown: s, onClick: i, type: l = "button", ...c }, d) {
  const { value: u, onValueChange: m, baseId: p, listValuesRef: h } = St("TabsTrigger"), b = u === t, f = `${p}-tab-${t}`, g = `${p}-panel-${t}`, N = (M) => {
    m(M), requestAnimationFrame(() => {
      var x;
      (x = document.getElementById(`${p}-tab-${M}`)) == null || x.focus();
    });
  }, v = (M) => {
    const x = document.getElementById(`${p}-tab-${M}`);
    return x == null || !x.disabled;
  }, w = (M) => {
    const x = h.current, C = x.indexOf(t);
    if (C < 0) return null;
    for (let F = 1; F <= x.length; F += 1) {
      const W = x[((C + M * F) % x.length + x.length) % x.length];
      if (W !== t && v(W)) return W;
    }
    return null;
  }, $ = (M, x) => {
    const C = h.current;
    for (let F = M; F >= 0 && F < C.length; F += x)
      if (v(C[F])) return C[F];
    return null;
  }, T = (M) => {
    const x = w(M);
    x && N(x);
  }, I = (M) => {
    if (s == null || s(M), M.defaultPrevented || a) return;
    const x = h.current;
    switch (M.key) {
      case "ArrowRight":
      case "ArrowDown":
        M.preventDefault(), T(1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        M.preventDefault(), T(-1);
        break;
      case "Home": {
        M.preventDefault();
        const C = $(0, 1);
        C && N(C);
        break;
      }
      case "End": {
        M.preventDefault();
        const C = $(x.length - 1, -1);
        C && N(C);
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
      "aria-selected": b,
      "aria-controls": g,
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
      onClick: (M) => {
        i == null || i(M), !M.defaultPrevented && !a && m(t);
      },
      onKeyDown: I,
      ...c,
      children: r
    }
  );
});
Eo.displayName = "TabsTrigger";
function _o({ value: e, children: t, className: r, forceMount: n = !1 }) {
  const { value: a, baseId: s } = St("TabsContent"), i = a === e, l = `${s}-tab-${e}`, c = `${s}-panel-${e}`;
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
_o.displayName = "TabsContent";
const Ao = { sm: "size-control-sm", md: "size-control-md", lg: "size-control-lg" }, zo = { animationTimingFunction: "steps(4, jump-none)" };
function wr({ variant: e = "text", lines: t = 1, size: r = "md", animated: n = !0, className: a }) {
  const s = n ? "animate-pulse motion-reduce:animate-none" : "", i = n ? zo : void 0;
  if (e === "text") {
    const l = Math.max(1, Math.floor(t));
    return /* @__PURE__ */ o("div", { "aria-hidden": "true", "data-skeleton": "text", className: S("flex w-full flex-col gap-2", a), children: Array.from({ length: l }, (c, d) => /* @__PURE__ */ o(
      "span",
      {
        style: i,
        className: S(
          "block h-3 bg-[var(--surface-muted)]",
          l > 1 && d === l - 1 ? "w-3/5" : "w-full",
          s
        )
      },
      d
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
        e === "avatar" ? Ao[r] : "h-24 w-full",
        s,
        a
      )
    }
  );
}
wr.displayName = "Skeleton";
const Mo = typeof window < "u" ? _e : U, kr = {
  compact: "px-3 py-2",
  // 12 / 8
  comfortable: "px-4 py-3",
  // 16 / 12
  spacious: "px-5 py-4"
  // 20 / 16
}, It = Oe("compact"), Nr = Oe(null), Ro = re(function({ className: t, striped: r, bordered: n, density: a = "compact", children: s, "aria-busy": i, ...l }, c) {
  const [d, u] = H(0), m = ue((h) => u((b) => b + h), []), p = /* @__PURE__ */ o(Nr.Provider, { value: m, children: /* @__PURE__ */ o(It.Provider, { value: a, children: /* @__PURE__ */ o(
    "table",
    {
      ref: c,
      "aria-busy": i ?? (d > 0 ? !0 : void 0),
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
Ro.displayName = "Table";
const Lo = re(function({ className: t, ...r }, n) {
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
Lo.displayName = "TableHeader";
const Oo = re(function({ className: t, loading: r = !1, loadingRows: n = 3, emptyState: a, colSpan: s, children: i, ...l }, c) {
  const d = Se(Nr), u = X(null), m = ue(
    (v) => {
      u.current = v, typeof c == "function" ? c(v) : c && (c.current = v);
    },
    [c]
  ), p = !r && a != null && Wt.toArray(i).length === 0, h = r || p, [b, f] = H(1);
  Mo(() => {
    var $, T, I;
    if (!h || s != null) return;
    const v = (I = (T = ($ = u.current) == null ? void 0 : $.closest("table")) == null ? void 0 : T.tHead) == null ? void 0 : I.rows[0];
    if (!v) return;
    const w = Array.from(v.cells).reduce((M, x) => M + x.colSpan, 0);
    f(Math.max(1, w));
  }, [h, s]);
  const g = Math.max(1, s ?? b);
  U(() => {
    if (!(!r || !d))
      return d(1), () => d(-1);
  }, [r, d]);
  let N = i;
  if (r) {
    const v = Math.max(1, Math.floor(n));
    N = Array.from({ length: v }, (w, $) => /* @__PURE__ */ o(bt, { "aria-hidden": "true", "data-table-loading-row": "", children: Array.from({ length: g }, (T, I) => /* @__PURE__ */ o(ht, { children: /* @__PURE__ */ o("div", { className: "flex h-5 items-center", children: /* @__PURE__ */ o(wr, {}) }) }, I)) }, $));
  } else p && (N = /* @__PURE__ */ o(bt, { "data-table-empty-row": "", children: /* @__PURE__ */ o(ht, { colSpan: g, className: "text-center", children: a }) }));
  return /* @__PURE__ */ o("tbody", { ref: m, className: S(t), ...l, children: N });
});
Oo.displayName = "TableBody";
const Po = re(function({ className: t, ...r }, n) {
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
Po.displayName = "TableFooter";
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
const Do = re(function({ className: t, scope: r = "col", ...n }, a) {
  const s = Se(It);
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
Do.displayName = "TableHead";
const ht = re(function({ className: t, ...r }, n) {
  const a = Se(It);
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
const jo = {
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
function Bo(e, t, r, n, a) {
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
function Fo(e, t, r, n, a) {
  return Qe(e) ? t === "start" ? r.left : t === "end" ? r.left + r.width - n : r.left + r.width / 2 - n / 2 : t === "start" ? r.top : t === "end" ? r.top + r.height - a : r.top + r.height / 2 - a / 2;
}
const Ft = (e, t, r) => r < t ? t : Math.min(Math.max(e, t), r);
function Vo({
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
  let p = r;
  const h = Qe(r) ? m : u, b = st(r, e, c, d, a, s);
  if (l && b < h) {
    const w = jo[r];
    st(w, e, c, d, a, s) > b && (p = w);
  }
  const f = Bo(p, e, u, m, a), g = Fo(p, n, e, u, m), N = Qe(p) ? f : Ft(g, s, d - m - s), v = Qe(p) ? Ft(g, s, c - u - s) : f;
  return {
    top: N,
    left: v,
    side: p,
    align: n,
    available: Math.max(0, st(p, e, c, d, a, s))
  };
}
const Ho = typeof window < "u" ? _e : U;
function Go({
  open: e,
  anchorRef: t,
  floatingRef: r,
  side: n = "bottom",
  align: a = "start",
  offset: s = 8,
  padding: i = 8
}) {
  const [l, c] = H(null), d = ue(() => {
    const u = t.current, m = r.current;
    if (!u || !m) return;
    const p = u.getBoundingClientRect(), h = m.getBoundingClientRect(), b = Vo({
      anchor: { top: p.top, left: p.left, width: p.width, height: p.height },
      floating: { width: h.width, height: h.height },
      side: n,
      align: a,
      offset: s,
      padding: i
    });
    c(
      (f) => f && f.top === b.top && f.left === b.left && f.side === b.side && f.available === b.available && f.anchorWidth === p.width ? f : { ...b, anchorWidth: p.width }
    );
  }, [t, r, n, a, s, i]);
  return Ho(() => {
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
const Uo = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function $r({
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
  returnFocus: p = !0,
  matchAnchorWidth: h = !1,
  role: b = "dialog",
  "aria-label": f,
  "aria-labelledby": g,
  id: N,
  className: v,
  contentClassName: w,
  triggerWrapperClassName: $,
  portal: T = !1
}) {
  const [I, M] = je({
    value: e,
    defaultValue: t,
    onChange: r
  }), x = ce(), C = N ?? `${x}-popover`, F = X(null), W = X(null), te = X("programmatic"), ne = Le(
    () => ({
      get current() {
        var R;
        return (a == null ? void 0 : a.current) ?? ((R = F.current) == null ? void 0 : R.firstElementChild) ?? F.current;
      }
    }),
    [a]
  ), { position: B } = Go({ open: I, anchorRef: ne, floatingRef: W, side: i, align: l, offset: c }), Z = (R) => {
    te.current = R, M(!1);
  }, ee = (R) => {
    var L, q, Y;
    return R != null && (((L = W.current) == null ? void 0 : L.contains(R)) || ((q = F.current) == null ? void 0 : q.contains(R)) || ((Y = a == null ? void 0 : a.current) == null ? void 0 : Y.contains(R)) || !1);
  };
  U(() => {
    if (!I || !d) return;
    const R = (L) => {
      ee(L.target) || Z("outside");
    };
    return document.addEventListener("mousedown", R), () => document.removeEventListener("mousedown", R);
  }, [I, d]), U(() => {
    if (!I || !u) return;
    const R = (L) => {
      if (L.key !== "Escape") return;
      const q = L.target;
      (ee(q) || q === document.body || q === document.documentElement) && Z("escape");
    };
    return document.addEventListener("keydown", R), () => document.removeEventListener("keydown", R);
  }, [I, u]);
  const E = X(I);
  U(() => {
    var R;
    if (I && !E.current && (te.current = "programmatic", m && W.current && (W.current.querySelector(Uo) ?? W.current).focus({ preventScroll: !0 })), !I && E.current && p) {
      const L = te.current, q = document.activeElement, Y = q == null || q === document.body;
      L !== "outside" && L !== "blur" && (Y || ee(q)) && ((R = ne.current) == null || R.focus({ preventScroll: !0 }));
    }
    E.current = I;
  }, [I]);
  const O = (R) => {
    const L = R.relatedTarget;
    L && !ee(L) && Z("blur");
  }, P = n && Ue(n) ? gt(
    n,
    {
      "aria-expanded": I,
      "aria-controls": I ? C : void 0,
      "aria-haspopup": b === "dialog" ? "dialog" : void 0,
      onClick: (R) => {
        var L, q;
        (q = (L = n.props).onClick) == null || q.call(L, R), !R.defaultPrevented && (I ? Z("trigger") : M(!0));
      }
    }
  ) : null, y = (R) => T && typeof document < "u" ? Br(R, document.body) : R, G = {
    position: "fixed",
    top: (B == null ? void 0 : B.top) ?? 0,
    left: (B == null ? void 0 : B.left) ?? 0,
    zIndex: "var(--z-index-popover)",
    minWidth: h && B ? B.anchorWidth : void 0,
    animationDuration: "var(--duration-fast)",
    // Exposed so content can cap its height to the room on the chosen side
    "--popover-available-height": B ? `${B.available}px` : void 0
  };
  return /* @__PURE__ */ k(ge, { children: [
    P && /* @__PURE__ */ o("span", { ref: F, className: S("inline-flex", $), children: P }),
    I && y(
      /* @__PURE__ */ o(
        "div",
        {
          ref: W,
          id: C,
          role: b ?? void 0,
          "aria-label": b ? f : void 0,
          "aria-labelledby": b ? g : void 0,
          tabIndex: -1,
          "data-side": (B == null ? void 0 : B.side) ?? i,
          "data-align": l,
          onBlur: O,
          style: G,
          className: S(
            "w-max max-w-[calc(100vw-1rem)] plate-round p-px bg-[var(--surface-container-stroke)] focus:outline-none",
            "animate-in fade-in motion-reduce:animate-none",
            // Measured before it is shown, so it never flashes at 0,0
            B ? "opacity-100" : "opacity-0",
            v
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
const Wo = (e, t) => e.label.toLowerCase().includes(t.trim().toLowerCase()), Ko = re(function({
  options: t,
  value: r,
  defaultValue: n = null,
  onValueChange: a,
  onInputChange: s,
  filter: i = Wo,
  emptyText: l = "No matches",
  size: c = "md",
  label: d,
  helperText: u,
  errorMessage: m,
  error: p = !1,
  openOnFocus: h = !1,
  portal: b = !1,
  disabled: f = !1,
  placeholder: g,
  name: N,
  id: v,
  className: w,
  "aria-describedby": $,
  "aria-label": T,
  onKeyDown: I,
  onFocus: M,
  onBlur: x,
  ...C
}, F) {
  const W = Pe({ error: p, helperText: u, errorMessage: m, describedBy: $ }), te = ce(), ne = v ?? `${te}-input`, B = `${te}-listbox`, Z = `${te}-label`, ee = `${te}-empty`, E = (_) => `${te}-option-${_}`, [O, P] = je({
    value: r,
    defaultValue: n
  }), y = t.find((_) => _.value === O) ?? null, [G, R] = H(!1), [L, q] = H((y == null ? void 0 : y.label) ?? ""), [Y, V] = H(!1), [ae, ie] = H(-1), J = X(null), xe = X(null), me = X(null);
  U(() => {
    G || q((y == null ? void 0 : y.label) ?? "");
  }, [y == null ? void 0 : y.label, G]);
  const D = Le(
    () => Y && L !== "" ? t.filter((_) => i(_, L)) : t,
    [Y, L, t, i]
  ), j = D.map((_, oe) => _.disabled ? -1 : oe).filter((_) => _ >= 0), se = j[0] ?? -1, ve = j[j.length - 1] ?? -1, be = (_, oe) => {
    if (j.length === 0) return -1;
    const he = j.indexOf(_);
    if (he === -1) return oe === 1 ? se : ve;
    const Te = (he + oe + j.length) % j.length;
    return j[Te];
  }, de = (_) => {
    if (f) return;
    R(!0);
    const oe = y ? D.findIndex((he) => he.value === y.value && !he.disabled) : -1;
    ie(_ === "selected" ? oe >= 0 ? oe : se : _ === "first" ? se : _ === "last" ? ve : -1);
  }, fe = () => {
    R(!1), V(!1), ie(-1), q((y == null ? void 0 : y.label) ?? "");
  }, ze = (_) => {
    P((_ == null ? void 0 : _.value) ?? null), ((_ == null ? void 0 : _.value) ?? null) !== O && (a == null || a((_ == null ? void 0 : _.value) ?? null, _)), q((_ == null ? void 0 : _.label) ?? ""), V(!1), R(!1), ie(-1);
  };
  U(() => {
    var oe;
    if (!G || ae < 0) return;
    const _ = document.getElementById(E(ae));
    (oe = _ == null ? void 0 : _.scrollIntoView) == null || oe.call(_, { block: "nearest" });
  }, [G, ae]);
  const tt = (_) => {
    const oe = _.target.value;
    if (q(oe), V(!0), s == null || s(oe), !f) {
      R(!0);
      const he = oe === "" ? t : t.filter((Te) => i(Te, oe));
      ie(he.findIndex((Te) => !Te.disabled));
    }
  }, zr = (_) => {
    if (I == null || I(_), !(_.defaultPrevented || f))
      switch (_.key) {
        case "ArrowDown":
          _.preventDefault(), G ? ie((oe) => be(oe, 1)) : de(_.altKey ? "none" : "selected");
          break;
        case "ArrowUp":
          _.preventDefault(), G ? ie((oe) => be(oe, -1)) : de(y ? "selected" : "last");
          break;
        case "Home":
          G && j.length && (_.preventDefault(), ie(se));
          break;
        case "End":
          G && j.length && (_.preventDefault(), ie(ve));
          break;
        case "Enter":
          G && ae >= 0 && D[ae] && !D[ae].disabled && (_.preventDefault(), ze(D[ae]));
          break;
        case "Escape":
          G ? (_.preventDefault(), fe()) : (L !== "" || O != null) && (_.preventDefault(), ze(null));
          break;
        case "Tab":
          G && fe();
          break;
      }
  }, Mr = (_) => {
    xe.current = _, typeof F == "function" ? F(_) : F && (F.current = _);
  }, Ct = {
    sm: { input: "h-control-sm pl-3 pr-9", icon: "right-3" },
    md: { input: "h-control-md pl-4 pr-10", icon: "right-4" },
    lg: { input: "h-control-lg pl-5 pr-11", icon: "right-5" }
  }[c], rt = W.invalid, Rr = rt ? "bg-[var(--field-border-error)] focus-within:!bg-[var(--field-border-focus)]" : "bg-[var(--field-border)] hover:bg-[var(--field-border-hover)] focus-within:!bg-[var(--field-border-focus)]", qe = d != null && d !== "", Lr = G && ae >= 0 && D[ae] ? E(ae) : void 0;
  return /* @__PURE__ */ k("div", { className: S("w-full", w), children: [
    /* @__PURE__ */ k("div", { className: "w-full space-y-1", children: [
      qe && /* @__PURE__ */ o(
        "label",
        {
          id: Z,
          htmlFor: ne,
          className: "block font-mono text-sm text-secondary-800 dark:text-secondary-200",
          children: d
        }
      ),
      /* @__PURE__ */ k(
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
                ...C,
                ref: Mr,
                id: ne,
                type: "text",
                role: "combobox",
                autoComplete: "off",
                "aria-autocomplete": "list",
                "aria-expanded": G,
                "aria-controls": G ? D.length > 0 ? B : ee : void 0,
                "aria-activedescendant": Lr,
                "aria-invalid": rt || void 0,
                "aria-describedby": W.describedBy,
                "aria-label": qe ? void 0 : T,
                disabled: f,
                placeholder: g,
                value: L,
                onChange: tt,
                onKeyDown: zr,
                onClick: () => {
                  G || de("selected");
                },
                onFocus: (_) => {
                  M == null || M(_), h && !G && de("selected");
                },
                onBlur: (_) => {
                  x == null || x(_), G && fe();
                },
                className: S(
                  "w-full plate-round font-mono text-sm",
                  "transition-colors [transition-duration:var(--duration-fast)]",
                  "placeholder:text-[var(--field-placeholder)] focus:outline-none disabled:cursor-not-allowed",
                  rt ? "bg-[var(--field-background-error)] text-[var(--text-primary)]" : "bg-[var(--field-background)] text-[var(--text-primary)]",
                  Ct.input
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
                  G && "rotate-180",
                  Ct.icon
                ),
                children: /* @__PURE__ */ o(Q, { name: "ChevronDown" })
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ o(De, { ...W.message })
    ] }),
    N != null && /* @__PURE__ */ o("input", { type: "hidden", name: N, value: O ?? "" }),
    /* @__PURE__ */ o(
      $r,
      {
        open: G,
        onOpenChange: (_) => {
          _ || fe();
        },
        anchorRef: J,
        role: null,
        autoFocus: !1,
        returnFocus: !1,
        closeOnEscape: !1,
        matchAnchorWidth: !0,
        portal: b,
        offset: 4,
        contentClassName: "p-0",
        children: D.length > 0 ? /* @__PURE__ */ o(
          "ul",
          {
            ref: me,
            id: B,
            role: "listbox",
            "aria-labelledby": qe ? Z : void 0,
            "aria-label": qe ? void 0 : T,
            className: "max-h-[min(var(--control-menu-max-height),var(--popover-available-height,var(--control-menu-max-height)))] overflow-y-auto py-1",
            children: D.map((_, oe) => {
              const he = _.value === O, Te = oe === ae;
              return (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events -- pointer path only; the keyboard selects through the input with aria-activedescendant
                /* @__PURE__ */ k(
                  "li",
                  {
                    id: E(oe),
                    role: "option",
                    "aria-selected": he,
                    "aria-disabled": _.disabled || void 0,
                    onMouseDown: (Or) => Or.preventDefault(),
                    onMouseMove: () => {
                      !_.disabled && ae !== oe && ie(oe);
                    },
                    onClick: () => {
                      _.disabled || ze(_);
                    },
                    className: S(
                      "flex min-h-touch items-center gap-2 px-4 py-2 font-mono text-sm",
                      _.disabled ? "cursor-not-allowed text-[var(--text-disabled)]" : "cursor-pointer text-[var(--text-primary)]",
                      Te && !_.disabled && "bg-[var(--surface-subtle)]"
                    ),
                    children: [
                      /* @__PURE__ */ o("span", { className: "min-w-0 flex-1 truncate", children: _.label }),
                      he && /* @__PURE__ */ o(Q, { name: "Check", className: "shrink-0 text-[var(--border-focus)]" })
                    ]
                  },
                  _.value
                )
              );
            })
          }
        ) : /* @__PURE__ */ o("div", { id: ee, role: "status", className: "px-4 py-3 font-mono text-sm text-[var(--text-secondary)]", children: l })
      }
    )
  ] });
});
Ko.displayName = "Combobox";
const qo = {
  primary: "bg-primary-500 dark:bg-primary-400",
  neutral: "bg-secondary-600 dark:bg-secondary-400",
  info: "bg-info-600 dark:bg-info-400",
  success: "bg-success-600 dark:bg-success-400",
  warning: "bg-warning-600 dark:bg-warning-400",
  error: "bg-error-600 dark:bg-error-400"
}, Xo = { sm: "h-2", md: "h-3", lg: "h-4" }, Vt = 4;
function Yo() {
  if (typeof window > "u" || typeof getComputedStyle != "function") return 120;
  const e = getComputedStyle(document.documentElement).getPropertyValue("--duration-fast").trim(), t = e.endsWith("ms") ? parseFloat(e) : e.endsWith("s") ? parseFloat(e) * 1e3 : NaN;
  return Number.isFinite(t) && t > 0 ? t : 120;
}
function Zo() {
  const e = "(prefers-reduced-motion: reduce)", [t, r] = H(
    () => typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia(e).matches
  );
  return U(() => {
    var s;
    if (typeof window.matchMedia != "function") return;
    const n = window.matchMedia(e), a = () => r(n.matches);
    return (s = n.addEventListener) == null || s.call(n, "change", a), () => {
      var i;
      return (i = n.removeEventListener) == null ? void 0 : i.call(n, "change", a);
    };
  }, []), t;
}
function Qo({
  value: e,
  max: t = 100,
  label: r,
  showLabel: n = !0,
  showValue: a = !0,
  size: s = "md",
  tone: i = "primary",
  segments: l = 20,
  className: c
}) {
  const d = ce(), u = e == null || Number.isNaN(e), m = t > 0 ? t : 100, p = u ? 0 : Math.min(Math.max(e, 0), m), h = Math.round(p / m * 100), b = Math.floor(p / m * l), f = Zo(), [g, N] = H(0);
  U(() => {
    if (!u || f) return;
    const w = window.setInterval(() => N(($) => ($ + 1) % (l + Vt)), Yo());
    return () => window.clearInterval(w);
  }, [u, f, l]);
  const v = (w) => u ? f ? !0 : w > g - Vt - 1 && w <= g - 1 : w < b;
  return /* @__PURE__ */ k("div", { className: S("w-full space-y-1.5 font-mono", c), children: [
    n && /* @__PURE__ */ k("div", { className: "flex items-baseline justify-between gap-3 text-sm", children: [
      /* @__PURE__ */ o("span", { id: d, className: "min-w-0 truncate text-[var(--text-primary)]", children: r }),
      a && !u && /* @__PURE__ */ k("span", { className: "shrink-0 tabular-nums text-[var(--text-secondary)]", "aria-hidden": "true", children: [
        h,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ o(
      "div",
      {
        role: "progressbar",
        "aria-labelledby": n ? d : void 0,
        "aria-label": n ? void 0 : r,
        "aria-valuemin": 0,
        "aria-valuemax": m,
        "aria-valuenow": u ? void 0 : p,
        "aria-valuetext": u ? void 0 : `${h}%`,
        "data-state": u ? "indeterminate" : p >= m ? "complete" : "loading",
        "data-tone": i,
        className: "bg-[var(--border-default)] p-px",
        children: /* @__PURE__ */ o(
          "div",
          {
            className: S("flex gap-0.5 bg-[var(--surface-subtle)] p-0.5", Xo[s]),
            "aria-hidden": "true",
            children: Array.from({ length: l }, (w, $) => /* @__PURE__ */ o(
              "span",
              {
                "data-filled": v($) || void 0,
                className: S(
                  "h-full flex-1",
                  v($) ? qo[i] : "bg-[var(--surface-muted)]",
                  u && f && "opacity-50"
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
Qo.displayName = "ProgressBar";
const Jo = {
  sm: { root: "gap-3 px-4 py-6", icon: "6", plate: "p-2", title: "text-sm", description: "text-xs", button: "sm" },
  md: { root: "gap-4 px-6 py-12", icon: "8", plate: "p-3", title: "text-lg", description: "text-sm", button: "md" }
};
function ea({
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
  const d = Jo[s], u = (m, p) => /* @__PURE__ */ o(
    We,
    {
      variant: p,
      size: d.button,
      onClick: m.onClick,
      href: m.href,
      iconLeft: m.icon ? pe(m.icon) : void 0,
      children: m.label
    }
  );
  return /* @__PURE__ */ k("div", { className: S("flex flex-col items-center text-center font-mono", d.root, c), children: [
    e && /* @__PURE__ */ o("span", { className: S("inline-flex plate-round bg-[var(--surface-subtle)] text-[var(--text-secondary)]", d.plate), children: pe(e, { size: d.icon }) }),
    /* @__PURE__ */ k("div", { className: "flex max-w-prose flex-col gap-1", children: [
      /* @__PURE__ */ o(i, { className: S("font-medium text-[var(--text-primary)]", d.title), children: t }),
      r && /* @__PURE__ */ o("p", { className: S("text-[var(--text-secondary)]", d.description), children: r })
    ] }),
    (n || a) && /* @__PURE__ */ k("div", { className: "flex flex-wrap items-center justify-center gap-3", children: [
      n && u(n, "primary"),
      a && u(a, "secondary")
    ] }),
    l
  ] });
}
ea.displayName = "EmptyState";
const Sr = Oe(null), Ir = Oe(null);
function Tr(e) {
  const t = Se(Sr);
  if (!t) throw new Error(`${e} must be used inside <Accordion>.`);
  return t;
}
function Cr(e) {
  const t = Se(Ir);
  if (!t) throw new Error(`${e} must be used inside <AccordionItem>.`);
  return t;
}
function fs(e) {
  const { children: t, headingLevel: r = 3, disabled: n = !1, className: a } = e, s = e.type === "multiple", i = X(null), l = (b) => b === void 0 ? void 0 : Array.isArray(b) ? b : b === "" ? [] : [b], [c, d] = je({
    value: l(e.value),
    defaultValue: l(e.defaultValue) ?? []
  }), u = (b) => {
    var f, g;
    d(b), s ? (f = e.onValueChange) == null || f.call(e, b) : (g = e.onValueChange) == null || g.call(e, b[0] ?? "");
  }, m = s || e.collapsible === !0, p = {
    isOpen: (b) => c.includes(b),
    isLocked: (b) => !m && c.includes(b),
    toggle: (b) => {
      if (c.includes(b)) {
        if (!m) return;
        u(c.filter((f) => f !== b));
      } else
        u(s ? [...c, b] : [b]);
    },
    headingLevel: r,
    disabled: n,
    rootRef: i
  }, h = (b) => {
    var w;
    const f = b.target;
    if (!f.hasAttribute("data-accordion-trigger")) return;
    const g = Array.from(
      ((w = i.current) == null ? void 0 : w.querySelectorAll("[data-accordion-trigger]:not(:disabled)")) ?? []
    ).filter(($) => $.closest("[data-accordion-root]") === i.current), N = g.indexOf(f);
    if (N === -1) return;
    let v = null;
    b.key === "ArrowDown" ? v = (N + 1) % g.length : b.key === "ArrowUp" ? v = (N - 1 + g.length) % g.length : b.key === "Home" ? v = 0 : b.key === "End" && (v = g.length - 1), v !== null && (b.preventDefault(), g[v].focus());
  };
  return /* @__PURE__ */ o(Sr.Provider, { value: p, children: /* @__PURE__ */ o(
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
function ps({ value: e, disabled: t = !1, children: r, className: n }) {
  const a = Tr("AccordionItem"), s = ce(), i = a.isOpen(e), l = {
    value: e,
    open: i,
    disabled: t || a.disabled,
    triggerId: `${s}-trigger`,
    contentId: `${s}-content`
  };
  return /* @__PURE__ */ o(Ir.Provider, { value: l, children: /* @__PURE__ */ o("div", { "data-state": i ? "open" : "closed", className: S("border-b border-[var(--border-hairline)]", n), children: r }) });
}
function bs({ children: e, className: t }) {
  const r = Tr("AccordionTrigger"), n = Cr("AccordionTrigger"), a = `h${r.headingLevel}`, s = r.isLocked(n.value);
  return /* @__PURE__ */ o(a, { className: "m-0", children: /* @__PURE__ */ k(
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
function hs({ children: e, className: t }) {
  const r = Cr("AccordionContent");
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
const ta = "focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]";
function ra({
  items: e,
  maxItems: t,
  itemsBeforeCollapse: r = 1,
  itemsAfterCollapse: n = 1,
  expandLabel: a = (l) => `Show ${l} more breadcrumb${l === 1 ? "" : "s"}`,
  "aria-label": s = "Breadcrumb",
  className: i
}) {
  const [l, c] = H(!1), d = X(null), u = X(null), m = Math.max(0, r), p = Math.max(1, n), h = !l && t != null && e.length > t && e.length > m + p, b = h ? e.length - m - p : 0;
  U(() => {
    var w;
    if (!l || u.current == null) return;
    const v = (w = d.current) == null ? void 0 : w.querySelector(
      `[data-crumb-index="${u.current}"] a, [data-crumb-index="${u.current}"] [data-crumb-link]`
    );
    v == null || v.focus(), u.current = null;
  }, [l]);
  const f = e.length - 1, g = (v, w, $) => /* @__PURE__ */ k(
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
            children: v.label
          }
        ) : v.as ? /* @__PURE__ */ o(
          ft,
          {
            variant: "quiet",
            as: v.as,
            asProps: { ...v.asProps, "data-crumb-link": "" },
            className: "inline-flex min-h-touch min-w-0 items-center truncate px-1",
            children: v.label
          }
        ) : /* @__PURE__ */ o(
          ft,
          {
            variant: "quiet",
            href: v.href ?? "#",
            className: "inline-flex min-h-touch min-w-0 items-center truncate px-1",
            children: v.label
          }
        )
      ]
    },
    v.key ?? w
  );
  let N;
  if (h) {
    const v = e.slice(0, m), w = e.slice(e.length - p);
    N = /* @__PURE__ */ k(ge, { children: [
      v.map(($, T) => g($, T, T > 0)),
      /* @__PURE__ */ k("li", { className: "inline-flex items-center", children: [
        m > 0 && /* @__PURE__ */ o(Q, { name: "ChevronRight", size: "3", className: "mx-1 shrink-0 text-[var(--text-secondary)]" }),
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
              ta
            ),
            children: /* @__PURE__ */ o("span", { "aria-hidden": "true", children: "..." })
          }
        )
      ] }),
      w.map(($, T) => g($, e.length - p + T, !0))
    ] });
  } else
    N = e.map((v, w) => g(v, w, w > 0));
  return /* @__PURE__ */ o("nav", { "aria-label": s, className: S("font-mono text-sm", i), children: /* @__PURE__ */ o("ol", { ref: d, className: "flex min-w-0 flex-wrap items-center", children: N }) });
}
ra.displayName = "Breadcrumbs";
const it = (e, t) => t < e ? [] : Array.from({ length: t - e + 1 }, (r, n) => e + n);
function na(e, t, r = 1, n = 1) {
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
const oa = {
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
            oa[e],
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
function aa({
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
  className: p
}) {
  const [h, b] = H(t), f = e !== void 0, N = Math.min(Math.max(1, f ? e : h), Math.max(1, r));
  if (r <= 0) return null;
  const v = ($) => {
    const T = Math.min(Math.max(1, $), r);
    T !== N && (f || b(T), n == null || n(T));
  }, w = na(N, r, a, s);
  return /* @__PURE__ */ o("nav", { "aria-label": m, className: S("font-mono", p), children: /* @__PURE__ */ k("ul", { className: "flex flex-wrap items-center", children: [
    l && /* @__PURE__ */ o("li", { children: /* @__PURE__ */ o(lt, { size: i, label: d, disabled: N <= 1, onClick: () => v(N - 1), children: /* @__PURE__ */ o(Q, { name: "ArrowLeft", size: Ht[i] }) }) }),
    w.map(
      ($) => typeof $ == "number" ? /* @__PURE__ */ o("li", { children: /* @__PURE__ */ o(
        lt,
        {
          size: i,
          current: $ === N,
          label: c($),
          onClick: () => v($),
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
    l && /* @__PURE__ */ o("li", { children: /* @__PURE__ */ o(lt, { size: i, label: u, disabled: N >= r, onClick: () => v(N + 1), children: /* @__PURE__ */ o(Q, { name: "ArrowRight", size: Ht[i] }) }) })
  ] }) });
}
aa.displayName = "Pagination";
const Tt = Oe({ collapsed: !1 });
function sa({ "aria-label": e, collapsed: t = !1, children: r, className: n }) {
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
sa.displayName = "SideNav";
function _r({ heading: e, children: t, className: r }) {
  const { collapsed: n } = Se(Tt), a = ce();
  return /* @__PURE__ */ k(
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
const ia = "plate-round flex w-full min-h-touch items-center gap-3 px-3 py-2 text-left font-mono text-sm transition-colors [transition-duration:var(--duration-fast)] motion-reduce:transition-none focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]", la = "text-[var(--text-secondary)] hover:bg-[var(--surface-muted)] hover:text-[var(--accent)]", ca = "bg-[var(--surface-muted)] text-[var(--accent)]";
function Ar(e) {
  let t = !1;
  return $e.Children.forEach(e, (r) => {
    if (t || !$e.isValidElement(r)) return;
    const n = r.props;
    (n.active || Ar(n.children)) && (t = !0);
  }), t;
}
function da({
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
  className: p
}) {
  const { collapsed: h } = Se(Tt), b = ce(), f = $e.Children.toArray(c).some($e.isValidElement), [g, N] = H(
    () => u ?? (f && Ar(c))
  ), v = d ?? g, w = () => {
    const x = !v;
    d === void 0 && N(x), m == null || m(x);
  }, $ = /* @__PURE__ */ k(ge, { children: [
    t && pe(t, { className: "shrink-0" }),
    /* @__PURE__ */ o("span", { className: S("min-w-0 flex-1 truncate", h && "sr-only"), children: e }),
    !h && l && /* @__PURE__ */ o("span", { className: "ml-auto shrink-0", children: l }),
    f && /* @__PURE__ */ o(
      Q,
      {
        name: v ? "ChevronDown" : "ChevronRight",
        size: h ? "3" : "4",
        className: S("shrink-0", !h && "ml-auto")
      }
    )
  ] }), T = S(ia, r ? ca : la, h && "min-w-touch justify-center gap-1 px-2", p), I = h ? { "aria-label": e } : {};
  let M;
  return f ? M = /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      "aria-expanded": v,
      "aria-controls": b,
      onClick: w,
      className: T,
      ...I,
      children: $
    }
  ) : s ? M = /* @__PURE__ */ o(
    s,
    {
      className: T,
      "aria-current": r ? "page" : void 0,
      onClick: a,
      ...I,
      ...i,
      children: $
    }
  ) : n != null ? M = /* @__PURE__ */ o(
    "a",
    {
      href: n,
      "aria-current": r ? "page" : void 0,
      onClick: a,
      className: T,
      ...I,
      children: $
    }
  ) : M = /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      "aria-current": r ? "page" : void 0,
      onClick: a,
      className: T,
      ...I,
      children: $
    }
  ), /* @__PURE__ */ k("li", { children: [
    h ? /* @__PURE__ */ o(to, { content: e, side: "right", children: M }) : M,
    f && v && /* @__PURE__ */ o("ul", { id: b, className: S("mt-1 space-y-1", !h && "ml-6"), children: c })
  ] });
}
da.displayName = "SideNavItem";
function ua({
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
  const m = ce(), [p, h] = H(i), b = s ?? p, f = n ?? t, g = (N) => {
    s === void 0 && h(N), l == null || l(N);
  };
  return /* @__PURE__ */ k(
    "header",
    {
      className: S(
        "w-full border-b border-[var(--border-hairline)] bg-[var(--surface-container)] font-mono text-sm text-[var(--text-primary)]",
        a && "sticky top-0 z-[var(--z-index-sticky)]",
        u
      ),
      children: [
        /* @__PURE__ */ k("div", { className: "flex min-h-control-lg items-center gap-4 px-4 py-1", children: [
          /* @__PURE__ */ o("div", { className: "flex shrink-0 items-center", children: e }),
          t && /* @__PURE__ */ o("nav", { "aria-label": d, className: "hidden min-w-0 flex-1 md:block", children: /* @__PURE__ */ o("div", { className: "flex flex-wrap items-center gap-4", children: t }) }),
          /* @__PURE__ */ k("div", { className: "ml-auto flex shrink-0 items-center gap-2", children: [
            r,
            f && /* @__PURE__ */ o(
              We,
              {
                variant: "ghost",
                size: "lg",
                "aria-label": c,
                "aria-expanded": b,
                "aria-controls": m,
                onClick: () => g(!b),
                className: "min-w-touch md:hidden",
                children: /* @__PURE__ */ o(Q, { name: b ? "X" : "Menu", size: "5" })
              }
            )
          ] })
        ] }),
        f && b && /* @__PURE__ */ o("div", { id: m, className: "border-t border-[var(--border-hairline)] px-4 py-3 md:hidden", children: /* @__PURE__ */ o("nav", { "aria-label": d, children: /* @__PURE__ */ o("div", { className: "flex flex-col items-start gap-1", children: f }) }) })
      ]
    }
  );
}
ua.displayName = "AppHeader";
function ma({
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
      children: /* @__PURE__ */ k("div", { className: "plate-round-lg flex min-h-0 flex-1 flex-col bg-[var(--surface-card)] font-mono", children: [
        /* @__PURE__ */ k(
          "div",
          {
            className: S(
              "flex min-h-control-sm shrink-0 items-center gap-2 border-b border-[var(--border-hairline)] px-4 py-1 text-xs",
              u && "bg-[var(--surface-muted)]"
            ),
            children: [
              u && /* @__PURE__ */ o(Q, { name: "ChevronRight", size: "3", className: "shrink-0 text-[var(--text-primary)]" }),
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
ma.displayName = "Window";
const fa = 8;
function pa({
  content: e,
  count: t,
  enabled: r = !0,
  onFollowChange: n,
  contentRef: a
}) {
  const s = X(null), [i, l] = H(!0), [c, d] = H(0), u = X(t), m = ue(
    (f) => {
      l((g) => (g !== f && (n == null || n(f)), f));
    },
    [n]
  ), p = ue(() => {
    const f = s.current;
    f && (f.scrollTop = f.scrollHeight);
  }, []);
  _e(() => {
    const f = t - u.current;
    u.current = t, r && (i ? p() : f > 0 && d((g) => g + f));
  }, [e, t, r, i, p]), _e(() => {
    const f = a == null ? void 0 : a.current;
    if (!r || !i || !f || typeof ResizeObserver > "u") return;
    const g = new ResizeObserver(() => p());
    return g.observe(f), () => g.disconnect();
  }, [a, r, i, p]);
  const h = ue(() => {
    const f = s.current;
    if (!f || !r) return;
    const g = f.scrollHeight - f.scrollTop - f.clientHeight <= fa;
    m(g), g && d(0);
  }, [r, m]), b = ue(() => {
    d(0), m(!0), p();
  }, [m, p]);
  return { scrollRef: s, onScroll: h, following: i, unseen: c, resume: b };
}
const ba = {
  info: { icon: "Info", tag: "INFO", tone: "text-info-700 dark:text-info-400" },
  warning: { icon: "AlertTriangle", tag: "WARN", tone: "text-warning-700 dark:text-warning-400" },
  error: { icon: "AlertCircle", tag: "ERROR", tone: "text-error-700 dark:text-error-400" },
  debug: { icon: "Settings", tag: "DEBUG", tone: "text-secondary-700 dark:text-secondary-400" }
};
function ha({
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
  const { scrollRef: d, onScroll: u, following: m, unseen: p, resume: h } = pa({
    content: e,
    count: e.length,
    enabled: t,
    onFollowChange: l
  }), b = e.some((g) => g.level), f = `${String(Math.max(e.length, 1)).length}ch`;
  return /* @__PURE__ */ k(
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
            children: e.length === 0 ? /* @__PURE__ */ o("p", { className: "px-3 text-[var(--text-secondary)]", children: s }) : e.map((g, N) => {
              const v = g.level ? ba[g.level] : null;
              return /* @__PURE__ */ k(
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
                        children: N + 1
                      }
                    ),
                    g.timestamp && /* @__PURE__ */ o("span", { className: "shrink-0 tabular-nums text-[var(--text-secondary)]", children: g.timestamp }),
                    v ? /* @__PURE__ */ k("span", { className: S("inline-flex w-16 shrink-0 items-center gap-1 font-bold", v.tone), children: [
                      /* @__PURE__ */ o(Q, { name: v.icon, size: "3", className: "shrink-0" }),
                      v.tag
                    ] }) : b && /* @__PURE__ */ o("span", { "aria-hidden": "true", className: "w-16 shrink-0" }),
                    /* @__PURE__ */ o("span", { className: S("min-w-0 flex-1", n ? "whitespace-pre-wrap break-words" : "whitespace-pre"), children: g.text })
                  ]
                },
                g.id
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
            iconLeft: /* @__PURE__ */ o(Q, { name: "ChevronDown", size: "4" }),
            className: "pointer-events-auto",
            children: p > 0 ? `Jump to latest (${p} new)` : "Jump to latest"
          }
        ) })
      ]
    }
  );
}
ha.displayName = "LogView";
const ga = {
  neutral: "text-[var(--text-primary)]",
  primary: "bg-[var(--button-primary-background)] text-[var(--button-primary-text)] font-bold",
  success: "bg-success-50 text-success-800 dark:bg-success-950 dark:text-success-300",
  warning: "bg-warning-50 text-warning-800 dark:bg-warning-950 dark:text-warning-300",
  error: "bg-error-50 text-error-800 dark:bg-error-950 dark:text-error-300",
  info: "bg-info-50 text-info-800 dark:bg-info-950 dark:text-info-300"
};
function xa({
  left: e,
  center: t,
  right: r,
  live: n = !1,
  "aria-label": a = "Status",
  className: s
}) {
  return /* @__PURE__ */ k(
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
xa.displayName = "StatusLine";
function va({ icon: e, tone: t = "neutral", children: r, className: n }) {
  return /* @__PURE__ */ k(
    "span",
    {
      "data-tone": t,
      className: S("inline-flex min-w-0 items-center gap-1.5 whitespace-nowrap px-3", ga[t], n),
      children: [
        e && pe(e, { size: "3", className: "shrink-0" }),
        /* @__PURE__ */ o("span", { className: "truncate", children: r })
      ]
    }
  );
}
va.displayName = "StatusLineSegment";
function ya({ items: e, layout: t = "inline", leader: r = !1, className: n }) {
  const a = t === "inline";
  return /* @__PURE__ */ o(
    "dl",
    {
      "data-layout": t,
      className: S("font-mono text-sm", a ? "space-y-1" : "space-y-3", n),
      children: e.map((s, i) => /* @__PURE__ */ k(
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
ya.displayName = "DescriptionList";
function wa({
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
const ka = {
  primary: "bg-primary-600 dark:bg-primary-400",
  neutral: "bg-secondary-600 dark:bg-secondary-400",
  info: "bg-info-600 dark:bg-info-400",
  success: "bg-success-600 dark:bg-success-400",
  warning: "bg-warning-600 dark:bg-warning-400",
  error: "bg-error-600 dark:bg-error-400"
};
function Na({
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
  const p = ce(), h = r - t || 1, b = Math.min(Math.max(e, t), r), f = (b - t) / h, g = l ?? `${Math.round(f * 100)}%`, N = c ?? wa({ value: e, min: t, max: r, low: n, high: a, optimum: s }), v = Math.max(1, Math.round(d)), w = Math.round(f * v);
  return /* @__PURE__ */ k("div", { className: S("font-mono text-sm", m), "data-tone": N, children: [
    /* @__PURE__ */ k("div", { className: "mb-1 flex items-baseline justify-between gap-3", children: [
      /* @__PURE__ */ o("span", { id: p, className: "text-[var(--text-primary)]", children: i }),
      /* @__PURE__ */ k("span", { className: "inline-flex items-center gap-1 tabular-nums text-[var(--text-secondary)]", children: [
        N === "warning" && /* @__PURE__ */ o(Q, { name: "AlertTriangle", size: "3" }),
        N === "error" && /* @__PURE__ */ o(Q, { name: "AlertCircle", size: "3" }),
        g
      ] })
    ] }),
    /* @__PURE__ */ o(
      "div",
      {
        role: "meter",
        "aria-labelledby": p,
        "aria-valuenow": b,
        "aria-valuemin": t,
        "aria-valuemax": r,
        "aria-valuetext": g,
        className: "flex gap-0.5",
        children: Array.from({ length: v }, ($, T) => /* @__PURE__ */ o(
          "span",
          {
            "data-filled": T < w || void 0,
            className: S(
              "flex-1",
              u === "sm" ? "h-2" : "h-3",
              T < w ? ka[N] : "bg-[var(--surface-muted)] ring-1 ring-inset ring-[var(--surface-container-stroke)]"
            )
          },
          T
        ))
      }
    )
  ] });
}
Na.displayName = "Meter";
function $a(e) {
  return e.textValue ? e.textValue : typeof e.label == "string" || typeof e.label == "number" ? String(e.label) : "";
}
const Sa = "plate-round flex min-h-touch cursor-pointer items-center gap-2 py-1 pr-3 font-mono text-sm pl-[calc(var(--tree-level)_*_theme(spacing.4)_+_theme(spacing.2))] transition-colors [transition-duration:var(--duration-fast)] motion-reduce:transition-none";
function Ia({
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
  var ee;
  const [p, h] = H(a), b = n ?? p, f = Le(() => new Set(b), [b]), [g, N] = H(l), v = i !== void 0 ? i : g, [w, $] = H(null), T = X(/* @__PURE__ */ new Map()), I = X(!1), M = X({ buffer: "", timer: 0 }), x = Le(() => {
    const E = [], O = (P, y, G) => {
      for (const R of P) {
        const L = Array.isArray(R.children);
        E.push({ node: R, level: y, parentId: G, isBranch: L }), L && f.has(R.id) && O(R.children, y + 1, R.id);
      }
    };
    return O(e, 1, null), E;
  }, [e, f]), C = w && x.some((E) => E.node.id === w) && w || v && x.some((E) => E.node.id === v) && v || ((ee = x[0]) == null ? void 0 : ee.node.id) || null;
  U(() => {
    var E;
    !I.current || !w || (I.current = !1, (E = T.current.get(w)) == null || E.focus());
  }, [w, x]), U(() => () => clearTimeout(M.current.timer), []);
  const F = (E) => {
    var O;
    E && (I.current = !0, $(E), E === w && ((O = T.current.get(E)) == null || O.focus()));
  }, W = ue(
    (E, O) => {
      if (f.has(E) === O) return;
      const y = O ? [...b, E] : b.filter((G) => G !== E);
      n === void 0 && h(y), s == null || s(y);
    },
    [f, b, n, s]
  ), te = (E) => {
    E.node.disabled || v !== E.node.id && (i === void 0 && N(E.node.id), c == null || c(E.node.id));
  }, ne = (E, O) => {
    const P = M.current;
    clearTimeout(P.timer), P.buffer += E.toLowerCase(), P.timer = setTimeout(() => {
      P.buffer = "";
    }, 500);
    const y = x.length, G = P.buffer.length === 1 ? O + 1 : O;
    for (let R = 0; R < y; R++) {
      const L = x[(G + R) % y];
      if ($a(L.node).toLowerCase().startsWith(P.buffer)) {
        F(L.node.id);
        return;
      }
    }
  }, B = (E, O) => {
    var G, R, L, q, Y;
    if (E.target !== E.currentTarget) return;
    const P = x.findIndex((V) => V.node.id === O.node.id), y = f.has(O.node.id);
    switch (E.key) {
      case "ArrowDown":
        E.preventDefault(), F((G = x[P + 1]) == null ? void 0 : G.node.id);
        break;
      case "ArrowUp":
        E.preventDefault(), F((R = x[P - 1]) == null ? void 0 : R.node.id);
        break;
      case "ArrowRight":
        if (E.preventDefault(), !O.isBranch) break;
        y ? ((L = x[P + 1]) == null ? void 0 : L.parentId) === O.node.id && F(x[P + 1].node.id) : W(O.node.id, !0);
        break;
      case "ArrowLeft":
        E.preventDefault(), O.isBranch && y ? W(O.node.id, !1) : O.parentId && F(O.parentId);
        break;
      case "Home":
        E.preventDefault(), F((q = x[0]) == null ? void 0 : q.node.id);
        break;
      case "End":
        E.preventDefault(), F((Y = x[x.length - 1]) == null ? void 0 : Y.node.id);
        break;
      case "Enter":
        E.preventDefault(), te(O), O.node.disabled || d == null || d(O.node.id);
        break;
      case " ":
        E.preventDefault(), te(O);
        break;
      default:
        u && E.key.length === 1 && !E.ctrlKey && !E.metaKey && !E.altKey && /\S/.test(E.key) && (E.preventDefault(), ne(E.key, P));
    }
  }, Z = (E, O, P) => E.map((y, G) => {
    const R = Array.isArray(y.children), L = R && f.has(y.id), q = v === y.id, Y = { node: y, parentId: P, isBranch: R };
    return /* @__PURE__ */ k(
      "li",
      {
        ref: (V) => {
          V ? T.current.set(y.id, V) : T.current.delete(y.id);
        },
        role: "treeitem",
        "aria-level": O,
        "aria-setsize": E.length,
        "aria-posinset": G + 1,
        "aria-expanded": R ? L : void 0,
        "aria-selected": q,
        "aria-disabled": y.disabled || void 0,
        tabIndex: C === y.id ? 0 : -1,
        onKeyDown: (V) => B(V, Y),
        onFocus: (V) => {
          V.target === V.currentTarget && $(y.id);
        },
        className: "focus:outline-none [&:focus-visible>div]:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]",
        children: [
          /* @__PURE__ */ k(
            "div",
            {
              style: { "--tree-level": O - 1 },
              onClick: (V) => {
                V.stopPropagation(), F(y.id), te(Y), R && W(y.id, !L), !y.disabled && !R && (d == null || d(y.id));
              },
              className: S(
                Sa,
                q ? "bg-[var(--surface-muted)] text-[var(--accent)]" : "text-[var(--text-primary)] hover:bg-[var(--surface-muted)]",
                y.disabled && "cursor-not-allowed opacity-50"
              ),
              children: [
                /* @__PURE__ */ o("span", { className: "inline-flex w-4 shrink-0 justify-center text-[var(--text-secondary)]", children: R && /* @__PURE__ */ o(Q, { name: L ? "ChevronDown" : "ChevronRight", size: "3" }) }),
                y.icon && pe(y.icon, { className: "shrink-0" }),
                /* @__PURE__ */ o("span", { className: "min-w-0 truncate", children: y.label })
              ]
            }
          ),
          R && L && y.children.length > 0 && /* @__PURE__ */ o("ul", { role: "group", children: Z(y.children, O + 1, y.id) })
        ]
      },
      y.id
    );
  });
  return /* @__PURE__ */ o(
    "ul",
    {
      role: "tree",
      "aria-label": t,
      "aria-labelledby": r,
      className: S("font-mono text-sm", m),
      children: Z(e, 1, null)
    }
  );
}
Ia.displayName = "TreeView";
const Ta = {
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
            Ta[e]
          ),
          children: t
        }
      )
    }
  );
}
function Ca({ keys: e, children: t, size: r = "sm", separator: n = "+", className: a }) {
  return !e || e.length <= 1 ? /* @__PURE__ */ o(Gt, { size: r, className: a, children: (e == null ? void 0 : e[0]) ?? t }) : /* @__PURE__ */ o("kbd", { className: S("inline-flex items-center gap-1 align-middle font-mono", a), children: e.map((s, i) => /* @__PURE__ */ k(xt, { children: [
    i > 0 && /* @__PURE__ */ o("span", { className: S("text-[var(--text-secondary)]", r === "sm" ? "text-xs" : "text-sm"), children: n }),
    /* @__PURE__ */ o(Gt, { size: r, children: s })
  ] }, `${s}-${i}`)) });
}
Ca.displayName = "Kbd";
const Ea = {
  none: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8"
}, _a = re(function({ children: t, gap: r = "4", className: n, axis: a = "vertical", ...s }, i) {
  return /* @__PURE__ */ o(
    "div",
    {
      ref: i,
      className: S(
        "flex",
        a === "vertical" ? "flex-col" : "flex-row flex-wrap items-center",
        Ea[r],
        n
      ),
      ...s,
      children: t
    }
  );
});
_a.displayName = "Stack";
const Aa = {
  none: "p-0",
  1: "p-1",
  2: "p-2",
  3: "p-3",
  4: "p-4",
  5: "p-5",
  6: "p-6",
  8: "p-8"
}, za = {
  none: "px-0",
  1: "px-1",
  2: "px-2",
  3: "px-3",
  4: "px-4",
  5: "px-5",
  6: "px-6",
  8: "px-8"
}, Ma = {
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
}, Ra = re(function({
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
  const m = l, p = n !== void 0 || a !== void 0, h = n ?? r, b = a ?? r, f = p ? S(
    h !== void 0 && za[h],
    b !== void 0 && Ma[b]
  ) : S(r !== void 0 && Aa[r]);
  if (i === "none")
    return /* @__PURE__ */ o(m, { ref: u, className: S(ct[s], f, c), ...d, children: t });
  const g = s === "none" ? ct.card : ct[s];
  return /* @__PURE__ */ o(
    m,
    {
      ref: u,
      className: S("plate-round bg-[var(--surface-container-stroke)] p-px", c),
      ...d,
      children: /* @__PURE__ */ o("div", { className: S("plate-round h-full w-full", g, f), children: t })
    }
  );
});
Ra.displayName = "Box";
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
  start: "items-start",
  center: "items-center",
  end: "items-end",
  baseline: "items-baseline"
}, Pa = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between"
}, Da = re(function({ children: t, gap: r = "2", align: n = "center", justify: a = "start", wrap: s = !0, className: i, ...l }, c) {
  return /* @__PURE__ */ o(
    "div",
    {
      ref: c,
      className: S(
        "flex flex-row",
        s ? "flex-wrap" : "flex-nowrap",
        La[r],
        Oa[n],
        Pa[a],
        i
      ),
      ...l,
      children: t
    }
  );
});
Da.displayName = "Inline";
const ja = {
  none: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8"
}, Ba = {
  none: "gap-y-0",
  1: "gap-y-1",
  2: "gap-y-2",
  3: "gap-y-3",
  4: "gap-y-4",
  5: "gap-y-5",
  6: "gap-y-6",
  8: "gap-y-8"
}, Fa = {
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
}, Va = ["base", "sm", "md", "lg", "xl"], Ha = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch"
};
function Ga(e) {
  return typeof e == "number" ? [Ut.base[e]] : Va.flatMap((t) => {
    const r = e[t];
    return r === void 0 ? [] : [Ut[t][r]];
  });
}
const Ua = re(function({ children: t, columns: r = 1, gap: n = "4", rowGap: a, columnGap: s, align: i = "stretch", className: l, ...c }, d) {
  return /* @__PURE__ */ o(
    "div",
    {
      ref: d,
      className: S(
        "grid",
        Ga(r),
        ja[n],
        a !== void 0 && Ba[a],
        s !== void 0 && Fa[s],
        Ha[i],
        l
      ),
      ...c,
      children: t
    }
  );
});
Ua.displayName = "Grid";
const Wa = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  full: "max-w-full"
}, Ka = re(function({ children: t, size: r = "lg", gutter: n = !0, as: a = "div", className: s, ...i }, l) {
  return /* @__PURE__ */ o(
    a,
    {
      ref: l,
      className: S("mx-auto w-full", Wa[r], n && "px-5 lg:px-10", s),
      ...i,
      children: t
    }
  );
});
Ka.displayName = "Container";
const qa = {
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  none: "max-w-none"
}, Xa = re(function({ children: t, maxWidth: r = "md", andText: n = !1, fullHeight: a = !1, as: s = "div", className: i, ...l }, c) {
  return /* @__PURE__ */ o(
    s,
    {
      ref: c,
      className: S(
        "mx-auto w-full",
        qa[r],
        n && "text-center",
        a && "flex min-h-screen flex-col justify-center",
        i
      ),
      ...l,
      children: t
    }
  );
});
Xa.displayName = "Center";
const Ya = re(function({ children: t, focusable: r = !1, as: n = "span", className: a, ...s }, i) {
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
Ya.displayName = "VisuallyHidden";
function gs({ children: e, ...t }) {
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
  fs as Accordion,
  hs as AccordionContent,
  ps as AccordionItem,
  bs as AccordionTrigger,
  os as Alert,
  ua as AppHeader,
  Xn as Avatar,
  ns as Badge,
  ds as BottomSheet,
  Ra as Box,
  ra as Breadcrumbs,
  We as Button,
  rs as Card,
  ho as CaseStudyContent,
  go as CaseStudyHeader,
  is as CaseStudyPage,
  vo as CaseStudySections,
  Xa as Center,
  no as Checkbox,
  Ko as Combobox,
  Ka as Container,
  ya as DescriptionList,
  as as Divider,
  ss as Dropdown,
  ea as EmptyState,
  Ua as Grid,
  Da as Inline,
  Vn as Input,
  Ca as Kbd,
  ft as Link,
  yo as ListRow,
  ha as LogView,
  Na as Meter,
  ts as Modal,
  aa as Pagination,
  $r as Popover,
  Qo as ProgressBar,
  so as Radio,
  ro as Select,
  sa as SideNav,
  da as SideNavItem,
  _r as SideNavSection,
  wr as Skeleton,
  ao as Slider,
  dr as Spinner,
  _a as Stack,
  xa as StatusLine,
  va as StatusLineSegment,
  fr as Switch,
  Pn as TUI_ICON_GLYPHS,
  Ro as Table,
  Oo as TableBody,
  ht as TableCell,
  Po as TableFooter,
  Do as TableHead,
  Lo as TableHeader,
  bt as TableRow,
  ms as Tabs,
  _o as TabsContent,
  Co as TabsList,
  Eo as TabsTrigger,
  io as Textarea,
  gs as ThemeProvider,
  us as ThemeToggle,
  No as Toast,
  cs as Toaster,
  to as Tooltip,
  Ia as TreeView,
  Q as TuiIcon,
  Ya as VisuallyHidden,
  ma as Window,
  S as cn,
  wa as getMeterTone,
  na as getPaginationRange,
  Io as toast,
  ls as useToast
};
//# sourceMappingURL=index.esm.js.map

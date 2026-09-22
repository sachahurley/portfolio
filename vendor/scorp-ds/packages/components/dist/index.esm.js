import { jsxs as N, jsx as o, Fragment as pe } from "react/jsx-runtime";
import Ne, { useState as V, useEffect as G, forwardRef as oe, useId as ce, useRef as Z, useCallback as Se, useLayoutEffect as Oe, isValidElement as je, cloneElement as dt, useImperativeHandle as Nr, Fragment as ut, Children as Sr, useSyncExternalStore as Dt, createContext as Be, useContext as _e, useMemo as De } from "react";
import { useTheme as $r, ThemeProvider as zr } from "next-themes";
import { createPortal as Ir } from "react-dom";
const _r = { small: "sm", medium: "md", large: "lg" }, wt = /* @__PURE__ */ new Set();
function se(e, t, r = "md") {
  if (e == null) return r;
  const n = _r[e];
  return n ? (!(process.env.NODE_ENV === "production") && !wt.has(t) && (wt.add(t), console.warn(
    `[@scorp-ds/components] ${t}: size="${e}" is deprecated. Use size="${n}" (the scale is sm | md | lg).`
  )), n) : e;
}
function Ot(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var a = e.length;
    for (t = 0; t < a; t++) e[t] && (r = Ot(e[t])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function Er() {
  for (var e, t, r = 0, n = "", a = arguments.length; r < a; r++) (e = arguments[r]) && (t = Ot(e)) && (n && (n += " "), n += t);
  return n;
}
const Tr = (e, t) => {
  const r = new Array(e.length + t.length);
  for (let n = 0; n < e.length; n++)
    r[n] = e[n];
  for (let n = 0; n < t.length; n++)
    r[e.length + n] = t[n];
  return r;
}, Ar = (e, t) => ({
  classGroupId: e,
  validator: t
}), jt = (e = /* @__PURE__ */ new Map(), t = null, r) => ({
  nextPart: e,
  validators: t,
  classGroupId: r
}), qe = "-", kt = [], Cr = "arbitrary..", Mr = (e) => {
  const t = Lr(e), {
    conflictingClassGroups: r,
    conflictingClassGroupModifiers: n
  } = e;
  return {
    getClassGroupId: (i) => {
      if (i.startsWith("[") && i.endsWith("]"))
        return Rr(i);
      const l = i.split(qe), c = l[0] === "" && l.length > 1 ? 1 : 0;
      return Bt(l, c, t);
    },
    getConflictingClassGroupIds: (i, l) => {
      if (l) {
        const c = n[i], d = r[i];
        return c ? d ? Tr(d, c) : c : d || kt;
      }
      return r[i] || kt;
    }
  };
}, Bt = (e, t, r) => {
  if (e.length - t === 0)
    return r.classGroupId;
  const a = e[t], s = r.nextPart.get(a);
  if (s) {
    const d = Bt(e, t + 1, s);
    if (d) return d;
  }
  const i = r.validators;
  if (i === null)
    return;
  const l = t === 0 ? e.join(qe) : e.slice(t).join(qe), c = i.length;
  for (let d = 0; d < c; d++) {
    const u = i[d];
    if (u.validator(l))
      return u.classGroupId;
  }
}, Rr = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const t = e.slice(1, -1), r = t.indexOf(":"), n = t.slice(0, r);
  return n ? Cr + n : void 0;
})(), Lr = (e) => {
  const {
    theme: t,
    classGroups: r
  } = e;
  return Pr(r, t);
}, Pr = (e, t) => {
  const r = jt();
  for (const n in e) {
    const a = e[n];
    ft(a, r, n, t);
  }
  return r;
}, ft = (e, t, r, n) => {
  const a = e.length;
  for (let s = 0; s < a; s++) {
    const i = e[s];
    Dr(i, t, r, n);
  }
}, Dr = (e, t, r, n) => {
  if (typeof e == "string") {
    Or(e, t, r);
    return;
  }
  if (typeof e == "function") {
    jr(e, t, r, n);
    return;
  }
  Br(e, t, r, n);
}, Or = (e, t, r) => {
  const n = e === "" ? t : Ft(t, e);
  n.classGroupId = r;
}, jr = (e, t, r, n) => {
  if (Fr(e)) {
    ft(e(n), t, r, n);
    return;
  }
  t.validators === null && (t.validators = []), t.validators.push(Ar(r, e));
}, Br = (e, t, r, n) => {
  const a = Object.entries(e), s = a.length;
  for (let i = 0; i < s; i++) {
    const [l, c] = a[i];
    ft(c, Ft(t, l), r, n);
  }
}, Ft = (e, t) => {
  let r = e;
  const n = t.split(qe), a = n.length;
  for (let s = 0; s < a; s++) {
    const i = n[s];
    let l = r.nextPart.get(i);
    l || (l = jt(), r.nextPart.set(i, l)), r = l;
  }
  return r;
}, Fr = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, Vr = (e) => {
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
}, at = "!", Nt = ":", Gr = [], St = (e, t, r, n, a) => ({
  modifiers: e,
  hasImportantModifier: t,
  baseClassName: r,
  maybePostfixModifierPosition: n,
  isExternal: a
}), Ur = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: r
  } = e;
  let n = (a) => {
    const s = [];
    let i = 0, l = 0, c = 0, d;
    const u = a.length;
    for (let g = 0; g < u; g++) {
      const y = a[g];
      if (i === 0 && l === 0) {
        if (y === Nt) {
          s.push(a.slice(c, g)), c = g + 1;
          continue;
        }
        if (y === "/") {
          d = g;
          continue;
        }
      }
      y === "[" ? i++ : y === "]" ? i-- : y === "(" ? l++ : y === ")" && l--;
    }
    const f = s.length === 0 ? a : a.slice(c);
    let p = f, b = !1;
    f.endsWith(at) ? (p = f.slice(0, -1), b = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      f.startsWith(at) && (p = f.slice(1), b = !0)
    );
    const m = d && d > c ? d - c : void 0;
    return St(s, b, p, m);
  };
  if (t) {
    const a = t + Nt, s = n;
    n = (i) => i.startsWith(a) ? s(i.slice(a.length)) : St(Gr, !1, i, void 0, !0);
  }
  if (r) {
    const a = n;
    n = (s) => r({
      className: s,
      parseClassName: a
    });
  }
  return n;
}, Hr = (e) => {
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
}, Wr = (e) => ({
  cache: Vr(e.cacheSize),
  parseClassName: Ur(e),
  sortModifiers: Hr(e),
  ...Mr(e)
}), Kr = /\s+/, qr = (e, t) => {
  const {
    parseClassName: r,
    getClassGroupId: n,
    getConflictingClassGroupIds: a,
    sortModifiers: s
  } = t, i = [], l = e.trim().split(Kr);
  let c = "";
  for (let d = l.length - 1; d >= 0; d -= 1) {
    const u = l[d], {
      isExternal: f,
      modifiers: p,
      hasImportantModifier: b,
      baseClassName: m,
      maybePostfixModifierPosition: g
    } = r(u);
    if (f) {
      c = u + (c.length > 0 ? " " + c : c);
      continue;
    }
    let y = !!g, S = n(y ? m.substring(0, g) : m);
    if (!S) {
      if (!y) {
        c = u + (c.length > 0 ? " " + c : c);
        continue;
      }
      if (S = n(m), !S) {
        c = u + (c.length > 0 ? " " + c : c);
        continue;
      }
      y = !1;
    }
    const h = p.length === 0 ? "" : p.length === 1 ? p[0] : s(p).join(":"), z = b ? h + at : h, k = z + S;
    if (i.indexOf(k) > -1)
      continue;
    i.push(k);
    const x = a(S, y);
    for (let $ = 0; $ < x.length; ++$) {
      const I = x[$];
      i.push(z + I);
    }
    c = u + (c.length > 0 ? " " + c : c);
  }
  return c;
}, Xr = (...e) => {
  let t = 0, r, n, a = "";
  for (; t < e.length; )
    (r = e[t++]) && (n = Vt(r)) && (a && (a += " "), a += n);
  return a;
}, Vt = (e) => {
  if (typeof e == "string")
    return e;
  let t, r = "";
  for (let n = 0; n < e.length; n++)
    e[n] && (t = Vt(e[n])) && (r && (r += " "), r += t);
  return r;
}, Yr = (e, ...t) => {
  let r, n, a, s;
  const i = (c) => {
    const d = t.reduce((u, f) => f(u), e());
    return r = Wr(d), n = r.cache.get, a = r.cache.set, s = l, l(c);
  }, l = (c) => {
    const d = n(c);
    if (d)
      return d;
    const u = qr(c, r);
    return a(c, u), u;
  };
  return s = i, (...c) => s(Xr(...c));
}, Zr = [], ae = (e) => {
  const t = (r) => r[e] || Zr;
  return t.isThemeGetter = !0, t;
}, Gt = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Ut = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Jr = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, Qr = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, en = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, tn = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, rn = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, nn = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, we = (e) => Jr.test(e), F = (e) => !!e && !Number.isNaN(Number(e)), ke = (e) => !!e && Number.isInteger(Number(e)), Je = (e) => e.endsWith("%") && F(e.slice(0, -1)), ye = (e) => Qr.test(e), Ht = () => !0, on = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  en.test(e) && !tn.test(e)
), mt = () => !1, an = (e) => rn.test(e), sn = (e) => nn.test(e), ln = (e) => !M(e) && !R(e), cn = (e) => $e(e, qt, mt), M = (e) => Gt.test(e), Ie = (e) => $e(e, Xt, on), $t = (e) => $e(e, gn, F), dn = (e) => $e(e, Zt, Ht), un = (e) => $e(e, Yt, mt), zt = (e) => $e(e, Wt, mt), fn = (e) => $e(e, Kt, sn), Ge = (e) => $e(e, Jt, an), R = (e) => Ut.test(e), Re = (e) => Ee(e, Xt), mn = (e) => Ee(e, Yt), It = (e) => Ee(e, Wt), pn = (e) => Ee(e, qt), bn = (e) => Ee(e, Kt), Ue = (e) => Ee(e, Jt, !0), hn = (e) => Ee(e, Zt, !0), $e = (e, t, r) => {
  const n = Gt.exec(e);
  return n ? n[1] ? t(n[1]) : r(n[2]) : !1;
}, Ee = (e, t, r = !1) => {
  const n = Ut.exec(e);
  return n ? n[1] ? t(n[1]) : r : !1;
}, Wt = (e) => e === "position" || e === "percentage", Kt = (e) => e === "image" || e === "url", qt = (e) => e === "length" || e === "size" || e === "bg-size", Xt = (e) => e === "length", gn = (e) => e === "number", Yt = (e) => e === "family-name", Zt = (e) => e === "number" || e === "weight", Jt = (e) => e === "shadow", xn = () => {
  const e = ae("color"), t = ae("font"), r = ae("text"), n = ae("font-weight"), a = ae("tracking"), s = ae("leading"), i = ae("breakpoint"), l = ae("container"), c = ae("spacing"), d = ae("radius"), u = ae("shadow"), f = ae("inset-shadow"), p = ae("text-shadow"), b = ae("drop-shadow"), m = ae("blur"), g = ae("perspective"), y = ae("aspect"), S = ae("ease"), h = ae("animate"), z = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], k = () => [
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
  ], x = () => [...k(), R, M], $ = () => ["auto", "hidden", "clip", "visible", "scroll"], I = () => ["auto", "contain", "none"], v = () => [R, M, c], O = () => [we, "full", "auto", ...v()], C = () => [ke, "none", "subgrid", R, M], te = () => ["auto", {
    span: ["full", ke, R, M]
  }, ke, R, M], J = () => [ke, "auto", R, M], ne = () => ["auto", "min", "max", "fr", R, M], W = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], K = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], L = () => ["auto", ...v()], T = () => [we, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...v()], P = () => [we, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...v()], U = () => [we, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...v()], w = () => [e, R, M], H = () => [...k(), It, zt, {
    position: [R, M]
  }], _ = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], D = () => ["auto", "cover", "contain", pn, cn, {
    size: [R, M]
  }], X = () => [Je, Re, Ie], Y = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    d,
    R,
    M
  ], ee = () => ["", F, Re, Ie], ue = () => ["solid", "dashed", "dotted", "double"], ie = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], Q = () => [F, Je, It, zt], me = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    m,
    R,
    M
  ], ge = () => ["none", F, R, M], xe = () => ["none", F, R, M], B = () => [F, R, M], j = () => [we, "full", ...v()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [ye],
      breakpoint: [ye],
      color: [Ht],
      container: [ye],
      "drop-shadow": [ye],
      ease: ["in", "out", "in-out"],
      font: [ln],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [ye],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [ye],
      shadow: [ye],
      spacing: ["px", F],
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
        aspect: ["auto", "square", we, M, R, y]
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
        object: x()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: $()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": $()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": $()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: I()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": I()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": I()
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
        z: [ke, "auto", R, M]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [we, "full", "auto", l, ...v()]
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
        flex: [F, we, "auto", "initial", "none", M]
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
        order: [ke, "first", "last", "none", R, M]
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
        size: T()
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
        w: [l, "screen", ...T()]
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
          ...T()
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
          ...T()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...T()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...T()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...T()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", r, Re, Ie]
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
        font: [n, hn, dn]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", Je, M]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [mn, un, t]
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
        "line-clamp": [F, "none", R, $t]
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
        decoration: [F, "from-font", "auto", R, Ie]
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
        bg: H()
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
          }, ke, R, M],
          radial: ["", R, M],
          conic: [ke, R, M]
        }, bn, fn]
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
        outline: ["", F, Re, Ie]
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
          Ue,
          Ge
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
        "inset-shadow": ["none", f, Ue, Ge]
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
        "ring-offset": [F, Ie]
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
        "text-shadow": ["none", p, Ue, Ge]
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
        "mask-linear-from": Q()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": Q()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": w()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": w()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": Q()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": Q()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": w()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": w()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": Q()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": Q()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": w()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": w()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": Q()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": Q()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": w()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": w()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": Q()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": Q()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": w()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": w()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": Q()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": Q()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": w()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": w()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": Q()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": Q()
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
        "mask-radial-from": Q()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": Q()
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
        "mask-conic-from": Q()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": Q()
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
        mask: H()
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
        blur: me()
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
          b,
          Ue,
          Ge
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
        "backdrop-blur": me()
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
        ease: ["linear", "initial", S, R, M]
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
        animate: ["none", h, R, M]
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
        perspective: [g, R, M]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": x()
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
        origin: x()
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
        stroke: [F, Re, Ie, $t]
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
}, vn = /* @__PURE__ */ Yr(xn);
function E(...e) {
  return vn(Er(e));
}
const Pe = [
  [0, 0],
  [3, 0],
  [6, 0],
  [6, 3],
  [6, 6],
  [3, 6],
  [0, 6],
  [0, 3]
], yn = 2, wn = 100, _t = "(prefers-reduced-motion: reduce)";
function Qt(e) {
  return Pe.filter((t, r) => e === null || (r - e + Pe.length) % Pe.length >= yn).map(([t, r]) => `M${t} ${r}h2v2h-2Z`).join("");
}
const kn = Pe.map((e, t) => Qt(t)), Nn = Qt(null);
function Sn() {
  const [e, t] = V(
    () => typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia(_t).matches
  );
  return G(() => {
    var a;
    if (typeof window > "u" || typeof window.matchMedia != "function") return;
    const r = window.matchMedia(_t), n = () => t(r.matches);
    return n(), (a = r.addEventListener) == null || a.call(r, "change", n), () => {
      var s;
      return (s = r.removeEventListener) == null ? void 0 : s.call(r, "change", n);
    };
  }, []), e;
}
function er({ size: e = "md", label: t = "Loading", className: r }) {
  const n = se(e, "Spinner"), a = Sn(), [s, i] = V(0);
  G(() => {
    if (a) return;
    const u = setInterval(() => i((f) => (f + 1) % Pe.length), wn);
    return () => clearInterval(u);
  }, [a]);
  const l = {
    sm: { box: "w-3 h-3", pixel: 1.5 },
    md: { box: "w-4 h-4", pixel: 2 },
    lg: { box: "w-6 h-6", pixel: 3 }
  }, { box: c, pixel: d } = l[n];
  return /* @__PURE__ */ N("span", { role: "status", className: E("inline-flex shrink-0 items-center justify-center", c, r), children: [
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
        children: /* @__PURE__ */ o("path", { d: a ? Nn : kn[s] })
      }
    ),
    /* @__PURE__ */ o("span", { className: "sr-only", children: t })
  ] });
}
er.displayName = "Spinner";
const Fe = oe(
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
    onClick: f,
    "aria-label": p,
    "aria-labelledby": b,
    ...m
  }, g) => {
    const y = se(t, "Button", "md"), S = `
      inline-flex items-center justify-center
      font-mono text-sm
      transition-colors [transition-duration:var(--duration-fast)]
      cursor-pointer
      disabled:cursor-not-allowed disabled:opacity-50
      focus:outline-none
      focus-visible:![box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--btn-ring)]
    `, h = () => e === "icon" ? !0 : !a || typeof a == "string" || typeof a == "number" ? !1 : typeof a == "object" && a !== null && "type" in a ? typeof a.type < "u" : Array.isArray(a) ? a.every(
      (L) => typeof L == "object" && L !== null && "type" in L
    ) : !1;
    G(() => {
      if (process.env.NODE_ENV === "production" || !(e === "icon" || h())) return;
      p != null && String(p).trim() !== "" || b != null && String(b).trim() !== "" || console.warn(
        "[@scorp-ds/components] Button: icon-only buttons should include aria-label or aria-labelledby for screen readers."
      );
    }, [e, y, a, s, i, p, b]), G(() => {
      process.env.NODE_ENV === "production" || y !== "icon" || console.warn(
        '[@scorp-ds/components] Button: size="icon" is deprecated. Icon-only buttons are squared automatically; use size="md".'
      );
    }, [y]);
    const z = () => {
      if (h() || e === "icon")
        switch (y) {
          case "sm":
            return "size-control-sm plate-round";
          case "lg":
            return "size-control-lg plate-round";
          case "icon":
            return "size-control-md plate-round";
          default:
            return "size-control-md plate-round";
        }
      switch (y) {
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
    }, x = {
      sm: "w-4 h-4",
      // 16px
      md: "w-5 h-5",
      // 20px
      lg: "w-6 h-6",
      // 24px
      icon: "w-5 h-5"
      // 20px
    }, $ = {
      sm: "gap-1.5",
      // 6px - tighter for visual balance in compact buttons
      md: "gap-2",
      // 8px - standard spacing
      lg: "gap-2.5",
      // 10px - more breathing room for larger buttons
      icon: "gap-0"
      // No gap for icon-only
    }, I = (L) => L ? typeof L == "object" && L !== null && "type" in L ? /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center shrink-0 ${x[y]}`, children: L }) : L : null, v = () => {
      if (h() && a) {
        const T = y === "icon" ? "md" : y;
        return typeof a == "object" && a !== null && "type" in a ? /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center shrink-0 ${x[T]}`, children: a }) : /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center shrink-0 ${x[T]}`, children: a });
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
      f == null || f(L);
    }, J = y === "icon" ? "md" : y, ne = C ? "relative cursor-progress" : "", W = /* @__PURE__ */ N(pe, { children: [
      s && I(s),
      v(),
      i && I(i)
    ] }), K = C ? /* @__PURE__ */ N(pe, { children: [
      /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center opacity-0 ${$[y]}`, children: W }),
      /* @__PURE__ */ o("span", { "aria-hidden": "true", className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ o(er, { size: J }) })
    ] }) : W;
    return l ? /* @__PURE__ */ o(
      "a",
      {
        ref: g,
        href: r ? void 0 : l,
        target: c,
        rel: d,
        "aria-disabled": r || C || void 0,
        "aria-busy": C || void 0,
        className: `${S} ${z()} ${k[e]} ${$[y]} ${ne} no-underline ${r ? "pointer-events-none opacity-50" : ""} ${n}`,
        style: O,
        "aria-label": p,
        "aria-labelledby": b,
        onClick: te,
        ...m,
        children: K
      }
    ) : /* @__PURE__ */ o(
      "button",
      {
        ref: g,
        disabled: r,
        className: `${S} ${z()} ${k[e]} ${$[y]} ${ne} ${n}`,
        style: O,
        "aria-label": p,
        "aria-labelledby": b,
        "aria-disabled": C || void 0,
        "aria-busy": C || void 0,
        onClick: te,
        ...m,
        children: K
      }
    );
  }
);
Fe.displayName = "Button";
const da = {
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
}, $n = {
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
function zn(e) {
  let t = "";
  return e.forEach((r, n) => {
    for (const a of r.matchAll(/#+/g))
      t += `M${a.index} ${n}h${a[0].length}v1h-${a[0].length}Z`;
  }), t;
}
const In = Object.fromEntries(
  Object.entries($n).map(([e, t]) => [e, zn(t)])
), Et = {
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
  const n = In[e], { box: a, pixel: s } = Et[t] ?? Et[4];
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
}, Tt = (e) => e != null && e !== !1 && e !== "";
function Ce({ error: e, helperText: t, errorMessage: r, describedBy: n }) {
  const a = ce(), s = Tt(r), i = !s && Tt(t), l = s || i ? `${a}-message` : void 0;
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
function Me({
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
        t === "error" && /* @__PURE__ */ o("span", { className: "flex h-[1lh] shrink-0 items-center", children: /* @__PURE__ */ o(q, { name: "AlertCircle", size: "3" }) }),
        /* @__PURE__ */ o("span", { children: r })
      ]
    }
  );
}
const _n = oe(
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
  }, f) => {
    const p = se(e, "Input"), b = Ce({ error: r, helperText: n, errorMessage: a, describedBy: d }), m = b.invalid, g = ce(), y = c ?? (l != null && l !== "" ? g : void 0), S = `
      w-full
      font-mono text-sm
      transition-colors [transition-duration:var(--duration-fast)]
      placeholder:text-[var(--field-placeholder)]
      disabled:cursor-not-allowed
      focus:outline-none
    `, h = m ? "focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-error)]" : "focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]", z = {
      sm: "h-control-sm px-3 py-1.5 plate-round",
      md: "h-control-md px-4 py-2.5 plate-round",
      lg: "h-control-lg px-5 py-3.5 plate-round"
    }, k = m ? "bg-[var(--field-background-error)] text-[var(--text-primary)]" : "bg-[var(--field-background)] text-[var(--text-primary)]", x = m ? "bg-[var(--field-border-error)]" : "bg-[var(--field-border)] hover:bg-[var(--field-border-hover)] focus-within:!bg-[var(--field-border-focus)]", $ = m ? "border-b border-[var(--field-border-error)] focus-visible:[box-shadow:inset_0_calc(-1*var(--focus-ring-width))_0_0_var(--focus-ring-error)]" : "border-b border-[var(--field-border)] hover:border-[var(--field-border-hover)] focus:!border-[var(--field-border-focus)] focus-visible:[box-shadow:inset_0_calc(-1*var(--focus-ring-width))_0_0_var(--focus-ring-primary)]", I = t === "quiet" ? /* @__PURE__ */ o(
      "input",
      {
        ref: f,
        id: y,
        disabled: s,
        "aria-invalid": m || void 0,
        "aria-describedby": b.describedBy,
        className: `${S} ${z[p].replace("plate-round", "rounded-none")} !px-0 bg-transparent text-[var(--text-primary)] disabled:opacity-50 ${$} ${i}`,
        ...u
      }
    ) : (
      // DISABLED: the opacity lives on the ring wrapper so the border dims
      // with the fill; applying it to the input alone left a full-strength ring.
      /* @__PURE__ */ o(
        "div",
        {
          className: `w-full plate-round p-px transition-colors [transition-duration:var(--duration-fast)] ${x} ${s ? "opacity-50" : ""}`,
          children: /* @__PURE__ */ o(
            "input",
            {
              ref: f,
              id: y,
              disabled: s,
              "aria-invalid": m || void 0,
              "aria-describedby": b.describedBy,
              className: `${S} ${h} ${z[p]} ${k} ${i}`,
              ...u
            }
          )
        }
      )
    ), v = l != null && l !== "";
    return !v && !b.hasMessage ? I : /* @__PURE__ */ N("div", { className: "w-full space-y-1", children: [
      v && /* @__PURE__ */ o(
        "label",
        {
          htmlFor: y,
          className: "block font-mono text-sm text-secondary-800 dark:text-secondary-200",
          children: l
        }
      ),
      I,
      /* @__PURE__ */ o(Me, { ...b.message })
    ] });
  }
);
_n.displayName = "Input";
const En = [
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
function Tn(e) {
  return Array.from(e.querySelectorAll(En)).filter(
    (t) => !t.hasAttribute("hidden") && t.closest("[hidden]") == null && t.getAttribute("aria-hidden") !== "true"
  );
}
function tr(e, t) {
  G(() => {
    if (!t) return;
    const r = (n) => {
      if (n.key !== "Tab" || n.defaultPrevented) return;
      const a = e.current;
      if (!a) return;
      const s = Tn(a), i = document.activeElement;
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
function ua({ isOpen: e, onClose: t, title: r, children: n, footerContent: a, width: s = 740, docked: i = !1 }) {
  const l = Z(null), c = Z(null), [d, u] = V(e);
  G(() => {
    e && u(!0);
  }, [e]);
  const f = d && !e, [p, b] = V(
    () => typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(min-width: 960px)").matches
  );
  G(() => {
    if (typeof window.matchMedia != "function") return;
    const S = window.matchMedia("(min-width: 960px)"), h = () => b(S.matches);
    return S.addEventListener("change", h), () => S.removeEventListener("change", h);
  }, []);
  const m = i && p, g = e && d;
  if (G(() => {
    var S;
    if (g)
      return c.current = document.activeElement, (S = l.current) == null || S.focus(), () => {
        var h;
        (h = c.current) == null || h.focus(), c.current = null;
      };
  }, [g]), tr(l, g && !m), G(() => {
    const S = (h) => {
      h.key === "Escape" && t();
    };
    return e && document.addEventListener("keydown", S), () => {
      document.removeEventListener("keydown", S);
    };
  }, [e, t]), G(() => (e && !m ? document.body.style.overflow = "hidden" : document.body.style.overflow = "unset", () => {
    document.body.style.overflow = "unset";
  }), [e, m]), !d) return null;
  const y = /* @__PURE__ */ o(
    "div",
    {
      ref: l,
      tabIndex: -1,
      className: "max-w-full max-h-[80vh] plate-round-lg p-px bg-[var(--surface-container-stroke)] flex focus:outline-none",
      style: { width: typeof s == "number" ? `${s}px` : s },
      role: "dialog",
      "aria-modal": m ? void 0 : "true",
      "aria-label": r,
      onClick: (S) => S.stopPropagation(),
      children: /* @__PURE__ */ N("div", { className: "w-full plate-round-lg bg-[var(--surface-card)] flex flex-col overflow-hidden", children: [
        /* @__PURE__ */ N("div", { className: "flex items-center justify-between px-6 py-5 border-b-[0.5px] border-solid border-[var(--surface-container-stroke)]", children: [
          /* @__PURE__ */ o("h2", { className: "text-base font-mono text-[var(--text-primary)] font-medium flex-1 min-w-0 truncate", children: r }),
          /* @__PURE__ */ o(
            "span",
            {
              className: "relative ml-4 inline-flex shrink-0 before:content-[''] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-touch before:h-touch",
              onClick: (S) => {
                S.target === S.currentTarget && t();
              },
              children: /* @__PURE__ */ o(
                Fe,
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
        a && /* @__PURE__ */ o("div", { className: "flex items-center justify-end gap-3 px-6 py-5 border-t-[0.5px] border-solid border-[var(--surface-container-stroke)]", children: a })
      ] })
    }
  );
  return m ? /* @__PURE__ */ o(
    "div",
    {
      className: `fixed inset-x-0 mx-auto w-fit max-w-full ${f ? "animate-out fade-out fill-mode-forwards" : "animate-in fade-in"}`,
      style: {
        zIndex: "var(--z-index-modal)",
        bottom: "48px",
        animationDuration: "var(--duration-normal)",
        filter: "drop-shadow(0 10px 40px rgba(0, 0, 0, 0.35))"
      },
      onAnimationEnd: () => {
        f && u(!1);
      },
      children: y
    }
  ) : /* @__PURE__ */ o(pe, { children: /* @__PURE__ */ o(
    "div",
    {
      className: `fixed inset-0 flex items-center justify-center p-5 bg-[var(--surface-overlay)] ${f ? "animate-out fade-out fill-mode-forwards" : "animate-in fade-in"}`,
      style: { zIndex: "var(--z-index-modal)", animationDuration: "var(--duration-normal)" },
      onClick: t,
      onAnimationEnd: () => {
        f && u(!1);
      },
      children: y
    }
  ) });
}
const An = /(?:^|\s)flex(?:\s|$)/;
function fa({
  title: e,
  subtitle: t,
  headerContent: r,
  children: n,
  footerContent: a,
  layout: s,
  className: i = ""
}) {
  const l = s ? s === "flex" : An.test(i);
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
function ma({
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
  const d = se(t, "Badge"), u = l ?? (typeof a == "string" ? `Remove ${a}` : "Remove badge"), f = {
    sm: "h-5 px-2 py-1 text-xs",
    // h-5 = 20px, px-2 = 8px, text-xs = 12px
    md: "h-6 px-2.5 py-1 text-xs",
    // h-6 = 24px, px-2.5 = 10px, text-xs = 12px
    lg: "h-7 px-3 py-1.5 text-sm"
    // h-7 = 28px, px-3 = 12px, text-sm = 14px
  }, p = {
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
  }, b = {
    default: "border-current text-secondary-800 dark:text-secondary-200",
    primary: "border-current text-primary-800 dark:text-primary-300",
    success: "border-current text-success-800 dark:text-success-300",
    warning: "border-current text-warning-800 dark:text-warning-300",
    error: "border-current text-error-800 dark:text-error-300",
    info: "border-current text-info-800 dark:text-info-300",
    bone: "border-secondary-500 text-secondary-800 dark:text-secondary-200"
  }, m = {
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
        ${n ? `rounded-none border border-dashed bg-transparent ${b[e]}` : `plate-round ${p[e]}`}
        ${f[d]}
        ${r ? "uppercase [letter-spacing:.08em]" : ""}
        ${c}
      `,
      children: [
        s && /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center ${m[d]} flex-shrink-0`, children: s }),
        /* @__PURE__ */ o("span", { className: "inline-flex items-center", children: a }),
        i && /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            onClick: (g) => {
              g.stopPropagation(), i();
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
function pa({
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
  return /* @__PURE__ */ o("div", { role: "alert", className: `plate-round p-px ${d.ring} ${s}`, children: /* @__PURE__ */ N(
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
        /* @__PURE__ */ N("div", { className: "flex-1 min-w-0", children: [
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
function Cn({
  src: e,
  alt: t,
  initials: r,
  icon: n,
  size: a = "md",
  status: s,
  className: i = "",
  onError: l
}) {
  const c = se(a, "Avatar", "md"), [d, u] = V(!1), p = {
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
  }, m = e && !d, g = !m && r, y = !m && !g && n, S = !m && !g && !y, h = {
    online: "bg-success-600 dark:bg-success-500",
    offline: "bg-secondary-500 dark:bg-secondary-600",
    away: "bg-warning-600 dark:bg-warning-500"
  };
  return /* @__PURE__ */ N("div", { className: `relative inline-block ${p.container} ${i}`, children: [
    /* @__PURE__ */ N(
      "div",
      {
        className: `
          ${p.container}
          plate-round
          overflow-hidden
          flex items-center justify-center
          bg-secondary-200 dark:bg-secondary-800
          text-secondary-900 dark:text-secondary-50
          font-mono font-bold
          ${p.text}
        `,
        children: [
          m && /* @__PURE__ */ o(
            "img",
            {
              src: e,
              alt: t || "Avatar",
              className: "w-full h-full object-cover",
              onError: b
            }
          ),
          g && /* @__PURE__ */ o("span", { className: "select-none", children: r }),
          y && /* @__PURE__ */ o("div", { className: `${p.icon} inline-flex items-center justify-center leading-none text-secondary-700 dark:text-secondary-300`, children: n }),
          S && /* @__PURE__ */ o("span", { className: `${p.icon} inline-flex items-center justify-center font-mono font-bold text-secondary-900 dark:text-secondary-100`, "aria-hidden": "true", children: "@" })
        ]
      }
    ),
    s && /* @__PURE__ */ o(
      "span",
      {
        role: "img",
        className: `
            absolute block
            ${p.statusOffset}
            ${p.status}
            ${h[s]}
            rounded-none
            border-2 border-[var(--field-background)]
          `,
        "aria-label": `Status: ${s}`
      }
    )
  ] });
}
function ba({
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
  ) : e === "withText" && t ? /* @__PURE__ */ N(
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
const Mn = { top: "bottom", bottom: "top", left: "right", right: "left" }, Rn = 8, Ae = 8;
function Ln(e, t, r, n, a) {
  const s = {
    top: t.top,
    bottom: a - t.bottom,
    left: t.left,
    right: n - t.right
  }, i = (c) => (c === "top" || c === "bottom" ? r.height : r.width) + Rn + Ae;
  if (s[e] >= i(e)) return e;
  const l = Mn[e];
  return s[l] >= i(l) ? l : e;
}
function Pn(e, t, r) {
  const n = e.left + e.width / 2 - t / 2, a = n + t;
  return n < Ae ? Ae - n : a > r - Ae ? Math.max(Ae - n, r - Ae - a) : 0;
}
function Dn({
  content: e,
  children: t,
  position: r = "top",
  delay: n = 200,
  maxWidth: a = "200px",
  className: s = ""
}) {
  const [i, l] = V(!1), [c, d] = V(!1), u = Z(null), f = Z(null), p = Z(null), b = Z(null), m = ce(), [g, y] = V(r), [S, h] = V(0), [z, k] = V(0), x = () => {
    u.current && clearTimeout(u.current), f.current && clearTimeout(f.current);
  }, $ = () => {
    x(), u.current = setTimeout(() => {
      l(!0), f.current = setTimeout(() => d(!0), 50);
    }, n);
  }, I = Se(() => {
    x(), l(!1), d(!1);
  }, []), v = (K) => {
    var L;
    (L = b.current) != null && L.contains(K.relatedTarget) || I();
  };
  G(() => {
    if (!i) return;
    const K = (L) => {
      L.key === "Escape" && I();
    };
    return document.addEventListener("keydown", K), () => document.removeEventListener("keydown", K);
  }, [i, I]), G(() => x, []), Oe(() => {
    var _, D;
    if (!i) return;
    const K = (_ = b.current) == null ? void 0 : _.getBoundingClientRect(), L = (D = p.current) == null ? void 0 : D.getBoundingClientRect();
    if (!K || !L) return;
    const T = window.innerWidth || document.documentElement.clientWidth, P = window.innerHeight || document.documentElement.clientHeight, U = Ln(r, K, L, T, P), w = U === "top" || U === "bottom" ? Pn(K, L.width, T) : 0, H = Math.max(0, L.width / 2 - 12);
    y(U), h(w), k(Math.min(H, Math.max(-H, -w)));
  }, [i, r, e, a]);
  const O = je(t) ? dt(t, {
    "aria-describedby": [
      t.props["aria-describedby"],
      i ? m : void 0
    ].filter(Boolean).join(" ") || void 0
  }) : t, C = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2"
  }, te = "polygon(0 0, 16px 0, 16px 2px, 14px 2px, 14px 4px, 12px 4px, 12px 6px, 10px 6px, 10px 8px, 6px 8px, 6px 6px, 4px 6px, 4px 4px, 2px 4px, 2px 2px, 0 2px)", J = "polygon(0 0, 12px 0, 12px 2px, 10px 2px, 10px 4px, 8px 4px, 8px 6px, 4px 6px, 4px 4px, 2px 4px, 2px 2px, 0 2px)", ne = {
    top: "top-full left-1/2 -translate-x-1/2 -translate-y-px",
    bottom: "bottom-full left-1/2 -translate-x-1/2 translate-y-px rotate-180",
    left: "left-full top-1/2 -translate-y-1/2 -translate-x-[5px] -rotate-90",
    right: "right-full top-1/2 -translate-y-1/2 translate-x-[5px] rotate-90"
  }, W = {
    top: "top-full inset-x-0 h-2",
    bottom: "bottom-full inset-x-0 h-2",
    left: "left-full inset-y-0 w-2",
    right: "right-full inset-y-0 w-2"
  };
  return /* @__PURE__ */ N(
    "div",
    {
      ref: b,
      className: `relative inline-block w-fit ${s}`,
      onMouseEnter: $,
      onMouseLeave: I,
      onFocus: $,
      onBlur: v,
      children: [
        O,
        i && /* @__PURE__ */ N(
          "div",
          {
            ref: p,
            id: m,
            role: "tooltip",
            className: `
            absolute
            ${C[g]}
            w-max
            z-[var(--z-index-tooltip)]
            ${c ? "opacity-100" : "opacity-0"}
            transition-opacity [transition-duration:var(--duration-fast)]
          `,
            "data-placement": g,
            style: { maxWidth: a, marginLeft: S || void 0 },
            children: [
              /* @__PURE__ */ o("span", { className: `absolute ${W[g]}`, "aria-hidden": "true" }),
              /* @__PURE__ */ o("div", { className: "plate-round p-px bg-[var(--surface-container-stroke)]", children: /* @__PURE__ */ o("div", { className: "plate-round bg-[var(--surface-card)] min-w-16 px-3 py-2 text-center font-mono text-xs text-[var(--text-primary)] whitespace-normal", children: e }) }),
              /* @__PURE__ */ o(
                "div",
                {
                  className: `absolute ${ne[g]}`,
                  style: { marginLeft: z || void 0 },
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ N("div", { className: "relative h-[8px] w-[16px]", children: [
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
                        className: "absolute left-[2px] top-[-1px] h-[6px] w-[12px] bg-[var(--surface-card)]",
                        style: { clipPath: J }
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
function st(e) {
  return e == null || typeof e == "boolean" ? "" : Array.isArray(e) ? e.map(st).join("") : typeof e == "string" || typeof e == "number" ? String(e) : je(e) ? st(e.props.children) : String(e);
}
function it(e, t, r, n = []) {
  return Sr.forEach(e, (a) => {
    if (!je(a)) return;
    const s = a, i = s.props;
    if (s.type === ut) {
      it(i.children, t, r, n);
      return;
    }
    if (s.type === "optgroup") {
      it(i.children, i.label ?? t, i.disabled || r, n);
      return;
    }
    const l = st(i.children);
    n.push({
      // Native fallback: an option with no `value` submits its text
      value: i.value != null ? String(i.value) : l,
      label: l,
      disabled: i.disabled || r || void 0,
      group: t
    });
  }), n;
}
function Qe(e, t, r) {
  var s;
  const n = e.length;
  if (n === 0) return -1;
  let a = t;
  for (let i = 0; i < n; i++)
    if (a += r, a >= n && (a = 0), a < 0 && (a = n - 1), !((s = e[a]) != null && s.disabled)) return a;
  return -1;
}
const On = oe(function({
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
  name: f,
  label: p,
  "aria-label": b,
  "aria-describedby": m,
  id: g,
  ...y
}, S) {
  var xe;
  const h = se(t, "Select"), z = Ce({ error: r, helperText: n, errorMessage: a, describedBy: m }), k = z.invalid, x = ce(), $ = g ?? `${x}-trigger`, I = `${x}-listbox`, v = `${x}-label`, O = (B) => `${x}-option-${B}`, C = it(l), te = [];
  C.forEach((B, j) => {
    const le = te[te.length - 1];
    le && le.label === B.group ? le.entries.push({ option: B, index: j }) : te.push({ label: B.group, entries: [{ option: B, index: j }] });
  });
  const [J, ne] = V(!1), [W, K] = V(-1), [L, T] = V(
    c !== void 0 ? String(c) : d !== void 0 ? String(d) : ((xe = C[0]) == null ? void 0 : xe.value) || ""
  ), P = Z(null), U = Z(null), w = Z(null);
  G(() => {
    c !== void 0 && (T(String(c)), w.current && (w.current.value = String(c)));
  }, [c]), Nr(S, () => w.current);
  const H = C.find((B) => B.value === L), _ = (H == null ? void 0 : H.label) || "", D = () => {
    s || (ne(!J), J || K(-1));
  }, X = () => {
    ne(!1), K(-1);
  }, Y = (B) => {
    c === void 0 && T(B), w.current && (w.current.value = B), u && u({
      target: { value: B, name: f },
      currentTarget: { value: B, name: f }
    }), X();
  };
  G(() => {
    function B(j) {
      P.current && !P.current.contains(j.target) && X();
    }
    if (J)
      return document.addEventListener("mousedown", B), () => {
        document.removeEventListener("mousedown", B);
      };
  }, [J]), G(() => {
    function B(j) {
      var ve, be;
      if (!((ve = P.current) != null && ve.contains(j.target)) && !J)
        return;
      if (!J) {
        if ((j.key === "Enter" || j.key === " " || j.key === "ArrowDown" || j.key === "ArrowUp") && (be = P.current) != null && be.contains(j.target)) {
          j.preventDefault(), D();
          const de = C.findIndex((fe) => fe.value === L && !fe.disabled);
          K(de >= 0 ? de : Qe(C, -1, 1));
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
          j.preventDefault(), K((de) => Qe(C, de, 1));
          break;
        case "ArrowUp":
          j.preventDefault(), K((de) => Qe(C, de, -1));
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
  }, [J, W, C, L]), G(() => {
    if (W >= 0 && U.current) {
      const j = U.current.querySelectorAll('[role="option"]')[W];
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
  }[h], ie = k ? "bg-[var(--field-background-error)] text-[var(--text-primary)]" : "bg-[var(--field-background)] text-[var(--text-primary)]", Q = k ? "bg-[var(--field-border-error)]" : "bg-[var(--field-border)] hover:bg-[var(--field-border-hover)] focus-within:!bg-[var(--field-border-focus)]", me = p != null && p !== "", ge = /* @__PURE__ */ N("div", { ref: P, className: "relative inline-block w-full", children: [
    /* @__PURE__ */ o(
      "select",
      {
        ref: w,
        name: f,
        value: L,
        onChange: u,
        className: "sr-only",
        "aria-hidden": "true",
        tabIndex: -1,
        ...y,
        children: C.map((B, j) => /* @__PURE__ */ o("option", { value: B.value, disabled: B.disabled, children: B.label }, j))
      }
    ),
    /* @__PURE__ */ o("div", { className: `plate-round p-px transition-colors [transition-duration:var(--duration-fast)] ${Q} ${s ? "opacity-50" : ""}`, children: /* @__PURE__ */ N(
      "button",
      {
        type: "button",
        id: $,
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
        "aria-expanded": J,
        "aria-controls": J ? I : void 0,
        "aria-activedescendant": J && W >= 0 ? O(W) : void 0,
        "aria-invalid": k || void 0,
        "aria-describedby": z.describedBy,
        "aria-label": me ? void 0 : b ?? "Select an option",
        children: [
          /* @__PURE__ */ o("span", { className: "truncate text-left flex-1", children: _ || "Select..." }),
          /* @__PURE__ */ o(
            "span",
            {
              className: `
            ${ue.icon}
            inline-flex items-center justify-center font-mono leading-none
            text-[var(--text-secondary)]
            transition-transform [transition-duration:var(--duration-normal)]
            flex-shrink-0 ml-2
            ${J ? "rotate-180" : ""}
            ${s ? "opacity-50" : ""}
          `,
              "aria-hidden": "true",
              children: /* @__PURE__ */ o(q, { name: "ChevronDown" })
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
            ref: U,
            id: I,
            role: "listbox",
            "aria-labelledby": me ? v : void 0,
            "aria-label": me ? void 0 : b ?? "Select an option",
            className: `plate-round bg-[var(--surface-card)] ${ue.menu} max-h-80 overflow-y-auto`,
            children: te.map((B, j) => {
              const le = `${x}-group-${j}`, ve = B.entries.map(({ option: be, index: de }) => {
                const fe = be.disabled, Te = be.value === L, Ye = W === de && !fe;
                return /* @__PURE__ */ N(
                  "button",
                  {
                    id: O(de),
                    type: "button",
                    role: "option",
                    "aria-selected": Te,
                    disabled: fe,
                    onClick: () => !fe && Y(be.value),
                    className: `
                  w-full flex items-center gap-2
                  px-4 py-3
                  font-mono text-sm text-left
                  transition-colors [transition-duration:var(--duration-fast)]
                  ${fe ? "opacity-50 cursor-not-allowed" : "text-[var(--text-primary)] hover:bg-[var(--surface-muted)] cursor-pointer"}
                  ${Ye ? "bg-[var(--surface-muted)] text-[var(--accent)]" : ""}
                  ${ue.menuItem}
                `,
                    children: [
                      /* @__PURE__ */ o("span", { className: "truncate flex-1 min-w-0", children: be.label }),
                      Te && /* @__PURE__ */ o("span", { className: `${ue.icon} inline-flex items-center justify-center font-mono font-bold text-[var(--border-focus)] flex-shrink-0`, "aria-hidden": "true", children: /* @__PURE__ */ o(q, { name: "Check" }) })
                    ]
                  },
                  de
                );
              });
              return B.label == null ? /* @__PURE__ */ o(ut, { children: ve }, j) : /* @__PURE__ */ N("div", { role: "group", "aria-labelledby": le, children: [
                /* @__PURE__ */ o(
                  "div",
                  {
                    id: le,
                    className: "px-4 py-2 font-mono text-xs uppercase tracking-wide text-[var(--text-secondary)]",
                    children: B.label
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
  return !me && !z.hasMessage ? /* @__PURE__ */ o("div", { className: `w-full ${i}`.trim(), children: ge }) : /* @__PURE__ */ N("div", { className: `w-full space-y-1 ${i}`.trim(), children: [
    me && /* @__PURE__ */ o(
      "label",
      {
        id: v,
        htmlFor: $,
        className: "block font-mono text-sm text-secondary-800 dark:text-secondary-200",
        children: p
      }
    ),
    ge,
    /* @__PURE__ */ o(Me, { ...z.message })
  ] });
});
On.displayName = "Select";
const jn = oe(
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
    "aria-describedby": f,
    ...p
  }, b) => {
    const m = se(e, "Checkbox"), g = Z(null), y = Se(
      (C) => {
        g.current = C, typeof b == "function" ? b(C) : b && (b.current = C);
      },
      [b]
    );
    Oe(() => {
      g.current && (g.current.indeterminate = d);
    });
    const S = Ce({ error: r, helperText: n, errorMessage: a, describedBy: f }), h = S.invalid, k = {
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
    }[m], x = h ? "bg-[var(--field-border-error)]" : `bg-[var(--field-border)] hover:bg-[var(--field-border-hover)]
         peer-checked:bg-[var(--button-primary-background)]
         peer-checked:hover:bg-[var(--button-primary-background-hover)]
         peer-indeterminate:bg-[var(--button-primary-background)]
         peer-indeterminate:hover:bg-[var(--button-primary-background-hover)]`, $ = h ? "peer-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-error)]" : "peer-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]", I = (C) => {
      l && l(C), c && c(C.target.checked), C.target.indeterminate = d;
    }, v = t != null && t !== !1 && t !== "", O = /* @__PURE__ */ N("span", { className: "relative inline-flex shrink-0 before:content-[''] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-touch before:h-touch", children: [
      /* @__PURE__ */ o(
        "input",
        {
          ref: y,
          type: "checkbox",
          ...i !== void 0 ? { checked: i } : {},
          disabled: s,
          onChange: I,
          className: "peer sr-only",
          "aria-invalid": h || void 0,
          "aria-describedby": S.describedBy,
          ...p
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
            ${x}
            ${h ? "peer-checked:[&>span]:bg-[var(--field-border-error)] peer-indeterminate:[&>span]:bg-[var(--field-border-error)]" : "peer-checked:[&>span]:bg-[var(--button-primary-background)] peer-indeterminate:[&>span]:bg-[var(--button-primary-background)]"}
            peer-checked:[&_[data-mark=check]]:opacity-100
            peer-indeterminate:[&_[data-mark=check]]:opacity-0
            peer-indeterminate:[&_[data-mark=bar]]:opacity-100
            ${$}
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
                  className: `absolute inset-0 inline-flex items-center justify-center opacity-0 transition-opacity [transition-duration:var(--duration-fast)] ${h ? "text-[var(--button-destructive-text)]" : "text-[var(--button-primary-text)]"}`,
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
    return /* @__PURE__ */ N("div", { className: `flex flex-col gap-1 ${u}`, children: [
      /* @__PURE__ */ N(
        "label",
        {
          className: `inline-flex items-center gap-2 font-mono ${s ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`,
          children: [
            O,
            v && /* @__PURE__ */ o("span", { className: `${k.label} text-[var(--text-primary)]`, children: t })
          ]
        }
      ),
      /* @__PURE__ */ o(Me, { ...S.message, className: k.messageIndent })
    ] });
  }
);
jn.displayName = "Checkbox";
function Bn(e, t, r) {
  return !Number.isFinite(e) || r <= t ? 0 : Math.min(100, Math.max(0, (e - t) / (r - t) * 100));
}
const Fn = oe(function({ label: t, id: r, className: n = "", disabled: a, min: s = 0, max: i = 100, value: l, defaultValue: c, onChange: d, ...u }, f) {
  const p = ce(), b = r ?? p, m = Number(s), g = Number(i), y = l !== void 0, [S, h] = V(
    () => c !== void 0 ? Number(c) : m
  ), z = y ? Number(l) : S, k = Bn(z, m, g), x = ($) => {
    y || h(Number($.target.value)), d == null || d($);
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
              style: { width: `${k}%` }
            }
          )
        }
      ),
      /* @__PURE__ */ o(
        "input",
        {
          ref: f,
          id: b,
          type: "range",
          min: s,
          max: i,
          disabled: a,
          ...y ? { value: l } : { defaultValue: c },
          onChange: x,
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
Fn.displayName = "Slider";
const Vn = oe(
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
    ...f
  }, p) => {
    const b = se(e, "Radio"), m = Ce({ error: r, helperText: n, errorMessage: a, describedBy: u }), g = m.invalid, S = {
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
    }[b], h = g ? "bg-[var(--field-border-error)]" : `bg-[var(--field-border)] hover:bg-[var(--field-border-hover)]
         peer-checked:bg-[var(--button-primary-background)]
         peer-checked:hover:bg-[var(--button-primary-background-hover)]`, z = g ? "peer-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-error)]" : "peer-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]", k = (I) => {
      const v = I.currentTarget.checked;
      l && l(I), c && c(v);
    }, x = t != null && t !== !1 && t !== "", $ = /* @__PURE__ */ N("span", { className: "relative inline-flex shrink-0 before:content-[''] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-touch before:h-touch", children: [
      /* @__PURE__ */ o(
        "input",
        {
          ref: p,
          type: "radio",
          ...i !== void 0 ? { checked: i } : {},
          disabled: s,
          onChange: k,
          className: "peer sr-only",
          "aria-invalid": g || void 0,
          "aria-describedby": m.describedBy,
          ...f
        }
      ),
      /* @__PURE__ */ o(
        "span",
        {
          "aria-hidden": "true",
          className: `
            plate-round p-px inline-flex shrink-0
            ${S.radio}
            transition-colors [transition-duration:var(--duration-fast)]
            ${s ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
            ${h}
            ${g ? "peer-checked:[&>span]:bg-[var(--field-border-error)]" : "peer-checked:[&>span]:bg-[var(--button-primary-background)]"}
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
                ${S.dot}
                opacity-0
                transition-opacity [transition-duration:var(--duration-fast)]
                ${g ? "bg-[var(--button-destructive-text)]" : "bg-[var(--button-primary-text)]"}
              `
                }
              )
            }
          )
        }
      )
    ] });
    return /* @__PURE__ */ N("div", { className: `flex flex-col gap-1 ${d}`, children: [
      /* @__PURE__ */ N(
        "label",
        {
          className: `inline-flex items-center gap-2 font-mono ${s ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`,
          children: [
            $,
            x && /* @__PURE__ */ o("span", { className: `${S.label} text-[var(--text-primary)]`, children: t })
          ]
        }
      ),
      /* @__PURE__ */ o(Me, { ...m.message, className: S.messageIndent })
    ] });
  }
);
Vn.displayName = "Radio";
const Gn = oe(
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
    const f = se(e, "Textarea"), p = Ce({ error: t, helperText: r, errorMessage: n, describedBy: c }), b = p.invalid, m = ce(), g = l ?? (i != null && i !== "" ? m : void 0), y = `
      w-full
      font-mono text-sm
      transition-colors [transition-duration:var(--duration-fast)]
      placeholder:text-[var(--field-placeholder)]
      disabled:cursor-not-allowed
      focus:outline-none
      resize-y
    `, S = b ? "focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-error)]" : "focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]", h = {
      sm: "min-h-control-sm px-3 py-1.5 plate-round",
      md: "min-h-control-md px-4 py-2.5 plate-round",
      lg: "min-h-control-lg px-5 py-3.5 plate-round"
    }, z = b ? "bg-[var(--field-background-error)] text-[var(--text-primary)]" : "bg-[var(--field-background)] text-[var(--text-primary)]", x = /* @__PURE__ */ o(
      "div",
      {
        className: `w-full plate-round p-px transition-colors [transition-duration:var(--duration-fast)] ${b ? "bg-[var(--field-border-error)]" : "bg-[var(--field-border)] hover:bg-[var(--field-border-hover)] focus-within:!bg-[var(--field-border-focus)]"} ${a ? "opacity-50" : ""}`,
        children: /* @__PURE__ */ o(
          "textarea",
          {
            ref: u,
            id: g,
            disabled: a,
            "aria-invalid": b || void 0,
            "aria-describedby": p.describedBy,
            className: `${y} ${S} ${h[f]} ${z} ${s}`,
            ...d
          }
        )
      }
    ), $ = i != null && i !== "";
    return !$ && !p.hasMessage ? x : /* @__PURE__ */ N("div", { className: "w-full space-y-1", children: [
      $ && /* @__PURE__ */ o(
        "label",
        {
          htmlFor: g,
          className: "block font-mono text-sm text-secondary-800 dark:text-secondary-200",
          children: i
        }
      ),
      x,
      /* @__PURE__ */ o(Me, { ...p.message })
    ] });
  }
);
Gn.displayName = "Textarea";
const Un = {
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
}, rr = oe(
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
    const u = se(r, "Switch"), f = Un[u], p = () => {
      !s && t && t(!e);
    }, b = (m) => {
      (m.key === " " || m.key === "Enter") && (m.preventDefault(), !s && t && t(!e));
    };
    return /* @__PURE__ */ N("div", { className: `flex items-center gap-3 ${l}`, children: [
      /* @__PURE__ */ o(
        "button",
        {
          ref: d,
          type: "button",
          role: "switch",
          "aria-checked": e,
          "aria-label": n || (e ? "On" : "Off"),
          disabled: s,
          onClick: p,
          onKeyDown: b,
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
              ${f.track}
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
              ${f.knob}
              plate-round
              bg-[var(--field-background)]
              shadow-none
              transform transition-transform [transition-duration:var(--duration-normal)] motion-reduce:transition-none
            `,
                  style: {
                    transform: `translateX(${e ? f.knobOn : f.knobOff})`
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
          onClick: p,
          className: `select-none text-sm font-mono ${s ? "cursor-not-allowed text-secondary-700 dark:text-secondary-400" : "cursor-pointer text-[var(--text-primary)]"}`,
          children: n
        }
      )
    ] });
  }
);
rr.displayName = "Switch";
function At(e, t, r) {
  var s;
  const n = e.length;
  if (n === 0) return -1;
  let a = t;
  for (let i = 0; i < n; i++)
    if (a += r, a >= n && (a = 0), a < 0 && (a = n - 1), !((s = e[a]) != null && s.disabled)) return a;
  return -1;
}
function ha({
  trigger: e,
  items: t,
  align: r = "left",
  label: n = "Actions",
  size: a = "md"
}) {
  const s = se(a, "Dropdown"), [i, l] = V(!1), [c, d] = V(-1), u = Z(null), f = Z(null), p = () => {
    l(!i), i || d(-1);
  }, b = () => {
    l(!1), d(-1);
  }, m = (k) => {
    k.disabled || (k.onClick(), b());
  };
  G(() => {
    function k(x) {
      u.current && !u.current.contains(x.target) && b();
    }
    if (i)
      return document.addEventListener("mousedown", k), () => {
        document.removeEventListener("mousedown", k);
      };
  }, [i]), G(() => {
    function k(x) {
      if (!i) return;
      const $ = c;
      switch (x.key) {
        case "Escape":
          x.preventDefault(), b();
          break;
        case "Tab":
          b();
          break;
        case "ArrowDown":
          x.preventDefault(), d((I) => At(t, I, 1));
          break;
        case "ArrowUp":
          x.preventDefault(), d((I) => At(t, I, -1));
          break;
        case "Enter":
        case " ":
          x.preventDefault(), $ >= 0 && $ < t.length && m(t[$]);
          break;
      }
    }
    if (i)
      return document.addEventListener("keydown", k), () => {
        document.removeEventListener("keydown", k);
      };
  }, [i, c, t]), G(() => {
    if (c >= 0 && f.current) {
      const x = f.current.querySelectorAll('[role="menuitem"]')[c];
      x && x.scrollIntoView({ block: "nearest" });
    }
  }, [c]);
  const y = {
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
  }[s], S = /* @__PURE__ */ N(
    "button",
    {
      type: "button",
      onClick: p,
      className: `
        inline-flex items-center justify-center gap-2
        font-mono text-sm
        ${y.button}
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
        /* @__PURE__ */ o("span", { className: `${y.icon} inline-flex items-center justify-center font-mono leading-none transition-transform [transition-duration:var(--duration-normal)] ${i ? "rotate-180" : ""}`, "aria-hidden": "true", children: /* @__PURE__ */ o(q, { name: "ChevronDown" }) })
      ]
    }
  ), h = {
    "aria-haspopup": "true",
    "aria-expanded": i
  };
  let z;
  if (!e)
    z = S;
  else if (je(e)) {
    const k = e;
    z = dt(k, {
      ...h,
      onClick: (x) => {
        var $, I;
        (I = ($ = k.props).onClick) == null || I.call($, x), p();
      }
    });
  } else
    z = /* @__PURE__ */ o(
      "div",
      {
        ...h,
        onClick: p,
        role: "button",
        tabIndex: 0,
        onKeyDown: (k) => {
          (k.key === "Enter" || k.key === " ") && (k.preventDefault(), p());
        },
        children: e
      }
    );
  return /* @__PURE__ */ N("div", { ref: u, className: "relative inline-block", children: [
    z,
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
            ref: f,
            role: "menu",
            "aria-orientation": "vertical",
            className: `plate-round bg-[var(--surface-card)] ${y.menu}`,
            children: t.map((k, x) => {
              const $ = k.variant === "destructive", I = k.disabled;
              return /* @__PURE__ */ N(
                "button",
                {
                  type: "button",
                  role: "menuitem",
                  disabled: I,
                  onClick: () => m(k),
                  className: `
                  w-full flex items-center gap-2
                  px-4 py-3
                  font-mono text-sm text-left
                  transition-colors [transition-duration:var(--duration-fast)]
                  ${I ? "opacity-50 cursor-not-allowed" : $ ? "text-error-600 hover:bg-[var(--field-background-error)]" : "text-[var(--text-primary)] hover:bg-[var(--surface-muted)]"}
                  ${c === x && !I ? $ ? "bg-[var(--field-background-error)]" : "bg-[var(--surface-muted)] text-[var(--accent)]" : ""}
                  ${y.menuItem}
                `,
                  children: [
                    /* @__PURE__ */ N("div", { className: "flex items-center gap-2 flex-1 min-w-0", children: [
                      k.icon && /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center ${y.icon} flex-shrink-0`, children: k.icon }),
                      /* @__PURE__ */ o("span", { className: "truncate", children: k.label })
                    ] }),
                    k.iconRight && /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center ${y.icon} flex-shrink-0 ml-auto`, children: k.iconRight })
                  ]
                },
                x
              );
            })
          }
        )
      }
    )
  ] });
}
const He = "text-secondary-700 dark:text-secondary-600", We = "text-secondary-800 dark:text-secondary-500", Hn = {
  background: "repeating-linear-gradient(45deg, var(--surface-subtle), var(--surface-subtle) 8px, var(--surface-muted) 8px, var(--surface-muted) 16px)"
}, nr = (e) => e === "wide" ? " [--csb-bw:min(calc(100%+240px),calc(100cqw-48px))] w-[var(--csb-bw)] ml-[calc((100%-var(--csb-bw))/2)]" : e === "full" ? " [--csb-bw:calc(100cqw-48px)] w-[var(--csb-bw)] ml-[calc((100%-var(--csb-bw))/2)]" : "";
function et({
  aspect: e,
  caption: t,
  width: r
}) {
  return /* @__PURE__ */ N("figure", { className: `my-11${nr(r)}`, children: [
    /* @__PURE__ */ o("div", { className: "plate-round p-px bg-[var(--border-hairline)]", children: /* @__PURE__ */ o(
      "div",
      {
        className: "plate-round w-full",
        style: { aspectRatio: e ?? "16 / 9", ...Hn }
      }
    ) }),
    t && /* @__PURE__ */ o("figcaption", { className: `mt-2 text-xs ${He}`, children: t })
  ] });
}
function tt({ title: e, text: t }) {
  return /* @__PURE__ */ N(pe, { children: [
    /* @__PURE__ */ o("div", { className: "text-[var(--text-primary)]", children: e }),
    /* @__PURE__ */ o("p", { className: `m-0 text-sm leading-relaxed ${We}`, children: t })
  ] });
}
function Wn({ b: e }) {
  var t, r;
  switch (e.type) {
    case "meta":
      return /* @__PURE__ */ o("dl", { className: "mb-11 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(130px,1fr))]", children: e.items.map((n) => /* @__PURE__ */ N("div", { children: [
        /* @__PURE__ */ o("dt", { className: `text-xs uppercase tracking-[0.08em] ${He}`, children: n.label }),
        /* @__PURE__ */ o("dd", { className: `m-0 mt-1 text-sm leading-normal ${We}`, children: n.value })
      ] }, n.label)) });
    case "headline":
      return /* @__PURE__ */ N("header", { className: "mb-7 mt-16 first:mt-0 sm:mt-24 sm:first:mt-0", children: [
        e.kicker && /* @__PURE__ */ o("div", { className: `text-xs first-letter:uppercase ${He}`, children: e.kicker }),
        /* @__PURE__ */ o("h2", { className: "mt-2 text-xl text-[var(--text-primary)]", children: e.title }),
        e.text && /* @__PURE__ */ o("p", { className: `mt-3 text-base leading-relaxed ${We}`, children: e.text })
      ] });
    case "prose":
      return /* @__PURE__ */ o("p", { className: `my-7 text-base leading-relaxed ${We}`, children: e.text });
    case "image":
      return /* @__PURE__ */ o(et, { aspect: e.aspect, caption: e.caption, width: e.width });
    case "imagePair":
      return /* @__PURE__ */ N("div", { className: `my-11 grid grid-cols-1 gap-3.5 sm:grid-cols-2${nr(e.width)}`, children: [
        /* @__PURE__ */ o(et, { aspect: "4 / 3", caption: (t = e.captions) == null ? void 0 : t[0] }),
        /* @__PURE__ */ o(et, { aspect: "4 / 3", caption: (r = e.captions) == null ? void 0 : r[1] })
      ] });
    case "callouts":
      return /* @__PURE__ */ o("div", { className: "my-11 grid gap-x-8 gap-y-7 [grid-template-columns:repeat(auto-fit,minmax(160px,1fr))]", children: e.items.map((n) => /* @__PURE__ */ o("div", { className: "grid row-span-2 gap-y-1.5 [grid-template-rows:subgrid]", children: /* @__PURE__ */ o(tt, { title: n.title, text: n.text }) }, n.title)) });
    case "insights":
      return /* @__PURE__ */ o("ol", { className: "my-11 flex list-none flex-col gap-7 p-0", children: e.items.map((n, a) => /* @__PURE__ */ N("li", { className: "flex gap-3.5", children: [
        /* @__PURE__ */ o("span", { className: "flex-none text-sm leading-6 text-[var(--accent)]", children: String(a + 1).padStart(2, "0") }),
        /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(tt, { title: n.title, text: n.text }) })
      ] }, n.title)) });
    case "quote":
      return /* @__PURE__ */ N("figure", { className: "my-11 m-0 text-lg leading-relaxed text-[var(--text-primary)]", children: [
        /* @__PURE__ */ o("span", { "aria-hidden": "true", className: "mb-2 block text-3xl leading-none text-[var(--accent)]", children: "“" }),
        /* @__PURE__ */ o("blockquote", { className: "m-0 p-0", children: e.text }),
        e.name && /* @__PURE__ */ N("figcaption", { className: "mt-4 flex items-center gap-3 text-sm", children: [
          /* @__PURE__ */ o(Cn, { size: "md", src: e.image, alt: "" }),
          /* @__PURE__ */ N("span", { children: [
            /* @__PURE__ */ o("span", { className: "block text-[var(--text-primary)]", children: e.name }),
            e.role && /* @__PURE__ */ o("span", { className: `block text-xs ${He}`, children: e.role })
          ] })
        ] })
      ] });
    case "list":
      return /* @__PURE__ */ o("ul", { className: "my-11 flex list-none flex-col gap-7 p-0", children: e.items.map((n) => /* @__PURE__ */ o("li", { children: /* @__PURE__ */ o(tt, { title: n.title, text: n.text }) }, n.title)) });
  }
}
function ga({
  blocks: e,
  className: t = ""
}) {
  return /* @__PURE__ */ o("div", { className: `font-mono ${t}`, children: e.map((r, n) => /* @__PURE__ */ o(Wn, { b: r }, n)) });
}
const Kn = oe(function({ meta: t, title: r, description: n, titleSuffix: a, thumb: s, thumbPosition: i = "start", selected: l = !1, className: c = "", ...d }, u) {
  const f = "as" in d && d.as ? d.as : null, p = f ? "as" : "href" in d && d.href != null ? "a" : "onClick" in d && d.onClick != null ? "button" : "div", b = `
    block w-full text-left p-3 plate-round
    transition-colors [transition-duration:var(--duration-fast)]
    font-mono
    ${p !== "div" ? "cursor-pointer hover:bg-[var(--surface-muted)] focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]" : ""}
    ${l ? "bg-[var(--surface-muted)]" : ""}
    ${c}
  `, m = /* @__PURE__ */ N(pe, { children: [
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
  ] }), g = s ? /* @__PURE__ */ N("span", { className: `flex items-start gap-4 ${i === "end" ? "flex-row-reverse" : ""}`, children: [
    /* @__PURE__ */ o("span", { className: "flex-shrink-0", children: s }),
    /* @__PURE__ */ o("span", { className: "block min-w-0 flex-1", children: m })
  ] }) : m;
  if (f) {
    const { asProps: S, ...h } = d, z = { ...h };
    return delete z.as, /* @__PURE__ */ o(f, { ref: u, className: b, ...z, ...S, children: g });
  }
  if (p === "a") {
    const { href: S, ...h } = d;
    return /* @__PURE__ */ o("a", { ref: u, href: S, className: b, ...h, children: g });
  }
  if (p === "button") {
    const { onClick: S, ...h } = d;
    return /* @__PURE__ */ o("button", { ref: u, type: "button", onClick: S, className: b, ...h, children: g });
  }
  return /* @__PURE__ */ o("div", { ref: u, className: b, ...d, children: g });
});
Kn.displayName = "ListRow";
const lt = oe(function({ variant: t = "inline", external: r = !1, className: n = "", children: a, ...s }, i) {
  const l = E(
    "font-mono text-[var(--accent)] transition-colors [transition-duration:var(--duration-fast)] hover:text-[var(--text-link-hover)]",
    "focus:outline-none focus-visible:[outline:var(--focus-ring-width)_solid_var(--focus-ring-primary)] focus-visible:[outline-offset:var(--focus-ring-offset)]",
    t === "inline" ? "underline underline-offset-2" : "no-underline hover:underline focus-visible:underline",
    n
  ), c = /* @__PURE__ */ N(pe, { children: [
    a,
    r && /* @__PURE__ */ N(pe, { children: [
      /* @__PURE__ */ o(q, { name: "ExternalLink", size: "3", className: "ml-1" }),
      /* @__PURE__ */ o("span", { className: "sr-only", children: " (opens in new tab)" })
    ] })
  ] });
  if ("as" in s && s.as) {
    const { as: b, asProps: m } = s;
    return /* @__PURE__ */ o(b, { ref: i, className: l, ...r ? { target: "_blank", rel: "noopener noreferrer" } : void 0, ...m, children: c });
  }
  const { href: d, target: u, rel: f, ...p } = s;
  return /* @__PURE__ */ o(
    "a",
    {
      ref: i,
      href: d,
      className: l,
      target: r ? u ?? "_blank" : u,
      rel: r ? f ?? "noopener noreferrer" : f,
      ...p,
      children: c
    }
  );
});
lt.displayName = "Link";
const qn = {
  default: "Bell",
  success: "CheckCircle",
  warning: "AlertTriangle",
  error: "AlertCircle",
  info: "Info"
}, Xn = {
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
}, Ct = `
  relative shrink-0 inline-flex items-center px-1 font-mono text-sm font-bold cursor-pointer
  before:content-[''] before:absolute before:inset-x-0 before:top-1/2 before:-translate-y-1/2 before:h-touch
  focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]
`;
function Yn({ children: e, onClick: t, variant: r = "default", action: n, duration: a, onDismiss: s }) {
  const [i, l] = V(!1);
  G(() => {
    const h = requestAnimationFrame(() => l(!0));
    return () => cancelAnimationFrame(h);
  }, []);
  const [c, d] = V(!1), [u, f] = V(!1), p = c || u, b = Z(s);
  G(() => {
    b.current = s;
  });
  const m = Z(a ?? 0);
  G(() => {
    m.current = a ?? 0;
  }, [a]), G(() => {
    if (p || a == null || !Number.isFinite(a) || !b.current) return;
    const h = Date.now(), z = setTimeout(() => {
      var k;
      return (k = b.current) == null ? void 0 : k.call(b);
    }, Math.max(0, m.current));
    return () => {
      clearTimeout(z), m.current -= Date.now() - h;
    };
  }, [p, a]);
  const g = (h) => {
    h.currentTarget.contains(h.relatedTarget) || f(!1);
  }, y = Xn[r], S = a === 1 / 0 && s != null;
  return /* @__PURE__ */ o(
    "div",
    {
      role: r === "error" ? "alert" : "status",
      onClick: t,
      onMouseEnter: () => d(!0),
      onMouseLeave: () => d(!1),
      onFocus: () => f(!0),
      onBlur: g,
      className: `
        plate-round p-px ${y.ring}
        transition-transform [transition-duration:var(--duration-normal)] [transition-timing-function:steps(5)]
        ${i ? "translate-y-0" : "translate-y-16"}
        ${t ? "cursor-pointer" : ""}
      `,
      children: /* @__PURE__ */ N(
        "div",
        {
          className: `plate-round flex max-w-[min(28rem,calc(100vw-2rem))] items-center gap-2 px-3 py-2.5 font-mono text-sm ${y.fill} ${y.text}`,
          children: [
            /* @__PURE__ */ o("span", { className: `inline-flex shrink-0 ${y.icon}`, children: /* @__PURE__ */ o(q, { name: qn[r], size: "4" }) }),
            /* @__PURE__ */ o("span", { className: "min-w-0 whitespace-nowrap overflow-hidden text-ellipsis", children: e }),
            n && /* @__PURE__ */ o(
              "button",
              {
                type: "button",
                className: `${Ct} underline underline-offset-2`,
                onClick: (h) => {
                  h.stopPropagation(), n.onClick(), s == null || s();
                },
                children: n.label
              }
            ),
            S && /* @__PURE__ */ o(
              "button",
              {
                type: "button",
                "aria-label": "Dismiss notification",
                className: Ct,
                onClick: (h) => {
                  h.stopPropagation(), s == null || s();
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
const Zn = 5e3, pt = [];
let Xe = pt, Jn = 0;
const ct = /* @__PURE__ */ new Set();
function or(e) {
  Xe = e, ct.forEach((t) => t());
}
function ar(e) {
  return ct.add(e), () => {
    ct.delete(e);
  };
}
const sr = () => Xe, ir = () => pt;
function Le(e, t = {}) {
  const { id: r = `toast-${++Jn}`, duration: n = Zn, ...a } = t;
  return or([...Xe.filter((s) => s.id !== r), { id: r, message: e, duration: n, ...a }]), r;
}
function bt(e) {
  or(e === void 0 ? pt : Xe.filter((t) => t.id !== e));
}
const Qn = Object.assign(Le, {
  success: (e, t) => Le(e, { ...t, variant: "success" }),
  warning: (e, t) => Le(e, { ...t, variant: "warning" }),
  error: (e, t) => Le(e, { ...t, variant: "error" }),
  info: (e, t) => Le(e, { ...t, variant: "info" }),
  dismiss: bt
});
function xa() {
  return { toasts: Dt(ar, sr, ir), toast: Qn, dismiss: bt };
}
function va({ toasts: e, onDismiss: t }) {
  const r = Dt(ar, sr, ir), n = e !== void 0, a = n ? e : r, s = n ? t : bt;
  return /* @__PURE__ */ o(
    "div",
    {
      "aria-live": "polite",
      className: "fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2",
      style: { zIndex: "var(--z-index-popover)" },
      children: a.map((i) => /* @__PURE__ */ o(
        Yn,
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
function ya({ isOpen: e, onClose: t, ariaLabel: r, closeLabel: n = "Close", children: a }) {
  const [s, i] = V(e);
  G(() => {
    e && i(!0);
  }, [e]);
  const l = s && !e, c = Z(null), d = Z(null), u = e && s;
  return G(() => {
    var f;
    if (u)
      return d.current = document.activeElement, (f = c.current) == null || f.focus(), () => {
        var p;
        (p = d.current) == null || p.focus(), d.current = null;
      };
  }, [u]), tr(c, u), G(() => {
    if (!e) return;
    const f = (p) => {
      p.key === "Escape" && t();
    };
    return document.addEventListener("keydown", f), () => document.removeEventListener("keydown", f);
  }, [e, t]), G(() => (e ? document.body.style.overflow = "hidden" : document.body.style.overflow = "unset", () => {
    document.body.style.overflow = "unset";
  }), [e]), s ? /* @__PURE__ */ N(pe, { children: [
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
        children: /* @__PURE__ */ N("div", { className: "plate-round-lg-top bg-[var(--surface-card)] px-5 pb-6 pt-1 flex flex-col items-center gap-3 max-h-[70vh]", children: [
          /* @__PURE__ */ N("div", { className: "relative flex h-touch w-full shrink-0 items-center justify-center", children: [
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
function wa() {
  const { resolvedTheme: e, setTheme: t } = $r(), [r, n] = V(!1);
  if (G(() => {
    n(!0);
  }, []), !r)
    return /* @__PURE__ */ N("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ o("div", { className: "w-11 h-6 rounded-none bg-[var(--field-border)]" }),
      /* @__PURE__ */ o("span", { className: "text-sm font-mono text-[var(--text-secondary)]", children: "Theme" })
    ] });
  const a = e === "dark", s = a ? "Dark" : "Light", i = a ? "light" : "dark";
  return /* @__PURE__ */ N("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ o(
      rr,
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
const lr = Be(null);
function ht(e) {
  const t = _e(lr);
  if (!t)
    throw new Error(`[@scorp-ds/components] ${e} must be used inside <Tabs>.`);
  return t;
}
function ka({
  value: e,
  defaultValue: t,
  onValueChange: r,
  children: n,
  className: a
}) {
  const s = e !== void 0, [i, l] = V(() => t ?? ""), c = s ? e : i, d = ce().replace(/:/g, ""), u = Z([]), f = Se(
    (b) => {
      s || l(b), r == null || r(b);
    },
    [s, r]
  ), p = De(
    () => ({
      value: c,
      onValueChange: f,
      baseId: d,
      listValuesRef: u,
      isControlled: s
    }),
    [c, f, d, s]
  );
  return /* @__PURE__ */ o(lr.Provider, { value: p, children: /* @__PURE__ */ o("div", { className: E("w-full", a), children: n }) });
}
function eo(e) {
  const t = [];
  return Ne.Children.forEach(e, (r) => {
    if (!Ne.isValidElement(r)) return;
    if (r.type.displayName === "TabsTrigger") {
      const a = r.props.value;
      typeof a == "string" && t.push(a);
    }
  }), t;
}
function to({
  children: e,
  className: t,
  "aria-label": r,
  "aria-labelledby": n
}) {
  const { value: a, isControlled: s, onValueChange: i, listValuesRef: l } = ht("TabsList"), c = eo(e);
  l.current = c;
  const d = c.join("\0");
  return Oe(() => {
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
to.displayName = "TabsList";
const ro = oe(function({ value: t, children: r, className: n, disabled: a, onKeyDown: s, onClick: i, type: l = "button", ...c }, d) {
  const { value: u, onValueChange: f, baseId: p, listValuesRef: b } = ht("TabsTrigger"), m = u === t, g = `${p}-tab-${t}`, y = `${p}-panel-${t}`, S = (I) => {
    f(I), requestAnimationFrame(() => {
      var v;
      (v = document.getElementById(`${p}-tab-${I}`)) == null || v.focus();
    });
  }, h = (I) => {
    const v = document.getElementById(`${p}-tab-${I}`);
    return v == null || !v.disabled;
  }, z = (I) => {
    const v = b.current, O = v.indexOf(t);
    if (O < 0) return null;
    for (let C = 1; C <= v.length; C += 1) {
      const te = v[((O + I * C) % v.length + v.length) % v.length];
      if (te !== t && h(te)) return te;
    }
    return null;
  }, k = (I, v) => {
    const O = b.current;
    for (let C = I; C >= 0 && C < O.length; C += v)
      if (h(O[C])) return O[C];
    return null;
  }, x = (I) => {
    const v = z(I);
    v && S(v);
  }, $ = (I) => {
    if (s == null || s(I), I.defaultPrevented || a) return;
    const v = b.current;
    switch (I.key) {
      case "ArrowRight":
      case "ArrowDown":
        I.preventDefault(), x(1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        I.preventDefault(), x(-1);
        break;
      case "Home": {
        I.preventDefault();
        const O = k(0, 1);
        O && S(O);
        break;
      }
      case "End": {
        I.preventDefault();
        const O = k(v.length - 1, -1);
        O && S(O);
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
      id: g,
      "aria-selected": m,
      "aria-controls": y,
      tabIndex: m ? 0 : -1,
      disabled: a,
      className: E(
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
      onClick: (I) => {
        i == null || i(I), !I.defaultPrevented && !a && f(t);
      },
      onKeyDown: $,
      ...c,
      children: r
    }
  );
});
ro.displayName = "TabsTrigger";
function no({ value: e, children: t, className: r, forceMount: n = !1 }) {
  const { value: a, baseId: s } = ht("TabsContent"), i = a === e, l = `${s}-tab-${e}`, c = `${s}-panel-${e}`;
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
no.displayName = "TabsContent";
const cr = {
  compact: "px-3 py-2",
  // 12 / 8
  comfortable: "px-4 py-3",
  // 16 / 12
  spacious: "px-5 py-4"
  // 20 / 16
}, gt = Be("compact"), oo = oe(function({ className: t, striped: r, bordered: n, density: a = "compact", children: s, ...i }, l) {
  const c = /* @__PURE__ */ o(gt.Provider, { value: a, children: /* @__PURE__ */ o(
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
oo.displayName = "Table";
const ao = oe(function({ className: t, ...r }, n) {
  return /* @__PURE__ */ o(
    "thead",
    {
      ref: n,
      className: E(
        "border-b-[length:var(--border-width-hairline)] border-solid border-[var(--surface-container-stroke)] bg-[var(--surface-subtle)]",
        t
      ),
      ...r
    }
  );
});
ao.displayName = "TableHeader";
const so = oe(function({ className: t, ...r }, n) {
  return /* @__PURE__ */ o("tbody", { ref: n, className: E(t), ...r });
});
so.displayName = "TableBody";
const io = oe(function({ className: t, ...r }, n) {
  return /* @__PURE__ */ o(
    "tfoot",
    {
      ref: n,
      className: E(
        "border-t-[length:var(--border-width-hairline)] border-solid border-[var(--surface-container-stroke)] bg-[var(--surface-subtle)]",
        t
      ),
      ...r
    }
  );
});
io.displayName = "TableFooter";
const lo = oe(function({ className: t, ...r }, n) {
  return /* @__PURE__ */ o(
    "tr",
    {
      ref: n,
      className: E(
        "border-b-[length:var(--border-width-hairline)] border-solid border-[var(--surface-container-stroke)] transition-colors [transition-duration:var(--duration-normal)]",
        t
      ),
      ...r
    }
  );
});
lo.displayName = "TableRow";
const co = oe(function({ className: t, scope: r = "col", ...n }, a) {
  const s = _e(gt);
  return /* @__PURE__ */ o(
    "th",
    {
      ref: a,
      scope: r,
      className: E(
        cr[s],
        "text-left font-bold text-[var(--text-primary)]",
        t
      ),
      ...n
    }
  );
});
co.displayName = "TableHead";
const uo = oe(function({ className: t, ...r }, n) {
  const a = _e(gt);
  return /* @__PURE__ */ o(
    "td",
    {
      ref: n,
      className: E(
        cr[a],
        "align-middle text-secondary-800 dark:text-secondary-200",
        t
      ),
      ...r
    }
  );
});
uo.displayName = "TableCell";
const fo = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, Ke = (e) => e === "top" || e === "bottom";
function rt(e, t, r, n, a, s) {
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
function mo(e, t, r, n, a) {
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
function po(e, t, r, n, a) {
  return Ke(e) ? t === "start" ? r.left : t === "end" ? r.left + r.width - n : r.left + r.width / 2 - n / 2 : t === "start" ? r.top : t === "end" ? r.top + r.height - a : r.top + r.height / 2 - a / 2;
}
const Mt = (e, t, r) => r < t ? t : Math.min(Math.max(e, t), r);
function bo({
  anchor: e,
  floating: t,
  side: r = "bottom",
  align: n = "start",
  offset: a = 8,
  padding: s = 8,
  viewport: i,
  flip: l = !0
}) {
  const c = (i == null ? void 0 : i.width) ?? (typeof window < "u" ? window.innerWidth : 0), d = (i == null ? void 0 : i.height) ?? (typeof window < "u" ? window.innerHeight : 0), { width: u, height: f } = t;
  let p = r;
  const b = Ke(r) ? f : u, m = rt(r, e, c, d, a, s);
  if (l && m < b) {
    const z = fo[r];
    rt(z, e, c, d, a, s) > m && (p = z);
  }
  const g = mo(p, e, u, f, a), y = po(p, n, e, u, f), S = Ke(p) ? g : Mt(y, s, d - f - s), h = Ke(p) ? Mt(y, s, c - u - s) : g;
  return {
    top: S,
    left: h,
    side: p,
    align: n,
    available: Math.max(0, rt(p, e, c, d, a, s))
  };
}
const ho = typeof window < "u" ? Oe : G;
function go({
  open: e,
  anchorRef: t,
  floatingRef: r,
  side: n = "bottom",
  align: a = "start",
  offset: s = 8,
  padding: i = 8
}) {
  const [l, c] = V(null), d = Se(() => {
    const u = t.current, f = r.current;
    if (!u || !f) return;
    const p = u.getBoundingClientRect(), b = f.getBoundingClientRect(), m = bo({
      anchor: { top: p.top, left: p.left, width: p.width, height: p.height },
      floating: { width: b.width, height: b.height },
      side: n,
      align: a,
      offset: s,
      padding: i
    });
    c(
      (g) => g && g.top === m.top && g.left === m.left && g.side === m.side && g.available === m.available && g.anchorWidth === p.width ? g : { ...m, anchorWidth: p.width }
    );
  }, [t, r, n, a, s, i]);
  return ho(() => {
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
function xt({
  value: e,
  defaultValue: t,
  onChange: r
}) {
  const [n, a] = V(t), s = e !== void 0, i = s ? e : n, l = Z(r);
  l.current = r;
  const c = Z(i);
  c.current = i;
  const d = Se(
    (u) => {
      var f;
      Object.is(u, c.current) || (s || a(u), (f = l.current) == null || f.call(l, u));
    },
    [s]
  );
  return [i, d];
}
const xo = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function dr({
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
  autoFocus: f = !0,
  returnFocus: p = !0,
  matchAnchorWidth: b = !1,
  role: m = "dialog",
  "aria-label": g,
  "aria-labelledby": y,
  id: S,
  className: h,
  contentClassName: z,
  triggerWrapperClassName: k,
  portal: x = !1
}) {
  const [$, I] = xt({
    value: e,
    defaultValue: t,
    onChange: r
  }), v = ce(), O = S ?? `${v}-popover`, C = Z(null), te = Z(null), J = Z("programmatic"), ne = De(
    () => ({
      get current() {
        var _;
        return (a == null ? void 0 : a.current) ?? ((_ = C.current) == null ? void 0 : _.firstElementChild) ?? C.current;
      }
    }),
    [a]
  ), { position: W } = go({ open: $, anchorRef: ne, floatingRef: te, side: i, align: l, offset: c }), K = (_) => {
    J.current = _, I(!1);
  }, L = (_) => {
    var D, X, Y;
    return _ != null && (((D = te.current) == null ? void 0 : D.contains(_)) || ((X = C.current) == null ? void 0 : X.contains(_)) || ((Y = a == null ? void 0 : a.current) == null ? void 0 : Y.contains(_)) || !1);
  };
  G(() => {
    if (!$ || !d) return;
    const _ = (D) => {
      L(D.target) || K("outside");
    };
    return document.addEventListener("mousedown", _), () => document.removeEventListener("mousedown", _);
  }, [$, d]), G(() => {
    if (!$ || !u) return;
    const _ = (D) => {
      if (D.key !== "Escape") return;
      const X = D.target;
      (L(X) || X === document.body || X === document.documentElement) && K("escape");
    };
    return document.addEventListener("keydown", _), () => document.removeEventListener("keydown", _);
  }, [$, u]);
  const T = Z($);
  G(() => {
    var _;
    if ($ && !T.current && (J.current = "programmatic", f && te.current && (te.current.querySelector(xo) ?? te.current).focus({ preventScroll: !0 })), !$ && T.current && p) {
      const D = J.current, X = document.activeElement, Y = X == null || X === document.body;
      D !== "outside" && D !== "blur" && (Y || L(X)) && ((_ = ne.current) == null || _.focus({ preventScroll: !0 }));
    }
    T.current = $;
  }, [$]);
  const P = (_) => {
    const D = _.relatedTarget;
    D && !L(D) && K("blur");
  }, U = n && je(n) ? dt(
    n,
    {
      "aria-expanded": $,
      "aria-controls": $ ? O : void 0,
      "aria-haspopup": m === "dialog" ? "dialog" : void 0,
      onClick: (_) => {
        var D, X;
        (X = (D = n.props).onClick) == null || X.call(D, _), !_.defaultPrevented && ($ ? K("trigger") : I(!0));
      }
    }
  ) : null, w = (_) => x && typeof document < "u" ? Ir(_, document.body) : _, H = {
    position: "fixed",
    top: (W == null ? void 0 : W.top) ?? 0,
    left: (W == null ? void 0 : W.left) ?? 0,
    zIndex: "var(--z-index-popover)",
    minWidth: b && W ? W.anchorWidth : void 0,
    animationDuration: "var(--duration-fast)",
    // Exposed so content can cap its height to the room on the chosen side
    "--popover-available-height": W ? `${W.available}px` : void 0
  };
  return /* @__PURE__ */ N(pe, { children: [
    U && /* @__PURE__ */ o("span", { ref: C, className: E("inline-flex", k), children: U }),
    $ && w(
      /* @__PURE__ */ o(
        "div",
        {
          ref: te,
          id: O,
          role: m ?? void 0,
          "aria-label": m ? g : void 0,
          "aria-labelledby": m ? y : void 0,
          tabIndex: -1,
          "data-side": (W == null ? void 0 : W.side) ?? i,
          "data-align": l,
          onBlur: P,
          style: H,
          className: E(
            "w-max max-w-[calc(100vw-1rem)] plate-round p-px bg-[var(--surface-container-stroke)] focus:outline-none",
            "animate-in fade-in motion-reduce:animate-none",
            // Measured before it is shown, so it never flashes at 0,0
            W ? "opacity-100" : "opacity-0",
            h
          ),
          children: /* @__PURE__ */ o(
            "div",
            {
              className: E(
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
dr.displayName = "Popover";
const vo = (e, t) => e.label.toLowerCase().includes(t.trim().toLowerCase()), yo = oe(function({
  options: t,
  value: r,
  defaultValue: n = null,
  onValueChange: a,
  onInputChange: s,
  filter: i = vo,
  emptyText: l = "No matches",
  size: c = "md",
  label: d,
  helperText: u,
  errorMessage: f,
  error: p = !1,
  openOnFocus: b = !1,
  portal: m = !1,
  disabled: g = !1,
  placeholder: y,
  name: S,
  id: h,
  className: z,
  "aria-describedby": k,
  "aria-label": x,
  onKeyDown: $,
  onFocus: I,
  onBlur: v,
  ...O
}, C) {
  const te = se(c, "Combobox"), J = Ce({ error: p, helperText: u, errorMessage: f, describedBy: k }), ne = ce(), W = h ?? `${ne}-input`, K = `${ne}-listbox`, L = `${ne}-label`, T = `${ne}-empty`, P = (A) => `${ne}-option-${A}`, [U, w] = xt({
    value: r,
    defaultValue: n
  }), H = t.find((A) => A.value === U) ?? null, [_, D] = V(!1), [X, Y] = V((H == null ? void 0 : H.label) ?? ""), [ee, ue] = V(!1), [ie, Q] = V(-1), me = Z(null), ge = Z(null), xe = Z(null);
  G(() => {
    _ || Y((H == null ? void 0 : H.label) ?? "");
  }, [H == null ? void 0 : H.label, _]);
  const B = De(
    () => ee && X !== "" ? t.filter((A) => i(A, X)) : t,
    [ee, X, t, i]
  ), j = B.map((A, re) => A.disabled ? -1 : re).filter((A) => A >= 0), le = j[0] ?? -1, ve = j[j.length - 1] ?? -1, be = (A, re) => {
    if (j.length === 0) return -1;
    const he = j.indexOf(A);
    if (he === -1) return re === 1 ? le : ve;
    const ze = (he + re + j.length) % j.length;
    return j[ze];
  }, de = (A) => {
    if (g) return;
    D(!0);
    const re = H ? B.findIndex((he) => he.value === H.value && !he.disabled) : -1;
    Q(A === "selected" ? re >= 0 ? re : le : A === "first" ? le : A === "last" ? ve : -1);
  }, fe = () => {
    D(!1), ue(!1), Q(-1), Y((H == null ? void 0 : H.label) ?? "");
  }, Te = (A) => {
    w((A == null ? void 0 : A.value) ?? null), ((A == null ? void 0 : A.value) ?? null) !== U && (a == null || a((A == null ? void 0 : A.value) ?? null, A)), Y((A == null ? void 0 : A.label) ?? ""), ue(!1), D(!1), Q(-1);
  };
  G(() => {
    var re;
    if (!_ || ie < 0) return;
    const A = document.getElementById(P(ie));
    (re = A == null ? void 0 : A.scrollIntoView) == null || re.call(A, { block: "nearest" });
  }, [_, ie]);
  const Ye = (A) => {
    const re = A.target.value;
    if (Y(re), ue(!0), s == null || s(re), !g) {
      D(!0);
      const he = re === "" ? t : t.filter((ze) => i(ze, re));
      Q(he.findIndex((ze) => !ze.disabled));
    }
  }, xr = (A) => {
    if ($ == null || $(A), !(A.defaultPrevented || g))
      switch (A.key) {
        case "ArrowDown":
          A.preventDefault(), _ ? Q((re) => be(re, 1)) : de(A.altKey ? "none" : "selected");
          break;
        case "ArrowUp":
          A.preventDefault(), _ ? Q((re) => be(re, -1)) : de(H ? "selected" : "last");
          break;
        case "Home":
          _ && j.length && (A.preventDefault(), Q(le));
          break;
        case "End":
          _ && j.length && (A.preventDefault(), Q(ve));
          break;
        case "Enter":
          _ && ie >= 0 && B[ie] && !B[ie].disabled && (A.preventDefault(), Te(B[ie]));
          break;
        case "Escape":
          _ ? (A.preventDefault(), fe()) : (X !== "" || U != null) && (A.preventDefault(), Te(null));
          break;
        case "Tab":
          _ && fe();
          break;
      }
  }, vr = (A) => {
    ge.current = A, typeof C == "function" ? C(A) : C && (C.current = A);
  }, yt = {
    sm: { input: "h-control-sm pl-3 pr-9", icon: "right-3" },
    md: { input: "h-control-md pl-4 pr-10", icon: "right-4" },
    lg: { input: "h-control-lg pl-5 pr-11", icon: "right-5" }
  }[te], Ze = J.invalid, yr = Ze ? "bg-[var(--field-border-error)]" : "bg-[var(--field-border)] hover:bg-[var(--field-border-hover)] focus-within:!bg-[var(--field-border-focus)]", Ve = d != null && d !== "", wr = _ && ie >= 0 && B[ie] ? P(ie) : void 0;
  return /* @__PURE__ */ N("div", { className: E("w-full", z), children: [
    /* @__PURE__ */ N("div", { className: "w-full space-y-1", children: [
      Ve && /* @__PURE__ */ o(
        "label",
        {
          id: L,
          htmlFor: W,
          className: "block font-mono text-sm text-secondary-800 dark:text-secondary-200",
          children: d
        }
      ),
      /* @__PURE__ */ N(
        "div",
        {
          ref: me,
          className: E(
            "relative w-full plate-round p-px transition-colors [transition-duration:var(--duration-fast)]",
            yr,
            g && "opacity-50"
          ),
          children: [
            /* @__PURE__ */ o(
              "input",
              {
                ...O,
                ref: vr,
                id: W,
                type: "text",
                role: "combobox",
                autoComplete: "off",
                "aria-autocomplete": "list",
                "aria-expanded": _,
                "aria-controls": _ ? B.length > 0 ? K : T : void 0,
                "aria-activedescendant": wr,
                "aria-invalid": Ze || void 0,
                "aria-describedby": J.describedBy,
                "aria-label": Ve ? void 0 : x,
                disabled: g,
                placeholder: y,
                value: X,
                onChange: Ye,
                onKeyDown: xr,
                onClick: () => {
                  _ || de("selected");
                },
                onFocus: (A) => {
                  I == null || I(A), b && !_ && de("selected");
                },
                onBlur: (A) => {
                  v == null || v(A), _ && fe();
                },
                className: E(
                  "w-full plate-round font-mono text-sm",
                  "transition-colors [transition-duration:var(--duration-fast)]",
                  "placeholder:text-[var(--field-placeholder)] focus:outline-none disabled:cursor-not-allowed",
                  Ze ? "bg-[var(--field-background-error)] text-[var(--text-primary)]" : "bg-[var(--field-background)] text-[var(--text-primary)]",
                  yt.input
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
                  _ && "rotate-180",
                  yt.icon
                ),
                children: /* @__PURE__ */ o(q, { name: "ChevronDown" })
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ o(Me, { ...J.message })
    ] }),
    S != null && /* @__PURE__ */ o("input", { type: "hidden", name: S, value: U ?? "" }),
    /* @__PURE__ */ o(
      dr,
      {
        open: _,
        onOpenChange: (A) => {
          A || fe();
        },
        anchorRef: me,
        role: null,
        autoFocus: !1,
        returnFocus: !1,
        closeOnEscape: !1,
        matchAnchorWidth: !0,
        portal: m,
        offset: 4,
        contentClassName: "p-0",
        children: B.length > 0 ? /* @__PURE__ */ o(
          "ul",
          {
            ref: xe,
            id: K,
            role: "listbox",
            "aria-labelledby": Ve ? L : void 0,
            "aria-label": Ve ? void 0 : x,
            className: "max-h-[min(300px,var(--popover-available-height,300px))] overflow-y-auto py-1",
            children: B.map((A, re) => {
              const he = A.value === U, ze = re === ie;
              return /* @__PURE__ */ N(
                "li",
                {
                  id: P(re),
                  role: "option",
                  "aria-selected": he,
                  "aria-disabled": A.disabled || void 0,
                  onMouseDown: (kr) => kr.preventDefault(),
                  onMouseMove: () => {
                    !A.disabled && ie !== re && Q(re);
                  },
                  onClick: () => {
                    A.disabled || Te(A);
                  },
                  className: E(
                    "flex min-h-touch items-center gap-2 px-4 py-2 font-mono text-sm",
                    A.disabled ? "cursor-not-allowed text-[var(--text-disabled)]" : "cursor-pointer text-[var(--text-primary)]",
                    ze && !A.disabled && "bg-[var(--surface-subtle)]"
                  ),
                  children: [
                    /* @__PURE__ */ o("span", { className: "min-w-0 flex-1 truncate", children: A.label }),
                    he && /* @__PURE__ */ o(q, { name: "Check", className: "shrink-0 text-[var(--border-focus)]" })
                  ]
                },
                A.value
              );
            })
          }
        ) : /* @__PURE__ */ o("div", { id: T, role: "status", className: "px-4 py-3 font-mono text-sm text-[var(--text-secondary)]", children: l })
      }
    )
  ] });
});
yo.displayName = "Combobox";
const wo = {
  primary: "bg-primary-500 dark:bg-primary-400",
  success: "bg-success-600 dark:bg-success-400",
  warning: "bg-warning-600 dark:bg-warning-400",
  error: "bg-error-600 dark:bg-error-400"
}, ko = { sm: "h-2", md: "h-3", lg: "h-4" }, Rt = 4;
function No() {
  if (typeof window > "u" || typeof getComputedStyle != "function") return 120;
  const e = getComputedStyle(document.documentElement).getPropertyValue("--duration-fast").trim(), t = e.endsWith("ms") ? parseFloat(e) : e.endsWith("s") ? parseFloat(e) * 1e3 : NaN;
  return Number.isFinite(t) && t > 0 ? t : 120;
}
function So() {
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
function $o({
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
  const d = se(s, "ProgressBar"), u = ce(), f = e == null || Number.isNaN(e), p = t > 0 ? t : 100, b = f ? 0 : Math.min(Math.max(e, 0), p), m = Math.round(b / p * 100), g = Math.floor(b / p * l), y = So(), [S, h] = V(0);
  G(() => {
    if (!f || y) return;
    const k = window.setInterval(() => h((x) => (x + 1) % (l + Rt)), No());
    return () => window.clearInterval(k);
  }, [f, y, l]);
  const z = (k) => f ? y ? !0 : k > S - Rt - 1 && k <= S - 1 : k < g;
  return /* @__PURE__ */ N("div", { className: E("w-full space-y-1.5 font-mono", c), children: [
    n && /* @__PURE__ */ N("div", { className: "flex items-baseline justify-between gap-3 text-sm", children: [
      /* @__PURE__ */ o("span", { id: u, className: "min-w-0 truncate text-[var(--text-primary)]", children: r }),
      a && !f && /* @__PURE__ */ N("span", { className: "shrink-0 tabular-nums text-[var(--text-secondary)]", "aria-hidden": "true", children: [
        m,
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
        "aria-valuemax": p,
        "aria-valuenow": f ? void 0 : b,
        "aria-valuetext": f ? void 0 : `${m}%`,
        "data-state": f ? "indeterminate" : b >= p ? "complete" : "loading",
        className: "bg-[var(--border-default)] p-px",
        children: /* @__PURE__ */ o(
          "div",
          {
            className: E("flex gap-0.5 bg-[var(--surface-subtle)] p-0.5", ko[d]),
            "aria-hidden": "true",
            children: Array.from({ length: l }, (k, x) => /* @__PURE__ */ o(
              "span",
              {
                "data-filled": z(x) || void 0,
                className: E(
                  "h-full flex-1",
                  z(x) ? wo[i] : "bg-[var(--surface-muted)]",
                  f && y && "opacity-50"
                )
              },
              x
            ))
          }
        )
      }
    )
  ] });
}
$o.displayName = "ProgressBar";
const zo = { sm: "size-control-sm", md: "size-control-md", lg: "size-control-lg" }, Io = { animationTimingFunction: "steps(4, jump-none)" };
function _o({ variant: e = "text", lines: t = 1, size: r = "md", animated: n = !0, className: a }) {
  const s = se(r, "Skeleton"), i = n ? "animate-pulse motion-reduce:animate-none" : "", l = n ? Io : void 0;
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
        e === "avatar" ? zo[s] : "h-24 w-full",
        i,
        a
      )
    }
  );
}
_o.displayName = "Skeleton";
const Eo = {
  sm: { root: "gap-3 px-4 py-6", icon: "6", plate: "p-2", title: "text-sm", description: "text-xs", button: "sm" },
  md: { root: "gap-4 px-6 py-12", icon: "8", plate: "p-3", title: "text-lg", description: "text-sm", button: "md" }
};
function To({
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
  const d = Eo[s], u = (f, p) => /* @__PURE__ */ o(
    Fe,
    {
      variant: p,
      size: d.button,
      onClick: f.onClick,
      href: f.href,
      iconLeft: f.icon ? /* @__PURE__ */ o(q, { name: f.icon }) : void 0,
      children: f.label
    }
  );
  return /* @__PURE__ */ N("div", { className: E("flex flex-col items-center text-center font-mono", d.root, c), children: [
    e && /* @__PURE__ */ o("span", { className: E("inline-flex plate-round bg-[var(--surface-subtle)] text-[var(--text-secondary)]", d.plate), children: /* @__PURE__ */ o(q, { name: e, size: d.icon }) }),
    /* @__PURE__ */ N("div", { className: "flex max-w-prose flex-col gap-1", children: [
      /* @__PURE__ */ o(i, { className: E("font-medium text-[var(--text-primary)]", d.title), children: t }),
      r && /* @__PURE__ */ o("p", { className: E("text-[var(--text-secondary)]", d.description), children: r })
    ] }),
    (n || a) && /* @__PURE__ */ N("div", { className: "flex flex-wrap items-center justify-center gap-3", children: [
      n && u(n, "primary"),
      a && u(a, "secondary")
    ] }),
    l
  ] });
}
To.displayName = "EmptyState";
const ur = Be(null), fr = Be(null);
function mr(e) {
  const t = _e(ur);
  if (!t) throw new Error(`${e} must be used inside <Accordion>.`);
  return t;
}
function pr(e) {
  const t = _e(fr);
  if (!t) throw new Error(`${e} must be used inside <AccordionItem>.`);
  return t;
}
function Na(e) {
  const { children: t, headingLevel: r = 3, disabled: n = !1, className: a } = e, s = e.type === "multiple", i = Z(null), l = (m) => m === void 0 ? void 0 : Array.isArray(m) ? m : m === "" ? [] : [m], [c, d] = xt({
    value: l(e.value),
    defaultValue: l(e.defaultValue) ?? []
  }), u = (m) => {
    var g, y;
    d(m), s ? (g = e.onValueChange) == null || g.call(e, m) : (y = e.onValueChange) == null || y.call(e, m[0] ?? "");
  }, f = s || e.collapsible === !0, p = {
    isOpen: (m) => c.includes(m),
    isLocked: (m) => !f && c.includes(m),
    toggle: (m) => {
      if (c.includes(m)) {
        if (!f) return;
        u(c.filter((g) => g !== m));
      } else
        u(s ? [...c, m] : [m]);
    },
    headingLevel: r,
    disabled: n,
    rootRef: i
  }, b = (m) => {
    var z;
    const g = m.target;
    if (!g.hasAttribute("data-accordion-trigger")) return;
    const y = Array.from(
      ((z = i.current) == null ? void 0 : z.querySelectorAll("[data-accordion-trigger]:not(:disabled)")) ?? []
    ).filter((k) => k.closest("[data-accordion-root]") === i.current), S = y.indexOf(g);
    if (S === -1) return;
    let h = null;
    m.key === "ArrowDown" ? h = (S + 1) % y.length : m.key === "ArrowUp" ? h = (S - 1 + y.length) % y.length : m.key === "Home" ? h = 0 : m.key === "End" && (h = y.length - 1), h !== null && (m.preventDefault(), y[h].focus());
  };
  return /* @__PURE__ */ o(ur.Provider, { value: p, children: /* @__PURE__ */ o(
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
function Sa({ value: e, disabled: t = !1, children: r, className: n }) {
  const a = mr("AccordionItem"), s = ce(), i = a.isOpen(e), l = {
    value: e,
    open: i,
    disabled: t || a.disabled,
    triggerId: `${s}-trigger`,
    contentId: `${s}-content`
  };
  return /* @__PURE__ */ o(fr.Provider, { value: l, children: /* @__PURE__ */ o("div", { "data-state": i ? "open" : "closed", className: E("border-b border-[var(--border-hairline)]", n), children: r }) });
}
function $a({ children: e, className: t }) {
  const r = mr("AccordionTrigger"), n = pr("AccordionTrigger"), a = `h${r.headingLevel}`, s = r.isLocked(n.value);
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
          q,
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
function za({ children: e, className: t }) {
  const r = pr("AccordionContent");
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
const Ao = "focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]";
function Co({
  items: e,
  maxItems: t,
  itemsBeforeCollapse: r = 1,
  itemsAfterCollapse: n = 1,
  expandLabel: a = (l) => `Show ${l} more breadcrumb${l === 1 ? "" : "s"}`,
  "aria-label": s = "Breadcrumb",
  className: i
}) {
  const [l, c] = V(!1), d = Z(null), u = Z(null), f = Math.max(0, r), p = Math.max(1, n), b = !l && t != null && e.length > t && e.length > f + p, m = b ? e.length - f - p : 0;
  G(() => {
    var z;
    if (!l || u.current == null) return;
    const h = (z = d.current) == null ? void 0 : z.querySelector(
      `[data-crumb-index="${u.current}"] a, [data-crumb-index="${u.current}"] [data-crumb-link]`
    );
    h == null || h.focus(), u.current = null;
  }, [l]);
  const g = e.length - 1, y = (h, z, k) => /* @__PURE__ */ N(
    "li",
    {
      "data-crumb-index": z,
      className: "inline-flex min-w-0 items-center",
      children: [
        k && /* @__PURE__ */ o(q, { name: "ChevronRight", size: "3", className: "mx-1 shrink-0 text-[var(--text-secondary)]" }),
        z === g ? /* @__PURE__ */ o(
          "span",
          {
            "aria-current": "page",
            className: "inline-flex min-h-touch min-w-0 items-center truncate px-1 text-[var(--text-primary)]",
            children: h.label
          }
        ) : h.as ? /* @__PURE__ */ o(
          lt,
          {
            variant: "quiet",
            as: h.as,
            asProps: { ...h.asProps, "data-crumb-link": "" },
            className: "inline-flex min-h-touch min-w-0 items-center truncate px-1",
            children: h.label
          }
        ) : /* @__PURE__ */ o(
          lt,
          {
            variant: "quiet",
            href: h.href ?? "#",
            className: "inline-flex min-h-touch min-w-0 items-center truncate px-1",
            children: h.label
          }
        )
      ]
    },
    h.key ?? z
  );
  let S;
  if (b) {
    const h = e.slice(0, f), z = e.slice(e.length - p);
    S = /* @__PURE__ */ N(pe, { children: [
      h.map((k, x) => y(k, x, x > 0)),
      /* @__PURE__ */ N("li", { className: "inline-flex items-center", children: [
        f > 0 && /* @__PURE__ */ o(q, { name: "ChevronRight", size: "3", className: "mx-1 shrink-0 text-[var(--text-secondary)]" }),
        /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            "aria-label": a(m),
            onClick: () => {
              u.current = f, c(!0);
            },
            className: E(
              "plate-round inline-flex h-touch min-w-touch items-center justify-center px-2 text-[var(--text-primary)]",
              "transition-colors [transition-duration:var(--duration-fast)] motion-reduce:transition-none hover:bg-[var(--surface-muted)]",
              Ao
            ),
            children: /* @__PURE__ */ o("span", { "aria-hidden": "true", children: "..." })
          }
        )
      ] }),
      z.map((k, x) => y(k, e.length - p + x, !0))
    ] });
  } else
    S = e.map((h, z) => y(h, z, z > 0));
  return /* @__PURE__ */ o("nav", { "aria-label": s, className: E("font-mono text-sm", i), children: /* @__PURE__ */ o("ol", { ref: d, className: "flex min-w-0 flex-wrap items-center", children: S }) });
}
Co.displayName = "Breadcrumbs";
const nt = (e, t) => t < e ? [] : Array.from({ length: t - e + 1 }, (r, n) => e + n);
function Mo(e, t, r = 1, n = 1) {
  if (t <= 0) return [];
  const a = Math.min(Math.max(1, e), t), s = nt(1, Math.min(n, t)), i = nt(Math.max(t - n + 1, n + 1), t), l = Math.max(
    Math.min(a - r, t - n - r * 2 - 1),
    n + 2
  ), c = Math.min(
    Math.max(a + r, n + r * 2 + 2),
    i.length > 0 ? i[0] - 2 : t - 1
  ), d = [...s];
  l > n + 2 ? d.push("ellipsis-start") : n + 1 < t - n && d.push(n + 1), d.push(...nt(l, c)), c < t - n - 1 ? d.push("ellipsis-end") : t - n > n && d.push(t - n), d.push(...i);
  const u = /* @__PURE__ */ new Set();
  return d.filter((f) => typeof f == "number" && (f < 1 || f > t) || u.has(f) ? !1 : (u.add(f), !0));
}
const Ro = {
  sm: "h-control-sm min-w-control-sm px-2 text-sm",
  md: "h-control-md min-w-control-md px-2.5 text-sm",
  lg: "h-control-lg min-w-control-lg px-3 text-base"
}, br = {
  sm: "min-h-touch min-w-touch",
  md: "min-h-touch min-w-touch",
  lg: "min-h-control-lg min-w-control-lg"
}, Lt = { sm: "4", md: "4", lg: "5" };
function ot({
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
        br[e],
        r ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      ),
      children: /* @__PURE__ */ o(
        "span",
        {
          className: E(
            "plate-round inline-flex items-center justify-center tabular-nums",
            "transition-colors [transition-duration:var(--duration-fast)] motion-reduce:transition-none",
            "group-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]",
            Ro[e],
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
function Lo({
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
  "aria-label": f = "Pagination",
  className: p
}) {
  const b = se(i, "Pagination"), [m, g] = V(t), y = e !== void 0, h = Math.min(Math.max(1, y ? e : m), Math.max(1, r));
  if (r <= 0) return null;
  const z = (x) => {
    const $ = Math.min(Math.max(1, x), r);
    $ !== h && (y || g($), n == null || n($));
  }, k = Mo(h, r, a, s);
  return /* @__PURE__ */ o("nav", { "aria-label": f, className: E("font-mono", p), children: /* @__PURE__ */ N("ul", { className: "flex flex-wrap items-center", children: [
    l && /* @__PURE__ */ o("li", { children: /* @__PURE__ */ o(ot, { size: b, label: d, disabled: h <= 1, onClick: () => z(h - 1), children: /* @__PURE__ */ o(q, { name: "ArrowLeft", size: Lt[b] }) }) }),
    k.map(
      (x) => typeof x == "number" ? /* @__PURE__ */ o("li", { children: /* @__PURE__ */ o(
        ot,
        {
          size: b,
          current: x === h,
          label: c(x),
          onClick: () => z(x),
          children: x
        }
      ) }, x) : /* @__PURE__ */ o(
        "li",
        {
          "aria-hidden": "true",
          className: E(
            "inline-flex items-center justify-center text-[var(--text-secondary)]",
            br[b],
            b === "lg" ? "text-base" : "text-sm"
          ),
          children: "..."
        },
        x
      )
    ),
    l && /* @__PURE__ */ o("li", { children: /* @__PURE__ */ o(ot, { size: b, label: u, disabled: h >= r, onClick: () => z(h + 1), children: /* @__PURE__ */ o(q, { name: "ArrowRight", size: Lt[b] }) }) })
  ] }) });
}
Lo.displayName = "Pagination";
const vt = Be({ collapsed: !1 });
function Po({ "aria-label": e, collapsed: t = !1, children: r, className: n }) {
  const a = Ne.Children.toArray(r).some(
    (s) => Ne.isValidElement(s) && s.type === hr
  );
  return /* @__PURE__ */ o(vt.Provider, { value: { collapsed: t }, children: /* @__PURE__ */ o(
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
Po.displayName = "SideNav";
function hr({ heading: e, children: t, className: r }) {
  const { collapsed: n } = _e(vt), a = ce();
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
hr.displayName = "SideNavSection";
const Do = "plate-round flex w-full min-h-touch items-center gap-3 px-3 py-2 text-left font-mono text-sm transition-colors [transition-duration:var(--duration-fast)] motion-reduce:transition-none focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]", Oo = "text-[var(--text-secondary)] hover:bg-[var(--surface-muted)] hover:text-[var(--accent)]", jo = "bg-[var(--surface-muted)] text-[var(--accent)]";
function gr(e) {
  let t = !1;
  return Ne.Children.forEach(e, (r) => {
    if (t || !Ne.isValidElement(r)) return;
    const n = r.props;
    (n.active || gr(n.children)) && (t = !0);
  }), t;
}
function Bo({
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
  onExpandedChange: f,
  className: p
}) {
  const { collapsed: b } = _e(vt), m = ce(), g = Ne.Children.toArray(c).some(Ne.isValidElement), [y, S] = V(
    () => u ?? (g && gr(c))
  ), h = d ?? y, z = () => {
    const v = !h;
    d === void 0 && S(v), f == null || f(v);
  }, k = /* @__PURE__ */ N(pe, { children: [
    t && /* @__PURE__ */ o(q, { name: t, className: "shrink-0" }),
    /* @__PURE__ */ o("span", { className: E("min-w-0 flex-1 truncate", b && "sr-only"), children: e }),
    !b && l && /* @__PURE__ */ o("span", { className: "ml-auto shrink-0", children: l }),
    g && /* @__PURE__ */ o(
      q,
      {
        name: h ? "ChevronDown" : "ChevronRight",
        size: b ? "3" : "4",
        className: E("shrink-0", !b && "ml-auto")
      }
    )
  ] }), x = E(Do, r ? jo : Oo, b && "min-w-touch justify-center gap-1 px-2", p), $ = b ? { "aria-label": e } : {};
  let I;
  return g ? I = /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      "aria-expanded": h,
      "aria-controls": m,
      onClick: z,
      className: x,
      ...$,
      children: k
    }
  ) : s ? I = /* @__PURE__ */ o(
    s,
    {
      className: x,
      "aria-current": r ? "page" : void 0,
      onClick: a,
      ...$,
      ...i,
      children: k
    }
  ) : n != null ? I = /* @__PURE__ */ o(
    "a",
    {
      href: n,
      "aria-current": r ? "page" : void 0,
      onClick: a,
      className: x,
      ...$,
      children: k
    }
  ) : I = /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      "aria-current": r ? "page" : void 0,
      onClick: a,
      className: x,
      ...$,
      children: k
    }
  ), /* @__PURE__ */ N("li", { children: [
    b ? /* @__PURE__ */ o(Dn, { content: e, position: "right", children: I }) : I,
    g && h && /* @__PURE__ */ o("ul", { id: m, className: E("mt-1 space-y-1", !b && "ml-6"), children: c })
  ] });
}
Bo.displayName = "SideNavItem";
function Fo({
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
  const f = ce(), [p, b] = V(i), m = s ?? p, g = n ?? t, y = (S) => {
    s === void 0 && b(S), l == null || l(S);
  };
  return /* @__PURE__ */ N(
    "header",
    {
      className: E(
        "w-full border-b border-[var(--border-hairline)] bg-[var(--surface-container)] font-mono text-sm text-[var(--text-primary)]",
        a && "sticky top-0 z-[var(--z-index-sticky)]",
        u
      ),
      children: [
        /* @__PURE__ */ N("div", { className: "flex min-h-control-lg items-center gap-4 px-4 py-1", children: [
          /* @__PURE__ */ o("div", { className: "flex shrink-0 items-center", children: e }),
          t && /* @__PURE__ */ o("nav", { "aria-label": d, className: "hidden min-w-0 flex-1 md:block", children: /* @__PURE__ */ o("div", { className: "flex flex-wrap items-center gap-4", children: t }) }),
          /* @__PURE__ */ N("div", { className: "ml-auto flex shrink-0 items-center gap-2", children: [
            r,
            g && /* @__PURE__ */ o(
              Fe,
              {
                variant: "ghost",
                size: "lg",
                "aria-label": c,
                "aria-expanded": m,
                "aria-controls": f,
                onClick: () => y(!m),
                className: "min-w-touch md:hidden",
                children: /* @__PURE__ */ o(q, { name: m ? "X" : "Menu", size: "5" })
              }
            )
          ] })
        ] }),
        g && m && /* @__PURE__ */ o("div", { id: f, className: "border-t border-[var(--border-hairline)] px-4 py-3 md:hidden", children: /* @__PURE__ */ o("nav", { "aria-label": d, children: /* @__PURE__ */ o("div", { className: "flex flex-col items-start gap-1", children: g }) }) })
      ]
    }
  );
}
Fo.displayName = "AppHeader";
function Vo({
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
      className: E(
        "plate-round-lg flex flex-col p-px",
        u ? "bg-[var(--accent)]" : "bg-[var(--surface-container-stroke)]",
        l
      ),
      children: /* @__PURE__ */ N("div", { className: "plate-round-lg flex min-h-0 flex-1 flex-col bg-[var(--surface-card)] font-mono", children: [
        /* @__PURE__ */ N(
          "div",
          {
            className: E(
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
Vo.displayName = "Window";
const Go = {
  info: { icon: "Info", tag: "INFO", tone: "text-info-700 dark:text-info-400" },
  warn: { icon: "AlertTriangle", tag: "WARN", tone: "text-warning-700 dark:text-warning-400" },
  error: { icon: "AlertCircle", tag: "ERROR", tone: "text-error-700 dark:text-error-400" },
  debug: { icon: "Settings", tag: "DEBUG", tone: "text-secondary-700 dark:text-secondary-400" }
}, Uo = 8;
function Ho({
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
  const d = Z(null), [u, f] = V(!0), [p, b] = V(0), m = Z(e.length), g = Se(
    (x) => {
      f(($) => ($ !== x && (l == null || l(x)), x));
    },
    [l]
  ), y = Se(() => {
    const x = d.current;
    x && (x.scrollTop = x.scrollHeight);
  }, []);
  Oe(() => {
    const x = e.length - m.current;
    m.current = e.length, t && (u ? y() : x > 0 && b(($) => $ + x));
  }, [e, t, u, y]);
  const S = () => {
    const x = d.current;
    if (!x || !t) return;
    const $ = x.scrollHeight - x.scrollTop - x.clientHeight <= Uo;
    g($), $ && b(0);
  }, h = () => {
    b(0), g(!0), y();
  }, z = e.some((x) => x.level), k = `${String(Math.max(e.length, 1)).length}ch`;
  return /* @__PURE__ */ N(
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
            onScroll: S,
            className: E(
              "min-h-0 flex-1 overflow-auto py-2 font-mono text-xs leading-relaxed text-[var(--text-primary)]",
              i && "plate-round-lg bg-[var(--surface-page)]",
              "focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]"
            ),
            children: e.length === 0 ? /* @__PURE__ */ o("p", { className: "px-3 text-[var(--text-secondary)]", children: s }) : e.map((x, $) => {
              const I = x.level ? Go[x.level] : null;
              return /* @__PURE__ */ N(
                "div",
                {
                  "data-level": x.level,
                  className: E("flex gap-3 px-3", n ? "items-start" : "w-max min-w-full items-start"),
                  children: [
                    r && /* @__PURE__ */ o(
                      "span",
                      {
                        "aria-hidden": "true",
                        className: "shrink-0 select-none text-right tabular-nums text-[var(--text-secondary)]",
                        style: { minWidth: k },
                        children: $ + 1
                      }
                    ),
                    x.timestamp && /* @__PURE__ */ o("span", { className: "shrink-0 tabular-nums text-[var(--text-secondary)]", children: x.timestamp }),
                    I ? /* @__PURE__ */ N("span", { className: E("inline-flex w-16 shrink-0 items-center gap-1 font-bold", I.tone), children: [
                      /* @__PURE__ */ o(q, { name: I.icon, size: "3", className: "shrink-0" }),
                      I.tag
                    ] }) : z && /* @__PURE__ */ o("span", { "aria-hidden": "true", className: "w-16 shrink-0" }),
                    /* @__PURE__ */ o("span", { className: E("min-w-0 flex-1", n ? "whitespace-pre-wrap break-words" : "whitespace-pre"), children: x.text })
                  ]
                },
                x.id
              );
            })
          }
        ),
        t && !u && /* @__PURE__ */ o("div", { className: "pointer-events-none absolute inset-x-0 bottom-3 flex justify-center", children: /* @__PURE__ */ o(
          Fe,
          {
            variant: "secondary",
            size: "sm",
            onClick: h,
            iconLeft: /* @__PURE__ */ o(q, { name: "ChevronDown", size: "4" }),
            className: "pointer-events-auto",
            children: p > 0 ? `Jump to latest (${p} new)` : "Jump to latest"
          }
        ) })
      ]
    }
  );
}
Ho.displayName = "LogView";
const Wo = {
  neutral: "text-[var(--text-primary)]",
  primary: "bg-[var(--button-primary-background)] text-[var(--button-primary-text)] font-bold",
  success: "bg-success-50 text-success-800 dark:bg-success-950 dark:text-success-300",
  warning: "bg-warning-50 text-warning-800 dark:bg-warning-950 dark:text-warning-300",
  error: "bg-error-50 text-error-800 dark:bg-error-950 dark:text-error-300",
  info: "bg-info-50 text-info-800 dark:bg-info-950 dark:text-info-300"
};
function Ko({
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
Ko.displayName = "StatusLine";
function qo({ icon: e, tone: t = "neutral", children: r, className: n }) {
  return /* @__PURE__ */ N(
    "span",
    {
      "data-tone": t,
      className: E("inline-flex min-w-0 items-center gap-1.5 whitespace-nowrap px-3", Wo[t], n),
      children: [
        e && /* @__PURE__ */ o(q, { name: e, size: "3", className: "shrink-0" }),
        /* @__PURE__ */ o("span", { className: "truncate", children: r })
      ]
    }
  );
}
qo.displayName = "StatusLineSegment";
function Xo({ items: e, layout: t = "inline", leader: r = !1, className: n }) {
  const a = t === "inline";
  return /* @__PURE__ */ o(
    "dl",
    {
      "data-layout": t,
      className: E("font-mono text-sm", a ? "space-y-1" : "space-y-3", n),
      children: e.map((s, i) => /* @__PURE__ */ N(
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
Xo.displayName = "DescriptionList";
function Yo({
  value: e,
  min: t = 0,
  max: r = 100,
  low: n,
  high: a,
  optimum: s
}) {
  if (n == null && a == null && s == null) return "primary";
  const i = Math.min(Math.max(n ?? t, t), r), l = Math.min(Math.max(a ?? r, i), r), c = s ?? (t + r) / 2, d = (f) => f < i ? 0 : f > l ? 2 : 1, u = Math.abs(d(Math.min(Math.max(e, t), r)) - d(c));
  return u === 0 ? "success" : u === 1 ? "warning" : "error";
}
const Zo = {
  primary: "bg-primary-600 dark:bg-primary-400",
  success: "bg-success-600 dark:bg-success-400",
  warning: "bg-warning-600 dark:bg-warning-400",
  error: "bg-error-600 dark:bg-error-400"
};
function Jo({
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
  className: f
}) {
  const p = se(u, "Meter"), b = ce(), m = r - t || 1, g = Math.min(Math.max(e, t), r), y = (g - t) / m, S = l ?? `${Math.round(y * 100)}%`, h = c ?? Yo({ value: e, min: t, max: r, low: n, high: a, optimum: s }), z = Math.max(1, Math.round(d)), k = Math.round(y * z);
  return /* @__PURE__ */ N("div", { className: E("font-mono text-sm", f), "data-tone": h, children: [
    /* @__PURE__ */ N("div", { className: "mb-1 flex items-baseline justify-between gap-3", children: [
      /* @__PURE__ */ o("span", { id: b, className: "text-[var(--text-primary)]", children: i }),
      /* @__PURE__ */ N("span", { className: "inline-flex items-center gap-1 tabular-nums text-[var(--text-secondary)]", children: [
        h === "warning" && /* @__PURE__ */ o(q, { name: "AlertTriangle", size: "3" }),
        h === "error" && /* @__PURE__ */ o(q, { name: "AlertCircle", size: "3" }),
        S
      ] })
    ] }),
    /* @__PURE__ */ o(
      "div",
      {
        role: "meter",
        "aria-labelledby": b,
        "aria-valuenow": g,
        "aria-valuemin": t,
        "aria-valuemax": r,
        "aria-valuetext": S,
        className: "flex gap-0.5",
        children: Array.from({ length: z }, (x, $) => /* @__PURE__ */ o(
          "span",
          {
            "data-filled": $ < k || void 0,
            className: E(
              "flex-1",
              p === "sm" ? "h-2" : "h-3",
              $ < k ? Zo[h] : "bg-[var(--surface-muted)] ring-1 ring-inset ring-[var(--surface-container-stroke)]"
            )
          },
          $
        ))
      }
    )
  ] });
}
Jo.displayName = "Meter";
function Qo(e) {
  return e.textValue ? e.textValue : typeof e.label == "string" || typeof e.label == "number" ? String(e.label) : "";
}
const ea = "plate-round flex min-h-touch cursor-pointer items-center gap-2 py-1 pr-3 font-mono text-sm pl-[calc(var(--tree-level)_*_theme(spacing.4)_+_theme(spacing.2))] transition-colors [transition-duration:var(--duration-fast)] motion-reduce:transition-none";
function ta({
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
  className: f
}) {
  var L;
  const [p, b] = V(a), m = n ?? p, g = De(() => new Set(m), [m]), [y, S] = V(l), h = i !== void 0 ? i : y, [z, k] = V(null), x = Z(/* @__PURE__ */ new Map()), $ = Z(!1), I = Z({ buffer: "", timer: 0 }), v = De(() => {
    const T = [], P = (U, w, H) => {
      for (const _ of U) {
        const D = Array.isArray(_.children);
        T.push({ node: _, level: w, parentId: H, isBranch: D }), D && g.has(_.id) && P(_.children, w + 1, _.id);
      }
    };
    return P(e, 1, null), T;
  }, [e, g]), O = z && v.some((T) => T.node.id === z) && z || h && v.some((T) => T.node.id === h) && h || ((L = v[0]) == null ? void 0 : L.node.id) || null;
  G(() => {
    var T;
    !$.current || !z || ($.current = !1, (T = x.current.get(z)) == null || T.focus());
  }, [z, v]), G(() => () => clearTimeout(I.current.timer), []);
  const C = (T) => {
    var P;
    T && ($.current = !0, k(T), T === z && ((P = x.current.get(T)) == null || P.focus()));
  }, te = Se(
    (T, P) => {
      if (g.has(T) === P) return;
      const w = P ? [...m, T] : m.filter((H) => H !== T);
      n === void 0 && b(w), s == null || s(w);
    },
    [g, m, n, s]
  ), J = (T) => {
    T.node.disabled || h !== T.node.id && (i === void 0 && S(T.node.id), c == null || c(T.node.id));
  }, ne = (T, P) => {
    const U = I.current;
    clearTimeout(U.timer), U.buffer += T.toLowerCase(), U.timer = setTimeout(() => {
      U.buffer = "";
    }, 500);
    const w = v.length, H = U.buffer.length === 1 ? P + 1 : P;
    for (let _ = 0; _ < w; _++) {
      const D = v[(H + _) % w];
      if (Qo(D.node).toLowerCase().startsWith(U.buffer)) {
        C(D.node.id);
        return;
      }
    }
  }, W = (T, P) => {
    var H, _, D, X, Y;
    if (T.target !== T.currentTarget) return;
    const U = v.findIndex((ee) => ee.node.id === P.node.id), w = g.has(P.node.id);
    switch (T.key) {
      case "ArrowDown":
        T.preventDefault(), C((H = v[U + 1]) == null ? void 0 : H.node.id);
        break;
      case "ArrowUp":
        T.preventDefault(), C((_ = v[U - 1]) == null ? void 0 : _.node.id);
        break;
      case "ArrowRight":
        if (T.preventDefault(), !P.isBranch) break;
        w ? ((D = v[U + 1]) == null ? void 0 : D.parentId) === P.node.id && C(v[U + 1].node.id) : te(P.node.id, !0);
        break;
      case "ArrowLeft":
        T.preventDefault(), P.isBranch && w ? te(P.node.id, !1) : P.parentId && C(P.parentId);
        break;
      case "Home":
        T.preventDefault(), C((X = v[0]) == null ? void 0 : X.node.id);
        break;
      case "End":
        T.preventDefault(), C((Y = v[v.length - 1]) == null ? void 0 : Y.node.id);
        break;
      case "Enter":
        T.preventDefault(), J(P), P.node.disabled || d == null || d(P.node.id);
        break;
      case " ":
        T.preventDefault(), J(P);
        break;
      default:
        u && T.key.length === 1 && !T.ctrlKey && !T.metaKey && !T.altKey && /\S/.test(T.key) && (T.preventDefault(), ne(T.key, U));
    }
  }, K = (T, P, U) => T.map((w, H) => {
    const _ = Array.isArray(w.children), D = _ && g.has(w.id), X = h === w.id, Y = { node: w, parentId: U, isBranch: _ };
    return /* @__PURE__ */ N(
      "li",
      {
        ref: (ee) => {
          ee ? x.current.set(w.id, ee) : x.current.delete(w.id);
        },
        role: "treeitem",
        "aria-level": P,
        "aria-setsize": T.length,
        "aria-posinset": H + 1,
        "aria-expanded": _ ? D : void 0,
        "aria-selected": X,
        "aria-disabled": w.disabled || void 0,
        tabIndex: O === w.id ? 0 : -1,
        onKeyDown: (ee) => W(ee, Y),
        onFocus: (ee) => {
          ee.target === ee.currentTarget && k(w.id);
        },
        className: "focus:outline-none [&:focus-visible>div]:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]",
        children: [
          /* @__PURE__ */ N(
            "div",
            {
              style: { "--tree-level": P - 1 },
              onClick: (ee) => {
                ee.stopPropagation(), C(w.id), J(Y), _ && te(w.id, !D), !w.disabled && !_ && (d == null || d(w.id));
              },
              className: E(
                ea,
                X ? "bg-[var(--surface-muted)] text-[var(--accent)]" : "text-[var(--text-primary)] hover:bg-[var(--surface-muted)]",
                w.disabled && "cursor-not-allowed opacity-50"
              ),
              children: [
                /* @__PURE__ */ o("span", { className: "inline-flex w-4 shrink-0 justify-center text-[var(--text-secondary)]", children: _ && /* @__PURE__ */ o(q, { name: D ? "ChevronDown" : "ChevronRight", size: "3" }) }),
                w.icon && /* @__PURE__ */ o(q, { name: w.icon, className: "shrink-0" }),
                /* @__PURE__ */ o("span", { className: "min-w-0 truncate", children: w.label })
              ]
            }
          ),
          _ && D && w.children.length > 0 && /* @__PURE__ */ o("ul", { role: "group", children: K(w.children, P + 1, w.id) })
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
      className: E("font-mono text-sm", f),
      children: K(e, 1, null)
    }
  );
}
ta.displayName = "TreeView";
const ra = {
  sm: "h-5 min-w-5 px-1.5 text-xs",
  md: "h-6 min-w-6 px-2 text-sm"
};
function Pt({ size: e, children: t, className: r }) {
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
            ra[e]
          ),
          children: t
        }
      )
    }
  );
}
function na({ keys: e, children: t, size: r = "sm", separator: n = "+", className: a }) {
  const s = se(r, "Kbd", "sm");
  return !e || e.length <= 1 ? /* @__PURE__ */ o(Pt, { size: s, className: a, children: (e == null ? void 0 : e[0]) ?? t }) : /* @__PURE__ */ o("kbd", { className: E("inline-flex items-center gap-1 align-middle font-mono", a), children: e.map((i, l) => /* @__PURE__ */ N(ut, { children: [
    l > 0 && /* @__PURE__ */ o("span", { className: E("text-[var(--text-secondary)]", s === "sm" ? "text-xs" : "text-sm"), children: n }),
    /* @__PURE__ */ o(Pt, { size: s, children: i })
  ] }, `${i}-${l}`)) });
}
na.displayName = "Kbd";
const oa = {
  none: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8"
}, aa = oe(function({ children: t, gap: r = "4", className: n, axis: a = "vertical", ...s }, i) {
  return /* @__PURE__ */ o(
    "div",
    {
      ref: i,
      className: E(
        "flex",
        a === "vertical" ? "flex-col" : "flex-row flex-wrap items-center",
        oa[r],
        n
      ),
      ...s,
      children: t
    }
  );
});
aa.displayName = "Stack";
function Ia({ children: e, ...t }) {
  return /* @__PURE__ */ o(
    zr,
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
  Na as Accordion,
  za as AccordionContent,
  Sa as AccordionItem,
  $a as AccordionTrigger,
  pa as Alert,
  Fo as AppHeader,
  Cn as Avatar,
  ma as Badge,
  ya as BottomSheet,
  Co as Breadcrumbs,
  Fe as Button,
  fa as Card,
  ga as CaseStudyBlocks,
  jn as Checkbox,
  yo as Combobox,
  Xo as DescriptionList,
  ba as Divider,
  ha as Dropdown,
  To as EmptyState,
  _n as Input,
  na as Kbd,
  lt as Link,
  Kn as ListRow,
  Ho as LogView,
  Jo as Meter,
  ua as Modal,
  Lo as Pagination,
  dr as Popover,
  $o as ProgressBar,
  Vn as Radio,
  On as Select,
  Po as SideNav,
  Bo as SideNavItem,
  hr as SideNavSection,
  _o as Skeleton,
  Fn as Slider,
  er as Spinner,
  aa as Stack,
  Ko as StatusLine,
  qo as StatusLineSegment,
  rr as Switch,
  da as TUI_ICON_GLYPHS,
  oo as Table,
  so as TableBody,
  uo as TableCell,
  io as TableFooter,
  co as TableHead,
  ao as TableHeader,
  lo as TableRow,
  ka as Tabs,
  no as TabsContent,
  to as TabsList,
  ro as TabsTrigger,
  Gn as Textarea,
  Ia as ThemeProvider,
  wa as ThemeToggle,
  Yn as Toast,
  va as Toaster,
  Dn as Tooltip,
  ta as TreeView,
  q as TuiIcon,
  Vo as Window,
  E as cn,
  Yo as getMeterTone,
  Mo as getPaginationRange,
  Qn as toast,
  xa as useToast
};
//# sourceMappingURL=index.esm.js.map

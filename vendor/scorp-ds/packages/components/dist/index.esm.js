import { jsxs as v, jsx as n, Fragment as re } from "react/jsx-runtime";
import Ae, { forwardRef as j, useEffect as P, useId as fe, useRef as U, useState as G, useImperativeHandle as lt, createContext as De, useContext as Le, useCallback as ct, useMemo as dt, useLayoutEffect as ut } from "react";
import { useTheme as mt, ThemeProvider as ft } from "next-themes";
const Oe = j(
  ({
    variant: e = "primary",
    size: t = "medium",
    disabled: r = !1,
    className: o = "",
    children: a,
    iconLeft: s,
    iconRight: i,
    href: c,
    target: l,
    rel: d,
    "aria-label": u,
    "aria-labelledby": m,
    ...h
  }, k) => {
    const w = `
      inline-flex items-center justify-center
      font-mono text-sm
      transition-colors [transition-duration:var(--duration-fast)]
      cursor-pointer
      disabled:cursor-not-allowed disabled:opacity-50
      focus:outline-none
      focus-visible:![box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--btn-ring)]
    `, N = () => e === "icon" ? !0 : !a || typeof a == "string" || typeof a == "number" ? !1 : typeof a == "object" && a !== null && "type" in a ? typeof a.type < "u" : Array.isArray(a) ? a.every(
      (C) => typeof C == "object" && C !== null && "type" in C
    ) : !1;
    P(() => {
      if (process.env.NODE_ENV === "production" || !(e === "icon" || N())) return;
      u != null && String(u).trim() !== "" || m != null && String(m).trim() !== "" || console.warn(
        "[@scorp-ds/components] Button: icon-only buttons should include aria-label or aria-labelledby for screen readers."
      );
    }, [e, t, a, s, i, u, m]);
    const g = () => {
      if (N() || e === "icon")
        switch (t) {
          case "small":
            return "h-8 w-8 plate-round";
          case "large":
            return "h-12 w-12 plate-round";
          case "icon":
            return "h-10 w-10 plate-round";
          default:
            return "h-10 w-10 plate-round";
        }
      switch (t) {
        case "small":
          return "h-8 px-4 py-1.5 plate-round";
        case "large":
          return "h-12 px-6 py-3.5 plate-round";
        case "icon":
          return "h-10 w-10 plate-round";
        default:
          return "h-10 px-5 py-2.5 plate-round";
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
    }, y = {
      small: "w-4 h-4",
      // 16px
      medium: "w-5 h-5",
      // 20px
      large: "w-6 h-6",
      // 24px
      icon: "w-5 h-5"
      // 20px
    }, T = {
      small: "gap-1.5",
      // 6px - tighter for visual balance in compact buttons
      medium: "gap-2",
      // 8px - standard spacing
      large: "gap-2.5",
      // 10px - more breathing room for larger buttons
      icon: "gap-0"
      // No gap for icon-only
    }, L = (C) => C ? typeof C == "object" && C !== null && "type" in C ? /* @__PURE__ */ n("span", { className: `inline-flex items-center justify-center shrink-0 ${y[t]}`, children: C }) : C : null, M = () => {
      if (N() && a) {
        const b = t === "icon" ? "medium" : t;
        return typeof a == "object" && a !== null && "type" in a ? /* @__PURE__ */ n("span", { className: `inline-flex items-center justify-center shrink-0 ${y[b]}`, children: a }) : /* @__PURE__ */ n("span", { className: `inline-flex items-center justify-center shrink-0 ${y[b]}`, children: a });
      }
      return a;
    }, V = {
      "--btn-ring": e === "primary" || e === "link" ? "var(--focus-ring-primary)" : e === "destructive" ? "var(--focus-ring-destructive)" : e === "icon" ? "var(--focus-ring-icon)" : "var(--focus-ring-secondary)",
      outline: "none"
    };
    return c ? /* @__PURE__ */ v(
      "a",
      {
        ref: k,
        href: r ? void 0 : c,
        target: l,
        rel: d,
        "aria-disabled": r || void 0,
        className: `${w} ${g()} ${$[e]} ${T[t]} no-underline ${r ? "pointer-events-none opacity-50" : ""} ${o}`,
        style: V,
        "aria-label": u,
        "aria-labelledby": m,
        ...h,
        children: [
          s && L(s),
          M(),
          i && L(i)
        ]
      }
    ) : /* @__PURE__ */ v(
      "button",
      {
        ref: k,
        disabled: r,
        className: `${w} ${g()} ${$[e]} ${T[t]} ${o}`,
        style: V,
        "aria-label": u,
        "aria-labelledby": m,
        ...h,
        children: [
          s && L(s),
          M(),
          i && L(i)
        ]
      }
    );
  }
);
Oe.displayName = "Button";
const pt = j(
  ({
    size: e = "medium",
    variant: t = "box",
    error: r = !1,
    disabled: o = !1,
    className: a = "",
    label: s,
    id: i,
    ...c
  }, l) => {
    const d = fe(), u = i ?? (s != null && s !== "" ? d : void 0), m = `
      w-full
      font-mono text-sm
      transition-colors [transition-duration:var(--duration-fast)]
      placeholder:text-[var(--field-placeholder)]
      disabled:cursor-not-allowed disabled:opacity-50
      focus:outline-none
    `, h = {
      small: "h-8 px-3 py-1.5 plate-round",
      medium: "h-10 px-4 py-2.5 plate-round",
      large: "h-12 px-5 py-3.5 plate-round"
    }, k = r ? "bg-[var(--field-background-error)] text-[var(--text-primary)]" : "bg-[var(--field-background)] text-[var(--text-primary)]", w = r ? "bg-[var(--field-border-error)]" : "bg-[var(--field-border)] hover:bg-[var(--field-border-hover)] focus-within:!bg-[var(--field-border-focus)]", N = r ? "border-b border-[var(--field-border-error)] focus:border-[var(--field-border-error)]" : "border-b border-[var(--field-border)] hover:border-[var(--field-border-hover)] focus:!border-[var(--field-border-focus)]", g = t === "quiet" ? /* @__PURE__ */ n(
      "input",
      {
        ref: l,
        id: u,
        disabled: o,
        className: `${m} ${h[e].replace("plate-round", "rounded-none")} !px-0 bg-transparent text-[var(--text-primary)] ${N} ${a}`,
        ...c
      }
    ) : /* @__PURE__ */ n(
      "div",
      {
        className: `w-full plate-round p-px transition-colors [transition-duration:var(--duration-fast)] ${w}`,
        children: /* @__PURE__ */ n(
          "input",
          {
            ref: l,
            id: u,
            disabled: o,
            className: `${m} ${h[e]} ${k} ${a}`,
            ...c
          }
        )
      }
    );
    return s == null || s === "" ? g : /* @__PURE__ */ v("div", { className: "w-full space-y-1", children: [
      /* @__PURE__ */ n(
        "label",
        {
          htmlFor: u,
          className: "block font-mono text-sm text-secondary-800 dark:text-secondary-200",
          children: s
        }
      ),
      g
    ] });
  }
);
pt.displayName = "Input";
function Fe(e) {
  var t, r, o = "";
  if (typeof e == "string" || typeof e == "number") o += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var a = e.length;
    for (t = 0; t < a; t++) e[t] && (r = Fe(e[t])) && (o && (o += " "), o += r);
  } else for (r in e) e[r] && (o && (o += " "), o += r);
  return o;
}
function bt() {
  for (var e, t, r = 0, o = "", a = arguments.length; r < a; r++) (e = arguments[r]) && (t = Fe(e)) && (o && (o += " "), o += t);
  return o;
}
const gt = (e, t) => {
  const r = new Array(e.length + t.length);
  for (let o = 0; o < e.length; o++)
    r[o] = e[o];
  for (let o = 0; o < t.length; o++)
    r[e.length + o] = t[o];
  return r;
}, ht = (e, t) => ({
  classGroupId: e,
  validator: t
}), Ze = (e = /* @__PURE__ */ new Map(), t = null, r) => ({
  nextPart: e,
  validators: t,
  classGroupId: r
}), ke = "-", Ee = [], xt = "arbitrary..", vt = (e) => {
  const t = kt(e), {
    conflictingClassGroups: r,
    conflictingClassGroupModifiers: o
  } = e;
  return {
    getClassGroupId: (i) => {
      if (i.startsWith("[") && i.endsWith("]"))
        return yt(i);
      const c = i.split(ke), l = c[0] === "" && c.length > 1 ? 1 : 0;
      return Ge(c, l, t);
    },
    getConflictingClassGroupIds: (i, c) => {
      if (c) {
        const l = o[i], d = r[i];
        return l ? d ? gt(d, l) : l : d || Ee;
      }
      return r[i] || Ee;
    }
  };
}, Ge = (e, t, r) => {
  if (e.length - t === 0)
    return r.classGroupId;
  const a = e[t], s = r.nextPart.get(a);
  if (s) {
    const d = Ge(e, t + 1, s);
    if (d) return d;
  }
  const i = r.validators;
  if (i === null)
    return;
  const c = t === 0 ? e.join(ke) : e.slice(t).join(ke), l = i.length;
  for (let d = 0; d < l; d++) {
    const u = i[d];
    if (u.validator(c))
      return u.classGroupId;
  }
}, yt = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const t = e.slice(1, -1), r = t.indexOf(":"), o = t.slice(0, r);
  return o ? xt + o : void 0;
})(), kt = (e) => {
  const {
    theme: t,
    classGroups: r
  } = e;
  return wt(r, t);
}, wt = (e, t) => {
  const r = Ze();
  for (const o in e) {
    const a = e[o];
    ze(a, r, o, t);
  }
  return r;
}, ze = (e, t, r, o) => {
  const a = e.length;
  for (let s = 0; s < a; s++) {
    const i = e[s];
    Nt(i, t, r, o);
  }
}, Nt = (e, t, r, o) => {
  if (typeof e == "string") {
    $t(e, t, r);
    return;
  }
  if (typeof e == "function") {
    St(e, t, r, o);
    return;
  }
  Mt(e, t, r, o);
}, $t = (e, t, r) => {
  const o = e === "" ? t : Be(t, e);
  o.classGroupId = r;
}, St = (e, t, r, o) => {
  if (Lt(e)) {
    ze(e(o), t, r, o);
    return;
  }
  t.validators === null && (t.validators = []), t.validators.push(ht(r, e));
}, Mt = (e, t, r, o) => {
  const a = Object.entries(e), s = a.length;
  for (let i = 0; i < s; i++) {
    const [c, l] = a[i];
    ze(l, Be(t, c), r, o);
  }
}, Be = (e, t) => {
  let r = e;
  const o = t.split(ke), a = o.length;
  for (let s = 0; s < a; s++) {
    const i = o[s];
    let c = r.nextPart.get(i);
    c || (c = Ze(), r.nextPart.set(i, c)), r = c;
  }
  return r;
}, Lt = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, zt = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, r = /* @__PURE__ */ Object.create(null), o = /* @__PURE__ */ Object.create(null);
  const a = (s, i) => {
    r[s] = i, t++, t > e && (t = 0, o = r, r = /* @__PURE__ */ Object.create(null));
  };
  return {
    get(s) {
      let i = r[s];
      if (i !== void 0)
        return i;
      if ((i = o[s]) !== void 0)
        return a(s, i), i;
    },
    set(s, i) {
      s in r ? r[s] = i : a(s, i);
    }
  };
}, Me = "!", Ve = ":", Tt = [], Re = (e, t, r, o, a) => ({
  modifiers: e,
  hasImportantModifier: t,
  baseClassName: r,
  maybePostfixModifierPosition: o,
  isExternal: a
}), It = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: r
  } = e;
  let o = (a) => {
    const s = [];
    let i = 0, c = 0, l = 0, d;
    const u = a.length;
    for (let N = 0; N < u; N++) {
      const g = a[N];
      if (i === 0 && c === 0) {
        if (g === Ve) {
          s.push(a.slice(l, N)), l = N + 1;
          continue;
        }
        if (g === "/") {
          d = N;
          continue;
        }
      }
      g === "[" ? i++ : g === "]" ? i-- : g === "(" ? c++ : g === ")" && c--;
    }
    const m = s.length === 0 ? a : a.slice(l);
    let h = m, k = !1;
    m.endsWith(Me) ? (h = m.slice(0, -1), k = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      m.startsWith(Me) && (h = m.slice(1), k = !0)
    );
    const w = d && d > l ? d - l : void 0;
    return Re(s, k, h, w);
  };
  if (t) {
    const a = t + Ve, s = o;
    o = (i) => i.startsWith(a) ? s(i.slice(a.length)) : Re(Tt, !1, i, void 0, !0);
  }
  if (r) {
    const a = o;
    o = (s) => r({
      className: s,
      parseClassName: a
    });
  }
  return o;
}, Ct = (e) => {
  const t = /* @__PURE__ */ new Map();
  return e.orderSensitiveModifiers.forEach((r, o) => {
    t.set(r, 1e6 + o);
  }), (r) => {
    const o = [];
    let a = [];
    for (let s = 0; s < r.length; s++) {
      const i = r[s], c = i[0] === "[", l = t.has(i);
      c || l ? (a.length > 0 && (a.sort(), o.push(...a), a = []), o.push(i)) : a.push(i);
    }
    return a.length > 0 && (a.sort(), o.push(...a)), o;
  };
}, At = (e) => ({
  cache: zt(e.cacheSize),
  parseClassName: It(e),
  sortModifiers: Ct(e),
  ...vt(e)
}), Et = /\s+/, Vt = (e, t) => {
  const {
    parseClassName: r,
    getClassGroupId: o,
    getConflictingClassGroupIds: a,
    sortModifiers: s
  } = t, i = [], c = e.trim().split(Et);
  let l = "";
  for (let d = c.length - 1; d >= 0; d -= 1) {
    const u = c[d], {
      isExternal: m,
      modifiers: h,
      hasImportantModifier: k,
      baseClassName: w,
      maybePostfixModifierPosition: N
    } = r(u);
    if (m) {
      l = u + (l.length > 0 ? " " + l : l);
      continue;
    }
    let g = !!N, $ = o(g ? w.substring(0, N) : w);
    if (!$) {
      if (!g) {
        l = u + (l.length > 0 ? " " + l : l);
        continue;
      }
      if ($ = o(w), !$) {
        l = u + (l.length > 0 ? " " + l : l);
        continue;
      }
      g = !1;
    }
    const y = h.length === 0 ? "" : h.length === 1 ? h[0] : s(h).join(":"), T = k ? y + Me : y, L = T + $;
    if (i.indexOf(L) > -1)
      continue;
    i.push(L);
    const M = a($, g);
    for (let V = 0; V < M.length; ++V) {
      const C = M[V];
      i.push(T + C);
    }
    l = u + (l.length > 0 ? " " + l : l);
  }
  return l;
}, Rt = (...e) => {
  let t = 0, r, o, a = "";
  for (; t < e.length; )
    (r = e[t++]) && (o = Ue(r)) && (a && (a += " "), a += o);
  return a;
}, Ue = (e) => {
  if (typeof e == "string")
    return e;
  let t, r = "";
  for (let o = 0; o < e.length; o++)
    e[o] && (t = Ue(e[o])) && (r && (r += " "), r += t);
  return r;
}, Ht = (e, ...t) => {
  let r, o, a, s;
  const i = (l) => {
    const d = t.reduce((u, m) => m(u), e());
    return r = At(d), o = r.cache.get, a = r.cache.set, s = c, c(l);
  }, c = (l) => {
    const d = o(l);
    if (d)
      return d;
    const u = Vt(l, r);
    return a(l, u), u;
  };
  return s = i, (...l) => s(Rt(...l));
}, _t = [], _ = (e) => {
  const t = (r) => r[e] || _t;
  return t.isThemeGetter = !0, t;
}, We = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Xe = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Pt = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, jt = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Dt = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Ot = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Ft = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Zt = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, ee = (e) => Pt.test(e), S = (e) => !!e && !Number.isNaN(Number(e)), te = (e) => !!e && Number.isInteger(Number(e)), Ne = (e) => e.endsWith("%") && S(e.slice(0, -1)), Y = (e) => jt.test(e), qe = () => !0, Gt = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Dt.test(e) && !Ot.test(e)
), Te = () => !1, Bt = (e) => Ft.test(e), Ut = (e) => Zt.test(e), Wt = (e) => !f(e) && !p(e), Xt = (e) => oe(e, Je, Te), f = (e) => We.test(e), ae = (e) => oe(e, Qe, Gt), He = (e) => oe(e, rr, S), qt = (e) => oe(e, tt, qe), Yt = (e) => oe(e, et, Te), _e = (e) => oe(e, Ye, Te), Kt = (e) => oe(e, Ke, Ut), he = (e) => oe(e, rt, Bt), p = (e) => Xe.test(e), me = (e) => se(e, Qe), Jt = (e) => se(e, et), Pe = (e) => se(e, Ye), Qt = (e) => se(e, Je), er = (e) => se(e, Ke), xe = (e) => se(e, rt, !0), tr = (e) => se(e, tt, !0), oe = (e, t, r) => {
  const o = We.exec(e);
  return o ? o[1] ? t(o[1]) : r(o[2]) : !1;
}, se = (e, t, r = !1) => {
  const o = Xe.exec(e);
  return o ? o[1] ? t(o[1]) : r : !1;
}, Ye = (e) => e === "position" || e === "percentage", Ke = (e) => e === "image" || e === "url", Je = (e) => e === "length" || e === "size" || e === "bg-size", Qe = (e) => e === "length", rr = (e) => e === "number", et = (e) => e === "family-name", tt = (e) => e === "number" || e === "weight", rt = (e) => e === "shadow", or = () => {
  const e = _("color"), t = _("font"), r = _("text"), o = _("font-weight"), a = _("tracking"), s = _("leading"), i = _("breakpoint"), c = _("container"), l = _("spacing"), d = _("radius"), u = _("shadow"), m = _("inset-shadow"), h = _("text-shadow"), k = _("drop-shadow"), w = _("blur"), N = _("perspective"), g = _("aspect"), $ = _("ease"), y = _("animate"), T = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], L = () => [
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
  ], M = () => [...L(), p, f], V = () => ["auto", "hidden", "clip", "visible", "scroll"], C = () => ["auto", "contain", "none"], b = () => [p, f, l], H = () => [ee, "full", "auto", ...b()], ie = () => [te, "none", "subgrid", p, f], X = () => ["auto", {
    span: ["full", te, p, f]
  }, te, p, f], K = () => [te, "auto", p, f], pe = () => ["auto", "min", "max", "fr", p, f], le = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], W = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], Z = () => ["auto", ...b()], J = () => [ee, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...b()], q = () => [ee, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...b()], ce = () => [ee, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...b()], x = () => [e, p, f], de = () => [...L(), Pe, _e, {
    position: [p, f]
  }], ue = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], A = () => ["auto", "cover", "contain", Qt, Xt, {
    size: [p, f]
  }], z = () => [Ne, me, ae], I = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    d,
    p,
    f
  ], R = () => ["", S, me, ae], B = () => ["solid", "dashed", "dotted", "double"], ne = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], E = () => [S, Ne, Pe, _e], O = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    w,
    p,
    f
  ], Q = () => ["none", S, p, f], be = () => ["none", S, p, f], we = () => [S, p, f], ge = () => [ee, "full", ...b()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Y],
      breakpoint: [Y],
      color: [qe],
      container: [Y],
      "drop-shadow": [Y],
      ease: ["in", "out", "in-out"],
      font: [Wt],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Y],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Y],
      shadow: [Y],
      spacing: ["px", S],
      text: [Y],
      "text-shadow": [Y],
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
        aspect: ["auto", "square", ee, f, p, g]
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
        columns: [S, f, p, c]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": T()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": T()
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
        object: M()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: V()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": V()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": V()
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
        inset: H()
      }],
      /**
       * Inset Inline
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": H()
      }],
      /**
       * Inset Block
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": H()
      }],
      /**
       * Inset Inline Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-s` in next major release
       */
      start: [{
        "inset-s": H(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        start: H()
      }],
      /**
       * Inset Inline End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-e` in next major release
       */
      end: [{
        "inset-e": H(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        end: H()
      }],
      /**
       * Inset Block Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-bs": [{
        "inset-bs": H()
      }],
      /**
       * Inset Block End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-be": [{
        "inset-be": H()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: H()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: H()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: H()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: H()
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
        z: [te, "auto", p, f]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [ee, "full", "auto", c, ...b()]
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
        flex: [S, ee, "auto", "initial", "none", f]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", S, p, f]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", S, p, f]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [te, "first", "last", "none", p, f]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": ie()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: X()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": K()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": K()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": ie()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: X()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": K()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": K()
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
        "auto-cols": pe()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": pe()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: b()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": b()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": b()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...le(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...W(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...W()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...le()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...W(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...W(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": le()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...W(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...W()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: b()
      }],
      /**
       * Padding Inline
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: b()
      }],
      /**
       * Padding Block
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: b()
      }],
      /**
       * Padding Inline Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: b()
      }],
      /**
       * Padding Inline End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: b()
      }],
      /**
       * Padding Block Start
       * @see https://tailwindcss.com/docs/padding
       */
      pbs: [{
        pbs: b()
      }],
      /**
       * Padding Block End
       * @see https://tailwindcss.com/docs/padding
       */
      pbe: [{
        pbe: b()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: b()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: b()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: b()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: b()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: Z()
      }],
      /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: Z()
      }],
      /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: Z()
      }],
      /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: Z()
      }],
      /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: Z()
      }],
      /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */
      mbs: [{
        mbs: Z()
      }],
      /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */
      mbe: [{
        mbe: Z()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: Z()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: Z()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: Z()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: Z()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": b()
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
        "space-y": b()
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
        size: J()
      }],
      /**
       * Inline Size
       * @see https://tailwindcss.com/docs/width
       */
      "inline-size": [{
        inline: ["auto", ...q()]
      }],
      /**
       * Min-Inline Size
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-inline-size": [{
        "min-inline": ["auto", ...q()]
      }],
      /**
       * Max-Inline Size
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-inline-size": [{
        "max-inline": ["none", ...q()]
      }],
      /**
       * Block Size
       * @see https://tailwindcss.com/docs/height
       */
      "block-size": [{
        block: ["auto", ...ce()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-block-size": [{
        "min-block": ["auto", ...ce()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-block-size": [{
        "max-block": ["none", ...ce()]
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [c, "screen", ...J()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          c,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...J()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          c,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [i]
          },
          ...J()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...J()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...J()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...J()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", r, me, ae]
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
        font: [o, tr, qt]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", Ne, f]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Jt, Yt, t]
      }],
      /**
       * Font Feature Settings
       * @see https://tailwindcss.com/docs/font-feature-settings
       */
      "font-features": [{
        "font-features": [f]
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
        tracking: [a, p, f]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [S, "none", p, He]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          s,
          ...b()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", p, f]
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
        list: ["disc", "decimal", "none", p, f]
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
        placeholder: x()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: x()
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
        decoration: [...B(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [S, "from-font", "auto", p, ae]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: x()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [S, "auto", p, f]
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
        indent: b()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", p, f]
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
        content: ["none", p, f]
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
        bg: de()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ue()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: A()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, te, p, f],
          radial: ["", p, f],
          conic: [te, p, f]
        }, er, Kt]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: x()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: z()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: z()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: z()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: x()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: x()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: x()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: I()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": I()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": I()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": I()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": I()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": I()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": I()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": I()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": I()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": I()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": I()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": I()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": I()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": I()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": I()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: R()
      }],
      /**
       * Border Width Inline
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": R()
      }],
      /**
       * Border Width Block
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": R()
      }],
      /**
       * Border Width Inline Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": R()
      }],
      /**
       * Border Width Inline End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": R()
      }],
      /**
       * Border Width Block Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-bs": [{
        "border-bs": R()
      }],
      /**
       * Border Width Block End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-be": [{
        "border-be": R()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": R()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": R()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": R()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": R()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": R()
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
        "divide-y": R()
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
        border: [...B(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...B(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: x()
      }],
      /**
       * Border Color Inline
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": x()
      }],
      /**
       * Border Color Block
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": x()
      }],
      /**
       * Border Color Inline Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": x()
      }],
      /**
       * Border Color Inline End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": x()
      }],
      /**
       * Border Color Block Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-bs": [{
        "border-bs": x()
      }],
      /**
       * Border Color Block End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-be": [{
        "border-be": x()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": x()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": x()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": x()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": x()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: x()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...B(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [S, p, f]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", S, me, ae]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: x()
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
          xe,
          he
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: x()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", m, xe, he]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": x()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: R()
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
        ring: x()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [S, ae]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": x()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": R()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": x()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", h, xe, he]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": x()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [S, p, f]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...ne(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": ne()
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
        "mask-linear": [S]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": E()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": E()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": x()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": x()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": E()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": E()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": x()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": x()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": E()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": E()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": x()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": x()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": E()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": E()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": x()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": x()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": E()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": E()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": x()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": x()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": E()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": E()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": x()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": x()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": E()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": E()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": x()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": x()
      }],
      "mask-image-radial": [{
        "mask-radial": [p, f]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": E()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": E()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": x()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": x()
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
        "mask-radial-at": L()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [S]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": E()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": E()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": x()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": x()
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
        mask: de()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: ue()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: A()
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
        mask: ["none", p, f]
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
          p,
          f
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: O()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [S, p, f]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [S, p, f]
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
          k,
          xe,
          he
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": x()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", S, p, f]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [S, p, f]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", S, p, f]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [S, p, f]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", S, p, f]
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
          p,
          f
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": O()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [S, p, f]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [S, p, f]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", S, p, f]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [S, p, f]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", S, p, f]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [S, p, f]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [S, p, f]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", S, p, f]
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
        "border-spacing": b()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": b()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": b()
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
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", p, f]
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
        duration: [S, "initial", p, f]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", $, p, f]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [S, p, f]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", y, p, f]
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
        perspective: [N, p, f]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": M()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: Q()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": Q()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": Q()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": Q()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: be()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": be()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": be()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": be()
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
        skew: we()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": we()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": we()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [p, f, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: M()
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
        translate: ge()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": ge()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": ge()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": ge()
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
        accent: x()
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
        caret: x()
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", p, f]
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
        "scroll-m": b()
      }],
      /**
       * Scroll Margin Inline
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": b()
      }],
      /**
       * Scroll Margin Block
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": b()
      }],
      /**
       * Scroll Margin Inline Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": b()
      }],
      /**
       * Scroll Margin Inline End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": b()
      }],
      /**
       * Scroll Margin Block Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbs": [{
        "scroll-mbs": b()
      }],
      /**
       * Scroll Margin Block End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbe": [{
        "scroll-mbe": b()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": b()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": b()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": b()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": b()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": b()
      }],
      /**
       * Scroll Padding Inline
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": b()
      }],
      /**
       * Scroll Padding Block
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": b()
      }],
      /**
       * Scroll Padding Inline Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": b()
      }],
      /**
       * Scroll Padding Inline End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": b()
      }],
      /**
       * Scroll Padding Block Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbs": [{
        "scroll-pbs": b()
      }],
      /**
       * Scroll Padding Block End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbe": [{
        "scroll-pbe": b()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": b()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": b()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": b()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": b()
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
        "will-change": ["auto", "scroll", "contents", "transform", p, f]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...x()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [S, me, ae, He]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...x()]
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
}, nr = /* @__PURE__ */ Ht(or);
function F(...e) {
  return nr(bt(e));
}
const Ar = {
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
}, D = (e, t, r) => `M${e - r} ${t}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0Z`, ar = {
  AlertCircle: { stroke: `${D(8, 8, 6)}M8 5V8.5`, fill: "M7 10.5h2v2H7Z" },
  AlertTriangle: { stroke: "M8 2.5L14 13.5H2Z M8 6.5V9", fill: "M7 10.5h2v1.8H7Z" },
  Archive: { stroke: "M2 3H14V6H2Z M3 6V13H13V6 M6.5 9H9.5" },
  ArrowLeft: { stroke: "M13 8H3.5M7 4L3 8L7 12" },
  ArrowRight: { stroke: "M3 8H12.5M9 4L13 8L9 12" },
  Bell: { stroke: "M3 11.5H13 M4.5 11.5V7.5a3.5 3.5 0 0 1 7 0V11.5 M7 14H9" },
  Check: { stroke: "M3 8.5L6.5 12L13 4.5" },
  CheckCircle: { stroke: `${D(8, 8, 6)}M5.3 8.2L7.2 10.1L10.8 6.2` },
  ChevronDown: { stroke: "M3.5 6L8 10.5L12.5 6" },
  ChevronRight: { stroke: "M6 3.5L10.5 8L6 12.5" },
  ChevronUp: { stroke: "M3.5 10L8 5.5L12.5 10" },
  Copy: { stroke: "M5 5V2H14V11H11 M2 5H11V14H2Z" },
  Download: { stroke: "M8 2V9.5M4.5 6L8 9.5L11.5 6 M3 13.5H13" },
  Edit: { stroke: "M10.5 2.5L13.5 5.5L5.5 13.5H2.5V10.5Z M9 4L12 7" },
  ExternalLink: { stroke: "M7 3H3V13H13V9 M9.5 3H13V6.5 M12.5 3.5L7.5 8.5" },
  Eye: {
    stroke: "M1.5 8C3.3 4.8 5.5 3.5 8 3.5S12.7 4.8 14.5 8C12.7 11.2 10.5 12.5 8 12.5S3.3 11.2 1.5 8Z",
    fill: D(8, 8, 2)
  },
  EyeOff: {
    stroke: "M1.5 8C3.3 4.8 5.5 3.5 8 3.5S12.7 4.8 14.5 8C12.7 11.2 10.5 12.5 8 12.5S3.3 11.2 1.5 8Z M2.5 13.5L13.5 2.5"
  },
  FileText: { stroke: "M3 2H10L13 5V14H3Z M6 8H10M6 11H10" },
  Globe: { stroke: `${D(8, 8, 6)}M2 8H14 M8 2C5.8 4.5 5.8 11.5 8 14C10.2 11.5 10.2 4.5 8 2Z` },
  HelpCircle: {
    stroke: `${D(8, 8, 6)}M6.2 6.3C6.2 5.2 7 4.6 8 4.6S9.8 5.2 9.8 6.2C9.8 7.5 8 7.6 8 9`,
    fill: "M7 10.5h2v1.8H7Z"
  },
  Info: { stroke: `${D(8, 8, 6)}M8 7.5V11.5`, fill: "M7 4.2h2v1.8H7Z" },
  Lock: { stroke: "M5 7V5a3 3 0 0 1 6 0V7 M3 7H13V14H3Z" },
  LogOut: { stroke: "M6 3H3V13H6 M7 8H13.5M10.5 5L13.5 8L10.5 11" },
  Mail: { stroke: "M2 3.5H14V12.5H2Z M2.5 4L8 8.5L13.5 4" },
  Moon: { stroke: "M8 2a4 4 0 0 0 6 6a6 6 0 1 1-6-6Z" },
  MoreVertical: { fill: "M7 2h2v2H7Z M7 7h2v2H7Z M7 12h2v2H7Z" },
  Music2: { stroke: "M6 12V3.5L13 2V10.5", fill: `${D(4.5, 12, 1.8)}${D(11.5, 10.5, 1.8)}` },
  Pause: { fill: "M4 3h3v10H4Z M9 3h3v10H9Z" },
  Play: { fill: "M4.5 2.5L13 8L4.5 13.5Z" },
  Plus: { stroke: "M8 3V13M3 8H13" },
  Repeat: { stroke: "M2.5 9V5H11 M9 3L11 5L9 7 M13.5 7V11H5 M7 9L5 11L7 13" },
  Save: { stroke: "M2 2H11L14 5V14H2Z M5 2V5.5H10V2 M5 14V9.5H11V14" },
  Search: { stroke: `${D(7, 7, 4.5)}M10.5 10.5L13.5 13.5` },
  Send: { stroke: "M14 2L2 7L7 9L9 14Z M14 2L7 9" },
  Settings: {
    stroke: `${D(8, 8, 3.5)}M8 1.5V3M8 13V14.5M1.5 8H3M13 8H14.5M3.4 3.4L4.5 4.5M11.5 11.5L12.6 12.6M12.6 3.4L11.5 4.5M3.4 12.6L4.5 11.5`,
    fill: D(8, 8, 1.2)
  },
  Share2: {
    stroke: "M5.5 7L10.5 4.5 M5.5 9L10.5 11.5",
    fill: `${D(12, 3.8, 2)}${D(4, 8, 2)}${D(12, 12.2, 2)}`
  },
  Shield: { stroke: "M8 1.8L13.5 3.8V8C13.5 11 11.3 13.2 8 14.3C4.7 13.2 2.5 11 2.5 8V3.8Z" },
  Shuffle: { stroke: "M2 4.5H4.5L9.5 11.5H13 M2 11.5H4.5L9.5 4.5H13 M11 2.5L13 4.5L11 6.5 M11 9.5L13 11.5L11 13.5" },
  SkipBack: { fill: "M3 3h2v10H3Z M13 3V13L6 8Z" },
  SkipForward: { fill: "M3 3V13L10 8Z M11 3h2v10h-2Z" },
  Star: { fill: "M8 1.5L9.9 5.8L14.5 6.2L11 9.3L12 13.9L8 11.5L4 13.9L5 9.3L1.5 6.2L6.1 5.8Z" },
  Sun: {
    stroke: "M8 1.5V2.5M8 13.5V14.5M1.5 8H2.5M13.5 8H14.5M3.4 3.4L4.1 4.1M11.9 11.9L12.6 12.6M12.6 3.4L11.9 4.1M3.4 12.6L4.1 11.9",
    fill: D(8, 8, 3.2)
  },
  Tag: { stroke: "M2 2H8L14 8L8 14L2 8Z", fill: "M4.5 4.5h2v2h-2Z" },
  Trash2: { stroke: "M2 4H14 M6 4V2H10V4 M3.5 4L4.5 14H11.5L12.5 4 M6.5 7V11 M9.5 7V11" },
  Upload: { stroke: "M8 11V3.5M4.5 7L8 3.5L11.5 7 M3 13.5H13" },
  User: { stroke: `${D(8, 5, 2.8)}M2.5 14.5C2.5 11.2 4.8 9.5 8 9.5S13.5 11.2 13.5 14.5` },
  Volume2: { stroke: "M2 6H5L9 3V13L5 10H2Z M11.5 5.5A3.5 3.5 0 0 1 11.5 10.5 M13.2 3.5A6.3 6.3 0 0 1 13.2 12.5" },
  VolumeX: { stroke: "M1.5 6H4L8 3V13L4 10H1.5Z M10.5 6L14 10M14 6L10.5 10" },
  X: { stroke: "M3 3L13 13M13 3L3 13" }
}, je = {
  3: "w-3 h-3 text-xs",
  4: "w-4 h-4 text-sm",
  5: "w-5 h-5 text-base",
  6: "w-6 h-6 text-lg",
  8: "w-8 h-8 text-2xl"
}, ot = ({
  name: e,
  size: t = "4",
  className: r
}) => {
  const o = ar[e], a = je[t] ?? je[4];
  return /* @__PURE__ */ n(
    "span",
    {
      className: F(
        "inline-flex items-center justify-center font-mono leading-none select-none",
        a,
        r
      ),
      "aria-hidden": "true",
      children: o ? /* @__PURE__ */ v(
        "svg",
        {
          viewBox: "0 0 16 16",
          className: "h-full w-full",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: 2,
          strokeLinecap: "square",
          strokeLinejoin: "miter",
          children: [
            o.stroke && /* @__PURE__ */ n("path", { d: o.stroke }),
            o.fill && /* @__PURE__ */ n("path", { d: o.fill, fill: "currentColor", stroke: "none" })
          ]
        }
      ) : "?"
    }
  );
};
function Er({ isOpen: e, onClose: t, title: r, children: o, footerContent: a, width: s = 740, docked: i = !1 }) {
  const c = U(null), l = U(null), [d, u] = G(e);
  P(() => {
    e && u(!0);
  }, [e]);
  const m = d && !e, [h, k] = G(
    () => typeof window < "u" && window.matchMedia("(min-width: 960px)").matches
  );
  P(() => {
    const g = window.matchMedia("(min-width: 960px)"), $ = () => k(g.matches);
    return g.addEventListener("change", $), () => g.removeEventListener("change", $);
  }, []);
  const w = i && h;
  if (P(() => {
    var g;
    if (e)
      return l.current = document.activeElement, (g = c.current) == null || g.focus(), () => {
        var $;
        ($ = l.current) == null || $.focus(), l.current = null;
      };
  }, [e]), P(() => {
    const g = ($) => {
      $.key === "Escape" && t();
    };
    return e && document.addEventListener("keydown", g), () => {
      document.removeEventListener("keydown", g);
    };
  }, [e, t]), P(() => (e && !w ? document.body.style.overflow = "hidden" : document.body.style.overflow = "unset", () => {
    document.body.style.overflow = "unset";
  }), [e, w]), !d) return null;
  const N = /* @__PURE__ */ n(
    "div",
    {
      ref: c,
      tabIndex: -1,
      className: "max-w-full max-h-[80vh] plate-round-lg p-px bg-[var(--surface-container-stroke)] flex focus:outline-none",
      style: { width: typeof s == "number" ? `${s}px` : s },
      role: "dialog",
      "aria-modal": w ? void 0 : "true",
      "aria-label": r,
      onClick: (g) => g.stopPropagation(),
      children: /* @__PURE__ */ v("div", { className: "w-full plate-round-lg bg-[var(--surface-card)] flex flex-col overflow-hidden", children: [
        /* @__PURE__ */ v("div", { className: "flex items-center justify-between px-6 py-5 border-b-[0.5px] border-solid border-[var(--surface-container-stroke)]", children: [
          /* @__PURE__ */ n("h2", { className: "text-base font-mono text-[var(--text-primary)] font-medium flex-1 min-w-0 truncate", children: r }),
          /* @__PURE__ */ n(
            Oe,
            {
              variant: "secondary",
              size: "small",
              type: "button",
              onClick: t,
              "aria-label": "Close modal",
              className: "ml-4 shrink-0",
              children: /* @__PURE__ */ n(ot, { name: "X" })
            }
          )
        ] }),
        /* @__PURE__ */ n("div", { className: "overflow-y-auto px-6 py-5", tabIndex: 0, children: o }),
        a && /* @__PURE__ */ n("div", { className: "flex items-center justify-end gap-3 px-6 py-5 border-t-[0.5px] border-solid border-[var(--surface-container-stroke)]", children: a })
      ] })
    }
  );
  return w ? /* @__PURE__ */ n(
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
      children: N
    }
  ) : /* @__PURE__ */ n(re, { children: /* @__PURE__ */ n(
    "div",
    {
      className: `fixed inset-0 flex items-center justify-center p-5 bg-[var(--surface-overlay)] ${m ? "animate-out fade-out fill-mode-forwards" : "animate-in fade-in"}`,
      style: { zIndex: "var(--z-index-modal)", animationDuration: "var(--duration-normal)" },
      onClick: t,
      onAnimationEnd: () => {
        m && u(!1);
      },
      children: N
    }
  ) });
}
function Vr({
  title: e,
  subtitle: t,
  headerContent: r,
  children: o,
  footerContent: a,
  className: s = ""
}) {
  const i = s.includes("flex");
  return /* @__PURE__ */ n(
    "div",
    {
      className: `
        plate-round-lg p-px bg-[var(--surface-container-stroke)]
        ${i ? "flex flex-col" : ""}
        ${s}
      `,
      children: /* @__PURE__ */ v(
        "div",
        {
          className: `
        plate-round-lg bg-[var(--surface-card)] h-full w-full
        ${i ? "flex flex-col flex-1 min-h-0" : ""}
      `,
          children: [
            (e || t || r) && /* @__PURE__ */ n("div", { className: "p-4 lg:p-6 border-b-[0.5px] border-solid border-[var(--surface-container-stroke)] overflow-hidden rounded-none", children: r || /* @__PURE__ */ v("div", { children: [
              e && /* @__PURE__ */ n("h3", { className: "text-base font-mono font-bold text-[var(--text-primary)] mb-1", children: e }),
              t && /* @__PURE__ */ n("p", { className: "font-mono text-sm text-secondary-800 dark:text-secondary-300", children: t })
            ] }) }),
            /* @__PURE__ */ n("div", { className: `p-4 lg:p-6 ${i ? "flex-1 flex flex-col min-h-0" : ""}`, children: o }),
            a && /* @__PURE__ */ n("div", { className: "p-4 lg:p-6 border-t-[0.5px] border-solid border-[var(--surface-container-stroke)] overflow-hidden", children: a })
          ]
        }
      )
    }
  );
}
function Rr({
  variant: e = "default",
  size: t = "medium",
  caps: r = !1,
  dashed: o = !1,
  children: a,
  iconLeft: s,
  onClose: i,
  className: c = ""
}) {
  const l = {
    small: "h-5 px-2 py-1 text-xs",
    // h-5 = 20px, px-2 = 8px, text-xs = 12px
    medium: "h-6 px-2.5 py-1 text-xs",
    // h-6 = 24px, px-2.5 = 10px, text-xs = 12px
    large: "h-7 px-3 py-1.5 text-sm"
    // h-7 = 28px, px-3 = 12px, text-sm = 14px
  }, d = {
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
  }, u = {
    default: "border-current text-secondary-800 dark:text-secondary-200",
    primary: "border-current text-primary-800 dark:text-primary-300",
    success: "border-current text-success-800 dark:text-success-300",
    warning: "border-current text-warning-800 dark:text-warning-300",
    error: "border-current text-error-800 dark:text-error-300",
    info: "border-current text-info-800 dark:text-info-300",
    bone: "border-secondary-500 text-secondary-800 dark:text-secondary-200"
  }, m = {
    small: "w-3 h-3",
    // 12px
    medium: "w-3.5 h-3.5",
    // 14px
    large: "w-4 h-4"
    // 16px
  };
  return /* @__PURE__ */ v(
    "span",
    {
      className: `
        inline-flex items-center gap-1.5
        font-mono font-medium
        ${o ? `rounded-none border border-dashed bg-transparent ${u[e]}` : `plate-round ${d[e]}`}
        ${l[t]}
        ${r ? "uppercase [letter-spacing:.08em]" : ""}
        ${c}
      `,
      children: [
        s && /* @__PURE__ */ n("span", { className: `inline-flex items-center justify-center ${m[t]} flex-shrink-0`, children: s }),
        /* @__PURE__ */ n("span", { className: "inline-flex items-center", children: a }),
        i && /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: (h) => {
              h.stopPropagation(), i();
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
            children: "x"
          }
        )
      ]
    }
  );
}
function Hr({
  variant: e = "default",
  title: t,
  description: r,
  iconLeft: o,
  onClose: a,
  className: s = ""
}) {
  const c = o || /* @__PURE__ */ n("span", { className: "font-mono text-sm font-bold leading-none whitespace-nowrap", children: {
    default: "[i]",
    success: "[ok]",
    warning: "[!!]",
    error: "[er]",
    info: "[i]"
  }[e] }), d = {
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
  return /* @__PURE__ */ n("div", { role: "alert", className: `plate-round p-px ${d.ring} ${s}`, children: /* @__PURE__ */ v(
    "div",
    {
      className: `
        plate-round
        flex items-start gap-3
        p-4
        ${d.fill}
      `,
      children: [
        c && /* @__PURE__ */ n("div", { className: `flex h-5 flex-shrink-0 items-center ${d.icon}`, children: c }),
        /* @__PURE__ */ v("div", { className: "flex-1 min-w-0", children: [
          t && /* @__PURE__ */ n("h4", { className: `font-mono text-sm font-bold mb-1 ${d.title}`, children: t }),
          r && /* @__PURE__ */ n("div", { className: `font-mono text-sm ${d.description}`, children: r })
        ] }),
        a && /* @__PURE__ */ n(
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
            children: "[x]"
          }
        )
      ]
    }
  ) });
}
function sr({
  src: e,
  alt: t,
  initials: r,
  icon: o,
  size: a = "medium",
  status: s,
  className: i = "",
  onError: c
}) {
  const [l, d] = G(!1), m = {
    small: {
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
    medium: {
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
    large: {
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
  }[a], h = () => {
    d(!0), c && c();
  }, k = e && !l, w = !k && r, N = !k && !w && o, g = !k && !w && !N, $ = {
    online: "bg-success-600 dark:bg-success-500",
    offline: "bg-secondary-500 dark:bg-secondary-600",
    away: "bg-warning-600 dark:bg-warning-500"
  };
  return /* @__PURE__ */ v("div", { className: `relative inline-block ${m.container} ${i}`, children: [
    /* @__PURE__ */ v(
      "div",
      {
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
          k && /* @__PURE__ */ n(
            "img",
            {
              src: e,
              alt: t || "Avatar",
              className: "w-full h-full object-cover",
              onError: h
            }
          ),
          w && /* @__PURE__ */ n("span", { className: "select-none", children: r }),
          N && /* @__PURE__ */ n("div", { className: `${m.icon} inline-flex items-center justify-center leading-none text-secondary-700 dark:text-secondary-300`, children: o }),
          g && /* @__PURE__ */ n("span", { className: `${m.icon} inline-flex items-center justify-center font-mono font-bold text-secondary-900 dark:text-secondary-100`, "aria-hidden": "true", children: "@" })
        ]
      }
    ),
    s && /* @__PURE__ */ n(
      "span",
      {
        role: "img",
        className: `
            absolute block
            ${m.statusOffset}
            ${m.status}
            ${$[s]}
            rounded-none
            border-2 border-[var(--field-background)]
          `,
        "aria-label": `Status: ${s}`
      }
    )
  ] });
}
function _r({
  variant: e = "horizontal",
  text: t,
  spacing: r = "medium",
  className: o = ""
}) {
  const a = {
    none: "",
    small: e === "horizontal" ? "my-1" : "mx-1",
    // 4px margin
    medium: e === "horizontal" ? "my-4" : "mx-4",
    // 16px margin
    large: e === "horizontal" ? "my-8" : "mx-8"
    // 32px margin
  }, s = `
    border-term-dim
  `;
  return e === "horizontal" ? /* @__PURE__ */ n(
    "div",
    {
      className: `
          w-full
          border-t border-solid
          ${s}
          ${a[r]}
          ${o}
        `,
      role: "separator",
      "aria-orientation": "horizontal"
    }
  ) : e === "vertical" ? /* @__PURE__ */ n(
    "div",
    {
      className: `
          h-full
          border-l border-solid
          ${s}
          ${a[r]}
          ${o}
        `,
      role: "separator",
      "aria-orientation": "vertical"
    }
  ) : e === "withText" && t ? /* @__PURE__ */ v(
    "div",
    {
      className: `
          flex items-center
          w-full
          ${a[r]}
          ${o}
        `,
      role: "separator",
      "aria-label": typeof t == "string" ? t : void 0,
      children: [
        /* @__PURE__ */ n("span", { className: "flex-1 overflow-hidden whitespace-nowrap font-mono text-term-dim leading-none select-none", "aria-hidden": "true", children: "─".repeat(80) }),
        /* @__PURE__ */ n("span", { className: "px-2 font-mono text-xs text-term-dim whitespace-nowrap", children: t }),
        /* @__PURE__ */ n("span", { className: "flex-1 overflow-hidden whitespace-nowrap font-mono text-term-dim leading-none select-none", "aria-hidden": "true", children: "─".repeat(80) })
      ]
    }
  ) : /* @__PURE__ */ n(
    "div",
    {
      className: `
        w-full
        border-t border-solid
        ${s}
        ${a[r]}
        ${o}
      `,
      role: "separator",
      "aria-orientation": "horizontal"
    }
  );
}
function Pr({
  content: e,
  children: t,
  position: r = "top",
  delay: o = 200,
  maxWidth: a = "200px",
  className: s = ""
}) {
  const [i, c] = G(!1), [l, d] = G(!1), u = U(null), m = U(null), h = U(null), k = () => {
    u.current && clearTimeout(u.current), u.current = setTimeout(() => {
      c(!0), setTimeout(() => d(!0), 50);
    }, o);
  }, w = () => {
    u.current && clearTimeout(u.current), c(!1), d(!1);
  };
  P(() => () => {
    u.current && clearTimeout(u.current);
  }, []);
  const N = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2"
  }, g = "polygon(0 0, 16px 0, 16px 2px, 14px 2px, 14px 4px, 12px 4px, 12px 6px, 10px 6px, 10px 8px, 6px 8px, 6px 6px, 4px 6px, 4px 4px, 2px 4px, 2px 2px, 0 2px)", $ = "polygon(0 0, 12px 0, 12px 2px, 10px 2px, 10px 4px, 8px 4px, 8px 6px, 4px 6px, 4px 4px, 2px 4px, 2px 2px, 0 2px)", y = {
    top: "top-full left-1/2 -translate-x-1/2 -translate-y-px",
    bottom: "bottom-full left-1/2 -translate-x-1/2 translate-y-px rotate-180",
    left: "left-full top-1/2 -translate-y-1/2 -translate-x-[5px] -rotate-90",
    right: "right-full top-1/2 -translate-y-1/2 translate-x-[5px] rotate-90"
  };
  return /* @__PURE__ */ v(
    "div",
    {
      ref: h,
      className: `relative inline-block w-fit ${s}`,
      onMouseEnter: k,
      onMouseLeave: w,
      children: [
        t,
        i && /* @__PURE__ */ v(
          "div",
          {
            ref: m,
            role: "tooltip",
            className: `
            absolute
            ${N[r]}
            w-max
            z-[var(--z-index-tooltip)]
            ${l ? "opacity-100" : "opacity-0"}
            transition-opacity [transition-duration:var(--duration-fast)]
            pointer-events-none
          `,
            style: { maxWidth: a },
            children: [
              /* @__PURE__ */ n("div", { className: "plate-round p-px bg-[var(--surface-container-stroke)]", children: /* @__PURE__ */ n("div", { className: "plate-round bg-[var(--surface-card)] min-w-16 px-3 py-2 text-center font-mono text-xs text-[var(--text-primary)] whitespace-normal", children: e }) }),
              /* @__PURE__ */ n("div", { className: `absolute ${y[r]}`, "aria-hidden": "true", children: /* @__PURE__ */ v("div", { className: "relative h-[8px] w-[16px]", children: [
                /* @__PURE__ */ n(
                  "div",
                  {
                    className: "absolute inset-0 bg-[var(--surface-container-stroke)]",
                    style: { clipPath: g }
                  }
                ),
                /* @__PURE__ */ n(
                  "div",
                  {
                    className: "absolute left-[2px] top-[-1px] h-[6px] w-[12px] bg-[var(--surface-card)]",
                    style: { clipPath: $ }
                  }
                )
              ] }) })
            ]
          }
        )
      ]
    }
  );
}
const ir = j(function({
  size: t = "medium",
  error: r = !1,
  disabled: o = !1,
  className: a = "",
  children: s,
  value: i,
  defaultValue: c,
  onChange: l,
  name: d,
  label: u,
  "aria-label": m,
  id: h,
  ...k
}, w) {
  var ue;
  const N = fe(), g = h ?? `${N}-trigger`, y = (() => {
    const A = [];
    if (Array.isArray(s))
      s.forEach((z) => {
        if (typeof z == "object" && z !== null && "props" in z) {
          const I = z.props;
          A.push({
            value: I.value || "",
            label: typeof I.children == "string" ? I.children : String(I.children || ""),
            disabled: I.disabled
          });
        }
      });
    else if (typeof s == "object" && s !== null && "props" in s) {
      const z = s.props;
      A.push({
        value: z.value || "",
        label: typeof z.children == "string" ? z.children : String(z.children || ""),
        disabled: z.disabled
      });
    }
    return A;
  })(), [T, L] = G(!1), [M, V] = G(-1), [C, b] = G(
    i !== void 0 ? String(i) : c !== void 0 ? String(c) : ((ue = y[0]) == null ? void 0 : ue.value) || ""
  ), H = U(null), ie = U(null), X = U(null);
  P(() => {
    i !== void 0 && (b(String(i)), X.current && (X.current.value = String(i)));
  }, [i]), lt(w, () => X.current);
  const K = y.find((A) => A.value === C), pe = (K == null ? void 0 : K.label) || "", le = () => {
    o || (L(!T), T || V(-1));
  }, W = () => {
    L(!1), V(-1);
  }, Z = (A) => {
    i === void 0 && b(A), X.current && (X.current.value = A), l && l({
      target: { value: A, name: d },
      currentTarget: { value: A, name: d }
    }), W();
  };
  P(() => {
    function A(z) {
      H.current && !H.current.contains(z.target) && W();
    }
    if (T)
      return document.addEventListener("mousedown", A), () => {
        document.removeEventListener("mousedown", A);
      };
  }, [T]), P(() => {
    function A(z) {
      var B, ne;
      if (!((B = H.current) != null && B.contains(z.target)) && !T)
        return;
      if (!T) {
        if ((z.key === "Enter" || z.key === " " || z.key === "ArrowDown" || z.key === "ArrowUp") && (ne = H.current) != null && ne.contains(z.target)) {
          z.preventDefault(), le();
          const O = y.filter((Q) => !Q.disabled).findIndex((Q) => Q.value === C);
          V(O >= 0 ? O : 0);
        }
        return;
      }
      const I = y.filter((E) => !E.disabled), R = M;
      switch (z.key) {
        case "Escape":
          z.preventDefault(), W();
          break;
        case "ArrowDown":
          z.preventDefault(), V((E) => {
            const O = E + 1;
            return O >= I.length ? 0 : O;
          });
          break;
        case "ArrowUp":
          z.preventDefault(), V((E) => {
            const O = E - 1;
            return O < 0 ? I.length - 1 : O;
          });
          break;
        case "Enter":
        case " ":
          z.preventDefault(), R >= 0 && R < I.length && Z(I[R].value);
          break;
      }
    }
    return document.addEventListener("keydown", A), () => {
      document.removeEventListener("keydown", A);
    };
  }, [T, M, y, C]), P(() => {
    if (M >= 0 && ie.current) {
      const A = ie.current.querySelectorAll('[role="option"]');
      let z = 0, I = 0;
      for (let B = 0; B < A.length; B++)
        if (!y[B].disabled) {
          if (I === M) {
            z = B;
            break;
          }
          I++;
        }
      const R = A[z];
      R && R.scrollIntoView({ block: "nearest" });
    }
  }, [M, y]);
  const q = {
    small: {
      trigger: "h-8 px-4 py-1.5 plate-round",
      menu: "",
      menuItem: "",
      icon: "w-4 h-4"
    },
    medium: {
      trigger: "h-10 px-4 py-2.5 plate-round",
      menu: "",
      menuItem: "",
      icon: "w-5 h-5"
    },
    large: {
      trigger: "h-12 px-4 py-3.5 plate-round",
      menu: "",
      menuItem: "",
      icon: "w-6 h-6"
    }
  }[t], ce = r ? "bg-[var(--field-background-error)] text-[var(--text-primary)]" : "bg-[var(--field-background)] text-[var(--text-primary)]", x = r ? "bg-[var(--field-border-error)]" : "bg-[var(--field-border)] hover:bg-[var(--field-border-hover)] focus-within:!bg-[var(--field-border-focus)]", de = /* @__PURE__ */ v("div", { ref: H, className: "relative inline-block w-full", children: [
    /* @__PURE__ */ n(
      "select",
      {
        ref: X,
        name: d,
        value: C,
        onChange: l,
        className: "sr-only",
        "aria-hidden": "true",
        tabIndex: -1,
        ...k,
        children: y.map((A, z) => /* @__PURE__ */ n("option", { value: A.value, disabled: A.disabled, children: A.label }, z))
      }
    ),
    /* @__PURE__ */ n("div", { className: `plate-round p-px transition-colors [transition-duration:var(--duration-fast)] ${x} ${o ? "opacity-50" : ""}`, children: /* @__PURE__ */ v(
      "button",
      {
        type: "button",
        id: g,
        onClick: le,
        disabled: o,
        className: `
          w-full
          flex items-center justify-between
          font-mono text-sm
          transition-colors [transition-duration:var(--duration-fast)]
          ${q.trigger}
          ${ce}
          ${o ? "cursor-not-allowed" : "cursor-pointer"}
          focus:outline-none
        `,
        "aria-haspopup": "listbox",
        "aria-expanded": T,
        "aria-label": u != null && u !== "" ? void 0 : m ?? "Select an option",
        children: [
          /* @__PURE__ */ n("span", { className: "truncate text-left flex-1", children: pe || "Select..." }),
          /* @__PURE__ */ n(
            "span",
            {
              className: `
            ${q.icon}
            inline-flex items-center justify-center font-mono leading-none
            text-[var(--text-secondary)]
            transition-transform [transition-duration:var(--duration-normal)]
            flex-shrink-0 ml-2
            ${T ? "rotate-180" : ""}
            ${o ? "opacity-50" : ""}
          `,
              "aria-hidden": "true",
              children: "▼"
            }
          )
        ]
      }
    ) }),
    T && /* @__PURE__ */ n(
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
        children: /* @__PURE__ */ n(
          "div",
          {
            ref: ie,
            role: "listbox",
            className: `plate-round bg-[var(--surface-card)] ${q.menu} max-h-[300px] overflow-y-auto`,
            children: y.map((A, z) => {
              const I = A.disabled, R = A.value === C, E = y.filter((O) => !O.disabled).findIndex((O) => O.value === A.value) === M && !I;
              return /* @__PURE__ */ v(
                "button",
                {
                  type: "button",
                  role: "option",
                  "aria-selected": R,
                  disabled: I,
                  onClick: () => !I && Z(A.value),
                  className: `
                  w-full flex items-center gap-2
                  px-4 py-3
                  font-mono text-sm text-left
                  transition-colors [transition-duration:var(--duration-fast)]
                  ${I ? "opacity-50 cursor-not-allowed" : "text-[var(--text-primary)] hover:bg-[var(--surface-subtle)] cursor-pointer"}
                  ${E && !I ? "bg-[var(--surface-subtle)]" : ""}
                  ${q.menuItem}
                `,
                  children: [
                    /* @__PURE__ */ n("span", { className: "truncate flex-1 min-w-0", children: A.label }),
                    R && /* @__PURE__ */ n("span", { className: `${q.icon} inline-flex items-center justify-center font-mono font-bold text-[var(--border-focus)] flex-shrink-0`, "aria-hidden": "true", children: "✓" })
                  ]
                },
                z
              );
            })
          }
        )
      }
    )
  ] });
  return u == null || u === "" ? /* @__PURE__ */ n("div", { className: `w-full ${a}`.trim(), children: de }) : /* @__PURE__ */ v("div", { className: `w-full space-y-1 ${a}`.trim(), children: [
    /* @__PURE__ */ n(
      "label",
      {
        htmlFor: g,
        className: "block font-mono text-sm text-secondary-800 dark:text-secondary-200",
        children: u
      }
    ),
    de
  ] });
});
ir.displayName = "Select";
const lr = j(
  ({
    size: e = "medium",
    label: t,
    error: r = !1,
    disabled: o = !1,
    checked: a,
    onChange: s,
    onCheckedChange: i,
    className: c = "",
    ...l
  }, d) => {
    const m = {
      small: {
        checkbox: "w-4 h-4",
        glyph: "text-3xs",
        label: "text-sm"
      },
      medium: {
        checkbox: "w-5 h-5",
        glyph: "text-xs",
        label: "text-sm"
      },
      large: {
        checkbox: "w-6 h-6",
        glyph: "text-sm",
        label: "text-sm"
      }
    }[e], h = r ? "bg-[var(--field-border-error)]" : `bg-[var(--field-border)] hover:bg-[var(--field-border-hover)]
         peer-checked:bg-[var(--button-primary-background)]
         peer-checked:hover:bg-[var(--button-primary-background-hover)]`, k = r ? "peer-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-error)]" : "peer-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]", w = ($) => {
      s && s($), i && i($.target.checked);
    }, N = t != null && t !== !1 && t !== "", g = /* @__PURE__ */ v(re, { children: [
      /* @__PURE__ */ n(
        "input",
        {
          ref: d,
          type: "checkbox",
          ...a !== void 0 ? { checked: a } : {},
          disabled: o,
          onChange: w,
          className: "peer sr-only",
          "aria-invalid": r || void 0,
          ...l
        }
      ),
      /* @__PURE__ */ n(
        "span",
        {
          "aria-hidden": "true",
          className: `
            plate-round p-px inline-flex shrink-0
            ${m.checkbox}
            transition-colors [transition-duration:var(--duration-fast)]
            ${o ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
            ${h}
            ${r ? "peer-checked:[&>span]:bg-[var(--field-border-error)]" : "peer-checked:[&>span]:bg-[var(--button-primary-background)]"}
            peer-checked:[&>span>span]:opacity-100
            ${k}
          `,
          children: /* @__PURE__ */ n(
            "span",
            {
              className: `
              plate-round inline-flex h-full w-full items-center justify-center
              bg-[var(--field-background)]
              transition-colors [transition-duration:var(--duration-fast)]
            `,
              children: /* @__PURE__ */ n(
                "span",
                {
                  className: `${m.glyph} font-mono leading-none opacity-0 transition-opacity [transition-duration:var(--duration-fast)] ${r ? "text-white" : "text-[var(--button-primary-text)]"}`,
                  "aria-hidden": "true",
                  children: "✓"
                }
              )
            }
          )
        }
      )
    ] });
    return /* @__PURE__ */ n("div", { className: `flex items-center gap-2 ${c}`, children: N ? /* @__PURE__ */ v(
      "label",
      {
        className: `inline-flex items-center gap-2 font-mono ${o ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`,
        children: [
          g,
          /* @__PURE__ */ n("span", { className: `${m.label} text-[var(--text-primary)]`, children: t })
        ]
      }
    ) : /* @__PURE__ */ n("span", { className: "inline-flex items-center gap-2", children: g }) });
  }
);
lr.displayName = "Checkbox";
const cr = j(function({ label: t, id: r, className: o = "", disabled: a, ...s }, i) {
  const c = fe(), l = r ?? c;
  return /* @__PURE__ */ v("span", { className: `inline-flex flex-col gap-1.5 font-mono ${o}`, children: [
    t && /* @__PURE__ */ n("label", { htmlFor: l, className: "text-sm text-secondary-800 dark:text-secondary-300", children: t }),
    /* @__PURE__ */ n(
      "input",
      {
        ref: i,
        id: l,
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
cr.displayName = "Slider";
const dr = j(
  ({
    size: e = "medium",
    label: t,
    error: r = !1,
    disabled: o = !1,
    checked: a,
    onChange: s,
    onCheckedChange: i,
    className: c = "",
    ...l
  }, d) => {
    const m = {
      small: {
        radio: "w-4 h-4",
        // 16px × 16px
        dot: "w-1.5 h-1.5",
        // 6px inner dot
        label: "text-sm"
        // 14px text
      },
      medium: {
        radio: "w-5 h-5",
        // 20px × 20px
        dot: "w-2 h-2",
        // 8px inner dot
        label: "text-sm"
        // 14px text
      },
      large: {
        radio: "w-6 h-6",
        // 24px × 24px
        dot: "w-2.5 h-2.5",
        // 10px inner dot
        label: "text-sm"
        // 14px text
      }
    }[e], h = r ? `
        border-[var(--field-border-error)]
        bg-[var(--field-background)] hover:bg-[var(--field-background-error)]
        peer-checked:bg-[var(--field-border-error)]
        transition-colors [transition-duration:var(--duration-fast)]
      ` : `
        border-[var(--field-border)] hover:border-[var(--field-border-hover)]
        bg-[var(--field-background)]
        peer-checked:border-[var(--button-primary-background)]
        peer-checked:bg-[var(--button-primary-background)]
        peer-checked:hover:bg-[var(--button-primary-background-hover)]
        transition-colors [transition-duration:var(--duration-fast)]
      `, k = r ? "peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--focus-ring-error)] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[var(--focus-offset-color)]" : "peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--focus-ring-primary)] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[var(--focus-offset-color)]", w = ($) => {
      s && s($), i && i($.target.checked);
    }, N = t != null && t !== !1 && t !== "", g = /* @__PURE__ */ v(re, { children: [
      /* @__PURE__ */ n(
        "input",
        {
          ref: d,
          type: "radio",
          ...a !== void 0 ? { checked: a } : {},
          disabled: o,
          onChange: w,
          className: "peer sr-only",
          "aria-invalid": r || void 0,
          ...l
        }
      ),
      /* @__PURE__ */ n(
        "span",
        {
          "aria-hidden": "true",
          className: `
            relative inline-flex shrink-0 items-center justify-center
            ${m.radio}
            rounded-full
            border-2
            ${o ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
            ${h}
            ${k}
            peer-checked:[&>span]:opacity-100
          `,
          children: /* @__PURE__ */ n(
            "span",
            {
              className: `
              ${m.dot}
              rounded-full opacity-0
              transition-opacity [transition-duration:var(--duration-fast)]
              ${r ? "bg-white" : "bg-[var(--button-primary-text)]"}
            `
            }
          )
        }
      )
    ] });
    return /* @__PURE__ */ n("div", { className: `flex items-center gap-2 ${c}`, children: N ? /* @__PURE__ */ v(
      "label",
      {
        className: `inline-flex items-center gap-2 font-mono ${o ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`,
        children: [
          g,
          /* @__PURE__ */ n("span", { className: `${m.label} text-[var(--text-primary)]`, children: t })
        ]
      }
    ) : /* @__PURE__ */ n("span", { className: "inline-flex items-center gap-2", children: g }) });
  }
);
dr.displayName = "Radio";
const ur = j(
  ({
    size: e = "medium",
    error: t = !1,
    disabled: r = !1,
    className: o = "",
    label: a,
    id: s,
    ...i
  }, c) => {
    const l = fe(), d = s ?? (a != null && a !== "" ? l : void 0), u = `
      w-full
      font-mono text-sm
      transition-colors [transition-duration:var(--duration-fast)]
      placeholder:text-[var(--field-placeholder)]
      disabled:cursor-not-allowed disabled:opacity-50
      focus:outline-none
      resize-y
    `, m = {
      small: "min-h-8 px-3 py-1.5 plate-round",
      medium: "min-h-10 px-4 py-2.5 plate-round",
      large: "min-h-12 px-5 py-3.5 plate-round"
    }, h = t ? "bg-[var(--field-background-error)] text-[var(--text-primary)]" : "bg-[var(--field-background)] text-[var(--text-primary)]", w = /* @__PURE__ */ n(
      "div",
      {
        className: `w-full plate-round p-px transition-colors [transition-duration:var(--duration-fast)] ${t ? "bg-[var(--field-border-error)]" : "bg-[var(--field-border)] hover:bg-[var(--field-border-hover)] focus-within:!bg-[var(--field-border-focus)]"}`,
        children: /* @__PURE__ */ n(
          "textarea",
          {
            ref: c,
            id: d,
            disabled: r,
            className: `${u} ${m[e]} ${h} ${o}`,
            ...i
          }
        )
      }
    );
    return a == null || a === "" ? w : /* @__PURE__ */ v("div", { className: "w-full space-y-1", children: [
      /* @__PURE__ */ n(
        "label",
        {
          htmlFor: d,
          className: "block font-mono text-sm text-secondary-800 dark:text-secondary-200",
          children: a
        }
      ),
      w
    ] });
  }
);
ur.displayName = "Textarea";
const nt = j(
  ({
    checked: e = !1,
    onCheckedChange: t,
    size: r = "medium",
    label: o,
    hideLabel: a = !1,
    disabled: s = !1,
    icon: i,
    className: c = "",
    ...l
  }, d) => {
    const m = {
      small: {
        track: "h-6 w-11",
        // 24px × 44px
        knob: "h-5 w-5",
        // 20px × 20px knob
        knobTranslate: e ? "translateX(22px)" : "translateX(2px)",
        // Unchecked: 2px from left (perfect), Checked: 22px (2px gap from right edge)
        iconSize: "w-3 h-3"
        // 12px icon for small knob
      },
      medium: {
        track: "h-8 w-14",
        // 32px × 56px (matches small button height)
        knob: "h-6 w-6",
        // 24px × 24px knob
        knobTranslate: e ? "translateX(29px)" : "translateX(3px)",
        // Unchecked: 3px from left (1px right), Checked: 29px (1px left from previous)
        iconSize: "w-3 h-3"
        // 12px icon for medium knob (matches ThemeToggle)
      },
      large: {
        track: "h-10 w-[72px]",
        // 40px × 72px (matches medium button height)
        knob: "h-8 w-8",
        // 32px × 32px knob
        knobTranslate: e ? "translateX(37px)" : "translateX(3px)",
        // Unchecked: 3px from left (1px right), Checked: 37px (3px left from previous)
        iconSize: "w-4 h-4"
        // 16px icon for large knob
      }
    }[r], h = () => {
      !s && t && t(!e);
    }, k = (w) => {
      (w.key === " " || w.key === "Enter") && (w.preventDefault(), !s && t && t(!e));
    };
    return /* @__PURE__ */ v("div", { className: `flex items-center gap-3 ${c}`, children: [
      /* @__PURE__ */ n(
        "button",
        {
          ref: d,
          type: "button",
          role: "switch",
          "aria-checked": e,
          "aria-label": o || (e ? "On" : "Off"),
          disabled: s,
          onClick: h,
          onKeyDown: k,
          className: `
            relative inline-flex items-center
            shrink-0
            ${m.track}
            plate-round
            transition-colors [transition-duration:var(--duration-normal)]
            focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]
            ${s ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            ${e ? "bg-[var(--button-primary-background)]" : "bg-secondary-300 dark:bg-secondary-700"}
          `,
          ...l,
          children: /* @__PURE__ */ n(
            "span",
            {
              className: `
              inline-flex items-center justify-center
              ${m.knob}
              plate-round
              bg-[var(--field-background)]
              shadow-none
              transform transition-transform [transition-duration:var(--duration-normal)]
            `,
              style: {
                transform: m.knobTranslate
              },
              children: i && /* @__PURE__ */ n("span", { className: m.iconSize, children: i })
            }
          )
        }
      ),
      o && !a && /* @__PURE__ */ n(
        "span",
        {
          className: `text-sm font-mono ${s ? "text-secondary-700 dark:text-secondary-400" : "text-[var(--text-primary)]"}`,
          children: o
        }
      )
    ] });
  }
);
nt.displayName = "Switch";
function jr({
  trigger: e,
  items: t,
  align: r = "left",
  label: o = "Actions",
  size: a = "medium"
}) {
  const [s, i] = G(!1), [c, l] = G(-1), d = U(null), u = U(null), m = () => {
    i(!s), s || l(-1);
  }, h = () => {
    i(!1), l(-1);
  }, k = (y) => {
    y.disabled || (y.onClick(), h());
  };
  P(() => {
    function y(T) {
      d.current && !d.current.contains(T.target) && h();
    }
    if (s)
      return document.addEventListener("mousedown", y), () => {
        document.removeEventListener("mousedown", y);
      };
  }, [s]), P(() => {
    function y(T) {
      if (!s) return;
      const L = t.filter((V) => !V.disabled), M = c;
      switch (T.key) {
        case "Escape":
          T.preventDefault(), h();
          break;
        case "ArrowDown":
          T.preventDefault(), l((V) => {
            const C = V + 1;
            return C >= L.length ? 0 : C;
          });
          break;
        case "ArrowUp":
          T.preventDefault(), l((V) => {
            const C = V - 1;
            return C < 0 ? L.length - 1 : C;
          });
          break;
        case "Enter":
        case " ":
          T.preventDefault(), M >= 0 && M < L.length && k(L[M]);
          break;
      }
    }
    if (s)
      return document.addEventListener("keydown", y), () => {
        document.removeEventListener("keydown", y);
      };
  }, [s, c, t]), P(() => {
    if (c >= 0 && u.current) {
      const T = u.current.querySelectorAll('[role="menuitem"]')[c];
      T && T.scrollIntoView({ block: "nearest" });
    }
  }, [c]);
  const N = {
    small: {
      button: "h-8 px-4 py-1.5 plate-round",
      menu: "",
      menuItem: "",
      icon: "w-4 h-4"
    },
    medium: {
      button: "h-10 px-5 py-2.5 plate-round",
      menu: "",
      menuItem: "",
      icon: "w-5 h-5"
    },
    large: {
      button: "h-12 px-6 py-3.5 plate-round",
      menu: "",
      menuItem: "",
      icon: "w-6 h-6"
    }
  }[a], g = /* @__PURE__ */ v(
    "button",
    {
      onClick: m,
      className: `
        inline-flex items-center justify-center gap-2
        font-mono text-sm
        ${N.button}
        transition-colors [transition-duration:var(--duration-normal)]
        cursor-pointer
        bg-[var(--button-secondary-background)] hover:bg-[var(--button-secondary-background-hover)] active:brightness-95
        text-[var(--button-secondary-text)] hover:text-[var(--button-secondary-text-hover)]
        focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-secondary)]
      `,
      "aria-haspopup": "true",
      "aria-expanded": s,
      children: [
        o,
        /* @__PURE__ */ n("span", { className: `${N.icon} inline-flex items-center justify-center font-mono leading-none transition-transform [transition-duration:var(--duration-normal)] ${s ? "rotate-180" : ""}`, "aria-hidden": "true", children: "▼" })
      ]
    }
  );
  return /* @__PURE__ */ v("div", { ref: d, className: "relative inline-block", children: [
    e ? /* @__PURE__ */ n("div", { onClick: m, role: "button", tabIndex: 0, onKeyDown: (y) => {
      (y.key === "Enter" || y.key === " ") && (y.preventDefault(), m());
    }, children: e }) : g,
    s && /* @__PURE__ */ n(
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
        children: /* @__PURE__ */ n(
          "div",
          {
            ref: u,
            role: "menu",
            "aria-orientation": "vertical",
            className: `plate-round bg-[var(--surface-card)] ${N.menu}`,
            children: t.map((y, T) => {
              const L = y.variant === "destructive", M = y.disabled;
              return /* @__PURE__ */ v(
                "button",
                {
                  role: "menuitem",
                  disabled: M,
                  onClick: () => k(y),
                  className: `
                  w-full flex items-center gap-2
                  px-4 py-3
                  font-mono text-sm text-left
                  transition-colors [transition-duration:var(--duration-fast)]
                  ${M ? "opacity-50 cursor-not-allowed" : L ? "text-error-600 hover:bg-[var(--field-background-error)]" : "text-[var(--text-primary)] hover:bg-[var(--surface-subtle)]"}
                  ${c === T && !M ? "bg-[var(--surface-subtle)]" : ""}
                  ${N.menuItem}
                `,
                  children: [
                    /* @__PURE__ */ v("div", { className: "flex items-center gap-2 flex-1 min-w-0", children: [
                      y.icon && /* @__PURE__ */ n("span", { className: `inline-flex items-center justify-center ${N.icon} flex-shrink-0`, children: y.icon }),
                      /* @__PURE__ */ n("span", { className: "truncate", children: y.label })
                    ] }),
                    y.iconRight && /* @__PURE__ */ n("span", { className: `inline-flex items-center justify-center ${N.icon} flex-shrink-0 ml-auto`, children: y.iconRight })
                  ]
                },
                T
              );
            })
          }
        )
      }
    )
  ] });
}
const ve = "text-secondary-700 dark:text-secondary-600", ye = "text-secondary-800 dark:text-secondary-500", mr = {
  background: "repeating-linear-gradient(45deg, var(--surface-subtle), var(--surface-subtle) 8px, var(--surface-muted) 8px, var(--surface-muted) 16px)"
}, at = (e) => e === "wide" ? " [--csb-bw:min(calc(100%+240px),calc(100cqw-48px))] w-[var(--csb-bw)] ml-[calc((100%-var(--csb-bw))/2)]" : e === "full" ? " [--csb-bw:calc(100cqw-48px)] w-[var(--csb-bw)] ml-[calc((100%-var(--csb-bw))/2)]" : "";
function $e({
  aspect: e,
  caption: t,
  width: r
}) {
  return /* @__PURE__ */ v("figure", { className: `my-11${at(r)}`, children: [
    /* @__PURE__ */ n("div", { className: "plate-round p-px bg-[var(--border-hairline)]", children: /* @__PURE__ */ n(
      "div",
      {
        className: "plate-round w-full",
        style: { aspectRatio: e ?? "16 / 9", ...mr }
      }
    ) }),
    t && /* @__PURE__ */ n("figcaption", { className: `mt-2 text-xs ${ve}`, children: t })
  ] });
}
function Se({ title: e, text: t }) {
  return /* @__PURE__ */ v(re, { children: [
    /* @__PURE__ */ n("div", { className: "text-[var(--text-primary)]", children: e }),
    /* @__PURE__ */ n("p", { className: `m-0 text-sm leading-relaxed ${ye}`, children: t })
  ] });
}
function fr({ b: e }) {
  var t, r;
  switch (e.type) {
    case "meta":
      return /* @__PURE__ */ n("dl", { className: "mb-11 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(130px,1fr))]", children: e.items.map((o) => /* @__PURE__ */ v("div", { children: [
        /* @__PURE__ */ n("dt", { className: `text-xs uppercase tracking-[0.08em] ${ve}`, children: o.label }),
        /* @__PURE__ */ n("dd", { className: `m-0 mt-1 text-sm leading-normal ${ye}`, children: o.value })
      ] }, o.label)) });
    case "headline":
      return /* @__PURE__ */ v("header", { className: "mb-7 mt-16 first:mt-0 sm:mt-24 sm:first:mt-0", children: [
        e.kicker && /* @__PURE__ */ n("div", { className: `text-xs first-letter:uppercase ${ve}`, children: e.kicker }),
        /* @__PURE__ */ n("h2", { className: "mt-2 text-xl text-[var(--text-primary)]", children: e.title }),
        e.text && /* @__PURE__ */ n("p", { className: `mt-3 text-base leading-relaxed ${ye}`, children: e.text })
      ] });
    case "prose":
      return /* @__PURE__ */ n("p", { className: `my-7 text-base leading-relaxed ${ye}`, children: e.text });
    case "image":
      return /* @__PURE__ */ n($e, { aspect: e.aspect, caption: e.caption, width: e.width });
    case "imagePair":
      return /* @__PURE__ */ v("div", { className: `my-11 grid grid-cols-1 gap-3.5 sm:grid-cols-2${at(e.width)}`, children: [
        /* @__PURE__ */ n($e, { aspect: "4 / 3", caption: (t = e.captions) == null ? void 0 : t[0] }),
        /* @__PURE__ */ n($e, { aspect: "4 / 3", caption: (r = e.captions) == null ? void 0 : r[1] })
      ] });
    case "callouts":
      return /* @__PURE__ */ n("div", { className: "my-11 grid gap-x-8 gap-y-7 [grid-template-columns:repeat(auto-fit,minmax(160px,1fr))]", children: e.items.map((o) => /* @__PURE__ */ n("div", { className: "grid row-span-2 gap-y-1.5 [grid-template-rows:subgrid]", children: /* @__PURE__ */ n(Se, { title: o.title, text: o.text }) }, o.title)) });
    case "insights":
      return /* @__PURE__ */ n("ol", { className: "my-11 flex list-none flex-col gap-7 p-0", children: e.items.map((o, a) => /* @__PURE__ */ v("li", { className: "flex gap-3.5", children: [
        /* @__PURE__ */ n("span", { className: "flex-none text-sm leading-6 text-[var(--accent)]", children: String(a + 1).padStart(2, "0") }),
        /* @__PURE__ */ n("div", { children: /* @__PURE__ */ n(Se, { title: o.title, text: o.text }) })
      ] }, o.title)) });
    case "quote":
      return /* @__PURE__ */ v("figure", { className: "my-11 m-0 text-lg leading-relaxed text-[var(--text-primary)]", children: [
        /* @__PURE__ */ n("span", { "aria-hidden": "true", className: "mb-2 block text-3xl leading-none text-[var(--accent)]", children: "“" }),
        /* @__PURE__ */ n("blockquote", { className: "m-0 p-0", children: e.text }),
        e.name && /* @__PURE__ */ v("figcaption", { className: "mt-4 flex items-center gap-3 text-sm", children: [
          /* @__PURE__ */ n(sr, { size: "medium", src: e.image, alt: "" }),
          /* @__PURE__ */ v("span", { children: [
            /* @__PURE__ */ n("span", { className: "block text-[var(--text-primary)]", children: e.name }),
            e.role && /* @__PURE__ */ n("span", { className: `block text-xs ${ve}`, children: e.role })
          ] })
        ] })
      ] });
    case "list":
      return /* @__PURE__ */ n("ul", { className: "my-11 flex list-none flex-col gap-7 p-0", children: e.items.map((o) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(Se, { title: o.title, text: o.text }) }, o.title)) });
  }
}
function Dr({
  blocks: e,
  className: t = ""
}) {
  return /* @__PURE__ */ n("div", { className: `font-mono ${t}`, children: e.map((r, o) => /* @__PURE__ */ n(fr, { b: r }, o)) });
}
const pr = j(function({ meta: t, title: r, description: o, titleSuffix: a, thumb: s, thumbPosition: i = "start", selected: c = !1, className: l = "", ...d }, u) {
  const m = "as" in d && d.as ? d.as : null, h = m ? "as" : "href" in d && d.href != null ? "a" : "onClick" in d && d.onClick != null ? "button" : "div", k = `
    block w-full text-left p-3 plate-round
    transition-colors [transition-duration:var(--duration-fast)]
    font-mono
    ${h !== "div" ? "cursor-pointer hover:bg-[var(--surface-muted)] focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]" : ""}
    ${c ? "bg-[var(--surface-muted)]" : ""}
    ${l}
  `, w = /* @__PURE__ */ v(re, { children: [
    t && /* @__PURE__ */ n("span", { className: "block text-sm text-secondary-700 dark:text-secondary-600", children: t }),
    /* @__PURE__ */ v(
      "span",
      {
        className: `block text-base leading-6 ${h !== "div" ? "text-[var(--accent)]" : "text-[var(--text-primary)]"}`,
        children: [
          r,
          a && /* @__PURE__ */ n("span", { className: "ml-2 leading-none", children: a })
        ]
      }
    ),
    o && /* @__PURE__ */ n("span", { className: "mt-1 block text-sm leading-6 text-secondary-800 dark:text-secondary-500", children: o })
  ] }), N = s ? /* @__PURE__ */ v("span", { className: `flex items-start gap-4 ${i === "end" ? "flex-row-reverse" : ""}`, children: [
    /* @__PURE__ */ n("span", { className: "flex-shrink-0", children: s }),
    /* @__PURE__ */ n("span", { className: "block min-w-0 flex-1", children: w })
  ] }) : w;
  if (m) {
    const { asProps: g } = d;
    return /* @__PURE__ */ n(m, { ref: u, className: k, ...g, children: N });
  }
  if (h === "a") {
    const { href: g, ...$ } = d;
    return /* @__PURE__ */ n("a", { ref: u, href: g, className: k, ...$, children: N });
  }
  if (h === "button") {
    const { onClick: g, ...$ } = d;
    return /* @__PURE__ */ n("button", { ref: u, type: "button", onClick: g, className: k, ...$, children: N });
  }
  return /* @__PURE__ */ n("div", { ref: u, className: k, children: N });
});
pr.displayName = "ListRow";
const br = j(function({ variant: t = "inline", external: r = !1, className: o = "", children: a, ...s }, i) {
  const c = F(
    "font-mono text-[var(--accent)] transition-colors [transition-duration:var(--duration-fast)] hover:text-[var(--text-link-hover)]",
    "focus:outline-none focus-visible:[outline:var(--focus-ring-width)_solid_var(--focus-ring-primary)] focus-visible:[outline-offset:var(--focus-ring-offset)]",
    t === "inline" ? "underline underline-offset-2" : "no-underline hover:underline focus-visible:underline",
    o
  ), l = /* @__PURE__ */ v(re, { children: [
    a,
    r && /* @__PURE__ */ v(re, { children: [
      /* @__PURE__ */ n(ot, { name: "ExternalLink", size: "3", className: "ml-1" }),
      /* @__PURE__ */ n("span", { className: "sr-only", children: " (opens in new tab)" })
    ] })
  ] });
  if ("as" in s && s.as) {
    const { as: k, asProps: w } = s;
    return /* @__PURE__ */ n(k, { ref: i, className: c, ...w, children: l });
  }
  const { href: d, target: u, rel: m, ...h } = s;
  return /* @__PURE__ */ n(
    "a",
    {
      ref: i,
      href: d,
      className: c,
      target: r ? u ?? "_blank" : u,
      rel: r ? m ?? "noopener noreferrer" : m,
      ...h,
      children: l
    }
  );
});
br.displayName = "Link";
function gr({ children: e, onClick: t }) {
  const [r, o] = G(!1);
  return P(() => {
    const a = requestAnimationFrame(() => o(!0));
    return () => cancelAnimationFrame(a);
  }, []), /* @__PURE__ */ n(
    "div",
    {
      role: "status",
      onClick: t,
      className: `
        plate-round p-px bg-[var(--border-hairline)]
        transition-transform [transition-duration:var(--duration-normal)] [transition-timing-function:steps(5)]
        ${r ? "translate-y-0" : "translate-y-16"}
        ${t ? "cursor-pointer" : ""}
      `,
      children: /* @__PURE__ */ n("div", { className: "plate-round bg-[var(--surface-muted)] px-3 py-2.5 font-mono text-sm text-[var(--text-primary)] whitespace-nowrap overflow-hidden text-ellipsis", children: e })
    }
  );
}
function Or({ toasts: e, onDismiss: t }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "aria-live": "polite",
      className: "fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2",
      style: { zIndex: "var(--z-index-popover)" },
      children: e.map((r) => /* @__PURE__ */ n(gr, { onClick: t ? () => t(r.id) : void 0, children: r.message }, r.id))
    }
  );
}
function Fr({ isOpen: e, onClose: t, ariaLabel: r, children: o }) {
  const [a, s] = G(e);
  P(() => {
    e && s(!0);
  }, [e]);
  const i = a && !e;
  return P(() => {
    if (!e) return;
    const c = (l) => {
      l.key === "Escape" && t();
    };
    return document.addEventListener("keydown", c), () => document.removeEventListener("keydown", c);
  }, [e, t]), P(() => (e ? document.body.style.overflow = "hidden" : document.body.style.overflow = "unset", () => {
    document.body.style.overflow = "unset";
  }), [e]), a ? /* @__PURE__ */ v(re, { children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: `fixed inset-0 bg-[var(--surface-overlay)] ${i ? "animate-out fade-out fill-mode-forwards" : "animate-in fade-in"}`,
        style: { zIndex: "var(--z-index-overlay)", animationDuration: "var(--duration-slow)" },
        onClick: t,
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ n(
      "div",
      {
        role: "dialog",
        "aria-modal": "true",
        "aria-label": r,
        className: `fixed bottom-0 inset-x-0 mx-auto w-[min(540px,100%)] plate-round-lg-top bg-[var(--surface-container-stroke)] pt-px px-px ${i ? "animate-out slide-out-to-bottom fill-mode-forwards" : "animate-in slide-in-from-bottom"}`,
        style: { zIndex: "var(--z-index-modal)", animationDuration: "var(--duration-slow)" },
        onAnimationEnd: () => {
          i && s(!1);
        },
        children: /* @__PURE__ */ v("div", { className: "plate-round-lg-top bg-[var(--surface-card)] px-5 pb-6 pt-2.5 flex flex-col items-center gap-3 max-h-[70vh]", children: [
          /* @__PURE__ */ n("div", { className: "w-9 h-1 bg-[var(--surface-container-stroke)]", "aria-hidden": "true" }),
          /* @__PURE__ */ n("div", { className: "w-full overflow-y-auto", tabIndex: 0, children: o })
        ] })
      }
    )
  ] }) : null;
}
function Zr() {
  const { theme: e, setTheme: t } = mt(), [r, o] = G(!1);
  if (P(() => {
    o(!0);
  }, []), !r)
    return /* @__PURE__ */ v("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ n("div", { className: "w-11 h-6 rounded-none bg-[var(--field-border)]" }),
      /* @__PURE__ */ n("span", { className: "text-sm font-mono text-[var(--text-secondary)]", children: "Theme" })
    ] });
  const a = e === "dark";
  return /* @__PURE__ */ v("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ n(
      nt,
      {
        checked: a,
        onCheckedChange: () => {
          t(a ? "light" : "dark");
        },
        size: "small",
        icon: a ? /* @__PURE__ */ n("span", { className: "w-3 h-3 inline-flex items-center justify-center font-mono text-[10px] text-[var(--border-focus)]", "aria-hidden": "true", children: "☾" }) : /* @__PURE__ */ n("span", { className: "w-3 h-3 inline-flex items-center justify-center font-mono text-[10px] text-[var(--text-secondary)]", "aria-hidden": "true", children: "☀" }),
        "aria-label": `Switch to ${a ? "light" : "dark"} theme`
      }
    ),
    /* @__PURE__ */ n("span", { className: "text-sm font-mono text-[var(--text-primary)]", children: a ? "Dark" : "Light" })
  ] });
}
const st = De(null);
function Ie(e) {
  const t = Le(st);
  if (!t)
    throw new Error(`[@scorp-ds/components] ${e} must be used inside <Tabs>.`);
  return t;
}
function Gr({
  value: e,
  defaultValue: t,
  onValueChange: r,
  children: o,
  className: a
}) {
  const s = e !== void 0, [i, c] = G(() => t ?? ""), l = s ? e : i, d = fe().replace(/:/g, ""), u = U([]), m = ct(
    (k) => {
      s || c(k), r == null || r(k);
    },
    [s, r]
  ), h = dt(
    () => ({
      value: l,
      onValueChange: m,
      baseId: d,
      listValuesRef: u,
      isControlled: s
    }),
    [l, m, d, s]
  );
  return /* @__PURE__ */ n(st.Provider, { value: h, children: /* @__PURE__ */ n("div", { className: F("w-full", a), children: o }) });
}
function hr(e) {
  const t = [];
  return Ae.Children.forEach(e, (r) => {
    if (!Ae.isValidElement(r)) return;
    if (r.type.displayName === "TabsTrigger") {
      const a = r.props.value;
      typeof a == "string" && t.push(a);
    }
  }), t;
}
function xr({
  children: e,
  className: t,
  "aria-label": r,
  "aria-labelledby": o
}) {
  const { value: a, isControlled: s, onValueChange: i, listValuesRef: c } = Ie("TabsList"), l = hr(e);
  c.current = l;
  const d = l.join("\0");
  return ut(() => {
    const u = c.current;
    s || u.length === 0 || u.includes(a) || i(u[0]);
  }, [s, c, i, a, d]), /* @__PURE__ */ n(
    "div",
    {
      role: "tablist",
      "aria-label": r,
      "aria-labelledby": o,
      className: F(
        "flex flex-wrap gap-0 border-b-[0.5px] border-solid border-[var(--surface-container-stroke)]",
        t
      ),
      children: e
    }
  );
}
xr.displayName = "TabsList";
const vr = j(function({ value: t, children: r, className: o, disabled: a, onKeyDown: s, onClick: i, type: c = "button", ...l }, d) {
  const { value: u, onValueChange: m, baseId: h, listValuesRef: k } = Ie("TabsTrigger"), w = u === t, N = `${h}-tab-${t}`, g = `${h}-panel-${t}`, $ = (L) => {
    m(L), requestAnimationFrame(() => {
      var M;
      (M = document.getElementById(`${h}-tab-${L}`)) == null || M.focus();
    });
  }, y = (L) => {
    const M = k.current, V = M.indexOf(t);
    if (V < 0) return;
    const C = M[(V + L + M.length) % M.length];
    $(C);
  }, T = (L) => {
    if (s == null || s(L), L.defaultPrevented || a) return;
    const M = k.current;
    switch (L.key) {
      case "ArrowRight":
      case "ArrowDown":
        L.preventDefault(), y(1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        L.preventDefault(), y(-1);
        break;
      case "Home":
        L.preventDefault(), M[0] && $(M[0]);
        break;
      case "End":
        L.preventDefault(), M.length && $(M[M.length - 1]);
        break;
    }
  };
  return /* @__PURE__ */ n(
    "button",
    {
      ref: d,
      type: c,
      role: "tab",
      id: N,
      "aria-selected": w,
      "aria-controls": g,
      tabIndex: w ? 0 : -1,
      disabled: a,
      className: F(
        "-mb-px rounded-none border-b-2 px-4 py-2 font-mono text-sm transition-colors [transition-duration:var(--duration-normal)]",
        w ? "border-[var(--button-primary-background)] bg-transparent text-[var(--text-primary)]" : "border-transparent text-secondary-700 hover:text-[var(--text-primary)] dark:text-secondary-300",
        a && "cursor-not-allowed opacity-50",
        o
      ),
      onClick: (L) => {
        i == null || i(L), !L.defaultPrevented && !a && m(t);
      },
      onKeyDown: T,
      ...l,
      children: r
    }
  );
});
vr.displayName = "TabsTrigger";
function yr({ value: e, children: t, className: r, forceMount: o = !1 }) {
  const { value: a, baseId: s } = Ie("TabsContent"), i = a === e, c = `${s}-tab-${e}`, l = `${s}-panel-${e}`;
  return !o && !i ? null : !i && o ? /* @__PURE__ */ n(
    "div",
    {
      id: l,
      role: "tabpanel",
      "aria-labelledby": c,
      hidden: !0,
      className: F("p-4 font-mono outline-none", r),
      children: t
    }
  ) : /* @__PURE__ */ n(
    "div",
    {
      id: l,
      role: "tabpanel",
      "aria-labelledby": c,
      tabIndex: 0,
      className: F(
        "p-4 font-mono outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--focus-offset-color)]",
        r
      ),
      children: t
    }
  );
}
yr.displayName = "TabsContent";
const it = {
  compact: "px-3 py-2",
  // 12 / 8
  comfortable: "px-4 py-3",
  // 16 / 12
  spacious: "px-5 py-4"
  // 20 / 16
}, Ce = De("compact"), kr = j(function({ className: t, striped: r, bordered: o, density: a = "compact", children: s, ...i }, c) {
  const l = /* @__PURE__ */ n(Ce.Provider, { value: a, children: /* @__PURE__ */ n(
    "table",
    {
      ref: c,
      className: F(
        "w-full border-collapse font-mono text-sm text-[var(--text-primary)]",
        r && "[&_tbody_tr:nth-child(even)]:bg-[var(--surface-subtle)]",
        t
      ),
      ...i,
      children: s
    }
  ) });
  return o ? /* @__PURE__ */ n("div", { className: "plate-round-lg p-px bg-[var(--surface-container-stroke)]", children: /* @__PURE__ */ n("div", { className: "plate-round-lg bg-[var(--surface-card)]", children: l }) }) : l;
});
kr.displayName = "Table";
const wr = j(function({ className: t, ...r }, o) {
  return /* @__PURE__ */ n(
    "thead",
    {
      ref: o,
      className: F(
        "border-b-[0.5px] border-solid border-[var(--surface-container-stroke)] bg-[var(--surface-subtle)]",
        t
      ),
      ...r
    }
  );
});
wr.displayName = "TableHeader";
const Nr = j(function({ className: t, ...r }, o) {
  return /* @__PURE__ */ n("tbody", { ref: o, className: F(t), ...r });
});
Nr.displayName = "TableBody";
const $r = j(function({ className: t, ...r }, o) {
  return /* @__PURE__ */ n(
    "tfoot",
    {
      ref: o,
      className: F(
        "border-t-[0.5px] border-solid border-[var(--surface-container-stroke)] bg-[var(--surface-subtle)]",
        t
      ),
      ...r
    }
  );
});
$r.displayName = "TableFooter";
const Sr = j(function({ className: t, ...r }, o) {
  return /* @__PURE__ */ n(
    "tr",
    {
      ref: o,
      className: F(
        "border-b-[0.5px] border-solid border-[var(--surface-container-stroke)] transition-colors [transition-duration:var(--duration-normal)]",
        t
      ),
      ...r
    }
  );
});
Sr.displayName = "TableRow";
const Mr = j(function({ className: t, scope: r = "col", ...o }, a) {
  const s = Le(Ce);
  return /* @__PURE__ */ n(
    "th",
    {
      ref: a,
      scope: r,
      className: F(
        it[s],
        "text-left font-semibold text-[var(--text-primary)]",
        t
      ),
      ...o
    }
  );
});
Mr.displayName = "TableHead";
const Lr = j(function({ className: t, ...r }, o) {
  const a = Le(Ce);
  return /* @__PURE__ */ n(
    "td",
    {
      ref: o,
      className: F(
        it[a],
        "align-middle text-secondary-800 dark:text-secondary-200",
        t
      ),
      ...r
    }
  );
});
Lr.displayName = "TableCell";
const zr = {
  none: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  6: "gap-6",
  8: "gap-8"
};
function Br({ children: e, gap: t = "4", className: r, axis: o = "vertical" }) {
  return /* @__PURE__ */ n(
    "div",
    {
      className: F(
        "flex",
        o === "vertical" ? "flex-col" : "flex-row flex-wrap items-center",
        zr[t],
        r
      ),
      children: e
    }
  );
}
function Ur({ children: e, ...t }) {
  return /* @__PURE__ */ n(
    ft,
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
  Hr as Alert,
  sr as Avatar,
  Rr as Badge,
  Fr as BottomSheet,
  Oe as Button,
  Vr as Card,
  Dr as CaseStudyBlocks,
  lr as Checkbox,
  _r as Divider,
  jr as Dropdown,
  pt as Input,
  br as Link,
  pr as ListRow,
  Er as Modal,
  dr as Radio,
  ir as Select,
  cr as Slider,
  Br as Stack,
  nt as Switch,
  Ar as TUI_ICON_GLYPHS,
  kr as Table,
  Nr as TableBody,
  Lr as TableCell,
  $r as TableFooter,
  Mr as TableHead,
  wr as TableHeader,
  Sr as TableRow,
  Gr as Tabs,
  yr as TabsContent,
  xr as TabsList,
  vr as TabsTrigger,
  ur as Textarea,
  Ur as ThemeProvider,
  Zr as ThemeToggle,
  gr as Toast,
  Or as Toaster,
  Pr as Tooltip,
  ot as TuiIcon,
  F as cn
};
//# sourceMappingURL=index.esm.js.map

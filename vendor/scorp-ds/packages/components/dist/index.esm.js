import { jsxs as y, jsx as o, Fragment as ie } from "react/jsx-runtime";
import Ee, { forwardRef as O, useEffect as L, useId as me, useRef as W, useState as U, useImperativeHandle as it, createContext as Fe, useContext as ze, useCallback as lt, useMemo as ct, useLayoutEffect as dt } from "react";
import { useTheme as ut, ThemeProvider as mt } from "next-themes";
const Ge = O(
  ({
    variant: e = "primary",
    size: t = "medium",
    disabled: r = !1,
    className: n = "",
    children: a,
    iconLeft: s,
    iconRight: i,
    href: c,
    target: l,
    rel: d,
    "aria-label": u,
    "aria-labelledby": m,
    ...h
  }, g) => {
    const w = `
      inline-flex items-center justify-center
      font-mono text-sm
      transition-colors [transition-duration:var(--duration-fast)]
      cursor-pointer
      disabled:cursor-not-allowed disabled:opacity-50
      focus:outline-none
      focus-visible:![box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--btn-ring)]
    `, k = () => e === "icon" ? !0 : !a || typeof a == "string" || typeof a == "number" ? !1 : typeof a == "object" && a !== null && "type" in a ? typeof a.type < "u" : Array.isArray(a) ? a.every(
      (A) => typeof A == "object" && A !== null && "type" in A
    ) : !1;
    L(() => {
      if (process.env.NODE_ENV === "production" || !(e === "icon" || k())) return;
      u != null && String(u).trim() !== "" || m != null && String(m).trim() !== "" || console.warn(
        "[@scorp-ds/components] Button: icon-only buttons should include aria-label or aria-labelledby for screen readers."
      );
    }, [e, t, a, s, i, u, m]);
    const N = () => {
      if (k() || e === "icon")
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
    }, _ = {
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
      `
    }, v = {
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
    }, z = (A) => A ? typeof A == "object" && A !== null && "type" in A ? /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center shrink-0 ${v[t]}`, children: A }) : A : null, S = () => {
      if (k() && a) {
        const b = t === "icon" ? "medium" : t;
        return typeof a == "object" && a !== null && "type" in a ? /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center shrink-0 ${v[b]}`, children: a }) : /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center shrink-0 ${v[b]}`, children: a });
      }
      return a;
    }, j = {
      "--btn-ring": e === "primary" || e === "link" ? "var(--focus-ring-primary)" : e === "destructive" ? "var(--focus-ring-destructive)" : e === "icon" ? "var(--focus-ring-icon)" : "var(--focus-ring-secondary)",
      outline: "none"
    };
    return c ? /* @__PURE__ */ y(
      "a",
      {
        ref: g,
        href: r ? void 0 : c,
        target: l,
        rel: d,
        "aria-disabled": r || void 0,
        className: `${w} ${N()} ${_[e]} ${T[t]} no-underline ${r ? "pointer-events-none opacity-50" : ""} ${n}`,
        style: j,
        "aria-label": u,
        "aria-labelledby": m,
        ...h,
        children: [
          s && z(s),
          S(),
          i && z(i)
        ]
      }
    ) : /* @__PURE__ */ y(
      "button",
      {
        ref: g,
        disabled: r,
        className: `${w} ${N()} ${_[e]} ${T[t]} ${n}`,
        style: j,
        "aria-label": u,
        "aria-labelledby": m,
        ...h,
        children: [
          s && z(s),
          S(),
          i && z(i)
        ]
      }
    );
  }
);
Ge.displayName = "Button";
const ft = O(
  ({
    size: e = "medium",
    variant: t = "box",
    error: r = !1,
    disabled: n = !1,
    className: a = "",
    label: s,
    id: i,
    ...c
  }, l) => {
    const d = me(), u = i ?? (s != null && s !== "" ? d : void 0), m = `
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
    }, g = r ? "bg-[var(--field-background-error)] text-[var(--text-primary)]" : "bg-[var(--field-background)] text-[var(--text-primary)]", w = r ? "bg-[var(--field-border-error)]" : "bg-[var(--field-border)] hover:bg-[var(--field-border-hover)] focus-within:!bg-[var(--field-border-focus)]", k = r ? "border-b border-[var(--field-border-error)] focus:border-[var(--field-border-error)]" : "border-b border-[var(--field-border)] hover:border-[var(--field-border-hover)] focus:!border-[var(--field-border-focus)]", N = t === "quiet" ? /* @__PURE__ */ o(
      "input",
      {
        ref: l,
        id: u,
        disabled: n,
        className: `${m} ${h[e].replace("plate-round", "rounded-none")} !px-0 bg-transparent text-[var(--text-primary)] ${k} ${a}`,
        ...c
      }
    ) : /* @__PURE__ */ o(
      "div",
      {
        className: `w-full plate-round p-px transition-colors [transition-duration:var(--duration-fast)] ${w}`,
        children: /* @__PURE__ */ o(
          "input",
          {
            ref: l,
            id: u,
            disabled: n,
            className: `${m} ${h[e]} ${g} ${a}`,
            ...c
          }
        )
      }
    );
    return s == null || s === "" ? N : /* @__PURE__ */ y("div", { className: "w-full space-y-1", children: [
      /* @__PURE__ */ o(
        "label",
        {
          htmlFor: u,
          className: "block font-mono text-sm text-secondary-800 dark:text-secondary-200",
          children: s
        }
      ),
      N
    ] });
  }
);
ft.displayName = "Input";
function Ve(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var a = e.length;
    for (t = 0; t < a; t++) e[t] && (r = Ve(e[t])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function pt() {
  for (var e, t, r = 0, n = "", a = arguments.length; r < a; r++) (e = arguments[r]) && (t = Ve(e)) && (n && (n += " "), n += t);
  return n;
}
const bt = (e, t) => {
  const r = new Array(e.length + t.length);
  for (let n = 0; n < e.length; n++)
    r[n] = e[n];
  for (let n = 0; n < t.length; n++)
    r[e.length + n] = t[n];
  return r;
}, gt = (e, t) => ({
  classGroupId: e,
  validator: t
}), Be = (e = /* @__PURE__ */ new Map(), t = null, r) => ({
  nextPart: e,
  validators: t,
  classGroupId: r
}), ye = "-", Re = [], xt = "arbitrary..", ht = (e) => {
  const t = yt(e), {
    conflictingClassGroups: r,
    conflictingClassGroupModifiers: n
  } = e;
  return {
    getClassGroupId: (i) => {
      if (i.startsWith("[") && i.endsWith("]"))
        return vt(i);
      const c = i.split(ye), l = c[0] === "" && c.length > 1 ? 1 : 0;
      return Ue(c, l, t);
    },
    getConflictingClassGroupIds: (i, c) => {
      if (c) {
        const l = n[i], d = r[i];
        return l ? d ? bt(d, l) : l : d || Re;
      }
      return r[i] || Re;
    }
  };
}, Ue = (e, t, r) => {
  if (e.length - t === 0)
    return r.classGroupId;
  const a = e[t], s = r.nextPart.get(a);
  if (s) {
    const d = Ue(e, t + 1, s);
    if (d) return d;
  }
  const i = r.validators;
  if (i === null)
    return;
  const c = t === 0 ? e.join(ye) : e.slice(t).join(ye), l = i.length;
  for (let d = 0; d < l; d++) {
    const u = i[d];
    if (u.validator(c))
      return u.classGroupId;
  }
}, vt = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const t = e.slice(1, -1), r = t.indexOf(":"), n = t.slice(0, r);
  return n ? xt + n : void 0;
})(), yt = (e) => {
  const {
    theme: t,
    classGroups: r
  } = e;
  return wt(r, t);
}, wt = (e, t) => {
  const r = Be();
  for (const n in e) {
    const a = e[n];
    Ie(a, r, n, t);
  }
  return r;
}, Ie = (e, t, r, n) => {
  const a = e.length;
  for (let s = 0; s < a; s++) {
    const i = e[s];
    kt(i, t, r, n);
  }
}, kt = (e, t, r, n) => {
  if (typeof e == "string") {
    Nt(e, t, r);
    return;
  }
  if (typeof e == "function") {
    $t(e, t, r, n);
    return;
  }
  St(e, t, r, n);
}, Nt = (e, t, r) => {
  const n = e === "" ? t : We(t, e);
  n.classGroupId = r;
}, $t = (e, t, r, n) => {
  if (zt(e)) {
    Ie(e(n), t, r, n);
    return;
  }
  t.validators === null && (t.validators = []), t.validators.push(gt(r, e));
}, St = (e, t, r, n) => {
  const a = Object.entries(e), s = a.length;
  for (let i = 0; i < s; i++) {
    const [c, l] = a[i];
    Ie(l, We(t, c), r, n);
  }
}, We = (e, t) => {
  let r = e;
  const n = t.split(ye), a = n.length;
  for (let s = 0; s < a; s++) {
    const i = n[s];
    let c = r.nextPart.get(i);
    c || (c = Be(), r.nextPart.set(i, c)), r = c;
  }
  return r;
}, zt = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, It = (e) => {
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
}, Se = "!", _e = ":", Tt = [], je = (e, t, r, n, a) => ({
  modifiers: e,
  hasImportantModifier: t,
  baseClassName: r,
  maybePostfixModifierPosition: n,
  isExternal: a
}), Ct = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: r
  } = e;
  let n = (a) => {
    const s = [];
    let i = 0, c = 0, l = 0, d;
    const u = a.length;
    for (let k = 0; k < u; k++) {
      const N = a[k];
      if (i === 0 && c === 0) {
        if (N === _e) {
          s.push(a.slice(l, k)), l = k + 1;
          continue;
        }
        if (N === "/") {
          d = k;
          continue;
        }
      }
      N === "[" ? i++ : N === "]" ? i-- : N === "(" ? c++ : N === ")" && c--;
    }
    const m = s.length === 0 ? a : a.slice(l);
    let h = m, g = !1;
    m.endsWith(Se) ? (h = m.slice(0, -1), g = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      m.startsWith(Se) && (h = m.slice(1), g = !0)
    );
    const w = d && d > l ? d - l : void 0;
    return je(s, g, h, w);
  };
  if (t) {
    const a = t + _e, s = n;
    n = (i) => i.startsWith(a) ? s(i.slice(a.length)) : je(Tt, !1, i, void 0, !0);
  }
  if (r) {
    const a = n;
    n = (s) => r({
      className: s,
      parseClassName: a
    });
  }
  return n;
}, At = (e) => {
  const t = /* @__PURE__ */ new Map();
  return e.orderSensitiveModifiers.forEach((r, n) => {
    t.set(r, 1e6 + n);
  }), (r) => {
    const n = [];
    let a = [];
    for (let s = 0; s < r.length; s++) {
      const i = r[s], c = i[0] === "[", l = t.has(i);
      c || l ? (a.length > 0 && (a.sort(), n.push(...a), a = []), n.push(i)) : a.push(i);
    }
    return a.length > 0 && (a.sort(), n.push(...a)), n;
  };
}, Et = (e) => ({
  cache: It(e.cacheSize),
  parseClassName: Ct(e),
  sortModifiers: At(e),
  ...ht(e)
}), Rt = /\s+/, _t = (e, t) => {
  const {
    parseClassName: r,
    getClassGroupId: n,
    getConflictingClassGroupIds: a,
    sortModifiers: s
  } = t, i = [], c = e.trim().split(Rt);
  let l = "";
  for (let d = c.length - 1; d >= 0; d -= 1) {
    const u = c[d], {
      isExternal: m,
      modifiers: h,
      hasImportantModifier: g,
      baseClassName: w,
      maybePostfixModifierPosition: k
    } = r(u);
    if (m) {
      l = u + (l.length > 0 ? " " + l : l);
      continue;
    }
    let N = !!k, _ = n(N ? w.substring(0, k) : w);
    if (!_) {
      if (!N) {
        l = u + (l.length > 0 ? " " + l : l);
        continue;
      }
      if (_ = n(w), !_) {
        l = u + (l.length > 0 ? " " + l : l);
        continue;
      }
      N = !1;
    }
    const v = h.length === 0 ? "" : h.length === 1 ? h[0] : s(h).join(":"), T = g ? v + Se : v, z = T + _;
    if (i.indexOf(z) > -1)
      continue;
    i.push(z);
    const S = a(_, N);
    for (let j = 0; j < S.length; ++j) {
      const A = S[j];
      i.push(T + A);
    }
    l = u + (l.length > 0 ? " " + l : l);
  }
  return l;
}, jt = (...e) => {
  let t = 0, r, n, a = "";
  for (; t < e.length; )
    (r = e[t++]) && (n = qe(r)) && (a && (a += " "), a += n);
  return a;
}, qe = (e) => {
  if (typeof e == "string")
    return e;
  let t, r = "";
  for (let n = 0; n < e.length; n++)
    e[n] && (t = qe(e[n])) && (r && (r += " "), r += t);
  return r;
}, Dt = (e, ...t) => {
  let r, n, a, s;
  const i = (l) => {
    const d = t.reduce((u, m) => m(u), e());
    return r = Et(d), n = r.cache.get, a = r.cache.set, s = c, c(l);
  }, c = (l) => {
    const d = n(l);
    if (d)
      return d;
    const u = _t(l, r);
    return a(l, u), u;
  };
  return s = i, (...l) => s(jt(...l));
}, Pt = [], M = (e) => {
  const t = (r) => r[e] || Pt;
  return t.isThemeGetter = !0, t;
}, Xe = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, He = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Mt = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, Lt = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Ot = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Ft = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Gt = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Vt = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Q = (e) => Mt.test(e), $ = (e) => !!e && !Number.isNaN(Number(e)), ee = (e) => !!e && Number.isInteger(Number(e)), ke = (e) => e.endsWith("%") && $(e.slice(0, -1)), Y = (e) => Lt.test(e), Ye = () => !0, Bt = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Ot.test(e) && !Ft.test(e)
), Te = () => !1, Ut = (e) => Gt.test(e), Wt = (e) => Vt.test(e), qt = (e) => !f(e) && !p(e), Xt = (e) => te(e, Ze, Te), f = (e) => Xe.test(e), ne = (e) => te(e, Qe, Bt), De = (e) => te(e, tr, $), Ht = (e) => te(e, tt, Ye), Yt = (e) => te(e, et, Te), Pe = (e) => te(e, Ke, Te), Kt = (e) => te(e, Je, Wt), ge = (e) => te(e, rt, Ut), p = (e) => He.test(e), ue = (e) => oe(e, Qe), Jt = (e) => oe(e, et), Me = (e) => oe(e, Ke), Zt = (e) => oe(e, Ze), Qt = (e) => oe(e, Je), xe = (e) => oe(e, rt, !0), er = (e) => oe(e, tt, !0), te = (e, t, r) => {
  const n = Xe.exec(e);
  return n ? n[1] ? t(n[1]) : r(n[2]) : !1;
}, oe = (e, t, r = !1) => {
  const n = He.exec(e);
  return n ? n[1] ? t(n[1]) : r : !1;
}, Ke = (e) => e === "position" || e === "percentage", Je = (e) => e === "image" || e === "url", Ze = (e) => e === "length" || e === "size" || e === "bg-size", Qe = (e) => e === "length", tr = (e) => e === "number", et = (e) => e === "family-name", tt = (e) => e === "number" || e === "weight", rt = (e) => e === "shadow", rr = () => {
  const e = M("color"), t = M("font"), r = M("text"), n = M("font-weight"), a = M("tracking"), s = M("leading"), i = M("breakpoint"), c = M("container"), l = M("spacing"), d = M("radius"), u = M("shadow"), m = M("inset-shadow"), h = M("text-shadow"), g = M("drop-shadow"), w = M("blur"), k = M("perspective"), N = M("aspect"), _ = M("ease"), v = M("animate"), T = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], z = () => [
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
  ], S = () => [...z(), p, f], j = () => ["auto", "hidden", "clip", "visible", "scroll"], A = () => ["auto", "contain", "none"], b = () => [p, f, l], P = () => [Q, "full", "auto", ...b()], ae = () => [ee, "none", "subgrid", p, f], X = () => ["auto", {
    span: ["full", ee, p, f]
  }, ee, p, f], K = () => [ee, "auto", p, f], fe = () => ["auto", "min", "max", "fr", p, f], se = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], q = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], G = () => ["auto", ...b()], J = () => [Q, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...b()], H = () => [Q, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...b()], le = () => [Q, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...b()], x = () => [e, p, f], ce = () => [...z(), Me, Pe, {
    position: [p, f]
  }], de = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], E = () => ["auto", "cover", "contain", Zt, Xt, {
    size: [p, f]
  }], I = () => [ke, ue, ne], C = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    d,
    p,
    f
  ], D = () => ["", $, ue, ne], B = () => ["solid", "dashed", "dotted", "double"], re = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], R = () => [$, ke, Me, Pe], F = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    w,
    p,
    f
  ], Z = () => ["none", $, p, f], pe = () => ["none", $, p, f], we = () => [$, p, f], be = () => [Q, "full", ...b()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Y],
      breakpoint: [Y],
      color: [Ye],
      container: [Y],
      "drop-shadow": [Y],
      ease: ["in", "out", "in-out"],
      font: [qt],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Y],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Y],
      shadow: [Y],
      spacing: ["px", $],
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
        aspect: ["auto", "square", Q, f, p, N]
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
        columns: [$, f, p, c]
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
        object: S()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: j()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": j()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": j()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: A()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": A()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": A()
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
        inset: P()
      }],
      /**
       * Inset Inline
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": P()
      }],
      /**
       * Inset Block
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": P()
      }],
      /**
       * Inset Inline Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-s` in next major release
       */
      start: [{
        "inset-s": P(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        start: P()
      }],
      /**
       * Inset Inline End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-e` in next major release
       */
      end: [{
        "inset-e": P(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        end: P()
      }],
      /**
       * Inset Block Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-bs": [{
        "inset-bs": P()
      }],
      /**
       * Inset Block End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-be": [{
        "inset-be": P()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: P()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: P()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: P()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: P()
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
        z: [ee, "auto", p, f]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [Q, "full", "auto", c, ...b()]
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
        flex: [$, Q, "auto", "initial", "none", f]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", $, p, f]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", $, p, f]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [ee, "first", "last", "none", p, f]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": ae()
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
        "grid-rows": ae()
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
        "auto-cols": fe()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": fe()
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
        justify: [...se(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...q(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...q()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...se()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...q(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...q(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": se()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...q(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...q()]
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
        m: G()
      }],
      /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: G()
      }],
      /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: G()
      }],
      /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: G()
      }],
      /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: G()
      }],
      /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */
      mbs: [{
        mbs: G()
      }],
      /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */
      mbe: [{
        mbe: G()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: G()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: G()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: G()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: G()
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
        inline: ["auto", ...H()]
      }],
      /**
       * Min-Inline Size
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-inline-size": [{
        "min-inline": ["auto", ...H()]
      }],
      /**
       * Max-Inline Size
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-inline-size": [{
        "max-inline": ["none", ...H()]
      }],
      /**
       * Block Size
       * @see https://tailwindcss.com/docs/height
       */
      "block-size": [{
        block: ["auto", ...le()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-block-size": [{
        "min-block": ["auto", ...le()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-block-size": [{
        "max-block": ["none", ...le()]
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
        text: ["base", r, ue, ne]
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
        font: [n, er, Ht]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", ke, f]
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
        "line-clamp": [$, "none", p, De]
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
        decoration: [$, "from-font", "auto", p, ne]
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
        "underline-offset": [$, "auto", p, f]
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
        bg: ce()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: de()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: E()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, ee, p, f],
          radial: ["", p, f],
          conic: [ee, p, f]
        }, Qt, Kt]
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
        from: I()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: I()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: I()
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
        rounded: C()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": C()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": C()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": C()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": C()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": C()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": C()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": C()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": C()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": C()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": C()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": C()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": C()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": C()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": C()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: D()
      }],
      /**
       * Border Width Inline
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": D()
      }],
      /**
       * Border Width Block
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": D()
      }],
      /**
       * Border Width Inline Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": D()
      }],
      /**
       * Border Width Inline End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": D()
      }],
      /**
       * Border Width Block Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-bs": [{
        "border-bs": D()
      }],
      /**
       * Border Width Block End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-be": [{
        "border-be": D()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": D()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": D()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": D()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": D()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": D()
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
        "divide-y": D()
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
        "outline-offset": [$, p, f]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", $, ue, ne]
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
          ge
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
        "inset-shadow": ["none", m, xe, ge]
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
        ring: D()
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
        "ring-offset": [$, ne]
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
        "inset-ring": D()
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
        "text-shadow": ["none", h, xe, ge]
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
        opacity: [$, p, f]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...re(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": re()
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
        "mask-linear": [$]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": R()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": R()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": x()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": x()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": R()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": R()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": x()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": x()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": R()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": R()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": x()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": x()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": R()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": R()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": x()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": x()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": R()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": R()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": x()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": x()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": R()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": R()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": x()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": x()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": R()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": R()
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
        "mask-radial-from": R()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": R()
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
        "mask-radial-at": z()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [$]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": R()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": R()
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
        mask: ce()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: de()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: E()
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
        blur: F()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [$, p, f]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [$, p, f]
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
          g,
          xe,
          ge
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
        grayscale: ["", $, p, f]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [$, p, f]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", $, p, f]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [$, p, f]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", $, p, f]
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
        "backdrop-blur": F()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [$, p, f]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [$, p, f]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", $, p, f]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [$, p, f]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", $, p, f]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [$, p, f]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [$, p, f]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", $, p, f]
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
        duration: [$, "initial", p, f]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", _, p, f]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [$, p, f]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", v, p, f]
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
        perspective: [k, p, f]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": S()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: Z()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": Z()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": Z()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": Z()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: pe()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": pe()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": pe()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": pe()
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
        origin: S()
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
        translate: be()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": be()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": be()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": be()
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
        stroke: [$, ue, ne, De]
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
}, nr = /* @__PURE__ */ Dt(rr);
function V(...e) {
  return nr(pt(e));
}
const Le = {
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
  Copy: "⎘",
  // ⎘ copy
  Download: "⤓",
  // ⤓ downwards arrow to bar
  Edit: "✎",
  // ✎ pencil
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
  Plus: "+",
  // + plus sign
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
  X: "✗"
  // ✗ ballot X
}, Oe = {
  3: "w-3 h-3 text-[14px]",
  4: "w-4 h-4 text-[20px]",
  5: "w-5 h-5 text-[24px]",
  6: "w-6 h-6 text-[28px]",
  8: "w-8 h-8 text-[36px]"
}, or = ({
  name: e,
  size: t = "4",
  className: r
}) => {
  const n = e in Le ? Le[e] : "?", a = Oe[t] ?? Oe[4];
  return /* @__PURE__ */ o(
    "span",
    {
      className: V(
        "inline-flex items-center justify-center font-mono leading-none select-none",
        a,
        r
      ),
      "aria-hidden": "true",
      children: n
    }
  );
};
function Ar({ isOpen: e, onClose: t, title: r, children: n, footerContent: a, width: s = 740, docked: i = !1 }) {
  const c = W(null), l = W(null), [d, u] = U(
    () => typeof window < "u" && window.matchMedia("(min-width: 960px)").matches
  );
  L(() => {
    const g = window.matchMedia("(min-width: 960px)"), w = () => u(g.matches);
    return g.addEventListener("change", w), () => g.removeEventListener("change", w);
  }, []);
  const m = i && d;
  if (L(() => {
    var g;
    if (e)
      return l.current = document.activeElement, (g = c.current) == null || g.focus(), () => {
        var w;
        (w = l.current) == null || w.focus(), l.current = null;
      };
  }, [e]), L(() => {
    const g = (w) => {
      w.key === "Escape" && t();
    };
    return e && document.addEventListener("keydown", g), () => {
      document.removeEventListener("keydown", g);
    };
  }, [e, t]), L(() => (e && !m ? document.body.style.overflow = "hidden" : document.body.style.overflow = "unset", () => {
    document.body.style.overflow = "unset";
  }), [e, m]), !e) return null;
  const h = /* @__PURE__ */ o(
    "div",
    {
      ref: c,
      tabIndex: -1,
      className: "max-w-full max-h-[80vh] plate-round-lg p-px bg-[var(--surface-container-stroke)] flex focus:outline-none",
      style: { width: typeof s == "number" ? `${s}px` : s },
      role: "dialog",
      "aria-modal": m ? void 0 : "true",
      "aria-label": r,
      onClick: (g) => g.stopPropagation(),
      children: /* @__PURE__ */ y("div", { className: "w-full plate-round-lg bg-[var(--surface-card)] flex flex-col overflow-hidden", children: [
        /* @__PURE__ */ y("div", { className: "flex items-center justify-between px-8 py-6 border-b-[0.5px] border-solid border-[var(--surface-container-stroke)]", children: [
          /* @__PURE__ */ o("h2", { className: "text-base font-mono text-[var(--text-primary)] font-medium flex-1 min-w-0 truncate", children: r }),
          /* @__PURE__ */ o(
            Ge,
            {
              variant: "secondary",
              size: "small",
              type: "button",
              onClick: t,
              "aria-label": "Close modal",
              className: "ml-4 shrink-0",
              children: /* @__PURE__ */ o(or, { name: "X" })
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "overflow-y-auto px-8 py-6", tabIndex: 0, children: n }),
        a && /* @__PURE__ */ o("div", { className: "flex items-center justify-end gap-3 px-8 py-5 border-t-[0.5px] border-solid border-[var(--surface-container-stroke)]", children: a })
      ] })
    }
  );
  return m ? /* @__PURE__ */ o(
    "div",
    {
      className: "fixed inset-x-0 flex justify-center pointer-events-none animate-in fade-in",
      style: {
        zIndex: "var(--z-index-modal)",
        bottom: "48px",
        animationDuration: "var(--duration-normal)",
        filter: "drop-shadow(0 10px 40px rgba(0, 0, 0, 0.35))"
      },
      children: /* @__PURE__ */ o("div", { className: "pointer-events-auto flex max-w-full", children: h })
    }
  ) : /* @__PURE__ */ o(ie, { children: /* @__PURE__ */ o(
    "div",
    {
      className: "fixed inset-0 flex items-center justify-center p-5 animate-in fade-in bg-[var(--surface-overlay)]",
      style: { zIndex: "var(--z-index-modal)", animationDuration: "var(--duration-normal)" },
      onClick: t,
      children: h
    }
  ) });
}
function Er({
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
      children: /* @__PURE__ */ y(
        "div",
        {
          className: `
        plate-round-lg bg-[var(--surface-card)] h-full w-full
        ${i ? "flex flex-col flex-1 min-h-0" : ""}
      `,
          children: [
            (e || t || r) && /* @__PURE__ */ o("div", { className: "p-4 lg:p-6 border-b-[0.5px] border-solid border-[var(--surface-container-stroke)] overflow-hidden rounded-none", children: r || /* @__PURE__ */ y("div", { children: [
              e && /* @__PURE__ */ o("h3", { className: "text-base font-mono font-bold text-[var(--text-primary)] mb-1", children: e }),
              t && /* @__PURE__ */ o("p", { className: "font-mono text-sm text-secondary-800 dark:text-secondary-300", children: t })
            ] }) }),
            /* @__PURE__ */ o("div", { className: `p-4 lg:p-6 ${i ? "flex-1 flex flex-col min-h-0" : ""}`, children: n }),
            a && /* @__PURE__ */ o("div", { className: "p-4 lg:p-6 border-t-[0.5px] border-solid border-[var(--surface-container-stroke)] bg-[var(--surface-subtle)] overflow-hidden", children: a })
          ]
        }
      )
    }
  );
}
function Rr({
  variant: e = "default",
  size: t = "medium",
  children: r,
  iconLeft: n,
  onClose: a,
  className: s = ""
}) {
  const i = {
    small: "h-5 px-2 py-1 text-xs",
    // h-5 = 20px, px-2 = 8px, text-xs = 12px
    medium: "h-6 px-2.5 py-1 text-xs",
    // h-6 = 24px, px-2.5 = 10px, text-xs = 12px
    large: "h-7 px-3 py-1.5 text-sm"
    // h-7 = 28px, px-3 = 12px, text-sm = 14px
  }, c = {
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
  }, l = {
    small: "w-3 h-3",
    // 12px
    medium: "w-3.5 h-3.5",
    // 14px
    large: "w-4 h-4"
    // 16px
  };
  return /* @__PURE__ */ y(
    "span",
    {
      className: `
        inline-flex items-center gap-1.5
        font-mono font-medium
        plate-round
        ${i[t]}
        ${c[e]}
        ${s}
      `,
      children: [
        n && /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center ${l[t]} flex-shrink-0`, children: n }),
        /* @__PURE__ */ o("span", { className: "inline-flex items-center", children: r }),
        a && /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            onClick: (d) => {
              d.stopPropagation(), a();
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
function _r({
  variant: e = "default",
  title: t,
  description: r,
  iconLeft: n,
  onClose: a,
  className: s = ""
}) {
  const c = n || /* @__PURE__ */ o("span", { className: "font-mono text-sm font-bold leading-none whitespace-nowrap", children: {
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
        c && /* @__PURE__ */ o("div", { className: `flex h-5 flex-shrink-0 items-center ${d.icon}`, children: c }),
        /* @__PURE__ */ y("div", { className: "flex-1 min-w-0", children: [
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
            children: "[x]"
          }
        )
      ]
    }
  ) });
}
function ar({
  src: e,
  alt: t,
  initials: r,
  icon: n,
  size: a = "medium",
  status: s,
  className: i = "",
  onError: c
}) {
  const [l, d] = U(!1), m = {
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
  }, g = e && !l, w = !g && r, k = !g && !w && n, N = !g && !w && !k, _ = {
    online: "bg-success-600 dark:bg-success-500",
    offline: "bg-secondary-500 dark:bg-secondary-600",
    away: "bg-warning-600 dark:bg-warning-500"
  };
  return /* @__PURE__ */ y("div", { className: `relative inline-block ${m.container} ${i}`, children: [
    /* @__PURE__ */ y(
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
          g && /* @__PURE__ */ o(
            "img",
            {
              src: e,
              alt: t || "Avatar",
              className: "w-full h-full object-cover",
              onError: h
            }
          ),
          w && /* @__PURE__ */ o("span", { className: "select-none", children: r }),
          k && /* @__PURE__ */ o("div", { className: `${m.icon} inline-flex items-center justify-center leading-none text-secondary-700 dark:text-secondary-300`, children: n }),
          N && /* @__PURE__ */ o("span", { className: `${m.icon} inline-flex items-center justify-center font-mono font-bold text-secondary-900 dark:text-secondary-100`, "aria-hidden": "true", children: "@" })
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
            ${_[s]}
            rounded-none
            border-2 border-[var(--field-background)]
          `,
        "aria-label": `Status: ${s}`
      }
    )
  ] });
}
function jr({
  variant: e = "horizontal",
  text: t,
  spacing: r = "medium",
  className: n = ""
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
  return e === "horizontal" ? /* @__PURE__ */ o(
    "div",
    {
      className: `
          w-full
          border-t border-solid
          ${s}
          ${a[r]}
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
          ${s}
          ${a[r]}
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
          ${a[r]}
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
        ${s}
        ${a[r]}
        ${n}
      `,
      role: "separator",
      "aria-orientation": "horizontal"
    }
  );
}
function Dr({
  content: e,
  children: t,
  position: r = "top",
  delay: n = 200,
  maxWidth: a = "200px",
  className: s = ""
}) {
  const [i, c] = U(!1), [l, d] = U(!1), u = W(null), m = W(null), h = W(null), g = () => {
    u.current && clearTimeout(u.current), u.current = setTimeout(() => {
      c(!0), setTimeout(() => d(!0), 50);
    }, n);
  }, w = () => {
    u.current && clearTimeout(u.current), c(!1), d(!1);
  };
  L(() => () => {
    u.current && clearTimeout(u.current);
  }, []);
  const k = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2"
  }, N = "polygon(0 0, 16px 0, 16px 2px, 14px 2px, 14px 4px, 12px 4px, 12px 6px, 10px 6px, 10px 8px, 6px 8px, 6px 6px, 4px 6px, 4px 4px, 2px 4px, 2px 2px, 0 2px)", _ = "polygon(0 0, 12px 0, 12px 2px, 10px 2px, 10px 4px, 8px 4px, 8px 6px, 4px 6px, 4px 4px, 2px 4px, 2px 2px, 0 2px)", v = {
    top: "top-full left-1/2 -translate-x-1/2 -translate-y-px",
    bottom: "bottom-full left-1/2 -translate-x-1/2 translate-y-px rotate-180",
    left: "left-full top-1/2 -translate-y-1/2 -translate-x-[5px] -rotate-90",
    right: "right-full top-1/2 -translate-y-1/2 translate-x-[5px] rotate-90"
  };
  return /* @__PURE__ */ y(
    "div",
    {
      ref: h,
      className: `relative inline-block w-fit ${s}`,
      onMouseEnter: g,
      onMouseLeave: w,
      children: [
        t,
        i && /* @__PURE__ */ y(
          "div",
          {
            ref: m,
            role: "tooltip",
            className: `
            absolute
            ${k[r]}
            w-max
            z-[var(--z-index-tooltip)]
            ${l ? "opacity-100" : "opacity-0"}
            transition-opacity [transition-duration:var(--duration-fast)]
            pointer-events-none
          `,
            style: { maxWidth: a },
            children: [
              /* @__PURE__ */ o("div", { className: "plate-round p-px bg-[var(--surface-container-stroke)]", children: /* @__PURE__ */ o("div", { className: "plate-round bg-[var(--surface-card)] min-w-16 px-3 py-2 text-center font-mono text-xs text-[var(--text-primary)] whitespace-normal", children: e }) }),
              /* @__PURE__ */ o("div", { className: `absolute ${v[r]}`, "aria-hidden": "true", children: /* @__PURE__ */ y("div", { className: "relative h-[8px] w-[16px]", children: [
                /* @__PURE__ */ o(
                  "div",
                  {
                    className: "absolute inset-0 bg-[var(--surface-container-stroke)]",
                    style: { clipPath: N }
                  }
                ),
                /* @__PURE__ */ o(
                  "div",
                  {
                    className: "absolute left-[2px] top-[-1px] h-[6px] w-[12px] bg-[var(--surface-card)]",
                    style: { clipPath: _ }
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
const sr = O(function({
  size: t = "medium",
  error: r = !1,
  disabled: n = !1,
  className: a = "",
  children: s,
  value: i,
  defaultValue: c,
  onChange: l,
  name: d,
  label: u,
  "aria-label": m,
  id: h,
  ...g
}, w) {
  var de;
  const k = me(), N = h ?? `${k}-trigger`, v = (() => {
    const E = [];
    if (Array.isArray(s))
      s.forEach((I) => {
        if (typeof I == "object" && I !== null && "props" in I) {
          const C = I.props;
          E.push({
            value: C.value || "",
            label: typeof C.children == "string" ? C.children : String(C.children || ""),
            disabled: C.disabled
          });
        }
      });
    else if (typeof s == "object" && s !== null && "props" in s) {
      const I = s.props;
      E.push({
        value: I.value || "",
        label: typeof I.children == "string" ? I.children : String(I.children || ""),
        disabled: I.disabled
      });
    }
    return E;
  })(), [T, z] = U(!1), [S, j] = U(-1), [A, b] = U(
    i !== void 0 ? String(i) : c !== void 0 ? String(c) : ((de = v[0]) == null ? void 0 : de.value) || ""
  ), P = W(null), ae = W(null), X = W(null);
  L(() => {
    i !== void 0 && (b(String(i)), X.current && (X.current.value = String(i)));
  }, [i]), it(w, () => X.current);
  const K = v.find((E) => E.value === A), fe = (K == null ? void 0 : K.label) || "", se = () => {
    n || (z(!T), T || j(-1));
  }, q = () => {
    z(!1), j(-1);
  }, G = (E) => {
    i === void 0 && b(E), X.current && (X.current.value = E), l && l({
      target: { value: E, name: d },
      currentTarget: { value: E, name: d }
    }), q();
  };
  L(() => {
    function E(I) {
      P.current && !P.current.contains(I.target) && q();
    }
    if (T)
      return document.addEventListener("mousedown", E), () => {
        document.removeEventListener("mousedown", E);
      };
  }, [T]), L(() => {
    function E(I) {
      var B, re;
      if (!((B = P.current) != null && B.contains(I.target)) && !T)
        return;
      if (!T) {
        if ((I.key === "Enter" || I.key === " " || I.key === "ArrowDown" || I.key === "ArrowUp") && (re = P.current) != null && re.contains(I.target)) {
          I.preventDefault(), se();
          const F = v.filter((Z) => !Z.disabled).findIndex((Z) => Z.value === A);
          j(F >= 0 ? F : 0);
        }
        return;
      }
      const C = v.filter((R) => !R.disabled), D = S;
      switch (I.key) {
        case "Escape":
          I.preventDefault(), q();
          break;
        case "ArrowDown":
          I.preventDefault(), j((R) => {
            const F = R + 1;
            return F >= C.length ? 0 : F;
          });
          break;
        case "ArrowUp":
          I.preventDefault(), j((R) => {
            const F = R - 1;
            return F < 0 ? C.length - 1 : F;
          });
          break;
        case "Enter":
        case " ":
          I.preventDefault(), D >= 0 && D < C.length && G(C[D].value);
          break;
      }
    }
    return document.addEventListener("keydown", E), () => {
      document.removeEventListener("keydown", E);
    };
  }, [T, S, v, A]), L(() => {
    if (S >= 0 && ae.current) {
      const E = ae.current.querySelectorAll('[role="option"]');
      let I = 0, C = 0;
      for (let B = 0; B < E.length; B++)
        if (!v[B].disabled) {
          if (C === S) {
            I = B;
            break;
          }
          C++;
        }
      const D = E[I];
      D && D.scrollIntoView({ block: "nearest" });
    }
  }, [S, v]);
  const H = {
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
  }[t], le = r ? "bg-[var(--field-background-error)] text-[var(--text-primary)]" : "bg-[var(--field-background)] text-[var(--text-primary)]", x = r ? "bg-[var(--field-border-error)]" : "bg-[var(--field-border)] hover:bg-[var(--field-border-hover)] focus-within:!bg-[var(--field-border-focus)]", ce = /* @__PURE__ */ y("div", { ref: P, className: "relative inline-block w-full", children: [
    /* @__PURE__ */ o(
      "select",
      {
        ref: X,
        name: d,
        value: A,
        onChange: l,
        className: "sr-only",
        "aria-hidden": "true",
        tabIndex: -1,
        ...g,
        children: v.map((E, I) => /* @__PURE__ */ o("option", { value: E.value, disabled: E.disabled, children: E.label }, I))
      }
    ),
    /* @__PURE__ */ o("div", { className: `plate-round p-px transition-colors [transition-duration:var(--duration-fast)] ${x} ${n ? "opacity-50" : ""}`, children: /* @__PURE__ */ y(
      "button",
      {
        type: "button",
        id: N,
        onClick: se,
        disabled: n,
        className: `
          w-full
          flex items-center justify-between
          font-mono text-sm
          transition-colors [transition-duration:var(--duration-fast)]
          ${H.trigger}
          ${le}
          ${n ? "cursor-not-allowed" : "cursor-pointer"}
          focus:outline-none
        `,
        "aria-haspopup": "listbox",
        "aria-expanded": T,
        "aria-label": u != null && u !== "" ? void 0 : m ?? "Select an option",
        children: [
          /* @__PURE__ */ o("span", { className: "truncate text-left flex-1", children: fe || "Select..." }),
          /* @__PURE__ */ o(
            "span",
            {
              className: `
            ${H.icon}
            inline-flex items-center justify-center font-mono leading-none
            text-[var(--text-secondary)]
            transition-transform [transition-duration:var(--duration-normal)]
            flex-shrink-0 ml-2
            ${T ? "rotate-180" : ""}
            ${n ? "opacity-50" : ""}
          `,
              "aria-hidden": "true",
              children: "▼"
            }
          )
        ]
      }
    ) }),
    T && /* @__PURE__ */ o(
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
            ref: ae,
            role: "listbox",
            className: `plate-round bg-[var(--surface-card)] ${H.menu} max-h-[300px] overflow-y-auto`,
            children: v.map((E, I) => {
              const C = E.disabled, D = E.value === A, R = v.filter((F) => !F.disabled).findIndex((F) => F.value === E.value) === S && !C;
              return /* @__PURE__ */ y(
                "button",
                {
                  type: "button",
                  role: "option",
                  "aria-selected": D,
                  disabled: C,
                  onClick: () => !C && G(E.value),
                  className: `
                  w-full flex items-center gap-2
                  px-4 py-3
                  font-mono text-sm text-left
                  transition-colors [transition-duration:var(--duration-fast)]
                  ${C ? "opacity-50 cursor-not-allowed" : "text-[var(--text-primary)] hover:bg-[var(--surface-subtle)] cursor-pointer"}
                  ${R && !C ? "bg-[var(--surface-subtle)]" : ""}
                  ${H.menuItem}
                `,
                  children: [
                    /* @__PURE__ */ o("span", { className: "truncate flex-1 min-w-0", children: E.label }),
                    D && /* @__PURE__ */ o("span", { className: `${H.icon} inline-flex items-center justify-center font-mono font-bold text-[var(--border-focus)] flex-shrink-0`, "aria-hidden": "true", children: "✓" })
                  ]
                },
                I
              );
            })
          }
        )
      }
    )
  ] });
  return u == null || u === "" ? /* @__PURE__ */ o("div", { className: `w-full ${a}`.trim(), children: ce }) : /* @__PURE__ */ y("div", { className: `w-full space-y-1 ${a}`.trim(), children: [
    /* @__PURE__ */ o(
      "label",
      {
        htmlFor: N,
        className: "block font-mono text-sm text-secondary-800 dark:text-secondary-200",
        children: u
      }
    ),
    ce
  ] });
});
sr.displayName = "Select";
const ir = O(
  ({
    size: e = "medium",
    label: t,
    error: r = !1,
    disabled: n = !1,
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
         peer-checked:hover:bg-[var(--button-primary-background-hover)]`, g = r ? "peer-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-error)]" : "peer-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]", w = (_) => {
      s && s(_), i && i(_.target.checked);
    }, k = t != null && t !== !1 && t !== "", N = /* @__PURE__ */ y(ie, { children: [
      /* @__PURE__ */ o(
        "input",
        {
          ref: d,
          type: "checkbox",
          ...a !== void 0 ? { checked: a } : {},
          disabled: n,
          onChange: w,
          className: "peer sr-only",
          "aria-invalid": r || void 0,
          ...l
        }
      ),
      /* @__PURE__ */ o(
        "span",
        {
          "aria-hidden": "true",
          className: `
            plate-round p-px inline-flex shrink-0
            ${m.checkbox}
            transition-colors [transition-duration:var(--duration-fast)]
            ${n ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
            ${h}
            ${r ? "peer-checked:[&>span]:bg-[var(--field-border-error)]" : "peer-checked:[&>span]:bg-[var(--button-primary-background)]"}
            peer-checked:[&>span>span]:opacity-100
            ${g}
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
    return /* @__PURE__ */ o("div", { className: `flex items-center gap-2 ${c}`, children: k ? /* @__PURE__ */ y(
      "label",
      {
        className: `inline-flex items-center gap-2 font-mono ${n ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`,
        children: [
          N,
          /* @__PURE__ */ o("span", { className: `${m.label} text-[var(--text-primary)]`, children: t })
        ]
      }
    ) : /* @__PURE__ */ o("span", { className: "inline-flex items-center gap-2", children: N }) });
  }
);
ir.displayName = "Checkbox";
const lr = O(function({ label: t, id: r, className: n = "", disabled: a, ...s }, i) {
  const c = me(), l = r ?? c;
  return /* @__PURE__ */ y("span", { className: `inline-flex flex-col gap-1.5 font-mono ${n}`, children: [
    t && /* @__PURE__ */ o("label", { htmlFor: l, className: "text-sm text-secondary-800 dark:text-secondary-300", children: t }),
    /* @__PURE__ */ o(
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
lr.displayName = "Slider";
const cr = O(
  ({
    size: e = "medium",
    label: t,
    error: r = !1,
    disabled: n = !1,
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
      `, g = r ? "peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--focus-ring-error)] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[var(--focus-offset-color)]" : "peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--focus-ring-primary)] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[var(--focus-offset-color)]", w = (_) => {
      s && s(_), i && i(_.target.checked);
    }, k = t != null && t !== !1 && t !== "", N = /* @__PURE__ */ y(ie, { children: [
      /* @__PURE__ */ o(
        "input",
        {
          ref: d,
          type: "radio",
          ...a !== void 0 ? { checked: a } : {},
          disabled: n,
          onChange: w,
          className: "peer sr-only",
          "aria-invalid": r || void 0,
          ...l
        }
      ),
      /* @__PURE__ */ o(
        "span",
        {
          "aria-hidden": "true",
          className: `
            relative inline-flex shrink-0 items-center justify-center
            ${m.radio}
            rounded-full
            border-2
            ${n ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
            ${h}
            ${g}
            peer-checked:[&>span]:opacity-100
          `,
          children: /* @__PURE__ */ o(
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
    return /* @__PURE__ */ o("div", { className: `flex items-center gap-2 ${c}`, children: k ? /* @__PURE__ */ y(
      "label",
      {
        className: `inline-flex items-center gap-2 font-mono ${n ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`,
        children: [
          N,
          /* @__PURE__ */ o("span", { className: `${m.label} text-[var(--text-primary)]`, children: t })
        ]
      }
    ) : /* @__PURE__ */ o("span", { className: "inline-flex items-center gap-2", children: N }) });
  }
);
cr.displayName = "Radio";
const dr = O(
  ({
    size: e = "medium",
    error: t = !1,
    disabled: r = !1,
    className: n = "",
    label: a,
    id: s,
    ...i
  }, c) => {
    const l = me(), d = s ?? (a != null && a !== "" ? l : void 0), u = `
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
    }, h = t ? "bg-[var(--field-background-error)] text-[var(--text-primary)]" : "bg-[var(--field-background)] text-[var(--text-primary)]", w = /* @__PURE__ */ o(
      "div",
      {
        className: `w-full plate-round p-px transition-colors [transition-duration:var(--duration-fast)] ${t ? "bg-[var(--field-border-error)]" : "bg-[var(--field-border)] hover:bg-[var(--field-border-hover)] focus-within:!bg-[var(--field-border-focus)]"}`,
        children: /* @__PURE__ */ o(
          "textarea",
          {
            ref: c,
            id: d,
            disabled: r,
            className: `${u} ${m[e]} ${h} ${n}`,
            ...i
          }
        )
      }
    );
    return a == null || a === "" ? w : /* @__PURE__ */ y("div", { className: "w-full space-y-1", children: [
      /* @__PURE__ */ o(
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
dr.displayName = "Textarea";
const nt = O(
  ({
    checked: e = !1,
    onCheckedChange: t,
    size: r = "medium",
    label: n,
    disabled: a = !1,
    icon: s,
    className: i = "",
    ...c
  }, l) => {
    const u = {
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
    }[r], m = () => {
      !a && t && t(!e);
    }, h = (g) => {
      (g.key === " " || g.key === "Enter") && (g.preventDefault(), !a && t && t(!e));
    };
    return /* @__PURE__ */ y("div", { className: `flex items-center gap-3 ${i}`, children: [
      /* @__PURE__ */ o(
        "button",
        {
          ref: l,
          type: "button",
          role: "switch",
          "aria-checked": e,
          "aria-label": n || (e ? "On" : "Off"),
          disabled: a,
          onClick: m,
          onKeyDown: h,
          className: `
            relative inline-flex items-center
            ${u.track}
            plate-round
            transition-colors [transition-duration:var(--duration-slow)]
            focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]
            ${a ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            ${e ? "bg-[var(--button-primary-background)]" : "bg-secondary-300 dark:bg-secondary-700"}
          `,
          ...c,
          children: /* @__PURE__ */ o(
            "span",
            {
              className: `
              inline-flex items-center justify-center
              ${u.knob}
              plate-round
              bg-[var(--field-background)]
              shadow-none
              transform transition-transform [transition-duration:var(--duration-slow)] [transition-timing-function:steps(3)]
            `,
              style: {
                transform: u.knobTranslate
              },
              children: s && /* @__PURE__ */ o("span", { className: u.iconSize, children: s })
            }
          )
        }
      ),
      n && /* @__PURE__ */ o(
        "span",
        {
          className: `text-sm font-mono ${a ? "text-secondary-700 dark:text-secondary-400" : "text-[var(--text-primary)]"}`,
          children: n
        }
      )
    ] });
  }
);
nt.displayName = "Switch";
function Pr({
  trigger: e,
  items: t,
  align: r = "left",
  label: n = "Actions",
  size: a = "medium"
}) {
  const [s, i] = U(!1), [c, l] = U(-1), d = W(null), u = W(null), m = () => {
    i(!s), s || l(-1);
  }, h = () => {
    i(!1), l(-1);
  }, g = (v) => {
    v.disabled || (v.onClick(), h());
  };
  L(() => {
    function v(T) {
      d.current && !d.current.contains(T.target) && h();
    }
    if (s)
      return document.addEventListener("mousedown", v), () => {
        document.removeEventListener("mousedown", v);
      };
  }, [s]), L(() => {
    function v(T) {
      if (!s) return;
      const z = t.filter((j) => !j.disabled), S = c;
      switch (T.key) {
        case "Escape":
          T.preventDefault(), h();
          break;
        case "ArrowDown":
          T.preventDefault(), l((j) => {
            const A = j + 1;
            return A >= z.length ? 0 : A;
          });
          break;
        case "ArrowUp":
          T.preventDefault(), l((j) => {
            const A = j - 1;
            return A < 0 ? z.length - 1 : A;
          });
          break;
        case "Enter":
        case " ":
          T.preventDefault(), S >= 0 && S < z.length && g(z[S]);
          break;
      }
    }
    if (s)
      return document.addEventListener("keydown", v), () => {
        document.removeEventListener("keydown", v);
      };
  }, [s, c, t]), L(() => {
    if (c >= 0 && u.current) {
      const T = u.current.querySelectorAll('[role="menuitem"]')[c];
      T && T.scrollIntoView({ block: "nearest" });
    }
  }, [c]);
  const k = {
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
  }[a], N = /* @__PURE__ */ y(
    "button",
    {
      onClick: m,
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
      "aria-expanded": s,
      children: [
        n,
        /* @__PURE__ */ o("span", { className: `${k.icon} inline-flex items-center justify-center font-mono leading-none transition-transform [transition-duration:var(--duration-normal)] ${s ? "rotate-180" : ""}`, "aria-hidden": "true", children: "▼" })
      ]
    }
  );
  return /* @__PURE__ */ y("div", { ref: d, className: "relative inline-block", children: [
    e ? /* @__PURE__ */ o("div", { onClick: m, role: "button", tabIndex: 0, onKeyDown: (v) => {
      (v.key === "Enter" || v.key === " ") && (v.preventDefault(), m());
    }, children: e }) : N,
    s && /* @__PURE__ */ o(
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
            ref: u,
            role: "menu",
            "aria-orientation": "vertical",
            className: `plate-round bg-[var(--surface-card)] ${k.menu}`,
            children: t.map((v, T) => {
              const z = v.variant === "destructive", S = v.disabled;
              return /* @__PURE__ */ y(
                "button",
                {
                  role: "menuitem",
                  disabled: S,
                  onClick: () => g(v),
                  className: `
                  w-full flex items-center gap-2
                  px-4 py-3
                  font-mono text-sm text-left
                  transition-colors [transition-duration:var(--duration-fast)]
                  ${S ? "opacity-50 cursor-not-allowed" : z ? "text-error-600 hover:bg-[var(--field-background-error)]" : "text-[var(--text-primary)] hover:bg-[var(--surface-subtle)]"}
                  ${c === T && !S ? "bg-[var(--surface-subtle)]" : ""}
                  ${k.menuItem}
                `,
                  children: [
                    /* @__PURE__ */ y("div", { className: "flex items-center gap-2 flex-1 min-w-0", children: [
                      v.icon && /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center ${k.icon} flex-shrink-0`, children: v.icon }),
                      /* @__PURE__ */ o("span", { className: "truncate", children: v.label })
                    ] }),
                    v.iconRight && /* @__PURE__ */ o("span", { className: `inline-flex items-center justify-center ${k.icon} flex-shrink-0 ml-auto`, children: v.iconRight })
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
const he = "text-secondary-700 dark:text-secondary-600", ve = "text-secondary-800 dark:text-secondary-500", ur = {
  background: "repeating-linear-gradient(45deg, var(--surface-subtle), var(--surface-subtle) 8px, var(--surface-muted) 8px, var(--surface-muted) 16px)"
}, ot = (e) => e === "wide" ? " [--csb-bw:min(calc(100%+240px),calc(100cqw-48px))] w-[var(--csb-bw)] ml-[calc((100%-var(--csb-bw))/2)]" : e === "full" ? " [--csb-bw:calc(100cqw-48px)] w-[var(--csb-bw)] ml-[calc((100%-var(--csb-bw))/2)]" : "";
function Ne({
  aspect: e,
  caption: t,
  width: r
}) {
  return /* @__PURE__ */ y("figure", { className: `my-11${ot(r)}`, children: [
    /* @__PURE__ */ o("div", { className: "plate-round p-px bg-[var(--border-hairline)]", children: /* @__PURE__ */ o(
      "div",
      {
        className: "plate-round w-full",
        style: { aspectRatio: e ?? "16 / 9", ...ur }
      }
    ) }),
    t && /* @__PURE__ */ o("figcaption", { className: `mt-2 text-xs ${he}`, children: t })
  ] });
}
function $e({ title: e, text: t }) {
  return /* @__PURE__ */ y(ie, { children: [
    /* @__PURE__ */ o("div", { className: "text-[var(--text-primary)]", children: e }),
    /* @__PURE__ */ o("p", { className: `m-0 text-sm leading-relaxed ${ve}`, children: t })
  ] });
}
function mr({ b: e }) {
  var t, r;
  switch (e.type) {
    case "meta":
      return /* @__PURE__ */ o("dl", { className: "mb-11 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(130px,1fr))]", children: e.items.map((n) => /* @__PURE__ */ y("div", { children: [
        /* @__PURE__ */ o("dt", { className: `text-xs uppercase tracking-[0.08em] ${he}`, children: n.label }),
        /* @__PURE__ */ o("dd", { className: `m-0 mt-1 text-sm leading-normal ${ve}`, children: n.value })
      ] }, n.label)) });
    case "headline":
      return /* @__PURE__ */ y("header", { className: "mb-7 mt-16 first:mt-0 sm:mt-24 sm:first:mt-0", children: [
        e.kicker && /* @__PURE__ */ o("div", { className: `text-xs first-letter:uppercase ${he}`, children: e.kicker }),
        /* @__PURE__ */ o("h2", { className: "mt-2 text-xl text-[var(--text-primary)]", children: e.title }),
        e.text && /* @__PURE__ */ o("p", { className: `mt-3 text-base leading-relaxed ${ve}`, children: e.text })
      ] });
    case "prose":
      return /* @__PURE__ */ o("p", { className: `my-7 text-base leading-relaxed ${ve}`, children: e.text });
    case "image":
      return /* @__PURE__ */ o(Ne, { aspect: e.aspect, caption: e.caption, width: e.width });
    case "imagePair":
      return /* @__PURE__ */ y("div", { className: `my-11 grid grid-cols-1 gap-3.5 sm:grid-cols-2${ot(e.width)}`, children: [
        /* @__PURE__ */ o(Ne, { aspect: "4 / 3", caption: (t = e.captions) == null ? void 0 : t[0] }),
        /* @__PURE__ */ o(Ne, { aspect: "4 / 3", caption: (r = e.captions) == null ? void 0 : r[1] })
      ] });
    case "callouts":
      return /* @__PURE__ */ o("div", { className: "my-11 grid gap-x-8 gap-y-7 [grid-template-columns:repeat(auto-fit,minmax(160px,1fr))]", children: e.items.map((n) => /* @__PURE__ */ o("div", { className: "grid row-span-2 gap-y-1.5 [grid-template-rows:subgrid]", children: /* @__PURE__ */ o($e, { title: n.title, text: n.text }) }, n.title)) });
    case "insights":
      return /* @__PURE__ */ o("ol", { className: "my-11 flex list-none flex-col gap-7 p-0", children: e.items.map((n, a) => /* @__PURE__ */ y("li", { className: "flex gap-3.5", children: [
        /* @__PURE__ */ o("span", { className: "flex-none text-sm leading-6 text-[var(--accent)]", children: String(a + 1).padStart(2, "0") }),
        /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o($e, { title: n.title, text: n.text }) })
      ] }, n.title)) });
    case "quote":
      return /* @__PURE__ */ y("figure", { className: "my-11 m-0 text-lg leading-relaxed text-[var(--text-primary)]", children: [
        /* @__PURE__ */ o("span", { "aria-hidden": "true", className: "mb-2 block text-3xl leading-none text-[var(--accent)]", children: "“" }),
        /* @__PURE__ */ o("blockquote", { className: "m-0 p-0", children: e.text }),
        e.name && /* @__PURE__ */ y("figcaption", { className: "mt-4 flex items-center gap-3 text-sm", children: [
          /* @__PURE__ */ o(ar, { size: "medium", src: e.image, alt: "" }),
          /* @__PURE__ */ y("span", { children: [
            /* @__PURE__ */ o("span", { className: "block text-[var(--text-primary)]", children: e.name }),
            e.role && /* @__PURE__ */ o("span", { className: `block text-xs ${he}`, children: e.role })
          ] })
        ] })
      ] });
    case "list":
      return /* @__PURE__ */ o("ul", { className: "my-11 flex list-none flex-col gap-7 p-0", children: e.items.map((n) => /* @__PURE__ */ o("li", { children: /* @__PURE__ */ o($e, { title: n.title, text: n.text }) }, n.title)) });
  }
}
function Mr({
  blocks: e,
  className: t = ""
}) {
  return /* @__PURE__ */ o("div", { className: `font-mono ${t}`, children: e.map((r, n) => /* @__PURE__ */ o(mr, { b: r }, n)) });
}
const fr = O(function({ meta: t, title: r, description: n, titleSuffix: a, thumb: s, thumbPosition: i = "start", className: c = "", ...l }, d) {
  const u = "as" in l && l.as ? l.as : null, m = u ? "as" : "href" in l && l.href != null ? "a" : "onClick" in l && l.onClick != null ? "button" : "div", h = `
    block w-full text-left p-3 plate-round
    transition-colors [transition-duration:var(--duration-fast)]
    font-mono
    ${m !== "div" ? "cursor-pointer hover:bg-[var(--surface-muted)] focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]" : ""}
    ${c}
  `, g = /* @__PURE__ */ y(ie, { children: [
    t && /* @__PURE__ */ o("span", { className: "block text-sm text-secondary-700 dark:text-secondary-600", children: t }),
    /* @__PURE__ */ y(
      "span",
      {
        className: `block text-base leading-6 ${m !== "div" ? "text-[var(--accent)]" : "text-[var(--text-primary)]"}`,
        children: [
          r,
          a && /* @__PURE__ */ o("span", { className: "ml-2 leading-none", children: a })
        ]
      }
    ),
    n && /* @__PURE__ */ o("span", { className: "mt-1 block text-sm leading-6 text-secondary-800 dark:text-secondary-500", children: n })
  ] }), w = s ? /* @__PURE__ */ y("span", { className: `flex items-start gap-4 ${i === "end" ? "flex-row-reverse" : ""}`, children: [
    /* @__PURE__ */ o("span", { className: "flex-shrink-0", children: s }),
    /* @__PURE__ */ o("span", { className: "block min-w-0 flex-1", children: g })
  ] }) : g;
  if (u) {
    const { asProps: k } = l;
    return /* @__PURE__ */ o(u, { ref: d, className: h, ...k, children: w });
  }
  if (m === "a") {
    const { href: k, ...N } = l;
    return /* @__PURE__ */ o("a", { ref: d, href: k, className: h, ...N, children: w });
  }
  if (m === "button") {
    const { onClick: k, ...N } = l;
    return /* @__PURE__ */ o("button", { ref: d, type: "button", onClick: k, className: h, ...N, children: w });
  }
  return /* @__PURE__ */ o("div", { ref: d, className: h, children: w });
});
fr.displayName = "ListRow";
function pr({ children: e, onClick: t }) {
  const [r, n] = U(!1);
  return L(() => {
    const a = requestAnimationFrame(() => n(!0));
    return () => cancelAnimationFrame(a);
  }, []), /* @__PURE__ */ o(
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
      children: /* @__PURE__ */ o("div", { className: "plate-round bg-[var(--surface-muted)] px-3 py-2.5 font-mono text-sm text-[var(--text-primary)] whitespace-nowrap overflow-hidden text-ellipsis", children: e })
    }
  );
}
function Lr({ toasts: e, onDismiss: t }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "aria-live": "polite",
      className: "fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2",
      style: { zIndex: "var(--z-index-popover)" },
      children: e.map((r) => /* @__PURE__ */ o(pr, { onClick: t ? () => t(r.id) : void 0, children: r.message }, r.id))
    }
  );
}
function Or({ isOpen: e, onClose: t, ariaLabel: r, children: n }) {
  const [a, s] = U(e);
  L(() => {
    e && s(!0);
  }, [e]);
  const i = a && !e;
  return L(() => {
    if (!e) return;
    const c = (l) => {
      l.key === "Escape" && t();
    };
    return document.addEventListener("keydown", c), () => document.removeEventListener("keydown", c);
  }, [e, t]), L(() => (e ? document.body.style.overflow = "hidden" : document.body.style.overflow = "unset", () => {
    document.body.style.overflow = "unset";
  }), [e]), a ? /* @__PURE__ */ y(ie, { children: [
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
        role: "dialog",
        "aria-modal": "true",
        "aria-label": r,
        className: `fixed bottom-0 inset-x-0 mx-auto w-[min(540px,100%)] plate-round-lg-top bg-[var(--surface-container-stroke)] pt-px px-px ${i ? "animate-out slide-out-to-bottom fill-mode-forwards" : "animate-in slide-in-from-bottom"}`,
        style: { zIndex: "var(--z-index-modal)", animationDuration: "var(--duration-slow)" },
        onAnimationEnd: () => {
          i && s(!1);
        },
        children: /* @__PURE__ */ y("div", { className: "plate-round-lg-top bg-[var(--surface-card)] px-5 pb-6 pt-2.5 flex flex-col items-center gap-3 max-h-[70vh]", children: [
          /* @__PURE__ */ o("div", { className: "w-9 h-1 bg-[var(--surface-container-stroke)]", "aria-hidden": "true" }),
          /* @__PURE__ */ o("div", { className: "w-full overflow-y-auto", tabIndex: 0, children: n })
        ] })
      }
    )
  ] }) : null;
}
function Fr() {
  const { theme: e, setTheme: t } = ut(), [r, n] = U(!1);
  if (L(() => {
    n(!0);
  }, []), !r)
    return /* @__PURE__ */ y("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ o("div", { className: "w-11 h-6 rounded-none bg-[var(--field-border)]" }),
      /* @__PURE__ */ o("span", { className: "text-sm font-mono text-[var(--text-secondary)]", children: "Theme" })
    ] });
  const a = e === "dark";
  return /* @__PURE__ */ y("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ o(
      nt,
      {
        checked: a,
        onCheckedChange: () => {
          t(a ? "light" : "dark");
        },
        size: "small",
        icon: a ? /* @__PURE__ */ o("span", { className: "w-3 h-3 inline-flex items-center justify-center font-mono text-[10px] text-[var(--border-focus)]", "aria-hidden": "true", children: "☾" }) : /* @__PURE__ */ o("span", { className: "w-3 h-3 inline-flex items-center justify-center font-mono text-[10px] text-[var(--text-secondary)]", "aria-hidden": "true", children: "☀" }),
        "aria-label": `Switch to ${a ? "light" : "dark"} theme`
      }
    ),
    /* @__PURE__ */ o("span", { className: "text-sm font-mono text-[var(--text-primary)]", children: a ? "Dark" : "Light" })
  ] });
}
const at = Fe(null);
function Ce(e) {
  const t = ze(at);
  if (!t)
    throw new Error(`[@scorp-ds/components] ${e} must be used inside <Tabs>.`);
  return t;
}
function Gr({
  value: e,
  defaultValue: t,
  onValueChange: r,
  children: n,
  className: a
}) {
  const s = e !== void 0, [i, c] = U(() => t ?? ""), l = s ? e : i, d = me().replace(/:/g, ""), u = W([]), m = lt(
    (g) => {
      s || c(g), r == null || r(g);
    },
    [s, r]
  ), h = ct(
    () => ({
      value: l,
      onValueChange: m,
      baseId: d,
      listValuesRef: u,
      isControlled: s
    }),
    [l, m, d, s]
  );
  return /* @__PURE__ */ o(at.Provider, { value: h, children: /* @__PURE__ */ o("div", { className: V("w-full", a), children: n }) });
}
function br(e) {
  const t = [];
  return Ee.Children.forEach(e, (r) => {
    if (!Ee.isValidElement(r)) return;
    if (r.type.displayName === "TabsTrigger") {
      const a = r.props.value;
      typeof a == "string" && t.push(a);
    }
  }), t;
}
function gr({
  children: e,
  className: t,
  "aria-label": r,
  "aria-labelledby": n
}) {
  const { value: a, isControlled: s, onValueChange: i, listValuesRef: c } = Ce("TabsList"), l = br(e);
  c.current = l;
  const d = l.join("\0");
  return dt(() => {
    const u = c.current;
    s || u.length === 0 || u.includes(a) || i(u[0]);
  }, [s, c, i, a, d]), /* @__PURE__ */ o(
    "div",
    {
      role: "tablist",
      "aria-label": r,
      "aria-labelledby": n,
      className: V(
        "flex flex-wrap gap-0 border-b-[0.5px] border-solid border-[var(--surface-container-stroke)]",
        t
      ),
      children: e
    }
  );
}
gr.displayName = "TabsList";
const xr = O(function({ value: t, children: r, className: n, disabled: a, onKeyDown: s, onClick: i, type: c = "button", ...l }, d) {
  const { value: u, onValueChange: m, baseId: h, listValuesRef: g } = Ce("TabsTrigger"), w = u === t, k = `${h}-tab-${t}`, N = `${h}-panel-${t}`, _ = (z) => {
    m(z), requestAnimationFrame(() => {
      var S;
      (S = document.getElementById(`${h}-tab-${z}`)) == null || S.focus();
    });
  }, v = (z) => {
    const S = g.current, j = S.indexOf(t);
    if (j < 0) return;
    const A = S[(j + z + S.length) % S.length];
    _(A);
  }, T = (z) => {
    if (s == null || s(z), z.defaultPrevented || a) return;
    const S = g.current;
    switch (z.key) {
      case "ArrowRight":
      case "ArrowDown":
        z.preventDefault(), v(1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        z.preventDefault(), v(-1);
        break;
      case "Home":
        z.preventDefault(), S[0] && _(S[0]);
        break;
      case "End":
        z.preventDefault(), S.length && _(S[S.length - 1]);
        break;
    }
  };
  return /* @__PURE__ */ o(
    "button",
    {
      ref: d,
      type: c,
      role: "tab",
      id: k,
      "aria-selected": w,
      "aria-controls": N,
      tabIndex: w ? 0 : -1,
      disabled: a,
      className: V(
        "-mb-px rounded-none border-b-2 px-4 py-2 font-mono text-sm transition-colors [transition-duration:var(--duration-normal)]",
        w ? "border-[var(--button-primary-background)] bg-transparent text-[var(--text-primary)]" : "border-transparent text-secondary-700 hover:text-[var(--text-primary)] dark:text-secondary-300",
        a && "cursor-not-allowed opacity-50",
        n
      ),
      onClick: (z) => {
        i == null || i(z), !z.defaultPrevented && !a && m(t);
      },
      onKeyDown: T,
      ...l,
      children: r
    }
  );
});
xr.displayName = "TabsTrigger";
function hr({ value: e, children: t, className: r, forceMount: n = !1 }) {
  const { value: a, baseId: s } = Ce("TabsContent"), i = a === e, c = `${s}-tab-${e}`, l = `${s}-panel-${e}`;
  return !n && !i ? null : !i && n ? /* @__PURE__ */ o(
    "div",
    {
      id: l,
      role: "tabpanel",
      "aria-labelledby": c,
      hidden: !0,
      className: V("p-4 font-mono outline-none", r),
      children: t
    }
  ) : /* @__PURE__ */ o(
    "div",
    {
      id: l,
      role: "tabpanel",
      "aria-labelledby": c,
      tabIndex: 0,
      className: V(
        "p-4 font-mono outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--focus-offset-color)]",
        r
      ),
      children: t
    }
  );
}
hr.displayName = "TabsContent";
const st = {
  compact: "px-3 py-2",
  // 12 / 8
  comfortable: "px-4 py-3",
  // 16 / 12
  spacious: "px-5 py-4"
  // 20 / 16
}, Ae = Fe("compact"), vr = O(function({ className: t, striped: r, bordered: n, density: a = "compact", children: s, ...i }, c) {
  const l = /* @__PURE__ */ o(Ae.Provider, { value: a, children: /* @__PURE__ */ o(
    "table",
    {
      ref: c,
      className: V(
        "w-full border-collapse font-mono text-sm text-[var(--text-primary)]",
        r && "[&_tbody_tr:nth-child(even)]:bg-[var(--surface-subtle)]",
        t
      ),
      ...i,
      children: s
    }
  ) });
  return n ? /* @__PURE__ */ o("div", { className: "plate-round-lg p-px bg-[var(--surface-container-stroke)]", children: /* @__PURE__ */ o("div", { className: "plate-round-lg bg-[var(--surface-card)]", children: l }) }) : l;
});
vr.displayName = "Table";
const yr = O(function({ className: t, ...r }, n) {
  return /* @__PURE__ */ o(
    "thead",
    {
      ref: n,
      className: V(
        "border-b-[0.5px] border-solid border-[var(--surface-container-stroke)] bg-[var(--surface-subtle)]",
        t
      ),
      ...r
    }
  );
});
yr.displayName = "TableHeader";
const wr = O(function({ className: t, ...r }, n) {
  return /* @__PURE__ */ o("tbody", { ref: n, className: V(t), ...r });
});
wr.displayName = "TableBody";
const kr = O(function({ className: t, ...r }, n) {
  return /* @__PURE__ */ o(
    "tfoot",
    {
      ref: n,
      className: V(
        "border-t-[0.5px] border-solid border-[var(--surface-container-stroke)] bg-[var(--surface-subtle)]",
        t
      ),
      ...r
    }
  );
});
kr.displayName = "TableFooter";
const Nr = O(function({ className: t, ...r }, n) {
  return /* @__PURE__ */ o(
    "tr",
    {
      ref: n,
      className: V(
        "border-b-[0.5px] border-solid border-[var(--surface-container-stroke)] transition-colors [transition-duration:var(--duration-normal)]",
        t
      ),
      ...r
    }
  );
});
Nr.displayName = "TableRow";
const $r = O(function({ className: t, scope: r = "col", ...n }, a) {
  const s = ze(Ae);
  return /* @__PURE__ */ o(
    "th",
    {
      ref: a,
      scope: r,
      className: V(
        st[s],
        "text-left font-semibold text-[var(--text-primary)]",
        t
      ),
      ...n
    }
  );
});
$r.displayName = "TableHead";
const Sr = O(function({ className: t, ...r }, n) {
  const a = ze(Ae);
  return /* @__PURE__ */ o(
    "td",
    {
      ref: n,
      className: V(
        st[a],
        "align-middle text-secondary-800 dark:text-secondary-200",
        t
      ),
      ...r
    }
  );
});
Sr.displayName = "TableCell";
const zr = {
  none: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  6: "gap-6",
  8: "gap-8"
};
function Vr({ children: e, gap: t = "4", className: r, axis: n = "vertical" }) {
  return /* @__PURE__ */ o(
    "div",
    {
      className: V(
        "flex",
        n === "vertical" ? "flex-col" : "flex-row flex-wrap items-center",
        zr[t],
        r
      ),
      children: e
    }
  );
}
function Br({ children: e, ...t }) {
  return /* @__PURE__ */ o(
    mt,
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
  _r as Alert,
  ar as Avatar,
  Rr as Badge,
  Or as BottomSheet,
  Ge as Button,
  Er as Card,
  Mr as CaseStudyBlocks,
  ir as Checkbox,
  jr as Divider,
  Pr as Dropdown,
  ft as Input,
  fr as ListRow,
  Ar as Modal,
  cr as Radio,
  sr as Select,
  lr as Slider,
  Vr as Stack,
  nt as Switch,
  Le as TUI_ICON_GLYPHS,
  vr as Table,
  wr as TableBody,
  Sr as TableCell,
  kr as TableFooter,
  $r as TableHead,
  yr as TableHeader,
  Nr as TableRow,
  Gr as Tabs,
  hr as TabsContent,
  gr as TabsList,
  xr as TabsTrigger,
  dr as Textarea,
  Br as ThemeProvider,
  Fr as ThemeToggle,
  pr as Toast,
  Lr as Toaster,
  Dr as Tooltip,
  or as TuiIcon,
  V as cn
};
//# sourceMappingURL=index.esm.js.map

import { jsxs as w, jsx as n, Fragment as ue } from "react/jsx-runtime";
import Le, { forwardRef as O, useEffect as j, useId as le, useRef as X, useState as U, useCallback as He, isValidElement as pt, cloneElement as bt, useImperativeHandle as gt, createContext as We, useContext as Ae, useMemo as ht, useLayoutEffect as xt } from "react";
import { useTheme as vt, ThemeProvider as yt } from "next-themes";
const Xe = O(
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
    "aria-label": m,
    "aria-labelledby": u,
    ...g
  }, x) => {
    const y = `
      inline-flex items-center justify-center
      font-mono text-sm
      transition-colors [transition-duration:var(--duration-fast)]
      cursor-pointer
      disabled:cursor-not-allowed disabled:opacity-50
      focus:outline-none
      focus-visible:![box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--btn-ring)]
    `, k = () => e === "icon" ? !0 : !a || typeof a == "string" || typeof a == "number" ? !1 : typeof a == "object" && a !== null && "type" in a ? typeof a.type < "u" : Array.isArray(a) ? a.every(
      (z) => typeof z == "object" && z !== null && "type" in z
    ) : !1;
    j(() => {
      if (process.env.NODE_ENV === "production" || !(e === "icon" || k())) return;
      m != null && String(m).trim() !== "" || u != null && String(u).trim() !== "" || console.warn(
        "[@scorp-ds/components] Button: icon-only buttons should include aria-label or aria-labelledby for screen readers."
      );
    }, [e, t, a, s, i, m, u]), j(() => {
      process.env.NODE_ENV === "production" || t !== "icon" || console.warn(
        '[@scorp-ds/components] Button: size="icon" is deprecated. Icon-only buttons are squared automatically; use size="medium".'
      );
    }, [t]);
    const h = () => {
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
    }, S = {
      small: "w-4 h-4",
      // 16px
      medium: "w-5 h-5",
      // 20px
      large: "w-6 h-6",
      // 24px
      icon: "w-5 h-5"
      // 20px
    }, E = {
      small: "gap-1.5",
      // 6px - tighter for visual balance in compact buttons
      medium: "gap-2",
      // 8px - standard spacing
      large: "gap-2.5",
      // 10px - more breathing room for larger buttons
      icon: "gap-0"
      // No gap for icon-only
    }, I = (z) => z ? typeof z == "object" && z !== null && "type" in z ? /* @__PURE__ */ n("span", { className: `inline-flex items-center justify-center shrink-0 ${S[t]}`, children: z }) : z : null, T = () => {
      if (k() && a) {
        const f = t === "icon" ? "medium" : t;
        return typeof a == "object" && a !== null && "type" in a ? /* @__PURE__ */ n("span", { className: `inline-flex items-center justify-center shrink-0 ${S[f]}`, children: a }) : /* @__PURE__ */ n("span", { className: `inline-flex items-center justify-center shrink-0 ${S[f]}`, children: a });
      }
      return a;
    }, R = {
      "--btn-ring": e === "primary" || e === "link" ? "var(--focus-ring-primary)" : e === "destructive" ? "var(--focus-ring-destructive)" : e === "icon" ? "var(--focus-ring-icon)" : "var(--focus-ring-secondary)",
      outline: "none"
    };
    return c ? /* @__PURE__ */ w(
      "a",
      {
        ref: x,
        href: r ? void 0 : c,
        target: l,
        rel: d,
        "aria-disabled": r || void 0,
        className: `${y} ${h()} ${$[e]} ${E[t]} no-underline ${r ? "pointer-events-none opacity-50" : ""} ${o}`,
        style: R,
        "aria-label": m,
        "aria-labelledby": u,
        ...g,
        children: [
          s && I(s),
          T(),
          i && I(i)
        ]
      }
    ) : /* @__PURE__ */ w(
      "button",
      {
        ref: x,
        disabled: r,
        className: `${y} ${h()} ${$[e]} ${E[t]} ${o}`,
        style: R,
        "aria-label": m,
        "aria-labelledby": u,
        ...g,
        children: [
          s && I(s),
          T(),
          i && I(i)
        ]
      }
    );
  }
);
Xe.displayName = "Button";
const De = (e) => e != null && e !== !1 && e !== "";
function Ne({ error: e, helperText: t, errorMessage: r, describedBy: o }) {
  const a = le(), s = De(r), i = !s && De(t), c = s || i ? `${a}-message` : void 0;
  return {
    invalid: e || s,
    hasMessage: c != null,
    describedBy: [o, c].filter(Boolean).join(" ") || void 0,
    message: {
      id: c,
      tone: s ? "error" : "helper",
      children: s ? r : t
    }
  };
}
function $e({
  id: e,
  tone: t,
  children: r,
  className: o = ""
}) {
  return e == null ? null : /* @__PURE__ */ w(
    "p",
    {
      id: e,
      className: `font-mono text-xs ${t === "error" ? "text-error-700 dark:text-error-400" : "text-[var(--text-secondary)]"} ${o}`,
      children: [
        t === "error" && /* @__PURE__ */ n("span", { "aria-hidden": "true", children: "[er] " }),
        r
      ]
    }
  );
}
const wt = O(
  ({
    size: e = "medium",
    variant: t = "box",
    error: r = !1,
    helperText: o,
    errorMessage: a,
    disabled: s = !1,
    className: i = "",
    label: c,
    id: l,
    "aria-describedby": d,
    ...m
  }, u) => {
    const g = Ne({ error: r, helperText: o, errorMessage: a, describedBy: d }), x = g.invalid, y = le(), k = l ?? (c != null && c !== "" ? y : void 0), h = `
      w-full
      font-mono text-sm
      transition-colors [transition-duration:var(--duration-fast)]
      placeholder:text-[var(--field-placeholder)]
      disabled:cursor-not-allowed disabled:opacity-50
      focus:outline-none
    `, $ = {
      small: "h-8 px-3 py-1.5 plate-round",
      medium: "h-10 px-4 py-2.5 plate-round",
      large: "h-12 px-5 py-3.5 plate-round"
    }, S = x ? "bg-[var(--field-background-error)] text-[var(--text-primary)]" : "bg-[var(--field-background)] text-[var(--text-primary)]", E = x ? "bg-[var(--field-border-error)]" : "bg-[var(--field-border)] hover:bg-[var(--field-border-hover)] focus-within:!bg-[var(--field-border-focus)]", I = x ? "border-b border-[var(--field-border-error)] focus:border-[var(--field-border-error)]" : "border-b border-[var(--field-border)] hover:border-[var(--field-border-hover)] focus:!border-[var(--field-border-focus)]", T = t === "quiet" ? /* @__PURE__ */ n(
      "input",
      {
        ref: u,
        id: k,
        disabled: s,
        "aria-invalid": x || void 0,
        "aria-describedby": g.describedBy,
        className: `${h} ${$[e].replace("plate-round", "rounded-none")} !px-0 bg-transparent text-[var(--text-primary)] ${I} ${i}`,
        ...m
      }
    ) : /* @__PURE__ */ n(
      "div",
      {
        className: `w-full plate-round p-px transition-colors [transition-duration:var(--duration-fast)] ${E}`,
        children: /* @__PURE__ */ n(
          "input",
          {
            ref: u,
            id: k,
            disabled: s,
            "aria-invalid": x || void 0,
            "aria-describedby": g.describedBy,
            className: `${h} ${$[e]} ${S} ${i}`,
            ...m
          }
        )
      }
    ), R = c != null && c !== "";
    return !R && !g.hasMessage ? T : /* @__PURE__ */ w("div", { className: "w-full space-y-1", children: [
      R && /* @__PURE__ */ n(
        "label",
        {
          htmlFor: k,
          className: "block font-mono text-sm text-secondary-800 dark:text-secondary-200",
          children: c
        }
      ),
      T,
      /* @__PURE__ */ n($e, { ...g.message })
    ] });
  }
);
wt.displayName = "Input";
function qe(e) {
  var t, r, o = "";
  if (typeof e == "string" || typeof e == "number") o += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var a = e.length;
    for (t = 0; t < a; t++) e[t] && (r = qe(e[t])) && (o && (o += " "), o += r);
  } else for (r in e) e[r] && (o && (o += " "), o += r);
  return o;
}
function kt() {
  for (var e, t, r = 0, o = "", a = arguments.length; r < a; r++) (e = arguments[r]) && (t = qe(e)) && (o && (o += " "), o += t);
  return o;
}
const Nt = (e, t) => {
  const r = new Array(e.length + t.length);
  for (let o = 0; o < e.length; o++)
    r[o] = e[o];
  for (let o = 0; o < t.length; o++)
    r[e.length + o] = t[o];
  return r;
}, $t = (e, t) => ({
  classGroupId: e,
  validator: t
}), Ye = (e = /* @__PURE__ */ new Map(), t = null, r) => ({
  nextPart: e,
  validators: t,
  classGroupId: r
}), ke = "-", Me = [], St = "arbitrary..", It = (e) => {
  const t = zt(e), {
    conflictingClassGroups: r,
    conflictingClassGroupModifiers: o
  } = e;
  return {
    getClassGroupId: (i) => {
      if (i.startsWith("[") && i.endsWith("]"))
        return Tt(i);
      const c = i.split(ke), l = c[0] === "" && c.length > 1 ? 1 : 0;
      return Ke(c, l, t);
    },
    getConflictingClassGroupIds: (i, c) => {
      if (c) {
        const l = o[i], d = r[i];
        return l ? d ? Nt(d, l) : l : d || Me;
      }
      return r[i] || Me;
    }
  };
}, Ke = (e, t, r) => {
  if (e.length - t === 0)
    return r.classGroupId;
  const a = e[t], s = r.nextPart.get(a);
  if (s) {
    const d = Ke(e, t + 1, s);
    if (d) return d;
  }
  const i = r.validators;
  if (i === null)
    return;
  const c = t === 0 ? e.join(ke) : e.slice(t).join(ke), l = i.length;
  for (let d = 0; d < l; d++) {
    const m = i[d];
    if (m.validator(c))
      return m.classGroupId;
  }
}, Tt = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const t = e.slice(1, -1), r = t.indexOf(":"), o = t.slice(0, r);
  return o ? St + o : void 0;
})(), zt = (e) => {
  const {
    theme: t,
    classGroups: r
  } = e;
  return Ct(r, t);
}, Ct = (e, t) => {
  const r = Ye();
  for (const o in e) {
    const a = e[o];
    Re(a, r, o, t);
  }
  return r;
}, Re = (e, t, r, o) => {
  const a = e.length;
  for (let s = 0; s < a; s++) {
    const i = e[s];
    Et(i, t, r, o);
  }
}, Et = (e, t, r, o) => {
  if (typeof e == "string") {
    At(e, t, r);
    return;
  }
  if (typeof e == "function") {
    Rt(e, t, r, o);
    return;
  }
  _t(e, t, r, o);
}, At = (e, t, r) => {
  const o = e === "" ? t : Ze(t, e);
  o.classGroupId = r;
}, Rt = (e, t, r, o) => {
  if (Pt(e)) {
    Re(e(o), t, r, o);
    return;
  }
  t.validators === null && (t.validators = []), t.validators.push($t(r, e));
}, _t = (e, t, r, o) => {
  const a = Object.entries(e), s = a.length;
  for (let i = 0; i < s; i++) {
    const [c, l] = a[i];
    Re(l, Ze(t, c), r, o);
  }
}, Ze = (e, t) => {
  let r = e;
  const o = t.split(ke), a = o.length;
  for (let s = 0; s < a; s++) {
    const i = o[s];
    let c = r.nextPart.get(i);
    c || (c = Ye(), r.nextPart.set(i, c)), r = c;
  }
  return r;
}, Pt = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, jt = (e) => {
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
}, Ee = "!", Oe = ":", Lt = [], Be = (e, t, r, o, a) => ({
  modifiers: e,
  hasImportantModifier: t,
  baseClassName: r,
  maybePostfixModifierPosition: o,
  isExternal: a
}), Dt = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: r
  } = e;
  let o = (a) => {
    const s = [];
    let i = 0, c = 0, l = 0, d;
    const m = a.length;
    for (let k = 0; k < m; k++) {
      const h = a[k];
      if (i === 0 && c === 0) {
        if (h === Oe) {
          s.push(a.slice(l, k)), l = k + 1;
          continue;
        }
        if (h === "/") {
          d = k;
          continue;
        }
      }
      h === "[" ? i++ : h === "]" ? i-- : h === "(" ? c++ : h === ")" && c--;
    }
    const u = s.length === 0 ? a : a.slice(l);
    let g = u, x = !1;
    u.endsWith(Ee) ? (g = u.slice(0, -1), x = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      u.startsWith(Ee) && (g = u.slice(1), x = !0)
    );
    const y = d && d > l ? d - l : void 0;
    return Be(s, x, g, y);
  };
  if (t) {
    const a = t + Oe, s = o;
    o = (i) => i.startsWith(a) ? s(i.slice(a.length)) : Be(Lt, !1, i, void 0, !0);
  }
  if (r) {
    const a = o;
    o = (s) => r({
      className: s,
      parseClassName: a
    });
  }
  return o;
}, Mt = (e) => {
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
}, Ot = (e) => ({
  cache: jt(e.cacheSize),
  parseClassName: Dt(e),
  sortModifiers: Mt(e),
  ...It(e)
}), Bt = /\s+/, Ft = (e, t) => {
  const {
    parseClassName: r,
    getClassGroupId: o,
    getConflictingClassGroupIds: a,
    sortModifiers: s
  } = t, i = [], c = e.trim().split(Bt);
  let l = "";
  for (let d = c.length - 1; d >= 0; d -= 1) {
    const m = c[d], {
      isExternal: u,
      modifiers: g,
      hasImportantModifier: x,
      baseClassName: y,
      maybePostfixModifierPosition: k
    } = r(m);
    if (u) {
      l = m + (l.length > 0 ? " " + l : l);
      continue;
    }
    let h = !!k, $ = o(h ? y.substring(0, k) : y);
    if (!$) {
      if (!h) {
        l = m + (l.length > 0 ? " " + l : l);
        continue;
      }
      if ($ = o(y), !$) {
        l = m + (l.length > 0 ? " " + l : l);
        continue;
      }
      h = !1;
    }
    const S = g.length === 0 ? "" : g.length === 1 ? g[0] : s(g).join(":"), E = x ? S + Ee : S, I = E + $;
    if (i.indexOf(I) > -1)
      continue;
    i.push(I);
    const T = a($, h);
    for (let R = 0; R < T.length; ++R) {
      const z = T[R];
      i.push(E + z);
    }
    l = m + (l.length > 0 ? " " + l : l);
  }
  return l;
}, Vt = (...e) => {
  let t = 0, r, o, a = "";
  for (; t < e.length; )
    (r = e[t++]) && (o = Je(r)) && (a && (a += " "), a += o);
  return a;
}, Je = (e) => {
  if (typeof e == "string")
    return e;
  let t, r = "";
  for (let o = 0; o < e.length; o++)
    e[o] && (t = Je(e[o])) && (r && (r += " "), r += t);
  return r;
}, Gt = (e, ...t) => {
  let r, o, a, s;
  const i = (l) => {
    const d = t.reduce((m, u) => u(m), e());
    return r = Ot(d), o = r.cache.get, a = r.cache.set, s = c, c(l);
  }, c = (l) => {
    const d = o(l);
    if (d)
      return d;
    const m = Ft(l, r);
    return a(l, m), m;
  };
  return s = i, (...l) => s(Vt(...l));
}, Ut = [], L = (e) => {
  const t = (r) => r[e] || Ut;
  return t.isThemeGetter = !0, t;
}, Qe = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, et = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Ht = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, Wt = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Xt = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, qt = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Yt = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Kt = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, oe = (e) => Ht.test(e), C = (e) => !!e && !Number.isNaN(Number(e)), ne = (e) => !!e && Number.isInteger(Number(e)), Te = (e) => e.endsWith("%") && C(e.slice(0, -1)), Q = (e) => Wt.test(e), tt = () => !0, Zt = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Xt.test(e) && !qt.test(e)
), _e = () => !1, Jt = (e) => Yt.test(e), Qt = (e) => Kt.test(e), er = (e) => !p(e) && !b(e), tr = (e) => ae(e, nt, _e), p = (e) => Qe.test(e), ie = (e) => ae(e, at, Zt), Fe = (e) => ae(e, cr, C), rr = (e) => ae(e, it, tt), or = (e) => ae(e, st, _e), Ve = (e) => ae(e, rt, _e), nr = (e) => ae(e, ot, Qt), xe = (e) => ae(e, lt, Jt), b = (e) => et.test(e), he = (e) => ce(e, at), ar = (e) => ce(e, st), Ge = (e) => ce(e, rt), sr = (e) => ce(e, nt), ir = (e) => ce(e, ot), ve = (e) => ce(e, lt, !0), lr = (e) => ce(e, it, !0), ae = (e, t, r) => {
  const o = Qe.exec(e);
  return o ? o[1] ? t(o[1]) : r(o[2]) : !1;
}, ce = (e, t, r = !1) => {
  const o = et.exec(e);
  return o ? o[1] ? t(o[1]) : r : !1;
}, rt = (e) => e === "position" || e === "percentage", ot = (e) => e === "image" || e === "url", nt = (e) => e === "length" || e === "size" || e === "bg-size", at = (e) => e === "length", cr = (e) => e === "number", st = (e) => e === "family-name", it = (e) => e === "number" || e === "weight", lt = (e) => e === "shadow", dr = () => {
  const e = L("color"), t = L("font"), r = L("text"), o = L("font-weight"), a = L("tracking"), s = L("leading"), i = L("breakpoint"), c = L("container"), l = L("spacing"), d = L("radius"), m = L("shadow"), u = L("inset-shadow"), g = L("text-shadow"), x = L("drop-shadow"), y = L("blur"), k = L("perspective"), h = L("aspect"), $ = L("ease"), S = L("animate"), E = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], I = () => [
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
  ], T = () => [...I(), b, p], R = () => ["auto", "hidden", "clip", "visible", "scroll"], z = () => ["auto", "contain", "none"], f = () => [b, p, l], P = () => [oe, "full", "auto", ...f()], V = () => [ne, "none", "subgrid", b, p], ee = () => ["auto", {
    span: ["full", ne, b, p]
  }, ne, b, p], Y = () => [ne, "auto", b, p], me = () => ["auto", "min", "max", "fr", b, p], Z = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], K = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], D = () => ["auto", ...f()], q = () => [oe, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...f()], fe = () => [oe, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...f()], de = () => [oe, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...f()], v = () => [e, b, p], pe = () => [...I(), Ge, Ve, {
    position: [b, p]
  }], Se = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], te = () => ["auto", "cover", "contain", sr, tr, {
    size: [b, p]
  }], be = () => [Te, he, ie], B = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    d,
    b,
    p
  ], M = () => ["", C, he, ie], se = () => ["solid", "dashed", "dotted", "double"], ge = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], N = () => [C, Te, Ge, Ve], A = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    y,
    b,
    p
  ], _ = () => ["none", C, b, p], G = () => ["none", C, b, p], H = () => [C, b, p], J = () => [oe, "full", ...f()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Q],
      breakpoint: [Q],
      color: [tt],
      container: [Q],
      "drop-shadow": [Q],
      ease: ["in", "out", "in-out"],
      font: [er],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Q],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Q],
      shadow: [Q],
      spacing: ["px", C],
      text: [Q],
      "text-shadow": [Q],
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
        aspect: ["auto", "square", oe, p, b, h]
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
        columns: [C, p, b, c]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": E()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": E()
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
        overflow: R()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": R()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": R()
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
        z: [ne, "auto", b, p]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [oe, "full", "auto", c, ...f()]
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
        flex: [C, oe, "auto", "initial", "none", p]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", C, b, p]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", C, b, p]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [ne, "first", "last", "none", b, p]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": V()
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
        "grid-rows": V()
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
        "auto-cols": me()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": me()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: f()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": f()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": f()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...Z(), "normal"]
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
        content: ["normal", ...Z()]
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
        "place-content": Z()
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
        p: f()
      }],
      /**
       * Padding Inline
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: f()
      }],
      /**
       * Padding Block
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: f()
      }],
      /**
       * Padding Inline Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: f()
      }],
      /**
       * Padding Inline End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: f()
      }],
      /**
       * Padding Block Start
       * @see https://tailwindcss.com/docs/padding
       */
      pbs: [{
        pbs: f()
      }],
      /**
       * Padding Block End
       * @see https://tailwindcss.com/docs/padding
       */
      pbe: [{
        pbe: f()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: f()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: f()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: f()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: f()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: D()
      }],
      /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: D()
      }],
      /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: D()
      }],
      /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: D()
      }],
      /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: D()
      }],
      /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */
      mbs: [{
        mbs: D()
      }],
      /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */
      mbe: [{
        mbe: D()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: D()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: D()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: D()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: D()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": f()
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
        "space-y": f()
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
        size: q()
      }],
      /**
       * Inline Size
       * @see https://tailwindcss.com/docs/width
       */
      "inline-size": [{
        inline: ["auto", ...fe()]
      }],
      /**
       * Min-Inline Size
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-inline-size": [{
        "min-inline": ["auto", ...fe()]
      }],
      /**
       * Max-Inline Size
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-inline-size": [{
        "max-inline": ["none", ...fe()]
      }],
      /**
       * Block Size
       * @see https://tailwindcss.com/docs/height
       */
      "block-size": [{
        block: ["auto", ...de()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-block-size": [{
        "min-block": ["auto", ...de()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-block-size": [{
        "max-block": ["none", ...de()]
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [c, "screen", ...q()]
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
          ...q()
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
          ...q()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...q()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...q()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...q()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", r, he, ie]
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
        font: [o, lr, rr]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", Te, p]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [ar, or, t]
      }],
      /**
       * Font Feature Settings
       * @see https://tailwindcss.com/docs/font-feature-settings
       */
      "font-features": [{
        "font-features": [p]
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
        tracking: [a, b, p]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [C, "none", b, Fe]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          s,
          ...f()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", b, p]
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
        list: ["disc", "decimal", "none", b, p]
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
        placeholder: v()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: v()
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
        decoration: [...se(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [C, "from-font", "auto", b, ie]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: v()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [C, "auto", b, p]
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
        indent: f()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", b, p]
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
        content: ["none", b, p]
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
        bg: pe()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: Se()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: te()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, ne, b, p],
          radial: ["", b, p],
          conic: [ne, b, p]
        }, ir, nr]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: v()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: be()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: be()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: be()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: v()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: v()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: v()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: B()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": B()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": B()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": B()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": B()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": B()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": B()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": B()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": B()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": B()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": B()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": B()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": B()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": B()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": B()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: M()
      }],
      /**
       * Border Width Inline
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": M()
      }],
      /**
       * Border Width Block
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": M()
      }],
      /**
       * Border Width Inline Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": M()
      }],
      /**
       * Border Width Inline End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": M()
      }],
      /**
       * Border Width Block Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-bs": [{
        "border-bs": M()
      }],
      /**
       * Border Width Block End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-be": [{
        "border-be": M()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": M()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": M()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": M()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": M()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": M()
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
        "divide-y": M()
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
        border: [...se(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...se(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: v()
      }],
      /**
       * Border Color Inline
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": v()
      }],
      /**
       * Border Color Block
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": v()
      }],
      /**
       * Border Color Inline Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": v()
      }],
      /**
       * Border Color Inline End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": v()
      }],
      /**
       * Border Color Block Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-bs": [{
        "border-bs": v()
      }],
      /**
       * Border Color Block End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-be": [{
        "border-be": v()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": v()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": v()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": v()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": v()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: v()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...se(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [C, b, p]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", C, he, ie]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: v()
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
          m,
          ve,
          xe
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: v()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", u, ve, xe]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": v()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: M()
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
        ring: v()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [C, ie]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": v()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": M()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": v()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", g, ve, xe]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": v()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [C, b, p]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...ge(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": ge()
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
        "mask-linear": [C]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": N()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": N()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": v()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": v()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": N()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": N()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": v()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": v()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": N()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": N()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": v()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": v()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": N()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": N()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": v()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": v()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": N()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": N()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": v()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": v()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": N()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": N()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": v()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": v()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": N()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": N()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": v()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": v()
      }],
      "mask-image-radial": [{
        "mask-radial": [b, p]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": N()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": N()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": v()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": v()
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
        "mask-radial-at": I()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [C]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": N()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": N()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": v()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": v()
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
        mask: pe()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: Se()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: te()
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
        mask: ["none", b, p]
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
          b,
          p
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: A()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [C, b, p]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [C, b, p]
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
          x,
          ve,
          xe
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": v()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", C, b, p]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [C, b, p]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", C, b, p]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [C, b, p]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", C, b, p]
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
          b,
          p
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": A()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [C, b, p]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [C, b, p]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", C, b, p]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [C, b, p]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", C, b, p]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [C, b, p]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [C, b, p]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", C, b, p]
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
        "border-spacing": f()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": f()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": f()
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
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", b, p]
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
        duration: [C, "initial", b, p]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", $, b, p]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [C, b, p]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", S, b, p]
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
        perspective: [k, b, p]
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
        rotate: _()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": _()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": _()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": _()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: G()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": G()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": G()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": G()
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
        skew: H()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": H()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": H()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [b, p, "", "none", "gpu", "cpu"]
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
        translate: J()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": J()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": J()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": J()
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
        accent: v()
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
        caret: v()
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", b, p]
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
        "scroll-m": f()
      }],
      /**
       * Scroll Margin Inline
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": f()
      }],
      /**
       * Scroll Margin Block
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": f()
      }],
      /**
       * Scroll Margin Inline Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": f()
      }],
      /**
       * Scroll Margin Inline End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": f()
      }],
      /**
       * Scroll Margin Block Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbs": [{
        "scroll-mbs": f()
      }],
      /**
       * Scroll Margin Block End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbe": [{
        "scroll-mbe": f()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": f()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": f()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": f()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": f()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": f()
      }],
      /**
       * Scroll Padding Inline
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": f()
      }],
      /**
       * Scroll Padding Block
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": f()
      }],
      /**
       * Scroll Padding Inline Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": f()
      }],
      /**
       * Scroll Padding Inline End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": f()
      }],
      /**
       * Scroll Padding Block Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbs": [{
        "scroll-pbs": f()
      }],
      /**
       * Scroll Padding Block End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbe": [{
        "scroll-pbe": f()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": f()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": f()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": f()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": f()
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
        "will-change": ["auto", "scroll", "contents", "transform", b, p]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...v()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [C, he, ie, Fe]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...v()]
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
}, ur = /* @__PURE__ */ Gt(dr);
function F(...e) {
  return ur(kt(e));
}
const Fr = {
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
}, mr = {
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
function fr(e) {
  let t = "";
  return e.forEach((r, o) => {
    for (const a of r.matchAll(/#+/g))
      t += `M${a.index} ${o}h${a[0].length}v1h-${a[0].length}Z`;
  }), t;
}
const pr = Object.fromEntries(
  Object.entries(mr).map(([e, t]) => [e, fr(t)])
), Ue = {
  3: { box: "w-3 h-3 text-xs", pixel: 1.5 },
  4: { box: "w-4 h-4 text-sm", pixel: 2 },
  5: { box: "w-5 h-5 text-base", pixel: 2 },
  6: { box: "w-6 h-6 text-lg", pixel: 3 },
  8: { box: "w-8 h-8 text-2xl", pixel: 4 }
}, ct = ({
  name: e,
  size: t = "4",
  className: r
}) => {
  const o = pr[e], { box: a, pixel: s } = Ue[t] ?? Ue[4];
  return /* @__PURE__ */ n(
    "span",
    {
      className: F(
        "inline-flex items-center justify-center font-mono leading-none select-none",
        a,
        r
      ),
      "aria-hidden": "true",
      children: o ? /* @__PURE__ */ n(
        "svg",
        {
          viewBox: "0 0 7 7",
          width: 7 * s,
          height: 7 * s,
          fill: "currentColor",
          shapeRendering: "crispEdges",
          children: /* @__PURE__ */ n("path", { d: o })
        }
      ) : "?"
    }
  );
};
function Vr({ isOpen: e, onClose: t, title: r, children: o, footerContent: a, width: s = 740, docked: i = !1 }) {
  const c = X(null), l = X(null), [d, m] = U(e);
  j(() => {
    e && m(!0);
  }, [e]);
  const u = d && !e, [g, x] = U(
    () => typeof window < "u" && window.matchMedia("(min-width: 960px)").matches
  );
  j(() => {
    const h = window.matchMedia("(min-width: 960px)"), $ = () => x(h.matches);
    return h.addEventListener("change", $), () => h.removeEventListener("change", $);
  }, []);
  const y = i && g;
  if (j(() => {
    var h;
    if (e)
      return l.current = document.activeElement, (h = c.current) == null || h.focus(), () => {
        var $;
        ($ = l.current) == null || $.focus(), l.current = null;
      };
  }, [e]), j(() => {
    const h = ($) => {
      $.key === "Escape" && t();
    };
    return e && document.addEventListener("keydown", h), () => {
      document.removeEventListener("keydown", h);
    };
  }, [e, t]), j(() => (e && !y ? document.body.style.overflow = "hidden" : document.body.style.overflow = "unset", () => {
    document.body.style.overflow = "unset";
  }), [e, y]), !d) return null;
  const k = /* @__PURE__ */ n(
    "div",
    {
      ref: c,
      tabIndex: -1,
      className: "max-w-full max-h-[80vh] plate-round-lg p-px bg-[var(--surface-container-stroke)] flex focus:outline-none",
      style: { width: typeof s == "number" ? `${s}px` : s },
      role: "dialog",
      "aria-modal": y ? void 0 : "true",
      "aria-label": r,
      onClick: (h) => h.stopPropagation(),
      children: /* @__PURE__ */ w("div", { className: "w-full plate-round-lg bg-[var(--surface-card)] flex flex-col overflow-hidden", children: [
        /* @__PURE__ */ w("div", { className: "flex items-center justify-between px-6 py-5 border-b-[0.5px] border-solid border-[var(--surface-container-stroke)]", children: [
          /* @__PURE__ */ n("h2", { className: "text-base font-mono text-[var(--text-primary)] font-medium flex-1 min-w-0 truncate", children: r }),
          /* @__PURE__ */ n(
            Xe,
            {
              variant: "secondary",
              size: "small",
              type: "button",
              onClick: t,
              "aria-label": "Close modal",
              className: "ml-4 shrink-0",
              children: /* @__PURE__ */ n(ct, { name: "X" })
            }
          )
        ] }),
        /* @__PURE__ */ n("div", { className: "overflow-y-auto px-6 py-5", tabIndex: 0, children: o }),
        a && /* @__PURE__ */ n("div", { className: "flex items-center justify-end gap-3 px-6 py-5 border-t-[0.5px] border-solid border-[var(--surface-container-stroke)]", children: a })
      ] })
    }
  );
  return y ? /* @__PURE__ */ n(
    "div",
    {
      className: `fixed inset-x-0 mx-auto w-fit max-w-full ${u ? "animate-out fade-out fill-mode-forwards" : "animate-in fade-in"}`,
      style: {
        zIndex: "var(--z-index-modal)",
        bottom: "48px",
        animationDuration: "var(--duration-normal)",
        filter: "drop-shadow(0 10px 40px rgba(0, 0, 0, 0.35))"
      },
      onAnimationEnd: () => {
        u && m(!1);
      },
      children: k
    }
  ) : /* @__PURE__ */ n(ue, { children: /* @__PURE__ */ n(
    "div",
    {
      className: `fixed inset-0 flex items-center justify-center p-5 bg-[var(--surface-overlay)] ${u ? "animate-out fade-out fill-mode-forwards" : "animate-in fade-in"}`,
      style: { zIndex: "var(--z-index-modal)", animationDuration: "var(--duration-normal)" },
      onClick: t,
      onAnimationEnd: () => {
        u && m(!1);
      },
      children: k
    }
  ) });
}
function Gr({
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
      children: /* @__PURE__ */ w(
        "div",
        {
          className: `
        plate-round-lg bg-[var(--surface-card)] h-full w-full
        ${i ? "flex flex-col flex-1 min-h-0" : ""}
      `,
          children: [
            (e || t || r) && /* @__PURE__ */ n("div", { className: "p-4 lg:p-6 border-b-[0.5px] border-solid border-[var(--surface-container-stroke)] overflow-hidden rounded-none", children: r || /* @__PURE__ */ w("div", { children: [
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
function Ur({
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
  }, m = {
    default: "border-current text-secondary-800 dark:text-secondary-200",
    primary: "border-current text-primary-800 dark:text-primary-300",
    success: "border-current text-success-800 dark:text-success-300",
    warning: "border-current text-warning-800 dark:text-warning-300",
    error: "border-current text-error-800 dark:text-error-300",
    info: "border-current text-info-800 dark:text-info-300",
    bone: "border-secondary-500 text-secondary-800 dark:text-secondary-200"
  }, u = {
    small: "w-3 h-3",
    // 12px
    medium: "w-3.5 h-3.5",
    // 14px
    large: "w-4 h-4"
    // 16px
  };
  return /* @__PURE__ */ w(
    "span",
    {
      className: `
        inline-flex items-center gap-1.5
        font-mono font-medium
        ${o ? `rounded-none border border-dashed bg-transparent ${m[e]}` : `plate-round ${d[e]}`}
        ${l[t]}
        ${r ? "uppercase [letter-spacing:.08em]" : ""}
        ${c}
      `,
      children: [
        s && /* @__PURE__ */ n("span", { className: `inline-flex items-center justify-center ${u[t]} flex-shrink-0`, children: s }),
        /* @__PURE__ */ n("span", { className: "inline-flex items-center", children: a }),
        i && /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: (g) => {
              g.stopPropagation(), i();
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
  return /* @__PURE__ */ n("div", { role: "alert", className: `plate-round p-px ${d.ring} ${s}`, children: /* @__PURE__ */ w(
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
        /* @__PURE__ */ w("div", { className: "flex-1 min-w-0", children: [
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
function br({
  src: e,
  alt: t,
  initials: r,
  icon: o,
  size: a = "medium",
  status: s,
  className: i = "",
  onError: c
}) {
  const [l, d] = U(!1), u = {
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
  }[a], g = () => {
    d(!0), c && c();
  }, x = e && !l, y = !x && r, k = !x && !y && o, h = !x && !y && !k, $ = {
    online: "bg-success-600 dark:bg-success-500",
    offline: "bg-secondary-500 dark:bg-secondary-600",
    away: "bg-warning-600 dark:bg-warning-500"
  };
  return /* @__PURE__ */ w("div", { className: `relative inline-block ${u.container} ${i}`, children: [
    /* @__PURE__ */ w(
      "div",
      {
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
          x && /* @__PURE__ */ n(
            "img",
            {
              src: e,
              alt: t || "Avatar",
              className: "w-full h-full object-cover",
              onError: g
            }
          ),
          y && /* @__PURE__ */ n("span", { className: "select-none", children: r }),
          k && /* @__PURE__ */ n("div", { className: `${u.icon} inline-flex items-center justify-center leading-none text-secondary-700 dark:text-secondary-300`, children: o }),
          h && /* @__PURE__ */ n("span", { className: `${u.icon} inline-flex items-center justify-center font-mono font-bold text-secondary-900 dark:text-secondary-100`, "aria-hidden": "true", children: "@" })
        ]
      }
    ),
    s && /* @__PURE__ */ n(
      "span",
      {
        role: "img",
        className: `
            absolute block
            ${u.statusOffset}
            ${u.status}
            ${$[s]}
            rounded-none
            border-2 border-[var(--field-background)]
          `,
        "aria-label": `Status: ${s}`
      }
    )
  ] });
}
function Wr({
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
  ) : e === "withText" && t ? /* @__PURE__ */ w(
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
function Xr({
  content: e,
  children: t,
  position: r = "top",
  delay: o = 200,
  maxWidth: a = "200px",
  className: s = ""
}) {
  const [i, c] = U(!1), [l, d] = U(!1), m = X(null), u = X(null), g = X(null), x = X(null), y = le(), k = () => {
    m.current && clearTimeout(m.current), u.current && clearTimeout(u.current);
  }, h = () => {
    k(), m.current = setTimeout(() => {
      c(!0), u.current = setTimeout(() => d(!0), 50);
    }, o);
  }, $ = He(() => {
    k(), c(!1), d(!1);
  }, []), S = (P) => {
    var V;
    (V = x.current) != null && V.contains(P.relatedTarget) || $();
  };
  j(() => {
    if (!i) return;
    const P = (V) => {
      V.key === "Escape" && $();
    };
    return document.addEventListener("keydown", P), () => document.removeEventListener("keydown", P);
  }, [i, $]), j(() => k, []);
  const E = pt(t) ? bt(t, {
    "aria-describedby": [
      t.props["aria-describedby"],
      i ? y : void 0
    ].filter(Boolean).join(" ") || void 0
  }) : t, I = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2"
  }, T = "polygon(0 0, 16px 0, 16px 2px, 14px 2px, 14px 4px, 12px 4px, 12px 6px, 10px 6px, 10px 8px, 6px 8px, 6px 6px, 4px 6px, 4px 4px, 2px 4px, 2px 2px, 0 2px)", R = "polygon(0 0, 12px 0, 12px 2px, 10px 2px, 10px 4px, 8px 4px, 8px 6px, 4px 6px, 4px 4px, 2px 4px, 2px 2px, 0 2px)", z = {
    top: "top-full left-1/2 -translate-x-1/2 -translate-y-px",
    bottom: "bottom-full left-1/2 -translate-x-1/2 translate-y-px rotate-180",
    left: "left-full top-1/2 -translate-y-1/2 -translate-x-[5px] -rotate-90",
    right: "right-full top-1/2 -translate-y-1/2 translate-x-[5px] rotate-90"
  }, f = {
    top: "top-full inset-x-0 h-2",
    bottom: "bottom-full inset-x-0 h-2",
    left: "left-full inset-y-0 w-2",
    right: "right-full inset-y-0 w-2"
  };
  return /* @__PURE__ */ w(
    "div",
    {
      ref: x,
      className: `relative inline-block w-fit ${s}`,
      onMouseEnter: h,
      onMouseLeave: $,
      onFocus: h,
      onBlur: S,
      children: [
        E,
        i && /* @__PURE__ */ w(
          "div",
          {
            ref: g,
            id: y,
            role: "tooltip",
            className: `
            absolute
            ${I[r]}
            w-max
            z-[var(--z-index-tooltip)]
            ${l ? "opacity-100" : "opacity-0"}
            transition-opacity [transition-duration:var(--duration-fast)]
          `,
            style: { maxWidth: a },
            children: [
              /* @__PURE__ */ n("span", { className: `absolute ${f[r]}`, "aria-hidden": "true" }),
              /* @__PURE__ */ n("div", { className: "plate-round p-px bg-[var(--surface-container-stroke)]", children: /* @__PURE__ */ n("div", { className: "plate-round bg-[var(--surface-card)] min-w-16 px-3 py-2 text-center font-mono text-xs text-[var(--text-primary)] whitespace-normal", children: e }) }),
              /* @__PURE__ */ n("div", { className: `absolute ${z[r]}`, "aria-hidden": "true", children: /* @__PURE__ */ w("div", { className: "relative h-[8px] w-[16px]", children: [
                /* @__PURE__ */ n(
                  "div",
                  {
                    className: "absolute inset-0 bg-[var(--surface-container-stroke)]",
                    style: { clipPath: T }
                  }
                ),
                /* @__PURE__ */ n(
                  "div",
                  {
                    className: "absolute left-[2px] top-[-1px] h-[6px] w-[12px] bg-[var(--surface-card)]",
                    style: { clipPath: R }
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
const gr = O(function({
  size: t = "medium",
  error: r = !1,
  helperText: o,
  errorMessage: a,
  disabled: s = !1,
  className: i = "",
  children: c,
  value: l,
  defaultValue: d,
  onChange: m,
  name: u,
  label: g,
  "aria-label": x,
  "aria-describedby": y,
  id: k,
  ...h
}, $) {
  var ge;
  const S = Ne({ error: r, helperText: o, errorMessage: a, describedBy: y }), E = S.invalid, I = le(), T = k ?? `${I}-trigger`, z = (() => {
    const N = [];
    if (Array.isArray(c))
      c.forEach((A) => {
        if (typeof A == "object" && A !== null && "props" in A) {
          const _ = A.props;
          N.push({
            value: _.value || "",
            label: typeof _.children == "string" ? _.children : String(_.children || ""),
            disabled: _.disabled
          });
        }
      });
    else if (typeof c == "object" && c !== null && "props" in c) {
      const A = c.props;
      N.push({
        value: A.value || "",
        label: typeof A.children == "string" ? A.children : String(A.children || ""),
        disabled: A.disabled
      });
    }
    return N;
  })(), [f, P] = U(!1), [V, ee] = U(-1), [Y, me] = U(
    l !== void 0 ? String(l) : d !== void 0 ? String(d) : ((ge = z[0]) == null ? void 0 : ge.value) || ""
  ), Z = X(null), K = X(null), D = X(null);
  j(() => {
    l !== void 0 && (me(String(l)), D.current && (D.current.value = String(l)));
  }, [l]), gt($, () => D.current);
  const q = z.find((N) => N.value === Y), fe = (q == null ? void 0 : q.label) || "", de = () => {
    s || (P(!f), f || ee(-1));
  }, v = () => {
    P(!1), ee(-1);
  }, pe = (N) => {
    l === void 0 && me(N), D.current && (D.current.value = N), m && m({
      target: { value: N, name: u },
      currentTarget: { value: N, name: u }
    }), v();
  };
  j(() => {
    function N(A) {
      Z.current && !Z.current.contains(A.target) && v();
    }
    if (f)
      return document.addEventListener("mousedown", N), () => {
        document.removeEventListener("mousedown", N);
      };
  }, [f]), j(() => {
    function N(A) {
      var H, J;
      if (!((H = Z.current) != null && H.contains(A.target)) && !f)
        return;
      if (!f) {
        if ((A.key === "Enter" || A.key === " " || A.key === "ArrowDown" || A.key === "ArrowUp") && (J = Z.current) != null && J.contains(A.target)) {
          A.preventDefault(), de();
          const W = z.filter((Ie) => !Ie.disabled).findIndex((Ie) => Ie.value === Y);
          ee(W >= 0 ? W : 0);
        }
        return;
      }
      const _ = z.filter((re) => !re.disabled), G = V;
      switch (A.key) {
        case "Escape":
          A.preventDefault(), v();
          break;
        case "ArrowDown":
          A.preventDefault(), ee((re) => {
            const W = re + 1;
            return W >= _.length ? 0 : W;
          });
          break;
        case "ArrowUp":
          A.preventDefault(), ee((re) => {
            const W = re - 1;
            return W < 0 ? _.length - 1 : W;
          });
          break;
        case "Enter":
        case " ":
          A.preventDefault(), G >= 0 && G < _.length && pe(_[G].value);
          break;
      }
    }
    return document.addEventListener("keydown", N), () => {
      document.removeEventListener("keydown", N);
    };
  }, [f, V, z, Y]), j(() => {
    if (V >= 0 && K.current) {
      const N = K.current.querySelectorAll('[role="option"]');
      let A = 0, _ = 0;
      for (let H = 0; H < N.length; H++)
        if (!z[H].disabled) {
          if (_ === V) {
            A = H;
            break;
          }
          _++;
        }
      const G = N[A];
      G && G.scrollIntoView({ block: "nearest" });
    }
  }, [V, z]);
  const te = {
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
  }[t], be = E ? "bg-[var(--field-background-error)] text-[var(--text-primary)]" : "bg-[var(--field-background)] text-[var(--text-primary)]", B = E ? "bg-[var(--field-border-error)]" : "bg-[var(--field-border)] hover:bg-[var(--field-border-hover)] focus-within:!bg-[var(--field-border-focus)]", M = /* @__PURE__ */ w("div", { ref: Z, className: "relative inline-block w-full", children: [
    /* @__PURE__ */ n(
      "select",
      {
        ref: D,
        name: u,
        value: Y,
        onChange: m,
        className: "sr-only",
        "aria-hidden": "true",
        tabIndex: -1,
        ...h,
        children: z.map((N, A) => /* @__PURE__ */ n("option", { value: N.value, disabled: N.disabled, children: N.label }, A))
      }
    ),
    /* @__PURE__ */ n("div", { className: `plate-round p-px transition-colors [transition-duration:var(--duration-fast)] ${B} ${s ? "opacity-50" : ""}`, children: /* @__PURE__ */ w(
      "button",
      {
        type: "button",
        id: T,
        onClick: de,
        disabled: s,
        className: `
          w-full
          flex items-center justify-between
          font-mono text-sm
          transition-colors [transition-duration:var(--duration-fast)]
          ${te.trigger}
          ${be}
          ${s ? "cursor-not-allowed" : "cursor-pointer"}
          focus:outline-none
        `,
        "aria-haspopup": "listbox",
        "aria-expanded": f,
        "aria-invalid": E || void 0,
        "aria-describedby": S.describedBy,
        "aria-label": g != null && g !== "" ? void 0 : x ?? "Select an option",
        children: [
          /* @__PURE__ */ n("span", { className: "truncate text-left flex-1", children: fe || "Select..." }),
          /* @__PURE__ */ n(
            "span",
            {
              className: `
            ${te.icon}
            inline-flex items-center justify-center font-mono leading-none
            text-[var(--text-secondary)]
            transition-transform [transition-duration:var(--duration-normal)]
            flex-shrink-0 ml-2
            ${f ? "rotate-180" : ""}
            ${s ? "opacity-50" : ""}
          `,
              "aria-hidden": "true",
              children: "▼"
            }
          )
        ]
      }
    ) }),
    f && /* @__PURE__ */ n(
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
            ref: K,
            role: "listbox",
            className: `plate-round bg-[var(--surface-card)] ${te.menu} max-h-[300px] overflow-y-auto`,
            children: z.map((N, A) => {
              const _ = N.disabled, G = N.value === Y, re = z.filter((W) => !W.disabled).findIndex((W) => W.value === N.value) === V && !_;
              return /* @__PURE__ */ w(
                "button",
                {
                  type: "button",
                  role: "option",
                  "aria-selected": G,
                  disabled: _,
                  onClick: () => !_ && pe(N.value),
                  className: `
                  w-full flex items-center gap-2
                  px-4 py-3
                  font-mono text-sm text-left
                  transition-colors [transition-duration:var(--duration-fast)]
                  ${_ ? "opacity-50 cursor-not-allowed" : "text-[var(--text-primary)] hover:bg-[var(--surface-subtle)] cursor-pointer"}
                  ${re && !_ ? "bg-[var(--surface-subtle)]" : ""}
                  ${te.menuItem}
                `,
                  children: [
                    /* @__PURE__ */ n("span", { className: "truncate flex-1 min-w-0", children: N.label }),
                    G && /* @__PURE__ */ n("span", { className: `${te.icon} inline-flex items-center justify-center font-mono font-bold text-[var(--border-focus)] flex-shrink-0`, "aria-hidden": "true", children: "✓" })
                  ]
                },
                A
              );
            })
          }
        )
      }
    )
  ] }), se = g != null && g !== "";
  return !se && !S.hasMessage ? /* @__PURE__ */ n("div", { className: `w-full ${i}`.trim(), children: M }) : /* @__PURE__ */ w("div", { className: `w-full space-y-1 ${i}`.trim(), children: [
    se && /* @__PURE__ */ n(
      "label",
      {
        htmlFor: T,
        className: "block font-mono text-sm text-secondary-800 dark:text-secondary-200",
        children: g
      }
    ),
    M,
    /* @__PURE__ */ n($e, { ...S.message })
  ] });
});
gr.displayName = "Select";
const hr = O(
  ({
    size: e = "medium",
    label: t,
    error: r = !1,
    helperText: o,
    errorMessage: a,
    disabled: s = !1,
    checked: i,
    onChange: c,
    onCheckedChange: l,
    className: d = "",
    "aria-describedby": m,
    ...u
  }, g) => {
    const x = Ne({ error: r, helperText: o, errorMessage: a, describedBy: m }), y = x.invalid, h = {
      small: {
        checkbox: "w-4 h-4",
        glyph: "text-3xs",
        label: "text-sm",
        messageIndent: "pl-6"
        // box 16 + gap 8
      },
      medium: {
        checkbox: "w-5 h-5",
        glyph: "text-xs",
        label: "text-sm",
        messageIndent: "pl-7"
        // box 20 + gap 8
      },
      large: {
        checkbox: "w-6 h-6",
        glyph: "text-sm",
        label: "text-sm",
        messageIndent: "pl-8"
        // box 24 + gap 8
      }
    }[e], $ = y ? "bg-[var(--field-border-error)]" : `bg-[var(--field-border)] hover:bg-[var(--field-border-hover)]
         peer-checked:bg-[var(--button-primary-background)]
         peer-checked:hover:bg-[var(--button-primary-background-hover)]`, S = y ? "peer-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-error)]" : "peer-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]", E = (R) => {
      c && c(R), l && l(R.target.checked);
    }, I = t != null && t !== !1 && t !== "", T = /* @__PURE__ */ w("span", { className: "relative inline-flex shrink-0 before:content-[''] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-11 before:h-11", children: [
      /* @__PURE__ */ n(
        "input",
        {
          ref: g,
          type: "checkbox",
          ...i !== void 0 ? { checked: i } : {},
          disabled: s,
          onChange: E,
          className: "peer sr-only",
          "aria-invalid": y || void 0,
          "aria-describedby": x.describedBy,
          ...u
        }
      ),
      /* @__PURE__ */ n(
        "span",
        {
          "aria-hidden": "true",
          className: `
            plate-round p-px inline-flex shrink-0
            ${h.checkbox}
            transition-colors [transition-duration:var(--duration-fast)]
            ${s ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
            ${$}
            ${y ? "peer-checked:[&>span]:bg-[var(--field-border-error)]" : "peer-checked:[&>span]:bg-[var(--button-primary-background)]"}
            peer-checked:[&>span>span]:opacity-100
            ${S}
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
                  className: `${h.glyph} font-mono leading-none opacity-0 transition-opacity [transition-duration:var(--duration-fast)] ${y ? "text-white" : "text-[var(--button-primary-text)]"}`,
                  "aria-hidden": "true",
                  children: "✓"
                }
              )
            }
          )
        }
      )
    ] });
    return /* @__PURE__ */ w("div", { className: `flex flex-col gap-1 ${d}`, children: [
      /* @__PURE__ */ w(
        "label",
        {
          className: `inline-flex items-center gap-2 font-mono ${s ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`,
          children: [
            T,
            I && /* @__PURE__ */ n("span", { className: `${h.label} text-[var(--text-primary)]`, children: t })
          ]
        }
      ),
      /* @__PURE__ */ n($e, { ...x.message, className: h.messageIndent })
    ] });
  }
);
hr.displayName = "Checkbox";
const xr = O(function({ label: t, id: r, className: o = "", disabled: a, ...s }, i) {
  const c = le(), l = r ?? c;
  return /* @__PURE__ */ w("span", { className: `inline-flex flex-col gap-1.5 font-mono ${o}`, children: [
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
xr.displayName = "Slider";
const vr = O(
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
    const u = {
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
    }[e], g = r ? `
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
      `, x = r ? "peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--focus-ring-error)] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[var(--focus-offset-color)]" : "peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--focus-ring-primary)] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[var(--focus-offset-color)]", y = ($) => {
      s && s($), i && i($.target.checked);
    }, k = t != null && t !== !1 && t !== "", h = /* @__PURE__ */ w("span", { className: "relative inline-flex shrink-0 before:content-[''] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-11 before:h-11", children: [
      /* @__PURE__ */ n(
        "input",
        {
          ref: d,
          type: "radio",
          ...a !== void 0 ? { checked: a } : {},
          disabled: o,
          onChange: y,
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
            ${u.radio}
            rounded-full
            border-2
            ${o ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
            ${g}
            ${x}
            peer-checked:[&>span]:opacity-100
          `,
          children: /* @__PURE__ */ n(
            "span",
            {
              className: `
              ${u.dot}
              rounded-full opacity-0
              transition-opacity [transition-duration:var(--duration-fast)]
              ${r ? "bg-white" : "bg-[var(--button-primary-text)]"}
            `
            }
          )
        }
      )
    ] });
    return /* @__PURE__ */ n("div", { className: `flex items-center gap-2 ${c}`, children: /* @__PURE__ */ w(
      "label",
      {
        className: `inline-flex items-center gap-2 font-mono ${o ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`,
        children: [
          h,
          k && /* @__PURE__ */ n("span", { className: `${u.label} text-[var(--text-primary)]`, children: t })
        ]
      }
    ) });
  }
);
vr.displayName = "Radio";
const yr = O(
  ({
    size: e = "medium",
    error: t = !1,
    helperText: r,
    errorMessage: o,
    disabled: a = !1,
    className: s = "",
    label: i,
    id: c,
    "aria-describedby": l,
    ...d
  }, m) => {
    const u = Ne({ error: t, helperText: r, errorMessage: o, describedBy: l }), g = u.invalid, x = le(), y = c ?? (i != null && i !== "" ? x : void 0), k = `
      w-full
      font-mono text-sm
      transition-colors [transition-duration:var(--duration-fast)]
      placeholder:text-[var(--field-placeholder)]
      disabled:cursor-not-allowed disabled:opacity-50
      focus:outline-none
      resize-y
    `, h = {
      small: "min-h-8 px-3 py-1.5 plate-round",
      medium: "min-h-10 px-4 py-2.5 plate-round",
      large: "min-h-12 px-5 py-3.5 plate-round"
    }, $ = g ? "bg-[var(--field-background-error)] text-[var(--text-primary)]" : "bg-[var(--field-background)] text-[var(--text-primary)]", E = /* @__PURE__ */ n(
      "div",
      {
        className: `w-full plate-round p-px transition-colors [transition-duration:var(--duration-fast)] ${g ? "bg-[var(--field-border-error)]" : "bg-[var(--field-border)] hover:bg-[var(--field-border-hover)] focus-within:!bg-[var(--field-border-focus)]"}`,
        children: /* @__PURE__ */ n(
          "textarea",
          {
            ref: m,
            id: y,
            disabled: a,
            "aria-invalid": g || void 0,
            "aria-describedby": u.describedBy,
            className: `${k} ${h[e]} ${$} ${s}`,
            ...d
          }
        )
      }
    ), I = i != null && i !== "";
    return !I && !u.hasMessage ? E : /* @__PURE__ */ w("div", { className: "w-full space-y-1", children: [
      I && /* @__PURE__ */ n(
        "label",
        {
          htmlFor: y,
          className: "block font-mono text-sm text-secondary-800 dark:text-secondary-200",
          children: i
        }
      ),
      E,
      /* @__PURE__ */ n($e, { ...u.message })
    ] });
  }
);
yr.displayName = "Textarea";
const dt = O(
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
    }[r], g = () => {
      !s && t && t(!e);
    }, x = (y) => {
      (y.key === " " || y.key === "Enter") && (y.preventDefault(), !s && t && t(!e));
    };
    return /* @__PURE__ */ w("div", { className: `flex items-center gap-3 ${c}`, children: [
      /* @__PURE__ */ n(
        "button",
        {
          ref: d,
          type: "button",
          role: "switch",
          "aria-checked": e,
          "aria-label": o || (e ? "On" : "Off"),
          disabled: s,
          onClick: g,
          onKeyDown: x,
          className: `
            group relative inline-flex shrink-0
            before:content-[''] before:absolute before:inset-x-0 before:top-1/2 before:-translate-y-1/2 before:h-11
            focus:outline-none
            ${s ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `,
          ...l,
          children: /* @__PURE__ */ n(
            "span",
            {
              "aria-hidden": "true",
              className: `
              relative inline-flex items-center
              ${u.track}
              plate-round
              transition-colors [transition-duration:var(--duration-normal)]
              group-focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]
              ${e ? "bg-[var(--button-primary-background)]" : "bg-secondary-300 dark:bg-secondary-700"}
            `,
              children: /* @__PURE__ */ n(
                "span",
                {
                  className: `
              inline-flex items-center justify-center
              ${u.knob}
              plate-round
              bg-[var(--field-background)]
              shadow-none
              transform transition-transform [transition-duration:var(--duration-normal)]
            `,
                  style: {
                    transform: u.knobTranslate
                  },
                  children: i && /* @__PURE__ */ n("span", { className: u.iconSize, children: i })
                }
              )
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
dt.displayName = "Switch";
function qr({
  trigger: e,
  items: t,
  align: r = "left",
  label: o = "Actions",
  size: a = "medium"
}) {
  const [s, i] = U(!1), [c, l] = U(-1), d = X(null), m = X(null), u = () => {
    i(!s), s || l(-1);
  }, g = () => {
    i(!1), l(-1);
  }, x = (S) => {
    S.disabled || (S.onClick(), g());
  };
  j(() => {
    function S(E) {
      d.current && !d.current.contains(E.target) && g();
    }
    if (s)
      return document.addEventListener("mousedown", S), () => {
        document.removeEventListener("mousedown", S);
      };
  }, [s]), j(() => {
    function S(E) {
      if (!s) return;
      const I = t.filter((R) => !R.disabled), T = c;
      switch (E.key) {
        case "Escape":
          E.preventDefault(), g();
          break;
        case "ArrowDown":
          E.preventDefault(), l((R) => {
            const z = R + 1;
            return z >= I.length ? 0 : z;
          });
          break;
        case "ArrowUp":
          E.preventDefault(), l((R) => {
            const z = R - 1;
            return z < 0 ? I.length - 1 : z;
          });
          break;
        case "Enter":
        case " ":
          E.preventDefault(), T >= 0 && T < I.length && x(I[T]);
          break;
      }
    }
    if (s)
      return document.addEventListener("keydown", S), () => {
        document.removeEventListener("keydown", S);
      };
  }, [s, c, t]), j(() => {
    if (c >= 0 && m.current) {
      const E = m.current.querySelectorAll('[role="menuitem"]')[c];
      E && E.scrollIntoView({ block: "nearest" });
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
  }[a], h = /* @__PURE__ */ w(
    "button",
    {
      onClick: u,
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
        o,
        /* @__PURE__ */ n("span", { className: `${k.icon} inline-flex items-center justify-center font-mono leading-none transition-transform [transition-duration:var(--duration-normal)] ${s ? "rotate-180" : ""}`, "aria-hidden": "true", children: "▼" })
      ]
    }
  );
  return /* @__PURE__ */ w("div", { ref: d, className: "relative inline-block", children: [
    e ? /* @__PURE__ */ n("div", { onClick: u, role: "button", tabIndex: 0, onKeyDown: (S) => {
      (S.key === "Enter" || S.key === " ") && (S.preventDefault(), u());
    }, children: e }) : h,
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
            ref: m,
            role: "menu",
            "aria-orientation": "vertical",
            className: `plate-round bg-[var(--surface-card)] ${k.menu}`,
            children: t.map((S, E) => {
              const I = S.variant === "destructive", T = S.disabled;
              return /* @__PURE__ */ w(
                "button",
                {
                  role: "menuitem",
                  disabled: T,
                  onClick: () => x(S),
                  className: `
                  w-full flex items-center gap-2
                  px-4 py-3
                  font-mono text-sm text-left
                  transition-colors [transition-duration:var(--duration-fast)]
                  ${T ? "opacity-50 cursor-not-allowed" : I ? "text-error-600 hover:bg-[var(--field-background-error)]" : "text-[var(--text-primary)] hover:bg-[var(--surface-subtle)]"}
                  ${c === E && !T ? "bg-[var(--surface-subtle)]" : ""}
                  ${k.menuItem}
                `,
                  children: [
                    /* @__PURE__ */ w("div", { className: "flex items-center gap-2 flex-1 min-w-0", children: [
                      S.icon && /* @__PURE__ */ n("span", { className: `inline-flex items-center justify-center ${k.icon} flex-shrink-0`, children: S.icon }),
                      /* @__PURE__ */ n("span", { className: "truncate", children: S.label })
                    ] }),
                    S.iconRight && /* @__PURE__ */ n("span", { className: `inline-flex items-center justify-center ${k.icon} flex-shrink-0 ml-auto`, children: S.iconRight })
                  ]
                },
                E
              );
            })
          }
        )
      }
    )
  ] });
}
const ye = "text-secondary-700 dark:text-secondary-600", we = "text-secondary-800 dark:text-secondary-500", wr = {
  background: "repeating-linear-gradient(45deg, var(--surface-subtle), var(--surface-subtle) 8px, var(--surface-muted) 8px, var(--surface-muted) 16px)"
}, ut = (e) => e === "wide" ? " [--csb-bw:min(calc(100%+240px),calc(100cqw-48px))] w-[var(--csb-bw)] ml-[calc((100%-var(--csb-bw))/2)]" : e === "full" ? " [--csb-bw:calc(100cqw-48px)] w-[var(--csb-bw)] ml-[calc((100%-var(--csb-bw))/2)]" : "";
function ze({
  aspect: e,
  caption: t,
  width: r
}) {
  return /* @__PURE__ */ w("figure", { className: `my-11${ut(r)}`, children: [
    /* @__PURE__ */ n("div", { className: "plate-round p-px bg-[var(--border-hairline)]", children: /* @__PURE__ */ n(
      "div",
      {
        className: "plate-round w-full",
        style: { aspectRatio: e ?? "16 / 9", ...wr }
      }
    ) }),
    t && /* @__PURE__ */ n("figcaption", { className: `mt-2 text-xs ${ye}`, children: t })
  ] });
}
function Ce({ title: e, text: t }) {
  return /* @__PURE__ */ w(ue, { children: [
    /* @__PURE__ */ n("div", { className: "text-[var(--text-primary)]", children: e }),
    /* @__PURE__ */ n("p", { className: `m-0 text-sm leading-relaxed ${we}`, children: t })
  ] });
}
function kr({ b: e }) {
  var t, r;
  switch (e.type) {
    case "meta":
      return /* @__PURE__ */ n("dl", { className: "mb-11 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(130px,1fr))]", children: e.items.map((o) => /* @__PURE__ */ w("div", { children: [
        /* @__PURE__ */ n("dt", { className: `text-xs uppercase tracking-[0.08em] ${ye}`, children: o.label }),
        /* @__PURE__ */ n("dd", { className: `m-0 mt-1 text-sm leading-normal ${we}`, children: o.value })
      ] }, o.label)) });
    case "headline":
      return /* @__PURE__ */ w("header", { className: "mb-7 mt-16 first:mt-0 sm:mt-24 sm:first:mt-0", children: [
        e.kicker && /* @__PURE__ */ n("div", { className: `text-xs first-letter:uppercase ${ye}`, children: e.kicker }),
        /* @__PURE__ */ n("h2", { className: "mt-2 text-xl text-[var(--text-primary)]", children: e.title }),
        e.text && /* @__PURE__ */ n("p", { className: `mt-3 text-base leading-relaxed ${we}`, children: e.text })
      ] });
    case "prose":
      return /* @__PURE__ */ n("p", { className: `my-7 text-base leading-relaxed ${we}`, children: e.text });
    case "image":
      return /* @__PURE__ */ n(ze, { aspect: e.aspect, caption: e.caption, width: e.width });
    case "imagePair":
      return /* @__PURE__ */ w("div", { className: `my-11 grid grid-cols-1 gap-3.5 sm:grid-cols-2${ut(e.width)}`, children: [
        /* @__PURE__ */ n(ze, { aspect: "4 / 3", caption: (t = e.captions) == null ? void 0 : t[0] }),
        /* @__PURE__ */ n(ze, { aspect: "4 / 3", caption: (r = e.captions) == null ? void 0 : r[1] })
      ] });
    case "callouts":
      return /* @__PURE__ */ n("div", { className: "my-11 grid gap-x-8 gap-y-7 [grid-template-columns:repeat(auto-fit,minmax(160px,1fr))]", children: e.items.map((o) => /* @__PURE__ */ n("div", { className: "grid row-span-2 gap-y-1.5 [grid-template-rows:subgrid]", children: /* @__PURE__ */ n(Ce, { title: o.title, text: o.text }) }, o.title)) });
    case "insights":
      return /* @__PURE__ */ n("ol", { className: "my-11 flex list-none flex-col gap-7 p-0", children: e.items.map((o, a) => /* @__PURE__ */ w("li", { className: "flex gap-3.5", children: [
        /* @__PURE__ */ n("span", { className: "flex-none text-sm leading-6 text-[var(--accent)]", children: String(a + 1).padStart(2, "0") }),
        /* @__PURE__ */ n("div", { children: /* @__PURE__ */ n(Ce, { title: o.title, text: o.text }) })
      ] }, o.title)) });
    case "quote":
      return /* @__PURE__ */ w("figure", { className: "my-11 m-0 text-lg leading-relaxed text-[var(--text-primary)]", children: [
        /* @__PURE__ */ n("span", { "aria-hidden": "true", className: "mb-2 block text-3xl leading-none text-[var(--accent)]", children: "“" }),
        /* @__PURE__ */ n("blockquote", { className: "m-0 p-0", children: e.text }),
        e.name && /* @__PURE__ */ w("figcaption", { className: "mt-4 flex items-center gap-3 text-sm", children: [
          /* @__PURE__ */ n(br, { size: "medium", src: e.image, alt: "" }),
          /* @__PURE__ */ w("span", { children: [
            /* @__PURE__ */ n("span", { className: "block text-[var(--text-primary)]", children: e.name }),
            e.role && /* @__PURE__ */ n("span", { className: `block text-xs ${ye}`, children: e.role })
          ] })
        ] })
      ] });
    case "list":
      return /* @__PURE__ */ n("ul", { className: "my-11 flex list-none flex-col gap-7 p-0", children: e.items.map((o) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(Ce, { title: o.title, text: o.text }) }, o.title)) });
  }
}
function Yr({
  blocks: e,
  className: t = ""
}) {
  return /* @__PURE__ */ n("div", { className: `font-mono ${t}`, children: e.map((r, o) => /* @__PURE__ */ n(kr, { b: r }, o)) });
}
const Nr = O(function({ meta: t, title: r, description: o, titleSuffix: a, thumb: s, thumbPosition: i = "start", selected: c = !1, className: l = "", ...d }, m) {
  const u = "as" in d && d.as ? d.as : null, g = u ? "as" : "href" in d && d.href != null ? "a" : "onClick" in d && d.onClick != null ? "button" : "div", x = `
    block w-full text-left p-3 plate-round
    transition-colors [transition-duration:var(--duration-fast)]
    font-mono
    ${g !== "div" ? "cursor-pointer hover:bg-[var(--surface-muted)] focus:outline-none focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-width)_var(--focus-ring-primary)]" : ""}
    ${c ? "bg-[var(--surface-muted)]" : ""}
    ${l}
  `, y = /* @__PURE__ */ w(ue, { children: [
    t && /* @__PURE__ */ n("span", { className: "block text-sm text-secondary-700 dark:text-secondary-600", children: t }),
    /* @__PURE__ */ w(
      "span",
      {
        className: `block text-base leading-6 ${g !== "div" ? "text-[var(--accent)]" : "text-[var(--text-primary)]"}`,
        children: [
          r,
          a && /* @__PURE__ */ n("span", { className: "ml-2 leading-none", children: a })
        ]
      }
    ),
    o && /* @__PURE__ */ n("span", { className: "mt-1 block text-sm leading-6 text-secondary-800 dark:text-secondary-500", children: o })
  ] }), k = s ? /* @__PURE__ */ w("span", { className: `flex items-start gap-4 ${i === "end" ? "flex-row-reverse" : ""}`, children: [
    /* @__PURE__ */ n("span", { className: "flex-shrink-0", children: s }),
    /* @__PURE__ */ n("span", { className: "block min-w-0 flex-1", children: y })
  ] }) : y;
  if (u) {
    const { asProps: h } = d;
    return /* @__PURE__ */ n(u, { ref: m, className: x, ...h, children: k });
  }
  if (g === "a") {
    const { href: h, ...$ } = d;
    return /* @__PURE__ */ n("a", { ref: m, href: h, className: x, ...$, children: k });
  }
  if (g === "button") {
    const { onClick: h, ...$ } = d;
    return /* @__PURE__ */ n("button", { ref: m, type: "button", onClick: h, className: x, ...$, children: k });
  }
  return /* @__PURE__ */ n("div", { ref: m, className: x, children: k });
});
Nr.displayName = "ListRow";
const $r = O(function({ variant: t = "inline", external: r = !1, className: o = "", children: a, ...s }, i) {
  const c = F(
    "font-mono text-[var(--accent)] transition-colors [transition-duration:var(--duration-fast)] hover:text-[var(--text-link-hover)]",
    "focus:outline-none focus-visible:[outline:var(--focus-ring-width)_solid_var(--focus-ring-primary)] focus-visible:[outline-offset:var(--focus-ring-offset)]",
    t === "inline" ? "underline underline-offset-2" : "no-underline hover:underline focus-visible:underline",
    o
  ), l = /* @__PURE__ */ w(ue, { children: [
    a,
    r && /* @__PURE__ */ w(ue, { children: [
      /* @__PURE__ */ n(ct, { name: "ExternalLink", size: "3", className: "ml-1" }),
      /* @__PURE__ */ n("span", { className: "sr-only", children: " (opens in new tab)" })
    ] })
  ] });
  if ("as" in s && s.as) {
    const { as: x, asProps: y } = s;
    return /* @__PURE__ */ n(x, { ref: i, className: c, ...y, children: l });
  }
  const { href: d, target: m, rel: u, ...g } = s;
  return /* @__PURE__ */ n(
    "a",
    {
      ref: i,
      href: d,
      className: c,
      target: r ? m ?? "_blank" : m,
      rel: r ? u ?? "noopener noreferrer" : u,
      ...g,
      children: l
    }
  );
});
$r.displayName = "Link";
function Sr({ children: e, onClick: t }) {
  const [r, o] = U(!1);
  return j(() => {
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
function Kr({ toasts: e, onDismiss: t }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "aria-live": "polite",
      className: "fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2",
      style: { zIndex: "var(--z-index-popover)" },
      children: e.map((r) => /* @__PURE__ */ n(Sr, { onClick: t ? () => t(r.id) : void 0, children: r.message }, r.id))
    }
  );
}
function Zr({ isOpen: e, onClose: t, ariaLabel: r, children: o }) {
  const [a, s] = U(e);
  j(() => {
    e && s(!0);
  }, [e]);
  const i = a && !e;
  return j(() => {
    if (!e) return;
    const c = (l) => {
      l.key === "Escape" && t();
    };
    return document.addEventListener("keydown", c), () => document.removeEventListener("keydown", c);
  }, [e, t]), j(() => (e ? document.body.style.overflow = "hidden" : document.body.style.overflow = "unset", () => {
    document.body.style.overflow = "unset";
  }), [e]), a ? /* @__PURE__ */ w(ue, { children: [
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
        children: /* @__PURE__ */ w("div", { className: "plate-round-lg-top bg-[var(--surface-card)] px-5 pb-6 pt-2.5 flex flex-col items-center gap-3 max-h-[70vh]", children: [
          /* @__PURE__ */ n("div", { className: "w-9 h-1 bg-[var(--surface-container-stroke)]", "aria-hidden": "true" }),
          /* @__PURE__ */ n("div", { className: "w-full overflow-y-auto", tabIndex: 0, children: o })
        ] })
      }
    )
  ] }) : null;
}
function Jr() {
  const { theme: e, setTheme: t } = vt(), [r, o] = U(!1);
  if (j(() => {
    o(!0);
  }, []), !r)
    return /* @__PURE__ */ w("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ n("div", { className: "w-11 h-6 rounded-none bg-[var(--field-border)]" }),
      /* @__PURE__ */ n("span", { className: "text-sm font-mono text-[var(--text-secondary)]", children: "Theme" })
    ] });
  const a = e === "dark";
  return /* @__PURE__ */ w("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ n(
      dt,
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
const mt = We(null);
function Pe(e) {
  const t = Ae(mt);
  if (!t)
    throw new Error(`[@scorp-ds/components] ${e} must be used inside <Tabs>.`);
  return t;
}
function Qr({
  value: e,
  defaultValue: t,
  onValueChange: r,
  children: o,
  className: a
}) {
  const s = e !== void 0, [i, c] = U(() => t ?? ""), l = s ? e : i, d = le().replace(/:/g, ""), m = X([]), u = He(
    (x) => {
      s || c(x), r == null || r(x);
    },
    [s, r]
  ), g = ht(
    () => ({
      value: l,
      onValueChange: u,
      baseId: d,
      listValuesRef: m,
      isControlled: s
    }),
    [l, u, d, s]
  );
  return /* @__PURE__ */ n(mt.Provider, { value: g, children: /* @__PURE__ */ n("div", { className: F("w-full", a), children: o }) });
}
function Ir(e) {
  const t = [];
  return Le.Children.forEach(e, (r) => {
    if (!Le.isValidElement(r)) return;
    if (r.type.displayName === "TabsTrigger") {
      const a = r.props.value;
      typeof a == "string" && t.push(a);
    }
  }), t;
}
function Tr({
  children: e,
  className: t,
  "aria-label": r,
  "aria-labelledby": o
}) {
  const { value: a, isControlled: s, onValueChange: i, listValuesRef: c } = Pe("TabsList"), l = Ir(e);
  c.current = l;
  const d = l.join("\0");
  return xt(() => {
    const m = c.current;
    s || m.length === 0 || m.includes(a) || i(m[0]);
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
Tr.displayName = "TabsList";
const zr = O(function({ value: t, children: r, className: o, disabled: a, onKeyDown: s, onClick: i, type: c = "button", ...l }, d) {
  const { value: m, onValueChange: u, baseId: g, listValuesRef: x } = Pe("TabsTrigger"), y = m === t, k = `${g}-tab-${t}`, h = `${g}-panel-${t}`, $ = (I) => {
    u(I), requestAnimationFrame(() => {
      var T;
      (T = document.getElementById(`${g}-tab-${I}`)) == null || T.focus();
    });
  }, S = (I) => {
    const T = x.current, R = T.indexOf(t);
    if (R < 0) return;
    const z = T[(R + I + T.length) % T.length];
    $(z);
  }, E = (I) => {
    if (s == null || s(I), I.defaultPrevented || a) return;
    const T = x.current;
    switch (I.key) {
      case "ArrowRight":
      case "ArrowDown":
        I.preventDefault(), S(1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        I.preventDefault(), S(-1);
        break;
      case "Home":
        I.preventDefault(), T[0] && $(T[0]);
        break;
      case "End":
        I.preventDefault(), T.length && $(T[T.length - 1]);
        break;
    }
  };
  return /* @__PURE__ */ n(
    "button",
    {
      ref: d,
      type: c,
      role: "tab",
      id: k,
      "aria-selected": y,
      "aria-controls": h,
      tabIndex: y ? 0 : -1,
      disabled: a,
      className: F(
        "-mb-px rounded-none border-b-2 px-4 py-2 font-mono text-sm transition-colors [transition-duration:var(--duration-normal)]",
        y ? "border-[var(--button-primary-background)] bg-transparent text-[var(--text-primary)]" : "border-transparent text-secondary-700 hover:text-[var(--text-primary)] dark:text-secondary-300",
        a && "cursor-not-allowed opacity-50",
        o
      ),
      onClick: (I) => {
        i == null || i(I), !I.defaultPrevented && !a && u(t);
      },
      onKeyDown: E,
      ...l,
      children: r
    }
  );
});
zr.displayName = "TabsTrigger";
function Cr({ value: e, children: t, className: r, forceMount: o = !1 }) {
  const { value: a, baseId: s } = Pe("TabsContent"), i = a === e, c = `${s}-tab-${e}`, l = `${s}-panel-${e}`;
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
Cr.displayName = "TabsContent";
const ft = {
  compact: "px-3 py-2",
  // 12 / 8
  comfortable: "px-4 py-3",
  // 16 / 12
  spacious: "px-5 py-4"
  // 20 / 16
}, je = We("compact"), Er = O(function({ className: t, striped: r, bordered: o, density: a = "compact", children: s, ...i }, c) {
  const l = /* @__PURE__ */ n(je.Provider, { value: a, children: /* @__PURE__ */ n(
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
Er.displayName = "Table";
const Ar = O(function({ className: t, ...r }, o) {
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
Ar.displayName = "TableHeader";
const Rr = O(function({ className: t, ...r }, o) {
  return /* @__PURE__ */ n("tbody", { ref: o, className: F(t), ...r });
});
Rr.displayName = "TableBody";
const _r = O(function({ className: t, ...r }, o) {
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
_r.displayName = "TableFooter";
const Pr = O(function({ className: t, ...r }, o) {
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
Pr.displayName = "TableRow";
const jr = O(function({ className: t, scope: r = "col", ...o }, a) {
  const s = Ae(je);
  return /* @__PURE__ */ n(
    "th",
    {
      ref: a,
      scope: r,
      className: F(
        ft[s],
        "text-left font-semibold text-[var(--text-primary)]",
        t
      ),
      ...o
    }
  );
});
jr.displayName = "TableHead";
const Lr = O(function({ className: t, ...r }, o) {
  const a = Ae(je);
  return /* @__PURE__ */ n(
    "td",
    {
      ref: o,
      className: F(
        ft[a],
        "align-middle text-secondary-800 dark:text-secondary-200",
        t
      ),
      ...r
    }
  );
});
Lr.displayName = "TableCell";
const Dr = {
  none: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  6: "gap-6",
  8: "gap-8"
};
function eo({ children: e, gap: t = "4", className: r, axis: o = "vertical" }) {
  return /* @__PURE__ */ n(
    "div",
    {
      className: F(
        "flex",
        o === "vertical" ? "flex-col" : "flex-row flex-wrap items-center",
        Dr[t],
        r
      ),
      children: e
    }
  );
}
function to({ children: e, ...t }) {
  return /* @__PURE__ */ n(
    yt,
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
  br as Avatar,
  Ur as Badge,
  Zr as BottomSheet,
  Xe as Button,
  Gr as Card,
  Yr as CaseStudyBlocks,
  hr as Checkbox,
  Wr as Divider,
  qr as Dropdown,
  wt as Input,
  $r as Link,
  Nr as ListRow,
  Vr as Modal,
  vr as Radio,
  gr as Select,
  xr as Slider,
  eo as Stack,
  dt as Switch,
  Fr as TUI_ICON_GLYPHS,
  Er as Table,
  Rr as TableBody,
  Lr as TableCell,
  _r as TableFooter,
  jr as TableHead,
  Ar as TableHeader,
  Pr as TableRow,
  Qr as Tabs,
  Cr as TabsContent,
  Tr as TabsList,
  zr as TabsTrigger,
  yr as Textarea,
  to as ThemeProvider,
  Jr as ThemeToggle,
  Sr as Toast,
  Kr as Toaster,
  Xr as Tooltip,
  ct as TuiIcon,
  F as cn
};
//# sourceMappingURL=index.esm.js.map

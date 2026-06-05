import { jsxs as z, jsx as i, Fragment as we } from "react/jsx-runtime";
import $e, { forwardRef as F, useEffect as B, useId as he, useState as W, useRef as K, useImperativeHandle as Je, createContext as Ze, useContext as Qe, useCallback as er, useMemo as rr, useLayoutEffect as tr } from "react";
import { useTheme as or, ThemeProvider as nr } from "next-themes";
const sr = F(
  ({
    variant: e = "primary",
    size: r = "medium",
    disabled: t = !1,
    className: o = "",
    children: n,
    iconLeft: s,
    iconRight: a,
    "aria-label": c,
    "aria-labelledby": l,
    ...d
  }, m) => {
    const g = `
      inline-flex items-center justify-center
      font-mono text-sm
      transition-colors [transition-duration:var(--duration-normal)]
      cursor-pointer
      disabled:cursor-not-allowed disabled:opacity-50
      focus:outline-none
    `, y = () => e === "icon" ? !0 : !n || typeof n == "string" || typeof n == "number" ? !1 : typeof n == "object" && n !== null && "type" in n ? typeof n.type < "u" : Array.isArray(n) ? n.every(
      (h) => typeof h == "object" && h !== null && "type" in h
    ) : !1;
    B(() => {
      if (process.env.NODE_ENV === "production" || !(e === "icon" || y())) return;
      c != null && String(c).trim() !== "" || l != null && String(l).trim() !== "" || console.warn(
        "[@scorp-ds/components] Button: icon-only buttons should include aria-label or aria-labelledby for screen readers."
      );
    }, [e, r, n, s, a, c, l]);
    const v = () => {
      if (y() || e === "icon")
        switch (r) {
          case "small":
            return "h-8 w-8 rounded-none";
          case "large":
            return "h-12 w-12 rounded-none";
          case "icon":
            return "h-10 w-10 rounded-none";
          default:
            return "h-10 w-10 rounded-none";
        }
      switch (r) {
        case "small":
          return "h-8 px-4 py-1.5 rounded-none";
        case "large":
          return "h-12 px-6 py-3.5 rounded-none";
        case "icon":
          return "h-10 w-10 rounded-none";
        default:
          return "h-10 px-5 py-2.5 rounded-none";
      }
    }, A = {
      primary: `
        bg-[var(--button-primary-background)] hover:bg-[var(--button-primary-background-hover)] active:brightness-95
        text-[var(--button-primary-text)]
        focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--focus-offset-color)]
      `,
      secondary: `
        bg-[var(--button-secondary-background)] hover:bg-[var(--button-secondary-background-hover)] active:brightness-95
        text-[var(--button-secondary-text)]
        focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--focus-offset-color)]
      `,
      ghost: `
        bg-[var(--button-ghost-background)] hover:bg-[var(--button-ghost-background-hover)] active:brightness-95
        text-[var(--button-ghost-text)]
        focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--focus-offset-color)]
      `,
      link: `
        bg-transparent hover:underline
        text-[var(--button-link-text)] hover:text-[var(--button-link-text-hover)]
        focus-visible:underline
      `,
      outline: `
        border border-[var(--button-outline-border)]
        bg-[var(--button-outline-background)] hover:bg-[var(--button-outline-background-hover)] active:brightness-95
        text-[var(--button-outline-text)]
        focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--focus-offset-color)]
      `,
      destructive: `
        bg-[var(--button-destructive-background)] hover:bg-[var(--button-destructive-background-hover)] active:brightness-95
        text-[var(--button-destructive-text)]
        focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--focus-offset-color)]
      `,
      icon: `
        bg-[var(--button-icon-background)] hover:bg-[var(--button-icon-background-hover)] active:brightness-95
        text-[var(--button-icon-text)]
        disabled:bg-[var(--button-icon-disabled-background)] disabled:text-[var(--button-icon-disabled-text)]
        focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--focus-offset-color)]
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
    }, I = {
      small: "gap-1.5",
      // 6px - tighter for visual balance in compact buttons
      medium: "gap-2",
      // 8px - standard spacing
      large: "gap-2.5",
      // 10px - more breathing room for larger buttons
      icon: "gap-0"
      // No gap for icon-only
    }, E = (h) => h ? typeof h == "object" && h !== null && "type" in h ? /* @__PURE__ */ i("span", { className: `inline-flex items-center justify-center shrink-0 ${S[r]}`, children: h }) : h : null, x = () => {
      if (y() && n) {
        const w = r === "icon" ? "medium" : r;
        return typeof n == "object" && n !== null && "type" in n ? /* @__PURE__ */ i("span", { className: `inline-flex items-center justify-center shrink-0 ${S[w]}`, children: n }) : /* @__PURE__ */ i("span", { className: `inline-flex items-center justify-center shrink-0 ${S[w]}`, children: n });
      }
      return n;
    }, $ = {
      "--tw-ring-color": e === "primary" || e === "link" ? "var(--focus-ring-primary)" : e === "destructive" ? "var(--focus-ring-destructive)" : e === "icon" ? "var(--focus-ring-icon)" : "var(--focus-ring-secondary)",
      outline: "none"
    };
    return /* @__PURE__ */ z(
      "button",
      {
        ref: m,
        disabled: t,
        className: `${g} ${v()} ${A[e]} ${I[r]} ${o}`,
        style: $,
        "aria-label": c,
        "aria-labelledby": l,
        ...d,
        children: [
          s && E(s),
          x(),
          a && E(a)
        ]
      }
    );
  }
);
sr.displayName = "Button";
const ar = F(
  ({
    size: e = "medium",
    error: r = !1,
    disabled: t = !1,
    className: o = "",
    label: n,
    id: s,
    ...a
  }, c) => {
    const l = he(), d = s ?? (n != null && n !== "" ? l : void 0), m = `
      w-full
      font-mono text-sm
      border
      transition-all [transition-duration:var(--duration-normal)]
      placeholder:text-[var(--field-placeholder)]
      disabled:cursor-not-allowed disabled:opacity-50
      focus:outline-none
    `, g = {
      small: "h-8 px-3 py-1.5 rounded-none",
      // TUI: sharp corners
      medium: "h-10 px-4 py-2.5 rounded-none",
      // TUI: sharp corners
      large: "h-12 px-5 py-3.5 rounded-none"
      // TUI: sharp corners
    }, y = r ? `
        border-[var(--field-border-error)]
        bg-[var(--field-background-error)]
        text-[var(--text-primary)]
        focus:ring-2 focus:ring-[var(--focus-ring-error)]
        focus:ring-offset-2 focus:ring-offset-[var(--focus-offset-color)]
        focus:border-[var(--field-border-error)]
      ` : `
        border-[var(--field-border)] hover:border-[var(--field-border-hover)]
        bg-[var(--field-background)] text-[var(--text-primary)]
        focus:ring-2 focus:ring-[var(--focus-ring-primary)]
        focus:ring-offset-2 focus:ring-offset-[var(--focus-offset-color)]
      `, v = /* @__PURE__ */ i(
      "input",
      {
        ref: c,
        id: d,
        disabled: t,
        className: `${m} ${g[e]} ${y} ${o}`,
        ...a
      }
    );
    return n == null || n === "" ? v : /* @__PURE__ */ z("div", { className: "w-full space-y-1", children: [
      /* @__PURE__ */ i(
        "label",
        {
          htmlFor: d,
          className: "block font-mono text-sm text-secondary-800 dark:text-secondary-200",
          children: n
        }
      ),
      v
    ] });
  }
);
ar.displayName = "Input";
function gt({ isOpen: e, onClose: r, title: t, children: o }) {
  return B(() => {
    const n = (s) => {
      s.key === "Escape" && r();
    };
    return e && document.addEventListener("keydown", n), () => {
      document.removeEventListener("keydown", n);
    };
  }, [e, r]), B(() => (e ? document.body.style.overflow = "hidden" : document.body.style.overflow = "unset", () => {
    document.body.style.overflow = "unset";
  }), [e]), e ? /* @__PURE__ */ i(we, { children: /* @__PURE__ */ i(
    "div",
    {
      className: "fixed inset-0 flex items-center justify-center p-5 animate-in fade-in bg-[var(--surface-overlay)]",
      style: { zIndex: "var(--z-index-modal)", animationDuration: "var(--duration-normal)" },
      onClick: r,
      children: /* @__PURE__ */ z(
        "div",
        {
          className: "w-[740px] max-h-[80vh] bg-[var(--surface-card)] rounded-none flex flex-col overflow-hidden",
          style: {
            boxShadow: "var(--elevation-2-shadow)",
            border: "0.5px solid var(--elevation-2-border)"
          },
          onClick: (n) => n.stopPropagation(),
          children: [
            /* @__PURE__ */ z("div", { className: "flex items-center justify-between px-8 py-6 border-b-[0.5px] border-solid border-[var(--surface-container-stroke)]", children: [
              /* @__PURE__ */ z("h2", { className: "text-base font-mono text-[var(--text-primary)] font-medium flex items-center gap-0 flex-1 min-w-0", children: [
                /* @__PURE__ */ i("span", { className: "whitespace-pre text-secondary-600 dark:text-secondary-400", "aria-hidden": "true", children: "╔══ " }),
                /* @__PURE__ */ i("span", { className: "truncate", children: t }),
                /* @__PURE__ */ i("span", { className: "ml-1 flex-1 overflow-hidden whitespace-nowrap text-secondary-600 dark:text-secondary-400", "aria-hidden": "true", children: "═".repeat(80) }),
                /* @__PURE__ */ i("span", { className: "whitespace-pre text-secondary-600 dark:text-secondary-400", "aria-hidden": "true", children: " ══╗" })
              ] }),
              /* @__PURE__ */ i(
                "button",
                {
                  type: "button",
                  onClick: r,
                  className: "ml-4 font-mono text-sm leading-none text-secondary-700 transition-colors [transition-duration:var(--duration-normal)] hover:text-error-700 dark:text-secondary-300 dark:hover:text-error-400",
                  "aria-label": "Close modal",
                  children: "[x]"
                }
              )
            ] }),
            /* @__PURE__ */ i("div", { className: "overflow-y-auto px-8 py-6", tabIndex: 0, children: o })
          ]
        }
      )
    }
  ) }) : null;
}
function ht({
  title: e,
  subtitle: r,
  headerContent: t,
  children: o,
  footerContent: n,
  className: s = ""
}) {
  const a = s.includes("flex");
  return /* @__PURE__ */ z(
    "div",
    {
      className: `
        bg-[var(--surface-card)]
        border-[0.5px] border-solid border-[var(--surface-container-stroke)]
        rounded-none
        overflow-visible
        ${a ? "flex flex-col" : ""}
        ${s}
      `,
      children: [
        (e || r || t) && /* @__PURE__ */ i("div", { className: "p-4 lg:p-6 border-b-[0.5px] border-solid border-[var(--surface-container-stroke)] overflow-hidden rounded-none", children: t || /* @__PURE__ */ z("div", { children: [
          e && /* @__PURE__ */ z("h3", { className: "text-base font-mono font-bold text-[var(--text-primary)] mb-1 flex items-center gap-0", children: [
            /* @__PURE__ */ i("span", { className: "text-secondary-600 dark:text-secondary-400 whitespace-pre", "aria-hidden": "true", children: "┌── " }),
            e,
            /* @__PURE__ */ i("span", { className: "text-secondary-600 dark:text-secondary-400 ml-1 flex-1 overflow-hidden whitespace-nowrap", "aria-hidden": "true", children: "─".repeat(80) }),
            /* @__PURE__ */ i("span", { className: "text-secondary-600 dark:text-secondary-400 whitespace-pre", "aria-hidden": "true", children: " ──┐" })
          ] }),
          r && /* @__PURE__ */ i("p", { className: "pl-[3ch] font-mono text-sm text-secondary-800 dark:text-secondary-300", children: r })
        ] }) }),
        /* @__PURE__ */ i("div", { className: `p-4 lg:p-6 ${a ? "flex-1 flex flex-col min-h-0" : ""}`, children: o }),
        n && /* @__PURE__ */ i("div", { className: "p-4 lg:p-6 border-t-[0.5px] border-solid border-[var(--surface-container-stroke)] bg-[var(--surface-subtle)] overflow-hidden rounded-none", children: n })
      ]
    }
  );
}
function xt({
  variant: e = "default",
  size: r = "medium",
  children: t,
  iconLeft: o,
  onClose: n,
  className: s = ""
}) {
  const a = {
    small: "h-5 px-2 py-1 text-xs",
    // h-5 = 20px, px-2 = 8px, text-xs = 12px
    medium: "h-6 px-2.5 py-1 text-xs",
    // h-6 = 24px, px-2.5 = 10px, text-xs = 12px
    large: "h-7 px-3 py-1.5 text-sm"
    // h-7 = 28px, px-3 = 12px, text-sm = 14px
  }, c = {
    default: `
      bg-transparent
      text-secondary-800 dark:text-secondary-200
    `,
    primary: `
      bg-transparent
      text-primary-800 dark:text-primary-300
    `,
    success: `
      bg-transparent
      text-success-800 dark:text-success-300
    `,
    warning: `
      bg-transparent
      text-warning-800 dark:text-warning-300
    `,
    error: `
      bg-transparent
      text-error-800 dark:text-error-300
    `,
    info: `
      bg-transparent
      text-info-800 dark:text-info-300
    `
  }, l = {
    small: "w-3 h-3",
    // 12px
    medium: "w-3.5 h-3.5",
    // 14px
    large: "w-4 h-4"
    // 16px
  };
  return /* @__PURE__ */ z(
    "span",
    {
      className: `
        inline-flex items-center gap-1.5
        font-mono font-medium
        rounded-none
        ${a[r]}
        ${c[e]}
        ${s}
      `,
      children: [
        o && /* @__PURE__ */ i("span", { className: `inline-flex items-center justify-center ${l[r]} flex-shrink-0`, children: o }),
        /* @__PURE__ */ z("span", { className: "inline-flex items-center", children: [
          /* @__PURE__ */ i("span", { "aria-hidden": "true", children: "[" }),
          t,
          /* @__PURE__ */ i("span", { "aria-hidden": "true", children: "]" })
        ] }),
        n && /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            onClick: (d) => {
              d.stopPropagation(), n();
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
function vt({
  variant: e = "default",
  title: r,
  description: t,
  iconLeft: o,
  onClose: n,
  className: s = ""
}) {
  const c = o || /* @__PURE__ */ i("span", { className: "font-mono text-sm font-bold whitespace-nowrap", children: {
    default: "[i]",
    success: "[ok]",
    warning: "[!!]",
    error: "[ERR]",
    info: "[i]"
  }[e] }), d = {
    // Default: neutral semantic surfaces (surface + border roles)
    default: {
      container: `
        bg-[var(--surface-subtle)]
        border-[var(--border-default)]
      `,
      icon: "text-secondary-800 dark:text-secondary-300",
      title: "text-[var(--text-primary)]",
      description: "text-secondary-800 dark:text-secondary-300"
    },
    // Success: Green for positive states
    success: {
      container: `
        bg-success-50 dark:bg-success-950
        border-success-300 dark:border-success-700
      `,
      icon: "text-success-800 dark:text-success-400",
      title: "text-success-900 dark:text-success-50",
      description: "text-success-900 dark:text-success-300"
    },
    // Warning: Purple for warnings
    warning: {
      container: `
        bg-warning-50 dark:bg-warning-950
        border-warning-300 dark:border-warning-700
      `,
      icon: "text-warning-800 dark:text-warning-400",
      title: "text-warning-900 dark:text-warning-50",
      description: "text-warning-900 dark:text-warning-300"
    },
    // Error: Red for errors
    error: {
      container: `
        bg-error-50 dark:bg-error-950
        border-error-300 dark:border-error-700
      `,
      icon: "text-error-700 dark:text-error-400",
      title: "text-error-900 dark:text-error-50",
      description: "text-error-900 dark:text-error-300"
    },
    // Info: Blue for informational messages
    info: {
      container: `
        bg-info-50 dark:bg-info-950
        border-info-300 dark:border-info-700
      `,
      icon: "text-info-800 dark:text-info-400",
      title: "text-info-900 dark:text-info-50",
      description: "text-info-900 dark:text-info-300"
    }
  }[e];
  return /* @__PURE__ */ z(
    "div",
    {
      role: "alert",
      className: `
        flex items-start gap-3
        p-4
        border border-solid rounded-none
        ${d.container}
        ${s}
      `,
      children: [
        c && /* @__PURE__ */ i("div", { className: `flex-shrink-0 ${d.icon}`, children: c }),
        /* @__PURE__ */ z("div", { className: "flex-1 min-w-0", children: [
          r && /* @__PURE__ */ i("h4", { className: `font-mono text-sm font-bold mb-1 ${d.title}`, children: r }),
          t && /* @__PURE__ */ i("div", { className: `font-mono text-sm ${d.description}`, children: t })
        ] }),
        n && /* @__PURE__ */ i(
          "button",
          {
            onClick: n,
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
  );
}
function yt({
  src: e,
  alt: r,
  initials: t,
  icon: o,
  size: n = "medium",
  status: s,
  className: a = "",
  onError: c
}) {
  const [l, d] = W(!1), g = {
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
  }[n], y = () => {
    d(!0), c && c();
  }, v = e && !l, A = !v && t, S = !v && !A && o, I = !v && !A && !S, E = {
    online: "bg-success-600 dark:bg-success-500",
    offline: "bg-secondary-500 dark:bg-secondary-600",
    away: "bg-warning-600 dark:bg-warning-500"
  };
  return /* @__PURE__ */ z("div", { className: `relative inline-block ${g.container} ${a}`, children: [
    /* @__PURE__ */ z(
      "div",
      {
        className: `
          ${g.container}
          rounded-none
          overflow-hidden
          flex items-center justify-center
          bg-secondary-200 dark:bg-secondary-800
          text-secondary-900 dark:text-secondary-50
          font-mono font-bold
          ${g.text}
        `,
        children: [
          v && /* @__PURE__ */ i(
            "img",
            {
              src: e,
              alt: r || "Avatar",
              className: "w-full h-full object-cover",
              onError: y
            }
          ),
          A && /* @__PURE__ */ i("span", { className: "select-none", children: t }),
          S && /* @__PURE__ */ i("div", { className: `${g.icon} text-secondary-700 dark:text-secondary-300`, children: o }),
          I && /* @__PURE__ */ i("span", { className: `${g.icon} inline-flex items-center justify-center font-mono font-bold text-secondary-900 dark:text-secondary-100`, "aria-hidden": "true", children: "@" })
        ]
      }
    ),
    s && /* @__PURE__ */ i(
      "span",
      {
        role: "img",
        className: `
            absolute block
            ${g.statusOffset}
            ${g.status}
            ${E[s]}
            rounded-none
            border-2 border-[var(--field-background)]
          `,
        "aria-label": `Status: ${s}`
      }
    )
  ] });
}
function wt({
  variant: e = "horizontal",
  text: r,
  spacing: t = "medium",
  className: o = ""
}) {
  const n = {
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
  return e === "horizontal" ? /* @__PURE__ */ i(
    "div",
    {
      className: `
          w-full
          border-t border-solid
          ${s}
          ${n[t]}
          ${o}
        `,
      role: "separator",
      "aria-orientation": "horizontal"
    }
  ) : e === "vertical" ? /* @__PURE__ */ i(
    "div",
    {
      className: `
          h-full
          border-l border-solid
          ${s}
          ${n[t]}
          ${o}
        `,
      role: "separator",
      "aria-orientation": "vertical"
    }
  ) : e === "withText" && r ? /* @__PURE__ */ z(
    "div",
    {
      className: `
          flex items-center
          w-full
          ${n[t]}
          ${o}
        `,
      role: "separator",
      "aria-label": typeof r == "string" ? r : void 0,
      children: [
        /* @__PURE__ */ i("span", { className: "flex-1 overflow-hidden whitespace-nowrap font-mono text-term-dim leading-none select-none", "aria-hidden": "true", children: "─".repeat(80) }),
        /* @__PURE__ */ i("span", { className: "px-2 font-mono text-xs text-term-dim whitespace-nowrap", children: r }),
        /* @__PURE__ */ i("span", { className: "flex-1 overflow-hidden whitespace-nowrap font-mono text-term-dim leading-none select-none", "aria-hidden": "true", children: "─".repeat(80) })
      ]
    }
  ) : /* @__PURE__ */ i(
    "div",
    {
      className: `
        w-full
        border-t border-solid
        ${s}
        ${n[t]}
        ${o}
      `,
      role: "separator",
      "aria-orientation": "horizontal"
    }
  );
}
function kt({
  content: e,
  children: r,
  position: t = "top",
  delay: o = 200,
  maxWidth: n = "200px",
  className: s = ""
}) {
  const [a, c] = W(!1), [l, d] = W(!1), m = K(null), g = K(null), y = K(null), v = () => {
    m.current && clearTimeout(m.current), m.current = setTimeout(() => {
      c(!0), setTimeout(() => d(!0), 50);
    }, o);
  }, A = () => {
    m.current && clearTimeout(m.current), c(!1), d(!1);
  };
  B(() => () => {
    m.current && clearTimeout(m.current);
  }, []);
  const S = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2"
  }, I = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-[var(--surface-card)] border-l-transparent border-r-transparent border-b-transparent border-4",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-[var(--surface-card)] border-l-transparent border-r-transparent border-t-transparent border-4",
    left: "left-full top-1/2 -translate-y-1/2 border-l-[var(--surface-card)] border-t-transparent border-b-transparent border-r-transparent border-4",
    right: "right-full top-1/2 -translate-y-1/2 border-r-[var(--surface-card)] border-t-transparent border-b-transparent border-l-transparent border-4"
  };
  return /* @__PURE__ */ z(
    "div",
    {
      ref: y,
      className: `relative inline-block ${s}`,
      onMouseEnter: v,
      onMouseLeave: A,
      children: [
        r,
        a && /* @__PURE__ */ z(
          "div",
          {
            ref: g,
            role: "tooltip",
            className: `
            absolute
            ${S[t]}
            z-[var(--z-index-tooltip)]
            ${l ? "opacity-100" : "opacity-0"}
            transition-opacity [transition-duration:var(--duration-fast)]
            pointer-events-none
          `,
            style: { maxWidth: n },
            children: [
              /* @__PURE__ */ i(
                "div",
                {
                  className: `
              bg-[var(--surface-card)]
              border-[0.5px] border-solid border-[var(--surface-container-stroke)]
              rounded-none
              px-3 py-2
              font-mono text-xs
              text-[var(--text-primary)]
              shadow-none
              whitespace-normal
            `,
                  style: {
                    boxShadow: "var(--elevation-2-shadow)"
                  },
                  children: e
                }
              ),
              /* @__PURE__ */ i(
                "div",
                {
                  className: `
              absolute
              ${I[t]}
            `,
                  style: {
                    filter: "none"
                  }
                }
              )
            ]
          }
        )
      ]
    }
  );
}
const ir = F(function({
  size: r = "medium",
  error: t = !1,
  disabled: o = !1,
  className: n = "",
  children: s,
  value: a,
  defaultValue: c,
  onChange: l,
  name: d,
  label: m,
  "aria-label": g,
  id: y,
  ...v
}, A) {
  var le;
  const S = he(), I = y ?? `${S}-trigger`, x = (() => {
    const T = [];
    if (Array.isArray(s))
      s.forEach((N) => {
        if (typeof N == "object" && N !== null && "props" in N) {
          const D = N.props;
          T.push({
            value: D.value || "",
            label: typeof D.children == "string" ? D.children : String(D.children || ""),
            disabled: D.disabled
          });
        }
      });
    else if (typeof s == "object" && s !== null && "props" in s) {
      const N = s.props;
      T.push({
        value: N.value || "",
        label: typeof N.children == "string" ? N.children : String(N.children || ""),
        disabled: N.disabled
      });
    }
    return T;
  })(), [$, h] = W(!1), [w, O] = W(-1), [M, b] = W(
    a !== void 0 ? String(a) : c !== void 0 ? String(c) : ((le = x[0]) == null ? void 0 : le.value) || ""
  ), P = K(null), ne = K(null), H = K(null);
  B(() => {
    a !== void 0 && (b(String(a)), H.current && (H.current.value = String(a)));
  }, [a]), Je(A, () => H.current);
  const J = x.find((T) => T.value === M), de = (J == null ? void 0 : J.label) || "", se = () => {
    o || (h(!$), $ || O(-1));
  }, U = () => {
    h(!1), O(-1);
  }, G = (T) => {
    a === void 0 && b(T), H.current && (H.current.value = T), l && l({
      target: { value: T, name: d },
      currentTarget: { value: T, name: d }
    }), U();
  };
  B(() => {
    function T(N) {
      P.current && !P.current.contains(N.target) && U();
    }
    if ($)
      return document.addEventListener("mousedown", T), () => {
        document.removeEventListener("mousedown", T);
      };
  }, [$]), B(() => {
    function T(N) {
      var j, q;
      if (!((j = P.current) != null && j.contains(N.target)) && !$)
        return;
      if (!$) {
        if ((N.key === "Enter" || N.key === " " || N.key === "ArrowDown" || N.key === "ArrowUp") && (q = P.current) != null && q.contains(N.target)) {
          N.preventDefault(), se();
          const C = x.filter((ae) => !ae.disabled).findIndex((ae) => ae.value === M);
          O(C >= 0 ? C : 0);
        }
        return;
      }
      const D = x.filter((_) => !_.disabled), R = w;
      switch (N.key) {
        case "Escape":
          N.preventDefault(), U();
          break;
        case "ArrowDown":
          N.preventDefault(), O((_) => {
            const C = _ + 1;
            return C >= D.length ? 0 : C;
          });
          break;
        case "ArrowUp":
          N.preventDefault(), O((_) => {
            const C = _ - 1;
            return C < 0 ? D.length - 1 : C;
          });
          break;
        case "Enter":
        case " ":
          N.preventDefault(), R >= 0 && R < D.length && G(D[R].value);
          break;
      }
    }
    return document.addEventListener("keydown", T), () => {
      document.removeEventListener("keydown", T);
    };
  }, [$, w, x, M]), B(() => {
    if (w >= 0 && ne.current) {
      const T = ne.current.querySelectorAll('[role="option"]');
      let N = 0, D = 0;
      for (let j = 0; j < T.length; j++)
        if (!x[j].disabled) {
          if (D === w) {
            N = j;
            break;
          }
          D++;
        }
      const R = T[N];
      R && R.scrollIntoView({ block: "nearest" });
    }
  }, [w, x]);
  const X = {
    small: {
      trigger: "h-8 pl-3 pr-7 py-1.5 rounded-none",
      // TUI: sharp corners
      menu: "rounded-none",
      menuItem: "",
      icon: "w-4 h-4"
    },
    medium: {
      trigger: "h-10 pl-4 pr-8 py-2.5 rounded-none",
      // TUI: sharp corners
      menu: "rounded-none",
      menuItem: "",
      icon: "w-5 h-5"
    },
    large: {
      trigger: "h-12 pl-5 pr-9 py-3.5 rounded-none",
      // TUI: sharp corners
      menu: "rounded-none",
      menuItem: "",
      icon: "w-6 h-6"
    }
  }[r], ie = t ? `
      border-[var(--field-border-error)]
      bg-[var(--field-background-error)]
      text-[var(--text-primary)]
      focus:ring-2 focus:ring-[var(--focus-ring-error)]
      focus:ring-offset-2 focus:ring-offset-[var(--focus-offset-color)]
      focus:border-[var(--field-border-error)]
    ` : `
      border-[var(--field-border)] hover:border-[var(--field-border-hover)]
      bg-[var(--field-background)] text-[var(--text-primary)]
      focus:ring-2 focus:ring-[var(--focus-ring-primary)]
      focus:ring-offset-2 focus:ring-offset-[var(--focus-offset-color)]
    `, p = /* @__PURE__ */ z("div", { ref: P, className: "relative inline-block w-full", children: [
    /* @__PURE__ */ i(
      "select",
      {
        ref: H,
        name: d,
        value: M,
        onChange: l,
        className: "sr-only",
        "aria-hidden": "true",
        tabIndex: -1,
        ...v,
        children: x.map((T, N) => /* @__PURE__ */ i("option", { value: T.value, disabled: T.disabled, children: T.label }, N))
      }
    ),
    /* @__PURE__ */ z(
      "button",
      {
        type: "button",
        id: I,
        onClick: se,
        disabled: o,
        className: `
          w-full
          flex items-center justify-between
          font-mono text-sm
          border
          transition-all [transition-duration:var(--duration-normal)]
          ${X.trigger}
          ${ie}
          ${o ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          focus:outline-none
        `,
        "aria-haspopup": "listbox",
        "aria-expanded": $,
        "aria-label": m != null && m !== "" ? void 0 : g ?? "Select an option",
        children: [
          /* @__PURE__ */ i("span", { className: "truncate text-left flex-1", children: de || "Select..." }),
          /* @__PURE__ */ i(
            "span",
            {
              className: `
            ${X.icon}
            inline-flex items-center justify-center font-mono leading-none
            text-[var(--text-secondary)]
            transition-transform [transition-duration:var(--duration-normal)]
            flex-shrink-0 ml-2
            ${$ ? "rotate-180" : ""}
            ${o ? "opacity-50" : ""}
          `,
              "aria-hidden": "true",
              children: "▼"
            }
          )
        ]
      }
    ),
    $ && /* @__PURE__ */ i(
      "div",
      {
        ref: ne,
        role: "listbox",
        style: { animationDuration: "var(--duration-normal)" },
        className: `
            absolute top-full mt-2 left-0 right-0
            min-w-[200px]
            bg-[var(--surface-card)] border border-[var(--border-default)]
            ${X.menu}
            shadow-none
            z-[1051]
            animate-in fade-in slide-in-from-top-2
            max-h-[300px] overflow-y-auto
          `,
        children: x.map((T, N) => {
          const D = T.disabled, R = T.value === M, _ = x.filter((C) => !C.disabled).findIndex((C) => C.value === T.value) === w && !D;
          return /* @__PURE__ */ z(
            "button",
            {
              type: "button",
              role: "option",
              "aria-selected": R,
              disabled: D,
              onClick: () => !D && G(T.value),
              className: `
                  w-full flex items-center gap-2
                  px-4 py-3
                  font-mono text-sm text-left
                  transition-colors [transition-duration:var(--duration-fast)]
                  ${D ? "opacity-50 cursor-not-allowed" : "text-[var(--text-primary)] hover:bg-[var(--surface-subtle)] cursor-pointer"}
                  ${_ && !D ? "bg-[var(--surface-subtle)]" : ""}
                  ${X.menuItem}
                `,
              children: [
                /* @__PURE__ */ i("span", { className: "truncate flex-1 min-w-0", children: T.label }),
                R && /* @__PURE__ */ i("span", { className: `${X.icon} inline-flex items-center justify-center font-mono font-bold text-[var(--border-focus)] flex-shrink-0`, "aria-hidden": "true", children: "✓" })
              ]
            },
            N
          );
        })
      }
    )
  ] });
  return m == null || m === "" ? /* @__PURE__ */ i("div", { className: `w-full ${n}`.trim(), children: p }) : /* @__PURE__ */ z("div", { className: `w-full space-y-1 ${n}`.trim(), children: [
    /* @__PURE__ */ i(
      "label",
      {
        htmlFor: I,
        className: "block font-mono text-sm text-secondary-800 dark:text-secondary-200",
        children: m
      }
    ),
    p
  ] });
});
ir.displayName = "Select";
const lr = F(
  ({
    size: e = "medium",
    label: r,
    error: t = !1,
    disabled: o = !1,
    checked: n = !1,
    onChange: s,
    onCheckedChange: a,
    className: c = "",
    ...l
  }, d) => {
    const g = {
      small: {
        checkbox: "w-4 h-4 rounded-none",
        // TUI: sharp corners
        icon: "w-2.5 h-2.5",
        label: "text-sm"
      },
      medium: {
        checkbox: "w-5 h-5 rounded-none",
        // TUI: sharp corners
        icon: "w-3 h-3",
        label: "text-sm"
      },
      large: {
        checkbox: "w-6 h-6 rounded-none",
        // TUI: sharp corners
        icon: "w-3.5 h-3.5",
        // 14px icon (smaller for better fit)
        label: "text-sm"
        // 14px text
      }
    }[e], y = t ? `
        border-[var(--field-border-error)]
        ${n ? "bg-[var(--field-border-error)] border-[var(--field-border-error)]" : "bg-[var(--field-background)] hover:border-[var(--field-border-error)] hover:bg-[var(--field-background-error)]"}
        transition-all [transition-duration:var(--duration-normal)]
      ` : `
        border-[var(--field-border)]
        ${n ? "bg-[var(--button-primary-background)] border-[var(--button-primary-background)] hover:bg-[var(--button-primary-background-hover)]" : "bg-[var(--field-background)] hover:border-[var(--field-border-hover)] hover:bg-[var(--surface-subtle)]"}
        transition-all [transition-duration:var(--duration-normal)]
      `, v = t ? "peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--focus-ring-error)] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[var(--focus-offset-color)]" : "peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--focus-ring-primary)] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[var(--focus-offset-color)]", A = (E) => {
      s && s(E), a && a(E.target.checked);
    }, S = r != null && r !== !1 && r !== "", I = /* @__PURE__ */ z(we, { children: [
      /* @__PURE__ */ i(
        "input",
        {
          ref: d,
          type: "checkbox",
          checked: n,
          disabled: o,
          onChange: A,
          className: "peer sr-only",
          "aria-invalid": t || void 0,
          ...l
        }
      ),
      /* @__PURE__ */ i(
        "span",
        {
          "aria-hidden": "true",
          className: `
            relative inline-flex shrink-0 items-center justify-center
            ${g.checkbox}
            border-2
            ${o ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
            ${y}
            ${v}
          `,
          children: n && /* @__PURE__ */ i(
            "span",
            {
              className: `
                ${g.icon}
                inline-flex items-center justify-center font-mono font-bold leading-none
                ${t ? "text-white dark:text-white" : "text-black dark:text-black"}
              `,
              "aria-hidden": "true",
              children: "✓"
            }
          )
        }
      )
    ] });
    return /* @__PURE__ */ i("div", { className: `flex items-center gap-2 ${c}`, children: S ? /* @__PURE__ */ z(
      "label",
      {
        className: `inline-flex items-center gap-2 font-mono ${o ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`,
        children: [
          I,
          /* @__PURE__ */ i("span", { className: `${g.label} text-[var(--text-primary)]`, children: r })
        ]
      }
    ) : /* @__PURE__ */ i("span", { className: "inline-flex items-center gap-2", children: I }) });
  }
);
lr.displayName = "Checkbox";
const cr = F(
  ({
    size: e = "medium",
    label: r,
    error: t = !1,
    disabled: o = !1,
    checked: n = !1,
    onChange: s,
    onCheckedChange: a,
    className: c = "",
    ...l
  }, d) => {
    const g = {
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
    }[e], y = t ? `
        border-[var(--field-border-error)]
        ${n ? "bg-[var(--field-border-error)] border-[var(--field-border-error)]" : "bg-[var(--field-background)] hover:border-[var(--field-border-error)] hover:bg-[var(--field-background-error)]"}
        transition-all [transition-duration:var(--duration-normal)]
      ` : `
        border-[var(--field-border)]
        ${n ? "bg-[var(--button-primary-background)] border-[var(--button-primary-background)] hover:bg-[var(--button-primary-background-hover)]" : "bg-[var(--field-background)] hover:border-[var(--field-border-hover)] hover:bg-[var(--surface-subtle)]"}
        transition-all [transition-duration:var(--duration-normal)]
      `, v = t ? "peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--focus-ring-error)] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[var(--focus-offset-color)]" : "peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--focus-ring-primary)] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[var(--focus-offset-color)]", A = (E) => {
      s && s(E), a && a(E.target.checked);
    }, S = r != null && r !== !1 && r !== "", I = /* @__PURE__ */ z(we, { children: [
      /* @__PURE__ */ i(
        "input",
        {
          ref: d,
          type: "radio",
          checked: n,
          disabled: o,
          onChange: A,
          className: "peer sr-only",
          "aria-invalid": t || void 0,
          ...l
        }
      ),
      /* @__PURE__ */ i(
        "span",
        {
          "aria-hidden": "true",
          className: `
            relative inline-flex shrink-0 items-center justify-center
            ${g.radio}
            rounded-none
            border-2
            ${o ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
            ${y}
            ${v}
          `,
          children: n && /* @__PURE__ */ i(
            "span",
            {
              className: `
                ${g.dot}
                rounded-none
                ${t ? "bg-white dark:bg-white" : "bg-black dark:bg-black"}
              `
            }
          )
        }
      )
    ] });
    return /* @__PURE__ */ i("div", { className: `flex items-center gap-2 ${c}`, children: S ? /* @__PURE__ */ z(
      "label",
      {
        className: `inline-flex items-center gap-2 font-mono ${o ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`,
        children: [
          I,
          /* @__PURE__ */ i("span", { className: `${g.label} text-[var(--text-primary)]`, children: r })
        ]
      }
    ) : /* @__PURE__ */ i("span", { className: "inline-flex items-center gap-2", children: I }) });
  }
);
cr.displayName = "Radio";
const dr = F(
  ({
    size: e = "medium",
    error: r = !1,
    disabled: t = !1,
    className: o = "",
    label: n,
    id: s,
    ...a
  }, c) => {
    const l = he(), d = s ?? (n != null && n !== "" ? l : void 0), m = `
      w-full
      font-mono text-sm
      border
      transition-all [transition-duration:var(--duration-normal)]
      placeholder:text-[var(--field-placeholder)]
      disabled:cursor-not-allowed disabled:opacity-50
      focus:outline-none
      resize-y
    `, g = {
      small: "min-h-8 px-3 py-1.5 rounded-none",
      // TUI: sharp corners
      medium: "min-h-10 px-4 py-2.5 rounded-none",
      // TUI: sharp corners
      large: "min-h-12 px-5 py-3.5 rounded-none"
      // TUI: sharp corners
    }, y = r ? `
        border-[var(--field-border-error)]
        bg-[var(--field-background-error)]
        text-[var(--text-primary)]
        focus:ring-2 focus:ring-[var(--focus-ring-error)]
        focus:ring-offset-2 focus:ring-offset-[var(--focus-offset-color)]
        focus:border-[var(--field-border-error)]
      ` : `
        border-[var(--field-border)] hover:border-[var(--field-border-hover)]
        bg-[var(--field-background)] text-[var(--text-primary)]
        focus:ring-2 focus:ring-[var(--focus-ring-primary)]
        focus:ring-offset-2 focus:ring-offset-[var(--focus-offset-color)]
      `, v = /* @__PURE__ */ i(
      "textarea",
      {
        ref: c,
        id: d,
        disabled: t,
        className: `${m} ${g[e]} ${y} ${o}`,
        ...a
      }
    );
    return n == null || n === "" ? v : /* @__PURE__ */ z("div", { className: "w-full space-y-1", children: [
      /* @__PURE__ */ i(
        "label",
        {
          htmlFor: d,
          className: "block font-mono text-sm text-secondary-800 dark:text-secondary-200",
          children: n
        }
      ),
      v
    ] });
  }
);
dr.displayName = "Textarea";
const Oe = F(
  ({
    checked: e = !1,
    onCheckedChange: r,
    size: t = "medium",
    label: o,
    disabled: n = !1,
    icon: s,
    className: a = "",
    ...c
  }, l) => {
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
    }[t], g = () => {
      !n && r && r(!e);
    }, y = (v) => {
      (v.key === " " || v.key === "Enter") && (v.preventDefault(), !n && r && r(!e));
    };
    return /* @__PURE__ */ z("div", { className: `flex items-center gap-3 ${a}`, children: [
      /* @__PURE__ */ i(
        "button",
        {
          ref: l,
          type: "button",
          role: "switch",
          "aria-checked": e,
          "aria-label": o || (e ? "On" : "Off"),
          disabled: n,
          onClick: g,
          onKeyDown: y,
          className: `
            relative inline-flex items-center
            ${m.track}
            rounded-none
            transition-colors [transition-duration:var(--duration-slow)]
            focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring-primary)] focus:ring-offset-2 focus:ring-offset-[var(--focus-offset-color)]
            ${n ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            ${e ? "bg-[var(--button-primary-background)]" : "bg-secondary-300 dark:bg-secondary-700"}
          `,
          ...c,
          children: /* @__PURE__ */ i(
            "span",
            {
              className: `
              inline-flex items-center justify-center
              ${m.knob}
              rounded-none
              bg-[var(--field-background)]
              shadow-none
              transform transition-transform [transition-duration:var(--duration-slow)]
            `,
              style: {
                transform: m.knobTranslate
              },
              children: s && /* @__PURE__ */ i("span", { className: m.iconSize, children: s })
            }
          )
        }
      ),
      o && /* @__PURE__ */ i(
        "span",
        {
          className: `text-sm font-mono ${n ? "text-secondary-700 dark:text-secondary-400" : "text-[var(--text-primary)]"}`,
          children: o
        }
      )
    ] });
  }
);
Oe.displayName = "Switch";
function Nt({
  trigger: e,
  items: r,
  align: t = "left",
  label: o = "Actions",
  size: n = "medium"
}) {
  const [s, a] = W(!1), [c, l] = W(-1), d = K(null), m = K(null), g = () => {
    a(!s), s || l(-1);
  }, y = () => {
    a(!1), l(-1);
  }, v = (x) => {
    x.disabled || (x.onClick(), y());
  };
  B(() => {
    function x($) {
      d.current && !d.current.contains($.target) && y();
    }
    if (s)
      return document.addEventListener("mousedown", x), () => {
        document.removeEventListener("mousedown", x);
      };
  }, [s]), B(() => {
    function x($) {
      if (!s) return;
      const h = r.filter((O) => !O.disabled), w = c;
      switch ($.key) {
        case "Escape":
          $.preventDefault(), y();
          break;
        case "ArrowDown":
          $.preventDefault(), l((O) => {
            const M = O + 1;
            return M >= h.length ? 0 : M;
          });
          break;
        case "ArrowUp":
          $.preventDefault(), l((O) => {
            const M = O - 1;
            return M < 0 ? h.length - 1 : M;
          });
          break;
        case "Enter":
        case " ":
          $.preventDefault(), w >= 0 && w < h.length && v(h[w]);
          break;
      }
    }
    if (s)
      return document.addEventListener("keydown", x), () => {
        document.removeEventListener("keydown", x);
      };
  }, [s, c, r]), B(() => {
    if (c >= 0 && m.current) {
      const $ = m.current.querySelectorAll('[role="menuitem"]')[c];
      $ && $.scrollIntoView({ block: "nearest" });
    }
  }, [c]);
  const S = {
    small: {
      button: "h-8 px-4 py-1.5 rounded-none",
      // TUI: sharp corners
      menu: "rounded-none",
      menuItem: "",
      icon: "w-4 h-4"
    },
    medium: {
      button: "h-10 px-5 py-2.5 rounded-none",
      // TUI: sharp corners
      menu: "rounded-none",
      menuItem: "",
      icon: "w-5 h-5"
    },
    large: {
      button: "h-12 px-6 py-3.5 rounded-none",
      // TUI: sharp corners
      menu: "rounded-none",
      menuItem: "",
      icon: "w-6 h-6"
    }
  }[n], I = /* @__PURE__ */ z(
    "button",
    {
      onClick: g,
      className: `
        inline-flex items-center justify-center gap-2
        font-mono text-sm
        ${S.button}
        transition-colors [transition-duration:var(--duration-normal)]
        cursor-pointer
        bg-[var(--button-secondary-background)] hover:bg-[var(--button-secondary-background-hover)] active:brightness-95
        text-[var(--button-secondary-text)]
        focus:ring-2 focus:ring-[var(--focus-ring-secondary)] focus:ring-offset-2 focus:ring-offset-[var(--focus-offset-color)]
      `,
      "aria-haspopup": "true",
      "aria-expanded": s,
      children: [
        o,
        /* @__PURE__ */ i("span", { className: `${S.icon} inline-flex items-center justify-center font-mono leading-none transition-transform [transition-duration:var(--duration-normal)] ${s ? "rotate-180" : ""}`, "aria-hidden": "true", children: "▼" })
      ]
    }
  );
  return /* @__PURE__ */ z("div", { ref: d, className: "relative inline-block", children: [
    e ? /* @__PURE__ */ i("div", { onClick: g, role: "button", tabIndex: 0, onKeyDown: (x) => {
      (x.key === "Enter" || x.key === " ") && (x.preventDefault(), g());
    }, children: e }) : I,
    s && /* @__PURE__ */ i(
      "div",
      {
        ref: m,
        role: "menu",
        "aria-orientation": "vertical",
        style: { animationDuration: "var(--duration-normal)" },
        className: `
            absolute top-full mt-2
            ${t === "right" ? "right-0" : "left-0"}
            min-w-[200px]
            bg-[var(--surface-card)] border border-[var(--border-default)]
            ${S.menu}
            shadow-none
            z-[1051]
            animate-in fade-in slide-in-from-top-2
          `,
        children: r.map((x, $) => {
          const h = x.variant === "destructive", w = x.disabled;
          return /* @__PURE__ */ z(
            "button",
            {
              role: "menuitem",
              disabled: w,
              onClick: () => v(x),
              className: `
                  w-full flex items-center gap-2
                  px-4 py-3
                  font-mono text-sm text-left
                  transition-colors [transition-duration:var(--duration-fast)]
                  ${w ? "opacity-50 cursor-not-allowed" : h ? "text-error-600 hover:bg-[var(--field-background-error)]" : "text-[var(--text-primary)] hover:bg-[var(--surface-subtle)]"}
                  ${c === $ && !w ? "bg-[var(--surface-subtle)]" : ""}
                  ${S.menuItem}
                `,
              children: [
                /* @__PURE__ */ z("div", { className: "flex items-center gap-2 flex-1 min-w-0", children: [
                  x.icon && /* @__PURE__ */ i("span", { className: `inline-flex items-center justify-center ${S.icon} flex-shrink-0`, children: x.icon }),
                  /* @__PURE__ */ i("span", { className: "truncate", children: x.label })
                ] }),
                x.iconRight && /* @__PURE__ */ i("span", { className: `inline-flex items-center justify-center ${S.icon} flex-shrink-0 ml-auto`, children: x.iconRight })
              ]
            },
            $
          );
        })
      }
    )
  ] });
}
function St() {
  const { theme: e, setTheme: r } = or(), [t, o] = W(!1);
  if (B(() => {
    o(!0);
  }, []), !t)
    return /* @__PURE__ */ z("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ i("div", { className: "w-11 h-6 rounded-none bg-[var(--field-border)]" }),
      /* @__PURE__ */ i("span", { className: "text-sm font-mono text-[var(--text-secondary)]", children: "Theme" })
    ] });
  const n = e === "dark";
  return /* @__PURE__ */ z("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ i(
      Oe,
      {
        checked: n,
        onCheckedChange: () => {
          r(n ? "light" : "dark");
        },
        size: "small",
        icon: n ? /* @__PURE__ */ i("span", { className: "w-3 h-3 inline-flex items-center justify-center font-mono text-[10px] text-[var(--border-focus)]", "aria-hidden": "true", children: "☾" }) : /* @__PURE__ */ i("span", { className: "w-3 h-3 inline-flex items-center justify-center font-mono text-[10px] text-[var(--text-secondary)]", "aria-hidden": "true", children: "☀" }),
        "aria-label": `Switch to ${n ? "light" : "dark"} theme`
      }
    ),
    /* @__PURE__ */ i("span", { className: "text-sm font-mono text-[var(--text-primary)]", children: n ? "Dark" : "Light" })
  ] });
}
function De(e) {
  var r, t, o = "";
  if (typeof e == "string" || typeof e == "number") o += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var n = e.length;
    for (r = 0; r < n; r++) e[r] && (t = De(e[r])) && (o && (o += " "), o += t);
  } else for (t in e) e[t] && (o && (o += " "), o += t);
  return o;
}
function ur() {
  for (var e, r, t = 0, o = "", n = arguments.length; t < n; t++) (e = arguments[t]) && (r = De(e)) && (o && (o += " "), o += r);
  return o;
}
const fr = (e, r) => {
  const t = new Array(e.length + r.length);
  for (let o = 0; o < e.length; o++)
    t[o] = e[o];
  for (let o = 0; o < r.length; o++)
    t[e.length + o] = r[o];
  return t;
}, mr = (e, r) => ({
  classGroupId: e,
  validator: r
}), Me = (e = /* @__PURE__ */ new Map(), r = null, t) => ({
  nextPart: e,
  validators: r,
  classGroupId: t
}), ge = "-", ze = [], br = "arbitrary..", pr = (e) => {
  const r = hr(e), {
    conflictingClassGroups: t,
    conflictingClassGroupModifiers: o
  } = e;
  return {
    getClassGroupId: (a) => {
      if (a.startsWith("[") && a.endsWith("]"))
        return gr(a);
      const c = a.split(ge), l = c[0] === "" && c.length > 1 ? 1 : 0;
      return Pe(c, l, r);
    },
    getConflictingClassGroupIds: (a, c) => {
      if (c) {
        const l = o[a], d = t[a];
        return l ? d ? fr(d, l) : l : d || ze;
      }
      return t[a] || ze;
    }
  };
}, Pe = (e, r, t) => {
  if (e.length - r === 0)
    return t.classGroupId;
  const n = e[r], s = t.nextPart.get(n);
  if (s) {
    const d = Pe(e, r + 1, s);
    if (d) return d;
  }
  const a = t.validators;
  if (a === null)
    return;
  const c = r === 0 ? e.join(ge) : e.slice(r).join(ge), l = a.length;
  for (let d = 0; d < l; d++) {
    const m = a[d];
    if (m.validator(c))
      return m.classGroupId;
  }
}, gr = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const r = e.slice(1, -1), t = r.indexOf(":"), o = r.slice(0, t);
  return o ? br + o : void 0;
})(), hr = (e) => {
  const {
    theme: r,
    classGroups: t
  } = e;
  return xr(t, r);
}, xr = (e, r) => {
  const t = Me();
  for (const o in e) {
    const n = e[o];
    ke(n, t, o, r);
  }
  return t;
}, ke = (e, r, t, o) => {
  const n = e.length;
  for (let s = 0; s < n; s++) {
    const a = e[s];
    vr(a, r, t, o);
  }
}, vr = (e, r, t, o) => {
  if (typeof e == "string") {
    yr(e, r, t);
    return;
  }
  if (typeof e == "function") {
    wr(e, r, t, o);
    return;
  }
  kr(e, r, t, o);
}, yr = (e, r, t) => {
  const o = e === "" ? r : Le(r, e);
  o.classGroupId = t;
}, wr = (e, r, t, o) => {
  if (Nr(e)) {
    ke(e(o), r, t, o);
    return;
  }
  r.validators === null && (r.validators = []), r.validators.push(mr(t, e));
}, kr = (e, r, t, o) => {
  const n = Object.entries(e), s = n.length;
  for (let a = 0; a < s; a++) {
    const [c, l] = n[a];
    ke(l, Le(r, c), t, o);
  }
}, Le = (e, r) => {
  let t = e;
  const o = r.split(ge), n = o.length;
  for (let s = 0; s < n; s++) {
    const a = o[s];
    let c = t.nextPart.get(a);
    c || (c = Me(), t.nextPart.set(a, c)), t = c;
  }
  return t;
}, Nr = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, Sr = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let r = 0, t = /* @__PURE__ */ Object.create(null), o = /* @__PURE__ */ Object.create(null);
  const n = (s, a) => {
    t[s] = a, r++, r > e && (r = 0, o = t, t = /* @__PURE__ */ Object.create(null));
  };
  return {
    get(s) {
      let a = t[s];
      if (a !== void 0)
        return a;
      if ((a = o[s]) !== void 0)
        return n(s, a), a;
    },
    set(s, a) {
      s in t ? t[s] = a : n(s, a);
    }
  };
}, ye = "!", Ie = ":", $r = [], Te = (e, r, t, o, n) => ({
  modifiers: e,
  hasImportantModifier: r,
  baseClassName: t,
  maybePostfixModifierPosition: o,
  isExternal: n
}), zr = (e) => {
  const {
    prefix: r,
    experimentalParseClassName: t
  } = e;
  let o = (n) => {
    const s = [];
    let a = 0, c = 0, l = 0, d;
    const m = n.length;
    for (let S = 0; S < m; S++) {
      const I = n[S];
      if (a === 0 && c === 0) {
        if (I === Ie) {
          s.push(n.slice(l, S)), l = S + 1;
          continue;
        }
        if (I === "/") {
          d = S;
          continue;
        }
      }
      I === "[" ? a++ : I === "]" ? a-- : I === "(" ? c++ : I === ")" && c--;
    }
    const g = s.length === 0 ? n : n.slice(l);
    let y = g, v = !1;
    g.endsWith(ye) ? (y = g.slice(0, -1), v = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      g.startsWith(ye) && (y = g.slice(1), v = !0)
    );
    const A = d && d > l ? d - l : void 0;
    return Te(s, v, y, A);
  };
  if (r) {
    const n = r + Ie, s = o;
    o = (a) => a.startsWith(n) ? s(a.slice(n.length)) : Te($r, !1, a, void 0, !0);
  }
  if (t) {
    const n = o;
    o = (s) => t({
      className: s,
      parseClassName: n
    });
  }
  return o;
}, Ir = (e) => {
  const r = /* @__PURE__ */ new Map();
  return e.orderSensitiveModifiers.forEach((t, o) => {
    r.set(t, 1e6 + o);
  }), (t) => {
    const o = [];
    let n = [];
    for (let s = 0; s < t.length; s++) {
      const a = t[s], c = a[0] === "[", l = r.has(a);
      c || l ? (n.length > 0 && (n.sort(), o.push(...n), n = []), o.push(a)) : n.push(a);
    }
    return n.length > 0 && (n.sort(), o.push(...n)), o;
  };
}, Tr = (e) => ({
  cache: Sr(e.cacheSize),
  parseClassName: zr(e),
  sortModifiers: Ir(e),
  ...pr(e)
}), Cr = /\s+/, Ar = (e, r) => {
  const {
    parseClassName: t,
    getClassGroupId: o,
    getConflictingClassGroupIds: n,
    sortModifiers: s
  } = r, a = [], c = e.trim().split(Cr);
  let l = "";
  for (let d = c.length - 1; d >= 0; d -= 1) {
    const m = c[d], {
      isExternal: g,
      modifiers: y,
      hasImportantModifier: v,
      baseClassName: A,
      maybePostfixModifierPosition: S
    } = t(m);
    if (g) {
      l = m + (l.length > 0 ? " " + l : l);
      continue;
    }
    let I = !!S, E = o(I ? A.substring(0, S) : A);
    if (!E) {
      if (!I) {
        l = m + (l.length > 0 ? " " + l : l);
        continue;
      }
      if (E = o(A), !E) {
        l = m + (l.length > 0 ? " " + l : l);
        continue;
      }
      I = !1;
    }
    const x = y.length === 0 ? "" : y.length === 1 ? y[0] : s(y).join(":"), $ = v ? x + ye : x, h = $ + E;
    if (a.indexOf(h) > -1)
      continue;
    a.push(h);
    const w = n(E, I);
    for (let O = 0; O < w.length; ++O) {
      const M = w[O];
      a.push($ + M);
    }
    l = m + (l.length > 0 ? " " + l : l);
  }
  return l;
}, Rr = (...e) => {
  let r = 0, t, o, n = "";
  for (; r < e.length; )
    (t = e[r++]) && (o = Fe(t)) && (n && (n += " "), n += o);
  return n;
}, Fe = (e) => {
  if (typeof e == "string")
    return e;
  let r, t = "";
  for (let o = 0; o < e.length; o++)
    e[o] && (r = Fe(e[o])) && (t && (t += " "), t += r);
  return t;
}, Er = (e, ...r) => {
  let t, o, n, s;
  const a = (l) => {
    const d = r.reduce((m, g) => g(m), e());
    return t = Tr(d), o = t.cache.get, n = t.cache.set, s = c, c(l);
  }, c = (l) => {
    const d = o(l);
    if (d)
      return d;
    const m = Ar(l, t);
    return n(l, m), m;
  };
  return s = a, (...l) => s(Rr(...l));
}, jr = [], L = (e) => {
  const r = (t) => t[e] || jr;
  return r.isThemeGetter = !0, r;
}, Ge = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Ve = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Or = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, Dr = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Mr = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Pr = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Lr = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Fr = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Q = (e) => Or.test(e), k = (e) => !!e && !Number.isNaN(Number(e)), ee = (e) => !!e && Number.isInteger(Number(e)), ve = (e) => e.endsWith("%") && k(e.slice(0, -1)), Y = (e) => Dr.test(e), Be = () => !0, Gr = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Mr.test(e) && !Pr.test(e)
), Ne = () => !1, Vr = (e) => Lr.test(e), Br = (e) => Fr.test(e), _r = (e) => !u(e) && !f(e), Ur = (e) => re(e, We, Ne), u = (e) => Ge.test(e), te = (e) => re(e, He, Gr), Ce = (e) => re(e, Zr, k), Wr = (e) => re(e, qe, Be), Hr = (e) => re(e, Xe, Ne), Ae = (e) => re(e, _e, Ne), Xr = (e) => re(e, Ue, Br), be = (e) => re(e, Ye, Vr), f = (e) => Ve.test(e), ce = (e) => oe(e, He), qr = (e) => oe(e, Xe), Re = (e) => oe(e, _e), Yr = (e) => oe(e, We), Kr = (e) => oe(e, Ue), pe = (e) => oe(e, Ye, !0), Jr = (e) => oe(e, qe, !0), re = (e, r, t) => {
  const o = Ge.exec(e);
  return o ? o[1] ? r(o[1]) : t(o[2]) : !1;
}, oe = (e, r, t = !1) => {
  const o = Ve.exec(e);
  return o ? o[1] ? r(o[1]) : t : !1;
}, _e = (e) => e === "position" || e === "percentage", Ue = (e) => e === "image" || e === "url", We = (e) => e === "length" || e === "size" || e === "bg-size", He = (e) => e === "length", Zr = (e) => e === "number", Xe = (e) => e === "family-name", qe = (e) => e === "number" || e === "weight", Ye = (e) => e === "shadow", Qr = () => {
  const e = L("color"), r = L("font"), t = L("text"), o = L("font-weight"), n = L("tracking"), s = L("leading"), a = L("breakpoint"), c = L("container"), l = L("spacing"), d = L("radius"), m = L("shadow"), g = L("inset-shadow"), y = L("text-shadow"), v = L("drop-shadow"), A = L("blur"), S = L("perspective"), I = L("aspect"), E = L("ease"), x = L("animate"), $ = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], h = () => [
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
  ], w = () => [...h(), f, u], O = () => ["auto", "hidden", "clip", "visible", "scroll"], M = () => ["auto", "contain", "none"], b = () => [f, u, l], P = () => [Q, "full", "auto", ...b()], ne = () => [ee, "none", "subgrid", f, u], H = () => ["auto", {
    span: ["full", ee, f, u]
  }, ee, f, u], J = () => [ee, "auto", f, u], de = () => ["auto", "min", "max", "fr", f, u], se = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], U = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], G = () => ["auto", ...b()], Z = () => [Q, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...b()], X = () => [Q, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...b()], ie = () => [Q, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...b()], p = () => [e, f, u], le = () => [...h(), Re, Ae, {
    position: [f, u]
  }], T = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], N = () => ["auto", "cover", "contain", Yr, Ur, {
    size: [f, u]
  }], D = () => [ve, ce, te], R = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    d,
    f,
    u
  ], j = () => ["", k, ce, te], q = () => ["solid", "dashed", "dotted", "double"], _ = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], C = () => [k, ve, Re, Ae], ae = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    A,
    f,
    u
  ], ue = () => ["none", k, f, u], fe = () => ["none", k, f, u], xe = () => [k, f, u], me = () => [Q, "full", ...b()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Y],
      breakpoint: [Y],
      color: [Be],
      container: [Y],
      "drop-shadow": [Y],
      ease: ["in", "out", "in-out"],
      font: [_r],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Y],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Y],
      shadow: [Y],
      spacing: ["px", k],
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
        aspect: ["auto", "square", Q, u, f, I]
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
        columns: [k, u, f, c]
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
        object: w()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: O()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": O()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": O()
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
        z: [ee, "auto", f, u]
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
        flex: [k, Q, "auto", "initial", "none", u]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", k, f, u]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", k, f, u]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [ee, "first", "last", "none", f, u]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": ne()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: H()
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
        "grid-rows": ne()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: H()
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
        "auto-cols": de()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": de()
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
        "justify-items": [...U(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...U()]
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
        items: [...U(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...U(), {
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
        "place-items": [...U(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...U()]
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
        size: Z()
      }],
      /**
       * Inline Size
       * @see https://tailwindcss.com/docs/width
       */
      "inline-size": [{
        inline: ["auto", ...X()]
      }],
      /**
       * Min-Inline Size
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-inline-size": [{
        "min-inline": ["auto", ...X()]
      }],
      /**
       * Max-Inline Size
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-inline-size": [{
        "max-inline": ["none", ...X()]
      }],
      /**
       * Block Size
       * @see https://tailwindcss.com/docs/height
       */
      "block-size": [{
        block: ["auto", ...ie()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-block-size": [{
        "min-block": ["auto", ...ie()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-block-size": [{
        "max-block": ["none", ...ie()]
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [c, "screen", ...Z()]
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
          ...Z()
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
            screen: [a]
          },
          ...Z()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...Z()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...Z()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...Z()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", t, ce, te]
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
        font: [o, Jr, Wr]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", ve, u]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [qr, Hr, r]
      }],
      /**
       * Font Feature Settings
       * @see https://tailwindcss.com/docs/font-feature-settings
       */
      "font-features": [{
        "font-features": [u]
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
        tracking: [n, f, u]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [k, "none", f, Ce]
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
        "list-image": ["none", f, u]
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
        list: ["disc", "decimal", "none", f, u]
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
        placeholder: p()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: p()
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
        decoration: [...q(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [k, "from-font", "auto", f, te]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: p()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [k, "auto", f, u]
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
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", f, u]
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
        content: ["none", f, u]
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
        bg: le()
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
        bg: N()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, ee, f, u],
          radial: ["", f, u],
          conic: [ee, f, u]
        }, Kr, Xr]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: p()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: D()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: D()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: D()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: p()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: p()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: p()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: R()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": R()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": R()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": R()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": R()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": R()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": R()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": R()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": R()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": R()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": R()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": R()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": R()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": R()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": R()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: j()
      }],
      /**
       * Border Width Inline
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": j()
      }],
      /**
       * Border Width Block
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": j()
      }],
      /**
       * Border Width Inline Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": j()
      }],
      /**
       * Border Width Inline End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": j()
      }],
      /**
       * Border Width Block Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-bs": [{
        "border-bs": j()
      }],
      /**
       * Border Width Block End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-be": [{
        "border-be": j()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": j()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": j()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": j()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": j()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": j()
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
        "divide-y": j()
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
        border: [...q(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...q(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: p()
      }],
      /**
       * Border Color Inline
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": p()
      }],
      /**
       * Border Color Block
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": p()
      }],
      /**
       * Border Color Inline Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": p()
      }],
      /**
       * Border Color Inline End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": p()
      }],
      /**
       * Border Color Block Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-bs": [{
        "border-bs": p()
      }],
      /**
       * Border Color Block End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-be": [{
        "border-be": p()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": p()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": p()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": p()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": p()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: p()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...q(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [k, f, u]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", k, ce, te]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: p()
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
          pe,
          be
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: p()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", g, pe, be]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": p()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: j()
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
        ring: p()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [k, te]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": p()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": j()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": p()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", y, pe, be]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": p()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [k, f, u]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [..._(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": _()
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
        "mask-linear": [k]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": C()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": C()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": p()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": p()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": C()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": C()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": p()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": p()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": C()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": C()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": p()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": p()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": C()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": C()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": p()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": p()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": C()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": C()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": p()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": p()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": C()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": C()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": p()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": p()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": C()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": C()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": p()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": p()
      }],
      "mask-image-radial": [{
        "mask-radial": [f, u]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": C()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": C()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": p()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": p()
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
        "mask-radial-at": h()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [k]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": C()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": C()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": p()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": p()
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
        mask: le()
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
        mask: N()
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
        mask: ["none", f, u]
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
          f,
          u
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: ae()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [k, f, u]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [k, f, u]
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
          v,
          pe,
          be
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": p()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", k, f, u]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [k, f, u]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", k, f, u]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [k, f, u]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", k, f, u]
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
          f,
          u
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": ae()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [k, f, u]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [k, f, u]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", k, f, u]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [k, f, u]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", k, f, u]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [k, f, u]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [k, f, u]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", k, f, u]
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
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", f, u]
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
        duration: [k, "initial", f, u]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", E, f, u]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [k, f, u]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", x, f, u]
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
        perspective: [S, f, u]
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
        rotate: ue()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": ue()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": ue()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": ue()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: fe()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": fe()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": fe()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": fe()
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
        skew: xe()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": xe()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": xe()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [f, u, "", "none", "gpu", "cpu"]
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
        translate: me()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": me()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": me()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": me()
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
        accent: p()
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
        caret: p()
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", f, u]
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
        "will-change": ["auto", "scroll", "contents", "transform", f, u]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...p()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [k, ce, te, Ce]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...p()]
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
}, et = /* @__PURE__ */ Er(Qr);
function V(...e) {
  return et(ur(e));
}
const Ee = {
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
}, je = {
  3: "w-3 h-3 text-[14px]",
  4: "w-4 h-4 text-[20px]",
  5: "w-5 h-5 text-[24px]",
  6: "w-6 h-6 text-[28px]",
  8: "w-8 h-8 text-[36px]"
}, $t = ({
  name: e,
  size: r = "4",
  className: t
}) => {
  const o = e in Ee ? Ee[e] : "?", n = je[r] ?? je[4];
  return /* @__PURE__ */ i(
    "span",
    {
      className: V(
        "inline-flex items-center justify-center font-mono leading-none select-none",
        n,
        t
      ),
      "aria-hidden": "true",
      children: o
    }
  );
}, Ke = Ze(null);
function Se(e) {
  const r = Qe(Ke);
  if (!r)
    throw new Error(`[@scorp-ds/components] ${e} must be used inside <Tabs>.`);
  return r;
}
function zt({
  value: e,
  defaultValue: r,
  onValueChange: t,
  children: o,
  className: n
}) {
  const s = e !== void 0, [a, c] = W(() => r ?? ""), l = s ? e : a, d = he().replace(/:/g, ""), m = K([]), g = er(
    (v) => {
      s || c(v), t == null || t(v);
    },
    [s, t]
  ), y = rr(
    () => ({
      value: l,
      onValueChange: g,
      baseId: d,
      listValuesRef: m,
      isControlled: s
    }),
    [l, g, d, s]
  );
  return /* @__PURE__ */ i(Ke.Provider, { value: y, children: /* @__PURE__ */ i("div", { className: V("w-full", n), children: o }) });
}
function rt(e) {
  const r = [];
  return $e.Children.forEach(e, (t) => {
    if (!$e.isValidElement(t)) return;
    if (t.type.displayName === "TabsTrigger") {
      const n = t.props.value;
      typeof n == "string" && r.push(n);
    }
  }), r;
}
function tt({
  children: e,
  className: r,
  "aria-label": t,
  "aria-labelledby": o
}) {
  const { value: n, isControlled: s, onValueChange: a, listValuesRef: c } = Se("TabsList"), l = rt(e);
  c.current = l;
  const d = l.join("\0");
  return tr(() => {
    const m = c.current;
    s || m.length === 0 || m.includes(n) || a(m[0]);
  }, [s, c, a, n, d]), /* @__PURE__ */ i(
    "div",
    {
      role: "tablist",
      "aria-label": t,
      "aria-labelledby": o,
      className: V(
        "flex flex-wrap gap-0 border-b-[0.5px] border-solid border-[var(--surface-container-stroke)]",
        r
      ),
      children: e
    }
  );
}
tt.displayName = "TabsList";
const ot = F(function({ value: r, children: t, className: o, disabled: n, onKeyDown: s, onClick: a, type: c = "button", ...l }, d) {
  const { value: m, onValueChange: g, baseId: y, listValuesRef: v } = Se("TabsTrigger"), A = m === r, S = `${y}-tab-${r}`, I = `${y}-panel-${r}`, E = (h) => {
    g(h), requestAnimationFrame(() => {
      var w;
      (w = document.getElementById(`${y}-tab-${h}`)) == null || w.focus();
    });
  }, x = (h) => {
    const w = v.current, O = w.indexOf(r);
    if (O < 0) return;
    const M = w[(O + h + w.length) % w.length];
    E(M);
  }, $ = (h) => {
    if (s == null || s(h), h.defaultPrevented || n) return;
    const w = v.current;
    switch (h.key) {
      case "ArrowRight":
      case "ArrowDown":
        h.preventDefault(), x(1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        h.preventDefault(), x(-1);
        break;
      case "Home":
        h.preventDefault(), w[0] && E(w[0]);
        break;
      case "End":
        h.preventDefault(), w.length && E(w[w.length - 1]);
        break;
    }
  };
  return /* @__PURE__ */ i(
    "button",
    {
      ref: d,
      type: c,
      role: "tab",
      id: S,
      "aria-selected": A,
      "aria-controls": I,
      tabIndex: A ? 0 : -1,
      disabled: n,
      className: V(
        "-mb-px rounded-none border-b-2 px-4 py-2 font-mono text-sm transition-colors [transition-duration:var(--duration-normal)]",
        A ? "border-[var(--button-primary-background)] bg-transparent text-[var(--text-primary)]" : "border-transparent text-secondary-700 hover:text-[var(--text-primary)] dark:text-secondary-300",
        n && "cursor-not-allowed opacity-50",
        o
      ),
      onClick: (h) => {
        a == null || a(h), !h.defaultPrevented && !n && g(r);
      },
      onKeyDown: $,
      ...l,
      children: t
    }
  );
});
ot.displayName = "TabsTrigger";
function nt({ value: e, children: r, className: t, forceMount: o = !1 }) {
  const { value: n, baseId: s } = Se("TabsContent"), a = n === e, c = `${s}-tab-${e}`, l = `${s}-panel-${e}`;
  return !o && !a ? null : !a && o ? /* @__PURE__ */ i(
    "div",
    {
      id: l,
      role: "tabpanel",
      "aria-labelledby": c,
      hidden: !0,
      className: V("p-4 font-mono outline-none", t),
      children: r
    }
  ) : /* @__PURE__ */ i(
    "div",
    {
      id: l,
      role: "tabpanel",
      "aria-labelledby": c,
      tabIndex: 0,
      className: V(
        "p-4 font-mono outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--focus-offset-color)]",
        t
      ),
      children: r
    }
  );
}
nt.displayName = "TabsContent";
const st = F(function({ className: r, striped: t, bordered: o, children: n, ...s }, a) {
  return /* @__PURE__ */ i(
    "table",
    {
      ref: a,
      className: V(
        "w-full border-collapse font-mono text-sm text-[var(--text-primary)]",
        o && "border-[0.5px] border-solid border-[var(--surface-container-stroke)]",
        t && "[&_tbody_tr:nth-child(even)]:bg-[var(--surface-subtle)]",
        r
      ),
      ...s,
      children: n
    }
  );
});
st.displayName = "Table";
const at = F(function({ className: r, ...t }, o) {
  return /* @__PURE__ */ i(
    "thead",
    {
      ref: o,
      className: V(
        "border-b-[0.5px] border-solid border-[var(--surface-container-stroke)] bg-[var(--surface-subtle)]",
        r
      ),
      ...t
    }
  );
});
at.displayName = "TableHeader";
const it = F(function({ className: r, ...t }, o) {
  return /* @__PURE__ */ i("tbody", { ref: o, className: V(r), ...t });
});
it.displayName = "TableBody";
const lt = F(function({ className: r, ...t }, o) {
  return /* @__PURE__ */ i(
    "tfoot",
    {
      ref: o,
      className: V(
        "border-t-[0.5px] border-solid border-[var(--surface-container-stroke)] bg-[var(--surface-subtle)]",
        r
      ),
      ...t
    }
  );
});
lt.displayName = "TableFooter";
const ct = F(function({ className: r, ...t }, o) {
  return /* @__PURE__ */ i(
    "tr",
    {
      ref: o,
      className: V(
        "border-b-[0.5px] border-solid border-[var(--surface-container-stroke)] transition-colors [transition-duration:var(--duration-normal)]",
        r
      ),
      ...t
    }
  );
});
ct.displayName = "TableRow";
const dt = F(function({ className: r, scope: t = "col", ...o }, n) {
  return /* @__PURE__ */ i(
    "th",
    {
      ref: n,
      scope: t,
      className: V(
        "px-3 py-2 text-left font-semibold text-[var(--text-primary)]",
        r
      ),
      ...o
    }
  );
});
dt.displayName = "TableHead";
const ut = F(function({ className: r, ...t }, o) {
  return /* @__PURE__ */ i(
    "td",
    {
      ref: o,
      className: V(
        "px-3 py-2 align-middle text-secondary-800 dark:text-secondary-200",
        r
      ),
      ...t
    }
  );
});
ut.displayName = "TableCell";
const ft = {
  none: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  6: "gap-6",
  8: "gap-8"
};
function It({ children: e, gap: r = "4", className: t, axis: o = "vertical" }) {
  return /* @__PURE__ */ i(
    "div",
    {
      className: V(
        "flex",
        o === "vertical" ? "flex-col" : "flex-row flex-wrap items-center",
        ft[r],
        t
      ),
      children: e
    }
  );
}
function Tt({ children: e, ...r }) {
  return /* @__PURE__ */ i(
    nr,
    {
      attribute: "class",
      defaultTheme: "light",
      enableSystem: !0,
      disableTransitionOnChange: !1,
      ...r,
      children: e
    }
  );
}
export {
  vt as Alert,
  yt as Avatar,
  xt as Badge,
  sr as Button,
  ht as Card,
  lr as Checkbox,
  wt as Divider,
  Nt as Dropdown,
  ar as Input,
  gt as Modal,
  cr as Radio,
  ir as Select,
  It as Stack,
  Oe as Switch,
  Ee as TUI_ICON_GLYPHS,
  st as Table,
  it as TableBody,
  ut as TableCell,
  lt as TableFooter,
  dt as TableHead,
  at as TableHeader,
  ct as TableRow,
  zt as Tabs,
  nt as TabsContent,
  tt as TabsList,
  ot as TabsTrigger,
  dr as Textarea,
  Tt as ThemeProvider,
  St as ThemeToggle,
  kt as Tooltip,
  $t as TuiIcon,
  V as cn
};
//# sourceMappingURL=index.esm.js.map

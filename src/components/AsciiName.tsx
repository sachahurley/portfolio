/**
 * AsciiName — "Sacha Hurley" custom italic ASCII art welcome screen.
 *
 * The TEXT renderer of the shared composition in lib/nameArt.ts (original
 * hand-designed pixel letterforms, sheared italic, carved-stone shading,
 * animated drips, stone frame). The composition is generated at runtime, so
 * the frame reshapes to fill ANY container — including full-screen mobile.
 * For the 8-bit canvas renderer of the same art, see PixelName.tsx.
 *
 * Modes:
 *   <AsciiName />                      — fluid-width banner (frame hugs the art)
 *   <AsciiName fillContainer />        — frame grows to fill the parent box.
 *     For a full-screen welcome: <div style={{height:"100dvh"}}><AsciiName fillContainer /></div>
 *
 * Drips:
 *   animateDrips (default true) renders each drip column as its own <span>,
 *   animated with staggered CSS keyframes (grow → linger → fade, stepped for
 *   a chunky pixel feel). Respects prefers-reduced-motion (renders static).
 *   Set animateDrips={false} for fully static art.
 *
 * Theming: gradient via CSS custom properties — point --ascii-gradient-from/-to
 * at scorp-ds tokens or pass props. Drips use the "to" color (the wet end).
 * --ascii-font must resolve to a font whose spaces AND shade blocks come from
 * the same file (e.g. Menlo); mixed-font advances break column alignment.
 */

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { CHAR_W, LINE_H, buildArt, frameTo, mergeDrips } from "../lib/nameArt";

export interface AsciiNameProps {
  gradientFrom?: string;
  gradientTo?: string;
  gradientAngle?: number;
  /** Frame grows to fill the parent box (use for full-screen welcome) */
  fillContainer?: boolean;
  /** Animate the drips (default true; static under prefers-reduced-motion) */
  animateDrips?: boolean;
  /** Cap in px for the banner mode */
  maxFontSize?: number;
  /** Seconds for one drip cycle */
  dripDuration?: number;
  className?: string;
}

export default function AsciiName({
  gradientFrom = "var(--ascii-gradient-from, #f97316)",
  gradientTo = "var(--ascii-gradient-to, #ec4899)",
  gradientAngle = 135,
  fillContainer = false,
  animateDrips = true,
  maxFontSize = 12,
  dripDuration = 2.8,
  className,
}: AsciiNameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<{ w: number; h: number } | null>(null);

  useLayoutEffect(() => {
    if (!fillContainer || !ref.current) return;
    const el = ref.current;
    const ro = new ResizeObserver(([e]) =>
      setBox({ w: e.contentRect.width, h: e.contentRect.height })
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, [fillContainer]);

  const art = useMemo(() => buildArt(), []);

  const { comp, fontSize } = useMemo(() => {
    if (fillContainer && box && box.w > 0 && box.h > 0) {
      // Size against the art PLUS a gutter (6 cols each side, 1 row top and
      // bottom, beyond the border cells) so the letterforms get breathing
      // room from the frame on tight containers like phone viewports.
      const fs = Math.min(
        box.w / ((art.cols + 16) * CHAR_W),
        box.h / ((art.rows + 4) * LINE_H),
        maxFontSize
      );
      const cols = Math.floor(box.w / (fs * CHAR_W));
      const rows = Math.floor(box.h / (fs * LINE_H));
      return { comp: frameTo(art, cols, rows), fontSize: `${fs}px` };
    }
    const comp = frameTo(art, art.cols + 8, art.rows + 4);
    return {
      comp,
      fontSize: `min(calc(100cqw / ${comp.cols * CHAR_W}), ${maxFontSize}px)`,
    };
  }, [art, fillContainer, box, maxFontSize]);

  const baseLines = animateDrips ? comp.lines : mergeDrips(comp.lines, comp.drips);

  const textFill: CSSProperties = {
    backgroundImage: `linear-gradient(${gradientAngle}deg, ${gradientFrom}, ${gradientTo})`,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
    WebkitTextFillColor: "transparent",
  };

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Sacha Hurley"
      className={className}
      style={{
        position: "relative",
        containerType: "inline-size",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily:
          "var(--ascii-font, ui-monospace, 'JetBrains Mono', 'Fira Code', Menlo, monospace)",
        fontSize,
        lineHeight: LINE_H,
        userSelect: "none",
        ...(fillContainer ? { width: "100%", height: "100%", overflow: "hidden" } : {}),
      }}
    >
      <style>{`
        @keyframes ascii-drip-fall {
          0%   { clip-path: inset(0 0 100% 0); opacity: 1; }
          55%  { clip-path: inset(0 0 0 0);    opacity: 1; }
          82%  { clip-path: inset(0 0 0 0);    opacity: 1; }
          100% { clip-path: inset(0 0 0 0);    opacity: 0; }
        }
        .ascii-drip { animation: ascii-drip-fall var(--ascii-drip-dur, 2.8s) steps(6, end) infinite; }
        @media (prefers-reduced-motion: reduce) { .ascii-drip { animation: none !important; } }
      `}</style>
      <div aria-hidden="true" style={{ position: "relative" }}>
        {/* fontFamily inherit: Tailwind preflight has a direct `pre` font rule
            that would otherwise override the container's font and split the
            art across two fonts with different advances. */}
        <pre style={{ margin: 0, whiteSpace: "pre", fontFamily: "inherit", ...textFill }}>
          {baseLines.join("\n")}
        </pre>
        {animateDrips &&
          comp.drips.map((d, i) => (
            <span
              key={i}
              className="ascii-drip"
              style={{
                position: "absolute",
                left: `${d.x}ch`,
                top: `${d.y * LINE_H}em`,
                whiteSpace: "pre",
                color: gradientTo,
                animationDelay: `${(d.seed / 8) * dripDuration}s`,
                ["--ascii-drip-dur" as string]: `${dripDuration}s`,
              }}
            >
              {d.chars.join("\n")}
            </span>
          ))}
      </div>
    </div>
  );
}

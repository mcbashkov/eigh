import type { CSSProperties, ReactNode } from "react";
import { easeInOutSine, easeOutBack, seg, type Pt, toPath } from "./easing";
import { FONT_DISPLAY, FONT_MONO, useTheme } from "./theme";

type StrokeProps = {
  stroke?: string;
  width?: number;
  opacity?: number;
  dash?: string;
};

/** Garis yang menggambar dirinya (stroke-draw) antara [start, start+dur]. */
export function Draw({
  d,
  t,
  start,
  dur = 0.8,
  stroke,
  width = 3,
  opacity = 1,
  fill = "none",
  fillAfter,
}: {
  d: string;
  t: number;
  start: number;
  dur?: number;
  fill?: string;
  fillAfter?: string;
} & StrokeProps) {
  const th = useTheme();
  const p = easeInOutSine(seg(t, start, dur));
  if (p <= 0) return null;
  return (
    <>
      {fillAfter && (
        <path d={d} fill={fillAfter} opacity={opacity * seg(t, start + dur * 0.8, 0.4)} />
      )}
      <path
        d={d}
        fill={fill}
        stroke={stroke ?? th.line}
        strokeWidth={width}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray="1 1"
        strokeDashoffset={1 - p}
        opacity={opacity}
      />
    </>
  );
}

export const rectPath = (x: number, y: number, w: number, h: number) =>
  `M${x} ${y} H${x + w} V${y + h} H${x} Z`;

export const roundRectPath = (x: number, y: number, w: number, h: number, r: number) =>
  `M${x + r} ${y} H${x + w - r} Q${x + w} ${y} ${x + w} ${y + r} V${y + h - r} Q${x + w} ${y + h} ${x + w - r} ${y + h} H${x + r} Q${x} ${y + h} ${x} ${y + h - r} V${y + r} Q${x} ${y} ${x + r} ${y} Z`;

export const circlePath = (cx: number, cy: number, r: number) =>
  `M${cx - r} ${cy} A${r} ${r} 0 1 1 ${cx + r} ${cy} A${r} ${r} 0 1 1 ${cx - r} ${cy}`;

/** Pop-in dengan overshoot kecil: skala 0..1. */
export const pop = (t: number, start: number, dur = 0.4) => easeOutBack(seg(t, start, dur));

export function Pop({
  t,
  start,
  x,
  y,
  children,
  dur = 0.4,
}: {
  t: number;
  start: number;
  x: number;
  y: number;
  children: ReactNode;
  dur?: number;
}) {
  const s = pop(t, start, dur);
  if (s <= 0) return null;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={seg(t, start, 0.15)}>
      {children}
    </g>
  );
}

export function Label({
  x,
  y,
  children,
  size = 26,
  anchor = "start",
  fill,
  t,
  start = 0,
  mono = true,
  weight = 400,
  rotate,
}: {
  x: number;
  y: number;
  children: ReactNode;
  size?: number;
  anchor?: "start" | "middle" | "end";
  fill?: string;
  t?: number;
  start?: number;
  mono?: boolean;
  weight?: number;
  rotate?: number;
}) {
  const th = useTheme();
  const o = t === undefined ? 1 : seg(t, start, 0.4);
  if (o <= 0) return null;
  const style: CSSProperties = {
    fontFamily: mono ? FONT_MONO : FONT_DISPLAY,
    letterSpacing: mono ? 1 : 2,
  };
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      fontWeight={weight}
      textAnchor={anchor}
      fill={fill ?? th.line}
      opacity={o}
      style={style}
      transform={rotate ? `rotate(${rotate} ${x} ${y})` : undefined}
    >
      {children}
    </text>
  );
}

/** Garis dimensi dengan ujung tegak dan label di tengah. */
export function Dimension({
  a,
  b,
  label,
  t,
  start,
  offset = 0,
  dur = 0.7,
}: {
  a: Pt;
  b: Pt;
  label: string;
  t: number;
  start: number;
  offset?: number;
  dur?: number;
}) {
  const th = useTheme();
  const horizontal = Math.abs(b[0] - a[0]) >= Math.abs(b[1] - a[1]);
  const tick = 16;
  const A: Pt = horizontal ? [a[0], a[1] + offset] : [a[0] + offset, a[1]];
  const B: Pt = horizontal ? [b[0], b[1] + offset] : [b[0] + offset, b[1]];
  const ticks = horizontal
    ? `M${A[0]} ${A[1] - tick} V${A[1] + tick} M${B[0]} ${B[1] - tick} V${B[1] + tick}`
    : `M${A[0] - tick} ${A[1]} H${A[0] + tick} M${B[0] - tick} ${B[1]} H${B[0] + tick}`;
  const mid: Pt = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
  const o = seg(t, start + dur * 0.5, 0.4);
  return (
    <g>
      <Draw d={toPath([A, B])} t={t} start={start} dur={dur} stroke={th.faint} width={2} />
      <Draw d={ticks} t={t} start={start} dur={dur * 0.6} stroke={th.faint} width={2} />
      {o > 0 && (
        <g opacity={o}>
          <rect
            x={mid[0] - (label.length * 18 + 28) / 2}
            y={mid[1] - 18}
            width={label.length * 18 + 28}
            height={36}
            fill={th.bg}
          />
          <text
            x={mid[0]}
            y={mid[1] + 9}
            textAnchor="middle"
            fontSize={26}
            fill={th.line}
            style={{ fontFamily: FONT_MONO, letterSpacing: 1 }}
          >
            {label}
          </text>
        </g>
      )}
    </g>
  );
}

/** Kotak callout dengan garis penunjuk. */
export function Callout({
  from,
  box,
  t,
  start,
  text,
}: {
  from: Pt;
  box: [number, number, number, number]; // x,y,w,h
  t: number;
  start: number;
  text: string;
}) {
  const th = useTheme();
  const [x, y, w, h] = box;
  const anchor: Pt = [x, y + h / 2];
  const o = seg(t, start + 0.5, 0.4);
  return (
    <g>
      <Draw
        d={toPath([from, [from[0] + 60, anchor[1]], anchor])}
        t={t}
        start={start}
        dur={0.5}
        stroke={th.accent}
        width={3}
      />
      <Draw
        d={rectPath(x, y, w, h)}
        t={t}
        start={start + 0.3}
        dur={0.5}
        stroke={th.accent}
        width={3}
      />
      <g opacity={o}>
        <text
          x={x + w / 2}
          y={y + h / 2 + 12}
          textAnchor="middle"
          fontSize={34}
          fill={th.paper}
          style={{ fontFamily: FONT_DISPLAY, letterSpacing: 4 }}
          fontWeight={700}
        >
          {text}
        </text>
      </g>
    </g>
  );
}

/** Koin Rp: lingkaran ganda + teks. */
export function Coin({
  r = 40,
  label = "Rp",
  accent,
}: {
  r?: number;
  label?: string;
  accent?: string;
}) {
  const th = useTheme();
  const c = accent ?? th.accent2;
  return (
    <g>
      <circle r={r} fill={th.bg} stroke={c} strokeWidth={4} />
      <circle r={r * 0.78} fill="none" stroke={c} strokeWidth={2} opacity={0.7} />
      <text
        y={r * 0.2}
        textAnchor="middle"
        fontSize={r * 0.55}
        fill={c}
        fontWeight={700}
        style={{ fontFamily: FONT_DISPLAY }}
      >
        {label}
      </text>
    </g>
  );
}

export const glowFilterId = "bp-glow";
export function GlowDefs() {
  const th = useTheme();
  if (!th.glow) return null;
  return (
    <filter id={glowFilterId} x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="5" result="b" />
      <feMerge>
        <feMergeNode in="b" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  );
}

import {
  Callout,
  Coin,
  Dimension,
  Draw,
  Label,
  Pop,
  circlePath,
  rectPath,
  roundRectPath,
} from "./primitives";
import { easeInOutSine, easeOutCubic, lerp, polylinePoint, seg, toPath, type Pt } from "./easing";
import { glowFilterId } from "./primitives";
import { EPISODE, WIDTH, HEIGHT } from "./script";
import { useTheme } from "./theme";

type SP = { t: number; dur: number };

const CX = WIDTH / 2;

/* ---------------------------------------------------------------- 1. FRAME */
export function SceneFrame({ t }: SP) {
  const th = useTheme();
  const L = 110,
    R = 970,
    T = 220,
    B = 1500;
  const side = (x: number, dir: 1 | -1) =>
    Array.from({ length: 11 }, (_, i) => {
      const y = 330 + i * 100;
      const s = easeOutCubic(seg(t, 0.9 + i * 0.07 + (dir === 1 ? 0 : 0.03), 0.4));
      return (
        <g key={`${x}-${i}`} transform={`translate(${x + dir * 52} ${y}) scale(${s})`} opacity={s}>
          <circle r={22} fill="none" stroke={th.line} strokeWidth={3} />
          <circle r={12} fill="none" stroke={th.faint} strokeWidth={2} />
        </g>
      );
    });
  const rot = t * 8;
  return (
    <g>
      <Draw d={rectPath(L, T, R - L, B - T)} t={t} start={0.1} dur={1.1} width={4} />
      {[
        [L, T],
        [R, T],
        [L, B],
        [R, B],
      ].map(([x, y], i) => (
        <Pop key={i} t={t} start={1.0 + i * 0.08} x={x} y={y}>
          <circle r={14} fill={th.accent} />
        </Pop>
      ))}
      <Draw
        d={toPath([
          [L, T],
          [R, T],
        ])}
        t={t}
        start={0.7}
        dur={0.8}
        stroke={th.accent}
        width={6}
      />
      {side(L, 1)}
      {side(R, -1)}
      {/* cincin pusat */}
      <g transform={`translate(${CX} 860)`}>
        <g transform={`rotate(${rot})`}>
          <Draw d={circlePath(0, 0, 330)} t={t} start={0.5} dur={1.2} stroke={th.faint} width={2} />
          <Draw d={circlePath(0, 0, 250)} t={t} start={0.7} dur={1.2} stroke={th.line} width={3} />
        </g>
        <Draw d="M-380 0 H380 M0 -380 V380" t={t} start={0.4} dur={1} stroke={th.faint} width={2} />
        <g transform={`scale(${2.4 * easeOutCubic(seg(t, 1.2, 0.6))})`} opacity={seg(t, 1.2, 0.3)}>
          <Coin r={60} />
        </g>
      </g>
      <Label x={L} y={B + 50} t={t} start={1.4} size={24}>
        SUMBER: RAKYAT / PAJAK / UTANG
      </Label>
      {/* title block */}
      <Draw d={rectPath(560, 1640, 410, 170)} t={t} start={1.0} dur={0.8} width={3} />
      <Draw
        d="M560 1700 H970 M560 1760 H970"
        t={t}
        start={1.4}
        dur={0.5}
        stroke={th.faint}
        width={2}
      />
      <Label x={580} y={1685} t={t} start={1.8} size={30} mono={false} weight={700}>
        {EPISODE.channel}
      </Label>
      <Label x={580} y={1745} t={t} start={2.0} size={24}>
        {EPISODE.code} / {EPISODE.title}
      </Label>
      <Label x={580} y={1795} t={t} start={2.2} size={22} fill={th.faint}>
        SKALA 1:1 — PLACEHOLDER
      </Label>
    </g>
  );
}

/* ----------------------------------------------------------------- 2. FLOW */
const PIPE_X = [170, 355, 540, 725, 910];
const pipePts = (x: number): Pt[] => [
  [x, 1580],
  [x, 1260],
  [CX + (x - CX) * 0.5, 1130],
  [CX + (x - CX) * 0.5, 980],
  [CX, 880],
  [CX, 560],
];

export function SceneFlow({ t }: SP) {
  const th = useTheme();
  const fill = easeInOutSine(seg(t, 1.6, 2.4));
  const tankX = 340,
    tankY = 230,
    tankW = 400,
    tankH = 330;
  return (
    <g>
      {/* tangki atas */}
      <Draw d={rectPath(tankX, tankY, tankW, tankH)} t={t} start={0.3} dur={0.9} width={4} />
      <clipPath id="tank-clip">
        <rect x={tankX} y={tankY} width={tankW} height={tankH} />
      </clipPath>
      <g clipPath="url(#tank-clip)">
        <rect
          x={tankX}
          y={tankY + tankH * (1 - fill)}
          width={tankW}
          height={tankH}
          fill={th.accent2}
          opacity={0.9}
        />
        <path
          d={`M${tankX} ${tankY + tankH * (1 - fill)} q 50 -14 100 0 t 100 0 t 100 0 t 100 0`}
          fill="none"
          stroke={th.paper}
          strokeWidth={3}
          opacity={fill > 0 ? 0.8 : 0}
        />
      </g>
      <Label x={CX} y={tankY - 24} anchor="middle" t={t} start={0.8} size={26}>
        PUNCAK / PEMILIK MODAL
      </Label>
      {/* pipa */}
      {PIPE_X.map((x, i) => (
        <Draw key={x} d={toPath(pipePts(x))} t={t} start={0.4 + i * 0.12} dur={1.0} width={4} />
      ))}
      {/* titik bawah */}
      {PIPE_X.map((x, i) => (
        <Pop key={`n${x}`} t={t} start={0.3 + i * 0.08} x={x} y={1620}>
          <circle r={34} fill={th.bg} stroke={th.line} strokeWidth={4} />
          <circle r={12} fill={th.line} />
        </Pop>
      ))}
      <Label x={CX} y={1730} anchor="middle" t={t} start={1.0} size={26}>
        BAWAH / PENDAPATAN
      </Label>
      {/* denyut aliran */}
      {PIPE_X.map((x, i) =>
        [0, 1, 2].map((k) => {
          const p = ((((t - 1.0 - i * 0.18) / 2.2 + k / 3) % 1) + 1) % 1;
          if (t < 1.0) return null;
          const [px, py] = polylinePoint(pipePts(x), p);
          return (
            <circle
              key={`${i}-${k}`}
              cx={px}
              cy={py}
              r={9}
              fill={th.accent2}
              filter={th.glow ? `url(#${glowFilterId})` : undefined}
            />
          );
        }),
      )}
      <Dimension a={[90, 1580]} b={[90, 560]} label="ARAH" t={t} start={1.2} />
      <Draw
        d="M90 640 l-22 40 M90 640 l22 40"
        t={t}
        start={1.9}
        dur={0.4}
        stroke={th.accent}
        width={5}
      />
    </g>
  );
}

/* ------------------------------------------------------------ 3. BUILDING */
export function SceneBuilding({ t }: SP) {
  const th = useTheme();
  const base = 1450;
  const colX = [210, 340, 470, 600, 730, 860];
  const topY = 760;
  // koin terbang dari kiri atas ke pintu
  const path: Pt[] = [
    [120, 330],
    [330, 280],
    [560, 520],
    [CX, 1180],
    [CX, 1330],
  ];
  const flight = easeInOutSine(seg(t, 1.8, 1.8));
  const [fx, fy] = polylinePoint(path, flight);
  const door = easeOutCubic(seg(t, 3.5, 0.6));
  return (
    <g>
      {/* tangga */}
      <Draw d={rectPath(130, base, 820, 60)} t={t} start={0.2} dur={0.6} width={4} />
      <Draw d={rectPath(170, base + 60, 740, 60)} t={t} start={0.35} dur={0.6} width={4} />
      <Draw d={rectPath(210, base + 120, 660, 60)} t={t} start={0.5} dur={0.6} width={4} />
      {/* kolom */}
      {colX.map((x, i) => (
        <g key={x}>
          <Draw
            d={rectPath(x - 36, topY, 72, base - topY)}
            t={t}
            start={0.5 + i * 0.1}
            dur={0.9}
            width={4}
          />
          <Draw
            d={`M${x - 14} ${topY} V${base} M${x + 14} ${topY} V${base}`}
            t={t}
            start={0.8 + i * 0.1}
            dur={0.9}
            stroke={th.faint}
            width={2}
          />
        </g>
      ))}
      {/* entablatur + atap segitiga */}
      <Draw d={rectPath(150, topY - 70, 780, 70)} t={t} start={1.0} dur={0.7} width={4} />
      <Draw
        d={`M150 ${topY - 70} L${CX} ${topY - 330} L930 ${topY - 70} Z`}
        t={t}
        start={1.2}
        dur={0.9}
        width={4}
      />
      <Draw
        d={circlePath(CX, topY - 170, 52)}
        t={t}
        start={1.8}
        dur={0.6}
        stroke={th.accent}
        width={5}
      />
      {/* bendera naik */}
      <Draw d={`M${CX} ${topY - 330} V${topY - 470}`} t={t} start={2.0} dur={0.5} width={4} />
      {t > 2.4 && (
        <path
          d={`M${CX} ${topY - 470} h${110 * easeOutCubic(seg(t, 2.4, 0.5))} v50 h-${110 * easeOutCubic(seg(t, 2.4, 0.5))} z`}
          fill={th.accent}
        />
      )}
      {/* pintu menyala saat koin tiba */}
      <rect
        x={CX - 70}
        y={base - 190}
        width={140}
        height={190 * door}
        fill={th.accent}
        opacity={0.9}
        transform={`translate(0 ${190 - 190 * door})`}
      />
      {/* koin dan jejak */}
      <Draw
        d={toPath(path)}
        t={t}
        start={1.6}
        dur={1.6}
        stroke={th.accent2}
        width={3}
        opacity={0.6}
      />
      {t > 1.8 && flight < 1 && (
        <g transform={`translate(${fx} ${fy})`}>
          <Coin r={34} />
        </g>
      )}
      <Dimension a={[100, base]} b={[100, topY - 330]} label="H" t={t} start={0.9} />
      <Dimension a={[150, base + 230]} b={[930, base + 230]} label="L" t={t} start={1.1} />
      <Label x={CX} y={1760} anchor="middle" t={t} start={2.4} size={26}>
        PINTU KEBIJAKAN
      </Label>
    </g>
  );
}

/* ------------------------------------------------------------------ 4. GRID */
function Icon({ kind, size = 56 }: { kind: number; size?: number }) {
  const th = useTheme();
  const s = size;
  const st = {
    fill: "none",
    stroke: th.line,
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  } as const;
  switch (kind % 6) {
    case 0:
      return (
        <g>
          <circle r={s * 0.6} {...st} />
          <circle r={s * 0.38} {...st} strokeWidth={2} />
        </g>
      );
    case 1:
      return (
        <g>
          <path
            d={`M${-s * 0.6} ${s * 0.6} V${-s * 0.1} L0 ${-s * 0.6} L${s * 0.6} ${-s * 0.1} V${s * 0.6} Z`}
            {...st}
          />
          <path d={`M${-s * 0.2} ${s * 0.6} V${s * 0.15} H${s * 0.2} V${s * 0.6}`} {...st} />
        </g>
      );
    case 2:
      return (
        <g>
          <path
            d={`M${-s * 0.6} ${-s * 0.35} H${s * 0.6} M0 ${-s * 0.6} V${s * 0.6} M${-s * 0.35} ${s * 0.6} H${s * 0.35}`}
            {...st}
          />
          <path
            d={`M${-s * 0.6} ${-s * 0.35} l${-s * 0.2} ${s * 0.4} h${s * 0.4} z M${s * 0.6} ${-s * 0.35} l${-s * 0.2} ${s * 0.4} h${s * 0.4} z`}
            {...st}
            strokeWidth={3}
          />
        </g>
      );
    case 3:
      return (
        <g>
          <path
            d={`M${-s * 0.5} ${s * 0.6} V${-s * 0.2} A${s * 0.5} ${s * 0.5} 0 0 1 ${s * 0.5} ${-s * 0.2} V${s * 0.6} Z`}
            {...st}
          />
        </g>
      );
    case 4:
      return (
        <g>
          <path
            d={`M${-s * 0.45} ${-s * 0.6} H${s * 0.2} L${s * 0.45} ${-s * 0.35} V${s * 0.6} H${-s * 0.45} Z`}
            {...st}
          />
          <path
            d={`M${-s * 0.25} ${-s * 0.1} H${s * 0.25} M${-s * 0.25} ${s * 0.15} H${s * 0.25} M${-s * 0.25} ${s * 0.4} H${s * 0.1}`}
            {...st}
            strokeWidth={3}
          />
        </g>
      );
    default:
      return (
        <g>
          <path
            d={`M${-s * 0.6} ${s * 0.5} L${-s * 0.4} ${-s * 0.3} L${-s * 0.15} ${s * 0.1} L0 ${-s * 0.55} L${s * 0.15} ${s * 0.1} L${s * 0.4} ${-s * 0.3} L${s * 0.6} ${s * 0.5} Z`}
            {...st}
          />
        </g>
      );
  }
}

export function SceneGrid({ t }: SP) {
  const th = useTheme();
  const cols = 4,
    rows = 8;
  const x0 = 180,
    dx = 240,
    y0 = 290,
    dy = 190;
  const cells: { x: number; y: number; i: number }[] = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) cells.push({ x: x0 + c * dx, y: y0 + r * dy, i: r * cols + c });
  const hi = 13; // ikon yang disorot
  const hiCell = cells[hi];
  // jaringan penghubung dari ikon sorot ke beberapa ikon lain
  const links = [5, 10, 17, 22, 8, 25];
  const zoom = 1 + 0.9 * easeInOutSine(seg(t, 2.2, 0.7));
  return (
    <g>
      {links.map((k, n) => {
        const a = hiCell,
          b = cells[k];
        return (
          <Draw
            key={k}
            d={`M${a.x} ${a.y} L${b.x} ${b.y}`}
            t={t}
            start={1.7 + n * 0.12}
            dur={0.6}
            stroke={th.accent}
            width={3}
            opacity={0.8}
          />
        );
      })}
      {cells.map(({ x, y, i }) => {
        const st = seg(t, 0.15 + i * 0.045, 0.35);
        if (st <= 0) return null;
        const isHi = i === hi;
        return (
          <g
            key={i}
            transform={`translate(${x} ${y}) scale(${(isHi ? zoom : 1) * easeOutCubic(st)})`}
            opacity={isHi ? 1 : 0.9 - 0.4 * seg(t, 2.2, 0.6)}
          >
            <circle
              r={isHi ? 78 : 70}
              fill={th.bg}
              stroke={isHi ? th.accent : th.faint}
              strokeWidth={isHi ? 5 : 2}
            />
            <Icon kind={i * 7 + (i % 3)} />
          </g>
        );
      })}
      <Callout
        from={[hiCell.x + 90, hiCell.y]}
        box={[hiCell.x > 600 ? 130 : 690, 1760, 260, 80]}
        t={t}
        start={2.6}
        text="POLA"
      />
    </g>
  );
}

/* --------------------------------------------------------------- 5. EMBLEM */
export function SceneEmblem({ t }: SP) {
  const th = useTheme();
  const S = 520,
    X = CX - S / 2,
    Y = 380;
  const cy = Y + S / 2;
  const filled = easeInOutSine(seg(t, 2.9, 0.8));
  const tilt = 6 * Math.sin(Math.max(0, t - 3.7) * 3) * Math.exp(-Math.max(0, t - 3.7) * 1.4);
  return (
    <g>
      {/* konstruksi */}
      <Draw d={circlePath(CX, cy, 420)} t={t} start={0.2} dur={1.4} stroke={th.faint} width={2} />
      <Draw d={circlePath(CX, cy, 330)} t={t} start={0.4} dur={1.4} stroke={th.faint} width={2} />
      <Draw
        d={`M${CX - 480} ${cy} H${CX + 480} M${CX} ${cy - 480} V${cy + 480}`}
        t={t}
        start={0.3}
        dur={1.1}
        stroke={th.faint}
        width={2}
      />
      <Draw
        d={roundRectPath(X, Y, S, S, 110)}
        t={t}
        start={0.6}
        dur={1.5}
        width={5}
        fillAfter={th.paper}
      />
      {/* ikon timbangan */}
      <g transform={`translate(${CX} ${cy}) rotate(${tilt})`} opacity={1}>
        <Draw
          d="M0 -170 V150 M-90 170 H90"
          t={t}
          start={1.6}
          dur={0.9}
          stroke={filled > 0.3 ? th.ink : th.line}
          width={9}
        />
        <Draw
          d="M-190 -110 H190"
          t={t}
          start={1.9}
          dur={0.7}
          stroke={filled > 0.3 ? th.ink : th.line}
          width={9}
        />
        <g>
          <Draw
            d="M-190 -110 L-250 10 M-190 -110 L-130 10"
            t={t}
            start={2.2}
            dur={0.5}
            stroke={filled > 0.3 ? th.ink : th.line}
            width={6}
          />
          <Draw
            d="M-270 10 H-110 A80 80 0 0 1 -270 10 Z"
            t={t}
            start={2.4}
            dur={0.5}
            stroke={th.accent}
            width={7}
            fill="none"
            fillAfter={th.accent}
          />
          <Draw
            d="M190 -110 L130 10 M190 -110 L250 10"
            t={t}
            start={2.2}
            dur={0.5}
            stroke={filled > 0.3 ? th.ink : th.line}
            width={6}
          />
          <Draw
            d="M110 10 H270 A80 80 0 0 1 110 10 Z"
            t={t}
            start={2.5}
            dur={0.5}
            stroke={th.accent2}
            width={7}
            fill="none"
            fillAfter={th.accent2}
          />
        </g>
      </g>
      <Dimension a={[X, Y - 80]} b={[X + S, Y - 80]} label="520" t={t} start={1.2} />
      <Dimension a={[X + S + 90, Y]} b={[X + S + 90, Y + S]} label="520" t={t} start={1.4} />
      <Label x={X - 30} y={Y - 110} t={t} start={1.8} size={30} fill={th.accent}>
        R110
      </Label>
      <Label
        x={CX}
        y={Y + S + 460}
        anchor="middle"
        t={t}
        start={3.2}
        size={44}
        mono={false}
        weight={700}
        fill={th.paper}
      >
        {EPISODE.channel}
      </Label>
    </g>
  );
}

/* ---------------------------------------------------------------- 6. OUTRO */
export function SceneOutro({ t }: SP) {
  const th = useTheme();
  const icon = easeOutCubic(seg(t, 0.1, 0.6));
  const spin = Math.max(0, t - 1.5) * 260;
  const loaded = seg(t, 1.5, 1.6);
  return (
    <g>
      <g transform={`translate(${CX} 520) scale(${icon})`}>
        <path d={roundRectPath(-210, -210, 420, 420, 90)} fill={th.paper} />
        <path
          d="M0 -120 V130 M-100 -20 H100 M-60 -90 H60"
          fill="none"
          stroke={th.ink}
          strokeWidth={10}
          strokeLinecap="round"
        />
        <circle cx={-120} cy={110} r={40} fill={th.accent} />
        <circle cx={120} cy={110} r={40} fill={th.accent2} />
      </g>
      <Draw d={roundRectPath(220, 1300, 640, 150, 36)} t={t} start={0.7} dur={0.8} width={4} />
      {t < 1.5 ? (
        <Draw
          d="M540 1340 V1410 M505 1378 L540 1412 L575 1378"
          t={t}
          start={1.0}
          dur={0.5}
          stroke={th.line}
          width={6}
        />
      ) : (
        <g transform={`translate(540 1375) rotate(${spin})`}>
          <path
            d="M-36 0 A36 36 0 1 1 0 36"
            fill="none"
            stroke={th.accent}
            strokeWidth={9}
            strokeLinecap="round"
          />
          <path d="M-52 -4 l16 -22 l16 22 z" fill={th.accent} />
        </g>
      )}
      <Dimension
        a={[220, 1540]}
        b={[860, 1540]}
        label={`${Math.round(lerp(0, 100, loaded))}%`}
        t={t}
        start={1.0}
      />
      <Label
        x={CX}
        y={1700}
        anchor="middle"
        t={t}
        start={2.2}
        size={64}
        mono={false}
        weight={700}
        fill={th.paper}
      >
        {EPISODE.channel}
      </Label>
      <Label x={CX} y={1765} anchor="middle" t={t} start={2.5} size={28}>
        {EPISODE.code} — SEGERA TAYANG
      </Label>
    </g>
  );
}

export const SCENE_COMPONENTS = {
  frame: SceneFrame,
  flow: SceneFlow,
  building: SceneBuilding,
  grid: SceneGrid,
  emblem: SceneEmblem,
  outro: SceneOutro,
} as const;
export { HEIGHT };

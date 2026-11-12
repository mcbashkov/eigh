import { easeInOutSine, easeOutBack, easeOutCubic, seg } from "./easing";
import { GlowDefs, glowFilterId } from "./primitives";
import { SCENE_COMPONENTS } from "./scenes";
import { HEIGHT, WIDTH, locate, type Word } from "./script";
import { FONT_DISPLAY, THEME_KK, ThemeContext, useTheme, type BlueprintTheme } from "./theme";

const REVEAL = 0.4; // durasi sapuan transisi antar scene (detik)

function Grid({ w = WIDTH, h = HEIGHT, t }: { w?: number; h?: number; t: number }) {
  const th = useTheme();
  return (
    <g opacity={0.9}>
      <defs>
        <pattern id="bp-minor" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M30 0H0V30" fill="none" stroke={th.faint} strokeWidth={0.8} opacity={0.22} />
        </pattern>
        <pattern id="bp-major" width="150" height="150" patternUnits="userSpaceOnUse">
          <path d="M150 0H0V150" fill="none" stroke={th.faint} strokeWidth={1.6} opacity={0.35} />
        </pattern>
      </defs>
      <rect width={w} height={h} fill="url(#bp-minor)" />
      <rect width={w} height={h} fill="url(#bp-major)" />
      {/* garis ukur kecil di tepi */}
      <rect x={0} y={((t * 12) % 150) - 150} width={w} height={2} fill={th.faint} opacity={0.12} />
    </g>
  );
}

function Caption({ word, local }: { word: Word | undefined; local: number }) {
  const th = useTheme();
  if (!word) return null;
  const age = local - word.at;
  const p = easeOutBack(seg(age, 0, 0.38));
  const color = word.tone === "kuasa" ? th.accent : word.tone === "kapital" ? th.accent2 : th.paper;
  const size = word.text.length > 8 ? 118 : 150;
  return (
    <g
      transform={`translate(${WIDTH / 2} 1090) scale(${0.82 + 0.18 * p})`}
      opacity={seg(age, 0, 0.12)}
    >
      <text
        textAnchor="middle"
        fontSize={size}
        fontWeight={700}
        style={{
          fontFamily: FONT_DISPLAY,
          letterSpacing: 6,
          paintOrder: "stroke",
          stroke: th.ink,
          strokeWidth: 16,
          strokeLinejoin: "round",
        }}
        fill={color}
        filter={th.glow ? `url(#${glowFilterId})` : undefined}
      >
        {word.text}
      </text>
    </g>
  );
}

/** Satu frame penuh sebagai fungsi murni waktu (detik). */
export function BlueprintVideo({
  time,
  theme = THEME_KK,
}: {
  time: number;
  theme?: BlueprintTheme;
}) {
  const { index, local, scene } = locate(time);
  const Scene = SCENE_COMPONENTS[scene.id];

  // kamera: push-in 7% dengan ease sine + napas kecil
  const prog = easeInOutSine(seg(local, 0, scene.dur));
  const zoom = 1 + 0.07 * prog;
  const bx = Math.sin(time * 1.3) * 3;
  const by = Math.cos(time * 1.7) * 3;
  const cam = `translate(${WIDTH / 2 + bx} ${HEIGHT / 2 + by}) scale(${zoom}) translate(${-WIDTH / 2} ${-HEIGHT / 2})`;

  // sapuan transisi (kecuali scene pertama): garis turun dan membuka scene baru
  const rev = index === 0 ? 1 : easeOutCubic(seg(local, 0, REVEAL));
  const revealY = HEIGHT * rev;

  let word: Word | undefined;
  for (const w of scene.words) if (local >= w.at) word = w;

  return (
    <ThemeContext.Provider value={theme}>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        width="100%"
        height="100%"
        style={{ display: "block", background: theme.bg }}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <GlowDefs />
          <radialGradient id="bp-vig" cx="50%" cy="46%" r="75%">
            <stop offset="55%" stopColor={theme.bg} stopOpacity={0} />
            <stop offset="100%" stopColor="#000" stopOpacity={0.22} />
          </radialGradient>
          <clipPath id="bp-reveal">
            <rect x={0} y={0} width={WIDTH} height={Math.max(revealY, 0.01)} />
          </clipPath>
        </defs>
        <rect width={WIDTH} height={HEIGHT} fill={theme.bg} />
        <g clipPath="url(#bp-reveal)">
          <rect width={WIDTH} height={HEIGHT} fill={theme.bg2} opacity={0.35} />
          <g transform={cam}>
            <Grid t={time} />
            <g filter={theme.glow ? `url(#${glowFilterId})` : undefined}>
              <Scene t={local} dur={scene.dur} />
            </g>
          </g>
          <Caption word={word} local={local} />
        </g>
        {index > 0 && rev < 1 && (
          <rect x={0} y={revealY - 3} width={WIDTH} height={6} fill={theme.accent} />
        )}
        <rect width={WIDTH} height={HEIGHT} fill="url(#bp-vig)" pointerEvents="none" />
      </svg>
    </ThemeContext.Provider>
  );
}

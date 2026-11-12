"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BlueprintVideo } from "@/lib/blueprint/BlueprintVideo";
import { TOTAL_DURATION } from "@/lib/blueprint/script";
import { THEMES } from "@/lib/blueprint/theme";

type ThemeKey = keyof typeof THEMES;

export default function BlueprintPlayer() {
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [theme, setTheme] = useState<ThemeKey>("kk");
  const last = useRef<number | null>(null);

  useEffect(() => {
    if (!playing) {
      last.current = null;
      return;
    }
    let raf = 0;
    const tick = (now: number) => {
      if (last.current !== null) {
        const dt = (now - last.current) / 1000;
        setTime((t) => (t + dt) % TOTAL_DURATION);
      }
      last.current = now;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const toggle = useCallback(() => setPlaying((p) => !p), []);

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-4 px-4 py-6">
      <div
        className="relative w-full overflow-hidden rounded-xl border border-white/10 shadow-2xl"
        style={{ aspectRatio: "9 / 16" }}
        onClick={toggle}
        role="button"
        aria-label={playing ? "Jeda animasi" : "Putar animasi"}
      >
        <BlueprintVideo time={time} theme={THEMES[theme]} />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggle}
          className="rounded-md border border-white/20 px-4 py-2 text-sm font-medium"
        >
          {playing ? "Jeda" : "Putar"}
        </button>
        <input
          type="range"
          min={0}
          max={TOTAL_DURATION}
          step={0.01}
          value={time}
          onChange={(e) => {
            setPlaying(false);
            setTime(Number(e.target.value));
          }}
          className="flex-1"
          aria-label="Posisi animasi"
        />
        <span className="w-20 text-right font-mono text-xs tabular-nums">
          {time.toFixed(1)} / {TOTAL_DURATION.toFixed(1)}s
        </span>
      </div>

      <div className="flex gap-2 text-sm">
        {(Object.keys(THEMES) as ThemeKey[]).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setTheme(k)}
            className={`rounded-md border px-3 py-1.5 ${
              theme === k ? "border-white bg-white/10" : "border-white/20"
            }`}
          >
            {k === "kk" ? "Palet Kuasa & Kapital" : "Palet cyan (referensi)"}
          </button>
        ))}
      </div>
    </div>
  );
}

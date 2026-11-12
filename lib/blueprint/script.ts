/**
 * Naskah & timing EP06. SEMUA teks di sini PLACEHOLDER: ganti dengan naskah
 * final (maks 12 kata di layar, tiap kata muncul sendiri seperti video referensi).
 * `at` = detik, relatif terhadap awal scene.
 */
export type Word = {
  at: number;
  text: string;
  tone?: "kuasa" | "kapital";
};

export type SceneId = "frame" | "flow" | "building" | "grid" | "emblem" | "outro";

export type SceneSpec = {
  id: SceneId;
  dur: number;
  words: Word[];
};

export const EPISODE = {
  channel: "KUASA & KAPITAL",
  code: "EP06",
  title: "ALIRAN KAPITAL", // placeholder
};

export const SCENES: SceneSpec[] = [
  {
    id: "frame",
    dur: 4.2,
    words: [
      { at: 0.5, text: "UANG" },
      { at: 2.0, text: "MENGALIR" },
    ],
  },
  {
    id: "flow",
    dur: 4.4,
    words: [
      { at: 0.4, text: "KE" },
      { at: 1.5, text: "ATAS" },
    ],
  },
  {
    id: "building",
    dur: 4.4,
    words: [
      { at: 0.4, text: "KUASA", tone: "kuasa" },
      { at: 1.8, text: "MENGIKUTI" },
    ],
  },
  {
    id: "grid",
    dur: 4.4,
    words: [
      { at: 0.4, text: "SEMUA" },
      { at: 1.6, text: "TERHUBUNG" },
    ],
  },
  {
    id: "emblem",
    dur: 5.0,
    words: [
      { at: 0.6, text: "KUASA", tone: "kuasa" },
      { at: 1.8, text: "&" },
      { at: 2.6, text: "KAPITAL", tone: "kapital" },
    ],
  },
  {
    id: "outro",
    dur: 3.6,
    words: [
      { at: 0.5, text: "EPISODE" },
      { at: 1.6, text: "ENAM" },
    ],
  },
];

export const TOTAL_DURATION = SCENES.reduce((a, s) => a + s.dur, 0);
export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

export function locate(time: number) {
  const t = Math.min(Math.max(time, 0), TOTAL_DURATION - 1e-6);
  let acc = 0;
  for (let i = 0; i < SCENES.length; i++) {
    if (t < acc + SCENES[i].dur) return { index: i, local: t - acc, scene: SCENES[i] };
    acc += SCENES[i].dur;
  }
  const last = SCENES.length - 1;
  return { index: last, local: SCENES[last].dur, scene: SCENES[last] };
}

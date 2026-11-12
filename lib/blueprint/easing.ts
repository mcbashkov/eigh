export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/** Progres 0..1 untuk segmen [start, start+dur] pada waktu t. */
export const seg = (t: number, start: number, dur: number) => clamp((t - start) / dur);

export const easeInOutSine = (x: number) => -(Math.cos(Math.PI * x) - 1) / 2;
export const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
export const easeInOutCubic = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
/** Overshoot kecil (~7%), untuk pop-in teks. */
export const easeOutBack = (x: number) => {
  const c1 = 0.9;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};

export const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

export type Pt = [number, number];

/** Titik pada polyline untuk progres p (0..1) menurut panjang busur. */
export function polylinePoint(pts: Pt[], p: number): Pt {
  const lens: number[] = [];
  let total = 0;
  for (let i = 1; i < pts.length; i++) {
    const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    lens.push(l);
    total += l;
  }
  let d = clamp(p) * total;
  for (let i = 0; i < lens.length; i++) {
    if (d <= lens[i] || i === lens.length - 1) {
      const k = lens[i] === 0 ? 0 : d / lens[i];
      return [lerp(pts[i][0], pts[i + 1][0], k), lerp(pts[i][1], pts[i + 1][1], k)];
    }
    d -= lens[i];
  }
  return pts[pts.length - 1];
}

export const toPath = (pts: Pt[]) => pts.map((p, i) => `${i ? "L" : "M"}${p[0]} ${p[1]}`).join(" ");

import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import BlueprintPlayer from "./BlueprintPlayer";

const oswald = Oswald({ subsets: ["latin"], weight: ["700"] });

export const metadata: Metadata = {
  title: "Blueprint EP06 — Kuasa & Kapital",
  description: "Animasi blueprint EP06 (versi web, SVG murni).",
};

export default function BlueprintPage() {
  return (
    // font Oswald dipasang lewat class pada pembungkus; SVG memakai nama font 'Oswald'
    <main className={oswald.className}>
      <BlueprintPlayer />
    </main>
  );
}

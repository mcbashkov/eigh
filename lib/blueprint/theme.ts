import { createContext, useContext } from "react";

export type BlueprintTheme = {
  name: string;
  bg: string;
  bg2: string;
  line: string; // garis utama blueprint
  faint: string; // grid / garis dimensi
  paper: string; // isi solid & teks
  ink: string;
  accent: string; // KUASA
  accent2: string; // KAPITAL
  glow: boolean;
};

/** Palet brand Kuasa & Kapital: navy + krem, aksen merah (kuasa) dan emas (kapital). */
export const THEME_KK: BlueprintTheme = {
  name: "kk",
  bg: "#141B34",
  bg2: "#1E2748",
  line: "#E8E2D4",
  faint: "#8F9BC0",
  paper: "#F3F2EE",
  ink: "#0B0B0B",
  accent: "#D7261E",
  accent2: "#B5932F",
  glow: false,
};

/** Palet mengikuti video referensi: biru blueprint dengan garis cyan neon. */
export const THEME_CYAN: BlueprintTheme = {
  name: "cyan",
  bg: "#06213B",
  bg2: "#0B3157",
  line: "#9BEBFF",
  faint: "#3E87B0",
  paper: "#EAFBFF",
  ink: "#03111F",
  accent: "#38D5FF",
  accent2: "#FFFFFF",
  glow: true,
};

export const THEMES = { kk: THEME_KK, cyan: THEME_CYAN } as const;

export const ThemeContext = createContext<BlueprintTheme>(THEME_KK);
export const useTheme = () => useContext(ThemeContext);

export const FONT_DISPLAY = "Oswald, 'Arial Narrow', Impact, sans-serif";
export const FONT_MONO = "'Courier New', ui-monospace, monospace";

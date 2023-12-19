import { Amiri, Figtree } from "next/font/google";

export const fontAmiri = Amiri({
  subsets: ["arabic"],
  display: "swap",
  adjustFontFallback: false,
  preload: false,
  style: ["normal"],
  weight: ["400", "700"],
  variable: "--font-amiri",
});

export const fontFigtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
  preload: false,
  style: ["normal"],
  weight: ["400", "700"],
  variable: "--font-figtree",
});

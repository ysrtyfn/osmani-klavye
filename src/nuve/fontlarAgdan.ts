import { Amiri, Figtree } from "next/font/google";

export const fontAmiri = Amiri({
  subsets: ["latin", "arabic"],
  display: "swap",
  style: ["normal"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  preload: true,
});

export const fontFigtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  style: ["normal"],
  weight: ["400", "700"],
  variable: "--font-figtree",
  preload: true,
});

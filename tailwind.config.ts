import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/takdim/sahneler/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/takdim/unsurlar/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      amiri: ["var(--font-amiri)"],
      figtree: ["var(--font-figtree)"],
    },
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        renkAlametYeşili: "#50dd8e",
        zümrüt: {
          "50": "#f0fdf5",
          "100": "#dcfce9",
          "200": "#bcf6d4",
          "300": "#87eeb4",
          "400": "#50dd8e",
          "500": "#24c36b",
          "600": "#18a154",
          "700": "#167f45",
          "800": "#17643a",
          "900": "#155232",
          "950": "#062d19",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;

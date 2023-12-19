import type { Metadata } from "next";
import { fontFigtree, fontAmiri } from "@/nuve/fontlarAgdan";
import "./globals.css";

export const metadata: Metadata = {
  title: "Osmani Klavye",
  description: "Osmanlı Türkçesi ile yazmak hazırlanmış klavye programıdır.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`${fontFigtree.variable} ${fontAmiri.variable} flex justify-center font-figtree`}>
        {children}
      </body>
    </html>
  );
}

import { ihtivaEdiyorMu, değiştirMevkidekiHarfi } from "@/nuve/aletler";
import { Metin } from "../nevler/Metin";

export const MetniTertipleVazifesi = (mevcutMetin: Metin): Metin => {
  let mevcutMuhteva = mevcutMetin.muhteva;

  for (let i = 0; i < mevcutMetin.muhteva.length; i++) {
    if (mevcutMetin.muhteva.charAt(i) === "ي") {
      if (i + 1 === mevcutMetin.muhteva.length) {
        mevcutMuhteva = değiştirMevkidekiHarfi(mevcutMuhteva, i, "ى");
      } else if (mevcutMetin.muhteva.charAt(i + 1) === ".") {
        mevcutMuhteva = değiştirMevkidekiHarfi(mevcutMuhteva, i, "ى");
      } else if (mevcutMetin.muhteva.charAt(i + 1) === "،") {
        mevcutMuhteva = değiştirMevkidekiHarfi(mevcutMuhteva, i, "ى");
      } else if (mevcutMetin.muhteva.charAt(i + 1) === ")") {
        mevcutMuhteva = değiştirMevkidekiHarfi(mevcutMuhteva, i, "ى");
      } else if (mevcutMetin.muhteva.charAt(i + 1) === "\u200C") {
        mevcutMuhteva = değiştirMevkidekiHarfi(mevcutMuhteva, i, "ى");
      } else if (mevcutMetin.muhteva.charAt(i + 1) === " ") {
        mevcutMuhteva = değiştirMevkidekiHarfi(mevcutMuhteva, i, "ى");
      }
    } else if (mevcutMetin.muhteva.charAt(i) === "ى" && i + 1 !== mevcutMetin.muhteva.length) {
      let tedkikHarfleri = [".", "،", ")", "\u200C", " "];
      if (!ihtivaEdiyorMu(tedkikHarfleri, mevcutMetin.muhteva.charAt(i + 1))) {
        mevcutMuhteva = değiştirMevkidekiHarfi(mevcutMuhteva, i, "ي");
      }
    }
  }

  const tertipliMetin: Metin = { muhteva: mevcutMuhteva };
  return tertipliMetin; // en dıştaki metin burada kullanılabilir, bu hali de makbul
};

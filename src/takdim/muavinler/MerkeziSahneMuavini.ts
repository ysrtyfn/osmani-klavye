import { useState } from "react";

import { Metin, alBoşMetni } from "@/ihtisas/nevler/Metin";
import { MetinMukavelesi } from "@/ihtisas/kalipMukaveleleri/MetinMukavelesi";
import { MetniKopyalaVazifesi, MetniTertipleVazifesi } from "@/ihtisas/vazifeler";
import { Harf } from "@/ihtisas/nevler/Harf";
import { latinidenOsmaniye } from "@/nuve/latinidenOsmaniye";

let ctrlBasiliMi = false;
let shiftBasiliMi = false;
let altBasiliMi = false;

export type MerkeziSahneMuaviniMukavelesi = {
  metin: Metin;
  metneHarfEkle: (harf: Harf) => void;
  metniSil: () => void;
  metniDeğiştir: (yeniMetin: Metin) => void;
  metniKopyala: () => void;
  metniTertiple: () => void;
  tuşaBasılınca: (hadise: KeyboardEvent) => void;
  tuşBırakılınca: (hadise: KeyboardEvent) => void;
};

export function MerkeziSahneMuavini(metinMukavelesi: MetinMukavelesi): MerkeziSahneMuaviniMukavelesi {
  const [metin, metniDeğiştir] = useState<Metin>(alBoşMetni());

  const metneHarfEkle = (harf: Harf) => {
    const harfEklenmişMetin = metinMukavelesi.ekleHarf(harf);
    metniDeğiştir(harfEklenmişMetin);
  };

  const metniSil = () => {
    const silinmişMetin = metinMukavelesi.silMetni();
    metniDeğiştir(silinmişMetin);
  };

  const metniKopyala = () => {
    MetniKopyalaVazifesi(metin);
  };

  const metniTertiple = () => {
    const tertipliMetin = MetniTertipleVazifesi(metin);
    metniDeğiştir(tertipliMetin);
  };

  const tuşaBasılınca = (hadise: KeyboardEvent) => {
    var tuşİsmi = hadise.key;
    // var code = hadise.code;

    if (tuşİsmi === "Space" || tuşİsmi === " ") {
      hadise.preventDefault();
    } else if (ctrlBasiliMi && tuşİsmi.toLocaleLowerCase() === "r") {
      hadise.preventDefault();
    } else if (ctrlBasiliMi && tuşİsmi.toLocaleLowerCase() === "a") {
      hadise.preventDefault();
    }

    if (tuşİsmi === "Backspace") {
      const harfSilinmişMetin = metinMukavelesi.silHarf();
      metniDeğiştir(harfSilinmişMetin);
    } else if (tuşİsmi === "Delete") {
      metniSil();
    } else if (tuşİsmi === "Control") {
      ctrlBasiliMi = true;
    } else if (tuşİsmi === "Shift") {
      shiftBasiliMi = true;
    } else if (tuşİsmi === "Alt") {
      altBasiliMi = true;
    } else {
      let öncekiHarf = metinMukavelesi.alSondakiHarfi();
      let harf = latinidenOsmaniye(tuşİsmi, öncekiHarf, ctrlBasiliMi, shiftBasiliMi, altBasiliMi);
      metneHarfEkle({ osmani: harf, latini: tuşİsmi });
    }
  };

  const tuşBırakılınca = (hadise: KeyboardEvent) => {
    hadise.preventDefault();

    var tuşİsmi = hadise.key;
    // var code = event.code;

    if (tuşİsmi === "Control") {
      ctrlBasiliMi = false;
    } else if (tuşİsmi === "Shift") {
      shiftBasiliMi = false;
    } else if (tuşİsmi === "Alt") {
      altBasiliMi = false;
    }
  };

  return {
    metin,
    metneHarfEkle,
    metniSil,
    metniDeğiştir,
    metniKopyala,
    metniTertiple,
    tuşaBasılınca,
    tuşBırakılınca,
  };
}

import { MetinMukavelesi } from "@/ihtisas/kalipMukaveleleri/MetinMukavelesi";
import { Harf } from "@/ihtisas/nevler/Harf";
import { Metin, alBoşMetni } from "@/ihtisas/nevler/Metin";

export class MetinTatbikati implements MetinMukavelesi {
  metin: Metin = alBoşMetni(); // metnin hakiki manada tek kaynağı burasıs

  alMetni(): Metin {
    return this.metin;
  }

  alSondakiHarfi(metin?: Metin): string {
    let harfAlınacakMetin = "";
    if (metin !== undefined) {
      harfAlınacakMetin = metin;
    } else {
      harfAlınacakMetin = this.metin;
    }

    if (harfAlınacakMetin.length > 1) {
      return harfAlınacakMetin.slice(-1);
    } else if (harfAlınacakMetin.length === 1) {
      return harfAlınacakMetin[0];
    }
    return "";
  }

  ekleHarf(harf: Harf): [Metin, number] {
    let öncekiHarf = this.alSondakiHarfi();
    let harfiOsmani = harf.osmani;

    if (öncekiHarf === "ا" && harfiOsmani === "ا") {
      this.metin = this.metin.slice(0, -1);
      // harfiOsmani = "آ";
      harfiOsmani = "\u0622";
    }
    // else if (harfiOsmani !== "" && harfiOsmani !== "-") {
    //   console.log("Bu harfi eklenmeli: " + harf);
    // }

    this.metin += harfiOsmani;
    return [this.metin, harfiOsmani.length];
  }

  ekleHarfiMevkiye(harf: Harf, mevkiBaşı: number): [Metin, number] {
    let metinİlkKısım = this.metin.slice(0, mevkiBaşı);
    const metinSonKısım = this.metin.slice(mevkiBaşı);
    let karetHareketMiktarı = harf.osmani.length;

    let öncekiHarf = this.alSondakiHarfi(metinİlkKısım);
    let harfiOsmani = harf.osmani;

    if (öncekiHarf === "ا" && harfiOsmani === "ا") {
      metinİlkKısım = metinİlkKısım.slice(0, -1);
      // harfiOsmani = "آ";
      harfiOsmani = "\u0622";
      karetHareketMiktarı = 0;
    }

    this.metin = [metinİlkKısım, harfiOsmani, metinSonKısım].join("");
    return [this.metin, karetHareketMiktarı];
  }

  ekleHarfiAraya(harf: Harf, mevkiBaşı: number, mevkiSonu: number): [Metin, number] {
    let metinİlkKısım = this.metin.slice(0, mevkiBaşı);
    const metinSonKısım = this.metin.slice(mevkiSonu);
    let karetHareketMiktarı = harf.osmani.length;

    let öncekiHarf = this.alSondakiHarfi(metinİlkKısım);
    let harfiOsmani = harf.osmani;

    if (öncekiHarf === "ا" && harfiOsmani === "ا") {
      metinİlkKısım = metinİlkKısım.slice(0, -1);
      // harfiOsmani = "آ";
      harfiOsmani = "\u0622";
      karetHareketMiktarı = 0;
    }

    this.metin = [metinİlkKısım, harfiOsmani, metinSonKısım].join("");
    return [this.metin, karetHareketMiktarı];
  }

  silHarf(): Metin {
    if (this.metin.endsWith("\u200C")) {
      this.metin = this.metin.slice(0, -2);
    } else {
      this.metin = this.metin.slice(0, -1);
    }
    return this.metin;
  }

  silHarfiMevkiden(mevkiBaşı: number, mevkiSonu: number): Metin {
    if (mevkiBaşı === mevkiSonu) {
      mevkiBaşı = mevkiBaşı - 1;
    }
    let metinİlkKısım = this.metin.slice(0, mevkiBaşı);
    const metinSonKısım = this.metin.slice(mevkiSonu);

    this.metin = [metinİlkKısım, metinSonKısım].join("");
    return this.metin;
  }

  silMetni(): Metin {
    this.metin = "";
    return this.metin;
  }

  değiştirMetni(yeniMetin: string): Metin {
    this.metin = yeniMetin;
    return this.metin;
  }
}

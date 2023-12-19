import { MetinMukavelesi } from "@/ihtisas/kalipMukaveleleri/MetinMukavelesi";
import { Harf } from "@/ihtisas/nevler/Harf";
import { Metin, alBoşMetni } from "@/ihtisas/nevler/Metin";

export class MetinTatbikati implements MetinMukavelesi {
  metin: Metin = alBoşMetni();

  alSondakiHarfi(): string {
    if (this.metin.muhteva.length > 1) {
      return this.metin.muhteva.slice(-1);
    } else if (this.metin.muhteva.length === 1) {
      return this.metin.muhteva[0];
    }
    return "";
  }

  ekleHarf(harf: Harf): Metin {
    let öncekiHarf = this.alSondakiHarfi();
    let harfiOsmani = harf.osmani;

    this.metin = { ...this.metin };

    if (öncekiHarf === "ا" && harfiOsmani === "ا") {
      this.metin.muhteva = this.metin.muhteva.slice(0, -1);
      harfiOsmani = "آ";
    }
    // else if (harfiOsmani !== "" && harfiOsmani !== "-") {
    //   console.log("Bu harfi eklenmeli: " + harf);
    // }

    this.metin.muhteva += harfiOsmani;
    return this.metin;
  }

  ekleHarfiMevkiye(harf: Harf, mevkiBaşı: number): Metin {
    this.metin = { ...this.metin };
    this.metin.muhteva = [
      this.metin.muhteva.slice(0, mevkiBaşı),
      harf.osmani,
      this.metin.muhteva.slice(mevkiBaşı),
    ].join("");
    return this.metin;
  }

  silHarf(): Metin {
    this.metin = { ...this.metin };
    if (this.metin.muhteva.endsWith("\u200C")) {
      this.metin.muhteva = this.metin.muhteva.slice(0, -2);
    } else {
      this.metin.muhteva = this.metin.muhteva.slice(0, -1);
    }
    return this.metin;
  }

  silHarfiMevkiden(mevkiBaşı: number, mevkiSonu: number): Metin {
    console.log(
      "🚀 ~ file: MetinTatbikati.ts:39 ~ MetinTatbikati ~ silHarfiMevkiden ~ silHarfiMevkiden:",
      "hazır değil",
    );
    return this.metin;
  }

  silMetni(): Metin {
    this.metin = { ...this.metin };
    this.metin.muhteva = "";
    return this.metin;
  }

  değiştirMetni(yeniMetin: string): Metin {
    this.metin = { ...this.metin };
    this.metin.muhteva = yeniMetin;
    return this.metin;
  }
}

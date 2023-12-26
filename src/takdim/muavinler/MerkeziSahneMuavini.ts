import { MetinMukavelesi } from "@/ihtisas/kalipMukaveleleri/MetinMukavelesi";
import { MetniKopyalaVazifesi, MetniTertipleVazifesi } from "@/ihtisas/vazifeler";
import { Harf } from "@/ihtisas/nevler/Harf";
import { latinidenOsmaniye } from "@/nuve/latinidenOsmaniye";
import { Metin } from "@/ihtisas/nevler/Metin";
import { MerkeziSahneMuaviniMukavelesi } from "./MerkeziSahneMuaviniMukavelesi";

export function MerkeziSahneMuavini(metinMukavelesi: MetinMukavelesi): MerkeziSahneMuaviniMukavelesi {
  const metneHarfEkle = (harf: Harf, seçiliKısımBaşı: number, seçiliKısımSonu: number): [Metin, number] => {
    let harfEklenmişMetin = metinMukavelesi.alMetni();
    let karetHareketMiktarı = 1;
    if (metinMukavelesi.alMetni().length === 0) {
      [harfEklenmişMetin, karetHareketMiktarı] = metinMukavelesi.ekleHarf(harf);
    } else if (seçiliKısımBaşı !== seçiliKısımSonu) {
      [harfEklenmişMetin, karetHareketMiktarı] = metinMukavelesi.ekleHarfiAraya(harf, seçiliKısımBaşı, seçiliKısımSonu);
    } else {
      [harfEklenmişMetin, karetHareketMiktarı] = metinMukavelesi.ekleHarfiMevkiye(harf, seçiliKısımBaşı);
    }
    return [harfEklenmişMetin, karetHareketMiktarı];
  };

  const metneMetinEkle = (eklenecekMetin: Metin, seçiliKısımBaşı: number, seçiliKısımSonu: number): [Metin, number] => {
    let metinEklenmişMetin = metinMukavelesi.alMetni();
    let karetHareketMiktarı = eklenecekMetin.length;
    if (metinMukavelesi.alMetni().length === 0) {
      [metinEklenmişMetin, karetHareketMiktarı] = metinMukavelesi.ekleMetin(eklenecekMetin);
      karetHareketMiktarı = metinEklenmişMetin.length;
    } else if (seçiliKısımBaşı !== seçiliKısımSonu) {
      [metinEklenmişMetin, karetHareketMiktarı] = metinMukavelesi.ekleMetniAraya(
        eklenecekMetin,
        seçiliKısımBaşı,
        seçiliKısımSonu,
      );
    } else {
      [metinEklenmişMetin, karetHareketMiktarı] = metinMukavelesi.ekleMetniMevkiye(eklenecekMetin, seçiliKısımBaşı);
    }
    return [metinEklenmişMetin, karetHareketMiktarı];
  };

  const metniSil = (): Metin => {
    const silinmişMetin = metinMukavelesi.silMetni();
    return silinmişMetin;
  };

  const metniKopyala = (): Metin => {
    const kopyalanmışMetin = MetniKopyalaVazifesi(metinMukavelesi.alMetni());
    return kopyalanmışMetin;
  };

  const metniTertiple = (): Metin => {
    const tertipliMetin = MetniTertipleVazifesi(metinMukavelesi.alMetni());
    return tertipliMetin;
  };

  const tuşaBasılınca = async (
    hadise: KeyboardEvent,
    seçiliKısımBaşı: number,
    seçiliKısımSonu: number,
  ): Promise<[Metin, number]> => {
    hadise.preventDefault(); // metinSahasının onChange metoduna mani oluyor. Tekrar çizme olmadığı için karet mevkisi değişmiyor.

    var tuşİsmi = hadise.key;
    // var code = hadise.code;

    let mevcutMetin = metinMukavelesi.alMetni();
    let karetHareketMiktarı = 0;
    if (tuşİsmi === "Backspace") {
      const harfSilinmişMetin = metinMukavelesi.silHarfiMevkiden(seçiliKısımBaşı, seçiliKısımSonu);
      return [harfSilinmişMetin, -1];
    } else if (tuşİsmi === "Delete") {
      const harfAdedi = mevcutMetin.length;
      const silinmişMetin = metniSil();
      return [silinmişMetin, -harfAdedi];
    } else if (tuşİsmi === "ArrowRight") {
      return [mevcutMetin, -1];
    } else if (tuşİsmi === "ArrowLeft") {
      return [mevcutMetin, 1];
    } else if (hadise.ctrlKey && tuşİsmi.toLowerCase() === "v") {
      const ilaveMetin = await navigator.clipboard.readText();

      // TODO metni araya ilave edemiyoruz, CTRL tıklanınca seçili kısım kaybediliyor
      return metneMetinEkle(ilaveMetin, seçiliKısımBaşı, seçiliKısımSonu);
    } else {
      const öncekiHarf = metinMukavelesi.alSondakiHarfi();
      const harfOsmani = latinidenOsmaniye(tuşİsmi, öncekiHarf, hadise.ctrlKey, hadise.shiftKey, hadise.altKey);
      if (harfOsmani.length === 0) {
        return [mevcutMetin, 0];
      }
      return metneHarfEkle({ osmani: harfOsmani, latini: tuşİsmi }, seçiliKısımBaşı, seçiliKısımSonu);
    }
  };

  const tuşBırakılınca = (hadise: KeyboardEvent) => {
    hadise.preventDefault();

    var tuşİsmi = hadise.key;
    // var code = event.code;
  };

  const tuşTıklanınca = (harf: Harf, seçiliKısımBaşı: number, seçiliKısımSonu: number) => {
    return metneHarfEkle(harf, seçiliKısımBaşı, seçiliKısımSonu);
  };

  return {
    // metneHarfEkle,
    metniSil,
    metniKopyala,
    metniTertiple,
    tuşaBasılınca,
    tuşBırakılınca,
    tuşTıklanınca,
  };
}

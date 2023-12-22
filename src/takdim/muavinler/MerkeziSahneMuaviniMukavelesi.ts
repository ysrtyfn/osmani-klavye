import { Harf } from "@/ihtisas/nevler/Harf";
import { Metin } from "@/ihtisas/nevler/Metin";

export type MerkeziSahneMuaviniMukavelesi = {
  // metneHarfEkle: (harf: Harf, seçiliKısımBaşı: number, seçiliKısımSonu: number) => Metin;
  metniSil: () => Metin;
  metniKopyala: () => Metin;
  metniTertiple: () => Metin;
  tuşaBasılınca: (hadise: KeyboardEvent, seçiliKısımBaşı: number, seçiliKısımSonu: number) => [Metin, number];
  tuşBırakılınca: (hadise: KeyboardEvent) => void;
  tuşTıklanınca: (harf: Harf, seçiliKısımBaşı: number, seçiliKısımSonu: number) => [Metin, number];
};

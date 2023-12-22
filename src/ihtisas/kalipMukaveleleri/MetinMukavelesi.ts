import { Harf } from "../nevler/Harf";
import { Metin } from "../nevler/Metin";

export interface MetinMukavelesi {
  ekleHarf(harf: Harf): Metin;
  ekleHarfiMevkiye(harf: Harf, mevkiBaşı: number): [Metin, number];
  ekleHarfiAraya(harf: Harf, mevkiBaşı: number, mevkiSonu: number): [Metin, number];

  alMetni(): Metin;
  alSondakiHarfi(): string;

  silHarf(): Metin;
  silHarfiMevkiden(mevkiBaşı: number, mevkiSonu: number): Metin;

  silMetni(): Metin;
  değiştirMetni(yeniMetin: string): Metin;
}

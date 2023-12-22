import { ClipboardCopy, PencilLine, X } from "lucide-react";
import { Toaster } from "sonner";

import { harfler, rakamlar, işaretler, noktalama } from "@/merkez/mutalar";

import { MerkeziSahneMuavini } from "@/takdim/muavinler/MerkeziSahneMuavini";
import MetinSahası from "@/takdim/unsurlar/MetinSahası";
import HarfTuşu from "@/takdim/unsurlar/HarfTuşu";
import { MetinTatbikati } from "@/iskele/kalipTatbikatlari/MetinTatbikati";
import { useEffect, useRef, useState } from "react";
import { Metin, alBoşMetni } from "@/ihtisas/nevler/Metin";
import { Harf } from "@/ihtisas/nevler/Harf";

const metinTatbikati = new MetinTatbikati();
const { metniSil, metniKopyala, metniTertiple, tuşaBasılınca, tuşBırakılınca, tuşTıklanınca } =
  MerkeziSahneMuavini(metinTatbikati);

export function MerkeziSahne() {
  const [metin, metniDeğiştir] = useState<Metin>(alBoşMetni());
  const metinSahasıİması = useRef<HTMLTextAreaElement>(null);
  const karetMevkisiİması = useRef<number>(0);

  const tuşTıklandığında = (harf: Harf) => {
    if (metinSahasıİması.current) {
      const [harfEklenmişMetin, karetHareketMiktarı] = tuşTıklanınca(
        harf,
        metinSahasıİması.current.selectionStart,
        metinSahasıİması.current.selectionEnd,
      );
      karetMevkisiİması.current = metinSahasıİması.current.selectionStart + karetHareketMiktarı;
      metniDeğiştir(harfEklenmişMetin);
    }
  };

  useEffect(() => {
    karetMevkisiİması.current = -1; // karetMevkisi buradan belirlendi ise bu sayı sıfıra eşit veya sıfırdan büyük olacaktır
  });

  return (
    <>
      <main className="mt-12 flex w-full flex-col justify-center gap-8 px-4 xl:max-w-screen-xl">
        <section className="flex">
          <MetinSahası
            ref={metinSahasıİması}
            metin={metin}
            karetMevkisi={karetMevkisiİması.current}
            metniDeğiştir={metniDeğiştir}
            tuşaBasılınca={tuşaBasılınca}
            tuşBırakılınca={tuşBırakılınca}
          />

          <section className="flex w-16 select-none flex-col items-center justify-end gap-1 ">
            <ClipboardCopy
              className="h-10 w-10 rounded bg-white p-1 shadow hover:bg-white/75"
              onClick={() => {
                const kopyalanmışMetin = metniKopyala();
                metniDeğiştir(kopyalanmışMetin);
              }}
            />
            <PencilLine
              className="h-10 w-10 rounded bg-white p-1 shadow hover:bg-white/75"
              onClick={() => {
                const tertipliMetin = metniTertiple();
                metniDeğiştir(tertipliMetin);
              }}
            />
            <X
              className="h-10 w-10 rounded bg-white p-1 shadow hover:bg-white/75"
              onClick={() => {
                const silinmişMetin = metniSil();
                metniDeğiştir(silinmişMetin);
              }}
            />
          </section>
        </section>

        <section className="flex select-none flex-row-reverse flex-wrap justify-center gap-2 ">
          {harfler.map((harf, ibre) => {
            return <HarfTuşu harf={harf} tıklanınca={tuşTıklandığında} key={"harf-tuşu-" + ibre} />;
          })}
        </section>

        <section className="flex select-none flex-row-reverse flex-wrap justify-center gap-2 ">
          {rakamlar.map((rakam, ibre) => {
            return <HarfTuşu harf={rakam} tıklanınca={tuşTıklandığında} key={"rakam-tuşu-" + ibre} />;
          })}
        </section>

        <section className="flex select-none flex-row-reverse flex-wrap justify-center gap-2 ">
          {noktalama.map((noktalama, ibre) => {
            return <HarfTuşu harf={noktalama} tıklanınca={tuşTıklandığında} key={"noktalama-tuşu-" + ibre} />;
          })}
        </section>

        <section className="flex select-none flex-row-reverse flex-wrap justify-center gap-2 ">
          {işaretler.map((işaret, ibre) => {
            return <HarfTuşu harf={işaret} tıklanınca={tuşTıklandığında} key={"işaret-tuşu-" + ibre} />;
          })}
        </section>
      </main>

      <Toaster richColors closeButton position="top-right" />
    </>
  );
}

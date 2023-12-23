import { ClipboardCopy, PencilLine, X } from "lucide-react";
import { Toaster } from "sonner";

import { MerkeziSahneMuavini } from "@/takdim/muavinler/MerkeziSahneMuavini";
import MetinSahası from "@/takdim/unsurlar/MetinSahası";
import { MetinTatbikati } from "@/iskele/kalipTatbikatlari/MetinTatbikati";
import { useEffect, useRef, useState } from "react";
import { Metin, alBoşMetni } from "@/ihtisas/nevler/Metin";
import { Harf } from "@/ihtisas/nevler/Harf";
import HarfTuşlarıKısmı from "../unsurlar/HarfTuşlarıKısmı";

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
      <main className="my-[5vh] flex w-full flex-col justify-center gap-8 px-4 xl:max-w-screen-xl">
        <section className="flex w-full justify-center">
          <MetinSahası
            ref={metinSahasıİması}
            metin={metin}
            karetMevkisi={karetMevkisiİması.current}
            metniDeğiştir={metniDeğiştir}
            tuşaBasılınca={tuşaBasılınca}
            tuşBırakılınca={tuşBırakılınca}
            className="h-[90vh] max-w-screen-lg rounded-md shadow"
          />

          <section className="flex w-16 select-none flex-col items-center justify-start gap-1 ">
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

        {/* <HarfTuşlarıKısmı tuşTıklanınca={tuşTıklandığında} /> */}
      </main>

      <Toaster richColors closeButton position="top-right" />
    </>
  );
}

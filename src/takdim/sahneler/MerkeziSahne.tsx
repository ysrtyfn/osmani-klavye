import { ClipboardCopy, Keyboard, PencilLine, X } from "lucide-react";
import { Toaster } from "sonner";

import { MerkeziSahneMuavini } from "@/takdim/muavinler/MerkeziSahneMuavini";
import MetinSahası from "@/takdim/unsurlar/MetinSahası";
import { MetinTatbikati } from "@/iskele/kalipTatbikatlari/MetinTatbikati";
import { useEffect, useRef, useState } from "react";
import { Metin, alBoşMetni } from "@/ihtisas/nevler/Metin";
import { Harf } from "@/ihtisas/nevler/Harf";
import HarfTuşlarıKısmı from "../unsurlar/HarfTuşlarıKısmı";
import useZir from "@/nuve/cengeller/useZir";
import { cn } from "@/nuve/aletler";

const metinTatbikati = new MetinTatbikati();
const { metniSil, metniKopyala, metniTertiple, tuşaBasılınca, tuşBırakılınca, tuşTıklanınca } =
  MerkeziSahneMuavini(metinTatbikati);

export function MerkeziSahne() {
  const [tuşlarAşikarMı, zirleTuşlarıAşikarMestur] = useZir(false);
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
      <main className="my-[5vh] flex min-h-[90vh] w-full max-w-screen-lg flex-col items-center justify-center px-2">
        <section className="flex h-[4rem] w-full select-none items-center justify-between gap-1 ">
          <Keyboard
            className="h-10 w-10 rounded bg-white p-1 shadow hover:bg-white/75"
            onClick={zirleTuşlarıAşikarMestur}
          />
          <div className="flex h-[4rem] w-full select-none items-center justify-end gap-1">
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
          </div>
        </section>

        <MetinSahası
          ref={metinSahasıİması}
          metin={metin}
          karetMevkisi={karetMevkisiİması.current}
          metniDeğiştir={metniDeğiştir}
          tuşaBasılınca={tuşaBasılınca}
          tuşBırakılınca={tuşBırakılınca}
          className={cn(
            "mb-5 w-full max-w-screen-lg grow rounded-md transition-all duration-300",
            // tuşlarAşikarMı ? " " : "",
          )}
        />

        {tuşlarAşikarMı && <HarfTuşlarıKısmı tuşTıklanınca={tuşTıklandığında} />}
      </main>

      <Toaster richColors closeButton position="top-right" />
    </>
  );
}

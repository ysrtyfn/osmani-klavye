import { ClipboardCopy, PencilLine, X } from "lucide-react";
import { Toaster } from "sonner";

import { useEffect } from "react";

import { harfler, rakamlar, işaretler, noktalama } from "@/merkez/mutalar";

import { Harf } from "@/ihtisas/nevler/Harf";

import { MerkeziSahneMuavini } from "@/takdim/muavinler/MerkeziSahneMuavini";

import MetinSahası from "@/takdim/unsurlar/MetinSahası";
import HarfTuşu from "@/takdim/unsurlar/HarfTuşu";
import { MetinTatbikati } from "@/iskele/kalipTatbikatlari/MetinTatbikati";

const metinTatbikati = new MetinTatbikati();

export function MerkeziSahne() {
  const { metin, metneHarfEkle, metniSil, metniDeğiştir, metniKopyala, metniTertiple, tuşaBasılınca, tuşBırakılınca } =
    MerkeziSahneMuavini(metinTatbikati);

  useEffect(() => {
    document.addEventListener("keydown", tuşaBasılınca, false);
    document.addEventListener("keyup", tuşBırakılınca, false);

    return () => {
      document.removeEventListener("keydown", tuşaBasılınca);
      document.removeEventListener("keyup", tuşBırakılınca);
    };
  }, []);

  const tuşTıklanınca = (harf: Harf) => {
    metneHarfEkle(harf);
  };

  return (
    <>
      <main className="mt-12 flex w-full flex-col justify-center gap-8 px-4 xl:max-w-screen-xl">
        <section className="flex">
          <MetinSahası metin={metin} metinDeğişince={metniDeğiştir} />

          <section className="flex w-16 select-none flex-col items-center justify-end gap-1 ">
            <ClipboardCopy className="h-10 w-10 rounded bg-white p-1 shadow hover:bg-white/75" onClick={metniKopyala} />
            <PencilLine className="h-10 w-10 rounded bg-white p-1 shadow hover:bg-white/75" onClick={metniTertiple} />
            <X className="h-10 w-10 rounded bg-white p-1 shadow hover:bg-white/75" onClick={metniSil} />
          </section>
        </section>

        <section className="flex select-none flex-row-reverse flex-wrap justify-center gap-2 ">
          {harfler.map((harf, ibre) => {
            return <HarfTuşu harf={harf} tıklanınca={tuşTıklanınca} key={"harf-tuşu-" + ibre} />;
          })}
        </section>

        <section className="flex select-none flex-row-reverse flex-wrap justify-center gap-2 ">
          {rakamlar.map((rakam, ibre) => {
            return <HarfTuşu harf={rakam} tıklanınca={tuşTıklanınca} key={"rakam-tuşu-" + ibre} />;
          })}
        </section>

        <section className="flex select-none flex-row-reverse flex-wrap justify-center gap-2 ">
          {noktalama.map((noktalama, ibre) => {
            return <HarfTuşu harf={noktalama} tıklanınca={tuşTıklanınca} key={"noktalama-tuşu-" + ibre} />;
          })}
        </section>

        <section className="flex select-none flex-row-reverse flex-wrap justify-center gap-2 ">
          {işaretler.map((işaret, ibre) => {
            return <HarfTuşu harf={işaret} tıklanınca={tuşTıklanınca} key={"işaret-tuşu-" + ibre} />;
          })}
        </section>
      </main>

      <Toaster richColors closeButton position="top-right" />
    </>
  );
}

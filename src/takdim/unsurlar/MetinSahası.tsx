import { ForwardedRef, RefObject, forwardRef, useEffect, useId, useRef, useState } from "react";
import MetinSahasıHususiyetleri from "./MetinSahasıHususiyetleri";
import { cn } from "@/nuve/aletler";

const MetinSahası = forwardRef(
  (
    { metin, karetMevkisi, metniDeğiştir, tuşaBasılınca, tuşBırakılınca, className }: MetinSahasıHususiyetleri,
    metinSahasıİması: ForwardedRef<HTMLTextAreaElement>,
  ) => {
    const [karetİbresi, değiştirKaretİbresini] = useState<number>(0); // mevki değişmediğinde metnin sonuna gidiyor, yeniden çizmeli
    const karetMevkisiİması = useRef<number>(0);
    const id_osmaniMetinSahası = useId();

    useEffect(() => {
      let tuşaBasılıncaÜst = (hadise: KeyboardEvent) => {
        const metinSahası: HTMLTextAreaElement = hadise.target as HTMLTextAreaElement;
        const seçiliKısımBaşı = metinSahası.selectionStart;
        const seçiliKısımSonu = metinSahası.selectionEnd;

        const [harfEklenmişMetin, karetHareketMiktarı] = tuşaBasılınca(hadise, seçiliKısımBaşı, seçiliKısımSonu);
        console.log("🚀 ~ file: MetinSahası.tsx:21 ~ useEffect ~ karetHareketMiktarı:", karetHareketMiktarı);
        karetMevkisiİması.current = seçiliKısımBaşı + karetHareketMiktarı;
        değiştirKaretİbresini((ibre) => ibre + 1);
        metniDeğiştir(harfEklenmişMetin);
      };

      const metinSahası: HTMLTextAreaElement = document.getElementById(id_osmaniMetinSahası) as HTMLTextAreaElement;
      metinSahası.focus();
      metinSahası.addEventListener("keydown", tuşaBasılıncaÜst, false);
      metinSahası.addEventListener("keyup", tuşBırakılınca, false);

      return () => {
        metinSahası.removeEventListener("keydown", tuşaBasılıncaÜst);
        metinSahası.removeEventListener("keyup", tuşBırakılınca);
      };
    }, [id_osmaniMetinSahası, metniDeğiştir, tuşBırakılınca, tuşaBasılınca]);

    useEffect(() => {
      const metinSahası: HTMLTextAreaElement = document.getElementById(id_osmaniMetinSahası) as HTMLTextAreaElement;

      if (karetMevkisi >= 0) {
        karetMevkisiİması.current = karetMevkisi;
      }
      metinSahası.focus();
      metinSahası.setSelectionRange(karetMevkisiİması.current, karetMevkisiİması.current);
    }, [id_osmaniMetinSahası, metin, karetİbresi, karetMevkisi]);

    return (
      <section className={cn(className, "flex flex-col justify-center")}>
        <label htmlFor={id_osmaniMetinSahası} className="mb-1 hidden pl-2 text-xl font-bold">
          Osmani Metin:
        </label>
        <textarea
          id={id_osmaniMetinSahası}
          ref={metinSahasıİması}
          className="h-full w-full resize-none rounded p-4 font-amiri text-3xl font-normal leading-relaxed focus:border-0 focus:outline-0"
          name="metin"
          dir="rtl"
          disabled={false}
          readOnly={false}
          value={metin}
          onChange={(hadise) => {
            // tuşBasmaya ekledeğimiz prevent default sebebiyle bu metod çağrılmıyor, bu sayede karet mevkisi muhafaza ediliyor
            console.log("🚀 ~ file: MetinSahası.tsx:65 ~ onChange:", "");
          }}
        />
      </section>
    );
  },
);

MetinSahası.displayName = "MetinSahası";
export default MetinSahası;

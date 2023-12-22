import { ForwardedRef, RefObject, forwardRef, useEffect, useId, useRef, useState } from "react";
import MetinSahasıHususiyetleri from "./MetinSahasıHususiyetleri";

const MetinSahası = forwardRef(
  (
    { metin, karetMevkisi, metniDeğiştir, tuşaBasılınca, tuşBırakılınca }: MetinSahasıHususiyetleri,
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
    }, []);

    useEffect(() => {
      const metinSahası: HTMLTextAreaElement = document.getElementById(id_osmaniMetinSahası) as HTMLTextAreaElement;

      if (karetMevkisi >= 0) {
        karetMevkisiİması.current = karetMevkisi;
      }
      metinSahası.focus();
      metinSahası.setSelectionRange(karetMevkisiİması.current, karetMevkisiİması.current);
    }, [metin, karetİbresi, karetMevkisi]);

    return (
      <div className="flex grow flex-col">
        <label htmlFor={id_osmaniMetinSahası} className="mb-1 pl-2 text-xl font-bold">
          Osmani Metin:
        </label>
        <textarea
          id={id_osmaniMetinSahası}
          ref={metinSahasıİması}
          className="rounded-md p-2 font-amiri text-4xl font-normal leading-relaxed"
          name="metin"
          rows={2}
          dir="rtl"
          disabled={false}
          readOnly={false}
          value={metin}
          onChange={(hadise) => {
            // tuşBasmaya ekledeğimiz prevent default sebebiyle bu metod çağrılmıyor, bu sayede karet mevkisi muhafaza ediliyor
            console.log("🚀 ~ file: MetinSahası.tsx:65 ~ onChange:", "");
          }}
        />
      </div>
    );
  },
);

export default MetinSahası;

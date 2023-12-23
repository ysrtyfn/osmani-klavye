import { Metin } from "@/ihtisas/nevler/Metin";
import { Dispatch, SetStateAction } from "react";

type MetinSahasıHususiyetleri = {
  metin: Metin;
  karetMevkisi: number;
  metniDeğiştir: Dispatch<SetStateAction<string>>;
  tuşaBasılınca: (hadise: KeyboardEvent, seçiliKısımBaşı: number, seçiliKısımSonu: number) => [Metin, number];
  tuşBırakılınca: (hadise: KeyboardEvent) => void;
  className: string;
};

export default MetinSahasıHususiyetleri;

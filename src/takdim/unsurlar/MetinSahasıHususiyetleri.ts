import { Metin } from "@/ihtisas/nevler/Metin";

type MetinSahasıHususiyetleri = {
  metin: Metin;
  metinDeğişince: (yeniMetin: Metin) => void;
};

export default MetinSahasıHususiyetleri;

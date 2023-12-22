import { toast } from "sonner";
import { MetniTertipleVazifesi } from "./MetniTertipleVazifesi";
import { Metin } from "../nevler/Metin";

export const MetniKopyalaVazifesi = (mevcutMetin: Metin): Metin => {
  const tertipliMetin = MetniTertipleVazifesi(mevcutMetin);

  navigator.clipboard.writeText(tertipliMetin).then(
    () => {
      toast.success("Kopyalandı.");
    },
    () => {
      toast.error("Kopyalanamadı!");
    },
  );

  return tertipliMetin;
};

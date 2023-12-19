import { Harf } from "@/ihtisas/nevler/Harf";

type HarfTuşuHususiyetleri = {
  harf: Harf;
  tıklanınca: (harf: Harf) => void;
};

export default HarfTuşuHususiyetleri;

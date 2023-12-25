import { Harf } from "@/ihtisas/nevler/Harf";

type HarfTuşuHususiyetleri = {
  harf: Harf;
  tıklanınca: (harf: Harf) => void;
  className?: string;
};

export default HarfTuşuHususiyetleri;

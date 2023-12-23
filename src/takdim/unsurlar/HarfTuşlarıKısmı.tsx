import { harfler, rakamlar, işaretler, noktalama } from "@/merkez/mutalar";
import HarfTuşu from "@/takdim/unsurlar/HarfTuşu";
import HarfTuşlarıKısmıHususiyetleri from "./HarfTuşlarıKısmıHususiyetleri";

const HarfTuşlarıKısmı = ({ tuşTıklanınca }: HarfTuşlarıKısmıHususiyetleri) => {
  return (
    <>
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
    </>
  );
};

export default HarfTuşlarıKısmı;

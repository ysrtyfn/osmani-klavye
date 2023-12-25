import { harfler, rakamlar, işaretler, noktalama } from "@/merkez/mutalar";
import HarfTuşu from "@/takdim/unsurlar/HarfTuşu";
import HarfTuşlarıKısmıHususiyetleri from "./HarfTuşlarıKısmıHususiyetleri";

const HarfTuşlarıKısmı = ({ tuşTıklanınca }: HarfTuşlarıKısmıHususiyetleri) => {
  return (
    <section className="flex flex-col gap-1">
      <div className="flex select-none flex-row-reverse flex-wrap justify-center gap-1">
        {harfler.map((harf, ibre) => {
          return <HarfTuşu harf={harf} tıklanınca={tuşTıklanınca} className="w-10 p-2" key={"harf-tuşu-" + ibre} />;
        })}
      </div>
      <div className="flex select-none flex-row-reverse flex-wrap justify-center gap-1">
        {rakamlar.map((rakam, ibre) => {
          return <HarfTuşu harf={rakam} tıklanınca={tuşTıklanınca} className="w-10 p-2" key={"rakam-tuşu-" + ibre} />;
        })}
      </div>
      <div className="flex select-none flex-row-reverse flex-wrap justify-center gap-1">
        {noktalama.map((noktalama, ibre) => {
          return (
            <HarfTuşu harf={noktalama} tıklanınca={tuşTıklanınca} className="w-10 p-2" key={"noktalama-tuşu-" + ibre} />
          );
        })}
      </div>
      <div className="flex select-none flex-row-reverse flex-wrap justify-center gap-1">
        {işaretler.map((işaret, ibre) => {
          return <HarfTuşu harf={işaret} tıklanınca={tuşTıklanınca} className="w-10 p-4" key={"işaret-tuşu-" + ibre} />;
        })}
      </div>
    </section>
  );
};

export default HarfTuşlarıKısmı;

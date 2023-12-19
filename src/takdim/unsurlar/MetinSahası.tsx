import { useId } from "react";
import MetinSahasıHususiyetleri from "./MetinSahasıHususiyetleri";
import { Metin } from "@/ihtisas/nevler/Metin";

const MetinSahası = ({ metin, metinDeğişince }: MetinSahasıHususiyetleri) => {
  const id_osmaniMetinSahası = useId();
  return (
    <div className="flex grow flex-col">
      <label htmlFor={id_osmaniMetinSahası} className="mb-1 pl-2 text-xl font-bold">
        Osmani Metin:
      </label>
      <textarea
        id={id_osmaniMetinSahası}
        className="rounded-md p-2 font-amiri text-4xl font-normal leading-relaxed"
        name="metin"
        rows={2}
        dir="rtl"
        disabled={false}
        value={metin.muhteva}
        onChange={(hadise) => {
          const metin: Metin = { muhteva: hadise.target.value };
          metinDeğişince(metin);
        }}
      />
    </div>
  );
};

export default MetinSahası;

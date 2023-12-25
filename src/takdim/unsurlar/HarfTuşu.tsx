"use client";

import { cn } from "@/nuve/aletler";
import HarfTuşuHususiyetleri from "@/takdim/unsurlar/HarfTuşuHususiyetleri";

const HarfTuşu = ({ harf, tıklanınca, className }: HarfTuşuHususiyetleri) => {
  return (
    // <div className="flex flex-col items-center justify-center">
    //   <h1 className="mb-1 text-xl">{harf.latini}</h1>
    //   <button
    //     onClick={() => tıklanınca(harf)}
    //     className="rounded bg-white font-amiri text-lg shadow sm:p-2 sm:text-2xl">
    //     {<>{harf.osmani}</>}
    //   </button>
    // </div>

    <button
      onClick={() => tıklanınca(harf)}
      className={cn(
        "rounded bg-white font-amiri text-lg shadow hover:bg-white/75 hover:shadow-sm sm:text-2xl",
        className,
      )}>
      {<>{harf.osmani}</>}
    </button>
  );
};

export default HarfTuşu;

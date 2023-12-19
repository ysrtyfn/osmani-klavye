"use client";

import HarfTuşuHususiyetleri from "@/takdim/unsurlar/HarfTuşuHususiyetleri";

const HarfTuşu = ({ harf, tıklanınca }: HarfTuşuHususiyetleri) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mb-1 text-xl">{harf.latini}</h1>
      <button
        onClick={() => tıklanınca(harf)}
        className="rounded-lg bg-zümrüt-200 px-3 py-0 font-amiri text-lg shadow-sm hover:shadow-md sm:px-4 sm:py-2 sm:text-3xl">
        {<>{harf.osmani}</>}
      </button>
    </div>
  );
};

export default HarfTuşu;

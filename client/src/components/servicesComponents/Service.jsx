import { Button } from "@nextui-org/react";

function Service() {
  return (
    <article
      className="flex border-2 border-slate-200 rounded-xl gap-4
     p-4"
    >
      <div className="w-1/6 h-[100px] rounded bg-slate-300"></div>
      <div className="flex flex-col gap-2 w-5/6">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">Corte de Cabello</h1>
          <div className="flex gap-2 items-center">
            <p className="text-green-500 font-semibold">Activo</p>
            <p className="font-semibold text-sm">{"4.5/5 ⭐ (112)"}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default Service;

import { Button } from "@nextui-org/react";

function Categories() {
  return (
    <article className="flex flex-col gap-4 items-center border-2 border-slate-200 rounded-xl p-4">
      <h1 className="text-xl font-bold">Categorias</h1>
      <ul className="flex flex-col gap-4 [&>li]:w-full [&>li]:py-2 [&>li]:font-semibold items-start p-2 w-full">
        <li className="border-b-2 border-slate-950">Barberia</li>
        <li className="text-slate-500">SPA de uñas</li>
        <li className="text-slate-500">Peluqueria</li>
      </ul>
      <Button className="font-semibold border-2 border-slate-200 rounded-xl bg-transparent">
        Añadir nueva
      </Button>
    </article>
  );
}

export default Categories;

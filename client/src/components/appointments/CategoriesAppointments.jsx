import { useState } from "react";

const categories = [
  {
    id: 0,
    name: "Todos",
  },
  {
    id: 1,
    name: "Barberia",
  },
  {
    id: 2,
    name: "SPA de uñas",
  },
  {
    id: 3,
    name: "SPA",
  },
  {
    id: 4,
    name: "Peluqueria",
  },
  {
    id: 5,
    name: "Maquillaje",
  },
];

function CategoriesAppointments() {
  const [categorySelected, setCategorySelected] = useState("Todos");
  return (
    <article className="flex gap-4 py-5 overflow-x-auto scrollbar scrollbar-thumb-slate-200  scrollbar-thumb-rounded-full scrollbar-track-rounded-full active:scrollbar-thumb-primary hover:scrollbar-thumb-slate-300 lg:pr-2">
      {categories.map((category) => (
        <button
          onClick={() => setCategorySelected(category.name)}
          className={`${
            category.name === categorySelected &&
            "bg-primary text-slate-950 border-transparent"
          } min-w-[200px] rounded-xl cursor-pointer text-xl font-bold border-2 px-6 py-3 border-slate-200`}
          key={category.id}
        >
          {category.name}
        </button>
      ))}
    </article>
  );
}

export default CategoriesAppointments;

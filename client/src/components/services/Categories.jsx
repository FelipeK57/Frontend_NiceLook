import { useState } from "react";
function Categories() {
  const categories = [
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

  const [categorySelected, setCategorySelected] = useState(0);

  const handleCategorySelected = (id) => {
    setCategorySelected(id);
  };

  return (
    <article className="flex flex-col items-center border-2 border-slate-200 rounded-xl p-4">
      <h1 className="text-xl font-bold">Categorias</h1>
      <ul className="mt-2 flex flex-col gap-4 [&>li]:w-full [&>li]:py-2 [&>li]:font-semibold items-start py-3 w-full">
        {categories.map((category) => (
          <li
            className={`${
              categorySelected === category.id
                ? "text-slate-950"
                : "text-slate-500"
            } hover:bg-slate-100 hover:text-slate-950 p-2 rounded-xl transition-all cursor-pointer`}
            onClick={() => handleCategorySelected(category.id)}
            key={category.id}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default Categories;

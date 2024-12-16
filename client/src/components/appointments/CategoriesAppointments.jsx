import { useState } from "react";
import PropTypes from "prop-types";
const categories = [
  {
    id: 0,
    name: "Todos",
  },
  {
    id: 1,
    name: "Barbería",
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
    name: "Peluquería",
  },
  {
    id: 5,
    name: "Maquillaje",
  },
  {
    id: 6,
    name: "Tatuajes",
  },
];

function CategoriesAppointments({ setCategory }) {
  const [categorySelected, setCategorySelected] = useState("Todos");
  const handleCategorySelected = (category) => {
    setCategory(category);
    setCategorySelected(category);
  };
  return (
    <article className="flex gap-4 py-3 overflow-x-auto scrollbar scrollbar-thumb-slate-200  scrollbar-thumb-rounded-full scrollbar-track-rounded-full active:scrollbar-thumb-primary hover:scrollbar-thumb-slate-300 lg:pr-2">
      {categories.map((category) => (
        <button
          onClick={() => handleCategorySelected(category.name)}
          className={`${
            category.name === categorySelected &&
            "bg-primary text-slate-950 border-transparent"
          } min-w-[150px] rounded-xl cursor-pointer flex items-center justify-center text-lg font-bold border-2 py-2 border-slate-200`}
          key={category.id}
        >
          {category.name}
        </button>
      ))}
    </article>
  );
}

CategoriesAppointments.propTypes = {
  setCategory: PropTypes.func,
};

export default CategoriesAppointments;

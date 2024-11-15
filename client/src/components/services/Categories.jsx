import { useState } from "react";
import PropTypes from "prop-types";
/**
 * Categories component renders a list of service categories.
 *
 * @component
 * @example
 * return (
 *   <Categories />
 * )
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @description
 * This component displays a list of categories such as "Barberia", "SPA de uñas", etc.
 * It allows the user to select a category, which will be highlighted.
 *
 * @function
 * @name Categories
 *
 * @property {Array<Object>} categories - Array of category objects.
 * @property {number} categories.id - Unique identifier for the category.
 * @property {string} categories.name - Name of the category.
 *
 * @property {number} categorySelected - State variable to track the selected category.
 * @property {function} setCategorySelected - Function to update the selected category.
 *
 * @property {function} handleCategorySelected - Function to handle the selection of a category.
 * @param {number} id - The id of the selected category.
 *
 * @returns {JSX.Element} The rendered component.
 */
function Categories({ setSelectCategory }) {
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
    }
  ];

  const [categorySelected, setCategorySelected] = useState("Todos");

  const handleCategorySelected = (name) => {
    setCategorySelected(name);
    setSelectCategory(name);
    console.log(categorySelected);
  };

  return (
    <article className="flex flex-col items-center border-2 border-slate-200 rounded-xl p-4">
      <h1 className="text-xl font-bold">Categorias</h1>
      <ul className="mt-2 flex flex-col gap-4 [&>li]:w-full [&>li]:py-2 [&>li]:font-semibold items-start py-3 w-full">
        {categories.map((category) => (
          <li
            className={`${
              categorySelected === category.name
                ? "text-slate-950 border-b-2 border-slate-950"
                : "text-slate-500"
            } hover:bg-slate-100 hover:text-slate-950 p-2 hover:rounded-sm cursor-pointer`}
            onClick={() => handleCategorySelected(category.name)}
            key={category.id}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </article>
  );
}

Categories.propTypes = {
  setSelectCategory: PropTypes.func,
};

export default Categories;

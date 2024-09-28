import { useState } from "react";
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
                ? "text-slate-950 border-b-2 border-slate-950"
                : "text-slate-500"
            } hover:bg-slate-100 hover:text-slate-950 p-2 rounded-sm cursor-pointer`}
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

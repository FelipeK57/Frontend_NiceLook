import { Select, SelectItem } from "@nextui-org/react";
import PropTypes from "prop-types";
import { useState } from "react";
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
  {
    id: 6,
    name: "Tatuajes",
  },
];

/**
 * SelectCategorie component renders a dropdown select element for categories.
 *
 * @component
 * @example
 * return (
 *   <SelectCategorie />
 * )
 *
 * @returns {JSX.Element} A dropdown select element with categories.
 *
 * @description
 * This component uses the `Select` and `SelectItem` components to create a dropdown menu.
 * It applies custom styles through the `className` and `classNames` props.
 * The `categories` array is mapped to generate the list of selectable items.
 */
function SelectCategorie({ category, setCategory, message, invalid }) {
  const selectCategory = (name) => {
    setCategory(name);
    console.log(name);
  };
  return (
    <Select
      labelPlacement="outside"
      placeholder="Selecciona la categoria"
      label="Categorias"
      defaultSelectedKeys={[category]}
      classNames={{
        label: "font-semibold text-xl",
        trigger: "p-5 border-2 border-slate-200 m-0",
      }}
      variant="bordered"
      isInvalid={invalid}
      errorMessage={message}
      className="m-0"
    >
      {categories.map((category) => (
        <SelectItem
          onClick={() => selectCategory(category.name)}
          key={category.name}
        >
          {category.name}
        </SelectItem>
      ))}
    </Select>
  );
}

SelectCategorie.propTypes = {
  category: PropTypes.string,
  setCategory: PropTypes.func,
  invalid: PropTypes.bool,
  message: PropTypes.string,
};

export default SelectCategorie;

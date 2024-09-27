import { Select, SelectItem } from "@nextui-org/react";

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

function SelectCategorie() {
  return (
    <Select
      labelPlacement="outside"
      placeholder="Selecciona la categoria"
      label="Categorias"
      className="max-w-sm"
      classNames={{
        label: "font-semibold text-medium lg:text-xl",
        trigger: "p-5",
        listboxWrapper: "max-h-[400px]",
      }}
      variant="bordered"
    >
      {categories.map((category) => (
        <SelectItem key={category.name}>{category.name}</SelectItem>
      ))}
    </Select>
  );
}

export default SelectCategorie;

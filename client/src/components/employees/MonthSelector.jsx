import { today } from "@internationalized/date";
import { Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";

export const months = [
  { id: 0, name: "Enero" },
  { id: 1, name: "Febrero" },
  { id: 2, name: "Marzo" },
  { id: 3, name: "Abril" },
  { id: 4, name: "Mayo" },
  { id: 5, name: "Junio" },
  { id: 6, name: "Julio" },
  { id: 7, name: "Agosto" },
  { id: 8, name: "Septiembre" },
  { id: 9, name: "Octubre" },
  { id: 10, name: "Noviembre" },
  { id: 11, name: "Diciembre" },
];

function MonthSelector({ setMonth, month }) {
  const [selectMonth, setSelectMonth] = useState(months[month].name);

  const handleSelectMonth = (month) => {
    setMonth(month.id);
    setSelectMonth(month.name);
    console.log(month.name);
  };

  return (
    <Select
      placeholder="Selecciona el mes"
      label="Mes"
      defaultSelectedKeys={[selectMonth]}
      classNames={{
        trigger: "p-5 border-2 border-slate-200 m-0",
      }}
      variant="bordered"
      className="m-0 w-[200px]"
    >
      {months.map((month) => (
        <SelectItem onClick={() => handleSelectMonth(month)} key={month.name}>
          {month.name}
        </SelectItem>
      ))}
    </Select>
  );
}

export default MonthSelector;

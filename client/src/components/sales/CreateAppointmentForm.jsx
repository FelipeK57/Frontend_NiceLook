import { Input } from "@nextui-org/input";
import ButtonCustom from "../global/ButtonCustom";
import { useState } from "react";
import SelectCategorie from "../services/SelectCategorie";
import { Select, SelectItem } from "@nextui-org/select";
import EmployeeAvailability from "./EmployeeAvailability";

function CreateAppointmentForm({ category, setCategory }) {
  const [client, setClient] = useState("");
  const [services, setServices] = useState([]);
  const [employee, setEmployee] = useState("");

  const handleSearchClient = () => {
    if (client === "") {
      alert("Por favor ingresa un cliente");
      return;
    }
    console.log(client);
  };

  return (
    <form className="grid gap-4">
      <div>
        <SelectCategorie setCategory={setCategory} />
      </div>
      <div className="flex flex-row gap-2 items-end">
        <Input
          classNames={{
            label: "font-semibold text-medium lg:text-xl",
            trigger: "p-5",
            inputWrapper: "py-5",
          }}
          value={client}
          onChange={(e) => setClient(e.target.value)}
          variant="bordered"
          id="searchClient"
          placeholder="Buscar cliente"
          label="Cliente"
          labelPlacement="outside"
        />
        <ButtonCustom
          classStyles={"py-5"}
          action={handleSearchClient}
          name="Buscar"
          secondary
        />
      </div>
      <div>
        <Select
          onChange={(e) => setServices(e)}
          isDisabled={category === "" ? true : false}
          variant="bordered"
          classNames={{
            label: "font-semibold text-medium lg:text-xl",
            trigger: "p-5",
            inputWrapper: "py-5",
          }}
          labelPlacement="outside"
          label="Servicio"
          selectionMode="multiple"
          placeholder="Selecciona un servicio"
        >
          <SelectItem value="1">Corte de cabello</SelectItem>
          <SelectItem value="2">Manicure</SelectItem>
        </Select>
      </div>
      <div>
        <Select
          onChange={(e) => setEmployee(e.target.value)}
          isDisabled={category === "" ? true : false}
          variant="bordered"
          classNames={{
            label: "font-semibold text-medium lg:text-xl",
            trigger: "p-5",
            inputWrapper: "py-5",
          }}
          label="Empleado"
          labelPlacement="outside"
          placeholder="Selecciona un empleado"
        >
          <SelectItem value="1">Juan Pérez</SelectItem>
        </Select>
      </div>
      <div>
        <p className="font-semibold text-medium lg:text-xl">Disponibilidad</p>
        {category === "" ? (
          <p className="font-light text-sm text-slate-600">Selecciona una categoría para ver la disponibilidad</p>
        ) : services.length === 0 ? (
          <p className="font-light text-sm text-slate-600">Selecciona al menos un servicio para conocer la disponibilidad</p>
        ) : employee === "" ? (
          <p className="font-light text-sm text-slate-600">Selecciona un profesional para conocer su disponibilidad</p>
        ) : 
          <EmployeeAvailability />        
        }
      </div>
    </form>
  );
}

export default CreateAppointmentForm;

import SelectCategorie from "../../components/services/SelectCategorie";
import ButtonCustom from "../../components/global/ButtonCustom";
import { Button, Input } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { useState } from "react";
import { Chip } from "@nextui-org/react";
import { DatePicker } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import { now, getLocalTimeZone } from "@internationalized/date";
import { Link } from "react-router-dom";
function ModalCreateAppointment({ isOpen, onClose }) {
  const [findClient, setFindClient] = useState("None");
  const [category, setCategory] = useState("None");
  const handleCreateAppointment = () => {
    console.log("Cita creada");
    setFindClient("Find");
  };

  const fecha = new Date();
  let year = fecha.getFullYear().toString();
  let month = (fecha.getMonth() + 1).toString();
  let day = fecha.getDate().toString();

  const [date, setDate] = useState(
    parseDate(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`)
  );

  return (
    <Modal size="3xl" backdrop="blur" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h1 className="text-4xl font-bold">Crear una cita</h1>
          <p className="text-slate-500 text-base font-medium">
            Por favor llena todos los campos
          </p>
        </ModalHeader>
        <ModalBody>
          {/* Service Name Input */}
          <div className="flex gap-4 items-center">
            <label
              className="font-semibold text-medium lg:text-xl"
              htmlFor="nameService"
            >
              Cliente
            </label>
            <Chip
              className={`font-light ${
                findClient === "Find"
                  ? "text-green-600 bg-green-100"
                  : findClient === "Not"
                  ? "text-red-500 bg-red-100"
                  : "bg-transparent"
              } text-sm`}
            >
              {findClient === "Find"
                ? "Lo hemos encontrado, puedes continuar 👍"
                : findClient === "Not"
                ? "No lo hemos encontrado, debes registrarlo 😐"
                : ""}
            </Chip>
            {findClient === "Not" && (
              <Link
                className="text-sm font-semibold text-slate-500 underline"
                target="_blank"
                to="/recepcionist/clients"
              >
                Registrar
              </Link>
            )}
          </div>
          <div className="flex items-center gap-4">
            <Input
              id="nameService"
              variant="bordered"
              classNames={{
                label: "",
                input: [],
                innerWrapper: "",
                inputWrapper: ["border-2", "border-slate-200", "px-6", "py-5"],
              }}
              placeholder="Ejemplo: juanperez@gmail.com"
            />
            <ButtonCustom
              action={handleCreateAppointment}
              classStyles={"py-5"}
              name="Buscar"
              secondary
            />
          </div>
          <div className="grid grid-cols-2 gap-6 items-end">
            <div className="flex flex-col gap-2">
              {/* Service Price Input */}
              <label
                className="font-semibold text-medium lg:text-xl"
                htmlFor="priceService"
              >
                Fecha y Hora
              </label>
              <DatePicker
                variant="bordered"
                hideTimeZone
                showMonthAndYearPickers
                minValue={now(getLocalTimeZone())}
                defaultValue={now(getLocalTimeZone())}
              />
            </div>
            <div className="flex flex-col gap-2">
              {/* Service Category Selector */}
              <SelectCategorie setCategory={setCategory} />
            </div>
          </div>
          <div className="grid grid-cols-[47%_53%] gap-6 items-end">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-medium lg:text-xl" htmlFor="nameService">
                Servicio
              </label>
              <Input
                id="nameService"
                variant="bordered"
                classNames={{
                  label: "",
                  input: [],
                  innerWrapper: "",
                  inputWrapper: ["border-2", "border-slate-200", "px-6", "py-5"],
                }}
                placeholder="Ejemplo: Corte de cabello"
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          {/* Modal Footer Buttons */}
          <Button color="danger" variant="light" onPress={onClose}>
            Cancelar
          </Button>
          <ButtonCustom name="Crear" primary />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalCreateAppointment;

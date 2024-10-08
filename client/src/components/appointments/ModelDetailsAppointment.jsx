import { Button, Input } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import ButtonCustom from "../global/ButtonCustom";
import SelectCategorie from "../services/SelectCategorie";

/**
 * ModalNewService component renders a modal for creating a new service.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Determines if the modal is open.
 * @param {Function} props.onClose - Function to call when the modal is closed.
 *
 * @returns {JSX.Element} The rendered modal component.
 */
function ModalDetailsAppointment({ isOpen, onClose }) {
  return (
    <Modal
      size="3xl"
      className="p-8"
      backdrop="blur"
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-yellow-500">Pendiente</h1>
          </div>
          <div className="flex justify-between">
            <div>
              <h1 className="text-4xl font-bold">Cita de Kevin Bolaños</h1>
              <p className="text-slate-700 text-xl font-base">
                Fecha: 07 Agosto 2024
              </p>
              <p className="text-slate-700 text-lg font-base">Hora: 20:30</p>
            </div>
            <button className="w-10 h-10 rounded-full border-2 border-slate-200 flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </button>
          </div>
          <div>
            <h1 className="text-xl font-bold">
              Metodos de contacto del cliente
            </h1>
            <p className="text-slate-700 text-base font-base">
              Correo Electronico: myemail@example.com
            </p>
            <p className="text-slate-700 text-base font-base">
              Telefono: 123456789
            </p>
          </div>
        </ModalHeader>
        <ModalBody className="grid grid-cols-2 gap-6">
          {/* Service Name Input */}
          <div className="flex flex-col gap-2">
            <label
              className="font-semibold text-medium lg:text-xl"
              htmlFor="nameService"
            >
              Profesional
            </label>
            <Input
              id="nameService"
              variant="underlined"
              value={"Fernando Castaño"}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="font-semibold text-medium lg:text-xl"
              htmlFor="nameService"
            >
              Servicio
            </label>
            <Input
              id="nameService"
              variant="underlined"
              value={"Corte de cabello"}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="font-semibold text-medium lg:text-xl"
              htmlFor="nameService"
            >
              Precio
            </label>
            <Input id="nameService" variant="underlined" value={"$15000"} />
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="font-semibold text-medium lg:text-xl"
              htmlFor="nameService"
            >
              Ganancia
            </label>
            <Input
              id="nameService"
              variant="underlined"
              value={"10% = $1500"}
            />
          </div>
        </ModalBody>
        <ModalFooter className="flex justify-between">
          {/* Modal Footer Buttons */}
          <Button color="default" variant="bordered" onPress={onClose}>
            Reagendar
          </Button>
          <ButtonCustom action={onClose} name="Terminar cita" primary />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalDetailsAppointment;

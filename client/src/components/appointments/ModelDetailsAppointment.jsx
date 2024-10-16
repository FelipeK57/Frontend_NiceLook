import { Button, Input } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import ButtonCustom from "../global/ButtonCustom";

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
  const boduDetails = [
    { item: "Profesional", value: "Fernando Castaño" },
    { item: "Servicios", value: "Corte de Cabello" },
    { item: "Costo", value: 15000 },
    { item: "Comision", value: 0.1 },
  ];
  const earning = 15000 * 0.1;
  return (
    <Modal
      size="3xl"
      className="p-6"
      backdrop="blur"
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-yellow-500">
              Pendiente
            </h1>
          </div>
          <div>
            <h1 className="text-4xl font-bold">Cita de Kevin Bolaños</h1>
            <p className="text-slate-700 text-xl font-base">
              Fecha: 07 Agosto 2024
            </p>
            <p className="text-slate-700 text-lg font-base">Hora: 20:30</p>
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
          {boduDetails.map((detail) => (
            <div flex flex-col gap-2 key={detail.item}>
              <label
                className="font-semibold text-medium lg:text-xl"
                htmlFor={`${detail.item}`}
              >
                {detail.item}
              </label>
              <Input
                isReadOnly
                id={`${detail.item}`}
                variant="underlined"
                value={`${
                  detail.item === "Comision"
                    ? detail.value * 100 + "% = " + earning
                    : detail.value
                }`}
              />
            </div>
          ))}
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

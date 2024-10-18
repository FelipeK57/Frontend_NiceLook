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
function ModalDetailsAppointment({ isOpen, onClose, state, date, time, artistName, client, clientEmail, clientPhone, price, commission, services }) {
  const boduDetails = [
    { item: "Profesional", value: artistName },
    { item: "Servicios", value: services },
    { item: "Costo", value: price },
    // { item: "Comision", commission },
  ];

  const getColorByServiceState = (state) => {
    switch (state) {
      case "Pendiente":
        return "text-yellow-500";
      case "Completada":
        return "text-green-500";
      case "Cancelada":
        return "text-red-500";
      default:
        return "text-slate-200";
    }
  };

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
            <h1
              className={`text-2xl font-semibold ${getColorByServiceState(
                state
              )}`}
            >
              {state}
            </h1>
          </div>
          <div>
            <h1 className="text-4xl font-bold">Cita de {client}</h1>
            <p className="text-slate-700 text-xl font-base">
              Fecha: {date}
            </p>
            <p className="text-slate-700 text-lg font-base">Hora: {time}</p>
          </div>
          <div>
            <h1 className="text-xl font-bold">
              Metodos de contacto del cliente
            </h1>
            <p className="text-slate-700 text-base font-base">
              Correo Electronico: {clientEmail}
            </p>
            <p className="text-slate-700 text-base font-base">
              Telefono: {clientPhone}
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
          {/* <Button
            color="default"
            variant="bordered"
            onPress={onClose}
          >
            Reagendar
          </Button>
          <ButtonCustom action={onClose} name="Terminar cita" primary /> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalDetailsAppointment;

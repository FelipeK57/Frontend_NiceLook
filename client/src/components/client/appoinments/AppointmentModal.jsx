/* eslint-disable react/prop-types */
import { useState } from "react";

import api from "@/api";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalFooter,
  Chip,
} from "@nextui-org/react";

import ButtonCustom from "@/components/global/ButtonCustom";

/**
 * Componente AppointmentModal
 *
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.isOpen - Indica si el modal está abierto
 * @param {function} props.onOpenChange - Función para cambiar el estado de apertura del modal
 * @param {Object} props.appointment - Objeto que contiene los detalles de la cita
 * @param {string} props.appointment.date - Fecha de la cita
 * @param {string} props.appointment.time - Hora de la cita
 * @param {Object} props.appointment.service - Objeto que contiene los detalles del servicio
 * @param {string} props.appointment.service.name - Nombre del servicio
 * @param {Object} props.appointment.professional - Objeto que contiene los detalles del profesional
 * @param {string} props.appointment.professional.first_name - Nombre del profesional
 * @param {string} props.appointment.professional.last_name - Apellido del profesional
 * @param {string} props.appointment.state - Estado de la cita
 *
 * @returns {JSX.Element} Modal con los detalles de la cita y opción para cancelarla
 */
export default function AppointmentModal({
  isOpen,
  onOpenChange,
  appointment,
}) {
  const [loading, setLoading] = useState(false);

  const handleCancelAppointment = async (e) => {
    console.log("entro");
    e.preventDefault();
    setLoading(true);

    await api
      .patch("api/appointment_change_state/", {
        id_appointment: appointment.id,
        state: "Cancelada",
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(setLoading(false));
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => onOpenChange(false)}
        backdrop="blur"
      >
        <ModalContent>
          <form onSubmit={handleCancelAppointment}>
            <ModalHeader>Detalles de la cita</ModalHeader>
            <ModalBody className="flex flex-col items-start text-sm">
              <p>Fecha: {appointment.date}</p>
              <p>Hora: {appointment.time}</p>
              <p>Servicio: {appointment.service?.name}</p>
              <p>
                Profesional: {appointment.professional.first_name}{" "}
                {appointment.professional.last_name}
              </p>
              <div className="flex h-max gap-2 items-center">
                <p>Estado:</p>
                <Chip color="warning" variant="flat" size="sm">
                  {appointment.state}
                </Chip>
              </div>
            </ModalBody>
            <ModalFooter>
              <ButtonCustom color="danger" type="submit" isLoading={loading}>
                Cancelar cita
              </ButtonCustom>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

/* eslint-disable react/prop-types */

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

import { useState } from "react";

import { toast } from "react-toastify";
import { format } from "date-fns";

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

export default function AppointmentModal({
  isOpen,
  onOpenChange,
  appointment,
}) {
  const [loading, setLoading] = useState(false);

  const handleCancelAppointment = async (e) => {
    setLoading(true);
    e.preventDefault();

    await api
      .patch("api/client_cancel_appointment/", {
        id_appointment: appointment.id,
      })
      .then((response) => {
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        onOpenChange(false);
        window.dispatchEvent(new Event("reloadAppointments"));
      })
      .catch((error) => {
        toast.error(error.response.data.error, {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .finally(setLoading(false));
  };

  // Formatear fecha y hora
  const formattedDate = appointment.date; // Ya viene en formato adecuado
  const formattedTime = format(new Date(`${appointment.time}`), "hh:mm a");

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
              <p>Fecha: {formattedDate}</p>
              <p>Hora: {formattedTime}</p>
              <div className="flex flex-wrap gap-2">
              <p>Servicio(s):</p>
                {appointment.services.map((service) => (
                  <Chip key={service.id} variant="flat" size="sm"
                  className="bg-tulip-tree-200 text-tulip-tree-950"
                  >
                    {service.name}
                  </Chip>
                ))}
              </div>
              <p>
                Profesional: {appointment.employee.user.first_name}{" "}
                {appointment.employee.user.last_name}
              </p>
              <div className="flex h-max gap-2 items-center">
                <p>Estado:</p>
                <Chip className="bg-tulip-tree-200 text-tulip-tree-950" variant="flat" size="sm">
                  {appointment.estate}
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

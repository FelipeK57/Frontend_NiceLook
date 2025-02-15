/**
 * Componente que representa una tarjeta de cita.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.appointment - Objeto que contiene la información de la cita.
 * @param {string} props.appointment.service?.name - Nombre del servicio de la cita.
 * @param {string} props.appointment.date - Fecha de la cita.
 * @param {string} props.appointment.time - Hora de la cita.
 * @returns {JSX.Element} Tarjeta de cita.
 */
/* eslint-disable react/prop-types */
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  useDisclosure,
} from "@nextui-org/react";

import { format } from "date-fns";

import AppointmentModal from "./AppointmentModal";

export default function AppointmentCard({ appointment }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const formattedTime = format(
    new Date(`${appointment.time}`),
    "hh:mm a"
  );
  return (
    <Card isPressable className="select-none w-full h-max" onPress={onOpen}>
      <CardHeader>
        {appointment.services.map((service) => (
          <h2 key={service.id} className="font-semibold text-lg">
            {service.name}
          </h2>
        ))}
      </CardHeader>
      <CardBody className="flex flex-col items-start text-sm">
        <p>Fecha: {appointment.date}</p>
        <p>Hora: {formattedTime}</p>
      </CardBody>
      <CardFooter>
        <AppointmentModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          appointment={appointment}
        />
      </CardFooter>
    </Card>
  );
}

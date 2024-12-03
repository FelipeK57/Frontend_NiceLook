/* eslint-disable react/prop-types */
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
  Chip,
  Skeleton,
} from "@nextui-org/react";

import ButtonCustom from "@/components/global/ButtonCustom";

import api from "@/api";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function AppointmentCard({ appointment }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <Card isPressable className="select-none w-full h-max" onPress={onOpen}>
      <CardHeader>
        <h2 className="font-semibold text-lg">{appointment.service?.name}</h2>
      </CardHeader>
      <CardBody className="flex flex-col items-start text-sm">
        <p>Fecha: {appointment.date}</p>
        <p>Hora: {appointment.time}</p>
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

function AppointmentModal({ isOpen, onOpenChange, appointment }) {
  const [loading, setLoading] = useState(false);

  const handleCancelAppointment = async (e) => {
    e.preventDefault;
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
            <ButtonCustom
              color="danger"
              action={handleCancelAppointment}
              loading={loading}
            >
              Cancelar cita
            </ButtonCustom>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default function CustomerAppointments() {
  const clientId = Cookies.get("client_id");
  const [fetching, setFetching] = useState(true);
  const [appointments, setAppointments] = useState([
    {
      service: {
        name: "Corte de cabello",
        length: 30,
      },
      date: "2022-10-10",
      time: "10:00",
      professional: { first_name: "Juan", last_name: "Pérez" },
      state: "Pendiente",
    },
  ]);

  useEffect(() => {
    const fetchAppointments = async () => {
      await api
        .get(`/client/client_appointments/${clientId}`)
        .then((response) => {
          console.log(response.data);
          // setAppointments(response.data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(setFetching(false));
    };

    fetchAppointments();
  }, [clientId]);

  return (
    <article className="mx-auto flex flex-col h-full w-full px-4 md:px-0 md:w-4/5 max-w-[1280px]">
      <header className="py-5">
        <h1 className="font-bold text-2xl">Citas</h1>
        <p>
          Aquí puedes ver tus citas programadas y cancelarlas si es necesario.
        </p>
      </header>
      <section className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {!fetching ? (
          appointments.length > 0 ? (
            appointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))
          ) : (
            <p className="text-neutral-600">No tienes citas programadas.</p>
          )
        ) : (
          <>
            <Skeleton height="200px" />
            <Skeleton height="200px" />
            <Skeleton height="200px" />
            <Skeleton height="200px" />
          </>
        )}
      </section>
    </article>
  );
}

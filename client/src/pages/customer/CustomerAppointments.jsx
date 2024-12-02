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
} from "@nextui-org/react";

import ButtonCustom from "@/components/global/ButtonCustom";

import api from "@/api";
import { useEffect } from "react";
import Cookies from "js-cookie";

function AppointmentCard() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <Card isPressable className="select-none w-full h-max" onPress={onOpen}>
      <CardHeader>
        <h2 className="font-semibold text-lg">Nombre del servicio</h2>
      </CardHeader>
      <CardBody className="flex flex-col items-start text-sm">
        <p>Fecha: 12/12/2021</p>
        <p>Hora: 12:00</p>
      </CardBody>
      <CardFooter>
        <AppointmentModal isOpen={isOpen} onOpenChange={onOpenChange} />
      </CardFooter>
    </Card>
  );
}

function AppointmentModal({ isOpen, onOpenChange }) {
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
            <p>Fecha: 12/12/2021</p>
            <p>Hora: 12:00</p>
            <p>Servicio: Nombre del servicio</p>
            <p>Profesional: Nombre del profesional</p>
            <div className="flex h-max gap-2 items-center">
              <p>Estado:</p>
              <Chip color="warning" variant="flat" size="sm">
                Pendiente
              </Chip>
            </div>
          </ModalBody>
          <ModalFooter>
            <ButtonCustom color="danger">Cancelar cita</ButtonCustom>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default function CustomerAppointments() {
  const clientId = Cookies.get("client_id");

  useEffect(() => {
    const fetchAppointments = async () => {
      await api
        .get(`/client/client_appointments/${clientId}`)
        .then((response) => {
          console.log(response.data);
        });
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
        {Array.from({ length: 5 }).map((_, index) => (
          <AppointmentCard key={index} />
        ))}
      </section>
    </article>
  );
}

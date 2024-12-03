import { Skeleton } from "@nextui-org/react";

import api from "@/api";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import AppointmentCard from "@/components/client/appoinments/AppointmentCard";

/**
 * Componente que muestra las citas del cliente.
 *
 * @component
 * @returns {JSX.Element} Un artículo que contiene las citas del cliente.
 *
 * @example
 * return (
 *   <CustomerAppointments />
 * )
 *
 * @description
 * Este componente obtiene las citas del cliente desde una API y las muestra en una lista.
 * Si no hay citas programadas, muestra un mensaje indicando que no hay citas.
 * Mientras se están cargando las citas, muestra un esqueleto de carga.
 *
 * @requires Cookies - Para obtener el ID del cliente desde las cookies.
 * @requires useState - Para manejar el estado de las citas y el estado de carga.
 * @requires useEffect - Para realizar la llamada a la API cuando el componente se monta.
 * @requires api - Para realizar la llamada a la API y obtener las citas del cliente.
 * @requires AppointmentCard - Componente para mostrar cada cita individualmente.
 * @requires Skeleton - Componente para mostrar el esqueleto de carga mientras se obtienen las citas.
 */
export default function CustomerAppointments() {
  const clientId = Cookies.get("client_id");
  const [fetching, setFetching] = useState(true);
  const [appointments, setAppointments] = useState([
    {
      id: 342564,
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

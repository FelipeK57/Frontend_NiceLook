import { DatePicker } from "@nextui-org/react";
import CategoriesAppointments from "../../components/appointments/CategoriesAppointments";
import AppointmentsList from "../../components/appointments/AppointmentsList";
import { useEffect, useState } from "react";
import { parseDate } from "@internationalized/date";
import axios from "axios";
import Cookies from "js-cookie";

function AppointmentsManagement() {
  const fecha = new Date();
  let year = fecha.getFullYear().toString();
  let month = (fecha.getMonth() + 1).toString();
  let day = fecha.getDate().toString();
  const [date, setDate] = useState(
    parseDate(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`)
  );

  const [appointments, setAppointments] = useState([]);
  const [groupedAppointments, setGroupedAppointments] = useState([]);

  const agruparCitasPorHora = (citas) => {
    const citasAgrupadas = new Map(); // Usamos un Map para mejor eficiencia de búsqueda/inserción

    citas.forEach((cita) => {
      // Obtener la hora en formato "HH:mm" directamente de UTC
      const horaUTC = new Date(cita.time).toISOString().slice(11, 16);

      // Si la hora no existe en el Map, la agregamos
      if (!citasAgrupadas.has(horaUTC)) {
        citasAgrupadas.set(horaUTC, {
          hora: horaUTC,
          citas: [],
        });
      }

      // Formatear la cita con los datos relevantes
      const citaFormateada = {
        id: cita.id,
        estilista: cita.employee.user.username, // Nombre del estilista
        cliente: cita.client.user.username, // Nombre del cliente
        servicio: cita.services.map((s) => s.name).join(", "), // Unir nombres de servicios
        precio: cita.payment.total, // Precio total
        tiempo: 30, // Tiempo estimado (puede variar)
        estado: cita.estate, // Estado de la cita
      };

      // Añadir la cita al grupo correspondiente
      citasAgrupadas.get(horaUTC).citas.push(citaFormateada);
    });

    // Convertir Map a array y ordenar por hora
    return Array.from(citasAgrupadas.values()).sort((a, b) =>
      a.hora.localeCompare(b.hora)
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const day = date.toDate().getDate();
      const month = date.toDate().getMonth() + 1;
      const year = date.toDate().getFullYear();
      console.log(day, month, year);

      try {
        const id = Cookies.get("establishmentId");
        // Realizar la solicitud POST a la API
        const response = await axios.post(
          "http://localhost:8000/api/appointment_list/",
          {
            id: id,
            day: day,
            month: month,
            year: year,
          }
        );
        console.log(response.data);
        // Guardar las citas obtenidas
        setAppointments(response.data);
        // Agrupar las citas por hora y actualizar el estado
        const citasAgrupadas = agruparCitasPorHora(response.data);
        setGroupedAppointments(citasAgrupadas);
        console.log(citasAgrupadas);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [date]);

  return (
    <main className="h-screen flex flex-col py-8 gap-2 px-10">
      <header className="flex items-center">
        <h1 className="text-2xl lg:text-4xl text-slate-950 font-bold w-full flex flex-grow justify-start">
          Calendario de citas
        </h1>
        <DatePicker
          value={date}
          onChange={setDate}
          label="Fecha"
          className="max-w-[280px] font-semibold"
          variant="bordered"
        />
      </header>
      <CategoriesAppointments />
      <section
        className="flex pb-6 gap-8 overflow-x-auto scrollbar scrollbar-thumb-slate-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full active:scrollbar-thumb-primary hover:scrollbar -thumb-slate-300"
        style={{ scrollbarGutter: "top" }}
      >
        {groupedAppointments.length === 0 ? (
          <p className="text-lg font-medium text-slate-500">
            No hay citas programadas para este día
          </p>
        ) : (
          groupedAppointments.map((groupedAppointment) => (
            <AppointmentsList
              key={groupedAppointment.hora}
              citas={groupedAppointment.citas}
              hora={groupedAppointment.hora}
            />
          ))
        )}
      </section>
    </main>
  );
}

export default AppointmentsManagement;

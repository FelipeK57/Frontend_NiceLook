import { DatePicker } from "@nextui-org/react";
import CategoriesAppointments from "../../components/appointments/CategoriesAppointments";
import AppointmentsList from "../../components/appointments/AppointmentsList";
import { useEffect, useState } from "react";
import { parseDate } from "@internationalized/date";
import api from "@/api";
import Cookies from "js-cookie";

function Appointments() {
  const fecha = new Date();
  let year = fecha.getFullYear().toString();
  let month = (fecha.getMonth() + 1).toString();
  let day = fecha.getDate().toString();

  const [date, setDate] = useState(
    parseDate(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`)
  );
  const [category, setCategory] = useState("Todos");
  const [groupedAppointments, setGroupedAppointments] = useState([]);
  const [allAppointments, setAllAppointments] = useState([]); // Para almacenar todas las citas

  const agruparCitasPorHora = (citas) => {
    const citasAgrupadas = new Map();

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
      const nombreEstilista =
        cita.employee.user.first_name + " " + cita.employee.user.last_name;
      const nombreCliente =
        cita.client.user.first_name + " " + cita.client.user.last_name;
      const citaFormateada = {
        id: cita.id,
        estilista: nombreEstilista, // Nombre del estilista
        cliente: nombreCliente, // Nombre del cliente
        servicio: cita.services.map((s) => s.name).join(", "), // Unir nombres de servicios
        categoria: cita.services.map((s) => s.category).join(", "), // Unir nombres de categorías
        precio: cita.total, // Precio total
        tiempo: 30, // Tiempo estimado (puede variar)
        estado: cita.estate, // Estado de la cita
        fecha: cita.date, // Fecha de la cita
        hora: cita.time, // Hora de la cita
        emailClient: cita.client.user.email, // Correo electrónico del cliente
        phoneClient: cita.client.phone, // Teléfono del cliente
        commission: cita.commission,
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

      await api
        .post("/api/appointment_list/", {
          id: Cookies.get("establishmentId"),
          day: day,
          month: month,
          year: year,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data && response.data.length > 0) {
            // Agrupar las citas por hora y actualizar el estado
            const citasAgrupadas = agruparCitasPorHora(response.data);
            setAllAppointments(citasAgrupadas); // Guardar todas las citas sin filtrar
            setGroupedAppointments(citasAgrupadas); // Actualizar citas mostradas
            console.log(citasAgrupadas);
          } else {
            // Si no hay citas, actualizar con un arreglo vacío
            setAllAppointments([]);
            setGroupedAppointments([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching data", error);
          setAllAppointments([]);
          setGroupedAppointments([]);
        })
        .finally(() => {
          console.log("Data fetched");
        });
    };

    fetchData();

    window.addEventListener("reloadAppointments", fetchData);

    return () => {
      window.removeEventListener("reloadAppointments", fetchData);
    };
  }, [date]);

  useEffect(() => {
    // Filtrar citas cuando cambia la categoría
    if (category === "Todos") {
      setGroupedAppointments(allAppointments); // Mostrar todas si la categoría es "Todos"
    } else {
      // Filtrar las citas que contienen la categoría seleccionada
      const citasFiltradas = allAppointments
        .map((grupo) => ({
          ...grupo,
          citas: grupo.citas.filter((cita) =>
            cita.categoria.includes(category)
          ),
        }))
        .filter((grupo) => grupo.citas.length > 0); // Solo grupos que tengan citas
      setGroupedAppointments(citasFiltradas);
    }
  }, [category, allAppointments]);

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
      <CategoriesAppointments setCategory={setCategory} />
      <section
        className="flex pb-6 gap-8 overflow-x-auto scrollbar scrollbar-thumb-slate-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full active:scrollbar-thumb-primary hover:scrollbar-thumb-slate-300"
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

export default Appointments;

import { useEffect, useState } from "react";
import { parseDate } from "@internationalized/date";
import axios from "axios";
import Cookies from "js-cookie";
import ProfessionalServices from "@/components/employeeServices/ProfessionalServices";
import EstablishmentServices from "@/components/employeeServices/EstablishmentServices";

function ServiceProfessional() {
  const fecha = new Date();
  let year = fecha.getFullYear().toString();
  let month = (fecha.getMonth() + 1).toString();
  let day = fecha.getDate().toString();

  const [date, setDate] = useState(
    parseDate(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`)
  );
  const [earnings, setEearnings] = useState(0);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const day = date.toDate().getDate();
      const month = date.toDate().getMonth() + 1;
      const year = date.toDate().getFullYear();
      try {
        const response = await axios.get(
          `http://localhost:8000/employee/history_appointments/${Cookies.get(
            "id_employee"
          )}/`,
          {
            params: {
              day: day,
              month: month,
              year: year,
            },
          }
        );
        console.log(response.data);
        if (response.data.appointments.length > 0) {
          setAppointments(response.data.appointments);
          setEearnings(response.data.earnings);
        }
      } catch (error) {
        setAppointments([]);
        setEearnings(0);
        console.error(error);
      }
    };
    fetchAppointments();
  }, [date]);
  return (
    <main className="h-screen grid gap-2 px-4 py-2 grid-rows-[auto_1fr] md:grid-rows-[auto_1fr_auto]">
      <header className="flex flex-col items-center gap-4 w-full md:flex-row">
        <h1 className="text-2xl lg:text-4xl text-slate-950 font-bold w-full flex flex-grow justify-start">
          Gestionar servicios
        </h1>
      </header>
      <main className="grid grid-rows-[1fr_1fr] py-2 gap-4">
        <section className="flex flex-col gap-4">
          <p className="font-semibold text-xl">Mis servicios</p>
          <ProfessionalServices />
        </section>
        <section className="flex flex-col gap-4">
          <p className="font-semibold text-xl">Servicios del establecimiento</p>
          <EstablishmentServices />
        </section>
      </main>
    </main>
  );
}

export default ServiceProfessional;

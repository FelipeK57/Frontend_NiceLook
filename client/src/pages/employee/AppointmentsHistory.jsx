import { DatePicker } from "@nextui-org/date-picker";
import { useEffect, useState } from "react";
import { parseDate } from "@internationalized/date";
import AppointmentsHistoryList from "./AppointmentsHistoryList";
import axios from "axios";
import Cookies from "js-cookie";

function AppointmentsHistory() {
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
          `${process.env.API_URL}/employee/history_appointments/${Cookies.get(
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
          Historial de citas
        </h1>
        <DatePicker
          value={date}
          onChange={setDate}
          label="Fecha"
          className="font-semibold md:max-w-[280px]"
          variant="bordered"
        />
      </header>
      <main className="flex flex-col gap-4 pb-2">
        <p className="md:hidden font-semibold text-xl mt-2 sm:mt-0">
          Ganancias del dia: ${earnings}
        </p>
        <div className="flex flex-row gap-4 justify-between bg-slate-300 p-2 rounded-3xl">
          <div className="flex items-center justify-center px-4 py-2 bg-[#ffffff] rounded-3xl">
            <p className="font-bold text-xl">Citas del dia</p>
          </div>
          <div className="flex items-center justify-center py-2 px-4 bg-[#ffffff] rounded-3xl">
            <p className="font-bold text-xl">{appointments.length}</p>
          </div>
        </div>
        <AppointmentsHistoryList history={appointments} />
      </main>
      <footer className="hidden md:block">
        <p className="font-semibold text-xl">Ganancias del dia: ${earnings}</p>
      </footer>
    </main>
  );
}

export default AppointmentsHistory;

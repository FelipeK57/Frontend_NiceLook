import MonthSelector from "@/components/employees/MonthSelector";
import ButtonCustom from "@/components/global/ButtonCustom";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

function TimesManagement() {
  const date = new Date().getMonth();
  const [month, setMonth] = useState(date);
  const [dayStates, setDayStates] = useState({});

  useEffect(() => {
    const fetchTimes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/times/${Cookies.get("id_employee")}`
        );

        const { exceptions, times } = response.data;
        console.log(exceptions, times);

        const days = {}; // Mapa para almacenar el estado de cada día

        // Procesar excepciones
        exceptions.forEach((exception) => {
          const date = exception.date_start;
          if (!days[date]) days[date] = { exception: true };
          else days[date].exception = true;
        });

        // Procesar horarios
        times.forEach((time) => {
          let currentDate = new Date(time.date_start);
          const endDate = new Date(time.date_end);

          while (currentDate <= endDate) {
            const dateStr = currentDate.toISOString().split("T")[0];
            if (!days[dateStr]) days[dateStr] = { schedule: true };
            else days[dateStr].schedule = true;

            currentDate.setDate(currentDate.getDate() + 1);
          }
        });

        // Marcar días mixtos
        Object.keys(days).forEach((date) => {
          if (days[date].exception && days[date].schedule) {
            days[date].mixed = true;
            delete days[date].exception;
            delete days[date].schedule;
          }
        });

        setDayStates(days);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTimes();
  }, []);

  return (
    <main className="grid grid-rows-[auto_1fr_auto] gap-4 py-2 px-6">
      <header className="flex flex-col gap-4 md:flex-row justify-between md:items-center">
        <h1 className="text-2xl lg:text-4xl text-slate-950 font-bold w-full">
          Gestión de agenda y disponibilidad
        </h1>
        <MonthSelector month={date} setMonth={setMonth} />
      </header>
      <section className="flex flex-col gap-2">
        <p className="text-lg lg:text-2xl font-semibold">Calendario del mes</p>
        <Calendar month2={month} dayStates={dayStates} />
      </section>
      <section className="flex flex-col gap-6">
        <div className="flex flex-row gap-6 flex-grow justify-between md:justify-start">
          <ButtonCustom primary name="Agregar horario" />
          <ButtonCustom variant="light" secondary name="Agregar excepción" />
        </div>
      </section>
    </main>
  );
}
const Calendar = ({ month2, dayStates }) => {
  const [monthInfo, setMonthInfo] = useState({
    month: null,
    year: null,
    daysInMonth: null,
    firstDayOfWeek: null,
  });

  const generateCalendar = () => {
    const { month, year, daysInMonth, firstDayOfWeek } = monthInfo;

    const calendar = [];
    let week = [];

    for (let i = 0; i < firstDayOfWeek; i++) {
      week.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      week.push(day);
      if (week.length === 7) {
        calendar.push(week);
        week = [];
      }
    }

    if (week.length > 0) {
      while (week.length < 7) {
        week.push(null);
      }
      calendar.push(week);
    }

    return calendar;
  };

  useEffect(() => {
    const currentDate = new Date();
    const month = month2;
    const year = currentDate.getFullYear();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const firstDayOfWeek = new Date(year, month, 1).getDay();

    setMonthInfo({
      month,
      year,
      daysInMonth,
      firstDayOfWeek,
    });
  }, [month2]);

  const calendar = monthInfo.daysInMonth ? generateCalendar() : [];

  const getDayClass = (day) => {
    if (!day) return "text-gray-400";
    const dateStr = `${monthInfo.year}-${String(monthInfo.month + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
    if (dayStates[dateStr]?.mixed) return "bg-yellow-400";
    if (dayStates[dateStr]?.exception) return "bg-red-400";
    if (dayStates[dateStr]?.schedule) return "bg-green-400";
    return "bg-white";
  };

  return (
    <div className="flex flex-col shadow rounded-2xl">
      <header>
        <article className="grid grid-cols-7 shadow rounded-t-2xl">
          {["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"].map(
            (day, index) => (
              <div
                key={index}
                className="last:border-0 last:rounded-tr-2xl first:rounded-tl-2xl flex items-center justify-center border-r-1 bg-slate-100 border-slate-200 py-2 md:py-6 font-semibold text-sm md:text-lg"
              >
                {day}
              </div>
            )
          )}
        </article>
      </header>
      <article>
        {calendar.map((week, index) => (
          <div key={index} className="grid grid-cols-7">
            {week.map((day, index) => (
              <div
                key={index}
                className={`last:border-r-0 border-r-1 px-2 py-2 md:py-6 2xl:py-10 border-t-1 font-semibold text-medium text-center`}
              >
                <p
                  className={`text-center rounded-full p-2 xl:w-1/4 xl:mx-auto ${getDayClass(
                    day
                  )}`}
                >
                  {day}
                </p>
              </div>
            ))}
          </div>
        ))}
      </article>
    </div>
  );
};

export default TimesManagement;

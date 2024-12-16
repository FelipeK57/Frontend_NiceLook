import MonthSelector from "@/components/employees/MonthSelector";
import ButtonCustom from "@/components/global/ButtonCustom";
import { AddException } from "@/components/schedule/AddException";
import { AddTimes } from "@/components/schedule/AddTimes";
import { DateNavbar } from "@/components/schedule/DateNavbar";
import { ViewDate } from "@/components/schedule/ViewDate";
import { Button, Tooltip } from "@nextui-org/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export const months = [
  { id: 0, name: "Enero" },
  { id: 1, name: "Febrero" },
  { id: 2, name: "Marzo" },
  { id: 3, name: "Abril" },
  { id: 4, name: "Mayo" },
  { id: 5, name: "Junio" },
  { id: 6, name: "Julio" },
  { id: 7, name: "Agosto" },
  { id: 8, name: "Septiembre" },
  { id: 9, name: "Octubre" },
  { id: 10, name: "Noviembre" },
  { id: 11, name: "Diciembre" },
];

function TimesManagement() {
  const dateMonth = new Date().getMonth();
  const dateYear = new Date().getFullYear();
  const [month, setMonth] = useState(dateMonth);
  const [year, setYear] = useState(dateYear);
  const [dayStates, setDayStates] = useState({});
  const [openTooltip, setOpenTooltip] = useState(false);

  useEffect(() => {
    const fetchTimes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/times/${Cookies.get("id_employee")}`
        );

        const { exceptions, times } = response.data;

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
  }, [month]);

  const handleNextMonth = () => {
    if (month !== 11) {
      setMonth(month + 1);
      return;
    }
    setMonth(0);
    setYear(year + 1);
    return;
  };

  const handlePreviousMonth = () => {
    if (month !== 0) {
      setMonth(month - 1);
      return;
    }
    setMonth(11);
    setYear(year - 1);
    return;
  };

  const handleOpenTooltip = () => setOpenTooltip(true);

  return (
    <main className="grid grid-rows-[auto_1fr] gap-4 2xl:gap-6 py-2 px-6 min-h-svh">
      <header className="flex gap-4 flex-row md:items-center">
        <h1 className="text-2xl lg:text-4xl text-slate-950 font-bold">
          Gestión de agenda y disponibilidad
        </h1>
        <Tooltip
          isOpen={openTooltip}
          onOpenChange={(open) => setOpenTooltip(open)}
          placement="bottom"
          content={
            <div className="max-w-[300px] px-2 py-1">
              <p>
                Aqui puedes gestionar tus horarios de trabajo y disponibilidad
                además de los dias con excepciones (ej: Calamidad domestica,
                Salud etc.).
              </p>
            </div>
          }
        >
          <Button
            onPress={() => handleOpenTooltip()}
            isIconOnly
            className="rounded-full"
            variant="bordered"
          >
            ?
          </Button>
        </Tooltip>
      </header>
      <section className="flex flex-col h-full items-center gap-4">
        <DateNavbar
          handlePreviousMonth={handlePreviousMonth}
          handleNextMonth={handleNextMonth}
          month={months[month].name}
          year={year}
        />
        <Calendar month2={month} year2={year} dayStates={dayStates} />
      </section>
    </main>
  );
}
const Calendar = ({ month2, year2, dayStates }) => {
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
    const month = month2;
    const year = year2;

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
    return "bg-transparent";
  };

  return (
    <>
      <div className="flex flex-col h-4/5 shadow rounded-2xl w-full">
        <header>
          <article className="grid grid-cols-7 shadow rounded-t-2xl">
            {["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"].map(
              (day, index) => (
                <div
                  key={index}
                  className="last:border-0 last:rounded-tr-2xl first:rounded-tl-2xl flex items-center justify-center border-r-1 bg-slate-50 border-slate-200 font-semibold text-sm py-4 md:text-lg"
                >
                  {day}
                </div>
              )
            )}
          </article>
        </header>
        <article
          className={`grid ${
            calendar.length <= 5 ? "grid-rows-5" : "grid-rows-6"
          } auto-rows-fr h-full`}
        >
          {calendar.map((week, index) => (
            <div key={index} className="grid grid-cols-7">
              {week.map((day, index) => (
                <div
                  key={index}
                  className={`last:border-r-0 border-r-1 border-t-1 flex justify-center items-center`}
                >
                  {day ? (
                    <ViewDate color={getDayClass(day)} day={day} />
                  ) : (
                    <p className="bg-transparent">{day}</p>
                  )}
                </div>
              ))}
            </div>
          ))}
        </article>
      </div>
      <section className="flex flex-col gap-6">
        <div className="flex flex-row gap-6 flex-grow justify-between md:justify-start">
          <AddTimes />
          <AddException />
        </div>
      </section>
    </>
  );
};

export default TimesManagement;

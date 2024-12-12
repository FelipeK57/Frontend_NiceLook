import MonthSelector from "@/components/employees/MonthSelector";
import ButtonCustom from "@/components/global/ButtonCustom";
import { useEffect, useState } from "react";

function TimesManagement() {
  const date = new Date().getMonth();
  const [month, setMonth] = useState(date);
  console.log(date);

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
        <Calendar month2={month} />
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

const Calendar = ({ month2 }) => {
  const [monthInfo, setMonthInfo] = useState({
    month: null,
    year: null,
    daysInMonth: null,
    firstDayOfWeek: null,
  });

  // Esta función genera el calendario
  const generateCalendar = () => {
    const { month, year, daysInMonth, firstDayOfWeek } = monthInfo;

    // Crear una matriz para las semanas del calendario
    const calendar = [];
    let week = [];

    // Primero, agregar los días antes del primer día del mes
    for (let i = 0; i < firstDayOfWeek; i++) {
      week.push(null); // Vacío antes del primer día
    }

    // Llenar los días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      week.push(day);
      if (week.length === 7) {
        calendar.push(week);
        week = [];
      }
    }

    // Si hay días restantes en la última semana (menos de 7 días), agregarla
    if (week.length > 0) {
      while (week.length < 7) {
        week.push(null); // Llenar el resto con null para completar la semana
      }
      calendar.push(week);
    }

    return calendar;
  };

  useEffect(() => {
    // Obtener la fecha actual
    const currentDate = new Date();
    const month = month2; // Mes actual (0-11)
    const year = currentDate.getFullYear(); // Año actual

    // Obtener el número de días en el mes
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Obtener el día de la semana del primer día del mes
    const firstDayOfWeek = new Date(year, month, 1).getDay(); // Día de la semana del primer día (0-6)

    // Establecer el estado con la información del mes
    setMonthInfo({
      month,
      year,
      daysInMonth,
      firstDayOfWeek,
    });
  }, [month2]);

  const calendar = monthInfo.daysInMonth ? generateCalendar() : [];

  return (
    <div className="flex flex-col shadow rounded-2xl">
      <header>
        {/* Dias de la semana */}
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
        {/* Calendario */}
        {calendar.map((week, index) => (
          <div key={index} className="grid grid-cols-7">
            {week.map((day, index) => (
              <div
                key={index}
                className={`last:border-r-0 border-r-1 px-2 py-2 md:py-6 2xl:py-10 border-t-1 font-medium text-medium text-center ${
                  day === null ? "text-gray-400" : "text-black"
                }`}
              >
                {day}
              </div>
            ))}
          </div>
        ))}
      </article>
    </div>
  );
};

export default TimesManagement;

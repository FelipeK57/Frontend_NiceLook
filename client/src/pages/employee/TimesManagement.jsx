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

const parseTimes = (data) => {
  const parsed = {};
  data.forEach((item) => {
    parsed[item.date] = {
      state: item.state,
      time: item.time,
      exception: item.exception,
    };
  });
  return parsed;
};

function TimesManagement() {
  const dateMonth = new Date().getMonth();
  const dateYear = new Date().getFullYear();
  const [month, setMonth] = useState(dateMonth);
  const [year, setYear] = useState(dateYear);
  const [dayStates, setDayStates] = useState({});
  const [openTooltip, setOpenTooltip] = useState(false);

  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchTimes = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/times/${Cookies.get("id_employee")}`
        );

        const times = response.data.times;
        console.log(times);
        const parsedTimes = parseTimes(times);
        setDayStates(parsedTimes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTimes();
  }, [month, reload]);

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
            className="rounded-full font-semibold text-xl"
            variant="bordered"
          >
            ?
          </Button>
        </Tooltip>
      </header>
      <section className="flex flex-col h-full justify-evenly items-center gap-4">
        <DateNavbar
          handlePreviousMonth={handlePreviousMonth}
          handleNextMonth={handleNextMonth}
          month={months[month].name}
          year={year}
        />
        <Calendar
          month2={month}
          year2={year}
          dayStates={dayStates}
          reload={reload}
          setReload={setReload}
        />
        <section className="flex flex-col gap-6">
          <div className="flex flex-row gap-6 flex-grow justify-between md:justify-start">
            <AddTimes reload={reload} setReload={setReload} />
            <AddException reload={reload} setReload={setReload} />
          </div>
        </section>
      </section>
    </main>
  );
}
const Calendar = ({ month2, dayStates, year2, reload, setReload }) => {
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

  const getColorClass = (date) => {
    const state = dayStates[date]?.state;

    switch (state) {
      case "Completa":
        return "bg-green-100";
      case "NoLaboral":
        return "bg-red-100";
      case "Mixta":
        return "bg-yellow-100";
      default:
        return "bg-transparent";
    }
  };

  const getBorderClass = (date) => {
    const state = dayStates[date]?.state;

    switch (state) {
      case "Completa":
        return "border-b-3 border-b-green-500";
      case "NoLaboral":
        return "border-b-3 border-b-red-500";
      case "Mixta":
        return "border-b-3 border-b-yellow-500";
      default:
        return "";
    }
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
          {calendar.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7">
              {week.map((day, dayIndex) => {
                const dateKey = `${year2}-${String(month2 + 1).padStart(
                  2,
                  "0"
                )}-${String(day).padStart(2, "0")}`;
                const colorClass = day ? getColorClass(dateKey) : "";
                const dataDay = dayStates[dateKey];

                return (
                  <div
                    key={dayIndex}
                    className={`border-r-1 last:border-r-0 border-t-1  ${getBorderClass(
                      dateKey
                    )} flex justify-center items-center ${getColorClass(
                      dateKey
                    )}`}
                  >
                    {day ? (
                      <ViewDate
                        month={months[month2].name}
                        year={year2}
                        monthKey={month2 + 1}
                        color={colorClass}
                        day={day}
                        dataDay={dataDay}
                        reload={reload}
                        setReload={setReload}
                      />
                    ) : null}
                  </div>
                );
              })}
            </div>
          ))}
        </article>
      </div>
    </>
  );
};

export default TimesManagement;

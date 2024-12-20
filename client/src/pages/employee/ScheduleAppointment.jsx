import { DatePicker } from "@nextui-org/date-picker";
import { useEffect, useState } from "react";
import { parseDate } from "@internationalized/date";
import AppointmentsHistoryList from "./AppointmentsHistoryList";
import axios from "axios";
import Cookies from "js-cookie";
import ScheduleModal from "@/components/appointmentsEmployee/ScheduleModal";
import ButtonCustom from "@/components/global/ButtonCustom";
import { useDisclosure } from "@nextui-org/react";
import { createEmployeeSchedule } from "@/Api/employee/employee";

function ScheduleAppointment() {
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
          `http://localhost:8000/employee/schedule_employee/${Cookies.get(
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

  const handleSaveSchedule = async (scheduleData) => {
    try {
      const response = await createEmployeeSchedule(employeeId, scheduleData);
      if (response.status === 201) {
        console.log("Horario guardado exitosamente:", response.data);
        onOpenChange(false);
      }
    } catch (error) {
      console.error(
        "Error al guardar el horario:",
        error.response?.data || error.message
      );
    }
  };

  const [employeeId, setEmployeeId] = useState(Cookies.get("id_employee"));
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <main className="h-screen grid gap-2 px-4 py-2 grid-rows-[auto_1fr] md:grid-rows-[auto_1fr_auto]">
      <header className="flex flex-col items-center gap-4 w-full md:flex-row">
        <h1 className="text-2xl lg:text-4xl text-slate-950 font-bold w-full flex flex-grow justify-start">
          Mi agenda
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
        {/* <ButtonCustom
          name="Gestionar Horario"
          classStyles={"sm:mt-0 mt-2 sm:max-w-[280px] text-lg"}
          primary
          onPress={onOpen}
        />
        <ScheduleModal
          isOpen={isOpen}
          onSave={handleSaveSchedule}
          onOpenChange={onOpenChange}
          employeeId={employeeId}
        /> */}
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
    </main>
  );
}

export default ScheduleAppointment;

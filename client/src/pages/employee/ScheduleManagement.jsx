import { useState, useEffect } from "react";
import {
  createEmployeeSchedule,
  getEmployeeSchedule,
} from "../../Api/employee/employee";
import ButtonCustom from "../../components/global/ButtonCustom";
import Day from "../../components/appointmentsEmployee/Day";
import ScheduleModal from "../../components/appointmentsEmployee/ScheduleModal";
import { DatePicker } from "@nextui-org/react";

import { useDisclosure } from "@nextui-org/react";
import dayjs from "dayjs";
import { parseDate } from "@internationalized/date";
import Cookies from "js-cookie";

const Agenda = () => {
  const fecha = new Date();
  let year = fecha.getFullYear().toString();
  let month = (fecha.getMonth() + 1).toString();
  let day = fecha.getDate().toString();

  const [date, setDate] = useState(
    parseDate(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`)
  );

  useEffect(() => {
    dayjs.locale("es");
  }, []);

  const selectDate = (e) => {
    setDate(e);
    handleDateChange(e);
  };

  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState(null);
  const [employeeId, setEmployeeId] = useState(Cookies.get("id_employee"));
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const fetchAppointments = (date) => {
    const year = date.year;
    const month = date.month;
    const day = date.day;
    console.log(year, month, day);

    const promise = new Promise((resolve, reject) => {
      const response = getEmployeeSchedule(employeeId, year, month, day);
      setTimeout(() => {
        resolve(response);
        reject("Ocurrio un error");
      }, 0);
    });

    promise.then((response) => {
      setAppointments(response.data);
      setError(null);
    });

    promise.catch((error) => {
      if (error) {
        if (error.response && error.response.status === 400) {
          setError(
            "Parámetros de fecha inválidos. Por favor verifica el año, mes y día."
          );
        } else if (error.response && error.response.status === 404) {
          setError("No hay citas pendientes para esta fecha.");
        } else {
          setError("Ocurrió un error al obtener las citas.");
        }
      }
    });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchAppointments(date);
  };

  useEffect(() => {
    fetchAppointments(selectedDate);
  }, [selectedDate]);

  // Nueva función para gestionar la acción de guardar en el modal

  const handleSaveSchedule = async (scheduleData) => {
    try {
      const response = await createEmployeeSchedule(employeeId, scheduleData);
      if (response.status === 201) {
        console.log("Horario guardado exitosamente:", response.data);
        fetchAppointments(selectedDate);
        onOpenChange(false);
      }
    } catch (error) {
      console.error(
        "Error al guardar el horario:",
        error.response?.data || error.message
      );
      alert(
        "Hubo un problema al guardar el horario: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-4">
        <h3 className="text-5xl text-[#252527] font-bold ml-4 p-4">
          Mi agenda
        </h3>
        <ButtonCustom
          name="Gestionar Horario"
          classStyles={"size-15 text-base left-8 border-gray-300"}
          secondary
          onPress={onOpen}
        />
        <div className="ml-auto">
          <DatePicker
            value={date}
            onChange={(e) => selectDate(e)}
            label="Fecha"
            className="max-w-[280px] font-semibold"
            variant="bordered"
          />
        </div>
      </div>

      <div className="flex relative pb-6 gap-8">
        <div className="flex flex-row gap-6 w-full overflow-auto scrollbar scrollbar-thumb-slate-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full active:scrollbar-thumb-primary hover:scrollbar-thumb-slate-300">
          {error ? (
            <p className="text-red-500 text-2xl ml-8">
              {"No hay citas pendientes"}
            </p>
          ) : (
            <Day
              day={day}
              date={date}
              appointments={appointments.appointments}
            />
          )}
        </div>
      </div>

      <ScheduleModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onSave={handleSaveSchedule}
        employeeId={employeeId} // Pasar el employeeId para cargar el horario
      />
    </div>
  );
};

export default Agenda;

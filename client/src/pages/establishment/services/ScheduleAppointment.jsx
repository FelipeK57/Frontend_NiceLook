/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Chip,
} from "@nextui-org/react";
import { DatePicker, TimeInput } from "@nextui-org/react";
import ButtonCustom from "@/components/global/ButtonCustom";
import EmployeeAvailability from "@/components/sales/EmployeeAvailability";
import {
  getLocalTimeZone,
  parseDate,
  today,
  Time,
} from "@internationalized/date";

import { useParams } from "react-router-dom";

import useAuthStore from "@/stores/useAuthStore";
import SuccessModal from "@/components/ui/SuccessModal";
import AuthModal from "@/components/auth/AuthModal";

import Cookies from "js-cookie";
import axios from "axios";
import ErrorModal from "@/components/ui/ErrorModal";

const ScheduleAppointment = ({
  services,
  servicesSelected,
  removeService,
  priceTotal,
  employee,
}) => {
  const { employeeId } = useParams();
  const { triggerAuthModal } = useAuthStore();
  const fecha = new Date();
  let year = fecha.getFullYear().toString();
  let month = (fecha.getMonth() + 1).toString();
  let day = fecha.getDate().toString();
  const [error, setError] = useState("");

  const [date, setDate] = useState(
    parseDate(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`)
  );
  const [time, setTime] = useState(
    new Time(fecha.getHours(), fecha.getMinutes())
  );

  const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false);

  const handleCloseSuccessModal = () => setIsModalSuccessOpen(false);
  const handleOpenSuccessModal = () => setIsModalSuccessOpen(true);

  const [isModalErrorOpen, setIsModalErrorOpen] = useState(false);

  const handleCloseErrorModal = () => setIsModalErrorOpen(false);
  const handleOpenErrorModal = () => setIsModalErrorOpen(true);

  const [loading, setLoading] = useState(false);

  const createAppointment = async () => {
    const day = date.toDate().getDate();
    const month = date.toDate().getMonth() + 1;
    const year = date.toDate().getFullYear();
    const hora = `${String(time.hour).padStart(2, "0")}:${String(
      time.minute
    ).padStart(2, "0")}`;
    console.log(servicesSelected, day, month, year, hora);
    try {
      if (servicesSelected.length === 0) {
        alert("Debes seleccionar al menos un servicio");
        return;
      }
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/create_appointment/",
        {
          cliente_id: Cookies.get("client_id"),
          employee_id: employeeId,
          services: servicesSelected,
          day: day,
          month: month,
          year: year,
          time: hora,
        }
      );
      console.log(response.data);
      setLoading(false);
      handleOpenSuccessModal();
    } catch (error) {
      setLoading(false);
      handleOpenErrorModal();
      handleOpenErrorModal();
      if (error.response) {
        // Error con respuesta del servidor
        setError(
          error.response.data.error ||
            "Ocurrió un error desconocido en el servidor."
        );
        console.error("Server error:", error.response);
      } else if (error.request) {
        // Error relacionado con la red o la solicitud
        setError(
          "No se pudo conectar con el servidor. Por favor, verifica tu conexión."
        );
        console.error("Network error:", error.request);
      } else {
        // Otro tipo de error
        setError("Ocurrió un error inesperado.");
        console.error("Unexpected error:", error.message);
      }
    }
  };

  const handleProtectedAction = () => {
    if (!Cookies.get("isAuthenticated")) {
      triggerAuthModal();
    } else {
      createAppointment();
    }
  };

  const minValueTime = () => {
    if (date.toDate().getDate() === fecha.getDate()) {
      return new Time(fecha.getHours(), fecha.getMinutes());
    } else {
      return new Time(0, 0);
    }
  };

  return (
    <Card variant="bordered" className="w-full h-fit">
      <CardHeader className="font-semibold text-lg">Agenda tu cita</CardHeader>
      <CardBody className=" flex flex-col gap-2 pt-0">
        <p className="font-semibold text-sm">Selecciona un día:</p>
        <DatePicker
          value={date}
          onChange={setDate}
          minValue={today(getLocalTimeZone())}
          defaultValue={today(getLocalTimeZone()).subtract({ days: 0 })}
        />
        <p className="font-semibold text-sm">Disponibilidad del artista</p>
        <EmployeeAvailability date={date} employee={employee} />
        <p className="font-semibold text-sm">Selecciona una hora:</p>
        <TimeInput
          minValue={minValueTime()}
          value={time}
          onChange={setTime}
          description="Formato 24 horas (00:00-23:59)"
        />
        <p className="font-semibold text-sm mt-2">Servicios seleccionados:</p>
        <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto">
          {services.length === 0 ? (
            <p className="text-sm text-slate-700">
              No has seleccionado ningún servicio, agrega uno para continuar.
            </p>
          ) : (
            services.map((service) => (
              <Chip
                key={service.id}
                onClose={() => removeService(service)}
                variant="light"
                classNames={{
                  base: "bg-tulip-tree-200",
                }}
                size="lg"
              >
                {service.service.name}
              </Chip>
            ))
          )}
        </div>
        {/* Modal de autenticación en caso de que no esté autenticado */}
        <AuthModal />
        {/* Modal de reserva exitosa*/}
        <SuccessModal
          isOpen={isModalSuccessOpen}
          onClose={handleCloseSuccessModal}
        />
        {/* Modal de error */}
        <ErrorModal
          isOpen={isModalErrorOpen}
          onClose={handleCloseErrorModal}
          error={error}
        />
        <p className="text-md mb-2 font-semibold">Total: ${priceTotal}</p>
      </CardBody>
      <CardFooter>
        {/* Botón de agendar cita */}
        <ButtonCustom
          isLoading={loading}
          action={handleProtectedAction}
          primary
          classStyles="self-center w-full"
          isDisabled={servicesSelected.length === 0}
        >
          Agendar cita
        </ButtonCustom>
      </CardFooter>
    </Card>
  );
};

export default ScheduleAppointment;

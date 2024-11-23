/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "@/api";

import useAuthStore from "@/stores/useAuthStore";
import SuccessModal from "@/components/ui/SuccessModal";
import {
  Chip,
  Card,
  CardBody,
  CardFooter,
  Image,
  DatePicker,
  TimeInput,
  Input,
  Skeleton,
  Button,
} from "@nextui-org/react";
import { ChevronLeft, Hotel, Image as ImageIcon, Search } from "lucide-react";
import ServiceCard from "@/components/services/ServiceCard";
import ButtonCustom from "@/components/global/ButtonCustom";
import ScheduleDisplay from "@/components/employees/ScheduleDisplay";
import api from "@/api";
import AuthModal from "@/components/auth/AuthModal";

import {
  getLocalTimeZone,
  parseDate,
  today,
  Time,
} from "@internationalized/date";
import Cookies from "js-cookie";
import axios from "axios";
import EmployeeAvailability from "@/components/sales/EmployeeAvailability";
import { set } from "react-hook-form";

function ScheduleAppointment({
  services,
  servicesSelected,
  removeService,
  priceTotal,
  employee,
}) {
  const { employeeId } = useParams();
  const { triggerAuthModal } = useAuthStore();
  const fecha = new Date();
  let year = fecha.getFullYear().toString();
  let month = (fecha.getMonth() + 1).toString();
  let day = fecha.getDate().toString();

  const [date, setDate] = useState(
    parseDate(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`)
  );
  const [time, setTime] = useState(
    new Time(fecha.getHours(), fecha.getMinutes())
  );

  const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false);

  const handleCloseSuccessModal = () => setIsModalSuccessOpen(false);
  const handleOpenSuccessModal = () => setIsModalSuccessOpen(true);

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
          //establishment: 2,
        }
      );
      console.log(response.data);
      handleOpenSuccessModal();
    } catch (error) {
      console.error("Error fetching data", error);
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
    <Card variant="bordered" className="w-full lg:w-72 h-fit rounded-xl">
      <CardBody className=" flex flex-col gap-2 p-4">
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
        <p className="font-semibold text-sm">Servicios seleccionados:</p>
        {/* <Input
          value={service}
          onChange={(e) => setService(e.target.value)}
          placeholder="Buscar servicio"
          classNames={{
            label: "",
            input: [],
            innerWrapper: "",
            inputWrapper: ["border-2", "border-slate-200", "px-4", "py-5"],
          }}
          variant="bordered"
          endContent={<Search />}
          description="Busca el servicio por nombre"
        /> */}
        {services.length === 0 ? (
          <p className="text-sm text-slate-700">
            No has seleccionado ningún servicio
          </p>
        ) : (
          services.map((service) => (
            <div className="flex flex-row justify-between items-center">
              <p key={service.id} className="text-sm">
                {service.name}
              </p>
              <Button
                onClick={() => removeService(service)}
                isIconOnly
                variant="light"
                size="sm"
                color="danger"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </Button>
            </div>
          ))
        )}
        {/* Modal de autenticación en caso de que no esté autenticado */}
        <AuthModal />
        {/* Modal de reserva exitosa*/}
        <SuccessModal
          isOpen={isModalSuccessOpen}
          onClose={handleCloseSuccessModal}
        />
        <p className="text-sm mb-2 font-semibold">
          Precio total: ${priceTotal}
        </p>
        {/* Botón de agendar cita */}
        <ButtonCustom
          action={handleProtectedAction}
          primary
          classStyles="self-center"
        >
          Agendar cita
        </ButtonCustom>
      </CardBody>
    </Card>
  );
}

export default function EmployeeProfile() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(true);
  const { employeeId } = useParams();
  const [servicesSelected, setServicesSelected] = useState([]);
  const [service, setService] = useState([]);
  const [priceTotal, setPriceTotal] = useState(0);
  const [times, setTimes] = useState([]);
  const [workingDays, setWorkingDays] = useState([]);

  const handleSelectService = (service) => {
    if (!servicesSelected.includes(service.id)) {
      setServicesSelected((prev) => [...prev, service.id]);
      setService((prev) => [...prev, service]);
      setPriceTotal((prev) => prev + service.price);
    }
  };

  const handleRemoveService = (service) => {
    setServicesSelected((prev) => prev.filter((id) => id !== service.id));
    setService((prev) => prev.filter((item) => item.id !== service.id));
    setPriceTotal((prev) => prev - service.price);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      await api
        .get("establisment/get_info_employee/", {
          params: {
            id_employee: employeeId,
          },
        })
        .then((response) => {
          setEmployee(response.data);
          setTimes(response.data.time);
          setWorkingDays(response.data.time.working_days);
        })
        .catch((error) => {
          console.error(error);
        })
        .then(() => {
          setLoading(false);
        });
    };

    fetchUserInfo();
  }, [employeeId]);

  const formattedDays = (days) => {
    const dayMap = {
      LUN: "Lunes",
      MAR: "Martes",
      MIE: "Miércoles",
      JUE: "Jueves",
      VIE: "Viernes",
      SAB: "Sábado",
      DOM: "Domingo",
    };
    const workDays = days.map((day) => dayMap[day] || day);
    return workDays.join(", ");
  };

  return (
    <>
      {/* Info del empleado y agendar servicio */}
      <article className="flex flex-col lg:grid grid-cols-[1fr,auto] justify-between gap-4 p-4">
        <section>
          <ButtonCustom
            variant="bordered"
            classStyles="mb-4 sticky top-32 bg-card z-40"
            action={() => navigate(-1)}
          >
            <ChevronLeft />
            Volver
          </ButtonCustom>
          <div className="grid gap-4 grid-cols-[auto,1fr]">
            {/* Imagen del empleado */}
            <div className="w-40 h-40 md:w-60 md:h-60 aspect-square rounded-xl overflow-hidden border-1 bg-neutral-100 flex items-center justify-center">
              {employee.image ? (
                <Image
                  src={employee.image}
                  alt="Imagen de perfil"
                  className="object-cover w-full h-auto"
                />
              ) : (
                <ImageIcon className="w-8 md:w-12 h-full text-neutral-400" />
              )}
            </div>

            {/* Info del empleado */}
            <div className="flex flex-col">
              {loading ? (
                <Skeleton className="flex rounded-full w-2/3 h-5 md:h-6 mb-2" />
              ) : (
                <h1 className="text-lg md:text-2xl font-bold mb-2">
                  {employee.first_name} {employee.last_name}
                </h1>
              )}
              <Chip variant="flat" color="success" className="mb-2 select-none">
                Disponible
              </Chip>
              <ScheduleDisplay timeData={employee.time} />
              <div className="flex flex-col text-neutral-600">
                <p>
                  Dias de trabajo:{" "}
                  {loading ? (
                    <Skeleton className="flex rounded-full w-2/3 h-5 md:h-6 mb-2" />
                  ) : (
                    formattedDays(workingDays)
                  )}
                </p>
                <p>
                  Jornada 1:{" "}
                  {loading ? (
                    <Skeleton />
                  ) : (
                    times.time_start_day_one.slice(0, 5) +
                    " - " +
                    times.time_end_day_one.slice(0, 5)
                  )}
                </p>
                <p>
                  Jornada 2:{" "}
                  {loading ? (
                    <Skeleton />
                  ) : (
                    times.time_start_day_two.slice(0, 5) +
                    " - " +
                    times.time_end_day_two.slice(0, 5)
                  )}
                </p>
              </div>
              {/* Calificación */}
              <div className="flex font-bold flex-nowrap">
                <h1 className="select-none">
                  {employee.rating
                    ? `${employee.rating}/5⭐ (${employee.reviews})`
                    : "Sin calificación"}
                </h1>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full ">
          <ScheduleAppointment
            removeService={handleRemoveService}
            services={service}
            servicesSelected={servicesSelected}
            priceTotal={priceTotal}
            employee={employee}
          />
        </section>
      </article>
      <article className="flex flex-col gap-4 p-4">
        <h1 className="text-xl font-bold select-none">Servicios</h1>
        <section className="grid gap-4 justify-items-center grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <Card
                key={index}
                className="w-64 h-fit space-y-5 p-4"
                radius="lg"
              >
                <Skeleton className="rounded-lg aspect-square">
                  <div className="h-24 rounded-lg bg-secondary"></div>
                </Skeleton>
                <div className="space-y-3">
                  <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-5 w-full rounded-lg bg-secondary"></div>
                  </Skeleton>
                  <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
                  </Skeleton>
                </div>
              </Card>
            ))
          ) : employee.services ? (
            employee.services.map((service) => (
              <ServiceCard key={service.id} service={service.service} />
            ))
          ) : (
            <div className="flex items-center justify-center w-full h-32">
              <p className="select-none">No hay servicios disponibles</p>
            </div>
          )}
                  <div className="space-y-3">
                    <Skeleton className="w-3/5 rounded-lg">
                      <div className="h-5 w-full rounded-lg bg-secondary"></div>
                    </Skeleton>
                    <Skeleton className="w-4/5 rounded-lg">
                      <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
                    </Skeleton>
                  </div>
                </Card>
              ))
            : employee.services.map((service) => (
                <ServiceCard
                  duration={service.duration}
                  key={service.id}
                  service={service.service}
                  onSelect={handleSelectService}
                />
              ))}
        </section>
      </article>
    </>
  );
}

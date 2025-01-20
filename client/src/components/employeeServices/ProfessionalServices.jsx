import { Button } from "@nextui-org/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useEffect } from "react";
import { useDisclosure } from "@nextui-org/react";

const formatDuration = (duration) => {
  // Parsear la cadena de tiempo HH:MM:SS
  const [hours, minutes, seconds] = duration.split(":").map(Number);

  // Si la duración es menor a 1 hora
  if (hours === 0) {
    return `${minutes} min${minutes > 1 ? "s" : ""}`;
  }

  // Si la duración es de 1 hora o más
  const hourText = `${hours} hora${hours > 1 ? "s" : ""}`;
  const minuteText =
    minutes > 0 ? `${minutes} min${minutes > 1 ? "s" : ""}` : "";

  return minuteText ? `${hourText} y ${minuteText}` : hourText;
};

function ProfessionalServices({ reload, setReload }) {
  const [professionalServices, setProfessionalServices] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [service_id, setServiceId] = useState(null);

  useEffect(() => {
    const fetchProfessionalServices = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/employee_services/employeeServicesList/${Cookies.get(
            "id_employee"
          )}/`
        );
        console.log(response.data);
        setProfessionalServices(response.data);
      } catch (error) {
        setProfessionalServices([]);
        console.error(error);
      }
    };
    fetchProfessionalServices();
  }, [reload]);

  const deleteService = async (service) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/employee_services/employeeServiceDelete/${Cookies.get(
          "id_employee")}
        )}/${service.service.id}/`
      );
      console.log(response.data);
      setReload(!reload);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenModalSetDuration = (service) => {
    setServiceId(service.service.id);
    onOpen();
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 pr-2 sm:pr-2 w-full gap-4 max-h-[40vh] overflow-y-auto scrollbar scrollbar-thumb-slate-200  scrollbar-thumb-rounded-full scrollbar-track-rounded-full active:scrollbar-thumb-primary hover:scrollbar-thumb-slate-300">
      {professionalServices.length > 0 ? (
        professionalServices.map((service) => (
          <article className="flex gap-4 border-2 items-center border-slate-200 rounded-xl p-2">
            <img
              className="rounded-xl size-24 sm:size-36 object-cover"
              src={service.service.image_base64}
            />
            <div className="flex flex-row justify-between h-full w-full">
              <div className="flex flex-col justify-center gap-2">
                <p className="font-bold text-sm sm:text-lg">
                  {service.service.name}
                </p>
                <p className="text-slate-700 text-sm sm:text-lg">
                  ${service.service.price}
                </p>
                {/* <p
                className={`font-semibold text-medium ${
                  service.service.state === true
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {service.service.state === true ? "Activo" : "Inactivo"}
              </p> */}
                <p className="text-slate-700 text-sm sm:text-lg">
                  {formatDuration(service.duration)}
                </p>
              </div>
              <div className="flex flex-col gap-4 justify-evenly items-center">
                <Button
                  onClick={() => {
                    handleOpenModalSetDuration(service);
                  }}
                  size="md"
                  color="default"
                  variant="bordered"
                  isIconOnly
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 stroke-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </Button>
                <Button
                  onClick={() => {
                    deleteService(service);
                  }}
                  size="md"
                  color="danger"
                  variant="bordered"
                  isIconOnly
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          </article>
        ))
      ) : (
        <p>No haz agregado servicios a tu lista</p>
      )}
      <ModalSetDuration
        isOpen={isOpen}
        onClose={onClose}
        service_id={service_id}
        setReload={setReload}
        reload={reload}
      />
    </div>
  );
}

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import InputCustom from "../global/InputCustom";
import ButtonCustom from "../global/ButtonCustom";

function ModalSetDuration({ isOpen, onClose, service_id, setReload, reload }) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const setDuration = async () => {
    try {
      if (hours < 0 || hours > 24 || minutes < 0 || minutes > 59) {
        console.log("Invalid time");
        return;
      }
      console.log(hours, minutes);
      const duration = `${String(hours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}:00`;
      console.log(duration);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/employee/setduration/${Cookies.get(
          "id_employee"
        )}/`,
        {
          service_id: service_id,
          duration: duration,
        }
      );
      console.log(response.data);
      setReload(!reload);
      setHours(0);
      setMinutes(0);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal placement="center" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col font-bold text-3xl gap-1">
          Modificar duración
        </ModalHeader>
        <ModalBody>
          <p className="font-semibold">
            Ingresa la duración que tardas en realizar el servicio en horas y
            minutos para poder modificarlo en tu lista
          </p>
          <div className="flex flex-row gap-2 justify-center items-center">
            <InputCustom
              time
              type={"number"}
              label={"Horas"}
              placeholder={"Horas"}
              max={24}
              description={"Tiempo en horas: 0-24"}
              onChange={(e) => setHours(e.target.value)}
            />
            <InputCustom
              time
              type={"number"}
              label={"Minutos"}
              placeholder={"Minutos"}
              max={59}
              description={"Tiempo en minutos: 0-59"}
              onChange={(e) => setMinutes(e.target.value)}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <ButtonCustom color="danger" variant="light" onPress={onClose}>
            Cancelar
          </ButtonCustom>
          <ButtonCustom color="primary" action={setDuration}>
            Cambiar
          </ButtonCustom>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ProfessionalServices;

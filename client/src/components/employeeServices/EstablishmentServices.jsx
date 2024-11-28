import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react";

// Component to display the services of the establishment

function EstablishmentServices({ reload, setReload }) {
  const [establismentServices, setEstablismentServices] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [service_id, setServiceId] = useState(null);

  useEffect(() => {
    const fetchEstablismentServices = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/establisment/servicesByEstablisment/${Cookies.get(
            "id_employee"
          )}/`
        );
        console.log(response.data.services);
        setEstablismentServices(response.data.services);
      } catch (error) {
        setEstablismentServices([]);
        console.error(error);
      }
    };
    fetchEstablismentServices();
  }, [reload]);

  const handleOpenModalAddService = (service) => {
    setServiceId(service.id);
    onOpen();
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 pr-2 sm:pr-2 w-full gap-4 max-h-[40vh] overflow-y-auto scrollbar scrollbar-thumb-slate-200  scrollbar-thumb-rounded-full scrollbar-track-rounded-full active:scrollbar-thumb-primary hover:scrollbar-thumb-slate-300">
      {establismentServices.length > 0 ? (
        establismentServices.map((service) => (
          <article className="flex gap-4 border-2 items-center border-slate-200 rounded-xl p-2">
            <img
              className="rounded-xl size-24 sm:size-36 object-cover"
              src={service.image_base64}
            />
            <div className="flex flex-col justify-evenly gap-2 h-full w-full">
              <p className="font-bold text-sm sm:text-lg">{service.name}</p>
              {/*
              <p
                className={`font-semibold text-medium ${
                  service.state === true ? "text-green-500" : "text-red-500"
                }`}
              >
                {service.state === true ? "Activo" : "Inactivo"}
              </p> */}
              <p className="text-slate-700 text-sm sm:text-lg">
                ${service.price}
              </p>
            </div>
            <div className="flex flex-col gap-4 justify-between items-center">
              <Button
                onClick={() => handleOpenModalAddService(service)}
                size="md"
                variant="bordered"
                color="success"
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
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </Button>
            </div>
          </article>
        ))
      ) : (
        <p>El establecimiento no ha registrado servicios</p>
      )}
      <ModalAddService
        setReload={setReload}
        reload={reload}
        service_id={service_id}
        isOpen={isOpen}
        onClose={onClose}
      />
    </div>
  );
}

// Modal to add a service to the employee

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import InputCustom from "../global/InputCustom";
import ButtonCustom from "../global/ButtonCustom";

function ModalAddService({ isOpen, onClose, service_id, setReload, reload }) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const addService = async () => {
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
        `http://localhost:8000/employee/addservice/${Cookies.get(
          "id_employee"
        )}/`,
        {
          service_id: service_id,
          duration: duration,
        }
      );
      console.log(response.data);
      setReload(!reload);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal placement="center" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col font-bold text-3xl gap-1">
          Agregar servicio
        </ModalHeader>
        <ModalBody>
          <p className="font-semibold">
            Ingresa la duración que tardas en realizar el servicio en horas y
            minutos para poder agregarlo a tu lista
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
          <ButtonCustom color="primary" action={addService}>
            Agregar
          </ButtonCustom>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EstablishmentServices;

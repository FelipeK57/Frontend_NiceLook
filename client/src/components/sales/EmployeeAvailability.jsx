import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import ButtonCustom from "../global/ButtonCustom";
import { useEffect, useState } from "react";
import axios from "axios";

function EmployeeAvailability({ employee, date }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [errorServer, setErrorServer] = useState("");
  const [times, setTimes] = useState([]);
  const day = date.toDate().getDate();
  const month = date.toDate().getMonth() + 1;
  const year = date.toDate().getFullYear();

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/establisment/get_available/${employee.id}/`,
          {
            params: {
              day: day,
              month: month,
              year: year,
            },
          }
        );
        console.log(response.data);
        setTimes(response.data.disponibilidad);
      } catch (error) {
        if (error.status === 400) {
          setTimes([]);
          setErrorServer("No hay horarios disponibles");
        }
        console.error(error);
      }
    };
    fetchAvailability();
  }, [isOpen]);

  const formatTime = (time) => {
    return time.slice(0, 5);
  };

  return (
    <>
      <ButtonCustom secondary action={onOpen}>
        Ver Disponibilidad
      </ButtonCustom>
      <Modal
        size="lg"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-2">
                <h1 className="text-lg md:text-2xl font-bold mb-2">
                  Disponibilidad de {employee.first_name} {employee.last_name}
                </h1>
              </ModalHeader>

              <ModalBody>
                <p className="text-sm font-semibold">
                  Estos son los intervalos de horas disponibles el dia: {day}/
                  {month}/{year}
                </p>
                <div
                  className={`grid ${
                    times.length === 0 ? "grid-cols-1" : "grid-cols-2"
                  } gap-4`}
                >
                  {times.length === 0 ? (
                    <p className="text-base font-semibold text-center text-gray-800">
                      No hay horarios disponibles
                    </p>
                  ) : (
                    times.map((time) => (
                      <ButtonCustom
                        size="md"
                        key={time.id}
                        color="default"
                        variant="light"
                      >
                        {formatTime(time[0])} - {formatTime(time[1])}
                      </ButtonCustom>
                    ))
                  )}
                </div>
                <p className="text-sm font-semibold">
                  *Ten en cuenta la duración de los servicios para reservar una
                  cita en un intervalo de tiempo adecuado*
                </p>
              </ModalBody>
              <ModalFooter className="flex items-center justify-center">
                <ButtonCustom color="primary" onPress={onClose}>
                  Lo tengo claro
                </ButtonCustom>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default EmployeeAvailability;

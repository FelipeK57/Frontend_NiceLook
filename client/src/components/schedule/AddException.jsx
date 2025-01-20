import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  RangeCalendar,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import ButtonCustom from "../global/ButtonCustom";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import { TimeInput } from "@nextui-org/react";
import { Time } from "@internationalized/date";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { today, getLocalTimeZone } from "@internationalized/date";

const parseDate = (date) => {
  // Ejemplo de formato de fecha: 2024-01-03
  return date.toString().slice(0, 10);
};

const parseTime = (time) => {
  return time.toString().slice(0, 5);
};

export const AddException = ({ reload, setReload }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const width = useWindowWidth();

  const [startTime, setStartTime] = useState(new Time(6, 0));
  const [endTime, setEndTime] = useState(new Time(12, 0));

  const [rangeCalendarValue, setRangeCalendarValue] = useState({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({ weeks: 1 }),
  });

  const [reason, setReason] = useState("");

  const createException = async () => {
    try {
      const response = await axios.post(
        `${process.env.API_URL}/employee/create_exception/${Cookies.get(
          "id_employee"
        )}/`,
        {
          start_date: parseDate(rangeCalendarValue.start),
          end_date: parseDate(rangeCalendarValue.end),
          reason: reason,
          time_start: parseTime(startTime),
          time_end: parseTime(endTime),
        }
      );
      console.log(response);
      setReload(!reload);
      onOpenChange();
    } catch (error) {
      if (error.response.data.limit_exceptions) {
        alert(
          "No puedes tener más de 2 excepciones activas, elimina una y asociala con la excepción que deseas crear."
        );
      }
    }
  };

  return (
    <>
      <ButtonCustom secondary action={onOpen} name={"Agregar Excepción"} />
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        placement="auto"
        size={width <= 600 ? "full" : "5xl"}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h1 className="font-bold text-xl">Agregar Excepción</h1>
              </ModalHeader>
              <ModalBody className="grid md:grid-cols-2 text-sm items-stretch gap-2 overflow-y-auto">
                <section className="flex flex-col items-center gap-4">
                  <p className="font-semibold text-center">
                    Fecha o rango de fechas en el que no vas a trabajar
                  </p>
                  <RangeCalendar
                    value={rangeCalendarValue}
                    onChange={setRangeCalendarValue}
                    color="danger"
                  />
                </section>
                <section className="flex flex-col gap-4 px-10">
                  <p className="font-semibold text-center">
                    Intervalos de horas en la que no estaras disponible
                  </p>
                  <div className="flex flex-col gap-4 w-full">
                    <TimeInput
                      hourCycle={12}
                      value={startTime}
                      defaultValue={startTime}
                      label={"Hora de inicio"}
                      labelPlacement="outside"
                      onChange={(value) => {
                        setStartTime(value);
                      }}
                    />
                    <TimeInput
                      hourCycle={12}
                      value={endTime}
                      defaultValue={endTime}
                      label={"Hora de finalización"}
                      labelPlacement="outside"
                      onChange={(value) => {
                        setEndTime(value);
                      }}
                    />
                  </div>
                  <div>
                    <Textarea
                      description="Esta información va a llegar a la recepcionista con el objetivo de que sepa que no estarás disponible en ese rango de horas y pueda reagendar las citas."
                      label="Razón de la excepción"
                      labelPlacement="outside"
                      placeholder="Escribe la razón por la que no vas a asistir"
                      value={reason}
                      onValueChange={setReason}
                    />
                  </div>
                </section>
              </ModalBody>
              <ModalFooter className="flex gap-4">
                <Button onPress={onClose} color="danger" variant="light">
                  Cancelar
                </Button>
                <ButtonCustom
                  action={() => {
                    createException();
                  }}
                  name={"Crear"}
                  primary
                />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

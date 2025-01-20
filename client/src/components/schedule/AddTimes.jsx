import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  RangeCalendar,
  useDisclosure,
} from "@nextui-org/react";
import ButtonCustom from "../global/ButtonCustom";
import { HourIntervals } from "./HourIntervals";
import { useEffect, useState } from "react";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import { today, getLocalTimeZone } from "@internationalized/date";
import axios from "axios";
import Cookies from "js-cookie";

const parseDate = (date) => {
  // Ejemplo de formato de fecha: 2024-01-03
  return date.toString().slice(0, 10);
};

export const AddTimes = ({ reload, setReload }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const width = useWindowWidth();

  const [rangeCalendarValue, setRangeCalendarValue] = useState({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({ weeks: 1 }),
  });

  const [intervals, setIntervals] = useState({
    firstInterval: { start: "06:00", end: "12:00" },
    secondInterval: { start: "13:00", end: "19:00" },
    doubleInterval: false,
  });

  const createTime = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/employee/create_time/${Cookies.get(
          "id_employee"
        )}/`,
        {
          date_start: parseDate(rangeCalendarValue.start),
          date_end: parseDate(rangeCalendarValue.end),
          time_start_day_one: intervals.firstInterval.start,
          time_end_day_one: intervals.firstInterval.end,
          time_start_day_two: intervals.secondInterval.start,
          time_end_day_two: intervals.secondInterval.end,
          double_day: intervals.doubleInterval,
        }
      );
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ButtonCustom primary action={onOpen} name={"Agregar horarios"} />
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
                <h1 className="font-bold text-xl">Agregar horario</h1>
              </ModalHeader>
              <ModalBody className="grid md:grid-cols-2 text-sm items-stretch gap-2 overflow-y-auto">
                <section className="flex flex-col items-center gap-4">
                  <p className="font-semibold text-center">
                    Rango de fechas en la que vas a trabajar
                  </p>
                  <RangeCalendar
                    aria-label="Date (Controlled)"
                    value={rangeCalendarValue}
                    onChange={setRangeCalendarValue}
                  />
                </section>
                <section className="flex flex-col gap-4 items-center">
                  <p className="font-semibold text-centerz  ">
                    Intervalos de horas en los que estaras disponible
                  </p>
                  <HourIntervals setIntervals={setIntervals} />
                </section>
              </ModalBody>
              <ModalFooter className="flex gap-4">
                <Button onPress={onClose} color="danger" variant="light">
                  Cancelar
                </Button>
                <ButtonCustom
                  action={() => {
                    createTime();
                    onClose();
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

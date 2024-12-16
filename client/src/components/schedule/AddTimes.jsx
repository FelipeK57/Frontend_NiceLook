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

export const AddTimes = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const width = useWindowWidth();

  return (
    <>
      <ButtonCustom primary action={onOpen} name={"Agregar horarios"} />
      <Modal
        isOpen={isOpen}
        placement="auto"
        size={width <= 400 ? "full" : "4xl"}
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
                  <RangeCalendar />
                </section>
                <section className="flex flex-col gap-4 items-center">
                  <p className="font-semibold text-centerz  ">
                    Intervalos de horas en los que estaras disponible
                  </p>
                  <HourIntervals />
                </section>
              </ModalBody>
              <ModalFooter className="flex gap-4">
                <Button onPress={onClose} color="danger" variant="light">
                  Cancelar
                </Button>
                <ButtonCustom action={onClose} name={"Crear"} primary />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

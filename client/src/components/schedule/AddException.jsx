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

export const AddException = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const width = useWindowWidth();

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
                  <RangeCalendar color="danger" />
                </section>
                <section className="flex flex-col gap-4 px-10">
                  <p className="font-semibold text-center">
                    Intervalos de horas en la no estaras disponible
                  </p>
                  <div className="flex flex-col gap-4 w-full">
                    <TimeInput
                      hourCycle={12}
                      defaultValue={new Time(6, 0)}
                      label={"Hora de inicio"}
                      labelPlacement="outside"
                      onChange={() => {
                        setStartTimeInterval1;
                      }}
                    />
                    <TimeInput
                      hourCycle={12}
                      defaultValue={new Time(18, 0)}
                      label={"Hora de finalización"}
                      labelPlacement="outside"
                      onChange={() => setEndTimeInterval1}
                    />
                  </div>
                  <div>
                    <Textarea
                      description="Esta información va a llegar a la recepcionista con el objetivo de que sepa que no estarás disponible en ese rango de horas y pueda reagendar las citas."
                      label="Razón de la excepción"
                      labelPlacement="outside"
                      placeholder="Escribe la razón por la que no vas a asistir"
                    />
                  </div>
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

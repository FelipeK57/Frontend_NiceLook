import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  TimeInput,
  useDisclosure,
} from "@nextui-org/react";
import ButtonCustom from "../global/ButtonCustom";
import { Time } from "@internationalized/date";
import { useState } from "react";

export const ViewDate = ({ month, color, day, dataDay }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editMode, setEditMode] = useState(false);

  const parseTime = (timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    return [hours, minutes];
  };

  return (
    <>
      <Button
        onPress={onOpen}
        isIconOnly
        className={`rounded-none py-1 px-3 font-medium 2xl:font-semibold 2xl:text-medium flex items-center justify-center w-full h-full ${color}`}
      >
        {day}
      </Button>
      <Modal
        backdrop="blur"
        size="lg"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h1 className="font-semibold text-xl">
                  {editMode ? "Edita" : "Visualiza"} el Dia {day} de {month}
                </h1>
              </ModalHeader>
              <ModalBody>
                {!dataDay ? (
                  <p>No hay horario</p>
                ) : (
                  <section className="flex flex-col gap-4">
                    <article className="flex flex-col gap-4">
                      <p className="font-semibold text-medium">
                        Horario de trabajo
                      </p>
                      <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-4">
                        <TimeInput
                          isReadOnly={editMode ? false : true}
                          hourCycle={12}
                          defaultValue={
                            new Time(
                              parseTime(dataDay.time.time_start_day_one)[0],
                              parseTime(dataDay.time.time_start_day_one)[1]
                            )
                          }
                          label={"Inicio jornada"}
                          labelPlacement="outside"
                        />
                        <TimeInput
                          isReadOnly={editMode ? false : true}
                          hourCycle={12}
                          defaultValue={
                            dataDay.time.double_day
                              ? new Time(
                                  parseTime(dataDay.time.time_end_day_two)[0],
                                  parseTime(dataDay.time.time_end_day_two)[1]
                                )
                              : new Time(
                                  parseTime(dataDay.time.time_end_day_one)[0],
                                  parseTime(dataDay.time.time_end_day_one)[1]
                                )
                          }
                          label={"Finalización jornada"}
                          labelPlacement="outside"
                        />
                      </div>
                    </article>
                    {dataDay.exception !== null ? (
                      <article className="flex flex-col gap-4">
                        <p className="font-semibold text-medium">
                          Excepción del dia
                        </p>
                        <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-4">
                          <TimeInput
                            isReadOnly={editMode ? false : true}
                            label={"Inicio excepción"}
                            labelPlacement="outside"
                            hourCycle={12}
                            defaultValue={
                              new Time(
                                parseTime(dataDay.exception.time_start)[0],
                                parseTime(dataDay.exception.time_start)[1]
                              )
                            }
                          />
                          <TimeInput
                            isReadOnly={editMode ? false : true}
                            label={"Finalización excepción"}
                            labelPlacement="outside"
                            hourCycle={12}
                            defaultValue={
                              new Time(
                                parseTime(dataDay.exception.time_end)[0],
                                parseTime(dataDay.exception.time_end)[1]
                              )
                            }
                          />
                        </div>
                      </article>
                    ) : null}
                  </section>
                )}
              </ModalBody>
              <ModalFooter>
                {!dataDay ? (
                  <>
                    <Button
                      className="font-semibold"
                      onPress={onClose}
                      color="danger"
                      variant="light"
                    >
                      Cerrar
                    </Button>
                    <Button
                      color="primary"
                      onPress={onClose}
                      className="font-semibold"
                    >
                      Agregar estado
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      color="danger"
                      className="font-semibold"
                      variant="light"
                      onPress={editMode ? () => setEditMode(false) : onClose}
                    >
                      {editMode ? "Cancelar cambios" : "Cerrar horario"}
                    </Button>
                    <Button
                      color="primary"
                      onPress={
                        !editMode
                          ? () => {
                              setEditMode(true);
                            }
                          : () => {
                              setEditMode(false);
                              onClose();
                            }
                      }
                      startContent={
                        !editMode ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="size-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                            />
                          </svg>
                        ) : null
                      }
                      className="font-semibold"
                    >
                      {editMode ? " Guardar cambios" : " Editar horario"}
                    </Button>
                  </>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

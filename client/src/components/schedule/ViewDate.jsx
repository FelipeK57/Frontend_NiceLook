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
import { Time } from "@internationalized/date";
import { useEffect, useState } from "react";

const parsedTime = (time) => {
  return time.toString().slice(0, 5);
};

export const ViewDate = ({ month, color, day, dataDay }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editMode, setEditMode] = useState(false);

  const [startTime1, setStartTime1] = useState();
  const [endTime1, setEndTime1] = useState();
  const [startTime2, setStartTime2] = useState();
  const [endTime2, setEndTime2] = useState();

  const parseTime = (timeString) => {
    if (!timeString) return [0, 0];
    const [hours, minutes] = timeString.split(":").map(Number);
    return [hours, minutes];
  };

  useEffect(() => {
    const updateTimes = () => {
      if (dataDay?.time) {
        const timeStartDayOne = parseTime(dataDay.time.time_start_day_one);
        const timeStartDayTwo = parseTime(dataDay.time.time_start_day_two);
        const timeEndDayOne = parseTime(dataDay.time.time_end_day_one);
        const timeEndDayTwo = parseTime(dataDay.time.time_end_day_two);

        setStartTime1(new Time(timeStartDayOne[0], timeStartDayOne[1]));
        setStartTime2(new Time(timeStartDayTwo[0], timeStartDayTwo[1]));
        setEndTime1(new Time(timeEndDayOne[0], timeEndDayOne[1]));
        setEndTime2(new Time(timeEndDayTwo[0], timeEndDayTwo[1]));
      }
    };

    updateTimes();
  }, [dataDay]);

  const saveChanges = () => {
    console.log("Guardando cambios");
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
                      {dataDay?.time !== null && dataDay?.time !== undefined ? (
                        <>
                          <p className="font-semibold text-medium">
                            Horario de trabajo
                          </p>
                          <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-4">
                            <TimeInput
                              isReadOnly={editMode ? false : true}
                              hourCycle={12}
                              value={startTime1}
                              defaultValue={startTime1}
                              onChange={(value) => setStartTime1(value)}
                              label={
                                dataDay?.time.double_day
                                  ? `Inicio de jornada 1`
                                  : `Inicio de jornada`
                              }
                              labelPlacement="outside"
                            />
                            <TimeInput
                              isReadOnly={editMode ? false : true}
                              hourCycle={12}
                              value={endTime1}
                              defaultValue={endTime1}
                              onChange={(value) => setEndTime1(value)}
                              label={
                                dataDay?.time.double_day
                                  ? `Finalización de jornada 1`
                                  : `Finalización de jornada`
                              }
                              labelPlacement="outside"
                            />
                            {dataDay?.time.double_day === true ? (
                              <>
                                <TimeInput
                                  isReadOnly={editMode ? false : true}
                                  hourCycle={12}
                                  value={startTime2}
                                  defaultValue={startTime2}
                                  onChange={(value) => setStartTime2(value)}
                                  label={"Inicio de jornada 2"}
                                  labelPlacement="outside"
                                />
                                <TimeInput
                                  isReadOnly={editMode ? false : true}
                                  hourCycle={12}
                                  value={endTime2}
                                  defaultValue={endTime2}
                                  onChange={(value) => setEndTime2(value)}
                                  label={"Finalización de jornada 2"}
                                  labelPlacement="outside"
                                />
                              </>
                            ) : null}
                          </div>
                        </>
                      ) : null}
                    </article>
                    {dataDay?.exception ? (
                      Array.isArray(dataDay.exception) ? (
                        dataDay.exception.length > 0 ? (
                          <article className="flex flex-col gap-4">
                            <p className="font-semibold text-medium">
                              {dataDay.exception.length > 1
                                ? "Excepciones del dia"
                                : "Excepción del dia"}
                            </p>
                            <div className="flex flex-col gap-4 md:grid md:grid-cols-1 md:gap-4">
                              {dataDay.exception.map((exception, index) => (
                                <div className="flex gap-4" key={index}>
                                  <TimeInput
                                    isReadOnly={editMode ? false : true}
                                    hourCycle={12}
                                    defaultValue={
                                      new Time(
                                        parseTime(exception.time_start)[0],
                                        parseTime(exception.time_start)[1]
                                      )
                                    }
                                    label={`Inicio excepción ${index + 1}`}
                                    labelPlacement="outside"
                                  />
                                  <TimeInput
                                    isReadOnly={editMode ? false : true}
                                    hourCycle={12}
                                    defaultValue={
                                      new Time(
                                        parseTime(exception.time_end)[0],
                                        parseTime(exception.time_end)[1]
                                      )
                                    }
                                    label={`Finalización excepción ${
                                      index + 1
                                    }`}
                                    labelPlacement="outside"
                                  />
                                </div>
                              ))}
                            </div>
                          </article>
                        ) : (
                          <p className="font-light text-sm">
                            No hay excepciones
                          </p>
                        )
                      ) : (
                        <article className="flex flex-col gap-4">
                          <p className="font-semibold text-medium">
                            Excepción del dia
                          </p>
                          <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-4">
                            <TimeInput
                              isReadOnly={editMode ? false : true}
                              hourCycle={12}
                              defaultValue={
                                new Time(
                                  parseTime(dataDay.exception.time_start)[0],
                                  parseTime(dataDay.exception.time_start)[1]
                                )
                              }
                              label={`Inicio excepción`}
                              labelPlacement="outside"
                            />
                            <TimeInput
                              isReadOnly={editMode ? false : true}
                              hourCycle={12}
                              defaultValue={
                                new Time(
                                  parseTime(dataDay.exception.time_end)[0],
                                  parseTime(dataDay.exception.time_end)[1]
                                )
                              }
                              label={`Finalización excepción`}
                              labelPlacement="outside"
                            />
                          </div>
                        </article>
                      )
                    ) : (
                      <p>No hay excepciones</p>
                    )}
                  </section>
                )}
              </ModalBody>
              <ModalFooter>
                {!dataDay ? null : (
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
                          ? () => setEditMode(true)
                          : () => {
                              saveChanges();
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
                      {editMode ? "Guardar cambios" : "Editar horario"}
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

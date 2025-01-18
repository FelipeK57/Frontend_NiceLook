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
import { useWindowWidth } from "@/hooks/useWindowWidth";
import axios from "axios";
import Cookies from "js-cookie";
import { ConfirmDialog } from "../global/ConfirmDialog";
import { TrashIcon } from "../icons/TrashIcon";

const parsedTime = (time) => {
  return time.toString().slice(0, 5);
};

export const ViewDate = ({ month, color, day, dataDay, reload, setReload }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editMode, setEditMode] = useState(false);

  const width = useWindowWidth();

  // Times
  const [startTime1, setStartTime1] = useState();
  const [endTime1, setEndTime1] = useState();
  const [startTime2, setStartTime2] = useState();
  const [endTime2, setEndTime2] = useState();

  // Exceptions
  const [exceptions, setExceptions] = useState([]);

  // Confirm Dialog Exceptions
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleOpen = () => setDialogOpen(true);
  const handleClose = () => setDialogOpen(false);

  // Confirm Dialog Time
  const [isDialogTimeOpen, setDialogTimeOpen] = useState(false);

  const handleTimeOpen = () => setDialogTimeOpen(true);
  const handleTimeClose = () => setDialogTimeOpen(false);

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
        if (dataDay.exception) {
          setExceptions(dataDay.exception);
        }
      }
    };

    updateTimes();
  }, [dataDay]);

  // const saveChanges = async () => {
  //   try {
  //     const response = await axios.patch(
  //       `http://localhost:8000/employee/update_time/${Cookies.get(
  //         "id_employee"
  //       )}/`
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const changeTimeToException = async (date) => {
    try {
      setDialogTimeOpen(true);
      console.log(date);
      const response = await axios.delete(
        `http://localhost:8000/employee/delete_time/${Cookies.get(
          "id_employee"
        )}/`,
        {
          params: {
            date,
          },
        }
      );
      setStartTime1(null);
      setStartTime2(null);
      setEndTime1(null);
      setEndTime2(null);
      setReload(!reload);
      setDialogTimeOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteException = async (
    date_start,
    date_end,
    time_start,
    time_end
  ) => {
    try {
      setDialogOpen(true);
      const response = await axios.delete(
        `http://localhost:8000/employee/delete_exception/${Cookies.get(
          "id_employee"
        )}/`,
        {
          params: {
            date_start,
            date_end,
            time_start,
            time_end,
          },
        }
      );
      console.log(response.data);
      const deleteException = exceptions.filter(
        (exception) =>
          exception.date_start === date_start &&
          exception.date_end === date_end &&
          exception.time_start === time_start &&
          exception.time_end === time_end
      );
      exceptions.splice(exceptions.indexOf(deleteException), 1);
      setExceptions([...exceptions]);
      setReload(!reload);
      setDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
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
        size={width <= 600 ? "full" : "lg"}
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
              <ModalBody className="overflow-y-auto">
                {!dataDay ? (
                  <p>No hay horario</p>
                ) : (
                  <section className="flex flex-col gap-4">
                    <article className="flex flex-col gap-1">
                      {dataDay?.time !== null && dataDay?.time !== undefined ? (
                        <>
                          <div className="flex flex-row justify-between items-center">
                            <p className="font-semibold text-lg">
                              Horario de trabajo
                            </p>
                            <Button
                              size="sm"
                              color="danger"
                              variant="light"
                              onPress={() => handleTimeOpen()}
                            >
                              Definir como excepción
                            </Button>
                            <ConfirmDialog
                              isOpen={isDialogTimeOpen}
                              onClose={handleTimeClose}
                              onConfirm={() =>
                                changeTimeToException(dataDay.time.date_start)
                              }
                              title={"Definir como excepción"}
                              message={`¿Estás seguro de convertir el día ${day} de ${month} en una excepción?, puedes eliminarla en cualquier momento y volver a tener tu horario.`}
                              buttonText={"Cambiar a excepción"}
                            />
                          </div>
                          <div className="flex flex-col gap-4 md:grid md:grid-cols-1 md:gap-4">
                            <p className="font-semibold text-sm">
                              {dataDay?.time.double_day
                                ? "Jornada 1"
                                : "Jornada"}
                            </p>
                            <div className="flex gap-4">
                              <TimeInput
                                isReadOnly
                                hourCycle={12}
                                value={startTime1}
                                defaultValue={startTime1}
                                onChange={(value) => setStartTime1(value)}
                                label="Inicio de jornada"
                                labelPlacement="outside"
                              />
                              <TimeInput
                                isReadOnly
                                hourCycle={12}
                                value={endTime1}
                                defaultValue={endTime1}
                                onChange={(value) => setEndTime1(value)}
                                label="Finalización de jornada"
                                labelPlacement="outside"
                              />
                            </div>
                            {dataDay?.time.double_day === true ? (
                              <>
                                <p className="font-semibold text-sm">
                                  Jornada 2
                                </p>
                                <div className="flex gap-4">
                                  <TimeInput
                                    isReadOnly
                                    hourCycle={12}
                                    value={startTime2}
                                    defaultValue={startTime2}
                                    onChange={(value) => setStartTime2(value)}
                                    label={"Inicio de jornada"}
                                    labelPlacement="outside"
                                  />
                                  <TimeInput
                                    isReadOnly
                                    hourCycle={12}
                                    value={endTime2}
                                    defaultValue={endTime2}
                                    onChange={(value) => setEndTime2(value)}
                                    label={"Finalización de jornada"}
                                    labelPlacement="outside"
                                  />
                                </div>
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
                            <p className="font-semibold text-lg">
                              {exceptions > 1
                                ? "Excepciones del dia"
                                : exceptions === 1
                                ? "Excepción del dia"
                                : null}
                            </p>
                            <div className="flex flex-col gap-4 md:grid md:grid-cols-1 md:gap-2">
                              {exceptions.map((exception, index) => (
                                <>
                                  <div className="flex flex-row justify-between items-center">
                                    <p className="text-sm font-semibold">
                                      Excepción {index + 1}
                                    </p>
                                    <ConfirmDialog
                                      isOpen={isDialogOpen}
                                      onClose={handleClose}
                                      onConfirm={() => {
                                        deleteException(
                                          exception.date_start,
                                          exception.date_end,
                                          exception.time_start,
                                          exception.time_end
                                        );
                                      }}
                                      title={"Eliminar excepción"}
                                      message={`¿Estás seguro de eliminar la excepción del día ${
                                        exception.date_start
                                      } al día ${
                                        exception.date_end
                                      } de ${parsedTime(
                                        exception.time_start
                                      )} a ${parsedTime(exception.time_end)}?`}
                                      buttonText={"Eliminar"}
                                    />
                                    <Button
                                      size="sm"
                                      isIconOnly
                                      color="danger"
                                      variant="light"
                                      onPress={() => handleOpen()}
                                    >
                                      <TrashIcon />
                                    </Button>
                                  </div>
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
                                      label={`Inicio excepción`}
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
                                      label={`Finalización excepción`}
                                      labelPlacement="outside"
                                    />
                                  </div>
                                </>
                              ))}
                            </div>
                          </article>
                        ) : (
                          <p className="font-light text-sm w-full text-center mt-5">
                            No hay excepciones
                          </p>
                        )
                      ) : (
                        <article className="flex flex-col gap-4">
                          <div className="flex flex-row justify-between items-center">
                            <p className="font-semibold text-lg">
                              Excepción del dia
                            </p>
                            <ConfirmDialog
                              isOpen={isDialogOpen}
                              onClose={handleClose}
                              onConfirm={() => {
                                deleteException(
                                  dataDay.exception.date_start,
                                  dataDay.exception.date_end,
                                  dataDay.exception.time_start,
                                  dataDay.exception.time_end
                                );
                              }}
                              title={"Eliminar excepción"}
                              message={`¿Estás seguro de eliminar la excepción del día ${
                                dataDay.exception.date_start
                              } al día ${
                                dataDay.exception.date_end
                              } de ${parsedTime(
                                dataDay.exception.time_start
                              )} a ${parsedTime(dataDay.exception.time_end)}?`}
                              buttonText={"Eliminar"}
                            />
                            <Button
                              size="sm"
                              isIconOnly
                              color="danger"
                              variant="light"
                              onPress={() => handleOpen()}
                            >
                              <TrashIcon />
                            </Button>
                          </div>
                          <div className="flex gap-4">
                            <TimeInput
                              isReadOnly={editMode ? false : true}
                              hourCycle={12}
                              defaultValue={
                                new Time(
                                  parseTime(dataDay.exception.time_start)[0],
                                  parseTime(dataDay.exception.time_start)[1]
                                )
                              }
                              classNames={"font-semibold text-sm"}
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
                      color="default"
                      variant="light"
                      onPress={editMode ? () => setEditMode(false) : onClose}
                    >
                      Salir
                    </Button>
                    {/* {dataDay.state === "Completa" ? null : (
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
                        {editMode ? "Guardar cambios" : "Editar excepción"}
                      </Button>
                    )} */}
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

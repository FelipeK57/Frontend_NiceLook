/* eslint-disable react/prop-types */
import { useMemo, useState } from "react";

import api from "@/api";

import { Button, Input } from "@nextui-org/react";
import { Pencil, X, Check } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  DatePicker,
} from "@nextui-org/react";
import { today, getLocalTimeZone, now } from "@internationalized/date";
import ButtonCustom from "../global/ButtonCustom";
// import RescheduleAppointment from "./RescheduleAppointment";

/**
 * ModalDetailsAppointment - Componente de React para mostrar los detalles de una cita en un modal.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.isOpen - Indica si el modal está abierto.
 * @param {function} props.onClose - Función para cerrar el modal.
 * @param {string} props.id - ID de la cita.
 * @param {string} props.state - Estado de la cita (Pendiente, Completada, Cancelada).
 * @param {string} props.date - Fecha de la cita.
 * @param {string} props.time - Hora de la cita.
 * @param {string} props.artistName - Nombre del profesional.
 * @param {string} props.client - Nombre del cliente.
 * @param {string} props.clientEmail - Correo electrónico del cliente.
 * @param {string} props.clientPhone - Teléfono del cliente.
 * @param {number} props.price - Precio de la cita.
 * @param {Array} props.services - Lista de servicios incluidos en la cita.
 * @param {boolean} props.isEmployee - Indica si el usuario es un empleado.
 *
 * @returns {JSX.Element} - Componente ModalDetailsAppointment.
 */

function ModalDetailsAppointment({
  isOpen,
  onClose,
  id,
  state,
  date,
  time,
  artistName,
  client,
  clientEmail,
  clientPhone,
  price,
  // commission,
  services,
  isEmployee,
}) {
  const boduDetails = [
    { item: "Profesional", value: artistName },
    { item: "Servicios", value: services },
    { item: "Costo", value: price },
    // { item: "Comision", commission },
  ];

  const getColorByServiceState = (state) => {
    switch (state) {
      case "Pendiente":
        return "text-yellow-500";
      case "Completada":
        return "text-green-500";
      case "Cancelada":
        return "text-red-500";
      default:
        return "text-slate-200";
    }
  };

  const earning = 15000 * 0.1;

  const [editMode, setEditMode] = useState(false);
  const [editedDate, setEditedDate] = useState(date);
  const [loading, setLoading] = useState(false);
  const [canceling, setCanceling] = useState(false);

  const formatAppointmentData = (dateTimeObject, appointmentId) => {
    if (!dateTimeObject || !appointmentId) return null;

    const { year, month, day, hour, minute } = dateTimeObject;

    // Crear el objeto con el formato requerido por el backend
    const formattedData = {
      id_appointment: appointmentId,
      year,
      month,
      day,
      // Formatear la hora solo si están presentes hour y minute
      ...(hour !== undefined &&
        minute !== undefined && {
          time: `${String(hour).padStart(2, "0")}:${String(minute).padStart(
            2,
            "0"
          )}`,
        }),
    };

    return formattedData;
  };

  useMemo(() => {
    !isOpen ? setEditMode(false) : setEditMode(editMode);
  }, [isOpen, editMode]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formattedData = formatAppointmentData(editedDate, id);

    api
      .patch("api/appointment_recshedule/", formattedData)
      .then((response) => {
        console.log("response", response);
        window.dispatchEvent(new Event("reloadAppointments"));
      })
      .catch((error) => {
        console.error("error", error);
      })
      .finally(() => {
        setEditMode(false);
        setLoading(false);
      });
    window.location.reload();
  };

  const handleFinishAppointment = (e) => {
    e.preventDefault;
    setLoading(true);
    api
      .patch(`api/appointment_change_state/`, {
        state: "Completada",
        id_appointment: id,
      })
      .then((response) => {
        console.log("response", response);
        window.dispatchEvent(new Event("reloadAppointments"));
      })
      .catch((error) => {
        console.error("error", error);
      })
      .finally(() => {
        setLoading(false);
        onClose();
      });
  };

  const handleCancelAppointment = async (e) => {
    e.preventDefault();
    setCanceling(true);
    api
      .patch(`api/appointment_change_state/`, {
        state: "Cancelada",
        id_appointment: id,
      })
      .then((response) => {
        console.log("response", response);
        window.dispatchEvent(new Event("reloadAppointments"));
      })
      .catch((error) => {
        console.error("error", error);
      })
      .finally(() => {
        setCanceling(false);
        onClose();
      });
  };

  return (
    <Modal
      size="3xl"
      className="p-6"
      backdrop="blur"
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-4">
          <div>
            <h1
              className={`text-2xl font-semibold ${getColorByServiceState(
                state
              )}`}
            >
              {state}
            </h1>
          </div>
          <div>
            <h1 className="text-4xl font-bold">Cita de {client}</h1>
            {/* Date and Time */}
            <section className="flex gap-8 items-center">
              {editMode ? (
                <>
                  {/* <Input
                    type="date"
                    variant="underlined"
                    value={date}
                    onChange={(e) => date(e.target.value)}
                  /> */}
                  <form
                    onSubmit={handleEditSubmit}
                    className="w-full flex gap-8 items-center"
                  >
                    <DatePicker
                      defaultValue={now(getLocalTimeZone())}
                      onChange={(date) => setEditedDate(date)}
                      minValue={today(getLocalTimeZone())}
                      label="Reagendar cita"
                      variant="bordered"
                      hideTimeZone
                      showMonthAndYearPickers
                      className="max-w-[250px]"
                      // labelPlacement="outside"
                    />
                    <ButtonCustom primary type="submit" isLoading={loading}>
                      Guardar Cambios
                    </ButtonCustom>
                    <Button
                      variant="bordered"
                      onPress={() => setEditMode(!editMode)}
                    >
                      <X />
                      Cancelar
                    </Button>
                  </form>
                </>
              ) : (
                <>
                  <div>
                    <p className="text-slate-700 text-xl font-base">
                      Fecha: {date}
                    </p>
                    <p className="text-slate-700 text-lg font-base">
                      Hora: {time}
                    </p>
                  </div>
                  {!isEmployee &&
                    (state != "Completada" || state != "Cancelada") && (
                      <Button
                        variant="bordered"
                        onPress={() => setEditMode(!editMode)}
                      >
                        <Pencil />
                        Reagendar
                      </Button>
                    )}
                </>
              )}
            </section>
          </div>
          <div>
            <h1 className="text-xl font-bold">
              Metodos de contacto del cliente
            </h1>
            <p className="text-slate-700 text-base font-base">
              Correo Electronico: {clientEmail}
            </p>
            <p className="text-slate-700 text-base font-base">
              Telefono: {clientPhone}
            </p>
          </div>
        </ModalHeader>
        <ModalBody className="grid grid-cols-2 gap-6">
          {/* Service Name Input */}
          {boduDetails.map((detail) => (
            <div className="flex flex-col gap-2" key={detail.item}>
              <label
                className="font-semibold text-medium lg:text-xl"
                htmlFor={`${detail.item}`}
              >
                {detail.item}
              </label>
              <Input
                isReadOnly
                id={`${detail.item}`}
                variant="underlined"
                value={`${
                  detail.item === "Comision"
                    ? detail.value * 100 + "% = " + earning
                    : detail.value
                }`}
              />
            </div>
          ))}
        </ModalBody>
        <ModalFooter className="flex justify-between">
          {/* Modal Footer Buttons */}
          {!isEmployee && (
            <>
              {state !== "Completada" ||
                (state !== "Cancelada" && (
                  <ButtonCustom
                    action={handleFinishAppointment}
                    primary
                    isLoading={loading}
                  >
                    <Check />
                    Marcar completada
                  </ButtonCustom>
                ))}
            </>
          )}
          
          {/* Cancel Appointment Button */}
          {state !== "Cancelada" && (
            <ButtonCustom
              action={handleCancelAppointment}
              secondary
              isLoading={canceling}
            >
              Cancelar cita
            </ButtonCustom>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalDetailsAppointment;

/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import ModalDetailsAppointment from "./ModalDetailsAppointment";
import { useState } from "react";
/**
 * Componente Appointment
 * 
 * @param {Object} props - Propiedades del componente
 * @param {string} props.id - Identificador de la cita
 * @param {string} props.artistName - Nombre del artista
 * @param {number} props.priceService - Precio del servicio
 * @param {string} props.serviceName - Nombre del servicio
 * @param {string} props.clientName - Nombre del cliente
 * @param {string} props.serviceState - Estado del servicio (Pendiente, Completada, Cancelada)
 * @param {string} props.serviceDate - Fecha del servicio
 * @param {string} props.serviceTime - Hora del servicio
 * @param {string} props.clientEmail - Correo electrónico del cliente
 * @param {string} props.phoneClient - Teléfono del cliente
 * @param {boolean} props.isEmployee - Indica si el usuario es empleado
 * 
 * @returns {JSX.Element} - Elemento JSX que representa una cita
 */
function Appointment({
  id,
  artistName,
  priceService,
  serviceName,
  clientName,
  serviceState,
  serviceDate,
  serviceTime,
  clientEmail,
  phoneClient,
  isEmployee,
}) {
  const [isModalDetailsAppointmentOpen, setIsModalDetailsAppointmentOpen] =
    useState(false);
  const handleOpen = () => setIsModalDetailsAppointmentOpen(true);
  const handleClose = () => setIsModalDetailsAppointmentOpen(false);

  const getColorByServiceState = (state) => {
    switch (state) {
      case "Pendiente":
        return "border-t-yellow-500 border-t-4";
      case "Completada":
        return "border-t-green-500 border-t-4";
      case "Cancelada":
        return "border-t-red-500 border-t-4";
      default:
        return "border-t-slate-200 border-t-4";
    }
  };

  return (
    <article
      className={`flex flex-col gap-4 border-2 rounded-xl border-slate-200 px-5 py-3 ${getColorByServiceState(
        serviceState
      )}`}
    >
      <div className="flex justify-between ">
        <h1 className="font-semibold text-xl">{artistName}</h1>
        <h1 className="font-semibold text-lg">${priceService}</h1>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <p className="font-normal text-base text-slate-700">{serviceName}</p>
          <p className="ont-normal text-base text-slate-700">
            Cliente: {clientName}
          </p>
        </div>
        <div className="flex justify-end items-end h-full">
          <button
            onClick={handleOpen}
            className="w-10 h-10 border-2 hover:bg-slate-100 hover:border-transparent transition-all border-slate-200 flex items-center justify-center rounded-full"
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
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </button>
        </div>
        <ModalDetailsAppointment
          isOpen={isModalDetailsAppointmentOpen}
          onClose={handleClose}
          id={id}
          state={serviceState}
          date={serviceDate}
          time={serviceTime}
          artistName={artistName}
          client={clientName}
          clientPhone={phoneClient}
          clientEmail={clientEmail}
          price={priceService}
          services={serviceName}
          isEmployee={isEmployee}
        />
      </div>
    </article>
  );
}

Appointment.propTypes = {
  artistName: PropTypes.string,
  priceService: PropTypes.number,
  serviceName: PropTypes.string,
  clientName: PropTypes.string,
  clientEmail: PropTypes.string,
  clientPhone: PropTypes.string,
};

export default Appointment;

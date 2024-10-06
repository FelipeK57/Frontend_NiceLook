import Appointment from "./Appointment";
import React from "react";
function AppointmentsList({ citas, hora }) {
  return (
    <div className="flex flex-col gap-6 min-w-[350px]">
      <React.Fragment key={hora}>
        <div className="bg-slate-300 items-center p-2 rounded-3xl w-full flex justify-between">
          <h1 className="font-bold bg-slate-50 py-2 px-4 rounded-full text-slate-950 text-xl">
            {hora}
          </h1>
          <div className="bg-slate-50 rounded-full">
            <h1 className="py-2 px-4 text-xl font-bold">{citas.length}</h1>
          </div>
        </div>
        <div className="flex flex-col gap-6 max-h-[70vh] pr-2 overflow-y-auto scrollbar scrollbar-thumb-slate-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full active:scrollbar-thumb-primary hover:scrollbar-thumb-slate-300">
          {citas.map((cita) => (
            <Appointment
              key={cita.id}
              artistName={cita.estilista}
              priceService={cita.precio}
              serviceName={cita.servicio}
              clientName={cita.cliente}
              serviceState={cita.estado}
            />
          ))}
        </div>
      </React.Fragment>
    </div>
  );
}

export default AppointmentsList;

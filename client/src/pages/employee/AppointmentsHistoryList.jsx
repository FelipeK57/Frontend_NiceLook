import AppointmentsList from "@/components/appointments/AppointmentsList";
import Appointment from "@/components/appointments/Appointment";
import ItemHistory from "./ItemHistory";
function AppointmentsHistoryList({ history }) {
  return (
    <section className="grid md:grid-cols-3 gap-3 xl:max-h-[70vh] 2xl:max-h-[79vh] md:overflow-y-auto scrollbar scrollbar-thumb-slate-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full md:pr-2 active:scrollbar-thumb-primary hover:scrollbar-thumb-slate-300 w-full">
      {history.length === 0 ? (
        <p className="text-medium text-center font-normal text-slate-500">
          No hay servicios este día
        </p>
      ) : (
        history.map((appointment) => (
          <ItemHistory key={appointment.id} serviceTime={appointment.time} clientName={appointment.client} serviceName={appointment.services} priceService={appointment.total}
          serviceState={appointment.state}/>
        ))
      )}
    </section>
  );
}

export default AppointmentsHistoryList;

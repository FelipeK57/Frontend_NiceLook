import AppointmentCard from "../appointmentsEmployee/AppointmentCard";

function ScheduleList({ appointments }) {
    const validAppointments = Array.isArray(appointments) ? appointments : [];

    return (
        <div className="max-h-[70vh] w-full">
            {validAppointments.length > 0 ? (
                validAppointments.map((appointment) => (
                    <AppointmentCard
                        key={appointment.id}
                        clientName={appointment.client}
                        service={appointment.services && Array.isArray(appointment.services)
                            ? appointment.services.map((s) => s.name).join(" + ")
                            : "Sin servicio"}
                        price={appointment.total} 
                        time={appointment.time} 
                        paymentMethod={appointment.method}
                    />
                ))
            ) : (
                <p>No hay citas para mostrar</p>
            )}
        </div>
    );
}

export default ScheduleList;



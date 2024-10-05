import { DatePicker } from "@nextui-org/react";
import CategoriesAppointments from "../../components/appointments/CategoriesAppointments";
import AppointmentsList from "../../components/appointments/AppointmentsList";

function AppointmentsManagement() {
    const citas = [
        {
          hora: "7:30",
          citas: [
            {
              id: 1,
              estilista: "María López",
              cliente: "Ana García",
              servicio: "Corte de cabello",
              precio: 15000,
              tiempo: 30,
              estado: "completada",
            },
            {
              id: 2,
              estilista: "Carlos Pérez",
              cliente: "Juan Martínez",
              servicio: "Afeitado",
              precio: 8000,
              tiempo: 15,
              estado: "completada",
            },
            {
              id: 1,
              estilista: "María López",
              cliente: "Ana García",
              servicio: "Corte de cabello",
              precio: 15000,
              tiempo: 30,
              estado: "completada",
            },
            {
              id: 2,
              estilista: "Carlos Pérez",
              cliente: "Juan Martínez",
              servicio: "Afeitado",
              precio: 8000,
              tiempo: 15,
              estado: "completada",
            },
            {
              id: 1,
              estilista: "María López",
              cliente: "Ana García",
              servicio: "Corte de cabello",
              precio: 15000,
              tiempo: 30,
              estado: "completada",
            },
            {
              id: 2,
              estilista: "Carlos Pérez",
              cliente: "Juan Martínez",
              servicio: "Afeitado",
              precio: 8000,
              tiempo: 15,
              estado: "completada",
            },
            {
              id: 1,
              estilista: "María López",
              cliente: "Ana García",
              servicio: "Corte de cabello",
              precio: 15000,
              tiempo: 30,
              estado: "completada",
            },
            {
              id: 2,
              estilista: "Carlos Pérez",
              cliente: "Juan Martínez",
              servicio: "Afeitado",
              precio: 8000,
              tiempo: 15,
              estado: "completada",
            },
          ],
        },
        {
          hora: "7:45",
          citas: [
            {
              id: 1,
              estilista: "Laura Torres",
              cliente: "Lucía Sánchez",
              servicio: "Tinte de cabello",
              precio: 50000,
              tiempo: 60,
              estado: "cancelada",
            },
            {
              id: 2,
              estilista: "Andrés Gómez",
              cliente: "Pedro Fernández",
              servicio: "Lavado y secado",
              precio: 25000,
              tiempo: 45,
              estado: "pendiente",
            },
          ],
        },
        {
          hora: "9:00",
          citas: [
            {
              id: 1,
              estilista: "María López",
              cliente: "Carolina Díaz",
              servicio: "Peinado",
              precio: 20000,
              tiempo: 40,
              estado: "completada",
            },
            {
              id: 2,
              estilista: "Carlos Pérez",
              cliente: "Luis Rivera",
              servicio: "Corte de cabello",
              precio: 15000,
              tiempo: 30,
              estado: "completada",
            },
          ],
        },
        {
          hora: "10:30",
          citas: [
            {
              id: 1,
              estilista: "Laura Torres",
              cliente: "Fernanda Ramírez",
              servicio: "Tinte de cabello",
              precio: 55000,
              tiempo: 60,
              estado: "pendiente",
            },
            {
              id: 2,
              estilista: "Andrés Gómez",
              cliente: "Raúl Méndez",
              servicio: "Afeitado",
              precio: 8000,
              tiempo: 20,
              estado: "completada",
            },
          ],
        },
        {
          hora: "12:00",
          citas: [
            {
              id: 1,
              estilista: "Carlos Pérez",
              cliente: "Marcela Gutiérrez",
              servicio: "Manicure",
              precio: 18000,
              tiempo: 45,
              estado: "completada",
            },
            {
              id: 2,
              estilista: "Laura Torres",
              cliente: "José Herrera",
              servicio: "Pedicure",
              precio: 22000,
              tiempo: 50,
              estado: "cancelada",
            },
          ],
        },
        {
          hora: "14:00",
          citas: [
            {
              id: 1,
              estilista: "María López",
              cliente: "Andrea Orozco",
              servicio: "Corte y lavado",
              precio: 30000,
              tiempo: 45,
              estado: "completada",
            },
            {
              id: 2,
              estilista: "Andrés Gómez",
              cliente: "Fernando Pérez",
              servicio: "Masaje facial",
              precio: 35000,
              tiempo: 60,
              estado: "pendiente",
            },
          ],
        },
        {
          hora: "15:30",
          citas: [
            {
              id: 1,
              estilista: "Laura Torres",
              cliente: "Luisa Morales",
              servicio: "Tratamiento capilar",
              precio: 45000,
              tiempo: 60,
              estado: "completada",
            },
            {
              id: 2,
              estilista: "Carlos Pérez",
              cliente: "Diana Pardo",
              servicio: "Peinado",
              precio: 20000,
              tiempo: 40,
              estado: "completada",
            },
          ],
        },
        {
          hora: "17:00",
          citas: [
            {
              id: 1,
              estilista: "María López",
              cliente: "Jorge Ramírez",
              servicio: "Corte de cabello",
              precio: 15000,
              tiempo: 30,
              estado: "pendiente",
            },
            {
              id: 2,
              estilista: "Andrés Gómez",
              cliente: "Sofía Gil",
              servicio: "Afeitado",
              precio: 8000,
              tiempo: 20,
              estado: "pendiente",
            },
          ],
        },
        {
          hora: "18:30",
          citas: [
            {
              id: 1,
              estilista: "Laura Torres",
              cliente: "Juliana López",
              servicio: "Maquillaje",
              precio: 25000,
              tiempo: 45,
              estado: "pendiente",
            },
            {
              id: 2,
              estilista: "Carlos Pérez",
              cliente: "Miguel Rojas",
              servicio: "Corte de cabello",
              precio: 15000,
              tiempo: 30,
              estado: "pendiente",
            },
          ],
        },
      ];
      
  return (
    <main className="flex flex-col py-8 gap-4 px-10">
      <header className="flex items-center">
        <h1 className="text-2xl lg:text-4xl text-slate-950 font-bold w-full flex flex-grow justify-start">
          Calendario de citas
        </h1>
        <DatePicker
          size="lg"
          label="Fecha"
          className="max-w-[280px] font-semibold"
          variant="bordered"
        />
      </header>
      <CategoriesAppointments />
      <section className="flex pb-8 gap-8 overflow-x-auto scrollbar scrollbar-thumb-slate-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full active:scrollbar-thumb-primary hover:scrollbar -thumb-slate-300" style={{ scrollbarGutter: 'top' }}>
        {citas.map((cita) => (
          <AppointmentsList
            key={cita.hora}
            citas={cita.citas}
            hora={cita.hora}
          />
        ))}
      </section>
    </main>
  );
}

export default AppointmentsManagement;

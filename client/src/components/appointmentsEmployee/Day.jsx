import { Card, Badge } from "@nextui-org/react";
import ScheduleList from "../appointmentsEmployee/ScheduleList";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';


function Day({ appointments, date }) {

    console.log(date);
    const [spanishDay, setSpanishDay] = useState('');
    const dayName = dayjs(date).add(1, 'day').format('dddd');
    console.log(dayName);
    useEffect(() => {
        switch (dayName) {
            case "Monday":
                setSpanishDay('Lunes');
                break;
            case "Tuesday":
                setSpanishDay('Martes');
                break;
            case "Wednesday":
                setSpanishDay('Miercoles');
                break;
            case "Thursday":
                setSpanishDay('Jueves');
                break;
            case "Friday":
                setSpanishDay('Viernes');
                break;
            case "Saturday":
                setSpanishDay('Sabado');
                break;
            case "Sunday":
                setSpanishDay('Domingo');
                break;
            default:
                setSpanishDay(dayName);
        }
    }, [dayName]);
 

    // Asegúrate de que `appointments` sea un array
    const validAppointments = Array.isArray(appointments) ? appointments : [];

  

    return (
        <div className="flex-col flex gap-4">
            <div className="flex-row flex w-full">
                <Card className="bg-[#4D4C52] flex p-3 text-center text-[#F5F7FA] rounded-2xl border border-gray-300 mb-4 z-5 w-[350px]">
                    <div className="flex flex-row justify-between items-center">
                        <p className="font-bold text-xl">{spanishDay}</p>
                        <div className="w-10 h-10 rounded-full justify-center items-center bg-white flex">
                            <Badge color="secondary" content={validAppointments.length} size="xl" className="flex bg-transparent text-3xl rounded-full border-none"></Badge>
                        </div>
                    </div>
                </Card>
            </div>
            {validAppointments.length > 0 ? (
                <ScheduleList appointments={validAppointments} />
            ) : (
                <p>No hay citas para mostrar</p>
            )}
        </div>
    );
}

export default Day;



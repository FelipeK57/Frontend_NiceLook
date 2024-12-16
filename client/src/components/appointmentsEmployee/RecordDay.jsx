import { Card, Badge } from "@nextui-org/react";
import RecordList from "./RecordList";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

function RecordDay({ appointments, date }) {
    console.log("Appointments in RecordDay:", appointments);

    const [spanishDay, setSpanishDay] = useState('');
    const dayName = dayjs(date).add(1, 'day').format('dddd');
    
    useEffect(() => {
        switch (dayName) {
            case "Monday":
                setSpanishDay('Lunes');
                break;
            case "Tuesday":
                setSpanishDay('Martes');
                break;
            case "Wednesday":
                setSpanishDay('Miércoles');
                break;
            case "Thursday":
                setSpanishDay('Jueves');
                break;
            case "Friday":
                setSpanishDay('Viernes');
                break;
            case "Saturday":
                setSpanishDay('Sábado');
                break;
            case "Sunday":
                setSpanishDay('Domingo');
                break;
            default:
                setSpanishDay(dayName);
        }
    }, [dayName]);

    return (
        <div className="flex-col flex gap-4">
            <div className="flex-row flex w-full">
                <Card className="bg-[#1270B0] flex p-3 text-center text-[#F5F7FA] rounded-2xl border border-gray-300 mb-4 z-5 w-[350px]">
                    <div className="flex flex-row justify-between items-center">
                        <p className="font-bold text-xl">{spanishDay}</p>
                        <div className="w-10 h-10 rounded-full justify-center items-center bg-white flex">
                            <Badge color="secondary" content={appointments.length} size="xl" className="flex text-[#1270B0] bg-transparent text-3xl rounded-full border-none"></Badge>
                        </div>
                    </div>
                </Card>
            </div>
            {appointments.length > 0 ? (
                <RecordList appointments={appointments} />
            ) : (
                <p>No hay citas para mostrar</p>
            )}
        </div>
    );
}

export default RecordDay;

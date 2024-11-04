import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { Calendar } from "@nextui-org/react"; // Asegúrate de que este es el componente correcto
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Extender dayjs para manejar zonas horarias
dayjs.extend(utc);
dayjs.extend(timezone);

const DatePicker = ({ onDateChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [date, setDate] = useState(dayjs.tz(dayjs().format(), dayjs.tz.guess()).toDate());


    useEffect(() => {
        dayjs.locale('es');


    }, []);
    const selectDate = (selectedDate) => {
        const selectedDateTz = dayjs.tz(selectedDate, dayjs.tz.guess());
        const newDate = selectedDateTz.toDate();
        console.log(newDate);
        setDate(newDate);
        setIsOpen(false);
        onDateChange(newDate);
    };

    return (
        <div className="relative">
            <Button
                auto
                flat
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-800 bg-gray-100 border border-gray-400 rounded-xl py-2 px-4"
            >
                <div className="flex items-center space-x-2">
                    <span className="text-gray-800 text-base">{dayjs(date).format('DD/MM/YYYY')}</span>
                    <div className="pl-16">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>
                </div>
            </Button>

            {isOpen && (
                <div className="absolute right-0 z-10 mt-2 bg-white rounded-lg shadow-lg">
                    <Calendar
                        onChange={selectDate} // Llama a selectDate cuando se selecciona una fecha
                        selected={date} // Asegúrate de que 'date' sea la fecha correcta en formato Date
                    />
                </div>
            )}
        </div>
    );
};

export default DatePicker;

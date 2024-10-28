import React, { useEffect, useState } from "react";
import { Dropdown, Button } from "@nextui-org/react";
import { Calendar } from "@nextui-org/react";// Importa el ícono desde Heroicons
import dayjs from "dayjs";
import { parseDate } from "@internationalized/date";
const DatePicker = () => {
    const fecha = new Date();
    let year = fecha.getFullYear().toString();
    let month = (fecha.getMonth() + 1).toString();
    let day = fecha.getDate().toString();
    const [isOpen, setIsOpen] = useState(false);

    const [date, setDate] = useState(
        parseDate(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`)
    );
    useEffect(() => {
        dayjs.locale('es'); // o cualquier otro idioma que desees
        dayjs.Ls // configura la zona horaria local del sistema
    }, []);
    console.log(date);

    function selectDate(e) {
        setDate(e);
        setIsOpen(false);
    }

    return (
        <div className="relative">
            <Button
                auto
                flat
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-800 bg-gray-100 border border-gray-400 rounded-xl py-2 px-4"
            >
                <div className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    </svg>
                    {/* Ícono de Heroicons */}
                    <span className="text-gray-800 text-base">{date.toString()}</span>
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
                        onChange={(e) => selectDate(e)}
                        selected={date}
                    />
                </div>
            )}
        </div>
    );
};

export default DatePicker;
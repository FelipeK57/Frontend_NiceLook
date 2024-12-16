import RecordDay from "../../components/appointmentsEmployee/RecordDay";
import { DatePicker } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { parseDate } from "@internationalized/date";
import dayjs from "dayjs";
import { getHistoryAppointments } from "../../api/employee/employee";

const RecordManagement = () => {
    const fecha = new Date();
    let year = fecha.getFullYear().toString();
    let month = (fecha.getMonth() + 1).toString();
    let day = fecha.getDate().toString();

    const [date, setDate] = useState(
        parseDate(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`)
    );

    useEffect(() => {
        dayjs.locale('es');
    }, []);

    const selectDate = (e) => {
        setDate(e);
        handleDateChange(e);
    };

    const [appointments, setAppointments] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [error, setError] = useState(null);
    const employeeId = 1;

    const fetchRecords = async (date) => {
        try {
            const response = await getHistoryAppointments(employeeId, date.year, date.month, date.day);
            console.log("Respuesta del backend:", response.data);
            setAppointments(response.data.appointments || []);
            setError(null);
        } catch (error) {
            console.error("Error en la solicitud:", error);
            setError("Ocurrió un error al obtener las citas.");
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        fetchRecords(date);
    };

    useEffect(() => {
        fetchRecords(selectedDate);
    }, [selectedDate]);

    return (
        <div className="p-6">
            <div className="flex items-center mb-4">
                <h3 className="text-5xl text-[#252527] font-bold ml-4 p-4">Historial</h3>
                <div className="ml-auto">
                    <DatePicker value={date}
                        onChange={(e) => selectDate(e)}
                        label="Fecha"
                        className="max-w-[280px] font-semibold"
                        variant="bordered" 
                    />
                </div>
            </div>
            <div className="flex relative pb-6 gap-8">
                <div className="flex flex-row gap-6 w-full overflow-auto scrollbar scrollbar-thumb-slate-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full active:scrollbar-thumb-primary hover:scrollbar-thumb-slate-300">
                    {error ? (
                        <p className="text-red-500 text-2xl ml-8">{'No hay citas realizadas'}</p>
                    ) : (
                        <RecordDay day={day} date={date} appointments={appointments} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default RecordManagement;

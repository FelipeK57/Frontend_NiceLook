import RecordDay from "../../components/appointmentsEmployee/RecordDay";
import DatePicker from "../../components/appointmentsEmployee/DatePicker";


const days = [
    { name: "Lunes", date: 5 },
    { name: "Martes", date: 6 },
    { name: "Miércoles", date: 7 },
    { name: "Jueves", date: 8 },
    { name: "Viernes", date: 9 },
    { name: "Sábado", date: 10 },
    { name: "Domingo", date: 11 },
  ];
export default function RecordManagement() {
    return (
        <div className="p-6">
            <div className="flex items-center mb-4">
                <h3 className="text-5xl text-[#252527] font-bold ml-4 p-4">Historial</h3>
                <div className="ml-auto">
                    <DatePicker />
                </div>
            </div>
            <div className="flex relative pb-6 gap-8">
                <div className="flex flex-row gap-6 w-full overflow-auto scrollbar scrollbar-thumb-slate-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full active:scrollbar-thumb-primary hover:scrollbar-thumb-slate-300">
                    {days.map((day, index) => (
                        <RecordDay key={index} index={index} day={day} />
                    ))}
                </div>
            </div>
        </div>
    );
}
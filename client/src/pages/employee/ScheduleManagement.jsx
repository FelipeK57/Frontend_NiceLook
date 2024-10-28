import { useDisclosure } from "@nextui-org/react";
import ButtonCustom from "../../components/global/ButtonCustom";
import DatePicker from "../../components/appointmentsEmployee/DatePicker";
import Day from "../../components/appointmentsEmployee/Day";
import ScheduleModal from "../../components/appointmentsEmployee/ScheduleModal";
console.log(ScheduleModal);

const days = [
  { name: "Lunes", date: 5 },
  { name: "Martes", date: 6 },
  { name: "Miércoles", date: 7 },
  { name: "Jueves", date: 8 },
  { name: "Viernes", date: 9 },
  { name: "Sábado", date: 10 },
  { name: "Domingo", date: 11 },
];

export default function Agenda() {

    const { isOpen, onOpen, onClose } = useDisclosure();
  
  return (
    <div className="p-6">
      <div className="flex items-center mb-4">
        <h3 className="text-5xl text-[#252527] font-bold ml-4 p-4">Mi agenda</h3>
        <ButtonCustom
          name="Gestionar Horario"
          classStyles={"size-15 text-base left-8 border-gray-300"}
          secondary
          onPress={onOpen}
        />
        <div className="ml-auto">
          <DatePicker />
        </div>
      </div>
      
      {/* Contenedor de los días de la semana, mostrando solo tres días con scroll horizontal */}
      <div className="flex relative pb-6 gap-8">
        <div className="flex flex-row gap-6 w-full overflow-auto scrollbar scrollbar-thumb-slate-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full active:scrollbar-thumb-primary hover:scrollbar-thumb-slate-300">
          {days.map((day, index) => (
            <Day key={index} index={index} day={day} />
          ))}
        </div>
      </div>
      
      {/* El modal se renderiza aquí */}
      <ScheduleModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
}


import { useState, useEffect } from 'react';
import { Modal, Button, Switch, ModalFooter, ModalHeader, ModalBody, ModalContent } from '@nextui-org/react';
// import { getEmployeeSchedules, updateEmployeeSchedule } from '../../api/employee/employee';
import { getEmployeeSchedules, updateEmployeeSchedule } from '@/api_feats/employee/employee';

const ScheduleModal = ({ isOpen, onOpenChange, onSave, employeeId }) => {
    const [isTwoShifts, setIsTwoShifts] = useState(() => {
        const storedValue = localStorage.getItem("isTwoShifts");
        return storedValue !== null ? JSON.parse(storedValue) : false;
    });
    const [selectedHoursJoin, setSelectedHoursJoin] = useState("09:00");
    const [selectedHoursExit, setSelectedHoursExit] = useState("12:00");
    const [selectedHoursJoin2, setSelectedHoursJoin2] = useState("14:00");
    const [selectedHoursExit2, setSelectedHoursExit2] = useState("18:00");
    const [selectedDays, setSelectedDays] = useState({
        LUN: false,
        MAR: false,
        MIE: false,
        JUE: false,
        VIE: false,
        SAB: false,
        DOM: false,
    });
    const [scheduleId, setScheduleId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Efecto para cargar el horario guardado al abrir el modal
    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const response = await getEmployeeSchedules(employeeId);
                if (response.data && response.data.length > 0) {
                    const schedule = response.data[0];
                    setScheduleId(schedule.id);
                    setIsTwoShifts(schedule.double_day); // Sincroniza con el backend
                    console.log("Estado del backend (double_day):", schedule.double_day); // Verifica lo que devuelve el backend
                    setSelectedHoursJoin(schedule.time_start_day_one);
                    setSelectedHoursExit(schedule.time_end_day_one);
                    setSelectedDays(schedule.working_days.reduce((days, day) => ({ ...days, [day]: true }), {}));
                    if (schedule.double_day) {
                        setSelectedHoursJoin2(schedule.time_start_day_two);
                        setSelectedHoursExit2(schedule.time_end_day_two);
                    }
                } else {
                    console.log("No se encontró horario para el empleado.");
                }
            } catch (error) {
                console.error("Error al cargar el horario:", error);
            }
        };

        if (isOpen) {
            const storedValue = localStorage.getItem('isTwoShifts');
            console.log("Valor en localStorage:", storedValue); // Verifica lo que se está leyendo
            setIsTwoShifts(storedValue !== null ? JSON.parse(storedValue) : false); // Lee de localStorage
            fetchSchedule();
        }
    }, [isOpen, employeeId]);

    const toggleDay = (day) => {
        setSelectedDays((prev) => ({
            ...prev,
            [day]: !prev[day],
        }));
    };

    const saveSchedule = async () => {
        const workingDays = Object.keys(selectedDays).filter(day => selectedDays[day]);
        const scheduleData = {
            double_day: isTwoShifts,  // Enviar el estado actual de dos jornadas al backend
            time_start_day_one: selectedHoursJoin,
            time_end_day_one: selectedHoursExit,
            working_days: workingDays,
            ...(isTwoShifts && {
                time_start_day_two: selectedHoursJoin2,
                time_end_day_two: selectedHoursExit2,
            }),
        };

        console.log("Guardando horario con datos:", scheduleData); // Log para verificar datos guardados

        setIsLoading(true);
        try {
            if (scheduleId) {
                await updateEmployeeSchedule(scheduleId, scheduleData);
            } else {
                await onSave(scheduleData); // Crea el horario si no existe
            }
            onOpenChange(false);
        } catch (error) {
            console.error("Error al guardar/actualizar el horario:", error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        const storedValue = localStorage.getItem('isTwoShifts');
        setIsTwoShifts(storedValue !== null ? JSON.parse(storedValue) : false);
    }, []);


    return (
        <Modal
            key={isOpen ? "open" : "closed"} // Clave para forzar la recreación del modal
            closeButton
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size="3xl"
            backdrop="blur"
            classNames={{
                base: "w-[900px] rounded-b-none sm:rounded-xl !m-0 sm:!m-1",
                wrapper: "1/2lg:w-[75%] h-full flex justify-self-end ",
                backdrop: "1/2lg:w-[75%] h-full flex justify-self-end ",
            }}
        >
            <ModalContent>
                <ModalHeader>
                    <h1 className="text-4xl text-[#252527] font-bold">Gestionar horario</h1>
                </ModalHeader>
                <ModalBody>
                    <p className="text-gray-600">Gestione su tiempo en servicio</p>
                    <div className="flex flex-col lg:flex-row lg:space-x-8">
                        <div className="flex flex-col space-y-4 w-full lg:w-1/2">
                            <span className="font-bold text-xl">Días</span>
                            <div className="grid grid-cols-5 gap-3">
                                {['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'].map((day, index) => (
                                    <button
                                        key={index}
                                        onClick={() => toggleDay(day)}
                                        className={`w-10 h-10 p-7 rounded-full ${selectedDays[day] ? 'bg-[#252527] text-white' : 'bg-gray-200 text-black'
                                            } flex justify-center items-center`}
                                    >
                                        {day}
                                    </button>
                                ))}
                            </div>
                            <span className="font-bold text-xl mt-4">Dos jornadas</span>
                            <Switch
                                isSelected={isTwoShifts} // Usa isSelected en lugar de checked si es un componente de NextUI
                                color="success"
                                onChange={(e) => {
                                    const newValue = e.target.checked;
                                    console.log("Nuevo estado del switch:", newValue); // Debug
                                    setIsTwoShifts(newValue);
                                    localStorage.setItem("isTwoShifts", JSON.stringify(newValue));
                                }}
                            />
                        </div>

                        <div className="flex flex-col space-y-4 w-full lg:w-1/2">
                            <span className="font-bold text-xl">Jornada 1</span>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label>Hora de inicio</label>
                                    <input type="time" value={selectedHoursJoin} onChange={(e) => setSelectedHoursJoin(e.target.value)} />
                                </div>
                                <div className="flex flex-col">
                                    <label>Hora de salida</label>
                                    <input type="time" value={selectedHoursExit} onChange={(e) => setSelectedHoursExit(e.target.value)} />
                                </div>
                            </div>

                            {isTwoShifts && (
                                <div>
                                    <span className="font-bold text-xl">Jornada 2</span>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col">
                                            <label>Hora de inicio</label>
                                            <input type="time" value={selectedHoursJoin2} onChange={(e) => setSelectedHoursJoin2(e.target.value)} />
                                        </div>
                                        <div className="flex flex-col">
                                            <label>Hora de salida</label>
                                            <input type="time" value={selectedHoursExit2} onChange={(e) => setSelectedHoursExit2(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button auto flat color="error" onClick={() => onOpenChange(false)}>
                        Cancelar
                    </Button>
                    <Button auto onClick={saveSchedule} color="primary" disabled={isLoading}>
                        {isLoading ? "Guardando..." : "Guardar"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ScheduleModal;
//hola al mundo
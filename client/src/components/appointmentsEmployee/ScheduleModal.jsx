import React, { useEffect, useState } from 'react';
import { Modal, Button, Switch, ModalFooter, ModalHeader, ModalBody, ModalContent } from '@nextui-org/react';

const ScheduleModal = ({ isOpen, onOpenChange }) => {
    const [isTwoShifts, setIsTwoShifts] = useState(false); // Por defecto, "Dos jornadas" está desactivado

    const [selectedHoursJoin, setSelectedHoursJoin] = useState([]);
    const [selectedHoursExit, setSelectedHoursExit] = useState([]);
    const [selectedHoursJoin2, setSelectedHoursJoin2] = useState([]);
    const [selectedHoursExit2, setSelectedHoursExit2] = useState([]);
    useEffect(() => {
        console.log("Join",selectedHoursJoin)
        console.log("Exit",selectedHoursExit)
        console.log("Join2",selectedHoursJoin2)
        console.log("Exit2",selectedHoursExit2)
    }, [selectedHoursJoin, selectedHoursExit, selectedHoursJoin2, selectedHoursExit2])
  

    // Estado para gestionar los días seleccionados, todos desactivados inicialmente
    const [selectedDays, setSelectedDays] = useState({
        LUN: false,
        MAR: false,
        MIÉ: false,
        JUE: false,
        VIE: false,
        SAB: false,
        DOM: false,
    });

    // Función para manejar la selección de días
    const toggleDay = (day) => {
        setSelectedDays((prev) => ({
            ...prev,
            [day]: !prev[day],
        }));
    };

    return (
        <Modal
            closeButton
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size='3xl'
            backdrop="blur"
            classNames={{
                base: "w-[900px] rounded-b-none sm:rounded-xl !m-0 sm:!m-1",
                wrapper: "1/2lg:w-[75%] h-full flex justify-self-end ",
                backdrop: "1/2lg:w-[75%] h-full flex justify-self-end ",
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            <h1 className="text-4xl text-[#252527] font-bold">Gestionar horario</h1>
                        </ModalHeader>
                        <ModalBody>
                        <p className="text-gray-600">Gestione su tiempo en servicio</p>
                            <div className="flex flex-col lg:flex-row lg:space-x-8">
                                {/* Sección Izquierda */}
                                <div className="flex flex-col space-y-4 w-full lg:w-1/2">
                                    
                                    
                                    {/* Días de la semana */}
                                    <div className="flex flex-col space-y-4">
                                        <span className="font-bold text-xl">Días</span>
                                        <div className="grid grid-cols-5 gap-3">
                                            {['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SAB', 'DOM'].map((day, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => toggleDay(day)}
                                                    className={`w-10 h-10 p-7 rounded-full ${
                                                        selectedDays[day] ? 'bg-[#252527] text-white' : 'bg-gray-200 text-black'
                                                    } flex justify-center items-center`}
                                                >
                                                    {day}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Switch de Dos jornadas */}
                                    <div className="flex flex-col space-x-2 mt-4">
                                        <span className="font-bold mb-4 mt-4 text-xl">Dos jornadas</span>
                                        <Switch
                                            checked={isTwoShifts}
                                            onChange={(e) => setIsTwoShifts(e.target.checked)}
                                        />
                                    </div>
                                </div>

                                {/* Sección Derecha */}
                                <div className="flex flex-col space-y-4 w-full lg:w-1/2">
                                <span className="font-bold text-xl">Jornada 1</span>
                                    {/* Jornada 1 */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col">
                                            <label className="text-[#252527]">Hora de inicio</label>
                                            <select onChange={(e) => setSelectedHoursJoin(e.target.value)} className="border rounded-md p-2">
                                                <option >9 a.m.</option>
                                                <option>10 a.m.</option>
                                                <option>11 a.m.</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-[#252527]">Hora de salida</label>
                                            <select onChange={(e) => setSelectedHoursExit(e.target.value)} className="border rounded-md p-2">
                                                <option>12 m.</option>
                                                <option>1 p.m.</option>
                                                <option>2 p.m.</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    {/* Jornada 2 (si Dos jornadas está activado) */}
                                    <div
                                        className={`transition-all duration-700 ease-in-out ${
                                            isTwoShifts ? 'opacity-100 max-h-full' : 'opacity-0 max-h-0 overflow-hidden'
                                        }`}
                                    >
                                        <span className="font-bold text-xl">Jornada 2</span>
                                        <div className="grid grid-cols-2 gap-4 mt-4">
                                            <div className="flex flex-col">
                                                <label className="text-gray-600">Hora de inicio</label>
                                                <select onChange={(e) => setSelectedHoursJoin2(e.target.value)} className="border rounded-md p-2">
                                                    <option>2 p.m.</option>
                                                    <option>3 p.m.</option>
                                                    <option>4 p.m.</option>
                                                </select>
                                            </div>
                                            <div className="flex flex-col">
                                                <label className="text-gray-600">Hora de salida</label>
                                                <select onChange={(e) => setSelectedHoursExit2(e.target.value)} className="border rounded-md p-2">
                                                    <option>6 p.m.</option>
                                                    <option>7 p.m.</option>
                                                    <option>8 p.m.</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button auto flat color="error" onPress={onClose}>
                                Cancelar
                            </Button>
                            <Button auto onClick={onClose} color="primary">
                                Guardar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

// Exportación correcta del componente
export default ScheduleModal;

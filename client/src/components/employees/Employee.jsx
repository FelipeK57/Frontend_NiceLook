import PropTypes from "prop-types";
import ButtonCustom from "../global/ButtonCustom"
import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import CreateEmployeeModal from "./EmployeeModal";

function Employee({ colNumber, button, estado }) {

    Employee.propTypes = {
        colNumber: PropTypes.string,
        button: PropTypes.bool,
        estado: PropTypes.bool
    };

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [backdrop, setBackdrop] = useState("blur");

    const handleOpen = () => {
        setBackdrop("blur");
        onOpen();
    };

    return (
        <div className={`EmployeeContent border-2 border-slate-200 rounded-full py-2 grid pr-10 place-items-center
        grid-cols-${colNumber} `}>
            <h3 className=" font-bold text-center">112356</h3>
            <h3 className="text-center flex">Nombre</h3>
            <h3 className="text-center flex">1234567890</h3>
            <h3 className="text-center flex">correo@gmail.com</h3>
            <h3 className={`text-center flex ${estado ? "text-green-500" : "text-red-500"}`}>{estado ? "Activo" : "Deshabilitado"}</h3>
            {button ? (
                <ButtonCustom secondary radius="full" isIconOnly onClick={handleOpen} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                </ButtonCustom>
            ) : null}

            <CreateEmployeeModal isOpen={isOpen} onClose={onClose} backdrop={backdrop} employeeReviews />
        </div>
    );
}

export default Employee;
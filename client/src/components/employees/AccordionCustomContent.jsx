import PropTypes from "prop-types"
import ButtonCustom from "../global/ButtonCustom"
import { useDisclosure } from "@nextui-org/react"
import { useState } from "react"
import CreateEmployeeModal from "../employees/EmployeeModal"

export function AccordionCustomTitle({nombre, nuip, qualification, children }) {

    AccordionCustomTitle.propTypes = {
        nombre: PropTypes.string.isRequired,
        nuip: PropTypes.string,
        qualification: PropTypes.bool,
        children: PropTypes.node,
        isOpened: PropTypes.bool
    }

    const [isOpened, setIsOpened] = useState(false);

    const handleOpen = () => {
        setIsOpened(!isOpened);
    }

    return (
        <div onClick={handleOpen} className={`flex ${qualification && "flex-col"} sm:flex-row justify-between sm:items-center relative`}>
            <h2 className="text-lg font-bold">{nombre}</h2>
            {qualification ? children : null}
            {nuip ? <h2 className="text-base ">{nuip}</h2>
                :
                (qualification ? <div className={`flex gap-2 transition-all duration-300 w-fit ${isOpened ? " translate-x-[300%] -translate-y-[305%] " : null}`}>
                    <span className="text-lg">4.5/5</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" text-primary size-6">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                    </svg>
                </div> : null)}
        </div>
    )
}

export function AccordionCustomContent({ estado, button, children }) {

    AccordionCustomContent.propTypes = {
        estado: PropTypes.bool.isRequired,
        button: PropTypes.bool,
        children: PropTypes.node
    }

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [backdrop, setBackdrop] = useState("blur");

    const handleOpen = () => {
        setBackdrop("blur");
        onOpen();
    };

    return (<>
        <div className={children ? "hidden sm:flex flex-col gap-4" : "flex flex-col gap-4"}>
            <div className="flex gap-2">
                <h3 className="font-semibold">Telefono:</h3>
                <h3>1234567890</h3>
            </div>
            <div className="flex gap-2">
                <h3 className="font-semibold">Correo:</h3>
                <h3>correo@gmail.com</h3>
            </div>
            <div className="flex gap-2">
                <h3 className="font-semibold ">Estado:</h3>
                <h3 className={estado ? "text-green-500" : "text-red-500"}>{estado ? "Activo" : "Deshabilitado"}</h3>
            </div>
            <div className="flex self-end">
                {button ? (
                    <ButtonCustom secondary radius="full" isIconOnly onClick={handleOpen} >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                    </ButtonCustom>
                ) : null}
            </div>
            <CreateEmployeeModal isOpen={isOpen} onClose={onClose} backdrop={backdrop} employeeReviews />
        </div>
        <div>
            {children}
        </div>
    </>
    )
}


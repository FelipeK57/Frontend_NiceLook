import PropTypes from "prop-types"
import ButtonCustom from "../global/ButtonCustom"

export function AccordionCustomTitle({nombre, nuip}) {

    AccordionCustomTitle.propTypes = {
        nombre: PropTypes.string.isRequired,
        nuip: PropTypes.string.isRequired
    }

    return (
        <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">{nombre}</h2>
            <h2 className="text-base ">{nuip}</h2>
        </div>
    )
}

export function AccordionCustomContent({estado, button}) {

    AccordionCustomContent.propTypes = {
        estado: PropTypes.bool.isRequired,
        button: PropTypes.bool
    }

    return (
        <div className="flex flex-col gap-4">
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
                <ButtonCustom secondary radius="full" isIconOnly >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                </ButtonCustom>
            ) : null}
            </div>
        </div>
    )
}


import ButtonCustom from "../global/ButtonCustom"
import PropTypes from "prop-types"

function Services({ isSelected }) {
    Services.propTypes = {
        isSelected: PropTypes.bool
    }
    return (
        <div className="flex flex-row w-full border-slate-200 border-2 rounded-2xl p-4 gap-2">
            <div className="bg-slate-400 w-1/8 h-full rounded-2xl">
                <img src="" alt="ServiceImage" />
            </div>
            <div className="w-full flex flex-col">
                <div className="flex flex-row justify-between items-center">
                    <h3 className="sm:text-2xl text-lg text-zinc-950 font-bold">barberia + peluqueria</h3>
                    <h3>Votacion</h3>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <h4>Precio: $00000</h4>
                    <ButtonCustom isIconOnly classStyles={"rounded-full bg-red-transparent border-2 border-slate-200    "}>
                        {isSelected ?
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                            </svg>
                        }

                    </ButtonCustom>
                </div>

            </div>
        </div>
    )
}

export default Services
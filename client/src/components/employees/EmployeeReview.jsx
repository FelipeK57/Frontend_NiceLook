import ReviewComponent from "../global/ReviewComponent"

function EmployeeReview() {
    return (
        <div className=" flex flex-col min-w-[60%] mt-8 border-2 border-slate-200 rounded-2xl py-2 px-4 ">
            <div className="flex  justify-between w-full">
                <h3 className="text-lg font-bold text-nowrap">Nombre del cliente</h3>
                <ReviewComponent reviews="4.5"/>
            </div>
            <div>
                <h3 className="text-lg text-nowrap">Servicio:</h3>
                <h3 className="text-lg text-nowrap">Corte de cabello + barba</h3>
            </div>
            <div>
                <h3 className="text-base text-nowrap">Comentario:</h3>
                <p className="h-[16vh] text-justify overflow-y-auto pr-2
                scrollbar scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300 scrollbar-thumb-rounded-full active:scrollbar-thumb-primary">
                    ¡Pana! Me encantó el corte, quedó súper bacano. El man que me atendió es un crack, me entendió al toque lo que quería. ¡Me siento como todo un influencer!
                </p>
            </div>
        </div>
    )
}

export default EmployeeReview
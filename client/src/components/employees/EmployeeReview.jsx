function EmployeeReview() {
    return (
        <div className="flex flex-col min-w-[60%] mt-8 border-2 border-slate-200 rounded-2xl py-2 px-4 ">
            <div className="flex  justify-between w-full">
                <h3 className="text-lg font-bold text-nowrap">Nombre del cliente</h3>
                <div className="flex gap-2">
                    <span className="text-lg">4.5/5</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" text-primary size-6">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                    </svg>
                </div>
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
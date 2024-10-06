import { lazy, Suspense } from "react";

//+++++++++ Importacion dinamica +++++++++
const LazyEmployee = lazy(() => import("./Employee"))

function EmployeesList() {
    return (
        <article className="border-t-2 border-slate-950 pt-2">
            <div className="EmployeesListHeader grid pr-16 grid-cols-[1fr_1fr_1fr_1fr_1fr_0.15fr] py-2 ">
                <h2 className="font-semibold text-center">NUIP</h2>
                <h2 className="font-semibold text-center">Nombre</h2>
                <h2 className="font-semibold text-center">Telefono</h2>
                <h2 className="font-semibold text-center">Correo</h2>
                <h2 className="font-semibold text-center">Estado</h2>
            </div>
            <div className="EmployeesListConstent flex flex-col gap-2 overflow-y-scroll max-h-[80vh] pr-2 
            scrollbar scrollbar-thumb-slate-200  scrollbar-thumb-rounded-full scrollbar-track-rounded-full active:scrollbar-thumb-primary hover:scrollbar-thumb-slate-300">

                {/* Este es el componente de empleado cargado de forma perezosa el cual recibe el numero de columnas si tiene o no un boton y el estado */}
                {/* Recordar que si se pone el button se debe agregar una columna de 0.15fr para el mismo */}

                <Suspense fallback={<div>Loading...</div>}>
                    <LazyEmployee colNumber={'[1fr_1fr_1fr_1fr_1fr_0.15fr]'} button estado={true} />
                </Suspense>
                <Suspense fallback={<div>Loading...</div>}>
                    <LazyEmployee colNumber={'[1fr_1fr_1fr_1fr_1fr_0.15fr]'} button estado={true} />
                </Suspense>
                <Suspense fallback={<div>Loading...</div>}>
                    <LazyEmployee colNumber={'[1fr_1fr_1fr_1fr_1fr_0.15fr]'} button estado={true} />
                </Suspense>
                <Suspense fallback={<div>Loading...</div>}>
                    <LazyEmployee colNumber={'[1fr_1fr_1fr_1fr_1fr_0.15fr]'} button estado={true} />
                </Suspense>
                <Suspense fallback={<div>Loading...</div>}>
                    <LazyEmployee colNumber={'[1fr_1fr_1fr_1fr_1fr_0.15fr]'} button estado={true} />
                </Suspense>
                <Suspense fallback={<div>Loading...</div>}>
                    <LazyEmployee colNumber={'[1fr_1fr_1fr_1fr_1fr_0.15fr]'} button estado={true} />
                </Suspense>
                <Suspense fallback={<div>Loading...</div>}>
                    <LazyEmployee colNumber={'[1fr_1fr_1fr_1fr_1fr_0.15fr]'} button estado={true} />
                </Suspense>
                <Suspense fallback={<div>Loading...</div>}>
                    <LazyEmployee colNumber={'[1fr_1fr_1fr_1fr_1fr_0.15fr]'} button estado={true} />
                </Suspense>
                <Suspense fallback={<div>Loading...</div>}>
                    <LazyEmployee colNumber={'[1fr_1fr_1fr_1fr_1fr_0.15fr]'} button estado={true} />
                </Suspense>
                <Suspense fallback={<div>Loading...</div>}>
                    <LazyEmployee colNumber={'[1fr_1fr_1fr_1fr_1fr_0.15fr]'} button estado={true} />
                </Suspense>
                <Suspense fallback={<div>Loading...</div>}>
                    <LazyEmployee colNumber={'[1fr_1fr_1fr_1fr_1fr_0.15fr]'} button estado={true} />
                </Suspense>
                <Suspense fallback={<div>Loading...</div>}>
                    <LazyEmployee colNumber={'[1fr_1fr_1fr_1fr_1fr_0.15fr]'} button estado={true} />
                </Suspense>
                <Suspense fallback={<div>Loading...</div>}>
                    <LazyEmployee colNumber={'[1fr_1fr_1fr_1fr_1fr_0.15fr]'} button estado={true} />
                </Suspense>
                <Suspense fallback={<div>Loading...</div>}>
                    <LazyEmployee colNumber={'[1fr_1fr_1fr_1fr_1fr_0.15fr]'} button estado={true} />
                </Suspense>
                <Suspense fallback={<div>Loading...</div>}>
                    <LazyEmployee colNumber={'[1fr_1fr_1fr_1fr_1fr_0.15fr]'} button estado={true} />
                </Suspense>
            </div>
        </article>
    );
}

export default EmployeesList;
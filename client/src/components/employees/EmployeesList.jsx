import { lazy, Suspense } from "react";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import {AccordionCustomTitle, AccordionCustomContent} from "./AccordionCustomContent";

//+++++++++ Importacion dinamica +++++++++
const LazyEmployee = lazy(() => import("./Employee"))

function EmployeesList() {

    const itemClasses = {
        base: "rounded-[20px] shadow-none border-2 border-slate-200",

    }

    return (<>
        <article className="hidden 1/2lg:block border-t-2 border-slate-950 pt-2">
            <div className="EmployeesListHeader grid pr-16 grid-cols-[1fr_1fr_1fr_1fr_1fr_0.15fr] pt-2 ">
                <h2 className="font-semibold text-center">NUIP</h2>
                <h2 className="font-semibold text-center">Nombre</h2>
                <h2 className="font-semibold text-center">Telefono</h2>
                <h2 className="font-semibold text-center">Correo</h2>
                <h2 className="font-semibold text-center">Estado</h2>
                <Button radius="full" isIconOnly disabled className="opacity-0 hover:opacity-0" />
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
        <article className="flex 1/2lg:hidden">
            <Accordion className=" max-h-[70vh] overflow-y-auto
            md:scrollbar md:scrollbar-thumb-slate-200  md:scrollbar-thumb-rounded-full md:scrollbar-track-rounded-full md:active:scrollbar-thumb-primary md:hover:scrollbar-thumb-slate-300
            " variant="splitted" itemClasses={itemClasses}>

                {/* Aqui va la lista de empleados cargados como AccordionItems recive un AccordionCustomTitle y un AccordionCustomContent */}
                {/* El AccordionCustomContent recive un boolean para saber si lleva o no un button */}
                {/* El AccordionCustomTitle recive el nombre del empleado y su nuip */}

                <AccordionItem key="1" aria-label="Empleado 1" title={<AccordionCustomTitle nombre="Empleado 1" nuip="# Nuip" />}>
                    <AccordionCustomContent button={true} />
                </AccordionItem>
                <AccordionItem key="2" aria-label="Empleado 2" title={<AccordionCustomTitle nombre="Empleado 2" nuip="# Nuip" />}>
                    <AccordionCustomContent button={true} />
                </AccordionItem>
                <AccordionItem key="3" aria-label="Empleado 3" title={<AccordionCustomTitle nombre="Empleado 3" nuip="# Nuip" />}>
                    <AccordionCustomContent button={true} />
                </AccordionItem>
            </Accordion>
        </article>
    </>
    );
}

export default EmployeesList;
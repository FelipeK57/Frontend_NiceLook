import { forwardRef, lazy, Suspense, useEffect, useImperativeHandle, useState } from "react";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { AccordionCustomTitle, AccordionCustomContent } from "./AccordionCustomContent";
import { getEmployees } from "../../Api/employee/employee.js";
import PropTypes from "prop-types"
import Cookies from "js-cookie";

//+++++++++ Importacion dinamica +++++++++
const LazyEmployee = lazy(() => import("./Employee"))

const EmployeesList = forwardRef(({ filteredEmployees }, ref) => {
    EmployeesList.propTypes = {
        filteredEmployees: PropTypes.array,
        listRef: PropTypes.object,
        refListUpdate: PropTypes.func,
    }

    const itemClasses = {
        base: "rounded-[20px] shadow-none border-2 border-slate-200",
    }

    const [employees, setEmployees] = useState([]);

    function loadEmployees() {
        const promise = new Promise((resolve, reject) => {
            const response = getEmployees(Cookies.get("establishmentId"));
            setTimeout(() => {
                // si todo va bien, se llama a resolve
                resolve(response);
                reject("Ocurrio un error");
            }, 0);
        });
        promise.then((resultado) => {
            setEmployees(resultado.data);
        });
        promise.catch((error) => {
            console.log(error);
        })
        return (promise)
    }

    useImperativeHandle(ref, () => ({
        loadEmployees: loadEmployees
    }));

    useEffect(() => {
        loadEmployees();

    }, []);

    console.log("Empleados filtrados", filteredEmployees)

    return (<>
        <article className="hidden 1/2lg:block border-t-2 border-slate-950 pt-2">
            <div className="EmployeesListHeader grid pr-16 grid-cols-[1fr_1fr_1fr_1fr_1fr_0.15fr] pt-2 ">
                <h2 className="font-semibold text-center">Codigo</h2>
                <h2 className="font-semibold text-center">Apellidos</h2>
                <h2 className="font-semibold text-center">Telefono</h2>
                <h2 className="font-semibold text-center">Correo</h2>
                <h2 className="font-semibold text-center">Estado</h2>
                <Button radius="full" isIconOnly disabled className="opacity-0 hover:opacity-0" />
            </div>
            <div className="EmployeesListConstent flex flex-col gap-2 overflow-y-scroll max-h-[80vh] pr-2 
            scrollbar scrollbar-thumb-slate-200  scrollbar-thumb-rounded-full scrollbar-track-rounded-full active:scrollbar-thumb-primary hover:scrollbar-thumb-slate-300">

                {/* Este es el componente de empleado cargado de forma perezosa el cual recibe el numero de columnas si tiene o no un boton y el estado */}
                {/* Recordar que si se pone el button se debe agregar una columna de 0.15fr para el mismo */}

                {filteredEmployees ? filteredEmployees?.map((employee) => (
                    <Suspense key={employee.id} fallback={<div>Loading...</div>}>
                        <LazyEmployee user={employee.user} employee={employee} colNumber={'[1fr_1fr_1fr_1fr_1fr_0.15fr]'} button estado={employee.state} reloadList={loadEmployees} />
                    </Suspense>
                )) :
                    <>
                        {employees?.receptionists?.length > 0 &&
                            <>
                                <h2 className="font-semibold text-center border-2 rounded-full border-black">Recepcionistas</h2>
                                {employees?.receptionists?.map((employee) => (
                                    <Suspense key={employee.id} fallback={<div>Loading...</div>}>
                                        <LazyEmployee user={employee.user} employee={employee} colNumber={'[1fr_1fr_1fr_1fr_1fr_0.15fr]'} button estado={employee.state} reloadList={loadEmployees} receptionists={true} />
                                    </Suspense>
                                ))}
                            </>
                        }

                        {
                            <>
                                <h2 className="font-semibold text-center border-2 rounded-full border-black">Profesionales</h2>
                                {employees?.employees?.map((employee) => (
                                    <Suspense key={employee.id} fallback={<div>Loading...</div>}>
                                        <LazyEmployee user={employee.user} employee={employee} colNumber={'[1fr_1fr_1fr_1fr_1fr_0.15fr]'} button estado={employee.state} reloadList={loadEmployees} />
                                    </Suspense>
                                ))}
                            </>
                        }
                    </>
                }

            </div>
        </article>
        <article className="flex flex-col 1/2lg:hidden h-[78vh] overflow-y-auto
            md:scrollbar md:scrollbar-thumb-slate-200  md:scrollbar-thumb-rounded-full md:scrollbar-track-rounded-full md:active:scrollbar-thumb-primary md:hover:scrollbar-thumb-slate-300">
            {!filteredEmployees && <h2 className="font-semibold text-center border-2 rounded-full border-black my-2">Recepcionistas</h2>}
            <Accordion variant="splitted" itemClasses={itemClasses}>
                {!filteredEmployees ?
                    employees?.receptionists?.length > 0 &&
                    employees?.receptionists?.map((employee) => (
                        <AccordionItem key={employee.id} aria-label="Empleado 1" title={<AccordionCustomTitle nombre={employee.user.last_name} nuip={employee.code} />}>
                            <AccordionCustomContent receptionists={true} button={true} employee={employee} user={employee.user} estado={employee.state} reloadList={loadEmployees} />
                        </AccordionItem>
                    ))
                    : null}
            </Accordion>
            {!filteredEmployees && <h2 className="font-semibold text-center border-2 rounded-full border-black my-2">Profesionales</h2>}
            <Accordion variant="splitted" itemClasses={itemClasses}>

                {/* Aqui va la lista de empleados cargados como AccordionItems recive un AccordionCustomTitle y un AccordionCustomContent */}
                {/* El AccordionCustomContent recive un boolean para saber si lleva o no un button */}
                {/* El AccordionCustomTitle recive el nombre del empleado y su nuip */}
                {filteredEmployees ? filteredEmployees?.map((employee) => (
                    <AccordionItem key={employee.id} aria-label="Empleado 1" title={<AccordionCustomTitle nombre={employee.user.last_name} nuip={employee.code} />}>
                        <AccordionCustomContent button={true} employee={employee} user={employee.user} estado={employee.state} reloadList={loadEmployees} />
                    </AccordionItem>
                )) : employees?.employees?.map((employee) => (
                    <AccordionItem key={employee.id} aria-label="Empleado 1" title={<AccordionCustomTitle nombre={employee.user.last_name} nuip={employee.code} />}>
                        <AccordionCustomContent button={true} employee={employee} user={employee.user} estado={employee.state} reloadList={loadEmployees} />
                    </AccordionItem>
                ))}
            </Accordion>

        </article>
    </>
    );
});

EmployeesList.displayName = "EmployeesList";

export default EmployeesList;
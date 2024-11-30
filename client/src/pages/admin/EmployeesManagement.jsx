import { Button, Input, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import ButtonCustom from "../../components/global/ButtonCustom";
import EmployeesList from "../../components/employees/EmployeesList";
import { useDisclosure } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { searchEmployees } from "../../api/employee/employee";
import CreateEmployeeModal from "../../components/employees/EmployeeModal";

function EmployeesManagement() {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [backdrop, setBackdrop] = useState("blur");
    const [searchEmployee, setSearchEmployee] = useState("");
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [refListUpdate, setRefListUpdate] = useState(null);
    const refList = useRef(null);

    const handleOpen = () => {
        setBackdrop("blur");
        onOpen();
    };


    const handleSearch = async (event) => {
        const query = event.target.value;
        setSearchEmployee(query);
        if (query.length !== 0) {
            const response = await searchEmployees(query);
            setFilteredEmployees(response.data);
        } else {
            setFilteredEmployees([]);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setRefListUpdate(refList);
        }, 200);
        return () => clearTimeout(timer);
    }, [])

    return (
        <main className="flex max-h-screen h-screen bg-[#ffffff]">
            <section className="flex flex-col gap-6 w-full py-8 px-4 md:px-10">
                <div className="EmplyeesManagementheader flex justify-between pb-2 md:flex-row flex-col md:gap-0 gap-8">
                    <div className="flex gap-4 items-center">
                        <h1 className="hidden lg:block text-4xl text-zinc-950 font-bold">Gestion de profesionales</h1>
                        <Popover placement="right">
                            <PopoverTrigger>
                                <Button
                                    className="text-xl font-bold rounded-full shadow-sm border-1 border-slate-500 shadow-slate-500"
                                    isIconOnly
                                    size="sm"
                                    variant="bordered">
                                    ?
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div className="px-1 py-2">
                                    <div className="text-small font-bold">Ayuda</div>
                                    <div className="text-tiny max-w-[350px]">
                                        <p>
                                            En este apartado usted podrá visualizar la información de los empleados registrados, editar dicha información o registrar nuevos empleados en su establecimiento.
                                        </p>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="flex lg:hidden gap-4 items-center">
                        <ButtonCustom secondary isIconOnly classStyles="rounded-full 1/2lg:hidden flex" >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                            </svg>
                        </ButtonCustom>
                        <h1 className="block lg:hidden text-2xl md:text-4xl text-zinc-950 font-bold">Gestion de empleados</h1>
                    </div>
                    <div className="EmployeesManagementHeaderButtons flex gap-4">
                        <Input
                            placeholder="Buscar por nombre o apellido"
                            variant="bordered"
                            value={searchEmployee}
                            onChange={(e) => handleSearch(e)}
                            classNames={{
                                label: "",
                                input: [],
                                innerWrapper: "",
                                inputWrapper: [
                                    "border-2",
                                    "border-slate-200",
                                    "px-6",
                                    "py-5",
                                ],
                            }}
                            endContent={
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            }
                        />
                        <ButtonCustom primary name="Crear" classStyles="1/2xl:w-60 md:w-20 1/2lg:flex hidden" onClick={handleOpen} />
                        <ButtonCustom primary isIconOnly classStyles="rounded-full 1/2lg:hidden flex" onClick={handleOpen} >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                            </svg>
                        </ButtonCustom>
                    </div>
                </div>
                <div className="EmployeesManagementBody">
                    <EmployeesList ref={refList} filteredEmployees={filteredEmployees.length !== 0 ? filteredEmployees : null} />
                </div>
                <CreateEmployeeModal listRef={refListUpdate} isOpen={isOpen} onClose={onClose} backdrop={backdrop} />
            </section>
        </main>
    );
}

export default EmployeesManagement;
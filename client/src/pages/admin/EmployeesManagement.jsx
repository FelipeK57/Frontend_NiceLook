import { Input } from "@nextui-org/react";
import ButtonCustom from "../../components/global/ButtonCustom";
import EmployeesList from "../../components/employees/EmployeesList";
import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import CreateEmployeeModal from "../../components/employees/EmployeeModal";


function EmployeesManagement() {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [backdrop, setBackdrop] = useState("blur");

    const handleOpen = () => {
        setBackdrop("blur");
        onOpen();
    };

    return (
        <main className="flex max-h-screen h-screen bg-[#ffffff]">
            <section className="flex flex-col gap-6 w-full py-8 px-10">
                <div className="EmplyeesManagementheader flex justify-between pb-2">
                    <h1 className="text-4xl text-zinc-950 font-bold">Gestion de empleados</h1>
                    <div className="EmployeesManagementHeaderButtons flex gap-4">
                        <Input
                            placeholder="Buscar"
                            variant="bordered"
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
                        <ButtonCustom primary name="Crear" classStyles="w-60" onClick={handleOpen} />
                    </div>
                </div>
                <div className="EmployeesManagementBody">
                    <EmployeesList />
                </div>
                <CreateEmployeeModal isOpen={isOpen} onClose={onClose} backdrop={backdrop} />
            </section>
        </main>
    );
}

export default EmployeesManagement;
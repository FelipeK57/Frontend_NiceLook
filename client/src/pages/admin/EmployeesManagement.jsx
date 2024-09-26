import { Input } from "@nextui-org/react";
import Sidebar from "../../components/global/Sidebar";
import ButtonCustom from "../../components/global/ButtonCustom";
import EmployeesList from "../../components/employees/EmployeesList";


function EmployeesManagement() {
    return (
        <main className="flex h-screen bg-[#ffffff]">
            <Sidebar />
            <section className="flex flex-col gap-6 w-4/5 py-8 px-10">
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
                        <ButtonCustom primary name="Crear" classStyles="w-60" />
                    </div>
                </div>
                <div className="EmployeesManagementBody">
                    <EmployeesList />
                </div>
            </section>
        </main>
    );
}

export default EmployeesManagement;
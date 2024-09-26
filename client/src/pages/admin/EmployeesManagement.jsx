import { Input } from "@nextui-org/react";
import Sidebar from "../../components/global/Sidebar";
import ButtonCustom from "../../components/global/ButtonCustom";
import EmployeesList from "../../components/employees/EmployeesList";
import SearchIcon from "../../components/icons/SearchIcon";


function EmployeesManagement() {
    return (
        <main className="flex w-full h-screen bg-[#ffffff]">
            <section className="flex flex-col w-full gap-6 py-8 px-10">
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
                                <SearchIcon />
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
import { Input } from "@nextui-org/react";
import Sidebar from "../../components/global/Sidebar";
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
    },[])

    return (
        <main className="flex w-full h-screen bg-[#ffffff]">
            <section className="flex flex-col w-full gap-6 py-8 px-10">
                <div className="EmplyeesManagementheader flex justify-between pb-2">
                    <h1 className="text-4xl text-zinc-950 font-bold">Gestion de empleados</h1>
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
                                <SearchIcon />
                            }
                        />
                        <ButtonCustom primary name="Crear" classStyles="w-60" />
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
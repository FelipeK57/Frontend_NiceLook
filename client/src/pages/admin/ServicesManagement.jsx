import { Input } from "@nextui-org/react";
import Categories from "../../components/services/Categories";
import ServicesList from "../../components/services/ServicesList";
import SearchIcon from "../../components/icons/SearchIcon";
import { useState } from "react";
import ModalNewService from "../../components/services/ModalNewService";
import ButtonCustom from "../../components/global/ButtonCustom";
function ServicesManagement() {
  const [serviceName, setServiceName] = useState("");
  const [isModalNewServiceOpen, setIsModalNewServiceOpen] = useState(false);

  const handleOpen = () => setIsModalNewServiceOpen(true);
  const handleClose = () => setIsModalNewServiceOpen(false);

  const handleServiceNameChange = (event) => {
    setServiceName(event.target.value);
  };

  return (
    <main className="flex h-screen bg-[#ffffff]">
      <section className="flex flex-col gap-6 w-full py-8 px-10">
        <h1 className="text-4xl text-zinc-950 font-bold">
          Gestiona las categorias y servicios
        </h1>
        <div className="flex gap-6 w-full">
          <div className="w-1/5">
            <Categories />
          </div>
          <div className="flex flex-col gap-6 w-3/5">
            <div className="flex gap-2">
              <Input
                onChange={handleServiceNameChange}
                value={serviceName}
                placeholder="Barba, Corte de Cabello..."
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
                endContent={<SearchIcon />}
              />
              <ButtonCustom
                classStyles={"p-5"}
                action={handleOpen}
                secondary
                name={"Crear Servicio"}
              />
              <ModalNewService
                isOpen={isModalNewServiceOpen}
                onClose={handleClose}
              />
            </div>
            <div>
              <ServicesList />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ServicesManagement;

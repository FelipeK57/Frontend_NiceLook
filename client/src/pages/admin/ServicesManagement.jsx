import { Input } from "@nextui-org/react";
import Categories from "../../components/services/Categories";
import ServicesList from "../../components/services/ServicesList";
import SearchIcon from "../../components/icons/SearchIcon";
import { useEffect, useState } from "react";
import ModalNewService from "../../components/services/ModalNewService";
import ButtonCustom from "../../components/global/ButtonCustom";
import SelectCategorie from "../../components/services/SelectCategorie";
import axios from "axios";

/**
 * ServicesManagement component renders the main interface for managing categories and services.
 * It includes a search input, a button to open a modal for creating a new service, and a list of services.
 *
 * @component
 * @example
 * return (
 *   <ServicesManagement />
 * )
 *
 * @returns {JSX.Element} The rendered component.
 */
function ServicesManagement() {
  const [serviceName, setServiceName] = useState("");
  const [isModalNewServiceOpen, setIsModalNewServiceOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);

  /* Fetch list services */
  useEffect(() => {
    const getListServices = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/list_service/"
        );
        console.log(response.data);
        setServices(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getListServices();
  }, []);

  /* Filter services based on selected category */
  useEffect(() => {
    if (selectCategory) {
      if (selectCategory === "Todos") {
        setFilteredServices(services);
        return;
      }
      const servicesFiltered = services.filter(
        (service) => service.category === selectCategory
      );
      console.log(servicesFiltered);
      setFilteredServices(servicesFiltered);
    } else {
      setFilteredServices(services);
    }
  }, [selectCategory, services]);

  const handleOpen = () => setIsModalNewServiceOpen(true);
  const handleClose = () => setIsModalNewServiceOpen(false);

  const handleServiceNameChange = (event) => {
    setServiceName(event.target.value);
  };

  return (
    <main className="flex h-screen bg-[#ffffff]">
      <section className="flex flex-col gap-6 w-full py-8 px-10">
        <h1 className="text-2xl lg:text-4xl text-zinc-950 font-bold">
          Gestiona las categorias y servicios
        </h1>
        <div className="block lg:hidden">
          <SelectCategorie setSelectCategory={setSelectCategory} />
        </div>
        <div className="flex gap-6 w-full">
          <div className="hidden lg:block w-1/5">
            <Categories setSelectCategory={setSelectCategory} />
          </div>
          <div className="flex flex-col gap-6 w-full lg:w-3/4">
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
                primary
                name={"Crear Servicio"}
              />
              <ModalNewService
                isOpen={isModalNewServiceOpen}
                onClose={handleClose}
              />
            </div>
            <div>
              <ServicesList services={filteredServices} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ServicesManagement;

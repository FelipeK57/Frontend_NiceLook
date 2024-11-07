import { Select, SelectItem } from "@nextui-org/react";
import Services from "./Services";
import { useEffect, useState } from "react";
import {
  getEmployeeServices,
  getEstablishmentServices,
} from "../../Api/employeeServices/employeeServicesApi";

function ServicesList() {
  const [establishmentServices, setEstablishmentServices] = useState([]);
  const [employeeServices, setEmployeeServices] = useState([]);

  function loadEmployeeServices() {
    const promise = new Promise((resolve, reject) => {
      const response = getEmployeeServices(1);
      setTimeout(() => {
        resolve(response);
        reject("Ocurrio un error");
      }, 0);
    });
    promise.then((resultado) => {
      console.log(resultado.data);
      setEmployeeServices(resultado.data);
    });
    promise.catch((error) => {
      console.log(error);
    });
    return promise;
  }

  useEffect(() => {
    function loadEstablishmentServices() {
      const promise = new Promise((resolve, reject) => {
        const response = getEstablishmentServices(1);
        setTimeout(() => {
          // si todo va bien, se llama a resolve
          resolve(response);
          reject("Ocurrio un error");
        }, 0);
      });
      promise.then((resultado) => {
        console.log(resultado.data);
        setEstablishmentServices(resultado.data.services);
      });
      promise.catch((error) => {
        console.log(error);
      });
      return promise;
    }

    loadEmployeeServices();
    loadEstablishmentServices();
  }, []);

  return (
    <div className="flex flex-col h-full w-full">
      <section className="flex flex-col h-1/2 w-full">
        <h2 className="sm:text-3xl text-2xl text-zinc-950 font-bold sm:pb-8 pb-2">
          Mis servicios
        </h2>
        <div
          className="grid grid-flow-row 1/2lg:grid-cols-[1fr_1fr] gap-4 max-h-full overflow-y-auto pr-2
                scrollbar scrollbar-thumb-slate-200  scrollbar-thumb-rounded-full scrollbar-track-rounded-full active:scrollbar-thumb-primary hover:scrollbar-thumb-slate-300"
        >
          {employeeServices.map((employeeService) => (
            <Services
              key={employeeService.id}
              service={employeeService}
              reloadList={loadEmployeeServices}
              employeeService={employeeService}
            />
          ))}
        </div>
      </section>
      <section className="flex flex-col h-1/2 w-full">
        <div className="flex flex-row w-full sm:py-8 py-4 gap-4 content-center flex-wrap items-center">
          <h2 className="sm:text-3xl text-2xl text-nowrap text-zinc-950 font-bold">
            Servicios del establecimiento
          </h2>
          <Select
            name="category"
            id="Category"
            label="Seleccione la categoria"
            placeholder="Barberia"
            variant="bordered"
            className="1/2xl:w-[20%] lg:w-[20vw] sm:w-[40vw] w-[100%]"
            datatype="string"
            defaultSelectedKeys={""}
            onChange={""}
            isRequired
            isInvalid={""}
            scrollShadowProps={{
              isEnabled: true,
            }}
          >
            {/* Aqui va la lista de elementos con selectItem de nextui */}
            <SelectItem value={"Barberia"}>Barberia</SelectItem>
          </Select>
        </div>
        <div
          className="grid grid-flow-row 1/2lg:grid-cols-[1fr_1fr] gap-4 max-h-full overflow-y-auto pr-2 pb-2
                scrollbar scrollbar-thumb-slate-200  scrollbar-thumb-rounded-full scrollbar-track-rounded-full active:scrollbar-thumb-primary hover:scrollbar-thumb-slate-300"
        >
          {establishmentServices.map((service) => (
            <Services
              key={service.id}
              service={service}
              reloadList={loadEmployeeServices}
              employeeService={service}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default ServicesList;

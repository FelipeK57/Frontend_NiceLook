import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

function EstablishmentServices() {
  const [establismentServices, setEstablismentServices] = useState([]);

  useEffect(() => {
    const fetchEstablismentServices = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/establisment/servicesByEstablisment/${Cookies.get(
            "id_employee"
          )}/`
        );
        console.log(response.data.services);
        setEstablismentServices(response.data.services);
      } catch (error) {
        setEstablismentServices([]);
        console.error(error);
      }
    };
    fetchEstablismentServices();
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 pr-2 sm:pr-2 w-full gap-4 max-h-[40vh] overflow-y-auto scrollbar scrollbar-thumb-slate-200  scrollbar-thumb-rounded-full scrollbar-track-rounded-full active:scrollbar-thumb-primary hover:scrollbar-thumb-slate-300">
      {establismentServices.length > 0 ? (
        establismentServices.map((service) => (
          <article className="flex gap-4 border-2 border-slate-200 rounded-xl p-2">
            <img
              className="rounded-xl size-24 sm:size-36 object-cover"
              src={service.image_base64}
            />
            <div className="flex flex-col justify-between">
              <p className="font-bold text-xl">{service.name}</p>
              <p className={`font-semibold text-medium ${
                service.state === true ? "text-green-500" : "text-red-500"
              }`}>
                {service.state === true ? "Activo" : "Inactivo"}
              </p>
              <p className="font-semibold text-slate-700 text-medium">
                ${service.price}
              </p>
            </div>
          </article>
        ))
      ) : (
        <p>El establecimiento no ha registrado servicios</p>
      )}
    </div>
  );
}

export default EstablishmentServices;

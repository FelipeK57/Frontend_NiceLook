import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useEffect } from "react";

const formatDuration = (duration) => {
  // Parsear la cadena de tiempo HH:MM:SS
  const [hours, minutes, seconds] = duration.split(":").map(Number);

  // Si la duración es menor a 1 hora
  if (hours === 0) {
    return `${minutes} minuto${minutes > 1 ? "s" : ""}`;
  }

  // Si la duración es de 1 hora o más
  const hourText = `${hours} hora${hours > 1 ? "s" : ""}`;
  const minuteText =
    minutes > 0 ? `${minutes} minuto${minutes > 1 ? "s" : ""}` : "";

  return minuteText ? `${hourText} y ${minuteText}` : hourText;
};

function ProfessionalServices() {
  const [professionalServices, setProfessionalServices] = useState([]);

  useEffect(() => {
    const fetchProfessionalServices = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/employee_services/employeeServicesList/${Cookies.get(
            "id_employee"
          )}/`
        );
        console.log(response.data);
        setProfessionalServices(response.data);
      } catch (error) {
        setProfessionalServices([]);
        console.error(error);
      }
    };
    fetchProfessionalServices();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 pr-2 sm:pr-2 w-full gap-4 max-h-[40vh] overflow-y-auto scrollbar scrollbar-thumb-slate-200  scrollbar-thumb-rounded-full scrollbar-track-rounded-full active:scrollbar-thumb-primary hover:scrollbar-thumb-slate-300">
      {professionalServices.length > 0 ? (
        professionalServices.map((service) => (
          <article className="flex gap-4 border-2 border-slate-200 rounded-xl p-2">
            <img
              className="rounded-xl size-24 sm:size-36 object-cover"
              src={service.service.image_base64}
            />
            <div className="flex flex-col justify-between">
              <p className="font-bold text-xl">{service.service.name}</p>
              <p className="font-semibold text-slate-700 text-medium">
                ${service.service.price}
              </p>
              <p className="font-semibold text-slate-700  text-medium">
                {formatDuration(service.duration)}
              </p>
            </div>
          </article>
        ))
      ) : (
        <p>No haz agregado servicios a tu lista</p>
      )}
    </div>
  );
}

export default ProfessionalServices;

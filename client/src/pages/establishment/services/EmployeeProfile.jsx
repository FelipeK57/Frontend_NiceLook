/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "@/api";

import {
  Chip,
  Card,
  CardBody,
  CardFooter,
  Image,
  DatePicker,
  TimeInput,
  Input,
  Skeleton,
} from "@nextui-org/react";
import { ChevronLeft, Image as ImageIcon, Search } from "lucide-react";

import ButtonCustom from "@/components/global/ButtonCustom";
import ScheduleDisplay from "@/components/employees/ScheduleDisplay";

function ServiceCard({ service }) {
  return (
    <Card
      // key={index}
      className="h-fit w-full max-w-64 p-4"
      shadow="sm"
      //   isPressable
      //   onPress={() => navigate(`./services/${service.id}`, { relative: true })}
    >
      <CardBody className="overflow-visible p-0">
        <div className="aspect-square rounded-xl overflow-hidden border-1 bg-neutral-100 flex items-center justify-center">
          {service.image_base64 ? (
            <Image
              src={service.image_base64}
              alt="Imagen de perfil"
              className="object-cover w-full h-auto"
              removeWrapper
            />
          ) : (
            <ImageIcon className="w-8 md:w-12 h-full text-neutral-400" />
          )}
        </div>
      </CardBody>
      <CardFooter className="text-small items-start flex flex-col gap-2 whitespace-nowrap pb-0">
        <b>{service.name}</b>
        <p className="text-default-600 text-xs">${service.price}</p>
        <ButtonCustom variant="bordered" classStyles="self-center">
          Elegir
        </ButtonCustom>
      </CardFooter>
    </Card>
  );
}

function ScheduleAppointment() {
  return (
    <Card variant="bordered" className="w-full lg:w-64 h-fit rounded-xl">
      <CardBody className=" flex flex-col gap-2 p-4">
        <p>Selecciona un día:</p>
        <DatePicker />
        <p>Selecciona un horario:</p>
        <TimeInput />
        <p>Busca o elige el servicio:</p>
        <Input
          placeholder="Buscar servicio"
          classNames={{
            label: "",
            input: [],
            innerWrapper: "",
            inputWrapper: ["border-2", "border-slate-200", "px-6", "py-5"],
          }}
          variant="bordered"
          endContent={<Search />}
        />
        <p>Precio: $0</p>
        <ButtonCustom variant="bordered" classStyles="self-center">
          Agendar cita
        </ButtonCustom>
      </CardBody>
    </Card>
  );
}

export default function EmployeeProfile() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(true);
  const { employeeId } = useParams();

  useEffect(() => {
    const fetchUserInfo = async () => {
      await api
        .get("establisment/get_info_employee/", {
          params: {
            id_employee: employeeId,
          },
        })
        .then((response) => {
          setEmployee(response.data);
          // console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        })
        .then(() => {
          setLoading(false);
        });
    };

    fetchUserInfo();
  }, [employeeId]);

  return (
    <>
      {/* Info del empleado y agendar servicio */}
      <article className="flex flex-col lg:grid grid-cols-[1fr,auto] justify-between gap-4 p-4">
        <section>
          <ButtonCustom
            variant="bordered"
            classStyles="mb-4 sticky top-32 bg-card z-40"
            action={() => navigate(-1)}
          >
            <ChevronLeft />
            Volver
          </ButtonCustom>
          <div className="grid gap-4 grid-cols-[auto,1fr]">
            {/* Imagen del empleado */}
            <div className="w-40 h-40 md:w-60 md:h-60 aspect-square rounded-xl overflow-hidden border-1 bg-neutral-100 flex items-center justify-center">
              {employee.image ? (
                <Image
                  src={employee.image}
                  alt="Imagen de perfil"
                  className="object-cover w-full h-auto"
                />
              ) : (
                <ImageIcon className="w-8 md:w-12 h-full text-neutral-400" />
              )}
            </div>

            {/* Info del empleado */}
            <div className="flex flex-col">
              {loading ? (
                <Skeleton className="flex rounded-full w-2/3 h-5 md:h-6 mb-2" />
              ) : (
                <h1 className="text-lg md:text-2xl font-bold mb-2">
                  {employee.first_name} {employee.last_name}
                </h1>
              )}
              <Chip variant="flat" color="success" className="mb-2 select-none">
                Disponible
              </Chip>
              {/* <h2 className="title-lg text-neutral-600">
                Horario: 10 am - 5 pm
              </h2> */}
              <ScheduleDisplay timeData={employee.time} />
              {/* Calificación */}
              <div className="flex font-bold flex-nowrap">
                <h1 className="select-none">
                  {employee.rating
                    ? `${employee.rating}/5⭐ (${employee.reviews})`
                    : "Sin calificación"}
                </h1>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full">
          <ScheduleAppointment />
        </section>
      </article>
      <article className="flex flex-col gap-4 p-4">
        <h1 className="text-xl font-bold select-none">Servicios</h1>
        <section className="grid gap-4 justify-items-center grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <Card
                key={index}
                className="w-64 h-fit space-y-5 p-4"
                radius="lg"
              >
                <Skeleton className="rounded-lg aspect-square">
                  <div className="h-24 rounded-lg bg-secondary"></div>
                </Skeleton>
                <div className="space-y-3">
                  <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-5 w-full rounded-lg bg-secondary"></div>
                  </Skeleton>
                  <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
                  </Skeleton>
                </div>
              </Card>
            ))
          ) : employee.services ? (
            employee.services.map((service) => (
              <ServiceCard key={service.id} service={service.service} />
            ))
          ) : (
            <div className="flex items-center justify-center w-full h-32">
              <p className="select-none">No hay servicios disponibles</p>
            </div>
          )}
        </section>
      </article>
    </>
  );
}

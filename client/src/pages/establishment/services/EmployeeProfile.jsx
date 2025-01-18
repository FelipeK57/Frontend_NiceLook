import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/api";
import {
  Card,
  CardBody,
  Image,
  Chip,
  Button,
  Skeleton,
} from "@nextui-org/react";
import { ChevronLeft, ImageIcon } from "lucide-react";
import ServiceSelector from "./ServiceSelector";
import ScheduleAppointment from "./ScheduleAppointment";
import ScheduleDisplay from "@/components/employees/ScheduleDisplay";
import { NiceToast } from "@/components/ui/NiceToast";

const EmployeeProfile = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(true);
  const { employeeId } = useParams();
  const [servicesSelected, setServicesSelected] = useState([]);
  const [service, setService] = useState([]);
  const [priceTotal, setPriceTotal] = useState(0);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await api.get("establisment/get_info_employee/", {
          params: { id_employee: employeeId },
        });
        setEmployee(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [employeeId]);

  const handleSelectService = (selectedService) => {
    if (!servicesSelected.includes(selectedService.id)) {
      setServicesSelected((prev) => [...prev, selectedService.id]);
      setService((prev) => [...prev, selectedService]);
      NiceToast(
        "success",
        "Servicio seleccionado",
        `Seleccionaste ${selectedService.service.name}`
      );
      setPriceTotal((prev) => prev + selectedService.service.price);
    } else {
      handleRemoveService(selectedService);
    }
  };

  const handleRemoveService = (serviceToRemove) => {
    setServicesSelected((prev) =>
      prev.filter((id) => id !== serviceToRemove.id)
    );
    setService((prev) => prev.filter((item) => item.id !== serviceToRemove.id));
    setPriceTotal((prev) => prev - serviceToRemove.service.price);
  };

  return (
    <div className="container mx-auto p-4">
      <Button
        variant="bordered"
        onPress={() => navigate(-1)}
        className="mb-6 sticky top-32 bg-card z-40"
        startContent={<ChevronLeft />}
      >
        Volver
      </Button>

      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          {/* Employee Info */}
          <Card>
            <CardBody className="flex flex-row items-start gap-4 p-8">
              <div className="w-24 h-24 rounded-md overflow-hidden bg-neutral-100 flex items-center justify-center">
                {employee.image ? (
                  <Image
                    src={employee.image}
                    alt="Imagen de perfil"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <div>
                {loading ? (
                  <Skeleton className="w-32 h-8 mb-2" />
                ) : (
                  <h1 className="text-2xl font-bold -translate-y-1">
                    {employee.first_name} {employee.last_name}
                  </h1>
                )}
                <Chip color="success" variant="flat" className="mb-2">
                  Disponible
                </Chip>
                <ScheduleDisplay timeData={employee.time} />
                <div className="font-bold">
                  {employee.rating
                    ? `${employee.rating}/5⭐ (${employee.reviews})`
                    : "Sin calificación"}
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Lista de servicios */}
          <ServiceSelector
            services={employee.services || []}
            onSelectService={handleSelectService}
            selectedServices={servicesSelected}
          />
        </div>

        {/* Tarjeta de agendar cita */}
        <div className="lg:sticky lg:top-32 h-max">
          <ScheduleAppointment
            services={service}
            servicesSelected={servicesSelected}
            removeService={handleRemoveService}
            priceTotal={priceTotal}
            employee={employee}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;

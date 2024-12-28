/* eslint-disable react/prop-types */
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import ButtonCustom from "../global/ButtonCustom";
import { Check, ImageIcon } from "lucide-react";
import useAuthStore from "@/stores/useAuthStore";
import Cookies from "js-cookie";
import AuthModal from "../auth/AuthModal";

const formatDuration = (duration) => {
  const [hours, minutes, seconds] = duration.split(":").map(Number);
  let result = "";

  if (hours > 0) {
    result += `${hours} hora${hours > 1 ? "s" : ""}`;
  }

  if (minutes > 0) {
    if (hours > 0) result += " ";
    result += `${minutes} min`;
  }

  if (hours === 0 && minutes === 0) {
    result = `${seconds} seg`;
  }

  return result;
};

function ServiceCard({ service, onSelect, duration, color, selectedServices }) {
  const { triggerAuthModal } = useAuthStore();

  const handleSelectService = (service) => {
    if (!Cookies.get("isAuthenticated")) {
      triggerAuthModal();
    } else {
      onSelect(service);
    }
  };

  const formattedDuration = formatDuration(duration);
  return (
    <Card
      className="h-fit w-full max-w-64 p-4"
      shadow="sm"
      //   isPressable
    >
      <CardBody className="overflow-visible p-0">
        <div className="aspect-square rounded-xl overflow-hidden border-1 bg-neutral-100 flex items-center justify-center mb-4">
          {service.image_base64 ? (
            <Image
              src={service.image_base64}
              alt="Imagen de perfil"
              className="object-cover w-full h-auto"
              // removeWrapper
            />
          ) : (
            <ImageIcon className="w-8 md:w-12 h-full text-neutral-400" />
          )}
        </div>
        <h3 className="text-lg font-semibold">{service.service.name}</h3>
        <p className="text-default-600 text-sm">${service.service.price}</p>
        <p className="text-default-600 text-sm mb-4">{formattedDuration}</p>
        <AuthModal />
      </CardBody>
      <CardFooter className="text-small items-start flex flex-col gap-2 whitespace-nowrap pb-0">
        <ButtonCustom
          action={() => handleSelectService(service)}
          classStyles="self-center"
          color={color}
          startContent={selectedServices > 0 && <Check />}
        >
          {selectedServices.includes(service.id)
            ? "Seleccionado"
            : "Seleccionar"}
        </ButtonCustom>
      </CardFooter>
    </Card>
  );
}

export default ServiceCard;

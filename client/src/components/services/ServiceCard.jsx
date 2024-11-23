import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import ButtonCustom from "../global/ButtonCustom";
import { ImageIcon } from "lucide-react";
import useAuthStore from "@/stores/useAuthStore";
import Cookies from "js-cookie";
import AuthModal from "../auth/AuthModal";

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

function ServiceCard({ service, onSelect, duration }) {
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
        <p className="text-default-600 text-sm">${service.price}</p>
        <p className="text-default-600 text-sm">{formattedDuration}</p>
        <AuthModal />
        <ButtonCustom
          action={() => handleSelectService(service)}
          variant="bordered"
          classStyles="self-center"
        >
          Elegir
        </ButtonCustom>
      </CardFooter>
    </Card>
  );
}

export default ServiceCard;

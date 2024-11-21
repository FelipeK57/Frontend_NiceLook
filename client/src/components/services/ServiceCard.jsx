import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import ButtonCustom from "../global/ButtonCustom";
import { ImageIcon } from "lucide-react";

function ServiceCard({ service, onSelect }) {
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
        <ButtonCustom
          action={() => {
            onSelect(service);
          }}
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

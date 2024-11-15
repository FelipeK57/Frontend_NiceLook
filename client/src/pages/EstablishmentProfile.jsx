/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";

import { Image, Button, Divider, Tabs, Tab } from "@nextui-org/react";
import { Image as ImageIcon, Mail, Phone } from "lucide-react";

import ServicesTab from "./establishment/ServicesTab";
import BuyCard from "./buyPage/buyCard";
import ShoppingCart from "./buyPage/ShopingCart";

export const BackgroundImage = ({ backgroundImage }) => {
  return (
    <div className="w-full h-full flex md:rounded-xl overflow-hidden border-b-1 md:border-1">
      {backgroundImage ? (
        <Image
          src={backgroundImage}
          alt="Imagen de fondo"
          className="object-cover w-full h-auto"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-neutral-100">
          <ImageIcon className="w-8 md:w-12 h-auto text-neutral-400" />
        </div>
      )}
    </div>
  );
};

export const LogoImage = ({ logoImage }) => {
  return (
    <div className="absolute left-6 translate-y-32 w-24 h-24 md:left-6 lg:translate-y-48 md:w-40 md:h-40 rounded-xl overflow-hidden border-1 bg-neutral-100 flex items-center justify-center">
      {logoImage ? (
        <Image
          src={logoImage}
          alt="Imagen de logo"
          className="object-cover w-full h-auto"
        />
      ) : (
        <ImageIcon className="w-8 md:w-12 h-auto text-neutral-400" />
      )}
    </div>
  );
};

export default function EstablishmentProfile() {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [logoImage, setLogoImage] = useState(null);

  const [establishment, setEstablishment] = useState({
    name: "Stylos Peluquería",
    location: {
      city: "Palmira",
      department: "Valle del Cauca",
    },
    phone: "+573151234567",
    email: "",
    logo: "",
    background: "",
  });

  const establishmentTabs = [
    {
      key: "services",
      title: "Servicios",
      content: <ServicesTab />,
    },
    {
      key: "store",
      title: "Tienda",
      content: <BuyCard />
    },
    {
      key: "reviews",
      title: "Reseñas",
      content: <ShoppingCart />
    },
    {
      key: "employees",
      title: "Empleados",
      content: <h1>Empleados</h1>,
    },
    {
      key: "about",
      title: "Sobre nosotros",
      content: <h1>Sobre nosotros</h1>,
    },
  ];

  return (
    <main className="flex h-full p-0 md-p-4 md:px-16 lg:px-64">
      <article className="flex flex-nowrap flex-col w-full">
        {/* Imagenes del establecimiento */}
        <section className="relative flex w-full h-48 md:pt-4 md:h-64 lg:h-80">
          <BackgroundImage backgroundImage={backgroundImage} />
          <LogoImage logoImage={logoImage} />
        </section>

        {/* Información del establecimiento */}
        <section className="flex flex-col w-full px-6 pb-2 mt-12 md:mt-16">
          <div className="grid grid-cols-[1fr_30%] items-start">
            {/* Nombre del establecimiento */}
            <h1 className="text-2xl font-bold">{establishment.name}</h1>

            {/* Calificación */}
            <div className="flex font-bold flex-nowrap justify-end">
              <h1>4.5/5⭐ (112)</h1>
            </div>
          </div>

          <div className="grid grid-cols-1 mt-2 md:grid-cols-2 gap-4 items-start">
            <div className="flex flex-col">
              {/* Ubicación */}
              <p className="text-md font-bold text-default-700">
                📍 {establishment.location.city},{" "}
                {establishment.location.department}
              </p>
              <Link className="text-md text-neutral-500 underline">
                Dirección del establecimiento
              </Link>
            </div>
            <div className="flex flex-col gap-2 md:justify-self-end">
              <p className="text-md font-bold md:text-right">Contacto</p>
              <div className="flex flex-nowrap gap-4">
                <Button isIconOnly radius="full" variant="bordered">
                  <Mail size={20} />
                </Button>
                <Button isIconOnly radius="full" variant="bordered">
                  <Phone size={20} />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* <Divider /> */}

        {/* Tabs */}
        <section className="flex flex-col w-full">
          <Tabs
            variant="underlined"
            fullWidth
            size="lg"
            className=" sticky top-[134px] md:top-20 z-50 bg-white border-b-1 shadow-sm"
          >
            {establishmentTabs.map((tab) => (
              <Tab key={tab.key} title={tab.title}>
                {tab.content}
              </Tab>
            ))}
          </Tabs>

          <Divider />
        </section>
      </article>
    </main>
  );
}

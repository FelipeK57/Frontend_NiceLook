/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import {
  Link,
  Outlet,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";

import api from "@/api";

import { Image, Button, Divider, Tabs, Tab, Skeleton } from "@nextui-org/react";
import { Image as ImageIcon, Mail, Phone } from "lucide-react";

import ServicesTab from "./establishment/ServicesTab";
import Cookies from "js-cookie";

export const BackgroundImage = ({ backgroundImage }) => {
  return (
    <div className="w-full h-full aspect-[3.91] flex md:rounded-xl overflow-hidden border-b-1 md:border-1">
      {backgroundImage | (backgroundImage !== " ") ? (
        <Image
          src={backgroundImage}
          alt="Imagen de fondo"
          className="object-cover w-full h-auto rounded-none"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-neutral-100">
          <ImageIcon className="w-8 md:w-12 h-auto text-neutral-400" />
        </div>
      )}
    </div>
  );
};

export const ProfileImage = ({ logoImage, className }) => {
  return (
    <div
      className={`${className} aspect-square rounded-xl overflow-hidden border-1 bg-neutral-100 flex items-center justify-center`}
    >
      {logoImage | (logoImage !== " ") ? (
        <Image
          src={logoImage}
          alt="Imagen de perfil"
          className="object-cover rounded-xl w-full h-auto"
        />
      ) : (
        <ImageIcon className="w-8 md:w-12 h-full text-neutral-400" />
      )}
    </div>
  );
};

export default function EstablishmentProfile() {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [logoImage, setLogoImage] = useState(null);
  const [selectedTab, setSelectedTab] = useState("services");
  const { employeeId } = useParams();
  const location = useLocation().pathname;
  const navigate = useNavigate();

  const [establishment, setEstablishment] = useState({});

  // Esta lista de objetos contiene la información de las pestañas del establecimiento.
  // component es el contenido de la pestaña, en el mismo se puede renderizar
  // un Outlet para rutas anidadas como se muestra con la pestaña de Servicios.
  // El nuevo componente anidado debe ubicarse en Main.jsx.

  const establishmentTabs = React.useMemo(
    () => [
      {
        key: "services",
        title: "Servicios",
        component: employeeId ? <Outlet /> : <ServicesTab />,
      },
      {
        key: "store",
        title: "Tienda",
        component: <h1>Tienda</h1>,
      },
      {
        key: "reviews",
        title: "Reseñas",
        component: <h1>Reseñas</h1>,
      },
      {
        key: "employees",
        title: "Empleados",
        component: <h1>Empleados</h1>,
      },
      {
        key: "about",
        title: "Sobre nosotros",
        component: <h1>Sobre nosotros</h1>,
      },
    ],
    [employeeId]
  );

  // Esta función se encarga de renderizar el contenido de la pestaña seleccionada.
  // OJO: Si hay rutas anidadas, implementar lógica de renderizado de outlet con context
  // en establishmentTabs[] arriba ^.

  const renderTabContent = () => {
    const selectedTabContent = establishmentTabs.find(
      (tab) => tab.key === selectedTab
    );
    return selectedTabContent ? selectedTabContent.component : <ServicesTab />;
  };

  useEffect(() => {
    const redirectToInitPage = () => {
      // Verifica si la URL actual incluye alguna de las pestañas disponibles
      const isTabInLocation = establishmentTabs.some((tab) =>
        location.includes(tab.key)
      );

      // Si no incluye ninguna pestaña, redirige a la pestaña "services"
      if (!isTabInLocation) {
        navigate(`./${selectedTab}`, { replace: true });
      }
    };

    redirectToInitPage();
  }, [location, selectedTab, navigate, establishmentTabs]);

  const handleTabSelectionChange = (key) => {
    setSelectedTab(key);
    navigate(`./${key}`, { replace: true });
  };

  useEffect(() => {
    const fetchEstablishmentData = async () => {
      await api
        .get("establisment/info_establishment/")
        .then((response) => {
          setEstablishment(response.data);
          setBackgroundImage(response.data.image_establishment?.image_banner);
          setLogoImage(response.data.image_establishment?.image_logo);
          console.log(response.data);
          Cookies.set("establishmentId", response.data.information_establishment.stylos_info.id);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchEstablishmentData();
  }, []);

  return (
    <main className="flex h-full p-0 md-p-4 md:px-16 lg:px-64">
      <article className="flex flex-nowrap flex-col w-full">
        {/* Imagenes del establecimiento */}
        <section className="relative flex w-full h-48 md:pt-4 md:h-64 lg:h-80">
          <BackgroundImage backgroundImage={backgroundImage} />
          <ProfileImage
            logoImage={logoImage}
            className="absolute w-24 h-24 md:w-40 md:h-40 left-6 md:left-6 translate-y-32 lg:translate-y-48 z-10"
          />
        </section>

        {/* Información del establecimiento */}
        <section className="flex flex-col w-full px-6 pb-2 mt-12 md:mt-16">
          <div className="grid grid-cols-[1fr_30%] items-start">
            {/* Nombre del establecimiento */}
            <h1 className="text-2xl font-bold">
              <React.Suspense
                fallback={
                  <Skeleton className="flex rounded-full text-2xl md:text-3xl" />
                }
              >
                {establishment.information_establishment?.stylos_info?.name}
              </React.Suspense>
            </h1>

            {/* Calificación */}
            <div className="flex font-bold flex-nowrap justify-end">
              <h1
                onClick={() => setSelectedTab("reviews")}
                className="hover:underline"
              >
                {establishment.information_establishment?.rating
                  ? `${establishment.information_establishment?.rating}/5⭐ 
                  (${establishment.information_establishment?.reviews})`
                  : "Sin calificación"}
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 mt-2 md:grid-cols-2 gap-4 items-start">
            <div className="flex flex-col">
              {/* Ubicación */}
              <React.Suspense
                fallback={<Skeleton className="text-md flex rounded-full" />}
              >
                <p className="text-md font-bold text-default-700">
                  📍{" "}
                  {establishment.information_establishment?.stylos_info?.city}
                </p>
              </React.Suspense>
              <React.Suspense
                fallback={<Skeleton className="text-md flex rounded-full" />}
              >
                <Link className="text-md text-neutral-500 underline">
                  {
                    establishment.information_establishment?.stylos_info
                      ?.address
                  }
                </Link>
              </React.Suspense>
            </div>
            <div className="flex flex-col gap-2 md:justify-self-end">
              <p className="text-md font-bold md:text-right">Contacto</p>
              <div className="flex flex-nowrap gap-4 w-fit md:self-end">
                {establishment.information_establishment?.stylos_info
                  ?.contact_methods?.mail && (
                  <Button
                    isIconOnly
                    radius="full"
                    variant="bordered"
                    onPress={() =>
                      window.open(
                        `mailto:${establishment.information_establishment?.stylos_info?.contact_methods?.mail}`
                      )
                    }
                  >
                    <Mail size={20} />
                  </Button>
                )}
                {establishment.information_establishment?.stylos_info
                  ?.contact_methods?.phone && (
                  <Button isIconOnly radius="full" variant="bordered">
                    <Phone
                      size={20}
                      onPress={() =>
                        window.open(
                          `wa.me/+57${establishment.information_establishment?.stylos_info?.contact_methods?.phone}`
                        )
                      }
                    />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="flex flex-col w-full">
          <Tabs
            variant="underlined"
            fullWidth
            size="lg"
            className="sticky top-16 z-50 bg-white border-b-1 shadow-sm"
            selectedKey={selectedTab}
            onSelectionChange={handleTabSelectionChange}
          >
            {establishmentTabs.map((tab) => (
              <Tab key={tab.key} title={tab.title}>
                {renderTabContent()}
              </Tab>
            ))}
          </Tabs>
          <Divider />
        </section>
      </article>
    </main>
  );
}

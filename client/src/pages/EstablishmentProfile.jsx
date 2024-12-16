/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Outlet, useParams, useLocation, useNavigate } from "react-router-dom";

import api from "@/api";
import Cookies from "js-cookie";

import { Image, Button, Divider, Tabs, Tab, Skeleton } from "@nextui-org/react";
import { Image as ImageIcon, Mail } from "lucide-react";
import WhatsappIcon from "@/components/icons/WhatsappIcon";
import FacebookIcon from "@/components/icons/FacebookIcon";
import InstagramIcon from "@/components/icons/IntagramIcon";

import ServicesTab from "./establishment/ServicesTab";
import ProfileReviews from "@/components/establishment/review/ProfileReviews";
import BuyCard from "./buyPage/buyCard";
import Footer from "@/components/global/Footer";
import ReviewsEstablishment from "./establishment/ReviewsEstablishment";

export const BackgroundImage = ({ backgroundImage }) => {
  return (
    <div className="w-full h-full aspect-[3.91] flex md:rounded-xl overflow-hidden border-b-1 md:border-1">
      {backgroundImage | (backgroundImage !== " ") ? (
        <img
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

const SocialButton = ({ platform, link, icon }) => {
  if (!link) return null; // Si no hay link, no renderiza el botón

  const handleClick = () => {
    window.open(link, "_blank"); // Abre en una nueva pestaña
  };

  return (
    <Button
      isIconOnly
      radius="full"
      variant="bordered"
      onClick={handleClick}
      aria-label={platform}
    >
      {icon}
    </Button>
  );
};

const SocialLinks = ({ contactMethods }) => {
  if (!contactMethods) return <span>Sin métodos de contacto</span>;

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {contactMethods.whatsapp && (
        <SocialButton
          platform="whatsapp"
          link={`https://wa.me/+57${contactMethods.whatsapp}`}
          icon={<WhatsappIcon size={"size-5"} />}
        />
      )}
      {contactMethods.mail && (
        <SocialButton
          platform="email"
          link={`mailto:${contactMethods.mail}`}
          icon={<Mail size={20} />}
        />
      )}
      {contactMethods.facebook && (
        <SocialButton
          platform="facebook"
          link={`https://www.facebook.com/${contactMethods.facebook}`}
          icon={<FacebookIcon size={"size-5"} />}
        />
      )}
      {contactMethods.instagram && (
        <SocialButton
          platform="instagram"
          link={`https://www.instagram.com/${contactMethods.instagram?.replace(
            "@",
            ""
          )}`}
          icon={<InstagramIcon size={"size-5"} />}
        />
      )}
    </div>
  );
};

export default function EstablishmentProfile() {
  const [loading, setLoading] = useState(true);
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
        component: <BuyCard />,
      },
      {
        key: "reviews",
        title: "Reseñas",
        component: <ReviewsEstablishment />,
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
          Cookies.set(
            "establishmentId",
            response.data.information_establishment.stylos_info.id
          );
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchEstablishmentData();
  }, []);

  return (
    <>
      <main className="mx-auto flex h-full w-full md:w-4/5 max-w-[1280px]">
        <article className="flex flex-nowrap flex-col w-full">
          {/* Imagenes del establecimiento */}
          <section className="relative flex w-full h-48 md:pt-4 md:h-64 lg:h-80 2xl:h-[420px]">
            <BackgroundImage backgroundImage={backgroundImage} />
            <ProfileImage
              logoImage={logoImage}
              className="absolute w-24 h-24 md:w-40 md:h-40 left-6 md:left-6 translate-y-32 lg:translate-y-48 2xl:translate-y-72 z-10"
            />
          </section>

          {/* Información del establecimiento */}
          <section className="flex flex-col w-full px-6 pb-2 mt-12 md:mt-16">
            <div className="grid grid-cols-[1fr_30%] items-start">
              {/* Nombre del establecimiento */}
              {!loading ? (
                <h1 className="text-2xl font-bold select-none">
                  {establishment.information_establishment?.stylos_info?.name}
                </h1>
              ) : (
                <Skeleton className="flex rounded-full w-64 h-8" />
              )}

              {/* Calificación */}
              <div className="flex font-bold flex-nowrap justify-end">
                {!loading ? (
                  establishment.information_establishment?.rating ? (
                    <h1
                      onClick={() => setSelectedTab("reviews")}
                      className="hover:underline cursor-pointer select-none"
                    >
                      {establishment.information_establishment?.rating}/5⭐ (
                      {establishment.information_establishment?.reviews})
                    </h1>
                  ) : (
                    <h1>Sin calificación</h1>
                  )
                ) : (
                  <Skeleton className="flex rounded-full w-32 h-6" />
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 mt-2 md:grid-cols-2 gap-4 items-start">
              <div className="flex flex-col select-none">
                {/* Ubicación */}
                {!loading ? (
                  <p>
                    📍{" "}
                    {establishment.information_establishment?.stylos_info?.city}{" "}
                    {/* <ExternalLink size={12} className="inline" /> */}
                  </p>
                ) : (
                  <Skeleton className="w-32 h-6 flex rounded-full mb-2" />
                )}
                {!loading ? (
                  establishment.information_establishment?.stylos_info?.address
                ) : (
                  <Skeleton className="w-52 h-5 flex rounded-full" />
                )}
              </div>
              <div className="flex flex-col gap-2 md:justify-self-end">
                <p className="text-md font-bold md:text-right select-none">
                  Contacto
                </p>
                <div className="flex flex-nowrap gap-4 w-fit md:self-end">
                  {!loading ? (
                    establishment.information_establishment?.stylos_info
                      ?.contact_methods && (
                      <SocialLinks
                        contactMethods={
                          establishment.information_establishment?.stylos_info
                            ?.contact_methods
                        }
                      />
                    )
                  ) : (
                    <Skeleton className="flex rounded-full w-48 h-10" />
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
              className="sticky top-16 z-50 bg-white border-b-1 shadow-sm select-none"
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
      <Footer />
    </>
  );
}

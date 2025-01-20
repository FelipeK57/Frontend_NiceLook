// import { useMemo } from "react";
import ButtonCustom from "./ButtonCustom";
// import { Button } from "@nextui-org/react";
import LinkSidebar from "./LinkSidebar";
import LogoNiceLook from "../ui/LogoNiceLook";
import useAuthStore from "@/stores/useAuthStore";
import { Button } from "@nextui-org/react";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DropdownSidebar from "./DropdownSidebar";
import { PencilIcon } from "@heroicons/react/24/outline";
import EditButton from "./EditButton";

const adminNavLinks = [
  {
    name: "Inicio",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
    ),
    path: "finance",
  },
  {
    name: "Perfil del establecimiento",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
        />
      </svg>
    ),
    path: "EditProfilePage",
  },
  {
    name: "Calendario de citas",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
        />
      </svg>
    ),
    path: "appointments",
  },
  {
    name: "Categorias y Servicios",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 6h.008v.008H6V6Z"
        />
      </svg>
    ),
    path: "services",
  },
  {
    name: "Productos",
    icon: (
      <svg
        width="20"
        height="22"
        viewBox="0 0 20 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 6.5L10 1.25L1 6.5M19 6.5L10 11.75M19 6.5V15.5L10 20.75M1 6.5L10 11.75M1 6.5V15.5L10 20.75M10 11.75V20.75"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    path: "products",
  },
  {
    name: "Profesionales",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
        />
      </svg>
    ),
    path: "professionals",
  },
];

const recepcionistNavLinks = [
  {
    name: "Ventas del dia",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
        />
      </svg>
    ),
    path: "finance",
  },
  {
    name: "Calendario de citas",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
        />
      </svg>
    ),
    path: "appointments",
  },
];

const employeeNavLinks = [
  {
    name: "Gestionar Servicios",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 6h.008v.008H6V6Z"
        />
      </svg>
    ),
    path: "services",
  },
  {
    name: "Gestionar Agenda",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
        />
      </svg>
    ),
    path: "management",
  },
  {
    name: "Mis Citas",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
        />
      </svg>
    ),
    path: "schedule",
  },
  {
    name: "Historial de Citas",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
        />
      </svg>
    ),
    path: "record",
  },
];

function Sidebar() {
  const user = useAuthStore((state) => state.user);
  const userInfo = user !== null ? user : "Usuario no identificado";
  // console.log(userInfo)
  // useMemo(() => {
  //   console.log("Usuario en store de zustand: ", user);
  // }, [user]);
  const [logo, setLogo] = useState(null);
  const [profesionalImage, setProfesionalImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(profesionalImage);
  const handleLogout = () => {
    console.log("Cerrando sesión...");
    Cookies.remove("access");
    Cookies.remove("refresh");
    Cookies.remove("establishmentId");
    window.location.reload();
  };

  useEffect(() => {
    const fetchProfesionalImage = async () => {
      try {
        const response = await axios.get(
          `${process.env.API_URL}/employee/get_photo/${Cookies.get(
            "establishmentId"
          )}/${Cookies.get("id_employee")}/`
        );
        setProfesionalImage(response.data.imagen_base64);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfesionalImage();
  }, []);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await axios.get(
          `${process.env.API_URL}/image/get-logo/${Cookies.get(
            "establishmentId"
          )}`
        );
        setLogo(response.data.imagen_base64);
      } catch (err) {
        setLogo(
          "https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg"
        );
        console.log(err);
      }
    };
    fetchLogo();
  }, []);

  const uploadPhoto = async () => {
    const formData = new FormData();
    formData.append("image", profesionalImage);
    try {
      const response = await axios.post(
        `${process.env.API_URL}/employee/upload_employee_photo/${Cookies.get(
          "establishmentId"
        )}/${Cookies.get("id_employee")}/`,
        formData
      );
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const url = useLocation().pathname;

  const handlePhotoChange = (e) => {
    setProfesionalImage(e.target.files[0]);
  };

  return (
    <aside className="w-full grid py-2 2xl:py-6 md:grid-rows-[auto_1fr_auto] justify-start md:justify-center gap-4 2xl:gap-10 border-r-2 border-slate-200">
      {url.includes("admin") ? (
        <DropdownSidebar links={adminNavLinks} handleLogout={handleLogout} />
      ) : url.includes("recepcionist") ? (
        <DropdownSidebar
          links={recepcionistNavLinks}
          handleLogout={handleLogout}
        />
      ) : (
        <DropdownSidebar links={employeeNavLinks} handleLogout={handleLogout} />
      )}
      <div className="hidden md:flex 2xl:gap-5 gap-3 flex-col items-center">
        <LogoNiceLook className="text-4xl" />
        {url.includes("employee") ? (
          <div className="relative size-32 2xl:size-48 ring-2 ring-slate-200 rounded-full">
            <div className="hover:bg-slate-500 hover:bg-opacity-50 opacity-0 hover:opacity-100 flex transition-all absolute rounded-full z-10 inset-0 items-center justify-center">
              <EditButton id={"profesional"} onChange={handlePhotoChange} />
            </div>
            <img
              src={profesionalImage}
              className="size-32 2xl:size-48 rounded-full object-cover"
            ></img>
          </div>
        ) : (
          <img src={logo} className="size-16 2xl:size-32 rounded-full"></img>
        )}
        <p>
          {userInfo.first_name} {userInfo.last_name}
        </p>
        {url.includes("employee") && (
          <>
            <ButtonCustom action={uploadPhoto} secondary name="Subir Imagen" />
          </>
        )}
      </div>
      <nav className="hidden md:flex flex-col gap-2 2xl:gap-6">
        {url.includes("admin")
          ? adminNavLinks.map((link) => (
              <LinkSidebar
                key={link.name}
                name={link.name}
                path={link.path}
                icon={link.icon}
              />
            ))
          : url.includes("recepcionist")
          ? recepcionistNavLinks.map((link) => (
              <LinkSidebar
                key={link.name}
                name={link.name}
                path={link.path}
                icon={link.icon}
              />
            ))
          : employeeNavLinks.map((link) => (
              <LinkSidebar
                key={link.name}
                name={link.name}
                path={link.path}
                icon={link.icon}
              />
            ))}
      </nav>
      <div className="hidden md:flex items-center justify-center">
        <Button onClick={handleLogout} color="danger" variant="light">
          Cerrar Sesión
        </Button>
      </div>
    </aside>
  );
}

export default Sidebar;

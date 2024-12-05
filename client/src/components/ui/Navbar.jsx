import LoginModal from "@/pages/auth/client/LoginModal";
import LogoNiceLook from "./LogoNiceLook";
import RegisterModal from "@/pages/auth/client/RegisterModal";
import ButtonCustom from "../global/ButtonCustom";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useState } from "react";
import Cookies from "js-cookie";
import useAuthStore from "@/stores/useAuthStore";
import { useNavigate } from "react-router-dom";

import { BookCheck } from "lucide-react";

// const SearchBar = ({ className }) => {
//   return (
//     <Input
//       placeholder="Palmira, Valle del Cauca"
//       variant="bordered"
//       classNames={{
//         label: "",
//         input: [],
//         innerWrapper: "",
//         inputWrapper: ["border-2", "border-slate-200", "px-6", "py-5"],
//       }}
//       className={`place-self-center max-w-2xl ${className}`}
//       endContent={<SearchIcon />}
//     />
//   );
// };

export default function Navbar() {
  const { logoutClient } = useAuthStore();
  const [isModalRegisterOpen, setIsModalRegisterOpen] = useState(false);
  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);

  const handleOpenLoginModal = () => setIsModalLoginOpen(true);
  const handleCloseLoginModal = () => setIsModalLoginOpen(false);

  const handleOpenRegisterModal = () => setIsModalRegisterOpen(true);
  const handleCloseRegisterModal = () => setIsModalRegisterOpen(false);

  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-50 h-16 items-center bg-white border-b-2 flex justify-center">
      <div className="px-4 sm:px-0 w-full md:w-4/5 max-w-[1280px] grid gap-4 grid-cols-2 items-center h-full">
        <LogoNiceLook className="text-3xl md:text-4xl" />
        {/* <SearchBar className="hidden md:block" /> */}
        {!Cookies.get("isAuthenticated") ? (
          <div className="flex flex-row justify-end gap-4">
            <RegisterModal
              isOpen={isModalRegisterOpen}
              onClose={handleCloseRegisterModal}
            />
            <ButtonCustom
              action={handleOpenRegisterModal}
              primary
              name={"Regístrate"}
            />
            <LoginModal
              isOpen={isModalLoginOpen}
              onClose={handleCloseLoginModal}
            />
            <ButtonCustom
              action={handleOpenLoginModal}
              secondary
              name={"Iniciar sesión"}
            />
          </div>
        ) : (
          <div className="flex justify-end">
            {/* <Button
              onClick={() => {
                logoutClient();
                window.location.reload();
              }}
              className="w-auto"
              color="danger"
              variant="light"
            >
              Cerrar sesión
            </Button> */}
            <Dropdown>
              <DropdownTrigger>
                <Button
                  isIconOnly
                  variant="bordered"
                  className="w-auto border-1 border-slate-500 shadow-sm shadow-slate-500 rounded-full"
                >
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
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </Button>
              </DropdownTrigger>
              <DropdownMenu variant="bordered">
                <DropdownItem
                  onPress={() => navigate("/profile")}
                  key="new"
                  description="Mira tus datos personales e historial de citas"
                  startContent={
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
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                  }
                >
                  Perfil
                </DropdownItem>
                <DropdownItem
                  onPress={() => navigate("/appointments")}
                  key="appointments"
                  description="Mira tus citas programadas y cancelalas si es necesario"
                  startContent={<BookCheck size={24} />}
                >
                  Citas
                </DropdownItem>
                <DropdownItem
                  onPress={() => {
                    logoutClient();
                    window.location.reload();
                  }}
                  key="new"
                  color="danger"
                  className="text-red-500"
                  startContent={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      color="red"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                      />
                    </svg>
                  }
                >
                  Cerrar sesión
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        )}
      </div>
    </header>
  );
}

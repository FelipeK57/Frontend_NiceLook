import LoginModal from "@/pages/auth/client/LoginModal";
import LogoNiceLook from "./LogoNiceLook";
import RegisterModal from "@/pages/auth/client/RegisterModal";
import ButtonCustom from "../global/ButtonCustom";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import Cookies from "js-cookie";
import useAuthStore from "@/stores/useAuthStore";

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
              name={"Registrate"}
            />
            <LoginModal
              isOpen={isModalLoginOpen}
              onClose={handleCloseLoginModal}
            />
            <ButtonCustom
              action={handleOpenLoginModal}
              primary
              name={"Iniciar sesión"}
            />
          </div>
        ) : (
          <div className="flex justify-end">
            <Button
              onClick={() => {
                logoutClient();
                window.location.reload();
              }}
              className="w-auto"
              color="danger"
              variant="light"
            >
              Cerrar sesión
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

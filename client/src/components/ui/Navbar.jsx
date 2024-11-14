/* eslint-disable react/prop-types */
import LogoNiceLook from "./LogoNiceLook";
import { Input, Button } from "@nextui-org/react";
import SearchIcon from "@/components/icons/SearchIcon";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Menu, UserRound } from "lucide-react";
import RegisterModal from "@/pages/auth/client/RegisterModal";
import LoginModal from "@/pages/auth/client/LoginModal";
import { useState } from "react";

function NavbarMenu() {
  const [isModalRegisterOpen, setIsModalRegisterOpen] = useState(false);
  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);

  const handleOpenLoginModal = () => setIsModalLoginOpen(true);
  const handleCloseLoginModal = () => setIsModalLoginOpen(false);

  const handleOpenRegisterModal = () => setIsModalRegisterOpen(true);
  const handleCloseRegisterModal = () => setIsModalRegisterOpen(false);
  return (
    <>
      <RegisterModal
        isOpen={isModalRegisterOpen}
        onClose={handleCloseRegisterModal}
      />
      <LoginModal isOpen={isModalLoginOpen} onClose={handleCloseLoginModal} />
      <DropdownMenu>
        <Button isIconOnly variant="bordered" radius="full">
          <DropdownMenuTrigger>
            <Menu />
          </DropdownMenuTrigger>
        </Button>
        <DropdownMenuContent className="absolute -right-5 top-0 w-44">
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => handleOpenRegisterModal()}
          >
            {/* <Pencil /> */}
            Regístrate
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => handleOpenLoginModal()}
          >
            {/* <Pencil /> */}
            Iniciar sesión
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => console.log("Comparte tu empresa")}
          >
            {/* <Pencil /> */}
            Comparte tu empresa
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

const SearchBar = ({ className }) => {
  return (
    <Input
      placeholder="Palmira, Valle del Cauca"
      variant="bordered"
      classNames={{
        label: "",
        input: [],
        innerWrapper: "",
        inputWrapper: ["border-2", "border-slate-200", "px-6", "py-5"],
      }}
      className={`place-self-center max-w-2xl ${className}`}
      endContent={<SearchIcon />}
    />
  );
};

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 h-[134px] md:h-20 gap-4 items-center p-4 md:px-16 lg:px-64 grid grid-cols-2 md:grid-cols-[1fr_50%_1fr] justify-center bg-white border-b-2">
      <LogoNiceLook className="text-3xl md:text-4xl" />

      <SearchBar className="hidden md:block" />

      <div className="flex items-center justify-end gap-4">
        <NavbarMenu />
        <Button isIconOnly radius="full" variant="bordered">
          <UserRound />
        </Button>
      </div>
      <SearchBar className="md:hidden col-span-2" />
    </header>
  );
}

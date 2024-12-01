import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import useAuthStore from "@/stores/useAuthStore";
import { Link } from "react-router-dom";
function ClientMenu() {
  const logoutClient = useAuthStore((state) => state.logoutClient);

  const links = [
    {
      id: 1,
      name: "Inicio",
      path: "/@peluqueriastylospalmira/services",
    },
    {
      id: 2,
      name: "Mis reservas",
      path: "/historialTest",
    },
  ];
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly variant="bordered">
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
      <DropdownMenu aria-label="Static Actions">
        {links.map((link) => {
          return (
            <DropdownItem key={link.id}>
              <Link className="font-medium text-lg" to={link.path}>
                {link.name}
              </Link>
            </DropdownItem>
          );
        })}
        <DropdownItem
          onClick={() => {
            logoutClient();
            window.location.reload();
          }}
        >
          <p className="text-[#f31260] text-lg font-medium">Cerrar sesión</p>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default ClientMenu;

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";

function DropdownSidebar({ links, handleLogout }) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          isIconOnly
          variant="bordered"
          className="md:hidden rounded-full p-2 ml-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
            />
          </svg>
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        {links.map((link) => {
          return (
            <DropdownItem onClick={useNavigate(`/${link.path}`)} key={link.id}>
              <Link className="font-semibold text-lg" to={link.path}>
                {link.name}
              </Link>
            </DropdownItem>
          );
        })}
        <DropdownItem onClick={handleLogout}>
          <p className="text-[#f31260] text-lg font-semibold">Cerrar sesión</p>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default DropdownSidebar;

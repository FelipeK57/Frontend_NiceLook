import LogoNiceLook from "./LogoNiceLook";
// import { Input, Button } from "@nextui-org/react";
// import SearchIcon from "@/components/icons/SearchIcon";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// import { Menu, UserRound } from "lucide-react";

// function NavbarMenu() {
//   return (
//     <DropdownMenu>
//       <Button isIconOnly variant="bordered" radius="full">
//         <DropdownMenuTrigger>
//           <Menu />
//         </DropdownMenuTrigger>
//       </Button>
//       <DropdownMenuContent className="absolute -right-5 top-0 w-44">
//         <DropdownMenuItem
//           className="cursor-pointer"
//           onClick={() => console.log("Regístrate")}
//         >
//           {/* <Pencil /> */}
//           Regístrate
//         </DropdownMenuItem>
//         <DropdownMenuItem
//           className="cursor-pointer"
//           onClick={() => console.log("Iniciar sesión")}
//         >
//           {/* <Pencil /> */}
//           Iniciar sesión
//         </DropdownMenuItem>

//         <DropdownMenuItem
//           className="cursor-pointer"
//           onClick={() => console.log("Comparte tu empresa")}
//         >
//           {/* <Pencil /> */}
//           Comparte tu empresa
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

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
  return (
    <header className="sticky top-0 z-50 h-16 items-center bg-white border-b-2 flex justify-center">
      <div className="px-4 sm:px-0 w-full md:w-4/5 max-w-[1280px] grid gap-4 grid-cols-2 items-center h-full">
        <LogoNiceLook className="text-3xl md:text-4xl" />
      </div>

      {/* <SearchBar className="hidden md:block" /> */}

      {/* <div className="flex items-center justify-end gap-4">
        <NavbarMenu />
        <Button isIconOnly radius="full" variant="bordered">
          <UserRound />
        </Button>
      </div> */}
      {/* <SearchBar className="md:hidden col-span-2" /> */}
    </header>
  );
}

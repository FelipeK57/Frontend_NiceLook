import { Link } from "react-router-dom";

import LogoNiceLook from "@/components/ui/LogoNiceLook";

export default function Footer() {
  return (
    <footer className="p-5 mx-auto h-max w-full md:w-4/5 max-w-[1280px]">
      <div className="w-full grid grid-cols-2 gap-2 mb-4">
        <div className="flex flex-col gap-2 w-fit">
          <h3 className="text-sm font-semibold text-neutral-700">Acceso</h3>
          <div className="text-neutral-500 flex flex-col gap-2">
            <Link
              className="hover:underline text-xs"
              to="/employee/login"
              target="_blank"
            >
              Profesional
            </Link>
            <Link
              className="hover:underline text-xs"
              to="/employee/login"
              target="_blank"
            >
              Recepcionista
            </Link>
            <Link
              className="hover:underline text-xs"
              to="/admin/login"
              target="_blank"
            >
              Establecimiento
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-fit">
          <h3 className="text-sm font-semibold text-neutral-700">
            Stylo&apos;s: contacto
          </h3>
          <div className="text-neutral-500 flex flex-col gap-2">
            <Link
              className="hover:underline text-xs"
              to="https://www.instagram.com/peluqueriastylospalmira"
              target="_blank"
            >
              Instagram
            </Link>
            <Link
              className="hover:underline text-xs"
              to="https://www.facebook.com/stylospalmira"
              target="_blank"
            >
              Facebook
            </Link>
          </div>
        </div>
      </div>
      <LogoNiceLook className="text-lg" />
      <p className="text-xs w-full text-center text-neutral-500">
        Hecho con ❤️ por Serenity en la Universidad del Valle Seccional Palmira
        - 2024
      </p>
    </footer>
  );
}

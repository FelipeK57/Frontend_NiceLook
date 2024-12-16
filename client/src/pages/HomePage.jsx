import { Link } from "react-router-dom";
import ButtonCustom from "../components/global/ButtonCustom";

export default function HomePage() {
  return (
    <main className="flex items-center justify-center h-full">
      <ButtonCustom primary>
        <Link to="/@peluqueriastylospalmira">
          Ir al perfil de Stylos Palmira
        </Link>
      </ButtonCustom>
    </main>
  );
}

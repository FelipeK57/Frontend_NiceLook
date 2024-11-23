import { useNavigate } from "react-router-dom";

import ButtonCustom from "@/components/global/ButtonCustom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-10 items-center justify-center min-h-[500px] h-max">
      <h1 className="text-4xl font-bold">Nos perdimos :(</h1>
      <p>Disculpa, no encontramos lo que buscabas.</p>
      <ButtonCustom primary onPress={() => navigate(-1, { replace: true })}>
        Regresar
      </ButtonCustom>
    </div>
  );
}
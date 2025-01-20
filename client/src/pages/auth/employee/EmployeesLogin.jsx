import { motion } from "framer-motion";
import LogoNiceLook from "@/components/ui/LogoNiceLook";
import {
  GoogleLogin,
  useGoogleLogin,
  hasGrantedAllScopesGoogle,
} from "@react-oauth/google";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthStore from "@/stores/useAuthStore";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import { Button, user } from "@nextui-org/react";

export const EmployeesLogin = () => {
  const [errorServer, setErrorServer] = useState("");
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const width = useWindowWidth();

  const [userRole, setUserRole] = useState("");

  const loginEmployees = useGoogleLogin({
    onSuccess: async (response) => {
      console.log("Response:", response);

      const authCode = response.code;
      console.log("Authorization Code:", authCode);

      // Verificar si el usuario otorgó todos los permisos necesarios
      const hasAccess = hasGrantedAllScopesGoogle(
        response,
        "https://www.googleapis.com/auth/calendar"
      );

      if (!hasAccess) {
        alert("Necesitamos permiso para gestionar el calendario.");
        return;
      }

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/employee/EmployeeLogin/`,
          {
            auth_code: authCode,
          }
        );
        console.log("Recibiendo datos");
        console.log("Tokens y datos recibidos:", response.data);
        const access = response.data.access_token;
        const refresh = response.data.refresh_token;
        const decoded = jwtDecode(response.data.access_token);
        console.log(decoded);

        login(decoded, access, refresh);

        Cookies.set("establishmentId", response.data.establishment_id, {
          expires: 7,
        });
        console.log(response.data);
        const isArtist = response.data.isArtist;
        // console.log(isArtist);
        if (isArtist === true) {
          setErrorServer("");
          Cookies.set("id_employee", response.data.id_employee, { expires: 7 });
          navigate("/employee/dashboard/schedule");
        } else {
          setErrorServer("");
          Cookies.set("id_receptionist", response.data.id_receptionist, {
            expires: 7,
          });
          navigate("/recepcionist/dashboard/finance");
          // console.log(response.data);
        }
      } catch (error) {
        setErrorServer(error.response.data.error);
        console.error("Error al obtener los tokens:", error);
      }
    },
    flow: "auth-code",
    scope:
      "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events",
  });

  return (
    <div className="relative h-screen overflow-hidden">
      {width < 768 ? (
        <>
          <motion.div
            initial={{ x: "-30%", y: 0 }}
            animate={{ y: "-40%", x: userRole !== "" ? "30%" : "-50%" }}
            transition={{ duration: 2 }}
            className={`absolute rounded-full top-0 left-0 w-[380px] h-[380px] bg-slate-950`}
          ></motion.div>
          <motion.div
            initial={{ x: "30%", y: 0 }}
            animate={{ y: "40%", x: userRole !== "" ? "-30%" : "50%" }}
            transition={{ duration: 2 }}
            className="absolute rounded-full bottom-0 right-0 w-[380px] h-[380px] bg-tulip-tree-500"
          ></motion.div>
        </>
      ) : (
        <>
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-65%", y: userRole !== "" ? "5%" : "-50%" }}
            transition={{ duration: 2 }}
            className="absolute rounded-full top-0 left-0 w-[1300px] h-[1300px] bg-slate-950"
          ></motion.div>

          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "65%", y: userRole !== "" ? "-50%" : "5%" }}
            transition={{ duration: 2 }}
            className="absolute rounded-full top-0 right-0 w-[1300px] h-[1300px] bg-tulip-tree-500"
          ></motion.div>
        </>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="relative z-10 flex items-center justify-center h-full text-3xl font-bold"
      >
        <section className="flex flex-col gap-6 items-center">
          {userRole === "" ? (
            <>
              <h1 className="font-medium text-bold text-xl md:text-2xl ">
                Esto es <LogoNiceLook className={"text-2xl md:text-4xl"} />
              </h1>
              <p className="text-sm font-medium text-slate-700">
                ¿Cuál es tu rol?
              </p>
              <div className="grid grid-cols-2 gap-6 w-full">
                <Button
                  color="secondary"
                  className="font-semibold hover:bg-primary transition-all focus:bg-primary"
                  onClick={() => setUserRole("artist")}
                >
                  Artista
                </Button>
                <Button
                  color="secondary"
                  className="font-semibold hover:bg-primary transition-all focus:bg-primary"
                  onClick={() => setUserRole("receptionist")}
                >
                  Recepcionista
                </Button>
              </div>
            </>
          ) : (
            <>
              <h1 className="font-medium text-bold text-xl md:text-2xl ">
                <LogoNiceLook className={"text-2xl md:text-4xl"} /> para
                {userRole === "artist" ? " Artistas" : " Recepcionistas"}
              </h1>
              <p className="text-center font-medium text-slate-700 text-sm md:text-base w-4/5">
                {userRole === "artist"
                  ? "Ingresa para comenzar a gestionar tus citas, horario, servicios y más."
                  : "Ingresa para comenzar a gestionar las citas del establecimiento."}
              </p>
              <Button
                variant="bordered"
                className="rounded-full px-10 py-6 font-medium text-medium border-1 border-slate-150"
                startContent={<GoogleIcon />}
                onPress={() => {
                  loginEmployees();
                }}
              >
                Inicia sesión con Google
              </Button>
              <div className="w-full">
                {errorServer && (
                  <p className="text-[#f31260] text-sm font-semibold">
                    {errorServer}
                  </p>
                )}
              </div>
            </>
          )}
        </section>
        {userRole !== "" && (
          <Button
            size="sm"
            color="secondary"
            className="absolute bottom-10 font-semibold"
            onClick={() => setUserRole("")}
          >
            Cambiar de rol
          </Button>
        )}
      </motion.div>
    </div>
  );
};

const GoogleIcon = () => {
  return (
    <img
      className="size-5"
      src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png"
    />
  );
};

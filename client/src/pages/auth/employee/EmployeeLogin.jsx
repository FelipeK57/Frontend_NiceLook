import { Button } from "@nextui-org/react";
import { GoogleLogin } from "@react-oauth/google";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import EmployeeLoginForm from "./EmployeeLoginForm";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { loginEmployee } from "@/Api/employee/employee";
import useAuthStore from "../../../stores/useAuthStore";
import { loginReceptionist } from "../../../Api/receptionist/receptionistApi";
import Cookies from "js-cookie";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { hasGrantedAllScopesGoogle } from "@react-oauth/google";

function EmployeeLogin() {
  const [loginAs, setLoginAs] = useState("employee");

  const [isVisible, setIsVisible] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [codeValid, setCodeValid] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSmallScreen, setIsSmallScreen] = useState(windowWidth < 768);
  const [errorServer, setErrorServer] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsSmallScreen(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleLoginAs = (e) => {
    setLoginAs(e);
  };

  const handleGetBack = () => {
    if (codeValid) {
      setCodeValid(false);
    } else if (isCode) {
      setIsCode(false);
    } else if (isRegister) {
      setIsRegister(false);
    }
  };

  function authGoogleEmployee(token) {
    const promise = new Promise((resolve, reject) => {
      const response = loginEmployee(token);
      setTimeout(() => {
        resolve(response);
        reject("Ocurrio un error");
      }, 0);
    });
    promise.then((response) => {
      console.log(response);
      const access = response.data.access_token;
      const refresh = response.data.refresh_token;
      const decoded = jwtDecode(response.data.access_token);
      const id_employee = response.data.id_employee;
      Cookies.set("id_employee", id_employee, { expires: 7 });

      // Guardar los datos del usuario en Zustand
      login(decoded, access, refresh);

      navigate("/employee/dashboard/services");
    });
    promise.catch((error) => {
      console.log(error.message);
    });
  }

  function authGoogleReceptionist(token) {
    const promise = new Promise((resolve, reject) => {
      const response = loginReceptionist(token);
      setTimeout(() => {
        resolve(response);
        reject("Ocurrio un error");
      }, 0);
    });
    promise.then((response) => {
      const access = response.data.access_token;
      const refresh = response.data.refresh_token;
      const decoded = jwtDecode(response.data.access_token);
      console.log(decoded);

      // Guardar los datos del usuario en Zustand
      login(decoded, access, refresh);

      navigate("/recepcionist/dashboard/finance");
    });
    promise.catch((error) => {
      console.log(error.message);
    });
  }

  const loginTest = useGoogleLogin({
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
    <section className="relative w-full overflow-hidden h-screen flex justify-center items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={"circule1"}
          initial={{ x: -300, y: 0 }}
          animate={
            !isRegister
              ? isSmallScreen
                ? { x: -1500, y: -800, scaleX: 1.5 }
                : { x: -1100, y: -1050 }
              : { x: 0, y: -1650, scaleX: 1.5 }
          }
          transition={{ duration: 0.8 }}
          className={`bg-black absolute rounded-full w-[250vh] h-[250vh] z-[-1]`}
        ></motion.div>
        <motion.div
          key={"circule2"}
          initial={{ x: 300, y: 0 }}
          animate={
            !isRegister
              ? isSmallScreen
                ? { x: 1500, y: 800, scaleX: 1.5 }
                : { x: 1100, y: 1050 }
              : { x: 0, y: 1650, scaleX: 1.5 }
          }
          transition={{ duration: 0.8 }}
          className={`bg-tulip-tree-400 absolute rounded-full w-[250vh] h-[250vh] z-[-1]`}
        ></motion.div>
        <motion.card
          key={"card"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          exit={{ opacity: 0 }}
          className={`w-[75%] h-[70%] relative ${
            !isRegister
              ? "bg-[rgba(255,255,255,0.7)] backdrop-blur-lg shadow-sm shadow-slate-950"
              : ""
          } rounded-3xl flex justify-center items-center transition-all duration-800`}
        >
          {isRegister && (
            <Button
              variant="bordered"
              isIconOnly
              className="absolute top-5 left-5 rounded-full border-2 border-slate-950 transition-all duration-300"
              onPress={handleGetBack}
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
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </Button>
          )}
          <div className="grid lg:grid-cols-2 grid-cols-1 lg:grid-rows-1 grid-rows-[0.2fr_1.8fr] h-full sm:p-14 p-8 pt-4 w-full">
            <div className="items-center justify-center flex flex-col sm:pr-14">
              <h1 className="font-bold text-4xl 2xl:flex hidden">
                Te damos la bienvenida a
              </h1>
              <span className="font-bold text-4xl 2xl:flex hidden">
                Nice<span className="text-slate-700">Look</span>
                <span className="text-tulip-tree-400">.</span>
              </span>
              <h1 className="font-bold lg:text-4xl sm:text-3xl text-2xl 2xl:hidden text-center">
                Esto es Nice<span className="text-slate-700">Look</span>
                <span className="text-tulip-tree-400">.</span>
              </h1>
            </div>
            <div className="h-full items-center sm:p-10 p-2  2xl:mx-24 xl:mx-12 sm:mx-8 xs:mx-0 ">
              <div className="flex flex-col w-full self-start gap-4 items-center sm:items-start">
                <h2 className="lg:text-4xl sm:text-3xl text-2xl text-center sm:text-start font-bold">
                  {isRegister ? "Recuperar contraseña" : "Inicia sesion"}
                </h2>
                {isRegister && (
                  <p className="xl:text-xl sm:text-lg">
                    O tambien puedes iniciar sesion con:
                  </p>
                )}

                <GoogleLogin
                  size={isSmallScreen ? "small" : "large"}
                  shape="circle"
                  onSuccess={() => {
                    loginTest();
                  }}
                />
                <div className="w-full">
                  {errorServer && (
                    <p className="text-[#f31260] text-sm font-semibold">
                      {errorServer}
                    </p>
                  )}
                </div>
                {!isRegister && (
                  <p className="xl:text-xl sm:text-lg">
                    O tambien puedes iniciar sesion con tus credenciales como:
                  </p>
                )}
              </div>
              <div className="w-full flex flex-col sm:h-[85%] h-[75%]">
                <EmployeeLoginForm
                  isVisible={isVisible}
                  setIsVisible={setIsVisible}
                  isRegister={isRegister}
                  setIsRegister={setIsRegister}
                  isCode={isCode}
                  setIsCode={setIsCode}
                  codeValid={codeValid}
                  setCodeValid={setCodeValid}
                />
                {/* {!isRegister && (
                  <Button
                    variant="gost"
                    lassName="w-fit text-xl text-blue-400 self-center"
                    onPress={() => setIsRegister(true)}
                  >
                    Olvidaste tu contrasena?
                  </Button>
                )} */}
              </div>
            </div>
          </div>
        </motion.card>
      </AnimatePresence>
    </section>
  );
}

export default EmployeeLogin;

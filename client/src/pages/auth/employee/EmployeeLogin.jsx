import { Button } from "@nextui-org/react";
import { GoogleLogin } from "@react-oauth/google";
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react";
import EmployeeLoginForm from "./EmployeeLoginForm";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { loginEmployee } from "../../../Api/employee/employee";
import useAuthStore from "../../../stores/useAuthStore";
import { loginReceptionist } from "../../../Api/receptionist/receptionistApi";

function EmployeeLogin() {

    const [loginAs, setLoginAs] = useState("employee");

    const [isVisible, setIsVisible] = useState(false)
    const [isRegister, setIsRegister] = useState(false)
    const [isCode, setIsCode] = useState(false)
    const [codeValid, setCodeValid] = useState(false)

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isSmallScreen, setIsSmallScreen] = useState(windowWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setIsSmallScreen(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    const handleLoginAs = (e) => {
        setLoginAs(e);
    }

    const handleGetBack = () => {
        if (codeValid) {
            setCodeValid(false);
        } else if (isCode) {
            setIsCode(false);
        } else if (isRegister) {
            setIsRegister(false);
        }
    }

    function authGoogleEmployee(token) {
        const promise = new Promise((resolve, reject) => {
            const response = loginEmployee(token);
            setTimeout(() => {
                resolve(response);
                reject("Ocurrio un error");
            }, 0)
        })
        promise.then((response) => {
            const access = response.data.access_token;
            const refresh = response.data.refresh_token;
            const decoded = jwtDecode(response.data.access_token);

            // Guardar los datos del usuario en Zustand
            login(decoded, access, refresh);

            navigate("/employee/dashboard/services");
        })
        promise.catch((error) => {
            console.log(error.message);
        })
    }

    function authGoogleReceptionist(token) {
        const promise = new Promise((resolve, reject) => {
            const response = loginReceptionist(token);
            setTimeout(() => {
                resolve(response);
                reject("Ocurrio un error");
            }, 0)
        });
        promise.then((response) => {
            const access = response.data.access_token;
            const refresh = response.data.refresh_token;
            const decoded = jwtDecode(response.data.access_token);
            console.log(decoded);

            // Guardar los datos del usuario en Zustand
            login(decoded, access, refresh);

            navigate("/recepionist/dashboard/finance");

        })
        promise.catch((error) => {
            console.log(error.message);
        })
    }

    return (
        <section className="relative w-full overflow-hidden h-screen flex justify-center items-center">
            <AnimatePresence mode="wait" >
                <motion.div key={"circule1"} initial={{ x: -300, y: 0 }}
                    animate={!isRegister ? ( isSmallScreen ? { x: -1500, y: -800, scaleX: 1.5 } : { x: -1100, y: -1050 }) : { x: 0, y: -1650, scaleX: 1.5 }}
                    transition={{ duration: 0.8 }}
                    className={`bg-black absolute rounded-full w-[250vh] h-[250vh] z-[-1]`}>
                </motion.div>
                <motion.div key={"circule2"} initial={{ x: 300, y: 0 }}
                    animate={!isRegister ? ( isSmallScreen ? { x: 1500, y: 800, scaleX: 1.5 } : { x: 1100, y: 1050 }) : { x: 0, y: 1650, scaleX: 1.5 }}
                    transition={{ duration: 0.8 }}
                    className={`bg-tulip-tree-400 absolute rounded-full w-[250vh] h-[250vh] z-[-1]`}>

                </motion.div>
                <motion.card key={"card"} initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    exit={{ opacity: 0 }}
                    className={`w-[75%] h-[70%] relative ${!isRegister ? "bg-[rgba(255,255,255,0.7)] backdrop-blur-lg shadow-sm shadow-slate-950" : ''} rounded-3xl flex justify-center items-center transition-all duration-800`}>
                    {isRegister &&
                        <Button variant="bordered"
                            isIconOnly
                            className="absolute top-5 left-5 rounded-full border-2 border-slate-950 transition-all duration-300"
                            onPress={handleGetBack}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>

                        </Button>}
                    <div className="grid lg:grid-cols-2 grid-cols-1 lg:grid-rows-1 grid-rows-[0.2fr_1.8fr] h-full sm:p-14 p-8 pt-4 w-full">
                        <div className="items-center justify-center flex flex-col sm:pr-14">
                            <h1 className="font-bold text-4xl 2xl:flex hidden">Te damos la bienvenida a</h1>
                            <span className="font-bold text-4xl 2xl:flex hidden">Nice<span className="text-slate-700">Look</span><span className="text-tulip-tree-400">.</span></span>
                            <h1 className="font-bold lg:text-4xl sm:text-3xl text-2xl 2xl:hidden text-center">Esto es Nice<span className="text-slate-700">Look</span><span className="text-tulip-tree-400">.</span></h1>
                        </div>
                        <div className="h-full items-center sm:p-10 p-2 lg:border-l-2 border-slate-700">
                            <div className="flex flex-col w-full self-start gap-4 items-center sm:items-start">
                                <h2 className="lg:text-4xl sm:text-3xl text-2xl text-center sm:text-start font-bold">
                                    {isRegister ? "Recuperar contraseña" : "Inicia sesion"}
                                </h2>
                                {isRegister && <p className="xl:text-xl sm:text-lg">O tambien puedes iniciar sesion con:</p>}

                                <GoogleLogin
                                    size={isSmallScreen ? "small" : "large"}
                                    shape="circle"
                                    onSuccess={(response) => {
                                        if (loginAs === "employee") {
                                            authGoogleEmployee(response.credential);
                                        } else {
                                            authGoogleReceptionist(response.credential);
                                        }
                                    }}
                                    onError={() => {
                                        console.log("Fallo en el inicio de sesión");
                                    }}
                                />
                                {!isRegister && <p className="xl:text-xl sm:text-lg">O tambien puedes iniciar sesion con tus credenciales como:</p>}
                            </div>
                            <div className="w-full flex flex-col justify-evenly sm:h-[85%] h-[75%]">
                                <div className={`w-full flex justify-center border-b-2 border-slate-400`}>
                                    <Button onPress={() => handleLoginAs("employee")}
                                        className={`sm:text-xl 2xl:w-1/3 w-1/2 rounded-r-none rounded-b-none ${loginAs === "employee" ? "bg-tulip-tree-400" : "bg-slate-400"}`}>
                                        Empleado
                                    </Button>
                                    <Button onPress={() => handleLoginAs("receptionist")}
                                        className={`sm:text-xl 2xl:w-1/3 w-2/4 rounded-l-none rounded-b-none ${loginAs === "receptionist" ? "bg-tulip-tree-400 " : "bg-slate-400"}`}>
                                        Recepcionista
                                    </Button>
                                </div>
                                <EmployeeLoginForm
                                    isVisible={isVisible}
                                    setIsVisible={setIsVisible}
                                    isRegister={isRegister}
                                    setIsRegister={setIsRegister}
                                    isCode={isCode}
                                    setIsCode={setIsCode}
                                    codeValid={codeValid}
                                    setCodeValid={setCodeValid} />

                                {!isRegister && <Button
                                    variant="gost"
                                    lassName="w-fit text-xl text-blue-400 self-center"
                                    onPress={() => setIsRegister(true)}>
                                    Olvidaste tu contrasena?
                                </Button>}
                            </div>
                        </div>
                    </div>
                </motion.card>
            </AnimatePresence>
        </section>
    )
}

export default EmployeeLogin
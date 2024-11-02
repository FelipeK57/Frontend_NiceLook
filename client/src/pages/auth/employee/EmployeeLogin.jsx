import { Button } from "@nextui-org/react";
import { GoogleLogin } from "@react-oauth/google";
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react";
import EmployeeLoginForm from "./EmployeeLoginForm";

function EmployeeLogin() {

    const [loginAs, setLoginAs] = useState("employee");

    const [isVisible, setIsVisible] = useState(false)
    const [isRegister, setIsRegister] = useState(false)
    const [isCode, setIsCode] = useState(false)
    const [codeValid, setCodeValid] = useState(false)

    const handleLoginAs = (e) => {
        setLoginAs(e);
    }

    const handleGetBack = () => {
        if(codeValid){
            setCodeValid(false);
        }else if(isCode){
            setIsCode(false);
        }else if(isRegister){
            setIsRegister(false);
        }
    }

    return (
        <section className="relative w-full overflow-hidden h-screen flex justify-center items-center">
            <AnimatePresence mode="wait" >
                <motion.div key={"circule1"} initial={{ x: -300, y: 0 }}
                    animate={!isRegister ? { x: -1100, y: -1050 } : { x: 0, y: -1650, scaleX: 1.5 }}
                    transition={{ duration: 0.8 }}
                    className={`bg-black absolute rounded-full w-[250vh] h-[250vh] z-[-1]`}>
                </motion.div>
                <motion.div key={"circule2"} initial={{ x: 300, y: 0 }}
                    animate={!isRegister ? { x: 1100, y: 1050 } : { x: 0, y: 1650, scaleX: 1.5 }}
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
                    <div className="grid grid-cols-2 h-full p-14 w-full">
                        <div className="items-center justify-center flex flex-col">
                            <h1 className="font-bold text-4xl">Te damos la bienvenida a</h1>
                            <span className="font-bold text-4xl">Nice<span className="text-slate-700">Look</span><span className="text-tulip-tree-400">.</span></span>
                        </div>
                        <div className="h-full items-center p-10 border-l-2 border-slate-700">
                            <div className="flex flex-col w-full self-start gap-4">
                                <h2 className="text-4xl font-bold">
                                    {isRegister ? "Recuperar contraseña" : "Inicia sesion"}
                                </h2>
                                {isRegister &&<p className="text-xl">O tambien puedes iniciar sesion con:</p>}
                                <GoogleLogin
                                    size="large"
                                    shape="circle"
                                // onSuccess={(response) => {
                                //     authGoogle(response.credential);
                                // }}
                                // onError={() => {
                                //   console.log("Fallo en el inicio de sesión");
                                // }}
                                />
                                {!isRegister &&<p className="text-xl">O tambien puedes iniciar sesion con tus credenciales como:</p>}
                            </div>
                            <div className="w-full flex flex-col justify-evenly h-[85%]">
                                <div className={`w-full flex justify-center border-b-2 border-slate-400`}>
                                    <Button onPress={() => handleLoginAs("employee")}
                                        className={`text-xl w-1/3 rounded-r-none rounded-b-none ${loginAs === "employee" ? "bg-tulip-tree-400" : "bg-slate-400"}`}>
                                        Empleado
                                    </Button>
                                    <Button onPress={() => handleLoginAs("receptionist")}
                                        className={`text-xl w-1/3 rounded-l-none rounded-b-none ${loginAs === "receptionist" ? "bg-tulip-tree-400 " : "bg-slate-400"}`}>
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

                                {!isRegister &&<Button
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
// import { editClient } from "@/api/employeeServices/employeeServicesApi";
import { editClient } from "@/api_feats/employeeServices/employeeServicesApi";
import { Input } from "@nextui-org/input"
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types"
import { useEffect, useState } from "react";
import ButtonCustom from "../global/ButtonCustom";


function ClientPerfil({ client }) {

    ClientPerfil.propTypes = {
        client: PropTypes.object.isRequired
    }

    const [clientNames, setClientNames] = useState();
    const [clientLastNames, setClientLastNames] = useState();
    const [clientPhone, setClientPhone] = useState();
    const [clientEmail, setClientEmail] = useState();
    const [alert, setAlert] = useState(false);

    useEffect(() => {
        setClientNames(client.user?.first_name);
        setClientLastNames(client.user?.last_name);
        setClientPhone(client.phone);
        setClientEmail(client.user?.email);
    }, [client]);

    function handleEditClient() {
        const promise = new Promise((resolve, reject) => {
            const response = editClient(client.id, clientNames, clientLastNames, clientPhone);
            setTimeout(() => {
                resolve(response);
                reject("Ocurrio un error");
            }, 0);
        })
        promise.then(() => {
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
            }, 2000);
        })
        promise.catch((error) => {
            console.log(error);
        })
    }

    // console.log(client);

    return (
        <aside className=" h-[100%] sm:w-full w-[90%] justify-center m-auto sm:m-0 lg:justify-normal flex p-2 border-slate-300 rounded-3xl lg:rounded-none sm:border-r-2 sm:border-l-0 sm:border-y-0 border-2">
            <div className=" flex flex-col  h-fit pb-8 sm:w-auto w-full">
                <form action="" className="lg:px-10 flex flex-col lg:gap-6 gap-4">
                    <h2 className="text-2xl font-bold py-4">Datos personales</h2>
                    <div>
                        <label className="text-xl font-semibold">Nombres:</label>
                        <Input onChange={(e) => setClientNames(e.target.value)}
                            value={clientNames}
                            variant="bordered"
                            className=" mx-auto text-lg"
                            classNames={{
                                input: "text-lg "
                            }} />
                    </div>
                    <div>
                        <label className="text-xl font-semibold">Apellidos:</label>
                        <Input onChange={(e) => setClientLastNames(e.target.value)}
                            value={clientLastNames}
                            variant="bordered"
                            className=" mx-auto text-lg"
                            classNames={{
                                input: "text-lg",
                            }} />
                    </div>
                    <div>
                        <label className="text-xl font-semibold">Correo electronico:</label>
                        <Input onChange={(e) => setClientEmail(e.target.value)}
                            value={clientEmail}
                            variant="bordered"
                            readOnly
                            className=" mx-auto pointer-events-none text-lg"
                            classNames={{
                                input: "text-lg",
                            }} />
                    </div>
                    <div>
                        <label className="text-xl font-semibold">Telefono:</label>
                        <Input onChange={(e) => setClientPhone(e.target.value)}
                            value={clientPhone}
                            variant="bordered"
                            className=" mx-auto rounded-xl text-lg"
                            classNames={{
                                input: "text-lg",
                            }} />
                    </div>
                    <div className="w-full flex justify-center mt-4">
                        <ButtonCustom onPress={handleEditClient} secondary classStyles="w-1/2 text-lg">
                            Guardar
                        </ButtonCustom>
                    </div>
                </form>
            </div>
            <AnimatePresence mode="wait">
                {alert && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, translateY: "25vh", translateX: "27vw" }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="bg-white p-4 absolute shadow-lg shadow-gray-500 rounded-3xl flex min-w-[200px] min-h-[100px] z-50">
                        <span className=" flex justify-center items-center text-2xl ">Sus datos se ha actualizado con exito</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </aside>
    )
}

export default ClientPerfil
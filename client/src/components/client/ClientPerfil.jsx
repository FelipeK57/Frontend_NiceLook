import { editClient } from "@/Api/employeeServices/employeeServicesApi";
import { Input } from "@nextui-org/input"
import { Button } from "@nextui-org/react"
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types"
import { useEffect, useState } from "react";


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
        <aside className=" h-full w-full flex p-4">
            <div className=" flex flex-col border-2 border-slate-300 w-full rounded-3xl h-fit pb-8">
                <form action="" className="px-2 flex flex-col gap-4">
                    <h2 className="text-2xl font-bold p-4">Datos personales</h2>
                    <div>
                        <label className="text-xl font-semibold">Nombres:</label>
                        <Input onChange={(e) => setClientNames(e.target.value)}
                            value={clientNames}
                            variant="bordered"
                            className="w-3/4 mx-auto border-2 border-slate-400 rounded-xl text-lg"
                            classNames={{
                                input: "text-lg",
                            }} />
                    </div>
                    <div>
                        <label className="text-xl font-semibold">Apellidos:</label>
                        <Input onChange={(e) => setClientLastNames(e.target.value)}
                            value={clientLastNames}
                            variant="bordered"
                            className="w-3/4 mx-auto border-2 border-slate-400 rounded-xl text-lg"
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
                            className="w-3/4 mx-auto border-2 border-slate-400 rounded-xl pointer-events-none text-lg"
                            classNames={{
                                input: "text-lg",
                            }} />
                    </div>
                    <div>
                        <label className="text-xl font-semibold">Telefono:</label>
                        <Input onChange={(e) => setClientPhone(e.target.value)}
                            value={clientPhone}
                            variant="bordered"
                            className="w-3/4 mx-auto border-2 border-slate-400 rounded-xl text-lg"
                            classNames={{
                                input: "text-lg",
                            }} />
                    </div>
                    <div className="w-full flex justify-center mt-4">
                        <Button onPress={handleEditClient}
                            variant="bordered"
                            className="w-3/4  border-2 border-slate-400 rounded-xl">
                            Guardar
                        </Button>
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
import { Button, Select, SelectItem, } from "@nextui-org/react"
import ClientPerfil from "./ClientPerfil"
import ClientService from "./ClientService"
import { useEffect, useState } from "react"
import { getClientHistory, getClientReviews, getProductsHistory } from "@/Api/profile/profileApi"
import { getClient } from "@/Api/employeeServices/employeeServicesApi"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import CLientProduct from "./ClientProduct"
import ButtonCustom from "../global/ButtonCustom"
import { AnimatePresence, motion } from "framer-motion"
import useMediaQuery from "@/hooks/UseMediaQuery"

function ClientHistorial() {

    const [clientHistory, setClientHistory] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [client, setClient] = useState({});
    const [filter, setFilter] = useState({ anchorKey: "Appointments" });
    const [products, setProducts] = useState([]);

    useEffect(() => {
        function loadClient() {
            const promise = new Promise((resolve, reject) => {
                const response = getClient(Cookies.get("client_id"));
                setTimeout(() => {
                    resolve(response);
                    reject("Ocurrio un error");
                }, 1000);
            });
            promise.then((response) => {
                setClient(response.data);
                console.log(response);
            });
            promise.catch((error) => {
                console.log(error);
            })
        }

        function loadClientHistory() {
            const promise = new Promise((resolve, reject) => {
                const response = getClientHistory(client.id);
                setTimeout(() => {
                    resolve(response);
                    reject("Ocurrio un error");
                }, 1000);
            });
            promise.then((response) => {
                setClientHistory(response.data);
            });
            promise.catch((error) => {
                console.log(error);
            });
        }

        loadClient();
        loadClientHistory();
        loadClientReviews();

        function loadProductsHistory() {
            const promise = new Promise((resolve, reject) => {
                const response = getProductsHistory(client.id);
                setTimeout(() => {
                    resolve(response);
                    reject("Ocurrio un error");
                }, 1000);
            });
            promise.then((response) => {
                setProducts(response.data);
                console.log("Estos son los productos comprados de este cliente: ", response.data);
            });
            promise.catch((error) => {
                console.log(error);
            });
        }

        loadProductsHistory();

    }, [client.id])

    function loadClientReviews() {
        const promise = new Promise((resolve, reject) => {
            const response = getClientReviews(client.id)
            setTimeout(() => {
                resolve(response)
                reject("Ocurrio un error")
            }, 1000);
        })
        promise.then((response) => {
            setReviews(response.data)
        })
        promise.catch((error) => {
            console.log(error)
        })
    }

    const navigate = useNavigate();

    // console.log("Historial de citas: ", clientHistory)
    // console.log("cliente: ", client)
    const handleChange = (value) => {
        if (value.size !== 0) {
            setFilter(value);
        } else {
            setFilter({ anchorKey: "Todos" });
        }
    }

    const [movileFilter, setMovileFilter] = useState(false);
    const [isOnMenu, setIsOnMenu] = useState(true);
    const isSm = useMediaQuery("(min-width: 640px)");

    useEffect(() => {
        if (isSm) {
            setMovileFilter(false);
        } else{
            setMovileFilter(true);
        }
    }, [isSm])

    const handleMovileChange = (value) => {
        if (value.size !== 0) {
            setFilter(value);
            setIsOnMenu(false);
        } else {
            setFilter({ anchorKey: "Todos" });
            setIsOnMenu(false);
        }
    }

    const handleSm = () => {
        if(isOnMenu){
            setIsOnMenu(false);
        } else{
            setIsOnMenu(true);
        }
    }

    // console.log("filter: ", filter)
    // console.log("cleinte: ", client)
    console.log("Sm: ", isSm)
    console.log("onMenu: ", isOnMenu)
    return (
        <div className="w-full lg:h-[93vh] flex flex-col 2xl:px-32 xl:px-20 lg:py-10 py-5 transition-all duration-300">
            <div className="flex flex-row gap-4 items-center sm:mb-0 mb-4">
                <Button onPress={
                    !isSm ? () => handleSm() : () => navigate(-1, { replace: true })
                }
                    isIconOnly
                    variant="bordered"
                    className="rounded-full border-2 border-slate-200 shadow-sm shadow-slate-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </Button>
                <h1 className="text-4xl font-bold">{client?.user?.first_name} {client?.user?.last_name}</h1>
            </div>
            <AnimatePresence mode="wait">
                {isOnMenu &&
                    <motion.div key={"desktop"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid lg:grid-cols-[0.5fr_1.5fr] grid-cols-1 h-full max-h-[80vh] pb-2 lg:mt-8">
                        <ClientPerfil client={client} />
                        <article className="ml-8 flex flex-col gap-4 overflow-y-auto pr-4
                        scrollbar scrollbar-thumb-slate-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full active:scrollbar-thumb-primary hover:scrollbar-thumb-slate-300">
                            <div className="lg:fixed z-10 bg-white w-full gap-4 flex items-center sm:mt-0 mt-4">
                                <h2 className="text-3xl font-bold ">Historial</h2>
                                <ButtonCustom primary={filter.anchorKey === "Appointments" ? true : false}
                                    secondary={filter.anchorKey !== "Appointments" ? true : false}
                                    name="Mis citas"
                                    action={() => handleChange({ anchorKey: "Appointments" })}
                                    classStyles={"text-lg sm:flex hidden"}>
                                </ButtonCustom>
                                <ButtonCustom primary={filter.anchorKey !== "Appointments" ? true : false}
                                    secondary={filter.anchorKey === "Appointments" ? true : false}
                                    name="Mis productos"
                                    action={() => handleChange({ anchorKey: "products" })}
                                    classStyles={"text-lg sm:flex hidden"}>
                                </ButtonCustom>
                            </div>
                            <div className="lg:h-full lg:mt-16 gap-4 flex-col sm:flex hidden">
                                {filter.anchorKey === "Appointments" ?
                                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                                        {clientHistory.length > 0 ? clientHistory?.map((service) => (
                                            <>
                                                <ClientService key={service.id} appointments={service} reviews={reviews} loadClientReviews={loadClientReviews} client={client} />
                                            </>
                                        ))
                                            :
                                            <div className="flex flex-col gap-4 justify-center w-full items-center">
                                                <h2 className="sm:text-3xl text-2xl font-bold">No hay nada para ver aqui</h2>
                                            </div>}
                                    </div>
                                    :
                                    <>
                                        {products.data.length > 0 ?
                                            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                                                {products?.data?.map((product) => (
                                                    <>
                                                        <CLientProduct key={product.id} product={product} />
                                                    </>
                                                ))}
                                            </div>
                                            :
                                            <div className="flex flex-col gap-4 justify-center w-full items-center">
                                                <h2 className="sm:text-3xl text-2xl font-bold">No hay nada para ver aqui</h2>
                                            </div>
                                        }
                                    </>
                                }
                            </div>
                            <div className="sm:hidden grid grid-cols-2 gap-4 ">
                                <ButtonCustom secondary classStyles={"flex flex-col justify-center gap-2 h-[100px] text-lg"} action={() => handleMovileChange({ anchorKey: "Appointments" })}>
                                    Mis citas
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>
                                </ButtonCustom>
                                <ButtonCustom secondary classStyles={"flex flex-col justify-center gap-2 h-[100px] text-lg"} action={() => handleMovileChange({ anchorKey: "products" })}>
                                    Mis productos
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                    </svg>
                                </ButtonCustom>
                            </div>
                        </article>
                    </motion.div>
                }
                {movileFilter && !isOnMenu &&
                    <motion.div key={"movile"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="lg:h-full lg:mt-16 gap-4 flex-col flex">
                        {filter.anchorKey === "Appointments" ?
                            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                                {clientHistory.length > 0 ? clientHistory?.map((service) => (
                                    <>
                                        <ClientService key={service.id} appointments={service} reviews={reviews} loadClientReviews={loadClientReviews} client={client} />
                                    </>
                                ))
                                    :
                                    <div className="flex flex-col gap-4 justify-center w-full items-center">
                                        <h2 className="sm:text-3xl text-2xl font-bold">No hay nada para ver aqui</h2>
                                    </div>}
                            </div>
                            :
                            <>
                                {products.data.length > 0 ?
                                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                                        {products?.data?.map((product) => (
                                            <>
                                                <CLientProduct key={product.id} product={product} />
                                            </>
                                        ))}
                                    </div>
                                    :
                                    <div className="flex flex-col gap-4 justify-center w-full items-center">
                                        <h2 className="sm:text-3xl text-2xl font-bold">No hay nada para ver aqui</h2>
                                    </div>
                                }
                            </>
                        }
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}

export default ClientHistorial
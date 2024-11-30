import { Button, } from "@nextui-org/react"
import ClientPerfil from "./ClientPerfil"
import ClientService from "./ClientService"
import { useEffect, useState } from "react"
import { getClientHistory, getClientReviews } from "@/Api/profile/profileApi"
import { getClient } from "@/Api/employeeServices/employeeServicesApi"

function ClientHistorial() {

    const [clientHistory, setClientHistory] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [client, setClient] = useState({});

    useEffect(() => {
        function loadClient() {
            const promise = new Promise((resolve, reject) => {
                const response = getClient(1);
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
    }, [client.id,])

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

    // console.log("Historial de citas: ", clientHistory)
    // console.log("cliente: ", client)

    return (
        <div className="w-full lg:h-[93.6vh] flex flex-col 2xl:px-64 xl:px-20  py-10 transition-all duration-300">
            <div className="flex flex-row gap-4 items-center">
                <Button isIconOnly variant="bordered" className="rounded-full border-2 border-slate-200 shadow-sm shadow-slate-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </Button>
                <h1 className="text-4xl font-bold">Perfil e historial</h1>
            </div>
            <div className="grid lg:grid-cols-[0.4fr_1.6fr] grid-cols-1 h-full mt-8">
                <ClientPerfil client={client} />
                <article className="ml-8 flex flex-col gap-4 overflow-y-scroll pr-4
                scrollbar scrollbar-thumb-slate-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full active:scrollbar-thumb-primary hover:scrollbar-thumb-slate-300">
                    <h2 className="text-3xl font-bold lg:fixed z-10 bg-white w-full">Historial</h2>
                    <div className="lg:h-full mt-10 gap-4 flex flex-col">
                        {clientHistory.length > 0 ? clientHistory?.map((service) => (
                            <ClientService key={service.id} appointments={service} reviews={reviews} loadClientReviews={loadClientReviews} />
                        ))
                            :
                            <div className="flex flex-col gap-4 justify-center w-full items-center">
                                <h2 className="text-3xl font-bold">No hay nada para ver aqui</h2>
                            </div>
                        }
                    </div>
                </article>
            </div>
        </div>
    )
}

export default ClientHistorial
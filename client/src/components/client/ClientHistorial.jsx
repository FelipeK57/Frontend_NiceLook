import { Button, } from "@nextui-org/react"
import ClientPerfil from "./ClientPerfil"
import ClientService from "./ClientService"
import { useEffect, useState } from "react"
import { getClientHistory, getClientReviews } from "@/Api/profile/profileApi"

function ClientHistorial() {

    const [clientHistory, setClientHistory] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        function loadClientHistory() {
            const promise = new Promise((resolve, reject) => {
                const response = getClientHistory(1);
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

        loadClientHistory();

        function loadClientReviews(){
            const promise = new Promise((resolve, reject) => {
                const response = getClientReviews(1)
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

        loadClientReviews();
    }, [])

    console.log("Historial de citas: ",clientHistory)

    return (
        <div className="w-full h-[93.6vh] flex flex-col md:px-64 px-52 py-10 ">
            <div className="flex flex-row gap-4 items-center">
                <Button isIconOnly variant="bordered" className="rounded-full border-2 border-slate-200 shadow-sm shadow-slate-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </Button>
                <h1 className="text-4xl font-bold">Perfil e historial</h1>
            </div>
            <div className="grid grid-cols-[0.4fr_1.6fr] h-full mt-8">
                <ClientPerfil />
                <article className="ml-8 flex flex-col gap-4 overflow-y-scroll pr-4
                scrollbar scrollbar-thumb-slate-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full active:scrollbar-thumb-primary hover:scrollbar-thumb-slate-300">
                    <h2 className="text-3xl font-bold fixed z-10 bg-white w-full">Historial</h2>
                    <div className="h-full mt-10 gap-4 flex flex-col">
                        {clientHistory?.map((service) => (
                            <ClientService key={service.id} service={service} reviews={reviews} />
                        ))}
                    </div>
                </article>
            </div>
        </div>
    )
}

export default ClientHistorial
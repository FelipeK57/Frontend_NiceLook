import { Button } from "@nextui-org/react"
import { Skeleton } from "@nextui-org/skeleton"
import PropTypes from "prop-types"
import { useEffect, useState } from "react";

function ClientService({ service, reviews }) {

    ClientService.propTypes = {
        service: PropTypes.object,
        reviews: PropTypes.array
    }

    const fechaYHora = service.time;
    const horaAmigable = new Date(fechaYHora).toLocaleTimeString();
    const [review, setReview] = useState([]);
    const [firstService, setFirstService] = useState();

    useEffect(() => {
        if (reviews) {
            const review = reviews.find((review) => review.appointment === service.id &&
                review.employee === service.employee.id &&
                review.autor === service.client.id
            );
            setReview(review);
        }

        //Se necesita una funcion para buscar un solo servicio con el fin de obtener la imagen
        

    }, [reviews, service]);

    console.log(reviews);
    console.log("Comentario", review);

    return (
        <div className="border-2 border-slate-300 rounded-3xl min-w-full w-full min-h-[25%] h-[25%] p-4">
            <div className="flex flex-row gap-4 h-full relative">
                <Skeleton className="flex w-[15%] h-full rounded-3xl">
                    <img className="w-full h-full object-cover rounded-3xl"
                        src=""
                        alt="esta es la imagen" />
                </Skeleton>
                <div className="grid grid-cols-2 gap-4 w-[85%]">
                    <div className="flex flex-col gap-1">
                        <h3 className="text-2xl font-bold line-clamp-1 text-ellipsis">
                            {
                                service.services.map((service) => service.name).join(", ")
                            }
                        </h3>
                        <text className="text-xl line-clamp-1 text-ellipsis">{service?.employee?.user?.first_name} {service?.employee?.user?.last_name}</text>
                        <div className="flex flex-row gap-4">
                            <text className="text-xl">Fecha y hora: {service.date}</text>
                            <text className="text-xl">{horaAmigable}</text>
                        </div>
                        <text className="text-xl">Establecimiento: {service.establisment.name}</text>
                        <text className="text-xl">Total: <b>${service.total}</b></text>
                        <Button isIconOnly variant="bordered" radius="full" className="absolute border-2 border-slate-200 bottom-2 right-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                        </Button>
                    </div>
                    <div className="gap-2 venezuela max-h-[7.5vh]">
                        <h3 className="text-2xl font-bold">Reseña</h3>
                        <p className="text-lg max-h-[100%] overflow-y-auto scrollbar scrollbar-thumb-slate-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full active:scrollbar-thumb-primary hover:scrollbar-thumb-slate-300">
                            {review?.comment}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClientService
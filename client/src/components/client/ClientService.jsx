import { createReview, getService, updateReview } from "@/Api/employeeServices/employeeServicesApi";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from "@nextui-org/react"
import { Skeleton } from "@nextui-org/skeleton"
import PropTypes from "prop-types"
import { useEffect, useState } from "react";

function ClientService({ appointments, reviews, loadClientReviews, client }) {

    ClientService.propTypes = {
        appointments: PropTypes.object,
        reviews: PropTypes.array,
        loadClientReviews: PropTypes.func,
        client: PropTypes.object
    }

    const fechaYHora = appointments.time;
    const horaAmigable = new Date(fechaYHora).toLocaleTimeString();
    const [review, setReview] = useState([]);
    const [writeReview, setWriteReview] = useState(false);
    const [comment, setComment] = useState("");

    const [star1, setStar1] = useState(false);
    const [star2, setStar2] = useState(false);
    const [star3, setStar3] = useState(false);
    const [star4, setStar4] = useState(false);
    const [star5, setStar5] = useState(false);
    const [star, setStar] = useState(0);

    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const [firstService, setFirstService] = useState();
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        if (reviews) {
            const review = reviews.find((review) => review.appointment === appointments.id &&
                review.employee === appointments.employee.id &&
                review.autor === appointments.client.id
            );
            setReview(review);
        }
        //Se necesita una funcion para buscar un solo servicio con el fin de obtener la imagen

    }, [reviews, appointments]);

    useEffect(() => {
        function loadservice() {
            const promise = new Promise((resolve, reject) => {
                const response = getService(appointments.services[0].id);
                setTimeout(() => {
                    resolve(response);
                    reject("Ocurrio un error");
                }, 0);
            });
            promise.then((response) => {
                setFirstService(response.data);
            });
            promise.catch((error) => {
                console.log(error);
            });
        }

        loadservice();
    }, [appointments]);

    const handleStar = (value) => {
        switch (value) {
            case 1:
                if (star1 && star2) {
                    setStar1(true);
                } else {
                    if (star1) {
                        setStar1(false);
                    } else {
                        setStar1(true);
                    }
                }
                setStar2(false);
                setStar3(false);
                setStar4(false);
                setStar5(false);
                break;
            case 2:
                setStar1(true);
                setStar2(true);
                setStar3(false);
                setStar4(false);
                setStar5(false);
                break;
            case 3:
                setStar1(true);
                setStar2(true);
                setStar3(true);
                setStar4(false);
                setStar5(false);
                break;
            case 4:
                setStar1(true);
                setStar2(true);
                setStar3(true);
                setStar4(true);
                setStar5(false);
                break;
            case 5:
                setStar1(true);
                setStar2(true);
                setStar3(true);
                setStar4(true);
                setStar5(true);
                break;
            default:
                setStar1(false);
                setStar2(false);
                setStar3(false);
                setStar4(false);
                setStar5(false);
                break;
        }
    };

    useEffect(() => {

        if (star1) {
            setStar(1);
        }
        if (star2) {
            setStar(2);
        }
        if (star3) {
            setStar(3);
        }
        if (star4) {
            setStar(4);
        }
        if (star5) {
            setStar(5);
        }
        if (!star1 && !star2 && !star3 && !star4 && !star5) {
            setStar(0);
        }

    }, [star1, star2, star3, star4, star5]);

    function CreateReview() {
        const promise = new Promise((resolve, reject) => {
            const response = createReview(client?.id, appointments.employee.id, appointments.id, comment, star);
            setTimeout(() => {
                resolve(response);
                reject("Ocurrio un error");
            }, 0);
        });
        promise.then((response) => {
            console.log(response);
            setWriteReview(false);
            loadClientReviews();
        });
        promise.catch((error) => {
            console.log(error);
        });
    }

    const [opened, setOpened] = useState(false);

    useEffect(() => {
        setComment(review?.comment);
        setStar1(review?.rating >= 1)
        setStar2(review?.rating >= 2)
        setStar3(review?.rating >= 3)
        setStar4(review?.rating >= 4)
        setStar5(review?.rating >= 5)
    }, [opened, review]);


    const handleOpen = () => {
        setOpened(true);
        onOpen();
    }

    const handleClose = (onClose) => {
        setOpened(false);
        onClose();
    }

    const handleSave = (onClose) => {
        if (comment !== review?.comment || star !== review?.rating) {
            const promise = new Promise((resolve, reject) => {
                const response = updateReview(client?.id, appointments.employee.id, appointments.id, comment, star);
                setTimeout(() => {
                    resolve(response);
                    reject("Ocurrio un error");
                }, 0);
            });
            promise.then((response) => {
                console.log(response);
                setWriteReview(false);
                loadClientReviews();
                onClose();
            });
            promise.catch((error) => {
                if (error.response.data.error === "You have not reviewed this appointment") {
                    const promise = new Promise((resolve, reject) => {
                        const response = createReview(client?.id, appointments.employee.id, appointments.id, comment, star);
                        setTimeout(() => {
                            resolve(response);
                            reject("Ocurrio un error");
                        }, 0);
                    });
                    promise.then((response) => {
                        console.log(response);
                        setWriteReview(false);
                        loadClientReviews();
                    });
                    promise.catch((error) => {
                        console.log(error);
                    });
                }
                setWriteReview(false);
                loadClientReviews();
                onClose();
            })
        } else {
            onClose();
        }
    }

    // console.log(reviews);
    // console.log("Comentario", comment);
    // console.log("Servicio", appointments);
    // console.log("Estrellas", star);
    // console.log("Review", review);
    // console.log("Total", appointments);
    // console.log("Primer servicio", firstService)

    return (
        <div className="border-2 border-slate-300 rounded-3xl min-w-full w-full min-h-[25%] p-4">
            <div className="flex lg:flex-row flex-col gap-4 h-full relative">
                <Skeleton className="flex w-[200px] self-center h-[150px] rounded-3xl" isLoaded={imageLoaded}>
                    <img className="lg:w-full lg:h-full w-[200px] h-[150px] object-cover rounded-3xl"
                        src={firstService?.image_base64}
                        alt="esta es la imagen"
                        onLoad={() => setImageLoaded(true)} />
                </Skeleton>
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 lg:w-[85%] lg:border-none lg:pt-0 pt-4 border-t-2 border-slate-300">
                    <div className="flex flex-col gap-1">
                        <h3 className="text-2xl font-bold line-clamp-1 text-ellipsis">
                            {
                                appointments.services.map((service) => service.name).join(", ")
                            }
                        </h3>
                        <text className="text-xl line-clamp-1 text-ellipsis">{appointments?.employee?.user?.first_name} {appointments?.employee?.user?.last_name}</text>
                        <div className="flex flex-row space-x-2 flex-wrap">
                            <text className="text-xl text-nowrap"><b>Fecha y hora:</b> {appointments.date}</text>
                            <text className="text-xl text-nowrap">{horaAmigable}</text>
                        </div>
                        <text className="text-xl"><b>Establecimiento:</b> {appointments.establisment.name}</text>
                        <text className="text-xl"><b>Total:</b> <b>${appointments.total_price}</b></text>
                        {!writeReview &&
                            <Button isIconOnly variant="bordered" radius="full" className="absolute border-1 border-slate-500 shadow-sm shadow-slate-500 bottom-2 right-2" onPress={handleOpen}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                            </Button>
                        }
                    </div>
                    <div className="gap-2 venezuela max-h-full lg:border-l-2 lg:border-slate-300 pl-2">
                        <h3 className="text-2xl font-bold">Reseña</h3>
                        <p className="text-lg max-h-[65%] overflow-y-auto scrollbar scrollbar-thumb-slate-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full active:scrollbar-thumb-primary hover:scrollbar-thumb-slate-300">
                            {!writeReview && (review?.comment ? review.comment : "No hay reseñas")}
                        </p>
                        {!review?.comment && !writeReview &&
                            <div className="flex justify-center">
                                <Button className="bg-primary text-xl" onPress={() => setWriteReview(true)}>
                                    Reseñar
                                </Button>
                            </div>
                        }
                        {writeReview &&
                            <form className="flex flex-col h-full gap-2">
                                <textarea className="text-lg rounded-xl p-2 w-full h-[55%] bg-white resize-none border-2 border-slate-300 overflow-y-auto scrollbar scrollbar-thumb-slate-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full active:scrollbar-thumb-primary hover:scrollbar-thumb-slate-300"
                                    placeholder="Escribe una reseña"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)} />
                                <div className="flex justify-between">
                                    <div className="Rating flex flex-row gap-2 items-center">
                                        <text>Calificacion: </text>
                                        <svg xmlns="http://www.w3.org/2000/svg" color={star1 ? "#fbbf24" : "none"} fill={star1 ? "#fbbf24" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer transition-all duration-300" onClick={() => handleStar(1)}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" color={star2 ? "#fbbf24" : "none"} fill={star2 ? "#fbbf24" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer transition-all duration-300" onClick={() => handleStar(2)}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" color={star3 ? "#fbbf24" : "none"} fill={star3 ? "#fbbf24" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer transition-all duration-300" onClick={() => handleStar(3)}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" color={star4 ? "#fbbf24" : "none"} fill={star4 ? "#fbbf24" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer transition-all duration-300" onClick={() => handleStar(4)}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" color={star5 ? "#fbbf24" : "none"} fill={star5 ? "#fbbf24" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer transition-all duration-300" onClick={() => handleStar(5)}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                        </svg>
                                    </div>
                                    <Button className="bg-primary text-xl" onPress={CreateReview}>
                                        Confirmar
                                    </Button>
                                </div>
                            </form>
                        }
                    </div>
                </div>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl" backdrop="blur" classNames={{ closeButton: "hidden" }} isDismissable={false} isKeyboardDismissDisabled={true}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-3xl">{appointments?.employee?.user?.first_name} {appointments?.employee?.user?.last_name}</ModalHeader>
                            <ModalBody>
                                <div className="flex  gap-2">
                                    <h3 className="font-semibold text-xl">Establecimiento:</h3>
                                    <h4 className="text-lg">{appointments.establisment.name}</h4>
                                </div>
                                <div className="flex  gap-2">
                                    <h3 className="font-semibold text-xl">Telefono del profesional:</h3>
                                    <h4 className="text-lg">{appointments?.employee?.phone}</h4>
                                </div>
                                <div className="flex  gap-2">
                                    <h3 className="font-semibold text-xl">Fecha:</h3>
                                    <h4 className="text-lg">{appointments.date}</h4>
                                </div>
                                <div className="flex  gap-2">
                                    <h3 className="font-semibold text-xl">Hora:</h3>
                                    <h4 className="text-lg">{horaAmigable}</h4>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h3 className="font-semibold text-xl">Servicios bridados:</h3>
                                    {appointments.services.map((service) => (
                                        <h4 key={service.id} className="text-lg">{service.name}</h4>
                                    ))}
                                </div>
                                <div className="flex  gap-2">
                                    <h3 className="font-semibold text-xl">Estado:</h3>
                                    <h4 className={`text-lg ${appointments.estate?.toLowerCase().includes("completada") ? "text-green-500" : "text-red-500"}`}>{appointments.estate}</h4>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex gap-2">
                                        <h3 className="font-semibold text-xl">Reseña:</h3>
                                        <div className="Rating flex flex-row gap-2 items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" color={star1 ? "#fbbf24" : "none"} fill={star1 ? "#fbbf24" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer transition-all duration-300" onClick={() => handleStar(1)}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" color={star2 ? "#fbbf24" : "none"} fill={star2 ? "#fbbf24" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer transition-all duration-300" onClick={() => handleStar(2)}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" color={star3 ? "#fbbf24" : "none"} fill={star3 ? "#fbbf24" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer transition-all duration-300" onClick={() => handleStar(3)}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" color={star4 ? "#fbbf24" : "none"} fill={star4 ? "#fbbf24" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer transition-all duration-300" onClick={() => handleStar(4)}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" color={star5 ? "#fbbf24" : "none"} fill={star5 ? "#fbbf24" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer transition-all duration-300" onClick={() => handleStar(5)}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <Textarea
                                        variant="bordered"
                                        labelPlacement="outside"
                                        placeholder="Enter your description"
                                        defaultValue={comment}
                                        className="w-full"
                                        size="lg"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    />
                                    {appointments.estate === "Completada" &&
                                        <div className="flex gap-2 w-full justify-end items-center">
                                            <h3 className="text-xl flex">Metodo de pago: </h3>
                                            {appointments.method.toLowerCase().includes("tarjeta") ?
                                                <div className="flex gap-2">
                                                    <h4 className="text-xl flex font-bold">Tarjeta</h4>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                                                    </svg>
                                                </div>
                                                :
                                                <div className="flex gap-2">
                                                    <h4 className="text-xl flex font-bold">Efectivo</h4>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                                                    </svg>
                                                </div>
                                            }
                                        </div>}
                                    <div className="flex gap-2 w-full justify-end items-center">
                                        <h3 className="text-xl flex">Total: </h3>
                                        <h4 className="text-2xl flex font-bold">${appointments.total_price}</h4>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" className="text-xl" variant="light" onPress={() => handleClose(onClose)}>
                                    Cerrar
                                </Button>
                                <Button color="primary" className="text-xl font-bold" onPress={() => handleSave(onClose)}>
                                    Guardar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div >
    )
}

export default ClientService
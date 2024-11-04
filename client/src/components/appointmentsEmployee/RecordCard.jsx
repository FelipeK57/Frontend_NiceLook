import { Skeleton } from "@nextui-org/skeleton";
import { useEffect, useState } from "react";
import hola from "../../assets/hola.png";
import {Tooltip} from "@nextui-org/react";
import ReviewComponent from "../global/ReviewComponent";
import moment from "moment";

function RecordCard({ clientName, service, price, time, paymentMethod, profileImage, rating }) {
    const [loadImage, setLoadImage] = useState(false);

    const formattedTime = moment(time, 'HH:mm:ss').format('hh:mm A');// Formato de 12 horas con AM/PM
    function handleLoadImage() {
        setLoadImage(true);
    }

    return (
        <div className="bg-white shadow-md rounded-xl border border-gray-200 px-4 py-4 mb-4">
            <div className="flex-col justify-between">
                <div className="flex flex-row items-center mb-4">
                    {/* Imagen de perfil */}
                    <div className="w-14 h-14 rounded-full border border-gray-400 overflow-hidden mr-4">
                        <Skeleton className="w-full h-full" isLoaded={loadImage}>
                            <img
                                onLoad={handleLoadImage}
                                src={hola}
                                className="w-full h-full object-cover"
                            />
                        </Skeleton>
                    </div>
                    <h3 className="text-2xl font-bold ">{clientName}</h3>
                </div>

                <div className="flex flex-row items-center justify-between mb-4">
                    <p>{service}</p>
                    <p className="text-right font-semibold text-xl -translate-x-2">{formattedTime}</p>

                </div>
                <div className="flex flex-row items-center justify-between mb-4">
                    <div className="flex flex-row items-center" >
                    <Tooltip content={paymentMethod}>
                        <div className="flex rounded-full mr-2">
                            {paymentMethod === "Tarjeta" ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                            </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                            </svg>
                            }
                        </div>
                    </Tooltip>
                    <p className="font-medium text-lg">${price}</p>
                    </div>
                    <div className="flex justify-end">
            <ReviewComponent
              reviews={rating}
              size="size-6"
              text="text-lg font-bold"
            />
          </div>
                </div>
            </div>

        </div>
    );
}

export default RecordCard;
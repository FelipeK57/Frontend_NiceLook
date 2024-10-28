import { Skeleton } from "@nextui-org/skeleton";
import { useEffect, useState } from "react";
import hola from "../../assets/hola.png";
import {Tooltip} from "@nextui-org/react";
import ReviewComponent from "../global/ReviewComponent";

function RecordCard({ clientName, service, price, time, paymentMethod, profileImage }) {
    const [loadImage, setLoadImage] = useState(false);
    useEffect(() => {
        console.log(loadImage);
    }, [loadImage]);

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
                    <p className="text-right font-semibold text-xl -translate-x-2">{time}</p>

                </div>
                <div className="flex flex-row items-center justify-between mb-4">
                    <div className="flex flex-row items-center" >
                    <Tooltip content="Tarjeta">
                    <div className="flex rounnded-full mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text- size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                        </svg>
                    </div>
                    </Tooltip>
                    <p className="font-medium text-lg">${price}</p>
                    </div>
                    <div className="flex justify-end">
            <ReviewComponent
              reviews="4.5"
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
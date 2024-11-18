import { Skeleton } from "@nextui-org/react"
import PropTypes from "prop-types"
import { useState } from "react"

function Service({service}) {

    Service.propTypes = {
        service: PropTypes.object,
    }

    const [imageLoad, setImageLoad] = useState(null)

    console.log(service)
    return (
        <div className="border-2 border-slate-300 p-2 shadow-xl shadow-slate-300 rounded-xl min-h-[300px] min-w-[250px] ">
            <Skeleton className="w-full h-[80%] rounded-xl" isLoaded={imageLoad}>
                <img src={`${service.image_base64}`} 
                alt="" 
                onLoad={() => setImageLoad(true)}
                className="h-full w-full object-cover rounded-xl absolute"/>
            </Skeleton>
            <div className="mt-2 flex flex-col">
                <h3 className="text-xl font-semibold text-ellipsis line-clamp-1 ">{service.name}</h3>
                <div className="flex justify-between">
                    <h4>{service.price}</h4>
                    <h4>Calificacion</h4>
                </div>
            </div>
        </div>
    )
}

export default Service
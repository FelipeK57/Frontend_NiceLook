import { Skeleton } from "@nextui-org/react";

function Coment() {
    return (
        <div className="flex flex-col gap-2 border-1 border-slate-200 p-4 rounded-xl w-full">
            <div className="flex gap-2">
                <Skeleton className="w-16 h-16 rounded-full bg-green-300">
                    <img src="" alt="" />
                </Skeleton>
                <div className="flex flex-col">
                    <h3 className="text-xl">Juan David Palacios</h3>
                    <h3 className="text-lg">@JuanchoRoña</h3>
                </div>
            </div>
            <div>
                <p>
                    Mi peluqueria favorita, desde
                    que la conoci no voy a ninguna
                    otra.
                </p>
            </div>
        </div>
    )
}

export default Coment
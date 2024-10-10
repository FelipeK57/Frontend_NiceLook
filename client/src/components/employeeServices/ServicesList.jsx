import { Select, SelectItem } from "@nextui-org/react";

function ServicesList() {
    return (
        <div>
            <article className="flex flex-col h-1/2 w-full">
                <h2 className="text-3xl text-zinc-950 font-bold pb-8">Mis servicios</h2>
                <div className="grid grid-flow-col grid-cols-[1fr_1fr] ">
                    <h1>Hola muy buenas</h1>
                    <h1>Hola muy buenas</h1>
                </div>
            </article>
            <article className="flex flex-col h-1/2 w-full">
                <div className="flex flex-row w-full py-8">
                    <h2 className="text-3xl text-zinc-950 font-bold">Servicios del establecimiento</h2>
                    <Select
                        label="Favorite Animal"
                        placeholder="Select an animal"
                        selectionMode="multiple"
                        className="max-w-xs"
                    >
                        <SelectItem value="lion">Lion</SelectItem>
                    </Select>
                </div>
            </article>
        </div>
    )
}

export default ServicesList;
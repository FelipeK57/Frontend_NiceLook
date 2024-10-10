import { Select, SelectItem } from "@nextui-org/react";
import Services from "./Services";

function ServicesList() {
    return (
        <div className="flex flex-col h-full w-full">
            <section className="flex flex-col h-1/2 w-full">
                <h2 className="text-3xl text-zinc-950 font-bold pb-8">Mis servicios</h2>
                <div className="grid grid-flow-row grid-cols-[1fr_1fr] gap-4 max-h-full overflow-y-auto pr-2
                scrollbar scrollbar-thumb-slate-200  scrollbar-thumb-rounded-full scrollbar-track-rounded-full active:scrollbar-thumb-primary hover:scrollbar-thumb-slate-300">
                    <Services />
                    <Services />
                    <Services />
                    <Services />
                    <Services />
                    <Services />
                    <Services />
                    <Services />
                </div>
            </section>
            <section className="flex flex-col h-1/2 w-full">
                <div className="flex flex-row w-full py-8 gap-4 content-center flex-wrap items-center">
                    <h2 className="text-3xl  text-zinc-950 font-bold">Servicios del establecimiento</h2>
                    <Select
                        name="category"
                        id="Category"
                        label="Seleccione la categoria"
                        placeholder="Barberia"
                        variant="bordered"
                        className="w-[20%]"
                        datatype="string"
                        defaultSelectedKeys={""}
                        onChange={""}
                        isRequired
                        isInvalid={""}
                        scrollShadowProps={{
                            isEnabled: true
                        }}
                    >
                        {/* Aqui va la lista de elementos con selectItem de nextui */}
                        <SelectItem value={'moto'}>Moto</SelectItem>
                    </Select>
                </div>
                <div className="grid grid-flow-row grid-cols-[1fr_1fr] gap-4 max-h-full overflow-y-auto pr-2
                scrollbar scrollbar-thumb-slate-200  scrollbar-thumb-rounded-full scrollbar-track-rounded-full active:scrollbar-thumb-primary hover:scrollbar-thumb-slate-300">
                    <Services isSelected/>
                    <Services isSelected/>
                    <Services isSelected/>
                    <Services isSelected/>
                    <Services isSelected/>
                    <Services isSelected/>
                    <Services isSelected/>
                    <Services isSelected/>
                </div>
            </section>
        </div>
    )
}

export default ServicesList;
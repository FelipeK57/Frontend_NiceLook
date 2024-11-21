import { Input } from "@nextui-org/input"
import { Button } from "@nextui-org/react"

function ClientPerfil() {
    return (
        <aside className=" h-full w-full flex p-4">
            <div className=" flex flex-col border-2 border-slate-300 w-full rounded-3xl h-fit pb-8">
                <form action="" className="px-2 flex flex-col gap-4">
                    <h2 className="text-2xl font-bold p-4">Datos personales</h2>
                    <div>
                        <label className="text-xl font-semibold">Nombres:</label>
                        <Input variant="bordered" className="w-3/4 mx-auto border-2 border-slate-400 rounded-xl" />
                    </div>
                    <div>
                        <label className="text-xl font-semibold">Apellidos:</label>
                        <Input variant="bordered" className="w-3/4 mx-auto border-2 border-slate-400 rounded-xl" />
                    </div>
                    <div>
                        <label className="text-xl font-semibold">Correo electronico:</label>
                        <Input variant="bordered" readOnly className="w-3/4 mx-auto border-2 border-slate-400 rounded-xl pointer-events-none" />
                    </div>
                    <div>
                        <label className="text-xl font-semibold">Telefono:</label>
                        <Input variant="bordered" className="w-3/4 mx-auto border-2 border-slate-400 rounded-xl" />
                    </div>
                    <div className="w-full flex justify-center mt-4">
                        <Button variant="bordered" className="w-3/4  border-2 border-slate-400 rounded-xl">Guardar</Button>
                    </div>
                </form>
            </div>
        </aside>
    )
}

export default ClientPerfil
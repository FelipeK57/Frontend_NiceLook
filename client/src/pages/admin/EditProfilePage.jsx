import EditButton from "../../components/global/EditButton"; // Componente para el botón de editar
import ContactButton from "../../components/global/ContactButton"; // Componente para los botones de contacto
import ButtonCustom from "../../components/global/ButtonCustom";
import { Input, link, Modal } from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react";
import GestModal from "../../components/edit/GestModal";
import InfoPopover from "../../components/edit/InfoPopover";



const EstablishmentProfile = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleOpen = () => {
        onOpen();
        console.log("hola");
    }




    return (
        <div className="px-8 pt-3">
            {/* Contenedor principal */}
            <div >

                <div className="flex m-4">
                    <h1 className="text-4xl font- font-bold text-gray-800">Edita el perfil del establecimiento</h1>
                </div>
                {/* Sección de edición del banner */}
                <div className="relative w-full h-[30rem] bg-gray-50 rounded-md border-2 border-slate-200">
                    <img src="/path-to-banner.jpg" alt="Banner" className="w-full h-full object-cover rounded-md" />
                    <EditButton position="absolute right-4 top-4" /> {/* Botón de editar */}
                </div>

                {/* Sección del logo y nombre */}
                <div className="flex -translate-y-20 items-center ml-6 mt-6 justify-between">
                    <div className="flex items-center">
                        <div className="relative w-48 h-48 bg-gray-100 rounded-md border-2 border-slate-200 overflow-hidden shadow-sm">
                            <img src="/path-to-logo.jpg" alt="Logo" className="w-full h-full object-cover" />
                            <EditButton position="absolute right-2 bottom-2" />
                        </div>

                        <div className="ml-6 mt-32">
                        <Input
                            placeholder="Nombre de establecimiento"
                            variant="bordered"
                            classNames={{
                                label: "",
                                input: ["text-3xl font-bold text-gray-800"],
                                innerWrapper: "",
                                inputWrapper: [

                                    "border-2",
                                    "border-slate-200",
                                    "px-8",
                                    "py-8",
                                ],
                            }}
                        />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <div className=" items-center mt-16">
                            <span className="text-3xl font-bold">4.5/5</span>
                            <span className="text-3xl ml-2 text-gray-500">(112)</span>
                        </div>
                    </div>

                </div>

                {/* Sección de dirección */}
                <div className="flex items-center justify-between -translate-y-16 ml-6">
                    <div className="relative w-1/3">
                        <Input type="text" label="Ciudad, Departamento" classNames={{ inputWrapper: "bg-transparent border-2 border-slate-200 rounded-xl w-full" }} />
                        <Input type="text" label="Dirreción de establecimiento" classNames={{ inputWrapper: "bg-transparent border-2 border-slate-200 rounded-xl w-full mt-2" }} />
                    </div>
                    <div className="flex flex-col justify-end">
                        <h1 className="flex justify-end text-3xl font-bold text-gray-800">Contacto</h1>
                        <div className="flex justify-end items-center mt-4 space-x-4">
                        <InfoPopover icon="mail" placement={"top"} isIconOnly className="border-2 border-slate-200 rounded-full p-2 " variant="bordered"
                                redirectTo={"https://www.google.com/search?gs_ssp=eJzj4tLP1TfIyK1MKy5TYDRgdGDw4khLTE5Nys_PBgBmYAfL&client=opera-gx&q=facebook&sourceid=opera&ie=UTF-8&oe=UTF-8"}>
                            </InfoPopover>
                            <InfoPopover icon="instagram" placement={"top"} isIconOnly className="border-2 border-slate-200 rounded-full p-2 " variant="bordered"
                                redirectTo={"https://www.google.com/search?gs_ssp=eJzj4tLP1TfIyK1MKy5TYDRgdGDw4khLTE5Nys_PBgBmYAfL&client=opera-gx&q=facebook&sourceid=opera&ie=UTF-8&oe=UTF-8"}>
                            </InfoPopover>
                            <InfoPopover icon="whatsapp" placement={"top"} isIconOnly className="border-2 border-slate-200 rounded-full p-2 " variant="bordered"
                                redirectTo={"https://www.google.com/search?gs_ssp=eJzj4tLP1TfIyK1MKy5TYDRgdGDw4khLTE5Nys_PBgBmYAfL&client=opera-gx&q=facebook&sourceid=opera&ie=UTF-8&oe=UTF-8"}>
                            </InfoPopover>
                            <InfoPopover icon="facebook" placement={"top"} isIconOnly className="border-2 border-slate-200 rounded-full p-2 " variant="bordered"
                                redirectTo={"https://www.google.com/search?gs_ssp=eJzj4tLP1TfIyK1MKy5TYDRgdGDw4khLTE5Nys_PBgBmYAfL&client=opera-gx&q=facebook&sourceid=opera&ie=UTF-8&oe=UTF-8"}>
                            </InfoPopover>
                            <ContactButton type="button" icon="more" onClick={handleOpen} />
                        </div>
                    </div>
                </div>
                {/* Botón de guardar cambios */}
                <div className="flex  justify-center">
                    <ButtonCustom name="Guardar cambios" classStyles={"w-60 text-lg"} primary />
                </div>

            </div>
            <GestModal isOpen={isOpen} backdrop={"blur"} onClose={onClose} />
        </div>
    );
};

export default EstablishmentProfile;

import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Switch } from "@nextui-org/react";

function createEmployeeModal(props) {
    return (
        <Modal {...props} size="2xl">
            <ModalContent>
                {(onClose) => (<>
                    <ModalHeader className="flex flex-col gap-1">
                        <h2 className="text-4xl text-zinc-950 font-bold">Crear Empleado</h2>
                    </ModalHeader>
                    <ModalBody>
                        <form className="flex flex-col gap-8">
                            <div className="flex flex-col gap-2">
                                <label className="font-bold" htmlFor="name">Nombre</label>
                                <Input
                                    name="name"
                                    id="name"
                                    type="text"
                                    placeholder="Nombre del empleado"
                                    variant="bordered"
                                    classNames={{
                                        label: "",
                                        input: [],
                                        innerWrapper: "",
                                        inputWrapper: [
                                            "border-2",
                                            "border-slate-200",
                                            "px-6",
                                            "py-5",
                                        ],
                                    }} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div >
                                    <label className="font-bold" htmlFor="phone">Telefono</label>
                                    <Input
                                        name="phone"
                                        id="phone"
                                        type="number"
                                        placeholder="Numero telefonico"
                                        variant="bordered"
                                        inputMode="none"
                                        classNames={{
                                            label: "",
                                            input: [],
                                            innerWrapper: "",
                                            inputWrapper: [
                                                "border-2",
                                                "border-slate-200",
                                                "px-6",
                                                "py-5",
                                            ],
                                        }} />
                                </div>
                                <div>
                                    <label className="font-bold" htmlFor="email">Correo</label>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Correo electronico"
                                        variant="bordered"
                                        classNames={{
                                            label: "",
                                            input: [],
                                            innerWrapper: "",
                                            inputWrapper: [
                                                "border-2",
                                                "border-slate-200",
                                                "px-6",
                                                "py-5",
                                            ],
                                        }} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="font-bold" htmlFor="service">Servicios que ofrece</label>
                                    <Select
                                        name="service"
                                        id="service"
                                        label="Servicios del local"
                                        placeholder="Seleccione los servicios"
                                        selectionMode="multiple"
                                        variant="bordered"
                                        className="max-w-xs"
                                    >
                                        {/* Aqui va la lista de elementos con selectItem de nextui */}
                                        <SelectItem value="1">Barberia</SelectItem>
                                        <SelectItem value="2">Lachista</SelectItem>
                                        <SelectItem value="3">Tintoreria</SelectItem>
                                    </Select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-bold" htmlFor="estado">Estado</label>
                                    <Switch defaultSelected color="success" size="lg"></Switch>
                                </div>
                            </div>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button type="submit" color="primary" onPress={onClose}>
                                    Guardar
                                </Button>
                            </ModalFooter>
                        </form>
                    </ModalBody>

                </>)}
            </ModalContent>
        </Modal>
    );
}

export default createEmployeeModal;
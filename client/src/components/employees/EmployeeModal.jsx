import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Switch } from "@nextui-org/react";
import ButtonCustom from "../global/ButtonCustom";
import EmployeeReviewsList from "./EmployeeReviewsList";

function createEmployeeModal(props) {
    return (
        <Modal {...props} size="2xl"
            classNames={
                props.employeeReviews ? {
                    base: "1/2lg:w-[75%] h-full overflow-y-auto sm:overflow-y-hidden  !my-0 !mr-0 !ml-0 1/2lg:ml-2 rounded-r-none sm:rounded-l-lg rounded-l-3xl sm:rounded-bl-xl",
                    wrapper: "!justify-end",
                    backdrop: "1/2lg:w-[75%] h-full flex justify-self-end ",
                }
                    :
                    {
                        base: "rounded-b-none sm:rounded-xl !m-0 sm:!m-1",
                        wrapper: "1/2lg:w-[75%] h-full flex justify-self-end ",
                        backdrop: "1/2lg:w-[75%] h-full flex justify-self-end ",
                    }}
            motionProps={
                props.employeeReviews ? {
                    variants: {
                        enter: {
                            x: 0,
                            opacity: 1,
                            transition: {
                                duration: 0.3,
                                ease: "easeOut",
                            },
                        },
                        exit: {
                            x: 40,
                            opacity: 0,
                            transition: {
                                duration: 0.3,
                                ease: "easeIn",
                            },
                        },
                    }
                } : null
            }
        >
            <ModalContent>
                {(onClose) => (<>
                    <ModalHeader className="flex flex-col gap-1">
                        <h2 className="text-2xl sm:text-4xl text-zinc-950 font-bold">{props.employeeReviews ? "Visualizar empleado" : "Crear empleado"}</h2>
                        {props.employeeReviews && <h3 className="text-zinc-500 text-base">Puede editar los campos</h3>}
                    </ModalHeader>
                    <ModalBody>
                        <form className="flex flex-col gap-6 sm:gap-8">
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
                            <div className={`grid gap-4 ${props.employeeReviews ? "grid-cols-2" : "grid-cols-1"}`}>
                                <div className={`flex flex-col ${props.employeeReviews ? "w-full" : null}`}>
                                    <label className="font-bold" htmlFor="service">Servicios que ofrece</label>
                                    <Select
                                        name="service"
                                        id="service"
                                        label="Servicios del local"
                                        placeholder="Seleccione los servicios"
                                        selectionMode="multiple"
                                        variant="bordered"
                                        className="w-full"
                                    >
                                        {/* Aqui va la lista de elementos con selectItem de nextui */}
                                        <SelectItem value="1">Barberia</SelectItem>
                                        <SelectItem value="2">Lachista</SelectItem>
                                        <SelectItem value="3">Tintoreria</SelectItem>
                                    </Select>
                                </div>
                                <div className={`flex-col gap-2 ${props.employeeReviews ? "flex" : "hidden"}`}>
                                    <label className="font-bold" htmlFor="estado">Estado</label>
                                    <Switch defaultSelected color="success" size="lg"></Switch>
                                </div>
                            </div>
                            {props.employeeReviews ? (<EmployeeReviewsList />) : null}
                            <ModalFooter className={ props.employeeReviews ? " !py-2 sm:py-4" : "py-4"}>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <ButtonCustom primary name="Guardar" type="submit" classStyles={"px-[5%]"} />
                            </ModalFooter>
                        </form>
                    </ModalBody>

                </>)}
            </ModalContent>
        </Modal>
    );
}

export default createEmployeeModal;
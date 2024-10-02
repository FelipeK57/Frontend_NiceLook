import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Switch } from "@nextui-org/react";
import ButtonCustom from "../global/ButtonCustom";
import EmployeeReviewsList from "./EmployeeReviewsList";
import { useForm } from 'react-hook-form'
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { createEmployee } from "../../api/employee/employee";

function CreateEmployeeModal(props) {

    CreateEmployeeModal.propTypes = {
        employee: PropTypes.object,
        user: PropTypes.object
    }

    const { register, handleSubmit, formState: { errors }, formState, setValue } = useForm();
    const [selectValue, setSelectValue] = useState("");

    const especialtyList = [
        { key: 1, value: "Barberia" },
        { key: 2, value: "SPA" },
        { key: 3, value: "SPA de uñas" },
        { key: 4, value: "Peluqueria" },
        { key: 5, value: "Lachistas" },
        { key: 6, value: "Maquillaje" },
        { key: 7, value: "Estetica Corporal" },
    ];

    const onSubmit = handleSubmit(async data => {
        await createEmployee(data)
    })

    useEffect(() => {
        function employeeForm() {
            if (props.employee) {
                setValue("first_name", props.user.first_name)
                setValue("last_name", props.user.last_name)
                setValue("phone", props.employee.phone)
                setValue("email", props.user.email)
                setValue("state", props.employee.state)
                switch (props.employee.especialty) {
                    case "Barberia":
                        setSelectValue("1")
                        break
                    case "SPA":
                        setSelectValue("2")
                        break
                    case "SPA de uñas":
                        setSelectValue("3")
                        break
                    case "Peluqueria":
                        setSelectValue("4")
                        break
                    case "Lachistas":
                        setSelectValue("5")
                        break
                    case "Maquillaje":
                        setSelectValue("6")
                        break
                    case "Estetica Corporal":
                        setSelectValue("7")
                        break
                    default:
                        break
                }
                setValue("especialty", selectValue)
            }
        }

        employeeForm()
    }, [])

    return (
        <Modal {...props} size="2xl"
            classNames={
                props.employee ? {
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
                props.employee ? {
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
                        <h2 className="text-2xl sm:text-4xl text-zinc-950 font-bold">{props.employee ? "Visualizar empleado" : "Crear empleado"}</h2>
                        {props.employee && <h3 className="text-zinc-500 text-base">Puede editar los campos</h3>}
                    </ModalHeader>
                    <ModalBody>
                        <form className="flex flex-col gap-6 sm:gap-8" onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-2">
                                <label className="font-bold" htmlFor="first_name">Nombre</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <Input {...register('first_name', { required: true })}
                                        name="first_name"
                                        errorMessage="Por favor ingrese un nombre"
                                        id="first_name"
                                        type="text"
                                        placeholder="Nombres"
                                        variant="bordered"
                                        isInvalid={errors.first_name}
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
                                    <Input {...register('last_name', { required: true })}
                                        name="last_name"
                                        errorMessage="Por favor ingrese un apellido"
                                        id="last_name"
                                        isInvalid={errors.last_name}
                                        type="text"
                                        placeholder="Apellidos"
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
                                {/*<input {...register("first_name", { required: true })}
                                    type="text"
                                    id="first_name"
                                    name="first_name"
                                    placeholder="Nombre del empleado"
                                    className="p-2 border-2 border-slate-200 bg-transparent rounded-xl text-md hover:border-slate-400 transition-all duration-300" />*/}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div >
                                    <label className="font-bold" htmlFor="phone">Telefono</label>
                                    <Input {...register('phone', { required: true })}
                                        name="phone"
                                        errorMessage="Por favor ingrese un numero telefonico"
                                        id="phone"
                                        type="number"
                                        placeholder="Numero telefonico"
                                        variant="bordered"
                                        inputMode="none"
                                        isInvalid={errors.phone}
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
                                    <Input {...register('email', { required: true })}
                                        name="email"
                                        errorMessage="Por favor ingrese un correo valido"
                                        id="email"
                                        type="email"
                                        placeholder="Correo electronico"
                                        isInvalid={errors.email}
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
                            <div className={`grid gap-4 ${props.employee ? "grid-cols-2" : "grid-cols-1"}`}>
                                <div className={`flex flex-col ${props.employee ? "w-full" : null}`}>
                                    <label className="font-bold" htmlFor="especialty">Especialidad</label>
                                    <Select {...register('especialty', { required: true })}
                                        name="especialty"
                                        id="especialty"
                                        label="Especialidad"
                                        placeholder="Seleccione la categoria del empleado"
                                        variant="bordered"
                                        className="w-full"
                                        datatype="string"
                                        selectedKeys={selectValue}
                                        onSelectionChange={setSelectValue}
                                        isRequired
                                        isInvalid={errors.especialty ? true : false}
                                    >
                                        {/* Aqui va la lista de elementos con selectItem de nextui */}
                                        {especialtyList.map((especialty) => (
                                            <SelectItem key={especialty.key} value={especialty.value}>{especialty.value}</SelectItem>
                                        ))}
                                    </Select>
                                </div>
                                <div className={`flex-col gap-2 ${props.employee ? "flex" : "hidden"}`}>
                                    <label className="font-bold" htmlFor="state">Estado</label>
                                    <Switch {...register('state', { required: true })}
                                        name="state"
                                        id="state"
                                        color="success"
                                        size="lg" />
                                </div>
                            </div>
                            {props.employee ? (<EmployeeReviewsList />) : null}
                            <ModalFooter className={props.employee ? " !py-2 sm:py-4" : "py-4"}>
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

export default CreateEmployeeModal;
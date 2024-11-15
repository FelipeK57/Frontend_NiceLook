import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Switch } from "@nextui-org/react";
import ButtonCustom from "../global/ButtonCustom";
import EmployeeReviewsList from "./EmployeeReviewsList";
import { useForm } from 'react-hook-form'
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { createEmployee, getCategories, updateEmployee } from "@/api/employee/employee";
import Cookies from "js-cookie";

// const categories = [
//     {
//         id: 1,
//         name: "Barberia",
//     },
//     {
//         id: 2,
//         name: "SPA de uñas",
//     },
//     {
//         id: 3,
//         name: "SPA",
//     },
//     {
//         id: 4,
//         name: "Peluqueria",
//     },
//     {
//         id: 5,
//         name: "Maquillaje",
//     },
//     {
//         id: 6,
//         name: "Tatuajes"
//     }
// ];

function CreateEmployeeModal(props) {
    CreateEmployeeModal.propTypes = {
        employee: PropTypes.object,
        user: PropTypes.object,
        onClose: PropTypes.func,
        loadEmployees: PropTypes.func,
        listRef: PropTypes.object,
        reloadList: PropTypes.func
    }

    const { formState: { errors } } = useForm();
    const [categorys, setCategorys] = useState([]);
    const [employeeFirstName, setEmployeeFirstName] = useState();
    const [employeeLastName, setEmployeeLastName] = useState();
    const [employeePhone, setEmployeePhone] = useState();
    const [employeeEmail, setEmployeeEmail] = useState();
    const [employeeSpecialty, setEmployeeSpecialty] = useState();
    const [employeeStatus, setEmployeeStatus] = useState(true);
    const [employeeCode, setEmployeeCode] = useState();
    const employeeSpecialtyConverted = [];

    function onSubmit() {
        setIsChanged(true);
        if (!props.employee) {
            const establishmentId = Cookies.get("establishmentId");
            try {
                employeeSpecialtyConverted.push(parseInt(employeeSpecialty.target.value))
                console.log(employeeSpecialtyConverted)
                console.log(`employeeFirstName = ${employeeFirstName}`, `employeeLastName = ${employeeLastName}`, `employeePhone = ${employeePhone}`, `employeeEmail = ${employeeEmail}`, `employeeSpecialty = ${employeeSpecialtyConverted}`)
                createEmployee(establishmentId, employeeFirstName, employeeLastName, employeePhone, employeeEmail, employeeSpecialtyConverted).then(() => {
                    [props.onClose(), props.listRef.current.loadEmployees()];
                });
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                console.log(employeeSpecialtyConverted)
                updateEmployee(employeeCode, employeeFirstName, employeeLastName, employeePhone, employeeEmail, employeeStatus).then(() => {
                    props.onClose();
                    props.reloadList()
                })
            } catch (error) {
                setIsChanged(true);
                console.log(error)
            }
        }
    }

    useEffect(() => {

        const loadEmployee = async () => {
            if (props.employee) {
                setEmployeeFirstName(props.user.first_name);
                setEmployeeLastName(props.user.last_name);
                setEmployeePhone(props.employee.phone.replace('+57', ''));
                setEmployeeEmail(props.user.email);
                setEmployeeStatus(props.employee.state);
                const idSpecialty = props.employee.especialty[0];
                setEmployeeSpecialty(idSpecialty);
                setEmployeeCode(props.employee.id);
            }
        }

        const loadCategorys = async () => {
            const promise = new Promise((resolve, reject) => {
                const response = getCategories();
                setTimeout(() => {
                    // si todo va bien, se llama a resolve
                    resolve(response);
                    reject("Ocurrio un error");
                }, 0);
            });
            promise.then((resultado) => {
                setCategorys(resultado.data);
                console.log(resultado.data);
            });
            promise.catch((error) => {
                console.log(error);
            });
            return (promise);
        }
        loadCategorys();
        loadEmployee();

        //console.log(employeeSpecialty)
        //const employeeCategory = categorys.filter((category) => category.id === employeeSpecialty)
        //console.log(employeeCategory);
        //setEmployeeSpecialty(employeeCategory[0]?.name);
        ;
        //console.log(props.employee);
    }, [props.employee, props.user]);

    //aqui funcionaconsole.log(employeeSpecialty)

    useEffect(() => {
        const timer = setTimeout(() => {
            if (employeeSpecialty) {
                const employeeCategory = categorys.filter((category) => category.id === employeeSpecialty)
                setEmployeeSpecialty(employeeCategory[0]?.id);

            }
        }, 500)

        return () => clearTimeout(timer);
    }, [categorys])

    const [validName, setValidName] = useState(false);
    const [validLastName, setValidLastName] = useState(false);
    const [validPhone, setValidPhone] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [validSpecialty, setValidSpecialty] = useState(false);
    const [ischanged, setIsChanged] = useState(false);

    useEffect(() => {
        console.log(employeeFirstName, ischanged)
        if (ischanged) {
            if (employeeFirstName !== "" && employeeFirstName !== undefined) {
                setValidName(false);
            } else {
                setValidName(true);
            }
            if(employeeLastName !== "" && employeeLastName !== undefined){
                setValidLastName(false);
            } else {
                setValidLastName(true);
            }
            if(employeePhone !== "" && employeePhone !== undefined && employeePhone.length === 10){
                setValidPhone(false);
            } else {
                setValidPhone(true);
            }
            if(employeeEmail !== "" && employeeEmail !== undefined && employeeEmail.includes("@") && employeeEmail.includes(".")){
                setValidEmail(false);
            } else {
                setValidEmail(true);
            }
            if(employeeSpecialty !== "" && employeeSpecialty !== undefined){
                setValidSpecialty(false);
            } else {
                setValidSpecialty(true);
            }
        } else {
            setIsChanged(false);
            setValidName(false);
            setValidLastName(false);
            setValidPhone(false);
        }
    }, [employeeFirstName, ischanged , employeeLastName, employeePhone, employeeEmail, employeeSpecialty]);

    const handleClose = () => {
        setIsChanged(false);
        props.onClose();
    }

    const handlePhone = (e) => {
        if(e.target.value.length === 10){
            setEmployeePhone(e.target.value)
        } else{
            setEmployeePhone(undefined)
        }
    }

    const handleEmail = (e) => {
        if(e.target.value.includes("@") && e.target.value.includes(".")){
            setEmployeeEmail(e.target.value)
        } else{
            setEmployeeEmail(undefined)
        }
    }

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
                        <form className="flex flex-col gap-6 sm:gap-8">
                            <div className="flex flex-col gap-2">
                                <label className="font-bold" htmlFor="name">Nombre</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        name="name"
                                        errorMessage="Por favor ingrese un nombre"
                                        id="name"
                                        type="text"
                                        placeholder="Nombres"
                                        variant="bordered"
                                        isInvalid={validName}
                                        value={employeeFirstName}
                                        onChange={(e) => setEmployeeFirstName(e.target.value)}
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
                                    <Input
                                        name="last_name"
                                        errorMessage="Por favor ingrese un apellido"
                                        id="last_name"
                                        isInvalid={validLastName}
                                        type="text"
                                        placeholder="Apellidos"
                                        variant="bordered"
                                        value={employeeLastName}
                                        onChange={(e) => setEmployeeLastName(e.target.value)}
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
                                    <Input
                                        name="phone"
                                        errorMessage="Por favor ingrese un numero telefonico valido"
                                        id="phone"
                                        type="number"
                                        placeholder="Numero telefonico"
                                        variant="bordered"
                                        inputMode="numeric"
                                        isInvalid={validPhone}
                                        value={employeePhone}
                                        onChange={(e) => handlePhone(e)}
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
                                        name="email"
                                        errorMessage="Por favor ingrese un correo valido"
                                        id="email"
                                        type="email"
                                        placeholder="Correo electronico"
                                        isInvalid={validEmail}
                                        variant="bordered"
                                        value={employeeEmail}
                                        onChange={(e) => handleEmail(e)}
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
                                    <Select {...props.employee && { isDisabled: true }}
                                        name="especialty"
                                        id="especialty"
                                        label="Especialidad"
                                        placeholder="Seleccione la categoria del empleado"
                                        variant="bordered"
                                        className="w-full"
                                        datatype="string"
                                        defaultSelectedKeys={`${employeeSpecialty}`}
                                        onChange={setEmployeeSpecialty}
                                        isRequired
                                        isInvalid={validSpecialty}
                                        scrollShadowProps={{
                                            isEnabled: true
                                        }}
                                    >
                                        {/* Aqui va la lista de elementos con selectItem de nextui */}
                                        {categorys.map((category) => (
                                            <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                                        ))}
                                    </Select>
                                </div>
                                <div className={`flex-col gap-2 ${props.employee ? "flex" : "hidden"}`}>
                                    <label className="font-bold" htmlFor="state">Estado</label>
                                    <Switch
                                        name="state"
                                        isSelected={employeeStatus}
                                        onValueChange={setEmployeeStatus}
                                        id="state"
                                        color="success"
                                        size="lg" />
                                </div>
                            </div>
                            {props.employee ? (<EmployeeReviewsList />) : null}
                            <ModalFooter className={props.employee ? " !py-2 sm:py-4" : "py-4"}>
                                <Button color="danger" variant="light" onPress={handleClose}>
                                    Cancelar
                                </Button>
                                <ButtonCustom primary name="Guardar" classStyles={"px-[5%]"} onPress={onSubmit} />
                            </ModalFooter>
                        </form>
                    </ModalBody>

                </>)}
            </ModalContent>
        </Modal>
    );
}

export default CreateEmployeeModal;
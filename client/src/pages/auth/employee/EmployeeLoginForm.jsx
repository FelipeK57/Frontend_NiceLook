import { EyeFilledIcon } from "@/assets/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/assets/EyeSlashFilledIcon";
import ButtonCustom from "../../../components/global/ButtonCustom";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@nextui-org/input";
import PropTypes from "prop-types";
import { useState } from "react";

function EmployeeLoginForm(props) {

    EmployeeLoginForm.propTypes = {
        isVisible: PropTypes.bool,
        setIsVisible: PropTypes.func,
        isRegister: PropTypes.bool,
        setIsRegister: PropTypes.func,
        loading: PropTypes.bool,
        isCode: PropTypes.bool,
        setIsCode: PropTypes.func,
        codeValid: PropTypes.bool,
        setCodeValid: PropTypes.func
    }

    const handleLoginAgain = () => {
        props.setIsRegister(false);
        props.setIsCode(false);
        props.setCodeValid(false);
    }


    const [isVisible, setIsVisible] = useState(false)
    const [isVisible2, setIsVisible2] = useState(false)
    const toggleVisibility = () => setIsVisible(!isVisible);
    const toggleVisibility2 = () => setIsVisible2(!isVisible2);

    return (
        <AnimatePresence mode="wait">
            {!props.isRegister ?
                <motion.div key={"login"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    exit={{ opacity: 0 }}
                    className="hola h-[45%] flex flex-col"
                >
                    <form
                        className="flex flex-col justify-center items-center gap-4 mt-4 mx-24 h-full">
                        <Input
                            size="sm"
                            className="w-full"
                            type="email"
                            label="correo"
                            // placeholder="Ingrese sus nombres"
                            onChange={(e) => `${e}`}
                            // defaultValue={formData.name}
                            required
                            variant="faded"
                        />
                        <Input
                            className="w-full"
                            size="sm"
                            type={isVisible ? "text" : "password"}
                            label="Contraseña"
                            // placeholder="Repita la contraseña"
                            // onChange={(e) => {
                            //     setConfirmPassword(e.target.value);
                            //     setConfirmPasswordTouched(true);
                            // }}
                            // value={confirmPassword}
                            // color={
                            //     confirmPasswordTouched && !passwordsMatch
                            //         ? "danger"
                            //         : passwordTouched
                            //             ? passwordStrength
                            //             : "default"
                            // }
                            required
                            variant="faded"
                            // isInvalid={
                            //     passwordTouched && confirmPasswordTouched && !passwordsMatch
                            // }
                            errorMessage="Las contraseñas no coinciden"
                            endContent={
                                <button
                                    className="focus:outline-none"
                                    type="button"
                                    onClick={toggleVisibility}
                                    aria-label="toggle password visibility"
                                >
                                    {isVisible ? (
                                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                    ) : (
                                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                    )}
                                </button>
                            }
                        />
                        <ButtonCustom classStyles={"w-full"}
                            type="submit"
                            name="Entrar"
                            primary

                            // isDisabled={
                            //     !formData.name ||
                            //     !formData.lastname ||
                            //     !formData.email ||
                            //     !formData.password ||
                            //     !confirmPassword ||
                            //     !passwordsMatch ||
                            //     passwordStrength != "success" ||
                            //     isEmailInvalid
                            // }
                            isLoading={props.loading}
                        />
                    </form>
                </motion.div>
                :
                (!props.isCode && props.isRegister ?
                    <motion.div key={"email"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-[70%] flex flex-col justify-center"
                    >
                        <form
                            className="flex flex-col justify-center items-center mx-32 h-[80%] gap-4">
                            <p className="text-xg mb-6">Ingrese el correo electronico de la cuenta en cuestion</p>
                            <Input
                                size="sm"
                                className="w-full"
                                type="email"
                                label="correo"
                                // placeholder="Ingrese sus nombres"
                                onChange={(e) => `${e}`}
                                // defaultValue={formData.name}
                                required
                                variant="faded"
                            />
                            <ButtonCustom
                                onPress={() => props.setIsCode(true)}
                                classStyles={"w-full"}
                                type="submit"
                                name="Entrar"
                                primary
                            />
                        </form>
                    </motion.div>
                    :
                    (!props.codeValid && props.isCode ?
                        <motion.div key={"code"}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="h-[70%] flex flex-col justify-center"
                        >
                            <form
                                className="flex flex-col justify-center items-center mx-32 h-[80%] gap-4">
                                <p className="text-xg mb-6">Por favor ingrese el codigo enviado a su correo</p>
                                <Input
                                    size="sm"
                                    className="w-full"
                                    type="text"
                                    label="Codigo"
                                    // placeholder="Ingrese sus nombres"
                                    onChange={(e) => `${e}`}
                                    // defaultValue={formData.name}
                                    required
                                    variant="faded"
                                />
                                <ButtonCustom
                                    onPress={() => props.setCodeValid(true)}
                                    classStyles={"w-full"}
                                    type="submit"
                                    name="Entrar"
                                    primary
                                />
                            </form>
                        </motion.div> :
                        (
                            props.codeValid &&
                            <motion.div key={"password"}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="h-[70%] flex flex-col justify-center">
                                <form
                                    className="flex flex-col justify-center items-center mx-32 h-[80%] gap-4">
                                    <p className="text-xg mb-6">Ingrese su nueva contraseña</p>
                                    <Input
                                        className="w-full"
                                        size="sm"
                                        type={isVisible ? "text" : "password"}
                                        label="Contraseña"
                                        // placeholder="Repita la contraseña"
                                        // onChange={(e) => {
                                        //     setConfirmPassword(e.target.value);
                                        //     setConfirmPasswordTouched(true);
                                        // }}
                                        // value={confirmPassword}
                                        // color={
                                        //     confirmPasswordTouched && !passwordsMatch
                                        //         ? "danger"
                                        //         : passwordTouched
                                        //             ? passwordStrength
                                        //             : "default"
                                        // }
                                        required
                                        variant="faded"
                                        // isInvalid={
                                        //     passwordTouched && confirmPasswordTouched && !passwordsMatch
                                        // }
                                        // errorMessage="Las contraseñas no coinciden"
                                        endContent={
                                            <button
                                                className="focus:outline-none"
                                                type="button"
                                                onClick={toggleVisibility}
                                                aria-label="toggle password visibility"
                                            >
                                                {isVisible ? (
                                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                ) : (
                                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                )}
                                            </button>
                                        }
                                    />
                                    <Input
                                        className="w-full"
                                        size="sm"
                                        type={isVisible2 ? "text" : "password"}
                                        label="Confirmar contraseña"
                                        // placeholder="Repita la contraseña"
                                        // onChange={(e) => {
                                        //     setConfirmPassword(e.target.value);
                                        //     setConfirmPasswordTouched(true);
                                        // }}
                                        // value={confirmPassword}
                                        // color={
                                        //     confirmPasswordTouched && !passwordsMatch
                                        //         ? "danger"
                                        //         : passwordTouched
                                        //             ? passwordStrength
                                        //             : "default"
                                        // }
                                        required
                                        variant="faded"
                                        // isInvalid={
                                        //     passwordTouched && confirmPasswordTouched && !passwordsMatch
                                        // }
                                        // errorMessage="Las contraseñas no coinciden"
                                        endContent={
                                            <button
                                                className="focus:outline-none"
                                                type="button"
                                                onClick={toggleVisibility2}
                                                aria-label="toggle password visibility"
                                            >
                                                {isVisible2 ? (
                                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                ) : (
                                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                )}
                                            </button>
                                        }
                                    />
                                    <ButtonCustom
                                        onPress={handleLoginAgain}
                                        classStyles={"w-full"}
                                        type="submit"
                                        name="Entrar"
                                        primary
                                    />
                                </form>
                            </motion.div>
                        )
                    )
                )
            }
        </AnimatePresence>
    )
}

export default EmployeeLoginForm
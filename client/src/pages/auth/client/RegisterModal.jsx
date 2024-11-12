import ButtonCustom from "@/components/global/ButtonCustom";
import InputCustom from "@/components/global/InputCustom";
import LogoNiceLook from "@/components/ui/LogoNiceLook";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";

function RegisterModal({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    name: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleRegister = () => {
    const newErrors = {
      name: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
    };

    if (!name) {
      newErrors.name = "El nombre es requerido";
    }

    if (!lastName) {
      newErrors.lastName = "El apellido es requerido";
    }

    if (!email) {
      newErrors.email = "El correo es requerido";
    }

    if (!email.includes("@")) {
      newErrors.email = "El correo no es valido: debe contener un @";
    }

    if (!password) {
      newErrors.password = "La contraseña es requerida";
    }

    if (password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    setError(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    console.log(name, lastName, phone, email, password);

    setName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setPassword("");
    setError({
      name: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
    });
  };

  const handleClose = () => {
    setName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setPassword("");
    setError({
      name: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
    });
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        backdrop="blur"
        onClose={onClose}
        placement="top"
        size="md"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold">
              Registrate en <LogoNiceLook />
            </h1>
          </ModalHeader>
          <ModalBody className="flex flex-col justify-center items-center gap-4">
            <GoogleLogin />
            <div className="w-full flex flex-row items-center gap-2">
              <hr className="border-1 w-full border-slate-200" />
              <p className="text-center text-sm font-light min-w-max text-slate-400">
                o registrate con tu correo
              </p>
              <hr className="border-1 w-full border-slate-200" />
            </div>
            <div className="flex flex-row gap-2 w-full">
              <InputCustom
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                label={"Nombre"}
                placeholder={"Nombre"}
                type={"text"}
                errorMessage={error.name}
                isInvalid={!!error.name}
              />
              <InputCustom
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                label={"Apellido"}
                placeholder={"Apellido"}
                type={"text"}
                errorMessage={error.lastName}
                isInvalid={!!error.lastName}
              />
            </div>
            <InputCustom
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              label={"Número de telefono"}
              placeholder={"Telefono"}
              type={"number"}
            />
            <InputCustom
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              label={"Correo electronico"}
              placeholder={"Correo electronico"}
              type={"email"}
              errorMessage={error.email}
              isInvalid={!!error.email}
            />
            <InputCustom
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              label={"Contraseña"}
              placeholder={"Contraseña"}
              type={"password"}
              errorMessage={error.password}
              isInvalid={!!error.password}
            />
          </ModalBody>
          <ModalFooter>
            <Button onPress={handleClose} variant="light" color="danger">
              Cerrar
            </Button>
            <ButtonCustom action={handleRegister} primary name={"Registrar"} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default RegisterModal;

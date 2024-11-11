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
import { set } from "react-hook-form";

function LoginModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const handleLogin = () => {
    const newErrors = {
      email: "",
      password: "",
    };

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

    console.log(email, password);
    setEmail("");
    setPassword("");
    setError({
      email: "",
      password: "",
    });
  };

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setError({
      email: "",
      password: "",
    });
    onClose();
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Iniciar Sesión
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        backdrop="blur"
        placement="top"
        size="md"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold">
              Inicia sesión en <LogoNiceLook />
            </h1>
          </ModalHeader>
          <ModalBody className="flex flex-col w-full justify-center items-center gap-4">
            <GoogleLogin />
            <div className="w-full flex flex-row items-center gap-2">
              <hr className="border-1 w-full border-slate-200" />
              <p className="text-center text-sm font-light min-w-max text-slate-400">
                o inicia con tu correo
              </p>
              <hr className="border-1 w-full border-slate-200" />
            </div>
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
            <ButtonCustom action={handleLogin} primary name={"Iniciar"} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default LoginModal;

/* eslint-disable react/prop-types */
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
} from "@nextui-org/react";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import useAuthStore from "@/stores/useAuthStore";
import axios from "axios";
import Cookies from "js-cookie";

function LoginModal({ isOpen, onClose, onOpenChange }) {
  const { loginClient } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const authGoogle = async (token) => {
    try {
      if (!token) {
        console.error("No se recibio el token de google");
        return;
      }
      const response = await axios.post("http://localhost:8000/client/login/", {
        token,
      });
      console.log("Respuesta del servidor", response);
      Cookies.set("client_id", response.data.client_id);
      loginClient();
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error al autenticar con google", error);
    }
  };

  const handleLogin = async () => {
    try {
      const newErrors = {
        email: "",
        password: "",
      };
  
      if (!email) {
        newErrors.email = "El correo es requerido";
      }
  
      if (!email.includes("@")) {
        newErrors.email = "El correo no es válido: debe contener un @";
      }
  
      if (!password) {
        newErrors.password = "La contraseña es requerida";
      }
  
      if (password.length < 6) {
        newErrors.password = "La contraseña debe tener al menos 6 caracteres";
      }
  
      setError(newErrors);
  
      if (Object.values(newErrors).some((error) => error !== "")) {
        return; // Salir si hay errores en la validación
      }
  
      const response = await axios.post(
        "http://localhost:8000/client/client_login/",
        { email, password }
      );
  
      if (response.status === 200) {
        const { client_id } = response.data; // Asegúrate de que el backend envíe `client_id`
        Cookies.set("client_id", client_id); // Guardar el ID del cliente en cookies
        loginClient(); // Actualizar el estado de autenticación
        onClose(); // Cerrar el modal
        window.location.reload(); // Recargar la página
      }
    } catch (error) {
      if (error.response) {
        const backendErrors = error.response.data;
  
        // Asignar mensajes de error según la respuesta del backend
        if (backendErrors.Error) {
          setError((prev) => ({ ...prev, general: backendErrors.Error }));
        }
  
        if (backendErrors["Credenciales incorrectas"]) {
          setError((prev) => ({
            ...prev,
            general: backendErrors["Credenciales incorrectas"],
          }));
        }
      } else {
        console.error("Error desconocido al iniciar sesión:", error);
        setError((prev) => ({
          ...prev,
          general: "Error al intentar iniciar sesión. Inténtalo de nuevo.",
        }));
      }
    }
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
      <Modal
        isOpen={isOpen}
        // onClose={onClose}
        onOpenChange={onOpenChange}
        hideCloseButton
        backdrop="blur"
        placement="center"
        size="md"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold">
              Inicia sesión en <LogoNiceLook />
            </h1>
          </ModalHeader>
          <ModalBody className="flex flex-col w-full justify-center items-center gap-4">
            {error.general && (
              <p className="text-red-500 text-sm font-medium text-center">
                {error.general}
              </p>
            )}
            <GoogleLogin
              onSuccess={(response) => {
                authGoogle(response.credential);
              }}
            />
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
              label={"Correo electrónico"}
              placeholder={"Correo electrónico"}
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
            <Button onPress={handleClose} variant="bordered">
              Cerrar
            </Button>
            <ButtonCustom action={handleLogin} primary name={"Entrar"} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default LoginModal;

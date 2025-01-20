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
  // useDisclosure,
} from "@nextui-org/react";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import useAuthStore from "@/stores/useAuthStore";
import axios from "axios";
import Cookies from "js-cookie";

function RegisterModal({ isOpen, onClose, onOpenChange }) {
  const { loginClient } = useAuthStore();
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

  const authGoogle = async (token) => {
    try {
      if (!token) {
        console.error("No se recibio el token de google");
        return;
      }
      const response = await axios.post(`${process.env.API_URL}/client/login/`, {
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

  const handleRegister = async () => {
    try {
      // Validación inicial de los campos
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

      if (!phone) {
        newErrors.phone = "El número de teléfono es requerido";
      }

      if (!email) {
        newErrors.email = "El correo es requerido";
      } else if (!email.includes("@")) {
        newErrors.email = "El correo no es válido: debe contener un @";
      }

      if (!password) {
        newErrors.password = "La contraseña es requerida";
      } else if (password.length < 6) {
        newErrors.password = "La contraseña debe tener al menos 6 caracteres";
      }

      setError(newErrors);

      if (Object.values(newErrors).some((error) => error !== "")) {
        return; // Salimos si hay errores de validación
      }

      // Solicitud al backend
      const response = await axios.post(
        `${process.env.API_URL}/client/client_signup/`,
        {
          first_name: name,
          last_name: lastName,
          phone,
          email,
          password,
        }
      );

      // Si el registro es exitoso
      if (response.status === 201) {
        const { client_id } = response.data;
        Cookies.set("client_id", client_id);
        loginClient();
        onClose();
        window.location.reload();
      }
    } catch (error) {
      // Manejar errores del backend
      if (error.response && error.response.data) {
        const backendError = error.response.data.Error; // Capturar el mensaje de error del backend
        const newErrors = {};

        if (backendError.includes("correo")) {
          newErrors.email = backendError;
        } else {
          newErrors.general = backendError;
        }

        setError((prevErrors) => ({
          ...prevErrors,
          ...newErrors,
        }));
      } else {
        console.error("Error inesperado:", error);
        setError((prevErrors) => ({
          ...prevErrors,
          general: "Ocurrió un error inesperado. Por favor, inténtalo de nuevo.",
        }));
      }
    }
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
        // onClose={onClose}
        onOpenChange={onOpenChange}
        placement="center"
        size="md"
        hideCloseButton
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold">
              Registrate en <LogoNiceLook />
            </h1>
          </ModalHeader>
          <ModalBody className="flex flex-col justify-center items-center gap-4">
            <GoogleLogin
              onSuccess={(response) => {
                authGoogle(response.credential);
              }}
            />
            <div className="w-full flex flex-row items-center gap-2">
              <hr className="border-1 w-full border-slate-200" />
              <p className="text-center text-sm font-light min-w-max text-slate-400">
                o registrate con tu correo
              </p>
              <hr className="border-1 w-full border-slate-200" />
            </div>

            {/* Campos de nombre y apellido */}
            <div className="flex flex-row gap-2 w-full">
              <InputCustom
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                label={"Nombre"}
                placeholder={"Nombre"}
                type={"text"}
                errorMessage={error.name} // Mostrar mensaje de error para "name"
                isInvalid={!!error.name}
              />
              <InputCustom
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                label={"Apellido"}
                placeholder={"Apellido"}
                type={"text"}
                errorMessage={error.lastName} // Mostrar mensaje de error para "lastName"
                isInvalid={!!error.lastName}
              />
            </div>

            {/* Campo de teléfono */}
            <InputCustom
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              label={"Número de teléfono"}
              placeholder={"Teléfono"}
              type={"number"}
              errorMessage={error.phone} // Mostrar mensaje de error para "phone"
              isInvalid={!!error.phone}
            />

            {/* Campo de correo electrónico */}
            <InputCustom
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              label={"Correo electrónico"}
              placeholder={"Correo electrónico"}
              type={"email"}
              errorMessage={error.email} // Mostrar mensaje de error para "email"
              isInvalid={!!error.email}
            />

            {/* Campo de contraseña */}
            <InputCustom
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              label={"Contraseña"}
              placeholder={"Contraseña"}
              type={"password"}
              errorMessage={error.password} // Mostrar mensaje de error para "password"
              isInvalid={!!error.password}
            />

            {/* Mostrar mensaje de error general */}
            {error.general && (
              <p className="text-red-500 text-sm mt-2">{error.general}</p>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onPress={handleClose} variant="bordered">
              Cerrar
            </Button>
            <ButtonCustom action={handleRegister} primary name={"Registrarme"} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default RegisterModal;

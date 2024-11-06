import { useState, useEffect, useMemo } from "react";
import api from "@/api";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useAuthStore from "@/stores/useAuthStore";

import ButtonCustom from "@/components/global/ButtonCustom";
import { Input } from "@nextui-org/input";
import { Separator } from "@/components/ui/separator";
import BackgroundLogin from "@/components/global/BackgroundLogin";
import LogoNiceLook from "@/components/ui/LogoNiceLook";
import { EyeFilledIcon } from "@/assets/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/assets/EyeSlashFilledIcon";

import { GoogleLogin } from "@react-oauth/google";

export default function AdminLogin() {
  const login = useAuthStore((state) => state.login);
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [isVisible, setIsVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState("default");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isEmailInvalid = useMemo(() => {
    if (formData.email === "") return false;

    return validateEmail(formData.email) ? false : true;
  }, [formData.email]);

  const navigate = useNavigate();

  const validatePasswordStrength = (password) => {
    const strongPasswordRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );

    if (strongPasswordRegex.test(password)) {
      return "success";
    } else if (password.length >= 6) {
      return "warning";
    } else {
      return "danger";
    }
  };

  useEffect(() => {
    if (passwordTouched) {
      setPasswordStrength(validatePasswordStrength(formData.password));
    }
    if (passwordTouched && confirmPasswordTouched) {
      setPasswordsMatch(formData.password === confirmPassword);
    }
    if ((formData.password || confirmPassword) === "") {
      setPasswordTouched(false);
      setConfirmPasswordTouched(false);
    }
  }, [
    formData.password,
    confirmPassword,
    passwordTouched,
    confirmPasswordTouched,
  ]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log("Form data", formData);
    api
      .post("/register/admin", {
        first_name: formData.name,
        last_name: formData.lastname,
        email: formData.email,
        password: formData.password,
      })
      .then((response) => {
        console.log(response.data);
        const decoded = jwtDecode(response.data.access_token);
        const access = response.data.access_token;
        const refresh = response.data.refresh_token;

        // Guardar los datos del usuario en Zustand
        login(decoded, access, refresh);

        // Redirigir al dashboard
        navigate("/admin/dashboard/home");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const authGoogle = (token) => {
    api
      .post("/auth/google/", { token })
      .then((response) => {
        const access = response.data.access_token;
        const refresh = response.data.refresh_token;
        const decoded = jwtDecode(response.data.access_token);

        // Guardar los datos del usuario en Zustand
        login(decoded, access, refresh);

        // Redirigir al dashboard
        navigate("/admin/dashboard/finance");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <BackgroundLogin />
      <main className="h-screen flex items-center">
        <article className="flex flex-col md:flex-row items-center w-[75%] mx-auto h-4/5">
          <section className="w-full h-full flex justify-center items-center">
            <h1 className="font-bold text-4xl">
              Esto es <LogoNiceLook />
            </h1>
          </section>
          <section className="w-full h-full p-8 flex flex-col gap-5 justify-center">
            <header>
              <h1 className="font-bold text-3xl">Identifícate</h1>
            </header>
            <GoogleLogin
              onSuccess={(response) => {
                authGoogle(response.credential);
              }}
              // onError={() => {
              //   console.log("Fallo en el inicio de sesión");
              // }}
            />
            <Separator />
            <p className="text-sm">También puedes registrarte manualmente:</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col md:flex-row gap-5">
                <Input
                  size="sm"
                  className="md:w-1/2 w-full"
                  type="text"
                  label="Nombres"
                  // placeholder="Ingrese sus nombres"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  defaultValue={formData.name}
                  required
                  variant="faded"
                />
                <Input
                  size="sm"
                  className="md:w-1/2 w-full"
                  type="text"
                  label="Apellidos"
                  // placeholder="Ingrese sus apellidos"
                  onChange={(e) =>
                    setFormData({ ...formData, lastname: e.target.value })
                  }
                  defaultValue={formData.lastname}
                  required
                  variant="faded"
                />
              </div>
              <Input
                size="sm"
                type="email"
                label="Correo electrónico"
                // placeholder="Ingrese su correo electrónico"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                defaultValue={formData.email}
                required
                variant="faded"
                isInvalid={isEmailInvalid}
                color={isEmailInvalid ? "danger" : "default"}
                errorMessage="Por favor ingresa un correo electrónico válido"
              />
              <div className="flex flex-col md:flex-row gap-5">
                <Input
                  className="md:w-1/2 w-full"
                  size="sm"
                  type={isVisible ? "text" : "password"}
                  label="Contraseña"
                  // placeholder="Ingrese su contraseña"
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    setPasswordTouched(true);
                  }}
                  value={formData.password}
                  // isInvalid={
                  //   ((passwordStrength === "danger" || !passwordsMatch) &&
                  //     passwordTouched) ||
                  //   false
                  // }
                  color={passwordTouched ? passwordStrength : "default"}
                  required
                  variant="faded"
                  // isInvalid={
                  //   passwordTouched && confirmPasswordTouched && !passwordsMatch
                  // }
                  isInvalid={
                    (passwordTouched &&
                      confirmPasswordTouched &&
                      !passwordsMatch) ||
                    passwordStrength === "danger"
                  }
                  // errorMessage="Las contraseñas no coinciden"
                  errorMessage={`${
                    passwordStrength === "success"
                      ? "Contraseña segura"
                      : passwordStrength === "warning"
                      ? "Contraseña débil"
                      : passwordStrength === "danger"
                      ? "Contraseña muy débil"
                      : ""
                  }`}
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
                  className="md:w-1/2 w-full"
                  size="sm"
                  type={isVisible ? "text" : "password"}
                  label="Confirmar contraseña"
                  // placeholder="Repita la contraseña"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setConfirmPasswordTouched(true);
                  }}
                  value={confirmPassword}
                  color={
                    confirmPasswordTouched && !passwordsMatch
                      ? "danger"
                      : passwordTouched
                      ? passwordStrength
                      : "default"
                  }
                  required
                  variant="faded"
                  isInvalid={
                    passwordTouched && confirmPasswordTouched && !passwordsMatch
                  }
                  // isInvalid={
                  //   (passwordTouched &&
                  //     confirmPasswordTouched &&
                  //     !passwordsMatch) ||
                  //   passwordStrength === "danger"
                  // }
                  errorMessage="Las contraseñas no coinciden"
                  // errorMessage={`${
                  //   passwordStrength === "success"
                  //     ? "Contraseña segura"
                  //     : passwordStrength === "warning"
                  //     ? "Contraseña débil"
                  //     : passwordStrength === "danger"
                  //     ? "Contraseña muy débil"
                  //     : ""
                  // }`}
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
              </div>
              {/* {passwordTouched && confirmPasswordTouched && !passwordsMatch && (
                <p className="text-danger text-sm">
                  Las contraseñas no coinciden
                </p>
              )} */}
              {/* {passwordTouched && formData.password && (
                <p className={`text-${passwordStrength} text-sm`}>
                  {passwordStrength === "success" && "Contraseña segura"}
                  {passwordStrength === "warning" && "Contraseña débil"}
                  {passwordStrength === "danger" && "Contraseña muy débil"}
                </p>
              )} */}
              <ButtonCustom
                type="submit"
                name="Entrar"
                primary
                isDisabled={
                  !formData.name ||
                  !formData.lastname ||
                  !formData.email ||
                  !formData.password ||
                  !confirmPassword ||
                  !passwordsMatch ||
                  passwordStrength != "success" ||
                  isEmailInvalid
                }
                isLoading={loading}
              />
            </form>
          </section>
        </article>
      </main>
    </>
  );
}

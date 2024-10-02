import { useState } from "react";
import api from "@/api";
import Cookies from "js-cookie";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../../constants";
import { useNavigate } from "react-router-dom";

import ButtonCustom from "@/components/global/ButtonCustom";
import { Input } from "@nextui-org/input";
import { Separator } from "@/components/ui/separator";
import BackgroundLogin from "@/components/global/BackgroundLogin";
import LogoNiceLook from "@/components/ui/LogoNiceLook";

import { GoogleLogin } from "@react-oauth/google";

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
        console.log(response);
        const access = response.data.access_token;
        const refresh = response.data.refresh_token;
        Cookies.set(ACCESS_TOKEN, access, { expires: 7 });
        Cookies.set(REFRESH_TOKEN, refresh, { expires: 7 });
        navigate("/admin/dashboard");
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
        console.log(response);
        const access = response.data.access_token;
        const refresh = response.data.refresh_token;
        Cookies.set(ACCESS_TOKEN, access, { expires: 7 });
        Cookies.set(REFRESH_TOKEN, refresh, { expires: 7 });
        navigate("/admin/dashboard");
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
          <section className="w-full h-full p-8 flex flex-col gap-5">
            <header>
              <h1 className="font-bold text-3xl">Regístrate</h1>
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
            <p>También puedes registrarte con tu correo electrónico.</p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col flex-nowrap gap-5"
            >
              <Input
                type="text"
                placeholder="Nombres"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                defaultValue={formData.name}
              />
              <Input
                type="text"
                placeholder="Apellidos"
                onChange={(e) =>
                  setFormData({ ...formData, lastname: e.target.value })
                }
                defaultValue={formData.lastname}
              />
              <Input
                type="email"
                placeholder="Correo electrónico"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                defaultValue={formData.email}
              />
              <Input
                type="password"
                placeholder="Contraseña"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                defaultValue={formData.password}
              />
              <ButtonCustom
                type="submit"
                name="Entrar"
                primary
                isDisabled={
                  !formData.name ||
                  !formData.lastname ||
                  !formData.email ||
                  !formData.password
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

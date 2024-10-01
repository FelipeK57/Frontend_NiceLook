import { useState } from "react";
import api from "@/api";

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

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    console.log("Form data", formData);
    api.post("/auth/register", formData).then((response) => {
      console
        .log(response)
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  const sendToken = (token) => {
    console.log(token);
    api
      .post("/auth/google/", token)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <main className="h-screen flex items-center">
        <BackgroundLogin />
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
                sendToken(response.credential);
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

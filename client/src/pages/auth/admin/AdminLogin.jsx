import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

export default function AdminLogin() {
  return (
    <>
      <main className="h-screen flex items-center">
        <article className="flex items-center w-[75%] mx-auto h-4/5">
          <section className="w-full h-full flex justify-center items-center">
            <h1 className="font-bold text-3xl">
              Esto es <span className="">NiceLook.</span>
            </h1>
          </section>
          <section className="w-full h-full p-8">
            <header>
              <h1 className="font-bold text-3xl">Regístrate</h1>
            </header>
            <div>Login oauth google todo</div>
            <form>
              <Input type="email" placeholder="Correo electrónico" />
              <Input type="password" placeholder="Contraseña" />
              <Button type="submit">Login</Button>
            </form>
          </section>
        </article>
      </main>
    </>
  );
}

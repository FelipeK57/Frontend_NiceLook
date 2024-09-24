import { Button, Input } from "@nextui-org/react";
import Categories from "../../components/servicesComponents/Categories";
import ServicesList from "../../components/servicesComponents/ServicesList";
function ServicesManagement() {
  return (
    <main className="flex bg-[#ffffff]">
      {/* Aqui va el componente Sidebar */}
      <aside className="w-1/4 h-screen border-r-2 border-slate-200 grid place-content-center">
        <h1 className="text-4xl text-zinc-950 font-semibold font-amaranth">
          NiceLook.
        </h1>
      </aside>
      {/* Este es el cuerpo de la pagina de gestión de servicios */}
      <section className="flex flex-col gap-6 w-3/4 p-8">
        <h1 className="text-4xl text-zinc-950 font-semibold">
          Gestiona las categorias y servicios
        </h1>
        <div className="flex gap-6 w-full">
          <div className="w-1/5">
            <Categories />
          </div>
          <div className="flex flex-col gap-6 w-3/5">
            <div className="flex gap-2">
              <Input
                placeholder="Barba, Corte de Cabello..."
                classNames={{
                  label: "text-black/50 dark:text-white/90",
                  input: [
                    "hover:border-slate-300",
                  ],
                  innerWrapper: "bg-transparent",
                  inputWrapper: [
                    "border-2 border-slate-200",
                    "bg-transparent",
                    "p-5",
                  ],
                }}
                endContent={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                }
              />
              <Button
                className="border-2 border-slate-200 font-semibold bg-transparent px-6 py-5
              "
              >
                Crear Nuevo
              </Button>
            </div>
            <ServicesList />
          </div>
        </div>
      </section>
    </main>
  );
}

export default ServicesManagement;

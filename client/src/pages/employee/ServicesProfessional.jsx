import { useEffect, useState } from "react";
import { parseDate } from "@internationalized/date";
import axios from "axios";
import Cookies from "js-cookie";
import ProfessionalServices from "@/components/employeeServices/ProfessionalServices";
import EstablishmentServices from "@/components/employeeServices/EstablishmentServices";

function ServiceProfessional() {
  const [reload, setReload] = useState(false);

  return (
    <main className="h-screen grid gap-2 px-4 py-2 grid-rows-[auto_1fr] md:grid-rows-[auto_1fr_auto]">
      <header className="flex flex-col items-center gap-4 w-full md:flex-row">
        <h1 className="text-2xl lg:text-4xl text-slate-950 font-bold w-full flex flex-grow justify-start">
          Gestionar servicios
        </h1>
      </header>
      <main className="grid grid-rows-[1fr_1fr] py-2 gap-4">
        <section className="flex flex-col gap-4">
          <p className="font-semibold text-xl">Mis servicios</p>
          <ProfessionalServices reload={reload} setReload={setReload} />
        </section>
        <section className="flex flex-col gap-4">
          <p className="font-semibold text-xl">Servicios del establecimiento</p>
          <EstablishmentServices reload={reload} setReload={setReload} />
        </section>
      </main>
    </main>
  );
}

export default ServiceProfessional;

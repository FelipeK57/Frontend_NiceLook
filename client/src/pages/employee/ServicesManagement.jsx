import ServicesList from "../../components/employeeServices/ServicesList"

function ServicesManagement() {
    return (
        <main>
            <section className="flex flex-col w-full gap-6 py-8 px-10">
                <div className=" pb-2">
                    <h1 className="text-4xl text-zinc-950 font-bold">Gestión de Servicios</h1>
                </div>
                <ServicesList />
            </section>
        </main>
    )
}

export default ServicesManagement
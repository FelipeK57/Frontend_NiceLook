import ServicesList from "../../components/employeeServices/ServicesList"

function ServicesManagement() {
    return (
        <main>
            <section className="flex flex-col w-full h-[95vh] gap-6 py-8 px-10">
                <div className=" pb-2">
                    <h1 className="sm:text-4xl text-3xl text-zinc-950 font-bold">Gestión de Servicios</h1>
                </div>
                <ServicesList />
            </section>
        </main>
    )
}

export default ServicesManagement
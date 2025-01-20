import { useEffect, useState } from "react";
import ComentList from "./ComentList";
import { getEstablishmentServices } from "@/api/employeeServices/employeeServicesApi";
import ServiceCardList from "./ServiceCardList";

function ProfileReviews() {

    const categories = [
        {
            id: 0,
            name: "Todos",
        },
        {
            id: 1,
            name: "Barberia",
        },
        {
            id: 2,
            name: "SPA de uñas",
        },
        {
            id: 3,
            name: "SPA",
        },
        {
            id: 4,
            name: "Peluqueria",
        },
        {
            id: 5,
            name: "Maquillaje",
        },
        {
            id: 6,
            name: "Tatuajes",
        },

    ]

    const [services, setServices] = useState([]);

    function loadSerices() {
        const promise = new Promise((resolve, reject) => {
            const response = getEstablishmentServices(1);
            setTimeout(() => {
                resolve(response);
                reject("Ocurrio un error");
            }, 0);
        }, 0);

        promise.then((response) => {
            setServices(response.data);
        });

        promise.catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        loadSerices();
    }, [])

    const [selectedCategory, setSelectedCategory] = useState(0);
    // console.log(services)

    return (
        <>
            <section className="grid grid-cols-[0.5fr_1.5fr]">
                <aside className="flex flex-col border-1 border-slate-200 mr-2 rounded-xl mt-2 gap-4 p-4">
                    <h2 className="text-center py-2 font-bold text-xl ">Categorias</h2>
                    {categories.map((category) => (
                        <button key={category.id}
                            className={`p-2 hover:bg-slate-200 text-start transition-all duration-500 font-semibold ${selectedCategory === category.id ? "border-b-2 border-black" : "text-slate-500"}`}
                            onClick={() => setSelectedCategory(category.id)}>
                            {category.name}
                        </button>
                    ))}
                </aside>
                <ComentList />
            </section>
            <ServiceCardList services={services.services} />
        </>
    );
}

export default ProfileReviews;
import { Button } from "@nextui-org/react"
import Service from "./Service"
import PropTypes from "prop-types"
import { useLayoutEffect, useState } from "react";

function ServiceCardList(props) {

    ServiceCardList.propTypes = {
        services: PropTypes.array,
    }

    const [scrollPosition, setScrollPosition] = useState(0);
    const [maxScrollPosition, setMaxScrollPosition] = useState(0);

    useLayoutEffect(() => {
        const scrollContainer = document.querySelector('.scroll-container');
        const scrollWidth = scrollContainer.scrollWidth;
        const clientWidth = scrollContainer.clientWidth;
        setMaxScrollPosition(scrollWidth - clientWidth);
        setScrollPosition(0);
    }, [props.services]);

    const handleScrollLeft = () => {
        const scrollContainer = document.querySelector('.scroll-container');
        const scrollWidth = scrollContainer.scrollWidth;
        const clientWidth = scrollContainer.clientWidth;
        const maxScrollPosition = scrollWidth - clientWidth;
        setMaxScrollPosition(maxScrollPosition);

        const step = 250; // Ajusta la cantidad de pixels que se avanzan en cada clic
        if (scrollPosition > 0) {
            setScrollPosition(scrollPosition - step);
            scrollContainer.scrollLeft = scrollPosition - step;
        }
    }

    const handleScrollRight = () => {
        const scrollContainer = document.querySelector('.scroll-container');
        const scrollWidth = scrollContainer.scrollWidth;
        const clientWidth = scrollContainer.clientWidth;
        const maxScrollPosition = scrollWidth - clientWidth;
        setMaxScrollPosition(maxScrollPosition);

        const step = 250; // Ajusta la cantidad de pixels que se avanzan en cada clic
        if (scrollPosition < maxScrollPosition) {
            setScrollPosition(scrollPosition + step);
            scrollContainer.scrollLeft = scrollPosition + step;
        }
    }

    console.log(props.services)

    return (
        <section>
            <h2 className="text-2xl font-semibold my-6 mx-4">Evidecia fotografica</h2>
            <div className="gap-4 flex flex-row items-center mx-5 w-full">
                <Button onClick={handleScrollLeft}
                    disabled={scrollPosition <= 0}
                    isIconOnly
                    variant="bordered"
                    className={`border-2 border-slate-400 rounded-full shadow-lg ${scrollPosition <= 0 ? "opacity-5" : ""}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </Button>
                <div className="scroll-container flex gap-4 w-full max-w-full overflow-x-auto scrollbar scroll-smooth">
                    {props.services?.map((service) => (
                        <>
                            <Service key={service.id} service={service} />
                        </>
                    ))}
                </div>
                <Button onClick={handleScrollRight}
                    disabled={scrollPosition >= maxScrollPosition}
                    isIconOnly
                    variant="bordered"
                    className={`border-2 border-slate-400 rounded-full shadow-lg ${scrollPosition >= maxScrollPosition ? "opacity-5" : ""}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                </Button>
            </div>
        </section>
    )
}

export default ServiceCardList
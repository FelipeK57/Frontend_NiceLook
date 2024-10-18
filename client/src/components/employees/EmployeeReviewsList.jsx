import { Accordion, AccordionItem } from "@nextui-org/react";
import EmployeeReview from "./EmployeeReview";
import { AccordionCustomContent, AccordionCustomTitle } from "./AccordionCustomContent";


function EmployeeReviewsList() {

    const itemClasses = {
        base: "rounded-[20px] shadow-none border-2 border-slate-200 sm:hidden",
    }



    return (
        <section className="h-[45vh] sm:h-full">
            <div className="flex flex-col sm:my-4">
                <h2 className="text-2xl sm:text-4xl text-zinc-950 font-bold">Visualizar las reseñas</h2>
            </div>
            <div className=" hidden sm:flex flex-col overflow-y-scroll sm:flex-row sm:overflow-x-scroll scrollbar gap-4 ">
                <EmployeeReview />
                <EmployeeReview />
                <EmployeeReview />
            </div>
            <div className="flex flex-col h-[82%]">

                <Accordion selectionMode="multiple" className=" max-h-[70vh] overflow-y-auto
            md:scrollbar md:scrollbar-thumb-slate-200  md:scrollbar-thumb-rounded-full md:scrollbar-track-rounded-full md:active:scrollbar-thumb-primary md:hover:scrollbar-thumb-slate-300
            " variant="splitted" itemClasses={itemClasses}>
                    <AccordionItem key="1" aria-label="Accordion 1" title={<AccordionCustomTitle nombre={"nombre del cliente"} qualification>
                        <div>
                            <h3 className="text-lg text-nowrap">Servicio:</h3>
                            <h3 className="text-lg text-nowrap">Corte de cabello + barba</h3>
                        </div>
                    </AccordionCustomTitle>
                    }>
                        <AccordionCustomContent estado={true}>
                            <div>
                                <h3 className="text-base text-nowrap">Comentario:</h3>
                                <p className=" text-justify pr-2">
                                    ¡Pana! Me encantó el corte, quedó súper bacano. El man que me atendió es un crack, me entendió al toque lo que quería. ¡Me siento como todo un influencer!
                                </p>
                            </div>
                        </AccordionCustomContent>
                    </AccordionItem>
                    <AccordionItem key="2" aria-label="Accordion 1" title={<AccordionCustomTitle nombre={"nombre del cliente"} qualification>
                        <div>
                            <h3 className="text-lg text-nowrap">Servicio:</h3>
                            <h3 className="text-lg text-nowrap">Corte de cabello + barba</h3>
                        </div>
                    </AccordionCustomTitle>
                    }>
                        <AccordionCustomContent estado={true}>
                            <div>
                                <h3 className="text-base text-nowrap">Comentario:</h3>
                                <p className=" text-justify pr-2">
                                    ¡Pana! Me encantó el corte, quedó súper bacano. El man que me atendió es un crack, me entendió al toque lo que quería. ¡Me siento como todo un influencer!
                                </p>
                            </div>
                        </AccordionCustomContent>
                    </AccordionItem>
                    <AccordionItem key="3" aria-label="Accordion 1" title={<AccordionCustomTitle nombre={"nombre del cliente"} qualification>
                        <div>
                            <h3 className="text-lg text-nowrap">Servicio:</h3>
                            <h3 className="text-lg text-nowrap">Corte de cabello + barba</h3>
                        </div>
                    </AccordionCustomTitle>
                    }>
                        <AccordionCustomContent estado={true}>
                            <div>
                                <h3 className="text-base text-nowrap">Comentario:</h3>
                                <p className=" text-justify pr-2">
                                    ¡Pana! Me encantó el corte, quedó súper bacano. El man que me atendió es un crack, me entendió al toque lo que quería. ¡Me siento como todo un influencer!
                                </p>
                            </div>
                        </AccordionCustomContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </section>
    );
}

export default EmployeeReviewsList;
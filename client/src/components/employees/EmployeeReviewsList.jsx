import { Accordion, AccordionItem } from "@nextui-org/react";
import EmployeeReview from "./EmployeeReview";
import { AccordionCustomContent, AccordionCustomTitle } from "./AccordionCustomContent";
import PropTypes from "prop-types"
import { useEffect, useState } from "react";
import { getEmployeeReviews } from "../../Api/employee/employee";

function EmployeeReviewsList({ employee }) {

    EmployeeReviewsList.propTypes = {
        employee: PropTypes.object,
    }

    const itemClasses = {
        base: "rounded-[20px] shadow-none border-2 border-slate-200 sm:hidden",
    }

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        function loadReviews() {
            const promise = new Promise((resolve, reject) => {
                const response = getEmployeeReviews(employee.id)
                setTimeout(() => {
                    resolve(response);
                    reject("Ocurrio un error");
                }, 0);
            })
            promise.then((response) => {
                console.log(response)
                console.log("Estas son las reviews", response.data)
                setReviews(response.data)
            }).catch((error) => {
                console.log(error)
            })
        }
        loadReviews()
    }, [employee])

    console.log("Este es el empleado", employee)

    return (
        <section className="h-[45vh] sm:h-full">
            <div className="flex flex-col sm:my-4">
                <h2 className="text-2xl sm:text-4xl text-zinc-950 font-bold">Visualizar las reseñas</h2>
            </div>
            <div className=" hidden sm:flex flex-col overflow-y-scroll sm:flex-row sm:overflow-x-scroll scrollbar gap-4 ">
                {
                    reviews?.data?.length > 0 ? reviews?.data.map((review) => (
                        <EmployeeReview key={review.id} review={review} />
                    ))
                        :
                        <h2 className="text-2xl sm:text-3xl text-zinc-950 font-bold">No hay reseñas</h2>
                }
            </div>
            <div className="flex flex-col h-[82%]">

                <Accordion selectionMode="multiple" className=" max-h-[70vh] overflow-y-auto
            md:scrollbar md:scrollbar-thumb-slate-200  md:scrollbar-thumb-rounded-full md:scrollbar-track-rounded-full md:active:scrollbar-thumb-primary md:hover:scrollbar-thumb-slate-300"
                    variant="splitted" itemClasses={itemClasses}>
                    {reviews?.data?.length > 0 && reviews?.data.map((review) => (
                        <AccordionItem key="1" aria-label="Accordion 1" title={<AccordionCustomTitle nombre={review.client_name} qualification={review.rating} >
                            <div>
                                <h3 className="text-lg text-nowrap font-semibold">Servicios:</h3>
                                <h3 className="text-lg  line-clamp-1 text-ellipsis">
                                    {review?.services?.map((service) => service).join(", ")}
                                </h3>
                            </div>
                        </AccordionCustomTitle>
                        }>
                            <AccordionCustomContent estado={true}>
                                <div>
                                    <h3 className="text-base text-nowrap font-semibold">Comentario:</h3>
                                    <p className=" text-justify pr-2">
                                        {review.comment}
                                    </p>
                                </div>
                            </AccordionCustomContent>
                        </AccordionItem>
                    ))
                    }
                </Accordion>
            </div>
        </section>
    );
}

export default EmployeeReviewsList;
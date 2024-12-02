import ReviewComponent from "../global/ReviewComponent"
import PropTypes from "prop-types"

function EmployeeReview({ review }) {

    EmployeeReview.propTypes = {
        review: PropTypes.object,
    }

    return (
        <div className=" flex flex-col min-w-[60%] mt-8 border-2 border-slate-200 rounded-2xl py-2 px-4 ">
            <div className="flex  justify-between w-full">
                <h3 className="text-lg font-bold text-nowrap">{review?.client_name}</h3>
                <ReviewComponent reviews={`${review?.rating}`} size="size-6"/>
            </div>
            <div>
                <h3 className="text-lg text-nowrap font-semibold">Servicios:</h3>
                <h3 className="text-lg text-nowrap line-clamp-1 text-ellipsis">
                    {review?.services?.map((service) => service).join(", ")}
                </h3>
            </div>
            <div>
                <h3 className="text-base text-nowrap font-semibold">Comentario:</h3>
                <p className="h-[16vh] text-justify overflow-y-auto pr-2
                scrollbar scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300 scrollbar-thumb-rounded-full active:scrollbar-thumb-primary">
                    {review?.comment}
                </p>
            </div>
        </div>
    )
}

export default EmployeeReview
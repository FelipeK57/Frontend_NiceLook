import EmployeeReview from "./EmployeeReview";

function EmployeeReviewsList() {
    return (
        <section>
            <div className="flex flex-col my-4">
                <h2 className="text-4xl text-zinc-950 font-bold">Visualizar las reseñas</h2>
            </div>
            <div className="flex overflow-x-scroll scrollbar gap-4 ">
                <EmployeeReview />
                <EmployeeReview />
                <EmployeeReview />
            </div>
        </section>
    );
}

export default EmployeeReviewsList;
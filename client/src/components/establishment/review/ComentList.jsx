import Coment from "./Coment"

function ComentList() {
    return (
        <article className=" p-6">
            <div className=" text-2xl font-semibold mb-6">
                <h2>Comentarios</h2>
            </div>
            <div className="grid grid-cols-3 max-h-[40vh] gap-4 overflow-y-auto scrollbar scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300 scrollbar-thumb-rounded-full active:scrollbar-thumb-primary">
                <Coment />
                <Coment />
                <Coment />
                <Coment />
                <Coment />
                <Coment />
                <Coment />
                <Coment />
                <Coment />
                <Coment />
                <Coment />
                <Coment />
                <Coment />
            </div>
        </article>
    )
}

export default ComentList
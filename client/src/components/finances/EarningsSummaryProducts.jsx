function EarningsSummaryProducts({ earningsProducts }) {
  const formattedEarningsProducts = new Intl.NumberFormat("es-ES").format(
    earningsProducts
  );
  return (
    <article className="flex flex-col items-start justify-between gap-10 p-8 border-2 rounded-3xl min-w-[350px] max-w-[350px] border-slate-200">
      <h1 className="text-lg font-medium text-slate-700">
        Ganancias de los productos
      </h1>
      <p className={`text-5xl font-bold text-green-500`}>
        +${formattedEarningsProducts}
      </p>
    </article>
  );
}
export default EarningsSummaryProducts;

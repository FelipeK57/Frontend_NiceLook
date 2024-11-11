function EarningsSummaryProducts({ earningsProducts }) {
  const formattedEarningsProducts = new Intl.NumberFormat("es-ES").format(
    earningsProducts
  );
  return (
    <article className="flex flex-col items-start justify-between gap-6 p-6 border-2 rounded-3xl min-w-[300px] max-w-[300px] border-slate-200">
      <h1 className="text-base font-medium text-slate-700">
        Ganancias de los productos
      </h1>
      <p className={`text-4xl font-bold text-green-700`}>
        +${formattedEarningsProducts}
      </p>
    </article>
  );
}
export default EarningsSummaryProducts;

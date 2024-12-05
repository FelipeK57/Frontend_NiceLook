function EarningsSummaryProducts({
  earningsProducts,
  earningsProductsMonthly,
}) {
  const formattedEarningsProducts = new Intl.NumberFormat("es-ES").format(
    earningsProducts
  );
  const formattedEarningsProductsMonthly = new Intl.NumberFormat(
    "es-ES"
  ).format(earningsProductsMonthly);

  const earnings = [
    {
      totalEarnings: formattedEarningsProducts,
      name: "Ganancias de los productos",
    },
    {
      totalEarnings: formattedEarningsProductsMonthly,
      name: "Ganancias del mes",
    },
  ];
  return (
    <div className="flex w-full gap-5">
      {earnings.map((earnings) => (
        <article
          key={earnings.name}
          className="flex flex-col items-start justify-between gap-6 p-5 border-2 rounded-3xl min-w-[300px] max-w-[300px] border-slate-200"
        >
          <h1 className="flex flex-col text-base font-medium text-slate-700">
            {earnings.name}
            {earnings.name === "Ganancias del mes" && (
              <span className="text-[12px] text-slate-600">
                *Calculo hasta la fecha*
              </span>
            )}
          </h1>

          <p
            className={`text-3xl ${
              earnings.name === "Ganancias de los productos"
                ? "text-green-700"
                : "text-slate-950"
            } font-bold`}
          >
            {earnings.name === "Ganancias de los productos" && "+"}$
            {earnings.totalEarnings}
          </p>
        </article>
      ))}
    </div>
  );
}
export default EarningsSummaryProducts;

import PropTypes from "prop-types";
function EarningsSummaryServices({
  earningsEstablishment,
  earningsArtist,
  earningsMonthly,
}) {
  const totalEarnings = earningsEstablishment + earningsArtist;
  const formattedTotalEarnings = new Intl.NumberFormat("es-ES").format(
    totalEarnings
  );
  const formattedEarningsEstablishment = new Intl.NumberFormat("es-ES").format(
    earningsEstablishment
  );
  const formattedEarningsArtist = new Intl.NumberFormat("es-ES").format(
    earningsArtist
  );
  const formattedEarningsMonthly = new Intl.NumberFormat("es-ES").format(
    earningsMonthly
  );
  const earnings = [
    { totalEarnings: formattedTotalEarnings, name: "Total dinero recibido" },
    {
      totalEarnings: formattedEarningsEstablishment,
      name: "Ganancia del establecimiento",
    },
    {
      totalEarnings: formattedEarningsArtist,
      name: "Ganancia de artistas",
    },
    {
      totalEarnings: formattedEarningsMonthly,
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
              <span className="text-[12px] text-slate-600">*Resumen hasta la fecha*</span>
            )}
          </h1>

          <p
            className={`text-3xl ${
              earnings.name === "Ganancia del establecimiento"
                ? "text-green-700"
                : "text-slate-950"
            } font-bold`}
          >
            {earnings.name === "Ganancia del establecimiento" && "+"}$
            {earnings.totalEarnings}
          </p>
        </article>
      ))}
    </div>
  );
}

EarningsSummaryServices.propTypes = {
  earningsEstablishment: PropTypes.number.isRequired,
  earningsArtist: PropTypes.number.isRequired,
};

export default EarningsSummaryServices;

import PropTypes from "prop-types";
function EarningsSummaryServices({ earningsEstablishment, earningsArtist }) {
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
  ];

  return (
    <div className="flex gap-8">
      {earnings.map((earnings) => (
        <article
          key={earnings.name}
          className="flex flex-col items-start justify-between gap-10 p-8 border-2 rounded-3xl min-w-[350px] border-slate-200"
        >
          <h1 className="text-lg font-medium text-slate-700">
            {earnings.name}
          </h1>
          <p
            className={`text-5xl ${
              earnings.name === "Ganancia del establecimiento"
                ? "text-green-500"
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

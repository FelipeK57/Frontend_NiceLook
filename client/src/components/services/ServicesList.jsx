import Service from "./Service"; // Import the Service component

/**
 * ServicesList component renders a list of services.
 *
 * @component
 * @example
 * return (
 *   <ServicesList />
 * )
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @description
 * This component displays a list of services with their details such as name, price, commission, reviews, score, and state.
 * It uses the Service component to render each service.
 * The list is scrollable on larger screens.
 */
function ServicesList({ services }) {
  return (
    <article className="flex flex-col lg:pb-0 gap-6 max-h-[70vh] 2xl:max-h-[80vh] lg:overflow-y-auto scrollbar scrollbar-thumb-slate-200  scrollbar-thumb-rounded-full scrollbar-track-rounded-full active:scrollbar-thumb-primary hover:scrollbar-thumb-slate-300 lg:pr-2">
      {/* Render individual Service components with their respective props */}
      {services.length === 0 ? (
        <p className="text-center text-lg text-slate-500 font-medium">
          No hay servicios registrados
        </p>
      ) : (
        services.map((service) => (
          <Service
            key={service.id}
            id={service.id}
            name={service.name}
            price={service.price}
            commission={service.commission * 100}
            category={service.category}
            state={service.state}
            image={service.image_base64}
          />
        ))
      )}
    </article>
  );
}

export default ServicesList; // Export the ServicesList component

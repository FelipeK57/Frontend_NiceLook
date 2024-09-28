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
function ServicesList() {
  return (
    <article className="flex flex-col pb-4 lg:pb-0 gap-6 lg:h-[75vh] lg:overflow-y-auto scrollbar scrollbar-thumb-slate-200  scrollbar-thumb-rounded-full scrollbar-track-rounded-full active:scrollbar-thumb-primary hover:scrollbar-thumb-slate-300 lg:pr-2">
      {/* Render individual Service components with their respective props */}
      <Service
        name="Corte de Cabello"
        price={20000}
        commission={12}
        reviews={102}
        score={4.5}
        state
      />
      <Service
        name="Barba"
        price={10000}
        commission={10}
        state
        reviews={45}
        score={5}
      />
      <Service
        name="Corte de Cabello"
        price={20000}
        commission={12}
        state
        reviews={102}
        score={4.5}
      />
      <Service
        name="Barba"
        price={10000}
        commission={10}
        state
        reviews={45}
        score={5}
      />
      <Service
        name="Corte de Cabello"
        price={20000}
        commission={12}
        state
        reviews={102}
        score={4.5}
      />
    </article>
  );
}

export default ServicesList; // Export the ServicesList component

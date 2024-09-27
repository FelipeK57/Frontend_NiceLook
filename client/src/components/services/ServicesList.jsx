import Service from "./Service";

function ServicesList() {
  return (
    <article className="flex flex-col gap-6 h-[550px] overflow-y-auto pr-2">
      <Service />
      <Service />
    </article>
  );
}

export default ServicesList;

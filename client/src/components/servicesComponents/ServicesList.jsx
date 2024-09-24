import Service from "./Service";

function ServicesList() {
  return (
    <article className="flex flex-col gap-6 h-[550px] overflow-y-scroll pr-2">
      <Service />
      <Service />
      <Service />
      <Service />
      <Service />
      <Service />
    </article>
  );
}

export default ServicesList;
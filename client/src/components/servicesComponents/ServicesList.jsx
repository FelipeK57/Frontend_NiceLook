import Service from "./Service";

function ServicesList() {
  return (
    <article className="flex flex-col gap-6 overflow-y-auto h-[73vh] pr-2">
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
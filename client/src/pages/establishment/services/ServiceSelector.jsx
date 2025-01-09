/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Input, Card, CardBody } from "@nextui-org/react";
import { Search } from "lucide-react";
import ServiceCard from "@/components/services/ServiceCard";

const ServiceSelector = ({ services, onSelectService, selectedServices }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const filteredServices = services.filter((service) =>
    service.service.name
      .toLowerCase()
      .includes(debouncedSearchTerm.toLowerCase())
  );

  return (
    <div className="w-full space-y-4 max-h-[500px]">
      <h3 className="text-lg font-semibold">Selecciona un servicio</h3>
      <Input
        placeholder="Buscar servicio"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        startContent={<Search className="text-default-400" />}
        variant="bordered"
      />
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onSelect={onSelectService}
              duration={service.duration}
              selectedServices={selectedServices}
              color={
                selectedServices.includes(service.id) ? "secondary" : "primary"
              }
            />
          ))
        ) : (
          <Card
            className="w-full h-full min-h-32 space-y-5 p-4 col-span-2 md:col-span-3"
            radius="lg"
          >
            <CardBody className="flex items-center justify-center">
              <p className="text-center text-default-500 select-none">
                No se encontraron servicios
              </p>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ServiceSelector;

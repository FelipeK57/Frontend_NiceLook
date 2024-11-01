import PropTypes from "prop-types";
import { Select, SelectItem } from "@nextui-org/react";
function PaymentServicesItem({ id, profesional, total, earning, services }) {
  return (
    <li
      key={id}
      className="grid grid-cols-4 items-center [&>p]:font-semibold gap-2 border-2 border-slate-200 rounded-2xl py-2 px-8 w-full"
    >
      <p>{total}</p>
      <p className="text-green-700">+{earning}</p>
      <p>{profesional}</p>
      <Select
        classNames={{
          trigger: "p-5",
        }}
        size="sm"
        label="Ver mas"
        labelPlacement="inside"
        variant="bordered"
        className="w-full"
        selectionMode="none"
      >
        {services.map((service) => (
          <SelectItem key={service.service_name} value={service.service_name}>
            {service.service_name}
          </SelectItem>
        ))}
      </Select>
    </li>
  );
}

PaymentServicesItem.propTypes = {
  id: PropTypes.number,
  profesional: PropTypes.string,
  total: PropTypes.number,
  earning: PropTypes.number,
  services: PropTypes.array,
};

export default PaymentServicesItem;

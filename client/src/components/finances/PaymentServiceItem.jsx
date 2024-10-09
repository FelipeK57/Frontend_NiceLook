import PropTypes from "prop-types";
import { Select, SelectItem } from "@nextui-org/react";
function PaymentServicesItem({
  id,
  price,
  earning,
  hour,
  profesional,
  services,
}) {
  return (
    <li
      key={id}
      className="grid grid-cols-5 items-center [&>p]:font-semibold gap-2 border-2 border-slate-200 rounded-2xl py-4 px-8 w-full"
    >
      <p>${price}</p>
      <p className="text-green-500">+{earning}</p>
      <p>{profesional}</p>
      <p>{hour}</p>
      <Select
        classNames={{
          trigger: "p-5",
        }}
        size="sm"
        label="Ver mas"
        labelPlacement="inside"
        variant="bordered"
        className="w-full"
      >
        {services.map((service) => (
          <SelectItem key={service} value={service}>
            {service}
          </SelectItem>
        ))}
      </Select>
    </li>
  );
}

PaymentServicesItem.propTypes = {
  id: PropTypes.number,
  price: PropTypes.number,
  quantity: PropTypes.number,
  hour: PropTypes.string,
  profesional: PropTypes.string,
  services: PropTypes.array,
};

export default PaymentServicesItem;

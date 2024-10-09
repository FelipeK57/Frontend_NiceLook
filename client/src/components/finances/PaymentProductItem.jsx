import PropTypes from "prop-types";
import { Select, SelectItem } from "@nextui-org/react";
function PaymentProductItem({
  id,
  price,
  quantity,
  hour,
  paymentMethod,
  products,
}) {
  return (
    <li
      key={id}
      className="grid grid-cols-5 items-center [&>p]:font-semibold gap-2 border-2 border-slate-200 rounded-2xl py-4 px-8 w-full"
    >
      <p className="text-green-500">+${price}</p>
      <p>{quantity}</p>
      <p>{hour}</p>
      <p>{paymentMethod}</p>
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
        {products.map((product) => (
          <SelectItem key={product} value={product}>
            {product}
          </SelectItem>
        ))}
      </Select>
    </li>
  );
}

PaymentProductItem.propTypes = {
  id: PropTypes.number,
  price: PropTypes.number,
  quantity: PropTypes.number,
  hour: PropTypes.string,
  paymentMethod: PropTypes.string,
  products: PropTypes.array,
};

export default PaymentProductItem;

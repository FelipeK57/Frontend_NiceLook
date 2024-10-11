import PropTypes from "prop-types";
import { Select, SelectItem } from "@nextui-org/react";
function PaymentProductItem({
  id,
  price,
  quantity,
  paymentMethod,
  products,
}) {
  return (
    <li
      key={id}
      className="grid grid-cols-4 items-center [&>p]:font-semibold gap-2 border-2 border-slate-200 rounded-2xl py-4 px-8 w-full"
    >
      <p>${price}</p>
      <p>{quantity}</p>
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
          <SelectItem key={product.product_name} value={product.product_name}>
            {product.product_name}
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
  paymentMethod: PropTypes.string,
  products: PropTypes.array,
};

export default PaymentProductItem;

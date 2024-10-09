import PropTypes from "prop-types";
import PaymentProductItem from "./PaymentProductItem";
function PaymentProductList({ paymentProducts }) {
  return (
    <ul className="flex flex-col gap-6 h-[45vh] overflow-y-auto scrollbar scrollbar-thumb-slate-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full pr-2 active:scrollbar-thumb-primary hover:scrollbar-thumb-slate-300 w-full">
      {paymentProducts.map((paymentProduct) => (
        <PaymentProductItem
          key={paymentProduct.id}
          id={paymentProduct.id}
          price={paymentProduct.price}
          quantity={paymentProduct.quantity}
          hour={paymentProduct.hour}
          paymentMethod={paymentProduct.paymentMethod}
          products={paymentProduct.products}
        />
      ))}
    </ul>
  );
}

PaymentProductList.propTypes = {
  paymentProducts: PropTypes.array,
};
export default PaymentProductList;

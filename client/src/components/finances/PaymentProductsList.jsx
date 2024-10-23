import PropTypes from "prop-types";
import PaymentProductItem from "./PaymentProductItem";
function PaymentProductList({ paymentProducts }) {
  return (
    <ul className="flex flex-col gap-4 max-h-[35vh] overflow-y-auto scrollbar scrollbar-thumb-slate-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full pr-2 active:scrollbar-thumb-primary hover:scrollbar-thumb-slate-300 w-full">
      {paymentProducts.map((paymentProduct) => (
        <PaymentProductItem
          key={paymentProduct.payment_id}
          id={paymentProduct.payment_id}
          price={paymentProduct.total}
          quantity={paymentProduct.quantity}
          paymentMethod={paymentProduct.method}
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

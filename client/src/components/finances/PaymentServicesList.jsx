import PropTypes from "prop-types";
import PaymentServiceItem from "./PaymentServiceItem";

function PaymentServicesList({ paymentServices }) {
  return (
    <ul className="flex flex-col gap-6 h-[45vh] overflow-y-auto scrollbar scrollbar-thumb-slate-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full pr-2 active:scrollbar-thumb-primary hover:scrollbar-thumb-slate-300 w-full">
      {paymentServices.map((paymentServices) => (
        <PaymentServiceItem
          key={paymentServices.appointment_id}
          id={paymentServices.appointment_id}
          profesional={paymentServices.employee}
          earning={paymentServices.profit_establisment}
          total={paymentServices.total}
          services={paymentServices.services} 
        />
      ))}
    </ul>
  );
}

PaymentServicesList.propTypes = {
  paymentServices: PropTypes.array,
};
export default PaymentServicesList;

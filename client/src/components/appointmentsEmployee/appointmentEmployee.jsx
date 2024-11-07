

function AppointmentCard({ clientName, service, price, time, paymentMethod }) {
  return (
    <div className="bg-white shadow-md rounded px-4 py-2">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-medium">{clientName}</h3>
          <p>{service}</p>
        </div>
        <div>
          <p className="text-right">{time}</p>
          <p className="text-right">${price}</p>
        </div>
      </div>
      <div className="flex mt-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5h7.5A2.25 2.25 0 0118 6.75v10.5A2.25 2.25 0 0115.75 19.5H5.25A2.25 2.24 0 013 17.25v-10.5A2.25 2.25 0 015.25 4.5z" />
        </svg>
        <p className="ml-2">{paymentMethod}</p>
      </div>
    </div>
  );
}

export default AppointmentCard;
import { Select, SelectItem, DatePicker } from "@nextui-org/react";
import { useEffect, useState } from "react";
import EarningsSummaryServices from "../../components/finances/EarningsSummaryServices";
import EarningsSummaryProducts from "../../components/finances/EarningsSummaryProducts";
import PaymentServicesList from "../../components/finances/PaymentServicesList";
import PaymentProductList from "../../components/finances/PaymentProductsList";
import { parseDate } from "@internationalized/date";
import axios from "axios";
import Cookies from "js-cookie";
import ButtonCustom from "../../components/global/ButtonCustom";
import ModalCreateAppointment from "../../components/sales/ModalCreateAppointment";
const items = ["Servicios", "Productos"];

function SalesPanel() {
  const fecha = new Date();
  let year = fecha.getFullYear().toString();
  let month = (fecha.getMonth() + 1).toString();
  let day = fecha.getDate().toString();
  const [date, setDate] = useState(
    parseDate(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`)
  );
  // const [earningsEstablishment, setEarningsEstablishment] = useState(0);
  // const [earningsArtist, setEarningsArtist] = useState(0);
  const [module, setModule] = useState("Servicios");
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  // const [earningsProducts, setEarningsProducts] = useState(0);
  // const columnsProducts = ["Precio", "Cantidad", "Metodo de pago", "Productos"];
  // const columnsServices = ["Precio", "Ganancia", "Profesional", "Servicios"];
  // const establishmentId = Cookies.get("establishmentId");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const day = date.toDate().getDate();
  //     const month = date.toDate().getMonth() + 1;
  //     const year = date.toDate().getFullYear();
  //     const response = await axios.get(
  //       `http://localhost:8000/establisment/get-filter-payments-service/${establishmentId}/`,
  //       {
  //         params: {
  //           day: day,
  //           month: month,
  //           year: year,
  //         },
  //       }
  //     );
  //     console.log(response.data);
  //     setEarningsArtist(response.data.ganancia_employee);
  //     setEarningsEstablishment(response.data.ganancia_establecimiento);
  //     setServices(response.data.appointments_services);
  //   };
  //   fetchData();
  // }, [date]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const day = date.toDate().getDate();
  //     const month = date.toDate().getMonth() + 1;
  //     const year = date.toDate().getFullYear();
  //     const response = await axios.get(
  //       "http://localhost:8000/establisment/get-filter-payments-product/1/",
  //       {
  //         params: {
  //           day: day,
  //           month: month,
  //           year: year,
  //         },
  //       }
  //     );
  //     setEarningsProducts(response.data.ganancia_establecimiento);
  //     console.log(response.data.ganancia_establecimiento);
  //     setProducts(response.data.product_payments);
  //     console.log(response.data.product_payments);
  //   };
  //   fetchData();
  // }, [date]);
  const [isModalNewServiceOpen, setIsModalNewServiceOpen] = useState(false);

  const handleOpen = () => setIsModalNewServiceOpen(true);
  const handleClose = () => setIsModalNewServiceOpen(false);

  return (
    <main className="h-dvh grid grid-rows-[auto_1fr_auto] py-6 gap-4 px-10">
      <header className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-slate-950">Ventas del día</h1>
        <Select
          label="Modulo"
          labelPlacement="inside"
          defaultSelectedKeys={[module]}
          className="max-w-sm"
          classNames={{
            trigger: "p-6",
            listboxWrapper: "max-h-[400px]",
          }}
          variant="bordered"
        >
          {items.map((item) => (
            <SelectItem key={item} onClick={() => setModule(item)}>
              {item}
            </SelectItem>
          ))}
        </Select>
        <DatePicker
          value={date}
          onChange={setDate}
          label="Fecha"
          className="max-w-[200px] font-semibold"
          variant="bordered"
        />
      </header>
      <section className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="flex flex-row gap-6">
            <h2 className="text-xl font-semibold text-slate-950">Resumen</h2>
            <p className="text-xl font-semibold text-slate-950">
              {module === "Servicios"
                ? `Cantidad: ${services.length}`
                : `Cantidad: ${products.length}`}
            </p>
          </div>
          {module === "Servicios" ? (
            <>
              <ButtonCustom name={"Crear cita"} primary action={handleOpen} />
              <ModalCreateAppointment
                isOpen={isModalNewServiceOpen}
                onClose={handleClose}
              />
            </>
          ) : (
            <ButtonCustom
              name={"Crear venta"}
              primary
              action={() => {
                alert("Crear una venta");
              }}
            />
          )}
        </div>
        {/* {<div>
          {module === "Servicios" ? (
            <>
              {services.length === 0 ? (
                <p className="text-lg font-medium text-slate-500">
                  No hay ventas en esta fecha
                </p>
              ) : (
                <>
                  <ul className="grid items-start grid-cols-4 gap-2 py-4 mr-6 px-8">
                    {columnsServices.map((column) => (
                      <li
                        key={column}
                        className="font-semibold text-slate-950 text-lg"
                      >
                        {column}
                      </li>
                    ))}
                  </ul>
                  <PaymentServicesList paymentServices={services} />
                </>
              )}
            </>
          ) : (
            <>
              {products.length === 0 ? (
                <p className="text-lg font-medium text-slate-500">
                  No hay ventas en esta fecha
                </p>
              ) : (
                <>
                  <ul className="grid items-start grid-cols-4 gap-2 py-4 mr-6 px-8">
                    {columnsProducts.map((column) => (
                      <li
                        key={column}
                        className="font-semibold text-slate-950 text-lg"
                      >
                        {column}
                      </li>
                    ))}
                  </ul>
                  <PaymentProductList paymentProducts={products} />
                </>
              )}
            </>
          )}
        </div>} */}
      </section>
      <footer className="flex gap-10 items-end">
        <p className="font-semibold text-2xl">Ganancias totales del día: </p>
      </footer>
    </main>
  );
}

export default SalesPanel;

import { Select, SelectItem, DatePicker } from "@nextui-org/react";
import { useEffect, useState } from "react";
import EarningsSummaryServices from "../../components/finances/EarningsSummaryServices";
import EarningsSummaryProducts from "../../components/finances/EarningsSummaryProducts";
import PaymentServicesList from "../../components/finances/PaymentServicesList";
import PaymentProductList from "../../components/finances/PaymentProductsList";
import { parseDate } from "@internationalized/date";
import axios from "axios";
import Cookies from "js-cookie";
const items = ["Servicios", "Productos"];

function FinancePanel() {
  const fecha = new Date();
  let year = fecha.getFullYear().toString();
  let month = (fecha.getMonth() + 1).toString();
  let day = fecha.getDate().toString();
  const [date, setDate] = useState(
    parseDate(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`)
  );
  const [earningsEstablishment, setEarningsEstablishment] = useState(0);
  const [earningsArtist, setEarningsArtist] = useState(0);
  const [earningsMonthly, setEarningsMonthly] = useState(0);
  const [earningsProductsMonthly, setEarningsProductsMonthly] = useState(0);
  const [module, setModule] = useState("Servicios");
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [earningsProducts, setEarningsProducts] = useState(0);
  const columnsProducts = ["Precio", "Cantidad", "Comprador", "Productos"];
  const columnsServices = ["Precio", "Ganancia", "Profesional", "Servicios"];
  const establishmentId = Cookies.get("establishmentId");

  useEffect(() => {
    const fetchData = async () => {
      const day = date.toDate().getDate();
      const month = date.toDate().getMonth() + 1;
      const year = date.toDate().getFullYear();
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/establisment/get-filter-payments-service/${establishmentId}/`,
        {
          params: {
            day: day,
            month: month,
            year: year,
          },
        }
      );
      console.log(response.data);
      setEarningsArtist(response.data.ganancia_employee);
      setEarningsEstablishment(response.data.ganancia_establecimiento);
      setServices(response.data.appointments_services);
      setEarningsMonthly(response.data.ganancias_meses);
    };
    fetchData();
  }, [date]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const day = date.toDate().getDate();
        const month = date.toDate().getMonth() + 1;
        const year = date.toDate().getFullYear();
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/receptionist/products_sold/`,
          {
            params: {
              day: day,
              month: month,
              year: year,
              id_establisment: establishmentId,
            },
          }
        );
        console.log(response.data);
        setEarningsProducts(response.data.total);
        setProducts(response.data.products);
        setEarningsProductsMonthly(response.data.ganancias_meses);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [date]);

  return (
    <main className="h-screen flex flex-col py-6 gap-4 px-10">
      <header className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-slate-950">Panel Financiero</h1>
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
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-slate-950">
          Ganancias {module}
        </h2>
        <div>
          {module === "Servicios" ? (
            <EarningsSummaryServices
              earningsEstablishment={earningsEstablishment}
              earningsArtist={earningsArtist}
              earningsMonthly={earningsMonthly}
            />
          ) : (
            <EarningsSummaryProducts earningsProducts={earningsProducts} earningsProductsMonthly={earningsProductsMonthly} />
          )}
        </div>
      </section>
      <section className="flex flex-col gap-2">
        <div className="flex gap-10 items-end">
          <h2 className="text-2xl font-bold text-slate-950">Pagos recibidos</h2>
          <p className="text-2xl font-bold text-slate-950">
            {module === "Servicios"
              ? `Cantidad: ${services.length}`
              : `Cantidad:${products.length}`}
          </p>
        </div>
        <div>
          {module === "Servicios" ? (
            <>
              {services.length === 0 ? (
                <p className="text-lg font-medium text-slate-500">
                  No hay pagos recibidos en esta fecha
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
                  No hay pagos recibidos en esta fecha
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
        </div>
      </section>
    </main>
  );
}

export default FinancePanel;

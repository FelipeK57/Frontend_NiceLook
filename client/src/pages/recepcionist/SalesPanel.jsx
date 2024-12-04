import { Select, SelectItem, DatePicker, Modal } from "@nextui-org/react";
import { useEffect, useState } from "react";
import PaymentServicesList from "../../components/finances/PaymentServicesList";
import PaymentProductList from "../../components/finances/PaymentProductsList";
import { parseDate } from "@internationalized/date";
import axios from "axios";
import Cookies from "js-cookie";
import ButtonCustom from "../../components/global/ButtonCustom";
import ModalCreateAppointment from "../../components/sales/ModalCreateAppointment";
import ModalEmployeePayroll from "../../components/sales/ModalEmployeePayroll";
const items = ["Servicios", "Productos"];

function SalesPanel() {
  const fecha = new Date();
  let year = fecha.getFullYear().toString();
  let month = (fecha.getMonth() + 1).toString();
  let day = fecha.getDate().toString();
  const [date, setDate] = useState(
    parseDate(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`)
  );
  const [earningsEstablishment, setEarningsEstablishment] = useState(0);
  const [module, setModule] = useState("Servicios");
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [earningsProducts, setEarningsProducts] = useState(0);
  const columnsProducts = ["Precio", "Cantidad", "Comprador", "Productos"];
  const columnsServices = ["Precio", "Ganancia", "Profesional", "Servicios"];
  const establishmentId = Cookies.get("establishmentId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const day = date.toDate().getDate();
        const month = date.toDate().getMonth() + 1;
        const year = date.toDate().getFullYear();
        const response = await axios.get(
          `http://localhost:8000/receptionist/products_sold/`,
          {
            params: {
              id_establisment: establishmentId,
              day: day,
              month: month,
              year: year,
            },
          }
        );
        console.log(response.data.products);
        console.log(response.data.total);
        setEarningsProducts(response.data.total);
        setProducts(response.data.products);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [date]);

  useEffect(() => {
    const fetchData = async () => {
      const day = date.toDate().getDate();
      const month = date.toDate().getMonth() + 1;
      const year = date.toDate().getFullYear();
      const response = await axios.get(
        `http://localhost:8000/establisment/get-filter-payments-service/${establishmentId}/`,
        {
          params: {
            day: day,
            month: month,
            year: year,
          },
        }
      );
      console.log(response.data);
      setEarningsEstablishment(response.data.ganancia_establecimiento);
      setServices(response.data.appointments_services);
    };
    fetchData();
  }, [date]);

  const [isModalNewServiceOpen, setIsModalNewServiceOpen] = useState(false);
  const [isModalPayrollOpen, setIsModalPayrollOpen] = useState(false);

  const handleOpen = () => setIsModalNewServiceOpen(true);
  const handleClose = () => setIsModalNewServiceOpen(false);

  const handleOpenPayroll = () => setIsModalPayrollOpen(true);
  const handleClosePayroll = () => setIsModalPayrollOpen(false);

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
          </div>{" "}
           {/* {module === "Servicios" ? (
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
          )} */}
        </div>
        {
          <div>
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
          </div>
        }
      </section>
      <footer className="flex justify-between items-end">
        {module === "Servicios" ? (
          <>
            <p className="font-semibold text-2xl">
              Ganancias totales del día: ${earningsEstablishment}
            </p>
            <div className="flex flex-col gap-4">
              <ButtonCustom
                classStyles={"py-5"}
                name={"Generar nómina"}
                primary
                action={handleOpenPayroll}
              />
              <ModalEmployeePayroll
                isOpen={isModalPayrollOpen}
                onClose={handleClosePayroll}
                day={date.toDate().getDate()}
                month={date.toDate().getMonth() + 1}
                year={date.toDate().getFullYear()}
              />
            </div>
          </>
        ) : (
          <p className="font-semibold text-2xl">
            Ganancias totales del día: ${earningsProducts}
          </p>
        )}
      </footer>
    </main>
  );
}

export default SalesPanel;

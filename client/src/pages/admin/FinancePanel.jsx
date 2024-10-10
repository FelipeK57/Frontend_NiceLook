import { Select, SelectItem, DatePicker } from "@nextui-org/react";
import { useEffect, useState } from "react";
import EarningsSummaryServices from "../../components/finances/EarningsSummaryServices";
import EarningsSummaryProducts from "../../components/finances/EarningsSummaryProducts";
import PaymentServicesList from "../../components/finances/PaymentServicesList";
import PaymentProductList from "../../components/finances/PaymentProductsList";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import axios from "axios";
const items = ["Servicios", "Productos"];

function FinancePanel() {
  const fecha = new Date();
  let year = fecha.getFullYear().toString();
  let month = (fecha.getMonth() + 1).toString();
  let day = fecha.getDate().toString();
  const [date, setDate] = useState(
    parseDate(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`)
  );
  console.log(date);
  const [earningsEstablishment, setEarningsEstablishment] = useState(0);
  const [earningsArtist, setEarningsArtist] = useState(0);
  const [module, setModule] = useState("Servicios");
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const columnsProducts = [
    "Precio",
    "Cantidad",
    "Hora",
    "Metodo de pago",
    "Productos",
  ];
  const columnsServices = [
    "Precio",
    "Ganancia",
    "Profesional",
    "Servicios",
  ];
  const paymentServices = [
    {
      id: 1,
      price: 30000,
      earning: 3000,
      profesional: "Fernando Castaño",
      hour: "7:30",
      services: ["Corte de pelo", "Tinte de pelo"],
    },
    {
      id: 2,
      price: 25000,
      earning: 2500,
      profesional: "Laura Gómez",
      hour: "9:00",
      services: ["Manicura", "Pedicura", "Exfoliación"],
    },
    {
      id: 3,
      price: 50000,
      earning: 5000,
      profesional: "Carlos Pérez",
      hour: "11:00",
      services: ["Masaje de cuerpo completo", "Aromaterapia"],
    },
    {
      id: 4,
      price: 45000,
      earning: 4500,
      profesional: "María López",
      hour: "14:30",
      services: ["Tinte completo", "Mechas"],
    },
    {
      id: 5,
      price: 20000,
      earning: 2000,
      profesional: "Juan Rodríguez",
      hour: "16:00",
      services: ["Corte de pelo", "Lavado"],
    },
    {
      id: 6,
      price: 35000,
      earning: 3500,
      profesional: "Ana Martínez",
      hour: "18:00",
      services: ["Limpieza facial", "Exfoliación", "Hidratación"],
    },
    /*************  ✨ Codeium Command 🌟  *************/
  ];

  const paymentProducts = [
    {
      id: 1,
      price: 25000,
      quantity: 2,
      hour: "7:30",
      paymentMethod: "Efectivo",
      products: ["Shampoo", "Crema de cabello"],
    },
    {
      id: 2,
      price: 40000,
      quantity: 1,
      hour: "9:00",
      paymentMethod: "Tarjeta de crédito",
      products: ["Acondicionador", "Aceite de argán"],
    },
    {
      id: 3,
      price: 15000,
      quantity: 3,
      hour: "11:30",
      paymentMethod: "Efectivo",
      products: ["Gel para el cabello", "Cera moldeadora"],
    },
    {
      id: 4,
      price: 60000,
      quantity: 4,
      hour: "14:00",
      paymentMethod: "Transferencia bancaria",
      products: ["Mascarilla capilar", "Sérum capilar"],
    },
    {
      id: 5,
      price: 30000,
      quantity: 2,
      hour: "16:30",
      paymentMethod: "Tarjeta de débito",
      products: ["Spray fijador", "Mousse para el cabello"],
    },
    {
      id: 6,
      price: 20000,
      quantity: 1,
      hour: "18:00",
      paymentMethod: "Efectivo",
      products: ["Peine", "Cepillo redondo"],
    },
    {
      id: 7,
      price: 50000,
      quantity: 5,
      hour: "20:30",
      paymentMethod: "Transferencia bancaria",
      products: ["Corte de pelo", "Tinte de pelo"],
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const day = date.toDate().getDate();
      const month = date.toDate().getMonth() + 1;
      const year = date.toDate().getFullYear();
      const response = await axios.get(
        "http://localhost:8000/establisment/get-filter-payments-service/1/",
        {
          params: {
            day: day,
            month: month,
            year: year,
          },
        }
      );
      console.log(response.data.ganancia_establecimiento);
      console.log(response.data.ganancia_employee);
      setEarningsArtist(response.data.ganancia_employee);
      setEarningsEstablishment(response.data.ganancia_establecimiento);
      console.log(response.data.appointments_services);
      setServices(response.data.appointments_services);
    };
    fetchData();
  }, [date]);

  return (
    <main className="h-screen flex flex-col py-8 gap-6 px-10">
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
          className="max-w-[280px] font-semibold"
          variant="bordered"
        />
      </header>
      <section className="flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-slate-950">
          Ganancias {module}
        </h2>
        <div>
          {module === "Servicios" ? (
            <EarningsSummaryServices
              earningsEstablishment={earningsEstablishment}
              earningsArtist={earningsArtist}
            />
          ) : (
            <EarningsSummaryProducts earningsProducts={1294000} />
          )}
        </div>
      </section>
      <section className="flex flex-col gap-6">
        <div className="flex gap-10 items-end">
          <h2 className="text-3xl font-bold text-slate-950">Pagos recibidos</h2>
          <p className="text-3xl font-bold text-slate-950">
            {module === "Servicios"
              ? `Cantidad: ${services.length}`
              : `Cantidad:${paymentProducts.length}`}
          </p>
        </div>
        <div>
          {module === "Servicios" ? (
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
          ) : (
            <>
              <ul className="grid items-start grid-cols-5 gap-2 py-4 mr-6 px-8">
                {columnsProducts.map((column) => (
                  <li
                    key={column}
                    className="font-semibold text-slate-950 text-lg"
                  >
                    {column}
                  </li>
                ))}
              </ul>
              <PaymentProductList paymentProducts={paymentProducts} />
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export default FinancePanel;

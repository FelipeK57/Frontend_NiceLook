import { Select, SelectItem, DatePicker } from "@nextui-org/react";
import { useState } from "react";
import EarningsSummaryServices from "../../components/finances/EarningsSummaryServices";
import EarningsSummaryProducts from "../../components/finances/EarningsSummaryProducts";
import PaymentServicesList from "../../components/finances/PaymentServicesList";
import PaymentProductList from "../../components/finances/PaymentProductsList";
const items = ["Servicios", "Productos"];
function FinancePanel() {
  const [module, setModule] = useState("Servicios");
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
    "Hora",
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
              earningsEstablishment={1294000}
              earningsArtist={849200}
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
              ? `Cantidad: ${paymentServices.length}`
              : `Cantidad:${paymentProducts.length}`}
          </p>
        </div>
        <div>
          {module === "Servicios" ? (
            <>
              <ul className="grid items-start grid-cols-5 gap-2 py-4 mr-6 px-8">
                {columnsServices.map((column) => (
                  <li
                    key={column}
                    className="font-semibold text-slate-950 text-lg"
                  >
                    {column}
                  </li>
                ))}
              </ul>
              <PaymentServicesList paymentServices={paymentServices} />
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

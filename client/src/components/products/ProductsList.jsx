import { lazy, Suspense, useEffect, useState } from "react";
import api from "@/api";
import Cookies from "js-cookie";

const Product = lazy(() => import("./Product"));

const Loading = () => <div>Cargando...</div>;

export default function ProductsList() {
  const [establishmentId, setEstablishmentId] = useState(undefined);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setEstablishmentId(Cookies.get("establishmentId"));

    const fetchProducts = async () => {
      await api
        .get("/Product/getAll/", {
          params: {
            id_establisment: establishmentId,
          },
        })
        .then((response) => {
          setProducts(response.data.products);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchProducts();
    window.addEventListener("fetch-products", fetchProducts);
    return () => {
      window.removeEventListener("fetch-products", fetchProducts);
    };
  }, [establishmentId]);

  return (
    <article className="border-t-2 border-slate-950 pt-2">
      <div className="EmployeesListHeader grid pr-16 grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_0.15fr] py-2 ">
        <h2 className="font-semibold text-center">Código</h2>
        <h2 className="font-semibold text-center">Nombre</h2>
        <h2 className="font-semibold text-center">Cantidad</h2>
        <h2 className="font-semibold text-center">Estado</h2>
        <h2 className="font-semibold text-center">Marca</h2>
        <h2 className="font-semibold text-center">Precio</h2>
        <h2 className="font-semibold text-center">Distribuidor</h2>
      </div>
      <div
        className="ProductsListConstent flex flex-col gap-2 overflow-y-auto max-h-[80vh]  
            scrollbar scrollbar-thumb-slate-200  scrollbar-thumb-rounded-full scrollbar-track-rounded-full active:scrollbar-thumb-primary hover:scrollbar-thumb-slate-300"
      >
        {/* Este es el componente de producto cargado de forma perezosa el cual recibe el numero de columnas si tiene o no un boton y el estado */}
        {/* Recordar que si se pone el button se debe agregar una columna de 0.15fr para el mismo */}

        {products.map((product) => (
          <Suspense key={product.id} fallback={<Loading />}>
            <Product
              colNumber={"[1fr_1fr_1fr_1fr_1fr_1fr_1fr_0.15fr]"}
              button
              estado={product.estate}
              productData={product}
            />
          </Suspense>
        ))}
      </div>
    </article>
  );
}

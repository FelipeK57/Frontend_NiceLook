/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { useDisclosure } from "@nextui-org/react";
import useMediaQuery from "../../hooks/UseMediaQuery";
// import ManageProductDrawer from "../../components/products/ManageProductDrawer";
import ManageProductModal from "../../components/products/ManageProductModal";

import { Input } from "@nextui-org/react";
import ButtonCustom from "../../components/global/ButtonCustom";
import SearchIcon from "../../components/icons/SearchIcon";
import ProductsList from "@/components/products/ProductsList";
import { Plus } from "lucide-react";

/**
 * Componente DebounceInput que proporciona un campo de entrada con funcionalidad de debounce.
 *
 * @param {function} handleDebounce - Función a ejecutar después del retraso establecido.
 * @param {number} debounceTimeout - Tiempo de retraso en milisegundos antes de ejecutar la función.
 * @param {...any} rest - Propiedades adicionales que se pasarán al componente Input.
 * @returns {JSX.Element} Elemento Input con funcionalidad de debounce.
 */
function DebounceInput({ handleDebounce, debounceTimeout, ...rest }) {
  const timerRef = useRef();

  const handleChange = (event) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      handleDebounce(event.target.value);
    }, debounceTimeout);
  };

  return <Input {...rest} onChange={handleChange} />;
}

/**
 * Componente para la gestión de productos en el panel de administración.
 *
 * @component
 * @returns {JSX.Element} Página de gestión de productos con funcionalidades de búsqueda y creación
 *
 * @example
 * ```jsx
 * <ProductsManagement />
 * ```
 *
 * @description
 * Este componente renderiza una página que permite:
 * - Visualizar una lista de productos
 * - Buscar productos mediante un campo de búsqueda con debounce
 * - Crear nuevos productos a través de un modal
 *
 * @state
 * - query {string} - Estado para almacenar el término de búsqueda
 * - backdrop {string} - Estado para controlar el efecto de fondo del modal
 *
 * @uses
 * - useDisclosure - Hook para controlar el estado del modal
 * - useMediaQuery - Hook para detectar el tamaño de pantalla
 */
export default function ProductsManagement() {
  const [query, setQuery] = useState("");
  const [backdrop, setBackdrop] = useState("blur");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleOpenModal = () => {
    setBackdrop("blur");
    onOpen();
  };

  const handleDebounce = (value) => {
    setQuery(value);
  };

  return (
    <>
      <section className="flex flex-col w-full gap-6 py-8 px-10">
        <div className="EmplyeesManagementheader flex justify-between pb-2">
          <h1 className="text-4xl text-zinc-950 font-bold">
            Gestión de productos
          </h1>
          <div className="EmployeesManagementHeaderButtons flex gap-4">
            <DebounceInput
              defaultValue={query}
              placeholder="Buscar"
              variant="bordered"
              classNames={{
                label: "",
                input: [],
                innerWrapper: "",
                inputWrapper: ["border-2", "border-slate-200", "px-6", "py-5"],
              }}
              endContent={<SearchIcon />}
              debounceTimeout={500}
              handleDebounce={handleDebounce}
            />
            <ButtonCustom
              primary
              startContent={<Plus />}
              name="Nuevo producto"
              classStyles="w-60"
              onClick={handleOpenModal}
            />
            <ManageProductModal
              isOpen={isOpen}
              onClose={onClose}
              backdrop={backdrop}
              size={isDesktop ? "5xl" : "full"}
            />
          </div>
        </div>
        <section className="ProductsManagementBody">
          <ProductsList query={query} />
        </section>
      </section>
    </>
  );
}

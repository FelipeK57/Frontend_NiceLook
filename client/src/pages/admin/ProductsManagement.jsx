import { useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import useMediaQuery from "../../hooks/UseMediaQuery";
// import ManageProductDrawer from "../../components/products/ManageProductDrawer";
import ManageProductModal from "../../components/products/ManageProductModal";

import { Input } from "@nextui-org/react";
import ButtonCustom from "../../components/global/ButtonCustom";
import SearchIcon from "../../components/icons/SearchIcon";
import ProductsList from "@/components/products/ProductsList";
import { Plus } from "lucide-react";

export default function ProductsManagement() {
  const [backdrop, setBackdrop] = useState("blur");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleOpenModal = () => {
    setBackdrop("blur");
    onOpen();
  };

  return (
    <>
      <section className="flex flex-col w-full gap-6 py-8 px-10">
        <div className="EmplyeesManagementheader flex justify-between pb-2">
          <h1 className="text-4xl text-zinc-950 font-bold">
            Gestión de productos
          </h1>
          <div className="EmployeesManagementHeaderButtons flex gap-4">
            <Input
              placeholder="Buscar"
              variant="bordered"
              classNames={{
                label: "",
                input: [],
                innerWrapper: "",
                inputWrapper: ["border-2", "border-slate-200", "px-6", "py-5"],
              }}
              endContent={<SearchIcon />}
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
          <ProductsList />
        </section>
      </section>
    </>
  );
}

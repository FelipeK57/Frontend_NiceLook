/* eslint-disable react/prop-types */
import { useState } from "react";

// import { useDisclosure } from "@nextui-org/react";
import { Chip } from "@nextui-org/chip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Ellipsis, Pencil, Trash2 as Trash } from "lucide-react";

import useMediaQuery from "../../hooks/UseMediaQuery";
import ManageProductModal from "./ManageProductModal";
import DeleteProductModal from "./DeleteProductModal";

function ProductOptions({ handleOpenEdit, handleOpenDelete }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis className="w-10 p-2 h-auto rounded-full border-2" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer" onClick={handleOpenEdit}>
          <Pencil />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem
          // asChild
          className="text-danger focus:bg-danger-50 focus:text-danger cursor-pointer"
          onClick={handleOpenDelete}
        >
          {/* <ButtonCustom color="danger" variant="flat" radius="none" classStyles="w-full"> */}
          <Trash />
          Eliminar
          {/* </ButtonCustom> */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Product({ colNumber, button, productData }) {
  const [backdrop, setBackdrop] = useState("blur");
  // const { isOpen, onOpen, onClose } = useDisclosure();

  const [activeModal, setActiveModal] = useState(null);

  const handleOpenEdit = () => {
    setBackdrop("blur");
    setActiveModal("edit");
  };
  const handleOpenDelete = () => {
    setBackdrop("blur");
    setActiveModal("delete");
  };

  const handleClose = () => setActiveModal(null);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div
      className={`ProductContent border-2 border-slate-200 rounded-full py-2 grid pr-10 place-items-center
        grid-cols-${colNumber}`}
    >
      <h3 className="font-bold text-center">{productData.code}</h3>
      <h3 className="text-center flex">{productData.name}</h3>
      <h3 className="text-center flex">{productData.quantity}</h3>
      <Chip
        color={productData.estate === true ? "success" : "danger"}
        variant="flat"
      >
        {productData.estate === true ? "A la venta" : "Inactivo"}
      </Chip>
      <h3 className="text-center flex">{productData.brand}</h3>
      <h3 className="text-center flex">
        ${productData.price.toLocaleString()}
      </h3>
      <h3 className="text-center flex">{productData.distributor}</h3>
      {button ? (
        <ProductOptions
          productData={productData}
          handleOpenEdit={handleOpenEdit}
          handleOpenDelete={handleOpenDelete}
        />
      ) : null}
      <ManageProductModal
        isOpen={activeModal === "edit"}
        onClose={handleClose}
        backdrop={backdrop}
        isEditing
        product={productData}
        size={!isDesktop ? "full" : "5xl"}
      />
      <DeleteProductModal
        isOpen={activeModal === "delete"}
        onClose={handleClose}
        backdrop={backdrop}
        product={productData}
        size={!isDesktop ? "full" : "2xl"}
      />
    </div>
  );
}

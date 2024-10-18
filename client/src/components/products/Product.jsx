/* eslint-disable react/prop-types */
import ButtonCustom from "../global/ButtonCustom";
import useMediaQuery from "../../hooks/UseMediaQuery";
import { useDisclosure } from "@nextui-org/react";
import { Chip } from "@nextui-org/chip";
import { useMemo, useState } from "react";
import ManageProductDrawer from "./ManageProductDrawer";
import ManageProductModal from "./ManageProductModal";

export default function Product({ colNumber, button, productData }) {
  const [open, setOpen] = useState(false);
  const [backdrop, setBackdrop] = useState("blur");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleOpen = () => {
    setBackdrop("blur");
    onOpen();
  };

  useMemo(() => {
    console.log("Product props", productData.estate);
  }, [productData]);

  return (
    <div
      className={`ProductContent border-2 border-slate-200 rounded-full py-2 grid pr-10 place-items-center
        grid-cols-${colNumber}`}
    >
      <h3 className="font-bold text-center">{productData.code}</h3>
      <h3 className="text-center flex">{productData.name}</h3>
      <h3 className="text-center flex">{productData.quantity}</h3>
      <Chip
        color={productData.estate === true ? "success" : "error"}
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
        !isDesktop ? (
          <ManageProductDrawer
            isOpen={open}
            setIsOpen={setOpen}
            productData={productData}
          >
            <ButtonCustom secondary radius="full" isIconOnly>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </ButtonCustom>
          </ManageProductDrawer>
        ) : (
          <ButtonCustom secondary radius="full" isIconOnly onClick={handleOpen}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </ButtonCustom>
        )
      ) : null}
      <ManageProductModal
        isOpen={isOpen}
        onClose={onClose}
        backdrop={backdrop}
        isEditing
        product={productData}
      />
    </div>
  );
}

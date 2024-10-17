/* eslint-disable react/prop-types */
import ButtonCustom from "../global/ButtonCustom";
import useMediaQuery from "../../hooks/UseMediaQuery";
import { useDisclosure } from "@nextui-org/react";
import { Chip } from "@nextui-org/chip";
import { useState } from "react";
import ManageProductDrawer from "./ManageProductDrawer";
import ManageProductModal from "./ManageProductModal";

export default function Product({ colNumber, button, estado }) {
  const [open, setOpen] = useState(false);
  const [backdrop, setBackdrop] = useState("blur");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  // const isDesktop = true;

  const handleOpen = () => {
    setBackdrop("blur");
    onOpen();
  };

  return (
    <div
      className={`ProductContent border-2 border-slate-200 rounded-full py-2 grid pr-10 place-items-center
        grid-cols-${colNumber}`}
      z
    >
      <h3 className=" font-bold text-center">112356</h3>
      <h3 className="text-center flex">Nombre</h3>
      <h3 className="text-center flex">2</h3>
      <Chip color="success" variant="flat">
        Activo
      </Chip>
      <h3 className="text-center flex">Gucci</h3>
      <h3 className="text-center flex">$1.000</h3>
      <h3 className="text-center flex">Cuerpo y alma</h3>
      {button ? (
        !isDesktop ? (
          <ManageProductDrawer
            isOpen={open}
            setIsOpen={setOpen}
            // backdrop={backdrop}
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
      />
    </div>
  );
}

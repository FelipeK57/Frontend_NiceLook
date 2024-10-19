/* eslint-disable react/prop-types */
// import { useMemo } from "react";

import {
  // Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import ManageProduct from "./ManageProduct";

export default function ManageProductModal({ isEditing, product, ...props }) {
  // useMemo(() => {
  //   console.log("ManageProductModal props", props);
  // }, [props]);

  return (
    <Modal {...props}>
      <ModalContent className="w-full">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h2 className="text-4xl text-zinc-950 font-bold">
                {!isEditing ? "Crear" : "Editar"} producto
              </h2>
            </ModalHeader>
            <ModalBody className="py-0">
              <ManageProduct
                onClose={onClose}
                isEditing={isEditing}
                product={product}
              />
            </ModalBody>
            <ModalFooter>
              {/* <Button color="danger" variant="light" onPress={onClose}>
                Cancelar
              </Button>
              <Button color="primary" onPress={onClose}>
                Crear
              </Button> */}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

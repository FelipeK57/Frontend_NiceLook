/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import ButtonCustom from "../global/ButtonCustom";

import api from "@/api";

export default function DeleteProductModal({ product, ...props }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async (product, onClose) => {
    setLoading(true);

    await api
      .delete("/Product/delete/", {
        params: { product_id: product.id },
      })
      .then(() => {
        window.dispatchEvent(new Event("fetch-products"));
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
        onClose();
      });
  };

  return (
    <>
      <Modal {...props}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h2 className="text-4xl text-zinc-950 font-bold">
                  Eliminar producto
                </h2>
              </ModalHeader>
              <ModalBody>
                <p>
                  Está a punto de eliminar el producto, esta acción no se puede
                  deshacer.
                </p>
              </ModalBody>
              <ModalFooter>
                <ButtonCustom variant="bordered" onPress={onClose}>
                  Cancelar
                </ButtonCustom>
                <ButtonCustom
                  color="danger"
                  onClick={() => handleDelete(product, onClose)}
                  isLoading={loading}
                >
                  {loading ? "Eliminando" : "Eliminar"}
                </ButtonCustom>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

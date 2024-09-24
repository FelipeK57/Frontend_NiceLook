import { Button } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import EditService from "./EditService";
import { useState } from "react";

function Service() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState("blur");
  const handleOpen = () => {
    setBackdrop("blur");
    onOpen();
  };
  return (
    <article
      className="flex border-2 border-slate-200 rounded-xl gap-4
     p-4"
    >
      <div className="w-1/6 h-[100px] rounded-lg bg-slate-300"></div>
      <div className="flex justify-between w-5/6">
        <div className="flex flex-col justify-between">
          <h1 className="text-xl font-bold">Corte de Cabello</h1>
          <p className="text-zinc-500">Precio: $100</p>
          <p className="text-zinc-500">Comisión: 10%</p>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex gap-4">
            <p className="text-green-500 font-semibold">Activo</p>
            <p className="font-semibold">{"4.5/5⭐(112)"}</p>
          </div>
          <div className="flex gap-2">
            <Button
              onPress={() => handleOpen()}
              className="font-semibold border-2 border-slate-200 rounded-xl bg-transparent"
            >
              Editar
            </Button>
            <Button className="font-semibold text-red-500 rounded-xl bg-transparent">
              Eliminar
            </Button>
          </div>
        </div>
      </div>
      <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem
                  eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </article>
  );
}

export default Service;

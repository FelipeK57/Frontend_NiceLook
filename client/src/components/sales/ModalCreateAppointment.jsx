import ButtonCustom from "../../components/global/ButtonCustom";
import { Button } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { useState } from "react";
import SelectCategorie from "../services/SelectCategorie";
import InputCustom from "../global/InputCustom";

function ModalCreateAppointment({ isOpen, onClose }) {
  const [category, setCategory] = useState("");
  const handleCloseModal = () => {
    setCategory("");
    onClose();
  };

  return (
    <Modal size="lg" backdrop="blur" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h1 className="text-4xl font-bold">Inicia sesión</h1>
        </ModalHeader>
        <ModalBody>
          <InputCustom label="Correo Electronico" placeholder={"ejemplo@gmail.com"}isInvalid={true} errorMessage={"Debes ingresar un correo valido, ejemplo: micorreo@gmail.com"} />
        </ModalBody>
        <ModalFooter>
          {/* Modal Footer Buttons */}
          <Button color="default" variant="light" onPress={handleCloseModal}>
            Crear cuenta
          </Button>
          <ButtonCustom name="Siguiente" primary />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalCreateAppointment;

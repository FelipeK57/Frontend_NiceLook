import ButtonCustom from "../../components/global/ButtonCustom";
import { Button } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import CreateAppointmentForm from "./CreateAppointmentForm";
import { useState } from "react";

function ModalCreateAppointment({ isOpen, onClose }) {
  const [category, setCategory] = useState("");

  const handleCloseModal = () => {
    onClose();
    setCategory("");
  };

  return (
    <Modal size="sm" backdrop="blur" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h1 className="text-4xl font-bold">Crear una cita</h1>
          <p className="text-slate-500 text-base font-medium">
            Por favor llena todos los campos
          </p>
        </ModalHeader>
        <ModalBody>
          <CreateAppointmentForm
            setCategory={setCategory}
            category={category}
          />
        </ModalBody>
        <ModalFooter>
          {/* Modal Footer Buttons */}
          <Button color="danger" variant="light" onPress={handleCloseModal}>
            Cancelar
          </Button>
          <ButtonCustom name="Crear" primary />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalCreateAppointment;

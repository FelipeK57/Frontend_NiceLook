import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import ButtonCustom from "../global/ButtonCustom";

function SuccessModal({ isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      backdrop="blur"
      placement="cemter"
      size="sm"
      className="p-4"
    >
      <ModalContent>
        <ModalHeader className="flex items-center flex-col gap-2 justify-center text-3xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-14"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          Cita reservada
        </ModalHeader>
        <ModalBody>
          <p className="text-start text-medium">
            Tu cita ha sido reservada con éxito, te hemos enviado un correo
            electronico con los detalles de la cita. ¡No olvides asistir!
          </p>
        </ModalBody>
        <ModalFooter className="flex items-center justify-center">
          <ButtonCustom name={"Vale"} primary action={onClose} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default SuccessModal;

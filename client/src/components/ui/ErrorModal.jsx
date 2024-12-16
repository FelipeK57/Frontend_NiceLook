import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import ButtonCustom from "../global/ButtonCustom";

function ErrorModal({ isOpen, onClose, error }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      backdrop="blur"
      placement="center"
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
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          Ocurrio un problema
        </ModalHeader>
        <ModalBody className="flex flex-col gap-2 text-start text-medium">
          <p>
            Tu solicitud no pudo ser procesada correctamente por esta razón:{" "}<span className="font-bold">
            {error}</span>
          </p>
          <p className="text-sm">
            *Recuerda revisar el horario y disponibilidad del Artista para agendar tu cita sin problemas*
          </p>
        </ModalBody>
        <ModalFooter className="flex items-center justify-center">
          <ButtonCustom name={"Vale"} primary action={onClose} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ErrorModal;

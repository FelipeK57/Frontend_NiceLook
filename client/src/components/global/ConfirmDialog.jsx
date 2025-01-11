import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  buttonText,
}) => {
  return (
    <Modal size="sm" placement="center" className="mx-5" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
        <ModalBody>
          <p className="text-sm font-medium">{message}</p>
        </ModalBody>
        <ModalFooter className="flex flex-row w-full mx-auto justify-center">
          <Button size="sm" className="font-semibold" color="default" variant="light" onPress={onClose}>
            Cancelar
          </Button>
          <Button size="sm" className="font-semibold" color="danger" onPress={onConfirm}>
            {buttonText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

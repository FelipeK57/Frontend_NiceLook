import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import ButtonCustom from "../global/ButtonCustom";

export const ViewDate = ({ color, day }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onPress={onOpen}
        isIconOnly
        className={`rounded-full py-1 px-3 font-medium 2xl:font-semibold 2xl:text-medium flex items-center justify-center xl:w-1/5 xl:mx-auto ${color}`}
      >
        {day}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h1>Visualizar fecha</h1>
              </ModalHeader>
              <ModalBody>La fecha es: {day}</ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  className="font-semibold"
                  variant="light"
                  onPress={onClose}
                >
                  Cancelar
                </Button>
                <ButtonCustom primary action={onClose} name="Guardar" />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

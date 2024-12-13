import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  RangeCalendar,
  useDisclosure,
} from "@nextui-org/react";
import ButtonCustom from "../global/ButtonCustom";

export const AddException = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <ButtonCustom secondary name={"Agregar excepción"} action={onOpen} />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h1 className="font-bold text-xl">Agregar Excepción</h1>
              </ModalHeader>
              <ModalBody className="flex flex-col gap-2">
                <p className="font-semibold text-lg">
                  Selecciona el rango o la fecha en la que no vas a trabajar
                </p>
                <RangeCalendar color="danger" />
              </ModalBody>
              <ModalFooter className="flex flex-row gap-4">
                <Button onPress={onClose} color="danger" variant="light">
                  Cancelar
                </Button>
                <ButtonCustom action={onClose} primary name={"Crear"} />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

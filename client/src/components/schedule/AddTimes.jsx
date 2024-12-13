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

export const AddTimes = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <ButtonCustom primary action={onOpen} name={"Agregar horarios"} />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h1 className="font-bold text-xl">Agregar horario</h1>
              </ModalHeader>
              <ModalBody className="flex flex-col gap-2">
                <p className="font-semibold text-lg">
                  Selecciona el rango o la fecha en la que vas a trabajar
                </p>
                <RangeCalendar />
              </ModalBody>
              <ModalFooter className="flex gap-4">
                <Button onPress={onClose} color="danger" variant="light">
                  Cancelar
                </Button>
                <ButtonCustom action={onClose} name={"Crear"} primary />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

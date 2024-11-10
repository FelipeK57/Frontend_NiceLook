import ButtonCustom from "@/components/global/ButtonCustom";
import InputCustom from "@/components/global/InputCustom";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Link,
} from "@nextui-org/react";

function LoginModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Iniciar Sesión
      </Button>
      <Modal isOpen={isOpen} backdrop="blur" onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold">Inicia sesión</h1>
              </ModalHeader>
              <ModalBody className="flex flex-col gap-6">
                <InputCustom
                  label={"Correo electronico"}
                  placeholder={"email@gmail.com"}
                  type={"email"}
                />
                <InputCustom label={"Contraseña"} placeholder={"contraseña"} type={"password"} />
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose} variant="light" color="danger">
                  Cerrar
                </Button>
                <ButtonCustom primary name={"Continuar"} />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default LoginModal;

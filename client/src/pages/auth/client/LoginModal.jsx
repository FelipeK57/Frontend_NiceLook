import ButtonCustom from "@/components/global/ButtonCustom";
import InputCustom from "@/components/global/InputCustom";
import LogoNiceLook from "@/components/ui/LogoNiceLook";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure
} from "@nextui-org/react";

function LoginModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Iniciar Sesión
      </Button>
      <Modal isOpen={isOpen} backdrop="blur" onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold">Inicia sesión en <LogoNiceLook /></h1>
              </ModalHeader>
              <ModalBody className="flex flex-col gap-6">
                <InputCustom
                  label={"Correo electronico*"}
                  placeholder={"Correo electronico"}
                  type={"email"}
                />
                <InputCustom label={"Contraseña*"} placeholder={"Contraseña"} type={"password"} />
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose} variant="light" color="danger">
                  Cerrar
                </Button>
                <ButtonCustom primary name={"Iniciar"} />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default LoginModal;

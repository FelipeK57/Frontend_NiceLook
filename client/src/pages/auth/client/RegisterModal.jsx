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
  useDisclosure,
} from "@nextui-org/react";

function RegisterModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Registrate ahora
      </Button>
      <Modal
        isOpen={isOpen}
        backdrop="blur"
        onOpenChange={onOpenChange}
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold">
                  Registrate en <LogoNiceLook />
                </h1>
              </ModalHeader>
              <ModalBody className="flex flex-col gap-6">
                <InputCustom
                  required
                  label={"Nombre"}
                  placeholder={"Nombre"}
                  type={"text"}
                />
                <InputCustom
                  required
                  label={"Apellido"}
                  placeholder={"Apellido"}
                  type={"text"}
                />
                <InputCustom
                  label={"Número de telefono"}
                  placeholder={"Telefono"}
                  type={"number"}
                />
                <InputCustom
                  required
                  label={"Correo electronico"}
                  placeholder={"Correo electronico"}
                  type={"email"}
                />
                <InputCustom
                  required
                  label={"Contraseña"}
                  placeholder={"Contraseña"}
                  type={"password"}
                />
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose} variant="light" color="danger">
                  Cerrar
                </Button>
                <ButtonCustom primary name={"Registrar"} />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default RegisterModal;

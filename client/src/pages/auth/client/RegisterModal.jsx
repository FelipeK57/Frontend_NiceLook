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
import { GoogleLogin } from "@react-oauth/google";

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
        size="md"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold">
                  Registrate en <LogoNiceLook />
                </h1>
              </ModalHeader>
              <ModalBody className="flex flex-col justify-center items-center gap-6">
                <GoogleLogin />
                <div className="w-full flex flex-row items-center gap-2">
                  <hr className="border-1 w-full border-slate-200" />
                  <p className="text-center font-light min-w-max text-slate-400">
                    o registrate con tu correo
                  </p>
                  <hr className="border-1 w-full border-slate-200" />
                </div>
                <div className="flex flex-row gap-2 w-full">
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
                </div>
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

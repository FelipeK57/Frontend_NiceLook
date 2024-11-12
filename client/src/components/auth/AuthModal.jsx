import useAuthStore from "@/stores/useAuthStore";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import ButtonCustom from "../global/ButtonCustom";
import LoginModal from "@/pages/auth/client/LoginModal";
import RegisterModal from "@/pages/auth/client/RegisterModal";

function AuthModal() {
  const { showModal, login, closeModal } = useAuthStore();

  if (!showModal) return null;

  return (
    <Modal placement="center" isOpen={showModal} onClose={closeModal}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Autenticación Requerida
        </ModalHeader>
        <ModalBody>
          <h2>
            Al parecer no estas autenticado y es necesario que lo hagas para
            realizar algunas acciones, por favor inicia sesión o registrate.
          </h2>
          <LoginModal />
          <div className="w-full flex flex-row items-center gap-2">
            <hr className="border-1 w-full border-slate-200" />
            <p className="text-center text-sm font-light min-w-max text-slate-400">
              o
            </p>
            <hr className="border-1 w-full border-slate-200" />
          </div>
          <RegisterModal />
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AuthModal;

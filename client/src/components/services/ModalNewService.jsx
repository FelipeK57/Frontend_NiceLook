import { Button, Input } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import ButtonCustom from "../global/ButtonCustom";
import DropdownCategories from "./DropdownCategories";
function ModalNewService({ isOpen, onClose }) {
  return (
    <Modal size="xl" backdrop="blur" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h1 className="text-4xl font-bold">Crea un nuevo servicio</h1>
          <p className="text-slate-500 text-base font-medium">
            Por favor llena todos los campos
          </p>
        </ModalHeader>
        <ModalBody>
          <label className="font-semibold text-xl" htmlFor="label">
            Nombre
          </label>
          <Input
            variant="bordered"
            classNames={{
              label: "",
              input: [],
              innerWrapper: "",
              inputWrapper: ["border-2", "border-slate-200", "px-6", "py-5"],
            }}
            placeholder="Nombre servicio"
          />
          <DropdownCategories />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancelar
          </Button>
          <ButtonCustom action={onClose} name="Crear" primary />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalNewService;

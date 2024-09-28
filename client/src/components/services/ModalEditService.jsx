import { Button, Input } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Switch,
} from "@nextui-org/react";
import ButtonCustom from "../global/ButtonCustom";
import SelectCategorie from "./SelectCategorie";

/**
 * ModalEditService component renders a modal for editing a service.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Determines if the modal is open.
 * @param {Function} props.onClose - Function to call when the modal is closed.
 *
 * @returns {JSX.Element} The rendered modal component.
 */
function ModalEditService({ isOpen, onClose }) {
  return (
    <Modal size="xl" backdrop="blur" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h1 className="text-4xl font-bold">Visualiza un nuevo servicio</h1>
          <p className="text-slate-500 text-base font-medium">
            Puedes editar los campos
          </p>
        </ModalHeader>
        <ModalBody>
          <label className="font-semibold text-medium lg:text-xl" htmlFor="nameService">
            Nombre
          </label>
          <Input
            id="nameService"
            variant="bordered"
            classNames={{
              label: "",
              input: [],
              innerWrapper: "",
              inputWrapper: ["border-2", "border-slate-200", "px-6", "py-5"],
            }}
            placeholder="Ejemplo: Corte de Cabello"
          />
          <div className="grid grid-cols-2 gap-6 items-end">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-medium lg:text-xl" htmlFor="priceService">
                Precio
              </label>
              <Input
                id="priceService"
                type="number"
                variant="bordered"
                classNames={{
                  label: "",
                  input: [],
                  innerWrapper: "",
                  inputWrapper: [
                    "border-2",
                    "border-slate-200",
                    "px-6",
                    "py-5",
                  ],
                }}
                placeholder="Ejemplo: 20000"
              />
            </div>
            <div className="flex flex-col gap-2">
              <SelectCategorie />
            </div>
          </div>
          <div className="grid grid-cols-[47%_53%] gap-6 items-end">
            <div className="flex flex-col gap-2">
              <label
                className="font-semibold text-medium lg:text-xl"
                htmlFor="comissionService"
              >
                Comisión establecimiento
              </label>
              <Input
                id="comissionService"
                type="number"
                variant="bordered"
                classNames={{
                  label: "",
                  input: [],
                  innerWrapper: "",
                  inputWrapper: [
                    "border-2",
                    "border-slate-200",
                    "px-6",
                    "py-5",
                  ],
                }}
                placeholder="Ejemplo: 10%"
              />
            </div>
            <div className="flex flex-col lg:justify-between justify-end h-full">
              <p className="font-semibold  text-medium lg:text-xl">Estado</p>
              <Switch size="lg" defaultSelected color="success" />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancelar
          </Button>
          <ButtonCustom action={onClose} name="Guardar" primary />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalEditService;

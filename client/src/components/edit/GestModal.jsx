import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import InstagramIcon from "../icons/IntagramIcon";
import WhatsappIcon from "../icons/WhatsappIcon";
import FacebookIcon from "../icons/FacebookIcon";
import { Input } from "@nextui-org/react";
import ButtonCustom from "../global/ButtonCustom";

export default function gestModal(props) {


  return (
    <>
      <Modal {...props}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex  gap-1 text-2xl">Gestionar Contacto</ModalHeader>
              <ModalBody>
                <form>
                  <div className="justify-center content-center grid grid-cols-[0.1fr,1fr] gap-2">
                    <div className="border-2 self-center justify-center items-center border-slate-200 rounded-full p-2 ">
                      <EnvelopeIcon className="size-9 stroke-2" />
                    </div>
                    <Input type="email" label="Correo Electronico" classNames={{ inputWrapper: "bg-transparent border-2 border-slate-200 rounded-full w-full" }} />
                  </div>
                  <div className="justify-center content-center grid grid-cols-[0.1fr,1fr] gap-2 mt-2">
                    <div className="border-2 self-center justify-center items-center border-slate-200 rounded-full p-2 ">
                      <InstagramIcon size={"size-9"} className=" stroke-2" />
                    </div>
                    <Input type="text" label="Instagram" classNames={{ inputWrapper: "bg-transparent border-2 border-slate-200 rounded-full w-full" }} />
                  </div>
                  <div className="justify-center content-center grid grid-cols-[0.1fr,1fr] gap-2 mt-2">
                    <div className="border-2 self-center justify-center items-center border-slate-200 rounded-full p-2 ">
                      <WhatsappIcon size={"size-9"} className=" stroke-2" />
                    </div>
                    <Input type="text" label="Whatsapp" classNames={{ inputWrapper: "bg-transparent border-2 border-slate-200 rounded-full w-full" }} />
                  </div>
                  <div className="justify-center content-center grid grid-cols-[0.1fr,1fr] gap-2 mt-2">
                    <div className="border-2 self-center justify-center items-center border-slate-200 rounded-full p-2 ">
                      <FacebookIcon size={"size-9"} className=" stroke-2" />
                    </div>
                    <Input type="text" label="Facebook" classNames={{ inputWrapper: "bg-transparent border-2 border-slate-200 rounded-full w-full" }} />
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <ButtonCustom name="Guardar" primary />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
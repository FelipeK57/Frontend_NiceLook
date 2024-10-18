import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import InstagramIcon from "../icons/IntagramIcon";
import WhatsappIcon from "../icons/WhatsappIcon";
import FacebookIcon from "../icons/FacebookIcon";
import { Input } from "@nextui-org/react";
import ButtonCustom from "../global/ButtonCustom";
import { useEffect, useState } from "react";

export default function gestModal({ contact_methods, isOpen, onClose, setContact_methods }) {
  const [mail, setMail] = useState("");
  const [instagram, setInstagram] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [facebook, setFacebook] = useState("");

  useEffect(() => {
    if (contact_methods) {
      setMail(contact_methods.mail);
      setInstagram(contact_methods.instagram);
      setWhatsapp(contact_methods.whatsapp);
      setFacebook(contact_methods.facebook);
    }
  }, [contact_methods]);

  const handleSubmit = () => {
    const contacts = {
      mail: mail,
      instagram: instagram,
      whatsapp: whatsapp,
      facebook: facebook,
    }
    setContact_methods(contacts);
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex  gap-1 text-2xl">
                Gestionar Contacto
              </ModalHeader>
              <ModalBody>
                <form>
                  <div className="justify-center content-center grid grid-cols-[0.1fr,1fr] gap-2">
                    <div className="border-2 self-center justify-center items-center border-slate-200 rounded-full p-2 ">
                      <EnvelopeIcon className="size-9 stroke-2" />
                    </div>
                    <Input
                      value={mail}
                      type="email"
                      label="Correo Electronico"
                      onChange={(e) => {
                        setMail(e.target.value);
                      }}
                      classNames={{
                        inputWrapper:
                          "bg-transparent border-2 border-slate-200 rounded-full w-full",
                      }}
                    />
                  </div>
                  <div className="justify-center content-center grid grid-cols-[0.1fr,1fr] gap-2 mt-2">
                    <div className="border-2 self-center justify-center items-center border-slate-200 rounded-full p-2 ">
                      <InstagramIcon size={"size-9"} className=" stroke-2" />
                    </div>
                    <Input
                      value={instagram}
                      type="text"
                      label="Instagram"
                      onChange={(e) => {
                        setInstagram(e.target.value);
                      }}
                      classNames={{
                        inputWrapper:
                          "bg-transparent border-2 border-slate-200 rounded-full w-full",
                      }}
                    />
                  </div>
                  <div className="justify-center content-center grid grid-cols-[0.1fr,1fr] gap-2 mt-2">
                    <div className="border-2 self-center justify-center items-center border-slate-200 rounded-full p-2 ">
                      <WhatsappIcon size={"size-9"} className=" stroke-2" />
                    </div>
                    <Input
                      value={whatsapp}
                      type="text"
                      label="Whatsapp"
                      onChange={(e) => {
                        setWhatsapp(e.target.value);
                      }}
                      classNames={{
                        inputWrapper:
                          "bg-transparent border-2 border-slate-200 rounded-full w-full",
                      }}
                    />
                  </div>
                  <div className="justify-center content-center grid grid-cols-[0.1fr,1fr] gap-2 mt-2">
                    <div className="border-2 self-center justify-center items-center border-slate-200 rounded-full p-2 ">
                      <FacebookIcon size={"size-9"} className=" stroke-2" />
                    </div>
                    <Input
                      value={facebook}
                      type="text"
                      label="Facebook"
                      onChange={(e) => {
                        setFacebook(e.target.value);
                      }}
                      classNames={{
                        inputWrapper:
                          "bg-transparent border-2 border-slate-200 rounded-full w-full",
                      }}
                    />
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <ButtonCustom onClick={handleSubmit} name="Guardar" primary />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

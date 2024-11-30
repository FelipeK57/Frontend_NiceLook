/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button } from "@nextui-org/react";
import { Image } from "@nextui-org/image";
import { Image as ImageIcon, Pencil } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import DragAndDrop from "@/components/ui/DragAndDrop";
import ButtonCustom from "@/components/global/ButtonCustom";

const ImageUpload = ({ image, setImage, onFileChange }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageUpload = () => {
    if (selectedFile) {
      // Convierte el archivo a una URL para previsualización
      const imageUrl = URL.createObjectURL(selectedFile);

      // Establece la imagen para previsualización
      setImage(imageUrl);

      // Llama a la función de cambio de archivo (si se proporciona)
      if (onFileChange) {
        onFileChange(selectedFile);
      }

      onOpenChange();
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    onOpenChange();
  };

  return (
    <div className="relative w-32 h-32 flex rounded-3xl overflow-hidden border-2 border-neutral-300">
      {image ? (
        <Image
          src={image}
          alt="Imagen cargada"
          className="object-cover w-full h-full z-20"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-neutral-100">
          <ImageIcon className="w-12 h-12 text-neutral-400" />
        </div>
      )}

      <Button
        isIconOnly
        className="absolute bottom-2 right-2 bg-white/80 hover:bg-white rounded-full z-30"
        variant="bordered"
        onPress={onOpen}
      >
        <Pencil size={20} />
      </Button>

      <Modal isOpen={isOpen} onOpenChange={handleClose}>
        <ModalContent>
          <ModalHeader>Subir imagen</ModalHeader>
          <ModalBody>
            <DragAndDrop file={selectedFile} setFile={setSelectedFile} />
          </ModalBody>
          <ModalFooter>
            <ButtonCustom secondary action={handleClose}>
              Cancelar
            </ButtonCustom>
            <ButtonCustom
              primary
              onPress={handleImageUpload}
              isDisabled={!selectedFile}
            >
              Guardar
            </ButtonCustom>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ImageUpload;

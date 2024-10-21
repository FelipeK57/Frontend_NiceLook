import { useState, useRef } from "react";
import { Button } from "@nextui-org/react";
import { Image } from "@nextui-org/image";
import { Image as ImageIcon, Pencil } from "lucide-react";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
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
        onClick={handleButtonClick}
      >
        <Pencil size={20} />
      </Button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ImageUpload;

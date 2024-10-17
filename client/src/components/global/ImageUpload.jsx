import { useState } from "react";
import { Button } from "@nextui-org/react";
import { Image } from "@nextui-org/image";

import { Pencil } from "lucide-react";

const ImageUpload = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <div className="relative w-32 h-32 rounded-3xl overflow-hidden border border-gray-300">
      {/* Imagen o Fallback */}
      {/* <img
        src={image || "/fallback-image.png"}
        alt="Preview"
        className="object-cover w-full h-full"
      /> */}
      <Image
        src={image}
        alt="Imagen"
        fallbackSrc="/fallback-image.png"
        loading="lazy"
      />

      {/* Botón para subir imagen */}
      <label htmlFor="upload" className="absolute bottom-2 right-2">
        <Button
          isIconOnly
          className="bg-white/80 hover:bg-white rounded-full"
          variant="bordered"
        >
          <Pencil size={20} />
        </Button>
        <input
          id="upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </label>
    </div>
  );
};

export default ImageUpload;

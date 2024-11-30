/* eslint-disable react/prop-types */
import { FileUploader } from "react-drag-drop-files";
const fileTypes = ["JPEG", "PNG", "JPG", "WEBP"];

export default function DragAndDrop({ file, setFile }) {
  const handleChange = (file) => {
    setFile(file);
  };
  return (
    <>
      <FileUploader
        handleChange={handleChange}
        types={fileTypes}
        label="Arrastra y suelta un archivo aquí o haz clic para seleccionar uno"
        uploadedLabel={`Archivo seleccionado: ${file?.name}`}
      />
    </>
  );
}

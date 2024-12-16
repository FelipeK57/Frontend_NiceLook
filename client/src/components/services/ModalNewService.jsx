import { Button, Input } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import ButtonCustom from "../global/ButtonCustom";
import SelectCategorie from "./SelectCategorie";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import InputCustom from "../global/InputCustom";

/**
 * ModalNewService component renders a modal for creating a new service.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Determines if the modal is open.
 * @param {Function} props.onClose - Function to call when the modal is closed.
 *
 * @returns {JSX.Element} The rendered modal component.
 */
function ModalNewService({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [commission, setCommission] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState({
    name: "",
    price: "",
    commission: "",
    category: "",
    image: null,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setImage(file);
      setError({ ...error, image: "" });
    }
  };

  const handleSelectCategory = (name) => {
    setCategory(name);
    setError({ ...error, category: "" });
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleCreateService = async () => {
    console.log(name, price, commission, category, image);
    const isCommissionValid = commission >= 0 && commission <= 100;

    const newErrors = {
        name: name ? "" : "El nombre del servicio es requerido.",
        category: category ? "" : "La categoría del servicio es requerida.",
        price: price ? "" : "El precio del servicio es requerido.",
        commission: commission
            ? isCommissionValid
                ? ""
                : "La comisión debe estar entre 0 y 100."
            : "La comisión del servicio es requerida.",
        image: image ? "" : "La imagen del servicio es requerida.",
    };
    console.log(newErrors);
    setError(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }
    const formData = new FormData();
    formData.append("establishment_id", Cookies.get("establishmentId"));
    formData.append("name", name);
    formData.append("price", price);
    formData.append("commission", commission);
    formData.append("category", category);
    formData.append("image", image);

    console.log("Creating service...");
    try {
      const response = await axios.post(
        "http://localhost:8000/api/create_service/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setPreviewImage(null);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setName("");
    setPrice("");
    setCommission("");
    setCategory("");
    setPreviewImage(null);
    setError({});
    onClose();
  };

  return (
    <Modal size="xl" backdrop="blur" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold">Crea un nuevo servicio</h1>
          <p className="text-slate-500 text-base font-medium">
            Por favor llena todos los campos
          </p>
        </ModalHeader>
        <ModalBody className="grid grid-cols-2 gap-6 justify-stretch">
          <InputCustom
            label={"Nombre del servicio"}
            type={"text"}
            onChange={(e) => {
              setName(e.target.value);
              setError({ ...error, name: "" });
            }}
            isInvalid={!!error.name}
            errorMessage={error.name}
            placeholder={"Ejemplo: Corte de cabello"}
          />
          <InputCustom
            label={"Precio"}
            type={"number"}
            onChange={(e) => {
              const value = e.target.value;
              setPrice(value >= 0 ? value : "");
              setError({ ...error, price: "" });
            }}
            isInvalid={!!error.price}
            errorMessage={error.price}
            placeholder={"Ejemplo: 15000"}
          />
          <SelectCategorie
            notAll
            setCategory={handleSelectCategory}
            invalid={!!error.category}
            message={error.category}
          />
          <InputCustom
            label={"Comisión"}
            type={"number"}
            onChange={(e) => {
              const value = e.target.value;
              setCommission(value >= 0 ? value : "");
              setError({ ...error, commission: "" });
            }}
            isInvalid={!!error.commission}
            errorMessage={error.commission}
            placeholder={"Ejemplo: 10"}
          />
          <div className="flex flex-col gap-2">
            <label
              className={`font-semibold text-xl ${
                !!error.image && "text-[#f31260]"
              }`}
              htmlFor="comissionService"
            >
              Imagen
            </label>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <ButtonCustom
              classStyles={`py-5 ${
                !!error.image && "text-[#f31260] border-[#f31260]"
              }`}
              action={handleButtonClick}
              name="Subir"
              secondary
            />
            {<p className="text-[#f31260] text-[12px]">{error.image}</p>}
          </div>
          {previewImage && (
            <div className="hidden md:block">
              <label className={"font-semibold text-medium lg:text-xl"}>
                Vista previa
              </label>
              <img
                src={previewImage}
                alt="Vista previa"
                className="w-40 h-40 object-cover rounded-lg mb-4 shadow-md"
              />
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          {/* Modal Footer Buttons */}
          <Button color="danger" variant="light" onPress={handleClose}>
            Cancelar
          </Button>
          <ButtonCustom action={handleCreateService} name="Crear" primary />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalNewService;

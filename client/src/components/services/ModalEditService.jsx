import { Button } from "@nextui-org/react";
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
import PropTypes from "prop-types";
import InputCustom from "../global/InputCustom";
import { useState } from "react";
import axios from "axios";
/**
 * ModalEditService component renders a modal for editing a service.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Determines if the modal is open.
 * @param {Function} props.onClose - Function to call when the modal is closed.
 *
 * @returns {JSX.Element} The rendered modal component.
 */
function ModalEditService({
  idService,
  nameService,
  priceService,
  commissionService,
  categoryService,
  stateService,
  imageService,
  isOpen,
  onClose,
}) {
  const [name, setName] = useState(nameService);
  const [price, setPrice] = useState(priceService);
  const [commission, setCommission] = useState(commissionService);
  const [category, setCategory] = useState(categoryService);
  const [image, setImage] = useState(imageService);
  const [state, setState] = useState(stateService);
  const [previewImage, setPreviewImage] = useState(imageService);
  const [error, setError] = useState({
    name: "",
    price: "",
    commission: "",
    category: "",
    image: null,
  });
  const [errorServer, setErrorServer] = useState("");

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

  const handleEditService = async () => {
    try {
      const newErrors = {
        name: "",
        price: "",
        commission: "",
        category: "",
        image: "",
      };

      if (!name) {
        newErrors.name = "El nombre es requerido";
      }

      if (!price) {
        newErrors.price = "El precio es requerido";
      }

      if (price <= 0) {
        newErrors.price = "El precio debe ser mayor a 0";
      }

      if (!commission) {
        newErrors.commission = "La comisión es requerida";
      }

      if (commission <= 0) {
        newErrors.commission = "La comisión debe ser mayor a 0";
      }

      if (commission > 100) {
        newErrors.commission = "La comisión debe ser menor a 100";
      }

      if (!category) {
        newErrors.category = "La categoría es requerida";
      }

      if (!image) {
        newErrors.image = "La imagen es requerida";
      }

      setError(newErrors);
      if (Object.values(newErrors).some((error) => error !== "")) {
        return;
      }
      const formData = new FormData();
      formData.append("service_id", idService);
      formData.append("name", name);
      formData.append("price", price);
      formData.append("commission", commission);
      formData.append("category", category);
      formData.append("state", state);
      if (image != imageService) {
        formData.append("image", image);
      }
      console.log(idService, name, price, commission, category, state);
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/update_service/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onClose();
      setError({
        name: "",
        price: "",
        commission: "",
        category: "",
        image: "",
      });
      setErrorServer("");
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      setErrorServer(error.response.data.error);
      console.error(error);
    }
  };
  
  const handleClose = () => {
    onClose();
    setError({
      name: "",
      price: "",
      commission: "",
      category: "",
      image: "",
    });
    setErrorServer("");
  }

  return (
    <Modal size="xl" backdrop="blur" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h1 className="text-4xl font-bold">Visualiza un nuevo servicio</h1>
          <p className="text-slate-500 text-base font-medium">
            Puedes editar los campos
          </p>
        </ModalHeader>
        <ModalBody className="grid grid-cols-2 gap-6 justify-stretch">
          <InputCustom
            value={name}
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
            value={price}
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
            category={category}
            setCategory={handleSelectCategory}
            invalid={!!error.category}
            message={error.category}
          />
          <InputCustom
            value={commission}
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
                !!error.image && "text-[#f31260] text-sm font-semibold"
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
          <div className="flex flex-col justify-start gap-4 h-full">
            <p className="font-semibold  text-medium lg:text-xl">Estado</p>
            <Switch
              isSelected={state}
              onValueChange={setState}
              size="lg"
              defaultSelected
              color="success"
            />
          </div>
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
          <div>
            {
              errorServer && (
                <p className="text-[#f31260] text-[12px]">{errorServer}</p>
              )
            }
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={handleClose}>
            Cancelar
          </Button>
          <ButtonCustom action={handleEditService} name="Guardar" primary />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

ModalEditService.propTypes = {
  idService: PropTypes.number,
  nameService: PropTypes.string,
  priceService: PropTypes.number,
  commissionService: PropTypes.number,
  stateService: PropTypes.bool,
  categoryService: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default ModalEditService;

/* eslint-disable react/prop-types */
import { useState, useMemo, useEffect } from "react";
import api from "@/api";
import useAuthStore from "@/stores/useAuthStore";
import { parseDate } from "@internationalized/date";

import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { DatePicker } from "@nextui-org/date-picker";
import { Tooltip } from "@nextui-org/tooltip";
import { Skeleton } from "@nextui-org/skeleton";

import ImageUpload from "../global/ImageUpload";

export default function ManageProduct({ isEditing, onClose, product }) {
  const user = useAuthStore((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null); // Para la URL de previsualización
  const [imageFile, setImageFile] = useState(null); // Para el objeto File real
  const [formData, setFormData] = useState({
    name: "",
    establisment: user.establishment,
    description: "",
    price: 0.0,
    distributor: "",
    entry_date: null,
    expiration_date: null,
    quantity: 0,
    brand: "",
    purchase_price: 0.0,
  });

  useMemo(() => {
    if (product) {
      setFormData({
        ...product,
        product_id: product.id,
        entry_date: product.entry_date ? parseDate(product.entry_date) : null,
        expiration_date: product.expiration_date
          ? parseDate(product.expiration_date)
          : null,
      });
    }
  }, [product]);

  const requiredFields = ["name", "price", "quantity"];
  const isFormValid = requiredFields.every(
    (field) =>
      formData[field] !== "" &&
      formData[field] !== 0 &&
      formData[field] !== null
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectionChange = (e) => {
    const selectedValue = Array.from(e);
    const booleanValue = selectedValue[0] === "true";
    setFormData((prevData) => ({
      ...prevData,
      estate: booleanValue,
    }));
  };

  const handleDateChange = (name, date) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: date,
    }));
  };

  const formatDate = (date) => {
    if (date && date.year && date.month && date.day) {
      const month = String(date.month).padStart(2, "0"); // Asegura que el mes tenga 2 dígitos
      const day = String(date.day).padStart(2, "0"); // Asegura que el día tenga 2 dígitos
      return `${date.year}-${month}-${day}`;
    }
    return null;
  };

  useEffect(() => {
    const fetchProductImage = async () => {
      if (product) {
        await api
          .get(`Product/getImage/`, {
            params: {
              id_establisment: user.establishment,
              code_product: product.code,
            },
          })
          .then((res) => {
            setImagePreview(res.data.imagen);
          })
          .catch((err) => {
            console.error("Error fetching product image:", err);
          });
      }
    };

    fetchProductImage();
  }, [product, user.establishment]);

  const uploadProductImage = async (productCode, imageToUpload = null) => {
    // Usa imageFile si no se proporciona una imagen específica
    const image = imageToUpload || imageFile;

    if (!image || !productCode || !user.establishment) {
      console.warn("Missing data to submit image");
      return;
    }

    // Crear un FormData para enviar el archivo correctamente
    const formData = new FormData();
    formData.append("id_establisment", user.establishment);
    formData.append("code_product", productCode);
    formData.append("image", imageFile);

    try {
      // Intentar primero actualizar la imagen existente
      try {
        const updateResponse = await api.patch(
          "Product/updateImage/",
          formData
        );
        return updateResponse;
      } catch (updateErr) {
        // Si la actualización falla (posiblemente porque no existe una imagen previa),
        // intentar subir una nueva imagen
        const createResponse = await api.post("Product/addImage/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return createResponse;
      }
    } catch (err) {
      console.error("Error uploading/updating image:", err);
      throw err; // Re-throw para que el llamador pueda manejar el error si es necesario
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formattedData = {
      ...formData,
      price: parseFloat(formData.price), // Convertir price a float
      quantity: parseInt(formData.quantity, 10), // Convertir quantity a entero
      code: parseInt(formData.code, 10), // Convertir code a entero
      entry_date: formatDate(formData.entry_date),
      expiration_date: formatDate(formData.expiration_date),
    };

    console.log("Submitting: ", formattedData);

    await api
      .post("/Product/add/", formattedData)
      .then(() => {
        window.dispatchEvent(new Event("fetch-products"));
      })
      .catch((err) => {
        console.error("Error submitting form:", err);
      })
      .finally(() => {
        setLoading(false);
        onClose();
      });

    if (imageFile) {
      await uploadProductImage(formattedData.code, null);
    }
  };

  const handleEdit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const formattedData = {
      ...formData,
      price: parseFloat(formData.price), // Convertir price a float
      quantity: parseInt(formData.quantity, 10), // Convertir quantity a entero
      code: parseInt(formData.code, 10), // Convertir code a entero
      entry_date: formatDate(formData.entry_date),
      expiration_date: formatDate(formData.expiration_date),
    };

    await api
      .patch("/Product/update/", formattedData)
      .then(() => {
        window.dispatchEvent(new Event("fetch-products"));
      })
      .catch((err) => {
        console.error("Error submitting form:", err);
      })
      .finally(() => {
        setLoading(false);
        onClose();
      });

    if (imageFile) {
      await uploadProductImage(formattedData.code, imageFile);
    }
  };

  return (
    <article>
      <form
        onSubmit={!isEditing ? handleSubmit : handleEdit}
        className="grid grid-cols-1 gap-4 md:grid-cols-[30%_1fr] md:max-h-[55dvh]"
      >
        <Skeleton className="rounded-lg" isLoaded={isEditing ? product : true}>
          <section className="ProductImage flex flex-wrap flex-col content-center justify-start gap-4 p-6 items-center">
            <ImageUpload
              image={imagePreview}
              setImage={setImagePreview}
              onFileChange={setImageFile}
            />
            <Input
              label="Nombre del producto"
              aria-label="Nombre del producto"
              labelPlacement="outside"
              name="name"
              placeholder="Ingresa el nombre"
              className="w-full"
              variant="bordered"
              isRequired
              onChange={handleChange}
              defaultValue={formData.name}
            />
          </section>
        </Skeleton>
        <section className="ProductInfo px-4 overflow-auto md:max-h-[45dvh] relative">
          <h2 className="sticky top-0 bg-white py-2 z-[100] shadow-sm mb-4">
            Información del producto
          </h2>
          <div className="ProductInfoFormSection grid grid-cols-2 items-center gap-4">
            <div className="flex flex-nowrap gap-4 col-span-2 items-center">
              <Skeleton
                className="rounded-lg"
                isLoaded={isEditing ? product : true}
              >
                <Input
                  label="Código"
                  labelPlacement="outside-left"
                  type="number"
                  name="code"
                  id="code"
                  isRequired
                  variant="bordered"
                  onChange={handleChange}
                  defaultValue={formData.code}
                />
              </Skeleton>
              <Skeleton
                className="rounded-lg"
                isLoaded={isEditing ? product : true}
              >
                <Input
                  label="Cantidad"
                  labelPlacement="outside-left"
                  type="number"
                  name="quantity"
                  id="quantity"
                  isRequired
                  variant="bordered"
                  // onChange={handleChange}
                  onChange={(e) => {
                    const value = e.target.value.replace(/^0+/, "");
                    if (value >= 0) {
                      handleChange({ target: { name: "quantity", value } });
                    }
                  }}
                  defaultValue={formData.quantity}
                />
              </Skeleton>
            </div>

            <div className="flex flex-nowrap gap-4 col-span-2 items-center">
              <Skeleton
                className="rounded-lg"
                isLoaded={isEditing ? product : true}
              >
                <Tooltip
                  content={
                    <div className="px-1 py-2">
                      <p className="text-small font-semibold">
                        Este es el precio al que compraste el producto
                      </p>
                      <p className="text-tiny">
                        Este precio no se mostrará a los clientes
                      </p>
                    </div>
                  }
                  placement="top"
                  showArrow={true}
                  closeDelay={0}
                >
                  <Input
                    label="Precio de compra"
                    labelPlacement="outside-left"
                    type="number"
                    name="purchase_price"
                    id="purchase_price"
                    isRequired
                    variant="bordered"
                    onChange={(e) => {
                      const value = e.target.value.replace(/^0+/, "");
                      if (value >= 0) {
                        handleChange({
                          target: { name: "purchase_price", value },
                        });
                      }
                    }}
                    value={formData.purchase_price}
                  />
                </Tooltip>
              </Skeleton>

              <Skeleton
                className="rounded-lg"
                isLoaded={isEditing ? product : true}
              >
                <Tooltip
                  content={
                    <div className="px-1 py-2">
                      <p className="text-small font-semibold">
                        Este es el precio al que venderás el producto
                      </p>
                      <p className="text-tiny">
                        Este precio <span className="font-semibold">sí</span> se
                        mostrará a los clientes
                      </p>
                    </div>
                  }
                  placement="top"
                  showArrow={true}
                  closeDelay={0}
                >
                  <Input
                    label="Precio de venta"
                    labelPlacement="outside-left"
                    type="number"
                    name="price"
                    id="price"
                    isRequired
                    variant="bordered"
                    onChange={(e) => {
                      const value = e.target.value.replace(/^0+/, "");
                      if (value >= 0) {
                        handleChange({ target: { name: "price", value } });
                      }
                    }}
                    value={formData.price}
                  />
                </Tooltip>
              </Skeleton>
            </div>
            {isEditing && (
              <Skeleton
                isLoaded={isEditing ? product : true}
                className="rounded-lg col-span-2"
              >
                <Select
                  label="Estado"
                  labelPlacement="outside-left"
                  aria-label="Estado"
                  name="estate"
                  id="estate"
                  isRequired
                  variant="bordered"
                  selectedKeys={[formData.estate?.toString()]}
                  onSelectionChange={handleSelectionChange}
                >
                  <SelectItem key={true} value={true}>
                    A la venta
                  </SelectItem>
                  <SelectItem key={false} value={false}>
                    Inactivo
                  </SelectItem>
                </Select>
              </Skeleton>
            )}

            <Skeleton
              className="rounded-lg"
              isLoaded={isEditing ? product : true}
            >
              <DatePicker
                label="Fecha de ingreso"
                labelPlacement="outside-left"
                aria-label="Fecha de ingreso"
                name="entry_date"
                id="entry_date"
                showMonthAndYearPickers
                isRequired
                variant="bordered"
                value={formData.entry_date}
                onChange={(date) => handleDateChange("entry_date", date)}
              />
            </Skeleton>

            <Skeleton
              className="rounded-lg"
              isLoaded={isEditing ? product : true}
            >
              <DatePicker
                label="Fecha de vencimiento"
                labelPlacement="outside-left"
                aria-label="Fecha de vencimiento"
                name="expiration_date"
                id="expiration_date"
                showMonthAndYearPickers
                isRequired
                variant="bordered"
                value={formData.expiration_date}
                onChange={(date) => handleDateChange("expiration_date", date)}
              />
            </Skeleton>

            <Skeleton
              className="rounded-lg"
              isLoaded={isEditing ? product : true}
            >
              <Input
                label="Marca"
                labelPlacement="outside-left"
                type="text"
                name="brand"
                id="brand"
                isRequired
                variant="bordered"
                onChange={handleChange}
                value={formData.brand}
              />
            </Skeleton>

            <Skeleton
              className="rounded-lg"
              isLoaded={isEditing ? product : true}
            >
              <Input
                label="Distribuidor"
                labelPlacement="outside-left"
                type="text"
                name="distributor"
                id="distributor"
                isRequired
                variant="bordered"
                onChange={handleChange}
                defaultValue={formData.distributor}
              />
            </Skeleton>

            <div className="grid grid-cols-1 col-span-2">
              <Skeleton
                className="rounded-lg"
                isLoaded={isEditing ? product : true}
              >
                <label htmlFor="description">Descripción (Opcional)</label>
                <Textarea
                  name="description"
                  id="description"
                  variant="bordered"
                  onChange={handleChange}
                  defaultValue={formData.description}
                />
              </Skeleton>
            </div>
          </div>
        </section>
        <div className="pt-2 col-span-2 flex gap-4 flex-row justify-end">
          <Button variant="bordered" onPress={onClose}>
            Cancelar
          </Button>
          <Button
            type="submit"
            color="primary"
            onPress={onClose}
            isDisabled={!isFormValid}
            isLoading={loading}
          >
            {!loading ? (!isEditing ? "Crear" : "Guardar cambios") : "Cargando"}
          </Button>
        </div>
      </form>
    </article>
  );
}

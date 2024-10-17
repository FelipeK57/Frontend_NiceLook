/* eslint-disable react/prop-types */
import { useState,
  // useMemo,
  useEffect } from "react";
import api from "@/api";
import useAuthStore from "@/stores/useAuthStore";

import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { DatePicker } from "@nextui-org/date-picker";
import ImageUpload from "../global/ImageUpload";
import Cookies from "js-cookie";

export default function ManageProduct({ isEditing, onClose, product }) {

  const user = useAuthStore((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    establisment: user.establishment_id,
    description: "",
    price: 0.0,
    distributor: "",
    entry_date: null,
    expiration_date: null,
    quantity: 0,
    brand: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        price: product.price || 0.0,
        quantity: product.quantity || 0,
        status: product.status || "",
        entry_date: product.entry_date ? new Date(product.entry_date) : null,
        expiration_date: product.expiration_date ? new Date(product.expiration_date) : null,
        brand: product.brand || "",
        distributor: product.distributor || "",
        description: product.description || "",
        establisment: product.establisment || "",
      });
    }
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        establisment: user.user_id,
      }));
    }
  }, [product, user]);

  const requiredFields = ["name", "price", "quantity"];
  const isFormValid = requiredFields.every((field) => formData[field] !== "" && formData[field] !== 0 && formData[field] !== null);

  // useMemo(() => {
  //   console.log("formData", formData);
  // }, [formData]);

  const handleResetFormData = () => {
    setFormData({
      name: "",
      establisment: 999,
      description: "",
      price: 0.0,
      distributor: "",
      entry_date: null,
      expiration_date: null,
      quantity: 0,
      brand: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
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
      const month = String(date.month).padStart(2, '0');  // Asegura que el mes tenga 2 dígitos
      const day = String(date.day).padStart(2, '0');      // Asegura que el día tenga 2 dígitos
      return `${date.year}-${month}-${day}`;
    }
    return null;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formattedData = {
      ...formData,
      price: parseFloat(formData.price),  // Convertir price a float
      quantity: parseInt(formData.quantity, 10),  // Convertir quantity a entero
      code: parseInt(formData.code, 10),  // Convertir code a entero
      entry_date: formatDate(formData.entry_date),
      expiration_date: formatDate(formData.expiration_date),
    };
  

    console.log("Submitting: ", formattedData);

    await api.post("/Product/add/", formattedData).then((response) => {
        console.log(response);
        onClose();
      }
      ).catch((err) => {
      console.error("Error submitting form:", err);
    }).finally(() => {
      setLoading(false)
    });
  };

  const handleEdit = (e) => {
    setLoading(true);
    e.preventDefault();

    // Convertir las fechas a formato ISO 8601
    const formattedData = {
      ...formData,
      entry_date: formData.entry_date.toISOString().split("T")[0],
      expiration_date: formData.expiration_date.toISOString().split("T")[0],
    };
    console.log("Editing: ", formattedData);
  };

  return (
    <article>
      <form
        onSubmit={!isEditing ? handleSubmit : handleEdit}
        className="grid grid-cols-1 gap-4 md:grid-cols-[30%_1fr] md:max-h-[55dvh]"
      >
        <section className="ProductImage flex flex-wrap flex-col content-center justify-start gap-4 p-6 items-center">
          {/* <div className="w-32 h-32 bg-slate-800 rounded-full"></div> */}
          <ImageUpload />
          <Input
            // label="Nombre"
            name="name"
            placeholder="Nombre del producto"
            className="w-full"
            variant="bordered"
            isRequired
            onChange={handleChange}
            defaultValue={formData.name}
          />
        </section>
        <section className="ProductInfo px-4 overflow-auto md:max-h-[45dvh] relative">
          <h2 className="sticky top-0 bg-white py-2 z-10">
            Información del producto
          </h2>
          {/* <form
          onSubmit={handleSubmit}
          className="ProductInfoFormSection grid grid-cols-2 items-center gap-4"
        > */}
          <div className="ProductInfoFormSection grid grid-cols-2 items-center gap-4">
            <label htmlFor="code">Código</label>
            <Input
              type="number"
              name="code"
              id="code"
              isRequired
              variant="bordered"
              onChange={handleChange}
              defaultValue={formData.code}
            />

            <div className="flex flex-nowrap gap-4 col-span-2 items-center">
              <label htmlFor="price">Precio</label>
              <Input
                type="number"
                name="price"
                id="price"
                isRequired
                variant="bordered"
                // onChange={handleChange}
                onChange={(e) => {
                  const value = e.target.value.replace(/^0+/, "");
                  if (value >= 0) {
                    handleChange({ target: { name: "price", value } });
                  }
                }}
                value={formData.price}
              />

              <label htmlFor="quantity">Cantidad</label>
              <Input
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
            </div>
            {isEditing && (
              <>
                <label htmlFor="status">Estado</label>
                <Select
                  name="status"
                  id="status"
                  isRequired
                  variant="bordered"
                  onChange={handleChange}
                  defaultValue={formData.status}
                >
                  <SelectItem value="true">A la venta</SelectItem>
                  <SelectItem value="false">Agotado</SelectItem>
                </Select>
              </>
            )}

            <label htmlFor="entry_date">Fecha de ingreso</label>
            <DatePicker
            aria-label="Fecha de ingreso"
              name="entry_date"
              id="entry_date"
              showMonthAndYearPickers
              isRequired
              variant="bordered"
              value={formData.entry_date}
              onChange={(date) => handleDateChange("entry_date", date)}
            />

            <label htmlFor="expiration_date">Fecha de vencimiento</label>
            <DatePicker
            aria-label="Fecha de vencimiento"
              name="expiration_date"
              id="expiration_date"
              showMonthAndYearPickers
              isRequired
              variant="bordered"
              value={formData.expiration_date}
              onChange={(date) => handleDateChange("expiration_date", date)}
            />

            <label htmlFor="brand">Marca</label>
            <Input
              type="text"
              name="brand"
              id="brand"
              isRequired
              variant="bordered"
              onChange={handleChange}
              value={formData.brand}
            />

            <label htmlFor="distribuitor">Distribuidor</label>
            <Input
              type="text"
              name="distribuitor"
              id="distribuitor"
              isRequired
              variant="bordered"
              onChange={handleChange}
              defaultValue={formData.distribuitor}
            />

            <div className="grid grid-cols-1 col-span-2">
              <label htmlFor="description">Descripción (Opcional)</label>
              <Textarea
                name="description"
                id="description"
                variant="bordered"
                onChange={handleChange}
                defaultValue={formData.description}
              />
            </div>
            {/* <div className="sticky bottom-0 right-0 bg-white col-span-2 flex gap-4 flex-row justify-end">
              <Button color="danger" variant="light" onPress={onClose}>
                Cancelar
              </Button>
              <Button type="submit" color="primary" onPress={onClose}>
                Crear
              </Button>
            </div> */}
          </div>
        </section>
        <div className="pt-2 col-span-2 flex gap-4 flex-row justify-end">
          <Button
            // color="danger"
            variant="bordered"
            onPress={onClose}
            onClick={handleResetFormData}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            color="primary"
            onPress={onClose}
            isDisabled={!isFormValid}
            isLoading={loading}
          >
            {!isEditing ? "Crear" : "Guardar cambios"}
          </Button>
        </div>
      </form>
    </article>
  );
}

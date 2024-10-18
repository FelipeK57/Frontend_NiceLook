/* eslint-disable react/prop-types */
import {
  useState,
  useMemo,
  // useEffect,
} from "react";
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
// import Cookies from "js-cookie";

export default function ManageProduct({ isEditing, onClose, product }) {
  const user = useAuthStore((state) => state.user);
  const [loading, setLoading] = useState(false);
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

  // useMemo(() => {
  //   console.log("formData", formData);
  // }, [formData]);

  // const handleResetFormData = () => {
  //   setFormData({
  //     name: "",
  //     establisment: 999,
  //     description: "",
  //     price: 0.0,
  //     distributor: "",
  //     entry_date: null,
  //     expiration_date: null,
  //     quantity: 0,
  //     brand: "",
  //   });
  // };

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
      const month = String(date.month).padStart(2, "0"); // Asegura que el mes tenga 2 dígitos
      const day = String(date.day).padStart(2, "0"); // Asegura que el día tenga 2 dígitos
      return `${date.year}-${month}-${day}`;
    }
    return null;
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
      // estate: Boolean(formData.estate), // Ensure it's a boolean
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

    console.log("Editing: ", formattedData);
  };

  return (
    <article>
      <form
        onSubmit={!isEditing ? handleSubmit : handleEdit}
        className="grid grid-cols-1 gap-4 md:grid-cols-[30%_1fr] md:max-h-[55dvh]"
      >
        <Skeleton className="rounded-lg" isLoaded={isEditing ? product : true}>
          <section className="ProductImage flex flex-wrap flex-col content-center justify-start gap-4 p-6 items-center">
            {/* <div className="w-32 h-32 bg-slate-800 rounded-full"></div> */}

            <ImageUpload />
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
          {/* <form
          onSubmit={handleSubmit}
          className="ProductInfoFormSection grid grid-cols-2 items-center gap-4"
        > */}
          <div className="ProductInfoFormSection grid grid-cols-2 items-center gap-4">
            <div className="flex flex-nowrap gap-4 col-span-2 items-center">
              {/* <label htmlFor="code">Código</label> */}
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
              {/* <label htmlFor="quantity">Cantidad</label> */}
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
                {/* <label htmlFor="purchase_price">Precio de compra</label> */}
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
                    // onChange={handleChange}
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
                {/* <label htmlFor="price">Precio de venta</label> */}
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
                    // onChange={handleChange}
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
            {/* {isEditing && (
              <Skeleton
                isLoaded={isEditing ? product : true}
                className="rounded-lg col-span-2"
              >
                {/* <label htmlFor="estate">Estado</label> */}
                <Select
                  label="Estado"
                  labelPlacement="outside-left"
                  aria-label="Estado"
                  name="estate"
                  id="estate"
                  isRequired
                  variant="bordered"
                  selectedKeys={[formData.estate?.toString()]}
                  onSelectionChange={(keys) => {
                    const selectedValue = Array.from(keys)[0];
                    setFormData((prev) => ({
                      ...prev,
                      estate: selectedValue === keys.value,
                    }));
                  }}
                >
                  <SelectItem key="true" value={true}>
                    A la venta
                  </SelectItem>
                  <SelectItem key="false" value={false}>
                    Agotado
                  </SelectItem>
                </Select>
              </Skeleton>
            )} */}

            {/* <label htmlFor="entry_date">Fecha de ingreso</label> */}
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
              {/* <label htmlFor="expiration_date">Fecha de vencimiento</label> */}
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
              {/* <label htmlFor="brand">Marca</label> */}
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
            // onClick={handleResetFormData}
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

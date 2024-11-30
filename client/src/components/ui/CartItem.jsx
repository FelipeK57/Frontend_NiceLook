import { Button } from "@nextui-org/react";
import defaultImage from "../../assets/hola.png";
import { addProductToCart, deleteProduct, removeProductFromCart } from "../../Api/product/product";

const CartItem = ({ index, product, establishmentId, clientId, updateCart }) => {
    const { image, description, price, quantity, code } = product;

    const handleAdd = async (productCode) => {
        try {
            const date = new Date().toISOString().split("T")[0]; // Fecha en formato YYYY-MM-DD
            const response = await addProductToCart(establishmentId, clientId, productCode, date);

            if (response.mensaje) {
                alert("Producto añadido al carrito con éxito");
                await updateCart();
            } else {
                alert(response.error || "Hubo un problema al añadir el producto al carrito");
            }
        } catch (error) {
            console.error("Error al añadir producto al carrito:", error);
        }
    };

    const handleRemove = async (productCode) => {
        console.log("Trying to remove product with code:", productCode); // Log de los datos enviados al eliminar

        try {
            const response = await removeProductFromCart(productCode);
            if (response.mensaje) {
                alert("Producto eliminado del carrito");
                await updateCart(); // Actualizar carrito después de eliminar
            } else {
                alert("Hubo un problema al eliminar el producto");
            }
        } catch (error) {
            console.error("Error al eliminar producto del carrito:", error);
        }
    };


    const handleDelete = async (productCode) => {
        try {
            const response = await deleteProduct(productCode); // Llama al endpoint para eliminar el producto
            if (response.message === "Product deleted successfully") {
                alert("Producto eliminado con éxito");
                await updateCart(); // Actualiza el carrito después de eliminar
            } else {
                alert("No se pudo eliminar el producto. Verifica que no tenga pagos activos.");
            }
        } catch (error) {
            console.error("Error eliminando producto:", error);
            alert("Hubo un problema al intentar eliminar el producto.");
        }
    };

    return (
        <tr className="border-b">
            <td className="p-2 text-left">{index}</td>
            <td className="p-2 text-left">
                <img
                    src={image !== 0 ? image : defaultImage}
                    alt="Producto"
                    className="w-16 h-16 object-cover mx-auto border rounded-lg mb-4"
                />
            </td>
            <td className="p-2 text-left">{description}</td>
            <td className="p-2 text-left">${price.toFixed(2)}</td>
            <td className="p-2 text-left">
                <div className="flex items-center gap-2">
                    <Button
                        isIconOnly
                        radius="full"
                        variant="bordered"
                        className="h-fit w-fit"
                        onPress={() => handleRemove(code)} // Eliminar una unidad del producto
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-4"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                        </svg>
                    </Button>
                    <span>{quantity}</span>
                    <Button
                        isIconOnly
                        radius="full"
                        variant="bordered"
                        className="h-fit w-fit"
                        onPress={() => handleAdd(code)} // Agregar una unidad del producto
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4.5v15m7.5-7.5h-15"
                            />
                        </svg>
                    </Button>
                </div>
            </td>
            <td className="p-2 text-left">${(price * quantity).toFixed(2)}</td>
            <td className="p-8 text-left">
                <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(code)} // Llama a la nueva función de eliminación
                >
                    Eliminar
                </button>
            </td>
        </tr>
    );
};

export default CartItem;

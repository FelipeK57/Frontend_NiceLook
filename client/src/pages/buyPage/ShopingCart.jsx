import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "../../components/ui/CartItem";
import ButtonCustom from "../../components/global/ButtonCustom";
import { Button } from "@nextui-org/react";
import { getCartDetails, completePurchase } from "../../Api/product/product";
import useAddCart from "@/stores/useAddCart";
import Cookies from "js-cookie"; // Importa js-cookie

const ShoppingCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [total, setTotal] = useState(0);
    const { items, setItems } = useAddCart();

    const navigate = useNavigate();

    const establishmentId = 1; // ID del establecimiento
    const clientId = parseInt(Cookies.get("client_id") || "0", 10); // Obtén el userId de las cookies

    const updateCart = async () => {
        const items = await getCartDetails();
        setCartItems(items);
        calculateTotals(items);
    };

    useEffect(() => {
        if (!clientId) {
            alert("Usuario no identificado.");
            navigate("/login"); // Redirige si no hay un usuario válido
            return;
        }
        updateCart(); // Inicializa el carrito
    }, [clientId]);

    const calculateTotals = (items) => {
        const subtotal = items.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );
        const discount = items.reduce(
            (acc, item) => acc + (item.discount || 0) * item.quantity,
            0
        );
        setSubtotal(subtotal);
        setDiscount(discount);
        setTotal(subtotal - discount);
    };

    const handleCompletePurchase = async () => {
        if (cartItems.length === 0) {
            alert("El carrito está vacío. Agrega productos antes de generar el pedido.");
            return;
        }

        try {
            const response = await completePurchase(); // Llama a la API
            alert(response.mensaje); // Muestra el mensaje de éxito
            setItems(0);
            await updateCart(); // Actualiza el carrito (vacía el carrito tras completar la compra)
            navigate("/@peluqueriastylospalmira/store"); // Redirige al inicio o a otra página después de la compra
        } catch (error) {
            console.error("Error al completar la compra:", error);
            alert("Hubo un problema al generar el pedido. Inténtalo nuevamente.");
        }
    };

    return (
        <div className="p-14">
            <Button
                isIconOnly
                radius="full"
                variant="bordered"
                onPress={() => navigate(-1)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                    />
                </svg>
            </Button>
            <h3 className="text-5xl text-[#252527] font-bold ml-8 mt-5 p-4">
                Tu Carrito
            </h3>
            <div className="flex justify-between mt-6 p-14">
                <div className="bg-white border shadow-md rounded-lg p-4 w-[70vw] h-[50vh] overflow-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="p-2 text-left text-xl">Item</th>
                                <th className="p-2 text-left text-xl">Artículo</th>
                                <th className="p-2 text-left text-xl">Descripción</th>
                                <th className="p-2 text-left text-xl">Precio</th>
                                <th className="p-2 text-left text-xl">Cantidad</th>
                                <th className="p-2 text-left text-xl">Total</th>
                                <th className="p-2 text-left text-xl">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems
                                .sort((a, b) => a.code - b.code) // Ordenar por id (u otro campo único)
                                .map((product, index) => (
                                    <CartItem
                                        key={product.code}  // Asegúrate de que `id` sea único y fijo
                                        index={index + 1} // Posición en la lista
                                        product={product}
                                        establishmentId={establishmentId}
                                        clientId={clientId}
                                        updateCart={updateCart}
                                    />
                                ))}
                        </tbody>
                    </table>
                </div>
                <div className="w-60 border shadow-md rounded-lg p-4">
                    <div className="text-center text-xl text-[#252527] font-bold mb-6">
                        Generar Pedido
                    </div>
                    <div className="mb-6">
                        <div className="flex flex-col">
                            <span className="mb-4 text-lg font-semibold text-gray-950">
                                Subtotal:
                            </span>
                            <span className="text-2xl font-semibold text-gray-700 place-self-center">
                                ${subtotal.toFixed(2)}
                            </span>
                        </div>
                    </div>
                    <div className="mb-6">
                        <div className="flex flex-col">
                            <span className="mb-4 text-lg font-semibold text-gray-950">
                                Descuento:
                            </span>
                            <span className="text-2xl font-semibold text-gray-700 place-self-center">
                                ${discount.toFixed(2)}
                            </span>
                        </div>
                    </div>
                    <div className="mb-6">
                        <div className="flex flex-col">
                            <span className="mb-6 text-lg font-semibold text-gray-950">
                                Total a pagar:
                            </span>
                            <span className="text-2xl font-semibold text-gray-700 place-self-center mb-6">
                                ${total.toFixed(2)}
                            </span>
                        </div>
                    </div>
                    <div className="text-center">
                        <ButtonCustom
                            name="Generar pedido"
                            classStyles={"w-26 text-base"}
                            primary
                            onPress={handleCompletePurchase} // Asocia la funcionalidad
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;


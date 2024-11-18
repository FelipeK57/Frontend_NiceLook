import { Button } from "@nextui-org/react";
import defaultImage from "../../assets/hola.png";

const CartItem = ({ index, product }) => {
    const { image, description, price, quantity } = product;

    console.log("Datos recibidos en CartItem:", { index, product });

    return (
        <tr className="border-b">
            <td className="p-2 text-left">{index}</td>
            <td className="p-2 text-left">
                <img src={image !== 0 ? image : defaultImage} alt="Producto" className="w-16 h-16 object-cover mx-auto border rounded-lg mb-4" />
            </td>
            <td className="p-2 text-left">{description}</td>
            <td className="p-2 text-left">${price.toFixed(2)}</td>
            <td className="p-2 text-left">
                <div className="flex items-center gap-2">
                    <Button isIconOnly radius="full" variant="bordered" className="h-fit w-fit">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                        </svg>
                    </Button>
                    <span>{quantity}</span>
                    <Button isIconOnly radius="full" variant="bordered" className="h-fit w-fit">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </Button>
                </div>
            </td>
            <td className="p-2 text-left">${(price * quantity).toFixed(2)}</td>
            <td className="p-8 text-left">
                <button className="text-red-500 hover:text-red-700">Eliminar</button>
            </td>
        </tr>
    );
};

export default CartItem;

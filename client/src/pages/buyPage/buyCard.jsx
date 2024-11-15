import Product from "../../components/ui/Product";
import InputCart from "../../components/ui/InputCart";
import { Button } from "@nextui-org/react";

export default function BuyCard() {
    // Array de ejemplo para simular múltiples productos
    const products = Array(9).fill(0); // Puedes reemplazar esto con datos reales de productos

    return (
        <div>
            <div className="flex justify-between">
                <InputCart className="ml-[18.5vw]" />
                <Button isIconOnly radius="full" variant="bordered">
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
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        />
                    </svg>
                </Button>
            </div>

            {/* Contenedor de productos en una cuadrícula de 3 columnas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mt-6">
                {products.map((_, index) => (
                    <Product key={index} />
                ))}
            </div>
        </div>
    );
}

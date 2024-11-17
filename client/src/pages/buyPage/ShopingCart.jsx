import CartItem from '../../components/ui/CartItem';
import ButtonCustom from "../../components/global/ButtonCustom";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
const ShoppingCart = () => {
    const navigate = useNavigate();
    return (
        <div className='p-14'>
            <Button isIconOnly radius="full" variant="bordered" onPress={() => { navigate(-1) }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>

            </Button>
            <h3 className="text-5xl text-[#252527] font-bold ml-8 mt-5 p-4">
                Tu Carrito
            </h3>
            <div className='flex justify-between mt-6 p-14
            '>
                <div className="bg-white border shadow-md rounded-lg p-4 w-[70vw] h-[50vh] overflow-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b px-20 ">
                                <th className="p-2 text-left text-xl">Item</th>
                                <th className="p-2 text-left text-xl">Artículo</th>
                                <th className="p-2 text-left text-xl">Descripción</th>
                                <th className="p-2 text-left text-xl">Precio</th>
                                <th className="p-2 text-justify text-xl">Cantidad</th>
                                <th className="p-2 text-left text-xl">Total</th>
                                <th className="p-2 text-left text-xl">Acciones</th>
                            </tr>
                        </thead>
                        <tbody >
                            {/* Varias filas de ejemplo para visualizar el diseño */}
                            <CartItem index={1} />
                            <CartItem index={2} />
                            <CartItem index={3} />
                            <CartItem index={4} />
                            <CartItem index={5} />
                            <CartItem index={6} />
                        </tbody>
                    </table>
                </div>
                <div className="w-60 border shadow-md rounded-lg p-4">
                    <div className="text-center text-xl text-[#252527] font-bold mb-6">
                        Generar Pedido
                    </div>
                    <div className="mb-6">
                        <div className="flex flex-col  ">
                            <span className='mb-4 text-lg font-semibold text-gray-950'>Subtotal:</span>
                            <span className='text-2xl font-semibold text-gray-700 place-self-center'>$ 72,000.00</span>
                        </div>
                    </div>
                    <div className="mb-6">
                        <div className="flex flex-col ">
                            <span className='mb-4 text-lg font-semibold text-gray-950'>Descuento:</span>
                            <span className='text-2xl font-semibold text-gray-700 place-self-center'>$ 0.00</span>
                        </div>
                    </div>
                    <div className="mb-6">
                        <div className="flex flex-col  ">
                            <span className='mb-6 text-lg font-semibold text-gray-950'>Total a pagar:</span>
                            <span className='text-2xl font-semibold text-gray-700 place-self-center mb-6'>$ 72,000.00</span>
                        </div>
                    </div>
                    {/* Aquí va tu componente de botón */}
                    <div className="text-center ">
                        <ButtonCustom
                            name="Generar pedido"
                            classStyles={"w-26 text-base"}
                            primary
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;

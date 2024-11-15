import CartItem from '../../components/ui/CartItem';
import ButtonCustom from "../../components/global/ButtonCustom";
const ShoppingCart = () => {
    return (
        <div>
            <h3 className="text-5xl text-[#252527] font-bold ml-4 p-4">
                Tu Carrito
            </h3>
            <div className='flex justify-between mt-6 '>
                <div className="bg-white border shadow-md rounded-lg p-4 w-[58vw]">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b px-20">
                                <th className="p-2 text-left">Item</th>
                                <th className="p-2 text-left">Artículo</th>
                                <th className="p-2 text-left">Descripción</th>
                                <th className="p-2 text-left">Precio</th>
                                <th className="p-2 text-justify">Cantidad</th>
                                <th className="p-2 text-left">Total</th>
                                <th className="p-2 text-left">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Varias filas de ejemplo para visualizar el diseño */}
                            <CartItem index={1} />
                            <CartItem index={2} />
                            <CartItem index={3} />
                        </tbody>
                    </table>
                </div>
                <div className="w-60 border shadow-md rounded-lg p-4">
                    <div className="text-center text-[#252527] font-bold mb-6">
                        Generar Pedido
                    </div>
                    <div className="mb-4">
                        <div className="flex flex-col  ">
                            <span className='mb-4 text-lg font-semibold text-gray-950'>Subtotal:</span>
                            <span className='text-2xl font-semibold text-gray-700 place-self-center'>$ 72,000.00</span>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="flex flex-col ">
                            <span className='mb-4 text-lg font-semibold text-gray-950'>Descuento:</span>
                            <span className='text-2xl font-semibold text-gray-700 place-self-center'>$ 0.00</span>
                        </div>
                    </div>
                    <div className="mb-6">
                        <div className="flex flex-col  ">
                            <span className='mb-4 text-lg font-semibold text-gray-950'>Total a pagar:</span>
                            <span className='text-2xl font-semibold text-gray-700 place-self-center'>$ 72,000.00</span>
                        </div>
                    </div>
                    {/* Aquí va tu componente de botón */}
                    <div className="text-center">
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

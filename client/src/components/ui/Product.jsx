import ReviewComponent from "../../components/global/ReviewComponent";
import ButtonCustom from "../../components/global/ButtonCustom";
import { Badge, Tooltip } from "@nextui-org/react";
const Product = () => {
    return (
        <Badge content="99+" shape="circle" color="warning" className="shadow-md shadow-slate-400 border-white">
        <div className="border rounded-lg shadow-lg p-4 w-80">
            {/* Imagen del producto */}
            <div className="flex justify-center border rounded-lg mb-4">
                <img
                    src="https://via.placeholder.com/150" // Reemplaza con la URL de la imagen deseada
                    alt="Producto"
                    className="w-full h-auto border rounded-lg object-cover"
                />
            </div>

            {/* Nombre del producto */}
            <h2 className="text-lg font-bold mb-2">Savital</h2>

            {/* Descripción del producto */}
            <p className="text-sm text-gray-600 mb-2 text-ellipsis overflow-hidden line-clamp-4">
                <Tooltip className="max-w-96 shadow-md shadow-slate-400" content={<p className="p-3">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos dolores harum quibusdam voluptate velit, optio recusandae nobis debitis libero nisi corrupti adipisci architecto iusto deleniti repellendus quidem veniam vel. Laboriosam? akssaksdaksdkasdk aksdkasdkasdkasdk daksd kasdk asdkasdkaskdaksdkas dka sdkasdk</p>}>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos dolores harum quibusdam voluptate velit, optio recusandae nobis debitis libero nisi corrupti adipisci architecto iusto deleniti repellendus quidem veniam vel. Laboriosam?
                </Tooltip>
            </p>

            {/* Calificación del producto */}
            <div className="flex mb-2 justify-start">
                <ReviewComponent
                    reviews="4.5"
                    size="size-6"
                    text="text-lg font-bold text-gray-800"
                />
            </div>

            {/* Precio del producto */}


            {/* Botón de compra */}
            <div className="flex justify-between mt-6">
                <p className="text-3xl font-bold  text-gray-800">$12.000</p>
                <ButtonCustom
                    name="Comprar"
                    classStyles={"w-26 text-base"}
                    primary
                />
            </div>
        </div>
        </Badge>
    );
};

export default Product;

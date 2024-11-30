import ReviewComponent from "../../components/global/ReviewComponent";
import ButtonCustom from "../../components/global/ButtonCustom";
import { Badge, Tooltip } from "@nextui-org/react";
import imagen from "../../assets/hola.png";
import { useEffect, useState } from "react";

const Product = ({ product, onAddToCart }) => {

    const [reviews, setReviews] = useState(null);

    useEffect(() => {
        setReviews(product.reviews);
    }, [product]);

    return (
        <Badge content={product.quantity} shape="circle" color="warning" className="shadow-md shadow-slate-400 border-white font-bold">
   <div className="border rounded-lg shadow-lg p-4 w-80">
                {/* Imagen del producto */}
                <div className="flex justify-center border rounded-lg mb-4">
                    <img
                        src={product.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqtpQRJa3PSAEeJkCPnu-Ii5l1mW2dH20X6Q&s"}
                        alt={product.name}
                        className="w-full h-auto border rounded-lg object-cover"
                    />
                </div>

                {/* Nombre del producto */}
                <h2 className="text-lg font-bold mb-2">{product.name}</h2>

                {/* Descripción del producto */}
                <p className="text-sm text-gray-600 mb-2 text-ellipsis overflow-hidden line-clamp-4">
                    <Tooltip className="max-w-96 shadow-md shadow-slate-400" content={<p className="p-3">{product.description}</p>}>
                        {product.description}
                    </Tooltip>
                </p>

                {/* Calificación del producto */}
                <div className="flex mb-2 justify-start">
                    <ReviewComponent
                        reviews={reviews ? reviews : product.review}
                        product = {product}
                        size="size-6"
                        text="text-lg font-bold text-gray-800"
                    />
                </div>

                {/* Precio del producto y botón de compra */}
                <div className="flex justify-between mt-6">
                    <p className="text-3xl font-bold text-gray-800">${product.price}</p>
                    <ButtonCustom
                        name="Comprar"
                        classStyles={"w-26 text-base"}
                        primary
                        onClick={() => {
                            console.log("Product code:", product.code); // Verificar `product.code`
                            onAddToCart(product.code);
                        }}
                    />
                </div>
            </div>
        </Badge>
    );
};

export default Product;

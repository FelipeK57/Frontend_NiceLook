import ButtonCustom from "../../components/global/ButtonCustom";
import { Badge, Tooltip } from "@nextui-org/react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Product = ({ product, onAddToCart }) => {

    const [reviews, setReviews] = useState(null);

    useEffect(() => {
        setReviews(product.reviews);
    }, [product]);

    const newPrice = product.price * (1 - product.discount / 100);
    Product.propTypes = {
        product: PropTypes.object.isRequired,
        onAddToCart: PropTypes.func.isRequired
    }
    return (
        <Badge content={product.quantity} shape="circle" color="warning" className="shadow-md shadow-slate-400 border-white font-bold">
   <div className="border rounded-lg flex flex-col gap-2 shadow-lg p-4 w-80">
                {/* Imagen del producto */}
                <div className="flex justify-center border rounded-lg">
                    <img
                        src={product.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqtpQRJa3PSAEeJkCPnu-Ii5l1mW2dH20X6Q&s"}
                        alt={product.name}
                        className="w-full h-auto border rounded-lg object-cover"
                    />
                </div>

                {/* Nombre del producto */}
                <h2 className="text-2xl font-bold ">{product.name}</h2>
                <div className="flex items-center gap-5">
                <p className={`  ${product.price !== newPrice ? "line-through font-bold" : "text-2xl font-bold"}`}>${product.price}</p>
                {product.price !== newPrice && <p className="text-2xl font-bold ">${newPrice}</p>}  
                </div>

                {/* Descripción del producto */}
                <p className="text-sm text-gray-600 w text-ellipsis overflow-hidden line-clamp-4">
                    <Tooltip className="max-w-96 shadow-md shadow-slate-400" content={<p className="p-3">{product.description}</p>}>
                        {product.description}
                    </Tooltip>
                </p>

                {/* Calificación del producto */}

                {/* Precio del producto y botón de compra */}
                <div className="flex justify-center ">
                    
                    <ButtonCustom
                        name="Añadir al carrito"
                        classStyles={"w-full font-bold text-xl"}
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

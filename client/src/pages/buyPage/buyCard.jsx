import { useEffect, useState } from "react";
import Product from "../../components/ui/Product";
import InputCart from "../../components/ui/InputCart";
import { Badge, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import {
  getProductsByEstablishment,
  searchProductsByName,
  addProductToCart,
} from "@api_feats/product/product";
import useAuthStore from "@/stores/useAuthStore";
import AuthModal from "@/components/auth/AuthModal";
import Cookies from "js-cookie";
import useAddCart from "@/stores/useAddCart";


export default function BuyCard() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const establishmentId = Cookies.get("establishmentId");
  const clientId = Cookies.get("client_id"); // ID del establecimiento, puede ser dinámico en una implementación completa
  const { triggerAuthModal } = useAuthStore();
  const {items, setItems} = useAddCart();

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await getProductsByEstablishment(establishmentId);
      setProducts(fetchedProducts.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const [searchTimeout, setSearchTimeout] = useState(null);

  const handleSearch = async (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    // Limpiar el timeout anterior para evitar llamadas excesivas
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    setSearchTimeout(
      setTimeout(async () => {
        console.log("Buscando productos...");
        if (searchTerm) {
          try {
            const response = await searchProductsByName(
              searchTerm,
              establishmentId
            );
            console.log("Resultado de la búsqueda:", response);
            if (response?.products) {
              setProducts(
                response.products.sort((a, b) => a.name.localeCompare(b.name))
              );
              console.log("Productos actualizados:", response.products);
            } else {
              setProducts([]);
              console.log("No se encontraron productos");
            }
          } catch (error) {
            console.error("Error searching products:", error);
            setProducts([]);
          }
        } else {
          fetchProducts(); // Recargar los productos originales si no hay término de búsqueda
          console.log("Recargando productos originales");
        }
      }, 500)
    ); // 500ms de retardo
  };

  const handleAddToCart = async (productCode) => {
    const date = new Date().toISOString().split("T")[0]; // Fecha en formato YYYY-MM-DD

    console.log("Añadiendo producto al carrito:", {
      establishmentId,
      clientId,
      productCode,
      date,
    });
    const response = await addProductToCart(
      establishmentId,
      clientId,
      productCode,
      date
    );
    if (response.mensaje) {
      setItems(items + 1);
      fetchProducts()
    } else {
      console.error("Error adding product to cart:", response.error);
    }
  };

  const handleProtectedAction = (product) => {
    if (!Cookies.get("isAuthenticated")) {
      triggerAuthModal();
    } else {
      handleAddToCart(product.code);
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <InputCart
          className="ml-[18.5vw]"
          onChange={handleSearch}
          value={searchTerm}
        />
        <Badge color="primary" content={items} shape="circle">
          <Button
            isIconOnly
            radius="full"
            variant="bordered"
            onPress={() => navigate("/shoppingCart")}
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
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </Button>
        </Badge>
      </div>
      <AuthModal />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mt-6">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            onAddToCart={() => handleProtectedAction(product)}
          />
        ))}
      </div>
    </div>
  );
}

import axios from "axios";

const ProductApi = axios.create({
    baseURL: `${process.env.API_URL}/api`,
});

// API para obtener productos por establecimiento (hasta 4 productos)
export const getProductsByEstablishment = async (establisment_id) => {
    try {
        const response = await ProductApi.get(`/list_products/${establisment_id}/`);
        return response.data.products;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

// API para agregar un producto al carrito
export const addProductToCart = async (establisment_id, client_id, code, date) => {
    console.log("API parameters:", { establisment_id, client_id, code, date }); // Verifica los parámetros de la API

    try {
        const response = await ProductApi.post(`/create_product_payment_option2/${establisment_id}/${client_id}/`, {
            code,
            date,
        });
        return response.data;
    } catch (error) {
        console.error("Error in API call:", error.response || error.message); // Muestra error si la solicitud falla
        throw error;
    }
};

// API para buscar productos por nombre
export const searchProductsByName = async (name, establisment_id) => {   
    try {
      const response = await ProductApi.get(`/filter_products/${establisment_id}`, {      
        params: { name },
      });
      console.log('Respuesta de la API:', response);
      return response.data;
    } catch (error) {
      console.error("Error searching products:", error);
      return [];
    }
  };
  
  export const getCartDetails = async (client_id) => {
    try {
        const response = await ProductApi.get(`/details/${client_id}/`);
        return response.data; // La API ya devuelve el formato correcto
    } catch (error) {
        console.error("Error fetching cart details:", error);
        return [];
    }
};

export const removeProductFromCart = async (code, client_id) => {
    try {
        const response = await ProductApi.delete(`/delete_product_of_payment/${client_id}/`, {
            data: { code }, // Enviar el cuerpo como data
        });
        return response.data;
    } catch (error) {
        console.error("Error removing product from cart:", error);
        throw error;
    }
};

export const deleteProduct = async (code, client_id) => {
    try {
        const response = await ProductApi.delete(`/delete_product/${code}/${client_id}/`);
        return response.data;
    } catch (error) {
        console.error("Error deleting product:", error.response || error.message);
        throw error;
    }
};

export const completePurchase = async (client_id) => {
    try {
        const response = await ProductApi.post(`/complete_payment/`, {
            client_id: client_id,
        });
        return response.data; // Devuelve el mensaje de éxito
    } catch (error) {
        console.error("Error completing purchase:", error.response || error.message);
        throw error; // Lanza el error para manejarlo en el frontend
    }
};
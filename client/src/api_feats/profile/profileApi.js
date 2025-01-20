import axios from "axios";

const AppointmentApi = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/client/`,
});

export function getClientHistory(client_id) {
    return AppointmentApi.get(`client_appointment_history/${client_id}`);
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const ReviewApi = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/review_employee/`,
});

export function getClientReviews(client_id) {
    return ReviewApi.get(`/get_reviews_client/${client_id}`);
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const ServicesApi = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/list_service/`,
});

export function getServices(establishment_id) {
    return ServicesApi.get(`/?establishment_id=${establishment_id}`);
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const ProductsApi = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/client/client_product_purchases `,
});

export function getProductsHistory(client_id) {
    return ProductsApi.get(`/${client_id}/`);
}

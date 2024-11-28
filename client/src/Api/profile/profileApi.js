import axios from "axios";

const AppointmentApi = axios.create({
    baseURL: "http://localhost:8000/client/",
});

export function getClientHistory(client_id) {
    return AppointmentApi.get(`client_appointment_history/${client_id}`);
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const ReviewApi = axios.create({
    baseURL: "http://localhost:8000/review_employee/",
});

export function getClientReviews(client_id) {
    return ReviewApi.get(`/get_reviews_client/${client_id}`);
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const ServicesApi = axios.create({
    baseURL: "http://localhost:8000/api/list_service/",
});

export function getServices(establishment_id) {
    return ServicesApi.get(`/?establishment_id=${establishment_id}`);
}
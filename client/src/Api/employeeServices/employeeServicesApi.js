import axios from "axios";

const employeeServicesApi = axios.create({
    baseURL: "http://localhost:8000/employee_services",
});

const establishmentServicesApi = axios.create({
    baseURL: "http://localhost:8000/establisment",
});

const employeeApi = axios.create({
    baseURL: "http://localhost:8000/employee",
});

const serviceApi = axios.create({
    baseURL: "http://localhost:8000/service",
});

const review = axios.create({
    baseURL: "http://localhost:8000/review_employee/create_review",
});

const clientApi = axios.create({
    baseURL: "http://localhost:8000/client",
});

//=====================================================================================

export function getEmployeeServices(id) {
    return employeeServicesApi.get(`/employeeServicesList/${id}/`);
}

export function deleteEmployeeService(employeeId, serviceId) {
    return employeeServicesApi.delete(
        `/employeeServiceDelete/${employeeId}/${serviceId}/`
    );
}

export function addEmployeeService(employeeId, serviceId, establismentId) {
    return employeeApi.post(`/addservice/${employeeId}/`, {
        service_id: serviceId,
        establisment_id: establismentId,
    });
}

export function getService(id) {
    return serviceApi.get(`/get_service/${id}/`);
}

//=====================================================================================

export function getEstablishmentServices(id) {
    return establishmentServicesApi.get(`/servicesByEstablisment/${id}/`);
}

//=====================================================================================

export function getClient(id) {
    return clientApi.get(`/get_client/${id}/`);
}

export function editClient(id, first_name, last_name, phone) {
    return clientApi.put(`/update_client/${id}/`, {
        first_name: first_name,
        last_name: last_name,
        phone: phone,
    });
}

//=====================================================================================

export function createReview(
    client_id,
    employee_id,
    appointment_id,
    comment,
    rating
) {
    return review.post(`/${client_id}/${employee_id}/${appointment_id}/`, {
        comment: comment,
        rating: rating,
    });
}

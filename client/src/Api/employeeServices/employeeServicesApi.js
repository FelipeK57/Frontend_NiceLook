import axios from "axios";


const employeeServicesApi = axios.create({
    baseURL: "http://localhost:8000/employee_services",
});

const establishmentServicesApi = axios.create({
    baseURL: "http://localhost:8000/establisment",
})

const employeeApi = axios.create({
    baseURL: "http://localhost:8000/employee",
})

const categoryApi = axios.create({
    baseURL: "http://localhost:8000/category"
})

//=====================================================================================

export function getEmployeeServices(id) {
    return employeeServicesApi.get(`/employeeServicesList/${id}/`);
}

export function deleteEmployeeService(employeeId, serviceId){
    return employeeServicesApi.delete(`/employeeServiceDelete/${employeeId}/${serviceId}/`)
}

export function addEmployeeService(employeeId, serviceId, establismentId){
    return employeeApi.post(`/addservice/${employeeId}/`,{
        service_id: serviceId,
        establisment_id: establismentId
    })
}

//=====================================================================================

export function getEstablishmentServices(id) {
    return establishmentServicesApi.get(`/servicesByEstablisment/${id}/`);
}

//=====================================================================================

export function getCategories() {
    return categoryApi.get("/category_list/")
}
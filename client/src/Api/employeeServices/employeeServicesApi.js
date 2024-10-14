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

//=====================================================================================

export function getEmployeeServices(id) {
    return employeeServicesApi.get(`/employeeServicesList/${id}/`);
}

export function deleteEmployeeService(employeeId, serviceId){
    return employeeServicesApi.delete(`/employeeServiceDelete/${employeeId}/${serviceId}/`)
}

export function addEmployeeService(employeeId, data){
    return employeeApi.post(`/addservice/${employeeId}/`, data)
}

//=====================================================================================

export function getEstablishmentServices(id) {
    return establishmentServicesApi.get(`/servicesByEstablisment/${id}/`);
}
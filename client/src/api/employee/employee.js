import axiox from "axios";

const EmployeesApi = axiox.create({
    baseURL: "http://localhost:8000/employee",
});

//query para obtener todos los empleados

export function getEmployees() {
    return EmployeesApi.get("/employee_list/");
}

export function searchEmployees(name) {
    return EmployeesApi.get(`/search_employees/?q=${name}`);
}

export function createEmployee(data) {
    return EmployeesApi.post(`/create_employee/${data}`);
}
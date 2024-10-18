import axiox from "axios";

//=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=

const EmployeesApi = axiox.create({
    baseURL: "http://localhost:8000/employee",
});

//query para obtener todos los empleados

export function getEmployees() {
    return EmployeesApi.get("/employee_list/");
}

//query para buscar entre empleados por medio del nombre y apellido

export function searchEmployees(name) {
    return EmployeesApi.get(`/search_employees/?q=${name}`);
}

//query para crear un nuevo empleado

export function createEmployee(name, last_name, phone, email, especialty, establishmentID) {
    return EmployeesApi.post(`/create_employee/${establishmentID}/`, {
        name: name,
        last_name: last_name,
        phone: phone,
        email: email,
        especialty: especialty,
    });
}

//query para actualizar un empleado

export function updateEmployee(employee_id, name, last_name, phone, state) {
    return EmployeesApi.put(`/update_employee/`,{
        employee_id: employee_id,
        name: name,
        last_name: last_name,
        phone: phone,
        state: state
    })
}

//=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=

const CategoryApi = axiox.create({
    baseURL: "http://localhost:8000/category",
});

export function getCategories() {
    return CategoryApi.get("/category_list/")
}
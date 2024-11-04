import axios from "axios";

//=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=

const EmployeesApi = axios.create({
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

export function createEmployee(establishmentId, name, last_name, phone, email, especialty) {
    return EmployeesApi.post(`/create_employee/${establishmentId}/`, {
        name: name,
        last_name: last_name,
        phone: phone,
        email: email,
        especialty: especialty,
    });
}

//query para actualizar un empleado

export function updateEmployee(idUser, name, last_name, phone, state) {
    return EmployeesApi.put('/update_employee/',{
        employee_id: idUser,
        name: name,
        last_name: last_name,
        phone: phone,
        state: state
    });
}

//=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=

const CategoryApi = axios.create({
    baseURL: "http://localhost:8000/category",
});

export function getCategories() {
    return CategoryApi.get("/category_list/")
}

export function getEmployeeSchedule(employeeId, year, month, day) {
    return EmployeesApi.get(`/schedule_employee/${employeeId}/?year=${year}&month=${month}&day=${day}`);
}

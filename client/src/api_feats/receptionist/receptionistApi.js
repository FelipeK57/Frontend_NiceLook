import axios from "axios";

const ReceptionistApi = axios.create({
    baseURL: "http://localhost:8000/receptionist",
});

export function loginReceptionist(token) {
    return ReceptionistApi.post("/ReceptionistLogin/", {
        token: token,
    });
}
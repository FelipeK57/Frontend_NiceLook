import axios from "axios";

const ReceptionistApi = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/receptionist`,
});

export function loginReceptionist(token) {
    return ReceptionistApi.post("/ReceptionistLogin/", {
        token: token,
    });
}
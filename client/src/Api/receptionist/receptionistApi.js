import axios from "axios";

const ReceptionistApi = axios.create({
    baseURL: `${process.env.API_URL}/receptionist`,
});

export function loginReceptionist(token) {
    return ReceptionistApi.post("/ReceptionistLogin/", {
        token: token,
    });
}
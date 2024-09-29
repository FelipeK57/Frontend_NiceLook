import axios from "axios";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "../constants";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  // baseURL: import.meta.env.VITE_API_URL
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

import axios from "axios";
// import Cookies from "js-cookie";
// import { ACCESS_TOKEN } from "../constants";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/`,
  // baseURL: import.meta.env.VITE_VITE_API_URL
});
console.log(import.meta.env.VITE_API_URL);
api.interceptors.request.use(
  (config) => {
    // const token = Cookies.get(ACCESS_TOKEN);
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

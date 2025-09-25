//базовая конфигурация Axios (baseURL, interceptors)
import axios from "axios";

const baseUrl = import.meta.env.VITE_PUBLIC_API_URL;
export const api = axios.create({
  baseURL: baseUrl,
});

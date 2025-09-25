//для заполнения фильтра брендов
import { api } from "./api.js";

export const getCarsBrand = () => api.get("/brands");

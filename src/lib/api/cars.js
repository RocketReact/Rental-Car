//получение списка авто, детали авто по ID, фильтрация

import { api } from "./api.js";

export const getCars = (params) => api.get("/cars", { params });
export const getCarById = (id) => api.get(`/cars/${id}`);

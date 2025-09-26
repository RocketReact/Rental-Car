import { getCars } from "../api/cars.js";
import { create } from "zustand";

const useCarsStore = create((set, get) => ({
  cars: [],
  loading: false,
  page: 1,
  hasMore: true,

  fetchCars: async (params) => {
    set({ loading: true });
    try {
      const response = await getCars(params);
      set({
        cars: response.data.cars,
        loading: false,
        page: 1,
        hasMore: response.data.cars.length === 12,
      });
    } catch (error) {
      set({ loading: false });
    }
  },
  loadMoreCars: async (filters = {}) => {
    const { page, cars } = get();
    set({ loading: true });
    try {
      const response = await getCars({
        page: page + 1,
        limit: 12,
        ...filters,
      });
      set({
        cars: [...cars, ...response.data.cars],
        page: page + 1,
        hasMore: response.data.cars.length === 12,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
    }
  },
}));
export default useCarsStore;

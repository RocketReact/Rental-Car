import { getCars } from "../api/cars.js";
import { create } from "zustand";

const useCarsStore = create((set, get) => ({
  cars: [],
  loading: false,
  page: 1,

  fetchCars: async (params) => {
    set({ loading: true });
    try {
      const response = await getCars(params);
      console.log(response.data);
      set({ cars: response.data.cars, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },
}));
export default useCarsStore;

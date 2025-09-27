import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useFiltersStore = create(
  devtools((set) => ({
    // Данные для дропдаунов
    brands: [],
    priceOptions: [], // Уникальные цены из cars

    // Текущие выбранные значения в UI (не применённые)
    brand: "",
    pricePerHour: "",
    mileageFrom: "",
    mileageTo: "",

    // Применённые фильтры — используются Catalog.jsx
    appliedFilters: {
      brand: "",
      pricePerHour: "",
      mileageFrom: "",
      mileageTo: "",
    },

    // Сеттеры
    setBrands: (brands) => set({ brands }),
    setPriceOptions: (prices) => set({ priceOptions: prices }),

    // Сеттеры для UI
    setBrand: (value) => set({ brand: value }),
    setPricePerHour: (value) => set({ pricePerHour: value }),
    setMileageFrom: (value) => set({ mileageFrom: value }),
    setMileageTo: (value) => set({ mileageTo: value }),

    // Применить фильтры
    applyFilters: () =>
      set((state) => ({
        appliedFilters: {
          brand: state.brand,
          pricePerHour: state.pricePerHour,
          mileageFrom: state.mileageFrom,
          mileageTo: state.mileageTo,
        },
      })),

    // Сброс всех фильтров
    resetFilters: () =>
      set({
        brand: "",
        pricePerHour: "",
        mileageFrom: "",
        mileageTo: "",
        appliedFilters: {
          brand: "",
          pricePerHour: "",
          mileageFrom: "",
          mileageTo: "",
        },
      }),
  })),
);

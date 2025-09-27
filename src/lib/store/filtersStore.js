import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useFiltersStore = create(
  devtools((set) => ({
    // Данные, полученные с бэкенда для дропдаунов
    brands: [],
    pricesPerHour: [],

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

    // Геттеры
    setBrands: (brands) => set({ brands }),
    setPricesPerHour: (prices) => set({ pricesPerHour: prices }),

    // Сеттеры для UI
    setBrand: (value) => set({ brand: value }),
    setPricePerHour: (value) => set({ pricePerHour: value }),
    setMileageFrom: (value) => set({ mileageFrom: value }),
    setMileageTo: (value) => set({ mileageTo: value }),

    // Применить фильтры (по клику на кнопку "Поиск")
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

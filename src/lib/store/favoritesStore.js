import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFavoritesStore = create(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (product) => {
        const exists = get().favorites.find((p) => p.id === product.id);
        set({
          favorites: exists
            ? get().favorites.filter((p) => p.id !== product.id)
            : [...get().favorites, product],
        });
      },
    }),
    {
      name: "favorites-storage", // ключ в localStorage
    },
  ),
);

export default useFavoritesStore;

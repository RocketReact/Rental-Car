import React, { useEffect, useState } from "react";
import Filters from "./Filters";
import { useFiltersStore } from "../store/useFiltersStore";

const Catalog = () => {
  const { appliedFilters } = useFiltersStore();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();

        if (appliedFilters.brand) params.append("brand", appliedFilters.brand);
        if (appliedFilters.pricePerHour)
          params.append("pricePerHour", appliedFilters.pricePerHour);
        if (appliedFilters.mileageFrom)
          params.append("mileageFrom", appliedFilters.mileageFrom);
        if (appliedFilters.mileageTo)
          params.append("mileageTo", appliedFilters.mileageTo);

        const url = `/api/items?${params.toString()}`;
        const response = await fetch(url);
        const data = await response.json();
        setItems(data);
      } catch (err) {
        console.error("Ошибка загрузки каталога:", err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [appliedFilters]);

  return (
    <div>
      <Filters />

      {loading ? (
        <p>Загрузка...</p>
      ) : items.length > 0 ? (
        <div style={{ marginTop: "20px" }}>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                padding: "16px",
                margin: "8px 0",
                border: "1px solid #eee",
                borderRadius: "8px",
              }}
            >
              <h4>{item.name}</h4>
              <p>Бренд: {item.brand}</p>
              <p>Цена за час: {item.pricePerHour} ₽</p>
              <p>Пробег: {item.mileage} км</p>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ marginTop: "20px", color: "#666" }}>Ничего не найдено.</p>
      )}
    </div>
  );
};

export default Catalog;

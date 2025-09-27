import React, { useEffect } from "react";
import { useFiltersStore } from "../store/useFiltersStore";

const Filters = () => {
  const {
    brands,
    pricesPerHour,
    brand,
    pricePerHour,
    mileageFrom,
    mileageTo,
    setBrands,
    setPricesPerHour,
    setBrand,
    setPricePerHour,
    setMileageFrom,
    setMileageTo,
    applyFilters,
    resetFilters,
  } = useFiltersStore();

  // Загрузка опций фильтров с бэкенда
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const res = await fetch("/api/filters"); // или куда у вас API
        if (!res.ok) throw new Error("Failed to load filters");
        const data = await res.json();
        setBrands(data.brands || []);
        setPricesPerHour(data.pricesPerHour || []);
      } catch (err) {
        console.error("Ошибка загрузки фильтров:", err);
      }
    };

    fetchFilterOptions();
  }, [setBrands, setPricesPerHour]);

  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        alignItems: "center",
        padding: "20px",
        background: "#f9f9f9",
        borderRadius: "8px",
        flexWrap: "wrap",
      }}
    >
      {/* Бренд */}
      <div>
        <label
          style={{ display: "block", fontSize: "14px", marginBottom: "4px" }}
        >
          Бренд
        </label>
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            minWidth: "150px",
          }}
        >
          <option value="">Все бренды</option>
          {brands.map((b) => (
            <option key={b.id} value={b.slug}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      {/* Цена за 1 час */}
      <div>
        <label
          style={{ display: "block", fontSize: "14px", marginBottom: "4px" }}
        >
          Цена / 1 час
        </label>
        <select
          value={pricePerHour}
          onChange={(e) => setPricePerHour(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            minWidth: "150px",
          }}
        >
          <option value="">Любая цена</option>
          {pricesPerHour.map((p) => (
            <option key={p.id} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      {/* Пробег от / до */}
      <div style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
        <div>
          <label
            style={{ display: "block", fontSize: "14px", marginBottom: "4px" }}
          >
            Пробег от
          </label>
          <input
            type="number"
            placeholder="от"
            value={mileageFrom}
            onChange={(e) => setMileageFrom(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "100px",
            }}
          />
        </div>
        <div>
          <label
            style={{ display: "block", fontSize: "14px", marginBottom: "4px" }}
          >
            до
          </label>
          <input
            type="number"
            placeholder="до"
            value={mileageTo}
            onChange={(e) => setMileageTo(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "100px",
            }}
          />
        </div>
      </div>

      {/* Кнопки */}
      <div style={{ display: "flex", gap: "8px", marginLeft: "auto" }}>
        <button
          onClick={applyFilters}
          style={{
            padding: "8px 16px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Поиск
        </button>
        <button
          onClick={resetFilters}
          style={{
            padding: "8px 16px",
            background: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Сбросить
        </button>
      </div>
    </div>
  );
};

export default Filters;

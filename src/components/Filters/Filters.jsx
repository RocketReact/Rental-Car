import React, { useEffect } from "react";
import { useFiltersStore } from "../../lib/store/filtersStore.js";
import useCarsStore from "../../lib/store/carsStore.js";
import { getCarsBrand } from "../../lib/api/brands.js";
import css from "./Filters.module.css";
const Filters = () => {
  const {
    brands,
    priceOptions,
    brand,
    pricePerHour,
    mileageFrom,
    mileageTo,
    setBrands,
    setPriceOptions,
    setBrand,
    setPricePerHour,
    setMileageFrom,
    setMileageTo,
    applyFilters,
    resetFilters,
  } = useFiltersStore();

  const { cars } = useCarsStore();

  // Загрузка брендов
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await getCarsBrand();
        setBrands(res.data || []);
      } catch (err) {
        console.error("Ошибка загрузки брендов:", err);
      }
    };

    fetchBrands();
  }, [setBrands]);

  // Извлечение уникальных цен из cars
  useEffect(() => {
    if (cars && cars.length > 0) {
      const uniquePrices = [...new Set(cars.map((car) => car.rentalPrice))]
        .filter((price) => price !== undefined && price !== null)
        .sort((a, b) => a - b);

      const priceOptions = uniquePrices.map((price) => ({
        value: price,
        label: `$${price}`,
      }));

      setPriceOptions(priceOptions);
    }
  }, [cars, setPriceOptions]);

  return (
    <div className={css.filtersMainContainer}>
      {/* Brand */}
      <div>
        <label className={css.carBrandLabel}>Car brand</label>
        <select
          value={brand}
          onChange={(e) => {
            setBrand(e.target.value);
          }}
          className={css.selectFilters}
        >
          <option value="">Choose a brand</option>
          {brands.map((brandName, index) => (
            <option key={`${brandName}-${index}`} value={brandName}>
              {brandName}
            </option>
          ))}
        </select>
      </div>

      {/* Price / 1 hour */}
      <div>
        <label className={css.carBrandLabel}>Price / 1 hour</label>
        <select
          value={pricePerHour}
          onChange={(e) => setPricePerHour(e.target.value)}
          className={css.selectFilters}
        >
          <option value="">Choose a price</option>
          {priceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Car mileage / km */}
      <div>
        <label className={css.carBrandLabel}>Car mileage / km</label>
        <div className={css.fromToContainer}>
          <input
            type="number"
            placeholder="From"
            value={mileageFrom}
            onChange={(e) => setMileageFrom(e.target.value)}
            className={css.inputFromTo}
          />
          <input
            type="number"
            placeholder="To"
            value={mileageTo}
            onChange={(e) => setMileageTo(e.target.value)}
            className={css.inputFromTo}
          />
        </div>
      </div>

      {/* Btn Search & Reset */}
      <div style={{ display: "flex", gap: "8px" }}>
        <button onClick={applyFilters} className={css.btnSearch}>
          Search
        </button>
        <button onClick={resetFilters} className={css.btnReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Filters;

import useCarsStore from "../../lib/store/carsStore.js";
import { useEffect, useRef } from "react";
import css from "./Catalog.module.css";
import { Link } from "react-router-dom";
export default function Catalog() {
  const { cars, loading, fetchCars, loadMoreCars, hasMore } = useCarsStore();
  const lastCarRef = useRef(null);
  const prevCarsLength = useRef(cars.length);
  useEffect(() => {
    const params = {
      page: 1,
      limit: 12,
    };

    fetchCars(params);
  }, [fetchCars]);

  const handleLoadMore = (e) => {
    e.preventDefault();
    prevCarsLength.current = cars.length;
    loadMoreCars();
  };
  useEffect(() => {
    if (cars.length > prevCarsLength.current && lastCarRef.current) {
      // Прокручиваем к первой из новых машин
      const newCarIndex = prevCarsLength.current;
      const newCarElement = document.querySelector(
        `[data-car-index="${newCarIndex}"]`,
      );
      if (newCarElement) {
        newCarElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [cars.length]);

  if (loading) return <div>Loading...</div>;

  return (
    <section className={css.containerCatalog}>
      <ul className={css.carsContainer}>
        {cars.map((car, index) => (
          <li
            key={car.id}
            className={css.carItem}
            data-car-index={index}
            ref={index === cars.length - 1 ? lastCarRef : null}
          >
            <img
              className={css.img}
              src={car.img}
              alt={`${car.brand} ${car.model}`}
            />
            <div className={css.textContainerForCar}>
              <p>
                {car.brand} <span className={css.model}>{car.model}</span>,{" "}
                {car.year}
              </p>
              <p>${car.rentalPrice}</p>
            </div>
            <p className={css.descriptionsUnderBrand}>
              {car.address
                .split(",")
                .map((p) => p.trim())
                .slice(-2)
                .join(" | ")}{" "}
              | {car.rentalCompany} | <br /> {car.type} | {car.mileage} km
            </p>
            <Link to={`/cars/${car.id}`}>
              <button className={css.btnBanner}>Read more</button>
            </Link>
          </li>
        ))}
      </ul>
      <div className={css.containerLoadMore}>
        {hasMore && (
          <button
            onClick={handleLoadMore}
            className={css.loadMore}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load more"}
          </button>
        )}
      </div>
    </section>
  );
}

import useCarsStore from "../../lib/store/carsStore.js";
import { useEffect } from "react";
import css from "./Catalog.module.css";
export default function Catalog() {
  const { cars, loading, fetchCars } = useCarsStore();
  console.log(cars);
  useEffect(() => {
    const params = {
      page: 1,
      limit: 12,
    };

    fetchCars(params);
  }, [fetchCars]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <section className={css.carsContainer}>
        {cars.map((car) => (
          <li key={car.id} className={css.carItem}>
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
          </li>
        ))}
      </section>
    </div>
  );
}

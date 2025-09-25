import useCarsStore from "../../lib/store/carsStore.js";
import { useEffect } from "react";
import css from "./Catalog.module.css";
export default function Catalog() {
  const { cars, loading, fetchCars } = useCarsStore();
  console.log("cars:", cars, typeof cars);
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
            {car.brand} {car.model}
          </li>
        ))}
      </section>
    </div>
  );
}

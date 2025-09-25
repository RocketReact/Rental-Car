import useCarsStore from "../../lib/store/carsStore.js";
import { useEffect } from "react";

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
    <div>
      {cars.map((car) => (
        <li key={car.id}>
          {car.brand} {car.model}
        </li>
      ))}
    </div>
  );
}

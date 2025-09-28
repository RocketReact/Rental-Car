import useCarsStore from "../../lib/store/carsStore.js";
import { useEffect, useRef, useState } from "react";
import css from "./Catalog.module.css";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import useFavoritesStore from "../../lib/store/favoritesStore.js";
import Loader from "../Loader/Loader.tsx";
import ScrollToTopButton from "../ScrollToTopButton/ScrollToTopButton.jsx";
import { useFiltersStore } from "../../lib/store/filtersStore.js";
import Filters from "../Filters/Filters.jsx";

export default function Catalog() {
  const { cars, loading, fetchCars, loadMoreCars, hasMore } = useCarsStore();
  const { appliedFilters } = useFiltersStore();
  const { favorites, toggleFavorite } = useFavoritesStore();
  const lastCarRef = useRef(null);
  const prevCarsLength = useRef(cars.length);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    const params = {
      page: 1,
      limit: 12,
      brand: appliedFilters.brand,
      maxPrice: appliedFilters.pricePerHour,
      mileageFrom: appliedFilters.mileageFrom,
      mileageTo: appliedFilters.mileageTo,
    };

    fetchCars(params);
  }, [fetchCars, appliedFilters]);

  const handleLoadMore = (e) => {
    e.preventDefault();
    prevCarsLength.current = cars.length;
    setIsLoadingMore(true);
    loadMoreCars();
  };

  useEffect(() => {
    if (
      isLoadingMore &&
      cars.length > prevCarsLength.current &&
      lastCarRef.current
    ) {
      const newCarIndex = prevCarsLength.current;
      const newCarElement = document.querySelector(
        `[data-car-index="${newCarIndex}"]`,
      );
      if (newCarElement) {
        newCarElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setIsLoadingMore(false);
    }
  }, [cars.length, isLoadingMore]);

  // Filters
  const filteredCars = cars.filter((car) => {
    if (
      appliedFilters.brand &&
      car.brand.toLowerCase() !== appliedFilters.brand.toLowerCase()
    ) {
      return false;
    }

    // by price
    if (
      appliedFilters.pricePerHour &&
      parseFloat(car.rentalPrice) > parseFloat(appliedFilters.pricePerHour)
    ) {
      return false;
    }

    // by mileage
    const carMileage = parseFloat(car.mileage);
    const mileageFrom = parseFloat(appliedFilters.mileageFrom);
    const mileageTo = parseFloat(appliedFilters.mileageTo);

    if (appliedFilters.mileageFrom && carMileage < mileageFrom) {
      return false;
    }
    return !(appliedFilters.mileageTo && carMileage > mileageTo);
  });

  if (loading && cars.length === 0) return <Loader />;

  return (
    <section className={css.containerCatalog}>
      <Filters />

      <ul className={css.carsContainer}>
        {filteredCars.map((car, index) => {
          const isFavorite = favorites.some((p) => p.id === car.id);
          return (
            <li
              key={car.id}
              className={css.carItem}
              data-car-index={index}
              ref={index === filteredCars.length - 1 ? lastCarRef : null}
            >
              <img
                className={css.img}
                src={car.img}
                alt={`${car.brand} ${car.model}`}
              />
              <div onClick={() => toggleFavorite(car)} className={css.btnHeart}>
                {isFavorite ? (
                  <FaHeart size={28} className={`${css.heart} ${css.filled}`} />
                ) : (
                  <FaRegHeart
                    size={28}
                    className={`${css.heart} ${css.outlined}`}
                  />
                )}
              </div>
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
          );
        })}
      </ul>

      {filteredCars.length === 0 && cars.length > 0 && (
        <p className={css.noResults}>
          No cars found matching your filters. Try adjusting your search
          criteria.
        </p>
      )}

      <div className={css.containerLoadMore}>
        {hasMore && filteredCars.length > 0 && (
          <button
            onClick={handleLoadMore}
            className={css.loadMore}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load more"}
          </button>
        )}
      </div>

      {!hasMore && filteredCars.length > 0 && (
        <p className={css.noAvailable}>No more cars available</p>
      )}

      <ScrollToTopButton />
    </section>
  );
}

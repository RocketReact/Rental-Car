import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCarById } from "../../lib/api/cars.js";
import css from "./ProductCard.module.css";
import { SlLocationPin } from "react-icons/sl";
import checkCircle from "/check-circle.svg";
import calendar from "/calendar.svg";
import caricon from "/car.svg";
import fuel from "/fuel-pump.svg";
import gear from "/gear.svg";
export default function ProductCard() {
  const { id } = useParams();
  const [car, setCar] = useState({});
  useEffect(() => {
    async function fetchProduct() {
      const data = await getCarById(id);
      setCar(data);
    }
    fetchProduct();
  }, [id]);

  console.log(car?.data);

  if (!car) return <p>Загрузка...</p>;
  return (
    <div className="container">
      <div className={css.productCardDiv}>
        <img src={car?.data?.img} className={css.oneCarImg} alt="" />
        <div>
          <div className={css.firstTitle}>
            {car?.data?.brand} {car?.data?.model}, {car?.data?.year} id:{" "}
            {car?.data?.id.slice(0, 4)}
          </div>
          <div className={css.secondTitle}>
            <SlLocationPin />{" "}
            {car?.data?.address
              .split(",")
              .map((p) => p.trim())
              .slice(-2)
              .join(", ")}{" "}
            Mileage: {car?.data?.mileage}
          </div>
          <div className={css.priceContainer}>${car?.data?.rentalPrice}</div>
          <p className={css.description}>{car?.data?.description}</p>

          <div className={css.mainConditionsContainer}>
            <div>
              <h3 className={css.conditionsThirdTitle}>Rental Conditions:</h3>
              <ul className={css.rentalConditionContainer}>
                {car?.data?.rentalConditions.map((condition, index) => (
                  <li key={index} className={css.oneCondition}>
                    <img
                      src={checkCircle}
                      alt="condition"
                      className={css.checkCircle}
                    />
                    {condition}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={css.conditionsThirdTitle}>Car Specifications:</h3>
              <ul className={`${css.rentalConditionContainer}`}>
                <li>
                  <img
                    src={calendar}
                    alt="condition"
                    className={css.checkCircle}
                  />
                  Year: {car?.data?.year}
                </li>
                <li>
                  <img
                    src={caricon}
                    alt="condition"
                    className={css.checkCircle}
                  />
                  Type: {car?.data?.type}
                </li>
                <li>
                  <img src={fuel} alt="condition" className={css.checkCircle} />
                  Fuel Consumption: {car?.data?.fuelConsumption}
                </li>
                <li>
                  <img src={gear} alt="condition" className={css.checkCircle} />
                  Engine Size: {car?.data?.engineSize}
                </li>
              </ul>
            </div>
            <div>
              <h3 className={css.conditionsThirdTitle}>
                Accessories and functionalities:
              </h3>
              <ul className={css.rentalConditionContainer}>
                {car?.data?.accessories.map((condition, index) => (
                  <li key={index} className={css.oneCondition}>
                    <img
                      src={checkCircle}
                      alt="accessories condition"
                      className={css.checkCircle}
                    />
                    {condition}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

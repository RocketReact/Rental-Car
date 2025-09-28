import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCarById } from "../../lib/api/cars.js";
import css from "./ProductCard.module.css";
import { SlLocationPin } from "react-icons/sl";
import checkCircle from "/check-circle.svg";
import calendar from "/calendar.svg";
import carIcon from "/car.svg";
import fuel from "/fuel-pump.svg";
import gear from "/gear.svg";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import "izitoast/dist/css/iziToast.min.css";
import iziToast from "izitoast";
import "react-datepicker/dist/react-datepicker.css";
import DatePickerField from "../DatePickerField/DatePickerField.jsx";

export default function ProductCard() {
  const { id } = useParams();
  const [car, setCar] = useState({});
  const [startDate, setStartDate] = useState(null);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  useEffect(() => {
    async function fetchProduct() {
      const data = await getCarById(id);
      setCar(data);
    }
    fetchProduct();
  }, [id]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "To short name")
      .max(20, "To long name")
      .required("Write your name is required"),
    email: Yup.string()
      .email(
        "Please enter a valid email (e.g., user@gmail.com or user@domain.com)",
      )
      .required("Write your email is required"),
    comment: Yup.string()
      .min(20, "To short message")
      .max(500, "To long message"),
  });
  //get car id from img url

  const imgUrl = car?.data?.img;
  const extractCarId = (imgUrl) => {
    const match = imgUrl?.match(/\/(\d{4})-/);
    return match ? match[1] : null;
  };
  const carID = extractCarId(imgUrl);
  const carInfo = {
    brand: car?.data?.brand,
    model: car?.data?.model,
    id: carID,
    price: `${car?.data?.rentalPrice}$`,
  };
  function handleSendBooking(value, carInfo) {
    localStorage.setItem("booking auto", JSON.stringify({ ...value, carInfo }));
  }

  if (!car) return <p>Загрузка...</p>;
  return (
    <div className="container">
      <div className={css.productCardDiv}>
        <div className={css.imgAndBookingFormContainer}>
          <img
            src={car?.data?.img}
            className={css.oneCarImg}
            alt={`Rental Car ${car?.data?.brand} ${car?.data?.model}`}
          />
          <div className={css.bookingFormContainer}>
            <h3 className={css.bookingTitle}>Book your car now</h3>
            <p className={css.bookingParagraph}>
              Stay connected! We are always ready to help you.
            </p>
            <Formik
              onSubmit={(values, { resetForm }) => {
                handleSendBooking(values, carInfo);
                resetForm();

                iziToast.success({
                  title: "Success",
                  message: `You booking: ${carInfo.brand} ${carInfo.model} vs price/1 hour:${carInfo.price} <br>
                  We will contact you soon! 🏎️💨`,
                  position: "topRight",
                  backgroundColor: "#56EA79",
                  titleColor: "#fff",
                  messageColor: "#fff",
                  timeout: 7000,
                  titleFontSize: "25px",
                  messageFontSize: "20px",
                });
              }}
              validationSchema={validationSchema}
              initialValues={{
                name: "",
                email: "",
                bookingDate: "",
                comment: "",
              }}
            >
              <Form className={css.try}>
                <div className={css.bookingInputContainer}>
                  <>
                    <Field
                      type="text"
                      name="name"
                      className={css.bookingInput}
                      placeholder="Name*"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </>
                  <>
                    <Field
                      type="email"
                      name="email"
                      className={css.bookingInput}
                      placeholder="Email*"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </>
                  <DatePickerField name="bookingDate" />
                  <>
                    <Field
                      as="textarea"
                      name="comment"
                      placeholder="Comment"
                      className={css.bookingInput}
                    />
                    <ErrorMessage
                      name="comment"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </>
                </div>
                <button className={css.btnBookingSubmit} type="submit">
                  Send
                </button>
              </Form>
            </Formik>
          </div>
        </div>
        <div className={css.oneCarMainTextContainer}>
          <h2 className={css.firstTitle}>
            {car?.data?.brand} {car?.data?.model}, {car?.data?.year}{" "}
            <span className={css.carID}>Id: {carID}</span>
          </h2>
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
                    src={carIcon}
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

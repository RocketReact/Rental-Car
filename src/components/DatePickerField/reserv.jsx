import { useField, useFormikContext } from "formik";
import { useRef } from "react";
import DatePicker from "react-datepicker";
import css from "./DatePickerField.module.css";
import { ImCalendar } from "react-icons/im";
import "./datepicker-styles.css";
const DatePickerField = ({ name, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const datePickerRef = useRef(null); // <-- добавляем реф

  return (
    <div>
      <div
        className={css.dataPicker}
        onClick={() =>
          datePickerRef.current && datePickerRef.current.setOpen(true)
        }
      >
        <DatePicker
          selected={field.value ? new Date(field.value) : null}
          onChange={(val) => setFieldValue(name, val)}
          {...props}
          className={css.bookingInputData}
          placeholderText="Booking date"
          dateFormat="dd/MM/yyyy"
          minDate={new Date()}
          ref={datePickerRef} // привязываем к рефу
        />
        <div className={css.calendar}>
          <ImCalendar />
        </div>
      </div>
      {meta.touched && meta.error ? (
        <div style={{ color: "red" }}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default DatePickerField;

import { useField, useFormikContext } from "formik";
import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import css from "./DatePickerField.module.css";
import { ImCalendar } from "react-icons/im";
import "./datepicker-styles.css";

const DatePickerField = ({ name, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const datePickerRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const isSameDay = (a, b) =>
    a &&
    b &&
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear();

  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date);
      setFieldValue(name, date);
      // Принудительно закрываем календарь после выбора
      datePickerRef.current?.setOpen(false);
    }
  };

  return (
    <div>
      <div className={css.dataPicker}>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          disabledKeyboardNavigation
          selectsOnFocus={false}
          dayClassName={(date) => {
            const classes = [];
            const today = new Date();
            if (isSameDay(date, selectedDate)) classes.push("dp-selected");
            if (isSameDay(date, today)) classes.push("dp-today");
            return classes.join(" ");
          }}
          calendarClassName="dp-cal"
          {...props}
          className={css.bookingInputData}
          placeholderText="Booking date"
          dateFormat="dd/MM/yyyy"
          minDate={new Date()}
          ref={datePickerRef}
          shouldCloseOnSelect={true}
          showPopperArrow={false}
          calendarStartDay={1}
          autoComplete="off"
          highlightDates={[]}
          onKeyDown={(e) => e.preventDefault()}
          onChangeRaw={(e) => e.preventDefault()}
        />
        <div
          className={css.calendar}
          onClick={() => datePickerRef.current?.setFocus()}
        >
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

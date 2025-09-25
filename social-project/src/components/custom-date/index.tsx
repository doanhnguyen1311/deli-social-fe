import { forwardRef, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { KTIcon } from "@/_metronic/helpers";

interface CustomDateInputProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
}

const CustomDateInput = forwardRef<HTMLInputElement, CustomDateInputProps>(
  ({ value, onChange, ...rest }, ref) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(value || new Date());

    useEffect(() => {
      setSelectedDate(value || new Date());
    }, [value])

    const handleChange = (date: Date | null) => {
      setSelectedDate(date);
      onChange?.(date);
    };

    const CustomInput = forwardRef<HTMLInputElement, any>(({ value, onClick }, ref) => (
      <div
        className="form-input-custom form-control d-flex align-items-center"
        style={{ cursor: "pointer", maxWidth: '200px' }}
        onClick={onClick}
      >
        <input
          style={{ cursor: "pointer", maxWidth: '180px', width: 'auto' }}
          ref={ref}
          type="text"
          readOnly
          value={value}
          {...rest}
          className="border-0 flex-grow-1 fs-14 px-12px"
          placeholder="Select date"
        />
        <span className="input-group-text bg-white border-0 icon-calendar px-8px">
          <KTIcon iconName="calendar" className="fs-18 text-muted" />
        </span>
      </div>
    ));

    return (
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        dateFormat="d MMMM, yyyy"
        customInput={<CustomInput />}
      />
    );
  }
);

export default CustomDateInput;

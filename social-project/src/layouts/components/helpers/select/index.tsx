import { useState } from "react";
import "./style.scss";

interface Option {
  value: string;
  label?: string;
  disabled?: boolean;
  className?: string;
}

interface SelectProps {
  options?: Option[];
  value?: string;
  onChange?: (val: string) => void;
  placeholder?: string;
  theme?: "light" | "dark";
  disabled?: boolean;
  className?: string;
}

export default function Select({
  options = [
    { value: "doanh", label: "Doanh" },
    { value: "hung", label: "Hung" },
    { value: "thang", label: "Thang" },
  ],
  value: propValue,
  onChange,
  placeholder = "Select...",
  theme = "light",
  disabled = false,
  className = "",
}: SelectProps) {
  const [value, setValue] = useState(propValue || "");
  const [open, setOpen] = useState(false);

  const handleSelect = (val: string) => {
    setValue(val);
    setOpen(false);
    onChange?.(val);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Test Select Custom</h2>
      <div className={`select-light ${open ? "open" : ""}`}>
        <div className="selected" onClick={() => !disabled && setOpen(!open)}>
          {value || placeholder}
          <span className={`arrow ${open ? "open" : ""}`}>▼</span>
        </div>
        <ul className="options">
          {options.map((opt) => (
            <li
              key={opt.value}
              className={`${opt.disabled ? "disabled" : ""} ${opt.className || ""}`}
              onClick={() => !opt.disabled && handleSelect(opt.value)}
            >
              {opt.label || opt.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

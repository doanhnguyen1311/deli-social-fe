import { CheckboxProps } from "@/components/types";
import clsx from "clsx";
import { FC, useId } from "react";
import "./style.scss";

const Checkbox: FC<CheckboxProps> = ({
  name,
  className,
  new_class_share = false,
  new_style = false,
  classNameLabel = "",
  classNameWrap,
  label,
  is_document = false,
  desc,
  ...rest
}) => {
  const id = useId();

  return (
    <div
      className={clsx([
        "form-check form-check-custom form-check-solid",
        classNameWrap,
      ])}
    >
      <input
        className={clsx([
          "d-inline-block form-check-input cursor-pointer",
          className,
          new_class_share ? "new-form-check-input" : "",
          new_style ? "checkbox-bg-primary" : "",
        ])}
        name={name}
        id={id}
        type="checkbox"
        {...rest}
      />

      {label && (
        <label
          className={`${
            is_document ? "ms-8px fw-semibold" : "form-check-label"
          }`}
          htmlFor={id}
          style={{ fontSize: "13px", fontWeight: "400", color: "#2B2730" }}
        >
          <div className={clsx(["cursor-pointer", classNameLabel])}>
            {label}
          </div>
          {desc && <div className="text-gray-600">{desc}</div>}
        </label>
      )}
    </div>
  );
};

export default Checkbox;

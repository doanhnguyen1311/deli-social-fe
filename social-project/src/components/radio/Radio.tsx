/* eslint-disable */

import clsx from "clsx";
import { FC, InputHTMLAttributes, useId } from "react";

interface Props
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "name" | "id" | "className"
  > {
  name: string;
  label?: string;
  desc?: string;
  className?: string;
  classNameLabel?: string;
  classFormLabel?: boolean;
  isLast?: boolean;
  useBorder?: boolean;
}

const Radio: FC<Props> = ({
  name,
  className,
  classNameLabel = "",
  label,
  desc,
  classFormLabel = false,
  isLast = false,
  onChange,
  checked,
  useBorder = true,
  "aria-label": ariaLabel,
  ...rest
}) => {
  const id = useId();

  return (
    <div>
      <div className="form-check form-check-custom form-check-solid">
        <input
          className={clsx(["form-check-input me-3 cursor-pointer bg-primary-500", className])}
          name={name}
          id={id}
          type="radio"
          checked={checked}
          onChange={onChange}
          aria-label={ariaLabel || label || name || "radio"}
          {...rest}
        />

        {label && !desc && (
          <label
            className={clsx([
              "dark-gray-500 ",
              classFormLabel ? "fs-16 fw-semibold ms-8px" : "form-check-label",
            ])}
            htmlFor={id}
          >
            <div className={clsx(["cursor-pointer", classNameLabel])}>
              {label}{" "}
            </div>
          </label>
        )}

        {label && desc && (
          <div className="d-flex flex-row gap-12px w-100">
            <div className="d-flex flex-row align-items-center justify-content-between w-25">
              <label
                className={clsx([
                  "dark-gray-500 ",
                  classFormLabel ? "fs-16 fw-bold ms-8px" : "form-check-label",
                ])}
                htmlFor={id}
              >
                <div className={clsx(["cursor-pointer", classNameLabel])}>
                  {label}{" "}
                </div>
              </label>
              <div
                className="fs-12 fw-normal mt-1"
                style={{ color: "#F1F1F4" }}
              >
                |
              </div>
            </div>
            <div className="w-75 fs-12 medium-gray-500 fw-normal mt-1">
              {desc}
            </div>
          </div>
        )}
      </div>
      {!isLast && useBorder && (
        <div style={{ border: "1px dashed #F1F1F4" }} className="my-16px"></div>
      )}
    </div>
  );
};

export default Radio;

/* eslint-disable */

import { InputProps } from "@/component_helper/types";
import {
  faCheck,
  faCircleExclamation,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { ForwardRefRenderFunction, forwardRef, useId, useState } from "react";
import ErrorMessage from "../error/ErrorMessage";
import Label from "../label";
import "./style.scss";

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  {
    id,
    name,
    label,
    insertLeft,
    insertRight,
    type = "text",
    className = "",
    classShared = "",
    symbolMoney = "$",
    symbolPhone = "+65",
    symbolUrl = "https://",
    noThereAreCommas = false,
    isSearchInterestedParty = false,
    required = false,
    showIconTogglePassword = true,
    value = "",
    classInputWrap = "",
    error,
    touched,
    classNameAdvanced = "",
    "aria-label": ariaLabel,
    height46px = true,
    ...rest
  },
  ref
) => {
  const [typeCustom, setTypeCustom] = useState<string>(
    ["money", "phone", "number", "web_url", "percent"].includes(type)
      ? "text"
      : type
  );

  const defaultId = useId();

  // Only handle for type password
  function handleChangeTypeInput() {
    if (type === "password") {
      setTypeCustom(typeCustom === "password" ? "text" : "password");
    }
  }

  // handle deleting characters on firefox
  function handleKeyPress({ noThereAreCommas = true, e }: any) {
    // Only allow integer values
    if (noThereAreCommas && e.key === ".") return e.preventDefault();

    // Concatenate old value and key pressed
    const newValue: string = e.target.value + e.key;
    // still allow 0
    +newValue !== 0 && !+newValue && e.preventDefault();
  }

  function handlePaste({ noThereAreCommas = true, e }: any) {
    const valueCopied = e.clipboardData.getData("text/plain");
    const oldValue = +e.target.value;
    if (
      Number.isNaN(+valueCopied) ||
      ((oldValue % 1 !== 0 || noThereAreCommas) && +valueCopied % 1 !== 0) ||
      +valueCopied < 0
    )
      e.preventDefault();
  }

  function handleGetCharacterInsert() {
    switch (type) {
      case "money":
        return "$";
      case "phone":
        return "+65";
      case "percent":
        return "%";
      case "web_url":
        return "https://";
      default:
        return "";
    }
  }

  return (
    <div className={`${classShared}`}>
      {label && (
        <Label
          htmlFor={id || defaultId || name}
          className="d-flex align-items-center fs-16 fw-semibold mb-8px dark-gray-500"
          label={label}
          required={required}
        />
      )}
      <div
        style={{
          position: "relative",
          borderRadius: isSearchInterestedParty === true ? "20px" : "8px",
        }}
        className={clsx([
          `form-input-custom form-control form-control-solid form-control-lg p-0 d-flex align-items-center overflow-hidden border-violet-500-hover border-violet-500-active dark-gray-500`,
          classInputWrap,
          rest.disabled && "disabled",
          height46px && "h-46px",
          type === "datetime-local" && "custom-datetime-local",
          isSearchInterestedParty === true && "h-50px",
        ])}
      >
        {["money", "phone", "percent", "web_url"].includes(type) ? (
          <div
            className={clsx([
              "d-flex align-items-center ps-12px flex m-0 h-100",
              type === "phone" &&
                "border border-left-0 border-top-0 border-bottom-0 border-right-1 border-black-50 pe-12px",
            ])}
          >
            <span className="lh-1-1 fs-4 mt-2px">
              {handleGetCharacterInsert()}
            </span>
          </div>
        ) : (
          insertLeft && insertLeft
        )}

        <input
          ref={ref}
          type={typeCustom}
          className={clsx([
            `rounded-0 border-0 w-100 h-100 fs-14 px-12px`,
            className,
            classNameAdvanced,
            height46px && "h-46px",
          ])}
          style={{
            color: value === "" ? "#9e9e9e" : "#212121",
          }}
          id={id || defaultId || name}
          name={name}
          aria-label={ariaLabel || label || name || "input"}
          value={value}
          {...rest}
          autoComplete="new-password"
          onKeyPressCapture={(e) =>
            ["number", "money", "phone", "percent"].includes(type) &&
            handleKeyPress({ e: e, noThereAreCommas: noThereAreCommas })
          }
          onPaste={(e) =>
            rest.onPaste
              ? rest.onPaste(e)
              : ["number", "money", "phone", "percent"].includes(type) &&
                handlePaste({ e: e, noThereAreCommas: noThereAreCommas })
          }
        />

        {type === "password"
          ? !!value.toString().length &&
            showIconTogglePassword && (
              <span
                className="pwd-icon text-gray-400 px-8px text-hover-gray-600 cursor-pointer"
                onClick={handleChangeTypeInput}
              >
                <FontAwesomeIcon
                  icon={typeCustom === "password" ? faEyeSlash : faEye}
                  className=""
                />
              </span>
            )
          : insertRight && insertRight}
        {["is-valid", "is-invalid"].includes(className) && (
          <div
            style={{
              color: className === "is-valid" ? "#17c653" : "#f8285a",
              fontSize: className === "is-valid" ? "20px" : "18px",
              background: "white",
              fontWeight: "900",
            }}
            className="h-100 d-flex justify-content-center px-4  align-items-center"
          >
            <FontAwesomeIcon
              icon={className === "is-valid" ? faCheck : faCircleExclamation}
              className=""
            />
          </div>
        )}
      </div>

      {error && touched && <ErrorMessage className="mt-4" message={error} />}
    </div>
  );
};

export default forwardRef(Input);

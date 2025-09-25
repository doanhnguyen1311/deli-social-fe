import { SelectProps } from "@/components/types";
import clsx from "clsx";
import { FC, useId } from "react";
import SelectLib, { StylesConfig } from "react-select";
import ErrorMessage from "../error/ErrorMessage";
import Label from "../label";
import "./style.scss";

const Select: FC<SelectProps | any> = ({
  label,
  options,
  error,
  touched,
  name,
  id,
  className = "",
  isOptionDefault = true,
  required = false,
  classShared = "",
  dropDownGroup,
  keyValueOption = "value",
  keyLabelOption = "label",
  "aria-label": ariaLabel,
  height46px = true,
  height55px = false,
  placeholder = "",
  border = true,
  value,
  onChange,
  onBlur,
  isMulti = false,
  isSearchable = true,
  menuPlacement = "auto",
  customStyles = {},
  ...rest
}) => {
  const defaultId = useId();
  const selectId = id || defaultId || name;

  let mappedOptions = options?.map((o) => ({
    value: o[keyValueOption],
    label: o[keyLabelOption],
  }));

  if (isOptionDefault && placeholder) {
    mappedOptions = [
      { value: ("" as any), label: placeholder },
      ...mappedOptions,
    ];
  }

  const selectedOption = mappedOptions?.find((opt: any) => String(opt.value) === String(value));

  const controlColor = value === "" || value === undefined || value === null ? "#9e9e9e" : "#212121";

  const defaultStyles: StylesConfig = {
    singleValue: (base: any) => ({
      ...base,
      color: controlColor,
      padding: "0",
      margin: "0",
    }),
    control: (base: any, state: any) => ({
      ...base,
      height: height46px ? "46px" : "55px",
      maxHeight: "150px",
      paddingLeft: "12px",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: 400,
      color: controlColor,
      borderColor: state.isFocused ? "#2EA5F5" : "#e8e8e8",
      boxShadow: state.isFocused ? "0 0 2px 3px #DADAF3" : "none",
      ":hover": {
        borderColor: "#2EA5F5",
        boxShadow: "0 0 2px 3px #DADAF3",
      }
    }),
    valueContainer: (base: any) => ({
      ...base,
      padding: "0",
      margin: "0",
    }),
    input: (base: any) => ({
      ...base,
      color: controlColor,
      padding: 0,
    }),
    menu: (base: any) => ({
      ...base,
      zIndex: 9999,
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected ? "#9654f4" : "#fff",
      color: state.isSelected ? "#f1f1f4" : "#212121",
      ":hover": {
        backgroundColor: "#a8d9f9",
        color: "#212121",
      }
    }),
    indicatorSeparator: () => ({ display: "none" }),
    indicatorsContainer: (base: any, state: any) => ({
      ...base,
    }),
  };

  const mergedStyles: StylesConfig = {
    ...defaultStyles,
    ...customStyles,
    singleValue: (base, state) => ({
      ...defaultStyles.singleValue!(base, state),
      ...(customStyles.singleValue?.(base, state) || {}),
    }),
    control: (base, state) => ({
      ...defaultStyles.control!(base, state),
      ...(customStyles.control?.(base, state) || {}),
    }),
    input: (base, state) => ({
      ...defaultStyles.input!(base, state),
      ...(customStyles.input?.(base, state) || {}),
    }),
    menu: (base, state) => ({
      ...defaultStyles.menu!(base, state),
      ...(customStyles.menu?.(base, state) || {}),
    }),
    option: (base, state) => ({
      ...defaultStyles.option!(base, state),
      ...(customStyles.option?.(base, state) || {}),
    }),
    valueContainer: (base, state) => ({
      ...defaultStyles.valueContainer!(base, state),
      ...(customStyles.valueContainer?.(base, state) || {}),
    }),
    indicatorSeparator: (base, state) => ({
      ...defaultStyles.indicatorSeparator!(base, state),
      ...(customStyles.indicatorSeparator?.(base, state) || {}),
    }),
    indicatorsContainer: (base, state) => ({
      ...defaultStyles.indicatorsContainer!(base, state),
      ...(customStyles.indicatorsContainer?.(base, state) || {}),
    }),
  };

  return (
    <div className={classShared}>
      {label && (
        <Label
          htmlFor={selectId}
          className="d-flex align-items-center fs-15 fw-semibold mb-8px dark-gray-500"
          label={label}
          required={required}
        />
      )}

      <SelectLib
        inputId={selectId}
        name={name}
        classNamePrefix=""
        isMulti={isMulti}
        isSearchable={isSearchable}
        value={selectedOption}
        onChange={(selected: any) => {
          const selectedVal = Array.isArray(selected)
            ? selected.map((opt) => opt.value)
            : selected?.value;
          onChange?.({ target: { name, value: selectedVal } } as any);
        }}
        onBlur={() => onBlur?.({ target: { name } } as any)}
        options={mappedOptions}
        placeholder={placeholder}
        menuPlacement={menuPlacement}
        className={clsx(
          "form-select-custom fs-14 fw-normal",
          className,
          height46px && "h-46px",
          height55px && "h-55px",
          border && "border-black-50"
        )}
        styles={mergedStyles}
        {...rest}
      />

      {error && touched && <ErrorMessage className="mt-2" message={error} />}
    </div>
  );
};

export default Select;
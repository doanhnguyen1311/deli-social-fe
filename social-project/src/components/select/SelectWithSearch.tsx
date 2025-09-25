import { KTIcon } from "@/_metronic/helpers";
import { SelectProps } from "@/components/types";
import clsx from "clsx";
import { FC, JSX, ReactNode, useId, useState } from "react";
import Select, { StylesConfig } from 'react-select';
import ErrorMessage from "../error/ErrorMessage";
import Label from "../label";

const DropdownIndicator = () => (
    <div style={{ color: "#9e9e9e", marginLeft: 'auto', marginRight: '12px' }}>
        <KTIcon iconName="magnifier" className={clsx("fs-18 ms-auto")} />
    </div>
);

const Dropdown = ({
    children,
    isOpen,
    target,
    onClose,
}: {
    children?: ReactNode;
    readonly isOpen: boolean;
    readonly target: ReactNode;
    readonly onClose: () => void;
}) => (
    <div className="form-select-custom fs-14 fw-normal position-relative min-w-120px">
        {target}
        {isOpen ? <Menu>{children}</Menu> : null}
        {isOpen ? <Blanket onClick={onClose} /> : null}
    </div>
);

const Menu = (props: JSX.IntrinsicElements['div']) => {
    const shadow = 'hsla(218, 50%, 10%, 0.1)';
    return (
        <div
            className=""
            {...props}
            style={{
                backgroundColor: 'white',
                borderRadius: 4,
                boxShadow: `0 0 0 1px ${shadow}, 0 4px 11px ${shadow}`,
                marginTop: 8,
                marginBottom: 8,
                position: 'absolute',
                zIndex: 2,
                width: '100%',
            }}
        />
    );
};
const Blanket = (props: JSX.IntrinsicElements['div']) => (
    <div
        className=""
        style={{
            bottom: 0,
            left: 0,
            top: 0,
            right: 0,
            position: 'fixed',
            zIndex: 1,
        }}
        {...props}
    />
);


const SelectWithSearch: FC<SelectProps | any> = ({
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
    accCompanySelect = false,
    ...rest
}) => {
    const defaultId = useId();
    const selectId = id || defaultId || name;
    const [isOpen, setIsOpen] = useState(false);

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
        }),
        control: (base: any, state: any) => ({
            ...base,
            minWidth: 240,
            margin: "8px",
            height: "100%",
            maxHeight: "150px",
            paddingLeft: "12px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 400,
            color: controlColor,
            borderColor: state.isFocused ? "#2EA5F5" : "#e8e8e8",
            boxShadow: state.isFocused ? "0 0 1px 2px #DADAF3" : "none",
            ":hover": {
                borderColor: "#2EA5F5",
                boxShadow: "0 0 1px 2px #DADAF3",
            },
            position: "relative",
            padding: 0,
        }),
        valueContainer: (base: any) => ({
            ...base,
            padding: "12px 8px",
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
            margin: 0,
            padding: "0",
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "0px",
            borderBottomRightRadius: "8px",
            borderBottomLeftRadius: "8px",
            position: "relative",
        }),
        menuList: (base: any) => ({
            ...base,
            padding: "0",
            zIndex: 9999,
        }),
        option: (base: any, state: any) => ({
            ...base,
            padding: "12px 17px",
            backgroundColor: state.isSelected ? "#9654f4" : "#fff",
            color: state.isSelected ? "#f1f1f4" : "#212121",
            ":hover": {
                backgroundColor: "#a8d9f9",
                color: "#212121",
            }
        }),
        container: (base: any) => ({
            ...base,
            padding: "1px 0px",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            borderBottomRightRadius: "0px",
            borderBottomLeftRadius: "0px",
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
        menuList: (base, state) => ({
            ...defaultStyles.menuList!(base, state),
            ...(customStyles.menuList?.(base, state) || {}),
        }),
        option: (base, state) => ({
            ...defaultStyles.option!(base, state),
            ...(customStyles.option?.(base, state) || {}),
        }),
        container: (base, state) => ({
            ...defaultStyles.container!(base, state),
            ...(customStyles.container?.(base, state) || {}),
        }),
    };

    return (
        <>
            {label && (
                <Label
                    htmlFor={selectId}
                    className="d-flex align-items-center fs-15 fw-semibold mb-8px dark-gray-500"
                    label={label}
                    required={required}
                />
            )}

            <Dropdown
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                target={
                    <div
                        className={clsx(
                            "d-flex align-items-center w-100 form-input-custom form-control form-control-solid form-control-lg cursor-pointer fw-normal border-violet-500-hover border-violet-500-active p-12px min-w-120px",
                            height46px && "h-46px",
                            height55px && "h-55px",
                            classShared
                        )}
                        onClick={() => setIsOpen((prev) => !prev)}
                        style={isOpen ? { borderColor: "#2EA5F5", boxShadow: "0 0 2px 3px #DADAF3", color: controlColor } : { color: controlColor }}
                    >
                        {accCompanySelect && placeholder === "Select Company" && (
                            <div className="d-flex align-items-center medium-gray-500">
                                <KTIcon iconName="geolocation" className="fs-18 me-2" />
                                Company: 
                            </div>
                        )}
                        <span className={clsx("ms-0px", placeholder === "Select Company" && "ms-8px dark-gray-500")}>{selectedOption?.label || placeholder}</span>
                        <KTIcon iconName="down" className={clsx("fs-18 ms-auto", isOpen && "dark-gray-500")} />
                    </div>
                }
            >

                <Select
                    autoFocus
                    menuIsOpen
                    components={{ DropdownIndicator, IndicatorSeparator: null }}
                    inputId={selectId}
                    name={name}
                    classNamePrefix=""
                    isMulti={isMulti}
                    controlShouldRenderValue={false}
                    hideSelectedOptions={false}
                    tabSelectsValue={false}
                    isSearchable={isSearchable}
                    menuPlacement={menuPlacement}
                    value={selectedOption}
                    onChange={(selected: any) => {
                        const selectedVal = Array.isArray(selected)
                            ? selected.map((opt) => opt.value)
                            : selected?.value;
                        onChange?.({ target: { name, value: selectedVal } } as any);
                        setIsOpen(false);
                    }}
                    onBlur={() => onBlur?.({ target: { name } } as any)}
                    options={mappedOptions}
                    placeholder={placeholder}
                    className={clsx(
                        "fs-14 fw-normal",
                        className,
                        border && "border-black-50"
                    )}
                    styles={mergedStyles}
                    {...rest}
                />
            </Dropdown>
            {error && touched && <ErrorMessage className="mt-2" message={error} />}
        </>
    );
};

export default SelectWithSearch;
/* eslint-disable */
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import "./style.scss";

interface Props
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  className?: string;
  classNameIcon?: string;
  loading?: boolean;
  textLoading?: string;
  children?: ReactNode;
  iconLeft?: IconProp;
  iconRight?: IconProp;
  btnSecondary?: any;
  btnSecond?: boolean;
}

const Button: FC<Props> = ({
  className = "btn-btn-custom",
  btnSecondary = "",
  classNameIcon = "",
  loading,
  textLoading,
  children,
  iconLeft,
  btnSecond = false,
  iconRight,
  title,
  "aria-label": ariaLabel,
  ...rest
}) => {
  const defaultTitle =
    typeof children === "string"
      ? children
      : Array.isArray(children) && typeof children[1] === "string"
      ? children[1]
      : "button";

  return (
    <button
      className={clsx([
        "btn rounded-8px",
        className,
        btnSecondary,
        btnSecond === true ? "btn-btn-secondary" : "",
      ])}
      {...rest}
      title={title || defaultTitle}
      aria-label={ariaLabel || "button"}
    >
      {iconLeft && (
        <FontAwesomeIcon
          icon={iconLeft}
          className={clsx(["me-2", classNameIcon])}
        />
      )}
      {loading ? (textLoading ? textLoading : "Please wait...") : children}
      {iconRight && (
        <FontAwesomeIcon
          icon={iconRight}
          className={clsx(["ms-2", classNameIcon])}
        />
      )}
      {loading && (
        <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
      )}
    </button>
  );
};

export default Button;

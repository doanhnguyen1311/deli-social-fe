import clsx from "clsx";
import { FC } from "react";

type Props = {
  className?: string;
};
const Loading: FC<Props> = ({ className }) => {
  const styles = {
    borderRadius: "0.475rem",
    boxShadow: "0 0 50px 0 rgb(82 63 105 / 15%)",
    color: "#7e8299",
    fontWeight: "500",
    padding: "1rem 2rem",
    top: "calc(50% - 2rem)",
    left: "calc(50% - 4rem)",
    zIndex: 100,
  };

  return (
    <div
      className={clsx([
        "loading-container bg-white m-0 w-auto position-absolute text-center",
        className,
      ])}
      style={{ ...styles }}
    >
      Loading...
    </div>
  );
};

export default Loading;

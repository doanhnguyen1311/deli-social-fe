import { FC } from "react";

type Props = {
  message?: string;
};

const NoRecord: FC<Props> = ({ message }) => {
  return (
    <div className="d-flex flex-column align-items-center">
      <span className="fs-14 fw-semibold text-gray-600 d-block">
        {message || "No matching records found"}
      </span>
    </div>
  );
};

export default NoRecord;

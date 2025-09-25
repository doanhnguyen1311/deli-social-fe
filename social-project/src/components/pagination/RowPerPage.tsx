import { ChangeEvent, FC } from "react";
import { Select } from "../select";

type Props = {
  pageSize: number;
  total: number;
  currentPage: number;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const optionDefault = [
  { value: 10, label: 10 },
  { value: 25, label: 25 },
  { value: 50, label: 50 },
  { value: 100, label: 100 },
];

const RowPerPage: FC<Props> = ({
  pageSize = 10,
  currentPage = 1,
  total = 0,
  onChange,
}) => {
  return (
    <div
      className="d-flex align-items-center cursor-pointer w-50"
      style={{ display: "flex", alignItems: "center" }}
    >
      <div className="me-16px">
        <Select
          classShared="fs-6 text-start cursor-pointer min-w-55px medium-gray-500 h-46px mh-46px d-flex"
          onChange={onChange}
          name="RowPerPage"
          isOptionDefault={false}
          value={pageSize}
          options={optionDefault}
          menuPlacement="top"
          isSearchable={false}
        />
      </div>
      <p className="mb-0 medium-gray-500 fs-14 fw-semibold">
        {currentPage * Number(pageSize) - (Number(pageSize) - 1) < total
          ? currentPage * Number(pageSize) - (Number(pageSize) - 1)
          : total}{" "}
        {""}-{" "}
        {currentPage * Number(pageSize) > total
          ? total
          : currentPage * Number(pageSize)}{" "}
        of {total}
      </p>
    </div>
  );
};

export default RowPerPage;

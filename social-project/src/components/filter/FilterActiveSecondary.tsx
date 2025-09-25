import clsx from 'clsx';
import { X } from 'lucide-react';
import moment from 'moment';
import { useMemo } from 'react';
import { UserRole, UserStatus } from '../types/enum';
import { filterObjectKeyNotEmpty, isObject } from '../utils';

type Props = {
  dataFilter: Record<string, any>;
  onRemoveFilter: (key?: string, ...keys: string[]) => void;
  className?: string;
  listCompany?: any[];
  listCountries?: any[];
};

const FilterActiveSecondary = ({
  dataFilter,
  className,
  onRemoveFilter,
  listCompany = [],
  listCountries = []
}: Props) => {
  if (!dataFilter) return null;

  const filterHasValue = useMemo(() => {
    const rawFilters = Object.entries(dataFilter)
      .map(([key, value]) => ({ key, value }))
      .filter(({ value }) => value !== null && value !== undefined && value !== "");

    return rawFilters.reduce<Record<string, any>>((acc, { key, value }) => {
      if (isObject(value)) {
        if (value.in) {
          const filtered = value.in.filter((v: any) => v || v === 0);
          if (filtered.length) acc[key] = { key, value: filtered };
        } else {
          const inner = filterObjectKeyNotEmpty(value);
          if (Object.keys(inner).length) acc[key] = { key, value: inner };
        }
      } else {
        acc[key] = { key, value };
      }
      return acc;
    }, {});
  }, [dataFilter]);

  if (!filterHasValue || !Object.keys(filterHasValue).length) return null;
  const keys = Object.keys(filterHasValue);

  const { from_date, to_date } = {
    from_date: filterHasValue.from_date?.value ?? null,
    to_date: filterHasValue.to_date?.value ?? null,
  };

  const formatKey = (key: string): string => {
    if (key === "company_id") return "Company";
    if (key === "country_id") return "Country";
    return key
      .replace(/[_\-\/]+/g, " ")
      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
      .trim()
      .split(" ")
      .map(w =>
        w === w.toUpperCase() && w.length > 1
          ? w
          : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
      )
      .join(" ");
  };

  const formatValue = (key: string, value: any) => {
    switch (key) {
      case "company_id":
        return listCompany.find(c => c.company_id === value)?.company_name ?? value;
      case "country_id":
        return listCountries.find(c => c.id === value)?.nicename ?? value;
      case "role":
        return value === UserRole.ADMIN.toString() ? "Admin" : "User";
      case "status":
        return value === UserStatus.ACTIVE.toString()
          ? "Active"
          : value === UserStatus.INACTIVE.toString()
          ? "Inactive"
          : value;
      case "last_login":
        return value ? moment(value).format("DD MMM YYYY") : value;
      default:
        return value;
    }
  };

  return (
    <div className={clsx("d-flex align-items-center gap-16px m-0 px-24px py-12px", className)}>
      <h2 className="fs-14 dark-gray-500 fw-semibold m-0">Filter:</h2>

      <div className="d-flex justify-content-start align-items-center flex-wrap gap-16px">
        {(from_date || to_date) && (
          <div className="d-flex align-items-center fs-12 fw-semibold px-8px py-4px border rounded-16px">
            <div className="dark-gray-500 d-flex">
              <span className="medium-gray-600 fw-normal me-4px">Date:</span>
              {from_date ? moment(from_date).format("DD MMM YYYY") : "..."} -{" "}
              {to_date ? moment(to_date).format("DD MMM YYYY") : "..."}
            </div>
            <div
              onClick={() => onRemoveFilter("from_date", "to_date")}
              className="p-0 ms-8px cursor-pointer dark-gray-500 primary-500-hover"
            >
              <X size={14} className="mb-1px" />
            </div>
          </div>
        )}

        {keys.map((key, i) => {
          const { key: keyName, value } = filterHasValue[key];
          if (!value || ["from_date", "to_date"].includes(keyName)) return null;

          return (
            <div
              key={i}
              className="d-flex align-items-center fs-12 fw-semibold px-8px py-4px border rounded-16px"
            >
              <div className="dark-gray-500">
                <span className="medium-gray-600 fw-normal me-4px">{formatKey(keyName)}:</span>
                {formatValue(keyName, value)}
              </div>
              <div
                onClick={() => onRemoveFilter(keyName)}
                className="p-0 ms-8px cursor-pointer dark-gray-500 primary-500-hover"
              >
                <X size={14} className="mb-1px" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilterActiveSecondary;

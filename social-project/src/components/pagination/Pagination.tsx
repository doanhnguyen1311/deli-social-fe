import { SearchCriteria } from "@/components/types";
import clsx from "clsx";
import { FC, useMemo, useEffect, useState } from "react";

type Props = {
  onChange: (newPage: number) => void;
  isLoading?: boolean;
  searchCriteria: SearchCriteria;
};

const mappedLabel = (label: string): string => {
  if (label === "&laquo; Previous") {
    return "<";
  }

  if (label === "Next &raquo;") {
    return ">";
  }

  return label;
};

const Pagination: FC<Props> = ({
  onChange,
  isLoading = false,
  searchCriteria,
}) => {
  const { total, currentPage, pageSize } = searchCriteria;

  const [isBigMonitor, setIsBigMonitor] = useState<boolean>(
    window.document.documentElement.clientWidth > 600
  );

  useEffect(() => {
    const handleResize = () => {
      const clientWidth = document.documentElement.clientWidth;
      setIsBigMonitor(clientWidth > 992);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      setIsBigMonitor(true);
    };
  }, []);

  // no item found will return 1
  const totalPagination = useMemo(() => {
    return Math.ceil(total / pageSize) || 1;
  }, [total, pageSize]);

  const arrayPage = useMemo(() => {
    const totalPages = totalPagination || 0;
    const maxPagesToShow = 10;

    if (totalPages === 0) return [];

    const array = Array.from({ length: totalPages }, (_, i) => i + 1);

    if (totalPages <= maxPagesToShow) return array;

    const half = Math.floor(maxPagesToShow / 2);
    let start = currentPage - half;
    let end = currentPage + half - 1;

    // Adjust if near the start
    if (start < 1) {
      start = 1;
      end = maxPagesToShow;
    }

    // Adjust if near the end
    if (end > totalPages) {
      end = totalPages;
      start = totalPages - maxPagesToShow + 1;
    }

    return array.slice(start - 1, end);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPagination, currentPage, pageSize]);

  return (
    <div className="d-flex w-50">
      <div
        id="kt_table_users_paginate"
        className="w-100 align-items-center justify-content-end d-flex flex-row"
      >
        <ul className={clsx("pagination", { "d-none": isBigMonitor })}>
          {arrayPage.map((pageNumber) => {
            const isActive = currentPage === pageNumber;
            return (
              <li
                key={pageNumber}
                className={clsx("page-item d-flex align-self-center", {
                  active: isActive,
                  disabled: isLoading,
                })}
              >
                <span
                  className={clsx("page-link")}
                  onClick={() => {
                    onChange(pageNumber);
                  }}
                  style={{
                    cursor: "pointer",
                    height: "25px",
                    display: "flex",
                    alignSelf: "center",
                    width: "25px",
                    borderRadius: "8px",
                  }}
                >
                  {pageNumber}
                </span>
              </li>
            );
          })}
        </ul>
        <ul className="pagination">
          <li
            className={clsx("page-item", {
              disabled: isLoading || currentPage === 1,
              previous: true,
            })}
          >
            <span
              className={clsx("page-link", {
                "page-text": true,
              })}
              onClick={() => onChange(currentPage - 1)}
              style={{ cursor: "pointer", fontSize: "20px" }}
            >
              {mappedLabel("&laquo; Previous")}
            </span>
          </li>
          <li
            className={clsx("page-item", {
              disabled: isLoading || currentPage >= totalPagination,
              next: true,
            })}
          >
            <span
              className={clsx("page-link", {
                "page-text": true,
              })}
              onClick={() => onChange(currentPage + 1)}
              style={{ cursor: "pointer", fontSize: "20px" }}
            >
              {mappedLabel("Next &raquo;")}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Pagination;

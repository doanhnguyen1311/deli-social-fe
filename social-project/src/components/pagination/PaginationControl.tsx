import { SearchCriteria } from "@/components/types";
import clsx from "clsx";
import { ChangeEvent, FC, useEffect, useMemo, useState } from "react";
import Pagination from "./Pagination";
import RowPerPage from "./RowPerPage";

type Props = {
  searchCriteria: SearchCriteria;
  onChangePageSize: (e: ChangeEvent<HTMLSelectElement>) => void;
  onChangeCurrentPage: (newPage: number) => void;
  className?: string;
  isShowPageSize?: boolean;
};
export const PaginationControl: FC<Props> = ({
  searchCriteria,
  className,
  onChangePageSize,
  onChangeCurrentPage,
  isShowPageSize = true,
}) => {
  const { total, pageSize, currentPage } = searchCriteria;

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
    <div
      className={clsx([
        "d-flex align-items-center justify-content-between p-24px pt-0px",
        className,
      ])}
      style={{
        background:
          "linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.93) 39.93%, #FFF 79.86%)",
        borderTopLeftRadius: "24px",
        borderTopRightRadius: "24px",
      }}
    >
      {isBigMonitor ? (
        <>
          {isShowPageSize === true && (
            <RowPerPage
              total={total}
              pageSize={pageSize}
              currentPage={currentPage}
              onChange={onChangePageSize}
            />
          )}
        <ul className="pagination w-100">
          {arrayPage.map((pageNumber) => {
            const isActive = currentPage === pageNumber;
            return (
              <li
                key={pageNumber}
                className={clsx("page-item d-flex align-self-center", {
                  active: isActive,
                })}
              >
                <span
                  className={clsx("page-link")}
                  onClick={() => {
                    onChangeCurrentPage(pageNumber);
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
          <Pagination
            onChange={onChangeCurrentPage}
            searchCriteria={searchCriteria}
          />
        </>
      ) : (
        <div className="w-100 d-flex align-items-center justify-content-center">
          <Pagination
            onChange={onChangeCurrentPage}
            searchCriteria={searchCriteria}
          />
        </div>
      )}
    </div>
  );
};

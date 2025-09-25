import clsx from "clsx";
import { useEffect, useState } from "react";
import request from "../axios";

const formatHeader = (header: string) => {
  if (!header) return "";

  const withSpaces = header.replace(/[-_]/g, " ");

  return withSpaces
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const DynamicTable = ({ data, className, companyId }) => {
  const [chartOfAccounts, setChartOfAccounts] = useState([]);

  const normalizedData = Array.isArray(data)
    ? data
    : data && typeof data === "object"
    ? [data]
    : [];

  useEffect(() => {
    const fetchChartOfAccounts = async () => {
      try {
        const response = await request.post("/chart-account/get", {
          company_id: companyId,
        });
        const formatData = response?.data?.data.map((item: any) => ({
          name: `${item.number} - ${item.name}`,
          number: item.number,
        }));
        setChartOfAccounts(formatData);
      } catch (error) {
        console.error("Error fetching chart of accounts:", error);
      }
    };

    fetchChartOfAccounts();
  }, [companyId]);

  if (
    !normalizedData ||
    !normalizedData.length ||
    !Array.isArray(normalizedData)
  ) {
    return (
      <div
        className="d-flex text-center w-100 align-content-center justify-content-center fs-14 fw-semibold py-8px"
        style={{ border: "1px solid #E0E0E0", fontStyle: "italic" }}
      >
        No data in table
      </div>
    );
  }

  const headers = Object.keys(normalizedData[0]);

  return (
    <div className={clsx("overflow-auto", className)}>
      <table
        className={clsx("dynamic-table w-100")}
        style={{
          borderCollapse: "collapse",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          border: "1px solid #E0E0E0",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                padding: "8px",
                borderBottom: "1px solid #E0E0E0",
                borderRight: "1px solid #E0E0E0",
                textAlign: "right",
              }}
              className="fs-14 fw-normal dark-gray-500"
            >
              #
            </th>
            {headers.map((header, index) => {
              return (
                <th
                  key={index}
                  style={{
                    padding: "8px",
                    borderBottom: "1px solid #E0E0E0",
                    borderRight:
                      index < headers.length - 1 ? "1px solid #E0E0E0" : "none",
                    textAlign:
                      header === "description" || header === "name"
                        ? "left"
                        : "right",
                  }}
                  className="fs-14 fw-normal dark-gray-500"
                >
                  {formatHeader(header)}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {normalizedData?.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td
                style={{
                  padding: "8px",
                  borderBottom: "1px solid #E0E0E0",
                  borderRight: "1px solid #E0E0E0",
                  textAlign: "right",
                  color: "#212121",
                  opacity: "64%",
                }}
                className="fs-14 fw-normal"
              >
                {rowIndex + 1}
              </td>
              {headers.map((header, colIndex) => (
                <td
                  key={colIndex}
                  style={{
                    padding: "8px",
                    borderBottom: "1px solid #E0E0E0",
                    borderRight:
                      colIndex < headers.length - 1
                        ? "1px solid #E0E0E0"
                        : "none",
                    textAlign:
                      header === "description" || header === "name"
                        ? "left"
                        : "right",
                    color: "#212121",
                    opacity: "64%",
                  }}
                  className="fs-14 fw-normal"
                >
                  {header === "Account"
                    ? chartOfAccounts.filter(
                        (item) => row[header] === item.number
                      )[0]?.name
                    : row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;

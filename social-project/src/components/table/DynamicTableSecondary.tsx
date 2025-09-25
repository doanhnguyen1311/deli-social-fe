import { KTIcon } from "@/_metronic/helpers";
import clsx from "clsx";
import { GripVertical } from "lucide-react";
import { useEffect, useState } from "react";
import request from "../axios";
import Button from "../button/Button";
import { Input } from "../input";
import { Select } from "../select";

interface IndexItem {
  id: string;
  name: string;
}

interface AnyObj {
  [key: string]: any;
}

const DynamicTableSecondary = ({
  data: inputData,
  className,
  setItemAdded,
  companyId,
}) => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [nextRowId, setNextRowId] = useState(1);
  const [nextColId, setNextColId] = useState(1);
  const [draggedColumn, setDraggedColumn] = useState(null);
  const [chartOfAccounts, setChartOfAccounts] = useState([]);

  useEffect(() => {
    if (
      inputData?.items &&
      Array?.isArray(inputData?.items) &&
      inputData.items.length > 0
    ) {
      initializeFromData(inputData?.items);
    }
  }, [inputData]);

  useEffect(() => {
    const reordered = reorderValues(columns, data);
    setItemAdded(reordered);
  }, [data, columns]);

  useEffect(() => {
    fetchChartOfAccounts();
  }, []);

  const fetchChartOfAccounts = async () => {
    try {
      const response = await request.post("/chart-account/get", {
        company_id: companyId,
      });
      const formatData = response?.data?.data.map((item: any) => ({
        name: `${item.number} - ${item.name}`,
        number: item.number
      }))
      setChartOfAccounts(formatData);
    } catch (error) {
      console.error("Error fetching chart of accounts:", error);
    }
  };

  const formatForSubmit = (str: string) =>
    // first collapse both spaces and underscores into single spaces,
    // then swap spaces to underscores
    str
      .replace(/[_\s]+/g, " ")
      .trim()
      .replace(/\s/g, "_");


  const formatHeaderName = (key: string): string => {
    // 1. normalize separators to spaces
    let nice = key.replace(/[_\/\-]+/g, " ");
    // 2. split lower→Upper boundaries: "stockCode" → "stock Code"
    nice = nice.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
    // 3. collapse whitespace
    nice = nice.trim().replace(/\s+/g, " ");

    // 4. break into words
    const words = nice.split(" ");

    // 5. function to capitalize unless it’s an ALL‐CAPS acronym
    const cap = (w: string) =>
      w === w.toUpperCase() && w.length > 1
        ? w
        : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();

    const name = words.map(cap).join(" ");

    return name;
  };

  const initializeFromData = (inputData: any[]) => {
    if (!inputData || !Array.isArray(inputData) || inputData.length === 0) {
      return;
    }

    const firstRow = inputData[0];
    const detectedColumns = Object.keys(firstRow)
      .filter((key) => key !== "id")
      .map((key) => ({
        id: key,
        name: formatHeaderName(key),
      }));

    const processedData = inputData.map((row, index) => {
      const processedRow = { id: row.id || index + 1 };
      detectedColumns.forEach((col) => {
        processedRow[col.id] = row[col.id] || "";
      });
      return processedRow;
    });

    setColumns(detectedColumns);
    setData(processedData);

    const maxRowId = Math.max(...processedData.map((row) => row.id), 0);
    const maxColId = detectedColumns.length;
    setNextRowId(maxRowId + 1);
    setNextColId(maxColId + 1);
  };

  const addRow = () => {
    const newRow = { id: nextRowId };
    columns.forEach((col) => {
      newRow[col.id] = "";
    });
    setData([...data, newRow]);
    setNextRowId(nextRowId + 1);
  };

  const removeRow = (rowId) => {
    setData(data.filter((row) => row.id !== rowId));
  };

  const allowedColumnNames = ["Name", "Description", "Qty", "Price", "Discount", "Item Amount"];

  const addColumn = () => {
    const usedNames = columns.map(col => col.name);
    const availableNames = allowedColumnNames.filter(name => !usedNames.includes(name));

    if (availableNames.length === 0) return;

    const newColId = formatForSubmit(availableNames[0]);
    const newColumn = {
      id: newColId,
      name: availableNames[0],
    };

    setColumns([...columns, newColumn]);

    const updatedData = data.map((row) => ({
      ...row,
      [newColId]: "",
    }));
    setData(updatedData);
    setNextColId(nextColId + 1);
  };

  const removeColumn = (colId) => {
    setColumns(columns.filter((col) => col.id !== colId));

    const updatedData = data.map((row) => {
      const { [colId]: removed, ...rest } = row;
      return rest;
    });
    setData(updatedData);
  };

  const addChartOfAccountColumn = () => {
    const newColId = `coa_${nextColId}`;
    const newColumn = {
      id: "Account",
      name: "Account",
      type: "chartOfAccount"
    };

    setColumns([...columns, newColumn]);

    // Add empty string for new column in all existing rows
    const updatedData = data.map(row => ({
      ...row,
      [newColId]: ""
    }));
    setData(updatedData);
    setNextColId(nextColId + 1);
  };

  const updateCell = (rowId, colId, value) => {
    const updatedData = data.map((row) =>
      row.id === rowId ? { ...row, [colId]: value } : row
    );
    setData(updatedData);
  };

  const updateColumnName = (colId: string, newName: string) => {
    const updatedColumns = columns.map((col) =>
      col.id === colId ? { ...col, name: newName } : col
    );
    setColumns(updatedColumns);
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    columnIndex: number
  ) => {
    setDraggedColumn(columnIndex);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetIndex: number
  ) => {
    e.preventDefault();
    if (draggedColumn === null || draggedColumn === targetIndex) return;

    const newColumns = [...columns];
    const draggedItem = newColumns[draggedColumn];

    newColumns.splice(draggedColumn, 1);
    newColumns.splice(targetIndex, 0, draggedItem);

    setColumns(newColumns);
    setDraggedColumn(null);
  };

  const initializeTable = () => {
    if (columns.length === 0) {
      const initialColumns = allowedColumnNames.map(name => ({
        id: formatForSubmit(name),
        name: name
      }));
      setColumns(initialColumns);
      setNextColId(initialColumns.length + 1);
    }
    if (data.length === 0) {
      setTimeout(() => {
        addRow();
      }, 0);
    }
  };

  const reorderValues = (
    indexOrder: IndexItem[],
    valueArray: AnyObj[]
  ): AnyObj[] => {
    return valueArray.map((original) => {
      const reordered: AnyObj = {};

      indexOrder.forEach(({ id, name }) => {
        // normalize the header name to a canonical “submit” key
        const base = formatForSubmit(name);
        // if it’s purely numeric, prefix with an underscore
        const key = /^\d+$/.test(base) ? `_${base}` : base;
        reordered[key] = original[id];
      });

      return reordered;
    });
  };

  // Render cell input based on column type
  const renderCellInput = (row: AnyObj, column: AnyObj) => {
    if (column.id === "Account" || column.type === "chartOfAccount") {
      return (
        <Select
          value={row[column.id] || ""}
          isSearchable={false}
          onChange={(e) => updateCell(row.id, column.id, e.target.value)}
          options={chartOfAccounts}
          placeholder="Select Account"
          keyLabelOption="name"
          keyValueOption="number"
          customStyles={{
            menu: () => ({
              zIndex: 9999,
              opacity: 1,
              textAlign: "left",
              minWidth: "130px"
            }),
            control: () => ({
              textAlign: "left",
              minWidth: "130px"
            }),
            input: () => ({
              textAlign: "left",
              minWidth: "130px"
            })
          }}
        />
      );
    }
    // Default text input
    return (
      <Input
        type="text"
        value={row[column.id] || ""}
        onChange={(e) =>
          updateCell(row.id, column.id, e.target.value)
        }
        className="bg-transparent border-0 font-semibold text-start"
        classShared="w-100"
        placeholder="Enter data..."
      />
    );
  };

  return (
    <div className={clsx("max-w-6xl mx-auto", className)}>
      <div className="d-flex gap-2 flex-wrap">
        <div className="d-flex flex-row mb-8px w-100">
          <div className="d-flex gap-8px w-100">
            {columns.length === 0 && data.length === 0 ? (
              <div className="d-flex w-100 align-items-center justify-content-center">
                <div className="d-flex flex-column gap-12px text-center">
                  <span className="fs-14 fw-normal medium-gray-500">
                    No data found.{" "}
                    <span
                      className="cursor-pointer text-primary text-hover-underline"
                      onClick={initializeTable}
                    >
                      Click here to initialize the table.
                    </span>
                  </span>
                </div>
              </div>
            ) : (
              <div className="d-flex flex-row gap-8px w-100 align-items-end justify-content-end">
                {allowedColumnNames.length + 1 > columns.length &&
                  !(columns.length >= allowedColumnNames.length && columns.filter((col) => col.id === "Account").length === 0)
                  && ( // Check if there are columns left to add (excluding "Account")
                    <Button className="btn-success text-white" onClick={addColumn}>
                      + Add New Column
                    </Button>
                  )}
                {(columns.filter((col) => col.id === "Account").length === 0 &&
                  columns.filter((col) => col.type === "chartOfAccount").length === 0
                ) && (
                    <Button className="btn-success text-white" onClick={addChartOfAccountColumn}>
                      + Add Account
                    </Button>
                  )}
                <Button className="btn-light-info" onClick={addRow}>
                  + Add New Row
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {columns?.length > 0 && (
        <div className={clsx("", className)}>
          <table
            className={clsx("dynamic-table w-100")}
            style={{
              borderCollapse: "collapse",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              border: "1px solid #E0E0E0",
            }}
          >
            <thead>
              <tr className="bg-gray-50">
                <th
                  style={{
                    padding: "8px",
                    borderBottom: "1px solid #E0E0E0",
                    borderRight: "1px solid #E0E0E0",
                    textAlign: "right",
                  }}
                  className="fs-14 fw-normal dark-gray-500 text-center"
                >
                  #
                </th>
                {columns.map((column: any, index: number) => (
                  <th
                    key={column.id}
                    style={{
                      padding: "8px",
                      borderBottom: "1px solid #E0E0E0",
                      borderRight: "1px solid #E0E0E0",
                      textAlign: "right",
                    }}
                    className="fs-14 fw-normal dark-gray-500"
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      <GripVertical
                        size={16}
                        className="text-gray-400 cursor-move flex-shrink-0"
                      />
                      {(column.id === "Account" || column.type === "chartOfAccount") ? (
                        <Input
                          classShared="w-100 min-w-130px"
                          type="text"
                          value={"Account"}
                          disabled={column.id === "Account" || column.type === "chartOfAccount"}
                        />
                      ) : (
                        <Select
                          classShared="w-100"
                          value={column.name}
                          onChange={(e) => updateColumnName(column.id, e.target.value)}
                          options={allowedColumnNames
                            .filter(name => !columns.some(c => c.id !== column.id && c.name === name))
                            .map(name => ({ label: name, value: name }))
                          }
                          customStyles={{
                            control: () => ({
                              minWidth: "130px",
                              width: "100%",
                              textAlign: "left",
                            }),
                            menu: () => ({
                              minWidth: "130px",
                              width: "100%",
                              textAlign: "left",
                            })
                          }}
                          isSearchable={false}
                          disabled={column.id === "Account" || column.type === "chartOfAccount"}
                        />
                      )}
                      <button onClick={() => removeColumn(column.id)}>
                        <KTIcon
                          iconName="trash"
                          className="fs-14 fw-normal red-500 red-700-hover flex-shrink-0"
                        />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.length > 0 ? (
                data?.map((row) => (
                  <tr key={row?.id}>
                    <td
                      style={{
                        padding: "8px",
                        borderBottom: "1px solid #E0E0E0",
                        borderRight: "1px solid #E0E0E0",
                        textAlign: "right",
                        color: "#212121",
                      }}
                      className="fs-14 fw-normal text-center"
                    >
                      <button
                        onClick={() => removeRow(row.id)}
                        className="fs-14 fw-normal red-500 red-700-hover"
                      >
                        <KTIcon
                          iconName="trash"
                          className="fs-14 fw-normal red-500 red-700-hover flex-shrink-0"
                        />
                      </button>
                    </td>
                    {columns?.map((column) => (
                      <td
                        key={`${row?.id}-${column?.id}`}
                        style={{
                          padding: "8px",
                          borderBottom: "1px solid #E0E0E0",
                          borderRight: "1px solid #E0E0E0",
                          textAlign:
                            column.id === "description" ? "left" : "right",
                          color: "#212121",
                        }}
                        className="fs-14 fw-normal"
                      >
                        {renderCellInput(row, column)}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="p-8 text-center text-gray-500"
                  >
                    <div
                      className="d-flex text-center w-100 align-content-center justify-content-center fs-14 fw-semibold py-8px"
                      style={{ fontStyle: "italic" }}
                    >
                      No data in table
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DynamicTableSecondary;

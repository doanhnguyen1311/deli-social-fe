import { KTIcon } from "@/_metronic/helpers";
import { OrderBy, TableConfig, TableRow } from "@/components/types";
import {
  ACCOUNT_TYPE,
  FINANCIAL_STATEMENT,
  formatDate,
  formatMoney,
  formatNumber,
  getFullName,
  getUserRole,
} from "@/components/utils";
import {
  faEllipsisVertical,
  faExclamation,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import { FC, Fragment, ReactNode, useEffect, useMemo, useState } from "react";
import "tippy.js/dist/tippy.css";
import { AnyObject } from "yup";
import { Checkbox } from "../checkbox";
import ModalDownloadFile from "../modal/ModalDownloadFile";
import SortBy from "../sort-by";
import Loading from "./components/Loading";
import "./styles.scss";
import logoDefault from "@/components/images/logo.png";
import ButtonViewDetail from "../button/ButtonViewDetail";
import ButtonDelete from "../button/ButtonDelete";
import ButtonEdit from "../button/ButtonEdit";
import { BatchStatus, UserRole, UserStatus } from "../types/enum";
import avatarDefault from "@/components/images/avatar-default.jpg";
import request from "../axios";
import { getCountryListing } from "../axios/request";
import { useAuth } from "../context/AuthContext";

type Props = {
  config: TableConfig;
  className?: string;
  classNameWrapper?: string;
  classNameTableWrapper?: string;
  keySort?: string;
  onChangeSortBy?: (key: string) => void;
  orderBy?: OrderBy;
  loading?: boolean;
  data: any[];
  currentPage?: number;
  showCallButton?: boolean;
  pageSize?: number;
  tableFooter?: ReactNode;
  actions?: boolean;
  tableName?: string;
  showCheckAll?: boolean;
  keysShowCheckBox?: string[];
  isCheckedAll?: boolean;
  checkboxChecked?: AnyObject;
  textNoRecord?: string;
  classNameTable?: string;
  theadStyle?: string;
  showColumnView?: boolean;
  showColumnEdit?: boolean;
  showColumnDelete?: boolean;
  showColumnDownload?: boolean;
  otherData?: AnyObject;
  trViewed?: any;
  transaction?: boolean;
  onClickCheckbox?: (
    e: React.ChangeEvent<HTMLInputElement>,
    item: AnyObject,
    index: number
  ) => void;
  onClickCheckAll?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickItem?: (item: AnyObject, row: TableRow, index: number) => void;
  onClickViewIcon?: (item: AnyObject) => void;
  onClickRetry?: (item: AnyObject) => void;
  onClickViewDetails?: (item: AnyObject) => void;
  onClickDeleteIcon?: (item: AnyObject, index?: number) => void;
  setLoading?: (loading: boolean) => void;
  clickRedirect?: (item: AnyObject) => void;
};

const TableSecondary: FC<Props> = ({
  config,
  className,
  classNameWrapper,
  classNameTableWrapper,
  keySort,
  orderBy = "desc",
  data = [],
  loading,
  actions = false,
  tableName,
  pageSize = 10,
  currentPage = 1,
  showCheckAll = false,
  isCheckedAll = false,
  checkboxChecked = {},
  keysShowCheckBox = [],
  textNoRecord = "",
  showCallButton = false,
  classNameTable = "",
  showColumnView = false,
  theadStyle = "",
  transaction = false,
  showColumnDelete = false,
  tableFooter,
  showColumnDownload = false,
  showColumnEdit = false,
  onChangeSortBy = () => { },
  onClickCheckbox = () => { },
  onClickCheckAll = () => { },
  onClickItem = () => { },
  onClickViewIcon = () => { },
  onClickViewDetails = () => { },
  onClickDeleteIcon = () => { },
  clickRedirect = () => { },
  onClickRetry = () => { },
}) => {
  const { rows } = config;

  const { currentUser } = useAuth();

  const ROW_LISTING = useMemo(() => {
    return rows?.filter((el) => !el?.isHide);
  }, [config]);

  const navigate = useNavigate();

  const [modalName, setModalName] = useState<"download-file">();

  const [visibleTippyId, setVisibleTippyId] = useState(null);

  const [clickedRetry, setClickedRetry] = useState<boolean>(false);

  const [idSelected, setIdSelected] = useState<number>(0);

  const [clickedRetryMap, setClickedRetryMap] = useState<{
    [key: string]: boolean;
  }>({});

  const [countryListing, setCountryListing] = useState<any[]>([]);

  async function getCountryList() {
    const data = await getCountryListing();
    if (data?.data?.data) {
      setCountryListing(Array.isArray(data.data.data) ? data.data.data : []);
    }
  }

  useEffect(() => {
    if (!currentUser?.user_id) return;
    getCountryList();
  }, []);

  const isShowColumnAction = useMemo(() => {
    return showCallButton ||
      actions ||
      showColumnView ||
      showColumnEdit ||
      showColumnDelete ||
      showColumnDownload ||
      transaction
      ? true
      : false;
  }, [
    showColumnView,
    showColumnEdit,
    actions,
    showColumnDelete,
    showColumnDownload,
  ]);

  function toggleModalName(newModalName: string, applicationId?: number) {
    setModalName(newModalName as any);
    setIdSelected(applicationId as number);
  }

  function handleAddClassNameByCondition(
    value: any,
    config: TableRow,
    item: AnyObject,
    index: number
  ) {
    const { format, key, options }: any = config;

    switch (true) {
      case format === "link":
        return "text-gray-900 text-hover-primary";
      case format === "option":
        const className = options.find(
          (o: any) => o.value === value
        )?.className;
        return className || "";
      default:
        return "";
    }
  }

  function handleFormatValue(
    value: any,
    config: TableRow,
    item: AnyObject,
    index: number
  ) {
    const {
      format,
      key,
      options,
      typeDateFormat = "DD MMM, YYYY",
    }: any = config;

    if (key.includes(".")) {
      const keys = key.split(".");
      value = keys.reduce(
        (prev: any, curr: any) => (prev ? prev[curr] : null),
        item
      );
    }

    switch (true) {
      case key === "id": {
        const page = (+currentPage || 1) - 1;
        const limit = +pageSize || 10;
        const id = page * limit + index + 1;
        return id;
      }
      case key === "uid":
        return index + 1;
      case format === "date":
        return formatDate(
          value,
          ["Transactions"].includes(tableName as string)
            ? "DD MMM, YYYY HH:mm:ss"
            : typeDateFormat
        );
      case format === "money":
        return formatMoney(value);
      case format === "number":
        return formatNumber(value);
      case format === "option": {
        const label = options.find(
          (option: any) => option.value === value
        )?.label;
        return label || value;
      }
      default:
        return value;
    }
  }

  // Updated: Modify renderTableCell to accept rowIndex as well
  const renderTableCell = (
    row: TableRow,
    colIndex: number,
    rowIndex: number,
    item: any
  ) => {
    const {
      key,
      classNameTableBody,
      defaultProps = {},
      format,
      linkIdentifier = "id",
      classNameText,
    } = row;
    let cellValue = item[key];
    cellValue = handleFormatValue(cellValue, row, item, rowIndex);

    const openBase64InNewTab = (base64: string) => {
      const byteCharacters = atob(base64.split(",")[1]);
      const mimeType =
        base64.match(/^data:(.*);base64/)?.[1] || "application/octet-stream";
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length)
          .fill(0)
          .map((_, i) => slice.charCodeAt(i));
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      const blob = new Blob(byteArrays, { type: mimeType });
      const blobUrl = URL.createObjectURL(blob);

      window.open(blobUrl, "_blank");
    };

    // Render date fields
    if (["created_at", "updated_at", "last_login_at", "expiry_date"].includes(key)) {
      return (
        <td
          key={colIndex}
          className={`${classNameTableBody} fs-14 fw-normal medium-gray-500`}
        >
          {formatDate(cellValue, "DD MMM, YYYY")}
        </td>
      );
    }

    // Render company name cell for Companies table
    if (
      key === "company_name" &&
      (tableName === "Companies" ||
        tableName === "BatchListing" ||
        tableName === "DashboardTransactions")
    ) {
      return (
        <td
          key={colIndex}
          className={`${classNameTableBody} fs-14 fw-normal text-hover-primary cursor-pointer overflow-hidden`}
        >
          <div className="d-flex gap-12px w-100">
            <div
              className="company-logo me-12px rounded-100px object-fit-contain border"
              style={{ border: "1px solid #f1f1f4" }}
            >
              <img
                src={item?.company_logo ? item.company_logo : logoDefault}
                className="object-fit-contain w-40px h-40px p-5px"
                alt="logo"
              />
            </div>
            <div className="d-block text-truncate w-100">
              <div className="fs-14 fw-normal dark-gray-500 text-hover-primary text-truncate cursor-pointer">
                {item?.company_name}
              </div>
              {item?.email ? (
                <div className="fs-14 fw-normal medium-gray-500 text-truncate w-100">
                  {item?.email}
                </div>
              ) : (
                <div
                  className="fs-14 fw-normal medium-gray-500"
                  style={{ fontStyle: "italic" }}
                >
                  N/A
                </div>
              )}
            </div>
          </div>
        </td>
      );
    }

    // Render status cell
    if (key === "status") {
      if (tableName === "Companies") {
        let badgeClass = "";
        if (cellValue === "Inactive") badgeClass = "badge-muted";
        else if (cellValue === "Active") badgeClass = "badge-success";
        else if (cellValue === "Closed") badgeClass = "badge-danger";
        return (
          <td
            key={colIndex}
            className={`${classNameTableBody} fs-14 fw-semibold`}
          >
            <div
              className={`badge ${badgeClass}`}
              style={{
                border: "1px solid",
                borderRadius: "4px",
                padding: "8px",
                fontSize: "11px",
                fontWeight: "500",
              }}
            >
              {cellValue}
            </div>
          </td>
        );
      }
      if (tableName === "Users") {
        let badgeClass = "";
        if (cellValue === UserStatus.INACTIVE) badgeClass = "badge-muted";
        else if (cellValue === UserStatus.ACTIVE) badgeClass = "badge-success";
        return (
          <td
            key={colIndex}
            className={`${classNameTableBody} fs-14 fw-semibold`}
          >
            <div
              className={`badge ${badgeClass}`}
              style={{
                border: "1px solid",
                borderRadius: "4px",
                padding: "8px",
                fontSize: "11px",
                fontWeight: "500",
              }}
            >
              {cellValue === UserStatus.INACTIVE ? "Inactive" : "Active"}
            </div>
          </td>
        );
      }
      if (
        tableName === "BatchListing" ||
        tableName === "DashboardTransactions"
      ) {
        let badgeClass = "";
        if (cellValue === BatchStatus["Upload Incomplete"])
          badgeClass = "badge-danger";
        else if (cellValue === BatchStatus.Complete)
          badgeClass = "badge-success";
        else if (cellValue === BatchStatus.Processing)
          badgeClass = "badge-info";
        return (
          <td
            key={colIndex}
            className={`${classNameTableBody} fs-14 fw-semibold`}
          >
            <div
              className={`badge ${badgeClass}`}
              style={{
                border: "1px solid",
                borderRadius: "4px",
                padding: "8px",
                fontSize: "11px",
                fontWeight: "500",
              }}
            >
              {cellValue}
            </div>
          </td>
        );
      }
    }

    if (key === "package_info" && tableName === "Companies") {
      return (
        <td key={colIndex} className={`${classNameTableBody}`}>
          <div className="d-flex flex-column gap-4px">
            <span className="fs-14 fw-normal dark-gray-500">
              {item?.package_name}
            </span>
            <span className="fs-12 fw-normal medium-gray-500">
              {item?.document_remaining} docs remaining
            </span>
          </div>
        </td>
      );
    }

    if (key === "account_type" && tableName === "ChartAccounts") {
      return (
        <td key={colIndex} className={`${classNameTableBody}`}>
          <div className="d-flex flex-column gap-4px">
            <span className="fs-14 fw-normal dark-gray-500">
              {
                ACCOUNT_TYPE.filter(
                  (state) => state.value === item?.account_type
                )?.[0]?.label
              }
            </span>
          </div>
        </td>
      );
    }

    if (key === "financial_statement" && tableName === "ChartAccounts") {
      return (
        <td key={colIndex} className={`${classNameTableBody}`}>
          <div className="d-flex flex-column gap-4px">
            <span className="fs-14 fw-normal dark-gray-500">
              {
                FINANCIAL_STATEMENT.filter(
                  (state) => state.value === item?.financial_statement
                )?.[0]?.label
              }
            </span>
          </div>
        </td>
      );
    }

    if (key === "country_id") {
      return (
        <td
          key={colIndex}
          className={`${classNameTableBody} fs-14 fw-normal medium-gray-500`}
        >
          {
            countryListing.filter(
              (country) => country?.iso === item?.country_id
            )?.[0]?.nicename
          }
        </td>
      );
    }

    if (key === "user_added_by") {
      return (
        <td
          key={colIndex}
          className={`${classNameTableBody} fs-14 fw-normal text-hover-primary cursor-pointer overflow-hidden`}
        >
          <div className="d-flex flex-row gap-12px w-100">
            <img
              src={item?.avatar_add_by ? item.avatar_add_by : avatarDefault}
              className="rounded-circle object-fit-contain w-40px h-40px avatar"
              alt="logo"
              width={40}
              height={40}
              style={{ border: "1px solid #f1f1f4" }}
            />
            <div className="d-block text-truncate w-100">
              <div className="fs-14 fw-normal dark-gray-500 text-hover-primary cursor-pointer text-truncate mb-4px">
                {item?.added_by_name}
              </div>

              {item?.company_added_by ? (
                <div className="fs-14 fw-normal medium-gray-500 text-truncate">
                  {item.company_added_by}
                </div>
              ) : (
                <div
                  className="fs-14 fw-normal medium-gray-500"
                  style={{ fontStyle: "italic" }}
                >
                  N/A
                </div>
              )}
            </div>
          </div>
        </td>
      );
    }

    if (key === "total_done" && tableName === "BatchListing") {
      return (
        <td key={colIndex} className={`${classNameTableBody}`}>
          <div className="d-flex flex-row fs-14 fw-normal d-flex align-items-center justify-content-center">
            <span className="dark-gray-500">{item?.file_done}</span>
            <span className="medium-gray-500">/{item?.file_count}</span>
          </div>
        </td>
      );
    }

    // Render role cell for Users
    if (key === "role" && tableName === "Users") {
      let badgeClass = "";
      if (cellValue === UserRole.ADMIN) badgeClass = "badge-muted";
      else if (cellValue === UserRole.CUSTOMER) badgeClass = "badge-warning";
      return (
        <td
          key={colIndex}
          className={`${classNameTableBody} fs-14 fw-semibold`}
        >
          <div
            className={`badge ${badgeClass}`}
            style={{
              border: "1px solid",
              borderRadius: "4px",
              padding: "8px",
              fontSize: "11px",
              fontWeight: "500",
            }}
          >
            {getUserRole(cellValue)}
          </div>
        </td>
      );
    }

    // Render user_name cell for Users
    if (
      key === "user_name" &&
      (tableName === "Users" || tableName === "BatchListing")
    ) {
      return (
        <td
          key={colIndex}
          className={`${classNameTableBody} fs-14 fw-normal text-hover-primary cursor-pointer overflow-hidden`}
        >
          <div className="d-flex flex-row gap-12px w-100">
            <img
              src={item?.avatar ? item.avatar : avatarDefault}
              className="rounded-circle object-fit-contain w-40px h-40px avatar"
              alt="logo"
              width={40}
              height={40}
              style={{ border: "1px solid #f1f1f4" }}
            />
            <div className="d-block text-truncate w-100">
              <div className="fs-14 fw-normal dark-gray-500 text-hover-primary cursor-pointer text-truncate mb-4px">
                {tableName === "Users"
                  ? getFullName(item)
                  : tableName === "BatchListing"
                    ? item?.user_name
                    : ""}
              </div>

              {tableName === "Users" && item?.email ? (
                <div className="fs-14 fw-normal medium-gray-500 text-truncate">
                  {item.email}
                </div>
              ) : tableName === "BatchListing" && item?.user_role ? (
                <div className="fs-14 fw-normal medium-gray-500 text-truncate">
                  {getUserRole(item.user_role)}
                </div>
              ) : (
                <div
                  className="fs-14 fw-normal medium-gray-500"
                  style={{ fontStyle: "italic" }}
                >
                  N/A
                </div>
              )}
            </div>
          </div>
        </td>
      );
    }

    if (key === "file_name" && tableName === "BatchTransactionListing") {
      return (
        <td
          key={colIndex}
          className={`${classNameTableBody} fs-14 fw-normal text-hover-primary cursor-pointer text-hover-underline`}
          onClick={() => openBase64InNewTab(item?.document_path)}
          title="View link in a new window"
        >
          {item?.file_name?.length > 50
            ? `${item?.file_name?.slice(0, 50)}...`
            : item?.file_name}
        </td>
      );
    }

    if (key === "po_number" && tableName === "BatchTransactionListing") {
      return (
        <td
          key={colIndex}
          className={`${classNameTableBody} fs-14 fw-normal text-hover-primary cursor-pointer`}
        >
          {item?.po_number || item?.["po-number"]}
        </td>
      );
    }

    if (key === "invoice_number" && tableName === "BatchTransactionListing") {
      return (
        <td
          key={colIndex}
          className={`${classNameTableBody} fs-14 fw-normal text-hover-primary cursor-pointer`}
        >
          {item?.invoice_number || item?.["invoice-number"]}
        </td>
      );
    }

    if (key === "upload_status" && tableName === "BatchTransactionListing") {
      return (
        <td
          key={colIndex}
          className={`${classNameTableBody} fs-14 fw-semibold`}
        >
          <div
            className={`badge badge-success`}
            style={{
              border: "1px solid",
              borderRadius: "4px",
              padding: "8px",
              fontSize: "11px",
              fontWeight: "500",
            }}
          >
            {"Success"}
          </div>
        </td>
      );
    }

    if (key === "po_status" && tableName === "BatchTransactionListing") {
      const documentNumber = item?.invoice_number || item?.po_number;
      return (
        <td
          key={colIndex}
          className={`${classNameTableBody} fs-14 fw-semibold`}
        >
          <div
            className={clsx(
              "badge",
              documentNumber ? "badge-success" : "badge-danger"
            )}
            style={{
              border: "1px solid",
              borderRadius: "4px",
              padding: "8px",
              fontSize: "11px",
              fontWeight: "500",
            }}
          >
            {documentNumber ? "Found" : "Not Found"}
          </div>
        </td>
      );
    }


    // Default cell rendering
    const customClassName = handleAddClassNameByCondition(
      item[key],
      row,
      item,
      rowIndex
    );
    const ComponentWrap = format === "link" ? Link : Fragment;
    const propsComp =
      format === "link"
        ? { to: `/${item[linkIdentifier]}`, "aria-label": "link" }
        : {};

    return (
      <td key={colIndex} className={clsx([classNameTableBody])}>
        <ComponentWrap {...(propsComp as any)}>
          {(key === "id" || key === "user_id" || key === "company_id") &&
            showCheckAll ? null : (
            <span
              className={clsx([classNameText, customClassName])}
              onClick={() => onClickItem(item, row, rowIndex)}
            >
              {cellValue === 0 ? "0" : cellValue}
            </span>
          )}
        </ComponentWrap>
        {keysShowCheckBox.includes(key) && (
          <Checkbox
            classNameWrap="justify-content-center"
            className="w-20px h-20px"
            name={key}
            checked={checkboxChecked?.[item[key]] ?? false}
            onChange={(e) => onClickCheckbox(e, item, rowIndex)}
            onClick={(e) => e.stopPropagation()}
          />
        )}
      </td>
    );
  };

  return (
    <>
      {showColumnDownload && modalName === "download-file" && (
        <ModalDownloadFile
          onClose={toggleModalName}
          applicationId={idSelected}
        />
      )}

      <div className={clsx("rounded-3", classNameWrapper)}>
        <div className={clsx(["table-responsive", classNameTableWrapper])}>
          {loading && <Loading />}

          <table
            className={clsx([
              `table table-secondary-custom table-striped align-middle fs-6 no-footer mb-0 w-100 table-hover`,
              classNameTable,
            ])}
          >
            {/* Table head */}

            <thead
              style={{ zIndex: 1 }}
              className="custom-table-header position-sticky bg-light m-5 z-3 top-0"
            >
              <tr className="text-start fs-14-line-22 text-capitalize">
                {ROW_LISTING.map(
                  ({ key, name, classNameTableHead, infoFilter }, index) => {
                    const { isSort, isCenter } = infoFilter || {};
                    const isPublishedColumn =
                      tableName === "NewsListing" && key === "is_published";

                    return (
                      <th
                        key={index}
                        className={clsx(
                          isSort && "cursor-pointer",
                          classNameTableHead
                        )}
                        data-title={key}
                        onClick={() => isSort && onChangeSortBy(key)}
                      >
                        <div
                          className={clsx(
                            "d-flex align-items-center",
                            isSort && "w-100",
                            isCenter && "justify-content-center",
                            (key === "latitude" ||
                              key === "longitude" ||
                              key === "capacity") &&
                            "align-items-end justify-content-end",
                            classNameTableHead &&
                            classNameTableHead.includes("text-center") &&
                            "justify-content-center",
                            classNameTableHead &&
                            classNameTableHead.includes("text-end") &&
                            "justify-content-end"
                          )}
                        >
                          {(key === "id" ||
                            key === "user_id" ||
                            key === "company_id") &&
                            showCheckAll ? (
                            <Checkbox
                              className="w-20px h-20px"
                              name="all"
                              checked={isCheckedAll}
                              onChange={onClickCheckAll}
                            />
                          ) : (
                            <span
                              className={clsx(
                                "fs-14 dark-gray-500 fw-semibold d-inline-block fw-semibold",
                                theadStyle,
                                isPublishedColumn &&
                                "w-100 d-flex align-items-center justify-content-center"
                              )}
                            >
                              {name}
                            </span>
                          )}

                          {isSort && (
                            <SortBy
                              className="ms-4px"
                              isActive={keySort === key}
                              orderBy={orderBy}
                            />
                          )}
                        </div>
                      </th>
                    );
                  }
                )}

                {isShowColumnAction && (
                  <th
                    className={clsx(
                      "text-nowrap min-w-75px user-select-none pe-12px text-center fs-14-line-22 dark-gray-500 fw-semibold text-end w-180px"
                    )}
                  >
                    Action
                  </th>
                )}
              </tr>
            </thead>

            {/* Table body */}
            <tbody>
              {Array.isArray(data) && !!data.length ? (
                <>
                  {data.map((item: any, rowIndex) => {
                    //  Just use in table BatchTransactionListing
                    const isUploadIncomplete =
                      !item?.po_number && !item?.invoice_number;
                    const retryCount = item?.retry_count;
                    //End use in table BatchTransactionListing
                    return (
                      <tr
                        key={rowIndex}
                        className={clsx(
                          className,
                          "fs-14 fw-normal black-400 hover-row-table"
                        )}
                        onClick={() => clickRedirect(item)}
                      >
                        {ROW_LISTING.map((row, colIndex) =>
                          renderTableCell(row, colIndex, rowIndex, item)
                        )}

                        {isShowColumnAction && (
                          <td
                            className="cursor-pointer pe-12px"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="d-flex flex-row gap-12px align-items-center justify-content-center">
                              {showColumnView &&
                                tableName !== "BatchTransactionListing" && (
                                  <div onClick={() => onClickViewIcon(item)}>
                                    <KTIcon
                                      iconName="eye"
                                      className="fs-20 medium-gray-500 text-hover-primary"
                                    />
                                  </div>
                                )}
                              {showColumnView &&
                                tableName === "BatchTransactionListing" && (
                                  <>
                                    {!isUploadIncomplete && (
                                      <div
                                        onClick={() => onClickViewIcon(item)}
                                      >
                                        <KTIcon
                                          iconName="eye"
                                          className="fs-20 medium-gray-500 text-hover-primary"
                                        />
                                      </div>
                                    )}
                                    {isUploadIncomplete && retryCount < 3 && (
                                      <div className="d-flex flex-row gap-12px">
                                        <div
                                          onClick={() => onClickViewIcon(item)}
                                        >
                                          <KTIcon
                                            iconName="eye"
                                            className="fs-20 medium-gray-500 text-hover-primary"
                                          />
                                        </div>
                                        <div
                                          className="d-flex flex-row gap-12px medium-gray-500 text-hover-primary"
                                          onClick={() => {
                                            onClickRetry(item);
                                            setClickedRetryMap((prev) => ({
                                              ...prev,
                                              [item.id]: true,
                                            }));
                                            setClickedRetry(true);
                                          }}
                                        >
                                          <KTIcon
                                            iconName="arrows-loop"
                                            className={clsx(
                                              "fs-16 fw-normal d-flex align-self-center",
                                              clickedRetryMap[item.id] &&
                                              "spin-animation"
                                            )}
                                          />

                                          <div className="fs-12 fw-normal d-flex align-self-center">
                                            Retry {retryCount} / 3
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                    {isUploadIncomplete && retryCount >= 3 && (
                                      <div className="d-flex flex-row gap-12px">
                                        <div
                                          onClick={() => onClickViewIcon(item)}
                                        >
                                          <KTIcon
                                            iconName="eye"
                                            className="fs-20 medium-gray-500 text-hover-primary"
                                          />
                                        </div>
                                        <div className="d-flex flex-row gap-12px medium-gray-500 ">
                                          <div className="fs-12 fw-normal d-flex align-self-center">
                                            Retry limit {retryCount} / 3
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </>
                                )}
                              {showColumnEdit && (
                                <div onClick={() => onClickViewDetails(item)}>
                                  <KTIcon
                                    iconName="pencil"
                                    className="fs-20 medium-gray-500 text-hover-primary"
                                  />
                                </div>
                              )}
                              {showColumnDelete && (
                                <div
                                  onClick={() =>
                                    onClickDeleteIcon(item, rowIndex)
                                  }
                                >
                                  <KTIcon
                                    iconName="trash"
                                    className="fs-20 medium-gray-500 text-hover-primary"
                                  />
                                </div>
                              )}
                            </div>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </>
              ) : (
                <>
                  {loading ? (
                    <></>
                  ) : (
                    <tr>
                      <td
                        colSpan={
                          ROW_LISTING.length + (isShowColumnAction ? 2 : 1)
                        }
                      >
                        <div className="d-flex text-center w-100 align-content-center justify-content-center fs-14 fw-medium text-gray-600 py-16px">
                          {textNoRecord || "No matching records found"}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              )}
            </tbody>
            {/* Table footer */}
            {tableFooter && tableFooter}
          </table>
        </div>
      </div>
    </>
  );
};

export default TableSecondary;

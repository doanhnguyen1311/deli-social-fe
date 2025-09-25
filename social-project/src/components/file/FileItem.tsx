import iconDocument from "@/components/images/DocumentIcon.png";
import { convertSize } from "@/components/utils";
import clsx from "clsx";
import { FC } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Checkbox } from "../checkbox";
import "./style.scss";
import { KTIcon } from "@/_metronic/helpers";
import IconDocument from '@/components/images/icon-document.svg?react'

interface Props {
  id: number;
  base64: string;
  type: string;
  fileName: string;
  size: number;
  className?: string;
  isCheck?: boolean;
  onDeleteFile?: (id: number) => void;
  onClickItem?: (id: number) => void;
  showDeleteIcon?: boolean;
  showSize?: boolean;
  gap4px?: boolean;
}
const FileItem: FC<Props> = ({
  id,
  base64,
  type,
  fileName,
  size,
  className,
  isCheck = false,
  showDeleteIcon,
  onDeleteFile = () => {},
  onClickItem = () => {},
  showSize = true,
  gap4px = false,
}) => {
  function handleViewFile(value: string, type: string) {
    try {
      const mimeTypes: Record<string, string> = {
        pdf: "application/pdf",
        jpeg: "image/jpeg",
        jpg: "image/jpeg",
        png: "image/png",
        doc: "application/msword",
        docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        xls: "application/vnd.ms-excel",
        xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        txt: "text/plain",
        dwg: "application/acad",
        ppt: "application/vnd.ms-powerpoint",
        pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      };

      const mimeType = mimeTypes[type?.toLowerCase()];
      if (!mimeType) {
        console.error("Unsupported file type");
        return;
      }

      const base64String = value.startsWith("data:")
        ? value
        : `data:${mimeType};base64,${value}`;
      const binaryString = window.atob(base64String.split(",")[1]);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);

      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const blob = new Blob([bytes], { type: mimeType });
      const url = URL.createObjectURL(blob);

      if (type === "txt" || type === "dwg") {
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else if (
        type === "pdf" ||
        type === "doc" ||
        type === "docx" ||
        type === "xls" ||
        type === "xlsx" ||
        type === "ppt" ||
        type === "pptx"
      ) {
        if (type === "pdf") {
          window.open(url, "_blank");
        } else {
          const a = document.createElement("a");
          a.href = url;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
      } else if (type === "jpeg" || type === "jpg" || type === "png") {
        window.open(url, "_blank");
      } else {
        console.error("Unsupported file type");
      }
    } catch (error) {
      console.error("Error decoding base64:", error);
    }
  }

  return (
    <div
      title="Select File"
      className={clsx([
        "d-flex flex-row position-relative h-100 rounded-12px hover-document gap-12px p-8px",
        className,
      ])}
      style={{ border: "1px solid #EAE9EA" }}
    >
      <div className="d-flex position-relative cursor-pointer">
        {isCheck && (
          <div className="position-absolute px-30px start-0">
            <Checkbox name="check" checked onChange={() => {}} />
          </div>
        )}

        <div
          title="Open File"
          // onClick={() => {
          //   handleViewFile(base64, type)
          // }}
          onClick={(e) => {
            const isClickedInsideIcon = (e.target as any)?.closest(
              ".icon-open-file"
            );
            if (!isClickedInsideIcon) {
              const fileExtension = fileName.split(".").pop() || "";
              handleViewFile(base64, fileExtension);
            }
          }}
          className="icon-open-file d-flex cursor-pointer justify-content-center align-items-center"
        >
          <IconDocument
            className="w-40px h-40px object-fit-cover"
          />
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between w-100">
        <div className={`d-flex flex-column gap-4px`}>
          <p
            className={`p-0 m-0 w-100 fw-semibold fs-12 text-gray-900 text-break text-hover-primary cursor-pointer`}
            // onClick={() => {
            //   handleViewFile(base64, type)
            // }}
            onClick={(e) => {
              const isClickedInsideIcon = (e.target as any)?.closest(
                ".icon-open-file"
              );
              if (!isClickedInsideIcon) {
                const fileExtension = fileName.split(".").pop() || "";
                handleViewFile(base64, fileExtension);
              }
            }}
          >
            {fileName && fileName.length > 100
              ? `${fileName.slice(0, 100)}...`
              : fileName}
          </p>

          {showSize === true && (
            <p className="w-100 text-B5B5C3 text-start fw-semibold fs-12 p-0 m-0">
              {convertSize(Number(size) || 0)}
            </p>
          )}
        </div>
        {showDeleteIcon && (
          <button
            className="close text-16px cursor-position  border-0 bg-transparent p-16px"
            onClick={() => onDeleteFile(id)}
          >
            {/* <AiOutlineClose className="icon text-hover-primary" /> */}
            <KTIcon
              iconName="trash"
              className="w-40px h-40px text-hover-primary dark-gray-500"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default FileItem;

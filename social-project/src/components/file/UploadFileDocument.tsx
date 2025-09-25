import React, { useRef, useState } from "react";
import Icons from "@/components/icons";
import clsx from "clsx";
import { KTIcon } from "@/_metronic/helpers";

type Props = {
  disabled?: boolean;
  handleChangeFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  classNameCard?: string;
  showWarning?: boolean;
  classNameWrap?: string;
};

const UploadFileDocument = ({
  disabled = false,
  className,
  handleChangeFile,
  classNameCard = "",
  showWarning = true,
  classNameWrap = "card-upload-component",
}: Props) => {
  const [errorUpload, setErrorUpload] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const acceptedFileTypes = ".pdf, .png, .jpg, .jpeg, .gif, .bmp, .webp";

  const validMimeTypes = [
    "application/pdf",
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/bmp",
    "image/webp",
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) return;

    const maxFileSize = 10 * 1024 * 1024; // 10MB
    let hasError = false;

    for (const file of files) {
      const isValidType = validMimeTypes.includes(file.type);
      const isValidSize = file.size <= maxFileSize;

      if (!isValidType) {
        setErrorUpload("Only PDF and image files are allowed.");
        hasError = true;
        break;
      }

      if (!isValidSize) {
        setErrorUpload("Each file must be smaller than 10MB.");
        hasError = true;
        break;
      }
    }

    if (!hasError) {
      setErrorUpload("");
      handleChangeFile(e);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <>
      <div
        className={clsx([
          "d-flex rounded-12px align-items-center justify-content-center h-100",
          className,
        ])}
        onClick={handleClick}
        style={{
          cursor: "pointer",
        }}
      >
        <div className={clsx([classNameWrap, classNameCard])}>
          <KTIcon iconName="plus" className="fs-16 fw-semibold text-primary" />
          <span className="fs-16 fw-semibold text-primary">
            Drop file here or click to upload
          </span>
          <div className="d-flex flex-column gap-4px w-100 d-flex align-items-center justify-content-center">
            {/* <span className="fs-14 fw-semibold medium-gray-500 text-center">
              Only image, pdf file formats are allowed
            </span> */}
            {showWarning && (
              <div className="fs-14 fw-semibold medium-gray-500 text-center">
                Max size is{" "}
                <span className="fs-14 fw-semibold dark-gray-500">100MB</span>{" "}
                and max{" "}
                <span className="fs-14 fw-semibold dark-gray-500">
                  400 files
                </span>{" "}
                per batch
              </div>
            )}
          </div>
        </div>
        <input
          ref={inputRef}
          className="opacity-0"
          disabled={disabled}
          hidden
          type="file"
          accept={acceptedFileTypes}
          multiple
          onChange={handleFileChange}
        />
      </div>
      {errorUpload && (
        <span className="text-danger fw-semibold d-block mt-2">
          {errorUpload}
        </span>
      )}
    </>
  );
};

export default UploadFileDocument;

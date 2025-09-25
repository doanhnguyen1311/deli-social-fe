import React, { useRef, useState } from "react";
import Icons from "@/components/icons";
import clsx from "clsx";

type Props = {
  disabled?: boolean;
  handleChangeFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const UploadFileOnly = ({
  disabled = false,
  className,
  handleChangeFile,
}: Props) => {
  const [errorUpload, setErrorUpload] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const acceptedFileTypes = ".mp3, .mp4";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ["audio/mp3", "video/mp4"];
      const validExtensions = ["mp3", "mp4"];

      const fileExtension = file.name.split(".").pop()?.toLowerCase();

      const isValidFile =
        validTypes.includes(file.type) ||
        (fileExtension && validExtensions.includes(fileExtension));

      if (!isValidFile) {
        setErrorUpload("Only MP3 or MP4 files are allowed.");
        return;
      }

      if (file.size > 500 * 1024 * 1024) {
        setErrorUpload("File size must be less than 500MB!");
        return;
      }

      handleChangeFile(e);
      setErrorUpload("");
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <>
      <div
        className={clsx([
          "border border-dashed border-blue-500 d-flex rounded-12px align-items-center justify-content-center px-16px py-20px",
          className,
        ])}
        onClick={handleClick}
        style={{ backgroundColor: "rgba(241, 244, 255, 0.50)" }}
      >
        <div className="d-flex flex-column cursor-pointer gap-16px align-items-center justify-content-center">
          <div className="w-40px h-40px flex-shrink-0">
            <Icons name={"ImgUploadFile"} />
          </div>
          <div className="cursor-pointer text-center">
            <h3 className="fw-semibold fs-16 dark-gray-500 p-0 m-0">
              Click to upload
            </h3>
            <p className="m-0 fw-normal p-0 fs-12 black-300">
              Upload MP3 or MP4 File for conversion
            </p>
          </div>
        </div>
        <input
          ref={inputRef}
          className="opacity-0"
          disabled={disabled}
          hidden
          type="file"
          accept={acceptedFileTypes}
          onChange={handleFileChange}
        />
      </div>
      {errorUpload?.length > 1 && (
        <span className="text-danger fw-semibold" style={{ marginTop: "" }}>
          {errorUpload}
        </span>
      )}
    </>
  );
};

export default UploadFileOnly;

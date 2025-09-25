import clsx from "clsx";
import React, { FC } from "react";
import "./style.scss";

interface Props {
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  classNameWrapper?: string;
}

const AvatarUploadOverlay: FC<Props> = ({
  classNameWrapper,
  handleImageUpload,
}) => {
  return (
    <label
      className={clsx(
        "avatar overlay d-flex position-absolute top-0 start-0 w-100 h-100 align-items-center justify-content-center w-100 h-100 cursor-pointer",
        classNameWrapper
      )}
    >
      <div
        className="d-flex cursor-pointer flex-column align-items-center justify-content-center"
        onChange={handleImageUpload}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.8754 8.37118L9.2194 10.4H7.2002C6.13933 10.4 5.12191 10.8214 4.37177 11.5715C3.62162 12.3217 3.2002 13.3391 3.2002 14.4V24C3.2002 25.0608 3.62162 26.0783 4.37177 26.8284C5.12191 27.5785 6.13933 28 7.2002 28H24.8002C25.8611 28 26.8785 27.5785 27.6286 26.8284C28.3788 26.0783 28.8002 25.0608 28.8002 24V14.4C28.8002 13.3391 28.3788 12.3217 27.6286 11.5715C26.8785 10.8214 25.8611 10.4 24.8002 10.4H22.7794L22.125 8.37118C21.865 7.56583 21.3563 6.86369 20.6721 6.36574C19.9878 5.86778 19.1633 5.59968 18.317 5.59998H13.6834C12.8371 5.59968 12.0126 5.86778 11.3283 6.36574C10.6441 6.86369 10.1354 7.56583 9.8754 8.37118ZM7.2002 12H10.3842L11.397 8.86398C11.5528 8.38053 11.8579 7.95897 12.2685 7.65995C12.679 7.36093 13.1739 7.19988 13.6818 7.19998H18.3186C18.8262 7.20022 19.3207 7.36143 19.731 7.66042C20.1412 7.95941 20.4461 8.38079 20.6018 8.86398L21.6146 12H24.8002C25.4367 12 26.0472 12.2528 26.4973 12.7029C26.9473 13.153 27.2002 13.7635 27.2002 14.4V24C27.2002 24.6365 26.9473 25.2469 26.4973 25.697C26.0472 26.1471 25.4367 26.4 24.8002 26.4H7.2002C6.56368 26.4 5.95323 26.1471 5.50314 25.697C5.05305 25.2469 4.8002 24.6365 4.8002 24V14.4C4.8002 13.7635 5.05305 13.153 5.50314 12.7029C5.95323 12.2528 6.56368 12 7.2002 12Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.2002 18.4C11.2002 19.673 11.7059 20.8939 12.6061 21.7941C13.5063 22.6943 14.7272 23.2 16.0002 23.2C17.2732 23.2 18.4941 22.6943 19.3943 21.7941C20.2945 20.8939 20.8002 19.673 20.8002 18.4C20.8002 17.1269 20.2945 15.906 19.3943 15.0059C18.4941 14.1057 17.2732 13.6 16.0002 13.6C14.7272 13.6 13.5063 14.1057 12.6061 15.0059C11.7059 15.906 11.2002 17.1269 11.2002 18.4ZM19.2002 18.4C19.2002 19.2487 18.8631 20.0626 18.2629 20.6627C17.6628 21.2628 16.8489 21.6 16.0002 21.6C15.1515 21.6 14.3376 21.2628 13.7375 20.6627C13.1373 20.0626 12.8002 19.2487 12.8002 18.4C12.8002 17.5513 13.1373 16.7374 13.7375 16.1372C14.3376 15.5371 15.1515 15.2 16.0002 15.2C16.8489 15.2 17.6628 15.5371 18.2629 16.1372C18.8631 16.7374 19.2002 17.5513 19.2002 18.4Z"
            fill="white"
          />
        </svg>
        <div className="mt-4px">
          <span className="fw-semibold fs-14-line-22 text-white cursor-position text-capitalize p-0 m-0">
            Change Avatar
          </span>
        </div>
      </div>
      <input
        className="opacity-0"
        hidden
        type="file"
        accept=".png, .jpg, .jpeg"
        onChange={handleImageUpload}
        required
      />
    </label>
  );
};

export default AvatarUploadOverlay;

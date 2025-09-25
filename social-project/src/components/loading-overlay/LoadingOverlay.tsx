import React from "react";
import "./style.scss";
import imgLoading from "@/components/images/logo.png";

type Props = {
  isShow: boolean;
  text?: string;
  subText?: string;
};

const LoadingPopup = ({
  isShow = false,
  text = "Processing with AI",
  subText = "This process may take a few minutes.",
}: Props) => {
  if (!isShow) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 99999,
      }}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        style={{ height: "150px", width: "350px" }}
      >
        <div
          className="modal-content w-100 h-25"
          style={{
            background: "white",
            border: "none",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
            borderRadius: "20px",
          }}
        >
          <div className="d-flex flex-column gap-8px align-items-center justify-content-center h-100">
            <div className="text-center">
              <img
                src={imgLoading}
                alt="Loading"
                className="loading-image w-400px"
                width={50}
                height={50}
              />
              <div className="fs-16 dark-gray-500 fw-semibold mt-16px loading-image">
                {text}
              </div>
              <div className="fs-14px dark-gray-500 fw-semibold loading-image">
                {subText}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPopup;

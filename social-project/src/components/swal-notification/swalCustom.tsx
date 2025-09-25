import React, { useEffect } from "react";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastNotificationProps {
  show: boolean;
  type?: ToastType;
  message: string;
  delay?: number;
  onClose: () => void;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({
  show,
  type = "success",
  message,
  delay = 3000,
  onClose,
}) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [show, delay, onClose]);

  if (!show) return null;

  const typeClassMap: Record<ToastType, string> = {
    success: "bg-success text-white",
    error: "bg-danger text-white",
    warning: "bg-warning text-dark",
    info: "bg-info text-white",
  };

  return (
    <div
      className="toast-container position-fixed top-0 end-0 p-3"
      style={{ zIndex: 9999 }}
    >
      <div className={`toast show ${typeClassMap[type]}`} role="alert">
        <div className="toast-body">{message}</div>
      </div>
    </div>
  );
};

export default ToastNotification;

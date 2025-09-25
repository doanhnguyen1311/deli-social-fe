import React from "react";
import ImgNotFound from "@/components/images/empty-not-found.png";
const NotFoundPage = () => {
  return (
    <div className="d-flex flex-column gap-32px h-100 align-items-center justify-content-center">
      <div className="d-flex flex-column align-items-center justify-content-center">
        <img
          src={ImgNotFound}
          alt=""
          style={{ height: "160px", width: "160px", objectFit: "cover" }}
          className="d-flex align-items-center justify-content-center"
        />
        <div className="fs-16 black-brand-500 fw-semibold">
          Sorry, we couldn’t find the page you’re looking for.
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

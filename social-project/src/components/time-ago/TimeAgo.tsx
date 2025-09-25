import React, { useState, useEffect } from "react";

const TimeAgoUpdater = ({ timestamp }) => {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const updateTimeAgo = () => {
      if (!timestamp) {
        setTimeAgo("");
        return;
      }

      const now = new Date();
      const updatedTime = new Date(timestamp);

      const diffInSeconds = Math.floor(
        (now.getTime() - updatedTime.getTime()) / 1000
      );

      if (diffInSeconds < 10) {
        setTimeAgo("just now");
      } else if (diffInSeconds < 60) {
        setTimeAgo(`${diffInSeconds} seconds ago`);
      } else {
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes === 1) {
          setTimeAgo("1 minute ago");
        } else {
          setTimeAgo(`${diffInMinutes} minutes ago`);
        }
      }
    };

    updateTimeAgo();

    const intervalId = setInterval(updateTimeAgo, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, [timestamp]);

  return (
    <span className="fs-12 fw-normal medium-gray-500">
      {timeAgo ? `Last updated ${timeAgo}` : "No updates"}
    </span>
  );
};

export default TimeAgoUpdater;

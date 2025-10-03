// components/Loading.tsx
import React from "react";

interface LoadingProps {
  fullscreen?: boolean; // nếu true thì phủ toàn màn hình
}

const Loading: React.FC<LoadingProps> = ({ fullscreen = false }) => {
  if (fullscreen) {
    return (
      <div className="loading-overlay">
        <div className="loading-spinner"></div>
      </div>
    );
  }
  return <div className="loading-spinner"></div>;
};

export default Loading;

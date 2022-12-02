import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loader">
      <div className="spinner-container text-center">
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
};

export default Loading;

import React from "react";
import "../css/Authentication.css";

const AuthenticationLayout = ({ imageSrc, children }) => {
  return (
    <div className="split-layout">
      <div className="image-side">
        <div className="image-container">
          <img src={imageSrc} alt="Feature Image" className="feature-image" />
        </div>
      </div>
      <div className="content-side">{children}</div>
    </div>
  );
};

export default AuthenticationLayout;

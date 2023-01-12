import React from "react";
import "./Loader.css";

const Loader = ({ LoadingName }) => {
  return (
    <>
      <div className="loader-container">
        <div className="loader-container-pop-cart">
          <div className="loader-container-animation">
            <h3 className="loader-loading-text"></h3>
          </div>
          <h1>{LoadingName}..!!</h1>
        </div>
      </div>
    </>
  );
};

export default Loader;

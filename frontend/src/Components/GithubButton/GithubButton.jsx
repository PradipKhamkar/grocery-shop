import React from "react";
import "./Style.css";

const GithubButton = () => {
  return (
    // <div className="github-btn-container">
    <div className="github-button">
      <button
        className="button"
        onClick={() =>
          window.open(
            "https://buymeacoffee.com/khamkarpradip/e/360466",
            "_blank"
          )
        }
      >
        <p className="title">Source Code</p>
        <img src={require("../../Assets/likeemoji.png")} alt="like emoji" />
        <p className="description">Download</p>
      </button>
    </div>
    // </div>
  );
};

export default GithubButton;

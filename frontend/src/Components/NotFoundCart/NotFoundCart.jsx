import React from "react";
import "./NotFoundCart.css";

const NotFoundCart = ({ msg }) => {
  return (
    <>
      <div className="not-found-container">
        <div className="not-found-cart-box">
          <div className="not-found-cart-msg">
            <h1>{msg}..!</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundCart;

import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { FaTrashRestore } from "react-icons/fa";
import { Link } from "react-router-dom";

const Cart = () => {
  const shoppingCart = useRef();
  //getting cart data from state
  const { cartItems } = useSelector((state) => state.userCart);
  useEffect(() => {}, [cartItems]);

  return (
    <>
      <div className="shopping-cart" ref={shoppingCart}>
        {cartItems &&
          cartItems.map((item) => {
            return (
              <div className="box">
                <img src={item.image} alt="Product Images" />
                <div className="content">
                  <i> {<FaTrashRestore />}</i>
                  <h3>{item.name}</h3>
                  <span className="price">₹{item.rate}/- </span>
                  <span className="qty">Qty: {item.quantity} Kg</span>
                </div>
              </div>
            );
          })}

        <div className="total">Total : $20/- </div>
        <Link to="/Order/Checkout" className="checkoutBtn">
          Check Out
        </Link>
      </div>
    </>
  );
};

export default Cart;

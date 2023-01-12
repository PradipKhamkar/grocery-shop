import React from "react";
import "./Checkout.css";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import { FaTrashRestore, FaShippingFast } from "react-icons/fa";
import { MdOutlineMobileFriendly, MdOutlinePinDrop } from "react-icons/md";
import { RxLetterCaseCapitalize } from "react-icons/rx";
import { GoHome } from "react-icons/go";
import { CgShoppingBag } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";

import {
  addToCartAction,
  removeCartItemAction,
} from "../../Redux/Actions/cartAction";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmOrder from "../ConfirmOrder/ConfirmOrder";

const Checkout = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.userCart);
  document.title = "Check Out";
  //Cart SubTotal
  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.rate * item.quantity,
    0
  );

  const toggleCartSection = () => {
    document.querySelectorAll("#cart-item").forEach((value) => {
      value.classList.toggle("toggle-cart");
    });
  };

  //Change Qty
  const ChangeCartQty = (id, quantity) => {
    dispatch(addToCartAction(id, quantity));
  };

  //Remove Cart Item
  const RemoveCartItem = (id) => {
    dispatch(removeCartItemAction(id));
  };

  //Collect Shipping Info
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [validationError, setValidationError] = useState("");
  const [shippingData, setShippingData] = useState({});
  const [goToConfirm, setGoToConfirm] = useState(false);

  const HandelCheckoutSubmit = (e) => {
    e.preventDefault();
    if (mobileNumber.length !== 10) {
      setValidationError("Mobile Number Should Be 10 Digit..!!");
    } else if (pinCode.length !== 6) {
      setValidationError("Pin Code Should Be 6 Digit..!!");
    } else {
      if (address.trim().length == 0 || city.trim().length == 0) {
        setValidationError("All Field Are Required..!!");
      } else {
        setShippingData({
          address,
          city,
          mobileNumber,
          pinCode,
        });
        setGoToConfirm(true);
      }
    }
  };

  if (validationError) {
    setTimeout(() => {
      setValidationError("");
    }, 5000);
  }
  return (
    <>
      {goToConfirm ? (
        <ConfirmOrder shippingInfo={shippingData} />
      ) : (
        <>
          <Header />
          <div className="checkout-container">
            <h1 className="Heading">
              Shipping<span>Details</span>
            </h1>
            <div
              id="toggle-btn"
              className="cart-toggle-btn"
              onClick={toggleCartSection}
            >
              <CgShoppingBag />
              <span>{cartItems && cartItems.length}</span>
            </div>
            <div className="checkout-box">
              <div className="cart-item">
                <div className="cart-item-box">
                  <div className="total-cart-price">
                    {cartItems.length === 0 ? (
                      <>
                        <h2 className="cart-empty">Your Cart Is Empty..!!</h2>
                      </>
                    ) : (
                      <>
                        <h2>Sub Total : ₹ {subTotal}</h2>
                        <h2>
                          Shipping Charge :{" "}
                          <span className="freeShipping">{"Free"}</span>{" "}
                        </h2>
                        <h2>Total : ₹ {subTotal}</h2>
                      </>
                    )}
                  </div>
                </div>
                {cartItems &&
                  cartItems.map((item) => {
                    return (
                      <div
                        className="cart-item-box"
                        id="cart-item"
                        key={item.id}
                      >
                        <img src={item.image} alt="Product Image" />
                        <div>
                          <h2>{item.name}</h2>
                          <select
                            onChange={(e) => {
                              ChangeCartQty(item.id, e.target.value);
                            }}
                          >
                            {item.kilogramOption.map((weight) => {
                              return (
                                <option value={weight.$numberDecimal}>
                                  {weight.$numberDecimal} Kg
                                </option>
                              );
                            })}
                          </select>
                          <h4> Rate : ₹ {item.rate}/Kg </h4>
                        </div>
                        <div className="">
                          <h3>₹ {item.quantity * item.rate}</h3>
                          <button
                            onClick={() => {
                              RemoveCartItem(item.id);
                            }}
                          >
                            {<FaTrashRestore />}
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
              {user && cartItems.length != 0 ? (
                <div className="checkout-from ba">
                  <div className="box">
                    <div className="login-box">
                      <form onSubmit={(e) => HandelCheckoutSubmit(e)}>
                        <div className="user-email">
                          <RxLetterCaseCapitalize />
                          <input
                            type="text"
                            placeholder="Name"
                            value={user.firstName + " " + user.lastName}
                            required
                            readOnly
                          />
                        </div>
                        <div className="user-email">
                          <GoHome />
                          <input
                            type="text"
                            placeholder="Address"
                            required
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>
                        <div className="user-email">
                          <MdOutlinePinDrop />
                          <input
                            type="text"
                            placeholder="City"
                            required
                            onChange={(e) => setCity(e.target.value)}
                          />
                        </div>
                        <div className="user-email">
                          <MdOutlineMobileFriendly />
                          <input
                            type="number"
                            placeholder="Mobile Number"
                            required
                            onChange={(e) => setMobileNumber(e.target.value)}
                          />
                        </div>
                        <div className="user-email">
                          <FaShippingFast />
                          <input
                            type="number"
                            placeholder="Pin Code"
                            required
                            onChange={(e) => setPinCode(e.target.value)}
                          />
                        </div>
                        {validationError !== "" ? (
                          <div className="validError">
                            {" "}
                            <span>{validationError}</span>{" "}
                          </div>
                        ) : (
                          ""
                        )}
                        <button>Next</button>
                      </form>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="cart-item-box checkOutLogin">
                  <div className="total-cart-price">
                    {
                      <>
                        <button
                          className="checkOutLoginBtn"
                          onClick={() =>
                            Navigate(
                              cartItems.length === 0 ? "/products" : "/Login"
                            )
                          }
                        >
                          {cartItems.length === 0 ? "Add Products" : `Login`}
                        </button>
                      </>
                    }
                  </div>
                </div>
              )}
            </div>
          </div>
          )
          <Footer />
        </>
      )}
    </>
  );
};

export default Checkout;

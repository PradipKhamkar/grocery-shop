import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import { useSelector } from "react-redux";
import "./ConfirmOrder.css";
import axios from "axios";
import { useState } from "react";
import Loader from "../../Components/Loader/Loader";
import OrderPlace from "../OrderPlace/OrderPlace";

const ConfirmOrder = ({ shippingInfo }) => {
  const { user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.userCart);
  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.rate * item.quantity,
    0
  );
  document.title = "Confirm Order";
  const [orderLoading, setOrderLoading] = useState(false);
  const [isOrderPlace, setIsOrderPlace] = useState(false);
  const send = async () => {
    if (user) {
      try {
        setOrderLoading(true);
        const { data } = await axios.post(`/api/user/new/order`, {
          cartItems,
          shippingInfo,
          userId: user._id,
          total: subTotal,
        });
        setIsOrderPlace(true);
        setOrderLoading(false);
      } catch (error) {
        alert(error.data.response.message);
        setIsOrderPlace(false);
        setOrderLoading(false);
      }
    } else {
      alert("Login Please..!!");
    }
  };

  return (
    <>
      {isOrderPlace ? (
        <OrderPlace />
      ) : (
        <>
          <Header />
          {orderLoading ? (
            <Loader LoadingName={"Placing Order"} />
          ) : (
            <>
              {cartItems.length != 0 && shippingInfo && user ? (
                <div className="confirm-order-section">
                  <div className="order-summary-section">
                    <h1>Order Summary</h1>
                    <div className="product-summary">
                      <table>
                        <thead>
                          <th>Name</th>
                          <th>Quantity</th>
                          <th>Rate</th>
                          <th>Subtotal</th>
                        </thead>
                        {cartItems &&
                          cartItems.map((product) => {
                            return (
                              <tbody>
                                <td>{product.name}</td>
                                <td>{product.quantity}Kg</td>
                                <td> ₹ {product.rate}</td>
                                <td className="subtotal">
                                  {product.quantity} x {product.rate} = ₹{" "}
                                  {product.quantity * product.rate}
                                </td>
                              </tbody>
                            );
                          })}
                      </table>
                    </div>
                    <div className="shipping-details-summary">
                      <h1>Shipping Info</h1>
                      <table>
                        <thead>
                          <th>Name</th>
                          <th>Address</th>
                          <th>City</th>
                          <th>Pin Code</th>
                          <th>Mobile Number</th>
                        </thead>
                        <tbody>
                          <td>{user.firstName + " " + user.lastName}</td>
                          <td>{shippingInfo.address}</td>
                          <td>{shippingInfo.city}</td>
                          <td>{shippingInfo.pinCode}</td>
                          <td>{shippingInfo.mobileNumber}</td>
                        </tbody>
                      </table>
                    </div>
                    <div className="payment-summary">
                      <div>
                        <h6>
                          Subtotal : <span> ₹ {subTotal}</span>
                        </h6>
                        <h6 className="free-shipping">Free Shipping For You</h6>
                        <h6 className="total">
                          Total : <span> ₹ {subTotal} </span>
                        </h6>
                      </div>
                    </div>
                    <div className="confirm-order-btn">
                      <button className="cOrder" onClick={send}>
                        Confirm Order
                      </button>
                      <Link to="/Order/Checkout">
                        <button>Cancel Order</button>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </>
          )}
          <Footer />
        </>
      )}
    </>
  );
};

export default ConfirmOrder;

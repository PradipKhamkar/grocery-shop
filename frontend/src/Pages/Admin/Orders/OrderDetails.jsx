import React, { useEffect } from "react";
import "./OrderList.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../../../Components/Header/Header";
import Sidebar from "../Components/Sidebar/Sidebar";
import Loader from "../../../Components/Loader/Loader";
import NotFoundCart from "../../../Components/NotFoundCart/NotFoundCart";
import {
  getUsersOrderDetailsAction,
  updateOrdersAdminAction,
} from "../../../Redux/Actions/orderActions";
import { useState } from "react";

const AdminOrderDetails = () => {
  const [oStatus, setOrderStatus] = useState("");

  const {
    loading: orderLoading,
    order,
    error: orderError,
  } = useSelector((state) => state.getOrderDetails);

  const {
    loading: updateLoading,
    success,
    error: updateOrderError,
  } = useSelector((state) => state.adminUpdateOrder);

  const dispatch = useDispatch();
  const { orderId } = useParams();

  const updateOrderStatus = () => {
    if (oStatus !== "") {
      dispatch(updateOrdersAdminAction(orderId, oStatus));
    } else {
      alert("Select Order Status..!!");
    }
    // console.log(oStatus);
  };

  useEffect(() => {
    if (orderId) {
      dispatch(getUsersOrderDetailsAction(orderId));
    }
  }, [orderId, updateLoading]);

  return (
    <>
      <Header />
      <Sidebar />
      <div className="dashboard-container">
        {orderLoading ? (
          <Loader LoadingName={"Order Loading"} />
        ) : orderError ? (
          <>
            <NotFoundCart msg={"Something Went To Wrong"} />
          </>
        ) : order && order.orderItems ? (
          <>
            <div className="orders-container "></div>
            <div className="dashboard-sub-heading">
              <h1>Order Details</h1>
            </div>
            <div className="orders-box">
              <div className="orders-cart-item">
                <div className="orders-cart-item-box">
                  <div className="orders-total-cart-price">
                    <h2>Order Items : {order && order.orderItems.length} </h2>
                    <h2 className="">
                      Total Amount : ₹ {order && order.total}{" "}
                    </h2>
                    {order.status === "Delivered" ? (
                      ""
                    ) : (
                      <>
                        <select
                          className="update-order-status"
                          onChange={(e) => {
                            setOrderStatus(e.target.value);
                          }}
                        >
                          <option value="">Update State</option>
                          {order.status === "Processing" ? (
                            <option value="Shipped">Shipped</option>
                          ) : (
                            <option value="Delivered">Delivered</option>
                          )}
                        </select>
                        <button
                          className="update-order-status-btn"
                          onClick={updateOrderStatus}
                        >
                          Update Status
                        </button>
                      </>
                    )}
                  </div>
                </div>
                {order &&
                  order.orderItems.map((item) => {
                    return (
                      <div className="orders-cart-item-box" key={item._id}>
                        <img src={item.image} alt="Product Image" />
                        <div>
                          <h2>{item.name}</h2>
                          <h4> Quantity : {item.quantity} KG </h4>
                          <h4> Rate : ₹ {item.rate}/Kg </h4>
                        </div>
                        <div className="">
                          <h3>₹ {item.rate * item.quantity}</h3>
                          <h3
                            className={
                              order.status === "Processing"
                                ? "order-processing-status"
                                : order.status === "Shipped"
                                ? "order-shipping-status"
                                : "order-delivered-status"
                            }
                          >
                            {order.status}
                          </h3>
                          <span className="order-date"> {order.orderDate}</span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </>
        ) : (
          <NotFoundCart msg={" Sorry Order Not Exit"} />
        )}
      </div>
    </>
  );
};

export default AdminOrderDetails;

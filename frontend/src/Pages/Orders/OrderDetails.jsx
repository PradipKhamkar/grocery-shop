import React, { useEffect } from "react";
import "./Orders.css";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader/Loader";
import { getUsersOrderDetailsAction } from "../../Redux/Actions/orderActions";
import { useParams, useSearchParams } from "react-router-dom";
import NotFoundCart from "../../Components/NotFoundCart/NotFoundCart";

const OrderDetails = () => {
  const {
    loading: orderLoading,
    order,
    error: orderError,
  } = useSelector((state) => state.getOrderDetails);
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const orderStatus = searchParams.get("status");

  useEffect(() => {
    if (orderId) {
      document.title = `Orders Details`;
      dispatch(getUsersOrderDetailsAction(orderId));
    }
  }, [orderId]);
  return (
    <>
      <Header />
      {orderLoading ? (
        <Loader LoadingName={"Order Loading"} />
      ) : orderError ? (
        <>
          <NotFoundCart msg={"Something Went To Wrong"} />
        </>
      ) : order && order.orderItems ? (
        <>
          <div className="orders-container "></div>
          <h1 className="Heading">
            {/* {user && user.firstName ? user.firstName : "Orders"}{" "} */}
            Orders <span> Details</span>
          </h1>
          <div className="orders-box">
            <div className="orders-cart-item">
              <div className="orders-cart-item-box">
                <div className="orders-total-cart-price">
                  <h2>Order Items : {order && order.orderItems.length} </h2>
                  <h2 className="">Total Amount : ₹ {order && order.total} </h2>
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

      <Footer />
    </>
  );
};

export default OrderDetails;

{
  /* <Header />
{userLoading || orderLoading ? (
  <Loader LoadingName={"Getting Order"} />
) : (
  <div className="orders-container ">
    <h1 className="Heading">
      {user && user.firstName ? user.firstName : "Orders"}{" "}
      <span>Orders Details</span>
    </h1>

    <div className="orders-box">
      <div className="orders-cart-item">
        <div className="orders-cart-item-box">
          <div className="orders-total-cart-price">
            <h2>Order Items : {order && order.orderItems.length} </h2>
            <h2 className="">Total Amount : ₹ {order && order.total} </h2>
          </div>
        </div>
        {order &&
          order.orderItems.map((item) => {
            return (
              <div className="orders-cart-item-box">
                <img src={`/${item.image}`} alt="Product Image" />
                <div>
                  <h2>{item.name}</h2>
                  <h4> Quantity : {item.quantity} KG </h4>
                  <h4> Rate : ₹ {item.rate}/Kg </h4>
                </div>
                <div className="">
                  <h3>₹ {item.rate * item.quantity}</h3>
                  <h3>Delivered</h3>
                  <span className="order-date">21-Dec-2022</span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  </div>
)}
<Footer /> */
}

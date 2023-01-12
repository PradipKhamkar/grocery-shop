import React from "react";
import "./OrderPlace.css";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { RiEmotionHappyLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { CLEAR_CART_ITEM } from "../../Redux/Constants/cartConstants";
import { useEffect } from "react";

const OrderPlace = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    document.title = "Order Place..!!";
    localStorage.setItem("userCart", []);
    dispatch({ type: CLEAR_CART_ITEM });
  }, []);

  return (
    <>
      <Header />
      <div className="order-place-container">
        <div className="order-place-box">
          <div className="order-place-cart">
            <i>
              <RiEmotionHappyLine />
            </i>
            <div className="order-place-heading">
              <h2>{`Thanks ${user.firstName} `} </h2>
              <h2>Your Order Is Place SuccessFully..!!</h2>
            </div>

            <div className="order-place-btn">
              <Link to={"/"}>
                <button>Home</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OrderPlace;

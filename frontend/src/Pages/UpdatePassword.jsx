import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import { MdClose, MdVerifiedUser } from "react-icons/md";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import {
  userPasswordUpdateAction,
  clearError,
  loadUserAction,
  logOutUserAction,
} from "../Redux/Actions/userAction";
import { ImEnter } from "react-icons/im";
import { useEffect } from "react";
import { addToCartAction } from "../Redux/Actions/cartAction";
import { CLEAR_CART_ITEM } from "../Redux/Constants/cartConstants";
import Loader from "../Components/Loader/Loader";

const UpdatePassword = () => {
  const RegisterSuccess = useRef();
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const TogglePass = (fieldName) => {
    const targetField = document.getElementById(fieldName);
    targetField.type = targetField.type === "password" ? "text" : "password";
  };

  const handelPasswordResetSubmit = (e) => {
    e.preventDefault();
    const confirm_password = document.getElementById("confirm_password").value;
    const newPassword = document.getElementById("newPassword").value;
    const userData = {
      password: newPassword,
      confirm_password,
    };
    dispatch(userPasswordUpdateAction(userData));
  };

  const { loading, error, message, success } = useSelector(
    (state) => state.passwordUpdate
  );
  const closeRegisterPop = () => {
    RegisterSuccess.current.style.display = "none";
  };

  useEffect(() => {
    document.title = `Update Password`;
    if (success) {
      RegisterSuccess.current.style.display = "block";
      dispatch(logOutUserAction());
    }
  }, [success]);

  if (error) {
    setTimeout(() => {
      // console.log("Time Up");
      dispatch(clearError());
    }, 5000);
  }

  return (
    <>
      <Header />
      {loading ? <Loader LoadingName={"Updating Password"} /> : ""}
      <div className="login-container">
        <h1 className="Heading regHeading">
          Update <span>Password</span>
        </h1>
        {success ? (
          <div className="RegisterSuccess" ref={RegisterSuccess}>
            <div className="pop-card">
              <button id="close-btn" onClick={closeRegisterPop}>
                <MdClose />
              </button>
              <div className="successLoader">
                <h3 className="loader-text"></h3>
              </div>
              <h1>Password Updated..!!</h1>
              <button onClick={() => Navigate("/Login")}>Login</button>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="box">
          <div className="login-box">
            <form onSubmit={handelPasswordResetSubmit}>
              <div className="user-password">
                <VscEyeClosed />
                <input
                  type="password"
                  placeholder="New Password"
                  required
                  id="newPassword"
                />
                <i
                  className="showPassword"
                  onClick={() => {
                    TogglePass("newPassword");
                  }}
                >
                  <VscEye />
                </i>
              </div>
              <div className="user-password">
                <MdVerifiedUser />
                <input
                  type="text"
                  placeholder="Confirm Password"
                  id="confirm_password"
                  required
                />
                {error ? (
                  <div className="validError">
                    {" "}
                    <span>{error}</span>{" "}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="user-links"></div>
              <button>Update Password</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UpdatePassword;

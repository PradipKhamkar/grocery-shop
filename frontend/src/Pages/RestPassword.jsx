import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import { MdVerifiedUser } from "react-icons/md";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import {
  userPasswordUpdateAction,
  clearError,
  loadUserAction,
  logOutUserAction,
  restPasswordAction,
} from "../Redux/Actions/userAction";
import { ImEnter } from "react-icons/im";
import { useEffect } from "react";
import Loader from "../Components/Loader/Loader";

const RestPassword = () => {
  const RegisterSuccess = useRef();
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, token } = useParams();
  const TogglePass = (fieldName) => {
    const targetField = document.getElementById(fieldName);
    targetField.type = targetField.type === "password" ? "text" : "password";
  };

  const handelPasswordResetSubmit = (e) => {
    e.preventDefault();

    const password = document.getElementById("newPassword").value;
    const confirm_password = document.getElementById("confirm_password").value;
    dispatch(restPasswordAction(id, token, password, confirm_password));
  };

  const { loading, error, message, success } = useSelector(
    (state) => state.passwordReset
  );

  const closeRegisterPop = () => {
    RegisterSuccess.current.style.display = "none";
  };

  useEffect(() => {
    document.title = `Reset Password`;
    if (success) {
      RegisterSuccess.current.style.display = "block";
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
      {loading ? <Loader LoadingName={"Processing Data"} /> : ""}
      <div className="forget-password-container">
        <h1 className="Heading">
          Rest <span>Password</span>
        </h1>
        {success ? (
          <div className="RegisterSuccess" ref={RegisterSuccess}>
            <div className="pop-card">
              <div className="successLoader">
                <h3 className="loader-text"></h3>
              </div>
              <h1>{message}</h1>
              <button
                onClick={() => {
                  Navigate("/Login");
                }}
              >
                Login <ImEnter />
              </button>
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
              <button>Rest Password</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RestPassword;

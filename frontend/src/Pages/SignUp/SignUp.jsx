import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import {
  MdClose,
  MdOutlineMarkEmailRead,
  MdVerifiedUser,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RxLetterCaseCapitalize } from "react-icons/rx";
import { GoHome } from "react-icons/go";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { userRegisterAction, clearError } from "../../Redux/Actions/userAction";
import { useRef } from "react";
import { ImEnter } from "react-icons/im";
import Loader from "../../Components/Loader/Loader";

const SignUp = () => {
  const dispatch = useDispatch();
  const passwordToggle = useRef();
  const RegisterSuccess = useRef();
  const Navigate = useNavigate();
  const { error, success, loading } = useSelector((state) => state.register);
  const TogglePass = () => {
    const filedType = passwordToggle.current.type;
    passwordToggle.current.type =
      filedType === "password" ? "text" : "password";
  };
  document.title = `Register User`;
  const closeRegisterPop = () => {
    RegisterSuccess.current.style.display = "none";
  };

  const HandelRegisterUser = (e) => {
    e.preventDefault();

    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.cPassword.value;

    if (firstName && lastName && email && password && confirmPassword) {
      const userData = {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      };
      dispatch(userRegisterAction(userData));
    }
  };

  if (error) {
    setTimeout(() => {
      // console.log("Time Up");
      dispatch(clearError());
      // console.log(error);
    }, 5000);
  }

  return (
    <>
      <Header />
      {loading ? (
        <Loader LoadingName={"Validating Data"} />
      ) : (
        <div className="login-container">
          <h1 className="Heading regHeading">
            User <span>Register</span>
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
                <h1>Register SuccessFully..!!</h1>
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
              <form onSubmit={(e) => HandelRegisterUser(e)}>
                <div className="user-email">
                  <RxLetterCaseCapitalize />
                  <input
                    type="text"
                    placeholder="Name"
                    name="firstName"
                    required
                    autoComplete="false"
                  />
                </div>
                <div className="user-email">
                  <GoHome />
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    required
                    autoComplete="false"
                  />
                </div>
                <div className="user-email">
                  <MdOutlineMarkEmailRead />
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    required
                  />
                </div>
                <div className="user-password">
                  <VscEyeClosed />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                    ref={passwordToggle}
                    autoComplete="false"
                  />
                  <i className="showPassword" onClick={TogglePass}>
                    <VscEye />
                  </i>
                </div>
                <div className="user-password">
                  <MdVerifiedUser />
                  <input
                    type="text"
                    placeholder="Confirm Password"
                    name="cPassword"
                    required
                    autoComplete="false"
                  />
                </div>
                {error ? (
                  <div className="validError">
                    {error.map((err) => {
                      return (
                        <>
                          <span>{err}</span>
                          <br />
                        </>
                      );
                    })}
                  </div>
                ) : (
                  ""
                )}

                <div
                  className="user-links"
                  style={{ justifyContent: "center" }}
                >
                  {/* <Link>Forget's Password</Link> */}
                  <Link to="/Login">Already Register ? Login </Link>
                </div>
                <button>Register</button>
              </form>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default SignUp;

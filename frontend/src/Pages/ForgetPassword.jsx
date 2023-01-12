import React, { useEffect, useRef } from "react";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import { MdOutlineMarkEmailRead, MdClose } from "react-icons/md";
import { useState } from "react";
import {
  clearError,
  restPasswordSendEmailAction,
} from "../Redux/Actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { TbMessageShare } from "react-icons/tb";
import Loader from "../Components/Loader/Loader";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const RegisterSuccess = useRef();

  const [email, setEmail] = useState("");
  const handelSendEmail = (e) => {
    e.preventDefault();
    if (email) {
      dispatch(restPasswordSendEmailAction(email));
    }
  };
  const closeRegisterPop = () => {
    RegisterSuccess.current.style.display = "none";
  };

  const { success, message, error, loading } = useSelector(
    (state) => state.sendRestPassMail
  );

  useEffect(() => {
    document.title = `Forget Password`;
    if (error) {
      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    }
    if (success) {
      RegisterSuccess.current.style.display = "block";
    }
  }, [error, message, success]);

  return (
    <>
      <Header />

      {loading ? <Loader LoadingName={"Processing Data"} /> : ""}
      <div className="forget-password-container">
        <h1 className="Heading">
          Forget <span>Password</span>
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
              <h1>{message}</h1>
              <a href="https://mail.google.com/mail/#inbox" target="_blank">
                <button>
                  Check Email <TbMessageShare />
                </button>
              </a>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="box">
          <div className="login-box">
            <form onSubmit={(e) => handelSendEmail(e)}>
              <div className="user-email">
                <MdOutlineMarkEmailRead />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {error ? (
                <div className="validError">
                  {" "}
                  <span>{error}</span>{" "}
                </div>
              ) : (
                ""
              )}
              <button>Send Link</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgetPassword;

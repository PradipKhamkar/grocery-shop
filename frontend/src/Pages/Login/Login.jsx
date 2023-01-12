import React, { useRef } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { userLoginAction, clearError } from "../../Redux/Actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader/Loader";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const passwordToggle = useRef();
  const { error, success, loading } = useSelector((state) => state.user);

  const TogglePass = () => {
    const filedType = passwordToggle.current.type;
    passwordToggle.current.type =
      filedType === "password" ? "text" : "password";
  };
  const handelLoginSubmit = (e) => {
    e.preventDefault();

    const email = document.login_form.email.value;
    const password = document.login_form.password.value;
    const userData = {
      email,
      password,
    };
    dispatch(userLoginAction(userData));
  };

  useEffect(() => {
    document.title = "Login";
  }, [success]);

  if (error) {
    setTimeout(() => {
      dispatch(clearError());
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
            User <span>Login</span>
          </h1>
          <div className="box">
            <div className="login-box">
              <form
                name="login_form"
                onSubmit={(e) => {
                  handelLoginSubmit(e);
                }}
              >
                <div className="user-email">
                  <MdOutlineMarkEmailRead />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                  />
                </div>
                <div className="user-password">
                  <VscEyeClosed />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    ref={passwordToggle}
                    name="password"
                  />
                  <i className="showPassword" onClick={TogglePass}>
                    <VscEye />
                  </i>
                </div>

                {error ? (
                  <div className="validError">
                    {" "}
                    <span>{error}</span>{" "}
                  </div>
                ) : (
                  ""
                )}

                <div className="user-links">
                  <Link to="/Forget/Password">Forget's Password</Link>
                  <Link to="/Signup">Not A User ? Sign Up</Link>
                </div>
                <button>Login</button>
              </form>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Login;

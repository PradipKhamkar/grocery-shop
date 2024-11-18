import React, { useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { RiShoppingBasketFill } from "react-icons/ri";
import { HiMenuAlt3 } from "react-icons/hi";
import { BiSearch, BiCart } from "react-icons/bi";
import { FaUserCheck, FaTrashRestore } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useRef } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { RiEmotionHappyLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {logOutUserAction} from "../../Redux/Actions/userAction";
import { useEffect } from "react";
import { removeCartItemAction } from "../../Redux/Actions/cartAction";
import GithubButton from "../GithubButton/GithubButton";

const Header = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { success: logOutSuccess, message } = useSelector(
    (state) => state.logOut
  );
  const { cartItems } = useSelector((state) => state.userCart);

  useEffect(() => {
    if (logOutSuccess) {
      alert("Logout Success..!!");
      window.location.reload();
    }
  }, [cartItems, logOutSuccess]);

  //Search
  const [keyword, setKeyword] = useState("");
  const handelSearch = (e) => {
    e.preventDefault();
    const trimKeyword = keyword.trim();
    if (trimKeyword.length != 0) {
      Navigate(`/products/${trimKeyword}`);
    } else {
      Navigate(`/products`);
    }
  };

  //Log Out User
  const logOutMe = () => {
    dispatch(logOutUserAction());
  };

  //Remove Cart Item
  const RemoveCartItem = (id) => {
    dispatch(removeCartItemAction(id));
  };

  //Close Open Section
  window.onscroll = () => {
    searchBar.current.classList.remove("active");
    shoppingCart.current.classList.remove("active");
    navbar.current.classList.remove("active");
    profile.current.classList.remove("active");
  };

  //Toggle Navbar
  const profile = useRef();
  const toggleProfile = () => {
    profile.current.classList.toggle("active");
    navbar.current.classList.remove("active");
    searchBar.current.classList.remove("active");
    shoppingCart.current.classList.remove("active");
  };
  //Toggle Navbar
  const navbar = useRef();
  const toggleNavbar = () => {
    navbar.current.classList.toggle("active");
    searchBar.current.classList.remove("active");
    shoppingCart.current.classList.remove("active");
    profile.current.classList.remove("active");
  };

  //Toggle Cart
  const shoppingCart = useRef();
  const toggleShoppingCart = () => {
    shoppingCart.current.classList.toggle("active");
    searchBar.current.classList.remove("active");
    navbar.current.classList.remove("active");
    profile.current.classList.remove("active");
  };

  //Toggle Search Bar
  const searchBar = useRef();
  const toggleSearchBar = () => {
    searchBar.current.classList.toggle("active");
    shoppingCart.current.classList.remove("active");
    navbar.current.classList.remove("active");
    profile.current.classList.remove("active");
  };

  return (
    <>
      <header className="header">
        <Link to="/" className="logo">
          {<RiShoppingBasketFill />} {""}
          Grocery
        </Link>
        <nav className="navbar-section" ref={navbar}>
          <Link to="/">Home</Link>
          <Link to="/#features">Features</Link>
          <Link to="/products">Products</Link>
          <Link to="/reviews/all">Reviews</Link>
          <Link to="/about">About Us</Link>
          {/* <Link className="glow-on-hover" onClick={()=>{window.open('https://interview-ai-ui.vercel.app/',"_blank")}}>Try Interview AI</Link> */}

        </nav>
        <div className="navbar-icons">
          <div id="menu-btn" onClick={toggleNavbar}>
            <HiMenuAlt3 />
          </div>
          <div id="search-btn" onClick={toggleSearchBar}>
            <BiSearch />
          </div>

          <div id="cart-btn" onClick={toggleShoppingCart}>
            <BiCart />
            <span className="cart-count">
              <small className="count">{cartItems && cartItems.length}</small>
            </span>
          </div>
          <div id="login-btn" onClick={toggleProfile}>
            {user ? <RiEmotionHappyLine /> : <FaUserCheck />}
          </div>
        </div>
        <form
          className="search-form"
          ref={searchBar}
          onSubmit={(e) => handelSearch(e)}
        >
          <input
            type="search"
            id="search-box"
            placeholder="Search Here...!!"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button htmlFor="search-box">
            <BiSearch />
          </button>
        </form>
        <div className="shopping-cart" ref={shoppingCart}>
          {cartItems.length !== 0 &&
            cartItems.map((item) => {
              return (
                <div className="box" key={item.id}>
                  <img src={item.image} alt="Product Images" />
                  <div className="content">
                    <i onClick={() => RemoveCartItem(item.id)}>
                      {" "}
                      {<FaTrashRestore />}
                    </i>
                    <h3>{item.name}</h3>
                    <span className="price">
                      ₹ {item.rate * item.quantity}/-{" "}
                    </span>
                    <span className="qty">Qty: {item.quantity} Kg</span>
                  </div>
                </div>
              );
            })}

          <div className="total">
            Total :{" "}
            <span className="amount">
              ₹{" "}
              {cartItems &&
                cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.rate,
                  0
                )}
              / -
            </span>
          </div>
          <Link to="/Order/Checkout" className="checkoutBtn">
            Go To Cart
          </Link>
        </div>
        <div className="user-profile" ref={profile}>
          {!user ? (
            <ul>
              <Link to="/Login">
                <li>
                  <AiOutlineArrowRight /> Login
                </li>
              </Link>

              <Link to="/Signup">
                <li>
                  <AiOutlineArrowRight /> Sign Up
                </li>
              </Link>
            </ul>
          ) : (
            <ul className="After-login-option">
              {user && user.role === "Admin" ? (
                <Link to="/admin/home">
                  <li>
                    <AiOutlineArrowRight /> Dashboard
                  </li>
                </Link>
              ) : (
                ""
              )}

              <Link to="/Order/MyOrder">
                <li>
                  <AiOutlineArrowRight /> My Orders
                </li>
              </Link>
              <Link to="/RestPassword">
                <li>
                  <AiOutlineArrowRight /> Change Password
                </li>
              </Link>
              {/* <Link>
                <li>
                  <AiOutlineArrowRight /> Change Email
                </li>
              </Link> */}
              <Link to={"/review/add"}>
                <li>
                  <AiOutlineArrowRight /> Add Reviews
                </li>
              </Link>
              <li>
                <button onClick={logOutMe}>
                  <RiLogoutCircleRLine /> Log Out
                </button>
              </li>
            </ul>
          )}
        </div>
        <GithubButton />
      </header>
    </>
  );
};

export default Header;

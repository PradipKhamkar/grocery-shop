import React from "react";
import {
  AiFillAppstore,
  AiOutlineUserSwitch,
  AiOutlineRightCircle,
} from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";
import { BiHomeHeart } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar-container">
        <ul>
          <Link to="/admin/home">
            <li>
              <i>
                <BiHomeHeart />
              </i>
              <span>Dashboard</span>
            </li>
          </Link>

          <Link to="/admin/products">
            <li>
              <i>
                <AiFillAppstore />
              </i>
              <span>Products</span>
            </li>
          </Link>
          <Link to="/admin/view/orders">
            <li>
              <i>
                <MdFavoriteBorder />
              </i>
              <span>Orders</span>
            </li>
          </Link>
          <Link to="/admin/view/users">
            <li>
              <i>
                <AiOutlineUserSwitch />
              </i>
              <span>Users</span>
            </li>
          </Link>
          <Link to="/admin/view/reviews">
            <li>
              <i>
                <AiOutlineRightCircle />
              </i>
              <span>Reviews</span>
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;

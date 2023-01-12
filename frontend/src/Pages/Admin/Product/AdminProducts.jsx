import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Components/Sidebar/Sidebar";
import Header from "../../../Components/Header/Header";
import "./AdminProducts.css";

const AdminProducts = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="dashboard-container">
        <br />
        <div className="dashboard-sub-heading">
          <h1>Admin Products</h1>
        </div>
        <div className="admin-products-actions">
          <ul>
            <Link to="/admin/add/products">
              <li>Add Products</li>
            </Link>
            <Link to="/admin/view/products">
              <li>View Products</li>
            </Link>
            <Link to="/admin/add/category">
              <li>Add Category</li>
            </Link>
            <Link to="/admin/view/category">
              {" "}
              <li>View Category</li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminProducts;

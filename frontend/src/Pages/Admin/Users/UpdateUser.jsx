import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Header from "../../../Components/Header/Header";
import {
  adminUpdateUserAction,
  clearError,
} from "../../../Redux/Actions/userAction";
import Sidebar from "../Components/Sidebar/Sidebar";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const Location = useLocation();
  const { success, loading, updatedUser, message, error } = useSelector(
    (state) => state.adminUpdateUser
  );

  const [userRole, setUserRole] = useState(
    Location.state.userName ? Location.state.userName : ""
  );

  const [userId, setUserId] = useState(
    Location.state.userId ? Location.state.userId : ""
  );

  const handelUpdateUserSubmit = (e) => {
    e.preventDefault();
    if (userRole === "") {
      alert("Choose Role");
    } else {
      dispatch(adminUpdateUserAction(userId, userRole));
    }
  };

  if (error) {
    setInterval(() => {
      dispatch(clearError());
    }, 5000);
  }

  return (
    <>
      <Header />
      <Sidebar />
      <div className="dashboard-container">
        <div className="dashboard-sub-heading">
          <h1>Update User</h1>
        </div>

        <div className="add-product-form-box">
          <form onSubmit={(e) => handelUpdateUserSubmit(e)}>
            <div className="product-name">
              <input
                type="text"
                value={Location.state.userName ? Location.state.userName : ""}
                placeholder="User Name"
                readOnly
              />
            </div>

            <div className="product-name">
              <input
                type="text"
                value={Location.state.userEmail ? Location.state.userEmail : ""}
                placeholder="User email"
                readOnly
              />
            </div>

            <div className="product-name">
              <input
                type="text"
                value={Location.state.userRole ? Location.state.userRole : ""}
                placeholder="User role"
                readOnly
              />
            </div>
            <div className="product-category">
              <select
                onChange={(e) => {
                  setUserRole(e.target.value);
                }}
                required
              >
                <option value="">Choose Role</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>

            {error ? (
              <div className="upload-error">
                <h1>{error}</h1>
              </div>
            ) : (
              ""
            )}

            {success ? (
              <div className="upload-error">
                <h1>{message}</h1>
              </div>
            ) : (
              ""
            )}

            <div className="add-product-form-btn">
              <button>Update Role</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateUser;

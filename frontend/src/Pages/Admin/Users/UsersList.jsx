import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../Components/Header/Header";
import Loader from "../../../Components/Loader/Loader";
import NotFoundCart from "../../../Components/NotFoundCart/NotFoundCart";
import {
  deleteUserAdminAction,
  getAllUsersAdminAction,
} from "../../../Redux/Actions/userAction";
import Sidebar from "../Components/Sidebar/Sidebar";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";

const UsersList = () => {
  const dispatch = useDispatch();
  const { users, loading, error, success } = useSelector(
    (state) => state.adminAllUsers
  );

  const {
    loading: deleteLoading,
    error: deleteError,
    success: deleteSuccess,
  } = useSelector((state) => state.adminDeleteUser);

  const deleteUser = async (userId) => {
    if (userId) {
      dispatch(deleteUserAdminAction(userId));
    }
  };

  useEffect(() => {
    dispatch(getAllUsersAdminAction());
  }, [deleteSuccess]);

  return (
    <>
      <Header />
      <Sidebar />
      {loading || deleteLoading ? (
        <Loader LoadingName={"Loading Users"} />
      ) : success ? (
        <div className="dashboard-container">
          <div className="dashboard-sub-heading">
            <h1>All Users</h1>
          </div>
          <div className="products-table">
            <table>
              <thead>
                <th>Id</th>
                <th>Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role</th>
                <th colSpan={2}>Actions</th>
              </thead>
              {users &&
                users.map((user) => {
                  return (
                    <tbody key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <Link
                          to={`/admin/update/${user._id}`}
                          state={{
                            userId: user._id,
                            userEmail: user.email,
                            userName: user.firstName + " " + user.lastName,
                            userRole: user.role,
                          }}
                        >
                          <HiPencilAlt />
                        </Link>
                      </td>
                      <td
                        className="admin-delete-products-icon"
                        onClick={() => deleteUser(user._id)}
                      >
                        <FaTrash />
                      </td>
                    </tbody>
                  );
                })}
            </table>
          </div>
        </div>
      ) : (
        <NotFoundCart msg={error} />
      )}
    </>
  );
};

export default UsersList;

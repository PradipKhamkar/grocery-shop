import React from "react";
import { useEffect } from "react";
import { getAllOrdersAdminAction } from "../../../Redux/Actions/orderActions";
import Header from "../../../Components/Header/Header";
import Sidebar from "../Components/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { HiPencilAlt } from "react-icons/hi";
import Loader from "../../../Components/Loader/Loader";
import NotFoundCart from "../../../Components/NotFoundCart/NotFoundCart";
import { Link } from "react-router-dom";

const OrderList = () => {
  const dispatch = useDispatch();
  const { loading, orders, success, ordersCounts, error } = useSelector(
    (state) => state.adminAllOrders
  );
  useEffect(() => {
    dispatch(getAllOrdersAdminAction());
  }, []);
  return (
    <>
      <Header />
      <Sidebar />
      <div className="dashboard-container">
        {loading ? (
          <Loader LoadingName={"Orders Loading"} />
        ) : success ? (
          <>
            <div className="dashboard-sub-heading">
              <h1>All Orders</h1>
            </div>

            <div className="products-table">
              <table>
                <thead>
                  <th>Order Id</th>
                  <th>Name</th>
                  <th>Items</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th colSpan={2}>Actions</th>
                </thead>
                {orders &&
                  orders.map((order) => {
                    return (
                      <>
                        <tbody key={order._id}>
                          <td>
                            <Link to={`/admin/update/order/${order._id}`}>
                              #{order._id}
                            </Link>{" "}
                          </td>
                          <td>
                            {order.user.firstName + " " + order.user.lastName}
                          </td>
                          <td>{order.orderItems.length}</td>
                          <td> ₹ {order.total}</td>
                          <td
                            className={
                              order.status === "Processing"
                                ? "order-processing-status"
                                : order.status === "Shipped"
                                ? "order-shipping-status"
                                : "order-delivered-status"
                            }
                          >
                            {order.status}
                          </td>
                          <td>{order.orderDate}</td>
                          <td>
                            <Link to={`/admin/update/order/${order._id}`}>
                              {<HiPencilAlt />}
                            </Link>
                          </td>
                          {/* <td className="admin-delete-products-icon">
                          {<FaTrash />}
                        </td> */}
                        </tbody>
                      </>
                    );
                  })}
              </table>
            </div>
          </>
        ) : error ? (
          <NotFoundCart msg={error} />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default OrderList;

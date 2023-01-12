import React from "react";
import Header from "../../Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import { BsBagDashFill } from "react-icons/bs";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./AdminHome.css";
import { useEffect } from "react";
import { getAllProductsAction } from "../../Redux/Actions/productAction";
import Loader from "../../Components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { getAllOrdersAdminAction } from "../../Redux/Actions/orderActions";
import { getAllUsersAdminAction } from "../../Redux/Actions/userAction";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminHome = () => {
  const dispatch = useDispatch();
  const {
    usersCount,
    loading: userLoading,
    error: userError,
    success: userSuccess,
  } = useSelector((state) => state.adminAllUsers);

  const {
    loading,
    error,
    success: SuccessProducts,
    products,
    productsCount,
  } = useSelector((state) => state.getAllProducts);
  const {
    loading: orderLoading,
    orders,
    success: orderSuccess,
    ordersCounts,
    error: orderError,
  } = useSelector((state) => state.adminAllOrders);

  useEffect(() => {
    document.title = `Admin Dashboard`;
    dispatch(getAllProductsAction());
    dispatch(getAllOrdersAdminAction());
    dispatch(getAllUsersAdminAction());
  }, []);

  let totalAmount = 0;
  orders &&
    orders.forEach(
      (item) => (totalAmount += item.status === "Delivered" ? item.total : 0)
    );

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  let outOfStock = 0;
  products &&
    products.forEach((item) => {
      if (item.stocks <= 0) {
        outOfStock += 1;
      }
    });

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products && products.length - outOfStock],
      },
    ],
  };

  return (
    <>
      <Header />
      <Sidebar />
      <div className="dashboard-container">
        {loading || userLoading || orderLoading ? (
          <Loader LoadingName={"Loading Dashboard"} />
        ) : SuccessProducts && userSuccess && orderSuccess ? (
          <>
            <div className="dashboard-heading">
              <h1>Dashboard</h1>
            </div>
            <div className="first-dashboard-section">
              <Link to="/admin/view/products">
                <div className="dashboard-box product-box">
                  <i>
                    <BsBagDashFill />
                  </i>
                  <span>Products</span>
                  <h3>{productsCount}</h3>
                </div>
              </Link>
              <Link to="/admin/view/users">
                <div className="dashboard-box users-box">
                  <i>
                    <AiOutlineUserSwitch />
                  </i>
                  <span>Users</span>
                  <h3>{usersCount}</h3>
                </div>
              </Link>
              <div className="dashboard-box amount-box">
                <i>
                  <FaRegMoneyBillAlt />
                </i>
                <span>Total Amount</span>
                <h3>₹ {totalAmount}</h3>
              </div>
            </div>
            <div className="second-dashboard-section">
              <div className="admin-line-chart">
                <div className="dashboard-sub-heading">
                  <h1>Amount Growth</h1>
                </div>
                <Line data={lineState} />
              </div>
              <div className="admin-pie-chart">
                <div className="dashboard-sub-heading">
                  <h1>Products Stock</h1>
                </div>
                <Doughnut data={doughnutState} />
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default AdminHome;

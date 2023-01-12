const express = require("express");
const {
  newOrder,
  getMyOrders,
  getOrderDetails,
  adminAllOrders,
  AdminUpdateOrder,
} = require("../Controllers/orderController");
const {
  addReviews,
  getAllReviews,
  AdminGetAllReviews,
  deleteReview,
} = require("../Controllers/reviewsController");
const route = express.Router();
const {
  userRegister,
  userLogin,
  changeUserPassword,
  getLoggedUser,
  sendUserPasswordResetEmail,
  userPasswordReset,
  loggedOutUser,
  adminGetAllUsers,
  AdminDeleteUser,
  adminUpdateUser,
} = require("../Controllers/userController");
const isAuthorized = require("../middleware/isAuthorized");
const isAuthUser = require("../middleware/isAuthUser");

//Public Route
route.post("/register", userRegister);
route.post("/login", userLogin);
route.post("/send-reset-password-email", sendUserPasswordResetEmail);
route.post("/reset-password/:id/:token", userPasswordReset);

route.put("/changePassword", isAuthUser, changeUserPassword);
route.get("/getloggeduser", isAuthUser, getLoggedUser);
route.get("/logOut", isAuthUser, loggedOutUser);

route.post("/new/order", isAuthUser, newOrder);
route.get("/my/orders", isAuthUser, getMyOrders);
route.get("/my/order/:orderId", isAuthUser, getOrderDetails);

route.post("/add/review", isAuthUser, addReviews);
route.get("/get/reviews", getAllReviews);

//Admin Route
route.get("/admin/orders", isAuthUser, isAuthorized, adminAllOrders);
route.put("/update/order/:orderId", isAuthUser, isAuthorized, AdminUpdateOrder);
route.get("/admin/user", isAuthUser, isAuthorized, adminGetAllUsers);
route.delete("/admin/user/:userId", isAuthUser, isAuthorized, AdminDeleteUser);
route.put("/admin/user/:userId", isAuthUser, isAuthorized, adminUpdateUser);
route.get("/get/admin/reviews", isAuthUser, isAuthorized, AdminGetAllReviews);
route.delete("/admin/review/:reviewId", isAuthUser, isAuthorized, deleteReview);

module.exports = route;

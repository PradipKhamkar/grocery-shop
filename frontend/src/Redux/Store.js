import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
  loginReducer,
  registerReducer,
  logOutUser,
  userPasswordUpdateReducer,
  passwordResetEmailSendReducer,
  userPasswordResetReducer,
  getAllUserAdminReducer,
  deleteUserAdminReducer,
  updateUserRoleReducer,
} from "./Reducers/userReducers";
import {
  getAllProductsReducer,
  addProductsReducer,
  deleteProductReducer,
  getSingleProductReducer,
  updateProductReducer,
} from "./Reducers/productReducer";
import { myCartProductReducer } from "./Reducers/cartReducer";
import {
  addCategoryReducer,
  deleteCategoryReducer,
  getCategoryReducer,
  updateCategoryReducer,
} from "./Reducers/categoryReducer";
import {
  getAllOrdersAdminReducer,
  getUpdateOrderAdminReducer,
  getUserOrderDetailsReducer,
  getUserOrderReducer,
} from "./Reducers/ordersReducer";
import {
  deleteReviewsReducer,
  getAllAdminReviewsReducer,
  getAllReviewsReducer,
} from "./Reducers/reviewsReducer";

const rootReducer = combineReducers({
  //User Reducer
  register: registerReducer,
  user: loginReducer,
  logOut: logOutUser,
  passwordUpdate: userPasswordUpdateReducer,
  sendRestPassMail: passwordResetEmailSendReducer,
  passwordReset: userPasswordResetReducer,
  getAllOrders: getUserOrderReducer,
  getOrderDetails: getUserOrderDetailsReducer,
  getAllReviews: getAllReviewsReducer,
  userCart: myCartProductReducer,

  // Product Reducers:
  addProduct: addProductsReducer,
  getAllProducts: getAllProductsReducer,
  getSingleProduct: getSingleProductReducer,
  deleteProduct: deleteProductReducer,
  updateProduct: updateProductReducer,

  //Category Reducer
  addCategory: addCategoryReducer,
  getAllCategory: getCategoryReducer,
  deleteCategory: deleteCategoryReducer,

  //Admin Reducer
  adminAllOrders: getAllOrdersAdminReducer,
  adminUpdateOrder: getUpdateOrderAdminReducer,
  adminAllUsers: getAllUserAdminReducer,
  adminDeleteUser: deleteUserAdminReducer,
  adminUpdateUser: updateUserRoleReducer,
  adminUpdateCategory: updateCategoryReducer,
  adminGetReviews: getAllAdminReviewsReducer,
  deleteReview: deleteReviewsReducer,
});

const initialState = {
  userCart: {
    cartItems: localStorage.getItem("userCart")
      ? JSON.parse(localStorage.getItem("userCart"))
      : [],
  },
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

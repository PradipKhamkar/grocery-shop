import axios from "axios";
import {
  GET_ALL_ORDERS_ADMIN_FAIL,
  GET_ALL_ORDERS_ADMIN_REQUEST,
  GET_ALL_ORDERS_ADMIN_SUCCESS,
  GET_USER_ORDERS_DETAILS_FAIL,
  GET_USER_ORDERS_DETAILS_REQUEST,
  GET_USER_ORDERS_DETAILS_SUCCESS,
  GET_USER_ORDERS_FAIL,
  GET_USER_ORDERS_REQUEST,
  GET_USER_ORDERS_SUCCESS,
  UPDATE_ORDER_ADMIN_FAIL,
  UPDATE_ORDER_ADMIN_REQUEST,
  UPDATE_ORDER_ADMIN_SUCCESS,
} from "../Constants/orderConstants";

export const getUsersOrdersAction = (userId) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_ORDERS_REQUEST });
    const { data } = await axios.get("/api/user/my/orders");
    dispatch({ type: GET_USER_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_ORDERS_FAIL,
      error: error.response.data.message,
    });
    // console.log(error);
  }
};

export const getUsersOrderDetailsAction = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_ORDERS_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/user/my/order/${orderId}`);
    dispatch({ type: GET_USER_ORDERS_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_ORDERS_DETAILS_FAIL,
      error: error.response.data.message,
    });
    // console.log(error);
  }
};

export const getAllOrdersAdminAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ORDERS_ADMIN_REQUEST });
    const { data } = await axios.get("/api/user/admin/orders");
    dispatch({ type: GET_ALL_ORDERS_ADMIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ORDERS_ADMIN_FAIL,
      error: error.data.response.message,
    });
  }
};

export const updateOrdersAdminAction =
  (orderId, oStatus) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_ORDER_ADMIN_REQUEST });
      const { data } = await axios.put(`/api/user/update/order/${orderId}`, {
        oStatus,
      });
      dispatch({ type: UPDATE_ORDER_ADMIN_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_ORDER_ADMIN_FAIL,
        error: error.data.response.message,
      });
    }
  };

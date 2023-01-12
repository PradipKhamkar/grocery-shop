import {
  GET_USER_ORDERS_FAIL,
  GET_USER_ORDERS_REQUEST,
  GET_USER_ORDERS_SUCCESS,
  CLEAR_ERRORS,
  GET_USER_ORDERS_DETAILS_REQUEST,
  GET_USER_ORDERS_DETAILS_SUCCESS,
  GET_USER_ORDERS_DETAILS_FAIL,
  GET_ALL_ORDERS_ADMIN_REQUEST,
  GET_ALL_ORDERS_ADMIN_SUCCESS,
  GET_ALL_ORDERS_ADMIN_FAIL,
  UPDATE_ORDER_ADMIN_REQUEST,
  UPDATE_ORDER_ADMIN_SUCCESS,
  UPDATE_ORDER_ADMIN_FAIL,
} from "../Constants/orderConstants";

//Get Order Reducer
export const getUserOrderReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case GET_USER_ORDERS_REQUEST:
      return { loading: true };
    case GET_USER_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload.myOrders,
        success: action.payload.success,
      };
    case GET_USER_ORDERS_FAIL:
      return {
        loading: false,
        error: action.error,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

//Get OrderDetails Reducer
export const getUserOrderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case GET_USER_ORDERS_DETAILS_REQUEST:
      return { loading: true };
    case GET_USER_ORDERS_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload.order,
        success: action.payload.success,
      };
    case GET_USER_ORDERS_DETAILS_FAIL:
      return {
        loading: false,
        error: action.error,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

//get all orders for admin
export const getAllOrdersAdminReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case GET_ALL_ORDERS_ADMIN_REQUEST:
      return {
        loading: true,
      };
    case GET_ALL_ORDERS_ADMIN_SUCCESS:
      return {
        loading: false,
        orders: action.payload.AllOrders,
        success: action.payload.success,
        ordersCounts: action.payload.ordersCounts,
      };
    case GET_ALL_ORDERS_ADMIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

//update orders for admin
export const getUpdateOrderAdminReducer = (state = { order: [] }, action) => {
  switch (action.type) {
    case UPDATE_ORDER_ADMIN_REQUEST:
      return {
        loading: true,
      };
    case UPDATE_ORDER_ADMIN_SUCCESS:
      return {
        loading: false,
        order: action.payload.Order,
        success: action.payload.success,
      };
    case UPDATE_ORDER_ADMIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

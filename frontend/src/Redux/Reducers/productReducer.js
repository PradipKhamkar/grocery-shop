import {
  CLEAR_ERRORS,
  GET_ALL_PRODUCTS_FAIL,
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  GET_SINGLE_PRODUCT_REQUEST,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
} from "../Constants/productConstants";

//Add Products Reducer
export const addProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_PRODUCT_REQUEST:
      return { loading: true };
    case ADD_PRODUCT_SUCCESS:
      return {
        loading: false,
        Product: action.payload.newProduct,
        success: action.payload.success,
        message: action.payload.message,
      };
    case ADD_PRODUCT_FAIL:
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

//Get Products Reducer
export const getAllProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS_REQUEST:
      return { loading: true };
    case GET_ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        success: action.payload.success,
        productsCount: action.payload.productsDocCount,
      };
    case GET_ALL_PRODUCTS_FAIL:
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

//get single product reducer
export const getSingleProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case GET_SINGLE_PRODUCT_REQUEST:
      return { loading: true };
    case GET_SINGLE_PRODUCT_SUCCESS:
      // console.log(action.payload.product);
      return {
        loading: false,
        product: action.payload.product,
        success: action.payload.success,
      };
    case GET_SINGLE_PRODUCT_FAIL:
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

export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
      return { loading: true };
    case DELETE_PRODUCT_SUCCESS:
      return {
        loading: false,
        DeletedProduct: action.payload.DeletedProduct,
        success: action.payload.success,
        message: action.payload.message,
      };
    case DELETE_PRODUCT_FAIL:
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

export const updateProductReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
      return { loading: true };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        message: action.payload.message,
      };
    case UPDATE_PRODUCT_FAIL:
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

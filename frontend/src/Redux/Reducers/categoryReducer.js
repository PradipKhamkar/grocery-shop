import {
  ADD_CATEGORY_FAIL,
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  CLEAR_ERRORS,
  DELETE_CATEGORY_FAIL,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  GET_CATEGORY_FAIL,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
} from "../Constants/categoryConstants";

export const addCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_CATEGORY_REQUEST:
      return { loading: true };
    case ADD_CATEGORY_SUCCESS:
      return {
        loading: false,
        newCategory: action.payload.newCategory,
        success: action.payload.success,
        message: action.payload.message,
      };
    case ADD_CATEGORY_FAIL:
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

export const getCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CATEGORY_REQUEST:
      return { loading: true };
    case GET_CATEGORY_SUCCESS:
      return {
        loading: false,
        Categories: action.payload.Categories,
        success: action.payload.success,
        message: action.payload.message,
      };
    case GET_CATEGORY_FAIL:
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

export const deleteCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CATEGORY_REQUEST:
      return { loading: true };
    case DELETE_CATEGORY_SUCCESS:
      return {
        loading: false,
        DeletedCategory: action.payload.DeletedCategory,
        success: action.payload.success,
        message: action.payload.message,
      };
    case DELETE_CATEGORY_FAIL:
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

export const updateCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_CATEGORY_REQUEST:
      return { loading: true };
    case UPDATE_CATEGORY_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        message: action.payload.message,
      };
    case UPDATE_CATEGORY_FAIL:
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

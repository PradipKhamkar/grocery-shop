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
import axios from "axios";

export const addCategoryAction = (categoryData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_CATEGORY_REQUEST });
    const { data } = await axios.post("/api/category/add", categoryData);
    dispatch({ type: ADD_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    // console.log(error);
    dispatch({ type: ADD_CATEGORY_FAIL, error: error.response.data.message });
  }
};

export const getAllCategoryAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CATEGORY_REQUEST });
    const { data } = await axios.get("/api/category/get");
    dispatch({ type: GET_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    // console.log(error);
    dispatch({ type: GET_CATEGORY_FAIL, error: error.response.data.message });
  }
};

//Delete Category
export const deleteCategoryAction = (categoryId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CATEGORY_REQUEST });
    const { data } = await axios.delete(`/api/category/delete/${categoryId}`);
    dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_CATEGORY_FAIL,
      error: error.response.data.message,
    });
  }
};

//Update Category
export const updateCategoryAction =
  (categoryId, updateFormData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_CATEGORY_REQUEST });
      const { data } = await axios.put(
        `/api/category/update/${categoryId}`,
        updateFormData
      );
      dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: data });
    } catch (error) {
      // console.log(error);
      dispatch({
        type: UPDATE_CATEGORY_FAIL,
        error: error.response.data.message,
      });
    }
  };

export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

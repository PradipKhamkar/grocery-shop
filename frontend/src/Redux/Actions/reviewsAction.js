import axios from "axios";
import {
  CLEAR_ERRORS,
  DELETE_REVIEWS_REQUEST,
  DELETE_REVIEWS_REVIEWS_FAIL,
  DELETE_REVIEWS_REVIEWS_SUCCESS,
  GET_ALL_ADMIN_REVIEWS_FAIL,
  GET_ALL_ADMIN_REVIEWS_REQUEST,
  GET_ALL_ADMIN_REVIEWS_SUCCESS,
  GET_ALL_REVIEWS_FAIL,
  GET_ALL_REVIEWS_REQUEST,
  GET_ALL_REVIEWS_SUCCESS,
} from "../Constants/reviewsConstants";

export const getAllReviewsAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_REVIEWS_REQUEST });
    const { data } = await axios.get("/api/user/get/reviews");
    dispatch({ type: GET_ALL_REVIEWS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_REVIEWS_FAIL,
      error: error.response.data.message,
    });
  }
};

export const getAllAdminReviewsAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ADMIN_REVIEWS_REQUEST });
    const { data } = await axios.get("/api/user/get/reviews");
    dispatch({ type: GET_ALL_ADMIN_REVIEWS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ADMIN_REVIEWS_FAIL,
      error: error.response.data.message,
    });
  }
};

export const deleteReviewsAction = (reviewId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEWS_REQUEST });
    const { data } = await axios.delete(`/api/user/admin/review/${reviewId}`);
    dispatch({ type: DELETE_REVIEWS_REVIEWS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEWS_REVIEWS_FAIL,
      error: error.response.data.message,
    });
  }
};

export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

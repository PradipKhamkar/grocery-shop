import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  CLEAR_ERROR,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  LOAD_LOGIN_USER_REQUEST,
  LOAD_LOGIN_USER_SUCCESS,
  LOAD_LOGIN_USER_FAIL,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  USER_PASSWORD_UPDATE_REQUEST,
  USER_PASSWORD_UPDATE_SUCCESS,
  USER_PASSWORD_UPDATE_FAIL,
  SEND_PASSWORD_REST_EMAIL_REQUEST,
  SEND_PASSWORD_REST_EMAIL_SUCCESS,
  SEND_PASSWORD_REST_EMAIL_FAIL,
  USER_PASSWORD_REST_REQUEST,
  USER_PASSWORD_REST_SUCCESS,
  USER_PASSWORD_REST_FAIL,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  UPDATE_USER_ROLE_REQUEST,
  UPDATE_USER_ROLE_SUCCESS,
  UPDATE_USER_ROLE_FAIL,
} from "../Constants/userConstants";

export const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
      };
    case USER_REGISTER_SUCCESS:
      return {
        success: action.payload.success,
        loading: false,
      };
    case USER_REGISTER_FAIL:
      return {
        error: action.error,
        loading: false,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
    case LOAD_LOGIN_USER_REQUEST:
      return {
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
    case LOAD_LOGIN_USER_SUCCESS:
      return {
        user: action.payload.user,
        success: action.payload.success,
        loading: false,
        isAuthUser: action.payload.success,
      };
    case USER_LOGIN_FAIL:
    case LOAD_LOGIN_USER_FAIL:
      return {
        error: action.error,
        loading: false,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

//Get All Users
export const getAllUserAdminReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case GET_ALL_USERS_REQUEST:
      return { loading: true };
    case GET_ALL_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload.AllUsers,
        success: action.payload.success,
        usersCount: action.payload.userDocCount,
      };
    case GET_ALL_USERS_FAIL:
      return {
        loading: false,
        error: action.error,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const deleteUserAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return { loading: true };
    case DELETE_USER_SUCCESS:
      return {
        loading: false,
        DeletedUser: action.payload.DeletedUser,
        success: action.payload.success,
        message: action.payload.message,
      };
    case DELETE_USER_FAIL:
      return {
        loading: false,
        error: action.error,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// //Load User Reducer
// export const loadUserReducer = (state = {}, action) => {
//   switch (action.type) {
//     case LOAD_LOGIN_USER_REQUEST:
//       return {
//         loading: true,
//       };

//     case LOAD_LOGIN_USER_SUCCESS:
//       return {
//         user: action.payload,
//         loading: false,
//         success: action.success,
//       };

//     case LOAD_LOGIN_USER_FAIL:
//       return {
//         loading: false,
//         error: action.error,
//       };
//     default:
//       return state;
//   }
// };

export const userPasswordUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PASSWORD_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case USER_PASSWORD_UPDATE_SUCCESS:
      return {
        loading: false,
        message: action.payload.message,
        success: action.payload.success,
      };
    case USER_PASSWORD_UPDATE_FAIL:
      return {
        loading: false,
        error: action.error,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const logOutUser = (state = {}, action) => {
  switch (action.type) {
    case LOGOUT_USER_REQUEST:
      return {
        loading: true,
      };
    case LOGOUT_USER_SUCCESS:
      return {
        loading: false,
        message: action.payload.message,
        success: action.payload.success,
      };
    case LOGOUT_USER_FAIL:
      return {
        loading: false,
        error: action.error,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const passwordResetEmailSendReducer = (state = {}, action) => {
  switch (action.type) {
    case SEND_PASSWORD_REST_EMAIL_REQUEST:
      return {
        loading: true,
      };
    case SEND_PASSWORD_REST_EMAIL_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        message: action.payload.message,
      };
    case SEND_PASSWORD_REST_EMAIL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const userPasswordResetReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PASSWORD_REST_REQUEST:
      return {
        loading: true,
      };
    case USER_PASSWORD_REST_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        message: action.payload.message,
      };
    case USER_PASSWORD_REST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const updateUserRoleReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_ROLE_REQUEST:
      return {
        loading: true,
      };
    case UPDATE_USER_ROLE_SUCCESS:
      return {
        loading: false,
        updatedUser: action.payload.isUserExit,
        success: action.payload.success,
        message: action.payload.message,
      };

    case UPDATE_USER_ROLE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_DETAILS,
  UPDATE_USER_INFO, GET_POST_AUTHOR
  // LIKE_POST,
  // UNLIKE_POST
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: true,
  user: null,
  user_details: null,
  likes: [],
  post_author: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
    case GET_POST_AUTHOR:
      return {
        ...state,
        post_author : action.payload
      }
    case USER_DETAILS:
      return {
        ...state,
        user_details: action.payload
      }
    case UPDATE_USER_INFO:
      return {
        ...state,
        user: action.payload,
        user_details: action.payload
      }
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        user_details: null,
        user_posts : []
      };
    default:
      return state;
  }
}

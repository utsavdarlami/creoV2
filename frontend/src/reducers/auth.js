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
  UPDATE_USER_INFO, GET_POST_AUTHOR, GET_AUTHOR_DETAILS,
  SEARCH_USER,
  SEARCH_POST,
    LOADER,
  // LIKE_POST,
  // UNLIKE_POST
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: true,
  userLoading : true,
  user: null,
  user_details: null,
  likes: [],
  post_author: null,
  author_details: null,
  search_user: [],
  search_post: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case LOADER:
      return {
        ...state,
        userLoading : true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        isLoading: false,
        //userLoading : false,
      };
    case GET_POST_AUTHOR:
      return {
        ...state,
        post_author : action.payload
      }
    // case GET_COMMENT_AUTHOR: 
    // return {
    //   ...state,
    //   comment_author : action.payload
    // }
    case USER_DETAILS:
      return {
        ...state,
        user_details: action.payload,
        //isLoading: false,
        userLoading : false,
      }
    case GET_AUTHOR_DETAILS:
      return {
        ...state,
        author_details: action.payload,
        userLoading : false,
        //isLoading: false,
      }
    case UPDATE_USER_INFO:
      return {
        ...state,
        user: action.payload,
        user_details: action.payload,
        userLoading : false,
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
        userLoading : false,
        isLoading: false,
        user_details: null,
        author_details: null
      };
    case SEARCH_USER:
        //console.log(action.payload)
        return {
            ...state,
            search_user : action.payload
        };
    case SEARCH_POST:
        //console.log(action.payload)
        return {
            ...state,
            search_post: action.payload
        };
    default:
      return state;
  }
}

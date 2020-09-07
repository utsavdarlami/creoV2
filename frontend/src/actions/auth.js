import axios from 'axios';

import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './types';

const back_api = "http://127.0.0.1:8000"
// CHECK TOKEN & LOAD USER
// CHANGE API LINK from "/api/auth/user" to /api/profile"
export const loadUser = () => (dispatch, getState) => {
  // USER loading
  dispatch({ type: USER_LOADING });
  axios
    .get(`${back_api}/api/auth/user`, tokenConfig(getState))
    .then(res => {
      console.log(res)
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: AUTH_ERROR,
      });
    });
};


// LOGIN USER
export const login = (username, password) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ username, password });

  axios
    .post(`${back_api}/api/auth/login`, body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// REGISTER USER
export const register = ({
  first_name,
  last_name,
  username,
  password,
  email,
  gender,
}) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    user: { first_name, last_name, username, email, password },
    gender,
  });

  axios
    .post(`${back_api}/api/auth/register`, body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: REGISTER_FAIL,
      });
      console.log(err);
    });
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  axios
    .post(`${back_api}/api/auth/logout`, null, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch(err => {
      // put some error here pachi
      console.log(err);
    });
};

// Setup config with token - helper function
export const tokenConfig = getState => {
  // Get token from state
  const {token} = getState().auth;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  return config;
};

export const tokenConfig2 = getState => {
  // Get token from state
  const {token} = getState().auth;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  return config;
};

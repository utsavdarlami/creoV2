import axios from 'axios';
import { tokenConfig, tokenConfig2 } from './auth';

import {
  // GET_SINGLE_POST,
  ADD_POST,
  DELETE_POST,
  GET_ALL_POSTS,
  POST_UPLOAD_FAIL,
  LIKE_POST,
  UNLIKE_POST,
  GET_LIKED_CONTENT,
  GET_USER_POST
} from './types';

const back_api = "http://127.0.0.1:8000"
// GET ALL POSTS
export const getPosts = () => dispatch => {
  axios
    .get(`${back_api}/api/allposts/`)
    .then(res => {
      dispatch({
        type: GET_ALL_POSTS,
        payload: res.data,
      });
    })
    .catch(err => console.log(err));
};

// //GET SINGLE POST
// export const getSinglePost = (id) => dispatch => {
//     axios.get(`api/allposts/${id}`)
//     .then (res => {
//         dispatch({
//             type: GET_SINGLE_POST,
//             payload: res.data
//         });
//     }).catch(
//         err => console.log(err));
// };

// GET POST UPLOADED BY USER
export const getUserPost = () => (dispatch, getState) => {
  axios
    .get(`${back_api}/api/posts/`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_USER_POST,
        payload: res.data,
      });
    })
    .catch(err => console.log(err));
};

// Get post liked by user
export const getLikedContent = () => (dispatch, getState) => {
  axios
    .get(`${back_api}/api/like`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_LIKED_CONTENT,
        payload: res.data,
      });
    })
    .catch(err => console.log(err));
};

// ADD POST
export const addPost = post => (dispatch, getState) => {
  axios
    .post(`${back_api}/api/posts/`, post, tokenConfig2(getState))
    .then(res => {
      dispatch({
        type: ADD_POST,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: POST_UPLOAD_FAIL,
      });
      console.log(err);
    });
};

// DELETE POST
export const deletePost = id => (dispatch, getState) => {
  axios
    .delete(`${back_api}/api/posts/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: DELETE_POST,
        payload: id,
      });
    })
    .catch(err => console.log(err));
};

// LIKE POST
export const likePost = post_id => (dispatch, getState) => {
  const body = JSON.stringify({ post_id });
  axios
    .post(`${back_api}/api/like/`, body, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: LIKE_POST,
        payload: res.data,
      });
    })
    .catch(err => console.log(err));
};

// UNLIKE POST
export const unlikePost = id => (dispatch, getState) => {
  axios
    .delete(`${back_api}/api/like/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: UNLIKE_POST,
        payload: res.data,
      });
    })
    .catch(err => console.log(err));
};

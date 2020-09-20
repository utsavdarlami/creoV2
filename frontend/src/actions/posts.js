import axios from 'axios';
import {createMessage,returnErrors} from './messages';
import { tokenConfig, tokenConfig2 } from './auth';

import {
  ADD_POST,
  DELETE_POST,
  GET_ALL_POSTS,
  POST_UPLOAD_FAIL,
  LIKE_POST,
  UNLIKE_POST,
  GET_LIKED_CONTENT,
  GET_USER_POST,
  HAS_USER_LIKED,
  SAVE_POST,
  UNSAVE_POST,
  HAS_USER_SAVED,
  GET_SAVED_CONTENT, 
  ADD_COMMENT, 
  ADD_COMMENT_FAIL, 
  GET_COMMENTS,
  GET_AUTHOR_POST,
  GET_SINGLE_POST, VIEW_COUNT
} from './types';

const back_api = "http://127.0.0.1:8000";

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
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

//GET SINGLE POST
export const getSinglePost = (id) => dispatch => {
    axios.get(`${back_api}/api/allposts/${id}`)
        .then(res => {
            dispatch({
                type: GET_SINGLE_POST,
                payload: res.data,
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

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
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

//GET POST UPLOADED BY AUTHOR
export const getAuthorPost = (id) => (dispatch, getState) => {
    axios.get(`${back_api}/api/users_post/${id}`, tokenConfig(getState))
        .then(res => {
            //console.log(res.data)
            dispatch({
                type: GET_AUTHOR_POST,
                payload: res.data,
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

// ADD POST
export const addPost = post => (dispatch, getState) => {
    axios
        .post(`${back_api}/api/posts/`, post, tokenConfig2(getState))
        .then(res => {
            dispatch(createMessage({AddPost:'Post Added'}));
            dispatch({
                type: ADD_POST,
                payload: res.data,
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: POST_UPLOAD_FAIL,
            });
            //console.log(err);
        });
};

//ADD COMMENT 
export const addComment = ({ post_id, comment }) => (dispatch, getState) => {
    const body = JSON.stringify({post_id, comment})
    axios.post(`${back_api}/api/comment/`, body, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: ADD_COMMENT,
                payload: res.data,
            });
            dispatch(getComments(post_id));
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: ADD_COMMENT_FAIL
            });
        })
}

export const getComments = (id) => (dispatch, getState) => {
    axios.get(`${back_api}/api/comments_on_post/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_COMMENTS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        })
};

// DELETE POST
export const deletePost = (id) => (dispatch, getState) => {
    axios
        .delete(`${back_api}/api/posts/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch(createMessage({DeletePost:'Post Deleted'}));
            dispatch({
                type: DELETE_POST,
                payload: id,
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            //dispatch({
                //type: DELETE_POST_FAIL 
            //});
        })
};

// LIKE POST
export const likePost = post_id => (dispatch, getState) => {
    const body = JSON.stringify({ post_id });
    axios
        .post(`${back_api}/api/like/`, body, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: LIKE_POST,
                payload: res.data.post
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            //dispatch({
                //type: DELETE_POST_FAIL 
            //});
        })
};

// UNLIKE POST
export const unlikePost = id => (dispatch, getState) => {
    axios
        .delete(`${back_api}/api/like/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: UNLIKE_POST,
                payload: id
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            //dispatch({
                //type: DELETE_POST_FAIL 
            //});
        })
        //.catch(err => console.log(err));
};

//Check whether user has liked post or not
export const checkLike = id => (dispatch, getState) => {
    axios.get(`${back_api}/api/like/${id}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: HAS_USER_LIKED,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            //dispatch({
                //type: DELETE_POST_FAIL 
            //});
        })
}

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
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            //dispatch({
                //type: DELETE_POST_FAIL 
            //});
        })
        //.catch(err => console.log(err));
};


//SAVE POST
export const savePost = post_id => (dispatch, getState) => {
    const body = JSON.stringify({ post_id });
    axios.post(`${back_api}/api/save/`, body, tokenConfig(getState))
        .then(res =>{
            dispatch(createMessage({Saved:'Post Saved'}));
            dispatch({
                type: SAVE_POST,
                payload: res.data.post
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            //dispatch({
                //type: DELETE_POST_FAIL 
            //});
        })
        //.catch(err => console.log(err));
}

//UNSAVE POST
export const unsavePost = id => (dispatch, getState) => {
    axios.delete(`${back_api}/api/save/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({Unsaved:'Post Unsaved'}));
            dispatch({
                type: UNSAVE_POST,
                payload: id
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            //dispatch({
                //type: DELETE_POST_FAIL 
            //});
        })
        //.catch(err => console.log(err))
}

//Check whether user has saved post or not
export const checkSave = id => (dispatch, getState) => {
    axios.get(`${back_api}/api/save/${id}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: HAS_USER_SAVED,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            //dispatch({
                //type: DELETE_POST_FAIL 
            //});
        })
}

//Get post saved by user
export const getSavedContent = () => (dispatch, getState) => {
    axios.get(`${back_api}/api/save`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_SAVED_CONTENT,
                payload: res.data,
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            //dispatch({
                //type: DELETE_POST_FAIL 
            //});
        })
        //.catch(err => console.log(err));
}

export const increase_viewcount = id => (dispatch, getState) => {
  axios.get(`${back_api}/api/add_viewcount_post/${id}`)
  .then(res => {
    dispatch({
      type: VIEW_COUNT,
      payload: id,
    });
  })
  .catch(err => {
    console.log(err);
  });
};




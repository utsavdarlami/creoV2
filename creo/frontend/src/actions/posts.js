import axios from "axios";
import { tokenConfig, tokenConfig2 } from "./auth";

import {GET_POSTS, ADD_POST, DELETE_POST, GET_ALL_POSTS, POST_UPLOAD_FAIL} from "./types"

//GET ALL POSTS
export const getPosts = () => dispatch => {
    axios.get("api/allposts/")
    .then (res => {
        dispatch({
            type: GET_ALL_POSTS,
            payload: res.data
        });
    }).catch(
        err => console.log(err));
};

//GET A POST
export const getaPost = () => (dispatch, getState) => {
    axios.get("/api/posts/", tokenConfig(getState))
    .then(res => {
        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
    }).catch(err => console.log(err));
};

//ADD POST
export const addPost = (post) => (dispatch, getState) => {
    axios.post("/api/posts/", post, tokenConfig2(getState))
    .then (res => {
        dispatch({
            type: ADD_POST,
            payload: res.data
        });
    }).catch(err => {
        dispatch({
            type: POST_UPLOAD_FAIL
        })
    console.log(err)});
};

//DELETE POST
export const deletePost = (id) => (dispatch, getState) => {
    axios.delete(`/api/posts/${id}`, tokenConfig(getState))
    .then(res => {
        dispatch({
            type:DELETE_POST,
            payload: id
        });
    }).catch(err => console.log(err));
};
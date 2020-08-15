import axios from "axios";

import {GET_POSTS} from "./types"

//GET POSTS
export const getPosts = () => dispatch => {
    axios.get("api/allposts/")
    .then (res => {
        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
    }).catch(err => console.log(err));
};
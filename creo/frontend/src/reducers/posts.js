import { GET_POSTS, ADD_POST, GET_ALL_POSTS, POST_UPLOAD_FAIL, GET_SINGLE_POST} from "../actions/types.js";

const initialState = {
    posts: []
}

export default function(state = initialState, action) {
    switch(action.type){
        case GET_ALL_POSTS:
        case GET_POSTS:
        // case GET_SINGLE_POST:
            return {
                ...state,
                posts: action.payload
            };
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload]
            }
        case POST_UPLOAD_FAIL:
            console.log("post failed lol")
            default:
                return state;
    }
}
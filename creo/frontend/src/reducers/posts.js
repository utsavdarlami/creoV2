import { GET_POSTS} from "../actions/types.js";

const initialState = {
    posts: []
}

export default function(state = initialState, action) {
    switch(action.type){
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload
            };
            default:
                return state;
    }
}
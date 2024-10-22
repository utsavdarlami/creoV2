import {
    ADD_POST,
    GET_ALL_POSTS,
    POST_UPLOAD_FAIL,
    // GET_SINGLE_POST,
    LIKE_POST,
    UNLIKE_POST,
    GET_USER_POST,
    DELETE_POST,
    GET_LIKED_CONTENT,
    HAS_USER_LIKED,
    SAVE_POST,
    UNSAVE_POST,
    GET_SAVED_CONTENT,
    HAS_USER_SAVED, ADD_COMMENT, GET_COMMENTS,
    GET_AUTHOR_POST, GET_SINGLE_POST, VIEW_COUNT, LIKE_FAIL,
    DELETE_COMMENT,
    LOGOUT_SUCCESS,
    POST_LOADING
} from '../actions/types.js';

const initialState = {
    posts: [],
    isLoading: true,
    user_posts: [],
    liked_posts: [],
    check_liked: [],
    saved_posts: [],
    check_saved: null,
    is_saved: false,
    liked: null,
    post_comments: [],
    author_posts: [],
    single_post : {},
};

export default function(state = initialState, action) {
    switch (action.type) {
        case POST_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case GET_ALL_POSTS:
            return {
                ...state,
                posts: action.payload,
                isLoading: false,
            };
        case GET_SINGLE_POST:
            return {
                ...state,
                single_post: action.payload,
                isLoading: false,
            }
        case GET_USER_POST:
            return {
                ...state,
                user_posts: action.payload,
                isLoading: false,
            }
        case GET_LIKED_CONTENT: 
            return {
                ...state,
                liked_posts: action.payload,
                isLoading: false,
            };
        case GET_SAVED_CONTENT:
            return {
                ...state,
                saved_posts: action.payload,
                isLoading: false,
            }
        case GET_AUTHOR_POST:
            return{
                ...state,
                author_posts: action.payload,
                isLoading: false,
            }
            // case GET_SINGLE_POST:
            // make one here
        case ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts],
                user_posts: [action.payload, ...state.user_posts]
            };
        case ADD_COMMENT:
            return {
                ...state,
                post_comments: [action.payload,...state.post_comments]
            }
        case DELETE_COMMENT:
            return {
                ...state,
                post_comments: state.post_comments.filter((post_comment) => post_comment.id !== action.payload),
            }
        case GET_COMMENTS:
            return {
                ...state,
                post_comments: action.payload
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter((post) => post.id !== action.payload),
                isLoading: false,
            }
        case POST_UPLOAD_FAIL:
            return {
                ...state,
            }
        case LIKE_POST:
            let index = state.posts.findIndex(post => post.id === action.payload.id);
            state.posts[index] = action.payload;
            state.single_post = action.payload;
            return {
                ...state,
                liked: true
            };
        case UNLIKE_POST:
            // let index_unlike = state.posts.findIndex(post => post.id === action.payload)
            // state.posts[index_unlike].like_count--;
            state.single_post.like_count--;
            return {
                ...state,
                liked: false
            };
        case VIEW_COUNT:
            state.single_post.view_count++;
            return{
                ...state,
            }
        case HAS_USER_LIKED:
            return {
                ...state,
                check_liked : action.payload
            }
        case SAVE_POST:
            let index3 = state.posts.findIndex(post => post.id === action.payload.id)
            state.posts[index3] = action.payload;
            return {
                ...state,
                is_saved: !state.is_saved
            }
        case UNSAVE_POST:
            return {
                ...state,
                is_saved: !state.is_saved
            }
        case HAS_USER_SAVED:
            return {
                ...state,
                check_saved: action.payload
            }
        case LIKE_FAIL:
            return {
                ...state,
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                check_liked: [],
                check_saved: []
            }
        default:
            return state;
    }
}

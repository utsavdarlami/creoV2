import {
  GET_POSTS,
  ADD_POST,
  GET_ALL_POSTS,
  POST_UPLOAD_FAIL,
  GET_SINGLE_POST,
  LIKE_POST,
  UNLIKE_POST,
  GET_LIKED_CONTENT,
} from '../actions/types.js';

const initialState = {
  posts: [],
  liked_posts: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POSTS:
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case GET_LIKED_CONTENT: {
      return {
        ...state,
        liked_posts: action.payload,
      };
    }
    // case GET_SINGLE_POST:
    // make one here
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case POST_UPLOAD_FAIL:
      console.log('post failed lol');
    default:
      return state;
    case LIKE_POST:
    case UNLIKE_POST:
      const index = state.posts.findIndex(post => post.id === action.payload.id);
      state.posts[index] = action.payload;
      return {
        ...state,
      };
  }
}

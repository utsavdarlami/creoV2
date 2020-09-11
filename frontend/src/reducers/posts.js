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
  HAS_USER_SAVED
} from '../actions/types.js';

const initialState = {
  posts: [],
  user_posts: [],
  liked_posts: [],
  check_liked: [],
  saved_posts: [],
  check_saved: [],
  is_saved: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case GET_USER_POST:
      return {
        ...state,
        user_posts: action.payload
      }
    case GET_LIKED_CONTENT: 
      return {
        ...state,
        liked_posts: action.payload,
      };
    case GET_SAVED_CONTENT:
      return {
        ...state,
        saved_posts: action.payload,
      }
    // case GET_SINGLE_POST:
    // make one here
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
        user_posts: [...state.user_posts, action.payload]
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload)
      }
    case POST_UPLOAD_FAIL:
      console.log('post failed lol');
      break;
    case LIKE_POST:
      let index = state.posts.findIndex(post => post.id === action.payload.id);
      state.posts[index] = action.payload;
      return {
        ...state,
        // liked: !state.liked
      };
      case UNLIKE_POST:
        let index2 = state.posts.findIndex(post => post.id === action.payload)
        state.posts[index2].like_count--;
      return {
        ...state,
        // liked: !state.liked
      };
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
    default:
      return state;
  }
}

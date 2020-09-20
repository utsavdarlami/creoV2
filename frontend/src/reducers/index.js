import { combineReducers } from 'redux';
import posts from './posts';
import auth from './auth';
import errors from './errors';
import messages from './messages';

export default combineReducers({
  posts,
  auth,
  messages,
  errors
});

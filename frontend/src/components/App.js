import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import { Provider } from 'react-redux';
import Navbar from './layout/Navbar';
import Home from './Home';
import SignUp from './user-access/SignUp';
import Login from './user-access/Login';
import Profile from './user-profile/Profile';
import EditProfile from "./user-profile/EditProfile"
import PostForm from './posts/PostForm';
import PrivateRoute from './common/PrivateRoute';

import store from '../store';
import { loadUser} from '../actions/auth';
import SinglePost from './posts/SinglePost';
import { getPosts } from '../actions/posts';
import PostedContent from './user-profile/PostedContent';
import LikedContent from './user-profile/LikedContent';
import SavedContent from './user-profile/SavedContent';
import AuthorDetails from "./author/AuthorDetails";

class App extends React.Component {
  /* do this after completing */
  componentDidMount() {
    store.dispatch(loadUser());
    store.dispatch(getPosts());
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Fragment>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/posts/:post_id" component={SinglePost} />
              <PrivateRoute exact path="/users/:author_id" component={AuthorDetails} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/editprofile" component={EditProfile} />
              <Route path="/profile/posted" component={PostedContent} />
              <Route path="/profile/liked" component={LikedContent} />
              <Route path="/profile/saved" component={SavedContent} />
              <PrivateRoute exact path="/submitpost" component={PostForm} />
            </Switch>
          </Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}
export default App;


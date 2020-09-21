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
import Photos from './posts/PostList/Photos';
import Videos from "./posts/PostList/Videos"
import Audios from "./posts/PostList/Audios"

//bootstrap
import { Container} from 'react-bootstrap';

// Alert 
import {Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Alerts from './layout/Alerts';
//ALERT OPTIONS
const alertOptions = {
    timeout : 3000,
    position : 'top center'
}

class App extends React.Component {
  /* do this after completing */
  componentDidMount() {
    store.dispatch(loadUser());
    store.dispatch(getPosts());
    //store.dispatch(getPosts("-view_count"));
    //store.dispatch(getPosts("-like_count"));
  }

  render() {
    return (
        <Provider store={store}>
            <AlertProvider template={AlertTemplate} {...alertOptions}>
                <BrowserRouter>
                    <Fragment>
                        <Navbar />
                        <Alerts />
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/signup" component={SignUp} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/photos" component={Photos} />
                            <Route exact path="/videos" component={Videos} />
                            <Route exact path="/audios" component={Audios} />
                            <Route exact path="/posts/:post_id" component={SinglePost} />
                            <PrivateRoute exact path="/users/:author_id" component={AuthorDetails} />
                            <PrivateRoute exact path="/profile" component={Profile} />
                            <PrivateRoute exact path="/editprofile" component={EditProfile} />
                            <PrivateRoute path="/profile/posted" component={PostedContent} />
                            <PrivateRoute path="/profile/liked" component={LikedContent} />
                            <PrivateRoute path="/profile/saved" component={SavedContent} />
                            <PrivateRoute exact path="/submitpost" component={PostForm} />
                        </Switch>
                    </Fragment>
                </BrowserRouter>
            </AlertProvider>
        </Provider>
    );
  }
}
export default App;


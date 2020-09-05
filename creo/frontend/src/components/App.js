import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";

import Navbar from "./layout/Navbar"
import Home from "./Home"
import SignUp from "./user-access/SignUp"
import Login from "./user-access/Login"
import Profile from "./user-profile/Profile";
import PostForm from "./posts/PostForm";
import PrivateRoute from "./common/PrivateRoute";

import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../actions/auth";
import SinglePost from "./posts/SinglePost";


class App extends React.Component{

    /* do this after completing */
    componentDidMount(){
        store.dispatch(loadUser());
    }

    render(){
        return(
            <Provider store={store}>
                <BrowserRouter>
                    <Fragment>
                        <Navbar />
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/signup" component={SignUp}/>
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/posts/:post_id" component={SinglePost} />
                            <PrivateRoute exact path="/profile" component={Profile} />
                            <PrivateRoute exact path="/submitpost" component={PostForm} />
                            <Redirect to="/" />
                        </Switch>
                    </Fragment>
                </BrowserRouter>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

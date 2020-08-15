import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";


import Navbar from "./layout/Navbar"
import Home from "./Home"
import SignUp from "./user-access/SignUp"
import Login from "./user-access/Login"
import Profile from "./user-profile/Profile";
import PostDashboard from "./posts/PostDashboard";
import PrivateRoute from "./common/PrivateRoute";

import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../actions/auth";

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
                            <PrivateRoute exact path="/profile" component={Profile} />
                            <PrivateRoute exact path="/posts" component={PostDashboard} />
                        </Switch>
                    </Fragment>
                </BrowserRouter>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

import React from "react"
import ReactDOM from "react-dom"
import {BrowserRouter, Route} from "react-router-dom"

import Navbar from "./Navbar"
import Home from "./Home"
import SignUp from "./SignUp"
import Login from "./Login"
import Profile from "./Profile"

class App extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <Navbar />
                <Route exact path="/" component={Home} />
                <Route path="/signup" component={SignUp}/>
                <Route path="/login" component={Login} />
                <Route path="/profile" component={Profile} />
            </BrowserRouter>

        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

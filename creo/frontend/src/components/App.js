import React from "react"
import ReactDOM from "react-dom"
import {BrowserRouter, Route} from "react-router-dom"

import Navbar from "./Navbar"
import Home from "./Home"
import SignUp from "./SignUp"
import Login from "./Login"

class App extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <Navbar />
                <Route exact path="/" component={Home} />
                <Route path="/signup" component={SignUp}/>
                <Route path="/login" component={Login} />
            </BrowserRouter>

        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
import React, { Component } from 'react'
import { Dropdown } from "react-bootstrap"
import {NavLink} from "react-router-dom";


export class AudiosDropDown extends Component {
    render() {
        return (
            <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
                Filter
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <div>
                    <NavLink to = "/most_liked_audios"  
                        style={{display: "block", 
                            textAlign: "center", marginBottom: "1%", 
                            color: "black", textDecoration: "none"}}
                        activeStyle={{fontWeight: "bold"}}><span className="dropdown-span">Most Liked</span></NavLink>
                </div>

                    <NavLink to = "/most_viewed_audios" style={{display: "block", textAlign: "center", color: "black", textDecoration: "none"}}
                    activeStyle={{fontWeight: "bold"}}><span className="dropdown-span">Most Viewed</span></NavLink>

 
                    <NavLink to="/audios" style={{display: "block", color: "black",textAlign: "center", textDecoration: "none"}}
                       activeStyle={{fontWeight: "bold"}}><span className="dropdown-span">Newest</span></NavLink>
            </Dropdown.Menu>
            </Dropdown>
        )
    }
}


export default AudiosDropDown;

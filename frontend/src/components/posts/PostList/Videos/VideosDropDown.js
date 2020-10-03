import React, { Component } from 'react'
import { Dropdown } from "react-bootstrap"
import {NavLink} from "react-router-dom"

export class VideosDropDown extends Component {
    render() {
        return (
            <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
                Filter
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <div>
                    <NavLink to = "/most_liked_videos"  
                    style={{color: "black", textDecoration: "none",display: "block",
                    textAlign: "center",marginBottom: "1%"}}
                        activeStyle={{fontWeight: "bold"}}><span className="dropdown-span">Most Liked</span></NavLink>
                </div>

                <div>
                    <NavLink to = "/most_viewed_videos" style={{color: "black", textDecoration: "none", display: "block",
                        textAlign: "center",marginBottom: "1%"}}
                    activeStyle={{fontWeight: "bold"}}><span className="dropdown-span">Most Viewed</span></NavLink>
                </div>

                <div>
                <NavLink to="/videos" 
                    style={{color: "black", textDecoration: "none", display: "block",
                    textAlign: "center",marginBottom: "1%"}}
                       activeStyle={{fontWeight: "bold"}}><span className="dropdown-span">Newest</span></NavLink>
                </div>
            </Dropdown.Menu>
            </Dropdown>
        )
    }
}

export default VideosDropDown;

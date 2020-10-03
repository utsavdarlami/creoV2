import React, { Component } from 'react'
import { Dropdown } from "react-bootstrap"
import {NavLink} from "react-router-dom"

export class PhotosDropDown extends Component {
    render() {
        return (
            <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
                Filter
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item>
                    <NavLink to = "/most_liked_photos"  style={{color: "black", textDecoration: "none"}}
                        activeStyle={{fontWeight: "bold"}}>Most Liked</NavLink>
                </Dropdown.Item>
                <Dropdown.Item>
                    <NavLink to = "/most_viewed_photos" style={{color: "black", textDecoration: "none"}}
                    activeStyle={{fontWeight: "bold"}}>Most Viewed</NavLink>
                </Dropdown.Item>
                <Dropdown.Item>
                    <NavLink to="/photos" style={{color: "black", textDecoration: "none"}}
                       activeStyle={{fontWeight: "bold"}}>Newest</NavLink>
                    </Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
        )
    }
}

export default PhotosDropDown;

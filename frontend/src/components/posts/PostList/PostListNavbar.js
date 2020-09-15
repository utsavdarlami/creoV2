import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';

class PostListNavbar extends Component {
    render() {
        return (
            <div className="postlist-navbar">
                <ul>
                    <li>
                        <NavLink to="/photos" 
                            activeStyle={{fontWeight: "bold"}}>
                                <span>Photos</span></NavLink>
                        </li>
                    <li><NavLink to="/videos" activeStyle={{fontWeight: "bold"}}>
                        <span>Videos</span></NavLink>
                    </li>
                    <li><NavLink to="/audios" activeStyle={{fontWeight: "bold"}}><span>Audios</span></NavLink></li>
                </ul>
            </div>
        )
    }
}

export default PostListNavbar;

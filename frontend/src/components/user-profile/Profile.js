import React, { Component, Fragment } from 'react';
import UserDetails from './UserDetails';
import PostedContent from './PostedContent';
import LikedContent from './LikedContent';
import { connect } from "react-redux";
// import EditProfile from './EditProfile';
import {NavLink} from 'react-router-dom';
import SavedContent from './SavedContent';
 
class Profile extends Component {
  render() {
    return (
      <Fragment>
        <UserDetails />
        <hr />
        <div>
          <ul>
            <li>Posted Content</li>
            <li>Liked Content</li>
            <li><NavLink to="/editprofile" >Edit Profile</NavLink></li>
          </ul>
        </div>
        <PostedContent />
        <hr />
        <LikedContent />
        <hr />
        <SavedContent />
      </Fragment>
    );
  }
}

export default connect(null)(Profile);

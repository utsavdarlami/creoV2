import React, { Component, Fragment } from 'react';
import UserDetails from './UserDetails';
import PostedContent from './PostedContent';
import LikedContent from './LikedContent';
import { connect } from "react-redux";
// import EditProfile from './EditProfile';
import {NavLink, Route} from 'react-router-dom';
import SavedContent from './SavedContent';
 
class Profile extends Component {
  render() {
    return (
      <Fragment>
        <div className="profile-page">
          <section className="profile-top">
            <UserDetails />
          </section>
          <div className="profile-content">
            <ul>
              <li><NavLink to="/profile/posted">Posted Content</NavLink></li>
              <li><NavLink to="/profile/liked">Liked Content</NavLink></li>
              <li><NavLink to="/editprofile">Edit Profile</NavLink></li>
              <li><NavLink to="/profile/saved">Saved Content</NavLink></li>
            </ul>
          </div>
        </div>


        <div>

        </div>
        {/* <PostedContent />
        <hr />
        <LikedContent />
        <hr />
        <SavedContent /> */}
      </Fragment>
    );
  }
}

export default connect(null)(Profile);

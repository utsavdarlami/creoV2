import React, { Component, Fragment } from 'react';
import UserDetails from './UserDetails';
// import LikedContent from './LikedContent';
import { connect } from "react-redux";
// import EditProfile from './EditProfile';
import {NavLink} from 'react-router-dom';
// import SavedContent from './SavedContent';
 
class Profile extends Component {
  render() {
    return (
      <Fragment>
        <div className="profile-page">
          <section className="profile-detail">
            <UserDetails />
          </section>
          <div className="profile-content">
            <ul className="profile-content-list">
              <li><NavLink to="/profile/posted">Posted Content</NavLink></li>
              <li><NavLink to="/profile/liked">Liked Content</NavLink></li>
              <li><NavLink to="/profile/saved">Saved Content</NavLink></li>
            </ul>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(null)(Profile);

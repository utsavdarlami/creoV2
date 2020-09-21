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
        <div className="profile-wrapper">
            <UserDetails />
          <div className="profile-row">
            <div className="profile-col-100">
              <div className="profile-container" id="profile-container">
                <div className="profile-item"><NavLink to="/profile/posted">Posted Content</NavLink></div>
                <div className="profile-item"><NavLink to="/profile/liked">Liked Content</NavLink></div>
                <div className="profile-item"><NavLink to="/profile/saved">Saved Content</NavLink></div>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(null)(Profile);

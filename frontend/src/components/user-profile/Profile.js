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
        <div className="profile-wrapper" style={{ marginTop: "2%"}}>
            <UserDetails />
            <hr />
          <div className="profile-row">
            <div className="profile-col-100">
              <div className="profile-container" id="profile-container">
                <div className="profile-item"><NavLink to="/profile/posted" style={{textDecoration: "none"}}><span>Posted</span></NavLink></div>
                <div className="profile-item"><NavLink to="/profile/liked" style={{textDecoration: "none"}}><span>Liked</span></NavLink></div>
                <div className="profile-item"><NavLink to="/profile/saved" style={{textDecoration: "none"}}><span>Saved</span></NavLink></div>
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

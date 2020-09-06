import React, { Component, Fragment } from 'react';
import UserDetails from './UserDetails';
import PostedContent from './PostedContent';
import LikedContent from './LikedContent';
import { connect } from "react-redux";

class Profile extends Component {
  render() {
    return (
      <Fragment>
        <UserDetails />
        <hr />
        <PostedContent />
        <hr />
        <LikedContent />
      </Fragment>
    );
  }
}

export default connect(null)(Profile);

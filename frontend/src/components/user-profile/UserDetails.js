import React, { Component } from 'react';
import PropTypes from "prop-types"
import { connect } from "react-redux";
import { userDetails } from "../../actions/auth";
import {NavLink} from 'react-router-dom';

class UserDetails extends Component { 
  static propTypes = {
    user_details: PropTypes.object,
    userDetails: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.userDetails();
}
  render() {
    const user = this.props.user_details ? 
    (
      <div className="details-body">
        <img src={this.props.user_details.profile_pic}
         alt="Profile display" className="profile-picture"/>
        <div className="user-details">
          <p>{this.props.user_details.user.first_name} {this.props.user_details.user.last_name}</p>
          <p>{this.props.user_details.bio}</p>

          <span>About</span>
          <div className="user-details-about">
            <section>
              <p>Username</p>
              <p>Name</p>
              <p>Email</p>
              <p>Profession</p>
              <p>Portfolio/Online Presence</p>
            </section>

            <section>
              <p>{this.props.user_details.user.username}</p>
              <p>{this.props.user_details.user.first_name} {this.props.user_details.user.last_name}</p>
              <p>{this.props.user_details.user.email}</p>
              <p>{this.props.user_details.bio}</p>
              <p>{this.props.user_details.portfolio_site}</p>
            </section>
          </div>
        </div>
        <div><NavLink to="/editprofile">Edit Profile</NavLink></div>
    </div>
    ) : (null)
    
    return (
      <div>
        {user}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user_details: state.auth.user_details
})

export default connect(mapStateToProps, {userDetails})(UserDetails);

import React, { Component } from 'react';
import PropTypes from "prop-types"
import { connect } from "react-redux";
import { userDetails } from "../../actions/auth";
import {NavLink} from 'react-router-dom';
import { Button } from "react-bootstrap";

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
      <div className="profile-row">
        <div className="profile-col-25">
          <span className="profile-avatar">
            <img src={this.props.user_details.profile_pic}
            alt="Profile display" className="profile-avatar"/>
          </span>
        </div>
        <div className="profile-col-75">
          <div className="profile-row">
            <div className="profile-col-75">
              <div className="profile-user-data">
                <p className="profile-user-label">@ {this.props.user_details.user.username}</p>
                <p className="profile-user-label"> Name: {this.props.user_details.user.first_name} {this.props.user_details.user.last_name}</p>
                <p className="profile-user-label">Email: {this.props.user_details.user.email}</p>
                <p className="profile-user-label">Profession: {this.props.user_details.bio}</p>
                <p className="profile-user-label">Portfolio/Online Presence: {this.props.user_details.portfolio_site}</p>
            </div>
            </div>
            <div className="profile-col-25">
            <NavLink to="/editprofile"><Button variant="primary" style={{width: "50%"}}> Edit Profile</Button></NavLink>
              {/* <div style={{ marginLeft: "1%", border: "1px solid black"}}><NavLink to="/editprofile">Edit Profile</NavLink></div> */}
            </div>
          </div>

        </div>
       
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

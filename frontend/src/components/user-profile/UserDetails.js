import React, { Component } from 'react';
import PropTypes from "prop-types"
import { connect } from "react-redux";
import { userDetails } from "../../actions/auth"

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
        <p>Name: {this.props.user_details.user.first_name} {this.props.user_details.user.last_name}</p>
        <p>Username: {this.props.user_details.user.username}</p>
        <p>Email: {this.props.user_details.user.email}</p>
        <p>Gender: {this.props.user_details.gender}</p>
        <p>Bio:{this.props.user_details.bio}</p>
        <p>Portfolio site: {this.props.user_details.portfolio_site}</p>
        <p>Resume: {this.props.user_details.resume}</p>
        <img src={this.props.user_details.profile_pic} alt="Profile display" />
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

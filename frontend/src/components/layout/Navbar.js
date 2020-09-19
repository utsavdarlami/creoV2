import React, { Component } from 'react';
import {NavLink, Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

class Navbar extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      // <ul className="nav-links">
      //   <li className="nav-item">
      //     <NavLink to="/profile" activeStyle={{fontWeight: "bold"}}>
      //       <span>Profile</span>
      //     </NavLink>
      //   </li>
      //   <li className="nav-item">
      //     <NavLink to="/submitpost" activeStyle={{fontWeight: "bold"}}>
      //       <span>Upload</span>
      //     </NavLink>
      //   </li>
      //   <li className="nav-item">
      //     {' '}
      //     <button onClick={this.props.logout} className="logout-button">
      //       Logout
      //     </button>
      //   </li>
      // </ul>

      <div >
        <ul className="nav navbar-nav ml-auto">
        <li className="nav-item mr-auto">
          <NavLink to="/submitpost" activeStyle={{fontWeight: "bold"}}>
            Upload
          </NavLink>
        </li>
        </ul>

        <ul className="nav navbar-nav">
        <li className="nav-item dropdown">
        <Link to="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Profile</Link>
          <div className="dropdown-menu dropdown-menu-right">
            <NavLink to="/profile" className="drop-item" >View Profile</NavLink>
            <NavLink to="/editprofile" className="drop-item">Edit Profile</NavLink>
            <button onClick = {this.props.logout} className="logout-button">Logout</button>
          </div>
        </li>
        </ul>
      </div>
      


    );

    const guestLinks = (
      // <ul className="nav-links">
      //   <li className="nav-item">
      //     <NavLink to="/login" activeStyle={{fontWeight: "bold"}}>
      //       <span>Sign in</span>
      //     </NavLink>
      //   </li>
      //   <li className="nav-item">
      //     <NavLink to="/signup"activeStyle={{fontWeight: "bold"}}>
      //       <span>Sign up</span>
      //     </NavLink>
      //   </li>
      // </ul>

      <ul className="nav navbar-nav ml-auto">
        <li className="nav-item mr-auto">
          <NavLink to="/login" activeStyle={{fontWeight: "bold"}}>
            Sign In
          </NavLink>
        </li>

        <li className="nav-item mr-auto">
          <NavLink to="/signup" activeStyle={{fontWeight: "bold"}}>
            Sign Up
          </NavLink>
        </li>
      </ul>
    );
    return (
      // <nav className="navbar">
      //   <ul className="nav-bar-home nav-links">
      //     <li className="nav-item">
      //       <NavLink to="/" style={{ textDecoration: 'none' }}>
      //         <span>Home</span>
      //       </NavLink>
      //     </li>
      //     <li className="nav-item">
      //         <NavLink to="/photos" 
      //         activeStyle={{fontWeight: "bold"}}><span>Photos</span></NavLink>
      //     </li>
      //     <li className="nav-item">
      //       <NavLink to="/videos" activeStyle={{fontWeight: "bold"}}><span>Videos</span></NavLink>
      //       </li>
      //     <li className="nav-item">
      //       <NavLink to="/audios" activeStyle={{fontWeight: "bold"}}><span>Audios</span></NavLink>
      //       </li>
      //   </ul>
      //   {isAuthenticated ? authLinks : guestLinks}
      // </nav>

      <div className="outer-wrap">
        {/* NavBar Starts Here  */}
        <div className="navbar-component">
          <nav className="navbar navbar-expand-md navbar-light bg-light">
            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div id="navbarCollapse" className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <li className="nav-item">
                  <NavLink to="/" style={{ textDecoration: "none"}}>
                    Home
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/photos" 
                    activeStyle={{fontWeight: "bold"}}>
                      Photos
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/videos" activeStyle={{fontWeight: "bold"}}>
                    Videos
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/audios" activeStyle={{fontWeight: "bold"}}>
                    Audios
                  </NavLink>
                </li>
              </ul>

              {isAuthenticated ? authLinks : guestLinks}
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);

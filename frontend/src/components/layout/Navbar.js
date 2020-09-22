// import React, { Component } from "react";
// import { NavLink, Link } from "react-router-dom";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";
// import { logout } from "../../actions/auth";
// import { Navbar as BNavbar, NavDropdown, Nav } from "react-bootstrap";

// class Navbar extends Component {
//   static propTypes = {
//     auth: PropTypes.object.isRequired,
//     logout: PropTypes.func.isRequired,
//   };

//   //componentDidMou

//   render() {
//     //const { isAuthenticated } = this.props.auth;

//     const authLinks = (
//       <Nav className="ml-auto">
//         <NavLink to="/submitpost" style={{ marginTop: "8px" }}>
//           Upload
//         </NavLink>
//         <Nav.Item>
//           <NavDropdown alignRight title="Profile" id="collasible-nav-dropdown">
//             <NavLink
//               to="/profile"
//               style={{
//                 display: "block",
//                 border: "1px solid black",
//                 padding: "0 15%",
//                 backgroundColor: "yellow",
//               }}
//             >
//               View Profile
//             </NavLink>
//             <NavLink
//               to="/editprofile"
//               style={{
//                 display: "block",
//                 border: "1px solid black",
//                 padding: "0 15%",
//                 backgroundColor: "yellow",
//               }}
//             >
//               Edit Profile
//             </NavLink>
//             <NavDropdown.Item onClick={this.props.logout}>
//               Logout
//             </NavDropdown.Item>
//           </NavDropdown>
//         </Nav.Item>
//       </Nav>
//     );

//     const guestLinks = (
//       <Nav
//         className="ml-auto"
//         style={{
//           border: "1px solid black",
//           width: "8%",
//           display: "flex",
//           justifyContent: "space-around",
//         }}
//       >
//         <NavLink to="/login">Sign In</NavLink>
//         <NavLink to="/signup">Sign Up</NavLink>
//       </Nav>
//     );
//     return (
//       <BNavbar expand="md" bg="light">
//         <BNavbar.Toggle aria-controls="basic-navbar-nav" />
//         <BNavbar.Collapse id="basic-navbar-nav">
//           <Nav
//             className="mr-auto"
//             style={{
//               width: "15%",
//               display: "flex",
//               justifyContent: "space-between",
//             }}
//           >
//             <NavLink to="/">Home</NavLink>
//             <NavLink to="/photos">Photos</NavLink>
//             <NavLink to="/videos">Videos</NavLink>
//             <NavLink to="/audios">Audio</NavLink>
//           </Nav>
//           {this.props.auth.isAuthenticated ? authLinks : guestLinks}
//         </BNavbar.Collapse>
//       </BNavbar>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   auth: state.auth,
// });

// export default connect(mapStateToProps, { logout })(Navbar);

//New NavBar Html
// import React, { Component } from 'react';
// import {NavLink, Link} from 'react-router-dom';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { logout } from '../../actions/auth';
// import { Container,Navbar as BNavbar,Button,NavDropdown,Nav,Dropdown} from 'react-bootstrap';

// class Navbar extends Component {
//     static propTypes = {
//         auth: PropTypes.object.isRequired,
//         logout: PropTypes.func.isRequired,
//     };

//     render() {
//         const { isAuthenticated } = this.props.auth;

//         const authLinks = (
//             <Nav className="ml-auto">
//                 <Nav.Link href="/submitpost">
//                     Upload
//                 </Nav.Link>
//                 <Nav.Item>
//                 <NavDropdown alignRight title="Profile" id="collasible-nav-dropdown">
//                     <NavDropdown.Item href="/profile">View Profile</NavDropdown.Item>
//                     <NavDropdown.Item href="/editprofile">Edit Profile</NavDropdown.Item>
//                     <NavDropdown.Item onClick= {this.props.logout}>Logout</NavDropdown.Item>
//                 </NavDropdown>
//                 </Nav.Item>
//             </Nav>
//         );

//         const guestLinks = (
//             <Nav className="ml-auto">
//                 <Nav.Link href="/login">
//                     Sign In
//                 </Nav.Link>
//                 <Nav.Link href="/signup">
//                     Sign Up
//                 </Nav.Link>
//             </Nav>
//         );
//         return (
//                 <BNavbar expand="md" bg="light">
//                     <BNavbar.Toggle aria-controls="basic-navbar-nav" />
//                     <BNavbar.Collapse id="basic-navbar-nav">
//                         <Nav className="mr-auto">
//                             <Nav.Link href="/">
//                                 Home
//                             </Nav.Link>
//                             <Nav.Link href="/photos">
//                                 Photos
//                             </Nav.Link>
//                             <Nav.Link href="/videos">
//                                 Videos
//                             </Nav.Link>
//                             <Nav.Link href="/audio">
//                                 Audio
//                             </Nav.Link>
//                         </Nav>
//                         {isAuthenticated ? authLinks : guestLinks}
//                     </BNavbar.Collapse>
//                 </BNavbar>
//         );
//     }
// }

// const mapStateToProps = state => ({
//     auth: state.auth,
// });

// export default connect(mapStateToProps, { logout })(Navbar);

///New Navar Codes from Gyanas
import React, { Component } from "react";
import { NavLink} from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import {
  Navbar as BNavbar, NavDropdown, Nav,
} from "react-bootstrap";

class Navbar extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <Nav className="ml-auto">
        <NavLink
          to="/submitpost"
          className="font-color"
          style={{ marginTop: "8px", paddingRight: "15px" }}
        >
          <span style={{color: "white"}}>Upload</span>
        </NavLink>
        <Nav.Item>
          <NavDropdown
            alignRight
            title="Profile"
            id="collasible-nav-dropdown"
            style={{
              color: "black",
              //   border: "2px solid red",
              backgroundColor: "rgb(248, 249, 252)",
            }}
            // style={{ border: "2px solid green" }}
          >
            <NavLink
              to="/profile"
              style={{
                display: "block",
                textAlign: "center",
                // margin: "auto",
                // width: "100%",
                // border: "3px solid green",
                // padding: "10px",
                // border: "1px solid black",
                // padding: "0 15%",
                // backgroundColor: "yellow",
              }}
            ><span style={{color: "black"}}>
                View Profile
            </span>
              
            </NavLink>
            <NavLink
              to="/editprofile"
              style={{
                display: "block",
                textAlign: "center",
                // border: "1px solid black",
                // padding: "0 15%",
                // backgroundColor: "yellow",
              }}
            ><span style={{color: "black"}}>
              Edit Profile
            </span>
            </NavLink>
            <NavDropdown.Item
              onClick={this.props.logout}
              style={{ textAlign: "center" }}
            >Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Nav.Item>
      </Nav>
    );

    const guestLinks = (
      <Nav className="ml-auto" style={{ width: "125px" }}>
        <NavLink
          to="/login"
          style={{ paddingRight: "15px" }}
          className="font-color"
        ><span style={{color: "white"}}>Sign In</span>
        </NavLink>
        <NavLink
          to="/signup"
          className="font-color"
          style={{ marginLeft: "2%" }}
        ><span style={{color: "white"}}>Sign Up</span>
        </NavLink>
      </Nav>
    );
    return (
      <BNavbar expand="md" bg="dark" style={{ display: "flex" }}>
        <BNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BNavbar.Collapse id="basic-navbar-nav">
          <Nav
            className="mr-auto"
            style={{
              flexBasis: "25%",
              justifyContent: "space-evenly",
              //   width: "15%",
              //   border: "2px solid red",
              //   display: "flex",
              //   justifyContent: "space-between",
            }}
          >
            <NavLink to="/" className="font-color" style={{textDecoration: "none"}}>
              <span style={{color: "white"}}>Home</span>
            </NavLink>
            <NavLink
              to="/photos"
              className="font-color"
              style={{ paddingLeft: "15px" }}
            >
              <span style={{color: "white"}}>Photos</span>
            </NavLink>
            <NavLink
              to="/videos"
              className="font-color"
              style={{ paddingLeft: "15px" }}
            >
              <span style={{color: "white"}}>Videos</span>
            </NavLink>
            <NavLink
              to="/audios"
              className="font-color"
              style={{ paddingLeft: "15px" }}
            >
              <span style={{color: "white"}}>Audios</span>
            </NavLink>
          </Nav>
          {isAuthenticated ? authLinks : guestLinks}
        </BNavbar.Collapse>
      </BNavbar>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);

///New Navar Codes from Gyanas
import React, { Component } from "react";
import { NavLink} from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout ,searchUser} from "../../actions/auth";
import {
  Navbar as BNavbar, NavDropdown, Nav,Form,FormControl,Button
} from "react-bootstrap";

class Navbar extends Component {

  constructor() {
    super();
    this.searchChange= this.searchChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
        search : "",
    }
  }
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  searchChange(event){
      this.setState({
          [event.target.name]: event.target.value,
      });
  }
  handleSubmit(event) {
    event.preventDefault();

    this.props.searchUser(this.state.search);
    //console.log(this.state.search)
    //console.log(this.props.auth.search_user)
    this.setState({
      search: "",
    });

    //setTimeout(() => {
      this.props.history.push("/search)");
    //}, 1000);

    //<SearchListView>
    
  }

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
          <Form inline>
            <FormControl value={this.state.search} name="search" onChange={this.searchChange} type="text" placeholder="Search creator" className="mr-sm-2" />
            <Button onClick={this.handleSubmit} variant="outline-success">Search</Button>
          </Form>
        </BNavbar.Collapse>
      </BNavbar>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout, searchUser})(Navbar);

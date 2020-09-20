import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/auth';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      password: '',
      confirmpassword: '',
      gender: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      first_name,
      last_name,
      username,
      password,
      email,
      confirmpassword,
      gender,
    } = this.state;
    //if (password !== confirmpassword) {
      //alert('Passwords do not match');
    //}
    //else {
      const confirm_password = confirmpassword;
      const newUser = {
        first_name,
        last_name,
        username,
        password,
        confirm_password,
        email,
        gender,
      };
      this.props.register(newUser);
    //}
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div className="access-form-display">
        <div className="access-lhs">
          <div className="access-text-block">
            <p>Discover Amazing</p>
            <p>Artists</p>
            <p>And</p>
            <p>Creators</p>
          </div>
        </div>
        <div className="access-rhs" style={{ margin: '5% 0' }}>
          <h1 style={{ color: 'grey' }}>Sign Up</h1>
          <form onSubmit={this.handleSubmit} className="access-form">
            <input
              type="text"
              value={this.state.first_name}
              placeholder="First Name"
              name="first_name"
              onChange={this.handleChange}
              required
              className="access-form-component2"
            />

            <input
              type="text"
              value={this.state.last_name}
              placeholder="Last Name"
              name="last_name"
              onChange={this.handleChange}
              required
              className="access-form-component2"
            />

            <input
              type="text"
              value={this.state.username}
              placeholder="Username"
              name="username"
              onChange={this.handleChange}
              required
              className="access-form-component"
            />

            <input
              type="email"
              value={this.state.email}
              placeholder="Email"
              name="email"
              onChange={this.handleChange}
              required
              className="access-form-component"
            />

            <input
              type="password"
              value={this.state.password}
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
              required
              className="access-form-component2"
            />

            <input
              type="password"
              value={this.state.confirmpassword}
              placeholder="Confirm Password"
              name="confirmpassword"
              onChange={this.handleChange}
              required
              className="access-form-component2"
            />

            <label style={{ width: '98%', margin: '3% 1%', fontSize: '120%' }}>
              Gender:
            </label>
            <div className="gender-form">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="M"
                  checked={this.state.gender === 'M'}
                  onChange={this.handleChange}
                />
                {' '}
                Male
              </label>

              <label>
                <input
                  type="radio"
                  name="gender"
                  value="F"
                  checked={this.state.gender === 'F'}
                  onChange={this.handleChange}
                />
                {' '}
                Female
              </label>

              <label>
                <input
                  type="radio"
                  name="gender"
                  value="O"
                  checked={this.state.gender === 'O'}
                  onChange={this.handleChange}
                />
                {' '}
                Other
              </label>
            </div>
            <button className="access-submit-button">Submit</button>
            <p>
              Already have an account?
              <Link to="/login">
                <span style={{ color: '#ea4c89' }}>Login</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(SignUp);

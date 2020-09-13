import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { userDetails, updateUserInfo } from "../../actions/auth";
import { withRouter } from "react-router-dom";


class EditProfile extends Component {
    constructor(){
        super();
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            gender: "",
            portfolio_site: "",
            bio: "",
            resume: null,
            profile_pic: null
        }
        this.handleChange = this.handleChange.bind(this);
        // this.handleFileChange = this.handleFileChange.bind(this);
        // this.handleImageChange = this.handleImageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static propTypes = {
        userDetails: PropTypes.func.isRequired,
        updateUserInfo: PropTypes.func.isRequired
    }

    mapUserDetailsToState = user_details => {
        console.log(user_details);
        this.setState({
            first_name: user_details.user.first_name ? user_details.user.first_name : "",
            last_name: user_details.user.last_name ? user_details.user.last_name: "",
            email: user_details.user.email ? user_details.user.email : "",
            gender: user_details.gender ? user_details.gender : "",
            portfolio_site: user_details.portfolio_site ? user_details.portfolio_site : "",
            bio: user_details.bio ? user_details.bio : "",
            // resume: user_details.resume ? user_details.resume : null,
            // profile_pic: user_details.profile_pic ? user_details.profile_pic : null   
        })
    }

    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value,
        });
      }

    //   handleFileChange(event) {
    //     this.setState({
    //       resume: event.target.files[0],
    //     });
    //   }

    //   handleImageChange(event) {
    //     this.setState({
    //       profile_pic: event.target.files[0],
    //     });
    //   }

      handleSubmit(event){
          event.preventDefault();
          const id = this.props.user_details.id;
        //   console.log(id);
          const { first_name, last_name, email} = this.state; 
          const {gender, portfolio_site, bio, resume, profile_pic} = this.state;
      
            // const form_data = new FormData();
            // form_data.append('id', id)
            // form_data.append('first_name', first_name)
            // form_data.append('last_name', last_name)
            // form_data.append('email', email)
            // form_data.append('gender', gender)
            // form_data.append('portfolio_site', portfolio_site)
            // form_data.append('bio', bio)
            // form_data.append('resume', resume)
            // form_data.append('profile_pic', profile_pic)

            // const new_user_info = form_data;


          const newUserInfo = {
            id,
            first_name,
            last_name,
            email,
            gender,
            portfolio_site,
            bio,
            resume,
            profile_pic
        }
        // const newUserInfo = {
        //     id, new_user_info
        // }
        this.props.updateUserInfo(newUserInfo);
        this.props.history.push("/profile")
      }

    componentDidMount(){
        this.props.userDetails();
        setTimeout(() => {
            const user_details  = this.props.user_details
            this.mapUserDetailsToState(user_details);
        }, 900);
        
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>First Name:</label>
                    <input 
                        type = "text"
                        value={this.state.first_name}
                        name="first_name"
                        onChange = {this.handleChange} />
                            
                    <label>Last Name:</label>
                    <input 
                        type = "text"
                        value={this.state.last_name}
                        name="last_name"
                        onChange = {this.handleChange} />

                    <label>Email:</label>
                    <input 
                        type = "email"
                        value={this.state.email}
                        name="email"
                        onChange = {this.handleChange} />
            
                    <label>Gender: </label>
                    <div>
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

                        <label>Portfolio site:</label>
                        <input 
                            type="url"
                            name="portfolio_site"
                            value={this.state.portfolio_site}
                            onChange={this.handleChange}
                            />

                        <label>Bio:</label>
                        <input 
                            type="text"
                            name="bio"
                            value={this.state.bio}
                            onChange = {this.handleChange}
                            />

                        {/* <label>Resume:</label> 
                        <input 
                            type = "file"
                            name="resume"
                            onChange = {this.handleFileChange}
                            />   */}

                        {/* <label>Profile picture:</label>  
                        <input 
                            type="file"
                            name="profile_pic"
                            onChange={this.handleImageChange}
                            />
                        <img src={this.state.profile_pic} /> */}
                    <button>Submit</button>

                </form>

                <h1>{this.state.first_name}</h1>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user_details: state.auth.user_details
});

export default 
connect(mapStateToProps, {userDetails, updateUserInfo})(withRouter(EditProfile));
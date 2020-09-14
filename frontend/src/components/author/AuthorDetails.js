import React, { Component } from 'react';
import { connect } from "react-redux";
import { getAuthorDetails } from "../../actions/auth";
import {withRouter} from "react-router-dom";

class AuthorDetails extends Component {

    componentDidMount(){
        const id = this.props.match.params.author_id;
        this.props.getAuthorDetails(id);
    }

    render() {
        const author = this.props.author_details ? 
        (
            <div className="details-body">
                <img src={this.props.author_details.profile_pic}
                alt="Profile display" style={{width: "300px", height: "auto", borderRadius: "50%"}} />
                <p>Name: {this.props.author_details.user.first_name} {this.props.author_details.user.last_name}</p>
                <p>Username: {this.props.author_details.user.username}</p>
                <p>Email: {this.props.author_details.user.email}</p>
                <p>Gender: {this.props.author_details.gender}</p>
                <p>Bio:{this.props.author_details.bio}</p>
                <p>Portfolio site: {this.props.author_details.portfolio_site}</p>
                <p>Resume: {this.props.author_details.resume}</p>   
            </div>
        ) : 
        (null)

        return (
            <div>
                {author}
            </div>
        )
}
}

const mapStateToProps = state => ({
    author_details: state.auth.author_details
})

export default connect(mapStateToProps, {getAuthorDetails})(withRouter(AuthorDetails));

import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { getAuthorDetails } from "../../actions/auth";
import {withRouter, Link} from "react-router-dom";
import { getAuthorPost } from '../../actions/posts';

class AuthorDetails extends Component {

    static propTypes = {
        author_posts: PropTypes.array.isRequired,
        getAuthorPost: PropTypes.func.isRequired,
        getAuthorDetails: PropTypes.func.isRequired
    }

    componentDidMount(){
        const id = this.props.match.params.author_id;
        this.props.getAuthorDetails(id);
        this.props.getAuthorPost(id);
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

        const author_content = <div className="post-contents2">
        {this.props.author_posts.map(post => (
          <div className="postContainer2" key={post.id}>
            <Link to={`/posts/${post.id}`}>
              <p>Id:{post.id}</p>
              <p>Title:{post.title}</p>
              <p>Description:{post.description}</p>
              <img className="post-image2" src={post.content} alt="content" />
            </Link>
          </div>
        ))}
      </div>

        return (
            <div>
                {author}
                {author_content}
            </div>
        )
}
}

const mapStateToProps = state => ({
    author_details: state.auth.author_details,
    author_posts: state.posts.author_posts
})

export default connect(mapStateToProps,
     {getAuthorDetails, getAuthorPost})(withRouter(AuthorDetails));

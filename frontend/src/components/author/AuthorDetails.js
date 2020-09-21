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
        const back_api =  "http://127.0.0.1:8000";
        const author = this.props.author_details ? 
        (
          <div className="oprofile-row">
            <div className="oprofile-col-60 oprofile-innercontainer">
              <div className="oprofile-innerrow">
                <div className="oprofile-user-name oprofile-col-100">
                  <h1> {this.props.author_details.user.first_name}  </h1>
                  <h1>{this.props.author_details.user.last_name}</h1>
                </div> 
              </div>
              <div className="oprofile-innerrow">
                <div className="oprofile-row">
                  <div className="oprofile-user-bio">
                    <p>{this.props.author_details.bio}</p>
                  </div>
                </div>
              </div>
              <div className="oprofile-innerrow">
                <div className="oprofile-user-info">
                  <h2>General Info</h2>
                  <ul> 
                    <li><span>Username: </span>{this.props.author_details.user.username}</li>
                    <li><span>E-mail: </span>{this.props.author_details.user.email}</li>
                    <li><span>Gender: </span>{this.props.author_details.gender}</li>
                    <li><span><a href="{this.props.author_details.portfolio_site}">Visit my porftolio <i class="fas fa-link"></i></a></span></li>
                    <li><span><a href="{this.props.author_details.resume}">View my resume <i class="fas fa-link"></i></a></span></li>
                  </ul>
                </div>
              </div>
              </div>
              <div className="oprofile-col-40">
                <div className="oprofile-user-image">
                  <div className="oprofile-avatar">
                    <img src={this.props.author_details.profile_pic} alt="Profile display"  />
                  </div>
                </div>
              </div>
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
              <img className="post-image2" src={`${back_api}${post.content}`} alt="content" />
            </Link>
          </div>
        ))}
      </div>

        return (
            <div className="oprofile-wrapper">
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

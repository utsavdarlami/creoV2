import React, { Component, Fragment} from 'react';
import UserDetails from './UserDetails';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getUserPost } from '../../actions/posts';


class PostedContent extends Component {
  static propTypes = {
    user_posts: PropTypes.array.isRequired,
    getUserPost: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getUserPost();
  }

  render() {
    const posted_content =  <div className="post-contents">
    {this.props.user_posts.map(post => (
      <div className="postContainer" key={post.id}>
        <Link to={`/posts/${post.id}`}>
          <p>Id:{post.id}</p>
          <p>Title:{post.title}</p>
          <p>Description:{post.description}</p>
          <img className="post-image" src={post.content} alt="content" />
        </Link>
      </div>
    ))}
  </div>
    return (
      <Fragment>
        <div className="profile-page">
          <section className="profile-detail">
            <UserDetails />
          </section>
          <div className="profile-content">
            <ul className="profile-content-list">
              <li><NavLink to="/profile/posted">Posted Content</NavLink></li>
              <li><NavLink to="/profile/liked">Liked Content</NavLink></li>
              <li><NavLink to="/profile/saved">Saved Content</NavLink></li>
            </ul>
            {posted_content}
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user_posts: state.posts.user_posts,
});

export default connect(mapStateToProps, { getUserPost })(PostedContent);

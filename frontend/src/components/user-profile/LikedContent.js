import React, { Component, Fragment} from 'react';
import UserDetails from './UserDetails';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLikedContent } from '../../actions/posts';

class LikedContent extends Component {
  static propTypes = {
    liked_posts: PropTypes.array.isRequired,
    getLikedContent: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getLikedContent();
  }

  render() {
    const liked_content = 
      (
        <div className="post-contents">
          {this.props.liked_posts.map(liked_post => (
            <div className="postContainer" key={liked_post.post.id}>
              <p>Id:{liked_post.post.id}</p>
              <p>Title:{liked_post.post.title}</p>
              <p>Description:{liked_post.post.description}</p>
              <img className="post-image" src={liked_post.post.content} alt="content" />
            </div>
          ))}
        </div>
      )

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
            {liked_content}
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  liked_posts: state.posts.liked_posts,
});

export default connect(mapStateToProps, { getLikedContent })(LikedContent);

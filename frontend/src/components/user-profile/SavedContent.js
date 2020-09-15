import React, { Component, Fragment} from 'react';
import UserDetails from './UserDetails';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSavedContent } from '../../actions/posts';

class LikedContent extends Component {
  static propTypes = {
    saved_posts: PropTypes.array.isRequired,
    getSavedContent: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getSavedContent();
  }

  render() {
    const saved_content = 
    (
      <div className="post-contents">
      {this.props.saved_posts.map(saved_post => (
        <div className="postContainer" key={saved_post.post.id}>
          <p>Id:{saved_post.post.id}</p>
          <p>Title:{saved_post.post.title}</p>
          <p>Description:{saved_post.post.description}</p>
          <img className="post-image" src={saved_post.post.content} alt="content" />
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
            {saved_content}
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  saved_posts: state.posts.saved_posts
});

export default connect(mapStateToProps, { getSavedContent })(LikedContent);

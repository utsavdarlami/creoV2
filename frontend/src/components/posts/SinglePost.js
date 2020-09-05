import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSinglePost, likePost, unlikePost } from '../../actions/posts';

class SinglePost extends Component {
  constructor() {
    super();
    this.handleLike = this.handleLike.bind(this);
    this.handleUnlike = this.handleUnlike.bind(this);
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
  };

  handleLike() {
    this.props.likePost(this.props.post.id);
  }

  handleUnlike() {
    this.props.unlikePost(this.props.post.id);
  }

  render() {
    const { id, title, description, content, like_count } = this.props.post;
    const post = this.props.post ? (
      <div className="post-contents2">
        <div className="postContainer2">
          <p>
Id:
            {id}
          </p>
          <p>
Title:
            {title}
          </p>
          <p>
Description:
            {description}
          </p>
          <img className="post-image" src={content} />
        </div>
      </div>
    ) : (
      <div>
        <p>Loading post...</p>
      </div>
    );

    return (
      <div>
        {post}
        <p>
          {like_count}
          {' '}
likes
        </p>
        <button onClick={this.handleLike}>Like</button>
        <button onClick={this.handleUnlike}>Unlike</button>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  state.auth.isAuthenticated;
  const id = ownProps.match.params.post_id;
  return {
    post: state.posts.posts.find(post => post.id == id),
  };
};

export default connect(mapStateToProps, { likePost, unlikePost })(SinglePost);

import React, { Component} from 'react';
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
    return (
      <div>
        <h3>Content saved by you!</h3>
        <div className="post-contents">
          {this.props.saved_posts.map(saved_post => (
            <div className="postContainer" key={saved_post.post.id}>
              <p>
Id:
                {saved_post.post.id}
              </p>
              <p>
Title:
                {saved_post.post.title}
              </p>
              <p>
Description:
                {saved_post.post.description}
              </p>
              <img className="post-image" src={saved_post.post.content} alt="content" />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  saved_posts: state.posts.saved_posts
});

export default connect(mapStateToProps, { getSavedContent })(LikedContent);

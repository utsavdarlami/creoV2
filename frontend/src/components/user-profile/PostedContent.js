import React, { Component} from 'react';
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
    return (
      <div>
        <h3>Content posted by you!</h3>
        <div className="post-contents">
          {this.props.user_posts.map(post => (
            <div className="postContainer" key={post.id}>
              <Link to={`/posts/${post.id}`}>
                <p>
Id:
                  {post.id}
                </p>
                <p>
Title:
                  {post.title}
                </p>
                <p>
Description:
                  {post.description}
                </p>
                <img className="post-image" src={post.content} alt="content" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user_posts: state.posts.user_posts,
});

export default connect(mapStateToProps, { getUserPost })(PostedContent);

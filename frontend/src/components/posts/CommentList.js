import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getComments, deleteComment } from "../../actions/posts";
import { loadUser } from "../../actions/auth";
import { withRouter } from "react-router-dom";
// import CommentAuthor from './CommentAuthor';
//bootstrap
import { Button } from "react-bootstrap";

class CommentList extends Component {
  constructor() {
    super();
    this.handleCommentDelete = this.handleCommentDelete.bind(this);
  }

  static propTypes = {
    getComments: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const id = this.props.match.params.post_id;
    this.props.getComments(id);
    //this.props.loadUser();
  }

  handleCommentDelete(comment_id) {
    //console.log(`Delete Comment Called ${comment_id} ${user_id}`);
    this.props.deleteComment(this.props.match.params.post_id, comment_id);
  }

  render() {
    return (
      <div>
        <p style={{ paddingLeft: "10px", fontSize: "20px" }}>
          Responses:{" "}
          <i className="far fa-comments" style={{ fontSize: "25px" }}></i>
        </p>
        {this.props.post_comments.length !== 0 ? (
          <div>
            {this.props.post_comments.map((post_comment) => (
              <div key={post_comment.id} style={{ padding: "0 10px" }}>
                <div>{post_comment.publisher.username}</div>
                <p style={{ display: "flex" }}>
                  {post_comment.comment}
                  {post_comment.publisher.id === this.props.authId ? (
                    <Button
                      onClick={() => this.handleCommentDelete(post_comment.id)}
                      variant="outline-danger"
                      size="sm"
                      style={{ width: "100px", marginLeft: "auto" }}
                    >
                      Delete
                    </Button>
                  ) : null}
                </p>
                <hr />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  post_comments: state.posts.post_comments,
  //auth_id : state.auth.user.id
});

export default connect(mapStateToProps, { getComments, deleteComment })(
  withRouter(CommentList)
);

import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Post extends Component {
    static propTypes = {
        post: PropTypes.object.isRequired
    }
    render() {
        const post = this.props.post
        return (
                <div className="postContainer" key={post.id}>
                    <Link to={`/posts/${post.id}`}>
                        <img className="post-image" src = {post.content} />
                        <p>Title: {post.title}</p>
                    </Link>
                </div>
        )
    }
}

export default connect()(Post);

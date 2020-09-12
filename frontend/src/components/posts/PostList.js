import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";


class PostList extends Component {
    static propTypes = {
        posts: PropTypes.array.isRequired,
    }

    render() {
        // const likeorderedPosts = this.props.posts.slice().sort((a,b) => a.like_count < b.like_count)
        return (
            <div className="post-contents2">
                {this.props.posts.map(post => (
                <div className="postContainer2" key={post.id}>
                    <p>Id: {post.id}</p>
                    <p>Title: {post.title}</p>
                    <p>Description: {post.description}</p>
                    <Link to={`posts/${post.id}`}>
                    <img className="post-image2" src={post.content} alt="content" />
                    </Link>    
            </div>
                ))}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts.posts
});

export default connect(mapStateToProps)(PostList);

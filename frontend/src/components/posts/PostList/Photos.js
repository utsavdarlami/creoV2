import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import PostListNavbar from "./PostListNavbar";


class Photos extends Component {
    static propTypes = {
        posts: PropTypes.array.isRequired,
    }
    
    render() {
            return (
                <div>
                    <PostListNavbar />
                    <div className="post-contents2">
                        {this.props.posts.map(post => (
                            post.post_type === "I" ? 
                            (
                            <div className="postContainer2" key={post.id}>
                                <p>Title: {post.title}</p>
                                <Link to={`posts/${post.id}`}>
                                    <img className="post-image2" src={post.content} alt="content" />
                                </Link>    
                            </div>) : (null)
                        ))}
                    </div>
                </div>
            )
    }
}

const mapStateToProps = state => ({
    posts: state.posts.posts
});

export default connect(mapStateToProps)(Photos);

import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PostListNavbar from "./PostListNavbar";

// import { Link } from "react-router-dom";

class Audios extends Component {
    static propTypes = {
        posts: PropTypes.array.isRequired,
    }
    render() {
        return (
            <div>
                <PostListNavbar />
                <div className="post-contents2">
                    {this.props.posts.map(post => (
                        post.post_type === "A" ? 
                        (
                        <div className="postContainer2" key={post.id}>
                            <p>Title: {post.title}</p>
                            <audio controls>
                                <source src={post.content} />
                            </audio>
                        </div>) :
                        (null)
                    ))}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts.posts
});

export default connect(mapStateToProps)(Audios);

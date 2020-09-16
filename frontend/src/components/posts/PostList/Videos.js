import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PostListNavbar from "./PostListNavbar";
import { Link } from "react-router-dom";

// import { Link } from "react-router-dom";

class Videos extends Component {
    static propTypes = {
        posts: PropTypes.array.isRequired,
    }
    
    render() {
            return (
                <div>
                    <PostListNavbar />
                    <div className="post-contents2">
                        {this.props.posts.map(post => (
                            post.post_type === "V" ? 
                            (
                            <div className="postContainer2" key={post.id}>
                                <Link to={`posts/${post.id}`}>
                                <p>Title: {post.title}</p>
                                <video width="100%" height="240" controls>
                                    <source src={post.content} />
                                </video>
                                </Link>

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

export default connect(mapStateToProps)(Videos);

import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import PostListNavbar from "./PostListNavbar";
import { Link } from "react-router-dom";

// import { Link } from "react-router-dom";

class Videos extends Component {
    static propTypes = {
        posts: PropTypes.array.isRequired,
    }
    
    render() {
            return (
                <div className="content-area">
                    {/* <PostListNavbar /> */}
                    <main className="main-content-area">
                        <section className="posts">
                            {this.props.posts.map(post => (
                                post.post_type === "V" ? 
                                (
                                <article className="post post-one-third" key={post.id}>
                                    <Link to={`posts/${post.id}`} style={{textDecoration: "none"}}>
                                        <div style={{border: "1px solid black",
                                            borderRadius: "2%",
                                            backgroundColor: "black"}} >
                                            <video 
                                            width="100%" height="100%" controls>
                                                <source src={post.content} />
                                            </video>
                                        </div>
                                        <div className="post-content">
                                            <span>
                                                {post.title}
                                            </span>
                                        </div>
                                    </Link>
                                </article>) :
                                (null)
                            ))}
                        </section>
                    </main>
                </div>
            )
    }
}

const mapStateToProps = state => ({
    posts: state.posts.posts
});

export default connect(mapStateToProps)(Videos);

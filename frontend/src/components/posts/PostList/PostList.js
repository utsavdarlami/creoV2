import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import PostListNavbar from "./PostListNavbar";

class PostList extends Component {
    static propTypes = {
        posts: PropTypes.array.isRequired,
    }

    render() {
        // const likeorderedPosts = this.props.posts.slice().sort((a,b) => a.like_count < b.like_count)
        return (
            <div className="content-area">
                {/* <PostListNavbar /> */}
                <main className="main-content-area">
                    <section className="posts">
                        {this.props.posts.map(post => (
                        post.post_type === "I" ? 
                        (
                        <article className="post post-one-third" key={post.id}>
                            <Link to={`posts/${post.id}`}>
                                <div>
                                    <img src={post.content} alt="content" />    
                                </div>
                                <div className="post-content">
                                    <span>
                                    {post.title}
                                    </span>
                                </div>
                            {/* <p>Title: {post.title}</p>  */}
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

export default connect(mapStateToProps)(PostList);

import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {getPosts} from "../../../actions/posts";
// import PostListNavbar from "./PostListNavbar";

class PostList extends Component {
    constructor(){
        super();
        this.handleMostChange = this.handleMostChange.bind(this);
        this.handleMostViewed = this.handleMostViewed.bind(this);
    }

    static propTypes = {
        posts: PropTypes.array.isRequired,
        getPosts: PropTypes.func.isRequired
    }

    handleMostChange(){
        this.props.getPosts("-view_count");
    }

    handleMostViewed(){
        this.props.getPosts("like_count");
    }

    render() {
        // const likeorderedPosts = this.props.posts.slice().sort((a,b) => a.like_count < b.like_count)
        return (
            <div>
                <button onClick={this.handleMostChange}>Most liked</button>
                <button onClick={this.handleMostViewed}>Most viewed</button>
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
            </div>  
        )
}
}

const mapStateToProps = state => ({
    posts: state.posts.posts
});

export default connect(mapStateToProps, {getPosts})(PostList);

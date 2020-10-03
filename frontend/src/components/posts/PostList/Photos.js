import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import PostListNavbar from "./PostListNavbar";

import Spinner from '../../layout/Spinner';

class Photos extends Component {
    static propTypes = {
        posts: PropTypes.array.isRequired,
    }
    
    render() {
        if (this.props.postLoading) {
            return <Spinner/> 
            //(<Spinner/>
        }
            return (
                <div>
                    <p 
                style={{marginLeft: "3em",
                 marginTop: "3%",
                  fontFamily: "'Josefin Sans', sans-serif", fontSize: "1.3em"}}>Check out creators' photos</p>
                <div className="content-area">
                    {/* <PostListNavbar /> */}
                    <main className="main-content-area" style={{paddingTop: "1em"}}>
                        <section className="posts">
                            {this.props.posts.map(post => (
                                post.post_type === "I" ? 
                                (
                                <article className="post post-one-third" key={post.id}>
                                <Link to={`posts/${post.id}`} style={{textDecoration: "none"}}>
                                    <div>
                                        <img className="post-image2" src={post.content} alt="content" />
                                    </div>
                                    
                                    <div className="post-content">
                                        <span>
                                            {post.title}
                                        </span>
                                    </div>
                                    </Link>    
                                </article>) : (null)
                            ))}
                        </section>
                    </main>
                </div>
                </div>
            )
    }
}

const mapStateToProps = state => ({
    posts: state.posts.posts,
    postLoading : state.posts.isLoading,
});

export default connect(mapStateToProps)(Photos);

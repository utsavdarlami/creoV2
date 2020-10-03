import React, { Component, Fragment } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import PhotosDropDown from "./PhotosDropDown";


class MostLikedPhotos extends Component {
    static propTypes = {
        posts: PropTypes.array.isRequired,
    }
    
    render() {
            const likeorderedPosts = this.props.posts.slice().sort((a,b) => a.like_count < b.like_count)
            return (
                <Fragment>
                    <div>
                    
                        <div style={{ 
                            display: "flex", 
                            justifyContent: "space-between",
                            margin: "2% 5% 0 5%"}}>
                            
                            <p 
                            style={{
                            fontFamily: "'Josefin Sans', sans-serif", 
                            fontSize: "1.3em"}}>Check out creators' photos.</p>

                            <PhotosDropDown style={{width: "25%"}} />
                            
                        </div>

                        <div className="content-area">
                        {/* <PostListNavbar /> */}
                            <main className="main-content-area" style={{paddingTop: "1em"}}>
                                <section className="posts">
                                    {likeorderedPosts.map(post => (
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
                </Fragment>
                
            )
    }
}

const mapStateToProps = state => ({
    posts: state.posts.posts
});

export default connect(mapStateToProps)(MostLikedPhotos);

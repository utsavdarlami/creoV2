import React, { Component, Fragment } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AudioLogo from "../audio_image3.png";
import { Link } from "react-router-dom";
import AudiosDropDown from "./AudiosDropDown";


class MostViewedAudios extends Component {
    static propTypes = {
        posts: PropTypes.array.isRequired,
    }
    render() {
        const vieworderedPosts = this.props.posts.slice().sort((a,b) => a.view_count < b.view_count)
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
                                    fontSize: "1.3em"}}>Check out the most viewed beats.</p>

                                    <AudiosDropDown style={{width: "25%"}} />
                                    
                    </div>                
                    <div className="content-area">
                        {/* <PostListNavbar /> */}
                        <main className="main-content-area" style={{paddingTop: "1em"}}>
                            <section className="posts">
                                {vieworderedPosts.map(post => (
                                    post.post_type === "A" ? 
                                    (
                                    <article className="post post-one-third" key={post.id}>
                                        <Link to={`posts/${post.id}`} style={{textDecoration: "none"}}>
                                        <div style={{border:"2px solid black", borderRadius: "2%"}}>
                                            <div style={{ height: "305px", backgroundColor: "white"}}>
                                                <img src={AudioLogo} 
                                                alt="audio" 
                                                style={{
                                                height: "100%", 
                                                borderRadius: "0"}} />
                                            </div>
                                            <div>
                                                <audio controls style={{width:"100%", height: "41px"}}>
                                                    <source src={post.content} />
                                                </audio>
                                            </div>
                                        </div>

                                            <div className="post-content">
                                                <span className="post-home-title">
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
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts.posts
});

export default connect(mapStateToProps)(MostViewedAudios);
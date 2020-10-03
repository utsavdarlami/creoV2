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
                                    fontSize: "1.3em"}}>Check out creators' music.</p>

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
                                            <div style={{border: "1px solid black"}}>
                                                        <img src={AudioLogo} alt="audio" style={{ marginTop: "1%",height: "84%", borderRadius: "none"}} />
                                                    <div>
                                                        <audio controls style={{width:"100%", height: "52px"}}>
                                                        <source src={post.content} />
                                                    </audio>
                                                    </div>
                                            </div>

                                            <div className="post-contents">
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
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts.posts
});

export default connect(mapStateToProps)(MostViewedAudios);
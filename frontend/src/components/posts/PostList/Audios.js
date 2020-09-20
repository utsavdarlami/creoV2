import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import PostListNavbar from "./PostListNavbar";
// import Logo from "./music_track.png";
import AudioLogo from "./audio_image.jpg";

import { Link } from "react-router-dom";

class Audios extends Component {
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
                            post.post_type === "A" ? 
                            (
                            <article className="post post-one-third" key={post.id}>
                                <Link to={`posts/${post.id}`}>
                                    <div style={{border: "1px solid black"}}>
                                                <img src={AudioLogo} alt="audio picture" style={{ marginTop: "1%",height: "84%", borderRadius: "none"}} />
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
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts.posts
});

export default connect(mapStateToProps)(Audios);

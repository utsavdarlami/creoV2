import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import PostListNavbar from "./PostListNavbar";
// import Logo from "./music_track.png";
// import AudioLogo from "./audio_image.jpg";
import AudioLogo from "./audio_image3.png"

import Spinner from '../../layout/Spinner';


import { Link } from "react-router-dom";

class Audios extends Component {
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
                  fontFamily: "'Josefin Sans', sans-serif", fontSize: "1.3em"}}>Check out creators' music</p>
            <div className="content-area">
                {/* <PostListNavbar /> */}
                <main className="main-content-area" style={{paddingTop: "1em"}}>
                    <section className="posts">
                        {this.props.posts.map(post => (
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
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts.posts,
    postLoading : state.posts.isLoading,
});

export default connect(mapStateToProps)(Audios);

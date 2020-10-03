import React, { Component, Fragment } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import VideosDropDown from "./VideosDropDown";


class Videos extends Component {
    static propTypes = {
        posts: PropTypes.array.isRequired,
    }
    
    render() {
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
                            fontSize: "1.3em"}}>Check out creators' videos.</p>

                            <VideosDropDown style={{width: "25%"}} />
                            
                    </div>
                <div className="content-area" >
                    {/* <PostListNavbar /> */}
                    <main className="main-content-area" style={{paddingTop: "1em"}}>
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
                </div>
                </Fragment>
            )
    }
}

const mapStateToProps = state => ({
    posts: state.posts.posts
});

export default connect(mapStateToProps)(Videos);

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import {getPosts} from "../../../actions/posts";
// import PostListNavbar from "./PostListNavbar";
// import AudioLogo from "./audio_image.jpg"
import AudioLogo from "./audio_image3.png"

class PostList extends Component {
  // constructor(){
  //     super();
  //     this.handleMostChange = this.handleMostChange.bind(this);
  //     this.handleMostViewed = this.handleMostViewed.bind(this);
  // }

    static propTypes = {
        posts: PropTypes.array.isRequired,
        // getPosts: PropTypes.func.isRequired
    }

  // handleMostChange(){
  //     this.props.getPosts("-view_count");
  // }

  // handleMostViewed(){
  //     this.props.getPosts("like_count");
  // }

    // componentDidMount(){
    //     this.props.getPosts();
    // }

    render() {
        const likeorderedPosts = this.props.posts.slice().sort((a,b) => a.like_count < b.like_count)
        return (
            <div>
                <p 
                style={{margin: " 0 30%",
                 marginTop: "3%",
                  fontFamily: "'Josefin Sans', sans-serif", fontSize: "1.3em"}}>Browse art. Discover Amazing Artists and Creators. Get inspired.</p>
                {/* <button onClick={this.handleMostChange}>Most liked</button>
                <button onClick={this.handleMostViewed}>Most viewed</button> */}
            <div className="content-area">
                {/* <PostListNavbar /> */}
                <main className="main-content-area" style={{paddingTop: "1em"}}>
                    <section className="posts">
                        {likeorderedPosts.map(post => (                    
                        <article className="post post-one-third" key={post.id}>
                            <Link to={`posts/${post.id}`} style={{textDecoration: "none"}}>
                                <div style={{backgroundColor: "black", borderRadius: "2%"}}>
                                {(() => {
                    switch (post.post_type){
                      case "I":
                        return <img src={post.content} alt="content" style={{borderRadius: "none"}} />;
                      case "V": 
                        return  <video width="100%" height="100%" controls><source src={post.content} /></video>;
                      case "A": 
                        return <div style={{ height: "84%", border: "1px solid black", borderRadius: "2%", backgroundColor: "white"}}>
                          <img src={AudioLogo} alt="audio" style={{height: "100%"}}  />
                          <div>
                            <audio controls style={{width:"100%", height: "52px"}}>
                              <source src={post.content} />
                              </audio>
                              </div>
                              </div>
                
                      default: return ""
                      }
                  })()}   
                                </div>
                                <div className="post-content">
                                    <span className="post-home-title">
                                    {post.title}
                                    </span>
                                </div>
                            {/* <p>Title: {post.title}</p>  */}
                            </Link>   
                        </article> 
                        ))}
                    </section>
                </main>
            </div>  
            </div>  
        )
}
}

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
});

export default connect(mapStateToProps)(PostList);

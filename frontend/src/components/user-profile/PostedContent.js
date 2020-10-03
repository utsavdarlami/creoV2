import React, { Component, Fragment} from 'react';
import UserDetails from './UserDetails';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getUserPost } from '../../actions/posts';
// import AudioLogo from "../posts/PostList/audio_image.jpg"
import AudioLogo from "../posts/PostList/audio_image3.png"

import Spinner from '../layout/Spinner';

class PostedContent extends Component {
  static propTypes = {
    user_posts: PropTypes.array.isRequired,
    getUserPost: PropTypes.func.isRequired,
    postLoading : PropTypes.bool.isRequired,
  };

  componentDidMount() {
    this.props.getUserPost();
  }

  render() {
    const dateorderedPosts = this.props.user_posts.slice().sort((a,b) => a.created_at < b.created_at)
    const posted_content =  
    <div className="content-area">
      <main className="main-content-area">
        <section className="posts">
          {dateorderedPosts.map(post => (
            <article className="post post-one-third" key={post.id}>
              <Link to={`/posts/${post.id}`} style={{textDecoration: "none"}}>
                  {(() => {
                    switch (post.post_type){
                      case "I":
                        return (
                          <div>
                            <img src={post.content} style={{borderRadius: "2%"}} alt="content" />
                          </div>
                        )
                      case "V": 
                        return  (
                          <div>
                              <video width="100%" height="100%" style={{backgroundColor: "black"}} controls>
                                <source src={post.content} />
                              </video>
                          </div>
                        )
                      case "A": 
                        return (
                          <div style={{border:"2px solid black", borderRadius: "2%"}}>
                            <div style={{ height: "305px", backgroundColor: "white"}}>
                              <img src={AudioLogo} alt="audio" 
                              style={{height: "100%", borderRadius: "0"}}  />
                              </div>
                                <audio controls style={{width:"100%", height: "41px"}}>
                                  <source src={post.content} />
                                </audio>
                            </div>
                        )
                
                      default: return ""
                      }
                  })()}

                <div className="post-content">
                  <span className="post-home-title">
                    {post.title}
                  </span>
                </div>
              </Link>    
              </article>
    ))}
        </section>
      </main>
    </div>

    if (this.props.postLoading) {
        return <Spinner/> 
    }

    return (
      <Fragment>
        <div className="profile-wrapper" style={{ marginTop: "2%"}}>
            <UserDetails />
            <hr />
          <div className="profile-row">
            <div className="profile-col-100">
              <div className="profile-container" id="profile-container">
                <div className="profile-item"><NavLink to="/profile/posted" style={{textDecoration: "none"}} activeStyle={{borderBottom: "2px solid black", fontWeight: "bold"}}><span>Posted</span></NavLink></div>
                <div className="profile-item"><NavLink to="/profile/liked" style={{textDecoration: "none"}}><span>Liked</span></NavLink></div>
                <div className="profile-item"><NavLink to="/profile/saved" style={{textDecoration: "none"}}><span>Saved</span></NavLink></div>
              </div>
              <hr />
            </div>
          </div>
        </div>
        <div>
          {posted_content}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user_posts: state.posts.user_posts,
    postLoading : state.posts.isLoading,
});

export default connect(mapStateToProps, { getUserPost })(PostedContent);

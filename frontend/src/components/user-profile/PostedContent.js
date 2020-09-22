import React, { Component, Fragment} from 'react';
import UserDetails from './UserDetails';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getUserPost } from '../../actions/posts';
// import AudioLogo from "../posts/PostList/audio_image.jpg"
import AudioLogo from "../posts/PostList/audio_image3.png"

class PostedContent extends Component {
  static propTypes = {
    user_posts: PropTypes.array.isRequired,
    getUserPost: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getUserPost();
  }

  render() {
    const posted_content =  
    <div className="content-area">
      <main className="main-content-area">
        <section className="posts">
          {this.props.user_posts.map(post => (
            <article className="post post-one-third" key={post.id}>
              <Link to={`/posts/${post.id}`}>
                <div style={{backgroundColor: "black", borderRadius: "2%"}}>
                  {(() => {
                    switch (post.post_type){
                      case "I":
                        return <img src={post.content} alt="content" style={{borderRadius: "2%"}} />;
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
                  <span>
                    {post.title}
                  </span>
                </div>
              </Link>    
              </article>
    ))}
        </section>
      </main>
    </div>

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
});

export default connect(mapStateToProps, { getUserPost })(PostedContent);


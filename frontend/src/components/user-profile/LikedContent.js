import React, { Component, Fragment} from 'react';
import UserDetails from './UserDetails';
import {NavLink, Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLikedContent } from '../../actions/posts';
import AudioLogo from "../posts/PostList/audio_image.jpg"

class LikedContent extends Component {
  static propTypes = {
    liked_posts: PropTypes.array.isRequired,
    getLikedContent: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getLikedContent();
  }


  render() {
    const liked_content = 
      (
        <div className="content-area">
          <main className="main-content-area">
            <section className="posts">
              {this.props.liked_posts.map(liked_post => (
              <article className="post post-one-third" key={liked_post.post.id}>
                <Link to={`/posts/${liked_post.post.id}`}>
                <div style={{backgroundColor: "black", borderRadius: "2%"}}>
                  {(() => {
                      switch (liked_post.post.post_type){
                        case "I":
                          return <img className="post-image2" src={liked_post.post.content} alt="content" />;
                        case "V": 
                          return  <video width="100%" height="100%" controls><source src={liked_post.post.content} /></video>;
                        case "A": 
                          return <div style={{ height: "84%", border: "1px solid black", borderRadius: "2%", backgroundColor: "white"}}>
                              <img src={AudioLogo} alt="audio" style={{height: "100%"}}  />
                            <div>
                            <audio controls style={{width:"100%", height: "52px"}}>
                              <source src={liked_post.post.content} />
                              </audio>
                            </div>
                            </div>
                          default: return ""
                      }
                    })()}
                </div>
                <div className="post-content">
                  <span>
                    {liked_post.post.title}
                  </span>
                </div>
                </Link>
              </article>
                ))}
            </section>
          </main>
          
        </div>
      )

    return (
      <Fragment>
        <div className="profile-wrapper">
            <UserDetails />
          <div className="profile-row">
            <div className="profile-col-100">
              <div className="profile-container" id="profile-container">
                <div className="profile-item"><NavLink to="/profile/posted">Posted Content</NavLink></div>
                <div className="profile-item"><NavLink to="/profile/liked" activeStyle={{backgroundColor: "yellow"}}>Liked Content</NavLink></div>
                <div className="profile-item"><NavLink to="/profile/saved">Saved Content</NavLink></div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {liked_content}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  liked_posts: state.posts.liked_posts,
});

export default connect(mapStateToProps, { getLikedContent })(LikedContent);

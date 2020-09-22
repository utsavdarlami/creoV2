import React, { Component, Fragment} from 'react';
import UserDetails from './UserDetails';
import {NavLink, Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSavedContent } from '../../actions/posts';
// import AudioLogo from "../posts/PostList/audio_image.jpg"
import AudioLogo from "../posts/PostList/audio_image3.png"


class LikedContent extends Component {
  static propTypes = {
    saved_posts: PropTypes.array.isRequired,
    getSavedContent: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getSavedContent();
  }

  render() {
    const saved_content = 
    (
      <div className="content-area">
        <main className="main-content-area">
          <section className="posts">
            {this.props.saved_posts.map(saved_post => (
              <article className="post post-one-third" key={saved_post.post.id}>
                <Link to={`/posts/${saved_post.post.id}`}>
                  <div style={{backgroundColor: "black", borderRadius: "2%"}}>
                    {(() => {
                      switch (saved_post.post.post_type){
                        case "I":
                          return <img className="post-image2" src={saved_post.post.content} alt="content" style={{borderRadius: "2%"}} />;
                        case "V": 
                          return  <video width="100%" height="100%" controls><source src={saved_post.post.content} /></video>;
                        case "A": 
                          return  <div style={{ height: "84%", border: "1px solid black", borderRadius: "2%", backgroundColor: "white"}}>
                          <img src={AudioLogo} alt="audio" style={{height: "100%"}}  />
                          <div>
                            <audio controls style={{width:"100%", height: "52px"}}>
                              <source src={saved_post.post.content} />
                              </audio>
                              </div>
                              </div>
                        default: return ""
                        }  
                    })()}     
                  </div>
                    <div className="post-content">
                      <span>
                        {saved_post.post.title}
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
        <div className="profile-wrapper" style={{ marginTop: "2%"}}>
            <UserDetails />
            <hr />
          <div className="profile-row">
            <div className="profile-col-100">
              <div className="profile-container" id="profile-container">
                <div className="profile-item"><NavLink to="/profile/posted" style={{textDecoration: "none"}}><span>Posted</span></NavLink></div>
                <div className="profile-item"><NavLink to="/profile/liked" style={{textDecoration: "none"}}><span>Liked</span></NavLink></div>
                <div className="profile-item"><NavLink to="/profile/saved" style={{textDecoration: "none", fontWeight: "bold"}} activeStyle={{borderBottom: "2px solid black"}}><span>Saved</span></NavLink></div>
              </div>
              <hr />
            </div>
          </div>
        </div>

      <div>
      {saved_content}
      </div>

      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  saved_posts: state.posts.saved_posts
});

export default connect(mapStateToProps, { getSavedContent })(LikedContent);

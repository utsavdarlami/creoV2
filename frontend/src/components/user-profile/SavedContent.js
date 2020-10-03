import React, { Component, Fragment} from 'react';
import UserDetails from './UserDetails';
import {NavLink, Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSavedContent } from '../../actions/posts';
// import AudioLogo from "../posts/PostList/audio_image.jpg"
import AudioLogo from "../posts/PostList/audio_image3.png"

import Spinner from '../layout/Spinner';


class LikedContent extends Component {
  static propTypes = {
    saved_posts: PropTypes.array.isRequired,
    getSavedContent: PropTypes.func.isRequired,
    postLoading : PropTypes.bool.isRequired,
  };

  componentDidMount() {
    this.props.getSavedContent();
  }

  render() {
    const save_order = this.props.saved_posts.reverse();
    const saved_content = 
    (
      <div className="content-area">
        <main className="main-content-area">
          <section className="posts">
            {save_order.map(saved_post => (
              <article className="post post-one-third" key={saved_post.post.id}>
                <Link to={`/posts/${saved_post.post.id}`} style={{textDecoration: "none"}}>
                    {(() => {
                      switch (saved_post.post.post_type){
                        case "I":
                          return (
                            <div>
                              <img src={saved_post.post.content} style={{borderRadius: "2%"}} alt="content" />
                            </div>
                          )
                        case "V": 
                          return  (
                            <div>
                                <video width="100%" height="100%" style={{backgroundColor: "black"}} controls>
                                  <source src={saved_post.post.content} />
                                </video>;
                            </div>
                          )
                        case "A": 
                          return (
                            <div style={{border:"2px solid black", borderRadius: "2%"}}>
                              <div style={{ height: "305px", backgroundColor: "white"}}>
                                <img src={AudioLogo} 
                                alt="audio" 
                                style={{ height: "100%", borderRadius: "0"}}  />
                                </div>
                                  <audio controls style={{width:"100%", height: "41px"}}>
                                    <source src={saved_post.post.content} />
                                  </audio>
                              </div>
                          )
                        default: return ""
                        }  
                    })()}     
                    <div className="post-content">
                      <span className="post-home-title">
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
  saved_posts: state.posts.saved_posts,
    postLoading : state.posts.isLoading,
});

export default connect(mapStateToProps, { getSavedContent })(LikedContent);

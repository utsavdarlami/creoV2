import React, { Component, Fragment} from 'react';
import UserDetails from './UserDetails';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSavedContent } from '../../actions/posts';

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
      <div className="post-contents2">
      {this.props.saved_posts.map(saved_post => (
        <div className="postContainer2" key={saved_post.post.id}>
          
          <p>Id:{saved_post.post.id}</p>
          <p>Title:{saved_post.post.title}</p>
          <p>Description:{saved_post.post.description}</p>
          {(() => {
                switch (saved_post.post.post_type){
                  case "I":
                    return <img className="post-image2" src={saved_post.post.content} alt="content" />;
                  case "V": 
                    return  <video width="100%" height="240" controls><source src={saved_post.post.content} /></video>;
                  case "A": 
                    return  <audio controls><source src={saved_post.post.content} /></audio>
                  default: return ""
                  }  
                })()}      
                  </div>
      ))}
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
                <div className="profile-item"><NavLink to="/profile/liked">Liked Content</NavLink></div>
                <div className="profile-item"><NavLink to="/profile/saved" activeStyle={{backgroundColor: "yellow"}}>Saved Content</NavLink></div>
              </div>
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

import React, { Component, Fragment} from 'react';
import UserDetails from './UserDetails';
import {NavLink, Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLikedContent } from '../../actions/posts';

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
        <div className="post-contents2">
          {this.props.liked_posts.map(liked_post => (
            <div className="postContainer2" key={liked_post.post.id}>
              <Link to={`/posts/${liked_post.post.id}`}>
                <p>Id:{liked_post.post.id}</p>
                <p>Title:{liked_post.post.title}</p>
                <p>Description:{liked_post.post.description}</p>
                {(() => {
                            switch (liked_post.post.post_type){
                                case "I":
                                    return <img className="post-image2" src={liked_post.post.content} alt="content" />;
                                case "V": 
                                return  <video width="100%" height="240" controls><source src={liked_post.post.content} /></video>;
                                case "A": 
                                return  <audio controls><source src={liked_post.post.content} /></audio>
                                default: return ""
                            }
                        })()}
              </Link>
          </div>
          ))}
        </div>
      )

    return (
      <Fragment>
        <div className="profile-page">
          <section className="profile-detail">
            <UserDetails />
          </section>
          <div className="profile-content">
            <ul className="profile-content-list">
              <li><NavLink to="/profile/posted">Posted Content</NavLink></li>
              <li><NavLink to="/profile/liked" activeStyle={{fontWeight: "bold"}}>Liked Content</NavLink></li>
              <li><NavLink to="/profile/saved" >Saved Content</NavLink></li>
            </ul>
            {liked_content}
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  liked_posts: state.posts.liked_posts,
});

export default connect(mapStateToProps, { getLikedContent })(LikedContent);

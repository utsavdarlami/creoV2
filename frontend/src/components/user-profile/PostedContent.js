import React, { Component, Fragment} from 'react';
import UserDetails from './UserDetails';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getUserPost } from '../../actions/posts';


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
                <div>
                  {(() => {
                    switch (post.post_type){
                      case "I":
                        return <img src={post.content} alt="content" />;
                      case "V": 
                        return  <video width="100%" height="100%" controls><source src={post.content} /></video>;
                      case "A": 
                        return  <audio controls><source src={post.content} /></audio>
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
        <div className="profile-page">
          <section className="profile-detail">
            <UserDetails />
          </section>
          <div className="profile-content">
            <ul className="profile-content-list">
              <li><NavLink to="/profile/posted" activeStyle={{fontWeight: "bold"}}>Posted Content</NavLink></li>
              <li><NavLink to="/profile/liked" activeStyle={{fontWeight: "bold"}}>Liked Content</NavLink></li>
              <li><NavLink to="/profile/saved" activeStyle={{fontWeight: "bold"}}>Saved Content</NavLink></li>
            </ul>
            <div>
              {posted_content}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user_posts: state.posts.user_posts,
});

export default connect(mapStateToProps, { getUserPost })(PostedContent);


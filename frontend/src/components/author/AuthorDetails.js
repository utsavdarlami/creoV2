import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { getAuthorDetails } from "../../actions/auth";
import {withRouter, Link} from "react-router-dom";
import { getAuthorPost } from '../../actions/posts';
// import AudioLogo from "../posts/PostList/audio_image.jpg"
import AudioLogo from "../posts/PostList/audio_image3.png"

class AuthorDetails extends Component {

    static propTypes = {
        author_posts: PropTypes.array.isRequired,
        getAuthorPost: PropTypes.func.isRequired,
        getAuthorDetails: PropTypes.func.isRequired
    }

    componentDidMount(){
        const id = this.props.match.params.author_id;
        this.props.getAuthorDetails(id);
        this.props.getAuthorPost(id);
    }

    render() {
        const back_api =  "http://127.0.0.1:8000";
        const author = this.props.author_details ? 
        (
          <div className="oprofile-row">
            <div className="oprofile-col-60 oprofile-innercontainer">
              <div className="oprofile-innerrow">
                <div className="oprofile-user-name oprofile-col-100">
                  <h1> {this.props.author_details.user.first_name}  </h1>
                  <h1>{this.props.author_details.user.last_name}</h1>
                </div> 
              </div>
              <div className="oprofile-innerrow">
                <div className="oprofile-row">
                  <div className="oprofile-user-bio">
                    <p>{this.props.author_details.bio}</p>
                  </div>
                </div>
              </div>
              <div className="oprofile-innerrow">
                <div className="oprofile-user-info">
                  <h2>General Info</h2>
                  <ul> 
                    <li><span style={{color:"#808181"}}>@</span>{this.props.author_details.user.username}</li>
                    <li><span style={{color:"#808181"}}>E-mail: </span>{this.props.author_details.user.email}</li>
                    {/* <li><span>Gender: </span>{this.props.author_details.gender}</li> */}
                    
                    {(this.props.author_details.portfolio_site) ? 
                    (<li><span><a href={this.props.author_details.portfolio_site} target="_blank" rel="noopener noreferrer"><span style={{color: "#808181"}}>My porftolio site</span> <i className="fas fa-link" style={{color:"#808181"}}></i></a></span></li>) : (null)}
              
                    {(this.props.author_details.resume) ? 
                    (<li><span><a href={this.props.author_details.resume} target="_blank" rel="noopener noreferrer"><span style={{color: "#808181"}}>View my resume</span> <i className="fas fa-link" style={{color:"#808181"}}></i></a></span></li>)
                     : (null)}
                    
                  </ul>
                </div>
              </div>
              </div>
              <div className="oprofile-col-40">
                <div className="oprofile-user-image">
                  <div className="oprofile-avatar">
                    <img src={this.props.author_details.profile_pic} alt="Profile display"  />
                  </div>
                </div>
              </div>
            </div>
        ) : 
        (null)

        const author_content = 
        <div className="content-area">
          <main className="main-content-area">
            <section className="posts">
              {this.props.author_posts.map(post => (
                <article className="post post-one-third" key={post.id}>
                  <Link to={`/posts/${post.id}`}>
                      <div style={{backgroundColor: "black", borderRadius: "2%"}}>
                        {(() => {
                          switch (post.post_type){
                            case "I":
                              return <img src={`${back_api}${post.content}`} alt="content" style={{borderRadius: "2%"}} />;
                            case "V": 
                              return  <video width="100%" height="100%" controls><source src={`${back_api}${post.content}`} /></video>;
                            case "A": 
                              return <div style={{ height: "84%", border: "1px solid black", borderRadius: "2%", backgroundColor: "white"}}>
                                <img src={AudioLogo} alt="audio" style={{height: "100%"}}  />
                                <div>
                                  <audio controls style={{width:"100%", height: "52px"}}>
                                    <source src={`${back_api}${post.content}`} />
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
            <div className="oprofile-wrapper">
                {author}
                <div className="oprofile-row">
                  <p className="oprofile-p">Author Posts</p>
                </div>
                {author_content}
            </div>
        )
}
}

const mapStateToProps = state => ({
    author_details: state.auth.author_details,
    author_posts: state.posts.author_posts
})

export default connect(mapStateToProps,
     {getAuthorDetails, getAuthorPost})(withRouter(AuthorDetails));

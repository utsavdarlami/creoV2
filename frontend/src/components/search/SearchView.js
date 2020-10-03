import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
//import PostAuthor from "../posts/PostAuthor";

class SearchView extends Component {
  static propTypes = {
    search_user: PropTypes.array.isRequired,
    search_post: PropTypes.array.isRequired,
  };

  render() {
    //console.log(this.props.search_user);
    return (
      <div>
        <br></br>
        <p
          style={{ paddingLeft: "10px", fontSize: "20px" }}
          className="small-jumbotron"
        >
          Search Results: <hr></hr>
        </p>
        <p
          style={{ paddingLeft: "10px", fontSize: "20px" }}
          className="small-jumbotron"
        >
          Users:{" "}
        </p>
        <div className="jumbotron small-jumbotron">
          {this.props.search_user.length !== 0 ? (
            <div className="search-user">
              {this.props.search_user.map((userdetails) => (
                <div key={userdetails.user.id} style={{ padding: "0 10px" }}>
                  <hr />
                  <div className="search-user-avatar">
                    <p key={userdetails.user.id}>
                      <img
                        key={userdetails.user.id}
                        src={userdetails.profile_pic}
                        alt="Avatar"
                        className="n_avatar"
                        style={{ height: "100px", width: "100px" }}
                      />

                      {"  "}
                      {/* <Link
                        key={userdetails.user.id}
                        to={`/users/${userdetails.user.id}`}
                        style={{ textDecoration: "none", textAlign: "center" }}
                      >
                        {userdetails.user.username}
                      </Link> */}
                    </p>
                  </div>
                  <div className="search-user-info">
                    <div style={{ fontSize: "1.2em", fontWeight: "bold" }}>
                      {/* {userdetails.user.username} */}
                      <Link
                        key={userdetails.user.id}
                        to={`/users/${userdetails.user.id}`}
                        style={{ textDecoration: "none", textAlign: "center" }}
                      >
                        @{userdetails.user.username}
                      </Link>
                    </div>
                    <p>
                      {userdetails.user.first_name + " "}
                      {userdetails.user.last_name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No such user is found</p>
          )}
        </div>
        <br></br>
        <p
          style={{ paddingLeft: "10px", fontSize: "20px" }}
          className="small-jumbotron"
        >
          Posts:{" "}
        </p>
        <div className="jumbotron small-jumbotron">
          {this.props.search_post.length !== 0 ? (
            <div className="search-user">
              {this.props.search_post.map((postdetails) => (
                <div key={postdetails.id} style={{ padding: "0 10px" }}>
                  <hr></hr>
                  <span style={{}}>
                    <div className="search-post-avatar">
                      <p key={postdetails.id}>
                        <img
                          key={postdetails.id}
                          src={postdetails.content}
                          alt="Avatar"
                          className="post_n_avatar"
                          style={{
                            borderRadius: "5%",
                            width: "200px",
                            height: "200px",
                          }}
                        />
                        {"  "}
                        {/* <Link
                          key={postdetails.id}
                          to={`/posts/${postdetails.id}`}
                          style={{ textDecoration: "none" }}
                        >
                          {postdetails.title}
                        </Link> */}
                      </p>
                    </div>
                  </span>
                  <div style={{ fontSize: "1.2em", fontWeight: "bold" }}>
                    {/* {postdetails.title} */}
                    <Link
                      key={postdetails.id}
                      to={`/posts/${postdetails.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      {postdetails.title}
                    </Link>
                  </div>
                  <p style={{ display: "flex" }}>
                    {postdetails.description + " "}
                  </p>
                  {/* <hr /> */}
                </div>
              ))}
            </div>
          ) : (
            <p>No such post</p>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  search_user: state.auth.search_user,
  search_post: state.auth.search_post,
});

export default connect(mapStateToProps)(SearchView);
//<p

//style={{margin: " 0 30%",
//marginTop: "3%",
//fontFamily: "'Josefin Sans', sans-serif", fontSize: "1.3em"}}>Browse art. Discover Amazing Artists and Creators. Get inspired.</p>
//{[> <button onClick={this.handleMostChange}>Most liked</button>
//<button onClick={this.handleMostViewed}>Most viewed</button> */}
//<div className="content-area">
//{[> <PostListNavbar /> <]}
//<main className="main-content-area" style={{paddingTop: "1em"}}>
//<section className="posts">
//{this.props.posts.map(post => (
//<article className="post post-one-third" key={post.id}>
//<Link to={`posts/${post.id}`} style={{textDecoration: "none"}}>
//<div style={{backgroundColor: "black", borderRadius: "2%"}}>
//{(() => {
//switch (post.post_type){
//case "I":
//return <img src={post.content} alt="content" style={{borderRadius: "2%"}} />;
//case "V":
//return  <video width="100%" height="10%" controls><source src={post.content} /></video>;
//case "A":
//return <div style={{ height: "84%", border: "1px solid black", borderRadius: "2%", backgroundColor: "white"}}>
//<img src={AudioLogo} alt="audio" style={{height: "100%"}}  />
//<div>
//<audio controls style={{width:"100%", height: "52px"}}>
//<source src={post.content} />
//</audio>
//</div>
//</div>

//default: return ""
//}
//})()}
//</div>
//<div className="post-content">
//<span>
//{post.title}
//</span>
//</div>
//{[> <p>Title: {post.title}</p>  <]}
//</Link>
//</article>
//))}
//</section>
//</main>
//</div>

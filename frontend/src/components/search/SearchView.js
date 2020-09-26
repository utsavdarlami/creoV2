import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import PostAuthor from "../posts/PostAuthor";

class SearchView extends Component {

    static propTypes = {
        search_user : PropTypes.array.isRequired,
    }


    render() {
        console.log(this.props.search_user);
        return (
      <div>
        <p style={{ paddingLeft: "10px", fontSize: "20px" }}>
          Search Results:{" "}
        </p>
        {this.props.search_user.length !== 0 ? (
          <div>
              {this.props.search_user.map((user) => (
                  <div key={user.id} style={{ padding: "0 10px" }}>
                      <span style={{}}>
                          <p key={user.id}>
                              <i className="far fa-user-circle"
                                  style={{
                                      // border: "2px solid blue",
                                      fontSize: "35px",
                                      marginTop: "18px",
                                  }}
                              >
                              </i>{" "}
                            <Link key={user.id} to={`/users/${user.id}`} style={{textDecoration: "none"}}>
                                {user.username}
                        </Link>
                          </p>
                      </span>
                      <div style={{fontSize: "1.2em", fontWeight: "bold"}}>{user.username}</div>
                      <p style={{ display: "flex" }}>
                          {user.first_name + " " }
                          {user.last_name}
                      </p>
                      <hr />
                  </div>
              ))}
          </div>
        ) : <p>No such user is found</p>}
      </div>
        )
    }
}

const mapStateToProps = (state) => ({
    search_user : state.auth.search_user,
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
//return  <video width="100%" height="100%" controls><source src={post.content} /></video>;
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

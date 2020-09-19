import React, { Component } from 'react';
import { connect } from 'react-redux';
import {deletePost} from "../../actions/posts";
import {withRouter} from "react-router-dom"
import PostLike from './PostLike';
import CommentForm from "./CommentForm";
import CommentList from './CommentList';
import PostSave from "./PostSave";
import PostAuthor from './PostAuthor';

class SinglePost extends Component {
    constructor(){
        super();
        this.handleDelete = this.handleDelete.bind(this);
    }


    handleDelete(){
        this.props.deletePost(this.props.post.id)
        this.props.history.push("/")
    }
    
    render() {
        const created_at = this.props.post ? this.props.post.created_at : null
        var now = new Date(created_at);
        var gmtDate = now.toLocaleString();
        const post = this.props.post ? (
            <div>
                <div >
                    <p>Title:{this.props.post.title}</p>
                    <p>Description:{this.props.post.description}</p>
                    <p>Created at: {gmtDate} </p>
                    {(() => {
                        switch (this.props.post.post_type){
                            case "I":
                                 return <img className="post-image" src={this.props.post.content} alt="content" />;
                            case "V": 
                            return  <video width="100%" height="240" controls><source src={this.props.post.content} /></video>;
                            case "A": 
                            return  <audio controls><source src={this.props.post.content} /></audio>
                            default: return ""
                        }
                    })()}
                    <p>{this.props.post.like_count} likes</p>
                </div>
            </div>
        ) : (
            <div>
                <p>Loading post...</p>
            </div>
        );
        
        const publisher = this.props.post? (this.props.post.publisher) : (null)
        const user_id  = this.props.auth.user ? (this.props.auth.user.id) : (null);
        const postId = this.props.post ? (this.props.post.id) : (null)

        return (
            <div className="post-contents2">
                <div className="postContainer2">
                {post}
                <hr />
                <PostAuthor publisher = {publisher} />
                <div style={{display: "flex", flexFlow: "row wrap", justifyContent: "flex-end", margin: "1% 0"}}>
                    <PostLike postId = {postId}/>
                    <PostSave postId = {postId} />
                    { (publisher === user_id) ? 
                    (<button onClick={this.handleDelete}>Delete</button>):
                    (null)}
                    {this.props.liked}
                </div>
                <CommentForm postId = {postId} />
                <CommentList postId = {postId} />
                
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.post_id;
    return {
        post: state.posts.posts.find(post => post.id === parseInt(id)),
        auth: state.auth,
        check_liked: state.posts.check_liked,
        check_saved: state.posts.check_saved,
        liked: state.posts.liked,
    };
};

export default connect(mapStateToProps, 
    { deletePost})(withRouter(SinglePost));

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import {
    likePost, 
    unlikePost, 
    deletePost,
    checkLike,
    savePost,
    unsavePost,
    checkSave,
    addComment} from "../../actions/posts";
import {withRouter, Link} from "react-router-dom"
import PostLike from './PostLike';
import CommentForm from "./CommentForm";
import CommentList from './CommentList';

class SinglePost extends Component {
    constructor(){
        super();
        // this.handleLike = this.handleLike.bind(this);
        // this.handleUnlike = this.handleUnlike.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        // this.handlecheckLike = this.handlecheckLike.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleUnSave = this.handleUnSave.bind(this); 
        this.handlecheckSave = this.handlecheckSave.bind(this);
    }

    static propTypes = {
        // likePost: PropTypes.func.isRequired,
        // unlikePost: PropTypes.func.isRequired,
        savePost: PropTypes.func.isRequired,
        unsavePost: PropTypes.func.isRequired,
        addComment: PropTypes.func.isRequired
    }

    // handlecheckLike(){
    //     if (this.props.post) {
    //         this.props.checkLike(this.props.post.id)
    //         if (this.props.check_liked.like === true) {
    //             return true;
    //         } else {
    //             return false;
    //         }
    //     }
    // }

    handlecheckSave(){
        if (this.props.post) {
            this.props.checkSave(this.props.post.id)
            if (this.props.check_saved) {
                return true;
            } else {
                return false;
            }
        }
    }

    // handleLike(){
    //     this.props.likePost(this.props.post.id);
    // }

    // handleUnlike(){
    // this.props.unlikePost(this.props.post.id);
    // }   

    handleSave(){
        this.props.savePost(this.props.post.id);
    }

    handleUnSave(){
        this.props.unsavePost(this.props.post.id);
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
            <div className="post-contents2">
                <div className="postContainer2">
                    <p>Id:{this.props.post.id} </p>
                    <p>Title:{this.props.post.title}</p>
                    <p>Description:{this.props.post.description}</p>
                    <p>Created at: {gmtDate} </p>
                    <img className="post-image" src={this.props.post.content} alt="content" />
                    <p>{this.props.post.like_count} likes</p>
                </div>
            </div>
        ) : (
            <div>
                <p>Loading post...</p>
            </div>
        );
        
        const publisher = this.props.post? (this.props.post.publisher) : (null)
        const user_id  = this.props.auth.user ? (this.props.auth.user[0].user.id) : (null);
        const { isAuthenticated } = this.props.auth;
        const postId = this.props.post ? (this.props.post.id) : (null)

        // const likeButton = !isAuthenticated ? (
        //     <Link to ="/login">
        //         <button>Like</button>
        //     </Link>
        // ) : this.handlecheckLike() ? 
        // (<button onClick={this.handleUnlike}>Unlike</button>)
        //  : (<button onClick= {this.handleLike}>Like</button>) 

        const saveButton = !isAuthenticated ? (
        <Link to="/login">
            <button>Save</button>
        </Link>) : this.handlecheckSave() ? 
        (<button onClick={this.handleUnSave}>Unsave</button>) 
        : (<button onClick= {this.handleSave}>Save</button>)

        return (
            <div>
                {post}
                {/* {likeButton} */}
                {postId}
                <PostLike postId = {postId}/>
                <CommentForm postId = {postId} />
                <CommentList postId = {postId} />
                {saveButton}
                { (publisher === user_id) ? 
                (<button onClick={this.handleDelete}>Delete</button>):
                (null)}
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
        check_saved: state.posts.check_saved
    };
};

export default connect(mapStateToProps, 
    {
        likePost, 
        unlikePost, 
        deletePost, 
        checkLike, 
        savePost, 
        unsavePost,
        checkSave, addComment})(withRouter(SinglePost));

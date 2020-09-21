import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getSinglePost,
    likePost,
    unlikePost,
    checkLike,
    savePost,
    unsavePost,
    checkSave,
    deletePost,
    increase_viewcount
} from "../../actions/posts";
import PropTypes from "prop-types";
import {Link, withRouter} from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentList from './CommentList';
import PostAuthor from './PostAuthor';

class SinglePost extends Component {
    constructor(){
        super();
        this.state = {
            is_liked_by_user: null,
            is_saved_by_user: null
        }
        this.handleLike = this.handleLike.bind(this);
        this.handleUnlike = this.handleUnlike.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleUnSave = this.handleUnSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    static propTypes = {
        post: PropTypes.object,
        getSinglePost: PropTypes.func.isRequired,
        likePost: PropTypes.func.isRequired,
        unlikePost: PropTypes.func.isRequired,
        savePost: PropTypes.func.isRequired,
        unsavePost: PropTypes.func.isRequired,
        deletePost: PropTypes.func.isRequired,
        increase_viewcount: PropTypes.func.isRequired
    }

    componentDidMount(){
        const id = this.props.match.params.post_id;
        const { isAuthenticated } = this.props.auth;
        this.props.getSinglePost(id);
        this.props.increase_viewcount(id);
        if(isAuthenticated){
            this.props.checkLike(id);
            this.props.checkSave(id);
            setTimeout(() => {
                if (this.props.check_liked.like === true) {
                    //console.log("check true");
                    this.setState({
                        is_liked_by_user : true
                    })
                } else {
                    //console.log("check false");
                    this.setState({
                        is_liked_by_user : false
                    })
                }

                if (this.props.check_saved) {
                    //console.log(" saved true");
                    this.setState({
                        is_saved_by_user : true
                    })
                } else {
                    //console.log("saved false");
                    this.setState({
                        is_saved_by_user : false
                    })
                }
            }, 1000);
        }
    }

    handleLike(){
        this.props.likePost(this.props.post.id);
        this.setState({
            is_liked_by_user: true
        })
        this.props.checkLike(this.props.post.id);
    }

    handleUnlike(){
        this.props.unlikePost(this.props.post.id);
        this.setState({
            is_liked_by_user: false
        })
        this.props.checkLike(this.props.post.id);
    }  

    handleSave(){
        this.props.savePost(this.props.post.id);
        this.setState({
            is_saved_by_user: true
        })
        this.props.checkSave(this.props.post.id)
    }

    handleUnSave(){
        this.props.unsavePost(this.props.post.id);
        this.setState({
            is_saved_by_user: false
        })
        this.props.checkSave(this.props.post.id)
    }

    handleDelete(){
        this.props.deletePost(this.props.post.id);
        this.props.history.push("/");
    }

    render() { 
        const { isAuthenticated } = this.props.auth;
        const likeButton = !isAuthenticated ? (
            <Link to ="/login">
                <button>Like</button>
            </Link>
        ) : this.state.is_liked_by_user === true ? 
        // (console.log("liked"),
        <button onClick={this.handleUnlike}>Unlike</button> : 
        // (console.log("not liked"),
        <button onClick= {this.handleLike}>Like</button> 

        const saveButton = !isAuthenticated ? (
            <Link to="/login">
                <button>Save</button>
            </Link>) : this.state.is_saved_by_user === true ?  
            (<button onClick={this.handleUnSave}>Unsave</button>) 
            : (<button onClick= {this.handleSave}>Save</button>) 

        const created_at = this.props.post ? this.props.post.created_at : null
        var now = new Date(created_at);
        var gmtDate = now.toLocaleString();
        const like_count = this.props.post? this.props.post.like_count : null;
        const post = this.props.post ? (
                <div> 
                        <div className="post-metadata">
                            <p className="post-title">Title:{this.props.post.title}</p>
                            <p className="post-createdat text-muted">Created at: {gmtDate} </p>
                        </div>

                        <div className="post-content">
                            {(() => {
                                switch(this.props.post.post_type) {
                                    case "I":
                                        return <img src={this.props.post.content} alt="content" />
                                    case "V":
                                        return  <video width="100%" height="100%" controls><source src={this.props.post.content} /></video>;
                                    case "A":
                                        return  <audio controls><source src={this.props.post.content} /></audio>
                                    default:
                                        return ""
                                }
                            })()}
                            
                        </div>

                        <div className="post-content">
                        <p>Description:{this.props.post.description}</p>
                        {/* <p>{this.props.post.like_count} likes</p>
                        <p>{this.props.post.view_count}</p> */}
                        </div>
                        <hr />
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
            <div className="detail-wrapper">
                <div className="post card">
                    {post}
                    <div className="post-content">
                        <span>
                            <p>Post Author: {(this.state.is_liked_by_user) ? 
                        (<PostAuthor publisher = {publisher} />
                        ) : (null)}</p>
                        </span>
                        <span className="post-like">
                            {likeButton} {like_count}
                        </span>
                        <span className="post-save">
                            {saveButton}
                        </span>
                    </div>
                    { (publisher === user_id) ? 
                    (<button onClick={this.handleDelete}>Delete</button>):
                    (null)}
                    <hr />
                    <CommentForm postId = {postId} authId={user_id}/>
                    <CommentList postId = {postId} authId={user_id}/>
                    {this.props.liked}
                    </div>

                    
            </div>
        )
    }
}

const mapStateToProps = state => ({
    post: state.posts.single_post,
    check_liked: state.posts.check_liked,
    liked: state.posts.liked,
    auth: state.auth,
    check_saved: state.posts.check_saved,
    is_saved: state.posts.is_saved,
})

export default connect(mapStateToProps,
     {
        getSinglePost, 
        likePost, 
        unlikePost,
        checkLike,
        savePost, 
        unsavePost, 
        checkSave,
        deletePost, 
        increase_viewcount})(withRouter(SinglePost));

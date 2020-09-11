//GET SINGLE POST
export const getSinglePost = (id) => dispatch => {
    axios.get(`api/allposts/${id}`)
    .then (res => {
        dispatch({
            type: GET_SINGLE_POST,
            payload: res.data
        });
    }).catch(
        err => console.log(err));
};


//SINGLE POST

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import {likePost, unlikePost, deletePost, checkLike} from "../../actions/posts";
import {withRouter, Link} from "react-router-dom"

class SinglePost extends Component {
    constructor(){
        super();
        this.handleLike = this.handleLike.bind(this);
        this.handleUnlike = this.handleUnlike.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handlecheckLike = this.handlecheckLike.bind(this) 
    }

    static propTypes = {
        likePost: PropTypes.func.isRequired,
        unlikePost: PropTypes.func.isRequired,
        liked: PropTypes.bool.isRequired,
    }

    handlecheckLike(){
        this.props.checkLike(this.props.post.id)
        if (this.props.check_liked.like === true) {
            return true;
        } else {
            return false;
        }
    }

    handleLike(){
        this.props.likePost(this.props.post.id);
    }

    handleUnlike(){
    this.props.unlikePost(this.props.post.id);
}

    handleDelete(){
        this.props.deletePost(this.props.post.id)
        this.props.history.push("/")
    }
    
    render() {
        const post = this.props.post ? (
            <div className="post-contents2">
                <div className="postContainer2">
                    <p>Id:{this.props.post.id} </p>
                    <p>Title:{this.props.post.title}</p>
                    <p>Description:{this.props.post.description}</p>
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
        const user_id  = this.props.auth.user ? (this.props.auth.user.id) : (null);
        const { isAuthenticated } = this.props.auth;
        
        // const check_liked = this.props.check_liked ? (this.props.check_liked) : ("");

        // const like_check = check_liked ? 
        // (<p>The post is liked</p>) : 
        // (<p>The post is not liked</p>); 

        const likeButton = !isAuthenticated ? (
            <Link to ="/login">
                <button>Like</button>
            </Link>
        ) : this.handlecheckLike() ? (<button onClick={this.handleUnlike}>Unlike</button>) : (<button onClick= {this.handleLike}>Like</button>) 

        return (
            <div>
                {post}
                {likeButton}
                { (publisher === user_id) ? 
                (<button onClick={this.handleDelete}>Delete</button>):
                (null)}
                {(this.props.liked) ? (<p>Liked</p>) : (<p>Not liked</p>)} 
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
        liked: state.posts.liked
    };
};

export default connect(mapStateToProps, 
    {likePost, unlikePost, deletePost, checkLike})(withRouter(SinglePost));

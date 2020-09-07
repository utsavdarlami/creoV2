import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import {getSinglePost, likePost, unlikePost, deletePost} from "../../actions/posts";
import { Redirect } from "react-router-dom";

class SinglePost extends Component {
    constructor(){
        super();
        this.handleLike = this.handleLike.bind(this);
        this.handleUnlike = this.handleUnlike.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    static propTypes = {
        likePost: PropTypes.func.isRequired,
        unlikePost: PropTypes.func.isRequired,
    }

    handleLike(){
        this.props.likePost(this.props.post.id);
    }

    handleUnlike(){
    this.props.unlikePost(this.props.post.id);
    }

    handleDelete(){
        this.props.deletePost(this.props.post.id)
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
        console.log(publisher);

        const user_id  = this.props.auth.user ? (this.props.auth.user.id) : (null);
        console.log(user_id);

        return (
            <div>
                {post}
                <button onClick={this.handleLike}>Like</button>
                <button onClick={this.handleUnlike}>Unlike</button>
                { (publisher == user_id) ? 
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
        auth: state.auth
    };
};

export default connect(mapStateToProps, {likePost, unlikePost, deletePost})(SinglePost);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import {deletePost, addComment} from "../../actions/posts";
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

    static propTypes = {
        addComment: PropTypes.func.isRequired
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
        const user_id  = this.props.auth.user ? (this.props.auth.user.id) : (null);
        const postId = this.props.post ? (this.props.post.id) : (null)

        return (
            <div>
                {post}
                <PostAuthor publisher = {publisher} />
                <PostLike postId = {postId}/>
                <PostSave postId = {postId} />
                <CommentForm postId = {postId} />
                <CommentList postId = {postId} />
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
    };
};

export default connect(mapStateToProps, 
    { deletePost, addComment})(withRouter(SinglePost));

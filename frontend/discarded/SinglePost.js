import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getSinglePost,
    likePost,
    unlikePost,
    checkLike} from "../../actions/posts";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

class SinglePost extends Component {
    constructor(){
        super();
        this.state = {
            is_liked_by_user: null
        }
        this.handleLike = this.handleLike.bind(this);
        this.handleUnlike = this.handleUnlike.bind(this);
    }

    static propTypes = {
        post: PropTypes.object,
        getSinglePost: PropTypes.func.isRequired,
        likePost: PropTypes.func.isRequired,
        unlikePost: PropTypes.func.isRequired,
    }

    componentDidMount(){
        const id = this.props.match.params.post_id;
        this.props.getSinglePost(id);
        this.props.checkLike(id);
        setTimeout(() => {
            if (this.props.check_liked.like === true) {
                console.log("check true");
                this.setState({
                    is_liked_by_user : true
                })
            } else {
                console.log("check false");
                this.setState({
                    is_liked_by_user : false
                })
            }
        }, 1000);
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


        const created_at = this.props.post ? this.props.post.created_at : null
        var now = new Date(created_at);
        var gmtDate = now.toLocaleString();
        const like_count = this.props.post? this.props.post.like_count : null;
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

        return (
            <div>
                {this.props.liked}
                <h1>Hello</h1>
                {console.log(this.props.liked)}
                    {post}
                    <p>{likeButton}</p>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    post: state.posts.single_post,
    check_liked: state.posts.check_liked,
    liked: state.posts.liked,
    auth: state.auth
})

export default connect(mapStateToProps,
     {getSinglePost, 
        likePost, 
        unlikePost,
        checkLike})(SinglePost);

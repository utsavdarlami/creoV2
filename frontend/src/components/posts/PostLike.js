import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { likePost, unlikePost, checkLike} from "../../actions/posts"
import {Link} from "react-router-dom";
import PostAuthor from './PostAuthor';

class PostLike extends Component {
    constructor(){
        super();
        this.state = {
            is_liked_by_user: null
        }
        this.handleLike = this.handleLike.bind(this);
        this.handleUnlike = this.handleUnlike.bind(this);
        // this.handlecheckLike = this.handlecheckLike.bind(this);
    }

    static propTypes = {
        postId: PropTypes.number,
        likePost: PropTypes.func.isRequired,
        unlikePost: PropTypes.func.isRequired,
        // getLikedContent: PropTypes.func.isRequired,

    }


    componentDidMount(){
        this.props.checkLike(this.props.postId)
        setTimeout(() => {
            if (this.props.check_liked.like === true) {
                console.log("true");
                this.setState({
                    is_liked_by_user : true
                })
            } else {
                console.log("false");
                this.setState({
                    is_liked_by_user : false
                })
            }
        }, 200);
    }
    

    // handlecheckLike(){
    //         this.props.checkLike(this.props.postId)
    //         setTimeout(() => {
    //             if (this.props.check_liked.like === true) {
    //                 console.log("true");
    //                 this.setState({
    //                     is_liked_by_user : true
    //                 })
    //             } else {
    //                 console.log("false");
    //                 this.setState({
    //                     is_liked_by_user : false
    //                 })
    //             }
    //         }, 500);
    //  }

    handleLike(){
        this.props.likePost(this.props.postId);
        this.setState({
            is_liked_by_user: true
        })
    }

    handleUnlike(){
    this.props.unlikePost(this.props.postId);
    this.setState({
        is_liked_by_user: false
    })
    }  

    render() {
        const { isAuthenticated } = this.props.auth;
        const likeButton = !isAuthenticated ? (
            <Link to ="/login">
                <button>Like</button>
            </Link>
        ) : this.state.is_liked_by_user === true ? 
        (<button onClick={this.handleUnlike}>Unlike</button>) : 
        (<button onClick= {this.handleLike}>Like</button>) 

        return (
            <div>
                {likeButton}
                {/* {this.props.liked} */}
            </div>
        )
    }
}

const mapStateToProps = state => ({
        check_liked: state.posts.check_liked,
        liked: state.posts.liked,
        auth: state.auth
});

export default connect(mapStateToProps,
     {likePost, unlikePost, checkLike})(PostLike);

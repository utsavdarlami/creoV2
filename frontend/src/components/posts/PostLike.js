import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { likePost, unlikePost, checkLike} from "../../actions/posts"
import {Link} from "react-router-dom"

class PostLike extends Component {
    constructor(){
        super();
        this.handleLike = this.handleLike.bind(this);
        this.handleUnlike = this.handleUnlike.bind(this);
        this.handlecheckLike = this.handlecheckLike.bind(this);
    }

    static propTypes = {
        postId: PropTypes.number,
        likePost: PropTypes.func.isRequired,
        unlikePost: PropTypes.func.isRequired,
    }

    
    handlecheckLike(){
            this.props.checkLike(this.props.postId)
            if (this.props.check_liked.like === true) {
                return true;
            } else {
                return false;
            }
     }
    

    handleLike(){
        this.props.likePost(this.props.postId);
    }

    handleUnlike(){
    this.props.unlikePost(this.props.postId);
    }  

    render() {
        const { isAuthenticated } = this.props.auth;

        const likeButton = !isAuthenticated ? (
            <Link to ="/login">
                <button>Like</button>
            </Link>
        ) : this.handlecheckLike() ? 
        (<button onClick={this.handleUnlike}>Unlike</button>)
         : (<button onClick= {this.handleLike}>Like</button>) 
        return (
            <div>
                {likeButton}
            </div>
        )
    }
}


const mapStateToProps = state => ({
        check_liked: state.posts.check_liked,
        liked: state.posts.liked,
        auth: state.auth,
});

export default connect(mapStateToProps, {likePost, unlikePost, checkLike})(PostLike);

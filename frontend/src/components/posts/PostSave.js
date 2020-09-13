import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { savePost,
    unsavePost,
    checkSave} from "../../actions/posts"
import {Link} from "react-router-dom"

class PostSave extends Component {
    constructor(){
        super();
        this.handleSave = this.handleSave.bind(this);
        this.handleUnSave = this.handleUnSave.bind(this); 
        this.handlecheckSave = this.handlecheckSave.bind(this);
    }

    static propTypes = {
        postId: PropTypes.number,
        savePost: PropTypes.func.isRequired,
        unsavePost: PropTypes.func.isRequired,
    }

    
    handlecheckSave(){
            this.props.checkSave(this.props.postId)
            if (this.props.check_saved) {
                return true;
            } else {
                return false;
            }
    }

    handleSave(){
        this.props.savePost(this.props.postId);
    }

    handleUnSave(){
        this.props.unsavePost(this.props.postId);
    }

    render() {
        const { isAuthenticated } = this.props.auth;
        const saveButton = !isAuthenticated ? (
            <Link to="/login">
                <button>Save</button>
            </Link>) : this.handlecheckSave() ? 
            (<button onClick={this.handleUnSave}>Unsave</button>) 
            : (<button onClick= {this.handleSave}>Save</button>) 
        return (
            <div>
                {saveButton}
                {this.props.is_saved}
            </div>
        )
    }
}


const mapStateToProps = state => ({
        check_saved: state.posts.check_saved,
        auth: state.auth,
        is_saved: state.posts.is_saved
});

export default connect(mapStateToProps, {savePost, unsavePost, checkSave})(PostSave);

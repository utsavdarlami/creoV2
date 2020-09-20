import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { addComment } from "../../actions/posts"

class CommentForm extends Component {
    constructor(){
        super();
        this.state = {
            comment: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    static propTypes  = {
        addComment: PropTypes.func.isRequired,
        postId: PropTypes.number
    }

    handleChange(event){
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit(event){
        event.preventDefault();
        const post_id = this.props.postId
        const comment = this.state.comment

        const newComment = {
            post_id,
            comment
        }

        this.props.addComment(newComment);
        this.setState({
            comment : ""
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <textarea 
                        type="text"
                        value={this.state.comment}
                        name="comment"
                        onChange = {this.handleChange}
                        className="textarea"
                        placeholder="Add a comment"
                         />
                    <button style={{marginLeft: "2%"}}>Submit</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {addComment})(CommentForm);

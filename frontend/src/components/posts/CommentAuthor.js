import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCommentAuthor } from "../../actions/auth";

class CommentAuthor extends Component {
    static propTypes = {
        publisher: PropTypes.number,
        getCommentAuthor: PropTypes.func.isRequired
    }

    componentDidMount(){
            const publisher = this.props.publisher;
            this.props.getCommentAuthor(publisher)
    }

    render() {
        const username = this.props.comment_author ? (this.props.comment_author.username) : (null)
        const author_id = this.props.comment_author ? (this.props.comment_author.id) : (null)
        console.log(author_id)
        return (
            <div>
                {username}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    comment_author: state.auth.comment_author
})

export default connect(mapStateToProps, {getCommentAuthor})(CommentAuthor);

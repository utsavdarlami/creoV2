import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { getComments } from "../../actions/posts"
import {withRouter} from "react-router-dom"

class CommentList extends Component {

    static propTypes = {
        getComments: PropTypes.func.isRequired,
    }

    componentDidMount(){
        const id = this.props.match.params.post_id
            this.props.getComments(id)
    }

    render() {
        return (
            <div>
                {((this.props.post_comments).length !== 0) ? 
                (                
                <div>            
                    {this.props.post_comments.map(post_comment => (
                    <div key={post_comment.id}>
                     <p>Comment: {post_comment.comment}</p>
                     </div>
                ))}
            </div>)
     : (null)}
                <p>Post comments: </p>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    post_comments : state.posts.post_comments
})

export default connect(mapStateToProps, {getComments})(withRouter(CommentList));

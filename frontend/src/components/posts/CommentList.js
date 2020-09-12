import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { getComments } from "../../actions/posts"

class CommentList extends Component {
    constructor(){
        super();
        // this.seeComments = this.seeComments.bind(this);
    }

    static propTypes = {
        postId: PropTypes.number,
        getComments: PropTypes.func.isRequired,
    }

    componentDidMount(){
        if(this.props.post_comments){
            this.props.getComments(this.props.postId)
        }
        
    }

    // seeComments(){
    //     this.props.getComments(this.props.postId);
    // }

    render() {
        console.log(this.props.postId);
        return (
            <div>
                {/* <button onClick={this.seeComments}>See comments:</button> */}
                
                {((this.props.post_comments).length != 0) ? 
                (                
                <div>            
                    {this.props.post_comments.map(post_comment => (
                    <div key={post_comment.id}>
                     <p>Comment: {post_comment.comment}</p>
                    <span>{console.log(post_comment.id)}</span>
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

export default connect(mapStateToProps, {getComments})(CommentList);

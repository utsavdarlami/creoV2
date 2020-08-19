import React, {Component, Fragment} from "react"
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getaPost} from "../../actions/posts"

class Posts extends Component{
    static propTypes = {
        posts: PropTypes.array.isRequired,
        getaPost: PropTypes.func.isRequired
    }

    componentDidMount(){
        this.props.getaPost();
    }
    
    render(){
        return(
            <div>
                <p>Here you will be able to see posts posted by you</p>
            <Fragment>
            <h2>Posts</h2>
            <div>
                { this.props.posts.map(post => (
                    <div className="postContainer" key={post.id}>
                        <p>Id: {post.id}</p>
                        <p>Title: {post.title}</p>
                        <p>Description: {post.description}</p>
                        <img className="post-image" src = {post.content} />
                    </div>
                )) }
            </div>
        </Fragment>
            </div>
        );
    }
}

const mapStateToProps = state => ({
posts: state.posts.posts
});

export default connect(mapStateToProps, {getaPost})(Posts);
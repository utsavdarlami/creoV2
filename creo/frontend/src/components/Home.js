import React, {Component, Fragment} from "react"
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPosts} from "../actions/posts"

class Home extends Component{
    static propTypes = {
        posts: PropTypes.array.isRequired,
        getPosts: PropTypes.func.isRequired
    }

    componentDidMount(){
        this.props.getPosts();
    }

    render(){
        return(
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
        );
    }
}

const mapStateToProps = state => ({
    posts: state.posts.posts
});

export default connect(mapStateToProps, {getPosts})(Home);
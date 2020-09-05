import React, {Component, Fragment} from "react"
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPosts} from "../actions/posts"
import { Link } from "react-router-dom";
import Post from "./posts/Post"

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
                <div className="post-contents"> 
                    { this.props.posts.map(post => <Post key={post.id} post={post} />
                    ) }
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    posts: state.posts.posts
});

export default connect(mapStateToProps, {getPosts})(Home);
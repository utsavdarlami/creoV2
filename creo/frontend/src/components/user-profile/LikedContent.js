import React, {Component, Fragment} from "react"
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getLikedContent} from "../../actions/posts"
import { Link } from "react-router-dom"

class LikedContent extends Component {
    static propTypes = {
        liked_posts: PropTypes.array.isRequired,
        getLikedContent: PropTypes.func.isRequired
    }

    componentDidMount(){
        this.props.getLikedContent();
    }

    render() {
        return (
            <div>
                <h3>Content liked by you!</h3>
                <div className="post-contents">
                        { this.props.liked_posts.map(liked_post => (
                            <div className="postContainer" key={liked_post.post.id}>
                                <p>Id: {liked_post.post.id}</p>
                                <p>Title: {liked_post.post.title}</p>
                                <p>Description: {liked_post.post.description}</p>
                                <img className="post-image" src = {liked_post.post.content} />
                                <span>{console.log(liked_post.post.title)}</span>
                            </div>
                        )) }
                    </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    liked_posts: state.posts.liked_posts
});

export default connect(mapStateToProps, {getLikedContent})(LikedContent);

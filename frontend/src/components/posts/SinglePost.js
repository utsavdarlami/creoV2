import React, { Component } from 'react';
import { connect } from 'react-redux';

class SinglePost extends Component {
<<<<<<< HEAD
=======
    constructor() {
        super();
        this.handleLike = this.handleLike.bind(this);
        this.handleUnlike = this.handleUnlike.bind(this);
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        likePost: PropTypes.func.isRequired,
        unlikePost: PropTypes.func.isRequired,
    };

    componentDidMount() {
        //id =  get from url
        // this.props.getDetailPost(id)
        console.log("get Detail Post")
    }
    
    handleLike() {
        this.props.likePost(this.props.post.id);
    }

    handleUnlike() {
        this.props.unlikePost(this.props.post.id);
    }

>>>>>>> 1a31b8131b94ec86f667b10e647f37b03e20674f
    render() {
        const post = this.props.post ? (
            <div className="post-contents2">
                <div className="postContainer2">
                    <p>Id:{this.props.post.id} </p>
                    <p>Title:{this.props.post.title}</p>
                    <p>Description:{this.props.post.description}</p>
                    <img className="post-image" src={this.props.post.content} alt="content" />
                </div>
            </div>
        ) : (
            <div>
                <p>Loading post...</p>
            </div>
        );

        return (
            <div>
                {post}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.post_id;
    console.log(id);
    return {
        post: state.posts.posts.find(post => post.id === parseInt(id)),
    };
};

export default connect(mapStateToProps)(SinglePost);

import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPostAuthor } from "../../actions/auth"

class PostAuthor extends Component {
    constructor(){
        super();
        // this.props.getUser = this.props.getUser.bind(this);
    }
    
    static propTypes = {
        publisher: PropTypes.number,
        getPostAuthor: PropTypes.func.isRequired
    }

    componentDidMount(){
        const publisher = this.props.publisher;
        this.props.getPostAuthor(publisher)
    }

    render() {
        const author = this.props.post_author ? (this.props.post_author.username) : (null)
        return (
            <div>
                <p>Post author: {author}</p>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    post_author: state.auth.post_author
})

export default connect(mapStateToProps, {getPostAuthor})(PostAuthor);

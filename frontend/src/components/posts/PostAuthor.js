import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPostAuthor } from "../../actions/auth";
import { Link } from "react-router-dom";


class PostAuthor extends Component {
    static propTypes = {
        publisher: PropTypes.number,
        getPostAuthor: PropTypes.func.isRequired
    }

    componentDidMount(){
            const publisher = this.props.publisher;
            this.props.getPostAuthor(publisher)
    }

    render() {
        const username = this.props.post_author ? (this.props.post_author.username) : (null)
        const author_id = this.props.post_author ? (this.props.post_author.id) : (null)
        return (
            <span style={{fontSize: "1.5em", fontWeight: "bold"}}>
                <Link key={author_id} to={`/users/${author_id}`} style={{textDecoration: "none"}}>
                    {username}
                </Link>
            </span>
        )
    }
}

const mapStateToProps = state => ({
    post_author: state.auth.post_author,
    check_liked: state.posts.check_liked
})

export default connect(mapStateToProps, {getPostAuthor})(PostAuthor);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPost } from '../../actions/posts';
import { withRouter } from "react-router-dom"

class PostForm extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      content: null,
      post_type: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static propTypes = {
    addPost: PropTypes.func.isRequired,
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleImageChange(event) {
    this.setState({
      content: event.target.files[0],
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { title, description, content, post_type } = this.state;
    const form_data = new FormData();
    form_data.append('content', content);
    form_data.append('title', title);
    form_data.append('description', description);
    form_data.append('post_type', post_type);
    const post = form_data;
    this.props.addPost(post);
    this.setState({
      title: '',
      description: '',
      content: null,
      post_type: ''
    });
    setTimeout(() => {
      this.props.history.push("/profile");
    }, 2000);
  }

  render() {
    const { title, description, post_type} = this.state;
    return (
      <div className="post-form">
        <h2>Post Form:</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Title:</label>
          <input
            className="post-form-components"
            type="text"
            value={title}
            name="title"
            placeholder="Enter the title here"
            onChange={this.handleChange}
          />

          <label>Description:</label>
          <input
            className="post-form-components"
            type="text"
            value={description}
            name="description"
            onChange={this.handleChange}
            placeholder="Enter the description"
          />

          <label>Content</label>
          <input
            className="post-form-components"
            type="file"
            name="content"
            onChange={this.handleImageChange}
            placeholder="Select a file"
          />

          <label>Post Type:</label>
          <div>
            <label>
              <input 
                type="radio"
                name="post_type"
                value="I"
                checked={post_type === "I"}
                onChange= {this.handleChange} />
                {' '}
                Image
            </label>

            <label>
              <input 
                type="radio"
                name="post_type"
                value="V"
                checked={post_type === "V"}
                onChange={this.handleChange} 
                />
                {' '} 
                Video
            </label>

            <label>
              <input
                type="radio"
                name="post_type"
                value="A"
                checked={post_type === "A"}
                onChange = {this.handleChange}
               />
               {' '}
               Audio
            </label>
          </div>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default connect(null, { addPost })(withRouter(PostForm));

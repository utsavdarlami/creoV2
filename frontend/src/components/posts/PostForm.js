import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPost } from '../../actions/posts';
import { withRouter } from "react-router-dom";
import {Button} from "react-bootstrap";

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
    }, 1000);
  }

  render() {
    const { title, description, post_type} = this.state;
    return (
      <div className="post-submission-component">
        <h3>Publish Your Work</h3>
        <form className="post-form">
          <div className="post-form-component">
            <label>Title:</label>
            <br />
            <input
              type="text"
              value={title}
              name="title"
              placeholder="Enter the title here"
              onChange={this.handleChange}
              required
            />
          </div>

        <div className="post-form-component">
        <label>Description:</label>
        <br />
          <input
            type="text"
            value={description}
            name="description"
            onChange={this.handleChange}
            placeholder="Enter the description"
            required
          />
        </div>

      <div className="post-form-component" >
      <label>Content</label>
      <br />
          <input
            type="file"
            name="content"
            onChange={this.handleImageChange}
            placeholder="Select a file"
            style={{border: "none"}}
          />
      </div>

        <div className="post-form-component">
        <label>Post Type:</label>
        <br />
          <div className="post-form-radio">
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
        </div>
          
          <Button variant="success"
           onClick={this.handleSubmit}
           style={{width: "25%", backgroundColor: "#f45702", borderColor: "#f45702" }}
           >Submit</Button>
        </form>
      </div>
    );
  }
}

export default connect(null, { addPost })(withRouter(PostForm));

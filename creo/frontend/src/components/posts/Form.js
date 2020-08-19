import React, {Component} from "react"
import { connect } from "react-redux";
import { addPost } from '../../actions/posts';
import PropTypes from "prop-types"

class Form extends Component{
    constructor(){
        super();
        this.state = {
            title: "",
            description: "",
            content: null
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleImageChange = this.handleImageChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    static propTypes = {
        addPost: PropTypes.func.isRequired
    }

    handleChange(event){
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleImageChange(event){
        this.setState({
            content: event.target.files[0]
        })
    }
    handleSubmit(event) {
        event.preventDefault();
        const { title, description, content} = this.state;
        const post = {title, description, content};
        this.props.addPost(post);
        this.setState({
            title: "",
            description: "",
            content: ""
        })
    }

    render(){
        const { title, description, content} = this.state;
        return(
            <div>
                <h2>Post Form:</h2>
                <form onSubmit = {this.handleSubmit}>
                    <label>Title:</label>
                    <input 
                        type="text"
                        value={title}
                        name= "title"
                        placeholder="Enter the title here"
                        onChange = {this.handleChange}
                     />
                    
                    <label>Description:</label>
                    <input
                        type="text"
                        value={description}
                        name="description"
                        onChange = {this.handleChange}
                        placeholder = "Enter the description"
                    />

                    <label>Content</label>
                    <input
                        type="file"
                        name="content"
                        onChange = {this.handleImageChange}
                        placeholder = "Select a file"
                    />
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default connect(null, { addPost })(Form);
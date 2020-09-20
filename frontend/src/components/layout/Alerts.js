import React, {Component, Fragment } from 'react';
import {withAlert} from "react-alert";

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import { addLead }  from '../../actions/leads';

export class Alerts extends Component{

    static propTypes = {
        error : PropTypes.object.isRequired,
        message : PropTypes.object.isRequired
    };

    componentDidUpdate(prevProps){
        const {error,alert,message} = this.props;
        if(error !== prevProps.error){
            //alert.error("There is an error");
            if(error.msg.name){
                alert.error(`Name : ${error.msg.name.join()}`);
            }
            if(error.msg.email){
                alert.error(`Email: ${error.msg.email.join()}`);
            }
            if(error.msg.message){
                alert.error(`message: ${error.msg.message.join()}`);
            }
            if(error.msg.non_field_errors){
                alert.error(`message: ${error.msg.non_field_errors.join()}`);
            }
            if(error.msg.username){
                alert.error(`message: ${error.msg.username.join()}`);
            }
            if(error.msg.profile_pic){ 
                alert.error(`message: ${error.msg.profile_pic.join()}`);
            }
            if(error.msg.Content_Type){ 
                alert.error(`message: ${error.msg.Content_Type.join()}`);
            }
            if(error.msg.content){ 
                alert.error(`message: ${error.msg.content.join()}`);
            }
            if(error.msg.post_type){ 
                alert.error(`message: post_type ${error.msg.post_type.join()}`);
            }
            if(error.msg.detail){ 
                alert.error(`message: Not Authorized, Please Login`);
            }
            else{
                alert.error(`message: ${error.msg}`);
            }
        }
        if(message !== prevProps.message){
            if(message.Login){
                alert.success(`${message.Login}`);
            }
            if(message.Logout){
                alert.success(`${message.Logout}`);
            }
            if(message.Register){
                alert.success(`${message.Register}`);
            }
            if(message.UpdateUserInfo){
                alert.success(`${message.UpdateUserInfo}`);
            }
            if(message.AddPost){
                alert.success(`${message.AddPost}`);
            }
            if(message.DeletePost){
                alert.success(`${message.DeletePost}`);
            }
            if(message.Saved){
                alert.success(`${message.Saved}`);
            }
            if(message.Unsaved){
                alert.success(`${message.Unsaved}`);
            }
        }
    }

    render(){
        return <Fragment/>;
    }

}

const mapStateToProps = state => ({
    error : state.errors,
    message : state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));


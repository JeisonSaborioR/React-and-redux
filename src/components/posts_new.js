import React, { Component } from 'react';
import  { Field, reduxForm } from 'redux-form';
import  { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { createPost } from '../actions'
class PostsNew extends Component {
    renderField(field){
        
        const { meta: {touched, error} } = field;
        return(
            <div className="form-group has-danger">
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''} 
                </div>           
            </div>
        )
    }

    onSubmit(values){
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
        
    }
    

    render(){
        const { handleSubmit } = this.props;

        return(
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title"
                    name="title"
                    component={this.renderField}  
                />
                <Field
                    label="Tags"
                    name="tags"
                    component={this.renderField}
                
                />
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                
                />
                <button type="submit" className="btn btn-primary"> Add post</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        )
    }
}
function validate(values) {
    const errors ={}
    if(!values.title){
        errors.title = "Enter a title!!";
    }
    if(!values.tags){
        errors.tags = "Enter some tags!!";
    }
    if(!values.content){
        errors.content = "Enter some content!!";
    }
    return errors;
}
export default reduxForm({
    validate,
    form:'PostNewForm'
}) (
    connect(null, { createPost })(PostsNew)
);

import React,  { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {

    renderField(field) {//param field contain some event handlers to wire up to the jsx that we're returning
    const { meta: {touched, error} } = field;//destructuring to access properties on nested objects for refactor
        const className = `form-group ${touched && error ? 'alert alert-danger' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                {touched ? error : ''}
            </div>
        );
    }

    renderTagsField(field){
        return(
            <div className="form-group">

            </div>
        );
    }

    onSubmit(values) {
        //this === component        
       this.props.createPost(values, () => {
            this.props.history.push('/');
       });
    }

    render() {

        const { handleSubmit } = this.props;

        return(
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        )
    }
}

function validate(values){//helper function
    const errors = {};

    //validate the inputs from 'values'
    if(!values.title){
        errors.title = "Enter a title !";
    }
    if(!values.categories){
        errors.categories = "Enter a categories !";
    }
    if(!values.content){
        errors.content = "Enter a content !";
    }

    //if errors is empty, the form is fine to submit
    //if errors as any property, redux form assume form is invalid
    return errors;
}

export default reduxForm({
    validate:validate,
    form:'PostsNewForm'   //name must be unique (in case of several form it's usefull), and could be whatever string we want. 
})(
    connect(null, { createPost })(PostsNew)
);

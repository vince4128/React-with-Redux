import React,  { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component {
    render() {
        return(
            <form>
                <Field
                    name="title"
                    component={}
                />
            </form>
        )
    }
}

export default reduxForm({
    form:'PostsNewForm'   //name must be unique, and could be whatever string we want. 
})(PostsNew);

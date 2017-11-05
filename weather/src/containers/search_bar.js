import React, { Component } from 'react';

export default class SearchBar extends Component {

    constructor(props){
        super(props);

        this.state = { term: ''};

        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(event){
        console.log(event.target.value);
        this.setState({ term: event.target.value});
    }

    onFormSubmit(event){
        event.preventDefault();
        
    }

    render(){
        return (
            <form onSubmit={this.onFormSubmit} className="input-group">
                <input 
                    className="form-control"
                    placeholder="prévision météo pour vos villes préférées."
                    value={this.state.value}
                    onChange={this.onInputChange}
                />
                <span className="input-group-btn">
                    <button type="submit" className="btn btn-secondary">Submit</button>
                </span>
            </form>
        );
    }
}
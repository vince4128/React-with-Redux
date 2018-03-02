import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

class PostsIndex extends Component {

    componentDidMount(){
        this.props.fetchPosts();
    }

    renderPosts(){
        return _.map(this.props.posts, post => {
            return(
                <li className="list-group-item" key={post.id}>
                    <h3>{post.title}</h3>
                </li>
            )
        });
    }

    render() {
        return(
            <div>
                <h3>Posts</h3>
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
                {JSON.stringify(this.props.posts)}
            </div>
        );
    }
}

function mapStateToProps(state){
    return { posts: state.posts};
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
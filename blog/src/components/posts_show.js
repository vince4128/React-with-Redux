import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component{

    componentDidMount(){
        //vérifier si le post est déjà en mémoire
        const { id } = this.props.match.params;
        this.props.fetchPost(id);
    }

    onDeleteClick(){
        const { id } = this.props.match.params;
        this.props.deletePost(id, ()=>{
            this.props.history.push('/');
        });
    }

    helperFunction() {
        this.props.posts[this.props.match.params.id];
    }

    render(){
        const { post } = this.props;

        if (!post) {
            return <div>Loading...</div>;
          }

        return(
            <div>
                <Link to="/">Back to Index</Link>
                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}
                >
                    Delete Post
                </button>
                <h3>{post.title}</h3>
                <h6>Categories : {post.category}</h6>
                <p>{post.body}</p>  
            </div>
        )
    }
}

function mapStateToProps({ posts }, ownProps){//ownProps === component props
    return { post:posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
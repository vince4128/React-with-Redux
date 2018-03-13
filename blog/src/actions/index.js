import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const CREATE_POST = 'create_post';

const ROOT_URL = 'http://localhost:3000/blogpost';
//const API_KEY = '?key=xxxx';

export function fetchPosts() {

    const request = axios.get(`${ROOT_URL}`);
    
    /*request.then(function(r){
        alert('requete !' + JSON.stringify(r.data));
    })*/

    return {
        type: FETCH_POSTS,
        payload: request
    };
}

export function createPost(values, callback){
    const request = axios.post(`${ROOT_URL}`, values)
    .then(() => callback());

    return{
        type: CREATE_POST,
        payload: request
    } 
}
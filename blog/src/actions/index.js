import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';

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
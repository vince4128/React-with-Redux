import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

export default function(state = {}, action){
    switch(action.type) {

        case DELETE_POST:
            return _.omit(state, action.payload.id);

        case FETCH_POST:
            /*const post = action.payload.data;
            const newState = { ...state, };
            newState[post._id] = post;
            return newState;*/
            //or we can do :
            
            //return the state that we already have
            return { ...state, [action.payload.data._id]: action.payload.data };

        case FETCH_POSTS:
            return _.mapKeys(action.payload.data, "_id");
            
        default: return state;

    }
}
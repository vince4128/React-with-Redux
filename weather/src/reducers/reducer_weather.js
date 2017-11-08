import { FETCH_WEATHER } from "../actions/index";

export default function(state = [], action) {
    switch(action.type) {
        case FETCH_WEATHER:
        //return state.concat([action.payload.data]); //es5 syntax
        //make new array, put action data inside of it and then
        //take the other var (state in our case) array so take all the entries in it
        // and insert it into the new outside array
        return [action.payload.data, ...state];//[city, city, city] NOT [city, [city, city, city]]
        //never mutate state !
        //create entirely new array and return that instead
    }

    return state;
}
import * as actions from "./actions";
import {combineReducers} from "redux";

const INITIAL_STATE = {
    darkThemeEnabled: false,
    last_search: [],
}

const preferences = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actions.TOGGLE_DARKTHEME:
            console.log(state)
            return {
                ...state,
                darkThemeEnabled: !state.darkThemeEnabled
            };
        case actions.ADD_TO_LIST:
            let id = action.payload.id;
            // console.log(id)
            if(!state.last_search){
                state.last_search=[]
            }
            state.last_search.unshift(id)
            let last_search_set = new Set(state.last_search)
            console.log(last_search_set)
            let mylist = [];
            last_search_set.forEach(v => mylist.push(v));
            while(mylist>3){
                mylist.pop()
            }
            // console.log(state)

            return {
                ...state,
                last_search: mylist
            };
            // return state
        default:
            return state;
    }
};

export default combineReducers({preferences});


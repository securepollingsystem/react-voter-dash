import { combineReducers } from 'redux'
import { omit } from "lodash";


const keys = function(state = {}, action) {
    switch (action.type) {
        case "SET_KEYS":
            return Object.assign({}, state, action.keys);
        case "REMOVE_KEYS":
            return {};
        default:
            return state;
    }
}

export default combineReducers({
    keys
});

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

const blindSignatures = function(state = {}, action) {
    switch (action.type) {
        case "SET_R":
            return Object.assign({}, state, {r: action.r});
        case "REMOVE_R":
            return {};
        default:
            return state;
    }
}



const bookings = function(state = {}, action) {
    switch (action.type) {
        case "SET_BOOKING":
            return Object.assign({}, state, {booking: action.booking});
        case "REMOVE_BOOKING":
            return {};
        default:
            return state;
    }
}

export default combineReducers({
    keys,
    blindSignatures,
    bookings
});

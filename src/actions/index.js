
export const setKeys = function(keys) {
    return {
        type: "SET_KEYS",
        keys
    };
};

export const removeKeys = function() {
    return {
        type: "REMOVE_KEYS"
    };
}

export const setBooking = function(booking) {
    return {
        type: "SET_BOOKING",
        booking
    };
}


//let nextTodoId = 0
//export const addTodo = text => ({
//  type: 'ADD_TODO',
//  id: nextTodoId++,
//  text
//})
//
//export const setVisibilityFilter = filter => ({
//  type: 'SET_VISIBILITY_FILTER',
//  filter
//})
//
//export const toggleTodo = id => ({
//  type: 'TOGGLE_TODO',
//  id
//})
//
//export const VisibilityFilters = {
//  SHOW_ALL: 'SHOW_ALL',
//  SHOW_COMPLETED: 'SHOW_COMPLETED',
//  SHOW_ACTIVE: 'SHOW_ACTIVE'
//}

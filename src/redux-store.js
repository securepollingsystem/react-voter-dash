import { createStore } from 'redux'
import rootReducer from './reducers'
import {saveState, loadState} from "./localStorage";

import {throttle} from "lodash";

const persistedState = loadState();
console.log("persistdState", persistedState);

const store = createStore(rootReducer, persistedState);


store.subscribe(throttle(function() {
    saveState(store.getState());
}, 1000));


export default store;

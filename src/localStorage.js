import { LOCAL_STORAGE_KEY } from "./constants";

export const loadState = function() {
    try {
        const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        console.error("ERROR", error);
        alert("An error has occured.  Please contact support.\n" + error.name + "\n" + error.message);
        throw error;
    }
}

export const saveState = function(state) {
    console.log("saving state to local storage");
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
    } catch(error) {
        console.error("ERROR", error);
        alert("An error has occured.  Please contact support.\n" + error.name + "\n" + error.message);
        throw error;
    }
}

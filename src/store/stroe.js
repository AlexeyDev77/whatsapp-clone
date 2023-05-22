import {createStore} from "redux";

const defaultState = {
    id: '',
    apiToken: '',
    selectedPhone: ''
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case "SET_ID":
            return {...state, id: action.payload}
        case "SET_TOKEN":
            return {...state, apiToken: action.payload}
        case "SET_SELECTED_PHONE":
            return {...state, selectedPhone: action.payload}
        default:
            return state
    }
}


export const store = createStore(reducer)
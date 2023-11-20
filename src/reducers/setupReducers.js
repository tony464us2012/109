import { GET_SETUP_REQUEST, 
         GET_SETUP_SUCCESS, 
         GET_SETUP_FAIL, 
         UPDATE_SETUP_REQUEST,
         UPDATE_SETUP_SUCCESS,
         UPDATE_SETUP_FAIL,
 } from "../actions/types";

export const setupReducer = (state = {setup: {}}, action) => {
    switch (action.type) {
        case GET_SETUP_REQUEST:
            return { loading: true }
        case GET_SETUP_SUCCESS:
            return { loading: false, success: true, setup: action.payload }
        case GET_SETUP_FAIL:
        return { loading: false, error: action.payload}
        default: 
            return state
    }
}

export const setupUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_SETUP_REQUEST:
            return { loading: true }
        case UPDATE_SETUP_SUCCESS:
            return { loading: false, success: true, setup: action.payload }
        case UPDATE_SETUP_FAIL:
        return { loading: false, error: action.payload}
        default: 
            return state
    }
}
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    MY_ORDERS_RESET,
    GET_ORDERS_REQUEST,
    GET_ORDERS_SUCCESS,
    GET_ORDERS_FAIL,
    ORDER_DETAILS_RESET,
    ORDER_REFUND_REQUEST,
    ORDER_REFUND_SUCCESS,
    ORDER_REFUND_FAIL,
    ORDER_REFUND_RESET,
    ORDER_CREATE_CLEAR,
} from '../actions/types'

export const orderCreateReducer = (state= {}, action) => {
    switch(action.type) {
        case ORDER_CREATE_REQUEST:
            return{
                loading: true
            }
        case ORDER_CREATE_SUCCESS:
        return {
            loading: false,
            success: true,
            order: action.payload
        }
        case ORDER_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ORDER_CREATE_CLEAR: 
            return {
                order: []
            }
         default: 
            return state
    }
}
export const orderDetailsReducer = (state= {loading: false, order: []}, action) => {
    switch(action.type) {
        case ORDER_DETAILS_REQUEST:
            return{
                ...state,
                loading: true
            }
        case ORDER_DETAILS_SUCCESS:
        return {
            loading: false,
            order: action.payload
        }
        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ORDER_DETAILS_RESET: 
            return {
                loading: false,
                order: []
            }
        
         default: 
            return state
    }
}
export const myOrdersReducer = (state= { orders: []}, action) => {
    switch(action.type) {
        case MY_ORDERS_REQUEST:
            return{
                loading: true
            }
        case MY_ORDERS_SUCCESS:
        return {
            loading: false,
            orders: action.payload
        }
        case MY_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case MY_ORDERS_RESET: 
            return {
                orders: []
            }
         default: 
            return state
    }
}
export const getOrdersReducer = (state= { orders: []}, action) => {
    switch(action.type) {
        case GET_ORDERS_REQUEST:
            return{
                loading: true
            }
        case GET_ORDERS_SUCCESS:
        return {
            loading: false,
            orders: action.payload
        }
        case GET_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
         default: 
            return state
    }
}

export const refundReducer = (state = {}, action) => {
    switch(action.type) {
        case ORDER_REFUND_REQUEST: 
        return {
            loading: true
        }
        case ORDER_REFUND_SUCCESS: 
        return {
            loading: false,
            refund: action.payload
        }
        case ORDER_REFUND_FAIL: 
        return {
            loading: false,
            error: action.payload
        }
        case ORDER_REFUND_RESET: 
        return {}
        default: return state
    }
}

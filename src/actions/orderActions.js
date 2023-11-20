import axios from 'axios'
import { ORDER_CREATE_REQUEST, 
        ORDER_CREATE_SUCCESS, 
        ORDER_CREATE_FAIL, 
        ORDER_DETAILS_REQUEST, 
        ORDER_DETAILS_SUCCESS, 
        ORDER_DETAILS_FAIL, 
        MY_ORDERS_REQUEST, 
        MY_ORDERS_SUCCESS, 
        MY_ORDERS_FAIL, 
        GET_ORDERS_REQUEST, 
        GET_ORDERS_SUCCESS,
         GET_ORDERS_FAIL,
         GET_SETUP_SUCCESS,
         UPDATE_SETUP_SUCCESS,
         UPDATE_SETUP_FAIL,
         UPDATE_SETUP_REQUEST,
         GET_SETUP_REQUEST,
         GET_SETUP_FAIL,
         ORDER_REFUND_REQUEST,
         ORDER_REFUND_SUCCESS,
         ORDER_REFUND_FAIL,
         CART_RESET_ITEM, 
        } from './types'

export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`/api/orders`, order, config)

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })
        localStorage.removeItem('cartItems')
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL, 
            payload: error.response.data.msg
        })
        
    }
}
export const guestOrder = (order) => async (dispatch) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`/api/orders/guest`, order, config)

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })
        localStorage.removeItem('cartItems')
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL, 
            payload: error.response.data.msg
        })
        
    }
}
// error.response && error.response.data.message ? error.response.data.message : error.message
export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })
        
        const { userLogin: { user }} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
        const { data } = await axios.get(`/api/orders/${id}`, config)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })
        
        dispatch({
            type: CART_RESET_ITEM,
        })
        
        localStorage.removeItem('cartItems')

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
export const myOrders = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: MY_ORDERS_REQUEST
        })
        
        const { userLogin: { user }} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
        const { data } = await axios.get(`/api/orders/myorders/${id}`, config)

        dispatch({
            type: MY_ORDERS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: MY_ORDERS_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
export const getOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_ORDERS_REQUEST
        })
        
        const { userLogin: { user }} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
        const { data } = await axios.get(`/api/orders`, config)

        dispatch({
            type: GET_ORDERS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_ORDERS_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
export const getSetup = () => async (dispatch) => {
    try {
        dispatch({ type: GET_SETUP_REQUEST })

        const { data } = await axios.get(`/api/setup`)

        dispatch({
            type: GET_SETUP_SUCCESS, 
            payload: data
        })
      
    } catch (error) {
        dispatch({
            type: GET_SETUP_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
export const updateSetup = (setup) => async (dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_SETUP_REQUEST
        })
        
        const { userLogin: { user }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }
        const { data } = await axios.put(`/api/setup`, setup, config)


        dispatch({
            type: UPDATE_SETUP_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_SETUP_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }}

export const refundOrder = (refund) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_REFUND_REQUEST
        })
        
        const { userLogin: { user }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }
        const { data } = await axios.put(`/api/orders/refund`, refund, config)


        dispatch({
            type: ORDER_REFUND_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_REFUND_FAIL, 
            payload: 'Refund Fail'
        })
    }}
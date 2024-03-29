import axios from 'axios'
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_CREATE_RESET, PRODUCT_UPDATE_RESET } from './types'

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })

        const { data } = await axios.get(`https://one09-api.onrender.com/api/products`)

        dispatch({
            type: PRODUCT_LIST_SUCCESS, 
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`https://one09-api.onrender.com/api/products/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS, 
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })
        
        const { userLogin: { user }} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
       const { data } = await axios.delete(`https://one09-api.onrender.com/api/products/${id}`, config)

        dispatch({
            type: PRODUCT_DELETE_SUCCESS
        })
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })
        
        const { userLogin: { user }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }
        const { data } = await axios.post(`https://one09-api.onrender.com/api/products`, {id: user._id}, config)

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        })
        
        const { userLogin: { user }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }
        const { data } = await axios.put(`https://one09-api.onrender.com/api/products/${product._id}`, product, config)

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS
        })
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }}
    export const clearCreate = () => (dispatch) => {
        dispatch({
            type: PRODUCT_CREATE_RESET
        })
        dispatch({
            type: PRODUCT_UPDATE_RESET
        })
    }
 
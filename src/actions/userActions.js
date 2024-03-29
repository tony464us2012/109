import axios from 'axios'
import Cookies from 'universal-cookie'
import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LIST_RESET, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, MY_ORDERS_RESET, USER_LIST_FAIL, USER_LIST_SUCCESS, USER_LIST_REQUEST, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL } from "./types"

export const login = ({email, password}) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('https://one09-api.onrender.com/api/users/login', { email, password }, config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        const cookies = new Cookies()
        cookies.set('user', data)

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL, 
            payload: 'Invalid Email or Password'
        })
    }
}

export const logout = () => (dispatch) => {
    
    const cookies = new Cookies()
    cookies.remove('user')
    cookies.remove('userDetails')
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: MY_ORDERS_RESET })
    dispatch({ type: USER_LIST_RESET })
}

export const register = ({firstName, lastName, phone, email, password}) => async (dispatch) => {
    try {

        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('https://one09-api.onrender.com/api/users', { firstName, lastName, phone, email, password }, config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        const cookies = new Cookies()
        cookies.set('user', data)
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL, 
            payload: 'Account Already Exists'
        })
    }
}
export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })
        
        const { userLogin: { user }} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
        const { data } = await axios.get(`https://one09-api.onrender.com/api/users/${id}`, config)

        
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })
        const cookies = new Cookies()
        cookies.set('userDetails', data)
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })
        
        const { userLogin: { user:user1 }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user1.token}`
            }
        }
        const { data } = await axios.put(`https://one09-api.onrender.com/api/users/profile`, user, config)

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST
        })
        
        const { userLogin: { user }} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
        const { data } = await axios.get(`https://one09-api.onrender.com/api/users`, config)

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST
        })
        
        const { userLogin: { user }} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
        await axios.delete(`/api/users/${id}`, config)

        dispatch({ type: USER_DELETE_SUCCESS })
    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
export const deleteUser2 = (id) => async (dispatch) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST
        })
        
        await axios.delete(`https://one09-api.onrender.com/api/users/${id}`)

        dispatch(logout())

        dispatch({ type: USER_DELETE_SUCCESS })

    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
export const updateUser = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        })
        
        const { userLogin: { user:user1 }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user1.token}`
            }
        }
        const { data } = await axios.put(`https://one09-api.onrender.com/api/users/${user1._id}`, user, config)

        dispatch({ type: USER_UPDATE_SUCCESS })
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
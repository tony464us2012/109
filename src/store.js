import { configureStore } from '@reduxjs/toolkit'
import { combineReducers} from 'redux'
import thunk from 'redux-thunk'
import Cookies from 'universal-cookie'
import { productListReducer, productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, beerReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { setupReducer } from './reducers/setupReducers'
import { userLoginReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer } from './reducers/userReducers'
import { myOrdersReducer, orderCreateReducer, orderDetailsReducer, getOrdersReducer, refundReducer } from './reducers/orderReducers'

const reducers = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    myOrders: myOrdersReducer,
    orders: getOrdersReducer,
    beers: beerReducer,
    setup: setupReducer,
    refund: refundReducer
})

const cookies = new Cookies()

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage = cookies.get('user') ? cookies.get('user') : null
const userDetailFromStorage = cookies.get('userDetails') ? cookies.get('userDetails') : null

const preloadedState = {
    cart: { cartItems: cartItemsFromStorage},
    userLogin: { user: userInfoFromStorage },
    userDetails: {user: userDetailFromStorage }
}


const store = configureStore({
    reducer: reducers,
    middleware: [thunk],
    preloadedState
})

export default store
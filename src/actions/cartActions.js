import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_RESET_ITEM } from './types'

export const addToCart = (cartItem) => async (dispatch, getState) => {
 
    const { id, name, image, price, description, extraPatty, pattySwap, sideSwap, upgradeSide, extras, large, sauce, burger, fryAddOn, taco, tacoText, instructions } = cartItem

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            id,
            name,
            image,
            price,
            description,
            extraPatty, 
            pattySwap,
            sideSwap,
            upgradeSide,
            extras,
            large,
            sauce, 
            burger,
            taco,
            tacoText,
            fryAddOn,
            instructions
        }
     
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const clearCart = () => (dispatch, getState) => {
    dispatch({
        type: CART_RESET_ITEM
    })
    localStorage.removeItem('cartItem')
}
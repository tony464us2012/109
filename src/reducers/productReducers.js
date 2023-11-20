import { PRODUCT_LIST_SUCCESS, 
         PRODUCT_LIST_REQUEST, 
         PRODUCT_LIST_FAIL, 
         PRODUCT_DETAILS_REQUEST, 
         PRODUCT_DETAILS_SUCCESS, 
         PRODUCT_DETAILS_FAIL, 
         PRODUCT_DETAILS_RESET, 
         PRODUCT_DELETE_REQUEST, 
         PRODUCT_DELETE_SUCCESS, 
         PRODUCT_DELETE_FAIL, 
         PRODUCT_CREATE_RESET, 
         PRODUCT_CREATE_REQUEST, 
         PRODUCT_CREATE_SUCCESS, 
         PRODUCT_CREATE_FAIL, 
         PRODUCT_UPDATE_REQUEST, 
         PRODUCT_UPDATE_SUCCESS, 
         PRODUCT_UPDATE_FAIL, 
         PRODUCT_UPDATE_RESET, 
         SET_MAIN_BEERS, 
         SET_SEARCHED_BEERS, 
         REMOVE_BEER, 
         SET_MAIN_BOTTLES, 
         ADD_BOTTLE, 
         REMOVE_BOTTLE,
         BEER_REQUEST,
         BEER_FAIL, 
         CLEAR_SEARCHED_BEERS} from '../actions/types'

export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload }
        case PRODUCT_LIST_FAIL:
        return { loading: false, error: action.payload}
        default: 
            return state
    }
}
export const productDetailsReducer = (state = { product: {}  }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state }
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }
        case PRODUCT_DETAILS_FAIL:
        return { loading: false, error: action.payload}
        case PRODUCT_DETAILS_RESET: 
        return { product: {} }
        default: 
            return state
    }
}
export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return { loading: true }
        case PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true }
        case PRODUCT_DELETE_FAIL:
        return { loading: false, error: action.payload}
        default: 
            return state
    }
}
export const productCreateReducer = (state = {product: {}}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return { loading: true }
        case PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case PRODUCT_CREATE_FAIL:
        return { loading: false, error: action.payload}
        case PRODUCT_CREATE_RESET: 
        return { product: {}}
        default: 
            return state
    }
}
export const productUpdateReducer = (state = { product: {}}, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return { loading: true }
        case PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true }
        case PRODUCT_UPDATE_FAIL:
        return { loading: false, error: action.payload}
        case PRODUCT_UPDATE_RESET: 
        return { product: {}}
        default: 
            return state
    }
}

export const beerReducer = (state = { displayBeers: [], searchedBeers: [], searchedBeerInfo: [], bottleBeer: []}, action) => {
    switch (action.type) {
        case BEER_REQUEST : 
                return { loading: true }
        case SET_MAIN_BEERS:
            return { ...state, loading: false, displayBeers: action.payload };
        case SET_SEARCHED_BEERS:
            return { ...state, loading: false, searchedBeers: action.payload };
        case CLEAR_SEARCHED_BEERS: 
            return { ...state, loading: false, searchedBeers: []}
        case REMOVE_BEER:
            return { ...state, loading: false, displayBeers: state.displayBeers.filter(x => x._id !== action.payload) }
        case SET_MAIN_BOTTLES: 
        case ADD_BOTTLE:
            return { ...state, loading: false, bottleBeer: action.payload }
        case REMOVE_BOTTLE:
            return { ...state, loading: false, bottleBeer: state.bottleBeer.filter(x => x._id !== action.payload) }
        case BEER_FAIL: 
                return { loading: false, error: action.payload }
        default:
            return state
    }
}
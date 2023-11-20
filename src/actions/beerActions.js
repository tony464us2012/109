import axios from 'axios';
import {
   BEER_REQUEST,
   SET_MAIN_BEERS,
   SET_SEARCHED_BEERS,
   REMOVE_BEER,
   SET_MAIN_BOTTLES,
   ADD_BOTTLE,
   REMOVE_BOTTLE,
   CLEAR_SEARCHED_BEERS
} from './types'

export const getMainBeers = () => async (dispatch) => {
    try {
        dispatch({ type: BEER_REQUEST})
        
        const res = await axios.get('/api/dashboard')
        dispatch({ type: SET_MAIN_BEERS, payload: res.data})

        const res2 = await axios.get('/api/bottle');
        dispatch({ type: SET_MAIN_BOTTLES, payload: res2.data});

    } catch(err) {
            console.log(err)
    }
}

export const searchBeer = (text) => async (dispatch) => {
    try {
        const response = await fetch(`https://api.untappd.com/v4/search/beer?q=${text}&client_id=41EF786235D5A6E859C26C7DABA2048BB19344D0&client_secret=2C5E752380284C4A141AD1066C8E688BF0A299F9`);
        const data = await response.json()
        console.log(data.response)
        dispatch({ type: SET_SEARCHED_BEERS, payload: data.response.beers.items })
    } catch(err) {
       console.log(err)
    }
}

 export const searchBeerInfo = (bid) => async (dispatch, getState) => {
    try {
        const { userLogin: { user }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }
        const response = await fetch(`https://api.untappd.com/v4/beer/info/${bid}?client_id=41EF786235D5A6E859C26C7DABA2048BB19344D0&client_secret=2C5E752380284C4A141AD1066C8E688BF0A299F9`);
        const data = await response.json()
        const beerObject = data.response.beer
        const res = await axios.post('/api/dashboard', beerObject, config)
        dispatch({ type: SET_MAIN_BEERS, payload: res.data})
        dispatch({ type: CLEAR_SEARCHED_BEERS })
    } catch(err) {
        console.log(err)
    }
}

export const removeBeer = (id) => async (dispatch, getState) => {
    try {
        const { userLogin: { user }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }
        dispatch({ type: REMOVE_BEER, payload: id})
        await axios.delete('/api/dashboard', {data: {userid: id}}, config)
    } catch(err) {
        console.log(err)
    }
}

export const addBottle = (bottle) => async (dispatch, getState) => {
    try {
        const { userLogin: { user }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }
        const res = await axios.post('/api/bottle', bottle, config);
        dispatch({ type: ADD_BOTTLE, payload: res.data});
    } catch(err) {
        console.log(err)
    }
}

export const removeBottle = (id) => async (dispatch, getState) => {
    try {
        const { userLogin: { user }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }
        dispatch({ type: REMOVE_BOTTLE, payload: id});
        await axios.delete('/api/bottle', {data: {userid: id}}, config);
    } catch(err) {
        console.log(err)
    }
}
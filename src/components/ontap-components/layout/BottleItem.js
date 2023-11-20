import React from 'react';
import { useDispatch } from 'react-redux'
import { removeBottle } from '../../../actions/beerActions'

const BottleItem = ({ name, price, id }) => {

    const dispatch = useDispatch()

    const removebottle = (id) => {
        dispatch(removeBottle(id))
    }

    return (
        <div>
           {name} | ${price} {' '} <a href="#!" style={{color:'red'}} onClick={ () => dispatch(removebottle(id)) } ><i className='fas fa-trash'></i></a>
        </div>
    )
}

export default BottleItem

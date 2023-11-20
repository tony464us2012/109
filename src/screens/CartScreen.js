import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Col, Button, Table } from 'react-bootstrap'
import { removeFromCart } from '../actions/cartActions'
import { Text } from '@chakra-ui/react'

const CartScreen = () => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart 

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
            navigate('/placeorder')
    }

    return (
    <>
            <div className='gap'></div>
               {cartItems.length === 0 ? 
               <>
               <div className='empty-cart'>Please add items to your cart</div>
                <button className='btn btn-dark' id='menu-btn' onClick={() => navigate('/menu')}>Go To Menu</button>
               </> : (
                <>
                <Text fontSize='2xl' className='text-center title'>Your Order</Text>
                   <Col md={8} style={{margin: '0 auto'}}>
                        <Table striped bordered responsive id='table' className='table-sm cart-items'>
                        <thead>
                            <tr style={{backgroundColor: '#e9ecef'}}>
                                <th>Item</th>
                                <th>Price</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item, index) => (
                                <tr className='item-table' key={index.id}>
                                    <td>
                                        <p style={{marginBottom: '.5rem'}}>{item.name}</p>
                                            {item.large ? <i>Large</i> : ''}
                                            {item.sauce ? <i> {item.sauce}</i> : ''}
                                            {item.burger ? <i>Burger: {item.burger}</i> : ''}
                                            {item.extraPatty ? <i>{item.extraPatty}</i> : ''}
                                            {item.pattySwap ? <i>{item.pattySwap}</i> : ''}
                                            {item.extras ? <i>{item.extras.map(extra => <div>{extra}</div>)}</i> : ''}
                                            {item.sideSwap ? <i>Side: {item.sideSwap}</i> : ''}
                                            {item.upgradeSide ? <i>Side: {item.upgradeSide}</i> : ''}
                                            {item.fryAddOn ? <i>Side Add: {item.fryAddOn}</i> : ''}
                                            {item.tacoText ? <i>Taco Type: {item.tacoText}</i> : ''}
                                            {item.taco ? <i>{item.taco}</i> : ''}
                                            {item.instructions ? <i style={{marginTop: '1rem'}} md={8}>Instructions: {item.instructions}</i> : '' }
                                    </td>
                                    <td><p>{(item.price).toFixed(2)}</p></td>
                                    <td><button id='remove-item-btn' className='btn-sm btn btn-danger' onClick={() => removeFromCartHandler(item.id)}>X</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    </Col>
                    </>
                       )}
            {cartItems.length > 0 ? <Col className="checkout-btn" >
                    <Button type='button' variant='success' className='btn mt-5' style={{padding: '.5rem 1rem'}} onClick={checkoutHandler}>PROCEED TO CHECKOUT</Button>
            </Col> : ''}
      </>
    )
}

export default CartScreen

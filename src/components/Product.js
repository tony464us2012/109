import React, { useState } from 'react'
import { listProductDetails } from '../actions/productActions'
import { useDispatch } from 'react-redux'
import { Card, Button } from 'react-bootstrap'
import { addToCart } from '../actions/cartActions'
import ProductModal from './Modal'

const Product = ({ product }) => {

    const [modalShow, setModalShow] = useState(false);
    const dispatch = useDispatch()


    const addToCartHandler = () => {
        const cartItem = {
          id: product._id,
          name: product.name,
          price: product.price,
          description: product.description
        }
        dispatch(addToCart(cartItem))
      }

    return (
        <>
                <Card className='food-item'>
                    <div key={product._id} id={product._id} className="food-image"></div>
                    <Card.Body className='productInfo'>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text className='text'>{product.description}</Card.Text>
                              <Card.Text className='card-price'> ${(product.price).toFixed(2)} </Card.Text>
                            <div className="btn-container">
                                <Button variant="outline-dark" size='sm' disabled={!product.available} onClick={() => {setModalShow(true); dispatch(listProductDetails(product._id))}}>Customize</Button>
                            { 
                              product.name !== "Loaded Tacos" && 
                              product.name !== "Fry Sampler" &&
                              product.name !== "Duck Wings" &&
                              product.name !== "Chicken Wings 8 Piece" &&
                              product.name !== "Burger In A Bowl" ?
                              <Button variant="dark" size='sm' disabled={!product.available} onClick={() => addToCartHandler()}>{product.available ? 'Add To Cart' : 'Unavailable'}</Button>
                            : ''}
                            </div>
                    </Card.Body>
                </Card>
            {modalShow ? <ProductModal show={modalShow} onHide={() => setModalShow(false)} id={product._id} price={product.price}/> : '' }
        </>
    )
}

export default Product

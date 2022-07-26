import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { clearCreate, listProductDetails, updateProduct } from '../actions/productActions'

const ProductEditScreen = () => {

    const { id } = useParams()

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState('')
    const [tacoCategory, setTacoCategory] = useState('')
    const [description, setDescription] = useState('')
    const [available, setAvailable] = useState(true)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product} = productDetails
   
    const productUpdate = useSelector(state => state.productUpdate)
    const { loadingUpdate, error:errorUpdate, success:successUpdate} = productUpdate

    
    useEffect(() => {
            if(successUpdate) {
                navigate('/admin/productlist')
            } else {
                if(!product.name || product._id !== id) {
                    dispatch(listProductDetails(id))
                } else {
                    setName(product.name)
                    setPrice(product.price)
                    setCategory(product.category)
                    setTacoCategory(product.tacoCategory)
                    setDescription(product.description)
                    setAvailable(product.available)
                }
            }
        return () => {
            dispatch(clearCreate())
        }              
    }, [successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: id,
            name,
            price,
            category,
            tacoCategory,
            description,
            available
        }))}
    
    return (
        <FormContainer>
            <h1>Edit Product</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='name' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='price'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control type='number' placeholder='Enter Price' value={price} disabled={tacoCategory ? true : false} onChange={(e) => setPrice(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='brand'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control as='select' placeholder='Enter category' value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value='Burger'>Burger</option>
                        <option value='Salad'>Salad</option>
                        <option value='Appetizer'>Appetizer</option>
                        <option value='ForkandKnife'>ForkandKnife</option>
                        <option value='Sandwich'>Sandwich</option>
                        <option value='Slider'>Slider</option>
                        <option value='Side'>Side</option>
                        <option value='AddOns'>AddOns</option>
                        <option value='Taco' onClick={() => setTacoCategory('Tacos')}>Taco</option>
                    </Form.Control>
                </Form.Group>
                {category === 'Taco' ?  
                     <Form.Group controlId='brand'>
                     <Form.Label>Taco Type</Form.Label>
                     <Form.Control as='select' placeholder='Enter category' value={tacoCategory} onChange={(e) => setTacoCategory(e.target.value)}>
                         <option value=''>Select Type</option>
                         <option value='Tacos'>Tacos</option>
                         <option value='SingleTacos'>Single Tacos</option>
                         <option value='Quesadillas'>Quesadilla</option>
                         <option value='SideOrders'>Side Orders</option>
                         <option value='BowlsandSalads'>Bowls and Salads</option>
                         <option value='Fajitas'>Fajitas</option>
                         <option value='Burritos'>Burritos</option>
                         <option value='LunchSpecials'>Lunch Specials</option>
                     </Form.Control>
                 </Form.Group> : ''
            }
                <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type='text' placeholder='Enter description' value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='brand'>
                    <Form.Label>Available?</Form.Label>
                    <Form.Control as='select' value={available} onChange={(e) => setAvailable(e.target.value)}>
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Update
                </Button>
            </Form>
            )}
        </FormContainer>
    )
}

export default ProductEditScreen
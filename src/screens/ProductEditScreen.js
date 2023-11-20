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
    const [category, setCategory] = useState('Burger')
    const [description, setDescription] = useState('')
    const [available, setAvailable] = useState(true)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product} = productDetails
   
    const productUpdate = useSelector(state => state.productUpdate)
    const { loadingUpdate, error:errorUpdate, success:successUpdate} = productUpdate

    useEffect(() => {
            if(product){
                setName(product.name)
                setPrice(product.price)
                setCategory(product.category)
                setDescription(product.description)
                setAvailable(product.available)
            } else {
                dispatch(listProductDetails(id))
            }
            if(successUpdate) {
                navigate('/admin/productlist')
            } 
        return () => {
            dispatch(clearCreate())
        }              
    }, [successUpdate, id, dispatch, navigate, product])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: id,
            name,
            price,
            category,
            description,
            available
        }))}
    
    return (
        <FormContainer>
            <h1 className='text-center fs-4'>Edit Product</h1>
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
                    <Form.Control type='number' placeholder='Enter Price' value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='brand'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control as='select' placeholder='Enter category' value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value=''>Select Category</option>
                        <option value='Burger'>Burger</option>
                        <option value='Salad'>Salad</option>
                        <option value='Appetizer'>Appetizer</option>
                        <option value='ForkandKnife'>ForkandKnife</option>
                        <option value='Sandwich'>Sandwich</option>
                        <option value='Slider'>Slider</option>
                        <option value='Side'>Side</option>
                        <option value='AddOns'>AddOns</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type='text' placeholder='Enter description' value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='brand'>
                    <Form.Label>Availability</Form.Label>
                    <Form.Control as='select' value={available} onChange={(e) => setAvailable(e.target.value)}>
                        <option value=''>In Stock?</option>
                        <option value='true'>True</option>
                        <option value='false'>False</option>
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
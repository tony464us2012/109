import React, { useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom'
import { Table, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ProductListHeader from '../components/ProfileListHeader'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { deleteProduct, createProduct, listProducts, listProductDetails } from '../actions/productActions'
import Appetizers from '../components/product-list-components/Appetizers'
import Burgers from '../components/product-list-components/Burgers'
import Forkandknives from '../components/product-list-components/Forkandknives'
import Salads from '../components/product-list-components/Salads'
import Sandwiches from '../components/product-list-components/Sandwiches'
import Sides from '../components/product-list-components/Sides'
import Sliders from '../components/product-list-components/Sliders'
import AddOns from '../components/product-list-components/AddOns'


const ProductListScreen = () => {

    const [tab, setTab] = useState('Appetizer')
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { user } = userLogin
    
    const productList = useSelector(state => state.productList)
    const { loading, products } = productList
    
    const productCreate = useSelector(state => state.productCreate)
    const { loading:loadingCreate, error:errorCreate, success:successCreate, product:createdProduct } = productCreate
    
    useEffect(() => {
        
        if(user && user.isAdmin) {
            dispatch(listProducts())
        }

        if(successCreate) {
            // eslint-disable-next-line
            navigate(`/admin/product/edit/${createdProduct._id}`)
        }
    }, [successCreate, dispatch, navigate, user, createdProduct._id])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure?')) {
           dispatch(deleteProduct(id))
        }
    }
    const createProductHandler = () => {
        dispatch(createProduct())
    }
    const getProductHandler = (id) => {
        dispatch(listProductDetails(id))
        navigate(`/admin/product/edit/${id}`)
    }

    const tabHandler = (tab) => {
        setTab(tab)
    }

        const appetizers =  products.filter(appetizer => appetizer.category === 'Appetizer')
        const burgers =  products.filter(burger => burger.category === 'Burger')
        const forkandknives = products.filter(forkandknife => forkandknife.category === 'ForkandKnife')
        const salads = products.filter(salad => salad.category === 'Salad')
        const sandwiches = products.filter(sandwich => sandwich.category === 'Sandwich')
        const sides = products.filter(side => side.category === 'Side')
        const sliders = products.filter(slider => slider.category === 'Slider')
        const addons = products.filter(addon => addon.category === 'AddOns')



    return (
        <div className='padding'>
            {loadingCreate && <Loader />}
            {loading && <Loader />} 
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
                <ProductListHeader tabHandler={tabHandler} tab={tab}/>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create Item
                    </Button>
                </Col>
                <Table striped bordered hover responsive id='table' className='table-sm'>
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>AVAILABILITY</th>
                            <th></th>
                        </tr>
                    </thead>
                        { tab === 'Appetizer' ? <Appetizers appetizers={appetizers} getProductHandler={getProductHandler} deleteHandler={deleteHandler} /> :
                         tab === 'Burger' ? <Burgers burgers={burgers} getProductHandler={getProductHandler} deleteHandler={deleteHandler} /> :
                         tab === 'ForkandKnife' ? <Forkandknives forkandknives={forkandknives} getProductHandler={getProductHandler} deleteHandler={deleteHandler} /> :
                         tab === 'Salad' ? <Salads salads={salads} getProductHandler={getProductHandler} deleteHandler={deleteHandler} /> :
                         tab === 'Sandwich' ? <Sandwiches sandwiches={sandwiches} getProductHandler={getProductHandler} deleteHandler={deleteHandler} /> :
                         tab === 'Side' ? <Sides sides={sides} getProductHandler={getProductHandler} deleteHandler={deleteHandler} /> :
                         tab === 'Slider' ? <Sliders sliders={sliders} getProductHandler={getProductHandler} deleteHandler={deleteHandler} /> : 
                        <AddOns addons={addons} getProductHandler={getProductHandler} deleteHandler={deleteHandler}/> }  
                </Table>
          {/* <Message variant='danger'>{error}</Message> */}
        </div>
    )
}

export default ProductListScreen
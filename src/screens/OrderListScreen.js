import React, { useEffect, useState, useRef } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, getOrders, updateSetup } from '../actions/orderActions'
import dateFormat from 'dateformat'
import Pagination from '../components/Pagination'
import Message from '../components/Message'
import Loader from '../components/Loader'

const OrderListScreen = () => {

    const promoRef = useRef()
    const discountRef = useRef()

    const [time, setTime] = useState(0)
    const [store, setStore] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [ordersPerPage] = useState(10)
    const [promoCodes, setPromoCodes] = useState([])
    const [updating, setUpdating] = useState(false)
    
    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orders)
    const { loading, error, orders } = orderList
  
    const userLogin = useSelector(state => state.userLogin)
    const { user } = userLogin

    const setupstate = useSelector(state => state.setup)
    const { success, setup } = setupstate

    useEffect(() => {
        if(user.isAdmin){
            dispatch(getOrders())
        }
            if (success) {
                setTime(setup.minutes)
                setStore(setup.cart)
                setPromoCodes(setup.promoCodes)
            }
    }, [setup, dispatch, success, user.isAdmin])

    const orderDetails = (id) => {
        dispatch(getOrderDetails(id))
    }

    const submitHandler = (e) => {
        e.preventDefault()
        setUpdating(true)
        dispatch(updateSetup({
            minutes: time,
             cart: store,
             promoCodes: [...promoCodes, {promo: promoRef.current.value, discount: discountRef.current.value}]
           
        }))
        promoRef.current.value = ''
        discountRef.current.value = ''
        setUpdating(false)
    }

        const indexOfLastOrder = currentPage * ordersPerPage;
        const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

        const paginate = pageNumber => setCurrentPage(pageNumber);

      const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this promocode?')) {
            setPromoCodes(promoCodes.filter((code, index) => index !== id))
            dispatch(updateSetup({
                minutes: time,
                    cart: store,
                    promoCodes: promoCodes.filter((code, index) => index !== id)
            }))
        }}


    return (
        <div className='padding'>
            {loading  ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : success ? 
            (
            <>
                <div className='operations-cont m-3'>
                <Form onSubmit={submitHandler}>
                <Form.Group controlId='price'>
                    <Form.Label>Wait Time</Form.Label>
                    <Form.Control type='text' value={time}  onChange={(e) => setTime(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='brand'>
                    <Form.Label>Store</Form.Label>
                    <Form.Control as='select' value={store} onChange={(e) => setStore(e.target.value)}>
                        <option value={true}>Open</option>
                        <option value={false}>Closed</option>
                    </Form.Control>
                </Form.Group>
                <div className='promo-btns'>
                    <Form.Group controlId='promo' className='mr-2'>
                        <Form.Label>Promo Code</Form.Label>
                        <Form.Control type='text' ref={promoRef}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Discount</Form.Label>
                        <Form.Control type='number' min='0' max='50' ref={discountRef}></Form.Control>
                    </Form.Group>
                </div>
                { updating ? 
                    <div className= 'lds-hourglass'></div> : 
                <Button type='submit' className='btn'>Update</Button>
                 }
            </Form>
           </div>
           {promoCodes && (
                <div className='promo-codes mt-5 mb-5'>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>PROMO CODE</th>
                                <th>DISCOUNT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {promoCodes.map((code, index) => (
                                <tr key={code.promo}>
                                    <td><button>{code.promo}</button></td>
                                    <td><button>{code.discount}%</button></td>
                                    <td style={{display: 'flex', justifyContent: 'center'}}>
                                        <button style={{color: 'red'}}  onClick={() => deleteHandler(index)}>
                                            <i className='fas fa-trash'></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>)
        }
                
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>CUSTOMER</th>
                            <th>PHONE</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.slice(indexOfFirstOrder, indexOfLastOrder).map(order => (
                            <tr key={order._id}>
                                <td><button>{`${order.firstName} ${order.lastName}`}</button></td>
                                <td><button>{order.phone}</button></td>
                                <td><button>{dateFormat(order.date, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</button></td>
                                <td><button>${order.totalprice}</button></td>
                                <td style={{textAlign:'center'}}><button>{order.refunded ? 'Refund Issued' : (<i className='fas fa-check' style={{color: 'green'}}></i>)}</button></td>
                                <td style={{display: 'flex'}}>
                                    <LinkContainer to={`/order/${order._id}/`} style={{margin: '0 auto'}}>
                                        <Button variant='light' className='btn-sm' onClick={() => orderDetails(order._id)}>
                                           Details
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Pagination
                    ordersPerPage={ordersPerPage}
                    totalPosts={orders.length}
                    paginate={paginate}
                />
            </>
            ) : ''}
        </div>
    )
}

export default OrderListScreen
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Button, Spinner } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import dateFormat from 'dateformat'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { ORDER_DETAILS_RESET, ORDER_REFUND_RESET } from '../actions/types'
import { refundOrder, getOrderDetails } from '../actions/orderActions'

const OrderScreen = () => {

    const { id } = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()
   
    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    const refunds = useSelector(state => state.refund)
    const { refund, error:refundError } = refunds


    useEffect(() => {
        dispatch(getOrderDetails(id))
        return () => {
       dispatch({type: ORDER_DETAILS_RESET})
       dispatch({type: ORDER_REFUND_RESET})
        }
    }, [dispatch, refund, id])

    const refundHandler = () => {
        dispatch(refundOrder({
            orderId: order._id,
            chargeId: order.chargeId
    }))
    }
  

        return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <div className='padding'>
            <Row>
                <Button type='submit' className='pay-btn' style={{marginLeft: 'auto', marginBottom: '2rem'}} variant='light' size='sm' onClick={() => navigate('/admin/orderlist')}>Back To Orders</Button>
            </Row>
            <Col>
                <ListGroup variant='flush' style={{position: 'relative'}}>
                { order.refunded ? <div id='watermark2'>Refund Issued</div> : '' }
                {refundError ? <Message variant={'danger'}>{refundError}</Message> : ''}
                    <ListGroup.Item variant='light'>
                            <h5>Ordered By</h5>
                            <p>{`${order.firstName} ${order.lastName}`}</p>
                            <p>{order.phone}</p>
                            <p>{order.email}</p>
                        </ListGroup.Item>
                        <ListGroup.Item variant='light'>
                            <h5>Order Placed</h5>
                            <p>{dateFormat(order.date, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</p>
                        </ListGroup.Item>
                        {order.orderItems.map(item => (
                            <ListGroup.Item key={item._id} style={{paddingRight: '2.5rem'}} variant='light'>
                                <Row>
                                 <Col md={3}>
                                    <h5>{item.name}</h5>
                                 </Col>
                                 <Col md={2}>${item.price}</Col>
                                </Row>
                                <Row>
                                  <Col md={2}></Col>
                                 {item.large ? <Col md={3}>Large</Col> : ''}
                                 {item.sauce ? <Col md={3}> {item.sauce}</Col> : ''}
                                 {item.burger ? <Col md={3}>Burger: {item.burger}</Col> : ''}
                                 {item.extraPatty ? <Col md={3}>{item.extraPatty}</Col> : ''}
                                 {item.pattySwap ? <Col md={3}>{item.pattySwap}</Col> : ''}
                                 {item.extras ? <Col md={3}>{item.extras.map(extra => <p>{extra}</p>)}</Col> : ''}
                                 {item.sideSwap ? <Col md={3}>Side: {item.sideSwap}</Col> : ''}
                                 {item.upgradeSide ? <Col md={3}>Side: {item.upgradeSide}</Col> : ''}
                                 {item.fryAddOn ? <Col md={3}>Side Add: {item.fryAddOn}</Col> : ''}
                                </Row>
                                <Row>
                                    {item.instructions ? <Col style={{marginTop: '1rem'}} md={8}>Instructions: {item.instructions}</Col> : '' }
                                </Row>
                            </ListGroup.Item>
                        ))}
                         <ListGroup.Item variant='light'>
                             <Row>
                                <Col md={2}>
                                    <h5>Subtotal</h5>
                                    <p>${order.subtotal}</p>
                                </Col>
                                <Col md={2}>
                                    <h5>Tax</h5>
                                    <p>${order.tax}</p>
                                </Col>
                                <Col md={2}>
                                    <h5>Total</h5>
                                    <p>${order.totalprice}</p>
                                </Col>
                             </Row>
                        </ListGroup.Item>
                        <ListGroup.Item variant='light'>
                             <Row>
                                <Button type='button' variant='success' className='btn' disabled={order.refunded} style={{margin: '2rem auto'}} onClick={refundHandler}> 
                                    {!loading ? 'Issue A Refund' : <><Spinner as='span' animation='border' size='sm' role='status'></Spinner><span className="visually-hidden">Loading...</span></> }
                                </Button> 
                             </Row>
                        </ListGroup.Item>
                    </ListGroup>
            </Col>
            <Col>
            </Col>
        </div>
     )
}

export default OrderScreen

import React, { useLayoutEffect } from 'react'
import { Col, ListGroup, Table, Form, Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader'
import { useParams } from 'react-router-dom'
import { clearCart } from '../actions/cartActions'
import dateFormat from 'dateformat'

const ConfirmationScreen = () => {

   const  { id } = useParams()
   const dispatch = useDispatch()


   const orderCreate = useSelector(state => state.orderCreate)
   const { order, loading } = orderCreate
   
   const setupstate = useSelector(state => state.setup)
   const { setup } = setupstate
  
   useLayoutEffect(() => {
       dispatch(clearCart())
   }, [order, dispatch])

        return loading ? <Loader /> : (
        <div className='padding'>
                 <Row style={{marginTop: '3rem', justifyContent: 'center'}}>
                 <Col md={7}>
                     <ListGroup className='black'>
                     <ListGroup.Item variant='light'>
                     <div class="material-symbols-outlined text-center">confirmation_number</div>
                         <div className='place-order-title black text-center'>Order Confirmation</div>
                     </ListGroup.Item>
                         <ListGroup.Item variant='light' className='black'>
                             <h5 style={{margin: '1.1rem 0', fontWeight: '200' }}>Order Type: Takeout</h5>
                             <p>Thank you for ordering at 109 Burger Joint. 
                            </p>
                            <p>Confirmation #{id.slice(20)}.</p>
                            <p> Your order will be ready for pickup in about {setup.minutes} minutes.</p>
                         <Form className='mt-3'>
                             <Form.Group className="mb-3 order-info" controlId="formGroupEmail">
                                 <Form.Label>First Name</Form.Label>
                                 <Form.Control type="text" value={order.firstName} size='sm' disabled required />
                             </Form.Group>
                             <Form.Group className="mb-3 order-info" controlId="formGroupEmail">
                                 <Form.Label>Last Name</Form.Label>
                                 <Form.Control type="text" value={order.lastName} size='sm' disabled required />
                             </Form.Group>
                             <Form.Group className="mb-3 order-info" controlId="formGroupPassword">
                                 <Form.Label>Phone Number</Form.Label>
                                 <Form.Control type="phone" value={order.phone} size='sm' disabled required />
                             </Form.Group>
                             <Form.Group className="mb-3 order-info" controlId="formGroupEmail">
                                 <Form.Label>Email address</Form.Label>
                                 <Form.Control type="email" value={order.email} size='sm' disabled required />
                             </Form.Group>
                         </Form>
                         </ListGroup.Item>
                        
                     </ListGroup>
                 </Col>
                 <Col md={4}>
                     <Table striped bordered responsive id='table' className='table-sm'>
                     <thead style={{backgroundColor: '#e9ecef'}}>
                         <tr>
                             <th>Item</th>
                             <th>Price</th>
                         </tr>
                     </thead>
                     <tbody style={{backgroundColor: '#e9ecef'}}>
                         {order.orderItems.map((item, index) => (
                             <tr key={index.id}>
                                 <td style={{padding: '.6rem .2rem'}}>
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
                             </tr>
                         ))}
                         <tr>
                             <td>
                                 <p>Subtotal</p>
                             </td>
                             <td>
                                 <p>{(order.subtotal).toFixed(2)}</p>
                             </td>
                         </tr>
                         <tr>
                             <td>
                                 <p>Tax</p>
                             </td>
                             <td>
                                 <p>{(order.tax).toFixed(2)}</p>
                             </td>
                         </tr>
                         <tr>
                             <td>
                                 <p>Total</p>
                             </td>
                             <td>
                                 <p>{(order.totalprice).toFixed(2)}</p>
                             </td>
                         </tr>
                     </tbody>
                 </Table>
                 <Table>
                    <tbody>
                        <tr>
                            <td>Location:</td>
                            <td>109 Burger Joint<br/> 646 SW 109 Avenue  Miami, FL </td>
                        </tr>
                        <tr>
                            <td>Ordered by:</td>
                            <td>{`${order.firstName}  ${order.lastName}`}</td>
                        </tr>
                        <tr>
                            <td>Submitted:</td>
                            <td>{dateFormat(order.date, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</td>
                        </tr>
                      
                    </tbody>
                 </Table>
                 </Col>
             </Row>
    </div>
    )}

export default ConfirmationScreen

import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import { Row, Col, ListGroup, Button, Form, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {createOrder, guestOrder} from '../actions/orderActions'
import Message from '../components/Message'
import CardSection from '../components/CardSection'

const PlaceOrderScreen = () => {

    const promoRef = useRef()

    const [day, setDay] = useState(new Date().getDay())
    const [hour, setHour] = useState(new Date().getHours())
    const [open, setOpen] = useState(null)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [id, setId] = useState('')
    const [billingDetails, setBillingDetails] = useState('')
    const [message, setMessage] = useState('')
    const [subtotal, setSubtotal] = useState(0)
    const [tax, setTax] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [promoCodes, setPromoCodes] = useState([])
    const [discount, setDiscount] = useState(0)
    const [, setCheckPromo] = useState(false)
    const [numPromo, setNumPromo] = useState(0)
    const [messagePromo, setMessagePromo] = useState('')

    const stripe = useStripe();
    const elements = useElements();

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cartItem = useSelector(state => state.cart)
    const { cartItems } = cartItem
    
    const userDetail = useSelector(state => state.userDetails)
    const { user } = userDetail

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate

    const setUp = useSelector(state => state.setup)
    const { setup } = setUp

    const [processing, setProcessing] = useState(false);
 
    const handlePromoCode = (e) => {
        e.preventDefault()
        setCheckPromo(true)
        const promoCode = promoRef.current.value
        if (promoCodes) {
            const promo = promoCodes.find(code => code.promo === promoCode)
            if (promo && numPromo < 1) {
                setMessagePromo('*promo code applied')
                setDiscount(promo.discount * totalPrice / 100)
                setTotalPrice(prevPrice => ((prevPrice - ((promo.discount * prevPrice / 100).toFixed(2)))))
                setNumPromo(prevNum => prevNum + 1)
            } else {
                setMessagePromo('*invalid promo code')
            }
        }

        promoRef.current.value = ''
        setCheckPromo(false)
    }
    useEffect(() => {
       
            setSubtotal(Number(cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)))
            setTax(Number((cartItems.reduce((acc, item) => acc + item.price, 0) * .07).toFixed(2)))
            if (!discount) {
                setTotalPrice(Number(cartItems.reduce((acc, item) => acc + item.price, 0))  + Number((cartItems.reduce((acc, item) => acc + item.price, 0) * .07).toFixed(2)))
        }}, [cartItems, discount])

    useEffect(() => {
        setPromoCodes(setup.promoCodes)
        if(user) {
            setFirstName(user.firstName)
            setLastName(user.lastName)
            setPhone(user.phone)
            setEmail(user.email)
            setId(user._id)
        }
        if(success) {
            navigate(`/confirmation/${order._id}`)
        }
        if (day >= 1 && day <= 4) {
            if (hour >= 12 && hour < 21 ) {
                setOpen(true)
            } else { setOpen(false) }
        } else if (day === 5 || day === 6) {
            if (hour >= 11 ) {
                setOpen(true)
            } else {setOpen(false)}
         } else {
             if (hour >= 12 && hour < 19) {
                 setOpen(true)
             }
         }
        var timerID = setInterval( () => tick(), 1000 );
        return () => {
            clearInterval(timerID);}
        },[success, day, hour, navigate, order, user, setup.promoCodes])

    function tick() {setDay(new Date().getDay()); setHour(new Date().getHours())}

    const placeOrderHandler = async (e) => {
        e.preventDefault()
        setProcessing(true)
        if (!stripe || !elements) {
          return;
        }
        
        const card = elements.getElement(CardElement)
        const token = await stripe.createToken(card);

        if(!user && token.token) {
            dispatch(guestOrder({
                        firstName,
                        lastName,
                        phone,
                        email: email,
                        name: billingDetails.name,
                        orderItems: cartItems,
                        subtotal,
                        tax,
                        totalprice: totalPrice,
                        token: token.token.id
                    }))
        } else if ((token.token)) {
                    dispatch(createOrder({
                        firstName,
                        lastName,
                        phone,
                        id,
                        name: billingDetails.name,
                        email,
                        orderItems: cartItems,
                        subtotal,
                        tax,
                        totalprice: totalPrice,
                        token: token.token.id
                    }))
            } else {
                setMessage('Invalid Credit Card Information')
            }
            setTimeout(() => {
                setProcessing(false)
            }, 2000)
        }
    
    return (
        <div className='padding'>
                <Row style={{ marginTop: '3rem', justifyContent: 'center'}}>
                <Col md={4} >
                        <Table striped bordered responsive id='table' className='table-sm'>
                        <thead>
                            <tr style={{backgroundColor: '#e9ecef'}}>
                                <th>Item</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item, index) => (
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
                                    <p>{(subtotal).toFixed(2)}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>Tax</p>
                                </td>
                                <td>
                                    <p>{(tax).toFixed(2)}</p>
                                </td>
                            </tr>
                           { discount ? <tr>
                                <td>
                                    <p>Discount</p>
                                </td>
                                <td>
                                    <p style={{color: 'red'}}>-{(discount).toFixed(2)}</p>
                                </td>
                            </tr> : ''}
                            <tr>
                                <td>
                                    <p>Total</p>
                                </td>
                                <td>
                                    <p>{(totalPrice).toFixed(2)}</p>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                            <Form.Group className="mb-4" controlId="formGroupEmail">
                                <Form.Label>Enter Promo Code</Form.Label>
                                <Form.Control type="text" className='mb-2' ref={promoRef} size='sm'/>
                                {messagePromo ? <div className='mb-2'>{messagePromo}</div> : ''}
                                <button className='btn btn-success' size='sm' onClick={handlePromoCode}>Apply</button>
                            </Form.Group>
                    </Col>
                    <Col>
                        <ListGroup className='black' style={{zIndex: '1'}}>
                        <ListGroup.Item variant='light'>
                            <div className="material-icons basket text-center" style={{fontSize: '3rem', color:'red'}}>shopping_basket</div>
                            <div className='place-order-title black text-center'>Submit Your Order</div>
                        </ListGroup.Item>
                            <ListGroup.Item variant='light' className='black'>
                                <h5 style={{margin: '1.1rem 0', fontWeight: '200' }}>Order Type: Takeout</h5>
                            <Form onSubmit={placeOrderHandler}>
                                <Form.Group className="mb-3 order-info" controlId="formGroupEmail">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} size='sm' required />
                                </Form.Group>
                                <Form.Group className="mb-3 order-info" controlId="formGroupEmail">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} size='sm' required />
                                </Form.Group>
                                <Form.Group className="mb-3 order-info" controlId="formGroupPassword">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control type="phone" value={phone} onChange={(e) => setPhone(e.target.value)} size='sm' required />
                                </Form.Group>
                                <Form.Group className="mb-3 order-info" controlId="formGroupEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} size='sm' required />
                                </Form.Group>
                                {message ? <Message variant='danger'>{message}</Message> : ''}
                                {error ? <Message variant='danger'>{error}</Message> : ''}
                                <Form.Group className="mb-3 payment-cont" >
                                    <div className="secure-payment">
                                    <div className="material-icons security">security</div> 
                                    <div className="secure-payment-text">
                                            <div>Secure Payment</div>
                                            <p>This is a secure, SSL-encrypted payment.</p>
                                    </div>
                                    </div>
                                    <div className="order-pay">
                                        <Form.Label>Name on Card</Form.Label>
                                        <Form.Control type="text" className='cardInfo' variant='light' size= 'sm' name='name' onChange={(e) => setBillingDetails(e.target.value)} placeholder="Enter Full Name" required />
                                        <CardSection />
                                    </div>
                                </Form.Group>
                                   { processing ? 
                                   <div className= 'lds-hourglass'></div> : 
                                   <Button type='submit' className='pay-btn' disabled={!setup.cart || !open} variant={setup.cart && open ? 'success' : 'danger'} size='sm'>{setup.cart && open ? 'PLACE ORDER' : 'CLOSED'}</Button>
                                }
                            </Form>
                            </ListGroup.Item>
                        
                        </ListGroup>
                    </Col>
                </Row>
        </div>
    )
}

export default PlaceOrderScreen

// disabled={cart.cartItems === 0 || !stripe || !open || setup.cart}
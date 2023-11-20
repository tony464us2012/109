import React, { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

const LoginScreen = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
   
    const dispatch = useDispatch()
    let navigate = useNavigate();

    const { user, loading, error } = useSelector(state => state.userLogin)

    useEffect(() => {
        if(user) {
            if (user.isAdmin) {
                navigate('/admin/orderlist')
            } else {
                navigate('/menu')
            }}
       
    }, [user, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login({email: emailRef.current.value, password: passwordRef.current.value}))
    }

    return (
        <FormContainer>
            <h1 className='text-center fs-3'>Sign In</h1>
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter email' ref={emailRef}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter Password' ref={passwordRef}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Sign In
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                New Customer? <Link to={'/register'} style={{color:'black'}}>Register</Link>
                </Col>
            </Row>
            {error && <Message variant='danger'>{error}</Message>}
        </FormContainer>
    )
}

export default LoginScreen

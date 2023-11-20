import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import FormContainer from '../components/FormContainer.js'
import { register } from '../actions/userActions.js'

const RegisterScreen = () => {

    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const phoneRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()

    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, loading } = useSelector(state => state.userLogin)

    useEffect(() => {
        if(user) {
           navigate('/menu')
        }
    }, [user, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        if(passwordRef.current.value !== confirmPasswordRef.current.value) {
            setMessage('Passwords do not match')
            setTimeout(() => setMessage(''), 3000)
        } else {
            dispatch(register({
                firstName: firstNameRef.current.value, 
                lastName: lastNameRef.current.value, 
                phone: phoneRef.current.value, 
                email: emailRef.current.value, 
                password: passwordRef.current.value
            }))
        }
    }

    return (
        <FormContainer>
            <h1 className='text-center fs-3'>Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type='text' ref={firstNameRef} required></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type='text' ref={lastNameRef} required></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type='phone' ref={phoneRef} required></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' ref={emailRef} required></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' ref={passwordRef} required></Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' ref={confirmPasswordRef} required ></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Register
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                Have an Account ? <Link to={'/login'}>Login</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
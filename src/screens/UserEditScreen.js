import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../actions/types'

const UserEditScreen = () => {
    
    const { id } = useParams

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user} = userDetails
    
    const userUpdate = useSelector(state => state.userUpdate)
    const { loading:loadingUpdate, error:errorUpdate, success:successUpdate} = userUpdate

    useEffect(() => {
        
        if(!user.firstName || user._id !== id) {
            dispatch(getUserDetails(id))
        } else {
            setFirstName(user.firstName)
            setLastName(user.lastName)
            setPhone(user.phone)
            setEmail(user.email)
        }

        if(successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            navigate('/admin/userlist')
        } 
    }, [dispatch, user._id, navigate, successUpdate, user.email, user.firstName, user.lastName, user.phone, id ])

    const submitHandler = (e) => {
        e.preventDefault()
       dispatch(updateUser({ _id: id, firstName, lastName, email, phone, isAdmin: user.isAdmin  }))
    }

    return (
        <div className='padding'>
        <Link to='/admin/userlist' className='btn btn-light my-3'>Go Back</Link>
        <FormContainer>
            <h1>Edit User</h1>
            {loadingUpdate && <Loader/>}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='name'>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type='text' value={lastName} onChange={(e) => setLastName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='name'>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type='phone' value={phone} onChange={(e) => setPhone(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='isadmin'>
                    <Form.Check type='checkbox' label='Is Admin' disabled={true} checked={user.isAdmin}></Form.Check>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Update
                </Button>
            </Form>
            )}
        </FormContainer>
      </div>  
    )
}

export default UserEditScreen
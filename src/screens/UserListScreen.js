import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, deleteUser } from '../actions/userActions'

const UserListScreen = () => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList
  
    const userLogin = useSelector(state => state.userLogin)
    const { user } = userLogin
    
    const userDelete = useSelector(state => state.userDelete)
    const { success:successDelete } = userDelete

    useEffect(() => {
        if(user && user.isAdmin) {
            dispatch(listUsers())
        } else {
            navigate('/login')
        }
    }, [successDelete, user, dispatch, navigate])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure?')) {
            dispatch(deleteUser(id))
        }
    }

    return (
        <div className='padding'>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
            (<>
                <h1 className='text-center title fs-4'>Accounts</h1>
                <Table striped bordered hover responsive id='table' className='table-sm'>
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>PHONE</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.filter((a, b) => (a.name > b.name) ? 1 : -1).map(user => (
                            <tr key={user._id}>
                                <td><button>{`${user.firstName} ${user.lastName}`}</button></td>
                                <td><button>{user.phone}</button></td>
                                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                <td style={{textAlign: 'center'}}>{user.isAdmin ? (<i className='fas fa-check' style={{color: 'green'}}></i>) : (<i className='fas fa-times' style={{color: 'red'}}></i>)}</td>
                                <td style={{display: 'flex', justifyContent: 'space-around'}}>
                                        <button style={{color:'red'}} disabled={user.firstName === 'Luis' || user.firstName === 'Guest'} onClick={() => deleteHandler(user._id)}>
                                            <i className='fas fa-trash'></i>
                                        </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
           </> )}
        </div>
    )
}

export default UserListScreen

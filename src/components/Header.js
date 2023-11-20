import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, NavDropdown, Image, Container } from 'react-bootstrap'
import { getUserDetails, logout } from '../actions/userActions'
import { getSetup, myOrders } from '../actions/orderActions'
import { useNavigate } from 'react-router'
import { render } from 'react-dom'


const Header = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user } = useSelector(state => state.userLogin)
   
    const { cartItems } = useSelector(state => state.cart)

    useEffect(() => {
        dispatch(getSetup())
        setTimeout(() => {
            if (user) {
                dispatch(getUserDetails(user._id))
                dispatch(myOrders(user._id))
            }
        }, 1000)
    }, [dispatch, user ])
    
    const logoutHandler = () => {
        dispatch(logout())
        navigate('/')
        render()
    }


    const noborder = {border: 'none'}

    return (
        <>
         <Navbar collapseOnSelect expand="lg">
            <Container>
                <Navbar.Brand href="#home" bg="light" style={noborder}><Image id='Logo' className="align-top" alt='109-Logo' src="https://images2.imgbox.com/48/7e/9omFd3Oa_o.png" roundedCircle variant='top'/></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="me-auto justify-content-end">
                <Nav.Item id='navItem'><a href='/'>Home</a></Nav.Item>
                <Nav.Item id='navItem'><a href='/menu'>Menu</a ></Nav.Item>
                <Nav.Item id='navItem'><a href='/beers'>Beers</a></Nav.Item>
                <Nav.Item id='navItem'><a href='/about'>About</a></Nav.Item>
                <Nav.Item id='navItem' ><a href="https://order.online/store/109BurgerJoint-73844/en-US/?hideModal=true&pickup=true" rel="noopener noreferrer" target="_blank">Delivery</a></Nav.Item>
                { user ? (
                                <NavDropdown id='navItem' title={user.firstName ? `Hi ${user.firstName}` : ''}  >
                                        <a href='/profile'>Profile</a>
                                        <a href='/' onClick={logoutHandler}>Log Out</a>
                                    </NavDropdown>
                        ) : (
                            <>
                                 <Nav.Item id='navItem' ><a href='/login'> <i className="fas fa-sign-in-alt"></i> Login</a></Nav.Item>
                                 <Nav.Item id='navItem' ><a href='/register'><i className="fas fa-user-plus"></i> Sign Up</a></Nav.Item>
                            </>
                           )}
                { user && user.isAdmin && (
                               <NavDropdown id='navItem' title='Admin'>
                                   <a href='/admin/userlist'>Accounts</a>
                                   <a href='/admin/productlist'>Products</a>
                                   <a href='/admin/beerlist'>Beers</a>
                                  <a href='/admin/orderlist'>Orders</a>
                            </NavDropdown>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Navbar expand="lg" collapseOnSelect id='navContainer'>
            <Container>
                <Nav.Link eventKey="disabled" style={{textAlign:'center'}} className='address' disabled>
                                <span className="material-icons pindrop">pin_drop</span>   
                            646 SW 109 Avenue  Miami, FL
                                </Nav.Link>
                    <>
                                <button type="button" id='cart-btn' className="btn btn-sm position-relative" onClick={() => navigate('/cart')}>
                                    <span className="material-symbols-outlined cart">shopping_cart</span>
                                    { cartItems.length > 0 ? 
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            {cartItems.length}
                                        </span>
                                : ''}
                                </button>
                    </> 
            </Container>
        </Navbar>
        </>
    )
}

export default Header

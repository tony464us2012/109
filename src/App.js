import React from 'react'
import {Elements} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import AboutScreen from './screens/AboutScreen'
import MenuScreen from './screens/MenuScreen'
import BeerScreen from './screens/BeerScreen'
import BeerListScreen from './screens/BeerListScreen'
import ConfirmationScreen from './screens/ConfirmationScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import UserListScreen from './screens/UserListScreen'
import OrderScreen from './screens/OrderScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import AccessibilityScreen from './screens/AccessibilityScreen'
import TermsScreen from './screens/TermsScreen'
import { ChakraProvider, extendBaseTheme } from '@chakra-ui/react'
import chakraTheme from '@chakra-ui/theme'

const stripePromise = loadStripe('pk_live_R1kD1z6rIIVgf0Kj3xmDwEVI')

const { Card } = chakraTheme.components

const theme = extendBaseTheme({
  components: {
    Card,
  },
})


const App = () => {

  return (
    <Router>
      <ChakraProvider theme={theme}>
        <Header />
          <main className="app" >
            <Elements stripe={stripePromise}>
              <Routes>
                <Route path='/confirmation/:id'element={<ConfirmationScreen />} />
                <Route path='/order/:id'element={<OrderScreen />} />
                <Route path='/login'element={<LoginScreen />} />
                <Route path='/placeorder'element={<PlaceOrderScreen />} />
                <Route path='/register'element={<RegisterScreen />} />
                <Route path='/profile'element={<ProfileScreen />} />
                <Route path='/product/:id'element={<ProductScreen />} />
                <Route path='/cart'element={<CartScreen />} />
                <Route path='/admin/beerlist'element={<BeerListScreen />} />
                <Route path='/admin/userlist'element={<UserListScreen />} />
                <Route path='/admin/user/:id/edit'element={<UserEditScreen />} />
                <Route path='/admin/product/edit/:id'element={<ProductEditScreen />} />
                <Route path='/admin/productlist'element={<ProductListScreen />} />
                <Route path='/admin/productlist/:pageNumber'element={<ProductListScreen />} />
                <Route path='/admin/orderlist'element={<OrderListScreen />} />
                <Route path='/terms'element={<TermsScreen />} />
                <Route path='/accessibility'element={<AccessibilityScreen />} />
                <Route path='/beers'element={<BeerScreen />} />
                <Route path='/about'element={<AboutScreen />} />
                <Route path='/menu' element={<MenuScreen />} />
                <Route path='/' element={<HomeScreen/>} />
              </Routes>
            </Elements>
            </main>
            <Footer />
      </ChakraProvider>
    </Router>
  );
}

export default App;

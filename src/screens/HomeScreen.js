import React, { useState } from 'react'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Badge, Box, Flex, Image } from '@chakra-ui/react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'




const HomeScreen = () => {

    const [loading] = useState(false)
    const [error] = useState(false)

    const navigate = useNavigate()

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <Flex style={{backgroundColor:'bache', justifyContent: 'space-around', padding:'10% 0'}} margin='6rem 0' wrap='wrap'>
            <Box minWidth='300px' maxW='700px'>
              <Image
              src="https://images2.imgbox.com/0a/aa/wiK0DYJ3_o.jpg"
              alt='Burger'
              />
            </Box>
            <Box className='frontpage-text' style={{padding: '0 1.5rem', display: 'flex', flexDirection:'column',  justifyContent: 'center'}}>
              <Badge ml='1' fontSize='1.5rem' color='red' style={{transform: 'rotate(-10deg)', marginTop:'-3rem', marginBottom:'3rem'}}>New</Badge>
              <h1 className='main-text'>Great Tasting Burgers</h1>
              <Button variant='danger' onClick={() => navigate('/menu')} style={{marginTop:'1rem', borderRadius: '2px', width:'50%', margin:'0 auto'}}>Order Now</Button>
            </Box>
        </Flex>
    )
}

export default HomeScreen

import React, { useState } from 'react'
import Loader from './Loader'
import Message from './Message'
import { Badge, Box, Container, Flex, Image, Spacer, Button } from '@chakra-ui/react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'

const MainPicture = () => {

    const [loading] = useState(false)
    const [error] = useState(false)

    const navigate = useNavigate()

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
      <>
        <Flex style={{backgroundColor:'black', justifyContent: 'space-around'}} mt='10rem'>
            <Box className='frontpage-text' minW style={{border: '1px solid blue', padding: '0 1.5rem', display: 'flex', flexDirection:'column',  justifyContent: 'center'}}>
              <Badge ml='1' fontSize='1.5rem' variant='danger' color='red' style={{transform: 'rotate(-10deg)'}}>New</Badge>
              <h1 className='main-text'>Great Tasting Burgers</h1>
              <Button colorScheme='red' width='50%' onClick={() => navigate('/menu')} style={{marginTop:'1rem', borderRadius: '2px'}}>Order Now</Button>
            </Box>
            <Spacer />
            <Box maxWidth='800px'>
              <Image
              src="https://images2.imgbox.com/0a/aa/wiK0DYJ3_o.jpg"
              alt='Burger'
              style={{border: '1px solid red', width: '75%', height: '100%'}}
              />
            </Box>
            {/* <Image
            loading='lazy'
            src="https://images2.imgbox.com/0a/aa/wiK0DYJ3_o.jpg"
            alt='Burger'
            objectFit='cover'
            width= '100%'
          /> */}
        </Flex>
      </>
    )
}

export default MainPicture

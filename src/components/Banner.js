import React from 'react'
// import { Card, Button } from 'react-bootstrap'
import { Card, Image, CardBody, Text, Stack, Flex, } from '@chakra-ui/react'

const Banner = () => {
  return (
    
    <Flex className='banner-container' justifyContent='space-evenly' margin='4.5rem auto' flexWrap='wrap'>
      <Card className='banner' maxW='sm' marginBottom='2rem'>
        <Image
            src="https://images2.imgbox.com/27/43/FDMVLpBs_o.jpg"
            alt='Nica Burger'
            objectFit='cover'
          />
        <CardBody id='cardBody'>
          <Stack mt='1' spacing='1'>
          <Text as='b' fontSize='1.5rem'>Artisan Burgers</Text>
            <Text>
              One of the best burgers you'll try. 
            </Text>
          </Stack>
        </CardBody>
      </Card>
      <Card className='banner' maxW='sm' marginBottom='2rem'>
          <Image
            src="https://images2.imgbox.com/ab/aa/gV5YTgta_o.jpg"
            alt='Tap Beers'
            objectFit='cover'
          />
        <CardBody id='cardBody'>
          <Stack mt='1' spacing='1'>
          <Text as='b' fontSize='1.5rem'>Craft Beers</Text>
            <Text>
              Over 100 different types of craft beers. Come try a few.
            </Text>
          </Stack>
        </CardBody>
      </Card>
    </Flex>
  )
}

export default Banner

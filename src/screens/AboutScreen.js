import React from 'react'
import Meta from '../components/Meta'
import { Text } from '@chakra-ui/react'

const AboutScreen = () => {

    return (
        <div className='padding'>
            <Meta />
            <Text fontSize='2xl' className='text-center'>Our Story</Text>
            <img className='' src="https://images2.imgbox.com/79/78/26ZcgQlk_o.jpg" style={{marginTop: '1rem'}} width='250px' height='250px' alt='pic of owners' />
            <p className='about-description'>Our father-son chef duo Jose and Luis Blanco concentrate on always providing the most creative and innovative burgers and food items on the market. They accomplish this by using the freshest ingredients and never being afraid to test the limits of new flavor combinations. Chef Luis Blanco brings about two decades of culinary experience to the table. Traditionally trained in Italian cuisine he does not lack imagination or talent for burgers and American food that makes up the menu at 109 Burger Joint. Chef works with pride and love for his craft.</p>
            <div className="press-container">
                <Text fontSize='2xl' className='text-center mb-5'>Press Release</Text>
                <div className="press-item">
                    <a href="https://www.miaminewtimes.com/restaurants/109-burger-serves-eclectic-burger-mash-ups-11246981" target="_blank" rel="noopener noreferrer">"109 Burger Joint Serves Eclectic Burger Mashups"</a>
                    <h5 className='mb-2 black'>By Miami New Times</h5>
                    <i className="material-icons star"> star </i>
                    <i className="material-icons star"> star </i>
                    <i className="material-icons star"> star </i>
                    <i className="material-icons star"> star </i>
                    <i className="material-icons star"> star </i>
                </div>
                <div className="press-item">
                    <a href="https://wsvn.com/entertainment/eat-burgers-with-all-kinds-of-different-toppings-at-109-burger-joint-in-sweetwater/" target="_blank" rel="noopener noreferrer">"A burger is a blank canvas, and their creation are edible works of art"</a>
                    <h5 className='mb-2 black'>By 7 News Miami</h5>
                    <i className="material-icons star"> star </i>
                    <i className="material-icons star"> star </i>
                    <i className="material-icons star"> star </i>
                    <i className="material-icons star"> star </i>
                    <i className="material-icons star"> star </i>
                </div>
                <div className="press-item">
                    <a href="https://bigseventravel.com/cheat-meal-miami/" target="_blank" rel="noopener noreferrer">"One of the best places for a cheat meal in Miami"</a>
                    <h5 className='mb-2 black'>By Big 7 Travel</h5>
                    <i className="material-icons star"> star </i>
                    <i className="material-icons star"> star </i>
                    <i className="material-icons star"> star </i>
                    <i className="material-icons star"> star </i>
                    <i className="material-icons star"> star </i>
                </div>
            </div>
        </div>
    )
}

export default AboutScreen

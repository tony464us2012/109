import React from 'react'
import Product from '../Product'



const Single = ({ singletacos }) => {


    return (
        <>
            <h6 className='tacotitle'>Lettuce, Pico de Gallo, Chipotle Cream and Cheese, Hard or Soft</h6>
               <div className='menu-item-container'>
                    {singletacos.map(product => (
                             <Product product={product} key={product._id} />
                    ))}
                </div>
        </>
    )
}

export default Single
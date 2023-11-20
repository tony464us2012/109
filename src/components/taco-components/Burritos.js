import React from 'react'
import Product from '../Product'



const Burritos = ({ burritos }) => {


    return (
        <>
            <h6 className='tacotitle'>Choice of Protein, Lettuce, Rice, Beans, Pico de Gallo, Chipotle Cream and Cheese.</h6>
               <div className='menu-item-container'>
                    {burritos.map(product => (
                             <Product product={product} key={product._id} />
                    ))}
                </div>
        </>
    )
}

export default Burritos
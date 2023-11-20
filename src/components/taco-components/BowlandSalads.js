import React from 'react'
import Product from '../Product'



const BowlandSalads = ({ bowlandsalads }) => {


    return (
        <>
               <div className='menu-item-container'>
                    {bowlandsalads.map(product => (
                            <Product product={product} key={product._id} />
                    ))}
                </div>
        </>
    )
}

export default BowlandSalads
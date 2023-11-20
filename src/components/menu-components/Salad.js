import React from 'react'
import Product from '../Product'


const Salad = ({ salads }) => {

    return (
        <>
               <div className='menu-item-container'>
                    {salads.map(product => (
                            <Product product={product} key={product._id} />
                    ))}
                </div>
        </>
    )
}

export default Salad
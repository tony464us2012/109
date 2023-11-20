import React from 'react'
import Product from '../Product'



const Appetizer = ({ appetizers }) => {


    return (
        <>
                  <div className='menu-item-container'>
                    {appetizers.map(product => (
                            <Product product={product} key={product._id} />
                    ))}
                  </div>
        </>
    )
}

export default Appetizer
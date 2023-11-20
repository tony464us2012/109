import React from 'react'
import Product from '../Product'



const Quesadillas = ({ quesadillas }) => {


    return (
        <>
              <div className='menu-item-container'>
                    {quesadillas.map(product => (
                             <Product product={product} key={product._id} />
                    ))}
                </div>
        </>
    )
}

export default Quesadillas
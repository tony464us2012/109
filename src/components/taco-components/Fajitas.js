import React from 'react'
import Product from '../Product'



const Fajitas = ({ fajitas }) => {


    return (
        <>
            <h6 className='tacotitle'> Served with Rice, Beans, Guacamole, Sour Cream, Cheese and Soft Tortilla</h6>
               <div className='menu-item-container'>
                    {fajitas.map(product => (
                            <Product product={product} key={product._id} />
                    ))}
                </div>
        </>
    )
}

export default Fajitas
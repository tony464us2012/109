import React from 'react'
import Product from '../Product'



const SideOrders = ({ sideorders }) => {


    return (
        <>
               <div className='menu-item-container'>
                    {sideorders.map(product => (
                             <Product product={product} key={product._id} />
                    ))}
                </div>
        </>
    )
}

export default SideOrders
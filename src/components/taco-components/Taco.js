import React from 'react'
import Product from '../Product'

const Tacos = ({ tacos }) => {


    return (
        <>
            <h6 className='tacotitle'>3 Tacos Served with Rice and Beans</h6>
               <div className='menu-item-container'>
                    {tacos.map(product => (
                            <Product product={product} key={product._id}/>
                    ))}
                </div>
        </>
    )
}

export default Tacos
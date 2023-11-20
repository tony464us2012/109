import React from 'react'
import Product from '../Product'



const LunchSpecials = ({ lunchspecials }) => {


    return (
        <>
            <h6 className='tacotitle'>Every day until 4pm. Served with Rice and Beans with the choice of Chicken, Beef, Pork, or Beans. Steak additional +3 </h6>
               <div className='menu-item-container'>
                    {lunchspecials.map(product => (
                             <Product product={product} key={product._id} />
                    ))}
                </div>
        </>
    )
}

export default LunchSpecials
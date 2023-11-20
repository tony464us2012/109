import React from 'react'

const Burgers = ({ burgers, getProductHandler, deleteHandler }) => {
    return (
        <tbody>
            {burgers.sort((a, b) => (a.name > b.name) ? 1 : -1).map(product => (
                <tr key={product._id}>
                <td><button>{product.name}</button></td>
                <td><button>${product.price}</button></td>
                <td><button>{product.available ? 'Available' : 'Unavailable'}</button></td>
                <td style={{display: 'flex', justifyContent: 'space-around'}}>
                        <button  onClick={() => getProductHandler(product._id)}>
                            <i className='fas fa-edit'></i>
                        </button>
                        <button style={{color: 'red'}}  onClick={() => deleteHandler(product._id)}>
                            <i className='fas fa-trash'></i>
                        </button>
                </td>
                </tr>
                        ))}
        </tbody>
    )
}
export default Burgers